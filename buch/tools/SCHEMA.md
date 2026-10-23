# Gramática A + Cuaderno A — Autorenhandbuch

Du schreibst Kapitel für zwei zusammengehörige Bücher: **Gramática A** (Erklärungen) und **Cuaderno A** (Übungen), Spanisch für deutschsprachige Lernende, Stufe A1–A2. Beide Bücher entstehen aus EINER Datei pro Kapitel: `content/kap-XX.json` (XX zweistellig, z. B. `kap-05.json`).

Das **Goldbeispiel** ist `content/_gold-11-5.json` (Abschnitt 11.5, Indefinido oder Imperfecto). Lies es zuerst ganz. Jeder Abschnitt soll diese Qualität haben.

Das Buch soll die „Power-Grammatik“ von Hueber deutlich übertreffen. Deren Schwächen, die wir NICHT wiederholen: blasse, irrelevante Beispielsätze („Die Äpfel sind grün“), rein mechanische Übungen, kein Humor, keine Aussprache, kein Audio.

---

## 1. Stil – die Regeln

**Deutsch (Erklärungen)**
- Alltagsdeutsch, du-Form, kurze Sätze. Kein Fachjargon; ein Fachbegriff höchstens in Klammern, damit man ihn im Unterricht wiedererkennt („das Imperfecto (die Vergangenheit für Beschreibungen)“).
- Erst die Idee in einem Satz (Block `oneline`), dann Regeln mit Beispielen, dann Stolpersteine.
- Bilder und Vergleiche statt Terminologie (Goldbeispiel: „Erzählen ist Theater – Bühne und Handlung“). Jeder Abschnitt braucht so eine tragende Idee, die man sich merkt.
- Betonung nur mit `<em>`, NIE mit Sternchen.
- Verbotene Wörter: „KI“ (sag „Spikiu“), „Kurs“ (sag „Lernabenteuer“ oder umschreiben), „Level“ (sag „Stufe“).

**Spanisch (Beispiele)**
- Bis A2 geschriebenes Spanisch aus **Spanien**: móvil, ordenador, coche, piso, zumo, billete, coger, vosotros, conducir, gafas. Kein Voseo in Beispielen. Lateinamerika nur im Kasten `region`.
- Jeder Beispielsatz ist **relevant** (Alltag, Arbeit, Reisen, Familie, Liebe, Essen, Handy, Wohnung, Ämter) und am besten **witzig** oder überraschend. Kein Satz, den ein Mensch nie sagen würde.
- Jedes Beispiel ist übersetzt (`<de>…</de>`), außer es ist offensichtlich.
- Wortschatz auf A1–A2 halten. Grammatik aus späteren Kapiteln möglichst vermeiden (siehe Inhaltsverzeichnis unten).
- Spanisch muss fehlerfrei sein: Akzente (é, á, í, ó, ú, ñ, ü), ¿ ¡ am Anfang.

**Das Ensemble** – wiederkehrende Figuren, nutze sie in Beispielen, Geschichten, Übungen und Cartoons:
- **Lucía**, 32, Grafikdesignerin in Madrid, chaotisch, schlagfertig (Hauptfigur, oft Ich-Erzählerin)
- **Dani**, 34, Lucías Freund, die Ruhe selbst, immer zu spät
- **Pilar**, 63, Lucías Mutter, ruft immer im falschen Moment an, hat zu allem eine Meinung
- **Nico**, 4, Lucías Neffe, Wirbelwind, Dinosaurier-Fan
- Nebenfiguren erlaubt: Kellner, Nachbarin doña Carmen, Lucías Chef Rafa, Kollegin Marta, Danis Hund Tofu …
- Nicht jeder Satz braucht das Ensemble; etwa die Hälfte der Beispiele darf neutral sein.

**Spikiu** (das Capybara-Maskottchen) erscheint NUR im Block `spikiu` („Spikius Kniff“) und höchstens **einmal pro Kapitel**, nur bei einer wirklich besonderen Erklärung (ein Trick, der eine schwere Stelle plötzlich leicht macht). Spikiu spricht nie über sich selbst.

---

## 2. Seitenbudget – sehr wichtig

