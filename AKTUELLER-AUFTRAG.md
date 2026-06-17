# AKTUELLER AUFTRAG — für Claude Code

_Geschrieben von Claude (claude.ai, Design) am 17.06.2026.
Mach NUR diesen Auftrag. Wenn fertig: committen, pushen, Bericht ins Ledger,
diese Datei auf „erledigt" setzen._

---

## TITEL
`_kursiv_`-Brücke in `chat.html` sichtbar als Kursiv rendern.

## WARUM
Im Freien Gespräch (`/api/gespraech`) liefert Spikiu die Muttersprach-Brücke kursiv
gemeint, aber mit Unterstrichen drumherum, z. B.:
```
¡Hola! Qué bueno verte.
_Hallo! Schön, dich zu sehen._
```
Die Render-Funktion `fmt()` in `chat.html` wandelt nur `*so*` in `<em>`, nicht `_so_`.
Folge: die Unterstriche stehen als Zeichen sichtbar im Text. Soll als echtes Kursiv
erscheinen, ohne Unterstriche.

## SCOPE (NUR das)
- Datei: `chat.html`, Funktion `fmt()`.
- `_text_` → `<em>text</em>` rendern, analog zur bestehenden `*text*`-Regel.
- Sonst nichts ändern. Kein anderer Code, keine andere Datei.

## ABNAHME-KRITERIEN (so ist „fertig" definiert)
1. Eine Spikiu-Zeile wie `_Hallo!_` erscheint im Chat als Hallo! (kursiv), OHNE
   sichtbare Unterstriche.
2. Bestehendes `*so*`-Kursiv und `**so**`-Fett funktionieren weiter.
3. Unterstriche MITTEN in einem Wort (z. B. `el_perro`, Datei-/Variablennamen) werden
   NICHT zu Kursiv zerschnitten — nur paarweise umschlossene Phrasen.
4. Kein Unterstrich bleibt als rohes Zeichen sichtbar, wenn er als Paar gemeint war.
5. Node-Syntaxcheck des Inline-Scripts läuft sauber.

## ABNAHME-TEST (kurz)
Auf der dev-URL `chat.html?v=N` öffnen, „Hola" tippen. Spikius Antwort enthält die
deutsche Brücke kursiv, ohne Unterstriche.

---

## ✅ STATUS: ERLEDIGT am 17.06.2026

Umgesetzt in `chat.html` → `fmt()`, eine Zeile nach der `*kursiv*`-Regel:
```js
s = s.replace(/(^|[^\w])_(?=\S)([^_\n]*?\S)_(?!\w)/g,'$1<em>$2</em>');
```
Die Regel greift nur paarweise an Wortgrenzen: das öffnende `_` muss am Zeilen-/
Stringanfang oder hinter einem Nicht-Wort-Zeichen stehen, das schließende `_` darf
kein Wort-Zeichen direkt folgen. Damit bleibt `el_perro` / `datei_name` unberührt
(Kriterium 3), mehrzeilige Brücken funktionieren (das `\n` vor `_` zählt als Grenze,
weil die Regel VOR `\n`→`<br>` läuft).

Verifiziert: alle 5 Kriterien per Node-Funktionstest grün, Inline-Script syntaxgeprüft.
**LIVE BESTÄTIGT 17.06.** auf dem dev-Deploy — Brücke erscheint kursiv (Spikiu setzt sie
in Klammern), keine sichtbaren Unterstriche. Endpoint-Gegenprobe (koennen=anfang) zeigte
die Brücke als `_…_`, fmt() rendert sie zu `<em>`. Committet + nach `origin/dev` gepusht.

_Kein offener Auftrag mehr._
