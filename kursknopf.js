/* ═══════════════════════════════════════════════════════════════════
   kursknopf.js — „Mein Kurs“ jederzeit erreichbar, auch mitten im Spiel
   (Leo, 22.11.2026: „über einen Button jederzeit erreichbar“ · Verteilung 1).

   Einbinden in jedem Raum:  <script src="kursknopf.js" defer></script>
   (aus Unterordnern mit ../kursknopf.js — das Ziel wird relativ zum Skript gebildet).

   Standard: kleine Pastell-Pille oben rechts (fest). Hat der Raum oben rechts
   schon etwas, sagt er per  data-kursknopf-ort="<CSS-Selektor>"  am <script>,
   VOR welches Element der Knopf in dessen Zeile gesetzt wird (z. B. Gramática: vor „Lesen | Üben“),
   oder per  data-kursknopf-in="<CSS-Selektor>"  in welche Kopfzeile er als letztes Element kommt
   (z. B. Regionalismen, deren langer Titel sonst unter der Pille läge).

   Ziel: haus.html?tuer=kurs → das Haus öffnet „Mein Kurs“; stand man zuletzt in
   einer Lektion, öffnet es genau diese Lektion. Der Raum sichert seinen Stand
   selbst über sitzung.js — der Knopf räumt nichts und fragt nichts.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  if (window.__spikiuKursknopf) return;
  window.__spikiuKursknopf = true;
  var skript = document.currentScript;
  var ort = skript && skript.getAttribute('data-kursknopf-ort');
  var hinein = skript && skript.getAttribute('data-kursknopf-in');
  var ziel = 'haus.html?tuer=kurs';
  try { ziel = new URL('haus.html?tuer=kurs', skript.src).href; } catch(e){}

  function sprache(){
    try{ var m = (JSON.parse(localStorage.getItem('spikiu_user') || '{}').profile || {}).muttersprache;
      if (['de','es','en','el'].indexOf(m) > -1) return m;
      var g = localStorage.getItem('spikiu_lang'); if (['de','es','en','el'].indexOf(g) > -1) return g; }catch(e){}
    return 'de';
  }
  var T = { de:{ k:'Kurs', a:'Zu Mein Kurs' }, es:{ k:'Curso', a:'Ir a tu curso' },
            en:{ k:'Course', a:'Go to your course' }, el:{ k:'Μάθημα', a:'Στο μάθημά μου' } }[sprache()];
  var IC = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/></svg>';

  function mount(){
    if (document.getElementById('spk-kursknopf')) return;
    if (!document.getElementById('spk-kursknopf-stil')){
      var st = document.createElement('style'); st.id = 'spk-kursknopf-stil';
      st.textContent = ''
        + '#spk-kursknopf{display:inline-flex;align-items:center;gap:.3rem;height:34px;padding:0 .75rem 0 .6rem;border-radius:999px;'
          + 'background:#c9ecd9;color:#15163a;border:1.5px solid #a9dcc1;box-shadow:0 4px 12px rgba(31,147,176,.14);cursor:pointer;'
          + 'font:800 .78rem/1 "Nunito","DM Sans",system-ui,sans-serif;text-decoration:none;-webkit-tap-highlight-color:transparent;white-space:nowrap}'
        + '#spk-kursknopf svg{color:#1f7f99;flex:0 0 auto}'
        + '#spk-kursknopf:active{transform:scale(.96)}'
        + '#spk-kursknopf.fest{position:fixed;top:calc(.55rem + env(safe-area-inset-top));right:.65rem;z-index:95}'
        + '@media print{#spk-kursknopf{display:none}}';
      document.head.appendChild(st);
    }
    var a = document.createElement('a');
    a.id = 'spk-kursknopf'; a.href = ziel; a.setAttribute('aria-label', T.a); a.title = T.a;
    a.innerHTML = IC + '<span>' + T.k + '</span>';
    var box = null;
    try { box = ort ? document.querySelector(ort) : null; } catch(e){}
    var zeile = null;
    try { zeile = hinein ? document.querySelector(hinein) : null; } catch(e){}
    if (zeile){ a.style.flex = '0 0 auto'; zeile.appendChild(a); }
    else if (box && box.parentNode){ a.style.flex = '0 0 auto'; box.parentNode.insertBefore(a, box); }
    else { a.className = 'fest'; document.body.appendChild(a); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
