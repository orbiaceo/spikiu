# AUFTRAG — Geführtes Gespräch · PAKET P3 „Die Lektion + Roleplay-Feinschliff"

> ✅ **ERLEDIGT am 21.06.2026 (Claude Code) · auf dev · kein offener Auftrag.**
> Fünf Edits, 2 Dateien (`gespraech-modus.md` + `chat.html`); `generate-lesson.js`/
> `dashboard.html` nur gelesen, nicht angefasst (Vertrag passte). A Wortschatz-Anker ·
> B max 2 Blasen · C Abschluss-Menü ohne Lob (`[SZENENENDE]`→3 Knöpfe) · D Korrektur-Karte
> (`[KORREKTUR]`→zwei Spalten, 🔊 auf „Besser") · E „Terminar" schreibt `verlauf`+Korrekturen
> →`lastConversation` + Tür zu `dashboard.html#lektionen` (tilgt den Lektion-Disconnect).
> Headless `ok:true`, `node --check` + Parser-Smoke grün. NÄCHSTES = „Übungs-Varianten" (Punkt ①).

Stand: 21.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigte Prototypen: `prototyp-rhythmus-korrekturkarte.html` + `prototyp-feinschliff-iii.html`

> Baut auf Feinschliff II (live, getestet). P3 macht das Szenenende fertig + tilgt den
> dokumentierten Lektion-Disconnect. Bündelt vier genehmigte Punkte aus Leos Test
> (Prototyp III) — aber NUR die roleplay-/szenenende-Seite. Punkt ① (Hörverständnis-
> Varianten) ist ein EIGENES Folge-Paket („Übungs-Varianten"), NICHT hier.

---

## FÜNF EDITS · Dateien: `gespraech-modus.md` + `chat.html` (+ `generate-lesson.js`/`dashboard.html` NUR lesen/anschließen)

### A — Rollenspiel am gelernten Wortschatz verankern (Punkt ②) · `gespraech-modus.md`
Bei `koennen=anfang` (und großteils `mittel`, bis ~A2): das Rollenspiel bleibt ENG am
Häppchen-Wortschatz des gewählten Themas. Spikiu improvisiert höchstens 1–2 Sätze, fragt
NICHT nach entferntem Stoff oder Vergangenheit, und führt den Lerner sanft dazu, die
gerade gelernten Wörter zu benutzen. Das Register darf zur Figur passen (ein Taxifahrer
klingt wie ein Taxifahrer), aber der lexikalisch-grammatische RAHMEN bleibt eng am
Gelernten. Die `[[…]]`-Brücke hilft, aber der Anker ist der Wortschatz, nicht freie Fantasie.

### B — Höchstens 2 Blasen, fast immer 1 (Punkt ④) · `gespraech-modus.md`
Pro Spikiu-Ausgabe HÖCHSTENS zwei Sprechblasen, im Normalfall EINE. Default = eine Blase
(Ziel + 🔊 + `[[…]]`-Brücke). Zwei nur wenn wirklich nötig (z. B. Szenen-Rahmung + erste
Replik der Figur). NIE drei oder mehr. (Verschärft den `---`-Trenner aus Feinschliff II:
trennen ja, aber sparsam — ein Gedanke, eine Blase, dann stoppen.)

### C — Abschluss = Menü, KEIN Lob-Gerede (Punkt ③) · `gespraech-modus.md` + `chat.html`
Am Szenenende KEIN überschwängliches Lob („super gemacht", „du hast das toll…"). Nur eine
knappe, sachliche Frage + ein Menü mit DREI Optionen (chat.html rendert die Knöpfe,
Labels i18n nach `profile.muttersprache` de/es/en):
1. **Mismo tema** — weiter üben (neue Runde, gleicher Wortschatz/Thema).
2. **Otro tema** — zurück zur Themen-Gabelung (die bestehende P1-Gabelung erneut aufrufen
   → bei Wahl wird der ganze Prozess neu erzeugt: neue Häppchen usw.).
3. **Terminar** → Lektion (siehe E).
Das Prompt (`gespraech-modus.md`) sagt nur: Szenenende ist knapp + sachlich, kein Lob,
Übergabe ans Menü. Die Knöpfe macht das Frontend.

### D — Korrektur-Karte am Szenenende (genehmigt) · `gespraech-modus.md` (Vertrag) + `chat.html` (Widget)
VOR dem Menü, NUR wenn es kommunikativ unpassende Wendungen gab: Spikiu hängt ein
strukturiertes Signal an, z. B.:
```
[KORREKTUR]
Pagar, por favor. -> La cuenta, por favor.
Quiero un taxi grande. -> Un taxi, por favor.
[/KORREKTUR]
```
- NUR **kommunikativ unpassend** (so sagt es ein Muttersprachler nicht), NICHT Grammatik/
  Orthografie/Akzente. Max **1–3** Paare. KEINE Erklärung im Signal.
- `chat.html` parst `[KORREKTUR]…[/KORREKTUR]` → rendert die Zwei-Spalten-Karte
  „Du hast gesagt → Besser" (Stil EXAKT aus `prototyp-feinschliff-iii.html`/
  `prototyp-rhythmus-korrekturkarte.html`: links gedämpft/gold `--said-*`, rechts grün
  `--accent2` mit 🔊 auf der „Besser"-Spalte). Signal NIE roh zeigen. Gab es nichts → keine
  Karte, direkt Menü.
- Das **WARUM** steht NICHT auf der Karte — es kommt in der Lektion (E).

### E — Lektion-Anschluss: den kaputten Link tilgen · `chat.html` (+ `generate-lesson.js`/`dashboard.html` lesen)
ZUERST `generate-lesson.js` UND die Lektionen-Sektion in `dashboard.html` LESEN, um den
bestehenden Vertrag zu verstehen (welcher localStorage-Key, welches Format erwartet der
Generator/der Dashboard-Knopf). DANN passend anschließen:
- Bei **„Terminar"**: `chat.html` schreibt den `verlauf` (inkl. der Korrektur-Wendungen)
  in `lastConversation` (localStorage, im erwarteten Format) und navigiert zu
  `dashboard.html#lektionen`. Heute ist der Link tot, WEIL chat.html `lastConversation`
  NIE schreibt — genau das hier beheben.
- Der bestehende Dashboard-Knopf/Generator (`/api/generate-lesson`, laut Ledger gesund)
  greift dann auf `lastConversation` zu und erzeugt die Lektion. In der Lektion erklärt
  Spikiu das WARUM der Korrekturen (z. B. warum nicht „pagar, por favor") — das, was die
  Karte bewusst weglässt.
- Falls `generate-lesson.js` dafür nachjustiert werden muss (Verlauf/Korrekturen als Input,
  WARUM-Erklärung im Output): NUR minimal + sauber; sonst NICHT umschreiben. Wenn es größer
  würde → STOP + im Bericht melden (dann eigenes Folge-Paket P3-B).

---

## ABNAHME (alles grün, sonst nicht fertig)
- [ ] **Anker:** Rollenspiel bei `anfang` bleibt am Häppchen-Wortschatz, keine entfernten
      Themen/Vergangenheit, kein Abdriften.
- [ ] **Blasen:** höchstens 2, fast immer 1 pro Spikiu-Ausgabe; nie 3+.
- [ ] **Abschluss:** kein Lob-Gerede; knappe Frage + 3-Knopf-Menü (i18n). „Otro tema" →
      Themen-Gabelung + Neu-Generierung; „Mismo tema" → neue Runde; „Terminar" → Lektion.
- [ ] **Korrektur-Karte:** zwei Spalten „Du hast gesagt → Besser", nur kommunikativ,
      ohne Erklärung, 🔊 auf „Besser"; `[KORREKTUR]` nie roh; nichts → keine Karte.
- [ ] **Lektion-Link lebt:** „Terminar" schreibt `lastConversation` → Dashboard erzeugt
      die Lektion (vorher fand der Knopf nichts). Die Lektion erklärt das WARUM.
- [ ] `[WECHSEL:…]`/`[[…]]`/Häppchen-Flow/freier Flur unberührt; `node --check` grün;
      keine vom Browser belegten Variablennamen; Emphasis nur `<em>`.

## AUSDRÜCKLICH NICHT
- KEINE Hörverständnis-Varianten (Punkt ① Position-Zufall + Wörter-Tippen) — eigenes
  Folge-Paket „Übungs-Varianten" (Design im Prototyp `prototyp-feinschliff-iii.html` fixiert).
- `api/haeppchen.js`/`api/gespraech.js` NICHT umschreiben.
- Kein Stripe/Supabase, keine Modelle ins Repo.

## DANACH (Reihenfolge)
1. **„Übungs-Varianten" (Punkt ①):** Hörverständnis — richtige Option ZUFÄLLIG platziert +
   neuer Übungstyp „Wörter tippen" (Audio → markiere die gehörten Wörter, Distraktoren als
   Minimalpaar). Toucht `api/haeppchen.js` (JSON-Vertrag um Typ + Position erweitern),
   `haeppchen-modus.md` (Regeln + Distraktor-Logik), `chat.html` (Word-Spotting-Widget).
   Design genehmigt in `prototyp-feinschliff-iii.html`.
2. Kleinkram-Paket 2 (Genus-Begrüßung + Lesebegleiter-intro) · Audio überall I/II ·
   Werkstatt-Variante B · Paket B live · A2 · Paket C.
