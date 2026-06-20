# /start — Bau-Sitzung sauber starten

Fahre das vollständige Start-Protokoll für eine Bau-Sitzung. Baue NICHTS, bevor Schritt 1–4 erledigt sind.

1. Lies in dieser Reihenfolge: `CLAUDE.md`, dann `SPIKIU-BUILD-LEDGER.md`, dann `AKTUELLER-AUFTRAG.md`.
2. Lies die oberste „Stand:"-Zeile des Ledgers laut vor und nenne den höchsten Teil.
3. Prüfe den ECHTEN Stand auf `origin/dev` (NICHT aus Erinnerung oder Project-Snapshot):
   `git fetch origin dev -q && git ls-tree -r --name-only origin/dev`
4. Bestätige mir in EINEM Satz, welcher Auftrag gerade aktiv ist (Titel aus `AKTUELLER-AUFTRAG.md`), BEVOR du baust.
5. Baue dann NUR diesen einen Auftrag — nichts anderes, kein Stapeln, keine erfundenen Schritte.
6. Stack-Regeln einhalten: `export default`, Pfade über `process.cwd()`, KEIN `import.meta`, `.js` nicht `.mjs`, Naming „Spikiu", `vercel.json` `includeFiles` deckt `*.md` ab, keine Browser-reservierten Variablennamen (history/location/name/status/top/length/event).
7. Sitzungsende (eiserne Regel): commit → pull --rebase → push, Bericht ins Ledger, Auftrag schließen. Keine Sitzung endet mit uncommittetem Code.
