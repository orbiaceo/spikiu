# AUFTRAG — „Proverbios neu: Tinder-Deck + wiederverwendbarer Übungs-Motor (uebung.js)"

Stand: 23.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev
Referenz: prototyp-proverbios-tinder2.html (von Leo abgenommen)

> Redesign: Proverbios OHNE KI. Feste DB. Tinder-Deck (eine Karte pro Screen, horizontal):
> Proverbio → Übung → neues Proverbio → … Daumen LINKS = weiter, RECHTS = zurück (Wiederholung
> mit echtem Verlauf). Der Übungs-Motor wird als EIGENE wiederverwendbare Datei gebaut (auch für
> Gym u. a. Räume nutzbar).

## 1) NEU: `uebung.js` — wiederverwendbarer Übungs-Motor
- Reines JS, KEIN KI/Netz. `window.spikiuUebung(item, type)` → liefert ein DOM-Element (Karte),
  das die Übung rendert + selbst prüft (richtig=grün, falsch=rot + Lösung zeigen).
- `item = { text, tr, mean:[richtig, falsch1, falsch2] }` (inhaltsneutral → für andere Räume
  später mit Vokabeln/Sätzen nutzbar).
- Typen (wie im Prototyp): `'reorder'` (Wörter ordnen), `'intruder'` (Eindringling finden),
  `'mc'` (Bedeutung A/B/C), `'gap'` (Lücke füllen). Erweiterbar.
- Hilfen `shuffle`/`words` enthalten. Eindringlings-/Distraktor-Wortliste intern.
- Logik/Optik exakt aus prototyp-proverbios-tinder2.html übernehmen.

## 2) NEU/UMBAU: `proverbios.html` — Tinder-Deck mit Verlauf
- Lädt `nav.js`, `audio.js`, `capy-vivo.js`, `uebung.js`, `sprichwort.js`.
- **Feste DB:** Sprüche aus `sprichwort.js` (Zielsprache des Profils + Übersetzung + Quelle).
  KEIN `/api/gespraech` mehr in diesem Raum (kein KI). Falls `sprichwort.js` keine `mean`-Felder
  hat: in `proverbios.html` (oder einer kleinen lokalen Liste) je Spruch die 3 Bedeutungen
  (richtig + 2 Distraktoren) ergänzen — fest, redaktionell.
- **Proverbio-Karte:** lebendiger VOLLSTÄNDIGER Capy (`spkCapyAlive`), Spruch groß (Zielsprache)
  + 🔊 (`audio.js`) + Übersetzung + Quelle. Requisit 📜 nur daneben, SVG nie ändern.
- **Sequenz:** Proverbio → Übung (`window.spikiuUebung`) → neues Proverbio → … horizontal.
- **Daumen:** links = weiter, rechts = zurück. ECHTER VERLAUF (Schritte-Liste + Zeiger) → beim
  Zurückgehen erscheint die Karte wie gehabt (gleiche Wörter/Reihenfolge), wie im Prototyp.
- EIN Capy. Kein Score/Streak/Gamification (anti-Sucht).

## 3) `nav.js`
- Werkstatt-Sheet-Eintrag `{id:'proverbios', href:'proverbios.html'}` bleibt (schon gebaut).

## NICHT ANFASSEN
- `api/gespraech.js`, das Gespräch-Reel (chat.html), Dashboard, Lesebegleiter, andere Räume,
  `audio.js`/`capy-vivo.js` (nur nutzen). Keine Gamification-Mechanik.

## ABNAHME
- [ ] `uebung.js` existiert, `window.spikiuUebung(item,type)` liefert geprüfte Übungskarten für
      alle 4 Typen (eigenständig, ohne Proverbios nutzbar).
- [ ] `proverbios.html`: Tinder-Deck Proverbio → Übung → Proverbio …; DB fix, KEIN KI-Call.
- [ ] Daumen links = weiter, rechts = zurück; Zurückgehen zeigt die gleiche Karte (Verlauf).
- [ ] Lebendiger vollständiger Capy + Spruch + 🔊 + Übersetzung. EIN Capy. Kein Score/Streak.
- [ ] `node --check` grün (uebung.js + extrahiertes proverbios-Script); headless gerendert.

## DANACH
- (Optional) Übungs-Motor `uebung.js` in Gym/andere Räume einhängen. Sonst: Beta-Politur.
