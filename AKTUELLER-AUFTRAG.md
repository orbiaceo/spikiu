# AKTUELLER AUFTRAG — DER SCHATTENLAUF

Stand: 29.08.2026 · Erteilt von claude.ai · Für Claude Code (Terminal)

**Ein Auftrag, ein Durchlauf.** Leonardo ist unterwegs. Frag nichts, melde am
Ende, was gebaut wurde.

---

## Warum kein Tausch, sondern ein Schatten

`szene.js` ist mit 66/66 kopflos bewiesen. Was **nicht** bewiesen ist: dass die
Übersetzung vom alten Verhalten in `chat.html` ins neue stimmt. Zählt
`lernerZuege()` dasselbe wie `zug` im Automaten? Rückt `szeneOffen` im selben
Moment vor wie `aufgabeIndex`? Genau dort würde ein Fehler sich verstecken, und
`chat.html` ist inzwischen **203 KB** und trägt auch den geführten Modus.

Deshalb: Der Automat läuft **mit**, ändert **nichts**, und **meldet
Abweichungen**. Leonardo spielt eine Szene am Gerät. Keine unerklärte
Abweichung → der Tausch ist danach langweilig. Der Tausch selbst ist ein
eigener, späterer Auftrag.

---

## Was gebaut wird

**EINE Datei: `chat.html`.** Sonst nichts.

### 1. Die zwei Helfer laden

Synchron vor dem Haupt-Script, nach dem Muster von `sitzung.js`:

```html
<script src="szene.js"></script>
<script src="frage-sieb.js"></script>
```

### 2. Der Schatten-Automat

Neben den bestehenden fünf Globalen (`szeneBeendet`, `szeneAufgaben`,
`szeneOffen`, `szeneZug`, `spikiuTeilzug`) — die **alle unverändert bleiben** —
eine einzige neue Variable:

```js
var schatten = null;        // SpikiuSzene-Instanz, läuft nur mit
var schattenFunde = [];     // gesammelte Abweichungen
```

**In `szeneAufgabenLaden()`**, ganz am Ende, zusätzlich:

```js
schatten = (window.SpikiuSzene && szeneAufgaben.length)
  ? window.SpikiuSzene.erzeuge({ aufgaben: szeneAufgaben, maxZuege: SZENE_ZUG_DECKEL })
  : null;
schattenFunde = [];
```

Danach einmal `schatten.los()` an der Stelle, an der die Szene wirklich
beginnt (dort, wo heute der Themen-Wunsch als erster user-Eintrag rausgeht).

**Bei jedem Zug des Lerners** (dort, wo der user-Eintrag in `verlauf`
gepusht wird): Sieb fragen, Automat füttern.

```js
if (schatten){
  var art = window.SpikiuSieb
    ? window.SpikiuSieb.art(text, zielsprache, muttersprache)
    : 'offen';
  schatten.antworte(text, art);
}
```

**Bei jeder Antwort Spikius** (nach `szeneOffen = Math.min(…)`, also an der
Stelle, an der die alte Rechnung fertig ist):

```js
if (schatten){
  var z = schatten.spikiuAntwortet(shown || '');
  vergleiche(z);
}
```

Bei `netzFehler` / `showError` entsprechend `schatten.netzFehler()`, beim
Abbruch `schatten.abbrechen()`.

### 3. Der Vergleich

```js
function vergleiche(z){
  if (!z) return;
  if (z.aufgabeIndex !== szeneOffen) merke('Aufgabe', szeneOffen, z.aufgabeIndex);
  if (z.zug !== szeneZug)            merke('Zug',     szeneZug,   z.zug);
  var altVorbei = (szeneOffen >= szeneAufgaben.length || szeneZug >= SZENE_ZUG_DECKEL);
  var neuVorbei = (z.phase === 'ernte' || z.ausgangOffen);
  if (altVorbei !== neuVorbei)       merke('Ende',    altVorbei,  neuVorbei);
}
```

