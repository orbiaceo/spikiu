# AKTUELLER AUFTRAG — PASTELL MINZE + NAVIGATION „MEIN KURS · RÄUME · REGAL · MEIN“ (Produktion)

**ERLEDIGT am 22.11.2026 (Claude direkt im Repo) · kein offener Auftrag.** Offen bleiben nur die Punkte unter „Nicht in diesem Auftrag“. Details im Ledger.

Stand: 22.11.2026 · Entschieden: Leo, 09:11 („1! Perfekt gelöst!“) · Vorlage: `prototyp-kurs-unten4.html` (auf dev)

## Ziel
Die Startseite und die Räume bekommen das Pastell-Minze-Aussehen und die Leiste aus Verteilung 1: vier Knöpfe unten — **Mein Kurs · Räume · Regal · Mein**.

## Umfang
1. **haus.html:** Pastell-Minze-Gestaltung wie im Prototyp (Farben, Nunito, weiche Schatten). Die Leiste unten ersetzt „Alle Zimmer“.
   - **Mein Kurs** = das Inhaltsblatt der Lektionen wie im Prototyp (eine Spalte) samt Lektionsseite (8 Kapitel); der Anhang „Alle Zimmer“ geht in den Räumen auf.
   - **Räume** = vier Kategorien (Wörter & Klang · Lesen · Sprechen & Schreiben · Spielen) mit den Räumen aus dem Prototyp, verlinkt auf die echten Seiten.
   - **Regal** = Mein Wortschatz zuerst, dann Lektionen, Gespräche, Lesen, Garten, Akrosticha.
   - **Mein** = bisheriges mein.html.
2. **„Mein Kurs“ jederzeit erreichbar:** In jedem Raum (gefuehrt, szene, learnroman, gym, spiele, taller, schreibwerkstatt, regional, Gramática) ein Knopf, der zurück in den Kurs führt, auch mitten im Spiel. `nav.js` bleibt unangetastet; Sitzungs-Persistenz bleibt gültig.
3. **Texte in de/es/en/el:** Mein Kurs / Tu curso / Your course / Το μάθημά μου · Räume / Espacios / Rooms / Χώροι · Regal / Estante / Shelf / Ράφι · Mein / Perfil / Profile / Προφίλ (bestehende Beschriftung).

## Abnahme
- Auf 390×844 sehen haus und Leiste aus wie `prototyp-kurs-unten4.html`.
- Aus jedem Raum führt ein Tipp in den Kurs zurück.
- 0 JS-Fehler headless; Node-Syntaxcheck auf alle angefassten Skripte.
- Ledger nachgetragen, Commit + Push auf dev.

## Nicht in diesem Auftrag
Szene-Feedback deterministisch · Lernroman/Szene je Thema · Konversation (vorletzte Karte nur Dialogende, letzte „Deine Sätze“, Zurückwischen) — eigene Aufträge.
