// ── SPIKIU · RAUM: SCHREIBEN (LEKTOR) ──────────────────────────────
// EIN Endpoint für ALLE Zielsprachen. Sprache ist ein FELD (`zielsprache`),
// kein Datei-Schnitt. KEIN Sprach-Split.
//
// Stil wie api/chat.js: `export default`. KEIN import.meta. Pfade über
// process.cwd(). Quelle der Wahrheit: spikiu-seele.md + lektor-modus.md,
// zur Laufzeit gelesen (faul, gecacht).

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
  if (DOCS) return { ok: true, seele: DOCS.seele, lektor: DOCS.lektor };
  const s = loadOne('spikiu-seele.md');
  const l = loadOne('lektor-modus.md');
  if (s.text && l.text) {
    DOCS = { seele: s.text, lektor: l.text };
    return { ok: true, seele: s.text, lektor: l.text };
  }
  return {
    ok: false,
    error: 'soul_not_found',
    detail: {
      seele_gefunden: !!s.text,
      lektor_gefunden: !!l.text,
      cwd: process.cwd(),
      versucht: { seele: s.tried, lektor: l.tried }
    }
  };
}

function vertragsAnweisung(sprache, koennen, fremde_schrift) {
  const reglerRegel = {
    anfang:          'ZEIGEN: Bei "lesen" und "beinah" setzt du "form" auf die fertige Form. Frust schließt das Fenster — im Zweifel zeigen.',
    mittel:          'IM ZWEIFEL ZEIGEN: Beim ersten "lesen" gib nur den Wink ("form": null). Bei "beinah" setzt du "form".',
    fortgeschritten: 'RINGEN LASSEN: "form" bleibt null. Nur bei "stuck" gibst du die Form.'
  }[koennen] || 'ZEIGEN: Im Zweifel zeigen, "form" gesetzt.';

  const schriftRegel = fremde_schrift
    ? `Die Zielsprache (${sprache}) hat eine fremde Schrift. Wenn "form" gesetzt ist, setze "lautschrift" auf eine einfache Aussprache-Hilfe in lateinischen Buchstaben. Sonst "lautschrift": null.`
    : 'Die Zielsprache nutzt lateinische Schrift. "lautschrift": null.';

  return `
═══════════════════════════════════════════════════════════
DEINE ANTWORT — STRIKTES FORMAT (der Vertrag)
═══════════════════════════════════════════════════════════
Du antwortest AUSSCHLIESSLICH mit EINEM Block. Nichts davor, nichts danach.

[LEKTOR]
{"sinn":"...","zitat":"...","sache":"...","form":null,"lautschrift":null,"status":"lesen"}
[/LEKTOR]

Gültiges JSON. Das JSON-Gerüst nutzt gerade doppelte Anführungszeichen.
KRITISCH — Anführungszeichen INNERHALB der Werte: Wenn du im Text ein Wort
oder eine Wendung hervorheben oder zitieren willst, benutze NUR typografische
Anführungszeichen „so“ oder ‚so‘. Benutze NIEMALS das gerade Zeichen " innerhalb
eines Wertes — das gehört allein dem JSON-Gerüst und würde es zerbrechen.
KEINE Zeilenumbrüche innerhalb der Werte.

Felder:
- "sinn": EINE kurze Leser-Zeile, Sinn zuerst, in der Muttersprache des Lerners.
- "zitat": der EXAKTE Teilstring aus dem zuletzt geschriebenen Text — die EINE Stelle,
  an der du arbeitest. Wörtlich kopiert, damit die Oberfläche ihn findet und markiert.
  Bei "treffer"/"ziellinie": "" (leer).
- "sache": die EINE Sache, Alltagssprache, KEIN Fachwort. Bei "treffer"/"ziellinie": "".
- "form": die fertige, korrigierte Stelle — oder null. Regel: ${reglerRegel}
- "lautschrift": ${schriftRegel}
- "status": genau EINER von:
    "lesen"     = erste Berührung dieser Stelle.
    "beinah"    = neue Fassung fast richtig, gleiche Stelle, nächster Anlauf.
    "stuck"     = nach 2 Anläufen festgefahren → "form" geben zum Abschreiben, nicht nochmal fragen.
    "treffer"   = die Stelle sitzt jetzt.
    "ziellinie" = der ganze Text tut seine Aufgabe. In "sinn" bietest du an, eine
                  Lektion aus diesem Text zu machen.

EISERN: nur EINE Sache pro Runde. Nie den ganzen Text anstreichen. Max 2 Anläufe je
Stelle, dann "stuck" und weiter (Vorwärts schlägt Perfektion).`;
}

