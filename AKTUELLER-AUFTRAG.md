# AUFTRAG — „Chat-Reel an sitzung.js: das Gespräch geht nie verloren"

Stand: 24.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev
Referenz-Muster: taller.html + schreibwerkstatt.html (schon an sitzung.js angeschlossen)

> sitzung.js ist gebaut (window.spikiuSitzung: lade/speichere/raeume/frageWiederkommen), aber das
> Chat-Reel (chat.html) ist NOCH NICHT angeschlossen → ein Fehl-Tipp/Verlassen verliert das Gespräch.
> ZIEL: das Gespräch laufend sichern; beim Wiedereintritt „Weiter, wo du warst?" anbieten und den
> Dialog wiederherstellen. (Die fertige Lektion ist bereits durch Teil 61/pending geschützt — hier
> geht es um den LIVE-Gesprächsverlauf.)
>
> RAUM-SCHLÜSSEL: `'gespraech'`.

## SCOPE v1 (bewusst pragmatisch, nicht fragil)
- Persistiert + restauriert wird der DIALOG-Verlauf (`verlauf`) + Kontext (gefuehrt, TOPIC_LABEL,
  zielsprache). Beim Wiederkommen wird der Dialog als Reel neu gerendert und der Nutzer setzt fort.
- NICHT in v1: exakte Häppchen-/Stage-Position (Wörter-Karte 3, Hören-Item 2 …). Häppchen sind feste
  Inhalte und jederzeit wiederholbar; der Wert liegt im Dialog. Exaktes Stage-Resume = Phase 2.

## 1) chat.html — sitzung.js laden
- `<script src="sitzung.js"></script>` einbinden (wie taller.html/schreibwerkstatt.html), VOR dem
  Haupt-Script bzw. so, dass `window.spikiuSitzung` beim Eintritt verfügbar ist.

## 2) Laufend sichern (entprellt ~350 ms)
- Einen kleinen Helfer `sitzungSpeichern()` bauen, der schreibt:
  `window.spikiuSitzung.speichere('gespraech', { verlauf: verlauf, gefuehrt: gefuehrt,
   topicLabel: TOPIC_LABEL, zielsprache: PROFILE.zielsprache })` (ts setzt sitzung.js selbst).
- Aufrufen (entprellt) nach JEDER Verlaufs-Änderung: nach dem User-Zug (Z.~1113) und nach dem
  Assistant-Zug (Z.~1247) und nach dem Thema-Seed (Z.~668). Nie werfen (try/catch).
- Nur sichern, wenn es echten Inhalt gibt (verlauf.length > 0).

## 3) Aufräumen (raeume) bei echtem Ende
- `window.spikiuSitzung.raeume('gespraech')` bei: erfolgreicher/als pending gesicherter Lektion
  (in makeLessonAndLeave, NACH dem Persistieren) UND bei „Von vorn" (frageWiederkommen → beimNeu).
- Bei „Beenden ohne Lektion" (byeNo) bleibt der Chat sichtbar → NICHT räumen (Sitzung noch aktiv).

## 4) Wiedereintritt — frageWiederkommen
- Am Chat-Eintritt (Opener-Init, BEVOR der normale Opener/Gabelung gezeigt wird):
  `var s = window.spikiuSitzung.lade('gespraech');`
- Nur wenn s eine WIRKLICH angefangene, unfertige Sitzung ist (s && Array.isArray(s.verlauf) &&
  s.verlauf.length >= 2 → mind. ein Austausch): normalen Opener NICHT sofort zeigen, stattdessen
  `window.spikiuSitzung.frageWiederkommen({ raum:'gespraech', ts:s.ts,
     wo: (s.topicLabel || FREI[uiLang()] || 'Freies Gespräch'),
     beimWeiter: function(){ sitzungWiederherstellen(s); },
     beimNeu:    function(){ window.spikiuSitzung.raeume('gespraech'); <normaler Opener wie bisher>; } });`
- Sonst: normaler Opener wie bisher.

## 5) sitzungWiederherstellen(s) — Dialog ins Reel zurückholen
- Kontext setzen: `verlauf = s.verlauf.slice(); gefuehrt = !!s.gefuehrt; TOPIC_LABEL = s.topicLabel || null;`
- `enterReel()` aufrufen, dann den Verlauf der Reihe nach als Reel-Folien neu rendern, mit den schon
  vorhandenen Render-Pfaden (NICHT neu erfinden):
  - `assistant`-Züge → wie Spikiu-Folien (appendSpikiuSlide bzw. addReelMessage; [[…]]-Übersetzung
    weiter als Untertitel, Marker raus, wie im normalen Rendern).
  - `user`-Züge → als Lerner-Folie (nur Anzeige des Textes; reuse der Lerner-Folien-Struktur).
- Danach eine FRISCHE Lerner-Eingabe-Folie ans Ende (renderLearnerSlide) und ans Ende scrollen/gehen,
  damit der Nutzer nahtlos weiterschreibt. Der nächste Zug geht normal an /api/gespraech (verlauf ist
  ja gefüllt → Spikiu hat den Kontext).
- Häppchen werden in v1 NICHT wieder aufgebaut (fester Inhalt). Bei geführten Sitzungen also: Dialog
  zurück + freie Fortsetzung; die Lektion bleibt am Ende normal erzeugbar.

## NICHT ANFASSEN
- sitzung.js selbst, nav.js/Finalizer (Teil 61), api/*, Engine, Häppchen-/Flip-/Sprechen-Logik,
  andere Räume, Lesebegleiter. Lesebegleiter ist sakrosankt.

## ABNAHME
- [ ] Während eines Gesprächs wird `spikiu_sitzung:gespraech` laufend geschrieben (DevTools).
- [ ] Chat verlassen (Navi/Reload) und zurückkommen → Karte „Weiter, wo du warst?" mit lebendigem
      Capy, Zeile zeigt Thema/Freies Gespräch + relative Zeit.
- [ ] „Weiter" stellt den Dialog wieder her (alle bisherigen Züge als Folien) und lässt nahtlos
      weiterschreiben; Spikiu kennt den Kontext.
- [ ] „Von vorn" räumt und startet den normalen Opener.
- [ ] Nach Lektion-Erzeugen (Erfolg ODER pending) ist `spikiu_sitzung:gespraech` geräumt.
- [ ] `node --check` grün (chat.html); headless gerendert; keine Doppel-Render, kein Zombie-Resume.

## DANACH (Phase 2)
- Exaktes Stage-/Häppchen-Resume · Geräteübergreifend via Supabase · „3→4 capítulos"-Fix · Legal zuletzt.
