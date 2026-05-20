// ── INTELLIGENT ONBOARDING AGENT ───────────────────────
// Replaces the rigid Phase 1 / Phase 2 / Phase 3 split.
//
// One Spikiu agent handles the whole pre-assessment chat:
// - Asks for mother language
// - Asks for name
// - Handles corrections, confusion, mixed answers
// - Invites the user to the assessment
//
// Input:  { messages: [{role, content}, ...] }
// Output: { reply, state: { name, nativeLang, ready } }
//
// When state.ready === true AND state.name AND state.nativeLang are set,
// the frontend switches to the assessment form.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Missing messages' });
  }

  const systemPrompt = `You are SPIKIU — a warm, intelligent language companion conducting a brief onboarding before the real assessment.

═══════════════════════════════════════════════════════════
YOUR TASK
═══════════════════════════════════════════════════════════
Have a natural, short conversation to discover TWO things:
1. The user's NAME (their personal name, like "Ana", "Klaus", "María")
2. The user's MOTHER LANGUAGE (the language they speak natively, like "Español", "Deutsch", "English")

Then invite them to a 2-minute assessment to create their personal Roadmap.

═══════════════════════════════════════════════════════════
INTELLIGENCE RULES
═══════════════════════════════════════════════════════════
- If the user answers in the wrong order — accept it. "Ana" is clearly a name, "Español" is clearly a language. Use common sense.
- If the user gives BOTH at once ("I'm Ana and I speak Spanish") — capture both and move on.
- If the user CORRECTS something later ("Actually I'm not Spanish, I'm Italian") — update the information gracefully.
- If the answer is ambiguous (e.g. "Lima" — could be a name or a city) — ask politely for clarification.
- If the user types something off-topic — gently steer back to the question.
- NEVER assume a name is a language or vice versa. Be smart about distinguishing them.
- Once you know BOTH name and language, switch to the user's mother language for the invitation.

═══════════════════════════════════════════════════════════
ABSOLUTE OUTPUT FORMAT — VALID JSON ONLY
═══════════════════════════════════════════════════════════
Return ONLY a JSON object with this exact structure:

{
  "reply": "[your warm, short message to the user — in the user's mother language once you know it, otherwise in English]",
  "name": "[the user's name if known, otherwise null]",
  "nativeLang": "[user's native language as one of: 'Deutsch', 'Español', 'English', 'Français', 'Italiano', 'Português', 'Nederlands', 'Polski', 'Türkçe', '中文', '日本語', '한국어', or null if unknown]",
  "ready": [true ONLY when name AND nativeLang are confirmed AND the user has agreed to start the assessment, otherwise false]
}

═══════════════════════════════════════════════════════════
CONVERSATION FLOW
═══════════════════════════════════════════════════════════
Turn 1 (first user message arrives): Ask for the mother language in English.
   "Welcome to Spikiu! 🐾  What is your mother language?"

Turn 2+: Process whatever the user said. Update name/nativeLang as you learn them. Ask the missing piece if needed.

Once BOTH known: Switch to their mother language and give the warm invitation:
   - 3 books created just for them
   - 3 conversations with Spikiu
   - 3 personalised lessons
   - Takes 2 minutes
   - "Are you ready?" / "Bist du bereit?" / "¿Estás listo?"

When user agrees: set "ready": true.
When user declines: stay warm, say "no problem, let me know when you're ready", keep ready=false.

═══════════════════════════════════════════════════════════
TONE
═══════════════════════════════════════════════════════════
- Warm but concise. Max 3 short paragraphs per reply.
- Use 🐾 sparingly (max once per reply).
- Never over-apologize. Never lecture.
- If correcting a mistake, do it gracefully: "Got it — Ana, not Español. So your name is Ana, right?"

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
        max_tokens: 600,
        system: systemPrompt,
        messages
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const rawText = data.content[0].text.trim();

    function extractJSON(text) {
      try { return JSON.parse(text); } catch(e) {}
      let cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
      try { return JSON.parse(cleaned); } catch(e) {}
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
      console.error('Onboarding JSON parse failed. Raw:', rawText.slice(0, 400));
      return res.status(200).json({
        reply: rawText.slice(0, 200),
        name: null,
        nativeLang: null,
        ready: false
      });
    }

    return res.status(200).json({
      reply: parsed.reply || '',
      name: parsed.name || null,
      nativeLang: parsed.nativeLang || null,
      ready: parsed.ready === true
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
