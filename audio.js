// audio.js — SPIKIU · provider-agnostische Audio-Ausgabe (Audio Phase A)
//
// EINZIGE öffentliche Schnittstelle für ALLE Räume:
//     import { speak, warm } from '/audio.js';
//     await speak(text, zielsprache);     // zielsprache ∈ 'de' | 'es' | 'en' | 'el'
//     stop();                              // laufende Ausgabe SOFORT abbrechen (Schrittwechsel)
//     warm();                              // ohne Argument: Zielsprache aus dem Profil
//
// Heute: Piper-WASM (lokal im Browser, self-gehostet, MIT-Modelle von HuggingFace,
// OPFS-Cache → offline). Morgen (Phase 2): ElevenLabs hinter DERSELBEN speak()-API —
// Aufrufer ändern sich NIE. Kein voiceId / Piper-Detail leckt nach außen.
//
// Kein Server, keine Rechnung pro Satz. Fällt Piper aus (v. a. iOS-Safari), springt
// automatisch die Browser-Stimme (speechSynthesis) ein — nie ein stummer Knopf.

import { TtsSession } from '/audio/vendor/piper-tts-web.js';

// ── Die vier finalen Stimmen (Design 20.06., fest verdrahtet) ──────────────────
// Kein Aufrufer kennt je einen voiceId — nur die zielsprache.
const VOICE_MAP = {
  de: 'de_DE-thorsten-medium',   // 02.10.: high → medium (gleicher Sprecher, schneller); eva_k-x_low klang zu schlecht
  es: 'es_ES-sharvard-medium',
  en: 'en_US-lessac-high',
  el: 'el_GR-rapunzelina-low',
};

// BCP-47 für den Browser-Stimmen-Fallback.
const FALLBACK_LANG = { de: 'de-DE', es: 'es-ES', en: 'en-US', el: 'el-GR' };

// „Por ahora": Sprachen, die DIREKT über die Geräte-Stimme (speechSynthesis) laufen,
// ohne Piper. Griechisch ist drin, weil die Piper-Stimme el_GR-rapunzelina-low ein
// gravierendes Problem hat. Wieder rausnehmen, sobald eine gute Piper-Stimme da ist.
// (Alle vier auf Geräte-Stimme? Einfach 'de','es','en' ergänzen.)
const DEVICE_VOICE_LANGS = new Set(['el']);

// iOS/Safari: Piper-WASM + AudioContext sind dort unzuverlässig — oft STUMM ohne Fehler
// (der AudioContext startet suspendiert), fällt also nicht von selbst auf die Stimme zurück.
// Darum auf iOS ALLE Sprachen über die Geräte-Stimme (speechSynthesis), die im Tap funktioniert.
const IS_IOS = (typeof navigator !== 'undefined') && (
  /iP(hone|ad|od)/.test(navigator.userAgent || '') ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)   // iPadOS meldet sich als Mac
);
function useDeviceVoice(zielsprache) { return IS_IOS || DEVICE_VOICE_LANGS.has(zielsprache); }

// iOS verlangt eine Nutzer-Geste, um Sprachausgabe „freizuschalten". Beim ersten Tap
// einmal still anstoßen (Stimmen laden + Engine wecken), sonst bleibt der erste 🔊 stumm.
let ttsUnlocked = false;
function unlockTts() {
  if (ttsUnlocked) return;
  ttsUnlocked = true;
  try {
    const s = window.speechSynthesis;
    if (s) {
      if (s.getVoices) s.getVoices();
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      s.speak(u);
    }
  } catch (e) { /* egal — angestoßen ist angestoßen */ }
}
if (typeof window !== 'undefined') {
  window.addEventListener('touchend', unlockTts, { once: true, passive: true });
  window.addEventListener('click', unlockTts, { once: true });
}

// Self-gehostete WASM-Assets (statisch unter public/audio/vendor/ → ausgeliefert als /audio/vendor/…).
// onnxWasm ist ein VERZEICHNIS-Präfix (onnxruntime-web hängt den Dateinamen an).
const WASM_PATHS = {
  onnxWasm: '/audio/vendor/ort/',
  piperWasm: '/audio/vendor/piper/piper_phonemize.wasm',
  piperData: '/audio/vendor/piper/piper_phonemize.data',
};

// Optionaler Status-Callback (für Phase B: „Stimme wird vorbereitet…“). Kein Muss.
//     audio.onstatus = ({ phase, zielsprache, loaded, total }) => { … }
let statusCb = null;
function emit(info) { try { statusCb && statusCb(info); } catch (_) {} }

// ── Session-Verwaltung: EINE warme Session pro Sprache ─────────────────────────
// Die Lib hält intern ein Singleton (TtsSession._instance) und lädt sonst nur EINE
// Stimme pro Seitenleben. Wir wollen vier. Darum bauen wir pro Sprache eine eigene
// Session: vor jedem NEUEN Stimm-Aufbau das Singleton zurücksetzen, dann die fertige
// Instanz selbst behalten und predict() gezielt auf ihr aufrufen (predict nutzt die
// instanz-eigene ONNX-Session, nicht das Singleton). Der Aufbau wird serialisiert,
// damit sich zwei Sprachen nicht über das gemeinsame Singleton in die Quere kommen.
const sessionByLang = new Map();   // zielsprache -> Promise<TtsSession>
let buildChain = Promise.resolve();