Seitenformat 17 × 24 cm, nutzbarer Satzspiegel ca. 140 × 200 mm.
- **Gramática**: ein Abschnitt = **1 Seite**. Nur große Kernthemen dürfen 2 Seiten haben (dann ist `gramatica` eine Liste mit zwei Seiten). Seite 1 enthält automatisch: Abschnittsnummer, Überschrift (`headline_es` + `headline_de`) und den Cartoon (ca. 40 mm hoch, bei 2-seitigen Abschnitten 46 mm). Danach bleiben auf Seite 1 nur noch ca. **120 mm** für Blöcke. Unten kommt automatisch der Pfeil „→ Üben: Cuaderno A · X.Y“.
- **Cuaderno**: ein Abschnitt = **1 Seite** mit 4–6 Übungen (bei 2-seitigen Kernthemen 2 Seiten, 6–8 Übungen).
- Prüfe IMMER mit dem Build (siehe 6.), dass nichts überläuft. Der Build passt leicht zu volle Seiten automatisch an (Zoom bis 0,86) – Ziel ist aber, ohne Zoom auszukommen. „ÜBERLAUF“ ist ein Fehler, den du beheben musst (kürzen oder Übung streichen).

---

## 3. Dateiformat

```json
{
  "chapter": 5,
  "title": "Das Verb im Präsens",
  "sections": [ { …Abschnitt… }, … ]
}
```

### Abschnitt
| Feld | Inhalt |
|---|---|
| `id` | `"5.2"` – genau wie im Inhaltsverzeichnis unten |
| `topic` | deutscher Thementitel, kurz, z. B. `"Verben, die den Stamm ändern"` |
| `level` | `"A1"` oder `"A2"` |
| `headline_es` | Der Aufhänger: ein echter spanischer Satz, der das Thema zeigt und neugierig macht. Darf `<br>` für den Umbruch enthalten. Max. ca. 60 Zeichen. |
| `headline_de` | Übersetzung |
| `deeper` | optional, z. B. `"Für Profis: <gb>14.1</gb>"` (Verweis in Band B) |
| `index` | 3–8 Registerbegriffe (deutsch oder spanisch), z. B. `["gustar", "encantar", "Vorlieben ausdrücken"]` |
| `cartoon` | siehe 4. |
| `gramatica` | Liste von Seiten; jede Seite ist eine Liste von Blöcken |
| `cuaderno` | Liste von Seiten; jede Seite ist eine Liste von Übungen |
| `test` | 2–3 Testfragen für den Blocktest (siehe unten) |

### Inline-Markup (in allen Texten)
- `<es>…</es>` spanischer Text (Serifenschrift kursiv) · `<de>…</de>` deutsche Übersetzung (grau)
- `<c1>…</c1>` und `<c2>…</c2>` zwei Kontrastfarben (grün gepunktet / rot unterstrichen) für zwei Dinge, die man unterscheiden muss (ser/estar, Bühne/Handlung, Endung/Stamm …). Konsequent nutzen und in `oneline` einführen.
- `<em>…</em>` Betonung · `<b>…</b>` fett (z. B. Endungen) · `<br>` Umbruch
- `<t>5.2-1</t>` Audio-Track (meist besser als Feld `track` am Block)
- Querverweise: `<g>6.1</g>` → „Gramática A · 6.1“, `<c>6.1</c>` → „Cuaderno A · 6.1“, `<gb>15.2</gb>` → Gramática B

**Audio-Tracks**: Format `ABSCHNITT-N`, z. B. `5.2-1`, `5.2-2`, fortlaufend pro Abschnitt. Jeder Block mit hörbaren Beispielen (`examples`, `story`, `columns`, `conj`, `table`) und jede Hörübung (`hear`, `mark`, `cloze`, `dialog`, `tongue`) bekommt ein Feld `"track"`. Was gesprochen wird, wird automatisch aus dem Spanisch gesammelt.

### Gramática-Blöcke (`type`)
- `oneline` `{text, label?}` – „In einem Satz“: die tragende Idee. Fast immer der erste Block.
- `h` `{text, track?}` – Zwischenüberschrift · `h3` `{text}` · `p` `{text}`
- `columns` `{cols:[{title, sub, icon, tone:1|2, track?, uses:[{t, x}]}]}` – 1–3 farbige Spalten (tone 1 grün, 2 rot, 0 neutral)
- `table` `{head:[…], rows:[[…]], es_cols:[0], hl:[rowIndex], track?}` – Regeltabelle; `es_cols` = Spalten in Spanisch-Serifenschrift
- `examples` `{track, items:[["<es>", "<de>"], …]}` – Beispielliste zweispaltig (spanisch | deutsch); Text OHNE `<es>`-Tags, die setzt der Block selbst
- `conj` `{verbs:[{inf, de, forms:[6 Formen]}], track?, pron?}` – Konjugationstabelle; Endungen mit `<b>` markieren: `"habl<b>o</b>"`. Bis zu 3 Verben nebeneinander.
- `question` `{items:[{q, small, tag, tone}]}` – die Entscheidungsfrage (2 oder 3 Felder)
- `story` `{title?, track, es, de, note?}` – Mini-Geschichte mit `<c1>/<c2>`-Markierung
- `signal` `{rows:[[label, "spanische Wörter", tone]]}` – Signalwörter
- `trick` `{icon, text}` – Eselsbrücke mit Icon
- `ojo` `{text}` – typischer Fehler Deutschsprachiger
- `region` `{text}` – So sagt man es in Lateinamerika / anderen Regionen
- `variantes` `{text, tag?}` – schmale Zeile mit Globus: andere Aussprache-Varianten desselben Lauts (Lateinamerika, Kanaren, Andalusien, Karibik, Río de la Plata …). Kompakt, 1–2 Zeilen.
- `novela` `{source, quote, note}` – NUR echte, wörtliche Zitate aus den Spikiu-Lernromanen (siehe 5.)
- `spikiu` `{title, text}` – Spikius Kniff (max. 1 pro Kapitel)

