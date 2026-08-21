/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — SZENENBILDER  (bilder-db.js)

   Zehn Motive für zwanzig Stationen: A1 und A2 eines Themas teilen sich
   ein Bild. „Im Café" trägt bestellen wie reklamieren.

   Ohne Figuren — die Rollen stehen im Text unter dem Bild, das Bild muss
   sie nicht doppeln. Ohne Schrift, weil dieselbe Datei den deutschen,
   spanischen und englischen Lerner bedient. Kein Capybara: Spikiu
   erscheint bei der Themenwahl, nicht im Reel.

   Alle Dateien: 800×800 WebP, zusammen ~190 KB.
   Stand: 18.08.2026
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  var PFAD = 'bilder/';

  /* Themen-ID → Datei. Die IDs sind die aus szenen.js und lernpfad-daten.js. */
  var BILDER = {
    cafe:            'spikiu-szene-cafe.webp',
    restaurant:      'spikiu-szene-restaurant.webp',
    einkaufen:       'spikiu-szene-einkaufen.webp',
    wegbeschreibung: 'spikiu-szene-wegbeschreibung.webp',
    taxi:            'spikiu-szene-taxi.webp',
    familie:         'spikiu-szene-familie.webp',
    hotel:           'spikiu-szene-hotel.webp',
    bahnhof:         'spikiu-szene-bahnhof.webp',
    arzt:            'spikiu-szene-arzt.webp',
    wetter:          'spikiu-szene-wetter.webp'
  };

  /* Kurzbeschreibung für Screenreader. In der Muttersprache des Lerners,
     nicht in der Zielsprache — sie beschreibt das Bild, sie lehrt nicht. */
  var ALT = {
    cafe:            { de:'Eine Caféterrasse mit Tisch, Tasse und zwei Stühlen',
                       es:'Una terraza de café con mesa, taza y dos sillas',
                       en:'A café terrace with a table, a cup and two chairs' },
    restaurant:      { de:'Ein gedeckter Tisch für zwei',
                       es:'Una mesa puesta para dos',
                       en:'A table laid for two' },
    einkaufen:       { de:'Ein Marktstand mit Obst, Käse und einer Waage',
                       es:'Un puesto de mercado con fruta, queso y una balanza',
                       en:'A market stall with fruit, cheese and a scale' },
    wegbeschreibung: { de:'Eine Straßenecke von oben mit Platz und Brunnen',
                       es:'Una esquina vista desde arriba con plaza y fuente',
                       en:'A street corner from above with a square and fountain' },
    taxi:            { de:'Ein gelbes Taxi an der Straße',
                       es:'Un taxi amarillo en la calle',
                       en:'A yellow taxi at the kerb' },
    familie:         { de:'Eine Wohnzimmerecke mit Sofa und leeren Bilderrahmen',
                       es:'Un rincón de salón con sofá y marcos vacíos',
                       en:'A living-room corner with a sofa and empty picture frames' },
    hotel:           { de:'Eine Hotelrezeption mit Tresen, Glocke und Koffer',
                       es:'Una recepción de hotel con mostrador, timbre y maleta',
                       en:'A hotel reception with a counter, bell and suitcase' },
    bahnhof:         { de:'Ein Bahnsteig mit Bank, Uhr und einfahrendem Zug',
                       es:'Un andén con banco, reloj y un tren que llega',
                       en:'A platform with a bench, clock and an arriving train' },
    arzt:            { de:'Ein Sprechzimmer mit Liege, Schreibtisch und Stethoskop',
                       es:'Una consulta con camilla, escritorio y estetoscopio',
                       en:'A consulting room with a couch, desk and stethoscope' },
    wetter:          { de:'Ein Fenster, draußen halb Sonne, halb Regen',
                       es:'Una ventana: fuera mitad sol, mitad lluvia',
                       en:'A window with sun on one side and rain on the other' }
  };

  raum.SpikiuBilder = {
    /* Pfad zum Bild eines Themas. null, wenn keins da ist — die Oberfläche
       zeigt dann das Emoji, statt ein fehlendes Bild zu erzwingen. */
    bild: function (themaId) {
      return BILDER[themaId] ? PFAD + BILDER[themaId] : null;
    },

    alt: function (themaId, muttersprache) {
      var a = ALT[themaId];
      if (!a) return '';
      return a[muttersprache || 'de'] || a.de;
    },

    /* Fertiges <img>, damit kein Raum die Attribute selbst zusammenbaut.
       loading=lazy, decoding=async: das Bild bremst den Kartenaufbau nie. */
    img: function (themaId, muttersprache, klasse) {
      var src = this.bild(themaId);
      if (!src) return null;
      var el = document.createElement('img');
      el.src = src;
      el.alt = this.alt(themaId, muttersprache);
      el.width = 800; el.height = 800;
      el.loading = 'lazy';
      el.decoding = 'async';
      if (klasse) el.className = klasse;
      return el;
    },

    /* Das nächste Bild im Voraus holen, während der Lerner noch liest. */
    vorladen: function (themaId) {
      var src = this.bild(themaId);
      if (src) { var i = new Image(); i.src = src; }
    },

    themen: Object.keys(BILDER)
  };

})(typeof window !== 'undefined' ? window : this);
