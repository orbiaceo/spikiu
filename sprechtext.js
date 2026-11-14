/* sprechtext.js — SPIKIU · WAS die Stimme liest und WIE der Schlüssel einer Aufnahme heißt.
   EINE Funktion für App UND Aufnahme (Leo, 14.11.2026: Supertonic 3 statt Piper, vorher
   aufgenommen): audio.js spielt `audio/<sprache>/<stimme>/<schluessel(text)>.mp3`, und
   scripts/audio/extract.js erzeugt die Satzliste mit GENAU diesen Funktionen. Ändert sich
   hier etwas, muss neu aufgenommen werden (nur Neues wird aufgenommen).

   Klassisches Skript ohne import/export: im Browser → window.SpikiuSprechText,
   in Node → module.exports. audio.js lädt es per `import '/sprechtext.js'`. */
(function (wurzel) {
  'use strict';

  // ── Sprech-Ebene ≠ Lese-Ebene (Leo, 07.11.2026: „Bue-no es lo visual. Lo que lee la voz debe ser: bueno.“) ──
  // ── Buchstabieren (Leo, 11.11.2026) — unverändert aus audio.js übernommen ──
  var PAUSE = '⏸';
  var BUCHSTABE_ES = { A: 'a', B: 'be', C: 'ce', D: 'de', E: 'e', F: 'efe', G: 'ge', H: 'hache', I: 'i', J: 'jota', K: 'ka',
    L: 'ele', M: 'eme', N: 'ene', 'Ñ': 'eñe', O: 'o', P: 'pe', Q: 'cu', R: 'erre', S: 'ese', T: 'te', U: 'u', V: 'uve',
    W: 'uve doble', X: 'equis', Y: 'ye', Z: 'zeta', 'Á': 'a con tilde', 'É': 'e con tilde', 'Í': 'i con tilde',
    'Ó': 'o con tilde', 'Ú': 'u con tilde', 'Ü': 'u con diéresis' };
  var BS_ITEM = '(?:i griega|uve doble|doble (?:ele|erre)|hache|jota|erre|equis|zeta|\\p{L}{1,3})(?:\\s+con\\s+(?:tilde|diéresis))?';
  var BS_LISTE = new RegExp('(^|[^\\p{L}])(' + BS_ITEM + '(?:\\s*[,·;\\/]\\s*' + BS_ITEM + '){2,})(?![\\p{L}])', 'giu');
  var BS_VOKALE = /(^|[^\p{L}\-‐‑])([aeiouáéíóú](?:\s+[aeiouáéíóú]){2,})(?![\p{L}\-‐‑])/giu;
  var BS_GROSS = /(^|[^\p{L}])(\p{Lu}(?:[-‐‑]\p{Lu}){2,})(?![\p{L}])/gu;

  function alsListe(vor, elemente) {
    var e = elemente.map(function (x) { return x.trim(); }).filter(Boolean);
    var klein = {}; e.forEach(function (x) { klein[x.toLowerCase()] = 1; });
    if (Object.keys(klein).length === 1) return null;   // Ausruf („¡Ay, ay, ay!“), kein Buchstabieren
    return vor + ' ' + PAUSE + ' ' + e.map(function (x) { return x + '.'; }).join(' ' + PAUSE + ' ') + ' ' + PAUSE + ' ';
  }
  function buchstabieren(t, zielsprache) {
    t = t.replace(BS_GROSS, function (m, vor, folge) {
      return vor + folge.split(/[-‐‑]/).map(function (c) { return zielsprache === 'es' ? (BUCHSTABE_ES[c] || c.toLowerCase()) : c; }).join(', ');
    });
    t = t.replace(BS_LISTE, function (m, vor, liste) { return alsListe(vor, liste.split(/[,·;\/]/)) || m; });
    t = t.replace(BS_VOKALE, function (m, vor, liste) { return alsListe(vor, liste.split(/\s+/)) || m; });
    return t.replace(new RegExp(PAUSE + '\\s*[.,;:!?…]+', 'g'), PAUSE);
  }

  /** Was die Stimme liest: Buchstabieren, Silben-Bindestriche zum Wort, Leerraum glätten. */
  function sprechText(text, zielsprache) {
    return buchstabieren(String(text == null ? '' : text), zielsprache)
      .replace(/(\p{L})[-‐‑](?=\p{L})/gu, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // cyrb53 (öffentlich bekannter 53-Bit-Hash) → 14 Hex-Zeichen, stabil über Browser und Node.
  function cyrb53(str) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, '0');
  }

  /** Schlüssel einer Aufnahme: aus dem GESPROCHENEN Text (nach sprechText). */
  function schluessel(gesprochen) { return cyrb53(String(gesprochen).normalize('NFC')); }

  /** Sätze eines Textes — für das Zusammensetzen, wenn der ganze Text keine eigene Aufnahme hat. */
  function saetze(gesprochen) {
    var t = String(gesprochen).replace(new RegExp(PAUSE, 'g'), ' ').replace(/\s+/g, ' ').trim();
    if (!t) return [];
    return (t.match(/[^.!?…;]+[.!?…;]+["»”’)]*|\S[^.!?…;]*$/g) || [t])
      .map(function (s) { return s.trim(); }).filter(function (s) { return /\p{L}|\p{N}/u.test(s); });
  }

  /** Text mit dem Vornamen der Lernenden → [vorher, NAME, nachher]. Feste Rahmen werden ohne
   *  den Namen aufgenommen; der Name ist ein eigenes Stück (fehlt er, bleibt nur er still). */
  function nameTeile(gesprochen, vorname) {
    var n = String(vorname || '').trim();
    var t = String(gesprochen);
    if (!n || t.indexOf(n) < 0) return null;
    var i = t.indexOf(n);
    var vor = t.slice(0, i).trim();
    var nach = t.slice(i + n.length).replace(/^[\s,.;:!?…]+/, '').trim();
    return [vor, n, nach];
  }

  /** Ohne Name: „¡Hola, !“ → „¡Hola!“ — so wie die Räume den Gruß ohne Namen bauen. */
  function ohneName(rahmen) { return String(rahmen).replace(/,\s*([!?.])/g, '$1').replace(/\s+/g, ' ').trim(); }

  var API = { PAUSE: PAUSE, sprechText: sprechText, schluessel: schluessel, saetze: saetze, nameTeile: nameTeile, ohneName: ohneName, cyrb53: cyrb53 };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (wurzel) wurzel.SpikiuSprechText = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));
