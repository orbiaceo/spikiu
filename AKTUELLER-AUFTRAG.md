# AUFTRAG — „Gespräch-Reel (Phase 3b): Häppchen als Karten + End-Karte ‚Lektion?‘"

Stand: 23.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev
Referenz: prototyp-reel-horizontal.html

> Ziel: das geführte Thema durchgehend EINE-KARTE-PRO-SCREEN. Heute laufen die Häppchen
> (Wörter/Hören) noch inline im Chat (Blasen); ab „Sprechen" ist schon Reel (Phase 3a).
> 3b hebt auch den PREP + das Ende auf das horizontale Karten-Deck. MOTOR/Logik unverändert —
> nur die DARSTELLUNG wandert in Reel-Karten.

## WAS GEBAUT WIRD (nur chat.html)
1. **Reel ab Themenstart aktiv:** bei Themenwahl `enterReel()` schon vor den Häppchen
   (statt erst bei `setStage('sprechen')`), damit der ganze geführte Pfad im Deck läuft.
2. **Wörter als Karte(n):** das Vokabel-Widget (`ws-words`, Audio pro Wort) als Reel-Karte
   darstellen — gleiche Daten (`HAP`), gleiche Interaktion (antippen/anhören), 🔊 bleibt.
   „Verstanden — weiter" → nach links / nächste Karte.
3. **Hören als Karte(n):** das Wortspot-Hörverständnis (`ws-word` Tippen, Prüfen) als Reel-Karte;
   gleiche Prüf-Logik (richtig=grün, verpasst=gestrichelt). Ergebnis → weiter.
4. **Übergabe:** der Handover-Satz („Jetzt üben wir das im Gespräch") als kurze Karte → dann
   bestehender Seed-Zug → Sprechen-Reel (Phase 3a, unverändert).
5. **End-Karte „Lektion daraus?":** das Endmenü/Lektion-Angebot (gleiches/anderes Thema /
   Beenden→Lektion) als Reel-End-Karte (`reel-endmenu`/`reel-card.full` existiert schon).
   Knöpfe rufen die bestehenden Handler (`mismoTema`/`otroTema`/Lektion).
6. **Rail** zeigt den Fortschritt durchgehend (Thema→Wörter→Hören→Sprechen→Lektion).

## NICHT ANFASSEN
- `loadHaeppchen`-DATEN/`/api/haeppchen`, die Vokabel-/Wortspot-PRÜF-Logik, `sendUserTurn`,
  `turn`/api, `extractOptionen`, `renderOptionen`-Daten, Audio, die Lektions-Generierung,
  Phase-3a-Sprechen-Reel, freier Flur (Phase 2), Opener (Phase 1), Profil/Voz.
- Horizontale Karten-Mechanik (Teil 46) nur wiederverwenden. Capy vollständig, EIN Capy, Nav neutral.

## ABNAHME
- [ ] Thema wählen → der ganze Pfad läuft als horizontales Deck: Wörter-Karte → Hören-Karte →
      Übergabe → Sprechen (Karten + Tinder) → End-Karte „Lektion?". Eine Karte pro Screen.
- [ ] Vokabel-Audio + Wortspot-Prüfung funktionieren wie bisher (nur jetzt als Karten).
- [ ] End-Karte: gleiches/anderes Thema / Beenden→Lektion → bestehende Handler; Lektion entsteht.
- [ ] Freier Flur + Sprechen-Reel unverändert. Nur chat.html; `node --check` grün; headless geprüft.

## DANACH
- Raum „Proverbios" · Lektions-Hintergrund-Bug.
