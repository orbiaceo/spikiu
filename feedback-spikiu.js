/* ── SPIKIU · TESTER-FEEDBACK (Lader + Konfiguration) ─────────────────
   Leo (25.10.2026): beim Testen Fehler an Ort und Stelle melden. Jede
   Meldung wird ein GitHub-Issue in orbiaceo/spikiu (Funktion api/feedback.js).
   „Korrigieren“ → stündliche Aufgabe korrigiert und pusht nach dev.
   „Später besprechen“ → steht beim nächsten Design-Gespräch als To-do im Ledger.

   Normale Nutzer sehen NICHTS und laden nichts: Das Fenster (feedback/widget.js,
   gebündelt aus iuspik) wird nur geholt, wenn auf diesem Gerät ein
   Tester-Schlüssel liegt oder die URL ?tester=SCHLÜSSEL trägt.
   Einbinden: <script src="/feedback-spikiu.js" defer></script>
   Schnittstelle des Fensters: orbiaceo/iuspik docs/FEEDBACK_WIDGET.md        */
(function () {
  if (window.spikiuFeedback) return;
  window.spikiuFeedback = true;

  var SCHLUESSEL = 'spikiu.testerKey';
  var PARAM = 'tester';

  // Kategorien: gleiche ids wie in api/feedback.js
  var KATEGORIEN = [
    { id: 'semantik', label: 'Semantik' },
    { id: 'didaktik', label: 'Didaktik' },
    { id: 'grammatik', label: 'Grammatik' },
    { id: 'rechtschreibung', label: 'Rechtschreibung' },
    { id: 'uebersetzung', label: 'Übersetzung' },
    { id: 'audio', label: 'Audio/Aussprache' },
    { id: 'ux', label: 'UX-Design' },
    { id: 'technik', label: 'Technik/Fehler' },
    { id: 'idee', label: 'Idee', laterOnly: true }
  ];

  // ?tester=… sofort merken (vor jeder Weiterleitung einer Seite);
  // ?tester= (leer) löscht den Schlüssel auf diesem Gerät.
  function hatSchluessel() {
    try {
      var q = new URLSearchParams(window.location.search);
      if (q.has(PARAM)) {
        var k = q.get(PARAM) || '';
        if (k) localStorage.setItem(SCHLUESSEL, k); else localStorage.removeItem(SCHLUESSEL);
        return true;
      }
      return !!localStorage.getItem(SCHLUESSEL);
    } catch (e) { return false; }
  }
  if (!hatSchluessel()) return;

  // ── Kontext: wo war Leo, als er das Fenster öffnete? ──────────────
  function json(raw) { try { return JSON.parse(raw); } catch (e) { return raw; } }
  function kurz(s, n) { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n) + ' …' : s; }

  // Text der Karte in der Bildschirmmitte: Spikius Karten haben (noch) keine
  // stabilen ids, darum der sichtbare Text als Wiedererkennung.
  function karteInDerMitte() {
    try {
      var root = document.querySelector('.fb-root');
      var x = window.innerWidth / 2, y = window.innerHeight * 0.45;
      var el = document.elementFromPoint(x, y);
      if (!el || (root && root.contains(el))) return null;
      var weg = [];
      for (var n = el, i = 0; n && n !== document.body && i < 8; n = n.parentElement, i++) {
        weg.push(n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (n.classList.length ? '.' + Array.prototype.slice.call(n.classList, 0, 3).join('.') : ''));
      }
      var block = el;
      while (block.parentElement && block.parentElement !== document.body && (block.innerText || '').length < 60) block = block.parentElement;
      return { text: kurz(block.innerText, 500), pfad: weg.join(' < ') };
    } catch (e) { return null; }
  }

  function sitzungen() {
    var out = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf('spikiu_sitzung:') === 0) out[k.slice(15)] = kurz(localStorage.getItem(k), 1500);
      }
    } catch (e) {}
    return out;
  }

  function kontext() {
    var nutzer = null, profil = {};
    try { nutzer = json(localStorage.getItem('spikiu_user') || 'null'); profil = (nutzer && nutzer.profile) || {}; } catch (e) {}
    var tuer = null; try { tuer = sessionStorage.getItem('spk_haus_tuer'); } catch (e) {}
    var karte = karteInDerMitte();
    return {
      view: (location.pathname.replace(/^\//, '') || 'index.html') + (tuer ? ' · ' + tuer : '') + (location.hash || ''),
      raum: tuer,
      muttersprache: profil.muttersprache || null,
      zielsprache: profil.zielsprache || null,
      uiSprache: (function () { try { return localStorage.getItem('spikiu_lang'); } catch (e) { return null; } })(),
      karte: karte ? karte.text : null,
      element: karte ? karte.pfad : null,
      sitzungen: sitzungen()
    };
  }

  // ── Fenster laden und einhängen ───────────────────────────────────
  function link(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l);
  }
  function start() {
    link('/feedback/spikiu.css');
    var s = document.createElement('script');
    s.src = '/feedback/widget.js';
    s.onload = function () {
      try {
        window.spikiuFeedbackModul.mountFeedback({
          app: 'spikiu',
          endpoint: '/api/feedback',
          categories: KATEGORIEN,
          context: kontext,
          storageKey: SCHLUESSEL,
          keyParam: PARAM,
          stylesheet: '/feedback/widget.css',
          side: 'right',
          images: { max: 4, maxSide: 1600, quality: 0.8 },
          verifyKey: true,
          requireKey: true
        });
      } catch (e) { if (window.console) console.warn('Feedback-Fenster:', e); }
    };
    document.head.appendChild(s);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
