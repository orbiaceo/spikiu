# AUFTRAG — erledigt am 21.06.2026 · kein offener Auftrag

Geführtes Gespräch **PAKET 2 „Die Häppchen" (Vertrag B)** ist gebaut, headless
verifiziert und auf `dev` gepusht. Der nächste Auftrag kommt aus der Design-Sitzung
(claude.ai) — voraussichtlich **P3 „Die Lektion"**. Stand & Details im
`SPIKIU-BUILD-LEDGER.md`.

---

## Was gebaut wurde (21.06., Claude Code)
- **`api/haeppchen.js`** (neu, Muster `lektor.js`) — eigener Endpoint, EIN Endpoint
  alle Sprachen, `export default`, kein `import.meta`, Seele + `haeppchen-modus.md`
  via `process.cwd()` (gecacht). Striktes JSON: `{ thema, wortschatz[], hoerverstehen[] }`.
  Toleranter Parser (```-Zäune strippen, auf `{…}` eingrenzen, Trailing-Komma-Reinigung).
  `normalizeHaeppchen` filtert kaputte Items (HV braucht genau 2 Optionen + genau 1
  richtige), klemmt auf 4–6 Wörter / 2–3 Hör-Items. Bei Müll → leere Listen → 200
  (nie HTML/Prosa); die Oberfläche steigt dann direkt ins Rollenspiel ein.
- **`haeppchen-modus.md`** (neu) — schlanke Raum-Schicht (Muster `lektor-modus.md`),
  verweist per Nummer auf die Seele, definiert NUR Häppchen-Erzeugung + Regeln
  (4–6 Wörter neutro, 2–3 Minimalpaar-Hör-Items, Frage in Muttersprache,
  Lautschrift Pflicht bei fremder Schrift / sonst optional, koennen-Regler).
- **`vercel.json`** — `api/haeppchen.js` als Function mit `includeFiles: "*.md"`.
- **`chat.html`** — Fortschrittsbalken (Thema·Wörter·Hören·Sprechen·Lektion, füllt
  bis Sprechen, Lektion blass=P3), Wortschatz- + Hörverständnis-Widgets inline (Stil
  Prototyp, A/B grün/rot), `audio.js` via type=module + `window` durchgereicht
  (`speak`/`warm`, Browser-Notbremse falls Import scheitert), lokalisierter Lade-Spinner
  DE/ES/EN, Eingabe während des geführten Schritts gesperrt. P1-Pfad unberührt: nach
  den Häppchen feuert der bestehende Seed-Zug das Rollenspiel über `/api/gespraech`.

## Verifiziert (headless, Chrome via CDP, Backend gestubbt, de→es-Profil)
Ganze Kette grün: Gabelung (4 Chips) → Thema-Klick → Rail erscheint → 3 Wortschatz-Karten,
Stufe „Wörter" aktiv, Eingabe gesperrt → 🔊 klickbar → Weiter → Hörverständnis 1 (falsch →
rot + richtige grün enthüllt, disabled) → Weiter → Hörverständnis 2 („2 / 2", richtig →
„Richtig!") → Übergabe-Notiz → Stufe „Sprechen" aktiv, „Lektion" blass → Eingabe wieder
frei → Rollenspiel-Bubble vom (gestubbten) `/api/gespraech`. `node --check` grün
(haeppchen.js + beide chat.html-Inline-Scripts); Parser-Smoke-Test grün (Zäune,
Trailing-Commas, kaputte HV-Items gefiltert, Griechisch-Lautschrift erhalten).
Nur die 4 Dateien geändert.

## ABNAHME-REST (Leo auf dev / am Gerät — NICHT headless fakebar)
- **Modell-Inhalt** auf echtem dev: Wortschatz wirklich themen-relevant + español **neutro**
  (kein voseo); Hör-Items echte nahe Minimalpaare; bei `el` Umschrift konsistent.
- **Hörbares Audio**: 🔊 spricht über Piper (oder Browser-Fallback) auf dem Gerät;
  iOS-Safari-Fallback (geräteseitig, siehe Audio-Abnahme).
- `koennen`-Regler fühlbar (anfang kürzer/einfacher als fortgeschritten).
