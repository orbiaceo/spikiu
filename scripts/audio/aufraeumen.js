// scripts/audio/aufraeumen.js — nach dem Aufnehmen: MP3s löschen, die keine Satzliste mehr braucht,
// und je Stimme audio/<sprache>/<stimme>/index.json schreiben (Liste der vorhandenen Schlüssel),
// damit audio.js ohne 404-Versuche weiß, was es gibt. Gibt die Abdeckung je Stimme aus.
// Aufruf: node scripts/audio/aufraeumen.js <einheiten-alle.json> [--nur-pruefen]
'use strict';
const fs = require('fs');
const path = require('path');
const [quelle, modus] = process.argv.slice(2);
const nurPruefen = modus === '--nur-pruefen';
const alle = JSON.parse(fs.readFileSync(quelle, 'utf8'));
const WURZEL = path.resolve(__dirname, '..', '..');
const STIMMEN = ['F3', 'M2'];
let fehlenGesamt = 0;
for (const [sprache, einheiten] of Object.entries(alle)) {
  const brauche = new Set(einheiten.map((u) => u.key));
  for (const stimme of STIMMEN) {
    const ordner = path.join(WURZEL, 'audio', sprache, stimme);
    if (!fs.existsSync(ordner)) { console.log(`${sprache}/${stimme}: kein Ordner · fehlt ${brauche.size}`); fehlenGesamt += brauche.size; continue; }
    let geloescht = 0;
    const da = [];
    for (const f of fs.readdirSync(ordner)) {
      if (!f.endsWith('.mp3')) continue;
      const k = f.slice(0, -4);
      if (!brauche.has(k)) { if (!nurPruefen) { fs.unlinkSync(path.join(ordner, f)); geloescht++; } continue; }
      da.push(k);
    }
    da.sort();
    if (!nurPruefen) fs.writeFileSync(path.join(ordner, 'index.json'), JSON.stringify(da));
    const fehlt = brauche.size - da.length;
    fehlenGesamt += fehlt;
    console.log(`${sprache}/${stimme}: ${da.length}/${brauche.size} · fehlt ${fehlt} · gelöscht ${geloescht}`);
  }
}
console.log(`fehlt insgesamt: ${fehlenGesamt}`);
