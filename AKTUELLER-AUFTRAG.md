# AUFTRAG — Sitzungs-Persistenz: keine Arbeit geht durch einen Fehl-Tipp verloren

Stand: 24.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev
Referenz: prototyp-sitzung-fortschritt.html (von Leo abgenommen)
Prinzip: anti-Gamification (kein Streak/Score) · reine Kontinuität wie Memoria · nav.js UNANGETASTET

> BEVOR DU BAUST: Ledger ganz lesen, echten dev prüfen (`git ls-tree -r --name-only origin/dev`),
> `taller.html` + `schreibwerkstatt.html` frisch ansehen. `sitzung.js` existiert noch NICHT (404).
> Die Charta liegt NICHT im Repo (Projektwissen) — nicht suchen, nicht editieren.

---

## WARUM
`taller.html` und `schreibwerkstatt.html` halten ihren ganzen Zustand nur im RAM (JS-Variablen:
`verlauf`, `currentText`/`currentTexto`, `touched`/`total`, der geladene Text). Nichts wird gesichert.
Ein Fehl-Tipp auf die untere Navi → alles weg, taller lädt einen brandneuen Text, die Schreibwerkstatt
startet leer. Das ist ein Kündigungs-Risiko. Lösung: ein gemeinsamer Helfer, den jeder Raum erbt.

Persistenz = `localStorage` (pro Gerät/Browser; Supabase = Phase 2). NICHT CacheStorage.

---

## DAS PAKET — fünf Teile

### (1) NEU `sitzung.js` (Root-Helfer, statisch wie nav.js / baum.js / capy-vivo.js — KEIN vercel.json-Eintrag)
Exponiert `window.spikiuSitzung` mit:
- `lade(raum)` → gespeicherter Zustand (Objekt) oder `null`. try/catch, nie werfen.
- `speichere(raum, zustand)` → setzt `zustand.ts = Date.now()`, schreibt unter Schlüssel
  `spikiu_sitzung:<raum>`. try/catch.
- `raeume(raum)` → löscht den Schlüssel. try/catch.
- `frageWiederkommen({raum, ts, wo, beimWeiter, beimNeu})` → rendert die Wiederkommen-Karte
  (Overlay/Veil) wie im Prototyp: vollständiger kanonischer Capy (10 Ellipsen, Ohren+4 Pfoten,
  Augen-Gruppe `spk-capy-eyes`, Mund `spk-capy-mouth`), **lebendig** — atmet + ruft
  `window.spkCapyAlive` falls vorhanden (golden­e Regel: Spikiu in seiner Rolle lebendig).
  Titel „Weiter, wo du warst?“, Zeile „Dein Text ist noch da. Sollen wir weitermachen?“,
  `wo`-Zeile (Raum · Stelle) + relative Zeit aus `ts` („vor X Minuten“), zwei Knöpfe
  Weiter (`beimWeiter()`) / Von vorn (`beimNeu()`). i18n de/es/en (Muttersprache aus dem Profil
  wie die Räume es lesen). `prefers-reduced-motion` ruhig. Eigener CSS-Namensraum `spk-sitz-*`,
  einmalig injiziert, idempotent. Kanonischen Capy 1:1 aus taller.html kopieren, nie neu erfinden.
- Entprellen macht der RAUM bei jeder Änderung (kleiner setTimeout, ~350 ms), nicht der Helfer.

### (2) `taller.html` anschließen
- Zustand sichern bei jeder Änderung (MC-Klick, Reihenfolge-Zug, Selbst-sagen-Tippen entprellt,
  Selbst-sagen-Hinlegen): **das ganze geladene `taller`-JSON** (texto/aufgaben/schluss/rahmen/bruecke)
  + Fortschritt je Aufgabe (welche MC gewählt+richtig, orden-Reihenfolge+gelöst, frei-Entwurf+
  beantwortet+Antworttext) + `touched`/`total`.
- Beim Eintritt: `lade('taller')`. Nur bei WIRKLICH angefangener, UNFERTIGER Sitzung
  → `frageWiederkommen`. „Weiter“ stellt denselben Text + Fortschritt wieder her **ohne neuen
  API-Call** (renderTaller aus dem gespeicherten Objekt, dann Fortschritt re-applizieren).
  „Von vorn“ → `raeume('taller')` + normales `loadTaller()`.
- `raeume('taller')` bei: „Noch ein Text“ (vor dem neuen Laden), „Genug für heute“, und sobald
  alle Aufgaben fertig sind (Schluss erreicht).

### (3) `schreibwerkstatt.html` anschließen
- Zustand sichern bei „Hinlegen“ + beim Tippen (entprellt): `verlauf`, `currentText`, `lastRaw`,
  `step`, Entwurf (`ta.value`), letzter Lektor-Zug (zum Wieder-Anzeigen).
- Beim Eintritt: `lade('schreibwerkstatt')`. Nur bei angefangener, unfertiger Sitzung
  → `frageWiederkommen`. „Weiter“ stellt `verlauf` + Textfeld + letzten Lektor-Block wieder her.
  „Von vorn“ → `raeume` + frischer Start (wie `restart`).
- `raeume('schreibwerkstatt')` bei: Neustart-Knopf und bei Ziellinie (`status==='ziellinie'`).

### (4) `CLAUDE.md` — stehende Architektur-Regel ergänzen
Kurzer Abschnitt (z. B. unter STACK-WAHRHEITEN), sinngemäß:
> SITZUNGS-PERSISTENZ (Pflicht für jeden Raum): Keine Arbeit darf durch einen Fehl-Tipp verloren
> gehen. Jeder Raum sichert seinen Zustand laufend über `sitzung.js`
> (`window.spikiuSitzung`, Schlüssel `spikiu_sitzung:<raum>`) und bietet beim Eintritt bei
> unfertiger Sitzung die Wiederkommen-Karte an (Spikiu lebendig, kein Streak). Abschluss räumt den
> Schlüssel. nav.js bleibt unangetastet; reines Wiederherstellen ist das Sicherheitsnetz, kein
> Warn-Popup. localStorage jetzt, Supabase = Phase 2.

### (5) Ledger-Bau-Eintrag (am Ende, wie immer)

---

## NICHT ANFASSEN
`nav.js`, `api/*`, `spikiu-seele.md`, `audio.js`, `capy-vivo.js` (nur aufrufen), die anderen Räume
(`chat.html`/Reel, `gym.html`, `proverbios.html`, `lektionen.html`, Reader/Lesebegleiter — die
bekommen die Persistenz in SPÄTEREN, eigenen Paketen). Keine Gamification, keine erfundenen Daten.

## ABNAHME (headless + Leo am Gerät)
- Arbeit in taller (MC + halber Selbst-sagen-Satz) → „weg“ (Reload) → Wiederkommen-Karte mit
  lebendigem Capy → „Weiter“ landet exakt an der Stelle, **derselbe** Text, kein neuer API-Call.
- Gleiches in der Schreibwerkstatt (Entwurf + Lektor-Zug bleiben).
- „Von vorn“ / Abschluss / „Genug für heute“ → Schlüssel weg, kein Zombie-Resume.
- Fertige oder leere Sitzung → KEINE Karte. `node --check` grün. nav.js unverändert.

## DANACH (nicht in diesem Paket)
- Gleiche Persistenz in Gespräch-Reel (`chat.html`) + Gym — eigene Pakete (Reel ist dick).
- Zwei Knopf-Bugs (taller „Weiter“ nach Selbst-sagen · schreibwerkstatt „offene Maske“) —
  gewünschtes Verhalten erst mit Leo pinnen, dann gezielter Fix.
