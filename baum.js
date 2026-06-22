/* ===================================================================
   baum.js — der lebende Baum (Spikiu)
   -------------------------------------------------------------------
   Eigenständiger Root-Helfer (statisch wie nav.js / capy-vivo.js /
   sprichwort.js — KEIN vercel.json-Eintrag, kein api/). Dependency-frei.

   Einbindung:  <script src="baum.js" defer></script>
   Aufruf:      window.spkBaum(containerEl, { etappe:'samen|stamm|krone', blaetter:N });

   - etappe  = sichtbare Wachstums-Etappe (Samen → Stamm → Krone).
   - blaetter = wie viele Blätter die Krone trägt (z. B. 1 pro Sitzung);
               wächst über die Etappen-Obergrenze hinaus → Signal „Krone voll".
   - Die Krone WIEGT sich sanft (CSS-Keyframe). Neue Blätter (mehr als beim
     letzten Render derselben Etappe) POPPEN rein.
   - prefers-reduced-motion → ruhig: kein Wiegen, kein Pop.
   - CSS-Namensraum `spk-baum-*`, einmalig injiziert.
=================================================================== */
(function (w, d) {
  'use strict';
  if (w.spkBaum) return;

  // ── CSS einmalig injizieren ──────────────────────────────────────
  function ensureStyle() {
    if (d.getElementById('spk-baum-style')) return;
    var s = d.createElement('style');
    s.id = 'spk-baum-style';
    s.textContent =
      '.spk-baum-svg{display:block;width:100%;height:auto;overflow:visible;}' +
      '.spk-baum-crown{transform-origin:100px 212px;animation:spk-baum-sway 7s ease-in-out infinite;}' +
      '@keyframes spk-baum-sway{0%,100%{transform:rotate(-1.3deg);}50%{transform:rotate(1.3deg);}}' +
      '.spk-baum-leaf{transform-box:fill-box;transform-origin:center;}' +
      '.spk-baum-leaf.spk-new{animation:spk-baum-pop .55s cubic-bezier(.34,1.56,.64,1) both;}' +
      '@keyframes spk-baum-pop{0%{transform:scale(0);}100%{transform:scale(1);}}' +
      '@media (prefers-reduced-motion: reduce){' +
        '.spk-baum-crown{animation:none;transform:rotate(0);}' +
        '.spk-baum-leaf.spk-new{animation:none;}}';
    (d.head || d.documentElement).appendChild(s);
  }

  // ── Form je Etappe ───────────────────────────────────────────────
  var FORM = {
    samen: {
      trunk: 'M100 212 Q98 190 100 168',
      branches: [],
      canopy: { cx: 100, cy: 162, rx: 14, ry: 16, cap: 4 }
    },
    stamm: {
      trunk: 'M100 212 Q97 175 100 132',
      branches: ['M100 150 Q84 140 74 128', 'M100 142 Q116 132 126 122', 'M100 134 Q100 120 100 112'],
      canopy: { cx: 100, cy: 120, rx: 40, ry: 36, cap: 10 }
    },
    krone: {
      trunk: 'M100 212 Q96 165 100 110',
      branches: ['M100 140 Q78 128 62 112', 'M100 130 Q122 118 138 104',
                 'M100 120 Q86 104 78 88', 'M100 116 Q114 100 124 84', 'M100 110 Q100 92 100 80'],
      canopy: { cx: 100, cy: 96, rx: 56, ry: 50, cap: 20 }
    }
  };

  var LEAF = 'M0 0 C 6 -5 7 -15 0 -22 C -7 -15 -6 -5 0 0 Z';
  var LEAF_COLORS = ['#2d6a4f', '#4f9b73', '#7fb89a'];
  var BARK = '#8b5e3c', BARK2 = '#6b4226', SOIL = '#cdbb9f', SEED = '#5aa97e';

  // deterministische, gleichmäßig gestreute Blatt-Positionen (kein Flackern)
  function leafAnchors(c) {
    var pts = [], n = c.cap, i, a, r, x, y;
    for (i = 0; i < n; i++) {
      a = i * 2.399963;               // goldener Winkel
      r = Math.sqrt((i + 0.6) / n);
      x = c.cx + Math.cos(a) * r * c.rx;
      y = c.cy + Math.sin(a) * r * c.ry;
      pts.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, rot: Math.round(Math.cos(a) * 40) });
    }
    return pts;
  }

  // ── öffentliche API ──────────────────────────────────────────────
  w.spkBaum = function (container, state) {
    if (!container) return;
    ensureStyle();
    var et = (state && state.etappe) || 'samen';
    if (!FORM[et]) et = 'samen';
    var blaetter = Math.max(0, (state && state.blaetter) || 0);
    var prevCount = container.__spkLeafCount || 0;
    var prevEt = container.__spkEt;
    var f = FORM[et];
    var anchors = leafAnchors(f.canopy);
    var show = Math.min(blaetter, anchors.length);

    var branches = f.branches.map(function (dd) {
      return '<path d="' + dd + '" stroke="' + BARK + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
    }).join('');

    var leaves = '', i, p, isNew;
    for (i = 0; i < show; i++) {
      p = anchors[i];
      isNew = (et === prevEt && i >= prevCount) ? ' spk-new' : '';   // nur frische Blätter poppen
      leaves += '<g class="spk-baum-leaf' + isNew + '" transform="translate(' + p.x + ' ' + p.y +
        ') rotate(' + p.rot + ') scale(0.92)" style="animation-delay:' + Math.max(0, (i - prevCount) * 60) + 'ms">' +
        '<path d="' + LEAF + '" fill="' + LEAF_COLORS[i % 3] + '"/></g>';
    }

    // Keimling trägt immer zwei Keimblätter (auch ohne Sitzung)
    var seedLeaves = (et === 'samen') ?
        '<g transform="translate(90 160) rotate(-35) scale(0.9)"><path d="' + LEAF + '" fill="' + SEED + '"/></g>' +
        '<g transform="translate(110 158) rotate(35) scale(0.9)"><path d="' + LEAF + '" fill="' + SEED + '"/></g>' : '';

    container.innerHTML =
      '<svg class="spk-baum-svg" viewBox="0 0 200 240" role="img" aria-label="Dein wachsender Baum">' +
        '<ellipse cx="100" cy="216" rx="46" ry="9" fill="' + SOIL + '"/>' +
        '<path d="' + f.trunk + '" stroke="' + BARK2 + '" stroke-width="7" fill="none" stroke-linecap="round"/>' +
        '<g class="spk-baum-crown">' + branches + seedLeaves + leaves + '</g>' +
      '</svg>';

    container.__spkLeafCount = blaetter;
    container.__spkEt = et;
  };

})(window, document);
