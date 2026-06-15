# SPIKIU — BUILD-LEDGER
_Claudes eigene autoritative Liste. Leonardo editiert nie Code — die hier
gelistete Version ist die Wahrheit. Claude pflegt diese Liste bei JEDEM Schritt._

Stand: 15.06.2026 (abends — Schreib-Werkstatt-Sitzung)

---

## ARBEITSREGELN MIT LEONARDO (Terminal-Workflow)

- **Downloads:** Leonardo lädt alles nach `~/spikiu_downloads`. Jeder Kopier-Befehl:
  `cp ~/spikiu_downloads/<datei> ~/projects/spikiu/...`
- **xclip:** An JEDEN Befehl, dessen Output Claude braucht, anhängen:
  `... | xclip -selection clipboard`. Dann fügt Leonardo nur ein.
- Leonardo editiert nie Code. Claude liefert komplette Dateien via `present_files`.

---

## DER DATEN-VERTRAG (das, was heute den Schaden gemacht hat)

Der Lernweg fließt durch DREI Dateien. Sie MÜSSEN dieselbe Struktur sprechen:

```
assessment.html          ──speichert─▶  spikiu_user { profile, roadmapPending:true }  (KEIN roadmap)
                         ──springt────▶  dashboard.html  (sofort, kein Warte-Screen)
dashboard.html           ──ruft────────▶  /api/generate-learningpath  (im Hintergrund)
generate-learningpath.js ──liefert────▶  { roadmap: { meta, page1, page2 } }
dashboard.html           ──speichert───▶  spikiu_user.roadmap = { meta, page1, page2 }
                         ──liest───────▶  user.roadmap.page2  (sonst "Lernweg nicht gefunden")
```

REGEL: Wird EINE dieser drei angefasst, wird der Vertrag (page1/page2) geprüft.
Die alte Form hieß `phases` — die ist TOT. Niemals zurück auf `phases`.

---

## DATEI-STATUS

