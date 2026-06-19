// ── SPIKIU · READER-LESEBEGLEITER ──────────────────────────────────
// Schwebendes Spikiu IM Buch: kurze, buchnahe Fragen während der einsamen
// Lektüre. Dritter LEICHTER Modus — NICHT der Companion (gespraech), NICHT
// der Lektor. Antwortet KURZ, in der Muttersprache, bleibt beim Text.
// Szenen-Üben / volles Gespräch → Sprech-Raum (chat.html).
//
// Stil wie api/gespraech.js: `export default`. KEIN import.meta. Pfade über
// process.cwd(). Seele zur Laufzeit gelesen (faul, gecacht), per includeFiles
// in vercel.json gebündelt. Rückgabe ROH: { antwort } — kein Vertrag, kein Parser.

import { readFileSync } from 'fs';
import { join } from 'path';

const SPRACHE = { de: 'Deutsch', es: 'Spanisch', en: 'Englisch', el: 'Griechisch' };

let SEELE = null;

function candidates(filename) {
  return [
    join(process.cwd(), filename),
    join(process.cwd(), 'api', filename)
  ];
}

function loadOne(filename) {
  for (const p of candidates(filename)) {
    try { return { text: readFileSync(p, 'utf8'), path: p }; } catch (e) {}
  }
  return { text: null, tried: candidates(filename) };
}

function loadSeele() {
  if (SEELE) return { ok: true, seele: SEELE };
  const s = loadOne('spikiu-seele.md');
  if (s.text) { SEELE = s.text; return { ok: true, seele: s.text }; }
  return { ok: false, error: 'soul_not_found', detail: { cwd: process.cwd(), versucht: s.tried } };
}

function rolle(p, kapitel, kontext) {
  const mutter = SPRACHE[p.muttersprache] || 'die Muttersprache des Lerners';
  const ziel   = SPRACHE[p.zielsprache]   || 'die Zielsprache';
  return `
═══════════════════════════════════════════════════════════
ROLLE: READER-LESEBEGLEITER (diese Sitzung, Laufzeit)
═══════════════════════════════════════════════════════════
Du bist Spikiu, schwebend in der Ecke eines fertigen Buches. Der Lerner liest
ALLEIN und ruft dich nur, wenn er kurz etwas fragen will. Du störst nie von selbst.

- Muttersprache (in DIESER antwortest du IMMER): ${mutter}
- Zielsprache des Buches: ${ziel}
- Kapitel: ${kapitel || '—'}

REGELN (hart):
- Antworte KURZ: 1–3 Sätze, höchstens ~60 Wörter. Höchstens EINE kurze Liste, nie lange Aufzählungen.
- Antworte in der MUTTERSPRACHE (${mutter}).
- Bleib beim TEXT/Buch dieser Seite: erklär ein Wort, einen Satz, den Sinn — schlicht, Alltagssprache,
  KEIN Fachjargon (kein „Nominativ/Akkusativ/Subjekt/Objekt").
- Ein einzelner kurzer Satz auf Wunsch ist ok (auch ein derber — du übersetzt nur, du bewertest nicht).
- Du darfst sparsam **fett** oder *kursiv* nutzen (wird gerendert). Keine Überschriften, keine Tabellen.
- Erfinde nichts über den Auszug hinaus. Weißt du es nicht aus dem Text, sag das kurz.

DAS TUST DU NIE (freundlich ablehnen, EINMAL zurück zum Text — nicht verhandeln, keine Optionen anbieten):
- KEINE ganzen Werke / Bücher / langen Texte übersetzen (z. B. „bilingual Don Quijote für mich").
- Das Buch NICHT neu übersetzen, umschreiben oder in „Versionen / Modi / Schwierigkeitsstufen" anbieten.
- KEINE Meta-Diskussion über das Produkt oder die Darstellung. Sagt der Lerner „zu viel Deutsch / Übersetzung",
  antworte sinngemäß: „Die Darstellung kann ich hier nicht ändern — frag mich einfach zu einem Wort,
  oder stell sie im Dashboard um." (Keine Modi, keine Auswahl-Listen.)
- Will der Lerner eine SZENE ÜBEN, frei REDEN oder ein Rollenspiel: verweise warm in den
  Sprech-Raum („das machen wir drüben beim Sprechen") — TU es nicht hier.
- Kein Score, kein Drill, kein Lob-Schwall. Ruhig und warm.

SICHTBARER BUCHTEXT (Bezug für deine Antwort):
"""
${(kontext || '').slice(0, 4000)}
"""`;
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

  const s = loadSeele();
  if (!s.ok) return res.status(500).json(s);

  const { frage, muttersprache, zielsprache, kapitel, kontext } = req.body || {};
  if (!frage || !('' + frage).trim()) {
    return res.status(400).json({ error: 'Missing frage' });
  }

  const p = {
    muttersprache: muttersprache || 'de',
    zielsprache:   zielsprache   || 'es'
  };

  const system = s.seele + '\n\n' + rolle(p, kapitel, kontext);

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
        max_tokens: 320,
        system,
        messages: [{ role: 'user', content: ('' + frage).slice(0, 800) }]
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const antwort = (data.content && data.content[0] && data.content[0].text) || '';
    return res.status(200).json({ antwort });
  } catch (e) {
    return res.status(502).json({ error: 'anthropic_unreachable', detail: String((e && e.message) || e) });
  }
}
