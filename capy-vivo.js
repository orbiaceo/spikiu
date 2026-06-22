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
      + '.spk-capy-hop{animation:spk-capy-hop .5s cubic-bezier(.3,1.4,.5,1) !important}'
      // — Sprech-Zustand: Mund auf/zu + zwei weiche Aura-Ringe (wie prototyp-voz.html) —
      + '.spk-capy-mouth{transform-box:fill-box;transform-origin:center}'
      + '@keyframes spk-capy-talk{0%,100%{transform:scaleY(1)}50%{transform:scaleY(2.1) scaleX(1.1)}}'
      + '.spk-capy-speaking .spk-capy-mouth{animation:spk-capy-talk .4s ease-in-out infinite}'
      + '.spk-capy-aura{transform-box:fill-box;transform-origin:center;opacity:0;pointer-events:none}'
      + '@keyframes spk-capy-ring{0%{transform:scale(.55);opacity:.45}100%{transform:scale(1.25);opacity:0}}'
      + '.spk-capy-speaking .spk-capy-aura{animation:spk-capy-ring 1.6s ease-out infinite}'
      + '.spk-capy-speaking .spk-capy-aura2{animation-delay:.8s}';
    var st = document.createElement('style');
    st.id = STYLE_ID; st.textContent = css;
    (document.head || document.documentElement).appendChild(st);
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // Aura-Ringe einmalig in den SVG hängen (hinter den Capy). Idempotent.
  function ensureAura(svg) {
    if (svg.__spkAura) return;
    svg.__spkAura = true;
    svg.style.overflow = 'visible';                // Ringe dürfen über die viewBox hinaus
    var NS = 'http://www.w3.org/2000/svg';
    for (var i = 0; i < 2; i++) {
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('class', 'spk-capy-aura' + (i ? ' spk-capy-aura2' : ''));
      c.setAttribute('cx', '40'); c.setAttribute('cy', '42'); c.setAttribute('r', '28');
      c.setAttribute('fill', 'none'); c.setAttribute('stroke', '#2d6a4f'); c.setAttribute('stroke-width', '2');
      svg.insertBefore(c, svg.firstChild);         // hinter den Capy einsortieren
    }
  }

  // Sprech-Zustand schalten (wiederverwendbar): Mund auf/zu + Aura-Ringe.
  // Braucht im SVG den Mund-Pfad <… class="spk-capy-mouth">. reduced-motion → ruhig
  // (kein hektischer Mund, keine Ringe). Defensiv/idempotent.
  window.spkCapySpeak = function (svg, on) {
    if (!svg) return;
    injectStyle();
    if (reducedMotion()) return;                   // ruhig: kein Mund/keine Ringe
    if (on) ensureAura(svg);
    svg.classList.toggle('spk-capy-speaking', !!on);
  };

  window.spkCapyAlive = function (svg, opts) {
    // Handle mit .speak(on) — auch dann nutzbar, wenn unten früh zurückgekehrt wird.
    var handle = { speak: function (on) { window.spkCapySpeak(svg, on); } };
    if (!svg) return handle;
    if (svg.__spkAlive) return handle;             // idempotent je SVG
    var eyes = svg.querySelector('.spk-capy-eyes');
    if (!eyes) return handle;                      // ohne Augen-Gruppe: blinzeln no-op, Sprech-Handle bleibt
    svg.__spkAlive = true;
    opts = opts || {};
    injectStyle();

    if (reducedMotion()) return handle;            // ruhig: nur Atmen (CSS der Seite)

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

    return handle;
  };
})();
