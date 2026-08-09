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
      hola:{de:'Hallo',en:'hello'}, adiós:{de:'Tschüss',en:'bye'}, gracias:{de:'danke',en:'thanks'}, bien:{de:'gut',en:'well'}
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
