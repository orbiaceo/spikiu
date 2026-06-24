# AUFTRAG — „Gym-Raum komplett: Wortschatz-Werkstatt (Tinder-Deck + uebung.js)"

Stand: 23.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev
Referenz: prototyp-proverbios-tinder2.html (gleiche Deck-Mechanik) · uebung.js (Motor)

> Gym = der STILLE Zwilling zum Sprechen: Wortschatz-/Gedächtnis-Training, Tinder-Deck mit
> uebung.js. ANTI-Gamification (kein Streak/Score/Zwang). „Gewollt trainiert."
>
> EHRLICH (Anti-Halluzination): die „gewackelten Wörter aus dem Companion" existieren als DATEN
> noch nicht (per-Wort-Tracking = Phase 2). Gym v1 speist sich daher aus ECHTEN Quellen:
> (a) festem Starter-Wortschatz + (b) selbst hinzugefügten Wörtern. KEINE erfundenen
> Wackel-Daten. Companion-Feed kommt, wenn das Tracking existiert.

## 1) NEU: `wortschatz.js` — feste Starter-Wörter (redaktionell, kein KI)
- `window.spikiuWortschatz(zielsprache)` → Array von Items im uebung.js-Format:
  `{ wort, text, tr, mean:[richtig, falsch1, falsch2] }` — `text` = kurzer Beispielsatz (damit
  reorder/gap/intruder greifen), `mean` = 3 Bedeutungen für 'mc'. Pro Zielsprache (es/de/en/el)
  ein moderates Starter-Set (~20–30 gängige Wörter, A1–A2). Redaktionell, fest.

## 2) NEU: `gym.html` — Wortschatz-Werkstatt (Tinder-Deck)
- Lädt `nav.js`, `audio.js`, `capy-vivo.js`, `uebung.js`, `wortschatz.js`.
- **Quelle = Starter-Wortschatz + eigene Wörter** aus localStorage (`spikiu_wortschatz`, Liste von
  Items). Ein schlichtes „➕ Wort hinzufügen" (Wort + Übersetzung) → speichert + kommt ins Deck.
- **Deck wie Proverbios:** Wort-Karte → Übungs-Karte → nächstes Wort → … horizontal.
  Daumen LINKS = weiter, RECHTS = zurück, ECHTER VERLAUF (Schritte-Liste + Zeiger) — Mechanik aus
  prototyp-proverbios-tinder2.html übernehmen.
- **Wort-Karte:** lebendiger VOLLSTÄNDIGER Capy (`spkCapyAlive`), Wort groß (Zielsprache) + 🔊
  (`audio.js`) + Übersetzung + (falls vorhanden) Beispielsatz. EIN Capy, nie trasquilado.
- **Übungs-Karte:** `window.spikiuUebung(item, type)` (Typen rotieren: reorder/intruder/mc/gap).
- KEIN Score/Streak/Fortschrittsdruck. Kein KI-Call. (Spaced Repetition = Phase 2.)

## 3) `nav.js`
- Gym-Eintrag aktivieren: `{ id:'gym', href:'gym.html' }` (statt `disabled:true`). Label/Icon
  existieren schon (Wortschatz-Werkstatt / Taller de vocabulario / Vocabulary Workshop).

## NICHT ANFASSEN
- `uebung.js` (nur nutzen), `api/*`, chat-Reel, Dashboard, Lesebegleiter, Proverbios, andere Räume.
  Keine Gamification. Keine erfundenen Companion-/Wackel-Daten.

## ABNAHME
- [ ] Nav „Wortschatz-Werkstatt" ist aktiv → öffnet `gym.html`.
- [ ] Deck: Wort-Karte → Übung (uebung.js) → nächstes Wort … Daumen links=weiter, rechts=zurück
      (Verlauf zeigt gleiche Karte). Quelle = Starter + eigene Wörter.
- [ ] „Wort hinzufügen" speichert in localStorage und erscheint im Deck.
- [ ] Lebendiger vollständiger Capy + Wort + 🔊 + Übersetzung. EIN Capy. Kein Score/Streak.
- [ ] `node --check` grün (wortschatz.js + gym-Script); headless gerendert.

## DANACH (Phase 2)
- Companion-Feed: gewackelte/bestellte Wörter, sobald per-Wort-Tracking existiert. Spaced Repetition.
- Sonst: Beta-Politur.
