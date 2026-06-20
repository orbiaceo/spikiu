// ── SPIKIU · RAUM: FREIES GESPRÄCH (der Flur) ──────────────────────
// EIN Endpoint für ALLE Zielsprachen. Sprache ist ein FELD (`zielsprache`),
// kein Datei-Schnitt. KEIN Sprach-Split. Zwilling von api/lektor.js.
//
// Stil wie api/chat.js + api/lektor.js: `export default`. KEIN import.meta.
// Pfade über process.cwd(). Quelle der Wahrheit: spikiu-seele.md +
// gespraech-modus.md, zur Laufzeit gelesen (faul, gecacht).
//
// Anders als der Lektor: KEIN [LEKTOR]-JSON-Vertrag. Freies Gespräch ist Prosa,
// also wird die Modell-Antwort ROH zurückgegeben ({ text }) — kein Parser nötig.

import { readFileSync } from 'fs';
import { join } from 'path';

const SPRACHE = { de: 'Deutsch', es: 'Spanisch', en: 'Englisch', el: 'Griechisch' };

let DOCS = null;

function candidates(filename) {
  return [
    join(process.cwd(), filename),
    join(process.cwd(), 'api', filename)
  ];
}

function loadOne(filename) {
  const tried = candidates(filename);
  for (const p of tried) {
    try { return { text: readFileSync(p, 'utf8'), path: p }; } catch (e) {}
  }
  return { text: null, tried };
}

function loadDocs() {
  if (DOCS) return { ok: true, seele: DOCS.seele, raum: DOCS.raum };
  const s = loadOne('spikiu-seele.md');
  const r = loadOne('gespraech-modus.md');
  if (s.text && r.text) {
    DOCS = { seele: s.text, raum: r.text };
    return { ok: true, seele: s.text, raum: r.text };
  }
  return {
    ok: false,
    error: 'soul_not_found',
    detail: {
      seele_gefunden: !!s.text,
      raum_gefunden: !!r.text,
      cwd: process.cwd(),
      versucht: { seele: s.tried, raum: r.tried }
    }
  };
}

function laufzeitProfil(p) {
  const sprache = SPRACHE[p.zielsprache] || 'die Zielsprache';
  const mutter = SPRACHE[p.muttersprache] || 'die Muttersprache des Lerners';

  return `
═══════════════════════════════════════════════════════════
DIESE SITZUNG (Laufzeit)
═══════════════════════════════════════════════════════════
- Lerner: ${p.name ? p.name : '(Name noch unbekannt — du kennst ihn nicht; sprich ihn NICHT mit Namen an, grüße einfach warm und namenlos, erfinde keinen Namen)'}
- Muttersprache: ${mutter}
- Zielsprache, in der geredet wird: ${sprache}
- Internes Können-Band (NIE aussprechen, steuert nur deinen Regler): ${p.koennen}
- Fremde Schrift: ${p.fremde_schrift ? 'JA — Lautschrift-Brücke nach Regler' : 'nein'}
- Du bist im RAUM FREIES GESPRÄCH (der Flur). Geredet wird, nicht am Text gefeilt.`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'no_api_key', detail: 'ANTHROPIC_API_KEY fehlt in den Vercel-Umgebungsvariablen.' });
  }
  const docs = loadDocs();
  if (!docs.ok) {
    return res.status(500).json(docs);
  }

  const { messages, profile, maxTokens } = req.body || {};
  if (!Array.isArray(messages) || !profile) {
    return res.status(400).json({ error: 'Missing messages or profile' });
  }

  const p = {
    name:          profile.name || '',
    muttersprache: profile.muttersprache || 'de',
    zielsprache:   profile.zielsprache || 'es',
    koennen:       profile.koennen || 'anfang',
    fremde_schrift: typeof profile.fremde_schrift === 'boolean'
                      ? profile.fremde_schrift
                      : profile.zielsprache === 'el'
  };

  const system =
    docs.seele + '\n\n' +
    docs.raum + '\n\n' +
    laufzeitProfil(p);

  // Leere History → Opener. Das Modell begrüßt warm OHNE Frage (siehe Raum-Prompt).
  let chatMessages = messages.length === 0
    ? [{ role: 'user', content: '[EINSTIEG]' }]
    : messages;
  // Anthropic verlangt: erste Nachricht hat Rolle 'user'. Beginnt die History
  // mit der Assistant-Begrüßung (alte Oberfläche im Cache), [EINSTIEG] davor.
  if (chatMessages[0] && chatMessages[0].role !== 'user') {
    chatMessages = [{ role: 'user', content: '[EINSTIEG]' }].concat(chatMessages);
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: maxTokens || 600,
        system,
        messages: chatMessages
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const text = (data.content && data.content[0] && data.content[0].text) || '';
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(502).json({ error: 'anthropic_unreachable', detail: String((e && e.message) || e) });
  }
}
