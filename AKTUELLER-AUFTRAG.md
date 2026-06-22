# AKTUELLER-AUFTRAG — erledigt am 22.06.2026 · kein offener Auftrag

> **Teil 36 „Der lebende Baum" GEBAUT + auf dev (commit 12ff5ad).** Alle drei Teile erfüllt:
> A `baum.js` (lag committet/4fcec3d, verifiziert) · B `dashboard.html` (tree-hero = mobil
> sichtbarer lebender Baum-Held, echte Etappen-Pille kanonisch, Balken + Platzhalter-Stats raus,
> Blatt-Zeile) · C `chat.html` (ehrlicher Blatt-Zähler `user.blaetter` += 1 pro Gesprächsbogen,
> Flag `sessionGezaehlt`). Alle Abnahme-A/B/C-Punkte headless verifiziert (spkBaum 3 Etappen +
> genau-1-neues-Blatt · Dashboard mobil sichtbar/Pille/kein Balken · Zähler 0→1→1→2). Vollständiger
> Bericht + ABNAHME-REST (Gerät) + EINE FRAGE AN DESIGN (Auslöser für Etappen-Aufstieg
> `profile.etappe`/`user.blaetter` fehlt noch) im SPIKIU-BUILD-LEDGER.md (oberste „Stand:"-Zeile).
> Nächstes laut Auftrag: Design-Welle Paket 4/5/6 (Memoria/Voz/Reel-táctil).
>
> Der ursprüngliche Auftragstext steht unten unverändert als Referenz.

---

# (Referenz) Design-Welle Paket 3: Der lebende Baum (Teil 36)

Stand: 22.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Baut auf Teil 35 (Nav/Opener/Sprichwort, commit 5916ca6)

> Genehmigt im Prototyp `prototyp-baum-lebt.html`. Der statische, auf Mobile UNSICHTBARE Baum
> (`.tree-svg-wrap{display:none}`) + der Fortschrittsbalken werden ersetzt durch EINEN lebenden
> Baum, der mobil der Held der Startseite ist. **DREI Teile, DREI Dateien.**
>
> `baum.js` (A, NEU) · `dashboard.html` (B) · `chat.html` (C). `api/*` · Seele · `*-modus.md` ·
> `vercel.json` · `nav.js` · `capy-vivo.js` · `audio.js` · `sprichwort.js` · Reader-HTMLs UNBERÜHRT.
> `baum.js` ist ein statischer Root-Helfer wie `capy-vivo.js` (KEIN `vercel.json`-Eintrag).

BEFUND (frisch aus dev): die `tree-hero` (dashboard.html ~Z.236-251) zeigt rechts ein STATISCHES
SVG (auf Mobile `display:none`, Z.166), links eine Etappen-Pille „🌱 Spross — Stufe 2 von 4" (alter
4-Stufen-Drift), 4 Stats (7/7/142/3h) und einen Fortschrittsbalken „Fortschritt zu 🌿 Ast 35%".
Die Stats UND die 35% sind HARTKODIERTE PLATZHALTER — keine echten Daten. Darum darf die Blatt-Quelle
NICHT auf ihnen aufbauen (Seele: nie erfinden). Kanonisch sind drei Etappen: Samen → Stamm → Krone.

---

## TEIL A — NEU `baum.js` (liegt bereit — Inhalt wie geliefert übernehmen)

Statischer Root-Helfer wie `capy-vivo.js`/`sprichwort.js` (KEIN `vercel.json`-Eintrag), dependency-frei.
- `window.spkBaum(container, { etappe:'samen|stamm|krone', blaetter:N })` rendert einen lebenden
  SVG-Baum (viewBox 0 0 200 240) in DREI Etappen.
- Die **Krone wiegt sich** sanft (CSS-Keyframe `spk-baum-sway`, 7 s, Wiege-Punkt am Stammfuß 100/212).
- **Neue Blätter** (mehr als beim letzten Render derselben Etappe) **poppen rein** (`spk-baum-pop`),
  gestaffelt; bei `prefers-reduced-motion` ist alles ruhig (kein Wiegen, kein Pop).
- Blatt-Positionen via goldenem Winkel (gleichmäßig gestreut, stabil — kein Flackern), Obergrenze
  je Etappe (samen 4 / stamm 10 / krone 20); Keimling trägt immer zwei Keimblätter.
- CSS-Namensraum `spk-baum-*`, einmalig injiziert. `node --check baum.js` grün.

**ABNAHME A:** `node --check baum.js` grün; Helfer headless geladen → `window.spkBaum` definiert,
rendert für samen/stamm/krone je ein `<svg class="spk-baum-svg">` mit `.spk-baum-crown`; mehr
`blaetter` → mehr `.spk-baum-leaf`; zweiter Aufruf mit +1 Blatt → genau das neue trägt `.spk-new`.

---

## TEIL B — `dashboard.html` (tree-hero umbau)

Die `tree-hero` wird zum ruhigen, mobil sichtbaren Baum-Helden: Etappen-Pille (echt) → Titel →
LEBENDER BAUM → eine ruhige Zeile. **Kein Balken, keine Platzhalter-Stats.**

**B1 · Einbinden:** `<script src="baum.js" defer></script>` (neben `nav.js`/`sprichwort.js`).

