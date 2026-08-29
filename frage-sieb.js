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

  function woerter(gefaltet) {
    return gefaltet.length ? gefaltet.split(' ') : [];
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

  // ── Muttersprach-Wörter ────────────────────────────────────────────────────
  // Nur für die zweite Hälfte der Rollen-Regel: „höchstens drei Wörter und KEIN
  // Muttersprach-Wort darin". Hochfrequente Funktionswörter reichen dafür.
  var MUTTER_WOERTER = {
    de: ('ich du er sie es wir ihr man mich mir dich dir uns euch ihn ihm ' +
         'ist bin bist sind seid war waren wäre hat habe haben hast hatte hatten ' +
         'kann kannst können könnte muss musst müssen will willst möchte möchten ' +
         'weiß wissen soll sollte darf werde wird ' +
         'was wie wer wen wem wo wohin woher wann warum welche welcher welches ' +
         'der die das den dem des ein eine einen einem eines einer ' +
         'und oder aber denn nicht kein keine keinen nichts auch nur schon noch ' +
         'mit ohne für von zu zum zur auf in im an am bei aus nach über unter vor ' +
         'bitte danke hallo tschüss ja nein doch gern gerne ' +
         'gut schlecht sehr mehr weniger wieder mal etwas alles ' +
         'heißt heisst bedeutet sagt sagen sagst sag verstehe verstanden verstehen ' +
         'deutsch spanisch englisch wort satz frage antwort').split(' '),
    es: ('yo tú tu vos él ella nosotros ustedes ellos ellas me te se le lo la los las nos ' +
         'un una unos unas el del al ' +
         'es son soy eres somos era eran fue fui está están estoy estamos hay ' +
         'tiene tengo tienes puedo puedes puede quiero quieres quiere ' +
         'qué que cómo como quién quien dónde donde cuándo cuando cuál cual ' +
         'por porque para y o pero ni también sólo solo ya todavía muy más menos ' +
         'con sin de en a sobre bajo antes después entre hasta desde ' +
         'favor gracias sí si hola adiós bien mal bueno mala ' +
         'significa dice decir digo entiendo explica palabra frase pregunta respuesta ' +
         'español alemán inglés').split(' '),
    en: ('i you he she it we they me my your his her our their us him them ' +
         'the a an this that these those ' +
         'is are am was were be been being have has had do does did ' +
         'can could would should will shall may might must ' +
         'what how who whom where when why which ' +
         'and or but not no yes hello hi hey thanks thank please ' +
         'very more less again already still just only too also ' +
         'in on at to for of with without from about into over under ' +
         'mean means meaning say says said word sentence question answer ' +
         'understand explain translate english german spanish good bad').split(' ')
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
  function falteMenge(liste) {
    var menge = Object.create(null);
    for (var i = 0; i < liste.length; i++) {
      var g = falte(liste[i]);
      if (g) menge[g] = true;
    }
    return menge;
  }

  var ROLLE_GEFALTET = {};
  for (var zs in ROLLE_LISTEN) ROLLE_GEFALTET[zs] = falteListe(ROLLE_LISTEN[zs]);

  var META_GEFALTET = {};
  for (var ms in META_WENDUNGEN) META_GEFALTET[ms] = falteListe(META_WENDUNGEN[ms]);

  var WORT_MENGEN = {};
  for (var mw in MUTTER_WOERTER) WORT_MENGEN[mw] = falteMenge(MUTTER_WOERTER[mw]);

  var MAX_KURZ = 3;   // „höchstens drei Wörter"

  // ── Das Urteil ─────────────────────────────────────────────────────────────
  function art(text, zielsprache, muttersprache) {
    var gefaltet = falte(text);
    if (!gefaltet) return 'offen';                       // nichts zu sieben

    var zs2 = String(zielsprache || '').slice(0, 2).toLowerCase();
    var ms2 = String(muttersprache || '').slice(0, 2).toLowerCase();

    // 1. Steht es wörtlich auf der festen Liste der Rückfragen in der Zielsprache?
    //    Diese Prüfung kommt zuerst: „No entiendo" ist eine Rückfrage, auch wenn
    //    „no" zufällig ein englisches Wort ist.
    var liste = ROLLE_GEFALTET[zs2];
    if (liste && liste.indexOf(gefaltet) !== -1) return 'rolle';

    // 2. Enthält es eine Muttersprach-Wendung? Dann ist es eine Meta-Frage.
    var wendungen = META_GEFALTET[ms2];
    if (wendungen) {
      for (var i = 0; i < wendungen.length; i++) {
        if (gefaltet.indexOf(wendungen[i]) !== -1) return 'meta';
      }
    }

    // 3. Höchstens drei Wörter und kein Muttersprach-Wort darin → Rückfrage.
    var teile = woerter(gefaltet);
    if (teile.length <= MAX_KURZ) {
      var menge = WORT_MENGEN[ms2];
      var mutterDrin = false;
      if (menge) {
        for (var k = 0; k < teile.length; k++) {
          if (menge[teile[k]]) { mutterDrin = true; break; }
        }
      }
      if (!mutterDrin) return 'rolle';
    }

    // 4. Alles andere.
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
