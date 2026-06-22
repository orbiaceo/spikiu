# AUFTRAG — erledigt am 22.06.2026 · kein offener Auftrag

> „Capy vivo" (Paket 1 der Design-Welle „Neuer Look") GEBAUT + auf dev verbucht.
> `capy-vivo.js` (NEU, Root-Helfer `window.spkCapyAlive`) + `lesebegleiter.js` (Augen-Gruppe
> eingewickelt, FAB markiert, Helfer geladen+aufgerufen). Headless verifiziert (ok:true),
> `node --check` grün, nur die 2 Dateien. Details im SPIKIU-BUILD-LEDGER.md.
> NÄCHSTES = Paket 2 (untere Navigation) — erst Routing klären; nutzt `spkCapyAlive`.

---

# AUFTRAG (Archiv) — „Capy vivo" (Paket 1 der Design-Welle „Neuer Look")

Stand: 22.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigter Prototyp (Stil + Verhalten): `prototyp-capy-vivo.html`

> Erstes Paket der Code-Landung. Ziel: Spikiu LEBT — der Capy atmet (hat er schon),
> **blinzelt von selbst, folgt dem Finger/Mauszeiger mit dem Blick, und macht beim
> Antippen einen kleinen Freuden-Hüpfer.** Klein, autonom, kann die Navigation NICHT
> brechen — der sichere, schnelle „wow"-Gewinn für die Tester.
>
> WICHTIG: gebaut als WIEDERVERWENDBARER Helfer, denn derselbe lebende Capy soll später
> auch der erhöhte Mitte-Capy der unteren Navigation (Paket 2) werden.

## DATEIEN (ZWEI)
1. **NEU `capy-vivo.js`** (Repo-Root, statisch wie `nav.js`/`audio.js` — KEIN `vercel.json`-Eintrag, kein `api/`).
2. **`lesebegleiter.js`** (der schwebende Reader-Begleiter, live in allen 8 Kapiteln cap1–4-es/de).

`api/*`, Seele, `*-modus.md`, `vercel.json`, die 8 Reader-HTMLs und jede andere Datei
bleiben UNBERÜHRT.

## 1) `capy-vivo.js` — der wiederverwendbare Helfer
Schlank, ohne Abhängigkeiten. Exponiert `window.spkCapyAlive(svgEl, opts)`.
Bekommt ein bereits gerendertes Capy-`<svg>` und macht es lebendig:

- **Blinzeln (auto):** die Augen kurz zu Schlitzen (≈120–150 ms), dann wieder auf;
  Intervall zufällig ≈2,5–6 s. Umsetzung: die vier Augen-Kreise (zwei dunkle Augen
  `cx33/47 cy24 r3.5` + zwei weiße Glanzpunkte `cx34/48 cy23 r1.2`) liegen in einer
  Gruppe `<g class="spk-capy-eyes">` (wird in Schritt 2 in den SVG-String gesetzt);
  Blinzeln = kurz `transform:scaleY(.1)` auf diese Gruppe (`transform-box:fill-box;
  transform-origin:center`). Glanzpunkte dürfen beim Blinzeln verschwinden.
- **Blick folgt dem Zeiger:** bei `mousemove`/`touchmove` die Augen-Gruppe leicht zum
  Zeiger verschieben (translate, **geklemmt auf ±2–2,5 px** im 80er-viewBox, sanfte
  Transition ~.15 s). Bezugspunkt = Mitte des SVG (`getBoundingClientRect`). Beim
  Verlassen sanft zurück in die Mitte.
- **Tipp = Freuden-Hüpfer:** auf `pointerdown`/Klick des SVG (bzw. seines Tipp-Ziels)
  ein kurzer Hüpfer (≈.5 s, leichtes Hoch-Runter/Scale), Klasse wird nach der Animation
  entfernt. **Darf den bestehenden Klick NICHT schlucken** (kein `preventDefault`/
  `stopPropagation`) — der Lesebegleiter muss weiter aufgehen.
- **`prefers-reduced-motion`:** dann KEIN Tracking/Hüpfer, Blinzeln sehr dezent oder aus;
  Atmen (CSS) bleibt ohnehin der Seite überlassen.