| Datei | Letzte Claude-Version | Vertrag | Deploy nötig |
|---|---|---|---|
| `spikiu-seele.md` | NEU: kanonische Seele, eingefroren 15.06., positiv geführt + Niemals-Liste | — (Quelle der Wahrheit) | ⬆️ ins Project + GitHub dev |
| `lektor-modus.md` | NEU: Schreib-Werkstatt Raum-Prompt. Commit 5c9a92b, 142 Zeilen | koennen + fremde_schrift + aufgabe | ✅ committed origin/dev |
| `index.html` | NEU: Landing, Sprach-Switcher, → assessment.html | — | ✅ deployed |
| `assessment.html` | NEU (Opt.B): 7 Karten → speichert nur Profil → springt SOFORT ins Dashboard | profile/roadmapPending | 🔨 JETZT hochladen |
| `generate-learningpath.js` | NEU: Antrieb→Syllabus, gibt page1/page2 | page1/page2 | ⚠️ prüfen ob live |
| `dashboard.html` | page1/page2-Migration committet (15.06.), DE/ES/EN lokalisiert; liest page1/page2 | page1/page2 | ✅ deployed (dev) |
| `chat.html` | ALT: macht eigenes Onboarding („What's your name?") | — | 🔨 Problem 2 — Fix offen |
| `nav.js` | NEU: Slot-Mode, self-mounting | — | ⏳ noch in keine Seite integriert |
| `capy-spruch.html` | Prototyp (approved) | — | ⏳ noch nicht integriert |

---

## OFFENE PUNKTE (Reihenfolge)

1. ✅ **Problem 1 — Lernweg (dashboard-Teil):** page1/page2-Migration in `dashboard.html`
   am 15.06. committet+gepusht. OFFEN bleibt nur: `assessment.html` deployen +
   Assessment FRISCH durchlaufen (alter `phases`-localStorage hat kein page2).
2. 🔨 **Problem 2 — echter Chat:** `chat.html` so umbauen, dass es bei vorhandenem
   `spikiu_user`-Profil das Onboarding ÜBERSPRINGT und direkt die Companion-Charla
   öffnet: „Hallo [Name], was möchtest du lernen oder üben?" in Muttersprache.
3. ⏳ `nav.js` in alle App-Seiten (Slot-Mode), alte Navis raus.
4. ⏳ Capy (Atmen + Spruch + Audio) in Landing/Dashboard.
5. ⏳ ElevenLabs-Audio (Starter 5 $/Mt., Cohort-Caching).
6. ⏳ Dashboard „3 capítulos" → „4". Legal AGB/DSGVO/Impressum vor Juli.

---

## MERKREGELN GEGEN DAS HEUTIGE CHAOS

- Beim Anfassen einer der drei Lernweg-Dateien: Vertrag page1/page2 prüfen.
- Schreib-Werkstatt-Einstieg (beschlossen): Aufgabe zuerst. `aufgabe` gesetzt →
  direkt nutzen. `aufgabe` null → EINE Frage „Was möchtest du schreiben können?".
  Nie zwei Fragen, nie Übung/Quiz vor dem ersten Text.
- Ein Revert ist auch eine Änderung — hier eintragen, sonst geht der Kontext verloren.
- Wenn Kontext komprimiert wird: aus Transcript + outputs + dieser Liste rekonstruieren.
  NIE Leonardo nach Dateien fragen.

---

## ÜBERGABE → NÄCHSTER CHAT (Stand 15.06.2026, abends)

### Diese Sitzung: SCHREIB-WERKSTATT — Lektor-Charakter geformt + Prompt gebaut

Das Herz war beschlossen offen: was tut der Lektor, NACHDEM der Lerner schreibt.
Geklärt und in `lektor-modus.md` gegossen (committed, origin/dev):

- **Handgriff nach dem Text:** 1 Leser-Zeile (Sinn zuerst) → EINE Sache (höchster
  Hebel, Rest liegen lassen) → am Fleck im Zitat des Lerners → zurück in seine Hände.
- **Anti-Schule-Mauer:** nie den ganzen Text anstreichen, nie abstrakte Regel,
  eine Sache pro Runde. WIE VIEL ist die Mauer, nicht OB gezeigt wird.
- **Der Regler (zeigen vs. ringen lassen):** hart nach `koennen`. Default ZEIGEN,
  im Zweifel ZEIGEN (Frust schließt das Fenster).
- **Schleife (neue Fassung kommt zurück):** Treffer / Beinah / Steckengeblieben.
  Steckengeblieben → Form geben + abschreiben lassen, NICHT nochmal fragen.
  Max 2 Anläufe pro Sache, dann geben und weiter (Vorwärts schlägt Perfektion).
- **Ziellinie:** Text tut seine Aufgabe, Messlatte nach `koennen`. Dann Lektion anbieten.

### ARCHITEKTUR-KLÄRUNG (größer als der Lektor — gilt fürs ganze Produkt)

Beim Lektor-Bau einen Konstruktionsfehler im Assessment freigelegt:

- **Der Baum (Samen→Stamm→Krone) ist KEINE Proficiency-Note.** Er ist 0–100%
  Fortschritt auf EIN konkretes Versprechen. JEDER Weg startet am Samen, Krone =
  Versprechen erfüllt. Tourist (6 Mt. Spanisch) und Philosoph (Null→C2) beginnen
  BEIDE am Samen — Vorwissen macht den Weg kürzer, nicht den Start höher. KEIN GER
  im Frontend, nie A1/B2 sichtbar.
- **CEFR ist nur das interne Lineal**, mit dem `generate-learningpath` die Länge
  des Wegs absteckt. Nie sichtbar, nie Startpunkt.
- **Neues Ziel nach erreichter Krone:** neuer Weg, neuer Baum startet wieder am
  Samen. Das Können trägt sich weiter, der Baum setzt relativ zum neuen Ziel zurück.
- **Zwei Profil-Felder, sauber getrennt:**
  - `etappe` (samen|stamm|krone) = SICHTBAR, Fortschritt aufs Ziel, steuert Backend NICHTS.
  - `koennen` (anfang|mittel|fortgeschritten) = INTERN, steuert den Lektor (Regler
    + Schrift-Brücke + Messlatte). Existiert im Profil noch NICHT.

### SCHULD vor dem ersten Test der Schreib-Werkstatt (eigenes Paket!)
`assessment.html` schreibt heute `level: A1/B1` (Rohwert, falscher Schlüssel,
verletzt Niemals-Liste). Vor Test der Werkstatt muss das Assessment setzen:
- `koennen` = anfang|mittel|fortgeschritten
- `fremde_schrift` = true|false (el → true)
Das ist ein EIGENES Paket (Assessment-Umbau + Lifecycle: Versprechen erfassen,
Baum-Reset bei neuem Ziel). NICHT mit der Schreib-Werkstatt mischen.

### NÄCHSTES ARBEITSPAKET (eigener Chat): OBERFLÄCHEN-PROTOTYP Schreib-Werkstatt
Backend-Prompt steht. Als Nächstes die Oberfläche, wo der Lerner tippt, seinen
Text stehen sieht, die Lektor-Antwort liest. NEUE REGEL VON LEONARDO: vor jedem
Code einer neuen Schnittstelle / jedem Visuellen → erst HTML-Prototyp zum Anfassen,
dann Code. Reihenfolge: 1) Prototyp 2) kritisieren 3) Code der beides verbindet.

### Griechisch / fremde Schrift
Sprache ist ein Feld. Griechisch (`el`) kommt mit. Bei fremder Schrift dritte Spur
am `anfang` (Ziel / [Lautschrift] / Übersetzung), bei `mittel` zwei, bei
`fortgeschritten` nur Ziel. Ein konsistentes Umschrift-System. Skaliert gratis auf
Russisch (gleiche Mechanik). Tester (Deutsche lernen Griechisch) warten aufs System.

### Quelle der Wahrheit
- `spikiu-seele.md` — EINGEFROREN. Jeder Raum-Prompt erbt von ihr, nie kopiert.
- `lektor-modus.md` — Schreib-Werkstatt-Schicht, erbt von der Seele.

### EISERNE REGEL
Eine Sitzung endet NIE mit uncommittetem Code. Am Sitzungsende IMMER: Commits geben
+ diese Übergabe aktualisieren. Ein Chat = ein Arbeitspaket, bewusst beendet.
