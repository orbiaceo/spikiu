# AKTUELLER AUFTRAG — DIE SPIELKISTE

Stand: 01.10.2026 · Erteilt von claude.ai · Für Claude Code (Terminal)

**Ein Auftrag, ein Durchlauf.** Frag nichts, melde am Ende, was gebaut wurde.
(Der Schattenlauf vom 29.08. ist erledigt: gescheitert, ersetzt, siehe Ledger 30.08.)

---

## Warum

Leo hat am 29.09.–01.10. im Prototyp **`giros-spielplatz-prototyp.html`** (Root, dev)
sieben kleine Spiele getestet. Vier bleiben: **Piñata, Globos, Al pie de la letra,
Gemelos.** Sie lockern jede Einheit auf. Alle laufen mit **null Token** aus Daten,
die schon im Repo liegen. **Der Prototyp ist die Vorlage für Aussehen und Verhalten.**
Öffne ihn zuerst und spiel jedes der vier Spiele einmal durch.

---

## Was gebaut wird

### A. `juegos.js` (NEU, Root) — ein Motor, drei Orte

Muster wie `uebung.js`: IIFE, `window.spikiuJuegos`, eigener CSS-Namensraum `jg-`
(CSS injiziert das Modul selbst, einmal). Kein Netz, keine KI.

```js
var el = window.spikiuJuegos.pinata(daten, opts);   // → DOM-Element
el.addEventListener('jg-done', function(e){ /* e.detail.ok */ });
el.stop();   // rAF-Schleifen beenden, wenn die Karte verlassen wird
```

Vier Funktionen: `pinata`, `globos`, `literal`, `gemelos`.
`opts = { nativeLang:'de'|'es'|'en' }` → **alle Anweisungen in der Muttersprache**
(dreisprachige UI-Tabelle wie in `uebung.js`). Die Spielwörter selbst stehen in
Lora (Zielsprache), Anweisungen in DM Sans.

| Spiel | `daten` | Verhalten (wie Prototyp) |
|---|---|---|
| `pinata` | `{ satz, intruso, intrusoDe }` | „¡Dale!" → Stern-Piñata platzt, Konfetti, Wörter des Satzes + 1 Eindringling fallen **langsam**. Tippen auf Eindringling = richtig. Erreicht er den Boden, **fängt Spikiu ihn auf** (kein Verlieren). Danach: Satz setzt sich zusammen, darunter „*X* gehört zu *intrusoDe*" (wenn vorhanden). |
| `globos` | `{ satz }` | Wörter steigen in Ballons auf, schlängeln leicht, kommen unten wieder. In Satzreihenfolge antippen. Falsch = Ballon wackelt, sanfter Hinweis. |
| `literal` | `{ text, woertlich, bedeutung, falsch:[2], icon }` | Oben das OpenMoji-Icon (`bilder/om-*.svg`, wie `proverbios.html`) + der Satz + „wörtlich: …". Drei Bedeutungen zur Wahl. Falsche Wahl wird ausgegraut, mit Hinweis, wem sie gehört. |
| `gemelos` | `[{ z, na }] × 4` | Zwei Spalten (Zielsprache / Muttersprache, rechts gemischt). Links + rechts antippen → Paar wird grün, sonst kurz orange. |

**Eiserne Regeln für alle vier:** kein Punktestand, kein Timer-Zähler, kein „Game over",
keine Glückwunsch-Feuerwerke außer dem Piñata-Konfetti. `prefers-reduced-motion`
respektieren (Fallen/Steigen → Wörter erscheinen ruhig an ihrem Platz).
Das Maskottchen heißt in jedem Text **Spikiu**. SVG kanonisch aus `index.html` kopieren.

### B. Übung → 4. Kachel „Spiele" (`haus.html` + `spiele.html` NEU)

- `haus.html` `roomUebung()`: vierte Kachel **„Spiele"** · ss „Kurz und leicht" ·
  Farbe aus der vorhandenen Palette, die noch frei ist. Ziel `spiele.html`.
  Layout: die vier Kacheln im 2×2-Raster (prüfen, dass `tileEl`/Grid das trägt).
- `spiele.html`: Raum mit Zurück-Pfeil (keine Bottom-Nav). Zwei Türen:
  **Piñata · Globos.** Jede Runde zieht einen Satz für die Zielsprache des Profils:
  - aus `sprichwort.js` (Sprichwörter + `wendungen`) **und**
  - aus `wortschatz.js` (die Beispielsätze `text`).
  - Eindringling = ein Inhaltswort (≥4 Buchstaben) aus einem **anderen** Satz derselben
    Zielsprache; bei Wendungen `intrusoDe` = dieser andere Satz.
- Nach jeder Runde: „seguir ›" (nächster Satz) und „Genug für heute".
- **Sitzungs-Persistenz** über `sitzung.js` (Schlüssel `spikiu_sitzung:spiele`), wie in CLAUDE.md.
- Sprachwache wie in `gym.html`: nur Daten der eigenen Zielsprache.

### C. Bibliothek → Wendungen & Sprichwörter (`proverbios.html`)

Heute folgt auf jede Karte eine `uebung.js`-Übung. Neu: **jede dritte Übung ist ein
Spiel**, abwechselnd `literal` und `gemelos`.
- `literal` aus dem aktuellen Eintrag: `woertlich = w[native]`, `bedeutung = t[native]`,
  zwei falsche = `t[native]` zweier anderer Einträge, `icon` wie die Karte.
- `gemelos`: aktueller Eintrag + 3 zufällige derselben Zielsprache, `z = text`, `na = t[native]`.
- Swipe/Weiter-Regeln der Raumseite unverändert; `el.stop()` beim Verlassen.

---

## Was NICHT gebaut wird

- **Kein Eingriff in `chat.html` oder `gefuehrt.html`.** Das Spiel am Sitzungsende
  (Tür „¿Una piñata para cerrar?" mit der Ernte) ist ein eigener späterer Auftrag.
- Keine neuen Daten erfinden. Fehlt einem Eintrag `w` oder `t[native]`, wird er für
  `literal`/`gemelos` übersprungen.
- `giros-spielplatz-prototyp.html` bleibt unangetastet.

## Abnahme

1. `node --check juegos.js` + alle Inline-Scripts grün.
2. Haus → Übung zeigt vier Kacheln; „Spiele" öffnet `spiele.html`; Piñata und Globos
   laufen für `es` und `de` als Zielsprache, UI in der Muttersprache.
3. In `proverbios.html` erscheint spätestens bei der dritten Übung ein Spiel.
4. Am Handy (360 px): kein horizontales Scrollen, Wörter bleiben im Feld.
5. grep: kein „Capy" in sichtbarem Text der neuen/angefassten Dateien.

## Was du meldest

Dateien + Größen · Anker (Funktionsnamen) in `haus.html`/`proverbios.html` · Syntaxcheck ·
alles, was nicht zum Auftrag passte (als „FRAGE AN DESIGN").
Danach Commit, `git pull --rebase origin dev`, `git push origin dev`, Ledger-Eintrag,
diesen Auftrag auf „erledigt" setzen.

---

## Der Satz, mit dem Leonardo dich startet

> Lies AKTUELLER-AUFTRAG.md und arbeite ihn komplett durch. Frag mich nichts.
