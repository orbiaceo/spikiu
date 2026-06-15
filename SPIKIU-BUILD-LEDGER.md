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
| `dashboard.html` | NEU (Opt.B): baut Lernweg im Hintergrund („wird gebaut…"), zeigt ihn dann; liest page1/page2 | page1/page2 | 🔨 JETZT hochladen |
| `chat.html` | ALT: macht eigenes Onboarding („What's your name?") | — | 🔨 Problem 2 — Fix offen |
| `nav.js` | NEU: Slot-Mode, self-mounting | — | ⏳ noch in keine Seite integriert |
| `capy-spruch.html` | Prototyp (approved) | — | ⏳ noch nicht integriert |

---

## OFFENE PUNKTE (Reihenfolge)

1. 🔨 **Problem 1 — Lernweg:** `assessment.html` (page1/page2) deployen + Assessment
   FRISCH durchlaufen (alter `phases`-Eintrag im localStorage hat kein page2).
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
