# AUFTRAG — „Gespräch-Reel (Phase 2): Freier Flur als Reel"

Stand: 23.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Referenz: prototyp-final-spikiu-frei.html (Reel-Teil) · von Leo abgenommen

> Phase 2 = den Reel-Mechanismus an der EINFACHSTEN Stelle aufbauen: dem **freien Flur**
> („Einfach plaudern"). Der freie Chat hat KEIN Rail, KEINE Häppchen, KEINE Antwort-Paletten —
> nur Spikiu ↔ Lerner. Perfekt, um die Reel-Schienen (Slide + Wisch + 🔊) sicher zu legen.
> Das geführte Thema (Rail/Häppchen/Tinder-Karten/Lektion) bleibt VORERST wie heute (Blasen)
> und wird in Phase 3 auf dieselben Schienen gehoben. MOTOR bleibt unberührt.

## NUR DER FREIE FLUR (gefuehrt = false)
Wenn `gefuehrt === false` (nach `goFree()` / „Einfach plaudern"), rendert das Gespräch als
**Reel** statt als Scroll-Blasen:

1. **Spikiu-Slide:** Spikius Antwort wird wie heute an `---` in Segmente geteilt (EIN Gedanke
   pro Slide). Je Segment ein **Vollbild-Slide**: kleiner **vollständiger Capy** (Charakter,
   ~52px, optional belebt via `spkCapyAlive`) oben + große **Lora-Zeile (Zielsprache)** mittig
   + **🔊** (bestehender `speakText`/Spinner-Logik) + die `[[…]]`-Übersetzung als gedämpfte Zeile
   darunter (kein Audio) + Hinweis „↑ nach oben wischen". Optik aus prototyp-final-spikiu-frei.html.
2. **Daumen:** Wisch nach oben → nächstes Segment / nächster Slide. Zurückwischen = frühere
   Slides ansehen. (Freier Flur = KEIN Fortschrittsbalken.)
3. **Lerner-Slide (du bist dran):** ein Slide mit **Textfeld** („Schreib etwas…") → Senden ruft
   den BESTEHENDEN `sendUserTurn(text)` (identischer Motorpfad). Danach erscheinen Spikius neue
   Slides. (Im freien Flur keine Antwort-Karten — nur Text; Karten kommen mit den Themen in Phase 3.)
4. **Beenden:** der „Gespräch beenden"-Weg (`freeExitBar`) bleibt erreichbar (z. B. als Knopf am
   Lerner-Slide oder dezent oben) → die bestehende Lektions-Angebot-Logik UNVERÄNDERT.

## MOTOR — NICHT ANFASSEN
- `sendUserTurn()`, `sendMessage()`, der Fetch-Loop, `/api/gespraech`, `extractOptionen`,
  die `[[…]]`-Logik (`addMessage`-Parsing/`fmt`), `speakText`/`warmVoice`/🔊-Handler,
  die Lektions-Angebot-Logik, `spikiu_user`/Profil, Voz/Opener (Phase 1).
- **Das geführte Thema (`gefuehrt === true`) bleibt 100% wie heute** (Blasen, Rail, Häppchen,
  Antwort-Paletten) — NICHT auf Reel umstellen (= Phase 3).
- `capy-vivo.js` nur aufrufen. Nav bleibt neutral; im Reel KEIN Capy-Klon (der kleine
  Slide-Capy ist der eine Charakter; auf Lerner-Slides kein Capy).

## ABNAHME
- [ ] „Einfach plaudern" → das Gespräch läuft als REEL: Spikius Antworten als Vollbild-Slides
      (Capy + große Zielsprachen-Zeile + 🔊 + Übersetzung), eine Sache pro Screen.
- [ ] Wisch nach oben blättert weiter; zurück geht auch. 🔊 spielt (Piper/Fallback) je Slide.
- [ ] Lerner-Slide mit Textfeld → Senden → `sendUserTurn` feuert → Spikius nächste Slides kommen.
      Echtes /api/gespraech, echte Antworten.
- [ ] „Gespräch beenden" erreichbar → Lektions-Angebot wie bisher.
- [ ] **Ein Thema wählen → läuft UNVERÄNDERT wie heute** (Blasen/Rail/Häppchen/Paletten) — nicht kaputt.
- [ ] Genau EIN Capy (kleiner Slide-Capy), vollständig; Nav neutral. Nur `chat.html` geändert;
      `node --check` grün; headless verifiziert (freier Flur = Reel; geführtes Thema = wie gehabt).

## DANACH
- **Phase 3 — geführtes Thema als Reel:** Rail = Fortschrittsbalken; Häppchen (Wörter/Hören) als
  Slides; **Antwort-Paletten → Tinder-Karten** auf dem Lerner-Slide; Korrektur-Slide; End-Slide
  „Lektion daraus?". Nutzt die in Phase 2 gelegten Reel-Schienen.
- Danach: Raum „Proverbios" · Lektions-Hintergrund-Bug.
