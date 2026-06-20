# AUFTRAG — Geführtes Gespräch · PAKET 1 „Der geführte Einstieg"

Stand: 20.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigter Prototyp: `prototyp-gespraech-gefuehrt.html`

> Dies ist **Paket 1 von 3** des geführten Gesprächs. Es baut NUR den Einstieg
> (Opener-Gabelung + thematische Entrada) + tilgt den Name-Leak. **Noch KEINE
> Häppchen, KEIN Hörverständnis, KEINE Lektion-Verdrahtung** — die kommen in
> Paket 2 und 3 als eigene Aufträge. Strikt in dieser Reihenfolge bleiben.

---

## WARUM SO GESCHNITTEN (Lehre aus dem eigenen Ledger)

Wie beim Audio (Phase A/B/C/D) und bei den Räumen: ein kleiner, testbarer Schnitt
pro Sitzung. Und genau wie die A2-Regel ERST NACH Paket B geschrieben wurde
(sonst wäre sie eine erfundene Funktion): **`gespraech-modus.md` darf in Paket 1
NICHT von Häppchen/Hörverständnis sprechen — die gibt es noch nicht. Sie zu
versprechen wäre ein Seelen-Verstoß (Niemals: Funktionen erfinden, die es nicht
gibt).** Der Prompt führt hier nur in ein themen-fokussiertes Gespräch/Rollenspiel.

---

## INPUT-VERTRAG (unverändert, der Raum kennt ihn schon)

```
profile.name           Klarname oder leer/fehlend (Gast!)
profile.koennen        anfang | mittel | fortgeschritten   (INTERN, nie sichtbar)
profile.muttersprache  de | es | en
profile.zielsprache    de | es | en | el
profile.fremde_schrift true | false
```

---

## ZIEL

Der Lerner kommt in den Gesprächs-Raum und bekommt zuerst eine **Gabelung**:
„einfach plaudern" ODER „ein Thema üben". Wählt er Plaudern → exakt das heutige
freie Gespräch (der Flur), nichts ändert sich. Wählt er ein Thema (oder beschreibt
eins selbst) → Spikiu steigt warm in ein **themen-fokussiertes Gespräch / leichtes
Rollenspiel** zu genau diesem Thema ein, in der richtigen Sprache nach `koennen`.

---

## DREI EDITS

### EDIT 1 — Name-Leak tilgen · `api/gespraech.js` (Z. 62)

Heute: `p.name || 'der Lerner'` schiebt die Platzhalter-Floskel „der Lerner" als
echten Namen ins Modell → Gast wird mit „¡Hola, der Lerner!" begrüßt + Backend-Meta
leckt. Fix: Wenn KEIN echter Name da ist, KEINEN Fake-Namen injizieren. Stattdessen
das Namensfeld leer lassen / weglassen, sodass der Prompt namenlos und natürlich
grüßt („¡Hola!" / „Schön, dass du da bist."). Nur diese eine Stelle. Sonst nichts
an `gespraech.js` anfassen. (Absorbiert den Name-Leak-Teil des alten Kleinkram-Pakets.)

### EDIT 2 — Opener-Gabelung · `chat.html`

Heute feuert `chat.html` beim Laden sofort `[EINSTIEG]` in einen leeren Verlauf →
Spikiu grüßt direkt. NEU: Beim Laden zeigt der Raum zuerst eine **Wahl** (wie im
Prototyp `prototyp-gespraech-gefuehrt.html`, Opener-Teil):

- Eine warme Spikiu-Begrüßung (kommt weiterhin vom Backend via `[EINSTIEG]` —
  KEINE Frage im selben Atemzug, wie die Seele will).
- Darunter eine vom Frontend gerenderte Auswahl:
  - **„Einfach plaudern"** → genau der heutige Flur. Der `[EINSTIEG]`-Opener bleibt
    stehen, der Lerner tippt frei weiter. Kein neues Verhalten.
  - **Themen-Chips** (Beschriftung in der **Muttersprache** des Lerners, i18n de/es/en):
    Hotel · Taxi · Restaurant · Im Café · „Etwas anderes…".
  - **„Etwas anderes…"** öffnet ein Textfeld („Beschreibe, was du üben willst").
- Klick auf ein Thema (oder Absenden des Freitexts) → `chat.html` schickt EINEN
  Seed-User-Zug an `gespraech.js` (z. B. den Thementext als normale User-Nachricht,
  oder ein klar lesbares `Ich möchte das Thema „<Thema>" üben.`) und rendert ihn
  als User-Bubble. Ab da läuft der normale `turn()`-Zyklus weiter.

