# AUFTRAG — erledigt am 21.06.2026 · kein offener Auftrag

Geführtes Gespräch **PAKET FEINSCHLIFF** (Teil 27) ist gebaut, headless verifiziert
und auf `dev` gepusht. Der nächste Auftrag kommt aus der Design-Sitzung (claude.ai) —
voraussichtlich **P3 „Die Lektion"**. Stand & Details im `SPIKIU-BUILD-LEDGER.md`.

---

## Was gebaut wurde (21.06., Claude Code) — zwei chirurgische Edits, zwei Dateien

**Arreglo A — Roleplay-Wand (`gespraech-modus.md`):**
- Neuer Abschnitt „IN DER SZENE BLEIBEN (Rollenspiel — die harte Wand)": Spikiu bleibt
  GANZ die Figur; kein „kleiner Tipp"/keine Grammatik-Anmerkung/kein Meta-Kommentar
  mitten in der Szene; Fehler werden STILL in der Figur reformuliert (das richtige
  Modell steckt unauffällig in der Antwort); Verbesserungen erst am Szenenende / in der
  Lektion. Plus passender Niemals-Bullet (wörtlich aus dem Auftrag).

**Arreglo B1 — `[[…]]`-Brücken-Vertrag (`gespraech-modus.md`):**
- Neuer Abschnitt „DIE ÜBERSETZUNGS-BRÜCKE PRO ZUG — Format `[[…]]`": Zielsprache zuerst,
  dann EIN `[[ Muttersprache ]]` auf eigener Zeile (Struktur-Signal wie `[WECHSEL]`, nie
  erklärt, nie im Fließtext). REGLER-Abschnitt daran gekoppelt (anfang fast immer, mittel
  bei Bedarf, fortgeschritten KEIN `[[…]]`). Fremde Schrift: Umschrift + Übersetzung im
  selben `[[…]]`. Niemals-Bullet gegen rohes `[[…]]` ergänzt.

**Arreglo B2 — Sprechblase + Kästchen + 🔊 (`chat.html`):**
- Tokens `--trans-bg/--trans-ink/--trans-border` + `.speak-btn` + `.trans` (Stil aus
  `prototyp-sprechblase-uebersetzung.html`). `addMessage('spikiu', …)` splittet jetzt:
  `splitBridge()` zieht das `[[…]]` heraus → Zielsprache in die Blase (mit dezentem 🔊
  oben rechts), Übersetzung in ein gedämpftes Kästchen darunter (kein Audio). Kein
  `[[…]]` → nur die Blase. 🔊 ruft `playFrom` → `speakText`/`window.spkSpeak` mit dem
  **Zieltext** (Emphasis-Marker via `plainForSpeech` entfernt), nie der Übersetzung.
  User-Bubbles unverändert (grün, kein 🔊, kein Kästchen). `verlauf` speichert weiter den
  rohen Text **mit** `[[…]]` (nur `[WECHSEL]` wird wie bisher zuerst extrahiert) — beide
  Signale koexistieren. Gilt für ALLE Spikiu-Züge (Opener/Rollenspiel/Übergabe).

## Verifiziert (headless, Chrome via CDP, Backend+Audio gestubbt, de→es-Profil)
- Opener: `[[…]]` nie als Rohtext im DOM; Blase = Zielsatz, Kästchen = Übersetzung; 🔊
  spricht NUR den Zieltext (ohne `[[…]]`/Marker), lang=es.
- Zug mit `[[…]]` **und** `[WECHSEL:schreibwerkstatt]`: Tür-Knopf erscheint, weder `[[`
  noch `WECHSEL` lecken als Text; User-Bubble ohne 🔊/Kästchen.
- Zug ohne `[[…]]` (fortgeschritten-Fall): nur Blase, kein Kästchen.
- `node --check` grün (beide chat.html-Inline-Scripts); `gespraech.js`/`haeppchen.js`
  unangetastet; nur 2 Dateien geändert; `vercel.json` unberührt.

## ABNAHME-REST (Leo auf dev / am Gerät — NICHT headless fakebar)
- Roleplay-Wand am echten Modell: in der Szene wirklich KEIN Lehrer-Austritt mehr, Fehler
  still reformuliert.
- Hörbares 🔊 (Piper/Fallback) + Lesefluss Blase/Kästchen auf dem Gerät; `fortgeschritten`
  ohne Brücke; Greek-Kästchen Umschrift+Übersetzung.
