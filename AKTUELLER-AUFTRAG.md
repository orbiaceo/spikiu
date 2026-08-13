# AKTUELLER AUFTRAG — Geführtes Gespräch: 0-Token-Themen-Palette (Etappe 1)

_Stand: 13.08.2026 · claude.ai-Design · Leo abgenommen (Konzept)_

═══════════════════════════════════════════════════════════
NORDSTERN — die zwei Modalitäten trennen
═══════════════════════════════════════════════════════════
- **GEFÜHRTES GESPRÄCH** = 0 Token · sicher · **Gratis**. Der User wählt IMMER
  aus einer **Themen-Palette** — es gibt KEIN „Einfach plaudern" mehr.
- **FREIES GESPRÄCH** = LLM · token-gebunden · **Premium**. Kommt später.

**Warum kein „plaudern":** Sicherheit (keine Tabu-Themen, die zur Sperre führen),
kein Chaos (v. a. für User, die nicht wissen, was sie lernen sollen), 0 Token.

**Die Palette entsteht aus dem Lernweg, fortschrittsbasiert:**
**3 neue (anstehend) + 2 fällige (wiederholen).**

**Das „Gehirn" = FSRS-Scheduler (ALGORITHMUS, 0 Token) — NICHT LLM.**
Liest die Spuren des Users (localStorage → Supabase Phase 2) und rechnet
deterministisch aus, was heute fällig ist. Genau wie der Gym für Vokabeln —
dasselbe Prinzip auf Szenen/Themen. Eine LLM würde Tokens kosten → verboten fürs Geführte.

**Szenen sind vorgeschrieben (statisch, wie `haeppchen-db.js`) → 0 Token.**
(Content-Arbeit, eigenes Paket — Etappe 3.)

═══════════════════════════════════════════════════════════
ITEM-MODELL — jede Szene ist ein FSRS-Item
═══════════════════════════════════════════════════════════
Szene/Thema = Item mit: `id`, `titel`, `emoji`, `cefr` (a1..b2),
`stab` (Stabilität), `due` (fällig-am, ms), `done` (bool), `last` (ms).

Tracking in localStorage: `spikiu_user.szenen = { <id>: {stab, due, done, last} }`.
FSRS-light wie im Gym: richtig durchgespielt → Stabilität hoch, due weiter in die
Zukunft; wackelig → due bald. (Der echte Scheduler ist Etappe 2 — eigenes Paket.)

═══════════════════════════════════════════════════════════
THEMEN-GERÜST (CEFR-Standard) — Start-Set
═══════════════════════════════════════════════════════════
- **A1:** familie · wohnen · essen_trinken · einkaufen · tagesablauf · uhrzeit · wegbeschreibung
- **A2:** freizeit · reisen · arzt · arbeit · wetter · kleidung · verabredung
- **B1/B2:** bildung · medien · umwelt · meinungen · beruf · gesellschaft (später)
- **Szenen (Roleplay-Kontexte):** cafe · restaurant · hotel · taxi · arzt · einkaufen · bahnhof · wohnungssuche · termin
- Bereits statisch in `haeppchen-db.js`: **cafe · hotel · taxi · restaurant** (Start).

═══════════════════════════════════════════════════════════
DIESE AUFGABE — ETAPPE 1 (UI/Routing, sofort baubar, 0-Token-Eingang)
═══════════════════════════════════════════════════════════
1. **Kacheln trennen** (`haus.html`, Raum Abenteuer):
   - „Geführtes Gespräch" → `chat.html?modus=gefuehrt`
   - „Freies Gespräch"   → `chat.html?modus=frei`

2. **`chat.html` liest `?modus`:**
   - `gefuehrt`: KEIN „Einfach plaudern". Opener = **nur Themen-Palette**.
   - `frei`: **Premium-Sperre** — ruhige Karte „✨ Freies Gespräch ist Premium —
     bald verfügbar" + Zurück + Link zu Abonnement. KEIN offener Chat.

3. **„Einfach plaudern" aus dem geführten Opener entfernen.**

4. **Themen-Palette (Gerüst):** zeigt **3 neue + 2 fällige** aus `szenen.js`.
   Fürs Erste einfache Reihenfolge (neue zuerst, dann die 2 „ältesten geübten"
   als Platzhalter für „fällig"). Der echte FSRS-Scheduler kommt in Etappe 2.
   Jede Palette-Karte im Pop/Minz-Look (wie die Themen-Chips heute).

5. **`szenen.js` (neu):** die Start-Themen-Liste als Array `window.spikiuSzenen`
   mit `{id, titel, emoji, cefr, scene}` (scene = Roleplay-Kontext, mappt später
   auf die vorgeschriebene Szene). Erweiterbar. Eigennamen-frei.

═══════════════════════════════════════════════════════════
ABNAHME-KRITERIEN
═══════════════════════════════════════════════════════════
- [ ] Abenteuer-Kachel „Geführtes" → `chat.html?modus=gefuehrt` → Opener zeigt
      NUR Themen (kein „Einfach plaudern").
- [ ] „Freies" → `chat.html?modus=frei` → Premium-Sperre, kein offener Chat.
- [ ] Palette zeigt Themen aus `szenen.js` (3 neu + 2 fällig, Platzhalter-Logik).
- [ ] **0 Token im geführten Opener:** keine `/api/*`-Aufrufe beim Öffnen/Wählen.
- [ ] Der bestehende Fluss (Wörter → Hören → Sprechen → Lektion) bleibt nach der
      Themenwahl erreichbar (dessen Token-Freiheit macht Etappe 3).

═══════════════════════════════════════════════════════════
NICHT IN DIESER ETAPPE (Roadmap)
═══════════════════════════════════════════════════════════
- **Etappe 2:** FSRS-Scheduler für Szenen (client-seitig, wie Gym) — echte
  „3 neu + 2 fällig"-Logik aus Stabilität/Fälligkeit.
- **Etappe 3:** Szenen vorschreiben (0-Token-Content: Wörter → Hören →
  Skript-Rollenspiel → statische Lektion, ohne `/api`).
- **Etappe 4 (Premium):** Freies Gespräch (LLM, token-gebunden) freischalten.

═══════════════════════════════════════════════════════════
EISERNE REGELN
═══════════════════════════════════════════════════════════
- Geführtes Gespräch = **0 Token**. Kein `/api/*` im Gratis-Pfad.
- Scheduling = **FSRS-Algorithmus**, nie LLM.
- Pop/Minz-Look + kantige DM-Sans-Typo (Chrome) wie das Haus; Lese-Inhalt Serifen.
- Mascot immer „Spikiu". „Lernroman", nicht „Learnroman".
- Alte `nav.js` unangetastet lassen, wo nicht nötig.