function getSession(zielsprache) {
  const voiceId = VOICE_MAP[zielsprache];
  if (!voiceId) throw new Error(`audio: unbekannte zielsprache "${zielsprache}"`);

  let p = sessionByLang.get(zielsprache);
  if (p) return p;

  // Kritischer Abschnitt serialisiert: Singleton nullen + frische Instanz bauen.
  p = buildChain.then(() => {
    emit({ phase: 'prepare', zielsprache });
    TtsSession._instance = null;     // erzwingt eine NEUE Instanz + frisches init() für diese Stimme
    return TtsSession.create({
      voiceId,
      wasmPaths: WASM_PATHS,
      progress: (ev) => emit({ phase: 'download', zielsprache, loaded: ev.loaded, total: ev.total }),
    });
  });
  buildChain = p.then(() => {}, () => {});   // Kette weiterlaufen lassen, Fehler nicht verschlucken-blockieren
  sessionByLang.set(zielsprache, p);
  // Bei Fehlschlag den Cache-Eintrag räumen, damit ein späterer Versuch neu baut.
  p.catch(() => { if (sessionByLang.get(zielsprache) === p) sessionByLang.delete(zielsprache); });
  return p;
}

// ── Text → Sätze (satzweise synthetisieren: erster Ton sofort) ─────────────────
function splitSentences(text) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const parts = clean.match(/[^.!?…]+[.!?…]+|\S[^.!?…]*$/g) || [clean];
  // sehr lange satzlose Brocken hart bei ~200 Zeichen kappen
  const out = [];
  for (const s of parts) {
    const t = s.trim();
    if (!t) continue;
    for (const k of splitClauses(t)) {
      if (k.length <= 220) { out.push(k); continue; }
      for (let i = 0; i < k.length; i += 200) out.push(k.slice(i, i + 200));
    }
  }
  return out;
}

// Lange Sätze zusätzlich an Komma/Semikolon/Doppelpunkt teilen (02.10.): Piper rechnet
// einen Brocken immer KOMPLETT, bevor der erste Ton kommt. Kürzere Brocken = früherer
// erster Ton, und ein überholter Brocken blockiert die Engine nur kurz. Kurze Teilstücke
// werden wieder zusammengelegt (mind. ~40 Zeichen), damit die Satzmelodie nicht zerfällt.
function splitClauses(satz) {
  if (satz.length <= 90) return [satz];
  const teile = satz.match(/[^,;:]+[,;:]+|[^,;:]+$/g) || [satz];
  const out = [];
  let puffer = '';
  for (const t of teile) {
    puffer = puffer ? puffer + ' ' + t.trim() : t.trim();
    if (puffer.length >= 40) { out.push(puffer); puffer = ''; }
  }
  if (puffer) { if (out.length && puffer.length < 25) out[out.length - 1] += ' ' + puffer; else out.push(puffer); }
  return out;
}

// ── Wiedergabe einer einzelnen WAV-Blob; löst auf, wenn fertig gespielt ────────
// Das gerade spielende <audio> wird gemerkt, damit stop()/ein neuer speak() es
// SOFORT abwürgen kann — vorher lief ein angefangener Satz immer bis zum Ende.
let aktuellesAudio = null;   // { el, abbrechen }

function playBlob(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const a = new Audio(url);
    let erledigt = false;
    const done = (fn, arg) => {
      if (erledigt) return;
      erledigt = true;
      if (aktuellesAudio && aktuellesAudio.el === a) aktuellesAudio = null;
      URL.revokeObjectURL(url);
      fn(arg);
    };
    aktuellesAudio = { el: a, abbrechen: () => { try { a.pause(); } catch (_) {} done(resolve); } };
    a.onended = () => done(resolve);
    a.onerror = () => done(reject, new Error('audio: Wiedergabe fehlgeschlagen'));
    a.play().catch((e) => done(reject, e));
  });
}

// Alles, was gerade klingt, sofort verstummen lassen (Piper-<audio> + Geräte-Stimme).
function stopPlayback() {
  if (aktuellesAudio) aktuellesAudio.abbrechen();
  try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_) {}
}

// ── Synthese serialisieren (02.10.) ────────────────────────────────────────────
// Die ONNX-Session darf nicht zwei Sätze gleichzeitig rechnen. Vorher konnte ein neuer
// Klick mit einer noch laufenden Vorab-Synthese kollidieren (→ Fehler → Browser-Stimme
// oder Hänger). Jetzt eine Warteschlange pro Session.
const synthChain = new WeakMap();   // session -> Promise
function synth(session, text) {
  const vorher = synthChain.get(session) || Promise.resolve();
  const p = vorher.then(() => session.predict(text));
  synthChain.set(session, p.then(() => {}, () => {}));
  return p;
}

