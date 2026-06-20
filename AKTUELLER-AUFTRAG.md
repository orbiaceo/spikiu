# AUFTRAG — Geführtes Gespräch · PAKET FEINSCHLIFF

Stand: 21.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigter Prototyp: `prototyp-sprechblase-uebersetzung.html`

> Zwischen P2 (gebaut + getestet) und P3. Zwei Befunde aus Leos Geräte-Test (Hotel,
> DE→ES, anfang): (A) Spikiu tritt MITTEN im Rollenspiel als Lehrer aus der Rolle
> („Kleiner Tipp: Du hast 'A Lola' gesagt…") — verboten. (B) Zu viel Text pro Zug:
> Zielsprache + Übersetzung als zwei gestapelte Blöcke = eine „Wand", die den Anfänger
> überfordert. Zwei chirurgische Edits, zwei Dateien. KEIN neuer Endpoint, KEIN P3.

---

## ARREGLO A — Die Roleplay-Wand (Prompt) · `gespraech-modus.md`

Die Korrektur-Disziplin verschärfen (die Charta kennt sie als Modus A, der Prompt
setzt sie nicht hart genug durch):

- **In einer Szene / einem Rollenspiel bleibt Spikiu GANZ in der Figur.** Kein „kleiner
  Tipp", keine Grammatik-Anmerkung, kein Meta-Kommentar über die Sprache des Lerners
  MITTEN in der Szene.
- Macht der Lerner einen Fehler, **reformuliert die Figur ihn still und natürlich** in
  ihrer eigenen Antwort (die Rezeptionistin sagt es einfach richtig) und spielt weiter —
  nie als „Achtung, so heißt es richtig".
- Verbesserungen/Hinweise kommen NUR **am Ende der Szene** (oder später in der Lektion,
  = P3). Während gespielt wird: nur spielen.
- In die Niemals-Liste des Raums aufnehmen: *„Nie mitten in der Szene als Lehrer aus der
  Rolle treten (kein 'kleiner Tipp', keine Grammatik-Anmerkung). Die Figur reformuliert
  still und spielt weiter. Korrektur erst am Szenenende oder in der Lektion."*

(Bleibt diese Wand trotzdem durchlässig, eskalieren wir sie später in die Seele — für
jetzt reicht der Raum-Prompt.)

---

## ARREGLO B — Sprechblase + Übersetzungs-Kästchen + 🔊

Genehmigt im Prototyp `prototyp-sprechblase-uebersetzung.html`. Zwei Hälften:

### B1 — Prompt-Vertrag (`gespraech-modus.md`)

Die Muttersprach-Brücke pro Zug bekommt einen klaren, abtrennbaren Block, damit die
Oberfläche sie als ruhiges Kästchen zeigen kann:

- Spikiu schreibt zuerst die **Zielsprache** (das, was gesprochen/gelernt wird).
- Direkt danach die **Übersetzung in die Muttersprache** in DOPPELTEN eckigen Klammern
  auf eigener Linie: `[[ … ]]`. Genau EINE solche Klammer pro Zug, kurz.
  ```
  Buenos días, ¿tiene una reserva?
  [[Guten Morgen, haben Sie eine Reservierung?]]
  ```
- Der Regler nach `koennen` bestimmt weiterhin, OB es eine Brücke gibt: `anfang` fast
  immer, `mittel` nur bei Bedarf, `fortgeschritten` keine (dann KEIN `[[…]]`).
- Fremde Schrift (Griechisch, `fremde_schrift=true`): in `[[…]]` kommen Umschrift UND
  Übersetzung (Drei-Spur-Logik des Readers), ein konsistentes System.
- Das `[[…]]` erklärt Spikiu nie und schreibt es nie in den Fließtext der Figur — es ist
  reines Struktur-Signal (wie `[WECHSEL:…]`). Inline-Emphasis `_kursiv_`/`**fett**` darf
  innerhalb beider Teile weiter benutzt werden.

### B2 — Frontend (`chat.html`)

Stil EXAKT aus `prototyp-sprechblase-uebersetzung.html` (Tokens, Maße, Farben):

- Jede **Spikiu-Nachricht** wird gesplittet:
  - Text AUSSERHALB `[[…]]` → **Sprechblase** (Zielsprache, die Hauptsache), links,
    mit einem **dezenten 🔊** in der Blase. 🔊 ruft `window.spkSpeak(zieltext, zielsprache)`
    (audio.js ist seit P2 eingebunden) — spricht NUR den Zieltext, nie die Übersetzung.
  - Text INNERHALB `[[…]]` → **gedämpftes Übersetzungs-Kästchen** darunter (Muttersprache),
    kleiner, blasser, KEIN Audio. Tokens `--trans-bg/--trans-ink/--trans-border` aus Prototyp.
  - Kein `[[…]]` vorhanden → nur die Blase (z. B. `fortgeschritten`).
- **User-Nachrichten:** grüne Blase, rechts, KEIN 🔊, KEIN Kästchen.
- **🔊 nur bei Spikiu**, nur auf dem Zielsprachen-Teil. Fallback steckt schon in audio.js
  (nie stummer Knopf) — nicht neu bauen.
- Szenen-Rahmung („Imagina: Llegas a un hotel…") darf wie im Prototyp als ruhige,
  zentrierte Notiz erscheinen; ihre Übersetzung folgt demselben `[[…]]`-Kästchen-Prinzip.
- `verlauf` speichert den **rohen** Assistenz-Text (mit `[[…]]`), damit das Modell sein
  bilinguales Format konsistent fortführt; nur die DARSTELLUNG splittet. `[WECHSEL:…]`
  wird wie bisher zuerst extrahiert (darf mit `[[…]]` im selben Zug koexistieren).
- Gilt für ALLE Spikiu-Züge (Opener, Rollenspiel, Häppchen-Übergabe) — eine einheitliche
  Darstellung, nicht nur im Rollenspiel.
- `chat.html`-Regeln: `verlauf` (nie `history`), keine vom Browser belegten Namen,
  Emphasis nur `<em>`.

---

## ABNAHME (alles grün, sonst nicht fertig)

- [ ] **Roleplay-Wand:** In der Szene KEIN „kleiner Tipp"/keine Grammatik-Anmerkung mehr;
      Fehler werden still von der Figur reformuliert, Spiel läuft weiter.
- [ ] **Sprechblase + Kästchen:** Zielsprache als Blase, Muttersprache als gedämpftes
      Kästchen darunter — visuell klar getrennt, kein Text-Wall mehr (Stil = Prototyp).
- [ ] **🔊** in jeder Spikiu-Blase, spricht nur den Zieltext (Piper/Fallback, nie stumm);
      kein 🔊 bei User oder im Übersetzungs-Kästchen.
- [ ] `[[…]]` wird NIE als roher Text gezeigt; fehlt es → saubere Einzel-Blase.
- [ ] `fortgeschritten`: keine Brücke, kein Kästchen (nur Blase).
- [ ] Greek (`fremde_schrift`): Kästchen trägt Umschrift + Übersetzung, ein System.
- [ ] `[WECHSEL:…]` weiter intakt (koexistiert mit `[[…]]`); freier Flur unberührt;
      Häppchen-Flow (P2) unberührt.
- [ ] `node --check` grün (gespraech.js unangetastet; nur chat.html-Inline geprüft);
      nur 2 Dateien geändert (`gespraech-modus.md` + `chat.html`); `vercel.json` unberührt.
- [ ] keine vom Browser belegten Variablennamen; Emphasis nur `<em>`.

---

## AUSDRÜCKLICH NICHT
- KEINE Lektion-Verdrahtung / kein gentle close (= P3).
- `api/gespraech.js` + `api/haeppchen.js` NICHT anfassen.
- Keine neue Audio-Plumbing — `window.spkSpeak` aus P2 wiederverwenden.
- Kein Stripe/Supabase, keine Modelle ins Repo.

---

## DANACH
- **P3 „Die Lektion":** gentle close nach dem Rollenspiel + `chat.html` schreibt
  `verlauf`→`lastConversation` + „als Lektion" real an `/api/generate-lesson` → Dashboard.
- **Kleinkram-Paket 2 (claude.ai):** Genus-Begrüßung Dashboard (es „bienvenido"→
  „Te damos la bienvenida") + Lesebegleiter-`intro`-Kürzung.
