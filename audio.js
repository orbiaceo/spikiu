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
  es: 'es_ES-davefx-medium',     // 21.10.: sharvard → davefx (einzige, die sí/no-Fragen hebt); Hall-Filter s. NACHBEARBEITUNG
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
//
// FRAGEN (21.10.): Eine Frage wird NIE an ihren Kommas geteilt — sonst bekommt Piper den
// ersten Teil ohne „?" und liest ihn als Aussage (Leo: „las preguntas no se pronuncian como
// preguntas"). Die ganze Frage geht als EIN Brocken, damit die Melodie bis zum „?" reicht.
// Nur ein sehr langer Vorsatz VOR dem „¿" darf abgetrennt werden („Si mañana …, ¿vienes?").
function splitClauses(satz) {
  if (satz.length <= 90) return [satz];
  if (/\?\s*$/.test(satz)) {
    if (satz.length <= 220) return [satz];
    const ab = satz.lastIndexOf('¿');
    if (ab > 0) return [...splitClauses(satz.slice(0, ab).trim()), satz.slice(ab).trim()];
    return [satz];
  }
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

// ── Einzelsilben (Leo, 12.11.2026: „In den Silben ist es undeutlich, das g klingt wie ein anderer Konsonant“) ──
// „ga.“, „gue.“, „ci.“ als eigener Satz: Piper hat kaum Kontext und spricht den Anlaut verwaschen. Für Bausteine
// mit höchstens EINEM Vokalkern: etwas langsamer und ruhiger (weniger Zufallsrauschen im Modell).
// Wörter mit zwei+ Silben (Minimalpaare gota/jota) bleiben unverändert – die klangen schon gut.
const KURZ_SKALEN = { length: 1.3, noise: 0.5, noiseW: 0.5 };
function kurzeSilbe(text) {
  const w = String(text).toLowerCase().replace(/[^\p{L}]/gu, '');
  if (!w || w.length > 5) return false;
  const kerne = w.replace(/([gq])u(?=[eiéí])/g, '$1').match(/[aeiouáéíóúü]+/g);   // gue/que: u ist stumm
  return !kerne || kerne.length <= 1;
}
function synth(session, text) {
  const vorher = synthChain.get(session) || Promise.resolve();
  const p = vorher.then(() => session.predict(text, kurzeSilbe(text) ? KURZ_SKALEN : undefined));
  synthChain.set(session, p.then(() => {}, () => {}));
  return p;
}

// ── Anti-Hall-Filter (21.10.): davefx (Spanisch) ist „wie im Bad“ aufgenommen. ────
// Leo wählte im Blindtest (Prototyp filtro-eco.html, danach entfernt) die Fassung „fuerte“: Hochpass 90 Hz →
// Senke 350 Hz −6 dB (Kastenklang) → Präsenz 3,5 kHz +4 dB → Abwärts-Expander
// (Schwelle −22 dB unter Satzpeak, Ratio 4, Boden −25 dB) dämpft die Hall-Fahnen.
// Nur für Sprachen in NACHBEARBEITUNG. Jeder Fehler → Original-Blob (nie stumm).
const NACHBEARBEITUNG = {
  es: { caja: -6, presencia: 4, umbral: -22, ratio: 4.0, suelo: -25 },
};
let filterCtx = null;
async function nachbearbeite(blob, zielsprache, kurz) {
  let p = NACHBEARBEITUNG[zielsprache];
  // Einzelsilbe: Expander sanft – bei „ga“ liegt der leise Anlaut unter der Schwelle und wurde weggedrückt
  if (p && kurz) p = Object.assign({}, p, { umbral: -38, ratio: 2.0 });
  if (!p || typeof OfflineAudioContext === 'undefined') return blob;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!filterCtx) filterCtx = new AC();
    const buf = await filterCtx.decodeAudioData(await blob.arrayBuffer());
    const sr = buf.sampleRate;
    const off = new OfflineAudioContext(1, buf.length, sr);
    const src = off.createBufferSource(); src.buffer = buf;
    const hp = off.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 90; hp.Q.value = 0.7;
    const caja = off.createBiquadFilter(); caja.type = 'peaking'; caja.frequency.value = 350; caja.Q.value = 1.0; caja.gain.value = p.caja;
    const pres = off.createBiquadFilter(); pres.type = 'peaking'; pres.frequency.value = 3500; pres.Q.value = 0.9; pres.gain.value = p.presencia;
    src.connect(hp); hp.connect(caja); caja.connect(pres); pres.connect(off.destination);
    src.start();
    const x = (await off.startRendering()).getChannelData(0);
    return wavAus(expandiere(x, sr, p), sr);
  } catch (_) {
    return blob;
  }
}
function expandiere(x, sr, p) {
  const n = x.length;
  const atk = Math.exp(-1 / (0.002 * sr)), rel = Math.exp(-1 / (0.050 * sr));
  const env = new Float32Array(n);
  let e = 0, pico = 1e-9;
  for (let i = 0; i < n; i++) {
    const a = Math.abs(x[i]);
    e = a > e ? atk * e + (1 - atk) * a : rel * e + (1 - rel) * a;
    env[i] = e; if (e > pico) pico = e;
  }
  const schwelle = pico * Math.pow(10, p.umbral / 20);
  const boden = Math.pow(10, p.suelo / 20);
  const gA = Math.exp(-1 / (0.003 * sr)), gR = Math.exp(-1 / (0.060 * sr));
  // Vorausschau 40 ms (12.11.2026): die Tür öffnet sich, BEVOR der Vokal kommt – so bleibt der leise
  // Anlaut (g, b, d, f …) erhalten; die Hall-Fahne NACH dem Laut wird weiter gedämpft.
  const voraus = Math.round(0.040 * sr);
  const y = new Float32Array(n);
  let g = 1, mx = 1e-9;
  for (let i = 0; i < n; i++) {
    let ziel = 1;
    let envV = env[i];
    for (let k = 1; k <= voraus && i + k < n; k += 32) if (env[i + k] > envV) envV = env[i + k];
    if (envV < schwelle) ziel = Math.max(boden, Math.pow(envV / schwelle, p.ratio - 1));
    g = ziel > g ? gA * g + (1 - gA) * ziel : gR * g + (1 - gR) * ziel;
    y[i] = x[i] * g;
    if (Math.abs(y[i]) > mx) mx = Math.abs(y[i]);
  }
  const k = 0.9 / mx;
  for (let i = 0; i < n; i++) y[i] *= k;
  return y;
}
function wavAus(muestras, sr) {
  const n = muestras.length, ab = new ArrayBuffer(44 + n * 2), v = new DataView(ab);
  const tx = (o, t) => { for (let i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); };
  tx(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); tx(8, 'WAVE'); tx(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  tx(36, 'data'); v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) { const c = Math.max(-1, Math.min(1, muestras[i])); v.setInt16(44 + i * 2, c < 0 ? c * 0x8000 : c * 0x7fff, true); }
  return new Blob([ab], { type: 'audio/wav' });
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
  // Sätze; eine PAUSE-Marke (aus vokalListen) wird zu echter Stille zwischen zwei Sätzen.
  const chunks = [], pauseNach = [];
  String(text).split(PAUSE).forEach((teil, k) => {
    if (k > 0 && chunks.length) pauseNach[chunks.length - 1] = true;
    chunks.push(...splitSentences(teil));
  });
  if (!chunks.length) return;
  emit({ phase: 'speak', zielsprache });
  // Pipeline: nächsten Satz synthetisieren, während der aktuelle spielt.
  let nextSynth = synth(session, chunks[0]).then((bl) => nachbearbeite(bl, zielsprache, kurzeSilbe(chunks[0])));
  for (let i = 0; i < chunks.length; i++) {
    const blob = await nextSynth;
    if (gen !== speakGen) return;                   // ein neuerer Klick hat übernommen
    if (i + 1 < chunks.length) nextSynth = synth(session, chunks[i + 1]).then((bl) => nachbearbeite(bl, zielsprache, kurzeSilbe(chunks[i + 1])));
    await playBlob(blob);
    if (gen !== speakGen) return;                   // während der Wiedergabe abgebrochen
    if (pauseNach[i]) {
      await new Promise((r) => setTimeout(r, 700));
      if (gen !== speakGen) return;
    }
  }
}

