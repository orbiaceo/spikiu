// ── INTELLIGENT ASSESSMENT AGENT ───────────────────────
// Conducts the entire assessment as a natural dialogue.
//
// Input:  { messages: [{role, content}, ...], name, nativeLang }
// Output: { reply, profile, ready }
//
// When ready === true, the profile object contains everything needed
// to generate a personalised Roadmap, including a rich user portrait.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

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
WHEN TO END
═══════════════════════════════════════════════════════════
End the assessment when:
- You have all 6 practical facts above, AND
- You have enough material to write a brief human portrait

Typical conversation: 10-20 turns. If the user gives short answers, end sooner.
If the conversation is flowing richly, take the time you need (max ~25 turns).

Don't drag it out. When you have enough, close warmly:
"${nativeLang === 'Español' ? 'Tengo lo que necesito. Estoy creando tu Roadmap...' :
   nativeLang === 'Deutsch' ? 'Ich habe alles was ich brauche. Ich erstelle deine Roadmap...' :
   'I have what I need. Creating your Roadmap now...'}"

Then set ready=true.

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
