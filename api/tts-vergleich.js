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

/* BREMSE (14.11.2026) — 10 Anfragen je Minute und IP. Testwerkzeug für den Hör-Vergleich.
   Gleiches Muster wie api/lektor.js (zählt in der laufenden Instanz). */
const _fenster = 60 * 1000;
const _grenze = 10;
const _zaehler = new Map();

function _zuOft(req) {
  const roh = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unbekannt';
  const ip = String(roh).split(',')[0].trim();
  const jetzt = Date.now();

  /* Alte Einträge wegräumen, damit die Map nicht wächst. */
  if (_zaehler.size > 5000) {
    for (const [k, v] of _zaehler) if (jetzt - v.start > _fenster) _zaehler.delete(k);
  }

  const e = _zaehler.get(ip);
  if (!e || jetzt - e.start > _fenster) {
    _zaehler.set(ip, { n: 1, start: jetzt });
    return 0;
  }
  e.n += 1;
  return e.n > _grenze ? Math.ceil((_fenster - (jetzt - e.start)) / 1000) : 0;
}

// Verlaufs-Caching (02.10.): Cache-Marke an die LETZTE Nachricht → alles davor (System + bisheriger
// Verlauf) wird beim nächsten Zug zu ~1/10 gelesen. Explizite Marke statt Top-Level-Option (robuster).
function mitVerlaufsCache(msgs) {
  if (!Array.isArray(msgs) || !msgs.length) return msgs;
  const i = msgs.length - 1, m = msgs[i];
  let content;
  if (typeof m.content === 'string') content = [{ type: 'text', text: m.content, cache_control: { type: 'ephemeral' } }];
  else if (Array.isArray(m.content) && m.content.length) content = m.content.map((b, j) => j === m.content.length - 1 ? { ...b, cache_control: { type: 'ephemeral' } } : b);
  else return msgs;
  return msgs.slice(0, i).concat([{ ...m, content }]);
}

/* ══════════════════════════════════════════════════════════════
   DECKEL (14.11.2026) — die Anfrage selbst begrenzen.
   Ohne ihn konnte man beliebig lange Verläufe schicken und damit
   Eingabe-Token in jeder Menge verbrauchen. 60.000 Zeichen und 60
   Nachrichten liegen weit über jedem echten Gespräch.
   Nur die Rollen user/assistant — kein eingeschmuggelter system-Eintrag.
   ══════════════════════════════════════════════════════════════ */
function _anfrageZuGross(body) {
  let n = 0;
  try { n = JSON.stringify(body || {}).length; } catch (e) { n = Infinity; }
  if (n > 60000) return { status: 413, error: 'zu_gross' };
  if (body && Array.isArray(body.messages)) {
    const m = body.messages;
    if (m.length > 60) return { status: 400, error: 'zu_viele_nachrichten' };
    if (m.some(x => !x || (x.role !== 'user' && x.role !== 'assistant'))) return { status: 400, error: 'messages_ungueltig' };
  }
  return null;
}

export default async function handler(req, res) {
  /* ══════════════════════════════════════════════════════════════
     WACHE (14.11.2026) — vorher `Allow-Origin: *`: jede fremde Seite
     konnte diesen Endpoint auf Leos Rechnung aufrufen. Jetzt nur
     spikiu.com und der EIGENE Ursprung (Origin == Host, für die
     dev-Vorschauen). Ohne Origin → 403.
     ══════════════════════════════════════════════════════════════ */
  const ERLAUBT = ['https://spikiu.com', 'https://www.spikiu.com', 'http://localhost:3000', 'http://127.0.0.1:3000'];
  const herkunft = req.headers.origin || '';
  const _host = String(req.headers.host || '').toLowerCase();
  const eigen = ERLAUBT.includes(herkunft)
    || (!!herkunft && !!_host && herkunft.toLowerCase() === 'https://' + _host);
  if (!eigen) return res.status(403).json({ error: 'origin_not_allowed' });
  res.setHeader('Access-Control-Allow-Origin', herkunft);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') return res.status(200).json({ anbieter: verfuegbar() });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Nur GET/POST' });
  /* Bremse: greift, bevor irgendetwas Geld kostet. */
  const _warte = _zuOft(req);
  if (_warte) {
    res.setHeader('Retry-After', String(_warte));
    return res.status(429).json({ error: 'zu_viele_anfragen', retryAfter: _warte });
  }
  /* DECKEL (14.11.2026): Größe und Form der Anfrage, bevor etwas Geld kostet. */
  const _deckel = _anfrageZuGross(req.body);
  if (_deckel) return res.status(_deckel.status).json({ error: _deckel.error });


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
