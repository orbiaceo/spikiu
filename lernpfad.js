/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — LERNPFAD-HELFER  (lernpfad.js)

   Der gemeinsame Helfer am Root, wie sitzung.js / audio.js / nav.js.
   JEDER Raum erbt ihn. Niemals pro Raum nachbauen.

   Zwei Dinge liegen getrennt, und das ist Absicht:
     lernpfad-daten.js  = der BAUM. Fest, für alle gleich, null Token.
     spikiu_pfad        = der WEG. Persönlich, in localStorage.

   DREI ZUSTÄNDE je Station (Entscheid 18.08.2026):
     offen          — noch nicht betreten
     durchschritten — einmal berührt; öffnet die nächste Station
     gesetzt        — die Wörter kamen im Gym wieder und wurden erkannt

   Kein Tor, ein Sog: blockiert wird nie. Der Baum zeigt nur, was offen
   ist, und der Lerner geht von selbst zurück. Kein Streak, keine Note,
   kein Scheitern — „Fortschritt wird gefühlt, nie gezählt."

   Phase 1: localStorage (pro Gerät, pro Browser).
   Phase 2: Supabase, geräteübergreifend.
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  var SCHLUESSEL = 'spikiu_pfad';

  function leer(zielsprache) {
    return { zielsprache: zielsprache || 'es', stufe: 'a1', stationen: {} };
  }

  function lade() {
    try {
      var r = JSON.parse(localStorage.getItem(SCHLUESSEL) || 'null');
      if (r && r.stationen) return r;
    } catch (e) {}
    return leer();
  }

  function speichere(p) {
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(p)); } catch (e) {}
  }

  function daten() { return raum.SpikiuLernpfad || null; }

  /* ── Lesen ────────────────────────────────────────────────────────── */

  function stufe() { return lade().stufe || 'a1'; }

  function status(thema, welcheStufe) {
    var p = lade();
    var e = p.stationen[(welcheStufe || p.stufe) + '.' + thema];
    return (e && e.status) || 'offen';
  }

  /* Was Spikiu beim Gruß anbietet: die Themen der AKTUELLEN Stufe.
     Nur die aktuelle — sonst wird die Liste zwanzig Zeilen lang.
     Eine Station trägt „naechste": die erste, die noch nicht gesetzt ist.
     Führung durch Vorschlag, nicht durch Schloss. */
  function palette(welcheStufe) {
    var D = daten(); if (!D) return [];
    var st = welcheStufe || stufe();
    var erste = null;
    return D.themen.filter(function (t) {
      return D.gefuellt(st, t.id);              // leere Stationen zeigt Spikiu nie
    }).map(function (t) {
      var s = status(t.id, st);
      if (!erste && s !== 'gesetzt') erste = t.id;
      return {
        id: t.id,
        em: t.em,
        na: t.na,
        schritt: D.schritt[t.id] ? D.schritt[t.id][st] : null,
        status: s,
        stufe: st
      };
    }).map(function (x) {
      x.naechste = (x.id === erste);
      return x;
    });
  }

  /* Die erste Ebene: Gruppen statt Themen. Jede trägt eine Perlenreihe —
     so viele Perlen wie gefüllte Stationen darin, gefüllt nach Stand.
     Kein Zähler, kein Prozent: man sieht den Stand, statt ihn zu lesen. */
  function kategorien(welcheStufe) {
    var D = daten(); if (!D || !D.kategorien) return [];
    var st = welcheStufe || stufe();
    var nx = naechste(st);
    return D.kategorien.map(function (K) {
      var drin = K.themen.filter(function (id) { return D.gefuellt(st, id); });
      return {
        id: K.id,
        em: K.em,
        na: K.na,
        themen: drin,
        perlen: drin.map(function (id) { return status(id, st); }),
        naechste: !!(nx && drin.indexOf(nx.id) !== -1),
        stufe: st
      };
    }).filter(function (K) { return K.themen.length > 0; });   // leere Gruppen nie zeigen
  }

  /* Die zweite Ebene: die Themen EINER Gruppe. */
  function themenIn(katId, welcheStufe) {
    var st = welcheStufe || stufe();
    return palette(st).filter(function (x) {
      var D = daten();
      for (var i = 0; i < D.kategorien.length; i++) {
        if (D.kategorien[i].id === katId) return D.kategorien[i].themen.indexOf(x.id) !== -1;
      }
      return false;
    });
  }

  /* Die eine Station, die Spikiu zuerst vorschlägt. */
  function naechste(welcheStufe) {
    var p = palette(welcheStufe);
    for (var i = 0; i < p.length; i++) if (p[i].naechste) return p[i];
    return p[0] || null;
  }

  /* Ist die Stufe rund? Erst dann bietet Spikiu die nächste an. */
  function stufeRund(welcheStufe) {
    var p = palette(welcheStufe);
    if (!p.length) return false;
    return p.every(function (x) { return x.status === 'gesetzt'; });
  }

  /* ── Schreiben ────────────────────────────────────────────────────── */

  /* Berühren: der Lerner war da. Mehr wird nicht behauptet.
     Eine bereits gesetzte Station fällt dadurch NICHT zurück. */
  function beruehre(thema, welcheStufe) {
    var p = lade();
    var st = welcheStufe || p.stufe;
    var k = st + '.' + thema;
    var e = p.stationen[k] || {};
    if (e.status !== 'gesetzt') e.status = 'durchschritten';
    e.beruehrt = new Date().toISOString().slice(0, 10);
    p.stationen[k] = e;
    speichere(p);
    return e;
  }

  /* Setzen: die Wörter kamen wieder und wurden erkannt. Das kommt aus
     dem Gym (FSRS), nicht aus dem Raum selbst — sonst wäre es wieder
     eine Prüfung statt eines Wiedersehens. */
  function setze(thema, welcheStufe, woerterGesetzt) {
    var p = lade();
    var st = welcheStufe || p.stufe;
    var k = st + '.' + thema;
    var e = p.stationen[k] || {};
    var D = daten();
    var gesamt = D ? D.woerter(st, thema).length : 0;
    e.woerterGesetzt = woerterGesetzt || 0;
    /* Gesetzt heißt: die Mehrheit der Wörter ist wiedergekommen.
       Nicht alle — ein einzelnes hartnäckiges Wort darf nichts blockieren. */
    if (gesamt && e.woerterGesetzt >= Math.ceil(gesamt * 0.7)) e.status = 'gesetzt';
    else if (e.status !== 'gesetzt') e.status = 'durchschritten';
    p.stationen[k] = e;
    speichere(p);
    return e;
  }

  /* Stufe wechseln. Nur wenn die aktuelle rund ist — oder ausdrücklich. */
  function setzeStufe(neu) {
    var p = lade(); p.stufe = neu; speichere(p); return p.stufe;
  }

  function setzeZielsprache(z) {
    var p = lade(); p.zielsprache = z; speichere(p); return p.zielsprache;
  }

  /* Existiert überhaupt ein Pfad? Danach richtet sich Spikius Gruß:
     mit Pfad → Themen anbieten. Ohne → erst ins Assessment. */
  function existiert() {
    var p = lade();
    return !!(p && p.zielsprache && daten());
  }

  function raeume() {
    try { localStorage.removeItem(SCHLUESSEL); } catch (e) {}
  }

  /* ── Öffentliche Fläche ───────────────────────────────────────────── */
  raum.SpikiuPfad = {
    lade: lade,
    stufe: stufe,
    status: status,
    palette: palette,
    kategorien: kategorien,
    themenIn: themenIn,
    naechste: naechste,
    stufeRund: stufeRund,
    beruehre: beruehre,
    setze: setze,
    setzeStufe: setzeStufe,
    setzeZielsprache: setzeZielsprache,
    existiert: existiert,
    raeume: raeume
  };

})(typeof window !== 'undefined' ? window : this);
