// ── SPIKIU · RAUM: LESEN (TALLER DE LECTURA) ───────────────────────
// EIN Endpoint für ALLE Zielsprachen. Sprache ist ein FELD (`zielsprache`),
// kein Datei-Schnitt. KEIN Sprach-Split.
//
// Stil wie api/lektor.js: `export default`. KEIN import.meta. Pfade über
// process.cwd(). Quelle der Wahrheit: spikiu-seele.md + taller-modus.md,
// zur Laufzeit gelesen (faul, gecacht).
//
// Zwei Phasen, das Backend wählt nach `antwort`:
//   antwort == null            → Phase 1: frisches Taller komponieren ([TALLER])
//   antwort == {frage,texto,satz} → Phase 2: Freitext-Satz bewerten ([REACCION])

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
  if (DOCS) return { ok: true, seele: DOCS.seele, taller: DOCS.taller };
  const s = loadOne('spikiu-seele.md');
  const t = loadOne('taller-modus.md');
  if (s.text && t.text) {
    DOCS = { seele: s.text, taller: t.text };
    return { ok: true, seele: s.text, taller: t.text };
  }
  return {
    ok: false,
    error: 'soul_not_found',
    detail: {
      seele_gefunden: !!s.text,
      taller_gefunden: !!t.text,
      cwd: process.cwd(),
      versucht: { seele: s.tried, taller: t.tried }
    }
  };
}

// ── PHASE 1: Vertrag (frisches Taller) ─────────────────────────────
function reglerText(koennen) {
  return {
    anfang:          'anfang: leichter, sehr kurzer Text. "bruecke" SETZEN (ein paar Schlüsselwörter mit Übersetzung). MC-"frage" in der Muttersprache, Antwortoptionen in der Zielsprache. In Phase 2 ZEIGEN.',
    mittel:          'mittel: etwas reicher, weiterhin kurz. "bruecke" knapp SETZEN. Fragen gemischt.',
    fortgeschritten: 'fortgeschritten: voller Standardtext. "bruecke": null. Alle Fragen in der Zielsprache. In Phase 2 ringen lassen.'
  }[koennen] || 'Im Zweifel: kurz, "bruecke" gesetzt.';
}

function vertragPhase1(sprache, mutter, koennen, fremde_schrift) {
  const schriftRegel = fremde_schrift
    ? `Die Zielsprache (${sprache}) hat eine fremde Schrift. Setze "lautschrift" auf eine Transliteration des "texto" in lateinischen Buchstaben (bei "anfang"; bei "mittel" knapper; bei "fortgeschritten" "lautschrift": null). Halte EIN konsistentes Umschrift-System über die ganze Antwort.`
    : 'Die Zielsprache nutzt lateinische Schrift. "lautschrift": null.';

  return `
═══════════════════════════════════════════════════════════
DEINE ANTWORT — STRIKTES FORMAT (der Vertrag) · PHASE 1
═══════════════════════════════════════════════════════════
Du antwortest AUSSCHLIESSLICH mit EINEM Block. Nichts davor, nichts danach.

[TALLER]
{"rahmen":"...","texto":"...","bruecke":null,"lautschrift":null,"aufgaben":[{"typ":"mc","frage":"...","optionen":["...","...","..."],"loesung":0,"erklaerung":"..."},{"typ":"orden","frage":"...","teile":["...","...","..."],"loesung":[2,0,1]},{"typ":"frei","frage":"...","hinweis":"..."}],"schluss":"..."}
[/TALLER]

Gültiges JSON. Das JSON-Gerüst nutzt gerade doppelte Anführungszeichen.
KRITISCH — Anführungszeichen INNERHALB der Werte: Wenn du im Text ein Wort
hervorheben oder zitieren willst, benutze NUR typografische Anführungszeichen
„so“ oder ‚so‘. Benutze NIEMALS das gerade Zeichen " innerhalb eines Wertes —
das gehört allein dem JSON-Gerüst und würde es zerbrechen.
KEINE Zeilenumbrüche innerhalb der Werte.

Felder:
- "rahmen": Eröffnung in der Muttersprache des Lerners (${mutter}). Seminar-Stimme,
  lädt zum Lesen ein, ruhig. Kein Test-Ton, kein „Aufgabe 1 von 3".
- "texto": der Lesetext in der Zielsprache (${sprache}). Kurz — ein Blick. Ein echter
  Gebrauchstext (Anzeige, Aushang, kurze Nachricht, Speisekarte, kurzer Artikel).
  Neutrale Standardform, NIE regional/voseo.
- "bruecke": ein paar Schlüsselwörter mit Übersetzung als EINE Zeile — oder null.
  Regler: ${reglerText(koennen)}
- "lautschrift": ${schriftRegel}
- "aufgaben": ein Array mit WENIGEN Aufgaben (ein bis zwei pro Typ), immer AM TEXT.
  Erlaubte Typen:
   • "mc":    {"typ":"mc","frage":"...","optionen":[drei Strings],"loesung":Index der richtigen Option (0-basiert),"erklaerung":"kurz, am Text"}.
   • "orden": {"typ":"orden","frage":"...","teile":[drei kurze Strings in GEMISCHTER Reihenfolge],"loesung":[die teile-Indizes in der RICHTIGEN Reihenfolge]}.
              NUR wenn der Text eine echte Abfolge trägt (zuerst… dann… danach…), sonst diesen Typ WEGLASSEN.
   • "frei":  {"typ":"frei","frage":"...","hinweis":"kurzer Stups"} — eine offene Frage, keine feste Lösung.
  Mindestens "mc" und "frei". "orden" nur bei echter Reihenfolge.
- "schluss": warme Manöverkritik in deiner Stimme, Muttersprache. KEIN Punktestand,
  KEIN Prozent, kein „X von Y richtig".

EISERN: wenige Aufgaben, kein Arbeitsblatt-Schwall. Schwere nach Können. Nie ein
hartes „falsch" — falsch wird ruhig gezeigt.`;
}

