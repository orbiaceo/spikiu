// scripts/audio/extract.js — SATZLISTE für die Aufnahmen (Leo, 14.11.2026: Supertonic 3 statt Piper).
// Sammelt JEDEN Text, den die App in einer Zielsprache vorliest, aus denselben Daten und mit
// denselben Funktionen wie die Räume, und schickt ihn durch sprechText() aus /sprechtext.js —
// dieselbe Funktion, mit der audio.js zur Laufzeit den Schlüssel bildet.
//
// Aufruf: node scripts/audio/extract.js <sprache|alle> [aus.json]
//   → [{ key, text }]  (text = gesprochener Text, ⏸ = Pause)   · ohne aus.json: nur Zählung
// Braucht `acorn` (CI: npm i acorn@8.14.0). Grundsatz: lieber ein Satz zu viel als einer zu wenig —
// was trotzdem fehlt, meldet die App (stumm + notiert, mit dem nächsten Feedback geschickt).
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const acorn = require('acorn');
const ST = require('../../sprechtext.js');

const WURZEL = path.resolve(__dirname, '..', '..');
const SPRACHEN = ['es', 'de', 'en', 'el'];
const datei = (f) => fs.readFileSync(path.join(WURZEL, f), 'utf8');
const gibt = (f) => fs.existsSync(path.join(WURZEL, f));

// ── Laden wie im Browser (window = globaler Kontext) ────────────────────────
function lade(dateien, extra) {
  const speicher = {};
  const ctx = Object.assign({
    localStorage: { getItem: (k) => (k in speicher ? speicher[k] : null), setItem: (k, v) => { speicher[k] = String(v); }, removeItem: (k) => { delete speicher[k]; } },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    document: { addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), documentElement: { lang: 'de' }, head: { appendChild() {} }, body: { appendChild() {} } },
    navigator: { userAgent: 'node', language: 'de' }, console, setTimeout: () => 0, clearTimeout() {}, addEventListener() {},
    location: { search: '', href: '' }, matchMedia: () => ({ matches: false }),
  }, extra || {});
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  for (const f of dateien) vm.runInContext(datei(f), ctx, { filename: f });
  return ctx;
}

// ── Sammeln ─────────────────────────────────────────────────────────────────
const roh = { es: new Set(), de: new Set(), en: new Set(), el: new Set() };
const NAME = '\u0001';                       // Platzhalter: Vorname der Lernenden
function nimm(sprache, text) {
  if (!roh[sprache] || typeof text !== 'string') return;
  const t = text.trim();
  if (!t || !/\p{L}/u.test(t) || t.length > 4000) return;
  roh[sprache].add(t);
}
function alleStrings(o, schluessel, fn, tiefe = 0) {
  if (tiefe > 30 || o == null) return;
  if (Array.isArray(o)) { o.forEach((x) => alleStrings(x, schluessel, fn, tiefe + 1)); return; }
  if (typeof o !== 'object') return;
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'string') { if (schluessel.has(k)) fn(v, k); }
    else alleStrings(v, schluessel, fn, tiefe + 1);
  }
}

// 1 · Lernpfad (Szene, Geführtes Gespräch, Karten, Feines Ohr, Gym …): z, muster
const LERNPFAD = { es: ['lernpfad-daten.js', 'SpikiuLernpfad'], de: ['lernpfad-daten-de.js', 'SpikiuLernpfadDE'], en: ['lernpfad-daten-en.js', 'SpikiuLernpfadEN'], el: ['lernpfad-daten-el.js', 'SpikiuLernpfadEL'] };
for (const [l, [f, g]] of Object.entries(LERNPFAD)) alleStrings(lade([f])[g], new Set(['z', 'muster']), (v) => nimm(l, v));

