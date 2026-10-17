process.chdir(__dirname+'/daten');
const fs=require('fs');const l=process.argv[2];const L=require(__dirname+'/daten/lemmas-'+l+'.json').filter(e=>e.a!=='name');const B=200;let n=0;
for(let i=0;i<L.length;i+=B){n++;fs.writeFileSync('p2in/'+l+'-'+n+'.jsonl',L.slice(i,i+B).map(e=>JSON.stringify({l:e.l,a:e.a,g:e.g,fo:e.fo.slice(0,8),ex:(e.ex||'').slice(0,140)})).join('\n')+'\n');}
console.log(l,L.length,'Lemmata →',n,'Lose');
