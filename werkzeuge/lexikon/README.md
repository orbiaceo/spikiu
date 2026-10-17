# Léxico-Werkstatt (18.10.2026)

Erzeugt `lexikon-de.js`, `lexikon-es.js`, `lexikon-en.js`, `lexikon-el.js` (Root) aus ALLEN Texten der App.
Laufzeit: 0 Token. Erzeugung: einmalig per Claude-Agenten, dann fest.

1. `node extract.js` → `daten/formen.json` (alle Formen je Zielsprache + Häufigkeit + Beispielsatz)
2. Pass 1 (Agenten, `P1-ANLEITUNG.md`): `daten/p1in/*.tsv` → `daten/p1out/*.tsv` (Form → Lemma + Fach + Artikel)
3. `node merge1.js <ziel>` → `daten/lemmas-<ziel>.json`, `daten/map-<ziel>.json`; `node split2.js <ziel>` → `daten/p2in/`
4. Pass 2 (Agenten, `P2-ANLEITUNG.md`): `daten/p2in/*.jsonl` → `daten/p2out/*.jsonl` (eine Ficha pro Lemma)
5. `node assemble.js <ziel>` → `lexikon-<ziel>.js` (Root). Korrekturen von Hand NUR in `overrides.json`
   (Schlüssel `lemma|fach`), damit sie jede Neuerzeugung überleben.

Neuer Inhalt: extract neu laufen lassen, nur die NEUEN Formen durch Pass 1/2 schicken, dann assemble.
Fächer: ding (Cosas) · tun (Acciones) · wie (Cómo es · cómo se hace) · klein (Palabritas) · name.
