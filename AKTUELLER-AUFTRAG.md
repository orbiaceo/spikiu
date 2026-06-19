# AKTUELLER AUFTRAG — für Claude Code

_Geschrieben von Claude (claude.ai, Design) am 19.06.2026 (Teil 12).
Mach NUR diesen Auftrag. Wenn fertig: committen, pushen, Bericht ins Ledger,
diese Datei auf „erledigt" setzen._

---

## TITEL
Menü-Labels entwirren: „Leseraum"→„Lesewerkstatt", „Bücher"→„Meine Bücher".
Reine Label-Änderung in `nav.js` + `taller.html`. Kein neues Verhalten.

## WARUM
Im Drawer stehen „Leseraum" und direkt darunter „Bücher" — beide lesen sich als „hier
liest man", der User stockt: wo lese ich? Lösung: die geführten Räume tragen die
Werkstatt-Familie (Schreibwerkstatt · Lesewerkstatt), „Bücher" wird zur klar besitzanzeigenden
Bibliothek (Meine Bücher). Auto-Prinzip auf die Labels: gleiche Familie = gleicher Raum-Typ.

## SCOPE (NUR Labels — zwei Dateien)

### 1. `nav.js` — I18N-Labels (drei Sprachblöcke)
- Eintrag `read`:
  - de: `Leseraum` → `Lesewerkstatt`
  - es: `Taller de lectura`  (bleibt unverändert)
  - en: `Reading Room` → `Reading Workshop`
- Eintrag `books`:
  - de: `Bücher` → `Meine Bücher`
  - es: `Libros` → `Mis libros`
  - en: `Books` → `My Books`
- NICHTS sonst anfassen: keine STRUCT-Reihenfolge, keine Icons, keine hrefs, keine getActive-Logik.

### 2. `taller.html` — Raum-Label (TXT-Objekt, `room`)
- `room`-Wert je Sprache setzen:
  - de: `Lesen` → `Lesewerkstatt`
  - es: `Lectura` → `Taller de lectura`
  - en: (aktuell) → `Reading Workshop`
- Der Rest des TXT-Objekts (mc/orden/frei/check/…) bleibt unverändert.
  `roomName` wird bereits per Muttersprache gesetzt — nur die Werte ändern.

## ABNAHME-KRITERIEN
1. Drawer (DE) zeigt in HAUPT: Dashboard · Jetzt sprechen · Schreibwerkstatt · **Lesewerkstatt**
   · **Meine Bücher** · Live-Begegnungen · Lektionen · Gym. Keine zwei „Lese…"-Einträge mehr verwechselbar.
2. Sprachwechsel stimmt: ES „Taller de lectura" / „Mis libros", EN „Reading Workshop" / „My Books".
3. `taller.html`-Kopfzeile zeigt „Lesewerkstatt" (DE), „Taller de lectura" (ES), „Reading Workshop" (EN).
4. UNANGETASTET: alle anderen Labels/Seiten/Logik. `node --check nav.js` + taller.html-Inline-Script grün.

## HINWEISE
- `nav.js` ohne Versions-Query geladen → zum Testen hart neu laden (Strg+Shift+R).
- Verbotene Variablennamen meiden (kein `history`/`location`/… als Variable).

## ABNAHME-TEST (kurz)
Beliebige App-Seite hart neu laden → Hamburger → „Schreibwerkstatt / Lesewerkstatt / Meine Bücher"
sauber getrennt. `taller.html?v=N` → Kopfzeile „Lesewerkstatt". Sprache umstellen → Labels wechseln.

## VERIFIKATION VOR COMMIT (Leonardo)
```
grep -c "Lesewerkstatt" nav.js taller.html
grep -c "Meine Bücher" nav.js
grep -c "Mis libros" nav.js
node --check nav.js && echo OK
```

---

_Status: ERLEDIGT am 19.06.2026 (Teil 12) · commit 2e7ccd4 · kein offener Auftrag._
_nav.js read→Lesewerkstatt/Reading Workshop (es unverändert), books→Meine Bücher/Mis libros/My Books;
taller.html room→Lesewerkstatt/Taller de lectura/Reading Workshop. Abnahme grün (jedes Label 1×/Datei,
alte Labels 0×, node --check nav.js + beide Inline-Scripts OK). Nicht live geklickt (nav.js cacht → hart neu laden)._
