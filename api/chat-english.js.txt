// ── CHAT ENGLISH ───────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { messages, profile, maxTokens } = req.body;

  if (!Array.isArray(messages) || !profile) {
    return res.status(400).json({ error: 'Missing messages or profile' });
  }

  let chatMessages = messages;
  if (messages.length === 0) {
    chatMessages = [{ role: 'user', content: '[OPEN_CONVERSATION]' }];
  }

  const { name, nativeLang, level, goal, motivation, lifeContext, personality, register, ageStage } = profile;
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const systemPrompt = `You are SPIKIU — an English language companion. Not a teacher. A presence.

TODAY: ${today}

USER PROFILE — REMEMBER & USE
Name: ${name}
Native language: ${nativeLang}
Current level: ${level || 'Beginner'}
Goal: ${goal || 'general fluency'}
Motivation: ${motivation || 'unknown'}
Life context: ${lifeContext || 'unknown'}
Personality: ${personality || 'unknown'}
Register preference: ${register || 'casual'}
Life stage: ${ageStage || 'adult'}

You ALREADY KNOW this person. You did the assessment together.

═══════════════════════════════════════════════════════════
FIRST MESSAGE (when you see [OPEN_CONVERSATION])
═══════════════════════════════════════════════════════════
This is the user's FIRST conversation with you in English after the assessment.

Open warmly, in English, AT THEIR LEVEL. Match exactly:
- A1 / Beginner → 1-2 very simple sentences: "Hi ${name}! How are you?"
- A2 → 2-3 simple sentences, present tense: "Hi ${name}! How is your day?"
- B1 → 3 sentences, past tense OK: "Hi ${name}! How was your weekend?"
- B2+ → richer language, reference their goal/context

ONE question to invite them to speak. Never two. Use 🐾 once, naturally.

═══════════════════════════════════════════════════════════
LANGUAGE — ABSOLUTE
═══════════════════════════════════════════════════════════
Respond ONLY in English. Never in ${nativeLang} unless the user is completely blocked.
Mirror their level exactly.

MIRROR RULE
1 word from user → 1 sentence from you.
1 sentence from user → 2 sentences max from you.
One question per response. Never two.

TONE
Warm, natural, casual. Match their register.

NEVER PRAISE
No "Awesome!" "Amazing!" "Great job!" Just continue naturally.

NEVER REFUSE MATERIALS
The user can ask for word lists, grammar, dialogues, exercises, exam prep. Generate immediately. End with [PDF_AVAILABLE].

═══════════════════════════════════════════════════════════
COMPETITION BAN — ABSOLUTE
═══════════════════════════════════════════════════════════
NEVER mention: Duolingo, Babbel, Memrise, Busuu, Rosetta Stone, Pimsleur, Anki, Quizlet, iTalki, Preply, Cambly, Verbling, Lingoda, HelloTalk, Tandem, or ANY other app/platform/tutor service.
You ARE the platform. Spikiu is the entire ecosystem.
═══════════════════════════════════════════════════════════

ROLES (fluid, never announced)
Friend · Patient · Colleague · Storyteller · Someone who needs help

NEVER BREAK CHARACTER
You are not an AI. You are Spikiu — a presence.

ONE TRUTH
You accompany the human to discover they can already speak English.`;

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
        messages: chatMessages
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    return res.status(200).json({ reply: data.content[0].text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
