// Baut echte Karten (Natural Earth) für die vier Zielsprachen als SVG-Pfade.
import fs from 'fs';
import { execSync } from 'child_process';
import * as d3 from 'd3-geo';

const L = f => JSON.parse(fs.readFileSync(f));
const ROH = process.env.NE_DIR || '.';  // Ordner mit den Natural-Earth-Dateien (siehe README)
const R = f => L(ROH + '/' + f);
const mu = R('mu50.geojson'), c10 = R('c10.geojson'), a1 = R('a1.geojson');
const byA3 = (src, key, codes) => src.features.filter(f => codes.includes(f.properties[key]));
const adm1 = (a3, names) => a1.features.filter(f => f.properties.adm0_a3 === a3 && names.includes(f.properties.name));

function tag(feats, rid) { return feats.map(f => ({ type: 'Feature', properties: { rid }, geometry: f.geometry })); }
function simplify(feats, pct, name) {
  const inp = `/tmp/${name}-in.json`, out = `/tmp/${name}-out.json`;
  fs.writeFileSync(inp, JSON.stringify({ type: 'FeatureCollection', features: feats }));
  execSync(`npx mapshaper ${inp} -simplify ${pct} keep-shapes -o ${out} force`, { stdio: 'pipe' });
  return L(out).features;
}
// Nur Polygone eines Features behalten, deren Mittelpunkt die Bedingung erfüllt
function filterPolys(f, test) {
  const g = f.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  const keep = polys.filter(p => { const c = d3.geoCentroid({ type: 'Polygon', coordinates: p }); return test(c); });
  return { ...f, geometry: { type: 'MultiPolygon', coordinates: keep } };
}
const r1 = n => Math.round(n * 10) / 10;
function pathStr(path, f) { const d = path(f); return d ? d.replace(/\d+\.\d+/g, m => String(r1(+m))) : ''; }

function rewind(f) {
  if (d3.geoArea(f) <= 2 * Math.PI) return f;
  const g = f.geometry, rev = p => p.map(r => r.slice().reverse());
  const coords = g.type === 'Polygon' ? rev(g.coordinates) : g.coordinates.map(rev);
  return { ...f, geometry: { type: g.type, coordinates: coords } };
}
function render({ feats, proj, extent, clip }) {
  feats = feats.filter(f => f.geometry).map(rewind);
  const [[x0, y0], [x1, y1]] = clip;
  proj.clipExtent(clip);
  const path = d3.geoPath(proj);
  const ctx = [], reg = {}, cen = {};
  for (const f of feats) {
    const d = pathStr(path, f);
    if (!d) continue;
    if (f.properties.rid === 'ctx') ctx.push(d);
    else if (f.properties.rid === 'ctx2') ctx.push('§' + d);
    else { (reg[f.properties.rid] ||= []).push(d); }
  }
  for (const rid in reg) {
    const fs_ = feats.filter(f => f.properties.rid === rid);
    const c = path.centroid({ type: 'FeatureCollection', features: fs_ });
    cen[rid] = [r1(c[0]), r1(c[1])];
  }
  return { ctx, reg, cen };
}
function fitProj(proj, bbox, w, h, pad = 0) {
  const [[lo0, la0], [lo1, la1]] = bbox;
  proj.fitExtent([[pad, pad], [w - pad, h - pad]], { type: 'MultiPoint', coordinates: [[lo0, la0], [lo1, la1], [lo0, la1], [lo1, la0], [(lo0 + lo1) / 2, la0], [(lo0 + lo1) / 2, la1]] });
  return proj;
}

const W = 360, OUT = {};

