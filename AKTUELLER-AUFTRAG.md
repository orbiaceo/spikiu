# AKTUELLER AUFTRAG — Karten-Engine + gefuehrt.html (ERLEDIGT via claude.ai)

_Stand: 14.08.2026 · Leo-Entscheid: Inhalt (A) und Layout strikt trennen._

═══════════════════════════════════════════════════════════
WAS GEBAUT WURDE
═══════════════════════════════════════════════════════════
1. **karten-engine.js (NEU, Root)** — DIE eine Layout-Engine.
   - Item-Typen: `flip` · `choice` · `roleplay` · `lesson` · `note`.
   - Regeln (gelten für JEDE Karte): Design-Größe = Obergrenze (nie vergrößern,
     nur bei Überlauf schrumpfen, Bisektion min 0.45) · Hierarchie: Zielsprache =
     Star (Lora, groß), Muttersprache-Anweisung = Chrome (DM Sans, bescheiden) ·
     Chrome (Audio 56px, Eyebrow, Fußzeile) skaliert NIE · Fußzeile fest, nie
     abgeschnitten · richtig=grün, falsch=Orange, nie Rot/Pink.
   - API: `SpikiuKarten.setup({stage, zielsprache, sprich?})`,
     `.render(item, next)`, `.sequence(items, done)`.

2. **gefuehrt.html (NEU, Root)** — Geführtes Gespräch als eigene 0-Token-Seite.
   - Fluss: Palette (3 neu + 2 fällig, gefiltert auf DB-Themen) → Wörter
     (Erkennungs-Flips) → Hören (minimalpaar/woerter) → Sprechen-Drill
     (Produktion) → Skript-Rollenspiel → statische Lektion → Abschluss.
   - Daten: haeppchen-db.js + szenen.js + szenen-dialog.js. Audio: audio.js
     (`speak` als `window.sprich`). Lektion → `spikiu_user.lessons` (rolling 14),
     Szene → `spikiu_user.szenen` (FSRS-Basis). KEIN `/api/*`.
   - Die Seite enthält NUR Ablauf + Texte — NULL Karten-Layout.

3. **haus.html** — Kachel „Geführtes Gespräch" → `gefuehrt.html`.
   „Freies Gespräch" bleibt `chat.html?modus=frei` (Premium-Sperre dort).

4. **Minz statt Beige** — gym/taller/proverbios/lektionen/learnroman/
   schreibwerkstatt: `--bg` auf `#eef7f1` (bereits geliefert/gepusht).

═══════════════════════════════════════════════════════════
DER VERTRAG (Leos Kernforderung)
═══════════════════════════════════════════════════════════
**Neuer Inhalt darf NIE Layout-Arbeit bedeuten.**
- Neues Thema = Einträge in `haeppchen-db.js` (+ optional `szenen-dialog.js`,
  `szenen.js`). Reine Daten. Die Engine rendert sie garantiert korrekt.
- Layout-Wünsche = Änderungen NUR in `karten-engine.js`. Wirken überall.
- chat.html bleibt vorerst unangetastet (Premium/Frei, LLM-Pfad). Sein
  geführter Alt-Pfad ist tot, sobald die Haus-Kachel auf gefuehrt.html zeigt.

═══════════════════════════════════════════════════════════
OFFEN (nächste Pakete)
═══════════════════════════════════════════════════════════
- Etappe 2: FSRS-Scheduler für Szenen (echte 3-neu+2-fällig-Logik).
- Sitzungs-Persistenz für gefuehrt.html (sitzung.js, „Weiter wo du warst?").
- Weitere Räume schrittweise auf die Engine heben (Gym, Taller) — NUR wenn
  gewünscht; Verhalten dort ist abgenommen.
- chat.html: alten geführten Code später ausbauen (Aufräum-Paket).
- dashboard.html (Lernweg) Look-Angleichung.
