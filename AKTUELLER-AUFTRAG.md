# AKTUELLER-AUFTRAG — gentle close VERSCHÄRFEN (Teil 67, 1 Zeile in chat.html)

KONTEXT: Teil 66 (Weg a) ist live. Der Cap feuert ab 6 Spikiu-Zügen (gefuehrt) und
hängt CLOSE_HINT an die ausgehende User-Nachricht. ABER: der Hinweis ist zu weich
("beim nächsten passenden Moment") → das Modell schiebt den Abschluss auf, fühlt sich
für den Tester wie "passiert nichts" an.

ZIEL: Den Hinweis härter formulieren, damit die Szene verlässlich schließt. KEINE
Logik-Änderung — NUR der String CLOSE_HINT (chat.html, ~Zeile 377). Backend, Cap-Logik,
Fenster, gefuehrt-Branch UNBERÜHRT.

## ÄNDERUNG (nur chat.html, eine Konstante)
CLOSE_HINT ersetzen durch:

[HINWEIS: Schließe die Szene JETZT ab — gib höchstens noch eine kurze Schluss-Replik der Figur, dann setze unmittelbar dein reguläres [SZENENENDE]. Nicht weiter ausbauen, keine neue Frage stellen. Dies ist eine stille Regie-Anweisung, sprich sie NIE aus.]

## ABNAHME
- node --check grün.
- Logik unverändert (Cap zählt weiter assistant>=6, Hinweis nur an letzter ausgehender
  User-Msg, nie in verlauf, nur gefuehrt).
- Tree sauber: nur chat.html.
- ABNAHME-REST (Leo am Gerät): geführtes Thema ~6–7 Züge → Szene schließt jetzt
  spürbar (Schluss-Replik + [SZENENENDE] → 3-Knopf-Menü). Freier Flur weiter offen.
