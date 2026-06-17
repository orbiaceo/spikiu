# SPIKIU — BUILD-LEDGER
_Claudes eigene autoritative Liste. Leonardo editiert nie Code — die hier
gelistete Version ist die Wahrheit. Claude pflegt diese Liste bei JEDEM Schritt._

Stand: 18.06.2026 (chat.html trägt nav.js im SLOT-MODUS — Hamburger+Logo in der vorhandenen Kopfzeile, keine zweite Leiste · nav.js auf die 4 scrollbaren Seiten integriert + Gym-Knopf · Design 18.06.: chat.html-nav (Slot) beauftragt, 'Beginnen wir!'-Auslöser in CLAUDE.md · Vorstand 17.06.: Gesprächs-Raum + Assessment LIVE bestätigt — alle 16.06.-Schulden getilgt) · Design 17.06.: nav-Paket entworfen, Gym-Idee (Lina) aufgenommen

---

## ⚠️ VOR JEDEM BACKEND-BAU — PFLICHT (teuer gelernt am 15./16.06.)

**NIE wieder aus der Erinnerung oder dem Project-Knowledge-Snapshot bauen.**
Der Snapshot HINKT dem echten `dev` hinterher. Am 15.06. kostete genau das
über eine Stunde: Claude hielt tote Dateien für lebendig und riet ins Blaue.

Vor der ersten Code-Zeile eines Backends IMMER diese drei lesen lassen
(jeweils mit `| xclip -selection clipboard`):

```
git ls-tree -r --name-only origin/dev        # was WIRKLICH in dev liegt
cat package.json                             # ESM oder CommonJS? (Antwort unten)
cat api/chat.js                              # das Muster, das nachweislich läuft
```

Erst schauen, was IST. Dann bauen. Reihenfolge nie umdrehen.

---

## STACK-WAHRHEITEN (am echten `dev` verifiziert — nicht raten)

- **KEIN `package.json` im Repo.** Vercel rät den Modul-Typ pro Datei aus der
  Syntax. `export default` → wird als ESM erkannt und nach CommonJS transpiliert.
- **`import.meta` ist VERBOTEN.** Lässt sich nicht nach CommonJS transpilieren →
  `SyntaxError: Cannot use 'import.meta' outside a module` → FUNCTION_INVOCATION_FAILED.
  Für Pfade IMMER `process.cwd()`, nie `import.meta.url`.
- **Funktionen schreiben im Stil von `api/chat.js`:** `export default async function
  handler(req,res)`, CORS-Header, `OPTIONS`-Kurzschluss, `x-api-key` aus
  `process.env.ANTHROPIC_API_KEY`, Modell `claude-sonnet-4-5`.
- **Dateinamen `.js`** (nicht `.mjs`). `.mjs` war eine Sackgasse.
- **`vercel.json` muss exakt auf den Dateinamen zeigen.** `functions` referenzierte
  einst `api/lektor.js`, während die Datei `lektor.mjs` hieß → `includeFiles` griff
  nie. Beim Anfassen prüfen: Pfad in `vercel.json` == realer Dateiname.
- **Dateien zur Laufzeit lesen** geht (war vorher NIRGENDS im Backend erprobt):
  `readFileSync(join(process.cwd(), 'datei.md'))`, abgesichert per `includeFiles`
  in `vercel.json`. Mehrere Kandidatenpfade probieren, im Fehlerfall Klartext zurück.
- **Vercel Deployment Protection** schützt Preview-URLs hinter einem Login. Ein
  curl/fetch bekommt dann eine HTML-Loginseite statt JSON — sieht aus wie ein
  kaputter Endpoint, ist aber die Mauer. Für die Beta: Settings → Deployment
  Protection → Vercel Authentication auf „nur Production" / aus.

---

## ARBEITSREGELN MIT LEONARDO (Terminal-Workflow)

- **Downloads:** Leonardo lädt alles nach `~/spikiu_downloads`. Kopier-Befehl:
  `cp ~/spikiu_downloads/<datei> ~/projects/spikiu/...`
- **xclip:** An JEDEN Befehl, dessen Output Claude braucht: `... 2>&1 | xclip -selection clipboard`.
  Das `2>&1` nicht vergessen, sonst fehlen Fehlermeldungen.
