# AUFTRAG — „Gespräch-Reel (Phase 1): Charakter-Opener + Aktivitätswahl"

Stand: 23.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Referenz: prototyp-final-spikiu-frei.html (Begrüßungs-Screen) · von Leo abgenommen

> Der Gespräch-Reel ist der größte Umbau im Projekt. Wir machen ihn in SICHEREN PHASEN, damit
> das funktionierende Gespräch (chat.html, 1376 Z., echte API + Häppchen + Audio + Lektion) NIE
> bricht. **PHASE 1 = nur der EINTRITT** (Opener + Aktivitätswahl) als immersiver Charakter-Screen.
> Der MOTOR bleibt zu 100% unberührt — Aktivität wählen feuert weiter `goFree()`/`pickTopic()`,
> das Gespräch danach läuft vorerst wie heute. Der Austausch-als-Reel ist PHASE 2.

## WAS HEUTE SCHON DA IST (frisch geprüft, wird WIEDERVERWENDET)
- `startOpener()` (Z.1357) → `setOpenerChrome(true)` + `renderOpenerGreeting()` + `showGabelung()`.
- `renderOpenerGreeting()` (Z.1292): `.voz-greet#vozGreet` mit `CAPY_OPENER` (Voz-Capy) +
  `.voz-greet-line` (Gruß, Zielsprache) + `.voz-hint` („tippen, um Spikiu zu hören"). Voz primero
  (Paket 5) lebt hier: Tipp → spricht, `spkCapyAlive` belebt den Capy (Mund/Aura).
- `showGabelung()` (Z.937): „Wähle eine Aktivität" + „Einfach plaudern" + Themen-Chips +
  „Etwas anderes…". Handler: `goFree()` (962, freier Flur) / `pickTopic(label)` (966, geführtes Thema).

## PHASE 1 — was gebaut wird (nur Präsentation, in chat.html)
Den Opener-Block (`#vozGreet` + Gabelung) zu EINEM immersiven Charakter-Eintritt machen, Optik
nach `prototyp-final-spikiu-frei.html`:
1. **Spikiu als Charakter, groß + mittig + lebendig:** der Voz-Capy (`CAPY_OPENER`) etwas größer
   (~88–92px), zentriert oben, atmet/blinzelt via `spkCapyAlive` (schon gebunden). VOLLSTÄNDIG,
   nie trasquilado. Tipp-zum-Hören (Voz) BLEIBT unverändert.
2. **Gruß + Frage zentriert:** die Gruß-Zeile (Zielsprache, aus `VOZ_GREET`) + eine einladende
   Frage „¿Qué te apetece? / Was möchtest du?" + „¡Tú eliges! …" — in der Optik des Prototyps
   (Lora, zentriert). `VOZ_HINT` (Muttersprache) bleibt als Hörhinweis.
3. **Aktivitätswahl als Karten (zentriert):** „💬 Einfach plaudern" als großer Button +
   Themen als Karten/Chips (Hotel/Café/Taxi/Restaurant/… + „Etwas anderes…"), Stil aus dem
   Prototyp. Texte/i18n aus `showGabelung` (`chooseActivity`/`free`/`orTopic`/`other`)
   WIEDERVERWENDEN. Klicks rufen WEITERHIN `goFree()` / `pickTopic()` (Motor unverändert).

## MOTOR — NICHT ANFASSEN (heilig, funktioniert)
- `goFree()`, `pickTopic()`, `startSeedTurn()`, `sendMessage()`, `/api/gespraech`, der ganze
  Gesprächs-Loop + Blasen-Rendering (= Phase 2), der Fortschrittsbalken/Rail, die Häppchen-Widgets,
  die Antwort-Paletten, `speakText`/`warmVoice`/🔊, die Lektions-Logik, `spikiu_user`/Profil.
- Voz-Gesten-Regel (kein Auto-Play) bleibt. `capy-vivo.js` nur aufrufen (nicht ändern).
- Die Navigation bleibt neutral (Teil 40); KEIN zweiter Capy — der Opener-Capy ist der eine Charakter.

## ABNAHME
- [ ] Beim Betreten des Gesprächs: großer, mittiger, ATMENDER Spikiu begrüßt + „¿Qué te apetece?"
      + Aktivitäts-Karten (Einfach plaudern + Themen) im Prototyp-Look.
- [ ] Tipp auf Spikiu → Voz spricht den Gruß (unverändert, kein Auto-Play).
- [ ] „Einfach plaudern" → freier Flur wie bisher; ein Thema wählen → geführtes Thema wie bisher
      (Rail/Häppchen/Antwort-Paletten/Audio/Lektion alle unverändert funktionsfähig).
- [ ] Genau EIN Capy (der Opener-Charakter); vollständig. Nav neutral, kein Klon.
- [ ] Nur `chat.html` geändert (Präsentation des Openers/Gabelung); Motor unberührt;
      `node --check` grün; headless verifiziert (Opener rendert, Voz spielt auf Geste, goFree +
      pickTopic feuern, Gespräch läuft).

## DANACH (Phasen)
- **Phase 2 — Austausch als Reel:** den Gesprächs-Loop von Scroll-Blasen auf Vollbild-SLIDES
  umstellen (eine Sache pro Screen, Wisch nach oben; Spikiu-Slide = große Zeile + 🔊 + Übersetzung;
  Antwort-Paletten → Tinder-Karten; Fortschrittsbalken = der Rail). Großes eigenes Paket.
- **Phase 3 — geführte Schritte als Slides** (Häppchen Wörter/Hören) + End-Slide „Lektion daraus?".
- Danach: Raum „Proverbios" · Lektions-Hintergrund-Bug.
