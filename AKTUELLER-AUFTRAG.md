# AUFTRAG — „Gespräch-Reel (Phase 3a): Sprechen-Roleplay als Reel + Tinder-Karten"

Stand: 23.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Referenz: prototyp-final-spikiu-frei.html (Tinder-Karten) · von Leo abgenommen

> Phase 2 hat die Reel-Schienen gebaut (`reelActive`, `enterReel()`/`exitReel()`,
> `addReelMessage()`, Lerner-Slide `#reelLearner`+`reelSend`, Routing wenn reelActive).
> PHASE 3a HEBT NUR DEN SPRECHEN-TEIL des geführten Themas auf DIESELBEN Schienen — der Teil,
> den Leo liebt: Spikiu-Slides + **Antwort-Paletten als Tinder-Karten**. Der Häppchen-Prep
> (Wörter/Hören) bleibt VORERST wie heute; der Reel startet erst bei „Sprechen". MOTOR unberührt.

## WAS HEUTE SCHON DA IST (wird WIEDERVERWENDET)
- Reel-Layer (Phase 2): `reelActive` (679), `enterReel()` (688)/`exitReel()` (696),
  `addReelMessage(role,text)` (766, Parsing unverändert), Lerner-Slide (`#reelLearner`, 741)
  + `reelSend()` (752) + `reelEnd()` (759), `scrollReelToEnd`, `reelTypingOn/Off`.
- Geführt: `.rail` + `setStage()` (Sprechen 599, Lektion 636), `renderOptionen(optionen)` (934)
  = die 2–3 Antwort-Chips (`.antwort-palette#antwortPalette`), `mismoTema()`/`otroTema()`,
  Korrektur `kk-better` (585), `extractOptionen`, `sendUserTurn`.

## PHASE 3a — was gebaut wird (nur chat.html, nur der geführte SPRECHEN-Teil)
1. **Reel im geführten Thema ab „Sprechen" aktivieren:** wenn `gefuehrt===true` die Stufe
   `sprechen` erreicht (`setStage('sprechen')`), `enterReel()` aufrufen (Reel sichtbar; der
   Häppchen-Prep davor bleibt wie heute in der Chat-Ansicht). Beim Verlassen
   (`otroTema()`/Terminar) `exitReel()`.
2. **Spikius Sprechen-Züge als Slides:** im Reel über das bestehende `addReelMessage()` rendern
   (Capy + große Zielsprachen-Zeile + 🔊 + `[[…]]`-Übersetzung + Wisch) — identisch zum freien Flur.
3. **Antwort-Paletten → TINDER-KARTEN auf dem Lerner-Slide:** wenn `reelActive` (geführt), die
   2–3 Optionen aus `renderOptionen` NICHT als untere `.antwort-palette`, sondern als große,
   tippbare **Karten** auf dem Lerner-Reel-Slide zeigen (Optik prototyp-final-spikiu-frei.html).
   Tipp auf eine Karte → bestehender `sendUserTurn(option)` (Motorpfad unverändert). Ein
   Textfeld bleibt sekundär verfügbar (wie heute „Chips primär, Textfeld sekundär").
4. **Rail = Fortschritt im Reel:** die bestehende `.rail` (Thema·Wörter·Hören·Sprechen·Lektion)
   im Reel oben sichtbar als Fortschrittsbalken (gleiche `setStage`-Zustände, nur Platzierung).
5. **Korrektur im Reel:** die `kk-better`-Korrektur („Besser" + 🔊) als dezentes Element auf dem
   Slide bzw. kurzer Korrektur-Slide zeigen, wenn reelActive (Inhalt/Logik unverändert).

## MOTOR — NICHT ANFASSEN
- `extractOptionen`, `sendUserTurn`, `turn`/Fetch-Loop, `/api/gespraech`, `setStage`, die
  Häppchen-DATEN-Erzeugung, `mismoTema`/`otroTema`, die Lektions-Logik, `speakText`/🔊, Profil/Voz.
- **Häppchen-Prep (Wörter/Hören) bleibt wie heute** (Widgets, vor dem Sprechen-Reel) = Phase 3b.
- **Freier Flur (Phase 2) bleibt unverändert.** `capy-vivo.js` nur Aufruf; Nav neutral, kein Klon.

## ABNAHME
- [ ] Thema wählen → Häppchen-Prep wie heute → bei „Sprechen" wechselt es ins REEL: Spikius
      Roleplay-Züge als Vollbild-Slides (Capy + Zielsprache + 🔊 + Übersetzung), Wisch nach oben.
- [ ] Die Antwort-Optionen erscheinen als **Tinder-Karten** auf dem Lerner-Slide; Tipp → sendet
      (echtes /api/gespraech). Textfeld sekundär nutzbar.
- [ ] Rail oben zeigt den Fortschritt (…Sprechen aktiv). Korrektur „Besser" erscheint im Reel.
- [ ] „Terminar"/Beenden → Lektions-Angebot wie bisher; `otroTema` verlässt das Reel sauber.
- [ ] **Freier Flur (Phase 2) unverändert**; Häppchen-Prep unverändert. Genau EIN Capy; Nav neutral.
- [ ] Nur `chat.html`; `node --check` grün; headless verifiziert (geführtes Sprechen = Reel mit
      Karten; freier Flur = Reel; Häppchen-Prep = wie gehabt; Lektion-Angebot da).

## DANACH
- **Phase 3b:** Häppchen (Wörter/Hören) als Slides + End-Slide „Lektion daraus?" (durchgehend
  ein-Sache-pro-Screen im geführten Thema).
- Danach: Raum „Proverbios" · Lektions-Hintergrund-Bug.
