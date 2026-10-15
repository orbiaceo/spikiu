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
   Seit 15.10.2026 auch Griechisch als Muttersprache: t.el/w.el.
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
        w: { de: 'Wer viel umfasst, drückt wenig zusammen.', en: 'Who embraces much, squeezes little.', el: 'Όποιος αγκαλιάζει πολλά, σφίγγει λίγα.' },
        t: { de: 'Wer zu viel auf einmal will, schafft am Ende wenig.', en: 'Grasp all, lose all.', el: 'Όποιος κυνηγάει δύο λαγούς, δεν πιάνει κανέναν.' } },
      { text: 'A buen entendedor, pocas palabras bastan.', icon: '👂', src: 'Refrán español',
        w: { de: 'Einem guten Versteher genügen wenige Worte.', en: 'For a good understander, few words are enough.', el: 'Σε αυτόν που καταλαβαίνει καλά, λίγα λόγια αρκούν.' },
        t: { de: 'Dem Klugen genügen wenige Worte.', en: 'A word to the wise is enough.', el: 'Τοις συνετοίς ολίγα.' } },
      { text: 'No por mucho madrugar amanece más temprano.', icon: '🌅', src: 'Refrán español',
        w: { de: 'Nicht weil man sehr früh aufsteht, wird es früher Tag.', en: 'Not by getting up very early does day break sooner.', el: 'Όχι επειδή σηκώνεσαι πολύ νωρίς, ξημερώνει νωρίτερα.' },
        t: { de: 'Früher aufstehen lässt die Sonne nicht früher aufgehen.', en: 'Rising early won\u2019t make the sun come up sooner.', el: 'Όσο νωρίς κι αν ξυπνήσεις, ο ήλιος δεν θα βγει νωρίτερα.' } },
      { text: 'Más vale tarde que nunca.', icon: '⏰', src: 'Refrán español',
        w: { de: 'Mehr wert spät als nie.', en: 'Worth more late than never.', el: 'Αξίζει περισσότερο αργά παρά ποτέ.' },
        t: { de: 'Besser spät als nie.', en: 'Better late than never.', el: 'Κάλλιο αργά παρά ποτέ.' } },
      { text: 'Más vale pájaro en mano que ciento volando.', icon: '🐦', src: 'Refrán español',
        w: { de: 'Mehr wert ist ein Vogel in der Hand als hundert, die fliegen.', en: 'A bird in the hand is worth more than a hundred flying.', el: 'Αξίζει περισσότερο ένα πουλί στο χέρι παρά εκατό που πετούν.' },
        t: { de: 'Besser ein Spatz in der Hand als eine Taube auf dem Dach.', en: 'A bird in the hand is worth two in the bush.', el: 'Κάλλιο πέντε και στο χέρι παρά δέκα και καρτέρει.' } },
      { text: 'El que no arriesga, no gana.', icon: '🎲', src: 'Refrán español',
        w: { de: 'Wer nicht riskiert, gewinnt nicht.', en: 'He who doesn’t risk doesn’t win.', el: 'Όποιος δεν ρισκάρει, δεν κερδίζει.' },
        t: { de: 'Wer nicht wagt, der nicht gewinnt.', en: 'Nothing ventured, nothing gained.', el: 'Ο τολμών νικά.' } },
      { text: 'No dejes para mañana lo que puedas hacer hoy.', icon: '📅', src: 'Refrán español',
        w: { de: 'Lass nicht für morgen, was du heute tun kannst.', en: 'Don’t leave for tomorrow what you can do today.', el: 'Μην αφήνεις για αύριο ό,τι μπορείς να κάνεις σήμερα.' },
        t: { de: 'Verschiebe nicht auf morgen, was du heute tun kannst.', en: 'Don\u2019t put off until tomorrow what you can do today.', el: 'Μην αφήνεις για αύριο ό,τι μπορείς να κάνεις σήμερα.' } },
      { text: 'Poco a poco se anda lejos.', icon: '🐢', src: 'Refrán español',
        w: { de: 'Wenig um wenig geht man weit.', en: 'Little by little one walks far.', el: 'Λίγο λίγο περπατάς μακριά.' },
        t: { de: 'Schritt für Schritt kommt man weit.', en: 'Little by little, one goes far.', el: 'Σιγά σιγά γίνεται η αγουρίδα μέλι.' } }
    ],
    de: [
      { text: 'Übung macht den Meister.', icon: '🛠️', src: 'Deutsches Sprichwort',
        w: { es: 'La práctica hace al maestro.', en: 'Practice makes the master.', el: 'Η εξάσκηση κάνει τον μάστορα.' },
        t: { es: 'La práctica hace al maestro.', en: 'Practice makes perfect.', el: 'Η εξάσκηση κάνει τον μάστορα.' } },
      { text: 'Morgenstund hat Gold im Mund.', icon: '🌄', src: 'Deutsches Sprichwort',
        w: { es: 'La hora de la mañana tiene oro en la boca.', en: 'The morning hour has gold in its mouth.', el: 'Η πρωινή ώρα έχει χρυσάφι στο στόμα.' },
        t: { es: 'A quien madruga, Dios le ayuda.', en: 'The early bird catches the worm.', el: 'Όποιος ξυπνά νωρίς, κερδίζει τη μέρα.' } },
      { text: 'Aller Anfang ist schwer.', icon: '🌱', src: 'Deutsches Sprichwort',
        w: { es: 'Todo comienzo es difícil.', en: 'All beginning is hard.', el: 'Κάθε αρχή είναι δύσκολη.' },
        t: { es: 'Todo comienzo es difícil.', en: 'Every beginning is hard.', el: 'Κάθε αρχή και δύσκολη.' } },
      { text: 'Wer A sagt, muss auch B sagen.', icon: '🔤', src: 'Deutsches Sprichwort',
        w: { es: 'Quien dice A también tiene que decir B.', en: 'Who says A must also say B.', el: 'Όποιος λέει Α πρέπει να πει και Β.' },
        t: { es: 'Quien dice A, debe decir B.', en: 'In for a penny, in for a pound.', el: 'Όποιος μπει στον χορό, πρέπει να χορέψει.' } }
    ],
    en: [
      { text: 'Practice makes perfect.', icon: '🛠️', src: 'English proverb',
        w: { de: 'Übung macht perfekt.', es: 'La práctica hace perfecto.', el: 'Η εξάσκηση κάνει τέλειο.' },
        t: { de: 'Übung macht den Meister.', es: 'La práctica hace al maestro.', el: 'Η εξάσκηση κάνει τον μάστορα.' } },
      { text: 'Where there\u2019s a will, there\u2019s a way.', icon: '🧭', src: 'English proverb',
        w: { de: 'Wo es einen Willen gibt, gibt es einen Weg.', es: 'Donde hay voluntad, hay un camino.', el: 'Όπου υπάρχει θέληση, υπάρχει δρόμος.' },
        t: { de: 'Wo ein Wille ist, ist auch ein Weg.', es: 'Querer es poder.', el: 'Όπου υπάρχει θέληση, υπάρχει και τρόπος.' } },
      { text: 'Better late than never.', icon: '⏰', src: 'English proverb',
        w: { de: 'Besser spät als nie.', es: 'Mejor tarde que nunca.', el: 'Καλύτερα αργά παρά ποτέ.' },
        t: { de: 'Besser spät als nie.', es: 'Más vale tarde que nunca.', el: 'Κάλλιο αργά παρά ποτέ.' } }
    ],
    el: [
      { text: 'Η γλώσσα κόκαλα δεν έχει και κόκαλα τσακίζει.', icon: '👅', src: 'Ελληνική παροιμία',
        w: { de: 'Die Zunge hat keine Knochen und bricht doch Knochen.', en: 'The tongue has no bones, yet it breaks bones.', es: 'La lengua no tiene huesos, pero rompe huesos.' },
        t: { de: 'Worte können tiefer verletzen als Schläge.', en: 'Words can hurt more than blows.', es: 'Las palabras pueden herir más que los golpes.' } },
      { text: 'Όπου λαλούν πολλά κοκόρια, αργεί να ξημερώσει.', icon: '🐓', src: 'Ελληνική παροιμία',
        w: { de: 'Wo viele Hähne krähen, wird es spät Tag.', en: 'Where many roosters crow, the day breaks late.', es: 'Donde cantan muchos gallos, tarda en amanecer.' },
        t: { de: 'Viele Köche verderben den Brei.', en: 'Too many cooks spoil the broth.', es: 'Muchas manos en un plato hacen mucho garabato.' } }
    ]
  };


  /* WENDUNGEN — feste Redewendungen (keine Sprichwörter im engen Sinn).
     Eigene Liste, damit das „Sprichwort des Tages" (spikiuSprichwort) unberührt bleibt;
     der Raum proverbios.html mischt beide (Leo 01.09./27.09.: der Titel verspricht beides). */
  var WENDUNGEN = {
    es: [
      { text: 'Por si acaso.', icon: '☂️', src: 'Giro español',
        w: { de: 'Für den Fall (dass).', en: 'For the case (that).', el: 'Για την περίπτωση (που).' },
        t: { de: 'Für alle Fälle.', en: 'Just in case.', el: 'Για καλό και για κακό.' } },
      { text: 'Estar en las nubes.', icon: '☁️', src: 'Giro español',
        w: { de: 'In den Wolken sein.', en: 'To be in the clouds.', el: 'Είμαι στα σύννεφα.' },
        t: { de: 'Mit den Gedanken ganz woanders sein.', en: 'To have one\u2019s head in the clouds.', el: 'Είμαι στον κόσμο μου, με το μυαλό αλλού.' } },
      { text: 'Ser pan comido.', icon: '🍞', src: 'Giro español',
        w: { de: 'Gegessenes Brot sein.', en: 'To be eaten bread.', el: 'Είναι φαγωμένο ψωμί.' },
        t: { de: 'Ein Kinderspiel sein.', en: 'To be a piece of cake.', el: 'Είναι παιχνιδάκι.' } },
      { text: 'Echar una mano.', icon: '🤝', src: 'Giro español',
        w: { de: 'Eine Hand werfen.', en: 'To throw a hand.', el: 'Ρίχνω ένα χέρι.' },
        t: { de: 'Mit anpacken, helfen.', en: 'To lend a hand.', el: 'Δίνω ένα χέρι βοήθειας.' } },
      { text: 'Ponerse las pilas.', icon: '🔋', src: 'Giro español',
        w: { de: 'Sich die Batterien einlegen.', en: 'To put one\u2019s batteries in.', el: 'Βάζω τις μπαταρίες μου.' },
        t: { de: 'Sich ins Zeug legen.', en: 'To get one\u2019s act together.', el: 'Βάζω τα δυνατά μου.' } },
      { text: 'Estar como pez en el agua.', icon: '🐟', src: 'Giro español',
        w: { de: 'Wie ein Fisch im Wasser sein.', en: 'To be like a fish in water.', el: 'Είμαι σαν ψάρι στο νερό.' },
        t: { de: 'Sich pudelwohl fühlen.', en: 'To be in one\u2019s element.', el: 'Νιώθω σαν το ψάρι στο νερό.' } },
      { text: 'Costar un ojo de la cara.', icon: '💰', src: 'Giro español',
        w: { de: 'Ein Auge aus dem Gesicht kosten.', en: 'To cost an eye out of one\u2019s face.', el: 'Κοστίζει ένα μάτι από το πρόσωπο.' },
        t: { de: 'Ein Vermögen kosten.', en: 'To cost an arm and a leg.', el: 'Κοστίζει ο κούκος αηδόνι.' } },
      { text: 'Tomar el pelo a alguien.', icon: 'sp-pelo', src: 'Giro español',
        w: { de: 'Jemandem das Haar nehmen.', en: 'To take someone\u2019s hair.', el: 'Παίρνω τα μαλλιά σε κάποιον.' },
        t: { de: 'Jemanden auf den Arm nehmen.', en: 'To pull someone\u2019s leg.', el: 'Δουλεύω κάποιον, τον κοροϊδεύω.' } }
    ],
    de: [
      { text: 'Stimmt so.', icon: '🪙', src: 'Deutsche Wendung',
        w: { es: 'Así está correcto.', en: 'It\u2019s right like that.', el: 'Έτσι είναι σωστό.' },
        t: { es: 'Así está bien, quédese con la vuelta.', en: 'Keep the change.', el: 'Κράτα τα ρέστα.' } },
      { text: 'Ich verstehe nur Bahnhof.', icon: '🚉', src: 'Deutsche Wendung',
        w: { es: 'Solo entiendo «estación de tren».', en: 'I only understand \u201ctrain station\u201d.', el: 'Καταλαβαίνω μόνο «σιδηροδρομικός σταθμός».' },
        t: { es: 'No entiendo nada.', en: 'It\u2019s all Greek to me.', el: 'Κινέζικα μου φαίνονται.' } },
      { text: 'Tomaten auf den Augen haben.', icon: '🍅', src: 'Deutsche Wendung',
        w: { es: 'Tener tomates en los ojos.', en: 'To have tomatoes on one\u2019s eyes.', el: 'Έχω ντομάτες στα μάτια.' },
        t: { es: 'No ver lo que está delante de las narices.', en: 'To be blind to the obvious.', el: 'Δεν βλέπω αυτό που είναι μπροστά στα μάτια μου.' } },
      { text: 'Das ist nicht mein Bier.', icon: '🍺', src: 'Deutsche Wendung',
        w: { es: 'Esa no es mi cerveza.', en: 'That\u2019s not my beer.', el: 'Αυτή δεν είναι η μπίρα μου.' },
        t: { es: 'No es asunto mío.', en: 'That\u2019s not my problem.', el: 'Δεν είναι δική μου δουλειά.' } },
      { text: 'Die Daumen drücken.', icon: '👍', src: 'Deutsche Wendung',
        w: { es: 'Apretar los pulgares.', en: 'To press the thumbs.', el: 'Πιέζω τους αντίχειρες.' },
        t: { es: 'Cruzar los dedos.', en: 'To keep one\u2019s fingers crossed.', el: 'Σταυρώνω τα δάχτυλα.' } }
    ],
    en: [
      { text: 'It\u2019s raining cats and dogs.', icon: '🌧️', src: 'English phrase',
        w: { de: 'Es regnet Katzen und Hunde.', es: 'Llueven gatos y perros.', el: 'Βρέχει γάτες και σκύλους.' },
        t: { de: 'Es regnet in Strömen.', es: 'Llueve a cántaros.', el: 'Βρέχει καρεκλοπόδαρα.' } },
      { text: 'It\u2019s a piece of cake.', icon: '🍰', src: 'English phrase',
        w: { de: 'Das ist ein Stück Kuchen.', es: 'Es un trozo de tarta.', el: 'Είναι ένα κομμάτι κέικ.' },
        t: { de: 'Das ist ein Kinderspiel.', es: 'Es pan comido.', el: 'Είναι παιχνιδάκι.' } },
      { text: 'Break a leg!', icon: '🎭', src: 'English phrase',
        w: { de: 'Brich dir ein Bein!', es: '¡Rómpete una pierna!', el: 'Σπάσε ένα πόδι!' },
        t: { de: 'Hals- und Beinbruch!', es: '¡Mucha suerte!', el: 'Καλή επιτυχία!' } },
      { text: 'To feel under the weather.', icon: '🤒', src: 'English phrase',
        w: { de: 'Sich unter dem Wetter fühlen.', es: 'Sentirse bajo el tiempo.', el: 'Νιώθω κάτω από τον καιρό.' },
        t: { de: 'Nicht ganz auf dem Damm sein.', es: 'Estar pachucho.', el: 'Δεν νιώθω και πολύ καλά.' } }
    ],
    el: [
      { text: 'Τα έκανε θάλασσα.', icon: '🌊', src: 'Ελληνική έκφραση',
        w: { de: 'Er hat es zum Meer gemacht.', en: 'He made it into sea.', es: 'Lo hizo mar.' },
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