// 2 · Lernroman — über die App-Funktion spikiuLearnroman(ziel, mutter); Vorlese-Regel wie learnroman.html sprichAus()
{
  const buecher = fs.readdirSync(WURZEL).filter((f) => /^learnroman-[a-z]+(-el)?\.js$/.test(f) && f !== 'learnroman-daten.js').sort();
  const ctx = lade([...buecher, 'learnroman-daten.js']);
  const vorlesen = (t) => String(t).replace(/^\s*—\s*/, '').replace(/\s—\s?/g, ', ');
  for (const z of SPRACHEN) for (const m of SPRACHEN) {
    if (m === z) continue;
    // ALLE Bücher dieser Sprachkombination (learnroman.html: spikiuLearnroman(z, m, buchWunsch) + .alle)
    let liste = [];
    try { liste = (ctx.spikiuLearnroman.alle ? ctx.spikiuLearnroman.alle(z, m) : []) || []; } catch (e) { liste = []; }
    try { const b0 = ctx.spikiuLearnroman(z, m); if (b0) liste.push(b0); } catch (e) {}
    liste = liste.map((b) => { try { return (b && b.kapitel) ? b : ctx.spikiuLearnroman(z, m, b.buch); } catch (e) { return null; } }).filter(Boolean);
    for (const b of liste) for (const k of (b.kapitel || [])) for (const bl of (k.body || [])) {
      if (bl.z) nimm(b.zielsprache || z, vorlesen(/^\s*—/.test(bl.z) ? bl.z.replace(/^\s*—\s*/, '') : bl.z));
      if (bl.p) nimm(b.zielsprache || z, vorlesen(bl.p));
    }
  }
  // Alle Bücher je Zielsprache (falls die Funktion je Ziel nur das Standardbuch liefert): Rohdaten mitnehmen.
  for (const k of Object.keys(ctx)) {
    if (!/^SPIKIU_LR_/.test(k) || !ctx[k] || typeof ctx[k] !== 'object') continue;
    const ziel = /_EL_/.test(k) ? 'el' : null;
    const zs = ziel || (ctx[k].zielsprache) || null;
    alleStrings(ctx[k], new Set(['z', 'p']), (v) => { if (zs) nimm(zs, vorlesen(/^\s*—/.test(v) ? v.replace(/^\s*—\s*/, '') : v)); });
  }
}

// 3 · Quelltext-Ernte mit Sprachkontext (Daten in geschlossenen Funktionen): Schlüssel@Sprache
//     Sprache = nächster Vorfahr-Schlüssel es|de|en|el, sonst die Zielsprache der Datei.
function ernte(quelle, dateiSprache, ziele, opts = {}) {
  let ast;
  try { ast = acorn.parse(quelle, { ecmaVersion: 'latest', sourceType: 'script', allowHashBang: true }); }
  catch (e) { console.error('acorn:', opts.name || '', e.message); return; }
  (function lauf(n, pfad) {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'Property') {
      const k = n.key.type === 'Identifier' ? n.key.name : String(n.key.value);
      if (n.value.type === 'Literal' && typeof n.value.value === 'string') {
        const sp = [...pfad].reverse().find((x) => SPRACHEN.includes(x)) || dateiSprache;
        if (sp && ziele.has(k)) nimm(sp, n.value.value);
        if (opts.sprachSchluessel && SPRACHEN.includes(k)) nimm(k, n.value.value);
      }
      lauf(n.value, [...pfad, k]);
      return;
    }
    for (const key of Object.keys(n)) {
      if (key === 'type' || key === 'start' || key === 'end') continue;
      const v = n[key];
      if (Array.isArray(v)) v.forEach((x) => lauf(x, pfad)); else if (v && typeof v.type === 'string') lauf(v, pfad);
    }
  })(ast, []);
}
ernte(datei('sprichwort.js'), null, new Set(['text']));                         // Sprichwort des Tages (Gym, Spiele, Proverbios)
ernte(datei('kurzsaetze.js'), null, new Set(['z']));                            // Kurzsätze (Gym, Spiele)
ernte(datei('taller-daten.js'), null, new Set(['texto']));                      // Lesewerkstatt: 🔊 liest entry.texto
ernte(datei('haeppchen-db.js'), null, new Set(['z', 'satz', 'text']));          // Häppchen (Geführtes Gespräch, Chat-Karten)
ernte(datei('regional-daten.js'), null, new Set(['wort']));                     // Regional: Laut-Beispiele

