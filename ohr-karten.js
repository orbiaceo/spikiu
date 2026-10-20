/* ═══════════════════════════════════════════════════════════════════
   ohr-karten.js — das „Feines Ohr"-Design als Motor (Spikiu) · 19.10.2026
   Leo, 18.10.: „Feines Ohr … Das Design ist perfekt und simple, das Auge erfasst
   alles mit einem Blick … das ausbalancierte Auffüllen des ganzen Bildschirms."
   Vorlage: prototyp-gespraech-ohr.html. Genutzt von gefuehrt.html (und später
   dem Freien Gespräch). 0 Token, kein Netz.

   Eine Karte = Aufgabe · (großer gelber Knopf) · Kacheln, die den Rest füllen ·
   Rückmeldezeile; darunter (außerhalb der Karte) zwei Knöpfe.

   REGELN (Leo, 18.10.):
   - 2×2 nur für Bilder und kurze Wörter; Sätze stehen als breite Zeilen untereinander.
   - Jede Kachel passt ihre Schrift selbst an (bis 85 %, Leo 19.10.: „man braucht eine Lupe“ — vorher 55 %) und beobachtet ihre Größe;
     zu eng → Umschrift fällt weg; letzte Stufe: Kachel wächst, Karte rollt innen.
     Text wird NIE abgeschnitten, nichts überlappt.
   - Entdecken: jedes Bild selbst antippen (kein „Alle anhören").

   API (window.OhrKarten):
     karte(host)                           → leere Karte in host (ersetzt Inhalt)
     task(k, text, klein)                  → Aufgabenzeile
     big(k, label, fn, {mic})              → großer gelber Knopf
     blase(k, {z, lang, tr, trLabel, capy, mini})  → Spikius Sprechblase
     raster(k, art)                        → art: 'bilder' (2×2) | 'liste' (4 Zeilen) | 'zwei' | 'drei'
     fb(k, html, soft)                     → Rückmeldezeile
     entdecken(k, items, o)                → 4 Dinge zum Antippen (o.sprich, o.fertig, o.zaehler, o.done)
     runde(k, o)                           → Hören → eine von vier (o.kacheln, o.richtig, o.auto, o.liste, o.fertig, o.sprich)
     fuss(host, links, rechts)             → zwei Knöpfe {t, go, pri, aus, id}
     klang(ok) · fit(g) · esc(s) · mischen(a)
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  if (w.OhrKarten) return;

  var CSS = ''
  + '.oh-karte{flex:1;min-height:0;background:#fff;border:2.5px solid var(--ink,#15163a);border-radius:22px;box-shadow:4px 5px 0 var(--ink,#15163a);padding:16px 14px 10px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;overflow-y:auto;color:var(--ink,#15163a)}'
  + '.oh-task{font:500 1.12rem/1.35 "Lora",Georgia,serif;margin:0;text-wrap:balance;max-width:26rem}'
  + '.oh-task small{display:block;font:600 .82rem/1.3 "DM Sans",system-ui,sans-serif;color:var(--muted,#5f7068);margin-top:4px}'
  + '.oh-big{flex:0 0 auto;background:#ffd24a;color:var(--ink,#15163a);border:2.5px solid var(--ink,#15163a);border-radius:100px;box-shadow:3px 4px 0 var(--ink,#15163a);padding:.6rem 1.8rem;font:800 1.18rem "DM Sans",system-ui,sans-serif;cursor:pointer;display:flex;align-items:center;gap:.45rem}'
  + '.oh-big:active,.oh-tile:active,.oh-btn:active{transform:translate(2px,2px);box-shadow:1px 2px 0 var(--ink,#15163a)}'
  + '.oh-zeile{display:flex;gap:10px;align-items:flex-start;text-align:left;width:100%}'
  + '.oh-zeile .oh-cap{flex:0 0 42px;height:42px}.oh-zeile .oh-cap svg{width:100%;height:100%}'
  + '.oh-blase{flex:1;min-width:0;background:#d3eef6;border:2px solid var(--ink,#15163a);border-radius:4px 16px 16px 16px;padding:8px 11px}'
  + '.oh-blase .oh-z{font:600 1.1rem/1.3 "Lora",Georgia,serif}'
  + '.oh-blase .oh-lt{font:500 .78rem/1.3 "DM Mono",ui-monospace,monospace;color:var(--muted,#5f7068);margin-top:2px}'
  + '.oh-blase .oh-uebs{font:600 .82rem/1.3 "DM Sans",system-ui,sans-serif;color:var(--muted,#5f7068);margin-top:3px}'
  + '.oh-blase .oh-uebs button{border:0;background:none;padding:0;font:700 .8rem "DM Sans",sans-serif;color:var(--acc,#1f93b0);cursor:pointer;text-decoration:underline;text-underline-offset:3px}'
  + '.oh-mini{flex:0 0 auto;width:40px;height:40px;border-radius:50%;border:2px solid var(--ink,#15163a);background:var(--acc,#1f93b0);color:#fff;box-shadow:2px 2px 0 var(--ink,#15163a);cursor:pointer;display:grid;place-items:center;font-size:.95rem;align-self:center}'
  + '.oh-lot{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:-4px}'
  + '.oh-lot b{font:700 .62rem "DM Sans",sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:.2rem .5rem;border-radius:999px;border:1.5px solid #dfe6e0;color:#9aa49f}'
  + '.oh-lot b.on{border-color:var(--acc,#1f93b0);color:var(--acc,#1f93b0)}.oh-lot b.ok{border-color:#2f6b3a;color:#2f6b3a}'
  + '.oh-chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}'
  + '.oh-chip{font:800 .85rem "DM Sans",sans-serif;border:2.5px solid var(--ink,#15163a);border-radius:999px;background:#fff;color:var(--ink,#15163a);padding:.35rem .85rem;box-shadow:2px 3px 0 var(--ink,#15163a);cursor:pointer}'
  + '.oh-chip[aria-pressed="true"]{background:var(--ink,#15163a);color:#fff}'
  /* Raster: nach Platz, nicht nach Inhalt (sonst überlappt die Rückmeldezeile) */
  + '.oh-grid{flex:1 1 0;min-height:140px;width:100%;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(2,minmax(64px,1fr));gap:12px}'
  + '.oh-grid.zwei{grid-template-columns:1fr;grid-template-rows:repeat(2,minmax(64px,1fr))}'
  + '.oh-grid.drei{grid-template-columns:1fr;grid-template-rows:repeat(3,minmax(52px,1fr));min-height:180px}'
  + '.oh-grid.liste{grid-template-columns:1fr;grid-template-rows:repeat(4,minmax(44px,1fr));gap:9px;min-height:203px}'
  + '.oh-grid.wachsen{flex:0 0 auto;min-height:auto;grid-template-rows:repeat(2,minmax(min-content,1fr))}'
  + '.oh-grid.liste.wachsen{grid-template-rows:repeat(4,minmax(min-content,1fr))}'
  + '.oh-grid.drei.wachsen{grid-template-rows:repeat(3,minmax(min-content,1fr))}'
  + '.oh-tile{--fs:1;position:relative;min-height:0;min-width:0;background:#fff;border:2.5px solid var(--ink,#15163a);border-radius:18px;box-shadow:3px 4px 0 var(--ink,#15163a);padding:10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;overflow:hidden;color:var(--ink,#15163a);font:inherit}'
  + '.oh-grid.liste .oh-tile{padding:6px 14px;border-radius:16px}'
  + '.oh-tile img{max-width:70%;max-height:72%;width:auto;height:auto;flex:0 1 auto;min-height:0}'
  + '.oh-tile .oh-tz{font:600 calc(clamp(1rem,4.6vw,1.3rem)*var(--fs))/1.25 "Lora",Georgia,serif;text-wrap:balance}'
  + '.oh-grid.liste .oh-tile .oh-tz{font-size:calc(1.15rem*var(--fs))}'
  + '.oh-tile .oh-tn{font:800 calc(clamp(1rem,4.4vw,1.25rem)*var(--fs))/1.2 "DM Sans",system-ui,sans-serif;text-wrap:balance}'
  + '.oh-tile .oh-ts{font:600 calc(.82rem*var(--fs))/1.25 "DM Sans",sans-serif;color:var(--muted,#5f7068)}'
  + '.oh-tile .oh-tl{font:500 calc(.74rem*var(--fs)) "DM Mono",ui-monospace,monospace;color:var(--muted,#5f7068)}'
  + '.oh-tile .oh-tu{font:700 calc(.9rem*var(--fs))/1.2 "DM Sans",sans-serif;color:#2f6b3a}'
  + '.oh-tile .oh-te{font-size:calc(clamp(2rem,10vw,3rem)*var(--fs));line-height:1}'
  + '.oh-tile .oh-perlen{display:flex;gap:4px}.oh-tile .oh-perlen i{width:7px;height:7px;border-radius:50%;background:#dfe6e0}.oh-tile .oh-perlen i.halb{background:#9fc9d6}.oh-tile .oh-perlen i.voll{background:var(--acc,#1f93b0)}'
  + '.oh-tile.oh-vor{border-color:var(--acc,#1f93b0);box-shadow:3px 4px 0 var(--acc,#1f93b0)}'
  + '.oh-tile.oh-vor::before{content:"";position:absolute;top:9px;left:10px;width:9px;height:9px;border-radius:50%;background:var(--acc,#1f93b0)}'
  + '.oh-tile.ok{background:#c7e89a}'
  + '.oh-tile.no{background:#fbf0e0;border-color:#c67a1e;opacity:.62;box-shadow:none}'
  + '.oh-tile.gew{background:#fff6d6}'
  + '.oh-tile[disabled]{cursor:default}'
  + '.oh-tile.eng{padding-top:3px;padding-bottom:3px;gap:2px}.oh-tile.eng .oh-tl{display:none}.oh-tile.eng img{max-height:24%}'
  + '.oh-grid.wachsen .oh-tile img{max-height:40px}'
  /* Entdecken: Bild antippen → hören + Wort, Umschrift, Bedeutung */
  + '.oh-tile.oh-ent .oh-neu{display:none;flex-direction:column;align-items:center;gap:2px}'
  + '.oh-tile.oh-ent.ges .oh-neu{display:flex}'
  + '.oh-tile.oh-ent.ges img{max-height:44%}'
  + '.oh-tile.oh-ent.ges.eng img{max-height:20%}'
  + '.oh-tile.oh-ent.ges{border-color:var(--acc,#1f93b0);box-shadow:3px 4px 0 var(--acc,#1f93b0)}'
  + '.oh-tile.oh-ent.ges::after{content:"✓";position:absolute;top:6px;right:9px;font:800 .9rem "DM Sans",sans-serif;color:var(--acc,#1f93b0)}'
  + '.oh-fb{flex:0 0 auto;min-height:2.6em;display:flex;align-items:center;justify-content:center;font:700 1.02rem/1.3 "DM Sans",system-ui,sans-serif;color:#2f6b3a;text-wrap:balance}'
  + '.oh-fb em{font:600 1.08rem "Lora",Georgia,serif;font-style:normal}'
  + '.oh-fb.soft{color:#c67a1e}.oh-fb .oh-leise{color:var(--muted,#5f7068);font-weight:600}'
  + '.oh-fb .oh-lt{font:500 .78rem "DM Mono",ui-monospace,monospace;color:var(--muted,#5f7068);margin-left:6px}'
  + '.oh-fuss{flex:0 0 auto;display:flex;justify-content:space-between;gap:12px;padding:12px 0 calc(12px + env(safe-area-inset-bottom,0px))}'
  + '.oh-btn{border:2.5px solid var(--ink,#15163a);border-radius:100px;box-shadow:3px 4px 0 var(--ink,#15163a);padding:.7rem 1.25rem;font:800 1rem "DM Sans",system-ui,sans-serif;background:#fff;color:var(--ink,#15163a);cursor:pointer;white-space:nowrap}'
  + '.oh-btn.pri{background:var(--acc,#1f93b0);color:#fff}'
  + '.oh-btn[disabled]{opacity:.38;box-shadow:none;cursor:default}'
  + '.oh-karte :focus-visible,.oh-fuss :focus-visible{outline:3px solid var(--acc,#1f93b0);outline-offset:2px}'
  + '@media (max-height:720px){.oh-karte{gap:9px;padding:12px 12px 8px}.oh-tile .oh-ts{display:none}.oh-tile .oh-te{font-size:2rem}.oh-tile img{max-height:62%}'
  + '.oh-task{font-size:1.0625rem}.oh-task small{display:none}.oh-big{padding:.5rem 1.5rem;font-size:1.06rem}.oh-fb{min-height:2.3em;font-size:.95rem}.oh-blase .oh-z{font-size:1.0625rem}'
  + '.oh-lot b{padding:.12rem .4rem;font-size:.56rem}.oh-tile.oh-ent.ges img{max-height:26%}.oh-tile.oh-ent{padding:6px;gap:3px}.oh-tile.oh-ent .oh-neu{gap:0}'
  + '.oh-tile.oh-ent.ges .oh-tz{font-size:calc(.98rem*var(--fs));line-height:1.15}}'
  + '@media (prefers-reduced-motion:no-preference){.oh-pop{animation:ohPop .3s ease-out both}@keyframes ohPop{0%{transform:scale(.96)}60%{transform:scale(1.02)}100%{transform:none}}}';

  function css() { if (document.getElementById('oh-css')) return; var s = document.createElement('style'); s.id = 'oh-css'; s.textContent = CSS; document.head.appendChild(s); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mischen(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  var KL = null;
  function klang(ok) {
    try {
      KL = KL || new (w.AudioContext || w.webkitAudioContext)(); var t = KL.currentTime, f = ok ? [523.25, 659.25, 783.99] : [392, 466.16];
      f.forEach(function (fr, i) { var o = KL.createOscillator(), g = KL.createGain(); o.type = 'sine'; o.frequency.value = fr; g.gain.setValueAtTime(0, t + i * .07); g.gain.linearRampToValueAtTime(.12, t + i * .07 + .02); g.gain.exponentialRampToValueAtTime(.001, t + i * .07 + .35); o.connect(g); g.connect(KL.destination); o.start(t + i * .07); o.stop(t + i * .07 + .4); });
    } catch (e) {}
  }

  /* ── Einpassen: Schrift kleiner, dann Umschrift weg, dann Kachel wachsen lassen ── */
  function zuEng(t) { return t.scrollHeight > t.clientHeight + 1 || t.scrollWidth > t.clientWidth + 1; }
  function fit(g) {
    if (!g || !g.isConnected) return;
    g.classList.remove('wachsen'); var rest = false;
    g.querySelectorAll('.oh-tile').forEach(function (t) {
      t.classList.remove('eng'); t.style.setProperty('--fs', '1'); var f = 1;
      while (f > .9 && zuEng(t)) { f -= .05; t.style.setProperty('--fs', f.toFixed(2)); }
      if (zuEng(t)) { t.classList.add('eng'); f = Math.min(f + .15, 1); t.style.setProperty('--fs', f.toFixed(2)); while (f > .9 && zuEng(t)) { f -= .05; t.style.setProperty('--fs', f.toFixed(2)); } }
      if (zuEng(t)) rest = true;
    });
    if (rest) g.classList.add('wachsen');
  }
  function fitBeobachten(g) {
    requestAnimationFrame(function () { fit(g); });
    if (w.ResizeObserver) { var h = null; new ResizeObserver(function () { if (h) return; h = requestAnimationFrame(function () { h = null; fit(g); }); }).observe(g); }
    else w.addEventListener('resize', function () { fit(g); });
  }

  /* ── Bausteine ── */
  function karte(host) {
    css(); host.innerHTML = '';
    var k = el('section', 'oh-karte oh-pop'); k.setAttribute('aria-live', 'polite'); host.appendChild(k); return k;
  }
  function task(k, text, klein) { var p = el('p', 'oh-task', esc(text) + (klein ? '<small>' + esc(klein) + '</small>' : '')); k.appendChild(p); return p; }
  function big(k, label, fn, o) { var b = el('button', 'oh-big', esc(label)); b.type = 'button'; b.id = (o && o.id) || 'oh-big'; b.onclick = fn; k.appendChild(b); return b; }
  function blase(k, o) {
    var z = el('div', 'oh-zeile');
    z.innerHTML = (o.capy ? '<span class="oh-cap">' + o.capy + '</span>' : '')
      + '<div class="oh-blase"><div class="oh-z"' + (o.lang ? ' lang="' + o.lang + '"' : '') + '>' + esc(o.z) + '</div>'
      + (o.lt ? '<div class="oh-lt">' + esc(o.lt) + '</div>' : '')
      + (o.tr ? '<div class="oh-uebs">' + (o.trOffen ? esc(o.tr) : '<button type="button" class="oh-ueb">' + esc(o.trLabel || 'Übersetzung') + '</button>') + '</div>' : '')
      + '</div>';
    if (o.mini) { var m = el('button', 'oh-mini', '🔊'); m.type = 'button'; m.setAttribute('aria-label', o.mini.label || ''); m.onclick = o.mini.fn; z.appendChild(m); }
    k.appendChild(z);
    var u = z.querySelector('.oh-ueb'); if (u) u.onclick = function () { u.parentNode.textContent = o.tr; };
    return z;
  }
  function raster(k, art) { var g = el('div', 'oh-grid' + (art && art !== 'bilder' ? ' ' + art : '')); k.appendChild(g); fitBeobachten(g); return g; }
  function fb(k, html, soft) { var f = el('div', 'oh-fb' + (soft ? ' soft' : ''), html || ''); k.appendChild(f); return f; }
  function lot(k, eintraege) { var d = el('div', 'oh-lot', eintraege.map(function (e) { return '<b class="' + (e.c || '') + '">' + esc(e.t) + '</b>'; }).join('')); k.appendChild(d); return d; }
  function fuss(host, links, rechts) {
    var f = host; f.innerHTML = ''; f.classList.add('oh-fuss');
    [links, rechts].forEach(function (x, i) {
      if (!x) { f.appendChild(el('span')); return; }
      var b = el('button', 'oh-btn' + (x.pri ? ' pri' : ''), esc(x.t)); b.type = 'button'; b.id = x.id || (i ? 'oh-rechts' : 'oh-links');
      if (x.aus) b.disabled = true; b.onclick = x.go; f.appendChild(b);
    });
    return f;
  }

  /* Entdecken: vier Dinge (Bild oder Satz). Antippen = klingt + Wort/Umschrift/Bedeutung.
     o.sprich(z) · o.zaehler(n,ges) → html · o.alleGehoert() · o.fertigText · o.art ('bilder'|'liste') */
  function entdecken(k, items, o) {
    var satz = o.art ? o.art === 'liste' : !items[0].bild, g = raster(k, satz ? 'liste' : 'bilder'), f = fb(k), ges = {};   // o.art: 'bilder' | 'liste' (Wörter ohne Bild trotzdem 2×2, Leo 20.10.)
    f.innerHTML = '<span class="oh-leise">' + (o.zaehler ? o.zaehler(0, items.length) : '0 / ' + items.length) + '</span>';
    items.forEach(function (x, n) {
      var b = el('button', 'oh-tile oh-ent',
        (x.bild ? '<img src="' + esc(x.bild) + '" alt="' + esc(x.tr || '') + '">' : '<span class="oh-tz"' + (o.lang ? ' lang="' + o.lang + '"' : '') + '>' + esc(x.z) + '</span>')
        + '<span class="oh-neu">' + (x.bild ? '<span class="oh-tz"' + (o.lang ? ' lang="' + o.lang + '"' : '') + '>' + esc(x.z) + '</span>' : '')
        + (x.lt ? '<span class="oh-tl">' + esc(x.lt) + '</span>' : '') + (x.tr ? '<span class="oh-tu">' + esc(x.tr) + '</span>' : '') + '</span>');
      b.type = 'button'; b.id = 'oh-e-' + n; g.appendChild(b);
      if (x.bild) { var im = b.querySelector('img'); im.onerror = function () { im.remove(); }; }
      b.onclick = function () {
        if (o.sprich) o.sprich(x.z);
        b.classList.add('ges'); ges[n] = 1; fit(g);
        var z = Object.keys(ges).length;
        f.className = 'oh-fb';
        f.innerHTML = '<span><em>' + esc(x.z) + '</em>' + (x.tr ? ' = ' + esc(x.tr) : '') + (x.lt ? '<span class="oh-lt">' + esc(x.lt) + '</span>' : '') + '</span>';
        if (z === items.length && !g.dataset.alle) { g.dataset.alle = '1'; if (o.alleGehoert) o.alleGehoert(); }
      };
    });
    return { grid: g, fb: f };
  }

  /* Eine Ohr-Runde: hören → eine von vier Kacheln.
     o.kacheln:[{ok, html, falsch}] · o.richtig (html) · o.auto (Text, wird vorgesprochen) ·
     o.dannSprich · o.liste · o.fertig(sauber) · o.sprich */
  function runde(k, o) {
    var g = raster(k, o.liste ? 'liste' : 'bilder'), f = fb(k, o.leise ? '<span class="oh-leise">' + o.leise + '</span>' : ''), fertig = false, fehler = 0;
    mischen(o.kacheln).forEach(function (x, n) {
      var b = el('button', 'oh-tile', x.html); b.type = 'button'; b.id = 'oh-t-' + n; if (x.ok) b.dataset.r = '1'; g.appendChild(b);
      var im = b.querySelector('img'); if (im) im.onerror = function () { im.remove(); };
      b.onclick = function () {
        if (fertig) return;
        if (x.ok) {
          fertig = true; b.classList.add('ok'); klang(true); f.className = 'oh-fb'; f.innerHTML = o.richtig || '';
          if (o.dannSprich && o.sprich) setTimeout(function () { o.sprich(o.dannSprich); }, 350);
          if (o.fertig) o.fertig(fehler === 0);
        } else {
          fehler++; klang(false); b.classList.add('no'); b.disabled = true; f.className = 'oh-fb soft'; f.innerHTML = x.falsch || '';
        }
      };
    });
    if (o.auto && o.sprich) setTimeout(function () { o.sprich(o.auto); }, 380);
    return { grid: g, fb: f };
  }

  w.OhrKarten = { css: css, karte: karte, task: task, big: big, blase: blase, raster: raster, fb: fb, lot: lot, fuss: fuss,
    entdecken: entdecken, runde: runde, klang: klang, fit: fit, esc: esc, mischen: mischen, el: el };
})(window);
