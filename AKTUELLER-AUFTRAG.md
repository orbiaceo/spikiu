# AUFTRAG — Learnroman (Bibliothek): drei Etappen-Geschichten mit Immersion

Status: **NEU · Design abgenommen** (claude.ai, 05.08.2026).
Referenz-Prototyp: `spikiu-learnroman-demo.html` (liegt im Repo).

Hinweis fürs Bau-Fenster: Der eigentliche **Geschichts-TEXT** wird von Leo in einem
eigenen Chat geschrieben und später als statische Daten eingespeist. Dieser Auftrag
fixiert **Struktur, Lese-UX, Freischaltung, Typografie und das pädagogische Leitbild**.

---

## Was der Learnroman ist
Ein **statischer** Leseraum in der Bibliothek (neben „Mein Buch"). Fester Inhalt →
**KEIN API-Call, 0 Tokens** (bake-once-Prinzip). **DREI in sich ABGESCHLOSSENE
Geschichten**, je eine pro Etappe — jede mit eigenem Titel und eigenem Bogen:
- **Fundament** (Anfang)
- **Aufbau** (Mittel)
- **Anwendung** (Fortgeschritten)

Kapitel schalten sich nach dem Können-Level des Lerners frei.

> Der Prototyp zeigt zur Vereinfachung EINEN Platzhaltertitel „Lukas in Madrid" mit
> Kapiteln über alle Etappen. **Real = drei eigenständige Geschichten**, eine je Etappe.

---

## Pädagogisches Leitbild (bindend — von Leo)
Der Learnroman führt in **Kultur UND Sprache** ein und zieht Wortschatz + Syntax
**nach und nach** herein. Er ist:
- **KEINE Unterhaltung** (kein Entertainment als Selbstzweck),
- **KEIN langweiliger Phrasebook**,
- **KEINE Unterhaltung/Erzählung in der Muttersprache**.

Ziel: **Immersion von Anfang an.** Die Muttersprache ist nur die schrumpfende Brücke,
nie das Erlebnis.

---

## Die Etappen-Brücke (die Schrift-Brücke schrumpft)
- **Fundament:** deutsche Erzählung führt; einfache spanische Sätze abgesetzt + 🔊 +
  Übersetzung. Kurze Sätze.
- **Aufbau:** überwiegend Spanisch (ganze Absätze); Deutsch weicht zurück, Brücke nur
  wo nötig.
- **Anwendung:** fließende spanische Prosa mit Nebensätzen; **kein Deutsch mehr**.

(= Seele-konform: Muttersprach-Brücke am Samen stark, verschwindet zur Krone.)

---

## Content-Vertrag (die drei Geschichten)
- DREI eigenständige Erzählungen, je EIGENER Titel + eigener Bogen.
- **Sprache = FELD, nicht Datei-Schnitt.** Format muss de/es/en/**el** tragen
  (Griechisch von Anfang an, target-only).
- Datenstruktur je Kapitel = **getypte Blöcke** (siehe Prototyp `CH` / `blockHTML`):
  - `de` — deutsche Erzähl-Zeile
  - `es` + `tr` — spanischer Satz + Brücke + 🔊
  - `p` — fließender Zielsprach-Absatz + 🔊 (Anwendung)
- Jede Geschichte kennt ihre Etappe (`level: fundament|aufbau|anwendung`) und ihre
  Kapitel-Reihenfolge.

---

## Lese-UX (aus dem Prototyp übernehmen)
- Bibliothek → Learnroman → **Kapitelliste, gruppiert nach Etappe**.
- **Freischaltung nach `profile.koennen`** (anfang→Fundament, mittel→Aufbau,
  fortgeschritten→Anwendung; sichtbare Namen = Fundament/Aufbau/Anwendung).
  Eigene Etappe + darunter **OFFEN**; nächste **sanft geschlossen**:
  „✦ öffnet sich im <nächste>" — **KEIN strafendes Schloss, kein Grind-Zwang**.
- **`?dev=1`** schaltet alle Etappen frei (Dev-Schloss, zum Testen).
- **Lese-Overlay:** getypte Blöcke, **🔊 auf jeder spanischen Zeile / jedem Absatz** via
  `audio.js` (Piper, statisch, frei), „‹ zurück".
- **Typografie (abgenommen, WICHTIG):** Leseschrift **Lora**; warme Tinte `#2b2621` auf
  Papier `#f5f1e7`; großzügige Zeilenhöhe (Prosa ~1.78); ruhige Größen.
  **KEIN Cormorant im Fließtext.**
- **Anti-Gamification:** kein Score/Streak/Prozent.

---

## Wortjag (Abhängigkeit)
Jedes spanische Wort im Learnroman ist **jagbar** → wandert in „Mein Buch"
(universelles Prinzip, Prototyp `spikiu-wortjag-demo.html`). Wenn Wortjag als Feature
noch nicht gebaut ist: den Reader so vorbereiten, dass Wörter tappbar gemacht werden
können; sonst nachziehen, sobald Wortjag live ist.

---

## Abnahme (Leo am Gerät)
- Drei Etappen sichtbar; Kapitel schalten nach `koennen` frei; `?dev=1` zeigt alle.
- Fundament liest sich mit deutscher Brücke; Anwendung ist fließendes Spanisch **ohne
  Deutsch** → spürbarer Komplexitäts-Sprung.
- **Lora + warme Tinte**, angenehm fürs Auge; 🔊 spielt die Zielsprache.
- **0 Netzwerk-Call beim Lesen.**

---

## NICHT anfassen
Andere Räume (Gespräch/Übung/Schreib-/Lesewerkstatt/bestehende Reader-Kapitel),
`api/*`, `nav.js`-Wahrheit. **Seele** nur, falls Leo das Leitbild ausdrücklich als
Grundsatz ergänzen will — dann eigener Schritt.

## Ledger
Claude Code trägt Design-Entscheid + Bau-Bericht beim Bauen ins
`SPIKIU-BUILD-LEDGER.md` (Design-Kontext oben aus diesem Auftrag übernehmen).