/* ---------- Spanisch: Amerika + Spanien als Ausschnitt ---------- */
{
  const H = 470;
  const amer = ['MEX', 'CUB', 'DOM', 'PRI', 'VEN', 'COL', 'ECU', 'PER', 'BOL', 'ARG', 'URY', 'CHL'];
  let f = [
    ...tag(mu.features.filter(x => !amer.includes(x.properties.ADM0_A3) && !['ATA', 'ESP'].includes(x.properties.ADM0_A3)), 'ctx'),
    ...tag(byA3(mu, 'ADM0_A3', ['MEX']), 'mexico'),
    ...tag(byA3(mu, 'ADM0_A3', ['CUB', 'DOM', 'PRI', 'VEN']), 'caribe'),
    ...tag(byA3(mu, 'ADM0_A3', ['COL', 'ECU', 'PER', 'BOL']), 'andes'),
    ...tag(byA3(mu, 'ADM0_A3', ['ARG', 'URY']), 'rioplata'),
    ...tag(byA3(mu, 'ADM0_A3', ['CHL']), 'chile'),
  ];
  f = simplify(f, '6%', 'es');
  const proj = fitProj(d3.geoMercator(), [[-117, 32.5], [-34, -56]], W, H, 4);
  const main = render({ feats: f, proj, clip: [[0, 0], [W, H]] });
  // Ausschnitt Spanien
  const iw = 128, ih = 104, ix = W - iw - 10, iy = 10;
  let fi = [
    ...tag(byA3(c10, 'ADM0_A3', ['PRT', 'FRA', 'AND', 'MAR', 'DZA', 'GIB']), 'ctx'),
    ...tag([filterPolys(byA3(c10, 'ADM0_A3', ['ESP'])[0], c => c[0] > -10)], 'espana'),
  ];
  fi = simplify(fi, '4%', 'esi');
  const p2 = fitProj(d3.geoMercator(), [[-9.6, 44], [4.5, 35.6]], iw, ih, 6);
  p2.translate([p2.translate()[0] + ix, p2.translate()[1] + iy]);
  const ins = render({ feats: fi, proj: p2, clip: [[ix, iy], [ix + iw, iy + ih]] });
  OUT.es = { w: W, h: H, main, inset: { x: ix, y: iy, w: iw, h: ih, ...ins, titel: null }, meere: [[{de:'ATLANTIK',es:'ATLÁNTICO',en:'ATLANTIC',el:'ΑΤΛΑΝΤΙΚΟΣ'}, 262, 205], [{de:'PAZIFIK',es:'PACÍFICO',en:'PACIFIC',el:'ΕΙΡΗΝΙΚΟΣ'}, 40, 300]] };
}

/* ---------- Deutsch: Deutschland, Österreich, Schweiz ---------- */
{
  const H = 430;
  const nord = ['Schleswig-Holstein', 'Hamburg', 'Niedersachsen', 'Bremen', 'Mecklenburg-Vorpommern'];
  const rest = ['Sachsen', 'Rheinland-Pfalz', 'Saarland', 'Baden-Württemberg', 'Hessen', 'Thüringen', 'Sachsen-Anhalt'];
  let f = [
    ...tag(byA3(c10, 'ADM0_A3', ['FRA', 'BEL', 'NLD', 'LUX', 'DNK', 'POL', 'CZE', 'SVK', 'HUN', 'SVN', 'ITA', 'LIE', 'HRV', 'SWE']), 'ctx2'),
    ...tag(adm1('DEU', rest), 'ctx'),
    ...tag(adm1('DEU', nord), 'nord'),
    ...tag(adm1('DEU', ['Berlin', 'Brandenburg']), 'berlin'),
    ...tag(adm1('DEU', ['Nordrhein-Westfalen']), 'west'),
    ...tag(adm1('DEU', ['Bayern']), 'bayern'),
    ...tag(byA3(c10, 'ADM0_A3', ['AUT']), 'oesterreich'),
    ...tag(byA3(c10, 'ADM0_A3', ['CHE']), 'schweiz'),
  ];
  f = simplify(f, '3%', 'de');
  const proj = fitProj(d3.geoMercator(), [[5.4, 55.2], [17.4, 45.6]], W, H, 6);
  OUT.de = { w: W, h: H, main: render({ feats: f, proj, clip: [[0, 0], [W, H]] }), meere: [[{de:'NORDSEE',es:'MAR DEL NORTE',en:'NORTH SEA',el:'ΒΟΡΕΙΑ ΘΑΛΑΣΣΑ'}, 6, 20], [{de:'OSTSEE',es:'BÁLTICO',en:'BALTIC',el:'ΒΑΛΤΙΚΗ'}, 245, 22]] };
}

