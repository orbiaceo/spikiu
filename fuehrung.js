/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — DER REISELEITER  (fuehrung.js)

   Leo, 14.11.2026, 02:47 / 02:54 („Genehmigt"): Ein System, zwei Modi.
     GEFÜHRT — Spikiu sagt jeden Tag, was dran ist. Der Lerner tippt „Weiter".
     FREI    — Der Lerner wählt nach Lust; Spikiu schlägt oben trotzdem etwas vor.
   Vorlage: prototyp-zwei-modi.html.

   Dieser Helfer ERFINDET NICHTS. Er liest nur, was es schon gibt:
     SpikiuPfad.palette()  — die Stationen der Stufe mit Status
                            (offen · durchschritten · gesetzt) und „beruehrt"
     SpikiuLernpfad        — Themen, Eröffnungszeilen
   und schreibt nur ein Feld: spikiu_user.profile.modus.

   Führung durch Vorschlag, nicht durch Schloss (wie lernpfad.js). Verschlossen
   wird nichts — harte Schleifen und Sperren bleiben iuspik.
   Kein Zähler, kein Streak: „Fortschritt wird gefühlt, nie gezählt."
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  var SCHLUESSEL = 'spikiu_user';

  function nutzer() {
    try { var u = JSON.parse(localStorage.getItem(SCHLUESSEL) || '{}'); return (u && typeof u === 'object') ? u : {}; }
    catch (e) { return {}; }
  }

  /* ── Modus ────────────────────────────────────────────────────────── */
  function modus() {
    var m = (nutzer().profile || {}).modus;
    return (m === 'gefuehrt' || m === 'frei') ? m : null;
  }
  function setzeModus(m) {
    if (m !== 'gefuehrt' && m !== 'frei') return modus();
    var u = nutzer(); u.profile = u.profile || {}; u.profile.modus = m;
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(u)); } catch (e) {}
    return m;
  }

  function muttersprache() {
    var m = (nutzer().profile || {}).muttersprache;
    if (m === 'de' || m === 'es' || m === 'en' || m === 'el') return m;
    try { var l = localStorage.getItem('spikiu_lang'); if (l === 'de' || l === 'es' || l === 'en' || l === 'el') return l; } catch (e) {}
    return 'de';
  }
  function zielsprache() { return (nutzer().profile || {}).zielsprache || 'es'; }

  function heuteTag() { return new Date().toISOString().slice(0, 10); }

  /* Gibt es Stationen für DIESE Zielsprache? Sonst schlägt der Reiseleiter
     nichts vor — die Startseite zeigt dann still nur die vier Türen. */
  function bereit() {
    var D = raum.SpikiuLernpfad, P = raum.SpikiuPfad;
    if (!D || !P) return false;
    if (D.zielsprache && D.zielsprache !== zielsprache()) return false;
    try { return P.palette().length > 0; } catch (e) { return false; }
  }

  /* Der Name einer Station in der Muttersprache. */
  function titel(x) {
    var ml = muttersprache();
    return (x && x.na && (x.na[ml] || x.na.en || x.na.de)) || (x && x.id) || '';
  }
  /* Spikius erste Zeile der Szene, in der Zielsprache — als kleiner Vorgeschmack. */
  function vorgeschmack(x) {
    try {
      var D = raum.SpikiuLernpfad, z = D.eroeffnungVon(x.stufe, x.id);
      if (z && z.z) return z.z;
      var S = D.station(x.stufe, x.id), zl = S && S.dialog && S.dialog.zeilen;
      return (zl && zl[0] && zl[0].z) || '';
    } catch (e) { return ''; }
  }

  /* Die Stationen der aktuellen Stufe, mit „beruehrt" aus dem persönlichen Weg. */
  function pfad() {
    var P = raum.SpikiuPfad; if (!P) return [];
    var roh = {}; try { roh = (P.lade().stationen) || {}; } catch (e) {}
    return P.palette().map(function (x) {
      var e = roh[x.stufe + '.' + x.id] || {};
      x.beruehrt = e.beruehrt || null;
      x.titel = titel(x);
      return x;
    });
  }

  /* ── Was Spikiu heute vorschlägt ──────────────────────────────────── */
  /* Reihenfolge, wie ein guter Lehrer sie wählen würde:
     1. Heute schon eine Station betreten → Ruhe. Morgen kommt das Wiedersehen.
     2. Eine Station von früher wartet auf ihr Wiedersehen → die Karten.
     3. Sonst die nächste offene Station.
     4. Alles sitzt → die nächste Stufe anbieten. */
  function heute() {
    if (!bereit()) return null;
    var P = raum.SpikiuPfad, D = raum.SpikiuLernpfad;
    var p = pfad(), tag = heuteTag();
    var offen = p.filter(function (x) { return x.status === 'offen'; });
    var heuteBetreten = p.filter(function (x) { return x.beruehrt === tag && x.status !== 'gesetzt'; })[0];
    var wartet = p.filter(function (x) { return x.status === 'durchschritten' && x.beruehrt !== tag; })[0];
    if (heuteBetreten) return { art: 'ruhe', station: heuteBetreten, danach: wartet || offen[0] || null, pfad: p };
    if (wartet) return { art: 'wiedersehen', station: wartet, pfad: p };
    if (offen.length) return { art: 'neu', station: offen[0], pfad: p };
    var st = P.stufe(), i = D.stufen.indexOf(st), naechsteStufe = null;
    for (var k = i + 1; k < D.stufen.length; k++) {
      var s = D.stufen[k];
      if (D.themen.some(function (t) { return D.gefuellt(s, t.id); })) { naechsteStufe = s; break; }
    }
    return { art: 'stufe', stufe: naechsteStufe, pfad: p };
  }

  /* Wohin ein Vorschlag führt. Alle Wege führen zurück ins Haus. */
  function ziel(art, x) {
    if (art === 'wiedersehen') return 'gym.html?zurueck=haus';
    return 'gefuehrt.html?thema=' + encodeURIComponent(x.id);
  }

  /* ── Texte (Muttersprache des Lerners) ────────────────────────────── */
  var T = {
    de: {
      frage: 'Eine Frage, bevor wir loslegen: Wie möchtest du lernen?',
      fuehrMich: 'Führ mich', fuehrMichS: 'Ich sage dir jeden Tag, was dran ist. Du tippst nur auf „Weiter“.',
      selbst: 'Ich schau mich selbst um', selbstS: 'Du wählst nach Lust. Ich schlage dir trotzdem etwas vor.',
      jederzeit: 'Du kannst das jederzeit in „Mein“ ändern.',
      grussG: 'Ich führe dich. Du musst nichts auswählen.', grussF: function (n) { return (n ? n + ', w' : 'W') + 'orauf hast du Lust?'; },
      grussRuhe: 'Schön gemacht. Für heute reicht das.',
      ebNaechste: 'Deine nächste Station', ebHeute: 'Heute mit Spikiu', ebWieder: 'Wiedersehen', ebRuhe: 'Heute erledigt', ebStufe: 'Diese Stufe sitzt',
      wiederT: function (t) { return 'Deine Wörter von „' + t + '“'; }, wiederZs: 'Sie kommen heute wieder. Erkennst du sie?',
      ruheT: 'Bis morgen.', ruheZs: function (t) { return 'Morgen kommen deine Wörter von „' + t + '“ wieder.'; },
      trotzWeiter: function (t) { return 'Trotzdem weiter: ' + t; },
      stufeT: function (s) { return 'Weiter zu ' + s + '?'; }, stufeZs: 'Alle Stationen dieser Stufe sitzen.', stufeLos: 'Ja, weiter', stufeEnde: 'Du bist am Ende des Weges angekommen. Alles bleibt offen.',
      weiter: 'Weiter', los: 'Los geht’s',
      schrWoerter: 'Wörter', schrHoeren: 'Hören', schrSprechen: 'Sprechen', schrKarten: 'Karten',
      pfadRegel: 'Spikiu empfiehlt die Reihenfolge. Verschlossen ist nichts.',
      lieberSelbst: 'Heute lieber selbst wählen ›', zurFuehrung: '‹ zurück zur Führung',
      spaeter: 'später', wiedersehenTag: 'Wiedersehen',
      trotzFrage: function (a, b) { return 'Ich empfehle erst „' + a + '“. Willst du trotzdem zu „' + b + '“?'; },
      trotzJa: 'Ja, trotzdem', trotzNein: function (a) { return 'Nein, erst „' + a + '“'; },
      oderSelbst: 'Oder selbst wählen', zurueck: '‹ zurück',
      min: function (n) { return '≈ ' + n + ' Min.'; },
      modusLbl: 'Wie lernst du?', modusG: 'Geführt', modusF: 'Frei',
      modusGs: 'Spikiu sagt dir jeden Tag, was dran ist. Alle Räume bleiben trotzdem offen.',
      modusFs: 'Du wählst selbst. Oben schlägt Spikiu dir trotzdem etwas vor.',
      modusOkG: 'Ab jetzt führe ich dich.', modusOkF: 'Ab jetzt wählst du selbst.'
    },
    es: {
      frage: 'Una pregunta antes de empezar: ¿cómo quieres aprender?',
      fuehrMich: 'Guíame', fuehrMichS: 'Cada día te digo qué toca. Tú solo pulsas «Seguir».',
      selbst: 'Prefiero explorar', selbstS: 'Eliges según te apetezca. Aun así, te propongo algo.',
      jederzeit: 'Puedes cambiarlo cuando quieras en «Perfil».',
      grussG: 'Yo te guío. No tienes que elegir nada.', grussF: function (n) { return (n ? n + ', ¿' : '¿') + 'qué te apetece?'; },
      grussRuhe: 'Bien hecho. Por hoy es suficiente.',
      ebNaechste: 'Tu próxima estación', ebHeute: 'Hoy con Spikiu', ebWieder: 'Reencuentro', ebRuhe: 'Hecho por hoy', ebStufe: 'Esta etapa ya está',
      wiederT: function (t) { return 'Tus palabras de «' + t + '»'; }, wiederZs: 'Hoy vuelven. ¿Las reconoces?',
      ruheT: 'Hasta mañana.', ruheZs: function (t) { return 'Mañana vuelven tus palabras de «' + t + '».'; },
      trotzWeiter: function (t) { return 'Seguir igualmente: ' + t; },
      stufeT: function (s) { return '¿Pasamos a ' + s + '?'; }, stufeZs: 'Todas las estaciones de esta etapa ya están.', stufeLos: 'Sí, vamos', stufeEnde: 'Has llegado al final del camino. Todo sigue abierto.',
      weiter: 'Seguir', los: '¡Vamos!',
      schrWoerter: 'Palabras', schrHoeren: 'Escuchar', schrSprechen: 'Hablar', schrKarten: 'Tarjetas',
      pfadRegel: 'Spikiu te recomienda el orden. No hay nada cerrado.',
      lieberSelbst: 'Hoy prefiero elegir yo ›', zurFuehrung: '‹ volver a la guía',
      spaeter: 'después', wiedersehenTag: 'Reencuentro',
      trotzFrage: function (a, b) { return 'Te recomiendo primero «' + a + '». ¿Quieres ir igualmente a «' + b + '»?'; },
      trotzJa: 'Sí, igualmente', trotzNein: function (a) { return 'No, primero «' + a + '»'; },
      oderSelbst: 'O elige tú', zurueck: '‹ atrás',
      min: function (n) { return '≈ ' + n + ' min'; },
      modusLbl: '¿Cómo aprendes?', modusG: 'Guiado', modusF: 'Libre',
      modusGs: 'Spikiu te dice cada día qué toca. Todos los espacios siguen abiertos.',
      modusFs: 'Eliges tú. Arriba, Spikiu te propone algo de todos modos.',
      modusOkG: 'A partir de ahora te guío yo.', modusOkF: 'A partir de ahora eliges tú.'
    },
    en: {
      frage: 'One question before we start: how would you like to learn?',
      fuehrMich: 'Guide me', fuehrMichS: 'Each day I tell you what’s next. You just tap “Continue”.',
      selbst: 'I’ll look around myself', selbstS: 'You choose what you feel like. I’ll still suggest something.',
      jederzeit: 'You can change this any time in “Profile”.',
      grussG: 'I’ll guide you. You don’t have to choose anything.', grussF: function (n) { return (n ? n + ', w' : 'W') + 'hat do you feel like?'; },
      grussRuhe: 'Well done. That’s enough for today.',
      ebNaechste: 'Your next stop', ebHeute: 'Today with Spikiu', ebWieder: 'See them again', ebRuhe: 'Done for today', ebStufe: 'This stage is settled',
      wiederT: function (t) { return 'Your words from “' + t + '”'; }, wiederZs: 'They come back today. Do you recognise them?',
      ruheT: 'See you tomorrow.', ruheZs: function (t) { return 'Tomorrow your words from “' + t + '” come back.'; },
      trotzWeiter: function (t) { return 'Carry on anyway: ' + t; },
      stufeT: function (s) { return 'On to ' + s + '?'; }, stufeZs: 'All stops of this stage are settled.', stufeLos: 'Yes, let’s go', stufeEnde: 'You’ve reached the end of the path. Everything stays open.',
      weiter: 'Continue', los: 'Let’s go',
      schrWoerter: 'Words', schrHoeren: 'Listen', schrSprechen: 'Speak', schrKarten: 'Cards',
      pfadRegel: 'Spikiu recommends the order. Nothing is locked.',
      lieberSelbst: 'I’d rather choose today ›', zurFuehrung: '‹ back to the guide',
      spaeter: 'later', wiedersehenTag: 'See again',
      trotzFrage: function (a, b) { return 'I’d suggest “' + a + '” first. Go to “' + b + '” anyway?'; },
      trotzJa: 'Yes, anyway', trotzNein: function (a) { return 'No, “' + a + '” first'; },
      oderSelbst: 'Or choose yourself', zurueck: '‹ back',
      min: function (n) { return '≈ ' + n + ' min'; },
      modusLbl: 'How do you learn?', modusG: 'Guided', modusF: 'Free',
      modusGs: 'Spikiu tells you each day what’s next. All rooms stay open.',
      modusFs: 'You choose. At the top, Spikiu still suggests something.',
      modusOkG: 'From now on I’ll guide you.', modusOkF: 'From now on you choose.'
    },
    el: {
      frage: 'Μια ερώτηση πριν ξεκινήσουμε: πώς θέλεις να μαθαίνεις;',
      fuehrMich: 'Οδήγησέ με', fuehrMichS: 'Κάθε μέρα σου λέω τι ακολουθεί. Εσύ απλώς πατάς «Συνέχεια».',
      selbst: 'Θα εξερευνήσω μόνος μου', selbstS: 'Διαλέγεις ό,τι θέλεις. Εγώ πάντως σου προτείνω κάτι.',
      jederzeit: 'Μπορείς να το αλλάξεις όποτε θέλεις στο «Προφίλ».',
      grussG: 'Σε οδηγώ εγώ. Δεν χρειάζεται να διαλέξεις τίποτα.', grussF: function (n) { return (n ? n + ', τ' : 'Τ') + 'ι έχεις όρεξη να κάνεις;'; },
      grussRuhe: 'Μπράβο. Για σήμερα φτάνει.',
      ebNaechste: 'Ο επόμενος σταθμός σου', ebHeute: 'Σήμερα με τον Spikiu', ebWieder: 'Ξανασυνάντηση', ebRuhe: 'Τελείωσες για σήμερα', ebStufe: 'Αυτό το στάδιο κάθισε',
      wiederT: function (t) { return 'Οι λέξεις σου από «' + t + '»'; }, wiederZs: 'Επιστρέφουν σήμερα. Τις αναγνωρίζεις;',
      ruheT: 'Τα λέμε αύριο.', ruheZs: function (t) { return 'Αύριο επιστρέφουν οι λέξεις σου από «' + t + '».'; },
      trotzWeiter: function (t) { return 'Συνέχεια παρ’ όλα αυτά: ' + t; },
      stufeT: function (s) { return 'Πάμε στο ' + s + ';'; }, stufeZs: 'Όλοι οι σταθμοί αυτού του σταδίου κάθισαν.', stufeLos: 'Ναι, πάμε', stufeEnde: 'Έφτασες στο τέλος της διαδρομής. Όλα μένουν ανοιχτά.',
      weiter: 'Συνέχεια', los: 'Πάμε',
      schrWoerter: 'Λέξεις', schrHoeren: 'Άκου', schrSprechen: 'Μίλα', schrKarten: 'Κάρτες',
      pfadRegel: 'Ο Spikiu προτείνει τη σειρά. Τίποτα δεν είναι κλειδωμένο.',
      lieberSelbst: 'Σήμερα θα διαλέξω μόνος μου ›', zurFuehrung: '‹ πίσω στην καθοδήγηση',
      spaeter: 'αργότερα', wiedersehenTag: 'Ξανασυνάντηση',
      trotzFrage: function (a, b) { return 'Σου προτείνω πρώτα «' + a + '». Θέλεις παρ’ όλα αυτά να πας στο «' + b + '»;'; },
      trotzJa: 'Ναι, παρ’ όλα αυτά', trotzNein: function (a) { return 'Όχι, πρώτα «' + a + '»'; },
      oderSelbst: 'Ή διάλεξε μόνος σου', zurueck: '‹ πίσω',
      min: function (n) { return '≈ ' + n + ' λεπ.'; },
      modusLbl: 'Πώς μαθαίνεις;', modusG: 'Με καθοδήγηση', modusF: 'Ελεύθερα',
      modusGs: 'Ο Spikiu σου λέει κάθε μέρα τι ακολουθεί. Όλοι οι χώροι μένουν ανοιχτοί.',
      modusFs: 'Διαλέγεις εσύ. Πάνω, ο Spikiu σού προτείνει πάντως κάτι.',
      modusOkG: 'Από τώρα σε οδηγώ εγώ.', modusOkF: 'Από τώρα διαλέγεις εσύ.'
    }
  };
  function text() { return T[muttersprache()] || T.de; }

  raum.spikiuFuehrung = {
    modus: modus,
    setzeModus: setzeModus,
    bereit: bereit,
    heute: heute,
    pfad: pfad,
    ziel: ziel,
    titel: titel,
    vorgeschmack: vorgeschmack,
    text: text,
    muttersprache: muttersprache
  };

})(typeof window !== 'undefined' ? window : this);
