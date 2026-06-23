# AUFTRAG — erledigt am 23.06.2026 · kein offener Auftrag

> ERLEDIGT (Claude Code, 23.06.2026): „Dashboard: Spruch raus + Spikiu begrüßt (atmend)" GEBAUT
> + auf dev. EINE Datei `dashboard.html`: (1) Sprichwort-Kopf + `renderSprichwort` + CSS + sprichwort.js-
> Einbindung raus (Datei bleibt im Repo); (2) Gruß-Block in Flex-Zeile `.greeting-host` — vollständiger
> kanonischer Capy (72px, 10 Ellipsen, `spk-capy-eyes`/`spk-capy-mouth`) LINKS, via `spkCapyAlive`
> belebt (atmet via CSS, blinzelt, Blick folgt), Gruß + Memoria UNVERÄNDERT rechts. capy-vivo.js
> eingebunden. `node --check` grün, headless verifiziert (kein Spruch, Capy lebt, Memoria echt, genau
> 1 Capy, Baum unberührt). Details + Abnahme-Rest im SPIKIU-BUILD-LEDGER.md. NÄCHSTES laut Reihenfolge
> unten = Paket 1 „Gespräch-Reel" (chat.html-Opener, gleiche Lebendig-Regel).

---

_Archiv des erledigten Auftrags:_

Stand: 22.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Referenz: prototyp-dashboard-spikiu-gruss.html (von Leo abgenommen)

> GOLDENE REGEL (ab jetzt fest): **Jede Aktivität/Seite mit Spikiu verlangt die Maskottchen-
> Präsenz LEBENDIG (atmend) in ihrer Rolle.** Ein Gruß ohne Spikiu ist ein Text ohne Autor.
> Auf dem Dashboard ist Spikiu der GASTGEBER — er sagt „Hola Lola, bienvenido", atmend daneben.
>
> Dieses Paket: (1) den „Spruch des Tages" vom Dashboard ENTFERNEN, (2) Spikiu als atmenden
> Begrüßer NEBEN den Gruß setzen. EINE Datei: `dashboard.html`.

## 1) Spruch raus
- Den „Sprichwort des Tages"-Kopf vom Dashboard entfernen: das HTML `<div class="sprichwort-head"
  id="sprichwort-head" …>` (~Z.193) raus, und die Befüll-/Render-Logik, die ihn sichtbar macht,
  nicht mehr aufrufen. Die zugehörigen CSS-Regeln `.sprichwort-head …` dürfen weg.
- **`sprichwort.js` NICHT löschen** — der Spruch zieht später in den eigenen Raum „Proverbios"
  um (nächstes Paket). Hier nur vom Dashboard nehmen.

## 2) Spikiu begrüßt — atmend, NEBEN dem Gruß
Den bestehenden Gruß-Block (`#greeting-title` Z.201 + `#greeting-sub` Z.202 + `#memoria-us`
Z.203 + ggf. der „Weiter plaudern →"-Link aus `renderMemoria`) in eine **Flex-Zeile** fassen:
- LINKS: ein **vollständiger kanonischer Capy** (~72px, 2 Ohren / Schnauze / Nase / 4 Pfoten /
  Lächeln — NIE trasquilado). Die Augen-Kreise in `<g class="spk-capy-eyes">`, damit
  `spkCapyAlive` (aus `capy-vivo.js`, Paket 1) greift.
- RECHTS: der Gruß-Text (Titel + Memoria-Untertitel + „Weiter plaudern →" + „Wir zwei"-Zeile +
  „Von letztem Mal"-Zeile) — UNVERÄNDERT in Inhalt/Logik, nur ins rechte Feld der Zeile.
- Den Capy via `spkCapyAlive(svgEl)` beleben (atmet, blinzelt, Blick folgt) — dieselbe Funktion,
  die schon woanders genutzt wird. Layout/Größe/Abstände nach `prototyp-dashboard-spikiu-gruss.html`
  (Capy links, Text rechts, oben ausgerichtet).
- Optional, NUR wenn `say()`/audio.js auf dem Dashboard sauber verfügbar ist: Tipp auf den Capy →
  spricht den Gruß. Wenn nicht trivial, weglassen (atmen/blinzeln ist Pflicht, Sprechen Kür).

## NICHT ANFASSEN
- `renderMemoria`-LOGIK (nur die Elemente umhängen, nicht die Berechnung ändern), der lebende
  Baum, Lektionen-Liste, `capy-vivo.js` (nur aufrufen), `sprichwort.js` (behalten), `api/*`, Seele.
- Keine erfundenen Daten (Memoria bleibt echt: `blaetter`/`lessons`).

## ABNAHME
- [ ] Kein „Spruch des Tages" mehr auf dem Dashboard; der Gruß steht wieder oben.
- [ ] Spikiu (vollständig) steht NEBEN „Hola Lola, bienvenido" und ist LEBENDIG (atmet + blinzelt
      via `spkCapyAlive`).
- [ ] Memoria unverändert: Kontinuitäts-Untertitel + „Weiter plaudern →" + „Wir zwei: X Gespräche ·
      Y Lektionen" + „Von letztem Mal" — alles aus ECHTEN Daten, korrekt neben dem Capy.
- [ ] Genau EIN Capy auf dem Dashboard, als Charakter (Gastgeber). Baum/Lektionen unberührt.
- [ ] Nur `dashboard.html` geändert; `node --check` grün; headless verifiziert (Capy lebt, Gruß +
      Memoria rendern, kein Spruch).

## DANACH (Reihenfolge unverändert)
1. **Gespräch-Reel** (prototyp-final-spikiu-frei.html): chat.html-Opener → Spikiu-Charakter-Gruß
   (atmend, gleiche Regel) + Daumen-Reel (eine Sache pro Screen, Wisch, Tinder-Karten, 🔊).
2. **Raum „Proverbios"**: der Spruch zieht hierher — verkleideter Capy (lebendig), Tipp → Spruch/
   Witz/Zitat + Sprechblase + Audio; Lerner schreibt → Spikiu antwortet in Text. (`sprichwort.js` wird hier wiederverwendet.)
3. **Lektions-Hintergrund-Bug**: nach „Ja" → „Die findest du später in deinen Lektionen. Tschüss!" +
   Generierung im Hintergrund, überlebt Seitenwechsel (Leo getestet: aktuell KEINE Lektion erzeugt).
