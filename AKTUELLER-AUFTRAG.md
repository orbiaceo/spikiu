# AUFTRAG — erledigt am 24.06.2026 · kein offener Auftrag

> ERLEDIGT (Claude Code, 24.06.2026): „Wörter-Häppchen: Flip-Karten (Vorderseite Zielsprache+🔊,
> Rückseite Übersetzung)" (Teil 60). GEBAUT + auf dev. EINE Datei: `chat.html` — 4 chirurgische Edits:
> (1) CSS `.hap-flip`/`.hap-flip-inner`/`.hap-face` (front+back, 3D-Flip)/`.hap-tlabel`/`.hap-back-trans`/
> `.hap-fliphint`; (2) `renderWortschatz` reelActive-Zweig baut pro Wort eine Flip-Karte statt
> `.hap-card-solo` — vorne Zielsprache + 🔊 (+ Lautschrift) + Hinweis „tippen zum Umdrehen", hinten Label
> „Übersetzung/Traducción/Translation" + Übersetzung groß + 🔊; Click-Listener auf `.hap-flip`: 🔊
> (`e.target.closest('.hap-play')`) spielt via `playFrom` und dreht NICHT, sonst `.flipped` togglen;
> (3) `reelLayout()` entfernt `.flipped` von nicht-aktuellen Karten → neu erreichte Karte zeigt die
> Vorderseite; (4) i18n `HAP_UI` um `flip` + `transLabel` (de/es/en) ergänzt. Start bei der ersten
> Karte, Wischen ←/→ wie Teil 59. node --check auf beide Inline-Scripts grün. NICHT angefasst:
> Hören/Sprechen-Reel/Engine/api/Chat-Fallback-Liste/andere Dateien.
>
> HINWEIS (Diagnose-Disziplin): headless-Render hier nicht ausführbar — die Umgebung lehnt den
> Chrome-/Server-Start ab. Bitte im echten Browser auf dev gegenprüfen (= Live-Umgebung):
> geführtes Thema → Wörter: Karte vorne Ziel+🔊+Lautschrift; Tipp dreht → Rückseite Übersetzung;
> Tipp auf 🔊 dreht NICHT; Wischen ←/→, neu erreichte Karte zeigt Vorderseite.

## DANACH (offen, aus dem Auftrag)
- (offen) „3 → 4 capítulos"-Fix · Beta-Politur · Legal-Sequenz (zuletzt).
