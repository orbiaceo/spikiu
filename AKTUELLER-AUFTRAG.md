# AKTUELLER-AUFTRAG — erledigt am 22.06.2026 · kein offener Auftrag

**Zuletzt:** „Untere Navigation" (Paket 2 der Design-Welle „Neuer Look") — GEBAUT + auf dev
(commit e86eef5). Siehe `SPIKIU-BUILD-LEDGER.md` (Stand-Zeile + DATEI-STATUS `nav.js`).

`nav.js` komplett umgebaut: Hamburger/Drawer/Backdrop raus → feste untere 5-Tab-Leiste
(Start · Reader · GESPRÄCH = erhöhter vollständiger Capy, belebt via `spkCapyAlive` ·
Werkstatt-Sheet · Mein-Sheet); Topbar nur noch Marken-Logo; `--spk-navh` gemessen;
Layout-Abgleich auf chat.html (`.app` Höhe) + dashboard/books/sessions/schreibwerkstatt/
taller (`body padding-bottom`). Headless beide Modi `ok:true`; `node --check nav.js` grün.
Alle alten Drawer-Ziele in 5 Tabs + 2 Sheets erhalten.

## ABNAHME-REST (Leo auf dev/Gerät — nicht headless prüfbar)
- Leiste + aktiver Tab auf allen 6 echten Seiten; Mitte-Capy atmet/blinzelt/Blick/Hüpft am Touch-Gerät.
- chat.html: Eingabefeld voll nutzbar über der Leiste; untere iPhone-Safe-Area sauber.
- Sheets (Werkstatt/Mein) fühlen sich gut an; alle Ziele erreichbar.

## FRAGEN AN DESIGN (im Ledger vermerkt)
- (a) `learnraum.html` lädt auch `nav.js`, stand NICHT in der Auftrags-Seitenliste → bekommt
  die neue Leiste, aber KEINEN Padding-Abgleich (bewusst nicht angefasst). Retten oder retire?
- (b) „Einstellungen" hat keine Zielseite → bleibt disabled+„bald" (wie alter Drawer). Eigene
  Settings-Seite = späteres Paket?

## NÄCHSTES (Design-Welle, erst nach Auftrag)
- Paket 3 „Baum" (`prototyp-baum-lebt.html`): statischen Dashboard-Baum durch den wachsenden ersetzen.
- Danach Memoria / Voz / Reel táctil.
