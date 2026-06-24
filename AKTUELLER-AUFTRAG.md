# AUFTRAG — erledigt am 25.06.2026 · kein offener Auftrag

Letzter Auftrag: **„Lektion geht NIE verloren: Transcript sofort sichern + Hintergrund-Finalizer"** (Teil 61).
Vollständig erledigt + auf `origin/dev` gepusht. Details im `SPIKIU-BUILD-LEDGER.md` (oberste „Stand:"-Zeile).

Geliefert (2 Dateien):
1. `chat.html` `makeLessonAndLeave` — Transcript SOFORT als `localStorage['spikiu_pending_lesson']` (status:'pending') VOR dem fetch; echter Fehlergrund via `errDetail`/`console.error`; Erfolg → `u.lessons` (entdoppelt, max 14) + pending gelöscht + Wechsel; Fehler → pending BLEIBT + beruhigende `bgSafe`-Nachricht + „Nochmal versuchen" (`END_UI.bgSafe`/`retry` de/es/en).
2. `nav.js` `finalizePendingLesson` (in `mount()`, jede Nav-Seite) — pending Transcript im Hintergrund fertigstellen; `inProgressTs`-Schutz (60 s); Erfolg → in `spikiu_user.lessons` (id=pending.id, entdoppelt, max 14) + pending gelöscht + `window.loadUser()`; Fehler → `inProgressTs` lösen + pending behalten; nie werfend.

Abnahme: alle Häkchen erfüllt — headless 20/20 (eigener CDP-Treiber, `/api/generate-lesson` fail/ok gestubbt), `node --check` grün (nav.js + beide chat-Inline-Scripts).

ABNAHME-REST (Leo auf dev/Gerät): siehe Ledger-Stand-Zeile.

DANACH (eigene Pakete, NICHT in diesem):
- Paket „Chat-Reel an `sitzung.js`": ganzes Gespräch laufend sichern + `frageWiederkommen` („Weiter, wo du warst?") beim Wiedereintritt — der LIVE-Gesprächsverlauf restaurierbar (nicht nur die fertige Lektion). `sitzung.js` ist gebaut; chat-Reel noch nicht angeschlossen.
- (offen) „3 → 4 capítulos"-Fix · Flip-Karten-Bau abnehmen · Legal zuletzt.
