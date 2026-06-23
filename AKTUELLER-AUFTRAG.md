# AUFTRAG — erledigt am 23.06.2026 · kein offener Auftrag

> ERLEDIGT (Claude Code, 23.06.2026): „Lektionen-Tab: echte Verbindung (Scroll zu den Lektionen)"
> GEBAUT + auf dev. EINE Datei `dashboard.html`. Ursache: der `#lektionen`-Anker ist `display:contents`
> (keine Box) → kein Scroll-Ziel. Fix: NEU `scrollToLektionen()` scrollt bei `location.hash === '#lektionen'`
> zur echten Karte (`lessons-card` sichtbar, sonst `no-lessons-card`) via `scrollIntoView`, im `load`-Handler
> nach `loadUser`/`renderLessonsList`; + `hashchange`-Listener (schon auf dem Dashboard). `no-lessons-card`
> bekam `scroll-margin-top:80px`. nav.js/Render-Logik/Modal/Daten UNBERÜHRT. `node --check` grün, headless
> verifiziert (Direktaufruf + hashchange + Platzhalter scrollen alle korrekt). Details im LEDGER.
> NÄCHSTES = Raum „Proverbios" · (danach Projekt-Politur Richtung Beta).

---

_Archiv des erledigten Auftrags:_

Stand: 23.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev

> BUG (Leo): der „Lektionen"-Tab fühlt sich wie ein Platzhalter („…#") an. Ursache (geprüft):
> `nav.js` zeigt korrekt auf `dashboard.html#lektionen` (Z.149), ABER der Anker `<div id="lektionen"
> style="display:contents">` (dashboard.html Z.329) ist KEIN Scroll-Ziel (display:contents hat keine
> Box) → die Seite springt nicht zu den Lektionen, bleibt oben. Lektion wird korrekt erzeugt + im
> Dashboard gerendert (renderLessonsList) — es fehlt nur das Anspringen.

## WAS GEBAUT WIRD (nur dashboard.html)
- Beim Laden UND bei `hashchange`: wenn `location.hash === '#lektionen'`, das echte Lektions-
  Element in den Blick scrollen — `lessons-card` (wenn sichtbar) bzw. sonst `no-lessons-card`
  (`scrollIntoView({ behavior:'smooth', block:'start' })`). `scroll-margin-top` ist schon gesetzt.
- Erst NACH `renderLessonsList(user)` scrollen (damit die Karte schon im DOM/sichtbar ist).
- Nichts an `nav.js`, an der Lektions-Render-Logik, am Modal oder an den Daten ändern.

## NICHT ANFASSEN
- nav.js (Link ist korrekt), renderLessonsList, openLesson/Modal, Memoria, Baum, Begrüßer,
  api/*, der Upgrade-Knopf (separat).

## ABNAHME
- [ ] Tab „Lektionen" tippen → Dashboard öffnet und scrollt sichtbar zu „Meine Lektionen"
      (bzw. zur Platzhalter-Karte, wenn noch keine da sind).
- [ ] Funktioniert auch, wenn man schon auf dem Dashboard ist (hashchange).
- [ ] Nur dashboard.html; `node --check`/Render grün; sonst unverändert.

## DANACH
- Raum „Proverbios" · (danach Projekt-Politur Richtung Beta).
