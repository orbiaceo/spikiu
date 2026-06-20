# AUFTRAG — Geführtes Gespräch · PAKET 2 „Die Häppchen"

Stand: 20.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigter Prototyp: `prototyp-gespraech-gefuehrt.html` · Baut auf P1 (live, getestet)

> **Paket 2 von 3** des geführten Gesprächs. P1 (Einstieg) ist live + von Leo am Gerät
> abgenommen. P2 schiebt die **Vorbereitung** zwischen Themenwahl und Rollenspiel:
> Wortschatz-Häppchen + Hörverständnis-Häppchen. **KEINE Lektion-Verdrahtung, KEIN
> gentle close** — das ist P3.

---

## ENTSCHEIDUNG VOR BAU (getroffen, gilt): VERTRAG B

Der Inhalt (Wortschatz + Hörverständnis) wird von einem **eigenen Endpoint
`api/haeppchen.js`** erzeugt (Muster `lektor.js`), NICHT als Inline-Marker aus dem
Gesprächs-Prompt. Grund: sauberes, robust parsebares JSON; getrennt testbar; das
Häppchen-Generieren ist Vorbereitung, nicht Charla. `gespraech.js`/Rollenspiel bleiben
unberührt — die Häppchen sind ein Frontend-orchestrierter Schritt davor.

---

## DER FLUSS (was P2 einbaut)

Heute (P1): Thema-Klick → Seed-Zug → Rollenspiel sofort.
NEU (P2): Thema-Klick → **Häppchen laden + üben** → DANN Seed-Zug → Rollenspiel (P1-Pfad).

```
Thema gewählt (Chip/Freitext)
   → audio.warm(zielsprache)          // Stimme im Hintergrund vorwärmen
   → POST /api/haeppchen {thema, zielsprache, muttersprache, koennen, fremde_schrift}
   → Wortschatz-Widget (Karten, je 🔊 = audio.speak)        [Stufe: Wörter]
   → „Weiter"
   → Hörverständnis-Widget(s) (🔊 Satz, A/B, grün/rot)      [Stufe: Hören]
   → nach letztem Item: kurze Übergabe
   → DANN der bestehende P1-Seed-Zug → Rollenspiel           [Stufe: Sprechen]
```

---

## SCHRITT 1 — `api/haeppchen.js` (neu, Muster `lektor.js`)

- `export default async function handler(req,res)`, CORS, `OPTIONS`-Kurzschluss,
  `x-api-key` aus `process.env.ANTHROPIC_API_KEY`, Modell `claude-sonnet-4-5`.
- Liest zur Laufzeit `spikiu-seele.md` + neue `haeppchen-modus.md` via
  `readFileSync(join(process.cwd(), …))` (mehrere Kandidatenpfade, Fehler→Klartext).
  KEIN `import.meta`. `.js`, `export default`.
- **Input (POST-Body):** `{ thema, zielsprache (de|es|en|el), muttersprache (de|es|en),
  koennen (anfang|mittel|fortgeschritten), fremde_schrift (bool) }`.
- **Output: NUR striktes JSON** (kein Vorwort, keine ```-Zäune). Im Endpoint defensiv
  parsen (try/catch, ```json-Zäune strippen), bei Fehler sauberes 200 mit Mini-Fallback
  ODER klarer Fehlercode — nie HTML/Prosa an die Oberfläche.

**JSON-Vertrag:**
```json
{
  "thema": "Hotel",
  "wortschatz": [
    { "ziel": "la recepción", "lautschrift": "re-zep-SION", "uebersetzung": "die Rezeption" }
  ],
  "hoerverstehen": [
    {
      "audio": "Tengo una reserva.",
      "frage": "Was hörst du?",
      "optionen": [
        { "text": "Tengo una reserva.",  "richtig": true  },
        { "text": "Tengo una pregunta.", "richtig": false }
      ]
    }
  ]
}
```

Regeln für den Inhalt (in `haeppchen-modus.md`, erbt von der Seele):
- `wortschatz`: **4–6** Einträge, zum Thema, alltagsnah, español **neutro** (nie voseo).
- `hoerverstehen`: **2–3** Items. `audio` = kurzer Satz aus dem Themen-Wortschatz; genau
  **eine** richtige Option, die falsche ist ein naher Minimalpaar-Kontrast (carta/cuenta,
  reserva/pregunta). `frage` in der **Muttersprache**.
- `lautschrift`:
  - `fremde_schrift = true` (Griechisch): **Pflicht** = Umschrift, EIN konsistentes System
    (Seele-Regel, gleiche Mechanik wie der Reader). Bei `anfang` Drei-Spur-Logik bedienen.
  - `fremde_schrift = false` (de/es/en): **optional**, leichte Betonungs-/Aussprachehilfe;
    darf fehlen. Das echte Vorbild ist das Audio, nicht die Schrift. Keine erfundene
    Phonetik (alte Lehre „apetése", nicht „apetenze") — im Zweifel weglassen.
- `koennen` steuert Länge/Schwere: `anfang` kurz + einfach, mehr Muttersprach-Brücke;
  `fortgeschritten` knapper, anspruchsvoller. NIE CEFR im Output zeigen.
- Plain language, keine Mnemonics, keine Grammatik-Fachwörter (Seele).

