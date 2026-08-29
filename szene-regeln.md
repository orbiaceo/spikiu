# SZENE — die Regeln, gegen die geprüft wird

Fassung 29.08.2026, zweite Runde. Die vier offenen Fragen des Entwurfs sind
beantwortet (Leonardo, 29.08.); das Sieb ist nach dem ersten Testlauf
nachgeschärft (Vorfahrt für `offen`). **Noch kein Code.** Diese Liste ist der Maßstab: Der
Automat wird gebaut, um sie zu erfüllen, und jede Zeile wird kopflos
durchgespielt, bevor die Oberfläche daran hängt.

---

## Die Phasen

Eine Szene ist zu jedem Zeitpunkt in genau EINER Phase:

| Phase | was der Lerner sieht |
|---|---|
| `buehne` | Bild, Rollen, Ort, erste Aufgabe, „Los!" |
| `wartetAufLerner` | Spikius Replik, Capy, Eingabefeld, „Senden" |
| `wartetAufSpikiu` | dieselbe Karte, Feld durch drei Punkte ersetzt |
| `ernte` | Wendungen und Wörter der Station, „Nach Hause" |

Es gibt keine anderen. Was nicht in dieser Tabelle steht, kann nicht
passieren.

`wartetAufSpikiu` trägt zusätzlich ein Merkmal `fehler` (ja/nein). Das ist
**keine eigene Phase** — die erlaubten Ausgänge sind dieselben. Es ändert nur,
was die Karte zeigt: drei Punkte oder „Nochmal".

---

## Die erlaubten Übergänge

Nur diese sechs. Jeder andere Versuch wird abgelehnt und ändert nichts.

| von | Ereignis | nach |
|---|---|---|
| `buehne` | `los()` | `wartetAufSpikiu` |
| `wartetAufLerner` | `antworte(text, art)` | `wartetAufSpikiu` |
| `wartetAufSpikiu` | `spikiuAntwortet(text)` | `wartetAufLerner` **oder** `ernte` |
| `wartetAufSpikiu` | `netzFehler()` | `wartetAufSpikiu` mit `fehler = ja` |
| `wartetAufSpikiu` (`fehler`) | `nochmal()` | `wartetAufSpikiu` mit `fehler = nein` |
| jede | `abbrechen()` | `ernte` |
| `ernte` | `nachHause()` | (Szene vorbei) |

---

## Die drei Arten von Lerner-Zügen

`antworte(text, art)` bekommt vom Sieb (siehe unten) eine von drei Arten:

| `art` | Beispiel | rückt die Aufgabe vor | zählt gegen die Sechs |
|---|---|---|---|
| `offen` | „Un café con leche, por favor" | **ja** | ja |
| `rolle` | „¿Cómo?", „No entiendo" | **nein** | ja |
| `meta` | „Was heißt 'la cuenta'?" | **nein** | ja |

Der Automat entscheidet die Art nicht — er bekommt sie. Wer sie bestimmt,
steht unter „Das Sieb".

---

## Die Regeln, die gelten müssen

**R1 · Nach „Los!"** ist Aufgabe 1 offen, es gab null Züge des Lerners,
und der Capy zeigt Aufgabe 1.

