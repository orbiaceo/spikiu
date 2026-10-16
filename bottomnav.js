/* ═══════════════════════════════════════════════════════════════════
   bottomnav.js — Spikiu Pop-Bottom-Nav (Mein Regal · Spikiu · Mein) — seit 16.10.2026, vorher Hilfe · Spikiu · Mein
   Self-mounting in <div id="spk-bnav-slot"></div>.
   Aktiver Tab aus <body data-nav="hilfe|mein">.

   MITTE = der lebendige Spikiu. Er navigiert NICHT — er spricht bei
   Berührung die passende Anweisung. Die Seite kann sie liefern über
   window.spikiuSagt() (z. B. haus.html: "¡Elige una actividad!").
   Ohne Hook spricht er einen Gruß in der Zielsprache.
   Sprechen (Aktivität) erreicht man über Abenteuer im Haus.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var CAPY = '<svg viewBox="0 0 80 80" fill="none">'
    + '<ellipse cx="40" cy="50" rx="28" ry="20" fill="#c9956a"/><ellipse cx="40" cy="28" rx="18" ry="15" fill="#c9956a"/>'
    + '<ellipse cx="40" cy="36" rx="10" ry="7" fill="#b8845a"/><ellipse cx="40" cy="33" rx="4" ry="2.5" fill="#8b5e3c"/>'
    + '<circle cx="38" cy="33" r="1" fill="#6b4226"/><circle cx="42" cy="33" r="1" fill="#6b4226"/>'
    + '<circle cx="33" cy="24" r="3.5" fill="#3d2b1f"/><circle cx="47" cy="24" r="3.5" fill="#3d2b1f"/>'
    + '<circle cx="34" cy="23" r="1.2" fill="white"/><circle cx="48" cy="23" r="1.2" fill="white"/>'
    + '<ellipse cx="26" cy="17" rx="6" ry="5" fill="#b8845a"/><ellipse cx="54" cy="17" rx="6" ry="5" fill="#b8845a"/>'
    + '<ellipse cx="22" cy="66" rx="7" ry="5" fill="#b8845a"/><ellipse cx="34" cy="68" rx="7" ry="5" fill="#b8845a"/>'
    + '<ellipse cx="46" cy="68" rx="7" ry="5" fill="#b8845a"/><ellipse cx="58" cy="66" rx="7" ry="5" fill="#b8845a"/>'
    + '<path d="M36 38 Q40 41 44 38" stroke="#8b5e3c" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>';

  function standardGruss(){
    var name = '', ziel = 'es';
    try{
      var u = JSON.parse(localStorage.getItem('spikiu_user') || '{}');
      name = (String(u.name || '').trim().split(/\s+/)[0]) || '';
      ziel = (u.profile && u.profile.zielsprache) || 'es';
    }catch(e){}
    var GR = {
      es: '¡Hola' + (name ? ', ' + name : '') + '!',
      de: 'Hallo' + (name ? ', ' + name : '') + '!',
      en: 'Hi' + (name ? ', ' + name : '') + '!',
      el: 'Γεια' + (name ? ', ' + name : '') + '!'
    };
    sprichText(GR[ziel] || GR.es, ziel);
  }
  function sprichText(txt, ziel){
    try{
      if (window.sprich) { window.sprich(txt, ziel); return; }
      if (window.speechSynthesis && window.SpeechSynthesisUtterance){
        var u = new SpeechSynthesisUtterance(txt);
        window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
      }
    }catch(e){}
  }

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
        + '.spk-tab.act{color:#1f93b0}'
        + '.spk-tab.center{flex:0 0 auto}'
        + '.spk-tab.center .ball{width:62px;height:62px;border-radius:999px;background:#fff;border:2.5px solid #15163a;'
          + 'display:flex;align-items:center;justify-content:center;box-shadow:3px 4px 0 #15163a;transform:translateY(-14px);'
          + 'animation:spkFloat 4s ease-in-out infinite}'
        + '.spk-tab.center .ball svg{width:48px;height:48px}'
        + '.spk-tab.center .lbl{transform:translateY(-12px);color:#15163a}'
        + '.spk-tab.center:active .ball{box-shadow:1px 2px 0 #15163a}'
        + '@keyframes spkFloat{0%,100%{transform:translateY(-14px)}50%{transform:translateY(-22px)}}'
        + '.spk-tab:active{opacity:.7}';
      var st = document.createElement('style'); st.id = 'spk-bnav-style'; st.textContent = css;
      document.head.appendChild(st);
    }

    var active = (document.body.getAttribute('data-nav') || '');
    try { if (active === 'haus' && sessionStorage.getItem('spk_haus_tuer') === 'regal') active = 'regal'; } catch(e){}
    // Im Haus wechselt der Raum ohne Seitenwechsel → Markierung nachziehen.
    document.addEventListener('spk-haus-raum', function(ev){
      var b = document.querySelector('.spk-tab[data-go="regal"]');
      if (b) b.classList.toggle('act', !!(ev && ev.detail === 'regal'));
    });
    /* Beschriftung in der Muttersprache (10.10.2026): profile.muttersprache → spikiu_lang → de. */
    var ml = 'de';
    try{ var mu = (JSON.parse(localStorage.getItem('spikiu_user') || '{}').profile || {}).muttersprache;
      var gl = localStorage.getItem('spikiu_lang');
      ml = ['de','es','en','el'].indexOf(mu) > -1 ? mu : (['de','es','en','el'].indexOf(gl) > -1 ? gl : 'de'); }catch(e){}
    var LB = { de:{ regal:'Mein Regal', mein:'Mein', nav:'Hauptnavigation' },
               es:{ regal:'Mi estante', mein:'Perfil', nav:'Navegación principal' },
               en:{ regal:'My shelf',  mein:'Profile', nav:'Main navigation' },
               el:{ regal:'Το ράφι μου', mein:'Προφίλ', nav:'Κύρια πλοήγηση' } }[ml];
    /* Regal-Symbol (Leo, 16.10.2026: „un icono especial que sea elocuente"): ein kleines
       Regal mit drei Büchern und einer Pflanze, die wächst — dein Regal wächst. */
    var REGAL = '<svg viewBox="0 0 32 32" width="26" height="26" fill="none" aria-hidden="true">'
      + '<g stroke="#15163a" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">'
      + '<rect x="4" y="11" width="4" height="12" rx="1" fill="#ffd24a"/><rect x="8.5" y="9" width="4" height="14" rx="1" fill="#1f93b0"/>'
      + '<rect x="13" y="12" width="3.6" height="11" rx="1" fill="#f7bcd8" transform="rotate(-8 14.8 17.5)"/>'
      + '<path d="M22 23 v-5" /><path d="M22 18 c-3 0-4-2-4-4 c2 0 4 1 4 4z" fill="#9bd14a"/><path d="M22 19 c2.5 0 3.6-1.8 3.6-3.6 c-1.8 0-3.6 1-3.6 3.6z" fill="#9bd14a"/>'
      + '<path d="M19.5 23 h5 l-.6 3 h-3.8z" fill="#c9956a"/>'
      + '<path d="M2.5 23.5 h27" stroke-width="2.2"/></g></svg>';
    slot.innerHTML =
      '<nav class="spk-bnav" role="navigation" aria-label="' + LB.nav + '">'
      + '<button class="spk-tab' + (active==='regal'?' act':'') + '" data-go="regal"><span class="tic">' + REGAL + '</span><span>' + LB.regal + '</span></button>'
      + '<button class="spk-tab center" data-go="spikiu" aria-label="Spikiu"><span class="ball">' + CAPY + '</span><span class="lbl">Spikiu</span></button>'
      + '<button class="spk-tab' + (active==='mein'?' act':'') + '" data-go="mein"><span class="tic">👤</span><span>' + LB.mein + '</span></button>'
      + '</nav>';

    var ZIEL = { regal:'haus.html?tuer=regal', mein:'mein.html' };   // Hilfe: „?" oben im Haus + in Mein (16.10.)
    slot.querySelectorAll('.spk-tab').forEach(function(b){
      b.addEventListener('click', function(){
        var go = b.getAttribute('data-go');
        if(go === 'spikiu'){
          if (typeof window.spikiuSagt === 'function') window.spikiuSagt();
          else standardGruss();
          return;                                   // Spikiu navigiert nicht — er spricht
        }
        if(go === 'regal' && typeof window.spikiuZumRegal === 'function'){ window.spikiuZumRegal(); return; }
        if(go === active) return;                   // schon hier
        if(ZIEL[go]) location.href = ZIEL[go];
      });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
