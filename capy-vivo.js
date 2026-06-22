/* ── SPIKIU · CAPY VIVO (wiederverwendbarer Helfer) ──────────────────
   Macht ein bereits gerendertes Capy-<svg> lebendig — ohne Abhängigkeiten,
   eigener CSS-Namensraum (spk-capy-*), stört nichts.

     window.spkCapyAlive(svgEl, { tapTarget, clamp, eyeY });

   Das SVG braucht eine Augen-Gruppe <g class="spk-capy-eyes">…</g>
   (zwei dunkle Augen + zwei Glanzpunkte). Der Helfer:
     • blinzelt automatisch (Augen-Gruppe kurz zu Schlitzen),
     • lässt den Blick dem Zeiger folgen (geklemmt, sanft),
     • macht beim Antippen einen kurzen Freuden-Hüpfer (ohne den Klick
       zu schlucken — Panel/Handler feuern weiter).
   Atmen bleibt der Seite (CSS) überlassen. Mehrfach-Aufruf je SVG = no-op.
   prefers-reduced-motion → ruhig (kein Tracking/Hüpfer/Blinzeln).        */
(function () {
  if (window.spkCapyAlive) return;

  var STYLE_ID = 'spk-capy-vivo-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = ''
      + '.spk-capy-eyes{transform-box:fill-box;transform-origin:center;transition:transform .14s ease-out}'
      + '@keyframes spk-capy-hop{0%,100%{transform:translateY(0)}30%{transform:translateY(-9px)}55%{transform:translateY(0)}74%{transform:translateY(-4px)}}'
      + '.spk-capy-hop{animation:spk-capy-hop .5s cubic-bezier(.3,1.4,.5,1) !important}';
    var st = document.createElement('style');
    st.id = STYLE_ID; st.textContent = css;
    (document.head || document.documentElement).appendChild(st);
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  window.spkCapyAlive = function (svg, opts) {
    if (!svg || svg.__spkAlive) return;            // idempotent je SVG
    var eyes = svg.querySelector('.spk-capy-eyes');
    if (!eyes) return;                             // ohne Augen-Gruppe: ruhig no-op
    svg.__spkAlive = true;
    opts = opts || {};
    injectStyle();

    if (reducedMotion()) return;                   // ruhig: nur Atmen (CSS der Seite)

    var CLAMP = (typeof opts.clamp === 'number') ? opts.clamp : 2.4;  // viewBox-Einheiten
    var EYEY  = (typeof opts.eyeY  === 'number') ? opts.eyeY  : 0.34; // Augenhöhe im SVG
    var tx = 0, ty = 0, blinking = false;

    function apply() {
      eyes.style.transform = 'translate(' + tx + 'px,' + ty + 'px)' + (blinking ? ' scaleY(.1)' : '');
    }

    // — Blinzeln (zufälliges Intervall) —
    function scheduleBlink() {
      setTimeout(function () {
        blinking = true; apply();
        setTimeout(function () { blinking = false; apply(); }, 130);
        scheduleBlink();
      }, 2500 + Math.random() * 3500);
    }
    setTimeout(scheduleBlink, 1400 + Math.random() * 1200);

    // — Blick folgt dem Zeiger (geklemmt, Bezug = SVG-Mitte) —
    function track(px, py) {
      var r = svg.getBoundingClientRect();
      if (!r.width) return;
      var cx = r.left + r.width / 2, cy = r.top + r.height * EYEY;
      var dx = (px - cx) / 40, dy = (py - cy) / 40;
      tx = Math.max(-CLAMP, Math.min(CLAMP, dx));
      ty = Math.max(-CLAMP, Math.min(CLAMP, dy));
      apply();
    }
    function recenter() { tx = 0; ty = 0; apply(); }
    document.addEventListener('mousemove', function (e) { track(e.clientX, e.clientY); }, { passive: true });
    document.addEventListener('touchmove', function (e) { var p = e.touches && e.touches[0]; if (p) track(p.clientX, p.clientY); }, { passive: true });
    document.addEventListener('mouseleave', recenter);
    window.addEventListener('blur', recenter);

    // — Tipp = Freuden-Hüpfer (schluckt den Klick NICHT) —
    var tapTarget = opts.tapTarget || svg;
    tapTarget.addEventListener('pointerdown', function () {
      svg.classList.remove('spk-capy-hop');
      void svg.getBoundingClientRect().width;      // Reflow → Animation neu starten
      svg.classList.add('spk-capy-hop');
    });
    svg.addEventListener('animationend', function (e) {
      if (e.animationName === 'spk-capy-hop') svg.classList.remove('spk-capy-hop');
    });
  };
})();
