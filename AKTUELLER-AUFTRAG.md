# AUFTRAG — Geführtes Gespräch · „Antwort-Paletten + Audio-Vorwärmen"

Stand: 21.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigt: Antwort-Paletten = Prototyp III (`prototyp-feinschliff-iii.html`)

> Zwei unabhängige, klein geschnittene Verbesserungen aus Leos Tests. TEIL A + TEIL B
> getrennt baubar/testbar. Kein neuer Endpoint.

---

## TEIL A — Antwort-Paletten (klickbare Reaktionen im geführten Rollenspiel)

**Befund:** Im Thema-Rollenspiel (Café/Hotel/Taxi…) lässt Spikiu nur das offene Textfeld
stehen. Für Anfänger ist das falsch — ein A1 produziert noch keine freien Sätze, erkennt
und WÄHLT aber. Im Prototyp III gab es 2–3 klickbare Antwort-Chips („Sí, una maleta." /
„No, gracias.") — das wurde nie in einen Auftrag gegossen. Jetzt nachholen.

**Die Modus-Regel (wichtig):**
- **Geführtes Thema-Rollenspiel** (Lerner hat ein Thema gewählt — Seed „Ich möchte das
  Thema … üben") → **immer 2–3 Antwort-Chips.** Chips sind primär, das Textfeld bleibt
  als Option darunter.
- **Freies Sprechen** (Lerner hat „Einfach plaudern" gewählt) → **NIE Chips**, nur offener
  Dialog im Textfeld. Aktion/Reaktion frei.

### A1 — `gespraech-modus.md`
Im geführten Thema-Rollenspiel hängt Spikiu nach seiner Replik ein Struktur-Signal an,
auf eigenen Zeilen (wie `[WECHSEL:…]`/`[[…]]`/`[KORREKTUR]` — nie erklären, nie als Text):
```
[OPTIONEN]
Sí, una maleta.
No, gracias.
[/OPTIONEN]
```
- 2–3 sinnvolle Lerner-Antworten, in der **Zielsprache**, aus dem **gelernten Häppchen-
  Wortschatz** (passt zu Punkt ② „am Wortschatz verankert").
- NUR im geführten Thema-Rollenspiel. Im **freien Gespräch** (Flur, „Einfach plaudern")
  emittierst du NIE `[OPTIONEN]`.
- Höchstens EIN `[OPTIONEN]`-Block pro Antwort.

### A2 — `chat.html`
- `[OPTIONEN]…[/OPTIONEN]` parsen (Muster wie `extractKorrektur`/`splitBridge`), Signal
  NIE roh zeigen. Reihenfolge der Extraktion beachten: `[WECHSEL]` → `[SZENENENDE]`/
  `[KORREKTUR]` → `[OPTIONEN]` → `---`-Split → `[[…]]`.
- Die 2–3 Optionen als **klickbare Chips** über dem Eingabefeld rendern (Stil = die
  Antwort-Chips aus `prototyp-feinschliff-iii.html`, Label „Antworte mit dem gelernten
  Wortschatz"). Klick auf einen Chip = sendet diesen Text als Lerner-Zug (genau wie ein
  getippter Satz) → Dialog läuft weiter; Chips der Runde verschwinden danach.
- Das Textfeld bleibt im geführten Modus verfügbar (sekundär).
- Im **freien Modus** (Lerner wählte „Einfach plaudern"): keine Chips, nur Textfeld — der
  Prompt liefert dort eh keine `[OPTIONEN]`; zur Sicherheit auch frontendseitig nur im
  geführten Modus rendern (der Modus ist beim Gabelungs-Klick bekannt: Thema vs. plaudern).

---

## TEIL B — Audio-Vorwärmen (kein Retard, keine Desync)

**Befund:** `warm(zielsprache)` läuft heute erst bei der **Themenwahl** (chat.html ~Z. 800).
Der Eröffnungsgruß „¡Hola! Qué bien verte" + sein 🔊 erscheinen aber schon beim Betreten
des Raums — also VOR jedem Vorwärmen. Erster 🔊-Klick = kalter Start: Piper lädt erst das
~60MB-Modell → mehrere Sekunden Verzögerung; der kalte Klick „hängt" und spielt später
verspätet über einem anderen Element (Desync: Klick auf ein Wort → der alte Gruß ertönt).

### B1 — Früh vorwärmen · `chat.html`
- `warmVoice(PROFILE.zielsprache)` schon **beim Betreten des Raums** aufrufen (sobald
  `PROFILE` gelesen ist / beim Init, rund um den `[EINSTIEG]`-Opener) — NICHT erst bei der
  Themenwahl. Der Themenwahl-Warm darf bleiben (idempotent; `warm` gibt die gecachte
  Session zurück). So lädt das Modell still im Hintergrund, während der Lerner liest/wählt.

### B2 — Pro-Knopf-Ladezustand + Anti-Desync · `chat.html` + `audio.js`
- Klick auf 🔊: ist die Stimme bereit → sofort spielen. Ist sie noch kalt → der Knopf
  zeigt einen kleinen Lade-/Spinner-Zustand und spielt **genau diesen Text**, sobald
  bereit. Nie einen alten Text.
- **Anti-Desync in `audio.js`:** ein neuer `speak()`-Aufruf macht jeden noch laufenden/
  ausstehenden Sprech-Vorgang ungültig (Generations-Zähler: `speak` erhöht ihn + merkt
  sich seinen Wert; die Wiedergabe-Schleife in `speakWithPiper` bricht ab, wenn ihr Wert
  nicht mehr aktuell ist; Browser-Fallback macht weiter `synth.cancel()`). So ertönt nie
  eine veraltete Phrase verspätet über einem späteren Klick. Minimal halten — `audio.js`
  ist das getestete Audio-Fundament (Phase A), nur der Generations-Guard dazu.
- Optional (nett, nicht Pflicht): ein dezenter „Stimme wird vorbereitet"-Hinweis während
  des Erst-Warmens.

**Der Gruß:** bleibt mit 🔊 (dank Früh-Vorwärmen meist sofort hörbar; sonst Spinner →
spielt diesen Text). Leos Vorgabe: wer auf 🔊 tippt, hört die Phrase SOFORT, ohne Retard.

---

## ABNAHME (alles grün, sonst nicht fertig)
**Teil A:**
- [ ] Geführtes Thema-Rollenspiel: nach jeder Spikiu-Replik 2–3 klickbare Antwort-Chips
      (Zielsprache, gelernter Wortschatz); Klick sendet den Zug, Dialog läuft weiter.
- [ ] `[OPTIONEN]` nie roh sichtbar; koexistiert mit `[WECHSEL]`/`[[…]]`/`[KORREKTUR]`.
- [ ] Freies Sprechen („Einfach plaudern"): KEINE Chips, nur Textfeld.
- [ ] Textfeld im geführten Modus weiter nutzbar (sekundär).

**Teil B:**
- [ ] Stimme wird beim Betreten des Raums vorgewärmt (Netzwerk-Download startet vor der
      Themenwahl).
- [ ] 🔊 spielt ohne fühlbaren Retard; kalter Klick → Spinner → spielt DIESEN Text.
- [ ] Kein Desync mehr: Klick auf ein 🔊 lässt nie eine ältere Phrase verspätet ertönen.
- [ ] `audio.js`-Änderung minimal (nur Generations-Guard); `speak`/`warm`-API unverändert.

**Beide:**
- [ ] `node --check` grün; `[WECHSEL]`/Häppchen/Übungs-Varianten/freier Flur unberührt;
      keine vom Browser belegten Variablennamen; Emphasis nur `<em>`.

## AUSDRÜCKLICH NICHT
- `api/gespraech.js`/`api/haeppchen.js` NICHT umschreiben.
- Keine neue Audio-Architektur — nur Vorwärm-Zeitpunkt + Anti-Desync-Guard.
- Kein Stripe/Supabase.

## DANACH
- P3-Szenenende **am echten Modell verifizieren** (Menü/Korrektur-Karte/`[SZENENENDE]`-
  Trigger/Lektion-Anschluss) — jetzt, wo die Paletten den Dialog zum sauberen Abschluss
  führen, sollte das Menü zuverlässiger feuern. Bei Bedarf P3-Schliff.
- Kleinkram-Paket 2 (Genus-Begrüßung + Lesebegleiter-intro) · Audio überall I/II ·
  Werkstatt-Variante B · Paket B live · A2 · Paket C.
