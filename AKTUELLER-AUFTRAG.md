# AUFTRAG — Geführtes Gespräch · PAKET FEINSCHLIFF II „Sauberer Rhythmus"

Stand: 21.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigter Prototyp: `prototyp-rhythmus-korrekturkarte.html`

> Direkt nach Feinschliff I (Teil 27, live). Leos Geräte-Test zeigte: die Roleplay-Wand
> HÄLT (kein Lehrer-Austritt mehr in der Szene) ✅ — aber drei Darstellungs-Sachen
> stören noch. Drei chirurgische Edits, ZWEI Dateien. KEIN Endpoint, KEIN P3.

---

## DIE DREI BEFUNDE (aus Leos Test, Café DE→ES anfang)

1. **Rohes `---` sichtbar.** Spikiu trennt Gedanken mit `---`; das Frontend zeigt den
   Strich roh in der Blase. Soll nie als Text erscheinen.
2. **Mehrere Infos in einer Blase.** Szenen-Rahmung + Eröffnungsreplik kleben in einer
   Blase. Leo will: EIN Gedanke pro Blase — „nicht mehr als eine Information für Auge
   und Hirn" (gerade bei heutiger Konzentrationsschwäche).
3. **Zielsprache kursiv.** Die Sprechblase rendert die Zielsprache kursiv; kursiv soll
   NUR das Übersetzungs-Kästchen sein.

Plus: der **Szenen-Schluss wurde zum Vortrag** (Tilde-Korrektur „cuánto", Trinkgeld-
Erklärung). Soll kurz sein. (Die strukturierte Korrektur-Karte kommt in P3 — hier NICHT.)

---

## EDIT 1 — Eine Blase = ein Gedanke · `chat.html` + `gespraech-modus.md`

**Prompt (`gespraech-modus.md`):** Neuer/erweiterter Hinweis — Spikiu trennt verschiedene
Gedanken/Repliken mit einer eigenen Zeile, die NUR `---` enthält; die Oberfläche macht
daraus GETRENNTE Sprechblasen. Nie mehr als ein Gedanke pro Blase. Konkret: die
Szenen-Rahmung („Üben wir im Café. Ich bin der Kellner, du der Gast.") ist EINE Blase,
die Eröffnungsreplik der Figur („Buenos días, ¿qué le pongo?") eine SEPARATE Blase. Das
`---` ist Struktur-Signal (wie `[WECHSEL]`/`[[…]]`) — nie erklären, nie als Inhalt.

**Frontend (`chat.html`):** Jede Spikiu-Nachricht VOR dem `[[…]]`-Split zuerst an Zeilen,
die nur `---` (oder `—`) sind, in Segmente teilen → JEDES Segment wird eine eigene
Sprechblase (mit eigenem `splitBridge`/🔊/Übersetzungs-Kästchen, bestehende Logik
wiederverwenden). Rohes `---` wird NIE gezeigt. Reihenfolge der Extraktion: `[WECHSEL]`
zuerst (wie bisher) → dann an `---` splitten → pro Segment `[[…]]` trennen.

## EDIT 2 — Kursiv nur für die Übersetzung · `chat.html`

Die Sprechblase (Zielsprache) IMMER **aufrecht** (`font-style: normal`), nie kursiv.
Nur das Übersetzungs-Kästchen `.trans` bleibt kursiv + gedämpft. Aktuell rendert die Blase
kursiv — Ursache finden und beheben (CSS der Blase ODER `_…_`-Emphasis, die als kursiv
durchschlägt). Stil-Referenz: `prototyp-rhythmus-korrekturkarte.html` (Blase = Lora
aufrecht, Kästchen = kursiv).

## EDIT 3 — Kurzer Szenen-Schluss · `gespraech-modus.md`

Den Abschnitt „IN DER SZENE BLEIBEN" / Szenenende präzisieren: Am Szenenende hält Spikiu
sich KURZ — ein warmer, knapper Gruß + die bestehende Frage (weitermachen / anderes /
weiter plaudern). KEINE Grammatik-/Orthografie-Belehrung, KEINE langen Erklärungen, KEINE
Tilde-/Akzent-Korrekturen im Fließtext. (Die strukturierte Korrektur kommt später —
NICHT erwähnen, A2-Lehre.)

---

## ABNAHME (alles grün, sonst nicht fertig)

- [ ] **Zwei Blasen beim Einstieg:** Szenen-Rahmung und Eröffnungsreplik sind GETRENNTE
      Sprechblasen; kein rohes `---` mehr irgendwo.
- [ ] **Ein Gedanke pro Blase** durchgängig (auch mittendrin, wenn das Modell `---` setzt).
- [ ] **Zielsprache aufrecht**, nur das Übersetzungs-Kästchen kursiv.
- [ ] **Szenen-Schluss kurz** — kein Vortrag, keine Grammatik-/Tilde-Belehrung.
- [ ] 🔊 weiter pro Ziel-Blase (nur Zieltext); `[[…]]`/`[WECHSEL:…]` lecken nie; freier
      Flur + Häppchen-Flow (P2) + Roleplay-Wand (Feinschliff I) unberührt.
- [ ] `node --check` grün; nur **2 Dateien** (`gespraech-modus.md` + `chat.html`);
      `gespraech.js`/`haeppchen.js`/`vercel.json` unangetastet.
- [ ] keine vom Browser belegten Variablennamen; Emphasis nur `<em>`.

---

## AUSDRÜCKLICH NICHT
- KEINE Korrektur-Karte hier (= P3, Design schon genehmigt im Prototyp).
- KEINE Lektion-Verdrahtung / kein „als Lektion"-Knopf (= P3).
- `api/*` nicht anfassen. Kein Stripe/Supabase.

---

## DANACH — P3 „Die Lektion" (Design fixiert, Karte genehmigt)
- **Korrektur-Karte am Szenenende** (genehmigt in `prototyp-rhythmus-korrekturkarte.html`):
  zwei Spalten **„Du hast gesagt → Besser"**, farbcodiert (links gedämpft/gold, rechts
  grün mit 🔊), je ein Paar pro Zeile, **NUR kommunikativ unpassend** (nicht Grammatik/
  Orthografie), **OHNE Erklärung**. Beispiel: „Pagar, por favor." → „La cuenta, por favor."
- **Gentle close + drei Türen:** weiter üben / weiter plaudern / **als Lektion speichern**.
- **`chat.html` schreibt `verlauf`→`lastConversation`** + „als Lektion" real an
  `/api/generate-lesson` → Dashboard (tilgt den Lektion-Disconnect).
- In der **Lektion** erklärt Spikiu das WARUM (z. B. warum nicht „pagar, por favor").
- Dann: Kleinkram-Paket 2 (Genus-Begrüßung + Lesebegleiter-intro) · „Audio überall I —
  Lesebegleiter" (Sermon kürzen + 🔊 + Mini-Phonetik) · „Audio überall II — Reader"
  (🔊 an jeder Zielsprachen-Wendung; vorher `cap*-v2.html`-Struktur prüfen).
