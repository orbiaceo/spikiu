# AUFTRAG — Geführtes Gespräch · „Roleplay-Feinschliff" (Ausstieg · Abschluss · Blasen · Intonation)

> ✅ **ERLEDIGT am 21.06.2026 (Claude Code) · auf dev · kein offener Auftrag.**
> 2 Dateien (`chat.html` + `gespraech-modus.md`); `audio.js` unberührt. (1) Ausstiegs-Leiste
> `⋯` im geführten Rollenspiel (Anderes Thema / Beenden → Lektion, Optik = End-Menü). (2a)
> Szenenende ohne Lob-/„was-willst-du"-Blase (Figur-Schluss + `[SZENENENDE]`). (2b) `---` nur
> für echte Gedankenwechsel, sonst EINE Blase. (3) Intonation untersucht: `¿…?` läuft
> unversehrt zu Piper → **Beta-Grenze** des `es_ES-sharvard-medium`-Modells (ElevenLabs Phase 2),
> `audio.js` nicht angefasst. Headless `ok:true`, `node --check` + Smokes grün. NÄCHSTES = Kleinkram-Paket 2.

Stand: 21.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Baut auf „Antwort-Paletten + Audio-Vorwärmen" (Teil 30, live)

> Vier kleine Befunde aus Leos Geräte-Test (Café DE→ES anfang). Gute Nachricht vorab:
> das P3-Szenenende FEUERT jetzt (3-Knopf-Menü erscheint) ✅. Alle vier sind Feinschliff.
> Dateien: `gespraech-modus.md` + `chat.html` + `audio.js`.

---

## 1 — Dauerhafter Ausstieg WÄHREND des Rollenspiels · `chat.html`
**Befund:** Mitten im geführten Rollenspiel hat der Lerner nur die Antwort-Chips + das
Textfeld — er sitzt im Dialog fest, ohne sichtbaren Ausweg. Er soll JEDERZEIT
entscheiden können.
- Eine **dezente, dauerhaft sichtbare Option** während des geführten Rollenspiels (z. B.
  eine schmale Leiste / ein kleiner „⋯"-Knopf über dem Eingabefeld), die dasselbe
  bietet wie das Abschluss-Menü: **Anderes Thema** (→ zurück zur Themen-Gabelung,
  regeneriert Häppchen) und **Beenden → Lektion**. „Weitermachen" = einfach weiter
  antworten (Default), also reicht ein „Schließen/Weiter" um die Leiste wegzutippen.
- Wiederverwende die vorhandene `renderEndMenu`-Logik/-Optik (`emOtro`, `emTerminar`) —
  kein neues System. Nur eben ERREICHBAR während des Spiels, nicht erst am Ende.
- Nur im **geführten** Rollenspiel zeigen; im freien Flur nicht nötig (dort ist man eh frei).

## 2a — Abschluss ohne redundante Lob-Blase · `gespraech-modus.md`
**Befund:** Am Szenenende kommt noch eine Blase „Bien hecho. ¿Qué te gustaría hacer ahora?"
— doppelt falsch: „Bien hecho" ist das verbotene Lob, und „¿qué quieres?" sagen die drei
Knöpfe darunter schon.
- Am Szenenende ist die LETZTE Spikiu-Blase die **natürliche Schluss-Replik der Figur**
  („¡Muchas gracias! ¡Que tenga un buen día!") — danach NUR das Signal `[SZENENENDE]`.
- KEINE zusätzliche Blase mit „aus der Rolle treten" + Lob + „was willst du jetzt?". Das
  Menü (Frontend) IST die Frage. Kein Lob, keine Wiederholung.

## 2b — Eine Sprechblase pro Absatz · `gespraech-modus.md`
**Befund:** Sätze, die zu EINEM Absatz/Gedanken gehören, werden unnötig in zwei Blasen
zerlegt — wirkt zerhackt.
- Schärfe die `---`-Regel: `---` trennt NUR wirklich verschiedene Gedanken (z. B.
  Szenen-Rahmung vs. erste Replik). Mehrere Sätze, die zu EINEM Gedanken/Absatz gehören,
  bleiben in EINER Blase zusammen. Im Zweifel: eine Blase. (Ästhetik + UX — der Lerner
  bekommt einen sauberen Block, nicht Fragmente.) Das ergänzt die „max 2 Blasen, meist 1"-
  Regel: lieber ein vollständiger Absatz als zwei zerrissene Sätze.

## 3 — Piper liest Fragen als Aussagen · `audio.js` (untersuchen, ehrlich melden)
**Befund:** Beim 🔊 einer Frage („¿Qué le pongo?", „¿Está libre?") klingt die Intonation
wie eine Aussage — das Fragezeichen wird nicht als Frage realisiert.
- WICHTIG: Der Text erreicht Piper bereits MIT `¿…?` (in `audio.js` `splitSentences`
  Z.79 bleibt das öffnende `¿` erhalten). Es wird also NICHT weggeschnitten.
- Zu prüfen: (a) ob in der Pipeline doch irgendwo `¿`/`?` verloren geht oder ein Satz so
  zerteilt wird, dass die Frage-Kontur bricht; (b) ob espeak-ng/das Voice-Modell
  `es_ES-sharvard-medium` die interrogative Prosodie überhaupt umsetzt.
- EHRLICH BLEIBEN: Wahrscheinlich eine **Prosodie-Grenze des Piper-Spanisch-Modells**
  (medium-Qualität), kein simpler Code-Bug. Wenn sich mit vertretbarem Aufwand nichts
  verbessern lässt → als **bekannte Beta-Grenze** ins Ledger schreiben; die volle Lösung
  ist ElevenLabs (Phase 2). NICHT lange darin versinken, nicht raten — kurz prüfen, melden.

---

## ABNAHME
- [ ] **Ausstieg:** im geführten Rollenspiel jederzeit eine dezente Option erreichbar
      (Anderes Thema / Beenden → Lektion), Optik = vorhandenes End-Menü; im freien Flur nicht.
- [ ] **Abschluss:** keine „Bien hecho"/„was willst du jetzt?"-Blase mehr; letzte
      Figur-Replik → direkt das 3-Knopf-Menü.
- [ ] **Blasen:** zusammengehörige Sätze in EINER Blase; `---` nur für echte Gedanken-
      wechsel; nie zerhackt.
- [ ] **Intonation:** geprüft + Ergebnis im Bericht (Fix ODER als Beta-Grenze dokumentiert,
      Verweis ElevenLabs Phase 2). Keine Verschlimmbesserung an `audio.js`.
- [ ] `node --check` grün; Antwort-Paletten/Audio-Vorwärmen/Häppchen/freier Flur unberührt;
      keine vom Browser belegten Variablennamen; Emphasis nur `<em>`.

## AUSDRÜCKLICH NICHT
- `api/*` nicht umschreiben. Keine neue Audio-Architektur. Kein Stripe/Supabase.
- Keine Modellwechsel für Piper in diesem Paket (Stimmen-Frage = später / Phase 2).

## DANACH
- Kleinkram-Paket 2 (Genus-Begrüßung + Lesebegleiter-intro) · Audio überall I/II ·
  Werkstatt-Variante B · Paket B live · A2 · Paket C. Backlog: Audio Phase B/C ·
  Assessment-als-Gespräch · Legal-Sequenz · Gym-Raum · Supabase + ElevenLabs = Phase 2.
