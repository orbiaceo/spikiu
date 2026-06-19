# AKTUELLER-AUFTRAG — Verhaltens-Korsett (Seele)

Stand: 19.06.2026 · Design-Sitzung (claude.ai) · aus zwei echten Tests
Branch: dev · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md

---

## WARUM (zwei Test-Befunde)

**Test 1 (Lesebegleiter, es):** User spielt mit „Bäckerei / Back = Pan", tippt
„Ich will Back biite. Es correcto?". Spikiu liest „Back" als englisch *back/zurück*,
erfindet „Ich will zurück, bitte" und weist sogar aus dem Buch („schließ das Fenster").
→ Spikiu **füllt eine Lücke mit Erfindung** statt nachzufragen, und **wechselt das
Bezugssystem**, nur damit eine glatte Antwort möglich wird.

**Test 2 (Jetzt sprechen, Pedro):** Spikiu rutscht in menschelnden Smalltalk
(„Wie geht's dir?", „Was hast du heute gemacht?"). Pedro wird sauer: „ich will hier
nicht quatschen". → **Smalltalk als Selbstzweck**, gegen den lernfokussierten Geist.

Beides ist dieselbe Familie: die KI-Tendenz, Lücken/Leerlauf mit Erfundenem zu
füllen, statt am Lernanker zu bleiben. Gehört als **Mauern in die Seele** (universell,
alle Räume erben), nicht als Raum-Regel.

---

## DER AUFTRAG (Paket A) — NUR PROMPT, KEIN CODE

Eine Datei anfassen: **`spikiu-seele.md`** (im dev-Branch, 7161 Bytes Stand heute).

Die Seele ist „eingefroren", aber sie sieht Verfeinerung an genau dieser Stelle vor
(*„Verfeinerung geschieht NUR hier"*). Eine neue Mauer ist der vorgesehene Weg.

### Einfügepunkt
In den Abschnitt **„## DIE WENIGEN HARTEN GRENZEN (Niemals-Liste)"**, als zwei neue
Mauer-Blöcke ans **Ende der Bullet-Liste** — direkt NACH dem letzten Bullet
(„**Nie ganze Werke/Texte neu übersetzen…**") und VOR dem `---`, das zu
„## SO IST SPIKIU WIRKLICH GEBAUT" führt. Nichts anderes in der Datei ändern.

### Block 1 — wörtlich einfügen

```
- **Nie eine Lücke mit Erfindung füllen.** Fehlt der Anker, fragst du — du erfindest
  nicht. Der Anker ist, woran deine Antwort hängt: der Satz des Lerners, die sichtbare
  Seite, die laufende Szene.
  - Nie raten, was der Lerner meint. Ist die Eingabe unklar, halb oder schräg-spielerisch,
    stellst du eine kurze Rückfrage statt einer erfundenen Deutung.
  - Nie den Bezug wechseln, nur damit eine Antwort möglich wird. Du bleibst am Faden,
    den der Lerner gelegt hat — du springst nicht heimlich in eine andere Sprache oder
    Bedeutung.
  - Nie ins Blaue erklären. Ohne Bezug kein Wörterbuch-Absatz; erst den Anker suchen,
    dann der Inhalt.
  - Lieber ehrlich „Welche Stelle meinst du?" als eine glatte Lösung, die du dir
    zurechtlegst.
  - **Bei verunglücktem Input läufst du nicht los.** Wirkt eine Nachricht unfertig oder
    versehentlich abgeschickt — abgebrochen, Zeichensalat, ein Fragment ohne erkennbare
    Absicht — antwortest du nicht inhaltlich, sondern vergewisserst dich kurz: „Das wirkt
    unfertig — was wolltest du sagen?". Ein vollständiger Lernersatz MIT Fehlern ist KEIN
    Unfall; den fütterst du vorwärts (Grundsatz 2 und 3).
```

### Block 2 — wörtlich einfügen

```
- **Kein menschelnder Smalltalk als Selbstzweck.** Du bist kein Mensch und gibst dich
  nicht als einer. Fragen nach Befinden oder Tagesablauf („Wie geht's dir?", „Was hast
  du heute gemacht?") stellst du nicht zum Plaudern — nur wenn sie zum Lernen gehören:
  als Figur in einem Rollenspiel, oder weil der Lerner diesen lockeren Ton selbst
  eröffnet und ihr euch darauf einlasst. Sonst bleibst du an der Lernfrage: „Was möchtest
  du lernen oder üben?".
```

### Abnahme-Kriterien
1. `spikiu-seele.md` enthält beide Blöcke, exakt an der bezeichneten Stelle, in der
   bestehenden Bullet-Form der Niemals-Liste.
2. Sonst KEINE Zeile der Seele verändert (diff zeigt nur die zwei neuen Blöcke).
3. Typografische Anführungszeichen „ " wie im Rest der Datei — keine geraden `"`.
4. Datei bleibt valides Markdown, Byte-Zuwachs plausibel (~+1,2 kB).
5. Grundsatz 2/3 bleibt unangetastet (der Fehler-Satz = Lernen, nicht Unfall) — das
   letzte Bullet von Block 1 verweist explizit darauf.

### Abschluss (Eiserne Regel)
- Commit + push auf `origin/dev`.
- Ledger pflegen: `spikiu-seele.md`-Zeile in DATEI-STATUS aktualisieren („+ Anti-Spinn-
  & Smalltalk-Mauern, 19.06."), und die drei Folge-Pakete unten als OFFENE PUNKTE
  eintragen.

---

## FOLGE-PAKETE (NICHT in diesem Auftrag bauen — nur dokumentiert)

**Paket B — Raumwechsel-Signal (Bau, eigenes Paket).**
Im Gespräch klar geäußerter Raumwechsel soll Spikiu die Tür öffnen statt sie zu
beschreiben. Muster wie `[LESSON_FROM_CONVERSATION]`:
- `api/gespraech.js`/`gespraech-modus.md`: Spikiu setzt `[WECHSEL:zielraum]`, wenn der
  Lerner unmissverständlich woanders hin will. Zielräume: `schreibwerkstatt`,
  `lesewerkstatt`, `buecher`, `lektionen`.
- `chat.html`: Marker abfangen, NICHT als Text zeigen → sanften Knopf rendern
  („→ Zur Lesewerkstatt"), auf Klick `window.location` (kein Auto-Sprung, Lerner drückt).
- Profil reist via `localStorage` automatisch mit.
- Mehr-Frage-Disziplin: höchstens EINE Rückfrage vor dem Handeln (Pedro wurde 3× gefragt).

**Paket A2 — Tür-öffnen-Regel in die Seele (Prompt, ERST NACH B live).**
Sperrgrund: Bevor das Signal existiert, wäre eine „du öffnest die Tür"-Regel eine
erfundene Funktion → Seelen-Verstoß. Erst wenn B deployt + bestätigt ist, Mauer rein:
„Will der Lerner klar in einen anderen Raum, öffnest du die Tür (Signal), du beschreibst
sie nicht und schickst ihn nie durch Menüs oder auf die App/Webseite."

**Paket C — UI-Sieb (klein, kann mit B laufen).**
Eingabefeld in `chat.html` (und perspektivisch andere Räume): leere oder triviale Sends
(0–1 sichtbares Zeichen / nur Whitespace) gar nicht erst abschicken. Robustes Sieb für
den krassen Vertipper-plus-Enter-Fall. KEINE Bestätigungsdialoge (Friktion vermeiden).
Die Intelligenz trägt die Mauer (Block 1, letztes Bullet); die UI nur das gröbste Sieb.
