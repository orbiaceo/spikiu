# AUFTRAG — „Untere Navigation" (Paket 2 der Design-Welle „Neuer Look")

Stand: 22.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigter Prototyp (Stil): `prototyp-bottom-nav.html`

> Der sichtbare neue Look. Der Hamburger + Drawer weicht einer **festen unteren Tab-Leiste**
> (wie LinkedIn/Kleinanzeigen/Grok) — Daumen erreicht alles, kein verstecktes Menü.
> Routing + Layout FRISCH aus dev geprüft (nav.js 246 Z.; chat.html `.input-area` ist
> **kein** fixes Element, sondern Flex-Kind `flex-shrink:0` → nur Höhe reservieren).

## DATEIEN
1. **`nav.js`** (Umbau: Bottom-Tab-Bar statt Hamburger/Drawer + zwei Bottom-Sheets).
2. **Layout-Abgleich** auf den Seiten, die `nav.js` laden (dashboard.html, books.html,
   chat.html, schreibwerkstatt.html, taller.html, sessions.html) — nur so viel, dass die
   feste Leiste nichts verdeckt (siehe unten). **JEDE betroffene Seite einzeln headless prüfen.**
3. **`capy-vivo.js`** (aus Paket 1, nicht neu bauen): den erhöhten Mitte-Capy beleben.

`api/*`, Seele, `*-modus.md` und (außer dem nötigen Höhen-Abgleich) der Seiteninhalt
bleiben unberührt. Kein `vercel.json` (statische Dateien).

## DIE LEISTE — `nav.js`
Feste untere Tab-Leiste auf ALLEN `nav.js`-Seiten. Stil/Tokens/Capy aus
`prototyp-bottom-nav.html`. **Fünf Tabs**, i18n DE/ES/EN:

1. **Start** → `dashboard.html` (de Start · es Inicio · en Home)
2. **Reader** → `books.html` (Reader · Reader · Reader)
3. **Gespräch** — MITTE, erhöhter heller Sockel, **VOLLSTÄNDIGER Capy** (nie trasquilado) →
   `chat.html` (de Gespräch · es Conversa · en Talk). Der Mitte-Capy wird via
   `spkCapyAlive` (Paket 1) belebt: Augen-Gruppe `<g class="spk-capy-eyes">` in seinen
   SVG, `capy-vivo.js` laden + aufrufen (atmet/blinzelt/Blick/Tipp).
4. **Werkstatt** → öffnet ein **Bottom-Sheet** (de Werkstatt · es Taller · en Workshop):
   Schreibwerkstatt → `schreibwerkstatt.html` · Lesewerkstatt → `taller.html` · Gym
   (disabled, Badge „bald/pronto/soon" wie heute) — Gym lebt als drittes Atelier in der
   Werkstatt (Design-Entscheid). Labels aus dem bestehenden i18n (`write`/`read`/`gym`).
5. **Mein** → öffnet ein **Bottom-Sheet** (de Mein · es Perfil · en Profile): Lernweg →
   `dashboard.html#lernweg` · Verlauf → `sessions.html` · Lektionen →
   `dashboard.html#lektionen` · Einstellungen (nur wenn ein Ziel existiert, sonst weglassen).
   Labels aus bestehendem i18n (`path`/`verlauf`/`lessons`/`settings`).

> So wandern ALLE alten Drawer-Einträge vollständig in 5 Tabs + 2 Sheets — nichts geht verloren.

**Aktiver Tab** nach Dateiname (`location.pathname.split('/').pop()`, Logik wie heute Z.49):
dashboard→Start · books→Reader · chat→Gespräch · schreibwerkstatt/taller→Werkstatt ·
sessions→Mein · unbekannt→keiner.

**Hamburger + Drawer + Backdrop RAUS.** Wo eine Seite `[data-spk-nav]` hat (chat.html-Header,
Z.211), nur das **Marken-Logo** (kein Hamburger) hineinsetzen, damit der Header nicht leer/
kaputt wirkt. Kein zweiter Balken. Leiste fix unten, über dem Inhalt, mit
`padding-bottom: env(safe-area-inset-bottom)` (iPhone-Leiste unten). `nav.js` exponiert die
Leistenhöhe als CSS-Variable `--spk-navh` (am `:root`/`html`).

## LAYOUT-ABGLEICH (damit nichts verdeckt wird)
- **Normale Scroll-Seiten** (dashboard.html, books.html, sessions.html): unten
  `padding-bottom: var(--spk-navh)` am Inhalt/Body, damit die letzte Zeile frei bleibt.
- **Voll-Höhe-Flex-Seiten** (chat.html — `.app`/Haupt-Container ~100vh mit `.input-area`
  `flex-shrink:0`; ggf. schreibwerkstatt.html/taller.html ähnlich): Container-Höhe auf
  `calc(100vh - var(--spk-navh))` (bzw. `100dvh`), damit die Flex-Spalte ÜBER der Leiste
  sitzt und **das Eingabefeld sichtbar + erreichbar** bleibt. KEIN „lift" nötig — `.input-area`
  ist nicht fixed.
- Claude Code prüft JEDE Seite einzeln headless: nichts verdeckt, auf chat.html Eingabefeld
  voll nutzbar, untere iPhone-Safe-Area sauber.

## ABNAHME
- [ ] Feste 5-Tab-Leiste unten auf allen `nav.js`-Seiten; aktiver Tab je Seite korrekt
      hervorgehoben; Mitte = erhöhter **vollständiger** Capy, belebt (atmet/blinzelt/Blick/
      Tipp via `spkCapyAlive`).
- [ ] Werkstatt-Tab → Sheet (Schreibwerkstatt/Lesewerkstatt/Gym-bald); Mein-Tab → Sheet
      (Lernweg/Verlauf/Lektionen/Einstellungen). **Alle alten Drawer-Ziele erreichbar.**
- [ ] Nichts verdeckt: Scroll-Seiten unten frei; chat.html-Eingabefeld sichtbar + nutzbar
      über der Leiste; iPhone-untere-Safe-Area sauber.
- [ ] Hamburger/Drawer/Backdrop weg; Header zeigt weiter das Spikiu-Logo.
- [ ] i18n DE/ES/EN; Stil/Capy aus `prototyp-bottom-nav.html`; Capy vollständig.
- [ ] JEDE betroffene Seite headless verifiziert; `node --check` grün (`nav.js` + geänderte
      Inline-Scripts).

## AUSDRÜCKLICH NICHT
- KEINE neuen Vollseiten (`werkstatt.html`/`mein.html`) — Werkstatt/Mein sind Sheets.
- KEIN neuer Capy-Helfer — `capy-vivo.js` aus Paket 1 nutzen. Capy NIE trasquilado.
- Gym bleibt disabled (der Gym-Raum kommt später). Kein `api/`, kein Stripe/Supabase.
- Inhalt der Seiten nicht umbauen, nur der nötige Höhen-/Padding-Abgleich.

## DANACH (Design-Welle)
- **Paket 3 — Baum** (`prototyp-baum-lebt.html`): den statischen Dashboard-Baum (Z.233,
  `<svg viewBox="0 0 160 220">` + Fortschrittsbalken) durch den wachsenden ersetzen
  (Samen→Stamm→Krone, je Sitzung ein Blatt, wiegt sich).
- Dann **Memoria** / **Voz** / **Reel táctil** (reiten auf `lastConversation` + Audio).
