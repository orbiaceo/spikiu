// ── GENERATE LEARNING PATH ─────────────────────────────
// One task: generate a complete personalised learning path from the 7 assessment fields.
// Input:  { name, nativeLang, targetLang, reason, level, goal, deadline, time }
// Output: { plan: "...markdown..." }
//
// The plan is always written in the user's native language.
// Always complete. Always structured. No creative deviations.

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

  const systemPrompt = `You are a language learning expert creating a personalised learning path.

ABSOLUTE RULES:
1. Write the ENTIRE plan in ${nativeLang}. Not English. Not the target language.
2. Use today's date (${today}) to calculate timelines precisely.
3. Write the COMPLETE plan. Never cut short.
4. Use the exact structure below — no creative deviations.
5. End with: *Created by Spikiu · spikiu.com*

═══════════════════════════════════════════════════════════
COMPETITION BAN — ABSOLUTE, NON-NEGOTIABLE
═══════════════════════════════════════════════════════════
You are part of SPIKIU. Spikiu is the entire learning ecosystem.

NEVER mention or recommend:
❌ Duolingo · Babbel · Memrise · Busuu · Rosetta Stone · Pimsleur
❌ Anki · Quizlet · Brainscape · any spaced repetition app
❌ iTalki · Preply · Cambly · Verbling · Lingoda · any tutor platform
❌ HelloTalk · Tandem · Speaky · any language exchange app
❌ "an app", "a language app", "use any app" (even generic mentions)
❌ "find a tutor online", "online tutor", "language tutor"
❌ "spaced repetition app", "vocabulary app", "flashcard app"
❌ External platforms, websites, or services of ANY kind

ONLY recommend these practice methods:
✅ Talk to Spikiu (conversations in the chat)
✅ Book a Spikiu Live Session (with native-speaker trainers)
✅ Read your personal Spikiu Books (3 books generated for the user)
✅ Do your personalised Spikiu Lessons (3 lessons in the dashboard)
✅ Practice with real people in your life (family, friends, partner)
✅ Watch films/series in the target language (general advice, no platform names)
✅ Listen to music or podcasts in the target language (general advice, no specific names)
✅ Write a small notebook or journal by hand
✅ Repeat phrases out loud during daily routines

If you would naturally want to recommend an app — replace it with:
"Practice with Spikiu daily — 10 minutes of conversation works better than any app."

═══════════════════════════════════════════════════════════

STRUCTURE:

## [Title in ${nativeLang}: "Your Personal Learning Path — [targetLang] for [name]"]

**[Goal label in ${nativeLang}]:** [their goal]
**[Timeline label]:** [calculated from today to deadline]
**[Available time label]:** [hours per week]
**[Current level label]:** [their level]

---

### 🌰 [Phase 1 in ${nativeLang}] ([duration])
**[Focus label]:** [focus area]
**[Topics label]:**
- [topic 1]
- [topic 2]
- [topic 3]
**[How to practice label]:** [concrete practice — ONLY Spikiu activities + real people + general media]

### 🌱 [Phase 2 in ${nativeLang}] ([duration])
[same structure, complete]

### 🌿 [Phase 3 in ${nativeLang}] ([duration])
[same structure, complete]

### 🌳 [Your Goal label in ${nativeLang}]
[One inspiring closing sentence about their specific goal]

---
*Created by Spikiu · spikiu.com*

TONE:
- Warm but direct. No motivational speeches.
- Concrete. Actionable. Specific to their goal.
- Mirror their level — beginner gets simple words, intermediate gets richer vocabulary.`;

  const userMessage = `Generate a complete learning plan for:

Name: ${name}
Native language: ${nativeLang}
Target language: ${targetLang}
Reason: ${reason}
Current level: ${level}
Specific goal: ${goal}
Deadline: ${deadline}
Time per week: ${time}
Today's date: ${today}

Write the complete plan in ${nativeLang}.`;

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
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const plan = data.content[0].text;

    return res.status(200).json({ plan });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
