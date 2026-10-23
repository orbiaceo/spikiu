# buch/ — Gramática A + Cuaderno A

Zwei zusammengehörige Bücher (Erklärung + Übungen, Spanisch A1–A2 für Deutschsprachige) aus **einer** Quelle.

- Inhalte: `content/kap-XX.json` (Format und Stil: `tools/SCHEMA.md`), Verbtabellen: `content/verbos.json` (`tools/make_verbos.py`)
- Bauen: `python3 tools/build.py` → `out/print/*.pdf` (Druck), `out/digital/*.pdf` (klickbar), `Gramatica-A.html` + `Cuaderno-A.html` (Online, in der Bibliothek verlinkt), `out/audio-manifest.json`, `out/Bildprompts-Gramatica-A.md`
- Nur ein Kapitel prüfen: `python3 tools/build.py --only 5 --png --book GC`
- Bilder: fertige Cartoons als `bilder/<id>.png` (z. B. `bilder/11.5-A.png`) ablegen → der Build ersetzt den Platzhalter
- Neue Icons: einmal `tools/hol-openmoji.sh`, danach kopiert der Build benutzte Icons nach `icons/`
- Icons: OpenMoji (CC BY-SA 4.0)
