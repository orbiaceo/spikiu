# SZENE — die Regeln, gegen die geprüft wird

Entwurf 19.08.2026. **Noch kein Code.** Diese Liste ist der Maßstab: Der
Automat wird gebaut, um sie zu erfüllen, und jede Zeile wird kopflos
durchgespielt, bevor die Oberfläche daran hängt.

Lies sie durch und sag, was fehlt, falsch ist oder anders sein soll.

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

---

## Die erlaubten Übergänge

Nur diese fünf. Jeder andere Versuch wird abgelehnt und ändert nichts.

| von | Ereignis | nach |
|---|---|---|
| `buehne` | `los()` | `wartetAufSpikiu` |
| `wartetAufLerner` | `antworte(text)` | `wartetAufSpikiu` |
| `wartetAufSpikiu` | `spikiuAntwortet(text)` | `wartetAufLerner` **oder** `ernte` |
| jede | `abbrechen()` | `ernte` |
| `ernte` | `nachHause()` | (Szene vorbei) |

---

## Die Regeln, die gelten müssen

**R1 · Nach „Los!"** ist Aufgabe 1 offen, es gab null Züge des Lerners,
und der Capy zeigt Aufgabe 1.

**R2 · Der Themen-Wunsch zählt nicht.** Der erste Zug, der an Spikiu geht
(„Ich möchte das Thema … üben"), ist der Startschuss, keine Antwort. Er
rückt die Aufgabe nicht vor.

**R3 · Jede Antwort des Lerners schließt genau eine Aufgabe ab.** Nach der
ersten Antwort ist Aufgabe 2 offen, nach der zweiten Aufgabe 3.

**R4 · Antworten während `wartetAufSpikiu` werden abgelehnt.** Der Zustand
bleibt unverändert — kein zweiter Zug, keine übersprungene Aufgabe. Das
gilt für Doppelklick, für Enter plus Knopf, für alles.

**R5 · Teilt Spikiu seine Antwort in mehrere Blasen**, entstehen mehrere
Karten. Zähler, Aufgabe und Capy trägt **nur die letzte**.

**R6 · Nach der dritten Antwort** geht die Szene in `ernte`, egal wie
Spikiu geantwortet hat.

**R7 · Nach sechs Zügen des Lerners** geht die Szene in `ernte`, auch wenn
weniger als drei Aufgaben erledigt sind. (Kann nur eintreten, wenn R3
verletzt wäre — die Regel ist die Notbremse.)

**R8 · `abbrechen()` führt aus jeder Phase nach `ernte`.** Auch aus
`wartetAufSpikiu`; eine noch laufende Antwort wird verworfen und nicht
mehr gezeigt.

**R9 · In `ernte` geht nichts mehr raus.** Kein weiterer Zug, keine
Nachzügler-Karte, kein zweiter Abbruch.

**R10 · Der Capy zeigt immer die aktuell offene Aufgabe** — nie einen
Beispielsatz, nie die Aufgabe davor oder danach.

**R11 · Die Ernte kommt aus der Datenbank**, nie aus einem Aufruf: die
Wendungen und Wörter der Station, in der Sprache des Lerners.

**R12 · Jeder Weg endet zu Hause.** Aus der Ernte führt genau ein Knopf,
und der geht nach `haus.html`.

---

## Was der Automat NICHT tut

Er zeichnet nicht. Er ruft nichts im Netz auf. Er kennt kein DOM, kein
`fetch`, kein `localStorage`. Er bekommt Ereignisse und gibt einen Zustand
zurück — sonst nichts. Deshalb lässt er sich vollständig durchspielen,
bevor eine Oberfläche daran hängt.

Er entscheidet auch nicht, ob eine Antwort **richtig** war. Die Aufgaben
führen, sie prüfen nicht.

---

## Die Fälle, die durchgespielt werden

Jeder einzeln, mit erwartetem Ergebnis:

1. Sauberer Durchlauf: Los! → drei Antworten → Ernte
2. Doppelklick auf Senden → nur ein Zug, Aufgabe rückt einmal vor
3. Antwort, während Spikiu noch schreibt → abgelehnt
4. Spikiu antwortet in zwei Blasen → zwei Karten, Zähler nur auf der zweiten
5. Abbruch auf der Bühne → direkt Ernte
6. Abbruch mitten im Gespräch → Ernte, die laufende Antwort verfällt
7. Abbruch, während Spikiu schreibt → Ernte, die Antwort wird verworfen
8. Zweiter Abbruch → wird abgelehnt, nichts passiert
9. Sechs Züge ohne dritte Aufgabe → Ernte (Notbremse)
10. Zug nach der Ernte → abgelehnt
11. Themen-Wunsch rückt die Aufgabe nicht vor
12. Der Capy zeigt in jeder Phase die richtige Aufgabe

---

## Was ich von dir brauche

**Fehlt eine Regel?** Besonders: Was soll passieren, wenn Spikiu gar nicht
antwortet (Netzfehler)? Heute gibt es „Nochmal" — bleibt das?

**Ist R3 richtig so?** Jede Antwort schließt eine Aufgabe ab, auch eine
unpassende. Der Lerner bestellt „a la China" und die Aufgabe gilt trotzdem
als erledigt. Das ist die Entscheidung „führen, nicht prüfen" — aber es ist
eine Entscheidung, keine Selbstverständlichkeit.

**Ist R7 die richtige Zahl?** Sechs Züge bei drei Aufgaben heißt: doppelt so
viel Spielraum wie nötig. Bei R3 kann sie ohnehin nie greifen.

**Und: soll die Ernte wirklich das Ende sein?** Oder gehört dorthin noch das
Lektionsblatt aus b) — „Dieses Thema als Blatt mitnehmen"?
