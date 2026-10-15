/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — LERNPFAD-DATEN (GRIECHISCH als Zielsprache)
   Statische Datei. NULL Token. Wird von allen Räumen gelesen.

   Schwesterdatei von lernpfad-daten.js (Spanisch) und lernpfad-daten-de.js
   (Deutsch). Gleiche Struktur, gleiche API, andere Zielsprache. Ein Raum
   lädt genau eine davon, je nach Profil-Feld zielsprache.

   SPRACHNEUTRALE SCHLÜSSEL (Gesetz aus dem Lernroman):
     z  = Zielsprache (hier Neugriechisch, monotonisch)
     tr = lateinische Umschrift (gefuehrt.html zeigt w.tr als Lautschrift)
     na = Muttersprachen als Objekt { de, es, en }
   Kein el in na — wer Griechisch lernt, spricht es nicht als Muttersprache.

   UMSCHRIFT (eine, einfach, konsequent): Akzent auf dem betonten Vokal
   (Einsilber ohne Akzent, außer pós/poú). χ = ch, θ = th, ξ = x, ψ = ps,
   β = v, δ = d, γ = g (vor e/i: y), γγ = ng, ου = ou, αι = e,
   ει/οι/υ/η/ι = i, αυ/ευ = av/ev bzw. af/ef, μπ = b (innen auch mb/mp),
   ντ = d (innen nd), γκ = g. Jede Vokabel trägt tr; in A1 auch jede
   Dialogzeile, Eröffnung und Abrundung (zusätzliches Feld, von allen
   Konsumenten per Eigenschaftszugriff gelesen — harmlos). A2-Dialoge
   ohne tr: das Alphabet sitzt dann.

   LOKALISIERT, NICHT ÜBERSETZT (Leo, 15.10.2026): Das griechische Café fragt
   „σκέτο, μέτριο ή γλυκό;" und „για εδώ ή πακέτο;", das Wasser kommt umsonst.
   Enthalten sind Dinge, die die anderen Fassungen nicht kennen: der Frappé,
   die λαϊκή, das περίπτερο, κερασμένο, „για τη μέση", das ΚΤΕΛ, der ΑΜΚΑ,
   der θερμοσίφωνας, das μελτέμι, „Περαστικά", „μου λείπει".

   ERÖFFNUNG und ABRUNDUNG wie in den Schwesterdateien.

   Stand: 15.10.2026 — A1 und A2 vollständig (20 Stationen).
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  var THEMEN = [
    { id:'cafe',            em:'☕',  na:{ de:'Im Café',             es:'En la cafetería',     en:'At the café',        el:'Στο καφέ' } },
    { id:'restaurant',      em:'🍽️', na:{ de:'In der Taverne',      es:'En la taberna',       en:'At the taverna',     el:'Στην ταβέρνα' } },
    { id:'einkaufen',       em:'🛒', na:{ de:'Einkaufen',           es:'De compras',          en:'Shopping',           el:'Ψώνια' } },
    { id:'wegbeschreibung', em:'🧭', na:{ de:'Nach dem Weg fragen', es:'Preguntar el camino', en:'Asking directions',  el:'Ρωτώντας τον δρόμο' } },
    { id:'taxi',            em:'🚕', na:{ de:'Im Taxi',             es:'En el taxi',          en:'In the taxi',        el:'Στο ταξί' } },
    { id:'familie',         em:'👪', na:{ de:'Über die Familie',    es:'Sobre la familia',    en:'About family',       el:'Για την οικογένεια' } },
    { id:'hotel',           em:'🏨', na:{ de:'Im Hotel',            es:'En el hotel',         en:'At the hotel',       el:'Στο ξενοδοχείο' } },
    { id:'bahnhof',         em:'🚉', na:{ de:'Am Bahnhof',          es:'En la estación',      en:'At the station',     el:'Στον σταθμό' } },
    { id:'arzt',            em:'🩺', na:{ de:'Beim Arzt',           es:'En el médico',        en:'At the doctor',      el:'Στον γιατρό' } },
    { id:'wetter',          em:'🌤️', na:{ de:'Über das Wetter',     es:'Sobre el tiempo',     en:'About the weather',  el:'Για τον καιρό' } }
  ];

  var STUFEN = ['a1', 'a2'];

  var KATEGORIEN = [
    { id:'essen',     em:'🍽️', na:{ de:'Essen & Trinken', es:'Comer y beber', en:'Food & Drink',   el:'Φαγητό και ποτό' },
      themen:['cafe','restaurant'] },
    { id:'unterwegs', em:'🧳', na:{ de:'Unterwegs',       es:'De camino',     en:'Getting around', el:'Στον δρόμο' },
      themen:['wegbeschreibung','taxi','bahnhof','hotel'] },
    { id:'alltag',    em:'🛒', na:{ de:'Alltag',          es:'Vida diaria',   en:'Everyday life',  el:'Καθημερινή ζωή' },
      themen:['einkaufen','wetter'] },
    { id:'menschen',  em:'👥', na:{ de:'Menschen',        es:'Personas',      en:'People',         el:'Άνθρωποι' },
      themen:['familie','arzt'] }
  ];

  var SCHRITT = {
    cafe:            { a1:{ de:'bestellen, zahlen', es:'pedir, pagar', en:'ordering, paying', el:'παραγγελία, πληρωμή' },
                       a2:{ de:'reklamieren, nach Zutaten fragen', es:'reclamar, preguntar por ingredientes', en:'complaining, asking about ingredients', el:'παράπονα, ερωτήσεις για τα υλικά' } },
    restaurant:      { a1:{ de:'ein Tisch, die Empfehlung', es:'una mesa, la recomendación', en:'a table, a recommendation', el:'ένα τραπέζι, μια πρόταση' },
                       a2:{ de:'Spezialität, teilen, mit Karte zahlen', es:'especialidad, compartir, pagar con tarjeta', en:'speciality, sharing, paying by card', el:'σπεσιαλιτέ, για τη μέση, πληρωμή με κάρτα' } },
    einkaufen:       { a1:{ de:'kaufen, zahlen', es:'comprar, pagar', en:'buying, paying', el:'αγορά, πληρωμή' },
                       a2:{ de:'umtauschen, anprobieren', es:'cambiar, probarse', en:'exchanging, trying on', el:'αλλαγή, δοκιμή' } },
    wegbeschreibung: { a1:{ de:'nach dem Weg fragen', es:'preguntar el camino', en:'asking the way', el:'ρωτώντας τον δρόμο' },
                       a2:{ de:'längeren Wegbeschreibungen folgen', es:'seguir indicaciones largas', en:'following longer directions', el:'ακολουθώντας μεγαλύτερες οδηγίες' } },
    taxi:            { a1:{ de:'Ziel, Gepäck', es:'destino, equipaje', en:'destination, luggage', el:'προορισμός, αποσκευές' },
                       a2:{ de:'Eile, Strecke, Quittung', es:'prisa, ruta, recibo', en:'hurry, route, receipt', el:'βιασύνη, διαδρομή, απόδειξη' } },
    familie:         { a1:{ de:'Geschwister, Namen, Alter', es:'hermanos, nombres, edad', en:'siblings, names, age', el:'αδέρφια, ονόματα, ηλικία' },
                       a2:{ de:'von früher erzählen', es:'contar el pasado', en:'talking about the past', el:'μιλώντας για το παρελθόν' } },
    hotel:           { a1:{ de:'Reservierung, Frühstück, Stock', es:'reserva, desayuno, planta', en:'booking, breakfast, floor', el:'κράτηση, πρωινό, όροφος' },
                       a2:{ de:'reklamieren, Zimmer wechseln', es:'reclamar, cambiar de habitación', en:'complaining, changing rooms', el:'παράπονα, αλλαγή δωματίου' } },
    bahnhof:         { a1:{ de:'Fahrkarte, Uhrzeit, Bahnsteig', es:'billete, hora, andén', en:'ticket, time, platform', el:'εισιτήριο, ώρα, αποβάθρα' },
                       a2:{ de:'Verspätung, Anschluss', es:'retraso, transbordo', en:'delay, connection', el:'καθυστέρηση, ανταπόκριση' } },
    arzt:            { a1:{ de:'Schmerzen, seit wann', es:'dolor, desde cuándo', en:'pain, since when', el:'πόνος, από πότε' },
                       a2:{ de:'was passiert ist, Allergien, Termin', es:'qué pasó, alergias, cita', en:'what happened, allergies, appointment', el:'τι συνέβη, αλλεργίες, ραντεβού' } },
    wetter:          { a1:{ de:'heute und morgen', es:'hoy y mañana', en:'today and tomorrow', el:'σήμερα και αύριο' },
                       a2:{ de:'Vorhersage, einen Vorschlag machen', es:'previsión, proponer algo', en:'forecast, making a suggestion', el:'πρόγνωση, μια πρόταση' } }
  };

  var ROLLEN = {
    cafe:            { spikiu:{ de:'der Kellner', es:'el camarero', en:'the waiter', el:'ο σερβιτόρος' },
                       lerner:{ de:'der Gast', es:'el cliente', en:'the customer', el:'ο πελάτης' },
                       ort:   { de:'in einem Café in Athen', es:'en una cafetería de Atenas', en:'at a café in Athens', el:'σε ένα καφέ στην Αθήνα' } },
    restaurant:      { spikiu:{ de:'der Kellner', es:'el camarero', en:'the waiter', el:'ο σερβιτόρος' },
                       lerner:{ de:'der Gast', es:'el cliente', en:'the guest', el:'ο πελάτης' },
                       ort:   { de:'in einer Taverne', es:'en una taberna', en:'in a taverna', el:'σε μια ταβέρνα' } },
    einkaufen:       { spikiu:{ de:'die Marktfrau', es:'la vendedora', en:'the stallholder', el:'η μανάβισσα' },
                       lerner:{ de:'die Kundin', es:'la clienta', en:'the customer', el:'η πελάτισσα' },
                       ort:   { de:'auf dem Wochenmarkt (λαϊκή)', es:'en el mercadillo semanal (λαϊκή)', en:'at the street market (λαϊκή)', el:'στη λαϊκή' } },
    wegbeschreibung: { spikiu:{ de:'eine Passantin', es:'una transeúnte', en:'a passer-by', el:'μια περαστική' },
                       lerner:{ de:'jemand, der etwas sucht', es:'alguien que busca un sitio', en:'someone looking for a place', el:'κάποιος που ψάχνει ένα μέρος' },
                       ort:   { de:'auf der Straße', es:'en la calle', en:'in the street', el:'στον δρόμο' } },
    taxi:            { spikiu:{ de:'der Taxifahrer', es:'el taxista', en:'the driver', el:'ο ταξιτζής' },
                       lerner:{ de:'mit einem Koffer', es:'con una maleta', en:'with a suitcase', el:'με μια βαλίτσα' },
                       ort:   { de:'am Straßenrand, abends', es:'en la acera, de noche', en:'at the kerb, in the evening', el:'στο πεζοδρόμιο, το βράδυ' } },
    familie:         { spikiu:{ de:'eine Nachbarin', es:'una vecina', en:'a neighbour', el:'μια γειτόνισσα' },
                       lerner:{ de:'du selbst', es:'tú mismo', en:'yourself', el:'εσύ ο ίδιος' },
                       ort:   { de:'im Treppenhaus', es:'en la escalera', en:'on the stairs', el:'στη σκάλα της πολυκατοικίας' } },
    hotel:           { spikiu:{ de:'der Rezeptionist', es:'el recepcionista', en:'the receptionist', el:'ο υπάλληλος της ρεσεψιόν' },
                       lerner:{ de:'der Hotelgast', es:'el huésped', en:'the guest', el:'ο πελάτης του ξενοδοχείου' },
                       ort:   { de:'an der Rezeption', es:'en recepción', en:'at reception', el:'στη ρεσεψιόν' } },
    bahnhof:         { spikiu:{ de:'die Schalterbeamtin', es:'la empleada de la ventanilla', en:'the ticket agent', el:'η υπάλληλος στο γκισέ' },
                       lerner:{ de:'der Reisende', es:'el viajero', en:'the traveller', el:'ο ταξιδιώτης' },
                       ort:   { de:'am Schalter', es:'en la ventanilla', en:'at the ticket counter', el:'στο γκισέ' } },
    arzt:            { spikiu:{ de:'der Arzt', es:'el médico', en:'the doctor', el:'ο γιατρός' },
                       lerner:{ de:'der Patient', es:'el paciente', en:'the patient', el:'ο ασθενής' },
                       ort:   { de:'in der Praxis', es:'en la consulta', en:'in the surgery', el:'στο ιατρείο' } },
    wetter:          { spikiu:{ de:'ein Kollege', es:'un compañero de trabajo', en:'a coworker', el:'ένας συνάδελφος' },
                       lerner:{ de:'du selbst', es:'tú mismo', en:'yourself', el:'εσύ ο ίδιος' },
                       ort:   { de:'vor dem Büro', es:'delante de la oficina', en:'outside the office', el:'έξω από το γραφείο' } }
  };

  var AUFGABEN = {
    'a1.arzt': [
      { de:'Sag, dass dir der Kopf wehtut', es:'Di que te duele la cabeza', en:'Say your head hurts' },
      { de:'Sag: seit gestern, und dass du Fieber hast', es:'Di que desde ayer y que tienes fiebre', en:'Say since yesterday, and that you have a fever' },
      { de:'Bedanke dich beim Arzt', es:'Da las gracias al médico', en:'Thank the doctor' }
    ],
    'a1.bahnhof': [
      { de:'Kaufe eine Fahrkarte nach Thessaloniki', es:'Compra un billete para Salónica', en:'Buy a ticket to Thessaloniki' },
      { de:'Sag: hin und zurück, und frag, wann der Zug fährt', es:'Di que ida y vuelta y pregunta a qué hora sale el tren', en:'Say return, and ask when the train leaves' },
      { de:'Frag, von welchem Bahnsteig er fährt', es:'Pregunta de qué andén sale', en:'Ask which platform it leaves from' }
    ],
    'a1.cafe': [
      { de:'Bestelle einen Frappé', es:'Pide un frappé', en:'Order a frappé' },
      { de:'Sag: mittelsüß, mit Milch', es:'Di que lo quieres a medio endulzar, con leche', en:'Say medium sweet, with milk' },
      { de:'Sag, dass du ihn hier trinkst, und frag, was er kostet', es:'Di que es para tomar aquí y pregunta cuánto es', en:'Say it is for here and ask what it costs' }
    ],
    'a1.einkaufen': [
      { de:'Melde dich und bestelle ein Kilo Äpfel', es:'Di que eres tú y pide un kilo de manzanas', en:'Say it is you and ask for a kilo of apples' },
      { de:'Bestelle ein halbes Kilo Tomaten und frag, was es kostet', es:'Pide medio kilo de tomates y pregunta cuánto es', en:'Ask for half a kilo of tomatoes and what it costs' },
      { de:'Nimm die Tüte und gib ihr zehn Euro', es:'Acepta la bolsa y dale diez euros', en:'Take the bag and hand over ten euros' }
    ],
    'a1.familie': [
      { de:'Bejahe und sag, dass du eine Schwester hast', es:'Di que sí, que tienes una hermana', en:'Say yes, you have a sister' },
      { de:'Sag, dass sie Klara heißt', es:'Di que se llama Klara', en:'Say her name is Klara' },
      { de:'Sag, dass sie zwölf ist', es:'Di que tiene doce años', en:'Say she is twelve' }
    ],
    'a1.hotel': [
      { de:'Bejahe und nenne deinen Namen: Weber', es:'Di que sí, a nombre de Weber', en:'Say yes, under the name Weber' },
      { de:'Bestätige und frag, ob das Frühstück dabei ist', es:'Confirma y pregunta si el desayuno está incluido', en:'Confirm and ask whether breakfast is included' },
      { de:'Bedanke dich und frag, in welchem Stock das Zimmer ist', es:'Da las gracias y pregunta en qué planta está la habitación', en:'Say thanks and ask which floor the room is on' }
    ],
    'a1.restaurant': [
      { de:'Verneine und sag, dass ihr zu zweit seid', es:'Di que no y que sois dos', en:'Say no, and that there are two of you' },
      { de:'Frag, was er euch empfiehlt', es:'Pregunta qué os recomienda', en:'Ask what he recommends' },
      { de:'Bestelle ein Moussaka', es:'Pide una musaka', en:'Order the moussaka' }
    ],
    'a1.taxi': [
      { de:'Frag, ob das Taxi frei ist', es:'Pregunta si el taxi está libre', en:'Ask whether the taxi is free' },
      { de:'Sag, dass du zum Flughafen willst', es:'Di que vas al aeropuerto', en:'Say you are going to the airport' },
      { de:'Bejahe und sag, dass du einen Koffer hast', es:'Di que sí, que llevas una maleta', en:'Say yes, you have one suitcase' }
    ],
    'a1.wegbeschreibung': [
      { de:'Frag, wo der Hauptplatz ist', es:'Pregunta dónde está la plaza principal', en:'Ask where the main square is' },
      { de:'Frag, ob es weit ist', es:'Pregunta si está lejos', en:'Ask whether it is far' },
      { de:'Bedanke dich', es:'Da las gracias', en:'Say thank you' }
    ],
    'a1.wetter': [
      { de:'Stimme zu und sag, dass die Sonne scheint und es warm ist', es:'Dale la razón y di que hace sol y calor', en:'Agree and say the sun is out and it is warm' },
      { de:'Sag, dass es morgen regnet, glaubst du', es:'Di que mañana lloverá, crees', en:'Say you think it will rain tomorrow' },
      { de:'Sag, dass das eine gute Idee ist, und verabschiede dich bis morgen', es:'Di que es buena idea y despídete hasta mañana', en:'Say that is a good idea and say see you tomorrow' }
    ],
    'a2.arzt': [
      { de:'Erzähle, dass du letzte Woche gestürzt bist und die Schulter schlimmer geworden ist', es:'Cuenta que te caíste la semana pasada y que el hombro ha empeorado', en:'Say you fell last week and your shoulder has got worse' },
      { de:'Sag, dass du nur Schmerztabletten nimmst und gegen Penizillin allergisch bist', es:'Di que solo tomas analgésicos y que eres alérgico a la penicilina', en:'Say you only take painkillers and that you are allergic to penicillin' },
      { de:'Stimme zu und frag, ob du noch einen Termin brauchst', es:'Di que de acuerdo y pregunta si necesitas otra cita', en:'Agree and ask whether you need another appointment' }
    ],
    'a2.bahnhof': [
      { de:'Sag, dass dein Zug zwanzig Minuten Verspätung hat', es:'Di que tu tren lleva veinte minutos de retraso', en:'Say your train is twenty minutes late' },
      { de:'Bejahe: in Larisa, um Viertel nach drei', es:'Di que sí: en Larisa, a las tres y cuarto', en:'Say yes: in Larissa, at quarter past three' },
      { de:'Frag, was passiert, wenn du ihn verpasst', es:'Pregunta qué pasa si lo pierdes', en:'Ask what happens if you miss it' }
    ],
    'a2.cafe': [
      { de:'Sag höflich, dass dein Kaffee kalt gekommen ist', es:'Di con cortesía que el café te ha llegado frío', en:'Politely say your coffee came cold' },
      { de:'Bedanke dich und frag, ob der Schokoladenkuchen Nüsse hat', es:'Da las gracias y pregunta si la tarta de chocolate lleva frutos secos', en:'Say thanks and ask whether the chocolate cake has nuts in it' },
      { de:'Sag, dass du allergisch bist, und nimm den Zitronenkuchen', es:'Di que eres alérgico y pide la tarta de limón', en:'Say you are allergic and take the lemon pie' }
    ],
    'a2.einkaufen': [
      { de:'Sag, dass du das Hemd gestern gekauft hast und es dir zu groß ist', es:'Di que compraste esta camisa ayer y que te queda grande', en:'Say you bought this shirt yesterday and it is too big for you' },
      { de:'Bejahe und frag, ob du es umtauschen kannst', es:'Di que sí y pregunta si puedes cambiarla', en:'Say yes and ask whether you can exchange it' },
      { de:'Sag: eine Nummer kleiner, und frag, ob du es anprobieren kannst', es:'Di que una talla menos y pregunta si te la puedes probar', en:'Say one size down and ask whether you can try it on' }
    ],
    'a2.familie': [
      { de:'Sag, dass ihr in einem kleinen Dorf gewohnt habt', es:'Di que vivíais en un pueblo pequeño', en:'Say you lived in a small village' },
      { de:'Bejahe und erzähle, dass ihr jeden Sonntag bei deiner Tante gegessen habt', es:'Di que sí y cuenta que cada domingo comíais en casa de tu tía', en:'Say yes, and that every Sunday you ate at your aunt\'s' },
      { de:'Sag, dass deine Schwester nach Kanada gezogen ist und dass du sie sehr vermisst', es:'Di que tu hermana se mudó a Canadá y que la echas mucho de menos', en:'Say your sister moved to Canada and that you miss her a lot' }
    ],
    'a2.hotel': [
      { de:'Sag, dass die Klimaanlage nicht funktioniert', es:'Di que el aire acondicionado no funciona', en:'Say the air conditioning is not working' },
      { de:'Sag: seit gestern Abend, und dass es kein warmes Wasser gibt', es:'Di que desde anoche y que tampoco hay agua caliente', en:'Say since last night, and that there is no hot water' },
      { de:'Sag, dass du lieber das Zimmer wechseln möchtest', es:'Di que prefieres cambiar de habitación', en:'Say you would rather change rooms' }
    ],
    'a2.restaurant': [
      { de:'Sag, dass ihr noch nicht entschieden habt, und frag nach der Spezialität', es:'Di que todavía no habéis decidido y pregunta por la especialidad', en:'Say you have not decided yet and ask about the speciality' },
      { de:'Frag nach etwas Leichterem und sag, dass ihr es zum Teilen nehmen wollt', es:'Pregunta si hay algo más ligero y di que queréis pedirlo para compartir', en:'Ask for something lighter and say you want it to share' },
      { de:'Nimm die Dorade und frag, ob ihr mit Karte zahlen könnt', es:'Pide la dorada y pregunta si podéis pagar con tarjeta', en:'Take the sea bream and ask whether you can pay by card' }
    ],
    'a2.taxi': [
      { de:'Sag, dass du zum Flughafen willst und es eilig hast', es:'Di que vas al aeropuerto y que tienes prisa', en:'Say you are going to the airport and you are in a hurry' },
      { de:'Frag, ob es durch die Stadt schneller ist', es:'Pregunta si por el centro es más rápido', en:'Ask whether going through town is faster' },
      { de:'Sag: dann diesen Weg, und bitte um eine Quittung', es:'Di que vaya por ahí y pide un recibo', en:'Say take that route, and ask for a receipt' }
    ],
    'a2.wegbeschreibung': [
      { de:'Frag, wie du zum Akropolis-Museum kommst', es:'Pregunta cómo llegar al Museo de la Acrópolis', en:'Ask how to get to the Acropolis Museum' },
      { de:'Frag, wie es danach weitergeht', es:'Pregunta cómo sigues después', en:'Ask what comes after that' },
      { de:'Frag, ob du zu Fuß hingehen kannst', es:'Pregunta si puedes ir a pie', en:'Ask whether you can walk there' }
    ],
    'a2.wetter': [
      { de:'Sag, es kommt aufs Wetter an, und frag, ob er die Vorhersage gesehen hat', es:'Di que depende del tiempo y pregunta si ha visto la previsión', en:'Say it depends on the weather and ask whether he has seen the forecast' },
      { de:'Frag, wie es am Nachmittag wird', es:'Pregunta qué tiempo hará por la tarde', en:'Ask what it will be like in the afternoon' },
      { de:'Schlag vor, nachmittags zu fahren, und sag, dass du sicherheitshalber eine Jacke mitnimmst', es:'Propón ir por la tarde y di que llevas una chaqueta por si acaso', en:'Suggest going in the afternoon and say you will bring a jacket just in case' }
    ]
  };

  var GRAMMATIK_TITEL = { de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' };

  var STATIONEN = {

    'a1.arzt': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Seit gestern tut dir der Kopf weh, und du hast Fieber.', es:'Desde ayer te duele la cabeza y tienes fiebre.', en:'Since yesterday your head has hurt and you\'ve had a fever.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Σας γράφω και μια συνταγή για το φαρμακείο. Περαστικά!', tr:'Sas gráfo ke mia sindayí ya to farmakío. Perastiká!', na:{ de:'Ich schreibe Ihnen noch ein Rezept für die Apotheke. Gute Besserung!', es:'Le hago también una receta para la farmacia. ¡Que se mejore!', en:'I\'ll write you a prescription for the pharmacy too. Get well soon!' } },
      wortschatz: [
        { z:'ο γιατρός', tr:'o yatrós', na:{ de:'der Arzt', es:'el médico', en:'the doctor' } },
        { z:'με πονάει', tr:'me ponái', na:{ de:'es tut mir weh', es:'me duele', en:'it hurts (me)' } },
        { z:'το κεφάλι', tr:'to kefáli', na:{ de:'der Kopf', es:'la cabeza', en:'the head' } },
        { z:'η κοιλιά', tr:'i kiliá', na:{ de:'der Bauch', es:'la barriga', en:'the stomach' } },
        { z:'ο λαιμός', tr:'o lemós', na:{ de:'der Hals', es:'la garganta', en:'the throat' } },
        { z:'ο πυρετός', tr:'o piretós', na:{ de:'das Fieber', es:'la fiebre', en:'the fever' } },
        { z:'ο βήχας', tr:'o víchas', na:{ de:'der Husten', es:'la tos', en:'the cough' } },
        { z:'το χάπι', tr:'to chápi', na:{ de:'die Tablette', es:'la pastilla', en:'the tablet' } },
        { z:'η συνταγή', tr:'i sindayí', na:{ de:'das Rezept', es:'la receta', en:'the prescription' } },
        { z:'το φαρμακείο', tr:'to farmakío', na:{ de:'die Apotheke', es:'la farmacia', en:'the pharmacy' } },
        { z:'ο ΑΜΚΑ', tr:'o ámka', na:{ de:'die Sozialversicherungsnummer (AMKA)', es:'el número de la seguridad social (AMKA)', en:'the social security number (AMKA)' } },
        { z:'Περαστικά!', tr:'Perastiká!', na:{ de:'Gute Besserung!', es:'¡Que te mejores!', en:'Get well soon!' } }
      ],
      dialog: {
        rolle: { de:'der Arzt', es:'el médico', en:'the doctor' },
        zeilen: [
          { wer:'spikiu', z:'Καλημέρα. Τι σας συμβαίνει;', tr:'Kaliméra. Ti sas simvéni?', na:{ de:'Guten Morgen. Was fehlt Ihnen?', es:'Buenos días. ¿Qué le pasa?', en:'Good morning. What seems to be the problem?' } },
          { wer:'lerner', z:'Με πονάει το κεφάλι.', tr:'Me ponái to kefáli.', na:{ de:'Mir tut der Kopf weh.', es:'Me duele la cabeza.', en:'My head hurts.' } },
          { wer:'spikiu', z:'Από πότε;', tr:'Apó póte?', na:{ de:'Seit wann?', es:'¿Desde cuándo?', en:'Since when?' } },
          { wer:'lerner', z:'Από χθες. Και έχω πυρετό.', tr:'Apó chthes. Ke écho piretó.', na:{ de:'Seit gestern. Und ich habe Fieber.', es:'Desde ayer. Y tengo fiebre.', en:'Since yesterday. And I have a fever.' } },
          { wer:'spikiu', z:'Πάρτε ένα παυσίπονο και μείνετε στο κρεβάτι.', tr:'Párte éna pafsípono ke mínete sto kreváti.', na:{ de:'Nehmen Sie eine Schmerztablette und bleiben Sie im Bett.', es:'Tómese un analgésico y quédese en la cama.', en:'Take a painkiller and stay in bed.' } },
          { wer:'lerner', z:'Ευχαριστώ, γιατρέ.', tr:'Efcharistó, yatré.', na:{ de:'Danke, Herr Doktor.', es:'Gracias, doctor.', en:'Thank you, doctor.' } }
        ]
      },
      lesetext: {
        z:'Μια γυναίκα πηγαίνει στον γιατρό. Από χθες την πονάει το κεφάλι και έχει πυρετό. Ο γιατρός ρωτάει τον ΑΜΚΑ της. Της γράφει μια συνταγή για το φαρμακείο και της λέει: «Περαστικά!»',
        na:{ de:'Eine Frau geht zum Arzt. Seit gestern tut ihr der Kopf weh, und sie hat Fieber. Der Arzt fragt nach ihrer Sozialversicherungsnummer. Er schreibt ihr ein Rezept für die Apotheke und sagt: „Gute Besserung!"', es:'Una mujer va al médico. Desde ayer le duele la cabeza y tiene fiebre. El médico le pregunta su número de la seguridad social. Le hace una receta para la farmacia y le dice: «¡Que se mejore!»', en:'A woman goes to the doctor. Since yesterday her head has hurt and she has had a fever. The doctor asks for her social security number. He writes her a prescription for the pharmacy and says: "Get well soon!"' },
        frage:{ de:'Seit wann tut ihr der Kopf weh?', es:'¿Desde cuándo le duele la cabeza?', en:'Since when has her head hurt?' },
        optionen:[
          { na:{ de:'Seit gestern', es:'Desde ayer', en:'Since yesterday' }, richtig:true },
          { na:{ de:'Seit einer Woche', es:'Desde hace una semana', en:'For a week' }, richtig:false },
          { na:{ de:'Seit heute Morgen', es:'Desde esta mañana', en:'Since this morning' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass dir der Bauch wehtut und seit wann. Zwei Sätze.', es:'Di que te duele la barriga y desde cuándo. Dos frases.', en:'Say your stomach hurts and since when. Two sentences.' },
        muster:'Με πονάει η κοιλιά. Από χθες το βράδυ.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Griechisch sagt nicht „ich habe Kopfschmerzen", sondern **με πονάει** το κεφάλι — wörtlich „der Kopf schmerzt mich". Der Kopf ist das Subjekt, du bist nur betroffen. Tut mehreres weh, wird das Verb Mehrzahl: **με πονάνε** τα πόδια.', es:'Aquí el griego piensa como el español: **με πονάει** το κεφάλι = me duele la cabeza. La cabeza manda en la frase. Y en plural, igual que en español: **με πονάνε** τα πόδια = me duelen los pies.', en:'Greek does not say "I have a headache" but **με πονάει** το κεφάλι — literally "the head hurts me". The head is the subject; you are just on the receiving end. If several things hurt, the verb goes plural: **με πονάνε** τα πόδια.' },
        beispiele:[
          { z:'Με πονάει το κεφάλι.', na:{ de:'Mir tut der Kopf weh.', es:'Me duele la cabeza.', en:'My head hurts.' } },
          { z:'Με πονάνε τα πόδια.', na:{ de:'Mir tun die Füße weh.', es:'Me duelen los pies.', en:'My feet hurt.' } }
        ]
      }
    },

    'a1.bahnhof': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du bist am Bahnhof in Athen und willst nach Thessaloniki und wieder zurück.', es:'Estás en la estación de Atenas y quieres ir a Salónica y volver.', en:'You\'re at the station in Athens and want to go to Thessaloniki and back.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Καλημέρα. Ορίστε;', tr:'Kaliméra. Oríste?', na:{ de:'Guten Morgen. Bitte sehr?', es:'Buenos días. ¿Dígame?', en:'Good morning. Yes please?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Από την τρίτη. Εξήντα ευρώ. Καλό ταξίδι!', tr:'Apó tin tríti. Exínda evró. Kaló taxídi!', na:{ de:'Von Bahnsteig drei. Sechzig Euro. Gute Reise!', es:'Del andén tres. Son sesenta euros. ¡Buen viaje!', en:'From platform three. Sixty euros. Have a good trip!' } },
      wortschatz: [
        { z:'ο σταθμός', tr:'o stathmós', na:{ de:'der Bahnhof', es:'la estación', en:'the station' } },
        { z:'το εισιτήριο', tr:'to isitírio', na:{ de:'die Fahrkarte', es:'el billete', en:'the ticket' } },
        { z:'το γκισέ', tr:'to gisé', na:{ de:'der Schalter', es:'la ventanilla', en:'the ticket counter' } },
        { z:'απλό', tr:'apló', na:{ de:'einfach (nur hin)', es:'solo ida', en:'one way' } },
        { z:'με επιστροφή', tr:'me epistrofí', na:{ de:'hin und zurück', es:'ida y vuelta', en:'return' } },
        { z:'το τρένο', tr:'to tréno', na:{ de:'der Zug', es:'el tren', en:'the train' } },
        { z:'η αποβάθρα', tr:'i apováthra', na:{ de:'der Bahnsteig', es:'el andén', en:'the platform' } },
        { z:'φεύγει', tr:'févyi', na:{ de:'fährt ab', es:'sale', en:'leaves' } },
        { z:'φτάνει', tr:'ftáni', na:{ de:'kommt an', es:'llega', en:'arrives' } },
        { z:'το δρομολόγιο', tr:'to dromolóyio', na:{ de:'die Verbindung (Fahrplan)', es:'el horario (el trayecto)', en:'the timetable (the route)' } },
        { z:'η καθυστέρηση', tr:'i kathistérisi', na:{ de:'die Verspätung', es:'el retraso', en:'the delay' } },
        { z:'το ΚΤΕΛ', tr:'to ktel', na:{ de:'der Überlandbus (KTEL)', es:'el autobús interurbano (KTEL)', en:'the intercity bus (KTEL)' } }
      ],
      dialog: {
        rolle: { de:'die Schalterbeamtin', es:'la empleada de la ventanilla', en:'the ticket agent' },
        zeilen: [
          { wer:'spikiu', z:'Καλημέρα. Ορίστε;', tr:'Kaliméra. Oríste?', na:{ de:'Guten Morgen. Bitte sehr?', es:'Buenos días. ¿Dígame?', en:'Good morning. Yes please?' } },
          { wer:'lerner', z:'Ένα εισιτήριο για Θεσσαλονίκη, παρακαλώ.', tr:'Éna isitírio ya Thesaloníki, parakaló.', na:{ de:'Eine Fahrkarte nach Thessaloniki, bitte.', es:'Un billete para Salónica, por favor.', en:'A ticket to Thessaloniki, please.' } },
          { wer:'spikiu', z:'Απλό ή με επιστροφή;', tr:'Apló i me epistrofí?', na:{ de:'Einfach oder hin und zurück?', es:'¿Solo ida o ida y vuelta?', en:'One way or return?' } },
          { wer:'lerner', z:'Με επιστροφή. Τι ώρα φεύγει το τρένο;', tr:'Me epistrofí. Ti óra févyi to tréno?', na:{ de:'Hin und zurück. Wann fährt der Zug?', es:'Ida y vuelta. ¿A qué hora sale el tren?', en:'Return. What time does the train leave?' } },
          { wer:'spikiu', z:'Το επόμενο φεύγει στις εννιά και δέκα.', tr:'To epómeno févyi stis eniá ke déka.', na:{ de:'Der nächste fährt um zehn nach neun.', es:'El próximo sale a las nueve y diez.', en:'The next one leaves at ten past nine.' } },
          { wer:'lerner', z:'Από ποια αποβάθρα;', tr:'Apó pia apováthra?', na:{ de:'Von welchem Bahnsteig?', es:'¿De qué andén?', en:'From which platform?' } }
        ]
      },
      lesetext: {
        z:'Η Σοφία είναι στον σταθμό Λαρίσης στην Αθήνα. Αγοράζει ένα εισιτήριο για Θεσσαλονίκη, με επιστροφή. Κάνει εξήντα ευρώ. Το τρένο φεύγει στις εννιά και δέκα από την τρίτη αποβάθρα.',
        na:{ de:'Sofia ist am Bahnhof Larissis in Athen. Sie kauft eine Fahrkarte nach Thessaloniki, hin und zurück. Sie kostet sechzig Euro. Der Zug fährt um zehn nach neun von Bahnsteig drei.', es:'Sofía está en la estación Larisis de Atenas. Compra un billete para Salónica, ida y vuelta. Cuesta sesenta euros. El tren sale a las nueve y diez del andén tres.', en:'Sofia is at Larissis station in Athens. She buys a return ticket to Thessaloniki. It costs sixty euros. The train leaves at ten past nine from platform three.' },
        frage:{ de:'Wann fährt der Zug?', es:'¿A qué hora sale el tren?', en:'What time does the train leave?' },
        optionen:[
          { na:{ de:'Um zehn nach neun', es:'A las nueve y diez', en:'At ten past nine' }, richtig:true },
          { na:{ de:'Um zehn Uhr', es:'A las diez', en:'At ten o\'clock' }, richtig:false },
          { na:{ de:'Um drei Uhr', es:'A las tres', en:'At three o\'clock' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Kaufe eine einfache Fahrkarte nach Larisa und frag nach dem Bahnsteig. Zwei Sätze.', es:'Compra un billete de solo ida a Larisa y pregunta por el andén. Dos frases.', en:'Buy a one-way ticket to Larissa and ask about the platform. Two sentences.' },
        muster:'Ένα απλό εισιτήριο για Λάρισα, παρακαλώ. Από ποια αποβάθρα φεύγει;'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'„Wann?" heißt bei Zügen meist **τι ώρα;** — „welche Stunde?". Die Antwort kommt mit **στις**: **στις** εννιά, **στις** δέκα και μισή. Einzige Ausnahme: ein Uhr → **στη** μία. Mehr braucht man am Schalter nicht.', es:'Para horarios el griego pregunta **τι ώρα;** — «¿qué hora?», igual que el español «¿a qué hora?». La respuesta va con **στις**: **στις** εννιά (a las nueve), **στις** δέκα και μισή (a las diez y media). Solo la una cambia: **στη** μία.', en:'For trains, "when?" is usually **τι ώρα;** — "what hour?". The answer comes with **στις**: **στις** εννιά (at nine), **στις** δέκα και μισή (at half past ten). The only exception: one o\'clock → **στη** μία.' },
        beispiele:[
          { z:'Τι ώρα φεύγει το τρένο;', na:{ de:'Wann fährt der Zug?', es:'¿A qué hora sale el tren?', en:'What time does the train leave?' } },
          { z:'Στις εννιά και δέκα.', na:{ de:'Um zehn nach neun.', es:'A las nueve y diez.', en:'At ten past nine.' } }
        ]
      }
    },

    'a1.cafe': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du bist Gast in einem Café in Athen. Du möchtest einen Frappé, mittelsüß mit Milch, zum Hiertrinken.', es:'Estás en una cafetería de Atenas. Quieres un frappé a medio endulzar con leche, para tomar allí.', en:'You\'re at a café in Athens. You want a frappé, medium sweet with milk, for here.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Δυόμισι ευρώ. Και το νεράκι σας — καλή σας μέρα!', tr:'Diómisi evró. Ke to neráki sas — kalí sas méra!', na:{ de:'Zweieinhalb Euro. Und Ihr Wasser dazu — einen schönen Tag!', es:'Dos euros cincuenta. Y aquí tiene su agüita. ¡Que tenga un buen día!', en:'Two fifty. And your glass of water — have a nice day!' } },
      wortschatz: [
        { z:'ο καφές', tr:'o kafés', na:{ de:'der Kaffee', es:'el café', en:'the coffee' } },
        { z:'ο φραπές', tr:'o frapés', na:{ de:'der Frappé (aufgeschäumter Eiskaffee)', es:'el frappé (café frío batido)', en:'the frappé (iced whipped coffee)' } },
        { z:'ο ελληνικός καφές', tr:'o elinikós kafés', na:{ de:'der griechische Mokka', es:'el café griego', en:'Greek coffee' } },
        { z:'σκέτο', tr:'skéto', na:{ de:'ohne Zucker', es:'sin azúcar', en:'without sugar' } },
        { z:'μέτριο', tr:'métrio', na:{ de:'mittelsüß', es:'a medio endulzar', en:'medium sweet' } },
        { z:'γλυκό', tr:'glikó', na:{ de:'süß', es:'dulce', en:'sweet' } },
        { z:'το γάλα', tr:'to gála', na:{ de:'die Milch', es:'la leche', en:'the milk' } },
        { z:'το νερό', tr:'to neró', na:{ de:'das Wasser', es:'el agua', en:'the water' } },
        { z:'για εδώ', tr:'ya edó', na:{ de:'zum Hiertrinken', es:'para tomar aquí', en:'for here' } },
        { z:'πακέτο', tr:'pakéto', na:{ de:'zum Mitnehmen', es:'para llevar', en:'to go' } },
        { z:'παρακαλώ', tr:'parakaló', na:{ de:'bitte', es:'por favor', en:'please' } },
        { z:'ευχαριστώ', tr:'efcharistó', na:{ de:'danke', es:'gracias', en:'thank you' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero', en:'the waiter' },
        zeilen: [
          { wer:'spikiu', z:'Καλημέρα! Τι θα πάρετε;', tr:'Kaliméra! Ti tha párete?', na:{ de:'Guten Morgen! Was darf\'s sein?', es:'¡Buenos días! ¿Qué va a tomar?', en:'Good morning! What can I get you?' } },
          { wer:'lerner', z:'Έναν φραπέ, παρακαλώ.', tr:'Énan frapé, parakaló.', na:{ de:'Einen Frappé, bitte.', es:'Un frappé, por favor.', en:'A frappé, please.' } },
          { wer:'spikiu', z:'Σκέτο, μέτριο ή γλυκό;', tr:'Skéto, métrio i glikó?', na:{ de:'Ohne Zucker, mittelsüß oder süß?', es:'¿Sin azúcar, a medio endulzar o dulce?', en:'No sugar, medium or sweet?' } },
          { wer:'lerner', z:'Μέτριο, με γάλα.', tr:'Métrio, me gála.', na:{ de:'Mittelsüß, mit Milch.', es:'A medio endulzar, con leche.', en:'Medium, with milk.' } },
          { wer:'spikiu', z:'Για εδώ ή πακέτο;', tr:'Ya edó i pakéto?', na:{ de:'Zum Hiertrinken oder zum Mitnehmen?', es:'¿Para tomar aquí o para llevar?', en:'For here or to go?' } },
          { wer:'lerner', z:'Για εδώ. Πόσο κάνει;', tr:'Ya edó. Póso káni?', na:{ de:'Zum Hiertrinken. Was kostet das?', es:'Para aquí. ¿Cuánto es?', en:'For here. How much is it?' } }
        ]
      },
      lesetext: {
        z:'Η Μάρτα κάθεται σε ένα καφέ στην Αθήνα. Παραγγέλνει έναν φραπέ μέτριο με γάλα, για εδώ. Ο σερβιτόρος φέρνει τον καφέ και ένα ποτήρι νερό. Το νερό δεν το πληρώνει. Ο φραπές κάνει δυόμισι ευρώ.',
        na:{ de:'Marta sitzt in einem Café in Athen. Sie bestellt einen Frappé, mittelsüß mit Milch, zum Hiertrinken. Der Kellner bringt den Kaffee und ein Glas Wasser. Das Wasser bezahlt sie nicht. Der Frappé kostet zweieinhalb Euro.', es:'Marta está sentada en una cafetería de Atenas. Pide un frappé a medio endulzar con leche, para tomar allí. El camarero trae el café y un vaso de agua. El agua no la paga. El frappé cuesta dos euros cincuenta.', en:'Marta is sitting in a café in Athens. She orders a frappé, medium sweet with milk, for here. The waiter brings the coffee and a glass of water. She doesn\'t pay for the water. The frappé costs two fifty.' },
        frage:{ de:'Was zahlt Marta für das Wasser?', es:'¿Cuánto paga Marta por el agua?', en:'How much does Marta pay for the water?' },
        optionen:[
          { na:{ de:'Nichts', es:'Nada', en:'Nothing' }, richtig:true },
          { na:{ de:'Einen Euro', es:'Un euro', en:'One euro' }, richtig:false },
          { na:{ de:'Zweieinhalb Euro', es:'Dos euros cincuenta', en:'Two fifty' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Bestelle einen griechischen Kaffee ohne Zucker und sag, dass du zahlen möchtest. Zwei Sätze.', es:'Pide un café griego sin azúcar y di que quieres pagar. Dos frases.', en:'Order a Greek coffee without sugar and say you want to pay. Two sentences.' },
        muster:'Έναν ελληνικό σκέτο, παρακαλώ. Θέλω να πληρώσω.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Was du bestellst, verliert bei männlichen Wörtern das **-ς**: **ο** καφέ**ς** (der Kaffee) → **έναν** καφέ, παρακαλώ. Das ist der Akkusativ — wie im Deutschen „der Kaffee → einen Kaffee". Merk dir nur dieses eine Bild: Bestellen frisst das -ς.', es:'El griego tiene casos, como el alemán. No hace falta asustarse: al pedir, las palabras masculinas pierden la **-ς** final. **ο** καφέ**ς** (el café) → **έναν** καφέ, παρακαλώ (un café, por favor). Basta con esa imagen: pedir se come la -ς.', en:'Greek has cases, but here is the only one you need today: when you order, masculine words lose their final **-ς**. **ο** καφέ**ς** (the coffee) → **έναν** καφέ, παρακαλώ (a coffee, please). One picture to remember: ordering eats the -ς.' },
        beispiele:[
          { z:'Ο καφές είναι ζεστός.', na:{ de:'Der Kaffee ist heiß.', es:'El café está caliente.', en:'The coffee is hot.' } },
          { z:'Έναν καφέ, παρακαλώ.', na:{ de:'Einen Kaffee, bitte.', es:'Un café, por favor.', en:'A coffee, please.' } }
        ]
      }
    },

    'a1.einkaufen': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Es ist Samstag, du bist auf der λαϊκή (dem Wochenmarkt). Du willst ein Kilo Äpfel und ein halbes Kilo Tomaten und hast einen Zehner dabei.', es:'Es sábado y estás en la λαϊκή (el mercadillo). Quieres un kilo de manzanas y medio de tomates, y llevas un billete de diez.', en:'It\'s Saturday and you\'re at the λαϊκή (the street market). You want a kilo of apples and half a kilo of tomatoes, and you have a ten-euro note.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ορίστε, εφτά ρέστα. Καλή συνέχεια!', tr:'Oríste, eftá résta. Kalí sinéchia!', na:{ de:'Bitte, sieben zurück. Schönen Tag noch!', es:'Tenga, siete de vuelta. ¡Que vaya bien!', en:'Here you go, seven back. Have a good one!' } },
      wortschatz: [
        { z:'η λαϊκή', tr:'i laikí', na:{ de:'der Wochenmarkt', es:'el mercadillo semanal', en:'the street market' } },
        { z:'το κιλό', tr:'to kiló', na:{ de:'das Kilo', es:'el kilo', en:'the kilo' } },
        { z:'μισό κιλό', tr:'misó kiló', na:{ de:'ein halbes Kilo', es:'medio kilo', en:'half a kilo' } },
        { z:'τα μήλα', tr:'ta míla', na:{ de:'die Äpfel', es:'las manzanas', en:'the apples' } },
        { z:'οι ντομάτες', tr:'i domátes', na:{ de:'die Tomaten', es:'los tomates', en:'the tomatoes' } },
        { z:'οι πατάτες', tr:'i patátes', na:{ de:'die Kartoffeln', es:'las patatas', en:'the potatoes' } },
        { z:'το τυρί', tr:'to tirí', na:{ de:'der Käse', es:'el queso', en:'the cheese' } },
        { z:'η φέτα', tr:'i féta', na:{ de:'der Feta', es:'el queso feta', en:'feta' } },
        { z:'η σακούλα', tr:'i sakoúla', na:{ de:'die Tüte', es:'la bolsa', en:'the bag' } },
        { z:'φρέσκος', tr:'fréskos', na:{ de:'frisch', es:'fresco', en:'fresh' } },
        { z:'τα ρέστα', tr:'ta résta', na:{ de:'das Wechselgeld', es:'el cambio (la vuelta)', en:'the change' } },
        { z:'το περίπτερο', tr:'to períptero', na:{ de:'der Kiosk', es:'el quiosco', en:'the kiosk' } }
      ],
      dialog: {
        rolle: { de:'die Marktfrau', es:'la vendedora', en:'the stallholder' },
        zeilen: [
          { wer:'spikiu', z:'Ποιος έχει σειρά;', tr:'Pios échi sirá?', na:{ de:'Wer ist dran?', es:'¿A quién le toca?', en:'Who\'s next?' } },
          { wer:'lerner', z:'Εγώ. Ένα κιλό μήλα, παρακαλώ.', tr:'Egó. Éna kiló míla, parakaló.', na:{ de:'Ich. Ein Kilo Äpfel, bitte.', es:'Yo. Un kilo de manzanas, por favor.', en:'Me. A kilo of apples, please.' } },
          { wer:'spikiu', z:'Ορίστε. Τι άλλο;', tr:'Oríste. Ti álo?', na:{ de:'Bitte schön. Was noch?', es:'Aquí tiene. ¿Qué más?', en:'There you go. What else?' } },
          { wer:'lerner', z:'Μισό κιλό ντομάτες. Πόσο κάνει;', tr:'Misó kiló domátes. Póso káni?', na:{ de:'Ein halbes Kilo Tomaten. Was kostet das?', es:'Medio kilo de tomates. ¿Cuánto es?', en:'Half a kilo of tomatoes. How much is it?' } },
          { wer:'spikiu', z:'Τρία ευρώ όλα. Θέλετε σακούλα;', tr:'Tría evró óla. Thélete sakoúla?', na:{ de:'Drei Euro alles. Möchten Sie eine Tüte?', es:'Tres euros todo. ¿Quiere bolsa?', en:'Three euros altogether. Would you like a bag?' } },
          { wer:'lerner', z:'Ναι, ευχαριστώ. Ορίστε δέκα ευρώ.', tr:'Ne, efcharistó. Oríste déka evró.', na:{ de:'Ja, danke. Hier sind zehn Euro.', es:'Sí, gracias. Tenga, diez euros.', en:'Yes, thanks. Here\'s ten euros.' } }
        ]
      },
      lesetext: {
        z:'Κάθε Σάββατο έχει λαϊκή στη γειτονιά. Η Άννα αγοράζει ένα κιλό μήλα και μισό κιλό ντομάτες. Όλα κάνουν τρία ευρώ. Δίνει δέκα ευρώ και παίρνει εφτά ρέστα. Μετά πάει στο περίπτερο για νερό.',
        na:{ de:'Jeden Samstag ist Markt im Viertel. Anna kauft ein Kilo Äpfel und ein halbes Kilo Tomaten. Alles zusammen kostet drei Euro. Sie gibt zehn Euro und bekommt sieben zurück. Danach geht sie zum Kiosk, um Wasser zu kaufen.', es:'Cada sábado hay mercadillo en el barrio. Ana compra un kilo de manzanas y medio kilo de tomates. Todo cuesta tres euros. Da diez euros y le devuelven siete. Después va al quiosco a por agua.', en:'Every Saturday there\'s a market in the neighbourhood. Anna buys a kilo of apples and half a kilo of tomatoes. It all comes to three euros. She pays with ten euros and gets seven back. Then she goes to the kiosk for some water.' },
        frage:{ de:'Wie viel Wechselgeld bekommt Anna?', es:'¿Cuánto le devuelven a Ana?', en:'How much change does Anna get?' },
        optionen:[
          { na:{ de:'Sieben Euro', es:'Siete euros', en:'Seven euros' }, richtig:true },
          { na:{ de:'Drei Euro', es:'Tres euros', en:'Three euros' }, richtig:false },
          { na:{ de:'Zehn Euro', es:'Diez euros', en:'Ten euros' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Bitte um ein Kilo Kartoffeln und frag, was es kostet. Zwei Sätze.', es:'Pide un kilo de patatas y pregunta cuánto cuesta. Dos frases.', en:'Ask for a kilo of potatoes and ask what it costs. Two sentences.' },
        muster:'Ένα κιλό πατάτες, παρακαλώ. Πόσο κάνει;'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Nach Mengen kommt im Griechischen gar nichts — kein „von", keine Endung: ένα κιλό **μήλα**, μισό κιλό **ντομάτες**. Die Mehrzahl erkennst du am Ende: Neutrum **-ο → -α** (μήλο → μήλα), weiblich **-α → -ες** (ντομάτα → ντομάτες).', es:'Después de una cantidad el griego no pone nada — ni «de» ni artículo: ένα κιλό **μήλα** (un kilo de manzanas), μισό κιλό **ντομάτες** (medio kilo de tomates). El plural se ve al final: neutro **-ο → -α** (μήλο → μήλα), femenino **-α → -ες** (ντομάτα → ντομάτες).', en:'After a quantity Greek adds nothing — no "of": ένα κιλό **μήλα** (a kilo of apples), μισό κιλό **ντομάτες**. You can spot the plural by the ending: neuter **-ο → -α** (μήλο → μήλα), feminine **-α → -ες** (ντομάτα → ντομάτες).' },
        beispiele:[
          { z:'ένα κιλό μήλα', na:{ de:'ein Kilo Äpfel', es:'un kilo de manzanas', en:'a kilo of apples' } },
          { z:'μισό κιλό ντομάτες', na:{ de:'ein halbes Kilo Tomaten', es:'medio kilo de tomates', en:'half a kilo of tomatoes' } }
        ]
      }
    },

    'a1.familie': {
      /* Diese Figur DUZT: eine griechische Nachbarin sagt „εσύ". */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du bist neu im Haus. Du hast eine Schwester, Klara, zwölf Jahre alt.', es:'Eres nuevo en el edificio. Tienes una hermana, Klara, de doce años.', en:'You\'re new in the building. You have a sister, Klara, who is twelve.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Δώδεκα! Σαν την εγγονή μου. Να σου τη γνωρίσω κάποια μέρα!', tr:'Dódeka! San tin engoní mou. Na sou ti gnoríso kápia méra!', na:{ de:'Zwölf! Wie meine Enkelin. Die stelle ich dir mal vor!', es:'¡Doce! Como mi nieta. ¡Un día te la presento!', en:'Twelve! Just like my granddaughter. I must introduce you one day!' } },
      wortschatz: [
        { z:'η οικογένεια', tr:'i ikoyénia', na:{ de:'die Familie', es:'la familia', en:'the family' } },
        { z:'τα αδέρφια', tr:'ta adérfia', na:{ de:'die Geschwister', es:'los hermanos', en:'the siblings' } },
        { z:'ο αδερφός', tr:'o aderfós', na:{ de:'der Bruder', es:'el hermano', en:'the brother' } },
        { z:'η αδερφή', tr:'i aderfí', na:{ de:'die Schwester', es:'la hermana', en:'the sister' } },
        { z:'η μητέρα', tr:'i mitéra', na:{ de:'die Mutter', es:'la madre', en:'the mother' } },
        { z:'ο πατέρας', tr:'o patéras', na:{ de:'der Vater', es:'el padre', en:'the father' } },
        { z:'η γιαγιά', tr:'i yayá', na:{ de:'die Oma', es:'la abuela', en:'the grandma' } },
        { z:'ο παππούς', tr:'o papoús', na:{ de:'der Opa', es:'el abuelo', en:'the grandpa' } },
        { z:'ο νονός', tr:'o nonós', na:{ de:'der Pate', es:'el padrino', en:'the godfather' } },
        { z:'η νονά', tr:'i noná', na:{ de:'die Patin', es:'la madrina', en:'the godmother' } },
        { z:'με λένε', tr:'me léne', na:{ de:'ich heiße', es:'me llamo', en:'my name is' } },
        { z:'χρονών', tr:'chronón', na:{ de:'Jahre alt', es:'años (de edad)', en:'years old' } }
      ],
      dialog: {
        rolle: { de:'die Nachbarin', es:'la vecina', en:'the neighbour' },
        zeilen: [
          { wer:'spikiu', z:'Καλώς ήρθες στην πολυκατοικία! Έχεις αδέρφια;', tr:'Kalós írthes stin polikatikía! Échis adérfia?', na:{ de:'Willkommen im Haus! Hast du Geschwister?', es:'¡Bienvenido al edificio! ¿Tienes hermanos?', en:'Welcome to the building! Do you have any brothers or sisters?' } },
          { wer:'lerner', z:'Ναι, έχω μια αδερφή.', tr:'Ne, écho mia aderfí.', na:{ de:'Ja, ich habe eine Schwester.', es:'Sí, tengo una hermana.', en:'Yes, I have a sister.' } },
          { wer:'spikiu', z:'Α, ωραία! Πώς τη λένε;', tr:'A, oréa! Pós ti léne?', na:{ de:'Ach, schön! Wie heißt sie?', es:'¡Ah, qué bien! ¿Cómo se llama?', en:'Oh, lovely! What\'s her name?' } },
          { wer:'lerner', z:'Τη λένε Κλάρα.', tr:'Ti léne Klára.', na:{ de:'Sie heißt Klara.', es:'Se llama Klara.', en:'Her name is Klara.' } },
          { wer:'spikiu', z:'Ωραίο όνομα. Πόσο χρονών είναι;', tr:'Oréo ónoma. Póso chronón íne?', na:{ de:'Schöner Name. Wie alt ist sie?', es:'Bonito nombre. ¿Cuántos años tiene?', en:'Lovely name. How old is she?' } },
          { wer:'lerner', z:'Είναι δώδεκα χρονών.', tr:'Íne dódeka chronón.', na:{ de:'Sie ist zwölf.', es:'Tiene doce años.', en:'She\'s twelve.' } }
        ]
      },
      lesetext: {
        z:'Η κυρία Ρούλα μένει στον πρώτο όροφο. Ρωτάει τον καινούργιο γείτονα για την οικογένειά του. Εκείνος έχει μια αδερφή, την Κλάρα. Η Κλάρα είναι δώδεκα χρονών, όπως η εγγονή της κυρίας Ρούλας.',
        na:{ de:'Frau Roula wohnt im ersten Stock. Sie fragt den neuen Nachbarn nach seiner Familie. Er hat eine Schwester, Klara. Klara ist zwölf Jahre alt, genau wie Frau Roulas Enkelin.', es:'La señora Rula vive en el primer piso. Le pregunta al vecino nuevo por su familia. Él tiene una hermana, Klara. Klara tiene doce años, como la nieta de la señora Rula.', en:'Mrs Roula lives on the first floor. She asks the new neighbour about his family. He has a sister, Klara. Klara is twelve, just like Mrs Roula\'s granddaughter.' },
        frage:{ de:'Wie alt ist Klara?', es:'¿Cuántos años tiene Klara?', en:'How old is Klara?' },
        optionen:[
          { na:{ de:'Zwölf', es:'Doce', en:'Twelve' }, richtig:true },
          { na:{ de:'Zwanzig', es:'Veinte', en:'Twenty' }, richtig:false },
          { na:{ de:'Zwei', es:'Dos', en:'Two' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du einen Bruder hast und wie er heißt. Zwei Sätze.', es:'Di que tienes un hermano y cómo se llama. Dos frases.', en:'Say you have a brother and what his name is. Two sentences.' },
        muster:'Έχω έναν αδερφό. Τον λένε Φέλιξ.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Achtung, Falle: **ναι** heißt **ja** — auch wenn es wie „nein" klingt. Nein ist **όχι**. Und Namen „hat" man nicht, man wird so genannt: **με λένε** Anna (man nennt mich Anna), **τη λένε** Klara, **τον λένε** Felix.', es:'Ojo: **ναι** significa **sí** — aunque suene a «ne». El no es **όχι**. Y para el nombre el griego dice «me llaman»: **με λένε** Ana, **τη λένε** Klara (la llaman Klara), **τον λένε** Félix.', en:'Watch out: **ναι** means **yes** — even though it sounds like "nay". No is **όχι**. And names work like "they call me": **με λένε** Anna, **τη λένε** Klara (they call her Klara), **τον λένε** Felix.' },
        beispiele:[
          { z:'Ναι, με λένε Άννα.', na:{ de:'Ja, ich heiße Anna.', es:'Sí, me llamo Ana.', en:'Yes, my name is Anna.' } },
          { z:'Τον λένε Φέλιξ.', na:{ de:'Er heißt Felix.', es:'Se llama Félix.', en:'His name is Felix.' } }
        ]
      }
    },

    'a1.hotel': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du hast ein Doppelzimmer für drei Nächte reserviert, auf den Namen Weber.', es:'Has reservado una habitación doble para tres noches a nombre de Weber.', en:'You\'ve booked a double room for three nights under the name Weber.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Στον τρίτο. Το ασανσέρ είναι αριστερά. Καλή διαμονή!', tr:'Ston tríto. To asansér íne aristerá. Kalí diamoní!', na:{ de:'Im dritten. Der Aufzug ist links. Einen schönen Aufenthalt!', es:'En la tercera. El ascensor está a la izquierda. ¡Feliz estancia!', en:'On the third. The lift is on the left. Enjoy your stay!' } },
      wortschatz: [
        { z:'το ξενοδοχείο', tr:'to xenodochío', na:{ de:'das Hotel', es:'el hotel', en:'the hotel' } },
        { z:'η κράτηση', tr:'i krátisi', na:{ de:'die Reservierung', es:'la reserva', en:'the booking' } },
        { z:'το δωμάτιο', tr:'to domátio', na:{ de:'das Zimmer', es:'la habitación', en:'the room' } },
        { z:'μονόκλινο', tr:'monóklino', na:{ de:'Einzelzimmer', es:'habitación individual', en:'single room' } },
        { z:'δίκλινο', tr:'díklino', na:{ de:'Doppelzimmer', es:'habitación doble', en:'double room' } },
        { z:'το κλειδί', tr:'to klidí', na:{ de:'der Schlüssel', es:'la llave', en:'the key' } },
        { z:'το πρωινό', tr:'to proinó', na:{ de:'das Frühstück', es:'el desayuno', en:'breakfast' } },
        { z:'ο όροφος', tr:'o órofos', na:{ de:'der Stock', es:'la planta', en:'the floor' } },
        { z:'το ασανσέρ', tr:'to asansér', na:{ de:'der Aufzug', es:'el ascensor', en:'the lift' } },
        { z:'το μπάνιο', tr:'to bánio', na:{ de:'das Bad', es:'el baño', en:'the bathroom' } },
        { z:'η πετσέτα', tr:'i petséta', na:{ de:'das Handtuch', es:'la toalla', en:'the towel' } },
        { z:'η ρεσεψιόν', tr:'i resepsión', na:{ de:'die Rezeption', es:'la recepción', en:'reception' } }
      ],
      dialog: {
        rolle: { de:'der Rezeptionist', es:'el recepcionista', en:'the receptionist' },
        zeilen: [
          { wer:'spikiu', z:'Καλησπέρα! Έχετε κράτηση;', tr:'Kalispéra! Échete krátisi?', na:{ de:'Guten Abend! Haben Sie reserviert?', es:'¡Buenas tardes! ¿Tiene reserva?', en:'Good evening! Do you have a booking?' } },
          { wer:'lerner', z:'Ναι, στο όνομα Βέμπερ.', tr:'Ne, sto ónoma Véber.', na:{ de:'Ja, auf den Namen Weber.', es:'Sí, a nombre de Weber.', en:'Yes, under the name Weber.' } },
          { wer:'spikiu', z:'Μάλιστα. Ένα δίκλινο για τρεις νύχτες;', tr:'Málista. Éna díklino ya tris níchtes?', na:{ de:'Jawohl. Ein Doppelzimmer für drei Nächte?', es:'Muy bien. ¿Una doble para tres noches?', en:'Certainly. A double room for three nights?' } },
          { wer:'lerner', z:'Ναι, σωστά. Το πρωινό περιλαμβάνεται;', tr:'Ne, sostá. To proinó perilamvánete?', na:{ de:'Ja, genau. Ist das Frühstück inklusive?', es:'Sí, eso es. ¿El desayuno está incluido?', en:'Yes, that\'s right. Is breakfast included?' } },
          { wer:'spikiu', z:'Ναι, από τις εφτά μέχρι τις δέκα. Ορίστε το κλειδί σας.', tr:'Ne, apó tis eftá méchri tis déka. Oríste to klidí sas.', na:{ de:'Ja, von sieben bis zehn. Hier ist Ihr Schlüssel.', es:'Sí, de siete a diez. Aquí tiene su llave.', en:'Yes, from seven to ten. Here\'s your key.' } },
          { wer:'lerner', z:'Ευχαριστώ. Σε ποιον όροφο είναι το δωμάτιο;', tr:'Efcharistó. Se pion órofo íne to domátio?', na:{ de:'Danke. In welchem Stock ist das Zimmer?', es:'Gracias. ¿En qué planta está la habitación?', en:'Thank you. Which floor is the room on?' } }
        ]
      },
      lesetext: {
        z:'Ο κύριος Βέμπερ φτάνει στο ξενοδοχείο. Έχει κράτηση για ένα δίκλινο, τρεις νύχτες. Το πρωινό περιλαμβάνεται, από τις εφτά μέχρι τις δέκα. Το δωμάτιο είναι στον τρίτο όροφο, και το ασανσέρ είναι αριστερά.',
        na:{ de:'Herr Weber kommt im Hotel an. Er hat ein Doppelzimmer für drei Nächte reserviert. Das Frühstück ist inklusive, von sieben bis zehn. Das Zimmer ist im dritten Stock, und der Aufzug ist links.', es:'El señor Weber llega al hotel. Tiene reservada una habitación doble para tres noches. El desayuno está incluido, de siete a diez. La habitación está en la tercera planta y el ascensor está a la izquierda.', en:'Mr Weber arrives at the hotel. He has booked a double room for three nights. Breakfast is included, from seven to ten. The room is on the third floor, and the lift is on the left.' },
        frage:{ de:'In welchem Stock ist das Zimmer?', es:'¿En qué planta está la habitación?', en:'Which floor is the room on?' },
        optionen:[
          { na:{ de:'Im dritten', es:'En la tercera', en:'On the third' }, richtig:true },
          { na:{ de:'Im ersten', es:'En la primera', en:'On the first' }, richtig:false },
          { na:{ de:'Im zehnten', es:'En la décima', en:'On the tenth' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du eine Reservierung hast, und frag, wann es Frühstück gibt. Zwei Sätze.', es:'Di que tienes una reserva y pregunta a qué hora es el desayuno. Dos frases.', en:'Say you have a booking and ask what time breakfast is. Two sentences.' },
        muster:'Έχω κράτηση στο όνομα Βέμπερ. Τι ώρα είναι το πρωινό;'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Das griechische **β** klingt wie **w** — darum wird dein Name „Weber" zu **Β**έμπερ. Für unser **b** schreibt man **μπ**: Βέ**μπ**ερ, **μπ**άνιο. Genauso **ντ** = d (**ντ**ομάτα) und **γκ** = g (**γκ**ισέ). Drei Paare, und fremde Wörter verlieren ihr Geheimnis.', es:'La **β** griega suena como una v inglesa (labios y dientes) — por eso «Weber» se escribe **Β**έμπερ. Para nuestra **b** el griego escribe **μπ**: **μπ**άνιο (baño). Igual **ντ** = d (**ντ**ομάτα, tomate) y **γκ** = g (**γκ**ισέ, ventanilla). Tres parejas y las palabras extranjeras dejan de ser un misterio.', en:'Greek **β** sounds like English **v** — which is why "Weber" becomes **Β**έμπερ. For a real **b** Greek writes **μπ**: **μπ**άνιο (bathroom). Likewise **ντ** = d (**ντ**ομάτα, tomato) and **γκ** = g (**γκ**ισέ, counter). Three pairs, and foreign words stop looking strange.' },
        beispiele:[
          { z:'Στο όνομα Βέμπερ.', na:{ de:'Auf den Namen Weber.', es:'A nombre de Weber.', en:'Under the name Weber.' } },
          { z:'Το μπάνιο είναι εδώ.', na:{ de:'Das Bad ist hier.', es:'El baño está aquí.', en:'The bathroom is here.' } }
        ]
      }
    },

    'a1.restaurant': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Ihr seid zu zweit in einer Taverne, ohne Reservierung. Du willst wissen, was der Kellner empfiehlt, und nimmst dann ein Moussaka.', es:'Sois dos en una taberna, sin reserva. Quieres saber qué recomienda el camarero y luego pides una musaka.', en:'There are two of you in a taverna, with no booking. You want to know what the waiter recommends, then you order the moussaka.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Αμέσως! Και στο τέλος, γλυκό κερασμένο από το μαγαζί.', tr:'Amésos! Ke sto télos, glikó kerasméno apó to magazí.', na:{ de:'Kommt sofort! Und zum Schluss gibt\'s ein Dessert aufs Haus.', es:'¡Enseguida! Y al final, un postre invitación de la casa.', en:'Right away! And at the end, a dessert on the house.' } },
      wortschatz: [
        { z:'η ταβέρνα', tr:'i tavérna', na:{ de:'die Taverne', es:'la taberna', en:'the taverna' } },
        { z:'το τραπέζι', tr:'to trapézi', na:{ de:'der Tisch', es:'la mesa', en:'the table' } },
        { z:'η κράτηση', tr:'i krátisi', na:{ de:'die Reservierung', es:'la reserva', en:'the booking' } },
        { z:'ο κατάλογος', tr:'o katálogos', na:{ de:'die Speisekarte', es:'la carta', en:'the menu' } },
        { z:'οι μεζέδες', tr:'i mezédes', na:{ de:'die Vorspeisen (Meze)', es:'las tapas griegas (mezés)', en:'small plates (meze)' } },
        { z:'ο μουσακάς', tr:'o mousakás', na:{ de:'das Moussaka', es:'la musaka', en:'moussaka' } },
        { z:'η χωριάτικη', tr:'i choriátiki', na:{ de:'der Bauernsalat', es:'la ensalada griega', en:'Greek salad' } },
        { z:'το κρασί', tr:'to krasí', na:{ de:'der Wein', es:'el vino', en:'the wine' } },
        { z:'ο λογαριασμός', tr:'o logariasmós', na:{ de:'die Rechnung', es:'la cuenta', en:'the bill' } },
        { z:'Καλή όρεξη!', tr:'Kalí órexi!', na:{ de:'Guten Appetit!', es:'¡Buen provecho!', en:'Enjoy your meal!' } },
        { z:'κερασμένο', tr:'kerasméno', na:{ de:'aufs Haus', es:'invitación de la casa', en:'on the house' } },
        { z:'Γεια μας!', tr:'Ya mas!', na:{ de:'Prost! (Auf uns!)', es:'¡Salud!', en:'Cheers!' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero', en:'the waiter' },
        zeilen: [
          { wer:'spikiu', z:'Καλησπέρα! Έχετε κράτηση;', tr:'Kalispéra! Échete krátisi?', na:{ de:'Guten Abend! Haben Sie reserviert?', es:'¡Buenas noches! ¿Tienen reserva?', en:'Good evening! Do you have a booking?' } },
          { wer:'lerner', z:'Όχι. Είμαστε δύο.', tr:'Óchi. Ímaste dío.', na:{ de:'Nein. Wir sind zu zweit.', es:'No. Somos dos.', en:'No. There are two of us.' } },
          { wer:'spikiu', z:'Ελάτε, καθίστε εδώ. Ορίστε ο κατάλογος.', tr:'Eláte, kathíste edó. Oríste o katálogos.', na:{ de:'Kommen Sie, setzen Sie sich hierher. Hier ist die Karte.', es:'Pasen, siéntense aquí. Aquí tienen la carta.', en:'Come, sit here. Here\'s the menu.' } },
          { wer:'lerner', z:'Τι μας προτείνετε;', tr:'Ti mas protínete?', na:{ de:'Was empfehlen Sie uns?', es:'¿Qué nos recomienda?', en:'What do you recommend?' } },
          { wer:'spikiu', z:'Σήμερα έχουμε μουσακά και κοκκινιστό. Και μεζέδες, φυσικά.', tr:'Símera échoume mousaká ke kokinistó. Ke mezédes, fisiká.', na:{ de:'Heute haben wir Moussaka und Rindfleisch in Tomatensoße. Und Meze natürlich.', es:'Hoy tenemos musaka y ternera en salsa de tomate. Y mezés, claro.', en:'Today we have moussaka and beef in tomato sauce. And meze, of course.' } },
          { wer:'lerner', z:'Έναν μουσακά, παρακαλώ.', tr:'Énan mousaká, parakaló.', na:{ de:'Ein Moussaka, bitte.', es:'Una musaka, por favor.', en:'A moussaka, please.' } }
        ]
      },
      lesetext: {
        z:'Δύο φίλοι πηγαίνουν σε μια ταβέρνα. Δεν έχουν κράτηση, αλλά υπάρχει τραπέζι. Ο σερβιτόρος προτείνει μουσακά και κοκκινιστό. Παίρνουν μουσακά, μια χωριάτικη και κρασί. Στο τέλος το γλυκό είναι κερασμένο.',
        na:{ de:'Zwei Freunde gehen in eine Taverne. Sie haben nicht reserviert, aber es gibt einen Tisch. Der Kellner empfiehlt Moussaka und Rindfleisch in Tomatensoße. Sie nehmen Moussaka, einen Bauernsalat und Wein. Am Ende ist das Dessert aufs Haus.', es:'Dos amigos van a una taberna. No tienen reserva, pero hay mesa. El camarero recomienda musaka y ternera en salsa de tomate. Piden musaka, una ensalada griega y vino. Al final el postre es invitación de la casa.', en:'Two friends go to a taverna. They haven\'t booked, but there\'s a table. The waiter recommends moussaka and beef in tomato sauce. They have the moussaka, a Greek salad and wine. At the end the dessert is on the house.' },
        frage:{ de:'Was müssen sie nicht bezahlen?', es:'¿Qué no tienen que pagar?', en:'What don\'t they have to pay for?' },
        optionen:[
          { na:{ de:'Das Dessert', es:'El postre', en:'The dessert' }, richtig:true },
          { na:{ de:'Den Wein', es:'El vino', en:'The wine' }, richtig:false },
          { na:{ de:'Den Salat', es:'La ensalada', en:'The salad' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Bitte um einen Tisch für drei und später um die Rechnung. Zwei Sätze.', es:'Pide una mesa para tres y después la cuenta. Dos frases.', en:'Ask for a table for three and later for the bill. Two sentences.' },
        muster:'Ένα τραπέζι για τρεις, παρακαλώ. Τον λογαριασμό, παρακαλώ.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Höflich spricht man Fremde im Griechischen in der **Mehrzahl** an — wie mit dem deutschen „Sie": τι μας προτείν**ετε**; έχ**ετε** κράτηση; Die Endung **-ετε** ist dein Höflichkeitssignal. Zu Freunden sagst du **-εις**: τι μας προτείν**εις**;', es:'Para tratar de usted, el griego habla en **plural**: como si a una sola persona le dijeras «vosotros». τι μας προτείν**ετε**; (¿qué nos recomienda?), έχ**ετε** κράτηση; (¿tiene reserva?). La terminación **-ετε** es tu señal de cortesía. Con amigos: **-εις**: τι μας προτείν**εις**;', en:'To be polite, Greek addresses a stranger in the **plural** — like French "vous". τι μας προτείν**ετε**; (what do you recommend?), έχ**ετε** κράτηση; (do you have a booking?). The ending **-ετε** is your politeness signal. With friends: **-εις**: τι μας προτείν**εις**;' },
        beispiele:[
          { z:'Τι μας προτείνετε;', na:{ de:'Was empfehlen Sie uns?', es:'¿Qué nos recomienda?', en:'What do you recommend? (polite)' } },
          { z:'Τι μας προτείνεις;', na:{ de:'Was empfiehlst du uns?', es:'¿Qué nos recomiendas?', en:'What do you recommend? (to a friend)' } }
        ]
      }
    },

    'a1.taxi': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du hast einen Koffer dabei und willst zum Flughafen.', es:'Llevas una maleta y quieres ir al aeropuerto.', en:'You have one suitcase and you want to go to the airport.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Καλησπέρα σας!', tr:'Kalispéra sas!', na:{ de:'Guten Abend!', es:'¡Buenas noches!', en:'Good evening!' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Φτάσαμε! Τριάντα ευρώ, όπως λέει το ταξίμετρο. Καλό ταξίδι!', tr:'Ftásame! Triánda evró, ópos léi to taxímetro. Kaló taxídi!', na:{ de:'Wir sind da! Dreißig Euro, wie das Taxameter sagt. Gute Reise!', es:'¡Ya hemos llegado! Treinta euros, lo que marca el taxímetro. ¡Buen viaje!', en:'Here we are! Thirty euros, as the meter says. Have a good trip!' } },
      wortschatz: [
        { z:'το ταξί', tr:'to taxí', na:{ de:'das Taxi', es:'el taxi', en:'the taxi' } },
        { z:'ελεύθερος', tr:'eléftheros', na:{ de:'frei', es:'libre', en:'free' } },
        { z:'το αεροδρόμιο', tr:'to aerodrómio', na:{ de:'der Flughafen', es:'el aeropuerto', en:'the airport' } },
        { z:'το κέντρο', tr:'to kéndro', na:{ de:'das Zentrum', es:'el centro', en:'the centre' } },
        { z:'η βαλίτσα', tr:'i valítsa', na:{ de:'der Koffer', es:'la maleta', en:'the suitcase' } },
        { z:'το πορτμπαγκάζ', tr:'to portbagáz', na:{ de:'der Kofferraum', es:'el maletero', en:'the boot' } },
        { z:'το ταξίμετρο', tr:'to taxímetro', na:{ de:'das Taxameter', es:'el taxímetro', en:'the meter' } },
        { z:'η διεύθυνση', tr:'i diéfthinsi', na:{ de:'die Adresse', es:'la dirección', en:'the address' } },
        { z:'σταματήστε εδώ', tr:'stamatíste edó', na:{ de:'halten Sie hier', es:'pare aquí', en:'stop here' } },
        { z:'αργά', tr:'argá', na:{ de:'langsam', es:'despacio', en:'slowly' } },
        { z:'γρήγορα', tr:'grígora', na:{ de:'schnell', es:'rápido', en:'quickly' } },
        { z:'κρατήστε τα ρέστα', tr:'kratíste ta résta', na:{ de:'stimmt so', es:'quédese con el cambio', en:'keep the change' } }
      ],
      dialog: {
        rolle: { de:'der Taxifahrer', es:'el taxista', en:'the driver' },
        zeilen: [
          { wer:'spikiu', z:'Καλησπέρα σας!', tr:'Kalispéra sas!', na:{ de:'Guten Abend!', es:'¡Buenas noches!', en:'Good evening!' } },
          { wer:'lerner', z:'Είστε ελεύθερος;', tr:'Íste eléftheros?', na:{ de:'Sind Sie frei?', es:'¿Está libre?', en:'Are you free?' } },
          { wer:'spikiu', z:'Ναι, περάστε. Πού πάμε;', tr:'Ne, peráste. Poú páme?', na:{ de:'Ja, steigen Sie ein. Wohin geht\'s?', es:'Sí, suba. ¿Adónde vamos?', en:'Yes, hop in. Where are we going?' } },
          { wer:'lerner', z:'Στο αεροδρόμιο, παρακαλώ.', tr:'Sto aerodrómio, parakaló.', na:{ de:'Zum Flughafen, bitte.', es:'Al aeropuerto, por favor.', en:'To the airport, please.' } },
          { wer:'spikiu', z:'Εντάξει. Έχετε βαλίτσα;', tr:'Endáxi. Échete valítsa?', na:{ de:'In Ordnung. Haben Sie einen Koffer?', es:'Vale. ¿Lleva maleta?', en:'OK. Do you have a suitcase?' } },
          { wer:'lerner', z:'Ναι, μία βαλίτσα.', tr:'Ne, mía valítsa.', na:{ de:'Ja, einen Koffer.', es:'Sí, una maleta.', en:'Yes, one suitcase.' } }
        ]
      },
      lesetext: {
        z:'Είναι βράδυ. Ένας άντρας σταματάει ένα ταξί. Ο ταξιτζής ρωτάει: «Πού πάμε;» Ο άντρας πηγαίνει στο αεροδρόμιο με μια βαλίτσα. Στο τέλος πληρώνει τριάντα ευρώ και λέει: «Κρατήστε τα ρέστα.»',
        na:{ de:'Es ist Abend. Ein Mann hält ein Taxi an. Der Fahrer fragt: „Wohin geht\'s?" Der Mann fährt mit einem Koffer zum Flughafen. Am Ende zahlt er dreißig Euro und sagt: „Stimmt so."', es:'Es de noche. Un hombre para un taxi. El taxista pregunta: «¿Adónde vamos?» El hombre va al aeropuerto con una maleta. Al final paga treinta euros y dice: «Quédese con el cambio».', en:'It\'s evening. A man stops a taxi. The driver asks: "Where are we going?" The man goes to the airport with one suitcase. At the end he pays thirty euros and says: "Keep the change."' },
        frage:{ de:'Wohin fährt der Mann?', es:'¿Adónde va el hombre?', en:'Where is the man going?' },
        optionen:[
          { na:{ de:'Zum Flughafen', es:'Al aeropuerto', en:'To the airport' }, richtig:true },
          { na:{ de:'Zum Hafen', es:'Al puerto', en:'To the port' }, richtig:false },
          { na:{ de:'Ins Zentrum', es:'Al centro', en:'To the centre' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, ob das Taxi frei ist, und sag, dass du zum Hafen willst. Zwei Sätze.', es:'Pregunta si el taxi está libre y di que vas al puerto. Dos frases.', en:'Ask if the taxi is free and say you are going to the port. Two sentences.' },
        muster:'Είστε ελεύθερος; Στο λιμάνι, παρακαλώ.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Griechisch hat ein Wort für „zu", „in" und „an": **σε** — und es verschmilzt mit dem Artikel. σε + το = **στο** αεροδρόμιο, σε + τη = **στη** γωνία, σε + τον = **στον** σταθμό. Wohin du auch willst: Es fängt mit **στ-** an.', es:'El griego tiene una sola palabra para «a», «en» y «hacia»: **σε** — y se funde con el artículo, como «a + el = al». σε + το = **στο** αεροδρόμιο (al aeropuerto), σε + τη = **στη** γωνία (en la esquina), σε + τον = **στον** σταθμό (a la estación).', en:'Greek has one word for "to", "in" and "at": **σε** — and it fuses with the article. σε + το = **στο** αεροδρόμιο (to the airport), σε + τη = **στη** γωνία (at the corner), σε + τον = **στον** σταθμό (to the station). Wherever you\'re going, it starts with **στ-**.' },
        beispiele:[
          { z:'Στο αεροδρόμιο, παρακαλώ.', na:{ de:'Zum Flughafen, bitte.', es:'Al aeropuerto, por favor.', en:'To the airport, please.' } },
          { z:'Στον σταθμό, παρακαλώ.', na:{ de:'Zum Bahnhof, bitte.', es:'A la estación, por favor.', en:'To the station, please.' } }
        ]
      }
    },

    'a1.wegbeschreibung': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du bist zum ersten Mal in der Stadt und suchst den Hauptplatz.', es:'Es la primera vez que estás en la ciudad y buscas la plaza principal.', en:'It\'s your first time in town and you\'re looking for the main square.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Ναι; Μπορώ να βοηθήσω;', tr:'Ne? Boró na voithíso?', na:{ de:'Ja? Kann ich helfen?', es:'¿Sí? ¿Puedo ayudarle?', en:'Yes? Can I help?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Τίποτα! Καλή βόλτα!', tr:'Típota! Kalí vólta!', na:{ de:'Gern geschehen! Schönen Spaziergang!', es:'¡De nada! ¡Buen paseo!', en:'You\'re welcome! Enjoy your walk!' } },
      wortschatz: [
        { z:'ευθεία', tr:'efthía', na:{ de:'geradeaus', es:'todo recto', en:'straight on' } },
        { z:'δεξιά', tr:'dexiá', na:{ de:'rechts', es:'a la derecha', en:'right' } },
        { z:'αριστερά', tr:'aristerá', na:{ de:'links', es:'a la izquierda', en:'left' } },
        { z:'στη γωνία', tr:'sti gonía', na:{ de:'an der Ecke', es:'en la esquina', en:'on the corner' } },
        { z:'στο φανάρι', tr:'sto fanári', na:{ de:'an der Ampel', es:'en el semáforo', en:'at the traffic lights' } },
        { z:'απέναντι', tr:'apénandi', na:{ de:'gegenüber', es:'enfrente', en:'opposite' } },
        { z:'κοντά', tr:'kondá', na:{ de:'nah', es:'cerca', en:'near' } },
        { z:'μακριά', tr:'makriá', na:{ de:'weit', es:'lejos', en:'far' } },
        { z:'η πλατεία', tr:'i platía', na:{ de:'der Platz', es:'la plaza', en:'the square' } },
        { z:'ο δρόμος', tr:'o drómos', na:{ de:'die Straße', es:'la calle', en:'the street' } },
        { z:'η εκκλησία', tr:'i eklisía', na:{ de:'die Kirche', es:'la iglesia', en:'the church' } },
        { z:'με τα πόδια', tr:'me ta pódia', na:{ de:'zu Fuß', es:'a pie', en:'on foot' } }
      ],
      dialog: {
        rolle: { de:'die Passantin', es:'la transeúnte', en:'the passer-by' },
        zeilen: [
          { wer:'spikiu', z:'Ναι; Μπορώ να βοηθήσω;', tr:'Ne? Boró na voithíso?', na:{ de:'Ja? Kann ich helfen?', es:'¿Sí? ¿Puedo ayudarle?', en:'Yes? Can I help?' } },
          { wer:'lerner', z:'Συγγνώμη, πού είναι η κεντρική πλατεία;', tr:'Signómi, poú íne i kendrikí platía?', na:{ de:'Entschuldigung, wo ist der Hauptplatz?', es:'Perdone, ¿dónde está la plaza principal?', en:'Excuse me, where is the main square?' } },
          { wer:'spikiu', z:'Πηγαίνετε ευθεία και στο φανάρι στρίψτε δεξιά.', tr:'Piyénete efthía ke sto fanári strípste dexiá.', na:{ de:'Gehen Sie geradeaus und biegen Sie an der Ampel rechts ab.', es:'Siga todo recto y en el semáforo gire a la derecha.', en:'Go straight on and turn right at the traffic lights.' } },
          { wer:'lerner', z:'Είναι μακριά;', tr:'Íne makriá?', na:{ de:'Ist es weit?', es:'¿Está lejos?', en:'Is it far?' } },
          { wer:'spikiu', z:'Όχι, πέντε λεπτά με τα πόδια. Είναι απέναντι από την εκκλησία.', tr:'Óchi, pénde leptá me ta pódia. Íne apénandi apó tin eklisía.', na:{ de:'Nein, fünf Minuten zu Fuß. Er liegt gegenüber der Kirche.', es:'No, a cinco minutos a pie. Está enfrente de la iglesia.', en:'No, five minutes on foot. It\'s opposite the church.' } },
          { wer:'lerner', z:'Ευχαριστώ πολύ!', tr:'Efcharistó polí!', na:{ de:'Vielen Dank!', es:'¡Muchas gracias!', en:'Thank you very much!' } }
        ]
      },
      lesetext: {
        z:'Ένας τουρίστας ψάχνει την κεντρική πλατεία. Ρωτάει μια κυρία στον δρόμο. Πρέπει να πάει ευθεία και στο φανάρι δεξιά. Η πλατεία είναι απέναντι από την εκκλησία, πέντε λεπτά με τα πόδια.',
        na:{ de:'Ein Tourist sucht den Hauptplatz. Er fragt eine Frau auf der Straße. Er muss geradeaus gehen und an der Ampel rechts. Der Platz liegt gegenüber der Kirche, fünf Minuten zu Fuß.', es:'Un turista busca la plaza principal. Le pregunta a una señora en la calle. Tiene que ir todo recto y en el semáforo a la derecha. La plaza está enfrente de la iglesia, a cinco minutos a pie.', en:'A tourist is looking for the main square. He asks a woman in the street. He has to go straight on and turn right at the lights. The square is opposite the church, five minutes on foot.' },
        frage:{ de:'Wo liegt der Platz?', es:'¿Dónde está la plaza?', en:'Where is the square?' },
        optionen:[
          { na:{ de:'Gegenüber der Kirche', es:'Enfrente de la iglesia', en:'Opposite the church' }, richtig:true },
          { na:{ de:'Neben dem Bahnhof', es:'Al lado de la estación', en:'Next to the station' }, richtig:false },
          { na:{ de:'Direkt an der Ampel', es:'Justo en el semáforo', en:'Right at the traffic lights' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, wo die Apotheke ist und ob sie weit ist. Zwei Sätze.', es:'Pregunta dónde está la farmacia y si está lejos. Dos frases.', en:'Ask where the pharmacy is and whether it is far. Two sentences.' },
        muster:'Συγγνώμη, πού είναι το φαρμακείο; Είναι μακριά;'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Das griechische Fragezeichen sieht aus wie unser Semikolon: **;** — «Πού είναι;» Und der kleine Akzentstrich zeigt immer die betonte Silbe: πλα**τεί**α, **δρό**μος. Er kann sogar die Bedeutung ändern: **πού** = wo?, **που** ohne Strich = der/die/das (Relativwort).', es:'El signo de interrogación griego parece nuestro punto y coma: **;** — «Πού είναι;» (¿dónde está?). Y la tilde marca siempre la sílaba tónica, como en español: πλα**τεί**α, **δρό**μος. A veces cambia el sentido, igual que «dónde/donde»: **πού** = ¿dónde?, **που** = que (relativo).', en:'The Greek question mark looks like our semicolon: **;** — «Πού είναι;» (where is it?). And the little accent always marks the stressed syllable: πλα**τεί**α, **δρό**μος. It can even change the meaning: **πού** = where?, **που** without it = who/which/that.' },
        beispiele:[
          { z:'Πού είναι η πλατεία;', na:{ de:'Wo ist der Platz?', es:'¿Dónde está la plaza?', en:'Where is the square?' } },
          { z:'Είναι μακριά;', na:{ de:'Ist es weit?', es:'¿Está lejos?', en:'Is it far?' } }
        ]
      }
    },

    'a1.wetter': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen. */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Heute scheint die Sonne. Morgen soll es regnen.', es:'Hoy hace sol. Mañana dicen que va a llover.', en:'The sun is out today. Tomorrow it\'s supposed to rain.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Τα λέμε αύριο — και να γυρίσεις στεγνός!', tr:'Ta léme ávrio — ke na yirísis stegnós!', na:{ de:'Bis morgen — und komm trocken heim!', es:'Hasta mañana. ¡Y que llegues seco a casa!', en:'See you tomorrow — and get home dry!' } },
      wortschatz: [
        { z:'ο καιρός', tr:'o kerós', na:{ de:'das Wetter', es:'el tiempo', en:'the weather' } },
        { z:'ο ήλιος', tr:'o ílios', na:{ de:'die Sonne', es:'el sol', en:'the sun' } },
        { z:'η βροχή', tr:'i vrochí', na:{ de:'der Regen', es:'la lluvia', en:'the rain' } },
        { z:'βρέχει', tr:'vréchi', na:{ de:'es regnet', es:'llueve', en:'it\'s raining' } },
        { z:'κάνει ζέστη', tr:'káni zésti', na:{ de:'es ist heiß', es:'hace calor', en:'it\'s hot' } },
        { z:'κάνει κρύο', tr:'káni krío', na:{ de:'es ist kalt', es:'hace frío', en:'it\'s cold' } },
        { z:'ο αέρας', tr:'o aéras', na:{ de:'der Wind', es:'el viento', en:'the wind' } },
        { z:'το μελτέμι', tr:'to meltémi', na:{ de:'der Meltemi (Sommerwind der Ägäis)', es:'el meltemi (viento de verano del Egeo)', en:'the meltemi (Aegean summer wind)' } },
        { z:'το σύννεφο', tr:'to sínefo', na:{ de:'die Wolke', es:'la nube', en:'the cloud' } },
        { z:'η ομπρέλα', tr:'i ombréla', na:{ de:'der Regenschirm', es:'el paraguas', en:'the umbrella' } },
        { z:'σήμερα', tr:'símera', na:{ de:'heute', es:'hoy', en:'today' } },
        { z:'αύριο', tr:'ávrio', na:{ de:'morgen', es:'mañana', en:'tomorrow' } }
      ],
      dialog: {
        rolle: { de:'ein Kollege', es:'un compañero de trabajo', en:'a coworker' },
        zeilen: [
          { wer:'spikiu', z:'Τι ωραία μέρα σήμερα!', tr:'Ti oréa méra símera!', na:{ de:'Was für ein schöner Tag heute!', es:'¡Qué día tan bonito hace hoy!', en:'What a lovely day today!' } },
          { wer:'lerner', z:'Ναι, έχει ήλιο και κάνει ζέστη.', tr:'Ne, échi ílio ke káni zésti.', na:{ de:'Ja, die Sonne scheint und es ist warm.', es:'Sí, hace sol y calor.', en:'Yes, the sun is out and it\'s warm.' } },
          { wer:'spikiu', z:'Κι αύριο; Ξέρεις;', tr:'Ki ávrio? Xéris?', na:{ de:'Und morgen? Weißt du das?', es:'¿Y mañana? ¿Lo sabes?', en:'And tomorrow? Do you know?' } },
          { wer:'lerner', z:'Αύριο θα βρέξει, νομίζω.', tr:'Ávrio tha vréxi, nomízo.', na:{ de:'Morgen regnet es, glaube ich.', es:'Mañana lloverá, creo.', en:'It\'ll rain tomorrow, I think.' } },
          { wer:'spikiu', z:'Τότε θα πάρω ομπρέλα.', tr:'Tóte tha páro ombréla.', na:{ de:'Dann nehme ich einen Schirm mit.', es:'Entonces me llevo el paraguas.', en:'Then I\'ll take an umbrella.' } },
          { wer:'lerner', z:'Καλή ιδέα. Τα λέμε αύριο!', tr:'Kalí idéa. Ta léme ávrio!', na:{ de:'Gute Idee. Bis morgen!', es:'Buena idea. ¡Hasta mañana!', en:'Good idea. See you tomorrow!' } }
        ]
      },
      lesetext: {
        z:'Σήμερα έχει ήλιο και κάνει ζέστη. Αύριο όμως θα βρέξει. Γι\' αυτό ένας συνάδελφος θα πάρει ομπρέλα. Το βράδυ γυρίζουν και οι δύο μαζί σπίτι.',
        na:{ de:'Heute scheint die Sonne und es ist warm. Morgen aber wird es regnen. Darum nimmt ein Kollege einen Schirm mit. Am Abend gehen beide zusammen nach Hause.', es:'Hoy hace sol y calor. Pero mañana lloverá. Por eso un compañero se llevará el paraguas. Por la tarde vuelven los dos juntos a casa.', en:'Today the sun is out and it\'s warm. Tomorrow, though, it will rain. So a colleague will take an umbrella. In the evening they both go home together.' },
        frage:{ de:'Wie wird das Wetter morgen?', es:'¿Qué tiempo hará mañana?', en:'What will the weather be like tomorrow?' },
        optionen:[
          { na:{ de:'Es regnet', es:'Lloverá', en:'It will rain' }, richtig:true },
          { na:{ de:'Es schneit', es:'Nevará', en:'It will snow' }, richtig:false },
          { na:{ de:'Es bleibt sonnig', es:'Seguirá haciendo sol', en:'It stays sunny' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, wie das Wetter heute ist und wie es morgen wird. Zwei Sätze.', es:'Di qué tiempo hace hoy y qué tiempo hará mañana. Dos frases.', en:'Say what the weather is like today and what it will be like tomorrow. Two sentences.' },
        muster:'Σήμερα κάνει κρύο. Αύριο θα βρέξει.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Griechisches Wetter funktioniert wie spanisches: **κάνει** ζέστη — „es macht Hitze" (hace calor). Ein „es" braucht man nicht: **βρέχει** = es regnet. Und die Zukunft ist ein einziges Wörtchen davor: **θα** βρέξει — es wird regnen.', es:'El tiempo en griego funciona como en español: **κάνει** ζέστη = hace calor, **κάνει** κρύο = hace frío. **βρέχει** = llueve, sin sujeto. Y el futuro es una palabrita delante: **θα** βρέξει = lloverá.', en:'Greek weather works like Spanish: **κάνει** ζέστη — literally "it makes heat". No "it" needed: **βρέχει** = it\'s raining. And the future is one little word in front: **θα** βρέξει — it will rain.' },
        beispiele:[
          { z:'Κάνει ζέστη.', na:{ de:'Es ist heiß.', es:'Hace calor.', en:'It\'s hot.' } },
          { z:'Αύριο θα βρέξει.', na:{ de:'Morgen wird es regnen.', es:'Mañana lloverá.', en:'It will rain tomorrow.' } }
        ]
      }
    },

    'a2.arzt': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du bist letzte Woche gestürzt. Du nimmst Schmerztabletten und bist gegen Penizillin allergisch.', es:'Te caíste la semana pasada. Tomas analgésicos y eres alérgico a la penicilina.', en:'You fell last week. You take painkillers and you\'re allergic to penicillin.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ναι, ελάτε ξανά την Πέμπτη. Και φέρτε τον ΑΜΚΑ σας. Περαστικά!', tr:'Ne, eláte xaná tin Pémpti. Ke férte ton ámka sas. Perastiká!', na:{ de:'Ja, kommen Sie am Donnerstag wieder. Und bringen Sie Ihre Sozialversicherungsnummer mit. Gute Besserung!', es:'Sí, vuelva el jueves. Y traiga su número de la seguridad social. ¡Que se mejore!', en:'Yes, come back on Thursday. And bring your social security number. Get well soon!' } },
      wortschatz: [
        { z:'έπεσα', tr:'épesa', na:{ de:'ich bin gestürzt', es:'me caí', en:'I fell' } },
        { z:'ο ώμος', tr:'o ómos', na:{ de:'die Schulter', es:'el hombro', en:'the shoulder' } },
        { z:'χειροτερεύω', tr:'chiroterévo', na:{ de:'schlimmer werden', es:'empeorar', en:'to get worse' } },
        { z:'το παυσίπονο', tr:'to pafsípono', na:{ de:'die Schmerztablette', es:'el analgésico', en:'the painkiller' } },
        { z:'αλλεργικός', tr:'aleryikós', na:{ de:'allergisch', es:'alérgico', en:'allergic' } },
        { z:'η πενικιλίνη', tr:'i penikilíni', na:{ de:'das Penizillin', es:'la penicilina', en:'penicillin' } },
        { z:'η ακτινογραφία', tr:'i aktinografía', na:{ de:'das Röntgenbild', es:'la radiografía', en:'the X-ray' } },
        { z:'το ραντεβού', tr:'to randevoú', na:{ de:'der Termin', es:'la cita', en:'the appointment' } },
        { z:'το κέντρο υγείας', tr:'to kéndro iyías', na:{ de:'das Gesundheitszentrum', es:'el centro de salud', en:'the health centre' } },
        { z:'τα επείγοντα', tr:'ta epígonda', na:{ de:'die Notaufnahme', es:'urgencias', en:'A&E (the emergency department)' } },
        { z:'σπασμένος', tr:'spasménos', na:{ de:'gebrochen', es:'roto', en:'broken' } },
        { z:'το παραπεμπτικό', tr:'to parapemptikó', na:{ de:'die Überweisung', es:'el volante', en:'the referral' } }
      ],
      dialog: {
        rolle: { de:'der Arzt', es:'el médico', en:'the doctor' },
        zeilen: [
          { wer:'spikiu', z:'Πείτε μου, τι έγινε;', na:{ de:'Erzählen Sie, was ist passiert?', es:'Cuénteme, ¿qué ha pasado?', en:'Tell me, what happened?' } },
          { wer:'lerner', z:'Έπεσα την περασμένη εβδομάδα και ο ώμος μου χειροτέρεψε.', na:{ de:'Ich bin letzte Woche gestürzt, und meine Schulter ist schlimmer geworden.', es:'Me caí la semana pasada y el hombro ha empeorado.', en:'I fell last week and my shoulder has got worse.' } },
          { wer:'spikiu', z:'Παίρνετε κάποιο φάρμακο;', na:{ de:'Nehmen Sie irgendein Medikament?', es:'¿Toma algún medicamento?', en:'Are you taking any medication?' } },
          { wer:'lerner', z:'Μόνο παυσίπονα. Είμαι αλλεργικός στην πενικιλίνη.', na:{ de:'Nur Schmerztabletten. Ich bin gegen Penizillin allergisch.', es:'Solo analgésicos. Soy alérgico a la penicilina.', en:'Only painkillers. I\'m allergic to penicillin.' } },
          { wer:'spikiu', z:'Εντάξει, το σημειώνω. Πρώτα θα κάνουμε μια ακτινογραφία.', na:{ de:'Gut, das notiere ich. Zuerst machen wir ein Röntgenbild.', es:'Bien, lo apunto. Primero haremos una radiografía.', en:'Fine, I\'ll note that. First we\'ll do an X-ray.' } },
          { wer:'lerner', z:'Εντάξει. Χρειάζομαι κι άλλο ραντεβού;', na:{ de:'In Ordnung. Brauche ich noch einen Termin?', es:'De acuerdo. ¿Necesito otra cita?', en:'All right. Do I need another appointment?' } }
        ]
      },
      lesetext: {
        z:'Μια ασθενής έπεσε την περασμένη εβδομάδα και ο ώμος της χειροτέρεψε. Παίρνει μόνο παυσίπονα και είναι αλλεργική στην πενικιλίνη. Ο γιατρός έκανε πρώτα μια ακτινογραφία. Ευτυχώς δεν ήταν τίποτα σπασμένο. Πρέπει να ξαναέρθει την Πέμπτη.',
        na:{ de:'Eine Patientin ist letzte Woche gestürzt, und ihre Schulter ist schlimmer geworden. Sie nimmt nur Schmerztabletten und ist gegen Penizillin allergisch. Der Arzt hat zuerst ein Röntgenbild gemacht. Zum Glück war nichts gebrochen. Am Donnerstag soll sie wiederkommen.', es:'Una paciente se cayó la semana pasada y el hombro le ha empeorado. Solo toma analgésicos y es alérgica a la penicilina. El médico le hizo primero una radiografía. Por suerte no había nada roto. Tiene que volver el jueves.', en:'A patient fell last week and her shoulder has got worse. She only takes painkillers and is allergic to penicillin. The doctor did an X-ray first. Luckily nothing was broken. She has to come back on Thursday.' },
        frage:{ de:'Wogegen ist die Patientin allergisch?', es:'¿A qué es alérgica la paciente?', en:'What is the patient allergic to?' },
        optionen:[
          { na:{ de:'Gegen Penizillin', es:'A la penicilina', en:'To penicillin' }, richtig:true },
          { na:{ de:'Gegen Schmerztabletten', es:'A los analgésicos', en:'To painkillers' }, richtig:false },
          { na:{ de:'Gegen Nüsse', es:'A los frutos secos', en:'To nuts' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähl, was passiert ist, und nenne deine Allergie. Zwei Sätze.', es:'Cuenta qué te pasó y di a qué eres alérgico. Dos frases.', en:'Say what happened and name your allergy. Two sentences.' },
        muster:'Χθες έπεσα και με πονάει το γόνατο. Είμαι αλλεργική στην ασπιρίνη.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Die wichtigsten Verben haben eigene Vergangenheitsformen — die lernst du wie Vokabeln: πέφτω → **έπεσα** (ich bin gestürzt), γίνεται → **έγινε** (es ist passiert), πάω → **πήγα** (ich bin gegangen), έρχομαι → **ήρθα** (ich bin gekommen). Mit diesen vier erzählst du schon fast jede Geschichte beim Arzt.', es:'Los verbos más frecuentes tienen pasados propios — se aprenden como palabras: πέφτω → **έπεσα** (me caí), γίνεται → **έγινε** (pasó), πάω → **πήγα** (fui), έρχομαι → **ήρθα** (vine). Con estos cuatro ya puedes contarle casi cualquier historia al médico.', en:'The most common verbs have their own past forms — learn them like vocabulary: πέφτω → **έπεσα** (I fell), γίνεται → **έγινε** (it happened), πάω → **πήγα** (I went), έρχομαι → **ήρθα** (I came). With these four you can tell the doctor almost any story.' },
        beispiele:[
          { z:'Τι έγινε;', na:{ de:'Was ist passiert?', es:'¿Qué ha pasado?', en:'What happened?' } },
          { z:'Έπεσα στη σκάλα.', na:{ de:'Ich bin auf der Treppe gestürzt.', es:'Me caí en la escalera.', en:'I fell on the stairs.' } }
        ]
      }
    },

    'a2.bahnhof': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Dein Zug hat zwanzig Minuten Verspätung. In Larisa musst du um Viertel nach drei umsteigen.', es:'Tu tren lleva veinte minutos de retraso. En Larisa tienes que hacer transbordo a las tres y cuarto.', en:'Your train is twenty minutes late. In Larissa you have to change trains at quarter past three.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Ορίστε, πώς μπορώ να βοηθήσω;', tr:'Oríste, pós boró na voithíso?', na:{ de:'Bitte, wie kann ich helfen?', es:'Dígame, ¿en qué puedo ayudarle?', en:'Yes, how can I help?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Τότε παίρνετε το επόμενο, στις πέντε. Το εισιτήριό σας ισχύει κανονικά.', tr:'Tóte pérnete to epómeno, stis pénde. To isitírió sas ischíi kanoniká.', na:{ de:'Dann nehmen Sie den nächsten, um fünf. Ihre Fahrkarte gilt ganz normal.', es:'Entonces coge el siguiente, a las cinco. Su billete sigue siendo válido.', en:'Then you take the next one, at five. Your ticket is still valid.' } },
      wortschatz: [
        { z:'η καθυστέρηση', tr:'i kathistérisi', na:{ de:'die Verspätung', es:'el retraso', en:'the delay' } },
        { z:'η ανταπόκριση', tr:'i andapókrisi', na:{ de:'der Anschluss', es:'el transbordo (la conexión)', en:'the connection' } },
        { z:'χάνω', tr:'cháno', na:{ de:'verpassen, verlieren', es:'perder', en:'to miss, to lose' } },
        { z:'έχασα', tr:'échasa', na:{ de:'ich habe verpasst', es:'perdí', en:'I missed' } },
        { z:'το επόμενο', tr:'to epómeno', na:{ de:'der nächste (Zug)', es:'el siguiente', en:'the next one' } },
        { z:'ισχύει', tr:'ischíi', na:{ de:'gilt', es:'es válido', en:'is valid' } },
        { z:'η απεργία', tr:'i aperyía', na:{ de:'der Streik', es:'la huelga', en:'the strike' } },
        { z:'δυστυχώς', tr:'distichós', na:{ de:'leider', es:'por desgracia', en:'unfortunately' } },
        { z:'περιμένω', tr:'periméno', na:{ de:'warten', es:'esperar', en:'to wait' } },
        { z:'η αίθουσα αναμονής', tr:'i éthousa anamonís', na:{ de:'der Wartesaal', es:'la sala de espera', en:'the waiting room' } },
        { z:'η ανακοίνωση', tr:'i anakínosi', na:{ de:'die Durchsage', es:'el aviso (por megafonía)', en:'the announcement' } },
        { z:'ακυρώνεται', tr:'akirónete', na:{ de:'fällt aus', es:'se cancela', en:'is cancelled' } }
      ],
      dialog: {
        rolle: { de:'die Schalterbeamtin', es:'la empleada de la ventanilla', en:'the ticket agent' },
        zeilen: [
          { wer:'spikiu', z:'Ορίστε, πώς μπορώ να βοηθήσω;', na:{ de:'Bitte, wie kann ich helfen?', es:'Dígame, ¿en qué puedo ayudarle?', en:'Yes, how can I help?' } },
          { wer:'lerner', z:'Το τρένο μου έχει είκοσι λεπτά καθυστέρηση.', na:{ de:'Mein Zug hat zwanzig Minuten Verspätung.', es:'Mi tren lleva veinte minutos de retraso.', en:'My train is twenty minutes late.' } },
          { wer:'spikiu', z:'Ναι, δυστυχώς. Έχετε ανταπόκριση;', na:{ de:'Ja, leider. Haben Sie einen Anschluss?', es:'Sí, por desgracia. ¿Tiene transbordo?', en:'Yes, unfortunately. Do you have a connection?' } },
          { wer:'lerner', z:'Ναι, στη Λάρισα, στις τρεις και τέταρτο.', na:{ de:'Ja, in Larisa, um Viertel nach drei.', es:'Sí, en Larisa, a las tres y cuarto.', en:'Yes, in Larissa, at quarter past three.' } },
          { wer:'spikiu', z:'Μπορεί να είναι λίγο σφιχτό.', na:{ de:'Das könnte etwas knapp werden.', es:'Puede que vaya un poco justo.', en:'It might be a bit tight.' } },
          { wer:'lerner', z:'Και αν τη χάσω, τι γίνεται;', na:{ de:'Und wenn ich ihn verpasse, was passiert dann?', es:'¿Y si lo pierdo, qué pasa?', en:'And if I miss it, what happens?' } }
        ]
      },
      lesetext: {
        z:'Το τρένο από την Αθήνα είχε είκοσι λεπτά καθυστέρηση. Ένας ταξιδιώτης φοβήθηκε ότι θα χάσει την ανταπόκριση στη Λάρισα. Τελικά την έχασε. Η υπάλληλος του είπε ότι το εισιτήριό του ισχύει και για το επόμενο τρένο, στις πέντε. Περίμενε στην αίθουσα αναμονής με έναν καφέ.',
        na:{ de:'Der Zug aus Athen hatte zwanzig Minuten Verspätung. Ein Reisender hatte Angst, den Anschluss in Larisa zu verpassen. Am Ende hat er ihn verpasst. Die Beamtin sagte ihm, dass seine Fahrkarte auch für den nächsten Zug um fünf gilt. Er wartete mit einem Kaffee im Wartesaal.', es:'El tren de Atenas llevaba veinte minutos de retraso. Un viajero temía perder el transbordo en Larisa. Al final lo perdió. La empleada le dijo que su billete también valía para el siguiente tren, a las cinco. Esperó en la sala de espera con un café.', en:'The train from Athens was twenty minutes late. A traveller was afraid he would miss his connection in Larissa. In the end he missed it. The agent told him his ticket was also valid for the next train, at five. He waited in the waiting room with a coffee.' },
        frage:{ de:'Was gilt für den nächsten Zug?', es:'¿Qué pasa con el siguiente tren?', en:'What about the next train?' },
        optionen:[
          { na:{ de:'Seine Fahrkarte gilt', es:'Su billete vale', en:'His ticket is valid' }, richtig:true },
          { na:{ de:'Er muss eine neue Fahrkarte kaufen', es:'Tiene que comprar otro billete', en:'He has to buy a new ticket' }, richtig:false },
          { na:{ de:'Er muss mit dem Bus fahren', es:'Tiene que ir en autobús', en:'He has to take the bus' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass dein Bus Verspätung hat, und frag, wann der nächste fährt. Zwei Sätze.', es:'Di que tu autobús lleva retraso y pregunta a qué hora sale el siguiente. Dos frases.', en:'Say your bus is late and ask when the next one leaves. Two sentences.' },
        muster:'Το λεωφορείο μου έχει καθυστέρηση. Τι ώρα φεύγει το επόμενο;'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Nach **αν** (wenn, falls) steht für die Zukunft dieselbe Verbform wie nach να: αν τη **χάσω** — falls ich ihn verpasse. Und mit **θα** davor: **θα** χάσω — ich werde verpassen. Ein Stamm, drei Türen: **να**, **αν**, **θα**.', es:'Después de **αν** (si) el griego usa la misma forma que después de να: αν τη **χάσω** = si la pierdo. Y con **θα** delante: **θα** χάσω = perderé. Una sola forma, tres puertas: **να**, **αν**, **θα**.', en:'After **αν** (if) Greek uses the same verb form as after να: αν τη **χάσω** — if I miss it. Put **θα** in front and it\'s the future: **θα** χάσω — I will miss. One form, three doors: **να**, **αν**, **θα**.' },
        beispiele:[
          { z:'Αν χάσω το τρένο, τι γίνεται;', na:{ de:'Wenn ich den Zug verpasse, was passiert dann?', es:'Si pierdo el tren, ¿qué pasa?', en:'If I miss the train, what happens?' } },
          { z:'Θα χάσω την ανταπόκριση.', na:{ de:'Ich werde den Anschluss verpassen.', es:'Voy a perder el transbordo.', en:'I\'m going to miss the connection.' } }
        ]
      }
    },

    'a2.cafe': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Dein Kaffee ist kalt gekommen. Du bist gegen Nüsse allergisch und möchtest noch ein Stück Kuchen.', es:'El café te ha llegado frío. Eres alérgico a los frutos secos y quieres un trozo de tarta.', en:'Your coffee came cold. You\'re allergic to nuts and you\'d like a piece of cake.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Όλα καλά εδώ;', tr:'Óla kalá edó?', na:{ de:'Alles in Ordnung hier?', es:'¿Todo bien por aquí?', en:'Everything all right here?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Αμέσως. Και ο καφές είναι κερασμένος — συγγνώμη ξανά!', tr:'Amésos. Ke o kafés íne kerasménos — signómi xaná!', na:{ de:'Sofort. Und der Kaffee geht aufs Haus — nochmals Entschuldigung!', es:'Enseguida. Y el café corre de nuestra cuenta. ¡Perdone otra vez!', en:'Right away. And the coffee is on the house — sorry again!' } },
      wortschatz: [
        { z:'κρύος', tr:'kríos', na:{ de:'kalt', es:'frío', en:'cold' } },
        { z:'ζεστός', tr:'zestós', na:{ de:'heiß, warm', es:'caliente', en:'hot' } },
        { z:'ήρθε', tr:'írthe', na:{ de:'kam', es:'llegó', en:'came' } },
        { z:'καινούργιος', tr:'kenoúryos', na:{ de:'neu', es:'nuevo', en:'new' } },
        { z:'φέρνω', tr:'férno', na:{ de:'bringen', es:'traer', en:'to bring' } },
        { z:'οι ξηροί καρποί', tr:'i xirí karpí', na:{ de:'die Nüsse', es:'los frutos secos', en:'nuts' } },
        { z:'τα φουντούκια', tr:'ta foundoúkia', na:{ de:'die Haselnüsse', es:'las avellanas', en:'hazelnuts' } },
        { z:'τα καρύδια', tr:'ta karídia', na:{ de:'die Walnüsse', es:'las nueces', en:'walnuts' } },
        { z:'αλλεργικός', tr:'aleryikós', na:{ de:'allergisch', es:'alérgico', en:'allergic' } },
        { z:'η λεμονόπιτα', tr:'i lemonópita', na:{ de:'der Zitronenkuchen', es:'la tarta de limón', en:'the lemon pie' } },
        { z:'η σοκολατόπιτα', tr:'i sokolatópita', na:{ de:'der Schokoladenkuchen', es:'la tarta de chocolate', en:'the chocolate cake' } },
        { z:'ο φρέντο', tr:'o frédo', na:{ de:'der Freddo (Eiskaffee)', es:'el freddo (café helado)', en:'the freddo (iced coffee)' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero', en:'the waiter' },
        zeilen: [
          { wer:'spikiu', z:'Όλα καλά εδώ;', na:{ de:'Alles in Ordnung hier?', es:'¿Todo bien por aquí?', en:'Everything all right here?' } },
          { wer:'lerner', z:'Συγγνώμη, ο καφές μου ήρθε κρύος.', na:{ de:'Entschuldigung, mein Kaffee ist kalt gekommen.', es:'Perdone, el café me ha llegado frío.', en:'Excuse me, my coffee came cold.' } },
          { wer:'spikiu', z:'Ωχ, συγγνώμη! Σας φέρνω αμέσως καινούργιο.', na:{ de:'Oh, Entschuldigung! Ich bringe Ihnen sofort einen neuen.', es:'¡Uy, perdone! Le traigo otro ahora mismo.', en:'Oh, sorry! I\'ll bring you a new one right away.' } },
          { wer:'lerner', z:'Ευχαριστώ. Η σοκολατόπιτα έχει ξηρούς καρπούς;', na:{ de:'Danke. Sind im Schokoladenkuchen Nüsse?', es:'Gracias. ¿La tarta de chocolate lleva frutos secos?', en:'Thank you. Does the chocolate cake have nuts in it?' } },
          { wer:'spikiu', z:'Ναι, έχει φουντούκια. Η λεμονόπιτα όμως δεν έχει.', na:{ de:'Ja, Haselnüsse. Der Zitronenkuchen aber nicht.', es:'Sí, lleva avellanas. Pero la de limón no.', en:'Yes, it has hazelnuts. The lemon pie doesn\'t, though.' } },
          { wer:'lerner', z:'Είμαι αλλεργικός. Θα πάρω τη λεμονόπιτα.', na:{ de:'Ich bin allergisch. Ich nehme den Zitronenkuchen.', es:'Soy alérgico. Tomaré la de limón.', en:'I\'m allergic. I\'ll have the lemon pie.' } }
        ]
      },
      lesetext: {
        z:'Ένας πελάτης παρήγγειλε καφέ, αλλά ο καφές του ήρθε κρύος. Ο σερβιτόρος του έφερε αμέσως καινούργιο. Μετά ο πελάτης ρώτησε αν η σοκολατόπιτα έχει ξηρούς καρπούς. Είχε φουντούκια, και εκείνος είναι αλλεργικός. Γι\' αυτό πήρε λεμονόπιτα — και ο καφές ήταν κερασμένος.',
        na:{ de:'Ein Gast bestellte einen Kaffee, aber der Kaffee kam kalt. Der Kellner brachte ihm sofort einen neuen. Dann fragte der Gast, ob im Schokoladenkuchen Nüsse sind. Es waren Haselnüsse drin, und er ist allergisch. Darum nahm er Zitronenkuchen — und der Kaffee ging aufs Haus.', es:'Un cliente pidió un café, pero le llegó frío. El camarero le trajo otro enseguida. Después el cliente preguntó si la tarta de chocolate llevaba frutos secos. Llevaba avellanas, y él es alérgico. Por eso pidió la de limón, y el café fue invitación de la casa.', en:'A customer ordered a coffee, but it came cold. The waiter brought him a new one straight away. Then the customer asked whether the chocolate cake had nuts. It had hazelnuts, and he\'s allergic. So he had the lemon pie — and the coffee was on the house.' },
        frage:{ de:'Warum nimmt er den Zitronenkuchen?', es:'¿Por qué pide la tarta de limón?', en:'Why does he have the lemon pie?' },
        optionen:[
          { na:{ de:'Er ist gegen Nüsse allergisch', es:'Es alérgico a los frutos secos', en:'He\'s allergic to nuts' }, richtig:true },
          { na:{ de:'Er ist billiger', es:'Es más barata', en:'It\'s cheaper' }, richtig:false },
          { na:{ de:'Es gibt keinen Schokoladenkuchen mehr', es:'Ya no queda tarta de chocolate', en:'The chocolate cake has run out' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag höflich, dass dein Tee kalt gekommen ist, und frag, ob der Kuchen Nüsse hat. Zwei Sätze.', es:'Di con cortesía que el té te ha llegado frío y pregunta si la tarta lleva frutos secos. Dos frases.', en:'Politely say your tea came cold and ask whether the cake has nuts. Two sentences.' },
        muster:'Συγγνώμη, το τσάι μου ήρθε κρύο. Το κέικ έχει ξηρούς καρπούς;'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Für das, was eben passiert und abgeschlossen ist, hat Griechisch den **Aorist** — ein einziges Wort statt „ist gekommen": έρχεται (kommt) → **ήρθε** (ist gekommen). Erkennungszeichen: Die Betonung rutscht in der Vergangenheit nach vorn — φέρνω → **έ**φερα, παίρνω → **πή**ρα.', es:'Para lo que acaba de pasar y está terminado, el griego usa el **aoristo** — como el indefinido español: έρχεται (viene) → **ήρθε** (llegó, ha llegado). Pista: en pasado el acento se va hacia delante — φέρνω → **έ**φερα (traje), παίρνω → **πή**ρα (cogí).', en:'For something that has just happened and is over, Greek uses the **aorist** — one word where English says "came" or "has come": έρχεται (comes) → **ήρθε** (came). The giveaway: in the past the stress jumps forward — φέρνω → **έ**φερα (I brought), παίρνω → **πή**ρα (I took).' },
        beispiele:[
          { z:'Ο καφές ήρθε κρύος.', na:{ de:'Der Kaffee kam kalt.', es:'El café llegó frío.', en:'The coffee came cold.' } },
          { z:'Πήρα τη λεμονόπιτα.', na:{ de:'Ich habe den Zitronenkuchen genommen.', es:'Pedí la tarta de limón.', en:'I had the lemon pie.' } }
        ]
      }
    },

    'a2.einkaufen': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du hast gestern ein Hemd gekauft, es ist dir zu groß. Die Quittung hast du dabei.', es:'Ayer compraste una camisa y te queda grande. Llevas el tique.', en:'You bought a shirt yesterday and it\'s too big for you. You have the receipt with you.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Γεια σας! Μπορώ να σας βοηθήσω;', tr:'Ya sas! Boró na sas voithíso?', na:{ de:'Hallo! Kann ich Ihnen helfen?', es:'¡Hola! ¿Puedo ayudarle?', en:'Hello! Can I help you?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Φυσικά. Το δοκιμαστήριο είναι εκεί, δεξιά.', tr:'Fisiká. To dokimastírio íne ekí, dexiá.', na:{ de:'Natürlich. Die Umkleide ist dort rechts.', es:'Claro. El probador está ahí, a la derecha.', en:'Of course. The fitting room is over there on the right.' } },
      wortschatz: [
        { z:'το πουκάμισο', tr:'to poukámiso', na:{ de:'das Hemd', es:'la camisa', en:'the shirt' } },
        { z:'αγόρασα', tr:'agórasa', na:{ de:'ich habe gekauft', es:'compré', en:'I bought' } },
        { z:'μου πέφτει μεγάλο', tr:'mou péfti megálo', na:{ de:'es ist mir zu groß', es:'me queda grande', en:'it\'s too big for me' } },
        { z:'μικρό', tr:'mikró', na:{ de:'klein', es:'pequeño', en:'small' } },
        { z:'η απόδειξη', tr:'i apódixi', na:{ de:'die Quittung', es:'el tique', en:'the receipt' } },
        { z:'αλλάζω', tr:'alázo', na:{ de:'umtauschen, wechseln', es:'cambiar', en:'to exchange, to change' } },
        { z:'το νούμερο', tr:'to noúmero', na:{ de:'die Größe', es:'la talla', en:'the size' } },
        { z:'δοκιμάζω', tr:'dokimázo', na:{ de:'anprobieren', es:'probarse', en:'to try on' } },
        { z:'το δοκιμαστήριο', tr:'to dokimastírio', na:{ de:'die Umkleidekabine', es:'el probador', en:'the fitting room' } },
        { z:'το ταμείο', tr:'to tamío', na:{ de:'die Kasse', es:'la caja', en:'the till' } },
        { z:'οι εκπτώσεις', tr:'i ekptósis', na:{ de:'der Schlussverkauf', es:'las rebajas', en:'the sales' } },
        { z:'τα λεφτά', tr:'ta leftá', na:{ de:'das Geld', es:'el dinero', en:'the money' } }
      ],
      dialog: {
        rolle: { de:'die Verkäuferin', es:'la dependienta', en:'the shop assistant' },
        zeilen: [
          { wer:'spikiu', z:'Γεια σας! Μπορώ να σας βοηθήσω;', na:{ de:'Hallo! Kann ich Ihnen helfen?', es:'¡Hola! ¿Puedo ayudarle?', en:'Hello! Can I help you?' } },
          { wer:'lerner', z:'Αγόρασα αυτό το πουκάμισο χθες, αλλά μου πέφτει μεγάλο.', na:{ de:'Ich habe dieses Hemd gestern gekauft, aber es ist mir zu groß.', es:'Compré esta camisa ayer, pero me queda grande.', en:'I bought this shirt yesterday, but it\'s too big for me.' } },
          { wer:'spikiu', z:'Έχετε την απόδειξη;', na:{ de:'Haben Sie die Quittung?', es:'¿Tiene el tique?', en:'Do you have the receipt?' } },
          { wer:'lerner', z:'Ναι, ορίστε. Μπορώ να το αλλάξω;', na:{ de:'Ja, bitte. Kann ich es umtauschen?', es:'Sí, aquí tiene. ¿Puedo cambiarla?', en:'Yes, here it is. Can I exchange it?' } },
          { wer:'spikiu', z:'Βεβαίως. Τι νούμερο θέλετε;', na:{ de:'Selbstverständlich. Welche Größe möchten Sie?', es:'Por supuesto. ¿Qué talla quiere?', en:'Of course. What size would you like?' } },
          { wer:'lerner', z:'Ένα νούμερο μικρότερο. Μπορώ να το δοκιμάσω;', na:{ de:'Eine Nummer kleiner. Kann ich es anprobieren?', es:'Una talla menos. ¿Me la puedo probar?', en:'One size smaller. Can I try it on?' } }
        ]
      },
      lesetext: {
        z:'Η Ελένη αγόρασε ένα πουκάμισο για τον πατέρα της. Στο σπίτι όμως είδε ότι του έπεφτε μεγάλο. Την επόμενη μέρα γύρισε στο μαγαζί με την απόδειξη. Η πωλήτρια της έδωσε ένα νούμερο μικρότερο. Ο πατέρας της το δοκίμασε και του έκανε τέλεια.',
        na:{ de:'Eleni hat ein Hemd für ihren Vater gekauft. Zu Hause hat sie aber gesehen, dass es ihm zu groß war. Am nächsten Tag ist sie mit der Quittung in den Laden zurückgegangen. Die Verkäuferin hat ihr eine Nummer kleiner gegeben. Ihr Vater hat es anprobiert, und es passte perfekt.', es:'Eleni compró una camisa para su padre. Pero en casa vio que le quedaba grande. Al día siguiente volvió a la tienda con el tique. La dependienta le dio una talla menos. Su padre se la probó y le quedaba perfecta.', en:'Eleni bought a shirt for her father. At home, though, she saw it was too big for him. The next day she went back to the shop with the receipt. The assistant gave her one size smaller. Her father tried it on and it fitted perfectly.' },
        frage:{ de:'Was hat Eleni in den Laden mitgebracht?', es:'¿Qué llevó Eleni a la tienda?', en:'What did Eleni bring back to the shop?' },
        optionen:[
          { na:{ de:'Die Quittung', es:'El tique', en:'The receipt' }, richtig:true },
          { na:{ de:'Ihren Vater', es:'A su padre', en:'Her father' }, richtig:false },
          { na:{ de:'Ein zweites Hemd', es:'Otra camisa', en:'A second shirt' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du gestern diese Hose gekauft hast und sie dir zu klein ist. Zwei Sätze.', es:'Di que ayer compraste este pantalón y que te queda pequeño. Dos frases.', en:'Say you bought these trousers yesterday and they are too small for you. Two sentences.' },
        muster:'Αγόρασα αυτό το παντελόνι χθες. Μου πέφτει μικρό.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Der Aorist regelmäßiger Verben hat zwei Kennzeichen: ein **-σ-** und die Betonung weit vorn. αγοράζω → **αγόρασα** (ich habe gekauft), δοκιμάζω → **δοκίμασα** (ich habe anprobiert). Und „passen" sagt man mit dem Körper: μου **πέφτει** μεγάλο — es „fällt mir groß".', es:'El aoristo de los verbos regulares tiene dos señas: una **-σ-** y el acento muy adelante. αγοράζω → **αγόρασα** (compré), δοκιμάζω → **δοκίμασα** (me probé). Y para la talla el griego dice que la ropa «cae»: μου **πέφτει** μεγάλο = me queda grande.', en:'The aorist of regular verbs has two markers: a **-σ-** and the stress far forward. αγοράζω → **αγόρασα** (I bought), δοκιμάζω → **δοκίμασα** (I tried on). And for fit, clothes "fall" on you: μου **πέφτει** μεγάλο = it\'s too big for me.' },
        beispiele:[
          { z:'Αγόρασα ένα πουκάμισο.', na:{ de:'Ich habe ein Hemd gekauft.', es:'Compré una camisa.', en:'I bought a shirt.' } },
          { z:'Μου πέφτει μεγάλο.', na:{ de:'Es ist mir zu groß.', es:'Me queda grande.', en:'It\'s too big for me.' } }
        ]
      }
    },

    'a2.familie': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen. */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du bist in einem kleinen Dorf aufgewachsen. Sonntags habt ihr bei deiner Tante gegessen. Deine Schwester ist nach Kanada gezogen.', es:'Te criaste en un pueblo pequeño. Los domingos comíais en casa de tu tía. Tu hermana se mudó a Canadá.', en:'You grew up in a small village. On Sundays you ate at your aunt\'s. Your sister moved to Canada.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Σε καταλαβαίνω. Κι εμένα μου λείπει ο αδερφός μου. Έλα, πάμε για έναν καφέ.', tr:'Se katalavéno. Ki eména mou lípi o aderfós mou. Éla, páme ya énan kafé.', na:{ de:'Ich verstehe dich. Mir fehlt mein Bruder auch. Komm, gehen wir einen Kaffee trinken.', es:'Te entiendo. Yo también echo de menos a mi hermano. Venga, vamos a tomar un café.', en:'I understand. I miss my brother too. Come on, let\'s go for a coffee.' } },
      wortschatz: [
        { z:'μεγαλώνω', tr:'megalóno', na:{ de:'aufwachsen', es:'criarse, crecer', en:'to grow up' } },
        { z:'το χωριό', tr:'to chorió', na:{ de:'das Dorf', es:'el pueblo', en:'the village' } },
        { z:'μέναμε', tr:'méname', na:{ de:'wir wohnten', es:'vivíamos', en:'we lived' } },
        { z:'ο θείος', tr:'o thíos', na:{ de:'der Onkel', es:'el tío', en:'the uncle' } },
        { z:'η θεία', tr:'i thía', na:{ de:'die Tante', es:'la tía', en:'the aunt' } },
        { z:'τα ξαδέρφια', tr:'ta xadérfia', na:{ de:'die Cousins und Cousinen', es:'los primos', en:'the cousins' } },
        { z:'οι συγγενείς', tr:'i singenís', na:{ de:'die Verwandten', es:'los parientes', en:'the relatives' } },
        { z:'κάθε Κυριακή', tr:'káthe Kiriakí', na:{ de:'jeden Sonntag', es:'cada domingo', en:'every Sunday' } },
        { z:'τρώγαμε', tr:'trógame', na:{ de:'wir aßen (immer)', es:'comíamos', en:'we used to eat' } },
        { z:'μετακομίζω', tr:'metakomízo', na:{ de:'umziehen', es:'mudarse', en:'to move (house)' } },
        { z:'μου λείπει', tr:'mou lípi', na:{ de:'er/sie/es fehlt mir', es:'lo/la echo de menos', en:'I miss him/her/it' } },
        { z:'όταν ήμουν μικρός', tr:'ótan ímoun mikrós', na:{ de:'als ich klein war', es:'cuando era pequeño', en:'when I was little' } }
      ],
      dialog: {
        rolle: { de:'eine Freundin', es:'una amiga', en:'a friend' },
        zeilen: [
          { wer:'spikiu', z:'Πού μεγάλωσες εσύ;', na:{ de:'Wo bist du eigentlich aufgewachsen?', es:'¿Y tú dónde te criaste?', en:'Where did you grow up?' } },
          { wer:'lerner', z:'Μέναμε σε ένα μικρό χωριό.', na:{ de:'Wir haben in einem kleinen Dorf gewohnt.', es:'Vivíamos en un pueblo pequeño.', en:'We lived in a small village.' } },
          { wer:'spikiu', z:'Α, ωραία! Βλεπόσασταν συχνά με τους συγγενείς;', na:{ de:'Ach, schön! Habt ihr die Verwandten oft gesehen?', es:'¡Ah, qué bonito! ¿Veíais a menudo a la familia?', en:'Oh, nice! Did you see your relatives often?' } },
          { wer:'lerner', z:'Ναι, κάθε Κυριακή τρώγαμε στης θείας μου.', na:{ de:'Ja, jeden Sonntag haben wir bei meiner Tante gegessen.', es:'Sí, cada domingo comíamos en casa de mi tía.', en:'Yes, every Sunday we ate at my aunt\'s.' } },
          { wer:'spikiu', z:'Κι η αδερφή σου; Μένει ακόμα εκεί;', na:{ de:'Und deine Schwester? Wohnt sie noch dort?', es:'¿Y tu hermana? ¿Sigue viviendo allí?', en:'And your sister? Does she still live there?' } },
          { wer:'lerner', z:'Όχι, μετακόμισε στον Καναδά. Μου λείπει πολύ.', na:{ de:'Nein, sie ist nach Kanada gezogen. Sie fehlt mir sehr.', es:'No, se mudó a Canadá. La echo mucho de menos.', en:'No, she moved to Canada. I miss her a lot.' } }
        ]
      },
      lesetext: {
        z:'Ο Νίκος μεγάλωσε σε ένα μικρό χωριό στην Κρήτη. Κάθε Κυριακή όλη η οικογένεια έτρωγε στης θείας του. Τα καλοκαίρια έπαιζε με τα ξαδέρφια του στη θάλασσα. Σήμερα η αδερφή του μένει στον Καναδά. Του λείπει πολύ.',
        na:{ de:'Nikos ist in einem kleinen Dorf auf Kreta aufgewachsen. Jeden Sonntag hat die ganze Familie bei seiner Tante gegessen. Im Sommer hat er mit seinen Cousins am Meer gespielt. Heute wohnt seine Schwester in Kanada. Sie fehlt ihm sehr.', es:'Nikos se crió en un pueblo pequeño de Creta. Cada domingo toda la familia comía en casa de su tía. En verano jugaba con sus primos en el mar. Hoy su hermana vive en Canadá. La echa mucho de menos.', en:'Nikos grew up in a small village on Crete. Every Sunday the whole family ate at his aunt\'s. In the summers he played with his cousins by the sea. Today his sister lives in Canada. He misses her a lot.' },
        frage:{ de:'Wo wohnt seine Schwester heute?', es:'¿Dónde vive hoy su hermana?', en:'Where does his sister live today?' },
        optionen:[
          { na:{ de:'In Kanada', es:'En Canadá', en:'In Canada' }, richtig:true },
          { na:{ de:'Auf Kreta', es:'En Creta', en:'On Crete' }, richtig:false },
          { na:{ de:'In Athen', es:'En Atenas', en:'In Athens' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, wo du als Kind gewohnt hast und wen du vermisst. Zwei Sätze.', es:'Cuenta dónde vivías de pequeño y a quién echas de menos. Dos frases.', en:'Say where you lived as a child and who you miss. Two sentences.' },
        muster:'Όταν ήμουν μικρή, έμενα στη Βιέννη. Μου λείπει η γιαγιά μου.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Vermissen geht im Griechischen andersherum: nicht „ich vermisse sie", sondern **μου λείπει** — „sie fehlt mir". Und **μου λείπεις**: Du fehlst mir. Für Gewohnheiten von früher gibt es eine eigene Vergangenheit: **τρώγαμε** κάθε Κυριακή — wir aßen jeden Sonntag (immer wieder).', es:'Echar de menos en griego funciona como «me haces falta»: **μου λείπει** = me falta, la echo de menos; **μου λείπεις** = me haces falta. Y para costumbres del pasado hay un tiempo propio, igual que el imperfecto español: **τρώγαμε** κάθε Κυριακή = comíamos cada domingo.', en:'Missing someone works the other way round in Greek: not "I miss her" but **μου λείπει** — "she is missing to me". **μου λείπεις**: I miss you. And for past habits there\'s a separate past tense, like English "used to": **τρώγαμε** κάθε Κυριακή — we used to eat every Sunday.' },
        beispiele:[
          { z:'Μου λείπει η αδερφή μου.', na:{ de:'Meine Schwester fehlt mir.', es:'Echo de menos a mi hermana.', en:'I miss my sister.' } },
          { z:'Μου λείπεις.', na:{ de:'Du fehlst mir.', es:'Me haces falta.', en:'I miss you.' } }
        ]
      }
    },

    'a2.hotel': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Seit gestern Abend funktioniert die Klimaanlage nicht, und es gibt kein warmes Wasser. Du möchtest lieber das Zimmer wechseln.', es:'Desde anoche no funciona el aire acondicionado y no hay agua caliente. Prefieres cambiar de habitación.', en:'Since last night the air conditioning hasn\'t worked and there\'s no hot water. You\'d rather change rooms.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Καλημέρα! Πώς κοιμηθήκατε;', tr:'Kaliméra! Pós kimithíkate?', na:{ de:'Guten Morgen! Wie haben Sie geschlafen?', es:'¡Buenos días! ¿Qué tal ha dormido?', en:'Good morning! How did you sleep?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Κανένα πρόβλημα. Σας δίνω το τριακόσια πέντε, με θέα στη θάλασσα.', tr:'Kanéna próvlima. Sas díno to triakósia pénde, me théa sti thálasa.', na:{ de:'Kein Problem. Ich gebe Ihnen die Dreihundertfünf, mit Meerblick.', es:'Ningún problema. Le doy la trescientos cinco, con vistas al mar.', en:'No problem. I\'ll give you room three-oh-five, with a sea view.' } },
      wortschatz: [
        { z:'το κλιματιστικό', tr:'to klimatistikó', na:{ de:'die Klimaanlage', es:'el aire acondicionado', en:'the air conditioning' } },
        { z:'δουλεύει', tr:'doulévi', na:{ de:'funktioniert', es:'funciona', en:'works' } },
        { z:'χάλασε', tr:'chálase', na:{ de:'ist kaputtgegangen', es:'se ha estropeado', en:'broke down' } },
        { z:'ο θερμοσίφωνας', tr:'o thermosífonas', na:{ de:'der Warmwasserboiler', es:'el termo (calentador de agua)', en:'the water heater' } },
        { z:'το ζεστό νερό', tr:'to zestó neró', na:{ de:'das warme Wasser', es:'el agua caliente', en:'hot water' } },
        { z:'η θέρμανση', tr:'i thérmansi', na:{ de:'die Heizung', es:'la calefacción', en:'the heating' } },
        { z:'ο τεχνικός', tr:'o technikós', na:{ de:'der Techniker', es:'el técnico', en:'the technician' } },
        { z:'προτιμώ', tr:'protimó', na:{ de:'lieber wollen, bevorzugen', es:'preferir', en:'to prefer' } },
        { z:'αλλάζω δωμάτιο', tr:'alázo domátio', na:{ de:'das Zimmer wechseln', es:'cambiar de habitación', en:'to change rooms' } },
        { z:'η θέα', tr:'i théa', na:{ de:'die Aussicht', es:'las vistas', en:'the view' } },
        { z:'ήσυχος', tr:'ísichos', na:{ de:'ruhig', es:'tranquilo', en:'quiet' } },
        { z:'ο θόρυβος', tr:'o thórivos', na:{ de:'der Lärm', es:'el ruido', en:'the noise' } }
      ],
      dialog: {
        rolle: { de:'der Rezeptionist', es:'el recepcionista', en:'the receptionist' },
        zeilen: [
          { wer:'spikiu', z:'Καλημέρα! Πώς κοιμηθήκατε;', na:{ de:'Guten Morgen! Wie haben Sie geschlafen?', es:'¡Buenos días! ¿Qué tal ha dormido?', en:'Good morning! How did you sleep?' } },
          { wer:'lerner', z:'Όχι πολύ καλά. Το κλιματιστικό δεν δουλεύει.', na:{ de:'Nicht besonders gut. Die Klimaanlage funktioniert nicht.', es:'No muy bien. El aire acondicionado no funciona.', en:'Not very well. The air conditioning isn\'t working.' } },
          { wer:'spikiu', z:'Αλήθεια; Από πότε;', na:{ de:'Wirklich? Seit wann?', es:'¿De verdad? ¿Desde cuándo?', en:'Really? Since when?' } },
          { wer:'lerner', z:'Από χθες το βράδυ. Και δεν έχει ζεστό νερό.', na:{ de:'Seit gestern Abend. Und es gibt kein warmes Wasser.', es:'Desde anoche. Y no hay agua caliente.', en:'Since last night. And there\'s no hot water.' } },
          { wer:'spikiu', z:'Ωχ, συγγνώμη. Μάλλον χάλασε ο θερμοσίφωνας. Θα στείλω τεχνικό.', na:{ de:'Oh, Entschuldigung. Wahrscheinlich ist der Boiler kaputt. Ich schicke einen Techniker.', es:'Uy, perdone. Seguramente se ha estropeado el termo. Mandaré a un técnico.', en:'Oh, I\'m sorry. The water heater has probably broken. I\'ll send a technician.' } },
          { wer:'lerner', z:'Θα προτιμούσα να αλλάξω δωμάτιο.', na:{ de:'Ich würde lieber das Zimmer wechseln.', es:'Preferiría cambiar de habitación.', en:'I\'d rather change rooms.' } }
        ]
      },
      lesetext: {
        z:'Μια πελάτισσα δεν κοιμήθηκε καλά, γιατί το κλιματιστικό δεν δούλευε. Το πρωί είδε ότι δεν είχε ούτε ζεστό νερό. Ο υπάλληλος είπε ότι μάλλον χάλασε ο θερμοσίφωνας. Η πελάτισσα προτίμησε να αλλάξει δωμάτιο. Πήρε το τριακόσια πέντε, με θέα στη θάλασσα.',
        na:{ de:'Eine Hotelgästin hat schlecht geschlafen, weil die Klimaanlage nicht funktionierte. Am Morgen merkte sie, dass es auch kein warmes Wasser gab. Der Angestellte sagte, wahrscheinlich sei der Boiler kaputt. Die Gästin wechselte lieber das Zimmer. Sie bekam die Dreihundertfünf, mit Meerblick.', es:'Una clienta no durmió bien porque el aire acondicionado no funcionaba. Por la mañana vio que tampoco había agua caliente. El empleado dijo que seguramente se había estropeado el termo. La clienta prefirió cambiar de habitación. Le dieron la trescientos cinco, con vistas al mar.', en:'A guest didn\'t sleep well because the air conditioning wasn\'t working. In the morning she found there was no hot water either. The clerk said the water heater had probably broken. The guest preferred to change rooms. She got room three-oh-five, with a sea view.' },
        frage:{ de:'Welches Zimmer bekommt sie?', es:'¿Qué habitación le dan?', en:'Which room does she get?' },
        optionen:[
          { na:{ de:'Die 305, mit Meerblick', es:'La 305, con vistas al mar', en:'Room 305, with a sea view' }, richtig:true },
          { na:{ de:'Die 503', es:'La 503', en:'Room 503' }, richtig:false },
          { na:{ de:'Sie bleibt im selben Zimmer', es:'Se queda en la misma', en:'She stays in the same room' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass die Dusche nicht funktioniert und dass du ein anderes Zimmer möchtest. Zwei Sätze.', es:'Di que la ducha no funciona y que quieres otra habitación. Dos frases.', en:'Say the shower isn\'t working and that you would like another room. Two sentences.' },
        muster:'Το ντους δεν δουλεύει. Θα ήθελα ένα άλλο δωμάτιο.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Verneinen ist leicht: **δεν** vor das Verb — **δεν** δουλεύει, **δεν** κοιμήθηκα. Und **έχει** heißt nicht nur „hat", sondern auch „es gibt": **δεν έχει** ζεστό νερό — es gibt kein warmes Wasser. Geräte „arbeiten" übrigens: το κλιματιστικό δεν **δουλεύει**.', es:'Negar es fácil: **δεν** delante del verbo — **δεν** δουλεύει (no funciona). Y **έχει** no solo es «tiene», también es «hay»: **δεν έχει** ζεστό νερό = no hay agua caliente. Los aparatos, por cierto, «trabajan»: το κλιματιστικό δεν **δουλεύει**.', en:'Negation is easy: **δεν** before the verb — **δεν** δουλεύει (it doesn\'t work). And **έχει** means not only "has" but also "there is": **δεν έχει** ζεστό νερό — there\'s no hot water. Machines, by the way, "work": το κλιματιστικό δεν **δουλεύει**.' },
        beispiele:[
          { z:'Το κλιματιστικό δεν δουλεύει.', na:{ de:'Die Klimaanlage funktioniert nicht.', es:'El aire acondicionado no funciona.', en:'The air conditioning isn\'t working.' } },
          { z:'Δεν έχει ζεστό νερό.', na:{ de:'Es gibt kein warmes Wasser.', es:'No hay agua caliente.', en:'There\'s no hot water.' } }
        ]
      }
    },

    'a2.restaurant': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Ihr sitzt zu zweit in einer Taverne am Meer und habt noch nicht entschieden. Ihr wollt etwas Leichtes zum Teilen und mit Karte zahlen.', es:'Estáis dos en una taberna junto al mar y todavía no habéis decidido. Queréis algo ligero para compartir y pagar con tarjeta.', en:'There are two of you in a seaside taverna and you haven\'t decided yet. You want something light to share and to pay by card.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Λοιπόν, τι θα πάρετε;', tr:'Lipón, ti tha párete?', na:{ de:'So, was darf es sein?', es:'Bueno, ¿qué van a tomar?', en:'So, what will you have?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Βεβαίως. Και στο τέλος, ρακί κερασμένο από το μαγαζί!', tr:'Vevéos. Ke sto télos, rakí kerasméno apó to magazí!', na:{ de:'Selbstverständlich. Und zum Schluss gibt\'s einen Raki aufs Haus!', es:'Por supuesto. ¡Y al final, un raki invitación de la casa!', en:'Of course. And at the end, a raki on the house!' } },
      wortschatz: [
        { z:'η σπεσιαλιτέ', tr:'i spesialité', na:{ de:'die Spezialität', es:'la especialidad', en:'the speciality' } },
        { z:'αποφασίζω', tr:'apofasízo', na:{ de:'entscheiden', es:'decidir', en:'to decide' } },
        { z:'αποφασίσαμε', tr:'apofasísame', na:{ de:'wir haben entschieden', es:'decidimos', en:'we decided' } },
        { z:'ελαφρύς', tr:'elafrís', na:{ de:'leicht', es:'ligero', en:'light' } },
        { z:'για τη μέση', tr:'ya ti mési', na:{ de:'zum Teilen (für die Tischmitte)', es:'para compartir (al centro)', en:'to share (for the middle of the table)' } },
        { z:'το αρνί', tr:'to arní', na:{ de:'das Lamm', es:'el cordero', en:'lamb' } },
        { z:'στον φούρνο', tr:'ston foúrno', na:{ de:'aus dem Ofen', es:'al horno', en:'oven-baked' } },
        { z:'η τσιπούρα', tr:'i tsipoúra', na:{ de:'die Dorade', es:'la dorada', en:'the sea bream' } },
        { z:'στα κάρβουνα', tr:'sta kárvouna', na:{ de:'vom Holzkohlegrill', es:'a la brasa', en:'charcoal-grilled' } },
        { z:'με κάρτα', tr:'me kárta', na:{ de:'mit Karte', es:'con tarjeta', en:'by card' } },
        { z:'το φιλοδώρημα', tr:'to filodórima', na:{ de:'das Trinkgeld', es:'la propina', en:'the tip' } },
        { z:'βεβαίως', tr:'vevéos', na:{ de:'selbstverständlich', es:'por supuesto', en:'of course' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero', en:'the waiter' },
        zeilen: [
          { wer:'spikiu', z:'Λοιπόν, τι θα πάρετε;', na:{ de:'So, was darf es sein?', es:'Bueno, ¿qué van a tomar?', en:'So, what will you have?' } },
          { wer:'lerner', z:'Δεν αποφασίσαμε ακόμα. Ποια είναι η σπεσιαλιτέ σας;', na:{ de:'Wir haben uns noch nicht entschieden. Was ist Ihre Spezialität?', es:'Todavía no hemos decidido. ¿Cuál es su especialidad?', en:'We haven\'t decided yet. What\'s your speciality?' } },
          { wer:'spikiu', z:'Το αρνί στον φούρνο. Το έφτιαξε η μάνα μου σήμερα το πρωί.', na:{ de:'Das Lamm aus dem Ofen. Meine Mutter hat es heute Morgen gemacht.', es:'El cordero al horno. Lo ha hecho mi madre esta mañana.', en:'The oven-baked lamb. My mother made it this morning.' } },
          { wer:'lerner', z:'Μήπως έχετε κάτι πιο ελαφρύ; Θέλουμε να το πάρουμε για τη μέση.', na:{ de:'Haben Sie vielleicht etwas Leichteres? Wir wollen es zum Teilen nehmen.', es:'¿Tienen algo más ligero? Queremos pedirlo para compartir.', en:'Do you have anything lighter? We\'d like it to share.' } },
          { wer:'spikiu', z:'Έχουμε φρέσκια τσιπούρα στα κάρβουνα. Ήρθε σήμερα το πρωί.', na:{ de:'Wir haben frische Dorade vom Grill. Die kam heute Morgen.', es:'Tenemos dorada fresca a la brasa. Ha llegado esta mañana.', en:'We have fresh sea bream from the grill. It came in this morning.' } },
          { wer:'lerner', z:'Ωραία, μια τσιπούρα. Μπορούμε να πληρώσουμε με κάρτα;', na:{ de:'Schön, eine Dorade. Können wir mit Karte zahlen?', es:'Estupendo, una dorada. ¿Podemos pagar con tarjeta?', en:'Lovely, one sea bream. Can we pay by card?' } }
        ]
      },
      lesetext: {
        z:'Χθες δύο φίλες κάθισαν σε μια ταβέρνα δίπλα στη θάλασσα. Ρώτησαν τον σερβιτόρο για τη σπεσιαλιτέ. Το αρνί ήταν πολύ βαρύ για μεσημέρι, γι\' αυτό πήραν μια τσιπούρα για τη μέση. Πλήρωσαν με κάρτα και άφησαν λίγα ευρώ φιλοδώρημα. Το ρακί στο τέλος ήταν κερασμένο.',
        na:{ de:'Gestern haben sich zwei Freundinnen in eine Taverne am Meer gesetzt. Sie haben den Kellner nach der Spezialität gefragt. Das Lamm war ihnen mittags zu schwer, deshalb haben sie eine Dorade zum Teilen genommen. Sie haben mit Karte gezahlt und ein paar Euro Trinkgeld dagelassen. Der Raki am Ende ging aufs Haus.', es:'Ayer dos amigas se sentaron en una taberna junto al mar. Le preguntaron al camarero por la especialidad. El cordero era demasiado pesado para mediodía, así que pidieron una dorada para compartir. Pagaron con tarjeta y dejaron unos euros de propina. El raki del final fue invitación de la casa.', en:'Yesterday two friends sat down in a seaside taverna. They asked the waiter about the speciality. The lamb was too heavy for lunchtime, so they had a sea bream to share. They paid by card and left a few euros as a tip. The raki at the end was on the house.' },
        frage:{ de:'Warum nehmen sie nicht das Lamm?', es:'¿Por qué no piden el cordero?', en:'Why don\'t they have the lamb?' },
        optionen:[
          { na:{ de:'Es ist mittags zu schwer', es:'Es demasiado pesado para mediodía', en:'It\'s too heavy for lunch' }, richtig:true },
          { na:{ de:'Es ist zu teuer', es:'Es demasiado caro', en:'It\'s too expensive' }, richtig:false },
          { na:{ de:'Es ist schon aus', es:'Ya no queda', en:'It\'s sold out' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag nach der Spezialität und sag, dass ihr sie zum Teilen nehmt. Zwei Sätze.', es:'Pregunta por la especialidad y di que la pedís para compartir. Dos frases.', en:'Ask about the speciality and say you will have it to share. Two sentences.' },
        muster:'Ποια είναι η σπεσιαλιτέ σας; Θα την πάρουμε για τη μέση.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Griechisch hat keinen Infinitiv. Statt „wir wollen nehmen" sagt es „wir wollen, **dass** wir nehmen": θέλουμε **να** πάρουμε. Nach **θέλω**, **μπορώ**, **πρέπει** kommt immer **να** + ein konjugiertes Verb: μπορούμε **να** πληρώσουμε; — können wir zahlen?', es:'El griego no tiene infinitivo. En vez de «queremos pedir» dice «queremos **que** pidamos»: θέλουμε **να** πάρουμε. Después de **θέλω**, **μπορώ**, **πρέπει** siempre va **να** + verbo conjugado: μπορούμε **να** πληρώσουμε; = ¿podemos pagar?', en:'Greek has no infinitive. Instead of "we want to take" it says "we want **that** we take": θέλουμε **να** πάρουμε. After **θέλω**, **μπορώ**, **πρέπει** you always get **να** + a conjugated verb: μπορούμε **να** πληρώσουμε; — can we pay?' },
        beispiele:[
          { z:'Μπορούμε να πληρώσουμε με κάρτα;', na:{ de:'Können wir mit Karte zahlen?', es:'¿Podemos pagar con tarjeta?', en:'Can we pay by card?' } },
          { z:'Θέλω να πάρω το ψάρι.', na:{ de:'Ich möchte den Fisch nehmen.', es:'Quiero pedir el pescado.', en:'I want to have the fish.' } }
        ]
      }
    },

    'a2.taxi': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Dein Flug geht in zwei Stunden, du hast es eilig. Für die Arbeit brauchst du eine Quittung.', es:'Tu vuelo sale en dos horas y tienes prisa. Necesitas un recibo para el trabajo.', en:'Your flight leaves in two hours and you\'re in a hurry. You need a receipt for work.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Καλημέρα. Πού πάμε;', tr:'Kaliméra. Poú páme?', na:{ de:'Guten Morgen. Wohin geht\'s?', es:'Buenos días. ¿Adónde vamos?', en:'Good morning. Where to?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Κανένα πρόβλημα. Θα σας δώσω απόδειξη στο αεροδρόμιο. Κρατηθείτε!', tr:'Kanéna próvlima. Tha sas dóso apódixi sto aerodrómio. Kratithíte!', na:{ de:'Kein Problem. Die Quittung bekommen Sie am Flughafen. Gut festhalten!', es:'Ningún problema. Le doy el recibo en el aeropuerto. ¡Agárrese!', en:'No problem. I\'ll give you the receipt at the airport. Hold on tight!' } },
      wortschatz: [
        { z:'βιάζομαι', tr:'viázome', na:{ de:'ich habe es eilig', es:'tengo prisa', en:'I\'m in a hurry' } },
        { z:'η πτήση', tr:'i ptísi', na:{ de:'der Flug', es:'el vuelo', en:'the flight' } },
        { z:'η κίνηση', tr:'i kínisi', na:{ de:'der Verkehr', es:'el tráfico', en:'the traffic' } },
        { z:'το ατύχημα', tr:'to atíchima', na:{ de:'der Unfall', es:'el accidente', en:'the accident' } },
        { z:'έγινε', tr:'éyine', na:{ de:'ist passiert', es:'ha pasado', en:'happened' } },
        { z:'πιο γρήγορα', tr:'pio grígora', na:{ de:'schneller', es:'más rápido', en:'faster' } },
        { z:'η διαδρομή', tr:'i diadromí', na:{ de:'die Strecke', es:'el recorrido', en:'the route' } },
        { z:'η απόδειξη', tr:'i apódixi', na:{ de:'die Quittung', es:'el recibo', en:'the receipt' } },
        { z:'θα ήθελα', tr:'tha íthela', na:{ de:'ich hätte gern', es:'me gustaría', en:'I would like' } },
        { z:'η Αττική Οδός', tr:'i Atikí Odós', na:{ de:'die Attiki Odos (Ringautobahn Athens)', es:'la Atiki Odos (la autopista de circunvalación de Atenas)', en:'Attiki Odos (Athens ring motorway)' } },
        { z:'φτάνουμε', tr:'ftánoume', na:{ de:'wir kommen an', es:'llegamos', en:'we arrive' } },
        { z:'το μποτιλιάρισμα', tr:'to botiliárisma', na:{ de:'der Stau', es:'el atasco', en:'the traffic jam' } }
      ],
      dialog: {
        rolle: { de:'der Taxifahrer', es:'el taxista', en:'the driver' },
        zeilen: [
          { wer:'spikiu', z:'Καλημέρα. Πού πάμε;', na:{ de:'Guten Morgen. Wohin geht\'s?', es:'Buenos días. ¿Adónde vamos?', en:'Good morning. Where to?' } },
          { wer:'lerner', z:'Στο αεροδρόμιο, παρακαλώ. Βιάζομαι, η πτήση μου φεύγει σε δύο ώρες.', na:{ de:'Zum Flughafen, bitte. Ich habe es eilig, mein Flug geht in zwei Stunden.', es:'Al aeropuerto, por favor. Tengo prisa, mi vuelo sale en dos horas.', en:'To the airport, please. I\'m in a hurry, my flight leaves in two hours.' } },
          { wer:'spikiu', z:'Στην Αττική Οδό έγινε ατύχημα και έχει πολλή κίνηση.', na:{ de:'Auf der Attiki Odos gab es einen Unfall, da ist viel Verkehr.', es:'En la Atiki Odos ha habido un accidente y hay mucho tráfico.', en:'There\'s been an accident on the Attiki Odos and there\'s a lot of traffic.' } },
          { wer:'lerner', z:'Είναι πιο γρήγορα από το κέντρο;', na:{ de:'Ist es durch die Stadt schneller?', es:'¿Es más rápido por el centro?', en:'Is it faster through town?' } },
          { wer:'spikiu', z:'Σήμερα ναι, από τη Μεσογείων. Θα φτάσουμε σε σαράντα λεπτά.', na:{ de:'Heute ja, über die Mesogion. Wir sind in vierzig Minuten da.', es:'Hoy sí, por la avenida Mesogion. Llegaremos en cuarenta minutos.', en:'Today, yes, along Mesogion Avenue. We\'ll be there in forty minutes.' } },
          { wer:'lerner', z:'Τότε πάμε από εκεί. Θα ήθελα και απόδειξη, παρακαλώ.', na:{ de:'Dann fahren wir da lang. Und ich hätte gern eine Quittung, bitte.', es:'Entonces vamos por ahí. Y querría un recibo, por favor.', en:'Then let\'s go that way. And I\'d like a receipt, please.' } }
        ]
      },
      lesetext: {
        z:'Ένας επιβάτης βιαζόταν να πάει στο αεροδρόμιο. Στην Αττική Οδό είχε γίνει ατύχημα και η κίνηση ήταν μεγάλη. Ο ταξιτζής πήγε από τη Μεσογείων, μέσα από την πόλη. Έφτασαν σε σαράντα λεπτά. Ο επιβάτης ζήτησε απόδειξη για τη δουλειά του.',
        na:{ de:'Ein Fahrgast wollte schnell zum Flughafen. Auf der Attiki Odos hatte es einen Unfall gegeben, und es war viel Verkehr. Der Taxifahrer fuhr über die Mesogion, mitten durch die Stadt. Sie kamen in vierzig Minuten an. Der Fahrgast bat um eine Quittung für seine Arbeit.', es:'Un pasajero tenía prisa por llegar al aeropuerto. En la Atiki Odos había habido un accidente y había mucho tráfico. El taxista fue por la avenida Mesogion, por dentro de la ciudad. Llegaron en cuarenta minutos. El pasajero pidió un recibo para el trabajo.', en:'A passenger was in a hurry to get to the airport. There had been an accident on the Attiki Odos and the traffic was heavy. The driver went along Mesogion Avenue, through the city. They arrived in forty minutes. The passenger asked for a receipt for work.' },
        frage:{ de:'Warum nimmt der Fahrer einen anderen Weg?', es:'¿Por qué el taxista va por otro camino?', en:'Why does the driver take another route?' },
        optionen:[
          { na:{ de:'Wegen eines Unfalls', es:'Por un accidente', en:'Because of an accident' }, richtig:true },
          { na:{ de:'Wegen eines Streiks', es:'Por una huelga', en:'Because of a strike' }, richtig:false },
          { na:{ de:'Der Fahrgast will die Stadt sehen', es:'El pasajero quiere ver la ciudad', en:'The passenger wants to see the city' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du es sehr eilig hast, und bitte um eine Quittung. Zwei Sätze.', es:'Di que tienes mucha prisa y pide un recibo. Dos frases.', en:'Say you are in a big hurry and ask for a receipt. Two sentences.' },
        muster:'Βιάζομαι πολύ. Θα ήθελα απόδειξη, παρακαλώ.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'Steigern ist bequem: **πιο** davor, fertig — **πιο** γρήγορα (schneller), **πιο** ελαφρύ (leichter), **πιο** κοντά (näher). Und die höflichste Bitte beginnt mit **θα ήθελα** — „ich hätte gern". Damit klingst du nie fordernd.', es:'Comparar es cómodo: **πιο** delante, como «más» — **πιο** γρήγορα (más rápido), **πιο** ελαφρύ (más ligero), **πιο** κοντά (más cerca). Y la petición más educada empieza con **θα ήθελα** — «querría, me gustaría».', en:'Comparisons are easy: put **πιο** in front, like "more" — **πιο** γρήγορα (faster), **πιο** ελαφρύ (lighter), **πιο** κοντά (closer). And the politest request starts with **θα ήθελα** — "I would like".' },
        beispiele:[
          { z:'Είναι πιο γρήγορα από εδώ.', na:{ de:'Hier lang ist es schneller.', es:'Por aquí es más rápido.', en:'It\'s faster this way.' } },
          { z:'Θα ήθελα απόδειξη.', na:{ de:'Ich hätte gern eine Quittung.', es:'Querría un recibo.', en:'I\'d like a receipt.' } }
        ]
      }
    },

    'a2.wegbeschreibung': {
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Du bist in Athen und suchst das Akropolis-Museum. Du gehst gern zu Fuß.', es:'Estás en Atenas y buscas el Museo de la Acrópolis. Te gusta ir a pie.', en:'You\'re in Athens looking for the Acropolis Museum. You like to walk.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Ναι; Ψάχνετε κάτι;', tr:'Ne? Psáchnete káti?', na:{ de:'Ja? Suchen Sie etwas?', es:'¿Sí? ¿Busca algo?', en:'Yes? Are you looking for something?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Βεβαίως, δέκα λεπτά είναι. Αν χαθείτε, ρωτήστε στο περίπτερο!', tr:'Vevéos, déka leptá íne. An chathíte, rotíste sto períptero!', na:{ de:'Natürlich, das sind zehn Minuten. Wenn Sie sich verlaufen, fragen Sie am Kiosk!', es:'Claro, son diez minutos. ¡Si se pierde, pregunte en el quiosco!', en:'Of course, it\'s ten minutes. If you get lost, ask at the kiosk!' } },
      wortschatz: [
        { z:'το μουσείο', tr:'to mousío', na:{ de:'das Museum', es:'el museo', en:'the museum' } },
        { z:'μέχρι', tr:'méchri', na:{ de:'bis', es:'hasta', en:'as far as' } },
        { z:'στρίβω', tr:'strívo', na:{ de:'abbiegen', es:'girar', en:'to turn' } },
        { z:'στρίψτε', tr:'strípste', na:{ de:'biegen Sie ab', es:'gire', en:'turn (polite)' } },
        { z:'συνεχίζω', tr:'sinechízo', na:{ de:'weitergehen', es:'seguir', en:'to carry on' } },
        { z:'ίσια', tr:'ísia', na:{ de:'geradeaus', es:'recto', en:'straight' } },
        { z:'περνάω', tr:'pernáo', na:{ de:'überqueren, vorbeigehen', es:'cruzar, pasar', en:'to cross, to pass' } },
        { z:'η γωνία', tr:'i gonía', na:{ de:'die Ecke', es:'la esquina', en:'the corner' } },
        { z:'απέναντι από', tr:'apénandi apó', na:{ de:'gegenüber von', es:'enfrente de', en:'opposite' } },
        { z:'δίπλα σε', tr:'dípla se', na:{ de:'neben', es:'al lado de', en:'next to' } },
        { z:'το μετρό', tr:'to metró', na:{ de:'die U-Bahn', es:'el metro', en:'the underground' } },
        { z:'χάνομαι', tr:'chánome', na:{ de:'sich verlaufen', es:'perderse', en:'to get lost' } }
      ],
      dialog: {
        rolle: { de:'ein Passant', es:'un transeúnte', en:'a passer-by' },
        zeilen: [
          { wer:'spikiu', z:'Ναι; Ψάχνετε κάτι;', na:{ de:'Ja? Suchen Sie etwas?', es:'¿Sí? ¿Busca algo?', en:'Yes? Are you looking for something?' } },
          { wer:'lerner', z:'Συγγνώμη, πώς πάω στο Μουσείο της Ακρόπολης;', na:{ de:'Entschuldigung, wie komme ich zum Akropolis-Museum?', es:'Perdone, ¿cómo llego al Museo de la Acrópolis?', en:'Excuse me, how do I get to the Acropolis Museum?' } },
          { wer:'spikiu', z:'Πάρτε αυτόν τον δρόμο ευθεία μέχρι το φανάρι. Εκεί στρίψτε αριστερά.', na:{ de:'Gehen Sie diese Straße geradeaus bis zur Ampel. Dort biegen Sie links ab.', es:'Siga esta calle todo recto hasta el semáforo. Allí gire a la izquierda.', en:'Take this street straight on as far as the lights. Turn left there.' } },
          { wer:'lerner', z:'Και μετά;', na:{ de:'Und danach?', es:'¿Y después?', en:'And then?' } },
          { wer:'spikiu', z:'Συνεχίστε ίσια, περάστε την πλατεία, και το μουσείο είναι στη γωνία, απέναντι από το μετρό.', na:{ de:'Gehen Sie geradeaus weiter, über den Platz, und das Museum ist an der Ecke, gegenüber der U-Bahn.', es:'Siga recto, cruce la plaza, y el museo está en la esquina, enfrente del metro.', en:'Carry straight on, cross the square, and the museum is on the corner, opposite the underground station.' } },
          { wer:'lerner', z:'Μπορώ να πάω με τα πόδια;', na:{ de:'Kann ich zu Fuß gehen?', es:'¿Puedo ir a pie?', en:'Can I walk there?' } }
        ]
      },
      lesetext: {
        z:'Χθες μια τουρίστρια έψαχνε το Μουσείο της Ακρόπολης. Ρώτησε έναν κύριο στον δρόμο. Εκείνος της είπε να πάει ευθεία μέχρι το φανάρι και να στρίψει αριστερά. Το μουσείο ήταν στη γωνία, απέναντι από το μετρό. Πήγε με τα πόδια — μόνο δέκα λεπτά.',
        na:{ de:'Gestern hat eine Touristin das Akropolis-Museum gesucht. Sie hat einen Herrn auf der Straße gefragt. Er hat ihr gesagt, sie soll geradeaus bis zur Ampel gehen und links abbiegen. Das Museum war an der Ecke, gegenüber der U-Bahn. Sie ist zu Fuß gegangen — nur zehn Minuten.', es:'Ayer una turista buscaba el Museo de la Acrópolis. Le preguntó a un señor en la calle. Él le dijo que fuera todo recto hasta el semáforo y que girara a la izquierda. El museo estaba en la esquina, enfrente del metro. Fue a pie: solo diez minutos.', en:'Yesterday a tourist was looking for the Acropolis Museum. She asked a man in the street. He told her to go straight on to the lights and turn left. The museum was on the corner, opposite the underground station. She walked — only ten minutes.' },
        frage:{ de:'Wo ist das Museum?', es:'¿Dónde está el museo?', en:'Where is the museum?' },
        optionen:[
          { na:{ de:'An der Ecke, gegenüber der U-Bahn', es:'En la esquina, enfrente del metro', en:'On the corner, opposite the underground' }, richtig:true },
          { na:{ de:'Neben dem Kiosk', es:'Al lado del quiosco', en:'Next to the kiosk' }, richtig:false },
          { na:{ de:'Hinter der Ampel rechts', es:'Pasado el semáforo, a la derecha', en:'Past the lights on the right' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, wie du zum Hafen kommst und ob du zu Fuß gehen kannst. Zwei Sätze.', es:'Pregunta cómo llegar al puerto y si puedes ir a pie. Dos frases.', en:'Ask how to get to the port and whether you can walk. Two sentences.' },
        muster:'Συγγνώμη, πώς πάω στο λιμάνι; Μπορώ να πάω με τα πόδια;'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'In Wegbeschreibungen hörst du lauter Aufforderungen auf **-τε**: **πάρτε**, **στρίψτε**, **περάστε**, **συνεχίστε**. Das ist die höfliche Form, wie „Sie". Zu einem Freund sagt man πάρε, στρίψε, πέρασε. Du musst sie nicht bilden — nur erkennen, dann findest du jedes Museum.', es:'En las indicaciones oirás muchas órdenes acabadas en **-τε**: **πάρτε** (coja), **στρίψτε** (gire), **περάστε** (cruce), **συνεχίστε** (siga). Es la forma de usted. A un amigo: πάρε, στρίψε, πέρασε. No hace falta formarlas: basta con reconocerlas.', en:'In directions you\'ll hear lots of instructions ending in **-τε**: **πάρτε** (take), **στρίψτε** (turn), **περάστε** (cross), **συνεχίστε** (carry on). That\'s the polite form. To a friend: πάρε, στρίψε, πέρασε. You don\'t need to build them — just recognise them.' },
        beispiele:[
          { z:'Στρίψτε αριστερά.', na:{ de:'Biegen Sie links ab.', es:'Gire a la izquierda.', en:'Turn left.' } },
          { z:'Συνεχίστε ευθεία.', na:{ de:'Gehen Sie geradeaus weiter.', es:'Siga todo recto.', en:'Carry straight on.' } }
        ]
      }
    },

    'a2.wetter': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen. */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. */
      deineRolle: { de:'Ihr wollt am Samstag nach Chalkidiki an den Strand. Du hast die Vorhersage noch nicht gesehen.', es:'Queréis ir el sábado a la playa en Calcídica. Todavía no has visto la previsión.', en:'You want to go to the beach in Halkidiki on Saturday. You haven\'t seen the forecast yet.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Τέλεια! Περνάω να σε πάρω στις δύο. Τα λέμε το Σάββατο!', tr:'Télia! Pernáo na se páro stis dío. Ta léme to Sávato!', na:{ de:'Perfekt! Ich hole dich um zwei ab. Bis Samstag!', es:'¡Perfecto! Paso a recogerte a las dos. ¡Hasta el sábado!', en:'Perfect! I\'ll pick you up at two. See you Saturday!' } },
      wortschatz: [
        { z:'η πρόγνωση', tr:'i prógnosi', na:{ de:'die Vorhersage', es:'la previsión', en:'the forecast' } },
        { z:'εξαρτάται', tr:'exartáte', na:{ de:'es kommt darauf an', es:'depende', en:'it depends' } },
        { z:'θα βρέχει', tr:'tha vréchi', na:{ de:'es wird (eine Weile) regnen', es:'estará lloviendo', en:'it will be raining' } },
        { z:'βγαίνει ήλιος', tr:'vyéni ílios', na:{ de:'die Sonne kommt heraus', es:'sale el sol', en:'the sun comes out' } },
        { z:'φυσάει', tr:'fisái', na:{ de:'es ist windig', es:'hace viento', en:'it\'s windy' } },
        { z:'η συννεφιά', tr:'i sinefiá', na:{ de:'die Bewölkung', es:'el cielo nublado', en:'cloudy weather' } },
        { z:'η μπόρα', tr:'i bóra', na:{ de:'der Schauer', es:'el chaparrón', en:'the shower' } },
        { z:'το μπουφάν', tr:'to boufán', na:{ de:'die Jacke', es:'la chaqueta', en:'the jacket' } },
        { z:'για καλό και για κακό', tr:'ya kaló ke ya kakó', na:{ de:'sicherheitshalber', es:'por si acaso', en:'just in case' } },
        { z:'η παραλία', tr:'i paralía', na:{ de:'der Strand', es:'la playa', en:'the beach' } },
        { z:'το πρωί', tr:'to proí', na:{ de:'am Morgen', es:'por la mañana', en:'in the morning' } },
        { z:'το απόγευμα', tr:'to apóyevma', na:{ de:'am Nachmittag', es:'por la tarde', en:'in the afternoon' } }
      ],
      dialog: {
        rolle: { de:'ein Freund', es:'un amigo', en:'a friend' },
        zeilen: [
          { wer:'spikiu', z:'Πάμε στη Χαλκιδική το Σάββατο;', na:{ de:'Fahren wir am Samstag nach Chalkidiki?', es:'¿Vamos a Calcídica el sábado?', en:'Shall we go to Halkidiki on Saturday?' } },
          { wer:'lerner', z:'Εξαρτάται από τον καιρό. Είδες την πρόγνωση;', na:{ de:'Kommt aufs Wetter an. Hast du die Vorhersage gesehen?', es:'Depende del tiempo. ¿Has visto la previsión?', en:'Depends on the weather. Have you seen the forecast?' } },
          { wer:'spikiu', z:'Το πρωί θα βρέχει, λέει.', na:{ de:'Am Morgen soll es regnen.', es:'Dicen que por la mañana lloverá.', en:'It\'s supposed to rain in the morning.' } },
          { wer:'lerner', z:'Και το απόγευμα;', na:{ de:'Und am Nachmittag?', es:'¿Y por la tarde?', en:'And in the afternoon?' } },
          { wer:'spikiu', z:'Το απόγευμα θα βγει ήλιος, αλλά θα φυσάει λίγο.', na:{ de:'Nachmittags kommt die Sonne raus, aber es wird etwas windig.', es:'Por la tarde saldrá el sol, pero hará un poco de viento.', en:'In the afternoon the sun will come out, but it\'ll be a bit windy.' } },
          { wer:'lerner', z:'Τότε πάμε το απόγευμα. Θα πάρω κι ένα μπουφάν, για καλό και για κακό.', na:{ de:'Dann fahren wir nachmittags. Ich nehme sicherheitshalber eine Jacke mit.', es:'Entonces vamos por la tarde. Me llevaré una chaqueta, por si acaso.', en:'Then let\'s go in the afternoon. I\'ll bring a jacket, just in case.' } }
        ]
      },
      lesetext: {
        z:'Δύο φίλοι θέλουν να πάνε στη Χαλκιδική το Σάββατο. Η πρόγνωση λέει ότι το πρωί θα βρέχει. Το απόγευμα όμως θα βγει ήλιος. Γι\' αυτό θα φύγουν μετά το μεσημέρι και θα πάρουν ένα μπουφάν για καλό και για κακό. Θα ξεκινήσουν στις δύο.',
        na:{ de:'Zwei Freunde wollen am Samstag nach Chalkidiki fahren. Laut Vorhersage regnet es am Morgen. Am Nachmittag aber kommt die Sonne heraus. Darum fahren sie erst nach Mittag los und nehmen sicherheitshalber eine Jacke mit. Sie starten um zwei.', es:'Dos amigos quieren ir a Calcídica el sábado. La previsión dice que por la mañana lloverá. Pero por la tarde saldrá el sol. Por eso saldrán después de mediodía y se llevarán una chaqueta por si acaso. Salen a las dos.', en:'Two friends want to go to Halkidiki on Saturday. The forecast says it will rain in the morning. In the afternoon, though, the sun will come out. So they\'ll leave after midday and take a jacket just in case. They set off at two.' },
        frage:{ de:'Wann fahren sie los?', es:'¿Cuándo salen?', en:'When do they set off?' },
        optionen:[
          { na:{ de:'Am Nachmittag, um zwei', es:'Por la tarde, a las dos', en:'In the afternoon, at two' }, richtig:true },
          { na:{ de:'Am frühen Morgen', es:'Por la mañana temprano', en:'Early in the morning' }, richtig:false },
          { na:{ de:'Am Sonntag', es:'El domingo', en:'On Sunday' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag nach der Vorhersage und schlag etwas für den Nachmittag vor. Zwei Sätze.', es:'Pregunta por la previsión y propón algo para la tarde. Dos frases.', en:'Ask about the forecast and suggest something for the afternoon. Two sentences.' },
        muster:'Είδες την πρόγνωση; Πάμε στην παραλία το απόγευμα.'
      },
      grammatik: {
        titel: GRAMMATIK_TITEL,
        text:{ de:'**Πάμε** ist Gold wert: Es heißt „wir gehen" und zugleich „gehen wir!" — **πάμε** το απόγευμα. Und für die Vorhersage hängen Griechen einfach **λέει** an: θα βρέχει, **λέει** — es soll regnen, sagt man. Ein Wort, und du bist für nichts verantwortlich.', es:'**Πάμε** vale oro: significa «vamos» y también «¡vamos!» — **πάμε** το απόγευμα = vamos por la tarde. Y para la previsión los griegos añaden **λέει**: θα βρέχει, **λέει** — dicen que lloverá. Una palabra y ya no es culpa tuya.', en:'**Πάμε** is gold: it means "we go" and also "let\'s go!" — **πάμε** το απόγευμα. And for forecasts Greeks just add **λέει**: θα βρέχει, **λέει** — it\'s supposed to rain, they say. One word, and it\'s not your fault.' },
        beispiele:[
          { z:'Πάμε στη θάλασσα!', na:{ de:'Gehen wir ans Meer!', es:'¡Vamos a la playa!', en:'Let\'s go to the sea!' } },
          { z:'Θα βρέχει, λέει.', na:{ de:'Es soll regnen, heißt es.', es:'Dicen que va a llover.', en:'It\'s supposed to rain, they say.' } }
        ]
      }
    }

  };

  raum.SpikiuLernpfadEL = {
    zielsprache: 'el',
    themen: THEMEN,
    stufen: STUFEN,
    kategorien: KATEGORIEN,
    rollen: ROLLEN,
    aufgaben: AUFGABEN,
    schritt: SCHRITT,
    stationen: STATIONEN,

    aufgabenVon: function (stufe, thema) { return AUFGABEN[stufe + '.' + thema] || []; },
    rolle: function (thema) { return ROLLEN[thema] || null; },
    thema: function (id) {
      for (var i = 0; i < THEMEN.length; i++) if (THEMEN[i].id === id) return THEMEN[i];
      return null;
    },
    station: function (stufe, thema) { return STATIONEN[stufe + '.' + thema] || null; },
    gefuellt: function (stufe, thema) { return !!STATIONEN[stufe + '.' + thema]; },

    eroeffnungVon: function (stufe, thema) {
      var S = STATIONEN[stufe + '.' + thema];
      if (!S) return null;
      if (S.eroeffnung) return S.eroeffnung;
      var z = (S.dialog && S.dialog.zeilen) || [];
      return (z[0] && z[0].wer === 'spikiu') ? z[0] : null;
    },
    /* Was in dieser Szene gilt — in der Sprache des Lerners. */
    duzt: function (stufe, thema) {
      var S = STATIONEN[stufe + '.' + thema];
      return !!(S && S.duzen);
    },

    rolleFaktenVon: function (stufe, thema, muttersprache) {
      var S = STATIONEN[stufe + '.' + thema];
      if (!S || !S.deineRolle) return '';
      var mu = muttersprache || 'de';
      return S.deineRolle[mu] || S.deineRolle.de || S.deineRolle.en || '';
    },

    abrundungVon: function (stufe, thema) {
      var S = STATIONEN[stufe + '.' + thema];
      return (S && S.abrundung) || null;
    },

    ernte: function (stufe, thema, muttersprache) {
      var S = STATIONEN[stufe + '.' + thema];
      if (!S) return [];
      var mu = muttersprache || 'de';
      var out = [], gesehen = {};
      function nimm(z, na, art) {
        var k = String(z).trim().toLowerCase();
        if (!k || gesehen[k]) return;
        gesehen[k] = 1;
        out.push({ z: String(z).trim(), na: na, art: art });
      }
      function art(t) {
        var x = String(t).trim();
        if (/[?!.,;]/.test(x)) return 'wendung';
        return x.split(/\s+/).length > 2 ? 'wendung' : 'wort';
      }
      ((S.dialog && S.dialog.zeilen) || []).forEach(function (z) {
        nimm(z.z, (z.na && (z.na[mu] || z.na.en)) || '', 'wendung');
      });
      (S.wortschatz || []).forEach(function (w) {
        nimm(w.z, (w.na && (w.na[mu] || w.na.en)) || '', art(w.z));
      });
      return out;
    },

    woerter: function (stufe, thema, muttersprache) {
      var S = STATIONEN[stufe + '.' + thema];
      if (!S) return [];
      var mu = muttersprache || 'de';
      return (S.wortschatz || []).map(function (w) {
        return { z: w.z, tr: w.tr, na: (w.na && (w.na[mu] || w.na.en)) || '' };
      });
    }
  };

})(typeof window !== 'undefined' ? window : globalThis);
