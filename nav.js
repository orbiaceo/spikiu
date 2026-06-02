/* ════════════════════════════════════════════════════════════════
   SPIKIU · nav.js — DIE EINE NAVI-WAHRHEIT
   ----------------------------------------------------------------
   Einbinden:  <script src="nav.js" defer></script>
   Aktive Seite (optional):  <body data-nav-active="dashboard">
                             oder  window.SPIKIU_NAV_ACTIVE = 'talk';
   Sonst wird die aktive Seite automatisch aus dem Dateinamen erkannt.

   nav.js montiert sich selbst: Topbar (Hamburger + Logo), Drawer,
   Backdrop und eigene Styles werden injiziert. Klassen sind mit
   "spk-" geprefixt, damit nichts mit Seiten-Styles kollidiert.

   Sprache kommt aus dem Profil (localStorage spikiu_user / spikiu_lang).
   In der App gibt es KEINEN Sprachschalter — die Sprache steht fest.
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
  function getUserName() {
    const u = readUser();
    return (u && u.name) ? u.name : '';
  }
  function getActive() {
    if (window.SPIKIU_NAV_ACTIVE) return window.SPIKIU_NAV_ACTIVE;
    const attr = document.body && document.body.getAttribute('data-nav-active');
    if (attr) return attr;
    const f = (location.pathname.split('/').pop() || '').toLowerCase();
    if (f.indexOf('dashboard') === 0) return 'dashboard';
    if (f.indexOf('chat') === 0) return 'talk';
    if (f.indexOf('books') === 0 || f.indexOf('cap') === 0) return 'books';
    if (f.indexOf('sessions') === 0) return 'sessions';
    return '';
  }

  // ── i18n (Labels „ohne Begleiter") ─────────────────────────────
  const I18N = {
    Deutsch: { main: 'HAUPT', progress: 'FORTSCHRITT', account: 'KONTO',
      dashboard: 'Dashboard', talk: 'Jetzt sprechen', books: 'Bücher', sessions: 'Live-Begegnungen',
      lessons: 'Lektionen', path: 'Lernweg', verlauf: 'Verlauf', settings: 'Einstellungen', soon: 'bald', free: 'Gratis', menu: 'Menü' },
    'Español': { main: 'PRINCIPAL', progress: 'PROGRESO', account: 'CUENTA',
      dashboard: 'Dashboard', talk: 'Hablar ahora', books: 'Libros', sessions: 'Sesiones en vivo',
      lessons: 'Lecciones', path: 'Ruta', verlauf: 'Progreso', settings: 'Ajustes', soon: 'pronto', free: 'Gratis', menu: 'Menú' },
    English: { main: 'MAIN', progress: 'PROGRESS', account: 'ACCOUNT',
      dashboard: 'Dashboard', talk: 'Talk now', books: 'Books', sessions: 'Live Sessions',
      lessons: 'Lessons', path: 'Path', verlauf: 'Progress', settings: 'Settings', soon: 'soon', free: 'Free', menu: 'Menu' }
  };

  // ── Icons (schlichte Linien-SVGs) ──────────────────────────────
  const ICON = {
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    talk: '<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/>',
    books: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
    sessions: '<rect x="3" y="4" width="18" height="17" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>',
    lessons: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',
    path: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6"/>',
    verlauf: '<path d="M12 2v8"/><path d="M12 10c-3 0-5-2-5-5"/><path d="M12 10c3 0 5-2 5-5"/><path d="M9 22h6l-1-8h-4z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15H4.5a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 6 9.4l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 11 4.6V4.5a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 2.82 1.17l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 11H21a2 2 0 0 1 0 4h-.09z"/>'
  };

  const HAMBURGER_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  const CAPY_SVG = '<svg viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="50" rx="28" ry="20" fill="#c9956a"/><ellipse cx="40" cy="28" rx="18" ry="15" fill="#c9956a"/><ellipse cx="40" cy="36" rx="10" ry="7" fill="#b8845a"/><ellipse cx="40" cy="33" rx="4" ry="2.5" fill="#8b5e3c"/><circle cx="38" cy="33" r="1" fill="#6b4226"/><circle cx="42" cy="33" r="1" fill="#6b4226"/><circle cx="33" cy="24" r="3.5" fill="#3d2b1f"/><circle cx="47" cy="24" r="3.5" fill="#3d2b1f"/><circle cx="34" cy="23" r="1.2" fill="white"/><circle cx="48" cy="23" r="1.2" fill="white"/><ellipse cx="26" cy="17" rx="6" ry="5" fill="#b8845a"/><ellipse cx="54" cy="17" rx="6" ry="5" fill="#b8845a"/><ellipse cx="22" cy="66" rx="7" ry="5" fill="#b8845a"/><ellipse cx="34" cy="68" rx="7" ry="5" fill="#b8845a"/><ellipse cx="46" cy="68" rx="7" ry="5" fill="#b8845a"/><ellipse cx="58" cy="66" rx="7" ry="5" fill="#b8845a"/><path d="M36 38 Q40 41 44 38" stroke="#8b5e3c" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>';

  // ── Menü-Struktur ───────────────────────────────────────────────
  // hideIfTargetEN: bei englischer Zielsprache versteckt.
  const STRUCT = [
    { sec: 'main', items: [
      { id: 'dashboard', href: 'dashboard.html' },
      { id: 'talk', href: 'chat.html' },
      { id: 'books', href: 'books.html' },
      { id: 'sessions', href: 'sessions.html', hideIfTargetEN: true },
      { id: 'lessons', href: 'dashboard.html#lektionen' }
    ]},
    { sec: 'progress', items: [
      { id: 'path', href: 'dashboard.html#lernweg' },
      { id: 'verlauf', href: 'dashboard.html#verlauf' }
    ]},
    { sec: 'account', items: [
      { id: 'settings', disabled: true }
    ]}
  ];

  // ── Styles (spk-prefixed, selbst-injiziert) ────────────────────
  const CSS = `
  .spk-topbar{display:flex;align-items:center;gap:.8rem;padding:.85rem 1.1rem;background:#f6f3ec;border-bottom:1px solid #e8e0d0;position:sticky;top:0;z-index:80;font-family:'DM Sans',system-ui,sans-serif;}
  .spk-burger{background:none;border:none;color:#1a1816;cursor:pointer;padding:.2rem;display:flex;}
  .spk-burger svg{width:25px;height:25px;}
  .spk-brand{font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:#1a1816;display:flex;align-items:center;gap:.5rem;text-decoration:none;}
  .spk-brand em{color:#2d6a4f;font-style:italic;}
  .spk-brand svg{width:25px;height:25px;}
  .spk-backdrop{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:95;opacity:0;transition:opacity .22s ease;}
  .spk-backdrop.spk-show{display:block;opacity:1;}
  .spk-sidebar{position:fixed;top:0;left:0;height:100dvh;width:284px;background:#1a1816;padding:1.6rem 1.3rem;z-index:100;display:flex;flex-direction:column;overflow-y:auto;transform:translateX(-100%);transition:transform .26s cubic-bezier(.32,.72,0,1);box-shadow:4px 0 24px rgba(0,0,0,.25);font-family:'DM Sans',system-ui,sans-serif;}
  .spk-sidebar.spk-open{transform:translateX(0);}
  .spk-logo{font-family:'Lora',serif;font-size:1.3rem;font-weight:700;color:#fff;letter-spacing:-.02em;margin-bottom:1.8rem;display:flex;align-items:center;gap:.6rem;text-decoration:none;}
  .spk-logo em{color:#c9956a;font-style:italic;}
  .spk-logo svg{width:24px;height:24px;}
  .spk-section{font-size:.66rem;font-weight:700;letter-spacing:.12em;color:#5a554f;margin:1.2rem 0 .5rem .75rem;}
  .spk-section:first-of-type{margin-top:0;}
  .spk-item{display:flex;align-items:center;gap:.7rem;padding:.6rem .75rem;border-radius:8px;color:#8a847c;text-decoration:none;font-size:.9rem;font-weight:500;transition:all .15s;cursor:pointer;margin-bottom:.15rem;border:none;background:none;width:100%;text-align:left;font-family:inherit;}
  .spk-item:hover{background:rgba(255,255,255,.06);color:#cdc6bd;}
  .spk-item.spk-active{background:rgba(45,106,79,.22);color:#a8d5be;}
  .spk-item svg{width:17px;height:17px;flex-shrink:0;opacity:.75;}
  .spk-item.spk-disabled{opacity:.4;cursor:default;}
  .spk-item.spk-disabled:hover{background:none;color:#8a847c;}
  .spk-badge{margin-left:auto;font-size:.6rem;background:rgba(255,255,255,.1);color:#9a948c;padding:.1rem .45rem;border-radius:100px;}
  .spk-bottom{margin-top:auto;padding-top:1.2rem;border-top:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:.7rem;}
  .spk-avatar{width:36px;height:36px;border-radius:50%;background:#c9956a;color:#3d2b1f;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;}
  .spk-uname{color:#e6e1d8;font-size:.88rem;font-weight:600;}
  .spk-umeta{color:#6b655d;font-size:.72rem;}
  `;

  // ── DOM bauen ────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('spk-nav-styles')) return;
    const s = document.createElement('style');
    s.id = 'spk-nav-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function buildShell() {
    // Topbar ganz oben einfügen
    const topbar = document.createElement('header');
    topbar.className = 'spk-topbar';
    topbar.innerHTML =
      '<button class="spk-burger" id="spk-burger" aria-label="Menu">' + HAMBURGER_SVG + '</button>' +
      '<a href="dashboard.html" class="spk-brand">' + CAPY_SVG + '<span>Spi<em>k</em>iu</span></a>';
    document.body.insertBefore(topbar, document.body.firstChild);

    const backdrop = document.createElement('div');
    backdrop.className = 'spk-backdrop';
    backdrop.id = 'spk-backdrop';
    document.body.appendChild(backdrop);

    const sidebar = document.createElement('aside');
    sidebar.className = 'spk-sidebar';
    sidebar.id = 'spk-sidebar';
    document.body.appendChild(sidebar);

    document.getElementById('spk-burger').addEventListener('click', open);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  function renderSidebar() {
    const lang = getLang();
    const t = I18N[lang] || I18N.Deutsch;
    const target = getTarget();
    const active = getActive();

    let h = '<a href="dashboard.html" class="spk-logo">' + CAPY_SVG + '<span>Spi<em>k</em>iu</span></a>';

    STRUCT.forEach(function (group) {
      const visible = group.items.filter(function (it) { return !(it.hideIfTargetEN && target === 'English'); });
      if (!visible.length) return;
      h += '<div class="spk-section">' + t[group.sec] + '</div>';
      visible.forEach(function (it) {
        const label = t[it.id] || it.id;
        const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICON[it.id] || '') + '</svg>';
        if (it.disabled) {
          h += '<div class="spk-item spk-disabled">' + icon + '<span>' + label + '</span><span class="spk-badge">' + t.soon + '</span></div>';
        } else {
          const cls = 'spk-item' + (it.id === active ? ' spk-active' : '');
          h += '<a class="' + cls + '" href="' + it.href + '">' + icon + '<span>' + label + '</span></a>';
        }
      });
    });

    const name = getUserName();
    const initial = name ? name.charAt(0).toUpperCase() : '🐾';
    h += '<div class="spk-bottom"><div class="spk-avatar">' + initial + '</div>' +
         '<div><div class="spk-uname">' + (name || 'Spikiu') + '</div><div class="spk-umeta">' + t.free + '</div></div></div>';

    document.getElementById('spk-sidebar').innerHTML = h;
  }

  function open() {
    renderSidebar();
    document.getElementById('spk-sidebar').classList.add('spk-open');
    document.getElementById('spk-backdrop').classList.add('spk-show');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    document.getElementById('spk-sidebar').classList.remove('spk-open');
    document.getElementById('spk-backdrop').classList.remove('spk-show');
    document.body.style.overflow = '';
  }

  function mount() {
    injectStyles();
    buildShell();
    renderSidebar();
  }

  // Öffentliche API (falls eine Seite die Navi steuern will)
  window.spikiuNav = { open: open, close: close, render: renderSidebar };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
