# AKTUELLER AUFTRAG

**erledigt am 06.08.2026 · kein offener Auftrag**

Der Learnroman-Auftrag vom 05.08. („Der Immersions-Leseraum — Lukas + Marta") ist
vollständig gebaut und auf `dev`. Abschnitt 10 (zu bauende Dateien) im Einzelnen:

1. ✅ **`learnroman-daten.js`** — Root-Helfer, `window.spikiuLearnroman(ziel, mutter)`.
   Beide Bücher, Kapitel **byte-genau** aus den abgenommenen Prototypen (maschinell
   übernommen, deep-equal bewiesen: 4+4 Kapitel, 193+172 Blöcke). `node --check` grün.
2. ✅ **`learnroman.html`** — statische Root-Seite. `nav.js` (Slot) + `audio.js` (Modul)
   + `learnroman-daten.js` + `capy-vivo.js`. Kapitelliste nach Etappen, Lese-Overlay,
   Tipp-Brücke, 🔊 auf jeder `z`/`p`-Zeile, Freischaltung nach `profile.koennen`,
   `?dev=1`, leerer Zustand ohne Buch. Profil defensiv aus `spikiu_user`.
3. ✅ **Eintritt in die Bibliothek** — nach frischem Blick in `origin/dev` der
   kleinstmögliche Eingriff: EINE Karte in `books.html` → `learnroman.html`.
   **`nav.js` unangetastet** (die Seite hält den Werkstatt-Tab per `data-nav-active`
   selbst aktiv). Die acht alten Reader-Kapitel bleiben unberührt.

Zusätzlich aus §7 des Auftrags (bindend, gab es im Projekt noch nicht):
✅ **`fonts/`** — Cormorant Garamond, DM Sans, Archivo Black, DM Mono und Lora selbst
gehostet (kein Google-Fonts-CDN mehr auf dieser Seite).

**Verifiziert:** `node --check` auf alle angefassten Skripte + Inline-Scripts · Daten-Probe
19/19 grün · echter headless-Chrome-Lauf über 7 Szenarien **ALLES GRÜN** (inkl. 0 `/api/`-Call
und 0 CDN-Schrift beim Lesen). Einzelheiten stehen im `SPIKIU-BUILD-LEDGER.md`.

**Offen (nicht Bau, sondern Abnahme/Design):** Geräte-Abnahme durch Leo (Piper-🔊 auf dem
iPhone, Lesegefühl Kap 3 → 4) und die vier Design-Fragen unter „OFFENE PUNKTE" Nr. 12 im
Ledger (Leseposition merken? · englische Etappen-Namen bestätigen · übrige Räume auf
selbst gehostete Schriften umhängen? · zeigt `books.html` künftig ganz auf den Learnroman?).
