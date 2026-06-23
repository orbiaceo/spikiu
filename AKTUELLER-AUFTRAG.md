# AUFTRAG — „Reel-Mechanik: vertikal → HORIZONTAL (Buchseiten / Tinder)"

Stand: 23.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Referenz: prototyp-reel-horizontal.html (von Leo abgenommen)

> PROBLEM (Leo am Gerät): das Reel scrollt VERTIKAL (`scroll-snap-type:y`) → es bildet sich ein
> „Riesen-Chorizo" von oben nach unten, der Nutzer verliert sich, die Oberfläche springt.
> NEU = **HORIZONTALES Karten-Deck wie Buchseiten / Tinder: EINE Karte pro Screen.** Der Daumen
> wischt nach LINKS. Spikiu fragt → ← wischen → Antwort-Karte → wählen → Karte läuft links weg →
> Spikiu kommt mit der nächsten. **Prinzip: eine Information & Interaktion pro Karte.**
> Das betrifft den GANZEN Reel-Layer = freier Flur (Phase 2) UND geführtes Sprechen (Phase 3a).
> Reine MECHANIK-Umstellung; der MOTOR bleibt unberührt.

## WAS HEUTE DA IST (wird umgebaut, nicht ersetzt)
- `.reel` (Z.226) = `overflow-y:auto; scroll-snap-type:y mandatory` (VERTIKAL — das wird ersetzt).
- `.reel-slide` (228) = `min-height:100%` gestapelt. `.reel-capy/-line/-speak/-trans/-hint` (229-237).
- `.reel-hint` (237) = „↑ nach oben wischen". `.reel-learner-field`+`.reel-send`+`.reel-end` (241-246).
- `.reel-cards`/`.reel-card` (251-252) = Tinder-Antwortkarten (Phase 3a).
- JS: `enterReel/exitReel`, `addReelMessage()`, Lerner-Slide `#reelLearner`+`reelSend`,
  `scrollReelToEnd`, `reelTypingOn/Off`, `renderOptionen`→Reel-Karten.

## WAS GEBAUT WIRD (nur chat.html, nur die Reel-MECHANIK)
1. **`.reel` von vertikalem Scroll-Snap auf HORIZONTALES Ein-Karten-Deck umstellen:** kein
   `scroll-snap-type:y`, kein vertikales Scrollen, KEIN Stapel. Es ist IMMER nur EINE Karte
   sichtbar (die anderen sind nicht im Sichtfeld). Optik/Animation aus prototyp-reel-horizontal.html.
2. **Vorrücken = Karte läuft nach LINKS raus, nächste kommt von RECHTS:** beim Weiter die aktuelle
   Karte `translateX(-114%)`+fade, die neue von `translateX(114%)`→0 (sanfte Transition, leichter
   Tinder-Dreh erlaubt). Genau EINE Karte pro Screen.
3. **Spikiu-Karte:** Capy + große Zielsprachen-Zeile + 🔊 + `[[…]]`-Übersetzung + Hinweis
   **„← nach links wischen"** (statt „↑ nach oben"). Wisch nach LINKS (Touch deltaX < ~−45) ODER
   Tipp → nächste Karte. (`reel-hint`-Text + Pfeil entsprechend ändern.)
4. **Lerner-Karte:**
   - Geführt: die Tinder-Karten (`.reel-cards`/`.reel-card`) auf der Lerner-Karte. Tipp auf eine
     → bestehender `sendUserTurn(option)` → Karte läuft nach links → Spikius nächste Karte.
   - Frei: das Textfeld (`.reel-learner-field`) + Senden → `sendUserTurn` → links weg → nächste.
   - Während des Backend-Aufrufs eine kurze „Spikiu denkt…"-Karte (aus `reelTypingOn`), dann
     Spikius Antwort-Karte.
5. **Wischen nach links nur auf Spikiu-/End-Karten;** auf der Lerner-Karte wird per Tipp gewählt
   (bzw. getippt/gesendet) — danach automatisch weiter. Optional (wenn einfach): nach RECHTS
   wischen = vorige Karte ansehen (nur lesen, kein Re-Senden). Wenn fummelig → weglassen.

## MOTOR — NICHT ANFASSEN
- `addReelMessage`-PARSING (Ziel/`[[…]]`-Trennung), `sendUserTurn`, `turn`/Fetch, `/api/gespraech`,
  `extractOptionen`, `renderOptionen`-DATEN, `speakText`/🔊, Lektions-Logik, `setStage`/Rail,
  Häppchen-Prep, Profil/Voz, der immersive Charakter-Opener (Phase 1).
- Es ändert sich NUR, WIE die Slides angeordnet/gewechselt werden (vertikal→horizontal), nicht WAS
  sie enthalten. `capy-vivo.js` nur Aufruf; Nav neutral, kein Klon; Capy nie trasquilado.

## ABNAHME
- [ ] Im Reel (freier Flur UND geführtes Sprechen) ist IMMER nur EINE Karte sichtbar — kein
      vertikaler „Chorizo", kein Scrollen.
- [ ] Spikiu-Karte: ← nach links wischen (oder Tipp) → nächste Karte (Karte fliegt links raus,
      neue kommt von rechts). Hinweis liest „← nach links wischen".
- [ ] Lerner-Karte: Tinder-Karten (geführt) bzw. Textfeld (frei) → Wahl/Senden → Karte läuft links
      weg → Spikius nächste Karte. Echtes /api/gespraech, echte Antworten, 🔊 spielt.
- [ ] Rail-Fortschritt, Korrektur, Lektions-Angebot, Häppchen-Prep alle unverändert funktionsfähig.
- [ ] Nur `chat.html`; `node --check` grün; headless verifiziert (freier Flur = horizontales Deck;
      geführtes Sprechen = horizontales Deck mit Karten; kein vertikales Stapeln mehr).

## DANACH
- Phase 3b: Häppchen (Wörter/Hören) als Karten im selben horizontalen Deck + End-Karte „Lektion daraus?".
- Danach: Raum „Proverbios" · Lektions-Hintergrund-Bug.
