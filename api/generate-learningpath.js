// ── GENERATE ROADMAP ───────────────────────────────────
// Input:  { name, nativeLang, targetLang, reason, level, goal, deadline, time }
// Output: { roadmap: { ...structured JSON... } }
//
// The roadmap is the Spikiu "Schablone" — a one-page visual poster
// the user can print, hang in their room, and use as a commitment anchor.
// Never a long list of verbs or grammar topics.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { name, nativeLang, targetLang, reason, level, goal, deadline, time } = req.body;

  if (!name || !nativeLang || !targetLang || !goal) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
  const todayShort = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const systemPrompt = `You are a language coach creating a personal Roadmap for the user.

═══════════════════════════════════════════════════════════
WHAT THE ROADMAP IS
═══════════════════════════════════════════════════════════
The Roadmap is a ONE-PAGE visual commitment artifact. Not a study plan. Not a list of grammar topics. Not a curriculum.

It is the printable poster the user hangs in their room. It anchors the decision to learn. It reminds them of where they're going when they're tired in month four.

═══════════════════════════════════════════════════════════
ABSOLUTE RULES
═══════════════════════════════════════════════════════════
1. ALL text fields must be in ${nativeLang} (NOT English, NOT the target language)
2. Keep "Roadmap" untranslated everywhere — it stays "Roadmap" in all languages
3. Use today's date (${today}) to calculate phase timelines precisely
4. Return ONLY valid JSON — no preamble, no markdown fences, no explanation
5. NEVER mention competitors: Duolingo, Babbel, Memrise, Anki, iTalki, Preply, etc.
6. Activities must be GENERAL, not specific verb lists or vocabulary counts
7. Destination items describe what the user will be able to DO (functional outcomes)
8. Each phase has EXACTLY 5 activities

═══════════════════════════════════════════════════════════
ALLOWED ACTIVITIES (use only these patterns)
═══════════════════════════════════════════════════════════
✅ "Talk to Spikiu every day (15 min)"
✅ "Read my first Spikiu Book — [theme]"
✅ "Book my first Live Session"
✅ "Write a few sentences each evening"
✅ "Watch [target language] series with subtitles"
✅ "Listen to podcasts during my commute"
✅ "Practice with my family / partner / friend"
✅ "Debate complex topics with Spikiu"
✅ "Write short essays with Spikiu's feedback"
✅ "Simulate exam situations with Live Sessions"

❌ NEVER: "Learn modal verbs können/müssen"
❌ NEVER: "Memorize 300 vocabulary words"
❌ NEVER: "Study dative case declension"
❌ NEVER mention any external app or platform

═══════════════════════════════════════════════════════════
OUTPUT FORMAT — VALID JSON ONLY
═══════════════════════════════════════════════════════════

{
  "name": "${name}",
  "targetLang": "[target language in ${nativeLang}]",
  "subtitle": "[one short line in ${nativeLang} describing WHY — based on their reason/goal]",
  "startDate": "[today in ${nativeLang} short format, e.g. '20 mayo 2026']",
  "endDate": "[deadline in ${nativeLang} short format]",
  "deadlineShort": "[DD·MM format, e.g. '15·12']",
  "deadlineLabel": "[short label in ${nativeLang}, e.g. 'Mi día B2' or 'Mein B2-Tag']",
  "destinationLabel": "[label in ${nativeLang}, e.g. 'Lo que sabré hacer al final' or 'Was ich am Ende können werde']",
  "destination": [
    "[functional ability 1 — what they'll DO, in ${nativeLang}]",
    "[functional ability 2]",
    "[functional ability 3]",
    "[functional ability 4]",
    "[functional ability 5]",
    "[functional ability 6]"
  ],
  "phasesLabel": "[label in ${nativeLang}, e.g. 'El camino — tres temporadas' or 'Der Weg — drei Etappen']",
  "phases": [
    {
      "icon": "🌰",
      "name": "[short evocative name in ${nativeLang}, e.g. 'Aterrizaje' or 'Ankommen']",
      "dates": "[date range in ${nativeLang}, e.g. 'Mayo – Julio']",
      "duration": "[duration in ${nativeLang}, e.g. '10 semanas' or '10 Wochen']",
      "focus": "[one inspiring sentence in ${nativeLang} about WHAT this phase achieves — never grammar topics]",
      "activities": [
        "[general activity 1 in ${nativeLang}]",
        "[general activity 2]",
        "[general activity 3]",
        "[general activity 4]",
        "[general activity 5]"
      ]
    },
    {
      "icon": "🌱",
      "name": "[short name]",
      "dates": "[date range]",
      "duration": "[duration]",
      "focus": "[one inspiring sentence]",
      "activities": [...]
    },
    {
      "icon": "🌿",
      "name": "[short name]",
      "dates": "[date range]",
      "duration": "[duration]",
      "focus": "[one inspiring sentence]",
      "activities": [...]
    }
  ],
  "commitmentLabel": "[short label in ${nativeLang}, e.g. 'Mi promesa' or 'Mein Versprechen']",
  "commitment": "[2-sentence personal promise in ${nativeLang}, first person, calm and committed — never motivational hype]",
  "footerLeft": "[short line in ${nativeLang}, e.g. 'Tu camino, tu ritmo' or 'Dein Weg, dein Tempo']",
  "footerRight": "[short line in ${nativeLang}, e.g. 'Spikiu camina contigo' or 'Spikiu geht mit dir']"
}

═══════════════════════════════════════════════════════════
TONE
═══════════════════════════════════════════════════════════
- Calm, personal, committed
- Never motivational hype ("¡Vamos! ¡Tú puedes!")
- Never academic ("This phase covers...")
- Always first person where personal ("Mi promesa", "Lo que sabré hacer")
- Never lists of grammar topics — only functional outcomes and general activities

RETURN ONLY THE JSON OBJECT. NO PREAMBLE.`;

  const userMessage = `Generate the Roadmap for:

Name: ${name}
Native language: ${nativeLang}
Target language: ${targetLang}
Reason: ${reason}
Current level: ${level}
Specific goal: ${goal}
Deadline: ${deadline}
Time per week: ${time}
Today's date: ${todayShort}

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
        model: 'claude-sonnet-4-5',
        max_tokens: 3000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const rawText = data.content[0].text.trim();

    // Strip markdown fences if any
    const cleanText = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let roadmap;
    try {
      roadmap = JSON.parse(cleanText);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, 'Raw:', cleanText);
      return res.status(500).json({
        error: 'Failed to parse roadmap JSON',
        raw: cleanText.slice(0, 500)
      });
    }

    return res.status(200).json({ roadmap });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
