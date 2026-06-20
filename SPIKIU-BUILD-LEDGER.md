# SPIKIU — BUILD-LEDGER
_Claudes eigene autoritative Liste. Leonardo editiert nie Code — die hier
gelistete Version ist die Wahrheit. Claude pflegt diese Liste bei JEDEM Schritt._

Stand: 20.06.2026 (Bau 20.06. (Claude Code): **AUDIO PHASE A GEBAUT + auf dev gepusht (commit d83c8ab).** `audio.js` am Repo-Root = provider-agnostischer Helfer, EINZIGE öffentliche API `speak(text,zielsprache)` + `warm(zielsprache)`; zielsprache∈de/es/en/el → fester voiceId (de_DE-thorsten-high · es_ES-sharvard-medium · en_US-lessac-high · el_GR-rapunzelina-low), kein voiceId/Piper-Detail leckt nach außen. EINE warme Session PRO SPRACHE: die Lib `@mintplex-labs/piper-tts-web` hält intern ein Singleton (`TtsSession._instance`) und lädt sonst nur EINE Stimme pro Seitenleben → `audio.js` verwaltet die Sessions selbst (Singleton vor jedem neuen Stimm-Build nullen, serialisiert; `predict()` läuft auf der instanz-eigenen ONNX-Session, nicht aufs Singleton). Satzweise Synthese (erster Ton sofort), Pflicht-Fallback auf `speechSynthesis` (nie stummer Knopf). SELF-HOSTING: alle statischen Assets unter `audio/vendor/` am REPO-ROOT (NICHT `public/` — dieses Projekt hat KEIN Framework/Build, Vercel liefert statisch vom Root aus wie `nav.js`→`/nav.js`; ein `public/` läge unter `/public/…` und bräche die Pfade). Vendoret: piper-tts-web (MIT), onnxruntime-web@1.18.0 ESM (`ort.min.js`) + ALLE VIER ort-wasm-Varianten (simd/plain/threaded — threaded nur als 404-Schutz; ohne COOP/COEP wählt ORT non-threaded), piper_phonemize.wasm+.data (espeak, 18 MB). ~58 MB statisch. ZWEI kommentierte SPIKIU-PATCHes an der vendored Lib: (1) `HF_BASE`→`rhasspy/piper-voices` (Auftrag-Tabelle; OPFS-Cache greift weiter, Key=Dateiname); (2) bare `import("onnxruntime-web")`→`/audio/vendor/ort/ort.min.js` (self-gehostet → KEINE Import-Map in konsumierenden Seiten nötig, wichtig für Phase B). MODELLE NICHT IM REPO (`.gitignore`: `*.onnx`/`*.onnx.json`) — Laufzeit-Download von HF, OPFS-Cache→offline. `audio-test.html` = Wegwerf-Beweis-Knopf (4 Sprachen + Vorwärm-Knöpfe + Status), Capy komplett, NICHT im Menü. `.gitignore` hält Leos lokales `voice-test/` (~1.3 GB WAV/onnx) raus. KEIN Raum, KEINE Seele, KEIN `vercel.json` berührt. `node --check` grün (audio.js + vendored Lib + Inline-Script); vier `.onnx`+`.onnx.json` bei rhasspy verifiziert (302/307). HEADLESS NICHT prüfbar (= ABNAHME-REST, Browser-Sache, Leo + iPhone): tatsächliches Sprechen aller 4, OPFS-2.-Klick-ohne-Download, iOS-Safari-Fallback. NÄCHSTES = Kleinkram-Paket (`AUFTRAG-KLEINKRAM.md`). · Design 20.06. Teil 24 (claude.ai): AUDIO-STIMMENTEST + FINALE BETA-STIMMEN — Piper systematisch per Ohr getestet (WAV lokal auf der Toshiba via `python3 -m piper`, eigene Prüf-HTMLs). LEHRE: `low`/`x_low`-Tiers klingen amateurhaft; Qualitätssprung erst ab `medium`/`high`. FINALE VIER (Leo gewählt): de `de_DE-thorsten-high` (♂, einzige deutsche Studio-Stimme; FRAU in high existiert NICHT), es `es_ES-sharvard-medium` (♂; einzige spanische HIGH wäre `es_MX-claude-high` ♀ — Leo wollte männlich → medium, Reserve neutral-mexik. `es_MX-ald-medium`), en `en_US-lessac-high` (♀; männliche Reserve `en_US-ryan-high`), el `el_GR-rapunzelina-low` (EINZIGE griechische Piper-Stimme; medium/high existiert NICHT). KORRIGIERT die Teil-23-Stimmen (ramona/claude/danny/rapunzelina-medium — letztere existiert gar nicht). MOTOREN VERWORFEN: Kokoro (klingt besser, aber `kokoro-js` im Browser kann NUR Englisch; es/de/el bräuchten misaki/Python = Server/Vorrender), Chatterbox (Server-GPU → bricht Strand). ElevenLabs = Phase 2 (Premium-Stimme); STT Freies Sprechen = Whisper (Phase 2). EIGENE STIMME „für alle Fälle" Phase 2: Piper klont nicht live → Fine-tune vom **Thorsten-Checkpoint** (de_DE-thorsten, MIT/kommerziell frei) als Basis → erbt das Deutsch, daher nur ~1–1.5 h saubere Aufnahme nach Skript statt ~20 h von Null + GPU-Training ~2–4 h gemietet. DEUTSCH MÄNNLICH = Leo selbst; DEUTSCH WEIBLICH = **Conny** (Leos Freundin, „Honigstimme") → löst endlich die fehlende deutsche Studio-Frauenstimme. SPANISCH analog: Fine-tune von MIT-Piper-Checkpoint (`es_MX-claude-high` oder `es_ES-davefx-medium`), gleiche Pipeline, kommerziell frei (kein „emotionales" spanisches Pendant zu `thorsten_emotional`, für Stimm-Klon nicht nötig). Studio-Technik TASCAM US-122L + 2 Kondensatormikros nur an Toshiba lauffähig (Linux `snd-usb-us122l`+fxload; Android-Tablet NICHT), Toshiba ohne CUDA → Cloud-GPU. Ergebnis = Leos Eigentum, Basis MIT → sauber für UG. `DESIGN-AUDIO-PIPER.md` aktualisiert; Audio Phase A ist auf Leos Wunsch JETZT der aktive `AKTUELLER-AUFTRAG.md` (Audio zuerst), Kleinkram-Paket geparkt in `AUFTRAG-KLEINKRAM.md` (kommt direkt danach). GESCHÄFTS-LEITBILD (für Seele/Charta, falls noch nicht klar): Langzeit-Beziehung statt Einschreibe-Gebühren-Modell; niedrigstmögliche Flatrate; satter Mehrwert; win-win „bonachón"-Kapitalismus — der Nutzer soll Spikiu „heiraten" wollen. · Design 20.06. Teil 23 (claude.ai): AUDIO-DESIGN (Piper-WASM) — Spec `DESIGN-AUDIO-PIPER.md` eingefroren. Testphase: Piper im Browser (WASM, lokal, kein Server, MIT-Modelle); ElevenLabs bleibt Phase 2. VIER STIMMEN final (Leo auf Samples-Seite gewählt): de_DE-ramona-low · es_MX-claude-high (bewusst schwer, mexikanisch/neutro; Reserve es_MX-ald-medium falls Handy träge) · en_US-danny-low · el_GR-rapunzelina-medium. CDN-Test (esm.sh+jsDelivr) gescheitert → Library+WASM self-hosten (klein, ~20–30 MB), Modelle (~60 MB/Stk) NICHT ins Repo, laden zur Laufzeit von HF → OPFS-Cache → offline. SCHLÜSSELSTEIN: provider-agnostischer Helfer `audio.js` mit `speak(text, zielsprache)` — heute Piper, Phase 2 ElevenLabs hinter gleicher API. Lade-Strategie löst Prototyp-Lahmheit: lazy/pro-Sprache/einmalig + Hintergrund-Vorwärmen + warme Session + satzweise. Fallback: Piper lädt nicht → Browser-Stimme (nie stummer Knopf). COOP/COEP aufgeschoben (single-threaded reicht). Lektions-Trick (feste Texte vorab zu MP3) = spätere Phase. BAU-PHASEN je eigener Auftrag: A Fundament+Beweis (`audio.js` + self-host + 1 Knopf) → B Einbau Räume → C Vorrender → D ElevenLabs. Phase A ERST nach Kleinkram. · Design 20.06. Teil 22 (claude.ai): SYSTEMATISCHES TESTEN — drei Befunde. (a) NAME-LEAK Gesprächs-Raum: Gast-Test → Spikiu grüßt „der Lerner" + Backend-Meta; WURZEL api/gespraech.js Z.62 `p.name || 'der Lerner'` füttert Floskel als Namen (nicht der Cache, der Fake-Name). (b) LEKTIONSGENERATOR „funktioniert nirgends": Endpoint api/generate-lesson.js ist GESUND, Assessment schreibt volles Profil — aber nirgends verdrahtet: chat.html schreibt nie `lastConversation` (Dashboard-Knopf findet kein Gespräch) UND schreibwerkstatt-Knopf „Lektion aus Text" ist Attrappe (ruft Endpoint nicht). Plus Test-Artefakt: als Gast kein Profil → 400. (c) LESEBEGLEITER-Begrüßung zu geschwätzig → kürzen auf „Wie kann ich dir helfen?". ENTSCHIEDEN: Kleinkram-Paket JETZT (Name-Leak gespraech.js+gespraech-modus.md + Lesebegleiter intro de/es/en in lesebegleiter.js) — Auftrag bereit. DANACH eigene Pakete: Lektion-Anschluss (chat.html→lastConversation, Werkstatt-Knopf real verdrahten) → Werkstatt-Inhalt VARIANTE B (Auswahl 3–4 Aufgaben, Niveau nach koennen). ARCHITEKTUR geklärt: heute NUR localStorage (dev=einzige Live-Umgebung, main NICHT Supabase); voll testbar als ECHTER Lerner (nicht Gast); Supabase bleibt Phase 2 (nötig erst für Wiederkehr/Cross-Device/Tester-Sicht/Stripe/Accounts). · Design 19.06. Teil 20 (claude.ai): VERHALTENS-KORSETT — aus zwei Tests (Lesebegleiter: „Back=Pan" → Spikiu erfindet/wechselt Bezugssystem; Jetzt-Sprechen: Pedro-Smalltalk-Frust). Erkannt: dieselbe KI-Tendenz, Lücken mit Erfindung zu füllen statt am Anker zu bleiben → gehört universell als MAUERN in die Seele, nicht raumweise. Auftrag Paket A bereit (AKTUELLER-AUFTRAG.md): Anti-Spinn-Mauer (nicht raten/Bezug nicht wechseln/nicht ins Blaue erklären/ehrlich rückfragen/verunglückten Input abfangen) + Smalltalk-Mauer (kein menschelnder Smalltalk als Selbstzweck), beide in die Niemals-Liste. Folge-Pakete dokumentiert: B = Raumwechsel-Signal [WECHSEL:raum] in api/gespraech.js + chat.html (LESSON-Muster, sanfter Knopf, kein Auto-Sprung) löst Pedros Sackgasse; A2 = Tür-öffnen-Regel in die Seele ERST NACH B (vorher wäre es eine erfundene Funktion → Seelen-Verstoß); C = UI-Sieb leere/triviale Sends. · Bau 19.06. Teil 19 ERLEDIGT (nachgeholt + verifiziert): Lesebegleiter jetzt in ALLEN 8 Kapiteln (cap1–4-es + cap1–4-de) UND Seele-Fakten-Block „SO IST SPIKIU WIRKLICH GEBAUT" live auf dev. Zwischendrin Upload-Verlust beim Push (Rebase-Reihenfolge); GELERNT: Reihenfolge IMMER commit → pull --rebase → push, nie `pull --rebase` mit uncommittetem Stand. Auf dev geprüft: 8× Widget-Treffer + Seele-Block. ·  Bau 19.06. Teil 18 (claude.ai, AUSNAHME): **LESEBEGLEITER AUSGEROLLT + ANTI-HALLUZINATION** — Widget in ALLE 8 Reader-Kapitel eingebunden (cap1–4-es + cap1–4-de). Widget: sicheres Mini-Markdown (**fett**/*kursiv*/Listen, alles vorher escaped). Endpoint: harte Scope-Grenzen + Längen-Deckel. Seele (wirkt in ALLEN Räumen): Niemals-Liste erweitert (nie Produkt-Funktionen/Features erfinden, nie ganze Werke umschreiben/übersetzen) + NEUER Fakten-Block „SO IST SPIKIU WIRKLICH GEBAUT“ (echte Räume + Reader-Wahrheit: muttersprachlich erzählt, Zielsprache wächst je Kapitel, Darstellung FEST, kein Umschalt-Modus). Behebt die Halluzinationen („3 Versionen“, „Dashboard-Regler“, „nur-Spanisch-Modus“) · Bau 19.06. Teil 17 (claude.ai, AUSNAHME — Leo am Terminal, kein Claude Code): **READER-LESEBEGLEITER** gebaut + deployed — neuer schlanker Endpoint api/lesebegleiter.js (Muster gespraech.js, Seele zur Laufzeit, Modell sonnet-4-5, KURZE Antwort in Muttersprache, Szenen-Üben→Sprech-Raum), selbst-montierendes Widget lesebegleiter.js (schwebendes/atmendes Spikiu, opt-in, UI DE/ES/EN), vercel.json um api/lesebegleiter.js (includeFiles *.md) erweitert, in cap1-es-v2.html eingebunden. OFFEN: Ausrollen auf cap2/3/4-es + de-Reader · Bau 19.06. Teil 16 (claude.ai, AUSNAHME): **DASHBOARD-i18n** gebaut + deployed — dashboard.html ganz in Muttersprache (data-i18n DE/ES/EN, Englisch-Mix raus), NUR Begrüßung in Zielsprache („Hola Pepe, bienvenido“ / „Hallo Pepe, willkommen“), Zielsprachen-Name in Muttersprache lokalisiert, Profil defensiv (Code de/es/en UND Klarname). In 3 Sprachen gerendert getestet · Bau 19.06. Teil 15 (claude.ai, AUSNAHME): **NEUE LANDING** gebaut + deployed — index.html ersetzt (Manifest-Text Leonardo, EN/DE/ES, ruhiger Jobs-Look). CTAs: Hero+Final→chat.html (sofort reden, kein Gate), „Start free“→assessment.html (Lernweg), Teams-Link spikiu-teams.html(404)→teams_dashboard.html repariert. Assessment-Platzierung entschieden: erst NACH dem ersten Reden, am besten als kurzes Gespräch statt Test · Bau 19.06. Teil 14: Tab-Titel der Werkstatt-Seiten angeglichen — „Spikiu — Schreiben"→„Schreibwerkstatt", „Spikiu — Lesen"→„Lesewerkstatt" (commit e6de796) · Bau 19.06. Teil 13: schreibwerkstatt-Bar-Label „Schreiben"→„Schreibwerkstatt" (commit 63e39dc) · Bau 19.06. Teil 12: Menü-Labels GEBAUT + gepusht (commit 2e7ccd4) — nav.js read→Lesewerkstatt/Reading Workshop (es unverändert), books→Meine Bücher/Mis libros/My Books; taller.html room→Lesewerkstatt/Taller de lectura/Reading Workshop. Reine Labels, Abnahme grün, nicht live geklickt (nav.js cacht) · Design 19.06. Teil 12: Menü-Labels entwirrt — „Leseraum"→„Lesewerkstatt", „Bücher"→„Meine Bücher" (Werkstatt-Familie = geführte Räume, „Meine Bücher" = Bibliothek); reine Label-Änderung nav.js + taller.html, Mini-Auftrag geschrieben · Bau 18.06. Teil 11: Raum Lesen (api/taller.js + taller.html) GEBAUT + LIVE, „Genug für heute"→Abschied+Dashboard · Design 18.06. Teil 9: RAUM LESEN entworfen — „Taller de lectura" (Leseverstehen-Seminar, NICHT der Reader), Misch-Form (Seminar-Stimme außen, Aufgaben-Block innen), text-only + Spikiu-generiert; v1-Aufgaben MC+Reihenfolge+Freitext (Zuordnen=v2 Brücke zum Prüfungssimulator, Lückentext später); [TALLER]-Vertrag definiert; Prototyp `prototyp-taller-lectura.html` genehmigt · LEGAL ans Ende nach der Testphase (NDA-Beta) · Design 18.06. Teil 7: Menü-Eintrag „Schreibwerkstatt" für nav.js ENTSCHIEDEN — unter „Jetzt sprechen", Labels DE/ES/EN Schreibwerkstatt/Taller de escritura/Writing Workshop, Auftrag geschrieben · schreibwerkstatt-nav-Schnitt (Teil 6) GEBAUT · Design 18.06. Teil 5: schreibwerkstatt-nav ENTSCHIEDEN — Test-Wähler raus aus dem Produkt, Sprache aus profile.zielsprache + Können aus profile.koennen, `?dev=1`-Schloss blendet sie zum Testen wieder ein, stilles „Schreiben"-Label rechts; Prototyp `prototyp-schreibwerkstatt-nav.html` genehmigt; schließt zugleich Offene-Punkte-1 (koennen-Wähler raus) · chat.html trägt nav.js im SLOT-MODUS — Hamburger+Logo in der vorhandenen Kopfzeile, keine zweite Leiste · nav.js auf die 4 scrollbaren Seiten integriert + Gym-Knopf · Design 18.06.: chat.html-nav (Slot) beauftragt, 'Beginnen wir!'-Auslöser in CLAUDE.md · Vorstand 17.06.: Gesprächs-Raum + Assessment LIVE bestätigt — alle 16.06.-Schulden getilgt) · Design 17.06.: nav-Paket entworfen, Gym-Idee (Lina) aufgenommen

