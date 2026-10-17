process.chdir(__dirname+'/daten');
const fs=require('fs');const l=process.argv[2];const LANGS=['de','es','en','el'];const other=LANGS.filter(x=>x!==l);
const map=require(__dirname+'/daten/map-'+l+'.json');const lem=require(__dirname+'/daten/lemmas-'+l+'.json');
// p2-Ausgaben nach id (Lemma aus Pass 1) + Fach
const out={};const probleme=[];
for(const f of fs.readdirSync('p2out').filter(f=>f.startsWith(l+'-')).sort((a,b)=>parseInt(a.split('-')[1])-parseInt(b.split('-')[1]))){
  const inp=fs.readFileSync('p2in/'+f.replace(/jsonl$/,'jsonl'),'utf8').trim().split('\n').map(JSON.parse);
  const lines=fs.readFileSync('p2out/'+f,'utf8').trim().split('\n');
  if(lines.length!==inp.length) probleme.push(f+': '+lines.length+'/'+inp.length+' Zeilen');
  lines.forEach((s,i)=>{let e;try{e=JSON.parse(s);}catch(x){probleme.push(f+':'+(i+1)+' JSON');return;}
    const src=inp[i]; const key=(src?src.l:e.id)+'|'+(src?src.a:e.a); out[key]=e;});
}
const L=[],F={};let ohne=0;const fehltTr=[];
for(const e0 of lem){
  const key=e0.l+'|'+e0.a; let e=out[key];
  if(!e){ if(e0.a==='name') e={l:e0.l,a:'name'}; else {ohne++; e={l:e0.l,a:e0.a}; if(e0.g) e.g=e0.g;} }
  const OV=(require(__dirname+'/overrides.json')[l]||{})[key]; if(OV) e=Object.assign({},e,OV);
  if(e.a==='x') { continue; }
  const f={l:e.l||e0.l,a:e.a||e0.a};
  ['g','pl','fo','lt','tr','b','bt','v','adv'].forEach(k=>{if(e[k]!=null&&e[k]!=='') f[k]=e[k];});
  if(f.a==='ding'&&!f.g&&e0.g&&l!=='en') f.g=e0.g;
  if(l==='en') delete f.g;
  // tr/bt auf die drei anderen Sprachen begrenzen
  for(const k of ['tr','bt']) if(f[k]){ const o={}; other.forEach(x=>{if(f[k][x]) o[x]=f[k][x];}); f[k]=o; }
  if(f.a!=='name'&&(!f.tr||other.some(x=>!f.tr[x]))) fehltTr.push(f.l);
  const idx=L.length; L.push(f); e0.fo.forEach(fm=>{F[fm]=idx;});
  // Lemma selbst auch als Schlüssel (kleingeschrieben), falls nicht schon belegt
  const lk=f.l.toLowerCase(); if(F[lk]===undefined) F[lk]=idx;
  // auch die Adverbform und die Pluralform finden (ohne Artikel), wenn frei
  if(f.adv&&f.adv.f) String(f.adv.f).toLowerCase().split(/\s*·\s*/).forEach(x=>{if(x&&F[x]===undefined) F[x]=idx;});
  if(f.pl){const pw=String(f.pl).toLowerCase().split(/\s+/).pop(); if(pw&&F[pw]===undefined) F[pw]=idx;}
}
// DE: trennbare Verben — eine Form ohne Präfix (hilft) gehört zum Grundverb (helfen), wenn es da ist
let umgehaengt=0;
if(l==='de'){
  const tunIdx={};L.forEach((e,i)=>{if(e.a==='tun') tunIdx[e.l.toLowerCase()]=i;});
  const PRE=['zurück','zusammen','weiter','heraus','herein','hinaus','vorbei','entgegen','fest','fort','los','nach','vor','weg','zu','auf','aus','an','ab','bei','ein','mit','um','her','hin','durch','über','unter','wieder','statt','teil','kennen','spazieren','statt'];
  for(const [form,i] of Object.entries(F)){ const e=L[i]; if(e.a!=='tun') continue; const lem=e.l.toLowerCase();
    for(const p of PRE){ if(lem.startsWith(p)&&lem.length>p.length+2){ const base=lem.slice(p.length); if(tunIdx[base]!==undefined&&!form.startsWith(p)&&form!==lem){ F[form]=tunIdx[base]; umgehaengt++; } break; } } }
}
const js='/* lexikon-'+l+'.js — Léxico Zielsprache '+l+' · erzeugt 18.10.2026 aus allen Texten der App (Lernpfad, Lernromane, Wortfelder, Kurzsätze, Sprichwörter, Regional, Taller, Häppchen). NULL Token. Datenvertrag + API: lexikon.js. Nicht von Hand pflegen ohne Ledger-Eintrag. */\n'+
 '(function(w){var D='+JSON.stringify({F,L})+';if(w.spikiuLexikon&&w.spikiuLexikon.add)w.spikiuLexikon.add('+JSON.stringify(l)+',D);else(w.__spikiuLexikonWarte=w.__spikiuLexikonWarte||[]).push(['+JSON.stringify(l)+',D]);})(window);\n';
fs.writeFileSync(require('path').resolve(__dirname,'../..')+'/lexikon-'+l+'.js',js);
const c={};L.forEach(e=>c[e.a]=(c[e.a]||0)+1);
console.log('umgehängt',umgehaengt);console.log(l,'Fichas',L.length,JSON.stringify(c),'Formen',Object.keys(F).length,'| ohne Ficha',ohne,'| tr unvollständig',fehltTr.length,fehltTr.slice(0,8).join(', '),'| v',L.filter(e=>e.v).length,'adv',L.filter(e=>e.adv).length,'| KB',(js.length/1024|0));
if(probleme.length) console.log('  PROBLEME:',probleme.join(' ; '));
