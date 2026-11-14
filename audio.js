// audio.js — SPIKIU · Audio-Ausgabe NUR aus Aufnahmen (Leo, 14.11.2026: Supertonic 3 statt Piper)
//
// EINZIGE öffentliche Schnittstelle für ALLE Räume (unverändert):
//     import { speak, stop, warm } from '/audio.js';
//     await speak(text, zielsprache);            // zielsprache ∈ 'de' | 'es' | 'en' | 'el'
//     await speak(text, zielsprache, { live: true });   // Text, den es vorher nicht gibt (siehe unten)
//     stop();                                     // laufende Ausgabe SOFORT abbrechen
//     warm();                                     // Index der Zielsprache vorladen
//
// Jeder Satz der App ist vorher mit Supertonic 3 auf GitHub aufgenommen
// (.github/workflows/audio-render.yml, Satzliste scripts/audio/extract.js) und liegt als
// audio/<sprache>/<stimme>/<schlüssel>.mp3 auf unserem Server. Der Schlüssel kommt aus
// sprechtext.js — DERSELBEN Funktion, mit der die Satzliste gebaut wird. Piper wird nie geladen.
//
// Fehlt eine Aufnahme:
//   1. ganzer Text → 2. mit Vornamen: Rahmen + Name als eigene Stücke → 3. Satz für Satz.
//   Was dann noch fehlt, bleibt STILL; der Text wird im Gerät notiert (die letzten 100) und mit
//   dem nächsten Feedback mitgeschickt (feedback-spikiu.js → audioFehlt).
//   Ausnahme { live: true } (Leo, 14.11.2026, Entscheidung B): Spikius frei erzeugte Antworten,
//   erzeugte Lektionen, „Besser“ aus der Rückmeldung — die gibt es vorher nicht; dort spricht,
//   wenn keine Aufnahme passt, die Gerätestimme.
//
// Stimme: Leos Wahl F3 (♀) / M2 (♂) in allen vier Sprachen; Standard ♀. Umschalten über
// spikiu_user.profile.stimme = 'F' | 'M' (oder window.spikiuStimme('M')).

import '/sprechtext.js';
const ST = window.SpikiuSprechText;

const SPRACHEN = ['de', 'es', 'en', 'el'];
const STIMMEN = { F: 'F3', M: 'M2' };
const FALLBACK_LANG = { de: 'de-DE', es: 'es-ES', en: 'en-US', el: 'el-GR' };
const FEHLT_SCHLUESSEL = 'spikiu_audio_fehlt';
const SATZ_PAUSE_MS = 250;

// ── Profil ─────────────────────────────────────────────────────────────────
function profil() {
  try { const u = JSON.parse(localStorage.getItem('spikiu_user') || '{}'); return { u, p: (u && u.profile) || {} }; }
  catch (_) { return { u: {}, p: {} }; }
}
function profilZielsprache() { const z = profil().p.zielsprache; return SPRACHEN.includes(z) ? z : null; }
function stimmeJetzt() { return STIMMEN[profil().p.stimme === 'M' ? 'M' : 'F']; }
function vorname() {
  const { u, p } = profil();
  const n = String((u && u.name) || p.name || '').trim().split(/\s+/)[0] || '';
  return n;
}

// ── Index je Sprache/Stimme: welche Aufnahmen gibt es? (eine Anfrage, dann im Speicher) ──
const indexe = new Map();   // 'es/F3' → Promise<Set>
function index(sprache, stimme) {
  const id = sprache + '/' + stimme;
  if (!indexe.has(id)) {
    const p = fetch('/audio/' + id + '/index.json', { cache: 'force-cache' })
      .then((r) => (r.ok ? r.json() : []))
      .then((liste) => new Set(liste), () => new Set());
    indexe.set(id, p);
    p.then((s) => { if (!s.size) indexe.delete(id); });   // leer/fehlgeschlagen → später neu versuchen
  }
  return indexe.get(id);
}
const url = (sprache, stimme, k) => '/audio/' + sprache + '/' + stimme + '/' + k + '.mp3';