## ▶ STAND & NÄCHSTES (19.06.)
- ✅ **Neue Landing** (index.html) — live. Manifest EN/DE/ES, CTAs verdrahtet.
- ✅ **Dashboard-i18n** (dashboard.html) — live. Ganz Muttersprache, Begrüßung Zielsprache.
- ✅ **Reader-Lesebegleiter** — live in ALLEN 8 Kapiteln (cap1–4-es + cap1–4-de). api/lesebegleiter.js + lesebegleiter.js + vercel.json.
- ✅ **Anti-Halluzination + Struktur-Wissen** — Seele kennt jetzt die echten Räume + die Reader-Wahrheit (wächst je Kapitel, feste Darstellung); keine erfundenen Features mehr. Widget: sicheres Mini-Markdown.
- ✅ **Verhaltens-Korsett (Seele, Teil 20, Paket A)** — Anti-Spinn- + Smalltalk-Mauern ans Ende der Niemals-Liste. In dev.
- ✅ **Raumwechsel-Signal (Teil 21, Paket B)** — `gespraech-modus.md` setzt `[WECHSEL:zielraum]`, `chat.html` fängt ihn ab → sanfter Tür-Knopf (kein Auto-Sprung). api/gespraech.js unangetastet. In dev, noch nicht live geklickt.
- ✅ **Audio Phase A (Fundament + Beweis)** — GEBAUT 20.06. (Claude Code), auf dev (commit d83c8ab). `audio.js` (provider-agnostisch `speak(text,zielsprache)` + `warm`) + Piper-Lib/onnxruntime-web/WASM self-gehostet unter `audio/vendor/` (Root) + Beweis-Knopf `audio-test.html`; **vier Stimmen FINAL** verdrahtet; Pflicht-Fallback `speechSynthesis`; Modelle Laufzeit-Load von HF (rhasspy) + OPFS, NICHT im Repo. `node --check` grün. **ABNAHME-REST (browser-/geräteseitig, Leo + iPhone):** 4 Sprachen sprechen · OPFS-2.-Klick ohne Download · iOS-Fallback.
- ▶ **NÄCHSTES (Bau bereit):** **Kleinkram-Paket** (`AUFTRAG-KLEINKRAM.md`) — 3 Edits: Name-Leak `api/gespraech.js` Z.62 + Opener-Bullet `gespraech-modus.md` + Lesebegleiter-`intro` (de/es/en) in `lesebegleiter.js`.
- ▶ **Danach (eigene Pakete, der Reihe nach):** (1) **Kleinkram-Paket** (geparkt in `AUFTRAG-KLEINKRAM.md`) — 3 Edits: Name-Leak `api/gespraech.js` Z.62 + Opener-Bullet `gespraech-modus.md` + Lesebegleiter-`intro` (de/es/en) in `lesebegleiter.js`. (2) **Lektion-Anschluss** — `chat.html` schreibt `lastConversation`, `schreibwerkstatt.html`-Knopf real an `/api/generate-lesson` (heute Attrappe); Test nur als echter Lerner. (3) **Werkstatt-Inhalt Variante B** — Auswahl 3–4 Schreibaufgaben, Niveau nach `koennen`, Sprache nach `zielsprache`. (4) Paket B live klicken · A2 Tür-öffnen-Regel · Paket C UI-Sieb. Backlog: Audio Phase B/C (Gym-Einbau, Lektions-Vorrender) · Assessment-als-Gespräch · Legal-Sequenz · Gym-Raum · **Supabase + ElevenLabs = Phase 2**.
- ℹ️ Hinweis: Teile 15–18 wurden ausnahmsweise direkt in claude.ai gebaut (Leo am Terminal), nicht von Claude Code — Code dennoch nach den Stack-Regeln (export default, process.cwd(), includeFiles, Naming Spikiu).

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