// ── PHASE 2: Vertrag (Freitext-Satz bewerten) ──────────────────────
function vertragPhase2(sprache, mutter, koennen) {
  const regler = {
    anfang:          'anfang: ZEIGEN — reich eine saubere bessere Fassung als Modell ("besser" gesetzt).',
    mittel:          'mittel: erst ein Stups, dann zeigen ("besser" eher gesetzt).',
    fortgeschritten: 'fortgeschritten: ringen lassen — "besser": null, nur das Prinzip in "reaktion" nennen.'
  }[koennen] || 'Im Zweifel zeigen ("besser" gesetzt).';

  return `
═══════════════════════════════════════════════════════════
DEINE ANTWORT — STRIKTES FORMAT (der Vertrag) · PHASE 2
═══════════════════════════════════════════════════════════
Der Lerner hat zur Frage einen eigenen Satz geschrieben. Reagiere wie der Lektor,
aber leichter — es ist eine Lese-Antwort, kein Aufsatz.
Du antwortest AUSSCHLIESSLICH mit EINEM Block. Nichts davor, nichts danach.

[REACCION]
{"reaktion":"...","besser":null}
[/REACCION]

Gültiges JSON. Anführungszeichen INNERHALB der Werte: nur typografische „so“.
NIEMALS das gerade Zeichen " im Wert. KEINE Zeilenumbrüche in Werten.

Felder:
- "reaktion": eine warme Leser-Zeile in der Muttersprache (${mutter}). Reagiere auf
  den Sinn zuerst, würdige, was gelandet ist. Höchstens die EINE wichtigste Sache,
  am Satz gezeigt — kein Regelvortrag. Kein Applaus, kein Punktestand.
- "besser": eine saubere bessere Fassung des Satzes in der Zielsprache (${sprache})
  — oder null. Regler: ${regler}`;
}

function laufzeitProfil(p, thema) {
  const sprache = SPRACHE[p.zielsprache] || 'die Zielsprache';
  const mutter = SPRACHE[p.muttersprache] || 'die Muttersprache des Lerners';
  const themaZeile = thema
    ? `Themenwunsch des Lerners: „${thema}". Nimm es als Stoff für den Text.`
    : 'Kein besonderer Themenwunsch — wähle einen alltagsnahen Gebrauchstext.';

  return `
═══════════════════════════════════════════════════════════
DIESE SITZUNG (Laufzeit)
═══════════════════════════════════════════════════════════
- Lerner: ${p.name || 'der Lerner'}
- Muttersprache: ${mutter}
- Zielsprache (Lesetext): ${sprache}
- Können (intern, nie sichtbar): ${p.koennen}
- ${themaZeile}
- Du bist im RAUM LESEN (Taller de lectura).`;
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

  const { profile, thema, antwort, maxTokens } = req.body || {};
  if (!profile) return res.status(400).json({ error: 'Missing profile' });

  const p = {
    name:          profile.name || '',
    muttersprache: profile.muttersprache || 'de',
    zielsprache:   profile.zielsprache || 'es',
    koennen:       profile.koennen || 'anfang',
    fremde_schrift: typeof profile.fremde_schrift === 'boolean'
                      ? profile.fremde_schrift
                      : profile.zielsprache === 'el'
  };
  const sprache = SPRACHE[p.zielsprache] || 'die Zielsprache';
  const mutter = SPRACHE[p.muttersprache] || 'die Muttersprache des Lerners';

  const istPhase2 = antwort && typeof antwort === 'object' &&
                    typeof antwort.satz === 'string' && antwort.satz.trim() !== '';

  let system, userMsg, fallbackTokens;
  if (istPhase2) {
    system = docs.seele + '\n\n' + docs.taller + '\n\n' +
             laufzeitProfil(p, thema || null) + '\n' +
             vertragPhase2(sprache, mutter, p.koennen);
    userMsg = '[FREITEXT-ANTWORT]\n' +
              'Frage: ' + (antwort.frage || '') + '\n' +
              'Gelesener Text: ' + (antwort.texto || '') + '\n' +
              'Satz des Lerners: ' + antwort.satz;
    fallbackTokens = 500;
  } else {
    system = docs.seele + '\n\n' + docs.taller + '\n\n' +
             laufzeitProfil(p, thema || null) + '\n' +
             vertragPhase1(sprache, mutter, p.koennen, p.fremde_schrift);
    userMsg = '[TALLER_NEU]';
    fallbackTokens = 1200;
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
        model: 'claude-haiku-4-5',
        max_tokens: maxTokens || fallbackTokens,
        system,
        messages: [{ role: 'user', content: userMsg }]
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const text = (data.content && data.content[0] && data.content[0].text) || '';
    if (istPhase2) {
      const reaccion = parseReaccion(text);
      return res.status(200).json({ reaccion, text });
    }
    const taller = parseTaller(text);
    return res.status(200).json({ taller, text });
  } catch (e) {
    return res.status(502).json({ error: 'anthropic_unreachable', detail: String((e && e.message) || e) });
  }
}

