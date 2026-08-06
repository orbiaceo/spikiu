# AUFTRAG — Learnroman: der Immersions-Leseraum (Lukas + Marta)

Status: **BEREIT ZUM BAU** · Design + Inhalt abgenommen (claude.ai, 05.08.2026, Leo).

Referenz-Prototypen (liegen bei, von Leo hochzuladen):
- `proto-learnroman-lukas.html` — Lukas in Madrid, 4 Kapitel, DE-Lerner lernt Spanisch
- `proto-learnroman-marta.html` — Marta en Berlín, 4 Kapitel, ES-Lerner lernt Deutsch

Beide Prototypen sind **inhaltlich fertig und abgenommen**. Der Bau überführt sie in
Produktion — er erfindet keinen Text, keine Struktur und kein Layout neu.

---

## ⚠ DIESER AUFTRAG ERSETZT DIE VORHERIGE FASSUNG

Die alte Learnroman-Fassung (05.08., „drei Etappen-Geschichten mit Immersion") ist
**überholt**. Vier Punkte darin waren falsch und sind hier korrigiert:

| alte Fassung | jetzt gültig |
|---|---|
| „DREI eigenständige Geschichten, je eine pro Etappe" | **EIN Buch pro Sprachpaar**, Kapitel laufen durch alle Etappen |
| „Leseschrift Lora, KEIN Cormorant im Fließtext" | **Cormorant Garamond = Zielsprache**, DM Sans = Muttersprache |
| „NICHT anfassen: bestehende Reader-Kapitel" | Lukas + Marta **sind** der Learnroman (siehe Migration) |
| Tinte `#2b2621` | Tinte `#15163a` (navy), Papier `#f5f1e7` bleibt |

---

## 1. WAS DER LEARNROMAN IST

Ein **statischer** Leseraum in der Bibliothek. Fester Inhalt → **KEIN API-Call,
0 Tokens** beim Lesen (bake-once-Prinzip).

Pro Sprachpaar EIN Buch mit durchlaufender Handlung. Die Kapitel sind auf drei
Etappen verteilt und schalten sich nach dem Können-Level des Lerners frei.

**Heute im Auftrag enthalten:**
- `es` (Zielsprache Spanisch, Muttersprache Deutsch) — „Lukas in Madrid", 4 Kapitel
- `de` (Zielsprache Deutsch, Muttersprache Spanisch) — „Marta en Berlín", 4 Kapitel

`en` und `el` fehlen noch. Das Format muss sie tragen (Sprache = FELD), aber
**kein Platzhalter-Inhalt erfinden** — fehlende Bücher werden schlicht nicht angezeigt.

---

## 2. DAS PÄDAGOGISCHE LEITBILD (bindend — von Leo)

Der Learnroman führt in **Kultur UND Sprache** ein und zieht Wortschatz + Syntax
nach und nach herein. Er ist:
- KEINE Unterhaltung als Selbstzweck,
- KEIN Phrasebook,
- KEINE Erzählung in der Muttersprache mit Zielsprach-Dekoration.

**Die Muttersprache ist die schrumpfende Brücke, nie das Erlebnis.**

Konkrete Umsetzungsregel (so ist der Text gebaut):
- Muttersprache = **Regieanweisung** (was man sieht, riecht, denkt)
- Zielsprache = **Szene** (was gesprochen und ab Ampliación auch erzählt wird)
- Dialogzüge werden **verlängert**, statt Erzählung zu übersetzen — Dialog ist auf A1
  leichter als Prosa
- Brücke nur für **wirklich Neues**; was einmal übersetzt wurde, wird nicht wieder
  übersetzt

---

## 3. DIE IMMERSIONS-LEITER (gemessen, nicht geschätzt)

Ziel-Anteil = Anteil der Zielsprache am Erzähltext. „Am Bildschirm" = ohne die
eingeklappte Brücke, also das, was der Lerner beim Aufschlagen wirklich sieht.

**Lukas in Madrid**

| Kapitel | Etappe | Ziel | Muttersprache | am Bildschirm |
|---|---|---|---|---|
| 1 El aeropuerto | Fundament | 30% | 47% | 39% |
| 2 Mi nuevo piso | Fundament | 40% | 27% | 60% |
| 3 La tertulia | Aufbau | 43% | 18% | 70% |
| 4 Un café en el barrio | Anwendung | 100% | 0% | 100% |

**Marta en Berlín**

| Kapitel | Etappe | Ziel | Muttersprache | am Bildschirm |
|---|---|---|---|---|
| 1 Der Flughafen | Fundamentos | 27% | 49% | 36% |
| 2 Meine neue WG | Fundamentos | 39% | 28% | 58% |
| 3 Der Stammtisch | Ampliación | 41% | 20% | 67% |
| 4 In der Bäckerei | En práctica | 100% | 0% | 100% |

(Ausgangslage der alten Reader-Kapitel war 8–13% — daher der ganze Umbau.)

**Diese Messlatte gilt für alle künftigen Kapitel und alle Sprachpaare.** Sie ist
das Abnahme-Kriterium für Inhalt, nicht nur eine Empfehlung.

---

## 4. DATEN-VERTRAG

**Sprache ist ein FELD, kein Datei-Schnitt.** Schlüsselnamen sind sprachneutral —
`de:`/`es:` sind verboten, weil Deutsch mal Ziel- und mal Muttersprache ist.

### Block-Typen

```js
{na:'…'}                  // Erzählung in der MUTTERSPRACHE, kein Audio
{z:'…', tr:'…'}           // Zielsprache + Brücke (tr optional) + 🔊
{p:'…'}                   // fließende Zielsprach-Prosa, kein tr + 🔊
```

- `na` — narrativ, Muttersprache. Trägt Regie, Innensicht, Kulturkommentar.
- `z` — Zielsprache, eine Zeile/ein Zug. `tr` ist **optional** und wird bewusst
  weggelassen, wo der Sinn aus dem Kontext trägt.
- `p` — nur in der Etappe Anwendung. Fließende Prosa mit Nebensätzen, Dialog im
  Fließtext mit Gedankenstrich. **Kein `tr`, kein `na` im selben Kapitel.**

### Kapitel- und Buch-Struktur

```js
{
  buch: 'lukas-madrid',
  zielsprache: 'es',            // steuert audio.js
  muttersprache: 'de',          // steuert UI + na/tr
  titel: 'Lukas in Madrid',
  etappen: [                     // lokalisierte ANZEIGENAMEN, siehe 5.
    {id:'fundament',  nm:'Fundament'},
    {id:'aufbau',     nm:'Aufbau'},
    {id:'anwendung',  nm:'Anwendung'}
  ],
  kapitel: [
    {level:'fundament', n:1, title:'El aeropuerto',
     teaser:'Lukas landet in Madrid — und ein Taxifahrer nennt ihn alemán.',
     body:[ …Blöcke… ]}
  ]
}
```

Alles in **einer** Datei `learnroman-daten.js` am Root (Muster `haeppchen-db.js` /
`wortschatz.js` — statischer Helfer, KEIN `vercel.json`-Eintrag), die
`window.spikiuLearnroman(zielsprache, muttersprache)` → Buch-Objekt oder `null` liefert.

Den fertigen Text 1:1 aus den Prototypen übernehmen. **Nicht umformulieren, nicht
kürzen, nicht ergänzen.** Er ist abgenommen.

---

## 5. ETAPPEN-NAMEN SIND LOKALISIERT

Die Charta führt „Fundament → Aufbau → Anwendung" als feste Namen. Das gilt
weiterhin als **kanonische ID-Reihe** (`fundament` / `aufbau` / `anwendung`), aber die
**Anzeigenamen werden in der Muttersprache des Lerners ausgegeben**:

| id | de | es | en |
|---|---|---|---|
| `fundament` | Fundament | **Fundamentos** | Foundations |
| `aufbau` | Aufbau | **Ampliación** | Building up |
| `anwendung` | Anwendung | **En práctica** | In practice |

(Spanische Namen von Leo entschieden, 05.08. Englisch als Vorschlag — vor dem
Einsatz von Leo bestätigen lassen.)

Grund: für eine Madrilenin sind drei deutsche Wörter an der wichtigsten Stelle des
Bildschirms eine Mauer, kein Wegweiser.

---

## 6. LESE-UX

### Kapitelliste
- Nach Etappe gruppiert, Reihenfolge Fundament → Aufbau → Anwendung.
- **Freischaltung nach `profile.koennen`**: `anfang`→fundament, `mittel`→aufbau,
  `fortgeschritten`→anwendung. Eigene Etappe **und alle darunter** sind offen.
- Höhere Etappen: Karte gestrichelt/gedämpft, Titel sichtbar, Zeile
  „✦ öffnet sich in der Etappe <Name>" bzw. „✦ se abre en la etapa <Nombre>".
  **Kein strafendes Schloss, kein Grind-Zwang, kein Prozentbalken.**
- **`?dev=1`** schaltet alle Etappen frei (Dev-Schloss, Muster wie sonst im Projekt).
  Im Prototyp sind die Etappen-Knöpfe frei umschaltbar — das ist die Test-Attrappe
  und gehört in Produktion hinter `?dev=1`.

### Lese-Overlay
- Volle Fläche über der Liste, Kopf mit „‹" zurück, Kapitelnummer + Etappe + Titel.
- Blöcke in Reihenfolge, Fuß „— Ende des Kapitels —" (lokalisiert).
- **🔊 auf jeder `z`- und jeder `p`-Zeile**, über `audio.js`:
  `speak(text, buch.zielsprache)`. Vorwärmen mit `warm(zielsprache)` beim Betreten
  des Raums. **Der Prototyp nutzt `speechSynthesis` als Attrappe — in Produktion
  MUSS `audio.js` verwendet werden** (Piper, statisch, frei; iOS-Sonderweg steckt
  schon in `audio.js`).
- Der 🔊-Klick darf die Tipp-Brücke NICHT auslösen (`closest('.spk')`-Guard).

### Die Tipp-Brücke (neu, abgenommen 05.08.)
- **Fundament:** `tr` steht offen unter der Zielzeile (wie bisher).
- **Ab Aufbau:** `tr` ist **eingeklappt**. Die Zielzeile trägt eine dezente
  gepunktete Unterlinie als Hinweis. Ein Tipp auf die Zeile blendet die Brücke ein,
  ein weiterer wieder aus.
- Am Kopf des Overlays eine ruhige Zeile: „Tipp auf eine Zeile zeigt die
  Übersetzung." / „Toca una línea para ver la traducción."
- Zeilen ohne `tr` sind nicht tippbar.

Grund: so steigt der sichtbare Ziel-Anteil sprunghaft (Kap 3: 43% → 70%), ohne dass
ein Anfänger im Regen steht. Und Antippen ist ohnehin die Geste des Readers (Wortjag).

### Anti-Gamification
Kein Score, kein Streak, kein Prozent, keine Zählung gelesener Kapitel.
Fortschritt wird gefühlt, nie gezählt.

---

## 7. TYPOGRAFIE — DIE SCHRIFT IST DIE SPRACHE

Das ist kein Dekor, das ist die wichtigste Design-Entscheidung des Raums:

- **Cormorant Garamond** (600, ~1.4rem, line-height 1.6) = **Zielsprache**
  (`z`-Zeilen und `p`-Prosa)
- **DM Sans** (~1.02rem, line-height 1.55) = **Muttersprache** (`na`-Erzählung)
- **Archivo Black** = Titel, Kapitelüberschriften
- **DM Mono** = Eyebrows, Etappen-Labels, Badges

Der Lerner sieht das Sprachverhältnis, **bevor er ein Wort liest**. Beim Wechsel von
Fundament zu Anwendung wird die Seite sichtbar zur Serifen-Seite. Das darf nicht
vereinheitlicht werden.

Farben: Papier `#f5f1e7`, Tinte `#15163a`, Akzent `#2d6a4f`, gedämpft `#6b6154`,
Rahmen-Stärke `2.5px` mit versetztem Schatten (Neo-Brutal-Look aus dem Prototyp),
Etappen-Chip offen `#9bd14a`, Schloss-Zeile `#a87b2e`.

Alle Schriften **selbst hosten** (kein Google-Fonts-CDN — Cookie-Consent-Grund,
siehe Projektregel).

---

## 8. WORTJAG (Vorbereitung, nicht Bau)

Jedes Zielsprach-Wort im Learnroman soll später **jagbar** sein → wandert in
„Mein Buch". Wortjag ist noch nicht gebaut.

Deshalb hier **nur vorbereiten**: `z`- und `p`-Blöcke so rendern, dass die
Zielsprach-Textknoten später wortweise umhüllt werden können (eigener Container,
keine verschachtelten Inline-Elemente im Zieltext). **Keine Tap-Handler auf Wortebene
bauen** — das kommt mit Wortjag als eigenes Paket, sonst kollidiert es mit der
Tipp-Brücke, die auf Zeilenebene arbeitet.

---

## 9. MIGRATION DER ALTEN READER-KAPITEL

`cap1-4-es-v2.html` und `cap1-4-de-v2.html` enthalten den Ursprungstext. Der wurde
für den Learnroman neu geschrieben (Immersions-Leiter) und liegt jetzt in den
Prototypen.

- Die acht Dateien **bleiben vorerst unangetastet auf dev**. Nichts löschen.
- **Grammatik-, Glossar- und Übungsteile ziehen NICHT mit um.** Der Learnroman hat
  sie nicht; das Glossar ersetzt später der Wortjag. Die Grammatik-Texte sind gut und
  werden für die Lesewerkstatt aufgehoben — eigenes späteres Paket.
- Ob books.html künftig auf den Learnroman statt auf die alten Kapitel zeigt,
  entscheidet Leo **nach** der Abnahme. In diesem Paket nur den neuen Raum bauen und
  einen Eintritt schaffen.

---

## 10. ZU BAUENDE DATEIEN

1. **NEU `learnroman-daten.js`** — Root-Helfer, `window.spikiuLearnroman(ziel, mutter)`.
   Enthält beide Bücher 1:1 aus den Prototypen. `node --check` grün.
2. **NEU `learnroman.html`** — statische Root-Seite. Lädt `nav.js` + `audio.js` (Modul)
   + `learnroman-daten.js` + `capy-vivo.js`. Kapitelliste + Lese-Overlay + Tipp-Brücke.
   Profil defensiv aus `spikiu_user` (Codes über `langCode`, Muster 1:1 wie `chat.html`).
3. **Eintritt in die Bibliothek** — **ZUERST die aktuelle Wahrheit von `nav.js` und
   `books.html` frisch aus dev lesen**, dann den kleinstmöglichen Eingriff wählen und
   im Bericht begründen. Nicht raten, keine Nav-Architektur umbauen.

**NICHT anfassen:** `api/*`, `spikiu-seele.md`, `*-modus.md`, andere Räume
(Gespräch / Gym / Lese- + Schreibwerkstatt / Proverbios / Lektionen), `sitzung.js`,
`lesebegleiter.js`, die acht alten Reader-Kapitel, `capy-vivo.js` (nur aufrufen).

**Vorsicht:** keine vom Browser belegten Variablennamen (`history`, `location`, `name`,
`status`, `top`, `length`, `event`). Emphasis nur `<em>`/`<strong>`, nie Asterisks.

---

## 11. ABNAHME (Leo am Gerät)

- Bibliothek → Learnroman zeigt das Buch passend zur Profil-Zielsprache; ohne Buch
  (en/el) sauberer leerer Zustand statt Fehler.
- Drei Etappen sichtbar, Namen in der **Muttersprache**; Kapitel schalten nach
  `profile.koennen` frei; `?dev=1` öffnet alles.
- Fundament liest sich mit offener Brücke; ab Aufbau ist die Brücke eingeklappt und
  ein Tipp holt sie; Anwendung ist reine Zielsprache **ohne jede Brücke**.
- Der Sprung von Kapitel 3 zu Kapitel 4 ist **spürbar** — das ist gewollt.
- Cormorant für die Zielsprache, DM Sans für die Muttersprache, angenehm fürs Auge.
- 🔊 spielt die Zielsprache über Piper, auch auf dem iPhone.
- **0 Netzwerk-Call beim Lesen.**

---

## 12. LEDGER-EINTRAG (Design-Teil, von Claude Code oben in die Stand-Zeile zu übernehmen)

> Design 05.08. (claude.ai): **LEARNROMAN — INHALT + LAYOUT ABGENOMMEN, BAU BEAUFTRAGT.**
> BEFUND: die acht Reader-Kapitel hatten gemessen nur **8–13% Zielsprache** im
> Erzähltext (cap1-es: 11% es / 81% de; cap1-de: 8% de / 86% es) — ein
> muttersprachlicher Roman mit Zielsprach-Zitaten. Leo: „zu viel Deutsch für den
> Spanischlerner und zu viel Spanisch für den Deutschlerner." URSACHE strukturell: die
> Muttersprache trug die Handlung, die Zielsprache lieferte Deko-Zitate (Ø 4 Wörter je
> Einsprengsel). LÖSUNG: Dialogzüge verlängern statt Erzählung übersetzen; ab Kap 2
> deutsche/spanische Erzählblöcke in Zielsprach-Erzählsätze wandeln; Brücke nur für
> Neues. ALLE ACHT KAPITEL NEU GESCHRIEBEN und in Leos Learnroman-Layout gegossen —
> Lukas 30/40/43/100% Ziel, Marta 27/39/41/100%. NEU ABGENOMMEN: **Tipp-Brücke** (ab
> Aufbau ist `tr` eingeklappt, Tipp auf die Zeile holt sie → sichtbarer Ziel-Anteil
> Kap 3 = 70%). **Schrift = Sprache** (Cormorant Zielsprache / DM Sans Muttersprache)
> als tragendes Design-Prinzip erkannt und festgeschrieben. **Etappen-Namen jetzt
> lokalisiert** (es: Fundamentos / Ampliación / En práctica — Leo entschieden); IDs
> bleiben fundament/aufbau/anwendung. **Daten-Schlüssel sprachneutral** `na` / `z`+`tr`
> / `p` (nie `de:`/`es:`, weil Deutsch mal Ziel und mal Mutter ist). DIESER AUFTRAG
> ERSETZT die vorige Learnroman-Fassung (drei Einzelgeschichten / Lora / kein Cormorant
> / Reader nicht anfassen — alle vier Punkte waren falsch). Prototypen
> `proto-learnroman-lukas.html` + `proto-learnroman-marta.html` abgenommen.

---

## 13. NACHZUZIEHEN IN DER CHARTA (Leo, Projektwissen)

Zwei Stellen der `SPIKIU-PROJEKT-CHARTA.md` sind jetzt überholt:

1. **Etappen-Namen:** „Fundament → Aufbau → Anwendung (Diese Namen sind FEST)" →
   die **IDs** sind fest, die **Anzeigenamen sind lokalisiert** (siehe Abschnitt 5).
2. **Neuer Grundsatz — Immersions-Messlatte:** In jedem Lesetext gilt eine gemessene
   Zielsprach-Quote, die über die Etappen steigt (Fundament ~30–40%, Aufbau ~40%+ bei
   ~70% sichtbar, Anwendung 100%). Die Muttersprache ist Regieanweisung, die
   Zielsprache ist die Szene. Neue Kapitel werden gegen diese Quote abgenommen.
