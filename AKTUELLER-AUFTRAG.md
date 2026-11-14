# AKTUELLER AUFTRAG — GEFÜHRT ODER FREI (neue Startseite)

**ERLEDIGT am 14.11.2026 (von Claude direkt im Repo gebaut) · kein offener Auftrag.** Offen bleiben nur die zwei Punkte unter „Nicht in diesem Auftrag“. Details im Ledger.

Stand: 14.11.2026 · Erteilt von claude.ai (Leo, 02:54: „Genehmigt. Schreibe den Auftrag und lass ihn sofort umsetzen.") · Umsetzung: Claude direkt im Repo

**Vorlage für Aussehen und Verhalten:** `prototyp-zwei-modi.html` (Root, dev). Begründung und Varianten: `prototyp-heute.html`, `prototyp-drei-wege.html`, Ledger 14.11.

---

## Warum

Leo, 13.11.: „Die scheinbare Einfachheit verschwindet, sobald man einen Raum betritt. Es wirkt zu viel.“
Die Startseite bot etwa 11 gleichrangige Entscheidungen. Hinter jeder Kachel kam wieder ein Menü, und manches stand doppelt da.
Entschieden (Leo, 02:47): **Modell 2 „Neugierig“** als Grundordnung, **Zeitangaben** aus Modell 3, dazu ein **geführter Modus** aus Modell 1, frei wählbar.

## Was gebaut wird

### A. `fuehrung.js` (NEU, Root) — der Reiseleiter
- `modus()` → `'gefuehrt' | 'frei' | null` aus `spikiu_user.profile.modus`; `setzeModus(m)`.
- `heute()` → was Spikiu heute vorschlägt, nur aus vorhandenen Daten (`SpikiuPfad.palette()`, Status, `beruehrt`):
  - `wiedersehen`: eine Station ist durchschritten (vor heute), aber noch nicht gesetzt → Karten (`gym.html`)
  - `ruhe`: heute schon eine Station berührt → „Bis morgen“, mit „Trotzdem weiter“
  - `neu`: nächste offene Station → `gefuehrt.html?thema=…`
  - `stufe`: alle Stationen der Stufe sitzen → nächste Stufe anbieten
- Nichts wird verschlossen. Harte Schleifen bleiben iuspik.

### B. `haus.html` — eine Startseite statt zwei Türen
- Die Türen Übung und Bibliothek entfallen. Alte Ziele (`?tuer=uebung|bibliothek`, `spk_haus_tuer`) landen auf der Startseite. Regal bleibt (Leiste unten), mit Zurück zur Startseite.
- **Erster Besuch ohne Modus:** Spikiu fragt „Führ mich“ / „Ich schau mich selbst um“, mit dem Hinweis „jederzeit in Mein änderbar“.
- **Geführt:** Spikiu-Satz, Karte nächste Station + „Weiter“ + Pfad der Stufe (✓ / Wiedersehen / jetzt / später). Eine andere Station antippen → „Ich empfehle erst X. Trotzdem?“. Darunter der Link „Heute lieber selbst wählen“.
- **Frei:** Karte „Heute mit Spikiu“ (derselbe Vorschlag), darunter „Oder selbst wählen“ mit vier Türen: Eintauchen · Ausprobieren · Ergründen · Spielen. Jede Tür zeigt höchstens 4 Wege mit einer Zeile Erklärung und „≈ N Min.“. Spielen geht direkt nach `spiele.html`.
- Alle Texte in de / es / en / el. Laptop-Tasten 1–9 bleiben nutzbar.

### C. `mein.html` — Umschalter „Wie lernst du?“ (Geführt / Frei)

### D. Rückwege
`gym.html` und `spiele.html` verstehen `zurueck=haus`, damit Wege aus dem Haus auch ins Haus zurückführen.

## Abnahme
- Neuer Nutzer sieht die Frage. Nach der Wahl erscheint die passende Startseite, Umschalten in Mein wirkt sofort.
- Geführt: „Weiter“ öffnet das Geführte Gespräch der vorgeschlagenen Station. Nach dem Abschluss zeigt die Startseite „Bis morgen“.
- Frei: vier Türen, keine zeigt mehr als 4 Wege, jede mit Zeitangabe.
- Ohne Lernpfad-Daten (Zielsprache ohne Stationen) fällt die Startseite still auf die vier Türen zurück, ohne Fehler.
- Handy unverändert gut. Keine JS-Fehler (headless geprüft). `node --check` grün.

## Nicht in diesem Auftrag (FRAGE AN DESIGN)
- Stufen-Chips in den Räumen (Samen/Stamm …) bleiben vorerst stehen.
- `wortschatz.html` ist aus dem Haus nicht mehr verlinkt (Wege liegen jetzt in den Türen), bleibt aber erreichbar.
