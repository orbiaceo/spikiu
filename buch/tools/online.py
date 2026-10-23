"""Online-Fassung (HTML) für Spikiu-Abonnenten: fließend, ohne Seiten, mit Audio-Knöpfen und aufklappbaren Lösungen."""
import json
from build import B, E, M, esc, strip_tags, cartoon_html, xref_html, spikiu, AUDIO_BASE, track_html

CSS = '''
@font-face{font-family:'Lexend';font-weight:100 900;font-display:swap;src:url(/fonts/lexend-latin-wght-normal.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Lexend';font-weight:100 900;font-display:swap;src:url(/fonts/lexend-latin-ext-wght-normal.woff2) format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Literata';font-weight:200 900;font-display:swap;src:url(/fonts/literata-latin-opsz-normal.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Literata';font-weight:200 900;font-display:swap;src:url(/fonts/literata-latin-ext-opsz-normal.woff2) format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Literata';font-style:italic;font-weight:200 900;font-display:swap;src:url(/fonts/literata-latin-opsz-italic.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Literata';font-style:italic;font-weight:200 900;font-display:swap;src:url(/fonts/literata-latin-ext-opsz-italic.woff2) format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}

.top a.back{margin-left:0;color:#c9d1cc}
.top a.other{margin-left:auto}
html,body{background:var(--paper)}
body{font-size:16px;line-height:1.55}
.top{position:sticky;top:0;z-index:10;background:var(--ink);color:#fff;display:flex;align-items:center;gap:12px;padding:10px 16px}
.top b{font-family:var(--f-head);font-weight:400;font-size:17px}
.top a{color:#ffd59a;font-size:14px;margin-left:auto}
.top button{background:none;border:1px solid #556;color:#fff;border-radius:6px;padding:4px 10px;font:inherit;font-size:14px;cursor:pointer}
.wrap{display:grid;grid-template-columns:270px 1fr;max-width:1180px;margin:0 auto}
nav.toc{position:sticky;top:52px;height:calc(100vh - 52px);overflow:auto;padding:18px 14px 40px;border-right:1px solid var(--line);font-size:14px}
nav.toc .ch{font-family:var(--f-head);font-size:13px;margin:14px 0 4px}
nav.toc .ch span{color:var(--sun);margin-right:6px}
nav.toc a{display:block;padding:3px 0 3px 8px;color:var(--grey);border-left:2px solid transparent}
nav.toc a:hover,nav.toc a.on{color:var(--ink);border-left-color:var(--sun)}
main{padding:24px 28px 80px;max-width:820px;min-width:0}
.ex-h{flex-wrap:wrap}
html,body{overflow-x:hidden}
.sec{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px 24px;margin:0 0 28px;scroll-margin-top:64px}
.sec h1.satz{font-size:30px}
.sec .cartoon{height:auto;display:flex;flex-direction:column-reverse;padding:12px 12px 28px}
.sec .cartoon .ph{position:static;padding:8px 0}
.sec .cartoon .bubs{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px}
.sec .cartoon .bub{position:relative;left:auto;right:auto;top:auto;transform:none;max-width:100%}
.sec .cartoon .bub.tr,.sec .cartoon .bub.mr{margin-left:auto}
.cgloss{font-size:13px;margin:-4px 0 14px}
.tbwrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
.tbwrap table{min-width:100%}
.sec .cartoon .ph img{height:84px}
.sec .bub{font-size:17px;max-width:260px}
.chap{font-family:var(--f-head);font-size:26px;margin:36px 0 14px}
.chap span{color:var(--sun);margin-right:10px}
.oneline,.box,.spk,.story-note,.use .x,.examples,table.tb,table.signal,table.conj{font-size:15px}
.ex-t{font-size:16px}.ex-k{font-size:11px}
.serif{font-size:20px}
.pair .o{font-size:18px}
details.sol{margin:-6px 0 18px 30px;font-size:15px}
details.sol summary{cursor:pointer;color:var(--accent);font-family:var(--f-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase}
details.sol div{background:var(--sun-l);border-radius:8px;padding:10px 14px;margin-top:6px}
details.sol .why{display:block;color:var(--sage);font-size:14px;margin-top:4px}
button.track{cursor:pointer;background:#fff;font-size:11px;padding:2px 8px}
button.track.playing{background:var(--sun);color:#fff;border-color:var(--sun)}
.go-link{display:flex;justify-content:space-between;border-top:1.5px solid var(--ink);padding-top:10px;margin-top:16px;font-size:15px}
.go-link .go{font-family:var(--f-head)}
.go-link .go span{color:var(--sun)}
.gap{width:70px}.gap.s{width:28px}.gap.m{width:50px}.gap.l{width:110px}
.write,.ln,ol.trans .w,ol.tf li .a{display:none}
ol.tf li{grid-template-columns:1fr}
.test{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px 24px;margin:0 0 28px}
.test h2{font-size:22px;color:var(--accent)}
.titem .q{font-size:19px}
.vt{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:16px;overflow-x:auto}
@media (max-width:560px){.top{gap:8px;padding:10px 12px}.top b{display:none}.top a{font-size:13px}}
@media (max-width:860px){.wrap{grid-template-columns:1fr}nav.toc{display:none;position:fixed;inset:52px 0 0 0;background:var(--paper);z-index:9;height:auto}
 nav.toc.open{display:block} main{padding:16px 16px 60px} .sec{padding:16px} .cols.n2,.cols.n3,.question.n2,.question.n3,.baskets.n2,.baskets.n3{grid-template-columns:1fr}
 .pairs,.pairs.n4,.pairs.n6{grid-template-columns:repeat(2,1fr)} .cards.n4,.cards.n5,.cards.n6{grid-template-columns:repeat(2,1fr)} .match{grid-template-columns:1fr} .fillgrid.fc3,.fillgrid.fc4{grid-template-columns:1fr 1fr}}
'''

