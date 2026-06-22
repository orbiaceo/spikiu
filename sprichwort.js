/* ===================================================================
   sprichwort.js — Sprichwort des Tages (Spikiu)
   -------------------------------------------------------------------
   Liefert EIN Sprichwort pro Tag in der ZIELSPRACHE des Nutzers,
   IMMER mit Übersetzung in seine MUTTERSPRACHE. Quelle ohne Link.
   Rein lokal (kein Server, keine API) — rotiert nach Kalendertag.

   Einbindung (klassisch, wie nav.js):
     <script src="sprichwort.js" defer></script>
   Dann im Dashboard:
     var s = window.spikiuSprichwort(profile.zielsprache, profile.muttersprache);
     // s = { text, translation, src }   text = Zielsprache, translation = Muttersprache

   KURATION: Diese Listen sind ein Start-Satz. Leonardo (Linguist) pflegt
   und erweitert sie — die kanonische Wahrheit lebt in dieser Datei.
   Regeln: text = echte Wendung in der Zielsprache; t.de/t.es/t.en =
   treue Übersetzung; src = Gattung ohne Link (z. B. „Refrán español").
   Griechisch ist NUR Zielsprache, daher kein t.el nötig.
=================================================================== */
(function (w) {
  'use strict';

  var SPRICHWOERTER = {
    es: [
      { text: 'Quien mucho abarca, poco aprieta.', src: 'Refrán español',
        t: { de: 'Wer zu viel auf einmal will, schafft am Ende wenig.', en: 'Grasp all, lose all.' } },
      { text: 'A buen entendedor, pocas palabras bastan.', src: 'Refrán español',
        t: { de: 'Dem Klugen genügen wenige Worte.', en: 'A word to the wise is enough.' } },
      { text: 'No por mucho madrugar amanece más temprano.', src: 'Refrán español',
        t: { de: 'Früher aufstehen lässt die Sonne nicht früher aufgehen.', en: 'Rising early won\u2019t make the sun come up sooner.' } },
      { text: 'Más vale tarde que nunca.', src: 'Refrán español',
        t: { de: 'Besser spät als nie.', en: 'Better late than never.' } },
      { text: 'Más vale pájaro en mano que ciento volando.', src: 'Refrán español',
        t: { de: 'Besser ein Spatz in der Hand als eine Taube auf dem Dach.', en: 'A bird in the hand is worth two in the bush.' } },
      { text: 'El que no arriesga, no gana.', src: 'Refrán español',
        t: { de: 'Wer nicht wagt, der nicht gewinnt.', en: 'Nothing ventured, nothing gained.' } },
      { text: 'No dejes para mañana lo que puedas hacer hoy.', src: 'Refrán español',
        t: { de: 'Verschiebe nicht auf morgen, was du heute tun kannst.', en: 'Don\u2019t put off until tomorrow what you can do today.' } },
      { text: 'Poco a poco se anda lejos.', src: 'Refrán español',
        t: { de: 'Schritt für Schritt kommt man weit.', en: 'Little by little, one goes far.' } }
    ],
    de: [
      { text: 'Übung macht den Meister.', src: 'Deutsches Sprichwort',
        t: { es: 'La práctica hace al maestro.', en: 'Practice makes perfect.' } },
      { text: 'Morgenstund hat Gold im Mund.', src: 'Deutsches Sprichwort',
        t: { es: 'A quien madruga, Dios le ayuda.', en: 'The early bird catches the worm.' } },
      { text: 'Aller Anfang ist schwer.', src: 'Deutsches Sprichwort',
        t: { es: 'Todo comienzo es difícil.', en: 'Every beginning is hard.' } },
      { text: 'Wer A sagt, muss auch B sagen.', src: 'Deutsches Sprichwort',
        t: { es: 'Quien dice A, debe decir B.', en: 'In for a penny, in for a pound.' } }
    ],
    en: [
      { text: 'Practice makes perfect.', src: 'English proverb',
        t: { de: 'Übung macht den Meister.', es: 'La práctica hace al maestro.' } },
      { text: 'Where there\u2019s a will, there\u2019s a way.', src: 'English proverb',
        t: { de: 'Wo ein Wille ist, ist auch ein Weg.', es: 'Querer es poder.' } },
      { text: 'Better late than never.', src: 'English proverb',
        t: { de: 'Besser spät als nie.', es: 'Más vale tarde que nunca.' } }
    ],
    el: [
      { text: 'Η γλώσσα κόκαλα δεν έχει και κόκαλα τσακίζει.', src: 'Ελληνική παροιμία',
        t: { de: 'Die Zunge hat keine Knochen und bricht doch Knochen.', en: 'The tongue has no bones, yet it breaks bones.', es: 'La lengua no tiene huesos, pero rompe huesos.' } },
      { text: 'Όπου λαλούν πολλά κοκόρια, αργεί να ξημερώσει.', src: 'Ελληνική παροιμία',
        t: { de: 'Wo viele Hähne krähen, dauert es lange bis zum Morgen.', en: 'Where many roosters crow, dawn is slow to come.', es: 'Donde cantan muchos gallos, tarda en amanecer.' } }
    ]
  };

  // Kalendertag-Index (lokal, rotiert täglich, gleich für alle Geräte am selben Tag)
  function dayIndex() {
    return Math.floor(Date.now() / 86400000);
  }

  /**
   * spikiuSprichwort(zielsprache, muttersprache)
   * @returns {{text:string, translation:string, src:string}}
   *   text        = Sprichwort in der Zielsprache
   *   translation = Übersetzung in die Muttersprache (immer gesetzt)
   *   src         = Quelle/Gattung (ohne Link)
   */
  w.spikiuSprichwort = function (zielsprache, muttersprache) {
    var list = SPRICHWOERTER[zielsprache] || SPRICHWOERTER.es;
    var p = list[dayIndex() % list.length];
    var tr = (p.t && (p.t[muttersprache] || p.t.de || p.t.en || p.t.es)) || '';
    return { text: p.text, translation: tr, src: p.src };
  };

  // optionaler Direktzugriff auf die Daten (für Kuration/Tests)
  w.spikiuSprichwort.daten = SPRICHWOERTER;

})(window);
