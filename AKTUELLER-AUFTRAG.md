# AUFTRAG — erledigt am 27.06.2026 · kein offener Auftrag

Letzter Auftrag: **„Token-Paket A — gespraech-Gleit-Fenster + Sprechen-Cap"** (Teil 66).
Vollständig erledigt + auf `origin/dev` gepusht. Design-Weg **(a)** (kleinster Eingriff,
Backend unberührt). Details im `SPIKIU-BUILD-LEDGER.md` (oberste „Stand:"-Zeile).

Geliefert (1 Datei geändert: `chat.html`; `api/gespraech.js` + `gespraech-modus.md` UNBERÜHRT):
1. Konstanten `GESP_WINDOW=12`, `GESP_CAP=6`, `CLOSE_HINT` (stille Regie-Anweisung) beim `ENDPOINT`.
2. **Gleit-Fenster** (`fenster()` vor `alternate()` in `callGespraech`): ausgehend nur Seed +
   letzte 12 Nachrichten, user-first; `verlauf` selbst nie gekürzt → Anzeige/`sitzung.js` unberührt.
3. **Sprechen-Cap**: nur bei `gefuehrt`; ab 6 Spikiu-Zügen `CLOSE_HINT` an die ausgehende letzte
   User-Nachricht (NEUES Objekt, nie in `verlauf`) → Modell setzt reguläres `[SZENENENDE]`.
4. Freier Flur/„Schreib etwas…" unberührt (kein Cap, kein Seed-Prepend).

Abnahme: `node --check` aller chat.html-Script-Blöcke grün; deterministischer Logik-Test
(DOM-frei, dieselbe fenster+cap-Logik) **13/13 GRÜN**.

ABNAHME-REST (Leo auf dev/Gerät): echter-Browser-/Geräte-Lauf (CDP gegen gestubbtes
`/api/gespraech`, ausgehenden Body zählen wie Teil 64) + Gefühl des sanften Abschlusses live.

DANACH (NICHT in diesem Auftrag):
- (fix) Dashboard „3 → 4 capítulos".
- (anderes Chat, NUR Notiz) Reader auf Englisch + Griechisch.
