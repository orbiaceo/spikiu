# DESIGN — AUDIO (Piper-WASM, Testphase)

Stand: 20.06.2026 · Design-Sitzung (claude.ai) · eingefrorenes Spec, Quelle für die Bau-Aufträge
Update 20.06.: Stimmen per Ohr getestet → VIER STIMMEN final neu gesetzt (siehe unten).
Phase-A-Auftrag ist auf Leos Wunsch (20.06.) JETZT der aktive `AKTUELLER-AUFTRAG.md` (Audio zuerst);
Kleinkram geparkt in `AUFTRAG-KLEINKRAM.md` (kommt direkt danach).
Branch: dev · Gehört zum Ledger.

---

## ZIEL

Audio in Vokabel-Übungen, Lektionen und vor allem im **Gym** (stilles Üben unterwegs,
Wort vorsprechen). Testphase: **Piper im Browser (WASM, lokal)** — kein Server, kein
Pro-Aufruf-Kosten. **ElevenLabs bleibt Phase 2** (höhere Qualität, später).

Nordstern-Check: Browser-WASM bindet Leonardo NICHT an den Schreibtisch — kein Server,
keine Rechnung pro Satz, skaliert von selbst. Strand-ward.

---

## DIE VIER STIMMEN (final — am 20.06. von Leonardo per Ohr im Browser gewählt)

_Ersetzt die erste Auswahl (ramona/claude/danny/rapunzelina-medium). Am 20.06. systematisch
getestet: WAV lokal auf der Toshiba mit `python3 -m piper` erzeugt, in einer Prüf-HTML pro
Stimme angehört. Lehre: die `low`/`x_low`-Tiers klingen amateurhaft — Sprung kommt erst bei
`medium`/`high`._

| Sprache | voiceId | Sex | Tier | Notiz |
|---|---|---|---|---|
| Deutsch | `de_DE-thorsten-high` | ♂ | high | einzige deutsche Studio-Stimme; FRAU in high existiert NICHT |
| Spanisch | `es_ES-sharvard-medium` | ♂ | medium | Leos Wahl; `es_ES-sharvard-high` existiert nicht (nur medium) |
| Englisch (US) | `en_US-lessac-high` | ♀ | high | männliche Reserve in high vorhanden: `en_US-ryan-high` |
| Griechisch | `el_GR-rapunzelina-low` | — | low | EINZIGE griechische Piper-Stimme; medium/high existiert NICHT |

- **Korrektur ggü. Spec-Erstfassung:** `el_GR-rapunzelina-medium` gibt es nicht — Griechisch
  hat in ganz Piper nur `rapunzelina-low`. Unvermeidlich.
- **Spanisch-Entscheidung bewusst:** die einzige spanische HIGH ist `es_MX-claude-high` (♀,
  Mexiko/neutro). Leo wollte eine MÄNNLICHE spanische Stimme → `es_ES-sharvard-medium` (medium,
  Spanien-Akzent). Man kann nicht beides gleichzeitig (high + männlich) in Spanisch haben.
  Reserve/Alternative männlich-neutral-mexikanisch: `es_MX-ald-medium`.
- **Exakte HF-Pfade (verifiziert, alle vier am 20.06. lokal erzeugt → existieren):**
  `de/de_DE/thorsten/high/de_DE-thorsten-high.onnx` ·
  `es/es_ES/sharvard/medium/es_ES-sharvard-medium.onnx` ·
  `en/en_US/lessac/high/en_US-lessac-high.onnx` ·
  `el/el_GR/rapunzelina/low/el_GR-rapunzelina-low.onnx`  (Repo `rhasspy/piper-voices`, MIT).

### Verworfene Motoren (damit niemand sie nochmal aufmacht)
- **Kokoro** (klingt besser): `kokoro-js` im Browser kann NUR Englisch. Spanisch/andere Sprachen
  brauchen `misaki` (Python) → nur Server oder Vorrender, NICHT live im Browser. Für es/de/el
  raus. (Englisch-Vorrender wäre theoretisch denkbar — Backlog, nicht jetzt.)
