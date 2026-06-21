# AUFTRAG — erledigt am 21.06.2026 · kein offener Auftrag

**Teil 32 — Lektion-Angebot ans Gesprächsende + Audio im Lektion-Poster** ist gebaut und
auf `dev` (commit c4b2799). ZWEI Dateien: `chat.html` + `dashboard.html`;
`api/generate-lesson.js` + Poster-SCHEMA unangetastet.

## Erledigt (Abnahme-Kriterien)
- [x] Dashboard: KEIN „Lektion aus letztem Gespräch"-Knopf mehr; `generateLessonFromLastConvo`
      + `setLessonBtnsLoading` + Label-Dicts entfernt.
- [x] Freies Gespräch: dezenter „Gespräch beenden" (`#freeExitBar`) ab ≥2 Verlauf-Einträgen,
      nicht beim leeren Opener / nicht an der Gabelung.
- [x] Geführtes Rollenspiel: „Beenden" (End-Menü + `exitBar`) → Ja/Nein-Angebot (`offerLesson`)
      statt Dashboard-Sprung.
- [x] Ja → „Spikiu bastelt …" → echte Lektion in `spikiu_user.lessons` (mit `createdAt`
      + `zielsprache`, ROLLING-3) → Abschieds-Blase → sanfte Auflösung → `dashboard.html#lektionen`
      (Speichern VOR Navigation). Fehlerfall = ehrliche Blase, keine Navigation.
- [x] Nein → warmer Abschied, Chat bleibt.
- [x] „Meine Lektionen" chronologisch (neueste zuerst, `createdAt` absteigend); Badge ≤ 3/3.
- [x] Poster: 🔊 auf jedem Wortschatz-Wort + jeder Dialog-Zeile (NUR Zielsprache), über
      `audio.js`; NICHT auf Übersetzung / Grammatik / Quiz.
- [x] `node --check` grün (beide Inline-Scripts je Datei); Generator + Schema unverändert;
      keine vom Browser belegten Variablennamen; Emphasis nur `<em>`; 🔊 nur Zielsprache.
- [x] Headless (`audio-browser-check`): Angebot erscheint · Ja erzeugt+speichert+navigiert
      (Body name/nativeLang/profile/conversationHistory; `zielsprache=es`, `createdAt`) ·
      Poster-🔊 spricht nur den Zieltext in `es` (4 Knöpfe), `spkWarm=es`.

## ABNAHME-REST (Leo auf dev/Gerät — nicht headless fakebar)
- Angebot am echten Modell-Gesprächsende (geführt + frei).
- „Ja" erzeugt eine echte, sinnvolle Lektion aus dem Gespräch.
- Poster-🔊 hörbar (Piper/Fallback) + iOS-Safari.
- Rolling-3 fühlbar (älteste fällt raus, Badge ≤ 3/3).

## Offen/Notiz (nicht in diesem Paket)
- Falls die `gespraech-modus.md`-Schluss-Replik am echten Modell ZUSÄTZLICH nach einer
  Lektion fragt (Doppel-Frage zum UI-Angebot), die Schluss-Formulierung später trimmen.

## NÄCHSTES
- Kleinkram-Paket 2 (Genus-Begrüßung + Lesebegleiter-intro) · Audio überall I/II ·
  Werkstatt-Variante B · A2 · Paket C. Backlog: Audio Phase B/C · Assessment-als-Gespräch ·
  Gym-Raum · Supabase + ElevenLabs = Phase 2.
