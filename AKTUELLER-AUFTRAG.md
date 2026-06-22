# AUFTRAG — erledigt am 22.06.2026 · kein offener Auftrag

> **Paket 4 „Memoria que se siente" GEBAUT + auf dev (commit 8988ac2).** EINE Datei
> (`dashboard.html`): `renderMemoria()` macht die Begrüßung lebendig aus NUR echten Daten
> (`lessons`/`blaetter`) — Kontinuitäts-Untertitel mit jüngster Lektion + „Weiter plaudern →"-Link,
> „Wir zwei"-Zeile (echte Zähler, Singular/Plural, i18n DE/ES/EN), optionaler „von letztem Mal"-Wort-Anker;
> ohne Historie bleibt der Willkommens-Zustand sauber (nichts erfunden — Seele). Alle Abnahme-Punkte
> headless verifiziert (4 Fälle: Historie DE · neuer Lerner · ES · EN). Vollständiger Bericht +
> ABNAHME-REST (Gerät) im SPIKIU-BUILD-LEDGER.md (oberste „Stand:"-Zeile). Nächstes laut Auftrag:
> Voz primero (`prototyp-voz.html`) · Reel táctil (`prototyp-reel-tactil.html`).
>
> Der ursprüngliche Auftragstext steht unten unverändert als Referenz.

---

# (Referenz) AUFTRAG — „Memoria que se siente" (Paket 4 der Design-Welle „Neuer Look")

Stand: 22.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Genehmigter Prototyp (Geist + Stil): `prototyp-memoria.html`

> Spikiu empfängt mit KONTINUITÄT statt mit einem leeren „Willkommen": er weiß, woran
> wir zuletzt gearbeitet haben, und die Beziehung wächst sichtbar (ohne Streak-Druck).
> Das ist Spikius Moat = Präsenz.
>
> **HARTE REGEL (Seele, Anti-Halluzination): NUR ECHTE DATEN.** Der Prototyp zeigte
> illustrative Zahlen („47 Wörter · 9 Tage · du hast 'la cuenta' endlich geschafft") —
> die gibt es NICHT (kein Streak, kein „Tage dabei", kein Meisterungs-Register). Genau
> solche erfundenen Stats hat Claude Code beim Baum (Teil 36) bewusst ENTFERNT. Memoria
> baut ausschließlich auf dem, was wirklich in `spikiu_user` steht.

## WAS WIRKLICH DA IST (frisch aus dev geprüft)
- `user.lessons` — Array (rolling-3), je `{ id, createdAt, zielsprache, title, vocab[], … }`.
  chat.html schreibt sie am Gesprächsende (Teil 32). **`lastConversation` wird NICHT mehr
  geschrieben** → Kontinuität kommt aus `lessons`, nicht aus `lastConversation`.
- `user.blaetter` — echter Gesprächs-Zähler (Teil 36, +1 pro Gesprächsende) = die Blätter
  am Baum.
- `user.name`, `user.profile` (targetLang/nativeLang/etappe …).
- **NICHT vorhanden:** Streak, „Tage dabei"/firstSeen, Meisterungs-Status einzelner Wörter.
  → NICHTS davon erfinden oder anzeigen.

## DIE DATEI (EINE)
**`dashboard.html`** — Begrüßung lebendig machen. `api/*`, Seele, andere Seiten, `nav.js`,
`baum.js`, `capy-vivo.js` UNBERÜHRT. Kein neuer Capy (der Baum ist der Held der tree-hero).

## WAS GEBAUT WIRD
Im `load`-Handler, wo heute `greeting-sub` gesetzt wird (Z.1195
`greeting-sub.textContent = subs[_native]…`), eine kleine `renderMemoria(user)`-Logik:

1. **Kontinuitäts-Untertitel** (ersetzt das statische `subs[_native]` NUR wenn echte Historie da ist):
   - `lessons` nach `createdAt` absteigend → jüngste Lektion. Wenn `lessons.length > 0` und die
     jüngste hat einen `title`: Untertitel = Kontinuität, i18n in der **Muttersprache**:
     - de „Letztes Mal: «{title}». Machen wir weiter?"
     - es „La última vez: «{title}». ¿Seguimos?"
     - en „Last time: «{title}». Shall we keep going?"
     dahinter ein dezenter Link **„Weiter plaudern → / Seguir charlando → / Keep chatting →"**
     auf `chat.html`.
   - Wenn KEINE Lektion da ist (neuer Lerner): den heutigen Willkommens-Untertitel
     (`subs[_native]`) UNVERÄNDERT lassen. Nichts erfinden.
2. **„Wir zwei" — Beziehung (echte Zähler, KEIN Streak):** eine ruhige kleine Zeile/Chip
   unter der Begrüßung (oder im tree-hero unter der Blatt-Zeile), NUR sichtbar wenn
   `blaetter > 0` oder `lessons.length > 0`:
   - Inhalt = echte Zahlen: **Gespräche = `user.blaetter`** · **Lektionen = `lessons.length`**.
   - i18n Muttersprache, mit korrektem Singular/Plural (1 Gespräch / 2 Gespräche …):
     de „Wir zwei: {g} Gespräch(e) · {l} Lektion(en)" · es „Nosotros dos: {g} charla(s) ·
     {l} lección/lecciones" · en „Us two: {g} conversation(s) · {l} lesson(s)".
   - Ruhiger Stil (gedämpft, klein), KEINE Pokale/Prozente/Balken. Kein Streak, keine „Tage".
3. **Optional, nur wenn sauber & echt:** ein sanfter „von letztem Mal"-Anker — das ERSTE
   Vokabel der jüngsten Lektion (`lessons[0].vocab[0].word` + `.translation`), als leise Zeile
   „Von letztem Mal: {wort} ({übersetzung}) / De la última vez / From last time". KEIN „du hast
   es gemeistert" (das wäre erfunden) — nur ein neutrales Erinnern. Fehlt das Feld → weglassen.

## ABNAHME
- [ ] Mit echter Historie (≥1 Lektion): Begrüßung zeigt die jüngste Lektion als Kontinuität
      + „Weiter plaudern →"-Link auf `chat.html`; ohne Historie bleibt der heutige Willkommens-Text.
- [ ] „Wir zwei"-Zeile zeigt **echte** `blaetter`/`lessons.length` (Singular/Plural korrekt),
      nur bei echten Daten; KEIN Streak/Tage/Prozent/Meisterung.
- [ ] Optionaler „von letztem Mal"-Wort-Anker nur wenn die Daten wirklich da sind.
- [ ] NICHTS Erfundenes auf dem Schirm (Seele); neuer Lerner ohne Daten sieht keine
      Platzhalter-Zahlen.
- [ ] i18n DE/ES/EN; nur `dashboard.html` geändert; `node --check` grün; headless verifiziert
      (Daten gesetzt → Kontinuität + Zähler; keine Daten → sauberer Willkommens-Zustand).

## AUSDRÜCKLICH NICHT
- KEINE erfundenen Zahlen/Streak/„Tage dabei"/Wort-Meisterung (kein Tracking dafür da).
- KEIN neuer Capy/Animation (Baum bleibt der Held). Kein `api/`, kein neuer Endpoint, kein
  Schreiben neuer Felder. Nur LESEN von `lessons`/`blaetter`.

## NOTIZ / DANACH
- Die „du hast ein Wort gemeistert"-Feier aus dem Prototyp braucht ein **Meisterungs-/Stats-
  Register** (welche Wörter saßen, wann zuletzt) — das gibt es noch nicht. Eigenes späteres
  Daten-Paket (zusammen mit „Tage dabei"/firstSeen + evtl. Etappen-Aufstieg-Auslöser, der
  laut Teil-36-Frage auch noch fehlt). Hier NICHT mitbauen.
- Danach in der Design-Welle: **Voz primero** (`prototyp-voz.html`) · **Reel táctil**
  (`prototyp-reel-tactil.html`).
