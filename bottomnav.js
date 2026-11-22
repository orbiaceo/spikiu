/* ═══════════════════════════════════════════════════════════════════
   bottomnav.js — Spikiu-Leiste unten: MEIN KURS · RÄUME · REGAL · MEIN
   Seit 22.11.2026 (Leo, 09:11 „1! Perfekt gelöst!“ · Vorlage prototyp-kurs-unten4.html),
   Pastell Minze. Vorher (16.10.): Mein Regal · Spikiu · Mein.

   Self-mounting in <div id="spk-bnav-slot"></div>.
   Im Haus wechseln die Bereiche ohne Seitenwechsel: haus.html stellt
   window.spikiuHausBereich(bereich) bereit und meldet den Raum über das
   Ereignis 'spk-haus-raum' (start/lek-* → kurs · raeume/kat-* → raeume · regal).
   Außerhalb des Hauses führen die Knöpfe nach haus.html?tuer=<bereich>.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var G = {
    kurs:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    raeume:'<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="14.5" cy="12" r=".9"/>',
    regal:'<path d="M3 20h18M3 4v16M21 4v16"/><rect x="6" y="9" width="3" height="11"/><rect x="10" y="7" width="3" height="13"/><path d="M15 20l2-12 3 .6-2 11.4"/>',
    mein:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'
  };
  function ic(n){ return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + G[n] + '</svg>'; }

  /* Raum im Haus → Bereich der Leiste */
  function bereichVon(raum){
    raum = String(raum || '');
    if (raum === 'regal') return 'regal';
    if (raum === 'raeume' || raum.indexOf('kat-') === 0) return 'raeume';
    if (raum === 'mein') return 'mein';
    return 'kurs';
  }

  function mount(){
    var slot = document.getElementById('spk-bnav-slot');
    if(!slot || slot.dataset.mounted) return;
    slot.dataset.mounted = '1';

    if(!document.getElementById('spk-bnav-style')){
      var css = ''
        + '#spk-bnav-slot{flex:0 0 auto}'
        + '.spk-bnav{display:flex;align-items:flex-end;justify-content:space-around;gap:.2rem;'
          + 'padding:.45rem .8rem calc(.45rem + env(safe-area-inset-bottom));background:#fff;border-top:1px solid #dcebe1}'
        + '.spk-tab{flex:1;background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;'
          + 'gap:.15rem;padding:.15rem 0;border-radius:14px;color:#6f8279;font:800 .72rem "Nunito","DM Sans",system-ui,sans-serif}'
        + '.spk-tab .tic{height:28px;display:flex;align-items:center;justify-content:center;border-radius:999px;padding:0 .9rem;transition:background .2s}'
        + '.spk-tab.act{color:#1f7f99}'
        + '.spk-tab.act .tic{background:#c9ecd9}'
        + '.spk-tab:active{opacity:.7}'
        + '@media (prefers-reduced-motion:reduce){.spk-tab .tic{transition:none}}';
      var st = document.createElement('style'); st.id = 'spk-bnav-style'; st.textContent = css;
      document.head.appendChild(st);
    }

    var seite = (document.body.getAttribute('data-nav') || '');
    var aktiv = seite === 'mein' ? 'mein' : 'kurs';
    try { if (seite === 'haus') aktiv = bereichVon(sessionStorage.getItem('spk_haus_tuer')); } catch(e){}

    /* Beschriftung in der Muttersprache: profile.muttersprache → spikiu_lang → de. */
    var ml = 'de';
    try{ var mu = (JSON.parse(localStorage.getItem('spikiu_user') || '{}').profile || {}).muttersprache;
      var gl = localStorage.getItem('spikiu_lang');
      ml = ['de','es','en','el'].indexOf(mu) > -1 ? mu : (['de','es','en','el'].indexOf(gl) > -1 ? gl : 'de'); }catch(e){}
    var LB = { de:{ kurs:'Mein Kurs', raeume:'Räume', regal:'Regal', mein:'Mein', nav:'Hauptnavigation' },
               es:{ kurs:'Tu curso', raeume:'Espacios', regal:'Estante', mein:'Perfil', nav:'Navegación principal' },
               en:{ kurs:'Your course', raeume:'Rooms', regal:'Shelf', mein:'Profile', nav:'Main navigation' },
               el:{ kurs:'Το μάθημά μου', raeume:'Χώροι', regal:'Ράφι', mein:'Προφίλ', nav:'Κύρια πλοήγηση' } }[ml];

    slot.innerHTML = '<nav class="spk-bnav" role="navigation" aria-label="' + LB.nav + '">'
      + ['kurs','raeume','regal','mein'].map(function(k){
          return '<button class="spk-tab' + (aktiv===k?' act':'') + '" data-go="' + k + '"' + (aktiv===k?' aria-current="page"':'') + '>'
            + '<span class="tic">' + ic(k) + '</span><span>' + LB[k] + '</span></button>';
        }).join('')
      + '</nav>';

    function markiere(b){
      slot.querySelectorAll('.spk-tab').forEach(function(t){
        var an = t.getAttribute('data-go') === b;
        t.classList.toggle('act', an);
        if (an) t.setAttribute('aria-current','page'); else t.removeAttribute('aria-current');
      });
    }
    // Im Haus wechselt der Raum ohne Seitenwechsel → Markierung nachziehen.
    document.addEventListener('spk-haus-raum', function(ev){ markiere(bereichVon(ev && ev.detail)); });

    slot.querySelectorAll('.spk-tab').forEach(function(b){
      b.addEventListener('click', function(){
        var go = b.getAttribute('data-go');
        if (go === 'mein'){ if (seite !== 'mein') location.href = 'mein.html'; return; }
        if (typeof window.spikiuHausBereich === 'function'){ window.spikiuHausBereich(go); return; }
        location.href = 'haus.html?tuer=' + go;
      });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
