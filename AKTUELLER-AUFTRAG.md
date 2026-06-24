# AUFTRAG — erledigt am 24.06.2026 · kein offener Auftrag

> ERLEDIGT (Claude Code, 24.06.2026): „Lektionen-Archiv: Sheet + Seite (bis 14, nach Thema & Datum)"
> GEBAUT + auf dev. DREI Dateien: `chat.html` (Lektions-Speicher 3→14 + `thema`-Feld: geführt=`TOPIC_LABEL`,
> frei=„Freies Gespräch") + `nav.js` (Lektionen-Tab → Sheet „letzte Lektion #last / vergangene" + Labels/
> Icons i18n + `getActive` lektionen→lektionen) + NEU `lektionen.html` (Archiv aus `spikiu_user.lessons` bis
> 14, Umschalter Nach Thema/Nach Datum, Gruppen [alte ohne thema → „Sonstige"], Lektions-Karte → Detail-Modal
> [Vokabel-Paare + 🔊 + Notiz], Zähler X/14, `#last` öffnet die neueste). Kein erfundener Inhalt. Lektions-
> Erzeugung/`api`/Reel/Dashboard unberührt. `node --check` grün, headless verifiziert. Details im LEDGER.
> NOTIZ: Wortzahl-Label ohne Singular/Plural („1 Wörter") — kosmetisch, später.
> NÄCHSTES = „3→4 capítulos"-Fix · (optional) `uebung.js` in weitere Räume · zuletzt Legal-Sequenz.

---

_Archiv des erledigten Auftrags:_

Stand: 24.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev
Referenz: prototyp-lektionen-archiv.html (von Leo abgenommen)

> Heute: „Lektionen"-Tab springt nur zum Dashboard; nur 3 Lektionen gespeichert. NEU: Tab öffnet
> ein Sheet (wie Werkstatt) mit „Deine letzte Lektion" / „Vergangene Lektionen"; letztere = eigene
> Archiv-Seite (nach Thema & Datum). Gratis-Start = 2 Wochen → bis **14** Lektionen behalten
> (für zahlende Nutzer bald nötig).

## 1) chat.html — Speicher 3 → 14 + Thema merken
- Lektions-Speicher: `arr.slice(0, 3)` → `arr.slice(0, 14)` (Z.~1044). Sonst nichts an der
  Lektions-Erzeugung ändern.
- Beim Speichern je Lektion ein **`thema`**-Feld mitschreiben: im geführten Thema = `TOPIC_LABEL`;
  im freien Flur = „Freies Gespräch" (bzw. lokalisiert). Bestehende Felder (id/createdAt/
  zielsprache/title/vocab) bleiben.

## 2) nav.js — Lektionen als Sheet
- Tab-Eintrag `{ id:'lektionen', href:'dashboard.html#lektionen' }` → `{ id:'lektionen',
  sheet:'lektionen' }`.
- `sheetItems('lektionen', t)` mit ZWEI Einträgen:
  - „Deine letzte Lektion" → `href:'lektionen.html#last'` (öffnet die neueste direkt).
  - „Vergangene Lektionen" → `href:'lektionen.html'`.
- Labels i18n de/es/en (z. B. „Deine letzte Lektion"/„Tu última lección"/„Your last lesson";
  „Vergangene Lektionen"/„Lecciones pasadas"/„Past lessons"). Icons schlicht (📖 / 🗂️ bzw.
  vorhandenes Set).

## 3) NEU: lektionen.html — Archiv
- Lädt `nav.js` (Tab „Lektionen" aktiv), liest `spikiu_user.lessons` (bis 14).
- Umschalter **Nach Thema** (gruppiert nach `thema`) / **Nach Datum** (chronologisch, neueste
  zuerst). Optik/Logik aus prototyp-lektionen-archiv.html.
- Lektions-Karte (Titel · Thema · Datum · Wortzahl) → Detail-Modal (Wortschatz-Paare + Notiz/
  Mini-Analyse, sofern vorhanden). Zähler „X / 14".
- Bei `#last` beim Laden automatisch die neueste Lektion im Modal öffnen.
- Alte Lektionen ohne `thema` sauber abfangen (Gruppe „Sonstige" bzw. nur Datums-Ansicht).
- KEIN erfundener Inhalt — nur echte gespeicherte Lektionsfelder.

## NICHT ANFASSEN
- Lektions-ERZEUGUNG/Inhalt, api/*, Reel, Proverbios/Gym, Lesebegleiter, Dashboard-Begrüßer/Baum.
  (Dashboard-Lektionskarte darf bleiben; der Tab führt jetzt nur woanders hin.)

## ABNAHME
- [ ] Tab „Lektionen" öffnet Sheet → „letzte Lektion" (öffnet neueste direkt) / „vergangene".
- [ ] `lektionen.html`: Umschalter Thema/Datum, Gruppen korrekt, Detail-Modal, „X / 14".
- [ ] Bis 14 Lektionen werden gespeichert; `thema` wird mitgeschrieben; alte ohne thema brechen nicht.
- [ ] `node --check` grün; headless gerendert; nur chat.html + nav.js geändert + neue lektionen.html.

## DANACH
- „3 → 4 capítulos"-Fix · (optional) uebung.js in weitere Räume · zuletzt Legal-Sequenz.
