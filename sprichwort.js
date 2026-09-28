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

  /* icon: Emoji als Schlüssel → self-hosted OpenMoji-SVG in bilder/om-*.svg
     (Dateiname = Codepunkte ohne FE0F). Nur wo ein Bild trägt; sonst weglassen,
     dann zeigt die Karte KEIN Icon (Leo 17.08./27.09.: keine Einheits-Schriftrolle). */
  /* w: WÖRTLICHE Übersetzung je Muttersprache (Leo, 28.09.): erscheint, wenn der
     Lerner auf den Satz tippt. Fehlt w, sagt t schon wörtlich dasselbe → kein Tipp nötig. */
  var SPRICHWOERTER = {
    es: [
      { text: 'Quien mucho abarca, poco aprieta.', icon: 'sp-abarcar', src: 'Refrán español',
        w: { de: 'Wer viel umfasst, drückt wenig zusammen.', en: 'Who embraces much, squeezes little.' },
        t: { de: 'Wer zu viel auf einmal will, schafft am Ende wenig.', en: 'Grasp all, lose all.' } },
      { text: 'A buen entendedor, pocas palabras bastan.', icon: '👂', src: 'Refrán español',
        w: { de: 'Einem guten Versteher genügen wenige Worte.', en: 'For a good understander, few words are enough.' },
        t: { de: 'Dem Klugen genügen wenige Worte.', en: 'A word to the wise is enough.' } },
      { text: 'No por mucho madrugar amanece más temprano.', icon: '🌅', src: 'Refrán español',
        w: { de: 'Nicht weil man sehr früh aufsteht, wird es früher Tag.', en: 'Not by getting up very early does day break sooner.' },
        t: { de: 'Früher aufstehen lässt die Sonne nicht früher aufgehen.', en: 'Rising early won\u2019t make the sun come up sooner.' } },
      { text: 'Más vale tarde que nunca.', icon: '⏰', src: 'Refrán español',
        t: { de: 'Besser spät als nie.', en: 'Better late than never.' } },
      { text: 'Más vale pájaro en mano que ciento volando.', icon: '🐦', src: 'Refrán español',
        w: { de: 'Mehr wert ist ein Vogel in der Hand als hundert, die fliegen.', en: 'A bird in the hand is worth more than a hundred flying.' },
        t: { de: 'Besser ein Spatz in der Hand als eine Taube auf dem Dach.', en: 'A bird in the hand is worth two in the bush.' } },
      { text: 'El que no arriesga, no gana.', icon: '🎲', src: 'Refrán español',
        t: { de: 'Wer nicht wagt, der nicht gewinnt.', en: 'Nothing ventured, nothing gained.' } },
      { text: 'No dejes para mañana lo que puedas hacer hoy.', icon: '📅', src: 'Refrán español',
        t: { de: 'Verschiebe nicht auf morgen, was du heute tun kannst.', en: 'Don\u2019t put off until tomorrow what you can do today.' } },
      { text: 'Poco a poco se anda lejos.', icon: '🐢', src: 'Refrán español',
        w: { de: 'Wenig um wenig geht man weit.', en: 'Little by little one walks far.' },
        t: { de: 'Schritt für Schritt kommt man weit.', en: 'Little by little, one goes far.' } }
    ],
    de: [
      { text: 'Übung macht den Meister.', icon: '🛠️', src: 'Deutsches Sprichwort',
        t: { es: 'La práctica hace al maestro.', en: 'Practice makes perfect.' } },
      { text: 'Morgenstund hat Gold im Mund.', icon: '🌄', src: 'Deutsches Sprichwort',
        w: { es: 'La hora de la mañana tiene oro en la boca.', en: 'The morning hour has gold in its mouth.' },
        t: { es: 'A quien madruga, Dios le ayuda.', en: 'The early bird catches the worm.' } },
      { text: 'Aller Anfang ist schwer.', icon: '🌱', src: 'Deutsches Sprichwort',
        t: { es: 'Todo comienzo es difícil.', en: 'Every beginning is hard.' } },
      { text: 'Wer A sagt, muss auch B sagen.', icon: '🔤', src: 'Deutsches Sprichwort',
        t: { es: 'Quien dice A, debe decir B.', en: 'In for a penny, in for a pound.' } }
    ],
    en: [
      { text: 'Practice makes perfect.', icon: '🛠️', src: 'English proverb',
        w: { de: 'Übung macht perfekt.', es: 'La práctica hace perfecto.' },
        t: { de: 'Übung macht den Meister.', es: 'La práctica hace al maestro.' } },
      { text: 'Where there\u2019s a will, there\u2019s a way.', icon: '🧭', src: 'English proverb',
        w: { es: 'Donde hay voluntad, hay un camino.' },
        t: { de: 'Wo ein Wille ist, ist auch ein Weg.', es: 'Querer es poder.' } },
      { text: 'Better late than never.', icon: '⏰', src: 'English proverb',
        t: { de: 'Besser spät als nie.', es: 'Más vale tarde que nunca.' } }
    ],
    el: [
      { text: 'Η γλώσσα κόκαλα δεν έχει και κόκαλα τσακίζει.', icon: '👅', src: 'Ελληνική παροιμία',
        t: { de: 'Die Zunge hat keine Knochen und bricht doch Knochen.', en: 'The tongue has no bones, yet it breaks bones.', es: 'La lengua no tiene huesos, pero rompe huesos.' } },
      { text: 'Όπου λαλούν πολλά κοκόρια, αργεί να ξημερώσει.', icon: '🐓', src: 'Ελληνική παροιμία',
        t: { de: 'Wo viele Hähne krähen, dauert es lange bis zum Morgen.', en: 'Where many roosters crow, dawn is slow to come.', es: 'Donde cantan muchos gallos, tarda en amanecer.' } }
    ]
  };


  /* WENDUNGEN — feste Redewendungen (keine Sprichwörter im engen Sinn).
     Eigene Liste, damit das „Sprichwort des Tages" (spikiuSprichwort) unberührt bleibt;
     der Raum proverbios.html mischt beide (Leo 01.09./27.09.: der Titel verspricht beides). */
  var WENDUNGEN = {
    es: [
      { text: 'Por si acaso.', icon: '☂️', src: 'Giro español',
        w: { de: 'Für wenn zufällig.', en: 'For if by chance.' },
        t: { de: 'Für alle Fälle.', en: 'Just in case.' } },
      { text: 'Estar en las nubes.', icon: '☁️', src: 'Giro español',
        w: { de: 'In den Wolken sein.', en: 'To be in the clouds.' },
        t: { de: 'Mit den Gedanken ganz woanders sein.', en: 'To have one\u2019s head in the clouds.' } },
      { text: 'Ser pan comido.', icon: '🍞', src: 'Giro español',
        w: { de: 'Gegessenes Brot sein.', en: 'To be eaten bread.' },
        t: { de: 'Ein Kinderspiel sein.', en: 'To be a piece of cake.' } },
      { text: 'Echar una mano.', icon: '🤝', src: 'Giro español',
        w: { de: 'Eine Hand werfen.', en: 'To throw a hand.' },
        t: { de: 'Mit anpacken, helfen.', en: 'To lend a hand.' } },
      { text: 'Ponerse las pilas.', icon: '🔋', src: 'Giro español',
        w: { de: 'Sich die Batterien einlegen.', en: 'To put one\u2019s batteries in.' },
        t: { de: 'Sich ins Zeug legen.', en: 'To get one\u2019s act together.' } },
      { text: 'Estar como pez en el agua.', icon: '🐟', src: 'Giro español',
        w: { de: 'Wie ein Fisch im Wasser sein.', en: 'To be like a fish in water.' },
        t: { de: 'Sich pudelwohl fühlen.', en: 'To be in one\u2019s element.' } },
      { text: 'Costar un ojo de la cara.', icon: '💰', src: 'Giro español',
        w: { de: 'Ein Auge aus dem Gesicht kosten.', en: 'To cost an eye out of one\u2019s face.' },
        t: { de: 'Ein Vermögen kosten.', en: 'To cost an arm and a leg.' } },
      { text: 'Tomar el pelo a alguien.', icon: 'sp-pelo', src: 'Giro español',
        w: { de: 'Jemandem das Haar nehmen.', en: 'To take someone\u2019s hair.' },
        t: { de: 'Jemanden auf den Arm nehmen.', en: 'To pull someone\u2019s leg.' } }
    ],
    de: [
      { text: 'Stimmt so.', icon: '🪙', src: 'Deutsche Wendung',
        w: { es: 'Así está correcto.', en: 'It\u2019s right like that.' },
        t: { es: 'Así está bien, quédese con el cambio.', en: 'Keep the change.' } },
      { text: 'Ich verstehe nur Bahnhof.', icon: '🚉', src: 'Deutsche Wendung',
        w: { es: 'Solo entiendo «estación de tren».', en: 'I only understand \u201ctrain station\u201d.' },
        t: { es: 'No entiendo nada.', en: 'It\u2019s all Greek to me.' } },
      { text: 'Tomaten auf den Augen haben.', icon: '🍅', src: 'Deutsche Wendung',
        w: { es: 'Tener tomates en los ojos.', en: 'To have tomatoes on one\u2019s eyes.' },
        t: { es: 'No ver lo que está delante de las narices.', en: 'To be blind to the obvious.' } },
      { text: 'Das ist nicht mein Bier.', icon: '🍺', src: 'Deutsche Wendung',
        w: { es: 'Esa no es mi cerveza.', en: 'That\u2019s not my beer.' },
        t: { es: 'No es asunto mío.', en: 'That\u2019s not my problem.' } },
      { text: 'Die Daumen drücken.', icon: '👍', src: 'Deutsche Wendung',
        w: { es: 'Apretar los pulgares.', en: 'To press the thumbs.' },
        t: { es: 'Cruzar los dedos.', en: 'To keep one\u2019s fingers crossed.' } }
    ],
    en: [
      { text: 'It\u2019s raining cats and dogs.', icon: '🌧️', src: 'English phrase',
        w: { de: 'Es regnet Katzen und Hunde.', es: 'Llueven gatos y perros.' },
        t: { de: 'Es regnet in Strömen.', es: 'Llueve a cántaros.' } },
      { text: 'It\u2019s a piece of cake.', icon: '🍰', src: 'English phrase',
        w: { de: 'Das ist ein Stück Kuchen.', es: 'Es un trozo de pastel.' },
        t: { de: 'Das ist ein Kinderspiel.', es: 'Es pan comido.' } },
      { text: 'Break a leg!', icon: '🎭', src: 'English phrase',
        w: { de: 'Brich dir ein Bein!', es: '¡Rómpete una pierna!' },
        t: { de: 'Hals- und Beinbruch!', es: '¡Mucha suerte!' } },
      { text: 'To feel under the weather.', icon: '🤒', src: 'English phrase',
        w: { de: 'Sich unter dem Wetter fühlen.', es: 'Sentirse bajo el tiempo.' },
        t: { de: 'Nicht ganz auf dem Damm sein.', es: 'Estar pachucho.' } }
    ],
    el: [
      { text: 'Τα έκανε θάλασσα.', icon: '🌊', src: 'Ελληνική έκφραση',
        w: { de: 'Er hat es zu Meer gemacht.', en: 'He made it into sea.', es: 'Lo hizo mar.' },
        t: { de: 'Er hat alles vermasselt.', en: 'He made a total mess of it.', es: 'Lo echó todo a perder.' } },
      { text: 'Κάνω την πάπια.', icon: '🦆', src: 'Ελληνική έκφραση',
        w: { de: 'Ich mache die Ente.', en: 'I do the duck.', es: 'Hago el pato.' },
        t: { de: 'Sich dumm stellen.', en: 'To play dumb.', es: 'Hacerse el sueco.' } }
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
  w.spikiuSprichwort.wendungen = WENDUNGEN;

})(window);
