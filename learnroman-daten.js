/* ──────────────────────────────────────────────────────────────────────────
   learnroman-daten.js — DER LERNROMAN (fester Inhalt, kein API-Call).
   Root-Helfer wie haeppchen-db.js / wortschatz.js / sprichwort.js.
   KEIN vercel.json-Eintrag (statische Datei, keine Function).

     window.spikiuLearnroman(zielsprache, muttersprache) → Buch | null

   Ein Buch (so, wie der Raum es bekommt — schon in SEINER Muttersprache):
     { buch, zielsprache, muttersprache, titel, untertitel, einheit,
       teile:{fundament,aufbau,anwendung},        // Teil-Titel (Zielsprache)
       etappen:[{id,nm}, …],                       // Anzeigenamen in der MUTTERSPRACHE
       kapitel:[{level, n, thema, title, teaser, body:[…]}] }

   Block-Typen im body (Schlüssel SPRACHNEUTRAL — nie de:/es:, weil Deutsch mal
   Ziel- und mal Muttersprache ist):
     {na:'…'}          Erzählung in der MUTTERSPRACHE (Regie, Innensicht) · kein Audio
     {z:'…', tr:'…'}   ZIELSPRACHE, eine Zeile/ein Zug · tr optional (Brücke) · 🔊
     {p:'…'}           fließende ZIELSPRACH-Prosa (nur Etappe Anwendung) · kein tr · 🔊

   EIN BUCH, MEHRERE MUTTERSPRACHEN (neu 15.10.2026): In einem Buch dürfen na,
   tr und teaser Objekte {de, en, …} sein — wie in lernpfad-daten.js. Ein
   spanischer Roman bedient so den deutschen UND den englischen Lerner. Beim
   Nachschlagen wird die Muttersprache ausgewählt; der Raum sieht nur Strings.

   thema (neu): die Themen-ID des Geführten Gesprächs, zu der eine Station
   gehört ('taxi', 'cafe', …) — der Raum verlinkt am Ende dorthin. null = keine.

   Buch 1 „El año de Lukas" steht in learnroman-lukas.js (Leo, 15.10.2026:
   jede Station = eine Szene des Geführten Gesprächs). Er ersetzt den alten
   „Lukas in Madrid" (4 Kapitel, 05.08.) — der alte Text liegt in der Git-Historie.
   Buch 2 „Marta in München" (learnroman-marta.js) und Buch 3 „Sofía in London"
   (learnroman-sofia.js) folgen demselben Bauplan (Leo, 15.10.2026).
   ────────────────────────────────────────────────────────────────────────── */
