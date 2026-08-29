// szene.test.js — Der Automat und das Sieb, kopflos durchgespielt
// ─────────────────────────────────────────────────────────────────────────────
// Plain Node, kein Framework, keine Abhängigkeit:   node szene.test.js
// Alle 18 Fälle aus szene-regeln.md („Die Fälle, die durchgespielt werden")
// stehen einzeln drin, dazu das Sieb: je fünf Rollen-Rückfragen und fünf
// Meta-Fragen pro Muttersprache plus die Grenzfälle „Ok", „Sí", „Hallo".
// Rückgabewert 1 bei jedem Fehlschlag.

'use strict';

var SpikiuSzene = require('./szene.js');
var SpikiuSieb  = require('./frage-sieb.js');

var P = SpikiuSzene.PHASEN;

// ── Winziges Prüfwerk ───────────────────────────────────────────────────────
var gruen = 0, rot = 0, rote = [];

function pruefe(titel, koerper) {
  try {
    koerper();
    gruen += 1;
    console.log('  grün  ' + titel);
  } catch (e) {
    rot += 1;
    rote.push({ titel: titel, grund: e && e.message ? e.message : String(e) });
    console.log('  ROT   ' + titel + '  →  ' + (e && e.message ? e.message : e));
  }
}

function gleich(ist, soll, was) {
  if (ist !== soll) throw new Error(was + ': ist ' + JSON.stringify(ist) + ', soll ' + JSON.stringify(soll));
}
function wahr(bedingung, was) {
  if (!bedingung) throw new Error(was);
}
function zustandGleich(z, soll) {
  for (var k in soll) gleich(z[k], soll[k], k);
}

// Drei Aufgaben wie in einer echten Station.
var AUFGABEN = [
  'Begrüße den Kellner',
  'Bestelle etwas zu trinken',
  'Frage nach der Rechnung'
];

function neueSzene(streng) {
  return SpikiuSzene.erzeuge({ aufgaben: AUFGABEN, maxZuege: 6, streng: streng === true });
}
// Für die Fälle, in denen jeder Schritt gelingen MUSS: streng — dann wirft ein
// still verschluckter Fehler, statt durchzurutschen.
function strengeSzene() { return neueSzene(true); }

console.log('');
console.log('SZENEN-AUTOMAT — die 18 Fälle aus szene-regeln.md');
console.log('');

// ── Fall 1 ──────────────────────────────────────────────────────────────────
pruefe('Fall 1 · Sauberer Durchlauf: Los! → drei offene Züge → Ausgang offen → Fertig → Ernte', function () {
  var s = strengeSzene();
  var z = s.los('Ich möchte das Thema Café üben');
  zustandGleich(z, { phase: P.wartetAufSpikiu, zug: 0, aufgabeIndex: 0, ausgangOffen: false, vorbei: false, abgelehnt: null });

  z = s.spikiuAntwortet('¡Buenos días! ¿Qué desea?');
  zustandGleich(z, { phase: P.wartetAufLerner, zug: 0, aufgabeIndex: 0 });

  z = s.antworte('Buenos días', 'offen');
  zustandGleich(z, { phase: P.wartetAufSpikiu, zug: 1, aufgabeIndex: 1, ausgangOffen: false });
  z = s.spikiuAntwortet('¿Y para tomar?');
  gleich(z.phase, P.wartetAufLerner, 'phase');

  z = s.antworte('Un café con leche, por favor', 'offen');
  zustandGleich(z, { zug: 2, aufgabeIndex: 2, ausgangOffen: false });
  z = s.spikiuAntwortet('Enseguida.');

  z = s.antworte('La cuenta, por favor', 'offen');
  zustandGleich(z, { zug: 3, aufgabeIndex: 3, ausgangOffen: true });   // R6
  z = s.spikiuAntwortet('Aquí tiene. ¡Hasta luego!');
  zustandGleich(z, { phase: P.wartetAufLerner, ausgangOffen: true });  // endet NICHT von selbst

  z = s.abbrechen();                                                    // der Knopf „Fertig"
  zustandGleich(z, { phase: P.ernte, vorbei: false, ausgangOffen: true });

  z = s.nachHause();                                                    // R12
  zustandGleich(z, { phase: P.ernte, vorbei: true });
});

