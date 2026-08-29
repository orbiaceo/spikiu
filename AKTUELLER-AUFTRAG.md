# AKTUELLER AUFTRAG — HAIKU-MARKER-TEST

Stand: 29.08.2026 · Erteilt von claude.ai · Für Claude Code (Terminal)

**Ein Auftrag, ein Durchlauf, kein Rückfragen-Ping-Pong.** Leonardo ist unterwegs
und startet dich mit `--dangerously-skip-permissions`. Arbeite durch, melde am
Ende **eine Tabelle**. Mehr nicht.

---

## Warum

Alle vier Endpoints laufen heute auf `claude-sonnet-4-5`. Die Szene ist
inzwischen eine strukturierte Aufgabe (zwei Rollen, max. drei Sätze, 40 Wörter,
eine verankerte Aufgabe, sechs Züge). Sonnet ist dafür zu teuer: ~0,043 USD je
Szene gegen ~0,014 auf Haiku. Beim geplanten Abo von 3,50 USD ist das der
Unterschied zwischen 25 und 70 Szenen im Monat.

**Die einzige offene Frage:** setzt Haiku 4.5 unsere Struktur-Signale zuverlässig?

---

## Die Abnahme-Schwelle (von Leonardo entschieden, nicht verhandelbar)

| Signal | Läufe | bestanden ab |
|---|---|---|
| `[[Übersetzung]]` (Brücke) | 20 | **95 %** (19/20) |
| `[SZENENENDE]` | 20 | **95 %** (19/20) |
| `[KARTE:…]` | 20 | **95 %** (19/20) |
| valides JSON bei `generate-lesson` | 20 | **100 %** (20/20) |

Warum das JSON härter ist: kaputtes JSON bricht die Lektionserzeugung sichtbar.
Ein verpasster Marker bricht nichts — der Szenenablauf wird deterministisch
(R3/R7), er braucht `[SZENENENDE]` nicht zwingend.

---

## Schritt 1 — Modell umstellen

Vier Dateien, je EINE Zeile. Sonst nichts anfassen.

| Datei | Zeile | von | nach |
|---|---|---|---|
| `api/gespraech.js` | 161 | `model: 'claude-sonnet-4-5',` | `model: 'claude-haiku-4-5',` |
| `api/generate-lesson.js` | 145 | dito | dito |
| `api/lektor.js` | 167 | dito | dito |
| `api/taller.js` | 217 | dito | dito |

`max_tokens`, `cache_control`, Prompt-Logik, alles andere: **unberührt.**

Danach committen und pushen:

```
git add api/gespraech.js api/generate-lesson.js api/lektor.js api/taller.js
git commit -m "Haiku 4.5 in allen vier Endpoints (Marker-Test)"
git pull --rebase origin dev
git push origin dev
```

Dann **90 Sekunden warten** (Vercel-Deploy), danach mit einem einzelnen
Probeaufruf gegen `https://spikiu-git-dev-orbiaceos-projects.vercel.app`
prüfen, dass die neue Fassung live ist. Erst dann Schritt 2.

---

## Schritt 2 — Der Test

Schreib dir ein Wegwerf-Skript (`/tmp`, **nicht ins Repo**), das die vier
Blöcke gegen die dev-Endpoints fährt. Kein API-Schlüssel nötig, er liegt bei
Vercel. Basis-URL:

```
https://spikiu-git-dev-orbiaceos-projects.vercel.app
```

Profil für alle Läufe (Spanisch-Lerner, Anfänger, deutsche Muttersprache):

```json
{ "name": "Test", "zielsprache": "es", "muttersprache": "de",
  "koennen": "anfang", "etappe": "samen", "fremde_schrift": false }
```

### Block A — `[[Übersetzung]]` (20 Läufe)

Ein normaler Szenenzug. `messages` mit einer Lerner-Nachricht, die ein
Café-Rollenspiel eröffnet. **Treffer:** die Antwort enthält `[[` und `]]`.
Variiere die Lerner-Zeile über die 20 Läufe (Bestellung, Frage, Begrüßung),
damit du nicht zwanzigmal dieselbe Cache-Antwort misst.

### Block B — `[SZENENENDE]` (20 Läufe)

`messages` mit einem bereits gelaufenen Verlauf: drei Lerner-Züge, drei
Spikiu-Antworten, letzte Lerner-Zeile ist ein Abschied (`"Gracias, adiós"` und
Varianten). **Treffer:** die Antwort enthält `[SZENENENDE]`.

### Block C — `[KARTE:…]` (20 Läufe)

Mitten in der Szene eine **Meta-Frage** auf Deutsch: `"Was heißt 'la cuenta'?"`,
`"Wie sagt man 'ich möchte zahlen'?"`, `"Erklär mir den Satz"` usw.
**Treffer:** die Antwort enthält `[KARTE:`.

**Zusatzmessung, wichtig:** Fahre in diesem Block zusätzlich **10 Läufe mit
ROLLEN-Fragen** (`"¿Cómo?"`, `"No entiendo"`, `"Wie bitte?"`). Diese dürfen
**KEINE** Karte auslösen — die Figur soll sich einfacher wiederholen. Zähle die
Fehlauslösungen getrennt. Das ist der im Ledger vermerkte Erkennungstest
Meta-vs-Rolle; er läuft hier gratis mit.

### Block D — `generate-lesson` JSON (20 Läufe)

Fester `conversationHistory` (ein kurzes Café-Gespräch, 6 Züge), dazu
`name`/`nativeLang`/`profile` wie oben. **Treffer:** die Antwort enthält ein
`lesson`-Objekt, das sich mit `JSON.parse` sauber lesen lässt und die Felder
`title`, `vocabulary`, `quiz` trägt.

---

## Schritt 3 — Melden, NICHT entscheiden

Gib genau diese Tabelle aus:

```
[[…]]           x/20
[SZENENENDE]    x/20
[KARTE:…]       x/20
Rollen-Fragen   x/10 fälschlich als Karte erkannt
lesson-JSON     x/20
Gesamtkosten des Tests laut Anthropic-Konsole: … USD
```

Dazu bei jedem Fehlschlag **die rohe Modellantwort** (gekürzt auf 200 Zeichen),
damit sichtbar wird, ob der Marker fehlte oder nur anders geschrieben war.

**Du entscheidest nichts.** Kein Rückbau auf Sonnet, keine Prompt-Änderung,
kein „ich habe es gleich mit repariert". Wenn ein Block durchfällt, bleibt er
so und wird gemeldet.

**Du fasst das Ledger nicht an.** `SPIKIU-BUILD-LEDGER.md` schreibt claude.ai.
Das gilt auch für `AKTUELLER-AUFTRAG.md` — nicht schließen, nicht überschreiben.

---

## Was du NICHT anfasst

`chat.html` · `gefuehrt.html` · `spikiu-seele.md` · `gespraech-modus.md` ·
`lektor-modus.md` · `szene-regeln.md` · `lernpfad-daten.js` · `karten-engine.js` ·
alle Prompts · alle Frontend-Dateien · das Ledger · diesen Auftrag.

Am Ende muss `git status` sauber sein und außer den vier Modellzeilen darf
kein Diff existieren. Test-Skripte gehören nach `/tmp` und werden gelöscht.

---

## Der Satz, mit dem Leonardo dich startet

> Lies AKTUELLER-AUFTRAG.md und arbeite ihn komplett durch. Frag mich nichts,
> melde am Ende nur die Tabelle.
