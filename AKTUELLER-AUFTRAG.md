# AKTUELLER AUFTRAG — für Claude Code

_Geschrieben von Claude (claude.ai, Design) am 18.06.2026 (Teil 7).
Mach NUR diesen Auftrag. Wenn fertig: committen, pushen, Bericht ins Ledger,
diese Datei auf „erledigt" setzen._

---

## TITEL
„Schreibwerkstatt" als Eintrag ins Hamburger-Menü (`nav.js`) — schließt die Menü-Lücke
(Ledger Offene-Punkte 7).

## WARUM
Alle App-Seiten tragen den Drawer, aber `nav.js` STRUCT hat KEINEN Eintrag für die
Schreibwerkstatt → aus dem Menü kommt man nicht zur Werkstatt. Das ist eine reine
`nav.js`-Inhaltsänderung (wirkt auf ALLE Seiten — genau gewollt). Die Schreibwerkstatt ist
der stille Zwilling zum Sprechen, also sitzt sie direkt unter „Jetzt sprechen".

## SCOPE (NUR nav.js — VIER chirurgische Änderungen)

1. **I18N — neuen Schlüssel `write` in alle drei Sprachblöcke** (zum bestehenden Objekt, in dem
   `talk`/`books`/… stehen):
   - Deutsch:  `write: 'Schreibwerkstatt'`
   - Español:  `write: 'Taller de escritura'`
   - English:  `write: 'Writing Workshop'`

2. **ICON — Eintrag `write` ins `ICON`-Objekt** (Stift, im selben Linien-Stil wie die anderen,
   `fill="none"`/`stroke=currentColor` kommt vom Wrapper):
   ```
   write: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
   ```

3. **STRUCT — Eintrag in der `main`-Sektion, DIREKT NACH `talk`, VOR `books`:**
   ```
   { id: 'talk',  href: 'chat.html' },
   { id: 'write', href: 'schreibwerkstatt.html' },
   { id: 'books', href: 'books.html' },
   ```

4. **getActive() — Aktiv-Erkennung** für die Werkstatt-Seite. Direkt nach der `chat`→`talk`-Zeile:
   ```
   if (f.indexOf('chat') === 0) return 'talk';
   if (f.indexOf('schreibwerkstatt') === 0) return 'write';
   ```

## ABNAHME-KRITERIEN („fertig" ist messbar)
1. Drawer zeigt (auf jeder App-Seite) unter „Jetzt sprechen" einen neuen klickbaren Eintrag mit
   Stift-Icon, der nach `schreibwerkstatt.html` führt.
2. Das Label wechselt mit der Muttersprache: DE „Schreibwerkstatt", ES „Taller de escritura",
   EN „Writing Workshop" (Test: `localStorage.spikiu_lang` bzw. `profile.nativeLang` umstellen).
3. Auf `schreibwerkstatt.html` ist der Eintrag als **aktiv** markiert (`spk-active`).
4. Alle anderen Menü-Einträge unverändert (dashboard, talk, books, sessions, lessons, gym, path,
   verlauf, settings) — Reihenfolge + Labels gleich.
5. UNANGETASTET: jede HTML-Seite, alle anderen Dateien. Nur `nav.js` wird angefasst.
6. `node --check nav.js` läuft sauber.

## HINWEISE
- `nav.js` wird von den Seiten ohne Versions-Query geladen → Browser/Vercel cachen es.
  Zum Testen **hart neu laden** (Strg+Shift+R) oder Inkognito, sonst siehst du die alte Navi.
- KEIN neuer Sprachschalter, keine STRUCT-Umsortierung außer dem einen Insert.
- Verbotene Variablennamen meiden (kein `history`/`location`/`name`/… als VARIABLE).

## ABNAHME-TEST (kurz)
`schreibwerkstatt.html?v=N` hart neu laden → Hamburger → im Drawer steht „Schreibwerkstatt"
unter „Jetzt sprechen", als aktiv markiert → Klick führt zurück auf die Werkstatt. Dann auf
`dashboard.html` denselben Eintrag sehen (dort NICHT aktiv). Sprache umstellen → Label wechselt.

## VERIFIKATION VOR COMMIT (Leonardo)
```
grep -c "Taller de escritura" nav.js     # 1
grep -c "Writing Workshop" nav.js        # 1
grep -c "id: 'write'" nav.js             # 1
node --check nav.js && echo OK
```

---

_Status: OFFEN — bereit zum Bau._
