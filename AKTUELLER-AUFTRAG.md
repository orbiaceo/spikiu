# AKTUELLER AUFTRAG — TOKEN-ÖKONOMIE: KOSTPROBE STATT GRATIS-ABGRUND

Design-Sitzung 16.08.2026 (claude.ai). Basis-Stand: 15.08.2026 (Karten-Engine + gefuehrt.html).
Alle Befunde unten stammen aus frisch per `curl` gezogenen dev-Dateien, nicht aus Erinnerung.

---

## WARUM (Leos Entscheid, wörtlich sinngemäß)

„Angenommen ich bekomme 10.000 Gratis-User und kein einziger schließt ein Abo —
dann bin ich ruiniert."

Das Abo kostet **3,50 €/Monat**. Ein Gratis-Nutzer darf deshalb **höchstens 0,05 USD**
an Token kosten — einmalig, nicht pro Monat.

Zwei Zahlen als Rahmen (gerechnet, nicht geschätzt):

| | Kosten | bei 10.000 Nutzern |
|---|---|---|
| Gratis-Nutzer (Kostprobe, neu) | **0,044 USD** | 440 USD |
| Premium-Nutzer (voll, pro Monat) | 0,66 USD | — |
| Marge je Abo | 2,89 € von 3,50 € | **83 %** |

---

## DIE ARCHITEKTUR-ENTSCHEIDUNG (die eigentliche Lösung)

Der Kern ist nicht Sparen, sondern eine **saubere Trennlinie**:

**GRATIS = NULL TOKEN, unbegrenzt.** Geführtes Gespräch (`gefuehrt.html`), Gym,
Sprichwörter, Lernweg, Lernroman. Alles aus statischen Dateien (`haeppchen-db.js`,
`szenen.js`, `szenen-dialog.js`, `learnroman-daten.js`, `wortschatz.js`, `sprichwort.js`).
Kein `/api/*`-Call. Das ist bereits gebaut und verifiziert (Ledger 15.08.).
**Hier ändert dieser Auftrag NICHTS.**

**PREMIUM = TOKEN.** Freies Gespräch, Lesewerkstatt, Schreibwerkstatt, Lektionserzeugung.

**KOSTPROBE = einmalig, winzig, dann Paywall.** Der Gratis-Nutzer darf jede
Premium-Tätigkeit genau einmal anfassen — gerade lange genug, um den Unterschied
zu spüren.

---

## MODELL-ZUORDNUNG (neu)

| Endpoint | Modell | Begründung |
|---|---|---|
| `api/gespraech.js` (freier Flur) | **Sonnet** | echter Gesprächspartner, braucht Flexibilität und Einfühlung |
| `api/lektor.js` (Schreibwerkstatt) | **Haiku** | editorielle Korrektur nach Schema, Nutzer selten über B1/B2 |
| `api/taller.js` (Lesewerkstatt) | **Haiku** | evaluativ, strukturiert |
| `api/generate-lesson.js` | **Haiku** | festes JSON-Schema, reine Datenverarbeitung |

Modellstring Haiku: `claude-haiku-4-5`.
Das freie Gespräch bleibt bei `claude-sonnet-4-5` — auch in der Kostprobe.
Es ist das, was verkauft.

---

## BEFUND AUS DEM ECHTEN CODE (vor dem Bauen lesen)

**`api/gespraech.js` Z.100–103:**
```js
const system =
  docs.seele + '\n\n' +
  docs.raum + '\n\n' +
  laufzeitProfil(p);
```

**`api/lektor.js` Z.148–152:** gleiches Muster, plus `vertragsAnweisung(...)` am Ende.

**`api/taller.js` Z.192 und Z.201:** zwei Zweige (Phase 1 / Phase 2), beide beginnen mit
`docs.seele + '\n\n' + docs.taller + '\n\n'` — gemeinsamer stabiler Präfix.

→ In allen drei Fällen steht das **Stabile vorn**, das **Variable hinten**.
Der Cache-Schnitt liegt exakt an dieser Naht. Kein Umbau der Prompt-Logik nötig.

**`api/generate-lesson.js` Z.36ff:** Systemprompt ist ein Template-String mit `${name}`,
`${today}` und dem **ganzen Gesprächsverlauf** mitten drin (Z.33).
→ **NICHT cachebar.** Dort nur Modellwechsel, sonst nichts anfassen.

**Größen (frisch gemessen):** `spikiu-seele.md` 9,6 KB · `gespraech-modus.md` 18,1 KB ·
`lektor-modus.md` 5,9 KB. Der Gesprächs-Raumprompt ist **dreimal so dick wie die Seele**.

---

## PAKET 0 — NICHT von Claude Code (Design-Arbeit, geht voraus)

`gespraech-modus.md` von 18,1 KB auf ~6 KB kürzen.
Reine Textarbeit an einem Prompt, der Spikius Stimme trägt — das gehört an den
Design-Tisch, nicht in den Bau. **Claude Code fasst diese Datei nicht an.**