### Cuaderno-Übungen (`type`)
Jede Übung hat `title` (Arbeitsanweisung, gern mit kleinem Kontext: „Die Hochzeit. Hör zu und …“), `kind` (Etikett rechts: Hören, Erkennen, Entscheiden, Bilden, Erzählen, Übersetzen, Frei, Sprechen …), optional `track`, `instr` (Zusatzhinweis), `why` (Begründung, erscheint in den Lösungen – nutze das bei kniffligen Stellen!). Die Lösungen werden AUTOMATISCH aus den Daten erzeugt.

- `hear` `{track, pairs:[{opts:["pero","perro"], gloss:"aber / Hund", said:1}]}` – Minimalpaare, 4–6 Paare
- `mark` `{track?, text}` – Text mit `[[wort|LABEL]]`; Lernende schreiben das Label (z. B. B/H, M/F, S/E) ins Kästchen. In `title` erklären, was die Labels bedeuten.
- `choice` `{items:["Cuando [[!era|fui]] estudiante, …"]}` – Auswahl; die richtige Option mit `!` markieren; mehrere `[[…]]` pro Satz erlaubt
- `cloze` `{track?, text}` – Lückentext: `{{antwort|hinweis}}` (Hinweis = Infinitiv o. ä., darf fehlen: `{{antwort}}`)
- `dialog` `{track?, lines:[["Lucía", "¿{{Tienes|tener}} hambre?"], …]}` – Dialog mit Lücken
- `fill` `{items:["ping{{ü}}ino", …], cols:3, gap?:"s"|"m"|""|"l"}` – kurze Wörter/Phrasen mit Lücken im Raster
- `sort` `{words:[…], baskets:[{label, answers:[…]}]}` – Wörter in 2–3 Körbe sortieren; `words` = alle answers (Reihenfolge gemischt)
- `match` `{left:[…], right:[…], answer:[Index in right für jedes left]}` – Zuordnen (Fragen↔Antworten)
- `transform` `{example:{q,a}, items:[{q,a}]}` – Umformen
- `translate` `{items:[{de, es}]}` – Übersetzen DE→ES, 3–5 Sätze, alltagsnah
- `cards` `{start?, items:[{icon, cap?, solution}]}` – Bildkarten (3–6 Icons) als Impuls; `solution` = Musterlösung
- `free` `{text, lines, solution?}` – freies Schreiben, persönlich und konkret
- `tongue` `{track, es, de}` – Zungenbrecher / Ausspracheübung

Reihenfolge pro Abschnitt: erkennen/hören → entscheiden → bilden/erzählen → übersetzen → frei. Mindestens eine Übung ist eine kleine zusammenhängende Geschichte oder Situation (nicht nur Einzelsätze). Bei Aussprache-Abschnitten: `hear` und `tongue` sind Pflicht.

### Testfragen (`test`)
2–3 pro Abschnitt, Multiple Choice, die Lücke als `___`:
`{"q": "Ayer ___ las llaves.", "options": ["perdí", "perdía"], "answer": 0}` (answer = Index der richtigen Option). 2 oder 3 Optionen. Daraus baut der Build automatisch Test 1 (Kap. 1–4), Test 2 (5–8), Test 3 (9–13) mit Tabelle „Aufgabe → Abschnitt“.

---

## 4. Cartoon (pro Abschnitt einer)

Jeder Abschnitt öffnet mit EINEM Cartoon, dessen **Pointe die Grammatik ist** (Vorbild: Jäger und Bär – „Yo soy cazador“ / „Yo estoy hambriento“). Das Bild malt später ChatGPT; die Sprechblasen setzen wir selbst. Bis dahin steht ein Platzhalter aus 2–3 Icons.

