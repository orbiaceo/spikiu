# AUFTRAG — erledigt am 23.06.2026 · kein offener Auftrag

> **Teil 40 „Spikiu befreit: Navi neutral + Deko-Capys raus" GEBAUT + auf dev (commit 26e266b).**
> 11 Dateien (`nav.js` + `books.html` + 8 Reader-Kapitel + `dashboard.html`); `lesebegleiter.js`/
> `capy-vivo.js`/`chat.html`/`schreibwerkstatt.html`/`api`/Seele UNBERÜHRT. `node --check` grün,
> headless verifiziert (Nav-Mitte neutral/kein Capy, Lesebegleiter lebt, Deko-Capys weg, Baum/Spruch
> intakt). Bericht im SPIKIU-BUILD-LEDGER.md. OFFEN = nur Geräte-Abnahme durch Leo.
> NÄCHSTES (Reihenfolge): 1. **Gespräch-Reel** (chat.html-Opener → Charakter-Begrüßung + Daumen-Reel),
> 2. Spruch → Raum „Proverbios", 3. Lektions-Hintergrund-Bug.

---

_Archiv des erledigten Auftrags:_

Stand: 22.06.2026 · Design-Sitzung (claude.ai) · Quelle der Wahrheit vor Bau: SPIKIU-BUILD-LEDGER.md
Branch: dev · Referenz: prototyp-final-spikiu-frei.html (Teil 40-Entscheidung)

> DER KNOTEN IST GELÖST. Spikiu wird NICHT mehr in einen Knopf gezwängt. Die Nav-Mitte
> bekommt ein NEUTRALES Gespräch-Symbol (zwei Köpfchen). Dadurch ist der Capy FREI, in
> jedem Raum als Charakter in seiner Rolle aufzutreten (Begrüßer im Gespräch, Lesebegleiter
> im Reader, künftig weitere Rollen). Regel ab jetzt: **pro Bildschirm höchstens EIN Capy —
> und nur als Charakter, nie als Deko/Logo.**
>
> DIESES Paket = die Befreiung + das Wegräumen der Deko-Capys/Logos. Der Gespräch-REEL
> (prototyp-final / Teil 39) ist das NÄCHSTE, eigene Paket (großer chat.html-Umbau) — hier NICHT.

## KERN — `nav.js`
1. **Mitte-Knopf (Gespräch/`talk`, center) → NEUTRALES Symbol „zwei Köpfchen".** Den
   `CAPY_SVG` aus dem Mitte-Knopf entfernen und durch dieses Icon ersetzen (weiße Linien
   auf grünem erhöhtem Kreis):
   `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="2.7"/><path d="M3.3 16.2c0-2.6 2.1-4.2 4.7-4.2s4.7 1.6 4.7 4.2"/><circle cx="16.6" cy="9.6" r="2.5"/><path d="M12.8 16.6c.3-2.1 2.1-3.3 4.2-3.3 2.4 0 4.1 1.6 4.1 4.1"/></svg>`
   - Den `spkCapyAlive`-Aufruf auf den Mitte-Capy ENTFERNEN (kein Capy mehr in der Nav).
   - Mitte bleibt erhöht; Sockel jetzt grün gefüllt (`#2d6a4f`), Icon weiß; Label unverändert.
     Aktiv-Zustand weiterhin erkennbar.
2. **Topbar-Logo: den Capy aus `.spk-brand` ENTFERNEN.** Das injizierte „🐻 Spikiu" oben ist
   ein Deko-Klon → die Capy-Grafik raus. Eine schlichte Wortmarke „Spikiu" (nur Text) darf
   bleiben; wenn die Topbar sonst nichts trägt, ist auch ganz weg sauber — KEIN Capy oben.

