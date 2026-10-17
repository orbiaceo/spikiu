/* ════════════════════════════════════════════════════════════════════════
   wortschatz-reiter.js — der Raum „Wortschatz" hat drei Aktivitäten
   (Leo, 17.10.2026: „Feines Ohr und der Schlag in den Kasten Wortschatz …
   Feines Ohr ist fantastisch, um Wortschatz zu lernen … und zu Wortschatz-
   training, Memorierung gehört auch die Betonung. Die zwei sind eigentlich
   keine Spiele.")

     🃏 Karten       → gym.html            (Wörter › Sätze › Wendungen)
     👂 Feines Ohr   → spiele.html?spiel=oido&von=wortschatz
     🥁 Der Schlag   → spiele.html?spiel=golpe&von=wortschatz

   Der Motor von Feines Ohr und Der Schlag bleibt juegos.js + die Daten-
   funktionen in spiele.html; diese Leiste macht daraus nach außen EINEN Raum.

   API:
     spikiuWortschatzReiter.leiste(aktiv, sprache) → <nav> (aktiv: karten|oido|golpe)
     spikiuWortschatzReiter.titel(sprache)          → „Wortschatz" / „Vocabulario" …
   ════════════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  if (w.spikiuWortschatzReiter) return;

  var UI = {
    de: { titel:'Wortschatz',  karten:'Karten',  oido:'Feines Ohr',  golpe:'Der Schlag' },
    es: { titel:'Vocabulario', karten:'Tarjetas', oido:'Oído fino',   golpe:'El golpe' },
    en: { titel:'Vocabulary',  karten:'Cards',   oido:'Sharp Ear',   golpe:'The Beat' },
    el: { titel:'Λεξιλόγιο',   karten:'Κάρτες',  oido:'Λεπτό αυτί',  golpe:'Ο τόνος' }
  };
  var ZIEL = {
    karten: 'gym.html',
    oido:   'spiele.html?spiel=oido&von=wortschatz',
    golpe:  'spiele.html?spiel=golpe&von=wortschatz'
  };
  var EM = { karten:'🃏', oido:'👂', golpe:'🥁' };

  function css() {
    if (document.getElementById('spk-wsr-css')) return;
    var s = document.createElement('style'); s.id = 'spk-wsr-css';
    s.textContent =
      '.wsr{flex:0 0 auto;display:flex;gap:.35rem;justify-content:center;padding:.6rem .8rem 0;width:100%;box-sizing:border-box}' +
      '.wsr a{flex:1 1 0;max-width:9.5rem;display:flex;align-items:center;justify-content:center;gap:.3rem;text-decoration:none;' +
      'border:2.5px solid #15163a;border-radius:14px;background:#fff;color:#15163a;font:800 .8rem/1.1 "DM Sans",system-ui,sans-serif;' +
      'padding:.5rem .4rem;box-shadow:2px 2px 0 #15163a;-webkit-tap-highlight-color:transparent;text-align:center}' +
      '.wsr a .em{font-size:1.05rem;line-height:1}' +
      '.wsr a.an{background:#ffd24a;box-shadow:none;transform:translate(2px,2px)}';
    (document.head || document.documentElement).appendChild(s);
  }
  function ui(sprache) { return UI[sprache] || UI.de; }

  function leiste(aktiv, sprache) {
    css();
    var u = ui(sprache), nav = document.createElement('nav');
    nav.className = 'wsr'; nav.setAttribute('aria-label', u.titel);
    ['karten', 'oido', 'golpe'].forEach(function (id) {
      var a = document.createElement('a');
      a.href = ZIEL[id];
      if (id === aktiv) { a.className = 'an'; a.setAttribute('aria-current', 'page'); }
      var em = document.createElement('span'); em.className = 'em'; em.setAttribute('aria-hidden', 'true'); em.textContent = EM[id];
      var tx = document.createElement('span'); tx.textContent = u[id];
      a.appendChild(em); a.appendChild(tx);
      if (id === aktiv) a.onclick = function (e) { e.preventDefault(); };
      nav.appendChild(a);
    });
    return nav;
  }

  w.spikiuWortschatzReiter = { leiste: leiste, titel: function (s) { return ui(s).titel; } };
})(window);