## SCHRITT 2 — `haeppchen-modus.md` (neu)

Schlanke Raum-Schicht wie `lektor-modus.md`: verweist per Nummer auf die Seele,
definiert NUR die Häppchen-Erzeugung + den JSON-Vertrag oben. Kein Code, reine Anleitung.

## SCHRITT 3 — `vercel.json`

`api/haeppchen.js` als Function eintragen, `includeFiles` deckt `*.md`
(damit `spikiu-seele.md` + `haeppchen-modus.md` zur Laufzeit geladen werden).
Pfad in `vercel.json` == realer Dateiname. KEINE COOP/COEP-Header.

## SCHRITT 4 — `chat.html` (Widgets + Orchestrierung + Audio)

- Beim Thema-Klick/Freitext (die P1-Stelle): VOR dem Seed-Zug erst den Häppchen-Schritt.
- **`audio.js` einbinden** (liegt am Root, `import { speak, warm } from '/audio.js'` —
  self-gehostet, keine Import-Map nötig). Beim Thema sofort `warm(zielsprache)` (still
  vorwärmen). Jede 🔊-Taste ruft `speak(text, zielsprache)`. Fallback steckt schon in
  `audio.js` (nie stummer Knopf) — nicht selbst nachbauen.
- **Lade-Spinner** während des `haeppchen`-Calls: animiert + lokalisiert DE/ES/EN
  (alte Lehre: nie „⏳ Generating…" hart englisch).
- **Wortschatz-Widget** + **Hörverständnis-Widget** exakt im Stil des Prototyps
  (`prototyp-gespraech-gefuehrt.html`): Karten mit 🔊, A/B mit grün (richtig) / rot
  (falsch) + Enthüllung der richtigen, „Weiter"-Fluss. Inline im Chat (Muster
  [WECHSEL]/Lesebegleiter), KEINE Vollbild-Slides.
- **Fortschrittsbalken** jetzt einbauen (in P1 bewusst ausgelassen): Thema · Wörter ·
  Hören · Sprechen · Lektion. In P2 füllen bis **Sprechen** (Lektion bleibt blass = P3).
- Nach dem letzten Hörverständnis-Item: kurze Übergabe, dann der **bestehende
  P1-Seed-Zug** ans Rollenspiel — P1-Pfad NICHT umschreiben, nur davor einhängen.
- `chat.html`-Regeln: `verlauf` (nie `history`), keine vom Browser belegten Namen,
  Emphasis nur `<em>`, `[WECHSEL:…]` + Profil-Chip unberührt.

---

## ABNAHME (alles grün, sonst nicht fertig)

- [ ] Thema-Klick → `/api/haeppchen` liefert gültiges JSON nach Vertrag; Wortschatz +
      Hörverständnis rendern inline.
- [ ] 🔊 in Wortschatz UND Hörverständnis spricht über `audio.speak()` (Piper oder
      Fallback) — nie stumm.
- [ ] Hörverständnis A/B: richtig → grün, falsch → rot + richtige enthüllt (wie Prototyp).
- [ ] Nach den Häppchen startet das Rollenspiel über den **P1-Pfad** — kein Regress am
      freien Flur, `[WECHSEL:…]` intakt.
- [ ] español **neutro** (kein voseo), plain language, keine Mnemonics (Seele eingehalten).
- [ ] Griechisch (`fremde_schrift=true`): Umschrift vorhanden, ein konsistentes System.
- [ ] Fortschrittsbalken füllt Thema→Wörter→Hören→Sprechen; Lektion bleibt blass.
- [ ] Lade-Spinner lokalisiert DE/ES/EN.
- [ ] `node --check api/haeppchen.js` grün; `vercel.json`-Pfad == Dateiname; `includeFiles`
      deckt `*.md`; KEINE COOP/COEP-Header.
- [ ] `chat.html`: keine vom Browser belegten Variablennamen; Emphasis nur `<em>`.

---

## AUSDRÜCKLICH NICHT in P2
- KEINE Lektion-Verdrahtung, kein `lastConversation`, kein „als Lektion"-Knopf (= P3).
- KEIN gentle close nach dem Rollenspiel (= P3).
- `gespraech.js` + die P1-Rollenspiel-Logik NICHT umschreiben — nur den Häppchen-Schritt
  davor einhängen.
- KEINE Modelle ins Repo, kein Stripe/Supabase.

---

## DANACH (eigene Aufträge)
- **P3 „Die Lektion":** gentle close + `chat.html` schreibt `verlauf`→`lastConversation`
  + „als Lektion" real an `/api/generate-lesson` → Dashboard.
- **Kleinkram-Paket 2 (Mini-Fixes, claude.ai):** (a) Genus-Begrüßung Dashboard — Spanisch
  „bienvenido" → genus-neutral „Te damos la bienvenida" (invariables Substantiv);
  Seele-Regel: in UI-Copy nie Genus-Kongruenz mit dem Nutzer (de/en schon neutral).
  (b) Lesebegleiter-`intro`-Kürzung (`lesebegleiter.js`, de/es/en).
- Optional: `gespraech-modus.md`/Seele eine Zeile — „tú/usted nach Kontext entscheiden"
  (weitgehend schon von Grundsatz 7 gedeckt).
