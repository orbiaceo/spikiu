# AUFTRAG — erledigt am 23.06.2026 · kein offener Auftrag

> ERLEDIGT (Claude Code, 23.06.2026): „Raum ‚Proverbios': interaktiver Sprichwort-Raum" GEBAUT + auf dev.
> ZWEI Dateien: NEU `proverbios.html` + `nav.js` (Werkstatt-Sheet-Eintrag). `proverbios.html`: lebendiger
> vollständiger Capy (`spkCapyAlive`) + 📜-Requisit; Spruch via `spikiuSprichwort` (Zielsprache groß + 🔊 +
> Übersetzung + Quelle); Gespräch über `/api/gespraech` (erste User-Nachricht trägt den Spruch-Kontext,
> Antwort = Zielsprache + `[[Übersetzung]]` + 🔊, mehrere Runden); „Nächstes Sprichwort" blättert durch
> `sprichwort.js`-Daten. Anti-Gamification (kein Streak/Score). `nav.js`: Werkstatt-Sheet + Label (de/es/en)
> + Icon + `getActive` proverbios→werkstatt. `sprichwort.js`-Daten/`api`/Reel/Dashboard UNBERÜHRT. `node
> --check` grün, headless verifiziert (Spruch/Capy/Gespräch/„nächster"/nav-Link). Details im LEDGER.
> HINWEIS: bei nav.js-Headless-Tests frisches Chrome-Profil nötig (persistentes Profil cacht nav.js).
> NÄCHSTES = Projekt-Politur Richtung Beta.

---

_Archiv des erledigten Auftrags:_

Stand: 23.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev

> Letztes Feature der Wave: ein ruhiger, optionaler Sprichwort-Raum (anti-Gamification —
> KEINE Streaks/Punkte/Sucht). Spikiu zeigt einen Spruch, der Nutzer schreibt, Spikiu antwortet.
> Reuse: `sprichwort.js`, `audio.js`, `capy-vivo.js`, `nav.js`, `/api/gespraech`.

## 1) Neue Seite `proverbios.html`
- Lädt `nav.js` (Tab „Werkstatt" aktiv), `audio.js`, `capy-vivo.js`, `sprichwort.js`.
- **Lebendiger Capy** (kanonisches VOLLSTÄNDIGES SVG, `spk-capy-eyes`+`spk-capy-mouth`, belebt
  via `spkCapyAlive`). „Verkleidung" NUR als kleines Requisit NEBEN dem Capy (z. B. 📜) —
  das Capy-SVG selbst NIE verändern (nie trasquilado).
- **Spruch zeigen:** `spikiuSprichwort(PROFILE.zielsprache, PROFILE.muttersprache)` →
  Zielsprache groß (Lora) + 🔊 (`audio.js` speak) + Übersetzung gedämpft + Quelle (`src`, ohne Link).
- **Textfeld + Senden:** der Nutzer reagiert/fragt → an `/api/gespraech` (wie freier Flur):
  eigenes `verlauf`, als ERSTE User-Nachricht den Spruch-Kontext mitgeben (z. B.
  `'Wir plaudern über das Sprichwort: „' + text + '". ' + userText`), `profile` = PROFILE.
  Spikius Antwort als Blase: Zielsprache + `[[Übersetzung]]` (gedämpft) + 🔊 — gleiche Darstellung
  wie im Gespräch. Mehrere Runden möglich.
- **„Nächstes Sprichwort"**-Knopf → neuer zufälliger Spruch, Verlauf zurück.
- Stil/Token wie Dashboard-Begrüßer (warm, ruhig). EIN Capy. Keine Punkte/Streak/Score.

## 2) `nav.js` — Eintritt im Werkstatt-Sheet
- In `sheetItems('werkstatt', …)` einen Eintrag ergänzen:
  `{ id: 'proverbios', href: 'proverbios.html' }` (nach reader/read/write, vor/nach gym).
- Label-i18n ergänzen: de „Sprichwörter", es „Proverbios", en „Proverbs"; ein schlichtes Icon
  (z. B. Buch/Anführungszeichen) im Icon-Set.

## NICHT ANFASSEN
- `sprichwort.js`-Daten (nur lesen), `api/gespraech.js`, das Gespräch-Reel (chat.html), Dashboard,
  Lesebegleiter, andere Räume. Keine Streak-/Gamification-Mechanik.

## ABNAHME
- [ ] Werkstatt-Sheet zeigt „Proverbios/Sprichwörter/Proverbs" → öffnet `proverbios.html`.
- [ ] Lebendiger vollständiger Capy + Spruch (Zielsprache groß + 🔊 + Übersetzung + Quelle).
- [ ] Nutzer schreibt → echte Spikiu-Antwort von `/api/gespraech` (Zielsprache + Übersetzung + 🔊);
      mehrere Runden gehen. „Nächstes Sprichwort" lädt einen neuen.
- [ ] Genau EIN Capy, vollständig; Nav neutral. Kein Score/Streak.
- [ ] `node --check` grün (extrahiertes Script), Render headless geprüft.
