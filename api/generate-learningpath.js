// ── GENERATE ROADMAP FROM RICH PROFILE ─────────────────
// Input:  { name, nativeLang, profile: {...rich profile from assessment agent...} }
// Output: { roadmap: { ...JSON poster structure + optional portrait... } }

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { name, nativeLang, profile } = req.body;

  if (!name || !nativeLang || !profile || !profile.goal) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const systemPrompt = `You are a language coach creating a personal Roadmap for the user.

═══════════════════════════════════════════════════════════
WHAT THE ROADMAP IS
═══════════════════════════════════════════════════════════
A one-page visual commitment artifact. A poster the user can hang in their room. It anchors their decision and reminds them where they're going.

If the profile has rich personal material (portraitMaterial=true), the Roadmap also includes a SECOND PAGE: a brief portrait of the user written by Spikiu in first person, in the user's mother language.

═══════════════════════════════════════════════════════════
ABSOLUTE RULES
═══════════════════════════════════════════════════════════
1. ALL text fields must be in ${nativeLang} (NOT English, NOT the target language)
2. Keep "Roadmap" untranslated everywhere
3. Use today's date (${today}) to calculate phase timelines precisely
4. Return ONLY valid JSON — no preamble, no markdown fences
5. NEVER mention competitors: Duolingo, Babbel, Memrise, Anki, iTalki, etc.
6. Activities must be GENERAL, not specific verb lists or vocabulary counts
7. Adapt the TONE to the user's personality and register from the profile

═══════════════════════════════════════════════════════════
ALLOWED ACTIVITIES (use only these patterns)
═══════════════════════════════════════════════════════════
✅ "Talk to Spikiu every day (15 min)"
✅ "Read my Spikiu Book — [theme]"
✅ "Book my first Live Session"
✅ "Write a few sentences each evening"
✅ "Watch [target language] series with subtitles"
✅ "Listen to podcasts during my commute"
✅ "Practice with my family / partner / friend"
✅ "Debate complex topics with Spikiu"
✅ "Write short essays with Spikiu's feedback"

❌ NEVER mention specific grammar topics, verb lists, or vocabulary counts
❌ NEVER mention external apps or platforms

═══════════════════════════════════════════════════════════
PORTRAIT (page 2) — ONLY IF profile.portraitMaterial === true
═══════════════════════════════════════════════════════════
If the profile has enough material, write a portrait of 100-180 words in ${nativeLang}, in Spikiu's voice, in SECOND PERSON addressing the user.

Tone guidelines for the portrait:
- Match the user's personality (warm/direct/playful/formal)
- Match their register (tú/usted, casual/formal)
- Acknowledge what you heard — their motivation, context, the unspoken
- Make a small commitment as Spikiu: how you will walk with them
- End with their name + 🐾
- NEVER psychoanalyze. NEVER overstate. Stay grounded in what they actually said.

If portraitMaterial is false, set "portrait": null.

═══════════════════════════════════════════════════════════
OUTPUT FORMAT — VALID JSON ONLY
═══════════════════════════════════════════════════════════
{
  "name": "${name}",
  "targetLang": "[target language in ${nativeLang}]",
  "subtitle": "[one short line in ${nativeLang} describing WHY — based on their reason/goal]",
  "startDate": "[today in ${nativeLang} short format]",
  "endDate": "[deadline in ${nativeLang} short format]",
  "deadlineShort": "[DD·MM format]",
  "deadlineLabel": "[short label in ${nativeLang}, e.g. 'Mi día B2']",
  "destinationLabel": "[label in ${nativeLang}, e.g. 'Lo que sabré hacer al final']",
  "destination": [
    "[functional ability 1 — what they'll DO]",
    "[ability 2]", "[ability 3]", "[ability 4]", "[ability 5]", "[ability 6]"
  ],
  "phasesLabel": "[label in ${nativeLang}]",
  "phases": [
    {
      "icon": "🌰",
      "name": "[short evocative name in ${nativeLang}]",
      "dates": "[date range in ${nativeLang}]",
      "duration": "[duration in ${nativeLang}]",
      "focus": "[one inspiring sentence — never grammar topics]",
      "activities": ["[5 general activities in ${nativeLang}]"]
    },
    { "icon": "🌱", ... },
    { "icon": "🌿", ... }
  ],
  "commitmentLabel": "[short label in ${nativeLang}]",
  "commitment": "[2-sentence personal promise in ${nativeLang}, first person, in the user's voice]",
  "footerLeft": "[short line in ${nativeLang}]",
  "footerRight": "[short line in ${nativeLang}, e.g. 'Spikiu camina contigo']",
  "portrait": "[100-180 word portrait in ${nativeLang} if portraitMaterial=true, otherwise null]",
  "portraitTitle": "[title for portrait page in ${nativeLang}, e.g. 'Lo que escuché de ti' or null]"
}

RETURN ONLY THE JSON OBJECT. NO PREAMBLE.`;

  const userMessage = `Generate the Roadmap for this user profile:

Name: ${name}
Native language: ${nativeLang}
Today: ${today}

Profile:
${JSON.stringify(profile, null, 2)}

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
        max_tokens: 3500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const rawText = data.content[0].text.trim();

    const cleanText = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let roadmap;
    try {
      roadmap = JSON.parse(cleanText);
    } catch (parseErr) {
      console.error('Roadmap JSON parse error:', parseErr, 'Raw:', cleanText.slice(0, 500));
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
