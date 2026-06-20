# AKTUELLER-AUFTRAG — Kleinkram-Paket (Name-Leak + Lesebegleiter-Begrüßung)

Stand: 20.06.2026 · Design-Sitzung (claude.ai) · zwei kleine, unabhängige Schnitte
Branch: dev · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md

Drei chirurgische Edits in drei Dateien. Alle unabhängig, alle risikoarm. Reihenfolge egal.

---

## SCHNITT 1 — Name-Leak im Gesprächs-Raum

### Warum
Gast-Test (leeres `spikiu_user`): Spikiu begrüßt „¡Hola, der Lerner!" und sagt
„du bist der Lerner", dann Meta-Geplapper über sein Backend. WURZEL: bei leerem Namen
wird der Floskel-Platzhalter `'der Lerner'` dem Modell als echter Name gereicht.

### Edit 1 — `api/gespraech.js` (in `laufzeitProfil(p)`)

**ALT (exakt):**
```
- Lerner: ${p.name || 'der Lerner'}
```

**NEU (exakt):**
```
- Lerner: ${p.name ? p.name : '(kein Name hinterlegt — ohne Namen warm begrüßen, KEINEN Namen erfinden, den fehlenden Namen NICHT thematisieren)'}
```

Sonst nichts in der Datei. `api/gespraech.js` bleibt roh-Prosa (kein Parser).

### Edit 2 — `gespraech-modus.md` (Opener-Bullet zum `[EINSTIEG]`)

**ALT (exakt):**
```
  Frage. Ein Wiedersehen, kein Verhör. „Schön, dass du wieder da bist." Du kennst
  den Namen aus dem Profil und nutzt ihn.
```

**NEU (exakt):**
```
  Frage. Ein Wiedersehen, kein Verhör. „Schön, dass du wieder da bist." Steht ein
  Name im Profil, nutzt du ihn — steht dort keiner, grüßt du ohne Namen, erfindest
  keinen und sprichst den fehlenden Namen nicht an. Nie über dein Profil, dein
  Backend oder deine Bauweise reden.
```

Sonst nichts in der Datei.

---

## SCHNITT 2 — Lesebegleiter-Begrüßung kürzen

### Warum
Das Widget grüßt heute geschwätzig („Frag mich ruhig was zur Geschichte oder zu einem
Wort — ich halt mich kurz."). Soll schlicht sein: „Wie kann ich dir helfen?".

### Edit 3 — `lesebegleiter.js` (i18n-Objekt `T`, nur die drei `intro`-Werte)

Nur das Feld `intro` in `de`, `es`, `en` ersetzen. `hint`, `ph`, `send`, `err`
unangetastet lassen.

**de — ALT:** `intro: 'Hola. Frag mich ruhig was zur Geschichte oder zu einem Wort — ich halt mich kurz.'`
**de — NEU:** `intro: 'Hola. Wie kann ich dir helfen?'`

**es — ALT:** `intro: 'Hola. Pregúntame lo que quieras sobre la historia o una palabra — seré breve.'`
**es — NEU:** `intro: 'Hola. ¿En qué te ayudo?'`

**en — ALT:** `intro: "Hi. Ask me anything about the story or a word — I'll keep it short."`
**en — NEU:** `intro: "Hi. How can I help?"`

---

## ABNAHME-KRITERIEN

1. `api/gespraech.js`: Lerner-Zeile exakt wie Edit 1; `diff` zeigt nur diese Zeile.
2. `gespraech-modus.md`: Opener-Bullet exakt wie Edit 2; `diff` zeigt nur diesen Block.
3. `lesebegleiter.js`: nur die drei `intro`-Werte geändert; `hint`/`ph`/`send`/`err`
   in allen drei Sprachen unverändert; `diff` zeigt nur die drei `intro`-Zeilen.
4. Typografische „ " wo die Datei sie nutzt; im `en`-Block bleiben die geraden `"`
   wie gehabt (JS-String-Begrenzer), nur der Text dazwischen wird gekürzt.
5. Beide JS-Dateien laden, Markdown sauber.
6. Smoke-Test dev:
   - Gesprächs-Raum als Gast → Begrüßung enthält nirgends „der Lerner", kein Backend-Meta.
   - Gegentest mit `spikiu_user.profile.name = "Leonardo"` → Begrüßung nutzt „Leonardo".
   - Reader öffnen, Lesebegleiter aufklappen → Begrüßung lautet kurz „… Wie kann ich
     dir helfen?" in der Muttersprache.

---

## ABSCHLUSS (Eiserne Regel)

- Commit + push auf `origin/dev` (Reihenfolge: commit → pull --rebase → push).
- Ledger pflegen: DATEI-STATUS-Zeilen für `api/gespraech.js`, `gespraech-modus.md`,
  `lesebegleiter.js` um diesen Schnitt (20.06.) ergänzen; Bau-Bericht oben in die
  Stand-Zeile.

---

## NÄCHSTE PAKETE (NICHT hier bauen — nur dokumentiert)

1. **Lektion-Anschluss** — der Generator ist gesund, aber nirgends verdrahtet:
   - `chat.html` schreibt den `verlauf` nach `spikiu_user.lastConversation` (sonst findet
     der Dashboard-Knopf „Lektion aus letztem Gespräch" nie Input).
   - `schreibwerkstatt.html`: der Knopf „Lektion aus diesem Text machen" ist heute eine
     Attrappe (setzt nur „✓ gespeichert") → real an `/api/generate-lesson` verdrahten
     (Text + Profil rein, Lektion ins `spikiu_user.lessons`).
   - Test nur als ECHTER Lerner (Assessment durchlaufen), nie als Gast.
2. **Werkstatt-Inhalt (Variante B)** — kleine Auswahl: der Lerner wählt aus 3–4
   angebotenen Schreibaufgaben (Brief, Beschreibung, Meinung …), Niveau nach
   `profile.koennen`, Sprache nach `profile.zielsprache`. Eigenes Design-Paket.
3. Offene Punkte unberührt: Paket B live klicken · A2 Tür-öffnen-Regel · Paket C
   UI-Sieb leere Sends · Supabase = Phase 2.