// ── Browser-Stimmen-Fallback (Pflicht: nie stumm) ──────────────────────────────
function speakWithBrowser(text, zielsprache) {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return resolve(false);
    const lang = FALLBACK_LANG[zielsprache] || 'en-US';
    const u = new SpeechSynthesisUtterance(String(text).split(PAUSE).join(' … '));
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
// ── Sprech-Ebene ≠ Lese-Ebene (Leo, 07.11.2026: „Bue-no es lo visual. Lo que lee la voz debe ser: bueno.“) ──
// Silbentrennung, die man SIEHT (mur-cié-la-go, pa-e-lla), wird für die Stimme zum ganzen Wort zusammengezogen –
// sonst klingt es wie gestottert. Nur Bindestriche ZWISCHEN zwei Buchstaben; Endungen wie „-ar“ bleiben unberührt.
// ── Buchstabieren (Leo, 11.11.2026: „a, e, i, o, u“ klang wie „Tate, Tito, Tu“; „Ele, u, ce … werden so schnell
//    und verbunden vorgelesen wie wenn es ein Satz wäre … für alle Fälle“) ──────────────────────────────────────
// Buchstabier-Element = Buchstabenname (auch „i con tilde“, „uve doble“) oder Kurzstück aus 1–3 Buchstaben.
// Fälle: (1) ≥3 Elemente mit Komma/·/; / „/“ getrennt  (2) ≥3 einzelne Vokale nur mit Leerzeichen („a e i o u“)
//        (3) Großbuchstaben mit Bindestrich (L-U-C-Í-A) → auf Spanisch die Buchstabennamen.
// Jedes Element wird ein eigener Satz, PAUSE davor/dazwischen/danach. Gleiche Elemente („¡Ay, ay, ay!“) = Ausruf, bleibt.
const PAUSE = '⏸';
const BUCHSTABE_ES = { A: 'a', B: 'be', C: 'ce', D: 'de', E: 'e', F: 'efe', G: 'ge', H: 'hache', I: 'i', J: 'jota', K: 'ka',
  L: 'ele', M: 'eme', N: 'ene', 'Ñ': 'eñe', O: 'o', P: 'pe', Q: 'cu', R: 'erre', S: 'ese', T: 'te', U: 'u', V: 'uve',
  W: 'uve doble', X: 'equis', Y: 'ye', Z: 'zeta', 'Á': 'a con tilde', 'É': 'e con tilde', 'Í': 'i con tilde',
  'Ó': 'o con tilde', 'Ú': 'u con tilde', 'Ü': 'u con diéresis' };
const BS_ITEM = '(?:i griega|uve doble|doble (?:ele|erre)|hache|jota|erre|equis|zeta|\\p{L}{1,3})(?:\\s+con\\s+(?:tilde|diéresis))?';
const BS_LISTE = new RegExp('(^|[^\\p{L}])(' + BS_ITEM + '(?:\\s*[,·;\\/]\\s*' + BS_ITEM + '){2,})(?![\\p{L}])', 'giu');
const BS_VOKALE = /(^|[^\p{L}\-‐‑])([aeiouáéíóú](?:\s+[aeiouáéíóú]){2,})(?![\p{L}\-‐‑])/giu;
const BS_GROSS = /(^|[^\p{L}])(\p{Lu}(?:[-‐‑]\p{Lu}){2,})(?![\p{L}])/gu;

function alsListe(vor, elemente) {
  const e = elemente.map((x) => x.trim()).filter(Boolean);
  if (new Set(e.map((x) => x.toLowerCase())).size === 1) return null;   // Ausruf, kein Buchstabieren
  return vor + ' ' + PAUSE + ' ' + e.map((x) => x + '.').join(' ' + PAUSE + ' ') + ' ' + PAUSE + ' ';
}
function buchstabieren(t, zielsprache) {
  t = t.replace(BS_GROSS, (m, vor, folge) => vor + folge.split(/[-‐‑]/)
    .map((c) => (zielsprache === 'es' ? (BUCHSTABE_ES[c] || c.toLowerCase()) : c)).join(', '));
  t = t.replace(BS_LISTE, (m, vor, liste) => alsListe(vor, liste.split(/[,·;\/]/)) || m);
  t = t.replace(BS_VOKALE, (m, vor, liste) => alsListe(vor, liste.split(/\s+/)) || m);
  return t.replace(new RegExp(PAUSE + '\\s*[.,;:!?…]+', 'g'), PAUSE);   // kein verwaister Satzpunkt nach der letzten Pause
}
function sprechText(text, zielsprache) {
  // erst Buchstabieren (bevor „L-U-C“ / „a-e-i“ zusammengezogen würde), dann Silben-Bindestriche zum ganzen Wort
  return buchstabieren(String(text), zielsprache).replace(/(\p{L})[-‐‑](?=\p{L})/gu, '$1');   // ohne Lookbehind: älteres Safari
}

async function speak(text, zielsprache) {
  if (!text || !String(text).trim()) return;
  text = sprechText(text, zielsprache);
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
