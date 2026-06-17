# AKTUELLER AUFTRAG — für Claude Code

_Geschrieben von Claude (claude.ai, Design) am 17.06.2026.
Mach NUR diesen Auftrag. Wenn fertig: committen, pushen, Bericht ins Ledger,
diese Datei auf „erledigt" setzen._

---

## TITEL
Navigation: `nav.js` auf die 4 scrollbaren App-Seiten bringen + „Gym"-Eintrag ins Menü.

## WARUM
`nav.js` ist die eine Navi-Wahrheit (selbst-montierend, eigene `spk-`-Styles, erkennt
aktive Seite automatisch, liest Profil). Sie ist noch in keine Seite eingebunden. Dieses
Paket bringt sie sauber in die 4 scrollbaren Seiten. Die 2 Vollhöhen-Seiten (chat,
schreibwerkstatt) kommen als EIGENES Paket später — NICHT hier anfassen.

---

## TEIL A — nav.js in 4 Seiten einbinden
Seiten: `dashboard.html`, `books.html`, `sessions.html`, `learnraum.html`.

Pro Seite, chirurgisch (jede Datei ZUERST lesen, dann minimal eingreifen):
1. Bestehende eigene Kopfzeile/Navigation der Seite ENTFERNEN (oder, wenn sie strukturell
   gebraucht wird, in einen Slot verwandeln: dem vorhandenen Header `data-spk-nav` geben —
   dann setzt nav.js Hamburger+Logo dort hinein, statt eine zweite Leiste zu injizieren).
   Ziel: GENAU EINE Leiste oben, nie zwei.
2. Vor `</body>` einbinden: `<script src="nav.js" defer></script>`.
3. Kein Sprachschalter in der App — falls eine dieser Seiten einen hat, raus (Sprache steht fest).

## TEIL B — „Gym"-Eintrag in nav.js
In `nav.js` (eine Datei, drei kleine Stellen):
1. **I18N** — Label `gym` in alle drei Sprachen, Wert vorerst überall `"Gym"`
   (Feature-Name nach Lina; später lokalisierbar).
2. **ICON** — Eintrag `gym` (Hantel, gleiche Linien-Stil wie die anderen Icons):
   ```
   gym: '<rect x="2.5" y="9" width="3" height="6" rx="1"/><rect x="18.5" y="9" width="3" height="6" rx="1"/><rect x="5.5" y="10.5" width="2" height="3" rx="0.5"/><rect x="16.5" y="10.5" width="2" height="3" rx="0.5"/><line x1="7.5" y1="12" x2="16.5" y2="12"/>'
   ```
3. **STRUCT** — in der Sektion `main` DIREKT NACH `lessons` einfügen:
   `{ id: 'gym', disabled: true }`
   (Vorerst deaktiviert mit „bald"-Badge — kein toter Link, keine 404. Wird später ein
   echter Link auf den Gym-Raum, wenn wir ihn bauen.)

---

## ABNAHME-KRITERIEN („fertig" ist messbar)
1. Auf JEDER der 4 Seiten: genau EINE Topbar (Hamburger + Logo), keine Doppelleiste.
2. Hamburger öffnet den Drawer; Backdrop-Klick und Escape schließen ihn.
3. Aktive Seite ist markiert: dashboard→Dashboard, books→Bücher, sessions→Live-Begegnungen.
   (learnraum hat keinen Menüpunkt → keine Markierung, das ist ok.)
4. Profil-Avatar unten zeigt Initiale + „Gratis".
5. Der Drawer zeigt unter „Lektionen" einen neuen Punkt **Gym** mit Hantel-Icon und
   „bald"-Badge; er ist NICHT klickbar.
6. Das eigene Layout jeder Seite bleibt heil — kein Überlappen, kein doppelter Scrollbalken,
   Inhalt nicht verdeckt.
7. UNANGETASTET: `index.html`, `chat.html`, `schreibwerkstatt.html`, alle `cap*-v2.html`.
8. Node-Syntaxcheck auf `nav.js` läuft sauber; die 4 Seiten laden ohne Konsolenfehler.

## HINWEISE
- nav.js ist selbst-montierend: Skript-Tag + alte Navi raus genügt.
- Vollhöhe meiden: sollte eine der 4 Seiten ein `100dvh`-Flex-Layout haben, NICHT die eigene
  Leiste injizieren lassen (das sprengt das Layout) → Slot-Modus via `data-spk-nav`.
- VERBOTENE Variablennamen + Naming-Regeln: siehe CLAUDE.md.
- Nach Lieferung: Leonardo lädt herunter → `cp` → `grep -c` verifizieren → commit → push
  origin dev → jede Seite cache-frei testen mit `?v=N`.

## ABNAHME-TEST (kurz)
dashboard.html?v=N öffnen → Hamburger → Drawer mit Dashboard aktiv und „Gym (bald)" unter
Lektionen. Dann books / sessions / learnraum durchklicken: je eine Leiste, Drawer geht.

---

_Status: ERLEDIGT am 18.06.2026 — kein offener Auftrag._

Geliefert: nav.js mit Gym-Eintrag (I18N/ICON/STRUCT, „bald"-Badge) + auf die 4 scrollbaren Seiten
(`dashboard.html`, `books.html`, `sessions.html`, `learnraum.html`) gebracht, seiteneigene Navis raus,
genau eine Leiste. Inject-Modus (keine 100dvh-Seite dabei → kein Slot nötig). UNANGETASTET: `index.html`,
`chat.html`, `schreibwerkstatt.html`, alle `cap*-v2.html`. Node-Syntax + Inline-Scripts + Struktur grün.
OFFEN (nicht Teil dieses Auftrags, eigenes Paket): Live-Klick-Test auf dev; nav auf die 2 Vollhöhen-Seiten.
Details im SPIKIU-BUILD-LEDGER.md.