JS = '''
var cur=null, lauf=0, mp3=null;
/* Audio (Leo, 23.10., 13:48): jeder Knopf spielt NUR seinen Block, Baustein für Baustein, mit echter Pause.
   Gibt es eine eigene Aufnahme (buch/audio/<track>.mp3, z. B. Leos Lautkapitel), spielt sie statt der Stimme. */
function aus(){ if(cur) cur.classList.remove('playing'); cur=null; lauf++; if(mp3){ try{mp3.pause();}catch(e){} mp3=null; } try{ window.spikiuStopp && window.spikiuStopp(); }catch(e){} }
function warte(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
async function spiele(b){
  aus(); cur=b; b.classList.add('playing'); var meins=++lauf;
  var tid=b.dataset.track;
  if((window.AUFNAHMEN||[]).indexOf(tid)>-1){
    mp3=new Audio('audio/'+tid+'.mp3'); mp3.onended=function(){ if(meins===lauf) aus(); };
    mp3.play().catch(function(){ if(meins===lauf) aus(); }); return;
  }
  var bs=(window.SAY||{})[b.dataset.key]||[];
  if(!bs.length || !window.spikiuSprich){ aus(); return; }
  for(var i=0;i<bs.length;i++){
    if(meins!==lauf) return;
    try{ await window.spikiuSprich(bs[i].t, 'es'); }catch(e){}
    if(meins!==lauf) return;
    if(i<bs.length-1) await warte(bs[i].p||700);
  }
  if(meins===lauf) aus();
}
document.addEventListener('click',function(e){
  var b=e.target.closest('button.track'); if(b){ if(cur===b){ aus(); } else { spiele(b); } }
  var m=e.target.closest('#menu'); if(m){document.querySelector('nav.toc').classList.toggle('open');}
  if(e.target.closest('nav.toc a')){document.querySelector('nav.toc').classList.remove('open');}
});
var links=[].slice.call(document.querySelectorAll('nav.toc a'));
var obs=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+en.target.id);});}});},{rootMargin:'-30% 0px -60% 0px'});
document.querySelectorAll('.sec').forEach(function(s){obs.observe(s);});
'''

JS_SITZUNG = '''
/* Sitzungs-Persistenz (CLAUDE.md): zuletzt gelesener Abschnitt, Wiederkommen-Karte beim Eintritt. */
(function(){
  var S=window.spikiuSitzung; if(!S) return;
  try{document.getElementById('zurBib').addEventListener('click',function(){try{sessionStorage.setItem('spk_haus_tuer','bibliothek');}catch(e){}});}catch(e){}
  var alt=S.lade(RAUM);
  if(alt && alt.sec && !location.hash){
    var el=document.getElementById(alt.sec);
    if(el && alt.sec!=='s-1-1'){
      S.frageWiederkommen({raum:RAUM, ts:alt.ts, wo:alt.titel||'',
        beimWeiter:function(){el.scrollIntoView();},
        beimNeu:function(){S.raeume(RAUM);window.scrollTo(0,0);}});
    }
  }
  var t=null;
  var o2=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){
    var sec=en.target; clearTimeout(t);
    t=setTimeout(function(){S.speichere(RAUM,{sec:sec.id,titel:sec.dataset.titel||''});},350);
  }});},{rootMargin:'-30% 0px -60% 0px'});
  document.querySelectorAll('.sec').forEach(function(s){o2.observe(s);});
})();
'''

def aufnahmen():
    import os, glob
    from build import ROOT
    return sorted(os.path.basename(f)[:-4] for f in glob.glob(os.path.join(ROOT, 'audio', '*.mp3')))

