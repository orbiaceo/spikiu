/* ═══════════════════════════════════════════════════════════════════
   wortjag.js — Tap-to-Collect (der Moat) + Sammel-Speicher „Mein Buch"
   Geteilter Helfer: jeder Raum bindet ihn ein und macht Text jagbar.
   Getippte Wörter wandern in localStorage 'spikiu_buch'.
   0 Backend, 0 Tokens.

   API:
     window.spikiuBuch.list()                 -> [{wort,tr,quelle,t}]
     window.spikiuBuch.add(wort,{tr,quelle})  -> true wenn NEU
     window.spikiuBuch.has(wort) / .count() / .remove(wort) / .clear()
     window.spikiuWortjag.aktivieren(el,{quelle, dict, ziel, onCollect})
        -> macht die Wörter in el antippbar; Tipp sammelt + markiert + Toast
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var KEY='spikiu_buch';
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(e){ return []; } }
  function save(a){ try{ localStorage.setItem(KEY, JSON.stringify(a)); }catch(e){} }
  function norm(w){ return String(w||'').trim().toLowerCase().replace(/^[¿¡"'«»(\[]+|[.,;:!?"'«»)\]]+$/g,''); }

  var Buch = {
    list: function(){ return load(); },
    has:  function(w){ var n=norm(w); return load().some(function(e){ return e.wort===n; }); },
    count:function(){ return load().length; },
    add:  function(w,opts){
      opts=opts||{}; var n=norm(w); if(!n) return false;
      var a=load(); if(a.some(function(e){ return e.wort===n; })) return false;
      a.push({ wort:n, roh:String(w).trim(), tr:opts.tr||'', quelle:opts.quelle||'', t:Date.now() });
      save(a); return true;
    },
    remove:function(w){ var n=norm(w); save(load().filter(function(e){ return e.wort!==n; })); },
    clear: function(){ save([]); }
  };

  var STYLE_ID='spk-wortjag-style';
  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var css=''
      +'.wj-wort{cursor:pointer;border-radius:5px;padding:0 1px;transition:background .12s;}'
      +'.wj-wort:active{background:rgba(155,209,74,.5);}'
      +'.wj-got{background:rgba(155,209,74,.12);}'+'.wj-flash{animation:wjflash .5s ease;}'+'@keyframes wjflash{0%{background:rgba(155,209,74,.55)}100%{background:rgba(155,209,74,.12)}}'
      +'.wj-toast{position:fixed;left:50%;bottom:calc(1.4rem + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9999;'
        +'background:#15163a;color:#fff;font:700 .85rem/1 "DM Sans",system-ui,sans-serif;padding:.5rem .85rem;border-radius:999px;'
        +'box-shadow:3px 3px 0 rgba(0,0,0,.3);opacity:0;transition:opacity .2s;pointer-events:none;}'
      +'.wj-toast.on{opacity:1;}';
    var st=document.createElement('style'); st.id=STYLE_ID; st.textContent=css; document.head.appendChild(st);
  }
  var toastEl;
  function toast(msg){
    ensureStyle();
    if(!toastEl){ toastEl=document.createElement('div'); toastEl.className='wj-toast'; document.body.appendChild(toastEl); }
    toastEl.textContent=msg; toastEl.classList.add('on');
    clearTimeout(toastEl._t); toastEl._t=setTimeout(function(){ toastEl.classList.remove('on'); },1500);
  }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  // Text in el in antippbare Wörter zerlegen (nur Text-Knoten, HTML bleibt heil)
  function tokenizeNode(node){
    var re=/\p{L}[\p{L}\p{M}'-]*/gu, txt=node.nodeValue, last=0, m, frag=document.createDocumentFragment(), any=false;
    while((m=re.exec(txt))){
      any=true;
      if(m.index>last) frag.appendChild(document.createTextNode(txt.slice(last,m.index)));
      var span=document.createElement('span'); span.className='wj-wort'; span.textContent=m[0];
      frag.appendChild(span); last=m.index+m[0].length;
    }
    if(!any) return;
    if(last<txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
    node.parentNode.replaceChild(frag,node);
  }
  function walk(el){
    var skip={SCRIPT:1,STYLE:1,BUTTON:1,TEXTAREA:1,INPUT:1};
    var kids=[].slice.call(el.childNodes);
    kids.forEach(function(n){
      if(n.nodeType===3){ if(n.nodeValue&&n.nodeValue.trim()) tokenizeNode(n); }
      else if(n.nodeType===1 && !skip[n.tagName] && !n.classList.contains('wj-wort')) walk(n);
    });
  }

  var Wortjag = {
    gestartet: function(){ return Buch.count()>0; },
    aktivieren: function(el, opts){
      if(!el) return; opts=opts||{}; ensureStyle();
      walk(el);
      // schon gesammelte markieren
      [].forEach.call(el.querySelectorAll('.wj-wort'), function(sp){
        if(Buch.has(sp.textContent)) sp.classList.add('wj-got');
      });
      el.addEventListener('click', function(ev){
        var sp=ev.target.closest && ev.target.closest('.wj-wort'); if(!sp||!el.contains(sp)) return;
        var wort=sp.textContent;
        var tr = opts.dict ? (opts.dict[String(wort).toLowerCase()]||'') : '';
        if(Buch.has(wort)){ toast('schon in deinem Buch'); return; }
        Buch.add(wort,{tr:tr, quelle:opts.quelle||''});
        sp.classList.add('wj-got');sp.classList.add('wj-flash');setTimeout(function(){sp.classList.remove('wj-flash');},520);
        toast('🍃 «'+wort+'»'+(tr?' · '+tr:''));
        if(typeof opts.onCollect==='function') try{ opts.onCollect(wort); }catch(e){}
      });
    }
  };

  window.spikiuBuch = Buch;
  window.spikiuWortjag = Wortjag;
})();
