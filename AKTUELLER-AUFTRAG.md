# AUFTRAG — erledigt am 23.06.2026 · kein offener Auftrag

> ERLEDIGT (Claude Code, 23.06.2026): „Diagnose: echten 400-Grund sichtbar machen" GEBAUT + auf dev.
> EINE Datei `chat.html`, reine Fehler-Sichtbarkeit (kein Blind-Fix). NEU `errDetail(d,raw)` zieht den
> echten Grund aus der Server-Antwort. `callGespraech`: Body robust lesen (text→JSON), bei `!r.ok`
> `console.error(status, body)` + `throw` mit echtem Grund → `showError`/`reelError` zeigt z.B.
> „messages: text content blocks must be non-empty" statt nur „http 400"; Erfolgspfad unverändert.
> `loadHaeppchen`: prüfte `r.ok` nicht (400 rutschte still als skip durch) → jetzt `console.error(status,
> body)` + Skip-Warnung; Verhalten unverändert. Backend/Modell/Logik UNBERÜHRT. `node --check` grün,
> headless verifiziert (400 zeigt echten Grund auf Karte + Konsole; 200-Happy-Path unverändert).
> NÄCHSTES: Leo reproduziert auf dem Gerät → schickt den ECHTEN Fehlertext → dann gezielter Fix als
> eigenes Paket. Offen in der Schlange: Phase 3b · Raum „Proverbios" · Lektions-Hintergrund-Bug.

---

_Archiv des erledigten Auftrags:_

Stand: 23.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev

> BUG (Leo am Gerät): im geführten Thema (Restaurant, Stufe Wörter) → nach „Wir steigen direkt
> ins Gespräch ein." zeigt Spikiu: „Spikiu ist gerade nicht erreichbar. Netz: http 400" + Nochmal.
> WICHTIG (Charta-Regel): „den echten Fehler sichtbar machen, nicht raten." Heute zeigt das
> Frontend NUR den Status („http 400"), obwohl der GRUND schon im Antwort-Body steckt und
> verworfen wird. Dieses Paket macht den echten Grund sichtbar — KEIN Blind-Fix.
>
> Analyse (frisch geprüft): `callGespraech` (chat.html ~Z.1116) schickt `safeProfile`
> (immer vollständig) + `safeMessages` (immer Array) → der 400 ist NICHT die Backend-Validierung
> (gespraech.js Z.86 „Missing messages or profile"), sondern **Anthropic** (gespraech.js Z.132
> propagiert dessen Status+Body). Der Body sagt warum (z. B. leerer content, Modell, Rollenfolge).
> Modell `claude-sonnet-4-5` lief DIESE Sitzung noch (Phase-3a-Test antwortete) → eher NICHT die Ursache.

## WAS GEBAUT WIRD (nur chat.html — Diagnose sichtbar machen)
1. **`callGespraech`:** der Body ist schon geparst (`var d = await r.json()`). Beim `!r.ok` den
   ECHTEN Grund mitgeben statt nur den Status:
   - `console.error('gespraech 400', r.status, d)` (volle Server-Antwort in die Konsole).
   - Den Wurf erweitern, z. B. `throw new Error('http ' + r.status + ' · ' + detail(d))`, wobei
     `detail(d)` = `d.error?.message || d.error?.type || d.error || d.detail || JSON.stringify(d)`.
   - So zeigt die bestehende `showError`-Karte den echten Text (z. B. „messages: text content
     blocks must be non-empty" oder „model: …" oder „Missing messages or profile").
2. **`loadHaeppchen` (`/api/haeppchen`, ~Z.1331):** ebenso — bei Fehler `console.error('haeppchen',
   r.status, body)` und den Grund im Skip-/Fehlertext sichtbar/inspizierbar machen (damit klar
   wird, ob auch die Häppchen-Generierung 400't und DESHALB übersprungen wird).
3. Sonst NICHTS ändern. Kein Modellwechsel, kein Umbau der Verlauf-Logik, kein Reel-Eingriff —
   erst sehen wir den echten Grund, dann kommt der gezielte Fix als eigenes Paket.

## NICHT ANFASSEN
- Reel-Mechanik (Teil 46), Opener, `sendUserTurn`/`turn`-Logik, `api/gespraech.js`,
  `api/haeppchen.js`, das Modell, Profil/Voz. NUR die Fehler-Sichtbarkeit im Frontend.

## ABNAHME
- [ ] Tritt der Fehler wieder auf, zeigt die Karte (und die Browser-Konsole) den ECHTEN Grund,
      nicht nur „http 400" — d. h. den Body-Text von Anthropic bzw. dem Backend.
- [ ] Häppchen-Fehler werden ebenfalls in der Konsole sichtbar (Status + Body).
- [ ] Sonst unverändert; Nochmal funktioniert weiter. Nur `chat.html`; `node --check` grün.

## DANACH
- Leo reproduziert auf dem Gerät → schickt den ECHTEN Fehlertext (Screenshot/Konsole) → dann
  schreiben wir den gezielten Fix (z. B. leerer content / Rollenfolge / Häppchen) als eigenes Paket.
- Offen in der Schlange: Phase 3b (Häppchen als Karten + End-Karte „Lektion?") · Raum „Proverbios"
  · Lektions-Hintergrund-Bug.
