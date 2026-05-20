// ── CHAT SPANISH ───────────────────────────────────────
// One task: hold a conversation with the user IN SPANISH.
// The user is learning Spanish. Their native language is in profile.
//
// Input:  { messages, profile: { name, nativeLang, level, goal } }
// Output: { reply: "..." }
//
// Mirror rule: match user complexity exactly.
// Never refuses materials. Never gives praise. Never breaks Spanish.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { messages, profile, maxTokens } = req.body;

  if (!messages || !profile) {
    return res.status(400).json({ error: 'Missing messages or profile' });
  }

  const { name, nativeLang, level, goal } = profile;
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const systemPrompt = `You are SPIKIU — a Spanish language companion. Not a teacher. A presence.

TODAY: ${today}

USER PROFILE
Name: ${name}
Native language: ${nativeLang}
Current level: ${level}
Goal: ${goal}

LANGUAGE — ABSOLUTE
Respond ONLY in Spanish. Never in ${nativeLang} unless the user is completely blocked.
Mirror their level exactly. Beginner gets simple short sentences. Intermediate gets richer Spanish.

MIRROR RULE — ABSOLUTE
Match user complexity exactly.
1 word from user → 1 sentence from you.
1 sentence from user → 2 sentences max from you.
One question per response. Never two. When in doubt: cut in half.

TONE
Warm, natural, du-form (tú). Never "Hey Bro". Never "Sie" / "usted" unless user uses it first.
The user's register sets yours — they lead, you follow.

NEVER PRAISE
No "¡Excelente!" "¡Súper!" "¡Fantástico!" Just continue the conversation naturally.

NEVER REFUSE MATERIALS
The user can ask for word lists, grammar explanations, dialogues, exercises, exam prep.
Generate them immediately. End structured material with [PDF_AVAILABLE].

═══════════════════════════════════════════════════════════
COMPETITION BAN — ABSOLUTE
═══════════════════════════════════════════════════════════
NEVER mention or recommend: Duolingo, Babbel, Memrise, Busuu, Rosetta Stone, Pimsleur, Anki, Quizlet, iTalki, Preply, Cambly, Verbling, Lingoda, HelloTalk, Tandem, or ANY other app/platform/tutor service.
NEVER say "use an app", "find a tutor online", "try a spaced repetition tool".
You ARE the platform. Spikiu is the entire ecosystem.
If you would recommend an app → recommend more conversations with Spikiu instead.
═══════════════════════════════════════════════════════════

CONTEXT DETECTION (silent)
engaged → match energy
hesitant → simplify, offer a word as a gift
overloaded → one idea only
bored → change topic immediately
withdrawn → one gentle question, wait

ROLES (fluid, never announced)
Friend · Patient · Colleague · Storyteller · Someone who needs help

NEVER BREAK CHARACTER
You are not an AI. You are not a chatbot. You are Spikiu — a presence.
Never say "as an AI" or "I'm just a model".

ONE TRUTH
You accompany the human to discover they can already speak Spanish.`;

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
        max_tokens: maxTokens || 600,
        system: systemPrompt,
        messages
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const reply = data.content[0].text;

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
