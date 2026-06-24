/* ── SPIKIU · SITZUNG (wiederverwendbarer Persistenz-Helfer) ──────────
   Sicherheitsnetz: keine Arbeit darf durch einen Fehl-Tipp verloren gehen.
   Jeder Raum sichert seinen Zustand laufend (localStorage, Schlüssel
   `spikiu_sitzung:<raum>`) und bietet beim Eintritt bei unfertiger Sitzung
   die Wiederkommen-Karte an (Spikiu lebendig, kein Streak/Score).

     window.spikiuSitzung.lade(raum)            → Objekt | null
     window.spikiuSitzung.speichere(raum, zust) → setzt zust.ts, schreibt
     window.spikiuSitzung.raeume(raum)          → löscht den Schlüssel
     window.spikiuSitzung.frageWiederkommen({raum, ts, wo, beimWeiter, beimNeu})

   Statisch am Root, wie nav.js / baum.js / capy-vivo.js. localStorage jetzt,
   Supabase = Phase 2. prefers-reduced-motion → ruhig. Idempotente CSS-
   Injektion (Namensraum spk-sitz-*). Wirft nie (try/catch).               */
(function () {
  if (window.spikiuSitzung) return;

  var PREFIX = 'spikiu_sitzung:';

  // ── Speicher (nie werfen) ────────────────────────────────────────
  function lade(raum) {
    try {
      var raw = localStorage.getItem(PREFIX + raum);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function speichere(raum, zustand) {
    try {
      zustand = zustand || {};
      zustand.ts = Date.now();
      localStorage.setItem(PREFIX + raum, JSON.stringify(zustand));
    } catch (e) {}
  }
  function raeume(raum) {
    try { localStorage.removeItem(PREFIX + raum); } catch (e) {}
  }

  // ── Kanonischer Capy, 1:1 aus taller.html — hier mit lebendigen Haken
  //    (Augen-Gruppe spk-capy-eyes, Mund spk-capy-mouth) für spkCapyAlive.
  function CAPY(s) {
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 80 80" fill="none">' +
      '<ellipse cx="40" cy="50" rx="28" ry="20" fill="#c9956a"/>' +
      '<ellipse cx="40" cy="28" rx="18" ry="15" fill="#c9956a"/>' +
      '<ellipse cx="40" cy="36" rx="10" ry="7" fill="#b8845a"/>' +
      '<ellipse cx="40" cy="33" rx="4" ry="2.5" fill="#8b5e3c"/>' +
      '<circle cx="38" cy="33" r="1" fill="#6b4226"/><circle cx="42" cy="33" r="1" fill="#6b4226"/>' +
      '<g class="spk-capy-eyes">' +
        '<circle cx="33" cy="24" r="3.5" fill="#3d2b1f"/><circle cx="47" cy="24" r="3.5" fill="#3d2b1f"/>' +
        '<circle cx="34" cy="23" r="1.2" fill="white"/><circle cx="48" cy="23" r="1.2" fill="white"/>' +
      '</g>' +
      '<ellipse cx="26" cy="17" rx="6" ry="5" fill="#b8845a"/><ellipse cx="54" cy="17" rx="6" ry="5" fill="#b8845a"/>' +
      '<ellipse cx="22" cy="66" rx="7" ry="5" fill="#b8845a"/><ellipse cx="34" cy="68" rx="7" ry="5" fill="#b8845a"/>' +
      '<ellipse cx="46" cy="68" rx="7" ry="5" fill="#b8845a"/><ellipse cx="58" cy="66" rx="7" ry="5" fill="#b8845a"/>' +
      '<path class="spk-capy-mouth" d="M36 38 Q40 41 44 38" stroke="#8b5e3c" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>';
  }

  // ── Muttersprache aus dem Profil (wie die Räume sie lesen) ────────
  function langCode(v) {
    if (!v) return null; v = ('' + v).toLowerCase();
    if (/^(de|es|en|el)$/.test(v)) return v;
    if (v.indexOf('deutsch') > -1 || v.indexOf('german') > -1) return 'de';
    if (v.indexOf('span') > -1 || v.indexOf('español') > -1) return 'es';
    if (v.indexOf('engl') > -1) return 'en';
    if (v.indexOf('griech') > -1 || v.indexOf('greek') > -1) return 'el';
    return null;
  }
  function mutterCode() {
    var u = {}, p = {};
    try { u = JSON.parse(localStorage.getItem('spikiu_user') || '{}'); } catch (e) {}
    p = u.profile || {};
    var m = p.muttersprache || langCode(p.nativeLang) || 'de';
    if (['de', 'es', 'en'].indexOf(m) < 0) m = 'de';
    return m;
  }

  var I18N = {
    de: { title: 'Weiter, wo du warst?', sub: 'Dein Text ist noch da. Sollen wir weitermachen?',
          weiter: 'Weiter', neu: 'Von vorn', now: 'gerade eben',
          min: function (n) { return 'vor ' + n + ' Minute' + (n === 1 ? '' : 'n'); },
          hour: function (n) { return 'vor ' + n + ' Stunde' + (n === 1 ? '' : 'n'); },
          day: function (n) { return 'vor ' + n + ' Tag' + (n === 1 ? '' : 'en'); } },
    es: { title: '¿Seguimos donde lo dejaste?', sub: 'Tu texto sigue aquí. ¿Continuamos?',
          weiter: 'Continuar', neu: 'Empezar de nuevo', now: 'justo ahora',
          min: function (n) { return 'hace ' + n + ' minuto' + (n === 1 ? '' : 's'); },
          hour: function (n) { return 'hace ' + n + ' hora' + (n === 1 ? '' : 's'); },
          day: function (n) { return 'hace ' + n + ' día' + (n === 1 ? '' : 's'); } },
    en: { title: 'Pick up where you left off?', sub: 'Your text is still here. Shall we continue?',
          weiter: 'Continue', neu: 'Start over', now: 'just now',
          min: function (n) { return n + ' minute' + (n === 1 ? '' : 's') + ' ago'; },
          hour: function (n) { return n + ' hour' + (n === 1 ? '' : 's') + ' ago'; },
          day: function (n) { return n + ' day' + (n === 1 ? '' : 's') + ' ago'; } }
  };

  function relTime(ts, t) {
    var diff = Date.now() - (ts || Date.now());
    if (diff < 45000) return t.now;
    var min = Math.round(diff / 60000);
    if (min < 60) return t.min(min);
    var hour = Math.round(min / 60);
    if (hour < 24) return t.hour(hour);
    return t.day(Math.round(hour / 24));
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // ── CSS einmalig (idempotent) ────────────────────────────────────
  var STYLE_ID = 'spk-sitz-style';
  function ensureCss() {
    if (document.getElementById(STYLE_ID)) return;
    var css = ''
      + '.spk-sitz-veil{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;'
      + 'padding:1.4rem;background:rgba(43,38,32,.42);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);'
      + 'animation:spk-sitz-fade .25s ease both}'
      + '@keyframes spk-sitz-fade{from{opacity:0}to{opacity:1}}'
      + '.spk-sitz-card{background:#fdfbf5;border:1px solid #e6dec9;border-radius:14px;max-width:360px;width:100%;'
      + 'padding:1.9rem 1.7rem;text-align:center;box-shadow:0 24px 60px -24px rgba(60,45,20,.55);'
      + 'font-family:"Manrope",system-ui,sans-serif;color:#2b2620}'
      + '.spk-sitz-capy{display:flex;justify-content:center;margin-bottom:.5rem}'
      + '.spk-sitz-capy svg{animation:spk-sitz-breathe 4s ease-in-out infinite}'
      + '@keyframes spk-sitz-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}'
      + '.spk-sitz-title{font-family:"Cormorant Garamond",serif;font-size:1.5rem;line-height:1.25;margin-bottom:.5rem}'
      + '.spk-sitz-sub{font-size:.98rem;line-height:1.5;color:#6e6256;margin-bottom:.7rem}'
      + '.spk-sitz-wo{font-size:.78rem;color:#a87b2e;font-weight:600;margin-bottom:1.3rem;letter-spacing:.01em}'
      + '.spk-sitz-row{display:flex;gap:.7rem;justify-content:center;flex-wrap:wrap}'
      + '.spk-sitz-btn{font-family:inherit;font-size:.92rem;font-weight:700;border-radius:99px;cursor:pointer;'
      + 'padding:.6rem 1.3rem;border:1px solid transparent;transition:.18s}'
      + '.spk-sitz-btn.go{background:#2d6a4f;color:#fff}.spk-sitz-btn.go:hover{filter:brightness(1.08)}'
      + '.spk-sitz-btn.line{background:transparent;color:#2b2620;border-color:#e6dec9}'
      + '.spk-sitz-btn.line:hover{border-color:#a87b2e}'
      + '@media (prefers-reduced-motion: reduce){.spk-sitz-veil{animation:none}.spk-sitz-capy svg{animation:none}}';
    var st = document.createElement('style');
    st.id = STYLE_ID; st.textContent = css;
    (document.head || document.documentElement).appendChild(st);
  }

  // ── Wiederkommen-Karte ───────────────────────────────────────────
  function frageWiederkommen(o) {
    o = o || {};
    ensureCss();
    var m = mutterCode(), t = I18N[m] || I18N.de;

    var veil = document.createElement('div');
    veil.className = 'spk-sitz-veil';
    veil.setAttribute('role', 'dialog');
    veil.setAttribute('aria-modal', 'true');

    var woLine = '';
    var rel = relTime(o.ts, t);
    if (o.wo) woLine = esc(o.wo) + ' · ' + esc(rel);
    else woLine = esc(rel);

    veil.innerHTML =
      '<div class="spk-sitz-card">' +
        '<div class="spk-sitz-capy">' + CAPY(56) + '</div>' +
        '<p class="spk-sitz-title">' + esc(t.title) + '</p>' +
        '<p class="spk-sitz-sub">' + esc(t.sub) + '</p>' +
        '<p class="spk-sitz-wo">' + woLine + '</p>' +
        '<div class="spk-sitz-row">' +
          '<button class="spk-sitz-btn go" data-act="go">' + esc(t.weiter) + '</button>' +
          '<button class="spk-sitz-btn line" data-act="neu">' + esc(t.neu) + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(veil);

    // Spikiu lebendig (atmet via CSS oben, blinzelt/folgt via Helfer falls da)
    if (window.spkCapyAlive && !reducedMotion()) {
      var svg = veil.querySelector('.spk-sitz-capy svg');
      try { window.spkCapyAlive(svg); } catch (e) {}
    }

    function close() { if (veil.parentNode) veil.parentNode.removeChild(veil); }
    veil.querySelector('[data-act="go"]').addEventListener('click', function () {
      close(); if (typeof o.beimWeiter === 'function') o.beimWeiter();
    });
    veil.querySelector('[data-act="neu"]').addEventListener('click', function () {
      close(); if (typeof o.beimNeu === 'function') o.beimNeu();
    });
  }

  function esc(s) {
    return ('' + s).replace(/[&<>]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]; });
  }

  window.spikiuSitzung = {
    lade: lade,
    speichere: speichere,
    raeume: raeume,
    frageWiederkommen: frageWiederkommen
  };
})();
