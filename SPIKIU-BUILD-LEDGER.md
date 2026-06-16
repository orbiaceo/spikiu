# SPIKIU — BUILD-LEDGER
_Claudes eigene autoritative Liste. Leonardo editiert nie Code — die hier
gelistete Version ist die Wahrheit. Claude pflegt diese Liste bei JEDEM Schritt._

Stand: 16.06.2026 (Gesprächs-Raum gebaut — Problem 2 gelöst)

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
| `api/gespraech.js` | NEU (16.06.) — Gesprächs-Raum, EIN Endpoint alle Sprachen, `export default`, kein import.meta, Seele via process.cwd(). KEIN Parser: gibt rohe Prosa `{ text }` zurück (freies Gespräch ist kein JSON-Vertrag) | Profil rein, Prosa raus | ⏳ in dev, nicht live-getestet (braucht Deploy+Key) |
| `api/lektor.parser.test.mjs` | NEU (16.06.) — Test für toleranten Parser, `node:test`, 9 Fälle inkl. gerade-`"`-Klassiker. Lädt lektor.js als data:-Modul → Quelle bleibt unangetastet, kein package.json nötig | prüft [LEKTOR]-Vertrag | ✅ in dev (commit 7e96353), nicht deployt (Test) |
| `schreibwerkstatt.html` | **LIVE** — Werkstück-Oberfläche, ruft /api/lektor, Zielsprache+Können-Wähler | liest spikiu_user.profile defensiv | ✅ live |
| `index.html` | Landing, Sprach-Switcher | — | ✅ deployed |
| `assessment.html` | 7 Karten → Profil → Dashboard | profile/roadmapPending | ⚠️ schreibt noch `level:A1/B1` statt `koennen`/`fremde_schrift` |
| `generate-learningpath.js` | Antrieb→Syllabus, page1/page2 | page1/page2 | ⚠️ live prüfen |
| `dashboard.html` | page1/page2, DE/ES/EN | page1/page2 | ✅ deployed |
| `nav.js` | Slot-Mode, self-mounting | — | ⏳ noch nicht integriert |
| `chat.html` | **NEU GEBAUT (16.06.)** — Gesprächs-Raum-Oberfläche. Liest `spikiu_user`+defensive Brücke, KEIN Profil → Redirect `assessment.html`. Direkt in die Charla, Profil-Chip, ruft `/api/gespraech`. 4-Phasen-Maschine + PDF-Flow GELÖSCHT. Capy komplett (Ohren+Füße) | liest spikiu_user.profile defensiv | ⏳ in dev, Live-Pfad nicht getestet |
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
  Schrift-Brücke + Messlatte). `koennen`/`fremde_schrift` existieren im Profil noch NICHT.

---

## OFFENE PUNKTE

1. **Schreiben-Raum querprüfen:** es/anfang ist in der Oberfläche bestätigt live.
   NOCH ZU TESTEN: de/en/el als Feld (ein Endpoint!), el mit Lautschrift-Zeile,
   Können „fortgeschritten" (Form verschwindet), Treffer/Beinah/Stuck-Schleife,
   Ziellinie → Lektion-Angebot.
2. **Assessment-Schuld (eigenes Paket!):** `assessment.html` schreibt `level:A1/B1`
   (Rohwert, falscher Schlüssel, verletzt Niemals-Liste). Muss setzen: `koennen` =
   anfang|mittel|fortgeschritten, `fremde_schrift` = true|false (el→true). Plus
   Lifecycle: Versprechen erfassen, Baum-Reset bei neuem Ziel. NICHT mit Räumen mischen.
3. ~~**Problem 2 — Freies Gespräch:** chat.html überspringt Onboarding bei Profil.~~
   ✅ GELÖST 16.06. (Konzept→Prototyp→Code, Lektor-Muster). NOCH ZU TESTEN nach Deploy:
   Opener ohne Frage, Spiegel-Regler nach `koennen`, `el`-Lautschrift, Redirect ohne
   Profil, Verlauf über mehrere Runden. Deferred (bewusst, v1 schlank): Material-Marker
   (PDF/Übung), Lektion-aus-Gespräch-Brücke.
4. `nav.js` in alle App-Seiten (Slot-Mode), alte Navis raus.
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

**Nächstes Arbeitspaket (Vorschlag):** Gesprächs-Raum nach Deploy live querprüfen
(Liste in Offene Punkte 3), DANN Assessment-Schuld — denn solange `assessment.html`
`level:A1/B1` statt `koennen`/`fremde_schrift` schreibt, hängt JEDER Raum an der
defensiven Brücke. Das ist jetzt der größte gemeinsame Hebel.

**Separat, nicht mischen:** Assessment-Schuld (koennen/fremde_schrift ins Profil).

### EISERNE REGEL
Eine Sitzung endet NIE mit uncommittetem Code. Am Sitzungsende: Commits + diese
Übergabe aktualisieren. Ein Chat = ein Arbeitspaket, bewusst beendet.
