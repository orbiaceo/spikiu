# AKTUELLER AUFTRAG
_Die EINE Sache, die als Nächstes dran ist. Kurz und fokussiert._
_Volle Historie + alle Datei-Stände stehen im SPIKIU-BUILD-LEDGER.md._
_Claude liest beim Start: CLAUDE.md → SPIKIU-BUILD-LEDGER.md → diese Datei._

Stand: 17.06.2026

---

## ✅ GERADE ABGESCHLOSSEN (17.06.)
Alle Schulden der 16.06.-Bauten getilgt und LIVE bestätigt:
- Gesprächs-Raum (chat.html + /api/gespraech) — Spikiu grüßt & antwortet.
- Assessment-Schuld — alle 5 Raum-Felder grün in pruefung.html.
- Schreiben-Raum (es/anfang) — schon vorher live.

Reiner Tisch. Kein offener Bug.

---

## ▶ NÄCHSTES PAKET — Leonardo wählt (eins pro Sitzung)

1. **Nächster Raum** — Mündlicher Ausdruck / Hörverständnis / Lesen,
   nach dem Lektor-Muster (ein Endpoint pro Raum, Sprache als Feld,
   Seele zur Laufzeit). Reihenfolge: echten dev prüfen → Konzept →
   Prototyp (visuell, immer erst anfassen) → Code.
2. **nav.js integrieren** — einheitliche Navigation in alle App-Seiten,
   alte Navis raus (Offene Punkte 4 im Ledger).
3. **Schreiben-Raum querprüfen** — de/en/el als Feld + Können-Regler
   (fortgeschritten → Form verschwindet), el-Lautschrift (Offene Punkte 1).

_Noch nicht gewählt. Beim nächsten Start fragen, falls Leonardo nichts sagt._

---

## MERKE (sonst Reibung)
- **DEV ist die einzige Live-Umgebung.** NICHT spikiu.com. Test-URL:
  `https://spikiu-git-dev-orbiaceos-projects.vercel.app/…`
- Bei Visuellem IMMER erst ein Prototyp zum Anfassen, dann Code.
- Capy nie ohne Ohren/Füße — immer der volle SVG.
- Leonardo kämpft mit DevTools → Verifikation sichtbar bauen (wie pruefung.html),
  nicht über die Konsole.
- Eiserne Regel: Sitzung endet NIE mit uncommittetem Code. Diese Datei +
  Ledger am Ende jeder Sitzung nachziehen.