Ohne diesen Schritt wirken die Zahlen unten nur zur Hälfte.

---

## PAKET 1 — PROMPT-CACHING (drei Dateien)

**Ziel:** Der stabile Präfix (Seele + Raum-Prompt) wird einmal geschrieben und
danach zu einem Zehntel gelesen.

**Umsetzung, Muster für alle drei:** `system` wird vom String zum Array aus zwei
Blöcken. Block 1 = stabil, mit `cache_control`. Block 2 = Laufzeit-Profil, ohne.

```js
const system = [
  { type: 'text',
    text: docs.seele + '\n\n' + docs.raum,
    cache_control: { type: 'ephemeral' } },
  { type: 'text',
    text: laufzeitProfil(p) }
];
```

Der Aufruf-Body bleibt sonst unverändert (`system` heißt weiter `system`).

**Datei für Datei:**

- **`api/gespraech.js`** — Block 1: `docs.seele + '\n\n' + docs.raum`.
  Block 2: `laufzeitProfil(p)`.
- **`api/lektor.js`** — Block 1: `docs.seele + '\n\n' + docs.lektor`.
  Block 2: `laufzeitProfil(p) + '\n' + vertragsAnweisung(...)`.
- **`api/taller.js`** — Block 1: `docs.seele + '\n\n' + docs.taller` (in **beiden**
  Zweigen identisch, damit Phase 1 und Phase 2 denselben Cache treffen).
  Block 2: `laufzeitProfil(p, thema) + '\n' + vertragPhase1(...)` bzw. `vertragPhase2(...)`.

**`api/generate-lesson.js` bleibt beim String** — nicht cachebar, siehe Befund.

**Fallstricke, die den Cache stumm brechen:**

1. **Block 1 muss byte-identisch bleiben.** Jedes Zeichen, das sich pro Nutzer
   ändert, macht den Cache wertlos. Nichts Dynamisches darf hineinrutschen.
2. **Mindestgröße.** Der Cache greift erst ab einer Prompt-Mindestlänge.
   Seele (9,6 KB) + Raum liegt bei allen drei sicher darüber — auch nach Paket 0.
   Nach dem Abspecken einmal gegenprüfen.
3. **Der Cache lebt ~5 Minuten.** Innerhalb eines Gesprächs greift er.
   Zwischen zwei Sitzungen desselben Nutzers meist nicht. Die Kalkulation rechnet
   konservativ mit einem Cache-Write pro Sitzung — bei laufendem Betrieb wird es
   günstiger, weil der Cache über alle Nutzer warm bleibt.

**Verifikation:** Antwort-Feld `usage` prüfen. Erster Zug zeigt
`cache_creation_input_tokens > 0`; jeder Folgezug zeigt `cache_read_input_tokens > 0`
und `input_tokens` fällt auf einen Bruchteil. Ohne diesen Beweis gilt das Paket
als nicht erledigt.

---

## PAKET 2 — MODELL NACH PROFIL

Der harte String `'claude-sonnet-4-5'` steht in allen vier Dateien.

- `api/lektor.js`, `api/taller.js`, `api/generate-lesson.js` → **`'claude-haiku-4-5'`**
  (fest, für Gratis wie Premium — die Aufgabe ist in beiden Fällen dieselbe)
- `api/gespraech.js` → bleibt **`'claude-sonnet-4-5'`**

Das ist bewusst kein Profil-Schalter, sondern eine Aufgaben-Zuordnung: Korrigieren
und Lektionsbauen sind strukturierte Aufgaben, Gespräch ist es nicht.

**Abnahme-Risiko, das geprüft werden muss:** Spikius Marker müssen bei Haiku so
zuverlässig kommen wie bei Sonnet — `[SZENENENDE]`, `[LESSON_FROM_CONVERSATION]`,
die `[[Übersetzung]]`-Brücke, und bei `generate-lesson` das **valide JSON**.
Ein vergessener Marker bricht den Ablauf sichtbar.

Deshalb: **je Endpoint 10 Durchläufe** mit echten Profilen (de→es, es→de, de→el),
Marker und JSON-Validität zählen. Ergebnis in den Ledger-Bericht, mit Zahl.
Bei Ausfällen: melden, nicht selbst umbauen.

---

## PAKET 3 — DIE KOSTPROBE

Ein Gratis-Nutzer bekommt **einmalig**:

| Tätigkeit | Umfang | Kosten |
|---|---|---|
| Freies Gespräch (Sonnet) | **2 Spikiu-Züge** | 0,026 USD |
| 1 Lektion daraus (Haiku) | 1 Erzeugung | 0,006 USD |
| 1 Lesewerkstatt-Aufgabe (Haiku) | 1 Text + 1 Rückmeldung | 0,006 USD |
| 1 Schreibwerkstatt-Aufgabe (Haiku) | 1 Korrektur-Zug | 0,006 USD |
| | **Summe** | **0,044 USD** |

