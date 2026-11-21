# AKTUELLER AUFTRAG — INHALTSVERZEICHNIS + GARTEN/AKROSTICHON (Produktion)

**ERLEDIGT am 22.11.2026 (Claude direkt im Repo) · kein offener Auftrag.** Offen bleiben nur die Punkte unter „Nicht in diesem Auftrag“. Details im Ledger.

Stand: 22.11.2026 · Erteilt: Leo, 00:44 („Führe den Auftrag aus! Ins Repo damit!“) · Umsetzung: Claude direkt im Repo

Vorlagen: `prototyp-inhalt-spikiu.html` (Inhalt, Regal, Anhang) · `prototyp-garten.html` · `prototyp-akrostichon.html` (jeweils mit größerer Schrift vom 22.11. 00:41). Entscheidungen: Ledger 21./22.11.

## Teil A — Garten + Akrostichon (`juegos.js`, nur Darstellung)
- Spielregeln, Wortfelder, Speicher, Hilfe-Logik bleiben. Nur die Darstellung ändert sich.
- Themen: keine Wischleiste mehr. Ein Schild „Thema · wechseln“ klappt ein 3-spaltiges Kachelraster auf (Emoji groß, Name). Im Garten ist es offen, solange der Garten noch leer ist.
- Garten: alle Beete als 6er-Raster auf einem Bildschirm. Die Farbe zeigt, wie das Wort ins Beet kam (kenne ich / dein Wort / von Spikiu gesät), die Pflanze wächst 🌱🌿🌳. Beet antippen → Blatt von unten (Wörter, Eingabe, Spikiu sät, Fertig). Kurzer Spikiu-Satz.
- Akrostichon: Wörter als Buchstaben-Kacheln (2 Spalten, farbig). Beim Schreiben eine Karte pro Buchstabe, die aktive Zeile ist hervorgehoben, und es gibt EINEN Hilfeknopf unten („Spikiu, hilf mir bei G“). Die Ergebniskarte bleibt.
- Alle neuen Texte in de / es / en / el. Schriftgröße wie im Prototyp.

## Teil B — Inhaltsverzeichnis im Haus (`haus.html`, `gefuehrt.html`)
- Die Startseite ist das Inhaltsverzeichnis: Lektionen = Lernstationen der aktuellen Stufe aus `SpikiuPfad.palette()`, in zwei Spalten (erste Hälfte links). ✓ = gesetzt, senfgelb = nächste (`naechste()`). Darunter der Ausblick auf die nächste Stufe und der Anhang „Alle Zimmer“ A1–A6 mit eigenen Kachel-Seiten.
- Die Lektionsseite hat 8 Kapitel als farbige Kacheln N.1–N.8 und führt in die bestehenden Räume: Wörter / Hören / Geführtes Gespräch → `gefuehrt.html?thema=…&phase=…` (neu: `phase`-Parameter) · Selbst sprechen → `szene.html` · Aussprache → Der Schlag · Grammatik → Gramática (nur es+de, sonst „kommt“) · Lesen → `learnroman.html` · Spiel → `spiele.html`. Ein ✓ heißt: dieses Kapitel wurde schon betreten. Spikiu führt Buch, nichts wird verschlossen.
- Mein Regal: „Meine Schatzkiste“ heißt jetzt **„Mein Wortschatz“** und steht an erster Stelle.
- Die Frage nach dem Modus (geführt/frei) und der Umschalter in Mein entfallen, weil das Inhaltsverzeichnis selbst führt.
- Texte in de / es / en / el.

## Nicht in diesem Auftrag (FRAGE AN DESIGN)
- Die Szene-Rückmeldung deterministisch statt KI (entschieden 21.11.) ist ein eigener Auftrag.
- Lernroman und Szene öffnen noch nicht direkt beim Kapitel der Lektion (kein `thema`-Parameter).
- Konversation: Aufbau der letzten zwei Karten und Zurückwischen bei Lernkarten sind ein eigener kleiner Auftrag.
