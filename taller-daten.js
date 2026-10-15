/* ═══════════════════════════════════════════════════════════════════
   taller-daten.js — statische Lesewerkstatt-Texte (Phase 1 · 0 Tokens)
   EIN Speicher für ALLE Zielsprachen. Sprache = FELD.
   Getaggt nach  zielsprache → koennen → [Einträge].
   Fremde Schrift (el): "lautschrift" gesetzt. Sonst null.
   Aufgaben-Typen: "mc" (feste Lösung), "orden" (feste Reihung),
   "frei" (offen → NUR Premium/live bewertet, hier nur als Prompt).
   Inhalt wird separat autoriert; hier eine Saat für es.
   MUTTERSPRACHE-Felder (rahmen, bruecke.t, frage, erklaerung, schluss,
   glossar-Werte) dürfen ein String ODER ein Objekt {de, es, en, el} sein;
   taller.html wählt profile.muttersprache (Fallback de). Zielsprachige
   Felder bleiben Strings. (es-Texte brauchen keinen es-Schlüssel: wer
   Spanisch als Muttersprache hat, bekommt keine es-Texte.)
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var DB = {
    es: {
      anfang: [
        { id:'es-anf-cafe', thema:'cafe',
          rahmen:{de:'Ein Schild an einer Café-Tür.',en:'A sign on a café door.',el:'Μια πινακίδα στην πόρτα ενός καφέ.'},
          texto:'Cerrado por vacaciones. Volvemos el 3 de agosto.',
          bruecke:[{w:'cerrado',t:{de:'geschlossen',en:'closed',el:'κλειστό'}},{w:'vacaciones',t:{de:'Urlaub',en:'holidays',el:'διακοπές'}},{w:'volvemos',t:{de:'wir kommen zurück',en:'we\'ll be back',el:'επιστρέφουμε'}}],
          lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:{de:'Warum ist das Café zu?',en:'Why is the café closed?',el:'Γιατί είναι κλειστό το καφέ;'},optionen:['Por vacaciones','Por obras','Por la lluvia'],loesung:0,erklaerung:{de:'Im Text: «Cerrado por vacaciones».',en:'In the text: «Cerrado por vacaciones».',el:'Στο κείμενο: «Cerrado por vacaciones».'}},
            {typ:'orden',frage:{de:'Bring die Teile in die richtige Reihenfolge.',en:'Put the pieces in the right order.',el:'Βάλε τα κομμάτια στη σωστή σειρά.'},teile:['de agosto','Volvemos','el 3'],loesung:[1,2,0]},
            {typ:'frei',frage:{de:'Wann warst du zuletzt im Urlaub? Schreib einen Satz auf Spanisch.',en:'When were you last on holiday? Write a sentence in Spanish.',el:'Πότε πήγες τελευταία φορά διακοπές; Γράψε μια πρόταση στα ισπανικά.'}}
          ],
          glossar:{cerrado:{de:'geschlossen',en:'closed',el:'κλειστό'},por:{de:'wegen',en:'because of',el:'λόγω'},vacaciones:{de:'Urlaub',en:'holidays',el:'διακοπές'},volvemos:{de:'wir kommen zurück',en:'we\'ll be back',el:'επιστρέφουμε'},el:{de:'der',en:'the',el:'ο'},de:{de:'von',en:'of',el:'από, του'},agosto:{de:'August',en:'August',el:'Αύγουστος'}},
          schluss:{de:'Ein Schild verstehen — schon eine kleine Eroberung.',en:'Understanding a sign — already a small conquest.',el:'Να καταλαβαίνεις μια πινακίδα — ήδη μια μικρή κατάκτηση.'} }
      ],
      mittel: [
        { id:'es-mit-mensaje', thema:'mensaje',
          rahmen:{de:'Eine kurze Nachricht von einer Freundin.',en:'A short message from a friend.',el:'Ένα σύντομο μήνυμα από μια φίλη.'},
          texto:'¡Hola! Esta tarde no puedo quedar, tengo médico. ¿Nos vemos mañana para un café?',
          bruecke:null, lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:'¿Por qué no puede quedar esta tarde?',optionen:['Tiene médico','Está de viaje','Trabaja'],loesung:0,erklaerung:'«tengo médico».'},
            {typ:'orden',frage:{de:'Ordne die Antwort.',en:'Put the reply in order.',el:'Βάλε την απάντηση σε σειρά.'},teile:['para un café','mañana','Nos vemos'],loesung:[2,1,0]},
            {typ:'frei',frage:{de:'Antworte ihr: Kannst du morgen? Schreib deine Antwort.',en:'Reply to her: can you make it tomorrow? Write your answer.',el:'Απάντησέ της: μπορείς αύριο; Γράψε την απάντησή σου.'}}
          ],
          glossar:{hola:{de:'Hallo',en:'hello',el:'γεια'},esta:{de:'diese',en:'this',el:'αυτό το'},tarde:{de:'Nachmittag',en:'afternoon',el:'απόγευμα'},no:{de:'nicht',en:'not',el:'δεν'},puedo:{de:'ich kann',en:'I can',el:'μπορώ'},quedar:{de:'sich treffen',en:'to meet up',el:'να βρεθούμε'},tengo:{de:'ich habe',en:'I have',el:'έχω'},médico:{de:'Arzt',en:'doctor',el:'γιατρός'},nos:{de:'uns',en:'us',el:'μας'},vemos:{de:'wir sehen',en:'we see',el:'βλέπουμε'},mañana:{de:'morgen',en:'tomorrow',el:'αύριο'},para:{de:'für',en:'for',el:'για'},un:{de:'ein',en:'a',el:'ένας, ένα'},café:{de:'Kaffee',en:'coffee',el:'καφές'}},
          schluss:{de:'Du hast eine echte Nachricht verstanden — genau darum geht es.',en:'You understood a real message — that\'s exactly the point.',el:'Κατάλαβες ένα αληθινό μήνυμα — αυτό ακριβώς μετράει.'} }
      ],
      fortgeschritten: [
        { id:'es-for-mercado', thema:'articulo',
          rahmen:'Un breve artículo de un periódico local.',
          texto:'El pequeño mercado del barrio, que llevaba más de cincuenta años abierto, cerrará sus puertas a final de mes. Los vecinos, sorprendidos, han organizado una recogida de firmas para intentar salvarlo.',
          bruecke:null, lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:'¿Qué han hecho los vecinos?',optionen:['Una recogida de firmas','Una fiesta','Nada'],loesung:0,erklaerung:'«han organizado una recogida de firmas».'},
            {typ:'orden',frage:'Ordena la frase.',teile:['a final de mes','El mercado','cerrará'],loesung:[1,2,0]},
            {typ:'frei',frage:'¿Qué opinas de que cierren los comercios de barrio? Escribe un par de frases.'}
          ],
          glossar:{el:{de:'der',en:'the',el:'ο'},pequeño:{de:'klein',en:'small',el:'μικρός'},mercado:{de:'Markt',en:'market',el:'αγορά'},del:{de:'vom',en:'of the',el:'του, της'},barrio:{de:'Viertel',en:'neighbourhood',el:'γειτονιά'},que:{de:'der/die/das',en:'which, that',el:'που'},llevaba:{de:'war (seit)',en:'had been (for)',el:'ήταν (εδώ και)'},más:{de:'mehr',en:'more',el:'περισσότερα'},de:{de:'von',en:'of',el:'από'},cincuenta:{de:'fünfzig',en:'fifty',el:'πενήντα'},años:{de:'Jahre',en:'years',el:'χρόνια'},abierto:{de:'geöffnet',en:'open',el:'ανοιχτός'},cerrará:{de:'wird schließen',en:'will close',el:'θα κλείσει'},sus:{de:'seine',en:'its',el:'του, της'},puertas:{de:'Türen',en:'doors',el:'πόρτες'},a:{de:'am',en:'at',el:'στο'},final:{de:'Ende',en:'end',el:'τέλος'},mes:{de:'Monat',en:'month',el:'μήνας'},los:{de:'die',en:'the',el:'οι'},vecinos:{de:'Nachbarn',en:'neighbours',el:'γείτονες'},sorprendidos:{de:'überrascht',en:'surprised',el:'έκπληκτοι'},han:{de:'haben',en:'have',el:'έχουν'},organizado:{de:'organisiert',en:'organised',el:'οργανώσει'},una:{de:'eine',en:'a',el:'μια'},recogida:{de:'Sammlung',en:'collection',el:'συλλογή'},firmas:{de:'Unterschriften',en:'signatures',el:'υπογραφές'},para:{de:'um zu',en:'in order to',el:'για να'},intentar:{de:'versuchen',en:'to try',el:'να προσπαθήσουν'},salvarlo:{de:'es zu retten',en:'to save it',el:'να τη σώσουν'}},
          schluss:'Leer un artículo entero, sin puente. Eso ya es otro nivel.' }
      ]
    },
    de: { anfang:[], mittel:[], fortgeschritten:[] },
    en: { anfang:[], mittel:[], fortgeschritten:[] },
    el: {
      anfang: [
        { id:'el-anf-kafeneio', thema:'kafeneio',
          rahmen:{de:'Ein Zettel an der Tür eines Kafeneions.',es:'Un cartel en la puerta de un kafeneio, el café de toda la vida.',en:'A note on the door of a kafeneio.'},
          texto:'Το καφενείο είναι κλειστό τη Δευτέρα. Ανοίγουμε Τρίτη στις 7 το πρωί.',
          bruecke:[{w:'καφενείο',t:{de:'Kafeneion (traditionelles Café)',es:'café tradicional',en:'traditional café'}},{w:'κλειστό',t:{de:'geschlossen',es:'cerrado',en:'closed'}},{w:'ανοίγουμε',t:{de:'wir öffnen',es:'abrimos',en:'we open'}}],
          lautschrift:'To kafenío íne klistó ti Deftéra. Anígume Tríti stis eftá to proí.',
          aufgaben:[
            {typ:'mc',frage:{de:'Wann ist das Kafeneion zu?',es:'¿Cuándo está cerrado el kafeneio?',en:'When is the kafeneio closed?'},optionen:['Τη Δευτέρα','Την Τρίτη','Την Κυριακή'],loesung:0,erklaerung:{de:'Im Text: «κλειστό τη Δευτέρα».',es:'En el texto: «κλειστό τη Δευτέρα».',en:'In the text: «κλειστό τη Δευτέρα».'}},
            {typ:'orden',frage:{de:'Bring die Teile in die richtige Reihenfolge.',es:'Pon las piezas en el orden correcto.',en:'Put the pieces in the right order.'},teile:['στις 7','Ανοίγουμε','Τρίτη'],loesung:[1,2,0]},
            {typ:'frei',frage:{de:'An welchem Tag gehst du gern ins Café? Schreib einen Satz auf Griechisch.',es:'¿Qué día te gusta ir a la cafetería? Escribe una frase en griego.',en:'Which day do you like going to a café? Write a sentence in Greek.'}}
          ],
          glossar:{'το':{de:'das',es:'el',en:'the'},'καφενείο':{de:'Kafeneion (traditionelles Café)',es:'café tradicional',en:'traditional café'},'είναι':{de:'ist',es:'está, es',en:'is'},'κλειστό':{de:'geschlossen',es:'cerrado',en:'closed'},'τη':{de:'am (die)',es:'el (día)',en:'on (the)'},'δευτέρα':{de:'Montag',es:'lunes',en:'Monday'},'ανοίγουμε':{de:'wir öffnen',es:'abrimos',en:'we open'},'τρίτη':{de:'Dienstag',es:'martes',en:'Tuesday'},'στις':{de:'um',es:'a las',en:'at'},'πρωί':{de:'Morgen',es:'mañana',en:'morning'}},
          schluss:{de:'Ein Schild in fremder Schrift verstehen — schon eine kleine Eroberung.',es:'Entender un cartel en otro alfabeto: ya es una pequeña conquista.',en:'Understanding a sign in another alphabet — already a small conquest.'} }
      ],
      mittel: [
        { id:'el-mit-spitonoikokyra', thema:'mensaje',
          rahmen:{de:'Eine SMS von der Vermieterin.',es:'Un SMS de la casera.',en:'A text message from the landlady.'},
          texto:'Καλημέρα Άννα μου! Αύριο το πρωί έρχεται ο υδραυλικός για τον θερμοσίφωνα, γύρω στις 10. Αν δεν είσαι σπίτι, αφήνω το κλειδί στην κυρία Ελένη στον πρώτο. Φιλιά, Κατερίνα',
          bruecke:null,
          lautschrift:'Kaliméra Ána mu! Ávrio to proí érchete o idravlikós ja ton thermosífona, yíro stis déka. An den íse spíti, afíno to klidí stin kiría Eléni ston próto. Filiá, Katerína',
          aufgaben:[
            {typ:'mc',frage:'Τι ώρα έρχεται ο υδραυλικός;',optionen:['Γύρω στις 10','Το απόγευμα','Μεθαύριο'],loesung:0,erklaerung:'«γύρω στις 10».'},
            {typ:'orden',frage:{de:'Ordne den Satz.',es:'Ordena la frase.',en:'Put the sentence in order.'},teile:['το κλειδί','Αφήνω','στην κυρία Ελένη'],loesung:[1,0,2]},
            {typ:'frei',frage:{de:'Antworte Katerina: Bist du morgen früh zu Hause? Schreib deine Antwort.',es:'Contesta a Katerina: ¿estarás en casa mañana por la mañana? Escribe tu respuesta.',en:'Reply to Katerina: will you be home tomorrow morning? Write your answer.'}}
          ],
          glossar:{'καλημέρα':{de:'Guten Morgen',es:'buenos días',en:'good morning'},'μου':{de:'mein(e) (liebe …)',es:'mía (cariñoso)',en:'my (dear)'},'αύριο':{de:'morgen',es:'mañana',en:'tomorrow'},'το':{de:'das / den',es:'el / lo',en:'the'},'πρωί':{de:'Morgen',es:'mañana (por la)',en:'morning'},'έρχεται':{de:'kommt',es:'viene',en:'is coming'},'ο':{de:'der',es:'el',en:'the'},'υδραυλικός':{de:'Klempner',es:'fontanero',en:'plumber'},'για':{de:'wegen, für',es:'por, para',en:'for'},'τον':{de:'den',es:'el',en:'the'},'θερμοσίφωνα':{de:'Boiler',es:'termo, calentador',en:'water heater'},'γύρω':{de:'gegen, ungefähr',es:'sobre, hacia',en:'around'},'στις':{de:'um',es:'a las',en:'at'},'αν':{de:'wenn',es:'si',en:'if'},'δεν':{de:'nicht',es:'no',en:'not'},'είσαι':{de:'du bist',es:'estás',en:'you are'},'σπίτι':{de:'zu Hause',es:'en casa',en:'at home'},'αφήνω':{de:'ich lasse, gebe ab',es:'dejo',en:'I leave'},'κλειδί':{de:'Schlüssel',es:'llave',en:'key'},'στην':{de:'bei der',es:'a la',en:'with the'},'κυρία':{de:'Frau',es:'señora',en:'Mrs'},'στον':{de:'im (Stock)',es:'en el (piso)',en:'on the (floor)'},'πρώτο':{de:'ersten (Stock)',es:'primero',en:'first (floor)'},'φιλιά':{de:'Küsschen',es:'besos',en:'kisses'}},
          schluss:{de:'Eine echte Nachricht, mitten aus dem griechischen Alltag — verstanden.',es:'Un mensaje de verdad, del día a día griego, y lo has entendido.',en:'A real message from everyday Greek life — understood.'} }
      ],
      fortgeschritten: [
        { id:'el-for-giorti', thema:'giorti',
          rahmen:'Μια ανάρτηση στο Facebook για μια γιορτή.',
          texto:'Χρόνια πολλά σε όλους τους Γιώργηδες και σε όλες τις Γεωργίες! Φέτος η γιορτή πέφτει πριν από το Πάσχα, οπότε τη γιορτάζουμε τη Δευτέρα του Πάσχα. Ο μπαμπάς μου, ο Γιώργος, δεν θέλει δώρα· λέει ότι του φτάνει να μαζευτούμε όλοι στο σπίτι στο χωριό. Η μαμά ψήνει κουλουράκια από χθες!',
          bruecke:null, lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:'Πότε γιορτάζουν φέτος οι Γιώργηδες;',optionen:['Τη Δευτέρα του Πάσχα','Στις 23 Απριλίου','Την Κυριακή του Πάσχα'],loesung:0,erklaerung:'«τη γιορτάζουμε τη Δευτέρα του Πάσχα».'},
            {typ:'orden',frage:'Βάλε τη φράση σε σειρά.',teile:['κουλουράκια','Η μαμά ψήνει','από χθες'],loesung:[1,0,2]},
            {typ:'frei',frage:'Πώς γιορτάζετε στη χώρα σου τα γενέθλια ή τη γιορτή; Γράψε δυο-τρεις προτάσεις.'}
          ],
          glossar:{'χρόνια':{de:'Jahre',es:'años',en:'years'},'πολλά':{de:'viele',es:'muchos',en:'many'},'σε':{de:'an, zu',es:'a',en:'to'},'όλους':{de:'alle',es:'todos',en:'all'},'τους':{de:'die',es:'los',en:'the'},'γιώργηδες':{de:'alle, die Giorgos heißen',es:'los Jorges',en:'all the Georges'},'και':{de:'und',es:'y',en:'and'},'όλες':{de:'alle',es:'todas',en:'all'},'τις':{de:'die',es:'las',en:'the'},'γεωργίες':{de:'alle, die Georgia heißen',es:'las Georgias',en:'all the Georgias'},'φέτος':{de:'dieses Jahr',es:'este año',en:'this year'},'η':{de:'die',es:'la',en:'the'},'γιορτή':{de:'Namenstag, Fest',es:'santo, fiesta',en:'name day, feast'},'πέφτει':{de:'fällt',es:'cae',en:'falls'},'πριν':{de:'vor',es:'antes',en:'before'},'από':{de:'von, seit',es:'de, desde',en:'from, since'},'το':{de:'das',es:'el',en:'the'},'πάσχα':{de:'Ostern',es:'Pascua',en:'Easter'},'οπότε':{de:'deshalb',es:'así que',en:'so'},'τη':{de:'sie / am',es:'la / el',en:'it / on'},'γιορτάζουμε':{de:'wir feiern',es:'celebramos',en:'we celebrate'},'δευτέρα':{de:'Montag',es:'lunes',en:'Monday'},'του':{de:'des / ihm',es:'de / le',en:'of / him'},'ο':{de:'der',es:'el',en:'the'},'μπαμπάς':{de:'Papa',es:'papá',en:'dad'},'μου':{de:'mein',es:'mi',en:'my'},'γιώργος':{de:'Giorgos (Georg)',es:'Yorgos (Jorge)',en:'Giorgos (George)'},'δεν':{de:'nicht',es:'no',en:'not'},'θέλει':{de:'will',es:'quiere',en:'wants'},'δώρα':{de:'Geschenke',es:'regalos',en:'presents'},'λέει':{de:'sagt',es:'dice',en:'says'},'ότι':{de:'dass',es:'que',en:'that'},'φτάνει':{de:'es reicht',es:'basta',en:'it\'s enough'},'να':{de:'dass, zu',es:'que',en:'to'},'μαζευτούμε':{de:'wir kommen zusammen',es:'nos juntemos',en:'we get together'},'όλοι':{de:'alle',es:'todos',en:'all'},'στο':{de:'im, ins',es:'en el',en:'in the'},'σπίτι':{de:'Haus',es:'casa',en:'house'},'χωριό':{de:'Dorf',es:'pueblo',en:'village'},'μαμά':{de:'Mama',es:'mamá',en:'mum'},'ψήνει':{de:'backt',es:'hornea',en:'is baking'},'κουλουράκια':{de:'Osterkringel (Gebäck)',es:'rosquillas de Pascua',en:'Easter biscuits'},'χθες':{de:'gestern',es:'ayer',en:'yesterday'}},
          schluss:'Ένα ολόκληρο κείμενο, χωρίς γέφυρα. Αυτό πια είναι άλλη υπόθεση.' }
      ]
    }
  };

  function pick(ziel, koennen, seenIds){
    var byLvl = (DB[ziel] || {})[koennen] || [];
    if(!byLvl.length) return null;
    seenIds = seenIds || [];
    var fresh = byLvl.filter(function(e){ return seenIds.indexOf(e.id) < 0; });
    var pool = fresh.length ? fresh : byLvl;   // alle gesehen → wieder von vorn
    return pool[Math.floor(Math.random() * pool.length)];
  }

  window.spikiuTaller = { db: DB, pick: pick, levels: ['anfang','mittel','fortgeschritten'] };
})();
