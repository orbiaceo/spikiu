// szene.js — Der Szenen-Automat
// ─────────────────────────────────────────────────────────────────────────────
// Maßstab: szene-regeln.md (Fassung 29.08.2026). Jede Regel R1–R14 ist unten an
// der Stelle vermerkt, an der sie durchgesetzt wird.
//
// Was dieser Automat NICHT tut: zeichnen, ins Netz greifen, DOM/fetch/localStorage
// anfassen, entscheiden ob eine Antwort richtig war, entscheiden welche ART ein
// Zug hat (das tut frage-sieb.js). Er bekommt Ereignisse, er gibt Zustand zurück.
//
// Er ist NIRGENDS eingebunden. Das Anhängen der Oberfläche ist ein eigener Auftrag.
//
// Zustand nach außen (immer eine eingefrorene Kopie):
//   { phase, fehler, zug, aufgabeIndex, ausgangOffen, vorbei, abgelehnt }

(function (global) {
  'use strict';

  // Die vier Phasen aus den Regeln. Was hier nicht steht, kann nicht passieren.
  var PHASE_BUEHNE = 'buehne';
  var PHASE_LERNER = 'wartetAufLerner';
  var PHASE_SPIKIU = 'wartetAufSpikiu';
  var PHASE_ERNTE  = 'ernte';

  var ARTEN = ['offen', 'rolle', 'meta'];

  // ── R5 · Ein Gedanke pro Blase ─────────────────────────────────────────────
  // Spikiu trennt Repliken mit einer Zeile, die NUR --- (oder —) enthält — dieselbe
  // Vereinbarung wie in chat.html (splitThoughts). Der Automat zerlegt nur; welche
  // Karte den Zähler trägt, ist damit eindeutig: die letzte.
  function teileInBlasen(text) {
    var zeilen = String(text == null ? '' : text).split('\n');
    var nurStriche = /^[ \t]*(?:-{3,}|—)[ \t]*$/;
    var stuecke = [];
    var laufend = [];
    for (var i = 0; i < zeilen.length; i++) {
      if (nurStriche.test(zeilen[i])) { stuecke.push(laufend.join('\n')); laufend = []; }
      else laufend.push(zeilen[i]);
    }
    stuecke.push(laufend.join('\n'));
    return stuecke
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; });
  }

  function erzeuge(vorgabe) {
    var v = vorgabe || {};

    var aufgaben = Array.isArray(v.aufgaben) ? v.aufgaben.slice() : [];
    var maxZuege = (typeof v.maxZuege === 'number' && isFinite(v.maxZuege) && v.maxZuege >= 0)
      ? Math.floor(v.maxZuege) : 6;                       // R7 · die harte Kostendecke
    var streng = v.streng === true;

    // Der innere Zustand. Niemand von außen bekommt ihn je zu fassen.
    var innen = {
      phase: PHASE_BUEHNE,
      fehler: false,        // Merkmal von wartetAufSpikiu, KEINE eigene Phase
      fehlerFolge: 0,       // R14 · zwei Fehler hintereinander → Ernte
      zug: 0,               // R7 · zählt nur Züge des Lerners
      aufgabeIndex: 0,      // R3/R13 · nur ein offener Zug rückt vor
      vorbei: false,
      offenerText: null,    // R14 · was nochmal() erneut schicken würde
      blasen: []            // R5 · Spikius letzte Replik, in Blasen zerlegt
    };

    // R6 · Dritte Aufgabe erledigt → der Ausgang steht offen ("Fertig" darf
    // erscheinen). Die Szene endet dadurch NICHT von selbst.
    function ausgangOffen() {
      return aufgaben.length > 0 && innen.aufgabeIndex >= aufgaben.length;
    }

    // Der Zustand ist unveränderlich nach außen: jede Methode gibt eine Kopie.
    function schnappschuss(abgelehnt) {
      return Object.freeze({
        phase: innen.phase,
        fehler: innen.fehler,
        zug: innen.zug,
        aufgabeIndex: innen.aufgabeIndex,
        ausgangOffen: ausgangOffen(),
        vorbei: innen.vorbei,
        abgelehnt: abgelehnt || null
      });
    }

    // Abgelehnte Ereignisse ändern nichts. Normal: stiller Zustand mit Grund.
    // Bei streng:true wirft er — damit den Tests kein verschluckter Fehler durchrutscht.
    function ablehnen(grund) {
      if (streng) throw new Error('SpikiuSzene abgelehnt: ' + grund);
      return schnappschuss(grund);
    }

    var api = {

      // buehne → wartetAufSpikiu.
      // R1 · Danach ist Aufgabe 1 offen und es gab null Züge des Lerners.
      // R2 · Der Themen-Wunsch ist der Startschuss, keine Antwort: er rückt nicht
      //      vor und zählt nicht gegen die Sechs.
      los: function (text) {
        if (innen.vorbei) return ablehnen('los: die Szene ist vorbei');
        if (innen.phase !== PHASE_BUEHNE) return ablehnen('los: die Szene läuft schon');
        innen.phase = PHASE_SPIKIU;
        innen.offenerText = (text == null ? null : String(text));
        innen.fehler = false;
        innen.fehlerFolge = 0;
        return schnappschuss(null);
      },

      // wartetAufLerner → wartetAufSpikiu.
      // R3  · ein offener Zug schließt genau eine Aufgabe ab (auch eine unpassende
      //       Antwort — die Aufgaben führen, sie prüfen nicht).
      // R13 · rolle/meta zählen gegen die Sechs, aber nicht gegen die Aufgaben.
      // R4  · Züge während wartetAufSpikiu werden abgelehnt (Doppelklick, Enter+Knopf).
      // R9  · in der Ernte geht nichts mehr raus.
      antworte: function (text, art) {
        if (innen.vorbei) return ablehnen('antworte: die Szene ist vorbei');
        if (innen.phase === PHASE_ERNTE) return ablehnen('antworte: die Szene ist in der Ernte');
        if (innen.phase === PHASE_SPIKIU) return ablehnen('antworte: Spikiu schreibt noch');
        if (innen.phase === PHASE_BUEHNE) return ablehnen('antworte: die Szene hat noch nicht begonnen');
        if (ARTEN.indexOf(art) === -1) return ablehnen('antworte: unbekannte Art "' + art + '"');

        innen.zug += 1;
        if (art === 'offen' && innen.aufgabeIndex < aufgaben.length) innen.aufgabeIndex += 1;
        innen.phase = PHASE_SPIKIU;
        innen.offenerText = String(text == null ? '' : text);
        innen.fehler = false;
        innen.fehlerFolge = 0;
        return schnappschuss(null);
      },

      // wartetAufSpikiu → wartetAufLerner ODER ernte.
      // R7 · Nach sechs Zügen des Lerners geht die Szene in die Ernte — aber erst,
      //      nachdem Spikiu auf den sechsten Zug geantwortet hat. Nichts bricht
      //      mitten im Satz ab (R6, letzter Satz).
      // R5 · Mehrere Blasen sind EIN Ereignis: der Zustand wandert genau einmal.
      spikiuAntwortet: function (text) {
        if (innen.vorbei) return ablehnen('spikiuAntwortet: die Szene ist vorbei');
        if (innen.phase !== PHASE_SPIKIU) return ablehnen('spikiuAntwortet: es wartet niemand auf Spikiu');
        innen.blasen = teileInBlasen(text);
        innen.offenerText = null;
        innen.fehler = false;
        innen.fehlerFolge = 0;
        innen.phase = (innen.zug >= maxZuege) ? PHASE_ERNTE : PHASE_LERNER;
        return schnappschuss(null);
      },

      // R14 · Ein Netzfehler ist kein Zug: er zählt nicht und rückt nichts vor.
      //       Zwei Fehler hintereinander → Ernte mit dem, was da ist.
      netzFehler: function () {
        if (innen.vorbei) return ablehnen('netzFehler: die Szene ist vorbei');
        if (innen.phase !== PHASE_SPIKIU) return ablehnen('netzFehler: es wartet niemand auf Spikiu');
        innen.fehlerFolge += 1;
        if (innen.fehlerFolge >= 2) {
          innen.phase = PHASE_ERNTE;
          innen.fehler = false;
          innen.offenerText = null;
        } else {
          innen.fehler = true;
        }
        return schnappschuss(null);
      },

      // R14 · nochmal() schickt denselben Text erneut — der Zug ist schon gezählt.
      nochmal: function () {
        if (innen.vorbei) return ablehnen('nochmal: die Szene ist vorbei');
        if (innen.phase !== PHASE_SPIKIU) return ablehnen('nochmal: es wartet niemand auf Spikiu');
        if (!innen.fehler) return ablehnen('nochmal: es liegt kein Fehler an');
        innen.fehler = false;
        return schnappschuss(null);
      },

      // R8 · abbrechen() führt aus jeder Phase in die Ernte; eine noch laufende
      //      Antwort wird verworfen und nicht mehr gezeigt.
      // R9 · Ein zweiter Abbruch wird abgelehnt.
      abbrechen: function () {
        if (innen.vorbei) return ablehnen('abbrechen: die Szene ist vorbei');
        if (innen.phase === PHASE_ERNTE) return ablehnen('abbrechen: die Szene ist schon in der Ernte');
        innen.phase = PHASE_ERNTE;
        innen.offenerText = null;
        innen.fehler = false;
        innen.fehlerFolge = 0;
        return schnappschuss(null);
      },

      // R12 · Jeder Weg endet zu Hause. Nur aus der Ernte, nur einmal.
      nachHause: function () {
        if (innen.vorbei) return ablehnen('nachHause: die Szene ist schon vorbei');
        if (innen.phase !== PHASE_ERNTE) return ablehnen('nachHause: es gibt noch keine Ernte');
        innen.vorbei = true;
        return schnappschuss(null);
      },

      // ── Lesen, ohne zu verändern ────────────────────────────────────────────
      zustand: function () { return schnappschuss(null); },

      // R10 · Der Capy zeigt immer die aktuell offene Aufgabe — nie die davor,
      //       nie die danach. Sind alle erledigt: nichts.
      aktuelleAufgabe: function () {
        return (innen.aufgabeIndex < aufgaben.length) ? aufgaben[innen.aufgabeIndex] : null;
      },
      aufgabenListe: function () { return aufgaben.slice(); },

      // R14 · Was nochmal() erneut schicken würde.
      offenerText: function () { return innen.offenerText; },

      // R5 · Spikius letzte Replik in Blasen. Den Zähler trägt die letzte.
      blasen: function () { return innen.blasen.slice(); },

      maxZuege: function () { return maxZuege; }
    };

    return api;
  }

  var SpikiuSzene = {
    erzeuge: erzeuge,
    teileInBlasen: teileInBlasen,
    PHASEN: Object.freeze({
      buehne: PHASE_BUEHNE,
      wartetAufLerner: PHASE_LERNER,
      wartetAufSpikiu: PHASE_SPIKIU,
      ernte: PHASE_ERNTE
    }),
    ARTEN: Object.freeze(ARTEN.slice())
  };

  if (global) global.SpikiuSzene = SpikiuSzene;
  if (typeof module !== 'undefined' && module.exports) module.exports = SpikiuSzene;

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));
