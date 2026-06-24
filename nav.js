/* ════════════════════════════════════════════════════════════════
   SPIKIU · nav.js — DIE EINE NAVI-WAHRHEIT
   ----------------------------------------------------------------
   Einbinden:  <script src="nav.js" defer></script>
   Aktive Seite (optional):  <body data-nav-active="dashboard">
                             oder  window.SPIKIU_NAV_ACTIVE = 'talk';
   Sonst wird die aktive Seite automatisch aus dem Dateinamen erkannt.

   Neuer Look (Teil 34, Paket 2 „Untere Navigation"):
   nav.js montiert eine FESTE UNTERE TAB-LEISTE mit fünf Tabs
   (Start · Reader · GESPRÄCH(Mitte, erhöhter vollständiger Capy) ·
   Werkstatt · Mein). „Werkstatt" und „Mein" öffnen je ein Bottom-Sheet,
   in dem ALLE alten Drawer-Ziele weiterleben. KEIN Hamburger/Drawer mehr.
   Oben steht nur noch die Wortmarke „Spikiu" (Teil 40: kein Deko-Capy).

   Teil 40 „Spikiu befreit": die Mitte (Gespräch) ist ein NEUTRALES Symbol
   (zwei Köpfchen, weiß auf grünem erhöhtem Sockel) — KEIN Capy, kein
   spkCapyAlive in der Navi. So tritt Spikiu nur noch als Charakter in den
   Räumen auf (Begrüßer im Gespräch, Lesebegleiter im Reader).

   Die Leistenhöhe steht als CSS-Variable --spk-navh am :root, damit die
   Seiten unten Platz reservieren (Scroll-Seiten: padding-bottom;
   Voll-Höhe-Seiten wie chat.html: height calc).

   Klassen sind mit "spk-" geprefixt. Sprache kommt aus dem Profil
   (localStorage spikiu_user / spikiu_lang). KEIN Sprachschalter.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__spikiuNavMounted) return;          // doppeltes Laden verhindern
  window.__spikiuNavMounted = true;

  // ── Profil lesen ────────────────────────────────────────────────
  function readUser() {
    try { return JSON.parse(localStorage.getItem('spikiu_user') || 'null'); }
    catch (e) { return null; }
  }
  function getLang() {
    const u = readUser();
    if (u && u.nativeLang && I18N[u.nativeLang]) return u.nativeLang;
    const map = { de: 'Deutsch', es: 'Español', en: 'English' };
    const stored = localStorage.getItem('spikiu_lang');
    if (stored && map[stored]) return map[stored];
    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('de') === 0) return 'Deutsch';
    if (nav.indexOf('es') === 0) return 'Español';
    return 'English';
  }
  function getTarget() {
    const u = readUser();
    return (u && u.profile && u.profile.targetLang) || (u && u.targetLang) || 'Spanish';
  }
  // „Ein Ziel existiert" = das Profil hat wirklich eine Zielsprache gesetzt
  // (nicht bloß der Default). Steuert, ob „Einstellungen" im Mein-Sheet erscheint.
  function hasGoal() {
    const u = readUser();
    return !!(u && ((u.profile && u.profile.targetLang) || u.targetLang));
  }

  // ── i18n ────────────────────────────────────────────────────────
  const I18N = {
    Deutsch: {
      navStart: 'Start', navReader: 'Reader', navTalk: 'Gespräch', navWerkstatt: 'Werkstatt', navMein: 'Mein',
      navLektionen: 'Lektionen',
      reader: 'Reader · Meine Bücher',
      write: 'Schreibwerkstatt', read: 'Lesewerkstatt', gym: 'Wortschatz-Werkstatt', proverbios: 'Sprichwörter',
      path: 'Lernweg', verlauf: 'Verlauf', lessons: 'Lektionen', settings: 'Einstellungen',
      lastLesson: 'Deine letzte Lektion', pastLessons: 'Vergangene Lektionen',
      soon: 'bald' },
    'Español': {
      navStart: 'Inicio', navReader: 'Reader', navTalk: 'Conversa', navWerkstatt: 'Taller', navMein: 'Perfil',
      navLektionen: 'Lecciones',
      reader: 'Reader · Mis libros',
      write: 'Taller de escritura', read: 'Taller de lectura', gym: 'Taller de vocabulario', proverbios: 'Proverbios',
      path: 'Ruta', verlauf: 'Progreso', lessons: 'Lecciones', settings: 'Ajustes',
      lastLesson: 'Tu última lección', pastLessons: 'Lecciones pasadas',
      soon: 'pronto' },
    English: {
      navStart: 'Home', navReader: 'Reader', navTalk: 'Talk', navWerkstatt: 'Workshop', navMein: 'Profile',
      navLektionen: 'Lessons',
      reader: 'Reader · My Books',
      write: 'Writing Workshop', read: 'Reading Workshop', gym: 'Vocabulary Workshop', proverbios: 'Proverbs',
      path: 'Path', verlauf: 'Progress', lessons: 'Lessons', settings: 'Settings',
      lastLesson: 'Your last lesson', pastLessons: 'Past lessons',
      soon: 'soon' }
  };

  // ── Aktive Seite (Dateiname → Tab-Schlüssel) ────────────────────
  function normalizeActive(v) {
    // alte Drawer-/Reader-Schlüssel sanft auf die fünf Tab-Schlüssel abbilden
    if (v === 'write' || v === 'read' || v === 'books' || v === 'reader') return 'werkstatt';
    if (v === 'sessions' || v === 'verlauf') return 'mein';
    if (v === 'lessons') return 'lektionen';
    return v;
  }
  function getActive() {
    if (window.SPIKIU_NAV_ACTIVE) return normalizeActive(window.SPIKIU_NAV_ACTIVE);
    const attr = document.body && document.body.getAttribute('data-nav-active');
    if (attr) return normalizeActive(attr);
    const f = (location.pathname.split('/').pop() || '').toLowerCase();
    if (f.indexOf('dashboard') === 0) {
      // Start UND Lektionen zeigen auf dashboard.html — nur der Hash unterscheidet.
      return (location.hash === '#lektionen') ? 'lektionen' : 'dashboard';
    }
    if (f.indexOf('chat') === 0) return 'talk';
    if (f.indexOf('schreibwerkstatt') === 0) return 'werkstatt';
    if (f.indexOf('taller') === 0) return 'werkstatt';
    if (f.indexOf('proverbios') === 0) return 'werkstatt';
    if (f.indexOf('gym') === 0) return 'werkstatt';
    if (f.indexOf('lektionen') === 0) return 'lektionen';
    // Reader (books.html + Kapitel cap*) liegt jetzt IN der Werkstatt
    if (f.indexOf('books') === 0 || f.indexOf('cap') === 0) return 'werkstatt';
    if (f.indexOf('sessions') === 0) return 'mein';
    return '';
  }

  // ── Icons (schlichte Linien-SVGs) ──────────────────────────────
  // Tab-Icons (Stil aus prototyp-bottom-nav.html)
  const TAB_ICON = {
    dashboard: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    books: '<path d="M3 5a2 2 0 012-2h6v18H5a2 2 0 01-2-2z"/><path d="M21 5a2 2 0 00-2-2h-6v18h6a2 2 0 002-2z"/>',
    werkstatt: '<path d="M2 22l3-1 12-12-2-2L3 19z"/><path d="M15 7l2-2 2 2-2 2z"/>',
    lektionen: '<rect x="4" y="5" width="13" height="15" rx="2"/><path d="M8 3h9a2 2 0 012 2v13"/><path d="M8 10h6M8 14h6"/>',
    mein: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'
  };
  // Sheet-Item-Icons (aus der alten Drawer-Welt übernommen)
  const ICON = {
    reader: '<path d="M3 5a2 2 0 012-2h6v18H5a2 2 0 01-2-2z"/><path d="M21 5a2 2 0 00-2-2h-6v18h6a2 2 0 002-2z"/>',
    write: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    read: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    gym: '<rect x="2.5" y="9" width="3" height="6" rx="1"/><rect x="18.5" y="9" width="3" height="6" rx="1"/><rect x="5.5" y="10.5" width="2" height="3" rx="0.5"/><rect x="16.5" y="10.5" width="2" height="3" rx="0.5"/><line x1="7.5" y1="12" x2="16.5" y2="12"/>',
    proverbios: '<path d="M10 8H6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2v2a2 2 0 0 1-2 2"/><path d="M20 8h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2v2a2 2 0 0 1-2 2"/>',
    path: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6"/>',
    verlauf: '<path d="M12 2v8"/><path d="M12 10c-3 0-5-2-5-5"/><path d="M12 10c3 0 5-2 5-5"/><path d="M9 22h6l-1-8h-4z"/>',
    lessons: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',
    lastLesson: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    pastLessons: '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><line x1="10" y1="12" x2="14" y2="12"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15H4.5a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 6 9.4l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 11 4.6V4.5a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 2.82 1.17l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 11H21a2 2 0 0 1 0 4h-.09z"/>'
  };

  // Teil 40 „Spikiu befreit": die Nav-Mitte ist NEUTRAL (Gespräch = zwei Köpfchen),
  // damit Spikiu FREI ist, nur als Charakter in den Räumen aufzutreten (nie als Nav-Deko).
  // Weiße Linien auf grünem erhöhtem Sockel; kein Capy, kein spkCapyAlive in der Navi.
  const TALK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="8" cy="8" r="2.7"/><path d="M3.3 16.2c0-2.6 2.1-4.2 4.7-4.2s4.7 1.6 4.7 4.2"/>' +
    '<circle cx="16.6" cy="9.6" r="2.5"/><path d="M12.8 16.6c.3-2.1 2.1-3.3 4.2-3.3 2.4 0 4.1 1.6 4.1 4.1"/></svg>';

  function lineIcon(d) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (d || '') + '</svg>';
  }

  // ── Struktur: fünf Tabs + zwei Bottom-Sheets ────────────────────
  const TABS = [
    { id: 'dashboard', labelKey: 'navStart',     href: 'dashboard.html' },
    { id: 'werkstatt', labelKey: 'navWerkstatt', sheet: 'werkstatt' },
    { id: 'talk',      labelKey: 'navTalk',      href: 'chat.html', center: true },
    { id: 'lektionen', labelKey: 'navLektionen', sheet: 'lektionen' },
    { id: 'mein',      labelKey: 'navMein',      sheet: 'mein' }
  ];

  function sheetItems(which, t) {
    if (which === 'lektionen') {
      return [
        { id: 'lastLesson',  href: 'lektionen.html#last' },   // Deine letzte Lektion (öffnet die neueste direkt)
        { id: 'pastLessons', href: 'lektionen.html' }         // Vergangene Lektionen (Archiv)
      ];
    }
    if (which === 'werkstatt') {
      return [
        { id: 'reader',     href: 'books.html' },           // Reader · Meine Bücher (Bibliothek)
        { id: 'read',       href: 'taller.html' },           // Lesewerkstatt (Leseverstehen) ≠ Reader
        { id: 'write',      href: 'schreibwerkstatt.html' }, // Schreibwerkstatt
        { id: 'proverbios', href: 'proverbios.html' },       // Sprichwort-Raum (Teil 50)
        { id: 'gym',        href: 'gym.html' }                // Wortschatz-Werkstatt (Teil 52)
      ];
    }
    // 'mein' — Lektionen sind jetzt ein eigener Tab, daher hier raus
    const items = [
      { id: 'path',    href: 'dashboard.html#lernweg' },
      { id: 'verlauf', href: 'sessions.html' }
    ];
    if (hasGoal()) items.push({ id: 'settings', disabled: true });  // nur mit gesetztem Ziel
    return items;
  }

  // ── Styles (spk-prefixed, selbst-injiziert) ────────────────────
  const CSS = `
  :root{ --spk-navh: 74px; }
  /* Schlanke Topbar — NUR Marken-Logo, kein Hamburger (für Seiten ohne eigenen Header) */
  .spk-topbar{display:flex;align-items:center;gap:.8rem;padding:.85rem 1.1rem;background:#f6f3ec;border-bottom:1px solid #e8e0d0;position:sticky;top:0;z-index:80;font-family:'DM Sans',system-ui,sans-serif;}
  .spk-brand{font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:#1a1816;display:flex;align-items:center;gap:.5rem;text-decoration:none;}
  .spk-brand em{color:#2d6a4f;font-style:italic;}
  .spk-brand svg{width:26px;height:26px;}

  /* ── Untere Tab-Leiste ── */
  .spk-bottomnav{position:fixed;left:0;right:0;bottom:0;z-index:90;background:#fff;border-top:1px solid #e8e4df;
    box-shadow:0 -2px 14px rgba(0,0,0,.05);font-family:'DM Sans',system-ui,sans-serif;overflow:visible;
    padding-bottom:env(safe-area-inset-bottom);}
  .spk-bottomnav-inner{display:flex;align-items:flex-end;justify-content:space-around;
    max-width:680px;margin:0 auto;padding:.4rem .3rem .5rem;overflow:visible;}
  .spk-tab{flex:1;background:none;border:none;cursor:pointer;text-decoration:none;
    display:flex;flex-direction:column;align-items:center;gap:.18rem;
    color:#6b6560;font-family:inherit;font-size:.6rem;font-weight:600;padding:.25rem 0;transition:color .15s;-webkit-tap-highlight-color:transparent;}
  .spk-tab .spk-tab-ic{width:24px;height:24px;display:flex;align-items:center;justify-content:center;}
  .spk-tab .spk-tab-ic svg{width:23px;height:23px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;}
  .spk-tab.spk-active{color:#2d6a4f;}
  .spk-tab.spk-active .spk-tab-ic svg{stroke:#2d6a4f;}
  /* zentraler erhöhter Gespräch-Knopf — NEUTRAL (zwei Köpfchen, weiß auf grün), kein Capy */
  .spk-tab.spk-center{flex:0 0 auto;margin:0 .15rem;}
  .spk-tab.spk-center .spk-ball{width:60px;height:60px;border-radius:50%;background:#2d6a4f;border:4px solid #faf9f7;
    box-shadow:0 6px 18px rgba(45,106,79,.28);display:flex;align-items:center;justify-content:center;
    transform:translateY(-14px);transition:transform .16s,background .16s;}
  .spk-tab.spk-center.spk-active .spk-ball{background:#1f5239;}
  .spk-tab.spk-center .spk-ball svg{width:28px;height:28px;}
  .spk-tab.spk-center .spk-lbl{transform:translateY(-11px);color:#2d6a4f;font-weight:700;}

  /* ── Bottom-Sheets (Werkstatt / Mein) ── */
  .spk-sheet-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:95;opacity:0;pointer-events:none;transition:opacity .22s ease;}
  .spk-sheet-backdrop.spk-show{opacity:1;pointer-events:auto;}
  .spk-sheet{position:fixed;left:0;right:0;bottom:0;z-index:96;max-width:680px;margin:0 auto;
    background:#fff;border-radius:18px 18px 0 0;box-shadow:0 -8px 30px rgba(0,0,0,.18);
    padding:.5rem 1rem calc(1.1rem + env(safe-area-inset-bottom));
    transform:translateY(110%);transition:transform .26s cubic-bezier(.32,.72,0,1);
    font-family:'DM Sans',system-ui,sans-serif;}
  .spk-sheet.spk-open{transform:translateY(0);}
  .spk-sheet-grip{width:38px;height:4px;border-radius:100px;background:#d4cdc6;margin:.35rem auto .7rem;}
  .spk-sheet-title{font-family:'Lora',serif;font-weight:700;font-size:1.05rem;color:#1a1816;margin:0 .2rem .55rem;}
  .spk-sheet-item{display:flex;align-items:center;gap:.85rem;padding:.85rem .7rem;border-radius:12px;
    text-decoration:none;color:#1a1816;font-size:.95rem;font-weight:500;border:none;background:none;width:100%;text-align:left;font-family:inherit;cursor:pointer;}
  .spk-sheet-item:hover{background:#f2efe9;}
  .spk-sheet-item svg{width:20px;height:20px;flex-shrink:0;stroke:#2d6a4f;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:.85;}
  .spk-sheet-item.spk-disabled{opacity:.45;cursor:default;}
  .spk-sheet-item.spk-disabled:hover{background:none;}
  .spk-sheet-badge{margin-left:auto;font-size:.6rem;background:#f0ece4;color:#9a948c;padding:.12rem .5rem;border-radius:100px;font-weight:600;}
  `;

  function injectStyles() {
    if (document.getElementById('spk-nav-styles')) return;
    const s = document.createElement('style');
    s.id = 'spk-nav-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ── Topbar (nur Marken-Logo) ─────────────────────────────────────
  function buildTopbar() {
    // Teil 40: kein Deko-Capy oben mehr — schlichte Wortmarke „Spikiu" (nur Text).
    const brand = '<a href="dashboard.html" class="spk-brand"><span>Spi<em>k</em>iu</span></a>';
    const host = document.querySelector('[data-spk-nav]');
    if (host) {
      // Slot-Modus: Seite hat eine eigene Kopfzeile → nur das Logo hinein, kein zweiter Balken.
      host.classList.add('spk-topbar-host');
      host.innerHTML = brand;
    } else {
      // Seite ohne eigenen Header → schlanke Topbar oben injizieren.
      const topbar = document.createElement('header');
      topbar.className = 'spk-topbar';
      topbar.innerHTML = brand;
      document.body.insertBefore(topbar, document.body.firstChild);
    }
  }

  // ── Untere Tab-Leiste ────────────────────────────────────────────
  function buildBottomNav() {
    const t = I18N[getLang()] || I18N.Deutsch;
    const active = getActive();

    let inner = '';
    TABS.forEach(function (tab) {
      const label = t[tab.labelKey] || tab.id;
      const cls = 'spk-tab' + (tab.center ? ' spk-center' : '') + (tab.id === active ? ' spk-active' : '');
      if (tab.center) {
        inner += '<a class="' + cls + '" href="' + tab.href + '" data-tab="' + tab.id + '">' +
          '<span class="spk-ball">' + TALK_ICON + '</span><span class="spk-lbl">' + label + '</span></a>';
      } else if (tab.href) {
        inner += '<a class="' + cls + '" href="' + tab.href + '" data-tab="' + tab.id + '">' +
          '<span class="spk-tab-ic">' + lineIcon(TAB_ICON[tab.id]) + '</span><span>' + label + '</span></a>';
      } else {
        inner += '<button type="button" class="' + cls + '" data-sheet="' + tab.sheet + '" data-tab="' + tab.id + '">' +
          '<span class="spk-tab-ic">' + lineIcon(TAB_ICON[tab.id]) + '</span><span>' + label + '</span></button>';
      }
    });

    const nav = document.createElement('nav');
    nav.className = 'spk-bottomnav';
    nav.id = 'spk-bottomnav';
    nav.innerHTML = '<div class="spk-bottomnav-inner">' + inner + '</div>';
    document.body.appendChild(nav);

    // Sheet-Knöpfe verdrahten
    nav.querySelectorAll('[data-sheet]').forEach(function (btn) {
      btn.addEventListener('click', function () { openSheet(btn.getAttribute('data-sheet')); });
    });

    measureNavH();
    return nav;
  }

  // ── Bottom-Sheets ────────────────────────────────────────────────
  function buildSheets() {
    const t = I18N[getLang()] || I18N.Deutsch;

    const backdrop = document.createElement('div');
    backdrop.className = 'spk-sheet-backdrop';
    backdrop.id = 'spk-sheet-backdrop';
    backdrop.addEventListener('click', closeSheet);
    document.body.appendChild(backdrop);

    [['werkstatt', t.navWerkstatt], ['lektionen', t.navLektionen], ['mein', t.navMein]].forEach(function (pair) {
      const which = pair[0], title = pair[1];
      const sheet = document.createElement('div');
      sheet.className = 'spk-sheet';
      sheet.id = 'spk-sheet-' + which;
      let h = '<div class="spk-sheet-grip"></div><div class="spk-sheet-title">' + title + '</div>';
      sheetItems(which, t).forEach(function (it) {
        const label = t[it.id] || it.id;
        const icon = lineIcon(ICON[it.id]);
        if (it.disabled) {
          h += '<div class="spk-sheet-item spk-disabled">' + icon + '<span>' + label + '</span><span class="spk-sheet-badge">' + t.soon + '</span></div>';
        } else {
          h += '<a class="spk-sheet-item" href="' + it.href + '">' + icon + '<span>' + label + '</span></a>';
        }
      });
      sheet.innerHTML = h;
      // ein Tipp auf ein echtes Ziel schließt das Sheet (vor der Navigation)
      sheet.querySelectorAll('a.spk-sheet-item').forEach(function (a) {
        a.addEventListener('click', function () { closeSheet(); });
      });
      document.body.appendChild(sheet);
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
  }

  let openSheetName = '';
  function openSheet(which) {
    if (openSheetName === which) { closeSheet(); return; }
    closeSheet();
    const sheet = document.getElementById('spk-sheet-' + which);
    if (!sheet) return;
    document.getElementById('spk-sheet-backdrop').classList.add('spk-show');
    sheet.classList.add('spk-open');
    openSheetName = which;
  }
  function closeSheet() {
    const bd = document.getElementById('spk-sheet-backdrop');
    if (bd) bd.classList.remove('spk-show');
    const open = document.querySelector('.spk-sheet.spk-open');
    if (open) open.classList.remove('spk-open');
    openSheetName = '';
  }

  // ── Aktive Tab-Markierung neu setzen (z. B. bei hashchange) ──────
  function updateActiveTab() {
    const active = getActive();
    document.querySelectorAll('.spk-tab').forEach(function (el) {
      el.classList.toggle('spk-active', el.getAttribute('data-tab') === active);
    });
  }

  // ── Leistenhöhe messen → --spk-navh ──────────────────────────────
  function measureNavH() {
    const nav = document.getElementById('spk-bottomnav');
    if (!nav) return;
    const h = Math.round(nav.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty('--spk-navh', h + 'px');
  }

  // Teil 40: kein Mitte-Capy mehr → kein spkCapyAlive/capy-vivo-Laden in der Navi.
  // capy-vivo.js bleibt unberührt und wird weiter von chat.html (Begrüßer) und
  // lesebegleiter.js (Reader) genutzt.

  // ── Montage ──────────────────────────────────────────────────────
  function mount() {
    injectStyles();
    buildTopbar();
    buildBottomNav();
    buildSheets();
    window.addEventListener('resize', measureNavH);
    window.addEventListener('orientationchange', measureNavH);
    window.addEventListener('hashchange', updateActiveTab);
  }

  // Öffentliche API
  window.spikiuNav = { openSheet: openSheet, closeSheet: closeSheet, measure: measureNavH };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