// 4 · Regional: die Formen je Region (g.wort) — Werte der Regions-Schlüssel, auch „A / B“ einzeln
{
  const R = lade(['regional-daten.js']).spikiuRegional;
  for (const l of SPRACHEN) {
    const d = R && (R[l] || (R.db && R.db[l]));
    if (!d) continue;
    const ids = new Set((d.regionen || []).map((r) => r.id));
    alleStrings(d, ids, (v) => { nimm(l, v); v.split(/\s*\/\s*/).forEach((x) => nimm(l, x)); });
  }
}

// 5 · Wortfelder (Spiele, Geführtes Gespräch): „stufe|es|de|en|el“
{
  const W = lade(['wortfelder.js']).spikiuWortfelder;
  alleStrings(W, new Set(Object.keys(W.roh || {})), () => {});
  for (const zeilen of Object.values(W.roh || {})) for (const z of zeilen) {
    const s = String(z).split('|');
    SPRACHEN.forEach((l, i) => { if (s[i + 1]) nimm(l, s[i + 1]); });
  }
}

// 6 · Silben (Spiele) und ABC (Juegos)
{
  const S = lade(['silben.js']).spikiuSilben;
  for (const l of SPRACHEN) if (S && S[l]) Object.keys(S[l]).forEach((w) => nimm(l, w));
  const J = lade(['juegos.js']).spikiuJuegos;
  if (J && J.ABC) for (const l of SPRACHEN) (J.ABC[l] || []).forEach((b) => nimm(l, b));
}

// 7 · Léxico (Mein Buch: 🔊 liest den Kopf „Artikel + Lemma“ wie haus.html lxKopf)
for (const l of SPRACHEN) {
  const f = `lexikon-${l}.js`; if (!gibt(f)) continue;
  let daten = null;
  lade([f], { spikiuLexikon: { add: (z, d) => { if (z === l) daten = d; }, ficha() {}, laden() {} }, __spikiuLexikonWarte: [] });
  if (!daten) { const c = lade(['lexikon.js', f]); c.spikiuLexikon.ficha(l, 'x'); }
  for (const fi of ((daten && daten.L) || [])) if (fi && fi.l) nimm(l, (fi.g ? fi.g + ' ' : '') + fi.l);
}