def build_online(book, chapters, tests, ctx):
    name = 'Gramática A' if book == 'G' else 'Cuaderno A'
    other = 'Cuaderno-A.html' if book == 'G' else 'Gramatica-A.html'
    other_name = 'Cuaderno A' if book == 'G' else 'Gramática A'
    nav = ''
    body = ''
    for ch in chapters:
        nav += f'<div class="ch"><span>{ch["chapter"]}</span>{esc(ch["title"])}</div>'
        body += f'<div class="chap"><span>{ch["chapter"]}</span>{esc(ch["title"])}</div>'
        for sec in ch['sections']:
            aid = 's-' + sec['id'].replace('.', '-')
            nav += f'<a href="#{aid}">{sec["id"]} {esc(sec["topic"])}</a>'
            baum = {'A1': '🌱 Samen', 'A2': '🌿 Stamm'}.get(sec['level'], sec['level'])   # in der App nie CEFR (CLAUDE.md)
            h = f'<div class="secnr"><b>{sec["id"]}</b>{esc(sec["topic"])} · {baum}</div>'
            if book == 'G':
                h += f'<h1 class="satz">{M(sec["headline_es"], ctx)}</h1><div class="satz-de">{M(sec["headline_de"], ctx)}</div>'
                h += cartoon_html(sec, ctx, big=True)
                for pg in sec['gramatica']:
                    h += ''.join(B(b, ctx) for b in pg)
                deeper = M(sec.get('deeper', ''), ctx)
                h += f'<div class="go-link"><span class="de">{deeper}</span><span class="go"><span>→</span> Üben: {xref_html("C", sec["id"], ctx)}</span></div>'
            else:
                h += f'<div class="back">← Erklärung: {xref_html("G", sec["id"], ctx)}</div>'
                n = 0
                for pg in sec['cuaderno']:
                    for e in pg:
                        n += 1
                        eh, sol = E(n, e, ctx)
                        h += eh + f'<details class="sol"><summary>Lösung</summary><div>{sol}</div></details>'
            body += f'<section class="sec" id="{aid}" data-titel="{sec["id"]} {esc(sec["topic"])}">{h}</section>'
        if book == 'C':
            for idx, t in tests:
                if t['after'] == ch['chapter']:
                    nav += f'<a href="#test-{idx}"><b>Test {idx}</b></a>'
                    items = ''
                    for i, it in enumerate(t['items']):
                        q = M(it['q'], ctx).replace('___', '<span class="gap m"></span>')
                        opts = ''.join(f'<div class="o"><small>{"abc"[j]})</small><span>{M(o, ctx)}</span></div>' for j, o in enumerate(it['options']))
                        items += f'<div class="titem"><div class="q"><b>{i+1}</b><span>{q}</span></div>{opts}</div>'
                    sol = ' · '.join(f'{i+1} {"abc"[it["answer"]]} ({it["ref"]})' for i, it in enumerate(t['items']))
                    body += f'<section class="test sec" id="test-{idx}"><h2>Test {idx} · {esc(t["covers"])}</h2>{items}<details class="sol"><summary>Lösungen</summary><div>{sol}</div></details></section>'
    if book == 'G':
        from build import verb_flow
        vf = verb_flow(ctx)
        if vf:
            nav += '<div class="ch"><span>+</span>Anhang</div><a href="#verbtabellen">Verbtabellen</a>'
            body += '<section class="sec" id="verbtabellen">' + ''.join(b[0] if isinstance(b, tuple) else b for b in vf) + '</section>'
    return (f'<!doctype html><html lang="de" class="ed-online book-{book.lower()}"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width,initial-scale=1"><title>{name} · Spikiu</title>'
            f'<link rel="stylesheet" href="assets/book.css"><style>{CSS}</style></head><body class="book-{book.lower()}">'
            f'<div class="top"><button id="menu">☰</button><a class="back" href="../haus.html" id="zurBib">‹ Bibliothek</a><b>{name}</b><a class="other" href="{other}">{other_name} →</a></div>'
            f'<div class="wrap"><nav class="toc">{nav}</nav><main>{body}</main></div>'
            f'<script>window.SAY={json.dumps(ctx.say, ensure_ascii=False)};window.AUFNAHMEN={json.dumps(aufnahmen())};</script>'
            f'<script type="module">import {{ speak, stop, warm }} from "/audio.js"; window.spikiuSprich = speak; window.spikiuStopp = stop; try{{ warm("es"); }}catch(e){{}}</script>'
            f'<script src="../sitzung.js"></script><script>var AUDIO="{AUDIO_BASE}";var RAUM="{"gramatica-a" if book=="G" else "cuaderno-a"}";{JS}{JS_SITZUNG}</script></body></html>')