## DER TALLER-VERTRAG (Raum Lesen — Taller de lectura)

`api/taller.js` gibt zurück: `{ taller, text }` (wie Lektor: geparstes Objekt + Rohtext-Fallback).
Das Modell antwortet als EIN Block — die reichere Lektor-Blaupause:

```
[TALLER]
{"rahmen":"…","texto":"…","bruecke":"…"|null,"lautschrift":null,
 "aufgaben":[
   {"typ":"mc","frage":"…","optionen":["…"],"loesung":0,"erklaerung":"…"},
   {"typ":"orden","frage":"…","teile":["…"],"loesung":[2,0,1]},
   {"typ":"frei","frage":"…","hinweis":"…"}],
 "schluss":"…"}
[/TALLER]
```

- `rahmen` = Spikius Eröffnung (Seminar-Stimme, Muttersprache). `texto` = Lesetext (zielsprache).
  `bruecke` = Wörter-Brücke, nur anfang/mittel, sonst null (koennen-Regler). `lautschrift` = nur
  fremde Schrift (el): Transliteration des texto (drei Spuren). `schluss` = Manöverkritik, KEIN Score.
- `aufgaben` = getypter Array. v1-Typen: `mc` (Lösung+Erklärung im Block → Oberfläche prüft selbst,
  Charta-Muster grün/rot/disabled), `orden` (teile + loesung=Index-Reihenfolge → Oberfläche prüft
  selbst), `frei` (keine Lösung → Spikiu bewertet wie der Lektor).
- **Zwei-Phasen NUR für `frei`:** mc/orden prüft der Client (Lösung steckt im Block); der
  Freitext-Satz geht in einem zweiten Aufruf zurück, Spikiu reagiert.
- Erbt vom Lektor: toleranter Parser (erst JSON.parse, sonst Feld-für-Feld an Markern), Prompt
  verbietet gerade Anführungszeichen in Werten (nur typografische), Seele zur Laufzeit, EIN Endpoint alle Sprachen.
- v2-Zuwachs: `zuordnen` (Überschrift↔Absatz — DELE/Goethe-Format, Brücke zum Prüfungssimulator),
  später `luecke` (kippt Richtung Grammatik → überlappt Schreiben, daher hinten).

---

## DATEI-STATUS

