// ── SPIKIU · GEFÜHRTES GESPRÄCH · DIE HÄPPCHEN (Vorbereitung VOR der Charla) ──
// Eigener Endpoint (Vertrag B). Erzeugt die Vorbereitungs-Häppchen zu EINEM Thema:
// Wortschatz (4–6) + Hörverständnis (2–3, Minimalpaar A/B). KEINE Charla, KEIN
// Rollenspiel — das bleibt api/gespraech.js. Hier nur striktes JSON.
//
// Stil wie api/lektor.js: `export default`. KEIN import.meta. Pfade über
// process.cwd(). Quelle der Wahrheit: spikiu-seele.md + haeppchen-modus.md,
// zur Laufzeit gelesen (faul, gecacht). EIN Endpoint für ALLE Zielsprachen —
// Sprache ist ein FELD (`zielsprache`), kein Datei-Schnitt.

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
  if (DOCS) return { ok: true, seele: DOCS.seele, modus: DOCS.modus };
  const s = loadOne('spikiu-seele.md');
  const m = loadOne('haeppchen-modus.md');
  if (s.text && m.text) {
    DOCS = { seele: s.text, modus: m.text };
    return { ok: true, seele: s.text, modus: m.text };
  }
  return {
    ok: false,
    error: 'soul_not_found',
    detail: {
      seele_gefunden: !!s.text,
      modus_gefunden: !!m.text,
      cwd: process.cwd(),
      versucht: { seele: s.tried, modus: m.tried }
    }
  };
}

function vertragsAnweisung(sprache, mutter, koennen, fremde_schrift) {
  const reglerRegel = {
    anfang:          'koennen = anfang: kurz und einfach. Mehr Muttersprach-Brücke. Häufige Alltagswörter.',
    mittel:          'koennen = mittel: etwas knapper, normale Alltagswendungen.',
    fortgeschritten: 'koennen = fortgeschritten: knapper und anspruchsvoller, idiomatischer.'
  }[koennen] || 'koennen = anfang: kurz und einfach, mehr Brücke.';

  const schriftRegel = fremde_schrift
    ? `Die Zielsprache (${sprache}) nutzt eine fremde Schrift. "lautschrift" ist PFLICHT: eine Umschrift in lateinischen Buchstaben, EIN konsistentes System über alle Einträge (gleiche Mechanik wie der Reader). Nie mal so, mal anders.`
    : `Die Zielsprache nutzt lateinische Schrift. "lautschrift" ist OPTIONAL: eine leichte Betonungs-/Aussprachehilfe, darf fehlen (dann null oder weglassen). Erfinde KEINE Phonetik — im Zweifel weglassen. Das echte Vorbild ist das Audio, nicht die Schrift.`;

  return `
═══════════════════════════════════════════════════════════
DEINE ANTWORT — STRIKTES JSON (der Vertrag)
═══════════════════════════════════════════════════════════
Du antwortest AUSSCHLIESSLICH mit EINEM gültigen JSON-Objekt. Nichts davor,
nichts danach. KEINE Markdown-Zäune (\`\`\`), KEIN Vorwort, KEINE Erklärung.

{
  "thema": "…",
  "wortschatz": [
    { "ziel": "…", "lautschrift": null, "uebersetzung": "…" }
  ],
  "hoerverstehen": [
    {
      "audio": "…",
      "frage": "…",
      "optionen": [
        { "text": "…", "richtig": true },
        { "text": "…", "richtig": false }
      ]
    }
  ]
}

Felder:
- "thema": das Thema, wie es reinkam.
- "wortschatz": 4–6 Einträge zum Thema, alltagsnah. "ziel" = Wort/Wendung in der
  Zielsprache (${sprache}), español NEUTRO (nie voseo, keine Río-de-la-Plata-Form).
  "uebersetzung" = Bedeutung in der Muttersprache (${mutter}). "lautschrift": ${schriftRegel}
- "hoerverstehen": 2–3 Items. "audio" = EIN kurzer Satz aus dem Themen-Wortschatz
  (Zielsprache). "frage" = in der Muttersprache (${mutter}), z. B. „Was hörst du?".
  "optionen" = genau ZWEI: genau EINE mit "richtig": true (= der "audio"-Satz wörtlich),
  die andere ein NAHER Minimalpaar-Kontrast (carta/cuenta, reserva/pregunta, para mí/para ti).
- ${reglerRegel}

Plain language. KEINE Eselsbrücken, KEINE Grammatik-Fachwörter, KEIN CEFR (A1/B2) im Output.
JSON-Gerüst nutzt gerade doppelte Anführungszeichen "". Verwende INNERHALB der Werte
NIEMALS gerade " — nur typografische „ " ‚ ', sonst zerbricht das JSON.`;
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
  if (!docs.ok) return res.status(500).json(docs);

  const body = req.body || {};
  const thema = (typeof body.thema === 'string' ? body.thema : '').trim();
  if (!thema) return res.status(400).json({ error: 'Missing thema' });

  const zielsprache   = SPRACHE[body.zielsprache] ? body.zielsprache : 'es';
  const muttersprache = SPRACHE[body.muttersprache] ? body.muttersprache : 'de';
  const koennen       = ['anfang', 'mittel', 'fortgeschritten'].includes(body.koennen) ? body.koennen : 'anfang';
  const fremde_schrift = typeof body.fremde_schrift === 'boolean'
    ? body.fremde_schrift
    : zielsprache === 'el';

  const laufzeit = `
═══════════════════════════════════════════════════════════
DIESE HÄPPCHEN (Laufzeit)
═══════════════════════════════════════════════════════════
- Thema: "${thema}"
- Zielsprache (so klingt das Audio, daraus der Wortschatz): ${SPRACHE[zielsprache]}
- Muttersprache (Übersetzungen + Fragen): ${SPRACHE[muttersprache]}
- koennen (INTERN, nie sichtbar): ${koennen}
- Du erzeugst NUR die Vorbereitungs-Häppchen. KEIN Rollenspiel, KEINE Charla, KEINE Anrede.`;

  const system =
    docs.seele + '\n\n' +
    docs.modus + '\n\n' +
    laufzeit + '\n' +
    vertragsAnweisung(SPRACHE[zielsprache], SPRACHE[muttersprache], koennen, fremde_schrift);

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
        max_tokens: 1200,
        system,
        messages: [{ role: 'user', content: `[HÄPPCHEN] Thema: ${thema}` }]
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const text = (data.content && data.content[0] && data.content[0].text) || '';
    const parsed = parseHaeppchen(text);
    const out = normalizeHaeppchen(parsed, thema);
    // Sauberes 200 IMMER (nie HTML/Prosa). Leere Listen → die Oberfläche steigt
    // anstandslos direkt ins Rollenspiel ein (kein toter Flow).
    if (!out.wortschatz.length) out.error = 'parse_or_empty';
    return res.status(200).json(out);
  } catch (e) {
    return res.status(502).json({ error: 'anthropic_unreachable', detail: String((e && e.message) || e) });
  }
}

