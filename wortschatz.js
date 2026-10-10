/* ===================================================================
   wortschatz.js — feste Starter-Wörter (Spikiu) · Teil 52
   -------------------------------------------------------------------
   Redaktionell, kein KI/Netz. Liefert pro Zielsprache ein moderates
   Starter-Set (A1–A2) im uebung.js-/Gym-Format.

     var items = window.spikiuWortschatz(zielsprache, muttersprache);
     // items = [{ wort, text, tr }]   wort = Zielsprache, text = Beispielsatz,
     //                                tr   = Übersetzung in der Muttersprache

   KURATION: Start-Satz. Leonardo (Linguist) pflegt/erweitert; die kanonische
   Wahrheit lebt in dieser Datei. Regeln: wort = Zielsprache; text = kurzer
   echter Beispielsatz mit dem Wort; t.de/t.es/t.en = treue Übersetzungen.
=================================================================== */
(function (w) {
  'use strict';

  var WS = {
    es: [
      { wort:'la casa',    text:'Vivo en una casa pequeña.', ts:{ de:'Ich wohne in einem kleinen Haus.', en:'I live in a small house.' },   t:{ de:'das Haus',    en:'the house',   es:'la casa' } },
      { wort:'el agua',    text:'Bebo agua todos los días.', ts:{ de:'Ich trinke jeden Tag Wasser.', en:'I drink water every day.' },   t:{ de:'das Wasser',  en:'the water',   es:'el agua' } },
      { wort:'la comida',  text:'La comida está lista.', ts:{ de:'Das Essen ist fertig.', en:'The food is ready.' },       t:{ de:'das Essen',   en:'the food',    es:'la comida' } },
      { wort:'el trabajo', text:'Voy al trabajo en autobús.', ts:{ de:'Ich fahre mit dem Bus zur Arbeit.', en:'I go to work by bus.' },  t:{ de:'die Arbeit',  en:'the work',    es:'el trabajo' } },
      { wort:'el amigo',   text:'Mi amigo vive cerca.', ts:{ de:'Mein Freund wohnt in der Nähe.', en:'My friend lives nearby.' },        t:{ de:'der Freund',  en:'the friend',  es:'el amigo' } },
      { wort:'la calle',   text:'La calle es muy larga.', ts:{ de:'Die Straße ist sehr lang.', en:'The street is very long.' },      t:{ de:'die Straße',  en:'the street',  es:'la calle' } },
      { wort:'el tiempo',  text:'Hoy no tengo tiempo.', ts:{ de:'Heute habe ich keine Zeit.', en:'I don\'t have time today.' },        t:{ de:'die Zeit',    en:'the time',    es:'el tiempo' } },
      { wort:'la noche',   text:'La noche está tranquila.', ts:{ de:'Die Nacht ist ruhig.', en:'The night is quiet.' },    t:{ de:'die Nacht',   en:'the night',   es:'la noche' } },
      { wort:'el día',     text:'Hoy es un buen día.', ts:{ de:'Heute ist ein guter Tag.', en:'Today is a good day.' },         t:{ de:'der Tag',     en:'the day',     es:'el día' } },
      { wort:'la mano',    text:'Lávate las manos, por favor.', ts:{ de:'Wasch dir bitte die Hände.', en:'Wash your hands, please.' }, t:{ de:'die Hand',   en:'the hand',    es:'la mano' } },
      { wort:'el libro',   text:'Leo un libro interesante.', ts:{ de:'Ich lese ein interessantes Buch.', en:'I\'m reading an interesting book.' },   t:{ de:'das Buch',    en:'the book',    es:'el libro' } },
      { wort:'la puerta',  text:'Abre la puerta, por favor.', ts:{ de:'Mach bitte die Tür auf.', en:'Open the door, please.' },  t:{ de:'die Tür',     en:'the door',    es:'la puerta' } },
      { wort:'el coche',   text:'El coche es rojo.', ts:{ de:'Das Auto ist rot.', en:'The car is red.' },           t:{ de:'das Auto',    en:'the car',     es:'el coche' } },
      { wort:'la mesa',    text:'La mesa está en la cocina.', ts:{ de:'Der Tisch steht in der Küche.', en:'The table is in the kitchen.' },  t:{ de:'der Tisch',   en:'the table',   es:'la mesa' } },
      { wort:'el sol',     text:'Hoy el sol brilla mucho.', ts:{ de:'Heute scheint die Sonne kräftig.', en:'The sun is shining brightly today.' },    t:{ de:'die Sonne',   en:'the sun',     es:'el sol' } },
      { wort:'la familia', text:'Mi familia es muy grande.', ts:{ de:'Meine Familie ist sehr groß.', en:'My family is very big.' },   t:{ de:'die Familie', en:'the family',  es:'la familia' } },
      { wort:'el dinero',  text:'Ahora no tengo dinero.', ts:{ de:'Gerade habe ich kein Geld.', en:'I don\'t have any money right now.' },      t:{ de:'das Geld',    en:'the money',   es:'el dinero' } },
      { wort:'la ciudad',  text:'La ciudad es muy bonita.', ts:{ de:'Die Stadt ist sehr schön.', en:'The city is very beautiful.' },    t:{ de:'die Stadt',   en:'the city',    es:'la ciudad' } },
      { wort:'el nombre',  text:'¿Cuál es tu nombre?', ts:{ de:'Wie ist dein Name?', en:'What is your name?' },         t:{ de:'der Name',    en:'the name',    es:'el nombre' } },
      { wort:'la palabra', text:'Aprendo una palabra nueva.', ts:{ de:'Ich lerne ein neues Wort.', en:'I\'m learning a new word.' },  t:{ de:'das Wort',    en:'the word',    es:'la palabra' } }
    ],
    de: [
      { wort:'das Haus',    text:'Ich wohne in einem Haus.', ts:{ es:'Vivo en una casa.', en:'I live in a house.' },      t:{ es:'la casa',    en:'the house',  de:'das Haus' } },
      { wort:'das Wasser',  text:'Ich trinke viel Wasser.', ts:{ es:'Bebo mucha agua.', en:'I drink a lot of water.' },       t:{ es:'el agua',    en:'the water',  de:'das Wasser' } },
      { wort:'das Essen',   text:'Das Essen ist schon fertig.', ts:{ es:'La comida ya está lista.', en:'The food is already ready.' },   t:{ es:'la comida',  en:'the food',   de:'das Essen' } },
      { wort:'die Arbeit',  text:'Ich gehe heute zur Arbeit.', ts:{ es:'Hoy voy al trabajo.', en:'I\'m going to work today.' },    t:{ es:'el trabajo', en:'the work',   de:'die Arbeit' } },
      { wort:'der Freund',  text:'Mein Freund wohnt hier.', ts:{ es:'Mi amigo vive aquí.', en:'My friend lives here.' },       t:{ es:'el amigo',   en:'the friend', de:'der Freund' } },
      { wort:'die Straße',  text:'Die Straße ist sehr lang.', ts:{ es:'La calle es muy larga.', en:'The street is very long.' },     t:{ es:'la calle',   en:'the street', de:'die Straße' } },
      { wort:'die Zeit',    text:'Ich habe heute keine Zeit.', ts:{ es:'Hoy no tengo tiempo.', en:'I don\'t have time today.' },    t:{ es:'el tiempo',  en:'the time',   de:'die Zeit' } },
      { wort:'die Nacht',   text:'Die Nacht ist ganz ruhig.', ts:{ es:'La noche está muy tranquila.', en:'The night is very quiet.' },     t:{ es:'la noche',   en:'the night',  de:'die Nacht' } },
      { wort:'der Tag',     text:'Heute ist ein guter Tag.', ts:{ es:'Hoy es un buen día.', en:'Today is a good day.' },      t:{ es:'el día',     en:'the day',    de:'der Tag' } },
      { wort:'die Hand',    text:'Wasch dir bitte die Hände.', ts:{ es:'Lávate las manos, por favor.', en:'Please wash your hands.' },    t:{ es:'la mano',    en:'the hand',   de:'die Hand' } },
      { wort:'das Buch',    text:'Ich lese ein gutes Buch.', ts:{ es:'Leo un buen libro.', en:'I\'m reading a good book.' },      t:{ es:'el libro',   en:'the book',   de:'das Buch' } },
      { wort:'die Tür',     text:'Mach bitte die Tür zu.', ts:{ es:'Cierra la puerta, por favor.', en:'Please close the door.' },        t:{ es:'la puerta',  en:'the door',   de:'die Tür' } },
      { wort:'das Auto',    text:'Das Auto ist rot.', ts:{ es:'El coche es rojo.', en:'The car is red.' },             t:{ es:'el coche',   en:'the car',    de:'das Auto' } },
      { wort:'der Tisch',   text:'Der Tisch ist sehr groß.', ts:{ es:'La mesa es muy grande.', en:'The table is very big.' },      t:{ es:'la mesa',    en:'the table',  de:'der Tisch' } },
      { wort:'die Sonne',   text:'Heute scheint die Sonne.', ts:{ es:'Hoy brilla el sol.', en:'The sun is shining today.' },      t:{ es:'el sol',     en:'the sun',    de:'die Sonne' } },
      { wort:'die Familie', text:'Meine Familie ist groß.', ts:{ es:'Mi familia es grande.', en:'My family is big.' },       t:{ es:'la familia', en:'the family', de:'die Familie' } },
      { wort:'das Geld',    text:'Ich habe kein Geld dabei.', ts:{ es:'No llevo dinero encima.', en:'I don\'t have any money on me.' },     t:{ es:'el dinero',  en:'the money',  de:'das Geld' } },
      { wort:'die Stadt',   text:'Die Stadt ist sehr schön.', ts:{ es:'La ciudad es muy bonita.', en:'The city is very beautiful.' },     t:{ es:'la ciudad',  en:'the city',   de:'die Stadt' } },
      { wort:'der Name',    text:'Wie ist dein Name?', ts:{ es:'¿Cuál es tu nombre?', en:'What is your name?' },            t:{ es:'el nombre',  en:'the name',   de:'der Name' } },
      { wort:'das Wort',    text:'Ich lerne ein neues Wort.', ts:{ es:'Aprendo una palabra nueva.', en:'I\'m learning a new word.' },     t:{ es:'la palabra', en:'the word',   de:'das Wort' } }
    ],
    en: [
      { wort:'the house',  text:'I live in a small house.', ts:{ de:'Ich wohne in einem kleinen Haus.', es:'Vivo en una casa pequeña.' },   t:{ de:'das Haus',   es:'la casa',    en:'the house' } },
      { wort:'the water',  text:'I drink water every day.', ts:{ de:'Ich trinke jeden Tag Wasser.', es:'Bebo agua todos los días.' },   t:{ de:'das Wasser', es:'el agua',    en:'the water' } },
      { wort:'the food',   text:'The food is ready now.', ts:{ de:'Das Essen ist jetzt fertig.', es:'La comida ya está lista.' },     t:{ de:'das Essen',  es:'la comida',  en:'the food' } },
      { wort:'the work',   text:'I go to work by bus.', ts:{ de:'Ich fahre mit dem Bus zur Arbeit.', es:'Voy al trabajo en autobús.' },       t:{ de:'die Arbeit', es:'el trabajo', en:'the work' } },
      { wort:'the friend', text:'My friend lives near here.', ts:{ de:'Mein Freund wohnt hier in der Nähe.', es:'Mi amigo vive cerca de aquí.' }, t:{ de:'der Freund', es:'el amigo',   en:'the friend' } },
      { wort:'the time',   text:'I have no time today.', ts:{ de:'Ich habe heute keine Zeit.', es:'Hoy no tengo tiempo.' },      t:{ de:'die Zeit',   es:'el tiempo',  en:'the time' } },
      { wort:'the day',    text:'Today is a good day.', ts:{ de:'Heute ist ein guter Tag.', es:'Hoy es un buen día.' },       t:{ de:'der Tag',    es:'el día',     en:'the day' } },
      { wort:'the book',   text:'I read a good book.', ts:{ de:'Ich lese ein gutes Buch.', es:'Leo un buen libro.' },        t:{ de:'das Buch',   es:'el libro',   en:'the book' } },
      { wort:'the door',   text:'Please close the door.', ts:{ de:'Mach bitte die Tür zu.', es:'Cierra la puerta, por favor.' },     t:{ de:'die Tür',    es:'la puerta',  en:'the door' } },
      { wort:'the car',    text:'The car is red.', ts:{ de:'Das Auto ist rot.', es:'El coche es rojo.' },            t:{ de:'das Auto',   es:'el coche',   en:'the car' } },
      { wort:'the city',   text:'The city is very nice.', ts:{ de:'Die Stadt ist sehr schön.', es:'La ciudad es muy bonita.' },     t:{ de:'die Stadt',  es:'la ciudad',  en:'the city' } },
      { wort:'the word',   text:'I learn a new word.', ts:{ de:'Ich lerne ein neues Wort.', es:'Aprendo una palabra nueva.' },        t:{ de:'das Wort',   es:'la palabra', en:'the word' } }
    ],
    el: [
      { wort:'το σπίτι',  text:'Μένω σε ένα μικρό σπίτι.', ts:{ de:'Ich wohne in einem kleinen Haus.', es:'Vivo en una casa pequeña.', en:'I live in a small house.' },    t:{ de:'das Haus',   es:'la casa',   en:'the house' } },
      { wort:'το νερό',   text:'Πίνω νερό κάθε μέρα.', ts:{ de:'Ich trinke jeden Tag Wasser.', es:'Bebo agua todos los días.', en:'I drink water every day.' },        t:{ de:'das Wasser', es:'el agua',   en:'the water' } },
      { wort:'το φαγητό', text:'Το φαγητό είναι έτοιμο.', ts:{ de:'Das Essen ist fertig.', es:'La comida está lista.', en:'The food is ready.' },     t:{ de:'das Essen',  es:'la comida', en:'the food' } },
      { wort:'ο φίλος',   text:'Ο φίλος μου μένει εδώ.', ts:{ de:'Mein Freund wohnt hier.', es:'Mi amigo vive aquí.', en:'My friend lives here.' },      t:{ de:'der Freund', es:'el amigo',  en:'the friend' } },
      { wort:'ο δρόμος',  text:'Ο δρόμος είναι πολύ μακρύς.', ts:{ de:'Die Straße ist sehr lang.', es:'La calle es muy larga.', en:'The street is very long.' }, t:{ de:'die Straße', es:'la calle',  en:'the street' } },
      { wort:'η μέρα',    text:'Σήμερα είναι καλή μέρα.', ts:{ de:'Heute ist ein guter Tag.', es:'Hoy es un buen día.', en:'Today is a good day.' },     t:{ de:'der Tag',    es:'el día',    en:'the day' } },
      { wort:'το βιβλίο', text:'Διαβάζω ένα καλό βιβλίο.', ts:{ de:'Ich lese ein gutes Buch.', es:'Leo un buen libro.', en:'I\'m reading a good book.' },    t:{ de:'das Buch',   es:'el libro',  en:'the book' } },
      { wort:'η πόρτα',   text:'Κλείσε την πόρτα, παρακαλώ.', ts:{ de:'Mach bitte die Tür zu.', es:'Cierra la puerta, por favor.', en:'Close the door, please.' }, t:{ de:'die Tür',    es:'la puerta', en:'the door' } },
      { wort:'ο ήλιος',  text:'Σήμερα ο ήλιος λάμπει.', ts:{ de:'Heute scheint die Sonne.', es:'Hoy brilla el sol.', en:'The sun is shining today.' },      t:{ de:'die Sonne',  es:'el sol',    en:'the sun' } },
      { wort:'η λέξη',    text:'Μαθαίνω μια νέα λέξη.', ts:{ de:'Ich lerne ein neues Wort.', es:'Aprendo una palabra nueva.', en:'I\'m learning a new word.' },       t:{ de:'das Wort',   es:'la palabra', en:'the word' } }
    ]
  };

  // Icon-Map: Konzept (t.en) → Emoji. NUR sichtbare Dinge; abstrakte bleiben leer.
  // Das Emoji ist nur der Schlüssel: gym.html zeigt bilder/om-<Codepunkte>.svg (self-hosted OpenMoji, 27.09.).
  var ICONMAP = {
    'the house':'🏠','the water':'💧','the food':'🍽️','the street':'🛣️','the night':'🌙',
    'the hand':'✋','the book':'📖','the door':'🚪','the car':'🚗','the sun':'☀️',
    'the city':'🏙️','the money':'💶','the family':'👪'
  };

  w.spikiuWortschatz = function (zielsprache, muttersprache) {
    var list = WS[zielsprache] || WS.es || [];
    var mutter = muttersprache || 'de';
    return list.map(function (it) {
      var tr = (it.t && (it.t[mutter] || it.t.de || it.t.en || it.t.es)) || '';
      // ts = Übersetzung des ganzen Beispielsatzes (10.10., für Piñata/Globos)
      var ts = (it.ts && it.ts[mutter]) || '';
      return { wort: it.wort, text: it.text, tr: tr, ts: ts, icon: (it.t && ICONMAP[it.t.en]) || '', konzept: (it.t && it.t.en) || '' };
    });
  };
  w.spikiuWortschatz.daten = WS;

})(window);