- **Download-Falle (15.06.):** Der Browser kann eine neue Datei als `lektor(1).js`
  speichern ODER der Download ist noch nicht durch → `cp` kopiert Alt auf Alt →
  `git` sieht „nichts zu committen". IMMER nach dem `cp` verifizieren, BEVOR commit:
  `grep -c "<eindeutige neue Zeile>" ~/projects/spikiu/api/<datei>` muss `1` sein.
- Leonardo editiert nie Code. Claude liefert komplette Dateien via `present_files`.

---

## DER DATEN-VERTRAG (Lernweg — page1/page2)

Der Lernweg fließt durch DREI Dateien, alle MÜSSEN dieselbe Struktur sprechen:

```
assessment.html          ──speichert─▶  spikiu_user { profile, roadmapPending:true }
                         ──springt────▶  dashboard.html  (sofort)
dashboard.html           ──ruft────────▶  /api/generate-learningpath
generate-learningpath.js ──liefert────▶  { roadmap: { meta, page1, page2 } }
dashboard.html           ──liest───────▶  user.roadmap.page2
```

REGEL: Wird EINE dieser drei angefasst, Vertrag (page1/page2) prüfen.
Die alte Form `phases` ist TOT. Niemals zurück.

---

## DER LEKTOR-VERTRAG (Raum Schreiben)

`api/lektor.js` gibt zurück: `{ lektor, text }`. `lektor` ist das geparste Objekt,
`text` der Rohtext (Fallback). Der Lektor antwortet im Modell als EIN Block:

```
[LEKTOR]
{"sinn":"...","zitat":"...","sache":"...","form":null,"lautschrift":null,"status":"lesen"}
[/LEKTOR]
```

- `sinn` = Leser-Zeile, Sinn zuerst, Muttersprache. `zitat` = exakter Teilstring
  der EINEN Stelle (Oberfläche markiert ihn gold). `sache` = die eine Sache,
  Alltagssprache. `form` = fertige Korrektur oder null (Regler nach `koennen`).
  `lautschrift` = nur bei fremder Schrift (el). `status` =
  lesen|beinah|treffer|stuck|ziellinie.
