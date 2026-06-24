# AUFTRAG — erledigt am 24.06.2026 · kein offener Auftrag

Letzter Auftrag: **Sitzungs-Persistenz — keine Arbeit geht durch einen Fehl-Tipp verloren** (Teil 59).
Vollständig erledigt + auf `origin/dev` gepusht. Details im `SPIKIU-BUILD-LEDGER.md` (oberste „Stand:"-Zeile).

Geliefert:
1. NEU `sitzung.js` — Root-Helfer `window.spikiuSitzung` (lade/speichere/raeume + `frageWiederkommen`-Karte, lebendiger Capy, i18n de/es/en, localStorage `spikiu_sitzung:<raum>`).
2. `taller.html` angeschlossen — ganzes taller-JSON + Fortschritt (mc/orden/frei) + touched/total; Wiederkommen-Karte, „Weiter" ohne API-Call; raeume bei Noch-ein-Text/Genug/Abschluss.
3. `schreibwerkstatt.html` angeschlossen — verlauf+Text+Entwurf+letzter Lektor-Zug; Wiederkommen-Karte; raeume bei Neustart/Ziellinie.
4. `CLAUDE.md` — stehende Regel „SITZUNGS-PERSISTENZ (Pflicht für jeden Raum)".

Verifiziert: headless 28/28 (eigener CDP-Treiber, `/api/*` gestubbt), `node --check` grün, Screenshot der Karte.

ABNAHME-REST (Leo auf dev/Gerät): siehe Ledger-Stand-Zeile.

DANACH (eigene Pakete, NICHT in diesem Auftrag):
- Gleiche Persistenz in Gespräch-Reel (`chat.html`, dick) + Gym.
- Zwei Knopf-Bugs (taller „Weiter" nach Selbst-sagen · schreibwerkstatt „offene Maske") — gewünschtes Verhalten erst mit Leo pinnen, dann gezielter Fix.