- **Chatterbox / ElevenLabs**: Server-GPU bzw. Kosten pro Aufruf → brechen den Strand. ElevenLabs
  bleibt Phase 2 (Premium). STT für Freies Sprechen = **Whisper** (Phase 2, separat).
- **Eigene Stimme (Voice-Clone)**: „für alle Fälle", Phase 2. Piper klont nicht zur Laufzeit —
  man TRAINIERT ein eigenes Modell (Fine-tune, ~1–1.5 h saubere Aufnahme nach Skript, GPU-Training
  ~2–4 h gemietet). Leo hat Studio-Technik (TASCAM US-122L + 2 Kondensatormikros) — aber NUR an der
  Toshiba (Linux `snd-usb-us122l` + fxload-Firmware; am Android-Tablet NICHT lauffähig). Toshiba
  hat keine CUDA-GPU → Training in gemieteter Cloud-GPU. Leo dreisprachig → eigene Stimme könnte
  es/de/en sein; Griechisch bliebe Bibliotheks-Stimme.

---

## ARCHITEKTUR

### Was self-gehostet wird — und was NICHT
Der CDN-Test (esm.sh, jsDelivr) hat gezeigt: die **Library samt WASM-Workern** lässt sich
nicht zuverlässig über einen ESM-CDN laden. Also:

- **Self-hosten (klein, ins Repo/`public`):** die Library-Distribution (vits-web ODER
  `@mintplex-labs/piper-tts-web`), die `onnxruntime-web`-WASM-Dateien, die espeak/Phonemizer-
  WASM + Daten, der Worker. Zusammen überschaubar (~20–30 MB statische Assets).
- **NICHT ins Repo:** die 4 Modell-Dateien (`.onnx`, je ~60 MB → zusammen ~240 MB). Die
  würden Git + Vercel-Deploy sprengen. Sie werden zur **Laufzeit von HuggingFace**
  (`rhasspy/piper-voices`, MIT) geladen und im Browser (OPFS) gecacht. Phase-2-Option:
  Modelle auf eigenen Speicher spiegeln, falls HF zu langsam/unzuverlässig.

### Provider-agnostischer Helfer `audio.js` (DER Schlüsselstein)
Ein einziges Modul mit EINER öffentlichen Funktion, das ALLE Räume nutzen:

```
audio.speak(text, zielsprache)   // zielsprache ∈ de|es|en|el
```

- Drinnen: Sprache → fester voiceId (Tabelle oben). Lädt/cacht die richtige Stimme,
  baut die Session einmal auf (warm), synthetisiert, spielt ab.
- **Heute Piper-WASM hinter dieser Fassade. Morgen ElevenLabs — gleiche `speak()`-API,
  Aufrufer ändern sich NIE.** Das ist der ganze Trick: Schnittstelle einmal bauen, Motor
  später tauschen. (Phase 2 = nur die Innereien von `audio.js` austauschen.)

### Lade-Strategie (löst „dauert ewig" aus dem Prototyp)
Der Prototyp war langsam, weil er pro Satz das Modell neu lud + Session neu aufbaute.
Im Produkt:
1. **Lazy, pro Sprache, einmalig.** Kein Laden beim App-Start. Erst wenn der Lerner zum
   ersten Mal Audio in SEINER Zielsprache braucht → genau die EINE Stimme laden.
2. **Hintergrund-Vorwärmen.** Beim Betreten des Raums (Gym/Lektion) lädt + initialisiert
   das Modell still im Hintergrund, mit dezentem „Stimme wird vorbereitet…", bevor der
   Lerner auf Hören drückt.
