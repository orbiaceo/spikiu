# AKTUELLER AUFTRAG — Geführtes Gespräch: Sprechen + Lektion 0-Token (Etappe 3)

_Stand: 13.08.2026 · claude.ai-Design · Leo: „A+B und die statische Lektion"_

═══════════════════════════════════════════════════════════
PROBLEM
═══════════════════════════════════════════════════════════
Im geführten Fluss (Wörter → Hören → **Sprechen** → **Lektion**) sind die letzten
zwei Schritte NICHT token-frei:
- **Sprechen** ruft `/api/gespraech` → OpenAI **erfindet** den Verlauf, kostet
  Tokens, zeigt ein **„schreib was"-Textfeld** (Chaos-/Sicherheitsrisiko).
- **Lektion** ruft `/api/generate` → Tokens.
Beides muss beim GEFÜHRTEN Gespräch **0 Token + vorgeschrieben** sein.

Datenlage: `haeppchen-db.js` hat **Wortschatz + Hörverständnis**, aber **kein
Dialog-Skript** — deshalb füllt die KI die Lücke.

═══════════════════════════════════════════════════════════
LÖSUNG — drei 0-Token-Bausteine (ersetzen /api/gespraech + /api/generate im geführten Pfad)
═══════════════════════════════════════════════════════════

**A · PRODUKTIONS-DRILL** (nutzt vorhandenen `wortschatz`)
- Pro Kern-Phrase eine Reel-Karte: Cue in **Muttersprache** („Sag: einen Kaffee,
  bitte") → User sagt laut → Knopf **„Zeigen"** → Zielphrase + 🔊 + Lautschrift →
  Selbst-Einschätzung **„Konnte ich" / „Nochmal"** → weiter.
- Wie der Flip/Gym, aber PRODUKTION (Mutter → Ziel). **Kein Textfeld, keine KI.**
- „Nochmal" hängt die Karte hinten wieder an (leichter Spaced-Effekt, lokal).

**B · SKRIPT-ROLLENSPIEL** (neue Daten: `szenen-dialog.js`)
- Spikiu spielt die Rolle (feste Zeilen, Ziel + Übersetzung). Der User **wählt**
  seine Antwort aus 2–3 Optionen (Multiple Choice). Richtig → nächste Zeile;
  falsch → sanftes Orange + richtige Option markiert, dann weiter.
- Reihenfolge fest pro Szene. **Kein Textfeld, keine KI, 0 Token.**

**LEKTION · STATISCH** (aus `wortschatz` + den geübten Items)
- Feste 3-Teile-Karte (Grammatik-Häppchen / Bedeutung / Aussprache) + kurzes
  Multiple-Choice-Quiz aus den Wörtern der Szene. Alles aus der DB, **kein
  `/api/generate`**. Als Reel-Slide (kk-*), wie heute — nur Quelle statisch.
- „Lektion speichern" schreibt wie gehabt nach `spikiu_user.lessons` (lokal).

Reihenfolge im geführten Fluss: **Wörter → Hören → A (Drill) → B (Rollenspiel) → Lektion (statisch)**.

═══════════════════════════════════════════════════════════
DATEN — `szenen-dialog.js` (neu, wie haeppchen-db: pro Thema × Zielsprache)
═══════════════════════════════════════════════════════════
```
window.spikiuSzenenDialog(themaId, zielsprache) → {
  rolle: 'Kellner'|'Rezeption'|...,               // wen Spikiu spielt (Muttersprache)
  schritte: [ { spikiu:{ziel, trans}, tip?, opts:[{text, ok:true|false}] }, ... ]
} | null
```
Start: `cafe · restaurant · hotel · taxi` × `es` (wie haeppchen-db). Andere
Zielsprachen später. Español neutro, A1-Niveau.

═══════════════════════════════════════════════════════════
BAU-ETAPPEN (chirurgisch, getestet, live Premium schonen)
═══════════════════════════════════════════════════════════
- **3a:** A (Drill) + statische Lektion — nutzt vorhandene Daten, sofort baubar.
  `/api/gespraech`-Rollenspiel + `/api/generate` im geführten Pfad entfernen.
- **3b:** B (Skript-Rollenspiel) + `szenen-dialog.js` einbinden — zwischen A und Lektion.

═══════════════════════════════════════════════════════════
ABNAHME-KRITERIEN
═══════════════════════════════════════════════════════════
- [ ] Geführter Fluss ruft **kein `/api/*`** mehr (Wörter/Hören/A/B/Lektion alle statisch).
- [ ] **Kein „schreib was"-Textfeld** im geführten Sprechen.
- [ ] A: Cue → Zeigen → Selbst-Einschätzung; „Nochmal" wiederholt die Karte.
- [ ] B: MC-Antworten, richtig=grün / falsch=orange, fester Dialog-Verlauf.
- [ ] Lektion statisch (3-Teile + MC-Quiz aus dem Wortschatz), speicherbar.
- [ ] Freies Gespräch (Premium, `/api/gespraech`) bleibt als eigener Pfad unberührt.
- [ ] Alles groß/lesbar (zentrale fitSlide-Regel), Text schwarz, grün/orange-Feedback.

═══════════════════════════════════════════════════════════
EISERNE REGELN
═══════════════════════════════════════════════════════════
- Geführtes = 0 Token. `/api/*` nur im Freien Gespräch (Premium).
- Kein Textfeld, keine erfundenen Inhalte im Geführten.
- Español neutro · Hochdeutsch · US-Englisch. „Lernroman", Mascot „Spikiu".
