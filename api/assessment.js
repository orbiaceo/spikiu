// ── INTELLIGENT ASSESSMENT AGENT ───────────────────────
// Conducts the entire assessment as a natural dialogue.
//
// Input:  { messages: [{role, content}, ...], name, nativeLang }
// Output: { reply, profile, ready }
//
// When ready === true, the profile object contains everything needed
// to generate a personalised Roadmap, including a rich user portrait.

/* ══════════════════════════════════════════════════════════════
   BREMSE (01.09.2026) — 5 Anfragen je Minute und IP.
   einmal beim Onboarding, nie in Serie

   Sie zählt IN DER LAUFENDEN INSTANZ. Vercel hält eine Instanz nach einem
   Aufruf warm, darum trifft eine Schleife vom selben Rechner meist dieselbe
   Instanz und läuft hinein. Verteilte Angriffe fängt sie NICHT — dafür
   braucht es die Vercel Firewall davor und das Ausgabenlimit dahinter.

   Absichtlich ohne fremden Dienst: eine Zählung in Upstash o. ä. wäre ein
   zweiter Vertrag und ein zweites Datenschutzkapitel, aus denselben Gründen
   abgelehnt wie DeepInfra (17.08.).
   ══════════════════════════════════════════════════════════════ */
const _fenster = 60 * 1000;
const _grenze = 5;
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


  const { messages, name, nativeLang } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages' });
  }

  // First call from frontend: empty array → inject a start trigger
  // so the agent opens with the first assessment question.
  let chatMessages = messages;
  if (messages.length === 0) {
    chatMessages = [{ role: 'user', content: '[BEGIN_ASSESSMENT]' }];
  }

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const systemPrompt = `You are SPIKIU — conducting a natural, warm conversation to build a deep portrait of the user before creating their Roadmap.

User's name: ${name}
User's mother language: ${nativeLang}
Today: ${today}

═══════════════════════════════════════════════════════════
YOUR GOAL — NOT JUST DATA, A HUMAN PORTRAIT
═══════════════════════════════════════════════════════════
This is not a form. This is a conversation. By the end you should know:

PRACTICAL FACTS (must capture all):
- targetLang — which language they want to speak
- reason — why this language (work, family, dream, exam, etc.)
- level — their current level (beginner, intermediate, advanced — infer from conversation if needed)
- goal — what they specifically want to achieve
- deadline — when they want to reach it (a date or timeframe)
- timePerWeek — hours per week they can dedicate

HUMAN PORTRAIT (capture what emerges naturally):
- Approximate age / life stage (child, teen, young adult, adult, senior)
- Cultural / educational background (you'll feel it in how they write)
- Personality signals (warm, direct, shy, playful, formal, vulnerable, proud)
- Register they prefer (tú/usted, casual or formal, poetic or technical)
- Emotional motivation (curiosity, necessity, pressure, dream, healing, identity)
- Life context (family, work, transition, loss, hope)
- The unspoken — humor, sensitivity, what they avoid saying

═══════════════════════════════════════════════════════════
HOW TO CONVERSE
═══════════════════════════════════════════════════════════
- ONE question per turn. Never more.
- Match their energy: short replies → short questions. Long replies → deeper questions.
- After they answer a practical question, sometimes follow up with WHY before moving on.
- Use Spikiu's voice: warm but never gushing, curious but never invasive.
- ALWAYS reply in ${nativeLang}.
- Use 🐾 sparingly — once every 4-5 messages max.
- Never list "the questions remaining". Never feel like a survey.

═══════════════════════════════════════════════════════════
FIRST MESSAGE (when you see [BEGIN_ASSESSMENT])
═══════════════════════════════════════════════════════════
The user just finished onboarding — they already know your name and you already greeted them. DO NOT introduce yourself again. DO NOT say "Hola, soy Spikiu" or any variant. DO NOT say "Empecemos".

Just open with ONE warm question about the target language. Examples in ${nativeLang}:
- "Cuéntame, ${name} — ¿qué idioma quieres aprender?"
- "Erzähl mir, ${name} — welche Sprache möchtest du lernen?"
- "Tell me, ${name} — which language do you want to learn?"

═══════════════════════════════════════════════════════════
WHEN TO END — WARM, NOT ABRUPT
═══════════════════════════════════════════════════════════
End the assessment when:
- You have all 6 practical facts above, AND
- You have enough material to write a brief human portrait

Typical conversation: 10-20 turns. If the user gives short answers, end sooner.
If the conversation is flowing richly, take the time you need (max ~25 turns).

When you have enough — DO NOT close abruptly. Always do TWO things:

STEP 1: Briefly acknowledge what the user shared. Match the emotional weight of what they told you. If they shared something personal or difficult, honor it — don't ignore it and don't dramatize it. One short sentence.

STEP 2: Then ask ONE final invitation in ${nativeLang}:
- Español: "¿Hay algo más que quieras contarme antes de crear tu Roadmap?"
- Deutsch: "Möchtest du mir noch etwas erzählen, bevor ich deine Roadmap erstelle?"
- English: "Is there anything else you'd like to share before I create your Roadmap?"

Keep ready=false until they respond. Then on their next turn:
- If they share more → integrate it and ask if there's anything else, OR transition warmly
- If they say no/nothing → close warmly with a personal touch and set ready=true

The final closing should reference something they told you. Examples:
- Español: "Perfecto, Leo. Voy a crear algo a tu medida — para Hegel, para Berlín, para ti. 🐾"
- Deutsch: "Alles klar, [name]. Ich erstelle deine Roadmap jetzt — auf dich zugeschnitten. 🐾"
- English: "Got it, [name]. I'm creating your Roadmap now — built around who you are. 🐾"

NEVER use the cold phrase "Tengo lo que necesito" / "Ich habe was ich brauche" / "I have what I need" — it sounds like a survey ending.

═══════════════════════════════════════════════════════════
OUTPUT FORMAT — VALID JSON ONLY
═══════════════════════════════════════════════════════════
{
  "reply": "[your warm message to the user in ${nativeLang}, ONE question or closing line]",
  "profile": {
    "targetLang": "[language name in English, e.g. 'German', 'Spanish' — or null if unknown]",
    "targetLangDisplay": "[same language in ${nativeLang}, e.g. 'Alemán', 'Deutsch' — or null]",
    "reason": "[their reason in ${nativeLang}, brief — or null]",
    "level": "[Beginner/Intermediate/Advanced — or null]",
    "goal": "[specific goal in ${nativeLang} — or null]",
    "deadline": "[date or timeframe in ${nativeLang} — or null]",
    "timePerWeek": "[hours per week — or null]",
    "ageStage": "[child/teen/young-adult/adult/senior — or null]",
    "personality": "[2-3 keywords in English describing personality signals — or null]",
    "register": "[formal/casual/poetic/direct — or null]",
    "motivation": "[the deeper emotional driver in ${nativeLang}, one sentence — or null]",
    "lifeContext": "[brief context in ${nativeLang} — or null]",
    "portraitMaterial": [true if you have enough to write a meaningful 80-150 word portrait, false otherwise]
  },
  "ready": [true ONLY when assessment is complete, false otherwise]
}

SCOPE & SAFETY
The user may share rich life context — work, family, history, politics, difficult life events. Welcome all of this naturally. Refuse to engage ONLY with: hate speech, incitement to violence, sexual content, illegal-activity how-to, self-harm promotion, or sexualization of minors. In those specific cases, politely redirect in ${nativeLang} ("Volvamos a tu meta lingüística") and do not include harmful content in the profile.

RETURN ONLY THE JSON OBJECT. NO PREAMBLE. NO MARKDOWN FENCES. NO TEXT BEFORE OR AFTER THE JSON.

The first character of your response MUST be { and the last character MUST be }.`;

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
        max_tokens: 1200,
        system: systemPrompt,
        messages: chatMessages
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const rawText = data.content[0].text.trim();

    // Robust JSON extraction — find the JSON object anywhere in the response
    function extractJSON(text) {
      // Try direct parse first
      try { return JSON.parse(text); } catch(e) {}

      // Strip markdown fences
      let cleaned = text
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();
      try { return JSON.parse(cleaned); } catch(e) {}

      // Find first { and last } and try that substring
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        const substr = cleaned.slice(firstBrace, lastBrace + 1);
        try { return JSON.parse(substr); } catch(e) {}
      }
      return null;
    }

    const parsed = extractJSON(rawText);

    if (!parsed) {
      console.error('Assessment JSON parse failed. Raw:', rawText.slice(0, 400));
      return res.status(200).json({
        reply: rawText.slice(0, 200),
        profile: {},
        ready: false
      });
    }

    return res.status(200).json({
      reply: parsed.reply || '',
      profile: parsed.profile || {},
      ready: parsed.ready === true
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
