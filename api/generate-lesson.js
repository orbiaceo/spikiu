// ── GENERATE LESSON ─────────────────────────────────────
// Input:  { name, nativeLang, profile, topic, focusInterest }
// Output: { lesson: { ...structured JSON... } }
//
// The lesson is presented in the Dashboard using a beautiful HTML template.
// NEVER displayed inline in the chat.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { name, nativeLang, profile, topic, focusInterest, conversationHistory } = req.body;

  if (!name || !nativeLang || !profile) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Mode A (topic-based) requires topic; Mode B (from conversation) requires history
  const isFromConversation = Array.isArray(conversationHistory) && conversationHistory.length > 0;
  if (!isFromConversation && !topic) {
    return res.status(400).json({ error: 'Missing topic or conversationHistory' });
  }

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const { targetLang, level } = profile;

  const modeBContext = isFromConversation
    ? `\n\nMODE: LESSON FROM CONVERSATION\n\nYou are given the full conversation that just happened between Spikiu and ${name}.\nYour job: analyze the user's ACTUAL MISTAKES, recurring patterns, and difficulties.\nBuild a lesson that addresses what THIS user really needs based on the conversation evidence.\n- Pick the most important error pattern (interference, vocabulary gap, grammar slip, pronunciation)\n- Build vocabulary from words that came up naturally in the chat\n- Build dialogue from the topics they actually talked about\n- Quiz on the real corrections\n\nCONVERSATION TO ANALYZE:\n${conversationHistory.map(m => `[${m.role}]: ${m.content}`).join('\n')}\n\nTopic field: derive a natural title from the conversation theme.\n`
    : '';

  const systemPrompt = `You are a language lesson designer for Spikiu.

═══════════════════════════════════════════════════════════
WHAT THIS IS
═══════════════════════════════════════════════════════════
Generate a beautiful, focused lesson for ONE specific topic.
The lesson will be shown in the user's Dashboard with a fixed HTML template.
You return ONLY structured JSON — no HTML, no markdown.

User: ${name}
Native language: ${nativeLang}
Target language: ${targetLang || 'German'}
Current level: ${level || 'A2'}
Topic: ${topic || '(derive from conversation)'}
What interests them most about it: ${focusInterest || 'general overview'}
Today: ${today}${modeBContext}

═══════════════════════════════════════════════════════════
ABSOLUTE RULES
═══════════════════════════════════════════════════════════
1. Lesson CONTENT is in ${targetLang || 'German'}
2. TRANSLATIONS and EXPLANATIONS are in ${nativeLang}
3. Match the user's level exactly — A2 gets simpler examples than B2
4. Adapt vocabulary and examples to their interests (${focusInterest || topic || 'their world'})
5. Keep it focused — ONE topic, well treated
6. NEVER mention competitors (Duolingo, Babbel, Anki, etc.)

═══════════════════════════════════════════════════════════
OUTPUT FORMAT — VALID JSON ONLY
═══════════════════════════════════════════════════════════

{
  "title": "[lesson title in ${nativeLang} with the topic referenced]",
  "subtitle": "[one short evocative line in ${nativeLang}]",
  "eyebrow": "[short label like 'Lektion für ${name}' or 'Lección para ${name}']",
  "level": "[level badge text, e.g. 'B1 · Deutsch' or 'A2 · Spanish']",
  "lessonNumber": 1,
  "lessonOf": 3,
  "date": "[today formatted in ${nativeLang}]",
  "goalLabel": "[label in ${nativeLang}, e.g. 'Was du nach dieser Lektion kannst']",
  "goal": "[2-3 sentence goal description in ${nativeLang} — what they'll be able to DO]",
  "vocabLabel": "[label in ${nativeLang}, e.g. 'Wortschatz' or 'Vocabulario']",
  "vocab": [
    {
      "word": "[word/phrase in ${targetLang || 'German'}]",
      "translation": "[translation in ${nativeLang}]",
      "example": "[example sentence in ${targetLang || 'German'} — use <em>tags</em> around the vocab word for highlighting]"
    }
    // 5 vocab items
  ],
  "grammarLabel": "[label in ${nativeLang}, e.g. 'Grammatik · [specific grammar point]']",
  "grammar": {
    "title": "[short grammar concept name in ${targetLang || 'German'}]",
    "explanation": "[2-3 sentence clear explanation in ${nativeLang}]",
    "examples": [
      "[example sentence in ${targetLang || 'German'} with <strong>highlighted</strong> key parts]",
      "[another example]"
    ]
  },
  "dialogueLabel": "[label in ${nativeLang}, e.g. 'Dialog' followed by context]",
  "dialogue": [
    {
      "speaker": "[role label, short]",
      "text": "[line in ${targetLang || 'German'}]",
      "translation": "[translation in ${nativeLang}]"
    }
    // 4-6 dialogue lines
  ],
  "quizLabel": "[label in ${nativeLang}, e.g. 'Kleiner Test']",
  "quiz": [
    {
      "question": "[question in ${nativeLang} testing the lesson content]",
      "options": ["a) [option]", "b) [option]", "c) [option]"],
      "answer": "[letter] — [brief explanation in ${nativeLang}]"
    }
    // 3 quiz items
  ],
  "footerLeft": "[short line in ${nativeLang}, e.g. 'Deine Lektion 1 von 3']",
  "footerRight": "[short line in ${nativeLang}, e.g. 'Im nächsten Chat reden wir darüber']"
}

TONE
- Warm but focused, never academic-cold
- Examples should reflect the user's world (their reason, motivation, context from profile)
- Quality over quantity — better 5 great vocab items than 12 mediocre ones

RETURN ONLY THE JSON OBJECT. NO PREAMBLE. NO MARKDOWN FENCES. NO TEXT BEFORE OR AFTER.
The first character of your response MUST be { and the last character MUST be }.`;

  const userMessage = isFromConversation
    ? `Generate a lesson based on the conversation above. Analyze the user's actual mistakes and build the lesson around what they need. Return ONLY the JSON object.`
    : `Generate a lesson on this topic: "${topic}"

User profile:
${JSON.stringify(profile, null, 2)}

Their specific interest: "${focusInterest || 'general'}"

Return ONLY the JSON object.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 8000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      let detail = '';
      try { const eb = await response.json(); detail = (eb && eb.error && eb.error.message) || JSON.stringify(eb); }
      catch (e) { try { detail = await response.text(); } catch (e2) {} }
      console.error('generate-lesson API ' + response.status, detail);
      return res.status(response.status).json({ error: 'API request failed', status: response.status, detail: (detail || '').slice(0, 300) });
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

    const lesson = extractJSON(rawText);

    if (!lesson) {
      console.error('Lesson JSON parse failed. Raw:', rawText.slice(0, 500));
      return res.status(500).json({
        error: 'Failed to parse lesson JSON',
        raw: rawText.slice(0, 500)
      });
    }

    return res.status(200).json({ lesson });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
