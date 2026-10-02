/* ===================================================================
   juegos.js — Spiele-Motor (Spikiu) · Spielkiste 01.10.2026
   -------------------------------------------------------------------
   Reines JS, KEIN KI/Netz, NULL Token. Eigener CSS-Namensraum „jg-".
   Vorlage: giros-spielplatz-prototyp.html + birkenbihl-prototyp.html.

   Karten-Spiele (liefern ein DOM-Element, feuern 'jg-done', haben .stop()):
     spikiuJuegos.pinata({ satz, intruso, intrusoDe }, opts)
     spikiuJuegos.globos({ satz }, opts)
     spikiuJuegos.literal({ text, woertlich, bedeutung, falsch:[2], bild }, opts)
     spikiuJuegos.gemelos([{ z, na }, …4], opts)

   Ansichten (größer, mit eigenem Speicher über cfg):
     spikiuJuegos.huerto(cfg, opts)      — Spikius Garten (ABC-Liste)
     spikiuJuegos.acrostico(cfg, opts)   — Akrostichon

   opts = { nativeLang:'de'|'es'|'en', zielLang:'es'|'de'|'en'|'el',
            sprich: function(text){…} (optional, Vorlesen) }

   Seele: kein Punktestand, kein Timer-Zähler, kein „Game over".
   Das Maskottchen heißt in jedem Text Spikiu. Ideen für Garten und
   Akrostichon nach Vera F. Birkenbihl (Name „KaWa" bewusst NICHT benutzt).
=================================================================== */
(function (w) {
  'use strict';
  if (w.spikiuJuegos) return;

  // ── Spikiu, kanonisch (index.html) ──
  var SPIKIU = '<svg viewBox="0 0 80 80" fill="none" aria-hidden="true">'
    + '<ellipse cx="40" cy="50" rx="28" ry="20" fill="#c9956a"/><ellipse cx="40" cy="28" rx="18" ry="15" fill="#c9956a"/>'
    + '<ellipse cx="40" cy="36" rx="10" ry="7" fill="#b8845a"/><ellipse cx="40" cy="33" rx="4" ry="2.5" fill="#8b5e3c"/>'
    + '<circle cx="38" cy="33" r="1" fill="#6b4226"/><circle cx="42" cy="33" r="1" fill="#6b4226"/>'
    + '<circle cx="33" cy="24" r="3.5" fill="#3d2b1f"/><circle cx="47" cy="24" r="3.5" fill="#3d2b1f"/>'
    + '<circle cx="34" cy="23" r="1.2" fill="white"/><circle cx="48" cy="23" r="1.2" fill="white"/>'
    + '<ellipse cx="26" cy="17" rx="6" ry="5" fill="#b8845a"/><ellipse cx="54" cy="17" rx="6" ry="5" fill="#b8845a"/>'
    + '<ellipse cx="22" cy="66" rx="7" ry="5" fill="#b8845a"/><ellipse cx="34" cy="68" rx="7" ry="5" fill="#b8845a"/>'
    + '<ellipse cx="46" cy="68" rx="7" ry="5" fill="#b8845a"/><ellipse cx="58" cy="66" rx="7" ry="5" fill="#b8845a"/>'
    + '<path d="M36 38 Q40 41 44 38" stroke="#8b5e3c" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>';

  // ── UI-Texte in der Muttersprache ──
  var UI = {
    de: {
      dale: '¡Dale!', pinataTask: 'Schlag zu! Tipp den Eindringling in der Luft an.',
      pinataOk: function (x) { return 'Richtig: <em>' + x + '</em> gehört nicht dazu.'; },
      pinataCaught: function (x) { return 'Spikiu hat ihn aufgefangen: der Eindringling war <em>' + x + '</em>.'; },
      pinataStay: 'Das gehört dazu. Such ein anderes.',
      gehoertZu: function (x, s) { return '<em>' + x + '</em> gehört zu: „' + s + '"'; },
      globosTask: 'Lass die Ballons in der Reihenfolge des Satzes platzen.',
      ordFirst: 'Fang mit dem ersten Wort an.', ordNext: function (x) { return 'Fast. Was kommt nach „' + x + '"?'; },
      ordDone: 'So sagt man das.',
      literalTask: 'Spikiu hat es wörtlich genommen. Was heißt es wirklich?', woertlich: 'wörtlich',
      literalOk: 'Genau das.', literalNo: 'Das heißt etwas anderes. Versuch ein anderes.',
      gemelosTask: 'Verbinde jedes Paar.', gemelosNo: 'Das ist kein Paar. Versuch ein anderes.',
      gemelosDone: 'Alle Paare sind zusammen.', ziel: 'ZIELSPRACHE', mutter: 'DEINE SPRACHE',
      hoeren: 'Anhören',
      // Garten
      gIntro: 'Das ist mein Garten. Jeder Buchstabe ist ein Beet. Wähl ein Thema, tipp ein Beet an und pflanz ein Wort, das dir einfällt. Nicht der Reihe nach, einfach wie es kommt.',
      gWieder: 'Dein Garten vom letzten Mal wächst noch. Pflanz einfach weiter.',
      gWrite: 'Wort mit', gPlant: 'pflanzen', gSow: 'Spikiu sät',
      gKnown: 'kenne ich', gYou: 'dein Wort', gLent: 'von Spikiu gesät',
      gUnknown: 'Kenne ich noch nicht. Es bleibt in deinem Garten.',
      gSowed: function (x, t) { return 'Spikiu sät: <em>' + x + '</em> (' + t + '). Jetzt du.'; },
      gNoSeed: 'In diesem Beet habe ich keine Samen mehr.',
      gWrong: function (L) { return 'Das beginnt nicht mit ' + L + '. Gehört es in ein anderes Beet?'; },
      gNew: 'Beet neu anlegen', gNewSure: 'Wirklich umgraben? Tipp nochmal.', gRemove: 'Antippen zum Entfernen',
      // Akrostichon
      aIntro: 'So sieht ein Akrostichon aus. Jeder Buchstabe öffnet eine Tür: Wörter, Orte, Gefühle, auch in deiner Sprache.',
      aPick: 'Wähl ein Wort', aOwn: 'Eigenes Wort', aGo: 'Los',
      aHint: 'Hängst du? Tipp auf Spikiu neben dem Buchstaben.', aDone: 'Fertig',
      aSaved: 'Deine Akrosticha', aYours: 'Dein Akrostichon', aNew: 'Neues Akrostichon', aSpikiu: 'Spikius Akrostichon'
    },
    es: {
      dale: '¡Dale!', pinataTask: '¡Dale! Toca al intruso en el aire.',
      pinataOk: function (x) { return '¡Correcto! <em>' + x + '</em> no encaja.'; },
      pinataCaught: function (x) { return 'Spikiu lo atrapó: el intruso era <em>' + x + '</em>.'; },
      pinataStay: 'Esta sí pertenece. Busca otra.',
      gehoertZu: function (x, s) { return '<em>' + x + '</em> es de: «' + s + '»'; },
      globosTask: 'Revienta los globos en el orden de la frase.',
      ordFirst: 'Empieza por la primera palabra.', ordNext: function (x) { return 'Casi. ¿Qué viene después de «' + x + '»?'; },
      ordDone: '¡Así se dice!',
      literalTask: 'Spikiu lo entendió al pie de la letra. ¿Qué significa de verdad?', woertlich: 'literalmente',
      literalOk: '¡Eso es!', literalNo: 'Eso significa otra cosa. Prueba otra.',
      gemelosTask: 'Une cada pareja.', gemelosNo: 'No son pareja. Prueba otra.',
      gemelosDone: 'Todas las parejas juntas.', ziel: 'IDIOMA META', mutter: 'TU IDIOMA',
      hoeren: 'Escuchar',
      gIntro: 'Este es mi huerto. Cada letra es un bancal. Elige un tema, toca un bancal y planta una palabra que se te ocurra. No hace falta ir en orden: como salga.',
      gWieder: 'Tu huerto de la última vez sigue creciendo. Sigue plantando.',
      gWrite: 'Palabra con', gPlant: 'plantar', gSow: 'Spikiu siembra',
      gKnown: 'la conozco', gYou: 'tu palabra', gLent: 'sembrada por Spikiu',
      gUnknown: 'Todavía no la conozco. Se queda en tu huerto.',
      gSowed: function (x, t) { return 'Spikiu siembra: <em>' + x + '</em> (' + t + '). Ahora tú.'; },
      gNoSeed: 'En este bancal ya no me quedan semillas.',
      gWrong: function (L) { return 'No empieza por ' + L + '. ¿Va en otro bancal?'; },
      gNew: 'Empezar otro huerto', gNewSure: '¿Remover la tierra de verdad? Toca otra vez.', gRemove: 'Toca para quitar',
      aIntro: 'Así es un acróstico. Cada letra abre una puerta: palabras, lugares, sensaciones, también en tu idioma.',
      aPick: 'Elige una palabra', aOwn: 'Palabra propia', aGo: 'Vamos',
      aHint: '¿Atascado? Toca a Spikiu junto a la letra.', aDone: 'Listo',
      aSaved: 'Tus acrósticos', aYours: 'Tu acróstico', aNew: 'Nuevo acróstico', aSpikiu: 'El acróstico de Spikiu'
    },
    en: {
      dale: 'Go!', pinataTask: 'Swing! Tap the intruder in the air.',
      pinataOk: function (x) { return 'Right: <em>' + x + '</em> doesn’t belong.'; },
      pinataCaught: function (x) { return 'Spikiu caught it: the intruder was <em>' + x + '</em>.'; },
      pinataStay: 'That one belongs. Look for another.',
      gehoertZu: function (x, s) { return '<em>' + x + '</em> belongs to: “' + s + '”'; },
      globosTask: 'Pop the balloons in the order of the sentence.',
      ordFirst: 'Start with the first word.', ordNext: function (x) { return 'Almost. What comes after “' + x + '”?'; },
      ordDone: 'That’s how it’s said.',
      literalTask: 'Spikiu took it literally. What does it really mean?', woertlich: 'literally',
      literalOk: 'Exactly.', literalNo: 'That means something else. Try another.',
      gemelosTask: 'Match each pair.', gemelosNo: 'Not a pair. Try another.',
      gemelosDone: 'All pairs are together.', ziel: 'TARGET', mutter: 'YOUR LANGUAGE',
      hoeren: 'Listen',
      gIntro: 'This is my garden. Every letter is a bed. Pick a topic, tap a bed and plant a word that comes to mind. No need to go in order.',
      gWieder: 'Your garden from last time is still growing. Keep planting.',
      gWrite: 'Word with', gPlant: 'plant', gSow: 'Spikiu sows',
      gKnown: 'I know it', gYou: 'your word', gLent: 'sown by Spikiu',
      gUnknown: 'I don’t know it yet. It stays in your garden.',
      gSowed: function (x, t) { return 'Spikiu sows: <em>' + x + '</em> (' + t + '). Your turn.'; },
      gNoSeed: 'I have no seeds left for this bed.',
      gWrong: function (L) { return 'That doesn’t start with ' + L + '. Does it go in another bed?'; },
      gNew: 'Dig a new garden', gNewSure: 'Really dig it all up? Tap again.', gRemove: 'Tap to remove',
      aIntro: 'This is an acrostic. Every letter opens a door: words, places, feelings, in your language too.',
      aPick: 'Pick a word', aOwn: 'Your own word', aGo: 'Go',
      aHint: 'Stuck? Tap Spikiu next to the letter.', aDone: 'Done',
      aSaved: 'Your acrostics', aYours: 'Your acrostic', aNew: 'New acrostic', aSpikiu: 'Spikiu’s acrostic'
    }
  };
  function T(opts) { var n = opts && opts.nativeLang; return UI[n] || UI.de; }

  var ABC = {
    es: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split(''),
    de: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    el: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'.split('')
  };

  // ── CSS einmal injizieren ──
  var CSS = [
    '.jg{--jg-ink:#15163a;--jg-mid:#5f7068;--jg-faint:#dfe6e0;--jg-acc:#1f93b0;--jg-acc2:#e3f3f8;--jg-yel:#ffd24a;--jg-yel2:#fff3c4;--jg-ok:#c7e89a;--jg-ok2:#9bd14a;--jg-okInk:#2f6b3a;--jg-warn:#c67a1e;--jg-warn2:#fbf0e0;--jg-sky:#d3eef6;',
    'width:100%;display:flex;flex-direction:column;align-items:center;gap:.8rem;text-align:center;color:var(--jg-ink);font-family:"DM Sans",system-ui,sans-serif}',
    '.jg *{box-sizing:border-box}.jg button{font-family:inherit;-webkit-tap-highlight-color:transparent}',
    '.jg button:focus-visible,.jg input:focus-visible{outline:3px solid var(--jg-acc);outline-offset:2px}',
    '.jg em{font-family:Lora,Georgia,serif;font-style:normal;font-weight:600}',
    '.jg-task{font:500 1.15rem/1.35 Lora,Georgia,serif;margin:0;text-wrap:balance}',
    '.jg-fb{min-height:1.4em;font-weight:700;font-size:1rem;color:var(--jg-okInk);line-height:1.35}',
    '.jg-fb.soft{color:var(--jg-warn)}',
    '.jg-chip{background:#fff;color:var(--jg-ink);border:2.5px solid var(--jg-ink);border-radius:16px;box-shadow:3px 4px 0 var(--jg-ink);padding:.4rem .85rem;font:500 1.2rem Lora,Georgia,serif;cursor:pointer;white-space:nowrap}',
    '.jg-mini-chip{font-size:.98rem;padding:.22rem .55rem;border-width:2px;border-radius:12px;box-shadow:2px 2px 0 var(--jg-ink)}',
    '.jg-chip.ok{background:var(--jg-ok2)}.jg-chip.no{background:var(--jg-warn2);border-color:var(--jg-warn);animation:jgWob .4s}',
    '.jg-phrase{font:600 clamp(1.3rem,5.6vw,1.75rem)/1.3 Lora,Georgia,serif;text-wrap:balance}',
    '.jg-explain{background:var(--jg-acc2);border-radius:14px;padding:.65rem .85rem;font-size:.95rem;line-height:1.45;text-align:left;width:100%}',
    '.jg-say{display:inline-flex;align-items:center;gap:.35rem;background:var(--jg-acc);color:#fff;border:2.5px solid var(--jg-ink);border-radius:100px;box-shadow:2px 3px 0 var(--jg-ink);padding:.35rem .8rem;font-weight:800;font-size:.85rem;cursor:pointer}',
    '.jg-big{background:var(--jg-yel);color:var(--jg-ink);border:2.5px solid var(--jg-ink);border-radius:100px;box-shadow:3px 4px 0 var(--jg-ink);padding:.65rem 1.9rem;font-weight:800;font-size:1.25rem;cursor:pointer}',
    '.jg-btn{background:var(--jg-acc);color:#fff;border:2.5px solid var(--jg-ink);border-radius:100px;box-shadow:3px 4px 0 var(--jg-ink);padding:.55rem 1.1rem;font-weight:800;font-size:.95rem;cursor:pointer}',
    '.jg-btn.ghost{background:#fff;color:var(--jg-ink)}',
    '.jg-pop{animation:jgPop .35s ease-out both}',
    '@keyframes jgWob{0%,100%{transform:rotate(0)}25%{transform:rotate(-6deg)}75%{transform:rotate(6deg)}}',
    '@keyframes jgPop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}',
    '@keyframes jgSwing{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}',
    '@keyframes jgFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
    /* Feld (Piñata, Globos) */
    '.jg-field{position:relative;width:100%;height:min(56vh,400px);min-height:300px;border-radius:16px;border:2px solid var(--jg-ink);background:linear-gradient(var(--jg-sky),#fff 85%);overflow:hidden;touch-action:manipulation}',
    '.jg-floor{position:absolute;left:0;right:0;bottom:0;height:30px;background:repeating-linear-gradient(90deg,var(--jg-faint) 0 14px,transparent 14px 28px);border-top:2.5px solid var(--jg-ink)}',
    '.jg-fly{position:absolute;left:0;top:0;will-change:transform;transition:none}',
    '.jg-fly.no{animation:none}',
    '.jg-rope{position:absolute;left:50%;top:0;width:2px;height:34px;background:var(--jg-ink)}',
    '.jg-pin{position:absolute;left:50%;top:30px;width:110px;margin-left:-55px;transform-origin:50% -30px;animation:jgSwing 2.4s ease-in-out infinite}',
    '.jg-go{position:absolute;left:50%;bottom:48px;transform:translateX(-50%)}',
    '.jg-conf{position:absolute;width:9px;height:14px;border-radius:2px;pointer-events:none}',
    '.jg-catch{position:absolute;bottom:18px;width:60px;transition:left .5s ease}',
    '.jg-ans{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;min-height:2.6rem;width:100%;padding:.4rem;border:2px dashed var(--jg-faint);border-radius:14px}',
    '.jg-ans span{font:600 1.1rem Lora,Georgia,serif}',
    '.jg-bal{display:flex;flex-direction:column;align-items:center;cursor:pointer;background:none;border:none;padding:0}',
    '.jg-bal .b{padding:.5rem .85rem .75rem;border-radius:50% 50% 46% 46%/55% 55% 45% 45%;border:2.5px solid var(--jg-ink);font:600 1.1rem Lora,Georgia,serif;color:var(--jg-ink);min-width:72px;white-space:nowrap}',
    '.jg-bal .s{width:2px;height:30px;background:var(--jg-mid)}',
    '.jg-bal.no .b{background:var(--jg-warn2)!important;border-color:var(--jg-warn)}',
    /* Literal / Gemelos */
    '.jg-bild img{width:84px;height:84px}',
    '.jg-lit{font-size:.95rem;background:#fff6d6;border:2px dashed #e0c36a;border-radius:12px;padding:.4rem .7rem}',
    '.jg-lit b{font:700 .62rem "DM Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#a87b2e;margin-right:.3rem}',
    '.jg-opts{display:flex;flex-direction:column;gap:.55rem;width:100%}',
    '.jg-opt{background:#fff;color:var(--jg-ink);border:2.5px solid var(--jg-ink);border-radius:14px;box-shadow:3px 3px 0 var(--jg-ink);padding:.6rem .85rem;font:500 1rem "DM Sans",sans-serif;text-align:left;cursor:pointer}',
    '.jg-opt.ok{background:var(--jg-ok2)}.jg-opt.no{background:var(--jg-warn2);border-color:var(--jg-warn);opacity:.7}',
    '.jg-pairs{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;width:100%}',
    '.jg-col{display:flex;flex-direction:column;gap:.55rem;min-width:0}',
    '.jg-colh{font:500 .62rem "DM Mono",monospace;letter-spacing:.16em;color:var(--jg-mid)}',
    '.jg-pc{background:#fff;color:var(--jg-ink);border:2.5px solid var(--jg-ink);border-radius:14px;box-shadow:3px 3px 0 var(--jg-ink);padding:.45rem .5rem;font:600 .95rem/1.25 Lora,Georgia,serif;cursor:pointer;min-height:3.4rem;overflow-wrap:anywhere}',
    '.jg-pc.sel{background:var(--jg-yel)}.jg-pc.ok{background:var(--jg-ok);pointer-events:none}.jg-pc.no{background:var(--jg-warn2);border-color:var(--jg-warn);animation:jgWob .4s}',
    /* Spikiu-Sprechblase */
    '.jg-spk{display:flex;gap:.7rem;align-items:flex-start;width:100%;text-align:left}',
    '.jg-spk svg{width:52px;height:52px;flex:none;animation:jgFloat 4s ease-in-out infinite}',
    '.jg-bub{background:#fff;border:2.5px solid var(--jg-ink);border-radius:.3rem 1.2rem 1.2rem 1.2rem;box-shadow:3px 4px 0 var(--jg-ink);padding:.6rem .8rem;font-size:.93rem;line-height:1.45;min-width:0}',
    /* Garten */
    '.jg-themes{display:flex;gap:.45rem;overflow-x:auto;width:100%;padding:.2rem .1rem .5rem;scrollbar-width:none}',
    '.jg-pill{flex:none;background:#fff;color:var(--jg-ink);border:2px solid var(--jg-ink);border-radius:100px;box-shadow:2px 2px 0 var(--jg-ink);padding:.35rem .75rem;font:700 .85rem "DM Sans",sans-serif;cursor:pointer;white-space:nowrap}',
    '.jg-pill.on{background:var(--jg-ink);color:#fff}',
    '.jg-abc{width:100%;background:#fff;border:2.5px solid var(--jg-ink);border-radius:20px;box-shadow:4px 5px 0 var(--jg-ink);overflow:hidden;text-align:left}',
    '.jg-row{display:flex;align-items:flex-start;gap:.6rem;padding:.45rem .6rem;border-bottom:1.5px solid var(--jg-faint);min-height:3rem}',
    '.jg-row:last-child{border-bottom:none}',
    '.jg-let{position:relative;flex:none;width:2.1rem;height:2.1rem;border-radius:10px;border:2px solid var(--jg-ink);display:grid;place-items:center;font:600 1.1rem Lora,Georgia,serif;background:#fff;color:var(--jg-ink);cursor:pointer}',
    '.jg-row.full .jg-let{background:var(--jg-ok)}',
    '.jg-row.full .jg-let::after{content:"";position:absolute;right:-5px;top:-7px;width:12px;height:12px;background:radial-gradient(circle at 30% 70%,#4f8a2a 0 45%,transparent 46%),radial-gradient(circle at 75% 35%,#6fae3a 0 40%,transparent 41%)}',
    '.jg-ent{flex:1;min-width:0;display:flex;flex-wrap:wrap;gap:.35rem;align-items:center;padding-top:.1rem}',
    '.jg-w{display:inline-flex;flex-direction:column;border:2px solid var(--jg-ink);border-radius:12px;padding:.12rem .55rem;font:600 1rem/1.2 Lora,Georgia,serif;background:var(--jg-yel2);color:var(--jg-ink);cursor:pointer;text-align:left}',
    '.jg-w small{font:500 .7rem "DM Sans",sans-serif;color:var(--jg-mid)}',
    '.jg-w.known{background:var(--jg-ok)}.jg-w.known small{color:#2f4a1a}.jg-w.lent{background:#eceee9;border-style:dashed}',
    '.jg-add{border:2px dashed var(--jg-faint);background:none;color:var(--jg-mid);border-radius:12px;padding:.25rem .55rem;font:700 .85rem "DM Sans",sans-serif;cursor:pointer}',
    '.jg-in{display:flex;gap:.35rem;width:100%;flex-wrap:wrap}',
    '.jg-in input{flex:1 1 9rem;min-width:0;border:2px solid var(--jg-ink);border-radius:100px;padding:.45rem .85rem;font:500 1rem Lora,Georgia,serif;background:#fff;color:var(--jg-ink)}',
    '.jg-in button{flex:none;border:2px solid var(--jg-ink);border-radius:100px;padding:.4rem .75rem;font:800 .82rem "DM Sans",sans-serif;cursor:pointer;background:var(--jg-acc);color:#fff}',
    '.jg-in button.ghost{background:#fff;color:var(--jg-ink)}',
    '.jg-legend{display:flex;flex-wrap:wrap;gap:.7rem;font-size:.75rem;color:var(--jg-mid);width:100%}',
    '.jg-legend i{display:inline-block;width:11px;height:11px;border-radius:4px;border:1.5px solid var(--jg-ink);vertical-align:-1px;margin-right:4px}',
    '.jg-whisper{font-size:.88rem;color:var(--jg-mid);min-height:1.3em;width:100%;text-align:left}',
    /* Akrostichon */
    '.jg-kawa{width:100%;background:#fff;border:2.5px solid var(--jg-ink);border-radius:20px;box-shadow:4px 5px 0 var(--jg-ink);padding:.7rem .7rem;display:flex;flex-direction:column;gap:.3rem}',
    '.jg-kl{display:flex;align-items:center;gap:.55rem}',
    '.jg-kb{flex:none;width:2.1rem;height:2.1rem;border-radius:9px;border:2px solid var(--jg-ink);display:grid;place-items:center;font:600 1.2rem Lora,Georgia,serif;background:var(--jg-yel);box-shadow:1.5px 2px 0 var(--jg-ink)}',
    '.jg-kawa.lang .jg-kb{width:1.8rem;height:1.8rem;font-size:1.05rem;border-radius:8px}',
    '.jg-kawa.lang{gap:.2rem}',
    '.jg-kl input{flex:1;min-width:0;border:none;border-bottom:2px solid var(--jg-faint);background:none;color:var(--jg-ink);padding:.25rem .15rem;font:500 1.05rem Lora,Georgia,serif}',
    '.jg-kl input:focus{outline:none;border-bottom-color:var(--jg-acc)}',
    '.jg-kl .tr{flex:none;font-size:.72rem;color:var(--jg-mid);max-width:28%;text-align:right;overflow-wrap:anywhere}',
    '.jg-kl .hint{flex:none;width:1.9rem;height:1.9rem;border-radius:50%;border:2px solid var(--jg-ink);background:#fff;cursor:pointer;display:grid;place-items:center;padding:0}',
    '.jg-kl .hint svg{width:1.35rem;height:1.35rem}',
    '.jg-kc{width:100%;background:#fff;border:2.5px solid var(--jg-ink);border-radius:20px;box-shadow:4px 5px 0 var(--jg-ink);padding:1rem;display:grid;grid-template-columns:auto 1fr;gap:.3rem .9rem;align-items:baseline;text-align:left}',
    '.jg-kc h4{grid-column:1/-1;margin:0 0 .3rem;font:500 .68rem "DM Mono",monospace;letter-spacing:.18em;color:var(--jg-mid);text-transform:uppercase}',
    '.jg-kc .L{font:600 1.8rem/1 Lora,Georgia,serif;color:var(--jg-acc)}',
    '.jg-kc .A{font:500 1.1rem Lora,Georgia,serif;overflow-wrap:anywhere}.jg-kc .A small{display:block;font:500 .75rem "DM Sans",sans-serif;color:var(--jg-mid)}',
    '.jg-h{font:500 .68rem "DM Mono",monospace;letter-spacing:.18em;text-transform:uppercase;color:var(--jg-mid);width:100%;text-align:left;margin:.4rem 0 0}',
    '.jg-words{display:flex;flex-wrap:wrap;gap:.45rem;width:100%}',
    '.jg-mini{border:2px solid var(--jg-ink);border-radius:12px;padding:.3rem .65rem;font:600 .95rem Lora,Georgia,serif;background:var(--jg-yel2);color:var(--jg-ink);cursor:pointer}',
    '.jg-foot{display:flex;flex-wrap:wrap;gap:.6rem;justify-content:space-between;width:100%}',
    '@media (prefers-reduced-motion:reduce){.jg *{animation:none!important;transition:none!important}}'
  ].join('\n');
  function ensureCss() {
    if (document.getElementById('jg-css')) return;
    var s = document.createElement('style'); s.id = 'jg-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }
  var RUHIG = false;
  try { RUHIG = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  // ── Helfer ──
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function esc(t) { return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function mezcla(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function wob(node, cls) { node.classList.remove(cls || 'no'); void node.offsetWidth; node.classList.add(cls || 'no'); }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[¿?¡!.,;:«»"“”„()]/g, '').trim(); }
  function ohneArtikel(s) { return String(s || '').trim().replace(/^(el|la|los|las|un|una|der|die|das|ein|eine|the|a|an|ο|η|το|οι|τα)\s+/i, ''); }
  // Satz → Wörter ohne Satzzeichen (Anzeige), Original bleibt für den Schluss.
  function woerterAus(satz) {
    return String(satz || '').replace(/[¿?¡!.,;:«»"“”„()…]/g, ' ').split(/\s+/).filter(Boolean);
  }
  function spikiuSagt(html) {
    var d = el('div', 'jg-spk'); d.innerHTML = SPIKIU;
    var b = el('div', 'jg-bub'); b.innerHTML = html; d.appendChild(b); return d;
  }
  function done(root, ok) { try { root.dispatchEvent(new CustomEvent('jg-done', { detail: { ok: ok !== false } })); } catch (e) {} }
  function sagKnopf(text, opts) {
    if (!opts || typeof opts.sprich !== 'function') return null;
    var b = el('button', 'jg-say'); b.type = 'button'; b.innerHTML = '&#128266; ' + esc(T(opts).hoeren);
    b.addEventListener('click', function () { try { opts.sprich(text); } catch (e) {} });
    return b;
  }
  /* ── KLANG (Leo, 02.10.): Dur bei Erfolg, Moll bei Fehltipp — höchstens
     EINMAL Moll pro Runde. WAV (kein MP3-Vorlauf → exakt synchron), einmal
     vorgeladen und per Web Audio dekodiert; der Ton startet im selben
     Moment wie der Tipp. AudioContext wird beim ersten Tippen geweckt
     (iOS/Android verlangen eine Geste). Fehlt Web Audio: <audio> als Netz.
     Vorerst nur Piñata + Globos (Test). ── */
  var KLANG = (function () {
    var PFAD = { dur: '/audio/spiel/dur.wav', moll: '/audio/spiel/moll.wav' };
    var ctx = null, buf = {}, roh = {}, geladen = false;
    function kontext() {
      if (ctx) return ctx;
      var AC = w.AudioContext || w.webkitAudioContext; if (!AC) return null;
      try { ctx = new AC(); } catch (e) { ctx = null; }
      return ctx;
    }
    function dekodiere(k) {
      var c = kontext(); if (!c || !roh[k] || buf[k]) return;
      try {
        var kopie = roh[k].slice(0);
        var fertig = function (b) { buf[k] = b; };
        var p = c.decodeAudioData(kopie, fertig, function () {});
        if (p && p.then) p.then(fertig, function () {});
      } catch (e) {}
    }
    function vorladen() {
      if (geladen || !w.fetch) return; geladen = true;
      Object.keys(PFAD).forEach(function (k) {
        fetch(PFAD[k]).then(function (r) { return r.ok ? r.arrayBuffer() : null; })
          .then(function (ab) { if (ab) { roh[k] = ab; dekodiere(k); } }).catch(function () {});
      });
    }
    function wecken() {
      var c = kontext(); if (!c) return;
      if (c.state === 'suspended' && c.resume) { try { c.resume(); } catch (e) {} }
      Object.keys(roh).forEach(dekodiere);
    }
    function spiele(k) {
      var c = kontext();
      if (c && buf[k]) {
        try {
          if (c.state === 'suspended' && c.resume) c.resume();
          var q = c.createBufferSource(); q.buffer = buf[k]; q.connect(c.destination); q.start(0);
          return;
        } catch (e) {}
      }
      try { var a = new Audio(PFAD[k]); a.play().catch(function () {}); } catch (e) {}
    }
    return { vorladen: vorladen, wecken: wecken, spiele: spiele };
  })();
  // Pro Runde: Dur frei, Moll nur einmal.
  function rundenKlang() {
    var mollSchon = false;
    KLANG.vorladen();
    return {
      dur: function () { KLANG.spiele('dur'); },
      moll: function () { if (mollSchon) return; mollSchon = true; KLANG.spiele('moll'); },
      wecken: KLANG.wecken
    };
  }

  function wurzel() { ensureCss(); var r = el('div', 'jg'); r.stop = function () {}; return r; }

  // ── Piñata-Stern ──
  function pinataSvg() {
    var cols = ['#e0412f', '#ffd24a', '#1f93b0', '#9bd14a', '#e87fb6', '#f08a2c', '#8a5cc4'], s = '';
    for (var i = 0; i < 7; i++) {
      var a = i * 2 * Math.PI / 7 - Math.PI / 2, x = 60 + Math.cos(a) * 56, y = 62 + Math.sin(a) * 56,
        l = 60 + Math.cos(a - .28) * 26, lt = 62 + Math.sin(a - .28) * 26, r = 60 + Math.cos(a + .28) * 26, rt = 62 + Math.sin(a + .28) * 26;
      s += '<path d="M' + l + ' ' + lt + ' L' + x + ' ' + y + ' L' + r + ' ' + rt + 'Z" fill="' + cols[i] + '" stroke="#15163a" stroke-width="2"/>';
      s += '<path d="M' + x + ' ' + y + ' l-4 10 M' + x + ' ' + y + ' l4 10" stroke="' + cols[(i + 2) % 7] + '" stroke-width="2.5"/>';
    }
    s += '<circle cx="60" cy="62" r="30" fill="#ffd24a" stroke="#15163a" stroke-width="2.5"/>'
      + '<path d="M34 54 H86 M31 64 H89 M34 74 H86" stroke="#e0412f" stroke-width="3"/>'
      + '<circle cx="52" cy="58" r="3" fill="#15163a"/><circle cx="68" cy="58" r="3" fill="#15163a"/>'
      + '<path d="M53 68 Q60 73 67 68" stroke="#15163a" stroke-width="2" fill="none"/>';
    return '<svg viewBox="0 0 120 130" aria-hidden="true">' + s + '</svg>';
  }

  /* ═══ 1. PIÑATA ═══
     Leo 01.10.: kleinere Kapseln, nichts darf sich verdecken, langsamer.
     → Nach dem Platzen ordnen sich die Wörter in Spalten und Reihen
       (jede Kapsel hat ihren eigenen Platz), dann fallen alle gleich
       schnell und gemächlich. Unten stapeln sie sich je Spalte. */
  function pinata(d, opts) {
    var U = T(opts), root = wurzel(), raf = 0, fertig = false, last = 0, parts = [], spaltenBoden = [], ton = rundenKlang();
    var woerter = woerterAus(d.satz);
    root.appendChild(el('p', 'jg-task', U.pinataTask));
    var f = el('div', 'jg-field'); root.appendChild(f);
    f.appendChild(el('div', 'jg-floor'));
    var rope = el('div', 'jg-rope'), pin = el('div', 'jg-pin'); pin.innerHTML = pinataSvg();
    f.appendChild(rope); f.appendChild(pin);
    var catcher = el('div', 'jg-catch'); catcher.innerHTML = SPIKIU; catcher.style.left = 'calc(50% - 30px)'; f.appendChild(catcher);
    var go = el('button', 'jg-big jg-go', U.dale); go.type = 'button'; f.appendChild(go);
    var fb = el('div', 'jg-fb'); root.appendChild(fb);

    var FALL_MAX = 0.6, SCHWERE = 0.035, SAMMELN = 70;   // px/Frame, Frames bis zum Fallen
    function schleife(ts) {
      var dt = last ? Math.min(40, ts - last) / 16 : 1; last = ts;
      var H = f.clientHeight - 30;
      parts.forEach(function (p) {
        if (p.weg) return;
        if (p.konf) {
          p.vy = Math.min(p.vy + 0.09 * dt, 2.2); p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
          if (p.y >= H - 14) { p.weg = true; p.e.style.opacity = '.35'; p.y = H - 14; }
        } else if (!p.unten) {
          p.t += dt;
          if (p.t < SAMMELN) {                       // 1) an den eigenen Platz schweben
            var k = 1 - Math.pow(1 - 0.06, dt);
            p.x += (p.tx - p.x) * k; p.y += (p.ty - p.y) * k;
          } else {                                   // 2) gemeinsam, langsam fallen
            p.x += (p.tx - p.x) * 0.1;
            p.vy = Math.min(p.vy + SCHWERE * dt, FALL_MAX); p.y += p.vy * dt;
          }
          p.r = Math.sin((p.t + p.ph) / 22) * 3;     // leichtes Schaukeln, bleibt lesbar
          var boden = Math.min(H, spaltenBoden[p.spalte]);
          if (p.y + p.h >= boden) {
            p.y = boden - p.h; p.r = 0; p.unten = true;
            spaltenBoden[p.spalte] = p.y - 4;
            if (p.intr && !fertig) gefangen(p);
          }
        }
        p.e.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px) rotate(' + p.r + 'deg)';
      });
      var aktiv = parts.some(function (p) { return !p.weg && !p.unten; });
      if (aktiv) raf = requestAnimationFrame(schleife); else raf = 0;
    }
    root.stop = function () { if (raf) cancelAnimationFrame(raf); raf = 0; };

    go.addEventListener('click', function () {
      ton.wecken();
      go.remove(); pin.remove(); rope.remove();
      var W = f.clientWidth, H = f.clientHeight - 30, cx = W / 2, cy = 80;
      var cols = ['#e0412f', '#ffd24a', '#1f93b0', '#9bd14a', '#e87fb6', '#f08a2c'];
      if (!RUHIG) for (var k = 0; k < 22; k++) {
        var c = el('div', 'jg-conf'); c.style.background = cols[k % 6]; f.appendChild(c);
        parts.push({ e: c, konf: true, x: cx, y: cy, vx: (Math.random() - .5) * 7, vy: -2 - Math.random() * 3, r: 0, vr: (Math.random() - .5) * 14 });
      }
      var alle = mezcla(woerter.concat([d.intruso])), n = alle.length;
      var reihen = n <= 4 ? 1 : (n <= 8 ? 2 : 3), spalten = Math.ceil(n / reihen), spB = W / spalten;
      for (var s2 = 0; s2 < spalten; s2++) spaltenBoden[s2] = H;
      alle.forEach(function (wort, ix) {
        var b = el('button', 'jg-chip jg-mini-chip jg-fly', wort); b.type = 'button'; f.appendChild(b);
        var bw = b.offsetWidth, bh = b.offsetHeight;
        var reihe = Math.floor(ix / spalten), spalte = ix % spalten;
        var mitte = spB * (spalte + 0.5);   // jede Kapsel bleibt in ihrer Spalte
        var tx = Math.max(4, Math.min(W - bw - 4, mitte - bw / 2));
        var ty = 16 + reihe * (bh + 18);
        var p = { e: b, x: cx - bw / 2, y: cy, tx: tx, ty: ty, vy: 0, r: 0, t: 0, ph: ix * 9, h: bh, spalte: spalte, intr: (wort === d.intruso) };
        if (RUHIG) { p.x = tx; p.y = ty + 40; p.unten = true; b.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)'; }
        else b.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
        parts.push(p);
        b.addEventListener('click', function () {
          if (fertig) return;
          if (p.intr) { ton.dur(); b.classList.add('ok'); fb.className = 'jg-fb'; fb.innerHTML = U.pinataOk(esc(wort)); ende(p); }
          else { ton.moll(); wob(b); fb.className = 'jg-fb soft'; fb.textContent = U.pinataStay; }
        });
      });
      last = 0; if (!RUHIG) raf = requestAnimationFrame(schleife);
    });
    function gefangen(p) {
      catcher.style.left = Math.max(0, Math.min(f.clientWidth - 60, p.x - 6)) + 'px';
      ton.moll();
      fb.className = 'jg-fb soft'; fb.innerHTML = U.pinataCaught(esc(d.intruso));
      p.e.classList.add('ok'); ende(p);
    }
    function ende(p) {
      fertig = true; p.weg = true;
      setTimeout(function () {
        parts.forEach(function (q) { if (!q.konf && q !== p) { q.e.style.transition = 'opacity .4s'; q.e.style.opacity = '0'; } });
        var ph = el('div', 'jg-phrase jg-pop', d.satz); root.appendChild(ph);
        var sk = sagKnopf(d.satz, opts); if (sk) root.appendChild(sk);
        if (d.intrusoDe) { var ex = el('div', 'jg-explain jg-pop'); ex.innerHTML = U.gehoertZu(esc(d.intruso), esc(d.intrusoDe)); root.appendChild(ex); }
        done(root, true);
      }, RUHIG ? 0 : 800);
    }
    return root;
  }

  /* ═══ gemeinsamer Ordnungs-Motor ═══ */
  function ordnung(woerter, ans, fb, U, beiTreffer, beiFertig) {
    var n = 0;
    return function (wort, knoten) {
      if (norm(wort) === norm(woerter[n])) {
        ans.appendChild(el('span', 'jg-pop', wort)); beiTreffer(knoten); n++;
        if (n === woerter.length) { fb.className = 'jg-fb'; fb.textContent = U.ordDone; beiFertig(); } else { fb.textContent = ''; }
        return true;
      }
      fb.className = 'jg-fb soft'; fb.textContent = n === 0 ? U.ordFirst : U.ordNext(woerter[n - 1]);
      return false;
    };
  }

  /* ═══ 2. GLOBOS ═══ */
  function globos(d, opts) {
    var U = T(opts), root = wurzel(), raf = 0, t0 = 0, fertig = false, bs = [], ton = rundenKlang();
    var woerter = woerterAus(d.satz);
    root.appendChild(el('p', 'jg-task', U.globosTask));
    var ans = el('div', 'jg-ans'); root.appendChild(ans);
    var f = el('div', 'jg-field'); root.appendChild(f);
    var fb = el('div', 'jg-fb'); root.appendChild(fb);
    var cols = ['#ffd24a', '#c7e89a', '#f7bcd8', '#9fd6e8', '#ffd0b0', '#cdbdf2'];
    var tippe = ordnung(woerter, ans, fb, U, function (o) {
      o.weg = true; o.e.style.transition = 'opacity .2s'; o.e.style.opacity = '0'; o.e.style.pointerEvents = 'none';
    }, function () {
      fertig = true; root.stop(); ton.dur();
      var ph = el('div', 'jg-phrase jg-pop', d.satz); root.appendChild(ph);
      var sk = sagKnopf(d.satz, opts); if (sk) root.appendChild(sk);
      done(root, true);
    });
    mezcla(woerter).forEach(function (wort, k) {
      var b = el('button', 'jg-bal jg-fly'); b.type = 'button';
      var bb = el('span', 'b', wort); bb.style.background = cols[k % cols.length];
      b.appendChild(bb); b.appendChild(el('span', 's')); f.appendChild(b);
      var o = { e: b, sp: .4 + Math.random() * .3, ph: Math.random() * 6, k: k, bx: 0, y: 0 };
      bs.push(o);
      b.addEventListener('click', function () {
        ton.wecken();
        if (o.weg || fertig) return;
        if (!tippe(wort, o)) { ton.moll(); b.classList.add('no'); setTimeout(function () { b.classList.remove('no'); }, 450); }
      });
    });
    function platz(o, erst) {
      var W = f.clientWidth || 300, H = f.clientHeight || 320;
      o.bx = 8 + Math.random() * Math.max(10, W - o.e.offsetWidth - 16);
      o.y = erst ? 20 + ((o.k * 67) % Math.max(60, H - 90)) : H + 10;
    }
    function schleife(ts) {
      if (!t0) t0 = ts; var t = (ts - t0) / 1000;
      bs.forEach(function (o) {
        if (o.weg) return;
        o.y -= o.sp; if (o.y < -o.e.offsetHeight) platz(o, false);
        var x = o.bx + Math.sin(t * 1.3 + o.ph) * 12;
        o.e.style.transform = 'translate(' + x + 'px,' + o.y + 'px)';
      });
      raf = requestAnimationFrame(schleife);
    }
    root.stop = function () { if (raf) cancelAnimationFrame(raf); raf = 0; };
    // Start erst, wenn das Feld Maße hat (im DOM hängt)
    function start() {
      if (!f.clientWidth) { raf = requestAnimationFrame(start); return; }
      bs.forEach(function (o) { platz(o, true); o.e.style.transform = 'translate(' + o.bx + 'px,' + o.y + 'px)'; });
      if (!RUHIG) raf = requestAnimationFrame(schleife);
    }
    raf = requestAnimationFrame(start);
    return root;
  }

  /* ═══ 3. AL PIE DE LA LETRA ═══ */
  function literal(d, opts) {
    var U = T(opts), root = wurzel();
    if (d.bild) { var bi = el('div', 'jg-bild'); bi.innerHTML = d.bild; root.appendChild(bi); }
    root.appendChild(el('div', 'jg-phrase', d.text));
    if (d.woertlich) { var lt = el('div', 'jg-lit'); lt.innerHTML = '<b>' + esc(U.woertlich) + '</b>' + esc(d.woertlich); root.appendChild(lt); }
    root.appendChild(el('p', 'jg-task', U.literalTask));
    var o = el('div', 'jg-opts'); root.appendChild(o);
    var fb = el('div', 'jg-fb'); root.appendChild(fb);
    var wahl = [d.bedeutung].concat((d.falsch || []).filter(function (x) { return x && x !== d.bedeutung; }).slice(0, 2));
    mezcla(wahl).forEach(function (x) {
      var b = el('button', 'jg-opt', x); b.type = 'button'; o.appendChild(b);
      b.addEventListener('click', function () {
        if (x === d.bedeutung) {
          b.classList.add('ok'); fb.className = 'jg-fb'; fb.textContent = U.literalOk;
          o.querySelectorAll('button').forEach(function (z) { z.disabled = true; });
          var sk = sagKnopf(d.text, opts); if (sk) root.appendChild(sk);
          done(root, true);
        } else { b.classList.add('no'); b.disabled = true; fb.className = 'jg-fb soft'; fb.textContent = U.literalNo; }
      });
    });
    return root;
  }

  /* ═══ 4. GEMELOS ═══ */
  function gemelos(paare, opts) {
    var U = T(opts), root = wurzel();
    paare = (paare || []).slice(0, 4);
    root.appendChild(el('p', 'jg-task', U.gemelosTask));
    var pr = el('div', 'jg-pairs'), L = el('div', 'jg-col'), R = el('div', 'jg-col');
    L.appendChild(el('div', 'jg-colh', U.ziel)); R.appendChild(el('div', 'jg-colh', U.mutter));
    pr.appendChild(L); pr.appendChild(R); root.appendChild(pr);
    var fb = el('div', 'jg-fb'); root.appendChild(fb);
    var selL = null, selR = null, offen = paare.length;
    function pruefe() {
      if (!selL || !selR) return;
      var a = selL, b = selR; selL = selR = null;
      if (a.i === b.i) {
        a.e.className = 'jg-pc ok'; b.e.className = 'jg-pc ok'; fb.className = 'jg-fb';
        fb.textContent = paare[a.i].z + ' = ' + paare[a.i].na;
        if (opts && typeof opts.sprich === 'function') { try { opts.sprich(paare[a.i].z); } catch (e) {} }
        if (--offen === 0) { fb.textContent = U.gemelosDone; done(root, true); }
      } else {
        [a, b].forEach(function (x) { x.e.className = 'jg-pc no'; setTimeout(function () { if (x.e.className.indexOf('ok') < 0) x.e.className = 'jg-pc'; }, 450); });
        fb.className = 'jg-fb soft'; fb.textContent = U.gemelosNo;
      }
    }
    function karte(col, txt, i, seite) {
      var e = el('button', 'jg-pc', txt); e.type = 'button'; col.appendChild(e); var o = { e: e, i: i };
      e.addEventListener('click', function () {
        if (seite === 'L') { if (selL) selL.e.className = 'jg-pc'; selL = o; } else { if (selR) selR.e.className = 'jg-pc'; selR = o; }
        e.className = 'jg-pc sel'; pruefe();
      });
    }
    paare.forEach(function (p, i) { karte(L, p.z, i, 'L'); });
    mezcla(paare.map(function (p, i) { return i; })).forEach(function (i) { karte(R, paare[i].na, i, 'R'); });
    return root;
  }

  /* ═══ Lexikon-Helfer (Garten, Akrostichon) ═══ */
  function lexIndex(liste) {
    return (liste || []).map(function (x) { return { z: x.z, tr: x.tr || '', key: norm(ohneArtikel(x.z)) }; })
      .filter(function (x) { return x.key; });
  }
  function finde(wort, idx) { var k = norm(ohneArtikel(wort)); for (var i = 0; i < idx.length; i++) if (idx[i].key === k) return idx[i]; return null; }
  function anfang(s, ziel) {
    var c = ohneArtikel(String(s || '').trim()).charAt(0).toUpperCase();
    if (ziel === 'es' && c === 'Ñ') return 'Ñ';
    return c.normalize('NFD').charAt(0);
  }

  /* ═══ 5. SPIKIUS GARTEN (ABC-Liste) ═══
     cfg = { themen:[{id,t}], woerterVon:function(id)→[{z,tr}], lexikon:[{z,tr}],
             lade:function(id)→{L:[…]}, speichere:function(id, daten), thema:id,
             beiThema:function(id) }                                          */
  function huerto(cfg, opts) {
    var U = T(opts), root = wurzel(), ziel = (opts && opts.zielLang) || 'es';
    var thema = cfg.thema || (cfg.themen[0] && cfg.themen[0].id);
    var daten = cfg.lade(thema) || {};
    var hatte = Object.keys(daten).some(function (k) { return daten[k] && daten[k].length; });
    root.appendChild(spikiuSagt(hatte ? U.gWieder : U.gIntro));
    var th = el('div', 'jg-themes');
    cfg.themen.forEach(function (x) {
      var p = el('button', 'jg-pill' + (x.id === thema ? ' on' : ''), x.t); p.type = 'button';
      p.addEventListener('click', function () { if (cfg.beiThema) cfg.beiThema(x.id); });
      th.appendChild(p);
    });
    root.appendChild(th);
    setTimeout(function () { var on = th.querySelector('.on'); if (on && on.scrollIntoView) try { on.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {} }, 30);
    var themenIdx = lexIndex(cfg.woerterVon(thema)), allesIdx = lexIndex(cfg.lexikon);
    var box = el('div', 'jg-abc'); root.appendChild(box);
    var leg = el('div', 'jg-legend');
    leg.innerHTML = '<span><i style="background:#c7e89a"></i>' + esc(U.gKnown) + '</span><span><i style="background:#fff3c4"></i>' + esc(U.gYou) + '</span><span><i style="background:#eceee9;border-style:dashed"></i>' + esc(U.gLent) + '</span>';
    root.appendChild(leg);
    var whisper = el('div', 'jg-whisper'); root.appendChild(whisper);
    var offen = null, zeilen = {};
    function sichern() { cfg.speichere(thema, daten); }
    (ABC[ziel] || ABC.es).forEach(function (L) {
      var r = el('div', 'jg-row'), b = el('button', 'jg-let', L), e = el('div', 'jg-ent');
      b.type = 'button'; b.setAttribute('aria-label', U.gWrite + ' ' + L);
      r.appendChild(b); r.appendChild(e); box.appendChild(r);
      function zeichne() {
        e.innerHTML = ''; var eintr = daten[L] || [];
        r.classList.toggle('full', eintr.length > 0);
        eintr.forEach(function (x, ix) {
          var c = el('button', 'jg-w' + (x.k ? ' known' : '') + (x.l ? ' lent' : ''), x.z); c.type = 'button'; c.title = U.gRemove;
          if (x.tr) c.appendChild(el('small', null, x.tr));
          c.addEventListener('click', function () { eintr.splice(ix, 1); sichern(); zeichne(); whisper.textContent = ''; });
          e.appendChild(c);
        });
        if (offen === L) {
          var ir = el('div', 'jg-in'), inp = el('input'); inp.id = 'jg-huerto-in'; inp.placeholder = U.gWrite + ' ' + L + ' …';
          inp.setAttribute('autocapitalize', 'off'); inp.setAttribute('autocomplete', 'off'); inp.spellcheck = false;
          var go = el('button', null, U.gPlant), saat = el('button', 'ghost', U.gSow); go.type = saat.type = 'button';
          ir.appendChild(inp); ir.appendChild(go); ir.appendChild(saat); e.appendChild(ir);
          var pflanze = function () {
            var v = inp.value.trim(); if (!v) return;
            if (anfang(v, ziel) !== L) { whisper.textContent = U.gWrong(L); return; }
            var f = finde(v, themenIdx) || finde(v, allesIdx);
            (daten[L] = daten[L] || []).push(f ? { z: f.z, tr: f.tr, k: 1 } : { z: v });
            whisper.innerHTML = f ? '<em>' + esc(f.z) + '</em> = ' + esc(f.tr) : esc(U.gUnknown);
            sichern(); zeichne();
            var ni = document.getElementById('jg-huerto-in'); if (ni) ni.focus();
          };
          go.addEventListener('click', pflanze);
          inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') pflanze(); });
          saat.addEventListener('click', function () {
            var schon = (daten[L] || []).map(function (x) { return norm(ohneArtikel(x.z)); });
            var kand = themenIdx.filter(function (x) { return anfang(x.z, ziel) === L && schon.indexOf(x.key) < 0; });
            if (!kand.length) { whisper.textContent = U.gNoSeed; return; }
            var f = kand[Math.floor(Math.random() * kand.length)];
            (daten[L] = daten[L] || []).push({ z: f.z, tr: f.tr, k: 1, l: 1 });
            sichern(); whisper.innerHTML = U.gSowed(esc(f.z), esc(f.tr)); zeichne();
          });
          setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (x) { inp.focus(); } }, 30);
        } else {
          var a = el('button', 'jg-add', '+'); a.type = 'button'; a.setAttribute('aria-label', U.gWrite + ' ' + L);
          a.addEventListener('click', oeffne); e.appendChild(a);
        }
      }
      function oeffne() {
        var vorher = offen; offen = (offen === L ? null : L); whisper.textContent = '';
        if (vorher && zeilen[vorher]) zeilen[vorher](); zeichne();
      }
      b.addEventListener('click', oeffne);
      zeilen[L] = zeichne; zeichne();
    });
    var foot = el('div', 'jg-foot'), neu = el('button', 'jg-btn ghost', U.gNew), scharf = false; neu.type = 'button';
    neu.addEventListener('click', function () {
      if (!scharf) { scharf = true; neu.textContent = U.gNewSure; return; }
      daten = {}; sichern(); if (cfg.beiThema) cfg.beiThema(thema);
    });
    foot.appendChild(neu); root.appendChild(foot);
    return root;
  }

  /* ═══ 6. AKROSTICHON ═══
     cfg = { woerter:['MAR',…], lexikon:[{z,tr}], beispiel:{wort,a:[…]}|null,
             lade:function()→[{wort,a:[{z,tr}]}], speichere:function(liste),
             entwurf:{wort, a:[…]}|null, beiEntwurf:function(entwurf|null) }   */
  function acrostico(cfg, opts) {
    var U = T(opts), root = wurzel(), idx = lexIndex(cfg.lexikon), ziel = (opts && opts.zielLang) || 'es';
    function karte(wort, a, ueber) {
      var c = el('div', 'jg-kc'); c.appendChild(el('h4', null, ueber));
      wort.split('').forEach(function (L, i) {
        c.appendChild(el('div', 'L', L));
        var x = a[i] || { z: '' }, dd = el('div', 'A', x.z || '·');
        if (x.tr) dd.appendChild(el('small', null, x.tr));
        c.appendChild(dd);
      });
      return c;
    }
    function leeren() { while (root.firstChild) root.removeChild(root.firstChild); }
    function uebersicht() {
      leeren(); if (cfg.beiEntwurf) cfg.beiEntwurf(null);
      root.appendChild(spikiuSagt(esc(U.aIntro)));
      if (cfg.beispiel) root.appendChild(karte(cfg.beispiel.wort, cfg.beispiel.a.map(function (z) { return { z: z }; }), U.aSpikiu));
      root.appendChild(el('p', 'jg-h', U.aPick));
      var ws = el('div', 'jg-words');
      (cfg.woerter || []).forEach(function (x) { var p = el('button', 'jg-pill', x); p.type = 'button'; p.addEventListener('click', function () { bauen(x, []); }); ws.appendChild(p); });
      root.appendChild(ws);
      var ir = el('div', 'jg-in'), inp = el('input'); inp.id = 'jg-acro-own'; inp.placeholder = U.aOwn; inp.maxLength = 14;
      var go = el('button', null, U.aGo); go.type = 'button'; ir.appendChild(inp); ir.appendChild(go); root.appendChild(ir);
      var eigen = function () { var v = inp.value.replace(/[^\p{L}]/gu, '').toUpperCase(); if (v.length >= 2) bauen(v, []); };
      go.addEventListener('click', eigen); inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') eigen(); });
      var alle = cfg.lade() || [];
      if (alle.length) {
        root.appendChild(el('p', 'jg-h', U.aSaved));
        var s = el('div', 'jg-words');
        alle.slice().reverse().forEach(function (k) {
          var m = el('button', 'jg-mini', k.wort); m.type = 'button';
          m.addEventListener('click', function () { zeige(k.wort, k.a, U.aYours); });
          s.appendChild(m);
        });
        root.appendChild(s);
      }
    }
    function zeige(wort, a, ueber) {
      leeren(); root.appendChild(karte(wort, a, ueber));
      var f = el('div', 'jg-foot'), nb = el('button', 'jg-btn', U.aNew); nb.type = 'button';
      nb.addEventListener('click', uebersicht); f.appendChild(nb); root.appendChild(f);
    }
    function bauen(wort, vorher) {
      leeren(); root.appendChild(spikiuSagt(esc(U.aHint)));
      var k = el('div', 'jg-kawa' + (wort.length > 7 ? ' lang' : '')), felder = [], whisper = el('div', 'jg-whisper');
      function entwurf() {
        if (cfg.beiEntwurf) cfg.beiEntwurf({ wort: wort, a: felder.map(function (x) { return x.inp.value; }) });
      }
      wort.split('').forEach(function (L, ix) {
        var line = el('div', 'jg-kl'), big = el('div', 'jg-kb', L), inp = el('input'), tr = el('span', 'tr'), h = el('button', 'hint');
        inp.id = 'jg-acro-' + ix; inp.setAttribute('autocomplete', 'off'); inp.spellcheck = false; inp.setAttribute('aria-label', L);
        inp.value = (vorher && vorher[ix]) || '';
        var f0 = inp.value ? finde(inp.value, idx) : null; if (f0) tr.textContent = f0.tr;
        h.type = 'button'; h.innerHTML = SPIKIU; h.setAttribute('aria-label', U.gSow);
        h.addEventListener('click', function () {
          var schon = felder.map(function (f) { return norm(ohneArtikel(f.inp.value)); });
          var Lb = anfang(L, ziel);
          var kand = idx.filter(function (x) { return anfang(x.z, ziel) === Lb && schon.indexOf(x.key) < 0; });
          if (!kand.length) { whisper.textContent = U.gNoSeed; return; }
          var f = kand[Math.floor(Math.random() * kand.length)];
          inp.value = f.z; tr.textContent = f.tr; whisper.innerHTML = U.gSowed(esc(f.z), esc(f.tr)); entwurf();
        });
        inp.addEventListener('input', function () { var f = finde(inp.value, idx); tr.textContent = f ? f.tr : ''; entwurf(); });
        inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { var n = felder[ix + 1]; if (n) n.inp.focus(); else inp.blur(); } });
        line.appendChild(big); line.appendChild(inp); line.appendChild(tr); line.appendChild(h); k.appendChild(line);
        felder.push({ inp: inp });
      });
      root.appendChild(k); root.appendChild(whisper);
      var foot = el('div', 'jg-foot'), fertig = el('button', 'jg-btn', U.aDone); fertig.type = 'button';
      fertig.addEventListener('click', function () {
        var a = felder.map(function (x) { var v = x.inp.value.trim(); var fd = v ? finde(v, idx) : null; return { z: v, tr: fd ? fd.tr : '' }; });
        if (!a.some(function (x) { return x.z; })) { felder[0].inp.focus(); return; }
        var alle = cfg.lade() || []; alle.push({ wort: wort, a: a }); cfg.speichere(alle.slice(-40));
        if (cfg.beiEntwurf) cfg.beiEntwurf(null);
        zeige(wort, a, U.aYours); done(root, true);
      });
      foot.appendChild(fertig); root.appendChild(foot);
      entwurf();
      setTimeout(function () { var i = felder[0] && felder[0].inp; if (i) try { i.focus({ preventScroll: true }); } catch (x) { i.focus(); } }, 30);
    }
    if (cfg.entwurf && cfg.entwurf.wort) bauen(cfg.entwurf.wort, cfg.entwurf.a || []); else uebersicht();
    return root;
  }

  // ── Daten-Helfer für die Räume ──
  // Eindringling: Inhaltswort (≥4 Buchstaben) aus einem ANDEREN Satz derselben Zielsprache.
  function eindringling(satz, andere, ziel) {
    var hier = woerterAus(satz).map(norm);
    var kand = [];
    mezcla(andere).forEach(function (s) {
      if (s === satz) return;
      woerterAus(s).forEach(function (wt, i) {
        if (wt.length < 4 || hier.indexOf(norm(wt)) > -1) return;
        var zeig = (i === 0 && ziel !== 'de') ? wt.charAt(0).toLowerCase() + wt.slice(1) : wt;
        kand.push({ wort: zeig, aus: s });
      });
    });
    return kand.length ? kand[Math.floor(Math.random() * kand.length)] : null;
  }

  w.spikiuJuegos = {
    pinata: pinata, globos: globos, literal: literal, gemelos: gemelos,
    huerto: huerto, acrostico: acrostico, klang: KLANG,
    eindringling: eindringling, woerterAus: woerterAus, mezcla: mezcla, css: ensureCss,
    spikiuSvg: SPIKIU, ABC: ABC
  };
})(window);
