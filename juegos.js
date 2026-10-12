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
      kIntro: 'Ich fange an. Dein Wort beginnt mit dem letzten Buchstaben von meinem und gehört zum Thema. Hängst du, hilft dir Spikiu Buchstabe für Buchstabe.',
      kDein: function (L) { return 'Dein Wort mit <b>' + L + '</b> …'; }, kSpikiu: 'Spikiu ist dran …', kDazu: 'dazu',
      kNichtL: function (L) { return 'Das beginnt nicht mit ' + L + '.'; },
      kNichtFeld: function (x) { return '<em>' + x + '</em> passt nicht zum Thema. Noch eins?'; },
      kSchon: function (x) { return '<em>' + x + '</em> hängt schon in der Kette.'; },
      kGut: function (x, t) { return '¡Bien! <em>' + x + '</em> = ' + t; },
      kEnde: function (L) { return 'Mit ' + L + ' fällt mir nichts ein. Die Kette gehört dir!'; },
      kVorletzt: function (L, V) { return 'Mit <b>' + L + '</b> geht nichts, nimm den vorletzten: <b>' + V + '</b>'; },
      oTask: 'Hör gut zu und tipp das richtige Bild.', oHoer: '🔊 Anhören',
      oFalsch: function (x) { return 'Das ist <em>' + x + '</em>. Hör noch einmal.'; },
      gTask: 'Wo liegt der Schlag? Hör zu und tipp die starke Silbe.', gKlatsch: '👏 Spikiu klatscht',
      gFalsch: 'Nicht ganz. Hör noch einmal hin.', gTilde: ' · die Tilde zeigt den Schlag', gTonos: ' · der Tonos (´) zeigt den Schlag',
      mTask: 'In welchen Korb gehört das Wort?', mFalsch: function (x) { return '<em>' + x + '</em> gehört in den anderen Korb.'; },
      mFertig: 'Alle Wörter liegen im richtigen Korb.',
      meTask: 'Deck zwei Karten auf: Wort und Bild gehören zusammen.', meFertig: 'Alle Paare gefunden.',
      aIntro: 'So sieht ein Akrostichon aus. Zu jedem Buchstaben ein Wort, das zum Thema passt.',
      aPick: 'Wähl ein Wort', aThema: 'Thema',
      aHint: 'Jedes Wort zählt, das zum Thema passt — auch aus dem Umfeld (Essen, Unterwegs …). Hängst du? Tipp auf Spikiu: Er verrät Buchstabe für Buchstabe.', aDone: 'Fertig',
      aNichtFeld: function (x, th) { return '<em>' + x + '</em> passt nicht zum Thema „' + th + '". Such ein anderes.'; },
      aRaus: 'Wörter, die nicht zum Thema passen, bleiben draußen.', aKeine: 'Für dieses Thema habe ich gerade kein Wort. Wähl ein anderes Thema.',
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
      kIntro: 'Empiezo yo. Tu palabra empieza por la última letra de la mía y tiene que ver con el tema. Si te atascas, Spikiu te ayuda letra a letra.',
      kDein: function (L) { return 'Tu palabra con <b>' + L + '</b> …'; }, kSpikiu: 'Le toca a Spikiu …', kDazu: 'añadir',
      kNichtL: function (L) { return 'No empieza por ' + L + '.'; },
      kNichtFeld: function (x) { return '<em>' + x + '</em> no tiene que ver con el tema. ¿Otra?'; },
      kSchon: function (x) { return '<em>' + x + '</em> ya está en la cadena.'; },
      kGut: function (x, t) { return '¡Bien! <em>' + x + '</em> = ' + t; },
      kEnde: function (L) { return 'Con ' + L + ' no se me ocurre nada. ¡La cadena es tuya!'; },
      kVorletzt: function (L, V) { return 'Con <b>' + L + '</b> no hay nada, toma la penúltima: <b>' + V + '</b>'; },
      oTask: 'Escucha bien y toca la imagen correcta.', oHoer: '🔊 Escuchar',
      oFalsch: function (x) { return 'Eso es <em>' + x + '</em>. Escucha otra vez.'; },
      gTask: '¿Dónde cae el golpe? Escucha y toca la sílaba fuerte.', gKlatsch: '👏 Spikiu da palmas',
      gFalsch: 'Casi. Escucha otra vez.', gTilde: ' · la tilde marca el golpe', gTonos: ' · el tonos (´) marca el golpe',
      mTask: '¿En qué cesta va la palabra?', mFalsch: function (x) { return '<em>' + x + '</em> va en la otra cesta.'; },
      mFertig: 'Todas las palabras están en su cesta.',
      meTask: 'Destapa dos cartas: palabra e imagen van juntas.', meFertig: 'Todas las parejas encontradas.',
      aIntro: 'Así es un acróstico. Para cada letra, una palabra que tenga que ver con el tema.',
      aPick: 'Elige una palabra', aThema: 'Tema',
      aHint: 'Vale toda palabra que tenga que ver con el tema, también de su entorno (comida, viajes …). ¿Atascado? Toca a Spikiu: te da la palabra letra a letra.', aDone: 'Listo',
      aNichtFeld: function (x, th) { return '<em>' + x + '</em> no tiene que ver con «' + th + '». Busca otra.'; },
      aRaus: 'Las palabras que no son del tema se quedan fuera.', aKeine: 'Para este tema no tengo palabra ahora. Elige otro tema.',
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
      kIntro: 'I start. Your word begins with the last letter of mine and fits the topic. If you get stuck, Spikiu helps letter by letter.',
      kDein: function (L) { return 'Your word with <b>' + L + '</b> …'; }, kSpikiu: 'Spikiu\u2019s turn …', kDazu: 'add',
      kNichtL: function (L) { return 'That doesn\u2019t start with ' + L + '.'; },
      kNichtFeld: function (x) { return '<em>' + x + '</em> doesn\u2019t fit the topic. Another one?'; },
      kSchon: function (x) { return '<em>' + x + '</em> is already in the chain.'; },
      kGut: function (x, t) { return 'Nice! <em>' + x + '</em> = ' + t; },
      kEnde: function (L) { return 'I can\u2019t think of anything with ' + L + '. The chain is yours!'; },
      kVorletzt: function (L, V) { return 'Nothing with <b>' + L + '</b>, take the one before: <b>' + V + '</b>'; },
      oTask: 'Listen closely and tap the right picture.', oHoer: '🔊 Listen',
      oFalsch: function (x) { return 'That\u2019s <em>' + x + '</em>. Listen again.'; },
      gTask: 'Where is the beat? Listen and tap the strong syllable.', gKlatsch: '👏 Spikiu claps',
      gFalsch: 'Not quite. Listen again.', gTilde: ' · the accent mark shows the beat', gTonos: ' · the tonos (´) shows the beat',
      mTask: 'Which basket does the word go in?', mFalsch: function (x) { return '<em>' + x + '</em> goes in the other basket.'; },
      mFertig: 'Every word is in the right basket.',
      meTask: 'Turn over two cards: word and picture belong together.', meFertig: 'All pairs found.',
      aIntro: 'This is an acrostic. For each letter, a word that fits the topic.',
      aPick: 'Pick a word', aThema: 'Topic',
      aHint: 'Any word that fits the topic counts, its wider field too (food, travel …). Stuck? Tap Spikiu: he reveals the word letter by letter.', aDone: 'Done',
      aNichtFeld: function (x, th) { return '<em>' + x + '</em> doesn\u2019t fit \u201c' + th + '\u201d. Try another one.'; },
      aRaus: 'Words that don\u2019t fit the topic stay out.', aKeine: 'I have no word for this topic right now. Pick another topic.',
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
    '.jg-trans{font:italic 500 1rem/1.4 "DM Sans",sans-serif;color:var(--jg-mid);margin-top:-.4rem;text-wrap:balance}',
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
    '.jg-kl.ok input{border-bottom-color:var(--jg-ok2)}.jg-kl.ok .jg-kb{background:var(--jg-ok)}',
    '.jg-kl.aus input{border-bottom-color:var(--jg-warn);color:var(--jg-warn)}',
    '.jg-kl.lent input{border-bottom-style:dashed}',
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
    /* Spielzimmer II (11.10.) */
    '.jg-kette{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center}',
    '.jg-glied{border:2.5px solid var(--jg-ink);border-radius:14px;padding:.3rem .7rem;font:600 1.1rem/1.2 Lora,Georgia,serif;display:inline-flex;flex-direction:column;align-items:center;box-shadow:2px 3px 0 var(--jg-ink)}',
    '.jg-glied small{font:500 .7rem "DM Sans",sans-serif;color:var(--jg-mid)}',
    '.jg-glied.spikiu{background:var(--jg-acc2)}.jg-glied.du{background:var(--jg-yel2)}',
    '.jg-link{color:var(--jg-mid);font-weight:800}',
    '.jg-muster{font:500 .95rem "DM Mono",monospace;color:var(--jg-mid);min-height:1.3em;letter-spacing:.08em}',
    '.jg-hilfe{display:flex;align-items:center;justify-content:center;gap:.7rem;width:100%}',
    '.jg-hintbtn{width:2.75rem;height:2.75rem;border-radius:50%;border:2px solid var(--jg-ink);background:#fff;padding:0;display:grid;place-items:center;cursor:pointer;flex:none}',
    '.jg-hintbtn svg{width:1.9rem;height:1.9rem}',
    '.jg-bilder{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%}',
    '.jg-bild2{background:#fff;border:2.5px solid var(--jg-ink);border-radius:18px;box-shadow:3px 4px 0 var(--jg-ink);padding:10px;cursor:pointer;aspect-ratio:1/1;display:grid;place-items:center;max-width:100%}',
    '.jg-bild2 img{width:72%;height:auto}.jg-bild2.ok{background:var(--jg-ok)}.jg-bild2.no{background:var(--jg-warn2);border-color:var(--jg-warn);opacity:.6}',
    '.jg-silben{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}',
    '.jg-silbe{min-width:4rem;padding:.7rem .8rem;border:2.5px solid var(--jg-ink);border-radius:16px;background:#fff;box-shadow:3px 4px 0 var(--jg-ink);font:600 1.5rem Lora,Georgia,serif;cursor:pointer}',
    '.jg-silbe.ok{background:var(--jg-yel);transform:translateY(-4px)}.jg-silbe.no{background:var(--jg-warn2);border-color:var(--jg-warn)}.jg-silbe.klopf{background:var(--jg-acc2)}',
    '.jg-loesung{font:600 1.6rem Lora,Georgia,serif}.jg-loesung b{color:var(--jg-acc);font-weight:700;text-decoration:underline;text-underline-offset:.2em}',
    '.jg-ware{font:600 1.9rem Lora,Georgia,serif;border:2.5px solid var(--jg-ink);border-radius:18px;padding:.7rem 1.2rem;background:var(--jg-yel2);box-shadow:3px 4px 0 var(--jg-ink)}',
    '.jg-koerbe{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}',
    '.jg-korb{background:#fff;border:2.5px solid var(--jg-ink);border-radius:14px 14px 28px 28px;box-shadow:3px 4px 0 var(--jg-ink);padding:10px 8px;cursor:pointer;min-height:8rem;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}',
    '.jg-korb .inhalt{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.jg-korb .inhalt span{font:500 .8rem Lora,Georgia,serif;background:var(--jg-ok);border-radius:8px;padding:1px 6px}',
    '.jg-korb.no{border-color:var(--jg-warn);background:var(--jg-warn2)}',
    '.jg-memo{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:100%}',
    '.jg-mk{aspect-ratio:3/4;border:2.5px solid var(--jg-ink);border-radius:12px;box-shadow:2px 3px 0 var(--jg-ink);background:var(--jg-acc);cursor:pointer;display:grid;place-items:center;padding:4px;font:600 .9rem/1.15 Lora,Georgia,serif;max-width:100%;overflow:hidden;overflow-wrap:anywhere}',
    '.jg-mk .rueck{color:#fff;font:800 1.4rem "DM Sans",sans-serif}.jg-mk.auf{background:#fff}.jg-mk.paar{background:var(--jg-ok);cursor:default}.jg-mk img{width:80%}',
    '.jg-wob{animation:jgWob .4s}',
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
    var PFAD = { dur: '/audio/spiel/dur.wav', moll: '/audio/spiel/moll.wav', paarFalsch: '/audio/spiel/paar-falsch.wav' };
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
    return { vorladen: vorladen, wecken: wecken, spiele: spiele, kontext: kontext };
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

  // Leo 10.10.: nach jedem Wurf die Übersetzung in der Muttersprache — festigt oder klärt.
  function uebersetzung(root, tr) { if (tr) root.appendChild(el('div', 'jg-trans jg-pop', tr)); }
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
    var catcher = el('div', 'jg-catch'); catcher.innerHTML = SPIKIU; catcher.style.left = 'calc(100% - 66px)'; f.appendChild(catcher);
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
        var ph = el('div', 'jg-phrase jg-pop', d.satz); root.appendChild(ph); uebersetzung(root, d.tr);
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
      var ph = el('div', 'jg-phrase jg-pop', d.satz); root.appendChild(ph); uebersetzung(root, d.tr);
      var sk = sagKnopf(d.satz, opts); if (sk) root.appendChild(sk);
      done(root, true);
    });
    mezcla(woerter).forEach(function (wort, k) {
      var b = el('button', 'jg-bal jg-fly'); b.type = 'button';
      var bb = el('span', 'b', wort); bb.style.background = cols[k % cols.length];
      b.appendChild(bb); b.appendChild(el('span', 's')); f.appendChild(b);
      var o = { e: b, sp: .55 + Math.random() * .35, ph: Math.random() * 6, k: k, bx: 0, y: 0 };
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
    var U = T(opts), root = wurzel(), mitKlang = !!(opts && opts.klang);
    if (mitKlang) KLANG.vorladen();
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
        if (mitKlang) KLANG.spiele('paarFalsch');   // Leo 02.10.: falsches Paar klingt, richtiges (grün) bleibt still
        [a, b].forEach(function (x) { x.e.className = 'jg-pc no'; setTimeout(function () { if (x.e.className.indexOf('ok') < 0) x.e.className = 'jg-pc'; }, 450); });
        fb.className = 'jg-fb soft'; fb.textContent = U.gemelosNo;
      }
    }
    function karte(col, txt, i, seite) {
      var e = el('button', 'jg-pc', txt); e.type = 'button'; col.appendChild(e); var o = { e: e, i: i };
      e.addEventListener('click', function () {
        if (mitKlang) KLANG.wecken();
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

  /* ═══ 6. AKROSTICHON (Umbau 10.10., Leo) ═══
     Nur Wörter aus dem THEMA zählen (wortfelder.js), egal welche Stufe.
     Spikiu bietet nur lösbare Wörter an (zu jedem Buchstaben gibt es ein
     Feldwort) und hilft Buchstabe für Buchstabe: erst „s _ _", dann „sa _",
     dann „sal". Hat der Lerner schon angefangen, folgt die Hilfe seinem
     Anfang. Hilfen nehmen zuerst Wörter bis zur Stufe des Lerners.
     cfg = { themen:[{id,t}], thema, feldVon:function(id)→[{z,tr,stufe}],
             stufe:1|2, lade, speichere, entwurf:{thema,wort,a}|null,
             beiEntwurf:function(e|null), beiThema:function(id) }          */
  function acrostico(cfg, opts) {
    var U = T(opts), root = wurzel(), ziel = (opts && opts.zielLang) || 'es';
    var stufe = cfg.stufe || 1;
    var thema = (cfg.entwurf && cfg.entwurf.thema) || cfg.thema || (cfg.themen[0] && cfg.themen[0].id);
    var themaTitel = (cfg.themen.filter(function (x) { return x.id === thema; })[0] || {}).t || thema;
    themaTitel = String(themaTitel).replace(/^[^\p{L}]+/u, '');   // ohne Emoji im Fließtext
    var aufbereiten = function (liste) { return (liste || []).map(function (x) { return { z: x.z, tr: x.tr || '', stufe: x.stufe || 3, key: norm(ohneArtikel(x.z)), nackt: ohneArtikel(x.z) }; })
      .filter(function (x) { return x.key; }); };
    // feld = das gewählte Thema (Wortwahl, erste Hilfen) · bereich = die Oberkategorie (was ZÄHLT)
    var themaFeld = aufbereiten(cfg.feldVon(thema));
    var feld = cfg.bereichVon ? aufbereiten(cfg.bereichVon(thema)) : themaFeld;
    // Formtoleranz (Leo 10.10.: „oliva o olivas"): Plural und o/a-Endung — aber
    // NIE bloß ein abgeschnittener Stamm („sol" ist nicht „solo").
    var ENDUNGEN = { es: ['s', 'es'], en: ['s', 'es'], de: ['e', 'en', 'n', 'er', 's', 'nen'], el: [] };
    function gleicheForm(k, f, stufe2) {
      if (k === f) return true;
      var e = ENDUNGEN[ziel] || [], i;
      if (!stufe2) {   // 1. Durchgang: Plural (olivas → oliva)
        for (i = 0; i < e.length; i++) if (k === f + e[i] || f === k + e[i]) return true;
        if (ziel === 'en' && (k.replace(/ies$/, 'y') === f || f.replace(/ies$/, 'y') === k)) return true;
        return false;
      }
      if (ziel === 'es') {   // fría ↔ frío, frías ↔ fríos
        var ks = k.replace(/s$/, ''), fs = f.replace(/s$/, '');
        if (ks.length === fs.length && ks.length > 3 && ks.slice(0, -1) === fs.slice(0, -1) && /[oa]$/.test(ks) && /[oa]$/.test(fs)) return true;
      }
      if (ziel === 'el') {   // griechische Endungen: gleicher Stamm, höchstens 2 Zeichen Unterschied
        var r = /(ους|ος|ου|οι|ων|ες|ας|ης|α|η|ο|ι|ε|ς)$/, ks2 = k.replace(r, ''), fs2 = f.replace(r, '');
        if (ks2.length >= 3 && ks2 === fs2 && Math.abs(k.length - f.length) <= 2) return true;
      }
      return false;
    }
    function buchstabe(L) { var c = String(L).toUpperCase(); return (ziel === 'es' && c === 'Ñ') ? 'Ñ' : c.normalize('NFD').charAt(0); }
    function imFeld(wort) {
      var k = norm(ohneArtikel(wort)), i;
      for (i = 0; i < feld.length; i++) if (feld[i].key === k) return feld[i];
      for (i = 0; i < feld.length; i++) if (gleicheForm(k, feld[i].key, false)) return feld[i];
      for (i = 0; i < feld.length; i++) if (gleicheForm(k, feld[i].key, true)) return feld[i];
      return null;
    }
    function mitBuchstabe(L, ohne) { var Lb = buchstabe(L); return feld.filter(function (x) { return anfang(x.z, ziel) === Lb && (!ohne || x.key !== ohne); }); }
    function vorrat(L, ohne) {
      var Lb = buchstabe(L), imThema = themaFeld.filter(function (x) { return anfang(x.z, ziel) === Lb && (!ohne || x.key !== ohne); });
      var stufig = function (a) { var n = a.filter(function (x) { return x.stufe <= stufe; }); return n; };
      return stufig(imThema).length ? stufig(imThema) : (stufig(mitBuchstabe(L, ohne)).length ? stufig(mitBuchstabe(L, ohne)) : (imThema.length ? imThema : mitBuchstabe(L, ohne)));
    }
    function loesbar(nackt) { var k = norm(nackt); return nackt.split('').every(function (L) { return mitBuchstabe(L, k).length > 0; }); }
    function kandidaten() {
      var gut = function (x) { return /^\p{L}{3,7}$/u.test(x.nackt) && loesbar(x.nackt); };
      var nah = themaFeld.filter(function (x) { return x.stufe <= stufe && gut(x); });
      if (nah.length < 4) nah = themaFeld.filter(gut);
      if (nah.length < 4) nah = feld.filter(function (x) { return x.stufe <= stufe && gut(x); });
      var seen = {}; return mezcla(nah).filter(function (x) { var K = gross(x.nackt); if (seen[K]) return false; seen[K] = 1; return true; });
    }
    // Großschreibung: Griechisch ohne Tonos (Konvention für Versalien)
    function gross(x) { var g = String(x).toUpperCase(); return ziel === 'el' ? g.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : g; }
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
    function themenLeiste() {
      var th = el('div', 'jg-themes');
      cfg.themen.forEach(function (x) {
        var p = el('button', 'jg-pill' + (x.id === thema ? ' on' : ''), x.t); p.type = 'button';
        p.addEventListener('click', function () { if (cfg.beiThema) cfg.beiThema(x.id); });
        th.appendChild(p);
      });
      setTimeout(function () { var on = th.querySelector('.on'); if (on && on.scrollIntoView) try { on.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {} }, 30);
      return th;
    }
    function uebersicht() {
      leeren(); if (cfg.beiEntwurf) cfg.beiEntwurf(null);
      root.appendChild(spikiuSagt(esc(U.aIntro)));
      root.appendChild(el('p', 'jg-h', U.aThema));
      root.appendChild(themenLeiste());
      var kand = kandidaten();
      if (!kand.length) { root.appendChild(el('div', 'jg-whisper', U.aKeine)); return; }
      // Spikius Beispiel: ein lösbares Wort, gefüllt aus dem Feld (Stufe des Lerners zuerst)
      var bsp = kand[0], benutzt = [bsp.key];
      var bspA = bsp.nackt.split('').map(function (L) {
        var v = vorrat(L, bsp.key).filter(function (x) { return benutzt.indexOf(x.key) < 0; });
        if (!v.length) v = mitBuchstabe(L, bsp.key).filter(function (x) { return benutzt.indexOf(x.key) < 0; });
        if (!v.length) v = mitBuchstabe(L, bsp.key);
        var f = v[Math.floor(Math.random() * v.length)]; benutzt.push(f.key); return { z: f.z, tr: f.tr };
      });
      root.appendChild(karte(gross(bsp.nackt), bspA, U.aSpikiu + ' · ' + themaTitel));
      root.appendChild(el('p', 'jg-h', U.aPick));
      var ws = el('div', 'jg-words');
      kand.slice(1, 7).forEach(function (x) {
        var p = el('button', 'jg-pill', gross(x.nackt)); p.type = 'button';
        p.addEventListener('click', function () { bauen(gross(x.nackt), []); });
        ws.appendChild(p);
      });
      root.appendChild(ws);
      var alle = cfg.lade() || [];
      if (alle.length) {
        root.appendChild(el('p', 'jg-h', U.aSaved));
        var s = el('div', 'jg-words');
        alle.slice().reverse().forEach(function (k) {
          var m = el('button', 'jg-mini', k.wort); m.type = 'button';
          m.addEventListener('click', function () { zeige(k.wort, k.a, U.aYours + (k.titel ? ' · ' + k.titel : '')); });
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
      var wortKey = norm(wort);
      function entwurf() { if (cfg.beiEntwurf) cfg.beiEntwurf({ thema: thema, wort: wort, a: felder.map(function (x) { return x.inp.value; }) }); }
      function bewerte(fx, laut) {
        var v = fx.inp.value.trim(); fx.line.classList.remove('ok', 'aus');
        if (!v) { fx.tr.textContent = ''; return null; }
        if (anfang(v, ziel) !== buchstabe(fx.L)) { fx.tr.textContent = ''; if (laut) whisper.innerHTML = esc(U.gWrong(fx.L)); return null; }
        var f = imFeld(v);
        if (f && f.key !== wortKey) { fx.line.classList.add('ok'); fx.tr.textContent = f.tr; return f; }
        fx.line.classList.add('aus'); fx.tr.textContent = '';
        if (laut) whisper.innerHTML = U.aNichtFeld(esc(v), esc(themaTitel));
        return null;
      }
      wort.split('').forEach(function (L, ix) {
        var line = el('div', 'jg-kl'), big = el('div', 'jg-kb', L), inp = el('input'), tr = el('span', 'tr'), h = el('button', 'hint');
        inp.id = 'jg-acro-' + ix; inp.setAttribute('autocomplete', 'off'); inp.setAttribute('autocapitalize', 'off'); inp.spellcheck = false; inp.setAttribute('aria-label', L);
        inp.value = (vorher && vorher[ix]) || '';
        var fx = { L: L, inp: inp, tr: tr, line: line, ziel: null, k: 0 };
        h.type = 'button'; h.innerHTML = SPIKIU; h.setAttribute('aria-label', U.gSow);
        // Buchstabe für Buchstabe — folgt dem, was schon dasteht
        h.addEventListener('click', function () {
          var getippt = norm(ohneArtikel(inp.value));
          var schon = felder.filter(function (o) { return o !== fx; }).map(function (o) { return norm(ohneArtikel(o.inp.value)); });
          var passt = function (x) { return norm(x.nackt).indexOf(getippt) === 0 && schon.indexOf(x.key) < 0; };
          if (!fx.ziel || !passt(fx.ziel)) {
            var v = vorrat(L, wortKey).filter(passt);
            if (!v.length) v = mitBuchstabe(L, wortKey).filter(passt);
            if (!v.length && getippt) { v = vorrat(L, wortKey).filter(function (x) { return schon.indexOf(x.key) < 0; }); getippt = ''; }
            if (!v.length) { whisper.textContent = U.gNoSeed; return; }
            fx.ziel = v[Math.floor(Math.random() * v.length)]; fx.k = 0;
          }
          var nackt = fx.ziel.nackt;
          fx.k = Math.max(fx.k + 1, getippt.length + 1);
          if (fx.k >= nackt.length) {
            inp.value = nackt; fx.line.classList.add('lent'); bewerte(fx, false);
            whisper.innerHTML = U.gSowed(esc(fx.ziel.z), esc(fx.ziel.tr));
          } else {
            inp.value = nackt.slice(0, fx.k);
            tr.textContent = nackt.slice(0, fx.k) + ' ' + new Array(nackt.length - fx.k + 1).join('_ ').trim();
            fx.line.classList.remove('ok', 'aus');
            whisper.textContent = '';
          }
          entwurf();
          try { inp.focus({ preventScroll: true }); } catch (x) { inp.focus(); }
        });
        inp.addEventListener('input', function () { fx.line.classList.remove('lent'); bewerte(fx, false); entwurf(); });
        inp.addEventListener('blur', function () { if (inp.value.trim()) bewerte(fx, true); });
        inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { bewerte(fx, true); var n = felder[ix + 1]; if (n) n.inp.focus(); else inp.blur(); } });
        line.appendChild(big); line.appendChild(inp); line.appendChild(tr); line.appendChild(h); k.appendChild(line);
        felder.push(fx);
        if (inp.value) bewerte(fx, false);
      });
      root.appendChild(k); root.appendChild(whisper);
      var foot = el('div', 'jg-foot'), fertig = el('button', 'jg-btn', U.aDone); fertig.type = 'button';
      fertig.addEventListener('click', function () {
        var raus = false;
        var a = felder.map(function (x) { var f = bewerte(x, false); if (!f && x.inp.value.trim()) raus = true; return f ? { z: x.inp.value.trim(), tr: f.tr } : { z: '', tr: '' }; });
        if (!a.some(function (x) { return x.z; })) { whisper.textContent = raus ? U.aRaus : ''; felder[0].inp.focus(); return; }
        var alle = cfg.lade() || []; alle.push({ wort: wort, a: a, thema: thema, titel: themaTitel }); cfg.speichere(alle.slice(-40));
        if (cfg.beiEntwurf) cfg.beiEntwurf(null);
        zeige(wort, a, U.aYours + ' · ' + themaTitel);
        if (raus) root.insertBefore(el('div', 'jg-whisper', U.aRaus), root.lastChild);
        done(root, true);
      });
      foot.appendChild(fertig); root.appendChild(foot);
      entwurf();
      setTimeout(function () { var i = felder[0] && felder[0].inp; if (i) try { i.focus({ preventScroll: true }); } catch (x) { i.focus(); } }, 30);
    }
    if (cfg.entwurf && cfg.entwurf.wort) bauen(cfg.entwurf.wort, cfg.entwurf.a || []); else uebersicht();
    return root;
  }

  /* ═══════════ SPIELZIMMER II (Leo 10./11.10.: alle fünf abgenommen) ═══════════ */
  function wobble(n) { n.classList.remove('jg-wob'); void n.offsetWidth; n.classList.add('jg-wob'); }
  function sprichOpt(opts, t) { if (opts && typeof opts.sprich === 'function') { try { opts.sprich(t); } catch (e) {} } }
  // Erkennung wie im Akrostichon: exakt, dann Plural, dann o/a bzw. griechische Endung
  function erkenner(ziel, liste) {
    var feld = (liste || []).map(function (x) { return { z: x.z, tr: x.tr || '', stufe: x.stufe || 3, key: norm(ohneArtikel(x.z)), nackt: ohneArtikel(x.z) }; }).filter(function (x) { return x.key; });
    var END = { es: ['s', 'es'], en: ['s', 'es'], de: ['e', 'en', 'n', 'er', 's', 'nen'], el: [] }[ziel] || [];
    function form(k, f, zwei) {
      if (k === f) return true; var i;
      if (!zwei) { for (i = 0; i < END.length; i++) if (k === f + END[i] || f === k + END[i]) return true;
        return ziel === 'en' && (k.replace(/ies$/, 'y') === f || f.replace(/ies$/, 'y') === k); }
      if (ziel === 'es') { var ks = k.replace(/s$/, ''), fs = f.replace(/s$/, ''); return ks.length === fs.length && ks.length > 3 && ks.slice(0, -1) === fs.slice(0, -1) && /[oa]$/.test(ks) && /[oa]$/.test(fs); }
      if (ziel === 'el') { var r = /(ους|ος|ου|οι|ων|ες|ας|ης|α|η|ο|ι|ε|ς)$/, a = k.replace(r, ''), b = f.replace(r, ''); return a.length >= 3 && a === b && Math.abs(k.length - f.length) <= 2; }
      return false;
    }
    return {
      feld: feld,
      finde: function (w) { var k = norm(ohneArtikel(w)), i; for (i = 0; i < feld.length; i++) if (feld[i].key === k) return feld[i];
        for (i = 0; i < feld.length; i++) if (form(k, feld[i].key)) return feld[i]; for (i = 0; i < feld.length; i++) if (form(k, feld[i].key, true)) return feld[i]; return null; }
    };
  }
  function letzter(w) { var k = norm(ohneArtikel(w)).replace(/[^\p{L}]/gu, ''); return k.charAt(k.length - 1).toUpperCase(); }

  /* ── ENCADENADO: Wortkette mit Spikiu ──
     cfg = { feld:[{z,tr,stufe}] (Oberkategorie des Themas), stufe:1|2, start:[…] } */
  function encadenado(cfg, opts) {
    var U = T(opts), root = wurzel(), ziel = (opts && opts.zielLang) || 'es', stufe = cfg.stufe || 1, ton = rundenKlang();
    var E = erkenner(ziel, cfg.feld), benutzt = [], L = '', hz = null, hk = 0;
    root.appendChild(spikiuSagt(esc(U.kIntro)));
    var k = el('div', 'jg-kette'); root.appendChild(k);
    var task = el('p', 'jg-task'); root.appendChild(task);
    var muster = el('div', 'jg-muster');
    // Leo 11.10.: Spikiu-Hilfe nicht in die Eingabezeile quetschen — eigene Zeile über dem Feld
    var hilfe = el('div', 'jg-hilfe'), h = el('button', 'jg-hintbtn'); h.type = 'button'; h.innerHTML = SPIKIU; h.setAttribute('aria-label', U.gSow);
    hilfe.appendChild(muster); hilfe.appendChild(h); root.appendChild(hilfe);
    var ir = el('div', 'jg-in'), inp = el('input'); inp.id = 'jg-kette-in'; inp.setAttribute('autocomplete', 'off'); inp.setAttribute('autocapitalize', 'off'); inp.spellcheck = false;
    var go = el('button', null, U.kDazu); go.type = 'button';
    ir.appendChild(inp); ir.appendChild(go); root.appendChild(ir);
    var fb = el('div', 'jg-fb'); root.appendChild(fb);
    function kand(B) { return E.feld.filter(function (x) { return anfang(x.z, ziel) === B && benutzt.indexOf(x.key) < 0 && /^[\p{L} ]+$/u.test(x.nackt); }); }
    function nah(v) { var n = v.filter(function (x) { return x.stufe <= stufe; }); return n.length ? n : v; }
    function glied(x, wer) { if (k.children.length) k.appendChild(el('span', 'jg-link', '→')); var g = el('span', 'jg-glied jg-pop ' + wer); g.appendChild(el('span', null, x.nackt)); if (x.tr) g.appendChild(el('small', null, x.tr)); k.appendChild(g); benutzt.push(x.key); }
    function frage(x) {
      L = letzter(x.z); hz = null; hk = 0; muster.textContent = ''; inp.value = '';
      if (!kand(L).length) { var V = norm(x.nackt).replace(/[^\p{L}]/gu, ''); V = V.charAt(V.length - 2).toUpperCase(); task.innerHTML = U.kVorletzt(esc(letzter(x.z)), esc(V)); L = V; }
      else task.innerHTML = U.kDein(esc(L));
      try { inp.focus({ preventScroll: true }); } catch (e) {}
    }
    function spikiuZug(B) {
      var v = nah(kand(B));
      if (!v.length) { fb.className = 'jg-fb'; fb.textContent = U.kEnde(B); ton.dur(); inp.disabled = go.disabled = h.disabled = true; done(root, true); return; }
      var x = v[Math.floor(Math.random() * v.length)]; glied(x, 'spikiu'); sprichOpt(opts, x.z); frage(x);
    }
    function pruefe() {
      ton.wecken(); var v = inp.value.trim(); if (!v) return;
      if (anfang(v, ziel) !== L) { ton.moll(); fb.className = 'jg-fb soft'; fb.textContent = U.kNichtL(L); wobble(inp); return; }
      var f = E.finde(v);
      if (!f) { ton.moll(); fb.className = 'jg-fb soft'; fb.innerHTML = U.kNichtFeld(esc(v)); wobble(inp); return; }
      if (benutzt.indexOf(f.key) > -1) { fb.className = 'jg-fb soft'; fb.innerHTML = U.kSchon(esc(f.nackt)); return; }
      ton.dur(); fb.className = 'jg-fb'; fb.innerHTML = U.kGut(esc(f.nackt), esc(f.tr)); glied(f, 'du');
      task.textContent = U.kSpikiu; done(root, true);
      setTimeout(function () { spikiuZug(letzter(f.z)); }, 900);
    }
    go.addEventListener('click', pruefe);
    inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') pruefe(); });
    h.addEventListener('click', function () {
      var get = norm(ohneArtikel(inp.value));
      if (!hz || norm(hz.nackt).indexOf(get) !== 0) { var v = kand(L).filter(function (x) { return norm(x.nackt).indexOf(get) === 0; }); if (!v.length) v = kand(L); v = nah(v); if (!v.length) { fb.textContent = U.gNoSeed; return; } hz = v[Math.floor(Math.random() * v.length)]; hk = 0; }
      var w = hz.nackt; hk = Math.max(hk + 1, get.length + 1);
      if (hk >= w.length) { inp.value = w; muster.textContent = hz.tr; } else { inp.value = w.slice(0, hk); muster.textContent = w.slice(0, hk) + ' ' + new Array(w.length - hk + 1).join('_ ').trim(); }
      try { inp.focus({ preventScroll: true }); } catch (e) {}
    });
    var start = nah(E.feld.filter(function (x) { return /^\p{L}{3,9}$/u.test(x.nackt) && kand(letzter(x.z)).length > 2; }));
    var s0 = start[Math.floor(Math.random() * start.length)] || E.feld[0];
    if (s0) { glied(s0, 'spikiu'); setTimeout(function () { sprichOpt(opts, s0.z); }, 300); frage(s0); }
    return root;
  }

  /* ── OÍDO FINO: hören, Bild tippen ── cfg = { bilder:[{z,tr,bild}] (≥4) } */
  function oido(cfg, opts) {
    var U = T(opts), root = wurzel(), ton = rundenKlang(), alle = mezcla(cfg.bilder || []);
    var ziel = alle[0], wahl = mezcla(alle.slice(0, 4)), fertig = false;
    root.appendChild(el('p', 'jg-task', U.oTask));
    var hb = el('button', 'jg-big', U.oHoer); hb.type = 'button'; hb.addEventListener('click', function () { ton.wecken(); sprichOpt(opts, ziel.z); }); root.appendChild(hb);
    var g = el('div', 'jg-bilder'); root.appendChild(g); var fb = el('div', 'jg-fb'); root.appendChild(fb);
    wahl.forEach(function (x) {
      var b = el('button', 'jg-bild2'); b.type = 'button'; b.innerHTML = '<img alt="" src="' + x.bild + '">'; g.appendChild(b);
      b.addEventListener('click', function () {
        if (fertig) return; ton.wecken();
        if (x === ziel) { fertig = true; b.classList.add('ok'); ton.dur(); fb.className = 'jg-fb'; fb.innerHTML = '<em>' + esc(x.z) + '</em> = ' + esc(x.tr); done(root, true); }
        else { ton.moll(); b.classList.add('no'); b.disabled = true; fb.className = 'jg-fb soft'; fb.innerHTML = U.oFalsch(esc(x.z)); }
      });
    });
    setTimeout(function () { sprichOpt(opts, ziel.z); }, 400);
    return root;
  }

  /* ── EL GOLPE / DER SCHLAG: Silbe mit dem Schlag (es/el Regeln, de/en silben.js) ── cfg = { woerter:[{z,tr}] }, Sprache = opts.zielLang */
  function silabas(w) {
    w = w.toLowerCase(); var V = 'aeiouáéíóúü', FU = 'aeoáéóíú', isV = function (c) { return V.indexOf(c) > -1; };
    var INS = ['pl', 'pr', 'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'tr', 'ch', 'll', 'rr', 'tl'], ch = Array.from(w), gr = [], i = 0, k;
    while (i < ch.length) { var c = ch[i];
      if (isV(c)) { var g = c; while (i + 1 < ch.length && isV(ch[i + 1])) { var a = g[g.length - 1], b = ch[i + 1]; if (FU.indexOf(a) > -1 && FU.indexOf(b) > -1) break; g += b; i++; } gr.push({ v: 1, t: g }); }
      else { var g2 = c; while (i + 1 < ch.length && !isV(ch[i + 1])) { g2 += ch[i + 1]; i++; } gr.push({ v: 0, t: g2 }); }
      i++; }
    for (k = 0; k < gr.length - 1; k++) if (!gr[k].v && /[qg]$/.test(gr[k].t) && gr[k + 1].v && /^u[eiéí]/.test(gr[k + 1].t)) { gr[k].t += 'u'; gr[k + 1].t = gr[k + 1].t.slice(1); }
    var sil = [], pre = '';
    for (k = 0; k < gr.length; k++) { var x = gr[k];
      if (!x.v) { if (!sil.length) { pre += x.t; continue; } if (!gr[k + 1]) { sil[sil.length - 1] += x.t; continue; }
        var t = x.t, sp; if (/u$/.test(t)) sp = t.length - 2; else if (t.length === 1) sp = 0; else if (t.length === 2) sp = INS.indexOf(t) > -1 ? 0 : 1; else sp = INS.indexOf(t.slice(-2)) > -1 ? t.length - 2 : t.length - 1;
        sil[sil.length - 1] += t.slice(0, sp); pre = t.slice(sp); }
      else { sil.push(pre + x.t); pre = ''; } }
    return sil;
  }
  function tonica(s) { for (var i = 0; i < s.length; i++) if (/[áéíóú]/.test(s[i])) return i; if (s.length === 1) return 0; return /[aeiouns]$/.test(s.join('')) ? s.length - 2 : s.length - 1; }
  /* ── Griechisch (12.10.): Silben nach Regel, Schlag = Silbe mit Tonos.
     Vokal-Digraphen (αι ει οι υι ου αυ ευ ηυ) bilden einen Kern, außer der erste
     Buchstabe trägt den Tonos oder der zweite ein Trema (τσά-ι, ρολό-ι).
     Synizese nur vor BETONTEM Vokal, nach γ immer, und im Präfix δια-: unbetontes ι nach Konsonant verschmilzt (παι-διά, χω-ριό); sonst Schulsilben (κα-φε-τέ-ρι-α).
     Konsonantengruppen gehen zur nächsten Silbe, wenn ein griechisches Wort so
     anfangen kann (στρ, μπ, ντ, γκ, τσ …), sonst wird geteilt (λλ, ρτ …). */
  var EL_V = 'αεηιουωάέήίόύώϊϋΐΰ', EL_TON = /[άέήίόύώΐΰ]/;
  var EL_ON = ' βγ βδ βλ βρ γδ γκ γλ γν γρ δρ θλ θν θρ κλ κν κρ κτ μν μπ ντ πλ πν πρ πτ σβ σγ σθ σκ σλ σμ σν σπ στ σφ σχ τζ τμ τρ τσ φθ φλ φν φρ φτ χθ χλ χν χρ ζβ σκλ σκρ σπλ σπρ στρ σφρ σχρ μπλ μπρ ντρ γκρ γκλ τσπ ';
  function silabasEl(w) {
    w = String(w).toLowerCase(); var ch = Array.from(w), gr = [], i = 0, k, isV = function (c) { return EL_V.indexOf(c) > -1; };
    var DI = { 'αι':1, 'ει':1, 'οι':1, 'υι':1, 'ου':1, 'αυ':1, 'ευ':1, 'ηυ':1, 'αί':1, 'εί':1, 'οί':1, 'υί':1, 'ού':1, 'αύ':1, 'εύ':1, 'ηύ':1 };
    while (i < ch.length) { var c = ch[i];
      if (isV(c)) { var g = c; while (i + 1 < ch.length && isV(ch[i + 1]) && DI[g.slice(-1) + ch[i + 1]] && g.length < 2) { g += ch[i + 1]; i++; } gr.push({ v: 1, t: g }); }
      else { var g2 = c; while (i + 1 < ch.length && !isV(ch[i + 1])) { g2 += ch[i + 1]; i++; } gr.push({ v: 0, t: g2 }); }
      i++; }
    // Vokalgruppen: weitere Vokale ohne Digraph stehen als eigene Kerne nebeneinander → aufspalten schon erledigt; Synizese:
    var kern = [];
    for (k = 0; k < gr.length; k++) {
      var x = gr[k];
      if (x.v && kern.length && kern[kern.length - 1].v) {
        var vor = kern[kern.length - 1], vork = kern[kern.length - 2];
        if ((vor.t === 'ι' || vor.t === 'ει' || vor.t === 'οι' || vor.t === 'υ') && vork && !vork.v && !EL_TON.test(vor.t) && EL_TON.test(x.t)) { vor.t += x.t; continue; }
        if ((vor.t === 'ι' || vor.t === 'υ') && vork && /γ$/.test(vork.t)) { vor.t += x.t; continue; }   // γι/γυ + Vokal = ein Laut [ʝ] (για-ούρ-τι, γυα-λιά)
        if (vor.t === 'ι' && k === 2 && vork && vork.t === 'δ' && x.t === 'α') { vor.t += x.t; continue; }   // δια- (δια-δρο-μή)
      }
      kern.push({ v: x.v, t: x.t });
    }
    var sil = [], pre = '';
    for (k = 0; k < kern.length; k++) { var y = kern[k];
      if (!y.v) { if (!sil.length) { pre += y.t; continue; } if (!kern[k + 1]) { sil[sil.length - 1] += y.t; continue; }
        var t = y.t, sp = t.length - 1;
        for (var L = Math.min(3, t.length); L >= 2; L--) if (EL_ON.indexOf(' ' + t.slice(-L) + ' ') > -1) { sp = t.length - L; break; }
        sil[sil.length - 1] += t.slice(0, sp); pre = t.slice(sp); }
      else { sil.push(pre + y.t); pre = ''; } }
    if (pre) { if (sil.length) sil[sil.length - 1] += pre; else sil.push(pre); }
    return sil;
  }
  /* Silben + Schlag für jede Zielsprache → { s:[…], t:i } oder null (dann kommt das Wort im Spiel nicht vor).
     es, el: Regeln · de, en: kuratierte Liste in silben.js (window.spikiuSilben). */
  function silbenTon(wort, sprache) {
    var w = ohneArtikel(wort); if (!w || !/^[\p{L}]+$/u.test(w)) return null;
    var s, t;
    if (sprache === 'es' || !sprache) { s = silabas(w); t = tonica(s); }
    else if (sprache === 'el') { s = silabasEl(w); t = -1; for (var i = 0; i < s.length; i++) if (EL_TON.test(s[i])) { t = i; break; } if (t < 0) { if (s.length !== 1) return null; t = 0; } }
    else {
      var D = window.spikiuSilben && window.spikiuSilben[sprache]; if (!D) return null;
      var e = D[w] || D[w.charAt(0).toUpperCase() + w.slice(1)] || D[w.toLowerCase()]; if (!e) return null;
      s = e.split('·'); t = -1; s = s.map(function (y, j) { if (y.charAt(0) === 'ˈ') { t = j; return y.slice(1); } return y; }); if (t < 0) return null;
      if (s.join('').toLowerCase() !== w.toLowerCase()) return null;
      if (w !== s.join('')) { var pos = 0; s = s.map(function (y) { var o = w.substr(pos, y.length); pos += y.length; return o; }); }
    }
    if (!s.length) return null;
    return { s: s, t: t };
  }
  function klatsch(t, laut) {
    var c = KLANG.kontext(); if (!c) return;
    var n = Math.floor(c.sampleRate * 0.12), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, laut ? 3 : 5);
    var s = c.createBufferSource(); s.buffer = b; var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = laut ? 900 : 1600;
    var g = c.createGain(); g.gain.value = laut ? 1.0 : 0.35; s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);
    if (laut) { var o = c.createOscillator(), og = c.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(60, t + 0.15);
      og.gain.setValueAtTime(0.6, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.18); o.connect(og); og.connect(c.destination); o.start(t); o.stop(t + 0.2); }
  }
  function golpe(cfg, opts) {
    var U = T(opts), root = wurzel(), ton = rundenKlang();
    var spr = (opts && opts.zielLang) || 'es', x = null, st = null;
    mezcla(cfg.woerter || []).some(function (k) { var r = silbenTon(k.z, spr); if (r && r.s.length >= 2) { x = k; st = r; return true; } return false; });
    if (!x) { root.appendChild(el('p', 'jg-task', U.gTask)); return root; }
    var w = ohneArtikel(x.z), s = st.s, t = st.t, fertig = false, tiles = [];
    root.appendChild(el('p', 'jg-task', U.gTask));
    var hb = el('button', 'jg-big', U.gKlatsch); hb.type = 'button'; root.appendChild(hb);
    var r = el('div', 'jg-silben'); root.appendChild(r); var fb = el('div', 'jg-fb'); root.appendChild(fb);
    s.forEach(function (sx, i) {   // Tilde beim Raten verstecken, sonst verrät sie die Lösung
      var b = el('button', 'jg-silbe', sx.normalize('NFD').replace(/́/g, '').normalize('NFC')); b.type = 'button'; r.appendChild(b); tiles.push(b);
      b.addEventListener('click', function () {
        if (fertig) return; ton.wecken(); var c = KLANG.kontext(); if (c) klatsch(c.currentTime, i === t);
        if (i === t) { fertig = true; b.classList.add('ok'); setTimeout(ton.dur, 250);
          var l = el('div', 'jg-loesung jg-pop'); l.innerHTML = s.map(function (y, j) { return j === t ? '<b>' + esc(y) + '</b>' : esc(y); }).join('·'); root.insertBefore(l, fb);
          fb.className = 'jg-fb'; fb.innerHTML = '<em>' + esc(x.z) + '</em>' + (x.tr ? ' = ' + esc(x.tr) : '') + (spr === 'es' && /[áéíóú]/.test(w) ? esc(U.gTilde) : (spr === 'el' ? esc(U.gTonos) : '')); done(root, true); }
        else { ton.moll(); b.classList.add('no'); wobble(b); fb.className = 'jg-fb soft'; fb.textContent = U.gFalsch; }
      });
    });
    hb.addEventListener('click', function () {
      ton.wecken(); var c = KLANG.kontext(); if (!c) return; var t0 = c.currentTime + 0.1;
      s.forEach(function (y, i) { klatsch(t0 + i * 0.42, i === t); setTimeout(function () { tiles[i].classList.add('klopf'); setTimeout(function () { tiles[i].classList.remove('klopf'); }, 300); }, 100 + i * 420); });
      setTimeout(function () { sprichOpt(opts, x.z); }, 100 + s.length * 420 + 250);
    });
    return root;
  }

  /* ── AL MERCADO: in den richtigen Korb ── cfg = { koerbe:[{titel, icon, woerter:[{z,tr}]}, {…}] } */
  function mercado(cfg, opts) {
    var U = T(opts), root = wurzel(), ton = rundenKlang(), K = cfg.koerbe, liste = [];
    K.forEach(function (kb, i) { mezcla(kb.woerter).slice(0, 3).forEach(function (x) { liste.push({ x: x, k: i }); }); });
    liste = mezcla(liste); var n = 0;
    root.appendChild(el('p', 'jg-task', U.mTask));
    var ware = el('div', 'jg-ware'); root.appendChild(ware);
    var kbx = el('div', 'jg-koerbe'); root.appendChild(kbx); var fb = el('div', 'jg-fb'); root.appendChild(fb);
    var knoepfe = K.map(function (kb, i) { var b = el('button', 'jg-korb'); b.type = 'button'; b.innerHTML = '<span style="font-size:1.6rem">' + kb.icon + '</span><b></b><div class="inhalt"></div>'; b.querySelector('b').textContent = kb.titel; kbx.appendChild(b); b.addEventListener('click', function () { waehle(i, b); }); return b; });
    function zeige() {
      if (n >= liste.length) { ware.textContent = '✔'; ton.dur(); fb.className = 'jg-fb'; fb.textContent = U.mFertig; done(root, true); return; }
      var x = liste[n].x; ware.textContent = ohneArtikel(x.z); ware.classList.remove('jg-pop'); void ware.offsetWidth; ware.classList.add('jg-pop'); sprichOpt(opts, x.z);
    }
    function waehle(i, b) {
      if (n >= liste.length) return; ton.wecken(); var it = liste[n];
      if (it.k === i) { b.querySelector('.inhalt').appendChild(el('span', null, ohneArtikel(it.x.z))); fb.className = 'jg-fb'; fb.innerHTML = '<em>' + esc(ohneArtikel(it.x.z)) + '</em> = ' + esc(it.x.tr); n++; setTimeout(zeige, 600); }
      else { ton.moll(); b.classList.add('no'); wobble(b); setTimeout(function () { b.classList.remove('no'); }, 500); fb.className = 'jg-fb soft'; fb.innerHTML = U.mFalsch(esc(ohneArtikel(it.x.z))); }
    }
    zeige();
    return root;
  }

  /* ── MEMORIA: Wort ↔ Bild ── cfg = { paare:[{z,tr,bild}] ×4 } */
  function memoria(cfg, opts) {
    var U = T(opts), root = wurzel(), ton = rundenKlang(), karten = [], offen = [], paare = 0, sperre = false;
    var P = (cfg.paare || []).slice(0, 4);
    P.forEach(function (x, i) { karten.push({ i: i, typ: 'bild', x: x }); karten.push({ i: i, typ: 'wort', x: x }); });
    karten = mezcla(karten);
    root.appendChild(el('p', 'jg-task', U.meTask));
    var g = el('div', 'jg-memo'); root.appendChild(g); var fb = el('div', 'jg-fb'); root.appendChild(fb);
    function zu(k) { k.auf = false; k.b.classList.remove('auf'); k.b.innerHTML = '<span class="rueck">?</span>'; }
    karten.forEach(function (k) {
      var b = el('button', 'jg-mk'); b.type = 'button'; b.innerHTML = '<span class="rueck">?</span>'; g.appendChild(b); k.b = b;
      b.addEventListener('click', function () {
        if (sperre || k.auf || k.paar) return; ton.wecken();
        k.auf = true; b.classList.add('auf'); b.innerHTML = k.typ === 'bild' ? '<img alt="" src="' + k.x.bild + '">' : esc(ohneArtikel(k.x.z));
        if (k.typ === 'wort') sprichOpt(opts, k.x.z);
        offen.push(k);
        if (offen.length === 2) { var a = offen[0], c = offen[1]; offen = [];
          if (a.i === c.i && a.typ !== c.typ) { a.paar = c.paar = true; a.b.classList.add('paar'); c.b.classList.add('paar'); fb.className = 'jg-fb'; fb.innerHTML = '<em>' + esc(a.x.z) + '</em> = ' + esc(a.x.tr);
            if (++paare === P.length) { ton.dur(); fb.textContent = U.meFertig; done(root, true); } }
          else { sperre = true; setTimeout(function () { zu(a); zu(c); sperre = false; }, 900); } }
      });
    });
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
    encadenado: encadenado, oido: oido, golpe: golpe, mercado: mercado, memoria: memoria, silabas: silabas, tonica: tonica, silabasEl: silabasEl, silbenTon: silbenTon,
    eindringling: eindringling, woerterAus: woerterAus, mezcla: mezcla, css: ensureCss,
    spikiuSvg: SPIKIU, ABC: ABC
  };
})(window);
