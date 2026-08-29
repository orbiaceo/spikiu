// frage-sieb.js — Das Sieb
// ─────────────────────────────────────────────────────────────────────────────
// Maßstab: szene-regeln.md, Abschnitt „Das Sieb".
//
//   SpikiuSieb.art(text, zielsprache, muttersprache) → 'offen' | 'rolle' | 'meta'
//
// Vor jedem Absenden entscheidet der Client, welche Art Zug vorliegt — nicht das
// Modell, nicht der Prompt. Durchsetzen in der Engine, nicht im Prompt.
//
// Rein: ohne Zustand, ohne Netz, ohne DOM. Trifft das Sieb daneben, antwortet
// Spikiu wie ohne Sieb — es blockiert nichts, es flüstert nur zu.
//
// Gemessener Anlass: Haiku 4.5 hielt am 29.08. alle vier Struktur-Signale
// (20/20), verwechselte aber 3 von 10 Rollen-Rückfragen mit Meta-Fragen.
//
// VORFAHRT FÜR „OFFEN" (Entscheid 29.08., nach dem ersten Testlauf):
// Die Fehler sind nicht gleich teuer. Ein falsches „offen" kostet EINE Aufgabe.
// Ein falsches „rolle" kostet die SZENE — der Lerner antwortet richtig, aber
// knapp („Un café"), die Aufgabe rückt nicht vor, und er erreicht den Ausgang
// nie, nur die Notbremse. Deshalb wurde die frühere Regel „höchstens drei
// Wörter und kein Muttersprach-Wort → Rückfrage" ersatzlos gestrichen.
// Es gilt jetzt: NUR was auf der festen Liste steht, ist eine Rückfrage.
// Alles Unbekannte ist ein offener Zug. Die Listen wachsen mit der Beta.

