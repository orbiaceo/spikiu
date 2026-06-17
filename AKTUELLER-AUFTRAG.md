# AKTUELLER AUFTRAG — für Claude Code

_Geschrieben von Claude (claude.ai, Design) am 18.06.2026.
Mach NUR diesen Auftrag. Wenn fertig: committen, pushen, Bericht ins Ledger,
diese Datei auf „erledigt" setzen._

---

## TITEL
nav.js in `chat.html` bringen — per SLOT-MODUS (Vollhöhen-Seite, 100dvh).

## WARUM
Alle App-Seiten haben jetzt den Hamburger — nur `chat.html` nicht. chat soll ihn auch
haben, für Konsistenz. ABER chat ist eine Vollhöhen-Seite (`.app` = `display:flex;
height:100dvh`). Würde nav.js ihre EIGENE sticky Leiste oben injizieren, gäbe es zwei
Leisten bzw. das Layout rutscht aus dem Bild. Lösung: Slot-Modus — nav.js setzt
Hamburger+Logo IN die vorhandene Kopfzeile, statt eine zweite zu bauen.

## SCOPE (NUR chat.html)
1. Der vorhandenen Kopfzeile (`<header>` innerhalb von `.app`) das Attribut `data-spk-nav`
   geben. nav.js erkennt den Slot und füllt ihn mit Hamburger+Logo (KEINE zweite Leiste).
2. `<script src="nav.js" defer></script>` vor `</body>` einbinden.
3. Den alten Header-Inhalt (eigenes Logo + „← Dashboard"-Link) dem Slot überlassen —
   nav.js überschreibt den Inhalt der `[data-spk-nav]`-Kopfzeile. Dashboard steht im Drawer.
4. Der Profil-Chip (Gast · Sprache · Etappe) bleibt unverändert direkt unter der Kopfzeile.

## ABNAHME-KRITERIEN („fertig" ist messbar)
1. chat.html zeigt oben GENAU EINE Leiste: Hamburger + Spikiu-Logo. Keine zweite Leiste,
   kein „← Dashboard"-Link mehr im Header.
2. Hamburger öffnet den Drawer; „Jetzt sprechen" ist als aktiv markiert (chat → talk);
   Backdrop-Klick und Escape schließen.
3. Das 100dvh-Layout bleibt heil: Profil-Chip sichtbar, Chat-Bereich scrollt, Eingabezeile
   klebt unten — nichts rutscht aus dem Bild, kein doppelter Scrollbalken.
4. Die Charla funktioniert unverändert weiter: Spikiu grüßt beim Laden und antwortet auf
   Eingaben (nav darf den Gesprächs-Flow nicht stören).
5. UNANGETASTET: alle anderen Seiten (index, dashboard, books, sessions, learnraum,
   schreibwerkstatt, cap*).
6. Node-Syntaxcheck auf das Inline-Script von chat.html läuft sauber.

## HINWEISE
- nav.js sucht beim Mounten `document.querySelector('[data-spk-nav]')`. Ist es vorhanden →
  Slot-Modus (Host wird gefüllt). Fehlt es → Inject-Modus (eigene Leiste). Hier MUSS das
  Attribut sitzen, sonst kommt die unerwünschte zweite Leiste.
- Variable `verlauf` bleibt `verlauf` (nie `history` — window.history-Falle).
- `schreibwerkstatt.html` ist diesmal NICHT dabei (hat Test-Wähler Sprache/Können im Header
  → eigene Design-Entscheidung, eigenes Paket).
- Nach Lieferung: Leonardo lädt herunter → `cp` → `grep -c "data-spk-nav" chat.html`
  verifizieren → commit → push origin dev → `chat.html?v=N` cache-frei testen.

## ABNAHME-TEST (kurz)
`chat.html?v=N` öffnen → oben Hamburger + Logo (eine Leiste) → Hamburger tippen → Drawer
mit „Jetzt sprechen" aktiv → schließen → „Hola" tippen → Spikiu antwortet. Layout heil.

---

_Status: OFFEN_
