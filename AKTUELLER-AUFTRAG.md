# AUFTRAG — „Häppchen aus der festen DB statt API-Call (4 Themen × es/de/en/el)"

Stand: 24.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev
Begleitdatei (von claude.ai geliefert, schon fertig): `haeppchen-db.js` (Root, kein vercel.json).

> ZIEL: Wörter/Hören-Häppchen sind FESTER Inhalt → kein API-Call mehr. Token-Ersparnis +
> ein Fehlerpunkt weniger (genau wie /api/generate-lesson konnte /api/haeppchen scheitern).
> `loadHaeppchen` nimmt zuerst die lokale DB; nur wenn dort nichts ist (z. B. künftige
> Frei-Themen), fällt es auf /api/haeppchen zurück. Selbe JSON-Form → nur die Quelle tauscht.
>
> WICHTIG: Griechisch (el) ist von Anfang an dabei (Zielsprache, nie UI). DB deckt ab:
> hotel/taxi/restaurant/cafe × es/de/en/el, je 5 Wörter + 2 Hören (1 minimalpaar + 1 woerter).

## 0) haeppchen-db.js ins Repo
- Datei `haeppchen-db.js` (von claude.ai) in den Repo-Stamm legen (wie sprichwort.js/nav.js;
  KEIN vercel.json-Eintrag, ist ein statischer Root-Helfer).
- API exakt: `window.spikiuHaeppchen(themaId, zielsprache, muttersprache)` →
  `{ wortschatz:[{ziel,lautschrift,uebersetzung}], hoerverstehen:[…] }` (= Form von /api/haeppchen),
  oder `null`, wenn (Thema×Ziel) fehlt. `window.spikiuHaeppchen.themen` = ['hotel','taxi','restaurant','cafe'].

## 1) chat.html — DB laden
- `<script src="haeppchen-db.js"></script>` einbinden (vor dem Haupt-Script, wie sitzung.js).

## 2) chat.html — stabile Themen-ID führen
- TOPICS (Z.~1282) je Eintrag ein `id` geben (sprachneutraler Schlüssel):
  Hotel→`'hotel'`, Taxi→`'taxi'`, Restaurant→`'restaurant'`, Im Café→`'cafe'`.
- Neue Variable `var TOPIC_ID = null;` (bei TOPIC_LABEL, Z.~437).
- Im Themen-Wähler (dort wo `TOPIC_LABEL = label;`, Z.~1404): zusätzlich `TOPIC_ID` auf die
  ID des GEWÄHLTEN Themas setzen. (Die Wahl liefert `label`; ID per Treffer in TOPICS bestimmen —
  Eintrag, dessen de/es/en-Label == label → dessen `id`. Sauberer: dem Wähler die ID mitgeben.)
- `TOPIC_ID = null;` überall mitziehen, wo `TOPIC_LABEL = null;` steht (Z.~678).
- Sitzungs-Persistenz (Teil 62): `TOPIC_ID` mit sichern (Z.~1169, Objekt um `topicId:TOPIC_ID`
  ergänzen) und beim Wiederherstellen setzen (Z.~1836, `TOPIC_ID = s.topicId || null;`), damit eine
  wiederhergestellte geführte Sitzung die DB ebenfalls trifft.

## 3) chat.html — loadHaeppchen: DB zuerst, API als Fallback
- In `loadHaeppchen` (Z.~1527), VOR dem `fetch('/api/haeppchen', …)`:
  ```
  var local = (window.spikiuHaeppchen && TOPIC_ID)
    ? window.spikiuHaeppchen(TOPIC_ID, PROFILE.zielsprache, PROFILE.muttersprache)
    : null;
  if (local && Array.isArray(local.wortschatz) && local.wortschatz.length){
    hideHapSpinner();           // falls schon gezeigt
    HAP = local;
    renderWortschatz();
    return;                     // KEIN API-Call
  }
  ```
- Bleibt `local` leer → bestehender /api/haeppchen-Pfad UNVERÄNDERT (Fallback inkl. skip-Logik).
- `warmVoice(PROFILE.zielsprache)` weiterhin zuerst (Audio vorwärmen gilt für beide Wege).

## NICHT ANFASSEN
- /api/haeppchen selbst (bleibt als Fallback), renderWortschatz/renderHV (Form ist identisch),
  Sprechen/Lektion/Reel-Mechanik, andere Räume, sitzung.js, Lesebegleiter.

## ABNAHME
- [ ] Thema wählen (z. B. Restaurant) bei Deutsch→Español → Wörter/Hören erscheinen SOFORT,
      KEIN Netzwerk-Request an /api/haeppchen (DevTools Network leer für haeppchen).
- [ ] Für alle 4 Themen × Zielsprachen es/de/en/el kommen 5 Wörter + 2 Hören; Griechisch zeigt
      Lautschrift; Übersetzungen in der jeweiligen Muttersprache (de/es/en).
- [ ] minimalpaar: 2 Optionen, genau 1 richtig; woerter: 4–6 Wörter, gemischt gehört/nicht.
- [ ] Audio (🔊) spielt die Zielsprache (Piper/Fallback) wie gehabt.
- [ ] Unbekanntes/künftiges Thema ohne DB-Eintrag → sauberer Fallback auf /api/haeppchen.
- [ ] `node --check chat.html` grün; headless geprüft; keine Doppel-Spinner.

## DANACH
- Token-Paket A: gespraech Gleit-Fenster (nur letzte ~10–12 Nachrichten + Seed) + Sprechen-Cap
  (~6–8 Züge → gentle close). „Schreib etwas" BLEIBT.
- (fix) Dashboard „3 → 4 capítulos".
- (anderes Chat, NUR Notiz) Reader auf ENGLISCH + GRIECHISCH erstellen (siehe Ledger-Aufgabe).