```json
"cartoon": {
  "id": "5.5-A",
  "icons": ["1F370", "1F469-200D-1F373", "2764"],
  "bubbles": [ {"pos": "tl", "text": "¡Me gustas!"}, {"pos": "tr", "text": "…"} ],
  "gloss": "<es>tarta</es> Torte",
  "prompt": "SCENE: … (Englisch, 80–150 Wörter)"
}
```
- `bubbles`: 1–3 Sprechblasen, kurz (je max. ~45 Zeichen, `<br>` erlaubt). `pos`: tl, tr, tc, ml, mr.
- `gloss`: optional, schwierige Wörter aus den Blasen.
- `prompt`: Szenenbeschreibung auf Englisch für ChatGPT. Figuren aus dem Ensemble in GROSSBUCHSTABEN (LUCÍA, DANI, PILAR, NICO). Beschreibe Ort, Haltung, Mimik, die komische Situation, und WO im Bild Platz für die Sprechblasen bleibt. Kein Text im Bild, kein Capybara, keine Sprechblasen im Bild (der Stilsatz wird automatisch angehängt). Nur ein Bild, kein Comicstrip.
- `icons`: OpenMoji-Codes für den Platzhalter.

---

## 5. Icons und Romanzitate

**Icons**: `icon-liste.tsv` listet alle verfügbaren OpenMoji-Icons (Code, Name, Tags). Suche so:
`grep -i "phone" icon-liste.tsv | head`. Nimm den Code aus Spalte 1 (z. B. `1F4F1`, `1F469-200D-1F373`). Der Build prüft, ob das Icon existiert.

**Romanzitate** (`novela`): optional, nur wörtlich aus den spanischen Lernromanen
`/home/claude/orbiaceo/spikiu/learnroman-lukas.js` („El año de Lukas“, A1–A2, Madrid) und
`/home/claude/orbiaceo/spikiu/learnroman-lotte.js` („La vuelta de Lotte“, B1). Suche z. B.:
`grep -o 'Z("[^"]*gusta[^"]*"' /home/claude/orbiaceo/spikiu/learnroman-lukas.js | head`. Nur verwenden, wenn ein Satz die Regel wirklich schön zeigt. Höchstens ein Zitat pro Abschnitt, gern seltener. Nie erfinden.

---

## 6. Bauen und prüfen

```
cd /home/claude/buch
python3 tools/build.py --only 5 --validate     # Datenprüfung
python3 tools/build.py --only 5 --png --book GC # PDF + PNG-Vorschau nach out/png/
```
Die Ausgabe nennt Überlauf („ÜBERLAUF … +Npx“) und eingepasste Seiten. Schau dir die PNGs deiner Abschnitte an (Read-Tool auf `out/png/G-kap5-0NN.png` bzw. `C-kap5-0NN.png`). Die ersten Seiten sind Vorspann; deine Abschnitte kommen nach dem Inhaltsverzeichnis. Korrigiere, bis: keine FEHLER, kein ÜBERLAUF, Seiten sehen aufgeräumt aus.

---

## 7. Inhaltsverzeichnis Gramática A (verbindlich)

