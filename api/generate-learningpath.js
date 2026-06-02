// ── GENERATE PERSONAL PATH FROM ASSESSMENT PROFILE ──────────────
// Input:  { name, nativeLang, profile: { targetLang, targetLangDisplay,
//           level, motivation[], driveText, weeklyTime, deadline } }
// Output: { roadmap: { meta, page1, page2 } }  — all text in nativeLang
//
// Das Herz von Spikiu: aus dem ANTRIEB des Users (Chips + Freitext)
// entsteht ein EINMALIGER Lernweg. Wer nur Familie-Smalltalk will,
// kriegt keine Aufsatz-Übungen. Etappen-Namen sind FEST, der
// Lerninhalt jeder Etappe wird individuell generiert.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { name, nativeLang, profile } = req.body || {};

  if (!name || !nativeLang || !profile || !profile.targetLang) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // ── Locale-Helfer ──────────────────────────────────────────────
  const LOCALE = { Deutsch: 'de-DE', 'Español': 'es-ES', English: 'en-GB' }[nativeLang] || 'en-GB';

  // FESTE Etappen-Namen je Muttersprache
  const STAGE_NAMES = {
    Deutsch:  ['Fundament', 'Aufbau', 'Anwendung'],
    'Español':['Fundamento', 'Crecimiento', 'Aplicación'],
    English:  ['Foundation', 'Growth', 'Application']
  }[nativeLang] || ['Fundament', 'Aufbau', 'Anwendung'];

  const STAGE_ICONS = ['🌰', '🌱', '🌿'];

  // ── Zeitleiste in JS rechnen (kein Halluzinieren durch Spikiu) ──
  const monthsByDeadline = { '3m': 3, '6m': 6, '1y': 12, 'none': 6 };
  const totalMonths = monthsByDeadline[profile.deadline] || 6;

  const start = new Date();
  const addMonths = (d, m) => { const x = new Date(d); x.setMonth(x.getMonth() + m); return x; };
  const end  = addMonths(start, totalMonths);
  const b1   = addMonths(start, Math.round(totalMonths / 3));
  const b2   = addMonths(start, Math.round((totalMonths / 3) * 2));

  const fmtLong  = d => d.toLocaleDateString(LOCALE, { day: '2-digit', month: 'long', year: 'numeric' });
  const fmtShort = d => d.toLocaleDateString(LOCALE, { day: '2-digit', month: 'short' });

  const stagePerMonths = Math.round(totalMonths / 3);
  const durationLabel = {
    Deutsch:  `~${stagePerMonths} Monate`,
    'Español':`~${stagePerMonths} meses`,
    English:  `~${stagePerMonths} months`
  }[nativeLang] || `~${stagePerMonths} months`;

  const stageWindows = [
    { name: STAGE_NAMES[0], icon: STAGE_ICONS[0], dates: `${fmtShort(start)} → ${fmtShort(b1)}`, duration: durationLabel },
    { name: STAGE_NAMES[1], icon: STAGE_ICONS[1], dates: `${fmtShort(b1)} → ${fmtShort(b2)}`,    duration: durationLabel },
    { name: STAGE_NAMES[2], icon: STAGE_ICONS[2], dates: `${fmtShort(b2)} → ${fmtShort(end)}`,   duration: durationLabel }
  ];

  // ── Wochenzeit menschlich ───────────────────────────────────────
  const TIME_LABELS = {
    Deutsch:  { '<1':'weniger als 1 Std./Woche','1-3':'1–3 Std./Woche','3-5':'3–5 Std./Woche','5-10':'5–10 Std./Woche','10+':'mehr als 10 Std./Woche' },
    'Español':{ '<1':'menos de 1 h/semana','1-3':'1–3 h/semana','3-5':'3–5 h/semana','5-10':'5–10 h/semana','10+':'más de 10 h/semana' },
    English:  { '<1':'less than 1 h/week','1-3':'1–3 h/week','3-5':'3–5 h/week','5-10':'5–10 h/week','10+':'more than 10 h/week' }
  };
  const weeklyLabel = (TIME_LABELS[nativeLang] || TIME_LABELS.English)[profile.weeklyTime] || '';

  const target = profile.targetLangDisplay || profile.targetLang;
  const hasDeadline = profile.deadline && profile.deadline !== 'none';
  const driveText = (profile.driveText || '').trim();
  const motivation = Array.isArray(profile.motivation) ? profile.motivation : [];

  // ── System-Prompt ───────────────────────────────────────────────
  const systemPrompt = `You are Spikiu, a warm language companion (never a course, never a teacher, never "AI"). You are writing a personal two-page document called "Mein Weg / Mi camino / My path" for one specific human. It is the thing that makes Spikiu special: a syllabus shaped uniquely around THIS person — never a standard curriculum.

═══════════════════════════════════════════════════════════
THE ONE RULE THAT MATTERS MOST
═══════════════════════════════════════════════════════════
INTERPRET the user's drive (their chips + their free text) and build the path around it.
- If they only want small talk with family → NO essay drills, NO formal writing.
- If they want to pass an exam → structure toward that, honestly.
- If they want to read → lean into reading and meaning.
- If they gave almost nothing → keep it warm, broad, and inviting; never invent a drive they didn't express.
The "lerninhalt" of each stage must reflect THEIR goal, not a generic template.

═══════════════════════════════════════════════════════════
ABSOLUTE RULES
═══════════════════════════════════════════════════════════
1. ALL user-facing text in ${nativeLang} (NOT the target language, NOT English unless ${nativeLang} is English).
2. NEVER show CEFR labels (A1, B2…) or the words "level/Niveau". Use the tree/stage feeling instead.
3. NEVER say "KI", "Kurs", "Lektion", "course", "lesson". Spikiu is a companion (Begleiter / compañero).
4. Use the EXACT stage names, dates and durations provided below — do not invent or translate them.
5. Activities stay GENERAL — never list specific grammar topics, verb conjugations, or vocabulary counts.
6. NEVER mention competitors or external apps.
7. NEVER use asterisks for emphasis.
8. Match a warm, direct, encouraging tone. Address the user as "du / tú" (informal). Use their name.
9. Return ONLY valid JSON. First char "{", last char "}". No markdown fences, no preamble.

═══════════════════════════════════════════════════════════
FIXED STAGE FRAME (use verbatim)
═══════════════════════════════════════════════════════════
Stage 1: name="${stageWindows[0].name}" icon="${stageWindows[0].icon}" dates="${stageWindows[0].dates}" duration="${stageWindows[0].duration}"
Stage 2: name="${stageWindows[1].name}" icon="${stageWindows[1].icon}" dates="${stageWindows[1].dates}" duration="${stageWindows[1].duration}"
Stage 3: name="${stageWindows[2].name}" icon="${stageWindows[2].icon}" dates="${stageWindows[2].dates}" duration="${stageWindows[2].duration}"
Start date: ${fmtLong(start)}
End date:   ${fmtLong(end)}
Weekly commitment phrase: ${weeklyLabel}
${hasDeadline ? `The user has a real horizon at the end date — acknowledge it warmly in zeitplan.deadlineNote.` : `The user has NO fixed date — zeitplan.deadlineNote should be gentle, e.g. "in deinem eigenen Tempo".`}

═══════════════════════════════════════════════════════════
PAGE 1 — portrait (Spikiu's voice, 2nd person)
═══════════════════════════════════════════════════════════
80–140 words in ${nativeLang}, addressing the user as "du/tú".
- Reflect back what you heard in their drive — never psychoanalyze, never overstate.
- Make one small commitment as Spikiu: how you'll walk with them.
- End with their name and 🐾.
- If they gave little material, keep it short, warm and honest — do not invent.

OUTPUT FORMAT — VALID JSON ONLY:
{
  "meta": {
    "name": "${name}",
    "targetLang": "${target}",
    "nativeLang": "${nativeLang}",
    "startDate": "${fmtLong(start)}",
    "endDate": "${fmtLong(end)}"
  },
  "page1": {
    "portrait": {
      "title": "[short title in ${nativeLang}, e.g. 'Was ich von dir gehört habe']",
      "body": "[80–140 word portrait in ${nativeLang}, 2nd person, ending with name + 🐾]"
    },
    "ziel": {
      "label": "[label in ${nativeLang}, e.g. 'Was ich am Ende kann']",
      "items": ["[functional ability 1 — what they'll DO]", "[2]", "[3]", "[4]"]
    },
    "zeitplan": {
      "label": "[label in ${nativeLang}, e.g. 'Mein Zeitplan']",
      "start": "${fmtLong(start)}",
      "end": "${fmtLong(end)}",
      "weeklyCommitment": "${weeklyLabel}",
      "deadlineNote": "[one short warm line in ${nativeLang}]"
    },
    "versprechen": {
      "label": "[label in ${nativeLang}, e.g. 'Mein Versprechen']",
      "text": "[2 sentences, 1st person, in the user's voice, in ${nativeLang}]"
    }
  },
  "page2": {
    "title": "[title in ${nativeLang}, e.g. 'Dein Weg in drei Etappen']",
    "subtitle": "[one short line in ${nativeLang} about WHY — based on their drive]",
    "etappen": [
      {
        "icon": "${stageWindows[0].icon}",
        "name": "${stageWindows[0].name}",
        "dates": "${stageWindows[0].dates}",
        "duration": "${stageWindows[0].duration}",
        "ziel": "[what this stage achieves — in ${nativeLang}, tied to their drive]",
        "lerninhalt": ["[2–4 general focus bullets in ${nativeLang}, shaped by their goal]"],
        "wieSpikiuHilft": "[how Spikiu walks with them in this stage — in ${nativeLang}]",
        "endziel": "[the picture at the end of this stage — 'Du kannst …' in ${nativeLang}]"
      },
      { "icon": "${stageWindows[1].icon}", "name": "${stageWindows[1].name}", "dates": "${stageWindows[1].dates}", "duration": "${stageWindows[1].duration}", "ziel": "...", "lerninhalt": ["..."], "wieSpikiuHilft": "...", "endziel": "..." },
      { "icon": "${stageWindows[2].icon}", "name": "${stageWindows[2].name}", "dates": "${stageWindows[2].dates}", "duration": "${stageWindows[2].duration}", "ziel": "...", "lerninhalt": ["..."], "wieSpikiuHilft": "...", "endziel": "..." }
    ]
  }
}

RETURN ONLY THE JSON OBJECT.`;

  // ── User-Message ────────────────────────────────────────────────
  const motivLabels = motivation.length ? motivation.join(', ') : '(none selected)';
  const userMessage = `Build the personal path for this human.

Name: ${name}
Mother language: ${nativeLang}
Target language (display): ${target}
Self-described starting point (internal only, never show): ${profile.level || 'unknown'}
Weekly time: ${weeklyLabel || profile.weeklyTime}
Horizon: ${hasDeadline ? fmtLong(end) : 'no fixed date'}

THEIR DRIVE — interpret this to shape the whole syllabus:
- Chips chosen: ${motivLabels}
- In their own words: ${driveText ? `"${driveText}"` : '(left blank)'}

Return ONLY the JSON object.`;

  // ── Call Spikiu (Anthropic Claude) ──────────────────────────────
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

    const apiData = await response.json();
    const rawText = (apiData.content && apiData.content[0] && apiData.content[0].text || '').trim();

    function extractJSON(text) {
      try { return JSON.parse(text); } catch (e) {}
      const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
      try { return JSON.parse(cleaned); } catch (e) {}
      const first = cleaned.indexOf('{');
      const last = cleaned.lastIndexOf('}');
      if (first !== -1 && last > first) {
        try { return JSON.parse(cleaned.slice(first, last + 1)); } catch (e) {}
      }
      return null;
    }

    const roadmap = extractJSON(rawText);

    if (!roadmap) {
      console.error('Path JSON parse failed. Raw:', rawText.slice(0, 500));
      return res.status(500).json({ error: 'Failed to parse path JSON', raw: rawText.slice(0, 500) });
    }

    return res.status(200).json({ roadmap });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
