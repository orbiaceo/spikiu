/* ===================================================================
   zugang.js — Zugang zum Spielzimmer (Spikiu) · 11.10.2026
   -------------------------------------------------------------------
   BESCHLUSS (Leo, 11.10., „Es passt so! Einverstanden!"):
     · 14 Tage Probezeit: alle Spiele frei, ohne Grenze.
     · Danach ohne Abo: das SPIEL DES TAGES bleibt frei (unbegrenzt),
       ebenso das Spiel am Ende des Geführten Gesprächs (gehört zur Lektion,
       läuft über gefuehrt.html und fragt hier gar nicht erst).
     · Mit Abo (1,50 €/Monat, Null-Token-Stufe): alle Spiele.
     · Garten + Akrosticha bleiben IMMER offen (Leo, 12.10.: „ja, offen bleiben") — das eigene Regal.
     · KEINE Zähler, keine Runden-/Minutenlimits, keine Herzen.
   SCHALTER: AKTIV = false, solange es keine Konten/Zahlung gibt (Phase 2,
   Stripe + Supabase). Dann ist alles frei, und die Wache sagt immer ja.
   Zum Ansehen der Sperre: Seite mit ?zugang=test öffnen (nur dieses Gerät,
   ?zugang=aus schaltet es wieder ab).

     spikiuZugang.darf(id, liste)      → true | false
     spikiuZugang.tagesSpiel(liste)    → id (wechselt täglich, für alle gleich)
     spikiuZugang.status()             → { aktiv, abo, probeTage }
=================================================================== */
(function (w) {
  'use strict';
  if (w.spikiuZugang) return;

  var AKTIV = false;          // ← umlegen, sobald Zahlung + Konten stehen
  var PROBE_TAGE = 14;
  var TAG = 86400000;

  function lies(k) { try { return w.localStorage.getItem(k); } catch (e) { return null; } }
  function schreib(k, v) { try { if (v == null) w.localStorage.removeItem(k); else w.localStorage.setItem(k, v); } catch (e) {} }

  // Testschalter per Adresse (?zugang=test | ?zugang=aus)
  try {
    var q = (w.location && w.location.search) || '';
    if (/[?&]zugang=test\b/.test(q)) schreib('spikiu_zugang_test', 'an');
    if (/[?&]zugang=aus\b/.test(q)) { schreib('spikiu_zugang_test', null); schreib('spikiu_probe_start', null); }
  } catch (e) {}
  function aktiv() { return AKTIV || lies('spikiu_zugang_test') === 'an'; }

  function probeStart() {
    var s = +lies('spikiu_probe_start');
    if (!s) { s = Date.now(); schreib('spikiu_probe_start', String(s)); }
    // Im Testmodus ist die Probezeit schon vorbei, damit man die Sperre sieht.
    if (lies('spikiu_zugang_test') === 'an' && !AKTIV) s = Date.now() - (PROBE_TAGE + 1) * TAG;
    return s;
  }
  function probeTage() { return Math.max(0, PROBE_TAGE - Math.floor((Date.now() - probeStart()) / TAG)); }
  function abo() { return lies('spikiu_abo') === 'aktiv'; }   // Phase 2: aus dem Konto (Supabase)

  function tagesSpiel(liste) {
    if (!liste || !liste.length) return null;
    var d = new Date(), tag = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / TAG);
    return liste[tag % liste.length];
  }
  // Leo, 12.10.: Garten und Akrosticha sind das eigene Gesammelte (Regal) → bleiben immer offen.
  var IMMER_OFFEN = { huerto: 1, acrostico: 1 };
  function darf(id, liste) {
    if (IMMER_OFFEN[id]) return true;
    if (!aktiv()) return true;
    if (abo()) return true;
    if (probeTage() > 0) return true;
    return id === tagesSpiel(liste);
  }

  w.spikiuZugang = {
    darf: darf, tagesSpiel: tagesSpiel,
    status: function () { return { aktiv: aktiv(), abo: abo(), probeTage: aktiv() ? probeTage() : null }; }
  };
})(window);