// ── Fall 2 ──────────────────────────────────────────────────────────────────
pruefe('Fall 2 · Doppelklick auf Senden → nur ein Zug, Aufgabe rückt einmal vor', function () {
  var s = neueSzene(false);
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  var eins = s.antworte('Buenos días', 'offen');
  zustandGleich(eins, { zug: 1, aufgabeIndex: 1, abgelehnt: null });
  var zwei = s.antworte('Buenos días', 'offen');                        // R4
  zustandGleich(zwei, { zug: 1, aufgabeIndex: 1, phase: P.wartetAufSpikiu });
  wahr(typeof zwei.abgelehnt === 'string', 'zweiter Klick muss abgelehnt sein');
});

// ── Fall 3 ──────────────────────────────────────────────────────────────────
pruefe('Fall 3 · Zug, während Spikiu noch schreibt → abgelehnt (streng: wirft)', function () {
  var s = neueSzene(false);
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  s.antworte('Buenos días', 'offen');
  var z = s.antworte('Noch was', 'offen');
  wahr(typeof z.abgelehnt === 'string', 'abgelehnt muss einen Grund tragen');
  zustandGleich(z, { zug: 1, aufgabeIndex: 1, phase: P.wartetAufSpikiu });

  // Dieselbe Lage mit streng:true muss werfen, nicht schlucken.
  var t = strengeSzene();
  t.los(); t.spikiuAntwortet('...'); t.antworte('a', 'offen');
  var geworfen = false;
  try { t.antworte('b', 'offen'); } catch (e) { geworfen = true; }
  wahr(geworfen, 'streng:true muss werfen statt abzulehnen');
});

// ── Fall 4 ──────────────────────────────────────────────────────────────────
pruefe('Fall 4 · Spikiu antwortet in zwei Blasen → zwei Karten, Zähler nur auf der zweiten', function () {
  var s = strengeSzene();
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  var vor = s.antworte('Buenos días', 'offen');
  var z = s.spikiuAntwortet('¡Buenos días!\n---\n¿Qué desea tomar?');
  var blasen = s.blasen();
  gleich(blasen.length, 2, 'Anzahl Blasen');
  gleich(blasen[0], '¡Buenos días!', 'erste Blase');
  gleich(blasen[1], '¿Qué desea tomar?', 'zweite Blase');
  // Der Zustand wandert genau EINMAL, egal wie viele Blasen: Zähler und Aufgabe
  // hängen an der letzten Karte, nicht an jeder.
  gleich(z.zug, vor.zug, 'Zug darf sich durch Spikius Blasen nicht ändern');
  gleich(z.aufgabeIndex, vor.aufgabeIndex, 'Aufgabe darf sich durch Spikius Blasen nicht ändern');
  gleich(z.phase, P.wartetAufLerner, 'phase');
});

// ── Fall 5 ──────────────────────────────────────────────────────────────────
pruefe('Fall 5 · Abbruch auf der Bühne → direkt Ernte', function () {
  var s = strengeSzene();
  gleich(s.zustand().phase, P.buehne, 'Startphase');
  var z = s.abbrechen();                                                // R8
  zustandGleich(z, { phase: P.ernte, zug: 0, aufgabeIndex: 0, vorbei: false, abgelehnt: null });
});

// ── Fall 6 ──────────────────────────────────────────────────────────────────
pruefe('Fall 6 · Abbruch mitten im Gespräch → Ernte, die laufende Antwort verfällt', function () {
  var s = neueSzene(false);
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  s.antworte('Buenos días', 'offen');
  s.spikiuAntwortet('¿Y para tomar?');
  var z = s.abbrechen();
  zustandGleich(z, { phase: P.ernte, zug: 1, aufgabeIndex: 1, abgelehnt: null });
  gleich(s.offenerText(), null, 'offener Text muss verfallen');
  var nach = s.spikiuAntwortet('Nachzügler');                           // R9
  wahr(typeof nach.abgelehnt === 'string', 'Nachzügler-Karte muss abgelehnt werden');
  gleich(s.zustand().phase, P.ernte, 'phase bleibt Ernte');
});