3. **Warme Session.** Session einmal aufbauen, wiederverwenden — nicht pro Klick.
4. **Satzweise.** Lange Texte häppchenweise synthetisieren, ersten Ton sofort abspielen.
5. **Danach offline.** Liegt das Modell in OPFS, kein Download mehr — funktioniert ohne Netz.

### Fallback (Pflicht)
Lädt/läuft Piper auf einem Gerät nicht (v. a. iOS-Safari: OPFS/Threads-Eigenheiten), fällt
`audio.js` **automatisch auf die Browser-Stimme** (`speechSynthesis`) zurück — Audio
funktioniert dann trotzdem, nur in geringerer Qualität. Nie ein stummer Knopf.

### COOP/COEP (Tempo-Header) — bewusst aufgeschoben
Cross-Origin-Isolation würde ONNX multi-threaded (schneller) machen, kann aber die
Anthropic-API-Calls und externe Bilder stören. **Testphase: ohne Header, single-threaded**
(läuft überall, kein Risiko). Erst messen; falls nötig, später `credentialless`-COEP oder
nur auf Audio-Routen. Nicht im ersten Happen.

### Lektions-Trick (Strand, optional, spätere Phase)
Lektions-Texte sind FEST erzeugt. Man kann sie **einmal vorab** zu kleinen MP3s rendern
(Piper-CLI bei der Lektions-Erzeugung) und ablegen — dann macht das schwache Handy für
Lektionen KEIN Live-WASM. Live-WASM bleibt dem **Gym** vorbehalten (unvorhersehbare Wörter).

---

## BAU-PHASEN (jede Phase = eigener AKTUELLER-AUFTRAG, klein + prüfbar)

**Phase A — Fundament + Beweis (erster Happen).**
Self-hosten der Library + WASM-Runtime als statische Assets; `audio.js` bauen (öffentliche
`speak(text, zielsprache)`, lazy Laden + OPFS-Cache + warme Session + Fallback auf Browser-
Stimme). Beweis: EIN „🔊"-Knopf auf einer Test-Route (oder throwaway-Seite), der mit den
echten 4 Modellen spricht. Auf dev + echten Geräten (inkl. iPhone) testen. Abnahme: alle
vier Sprachen sprechen; zweiter Aufruf ohne Download (OPFS greift); iPhone → spricht oder
fällt sauber auf Browser-Stimme.

**Phase B — Einbau in die Räume.**
`audio.js` ins Gym (sobald gebaut) und/oder in die Lektions-Anzeige verdrahten: Audio pro
Wort, Vorwärmen beim Raum-Eintritt.

**Phase C — Lektions-Vorrender (optional).**
Feste Lektions-Texte bei der Erzeugung zu MP3 rendern, für schwache Geräte.

**Phase D / Phase 2 — ElevenLabs.**
Innereien von `audio.js` auf ElevenLabs umstellen, `speak()`-API unverändert.

---

## OFFENE TECHNISCHE FRAGEN (vor Phase-A-Bau klären)
- Welche Lib konkret: `@diffusionstudio/vits-web@1.0.3` vs `@mintplex-labs/piper-tts-web@1.0.4`?
  (Beide haben `predict({text, voiceId})`; mintplex ist explizit für Browser/AnythingLLM
  gebaut → wahrscheinlich robuster self-gehostet. Beim Bau die self-host-Anleitung der
  jeweiligen README befolgen — Assets nach `public/` kopieren.)
- HF-Modell-Pfade der vier Stimmen exakt verifizieren.
- iPhone/Safari: real testen (entscheidet, wie oft der Fallback greift).

---

## ABHÄNGIGKEITEN / REIHENFOLGE
- Phase A erst NACH dem offenen **Kleinkram-Paket** (Name-Leak + Lesebegleiter) bauen —
  nicht stapeln.
- Gym ist heute nur ein Nav-Knopf → Phase B braucht zuerst den echten Gym-Raum (eigenes
  Design-Paket) ODER hängt sich übergangsweise an die Lektions-Anzeige.
