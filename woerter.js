/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — WORT-WIEDERSEHEN  (woerter.js)

   Die Schicht, die bisher fehlte. Sie beantwortet EINE Frage:
   Ist dieses Wort wiedergekommen — und wurde es erkannt?

   WARUM ES SIE GIBT (Entscheid 18.08.2026)
   Eine Station gilt nicht als „geschafft", weil jemand sie angetippt hat,
   und auch nicht, weil er einen Test bestanden hat. Sie gilt als GESETZT,
   wenn ihre Wörter später wiederkamen und erkannt wurden.
   Das misst nicht Leistung, sondern Zeit und Erinnerung. Niemand kann
   durchrauschen: Wiedersehen braucht Tage, nicht Minuten.
   Kein Streak, keine Note, kein Scheitern.

   „Das eingesammelte Wort stirbt nicht im Lager — es kommt als
    Wiedersehen zurück."

   DIE REGEL
   Ein Wort ist gesetzt, wenn es an ZWEI VERSCHIEDENEN TAGEN erkannt wurde.
   Zwei Treffer in derselben Minute zählen als einer — sonst wäre es wieder
   eine Prüfung statt eines Wiedersehens.

   Phase 1: localStorage. Phase 2: Supabase.
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  var SCHLUESSEL = 'spikiu_woerter';
  var NOETIGE_TAGE = 2;          /* an so vielen verschiedenen Tagen erkannt */
  var ANTEIL_STATION = 0.7;      /* so viel einer Station muss sitzen */

  function heute() { return new Date().toISOString().slice(0, 10); }

  function lade() {
    try {
      var r = JSON.parse(localStorage.getItem(SCHLUESSEL) || 'null');
      if (r && typeof r === 'object') return r;
    } catch (e) {}
    return {};
  }
  function speichere(w) {
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(w)); } catch (e) {}
  }

  /* Schlüssel eines Worts. Sprachneutral, damit dasselbe Wort in zwei
     Stationen nicht zweimal gelernt werden muss. */
  function key(zielsprache, wort) {
    return (zielsprache || 'es') + '|' + String(wort).trim().toLowerCase();
  }

  /* ── Melden ───────────────────────────────────────────────────────── */

  /* Das Gym meldet hierher: Wort gesehen, erkannt ja/nein.
     Ein Fehlgriff löscht nichts — er verschiebt nur. Wer ein Wort einmal
     hatte, verliert es nicht wieder; es kommt eben öfter zurück. */
  function melde(zielsprache, wort, erkannt, station) {
    var W = lade();
    var k = key(zielsprache, wort);
    var e = W[k] || { tage: [], gesehen: 0, station: station || null };
    e.gesehen++;
    if (station && !e.station) e.station = station;
    if (erkannt) {
      var t = heute();
      if (e.tage.indexOf(t) === -1) e.tage.push(t);   /* ein Tag zählt einmal */
    } else {
      e.gewackelt = (e.gewackelt || 0) + 1;           /* das „wackelnde Wort" */
    }
    W[k] = e;
    speichere(W);
    return e;
  }

  function gesetzt(zielsprache, wort) {
    var e = lade()[key(zielsprache, wort)];
    return !!(e && e.tage && e.tage.length >= NOETIGE_TAGE);
  }

  /* Wörter, bei denen der Lerner gewackelt hat — die holt das Gym zuerst. */
  function wackelnde(zielsprache) {
    var W = lade(), out = [];
    Object.keys(W).forEach(function (k) {
      if (k.indexOf((zielsprache || 'es') + '|') !== 0) return;
      var e = W[k];
      if ((e.gewackelt || 0) > 0 && e.tage.length < NOETIGE_TAGE) {
        out.push({ wort: k.split('|')[1], gewackelt: e.gewackelt, station: e.station });
      }
    });
    return out.sort(function (a, b) { return b.gewackelt - a.gewackelt; });
  }

  /* ── Der Schluss des Kreises ──────────────────────────────────────── */

  /* Wie viele Wörter einer Station sitzen? */
  function standDerStation(stufe, thema, zielsprache) {
    var D = raum.SpikiuLernpfad; if (!D) return { gesetzt: 0, gesamt: 0 };
    var liste = D.woerter(stufe, thema);
    var z = zielsprache || 'es', n = 0;
    liste.forEach(function (w) { if (gesetzt(z, w.z)) n++; });
    return { gesetzt: n, gesamt: liste.length };
  }

  /* Nach jeder Gym-Runde aufgerufen: prüft ALLE berührten Stationen und
     setzt sie, wo genug Wörter wiedergekommen sind. Der Ring füllt sich
     von selbst — der Lerner muss nichts abhaken. */
  function pruefeStationen(zielsprache) {
    var D = raum.SpikiuLernpfad, P = raum.SpikiuPfad;
    if (!D || !P) return [];
    var z = zielsprache || 'es', frisch = [];
    D.stufen.forEach(function (st) {
      D.themen.forEach(function (t) {
        if (!D.gefuellt(st, t.id)) return;
        if (P.status(t.id, st) === 'gesetzt') return;      /* schon rund */
        if (P.status(t.id, st) === 'offen') return;        /* nie betreten */
        var s = standDerStation(st, t.id, z);
        if (!s.gesamt) return;
        P.setze(t.id, st, s.gesetzt);
        if (P.status(t.id, st) === 'gesetzt') frisch.push({ stufe: st, thema: t.id });
      });
    });
    return frisch;   /* damit der Raum ein leises Wiedersehen zeigen kann */
  }

  /* Die Wörter, die das Gym üben soll: aus den berührten Stationen,
     wackelnde zuerst. Beispielsatz kommt aus der Station selbst, wo einer
     zu finden ist — sonst steht das Wort für sich, das ist kein Mangel. */
  function uebungsSatz(stufe, thema, wort) {
    var D = raum.SpikiuLernpfad; if (!D) return '';
    var S = D.station(stufe, thema); if (!S) return '';
    var kern = String(wort).replace(/^(el|la|los|las|un|una)\s+/i, '')
                           .replace(/[¿?¡!.,;]/g, '').trim().toLowerCase();
    if (!kern) return '';
    var quellen = S.dialog.zeilen.map(function (z) { return z.z; });
    quellen.push(S.lesetext.z);
    if (S.schreibaufgabe && S.schreibaufgabe.muster) quellen.push(S.schreibaufgabe.muster);
    for (var i = 0; i < quellen.length; i++) {
      if (String(quellen[i]).toLowerCase().indexOf(kern) !== -1) {
        /* Nur den Satz nehmen, der das Wort trägt — nicht den ganzen Text. */
        var saetze = String(quellen[i]).split(/(?<=[.!?])\s+/);
        for (var j = 0; j < saetze.length; j++) {
          if (saetze[j].toLowerCase().indexOf(kern) !== -1) return saetze[j].trim();
        }
        return String(quellen[i]).trim();
      }
    }
    return '';
  }

  function ausStationen(zielsprache, muttersprache) {
    var D = raum.SpikiuLernpfad, P = raum.SpikiuPfad;
    if (!D || !P) return [];
    var z = zielsprache || 'es', mu = muttersprache || 'de', out = [];
    D.stufen.forEach(function (st) {
      D.themen.forEach(function (t) {
        if (P.status(t.id, st) === 'offen') return;   /* nur Berührtes üben */
        D.woerter(st, t.id).forEach(function (w) {
          if (gesetzt(z, w.z)) return;                /* Gesetztes ruht */
          out.push({
            wort: w.z,
            tr: w.na[mu] || w.na.de || '',
            text: uebungsSatz(st, t.id, w.z),
            station: st + '.' + t.id
          });
        });
      });
    });
    /* Wackelnde nach vorn: sie sind der eigentliche Grund fürs Gym. */
    var wack = {};
    wackelnde(z).forEach(function (x, i) { wack[x.wort.toLowerCase()] = 1000 - i; });
    return out.sort(function (a, b) {
      return (wack[b.wort.toLowerCase()] || 0) - (wack[a.wort.toLowerCase()] || 0);
    });
  }

  function raeume() { try { localStorage.removeItem(SCHLUESSEL); } catch (e) {} }

  raum.SpikiuWoerter = {
    melde: melde,
    gesetzt: gesetzt,
    wackelnde: wackelnde,
    standDerStation: standDerStation,
    pruefeStationen: pruefeStationen,
    ausStationen: ausStationen,
    uebungsSatz: uebungsSatz,
    raeume: raeume,
    NOETIGE_TAGE: NOETIGE_TAGE,
    ANTEIL_STATION: ANTEIL_STATION
  };

})(typeof window !== 'undefined' ? window : this);
