process.chdir(__dirname+'/daten');
const fs=require('fs');const l=process.argv[2];const r=require(__dirname+'/daten/formen.json')[l];
const ex={};r.forEach(x=>ex[x.f]=x);
const files=fs.readdirSync('p1out').filter(f=>f.startsWith(l+'-')).sort();
const map={},bad=[];const lem=new Map();
for(const f of files){const inp=fs.readFileSync('p1in/'+f,'utf8').trim().split('\n').map(x=>x.split('\t')[0]);
 const out=fs.readFileSync('p1out/'+f,'utf8').trim().split('\n');
 out.forEach((line,i)=>{const p=line.split('\t');let form=p[0];if(!p[1]){bad.push(f+':'+line);return;}
  if(!ex[form]){ if(inp[i]&&ex[inp[i]]) form=inp[i]; else {bad.push(f+':'+form);return;} }
  const a=(p[2]||'').trim(),g=(p[3]||'-').trim();map[form]={l:p[1].trim(),a};
  if(a==='x') return; const k=p[1].trim()+'|'+a;let e=lem.get(k);
  if(!e){e={l:p[1].trim(),a,g:g==='-'?null:g,fo:[],n:0,ex:null};lem.set(k,e);} e.fo.push(form);e.n+=ex[form].n;
  if(!e.ex||ex[form].n>0&&(ex[form].ex||'').length<(e.ex||'z'.repeat(999)).length&&(ex[form].ex||'').length>15) e.ex=ex[form].ex;});}
const missing=r.filter(x=>!map[x.f]).map(x=>x.f);
const L=[...lem.values()].sort((a,b)=>b.n-a.n);
fs.writeFileSync('map-'+l+'.json',JSON.stringify(map));fs.writeFileSync('lemmas-'+l+'.json',JSON.stringify(L));
const c={};L.forEach(e=>c[e.a]=(c[e.a]||0)+1);
console.log(l,'Formen',Object.keys(map).length,'/',r.length,'fehlend',missing.length,missing.slice(0,10).join(' '),'| kaputt',bad.length,bad.slice(0,3).join(' ; '),'| Lemmata',L.length,JSON.stringify(c));
