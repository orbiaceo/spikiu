# AKTUELLER AUFTRAG — für Claude Code

_Geschrieben von Claude (claude.ai, Design) am 18.06.2026 (Teil 10).
Mach NUR diesen Auftrag. Wenn fertig: committen, pushen, Bericht ins Ledger,
diese Datei auf „erledigt" setzen._

---

## TITEL
Raum LESEN bauen — „Taller de lectura": `api/taller.js` + `taller.html` (+ `vercel.json`).
Blaupause: das Lektor-Muster. Vertrag: `[TALLER]` (siehe Ledger). Look: der genehmigte
`prototyp-taller-lectura.html`.

## WARUM
Vierter Raum nach Gespräch + Schreiben. Leseverstehen-Seminar (Misch-Form). Text-only,
Spikiu-generiert. Endpoint + Oberfläche fehlen — Vertrag, Modus und Prototyp liegen schon im Repo.

## SCOPE

### 1. `api/taller.js` — NEU, nach dem Muster von `api/lektor.js`
- `export default async function handler(req,res)`, CORS-Header, `OPTIONS`-Kurzschluss,
  `x-api-key` aus `process.env.ANTHROPIC_API_KEY`, Modell `claude-sonnet-4-5`.
- KEIN `import.meta`. Pfade über `process.cwd()`. Dateiname `.js`.
- Seele + Modus zur Laufzeit lesen: `readFileSync(join(process.cwd(), 'spikiu-seele.md'))`
  und `'taller-modus.md'` (mehrere Kandidatenpfade probieren, wie lektor.js).
- Prompt zusammenbauen: **Seele + taller-modus.md + OUTPUT-FORMAT (phasenabhängig) + Profil-Kontext**
  (`profile.koennen/muttersprache/zielsprache/fremde_schrift`, `thema`, ggf. `antwort`).
- **Zwei Phasen nach `antwort`:**
  - `antwort == null` → **Phase 1**, Modell antwortet AUSSCHLIESSLICH mit EINEM Block:
    ```
    [TALLER]
    {"rahmen":"…","texto":"…","bruecke":"… oder null","lautschrift":"… oder null",
     "aufgaben":[
       {"typ":"mc","frage":"…","optionen":["…","…","…"],"loesung":0,"erklaerung":"…"},
       {"typ":"orden","frage":"…","teile":["…","…","…"],"loesung":[2,0,1]},
       {"typ":"frei","frage":"…","hinweis":"…"}],
     "schluss":"…"}
    [/TALLER]
    ```
  - `antwort` gesetzt (`{frage, texto, satz}`) → **Phase 2**, Modell antwortet mit:
    ```
    [REACCION]
    {"reaktion":"…","besser":"… oder null"}
    [/REACCION]
    ```
