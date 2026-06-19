# AKTUELLER AUFTRAG — Lesebegleiter ausrollen

_Geschrieben von Claude (claude.ai, Design) 19.06.2026 (Teil 18)._
_Mach NUR diesen Auftrag. Wenn fertig: committen, pushen, Bericht ins Ledger, diese Datei auf „erledigt" setzen._

---

## KONTEXT
Der Reader-Lesebegleiter ist gebaut und **live auf `cap1-es-v2.html`** (Teil 17):
`api/lesebegleiter.js` (Endpoint) + `lesebegleiter.js` (Widget) + `vercel.json`.
Jetzt nur noch auf die übrigen Reader-Kapitel ausrollen.

## SCOPE (NUR Einbinden — nichts am Endpoint/Widget ändern)
In jede Reader-Kapitelseite **genau eine Zeile** direkt vor `</body>` einfügen:

```html
<script src="lesebegleiter.js" defer></script>
```

Dateien:
- Spanisch (Lukas/Madrid): `cap2-es-v2.html`, `cap3-es-v2.html`, `cap4-es-v2.html`
- Deutsch (Marta/Berlin): `cap1-de-v2.html`, `cap2-de-v2.html`, `cap3-de-v2.html`, `cap4-de-v2.html`

Sonst NICHTS ändern (kein CSS, kein Reader-Text, keine Struktur).

## ABNAHME-KRITERIEN
1. Jede Reader-Kapitelseite zeigt unten rechts das schwebende, atmende Spikiu — kein Auto-Popup.
2. Tipp öffnet das schlanke Fenster; eine Frage zum Text bekommt eine kurze Antwort vom Endpoint.
3. Lesefluss unberührt (Widget liegt als Overlay obenauf).
4. Die Widget-UI erscheint in der Muttersprache des Users (DE/ES/EN aus `spikiu_user`).

## VERIFIKATION VOR COMMIT
```
grep -c "lesebegleiter.js" cap2-es-v2.html cap3-es-v2.html cap4-es-v2.html cap1-de-v2.html cap2-de-v2.html cap3-de-v2.html cap4-de-v2.html
```
(jede Datei muss genau `1` zeigen)

## HINWEIS
Endpoint + Widget existieren bereits (Teil 17). NICHTS an `api/lesebegleiter.js` oder
`lesebegleiter.js` anfassen — reines Einbinden. Naming überall **Spikiu**.

---

## ✅ ZULETZT ERLEDIGT (Teile 15–17, 19.06., direkt in claude.ai gebaut)
- **Teil 15:** Neue Landing (index.html) — Manifest EN/DE/ES, CTAs verdrahtet — LIVE.
- **Teil 16:** Dashboard-i18n (dashboard.html) — ganz Muttersprache, Begrüßung Zielsprache — LIVE.
- **Teil 17:** Reader-Lesebegleiter — api/lesebegleiter.js + lesebegleiter.js + vercel.json + cap1-es-v2.html — LIVE.