Warum 2 Züge und nicht 3: Bei 3 Zügen liegt die Summe bei 0,049 USD — haarscharf
am Limit. Wird der Systemprompt nach Paket 0 auch nur etwas dicker als angenommen,
ist die Grenze gerissen. 2 Züge lassen Luft. Und zwei Züge reichen fürs Heißmachen:
Spikiu eröffnet, der Nutzer antwortet, Spikiu reagiert **auf ihn** — genau da liegt
der spürbare Unterschied zum geführten Gespräch.

**Speicherort:** `localStorage`, ein Objekt neben `spikiu_user`:

```js
spikiu_kostprobe = {
  gespraechZuege: 0,   // max 2
  lektion:  false,
  taller:   false,
  lektor:   false
}
```

**Prüfpunkt: vor dem `fetch`, nicht danach.** Ist das Kontingent aufgebraucht,
darf gar kein Request rausgehen. Gezählt wird nach einer **erfolgreichen** Antwort —
ein Netzfehler darf dem Nutzer nichts wegnehmen.

**Betroffene Seiten:** `chat.html` (Modus `frei`), `taller.html`,
`schreibwerkstatt.html`, und der Aufrufpfad der Lektionserzeugung.
`gefuehrt.html`, `gym.html`, `proverbios.html`, `learnroman.html`, `dashboard.html`
**bleiben unberührt** — die kosten nichts und dürfen nie gesperrt werden.

**Der Abbruch (Leos Vorgabe: „nett"):** Keine Fehlermeldung, kein Zähler, kein
Balken, kein Prozent. Spikiu selbst, in seiner Stimme, in der Muttersprache des
Nutzers — sinngemäß:

> „Da wären wir gerade richtig warm geworden. Ich merke mir, wo wir stehen —
> hier geht's weiter, wenn du willst."

Darunter ein ruhiger Knopf zu Premium und ein zweiter, der zurück ins geführte
Gespräch führt (das bleibt ja offen). Anti-Gamification gilt auch für die Paywall:
niemand bekommt ein leeres Fass gezeigt.

Form: die bestehende Karten-Sprache (`karten-engine.js`, Item-Typ `note`),
kein neues Layout. Ein vollständiger Spikiu, wie überall.

---

## EHRLICHE GRENZE — MUSS IM BERICHT STEHEN

Der Zähler liegt in `localStorage`. Ein Nutzer löscht ihn mit zwei Klicks und hat
eine neue Kostprobe. **Das ist keine Sicherung, das ist eine Bremse.**

Bis Supabase kommt (Phase 2), bleibt der einzige echte Ruin-Schutz das feste
Ausgabenlimit in der Anthropic-Konsole. Das ist gesetzt und bleibt gesetzt.
Serverseitige Zählung ist ein eigenes Paket für Phase 2 und wird hier
**nicht** vorgetäuscht.

---

## NICHT ANFASSEN

- `spikiu-seele.md` — eingefroren
- `gespraech-modus.md` — gehört zu Paket 0 (Design)
- `gefuehrt.html`, `szenen.js`, `szenen-dialog.js`, `haeppchen-db.js`,
  `learnroman*`, `gym.html`, `wortschatz.js`, `proverbios.html`, `sprichwort.js`
  — die Null-Token-Räume, sie bleiben frei und unbegrenzt
- `karten-engine.js` — wird nur benutzt, nicht verändert
- `nav.js`, `bottomnav.js`, `sitzung.js`, `audio.js`
- `api/lesebegleiter.js` — eigener Raum, eigenes Paket
- Der Systemprompt-**Inhalt** in allen `*-modus.md` — hier wird nur die
  Verpackung geändert, nie der Text

---

## ABNAHME-KRITERIEN

1. `node --check` grün auf allen geänderten Dateien.
2. **Cache bewiesen:** `usage`-Werte aus echten Antworten im Bericht, für alle drei
   Endpoints — erster Zug `cache_creation_input_tokens > 0`, Folgezug
   `cache_read_input_tokens > 0`.
3. **Marker-Test:** 10 Läufe je Haiku-Endpoint, Trefferquote als Zahl im Bericht.
   `generate-lesson` liefert in allen 10 Läufen valides, parsebares JSON.
4. **Kostprobe:** dritter Zug im freien Gespräch löst **keinen** `fetch` aus,
   sondern die Karte. Zweiter Lesewerkstatt-Versuch ebenso. Netzwerk-Tab beweist es.
5. **Null-Token-Räume unberührt:** `gefuehrt.html` komplett durchspielen →
   weiterhin **0** Requests an `/api/*`.
6. Ledger-Eintrag mit den echten gemessenen Zahlen. Keine Schätzungen als
   Messwerte ausgeben.

---

## REIHENFOLGE

Paket 0 (Design, außerhalb dieses Auftrags) → Paket 1 → Paket 2 → Paket 3.

Paket 1 und 2 sind unabhängig voneinander und dürfen zusammen gebaut werden.
Paket 3 zuletzt, weil es die Oberfläche berührt und Leos Urteil am Gerät braucht.
