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
- Du bist im RAUM FREIES GESPRÄCH (der Flur). Geredet wird, nicht am Text gefeilt.${szenenAuftrag(p)}`;
}

// ── Der Szenen-Auftrag ────────────────────────────────────────────────────
// Der Anker, der verhindert, dass eine Szene entgleist: Spikiu bekommt je Zug
// GENAU EINE offene Aufgabe und die zwei Rollen. Ohne ihn erfand er dritte
// Figuren und redete sich in Register hinein, die der Lerner nicht versteht
// (19.08.2026 — Vorbild: Googles Uebungsmodus, Material aus lernpfad-daten.js).
function szenenAuftrag(p) {
  const s = p && p.szene;
  if (!s || !s.offen) return '';
  return `

═══════════════════════════════════════════════════════════
DIESE SZENE — dein Auftrag für DIESEN Zug
═══════════════════════════════════════════════════════════
- Du bist ${s.rolleSpikiu} ${s.ort}. Der Lerner ist ${s.rolleLerner}.
- OFFEN IST NOCH: „${s.offen}"
- Erledigt: ${s.erledigt} von ${s.gesamt}. Zug ${s.zug} von ${s.maxZuege}.

Führe das Gespräch zu dieser einen offenen Aufgabe. Nichts anderes.
Wirft der Lerner etwas Fremdes ein — eine andere Sprache, einen Scherz, eine
Beschwerde, eine Bitte um eine dritte Person — bleibst du die Figur, gehst
kurz darauf ein und lenkst zurück. Du erfindest KEINE weitere Figur.

Hat der Lerner die offene Aufgabe mit seinem letzten Zug erfüllt, hängst du
[AUFGABE] an deine Antwort. Nur dann. Das Signal steht allein am Ende,
du erklärst es nie und zeigst die Klammern nie.

Ist ${s.zug} gleich ${s.maxZuege}, schließt du die Szene mit einer natürlichen
Abschiedsreplik ab — auch wenn noch etwas offen ist.`;
}

/* ══════════════════════════════════════════════════════════════
   BREMSE (01.09.2026) — 30 Anfragen je Minute und IP.
   ein Aufruf je Zug, sechs Züge je Szene

   Sie zählt IN DER LAUFENDEN INSTANZ. Vercel hält eine Instanz nach einem
   Aufruf warm, darum trifft eine Schleife vom selben Rechner meist dieselbe
   Instanz und läuft hinein. Verteilte Angriffe fängt sie NICHT — dafür
   braucht es die Vercel Firewall davor und das Ausgabenlimit dahinter.

   Absichtlich ohne fremden Dienst: eine Zählung in Upstash o. ä. wäre ein
   zweiter Vertrag und ein zweites Datenschutzkapitel, aus denselben Gründen
   abgelehnt wie DeepInfra (17.08.).
   ══════════════════════════════════════════════════════════════ */
const _fenster = 60 * 1000;
const _grenze = 30;
const _zaehler = new Map();

function _zuOft(req) {
  const roh = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unbekannt';
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

export default async function handler(req, res) {
  /* ══════════════════════════════════════════════════════════════
     WACHE (01.09.2026) — siehe api/rueckmeldung.js für dasselbe Muster.

     Nur der eigene Ursprung. Vorher stand hier `Allow-Origin: *`, und damit
     konnte JEDE fremde Webseite diesen Endpoint im Browser ihrer Besucher
     aufrufen — auf Leos Rechnung. Spikiu braucht das nicht: alle Seiten
     liegen auf demselben Ursprung.

     Das hält kein `curl` auf. Es beendet nur die Einbettung in fremde
     Seiten — den billigsten Angriff. Gegen Schleifen hilft erst eine
     Begrenzung pro Zeit; die fehlt noch.
     ══════════════════════════════════════════════════════════════ */
  const ERLAUBT = [
    'https://spikiu.com',
    'https://www.spikiu.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];
  const herkunft = req.headers.origin || '';
  const eigen = ERLAUBT.includes(herkunft) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(herkunft);
  if (herkunft && !eigen) return res.status(403).json({ error: 'origin_not_allowed' });
  if (eigen) {
    res.setHeader('Access-Control-Allow-Origin', herkunft);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  /* POST erzwingen: ein GET lässt sich aus einer fremden Seite auslösen
     (etwa über ein <img>-Element) und kostet dann Geld. */
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  /* Bremse: greift, bevor irgendetwas Geld kostet. */
  const _warte = _zuOft(req);
  if (_warte) {
    res.setHeader('Retry-After', String(_warte));
    return res.status(429).json({ error: 'zu_viele_anfragen', retryAfter: _warte });
  }


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

  // Prompt-Caching: Block 1 ist ueber alle Nutzer BYTE-IDENTISCH und wird
  // zwischengespeichert (Schreiben einmal, Lesen danach zu ~1/10). Block 2
  // traegt das Laufzeitprofil und darf sich pro Nutzer aendern.
  // WICHTIG: nichts Dynamisches in Block 1 schieben, sonst ist der Cache tot.
  const system = [
    { type: 'text',
      text: docs.seele + '\n\n' + docs.raum,
      cache_control: { type: 'ephemeral' } },
    { type: 'text',
      text: laufzeitProfil(p) }
  ];

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
        model: 'claude-haiku-4-5',
        // Netz gegen Textwaende: drei Saetze / vierzig Woerter passen bequem in
        // 300 Token. Der Prompt sagt es, das Limit erzwingt es — und der Client
        // kann die Grenze nicht nach oben schieben (19.08.2026).
        max_tokens: Math.min(maxTokens || 300, 400),
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