- **Parser ist tolerant:** erst `JSON.parse`, sonst Feld-für-Feld-Auszug an den
  Markern. Überlebt gerade Anführungszeichen `"` MITTEN in Werten — der Klassiker,
  an dem striktes JSON.parse zerbrach (15.06. real getroffen). Zusätzlich verbietet
  der Prompt dem Lektor gerade `"` in Werten (nur typografische „ ").

---

## DATEI-STATUS

| Datei | Letzte Claude-Version | Vertrag | Deploy |
|---|---|---|---|
| `spikiu-seele.md` | Kanonische Seele, eingefroren 15.06. | Quelle der Wahrheit | ✅ in dev |
| `lektor-modus.md` | Schreib-Werkstatt Raum-Prompt, erbt von Seele | koennen+fremde_schrift+aufgabe | ✅ in dev |
| `api/lektor.js` | **LIVE** — Schreiben-Raum, EIN Endpoint alle Sprachen, `export default`, kein import.meta, Seele via process.cwd(), toleranter Parser | [LEKTOR]-Vertrag | ✅ live (commit 6da2832) |
| `vercel.json` | `includeFiles: "*.md"` für `api/lektor.js` UND `api/gespraech.js` | — | ✅ in dev |
| `gespraech-modus.md` | NEU (16.06.) — Freies-Gespräch Raum-Prompt, erbt von Seele per Grundsatz-Nummer. Opener = Begrüßung OHNE Frage, Regler nach `koennen`, fremde_schrift-Brücke, Rollenspiel | koennen+fremde_schrift, KEINE aufgabe | ✅ in dev |
| `api/gespraech.js` | NEU (16.06.) — Gesprächs-Raum, EIN Endpoint alle Sprachen, `export default`, kein import.meta, Seele via process.cwd(). KEIN Parser: gibt rohe Prosa `{ text }` zurück (freies Gespräch ist kein JSON-Vertrag) | Profil rein, Prosa raus | ✅ **LIVE bestätigt 17.06.** (spricht perfekt, Opener + Folgeantwort) |
| `api/lektor.parser.test.mjs` | NEU (16.06.) — Test für toleranten Parser, `node:test`, 9 Fälle inkl. gerade-`"`-Klassiker. Lädt lektor.js als data:-Modul → Quelle bleibt unangetastet, kein package.json nötig | prüft [LEKTOR]-Vertrag | ✅ in dev (commit 7e96353), nicht deployt (Test) |
| `schreibwerkstatt.html` | **LIVE** — Werkstück-Oberfläche, ruft /api/lektor, Zielsprache+Können-Wähler. **17.06.: verbotene Variable `history` → `verlauf` (window.history-Falle vom 16.06., im IIFE latent). Cross-Check grün.** | liest spikiu_user.profile defensiv | ✅ live (Fix gepusht origin/dev) |
| `index.html` | Landing, Sprach-Switcher | — | ✅ deployed |
| `assessment.html` | 7 Karten → Profil → Dashboard. **finish() (16.06.) schreibt jetzt kanonisch:** koennen (aus level gemappt), zielsprache/muttersprache (Codes), fremde_schrift, etappe:'samen'. level/targetLang etc. bleiben (Lernweg-Vertrag) | profile/roadmapPending + Raum-Vertrag | ✅ **LIVE bestätigt 17.06.** (alle 5 Felder + Lernweg-Felder grün in pruefung.html) |
| `pruefung.html` | NEU (17.06.) — sichtbare Profil-Verifikation ohne Konsole. Liest spikiu_user.profile, grün/rot je Feld (5 Raum-Felder + Lernweg-Felder). Diagnose-Werkzeug, kein Produkt. Capy komplett | liest spikiu_user.profile | ✅ in dev, Diagnose behalten |
| `generate-learningpath.js` | Antrieb→Syllabus, page1/page2 | page1/page2 | ⚠️ live prüfen |
| `dashboard.html` | page1/page2, DE/ES/EN. **18.06.: eigene Desktop-Sidebar + Mobile-Header + Drawer-JS ENTFERNT, `.app`-Grid → einspaltig, `.main` zentriert; nav.js eingebunden.** Tote sidebar-avatar/-name-JS raus | page1/page2 | ✅ in dev |
| `books.html` | Kapitel-Liste DE/ES, liest Profil. **18.06.: UI-Sprachschalter (`lang-bar`) + eigene `<nav>` ENTFERNT; nav.js eingebunden. `setLang()` bleibt (setzt Sprache aus Profil, leerer lang-btn-Loop harmlos)** | — | ✅ in dev |
| `sessions.html` | Buchungs-Seite. **18.06.: eigene Desktop-Sidebar + Mobile-Header + Drawer-JS ENTFERNT, `.app`-Grid → einspaltig, `.main` zentriert; nav.js eingebunden** | — | ✅ in dev |
| `learnraum.html` | Lernraum aus `spikiu_learnpath` (Empty-State → chat.html). **18.06.: nav.js eingebunden (hatte keine eigene Navi)** | — | ✅ in dev |
| `nav.js` | **INTEGRIERT (18.06.)** — self-mounting Topbar+Drawer, erkennt aktive Seite, liest Profil. Jetzt mit **Gym**-Eintrag (I18N de/es/en, Hantel-ICON, STRUCT `{id:'gym',disabled:true}` direkt nach `lessons`, „bald"-Badge). Auf den 4 scrollbaren Seiten via `<script src="nav.js" defer>` | — | ✅ in dev (Inject-Modus, kein data-spk-nav nötig) |
| `chat.html` | **NEU GEBAUT (16.06.), live bestätigt 17.06.** — Gesprächs-Raum-Oberfläche. Liest `spikiu_user`+defensive Brücke, KEIN Profil → Redirect `assessment.html`. Direkt in die Charla, Profil-Chip, ruft `/api/gespraech`. 4-Phasen-Maschine + PDF-Flow GELÖSCHT. Capy komplett (Ohren+Füße). Bug „antwortet nicht" gelöst. **17.06.: `fmt()` rendert jetzt auch `_kursiv_` → `<em>` (Muttersprach-Brücke), nur paarweise an Wortgrenzen — `el_perro` unberührt** · **18.06.: nav.js im SLOT-MODUS — `<header>` → `<header data-spk-nav>` (Logo+„← Dashboard"-Inhalt raus, nav.js füllt den Slot mit Hamburger+Logo, keine zweite Leiste); `<script src="nav.js" defer>` ergänzt. Charla-Script + Profil-Chip unberührt** | liest spikiu_user.profile defensiv | ✅ **LIVE — spricht, antwortet, Brücke kursiv** (nav: in dev, noch nicht live geklickt) |
| `prototyp-gespraech.html` | NEU (16.06.) — genehmigte Attrappe, führte zur chat.html-Oberfläche. Scripted, kein API | — | Prototyp, behalten |
| `api/chat-german.js`, `-spanish.js`, `-english.js` | **TOT — deprecated Sprach-Split** | — | ⛔ NICHT imitieren, nicht als „Raum" behandeln. Sprache = Feld. |
| `api/chat.js` | Dumb-Proxy (system clientseitig) | — | Referenz-Muster für neue Endpoints |
| `prototyp-schreibwerkstatt.html` | Attrappe (genehmigt), führte zur Oberfläche | — | Prototyp, optional behalten |

---

## ARCHITEKTUR-PRINZIPIEN (gelten produktweit)

- **Räume ≠ Sprachen.** Getrennt werden nur RÄUME: Freies Gespräch, Mündlicher
  Ausdruck, Hörverständnis, Lesen, Schreiben. JEDER Raum ist EIN Endpoint für ALLE
  Zielsprachen; `zielsprache` (de/es/en/el) kommt als Profil-FELD rein. Kein
  Datei-Schnitt pro Sprache. Die alten `chat-*` sind der aufgehobene Split.
- **Eine Seele, eine Quelle.** `spikiu-seele.md` ist eingefroren. Jeder Raum-Prompt
  ERBT von ihr, indem der Endpoint sie zur Laufzeit liest — NIE kopieren, kein
  zweites handgepflegtes File (soul.js wurde verworfen: Duplikat-Falle).
- **Der Baum (Samen→Stamm→Krone) ist KEINE Proficiency-Note**, sondern 0–100% auf
  EIN Versprechen. CEFR nur intern als Lineal, nie im Frontend. (Details s. unten.)
- **Zwei Profil-Felder, getrennt:** `etappe` (samen|stamm|krone, sichtbar) vs.
  `koennen` (anfang|mittel|fortgeschritten, intern, steuert Lektor-Regler +
  Schrift-Brücke + Messlatte). `koennen`/`fremde_schrift`/`zielsprache`/`muttersprache`/
  `etappe` schreibt `assessment.html` seit 16.06. kanonisch ins Profil.

---

## OFFENE PUNKTE

1. **Schreiben-Raum querprüfen:** ✅ BACKEND-CROSS-CHECK 17.06. am dev-Endpoint:
   Regler greift hart (`anfang`→`form` gesetzt „Yo fui…"; `fortgeschritten`→`form:null`,
   ringen lassen) und el/`fremde_schrift`→`lautschrift` gesetzt (drei Spuren: form/
   lautschrift/sinn, „Egó íme kalá, efcharistó."). Render-Parität geprüft: Oberfläche
   zeigt strukturierte Felder via `esc()`, kein Markdown — KEIN `_kursiv_`-Befund hier
   (anders als chat.html; Lektor-Vertrag steuert von Markdown weg). NOCH ZU TESTEN (in
   der ECHTEN Oberfläche, nicht nur Endpoint): Treffer/Beinah/Stuck-Schleife, Ziellinie
   → Lektion-Angebot, de/en als Feld.
   FRAGE AN DESIGN: Die Oberfläche zeigt `koennen` als sichtbaren Wähler („Können:
   Anfang/Mittel/Fortgeschritten"), der Vertrag sagt aber „koennen INTERN, nie sichtbar".
   Werkbank-Affordanz für Beta — oder soll der Wähler raus? (Nicht angefasst.)
2. ~~**Assessment-Schuld:** schreibt level:A1/B1 statt koennen/fremde_schrift.~~
   ✅ GETILGT 16.06. + **LIVE BESTÄTIGT 17.06.** — Assessment durchlaufen, pruefung.html
   zeigt alle 5 Raum-Felder UND die Lernweg-Felder grün. finish() (rein additiv): koennen
   (Mappe A0/A1→anfang, A2/B1→mittel, B2→fortgeschritten), zielsprache/muttersprache (Codes),
   fremde_schrift, etappe:'samen' (Baum-Reset via Voll-Überschreib). Versprechen wird weiter
   vom Lernweg aus driveText+motivation komponiert. Räume NICHT angefasst — lesen die echten
   Felder, Brücke ist nur noch Alt-Fallback.
3. ~~**Problem 2 — Freies Gespräch:** chat.html überspringt Onboarding bei Profil.~~
   ✅ GELÖST 16.06. + **LIVE BESTÄTIGT 17.06.** (Spikiu grüßt + antwortet, mehrere Runden,
   spricht perfekt). Bug „antwortet nicht" war: History begann mit Assistant-Gruß → Anthropic
   lehnt ab. Fix: Verlauf glätten (alternate) + Backend setzt [EINSTIEG] vor, wenn erste
   Rolle ≠ user. Deferred (bewusst, v1 schlank): Material-Marker (PDF/Übung),
   Lektion-aus-Gespräch-Brücke. NOCH OFFEN (kein Blocker): el-Lautschrift live querprüfen.
4. ~~`nav.js` in alle App-Seiten, alte Navis raus.~~ ✅ TEIL ERLEDIGT 18.06.: die 4 SCROLLBAREN
   Seiten (dashboard, books, sessions, learnraum) tragen jetzt nav.js, alte Navis raus, genau eine
   Leiste. Gym-Knopf live (disabled, „bald"). **18.06. Teil 2: `chat.html` per SLOT-MODUS erledigt**
   (`<header data-spk-nav>` → nav.js füllt Hamburger+Logo in die vorhandene Kopfzeile, keine zweite
   Leiste; „← Dashboard" wandert in den Drawer; Charla + Profil-Chip + 100dvh-Layout unberührt).
   NOCH OFFEN als eigenes Paket: nur noch `schreibwerkstatt.html` (hat Test-Wähler Sprache/Können im
   Header → eigene Design-Entscheidung). NOCH NICHT live geklickt: Drawer/aktive Seite/Gym-Badge in der
   echten Oberfläche (nur Node-Syntax + Struktur grün) — gilt für alle 5 nav-Seiten inkl. chat.
5. Dashboard „3 capítulos" → „4". Legal AGB/DSGVO/Impressum vor Juli.
6. ElevenLabs-Audio (Starter 5 $/Mt., Cohort-Caching) — verschoben.

---

## MERKREGELN

- Beim Anfassen einer der drei Lernweg-Dateien: Vertrag page1/page2 prüfen.
- Schreib-Werkstatt-Einstieg: Aufgabe zuerst. `aufgabe` gesetzt → direkt nutzen.
  `aufgabe` null → EINE Frage. Nie zwei Fragen, nie Übung vor dem ersten Text.
- Ein Revert ist auch eine Änderung — hier eintragen.
- Bei Kontext-Kompression: aus Transcript + outputs + dieser Liste rekonstruieren.
  NIE Leonardo nach Dateien fragen.
- NIE Asterisks für Betonung in HTML — immer `<em>`.
- **Spikiu (das Capy) IMMER komplett bauen** — nie ohne Ohren, nie ohne Füße, auch
  nicht als Mini-Icon. Kanonisch ist der volle SVG aus `chat.html` (2 Ohren cy=17,
  4 Füße cy=66/68). (Leonardo real moniert 16.06.)

---

## POST-MORTEM: SCHREIBEN-RAUM-SITZUNG (15./16.06.) — die Fehler, schwarz auf weiß

Damit sich keiner davon wiederholt. Reihenfolge wie sie passierten:

1. **Tote Dateien für lebendig gehalten.** Claude behandelte `chat-german/-spanish/
   -english.js` als „moderne Endpoints" und wollte sich daran „einreihen". Sie sind
   der aufgehobene Sprach-Split. → Ursache: aus Snapshot statt aus echtem `dev` gearbeitet.
2. **soul.js vorgeschlagen** (zwei handgepflegte Kopien der Seele). Verletzt
   Single-Source. Verworfen → Seele zur Laufzeit aus der .md lesen.
3. **`import.meta.url` benutzt** → FUNCTION_INVOCATION_FAILED. Weil kein
   package.json, transpiliert Vercel `export default` nach CJS, aber import.meta nicht.
   → Fix: `process.cwd()`, kein import.meta.
4. **`.mjs`-Umbenennung** als vermeintlicher Fix → Sackgasse, und `vercel.json` zeigte
   weiter auf `lektor.js` → includeFiles griff nie. → Fix: zurück zu `lektor.js` CJS-tauglich.
5. **Vercel Deployment Protection** → Preview-URL gab HTML-Login statt JSON; sah aus
   wie kaputter Endpoint. → Schutz für Previews aus.
6. **Gerade `"` mitten im JSON-Wert** zerbrach `JSON.parse` → `lektor:null`. → Fix:
   toleranter Parser + Prompt verbietet gerade Quotes.
7. **Download-Falle:** alte Datei in `~/spikiu_downloads`, `cp` Alt-auf-Alt, „nichts
   zu committen". → Fix: nach jedem `cp` per `grep -c` verifizieren vor dem commit.

**Die eine Meta-Lehre über allen:** ERST den echten `dev` anschauen (ls-tree +
package.json + ein laufendes File), DANN Konzept, DANN Code. Snapshot ≠ Wahrheit.

---

**Diese Sitzung (18.06., Teil 2 — DESIGN, claude.ai):** Design-Gespräch, kein Code.
Leonardo sah: alle 4 scrollbaren Seiten haben den Hamburger, nur `chat.html` nicht (war
bewusst Paket B). Entschieden: chat.html bekommt nav per SLOT-MODUS (Vollhöhe/100dvh →
`data-spk-nav` an die vorhandene Kopfzeile, KEINE zweite Leiste; „← Dashboard" → Drawer).
`schreibwerkstatt.html` bleibt vorerst außen vor (Test-Wähler Sprache/Können im Header →
eigene Entscheidung später). Auftrag geschrieben (`AKTUELLER-AUFTRAG.md`). ZUSÄTZLICH:
`CLAUDE.md` um den Start-Auslöser ergänzt — „Beginnen wir!" (o. ä.) = sofort Ledger+Auftrag
lesen und erledigen, nicht nachfragen.

---

## ÜBERGABE → NÄCHSTER CHAT

Schreiben-Raum steht und atmet (es/anfang live bestätigt). Die Architektur ist
gesetzt: ein Endpoint pro Raum, Sprache als Feld, Seele zur Laufzeit, [LEKTOR]-artiger
Vertrag, toleranter Parser. Dieses Muster ist die Blaupause für jeden weiteren Raum.

**Diese Sitzung (16.06.):** Erster Test im Repo — `api/lektor.parser.test.mjs`
sichert den toleranten Parser ab, inkl. des gerade-`"`-Klassikers (Post-Mortem 6).
Lauf: `node --test api/`. Trick gegen die Kein-package.json-Falle: der Test liest
lektor.js, entfernt die fs/path-Imports, legt parseLektor/normalize frei und lädt
das Ganze als `data:`-Modul — die Live-Datei bleibt byte-genau unverändert. Damit
existiert ein Muster für künftige Endpoint-Tests, ohne den Stack zu verbiegen.
NICHT getestet: der handler/Anthropic-Pfad (bräuchte fetch-Mock + Key).

**Diese Sitzung (16.06., Teil 2):** Gesprächs-Raum gebaut (Problem 2 gelöst). Voller
Durchlauf der Reihenfolge: echten dev geprüft → Konzept → Prototyp (genehmigt) → Code.
Drei neue/umgebaute Dateien (`gespraech-modus.md`, `api/gespraech.js`, neues `chat.html`)
+ `vercel.json`. Bewusste v1-Schlankheit: reine Charla, KEINE Material-Marker, KEINE
Lektion-Brücke (deferred). Bestätigt: das Lektor-Muster trägt einen zweiten Raum sauber.

**Diese Sitzung (16.06., Teil 3):** Assessment-Schuld getilgt — `finish()` schreibt
das Profil jetzt kanonisch (koennen/zielsprache/muttersprache/fremde_schrift/etappe),
rein additiv, Lernweg-Vertrag unangetastet. Damit lesen ALLE Räume die echten Felder;
die defensive Brücke ist nur noch Fallback. Kein Prototyp nötig (nicht visuell).

**Diese Sitzung (17.06.):** Gesprächs-Raum LIVE bestätigt — Spikiu grüßt und antwortet
perfekt über mehrere Runden. Damit ist Problem 2 vollständig geschlossen (gebaut +
deployt + am echten spikiu.com verifiziert). Kein neuer Code nötig: die fünf chat.html-
Commits (abf41d2…370ba9e) der Vorsitzung hatten den „antwortet nicht"-Bug bereits
behoben (Verlauf glätten + Backend-[EINSTIEG]-Guard). Nur Ledger nachgezogen.

**Diese Sitzung (17.06., Teil 3):** Echter Auftrag aus `AKTUELLER-AUFTRAG.md` erledigt
(lag nur in den Project-Files, nicht im Repo — Snapshot-Drift, klassisch). `chat.html` →
`fmt()` rendert jetzt `_kursiv_` → `<em>` für Spikius Muttersprach-Brücke. Regel greift
nur paarweise an Wortgrenzen (`el_perro` bleibt heil). Alle 5 Abnahme-Kriterien per
Node-Test grün. ZUSÄTZLICH ins Repo geholt: `CLAUDE.md` + `AKTUELLER-AUFTRAG.md` (lagen
bisher NUR in den Claude.ai-Project-Files → driften). Jetzt im Repo = Quelle der Wahrheit.

**Diese Sitzung (17.06., Teil 2):** Assessment-Schuld LIVE bestätigt. Neues Werkzeug
`pruefung.html` (sichtbare Profil-Verifikation, keine Konsole — Leonardo kämpft mit
DevTools) zeigt alle 5 Raum-Felder + Lernweg-Felder grün. Damit sind ALLE Live-Tests
der 16.06.-Bauten abgehakt: Gesprächs-Raum ✅, Assessment ✅, Schreiben-Raum (es/anfang) ✅.

**Diese Sitzung (17.06., Teil 4):** Schreiben-Raum-Cross-Check (Offene Punkte 1, Backend-
Teil). Drei Dateien gelesen (`schreibwerkstatt.html`, `api/lektor.js`, `lektor-modus.md`),
am dev-Endpoint gegengeprobt: Regler hart bestätigt (anfang→form, fortgeschritten→form:null),
el-Lautschrift bestätigt (drei Spuren). EIN Handwerks-Fund + gefixt: verbotene Variable
`history` → `verlauf` in schreibwerkstatt.html (window.history-Falle vom 16.06., im IIFE
zwar geshadowt, aber Eiserne-Regel-Verstoß + Landmine). node --check grün, gepusht. KEIN
`_kursiv_`-Befund (Raum rendert Felder via esc(), kein Markdown). Offen gelassen (Design):
sichtbarer `koennen`-Wähler vs. „intern, nie sichtbar" → FRAGE AN DESIGN im Offene-Punkte-1.

**Diese Sitzung (17.06., Teil 5 — DESIGN, claude.ai):** Design-Gespräch, kein Code.
Entschieden + entworfen: das nav-Paket. `nav.js` (selbst-montierend, spk-Styles, aktive Seite
auto) kommt auf die 4 SCROLLBAREN Seiten (dashboard, books, sessions, learnraum) — alte Navis
raus, genau eine Leiste; Prototyp `prototyp-nav.html` genehmigt. Vollhöhen-Seiten (chat,
schreibwerkstatt) bewusst als FOLGE-Paket (100dvh heikel, eigener Prototyp). Reader-Kapitel
bleiben immersiv (KISS, kein Drawer). Auftrag geschrieben (`AKTUELLER-AUFTRAG.md`).

**NEUE VISION — Gym (geplanter dritter Raum, Idee von Testerin Lina, 16, München, lernt Spanisch):**
Der STILLE Zwilling zum Sprechen — Wortschatz-/Gedächtnis-Training für unterwegs (U-Bahn),
wenn man nicht reden kann/will. Gespeist NUR aus dem Companion: Wörter, bei denen der Lerner im
Gespräch wackelte oder die er für eine Prüfung bestellt hat. NICHT generischer Vokabeltrainer
(sonst Duolingo); „gewollt trainiert", kein Streak-Zwang. Verschiedene Übungsformate, Spaced
Repetition (Phase 2). HEUTE im Auftrag: nur der Nav-Knopf („Gym", Hantel-Icon, unter Lektionen,
„bald"-Badge). Inhalt als eigener Raum später designen (Lektor-Muster).

**Aktuelles Arbeitspaket (in `AKTUELLER-AUFTRAG.md`):** nav.js auf die 4 scrollbaren Seiten
+ Gym-Knopf ins Menü. DANACH, je eigenes Paket:
(a) nav auf Vollhöhen-Seiten `chat.html` + `schreibwerkstatt.html` (Slot-Modus, eigener Prototyp),
(b) Schreiben-Raum in der ECHTEN Oberfläche durchklicken (Treffer/Beinah/Stuck/Ziellinie, de/en —
der Cross-Check deckte nur den Backend-Vertrag ab, nicht die Klick-Schleife),
(c) nächster Raum (Mündlich / Hörverständnis / Lesen) nach Lektor-Muster — braucht zuerst die
`*-modus.md` aus dem Design-Gespräch (WAS entscheidet Design).
DEV bleibt die einzige Live-Umgebung
(spikiu.com ist NICHT der Deploy — alles läuft auf spikiu-git-dev-orbiaceos-projects.vercel.app).

**Diese Sitzung (18.06.):** nav-Paket Teil A+B erledigt (Auftrag aus `AKTUELLER-AUFTRAG.md`).
nav.js bekam den Gym-Eintrag (I18N de/es/en = „Gym", Hantel-ICON, STRUCT `{id:'gym',disabled:true}`
direkt nach `lessons` → „bald"-Badge, nicht klickbar). nav.js auf die 4 scrollbaren Seiten gebracht,
jeweils die SEITENEIGENE Navi entfernt → genau eine Leiste:
- `dashboard.html` + `sessions.html`: hatten ein Grid-Layout (Desktop-Sidebar 240px + Mobile-Header +
  Drawer-JS). Beides raus, `.app`-Grid → `min-height:100vh` einspaltig, `.main` mit `margin:0 auto`
  zentriert. In dashboard zusätzlich die toten `sidebar-avatar/-name`-JS-Zeilen entfernt (sonst
  null.textContent → Konsolenfehler). nav.js liefert Avatar/Name/„Gratis" jetzt aus dem Profil.
- `books.html`: UI-Sprachschalter (`lang-bar`) + eigene `<nav>` raus (Sprache steht fest). `setLang()`
  bleibt (setzt Sprache aus Profil; der `.lang-btn`-Loop läuft jetzt leer, harmlos).
- `learnraum.html`: hatte keine eigene Navi → nur `<script src="nav.js" defer>` ergänzt.
Inject-Modus reicht überall (keine der 4 ist ein 100dvh-Flex-Layout → kein `data-spk-nav`-Slot nötig).
Abnahme: `node --check nav.js` grün; alle 4 Inline-Scripts via `vm.Script` grün; Tag-Balance/Struktur
geprüft (0 aside, main paarig, kein mobile-header-MARKUP mehr — nur tote CSS-Regeln, harmlos).
NICHT live geklickt (Vercel) — nächster Schritt: dashboard.html?v=N → Hamburger → Drawer, dann books/
sessions/learnraum durch. Vollhöhen-Seiten (chat, schreibwerkstatt) bewusst NICHT angefasst (eigenes Paket).

**Diese Sitzung (18.06., Teil 3):** nav-Paket abgeschlossen für `chat.html` (Auftrag aus
`AKTUELLER-AUFTRAG.md`, Slot-Modus). Genau zwei chirurgische Eingriffe: (1) der vorhandene
`<header>` bekam `data-spk-nav` und sein alter Inhalt (eigenes Logo + „← Dashboard"-Link) wurde
entfernt — nav.js erkennt den Slot (`document.querySelector('[data-spk-nav]')`), setzt
Hamburger+Logo HINEIN statt eine zweite sticky Leiste zu bauen; die Seiten-eigenen header-Styles
(flex/padding/border-bottom/flex-shrink) bleiben, also EINE Leiste, 100dvh-Layout heil. (2)
`<script src="nav.js" defer>` vor `</body>`. Profil-Chip und das komplette Gesprächs-Script
UNANGETASTET (`verlauf` bleibt `verlauf`). Abnahme: `node --check nav.js` grün, Inline-Script via
`vm.Script` grün, genau ein `<header>`-Paar, `back-link`-ELEMENT raus (nur totes CSS Z.21–22 bleibt,
harmlos), `getActive()` mappt chat→`talk` (Drawer markiert „Jetzt sprechen"). NICHT live geklickt
(Vercel) — Rest-Test gilt jetzt für ALLE 5 nav-Seiten: `?v=N` → Hamburger → Drawer/aktive Seite/
Gym-Badge. Vollhöhen-Rest: nur noch `schreibwerkstatt.html` (Test-Wähler im Header → eigenes Paket).

### EISERNE REGEL
Eine Sitzung endet NIE mit uncommittetem Code. Am Sitzungsende: Commits + diese
Übergabe aktualisieren. Ein Chat = ein Arbeitspaket, bewusst beendet.
