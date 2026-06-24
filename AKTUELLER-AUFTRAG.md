# AUFTRAG — „Lektion geht NIE verloren: Transcript sofort sichern + Hintergrund-Finalizer"

Stand: 24.06.2026 · claude.ai · Quelle vor Bau: SPIKIU-BUILD-LEDGER.md · Branch: dev

> BUG (Leo, getestet): am Gesprächsende „Lektion erzeugen" → `/api/generate-lesson` schlug fehl
> („hat nicht geklappt"); beim Zurückwischen war die GANZE Arbeit weg. Ursache: `makeLessonAndLeave`
> schickt den Transcript NUR im fetch; bei Fehler wird NICHTS gesichert → der Transcript lebt nur im
> Speicher und ist verloren. Der echte Fehlergrund wird nicht gezeigt (vermutlich erneut das
> API-Ausgabelimit). Das ist genau der Fall, den wir verhindern wollen.
>
> ZIEL: der Lektions-Transcript wird beim Klick SOFORT persistiert; ein Fehlschlag verliert nichts;
> die Lektion wird im Hintergrund auf der nächsten Seite fertiggestellt. (Live-Wiederherstellung des
> ganzen Chat-Reels = separates Paket „Chat-Reel an sitzung.js", siehe DANACH.)

## 1) chat.html — `makeLessonAndLeave` umbauen
- VOR dem fetch den Request-Body bauen und SOFORT persistieren:
  `localStorage['spikiu_pending_lesson'] = JSON.stringify({ id:'lesson_'+Date.now(),
   body:{ name:u.name, nativeLang:u.nativeLang, profile:u.profile, conversationHistory:buildConvoForLesson() },
   thema: TOPIC_LABEL || (FREI[uiLang()]||FREI.de), zielsprache: PROFILE.zielsprache,
   createdAt: new Date().toISOString(), status:'pending' })`.
- Dann fetch wie bisher, ABER `r.ok` prüfen und bei Fehler den ECHTEN Grund loggen
  (`console.error('generate-lesson '+r.status, errDetail(d, raw))` — `errDetail` existiert schon, Z.1174;
  dafür `raw`/`d` wie in callGespraech behandeln).
- ERFOLG (`d && d.lesson`): wie bisher Eintrag in `u.lessons` (max 14) speichern, ZUSÄTZLICH
  `localStorage.removeItem('spikiu_pending_lesson')`, dann sanfte Auflösung → Dashboard.
- FEHLER: `spikiu_pending_lesson` BLEIBT. Ehrliche, beruhigende Nachricht statt „hat nicht geklappt":
  de „Spikiu baut deine Lektion im Hintergrund fertig — sie geht nicht verloren. Du findest sie
  gleich in deinen Lektionen." / es / en (in `endUI()` ergänzen). Beenden bleibt erreichbar; KEIN
  Datenverlust. Optional kleiner Button „Nochmal versuchen" → ruft `makeLessonAndLeave` erneut
  (nutzt denselben pending-Eintrag).

## 2) nav.js — gemeinsamer „Lektions-Finalizer" (läuft auf JEDER Seite mit Nav)
- Beim Laden: gibt es `spikiu_pending_lesson` mit `status:'pending'`?
  - UND nicht gerade laufend: Schutz via `inProgressTs` (im pending-Objekt; nach ~60 s erneut erlaubt).
    Setze `inProgressTs=Date.now()` + zurückschreiben, dann `/api/generate-lesson` mit `pending.body`.
  - ERFOLG (`d.lesson`): Eintrag bauen `{ id:pending.id, topic:d.lesson.title||'Lektion',
    thema:pending.thema, fromConversation:true, lesson:d.lesson, createdAt:pending.createdAt,
    zielsprache:pending.zielsprache }`, in `spikiu_user.lessons` einsortieren (nach createdAt
    absteigend, max 14), `spikiu_pending_lesson` LÖSCHEN. (Keine Doppel: per id prüfen.)
  - FEHLER/offline: `inProgressTs` zurücksetzen, pending BEHALTEN → nächster Seitenaufruf versucht
    erneut. Echten Fehler `console.error` loggen. Niemals werfen (try/catch).
- So wird die Lektion fertig, egal wohin der Nutzer wechselt (Dashboard/Werkstatt/…), weil nav.js
  überall lädt. Reader-Kapitel (keine nav.js) brauchen das nicht.

## EHRLICHER VORBEHALT (dokumentieren)
- Browser komplett zu mitten in der Generierung: läuft beim NÄCHSTEN App-Aufruf fertig (Transcript
  persistiert → nie verloren). Echte Server-Hintergrundgenerierung = Phase 2 (Supabase).

## NICHT ANFASSEN
- `/api/generate-lesson` selbst, Lektions-Inhalt/-Format, Reel-Mechanik, Häppchen/Flip-Karten,
  Sprechen, andere Räume, Lesebegleiter, `sitzung.js` (bleibt wie gebaut).

## ABNAHME
- [ ] „Lektion erzeugen" → `spikiu_pending_lesson` steht SOFORT in localStorage (vor dem Ergebnis).
- [ ] Bei Erfolg: Lektion in `u.lessons`, pending gelöscht, sanfter Wechsel zum Dashboard.
- [ ] Bei Fehler: beruhigende Nachricht, pending BLEIBT, echter Grund in der Konsole; nichts verloren.
- [ ] Auf der nächsten geladenen Seite (z. B. Dashboard) erscheint die Lektion automatisch
      (Finalizer) — auch wenn der Chat-Versuch fehlschlug. Keine doppelten Lektionen. Max 14.
- [ ] `node --check` grün (chat.html + nav.js); headless geprüft.

## DANACH
- Paket „Chat-Reel an sitzung.js": das ganze Gespräch laufend sichern + `frageWiederkommen`
  („Weiter, wo du warst?") beim Wiedereintritt — damit auch der LIVE-Gesprächsverlauf restaurierbar
  ist (nicht nur die fertige Lektion). sitzung.js ist gebaut; chat-Reel ist noch nicht angeschlossen.
- (offen) „3 → 4 capítulos"-Fix · Flip-Karten-Bau abnehmen · Legal zuletzt.