(function (global) {
  'use strict';

  // ── Normalisieren ──────────────────────────────────────────────────────────
  // Kleinschreibung, Apostroph fällt weg (what's → whats), jede andere
  // Nicht-Buchstabe/Ziffer wird zum Leerzeichen. Akzente bleiben.
  function normalisiere(t) {
    return String(t == null ? '' : t)
      .toLowerCase()
      .replace(/['’‘`´]/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim();
  }

  // Zusätzlich akzentfrei — beide Seiten des Vergleichs werden gefaltet, damit
  // „¿Cómo?" und „como" dasselbe treffen und „heißt"/„heisst" zusammenfallen.
  function falte(t) {
    return normalisiere(t)
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ς/g, 'σ');   // ς → σ
  }

  // ── Die festen Listen der Rückfragen, in der ZIELSPRACHE ───────────────────
  var ROLLE_LISTEN = {
    es: [
      '¿cómo?', 'cómo', '¿qué?', 'qué', '¿perdón?', 'perdón', '¿disculpe?', 'disculpe',
      '¿mande?', 'otra vez', 'otra vez por favor', 'de nuevo', 'una vez más',
      'no entiendo', 'no entendí', 'no comprendo', 'no sé', 'ni idea',
      '¿puede repetir?', '¿puedes repetir?', 'repita por favor', 'repite por favor',
      '¿cómo dice?', '¿cómo dices?', 'más despacio', 'más despacio por favor',
      '¿perdón cómo?', '¿otra vez?'
    ],
    de: [
      'wie bitte?', 'bitte?', 'was?', 'wie?', 'hä?', 'häh?',
      'entschuldigung?', 'entschuldigung', 'verzeihung?',
      'nochmal', 'noch mal', 'nochmal bitte', 'noch mal bitte',
      'noch einmal', 'noch einmal bitte', 'wiederholen sie bitte',
      'ich verstehe nicht', 'verstehe nicht', 'ich verstehe das nicht',
      'ich habe nicht verstanden', 'keine ahnung', 'ich weiß nicht',
      'langsamer bitte', 'bitte langsamer',
      'kannst du das wiederholen?', 'können sie das wiederholen?'
    ],
    en: [
      'pardon?', 'pardon', 'sorry?', 'sorry', 'what?', 'again?', 'again',
      'come again?', 'excuse me?', 'excuse me', 'huh?',
      'i dont understand', "i don't understand", 'i dont get it',
      'say that again', 'say it again', 'one more time',
      'can you repeat that?', 'could you repeat that?', 'can you say that again?',
      'slower please', 'more slowly please', 'no idea', 'i dont know'
    ],
    el: [
      'τι;', 'πώς;', 'ορίστε;', 'συγγνώμη;', 'συγγνώμη',
      'δεν καταλαβαίνω', 'δεν κατάλαβα', 'δεν ξέρω',
      'ξανά', 'άλλη μια φορά', 'πιο αργά', 'πιο αργά παρακαλώ',
      'μπορείτε να το επαναλάβετε;', 'το ξαναλέτε;'
    ]
  };

  // ── Die Muttersprach-Wendungen, an denen eine META-Frage kenntlich wird ────
  var META_WENDUNGEN = {
    de: [
      'was heißt', 'was heisst', 'wie heißt', 'wie heisst',
      'wie sagt man', 'wie sagt ihr', 'wie sage ich',
      'was bedeutet', 'bedeutung von', 'was meint',
      'erklär', 'erkläre', 'erklärst du', 'erklärung',
      'auf deutsch', 'auf spanisch', 'auf englisch',
      'wie schreibt man', 'wie spricht man', 'übersetz',
      'was ist der unterschied', 'unterschied zwischen'
    ],
    es: [
      'qué significa', 'que significa', 'significa',
      'cómo se dice', 'como se dice', 'cómo se escribe', 'como se escribe',
      'cómo se pronuncia', 'como se pronuncia',
      'qué quiere decir', 'que quiere decir',
      'explica', 'explícame', 'explicame', 'explicación',
      'en español', 'en alemán', 'en inglés',
      'traduce', 'traducción', 'cuál es la diferencia', 'cual es la diferencia'
    ],
    en: [
      'what does', 'what means', 'what is the meaning', 'meaning of',
      'how do you say', 'how do i say', 'how do you spell', 'how do you pronounce',
      "what's the word", 'what is the word', 'word for',
      'explain', 'explanation',
      'in english', 'in german', 'in spanish',
      'translate', 'translation', "what's the difference", 'what is the difference'
    ]
  };

  // Listen einmal falten, damit der Vergleich beidseitig gleich läuft.
  function falteListe(liste) {
    var raus = [];
    for (var i = 0; i < liste.length; i++) {
      var g = falte(liste[i]);
      if (g && raus.indexOf(g) === -1) raus.push(g);
    }
    return raus;
  }
  var ROLLE_GEFALTET = {};
  for (var zs in ROLLE_LISTEN) ROLLE_GEFALTET[zs] = falteListe(ROLLE_LISTEN[zs]);

  var META_GEFALTET = {};
  for (var ms in META_WENDUNGEN) META_GEFALTET[ms] = falteListe(META_WENDUNGEN[ms]);

  // ── Das Urteil ─────────────────────────────────────────────────────────────
  function art(text, zielsprache, muttersprache) {
    var gefaltet = falte(text);
    if (!gefaltet) return 'offen';                       // nichts zu sieben

    var zs2 = String(zielsprache || '').slice(0, 2).toLowerCase();
    var ms2 = String(muttersprache || '').slice(0, 2).toLowerCase();

    // 1. Steht es wörtlich auf der festen Liste der Rückfragen in der Zielsprache?
    //    Diese Prüfung kommt zuerst: „No entiendo" ist eine Rückfrage, auch wenn
    //    „no" zufällig ein englisches Wort ist. NUR was auf der Liste steht, ist
    //    eine Rückfrage — es wird nicht geraten (siehe Kopf: Vorfahrt für „offen").
    var liste = ROLLE_GEFALTET[zs2];
    if (liste && liste.indexOf(gefaltet) !== -1) return 'rolle';

    // 2. Enthält es eine Muttersprach-Wendung? Dann ist es eine Meta-Frage.
    var wendungen = META_GEFALTET[ms2];
    if (wendungen) {
      for (var i = 0; i < wendungen.length; i++) {
        if (gefaltet.indexOf(wendungen[i]) !== -1) return 'meta';
      }
    }

    // 3. Alles andere ist ein offener Zug.
    return 'offen';
  }

  var SpikiuSieb = {
    art: art,
    normalisiere: normalisiere,
    falte: falte,
    ARTEN: Object.freeze(['offen', 'rolle', 'meta']),
    ZIELSPRACHEN: Object.freeze(Object.keys(ROLLE_LISTEN)),
    MUTTERSPRACHEN: Object.freeze(Object.keys(META_WENDUNGEN))
  };

  if (global) global.SpikiuSieb = SpikiuSieb;
  if (typeof module !== 'undefined' && module.exports) module.exports = SpikiuSieb;

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));
