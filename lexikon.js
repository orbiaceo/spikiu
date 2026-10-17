/* ═══════════════════════════════════════════════════════════════════
   lexikon.js — DAS LÉXICO (Spikiu) · 18.10.2026 · 0 Backend, 0 Tokens
   Leo, 17./18.10.: jede Form, die in den Texten der App vorkommt, zeigt auf
   ihr LEMMA und ihre FICHA (Fach, Formen, Übersetzung, Beispiel, Valenz,
   „cómo se hace").

   Die Daten liegen je Zielsprache in lexikon-de.js / -es.js / -en.js / -el.js
   (erzeugt aus allen Texten der App: Lernpfad alle Etappen, Lernromane,
   Wortfelder, Kurzsätze, Sprichwörter, Regional, Taller, Häppchen …).
   Dieser Kern lädt nur die Datei der gebrauchten Zielsprache nach.

   API:
     spikiuLexikon.laden(ziel)            → Promise (Datei nachladen, einmal)
     spikiuLexikon.bereit(ziel)           → true, wenn geladen
     spikiuLexikon.ficha(ziel, wort)      → Ficha | null   (wort = beliebige Form)
     spikiuLexikon.fach(ziel, wort)       → 'ding'|'tun'|'wie'|'klein'|'name'|null
     spikiuLexikon.lemma(ziel, wort)      → Lemma-Text | null

   Ficha (kurze Schlüssel, Datenvertrag):
     l  Lemma · a Fach (ding|tun|wie|klein|name) · g Artikel (nur ding)
     pl Plural mit Artikel · fo Formen (Adjektive) · lt Umschrift (nur el)
     tr {de,es,en,el} Übersetzung (ohne Zielsprache) · b Beispiel · bt {…}
     v  Valenz {m Muster mit [Lücken], b, bt, o {Muttersprache: Achtung-Hinweis}}
     adv „wie es geschieht" {f Form, b, bt, h {Muttersprache: Bildung}}
     forma  (beim Abruf ergänzt) die getippte Form
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  if (w.spikiuLexikon && w.spikiuLexikon.ficha) return;

  var DATEN = {};          // ziel → { F: {form: idx}, L: [ficha] }
  var LADEN = {};          // ziel → Promise
  var SPRACHEN = ['de', 'es', 'en', 'el'];

  function norm(x) {
    return String(x || '').trim().toLowerCase()
      .replace(/^[¿¡"'«»„“”‘’(\[]+|[.,;:!?"'«»„“”‘’)\]…]+$/g, '');
  }

  function add(ziel, d) { DATEN[ziel] = d; }

  function laden(ziel) {
    if (SPRACHEN.indexOf(ziel) < 0) return Promise.reject(new Error('lexikon: unbekannte Sprache ' + ziel));
    if (DATEN[ziel]) return Promise.resolve(true);
    if (LADEN[ziel]) return LADEN[ziel];
    LADEN[ziel] = new Promise(function (ok, nein) {
      var s = document.createElement('script');
      s.src = 'lexikon-' + ziel + '.js';
      s.onload = function () { DATEN[ziel] ? ok(true) : nein(new Error('lexikon: leer ' + ziel)); };
      s.onerror = function () { delete LADEN[ziel]; nein(new Error('lexikon: nicht geladen ' + ziel)); };
      document.head.appendChild(s);
    });
    return LADEN[ziel];
  }

  function finde(ziel, wort) {
    var d = DATEN[ziel]; if (!d) return null;
    var k = norm(wort); if (!k) return null;
    var i = d.F[k];
    // Mehrwort-Eintrag (z. B. „the station", „ο σταθμός"): letztes Wort versuchen
    if (i === undefined && k.indexOf(' ') > -1) i = d.F[k.split(/\s+/).pop()];
    return i === undefined ? null : d.L[i];
  }

  function ficha(ziel, wort) {
    var e = finde(ziel, wort); if (!e) return null;
    var o = {}; for (var key in e) if (Object.prototype.hasOwnProperty.call(e, key)) o[key] = e[key];
    o.forma = norm(wort);
    return o;
  }

  w.spikiuLexikon = {
    add: add,
    laden: laden,
    bereit: function (ziel) { return !!DATEN[ziel]; },
    ficha: ficha,
    fach: function (ziel, wort) { var e = finde(ziel, wort); return e ? e.a : null; },
    lemma: function (ziel, wort) { var e = finde(ziel, wort); return e ? e.l : null; },
    norm: norm
  };
  // Datei vor dem Kern geladen? Dann wartet sie hier.
  (w.__spikiuLexikonWarte || []).forEach(function (p) { add(p[0], p[1]); });
  w.__spikiuLexikonWarte = [];
})(window);