/* ---------- Griechisch: Griechenland + Zypern als Ausschnitt ---------- */
{
  const H = 420;
  const rest = ['Dytiki Makedonia', 'Ipeiros', 'Thessalia', 'Stereá Elláda', 'Peloponnisos', 'Dytiki Ellada', 'Voreio Aigaio', 'Ayion Oros'];
  const na = adm1('GRC', ['Notio Aigaio'])[0];
  let f = [
    ...tag(byA3(c10, 'ADM0_A3', ['TUR', 'ALB', 'MKD', 'BGR', 'ITA', 'SRB', 'KOS', 'MNE']), 'ctx2'),
    ...tag(adm1('GRC', rest), 'ctx'),
    ...tag([filterPolys(na, c => c[0] >= 26.2)], 'ctx'),
    ...tag([filterPolys(na, c => c[0] < 26.2)], 'kykladen'),
    ...tag(adm1('GRC', ['Attiki']), 'athen'),
    ...tag(adm1('GRC', ['Kentriki Makedonia', 'Anatoliki Makedonia kai Thraki']), 'thessaloniki'),
    ...tag(adm1('GRC', ['Kriti']), 'kreta'),
    ...tag(adm1('GRC', ['Ionioi Nisoi']), 'ionisch'),
  ];
  f = simplify(f, '6%', 'el');
  const proj = fitProj(d3.geoMercator(), [[19.3, 41.75], [28.4, 34.75]], W, H, 4);
  const main = render({ feats: f, proj, clip: [[0, 0], [W, H]] });
  const iw = 112, ih = 70, ix = W - iw - 8, iy = H - ih - 8;
  let fi = [...tag(byA3(c10, 'ADM0_A3', ['TUR', 'SYR']), 'ctx2'), ...tag(byA3(c10, 'ADM0_A3', ['CYP', 'CYN', 'CNM']), 'kypros')];
  fi = simplify(fi, '8%', 'eli');
  const p2 = fitProj(d3.geoMercator(), [[32.1, 35.75], [34.7, 34.5]], iw, ih, 8);
  p2.translate([p2.translate()[0] + ix, p2.translate()[1] + iy]);
  const ins = render({ feats: fi, proj: p2, clip: [[ix, iy], [ix + iw, iy + ih]] });
  OUT.el = { w: W, h: H, main, inset: { x: ix, y: iy, w: iw, h: ih, ...ins, titel: null }, meere: [[{de:'ÄGÄIS',es:'EGEO',en:'AEGEAN',el:'ΑΙΓΑΙΟ'}, 236, 200], [{de:'IONISCHES MEER',es:'MAR JÓNICO',en:'IONIAN SEA',el:'ΙΟΝΙΟ ΠΕΛΑΓΟΣ'}, 14, 330], [{de:'MITTELMEER',es:'MEDITERRÁNEO',en:'MEDITERRANEAN',el:'ΜΕΣΟΓΕΙΟΣ'}, 120, 405]] };
}