function laufzeitProfil(p) {
  const sprache = SPRACHE[p.zielsprache] || 'die Zielsprache';
  const mutter = SPRACHE[p.muttersprache] || 'die Muttersprache des Lerners';
  const aufgabe = p.aufgabe
    ? `Die Aufgabe des Lerners: "${p.aufgabe}". Arbeite auf diese Aufgabe hin.`
    : `Es gibt noch KEINE Aufgabe. Falls der Lerner noch nichts geschrieben hat, stelle GENAU EINE Frage (Feld "sinn", status "lesen", alles andere leer/null): was er schreiben können möchte. Nie zwei Fragen, nie eine Übung davor.`;

  return `
═══════════════════════════════════════════════════════════
DIESE SITZUNG (Laufzeit)
═══════════════════════════════════════════════════════════
- Lerner: ${p.name || 'der Lerner'}
- Muttersprache: ${mutter}
- Zielsprache, in der geschrieben wird: ${sprache}
- ${aufgabe}
- Du bist im RAUM SCHREIBEN. Der Lerner legt Text hin, du arbeitest am Werkstück.`;
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
                      : profile.zielsprache === 'el',
    aufgabe:       profile.aufgabe || null
  };

  // Prompt-Caching, siehe api/gespraech.js. Block 1 stabil, Block 2 variabel.
  const system = [
    { type: 'text',
      text: docs.seele + '\n\n' + docs.lektor,
      cache_control: { type: 'ephemeral' } },
    { type: 'text',
      text: laufzeitProfil(p) + '\n' +
            vertragsAnweisung(SPRACHE[p.zielsprache] || 'die Zielsprache', p.koennen, p.fremde_schrift) }
  ];

  const chatMessages = messages.length === 0
    ? [{ role: 'user', content: '[EINSTIEG]' }]
    : messages;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        // Korrigieren ist eine strukturierte Aufgabe nach festem Schema; Lerner
        // selten ueber B1/B2. Haiku reicht und kostet ein Fuenftel.
        model: 'claude-haiku-4-5',
        max_tokens: maxTokens || 600,
        system,
        messages: chatMessages
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const text = (data.content && data.content[0] && data.content[0].text) || '';
    const lektor = parseLektor(text);
    return res.status(200).json({ lektor, text });
  } catch (e) {
    return res.status(502).json({ error: 'anthropic_unreachable', detail: String((e && e.message) || e) });
  }
}

// ── Parser: erst sauberes JSON, sonst toleranter Feld-für-Feld-Auszug ──
// Robust gegen gerade Anführungszeichen MITTEN in Werten (der Klassiker, an dem
// striktes JSON.parse zerbricht). Wir schneiden an den bekannten Feld-Markern,
// nicht an Anführungszeichen — so überleben innere " als Text.
function parseLektor(text) {
  const m = text.match(/\[LEKTOR\]([\s\S]*?)\[\/LEKTOR\]/);
  const block = m ? m[1] : text;
  const start = block.indexOf('{');
  const end = block.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  const raw = block.slice(start, end + 1);

  // Schneller Weg: striktes JSON.
  try {
    return normalize(JSON.parse(raw));
  } catch (e) {}

  // Netz drunter: toleranter Auszug.
  const keys = ['sinn', 'zitat', 'sache', 'form', 'lautschrift', 'status'];
  const out = {};
  for (const k of keys) out[k] = extractField(raw, k, keys.filter(x => x !== k));
  if (out.sinn === undefined && out.zitat === undefined && out.sache === undefined) return null;
  return normalize(out);
}

function extractField(raw, key, otherKeys) {
  const marker = '"' + key + '"';
  let i = raw.indexOf(marker);
  if (i === -1) return undefined;
  i = raw.indexOf(':', i + marker.length);
  if (i === -1) return undefined;
  let start = i + 1;
  let end = -1;
  for (const nk of otherKeys) {
    const j = raw.indexOf('"' + nk + '"', start);
    if (j !== -1 && (end === -1 || j < end)) end = j;
  }
  if (end === -1) end = raw.lastIndexOf('}');
  if (end === -1) end = raw.length;
  let val = raw.slice(start, end).trim().replace(/,\s*$/, '').trim();
  if (val === 'null' || val === '') return val === 'null' ? null : '';
  if (val.startsWith('"')) val = val.slice(1);
  if (val.endsWith('"')) val = val.slice(0, -1);
  return val
    .replace(/\\n/g, ' ')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .trim();
}

function normalize(obj) {
  obj = obj || {};
  return {
    sinn:       typeof obj.sinn === 'string' ? obj.sinn : '',
    zitat:      typeof obj.zitat === 'string' ? obj.zitat : '',
    sache:      typeof obj.sache === 'string' ? obj.sache : '',
    form:       (obj.form === null || typeof obj.form === 'string') ? obj.form : null,
    lautschrift:(obj.lautschrift === null || typeof obj.lautschrift === 'string') ? obj.lautschrift : null,
    status:     ['lesen','beinah','treffer','stuck','ziellinie'].includes(obj.status) ? obj.status : 'lesen'
  };
}
