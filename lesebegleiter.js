/* ── SPIKIU · READER-LESEBEGLEITER (Widget) ─────────────────────────
   Selbst-montierend wie nav.js. Einbinden in Reader-Kapitel:
   <script src="lesebegleiter.js" defer></script>

   Schwebendes, atmendes Spikiu unten rechts. Opt-in: leiser Hinweis (blendet
   aus), Tipp öffnet ein schlankes Fenster. Kurze Frage zum Text → kurze,
   buchnahe Antwort vom Endpoint /api/lesebegleiter (Seele zur Laufzeit).
   Dritter LEICHTER Modus — Szenen-Üben/volles Gespräch bleibt im Sprech-Raum.   */
(function () {
  if (window.__spikiuBegleiter) return;
  window.__spikiuBegleiter = true;

  // ── Profil ──────────────────────────────────────────────
  function readUser() { try { return JSON.parse(localStorage.getItem('spikiu_user') || '{}'); } catch (e) { return {}; } }
  function norm(v) {
    if (!v) return ''; v = ('' + v).trim().toLowerCase();
    if (['de', 'deutsch', 'german', 'aleman', 'alemán'].indexOf(v) >= 0) return 'de';
    if (['es', 'espanol', 'español', 'spanish', 'spanisch'].indexOf(v) >= 0) return 'es';
    if (['en', 'english', 'englisch', 'ingles', 'inglés'].indexOf(v) >= 0) return 'en';
    return '';
  }
  var u = readUser(), prof = u.profile || {};
  var MUT  = norm(prof.muttersprache || u.nativeLang) || 'de';
  var ZIEL = norm(prof.zielsprache || prof.targetLang || u.targetLang) || 'es';

  // ── UI-Texte in der Muttersprache ──────────────────────
  var T = {
    de: { hint: 'Wenn du was fragen willst — ich bin da. 🐾', intro: 'Hola. Frag mich ruhig was zur Geschichte oder zu einem Wort — ich halt mich kurz.', ph: 'Frag mich was zur Geschichte …', send: 'fragen', err: 'Hm, das hat gerade nicht geklappt. Versuch es gleich nochmal.' },
    es: { hint: 'Si quieres preguntar algo — aquí estoy. 🐾', intro: 'Hola. Pregúntame lo que quieras sobre la historia o una palabra — seré breve.', ph: 'Pregúntame algo sobre la historia …', send: 'preguntar', err: 'Uy, ahora no funcionó. Inténtalo de nuevo en un momento.' },
    en: { hint: "If you'd like to ask something — I'm here. 🐾", intro: "Hi. Ask me anything about the story or a word — I'll keep it short.", ph: 'Ask me about the story …', send: 'ask', err: "Hmm, that didn't work just now. Try again in a moment." }
  };
  var t = T[MUT] || T.de;

  var CAPY = '<svg viewBox="0 0 80 80" fill="none" aria-label="Spikiu">'
    + '<ellipse cx="40" cy="50" rx="28" ry="20" fill="#c9956a"/><ellipse cx="40" cy="28" rx="18" ry="15" fill="#c9956a"/>'
    + '<ellipse cx="40" cy="36" rx="10" ry="7" fill="#b8845a"/><ellipse cx="40" cy="33" rx="4" ry="2.5" fill="#8b5e3c"/>'
    + '<circle cx="38" cy="33" r="1" fill="#6b4226"/><circle cx="42" cy="33" r="1" fill="#6b4226"/>'
    + '<circle cx="33" cy="24" r="3.5" fill="#3d2b1f"/><circle cx="47" cy="24" r="3.5" fill="#3d2b1f"/>'
    + '<circle cx="34" cy="23" r="1.2" fill="white"/><circle cx="48" cy="23" r="1.2" fill="white"/>'
    + '<ellipse cx="26" cy="17" rx="6" ry="5" fill="#b8845a"/><ellipse cx="54" cy="17" rx="6" ry="5" fill="#b8845a"/>'
    + '<ellipse cx="22" cy="66" rx="7" ry="5" fill="#b8845a"/><ellipse cx="34" cy="68" rx="7" ry="5" fill="#b8845a"/>'
    + '<ellipse cx="46" cy="68" rx="7" ry="5" fill="#b8845a"/><ellipse cx="58" cy="66" rx="7" ry="5" fill="#b8845a"/>'
    + '<path d="M36 38 Q40 41 44 38" stroke="#8b5e3c" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>';

  // ── Styles (eigener Namensraum spk-beg, stört den Reader nicht) ──
  var css = ''
    + '@keyframes spkbeg-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}'
    + '@keyframes spkbeg-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}'
    + '.spk-beg{position:fixed;right:20px;bottom:20px;z-index:9000;display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-family:"DM Sans",system-ui,sans-serif}'
    + '.spk-beg-hint{font-size:.8rem;color:#1a1612;background:#fff;border:1px solid #e8e4df;box-shadow:0 8px 26px rgba(0,0,0,.12);border-radius:14px 14px 4px 14px;padding:9px 13px;max-width:210px;cursor:pointer;transition:opacity .5s,transform .5s}'
    + '.spk-beg-hint.spk-hide{opacity:0;transform:translateY(6px);pointer-events:none}'
    + '.spk-beg-fab{width:60px;height:60px;border-radius:50%;background:#fdfaf3;border:1px solid #e8e4df;box-shadow:0 10px 30px rgba(0,0,0,.18);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:transform .15s}'
    + '.spk-beg-fab:hover{transform:scale(1.05)}'
    + '.spk-beg-fab svg{width:42px;height:42px;animation:spkbeg-float 4s ease-in-out infinite}'
    + '.spk-beg-panel{position:fixed;right:20px;bottom:20px;z-index:9001;width:min(340px,92vw);background:#fff;border:1px solid #e8e4df;border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.24);display:none;flex-direction:column;overflow:hidden;max-height:72vh;font-family:"DM Sans",system-ui,sans-serif}'
    + '.spk-beg-panel.spk-open{display:flex;animation:spkbeg-rise .25s ease}'
    + '.spk-beg-head{display:flex;align-items:center;gap:10px;padding:11px 13px;border-bottom:1px solid #ece4d3;background:#fdfaf3}'
    + '.spk-beg-head svg{width:28px;height:28px;animation:spkbeg-float 4s ease-in-out infinite}'
    + '.spk-beg-head b{font-family:"Lora",Georgia,serif;font-size:1rem;color:#1a1612}'
    + '.spk-beg-x{margin-left:auto;background:none;border:0;color:#6b6560;font-size:1.3rem;cursor:pointer;line-height:1;padding:2px 6px}'
    + '.spk-beg-x:hover{color:#1a1612}'
    + '.spk-beg-msgs{padding:13px;display:flex;flex-direction:column;gap:9px;overflow-y:auto}'
    + '.spk-beg-m{font-size:.92rem;line-height:1.5;padding:9px 12px;border-radius:13px;max-width:90%;animation:spkbeg-rise .2s ease both;white-space:pre-wrap}'
    + '.spk-beg-m.sp{align-self:flex-start;background:#e8f2ed;color:#1a1612;border-bottom-left-radius:4px}'
    + '.spk-beg-m.me{align-self:flex-end;background:#2d6a4f;color:#fff;border-bottom-right-radius:4px}'
    + '.spk-beg-comp{display:flex;gap:8px;padding:10px;border-top:1px solid #ece4d3}'
    + '.spk-beg-comp input{flex:1;border:1px solid #e8e4df;border-radius:10px;outline:0;padding:10px 12px;font:inherit;font-size:.9rem;background:#fdfaf3;color:#1a1612}'
    + '.spk-beg-comp input:focus{border-color:#2d6a4f}'
    + '.spk-beg-comp button{background:#2d6a4f;color:#fff;border:0;border-radius:10px;padding:0 14px;font:inherit;font-weight:600;font-size:.85rem;cursor:pointer}';

  function mount() {
    var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

    var beg = document.createElement('div'); beg.className = 'spk-beg';
    beg.innerHTML = '<button class="spk-beg-hint" type="button">' + t.hint + '</button>'
      + '<button class="spk-beg-fab" type="button" aria-label="Spikiu">' + CAPY + '</button>';

    var panel = document.createElement('div'); panel.className = 'spk-beg-panel';
    panel.innerHTML = '<div class="spk-beg-head">' + CAPY + '<b>Spikiu</b><button class="spk-beg-x" type="button" aria-label="schließen">×</button></div>'
      + '<div class="spk-beg-msgs"></div>'
      + '<div class="spk-beg-comp"><input type="text" placeholder="' + t.ph + '" autocomplete="off" spellcheck="false"><button type="button">' + t.send + '</button></div>';

    document.body.appendChild(beg);
    document.body.appendChild(panel);

    var hint   = beg.querySelector('.spk-beg-hint');
    var fab    = beg.querySelector('.spk-beg-fab');
    var msgs   = panel.querySelector('.spk-beg-msgs');
    var input  = panel.querySelector('input');
    var sendBt = panel.querySelector('.spk-beg-comp button');
    var closeBt= panel.querySelector('.spk-beg-x');
    var greeted = false;

    setTimeout(function () { hint.classList.add('spk-hide'); }, 6000);

    function open() {
      hint.classList.add('spk-hide'); beg.style.display = 'none'; panel.classList.add('spk-open');
      if (!greeted) { greeted = true; add('sp', t.intro); }
      setTimeout(function () { input.focus(); }, 150);
    }
    function close() { panel.classList.remove('spk-open'); beg.style.display = 'flex'; }
    function add(who, text) {
      var d = document.createElement('div'); d.className = 'spk-beg-m ' + who; d.textContent = text;
      msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d;
    }

    function ask() {
      var v = input.value.trim(); if (!v) return;
      add('me', v); input.value = '';
      var bubble = add('sp', '…');
      var kontext = '';
      var rt = document.querySelector('.reader-text');
      if (rt) kontext = (rt.innerText || rt.textContent || '').slice(0, 3500);
      fetch('/api/lesebegleiter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frage: v, muttersprache: MUT, zielsprache: ZIEL, kapitel: document.title, kontext: kontext })
      })
        .then(function (r) { return r.json(); })
        .then(function (d) { bubble.textContent = (d && d.antwort) ? d.antwort : t.err; msgs.scrollTop = msgs.scrollHeight; })
        .catch(function () { bubble.textContent = t.err; });
    }

    hint.addEventListener('click', open);
    fab.addEventListener('click', open);
    closeBt.addEventListener('click', close);
    sendBt.addEventListener('click', ask);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') ask(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
