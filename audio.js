// audio.js — SPIKIU · provider-agnostische Audio-Ausgabe (Audio Phase A)
//
// EINZIGE öffentliche Schnittstelle für ALLE Räume:
//     import { speak, warm } from '/audio.js';
//     await speak(text, zielsprache);     // zielsprache ∈ 'de' | 'es' | 'en' | 'el'
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
  de: 'de_DE-thorsten-high',
  es: 'es_ES-sharvard-medium',
  en: 'en_US-lessac-high',
  el: 'el_GR-rapunzelina-low',
};

// BCP-47 für den Browser-Stimmen-Fallback.
const FALLBACK_LANG = { de: 'de-DE', es: 'es-ES', en: 'en-US', el: 'el-GR' };

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
    if (t.length <= 220) { out.push(t); continue; }
    for (let i = 0; i < t.length; i += 200) out.push(t.slice(i, i + 200));
  }
  return out;
}

// ── Wiedergabe einer einzelnen WAV-Blob; löst auf, wenn fertig gespielt ────────
function playBlob(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const a = new Audio(url);
    const done = (fn, arg) => { URL.revokeObjectURL(url); fn(arg); };
    a.onended = () => done(resolve);
    a.onerror = () => done(reject, new Error('audio: Wiedergabe fehlgeschlagen'));
    a.play().catch((e) => done(reject, e));
  });
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
  let nextSynth = session.predict(chunks[0]);
  for (let i = 0; i < chunks.length; i++) {
    const blob = await nextSynth;
    if (gen !== speakGen) return;                   // ein neuerer Klick hat übernommen
    if (i + 1 < chunks.length) nextSynth = session.predict(chunks[i + 1]);
    await playBlob(blob);
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
  try {
    await speakWithPiper(text, zielsprache, gen);
  } catch (e) {
    if (gen !== speakGen) return;  // schon überholt → nicht verspätet nachfallbacken
    console.warn('audio: Piper nicht verfügbar → Browser-Stimme.', e);
    await speakWithBrowser(text, zielsprache);   // macht intern synth.cancel()
  }
}

// ── Öffentlich: warm(zielsprache) — stilles Vorwärmen (für Phase B) ────────────
async function warm(zielsprache) {
  try { await getSession(zielsprache); return true; }
  catch (e) { console.warn('audio: Vorwärmen fehlgeschlagen.', e); return false; }
}

const audio = {
  speak,
  warm,
  set onstatus(fn) { statusCb = (typeof fn === 'function') ? fn : null; },
  get onstatus() { return statusCb; },
};

export { speak, warm };
export default audio;
