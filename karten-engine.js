/* ═══════════════════════════════════════════════════════════════════════
   karten-engine.js — DIE eine Layout-Engine für Karten-Inhalte.

   PRINZIP (Leo, 14.08.2026): Inhalt (A) und Layout sind strikt getrennt.
   Inhalt ist ein reines Datenobjekt mit einem `typ`. Die Engine rendert
   jeden Typ IMMER korrekt — neue Inhalte brauchen NIE Layout-Arbeit.

   REGELN DER ENGINE (gelten für jede Karte):
   1. Design-Größe ist die OBERGRENZE (--scale ≤ 1). Nie vergrößern —
      nur schrumpfen, wenn der Inhalt überläuft (Bisektion, min 0.45).
   2. HIERARCHIE: Zielsprache = der Star (Lora, groß). Anweisungen in
      der Muttersprache = Chrome (DM Sans, bescheiden).
   3. Chrome (Eyebrow, Audio-Knopf 56px, Fußzeile, Abstände) skaliert NIE.
   4. Die Fußzeile (Feedback + Knopf) ist ein fester Bereich — sie kann
      nie abgeschnitten werden und nie mit dem Inhalt kollidieren.
   5. Feedback: richtig = grün, falsch = sanftes Orange. Nie Rot/Pink.

   API:
     SpikiuKarten.setup({ stage: HTMLElement, zielsprache: 'es', sprich: fn })
     SpikiuKarten.render(item, next)          → eine Karte zeigen
     SpikiuKarten.sequence(items, onDone)     → Karten nacheinander
     Item-Typen: 'flip' · 'choice' · 'roleplay' · 'lesson' · 'note' · 'erklaerung'

   AUDIO-GESETZ (17.08.2026, nach dem Piper-Mischmasch-Bug):
   Eine Zeile trägt genau EINE Sprache. audioBtn() bekommt ausschliesslich
   Zielsprach-Text. Umschrift und Muttersprache erreichen die Sprachausgabe
   auf keinem Pfad — das wird hier erzwungen, nicht im Prompt erbeten.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.SpikiuKarten) return;

  /* ── Engine-CSS: einmal injiziert. Nutzt die Seiten-Tokens (--ink usw.),
        mit Fallbacks, damit die Engine überall alleine stehen kann. ── */
  var CSS = ''
    + '.spk-card{position:absolute;inset:.8rem .85rem 1.1rem;display:flex;flex-direction:column;'
    + 'background:#fff;border:var(--ow,2.5px) solid var(--ink,#15163a);border-radius:22px;'
    + 'box-shadow:5px 6px 0 var(--ink,#15163a);overflow:hidden;--scale:1}'
    + '.spk-body{flex:1 1 auto;min-height:0;overflow-y:auto;display:flex;flex-direction:column;'
    + 'align-items:center;justify-content:center;gap:1rem;padding:1.4rem 1.3rem;text-align:center}'
    + '.spk-eyebrow{flex:0 0 auto;display:flex;align-items:center;gap:.4rem;justify-content:center;'
    + 'font:800 .68rem "DM Sans",sans-serif;letter-spacing:.04em;text-transform:uppercase;color:var(--ink,#15163a);opacity:.62}'
    /* Der Knopf muss in JEDEM Flex-Kontext ein Kreis bleiben. Ohne box-sizing
       und Unter-/Obergrenzen wurde er breitgezogen und border-radius:50%
       machte daraus ein Ei (gesehen 18.08.2026 in gefuehrt.html). */
    + '.spk-audio{box-sizing:border-box;width:56px;height:56px;min-width:56px;max-width:56px;'
    + 'min-height:56px;max-height:56px;aspect-ratio:1;flex:0 0 auto;padding:0;'
    + 'border-radius:50%;border:var(--ow,2.5px) solid var(--ink,#15163a);'
    + 'background:var(--acc,#1f93b0);color:#fff;box-shadow:4px 4px 0 var(--ink,#15163a);'
    + 'display:flex;align-items:center;justify-content:center;cursor:pointer;align-self:center}'
    + '.spk-audio svg{width:22px;height:22px;flex:0 0 auto}'
    + '.spk-audio:active{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--ink,#15163a)}'
    + '.spk-ziel{font-family:"Lora",serif;font-weight:600;font-size:calc(2.3rem*var(--scale));line-height:1.26;color:var(--ink,#15163a)}'
    + '.spk-nativ{font-family:"DM Sans",sans-serif;font-weight:800;font-size:calc(1.55rem*var(--scale));line-height:1.24;color:var(--ink,#15163a)}'
    + '.spk-sub{font-family:"DM Sans",sans-serif;font-weight:600;font-size:calc(1.02rem*var(--scale));line-height:1.4;color:var(--muted,#5f7068)}'
    + '.spk-instr{font-family:"DM Sans",sans-serif;font-weight:700;font-size:calc(1.05rem*var(--scale));line-height:1.35;color:var(--ink,#15163a);opacity:.75}'
    + '.spk-opts{display:flex;flex-direction:column;gap:.6rem;width:100%}'
    + '.spk-opts.chips{flex-direction:row;flex-wrap:wrap;justify-content:center}'
    + '.spk-opt{font-family:"DM Sans",sans-serif;font-weight:700;font-size:calc(1.12rem*var(--scale));line-height:1.3;'
    + 'color:var(--ink,#15163a);background:#fff;border:2px solid var(--ink,#15163a);border-radius:16px;'
    + 'padding:.7rem .95rem;text-align:center;cursor:pointer}'
    + '.spk-opts.chips .spk-opt{border-radius:100px;padding:.55rem 1rem}'
    + '.spk-opt.ziel{font-family:"Lora",serif;font-weight:600;font-size:calc(1.5rem*var(--scale))}'
    + '.spk-opt.picked{outline:3px solid var(--ink,#15163a)}'
    + '.spk-opt.correct{background:#e8f5ee;border-color:var(--acc,#1f93b0);color:var(--acc,#1f93b0)}'
    + '.spk-opt.wrong{background:#fbf0e0;border-color:#c67a1e;color:#c67a1e}'
    + '.spk-opt.dim{opacity:.5}'
    + '.spk-flip{width:100%;flex:1 1 auto;min-height:9rem;perspective:1200px;cursor:pointer}'
    + '.spk-flip-in{position:relative;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}'
    + '.spk-flip.flipped .spk-flip-in{transform:rotateY(180deg)}'
    + '.spk-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;'
    + 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8rem}'
    + '.spk-face.back{transform:rotateY(180deg)}'
    + '.spk-hint{font:700 .8rem "DM Sans",sans-serif;color:var(--muted,#5f7068);opacity:.75}'
    /* Der Fuss reserviert den Platz fuer die Rueckmeldung von Anfang an.
       Vorher hatte .spk-feedback min-height:0, wuchs erst beim Pruefen und
       der Weiter-Knopf legte sich ueber das Wort „Richtig!". */
    + '.spk-foot{position:relative;z-index:2;background:#fff;flex:0 0 auto;display:flex;'
    + 'flex-direction:column;align-items:center;gap:.6rem;'
    + 'padding:.6rem 1.2rem 1rem;border-top:2px solid #eef1ee}'
    + '.spk-feedback{font:800 .95rem/1.35 "DM Sans",sans-serif;min-height:1.35rem;'
    + 'display:flex;align-items:center;justify-content:center;text-align:center}'
    + '.spk-feedback.ok{color:var(--acc,#1f93b0)}'
    + '.spk-feedback.no{color:var(--ink,#15163a);background:#ffd24a;border:2px solid var(--ink,#15163a);'
    + 'border-radius:999px;padding:.4rem .95rem;box-shadow:2px 2px 0 var(--ink,#15163a);display:inline-block}'
    + '.spk-btn{width:100%;max-width:280px;background:var(--acc,#1f93b0);color:#fff;'
    + 'border:var(--ow,2.5px) solid var(--ink,#15163a);box-shadow:4px 4px 0 var(--ink,#15163a);'
    + 'border-radius:100px;padding:.85rem 2rem;font:700 1rem "DM Sans",sans-serif;cursor:pointer}'
    + '.spk-btn:active{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--ink,#15163a)}'
    + '.spk-btn.ghost{background:#fff;color:var(--ink,#15163a)}'
    + '.spk-doc{width:100%;text-align:left;display:flex;flex-direction:column;gap:1rem}'
    + '.spk-doc h3{font:800 1.3rem "DM Sans",sans-serif;color:var(--ink,#15163a)}'
    + '.spk-doc .lbl{font:800 .68rem "DM Sans",sans-serif;letter-spacing:.04em;text-transform:uppercase;'
    + 'color:var(--acc,#1f93b0);margin-bottom:.35rem}'
    + '.spk-doc .vrow{display:flex;justify-content:space-between;gap:.6rem;padding:.35rem 0;'
    + 'border-bottom:1px solid #eef1ee;font-family:"Lora",serif}'
    + '.spk-doc .vrow b{font-weight:700}'
    + '.spk-doc .vrow span{color:var(--muted,#5f7068);font-family:"DM Sans",sans-serif;font-size:.88rem}'
    + '.spk-doc .dial{font:600 .95rem/1.5 "DM Sans",sans-serif;color:var(--ink,#15163a);margin-bottom:.15rem}'
    + '.spk-doc .dial small{display:block;color:var(--muted,#5f7068);font-weight:500;font-size:.82rem}'
    + '.spk-doc .quizq{font:700 .95rem "DM Sans",sans-serif;margin-bottom:.4rem}'
    + '.spk-note-emoji{font-size:3rem}'
    + '.spk-note-title{font:800 1.5rem "DM Sans",sans-serif;color:var(--ink,#15163a)}'
    + '.spk-note-sub{font:500 1rem/1.45 "DM Sans",sans-serif;color:var(--muted,#5f7068);max-width:28ch}'
    /* ── Erklärkarte (Typ 'erklaerung'). GESETZ: eine Zeile = eine Sprache.
          Audio hängt NUR an Zielsprach-Zeilen; Umschrift und Muttersprache
          bekommen strukturell keinen Knopf. ── */
    + '.spk-audio.mini{width:38px;height:38px;flex:0 0 38px;box-shadow:3px 3px 0 var(--ink,#15163a)}'
    + '.spk-audio.mini svg{width:16px;height:16px}'
    + '.spk-um{font-family:"DM Sans",sans-serif;font-weight:600;font-style:italic;'
    + 'font-size:calc(1rem*var(--scale));line-height:1.3;color:var(--muted,#5f7068)}'
    + '.spk-erk-hr{width:100%;height:2px;background:#eef1ee;border:0;margin:.1rem 0}'
    + '.spk-erk-box{width:100%;background:#f7faf8;border:2px solid #eef1ee;border-radius:14px;'
    + 'padding:.6rem .75rem;display:flex;flex-direction:column;gap:.35rem;text-align:left}'
    + '.spk-erk-zeile{display:flex;align-items:center;gap:.65rem;width:100%}'
    + '.spk-sp{display:flex;flex-direction:column;gap:.05rem;min-width:0;flex:1}'
    + '.spk-glied{display:flex;align-items:center;gap:.6rem;width:100%;padding:.32rem 0;'
    + 'border-bottom:1px solid #eef1ee;text-align:left}'
    + '.spk-glied:last-child{border-bottom:0}'
    + '.spk-glied-z{font-family:"Lora",serif;font-weight:600;font-size:calc(1.2rem*var(--scale));color:var(--ink,#15163a)}'
    + '.spk-glied-um{font-family:"DM Sans",sans-serif;font-weight:500;font-style:italic;'
    + 'font-size:calc(.82rem*var(--scale));color:var(--muted,#5f7068)}'
    + '.spk-glied-na{font-family:"DM Sans",sans-serif;font-weight:600;font-size:calc(.95rem*var(--scale));'
    + 'color:var(--muted,#5f7068);text-align:right;margin-left:auto}'
    + '.spk-punkte{display:flex;gap:.35rem;justify-content:center;padding-top:.15rem}'
    + '.spk-punkt{width:8px;height:8px;border-radius:50%;background:var(--ink,#15163a);opacity:.22}'
    + '.spk-punkt.an{opacity:1}'
    + '@keyframes spkFromRight{from{transform:translateX(60%);opacity:0}to{transform:none;opacity:1}}'
    + '@keyframes spkFromLeft{from{transform:translateX(-60%);opacity:0}to{transform:none;opacity:1}}'
    + '.spk-card.from-right{animation:spkFromRight .32s cubic-bezier(.4,0,.2,1)}'
    + '.spk-card.from-left{animation:spkFromLeft .32s cubic-bezier(.4,0,.2,1)}';

  function injectCSS() {
    if (document.getElementById('spkKartenCSS')) return;
    var st = document.createElement('style');
    st.id = 'spkKartenCSS';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  var SVG_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12z"/></svg>';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function el(tag, cls, html) { var d = document.createElement(tag); if (cls) d.className = cls; if (html != null) d.innerHTML = html; return d; }

  var CFG = { stage: null, zielsprache: 'es', sprich: null };
  var CUR = null;

  /* ── Regel 1: Skala deckeln, nur bei Überlauf schrumpfen. ── */
  function fitCard(card) {
    var body = card.querySelector('.spk-body');
    if (!body) return;
    card.style.setProperty('--scale', '1');
    if (body.scrollHeight <= body.clientHeight + 1) return;
    var lo = 0.45, hi = 1, i, mid;
    for (i = 0; i < 10; i++) {
      mid = (lo + hi) / 2;
      card.style.setProperty('--scale', mid.toFixed(3));
      if (body.scrollHeight <= body.clientHeight + 1) lo = mid; else hi = mid;
    }
    card.style.setProperty('--scale', lo.toFixed(3));
  }

  function audioBtn(text) {
    var b = el('button', 'spk-audio', SVG_PLAY);
    b.type = 'button';
    b.setAttribute('aria-label', 'Anhören');
    b.onclick = function (e) {
      e.stopPropagation();
      try {
        if (CFG.sprich) { CFG.sprich(text, CFG.zielsprache); return; }
        if (window.sprich) { window.sprich(text, CFG.zielsprache); return; }
        if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
          var u = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
        }
      } catch (err) { /* Audio darf nie den Fluss brechen */ }
    };
    return b;
  }

  function textNode(text, ziel, sub) {
    return el('div', sub ? 'spk-sub' : (ziel ? 'spk-ziel' : 'spk-nativ'), esc(text));
  }

  function buildFrame() {
    var card = el('div', 'spk-card');
    var body = el('div', 'spk-body');
    var foot = el('div', 'spk-foot');
    foot.innerHTML = '<div class="spk-feedback"></div>';
    card.appendChild(body); card.appendChild(foot);
    var F = { card: card, body: body, foot: foot, feedback: foot.querySelector('.spk-feedback') };
    /* Swipe-Meta: Wisch links = weiter (nur wenn erlaubt), Wisch rechts = zurück. */
    F.swipe = { canNext: false, nextFn: null, backFn: null };
    F.armNext = function (fn) { F.swipe.canNext = true; F.swipe.nextFn = fn; };
    return F;
  }
  function bindSwipe(F) {
    var sx = 0, sy = 0, live = false;
    function go(dx, dy) {
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) { if (F.swipe.canNext && F.swipe.nextFn) F.swipe.nextFn(); }
      else { if (F.swipe.backFn) F.swipe.backFn(); }
    }
    F.card.addEventListener('touchstart', function (e) {
      if (!e.touches || !e.touches.length) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; live = true;
    }, { passive: true });
    F.card.addEventListener('touchend', function (e) {
      if (!live || !e.changedTouches || !e.changedTouches.length) return;
      live = false;
      go(e.changedTouches[0].clientX - sx, e.changedTouches[0].clientY - sy);
    }, { passive: true });
    F.card.__spkSwipe = { go: go, meta: F.swipe };   /* testbar */
  }
  function footButton(F, label, cls, fn) {
    var old = F.foot.querySelector('.spk-btn'); if (old) old.remove();
    var b = el('button', 'spk-btn' + (cls ? ' ' + cls : ''), esc(label));
    b.type = 'button'; b.onclick = fn;
    F.foot.appendChild(b);
    return b;
  }

  /* ── Renderer pro Typ ─────────────────────────────────────────────── */
  var RENDER = {

    /* flip: { typ:'flip', eyebrow?, front:{text, ziel?, audio?, hint?}, back:{text, ziel?, audio?, sub?} } */
    flip: function (item, F, next) {
      if (item.eyebrow) F.body.appendChild(el('div', 'spk-eyebrow', esc(item.eyebrow)));
      var zone = el('div', 'spk-flip');
      var inner = el('div', 'spk-flip-in');
      function face(side, cls) {
        var f = el('div', 'spk-face' + (cls ? ' ' + cls : ''));
        if (side.audio) f.appendChild(audioBtn(side.audioText || side.text));
        f.appendChild(textNode(side.text, side.ziel !== false, false));
        if (side.sub) f.appendChild(textNode(side.sub, false, true));
        f.appendChild(el('div', 'spk-hint', esc(side.hint || 'tippen zum Umdrehen')));
        return f;
      }
      inner.appendChild(face(item.front, ''));
      inner.appendChild(face(item.back, 'back'));
      zone.appendChild(inner);
      F.body.appendChild(zone);
      zone.addEventListener('click', function (e) {
        if (e.target.closest('.spk-audio')) return;
        zone.classList.toggle('flipped');
      });
      footButton(F, item.weiter || 'Weiter', '', next);
      F.armNext(next);
    },

    /* choice: { typ:'choice', eyebrow?, audio?, instr, options:[{text, ok}], multi?, optsZiel?, pruefen?, weiter? } */
    choice: function (item, F, next) {
      if (item.eyebrow) F.body.appendChild(el('div', 'spk-eyebrow', '🎧 ' + esc(item.eyebrow)));
      if (item.audio) F.body.appendChild(audioBtn(item.audio));
      F.body.appendChild(el('div', 'spk-instr', esc(item.instr)));
      var chips = item.options.length >= 4 && item.options.every(function (o) { return String(o.text).split(' ').length <= 2; });
      var list = el('div', 'spk-opts' + (chips ? ' chips' : ''));
      var chosen = [];
      item.options.forEach(function (o) {
        var b = el('button', 'spk-opt' + (item.optsZiel ? ' ziel' : ''), esc(o.text));
        b.type = 'button';
        b.onclick = function () {
          if (b.hasAttribute('data-locked')) return;
          if (item.multi) {
            var on = b.classList.toggle('picked');
            if (on) chosen.push(o); else chosen = chosen.filter(function (x) { return x !== o; });
          } else {
            chosen = [o];
            list.querySelectorAll('.spk-opt').forEach(function (x) { x.classList.remove('picked'); });
            b.classList.add('picked');
          }
        };
        list.appendChild(b);
      });
      F.body.appendChild(list);
      footButton(F, item.pruefen || 'Prüfen', '', function () {
        var okAll = item.options.filter(function (o) { return o.ok; });
        var ok = chosen.length === okAll.length && chosen.every(function (c) { return c.ok; });
        var k = 0;
        list.querySelectorAll('.spk-opt').forEach(function (b) {
          var o = item.options[k++];
          b.setAttribute('data-locked', '1');
          b.classList.remove('picked');
          if (o.ok) b.classList.add('correct');
          else if (chosen.indexOf(o) !== -1) b.classList.add('wrong');
          else b.classList.add('dim');
        });
        F.feedback.textContent = ok ? (item.richtig || 'Richtig!') : (item.fast || 'Fast — schau dir die richtige Antwort an.');
        F.feedback.className = 'spk-feedback ' + (ok ? 'ok' : 'no');
        footButton(F, item.weiter || 'Weiter', '', next);
        F.armNext(next);
        fitCard(F.card);
      });
    },

    /* roleplay: { typ:'roleplay', eyebrow, ziel, trans?, tip?, options:[{text, ok}], weiter? } */
    roleplay: function (item, F, next) {
      F.body.appendChild(el('div', 'spk-eyebrow', '🎭 ' + esc(item.eyebrow)));
      F.body.appendChild(audioBtn(item.ziel));
      F.body.appendChild(textNode(item.ziel, true, false));
      if (item.trans) F.body.appendChild(textNode(item.trans, false, true));
      if (item.tip) F.body.appendChild(el('div', 'spk-instr', '💬 ' + esc(item.tip)));
      var list = el('div', 'spk-opts');
      var opts = shuffle(item.options);
      opts.forEach(function (o, idx) {
        var b = el('button', 'spk-opt ziel', esc(o.text));
        b.type = 'button';
        b.onclick = function () {
          if (b.hasAttribute('data-locked')) return;
          list.querySelectorAll('.spk-opt').forEach(function (x) { x.setAttribute('data-locked', '1'); });
          if (o.ok) { b.classList.add('correct'); }
          else {
            b.classList.add('wrong');
            list.querySelectorAll('.spk-opt').forEach(function (x, j) { if (opts[j].ok) x.classList.add('correct'); });
          }
          footButton(F, item.weiter || 'Weiter', '', next);
          F.armNext(next);
          fitCard(F.card);
        };
        list.appendChild(b);
      });
      F.body.appendChild(list);
    },

    /* lesson: { typ:'lesson', ...gleiches Objekt wie lektionen.html/api } */
    lesson: function (item, F, next) {
      F.body.style.alignItems = 'stretch'; F.body.style.textAlign = 'left'; F.body.style.justifyContent = 'flex-start';
      var d = el('div', 'spk-doc');
      var vocabHtml = (item.vocab || []).map(function (v) { return '<div class="vrow"><b>' + esc(v.word) + '</b><span>' + esc(v.translation) + '</span></div>'; }).join('');
      var dialHtml = (item.dialogue || []).map(function (x) { return '<div class="dial"><b>' + esc(x.speaker) + ':</b> ' + esc(x.text) + (x.translation ? '<small>' + esc(x.translation) + '</small>' : '') + '</div>'; }).join('');
      var quizHtml = (item.quiz || []).map(function (q) {
        return '<div class="quizq">' + esc(q.question) + '</div><div class="spk-opts">' + q.options.map(function (o) {
          return '<button class="spk-opt" type="button" data-a="' + esc(o === q.answer ? '1' : '') + '" style="font-size:.95rem">' + esc(o) + '</button>';
        }).join('') + '</div>';
      }).join('');
      d.innerHTML = '<div><h3>' + esc(item.title) + '</h3>' + (item.subtitle ? '<div class="spk-sub" style="text-align:left;margin-top:.15rem">' + esc(item.subtitle) + '</div>' : '') + '</div>'
        + (item.goal ? '<div><div class="lbl">🎯 ' + esc(item.goalLabel || 'Ziel') + '</div><div class="spk-sub" style="text-align:left">' + esc(item.goal) + '</div></div>' : '')
        + (vocabHtml ? '<div><div class="lbl">📖 ' + esc(item.vocabLabel || 'Wortschatz') + '</div>' + vocabHtml + '</div>' : '')
        + (dialHtml ? '<div><div class="lbl">💬 ' + esc(item.dialogueLabel || 'Dialog') + '</div>' + dialHtml + '</div>' : '')
        + (quizHtml ? '<div><div class="lbl">✓ ' + esc(item.quizLabel || 'Quiz') + '</div>' + quizHtml + '</div>' : '');
      F.body.appendChild(d);
      d.querySelectorAll('.spk-opt').forEach(function (b) {
        b.onclick = function () { b.classList.add(b.getAttribute('data-a') ? 'correct' : 'wrong'); };
      });
      footButton(F, item.weiter || 'Weiter', item.weiterGhost ? 'ghost' : '', next);
      F.armNext(next);
    },

    /* ── erklaerung ──────────────────────────────────────────────────────
       Antwort auf eine Meta-Frage im Gespräch. Ersetzt die zweckentfremdete
       Gesprächsblase, in der Ziel- und Muttersprache in EINE Audio-Zeichenkette
       gerieten (Bug 17.08.2026, Piper las Griechisch+Deutsch gemischt vor).

       { typ:'erklaerung', kartentyp:'wort'|'satz'|'grammatik'|'ausdruck',
         z, tr?, na,                       ← Vorderseite (Form C)
         glieder?:[{z,tr,na}],             ← nur 'satz', max 5, zweite Folie
         regel?, bz?, btr?, bna?,          ← nur 'grammatik'
         wann?,                            ← nur 'ausdruck'
         eyebrow?, gliederLabel?, weiter? }

       GESETZ: audioBtn() bekommt ausschliesslich ein z-Feld. na, tr, regel und
       wann erreichen die Sprachausgabe auf keinem Pfad. */
    erklaerung: function (item, F, next) {
      var glieder = (item.glieder || []).slice(0, 5);   /* harte Grenze: 5 */
      var hatZwei = item.kartentyp === 'satz' && glieder.length > 0;
      var zurueckAusRender = F.swipe.backFn;            /* von render(opts.back) */

      function punkte(seite) {
        var p = el('div', 'spk-punkte');
        p.appendChild(el('div', 'spk-punkt' + (seite === 0 ? ' an' : '')));
        p.appendChild(el('div', 'spk-punkt' + (seite === 1 ? ' an' : '')));
        return p;
      }

      /* Zielsprach-Zeile mit eigenem Knopf: z (+tr darunter), Knopf rechts. */
      function zielZeile(z, tr, mini) {
        var r = el('div', 'spk-erk-zeile');
        var sp = el('div', 'spk-sp');
        sp.appendChild(el('div', 'spk-ziel', esc(z)));
        if (tr) sp.appendChild(el('div', 'spk-um', esc(tr)));
        r.appendChild(sp);
        var b = audioBtn(z);
        if (mini) b.className = 'spk-audio mini';
        r.appendChild(b);
        return r;
      }

      function vorderseite() {
        F.body.innerHTML = '';
        F.body.style.alignItems = 'center';
        F.body.style.textAlign = 'center';
        F.body.style.justifyContent = 'center';
        if (item.eyebrow) F.body.appendChild(el('div', 'spk-eyebrow', esc(item.eyebrow)));

        if (item.kartentyp === 'grammatik') {
          F.body.appendChild(el('div', 'spk-instr', esc(item.regel)));
          if (item.bz) {
            F.body.appendChild(el('hr', 'spk-erk-hr'));
            var box = el('div', 'spk-erk-box');
            box.appendChild(zielZeile(item.bz, item.btr, true));
            if (item.bna) box.appendChild(el('div', 'spk-sub', esc(item.bna)));
            F.body.appendChild(box);
          }
        } else {
          F.body.appendChild(el('div', 'spk-ziel', esc(item.z)));
          if (item.tr) F.body.appendChild(el('div', 'spk-um', esc(item.tr)));
          F.body.appendChild(audioBtn(item.z));          /* NUR z */
          F.body.appendChild(el('div', 'spk-nativ', esc(item.na)));
          if (item.wann) {
            F.body.appendChild(el('hr', 'spk-erk-hr'));
            F.body.appendChild(el('div', 'spk-sub', esc(item.wann)));
          }
        }

        if (hatZwei) {
          F.body.appendChild(punkte(0));
          footButton(F, item.gliederLabel || 'Stück für Stück', 'ghost', function () { rueckseite(); });
          F.armNext(function () { rueckseite(); });      /* Wisch links = Folie 2 */
          F.swipe.backFn = zurueckAusRender;
        } else {
          footButton(F, item.weiter || 'Weiter', '', next);
          F.armNext(next);
          F.swipe.backFn = zurueckAusRender;
        }
        fitCard(F.card);
      }

      function rueckseite() {
        F.body.innerHTML = '';
        F.body.style.alignItems = 'stretch';
        F.body.style.textAlign = 'left';
        F.body.style.justifyContent = 'center';
        glieder.forEach(function (g) {
          var r = el('div', 'spk-glied');
          var b = audioBtn(g.z); b.className = 'spk-audio mini';
          r.appendChild(b);                              /* NUR z */
          var sp = el('div', 'spk-sp');
          sp.appendChild(el('div', 'spk-glied-z', esc(g.z)));
          if (g.tr) sp.appendChild(el('div', 'spk-glied-um', esc(g.tr)));
          r.appendChild(sp);
          r.appendChild(el('div', 'spk-glied-na', esc(g.na)));
          F.body.appendChild(r);
        });
        F.body.appendChild(punkte(1));
        footButton(F, item.weiter || 'Weiter', '', next);
        F.armNext(next);
        F.swipe.backFn = function () { vorderseite(); }; /* Wisch rechts = zurück */
        fitCard(F.card);
      }

      vorderseite();
    },

    /* note: { typ:'note', emoji?, title, sub?, buttons:[{label, ghost?, go}] } */
    note: function (item, F, next) {
      if (item.emoji) F.body.appendChild(el('div', 'spk-note-emoji', esc(item.emoji)));
      F.body.appendChild(el('div', 'spk-note-title', esc(item.title)));
      if (item.sub) F.body.appendChild(el('div', 'spk-note-sub', esc(item.sub)));
      var btns = item.buttons && item.buttons.length ? item.buttons : [{ label: 'Weiter', go: next }];
      btns.forEach(function (bt, i) {
        var b = el('button', 'spk-btn' + (bt.ghost ? ' ghost' : ''), esc(bt.label));
        b.type = 'button'; b.style.marginTop = i === 0 ? '.6rem' : '0';
        b.onclick = function () { (bt.go || next)(); };
        F.body.appendChild(b);
      });
    }
  };

  function render(item, next, opts) {
    opts = opts || {};
    injectCSS();
    if (!CFG.stage) throw new Error('SpikiuKarten.setup({stage}) fehlt');
    var F = buildFrame();
    F.swipe.backFn = opts.back || null;
    RENDER[item.typ](item, F, next || function () {});
    bindSwipe(F);
    if (opts.anim) F.card.classList.add(opts.anim === 'back' ? 'from-left' : 'from-right');
    CFG.stage.innerHTML = '';
    CFG.stage.appendChild(F.card);
    CUR = F.card;
    if (window.requestAnimationFrame) requestAnimationFrame(function () { fitCard(F.card); });
    else fitCard(F.card);
    return F;
  }

  /* Sequenz mit Reel-Navigation: Wisch links = weiter (wenn erlaubt), rechts = zurück.
     opts.start  = bei diesem Index beginnen (Sitzungs-Wiederherstellung)
     opts.onStep = wird bei jeder gezeigten Karte mit dem Index gerufen (Persistenz) */
  function sequence(items, onDone, opts) {
    opts = opts || {};
    var i = Math.max(0, Math.min(items.length - 1, opts.start || 0));
    function show(anim) {
      if (i >= items.length) { (onDone || function () {})(); return; }
      if (opts.onStep) { try { opts.onStep(i); } catch (e) {} }
      render(items[i], function () { i++; show('next'); },
        { anim: anim, back: i > 0 ? function () { i--; show('back'); } : null });
    }
    show(null);
  }

  window.addEventListener('resize', function () { if (CUR) fitCard(CUR); });

  window.SpikiuKarten = {
    setup: function (opts) { opts = opts || {}; if (opts.stage) CFG.stage = opts.stage; if (opts.zielsprache) CFG.zielsprache = opts.zielsprache; if (opts.sprich) CFG.sprich = opts.sprich; injectCSS(); },
    render: render,
    sequence: sequence,
    fitCard: fitCard
  };
})();
