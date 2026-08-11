/* ═══════════════════════════════════════════════════════════════════
   woerterbuch.js — gemeinsames Wörterbuch (eine Übersetzungs-Quelle)
   0 Backend, 0 Tokens. Genutzt von wortjag (Sammeln) + Mein Buch (Anzeige).
   Struktur:  DICT[zielsprache][wort] = { de, en, ... }   (wort normalisiert)
   API:  window.spikiuWoerterbuch.tr(wort, ziel, mutter) -> Übersetzung | ''
   Kern-Wortschatz (häufig + Seed-Texte). Wächst mit dem Inhalt.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var DICT = {
    es: {
      // Artikel · Pronomen
      el:{de:'der',en:'the'}, la:{de:'die',en:'the'}, los:{de:'die',en:'the'}, las:{de:'die',en:'the'},
      un:{de:'ein',en:'a'}, una:{de:'eine',en:'a'}, unos:{de:'einige',en:'some'}, unas:{de:'einige',en:'some'},
      lo:{de:'das',en:'the'}, al:{de:'zum',en:'to the'}, del:{de:'vom',en:'of the'},
      yo:{de:'ich',en:'I'}, tú:{de:'du',en:'you'}, él:{de:'er',en:'he'}, ella:{de:'sie',en:'she'},
      nosotros:{de:'wir',en:'we'}, ellos:{de:'sie',en:'they'},
      me:{de:'mich',en:'me'}, te:{de:'dich',en:'you'}, se:{de:'sich',en:'oneself'}, nos:{de:'uns',en:'us'},
      le:{de:'ihm',en:'him'}, les:{de:'ihnen',en:'them'},
      mi:{de:'mein',en:'my'}, tu:{de:'dein',en:'your'}, su:{de:'sein',en:'his'}, sus:{de:'seine',en:'his'},
      este:{de:'dieser',en:'this'}, esta:{de:'diese',en:'this'}, esto:{de:'dies',en:'this'}, eso:{de:'das',en:'that'},
      // Verben (Infinitiv + häufige Formen)
      ser:{de:'sein',en:'to be'}, estar:{de:'sein',en:'to be'}, está:{de:'ist',en:'is'}, están:{de:'sind',en:'are'},
      tener:{de:'haben',en:'to have'}, tengo:{de:'ich habe',en:'I have'}, tiene:{de:'hat',en:'has'},
      haber:{de:'haben',en:'to have'}, hay:{de:'es gibt',en:'there is'}, han:{de:'haben',en:'have'}, ha:{de:'hat',en:'has'},
      hacer:{de:'machen',en:'to do'}, hace:{de:'macht',en:'does'},
      ir:{de:'gehen',en:'to go'}, voy:{de:'ich gehe',en:'I go'}, va:{de:'geht',en:'goes'}, vamos:{de:'wir gehen',en:'we go'},
      poder:{de:'können',en:'to be able'}, puedo:{de:'ich kann',en:'I can'}, puede:{de:'kann',en:'can'},
      querer:{de:'wollen',en:'to want'}, quiero:{de:'ich will',en:'I want'}, quiere:{de:'will',en:'wants'},
      ver:{de:'sehen',en:'to see'}, veo:{de:'ich sehe',en:'I see'}, vemos:{de:'wir sehen',en:'we see'},
      quedar:{de:'sich treffen',en:'to meet'}, quedamos:{de:'wir treffen uns',en:'we meet'},
      decir:{de:'sagen',en:'to say'}, dice:{de:'sagt',en:'says'},
      dar:{de:'geben',en:'to give'}, saber:{de:'wissen',en:'to know'},
      llevar:{de:'tragen',en:'to carry'}, llevaba:{de:'war (seit)',en:'had been'},
      volver:{de:'zurückkommen',en:'to return'}, volvemos:{de:'wir kommen zurück',en:'we return'},
      abrir:{de:'öffnen',en:'to open'}, abierto:{de:'geöffnet',en:'open'},
      cerrar:{de:'schließen',en:'to close'}, cerrará:{de:'wird schließen',en:'will close'}, cerrado:{de:'geschlossen',en:'closed'},
      comer:{de:'essen',en:'to eat'}, beber:{de:'trinken',en:'to drink'}, leer:{de:'lesen',en:'to read'},
      escribir:{de:'schreiben',en:'to write'}, hablar:{de:'sprechen',en:'to speak'}, trabajar:{de:'arbeiten',en:'to work'},
      organizar:{de:'organisieren',en:'to organize'}, organizado:{de:'organisiert',en:'organized'},
      intentar:{de:'versuchen',en:'to try'}, salvar:{de:'retten',en:'to save'}, salvarlo:{de:'es zu retten',en:'to save it'},
      pedir:{de:'bestellen',en:'to order'}, pidió:{de:'bestellte',en:'ordered'},
      // Nomen
      casa:{de:'Haus',en:'house'}, agua:{de:'Wasser',en:'water'}, comida:{de:'Essen',en:'food'},
      café:{de:'Kaffee',en:'coffee'}, leche:{de:'Milch',en:'milk'}, pan:{de:'Brot',en:'bread'},
      tostada:{de:'Toast',en:'toast'}, zumo:{de:'Saft',en:'juice'}, naranja:{de:'Orange',en:'orange'},
      día:{de:'Tag',en:'day'}, tarde:{de:'Nachmittag',en:'afternoon'}, noche:{de:'Nacht',en:'night'},
      mañana:{de:'morgen',en:'tomorrow'}, madrugada:{de:'Morgendämmerung',en:'dawn'},
      semana:{de:'Woche',en:'week'}, mes:{de:'Monat',en:'month'}, año:{de:'Jahr',en:'year'}, años:{de:'Jahre',en:'years'},
      tiempo:{de:'Zeit',en:'time'}, hora:{de:'Stunde',en:'hour'},
      mercado:{de:'Markt',en:'market'}, barrio:{de:'Viertel',en:'neighborhood'}, ciudad:{de:'Stadt',en:'city'},
      calle:{de:'Straße',en:'street'}, tienda:{de:'Laden',en:'shop'},
      puerta:{de:'Tür',en:'door'}, puertas:{de:'Türen',en:'doors'}, mesa:{de:'Tisch',en:'table'},
      libro:{de:'Buch',en:'book'}, palabra:{de:'Wort',en:'word'}, nombre:{de:'Name',en:'name'},
      familia:{de:'Familie',en:'family'}, amigo:{de:'Freund',en:'friend'}, amiga:{de:'Freundin',en:'friend'},
      gente:{de:'Leute',en:'people'}, vecino:{de:'Nachbar',en:'neighbor'}, vecinos:{de:'Nachbarn',en:'neighbors'},
      hombre:{de:'Mann',en:'man'}, mujer:{de:'Frau',en:'woman'}, niño:{de:'Kind',en:'child'},
      dinero:{de:'Geld',en:'money'}, trabajo:{de:'Arbeit',en:'work'}, médico:{de:'Arzt',en:'doctor'},
      sol:{de:'Sonne',en:'sun'}, mano:{de:'Hand',en:'hand'}, coche:{de:'Auto',en:'car'}, tren:{de:'Zug',en:'train'},
      andén:{de:'Bahnsteig',en:'platform'}, firma:{de:'Unterschrift',en:'signature'}, firmas:{de:'Unterschriften',en:'signatures'},
      recogida:{de:'Sammlung',en:'collection'}, vacaciones:{de:'Urlaub',en:'holidays'},
      // Adjektive
      bueno:{de:'gut',en:'good'}, malo:{de:'schlecht',en:'bad'}, grande:{de:'groß',en:'big'}, pequeño:{de:'klein',en:'small'},
      nuevo:{de:'neu',en:'new'}, viejo:{de:'alt',en:'old'}, maduro:{de:'reif',en:'ripe'}, amable:{de:'freundlich',en:'kind'},
      feliz:{de:'glücklich',en:'happy'}, cansado:{de:'müde',en:'tired'}, contento:{de:'zufrieden',en:'content'},
      sorprendido:{de:'überrascht',en:'surprised'}, sorprendidos:{de:'überrascht',en:'surprised'},
      recién:{de:'frisch',en:'freshly'}, hecho:{de:'gemacht',en:'made'},
      // Zahlen
      uno:{de:'eins',en:'one'}, dos:{de:'zwei',en:'two'}, tres:{de:'drei',en:'three'},
      cincuenta:{de:'fünfzig',en:'fifty'}, agosto:{de:'August',en:'August'},
      // Präpositionen · Verbinder · häufig
      de:{de:'von',en:'of'}, en:{de:'in',en:'in'}, a:{de:'zu',en:'to'}, con:{de:'mit',en:'with'},
      sin:{de:'ohne',en:'without'}, por:{de:'für',en:'for'}, para:{de:'für',en:'for'}, sobre:{de:'über',en:'about'},
      entre:{de:'zwischen',en:'between'}, hasta:{de:'bis',en:'until'}, desde:{de:'seit',en:'since'},
      y:{de:'und',en:'and'}, o:{de:'oder',en:'or'}, pero:{de:'aber',en:'but'}, que:{de:'der/die/das',en:'that'},
      si:{de:'wenn',en:'if'}, no:{de:'nicht',en:'not'}, sí:{de:'ja',en:'yes'}, como:{de:'wie',en:'as'},
      cuando:{de:'wenn',en:'when'}, porque:{de:'weil',en:'because'}, también:{de:'auch',en:'also'},
      muy:{de:'sehr',en:'very'}, más:{de:'mehr',en:'more'}, menos:{de:'weniger',en:'less'},
      mucho:{de:'viel',en:'much'}, poco:{de:'wenig',en:'little'}, todo:{de:'alles',en:'all'}, otro:{de:'anderer',en:'other'},
      ya:{de:'schon',en:'already'}, aquí:{de:'hier',en:'here'}, final:{de:'Ende',en:'end'},
      // Grußformeln
      hola:{de:'Hallo',en:'hello'}, adiós:{de:'Tschüss',en:'bye'}, gracias:{de:'danke',en:'thanks'}, bien:{de:'gut',en:'well'},
      necesitar:{de:'brauchen',en:'to need'}, necesito:{de:'ich brauche',en:'I need'},
      gustar:{de:'gefallen',en:'to like'}, gusta:{de:'gefällt',en:'likes'}, gustaría:{de:'würde gern',en:'would like'},
      encontrar:{de:'finden',en:'to find'}, pensar:{de:'denken',en:'to think'}, pienso:{de:'ich denke',en:'I think'},
      creer:{de:'glauben',en:'to believe'}, creo:{de:'ich glaube',en:'I believe'},
      sentir:{de:'fühlen',en:'to feel'}, siento:{de:'es tut mir leid',en:'I feel'},
      esperar:{de:'warten',en:'to wait'}, llamar:{de:'rufen',en:'to call'}, llamo:{de:'ich heiße',en:'I call'},
      preguntar:{de:'fragen',en:'to ask'}, pregunta:{de:'Frage',en:'question'},
      responder:{de:'antworten',en:'to answer'}, respuesta:{de:'Antwort',en:'answer'},
      entender:{de:'verstehen',en:'to understand'}, entiendo:{de:'ich verstehe',en:'I understand'},
      aprender:{de:'lernen',en:'to learn'}, aprendo:{de:'ich lerne',en:'I learn'}, enseñar:{de:'lehren',en:'to teach'},
      jugar:{de:'spielen',en:'to play'}, correr:{de:'rennen',en:'to run'}, caminar:{de:'gehen',en:'to walk'},
      viajar:{de:'reisen',en:'to travel'}, cocinar:{de:'kochen',en:'to cook'}, dormir:{de:'schlafen',en:'to sleep'}, duermo:{de:'ich schlafe',en:'I sleep'},
      empezar:{de:'anfangen',en:'to start'}, empieza:{de:'beginnt',en:'starts'}, terminar:{de:'beenden',en:'to finish'},
      seguir:{de:'folgen',en:'to follow'}, cambiar:{de:'ändern',en:'to change'}, ayudar:{de:'helfen',en:'to help'}, ayuda:{de:'Hilfe',en:'help'},
      pagar:{de:'bezahlen',en:'to pay'}, costar:{de:'kosten',en:'to cost'}, cuesta:{de:'kostet',en:'costs'},
      ganar:{de:'gewinnen',en:'to win'}, perder:{de:'verlieren',en:'to lose'}, recordar:{de:'erinnern',en:'to remember'}, olvidar:{de:'vergessen',en:'to forget'},
      padre:{de:'Vater',en:'father'}, madre:{de:'Mutter',en:'mother'}, hijo:{de:'Sohn',en:'son'}, hija:{de:'Tochter',en:'daughter'},
      hermano:{de:'Bruder',en:'brother'}, hermana:{de:'Schwester',en:'sister'}, abuelo:{de:'Großvater',en:'grandfather'}, abuela:{de:'Großmutter',en:'grandmother'},
      cabeza:{de:'Kopf',en:'head'}, ojo:{de:'Auge',en:'eye'}, ojos:{de:'Augen',en:'eyes'}, boca:{de:'Mund',en:'mouth'}, nariz:{de:'Nase',en:'nose'},
      oreja:{de:'Ohr',en:'ear'}, pie:{de:'Fuß',en:'foot'}, pierna:{de:'Bein',en:'leg'}, brazo:{de:'Arm',en:'arm'}, corazón:{de:'Herz',en:'heart'},
      pueblo:{de:'Dorf',en:'village'}, país:{de:'Land',en:'country'}, mundo:{de:'Welt',en:'world'}, playa:{de:'Strand',en:'beach'},
      mar:{de:'Meer',en:'sea'}, río:{de:'Fluss',en:'river'}, montaña:{de:'Berg',en:'mountain'}, cielo:{de:'Himmel',en:'sky'},
      luna:{de:'Mond',en:'moon'}, estrella:{de:'Stern',en:'star'}, lluvia:{de:'Regen',en:'rain'}, viento:{de:'Wind',en:'wind'},
      nieve:{de:'Schnee',en:'snow'}, fuego:{de:'Feuer',en:'fire'}, árbol:{de:'Baum',en:'tree'}, flor:{de:'Blume',en:'flower'},
      perro:{de:'Hund',en:'dog'}, gato:{de:'Katze',en:'cat'}, pájaro:{de:'Vogel',en:'bird'},
      ventana:{de:'Fenster',en:'window'}, cama:{de:'Bett',en:'bed'}, silla:{de:'Stuhl',en:'chair'}, cocina:{de:'Küche',en:'kitchen'},
      baño:{de:'Bad',en:'bathroom'}, cuarto:{de:'Zimmer',en:'room'}, llave:{de:'Schlüssel',en:'key'},
      carne:{de:'Fleisch',en:'meat'}, pescado:{de:'Fisch',en:'fish'}, fruta:{de:'Obst',en:'fruit'}, verdura:{de:'Gemüse',en:'vegetable'},
      huevo:{de:'Ei',en:'egg'}, queso:{de:'Käse',en:'cheese'}, azúcar:{de:'Zucker',en:'sugar'}, sal:{de:'Salz',en:'salt'},
      vino:{de:'Wein',en:'wine'}, cerveza:{de:'Bier',en:'beer'}, té:{de:'Tee',en:'tea'},
      escuela:{de:'Schule',en:'school'}, clase:{de:'Klasse',en:'class'}, profesor:{de:'Lehrer',en:'teacher'}, estudiante:{de:'Student',en:'student'},
      historia:{de:'Geschichte',en:'story'}, problema:{de:'Problem',en:'problem'}, idea:{de:'Idee',en:'idea'}, cosa:{de:'Ding',en:'thing'}, vida:{de:'Leben',en:'life'},
      alto:{de:'hoch',en:'tall'}, bajo:{de:'niedrig',en:'low'}, largo:{de:'lang',en:'long'}, corto:{de:'kurz',en:'short'},
      fácil:{de:'einfach',en:'easy'}, difícil:{de:'schwer',en:'difficult'}, caro:{de:'teuer',en:'expensive'}, barato:{de:'billig',en:'cheap'},
      rápido:{de:'schnell',en:'fast'}, lento:{de:'langsam',en:'slow'}, fuerte:{de:'stark',en:'strong'}, débil:{de:'schwach',en:'weak'},
      caliente:{de:'heiß',en:'hot'}, frío:{de:'kalt',en:'cold'}, limpio:{de:'sauber',en:'clean'}, sucio:{de:'schmutzig',en:'dirty'},
      bonito:{de:'hübsch',en:'pretty'}, guapo:{de:'gutaussehend',en:'handsome'}, triste:{de:'traurig',en:'sad'}, importante:{de:'wichtig',en:'important'},
      mismo:{de:'gleich',en:'same'}, propio:{de:'eigen',en:'own'}, lleno:{de:'voll',en:'full'}, vacío:{de:'leer',en:'empty'},
      listo:{de:'fertig',en:'ready'}, seguro:{de:'sicher',en:'sure'}, posible:{de:'möglich',en:'possible'},
      qué:{de:'was',en:'what'}, quién:{de:'wer',en:'who'}, dónde:{de:'wo',en:'where'}, cuándo:{de:'wann',en:'when'}, cómo:{de:'wie',en:'how'}, cuánto:{de:'wie viel',en:'how much'},
      hoy:{de:'heute',en:'today'}, ayer:{de:'gestern',en:'yesterday'}, ahora:{de:'jetzt',en:'now'}, luego:{de:'später',en:'later'},
      siempre:{de:'immer',en:'always'}, nunca:{de:'nie',en:'never'}, temprano:{de:'früh',en:'early'},
      mal:{de:'schlecht',en:'badly'}, mejor:{de:'besser',en:'better'}, peor:{de:'schlechter',en:'worse'}, casi:{de:'fast',en:'almost'},
      solo:{de:'nur',en:'only'}, juntos:{de:'zusammen',en:'together'}, cerca:{de:'nah',en:'near'}, lejos:{de:'weit',en:'far'},
      dentro:{de:'drinnen',en:'inside'}, fuera:{de:'draußen',en:'outside'}, arriba:{de:'oben',en:'up'}, abajo:{de:'unten',en:'down'}, allí:{de:'dort',en:'there'},
      cuatro:{de:'vier',en:'four'}, cinco:{de:'fünf',en:'five'}, seis:{de:'sechs',en:'six'}, siete:{de:'sieben',en:'seven'}, ocho:{de:'acht',en:'eight'},
      nueve:{de:'neun',en:'nine'}, diez:{de:'zehn',en:'ten'}, cien:{de:'hundert',en:'hundred'}, mil:{de:'tausend',en:'thousand'}, primero:{de:'erste',en:'first'}, último:{de:'letzte',en:'last'},
      rojo:{de:'rot',en:'red'}, azul:{de:'blau',en:'blue'}, verde:{de:'grün',en:'green'}, amarillo:{de:'gelb',en:'yellow'}, negro:{de:'schwarz',en:'black'}, blanco:{de:'weiß',en:'white'},
      // ── aus dem Learnroman (häufige Formen & Wörter) ──
      es:{de:'ist',en:'is'}, era:{de:'war',en:'was'}, había:{de:'es gab',en:'there was'}, soy:{de:'ich bin',en:'I am'}, estoy:{de:'ich bin',en:'I am'}, eres:{de:'du bist',en:'you are'}, son:{de:'sind',en:'are'},
      tenía:{de:'hatte',en:'had'}, conocía:{de:'kannte',en:'knew'}, entendía:{de:'verstand',en:'understood'}, dijo:{de:'sagte',en:'said'}, miró:{de:'schaute',en:'looked'}, sonrió:{de:'lächelte',en:'smiled'},
      has:{de:'du hast',en:'you have'}, tienes:{de:'du hast',en:'you have'}, sube:{de:'geh hoch',en:'go up'}, pasa:{de:'komm rein',en:'come in'},
      vez:{de:'Mal',en:'time'}, veces:{de:'Mal',en:'times'}, así:{de:'so',en:'like this'}, algo:{de:'etwas',en:'something'}, nada:{de:'nichts',en:'nothing'}, otra:{de:'andere',en:'other'}, entonces:{de:'dann',en:'then'},
      todavía:{de:'noch',en:'still'}, delante:{de:'vorne',en:'in front'}, detrás:{de:'hinten',en:'behind'}, derecha:{de:'rechts',en:'right'}, izquierda:{de:'links',en:'left'},
      bienvenido:{de:'willkommen',en:'welcome'}, bienvenida:{de:'willkommen',en:'welcome'}, favor:{de:'Gefallen',en:'favor'}, verdad:{de:'Wahrheit',en:'truth'}, buenas:{de:'guten',en:'good'}, vale:{de:'okay',en:'okay'},
      hambre:{de:'Hunger',en:'hunger'}, primera:{de:'erste',en:'first'}, mucha:{de:'viel',en:'much'}, vieja:{de:'alt',en:'old'}, roja:{de:'rot',en:'red'}, estrecho:{de:'eng',en:'narrow'}, tal:{de:'solch',en:'such'}, gusto:{de:'Freude',en:'pleasure'},
      ruido:{de:'Lärm',en:'noise'}, marca:{de:'Marke',en:'brand'}, aceite:{de:'Öl',en:'oil'}, cambio:{de:'Wechselgeld',en:'change'}, fin:{de:'Ende',en:'end'}, piso:{de:'Wohnung',en:'flat'}, cena:{de:'Abendessen',en:'dinner'},
      cortado:{de:'Cortado',en:'cortado'}, tomate:{de:'Tomate',en:'tomato'}, bar:{de:'Bar',en:'bar'}, barra:{de:'Theke',en:'counter'}, tortilla:{de:'Tortilla',en:'omelette'}, maleta:{de:'Koffer',en:'suitcase'},
      salón:{de:'Wohnzimmer',en:'living room'}, vaso:{de:'Glas',en:'glass'}, vasos:{de:'Gläser',en:'glasses'}, arquitectura:{de:'Architektur',en:'architecture'}, cebolla:{de:'Zwiebel',en:'onion'}, libros:{de:'Bücher',en:'books'},
      fútbol:{de:'Fußball',en:'football'}, euros:{de:'Euro',en:'euros'}, alemán:{de:'Deutsch',en:'German'}, español:{de:'Spanisch',en:'Spanish'}, alemania:{de:'Deutschland',en:'Germany'}, españa:{de:'Spanien',en:'Spain'}, ah:{de:'ah',en:'ah'}
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
