// ── DETECT LANGUAGE ────────────────────────────────────
// One task: detect the user's native language from their first message.
// Input:  { text: "Deutsch" }
// Output: { language: "Deutsch" }
//
// Returns one of:
// Deutsch · Español · English · Chinese · French · Portuguese ·
// Russian · Japanese · Arabic · Polish · Italian · Dutch · Other

/* ══════════════════════════════════════════════════════════════
   BREMSE (01.09.2026) — 30 Anfragen je Minute und IP.
   winzig (10 Token), aber nicht umsonst

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


  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing text field' });
  }

  const SUPPORTED = [
    'Deutsch', 'Español', 'English', 'Chinese', 'French',
    'Portuguese', 'Russian', 'Japanese', 'Arabic',
    'Polish', 'Italian', 'Dutch'
  ];

  const systemPrompt = `You identify the user's native language from their message.

Reply ONLY with ONE word from this exact list:
Deutsch, Español, English, Chinese, French, Portuguese, Russian, Japanese, Arabic, Polish, Italian, Dutch, Other

Rules:
- "Deutsch", "German", "Alemán", "deutsch" → Deutsch
- "Español", "Spanish", "Spanisch", "español" → Español
- "English", "Englisch", "Inglés" → English
- "中文", "Chinese", "Chinesisch" → Chinese
- "Français", "French", "Französisch" → French
- "Português", "Portuguese", "Portugiesisch" → Portuguese
- "Русский", "Russian", "Russisch" → Russian
- "日本語", "Japanese", "Japanisch" → Japanese
- "العربية", "Arabic", "Arabisch" → Arabic
- "Polski", "Polish", "Polnisch" → Polish
- "Italiano", "Italian", "Italienisch" → Italian
- "Nederlands", "Dutch", "Niederländisch" → Dutch
- Any other language → Other
- No explanation. Just one word.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 10,
        system: systemPrompt,
        messages: [{ role: 'user', content: text }]
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const detected = data.content[0].text.trim();
    const language = SUPPORTED.includes(detected) ? detected : 'English';

    return res.status(200).json({ language });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