// ── Fall 7 ──────────────────────────────────────────────────────────────────
pruefe('Fall 7 · Abbruch, während Spikiu schreibt → Ernte, die Antwort wird verworfen', function () {
  var s = neueSzene(false);
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  s.antworte('Buenos días', 'offen');
  gleich(s.zustand().phase, P.wartetAufSpikiu, 'Spikiu schreibt');
  var z = s.abbrechen();
  zustandGleich(z, { phase: P.ernte, zug: 1, abgelehnt: null });
  gleich(s.offenerText(), null, 'verworfener Text');
  var spaet = s.spikiuAntwortet('Die Antwort, die zu spät kommt');
  wahr(typeof spaet.abgelehnt === 'string', 'die laufende Antwort darf nicht mehr ankommen');
  gleich(s.blasen().length, 1, 'nur Spikius erste Replik steht in den Blasen');
});

// ── Fall 8 ──────────────────────────────────────────────────────────────────
pruefe('Fall 8 · Zweiter Abbruch → wird abgelehnt, nichts passiert', function () {
  var s = neueSzene(false);
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  var erst = s.abbrechen();
  gleich(erst.abgelehnt, null, 'erster Abbruch gilt');
  var zweit = s.abbrechen();                                            // R9
  wahr(typeof zweit.abgelehnt === 'string', 'zweiter Abbruch muss abgelehnt werden');
  zustandGleich(zweit, { phase: P.ernte, zug: 0, vorbei: false });
});

// ── Fall 9 ──────────────────────────────────────────────────────────────────
pruefe('Fall 9 · Sechs Züge ohne dritte Aufgabe → Ernte (Notbremse R7)', function () {
  var s = strengeSzene();
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  var arten = ['offen', 'offen', 'rolle', 'meta', 'rolle', 'rolle'];
  var z = null;
  for (var i = 0; i < arten.length; i++) {
    z = s.antworte('Zug ' + (i + 1), arten[i]);
    gleich(z.zug, i + 1, 'Zugzähler nach Zug ' + (i + 1));
    z = s.spikiuAntwortet('Antwort ' + (i + 1));
  }
  zustandGleich(z, { phase: P.ernte, zug: 6, aufgabeIndex: 2, ausgangOffen: false });
});

// ── Fall 10 ─────────────────────────────────────────────────────────────────
pruefe('Fall 10 · Zug nach der Ernte → abgelehnt', function () {
  var s = neueSzene(false);
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  s.abbrechen();
  var z = s.antworte('Noch ein Wort', 'offen');                         // R9
  wahr(typeof z.abgelehnt === 'string', 'Zug in der Ernte muss abgelehnt werden');
  zustandGleich(z, { phase: P.ernte, zug: 0, aufgabeIndex: 0 });
});

// ── Fall 11 ─────────────────────────────────────────────────────────────────
pruefe('Fall 11 · Themen-Wunsch rückt die Aufgabe nicht vor und zählt nicht', function () {
  var s = strengeSzene();
  var z = s.los('Ich möchte das Thema Café üben');                      // R2
  zustandGleich(z, { phase: P.wartetAufSpikiu, zug: 0, aufgabeIndex: 0 });
  gleich(s.aktuelleAufgabe(), AUFGABEN[0], 'Capy zeigt Aufgabe 1');     // R1
  gleich(s.offenerText(), 'Ich möchte das Thema Café üben', 'der Wunsch geht raus');

  // Der Startschuss fällt genau einmal: ein zweites los() wird abgelehnt.
  var t = neueSzene(false);
  t.los('Ich möchte das Thema Café üben');
  var zweiter = t.los('zweiter Startschuss');
  wahr(typeof zweiter.abgelehnt === 'string', 'ein zweites los() muss abgelehnt werden');
  zustandGleich(zweiter, { phase: P.wartetAufSpikiu, zug: 0, aufgabeIndex: 0 });
});

