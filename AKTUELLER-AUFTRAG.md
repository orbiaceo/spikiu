# AUFTRAG — Lektion-Angebot ans Gesprächsende + Audio im Lektion-Poster (Teil 32)

Stand: 21.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Baut auf „Roleplay-Feinschliff" (Teil 31, live auf dev)

> Zwei Wünsche von Leo, genehmigt im Prototyp `prototyp-lektion-angebot-audio.html`.
> **Der Generator `api/generate-lesson.js` und das Poster-SCHEMA bleiben UNANGETASTET.**
> Nur (1) das Lektion-Angebot wandert vom Dashboard ans Gesprächsende, und (2) 🔊 kommt
> in den Poster (Wortschatz + Dialog).
> **ZWEI Dateien: `chat.html` + `dashboard.html`.**

---

## 1 — Freies Gespräch bekommt einen „Beenden" · `chat.html`
**Befund:** Heute hat nur das geführte Rollenspiel eine Abschluss-Logik (`exitBar`/
`renderEndMenu`/`terminar`). Das freie Gespräch (`goFree`, `gefuehrt=false`) hat keinen
sichtbaren Abschluss — also keinen Ort, an dem das Lektion-Angebot erscheinen könnte.
- Eine **dezente, dauerhaft sichtbare „Gespräch beenden"-Option** auch im freien Gespräch.
  Sichtbar wenn `!gefuehrt` **und** der `verlauf` ≥ 2 Einträge hat (nicht beim leeren
  Opener / nicht an der Themen-Gabelung). Optik dezent (Muster wie die Ausstiegs-Leiste).
- Klick → ruft `offerLesson()` (§2). i18n DE/ES/EN:
  „Gespräch beenden" / „Terminar conversación" / „End conversation".

## 2 — Das Ja/Nein-Angebot · `chat.html`  (`offerLesson`)
**Befund:** Bisher schreibt `terminar()` (Z.558) den `verlauf` in `lastConversation` und
rendert einen Tür-Knopf → `dashboard.html#lektionen`; der Dashboard-Knopf erzeugt dann die
Lektion. Das wird zusammengezogen: die Entscheidung passiert jetzt am Gesprächsende.
- Neue Funktion `offerLesson()` rendert eine **Spikiu-Karte** (kein neues System — Stil wie
  eine Spikiu-Blase / `renderEndMenu`): Text „Möchtest du eine Lektion aus diesem Gespräch?"
  (i18n) + zwei Knöpfe **Ja / Nein** (i18n: „Ja, gern/Sí, claro/Yes, please" ·
  „Nein, danke/No, gracias/No, thanks").
- **Geführtes Rollenspiel:** `terminar()` wird auf `offerLesson()` umgestellt — der
  „Beenden"-Pfad (End-Menü-Knopf in `renderEndMenu` **und** der `exitBar`-Chip) führt jetzt
  zum Angebot statt zum Dashboard-Sprung. Den alten `lastConversation`-Schreib + Tür-Knopf
  in `terminar` entfernen (wird durch §3 ersetzt).
- **Freies Gespräch:** der neue Beenden-Knopf (§1) ruft `offerLesson()`.
- **Ja** → `makeLessonAndLeave()` (§3). **Nein** → warme Abschieds-Blase „Alles klar.
  Bis bald! 🐾" (i18n), Beenden-Affordances weg, Chat bleibt (Lerner kann weiterreden
  oder selbst gehen — NICHT auflösen).

## 3 — Lektion erzeugen + sanfte Auflösung · `chat.html`  (`makeLessonAndLeave`)
- Zeigt „Spikiu bastelt deine Lektion …" (i18n) mit Spinner (Muster des vorhandenen
  Generier-/`.speak-btn.loading`-Spinners).
- **POST an `/api/generate-lesson` (Mode B). Den Request NICHT neu erfinden:** exakt die
  bewährte Request-Form aus dashboard.htmls heutigem `generateLessonFromLastConvo` (Z.1082)
  übernehmen — gleicher Endpoint, gleiche Felder. `conversationHistory` = `verlauf` + die
  gesammelten Korrektur-Paare (genau so, wie `terminar` heute den `lastConversation`-Eintrag
  baut). Generator + Schema unverändert.
- Ergebnis-Lektion bekommt `id`, `createdAt: new Date().toISOString()` und
  `zielsprache: PROFILE.zielsprache` (Letzteres für 🔊 im Poster), dann in
  `spikiu_user.lessons` ablegen.
