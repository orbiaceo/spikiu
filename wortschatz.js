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
      { wort:'la casa',    text:'Vivo en una casa pequeña.',   t:{ de:'das Haus',    en:'the house',   es:'la casa' } },
      { wort:'el agua',    text:'Bebo agua todos los días.',   t:{ de:'das Wasser',  en:'the water',   es:'el agua' } },
      { wort:'la comida',  text:'La comida está lista.',       t:{ de:'das Essen',   en:'the food',    es:'la comida' } },
      { wort:'el trabajo', text:'Voy al trabajo en autobús.',  t:{ de:'die Arbeit',  en:'the work',    es:'el trabajo' } },
      { wort:'el amigo',   text:'Mi amigo vive cerca.',        t:{ de:'der Freund',  en:'the friend',  es:'el amigo' } },
      { wort:'la calle',   text:'La calle es muy larga.',      t:{ de:'die Straße',  en:'the street',  es:'la calle' } },
      { wort:'el tiempo',  text:'Hoy no tengo tiempo.',        t:{ de:'die Zeit',    en:'the time',    es:'el tiempo' } },
      { wort:'la noche',   text:'La noche está tranquila.',    t:{ de:'die Nacht',   en:'the night',   es:'la noche' } },
      { wort:'el día',     text:'Hoy es un buen día.',         t:{ de:'der Tag',     en:'the day',     es:'el día' } },
      { wort:'la mano',    text:'Lávate las manos, por favor.', t:{ de:'die Hand',   en:'the hand',    es:'la mano' } },
      { wort:'el libro',   text:'Leo un libro interesante.',   t:{ de:'das Buch',    en:'the book',    es:'el libro' } },
      { wort:'la puerta',  text:'Abre la puerta, por favor.',  t:{ de:'die Tür',     en:'the door',    es:'la puerta' } },
      { wort:'el coche',   text:'El coche es rojo.',           t:{ de:'das Auto',    en:'the car',     es:'el coche' } },
      { wort:'la mesa',    text:'La mesa está en la cocina.',  t:{ de:'der Tisch',   en:'the table',   es:'la mesa' } },
      { wort:'el sol',     text:'Hoy el sol brilla mucho.',    t:{ de:'die Sonne',   en:'the sun',     es:'el sol' } },
      { wort:'la familia', text:'Mi familia es muy grande.',   t:{ de:'die Familie', en:'the family',  es:'la familia' } },
      { wort:'el dinero',  text:'Ahora no tengo dinero.',      t:{ de:'das Geld',    en:'the money',   es:'el dinero' } },
      { wort:'la ciudad',  text:'La ciudad es muy bonita.',    t:{ de:'die Stadt',   en:'the city',    es:'la ciudad' } },
      { wort:'el nombre',  text:'¿Cuál es tu nombre?',         t:{ de:'der Name',    en:'the name',    es:'el nombre' } },
      { wort:'la palabra', text:'Aprendo una palabra nueva.',  t:{ de:'das Wort',    en:'the word',    es:'la palabra' } }
    ],
    de: [
      { wort:'das Haus',    text:'Ich wohne in einem Haus.',      t:{ es:'la casa',    en:'the house',  de:'das Haus' } },
      { wort:'das Wasser',  text:'Ich trinke viel Wasser.',       t:{ es:'el agua',    en:'the water',  de:'das Wasser' } },
      { wort:'das Essen',   text:'Das Essen ist schon fertig.',   t:{ es:'la comida',  en:'the food',   de:'das Essen' } },
      { wort:'die Arbeit',  text:'Ich gehe heute zur Arbeit.',    t:{ es:'el trabajo', en:'the work',   de:'die Arbeit' } },
      { wort:'der Freund',  text:'Mein Freund wohnt hier.',       t:{ es:'el amigo',   en:'the friend', de:'der Freund' } },
      { wort:'die Straße',  text:'Die Straße ist sehr lang.',     t:{ es:'la calle',   en:'the street', de:'die Straße' } },
      { wort:'die Zeit',    text:'Ich habe heute keine Zeit.',    t:{ es:'el tiempo',  en:'the time',   de:'die Zeit' } },
      { wort:'die Nacht',   text:'Die Nacht ist ganz ruhig.',     t:{ es:'la noche',   en:'the night',  de:'die Nacht' } },
      { wort:'der Tag',     text:'Heute ist ein guter Tag.',      t:{ es:'el día',     en:'the day',    de:'der Tag' } },
      { wort:'die Hand',    text:'Wasch dir bitte die Hände.',    t:{ es:'la mano',    en:'the hand',   de:'die Hand' } },
      { wort:'das Buch',    text:'Ich lese ein gutes Buch.',      t:{ es:'el libro',   en:'the book',   de:'das Buch' } },
      { wort:'die Tür',     text:'Mach bitte die Tür zu.',        t:{ es:'la puerta',  en:'the door',   de:'die Tür' } },
      { wort:'das Auto',    text:'Das Auto ist rot.',             t:{ es:'el coche',   en:'the car',    de:'das Auto' } },
      { wort:'der Tisch',   text:'Der Tisch ist sehr groß.',      t:{ es:'la mesa',    en:'the table',  de:'der Tisch' } },
      { wort:'die Sonne',   text:'Heute scheint die Sonne.',      t:{ es:'el sol',     en:'the sun',    de:'die Sonne' } },
      { wort:'die Familie', text:'Meine Familie ist groß.',       t:{ es:'la familia', en:'the family', de:'die Familie' } },
      { wort:'das Geld',    text:'Ich habe kein Geld dabei.',     t:{ es:'el dinero',  en:'the money',  de:'das Geld' } },
      { wort:'die Stadt',   text:'Die Stadt ist sehr schön.',     t:{ es:'la ciudad',  en:'the city',   de:'die Stadt' } },
      { wort:'der Name',    text:'Wie ist dein Name?',            t:{ es:'el nombre',  en:'the name',   de:'der Name' } },
      { wort:'das Wort',    text:'Ich lerne ein neues Wort.',     t:{ es:'la palabra', en:'the word',   de:'das Wort' } }
    ],
    en: [
      { wort:'the house',  text:'I live in a small house.',   t:{ de:'das Haus',   es:'la casa',    en:'the house' } },
      { wort:'the water',  text:'I drink water every day.',   t:{ de:'das Wasser', es:'el agua',    en:'the water' } },
      { wort:'the food',   text:'The food is ready now.',     t:{ de:'das Essen',  es:'la comida',  en:'the food' } },
      { wort:'the work',   text:'I go to work by bus.',       t:{ de:'die Arbeit', es:'el trabajo', en:'the work' } },
      { wort:'the friend', text:'My friend lives near here.', t:{ de:'der Freund', es:'el amigo',   en:'the friend' } },
      { wort:'the time',   text:'I have no time today.',      t:{ de:'die Zeit',   es:'el tiempo',  en:'the time' } },
      { wort:'the day',    text:'Today is a good day.',       t:{ de:'der Tag',    es:'el día',     en:'the day' } },
      { wort:'the book',   text:'I read a good book.',        t:{ de:'das Buch',   es:'el libro',   en:'the book' } },
      { wort:'the door',   text:'Please close the door.',     t:{ de:'die Tür',    es:'la puerta',  en:'the door' } },
      { wort:'the car',    text:'The car is red.',            t:{ de:'das Auto',   es:'el coche',   en:'the car' } },
      { wort:'the city',   text:'The city is very nice.',     t:{ de:'die Stadt',  es:'la ciudad',  en:'the city' } },
      { wort:'the word',   text:'I learn a new word.',        t:{ de:'das Wort',   es:'la palabra', en:'the word' } }
    ],
    el: [
      { wort:'το σπίτι',  text:'Μένω σε ένα μικρό σπίτι.',    t:{ de:'das Haus',   es:'la casa',   en:'the house' } },
      { wort:'το νερό',   text:'Πίνω νερό κάθε μέρα.',        t:{ de:'das Wasser', es:'el agua',   en:'the water' } },
      { wort:'το φαγητό', text:'Το φαγητό είναι έτοιμο.',     t:{ de:'das Essen',  es:'la comida', en:'the food' } },
      { wort:'ο φίλος',   text:'Ο φίλος μου μένει εδώ.',      t:{ de:'der Freund', es:'el amigo',  en:'the friend' } },
      { wort:'ο δρόμος',  text:'Ο δρόμος είναι πολύ μακρύς.', t:{ de:'die Straße', es:'la calle',  en:'the street' } },
      { wort:'η μέρα',    text:'Σήμερα είναι καλή μέρα.',     t:{ de:'der Tag',    es:'el día',    en:'the day' } },
      { wort:'το βιβλίο', text:'Διαβάζω ένα καλό βιβλίο.',    t:{ de:'das Buch',   es:'el libro',  en:'the book' } },
      { wort:'η πόρτα',   text:'Κλείσε την πόρτα, παρακαλώ.', t:{ de:'die Tür',    es:'la puerta', en:'the door' } },
      { wort:'ο ήλιος',  text:'Σήμερα ο ήλιος λάμπει.',      t:{ de:'die Sonne',  es:'el sol',    en:'the sun' } },
      { wort:'η λέξη',    text:'Μαθαίνω μια νέα λέξη.',       t:{ de:'das Wort',   es:'la palabra', en:'the word' } }
    ]
  };

  w.spikiuWortschatz = function (zielsprache, muttersprache) {
    var list = WS[zielsprache] || WS.es || [];
    var mutter = muttersprache || 'de';
    return list.map(function (it) {
      var tr = (it.t && (it.t[mutter] || it.t.de || it.t.en || it.t.es)) || '';
      return { wort: it.wort, text: it.text, tr: tr };
    });
  };
  w.spikiuWortschatz.daten = WS;

})(window);