**R2 · Der Themen-Wunsch zählt nicht.** Der erste Zug, der an Spikiu geht
(„Ich möchte das Thema … üben"), ist der Startschuss, keine Antwort. Er
rückt die Aufgabe nicht vor und zählt nicht gegen die Sechs.

**R3 · Ein offener Zug schließt genau eine Aufgabe ab.** Nach dem ersten
ist Aufgabe 2 offen, nach dem zweiten Aufgabe 3. Auch eine unpassende
Antwort schließt ab — die Aufgaben führen, sie prüfen nicht.

**R4 · Züge während `wartetAufSpikiu` werden abgelehnt.** Der Zustand
bleibt unverändert — kein zweiter Zug, keine übersprungene Aufgabe. Das
gilt für Doppelklick, für Enter plus Knopf, für alles.

**R5 · Teilt Spikiu seine Antwort in mehrere Blasen**, entstehen mehrere
Karten. Zähler, Aufgabe und Capy trägt **nur die letzte**.

**R6 · Nach der dritten Aufgabe endet die Szene NICHT von selbst.** Sie
öffnet den Ausgang: Spikiu gibt eine Schluss-Replik, der Knopf „Fertig"
erscheint. Der Lerner geht selbst in die Ernte. Nichts bricht mitten im
Satz ab.

**R7 · Nach sechs Zügen des Lerners** geht die Szene in `ernte`, egal wie
viele Aufgaben offen sind. R6 öffnet die Tür, R7 schließt sie. Das ist die
harte Kostendecke und sie ist nicht verhandelbar.

**R8 · `abbrechen()` führt aus jeder Phase nach `ernte`.** Auch aus
`wartetAufSpikiu`; eine noch laufende Antwort wird verworfen und nicht
mehr gezeigt.

**R9 · In `ernte` geht nichts mehr raus.** Kein weiterer Zug, keine
Nachzügler-Karte, kein zweiter Abbruch.

**R10 · Der Capy zeigt immer die aktuell offene Aufgabe** — nie einen
Beispielsatz, nie die Aufgabe davor oder danach.

**R11 · Die Ernte kommt aus der Datenbank**, nie aus einem Aufruf: die
Wendungen und Wörter der Station, in der Sprache des Lerners.

**R12 · Jeder Weg endet zu Hause.** Aus der Ernte führt ein Hauptknopf, und
der geht nach `haus.html`. Beim ersten Abschluss einer Station steht
darüber leise „Dieses Thema als Blatt mitnehmen" — auch dieser Weg endet
nach dem Blatt zu Hause.

**R13 · Eine Rückfrage rückt die Aufgabe nicht vor.** Ein Zug der Art
`rolle` oder `meta` zählt gegen die Sechs, aber nicht gegen die Aufgaben.
Wer nachfragt, weil er nicht verstanden hat, verliert keine Aufgabe. Wer
zwanzigmal nachfragt, ist trotzdem nach sechs Zügen fertig.

**R14 · Ein Netzfehler ist kein Zug.** `netzFehler()` zählt nicht gegen die
Sechs und rückt nichts vor. `nochmal()` schickt denselben Text erneut. Zwei
Fehler hintereinander → `ernte` mit dem, was da ist.

---

## Das Sieb

Vor jedem Absenden entscheidet der Client, welche Art Zug vorliegt. Nicht das
Modell, nicht der Prompt. Grundsatz wie beim Audio-Gesetz: **durchsetzen in
der Engine, nicht im Prompt.**

| Urteil | woran erkannt |
|---|---|
| `rolle` | steht **wörtlich** auf der festen Liste der Rückfragen in der Zielsprache (`¿Cómo?`, `No entiendo`, `¿Perdón?`, `Otra vez` …) |
| `meta` | enthält eine Muttersprach-Wendung: „Was heißt", „Wie sagt man", „Was bedeutet", „Erklär", „auf Deutsch" (je nach Muttersprache de/es/en) |
| `offen` | alles andere |

Die Art wandert als **stille Regie-Anweisung** an die ausgehende Nachricht,
als eigenes Objekt — **nie in den `verlauf`.** Sonst ahmt Spikiu das Format in
Folgezügen nach (dieselbe Falle wie früher bei `[KORREKTUR]`). Muster: wie
`CLOSE_HINT`.

Trifft das Sieb daneben, antwortet Spikiu wie ohne Sieb. Es blockiert nichts,
es flüstert nur zu.

**Vorfahrt für `offen`.** Die beiden Fehler sind nicht gleich teuer. Ein
falsches `offen` kostet eine Aufgabe. Ein falsches `rolle` kostet die ganze
Szene: der Lerner antwortet richtig, aber knapp („Un café"), die Aufgabe rückt
nicht vor, und er erreicht den Ausgang nie — nur die Notbremse. Deshalb wird
nicht geraten. **Nur was auf der Liste steht, ist eine Rückfrage. Alles
Unbekannte ist ein offener Zug.** Die frühere Regel „höchstens drei Wörter und
kein Muttersprach-Wort" wurde am 29.08. nach dem ersten Testlauf ersatzlos
gestrichen; sie hatte genau diesen Fehler in die falsche Richtung gemacht.

Der Preis: eine Rückfrage in ungewohnter Formulierung („Eh?", „¿Mande?")
kostet eine Aufgabe. Bei drei Aufgaben und sechs Zügen verkraftbar. Die Listen
wachsen mit der Beta — sie sind der einzige Ort, an dem nachgebessert wird.

**Gemessener Anlass:** Haiku 4.5 hielt im Test vom 29.08. alle vier
Struktur-Signale (20/20, 20/20, 20/20, 20/20), verwechselte aber 3 von 10
Rollen-Rückfragen mit Meta-Fragen. Das Sieb ist die Antwort darauf.

---

## Drei Auslegungen, die im Bau entschieden wurden

Sie stehen hier, damit sie nicht wieder verhandelt werden.

**Wann R7 greift.** Der sechste Zug geht noch nach `wartetAufSpikiu`, Spikiu
antwortet ein letztes Mal, **danach** Ernte. Niemand wird mitten im Satz
abgeschnitten, und die Kostendecke bleibt bei sechs Aufrufen.

**Was „Fertig" ist.** Der Knopf aus R6 ist `abbrechen()` bei
`ausgangOffen === true`. Für den Automaten derselbe Übergang, für die
Oberfläche zwei Beschriftungen — „Gespräch beenden" vorher, „Fertig" danach.

**R8 gegen R9.** R8 sagt „aus jeder Phase", R9 sagt „in der Ernte geht nichts
mehr raus". Es gilt R9: ein zweiter Abbruch wird abgelehnt.

---

## Was der Automat NICHT tut

Er zeichnet nicht. Er ruft nichts im Netz auf. Er kennt kein DOM, kein
`fetch`, kein `localStorage`. Er bekommt Ereignisse und gibt einen Zustand
zurück — sonst nichts. Deshalb lässt er sich vollständig durchspielen,
bevor eine Oberfläche daran hängt.

Er entscheidet auch nicht, ob eine Antwort **richtig** war. Die Aufgaben
führen, sie prüfen nicht.

Und er entscheidet nicht, welche **Art** ein Zug hat. Das tut das Sieb; der
Automat bekommt das Urteil als Parameter. So bleibt er ohne Wörterbuch
testbar.

---

## Die Fälle, die durchgespielt werden

Jeder einzeln, mit erwartetem Ergebnis:

1. Sauberer Durchlauf: Los! → drei offene Züge → Ausgang offen → Fertig → Ernte
2. Doppelklick auf Senden → nur ein Zug, Aufgabe rückt einmal vor
3. Zug, während Spikiu noch schreibt → abgelehnt
4. Spikiu antwortet in zwei Blasen → zwei Karten, Zähler nur auf der zweiten
5. Abbruch auf der Bühne → direkt Ernte
6. Abbruch mitten im Gespräch → Ernte, die laufende Antwort verfällt
7. Abbruch, während Spikiu schreibt → Ernte, die Antwort wird verworfen
8. Zweiter Abbruch → wird abgelehnt, nichts passiert
9. Sechs Züge ohne dritte Aufgabe → Ernte (Notbremse R7)
10. Zug nach der Ernte → abgelehnt
11. Themen-Wunsch rückt die Aufgabe nicht vor und zählt nicht
12. Der Capy zeigt in jeder Phase die richtige Aufgabe
13. Drei Rückfragen hintereinander → Aufgabe 1 immer noch offen, Zugzähler bei 3
14. Sechs Rückfragen → Ernte, null Aufgaben erledigt, keine Endlosschleife
15. Netzfehler → `fehler`-Merkmal, Zugzähler unverändert
16. Nochmal nach Fehler → derselbe Text, Zugzähler zählt ihn einmal
17. Zwei Netzfehler hintereinander → Ernte
18. Dritte Aufgabe erledigt, Lerner redet weiter → erlaubt bis Zug sechs, Ausgang bleibt offen