// ── Fall 12 ─────────────────────────────────────────────────────────────────
pruefe('Fall 12 · Der Capy zeigt in jeder Phase die richtige Aufgabe', function () {
  var s = strengeSzene();
  gleich(s.aktuelleAufgabe(), AUFGABEN[0], 'buehne');                   // R10
  s.los();
  gleich(s.aktuelleAufgabe(), AUFGABEN[0], 'wartetAufSpikiu');
  s.spikiuAntwortet('¿Qué desea?');
  gleich(s.aktuelleAufgabe(), AUFGABEN[0], 'wartetAufLerner');
  s.antworte('Buenos días', 'offen');
  gleich(s.aktuelleAufgabe(), AUFGABEN[1], 'nach dem ersten offenen Zug');
  s.spikiuAntwortet('¿Y para tomar?');
  s.antworte('¿Cómo?', 'rolle');
  gleich(s.aktuelleAufgabe(), AUFGABEN[1], 'eine Rückfrage verschiebt nichts');
  s.spikiuAntwortet('¿Qué quiere tomar?');
  s.antworte('Un café con leche', 'offen');
  gleich(s.aktuelleAufgabe(), AUFGABEN[2], 'nach dem zweiten offenen Zug');
  s.spikiuAntwortet('Enseguida.');
  s.antworte('La cuenta, por favor', 'offen');
  gleich(s.aktuelleAufgabe(), null, 'alle Aufgaben erledigt: keine offene mehr');
});

// ── Fall 13 ─────────────────────────────────────────────────────────────────
pruefe('Fall 13 · Drei Rückfragen hintereinander → Aufgabe 1 offen, Zugzähler bei 3', function () {
  var s = strengeSzene();
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  var z = null;
  var arten = ['rolle', 'rolle', 'meta'];                               // R13
  for (var i = 0; i < 3; i++) {
    z = s.antworte(['¿Cómo?', 'No entiendo', 'Was heißt „desea"?'][i], arten[i]);
    z = s.spikiuAntwortet('Repite: ¿Qué desea?');
  }
  zustandGleich(z, { phase: P.wartetAufLerner, zug: 3, aufgabeIndex: 0, ausgangOffen: false });
  gleich(s.aktuelleAufgabe(), AUFGABEN[0], 'Aufgabe 1 ist immer noch offen');
});

// ── Fall 14 ─────────────────────────────────────────────────────────────────
pruefe('Fall 14 · Sechs Rückfragen → Ernte, null Aufgaben erledigt, keine Endlosschleife', function () {
  var s = strengeSzene();
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  var z = null;
  for (var i = 0; i < 6; i++) {
    z = s.antworte('¿Cómo?', 'rolle');
    z = s.spikiuAntwortet('¿Qué desea tomar?');
  }
  zustandGleich(z, { phase: P.ernte, zug: 6, aufgabeIndex: 0, ausgangOffen: false });
  var weiter = SpikiuSzene.erzeuge({ aufgaben: AUFGABEN, maxZuege: 6 });
  weiter.los(); weiter.spikiuAntwortet('a');
  for (var k = 0; k < 6; k++) { weiter.antworte('¿Cómo?', 'rolle'); weiter.spikiuAntwortet('b'); }
  var nach = weiter.antworte('¿Cómo?', 'rolle');
  wahr(typeof nach.abgelehnt === 'string', 'nach der Ernte geht nichts mehr — keine Endlosschleife');
});

// ── Fall 15 ─────────────────────────────────────────────────────────────────
pruefe('Fall 15 · Netzfehler → fehler-Merkmal, Zugzähler unverändert', function () {
  var s = strengeSzene();
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  var vor = s.antworte('Buenos días', 'offen');
  var z = s.netzFehler();                                               // R14
  zustandGleich(z, { phase: P.wartetAufSpikiu, fehler: true, zug: vor.zug, aufgabeIndex: vor.aufgabeIndex, abgelehnt: null });
  gleich(z.zug, 1, 'ein Netzfehler ist kein Zug');
});

