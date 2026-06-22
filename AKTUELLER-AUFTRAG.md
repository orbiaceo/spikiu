# AUFTRAG — erledigt am 22.06.2026 · kein offener Auftrag

> **„Voz primero" (Paket 5) GEBAUT + auf dev (commit 7d0af09).** Headless verifiziert,
> `node --check` grün, nur 2 Dateien (`capy-vivo.js` + `chat.html`). Bericht im
> SPIKIU-BUILD-LEDGER.md. OFFEN = nur Geräte-Abnahme durch Leo (Ton hörbar/Piper+iOS-
> Fallback, `prefers-reduced-motion` am Gerät) + **FRAGE AN DESIGN: Gruß-Sprache** —
> gewählt Zielsprache; falls Muttersprach-Gruß gewünscht, Einzeiler (siehe Ledger).
> NÄCHSTES laut Auftrag = Paket 6 „Reel táctil".

---

_Archiv des erledigten Auftrags:_

Stand: 22.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigte Prototypen (Stil + Verhalten): `prototyp-voz.html` + `prototyp-capy-vivo.html` (Laune „habla")

> Spikiu BEGRÜSST DICH MIT STIMME, wenn du den Gesprächs-Raum betrittst — Präsenz durch
> Klang. Den Begleiter HÖREN macht ihn lebendig.
>
> AUTOPLAY-WAHRHEIT (Browser): Ton darf NICHT ohne eine Nutzer-Geste starten. Darum wird
> nicht blind beim Laden abgespielt, sondern Spikiu LÄDT EIN: ein sanfter Puls + „tipp,
> um mich zu hören"; der erste Tipp ist die Geste → ab da spielt die Stimme (und der
> bestehende 🔊 pro Blase sowieso). NIE ein stummer Knopf (Fallback steckt schon in audio.js).

## WAS WIEDERVERWENDET WIRD (frisch aus dev geprüft)
- `audio.js` (ES-Modul am Root): `speak(text, zielsprache)` + `warm(zielsprache)`, Piper-WASM
  mit automatischem `speechSynthesis`-Fallback. NICHT anfassen.
- In `chat.html` schon da: `say(text, zielsprache)` (Z.339, nutzt `window.spkSpeak`/Fallback),
  `warmVoice(zielsprache)` (Z.351), 🔊 pro Spikiu-Blase, `voiceReady`-Flag.
- `capy-vivo.js` (Paket 1): atmet/blinzelt/Blick/Tipp. Bekommt jetzt einen **Sprech-Zustand**.
- Der Opener (Teil 35): ruhige Gruß-Zeile beim Eintritt (leere History → `[EINSTIEG]`).

## DATEIEN (ZWEI)
1. **`capy-vivo.js`** — wiederverwendbaren **Sprech-Zustand** ergänzen.
2. **`chat.html`** — gesprochener Gruß am Opener + Sprech-Animation.

`audio.js`, `api/*`, Seele, `*-modus.md`, `nav.js`, `baum.js`, `dashboard.html` UNBERÜHRT.
Das Backend / der Opener-Inhalt wird NICHT geändert.

## 1) `capy-vivo.js` — Sprech-Zustand (wiederverwendbar)
- Eine Möglichkeit, einen belebten Capy in den Zustand **„spricht"** zu schalten und zurück
  (z. B. `spkCapyAlive` gibt ein Handle mit `.speak(true/false)` zurück, oder global
  `spkCapySpeak(svgEl, on)`). Idempotent, defensiv.
- Animation = **Mund bewegt sich** (das Lächeln-`<path>` des kanonischen Capy bekommt eine
  Kennung `spk-capy-mouth`; im Sprech-Zustand sanftes Auf/Zu, wie `talk` in den Prototypen)
  **+ weiche Aura-Ringe** um den Capy (zwei pulsierende Ringe, wie `prototyp-voz.html`).
- `prefers-reduced-motion`: nur Aura sehr dezent oder aus, kein hektischer Mund.
- Kanonischen SVG NICHT umformen — nur die Mund-Pfad-Kennung ergänzen. Capy bleibt vollständig.

## 2) `chat.html` — Spikiu spricht beim Eintritt
- **Beim Betreten** des Raums die Stimme für die Nutzersprache vorwärmen (`warmVoice` —
  falls noch nicht am Eintritt, hier sicherstellen), damit der erste Tipp sofort klingt.
- **Opener-Gruß als Präsenz-Moment:** die Gruß-Zeile bekommt einen etwas **größeren Capy**
  (Präsenz; z. B. die 38-px-`.capy-icon` statt 20-px-Avatar NUR für den Opener) + einen
  **sanften Puls** und einen dezenten Hinweis **„tipp, um Spikiu zu hören"** (i18n DE/ES/EN),
  weil Autoplay eine Geste braucht.
- **Erster Tipp** auf den Opener-Capy/die Gruß-Zeile (= die Geste) →
  `say(grußText, zielsprache)` UND den Capy in den **Sprech-Zustand** (Mund + Aura) für die
  Dauer; am Ende zurück in Ruhe. Sprich den Text in SEINER Sprache (Muttersprach-Gruß →
  Muttersprach-Stimme; eine Zielsprachen-Zeile → Zielsprachen-Stimme; `audio.js` kann
  de/es/en/el).
- Danach läuft der normale Opener-Flow weiter (Gabelung plaudern/Thema unverändert). Der
  bestehende 🔊 pro Blase bleibt unverändert. KEIN Auto-Play ohne Geste.

## ABNAHME
- [ ] Beim Betreten des Gesprächs-Raums lädt Spikiu sichtbar ein (Puls + „zum Hören tippen");
      ein Tipp → man HÖRT seinen Gruß (Piper oder Browser-Fallback), und der Capy bewegt
      dabei den Mund + zeigt die Aura; danach wieder ruhig.
- [ ] KEIN Tonversuch ohne Geste (kein stummer Fehlversuch / keine Konsolenfehler).
- [ ] Opener-Gabelung + restlicher Chat-Flow unverändert; 🔊 pro Blase funktioniert weiter.
- [ ] Capy VOLLSTÄNDIG (Ohren/4 Pfoten), nie trasquilado; Sprech-Zustand in `capy-vivo.js`
      ist wiederverwendbar (später auch für den Mitte-Capy der Navigation).
- [ ] `prefers-reduced-motion` ruhig; i18n DE/ES/EN für den Hinweis.
- [ ] Nur die 2 Dateien geändert; `node --check` grün; headless verifiziert.

## AUSDRÜCKLICH NICHT
- KEIN Auto-Play ohne Nutzer-Geste. KEIN Umbau von `audio.js` / kein neuer Endpoint /
  kein Backend-/Opener-Inhalt-Eingriff. Mikrofon/Zurücksprechen = Phase 2 (Whisper), NICHT hier.
- Capy NIE vereinfachen. Kein Stripe/Supabase.

## DANACH
- **Paket 6 — Reel táctil** (`prototyp-reel-tactil.html`): schließt die visuelle Welle (Gym
  Tinder-Wisch mit Vibration/Klang/Gleiten — wenn der Gym-Raum dran ist).
- Dann das **„Paket Echte Daten"**: etappe-Aufstieg, firstSeen/Tage, Wort-Meisterung — die
  Hollywood-Fassade Stück für Stück mit echter Nutzer-Interaktion füttern.
