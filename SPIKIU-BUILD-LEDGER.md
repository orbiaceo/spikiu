# SPIKIU — BUILD-LEDGER
_Claudes eigene autoritative Liste. Leonardo editiert nie Code — die hier
gelistete Version ist die Wahrheit. Claude pflegt diese Liste bei JEDEM Schritt._

Stand: 15.06.2026

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
- Ein Revert ist auch eine Änderung — hier eintragen, sonst geht der Kontext verloren.
- Wenn Kontext komprimiert wird: aus Transcript + outputs + dieser Liste rekonstruieren.
  NIE Leonardo nach Dateien fragen.

---

## ÜBERGABE → NÄCHSTER CHAT (Stand 15.06.2026, Mittag)

### Wo wir stehen — frischer Architektur-Beschluss
Spikiu wird zur **WERKSTATT** umgebaut. Beschlossen in diesem Chat:

- **Fünf Räume (Talleres)**, gebaut auf EINER geteilten Seele:
  - Mündlich (Mutter-Prinzip): Freies Gespräch · Mündlicher Ausdruck · Hörverständnis
  - Schriftlich (Meister-Prinzip): Lesen (Reader existiert) · Schreiben
- **Freies Gespräch = der FLUR** (Modell C): Einstieg läuft immer hierdurch.
  Aus dem Gespräch heraus schlägt Spikiu Raumwechsel vor, wenn es eine
  Stolperstelle sieht, die zum Lernpfad passt. Lerner wählt nie aus einem Menü.
- **Zielsprache ist ein FELD, kein Datei-Schnitt.** Darum: 5 Räume, nicht 15 Welten.
  EINE Chat-Hülle, Prompt wird geschichtet: Seele + Raum-Modus + Sprache + Profil.
  KEINE getrennten Dateien pro Sprache mehr (chat-german/spanish/english → zusammen).
- **Griechisch + Russisch** kommen beim Umbau gratis mit (Sprache = Feld).
  Tester (Familie lernt Griechisch, Kollegin Russisch) WARTEN aufs fertige System.
  Bei jedem Raum stille Testfrage: „funktioniert das auch für fremde Schrift?“

### Quelle der Wahrheit
- `spikiu-seele.md` — EINGEFROREN, positiv geführt + Niemals-Liste. Auf dev + Project.
  Jeder Raum-Prompt erbt von ihr. Verfeinerung NUR dort, nie kopiert.
- UML-Studie (Denkwerkzeug, nicht Produktion): `spikiu-werkstatt-uml.html` in outputs.

### NÄCHSTES ARBEITSPAKET (eigener Chat): SCHREIB-WERKSTATT
Konzept-Stand, schon beschlossen:
- **Einstieg:** Aufgabe zuerst. Aus dem Flur geschickt → Spikiu nimmt die beobachtete
  Stolperstelle als Aufgabe. Kalt betreten → EINE Frage („Was möchtest du schreiben
  können?“), daraus sofort die Aufgabe. Nie zwei Fragen, nie Quiz vor dem Schreiben.
- **OFFEN, hier weitermachen:** Was tut der Lektor, NACHDEM der Lerner geschrieben hat?
  (Das ist das Herz des Lektor-Charakters.) Erinnerung an die rote Linie aus der Seele:
  am konkreten Satz erklären, nie abstrakte Regel. Sonst ist die Schule zurück.
- Reiner Text, existiert noch nicht → sicherster Pilot, kann nichts Laufendes brechen.

### EISERNE REGEL (aus dem heutigen Schmerz gelernt)
Eine Sitzung endet NIE mit uncommittetem Code. Das dashboard-Chaos kam genau daher:
page1/page2-Migration lag wochenlang uncommittet im Stash. Am Sitzungsende IMMER:
Commits geben + diese Übergabe aktualisieren. Ein Chat = ein Arbeitspaket, bewusst
beendet, bevor das Fenster „Platz macht“.
