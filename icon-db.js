/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — ICON-DATENBANK  (icon-db.js)

   Ein Wort → ein Icon. Statisch, NULL Token, kein Netz.

   WARUM EINE EIGENE DATEI (27.09.2026, Leo: „Nicht jede Karte, z. B.
   Trabajo, hat ein Bild")
   Bis heute hatte nur der Starter-Wortschatz eine kleine Icon-Liste mit
   13 Begriffen; Stationswörter und „Mein Buch" bekamen nie ein Icon.
   Jetzt gibt es EINE Liste für alle Wörter, egal woher sie kommen.

   WIE
   Schlüssel ist der englische Begriff (Konzept) — er steht in allen
   Datendateien (na.en / t.en) und ist sprachneutral. Aus den geladenen
   Daten baut die Datei beim ersten Aufruf einen Index
   „Zielwort → Konzept". Ein Raum fragt nur: spikiuIcon('el trabajo').

   REGEL (Leo, 17.08.): Nur was man SEHEN kann, bekommt ein Icon.
   Abstraktes (Verben, Adverbien, Höflichkeiten) bleibt bewusst leer.
   Keine Personen-Figuren für Familienmitglieder.

   Das Emoji ist nur der Schlüssel; gezeigt wird die self-hosted
   OpenMoji-Datei bilder/om-<Codepunkte>.svg (CC BY-SA 4.0, siehe FAQ).
   ══════════════════════════════════════════════════════════════════════ */
(function (raum) {
  'use strict';

  var KONZEPT = {
    // Starter-Wortschatz
    'house':'🏠', 'water':'sp-wasser', 'food':'🍽️', 'street':'🛣️', 'night':'🌙', 'hand':'✋',
    'book':'📚', 'door':'🚪', 'car':'🚗', 'sun':'☀️', 'money':'💵',
    'family':'👪', 'time':'⏰', 'day':'📅', 'word':'💬', 'name':'🪪', 'friend':'🤝',
    // Spikiu-eigene Zeichnungen im OpenMoji-Stil (bilder/sp-*.svg), wo OpenMoji
    // kein treffendes Motiv hat (Leo, 27.09.: „suggestivere Bilder").
    'table':'sp-tisch', 'city':'sp-stadtplan', 'street':'sp-strasse', 'work':'sp-arbeit',
    // Café · Restaurant · Essen
    'coffee':'☕', 'tea':'🍵', 'milk':'🥛', 'cup':'☕', 'glass':'🥃', 'bill':'🧾',
    'check':'🧾', 'receipt':'🧾', 'menu':'📋', 'bread':'🍞', 'breakfast':'🥐',
    'cheese':'🧀', 'apple':'🍎', 'apples':'🍎', 'tomato':'🍅', 'chicken':'🍗',
    'fish':'🐟', 'salad':'🥗', 'soup':'🍲', 'dessert':'🍰', 'ribs':'🍖',
    'nuts':'🥜', 'spicy':'🌶️', 'plate':'🍽️', 'main course':'🍽️', 'tip':'🪙',
    'keep the change':'🪙', 'change':'🪙',
    // Einkaufen
    'bag':'🛍️', 'shop':'🏪', 'market':'🛒', 'cash':'💶', 'card':'💳',
    'shirt':'👕', 'jacket':'🧥', 'kilo':'⚖️', 'half a kilo':'⚖️', 'pound':'⚖️',
    // Wege · Verkehr · Reisen
    'airport':'✈️', 'taxi':'🚕', 'cab':'🚕', 'suitcase':'🧳', 'traffic light':'🚦',
    'traffic jam':'🚗', 'traffic':'🚗', 'freeway':'🛣️', 'roadwork':'🚧',
    'crosswalk':'🚸', 'on foot':'👣', 'train':'🚆', 'station':'🚉', 'platform':'🚉',
    'track':'🚉', 'ticket':'🎫', 'ticket counter':'🎫', 'seat':'💺', 'carriage':'🚃',
    'timetable':'🗓️', 'schedule':'🗓️', 'address':'📍', 'downtown':'🏙️',
    'city centre':'🏙️', 'village':'🏘️', 'small town':'🏘️', 'lake':'🏞️',
    'passport':'🪪', 'id':'🪪', 'wedding':'💒',
    // Hotel
    'key':'🔑', 'room':'🛏️', 'double room':'🛏️', 'single room':'🛏️',
    'elevator':'🛗', 'lift':'🛗', 'front desk':'🛎️', 'lobby':'🛎️',
    'shower':'🚿', 'hot water':'♨️', 'heating':'🌡️', 'air conditioning':'❄️', 'ac':'❄️',
    // Arzt
    'doctor':'🩺', 'pharmacy':'⚕️', 'pill':'💊', 'painkillers':'💊', 'fever':'🤒',
    'headache':'🤕', 'stomachache':'🤢', 'x-ray':'🩻',
    // Wetter
    'weather':'🌤️', 'rain':'🌧️', 'it is raining':'🌧️', 'it is going to rain':'🌧️',
    'snow':'❄️', 'wind':'🌬️', 'cloud':'☁️', 'cloudy':'🌥️', 'sunny':'☀️',
    'it is sunny':'☀️', 'storm':'⛈️', 'umbrella':'☂️', 'cold':'🥶', 'freezing':'🥶',
    'forecast':'🌤️', 'degree':'🌡️',
    // Nachgetragen: sichtbare Dinge aus den Stationen
    'square':'⛲', 'size':'📏', 'discount':'🏷️', 'stop':'🚏', 'detour':'🚧',
    'cleaning':'🧹', 'prescription':'📝', 'antibiotic':'💊', 'appointment':'📅',
    // Spielzimmer (11.10.): mehr sichtbare Dinge für Oído fino + Memoria (OpenMoji, self-hosted)
    'banana':'🍌', 'grape':'🍇', 'pear':'🍐', 'cherry':'🍒', 'strawberry':'🍓', 'lemon':'🍋', 'orange':'🍊', 'peach':'🍑', 'pineapple':'🍍', 'melon':'🍈', 'watermelon':'🍉', 'carrot':'🥕', 'potato':'🥔', 'onion':'🧅', 'garlic':'🧄', 'egg':'🥚', 'rice':'🍚', 'pasta':'🍝', 'pizza':'🍕', 'hamburger':'🍔', 'ice cream':'🍨', 'cake':'🍰', 'cookie':'🍪', 'chocolate':'🍫', 'honey':'🍯', 'butter':'🧈', 'wine':'🍷', 'beer':'🍺', 'juice':'🧃', 'knife':'🔪', 'fork':'🍴', 'spoon':'🥄', 'bottle':'🍾', 'salt':'🧂', 'shrimp':'🦐', 'squid':'🦑', 'octopus':'🐙', 'avocado':'🥑', 'corn':'🌽', 'mushroom':'🍄', 'bell pepper':'🫑', 'cucumber':'🥒', 'olive':'🫒', 'sandwich':'🥪', 'croissant':'🥐', 'meat':'🍖', 'bus':'🚌', 'tram':'🚋', 'hotel':'🏨', 'bed':'🛏', 'ice':'🧊', 'sausage':'🌭', 'salmon':'🐟', 'cereal':'🥣',
    // Krone (b1) · Lateinamerika (Leo, 16.10.2026): nur aus den vorhandenen
    // OpenMoji-Bildern; was nicht trägt (Curiara, Cempasúchil, Kerze), bleibt leer.
    'espresso with a dash of milk':'☕', 'small sweet croissants':'🥐', 'cv':'📝',
    'patagonian lamb':'🍖', 'wage':'💵', 'poncho':'🧥', 'raincoat':'🧥',
    'rainforest':'🏞', 'cloud forest':'🏞', 'rainy season':'🌧', 'drizzle':'🌧', 'mist':'☁',
    'cold yerba mate':'🍵', 'tereré cup':'🍵', 'herbal drink from loja':'🍵',
    'bread of the dead':'🍞', 'flat':'🏘', 'furnished room':'🛏', 'rent':'💵', 'deposit':'💰',
    'contract':'📝', 'ticket office':'🎫', 'bay (platform)':'🚏', 'landslide':'🚧', 'road':'🛣',
    'luggage':'🧳', 'luggage hold':'🧳', 'window seat':'💺', 'altitude sickness':'🤢',
    'dizziness':'🤢', 'tablet':'💊',
    // Buchen/Reservieren (Leo, 17.10.2026: „ein besseres Icon für buchen, reservieren" — vorher 📚):
    'reserve':'sp-reservieren', 'reservation':'sp-reservieren', 'booking':'sp-reservieren', 'reservations':'sp-reservieren'
  };
  /* Verben („to book") sind abstrakt und bekommen KEIN Nomen-Bild („book" → 📚 war falsch).
     Nur ausdrücklich gelistete Verben haben ein eigenes Bild. */
  var VERB = { 'to book':'sp-reservieren', 'to reserve':'sp-reservieren', 'to book (a room)':'sp-reservieren' };

  var ARTIKEL = /^(el|la|los|las|un|una|unos|unas|der|die|das|den|dem|ein|eine|einen|the|a|an|to|some)\s+/;
  function norm(s) {
    return String(s || '').toLowerCase().replace(/[¿?¡!.,]/g, '').trim().replace(ARTIKEL, '').trim();
  }

  var index = null;
  function merke(wort, konzept) {
    var roh = String(konzept || '').toLowerCase().trim();
    if (/^to\s/.test(roh)) {                     // Verb: nur aus der Verb-Liste
      var vb = VERB[roh.replace(/[¿?¡!.,]/g, '')]; var wv = norm(wort);
      if (wort && vb && wv && !index[wv]) index[wv] = vb;
      return;
    }
    var k = norm(konzept);
    if (!wort || !KONZEPT[k]) return;
    var w = norm(wort);
    if (w && !index[w]) index[w] = KONZEPT[k];
  }
  function bauen() {
    index = {};
    // Englisch selbst: das Konzept IST das Wort.
    Object.keys(KONZEPT).forEach(function (k) { index[k] = KONZEPT[k]; });
    // Lernpfad-Daten (welche gerade geladen sind). Rohdaten der Station:
    // es/de tragen na.en, die englische Datei ist selbst das Konzept.
    var es = raum.SpikiuLernpfadES || (raum.SpikiuLernpfad && raum.SpikiuLernpfad.zielsprache === 'es' ? raum.SpikiuLernpfad : null);
    [es, raum.SpikiuLernpfadDE, raum.SpikiuLernpfadEN].forEach(function (D) {
      if (!D || !D.stufen || !D.themen || typeof D.station !== 'function') return;
      D.stufen.forEach(function (st) {
        D.themen.forEach(function (t) {
          var S = D.station(st, t.id);
          ((S && S.wortschatz) || []).forEach(function (w) {
            if (D.zielsprache === 'en') merke(w.z, w.z);
            else if (w.na && typeof w.na === 'object' && w.na.en) merke(w.z, w.na.en);
          });
        });
      });
    });
    // Starter-Wortschatz
    var WS = raum.spikiuWortschatz && raum.spikiuWortschatz.daten;
    if (WS) Object.keys(WS).forEach(function (z) {
      (WS[z] || []).forEach(function (w) { if (w.t && w.t.en) merke(w.wort, w.t.en); });
    });
  }

  /* spikiuIcon(wort) → Emoji oder ''. Unbekannt/abstrakt → ''. */
  raum.spikiuIcon = function (wort) {
    if (!index) bauen();
    return index[norm(wort)] || '';
  };
  /* Direkt über das Konzept (englisch) — für Karten, die ihr Konzept kennen.
     Wichtig bei Doppeldeutigem: „el tiempo" ist im Starter-Wortschatz die ZEIT,
     in der Wetter-Station das WETTER (27.09.). */
  raum.spikiuIcon.konzept = function (en) {
    /* Verben aus der Verb-Liste zuerst — sonst wurde „to book" zu „book" → 📚 (Leo, 19.10.). */
    var roh = String(en || '').toLowerCase().replace(/[¿?¡!.,]/g, '').trim();
    if (VERB[roh]) return VERB[roh];
    return KONZEPT[norm(en)] || '';
  };
  /* Emoji oder sp-Name → Dateipfad in bilder/. */
  raum.spikiuIcon.datei = function (e) {
    if (!e) return '';
    if (/^sp-[a-z0-9-]+$/.test(e)) return 'bilder/' + e + '.svg';
    var cps = [];
    for (var i = 0; i < e.length; i++) { var c = e.codePointAt(i); if (c > 0xFFFF) i++; if (c !== 0xFE0F) cps.push(c.toString(16).toUpperCase()); }
    return 'bilder/om-' + cps.join('-') + '.svg';
  };
  /* Nach dem Laden weiterer Daten neu aufbauen lassen. */
  raum.spikiuIcon.neu = function () { index = null; };
  raum.spikiuIcon.konzepte = KONZEPT;

})(typeof window !== 'undefined' ? window : this);
