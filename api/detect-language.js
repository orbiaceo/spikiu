// ── DETECT LANGUAGE ────────────────────────────────────
// One task: detect the user's native language from their first message.
// Input:  { text: "Deutsch" }
// Output: { language: "Deutsch" }
//
// Returns one of:
// Deutsch · Español · English · Chinese · French · Portuguese ·
// Russian · Japanese · Arabic · Polish · Italian · Dutch · Other

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing text field' });
  }

  const SUPPORTED = [
    'Deutsch', 'Español', 'English', 'Chinese', 'French',
    'Portuguese', 'Russian', 'Japanese', 'Arabic',
    'Polish', 'Italian', 'Dutch'
  ];

  const systemPrompt = `You identify the user's native language from their message.

Reply ONLY with ONE word from this exact list:
Deutsch, Español, English, Chinese, French, Portuguese, Russian, Japanese, Arabic, Polish, Italian, Dutch, Other

Rules:
- "Deutsch", "German", "Alemán", "deutsch" → Deutsch
- "Español", "Spanish", "Spanisch", "español" → Español
- "English", "Englisch", "Inglés" → English
- "中文", "Chinese", "Chinesisch" → Chinese
- "Français", "French", "Französisch" → French
- "Português", "Portuguese", "Portugiesisch" → Portuguese
- "Русский", "Russian", "Russisch" → Russian
- "日本語", "Japanese", "Japanisch" → Japanese
- "العربية", "Arabic", "Arabisch" → Arabic
- "Polski", "Polish", "Polnisch" → Polish
- "Italiano", "Italian", "Italienisch" → Italian
- "Nederlands", "Dutch", "Niederländisch" → Dutch
- Any other language → Other
- No explanation. Just one word.`;

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
        max_tokens: 10,
        system: systemPrompt,
        messages: [{ role: 'user', content: text }]
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    const detected = data.content[0].text.trim();
    const language = SUPPORTED.includes(detected) ? detected : 'English';

    return res.status(200).json({ language });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
