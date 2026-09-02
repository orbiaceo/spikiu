/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — LERNPFAD-SPRACHUMSCHALTER
   Statische Datei. NULL Token. Kein DOM, kein fetch, kein Netz.

   WOZU
   Es gibt drei Datendateien, eine je Zielsprache:
     lernpfad-daten.js      → Spanisch  (window.SpikiuLernpfadES)
     lernpfad-daten-de.js   → Deutsch   (window.SpikiuLernpfadDE)
     lernpfad-daten-en.js   → Englisch  (window.SpikiuLernpfadEN)
   Diese Datei entscheidet, welche davon als window.SpikiuLernpfad gilt.

   Ein Raum fragt nie „welche Datei?", sondern nur SpikiuLernpfad. Damit
   bleibt die Regel gewahrt: RÄUME werden getrennt, nicht Sprachen. Die
   Zielsprache ist ein Profil-FELD, kein Datei-Schnitt im Raum.

   REIHENFOLGE IM HTML — die Datendateien ZUERST, dann diese:
     <script src="lernpfad-daten.js"></script>
     <script src="lernpfad-daten-de.js"></script>
     <script src="lernpfad-daten-en.js"></script>
     <script src="lernpfad-sprache.js"></script>
     <script src="lernpfad.js"></script>

   WARUM ALLE DREI GELADEN WERDEN
   Es wäre sparsamer, nur die passende zu laden. Das ginge aber nur
   asynchron oder per document.write — beides bringt neue Fehlerquellen in
   Seiten, die heute laufen. Drei statische Textdateien kosten zusammen
   rund 300 KB, komprimiert deutlich weniger, und Vercel liefert sie
   gecacht. Umkehrbar, sobald es messbar stört.

   Stand: 30.08.2026
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  /* Die spanische Datei belegt aus Altbestand window.SpikiuLernpfad direkt.
     Wir sichern sie unter ihrem eigenen Namen, damit der Umschalter sie
     wiederfindet, nachdem er SpikiuLernpfad überschrieben hat. */
  if (raum.SpikiuLernpfad && !raum.SpikiuLernpfadES) {
    raum.SpikiuLernpfadES = raum.SpikiuLernpfad;
  }

  var TAFEL = {
    es: 'SpikiuLernpfadES',
    de: 'SpikiuLernpfadDE',
    en: 'SpikiuLernpfadEN'
  };

  /* Die Zielsprache steht im Profil, nicht im Dateinamen. Fehlt sie oder
     ist sie unbekannt, gilt Spanisch — das war die erste Zielsprache und
     ist die einzige, die sicher vorhanden ist. */
  function ausProfil() {
    try {
      var roh = raum.localStorage && raum.localStorage.getItem('spikiu_user');
      if (!roh) return 'es';
      var u = JSON.parse(roh) || {};
      /* Das Profil liegt verschachtelt unter .profile — so schreibt es das
         Assessment und so lesen es chat.html, haus.html und pruefung.html.
         Die Oberfläche wird zusätzlich durchsucht, weil ältere Profile die
         Felder dort tragen. Wer nur oben nachsah, fiel still auf Spanisch
         zurück und merkte es nie (31.08.). */
      var p = u.profile || {};
      var z = p.zielsprache || u.zielsprache || p.ziel || u.ziel;
      return TAFEL[z] ? z : 'es';
    } catch (e) {
      return 'es';
    }
  }

  /* Setzt SpikiuLernpfad auf die Datei der gewünschten Zielsprache.
     Gibt den Code zurück, der tatsächlich gilt — nicht den gewünschten.
     Der Unterschied ist wichtig: wer Griechisch im Profil hat, bekommt
     Spanisch und soll das erfahren, statt still falsche Wörter zu sehen. */
  function waehle(code) {
    var name = TAFEL[code];
    var daten = name && raum[name];

    if (!daten) {
      /* Die gewünschte Datei ist nicht eingebunden. Laut melden, nicht
         stillschweigend etwas anderes anzeigen (Lehre vom 18.08.). */
      if (raum.console && raum.console.warn) {
        raum.console.warn('[Lernpfad] Zielsprache "' + code +
          '" ist nicht geladen. Prüfe die <script>-Reihenfolge. Es gilt Spanisch.');
      }
      code = 'es';
      daten = raum.SpikiuLernpfadES || null;
    }

    if (daten) {
      raum.SpikiuLernpfad = daten;
      raum.SpikiuSprache.aktuell = code;
    }
    return code;
  }

  /* Welche Zielsprachen stehen auf dieser Seite wirklich zur Verfügung? */
  function vorhanden() {
    var liste = [];
    for (var code in TAFEL) {
      if (TAFEL.hasOwnProperty(code) && raum[TAFEL[code]]) liste.push(code);
    }
    return liste;
  }

  raum.SpikiuSprache = {
    aktuell: null,
    waehle: waehle,
    vorhanden: vorhanden,
    ausProfil: ausProfil
  };

  /* Beim Laden einmal setzen. Wer die Sprache im laufenden Betrieb
     wechselt, ruft SpikiuSprache.waehle(code) selbst auf. */
  waehle(ausProfil());

})(typeof window !== 'undefined' ? window : globalThis);