## DEKO-CAPYS RAUS (pro Seite, nur Deko — Charakter bleibt)
Regel: **Deko-Capys raus** (Kopf-/Hero-Logos auf Hub-Seiten). **Charakter-Capys bleiben:**
der Begrüßungs-Capy im Gespräch (chat.html) UND der Lesebegleiter im Reader.
- **books.html (Reader-Übersicht):** den großen Hero-Capy über „Spikiu Reader · Beta"
  ENTFERNEN. Text/Layout bleibt.
- **Reader-Kapitel (`cap1-de-v2.html` … `cap4-es-v2.html`):** im Kopf nur den dekorativen
  „🐻 Spikiu Reader"-Capy ENTFERNEN (Text „Spikiu Reader" bleibt). **DEN LESEBEGLEITER NICHT
  ANFASSEN** — `lesebegleiter.js`, der schwebende Begleiter, seine Logik/Animation bleiben zu
  100% unberührt (Leo: „no quiero que dañes nada del Lesebegleiter"). Nur das Header-Logo.
- **chat.html (Gespräch-Opener):** NICHTS am Capy entfernen — der große Begrüßungs-Capy ist
  Spikiu als CHARAKTER und der EINZIGE Capy dort (Topbar-Logo fällt schon via nav.js weg).
- **schreibwerkstatt.html / dashboard.html:** falls ein eigener Deko-Capy im Kopf steckt
  (nicht der nav.js-Topbar), ebenfalls raus. Der Dashboard-Baum bleibt; der „Spruch des
  Tages" ist SEPARATES Feedback (NICHT hier anfassen).

## NICHT ANFASSEN
- `lesebegleiter.js` + der schwebende Reader-Begleiter (heilig, funktioniert).
- `capy-vivo.js` (wird weiter vom Begrüßungs-Capy/Lesebegleiter genutzt) — nicht löschen,
  nur den Aufruf auf den NAV-Mitte-Capy entfernen.
- `api/*`, Seele, `*-modus.md`. Kein Stripe/Supabase.
- KEIN Gespräch-Reel-Umbau hier (eigenes nächstes Paket). KEIN Spruch/Proverbios/Lektions-Bug.

## ABNAHME
- [ ] Nav-Mitte zeigt das neutrale „zwei Köpfchen"-Symbol (grün, erhöht), KEIN Capy mehr;
      `spkCapyAlive` greift nicht mehr auf die Mitte.
- [ ] Oben kein „🐻 Spikiu"-Deko-Capy mehr (Topbar-Capy weg).
- [ ] books.html: Hero-Capy weg. Reader-Kapitel: Header-Capy weg, **Lesebegleiter unverändert
      + voll funktionsfähig** (schwebt, reagiert, spricht wie vorher).
- [ ] chat.html: Begrüßungs-Capy bleibt (= der eine Charakter-Capy dort).
- [ ] Pro Bildschirm höchstens EIN Capy, nur als Charakter. Capy überall VOLLSTÄNDIG (nie
      trasquilado).
- [ ] `node --check` grün; jede berührte Seite headless verifiziert (Nav rendert, Lesebegleiter
      lebt, nichts kaputt).

## DANACH (Reihenfolge)
1. **Gespräch-Reel** (prototyp-final-spikiu-frei.html / Teil 39+40): chat.html-Opener →
   Spikiu-als-Charakter-Begrüßung + Reel im Daumen-Prinzip (eine Sache pro Screen, Wisch,
   Tinder-Antwortkarten, 🔊). Großes eigenes Paket.
2. Dashboard „Spruch des Tages" raus → eigener Raum **„Proverbios"** (verkleideter Capy, tippt
   man → Spruch/Witz/Zitat + Sprechblase + Audio; Lerner kann schreiben, Spikiu antwortet in Text).
3. **Lektions-Hintergrund-Bug**: nach „Ja" → „Die findest du später in deinen Lektionen.
   Tschüss!"; Generierung im Hintergrund, überlebt Seitenwechsel; beim Zurückkommen ist sie da.
   (Leo getestet: aktuell wird KEINE Lektion erzeugt.)
