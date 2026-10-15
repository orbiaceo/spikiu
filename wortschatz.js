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
   echter Beispielsatz mit dem Wort; t.de/t.es/t.en/t.el = treue Übersetzungen.
=================================================================== */
(function (w) {
  'use strict';

  var WS = {
    es: [
      { wort:'la casa',    text:'Vivo en una casa pequeña.', ts:{ de:'Ich wohne in einem kleinen Haus.', en:'I live in a small house.', el:'Μένω σε ένα μικρό σπίτι.' },   t:{ de:'das Haus',    en:'the house',   es:'la casa', el:'το σπίτι' } },
      { wort:'el agua',    text:'Bebo agua todos los días.', ts:{ de:'Ich trinke jeden Tag Wasser.', en:'I drink water every day.', el:'Πίνω νερό κάθε μέρα.' },   t:{ de:'das Wasser',  en:'the water',   es:'el agua', el:'το νερό' } },
      { wort:'la comida',  text:'La comida está lista.', ts:{ de:'Das Essen ist fertig.', en:'The food is ready.', el:'Το φαγητό είναι έτοιμο.' },       t:{ de:'das Essen',   en:'the food',    es:'la comida', el:'το φαγητό' } },
      { wort:'el trabajo', text:'Voy al trabajo en autobús.', ts:{ de:'Ich fahre mit dem Bus zur Arbeit.', en:'I go to work by bus.', el:'Πηγαίνω στη δουλειά με το λεωφορείο.' },  t:{ de:'die Arbeit',  en:'the work',    es:'el trabajo', el:'η δουλειά' } },
      { wort:'el amigo',   text:'Mi amigo vive cerca.', ts:{ de:'Mein Freund wohnt in der Nähe.', en:'My friend lives nearby.', el:'Ο φίλος μου μένει κοντά.' },        t:{ de:'der Freund',  en:'the friend',  es:'el amigo', el:'ο φίλος' } },
      { wort:'la calle',   text:'La calle es muy larga.', ts:{ de:'Die Straße ist sehr lang.', en:'The street is very long.', el:'Ο δρόμος είναι πολύ μακρύς.' },      t:{ de:'die Straße',  en:'the street',  es:'la calle', el:'ο δρόμος' } },
      { wort:'el tiempo',  text:'Hoy no tengo tiempo.', ts:{ de:'Heute habe ich keine Zeit.', en:'I don\'t have time today.', el:'Σήμερα δεν έχω χρόνο.' },        t:{ de:'die Zeit',    en:'the time',    es:'el tiempo', el:'ο χρόνος' } },
      { wort:'la noche',   text:'La noche está tranquila.', ts:{ de:'Die Nacht ist ruhig.', en:'The night is quiet.', el:'Η νύχτα είναι ήσυχη.' },    t:{ de:'die Nacht',   en:'the night',   es:'la noche', el:'η νύχτα' } },
      { wort:'el día',     text:'Hoy es un buen día.', ts:{ de:'Heute ist ein guter Tag.', en:'Today is a good day.', el:'Σήμερα είναι μια καλή μέρα.' },         t:{ de:'der Tag',     en:'the day',     es:'el día', el:'η μέρα' } },
      { wort:'la mano',    text:'Lávate las manos, por favor.', ts:{ de:'Wasch dir bitte die Hände.', en:'Wash your hands, please.', el:'Πλύνε τα χέρια σου, σε παρακαλώ.' }, t:{ de:'die Hand',   en:'the hand',    es:'la mano', el:'το χέρι' } },
      { wort:'el libro',   text:'Leo un libro interesante.', ts:{ de:'Ich lese ein interessantes Buch.', en:'I\'m reading an interesting book.', el:'Διαβάζω ένα ενδιαφέρον βιβλίο.' },   t:{ de:'das Buch',    en:'the book',    es:'el libro', el:'το βιβλίο' } },
      { wort:'la puerta',  text:'Abre la puerta, por favor.', ts:{ de:'Mach bitte die Tür auf.', en:'Open the door, please.', el:'Άνοιξε την πόρτα, σε παρακαλώ.' },  t:{ de:'die Tür',     en:'the door',    es:'la puerta', el:'η πόρτα' } },
      { wort:'el coche',   text:'El coche es rojo.', ts:{ de:'Das Auto ist rot.', en:'The car is red.', el:'Το αυτοκίνητο είναι κόκκινο.' },           t:{ de:'das Auto',    en:'the car',     es:'el coche', el:'το αυτοκίνητο' } },
      { wort:'la mesa',    text:'La mesa está en la cocina.', ts:{ de:'Der Tisch steht in der Küche.', en:'The table is in the kitchen.', el:'Το τραπέζι είναι στην κουζίνα.' },  t:{ de:'der Tisch',   en:'the table',   es:'la mesa', el:'το τραπέζι' } },
      { wort:'el sol',     text:'Hoy el sol brilla mucho.', ts:{ de:'Heute scheint die Sonne kräftig.', en:'The sun is shining brightly today.', el:'Σήμερα ο ήλιος λάμπει πολύ.' },    t:{ de:'die Sonne',   en:'the sun',     es:'el sol', el:'ο ήλιος' } },
      { wort:'la familia', text:'Mi familia es muy grande.', ts:{ de:'Meine Familie ist sehr groß.', en:'My family is very big.', el:'Η οικογένειά μου είναι πολύ μεγάλη.' },   t:{ de:'die Familie', en:'the family',  es:'la familia', el:'η οικογένεια' } },
      { wort:'el dinero',  text:'Ahora no tengo dinero.', ts:{ de:'Gerade habe ich kein Geld.', en:'I don\'t have any money right now.', el:'Τώρα δεν έχω χρήματα.' },      t:{ de:'das Geld',    en:'the money',   es:'el dinero', el:'τα χρήματα' } },
      { wort:'la ciudad',  text:'La ciudad es muy bonita.', ts:{ de:'Die Stadt ist sehr schön.', en:'The city is very beautiful.', el:'Η πόλη είναι πολύ όμορφη.' },    t:{ de:'die Stadt',   en:'the city',    es:'la ciudad', el:'η πόλη' } },
      { wort:'el nombre',  text:'Escribe aquí tu nombre.', ts:{ de:'Schreib hier deinen Namen hin.', en:'Write your name here.', el:'Γράψε εδώ το όνομά σου.' },         t:{ de:'der Name',    en:'the name',    es:'el nombre', el:'το όνομα' } },
      { wort:'la palabra', text:'Aprendo una palabra nueva.', ts:{ de:'Ich lerne ein neues Wort.', en:'I\'m learning a new word.', el:'Μαθαίνω μια καινούρια λέξη.' },  t:{ de:'das Wort',    en:'the word',    es:'la palabra', el:'η λέξη' } }
    ],
    de: [
      { wort:'das Haus',    text:'Ich wohne in einem Haus.', ts:{ es:'Vivo en una casa.', en:'I live in a house.', el:'Μένω σε ένα σπίτι.' },      t:{ es:'la casa',    en:'the house',  de:'das Haus', el:'το σπίτι' } },
      { wort:'das Wasser',  text:'Ich trinke viel Wasser.', ts:{ es:'Bebo mucha agua.', en:'I drink a lot of water.', el:'Πίνω πολύ νερό.' },       t:{ es:'el agua',    en:'the water',  de:'das Wasser', el:'το νερό' } },
      { wort:'das Essen',   text:'Das Essen ist schon fertig.', ts:{ es:'La comida ya está lista.', en:'The food is already ready.', el:'Το φαγητό είναι ήδη έτοιμο.' },   t:{ es:'la comida',  en:'the food',   de:'das Essen', el:'το φαγητό' } },
      { wort:'die Arbeit',  text:'Ich gehe heute zur Arbeit.', ts:{ es:'Hoy voy al trabajo.', en:'I\'m going to work today.', el:'Σήμερα πηγαίνω στη δουλειά.' },    t:{ es:'el trabajo', en:'the work',   de:'die Arbeit', el:'η δουλειά' } },
      { wort:'der Freund',  text:'Mein Freund wohnt hier.', ts:{ es:'Mi amigo vive aquí.', en:'My friend lives here.', el:'Ο φίλος μου μένει εδώ.' },       t:{ es:'el amigo',   en:'the friend', de:'der Freund', el:'ο φίλος' } },
      { wort:'die Straße',  text:'Die Straße ist sehr lang.', ts:{ es:'La calle es muy larga.', en:'The street is very long.', el:'Ο δρόμος είναι πολύ μακρύς.' },     t:{ es:'la calle',   en:'the street', de:'die Straße', el:'ο δρόμος' } },
      { wort:'die Zeit',    text:'Ich habe heute keine Zeit.', ts:{ es:'Hoy no tengo tiempo.', en:'I don\'t have time today.', el:'Σήμερα δεν έχω χρόνο.' },    t:{ es:'el tiempo',  en:'the time',   de:'die Zeit', el:'ο χρόνος' } },
      { wort:'die Nacht',   text:'Die Nacht ist ganz ruhig.', ts:{ es:'La noche está muy tranquila.', en:'The night is very quiet.', el:'Η νύχτα είναι πολύ ήσυχη.' },     t:{ es:'la noche',   en:'the night',  de:'die Nacht', el:'η νύχτα' } },
      { wort:'der Tag',     text:'Heute ist ein guter Tag.', ts:{ es:'Hoy es un buen día.', en:'Today is a good day.', el:'Σήμερα είναι μια καλή μέρα.' },      t:{ es:'el día',     en:'the day',    de:'der Tag', el:'η μέρα' } },
      { wort:'die Hand',    text:'Wasch dir bitte die Hände.', ts:{ es:'Lávate las manos, por favor.', en:'Please wash your hands.', el:'Πλύνε τα χέρια σου, σε παρακαλώ.' },    t:{ es:'la mano',    en:'the hand',   de:'die Hand', el:'το χέρι' } },
      { wort:'das Buch',    text:'Ich lese ein gutes Buch.', ts:{ es:'Leo un buen libro.', en:'I\'m reading a good book.', el:'Διαβάζω ένα καλό βιβλίο.' },      t:{ es:'el libro',   en:'the book',   de:'das Buch', el:'το βιβλίο' } },
      { wort:'die Tür',     text:'Mach bitte die Tür zu.', ts:{ es:'Cierra la puerta, por favor.', en:'Please close the door.', el:'Κλείσε την πόρτα, σε παρακαλώ.' },        t:{ es:'la puerta',  en:'the door',   de:'die Tür', el:'η πόρτα' } },
      { wort:'das Auto',    text:'Das Auto ist rot.', ts:{ es:'El coche es rojo.', en:'The car is red.', el:'Το αυτοκίνητο είναι κόκκινο.' },             t:{ es:'el coche',   en:'the car',    de:'das Auto', el:'το αυτοκίνητο' } },
      { wort:'der Tisch',   text:'Der Tisch ist sehr groß.', ts:{ es:'La mesa es muy grande.', en:'The table is very big.', el:'Το τραπέζι είναι πολύ μεγάλο.' },      t:{ es:'la mesa',    en:'the table',  de:'der Tisch', el:'το τραπέζι' } },
      { wort:'die Sonne',   text:'Heute scheint die Sonne.', ts:{ es:'Hoy brilla el sol.', en:'The sun is shining today.', el:'Σήμερα λάμπει ο ήλιος.' },      t:{ es:'el sol',     en:'the sun',    de:'die Sonne', el:'ο ήλιος' } },
      { wort:'die Familie', text:'Meine Familie ist groß.', ts:{ es:'Mi familia es grande.', en:'My family is big.', el:'Η οικογένειά μου είναι μεγάλη.' },       t:{ es:'la familia', en:'the family', de:'die Familie', el:'η οικογένεια' } },
      { wort:'das Geld',    text:'Ich habe kein Geld dabei.', ts:{ es:'No llevo dinero encima.', en:'I don\'t have any money on me.', el:'Δεν έχω χρήματα πάνω μου.' },     t:{ es:'el dinero',  en:'the money',  de:'das Geld', el:'τα χρήματα' } },
      { wort:'die Stadt',   text:'Die Stadt ist sehr schön.', ts:{ es:'La ciudad es muy bonita.', en:'The city is very beautiful.', el:'Η πόλη είναι πολύ όμορφη.' },     t:{ es:'la ciudad',  en:'the city',   de:'die Stadt', el:'η πόλη' } },
      { wort:'der Name',    text:'Wie ist dein Name?', ts:{ es:'¿Cómo te llamas?', en:'What is your name?', el:'Πώς σε λένε;' },            t:{ es:'el nombre',  en:'the name',   de:'der Name', el:'το όνομα' } },
      { wort:'das Wort',    text:'Ich lerne ein neues Wort.', ts:{ es:'Aprendo una palabra nueva.', en:'I\'m learning a new word.', el:'Μαθαίνω μια καινούρια λέξη.' },     t:{ es:'la palabra', en:'the word',   de:'das Wort', el:'η λέξη' } }
    ],
    en: [
      { wort:'the house',  text:'I live in a small house.', ts:{ de:'Ich wohne in einem kleinen Haus.', es:'Vivo en una casa pequeña.', el:'Μένω σε ένα μικρό σπίτι.' },   t:{ de:'das Haus',   es:'la casa',    en:'the house', el:'το σπίτι' } },
      { wort:'the water',  text:'I drink water every day.', ts:{ de:'Ich trinke jeden Tag Wasser.', es:'Bebo agua todos los días.', el:'Πίνω νερό κάθε μέρα.' },   t:{ de:'das Wasser', es:'el agua',    en:'the water', el:'το νερό' } },
      { wort:'the food',   text:'The food is ready now.', ts:{ de:'Das Essen ist jetzt fertig.', es:'La comida ya está lista.', el:'Το φαγητό είναι τώρα έτοιμο.' },     t:{ de:'das Essen',  es:'la comida',  en:'the food', el:'το φαγητό' } },
      { wort:'the work',   text:'I go to work by bus.', ts:{ de:'Ich fahre mit dem Bus zur Arbeit.', es:'Voy al trabajo en autobús.', el:'Πηγαίνω στη δουλειά με το λεωφορείο.' },       t:{ de:'die Arbeit', es:'el trabajo', en:'the work', el:'η δουλειά' } },
      { wort:'the friend', text:'My friend lives near here.', ts:{ de:'Mein Freund wohnt hier in der Nähe.', es:'Mi amigo vive cerca de aquí.', el:'Ο φίλος μου μένει εδώ κοντά.' }, t:{ de:'der Freund', es:'el amigo',   en:'the friend', el:'ο φίλος' } },
      { wort:'the time',   text:'I have no time today.', ts:{ de:'Ich habe heute keine Zeit.', es:'Hoy no tengo tiempo.', el:'Σήμερα δεν έχω χρόνο.' },      t:{ de:'die Zeit',   es:'el tiempo',  en:'the time', el:'ο χρόνος' } },
      { wort:'the day',    text:'Today is a good day.', ts:{ de:'Heute ist ein guter Tag.', es:'Hoy es un buen día.', el:'Σήμερα είναι μια καλή μέρα.' },       t:{ de:'der Tag',    es:'el día',     en:'the day', el:'η μέρα' } },
      { wort:'the book',   text:'I read a good book.', ts:{ de:'Ich lese ein gutes Buch.', es:'Leo un buen libro.', el:'Διαβάζω ένα καλό βιβλίο.' },        t:{ de:'das Buch',   es:'el libro',   en:'the book', el:'το βιβλίο' } },
      { wort:'the door',   text:'Please close the door.', ts:{ de:'Mach bitte die Tür zu.', es:'Cierra la puerta, por favor.', el:'Κλείσε την πόρτα, σε παρακαλώ.' },     t:{ de:'die Tür',    es:'la puerta',  en:'the door', el:'η πόρτα' } },
      { wort:'the car',    text:'The car is red.', ts:{ de:'Das Auto ist rot.', es:'El coche es rojo.', el:'Το αυτοκίνητο είναι κόκκινο.' },            t:{ de:'das Auto',   es:'el coche',   en:'the car', el:'το αυτοκίνητο' } },
      { wort:'the city',   text:'The city is very nice.', ts:{ de:'Die Stadt ist sehr schön.', es:'La ciudad es muy bonita.', el:'Η πόλη είναι πολύ ωραία.' },     t:{ de:'die Stadt',  es:'la ciudad',  en:'the city', el:'η πόλη' } },
      { wort:'the word',   text:'I learn a new word.', ts:{ de:'Ich lerne ein neues Wort.', es:'Aprendo una palabra nueva.', el:'Μαθαίνω μια καινούρια λέξη.' },        t:{ de:'das Wort',   es:'la palabra', en:'the word', el:'η λέξη' } },
      {"wort":"the apple","text":"I eat an apple every morning.","ts":{"de":"Ich esse jeden Morgen einen Apfel.","es":"Me como una manzana todas las mañanas.","el":"Τρώω ένα μήλο κάθε πρωί."},"t":{"de":"der Apfel","es":"la manzana","en":"the apple","el":"το μήλο"}},
      {"wort":"the bread","text":"The bread is still warm.","ts":{"de":"Das Brot ist noch warm.","es":"El pan todavía está caliente.","el":"Το ψωμί είναι ακόμα ζεστό."},"t":{"de":"das Brot","es":"el pan","en":"the bread","el":"το ψωμί"}},
      {"wort":"the bed","text":"My bed is very comfortable.","ts":{"de":"Mein Bett ist sehr bequem.","es":"Mi cama es muy cómoda.","el":"Το κρεβάτι μου είναι πολύ άνετο."},"t":{"de":"das Bett","es":"la cama","en":"the bed","el":"το κρεβάτι"}},
      {"wort":"the key","text":"I can’t find my key.","ts":{"de":"Ich finde meinen Schlüssel nicht.","es":"No encuentro mi llave.","el":"Δεν βρίσκω το κλειδί μου."},"t":{"de":"der Schlüssel","es":"la llave","en":"the key","el":"το κλειδί"}},
      {"wort":"the bus","text":"The bus is late again.","ts":{"de":"Der Bus hat schon wieder Verspätung.","es":"El autobús llega tarde otra vez.","el":"Το λεωφορείο αργεί πάλι."},"t":{"de":"der Bus","es":"el autobús","en":"the bus","el":"το λεωφορείο"}},
      {"wort":"the chair","text":"Please sit on this chair.","ts":{"de":"Setz dich bitte auf diesen Stuhl.","es":"Siéntate en esta silla, por favor.","el":"Κάθισε σε αυτή την καρέκλα, σε παρακαλώ."},"t":{"de":"der Stuhl","es":"la silla","en":"the chair","el":"η καρέκλα"}},
      {"wort":"the dog","text":"Our dog loves the park.","ts":{"de":"Unser Hund liebt den Park.","es":"A nuestro perro le encanta el parque.","el":"Ο σκύλος μας λατρεύει το πάρκο."},"t":{"de":"der Hund","es":"el perro","en":"the dog","el":"ο σκύλος"}},
      {"wort":"the coffee","text":"I drink my coffee black.","ts":{"de":"Ich trinke meinen Kaffee schwarz.","es":"Tomo el café solo.","el":"Πίνω τον καφέ μου σκέτο."},"t":{"de":"der Kaffee","es":"el café","en":"the coffee","el":"ο καφές"}}
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
      { wort:'η λέξη',    text:'Μαθαίνω μια νέα λέξη.', ts:{ de:'Ich lerne ein neues Wort.', es:'Aprendo una palabra nueva.', en:'I\'m learning a new word.' },       t:{ de:'das Wort',   es:'la palabra', en:'the word' } },
      {"wort":"το ψωμί","text":"Αγοράζω φρέσκο ψωμί το πρωί.","ts":{"de":"Ich kaufe morgens frisches Brot.","es":"Compro pan del día por la mañana.","en":"I buy fresh bread in the morning."},"t":{"de":"das Brot","es":"el pan","en":"the bread"}},
      {"wort":"ο καφές","text":"Ο καφές είναι πολύ ζεστός.","ts":{"de":"Der Kaffee ist sehr heiß.","es":"El café está muy caliente.","en":"The coffee is very hot."},"t":{"de":"der Kaffee","es":"el café","en":"the coffee"}},
      {"wort":"η θάλασσα","text":"Το καλοκαίρι κολυμπάμε στη θάλασσα.","ts":{"de":"Im Sommer schwimmen wir im Meer.","es":"En verano nadamos en el mar.","en":"In summer we swim in the sea."},"t":{"de":"das Meer","es":"el mar","en":"the sea"}},
      {"wort":"το τραπέζι","text":"Το τραπέζι είναι στην κουζίνα.","ts":{"de":"Der Tisch steht in der Küche.","es":"La mesa está en la cocina.","en":"The table is in the kitchen."},"t":{"de":"der Tisch","es":"la mesa","en":"the table"}},
      {"wort":"το αυτοκίνητο","text":"Το αυτοκίνητο είναι κόκκινο.","ts":{"de":"Das Auto ist rot.","es":"El coche es rojo.","en":"The car is red."},"t":{"de":"das Auto","es":"el coche","en":"the car"}},
      {"wort":"το λεωφορείο","text":"Το λεωφορείο έρχεται σε πέντε λεπτά.","ts":{"de":"Der Bus kommt in fünf Minuten.","es":"El autobús llega en cinco minutos.","en":"The bus comes in five minutes."},"t":{"de":"der Bus","es":"el autobús","en":"the bus"}},
      {"wort":"το κλειδί","text":"Πού είναι το κλειδί μου;","ts":{"de":"Wo ist mein Schlüssel?","es":"¿Dónde está mi llave?","en":"Where is my key?"},"t":{"de":"der Schlüssel","es":"la llave","en":"the key"}},
      {"wort":"η μητέρα","text":"Η μητέρα μου μένει στη Θεσσαλονίκη.","ts":{"de":"Meine Mutter wohnt in Thessaloniki.","es":"Mi madre vive en Salónica.","en":"My mother lives in Thessaloniki."},"t":{"de":"die Mutter","es":"la madre","en":"the mother"}},
      {"wort":"το παιδί","text":"Το παιδί παίζει στην αυλή.","ts":{"de":"Das Kind spielt im Hof.","es":"El niño juega en el patio.","en":"The child is playing in the yard."},"t":{"de":"das Kind","es":"el niño","en":"the child"}},
      {"wort":"η γάτα","text":"Η γάτα κοιμάται στον καναπέ.","ts":{"de":"Die Katze schläft auf dem Sofa.","es":"La gata duerme en el sofá.","en":"The cat is sleeping on the sofa."},"t":{"de":"die Katze","es":"el gato","en":"the cat"}}
    ]
  };

  // Icon-Map: Konzept (t.en) → Emoji. NUR sichtbare Dinge; abstrakte bleiben leer.
  // Das Emoji ist nur der Schlüssel: gym.html zeigt bilder/om-<Codepunkte>.svg (self-hosted OpenMoji, 27.09.).
  var ICONMAP = {
    'the house':'🏠','the water':'💧','the food':'🍽️','the street':'🛣️','the night':'🌙',
    'the hand':'✋','the book':'📖','the door':'🚪','the car':'🚗','the sun':'☀️',
    'the city':'🏙️','the money':'💶','the family':'👪',
    'the apple':'🍎','the bread':'🍞','the key':'🔑','the bus':'🚌','the chair':'🪑','the coffee':'☕','the sea':'🌊','the bed':'🛏'
  };

  w.spikiuWortschatz = function (zielsprache, muttersprache) {
    var list = WS[zielsprache] || WS.es || [];
    var mutter = muttersprache || 'de';
    return list.map(function (it) {
      var tr = (it.t && (it.t[mutter] || (mutter === 'el' ? it.t.en : '') || it.t.de || it.t.en || it.t.es)) || '';
      // ts = Übersetzung des ganzen Beispielsatzes (10.10., für Piñata/Globos)
      var ts = (it.ts && (it.ts[mutter] || (mutter === 'el' ? it.ts.en : ''))) || '';
      return { wort: it.wort, text: it.text, tr: tr, ts: ts, icon: (it.t && ICONMAP[it.t.en]) || '', konzept: (it.t && it.t.en) || '' };
    });
  };
  w.spikiuWortschatz.daten = WS;

})(window);