| Nr. | Thema | Stufe | Aufhänger-Idee (darfst du verbessern) |
|---|---|---|---|
| **1** | **Laute und Buchstaben** | | |
| 1.1 | Das Alphabet und die fünf Vokale | A1 | Fünf Vokale, die immer gleich klingen |
| 1.2 | Doppelvokale | A1 | aire, ciudad, bueno |
| 1.3 | C und Z | A1 | cerveza in Madrid und in Mexiko |
| 1.4 | G und J | A1 | gato, gente, guerra, pingüino / „¿Un bocadillo de yamón?“ |
| 1.5 | R und RR | A1 | pero oder perro: aber oder Hund |
| 1.6 | B, V und das weiche D | A1 | vaca und baca klingen gleich |
| 1.7 | LL, Y, Ñ, H und QU | A1 | año oder ano: die Tilde rettet Geburtstage |
| 1.8 | Betonung und Akzent | A1 | papa, papá und Papa |
| 1.9 | Satzmelodie und ¿…? ¡…! | A1 | Warum das Fragezeichen vorne steht |
| **2** | **Substantive und Artikel** | | |
| 2.1 | Männlich und weiblich | A1 | el día, la mano, el agua – die Rebellen |
| 2.2 | Der Plural | A1 | el lápiz, los lápices |
| 2.3 | Bestimmter und unbestimmter Artikel | A1 | el, la, un, una |
| 2.4 | al und del | A1 | Voy al bar statt a el bar |
| 2.5 | Wann kein Artikel steht | A1 | Soy profesor – ohne „ein“ |
| **3** | **Adjektive** | | |
| 3.1 | Angleichung | A1 | la casa blanca, los coches blancos |
| 3.2 | Vor oder nach dem Nomen | A2 | un gran hombre / un hombre grande |
| 3.3 | Vergleichen | A2 | más alto que, tan alto como, mejor, peor |
| 3.4 | Die Endung -ísimo | A2 | Está buenísimo |
| 3.5 | muy und mucho, bien und bueno | A1 | Estoy muy bien, nicht muy bueno |
| **4** | **Pronomen I** | | |
| 4.1 | Ich, du, Sie, ihr | A1 | Warum Spanier yo weglassen; Randkasten vosotros/ustedes, vos |
| 4.2 | Mein, dein, sein | A1 | su casa: seine, ihre oder Ihre? |
| 4.3 | Dies und das | A1 | este, ese, aquel – nah, mittel, weit |
| **5** | **Das Verb im Präsens** | | |
| 5.1 | Regelmäßige Verben auf -ar, -er, -ir | A1 | hablo, como, vivo |
| 5.2 | Verben, die den Stamm ändern | A1 | quiero, puedo, pido |
| 5.3 | Die wichtigen Unregelmäßigen | A1 | tengo, hago, salgo, voy, digo |
| 5.4 | Reflexive Verben | A1 | Me levanto, me ducho, me arrepiento |
| 5.5 | gustar und Verwandte | A1 | ¡Me gustas! – Vorsicht, Liebeserklärung |
| **6** | **Ser, estar, hay** | | |
| 6.1 | ser oder estar | A1 | Soy aburrido / estoy aburrido |
| 6.2 | hay oder está | A1 | Hay un banco / el banco está |
| 6.3 | estar + -ando/-iendo | A1 | Estoy comiendo, no me molestes |
| **7** | **Fragen, Nein, Zahlen, Zeit** | | |
| 7.1 | Fragewörter | A1 | qué, quién, dónde, cuándo, cómo, por qué |
| 7.2 | Verneinung | A1 | No sé nada – doppelt Nein ist richtig |
| 7.3 | Zahlen, Uhrzeit, Datum | A1 | Son las dos, es la una |
| **8** | **Präpositionen** | | |
| 8.1 | a, en, de, con | A1 | en el coche, a pie |
| 8.2 | por und para – Grundlagen | A2 | Gracias por todo, esto es para ti |
| 8.3 | Das persönliche a | A2 | Veo a María, veo la casa |
| **9** | **Objektpronomen** | | |
| 9.1 | lo, la, le | A2 | Lo veo, le doy un libro |
| 9.2 | Zwei Pronomen zusammen | A2 | Se lo doy – warum aus le lo ein se lo wird |
| 9.3 | Wohin mit dem Pronomen? | A2 | Lo quiero ver oder quiero verlo |
| **10** | **Zukunft** | | |
| 10.1 | ir a + Infinitiv | A1 | Voy a aprender español. Mañana. |
| 10.2 | Das Futur | A2 | Viviré en una playa |
| **11** | **Vergangenheit I** | | |
| 11.1 | Das Perfekt | A2 | He comido demasiado |
| 11.2 | Indefinido regelmäßig | A2 | Ayer hablé con ella |
| 11.3 | Indefinido unregelmäßig | A2 | fui heißt „ich ging“ und „ich war“ |
| 11.4 | Imperfecto | A2 | Cuando era niño, comía tierra |
| 11.5 | Indefinido oder Imperfecto? | A2 | (Goldbeispiel – schon fertig) |
| 11.6 | Perfekt oder Indefinido? | A2 | Randkasten: Madrid und Mexiko zählen die Zeit anders |
| **12** | **Imperativ** | | |
| 12.1 | Bejaht: tú und usted | A2 | ¡Ven! ¡Siéntese! |
| 12.2 | Verneint (Vorschau auf den Subjuntivo) | A2 | ¡No vengas! |
| **13** | **Sätze verbinden** | | |
| 13.1 | y, pero, porque, cuando | A1 | y wird zu e: padre e hijo |
| 13.2 | que und donde als Relativwörter | A2 | El libro que leo, la ciudad donde vivo |
| 13.3 | también und tampoco | A1 | A mí tampoco |

Kapitel- und Abschnittstitel (Spalte „Thema“) übernimmst du so. Die Reihenfolge der Kapitel ist didaktisch gewollt; beachte, was vorher schon gelernt ist (Präsens kommt erst in Kap. 5 – in Kap. 1–4 nur einfache Sätze mit ser/estar/tener als feste Wendungen und Übersetzung).
