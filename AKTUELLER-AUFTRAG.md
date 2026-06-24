# AUFTRAG — erledigt am 25.06.2026 · kein offener Auftrag

Letzter Auftrag: **„Chat-Reel an sitzung.js: das Gespräch geht nie verloren"** (Teil 62).
Vollständig erledigt + auf `origin/dev` gepusht. Details im `SPIKIU-BUILD-LEDGER.md` (oberste „Stand:"-Zeile).

Geliefert (1 Datei: `chat.html`, Raum-Schlüssel `'gespraech'`):
1. `sitzung.js` synchron vor dem Haupt-Script geladen.
2. `sitzungSpeichern()` (entprellt ~350 ms) sichert `{verlauf, gefuehrt, topicLabel, zielsprache}` nach jedem Zug (User/Assistant/Seed/mismoTema).
3. `gespraechRaeumen()` bei Lektion-Erzeugen (nach pending-Persist) + „Von vorn"; NICHT bei „Nein danke".
4. Eintritt `startGespraech()` → `frageWiederkommen` bei `verlauf>=2`, sonst normaler Opener.
5. `sitzungWiederherstellen(s)` baut den Dialog Anzeige-only als Reel-Folien neu (kein API-Call, kein Doppel-Push) + frische Eingabe → nahtlos weiter.

Abnahme: alle Häkchen erfüllt — headless 21/21 (eigener CDP-Treiber, `/api/*` gestubbt), `node --check` grün, Screenshot der Karte.

ABNAHME-REST (Leo auf dev/Gerät): siehe Ledger-Stand-Zeile.

DANACH (Phase 2, NICHT in diesem Auftrag):
- Exaktes Stage-/Häppchen-Resume · geräteübergreifend via Supabase · „3 → 4 capítulos"-Fix · Flip-Karten-Bau abnehmen · Legal zuletzt.