- **Anführungszeichen-Regel (wie Lektor):** das JSON-Gerüst nutzt gerade `"`. Der Prompt
  VERBIETET dem Modell gerade `"` INNERHALB von Werten — nur typografische („ "). Das ist
  der Klassiker, an dem `JSON.parse` zerbricht.
- **Toleranter Parser:** erst `JSON.parse`; scheitert er, eine sanfte Reinigung versuchen,
  sonst `{ taller:null, text:roh }` (Oberfläche zeigt sanften Wiederholen-Knopf). Rückgabe:
  Phase 1 `{ taller, text }`, Phase 2 `{ reaccion, text }`.

### 2. `vercel.json`
- `api/taller.js` in die `functions`-`includeFiles: "*.md"` aufnehmen (damit Seele + Modus
  gebündelt werden) — analog zu `api/lektor.js` und `api/gespraech.js`. Pfad exakt prüfen.

### 3. `taller.html` — NEU, Look aus `prototyp-taller-lectura.html`
- Übernimm Stil/Struktur des Prototyps (Seminar-Stimme, Text-als-Dokument, Aufgaben-Block,
  Manöverkritik). Spikiu-SVG komplett (Ohren + 4 Füße).
- Profil DEFENSIV aus `spikiu_user.profile` lesen: `zielsprache`, `koennen`, `muttersprache`,
  `fremde_schrift` (Fallbacks wie schreibwerkstatt). KEINE sichtbaren Wähler im Produkt.
- **Dev-Schloss wie schreibwerkstatt:** `?dev=1` blendet Sprache+Können-Wähler ein (zum Testen
  es/de/el × anfang/fortgeschritten), sonst weg.
- **Navi-Slot:** `<…  data-spk-nav>` in die Kopfzeile + `<script src="nav.js" defer></script>`.
  (Taller ist eine SCROLLENDE Seite wie schreibwerkstatt — Slot in die `.bar`, kein 100dvh-Lock.)
- **Fluss:**
  - Beim Laden → Phase-1-Aufruf an `/api/taller` (mit Profil) → rendere `rahmen`, `texto`
    (+ `lautschrift` als zweite/dritte Spur bei el), `bruecke` (wenn gesetzt), die `aufgaben`, `schluss`.
  - `mc` und `orden` prüft die OBERFLÄCHE selbst (Lösung steckt im Block): mc grün/rot/Erklärung/disabled
    (Charta-Muster), orden mit ▲▼ + „Prüfen".
  - `frei`: Textarea + „Hinlegen" → Phase-2-Aufruf (`antwort = {frage, texto, satz}`) → rendere
    `reaktion` (+ `besser`, wenn gesetzt) in Spikius Stimme.
  - „Noch ein Text" → neuer Phase-1-Aufruf.
- Verbotene Variablennamen meiden (kein `history`/`location`/`name`/… als VARIABLE — `verlauf` statt `history`).

## ABNAHME-KRITERIEN
1. `taller.html` lädt → Spikiu eröffnet (Muttersprache), ein Text (zielsprache) liegt da,
   die Aufgaben erscheinen, unten die Manöverkritik. EINE Leiste oben (Navi-Slot), Seite scrollt.
2. `mc` grün/rot + korrekte markiert + Erklärung + disabled. `orden` mit ▲▼, „Prüfen" → grün wenn korrekt.
3. `frei` → „Hinlegen" → Spikiu reagiert (Phase-2-Aufruf liefert `reaktion`), kein Punktestand.
4. Profil greift: `zielsprache` bestimmt die Textsprache, `koennen` den Regler (anfang→`bruecke` da;
   fortgeschritten→`bruecke` null, alles zielsprache). `el` → `lautschrift` gesetzt (drei Spuren).
5. `?dev=1` blendet die Test-Wähler ein; ohne `?dev=1` sind sie weg.
6. UNANGETASTET: alle anderen Seiten/Endpoints. `node --check api/taller.js` + Inline-Script(s) grün.

## HINWEISE
- Vor der ersten Code-Zeile: `git ls-tree -r --name-only origin/dev`, `cat api/lektor.js`,
  `cat vercel.json` — echten Stand sehen, dann bauen.
- Deployment Protection für Previews aus (sonst HTML-Login statt JSON).
- Nach `cp`: `grep -c` auf eine eindeutige neue Zeile, BEVOR commit (Download-Falle).
- **Menü-Eintrag „Taller de lectura"/Lesen in `nav.js` ist NICHT Teil dieses Auftrags** —
  eigener Mini-Schritt später (wie der `write`-Eintrag). Hier nur der Slot in `taller.html`.

## ABNAHME-TEST (kurz)
`taller.html?v=N` → Spikiu eröffnet, Text + Aufgaben da → MC klicken (grün/rot), Reihenfolge
ordnen + prüfen, Freitext hinlegen → Spikiu reagiert → „Noch ein Text" lädt neues Taller.
Dann `?v=N&dev=1` → Wähler erscheinen → auf `el` + `anfang` stellen → Text dreispurig.

## VERIFIKATION VOR COMMIT (Leonardo)
```
node --check api/taller.js && echo OK
grep -c "data-spk-nav" taller.html      # 1
grep -c "/api/taller" taller.html       # >=1
grep -c "api/taller.js" vercel.json     # >=1
```

---

_Status: OFFEN — bereit zum Bau._
