// ── SPIKIU · TEST-ENDPOINT: STIMMEN-VERGLEICH (Cloud-Anbieter) ─────────────────
// Nur für stimmen-vergleich.html (Leos Hör-Vergleich, 02.10.2026). Kein Raum nutzt das.
// Nach der Anbieter-Entscheidung wieder ENTFERNEN (oder in den echten TTS-Endpoint überführen).
//
// GET  /api/tts-vergleich                → { anbieter: { google:true|false, azure:…, elevenlabs:… } }
// POST /api/tts-vergleich { stimme, text } → audio/mpeg
//
// Schlüssel (Vercel → Settings → Environment Variables), jeweils optional:
//   GOOGLE_TTS_API_KEY                       (Google Cloud, Text-to-Speech API aktiviert)
//   AZURE_SPEECH_KEY + AZURE_SPEECH_REGION   (z. B. westeurope)
//   ELEVENLABS_API_KEY
// Fehlt ein Schlüssel, meldet der GET das, und die Seite zeigt „Schlüssel fehlt".
//
// Schutz gegen Missbrauch: nur feste Stimmen aus der Liste unten, Text max. 300 Zeichen.
// Stil wie api/lektor.js: export default, CORS, OPTIONS-Kurzschluss, KEIN import.meta.

const MAX_ZEICHEN = 300;

const STIMMEN = {
  // Google Chirp 3 HD
  'google-aoede':  { anbieter: 'google', name: 'de-DE-Chirp3-HD-Aoede' },
  'google-kore':   { anbieter: 'google', name: 'de-DE-Chirp3-HD-Kore' },
  'google-charon': { anbieter: 'google', name: 'de-DE-Chirp3-HD-Charon' },
  // Google WaveNet (günstiger, 4 Mio. Zeichen/Monat gratis)
  'wavenet-a': { anbieter: 'google', name: 'de-DE-Wavenet-A' },
  'wavenet-f': { anbieter: 'google', name: 'de-DE-Wavenet-F' },
  'wavenet-b': { anbieter: 'google', name: 'de-DE-Wavenet-B' },
  // Microsoft Azure Neural
  'azure-katja':     { anbieter: 'azure', name: 'de-DE-KatjaNeural' },
  'azure-seraphina': { anbieter: 'azure', name: 'de-DE-SeraphinaMultilingualNeural' },
  'azure-conrad':    { anbieter: 'azure', name: 'de-DE-ConradNeural' },
  // ElevenLabs (Standard-Stimmen; sprechen Deutsch über die mehrsprachigen Modelle)
  'eleven-flash':  { anbieter: 'elevenlabs', voiceId: 'XrExE9yKIg1WjnnlVkGX', model: 'eleven_flash_v2_5' },      // Matilda
  'eleven-multi':  { anbieter: 'elevenlabs', voiceId: 'XrExE9yKIg1WjnnlVkGX', model: 'eleven_multilingual_v2' },
};

function verfuegbar() {
  return {
    google: !!process.env.GOOGLE_TTS_API_KEY,
    azure: !!(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION),
    elevenlabs: !!process.env.ELEVENLABS_API_KEY,
  };
}

function xmlEsc(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

async function google(st, text) {
  const r = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + encodeURIComponent(process.env.GOOGLE_TTS_API_KEY), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: 'de-DE', name: st.name },
      audioConfig: { audioEncoding: 'MP3' },
    }),
  });
  if (!r.ok) throw new Error('Google ' + r.status + ': ' + (await r.text()).slice(0, 300));
  const j = await r.json();
  return Buffer.from(j.audioContent, 'base64');
}

async function azure(st, text) {
  const ssml = "<speak version='1.0' xml:lang='de-DE'><voice name='" + st.name + "'>" + xmlEsc(text) + '</voice></speak>';
  const r = await fetch('https://' + process.env.AZURE_SPEECH_REGION + '.tts.speech.microsoft.com/cognitiveservices/v1', {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'spikiu-stimmen-vergleich',
    },
    body: ssml,
  });
  if (!r.ok) throw new Error('Azure ' + r.status + ': ' + (await r.text()).slice(0, 300));
  return Buffer.from(await r.arrayBuffer());
}

async function elevenlabs(st, text) {
  const r = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + st.voiceId + '?output_format=mp3_44100_128', {
    method: 'POST',
    headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
    // language_code nur bei Flash/Turbo erlaubt (multilingual_v2 lehnt es ab)
    body: JSON.stringify(st.model === 'eleven_flash_v2_5' ? { text, model_id: st.model, language_code: 'de' } : { text, model_id: st.model }),
  });
  if (!r.ok) throw new Error('ElevenLabs ' + r.status + ': ' + (await r.text()).slice(0, 300));
  return Buffer.from(await r.arrayBuffer());
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') return res.status(200).json({ anbieter: verfuegbar() });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Nur GET/POST' });

  const body = (typeof req.body === 'string') ? (() => { try { return JSON.parse(req.body); } catch (_) { return {}; } })() : (req.body || {});
  const st = STIMMEN[body.stimme];
  const text = String(body.text || '').trim().slice(0, MAX_ZEICHEN);
  if (!st) return res.status(400).json({ error: 'Unbekannte Stimme' });
  if (!text) return res.status(400).json({ error: 'Kein Text' });
  if (!verfuegbar()[st.anbieter]) return res.status(503).json({ error: 'Schlüssel fehlt: ' + st.anbieter });

  try {
    const mp3 = st.anbieter === 'google' ? await google(st, text)
              : st.anbieter === 'azure' ? await azure(st, text)
              : await elevenlabs(st, text);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(mp3);
  } catch (e) {
    console.error('tts-vergleich:', e);
    return res.status(502).json({ error: String(e.message || e) });
  }
}