// 8 · Feste Sätze in den Räumen: Objekte mit Sprachschlüsseln (ENDE_SP, Grüße …), Grüße mit Namen als Rahmen
function wert(n, mitName) {
  if (!n) return null;
  switch (n.type) {
    case 'Literal': return typeof n.value === 'string' ? n.value : null;
    case 'TemplateLiteral': return n.expressions.length ? null : n.quasis.map((q) => q.value.cooked).join('');
    case 'BinaryExpression': { if (n.operator !== '+') return null; const a = wert(n.left, mitName), b = wert(n.right, mitName); return a == null || b == null ? null : a + b; }
    case 'ConditionalExpression': return wert(mitName ? n.consequent : n.alternate, mitName);
    case 'LogicalExpression': return wert(n.left, mitName);
    case 'Identifier': case 'MemberExpression': case 'CallExpression': return mitName ? NAME : null;
    case 'ArrowFunctionExpression': case 'FunctionExpression': {
      if (n.body.type !== 'BlockStatement') return wert(n.body, mitName);
      const r = n.body.body.find((s) => s.type === 'ReturnStatement'); return r ? wert(r.argument, mitName) : null;
    }
    default: return null;
  }
}
function raumTexte(quelle, name) {
  let ast;
  try { ast = acorn.parse(quelle, { ecmaVersion: 'latest', sourceType: 'script' }); } catch (e) { console.error('acorn:', name, e.message); return; }
  (function lauf(n) {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'ObjectExpression') {
      const props = n.properties.filter((p) => p.type === 'Property');
      const sp = props.filter((p) => SPRACHEN.includes(p.key.type === 'Identifier' ? p.key.name : String(p.key.value)));
      if (sp.length >= 3) for (const p of sp) {
        const l = p.key.type === 'Identifier' ? p.key.name : String(p.key.value);
        for (const mit of [false, true]) {
          const t = wert(p.value, mit);
          if (t == null) continue;
          if (t.includes(NAME)) t.split(NAME).forEach((teil, i) => nimm(l, i ? teil.replace(/^[\s,.;:!?…]+/, '') : teil));
          else nimm(l, mit ? t : t);
        }
      }
    }
    for (const key of Object.keys(n)) {
      if (key === 'type') continue;
      const v = n[key];
      if (Array.isArray(v)) v.forEach(lauf); else if (v && typeof v.type === 'string') lauf(v);
    }
  })(ast);
}
const RAEUME = ['szene.html', 'gefuehrt.html', 'chat.html', 'haus.html', 'spiele.html', 'gym.html', 'proverbios.html', 'regional.html', 'learnroman.html', 'lektionen.html', 'taller.html', 'mein.html', 'faq.html', 'wortschatz.html'];
const RAUM_JS = ['bottomnav.js', 'juegos.js', 'ohr-karten.js', 'karten-engine.js', 'szene.js', 'szenen-dialog.js', 'uebung.js', 'wortschatz.js', 'fuehrung.js', 'woerter.js'];
const inline = (html) => [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).filter((s) => !/^\s*import\s/m.test(s));
for (const f of RAEUME) if (gibt(f)) inline(datei(f)).forEach((s) => raumTexte(s, f));
for (const f of RAUM_JS) if (gibt(f)) raumTexte(datei(f), f);

// 9 · Bücher Gramática A / Cuaderno A / Karten: Hör-Spuren (window.SAY …) — Spanisch
for (const f of ['buch/Gramatica-A.html', 'buch/Cuaderno-A.html', 'buch/Gramatica-Karten.html']) if (gibt(f)) {
  for (const s of inline(datei(f))) ernte(s, 'es', new Set(['t']), { name: f });
}

// ── Ausgabe: gesprochener Text + Schlüssel, Einzelsätze langer Texte als Reserve ──
function einheiten(l) {
  const aus = new Map();
  const dazu = (t) => { const g = ST.sprechText(t, l); if (g && /\p{L}/u.test(g)) aus.set(ST.schluessel(g), g); };
  for (const t of roh[l]) {
    dazu(t);
    // Nur Satz-Stücke, die die App beim Zusammensetzen braucht (Text ohne eigene Aufnahme): bei mehrsätzigen Texten.
    const s = ST.saetze(ST.sprechText(t, l));
    if (s.length > 1 && s.length <= 12) s.forEach(dazu);
  }
  return [...aus.entries()].map(([key, text]) => ({ key, text })).sort((a, b) => (a.key < b.key ? -1 : 1));
}

if (require.main === module) {
  const [wahl = 'alle', ziel] = process.argv.slice(2);
  const liste = wahl === 'alle' ? SPRACHEN : [wahl];
  const ergebnis = {};
  for (const l of liste) {
    const e = einheiten(l);
    ergebnis[l] = e;
    const zeichen = e.reduce((n, u) => n + u.text.length, 0);
    console.error(`${l}: ${e.length} Aufnahmen, ${zeichen} Zeichen`);
  }
  if (ziel) fs.writeFileSync(ziel, JSON.stringify(wahl === 'alle' ? ergebnis : ergebnis[wahl]));
}
module.exports = { einheiten, SPRACHEN };
