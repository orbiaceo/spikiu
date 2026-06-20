#!/usr/bin/env node
// cdp-drive.mjs — wiederverwendbarer headless-Chrome-Treiber (pure Node, KEIN
// Playwright/Puppeteer nötig — Node ≥ 21 hat eine eingebaute globale WebSocket).
//
// Zweck: eine Browser-Audio-Probe-Seite laden, bis window.__done warten, das
// JSON in window.__result auslesen, HF/xet-Netzanfragen + Konsole erfassen und
// optional einen Screenshot speichern. Exit 0, wenn __result.ok truthy ist.
//
// Voraussetzung: Chrome läuft mit --remote-debugging-port (siehe SKILL.md) und
// ein statischer Server liefert das Repo-Root aus (Assets liegen am Root, NICHT
// in public/).
//
// Aufruf:
//   node cdp-drive.mjs <url> [--shot <pfad.png>] [--timeout <ms>] [--cdp <base>]
//
// Probe-Seiten-Vertrag (window-Globals):
//   window.__done   = true            wenn die Probe fertig ist
//   window.__result = { ok, ... }     JSON-serialisierbares Ergebnis (ok steuert Exit)

const args = process.argv.slice(2);
const url = args[0];
if (!url || url.startsWith('--')) {
  console.error('usage: node cdp-drive.mjs <url> [--shot p.png] [--timeout ms] [--cdp http://127.0.0.1:9222]');
  process.exit(2);
}
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const SHOT = opt('--shot', null);
const TIMEOUT = parseInt(opt('--timeout', '240000'), 10);
const CDP = opt('--cdp', 'http://127.0.0.1:9222');

const ver = await (await fetch(`${CDP}/json/version`)).json();
const ws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));

let _id = 0; const pending = new Map();
const hfReqs = []; const console_ = [];
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.consoleAPICalled') {
    console_.push(`[${m.params.type}] ` + (m.params.args || []).map(a => a.value ?? a.description ?? '').join(' '));
  }
  if (m.method === 'Network.requestWillBeSent') {
    const u = m.params.request.url;
    if (/huggingface\.co|hf\.co|xethub|cdn-lfs/.test(u)) hfReqs.push(u);
  }
});
const send = (method, params = {}, sid) => new Promise(res => {
  const id = ++_id; pending.set(id, res);
  ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) }));
});

const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);
await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
await S('Page.navigate', { url });

const t0 = Date.now();
let result = null, done = false;
while (Date.now() - t0 < TIMEOUT) {
  await new Promise(r => setTimeout(r, 1500));
  const r = await S('Runtime.evaluate', {
    expression: 'JSON.stringify({done:!!window.__done, result:window.__result||null})',
    returnByValue: true,
  });
  const v = r.result?.result?.value; if (!v) continue;
  const st = JSON.parse(v);
  process.stderr.write(`\r  t=${((Date.now() - t0) / 1000) | 0}s done=${st.done} hfReqs=${hfReqs.length}   `);
  if (st.done) { done = true; result = st.result; break; }
}
process.stderr.write('\n');

if (SHOT) {
  try {
    const shot = await S('Page.captureScreenshot', { format: 'png' });
    if (shot.result?.data) { const fs = await import('node:fs'); fs.writeFileSync(SHOT, Buffer.from(shot.result.data, 'base64')); }
  } catch {}
}

console.log('=== RESULT ===');
console.log('done   :', done);
console.log('result :', JSON.stringify(result));
console.log('HF/xet requests this load:', hfReqs.length, hfReqs.length ? '(downloaded)' : '(OPFS HIT — no download)');
hfReqs.slice(0, 5).forEach(u => console.log('   ', u.slice(0, 110)));
console.log('--- console (tail) ---');
console_.slice(-20).forEach(l => console.log('   ', l.slice(0, 200)));

ws.close();
process.exit(done && result && result.ok ? 0 : 1);