Stil EXAKT aus dem Prototyp übernehmen (Farben/Tokens, Lora+DM Sans, kanonischer
Capy, Chip-Stil). KEIN Fortschrittsbalken in Paket 1 (Thema·Wörter·Hören·Sprechen·
Lektion) — der kommt mit Paket 2, wenn es die Stufen wirklich gibt. KEINE Häppchen-
oder Hörverständnis-Widgets in Paket 1.

`chat.html`-Regeln beachten: Variable `verlauf` (nie `history`), Raumwechsel-Signal
`[WECHSEL:…]` bleibt unangetastet funktionsfähig, keine vom Browser belegten
Variablennamen, Emphasis nur via `<em>`.

### EDIT 3 — Themen-Entrada im Prompt · `gespraech-modus.md`

Den Abschnitt **EINSTIEG** so erweitern, dass Spikiu, wenn der erste echte User-Zug
ein Thema ist („Ich möchte das Thema … üben"), warm bestätigt und direkt in ein
themen-fokussiertes Gespräch / leichtes Rollenspiel zu dem Thema einsteigt — in der
richtigen Sprache nach `koennen`, mit dem bestehenden Regler/Schrift-Brücke. Alle
Flur-Regeln bleiben (eine Frage pro Antwort, Sinn zuerst, kein Lob-Applaus, nie
länger als ein Blick).

**HART:** In Paket 1 KEIN Wort über Häppchen, Wortschatz-Karten, Hörübungen oder
Lektionen im Prompt — die existieren noch nicht. Spikiu redet sich nicht in eine
Funktion hinein, die der Lerner nicht klicken kann (Niemals-Liste der Seele).

---

## ABNAHME (alles grün, sonst nicht fertig)

- [ ] **Plaudern unverändert:** „Einfach plaudern" → heutiges freies Gespräch, kein
      neues Verhalten, `[WECHSEL:…]` funktioniert weiter.
- [ ] **Thema-Chip** (z. B. Restaurant) → Spikiu steigt themen-fokussiert ein, in der
      Zielsprache nach `koennen`, Chips in Muttersprache lokalisiert (de/es/en geprüft).
- [ ] **„Etwas anderes…"** → Textfeld, Freitext startet ein themen-fokussiertes Gespräch.
- [ ] **Gast ohne Profil:** KEIN „der Lerner"-Leak, kein Backend-Meta — namenlose,
      natürliche Begrüßung.
- [ ] Prompt erwähnt NIRGENDS Häppchen/Hörverständnis/Lektion (gibt es noch nicht).
- [ ] `gespraech.js`: NUR die Z.-62-Stelle geändert. `node --check api/gespraech.js` grün.
- [ ] `vercel.json` unangetastet (gespraech-Eintrag + includeFiles `*.md` decken modus.md).
- [ ] Kein vom Browser belegter Variablenname in `chat.html`; Emphasis nur `<em>`.

---

## AUSDRÜCKLICH NICHT in Paket 1
- KEINE Wortschatz-Häppchen, KEIN Hörverständnis-Widget (= Paket 2).
- KEIN `audio.js`-Einbau (= Paket 2).
- KEINE Lektion-Verdrahtung, kein `lastConversation` (= Paket 3).
- KEIN Fortschrittsbalken (= Paket 2, sobald die Stufen existieren).
- KEIN neuer Endpoint. `gespraech.js` nur die eine Zeile.
- Lesebegleiter-`intro`-Kürzung (Rest des alten Kleinkram-Pakets) NICHT hier —
  eigene Mini-Aufgabe, andere Sala (`lesebegleiter.js`).

---

## DANACH (eigene Aufträge, der Reihe nach)
- **Paket 2 „Die Häppchen":** Wortschatz + Hörverständnis. Vor Bau Design-Entscheid:
  Inhalts-Vertrag **A** (Inline-Marker `[HAEPPCHEN]{json}[/HAEPPCHEN]`) vs **B**
  (eigener Endpoint `api/haeppchen.js`, Muster `lektor.js`). claude.ai-Empfehlung: B.
  Dann Widgets in `chat.html` + `audio.speak(text, zielsprache)` + Fortschrittsbalken.
- **Paket 3 „Die Lektion":** Gentle Close nach dem Rollenspiel + `chat.html` schreibt
  `verlauf` → `lastConversation` + „als Lektion" ruft real `/api/generate-lesson` →
  erscheint im Dashboard. (Tilgt den dokumentierten Lektion-Disconnect.)
