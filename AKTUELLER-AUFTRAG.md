# AUFTRAG — Token-Paket A: gespraech-Gleit-Fenster + Sprechen-Cap

Status: **OFFEN** · aufgesetzt am 27.06.2026 · 1 Arbeitspaket (kein Stapeln)

---

## ZIEL (warum)
`/api/gespraech` schickt heute bei JEDEM Zug die **ganze wachsende History** an
Anthropic. Je länger ein Gespräch, desto teurer jeder weitere Zug (Tokens wachsen
linear mit). Token-Paket A deckelt das auf zwei Wegen, ohne das Erlebnis zu ändern:

1. **Gleit-Fenster:** ausgehend nur noch **Seed + die letzten ~10–12 Nachrichten**,
   statt des kompletten Verlaufs.
2. **Sprechen-Cap:** das geführte Rollenspiel (Stage „sprechen") läuft nicht endlos,
   sondern kommt nach **~6–8 Spikiu-Zügen** zu einem **sanften Abschluss** (gentle close),
   statt Tokens zu verbrennen, bis der Lerner von selbst aufhört.

**Das freie Tippen bleibt unangetastet** — das Schreibfeld („Schreib etwas…") und der
freie Flur (ohne Thema) behalten ihr heutiges Verhalten. Der Cap gilt NUR dem
**geführten** Rollenspiel.

---

## DATEN-VERTRAG (eisern — nicht brechen)
- `verlauf` (in `chat.html`) bleibt **vollständig**: er treibt Anzeige UND
  `sitzung.js`-Persistenz (Teil 62). Es wird **nur die AUSGEHENDE** Nachrichtenliste
  in `callGespraech()` gefenstert — `verlauf` selbst NIE kürzen.
- `/api/gespraech.js`-Vertrag bleibt: `{ messages, profile, maxTokens }` rein,
  `{ text }` raus. Erste ausgehende Nachricht MUSS Rolle `user` haben (sonst prependet
  das Backend `[EINSTIEG]` → unerwünschter Zweit-Gruß).
- `alternate()` (nie zwei gleiche Rollen hintereinander) bleibt der letzte Schritt
  vor dem Senden — das Fenster wird VOR `alternate()` gebildet.
- Modell/Backend-Stil unberührt: `claude-sonnet-4-5`, `export default`,
  `process.cwd()`, kein `import.meta`.

---

## TEIL 1 — Gleit-Fenster (Frontend, `chat.html` · `callGespraech`)
- Vor dem `alternate()`-Schritt ein Fenster bilden: **die letzten `WINDOW` Nachrichten**
  (Vorschlag `WINDOW = 12`) PLUS — falls vorhanden — den **Seed** (`verlauf[0]`, wenn
  Rolle `user`), damit das geführte Thema nie aus dem Kontext fällt.
- Liegt der Seed ohnehin schon im Schwanz, NICHT doppeln.
- Ausgehende Liste muss user-first bleiben (geführt: Seed ist user → ok). Im freien
  Flur (`verlauf[0]` = Assistant-Gruß) wird der Seed NICHT vorangestellt; das Backend-
  `[EINSTIEG]`-Prepend greift nur bei leerer History und ist hier kein Thema, weil der
  Schwanz nie leer ist — trotzdem prüfen, dass kein Doppel-Gruß entsteht.
- `verlauf`, `sitzungSpeichern()`, Retry-Pfad (User-Zug steht schon im `verlauf`)
  bleiben unverändert.

## TEIL 2 — Sprechen-Cap (geführtes Rollenspiel → gentle close)
- Nur wenn eine **geführte** Sitzung läuft (Stage `sprechen`, Thema gewählt) und der
  Lerner NICHT frei plaudert.
- Zähle die Spikiu-Züge seit dem Seed. Ab Schwelle (`CAP`, Vorschlag 6–8) **steuert die
  Oberfläche das Modell sanft zum Abschluss**, sodass es seinen natürlichen
  `[SZENENENDE]`-Block selbst setzt (knapper Abschied + Korrektur-Karte + Menü, wie in
  `gespraech-modus.md` § „SZENENENDE" beschrieben) — KEIN harter Frontend-Cut, KEIN
  Vortrag, kein Zähler/Score sichtbar.
- **FRAGE AN DESIGN (vor dem Bau klären):** Wie genau soll der Anstoß aussehen?
  Zwei plausible Wege —
  (a) ein versteckter Steuer-Hinweis, der NUR der ausgehenden letzten User-Nachricht
      angehängt wird (nicht in `verlauf` gespeichert), z. B.
      `[HINWEIS: Die Szene darf jetzt sanft zum Abschluss kommen.]`, worauf das Modell
      regulär `[SZENENENDE]` setzt — Backend bleibt unberührt; ODER
  (b) ein neues optionales Feld an `/api/gespraech` (z. B. `abschlussNah:true`), das im
      Laufzeit-Profil einen Schließ-Hinweis ergänzt — sauberer getrennt, aber ändert
      Backend + `gespraech-modus.md`.
  Default-Vorschlag, falls keine Antwort: **(a)** (kleinster Eingriff, Daten-Vertrag
  unberührt). Erst bauen, wenn der Weg bestätigt ist.
- „Schreib etwas…" / freies Tippen BLEIBT immer möglich.

---

## ABNAHME-KRITERIEN (Definition von „fertig")
1. **Gleit-Fenster greift:** Bei langem Gespräch (>WINDOW Nachrichten) enthält der
   ausgehende `messages`-Body nur noch Seed + letzte ~WINDOW — headless nachweisbar
   (ausgehenden Body am gestubbten `/api/gespraech` zählen/inspizieren, wie Teil 64).
2. **Geführtes Thema bleibt im Kontext:** Der Seed-Zug ist im gefensterten Body immer
   vorhanden, auch nach vielen Zügen.
3. **Sprechen-Cap:** Geführtes Rollenspiel mündet nach ~CAP Spikiu-Zügen in einen
   `[SZENENENDE]`-Abschluss (Menü erscheint), nicht in endloses Weiterreden.
4. **Freier Flur unberührt:** Ohne Thema kein Cap, kein Fenster-Bruch des Erlebnisses;
   „Schreib etwas…" funktioniert durchgehend.
5. **Persistenz unberührt:** `verlauf` bleibt vollständig; Wiederkommen-Karte (Teil 62)
   stellt das Gespräch korrekt wieder her.
6. `node --check` grün auf jede angefasste `.js` / jedes Inline-Script.
7. Commit + `git push origin dev`; Ledger-Bericht + Auftrag geschlossen.

---

## AUSDRÜCKLICH NICHT in diesem Auftrag (kein Scope-Drift)
- Dashboard „3 → 4 capítulos" (separater Kleinkram-Fix).
- Reader auf Englisch + Griechisch (anderes Chat, nur Notiz).
- Supabase-Persistenz (Phase 2).
