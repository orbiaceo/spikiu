// ── PDF GENERATOR MODULE ───────────────────────────────
// One task: take markdown text, open a printable PDF window.
//
// Usage:
//   import { downloadPDF, markdownToPlain } from './pdf-generator.js';
//   downloadPDF(markdownText);

export function markdownToPlain(text) {
  return text
    .replace(/^#{1,4}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^---+$/gm, '────────────────────────')
    .replace(/^[-•]\s+/gm, '  • ')
    .replace(/^\d+\.\s+/gm, m => '  ' + m);
}

export function downloadPDF(markdownText) {
  const plain = markdownToPlain(markdownText);
  const date = new Date().toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Spikiu</title>
  <style>
    body {
      font-family: Georgia, serif;
      max-width: 680px;
      margin: 40px auto;
      padding: 0 2rem;
      color: #1a1612;
      line-height: 1.8;
      font-size: 15px;
    }
    .header {
      border-bottom: 2px solid #2d6a4f;
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .logo {
      font-family: Georgia, serif;
      font-size: 1.8rem;
      font-weight: 700;
      color: #2d6a4f;
    }
    .date {
      font-size: 0.8rem;
      color: #888;
    }
    pre {
      white-space: pre-wrap;
      font-family: Georgia, serif;
      font-size: 15px;
      line-height: 1.8;
    }
    .footer {
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid #e8e0d5;
      font-size: 0.75rem;
      color: #aaa;
      text-align: center;
    }
    @media print {
      body { margin: 20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <span class="logo">Spikiu</span>
    <span class="date">${date}</span>
  </div>
  <pre>${plain}</pre>
  <div class="footer">spikiu.com · Your personal language path</div>
</body>
</html>`);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

// Markdown to HTML for displaying in chat (not PDF)
export function parseMarkdown(text) {
  // First: inline formatting (bold, italic) on the raw text
  let processed = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Split into paragraphs by double newline
  const paragraphs = processed.split(/\n{2,}/);

  return paragraphs.map(para => {
    const block = para.trim();
    if (!block) return '';

    // Heading?
    if (/^#{4}\s+/.test(block)) return `<h4 style="font-family:'Lora',serif;font-size:1rem;font-weight:700;color:#1a1816;margin:0.8rem 0 0.3rem;">${block.replace(/^#{4}\s+/, '')}</h4>`;
    if (/^#{3}\s+/.test(block)) return `<h3 style="font-family:'Lora',serif;font-size:1.08rem;font-weight:700;color:#1a1816;margin:1rem 0 0.4rem;">${block.replace(/^#{3}\s+/, '')}</h3>`;
    if (/^#{2}\s+/.test(block)) return `<h2 style="font-family:'Lora',serif;font-size:1.18rem;font-weight:700;color:#2d6a4f;margin:1.1rem 0 0.5rem;">${block.replace(/^#{2}\s+/, '')}</h2>`;
    if (/^#{1}\s+/.test(block)) return `<h1 style="font-family:'Lora',serif;font-size:1.35rem;font-weight:700;color:#2d6a4f;margin:1.2rem 0 0.5rem;">${block.replace(/^#{1}\s+/, '')}</h1>`;

    // Horizontal rule
    if (/^---+$/.test(block)) return '<hr style="border:none;border-top:1px solid #e8e4df;margin:0.8rem 0;">';

    const lines = block.split('\n');

    // Bullet list? (every line starts with - or •)
    if (lines.every(l => /^\s*[-•]\s+/.test(l))) {
      const items = lines.map(l => `<li style="margin:0.15rem 0;">${l.replace(/^\s*[-•]\s+/, '')}</li>`).join('');
      return `<ul style="padding-left:1.2rem;margin:0.3rem 0;">${items}</ul>`;
    }

    // Numbered list? (every line starts with 1. 2. etc)
    if (lines.every(l => /^\s*\d+\.\s+/.test(l))) {
      const items = lines.map(l => `<li style="margin:0.15rem 0;">${l.replace(/^\s*\d+\.\s+/, '')}</li>`).join('');
      return `<ol style="padding-left:1.4rem;margin:0.3rem 0;">${items}</ol>`;
    }

    // Regular paragraph — single newlines become <br>
    return `<p style="margin:0.35rem 0;">${lines.join('<br>')}</p>`;
  }).filter(Boolean).join('');
}
