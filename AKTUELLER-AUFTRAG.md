# AKTUELLER-AUFTRAG — erledigt am 22.06.2026 · kein offener Auftrag

> **Teil 35 „Navigation umordnen + Gespräch-Opener + Sprichwort des Tages" GEBAUT + auf dev
> (commit 5916ca6).** Alle drei Teile (A `nav.js` · B `chat.html` · C `dashboard.html`; `sprichwort.js`
> lag schon bereit) erfüllt, alle Abnahme-A/B/C-Punkte headless verifiziert (6 nav.js-Seiten, hashchange,
> Opener, Dashboard-Sprichwort). Vollständiger Bericht + ABNAHME-REST (Gerät) + EINE FRAGE AN DESIGN
> (`#lektionen`-Anker als `display:contents`-Wrapper — Scroll-Verhalten am Gerät prüfen) im
> SPIKIU-BUILD-LEDGER.md (oberste „Stand:"-Zeile). Nächstes laut Auftrag: Design-Welle Paket 3 „Baum".
>
> Der ursprüngliche Auftragstext steht unten unverändert als Referenz.

---

# (Referenz) Design-Welle: Navigation umordnen + Gespräch-Opener + Sprichwort des Tages (Teil 35)

Stand: 22.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Baut auf Teil 34 „Untere Navigation" (live, commit e86eef5)

> Aus Leos Geräte-Screenshots. Die untere Navi EXISTIERT schon (Teil 34) — das hier ist
> eine **Umordnung** drauf plus zwei ruhige Extras. Genehmigt im Prototyp
> `prototyp-nav-ruhe.html`. **DREI unabhängig baubare + headless prüfbare Teile** — gern
> einzeln committen.
>
> VIER Dateien: `nav.js` (A) · `chat.html` (B) · `dashboard.html` + **NEU** `sprichwort.js` (C).
> `api/*` · Seele · `*-modus.md` · `vercel.json` · `capy-vivo.js` · `audio.js` · die 8 Reader-HTMLs
> bleiben UNBERÜHRT. `sprichwort.js` ist ein statischer Root-Helfer wie `nav.js` (KEIN `vercel.json`-Eintrag).
> Capy überall VOLLSTÄNDIG (2 Ohren / 4 Pfoten), nie trasquilado.

---

## TEIL A — Navigation umordnen · `nav.js`

Heute: Start · **Reader** · Gespräch · **Werkstatt** · Mein.
Soll: **Start · Werkstatt · Gespräch · Lektionen · Mein.** Reader wandert IN die Werkstatt,
Lektionen wird eigener Tab (raus aus „Mein"). Lese-Reihenfolge fürs Auge: stilles Arbeiten →
Sprechen → Lektionen (die eigentliche Arbeit darf der Nutzer frei ordnen — die Leiste schlägt
nur einen ruhigen Rhythmus vor).

**A1 · TABS-Array (Z.139-143) neu ordnen:**
```
{ id:'dashboard', labelKey:'navStart',     href:'dashboard.html' },
{ id:'werkstatt', labelKey:'navWerkstatt', sheet:'werkstatt' },
{ id:'talk',      labelKey:'navTalk',      href:'chat.html', center:true },
{ id:'lektionen', labelKey:'navLektionen', href:'dashboard.html#lektionen' },
{ id:'mein',      labelKey:'navMein',      sheet:'mein' }
```
- `books`-Tab RAUS (Reader wandert ins Werkstatt-Sheet, A2).
- NEU `lektionen`-Tab → `dashboard.html#lektionen`.

**A2 · Werkstatt-Sheet (`sheetItems`, Z.146-153):** Reader als ERSTEN Eintrag rein, Reihenfolge lesen→schreiben:
```
werkstatt: [
  { id:'reader', href:'books.html' },           // NEU — Reader · Meine Bücher
  { id:'read',   href:'taller.html' },           // Lesewerkstatt
  { id:'write',  href:'schreibwerkstatt.html' }, // Schreibwerkstatt
  { id:'gym',    disabled:true }                 // Wortschatz-Werkstatt (bald)
]
```
WICHTIG: Reader (`books.html`) = „Meine Bücher" (Bibliothek) ≠ Lesewerkstatt (`taller.html`,
Leseverstehen). Zwei getrennte Einträge.

**A3 · Mein-Sheet (Z.155-160):** `lessons` RAUS (jetzt eigener Tab):
```
mein-items: [
  { id:'path',    href:'dashboard.html#lernweg' },
  { id:'verlauf', href:'sessions.html' }
]
if (hasGoal()) items.push({ id:'settings', disabled:true });   // wie heute
```

**A4 · Labels (Z.60-71, alle DREI Sprachblöcke):**
- NEU `navLektionen`: de „Lektionen" · es „Lecciones" · en „Lessons".
- NEU `reader` (Sheet-Item): de „Reader · Meine Bücher" · es „Reader · Mis libros" · en „Reader · My Books".
- `gym` auf den kanonischen Namen umbenennen: de „Wortschatz-Werkstatt" · es „Taller de vocabulario" · en „Vocabulary Workshop". (id bleibt `gym`, disabled.)
- `navReader` wird nicht mehr als Tab gebraucht — darf bleiben (schadet nicht).

**A5 · Icons:**
- NEU `TAB_ICON['lektionen']` (Karten/Lektion):
  `<rect x="4" y="5" width="13" height="15" rx="2"/><path d="M8 3h9a2 2 0 012 2v13"/><path d="M8 10h6M8 14h6"/>`
- NEU Sheet-Item-Icon `reader` = der Buch-Split (heutiger `TAB_ICON.books`-Pfad, Z.101):
  `<path d="M3 5a2 2 0 012-2h6v18H5a2 2 0 01-2-2z"/><path d="M21 5a2 2 0 00-2-2h-6v18h6a2 2 0 002-2z"/>`

**A6 · `getActive` (Z.83-95) + `mapAlias` (Z.79-80):**
- `books`/`cap*` → jetzt **werkstatt** (Reader liegt in der Werkstatt), nicht mehr 'books'.
- `dashboard` → wenn `location.hash === '#lektionen'` ⇒ **'lektionen'**, sonst 'dashboard'.
  (Start UND Lektionen zeigen auf `dashboard.html`; nur der Hash unterscheidet den aktiven Tab.)
- `schreibwerkstatt`/`taller` → werkstatt (unverändert) · `sessions` → mein (unverändert) · `chat` → talk.
- Kleinkram: ein `hashchange`-Listener, der die aktive Tab-Markierung neu setzt (sonst springt die
  Markierung nicht, wenn man auf `dashboard.html` bleibt und den Lektionen-Tab tippt). Leicht halten:
  nur die `.active`-Klasse umhängen.

**A7 · Anker in `dashboard.html`:** sicherstellen, dass `id="lektionen"` (und `id="lernweg"`)
existiert/erreichbar ist, damit die Tabs/Sheet-Einträge dorthin scrollen. (Der Lektion-Redirect
aus `chat.html` (Teil 32) nutzt `#lektionen` schon — Ziel muss real sein.)

**ABNAHME A:**
- [ ] 5 Tabs in neuer Reihenfolge (Start · Werkstatt · Gespräch · Lektionen · Mein) auf ALLEN 6 nav.js-Seiten.
- [ ] Werkstatt-Sheet: Reader · Meine Bücher (->books.html, erster) · Lesewerkstatt (->taller.html) · Schreibwerkstatt · Wortschatz-Werkstatt (bald).
- [ ] Lektionen-Tab → `dashboard.html#lektionen`; Tab aktiv bei `#lektionen`.
- [ ] Mein-Sheet OHNE Lektionen (nur Lernweg · Verlauf · Einstellungen-bald-mit-Ziel).
- [ ] `books.html`/`cap*` aktivieren den **Werkstatt**-Tab.
- [ ] Mitte-Capy vollständig + belebt (`spkCapyAlive`), i18n DE/ES/EN korrekt.
- [ ] `node --check nav.js` grün; jede der 6 Seiten einzeln headless geprüft (wie Teil 34).

---

## TEIL B — Gespräch-Opener entrümpeln · `chat.html`

Befund (Leo): der Opener (Einstieg) ist überladen, ist aber NUR eine Wahl-Seite. Oben soll nur
EINE Zeile „Wähle eine Aktivität" stehen, darunter die Wahl — KEIN Doppel-Gruß, KEINE Profil-Zeile,
KEIN Schreibfeld, KEIN zweiter Capy. Schreibfeld + Chrome erscheinen erst, wenn das Gespräch beginnt.

**B1 · Opener-Zustand (solange die `gabelung` sichtbar ist, `showGabelung` Z.895):**
- KEINE Begrüßungs-Blase rendern. Heute kommt der [EINSTIEG]-Gruß als Spikiu-Blase mit 🔊 +
  Übersetzungs-Kästchen + Capy-Avatar (= der „Doppel-Gruß" + der kleine zweite Capy). Am Opener
  stattdessen ganz oben EINE schlichte Zeile **„Wähle eine Aktivität"** (i18n de/es/en in der
  Muttersprache; z. B. als `.gab-ask`-Überschrift im `gabelung`-Wrap, Z.903-907). [EINSTIEG]-Pfad
  frisch ansehen — am saubersten den Gruß-Bubble am Opener gar nicht rendern.
- Profil-Chip (`#pLangs`-Zeile, Z.213-217): ausgeblendet.
- `.input-area` (Z.233): ausgeblendet.

**B2 · Wahl getroffen → Chrome erscheint:**
- `goFree()` (Z.919) und `pickTopic()`: `.input-area` wieder einblenden (frei = Eingabe; geführt =
  sichtbar, aber wie heute via `lockComposer`/`guiding` gesperrt). Profil-Chip ab Gesprächsbeginn
  wieder sichtbar (Default).
- Ab dem ersten echten Zug läuft ALLES wie heute (Blasen, 🔊, Häppchen, Korrektur-Karte,
  Antwort-Paletten, Lektion-Angebot Teil 32, Ausstiegs-Leiste). NICHTS davon ändern.

**B3 · Nicht anfassen:** der `turn()`-Zyklus und alle geführten/freien Mechaniken. Nur der
OPENER-Zustand wird ruhiger.

**ABNAHME B:**
- [ ] Opener zeigt nur „Wähle eine Aktivität" + 💬 plaudern + Themen + „Etwas anderes…".
- [ ] Kein Gruß-Bubble, kein zweiter Capy, kein Profil-Chip, kein Schreibfeld am Opener.
- [ ] Nach Wahl (plaudern/Thema) erscheint das Schreibfeld; laufendes Gespräch unverändert.
- [ ] `node --check` grün; keine browser-belegten Variablennamen; Emphasis nur `<em>`.

---

## TEIL C — Dashboard-Kopf = Sprichwort des Tages · `dashboard.html` + NEU `sprichwort.js`

Befund (Leo): statt „🐻 Spikiu" oben (der Nutzer ist eh auf spikiu.com) eine Zeile, die TÄGLICH
wechselt: ein Sprichwort in der ZIELSPRACHE, IMMER mit Übersetzung in der Muttersprache, Quelle
OHNE Link (damit niemand auf die Idee kommt, Spikiu zu verlassen). Beta = nur kuratierte
Sprichwörter (Option A); Live-Schlagzeilen (Option B) = Phase 2 (Supabase/Feed).

**C1 · NEU `sprichwort.js`** (liegt bereit — Inhalt wie geliefert übernehmen; Leo kuratiert die
Liste später): statischer Root-Helfer wie `nav.js` (KEIN `vercel.json`-Eintrag), exponiert
`window.spikiuSprichwort(zielsprache, muttersprache)` → `{ text, translation, src }` (`text` =
Zielsprache, `translation` = Muttersprache, IMMER gesetzt). Kuratierte Liste pro Zielsprache
(es/de/en/el) mit Übersetzung nach de/es/en + Quelle; tägliche Rotation über Kalendertag; rein
lokal. `node --check` grün.

**C2 · `dashboard.html`:**
- `<script src="sprichwort.js" defer></script>` einbinden (neben `nav.js`, Z.1254).
- Ganz oben (VOR `.topbar`/`.greeting`, Z.178) eine schlanke Sprichwort-Kopfzeile rendern:
  Sprichwort (Zielsprache, Serif kursiv) + Übersetzung (Muttersprache, gedämpft) + „— Quelle"
  (ohne Link). Ruhig, Tokens der Seite.
- Profil → Codes: das Dashboard liest heute `_target`/`_native` als Klarnamen (Z.1182-1196,
  'Deutsch'/'Español'/'English'). In Codes mappen (de/es/en/el bzw. de/es/en) und
  `spikiuSprichwort(ziel, mutter)` aufrufen; Übersetzung IMMER anzeigen.
- Die von `nav.js` auf dem Dashboard injizierte Marken-Topbar (`.spk-topbar` mit „🐻 Spikiu")
  ausblenden, damit nicht Logo + Sprichwort doppelt steht — am einfachsten in `dashboard.html`
  per CSS `.spk-topbar{ display:none }` (NUR dashboard.html; books/sessions behalten ihre Topbar).
  **`nav.js` dafür NICHT anfassen.**

**ABNAHME C:**
- [ ] Dashboard-Kopf zeigt das Sprichwort des Tages in der Zielsprache + Übersetzung in der
      Muttersprache + Quelle ohne Link.
- [ ] Kein „🐻 Spikiu"-Logo mehr oben auf dem Dashboard (andere Seiten unverändert).
- [ ] Rotiert täglich (Kalendertag).
- [ ] `node --check` grün (sprichwort.js + dashboard-Inline).

---

## AUSDRÜCKLICH NICHT
- `api/*` · Seele · `*-modus.md` · `vercel.json` · `capy-vivo.js` · `audio.js` · Reader-HTMLs
  nicht anfassen. Kein Stripe/Supabase.
- Das laufende Gespräch + die Lektion-Mechanik (Teil 32) NICHT verändern (nur der Opener-Zustand).
- `nav.js` für Teil C NICHT anfassen (Topbar-Ausblendung passiert in dashboard.html per CSS).
- Capy bei jedem Tab/Capy VOLLSTÄNDIG (2 Ohren/4 Pfoten), nie trasquilado.

## REIHENFOLGE / HINWEIS
A/B/C sind unabhängig. Empfehlung: **A zuerst** (global, alle 6 Seiten einzeln headless prüfen wie
Teil 34), dann B, dann C — gern getrennt committen.

## DANACH
Design-Welle Paket 3 „Baum" (`prototyp-baum-lebt.html`) · Memoria/Voz/Reel-tactil ·
Kleinkram-Paket 2 (Genus-Begrüßung Dashboard + Lesebegleiter-intro). Offen aus Teil 34:
`learnraum.html` (retten/retire?) · echte Einstellungen-Seite. Backlog: Audio Phase B/C ·
Assessment-als-Gespräch · Legal-Sequenz · Supabase + ElevenLabs = Phase 2.