// ── Wiedergabe: EIN <audio>, beim ersten Tap freigeschaltet (iOS spielt danach ohne neue Geste) ──
let spieler = null;
function holeSpieler() {
  if (!spieler && typeof Audio !== 'undefined') { spieler = new Audio(); spieler.preload = 'auto'; }
  return spieler;
}
let freigeschaltet = false;
function freischalten() {
  if (freigeschaltet) return;
  freigeschaltet = true;
  const a = holeSpieler();
  if (a) {
    try {
      a.muted = true;
      a.src = '/audio/stille.mp3';
      const p = a.play();
      if (p && p.then) p.then(() => { a.pause(); a.muted = false; }, () => { a.muted = false; });
      else a.muted = false;
    } catch (_) { a.muted = false; }
  }
  try {   // Gerätestimme ebenfalls wecken (für { live: true })
    const s = window.speechSynthesis;
    if (s) { if (s.getVoices) s.getVoices(); const u = new SpeechSynthesisUtterance(' '); u.volume = 0; s.speak(u); }
  } catch (_) {}
}
if (typeof window !== 'undefined') {
  window.addEventListener('touchend', freischalten, { once: true, passive: true });
  window.addEventListener('click', freischalten, { once: true });
}

let laufend = null;   // { abbrechen }
function spiele(quelle) {
  return new Promise((resolve) => {
    const a = holeSpieler();
    if (!a) { resolve(false); return; }
    let erledigt = false;
    const fertig = (ok) => {
      if (erledigt) return; erledigt = true;
      a.onended = a.onerror = null;
      if (laufend && laufend.el === a) laufend = null;
      resolve(ok);
    };
    laufend = { el: a, abbrechen: () => { try { a.pause(); } catch (_) {} fertig(false); } };
    a.onended = () => fertig(true);
    a.onerror = () => fertig(false);
    a.muted = false;
    a.src = quelle;
    try { a.currentTime = 0; } catch (_) {}
    const p = a.play();
    if (p && p.catch) p.catch(() => fertig(false));
  });
}
const warte = (ms) => new Promise((r) => setTimeout(r, ms));

function stopPlayback() {
  if (laufend) laufend.abbrechen();
  try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_) {}
}

// ── Gerätestimme (nur { live: true }) ───────────────────────────────────────
function geraetestimme(text, zielsprache) {
  return new Promise((resolve) => {
    try {
      const s = window.speechSynthesis;
      if (!s || typeof SpeechSynthesisUtterance === 'undefined') { resolve(); return; }
      const u = new SpeechSynthesisUtterance(String(text).replace(new RegExp(ST.PAUSE, 'g'), ', '));
      const lang = FALLBACK_LANG[zielsprache] || 'es-ES';
      u.lang = lang;
      const v = (s.getVoices ? s.getVoices() : []).find((x) => x.lang === lang) ||
                (s.getVoices ? s.getVoices() : []).find((x) => x.lang && x.lang.slice(0, 2) === zielsprache);
      if (v) u.voice = v;
      u.onend = () => resolve(); u.onerror = () => resolve();
      s.cancel(); s.speak(u);
    } catch (_) { resolve(); }
  });
}

