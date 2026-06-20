# AUFTRAG — Audio Phase A (Fundament + Beweis)

Stand: 20.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Voll-Spec: `DESIGN-AUDIO-PIPER.md`

> ✅ AKTIVER AUFTRAG. Auf Leos Wunsch (20.06.) springt **Audio VOR das Kleinkram-Paket**.
> Das Kleinkram-Paket ist geparkt in `AUFTRAG-KLEINKRAM.md` und kommt DIREKT NACH dieser Phase A.
> Diese Datei IST der aktive Bau-Auftrag.

---

## ZIEL

Das **Fundament** der Audio-Ausgabe legen und mit EINEM Beweis-Knopf zeigen, dass es trägt.
Noch KEIN Einbau in Räume (das ist Phase B). Heute nur: provider-agnostischer Helfer
`audio.js` + self-gehostete Piper-WASM-Assets + ein „🔊"-Knopf auf einer Test-Route, der mit
den vier echten Modellen spricht.

Nordstern: Browser-WASM = kein Server, keine Rechnung pro Satz, skaliert von selbst. Strand-ward.

---

## DIE VIER STIMMEN (final, fest verdrahtet)

| zielsprache | voiceId | HF-Pfad (Repo `rhasspy/piper-voices`, MIT) |
|---|---|---|
| `de` | `de_DE-thorsten-high`   | `de/de_DE/thorsten/high/de_DE-thorsten-high.onnx` |
| `es` | `es_ES-sharvard-medium` | `es/es_ES/sharvard/medium/es_ES-sharvard-medium.onnx` |
| `en` | `en_US-lessac-high`     | `en/en_US/lessac/high/en_US-lessac-high.onnx` |
| `el` | `el_GR-rapunzelina-low` | `el/el_GR/rapunzelina/low/el_GR-rapunzelina-low.onnx` |

Jede Stimme braucht zur Laufzeit `.onnx` UND `.onnx.json` (gleicher Pfad, Endung `.onnx.json`).
Alle vier am 20.06. lokal erzeugt → existieren gesichert.

---

## SCHRITT 1 — Library + WASM self-hosten (CDN ist bestätigt kaputt)

Der ESM-CDN-Weg (esm.sh/jsDelivr) lädt die WASM-Worker nicht zuverlässig. Daher self-hosten:

- Library-Distribution (Empfehlung: `@mintplex-labs/piper-tts-web` — explizit für Browser
  gebaut, robuster self-gehostet; Alternative `@diffusionstudio/vits-web`). Self-host-Anleitung
  der jeweiligen README folgen.
- `onnxruntime-web`-WASM-Dateien, espeak/Phonemizer-WASM + Daten, der Worker.
- Alle statischen Assets nach `public/` (bzw. dorthin, wo Vercel sie als statische Dateien
  ausliefert). Zusammen ~20–30 MB — OK fürs Repo.
- **NICHT ins Repo:** die vier `.onnx`-Modelle (je ~60–115 MB). Werden zur Laufzeit von
  HuggingFace geladen und im Browser (OPFS) gecacht.

`vercel.json` nur so weit anfassen, dass die statischen Audio-Assets erreichbar sind. KEINE
COOP/COEP-Header (bewusst aufgeschoben — single-threaded läuft überall).

---

## SCHRITT 2 — `audio.js` bauen (DER Schlüsselstein)

Ein einziges Frontend-Modul mit EINER öffentlichen Funktion:

```
audio.speak(text, zielsprache)   // zielsprache ∈ 'de' | 'es' | 'en' | 'el'
```

Innen:
1. `zielsprache` → fester `voiceId` (Tabelle oben). Kein anderer Aufrufer kennt je einen voiceId.
2. **Lazy, pro Sprache, einmalig:** erst beim ersten `speak()` in dieser Sprache das EINE Modell
   laden. Nicht beim Seiten-Start.
3. **OPFS-Cache:** liegt das Modell schon in OPFS → kein erneuter Download (offline-fähig).
4. **Warme Session:** Session/Worker einmal aufbauen, wiederverwenden — nicht pro Klick.
5. **Satzweise:** lange Texte häppchenweise; ersten Ton sofort spielen.
6. **Fallback (Pflicht):** lädt/läuft Piper nicht (v. a. iOS-Safari), automatisch auf
   `speechSynthesis` (Browser-Stimme) mit passender `lang` zurückfallen. NIE ein stummer Knopf.
7. Optional sinnvoll: `audio.warm(zielsprache)` zum stillen Vorwärmen (für Phase B), und ein
   Status-Callback („Stimme wird vorbereitet…"). Kein Muss für Phase A.

Stack-Regeln: kein `import.meta`; Naming „Spikiu"; `audio.js` ist die EINZIGE öffentliche
Audio-Schnittstelle (heute Piper, Phase 2 ElevenLabs hinter derselben `speak()`-API — Aufrufer
ändern sich NIE).

---

## SCHRITT 3 — Beweis-Knopf

EINE Test-/Wegwerf-Route (oder schlichte `audio-test.html`) mit:
- vier Knöpfen (de/es/en/el) ODER einem Knopf + Sprachwähler,
- die je einen kurzen Satz in der jeweiligen Sprache durch `audio.speak()` schicken.

Kein Einbau in echte Räume. Nur Beweis, dass das Fundament trägt.

---

## ABNAHME (alles grün, sonst nicht fertig)

- [ ] Alle VIER Sprachen sprechen über `audio.speak(text, zielsprache)`.
- [ ] Zweiter Aufruf derselben Sprache → KEIN erneuter Download (OPFS greift; im Network-Tab sichtbar).
- [ ] iPhone/Safari: spricht ODER fällt sauber auf die Browser-Stimme zurück (nie stumm).
- [ ] Kein COOP/COEP-Header gesetzt; läuft single-threaded überall.
- [ ] `audio.js` exportiert NUR `speak` (+ optional `warm`); kein voiceId/Piper-Detail leckt nach außen.
- [ ] Nur neue Dateien + minimaler `vercel.json`-Eintrag angefasst. KEIN Raum, KEINE Seele berührt.
- [ ] `node --check audio.js` grün; Modell-Pfade exakt wie in der Tabelle.

---

## AUSDRÜCKLICH NICHT in Phase A
- Kein Einbau ins Gym / in die Lektions-Anzeige (= Phase B).
- Kein Lektions-Vorrender (= Phase C).
- Kein ElevenLabs (= Phase D / Phase 2).
- Keine Modelle ins Repo.