`merke(was, alt, neu)` hängt einen Eintrag an `schattenFunde` — **und
vermerkt dazu die zuletzt gesiebte Art.** Das ist entscheidend, siehe unten.

### 4. Die Anzeige — nur mit `?dev=1`

Am Ende der Szene (in `renderReelSchluss`, unterhalb der Ernte) eine schlichte
Zeile, **nur wenn `?dev=1` gesetzt ist**, sonst gar nichts:

- keine Abweichung → `Schatten: einig ✓`
- sonst je Fund eine Zeile: `Aufgabe alt=2 neu=1 (Sieb: rolle)`

Kleine Schrift, gedämpft, kein Kasten, keine Farbe. Es ist ein Messgerät, kein
Bauteil. Ohne `?dev=1` ist der Schattenlauf für den Nutzer **vollständig
unsichtbar**.

---

## Die Abweichungen, die ERWARTET sind

Das ist der Kern des Auftrags — verwechsle sie nicht mit Fehlern.

Die alte Logik rückt bei **jedem** Zug eine Aufgabe vor
(`szeneOffen = Math.min(lernerZuege(), …)`). Der Automat rückt nach **R13**
nur bei `art === 'offen'` vor. Sagt das Sieb also `rolle` oder `meta`, **muss**
eine Abweichung erscheinen — das ist die neue Regel, die sichtbar wird, nicht
ein Bug.

Deshalb steht bei jedem Fund die gesiebte Art dabei. Die Auswertung lautet:

- Fund **mit** `(Sieb: rolle)` oder `(Sieb: meta)` → **erwartet.** R13 wirkt.
- Fund **mit** `(Sieb: offen)` → **unerklärt.** Da stimmt die Übersetzung nicht.

---

## Was du NICHT anfasst

`szene.js` · `frage-sieb.js` · `szene.test.js` · `szene-regeln.md` ·
`gefuehrt.html` · `karten-engine.js` · alle `api/*` · alle Prompts · das
Ledger · diesen Auftrag.

**In `chat.html` selbst:** keine der fünf Globalen entfernen, keine Zuweisung
an sie ändern, `lernerZuege()` unberührt, `renderOptionen`/`renderEndMenu`/
`extractKarte`/den ganzen geführten Zweig unberührt. **Der Schatten liest, er
schreibt nie.** Fällt der Schattenlauf aus (Helfer fehlt, Ausnahme), läuft die
Szene wie heute weiter — alles in `try/catch`, nie werfend.

---

## Die zwei Fallen aus der Lernhistorie

**Nur mit eindeutigen Ankern arbeiten, nie mit Zeichenpositionen.** So
entstanden am 18.08. 51 KB doppelter Code in genau dieser Datei.

**Keine browser-belegten Namen.** Nie `history`, `location`, `name`, `status`,
`top`, `length`, `event` als Variable.

---

## Ablauf

1. `szene-regeln.md` lesen (R13 und der Abschnitt „Das Sieb").
2. `szene.js` überfliegen — welche Rückgabefelder es wirklich gibt.
3. `chat.html` ändern.
4. `node --check` auf **alle** Inline-Script-Blöcke von `chat.html`.
5. **Größenprobe: `chat.html` darf um höchstens 6 KB wachsen.** Mehr heißt,
   dass etwas doppelt drin ist — dann anhalten und melden.
6. Committen und pushen:

```
git add chat.html
git commit -m "Schattenlauf: Automat laeuft mit, aendert nichts, meldet Abweichungen"
git pull --rebase origin dev
git push origin dev
```

7. `git status` sauber, außer `chat.html` kein Diff.

---

## Was du meldest

- die Dateigröße vorher und nachher
- an welchen Ankern du eingehängt hast (Funktionsnamen, nicht Zeilennummern)
- ob `node --check` auf allen Blöcken grün war
- alles, was in `chat.html` nicht zum Auftrag passte

**Du fasst das Ledger nicht an.** Das schreibt claude.ai.

---

## Der Satz, mit dem Leonardo dich startet

> Lies AKTUELLER-AUFTRAG.md und arbeite ihn komplett durch. Frag mich nichts.
