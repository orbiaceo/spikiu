const fs=require('fs'),vm=require('vm');
const path=require('path');const R=path.resolve(__dirname,'../..')+'/';
const win={}; win.window=win; win.self=win;
win.document={addEventListener(){},querySelector(){return null},createElement(){return {style:{}}},head:{appendChild(){}}};
win.localStorage={getItem(){return null},setItem(){}}; win.navigator={language:'de'}; win.addEventListener=()=>{};
const ctx=vm.createContext(win);
const files=fs.readdirSync(R).filter(f=>/^(lernpfad-daten.*|learnroman-[a-z]+|wortfelder|kurzsaetze|sprichwort|regional-daten|taller-daten|haeppchen-db|wortschatz|woerterbuch)\.js$/.test(f));
for(const f of files){try{vm.runInContext(fs.readFileSync(R+f,'utf8'),ctx,{filename:f});}catch(e){console.error('ERR',f,e.message);}}

const LANGS=['es','de','en','el'];
const SW={es:'el la los las de que y en un una es por con para no se lo al del está qué cómo pero muy mi tu su yo hay son estoy tengo me te le ya bien'.split(' '),
 de:'der die das und ist nicht ich du ein eine zu mit auf für sie es den dem wie wir ihr aber auch noch sehr bin hast hat sind mein dein im am zum'.split(' '),
 en:'the and is to of a in it you that for on with are this what i\'m it\'s not but my your we they have has do does was very can i be'.split(' ')};
function detect(s){
  if(/[Ͱ-Ͽἀ-῿]/.test(s)) return 'el';
  const w=s.toLowerCase().match(/[\p{L}']+/gu)||[]; const sc={es:0,de:0,en:0};
  for(const x of w) for(const l of ['es','de','en']) if(SW[l].includes(x)) sc[l]++;
  if(/[ñ¿¡]/.test(s)) sc.es+=3; if(/[äöüß]/i.test(s)) sc.de+=3; if(/[áéíóú]/i.test(s)) sc.es+=1;
  const best=Object.entries(sc).sort((a,b)=>b[1]-a[1]); if(best[0][1]===0||best[0][1]===best[1][1]) return null; return best[0][0];
}
const SKIP=new Set(['tr','t','na','translation','uebersetzung','übersetzung','lt','lautschrift','umschrift','teaser','id','icon','em','en_','thema','farbe','src','typ','audio','bild','img','farb','kurz','nm','level','art','stufe','hinweis','witz','rahmen','frage','erklaerung','schluss','bruecke','titel','untertitel','auftrag','deineRolle','grammatik','spikiu_na','konzept','bedeutung','w','de_','glossar']);
const S={es:[],de:[],en:[],el:[]}; // [text, quelle]
function walk(o,target,src,depth){
  if(o==null||depth>14) return;
  if(typeof o==='string'){ const d=detect(o); if(d===null||d===target) S[target].push([o,src]); return; }
  if(typeof o==='function') return;
  if(Array.isArray(o)){ o.forEach(x=>walk(x,target,src,depth+1)); return; }
  if(typeof o==='object') for(const k of Object.keys(o)){
    if(SKIP.has(k)) continue;
    if(LANGS.includes(k)&&k!==target) continue;
    walk(o[k],target,src,depth+1);
  }
}
// Lernpfad
walk(win.SpikiuLernpfad,'es','lernpfad',0); walk(win.SpikiuLernpfadDE,'de','lernpfad',0);
walk(win.SpikiuLernpfadEN,'en','lernpfad',0); walk(win.SpikiuLernpfadEL,'el','lernpfad',0);
// Romane
const NOV={ELLI:'el',EMMA:'el',GIULIA:'en',INES:'de',LOTTE:'es',LUKAS:'es',MARTA:'de',SOFIA:'en'};
for(const [k,l] of Object.entries(NOV)){ const b=win['SPIKIU_LR_'+k]; if(!b){console.error('fehlt',k);continue;} walk(b.K||b,l,'roman-'+k.toLowerCase(),0); }
// Mehrsprachig nach Zielsprache
for(const l of LANGS){
  walk(win.spikiuKurzsaetze&&win.spikiuKurzsaetze[l],l,'kurzsaetze',0);
  walk(win.spikiuRegional&&win.spikiuRegional[l],l,'regional',0);
  walk(win.spikiuTaller&&win.spikiuTaller.db[l],l,'taller',0);
  walk(win.spikiuSprichwort&&win.spikiuSprichwort.daten&&win.spikiuSprichwort.daten[l],l,'sprichwort',0);
  walk(win.spikiuSprichwort&&win.spikiuSprichwort.wendungen&&win.spikiuSprichwort.wendungen[l],l,'wendungen',0);
  try{ const m=l==='de'?'es':'de'; const ws=win.spikiuWortschatz(l,m)||[]; ws.forEach(x=>{S[l].push([x.wort,'wortschatz']); if(x.text) S[l].push([x.text,'wortschatz']);}); }catch(e){}
  for(const th of ['hotel','taxi','restaurant','cafe','einkaufen','wegbeschreibung','arzt','bahnhof','wetter','familie']){
    try{ const h=win.spikiuHaeppchen(th,l,l==='de'?'es':'de'); if(h) (h.wortschatz||[]).forEach(x=>S[l].push([x.ziel,'haeppchen'])); }catch(e){}
  }
  const d=win.spikiuWoerterbuch&&win.spikiuWoerterbuch.dict[l]; if(d) Object.keys(d).forEach(k=>S[l].push([k,'woerterbuch']));
}
// Wortfelder roh
const IDX={es:1,de:2,en:3,el:4}; const roh=win.spikiuWortfelder&&win.spikiuWortfelder.roh;
(function wf(o){ if(typeof o==='string'&&o.includes('|')){const p=o.split('|'); for(const l of LANGS) if(p[IDX[l]]) S[l].push([p[IDX[l]],'wortfelder']);} else if(o&&typeof o==='object') Object.values(o).forEach(wf); })(roh);

// Formen
const res={};
for(const l of LANGS){
  const forms=new Map(); let sents=0;
  for(const [txt,src] of S[l]){
    if(typeof txt!=='string') continue; sents++;
    const toks=txt.match(l==='en'?/[\p{L}]+(?:'[\p{L}]+)?/gu:/[\p{L}]+/gu)||[];
    for(const t of toks){ if(/^\p{L}$/u.test(t)&&!/^[aoyeiουηή]$/i.test(t)) continue;
      const k=t.toLowerCase(); let e=forms.get(k); if(!e){e={f:k,n:0,src:new Set(),ex:null}; forms.set(k,e);} e.n++; e.src.add(src.replace(/^roman-.*/,'roman'));
      if(!e.ex||(txt.length<e.ex.length&&txt.length>12)) e.ex=txt.length>160?txt.slice(0,160):txt; }
  }
  const arr=[...forms.values()].sort((a,b)=>b.n-a.n).map(e=>({f:e.f,n:e.n,src:[...e.src],ex:e.ex}));
  res[l]=arr; console.log(l,'Texte',sents,'Formen',arr.length,'≥2×',arr.filter(x=>x.n>=2).length);
}
fs.writeFileSync(__dirname+'/daten/formen.json',JSON.stringify(res));