// ── Anti-Desync (Phase B): Generations-Zähler. Jeder speak() erhöht ihn und merkt
// sich seinen Wert; die Wiedergabe-Schleife bricht ab, sobald ein neuerer speak()
// gestartet wurde — so ertönt nie eine veraltete Phrase verspätet über einem
// späteren 🔊-Klick (z. B. der kalt geladene Gruß über einem Wort-Klick). ────────
let speakGen = 0;

// ── Piper-Weg ──────────────────────────────────────────────────────────────────
async function speakWithPiper(text, zielsprache, gen) {
  const session = await getSession(zielsprache);   // kann beim Kaltstart Sekunden dauern
  if (gen !== speakGen) return;                     // überholt, während das Modell lud
  const chunks = splitSentences(text);
  if (!chunks.length) return;
  emit({ phase: 'speak', zielsprache });
  // Pipeline: nächsten Satz synthetisieren, während der aktuelle spielt.
  let nextSynth = synth(session, chunks[0]);
  for (let i = 0; i < chunks.length; i++) {
    const blob = await nextSynth;
    if (gen !== speakGen) return;                   // ein neuerer Klick hat übernommen
    if (i + 1 < chunks.length) nextSynth = synth(session, chunks[i + 1]);
    await playBlob(blob);
    if (gen !== speakGen) return;                   // während der Wiedergabe abgebrochen
  }
}

// ── Browser-Stimmen-Fallback (Pflicht: nie stumm) ──────────────────────────────
function speakWithBrowser(text, zielsprache) {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return resolve(false);
    const lang = FALLBACK_LANG[zielsprache] || 'en-US';
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = lang;
    const voices = synth.getVoices ? synth.getVoices() : [];
    const match = voices.find((v) => v.lang === lang) ||
                  voices.find((v) => v.lang && v.lang.slice(0, 2) === zielsprache);
    if (match) u.voice = match;
    u.onend = () => resolve(true);
    u.onerror = () => resolve(true); // angeboten ist angeboten — nicht hängen bleiben
    emit({ phase: 'fallback', zielsprache });
    synth.cancel();
    synth.speak(u);
  });
}

// ── Öffentlich: speak(text, zielsprache) ───────────────────────────────────────
async function speak(text, zielsprache) {
  if (!text || !String(text).trim()) return;
  const gen = ++speakGen;          // dieser Aufruf ist ab jetzt der aktuelle
  stopPlayback();                  // altes Audio SOFORT aus — nie zwei Stimmen übereinander
  // Geräte-Stimme direkt (Griechisch immer; auf iOS ALLE Sprachen): kein stummes Piper.
  if (useDeviceVoice(zielsprache)) {
    await speakWithBrowser(text, zielsprache);
    return;
  }
  try {
    await speakWithPiper(text, zielsprache, gen);
  } catch (e) {
    if (gen !== speakGen) return;  // schon überholt → nicht verspätet nachfallbacken
    console.warn('audio: Piper nicht verfügbar → Browser-Stimme.', e);
    await speakWithBrowser(text, zielsprache);   // macht intern synth.cancel()
  }
}

// ── Öffentlich: stop() — laufende Ausgabe sofort beenden ───────────────────────
// Für Schrittwechsel: erhöht den Generations-Zähler (laufende Pipelines verwerfen
// ihren Rest) und würgt das gerade Klingende ab.
function stop() {
  speakGen++;
  stopPlayback();
}

// Zielsprache aus dem Profil — damit warm() auch ohne Argument das Richtige tut
// (vorher lief warm() ohne Sprache still ins Leere → Kaltstart beim ersten 🔊).
function profilZielsprache() {
  try {
    const u = JSON.parse(localStorage.getItem('spikiu_user') || '{}');
    const z = u && u.profile && u.profile.zielsprache;
    return VOICE_MAP[z] ? z : null;
  } catch (_) { return null; }
}

// ── Öffentlich: warm(zielsprache) — stilles Vorwärmen ─────────────────────────
// Lädt das Modell UND rechnet einmal ein Wort still durch: so sind auch Phonemizer-
// WASM, espeak-Daten und ONNX-Kernel beim ersten echten 🔊 schon heiß.
const gewaermt = new Set();
async function warm(zielsprache) {
  zielsprache = zielsprache || profilZielsprache();
  if (!zielsprache || !VOICE_MAP[zielsprache]) return false;
  if (useDeviceVoice(zielsprache)) return true;   // Geräte-Stimme: nichts vorzuwärmen
  try {
    const session = await getSession(zielsprache);
    if (!gewaermt.has(zielsprache)) {
      gewaermt.add(zielsprache);
      try { await synth(session, 'Hola.'); } catch (_) { /* nur Vorwärmen */ }
    }
    return true;
  }
  catch (e) { console.warn('audio: Vorwärmen fehlgeschlagen.', e); return false; }
}

// Global erreichbar für klassische Skripte (karten-engine.js ruft das bei jeder neuen Karte).
if (typeof window !== 'undefined') {
  window.spikiuAudioStop = stop;
  // Seite verlassen / in den Hintergrund → nicht weiterreden.
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
