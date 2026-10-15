/* ═══════════════════════════════════════════════════════════════════
   woerterbuch.js — gemeinsames Wörterbuch (eine Übersetzungs-Quelle)
   0 Backend, 0 Tokens. Genutzt von wortjag (Sammeln) + Mein Buch (Anzeige).
   Struktur:  DICT[zielsprache][wort] = { de, en, el, ... }   (wort normalisiert)
   API:  window.spikiuWoerterbuch.tr(wort, ziel, mutter) -> Übersetzung | ''
   Kern-Wortschatz (häufig + Seed-Texte). Wächst mit dem Inhalt.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var DICT = {
    es: {
      // Artikel · Pronomen
      el:{de:'der',en:'the',el:'ο'}, la:{de:'die',en:'the',el:'η'}, los:{de:'die',en:'the',el:'οι'}, las:{de:'die',en:'the',el:'οι'},
      un:{de:'ein',en:'a',el:'ένας'}, una:{de:'eine',en:'a',el:'μία'}, unos:{de:'einige',en:'some',el:'μερικοί'}, unas:{de:'einige',en:'some',el:'μερικές'},
      lo:{de:'das',en:'the',el:'το'}, al:{de:'zum',en:'to the',el:'στον'}, del:{de:'vom',en:'of the',el:'του'},
      yo:{de:'ich',en:'I',el:'εγώ'}, tú:{de:'du',en:'you',el:'εσύ'}, él:{de:'er',en:'he',el:'αυτός'}, ella:{de:'sie',en:'she',el:'αυτή'},
      nosotros:{de:'wir',en:'we',el:'εμείς'}, vosotros:{de:'ihr',en:'you',el:'εσείς'}, vosotras:{de:'ihr',en:'you',el:'εσείς'}, ellos:{de:'sie',en:'they',el:'αυτοί'},
      usted:{de:'Sie',en:'you',el:'εσείς (ευγενικά)'}, ustedes:{de:'Sie',en:'you',el:'εσείς (ευγενικά)'},
      me:{de:'mich',en:'me',el:'με'}, te:{de:'dich',en:'you',el:'σε'}, se:{de:'sich',en:'oneself',el:'τον εαυτό του'}, nos:{de:'uns',en:'us',el:'μας'},
      le:{de:'ihm',en:'him',el:'του'}, les:{de:'ihnen',en:'them',el:'τους'},
      mi:{de:'mein',en:'my',el:'μου'}, tu:{de:'dein',en:'your',el:'σου'}, su:{de:'sein',en:'his',el:'του'}, sus:{de:'seine',en:'his',el:'του'},
      este:{de:'dieser',en:'this',el:'αυτός'}, esta:{de:'diese',en:'this',el:'αυτή'}, esto:{de:'dies',en:'this',el:'αυτό'}, eso:{de:'das',en:'that',el:'εκείνο'},
      // Verben (Infinitiv + häufige Formen)
      ser:{de:'sein',en:'to be',el:'είμαι'}, estar:{de:'sein',en:'to be',el:'είμαι'}, está:{de:'ist',en:'is',el:'είναι'}, están:{de:'sind',en:'are',el:'είναι'},
      tener:{de:'haben',en:'to have',el:'έχω'}, tengo:{de:'ich habe',en:'I have',el:'έχω'}, tiene:{de:'hat',en:'has',el:'έχει'},
      haber:{de:'haben',en:'to have',el:'έχω (βοηθ.)'}, hay:{de:'es gibt',en:'there is',el:'υπάρχει'}, han:{de:'haben',en:'have',el:'έχουν'}, ha:{de:'hat',en:'has',el:'έχει'},
      hacer:{de:'machen',en:'to do',el:'κάνω'}, hace:{de:'macht',en:'does',el:'κάνει'},
      ir:{de:'gehen',en:'to go',el:'πηγαίνω'}, voy:{de:'ich gehe',en:'I go',el:'πηγαίνω'}, va:{de:'geht',en:'goes',el:'πηγαίνει'}, vamos:{de:'wir gehen',en:'we go',el:'πάμε'},
      poder:{de:'können',en:'to be able',el:'μπορώ'}, puedo:{de:'ich kann',en:'I can',el:'μπορώ'}, puede:{de:'kann',en:'can',el:'μπορεί'},
      querer:{de:'wollen',en:'to want',el:'θέλω'}, quiero:{de:'ich will',en:'I want',el:'θέλω'}, quiere:{de:'will',en:'wants',el:'θέλει'},
      ver:{de:'sehen',en:'to see',el:'βλέπω'}, veo:{de:'ich sehe',en:'I see',el:'βλέπω'}, vemos:{de:'wir sehen',en:'we see',el:'βλέπουμε'},
      quedar:{de:'sich treffen',en:'to meet',el:'συναντιέμαι'}, quedamos:{de:'wir treffen uns',en:'we meet',el:'συναντιόμαστε'},
      decir:{de:'sagen',en:'to say',el:'λέω'}, dice:{de:'sagt',en:'says',el:'λέει'},
      dar:{de:'geben',en:'to give',el:'δίνω'}, saber:{de:'wissen',en:'to know',el:'ξέρω'},
      llevar:{de:'tragen',en:'to carry',el:'κουβαλάω'}, llevaba:{de:'war (seit)',en:'had been',el:'ήταν (εδώ και)'},
      volver:{de:'zurückkommen',en:'to return',el:'επιστρέφω'}, volvemos:{de:'wir kommen zurück',en:'we return',el:'επιστρέφουμε'},
      abrir:{de:'öffnen',en:'to open',el:'ανοίγω'}, abierto:{de:'geöffnet',en:'open',el:'ανοιχτό'},
      cerrar:{de:'schließen',en:'to close',el:'κλείνω'}, cerrará:{de:'wird schließen',en:'will close',el:'θα κλείσει'}, cerrado:{de:'geschlossen',en:'closed',el:'κλειστό'},
      comer:{de:'essen',en:'to eat',el:'τρώω'}, beber:{de:'trinken',en:'to drink',el:'πίνω'}, leer:{de:'lesen',en:'to read',el:'διαβάζω'},
      escribir:{de:'schreiben',en:'to write',el:'γράφω'}, hablar:{de:'sprechen',en:'to speak',el:'μιλάω'}, trabajar:{de:'arbeiten',en:'to work',el:'δουλεύω'},
      organizar:{de:'organisieren',en:'to organize',el:'οργανώνω'}, organizado:{de:'organisiert',en:'organized',el:'οργανωμένος'},
      intentar:{de:'versuchen',en:'to try',el:'προσπαθώ'}, salvar:{de:'retten',en:'to save',el:'σώζω'}, salvarlo:{de:'es zu retten',en:'to save it',el:'να το σώσω'},
      pedir:{de:'bestellen',en:'to order',el:'παραγγέλνω'}, pidió:{de:'bestellte',en:'ordered',el:'παρήγγειλε'},
      // Nomen
      casa:{de:'Haus',en:'house',el:'σπίτι'}, agua:{de:'Wasser',en:'water',el:'νερό'}, comida:{de:'Essen',en:'food',el:'φαγητό'},
      café:{de:'Kaffee',en:'coffee',el:'καφές'}, leche:{de:'Milch',en:'milk',el:'γάλα'}, pan:{de:'Brot',en:'bread',el:'ψωμί'},
      tostada:{de:'Toast',en:'toast',el:'φρυγανιά'}, zumo:{de:'Saft',en:'juice',el:'χυμός'}, naranja:{de:'Orange',en:'orange',el:'πορτοκάλι'},
      día:{de:'Tag',en:'day',el:'μέρα'}, tarde:{de:'Nachmittag',en:'afternoon',el:'απόγευμα'}, noche:{de:'Nacht',en:'night',el:'νύχτα'},
      mañana:{de:'morgen',en:'tomorrow',el:'αύριο'}, madrugada:{de:'Morgendämmerung',en:'dawn',el:'ξημέρωμα'},
      semana:{de:'Woche',en:'week',el:'εβδομάδα'}, mes:{de:'Monat',en:'month',el:'μήνας'}, año:{de:'Jahr',en:'year',el:'χρόνος'}, años:{de:'Jahre',en:'years',el:'χρόνια'},
      tiempo:{de:'Zeit',en:'time',el:'χρόνος'}, hora:{de:'Stunde',en:'hour',el:'ώρα'},
      mercado:{de:'Markt',en:'market',el:'αγορά'}, barrio:{de:'Viertel',en:'neighborhood',el:'γειτονιά'}, ciudad:{de:'Stadt',en:'city',el:'πόλη'},
      calle:{de:'Straße',en:'street',el:'δρόμος'}, tienda:{de:'Laden',en:'shop',el:'μαγαζί'},
      puerta:{de:'Tür',en:'door',el:'πόρτα'}, puertas:{de:'Türen',en:'doors',el:'πόρτες'}, mesa:{de:'Tisch',en:'table',el:'τραπέζι'},
      libro:{de:'Buch',en:'book',el:'βιβλίο'}, palabra:{de:'Wort',en:'word',el:'λέξη'}, nombre:{de:'Name',en:'name',el:'όνομα'},
      familia:{de:'Familie',en:'family',el:'οικογένεια'}, amigo:{de:'Freund',en:'friend',el:'φίλος'}, amiga:{de:'Freundin',en:'friend',el:'φίλη'},
      gente:{de:'Leute',en:'people',el:'κόσμος'}, vecino:{de:'Nachbar',en:'neighbor',el:'γείτονας'}, vecinos:{de:'Nachbarn',en:'neighbors',el:'γείτονες'},
      hombre:{de:'Mann',en:'man',el:'άντρας'}, mujer:{de:'Frau',en:'woman',el:'γυναίκα'}, niño:{de:'Kind',en:'child',el:'παιδί'},
      dinero:{de:'Geld',en:'money',el:'χρήματα'}, trabajo:{de:'Arbeit',en:'work',el:'δουλειά'}, médico:{de:'Arzt',en:'doctor',el:'γιατρός'},
      sol:{de:'Sonne',en:'sun',el:'ήλιος'}, mano:{de:'Hand',en:'hand',el:'χέρι'}, coche:{de:'Auto',en:'car',el:'αυτοκίνητο'}, tren:{de:'Zug',en:'train',el:'τρένο'},
      andén:{de:'Bahnsteig',en:'platform',el:'αποβάθρα'}, firma:{de:'Unterschrift',en:'signature',el:'υπογραφή'}, firmas:{de:'Unterschriften',en:'signatures',el:'υπογραφές'},
      recogida:{de:'Sammlung',en:'collection',el:'συλλογή'}, vacaciones:{de:'Urlaub',en:'holidays',el:'διακοπές'},
      // Adjektive
      bueno:{de:'gut',en:'good',el:'καλός'}, malo:{de:'schlecht',en:'bad',el:'κακός'}, grande:{de:'groß',en:'big',el:'μεγάλος'}, pequeño:{de:'klein',en:'small',el:'μικρός'},
      nuevo:{de:'neu',en:'new',el:'καινούργιος'}, viejo:{de:'alt',en:'old',el:'παλιός'}, maduro:{de:'reif',en:'ripe',el:'ώριμος'}, amable:{de:'freundlich',en:'kind',el:'ευγενικός'},
      feliz:{de:'glücklich',en:'happy',el:'ευτυχισμένος'}, cansado:{de:'müde',en:'tired',el:'κουρασμένος'}, contento:{de:'zufrieden',en:'content',el:'ικανοποιημένος'},
      sorprendido:{de:'überrascht',en:'surprised',el:'έκπληκτος'}, sorprendidos:{de:'überrascht',en:'surprised',el:'έκπληκτοι'},
      recién:{de:'frisch',en:'freshly',el:'φρεσκο-'}, hecho:{de:'gemacht',en:'made',el:'φτιαγμένος'},
      // Zahlen
      uno:{de:'eins',en:'one',el:'ένα'}, dos:{de:'zwei',en:'two',el:'δύο'}, tres:{de:'drei',en:'three',el:'τρία'},
      cincuenta:{de:'fünfzig',en:'fifty',el:'πενήντα'}, agosto:{de:'August',en:'August',el:'Αύγουστος'},
      // Präpositionen · Verbinder · häufig
      de:{de:'von',en:'of',el:'από'}, en:{de:'in',en:'in',el:'σε'}, a:{de:'zu',en:'to',el:'σε'}, con:{de:'mit',en:'with',el:'με'},
      sin:{de:'ohne',en:'without',el:'χωρίς'}, por:{de:'für',en:'for',el:'για'}, para:{de:'für',en:'for',el:'για'}, sobre:{de:'über',en:'about',el:'για'},
      entre:{de:'zwischen',en:'between',el:'ανάμεσα'}, hasta:{de:'bis',en:'until',el:'μέχρι'}, desde:{de:'seit',en:'since',el:'από (χρον.)'},
      y:{de:'und',en:'and',el:'και'}, o:{de:'oder',en:'or',el:'ή'}, pero:{de:'aber',en:'but',el:'αλλά'}, que:{de:'der/die/das',en:'that',el:'που'},
      si:{de:'wenn',en:'if',el:'αν'}, no:{de:'nicht',en:'not',el:'όχι'}, sí:{de:'ja',en:'yes',el:'ναι'}, como:{de:'wie',en:'as',el:'όπως'},
      cuando:{de:'wenn',en:'when',el:'όταν'}, porque:{de:'weil',en:'because',el:'επειδή'}, también:{de:'auch',en:'also',el:'επίσης'},
      muy:{de:'sehr',en:'very',el:'πολύ'}, más:{de:'mehr',en:'more',el:'περισσότερο'}, menos:{de:'weniger',en:'less',el:'λιγότερο'},
      mucho:{de:'viel',en:'much',el:'πολύ'}, poco:{de:'wenig',en:'little',el:'λίγο'}, todo:{de:'alles',en:'all',el:'όλα'}, otro:{de:'anderer',en:'other',el:'άλλος'},
      ya:{de:'schon',en:'already',el:'ήδη'}, aquí:{de:'hier',en:'here',el:'εδώ'}, final:{de:'Ende',en:'end',el:'τέλος'},
      // Grußformeln
      hola:{de:'Hallo',en:'hello',el:'γεια'}, adiós:{de:'Tschüss',en:'bye',el:'αντίο'}, gracias:{de:'danke',en:'thanks',el:'ευχαριστώ'}, bien:{de:'gut',en:'well',el:'καλά'},
      necesitar:{de:'brauchen',en:'to need',el:'χρειάζομαι'}, necesito:{de:'ich brauche',en:'I need',el:'χρειάζομαι'},
      gustar:{de:'gefallen',en:'to like',el:'αρέσω'}, gusta:{de:'gefällt',en:'likes',el:'αρέσει'}, gustaría:{de:'würde gern',en:'would like',el:'θα ήθελα'},
      encontrar:{de:'finden',en:'to find',el:'βρίσκω'}, pensar:{de:'denken',en:'to think',el:'σκέφτομαι'}, pienso:{de:'ich denke',en:'I think',el:'σκέφτομαι'},
      creer:{de:'glauben',en:'to believe',el:'πιστεύω'}, creo:{de:'ich glaube',en:'I believe',el:'πιστεύω'},
      sentir:{de:'fühlen',en:'to feel',el:'νιώθω'}, siento:{de:'es tut mir leid',en:'I feel',el:'λυπάμαι'},
      esperar:{de:'warten',en:'to wait',el:'περιμένω'}, llamar:{de:'rufen',en:'to call',el:'καλώ'}, llamo:{de:'ich heiße',en:'I call',el:'με λένε'},
      preguntar:{de:'fragen',en:'to ask',el:'ρωτάω'}, pregunta:{de:'Frage',en:'question',el:'ερώτηση'},
      responder:{de:'antworten',en:'to answer',el:'απαντώ'}, respuesta:{de:'Antwort',en:'answer',el:'απάντηση'},
      entender:{de:'verstehen',en:'to understand',el:'καταλαβαίνω'}, entiendo:{de:'ich verstehe',en:'I understand',el:'καταλαβαίνω'},
      aprender:{de:'lernen',en:'to learn',el:'μαθαίνω'}, aprendo:{de:'ich lerne',en:'I learn',el:'μαθαίνω'}, enseñar:{de:'lehren',en:'to teach',el:'διδάσκω'},
      jugar:{de:'spielen',en:'to play',el:'παίζω'}, correr:{de:'rennen',en:'to run',el:'τρέχω'}, caminar:{de:'gehen',en:'to walk',el:'περπατάω'},
      viajar:{de:'reisen',en:'to travel',el:'ταξιδεύω'}, cocinar:{de:'kochen',en:'to cook',el:'μαγειρεύω'}, dormir:{de:'schlafen',en:'to sleep',el:'κοιμάμαι'}, duermo:{de:'ich schlafe',en:'I sleep',el:'κοιμάμαι'},
      empezar:{de:'anfangen',en:'to start',el:'αρχίζω'}, empieza:{de:'beginnt',en:'starts',el:'αρχίζει'}, terminar:{de:'beenden',en:'to finish',el:'τελειώνω'},
      seguir:{de:'folgen',en:'to follow',el:'συνεχίζω'}, cambiar:{de:'ändern',en:'to change',el:'αλλάζω'}, ayudar:{de:'helfen',en:'to help',el:'βοηθάω'}, ayuda:{de:'Hilfe',en:'help',el:'βοήθεια'},
      pagar:{de:'bezahlen',en:'to pay',el:'πληρώνω'}, costar:{de:'kosten',en:'to cost',el:'κοστίζω'}, cuesta:{de:'kostet',en:'costs',el:'κοστίζει'},
      ganar:{de:'gewinnen',en:'to win',el:'κερδίζω'}, perder:{de:'verlieren',en:'to lose',el:'χάνω'}, recordar:{de:'erinnern',en:'to remember',el:'θυμάμαι'}, olvidar:{de:'vergessen',en:'to forget',el:'ξεχνάω'},
      padre:{de:'Vater',en:'father',el:'πατέρας'}, madre:{de:'Mutter',en:'mother',el:'μητέρα'}, hijo:{de:'Sohn',en:'son',el:'γιος'}, hija:{de:'Tochter',en:'daughter',el:'κόρη'},
      hermano:{de:'Bruder',en:'brother',el:'αδελφός'}, hermana:{de:'Schwester',en:'sister',el:'αδελφή'}, abuelo:{de:'Großvater',en:'grandfather',el:'παππούς'}, abuela:{de:'Großmutter',en:'grandmother',el:'γιαγιά'},
      cabeza:{de:'Kopf',en:'head',el:'κεφάλι'}, ojo:{de:'Auge',en:'eye',el:'μάτι'}, ojos:{de:'Augen',en:'eyes',el:'μάτια'}, boca:{de:'Mund',en:'mouth',el:'στόμα'}, nariz:{de:'Nase',en:'nose',el:'μύτη'},
      oreja:{de:'Ohr',en:'ear',el:'αυτί'}, pie:{de:'Fuß',en:'foot',el:'πόδι'}, pierna:{de:'Bein',en:'leg',el:'πόδι (σκέλος)'}, brazo:{de:'Arm',en:'arm',el:'χέρι (μπράτσο)'}, corazón:{de:'Herz',en:'heart',el:'καρδιά'},
      pueblo:{de:'Dorf',en:'village',el:'χωριό'}, país:{de:'Land',en:'country',el:'χώρα'}, mundo:{de:'Welt',en:'world',el:'κόσμος'}, playa:{de:'Strand',en:'beach',el:'παραλία'},
      mar:{de:'Meer',en:'sea',el:'θάλασσα'}, río:{de:'Fluss',en:'river',el:'ποτάμι'}, montaña:{de:'Berg',en:'mountain',el:'βουνό'}, cielo:{de:'Himmel',en:'sky',el:'ουρανός'},
      luna:{de:'Mond',en:'moon',el:'φεγγάρι'}, estrella:{de:'Stern',en:'star',el:'αστέρι'}, lluvia:{de:'Regen',en:'rain',el:'βροχή'}, viento:{de:'Wind',en:'wind',el:'άνεμος'},
      nieve:{de:'Schnee',en:'snow',el:'χιόνι'}, fuego:{de:'Feuer',en:'fire',el:'φωτιά'}, árbol:{de:'Baum',en:'tree',el:'δέντρο'}, flor:{de:'Blume',en:'flower',el:'λουλούδι'},
      perro:{de:'Hund',en:'dog',el:'σκύλος'}, gato:{de:'Katze',en:'cat',el:'γάτα'}, pájaro:{de:'Vogel',en:'bird',el:'πουλί'},
      ventana:{de:'Fenster',en:'window',el:'παράθυρο'}, cama:{de:'Bett',en:'bed',el:'κρεβάτι'}, silla:{de:'Stuhl',en:'chair',el:'καρέκλα'}, cocina:{de:'Küche',en:'kitchen',el:'κουζίνα'},
      baño:{de:'Bad',en:'bathroom',el:'μπάνιο'}, cuarto:{de:'Zimmer',en:'room',el:'δωμάτιο'}, llave:{de:'Schlüssel',en:'key',el:'κλειδί'},
      carne:{de:'Fleisch',en:'meat',el:'κρέας'}, pescado:{de:'Fisch',en:'fish',el:'ψάρι'}, fruta:{de:'Obst',en:'fruit',el:'φρούτα'}, verdura:{de:'Gemüse',en:'vegetable',el:'λαχανικά'},
      huevo:{de:'Ei',en:'egg',el:'αυγό'}, queso:{de:'Käse',en:'cheese',el:'τυρί'}, azúcar:{de:'Zucker',en:'sugar',el:'ζάχαρη'}, sal:{de:'Salz',en:'salt',el:'αλάτι'},
      vino:{de:'Wein',en:'wine',el:'κρασί'}, cerveza:{de:'Bier',en:'beer',el:'μπίρα'}, té:{de:'Tee',en:'tea',el:'τσάι'},
      escuela:{de:'Schule',en:'school',el:'σχολείο'}, clase:{de:'Klasse',en:'class',el:'τάξη'}, profesor:{de:'Lehrer',en:'teacher',el:'δάσκαλος'}, estudiante:{de:'Student',en:'student',el:'φοιτητής'},
      historia:{de:'Geschichte',en:'story',el:'ιστορία'}, problema:{de:'Problem',en:'problem',el:'πρόβλημα'}, idea:{de:'Idee',en:'idea',el:'ιδέα'}, cosa:{de:'Ding',en:'thing',el:'πράγμα'}, vida:{de:'Leben',en:'life',el:'ζωή'},
      alto:{de:'hoch',en:'tall',el:'ψηλός'}, bajo:{de:'niedrig',en:'low',el:'χαμηλός'}, largo:{de:'lang',en:'long',el:'μακρύς'}, corto:{de:'kurz',en:'short',el:'κοντός'},
      fácil:{de:'einfach',en:'easy',el:'εύκολος'}, difícil:{de:'schwer',en:'difficult',el:'δύσκολος'}, caro:{de:'teuer',en:'expensive',el:'ακριβός'}, barato:{de:'billig',en:'cheap',el:'φτηνός'},
      rápido:{de:'schnell',en:'fast',el:'γρήγορος'}, lento:{de:'langsam',en:'slow',el:'αργός'}, fuerte:{de:'stark',en:'strong',el:'δυνατός'}, débil:{de:'schwach',en:'weak',el:'αδύναμος'},
      caliente:{de:'heiß',en:'hot',el:'ζεστός'}, frío:{de:'kalt',en:'cold',el:'κρύος'}, limpio:{de:'sauber',en:'clean',el:'καθαρός'}, sucio:{de:'schmutzig',en:'dirty',el:'βρόμικος'},
      bonito:{de:'hübsch',en:'pretty',el:'όμορφος'}, guapo:{de:'gutaussehend',en:'handsome',el:'ωραίος'}, triste:{de:'traurig',en:'sad',el:'λυπημένος'}, importante:{de:'wichtig',en:'important',el:'σημαντικός'},
      mismo:{de:'gleich',en:'same',el:'ίδιος'}, propio:{de:'eigen',en:'own',el:'δικός'}, lleno:{de:'voll',en:'full',el:'γεμάτος'}, vacío:{de:'leer',en:'empty',el:'άδειος'},
      listo:{de:'fertig',en:'ready',el:'έτοιμος'}, seguro:{de:'sicher',en:'sure',el:'σίγουρος'}, posible:{de:'möglich',en:'possible',el:'δυνατός (εφικτός)'},
      qué:{de:'was',en:'what',el:'τι'}, quién:{de:'wer',en:'who',el:'ποιος'}, dónde:{de:'wo',en:'where',el:'πού'}, cuándo:{de:'wann',en:'when',el:'πότε'}, cómo:{de:'wie',en:'how',el:'πώς'}, cuánto:{de:'wie viel',en:'how much',el:'πόσο'},
      hoy:{de:'heute',en:'today',el:'σήμερα'}, ayer:{de:'gestern',en:'yesterday',el:'χθες'}, ahora:{de:'jetzt',en:'now',el:'τώρα'}, luego:{de:'später',en:'later',el:'αργότερα'},
      siempre:{de:'immer',en:'always',el:'πάντα'}, nunca:{de:'nie',en:'never',el:'ποτέ'}, temprano:{de:'früh',en:'early',el:'νωρίς'},
      mal:{de:'schlecht',en:'badly',el:'άσχημα'}, mejor:{de:'besser',en:'better',el:'καλύτερα'}, peor:{de:'schlechter',en:'worse',el:'χειρότερα'}, casi:{de:'fast',en:'almost',el:'σχεδόν'},
      solo:{de:'nur',en:'only',el:'μόνο'}, juntos:{de:'zusammen',en:'together',el:'μαζί'}, cerca:{de:'nah',en:'near',el:'κοντά'}, lejos:{de:'weit',en:'far',el:'μακριά'},
      dentro:{de:'drinnen',en:'inside',el:'μέσα'}, fuera:{de:'draußen',en:'outside',el:'έξω'}, arriba:{de:'oben',en:'up',el:'πάνω'}, abajo:{de:'unten',en:'down',el:'κάτω'}, allí:{de:'dort',en:'there',el:'εκεί'},
      cuatro:{de:'vier',en:'four',el:'τέσσερα'}, cinco:{de:'fünf',en:'five',el:'πέντε'}, seis:{de:'sechs',en:'six',el:'έξι'}, siete:{de:'sieben',en:'seven',el:'επτά'}, ocho:{de:'acht',en:'eight',el:'οκτώ'},
      nueve:{de:'neun',en:'nine',el:'εννέα'}, diez:{de:'zehn',en:'ten',el:'δέκα'}, cien:{de:'hundert',en:'hundred',el:'εκατό'}, mil:{de:'tausend',en:'thousand',el:'χίλια'}, primero:{de:'erste',en:'first',el:'πρώτος'}, último:{de:'letzte',en:'last',el:'τελευταίος'},
      rojo:{de:'rot',en:'red',el:'κόκκινος'}, azul:{de:'blau',en:'blue',el:'μπλε'}, verde:{de:'grün',en:'green',el:'πράσινος'}, amarillo:{de:'gelb',en:'yellow',el:'κίτρινος'}, negro:{de:'schwarz',en:'black',el:'μαύρος'}, blanco:{de:'weiß',en:'white',el:'άσπρος'},
      // ── aus dem Learnroman (häufige Formen & Wörter) ──
      es:{de:'ist',en:'is',el:'είναι'}, era:{de:'war',en:'was',el:'ήταν'}, había:{de:'es gab',en:'there was',el:'υπήρχε'}, soy:{de:'ich bin',en:'I am',el:'είμαι'}, estoy:{de:'ich bin',en:'I am',el:'είμαι'}, eres:{de:'du bist',en:'you are',el:'είσαι'}, son:{de:'sind',en:'are',el:'είναι'},
      tenía:{de:'hatte',en:'had',el:'είχε'}, conocía:{de:'kannte',en:'knew',el:'γνώριζε'}, entendía:{de:'verstand',en:'understood',el:'καταλάβαινε'}, dijo:{de:'sagte',en:'said',el:'είπε'}, miró:{de:'schaute',en:'looked',el:'κοίταξε'}, sonrió:{de:'lächelte',en:'smiled',el:'χαμογέλασε'},
      has:{de:'du hast',en:'you have',el:'έχεις'}, tienes:{de:'du hast',en:'you have',el:'έχεις'}, sube:{de:'geh hoch',en:'go up',el:'ανέβα'}, pasa:{de:'komm rein',en:'come in',el:'πέρασε'},
      vez:{de:'Mal',en:'time',el:'φορά'}, veces:{de:'Mal',en:'times',el:'φορές'}, así:{de:'so',en:'like this',el:'έτσι'}, algo:{de:'etwas',en:'something',el:'κάτι'}, nada:{de:'nichts',en:'nothing',el:'τίποτα'}, otra:{de:'andere',en:'other',el:'άλλη'}, entonces:{de:'dann',en:'then',el:'τότε'},
      todavía:{de:'noch',en:'still',el:'ακόμα'}, delante:{de:'vorne',en:'in front',el:'μπροστά'}, detrás:{de:'hinten',en:'behind',el:'πίσω'}, derecha:{de:'rechts',en:'right',el:'δεξιά'}, izquierda:{de:'links',en:'left',el:'αριστερά'},
      bienvenido:{de:'willkommen',en:'welcome',el:'καλώς ήρθες'}, bienvenida:{de:'willkommen',en:'welcome',el:'καλώς ήρθες'}, favor:{de:'Gefallen',en:'favor',el:'χάρη'}, verdad:{de:'Wahrheit',en:'truth',el:'αλήθεια'}, buenas:{de:'guten',en:'good',el:'καλή'}, vale:{de:'okay',en:'okay',el:'εντάξει'},
      hambre:{de:'Hunger',en:'hunger',el:'πείνα'}, primera:{de:'erste',en:'first',el:'πρώτη'}, mucha:{de:'viel',en:'much',el:'πολλή'}, vieja:{de:'alt',en:'old',el:'παλιά'}, roja:{de:'rot',en:'red',el:'κόκκινη'}, estrecho:{de:'eng',en:'narrow',el:'στενός'}, tal:{de:'solch',en:'such',el:'τέτοιος'}, gusto:{de:'Freude',en:'pleasure',el:'χαρά'},
      ruido:{de:'Lärm',en:'noise',el:'θόρυβος'}, marca:{de:'Marke',en:'brand',el:'μάρκα'}, aceite:{de:'Öl',en:'oil',el:'λάδι'}, cambio:{de:'Wechselgeld',en:'change',el:'ρέστα'}, fin:{de:'Ende',en:'end',el:'τέλος'}, piso:{de:'Wohnung',en:'flat',el:'διαμέρισμα'}, cena:{de:'Abendessen',en:'dinner',el:'βραδινό'},
      cortado:{de:'Cortado',en:'cortado',el:'κορτάδο (καφές)'}, tomate:{de:'Tomate',en:'tomato',el:'ντομάτα'}, bar:{de:'Bar',en:'bar',el:'μπαρ'}, barra:{de:'Theke',en:'counter',el:'πάγκος'}, tortilla:{de:'Tortilla',en:'omelette',el:'ομελέτα'}, maleta:{de:'Koffer',en:'suitcase',el:'βαλίτσα'},
      salón:{de:'Wohnzimmer',en:'living room',el:'σαλόνι'}, vaso:{de:'Glas',en:'glass',el:'ποτήρι'}, vasos:{de:'Gläser',en:'glasses',el:'ποτήρια'}, arquitectura:{de:'Architektur',en:'architecture',el:'αρχιτεκτονική'}, cebolla:{de:'Zwiebel',en:'onion',el:'κρεμμύδι'}, libros:{de:'Bücher',en:'books',el:'βιβλία'},
      fútbol:{de:'Fußball',en:'football',el:'ποδόσφαιρο'}, euros:{de:'Euro',en:'euros',el:'ευρώ'}, alemán:{de:'Deutsch',en:'German',el:'Γερμανικά'}, español:{de:'Spanisch',en:'Spanish',el:'Ισπανικά'}, alemania:{de:'Deutschland',en:'Germany',el:'Γερμανία'}, españa:{de:'Spanien',en:'Spain',el:'Ισπανία'}, ah:{de:'ah',en:'ah',el:'α'}
    },
    de: {}, en: {}, el: {}
  };

  function norm(w){ return String(w||'').trim().toLowerCase().replace(/^[¿¡"'«»(\[]+|[.,;:!?"'«»)\]]+$/g,''); }
  function tr(wort, ziel, mutter){
    var e = (DICT[ziel] || {})[norm(wort)];
    if(!e) return '';
    return e[mutter] || e.de || e.en || '';
  }
  window.spikiuWoerterbuch = { dict: DICT, tr: tr, norm: norm };
})();