/* ---------- Englisch: Welt + Britische Inseln als Ausschnitt ---------- */
{
  const H = 350, HW = 196;
  const keep = ['USA', 'IND', 'AUS'];
  let f = [
    ...tag(mu.features.filter(x => !keep.includes(x.properties.ADM0_A3) && x.properties.ADM0_A3 !== 'ATA'), 'ctx'),
    ...tag(byA3(mu, 'ADM0_A3', ['USA']), 'usa'),
    ...tag(byA3(mu, 'ADM0_A3', ['IND']), 'indien'),
    ...tag(byA3(mu, 'ADM0_A3', ['AUS']), 'australien'),
  ];
  f = simplify(f, '1.2%', 'en');
  const proj = fitProj(d3.geoNaturalEarth1(), [[-168, 74], [178, -46]], W, HW, 2);
  const main = render({ feats: f, proj, clip: [[0, 0], [W, HW]] });
  // Wo liegen die Britischen Inseln auf der Weltkarte?
  const bi = [proj([-11, 59.5]), proj([2, 50])].map(p => p.map(r1));
  const iw = 150, ih = 142, ix = 105, iy = HW + 6;
  let fi = [
    ...tag(mu.features.filter(x => ['FRA', 'BEL', 'NLD'].includes(x.properties.ADM0_A3)), 'ctx2'),
    ...tag(mu.features.filter(x => ['Wales', 'Northern Ireland'].includes(x.properties.GEOUNIT)), 'ctx'),
    ...tag(mu.features.filter(x => x.properties.GEOUNIT === 'England'), 'uk'),
    ...tag(mu.features.filter(x => x.properties.GEOUNIT === 'Scotland'), 'schottland'),
    ...tag(mu.features.filter(x => x.properties.GEOUNIT === 'Ireland'), 'irland'),
  ];
  fi = simplify(fi, '30%', 'eni');
  const p2 = fitProj(d3.geoMercator(), [[-10.8, 59], [2, 49.8]], iw, ih, 6);
  p2.translate([p2.translate()[0] + ix, p2.translate()[1] + iy]);
  const ins = render({ feats: fi, proj: p2, clip: [[ix, iy], [ix + iw, iy + ih]] });
  OUT.en = { w: W, h: H, main, inset: { x: ix, y: iy, w: iw, h: ih, ...ins, titel: {de:'Britische Inseln',es:'Islas Británicas',en:'British Isles',el:'Βρετανικά Νησιά'}, quelle: bi }, meere: [] };
}

/* Beschriftung auf der Karte: kurzer Name je UI-Sprache (sonst Regionsname ohne Klammer)
   und Versatz [dx,dy] vom Mittelpunkt — von Hand abgestimmt, damit nichts überlappt. */
const SCHILD = {
  es: { versatz: { caribe: [50, 8], rioplata: [22, 6], chile: [-30, 40], andes: [-4, 0], espana: [0, 4] } },
  de: { versatz: { west: [18, 0] },
        kurz: { nord: { de: 'Norden', es: 'Norte', en: 'North', el: 'Βορράς' },
                berlin: { de: 'Berlin', es: 'Berlín', en: 'Berlin', el: 'Βερολίνο' },
                west: { de: 'Rheinland & Ruhr', es: 'Renania y Ruhr', en: 'Rhineland & Ruhr', el: 'Ρηνανία & Ρουρ' } } },
  en: { versatz: { australien: [-46, 0], uk: [22, 18], irland: [-12, -8], schottland: [0, -10] },
        kurz: { usa: { de: 'USA', es: 'EE. UU.', en: 'USA', el: 'ΗΠΑ' } } },
  el: { versatz: { ionisch: [46, -30], kreta: [-30, 24] },
        kurz: { thessaloniki: { de: 'Thessaloniki', es: 'Salónica', en: 'Thessaloniki', el: 'Θεσσαλονίκη' } } }
};
for (const z in OUT) OUT[z].schild = SCHILD[z];
const kopf = `/* ===================================================================
   regional-karten.js — echte Landkarten für den Raum „Regionalismen" (Spikiu)
   Leo, 20.10.2026: „nicht die Karte so, nur ein richtiges Map für jede Sprache."
   Quelle: Natural Earth (gemeinfrei), vereinfacht und projiziert mit
   werkzeuge/regional-karten/baue-karten.mjs — NICHT von Hand ändern, neu erzeugen.
   window.spikiuRegionalKarten[ziel] = { w, h, main:{ctx,reg,cen}, inset?, meere, schild }
   ctx: Hintergrund-Pfade ("§" vorne = Nachbarland, sonst Rest des Sprachgebiets)
   reg: Pfade je Region-ID aus regional-daten.js · cen: Mittelpunkt für das Namensschild
=================================================================== */
`;
fs.writeFileSync(process.env.AUSGABE || 'regional-karten.js', kopf + 'window.spikiuRegionalKarten = ' + JSON.stringify(OUT) + ';\n');
for (const k in OUT) console.log(k, JSON.stringify(OUT[k]).length);
