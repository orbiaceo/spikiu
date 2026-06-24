# AUFTRAG — erledigt am 25.06.2026 · kein offener Auftrag

Letzter Auftrag: **„Häppchen aus der festen DB statt API-Call (4 Themen × es/de/en/el)"** (Teil 64).
Vollständig erledigt + auf `origin/dev` gepusht. Details im `SPIKIU-BUILD-LEDGER.md` (oberste „Stand:"-Zeile).

Geliefert (1 Datei geändert: `chat.html`; `haeppchen-db.js` lag schon auf dev):
1. `<script src="haeppchen-db.js"></script>` synchron vor dem Haupt-Script.
2. `TOPICS` um `id` (hotel/taxi/restaurant/cafe), `var TOPIC_ID`, `pickTopic(label, id)`, Reset in `otroTema`.
3. Sitzungs-Persistenz (Teil 62): `topicId` mitgesichert + beim Wiederherstellen gesetzt.
4. `loadHaeppchen`: feste DB zuerst (kein API-Call/kein Spinner), `/api/haeppchen` bleibt Fallback für Frei-Themen.

Abnahme: alle Häkchen erfüllt — headless 11/11 (eigener CDP-Treiber, `/api/haeppchen` gezählt: 0 bei DB-Themen, 1 bei Frei-Thema), `node --check` grün (haeppchen-db.js + chat.html). Alle 4 Themen × es/de/en/el geprüft (5 Wörter + 2 Hören, el-Lautschrift).

ABNAHME-REST (Leo auf dev/Gerät): siehe Ledger-Stand-Zeile (Audio-Qualität + Gerät).

DANACH (NICHT in diesem Auftrag):
- Token-Paket A: gespraech Gleit-Fenster (letzte ~10–12 Nachrichten + Seed) + Sprechen-Cap (~6–8 Züge → gentle close). „Schreib etwas" BLEIBT.
- (fix) Dashboard „3 → 4 capítulos".
- (anderes Chat, NUR Notiz) Reader auf Englisch + Griechisch.