// ── Fall 16 ─────────────────────────────────────────────────────────────────
pruefe('Fall 16 · Nochmal nach Fehler → derselbe Text, Zugzähler zählt ihn einmal', function () {
  var s = strengeSzene();
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  s.antworte('Un café con leche, por favor', 'offen');
  s.netzFehler();
  var z = s.nochmal();
  zustandGleich(z, { phase: P.wartetAufSpikiu, fehler: false, zug: 1, aufgabeIndex: 1, abgelehnt: null });
  gleich(s.offenerText(), 'Un café con leche, por favor', 'nochmal schickt denselben Text');
  z = s.spikiuAntwortet('Enseguida.');
  zustandGleich(z, { phase: P.wartetAufLerner, zug: 1, aufgabeIndex: 1 });
});

// ── Fall 17 ─────────────────────────────────────────────────────────────────
pruefe('Fall 17 · Zwei Netzfehler hintereinander → Ernte', function () {
  var s = strengeSzene();
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  s.antworte('Buenos días', 'offen');
  var eins = s.netzFehler();
  gleich(eins.fehler, true, 'erster Fehler');
  s.nochmal();
  var zwei = s.netzFehler();                                            // R14
  zustandGleich(zwei, { phase: P.ernte, fehler: false, zug: 1, abgelehnt: null });
});

// ── Fall 18 ─────────────────────────────────────────────────────────────────
pruefe('Fall 18 · Dritte Aufgabe erledigt, Lerner redet weiter → erlaubt bis Zug sechs, Ausgang bleibt offen', function () {
  var s = strengeSzene();
  s.los(); s.spikiuAntwortet('¿Qué desea?');
  var z = null;
  for (var i = 0; i < 3; i++) { z = s.antworte('offener Zug ' + (i + 1), 'offen'); z = s.spikiuAntwortet('sí'); }
  zustandGleich(z, { phase: P.wartetAufLerner, zug: 3, aufgabeIndex: 3, ausgangOffen: true });

  for (var k = 4; k <= 6; k++) {
    z = s.antworte('weiter reden ' + k, 'offen');
    gleich(z.zug, k, 'Zugzähler bei Zug ' + k);
    gleich(z.aufgabeIndex, 3, 'die Aufgaben bleiben bei drei');
    gleich(z.ausgangOffen, true, 'der Ausgang bleibt offen');
    if (k < 6) { z = s.spikiuAntwortet('sí'); gleich(z.phase, P.wartetAufLerner, 'noch nicht Schluss'); }
  }
  z = s.spikiuAntwortet('¡Hasta luego!');                               // R7 schließt die Tür
  zustandGleich(z, { phase: P.ernte, zug: 6, aufgabeIndex: 3, ausgangOffen: true });
});

// ── Der Zustand ist unveränderlich nach außen ───────────────────────────────
pruefe('Zusatz · Der zurückgegebene Zustand lässt sich nicht von außen verbiegen', function () {
  var s = neueSzene(false);
  var z = s.los();
  try { z.zug = 99; } catch (e) { /* strict mode wirft — auch recht */ }
  gleich(s.zustand().zug, 0, 'innerer Zug bleibt unberührt');
  var liste = s.aufgabenListe();
  liste.push('geschmuggelt');
  gleich(s.aufgabenListe().length, AUFGABEN.length, 'Aufgabenliste ist eine Kopie');
});

// ─────────────────────────────────────────────────────────────────────────────
console.log('');
console.log('DAS SIEB — frage-sieb.js');
console.log('');

function siebPruefe(titel, text, zielsprache, muttersprache, soll) {
  pruefe(titel + ' · "' + text + '" → ' + soll, function () {
    var urteil = SpikiuSieb.art(text, zielsprache, muttersprache);
    gleich(urteil, soll, 'Urteil');
  });
}