**B2 · Container + Render:** das statische `<svg>` in `.tree-svg-wrap` durch einen leeren Container
`<div id="baumWrap" class="tree-svg-wrap">` ersetzen; im vorhandenen `load`-Handler:
- `user` aus `spikiu_user` defensiv lesen (wie heute).
- `etappe = (user.profile && user.profile.etappe) || 'samen'`.
- `blaetter = user.blaetter || 0`.
- `window.spkBaum(document.getElementById('baumWrap'), { etappe:etappe, blaetter:blaetter })`.

**B3 · Etappen-Pille (echt, kanonisch):** `.tree-level` (data-i18n `treeLevel` „Stufe 2 von 4") →
Pille aus echtem `profile.etappe`, i18n nach Muttersprache:
- de: 🌱 Samen · 🪵 Stamm · 🌳 Krone
- es: 🌱 Semilla · 🪵 Tronco · 🌳 Copa
- en: 🌱 Seed · 🪵 Trunk · 🌳 Crown

`#tree-title` („Dein Baum — <Sprache>", `DASH_TREEPREFIX`) BLEIBT. Darunter eine ruhige Zeile
(i18n): de „Bei jeder Sitzung wächst ein Blatt." · es „Con cada sesión crece una hoja." ·
en „Every session grows a new leaf."

**B4 · Entfernen:**
- Der Fortschrittsbalken (`.progress-label` + `.progress-bar`/`#pf`) — der Baum IST der Fortschritt.
- Die Platzhalter-Stats (`.tree-stats` mit 7/7/142/3h) — erfundene Daten (Seele). Echte Stats =
  eigenes späteres Daten-Paket; nicht hier mit Fake-Zahlen weiterführen.

**B5 · Mobil sichtbar als Held:** `.tree-svg-wrap{display:none}` (Z.166) RAUS; `.tree-hero`-Grid
(Z.41 `grid-template-columns:1fr 160px`) → eine zentrierte Spalte (Pille · Titel · Baum · Zeile),
der Baum voll sichtbar auf ALLEN Viewports (er ist der Held). Baum-Breite angenehm groß, zentriert.

**ABNAHME B:** Dashboard zeigt den lebenden Baum (Form nach echter `etappe`), Krone wiegt sich, auf
Mobile SICHTBAR; kein Balken, keine Fake-Stats; Etappen-Pille = echte Etappe (kanonisch, i18n);
„Bei jeder Sitzung wächst ein Blatt"; `node --check` grün.

---

## TEIL C — `chat.html` (echter Sitzungs-Zähler `user.blaetter`)

Damit der Baum WIRKLICH wächst: ein Blatt pro beendetem Gespräch — ehrlich, kein Fake.

- In `offerLesson()` (Z.621 — das EINE Gesprächsende-Tor seit Teil 32, das sowohl `terminar()` als
  auch der freie „Gespräch beenden"-Knopf erreichen): `user.blaetter = (user.blaetter||0) + 1`
  EINMAL pro Gesprächsbogen. `spikiu_user` defensiv lesen/schreiben (Muster wie Z.283/696).
- Doppel-Zählen verhindern: Modul-Flag `sessionGezaehlt` — in `offerLesson()` nur zählen, wenn
  `!sessionGezaehlt`, dann `true`; bei NEUEM Gespräch zurück auf `false` (`goFree()` Z.922 /
  `pickTopic()` / `startOpener()`).
- Die Gesprächs-/`turn()`-Logik, das Lektion-Angebot (Teil 32), Häppchen, Korrektur, Paletten
  NICHT anfassen — nur der eine Zähler kommt dazu. Keine browser-belegten Variablennamen.

**ABNAHME C:** nach „Gespräch beenden"/Szenenende wird `user.blaetter` GENAU um 1 erhöht (nicht
mehrfach, auch wenn das Angebot mehrmals erscheint); neues Gespräch setzt den Flag zurück; auf dem
Dashboard trägt der Baum danach ein Blatt mehr; `node --check` grün.

---

## AUSDRÜCKLICH NICHT
- `api/*` · Seele · `*-modus.md` · `vercel.json` · `nav.js` · `capy-vivo.js` · `audio.js` ·
  `sprichwort.js` · Reader-HTMLs nicht anfassen. Kein Stripe/Supabase.
- Die Lektion-Mechanik (Teil 32) + den Gesprächs-/Opener-Fluss (Teil 35) NICHT verändern — Teil C
  ist NUR der Zähler.
- Capy (falls irgendwo) VOLLSTÄNDIG, nie trasquilado.

## REIHENFOLGE
A (Helfer) zuerst, dann B (Dashboard-Held), dann C (Zähler). A+B sind der sichtbare Kern; C macht
das Wachsen echt.

## DANACH
Design-Welle Paket 4/5/6: Memoria que se siente · Voz primero · Reel táctil. Kleinkram-Paket 2
(Genus-Begrüßung Dashboard + Lesebegleiter-intro). Offen: echte Stats fürs Dashboard (Daten-Paket) ·
`learnraum.html` retten/retire · echte Einstellungen-Seite · `#lektionen`-Anker-Scroll am Gerät
prüfen (Teil 35 FRAGE). Backlog: Audio Phase B/C · Legal-Sequenz · Supabase + ElevenLabs = Phase 2.