// ── Fehlende Sätze notieren (die letzten 100; Feedback schickt sie mit) ────────
function notiere(sprache, stimme, text) {
  try {
    const liste = JSON.parse(localStorage.getItem(FEHLT_SCHLUESSEL) || '[]');
    const eintrag = { s: sprache, v: stimme, t: String(text).slice(0, 300), seite: (location.pathname || '').replace(/^\//, ''), ts: Date.now() };
    const rest = liste.filter((x) => !(x.s === sprache && x.t === eintrag.t));
    rest.push(eintrag);
    localStorage.setItem(FEHLT_SCHLUESSEL, JSON.stringify(rest.slice(-100)));
  } catch (_) {}
  try { console.info('audio: keine Aufnahme →', sprache + '/' + stimme, JSON.stringify(String(text))); } catch (_) {}
}

// ── Plan: welche Stücke spielen? ─────────────────────────────────────────────
// Ergebnis: [{ k } | { stumm: text }], k = vorhandener Schlüssel
function plane(gesprochen, vorhanden) {
  const k = ST.schluessel(gesprochen);
  if (vorhanden.has(k)) return [{ k }];
  const n = vorname();
  const teile = n ? ST.nameTeile(gesprochen, n) : null;
  if (teile) {
    const [vor, name, nach] = teile;
    const plan = [];
    if (vor) plan.push(...plane(vor, vorhanden));
    const kn = ST.schluessel(ST.sprechText(name));
    plan.push(vorhanden.has(kn) ? { k: kn } : { stumm: name, name: true });
    if (nach) plan.push(...plane(nach, vorhanden));
    return plan;
  }
  const saetze = ST.saetze(gesprochen);
  if (saetze.length > 1) {
    return saetze.map((s) => { const ks = ST.schluessel(s); return vorhanden.has(ks) ? { k: ks } : { stumm: s }; });
  }
  return [{ stumm: gesprochen }];
}

// ── Öffentlich: speak(text, zielsprache, { live }) ──────────────────────────
let speakGen = 0;
let statusCb = null;
function emit(info) { try { statusCb && statusCb(info); } catch (_) {} }

async function speak(text, zielsprache, opts) {
  if (!text || !String(text).trim()) return;
  zielsprache = SPRACHEN.includes(zielsprache) ? zielsprache : (profilZielsprache() || 'es');
  const live = !!(opts && opts.live);
  const gen = ++speakGen;
  stopPlayback();
  const gesprochen = ST.sprechText(text, zielsprache);
  const stimme = stimmeJetzt();
  const vorhanden = await index(zielsprache, stimme);
  if (gen !== speakGen) return;
  const plan = plane(gesprochen, vorhanden);
  const fehlt = plan.filter((x) => x.stumm && !x.name);
  if (live && plan.every((x) => x.stumm)) {     // nichts aufgenommen → Gerätestimme (Entscheidung B)
    emit({ quelle: 'geraet' });
    await geraetestimme(gesprochen, zielsprache);
    return;
  }
  if (fehlt.length && !live) notiere(zielsprache, stimme, fehlt.length === plan.length ? gesprochen : fehlt.map((x) => x.stumm).join(' | '));
  if (live && fehlt.length) { emit({ quelle: 'geraet' }); await geraetestimme(gesprochen, zielsprache); return; }
  emit({ quelle: 'aufnahme', stuecke: plan.length, fehlt: fehlt.length });
  let erstes = true;
  for (const st of plan) {
    if (gen !== speakGen) return;
    if (!st.k) continue;
    if (!erstes) await warte(SATZ_PAUSE_MS);
    if (gen !== speakGen) return;
    erstes = false;
    await spiele(url(zielsprache, stimme, st.k));
  }
}

// ── Öffentlich: stop() ──────────────────────────────────────────────────────
function stop() {
  speakGen++;
  stopPlayback();
}

// ── Öffentlich: warm(zielsprache) — Index vorladen (kein Modell mehr) ─────────
async function warm(zielsprache) {
  zielsprache = zielsprache || profilZielsprache();
  if (!SPRACHEN.includes(zielsprache)) return false;
  const s = await index(zielsprache, stimmeJetzt());
  return s.size > 0;
}

// ── Stimme umschalten (♀ F3 / ♂ M2) ─────────────────────────────────────────
function setzeStimme(g) {
  try {
    const u = JSON.parse(localStorage.getItem('spikiu_user') || '{}');
    u.profile = u.profile || {};
    u.profile.stimme = g === 'M' ? 'M' : 'F';
    localStorage.setItem('spikiu_user', JSON.stringify(u));
  } catch (_) {}
  return stimmeJetzt();
}

if (typeof window !== 'undefined') {
  window.spikiuAudioStop = stop;          // karten-engine.js ruft das bei jeder neuen Karte
  window.spikiuStimme = setzeStimme;
  window.spikiuAudioFehlt = () => { try { return JSON.parse(localStorage.getItem(FEHLT_SCHLUESSEL) || '[]'); } catch (_) { return []; } };
  window.addEventListener('pagehide', stop);
}

const audio = {
  speak,
  stop,
  warm,
  set onstatus(fn) { statusCb = (typeof fn === 'function') ? fn : null; },
  get onstatus() { return statusCb; },
};

export { speak, stop, warm };
export default audio;
