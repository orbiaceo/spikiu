# AKTUELLER AUFTRAG — für Claude Code

_Geschrieben von Claude (claude.ai, Design) am 18.06.2026 (Teil 5).
Mach NUR diesen Auftrag. Wenn fertig: committen, pushen, Bericht ins Ledger,
diese Datei auf „erledigt" setzen._

---

## TITEL
nav.js in `schreibwerkstatt.html` bringen — SLOT-MODUS in die vorhandene `.bar`,
Test-Wähler raus aus dem Produkt, hinter `?dev=1` gesperrt.

## WARUM
Die Werkstatt ist die letzte App-Seite ohne den Hamburger. Sie soll dieselbe Navi tragen
wie überall (Auto-Prinzip: identisches Armaturenbrett). Ihre eigene Kopfzeile `.bar` trägt
aber die Test-Wähler `#selLang` + `#selKoennen`, an denen das Lektor-Script hängt
(`profile()` liest sie). Würde nav.js im Slot-Modus den ganzen `.bar`-Inhalt überschreiben,
verschwänden die Wähler → `getElementById('selLang')` null → Script bricht.

Design-Entscheidung (Ledger Offene-Punkte 4, zugleich 1): die Wähler waren **Altlast** aus
der Zeit der offenen Assessment-Schuld. Jetzt schreibt das Assessment `zielsprache`/`koennen`
kanonisch ins Profil. Also: Wähler **raus aus dem Produkt-Look**, Raum liest das Profil. Zum
bequemen Testen blendet `?dev=1` die Wähler wieder ein. Prototyp `prototyp-schreibwerkstatt-nav.html`
ist genehmigt — diese Datei ist die Vorlage, nur in die echte `schreibwerkstatt.html` übertragen.

## SCOPE (NUR schreibwerkstatt.html)
1. **Font:** im `<link …css2?family=…>` `Lora:ital,wght@0,400;0,600;0,700;1,400&family=` VOR
   `Cormorant+Garamond` ergänzen (damit die Navi-Wortmarke „Spikiu" wie auf den anderen Seiten aussieht).
2. **Bar umbauen** — die `.bar` bleibt EINE Leiste, bekommt aber einen eigenen Navi-Slot links
   und das stille Raum-Label rechts. Konkret:
   - Den bisherigen `<div class="brand">…SVG…Schreiben</div>` ERSETZEN durch
     `<div class="nav-slot" data-spk-nav></div>` (nav.js füllt hier Hamburger+Logo — der Slot ist
     ein EIGENES Element, NICHT die ganze `.bar`, sonst werden die Wähler überschrieben).
   - Den bisherigen `<div class="controls">…</div>` ERSETZEN durch:
     ```
     <div class="room">
       <span class="room-name">Schreiben</span>
       <div class="controls" id="devControls" hidden>
         <span class="dev-tag">dev</span>
         …die ZWEI bisherigen <label>+<select id="selLang">/<select id="selKoennen">…
       </div>
     </div>
     ```
   - **Wichtig:** Die `<select id="selLang">` und `<select id="selKoennen">` bleiben im DOM (nur jetzt
     in `#devControls`, default `hidden`). Das Lektor-Script bleibt damit unangetastet —
     `profile()`/Seeding/Handler greifen weiter auf dieselben IDs.
3. **CSS ergänzen** (aus dem Prototyp, nach `select:focus`):
   ```
   .room{display:flex;align-items:center;gap:.8rem;flex-wrap:wrap}
   .room-name{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.15rem;color:var(--ink-soft);letter-spacing:.01em}
   .dev-tag{font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:var(--gold);border-radius:99px;padding:.12rem .5rem}
   ```
4. **`nav.js` einbinden:** `<script src="nav.js" defer></script>` vor `</body>`.
5. **Dev-Schloss-Script** (eigener kleiner `<script>`, NACH dem Lektor-Script, vor nav.js):
   ```
   (function(){
     if(!/[?&]dev=1\b/.test(location.search)) return;   // Produkt: Wähler bleiben weg
     var box=document.getElementById('devControls'); if(box) box.hidden=false;
   })();
   ```
   (Die Wähler werden vom bestehenden Script bereits aus dem Profil vorbelegt — nichts doppeln.)
   Verbotene Variablennamen meiden (kein `history`/`location`/`name`/… als VARIABLE; `location.search`
   nur LESEN ist erlaubt).

## ABNAHME-KRITERIEN („fertig" ist messbar)
1. Normal geöffnet zeigt `schreibwerkstatt.html` GENAU EINE Leiste: links Hamburger + Spikiu-Logo,
   rechts stilles kursives „Schreiben". KEINE Sprach-/Können-Wähler sichtbar. Kein zweites Capy.
2. Hamburger öffnet den Drawer (Haupt/Fortschritt/Konto, Gym „bald", Capy komplett); Backdrop-Klick
   und Escape schließen. (Aktiv-Markierung: noch keine — „Schreiben" fehlt im Menü, eigener Schritt.)
3. Mit `?dev=1` erscheinen die zwei Wähler mit goldenem „dev"-Tag, vorbelegt aus dem Profil.
4. Der Lektor-Flow läuft unverändert: Text hinlegen → `/api/lektor` antwortet, Regler nach `koennen`,
   Sprache nach Profil — auch OHNE sichtbare Wähler (Werte aus `#selLang`/`#selKoennen` im DOM).
5. Layout heil: Seite scrollt natürlich (kein 100dvh-Lock), kein doppelter Scrollbalken.
6. UNANGETASTET: alle anderen Seiten (index, dashboard, books, sessions, learnraum, chat, cap*) und nav.js.
7. `node --check` auf das/die Inline-Script(s) von schreibwerkstatt.html läuft sauber.

## HINWEISE
- nav.js sucht `document.querySelector('[data-spk-nav]')`. Der Slot MUSS ein eigenes Element sein
  (`.nav-slot`), NICHT die ganze `.bar` — sonst überschreibt `host.innerHTML = inner` die Wähler.
- `.bar` hat `justify-content:space-between` → Slot links, `.room` rechts. Passt ohne weitere Styles.
- nav.js bringt seine eigenen `spk-`-Styles + Lora-Erwartung mit; Schritt 1 (Font) deckt das ab.
- Nach Lieferung: Leonardo lädt herunter → `cp` → verifizieren VOR commit:
  `grep -c "data-spk-nav" schreibwerkstatt.html` == 1 und
  `grep -c 'id="selLang"' schreibwerkstatt.html` == 1 (Wähler nur einmal, in #devControls).
  → commit → push origin dev → `schreibwerkstatt.html?v=N` cache-frei testen, dann `?v=N&dev=1`.

## ABNAHME-TEST (kurz)
`schreibwerkstatt.html?v=N` → eine Leiste (Hamburger + Logo links, „Schreiben" rechts), keine Wähler →
Hamburger → Drawer → schließen → Text hinlegen, Spikiu liest/antwortet. Dann `?v=N&dev=1` → zwei Wähler
mit „dev"-Tag erscheinen, es/anfang vorbelegt. Layout scrollt sauber.

---

_Status: OFFEN — bereit zum Bau._
