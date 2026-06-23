# AUFTRAG — erledigt am 23.06.2026 · kein offener Auftrag

> ERLEDIGT (Claude Code, 23.06.2026): „Dashboard-Begrüßung: zentriert & betont" (Feinschliff)
> GEBAUT + auf dev. EINE Datei `dashboard.html`, reiner Layout-Feinschliff: `.topbar`/`.greeting-host`
> row→zentrierte Spalte (Capy mittig oben 64px + weicher Halo via `::before` radial-gradient,
> atmet/blinzelt weiter via `spkCapyAlive`), Titel betont (clamp 1.5–1.7rem) + Gold-Trenner
> `.greet-divider` (46px) zwischen Titel und Memoria, `.host-text` zentriert, `.btn-speak` mittiges
> Pill. `renderMemoria`-Logik/echte Daten/Baum/Lektionen unberührt, kein JS, genau 1 Capy. `node
> --check` grün, headless verifiziert (Spalte zentriert, Capy lebt, Halo, Gold-Trenner, Memoria echt).
> Details + Abnahme-Rest im SPIKIU-BUILD-LEDGER.md. NÄCHSTES = Paket „Gespräch-Reel" (unten).

---

_Archiv des erledigten Auftrags:_

Stand: 23.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Referenz: prototyp-dashboard-zentriert.html (von Leo abgenommen)

> Reiner Layout-Feinschliff der schon gebauten Dashboard-Begrüßung (Teil 41). EINE Datei:
> `dashboard.html`. Inhalt/Memoria-Logik/Baum NICHT ändern — nur Anordnung & Betonung.

## WAS GEÄNDERT WIRD (CSS/Layout in dashboard.html)
Heute steht die Begrüßung als Zeile: `.host-capy` (Capy `#dashHostCapy`) LINKS, `.host-text`
RECHTS, darunter `.btn-speak`. Neu = **zentrierte Spalte**:

1. **Capy mittig OBEN, ein Tick kleiner + weiche Form (Halo).**
   - Den Eltern-Container von `.host-capy` + `.host-text` von Zeile (row) auf **zentrierte
     Spalte** (column, `align-items:center`, `text-align:center`).
   - `#dashHostCapy` etwas kleiner: ~**64px** (statt ~72).
   - Hinter dem Capy eine zarte **Halo-Form**: ein radialer `--accent2`-Schein
     (`radial-gradient`, weich auslaufend), als ruhige visuelle Betonung. Capy bleibt
     VOLLSTÄNDIG und LEBENDIG — `spkCapyAlive(#dashHostCapy)` weiter aktiv (atmet/blinzelt;
     `spk-capy-eyes` + `spk-capy-mouth` bleiben).

2. **Begrüßung + Memoria zentriert & betont.**
   - `.host-text` zentriert: `#greeting-title`, `#greeting-sub`, der „Weiter plaudern →"-Link,
     `#memoria-us`, `#memoria-last` — alle mittig.
   - Titel betont: etwas größere Lora (~1.65–1.7rem), Name weiter im Akzent (`<em>`).
   - Darunter ein **zarter Trenner** als Betonung: ein dünner kurzer Gold-Strich
     (`--gold`, ~46px breit, leicht transparent), mittig zwischen Titel und Memoria-Text.
   - Memoria-Texte zentriert, gleiche echte Inhalte/Logik wie bisher.

3. **Button „Jetzt sprechen →" zentriert.**
   - `.btn-speak` als mittiges Pill (kein linksbündiges Vollbreit-Element): horizontal
     zentriert, angenehme Eigenbreite (`inline-flex`, `margin: … auto`).

## NICHT ANFASSEN
- `renderMemoria`-Logik + echte Daten (`blaetter`/`lessons`) — nur die Elemente zentrieren.
- `spkCapyAlive`-Aufruf / `capy-vivo.js` (Capy muss weiter atmen + blinzeln).
- Lebender Baum, Lektionen-Liste, Gratis-Plan-Hinweis (Reihenfolge bleibt), `api/*`, Seele.
- Kein zweiter Capy. Capy nie trasquilado.

## ABNAHME
- [ ] Capy mittig oben, ~64px, mit weichem Halo; atmet + blinzelt weiter (spkCapyAlive intakt).
- [ ] „Hola Lola, bienvenido" + ganze Memoria (Untertitel · „Weiter plaudern →" · „Wir zwei …" ·
      „Von letztem Mal …") zentriert; Titel etwas größer + Gold-Trenner darunter.
- [ ] „Jetzt sprechen →"-Button horizontal zentriert.
- [ ] Memoria-Inhalte unverändert (echte Daten). Baum/Lektionen unberührt. Genau EIN Capy.
- [ ] Nur `dashboard.html`; `node --check` grün; headless verifiziert (Capy lebt, alles
      zentriert rendert).

## DANACH — bestätigtes nächstes Paket
**Gespräch-Reel** (Leo + Claude Code einig): chat.html-Opener → Spikiu-als-Charakter-Begrüßung
(lebendig/atmend, gleiche goldene Regel) + Daumen-REEL (eine Sache pro Screen, Wisch nach oben,
Tinder-Antwortkarten, 🔊, Fortschrittsbalken, End-Slide „Lektion daraus?"). Nav bleibt stabil
(neutrales Zwei-Köpfchen-Symbol), KEIN Capy-Klon im Reel. Referenz: prototyp-final-spikiu-frei.html.
Danach: Raum „Proverbios" · Lektions-Hintergrund-Bug.