(function (w) {
  if (w.spikiuLearnroman) return;

  // ── Etappen: IDs sind kanonisch und fest, die ANZEIGENAMEN sind lokalisiert
  //    (Auftrag 05.08. §5 — für eine Madrilenin sind drei deutsche Wörter an der
  //    wichtigsten Stelle des Bildschirms eine Mauer, kein Wegweiser). ──
  var ETAPPEN_IDS = ['fundament', 'aufbau', 'anwendung'];
  var ETAPPEN_NAMEN = {
    de: { fundament: 'Fundament',   aufbau: 'Aufbau',      anwendung: 'Anwendung' },
    es: { fundament: 'Fundamentos', aufbau: 'Ampliación',  anwendung: 'En práctica' },
    // en: VORSCHLAG aus dem Auftrag, von Leo noch NICHT bestätigt.
    en: { fundament: 'Foundations', aufbau: 'Building up', anwendung: 'In practice' },
    el: { fundament: 'Θεμέλια',     aufbau: 'Χτίσιμο',     anwendung: 'Στην πράξη' }
  };
  function etappenFuer(mutter) {
    var n = ETAPPEN_NAMEN[mutter] || ETAPPEN_NAMEN.de;
    return ETAPPEN_IDS.map(function (id) { return { id: id, nm: n[id] }; });
  }

  // ── Mehrsprachige Felder: String bleibt String, {de,en} → die Muttersprache. ──
  function lokal(v, mutter) {
    if (v == null || typeof v === 'string') return v;
    return v[mutter] || v.de || v.en || v.es || '';
  }
  // Griechische Brücken liegen in eigenen Dateien (learnroman-<buch>-el.js, nur bei
  // Muttersprache el geladen): { <Station>: { teaser, b: { <Blockindex>: '…' } } }.
  var EL_QUELLE = { 'el-ano-de-lukas': 'SPIKIU_LR_EL_LUKAS', 'marta-in-muenchen': 'SPIKIU_LR_EL_MARTA', 'sofia-in-london': 'SPIKIU_LR_EL_SOFIA' };
  function mitGriechisch(c, i, el) {
    var e = el && el[c.n];
    if (!e) return null;
    var bl = c.body[i], g = e.b ? e.b[i] : undefined;
    return (g === undefined || g === null) ? null : g;
  }
  function blockFuer(b, mutter) {
    var o = {};
    if (b.na != null) o.na = lokal(b.na, mutter);
    if (b.z  != null) o.z  = b.z;
    if (b.tr != null) o.tr = lokal(b.tr, mutter);
    if (b.p  != null) o.p  = b.p;
    return o;
  }

  // ══ BUCH 1 · „El año de Lukas" — Zielsprache es, Muttersprachen de + en ═════
  //    Inhalt in learnroman-lukas.js (muss VOR dieser Datei geladen sein).
  var LUKAS = (w.SPIKIU_LR_LUKAS && w.SPIKIU_LR_LUKAS.K) || [];

  // ══ BUCH 2 · „Marta in München" — Zielsprache de, Muttersprachen es + en ════
  //    Inhalt in learnroman-marta.js (ersetzt „Marta en Berlín", 15.10.2026).
  var MARTA = (w.SPIKIU_LR_MARTA && w.SPIKIU_LR_MARTA.K) || [];

  // ══ BUCH 3 · „Sofía in London" — Zielsprache en, Muttersprachen es + de ═════
  //    Inhalt in learnroman-sofia.js (neutrales Englisch, britische Schreibung).
  var SOFIA = (w.SPIKIU_LR_SOFIA && w.SPIKIU_LR_SOFIA.K) || [];

  // ── Die Bücher. Ein neues Sprachpaar = ein weiterer Eintrag.
  //    muttersprachen: für welche Lerner das Buch geschrieben ist. ──
  var BUECHER = [
    { buch: 'el-ano-de-lukas', zielsprache: 'es', muttersprachen: ['de', 'en'],
      titel: 'El año de Lukas',
      untertitel: { de: 'Ein Papier, eine Stadt, neun Monate. Jede Station ist eine Szene aus dem Geführten Gespräch.',
                    en: 'One document, one city, nine months. Every stop is a scene from Guided Conversation.',
                    el: 'Ένα χαρτί, μια πόλη, εννιά μήνες. Κάθε σταθμός είναι μια σκηνή από την Καθοδηγούμενη συζήτηση.' },
      einheit: 'station',
      teile: { fundament: 'Vecino de Madrid', aufbau: 'La visita', anwendung: 'Hasta luego' },
      kapitel: LUKAS },
    { buch: 'marta-in-muenchen', zielsprache: 'de', muttersprachen: ['es', 'en'],
      titel: 'Marta in München',
      untertitel: { es: 'Un papel, una ciudad, un invierno. Cada estación es una escena de la conversación guiada.',
                    en: 'One document, one city, one winter. Every stop is a scene from Guided Conversation.',
                    el: 'Ένα χαρτί, μια πόλη, ένας χειμώνας. Κάθε σταθμός είναι μια σκηνή από την Καθοδηγούμενη συζήτηση.' },
      einheit: 'station',
      teile: { fundament: 'Servus, Marta', aufbau: 'Der Besuch', anwendung: 'Servus' },
      kapitel: MARTA },
    { buch: 'sofia-in-london', zielsprache: 'en', muttersprachen: ['es', 'de'],
      titel: 'Sofía in London',
      untertitel: { es: 'Un papel, una ciudad, un invierno. Cada estación es una escena de la conversación guiada.',
                    de: 'Ein Papier, eine Stadt, ein Winter. Jede Station ist eine Szene aus dem Geführten Gespräch.',
                    el: 'Ένα χαρτί, μια πόλη, ένας χειμώνας. Κάθε σταθμός είναι μια σκηνή από την Καθοδηγούμενη συζήτηση.' },
      einheit: 'station',
      teile: { fundament: 'The proof of address', aufbau: 'The visit', anwendung: 'Cheers' },
      kapitel: SOFIA }
  ];

  // Ein Buch in EINER Muttersprache (zwischengespeichert, damit der Raum
  // immer dasselbe Objekt bekommt).
  var CACHE = {};
  function fuer(b, mutter) {
    var key = b.buch + ':' + mutter;
    if (CACHE[key]) return CACHE[key];
    CACHE[key] = {
      buch: b.buch, zielsprache: b.zielsprache, muttersprache: mutter,
      titel: b.titel, untertitel: lokal(b.untertitel, mutter) || '',
      einheit: b.einheit || 'kapitel', teile: b.teile || {},
      etappen: etappenFuer(mutter),
      kapitel: b.kapitel.map(function (c) {
        var el = (mutter === 'el') ? w[EL_QUELLE[b.buch]] : null;
        return { level: c.level, n: c.n, thema: c.thema || null, title: c.title,
                 teaser: (el && el[c.n] && el[c.n].teaser) || lokal(c.teaser, mutter),
                 body: c.body.map(function (bl, i) {
                   var o = blockFuer(bl, mutter);
                   if (el) {
                     var g = mitGriechisch(c, i, el);
                     if (bl.na != null) o.na = g || lokal(bl.na, 'en');
                     if (bl.tr != null) o.tr = (g === '' ? '' : (g || lokal(bl.tr, 'en')));
                   }
                   return o;
                 }) };
      })
    };
    return CACHE[key];
  }

  // ── Öffentlich: Buch zum Sprachpaar oder null (nie werfen, nie erfinden). ──
  w.spikiuLearnroman = function (zielsprache, muttersprache) {
    var ziel = zielsprache || '', mutter = muttersprache || '';
    for (var i = 0; i < BUECHER.length; i++) {
      var b = BUECHER[i];
      // Griechisch zählt als Muttersprache, sobald seine Brücken-Datei geladen ist.
      var kann = b.muttersprachen.indexOf(mutter) > -1 || (mutter === 'el' && !!w[EL_QUELLE[b.buch]]);
      if (b.zielsprache === ziel && kann && b.kapitel.length) return fuer(b, mutter);
    }
    return null;
  };
  // Reihenfolge/IDs der Etappen für die Freischaltung im Raum.
  w.spikiuLearnroman.etappenIds = ETAPPEN_IDS.slice();
  // Welche Sprachpaare gibt es überhaupt? (für einen ehrlichen leeren Zustand)
  w.spikiuLearnroman.paare = [];
  BUECHER.forEach(function (b) {
    b.muttersprachen.concat(['el']).forEach(function (m) {
      w.spikiuLearnroman.paare.push({ zielsprache: b.zielsprache, muttersprache: m, titel: b.titel });
    });
  });

})(window);