// ── Muttersprache Deutsch, Zielsprache Spanisch ────────────────────────────
[
  '¿Cómo?', 'No entiendo', '¿Perdón?', 'Otra vez', 'Más despacio'
].forEach(function (t, i) {
  siebPruefe('Sieb de/es · Rolle ' + (i + 1), t, 'es', 'de', 'rolle');
});
[
  'Was heißt „la cuenta"?',
  'Wie sagt man Rechnung auf Spanisch?',
  'Was bedeutet „pedir"?',
  'Erklär mir bitte den Unterschied',
  'Wie schreibt man das?'
].forEach(function (t, i) {
  siebPruefe('Sieb de/es · Meta ' + (i + 1), t, 'es', 'de', 'meta');
});

// ── Muttersprache Spanisch, Zielsprache Deutsch ────────────────────────────
[
  'Wie bitte?', 'Ich verstehe nicht', 'Noch einmal', 'Entschuldigung?', 'Langsamer bitte'
].forEach(function (t, i) {
  siebPruefe('Sieb es/de · Rolle ' + (i + 1), t, 'de', 'es', 'rolle');
});
[
  '¿Qué significa „Rechnung"?',
  '¿Cómo se dice cuenta en alemán?',
  '¿Qué quiere decir „bestellen"?',
  'Explícame la diferencia',
  '¿Cómo se escribe eso?'
].forEach(function (t, i) {
  siebPruefe('Sieb es/de · Meta ' + (i + 1), t, 'de', 'es', 'meta');
});

// ── Muttersprache Englisch, Zielsprache Spanisch ───────────────────────────
[
  '¿Cómo?', 'No entiendo', 'Otra vez, por favor', '¿Puede repetir?', 'No comprendo'
].forEach(function (t, i) {
  siebPruefe('Sieb en/es · Rolle ' + (i + 1), t, 'es', 'en', 'rolle');
});
[
  "What does „la cuenta\" mean?",
  'How do you say bill in Spanish?',
  "What's the word for waiter?",
  'Explain the difference please',
  'How do I say that in English?'
].forEach(function (t, i) {
  siebPruefe('Sieb en/es · Meta ' + (i + 1), t, 'es', 'en', 'meta');
});

// ── Offene Züge: das Sieb darf echte Antworten nicht einsammeln ────────────
[
  ['Un café con leche, por favor', 'es', 'de'],
  ['La cuenta, por favor', 'es', 'de'],
  ['Ich hätte gern einen Kaffee', 'de', 'es'],
  ['Buenos días, una mesa para dos', 'es', 'en']
].forEach(function (fall, i) {
  siebPruefe('Sieb · Offen ' + (i + 1), fall[0], fall[1], fall[2], 'offen');
});

// ── Die drei Grenzfälle ────────────────────────────────────────────────────
// „Ok" — kein deutsches Wort in der Liste, ein Wort → Rückfrage. Folge: es schließt
// keine Aufgabe ab, und genau das ist richtig; ein „Ok" ist keine Antwort.
siebPruefe('Grenzfall 1', 'Ok', 'es', 'de', 'rolle');
// „Sí" — ein Wort Zielsprache, kein Muttersprach-Wort → Rückfrage. Schließt keine
// Aufgabe ab; ein bloßes „Sí" führt die Szene nicht weiter.
siebPruefe('Grenzfall 2', 'Sí', 'es', 'de', 'rolle');
// „Hallo" — steht als deutsches Wort im Muttersprach-Verzeichnis, also greift die
// Drei-Wörter-Regel nicht → offen.
siebPruefe('Grenzfall 3', 'Hallo', 'es', 'de', 'offen');

// ── Schluss ────────────────────────────────────────────────────────────────
console.log('');
if (rote.length) {
  console.log('ROTE FÄLLE:');
  rote.forEach(function (r) { console.log('  · ' + r.titel + ' — ' + r.grund); });
  console.log('');
}
console.log(gruen + '/' + (gruen + rot) + ' grün');
process.exit(rot ? 1 : 0);