- Defensive: kein `.spk-capy-eyes` gefunden → ruhig no-op. Mehrfach-Aufruf idempotent
  (nicht doppelt Intervalle/Listener setzen). Eigener CSS-Namensraum, stört nichts.
- Der Helfer fügt seine paar Keyframes/Klassen selbst ein (eigener `<style>`), oder nutzt
  inline-Transforms — keine Abhängigkeit von fremdem CSS.

## 2) `lesebegleiter.js` — den schwebenden Capy beleben
- Im `CAPY`-SVG-String (Z. 55–64) die **vier Augen-Kreise** (zwei `#3d2b1f`-Augen +
  zwei weiße Glanzpunkte) in `<g class="spk-capy-eyes">…</g>` einwickeln. **Sonst NICHTS
  am SVG ändern** — Capy bleibt VOLLSTÄNDIG (2 Ohren, Schnauze, Nase, 4 Pfoten, Lächeln).
- Dem FAB-Capy-`<svg>` eine Kennung geben (z. B. Klasse `spk-capy-alive`), damit der
  Helfer es findet (Tipp-Ziel = der `.spk-beg-fab`-Button).
- `capy-vivo.js` EINMAL laden (dynamisch ein `<script src="/capy-vivo.js">` injizieren,
  falls noch nicht da) und nach dem Mounten `spkCapyAlive(fabSvg, {tapTarget: fabButton})`
  aufrufen. KEINE Edits an den 8 Reader-HTMLs nötig.
- Die bestehende Atem-Animation (`@keyframes spkbeg-float` auf `.spk-beg-fab svg`) BLEIBT.
- Das kleine Panel-Kopf-Capy (`.spk-beg-head svg`, 28 px) optional ebenfalls beleben —
  wenn sauber, gern; sonst nur das FAB. Kein Muss.

## ABNAHME
- [ ] Der schwebende Capy (alle 8 Reader-Kapitel) **blinzelt** von selbst, **folgt dem
      Finger/Zeiger** mit dem Blick und macht beim **Antippen einen Freuden-Hüpfer** —
      und das Panel geht beim Tippen weiterhin auf.
- [ ] Atmen bleibt; Capy VOLLSTÄNDIG (Ohren/4 Pfoten), nie trasquilado; SVG-Form sonst
      unverändert.
- [ ] `prefers-reduced-motion`: ruhig (kein Tracking/Hüpfer).
- [ ] `capy-vivo.js` ist ein eigenständiger, wiederverwendbarer Root-Helfer
      (`window.spkCapyAlive`) — bereit für den Mitte-Capy der Navigation (Paket 2).
- [ ] Nur die 2 Dateien; `api/*`/Seele/`*-modus.md`/`vercel.json`/Reader-HTMLs unberührt.
- [ ] `node --check` grün (`capy-vivo.js` + `lesebegleiter.js`).

## AUSDRÜCKLICH NICHT
- KEINE Launen/Moods in diesem Paket (kommen später, z. B. „spricht" mit Voz-Paket) —
  nur atmen/blinzeln/Blick/Tipp.
- KEINE Navigation, kein neuer großer Mitte-Capy (= Paket 2), keine anderen Flächen
  (Dashboard/chat-Avatar) — nur der Lesebegleiter-FAB.
- Kanonischen SVG NICHT umformen/vereinfachen. Kein `api/`, kein Stripe/Supabase.

## DANACH (Design-Welle, je eigenes Paket, je nach Leo)
- **Paket 2 — untere Navigation** statt Hamburger (`prototyp-bottom-nav.html`): global,
  zuerst Routing klären (welche Seite = welcher Tab, Werkstatt-Hub mit Gym als drittem
  Atelier, „Mein"-Ziel); der erhöhte Mitte-Capy nutzt `spkCapyAlive` aus Paket 1.
- Dann **Baum** (`prototyp-baum-lebt.html`; das Dashboard hat schon einen statischen
  Baum + Balken Z.233 → durch den wachsenden ersetzen), dann **Memoria** / **Voz** /
  **Reel táctil** (reiten auf `lastConversation` + Audio).