- **Rollendes 3er-Limit:** nach dem Anhängen `lessons` nach `createdAt` ABSTEIGEND behalten,
  max 3 (älteste fällt raus). Nie blockieren; Badge bleibt ≤ 3/3.
  (Default = rolling-3. Falls Leo lieber harten Block / „Regal voll"-Hinweis will → hier.)
- Dann Abschieds-Blase „Du findest sie im Dashboard unter Meine Lektionen. Bis bald! 🐾"
  (i18n) → Chat-Container **sanft auflösen** (CSS fade + leichtes blur, ~0,6 s) →
  `location.href = 'dashboard.html#lektionen'`. **Speichern MUSS vor der Navigation passieren.**
- **Fehlerfall** (POST scheitert): ehrliche kurze Blase „Das hat gerade nicht geklappt —
  versuch es gleich nochmal." (i18n), KEINE Navigation, Beenden bleibt erreichbar.

## 4 — Dashboard-Knöpfe raus + chronologisch · `dashboard.html`
- Die zwei Knöpfe `#lesson-from-convo-btn` (Z.322) und `#lesson-from-convo-btn-2` (Z.308)
  ENTFERNEN, samt Labels (`lesson-from-convo-label` / `-2`), Show/Hide-Logik in
  `renderLessonsList` (Z.1004–1042), Klick-Verdrahtung (Z.1065–1076) und der Funktion
  `generateLessonFromLastConvo` (Z.1082). Die `lastConversation`/`hasLastConvo`/`underLimit`-
  Knopf-Plumberei fällt damit weg (chat.html erzeugt jetzt direkt). `lessons-count`-Badge bleibt.
- In `renderLessonsList` die Lektionen vor dem Rendern nach `createdAt` **absteigend**
  sortieren (neueste zuerst). Alt-Lektionen ohne `createdAt` stabil ans Ende.

## 5 — 🔊 im Poster: Wortschatz + Dialog · `dashboard.html`
- `audio.js` einbinden wie in chat.html: `<script type="module">` importiert `audio.js` und
  reicht `window.spkSpeak` / `spkWarm` durch (Browser-Fallback-Muster wie chat.html). `nav.js`
  bleibt. (Dashboard bindet `audio.js` bisher NICHT ein — das ist neu.)
- In `renderLessonPoster(l)` (Z.820): **jedes Wortschatz-Wort** (Zielsprache) und **jede
  Dialog-Zeile** (Zielsprachen-Text) bekommt einen dezenten 🔊-Knopf (Stil/Muster wie
  chat.html `.speak-btn`). Klick → `window.spkSpeak(zieltext, ziel)`.
  **NUR auf der Zielsprache — NIE auf der Übersetzung, NIE auf Grammatik-Beispielen, NIE im
  Quiz.** (Leo: nur Teil 2 Wortschatz + Teil 3 Dialog.)
- Beim Öffnen einer Lektion (`openLesson`, Z.971) die Stimme still vorwärmen
  (`spkWarm(ziel)`), wie beim Raum-Eintritt im Chat.
- `ziel` = `l.zielsprache` bevorzugt, Fallback defensiv aus
  `spikiu_user.profile.zielsprache || langCode(targetLang) || 'es'` (Muster chat.html Z.288).

---

## ABNAHME
- [ ] Dashboard: KEIN „Lektion aus letztem Gespräch"-Knopf mehr; nichts hängt an
      `generateLessonFromLastConvo`.
- [ ] Freies Gespräch: dezenter „Gespräch beenden"-Knopf erscheint (ab ≥ 2 Verlauf-Einträgen),
      nicht beim leeren Opener.
- [ ] Geführtes Rollenspiel: „Beenden" (End-Menü + `exitBar`) → Ja/Nein-Angebot statt
      Dashboard-Sprung.
- [ ] **Ja** → „Spikiu bastelt …" → echte Lektion in `spikiu_user.lessons` (mit `createdAt`
      + `zielsprache`) → Abschieds-Blase → sanfte Auflösung → `dashboard.html#lektionen`.
- [ ] **Nein** → warmer Abschied, Chat bleibt.
- [ ] „Meine Lektionen" chronologisch, neueste zuerst; Badge ≤ 3/3 (rolling-3).
- [ ] Poster: 🔊 auf jedem Wortschatz-Wort + jeder Dialog-Zeile (nur Zielsprache), spricht
      über `audio.js`; NICHT auf Übersetzung / Grammatik / Quiz.
- [ ] `node --check` grün (beide Inline-Scripts in dashboard + chat); `api/generate-lesson.js`
      + Poster-SCHEMA unverändert; Häppchen / Rollenspiel / freier Flur / Antwort-Paletten /
      Ausstiegs-Leiste unberührt; keine vom Browser belegten Variablennamen
      (history/location/name/status/top/length/event); Emphasis nur `<em>`; 🔊 nur Zielsprache.
- [ ] Headless (`audio-browser-check`): Angebot erscheint · Ja erzeugt + speichert + navigiert ·
      Poster-🔊 spricht nur den Zieltext.

## AUSDRÜCKLICH NICHT
- `api/generate-lesson.js` NICHT anfassen (Inhalt + Schema bleiben). KEIN neuer Poster-Abschnitt
  (kein „Warum"/Korrektur-Block — der Generator bleibt, wie er ist).
- Den Generator-Request NICHT umbauen — die bewährte Form aus `generateLessonFromLastConvo`
  1:1 nach `chat.html` übernehmen.
- Keine neue Audio-Architektur (nur `audio.js` einbinden + aufrufen). Kein Stripe/Supabase.
  Keine Modus-/Seele-Änderung in diesem Paket.

## DANACH
- Kleinkram-Paket 2 (Genus-Begrüßung + Lesebegleiter-intro) · Audio überall I/II ·
  Werkstatt-Variante B · Paket B live · A2 · Paket C. Backlog: Audio Phase B/C ·
  Assessment-als-Gespräch · Legal-Sequenz · Gym-Raum · Supabase + ElevenLabs = Phase 2.
- **Offen/Notiz (nicht in diesem Paket):** Das Ja/Nein gehört jetzt der UI. Falls die
  `gespraech-modus.md`-Schluss-Replik am echten Modell ZUSÄTZLICH nach einer Lektion fragt
  (Doppel-Frage), die Schluss-Formulierung in einem späteren Mini-Paket trimmen.
