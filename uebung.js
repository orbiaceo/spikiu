/* ===================================================================
   uebung.js — wiederverwendbarer Übungs-Motor (Spikiu) · Teil 51
   -------------------------------------------------------------------
   Reines JS, KEIN KI/Netz. Liefert eine geprüfte Übungskarte als DOM.
   Wiederverwendbar (Proverbios, Gym, …) — eigener CSS-Namensraum „ueb-".

     var karte = window.spikiuUebung(item, type);   // → DOM-Element
     karte.addEventListener('ueb-done', function(e){ e.detail.ok });

   item = {
     text:       'Spruch/Satz in der Zielsprache',
     tr:         'Übersetzung (Muttersprache)',
     mean:       [richtig, falsch1, falsch2],   // Bedeutungen (für 'mc')
     lang:       'es'|'de'|'en'|'el',           // Zielsprache (Distraktor-Wörter)
     nativeLang: 'de'|'es'|'en'                 // UI-Sprache (Anweisungen)
   }
   type ∈ 'reorder' | 'intruder' | 'mc' | 'gap'   (erweiterbar)
=================================================================== */
(function (w) {
  'use strict';
  if (w.spikiuUebung) return;

  // ── UI-Texte (Anweisungen/Feedback) in der Muttersprache ──
  var UI = {
    de: { reorder:'Bring die Wörter in die richtige Reihenfolge.', intruder:'Tippe das Wort, das NICHT hineingehört.',
          mc:'Was bedeutet dieser Spruch?', gap:'Welches Wort fehlt?',
          right:'Richtig!', wrong:'Nicht ganz — so ist es richtig:' },
    es: { reorder:'Ordena las palabras correctamente.', intruder:'Toca la palabra que NO encaja.',
          mc:'¿Qué significa este refrán?', gap:'¿Qué palabra falta?',
          right:'¡Correcto!', wrong:'Casi — así es correcto:' },
    en: { reorder:'Put the words in the right order.', intruder:'Tap the word that does NOT belong.',
          mc:'What does this saying mean?', gap:'Which word is missing?',
          right:'Correct!', wrong:'Not quite — here it is:' }
  };
  // ── Distraktor-Wörter je Zielsprache (für intruder/gap) ──
  var DISTR = {
    es:['casa','tiempo','agua','mundo','noche','camino','puerta','mano','viento','fuego','piedra','cielo','perro','calle'],
    de:['Haus','Zeit','Wasser','Welt','Nacht','Weg','Tür','Hand','Wind','Feuer','Stein','Himmel','Hund','Straße'],
    en:['house','time','water','world','night','road','door','hand','wind','fire','stone','sky','dog','street'],
    el:['σπίτι','νερό','κόσμος','νύχτα','δρόμος','χέρι','φωτιά','πέτρα','σκύλος','ουρανός']
  };

  var STYLE_ID = 'spk-ueb-style';
  function injectStyle(){
    if (document.getElementById(STYLE_ID)) return;
    var css = ''
      + '.ueb{font-family:"DM Sans",system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:0.9rem;width:100%;max-width:23rem;margin:0 auto;}'
      + '.ueb-q{font-family:"Lora",serif;font-size:1.15rem;line-height:1.35;color:#1c1917;text-align:center;}'
      + '.ueb-saying{font-family:"Lora",serif;font-style:italic;font-size:1.05rem;line-height:1.4;color:#44403c;text-align:center;background:#f3f1ee;border-radius:12px;padding:0.7rem 0.9rem;}'
      + '.ueb-built{min-height:2.6rem;display:flex;flex-wrap:wrap;gap:0.4rem;justify-content:center;border-bottom:2px dashed #d6cfc8;padding:0.4rem 0 0.6rem;width:100%;}'
      + '.ueb-built.ueb-ok{border-color:#2d6a4f;} .ueb-built.ueb-bad{border-color:#c0392b;}'
      + '.ueb-bank{display:flex;flex-wrap:wrap;gap:0.4rem;justify-content:center;}'
      + '.ueb-chip{background:#fff;border:1.5px solid #e7e5e4;border-radius:100px;padding:0.45rem 0.85rem;font-family:"Lora",serif;font-size:0.95rem;color:#1c1917;cursor:pointer;transition:0.14s;-webkit-tap-highlight-color:transparent;}'
      + '.ueb-chip.sel{background:#e8f5ee;border-color:#2d6a4f;color:#1f5239;}'
      + '.ueb-chip.ueb-ok{background:#e8f5ee;border-color:#2d6a4f;color:#1f5239;}'
      + '.ueb-chip.ueb-bad{background:#fdebe9;border-color:#c0392b;color:#c0392b;text-decoration:line-through;}'
      + '.ueb-opts{display:flex;flex-direction:column;gap:0.55rem;width:100%;}'
      + '.ueb-opt{background:#fff;border:2px solid #2d6a4f;color:#2d6a4f;border-radius:1rem;padding:0.85rem 1.05rem;font-family:"Lora",serif;font-size:1.02rem;line-height:1.35;text-align:left;cursor:pointer;transition:0.14s;-webkit-tap-highlight-color:transparent;}'
      + '.ueb-opt:hover{background:#e8f5ee;} .ueb-opt:active{transform:scale(0.99);}'
      + '.ueb-opt.ueb-ok{background:#e8f5ee;border-color:#2d6a4f;color:#1f5239;font-weight:600;}'
      + '.ueb-opt.ueb-bad{background:#fdebe9;border-color:#c0392b;color:#c0392b;}'
      + '.ueb-fb{font-size:0.92rem;line-height:1.4;text-align:center;min-height:1.2rem;}'
      + '.ueb-fb.good{color:#2d6a4f;font-weight:600;} .ueb-fb.bad{color:#a04030;}';
    var st = document.createElement('style'); st.id = STYLE_ID; st.textContent = css;
    (document.head || document.documentElement).appendChild(st);
  }

  function uiOf(item){ return UI[item && item.nativeLang] || UI.de; }
  function shuffle(a){ for (var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var x=a[i]; a[i]=a[j]; a[j]=x; } return a; }
  function words(text){ return String(text||'').trim().replace(/[.,;:!¡¿?»«"“”’']/g,'').split(/\s+/).filter(Boolean); }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function mk(tag, cls, text){ var e=document.createElement(tag); if(cls)e.className=cls; if(text!=null)e.textContent=text; return e; }
  function distractors(item, exclude, n){
    var pool = (DISTR[item.lang] || DISTR.es).filter(function(x){ return exclude.indexOf(x.toLowerCase())<0; });
    shuffle(pool); return pool.slice(0, n);
  }
  function done(card, ok){ card.__done = true; card.dispatchEvent(new CustomEvent('ueb-done', { detail:{ ok: !!ok } })); }

  // ── Typ: Wörter ordnen ──
  function reorder(item, card){
    var L = uiOf(item), orig = words(item.text), pool = shuffle(orig.slice()), built = [];
    var line = mk('div','ueb-built'), bank = mk('div','ueb-bank'), fb = mk('div','ueb-fb');
    function render(){
      line.innerHTML=''; bank.innerHTML='';
      built.forEach(function(wd,i){ var b=mk('button','ueb-chip sel',wd); b.type='button'; b.onclick=function(){ if(card.__done)return; built.splice(i,1); pool.push(wd); render(); }; line.appendChild(b); });
      pool.forEach(function(wd,i){ var b=mk('button','ueb-chip',wd); b.type='button'; b.onclick=function(){ if(card.__done)return; pool.splice(i,1); built.push(wd); render(); if(built.length===orig.length) check(); }; bank.appendChild(b); });
    }
    function check(){
      var ok = built.join(' ')===orig.join(' ');
      line.classList.add(ok?'ueb-ok':'ueb-bad');
      fb.className='ueb-fb '+(ok?'good':'bad'); fb.textContent = ok ? L.right : (L.wrong+' '+orig.join(' '));
      done(card, ok);
    }
    card.appendChild(mk('div','ueb-q',L.reorder)); card.appendChild(line); card.appendChild(bank); card.appendChild(fb);
    render();
  }

  // ── Typ: Eindringling finden ──
  function intruder(item, card){
    var L = uiOf(item), ws = words(item.text);
    var intr = (distractors(item, ws.map(function(x){return x.toLowerCase();}), 1)[0]) || '·';
    var all = shuffle(ws.concat([intr]));
    var box = mk('div','ueb-bank'), fb = mk('div','ueb-fb');
    all.forEach(function(wd){
      var b=mk('button','ueb-chip',wd); b.type='button';
      b.onclick=function(){ if(card.__done)return;
        var ok = wd===intr;
        box.querySelectorAll('.ueb-chip').forEach(function(c){ if(c.textContent===intr) c.classList.add('ueb-ok'); });
        if(!ok) b.classList.add('ueb-bad');
        fb.className='ueb-fb '+(ok?'good':'bad'); fb.textContent = ok ? L.right : (L.wrong+' „'+intr+'"');
        done(card, ok);
      };
      box.appendChild(b);
    });
    card.appendChild(mk('div','ueb-q',L.intruder)); card.appendChild(box); card.appendChild(fb);
  }

  // ── Typ: Bedeutung A/B/C ──
  function mc(item, card){
    var L = uiOf(item);
    var correct = (item.mean||[])[0] || item.tr || '';
    var opts = shuffle((item.mean||[]).slice()).filter(Boolean);
    card.appendChild(mk('div','ueb-q',L.mc));
    card.appendChild(mk('div','ueb-saying',item.text||''));
    if (opts.length < 2){ card.appendChild(mk('div','ueb-fb good', item.tr||'')); return; }
    var box = mk('div','ueb-opts'), fb = mk('div','ueb-fb');
    opts.forEach(function(o){
      var b=mk('button','ueb-opt',o); b.type='button';
      b.onclick=function(){ if(card.__done)return;
        box.querySelectorAll('.ueb-opt').forEach(function(c){ if(c.textContent===correct) c.classList.add('ueb-ok'); });
        var ok=o===correct; if(!ok) b.classList.add('ueb-bad');
        fb.className='ueb-fb '+(ok?'good':'bad'); fb.textContent = ok ? L.right : L.wrong.replace(/:$/,'');
        done(card, ok);
      };
      box.appendChild(b);
    });
    card.appendChild(box); card.appendChild(fb);
  }

  // ── Typ: Lücke füllen ──
  function gap(item, card){
    var L = uiOf(item), ws = words(item.text);
    var gi=0, best=-1; ws.forEach(function(wd,i){ if(wd.length>best){ best=wd.length; gi=i; } });
    var missing = ws[gi] || '';
    var shown = ws.map(function(wd,i){ return i===gi ? '____' : wd; }).join(' ');
    var opts = shuffle([missing].concat(distractors(item, [missing.toLowerCase()], 2)));
    card.appendChild(mk('div','ueb-q',L.gap));
    card.appendChild(mk('div','ueb-saying',shown));
    var box = mk('div','ueb-opts'), fb = mk('div','ueb-fb');
    opts.forEach(function(o){
      var b=mk('button','ueb-opt',o); b.type='button';
      b.onclick=function(){ if(card.__done)return;
        box.querySelectorAll('.ueb-opt').forEach(function(c){ if(c.textContent===missing) c.classList.add('ueb-ok'); });
        var ok=o===missing; if(!ok) b.classList.add('ueb-bad');
        fb.className='ueb-fb '+(ok?'good':'bad'); fb.textContent = ok ? L.right : (L.wrong+' '+(item.text||''));
        done(card, ok);
      };
      box.appendChild(b);
    });
    card.appendChild(box); card.appendChild(fb);
  }

  var TYPES = { reorder:reorder, intruder:intruder, mc:mc, gap:gap };

  w.spikiuUebung = function(item, type){
    injectStyle();
    item = item || {};
    var card = document.createElement('div');
    card.className = 'ueb'; card.setAttribute('data-ueb', type || 'mc');
    var fn = TYPES[type] || TYPES.mc;
    try { fn(item, card); } catch(e){ card.appendChild(mk('div','ueb-fb good', item.tr || '')); }
    return card;
  };
  w.spikiuUebung.types   = ['reorder','intruder','mc','gap'];
  w.spikiuUebung.shuffle = shuffle;
  w.spikiuUebung.words   = words;

})(window);