// ── Parser ─────────────────────────────────────────────────────────
// Erst sauberes JSON; scheitert es, eine SANFTE Reinigung (Zeilenumbrüche
// raus, abschließende Kommas raus) und nochmal. Sonst null → Oberfläche
// zeigt einen sanften Wiederholen-Knopf. (Anders als beim Lektor lässt sich
// die verschachtelte aufgaben-Struktur nicht feldweise zusammenflicken.)
function tryParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }

function sanft(s) {
  return s.replace(/\r?\n/g, ' ').replace(/,\s*([}\]])/g, '$1');
}

function parseTaller(text) {
  const m = text.match(/\[TALLER\]([\s\S]*?)\[\/TALLER\]/);
  const block = m ? m[1] : text;
  const start = block.indexOf('{');
  const end = block.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  const raw = block.slice(start, end + 1);

  let obj = tryParse(raw);
  if (!obj) obj = tryParse(sanft(raw));
  if (!obj) return null;
  return normalizeTaller(obj);
}

function parseReaccion(text) {
  const m = text.match(/\[REACCION\]([\s\S]*?)\[\/REACCION\]/);
  const block = m ? m[1] : text;
  const start = block.indexOf('{');
  const end = block.lastIndexOf('}');
  if (start === -1 || end === -1) {
    return normalizeReaccion({ reaktion: (text || '').trim().slice(0, 400), besser: null });
  }
  const raw = block.slice(start, end + 1);

  let obj = tryParse(raw) || tryParse(sanft(raw));
  if (!obj) {
    // Netz drunter: nur zwei flache Felder, also feldweiser Auszug (wie Lektor).
    obj = {
      reaktion: extractField(raw, 'reaktion', ['besser']),
      besser:   extractField(raw, 'besser', ['reaktion'])
    };
  }
  return normalizeReaccion(obj);
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
  return val.replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\\\\/g, '\\').trim();
}

function asStr(v) { return typeof v === 'string' ? v : ''; }

function normalizeTaller(o) {
  o = o || {};
  const aufgaben = Array.isArray(o.aufgaben)
    ? o.aufgaben.map(normAufgabe).filter(Boolean)
    : [];
  return {
    rahmen:      asStr(o.rahmen),
    texto:       asStr(o.texto),
    bruecke:     (typeof o.bruecke === 'string' && o.bruecke.trim()) ? o.bruecke : null,
    lautschrift: (typeof o.lautschrift === 'string' && o.lautschrift.trim()) ? o.lautschrift : null,
    aufgaben,
    schluss:     asStr(o.schluss)
  };
}

function normAufgabe(a) {
  if (!a || typeof a !== 'object') return null;
  if (a.typ === 'mc') {
    const optionen = Array.isArray(a.optionen) ? a.optionen.map(asStr).filter(x => x !== '') : [];
    if (optionen.length < 2) return null;
    let loesung = Number.isInteger(a.loesung) ? a.loesung : parseInt(a.loesung, 10);
    if (!(loesung >= 0 && loesung < optionen.length)) loesung = 0;
    return { typ: 'mc', frage: asStr(a.frage), optionen, loesung, erklaerung: asStr(a.erklaerung) };
  }
  if (a.typ === 'orden') {
    const teile = Array.isArray(a.teile) ? a.teile.map(asStr).filter(x => x !== '') : [];
    if (teile.length < 2) return null;
    let loesung = Array.isArray(a.loesung) ? a.loesung.map(n => parseInt(n, 10)) : [];
    const istPermutation = loesung.length === teile.length &&
      loesung.every(n => Number.isInteger(n) && n >= 0 && n < teile.length) &&
      new Set(loesung).size === teile.length;
    if (!istPermutation) loesung = teile.map((_, i) => i);
    return { typ: 'orden', frage: asStr(a.frage), teile, loesung };
  }
  if (a.typ === 'frei') {
    return { typ: 'frei', frage: asStr(a.frage), hinweis: asStr(a.hinweis) };
  }
  return null;
}

function normalizeReaccion(o) {
  o = o || {};
  return {
    reaktion: typeof o.reaktion === 'string' ? o.reaktion : '',
    besser:   (typeof o.besser === 'string' && o.besser.trim()) ? o.besser : null
  };
}
