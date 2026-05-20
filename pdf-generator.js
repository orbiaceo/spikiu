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
  return text
    .replace(/^#{4}\s+(.+)$/gm, '<h4 style="font-family:\'Lora\',serif;font-size:1rem;font-weight:700;color:#1a1816;margin:1rem 0 0.3rem;">$1</h4>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3 style="font-family:\'Lora\',serif;font-size:1.1rem;font-weight:700;color:#1a1816;margin:1.2rem 0 0.4rem;">$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2 style="font-family:\'Lora\',serif;font-size:1.2rem;font-weight:700;color:#2d6a4f;margin:1.5rem 0 0.5rem;">$1</h2>')
    .replace(/^#{1}\s+(.+)$/gm, '<h1 style="font-family:\'Lora\',serif;font-size:1.4rem;font-weight:700;color:#2d6a4f;margin:1.5rem 0 0.5rem;">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^---+$/gm, '<hr style="border:none;border-top:1px solid #e8e4df;margin:1rem 0;">')
    .replace(/^[-•]\s+(.+)$/gm, '<li style="margin:0.3rem 0;padding-left:0.5rem;">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="list-style:none;padding:0;margin:0.5rem 0;">$&</ul>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
