/* ═══════════════════════════════════════════════════════════════════
   bottomnav.js — Spikiu Pop-Bottom-Nav (Haus · Sprechen · Mein)
   Self-mounting in <div id="spk-bnav-slot"></div>.
   Aktiver Tab aus <body data-nav="haus|mein">.
   Lässt die alte nav.js unangetastet (chat.html nutzt die noch).
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  function mount(){
    var slot = document.getElementById('spk-bnav-slot');
    if(!slot || slot.dataset.mounted) return;
    slot.dataset.mounted = '1';

    if(!document.getElementById('spk-bnav-style')){
      var css = ''
        + '#spk-bnav-slot{flex:0 0 auto}'
        + '.spk-bnav{display:flex;align-items:flex-end;justify-content:space-around;'
          + 'padding:.5rem .8rem calc(.5rem + env(safe-area-inset-bottom));background:#fff;border-top:2.5px solid #15163a}'
        + '.spk-tab{flex:1;background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;'
          + 'gap:.15rem;color:#5f7068;font:700 .68rem "DM Sans",system-ui,sans-serif}'
        + '.spk-tab .tic{width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:1.25rem}'
        + '.spk-tab.act{color:#2d6a4f}'
        + '.spk-tab.center{flex:0 0 auto}'
        + '.spk-tab.center .ball{width:60px;height:60px;border-radius:999px;background:#ff4f9a;border:2.5px solid #15163a;'
          + 'display:flex;align-items:center;justify-content:center;font-size:1.6rem;box-shadow:3px 4px 0 #15163a;transform:translateY(-14px)}'
        + '.spk-tab.center .lbl{transform:translateY(-12px);color:#15163a}'
        + '.spk-tab.center:active .ball{transform:translateY(-12px);box-shadow:1px 2px 0 #15163a}'
        + '.spk-tab:active{opacity:.7}';
      var st = document.createElement('style'); st.id = 'spk-bnav-style'; st.textContent = css;
      document.head.appendChild(st);
    }

    var active = (document.body.getAttribute('data-nav') || 'haus');
    slot.innerHTML =
      '<nav class="spk-bnav" role="navigation" aria-label="Hauptnavigation">'
      + '<button class="spk-tab' + (active==='haus'?' act':'') + '" data-go="haus"><span class="tic">🏠</span><span>Haus</span></button>'
      + '<button class="spk-tab center" data-go="talk"><span class="ball">💬</span><span class="lbl">Sprechen</span></button>'
      + '<button class="spk-tab' + (active==='mein'?' act':'') + '" data-go="mein"><span class="tic">👤</span><span>Mein</span></button>'
      + '</nav>';

    var ZIEL = { haus:'haus.html', talk:'chat.html', mein:'mein.html' };
    slot.querySelectorAll('.spk-tab').forEach(function(b){
      b.addEventListener('click', function(){
        var go = b.getAttribute('data-go');
        if(go === active) return;                 // schon hier
        if(ZIEL[go]) location.href = ZIEL[go];
      });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