// ── Parser: striktes JSON, vorher ```-Zäune strippen + auf {…} eingrenzen ──
function parseHaeppchen(text) {
  if (!text) return null;
  let raw = text;
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1];
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  try { return JSON.parse(raw.slice(start, end + 1)); } catch (e) {}
  // Letzter Versuch: ganz simple Reinigung (trailing-Kommas vor } oder ]).
  try { return JSON.parse(raw.slice(start, end + 1).replace(/,\s*([}\]])/g, '$1')); } catch (e) {}
  return null;
}

function str(v) { return typeof v === 'string' ? v.trim() : ''; }

function normalizeHaeppchen(obj, thema) {
  obj = obj || {};
  const wortschatz = Array.isArray(obj.wortschatz) ? obj.wortschatz : [];
  const hoerverstehen = Array.isArray(obj.hoerverstehen) ? obj.hoerverstehen : [];

  const w = wortschatz
    .map(e => ({
      ziel: str(e && e.ziel),
      lautschrift: str(e && e.lautschrift) || null,
      uebersetzung: str(e && e.uebersetzung)
    }))
    .filter(e => e.ziel)
    .slice(0, 6);

  const h = hoerverstehen
    .map(e => {
      const optionen = (Array.isArray(e && e.optionen) ? e.optionen : [])
        .map(o => ({ text: str(o && o.text), richtig: !!(o && o.richtig) }))
        .filter(o => o.text)
        .slice(0, 2);
      return { audio: str(e && e.audio), frage: str(e && e.frage), optionen };
    })
    // Brauchbar = Satz + genau eine richtige + zwei Optionen.
    .filter(e => e.audio && e.optionen.length === 2 && e.optionen.filter(o => o.richtig).length === 1)
    .slice(0, 3);

  return { thema: str(obj.thema) || thema, wortschatz: w, hoerverstehen: h };
}