| Datei | Letzte Claude-Version | Vertrag | Deploy |
|---|---|---|---|
| `spikiu-seele.md` | Kanonische Seele; 18./19.06. (Teil 18/19) um Niemals-Bullets + Fakten-Block „SO IST SPIKIU WIRKLICH GEBAUT" erweitert. **19.06. Teil 20 (Paket A) GEBAUT: zwei neue Mauern + Anti-Spinn- & Smalltalk-Mauern, 19.06. ans Ende der Niemals-Liste — Anti-Spinn (nie Lücke mit Erfindung füllen / nicht raten / Bezug nicht wechseln / nicht ins Blaue erklären / ehrlich rückfragen / verunglückten Input abfangen) + Smalltalk-Mauer (kein menschelnder Smalltalk als Selbstzweck). Diff = nur die zwei Blöcke, 0 gerade Quotes, Grundsatz 2/3 unangetastet.** | Quelle der Wahrheit | ✅ in dev |
| `lektor-modus.md` | Schreib-Werkstatt Raum-Prompt, erbt von Seele | koennen+fremde_schrift+aufgabe | ✅ in dev |
| `api/lektor.js` | **LIVE** — Schreiben-Raum, EIN Endpoint alle Sprachen, `export default`, kein import.meta, Seele via process.cwd(), toleranter Parser | [LEKTOR]-Vertrag | ✅ live (commit 6da2832) |
| `vercel.json` | `includeFiles: "*.md"` für `api/lektor.js`, `api/gespraech.js` UND `api/taller.js` (18.06. ergänzt) | — | ✅ in dev |
| `gespraech-modus.md` | NEU (16.06.) — Freies-Gespräch Raum-Prompt, erbt von Seele per Grundsatz-Nummer. Opener = Begrüßung OHNE Frage, Regler nach `koennen`, fremde_schrift-Brücke, Rollenspiel. **19.06. Teil 21 (Paket B): neue Sektion „DIE TÜR ÖFFNEN — Raumwechsel-Signal" + NIEMALS-Bullet. Bei KLAREM Raumwunsch hängt Spikiu genau EIN `[WECHSEL:zielraum]` ans Antwort-Ende (zielraum ∈ schreibwerkstatt|lesewerkstatt|buecher|lektionen), davor EIN warmer Übergabesatz, kein Menü/App-Verweis. Unklar → EINE Rückfrage, höchstens ein Signal/Antwort.** | koennen+fremde_schrift, KEINE aufgabe, erzeugt `[WECHSEL:…]` | ✅ in dev |
| `api/gespraech.js` | NEU (16.06.) — Gesprächs-Raum, EIN Endpoint alle Sprachen, `export default`, kein import.meta, Seele via process.cwd(). KEIN Parser: gibt rohe Prosa `{ text }` zurück (freies Gespräch ist kein JSON-Vertrag) | Profil rein, Prosa raus | ✅ **LIVE bestätigt 17.06.** (spricht perfekt, Opener + Folgeantwort) |
| `api/lektor.parser.test.mjs` | NEU (16.06.) — Test für toleranten Parser, `node:test`, 9 Fälle inkl. gerade-`"`-Klassiker. Lädt lektor.js als data:-Modul → Quelle bleibt unangetastet, kein package.json nötig | prüft [LEKTOR]-Vertrag | ✅ in dev (commit 7e96353), nicht deployt (Test) |
| `schreibwerkstatt.html` | **LIVE** — Werkstück-Oberfläche, ruft /api/lektor. **17.06.: verbotene Variable `history` → `verlauf`.** **18.06. Teil 6 GEBAUT (Auftrag Teil 5): nav-Paket im SLOT-MODUS.** `.bar` blieb EINE Leiste: `brand`→`<div class="nav-slot" data-spk-nav>` (nav.js füllt Hamburger+Logo HINEIN — eigenes Element, nicht die ganze `.bar`, sonst würden die Wähler überschrieben), `controls`→`.room` (stilles kursives „Schreiben" + `#devControls hidden`). Test-Wähler `#selLang`/`#selKoennen` bleiben im DOM (jetzt in `#devControls`) → Lektor-Script unangetastet, liest weiter dieselben IDs (vorbelegt aus profile.zielsprache/koennen). `?dev=1`-Schloss blendet sie + goldenen „dev"-Tag ein. Lora-Font für die Wortmarke ergänzt. `<script src="nav.js" defer>`. **19.06. Teil 13: stilles Bar-Label `room-name` „Schreiben"→„Schreibwerkstatt" (Familie angeglichen, eine Zeile). Teil 14: `<title>` „Spikiu — Schreiben"→„Schreibwerkstatt".** | liest spikiu_user.profile defensiv (zielsprache/koennen) | ✅ live · nav GEBAUT (noch nicht live geklickt) · Bar-Label + Tab-Titel Teil 13/14 GEBAUT |
| `index.html` | Landing, Sprach-Switcher | — | ✅ deployed |
| `assessment.html` | 7 Karten → Profil → Dashboard. **finish() (16.06.) schreibt jetzt kanonisch:** koennen (aus level gemappt), zielsprache/muttersprache (Codes), fremde_schrift, etappe:'samen'. level/targetLang etc. bleiben (Lernweg-Vertrag) | profile/roadmapPending + Raum-Vertrag | ✅ **LIVE bestätigt 17.06.** (alle 5 Felder + Lernweg-Felder grün in pruefung.html) |
| `pruefung.html` | NEU (17.06.) — sichtbare Profil-Verifikation ohne Konsole. Liest spikiu_user.profile, grün/rot je Feld (5 Raum-Felder + Lernweg-Felder). Diagnose-Werkzeug, kein Produkt. Capy komplett | liest spikiu_user.profile | ✅ in dev, Diagnose behalten |
| `generate-learningpath.js` | Antrieb→Syllabus, page1/page2 | page1/page2 | ⚠️ live prüfen |
| `dashboard.html` | page1/page2, DE/ES/EN. **18.06.: eigene Desktop-Sidebar + Mobile-Header + Drawer-JS ENTFERNT, `.app`-Grid → einspaltig, `.main` zentriert; nav.js eingebunden.** Tote sidebar-avatar/-name-JS raus | page1/page2 | ✅ in dev |
| `books.html` | Kapitel-Liste DE/ES, liest Profil. **18.06.: UI-Sprachschalter (`lang-bar`) + eigene `<nav>` ENTFERNT; nav.js eingebunden. `setLang()` bleibt (setzt Sprache aus Profil, leerer lang-btn-Loop harmlos)** | — | ✅ in dev |
| `sessions.html` | Buchungs-Seite. **18.06.: eigene Desktop-Sidebar + Mobile-Header + Drawer-JS ENTFERNT, `.app`-Grid → einspaltig, `.main` zentriert; nav.js eingebunden** | — | ✅ in dev |
| `learnraum.html` | Lernraum aus `spikiu_learnpath` (Empty-State → chat.html). **18.06.: nav.js eingebunden (hatte keine eigene Navi)** | — | ✅ in dev |
| `nav.js` | **INTEGRIERT (18.06.)** — self-mounting Topbar+Drawer, erkennt aktive Seite, liest Profil. Jetzt mit **Gym**-Eintrag (I18N de/es/en, Hantel-ICON, STRUCT `{id:'gym',disabled:true}` direkt nach `lessons`, „bald"-Badge). Auf den 4 scrollbaren Seiten via `<script src="nav.js" defer>`. **18.06. Teil 8: `write`-Eintrag (Schreibwerkstatt) ergänzt — I18N de/es/en, Stift-ICON, STRUCT zwischen talk+books, getActive schreibwerkstatt→write.** Auf ALLEN App-Seiten eingebunden (4 scrollbare + chat-Slot + schreibwerkstatt-Slot). **19.06. Teil 12 GEBAUT (commit 2e7ccd4): Labels read→Lesewerkstatt (de) / Reading Workshop (en), es „Taller de lectura" unverändert; books→Meine Bücher (de) / Mis libros (es) / My Books (en). Nur die I18N-Werte, keine STRUCT/Icons/hrefs/getActive berührt.** | — | ✅ in dev · Labels Teil 12 GEBAUT (nav.js cacht → hart neu laden, nicht live geklickt) |
| `chat.html` | **NEU GEBAUT (16.06.), live bestätigt 17.06.** — Gesprächs-Raum-Oberfläche. Liest `spikiu_user`+defensive Brücke, KEIN Profil → Redirect `assessment.html`. Direkt in die Charla, Profil-Chip, ruft `/api/gespraech`. 4-Phasen-Maschine + PDF-Flow GELÖSCHT. Capy komplett (Ohren+Füße). Bug „antwortet nicht" gelöst. **17.06.: `fmt()` rendert jetzt auch `_kursiv_` → `<em>` (Muttersprach-Brücke), nur paarweise an Wortgrenzen — `el_perro` unberührt** · **18.06.: nav.js im SLOT-MODUS — `<header>` → `<header data-spk-nav>` (Logo+„← Dashboard"-Inhalt raus, nav.js füllt den Slot mit Hamburger+Logo, keine zweite Leiste); `<script src="nav.js" defer>` ergänzt. Charla-Script + Profil-Chip unberührt** · **19.06. Teil 21 (Paket B): Raumwechsel-Signal abgefangen. `extractWechsel()` zieht `[WECHSEL:…]` aus der Antwort (breit gestrippt → kein Marker leakt je, auch vertippter Zielraum; Knopf NUR bei gültigem Ziel), zeigt sauberen Text + speichert ihn sauber in `verlauf`, rendert `.door-btn` (Label nach `profile.muttersprache` de/es/en) → Klick `window.location.href` (kein Auto-Sprung). Map: schreibwerkstatt→schreibwerkstatt.html · lesewerkstatt→taller.html · buecher→books.html · lektionen→dashboard.html#lektionen. Profil reist via localStorage mit. api/gespraech.js NICHT angefasst (bleibt roh-Prosa).** | liest spikiu_user.profile defensiv | ✅ **LIVE — spricht, antwortet, Brücke kursiv** (Paket B: in dev, Marker-Extraktion smoke-getestet, noch nicht live geklickt) |
| `prototyp-gespraech.html` | NEU (16.06.) — genehmigte Attrappe, führte zur chat.html-Oberfläche. Scripted, kein API | — | Prototyp, behalten |
| `api/chat-german.js`, `-spanish.js`, `-english.js` | **TOT — deprecated Sprach-Split** | — | ⛔ NICHT imitieren, nicht als „Raum" behandeln. Sprache = Feld. |
| `api/chat.js` | Dumb-Proxy (system clientseitig) | — | Referenz-Muster für neue Endpoints |
| `prototyp-schreibwerkstatt.html` | Attrappe (genehmigt), führte zur Oberfläche | — | Prototyp, optional behalten |
| `prototyp-schreibwerkstatt-nav.html` | NEU (18.06.) — genehmigte Attrappe für den nav-Schnitt: echte `nav.js` inline (byte-genau), eine Leiste (Slot links + stilles „Schreiben" rechts), `?dev=1` blendet Test-Wähler ein. Lehre: ein `</script>` im Inhalt eines INLINE-Scripts schließt das Tag vorzeitig → im Prototyp zu `<\/script>` neutralisiert (nur Inline-Falle, nie bei externem `src`) | — | Prototyp, behalten |
| `prototyp-taller-lectura.html` | NEU (18.06.) — genehmigte Attrappe Raum Lesen: Seminar-Stimme + Text-als-Dokument + Aufgaben-Block (MC grün/rot, Reihenfolge ▲▼, Freitext), Manöverkritik kein Score. Scripted, kein API. anfang/es→de | — | Prototyp, behalten |
| `api/taller.js` | **GEBAUT 18.06. Teil 11** — Raum Lesen, EIN Endpoint alle Sprachen, Lektor-Muster (`export default`, kein import.meta, Seele+`taller-modus.md` via process.cwd(), gecacht). ZWEI Phasen nach `antwort`: null→Phase 1 `[TALLER]` (`{ taller, text }`), gesetzt→Phase 2 `[REACCION]` (`{ reaccion, text }`). Toleranter Parser: `JSON.parse`→sanfte Reinigung (Zeilenumbrüche/Trailing-Kommas)→null; `[REACCION]` zusätzlich feldweiser Auszug (gerade-`"`-Fallback). `normAufgabe` validiert mc/orden/frei (orden-loesung = Permutation, sonst identity). Prompt verbietet gerade `"` in Werten | [TALLER]/[REACCION]-Vertrag | ✅ in dev · node --check + Parser-Smoke-Test grün, NICHT live (Vercel) |
| `taller-modus.md` | **GESCHRIEBEN 18.06. Teil 10** — Raum-Prompt Lesen, erbt von Seele per Grundsatz-Nummer (wie lektor-modus). Zwei Phasen (1: Taller komponieren, 2: frei-Satz bewerten), koennen-Regler, fremde_schrift→3 Spuren, Niemals-Liste (kein Score). Ausgabe-Format liegt im Backend, nicht hier | erzeugt [TALLER]/[REACCION] | ✅ bereit, Bau beauftragt |
| `taller.html` | **GEBAUT 18.06. Teil 11** — Oberfläche Raum Lesen aus genehmigtem Prototyp. Nav-Slot (`data-spk-nav`) + `nav.js`, Dev-Schloss (`?dev=1` blendet Sprache/Können ein), Profil defensiv aus `spikiu_user.profile`. UI-Sprache=Muttersprache (de/es/en; el nur Zielsprache). Laden → Phase-1-Aufruf, rendert rahmen/texto(+lautschrift)/bruecke/aufgaben/schluss; mc+orden prüft die Oberfläche selbst, frei → Phase-2-Aufruf; „Noch ein Text" → neues Taller. Schluss erscheint, wenn alle Aufgaben berührt. **„Genug für heute" (Design 18.06.): beide Knöpfe sperren → warme Abschiedszeile (Muttersprache, Name aus spikiu_user.name optional) → nach ~900 ms `dashboard.html`.** Capy komplett (CAPY()-SVG, 2 Ohren+4 Füße). **19.06. Teil 12: room-Label (TXT.room) de Lesen→Lesewerkstatt, es Lectura→Taller de lectura, en Reading→Reading Workshop — Rest des TXT-Objekts (mc/orden/frei/check/…) unangetastet. Teil 14: `<title>` „Spikiu — Lesen"→„Lesewerkstatt".** | liest spikiu_user.profile | ✅ **LIVE bestätigt 19.06.** (lädt, „Noch ein Text" funktioniert) · Abschied-Knopf nachgezogen · room-Label + Tab-Titel Teil 12/14 GEBAUT |
| `audio.js` | **NEU GEBAUT 20.06. (Audio Phase A)** — provider-agnostischer Helfer am Repo-Root, ES-Modul. EINZIGE öffentliche API `speak(text,zielsprache)` + `warm(zielsprache)`; zielsprache→fester voiceId, kein Detail leckt. EINE warme Session pro Sprache (eigene Verwaltung um das Lib-Singleton `TtsSession._instance` herum: vor jedem Stimm-Build nullen, serialisiert; `predict()` auf der Instanz, nicht aufs Singleton). Satzweise, Pflicht-Fallback `speechSynthesis`. Kein `import.meta`. Importiert die vendored Lib via `/audio/vendor/piper-tts-web.js`, setzt `wasmPaths` auf die self-gehosteten Assets | NUR `speak`(+`warm`) exportiert; heute Piper, Phase 2 ElevenLabs hinter gleicher API | ✅ in dev (d83c8ab) · `node --check` grün · Browser-Abnahme (Leo+iPhone) offen |
| `audio/vendor/*` | **NEU 20.06.** — self-gehostete statische Assets am Root (Vercel liefert vom Root): `piper-tts-web.js`+`piper-o91UDS6e.js`+`voices_static-*.js` (@mintplex-labs, MIT), `ort/ort.min.js` (onnxruntime-web@1.18.0 ESM) + 4× `ort-wasm*.wasm`, `piper/piper_phonemize.wasm`+`.data`. ~58 MB. ZWEI SPIKIU-PATCHes in `piper-tts-web.js`: `HF_BASE`→rhasspy (Z.12), bare ort-Import→self-gehosteter Pfad (Z.283) — beide mit `// SPIKIU-PATCH` markiert. Modelle (`.onnx`) NICHT hier — Laufzeit von HF + OPFS | vendored Lib + WASM-Runtime | ✅ in dev (d83c8ab) |
| `audio-test.html` | **NEU 20.06.** — Wegwerf-Beweis-Knopf Phase A. 4 Sprach-Knöpfe + 4 Vorwärm-Knöpfe + Status-Zeile, `import {speak,warm} from '/audio.js'`. Capy komplett. NICHT im Menü, kein echter Raum | — | ✅ in dev · Diagnose/Beweis, später entfernbar |

---

## ARCHITEKTUR-PRINZIPIEN (gelten produktweit)

- **Räume ≠ Sprachen.** Getrennt werden nur RÄUME: Freies Gespräch, Mündlicher
  Ausdruck, Hörverständnis, Lesen, Schreiben. JEDER Raum ist EIN Endpoint für ALLE
  Zielsprachen; `zielsprache` (de/es/en/el) kommt als Profil-FELD rein. Kein
  Datei-Schnitt pro Sprache. Die alten `chat-*` sind der aufgehobene Split.
- **UI-Sprache ≠ Zielsprache (entschieden 18.06.).** Die Oberfläche/das Menü laufen in der
  MUTTERSPRACHE des Users — unterstützt: **de/es/en** (nav.js-I18N, Reader-Eyebrows). **Griechisch
  ist NUR Zielsprache** (`zielsprache: el`), nie UI-Sprache: ein Grieche-als-Muttersprachler ist
  NICHT geplant. Heißt konkret: kein el-I18N-Block in nav.js/Seiten nötig; `el` lebt allein in den
  Räumen (fremde_schrift → Lautschrift, drei Spuren). Falls je gewünscht → eigenes großes Paket.
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
   Werkbank-Affordanz für Beta — oder soll der Wähler raus? ✅ **ENTSCHIEDEN 18.06.: RAUS** aus
   dem Produkt-Look (Vertrag gewinnt). Können kommt aus `profile.koennen`, Sprache aus
   `profile.zielsprache`. Zum Testen blendet `?dev=1` beide Wähler wieder ein (Dev-Schloss).
   Wird mit dem schreibwerkstatt-nav-Schnitt umgesetzt (Offene-Punkte 4).
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
   NOCH OFFEN als eigenes Paket: nur noch `schreibwerkstatt.html`. **18.06. Teil 4 — BLOCKER vor dem Bau,
   FRAGE AN DESIGN:** Ihr `<header class="bar">` trägt die Test-Wähler `#selLang` + `#selKoennen`, an
   denen das Charla-Script hängt. nav.js überschreibt im Slot-Modus den Host komplett (`host.innerHTML =
   inner`) → würde die Wähler LÖSCHEN → `getElementById('selLang')` null → Script bricht (anders als chat,
   dort saß im Header nur Logo + toter Link). Also entscheiden, WOHIN mit Sprache+Können: (a) Steuerzeile
   UNTER die nav-Leiste — Muster chat (nav + Profil-Chip darunter), Wähler bleiben Beta-tauglich; (b) ganz
   RAUS, Sprache/Können nur aus dem Profil (Vertrag „koennen intern, nie sichtbar"); (c) INJECT-Modus, alte
   `.bar` bleibt als zweite Leiste darunter. Hängt direkt an Offene-Punkte-1 (sichtbarer koennen-Wähler
   ja/nein). Layout-Fakt: schreibwerkstatt ist KEIN 100dvh-Lock wie chat (`html,body{height:100%}`, body
   flex-column `min-height:100%`, `.bench{flex:1}` → scrollt) → Inject-Modus technisch möglich. Leonardo
   nimmt die Frage zu Design; danach Auftrag in `AKTUELLER-AUFTRAG.md`. NOCH NICHT live geklickt:
   Drawer/aktive Seite/Gym-Badge in der echten Oberfläche (nur Node-Syntax + Struktur grün) — gilt für
   alle 5 nav-Seiten inkl. chat.
   ✅ **ENTSCHIEDEN 18.06. Teil 5 (Design):** Variante **(b) + Dev-Schloss**. Beide Wähler raus aus dem
   Produkt-Look; Sprache aus `profile.zielsprache`, Können aus `profile.koennen`. `?dev=1` blendet die
   zwei Test-Wähler wieder ein (vorbelegt aus dem Profil) — Produkt sauber, Testen bequem. Slot-Modus in
   die vorhandene `.bar` (links Navi, rechts stilles kursives „Schreiben"-Label). Prototyp
   `prototyp-schreibwerkstatt-nav.html` GENEHMIGT. Auftrag in `AKTUELLER-AUFTRAG.md` geschrieben.
   ✅ **GEBAUT 18.06. Teil 6** — fünf chirurgische Eingriffe in `schreibwerkstatt.html` exakt nach
   Auftrag: Lora-Font, `.room`/`.room-name`/`.dev-tag`-CSS, `.bar` umgebaut (`nav-slot[data-spk-nav]`
   links + `.room` mit `#devControls hidden` rechts), `<script src="nav.js" defer>`, Dev-Schloss-Script.
   Abnahme grün: `data-spk-nav`/`#selLang`/`#selKoennen`/`#devControls` je 1×, alter `brand`-Div 0×, genau
   ein `<header>`, beide Inline-Scripts + nav.js syntaktisch grün, nav.js unangetastet. Damit ist das
   nav-Paket über ALLE App-Seiten komplett (nur noch live klicken). NOCH OFFEN: Punkt 7 (Menü-Lücke).
5. ~~Dashboard „3 capítulos" → „4" (Einzeiler).~~ ✅ ERLEDIGT 19.06. (Teil 14): vier Reader-Kapitel
   existieren (cap1–cap4 je de/es; das vierte = „Un café en el barrio"/„In der Bäckerei"). `readerDesc`
   in allen drei i18n-Blöcken (de/es/en) auf „4" + der statische Markup-Fallback (Z. 351) auf „4 free
   chapters available". **Legal AGB/DSGVO/Impressum: ENTSCHIEDEN 18.06. — ans ENDE, nach der Testphase** (Beta läuft unter NDA, keine öffentlichen Einnahmen → Rechts-Gate beißt erst kurz vor Live/Kasse). Claude liefert dann DSGVO-konforme Entwürfe (localStorage/Supabase/Formspree/Anthropic als Verarbeiter), braucht Firmen-Fakten (UG-Name, Anschrift) + Anwalts-/Steuerberater-Blick.
6. ElevenLabs-Audio (Starter 5 $/Mt., Cohort-Caching) — verschoben.
7. **Menü-Lücke (NEU 18.06., eigener Mini-Schritt):** `nav.js` STRUCT hat KEINEN „Schreiben"-Eintrag →
   aus dem Drawer kommt man nicht zur Werkstatt. nav.js-Inhaltsänderung (betrifft alle Seiten), separat
   vom schreibwerkstatt-Schnitt. Item + Icon + i18n (de/es/en) ergänzen; Position klären (unter „Bücher"?).
   ✅ **ENTSCHIEDEN 18.06. Teil 7 (Design):** Eintrag `write` direkt UNTER „Jetzt sprechen" (stiller
   Zwilling zum Sprechen), Stift-Icon. Labels (Leonardo bestätigt): DE „Schreibwerkstatt", ES „Taller
   de escritura", EN „Writing Workshop". `getActive()` erkennt `schreibwerkstatt`→`write`. Auftrag in
   `AKTUELLER-AUFTRAG.md` geschrieben (vier chirurgische nav.js-Änderungen).
   ✅ **GEBAUT 18.06. Teil 8** — vier Eingriffe nur in `nav.js`: I18N `write` in alle drei Sprachblöcke
   (Schreibwerkstatt / Taller de escritura / Writing Workshop), ICON `write` (Stift), STRUCT `{id:'write',
   href:'schreibwerkstatt.html'}` zwischen `talk` und `books`, `getActive()` `schreibwerkstatt`→`write`.
   Abnahme grün: alle vier Verifikations-greps == 1, Reihenfolge talk→write→books, `node --check nav.js` OK,
   nur nav.js angefasst. Damit ist die Menü-Lücke geschlossen — der Drawer führt jetzt in die Werkstatt.
   NICHT live geklickt (Vercel, nav.js cacht → hart neu laden): Eintrag/aktiv/Label-Sprachwechsel.
8. ~~**Paket B — Raumwechsel-Signal (Bau, eigenes Paket):**~~ ✅ **GEBAUT 19.06. Teil 21.**
   `gespraech-modus.md`: neue Sektion „DIE TÜR ÖFFNEN" + NIEMALS-Bullet — bei KLAREM Wunsch hängt Spikiu
   genau EIN `[WECHSEL:zielraum]` ans Antwort-Ende (schreibwerkstatt|lesewerkstatt|buecher|lektionen),
   davor EIN warmer Übergabesatz, kein Menü/App-Verweis; unklar → EINE Rückfrage. `chat.html`:
   `extractWechsel()` fängt den Marker (breit gestrippt → leakt nie, auch vertippt; Knopf NUR bei
   gültigem Ziel), zeigt sauberen Text + speichert ihn sauber in `verlauf`, rendert `.door-btn`
   (Label nach `profile.muttersprache`) → Klick `window.location.href`, KEIN Auto-Sprung. Map:
   schreibwerkstatt→schreibwerkstatt.html · lesewerkstatt→taller.html · buecher→books.html ·
   lektionen→dashboard.html#lektionen. Profil reist via localStorage mit. **`api/gespraech.js` NICHT
   angefasst** (bewahrt seine dokumentierte „roh-Prosa, kein Parser"-Identität). Inline-Script-Syntax
   grün, Extraktion über 6 Fälle smoke-getestet. NOCH OFFEN: live auf dev klicken (Marker im echten
   Gesprächsfluss + Knopf-Sprung mit Profil) — schaltet danach Paket A2 frei.
9. **Paket A2 — Tür-öffnen-Regel in die Seele (Prompt, ERST NACH B LIVE bestätigt, NEU 19.06. Teil 20):**
   Sperrgrund: Bevor das Signal existiert, wäre eine „du öffnest die Tür"-Regel eine erfundene
   Funktion → Seelen-Verstoß. **B ist jetzt GEBAUT, aber noch nicht live geklickt** — A2 erst, wenn
   das Signal auf dev nachweislich greift. Dann Mauer rein: „Will der Lerner klar in einen anderen Raum,
   öffnest du die Tür (Signal), du beschreibst sie nicht und schickst ihn nie durch Menüs oder auf die
   App/Webseite."
10. **Paket C — UI-Sieb (klein, kann mit B laufen, NEU 19.06. Teil 20):** Eingabefeld in `chat.html`
   (perspektivisch andere Räume): leere/triviale Sends (0–1 sichtbares Zeichen / nur Whitespace) gar
   nicht erst abschicken. Robustes Sieb für den Vertipper-plus-Enter-Fall. KEINE Bestätigungsdialoge
   (Friktion vermeiden). Die Intelligenz trägt die Mauer (Seele Block 1, letztes Bullet); die UI nur
   das gröbste Sieb.

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
- **AUDIO/Statische Assets gehören an den REPO-ROOT, nicht in `public/`.** Dieses Projekt
  hat kein Framework/Build → Vercel liefert statisch vom Root (`nav.js`→`/nav.js`). Ein
  `public/`-Ordner läge unter `/public/…` und bräche alle absoluten Asset-Pfade. (Audio
  Phase A: `audio/vendor/…` am Root, Aufrufe `/audio/vendor/…`.)
- **Piper-Lib (`@mintplex-labs/piper-tts-web`) hat ein Stimm-Singleton.** `TtsSession._instance`
  wird wiederverwendet → naiv lädt EINE Seite nur EINE Stimme; `predict` mit anderem voiceId
  gibt die FALSCHE Stimme aus. `audio.js` umgeht das (Singleton vor jedem neuen Stimm-Build
  nullen, eigene Session pro Sprache, `predict` auf der Instanz). Wer Audio anfasst: nicht
  einfach `predict({voiceId})` pro Sprache aufrufen — über `audio.speak()` gehen.

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
`*-modus.md` aus dem Design-Gespräch (WAS entscheidet Design). ✅ **18.06. Teil 9: LESEN gewählt =
„Taller de lectura", entworfen + [TALLER]-Vertrag + Prototyp genehmigt. NÄCHSTES DESIGN: `taller-modus.md`,
dann Bau (api/taller.js + taller.html). Mündlich/Hören bleiben hinten (Audio Phase 2).**
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

**Diese Sitzung (18.06., Teil 4):** Kein Code. Start-Protokoll gefahren („Beginnen wir!"):
Ledger + Auftrag gelesen, echten `origin/dev` geprüft. Befund 1 — der chat.html-nav-Auftrag
(Slot-Modus) ist verifiziert VOLLSTÄNDIG erledigt am echten Code: `data-spk-nav` am `<header>`
(Z. 64), `nav.js` eingebunden (Z. 284), „← Dashboard"-Markup raus (nur totes CSS Z. 21–22),
genau ein `<header>`, `verlauf` 6×/`history` 0×, `node --check nav.js` + Inline-Script (`vm.Script`)
grün. Lokal == origin/dev, sauber. Befund 2 — schreibwerkstatt-nav als nächstes Paket angestoßen,
dabei BLOCKER gefunden → FRAGE AN DESIGN (s. Offene Punkte 4). Leonardo geht damit zu Design
(claude.ai) und schreibt danach den Auftrag. NICHT live geklickt (gilt weiter für alle 5 nav-Seiten).

**Diese Sitzung (18.06., Teil 5 — DESIGN, claude.ai):** Design-Gespräch, kein Produktivcode.
Entschieden + entworfen: der **schreibwerkstatt-nav-Schnitt** (Offene-Punkte 4, zugleich 1).
Variante (b)+Dev-Schloss: Test-Wähler raus aus dem Produkt, Sprache aus `profile.zielsprache`,
Können aus `profile.koennen`; `?dev=1` blendet die Wähler zum Testen wieder ein. Slot-Modus in die
vorhandene `.bar` (links Navi byte-genau, rechts stilles kursives „Schreiben"-Label) — eine Leiste,
kein Doppel-Capy, schreibwerkstatt scrollt natürlich (kein 100dvh-Lock). Prototyp
`prototyp-schreibwerkstatt-nav.html` gebaut (echte `nav.js` inline) und GENEHMIGT. Auftrag geschrieben.
Begründung „Wähler raus": die Wähler waren Altlast aus der Zeit der offenen Assessment-Schuld — jetzt
schreibt das Assessment `zielsprache`/`koennen` kanonisch, also liest der Raum das Profil. Kein
In-App-Sprachschalter (nav.js sagt es selbst). NEUER Mini-Schritt notiert (Offene-Punkte 7): „Schreiben"
fehlt im nav.js-Menü. LEHRE (Prototyp-Inlining): ein `</script>` im Inhalt eines INLINE-Scripts schließt
das Tag vorzeitig (HTML-Parser) → „Invalid or unexpected token". Fix nur im Inline-Fall: `<\/script>`.
Nie ein Problem bei externem `<script src>` — die echte `nav.js` blieb unangetastet.

**Diese Sitzung (18.06., Teil 6):** Auftrag Teil 5 GEBAUT — nav.js in `schreibwerkstatt.html`
(Slot-Modus, Variante b + Dev-Schloss). Protokoll gefahren: `git pull` (bereits aktuell), echten Stand
geprüft, genehmigten Prototyp `prototyp-schreibwerkstatt-nav.html` + Zieldatei gelesen, DANN die fünf
Eingriffe exakt nach Auftrag übertragen. Genau ein Element angefasst (`schreibwerkstatt.html`), nav.js
byte-gleich zu origin/dev. Abnahme-Kriterien 1–3,5–7 strukturell + syntaktisch grün; 4 (Lektor-Flow live)
+ der Live-Klick-Test (Drawer/Layout/`?dev=1`) bleiben Leonardo (Vercel). Damit trägt das nav-Paket jetzt
ALLE App-Seiten (dashboard, books, sessions, learnraum, chat, schreibwerkstatt). Einzig OFFEN am nav:
Punkt 7 — der Drawer hat noch keinen „Schreiben"-Eintrag (nav.js-STRUCT, eigener Mini-Schritt, alle Seiten).

**Diese Sitzung (18.06., Teil 7 — DESIGN, claude.ai):** Design-Gespräch, kein Produktivcode.
Vorab am echten dev verifiziert: der schreibwerkstatt-nav-Schnitt (Auftrag Teil 6) ist GEBAUT
(`data-spk-nav` + nav.js + „Schreiben"-Label + Dev-Schloss in `schreibwerkstatt.html`). Damit ist
die Menü-Lücke (Offene-Punkte 7) ein sauberer nächster Auftrag. Entschieden: Eintrag `write` in
`nav.js` direkt unter „Jetzt sprechen" (Zwilling), Stift-Icon, Labels DE „Schreibwerkstatt" / ES
„Taller de escritura" / EN „Writing Workshop" (Leonardo bestätigt), `getActive()` schreibwerkstatt→write.
Auftrag geschrieben (vier chirurgische nav.js-Edits: I18N, ICON, STRUCT, getActive). Hinweis im Auftrag:
nav.js wird ohne Versions-Query geladen → zum Testen hart neu laden. ⏳ Bau steht aus (Terminal).

**Diese Sitzung (18.06., Teil 8):** Auftrag Teil 7 GEBAUT — `write`-Eintrag „Schreibwerkstatt" ins
Hamburger-Menü. Protokoll: `git pull` (bereits aktuell), echten nav.js-Stand gelesen, dann vier
chirurgische Änderungen exakt nach Scope (I18N×3, ICON, STRUCT-Insert, getActive). Nur `nav.js` angefasst.
Abnahme-greps aus dem Auftrag alle == 1, Reihenfolge talk→write→books bestätigt, `node --check nav.js` grün.
Damit ist Offene-Punkte 7 geschlossen und das nav-Paket vollständig: alle App-Seiten tragen den Drawer UND
der Drawer führt in jeden Raum inkl. Werkstatt. OFFEN bleibt nur der durchgängige LIVE-Klick-Test aller
nav-Seiten (Drawer/aktiv/Gym-Badge/Sprachwechsel) — Vercel, Leonardo; nav.js cacht → hart neu laden (Strg+Shift+R).

**Diese Sitzung (18.06., Teil 9 — DESIGN, claude.ai):** Raum LESEN entworfen — „Taller de lectura"
(Leseverstehen-Seminar; löst die offene Ledger-Frage Lesen-vs-Reader: NICHT der Reader/Lukas-Marta,
sondern kurze Gebrauchstexte + Verständnis-Aufgaben). Form: Misch (Seminar-Stimme außen, Aufgaben-Block
innen) — entschieden, weil reines Arbeitsblatt Duolingo-Gefühl gäbe, reines Zug-um-Zug zäh + für
Reihenfolge/Zuordnen unbeholfen. Text-only (heute baubar, kein Audio), Spikiu-generiert (Strand).
v1-Aufgabensatz: MC + Reihenfolge(orden) + Freitext (lean, drei verschiedene Lesefähigkeiten ohne
Überlappung; MC+Freitext quasi geschenkt, nur orden neu). Zuordnen = erster v2-Zuwachs, BEWUSST weil
„Überschrift↔Absatz" = DELE/Goethe-Format → Brücke zum Prüfungssimulator. Lückentext später (Grammatik,
überlappt Schreiben). [TALLER]-Vertrag definiert (rahmen/texto/bruecke/lautschrift/aufgaben[]/schluss),
erbt Lektor-Muster; Zwei-Phasen NUR für `frei` (mc/orden prüft der Client). Prototyp
`prototyp-taller-lectura.html` gebaut (scripted) und GENEHMIGT. Frontend-Design-Skill vorab gelesen.
NÄCHSTER DESIGN-SCHRITT: `taller-modus.md` (Raum-Prompt) schreiben, dann Bau-Auftrag (api/taller.js +
taller.html). Open-Points besprochen: Legal ans Ende nach der Testphase (NDA-Beta). Reihenfolge gesetzt:
Taller fertig → bauen → Testphase (inkl. Live-Abnahme-Runde: nav-Drawer hart neu laden, Schreiben-Raum-
Schleife Treffer/Beinah/Stuck/Ziellinie→Lektion de/en, el-Lautschrift im Chat · + Dashboard 3→4) →
Audio/Gym/Simulator → Legal zuletzt.


**Diese Sitzung (18.06., Teil 10 — DESIGN, claude.ai):** Auf Anfrage von Claude Code die zwei
Bau-Vorlagen geliefert. `taller-modus.md` geschrieben (erbt von der Seele per Grundsatz-Nummer,
Struktur wie lektor-modus: Input-Vertrag, Phase-1-Komposition, drei Aufgaben-Typen, koennen-Regler,
Schrift-Brücke el, Phase-2-Bewertung des frei-Satzes, Niemals-Liste mit „kein Score"). Vorlagen
gelesen: spikiu-seele.md (7 Grundsätze), lektor-modus.md (Struktur), api/lektor.js — Befund: das
Ausgabe-Format ([LEKTOR]-Block) liegt im BACKEND, nicht im Modus; also gehört [TALLER]/[REACCION]
in api/taller.js, der Modus bleibt reines Verhalten. `AKTUELLER-AUFTRAG.md` (Teil 10) geschrieben:
Bau-Scope api/taller.js (Lektor-Muster, zwei Phasen, [TALLER]/[REACCION], toleranter Parser) +
vercel.json (includeFiles) + taller.html (Look aus Prototyp, Profil statt Wähler, ?dev=1-Schloss,
Navi-Slot; mc/orden prüft der Client, frei → Phase-2-Aufruf). Menü-Eintrag „Taller/Lesen" in nav.js
bewusst NICHT im Auftrag — eigener Mini-Schritt wie der write-Eintrag.

**Diese Sitzung (18.06., Teil 11):** Auftrag Teil 10 GEBAUT — Raum LESEN („Taller de lectura").
Protokoll gefahren: `git pull` (aktuell), echten `origin/dev` geprüft, Design-Dateien (taller-modus.md,
Prototyp, Auftrag, Ledger) lagen schon in dev (== Downloads, kein `cp` nötig). Erst alle Blaupausen
gelesen (lektor.js, taller-modus.md, prototyp-taller-lectura.html, vercel.json, schreibwerkstatt.html),
DANN drei Dateien gebaut:
- `api/taller.js` (NEU): lektor-Muster (`export default`, kein import.meta, Seele+Modus via process.cwd(),
  gecacht). Zwei Phasen nach `antwort`: null→Phase 1 `[TALLER]` (rahmen/texto/bruecke/lautschrift/aufgaben[]/
  schluss), gesetzt→Phase 2 `[REACCION]` (reaktion/besser). Regler nach `koennen` (Textschwere, bruecke,
  Fragesprache, Phase-2-Zeigen); fremde_schrift→lautschrift. Toleranter Parser (JSON.parse→sanfte Reinigung
  →null; [REACCION] zusätzlich Feld-Auszug). `normAufgabe` validiert die drei Typen, repariert kaputte
  orden-loesung zur identity. Prompt verbietet gerade `"` in Werten.
- `vercel.json`: `api/taller.js` in `includeFiles:"*.md"` (Seele+Modus bündeln).
- `taller.html` (NEU): Look aus dem Prototyp + Nav-Slot/Dev-Schloss/defensives Profil aus schreibwerkstatt.
  Beim Laden Phase-1, dynamisches Rendering; mc/orden Client-geprüft (Charta-Muster, ▲▼), frei→Phase-2;
  „Noch ein Text" lädt neu. UI in Muttersprache (de/es/en). Capy via CAPY() komplett.
Abnahme: `node --check api/taller.js` grün, `vercel.json` valides JSON, beide Inline-Scripts via `vm.Script`
grün; Auftrag-greps (data-spk-nav=1, /api/taller=1, api/taller.js in vercel=1, nav.js-src=1, Capy-Ohren cy=17 ×2);
Parser-Smoke-Test (data:-Modul, Quelle unangetastet) deckt P1 verschachtelte aufgaben, P2 sanfte Reinigung,
P3 orden-loesung-Reparatur, P4 reaccion, P5 gerade-`"`-Fallback — alle grün. NICHT live geprüft (Vercel,
Leonardo): der Phase-1/Phase-2-Endpoint am echten dev-Deploy + der Klick-Durchlauf (mc/orden/frei, el-3-Spuren,
`?dev=1`-Wähler). Menü-Eintrag „Lesen" in nav.js ist bewusst NICHT Teil dieses Pakets (eigener Mini-Schritt,
wie der `write`-Eintrag) — der Drawer führt noch nicht in den Lese-Raum. NÄCHSTES: live abnehmen, dann
nav.js-Eintrag „Lesen" (Mini-Schritt), danach Testphase/Dashboard 3→4.

**Diese Sitzung (19.06., Teil 12):** Taller LIVE genommen (Vercel Hobby-Limit war die 404-Ursache,
Leonardo auf Pro → Deploy von Commit c3f850d live; alle anderen Seiten gaben 200, nur taller.html 404 →
war Plan-Limit, kein Build-Fehler). Live bestätigt: Seite lädt, „Noch ein Text" funktioniert. EIN
Nachzug aus Design: „Genug für heute" hatte nur einen Platzhalter (Knopf grau) → jetzt: beide Knöpfe
sperren, EINE warme Abschiedszeile in Spikius Stimme (Muttersprache de/es/en, Name aus `spikiu_user.name`
optional), nach ~900 ms `window.location.href='dashboard.html'` (kein Variablenname `location`). Kein
„Bist du sicher?", kein Score. Abnahme: beide Inline-Scripts via `vm.Script` grün, 3 BYE-Vorlagen, kein
verbotener Variablenname. NOCH ZU KLICKEN (Leonardo): mc/orden/frei-Durchlauf, el-3-Spuren, `?dev=1`,
Abschied→Dashboard. NÄCHSTES: nav.js-Eintrag „Lesen" (eigener Mini-Schritt), dann Testphase/Dashboard 3→4.

**Diese Sitzung (19.06., Teil 13):** Menü-Eintrag „Lesen" in `nav.js` GEBAUT (der letzte offene
nav-Mini-Schritt, Zwilling zum `write`-Eintrag). Design hier entschieden (Leonardo am Terminal): Labels
DE „Leseraum" / ES „Taller de lectura" / EN „Reading Room", Position direkt UNTER „Schreibwerkstatt"
(talk → write → read → books), Icon aufgeschlagenes Buch (deutlich anders als das geschlossene „Bücher"-
Icon). Vier chirurgische nav.js-Edits exakt nach Muster: I18N `read` in alle drei Sprachblöcke, ICON `read`
(book-open, `M2 3h6…`), STRUCT `{ id: 'read', href: 'taller.html' }` zwischen write+books, getActive
`taller`→`read`. Abnahme: alle sechs Verifikations-greps == 1, Reihenfolge talk→write→read→books bestätigt,
`node --check nav.js` grün, nur nav.js angefasst. Damit führt der Drawer jetzt in ALLE Räume inkl. Lesen.
NICHT live geklickt (Vercel; nav.js cacht → hart neu laden). Damit ist das nav-Paket endgültig komplett.
NÄCHSTES: Testphase (Klick-Durchläufe) + Dashboard 3→4.

**Diese Sitzung (19.06., Teil 15):** Reader-Tab-Titel angeglichen. Befund (geprüft am echten Code): der
`-de`/`-es`-Suffix = Muttersprache des Lerners → `capN-de` trägt die SPANISCHE Story (Ziel Spanisch,
lang=es, „Capítulo"/„Lectura"), `capN-es` die DEUTSCHE (Ziel Deutsch, lang=de, „Kapitel"/„Lektüre") — also
KEIN vertauschtes-Dateien-Chaos, die Dateien sind intern stimmig. Einzige Unstimmigkeit: der Story-Name im
`<title>` stand in der Muttersprache statt der Zielsprache (z. B. „Capítulo 1 · Der Flughafen"), die beiden
Story-Namen waren übers de/es-Paar getauscht. Fix: 8 `<title>`-Story-Namen auf die Zielsprache gezogen
(Namen aus der `CHAPTERS`-Tabelle in books.html), anker-genau auf `· …</title>` — git diff zeigt genau 8×
(+1/−1) nur die Titelzeile, Konsistenz-Check (Kapitelwort↔lang) 8× OK. Betraf nur den Browser-Tab; in der
App zieht books.html den Titel ohnehin lokalisiert aus CHAPTERS. Reine Aufräum-Korrektur, kein Verhalten.

**Diese Sitzung (19.06., Teil 12 — DESIGN, claude.ai):** Aus einem Screenshot des laufenden Drawers erkannt: „Leseraum" + „Bücher" direkt untereinander stiften Verwirrung (beide = „hier liest man"). Entschieden (Leonardos Instinkt): Werkstatt-Familie für die geführten Räume — „Leseraum"→„Lesewerkstatt" (spiegelt „Schreibwerkstatt"), und „Bücher"→„Meine Bücher" (Besitz-Wort = Bibliothek, kein Raum). Trio: Lesewerkstatt/Taller de lectura/Reading Workshop · Meine Bücher/Mis libros/My Books. Reine Label-Änderung: nav.js (read de/en, books de/es/en — es read „Taller de lectura" war schon richtig) + taller.html TXT.room (de/es/en). Mini-Auftrag (Teil 12) geschrieben. Vorab verifiziert: „Genug für heute" ist bereits gebaut+geloggt (Teil 11), taller.html lokalisiert roomName schon per Muttersprache. Offen-Notiz: schreibwerkstatt-Bar-Label heißt noch „Schreiben" (nicht „Schreibwerkstatt") — kleine Asymmetrie, später optional angleichen.

**Diese Sitzung (19.06., Teil 12 — BAU):** Mini-Auftrag „Menü-Labels entwirren" erledigt (commit 2e7ccd4, gepusht origin/dev). Start-Protokoll gefahren: Ledger + Auftrag gelesen, echten origin/dev geprüft (lokal == origin/dev, sauber). Reine Label-Änderung, zwei Dateien: `nav.js` I18N — read de „Leseraum"→„Lesewerkstatt", en „Reading Room"→„Reading Workshop" (es „Taller de lectura" war schon richtig); books de/es/en „Bücher/Libros/Books"→„Meine Bücher/Mis libros/My Books". `taller.html` TXT.room — de „Lesen"→„Lesewerkstatt", es „Lectura"→„Taller de lectura", en „Reading"→„Reading Workshop". NICHTS sonst angefasst (keine STRUCT/Icons/hrefs/getActive, kein anderes TXT-Feld). Abnahme grün: jedes neue Label genau 1× in nav.js UND 1× in taller.html (Lesewerkstatt/Reading Workshop/Taller de lectura), alte read-Labels 0×, alte room-Werte 0×, `node --check nav.js` OK, beide taller.html-Inline-Scripts via vm.Script OK. NICHT live geklickt (Vercel; nav.js cacht → hart neu laden).

**Diese Sitzung (19.06., Teil 13 — BAU):** Die Offen-Notiz aus Teil 12 geschlossen. `schreibwerkstatt.html` Z. 97: stilles `room-name`-Bar-Label „Schreiben"→„Schreibwerkstatt" (statisch, kein i18n-Block — anders als taller.html mit TXT.room). Damit spiegelt das rechte Label jetzt den Drawer-Eintrag „Schreibwerkstatt" und das taller-Pendant „Lesewerkstatt". Genau eine Zeile, sonst nichts angefasst. Abnahme: neues Label 1×, altes 0×, beide Inline-Scripts via vm.Script grün. commit 63e39dc, gepusht origin/dev. Rest-Asymmetrie (nur Kosmetik) → direkt im Anschluss erledigt (Teil 14).

**Diese Sitzung (19.06., Teil 14 — BAU):** Tab-Titel der beiden Werkstatt-Seiten angeglichen (auf Wunsch). `schreibwerkstatt.html` Z. 6 `<title>` „Spikiu — Schreiben"→„Spikiu — Schreibwerkstatt", `taller.html` Z. 6 „Spikiu — Lesen"→„Spikiu — Lesewerkstatt" (beide statisch, kein i18n — wie zuvor). Damit ziehen Tab-Titel, Bar-/room-Label und Drawer-Eintrag durchgängig die Werkstatt-Familie. Abnahme: neue Titel je 1×, alte 0×. commit e6de796, gepusht origin/dev. Keine weitere offene Asymmetrie.

### EISERNE REGEL
Eine Sitzung endet NIE mit uncommittetem Code. Am Sitzungsende: Commits + diese
Übergabe aktualisieren. Ein Chat = ein Arbeitspaket, bewusst beendet.
