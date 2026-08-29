# AKTUELLER AUFTRAG — DER SZENEN-AUTOMAT

Stand: 29.08.2026 · Erteilt von claude.ai · Für Claude Code (Terminal)

**Ein Auftrag, ein Durchlauf.** Leonardo ist unterwegs. Arbeite durch, melde am
Ende die Testtabelle. Frag nichts.

---

## Warum

Der Szenenzustand liegt heute in fünf globalen Variablen (`szeneAufgaben`,
`szeneOffen`, `szeneZug`, `szeneBeendet`, `spikiuTeilzug`) plus `verlauf`,
`gefuehrt`, `busy`, `TOPIC_ID`, gesetzt an vier Stellen in einer 164-KB-Datei
mit 133 Funktionen. **Es gibt keinen Ort, an dem steht, wie eine Szene
abläuft.** Fünf Reparaturversuche an derselben Stelle haben jeweils eine
weitere globale Variable dazugelegt.

Dieser Auftrag baut den Ablauf als eigenes, prüfbares Ding — **ohne
`chat.html` anzufassen.** Erst wenn er beweisbar richtig ist, hängt später die
Oberfläche daran. Das ist die vereinbarte Reihenfolge.

**Maßstab ist `szene-regeln.md` im Repo-Root.** Lies sie zuerst und ganz. Wo
dieser Auftrag und die Regeln sich widersprechen, gelten die Regeln.

---

## Was gebaut wird

Zwei neue Dateien im **Repo-Root**, beide reines JS, beide ohne DOM, ohne
`fetch`, ohne `localStorage`:

### 1. `szene.js` — der Automat

Exponiert `window.SpikiuSzene` im Browser **und** `module.exports` unter Node
(Muster: `if (typeof module !== 'undefined') module.exports = …`), damit die
Tests ohne Browser laufen.

```
SpikiuSzene.erzeuge({ aufgaben: [...], maxZuege: 6, streng: false })
```

Gibt ein Objekt mit sieben Ereignis-Methoden zurück:

`los()` · `antworte(text, art)` · `spikiuAntwortet(text)` · `netzFehler()` ·
`nochmal()` · `abbrechen()` · `nachHause()`

Jede gibt den **neuen Zustand** zurück:

```
{ phase, fehler, zug, aufgabeIndex, ausgangOffen, vorbei, abgelehnt }
```

- `phase` — eine der vier aus den Regeln
- `fehler` — Merkmal von `wartetAufSpikiu`, keine eigene Phase
- `zug` — Zähler gegen `maxZuege`
- `aufgabeIndex` — welche Aufgabe offen ist (0-basiert)
- `ausgangOffen` — R6: dritte Aufgabe erledigt, „Fertig" darf erscheinen
- `abgelehnt` — Grund als Zeichenkette, wenn das Ereignis nichts bewirkt hat

**`art`** ist `'offen'` | `'rolle'` | `'meta'` und kommt von außen. Der Automat
entscheidet sie nicht (Regeln, Abschnitt „Was der Automat NICHT tut").

**Abgelehnte Ereignisse:** normal (Doppelklick, Zug während
`wartetAufSpikiu`, Zug nach der Ernte) → Zustand unverändert zurück,
`abgelehnt` gesetzt, **kein Wurf**. Bei `streng: true` wirft er stattdessen —
das nutzen die Tests, damit ein still verschluckter Fehler nicht durchrutscht.

**Der Zustand ist unveränderlich nach außen.** Jede Methode gibt eine Kopie
zurück; kein Aufrufer kann in den inneren Zustand hineingreifen. Genau das war
der alte Fehler.

### 2. `frage-sieb.js` — das Sieb

```
SpikiuSieb.art(text, zielsprache, muttersprache)  →  'offen' | 'rolle' | 'meta'
```

Regeln stehen in `szene-regeln.md`, Abschnitt „Das Sieb". Feste Listen für
`es` / `de` / `en` / `el`; Muttersprach-Wendungen für `de` / `es` / `en`.
Rein, ohne Zustand, ohne Netz.

### 3. `szene.test.js` — die Tests

Plain Node, **kein Framework, keine Abhängigkeit**. Läuft mit
`node szene.test.js` und druckt je Fall eine Zeile plus eine Schlusszeile
`x/y grün`. Rückgabewert 1 bei jedem Fehlschlag.

Alle **18 Fälle** aus `szene-regeln.md` müssen als eigener Fall vorkommen.
Dazu für das Sieb mindestens: je fünf echte Rollen-Rückfragen und fünf echte
Meta-Fragen pro Muttersprache, plus die Grenzfälle „Ok", „Sí", „Hallo".

---

## Was du NICHT anfasst

`chat.html` · `gefuehrt.html` · `karten-engine.js` · `lernpfad.js` ·
`lernpfad-daten.js` · `woerter.js` · `sitzung.js` · alle `api/*` · alle
`*-modus.md` · `spikiu-seele.md` · `szene-regeln.md` (nur lesen) ·
`SPIKIU-BUILD-LEDGER.md` · diesen Auftrag.

**Der Automat wird nirgends eingebunden.** Kein `<script src="szene.js">`,
kein Aufruf aus einer HTML-Datei. Er liegt da und ist getestet, mehr nicht.
Das Anhängen der Oberfläche ist ein eigener, späterer Auftrag.

Kein `package.json`, keine npm-Abhängigkeit. Vercel rät den Modultyp aus der
Syntax.

---

## Die zwei Fallen aus der Lernhistorie

**Keine browser-belegten Namen.** Nie `history`, `location`, `name`, `status`,
`top`, `length`, `event` als Variable. Der Verlauf heißt `verlauf`. Teuer
gelernt am 16.06.

**Bei Änderungen nur mit eindeutigen Ankern arbeiten**, nie mit
Zeichenpositionen. So entstanden am 18.08. 51 KB doppelter Code in
`chat.html`. Hier neue Dateien, also unkritisch — aber die Regel gilt.

---

## Ablauf

1. `szene-regeln.md` lesen.
2. `szene.js`, `frage-sieb.js`, `szene.test.js` schreiben.
3. `node --check` auf alle drei.
4. `node szene.test.js` — **so lange, bis alles grün ist.**
5. Wenn ein Test nicht grün wird, weil eine Regel widersprüchlich ist:
   **nicht die Regel biegen, sondern melden.** Der Fall bleibt rot.
6. Committen und pushen:

```
git add szene.js frage-sieb.js szene.test.js
git commit -m "Szenen-Automat + Sieb, kopflos getestet, noch nicht eingebunden"
git pull --rebase origin dev
git push origin dev
```

7. `git status` muss sauber sein. Außer den drei neuen Dateien kein Diff.

---

## Was du meldest

- die Schlusszeile der Tests (`x/y grün`)
- jeden roten Fall mit einem Satz, warum
- jede Stelle, an der `szene-regeln.md` unklar oder widersprüchlich war

**Du fasst das Ledger nicht an.** Das schreibt claude.ai.

---

## Der Satz, mit dem Leonardo dich startet

> Lies AKTUELLER-AUFTRAG.md und arbeite ihn komplett durch. Frag mich nichts,
> melde am Ende nur die Testtabelle.
