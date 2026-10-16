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

  /* b1 = KRONE (16.10.2026), siehe unten „B1 · KRONE“. */
  var STUFEN = ['a1', 'a2', 'b1'];

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

  /* ══════════════════════════════════════════════════════════════════
     B1 · KRONE · «ΦΩΣ» (Leo, 16.10.2026: „Aprobado … Dale con todos.“)
     Elli Hartmann, Schriftstellerin aus Hamburg (Leo, 16.10.2026: „Elli, escritora alemana“), schreibt einen Roman über das Licht Griechenlands: hotel Athen · wegbeschreibung Meteora · wetter Pilion · cafe Korfu · familie Ikaria · arzt Chania · einkaufen Rhodos · restaurant Santorini · bahnhof Athen→Thessaloniki · taxi Zypern (ohne Politik). Umschrift tr wie in A1/A2.
     Dieselben zehn Themen, neue Handlung, neuer Ort. Keine Politik.
     Neue Felder wie im spanischen B1: rollen (Rollenkarte der Station) und
     kultur (ein Satz zum Ort, „Gut zu wissen“). Roman dazu: learnroman-elli.js „Φως“.
     ══════════════════════════════════════════════════════════════════ */
var K_LP_A = {
  schritt: {
    hotel: { de:'Athen: eine kleine Wohnung für einen Monat', es:'Atenas: un pisito para un mes', en:'Athens: a small flat for a month', el:'Αθήνα: ένα μικρό διαμέρισμα για έναν μήνα' },
    wegbeschreibung: { de:'Meteora: einen Weg verstehen und weitersagen', es:'Meteora: entender un camino y contarlo', en:'Meteora: following directions and passing them on', el:'Μετέωρα: καταλαβαίνεις τον δρόμο και τον μεταφέρεις' },
    wetter: { de:'Pilion: planen, wenn der Regen kommt', es:'Pelión: hacer planes cuando llega la lluvia', en:'Pelion: planning when the rain is coming', el:'Πήλιο: σχέδια όταν έρχεται η βροχή' },
    cafe: { de:'Korfu: Meinungen unter den Arkaden', es:'Corfú: opiniones bajo los soportales', en:'Corfu: opinions under the arcades', el:'Κέρκυρα: γνώμες κάτω από τις καμάρες' },
    familie: { de:'Ikaria: von früher erzählen — einmal und immer wieder', es:'Icaria: contar el pasado, una vez y una y otra vez', en:'Ikaria: telling the past — once, and over and over', el:'Ικαρία: αφηγείσαι το παρελθόν' }
  },
  aufgaben: {
    'b1.hotel': [
      { de:'Bejahe, sag, dass du die Wohnung gern sehen würdest und etwas Ruhiges suchst', es:'Di que sí, que te gustaría ver el piso y que buscas algo que sea tranquilo', en:'Say yes, that you’d like to see the flat and are looking for something quiet', el:'Πες ναι, ότι θα ήθελες να δεις το διαμέρισμα και ότι ψάχνεις κάτι ήσυχο' },
      { de:'Frag, ob die Nebenkosten (κοινόχρηστα) und der Strom in der Miete enthalten sind', es:'Pregunta si los gastos de comunidad (κοινόχρηστα) y la luz están incluidos en el alquiler', en:'Ask whether the shared building costs (κοινόχρηστα) and the electricity are included in the rent', el:'Ρώτα αν τα κοινόχρηστα και το ρεύμα περιλαμβάνονται στο ενοίκιο' },
      { de:'Stimme zu und sag, dass du am Donnerstag einziehen möchtest, wenn es ihr passt', es:'Di que de acuerdo y que te gustaría mudarte el jueves, si le viene bien', en:'Agree and say you’d like to move in on Thursday, if that suits her', el:'Συμφώνησε και πες ότι θα ήθελες να μετακομίσεις την Πέμπτη, αν της βολεύει' }
    ],
    'b1.wegbeschreibung': [
      { de:'Grüß den Mönch, sag, dass du zu Fuß nach Varlaam gehen möchtest, und frag nach dem Weg', es:'Saluda al monje, di que te gustaría ir a pie a Varlaam y pregunta por dónde se va', en:'Greet the monk, say you’d like to walk to Varlaam and ask which way to go', el:'Χαιρέτησε τον μοναχό, πες ότι θα ήθελες να πας με τα πόδια στο Βαρλαάμ και ρώτα από πού πας' },
      { de:'Frag, ob du einen Rock tragen musst — man hat dir von einer Kleiderregel erzählt', es:'Pregunta si tienes que llevar falda: te dijeron que hay una norma para la ropa', en:'Ask whether you have to wear a skirt — you were told there is a dress code', el:'Ρώτα αν πρέπει να φορέσεις φούστα· σου είπαν ότι υπάρχει κανόνας για τα ρούχα' },
      { de:'Fass zusammen, was er gesagt hat: Du musst vor drei dort sein — und bedank dich', es:'Resume lo que te ha dicho: tienes que estar allí antes de las tres, y dale las gracias', en:'Sum up what he told you: you have to be there before three — and thank him', el:'Επανάλαβε αυτό που σου είπε: πρέπει να είσαι εκεί πριν από τις τρεις — και ευχαρίστησέ τον' }
    ],
    'b1.wetter': [
      { de:'Frag Thanasis, ob du es schaffst, den Steinweg hinunterzugehen, bevor es regnet', es:'Pregúntale a Thanasis si te dará tiempo a bajar el camino empedrado antes de que llueva', en:'Ask Thanasis whether you’ll make it down the stone path before it rains', el:'Ρώτα τον Θανάση αν θα προλάβεις να κατέβεις το καλντερίμι πριν βρέξει' },
      { de:'Stimme zu und sag: Wenn es regnet, fährst du mit dem Bus von Ano Volos zurück', es:'Di que vale y que, si llueve, volverás en autobús desde Ano Volos', en:'Agree and say that if it’s raining, you’ll come back by bus from Ano Volos', el:'Συμφώνησε και πες ότι, αν βρέχει, θα γυρίσεις με το λεωφορείο από τον Άνω Βόλο' },
      { de:'Sag, dass du vor der Dunkelheit zurück bist und am Kamin schreiben wirst', es:'Di que volverás antes de que oscurezca y que escribirás junto a la chimenea', en:'Say you’ll be back before dark and will write by the fire', el:'Πες ότι θα γυρίσεις πριν σκοτεινιάσει και ότι θα γράψεις δίπλα στο τζάκι' }
    ],
    'b1.cafe': [
      { de:'Sag, dass es dir sehr gefällt und dass du glaubst, hier unter den Arkaden besser zu schreiben', es:'Di que te gusta muchísimo y que crees que aquí, bajo los soportales, escribes mejor', en:'Say you like it very much and that you think you write better here under the arcades', el:'Πες ότι σου αρέσει πάρα πολύ και ότι νομίζεις πως εδώ, κάτω από τις καμάρες, γράφεις καλύτερα' },
      { de:'Sag: ein bisschen — du glaubst nicht, dass du sie gut kennst, und frag, was er empfiehlt', es:'Di que un poco, que no crees que la conozcas bien, y pregunta qué te recomienda', en:'Say a little — you don’t think you know it well — and ask what he recommends', el:'Πες «λίγο», ότι δεν νομίζεις ότι την ξέρεις καλά, και ρώτα τι σου προτείνει' },
      { de:'Sag, deiner Meinung nach sind Likör und Kantada eine perfekte Kombination, und biete an, ihn einzuladen', es:'Di que, en tu opinión, licor y kantada son la combinación perfecta, y ofrécete a invitarle', en:'Say that in your opinion liqueur and a kantada are the perfect combination, and offer to treat him', el:'Πες ότι, κατά τη γνώμη σου, το λικέρ με την καντάδα είναι τέλειος συνδυασμός, και πρότεινε να τον κεράσεις' }
    ],
    'b1.familie': [
      { de:'Bejahe: deine Freundin Margarete ist 82 und lebt in Hamburg', es:'Di que sí: tu amiga Margarete tiene 82 años y vive en Hamburgo', en:'Say yes: your friend Margarete is 82 and lives in Hamburg', el:'Πες ναι: η φίλη σου η Μαργκαρέτε είναι 82 χρονών και μένει στο Αμβούργο' },
      { de:'Erzähl, dass du sie in der Schule kennengelernt hast: Sie war deine Lehrerin und hat dir eine alte griechische Schallplatte geschenkt', es:'Cuenta que la conociste en el colegio: era tu profesora y te regaló un disco griego antiguo', en:'Tell how you met her at school: she was your teacher and gave you an old Greek record', el:'Διηγήσου ότι τη γνώρισες στο σχολείο: ήταν η δασκάλα σου και σου χάρισε έναν παλιό ελληνικό δίσκο' },
      { de:'Sag „ständig!“: Als du klein warst, hat sie dir Karten aus Griechenland geschickt', es:'Di «¡todo el rato!»: cuando eras pequeña, ella te mandaba postales desde Grecia', en:'Say “all the time!”: when you were little, she used to send you postcards from Greece', el:'Πες «συνέχεια!»: όταν ήσουν μικρή, σου έστελνε εκείνη κάρτες από την Ελλάδα' }
    ]
  },
  stationen: {
    'b1.hotel': {
      deineRolle: { de:'Du bist in Athen und suchst für einen Monat eine kleine möblierte Wohnung — ruhig soll sie sein. Einziehen möchtest du am Donnerstag.', es:'Estás en Atenas y buscas un pisito amueblado para un mes; tiene que ser tranquilo. Te gustaría entrar a vivir el jueves.', en:'You are in Athens looking for a small furnished flat for one month — it should be quiet. You would like to move in on Thursday.' },
      abrundung: {
        z: 'Με βολεύει μια χαρά! Ορίστε τα κλειδιά — και απόψε βγείτε στο μπαλκόνι να δείτε το φως.',
        tr: 'Me volévi mia chará! Oríste ta klidiá — ke apópse vyíte sto balkóni na díte to fos.',
        na: { de:'Passt mir wunderbar! Hier sind die Schlüssel — und heute Abend gehen Sie auf den Balkon und schauen sich das Licht an.', es:'¡Me viene de maravilla! Aquí tiene las llaves, y esta noche salga al balcón a ver la luz.', en:'That suits me perfectly! Here are the keys — and tonight, step out onto the balcony and look at the light.' }
      },
      rollen: {
        spikiu: { de:'die Vermieterin, Frau Evanthia', es:'la casera, la señora Evanthía', en:'the landlady, Mrs Evanthia', el:'η σπιτονοικοκυρά, η κυρία Ευανθία' },
        lerner: { de:'die Schriftstellerin auf Wohnungssuche', es:'la escritora que busca piso', en:'the writer looking for a flat', el:'η συγγραφέας που ψάχνει σπίτι' },
        ort: { de:'in einem alten Wohnhaus in Koukaki, mit Blick auf die Akropolis', es:'en un edificio antiguo de Kukaki, con vistas a la Acrópolis', en:'in an old apartment building in Koukaki, with a view of the Acropolis', el:'σε μια παλιά πολυκατοικία στο Κουκάκι, με θέα στην Ακρόπολη' }
      },
      wortschatz: [
        { z:'το διαμέρισμα', tr:'to diamérisma', na:{ de:'die Wohnung', es:'el piso', en:'the flat' } },
        { z:'επιπλωμένο', tr:'epiploméno', na:{ de:'möbliert', es:'amueblado', en:'furnished' } },
        { z:'το ενοίκιο', tr:'to eníkio', na:{ de:'die Miete', es:'el alquiler', en:'the rent' } },
        { z:'η εγγύηση', tr:'i engíisi', na:{ de:'die Kaution', es:'la fianza', en:'the deposit' } },
        { z:'τα κοινόχρηστα', tr:'ta kinóchrista', na:{ de:'die Nebenkosten des Hauses', es:'los gastos de comunidad', en:'the building’s shared costs' } },
        { z:'το συμβόλαιο', tr:'to simvóleo', na:{ de:'der Vertrag', es:'el contrato', en:'the contract' } },
        { z:'υπογράφω', tr:'ipográfo', na:{ de:'unterschreiben', es:'firmar', en:'to sign' } },
        { z:'το ρεύμα', tr:'to révma', na:{ de:'der Strom', es:'la luz (electricidad)', en:'the electricity' } },
        { z:'η σπιτονοικοκυρά', tr:'i spitonikokirá', na:{ de:'die Vermieterin', es:'la casera', en:'the landlady' } },
        { z:'θα ήθελα να …', tr:'tha íthela na …', na:{ de:'ich würde gern …', es:'me gustaría …', en:'I’d like to …' } },
        { z:'ψάχνω κάτι που να …', tr:'psáchno káti pou na …', na:{ de:'ich suche etwas, das …', es:'busco algo que …', en:'I’m looking for something that …' } },
        { z:'με βολεύει', tr:'me volévi', na:{ de:'das passt mir', es:'me viene bien', en:'it suits me' } }
      ],
      dialog: {
        rolle: { de:'Die Vermieterin, Frau Evanthia', es:'La casera, la señora Evanthía', en:'The landlady, Mrs Evanthia' },
        zeilen: [
          {
            wer: 'spikiu',
            z: 'Καλησπέρα, περάστε! Εσείς μου τηλεφωνήσατε χθες για το διαμέρισμα;',
            tr: 'Kalispéra, peráste! Esís mou tilefonísate chthes ya to diamérisma?',
            na: { de:'Guten Abend, kommen Sie herein! Haben Sie mich gestern wegen der Wohnung angerufen?', es:'¡Buenas tardes, pase! ¿Es usted quien me llamó ayer por el piso?', en:'Good evening, come in! Was it you who called me yesterday about the flat?' }
          },
          {
            wer: 'lerner',
            z: 'Ναι, εγώ. Θα ήθελα να το δω· ψάχνω κάτι που να είναι ήσυχο.',
            tr: 'Ne, egó. Tha íthela na to do; psáchno káti pou na íne ísicho.',
            na: { de:'Ja, ich. Ich würde sie gern sehen; ich suche etwas, das ruhig ist.', es:'Sí, yo. Me gustaría verlo; busco algo que sea tranquilo.', en:'Yes, me. I’d like to see it; I’m looking for something quiet.' }
          },
          {
            wer: 'spikiu',
            z: 'Είναι πολύ ήσυχο, και από το μπαλκόνι φαίνεται η Ακρόπολη. Το ενοίκιο είναι εξακόσια ευρώ.',
            tr: 'Íne polí ísicho, ke apó to balkóni fénete i Akrópoli. To eníkio íne exakósia evró.',
            na: { de:'Sie ist sehr ruhig, und vom Balkon aus sieht man die Akropolis. Die Miete beträgt sechshundert Euro.', es:'Es muy tranquilo, y desde el balcón se ve la Acrópolis. El alquiler son seiscientos euros.', en:'It’s very quiet, and you can see the Acropolis from the balcony. The rent is six hundred euros.' }
          },
          {
            wer: 'lerner',
            z: 'Τα κοινόχρηστα και το ρεύμα περιλαμβάνονται στο ενοίκιο;',
            tr: 'Ta kinóchrista ke to révma perilamvánonde sto eníkio?',
            na: { de:'Sind die Nebenkosten und der Strom in der Miete enthalten?', es:'¿Los gastos de comunidad y la luz están incluidos en el alquiler?', en:'Are the shared building costs and the electricity included in the rent?' }
          },
          {
            wer: 'spikiu',
            z: 'Τα κοινόχρηστα ναι, το ρεύμα όχι. Ζητάω ένα ενοίκιο εγγύηση και κάνουμε ένα απλό συμβόλαιο.',
            tr: 'Ta kinóchrista ne, to révma óchi. Zitáo éna eníkio engíisi ke kánoume éna apló simvóleo.',
            na: { de:'Die Nebenkosten ja, den Strom nicht. Ich bitte um eine Monatsmiete Kaution, und wir machen einen einfachen Vertrag.', es:'Los gastos de comunidad sí, la luz no. Le pido un mes de fianza y hacemos un contrato sencillo.', en:'The shared costs yes, the electricity no. I ask for one month’s rent as a deposit, and we make a simple contract.' }
          },
          {
            wer: 'lerner',
            z: 'Εντάξει. Θα ήθελα να μετακομίσω την Πέμπτη, αν σας βολεύει.',
            tr: 'Endáxi. Tha íthela na metakomíso tin Pémpti, an sas volévi.',
            na: { de:'In Ordnung. Ich würde gern am Donnerstag einziehen, wenn es Ihnen passt.', es:'De acuerdo. Me gustaría mudarme el jueves, si le viene bien.', en:'All right. I’d like to move in on Thursday, if that suits you.' }
          }
        ]
      },
      lesetext: {
        z: 'Σήμερα νοίκιασα ένα μικρό διαμέρισμα στο Κουκάκι. Όταν είπα ότι ψάχνω μια ήσυχη «οικία», η κυρία Ευανθία γέλασε: «Εδώ λέμε απλώς σπίτι!» Το έγραψα στην τελευταία σελίδα του σημειωματάριου. Το βράδυ, από το μπαλκόνι, η Ακρόπολη έγινε πρώτα χρυσή και μετά ροζ.',
        tr: 'Símera níkiasa éna mikró diamérisma sto Koukáki. Ótan ípa óti psáchno mia ísichi «ikía», i kiría Evanthía yélase: «Edó léme aplós spíti!» To égrapsa stin teleftéa selída tou simiomatáriou. To vrádi, apó to balkóni, i Akrópoli éyine próta chrisí ke metá roz.',
        na: { de:'Heute habe ich eine kleine Wohnung in Koukaki gemietet. Als ich sagte, ich suche eine ruhige „οικία“ (Behausung, sehr gehoben), lachte Frau Evanthia: „Hier sagen wir einfach σπίτι!“ Ich habe es auf die letzte Seite meines Notizbuchs geschrieben. Am Abend wurde die Akropolis, vom Balkon aus gesehen, erst golden und dann rosa.', es:'Hoy he alquilado un pisito en Kukaki. Cuando dije que buscaba una «οικία» (morada, palabra muy culta) tranquila, la señora Evanthía se rio: «¡Aquí decimos simplemente σπίτι!». Lo apunté en la última página del cuaderno. Por la noche, desde el balcón, la Acrópolis se volvió primero dorada y luego rosa.', en:'Today I rented a small flat in Koukaki. When I said I was looking for a quiet “οικία” (dwelling, a very bookish word), Mrs Evanthia laughed: “Here we just say σπίτι!” I wrote it on the last page of my notebook. In the evening, from the balcony, the Acropolis turned first golden and then pink.' },
        frage: { de:'Welche Farbe hatte die Akropolis zuerst?', es:'¿De qué color se volvió primero la Acrópolis?', en:'What colour did the Acropolis turn first?' },
        optionen: [
          { na:{ de:'Golden', es:'Dorada', en:'Golden' }, richtig:true },
          { na:{ de:'Rosa', es:'Rosa', en:'Pink' }, richtig:false },
          { na:{ de:'Weiß', es:'Blanca', en:'White' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag: { de:'Schreib einer Vermieterin: Du suchst etwas mit Balkon und möchtest wissen, ob die Nebenkosten in der Miete enthalten sind. Zwei Sätze.', es:'Escríbele a una casera: buscas algo que tenga balcón y quieres saber si los gastos de comunidad están incluidos en el alquiler. Dos frases.', en:'Write to a landlady: you are looking for something with a balcony and want to know whether the shared costs are included in the rent. Two sentences.' },
        muster: 'Καλησπέρα σας, ψάχνω κάτι που να έχει μπαλκόνι. Τα κοινόχρηστα περιλαμβάνονται στο ενοίκιο;'
      },
      grammatik: {
        titel: { de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text: { de:'Die höfliche Bitte heißt «θα ήθελα να» + Verb: θα ήθελα να δω, θα ήθελα να μετακομίσω — „ich würde gern …“. Und wer etwas sucht, das er noch nicht gefunden hat, sagt «ψάχνω κάτι που να» …: ψάχνω κάτι που «να» είναι ήσυχο. Das kleine να zeigt: Es ist ein Wunsch, noch keine Wirklichkeit. «Τα κοινόχρηστα» sind die gemeinsamen Kosten des Hauses — Aufzug, Treppenhaus, oft auch die Heizung.', es:'La petición cortés es «θα ήθελα να» + verbo: θα ήθελα να δω, θα ήθελα να μετακομίσω — «me gustaría…». Y cuando buscas algo que aún no has encontrado, dices «ψάχνω κάτι που να» …: ψάχνω κάτι που «να» είναι ήσυχο, igual que el subjuntivo de «busco algo que sea tranquilo». «Τα κοινόχρηστα» son los gastos de comunidad: ascensor, escalera y a menudo la calefacción.', en:'The polite request is «θα ήθελα να» + verb: θα ήθελα να δω, θα ήθελα να μετακομίσω — “I’d like to …”. And when you look for something you haven’t found yet, say «ψάχνω κάτι που να» …: ψάχνω κάτι που «να» είναι ήσυχο. That little να shows it’s a wish, not yet reality. «Τα κοινόχρηστα» are the building’s shared costs — lift, stairwell, often the heating too.' },
        beispiele: [
          { z:'Θα ήθελα να δω το διαμέρισμα.', tr:'Tha íthela na do to diamérisma.', na:{ de:'Ich würde gern die Wohnung sehen.', es:'Me gustaría ver el piso.', en:'I’d like to see the flat.' } },
          { z:'Ψάχνω κάτι που να είναι ήσυχο.', tr:'Psáchno káti pou na íne ísicho.', na:{ de:'Ich suche etwas, das ruhig ist.', es:'Busco algo que sea tranquilo.', en:'I’m looking for something quiet.' } }
        ]
      },
      kultur: { de:'Die meisten Athener wohnen in einer πολυκατοικία, einem Wohnhaus mit Balkonen auf jeder Seite — im Sommer ist der Balkon das zweite Wohnzimmer. Von Koukaki aus sieht man abends, wie das Licht den Marmor der Akropolis erst golden, dann rosa färbt.', es:'La mayoría de los atenienses vive en una πολυκατοικία, un bloque con balcones por todos lados; en verano el balcón es el segundo salón. Desde Kukaki se ve al atardecer cómo la luz tiñe el mármol de la Acrópolis primero de dorado y luego de rosa.', en:'Most Athenians live in a πολυκατοικία, an apartment block with balconies on every side — in summer the balcony is the second living room. From Koukaki you can watch the evening light turn the marble of the Acropolis first golden, then pink.' }
    },
    'b1.wegbeschreibung': {
      deineRolle: { de:'Du bist in Meteora, und es ist neblig. Du möchtest zu Fuß zum Kloster Varlaam gehen und hast gehört, dass es dort eine Kleiderregel gibt.', es:'Estás en Meteora y hay niebla. Te gustaría ir a pie al monasterio de Varlaam y te han dicho que allí hay una norma sobre la ropa.', en:'You are in Meteora and it is foggy. You would like to walk to Varlaam Monastery and have heard there is a dress code.' },
      abrundung: {
        z: 'Ακριβώς! Και μη βιάζεστε· οι βράχοι περιμένουν εδώ εκατομμύρια χρόνια, θα περιμένουν και εσάς.',
        tr: 'Akrivós! Ke mi viázeste; i vráchi periménoun edó ekatomíria chrónia, tha periménoun ke esás.',
        na: { de:'Genau! Und keine Eile — die Felsen warten hier seit Millionen Jahren, da warten sie auch auf Sie.', es:'¡Exacto! Y no tenga prisa: las rocas llevan millones de años esperando aquí; también la esperarán a usted.', en:'Exactly! And don’t hurry — the rocks have been waiting here for millions of years; they’ll wait for you too.' }
      },
      rollen: {
        spikiu: { de:'Pater Nikodimos, ein Mönch mit Humor', es:'el padre Nikódimos, un monje con sentido del humor', en:'Father Nikodimos, a monk with a sense of humour', el:'ο πατήρ Νικόδημος, ένας μοναχός με χιούμορ' },
        lerner: { de:'die Wanderin im Nebel', es:'la caminante en la niebla', en:'the walker in the fog', el:'η πεζοπόρος μέσα στην ομίχλη' },
        ort: { de:'auf dem Pfad zwischen den Klöstern von Meteora', es:'en el sendero entre los monasterios de Meteora', en:'on the path between the monasteries of Meteora', el:'στο μονοπάτι ανάμεσα στα μοναστήρια των Μετεώρων' }
      },
      wortschatz: [
        { z:'το μονοπάτι', tr:'to monopáti', na:{ de:'der Pfad', es:'el sendero', en:'the path' } },
        { z:'τα σκαλιά', tr:'ta skaliá', na:{ de:'die Stufen', es:'los escalones', en:'the steps' } },
        { z:'ανεβαίνω', tr:'anevéno', na:{ de:'hinaufsteigen', es:'subir', en:'to go up' } },
        { z:'γλιστράει', tr:'glistrái', na:{ de:'es ist rutschig', es:'resbala', en:'it’s slippery' } },
        { z:'Προσέξτε!', tr:'Proséxte!', na:{ de:'Passen Sie auf!', es:'¡Tenga cuidado!', en:'Be careful!' } },
        { z:'η ομίχλη', tr:'i omíchli', na:{ de:'der Nebel', es:'la niebla', en:'the fog' } },
        { z:'ο βράχος', tr:'o vráchos', na:{ de:'der Felsen', es:'la roca', en:'the rock' } },
        { z:'η μονή', tr:'i moní', na:{ de:'das Kloster', es:'el monasterio', en:'the monastery' } },
        { z:'η φούστα', tr:'i foústa', na:{ de:'der Rock', es:'la falda', en:'the skirt' } },
        { z:'το ωράριο', tr:'to orário', na:{ de:'die Öffnungszeiten', es:'el horario', en:'the opening hours' } },
        { z:'μου είπε ότι …', tr:'mou ípe óti …', na:{ de:'er/sie hat mir gesagt, dass …', es:'me dijo que …', en:'he/she told me that …' } },
        { z:'δηλαδή', tr:'diladí', na:{ de:'das heißt, also', es:'o sea', en:'so, that is' } }
      ],
      dialog: {
        rolle: { de:'Pater Nikodimos, ein Mönch', es:'El padre Nikódimos, un monje', en:'Father Nikodimos, a monk' },
        zeilen: [
          {
            wer: 'spikiu',
            z: 'Καλημέρα! Σας βλέπω λίγο χαμένη μέσα στην ομίχλη. Μπορώ να βοηθήσω;',
            tr: 'Kaliméra! Sas vlépo lígo chaméni mésa stin omíchli. Boró na voithíso?',
            na: { de:'Guten Morgen! Sie sehen im Nebel ein bisschen verloren aus. Kann ich helfen?', es:'¡Buenos días! La veo un poco perdida en la niebla. ¿Puedo ayudarla?', en:'Good morning! You look a little lost in the fog. Can I help?' }
          },
          {
            wer: 'lerner',
            z: 'Καλημέρα, πάτερ. Θα ήθελα να πάω στο Βαρλαάμ με τα πόδια. Από πού πάω;',
            tr: 'Kaliméra, páter. Tha íthela na páo sto Varlaám me ta pódia. Apó poú páo?',
            na: { de:'Guten Morgen, Pater. Ich würde gern zu Fuß nach Varlaam gehen. Wie komme ich dahin?', es:'Buenos días, padre. Me gustaría ir a pie a Varlaam. ¿Por dónde voy?', en:'Good morning, Father. I’d like to walk to Varlaam. Which way do I go?' }
          },
          {
            wer: 'spikiu',
            z: 'Πάρτε το μονοπάτι δίπλα στον δρόμο, ανεβείτε τα σκαλιά και προσέξτε: η πέτρα γλιστράει.',
            tr: 'Párte to monopáti dípla ston drómo, anevíte ta skaliá ke proséxte: i pétra glistrái.',
            na: { de:'Nehmen Sie den Pfad neben der Straße, steigen Sie die Stufen hinauf und passen Sie auf: Der Stein ist rutschig.', es:'Coja el sendero junto a la carretera, suba los escalones y tenga cuidado: la piedra resbala.', en:'Take the path next to the road, go up the steps and be careful: the stone is slippery.' }
          },
          {
            wer: 'lerner',
            z: 'Πρέπει να φορέσω φούστα; Μου είπαν ότι υπάρχει κανόνας για τα ρούχα.',
            tr: 'Prépi na foréso foústa? Mou ípan óti ipárchi kanónas ya ta roúcha.',
            na: { de:'Muss ich einen Rock tragen? Man hat mir gesagt, dass es eine Kleiderregel gibt.', es:'¿Tengo que llevar falda? Me dijeron que hay una norma para la ropa.', en:'Do I have to wear a skirt? I was told there’s a dress code.' }
          },
          {
            wer: 'spikiu',
            z: 'Ναι, φούστα. Μην ανησυχείτε όμως: στην είσοδο σας δίνουμε μία. Σήμερα κλείνουμε στις τρεις.',
            tr: 'Ne, foústa. Min anisichíte ómos: stin ísodo sas dínoume mía. Símera klínoume stis tris.',
            na: { de:'Ja, einen Rock. Aber keine Sorge: Am Eingang geben wir Ihnen einen. Heute schließen wir um drei.', es:'Sí, falda. Pero no se preocupe: en la entrada le damos una. Hoy cerramos a las tres.', en:'Yes, a skirt. But don’t worry: we’ll give you one at the entrance. Today we close at three.' }
          },
          {
            wer: 'lerner',
            z: 'Δηλαδή μου λέτε ότι πρέπει να είμαι εκεί πριν από τις τρεις. Ευχαριστώ πολύ!',
            tr: 'Diladí mou léte óti prépi na íme ekí prin apó tis tris. Efcharistó polí!',
            na: { de:'Sie sagen mir also, dass ich vor drei dort sein muss. Vielen Dank!', es:'O sea, que me dice que tengo que estar allí antes de las tres. ¡Muchas gracias!', en:'So you’re telling me I have to be there before three. Thank you very much!' }
          }
        ]
      },
      lesetext: {
        z: 'Γιόνας, σου στέλνω φωνητικό από τα Μετέωρα. Ο πατήρ Νικόδημος μου είπε ότι το μονοπάτι γλιστράει και ότι πρέπει να φορέσω φούστα. Όταν τον ρώτησα αν γνωρίζει την «οδόν», γέλασε: «Εδώ λέμε δρόμος!» Το πρωί η ομίχλη σκέπαζε τα πάντα· μετά βγήκαν οι βράχοι, ένας ένας, σαν να άναβε κάποιος το φως.',
        tr: 'Yónas, sou stélno fonitikó apó ta Metéora. O patír Nikódimos mou ípe óti to monopáti glistrái ke óti prépi na foréso foústa. Ótan ton rótisa an gnorízi tin «odón», yélase: «Edó léme drómos!» To proí i omíchli sképaze ta pánda; metá vyíkan i vráchi, énas énas, san na ánave kápios to fos.',
        na: { de:'Jonas, ich schicke dir eine Sprachnachricht aus Meteora. Pater Nikodimos hat mir gesagt, dass der Pfad rutschig ist und dass ich einen Rock tragen muss. Als ich ihn fragte, ob er die „οδόν“ (den Weg, auf Altgriechisch) kenne, lachte er: „Hier sagen wir δρόμος!“ Am Morgen bedeckte der Nebel alles; dann tauchten die Felsen auf, einer nach dem anderen, als würde jemand das Licht anmachen.', es:'Jonas, te mando un audio desde Meteora. El padre Nikódimos me dijo que el sendero resbala y que tengo que llevar falda. Cuando le pregunté si conocía la «οδόν» (el camino, en griego antiguo), se rio: «¡Aquí decimos δρόμος!». Por la mañana la niebla lo cubría todo; luego aparecieron las rocas, una a una, como si alguien encendiera la luz.', en:'Jonas, I’m sending you a voice message from Meteora. Father Nikodimos told me the path is slippery and that I have to wear a skirt. When I asked him if he knew the “οδόν” (the way, in Ancient Greek), he laughed: “Here we say δρόμος!” In the morning the fog covered everything; then the rocks appeared one by one, as if someone were switching on the light.' },
        frage: { de:'Wie sagt man im Alltag „Weg“?', es:'¿Cómo se dice «camino» en el día a día?', en:'What is the everyday word for “way”?' },
        optionen: [
          { na:{ de:'ο δρόμος', es:'ο δρόμος', en:'ο δρόμος' }, richtig:true },
          { na:{ de:'η οδός', es:'η οδός', en:'η οδός' }, richtig:false },
          { na:{ de:'η ομίχλη', es:'η ομίχλη', en:'η ομίχλη' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag: { de:'Erzähl einem Freund, was dir jemand gesagt hat: Der Weg ist rutschig, und du sollst gute Schuhe anziehen. Zwei Sätze.', es:'Cuéntale a un amigo lo que te dijo alguien: el camino resbala y tienes que ponerte buen calzado. Dos frases.', en:'Tell a friend what someone told you: the path is slippery and you should wear good shoes. Two sentences.' },
        muster: 'Ο οδηγός μου είπε ότι το μονοπάτι γλιστράει. Μου είπε επίσης να φορέσω καλά παπούτσια.'
      },
      grammatik: {
        titel: { de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text: { de:'Was jemand gesagt hat, gibst du mit «μου είπε ότι» weiter — und die Zeit bleibt einfach, wie sie war: «Η πέτρα γλιστράει» → μου είπε ότι η πέτρα «γλιστράει». Kein Konjunktiv wie im Deutschen! Bitten gibst du mit «να» weiter: μου είπε «να» φορέσω φούστα. Höfliche Aufforderungen enden auf -τε: «πάρτε», «ανεβείτε», «προσέξτε».', es:'Lo que alguien te dijo lo cuentas con «μου είπε ότι», y el tiempo verbal no cambia: «Η πέτρα γλιστράει» → μου είπε ότι η πέτρα «γλιστράει». Las peticiones se transmiten con «να»: μου είπε «να» φορέσω φούστα (me dijo que me pusiera falda). El imperativo de usted acaba en -τε: «πάρτε», «ανεβείτε», «προσέξτε».', en:'To pass on what someone said, use «μου είπε ότι» — and the tense simply stays as it was: «Η πέτρα γλιστράει» → μου είπε ότι η πέτρα «γλιστράει». Requests are passed on with «να»: μου είπε «να» φορέσω φούστα (he told me to wear a skirt). Polite commands end in -τε: «πάρτε», «ανεβείτε», «προσέξτε».' },
        beispiele: [
          { z:'Μου είπε ότι το μονοπάτι γλιστράει.', tr:'Mou ípe óti to monopáti glistrái.', na:{ de:'Er hat mir gesagt, dass der Pfad rutschig ist.', es:'Me dijo que el sendero resbala.', en:'He told me the path is slippery.' } },
          { z:'Πάρτε το μονοπάτι και ανεβείτε τα σκαλιά.', tr:'Párte to monopáti ke anevíte ta skaliá.', na:{ de:'Nehmen Sie den Pfad und steigen Sie die Stufen hinauf.', es:'Coja el sendero y suba los escalones.', en:'Take the path and go up the steps.' } }
        ]
      },
      kultur: { de:'Μετέωρα heißt „in der Luft schwebend“: Die Klöster stehen hoch oben auf riesigen Felssäulen. Früher kam man nur in Netzen oder über Strickleitern hinauf, heute über Stufen, die in den Fels gehauen sind. Besucher kleiden sich schlicht — Röcke und Tücher werden am Eingang ausgeliehen.', es:'Μετέωρα significa «suspendido en el aire»: los monasterios están en lo alto de enormes columnas de roca. Antes solo se subía en redes o por escalas de cuerda; hoy hay escalones tallados en la roca. Los visitantes van con ropa sencilla, y en la entrada prestan faldas y pañuelos.', en:'Μετέωρα means “suspended in the air”: the monasteries sit high up on huge pillars of rock. Once you could only get up in nets or on rope ladders; today there are steps cut into the rock. Visitors dress modestly — skirts and wraps are lent at the entrance.' }
    },
    'b1.wetter': {
      duzen: true,
      deineRolle: { de:'Du übernachtest in Makrinitsa und willst heute den alten Steinweg hinunter nach Volos wandern. Wenn es regnet, fährst du mit dem Bus von Ano Volos zurück. Am Abend möchtest du am Kamin schreiben.', es:'Duermes en Makrinitsa y hoy quieres bajar a pie por el viejo camino empedrado hasta Volos. Si llueve, volverás en autobús desde Ano Volos. Por la noche quieres escribir junto a la chimenea.', en:'You are staying in Makrinitsa and want to walk down the old stone path to Volos today. If it rains, you will come back by bus from Ano Volos. In the evening you want to write by the fire.' },
      abrundung: {
        z: 'Σε περιμένω με ρακόμελο. Και πρόσεχε: στο Πήλιο ο καιρός αλλάζει πιο γρήγορα από τη γνώμη μου!',
        tr: 'Se periméno me rakómelo. Ke próseche: sto Pílio o kerós alázi pio grígora apó ti gnómi mou!',
        na: { de:'Ich warte mit Rakomelo auf dich. Und pass auf: Auf dem Pilion ändert sich das Wetter schneller als meine Meinung!', es:'Te espero con rakómelo. Y ojo: en el Pelión el tiempo cambia más rápido que mi opinión.', en:'I’ll be waiting with rakomelo. And watch out: on Pelion the weather changes faster than my mind does!' }
      },
      rollen: {
        spikiu: { de:'Thanasis, der Wirt der Pension', es:'Thanasis, el dueño de la casa rural', en:'Thanasis, the innkeeper', el:'ο Θανάσης, ο ιδιοκτήτης του ξενώνα' },
        lerner: { de:'der Gast, der wandern will', es:'la huésped que quiere salir a caminar', en:'the guest who wants to go walking', el:'η επισκέπτρια που θέλει να περπατήσει' },
        ort: { de:'in einer Steinpension in Makrinitsa, auf dem Pilion', es:'en una casa de piedra en Makrinitsa, en el Pelión', en:'in a stone guesthouse in Makrinitsa, on Mount Pelion', el:'σε έναν πέτρινο ξενώνα στη Μακρινίτσα, στο Πήλιο' }
      },
      wortschatz: [
        { z:'βρέχει', tr:'vréchi', na:{ de:'es regnet', es:'llueve', en:'it’s raining' } },
        { z:'θα χιονίσει', tr:'tha chionísi', na:{ de:'es wird schneien', es:'nevará', en:'it will snow' } },
        { z:'η πρόγνωση', tr:'i prógnosi', na:{ de:'die Vorhersage', es:'la previsión', en:'the forecast' } },
        { z:'το καλντερίμι', tr:'to kalderími', na:{ de:'der alte gepflasterte Saumpfad', es:'el camino empedrado', en:'the old cobbled mule path' } },
        { z:'η κατηφόρα', tr:'i katifóra', na:{ de:'der Weg bergab', es:'la bajada', en:'the way downhill' } },
        { z:'γλιστερός', tr:'glisterós', na:{ de:'rutschig', es:'resbaladizo', en:'slippery' } },
        { z:'προλαβαίνω', tr:'prolavéno', na:{ de:'es rechtzeitig schaffen', es:'llegar a tiempo, dar tiempo', en:'to make it in time' } },
        { z:'πριν σκοτεινιάσει', tr:'prin skotiniási', na:{ de:'bevor es dunkel wird', es:'antes de que oscurezca', en:'before it gets dark' } },
        { z:'το τζάκι', tr:'to tzáki', na:{ de:'der Kamin', es:'la chimenea', en:'the fireplace' } },
        { z:'ανάβω', tr:'anávo', na:{ de:'anzünden', es:'encender', en:'to light' } },
        { z:'το μπαστούνι', tr:'to bastoúni', na:{ de:'der Wanderstock', es:'el bastón', en:'the walking stick' } },
        { z:'το ρακόμελο', tr:'to rakómelo', na:{ de:'heißer Tsipouro mit Honig', es:'aguardiente caliente con miel', en:'hot tsipouro with honey' } }
      ],
      dialog: {
        rolle: { de:'Thanasis, der Wirt', es:'Thanasis, el dueño de la casa rural', en:'Thanasis, the innkeeper' },
        zeilen: [
          {
            wer: 'spikiu',
            z: 'Καλημέρα! Είδες την ομίχλη; Η πρόγνωση λέει ότι το απόγευμα θα βρέξει.',
            tr: 'Kaliméra! Ídes tin omíchli? I prógnosi léi óti to apóyevma tha vréxi.',
            na: { de:'Guten Morgen! Hast du den Nebel gesehen? Die Vorhersage sagt, dass es am Nachmittag regnen wird.', es:'¡Buenos días! ¿Has visto la niebla? La previsión dice que por la tarde lloverá.', en:'Good morning! Did you see the fog? The forecast says it will rain this afternoon.' }
          },
          {
            wer: 'lerner',
            z: 'Τι λες, θα προλάβω να κατέβω το καλντερίμι πριν βρέξει;',
            tr: 'Ti les, tha prolávo na katévo to kalderími prin vréxi?',
            na: { de:'Was meinst du, schaffe ich es noch, den Steinweg hinunterzugehen, bevor es regnet?', es:'¿Tú qué crees, me dará tiempo a bajar el camino empedrado antes de que llueva?', en:'What do you think, will I make it down the stone path before it rains?' }
          },
          {
            wer: 'spikiu',
            z: 'Αν φύγεις τώρα, θα προλάβεις. Αλλά πρόσεχε, οι πέτρες είναι γλιστερές.',
            tr: 'An fíyis tóra, tha prolávis. Alá próseche, i pétres íne glisterés.',
            na: { de:'Wenn du jetzt losgehst, schaffst du es. Aber pass auf, die Steine sind rutschig.', es:'Si sales ahora, te da tiempo. Pero ten cuidado, las piedras resbalan.', en:'If you leave now, you’ll make it. But be careful, the stones are slippery.' }
          },
          {
            wer: 'lerner',
            z: 'Εντάξει. Αν βρέχει, θα γυρίσω με το λεωφορείο από τον Άνω Βόλο.',
            tr: 'Endáxi. An vréchi, tha yiríso me to leoforío apó ton Áno Vólo.',
            na: { de:'In Ordnung. Wenn es regnet, fahre ich mit dem Bus von Ano Volos zurück.', es:'Vale. Si llueve, volveré en autobús desde Ano Volos.', en:'OK. If it’s raining, I’ll come back by bus from Ano Volos.' }
          },
          {
            wer: 'spikiu',
            z: 'Σωστά. Πάρε και το μπαστούνι μου. Το βράδυ θα ανάψω το τζάκι.',
            tr: 'Sostá. Páre ke to bastoúni mou. To vrádi tha anápso to tzáki.',
            na: { de:'Richtig. Nimm auch meinen Wanderstock mit. Am Abend zünde ich den Kamin an.', es:'Bien pensado. Llévate también mi bastón. Por la noche encenderé la chimenea.', en:'Good idea. Take my walking stick too. Tonight I’ll light the fire.' }
          },
          {
            wer: 'lerner',
            z: 'Τέλεια! Θα γυρίσω πριν σκοτεινιάσει και θα γράψω δίπλα στο τζάκι.',
            tr: 'Télia! Tha yiríso prin skotiniási ke tha grápso dípla sto tzáki.',
            na: { de:'Perfekt! Ich bin zurück, bevor es dunkel wird, und schreibe am Kamin.', es:'¡Perfecto! Volveré antes de que oscurezca y escribiré junto a la chimenea.', en:'Perfect! I’ll be back before dark and write by the fire.' }
          }
        ]
      },
      lesetext: {
        z: 'Χθες το βράδυ ρώτησα τον Θανάση αν αναμένεται «υετός». Γέλασε τόσο, που ξύπνησε ο σκύλος: «Βροχή λέμε, βροχή!» Σήμερα κατέβηκα το καλντερίμι μέσα στην ομίχλη. Στον Άνω Βόλο άρχισε να βρέχει, και γύρισα με το λεωφορείο. Το βράδυ το μόνο φως στο δωμάτιο ήταν το τζάκι.',
        tr: 'Chthes to vrádi rótisa ton Thanási an anaménete «ietós». Yélase tóso, pou xípnise o skílos: «Vrochí léme, vrochí!» Símera katévika to kalderími mésa stin omíchli. Ston Áno Vólo árchise na vréchi, ke yírisa me to leoforío. To vrádi to móno fos sto domátio ítan to tzáki.',
        na: { de:'Gestern Abend fragte ich Thanasis, ob „υετός“ (Niederschlag, altes Amtsgriechisch) zu erwarten sei. Er lachte so sehr, dass der Hund aufwachte: „Βροχή sagen wir, βροχή!“ Heute ging ich den Steinweg im Nebel hinunter. In Ano Volos fing es an zu regnen, und ich fuhr mit dem Bus zurück. Am Abend war das einzige Licht im Zimmer der Kamin.', es:'Anoche le pregunté a Thanasis si se esperaba «υετός» (precipitación, palabra muy antigua). Se rio tanto que se despertó el perro: «¡Βροχή, decimos, βροχή!». Hoy he bajado el camino empedrado entre la niebla. En Ano Volos empezó a llover y volví en autobús. Por la noche, la única luz de la habitación era la chimenea.', en:'Last night I asked Thanasis whether “υετός” (precipitation, an old official word) was expected. He laughed so hard that the dog woke up: “Βροχή, we say, βροχή!” Today I walked down the stone path in the fog. In Ano Volos it started to rain, and I came back by bus. In the evening the only light in the room was the fire.' },
        frage: { de:'Wie ist Elli zurückgekommen?', es:'¿Cómo volvió Elli?', en:'How did Elli get back?' },
        optionen: [
          { na:{ de:'Mit dem Bus', es:'En autobús', en:'By bus' }, richtig:true },
          { na:{ de:'Zu Fuß über den Steinweg', es:'A pie por el camino empedrado', en:'On foot along the stone path' }, richtig:false },
          { na:{ de:'Mit dem Auto von Thanasis', es:'En el coche de Thanasis', en:'In Thanasis’s car' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag: { de:'Schreib einer Freundin deinen Plan für morgen: Was machst du, wenn es regnet? Zwei Sätze.', es:'Escríbele a una amiga tu plan para mañana: ¿qué harás si llueve? Dos frases.', en:'Write to a friend about your plan for tomorrow: what will you do if it rains? Two sentences.' },
        muster: 'Αύριο θα περπατήσω στο βουνό. Αν βρέχει, θα μείνω στο σπίτι και θα διαβάσω.'
      },
      grammatik: {
        titel: { de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text: { de:'Die Zukunft ist kurz: «θα» + Verb. «Θα βρέξει» (es wird regnen — einmal, irgendwann) und «θα βρέχει» (es wird die ganze Zeit regnen): Die Form verrät, ob es ein Moment ist oder etwas, das andauert. Bedingungen baust du wie im Deutschen: «αν» βρέχει, «θα» γυρίσω με το λεωφορείο — wenn es regnet, fahre ich mit dem Bus zurück.', es:'El futuro es corto: «θα» + verbo. «Θα βρέξει» (lloverá, en un momento dado) y «θα βρέχει» (estará lloviendo todo el rato): la forma dice si es un momento o algo que dura. Las condiciones se construyen como en español: «αν» βρέχει, «θα» γυρίσω με το λεωφορείο — si llueve, volveré en autobús.', en:'The future is short: «θα» + verb. «Θα βρέξει» (it will rain, at some point) and «θα βρέχει» (it will be raining, all along): the form tells you whether it’s a moment or something ongoing. Conditions work as in English: «αν» βρέχει, «θα» γυρίσω με το λεωφορείο — if it rains, I’ll come back by bus.' },
        beispiele: [
          { z:'Αν βρέχει, θα πάρω το λεωφορείο.', tr:'An vréchi, tha páro to leoforío.', na:{ de:'Wenn es regnet, nehme ich den Bus.', es:'Si llueve, cogeré el autobús.', en:'If it rains, I’ll take the bus.' } },
          { z:'Το απόγευμα θα χιονίσει στο βουνό.', tr:'To apóyevma tha chionísi sto vounó.', na:{ de:'Am Nachmittag wird es auf dem Berg schneien.', es:'Por la tarde nevará en la montaña.', en:'This afternoon it will snow on the mountain.' } }
        ]
      },
      kultur: { de:'In der Sage ist der Pilion der Berg der Kentauren. Seine Dörfer verbinden alte gepflasterte Saumpfade, die καλντερίμια. Makrinitsa nennt man „den Balkon des Pilion“: Von dort blickt man über Volos und den ganzen Golf. Im Winter wärmt man sich mit ρακόμελο — heißem Tsipouro mit Honig.', es:'En la mitología, el Pelión es la montaña de los centauros. Sus pueblos están unidos por antiguos caminos empedrados, los καλντερίμια. A Makrinitsa la llaman «el balcón del Pelión»: desde allí se ve Volos y todo el golfo. En invierno uno se calienta con ρακόμελο, tsípuro caliente con miel.', en:'In myth, Pelion is the mountain of the centaurs. Its villages are linked by old cobbled mule paths, the καλντερίμια. Makrinitsa is called “the balcony of Pelion”: from there you look out over Volos and the whole gulf. In winter people warm up with ρακόμελο — hot tsipouro with honey.' }
    },
    'b1.cafe': {
      deineRolle: { de:'Du sitzt in einem Café unter den Arkaden des Liston auf Korfu. Du findest, dass du hier besser schreibst. Griechische Musik kennst du noch nicht gut — und du lädst gern jemanden ein.', es:'Estás en un café bajo los soportales del Liston, en Corfú. Te parece que aquí escribes mejor. La música griega todavía no la conoces bien, y te gusta invitar.', en:'You are sitting in a café under the arcades of the Liston in Corfu. You feel you write better here. You don’t know Greek music well yet — and you like to treat people.' },
      abrundung: {
        z: 'Με μεγάλη χαρά! Αλλά προσοχή: μετά το δεύτερο ποτηράκι αρχίζω να τραγουδάω κι εγώ.',
        tr: 'Me megáli chará! Alá prosochí: metá to déftero potiráki archízo na tragoudáo ki egó.',
        na: { de:'Mit großer Freude! Aber Vorsicht: Nach dem zweiten Gläschen fange ich auch an zu singen.', es:'¡Con mucho gusto! Pero cuidado: después de la segunda copita yo también me pongo a cantar.', en:'With great pleasure! But be warned: after the second little glass I start singing too.' }
      },
      rollen: {
        spikiu: { de:'Herr Spyros, ein alter Musiklehrer aus Korfu', es:'el señor Spyros, un viejo profesor de música de Corfú', en:'Mr Spyros, an old music teacher from Corfu', el:'ο κύριος Σπύρος, ένας ηλικιωμένος δάσκαλος μουσικής από την Κέρκυρα' },
        lerner: { de:'der Gast am Nebentisch', es:'la clienta de la mesa de al lado', en:'the guest at the next table', el:'η πελάτισσα στο διπλανό τραπέζι' },
        ort: { de:'in einem Café unter den Arkaden des Liston', es:'en un café bajo los soportales del Liston', en:'at a café under the arcades of the Liston', el:'σε ένα καφέ κάτω από τις καμάρες του Λιστόν' }
      },
      wortschatz: [
        { z:'οι καμάρες', tr:'i kamáres', na:{ de:'die Arkaden, die Bögen', es:'los soportales, los arcos', en:'the arcades' } },
        { z:'το γκαρσόνι', tr:'to garsóni', na:{ de:'der Kellner (altmodisch)', es:'el camarero (anticuado)', en:'the waiter (old-fashioned)' } },
        { z:'νομίζω ότι …', tr:'nomízo óti …', na:{ de:'ich glaube, dass …', es:'creo que …', en:'I think that …' } },
        { z:'δεν νομίζω ότι …', tr:'den nomízo óti …', na:{ de:'ich glaube nicht, dass …', es:'no creo que …', en:'I don’t think that …' } },
        { z:'κατά τη γνώμη μου', tr:'katá ti gnómi mou', na:{ de:'meiner Meinung nach', es:'en mi opinión', en:'in my opinion' } },
        { z:'έχετε δίκιο', tr:'échete díkio', na:{ de:'Sie haben recht', es:'tiene razón', en:'you’re right' } },
        { z:'προτείνω', tr:'protíno', na:{ de:'empfehlen, vorschlagen', es:'recomendar, proponer', en:'to recommend, to suggest' } },
        { z:'η καντάδα', tr:'i kandáda', na:{ de:'das Ständchen (Serenade)', es:'la serenata', en:'the serenade' } },
        { z:'η φιλαρμονική', tr:'i filarmonikí', na:{ de:'die Blaskapelle des Ortes', es:'la banda de música', en:'the town band' } },
        { z:'το κουμκουάτ', tr:'to koumkouát', na:{ de:'die Kumquat', es:'el kumquat', en:'the kumquat' } },
        { z:'κερνάω', tr:'kernáo', na:{ de:'einladen, ausgeben', es:'invitar (a algo)', en:'to treat (someone)' } },
        { z:'Να σας κεράσω;', tr:'Na sas keráso?', na:{ de:'Darf ich Sie einladen?', es:'¿Le invito?', en:'May I treat you?' } }
      ],
      dialog: {
        rolle: { de:'Herr Spyros, ein alter Musiklehrer', es:'El señor Spyros, un viejo profesor de música', en:'Mr Spyros, an old music teacher' },
        zeilen: [
          {
            wer: 'spikiu',
            z: 'Συγγνώμη, κυρία μου, σας άκουσα να μιλάτε με το γκαρσόνι. Σας αρέσει η Κέρκυρα;',
            tr: 'Signómi, kiría mou, sas ákousa na miláte me to garsóni. Sas arési i Kérkira?',
            na: { de:'Entschuldigung, gnädige Frau, ich habe Sie mit dem Kellner sprechen hören. Gefällt Ihnen Korfu?', es:'Perdone, señora, la he oído hablar con el camarero. ¿Le gusta Corfú?', en:'Excuse me, madam, I heard you talking to the waiter. Do you like Corfu?' }
          },
          {
            wer: 'lerner',
            z: 'Πάρα πολύ! Νομίζω ότι εδώ, κάτω από τις καμάρες, γράφω καλύτερα.',
            tr: 'Pára polí! Nomízo óti edó, káto apó tis kamáres, gráfo kalítera.',
            na: { de:'Sehr! Ich glaube, dass ich hier unter den Arkaden besser schreibe.', es:'¡Muchísimo! Creo que aquí, bajo los soportales, escribo mejor.', en:'Very much! I think I write better here, under the arcades.' }
          },
          {
            wer: 'spikiu',
            z: 'Έχετε δίκιο. Κι εδώ η μουσική είναι παντού. Εσείς ξέρετε ελληνική μουσική;',
            tr: 'Échete díkio. Ki edó i mousikí íne pandoú. Esís xérete elinikí mousikí?',
            na: { de:'Sie haben recht. Und hier ist die Musik überall. Kennen Sie griechische Musik?', es:'Tiene razón. Y aquí la música está en todas partes. ¿Usted conoce la música griega?', en:'You’re right. And here, music is everywhere. Do you know Greek music?' }
          },
          {
            wer: 'lerner',
            z: 'Λίγο. Δεν νομίζω ότι την ξέρω καλά. Τι μου προτείνετε;',
            tr: 'Lígo. Den nomízo óti tin xéro kalá. Ti mou protínete?',
            na: { de:'Ein bisschen. Ich glaube nicht, dass ich sie gut kenne. Was empfehlen Sie mir?', es:'Un poco. No creo que la conozca bien. ¿Qué me recomienda?', en:'A little. I don’t think I know it well. What do you recommend?' }
          },
          {
            wer: 'spikiu',
            z: 'Κατά τη γνώμη μου, πρέπει να ακούσετε μια καντάδα. Και να δοκιμάσετε λικέρ κουμκουάτ!',
            tr: 'Katá ti gnómi mou, prépi na akoúsete mia kandáda. Ke na dokimásete likér koumkouát!',
            na: { de:'Meiner Meinung nach müssen Sie eine Kantada hören. Und Kumquat-Likör probieren!', es:'En mi opinión, tiene que escuchar una kantada. ¡Y probar el licor de kumquat!', en:'In my opinion, you must hear a kantada. And try kumquat liqueur!' }
          },
          {
            wer: 'lerner',
            z: 'Κατά τη γνώμη μου, το λικέρ με την καντάδα είναι τέλειος συνδυασμός. Να σας κεράσω;',
            tr: 'Katá ti gnómi mou, to likér me tin kandáda íne télios sindiasmós. Na sas keráso?',
            na: { de:'Meiner Meinung nach sind Likör und Kantada eine perfekte Kombination. Darf ich Sie einladen?', es:'En mi opinión, el licor con la kantada es la combinación perfecta. ¿Le invito?', en:'In my opinion, liqueur and a kantada are the perfect combination. May I treat you?' }
          }
        ]
      },
      lesetext: {
        z: 'Σήμερα στο Λιστόν άρχισα μια φράση με «φρονώ ότι…». Ο κύριος Σπύρος, στο διπλανό τραπέζι, έβαλε το χέρι στην καρδιά: «Νομίζω, κυρία μου! Έτσι μιλούσε ο δάσκαλός μου το 1960.» Μετά μου μίλησε για τις καντάδες και τις φιλαρμονικές του νησιού. Όταν έδυσε ο ήλιος, οι καμάρες έγιναν πορτοκαλί, σαν το λικέρ κουμκουάτ.',
        tr: 'Símera sto Listón árchisa mia frási me «fronó óti…». O kírios Spíros, sto diplanó trapézi, évale to chéri stin kardiá: «Nomízo, kiría mou! Étsi miloúse o dáskalós mou to 1960.» Metá mou mílise ya tis kandádes ke tis filarmonikés tou nisioú. Ótan édise o ílios, i kamáres éyinan portokalí, san to likér koumkouát.',
        na: { de:'Heute habe ich im Liston einen Satz mit „φρονώ ότι …“ (ich erachte, dass …, sehr altmodisch) angefangen. Herr Spyros am Nebentisch legte die Hand aufs Herz: „Νομίζω, gnädige Frau! So hat mein Lehrer 1960 geredet.“ Dann erzählte er mir von den Kantades und den Blaskapellen der Insel. Als die Sonne unterging, wurden die Arkaden orange wie der Kumquat-Likör.', es:'Hoy en el Liston empecé una frase con «φρονώ ότι…» (estimo que…, muy anticuado). El señor Spyros, en la mesa de al lado, se llevó la mano al corazón: «¡Νομίζω, señora! Así hablaba mi maestro en 1960». Luego me habló de las kantadas y de las bandas de música de la isla. Cuando se puso el sol, los soportales se volvieron naranjas, como el licor de kumquat.', en:'Today at the Liston I began a sentence with “φρονώ ότι…” (I deem that…, very old-fashioned). Mr Spyros at the next table put his hand on his heart: “Νομίζω, madam! That’s how my teacher talked in 1960.” Then he told me about the kantades and the island’s town bands. When the sun set, the arcades turned orange, like the kumquat liqueur.' },
        frage: { de:'Was sagt man im Alltag statt φρονώ?', es:'¿Qué se dice en el día a día en vez de φρονώ?', en:'What do people say every day instead of φρονώ?' },
        optionen: [
          { na:{ de:'νομίζω', es:'νομίζω', en:'νομίζω' }, richtig:true },
          { na:{ de:'η καντάδα', es:'η καντάδα', en:'η καντάδα' }, richtig:false },
          { na:{ de:'το κουμκουάτ', es:'το κουμκουάτ', en:'το κουμκουάτ' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag: { de:'Schreib deine Meinung über eine Stadt, die du liebst: Was glaubst du, und was glaubst du nicht? Zwei Sätze.', es:'Escribe tu opinión sobre una ciudad que te encanta: ¿qué crees y qué no crees? Dos frases.', en:'Write your opinion about a city you love: what do you think, and what don’t you think? Two sentences.' },
        muster: 'Νομίζω ότι η Κέρκυρα είναι πολύ όμορφη τον χειμώνα. Δεν νομίζω ότι θα φύγω γρήγορα.'
      },
      grammatik: {
        titel: { de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text: { de:'Meinung sagen ist einfach: «νομίζω ότι» + ein ganz normaler Satz — νομίζω ότι εδώ γράφω καλύτερα. Verneint: «δεν νομίζω ότι» … — und auch danach bleibt der Satz ganz normal. Etwas förmlicher: «κατά τη γνώμη μου» (meiner Meinung nach). Und wer zustimmt, sagt «έχετε δίκιο» — Sie haben recht.', es:'Dar tu opinión es fácil: «νομίζω ότι» + frase — νομίζω ότι εδώ γράφω καλύτερα. En negativo: «δεν νομίζω ότι» … y, a diferencia de «no creo que…», en griego no cambia nada: la frase sigue igual. Algo más formal: «κατά τη γνώμη μου» (en mi opinión). Y para dar la razón: «έχετε δίκιο».', en:'Giving your opinion is easy: «νομίζω ότι» + a normal sentence — νομίζω ότι εδώ γράφω καλύτερα. Negative: «δεν νομίζω ότι» … A bit more formal: «κατά τη γνώμη μου» (in my opinion). And to agree: «έχετε δίκιο» — you’re right.' },
        beispiele: [
          { z:'Νομίζω ότι εδώ γράφω καλύτερα.', tr:'Nomízo óti edó gráfo kalítera.', na:{ de:'Ich glaube, dass ich hier besser schreibe.', es:'Creo que aquí escribo mejor.', en:'I think I write better here.' } },
          { z:'Δεν νομίζω ότι την ξέρω καλά.', tr:'Den nomízo óti tin xéro kalá.', na:{ de:'Ich glaube nicht, dass ich sie gut kenne.', es:'No creo que la conozca bien.', en:'I don’t think I know it well.' } }
        ]
      },
      kultur: { de:'Die Arkaden des Liston in Korfu-Stadt wurden Anfang des 19. Jahrhunderts nach dem Vorbild der Pariser Rue de Rivoli gebaut. Korfu ist eine Musikinsel: Es gibt viele Blaskapellen, die φιλαρμονικές, und die καντάδα, ein Ständchen mit Gitarre und Mandoline, klingt fast italienisch. Dazu trinkt man Likör aus Kumquats, die auf der Insel wachsen.', es:'Los soportales del Liston, en la ciudad de Corfú, se construyeron a principios del siglo XIX siguiendo el modelo de la rue de Rivoli de París. Corfú es una isla de música: tiene muchas bandas, las φιλαρμονικές, y la καντάδα, una serenata con guitarra y mandolina, suena casi italiana. Se acompaña con licor de kumquat, que crece en la isla.', en:'The arcades of the Liston in Corfu Town were built in the early 19th century, modelled on the Rue de Rivoli in Paris. Corfu is an island of music: it has many town bands, the φιλαρμονικές, and the καντάδα, a serenade with guitar and mandolin, sounds almost Italian. With it comes liqueur made from kumquats grown on the island.' }
    },
    'b1.familie': {
      duzen: true,
      deineRolle: { de:'Deine Freundin Margarete ist 82 und lebt in Hamburg. Du hast sie in der Schule kennengelernt: Sie war deine Lehrerin und hat dir eine alte griechische Schallplatte geschenkt. Als du klein warst, hat sie dir Karten aus Griechenland geschickt — jetzt schreibst du ihr.', es:'Tu amiga Margarete tiene 82 años y vive en Hamburgo. La conociste en el colegio: era tu profesora y te regaló un disco griego antiguo. Cuando eras pequeña, ella te mandaba postales desde Grecia; ahora le escribes tú.', en:'Your friend Margarete is 82 and lives in Hamburg. You met her at school: she was your teacher and gave you an old Greek record. When you were little, she used to send you postcards from Greece — now you write to her.' },
      abrundung: {
        z: 'Τώρα γράψε της και για μας! Το μυστικό μας; Δεν βιαζόμαστε ποτέ. Έλα, ο καφές θέλει την ώρα του.',
        tr: 'Tóra grápse tis ke ya mas! To mistikó mas? Den viazómaste poté. Éla, o kafés théli tin óra tou.',
        na: { de:'Dann schreib ihr jetzt auch von uns! Unser Geheimnis? Wir haben es nie eilig. Komm, der Kaffee braucht seine Zeit.', es:'¡Pues ahora escríbele también sobre nosotros! ¿Nuestro secreto? Nunca tenemos prisa. Ven, el café necesita su tiempo.', en:'Then write to her about us too! Our secret? We’re never in a hurry. Come on, coffee takes its time.' }
      },
      rollen: {
        spikiu: { de:'Oma Asimina, 96 Jahre alt', es:'la abuela Asimina, de 96 años', en:'Grandma Asimina, 96 years old', el:'η γιαγιά Ασημίνα, 96 χρονών' },
        lerner: { de:'der Gast der Familie', es:'la invitada de la familia', en:'the family’s guest', el:'η φιλοξενούμενη της οικογένειας' },
        ort: { de:'im Hof eines alten Hauses auf Ikaria', es:'en el patio de una casa antigua de Icaria', en:'in the courtyard of an old house on Ikaria', el:'στην αυλή ενός παλιού σπιτιού στην Ικαρία' }
      },
      wortschatz: [
        { z:'όταν ήμουν νέα', tr:'ótan ímoun néa', na:{ de:'als ich jung war', es:'cuando era joven', en:'when I was young' } },
        { z:'το πανηγύρι', tr:'to paniyíri', na:{ de:'das Dorffest mit Musik und Tanz', es:'la fiesta del pueblo', en:'the village festival' } },
        { z:'χορεύαμε', tr:'chorévame', na:{ de:'wir tanzten (immer wieder)', es:'bailábamos', en:'we used to dance' } },
        { z:'γνώρισα', tr:'gnórisa', na:{ de:'ich habe kennengelernt', es:'conocí', en:'I met' } },
        { z:'η δασκάλα', tr:'i daskála', na:{ de:'die Lehrerin', es:'la maestra', en:'the (female) teacher' } },
        { z:'μου χάρισε', tr:'mou chárise', na:{ de:'sie hat mir geschenkt', es:'me regaló', en:'she gave me (as a present)' } },
        { z:'ο δίσκος', tr:'o dískos', na:{ de:'die Schallplatte', es:'el disco', en:'the record' } },
        { z:'η συγγραφέας', tr:'i singraféas', na:{ de:'die Schriftstellerin', es:'la escritora', en:'the (female) writer' } },
        { z:'η μακροζωία', tr:'i makrozoía', na:{ de:'das lange Leben', es:'la longevidad', en:'long life' } },
        { z:'ο μεσημεριανός ύπνος', tr:'o mesimerianós ípnos', na:{ de:'der Mittagsschlaf', es:'la siesta', en:'the afternoon nap' } },
        { z:'δεν βιαζόμαστε', tr:'den viazómaste', na:{ de:'wir haben es nicht eilig', es:'no tenemos prisa', en:'we’re not in a hurry' } },
        { z:'κόρη μου', tr:'kóri mou', na:{ de:'mein Kind (liebevoll, wörtlich: meine Tochter)', es:'hija mía (cariñoso)', en:'my dear (literally: my daughter)' } }
      ],
      dialog: {
        rolle: { de:'Oma Asimina', es:'La abuela Asimina', en:'Grandma Asimina' },
        zeilen: [
          {
            wer: 'spikiu',
            z: 'Όταν ήμουν νέα, χορεύαμε στα πανηγύρια ως το πρωί! Εσύ, κόρη μου, έχεις καμιά φίλη στην ηλικία μου;',
            tr: 'Ótan ímoun néa, chorévame sta paniyíria os to proí! Esí, kóri mou, échis kamiá fíli stin ilikía mou?',
            na: { de:'Als ich jung war, haben wir auf den Festen bis zum Morgen getanzt! Und du, mein Kind, hast du eine Freundin in meinem Alter?', es:'¡Cuando era joven, bailábamos en las fiestas hasta la mañana! Y tú, hija mía, ¿tienes alguna amiga de mi edad?', en:'When I was young, we danced at the festivals till morning! And you, my dear, do you have a friend my age?' }
          },
          {
            wer: 'lerner',
            z: 'Ναι, τη Μαργκαρέτε. Είναι ογδόντα δύο χρονών και μένει στο Αμβούργο.',
            tr: 'Ne, ti Margaréte. Íne ogdónda dío chronón ke méni sto Amvoúrgo.',
            na: { de:'Ja, Margarete. Sie ist zweiundachtzig und wohnt in Hamburg.', es:'Sí, a Margarete. Tiene ochenta y dos años y vive en Hamburgo.', en:'Yes, Margarete. She’s eighty-two and lives in Hamburg.' }
          },
          {
            wer: 'spikiu',
            z: 'Ογδόντα δύο; Μικρούλα ακόμα! Και πώς τη γνώρισες;',
            tr: 'Ogdónda dío? Mikroúla akóma! Ke pós ti gnórises?',
            na: { de:'Zweiundachtzig? Noch ein junges Ding! Und wie hast du sie kennengelernt?', es:'¿Ochenta y dos? ¡Si es una chiquilla! ¿Y cómo la conociste?', en:'Eighty-two? Just a youngster! And how did you meet her?' }
          },
          {
            wer: 'lerner',
            z: 'Τη γνώρισα στο σχολείο· ήταν η δασκάλα μου και μου χάρισε έναν παλιό ελληνικό δίσκο.',
            tr: 'Ti gnórisa sto scholío; ítan i daskála mou ke mou chárise énan palió elinikó dísko.',
            na: { de:'Ich habe sie in der Schule kennengelernt; sie war meine Lehrerin und hat mir eine alte griechische Schallplatte geschenkt.', es:'La conocí en el colegio; era mi profesora y me regaló un disco griego antiguo.', en:'I met her at school; she was my teacher and gave me an old Greek record.' }
          },
          {
            wer: 'spikiu',
            z: 'Α, έτσι έμαθες ελληνικά! Και της γράφεις από την Ελλάδα;',
            tr: 'A, étsi émathes eliniká! Ke tis gráfis apó tin Eláda?',
            na: { de:'Ach, so hast du Griechisch gelernt! Und schreibst du ihr aus Griechenland?', es:'¡Ah, así aprendiste griego! ¿Y le escribes desde Grecia?', en:'Ah, so that’s how you learnt Greek! And do you write to her from Greece?' }
          },
          {
            wer: 'lerner',
            z: 'Συνέχεια! Όταν ήμουν μικρή, μου έστελνε εκείνη κάρτες από την Ελλάδα.',
            tr: 'Sinéchia! Ótan ímoun mikrí, mou éstelne ekíni kártes apó tin Eláda.',
            na: { de:'Ständig! Als ich klein war, hat sie mir Karten aus Griechenland geschickt.', es:'¡Todo el rato! Cuando yo era pequeña, ella me mandaba postales desde Grecia.', en:'All the time! When I was little, she used to send me postcards from Greece.' }
          }
        ]
      },
      lesetext: {
        z: 'Ρώτησα τη γιαγιά Ασημίνα ποιο είναι το μυστικό της «μακροβιότητος». Δεν κατάλαβε τίποτα. Η εγγονή της μου εξήγησε: «Λέμε μακροζωία». Η γιαγιά γέλασε: «Εγώ δεν ξέρω από λέξεις. Κοιμόμουν το μεσημέρι, δούλευα στον κήπο και χόρευα στα πανηγύρια. Μια φορά χόρεψα τρεις μέρες συνέχεια!»',
        tr: 'Rótisa ti yayá Asimína pio íne to mistikó tis «makroviótitos». Den katálave típota. I engoní tis mou exíyise: «Léme makrozoía». I yayá yélase: «Egó den xéro apó léxis. Kimómoun to mesiméri, doúleva ston kípo ke chóreva sta paniyíria. Mia forá chórepsa tris méres sinéchia!»',
        na: { de:'Ich habe Oma Asimina gefragt, was das Geheimnis ihrer „μακροβιότης“ (Langlebigkeit, sehr altmodisch) ist. Sie verstand kein Wort. Ihre Enkelin erklärte mir: „Wir sagen μακροζωία.“ Die Oma lachte: „Von Wörtern verstehe ich nichts. Ich habe mittags geschlafen, im Garten gearbeitet und auf den Festen getanzt. Einmal habe ich drei Tage am Stück getanzt!“', es:'Le pregunté a la abuela Asimina cuál es el secreto de su «μακροβιότης» (longevidad, palabra muy anticuada). No entendió nada. Su nieta me explicó: «Decimos μακροζωία». La abuela se rio: «Yo de palabras no sé. Dormía la siesta, trabajaba en el huerto y bailaba en las fiestas. ¡Una vez bailé tres días seguidos!».', en:'I asked Grandma Asimina what the secret of her “μακροβιότης” (longevity, a very old-fashioned word) is. She didn’t understand a thing. Her granddaughter explained: “We say μακροζωία.” Grandma laughed: “I don’t know about words. I napped at midday, worked in the garden and danced at the festivals. Once I danced for three days straight!”' },
        frage: { de:'Was hat Oma Asimina einmal gemacht?', es:'¿Qué hizo una vez la abuela Asimina?', en:'What did Grandma Asimina do once?' },
        optionen: [
          { na:{ de:'Sie hat drei Tage am Stück getanzt', es:'Bailó tres días seguidos', en:'She danced for three days straight' }, richtig:true },
          { na:{ de:'Sie hat drei Tage geschlafen', es:'Durmió tres días', en:'She slept for three days' }, richtig:false },
          { na:{ de:'Sie ist nach Hamburg gereist', es:'Viajó a Hamburgo', en:'She travelled to Hamburg' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag: { de:'Erzähl von einem Menschen aus deiner Kindheit: Was hat er oder sie immer gemacht, und was ist einmal passiert? Zwei Sätze.', es:'Habla de una persona de tu infancia: ¿qué hacía siempre y qué pasó una vez? Dos frases.', en:'Tell about a person from your childhood: what did he or she always do, and what happened once? Two sentences.' },
        muster: 'Ο παππούς μου κάθε βράδυ μου έλεγε ιστορίες. Μια φορά με πήγε με τη βάρκα του στο νησί.'
      },
      grammatik: {
        titel: { de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text: { de:'Griechisch hat zwei Vergangenheiten, und der Unterschied ist ein Bild. Der «παρατατικός» erzählt, was immer wieder geschah oder gerade lief: χόρευα, έστελνε, κοιμόμουν. Der «αόριστος» erzählt ein abgeschlossenes Ereignis: τη γνώρισα, μου χάρισε, χόρεψα τρεις μέρες. Das eine ist ein Film, das andere ein Foto.', es:'El griego tiene dos pasados, igual que el español. El «παρατατικός» es como el imperfecto: lo que pasaba una y otra vez — χόρευα (bailaba), έστελνε (mandaba). El «αόριστος» es como el indefinido: algo terminado — τη γνώρισα (la conocí), μου χάρισε (me regaló). Uno es una película; el otro, una foto.', en:'Greek has two past tenses, and the difference is a picture. The «παρατατικός» (imperfect) tells what kept happening or was going on — χόρευα, έστελνε, κοιμόμουν, like English “used to”. The «αόριστος» (aorist) tells one completed event — τη γνώρισα, μου χάρισε, χόρεψα τρεις μέρες. One is a film, the other a photo.' },
        beispiele: [
          { z:'Κάθε καλοκαίρι μου έστελνε κάρτες από την Ελλάδα.', tr:'Káthe kalokéri mou éstelne kártes apó tin Eláda.', na:{ de:'Jeden Sommer schickte sie mir Karten aus Griechenland.', es:'Cada verano me mandaba postales desde Grecia.', en:'Every summer she used to send me postcards from Greece.' } },
          { z:'Μια φορά χόρεψα τρεις μέρες συνέχεια.', tr:'Mia forá chórepsa tris méres sinéchia.', na:{ de:'Einmal habe ich drei Tage am Stück getanzt.', es:'Una vez bailé tres días seguidos.', en:'Once I danced for three days straight.' } }
        ]
      },
      kultur: { de:'Ikaria gehört zu den Orten der Welt, an denen besonders viele Menschen über neunzig werden. Man erzählt von Gemüse aus dem eigenen Garten, Kräutertee, Mittagsschlaf — und von den πανηγύρια, Festen, bei denen das ganze Dorf zusammen isst und bis zum Morgen den ikariotikos tanzt. Die Uhren gehen hier, sagt man, etwas langsamer.', es:'Icaria es uno de los lugares del mundo donde más gente pasa de los noventa años. Se habla de las verduras del propio huerto, las infusiones, la siesta… y de los πανηγύρια, fiestas en las que todo el pueblo come junto y baila el ikariótikos hasta el amanecer. Dicen que aquí los relojes van un poco más despacio.', en:'Ikaria is one of the places in the world where especially many people live past ninety. People talk about vegetables from their own garden, herbal tea, the afternoon nap — and the πανηγύρια, festivals where the whole village eats together and dances the ikariotikos until dawn. They say the clocks run a little slower here.' }
    }
  }
};

var K_LP_B = {

  schritt: {
    arzt:       { de:'Chania: ein verstauchter Knöchel und der Rat der Ärztin', es:'Chania: un esguince y los consejos de la doctora', en:'Chania: a sprained ankle and the doctor’s advice', el:'Χανιά: ένα στραμπούληγμα και οι συμβουλές της γιατρού' },
    einkaufen:  { de:'Rhodos: vergleichen und um einen besseren Preis bitten', es:'Rodas: comparar y pedir un precio mejor', en:'Rhodes: comparing and asking for a better price', el:'Ρόδος: συγκρίνεις και ζητάς καλύτερη τιμή' },
    restaurant: { de:'Santorini: ein Gespräch über Arbeit und Erfahrung', es:'Santorini: una conversación sobre trabajo y experiencia', en:'Santorini: a talk about work and experience', el:'Σαντορίνη: μια κουβέντα για δουλειά και εμπειρία' },
    bahnhof:    { de:'Athen → Thessaloniki: der Zug war schon weg', es:'Atenas → Salónica: el tren ya se había ido', en:'Athens → Thessaloniki: the train had already gone', el:'Αθήνα → Θεσσαλονίκη: το τρένο είχε ήδη φύγει' },
    taxi:       { de:'Zypern: plaudern, was wäre, wenn …', es:'Chipre: charlar sobre qué pasaría si …', en:'Cyprus: chatting about what if …', el:'Κύπρος: κουβέντα για το «τι θα γινόταν αν …»' }
  },

  aufgaben: {
    'b1.arzt': [
      { de:'Erzähle, dass du dir gestern auf einem Wanderweg den Knöchel verstaucht hast und er heute sehr geschwollen ist', es:'Cuenta que ayer te torciste el tobillo en un sendero y que hoy está muy hinchado', en:'Say you sprained your ankle on a path yesterday and today it is very swollen', el:'Πες ότι χθες στραμπούληξες τον αστράγαλο σε ένα μονοπάτι και ότι σήμερα είναι πολύ πρησμένος' },
      { de:'Sag, dass du keine AMKA hast, aber die Europäische Krankenversicherungskarte, und reich sie ihr', es:'Di que no tienes AMKA, pero sí la tarjeta sanitaria europea, y dásela', en:'Say you have no AMKA number but you do have the European Health Insurance Card, and hand it over', el:'Πες ότι δεν έχεις ΑΜΚΑ, αλλά έχεις την ευρωπαϊκή κάρτα ασφάλισης υγείας, και δώσε της την κάρτα' },
      { de:'Frag, ob du das Medikament mit Essen nehmen musst und wann du wieder normal gehen kannst', es:'Pregunta si tienes que tomar el medicamento con comida y cuándo podrás volver a caminar con normalidad', en:'Ask whether you have to take the medicine with food and when you can walk normally again', el:'Ρώτα αν πρέπει να παίρνεις το φάρμακο με φαγητό και πότε μπορείς να περπατήσεις πάλι κανονικά' }
    ],
    'b1.einkaufen': [
      { de:'Sag, dass die Teller wunderschön sind, und frag, ob er sie selbst bemalt und was diese Blumen bedeuten', es:'Di que los platos son preciosos y pregunta si los pinta él y qué significan esas flores', en:'Say the plates are beautiful and ask whether he paints them himself and what these flowers mean', el:'Πες ότι τα πιάτα είναι πανέμορφα και ρώτα αν τα ζωγραφίζει ο ίδιος και τι σημαίνουν αυτά τα λουλούδια' },
      { de:'Sag, dass der große schöner ist als der kleine, und frag nach einem besseren Preis', es:'Di que el grande es más bonito que el pequeño y pide un precio mejor', en:'Say the big one is prettier than the small one and ask for a better price', el:'Πες ότι το μεγάλο είναι πιο όμορφο από το μικρό και ζήτα μια καλύτερη τιμή' },
      { de:'Nimm diesen hier und frag, ob er ihn gut einpacken kann, weil du viel reist', es:'Di que te llevas este y pregunta si te lo puede envolver bien, porque viajas mucho', en:'Say you will take this one and ask whether he can wrap it well, because you travel a lot', el:'Πες ότι παίρνεις αυτό εδώ και ρώτα αν μπορεί να το τυλίξει καλά, γιατί ταξιδεύεις πολύ' }
    ],
    'b1.restaurant': [
      { de:'Sag, dass du seit sieben Monaten in Griechenland bist und einen Roman über das Licht schreibst', es:'Di que llevas siete meses en Grecia y que escribes una novela sobre la luz', en:'Say you have been in Greece for seven months and are writing a novel about light', el:'Πες ότι είσαι στην Ελλάδα εδώ και εφτά μήνες και γράφεις ένα μυθιστόρημα για το φως' },
      { de:'Sag, dass du noch nie in einer Taverne gearbeitet, aber viele Texte auf Englisch geschrieben hast', es:'Di que nunca has trabajado en una taberna, pero que has escrito muchos textos en inglés', en:'Say you have never worked in a taverna, but you have written lots of texts in English', el:'Πες ότι δεν έχεις δουλέψει σε ταβέρνα, αλλά ότι έχεις γράψει πολλά κείμενα στα αγγλικά' },
      { de:'Sag gern zu und biete an, morgen früh anzufangen, wenn es ihr recht ist', es:'Acepta con gusto y ofrece empezar mañana por la mañana, si a ella le va bien', en:'Gladly accept and offer to start tomorrow morning, if that suits her', el:'Δέξου με χαρά και πρότεινε να ξεκινήσεις αύριο το πρωί, αν της είναι εντάξει' }
    ],
    'b1.bahnhof': [
      { de:'Sag, dass du in der Metro deine Haltestelle verpasst hast und dein Zug schon abgefahren war, als du ankamst', es:'Di que te pasaste de parada en el metro y que, cuando llegaste, tu tren ya había salido', en:'Say you missed your stop on the metro and your train had already left when you arrived', el:'Πες ότι έχασες τη στάση στο μετρό και ότι, όταν έφτασες, το τρένο σου είχε ήδη φύγει' },
      { de:'Bitte um einen Fensterplatz auf der linken Seite, weil du den Olymp sehen willst', es:'Pide un asiento de ventanilla a la izquierda, porque quieres ver el Olimpo', en:'Ask for a window seat on the left, because you want to see Mount Olympus', el:'Ζήτα μια θέση στο παράθυρο, αριστερά, γιατί θέλεις να δεις τον Όλυμπο' },
      { de:'Frag, ob du dann den Bus nach Chalkidiki um fünf noch erreichst', es:'Pregunta si así llegarás a tiempo al autobús de las cinco a Calcídica', en:'Ask whether you will then still make the five o’clock bus to Halkidiki', el:'Ρώτα αν θα προλάβεις τότε το λεωφορείο των πέντε για τη Χαλκιδική' }
    ],
    'b1.taxi': [
      { de:'Sag, dass es sehr heiß ist und dass es in Hamburg zwanzig Grad hat und natürlich regnet', es:'Di que hace mucho calor y que en Hamburgo hace veinte grados y, claro, llueve', en:'Say it is very hot, and that in Hamburg it is twenty degrees and raining, of course', el:'Πες ότι κάνει πολλή ζέστη και ότι στο Αμβούργο έχει είκοσι βαθμούς και βρέχει, φυσικά' },
      { de:'Sag, dass du Halloumi bisher nur in Deutschland gegessen hast und dass es hier sicher besser schmeckt', es:'Di que solo has comido halloumi en Alemania y que aquí seguro que está más rico', en:'Say you have only eaten halloumi in Germany and that it is surely tastier here', el:'Πες ότι έχεις φάει χαλλούμι μόνο στη Γερμανία και ότι εδώ σίγουρα είναι πιο νόστιμο' },
      { de:'Sag, dass du einen Sommer lang bleiben würdest: Du würdest in den Bergen leben und jeden Morgen schreiben', es:'Di que te quedarías un verano: vivirías en las montañas y escribirías cada mañana', en:'Say you would stay for a summer: you would live in the mountains and write every morning', el:'Πες ότι θα έμενες ένα καλοκαίρι: θα ζούσες στα βουνά και θα έγραφες κάθε πρωί' }
    ]
  },

  stationen: {

    // ── B1 · Beim Arzt · Chania, Kreta (Mär) — das Licht der Samaria-Schlucht ──
    'b1.arzt': {
      deineRolle: { de:'Du bist Elli. Gestern hast du dir auf einem Wanderweg bei Chania den Knöchel verstaucht; heute ist er stark geschwollen. Eine AMKA hast du nicht, aber die Europäische Krankenversicherungskarte.', es:'Eres Elli. Ayer te torciste el tobillo en un sendero cerca de Chania; hoy está muy hinchado. No tienes AMKA, pero sí la tarjeta sanitaria europea.', en:'You are Elli. Yesterday you sprained your ankle on a path near Chania; today it is very swollen. You have no AMKA number, but you do have the European Health Insurance Card.', el:'Είσαι η Έλλη. Χθες στραμπούληξες τον αστράγαλο σε ένα μονοπάτι κοντά στα Χανιά· σήμερα είναι πολύ πρησμένος. ΑΜΚΑ δεν έχεις, έχεις όμως την ευρωπαϊκή κάρτα ασφάλισης υγείας.' },
      abrundung: { z:'Ναι, πάντα μετά το φαγητό. Σε μια εβδομάδα — αλλά με κλειστά παπούτσια, όχι με σανδάλια! Περαστικά!', tr:'Ne, pánda metá to fayitó. Se mia evdomáda — alá me klistá papoútsia, óchi me sandália! Perastiká!', na:{ de:'Ja, immer nach dem Essen. In einer Woche — aber mit geschlossenen Schuhen, nicht mit Sandalen! Gute Besserung!', es:'Sí, siempre después de comer. Dentro de una semana, pero con zapato cerrado, ¡no con sandalias! ¡Que se mejore!', en:'Yes, always after food. In a week — but in closed shoes, not sandals! Get well soon!' } },
      rollen: {
        spikiu: { de:'die Ärztin, Dr. Maria Papadaki', es:'la doctora María Papadaki', en:'the doctor, Dr Maria Papadaki', el:'η γιατρός, η Μαρία Παπαδάκη' },
        lerner: { de:'Elli, die Schriftstellerin', es:'Elli, la escritora', en:'Elli, the novelist', el:'η Έλλη, η συγγραφέας' },
        ort:    { de:'im Gesundheitszentrum bei Chania, Kreta', es:'en el centro de salud cerca de Chania, Creta', en:'at the health centre near Chania, Crete', el:'στο κέντρο υγείας κοντά στα Χανιά, στην Κρήτη' }
      },
      wortschatz: [
        { z:'ο αστράγαλος', tr:'o astrágalos', na:{ de:'der Knöchel', es:'el tobillo', en:'the ankle' } },
        { z:'στραμπούληξα', tr:'stramboúlixa', na:{ de:'ich habe mir verstaucht', es:'me torcí (un esguince)', en:'I sprained' } },
        { z:'πρησμένος', tr:'prisménos', na:{ de:'geschwollen', es:'hinchado', en:'swollen' } },
        { z:'ο πάγος', tr:'o págos', na:{ de:'das Eis (zum Kühlen)', es:'el hielo', en:'ice' } },
        { z:'ο επίδεσμος', tr:'o epídesmos', na:{ de:'der Verband', es:'la venda', en:'the bandage' } },
        { z:'το αντιφλεγμονώδες', tr:'to andiflegmonódes', na:{ de:'der Entzündungshemmer', es:'el antiinflamatorio', en:'the anti-inflammatory' } },
        { z:'η αλοιφή', tr:'i alifí', na:{ de:'die Salbe', es:'la pomada', en:'the ointment' } },
        { z:'η ευρωπαϊκή κάρτα ασφάλισης υγείας', tr:'i evropaikí kárta asfálisis iyías', na:{ de:'die Europäische Krankenversicherungskarte', es:'la tarjeta sanitaria europea', en:'the European Health Insurance Card' } },
        { z:'πατάω', tr:'patáo', na:{ de:'auftreten', es:'apoyar el pie, pisar', en:'to put weight on, to step' } },
        { z:'ξεκουράζομαι', tr:'xekourázome', na:{ de:'sich ausruhen', es:'descansar', en:'to rest' } },
        { z:'σας συνιστώ να …', tr:'sas sinistó na …', na:{ de:'ich empfehle Ihnen, …', es:'le recomiendo que …', en:'I recommend that you …' } },
        { z:'πρέπει να …', tr:'prépi na …', na:{ de:'man muss …, ich muss …', es:'hay que …, tengo que …', en:'you must …, I have to …' } }
      ],
      dialog: {
        rolle: { de:'Die Ärztin, Dr. Maria Papadaki', es:'La doctora María Papadaki', en:'The doctor, Dr Maria Papadaki' },
        zeilen: [
          { wer:'spikiu', z:'Καλημέρα, περάστε. Βλέπω ότι κουτσαίνετε — τι σας συνέβη;', tr:'Kaliméra, peráste. Vlépo óti koutsénete — ti sas sinévi?', na:{ de:'Guten Morgen, kommen Sie herein. Ich sehe, Sie hinken — was ist Ihnen passiert?', es:'Buenos días, pase. Veo que cojea, ¿qué le ha pasado?', en:'Good morning, come in. I see you’re limping — what happened to you?' } },
          { wer:'lerner', z:'Χθες στραμπούληξα τον αστράγαλο σε ένα μονοπάτι και σήμερα είναι πολύ πρησμένος.', tr:'Chthes stramboúlixa ton astrágalo se éna monopáti ke símera íne polí prisménos.', na:{ de:'Gestern habe ich mir auf einem Wanderweg den Knöchel verstaucht, und heute ist er sehr geschwollen.', es:'Ayer me torcí el tobillo en un sendero y hoy está muy hinchado.', en:'Yesterday I sprained my ankle on a path, and today it’s very swollen.' } },
          { wer:'spikiu', z:'Για να δούμε… Δεν μοιάζει σπασμένος. Έχετε ΑΜΚΑ ή ευρωπαϊκή κάρτα;', tr:'Ya na doúme… Den miázi spasménos. Échete ámka i evropaikí kárta?', na:{ de:'Mal sehen … Er sieht nicht gebrochen aus. Haben Sie eine AMKA oder die europäische Karte?', es:'A ver… No parece roto. ¿Tiene AMKA o la tarjeta europea?', en:'Let’s see … It doesn’t look broken. Do you have an AMKA number or the European card?' } },
          { wer:'lerner', z:'Δεν έχω ΑΜΚΑ, αλλά έχω την ευρωπαϊκή κάρτα ασφάλισης υγείας. Ορίστε.', tr:'Den écho ámka, alá écho tin evropaikí kárta asfálisis iyías. Oríste.', na:{ de:'Ich habe keine AMKA, aber ich habe die Europäische Krankenversicherungskarte. Bitte schön.', es:'No tengo AMKA, pero tengo la tarjeta sanitaria europea. Aquí tiene.', en:'I don’t have an AMKA number, but I have the European Health Insurance Card. Here you are.' } },
          { wer:'spikiu', z:'Ωραία. Σας συνιστώ να βάζετε πάγο τρεις φορές τη μέρα και να ξεκουράζεστε. Θα σας γράψω κι ένα αντιφλεγμονώδες.', tr:'Oréa. Sas sinistó na vázete págo tris forés ti méra ke na xekourázeste. Tha sas grápso ki éna andiflegmonódes.', na:{ de:'Gut. Ich empfehle Ihnen, dreimal am Tag Eis aufzulegen und sich auszuruhen. Ich verschreibe Ihnen auch einen Entzündungshemmer.', es:'Bien. Le recomiendo que se ponga hielo tres veces al día y que descanse. También le voy a recetar un antiinflamatorio.', en:'Good. I recommend you put ice on it three times a day and rest. I’ll also prescribe you an anti-inflammatory.' } },
          { wer:'lerner', z:'Πρέπει να το παίρνω με φαγητό; Και πότε μπορώ να περπατήσω πάλι κανονικά;', tr:'Prépi na to pérno me fayitó? Ke póte boró na perpatíso páli kanoniká?', na:{ de:'Muss ich es mit Essen nehmen? Und wann kann ich wieder normal gehen?', es:'¿Tengo que tomarlo con comida? ¿Y cuándo podré volver a caminar con normalidad?', en:'Do I have to take it with food? And when can I walk normally again?' } }
        ]
      },
      lesetext: {
        z:'Ήθελα να δω το φως στο φαράγγι της Σαμαριάς, αλλά τον Μάρτιο είναι ακόμα κλειστό. Περπάτησα σε ένα μικρότερο φαράγγι και στραμπούληξα τον αστράγαλο. Στο κέντρο υγείας είπα: «Καλημέρα, κυρία ιατρέ». Η γιατρός γέλασε: «Ιατρός γράφει η πινακίδα. Εμείς λέμε γιατρός!» Η λέξη του τόπου: «Περαστικά».',
        tr:'Íthela na do to fos sto farángi tis Samariás, alá ton Mártio íne akóma klistó. Perpátisa se éna mikrótero farángi ke stramboúlixa ton astrágalo. Sto kéndro iyías ípa: «Kaliméra, kiría iatré». I yatrós yélase: «Iatrós gráfi i pinakída. Emís léme yatrós!» I léxi tou tópou: «Perastiká».',
        na:{ de:'Ich wollte das Licht in der Samaria-Schlucht sehen, aber im März ist sie noch geschlossen. Ich bin durch eine kleinere Schlucht gewandert und habe mir den Knöchel verstaucht. Im Gesundheitszentrum sagte ich: „Guten Morgen, Frau Iatros." Die Ärztin lachte: „Iatros steht auf dem Schild. Wir sagen Giatros!" Das Wort des Ortes: „Perastiká" — gute Besserung.',
             es:'Quería ver la luz en la garganta de Samaria, pero en marzo todavía está cerrada. Caminé por una garganta más pequeña y me torcí el tobillo. En el centro de salud dije: «Buenos días, señora iatrós». La doctora se rio: «Iatrós lo pone en el cartel. ¡Nosotros decimos yatrós!». La palabra del lugar: «Perastiká», que se mejore.',
             en:'I wanted to see the light in the Samaria Gorge, but in March it is still closed. I walked through a smaller gorge and sprained my ankle. At the health centre I said, “Good morning, Madam Iatros.” The doctor laughed: “Iatros is what the sign says. We say yatros!” The word of the place: “Perastiká” — get well soon.' },
        frage:{ de:'Warum ist Elli nicht durch die Samaria-Schlucht gewandert?', es:'¿Por qué Elli no recorrió la garganta de Samaria?', en:'Why didn’t Elli walk through the Samaria Gorge?' },
        optionen:[
          { na:{ de:'Im März ist sie noch geschlossen', es:'En marzo todavía está cerrada', en:'In March it is still closed' }, richtig:true  },
          { na:{ de:'Sie hatte sich schon den Knöchel verstaucht', es:'Ya se había torcido el tobillo', en:'She had already sprained her ankle' }, richtig:false },
          { na:{ de:'Es hat den ganzen Tag geregnet', es:'Llovió todo el día', en:'It rained all day' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähl, was dir passiert ist, und frag, was du jetzt tun musst (mit „πρέπει να"). Zwei Sätze.', es:'Cuenta qué te ha pasado y pregunta qué tienes que hacer ahora (con «πρέπει να»). Dos frases.', en:'Say what happened to you and ask what you have to do now (with “πρέπει να”). Two sentences.' },
        muster:'Χθες έπεσα από το ποδήλατο και με πονάει πολύ ο καρπός. Πρέπει να κάνω ακτινογραφία;'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ de:'„Πρέπει να" + Verb heißt „man muss / ich muss": πρέπει να ξεκουραστείτε. Das Verb nach να steht in derselben Form wie nach θα. Ein Rat klingt höflicher mit „σας συνιστώ να …" (ich empfehle Ihnen, …), verneint mit „να μην": σας συνιστώ να μην περπατάτε πολύ. Soll man etwas immer wieder tun, nimmt man die Dauerform: να βάζετε πάγο (regelmäßig) — να βάλετε πάγο (einmal).',
               es:'«Πρέπει να» + verbo significa «hay que / tengo que»: πρέπει να ξεκουραστείτε. El verbo después de να va en la misma forma que después de θα. Un consejo suena más amable con «σας συνιστώ να…» (le recomiendo que…), y en negativo con «να μην»: σας συνιστώ να μην περπατάτε πολύ. Si algo se hace una y otra vez, se usa la forma continua: να βάζετε πάγο (a menudo) — να βάλετε πάγο (una vez).',
               en:'“Πρέπει να” + verb means “you must / I have to”: πρέπει να ξεκουραστείτε. The verb after να takes the same form as after θα. Advice sounds more polite with “σας συνιστώ να …” (I recommend that you …), and the negative is “να μην”: σας συνιστώ να μην περπατάτε πολύ. If something is to be done again and again, use the continuous form: να βάζετε πάγο (regularly) — να βάλετε πάγο (once).' },
        beispiele:[
          { z:'Πρέπει να βάζετε πάγο τρεις φορές τη μέρα.', tr:'Prépi na vázete págo tris forés ti méra.', na:{ de:'Sie müssen dreimal am Tag Eis auflegen.', es:'Tiene que ponerse hielo tres veces al día.', en:'You have to put ice on it three times a day.' } },
          { z:'Σας συνιστώ να μην περπατάτε πολύ.', tr:'Sas sinistó na min perpatáte polí.', na:{ de:'Ich empfehle Ihnen, nicht viel zu gehen.', es:'Le recomiendo que no camine mucho.', en:'I recommend that you don’t walk much.' } }
        ]
      },
      kultur:{ de:'Die Samaria-Schlucht in den Weißen Bergen (Λευκά Όρη) ist rund 16 km lang und meist nur von Mai bis Oktober geöffnet. Wer krank ist, hört auf Kreta — und in ganz Griechenland — „Περαστικά!": „Möge es vorübergehen."',
               es:'La garganta de Samaria, en las Montañas Blancas (Λευκά Όρη), mide unos 16 km y suele abrir solo de mayo a octubre. A quien está enfermo, en Creta —y en toda Grecia— se le dice «Περαστικά!»: «que se te pase».',
               en:'The Samaria Gorge in the White Mountains (Λευκά Όρη) is about 16 km long and is usually open only from May to October. If you are ill, people in Crete — and all over Greece — say “Περαστικά!”: “may it pass.”' }
    },

    // ── B1 · Einkaufen · Altstadt von Rhodos (Apr, Ostern) — Kerzenlicht der Ανάσταση ──
    'b1.einkaufen': {
      deineRolle: { de:'Du bist Elli. Es ist Karsamstag in der Altstadt von Rhodos. Du suchst einen handbemalten Teller für deine Freundin Margarete. Der große gefällt dir besser, aber du möchtest einen besseren Preis. Du reist noch viel.', es:'Eres Elli. Es Sábado Santo en el casco antiguo de Rodas. Buscas un plato pintado a mano para tu amiga Margarete. El grande te gusta más, pero quieres un precio mejor. Todavía vas a viajar mucho.', en:'You are Elli. It is Holy Saturday in the old town of Rhodes. You are looking for a hand-painted plate for your friend Margarete. You like the big one better, but you would like a better price. You still have a lot of travelling ahead.', el:'Είσαι η Έλλη. Είναι Μεγάλο Σάββατο στην παλιά πόλη της Ρόδου. Ψάχνεις ένα πιάτο ζωγραφισμένο στο χέρι για τη φίλη σου τη Μαργκαρέτε. Το μεγάλο σού αρέσει περισσότερο, αλλά θέλεις καλύτερη τιμή. Θα ταξιδέψεις ακόμα πολύ.' },
      abrundung: { z:'Με χαρτί και με αγάπη! Κι απόψε, στην Ανάσταση, ελάτε με λαμπάδα. Θα δείτε τι φως!', tr:'Me chartí ke me agápi! Ki apópse, stin Anástasi, eláte me lambáda. Tha díte ti fos!', na:{ de:'Mit Papier und mit Liebe! Und heute Nacht, zur Auferstehungsfeier, kommen Sie mit einer Osterkerze. Sie werden sehen, was für ein Licht!', es:'¡Con papel y con cariño! Y esta noche, en la Resurrección, venga con una vela. ¡Ya verá qué luz!', en:'With paper and with love! And tonight, at the Resurrection, come with an Easter candle. You’ll see what light!' } },
      rollen: {
        spikiu: { de:'Kyr Manolis, der Keramik verkauft', es:'el señor Manolis, que vende cerámica', en:'Kyr Manolis, who sells ceramics', el:'ο κυρ-Μανώλης, που πουλάει κεραμικά' },
        lerner: { de:'Elli, die Schriftstellerin', es:'Elli, la escritora', en:'Elli, the novelist', el:'η Έλλη, η συγγραφέας' },
        ort:    { de:'in einem kleinen Laden in der Altstadt von Rhodos', es:'en una tiendecita del casco antiguo de Rodas', en:'in a little shop in the old town of Rhodes', el:'σε ένα μαγαζάκι στην παλιά πόλη της Ρόδου' }
      },
      wortschatz: [
        { z:'τα κεραμικά', tr:'ta keramiká', na:{ de:'die Keramik', es:'la cerámica', en:'ceramics, pottery' } },
        { z:'ζωγραφισμένος στο χέρι', tr:'zografisménos sto chéri', na:{ de:'handbemalt', es:'pintado a mano', en:'hand-painted' } },
        { z:'το σχέδιο', tr:'to schédio', na:{ de:'das Muster', es:'el dibujo, el motivo', en:'the pattern, the design' } },
        { z:'πιο … από', tr:'pio … apó', na:{ de:'…er als', es:'más … que', en:'more … than' } },
        { z:'πιο φτηνός', tr:'pio ftinós', na:{ de:'billiger', es:'más barato', en:'cheaper' } },
        { z:'Μου κάνετε μια καλύτερη τιμή;', tr:'Mou kánete mia kalíteri timí?', na:{ de:'Machen Sie mir einen besseren Preis?', es:'¿Me hace un precio mejor?', en:'Can you give me a better price?' } },
        { z:'αυτό εδώ', tr:'aftó edó', na:{ de:'dieses hier', es:'este de aquí', en:'this one here' } },
        { z:'εκείνο εκεί', tr:'ekíno ekí', na:{ de:'jenes dort', es:'aquel de allí', en:'that one there' } },
        { z:'τυλίγω', tr:'tilígo', na:{ de:'einpacken, einwickeln', es:'envolver', en:'to wrap' } },
        { z:'χαρίζω', tr:'charízo', na:{ de:'schenken', es:'regalar', en:'to give as a gift' } },
        { z:'το σφουγγάρι', tr:'to sfoungári', na:{ de:'der Schwamm', es:'la esponja', en:'the sponge' } },
        { z:'η λαμπάδα', tr:'i lambáda', na:{ de:'die (Oster-)Kerze', es:'el cirio (de Pascua)', en:'the (Easter) candle' } }
      ],
      dialog: {
        rolle: { de:'Kyr Manolis, der Keramik verkauft', es:'El señor Manolis, que vende cerámica', en:'Kyr Manolis, who sells ceramics' },
        zeilen: [
          { wer:'spikiu', z:'Καλώς τη! Ελάτε, κοιτάξτε ελεύθερα. Όλα τα πιάτα είναι ζωγραφισμένα στο χέρι.', tr:'Kalós ti! Eláte, kitáxte eléfthera. Óla ta piáta íne zografisména sto chéri.', na:{ de:'Willkommen! Kommen Sie, schauen Sie sich ruhig um. Alle Teller sind handbemalt.', es:'¡Bienvenida! Pase, mire con tranquilidad. Todos los platos están pintados a mano.', en:'Welcome! Come in, have a look around. All the plates are hand-painted.' } },
          { wer:'lerner', z:'Είναι πανέμορφα! Τα ζωγραφίζετε εσείς; Και τι σημαίνουν αυτά τα λουλούδια;', tr:'Íne panémorfa! Ta zografízete esís? Ke ti siménoun aftá ta louloúdia?', na:{ de:'Sie sind wunderschön! Bemalen Sie sie selbst? Und was bedeuten diese Blumen?', es:'¡Son preciosos! ¿Los pinta usted? ¿Y qué significan estas flores?', en:'They’re beautiful! Do you paint them yourself? And what do these flowers mean?' } },
          { wer:'spikiu', z:'Τα πουλιά τα ζωγραφίζω εγώ, τα λουλούδια η γυναίκα μου. Είναι λινδιακά σχέδια: τουλίπες και γαρίφαλα, όπως παλιά στη Λίνδο. Το μεγάλο κάνει σαράντα, το μικρό είκοσι πέντε.', tr:'Ta pouliá ta zografízo egó, ta louloúdia i yinéka mou. Íne lindiaká schédia: toulípes ke garífala, ópos paliá sti Líndo. To megálo káni saránda, to mikró íkosi pénde.', na:{ de:'Die Vögel male ich, die Blumen meine Frau. Das sind Lindos-Muster: Tulpen und Nelken, wie früher in Lindos. Der große kostet vierzig, der kleine fünfundzwanzig.', es:'Los pájaros los pinto yo; las flores, mi mujer. Son motivos de Lindos: tulipanes y claveles, como antes en Lindos. El grande cuesta cuarenta; el pequeño, veinticinco.', en:'I paint the birds, my wife the flowers. They’re Lindos designs: tulips and carnations, like in Lindos long ago. The big one is forty, the small one twenty-five.' } },
          { wer:'lerner', z:'Το μεγάλο είναι πιο όμορφο από το μικρό. Μου κάνετε μια καλύτερη τιμή;', tr:'To megálo íne pio ómorfo apó to mikró. Mou kánete mia kalíteri timí?', na:{ de:'Der große ist schöner als der kleine. Machen Sie mir einen besseren Preis?', es:'El grande es más bonito que el pequeño. ¿Me hace un precio mejor?', en:'The big one is prettier than the small one. Can you give me a better price?' } },
          { wer:'spikiu', z:'Για σας, τριάντα πέντε. Και σας χαρίζω κι ένα σφουγγάρι από τη Σύμη — για το Πάσχα!', tr:'Ya sas, triánda pénde. Ke sas charízo ki éna sfoungári apó ti Sími — ya to Páscha!', na:{ de:'Für Sie fünfunddreißig. Und ich schenke Ihnen noch einen Schwamm aus Symi — zu Ostern!', es:'Para usted, treinta y cinco. ¡Y le regalo una esponja de Simi, por Pascua!', en:'For you, thirty-five. And I’ll give you a sponge from Symi as well — for Easter!' } },
          { wer:'lerner', z:'Τότε παίρνω αυτό εδώ. Μπορείτε να το τυλίξετε καλά; Ταξιδεύω πολύ.', tr:'Tóte pérno aftó edó. Boríte na to tilíxete kalá? Taxidévo polí.', na:{ de:'Dann nehme ich diesen hier. Können Sie ihn gut einpacken? Ich reise viel.', es:'Entonces me llevo este. ¿Me lo puede envolver bien? Viajo mucho.', en:'Then I’ll take this one. Could you wrap it well? I travel a lot.' } }
        ]
      },
      lesetext: {
        z:'Το Μεγάλο Σάββατο αγόρασα από τον κυρ-Μανώλη ένα πιάτο με τουλίπες για τη Μαργκαρέτε. Όταν ζήτησα «έναν σπόγγο», η εγγονή του γέλασε, και ο κυρ-Μανώλης είπε: «Σπόγγος; Εμείς λέμε σφουγγάρι.» Στο τέλος μου χάρισε κι ένα. Τα μεσάνυχτα όλη η παλιά πόλη κρατούσε λαμπάδες, και το φως περνούσε από χέρι σε χέρι.',
        tr:'To Megálo Sávato agórasa apó ton kir-Manóli éna piáto me toulípes ya ti Margaréte. Ótan zítisa «énan spóngo», i engoní tou yélase, ke o kir-Manólis ípe: «Spóngos? Emís léme sfoungári.» Sto télos mou chárise ki éna. Ta mesánichta óli i paliá póli kratoúse lambádes, ke to fos pernoúse apó chéri se chéri.',
        na:{ de:'Am Karsamstag habe ich bei Kyr Manolis einen Teller mit Tulpen für Margarete gekauft. Als ich nach „einem Spongos“ fragte, lachte seine Enkelin, und Kyr Manolis sagte: „Spongos? Wir sagen Sfoungari.“ Am Ende hat er mir einen geschenkt. Um Mitternacht hielt die ganze Altstadt Kerzen, und das Licht ging von Hand zu Hand.',
             es:'El Sábado Santo le compré al señor Manolis un plato con tulipanes para Margarete. Cuando pedí «un spóngos», su nieta se rio, y el señor Manolis dijo: «¿Spóngos? Nosotros decimos sfungári». Al final me regaló una. A medianoche todo el casco antiguo sostenía velas, y la luz pasaba de mano en mano.',
             en:'On Holy Saturday I bought a plate with tulips from Kyr Manolis for Margarete. When I asked for “a spongos”, his granddaughter laughed, and Kyr Manolis said: “Spongos? We say sfoungari.” In the end he gave me one. At midnight the whole old town held candles, and the light passed from hand to hand.' },
        frage:{ de:'Wie sagt man im Alltag zu einem Schwamm?', es:'¿Cómo se dice «esponja» en el día a día?', en:'What is the everyday word for a sponge?' },
        optionen:[
          { na:{ de:'το σφουγγάρι', es:'το σφουγγάρι', en:'το σφουγγάρι' }, richtig:true  },
          { na:{ de:'ο σπόγγος', es:'ο σπόγγος', en:'ο σπόγγος' }, richtig:false },
          { na:{ de:'η λαμπάδα', es:'η λαμπάδα', en:'η λαμπάδα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Vergleiche zwei Dinge in einem Laden und bitte um einen besseren Preis. Zwei Sätze.', es:'Compara dos cosas en una tienda y pide un precio mejor. Dos frases.', en:'Compare two things in a shop and ask for a better price. Two sentences.' },
        muster:'Αυτή η τσάντα είναι πιο ωραία από εκείνη. Μου κάνετε μια καλύτερη τιμή;'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ de:'Vergleichen geht mit πιο + Adjektiv + από: πιο όμορφο από το μικρό (schöner als der kleine). Nach από steht der Akkusativ: από το μικρό, από τον άλλο. Ein paar Wörter haben eine eigene Form: καλός → καλύτερος. Und Achtung: Demonstrativa behalten im Griechischen den Artikel — αυτό το πιάτο (dieser Teller), εκείνο το βάζο (jene Vase dort).',
               es:'Para comparar se usa πιο + adjetivo + από: πιο όμορφο από το μικρό (más bonito que el pequeño). Después de από va el acusativo: από το μικρό, από τον άλλο. Algunas palabras tienen forma propia: καλός → καλύτερος. Y ojo: en griego el demostrativo conserva el artículo — αυτό το πιάτο (este plato), εκείνο το βάζο (aquel jarrón).',
               en:'To compare, use πιο + adjective + από: πιο όμορφο από το μικρό (prettier than the small one). After από comes the accusative: από το μικρό, από τον άλλο. A few words have their own form: καλός → καλύτερος. And note: in Greek, demonstratives keep the article — αυτό το πιάτο (this plate), εκείνο το βάζο (that vase over there).' },
        beispiele:[
          { z:'Το μεγάλο είναι πιο όμορφο από το μικρό.', tr:'To megálo íne pio ómorfo apó to mikró.', na:{ de:'Der große ist schöner als der kleine.', es:'El grande es más bonito que el pequeño.', en:'The big one is prettier than the small one.' } },
          { z:'Παίρνω αυτό το πιάτο, όχι εκείνο.', tr:'Pérno aftó to piáto, óchi ekíno.', na:{ de:'Ich nehme diesen Teller, nicht jenen.', es:'Me llevo este plato, no aquel.', en:'I’ll take this plate, not that one.' } }
        ]
      },
      kultur:{ de:'Die mittelalterliche Altstadt von Rhodos ist UNESCO-Welterbe. In der Osternacht wird um Mitternacht das Licht von Kerze zu Kerze weitergegeben; die Osterkerze heißt λαμπάδα. Die Schwämme kommen traditionell von den Nachbarinseln Symi und Kalymnos.',
               es:'El casco antiguo medieval de Rodas es Patrimonio de la Humanidad de la UNESCO. En la noche de Pascua, a medianoche, la luz pasa de vela en vela; el cirio de Pascua se llama λαμπάδα. Las esponjas vienen tradicionalmente de las islas vecinas de Simi y Kálimnos.',
               en:'The medieval old town of Rhodes is a UNESCO World Heritage Site. On Easter night, at midnight, the light is passed from candle to candle; the Easter candle is called a λαμπάδα. The sponges traditionally come from the neighbouring islands of Symi and Kalymnos.' }
    },

    // ── B1 · In der Taverne · Oia, Santorini (Mai) — der berühmte Sonnenuntergang ──
    'b1.restaurant': {
      duzen: true,
      deineRolle: { de:'Du bist Elli. Du bist seit sieben Monaten in Griechenland und schreibst einen Roman über das Licht. In einer Taverne hast du noch nie gearbeitet, aber du hast viele Texte auf Englisch geschrieben. Du könntest morgen früh anfangen.', es:'Eres Elli. Llevas siete meses en Grecia y escribes una novela sobre la luz. Nunca has trabajado en una taberna, pero has escrito muchos textos en inglés. Podrías empezar mañana por la mañana.', en:'You are Elli. You have been in Greece for seven months and are writing a novel about light. You have never worked in a taverna, but you have written lots of texts in English. You could start tomorrow morning.', el:'Είσαι η Έλλη. Είσαι στην Ελλάδα εδώ και εφτά μήνες και γράφεις ένα μυθιστόρημα για το φως. Δεν έχεις δουλέψει ποτέ σε ταβέρνα, αλλά έχεις γράψει πολλά κείμενα στα αγγλικά. Θα μπορούσες να ξεκινήσεις αύριο το πρωί.' },
      abrundung: { z:'Αύριο στις δέκα, λοιπόν. Και το βράδυ κάθεσαι στην ταράτσα — το ηλιοβασίλεμα το κερνάει το σπίτι!', tr:'Ávrio stis déka, lipón. Ke to vrádi káthese stin tarátsa — to iliovasílema to kernái to spíti!', na:{ de:'Also morgen um zehn. Und abends setzt du dich auf die Terrasse — der Sonnenuntergang geht aufs Haus!', es:'Mañana a las diez, entonces. Y por la tarde te sientas en la terraza: ¡la puesta de sol corre a cuenta de la casa!', en:'Tomorrow at ten, then. And in the evening you sit on the terrace — the sunset is on the house!' } },
      rollen: {
        spikiu: { de:'Despina, die Wirtin der Taverne', es:'Déspina, la dueña de la taberna', en:'Despina, the taverna owner', el:'η κυρία Δέσποινα, η ιδιοκτήτρια της ταβέρνας' },
        lerner: { de:'Elli, die Schriftstellerin', es:'Elli, la escritora', en:'Elli, the novelist', el:'η Έλλη, η συγγραφέας' },
        ort:    { de:'auf der Terrasse einer Familientaverne in Oia, Santorini', es:'en la terraza de una taberna familiar en Oia, Santorini', en:'on the terrace of a family taverna in Oia, Santorini', el:'στην ταράτσα μιας οικογενειακής ταβέρνας στην Οία της Σαντορίνης' }
      },
      wortschatz: [
        { z:'ο κατάλογος', tr:'o katálogos', na:{ de:'die Speisekarte', es:'la carta', en:'the menu' } },
        { z:'η συνέντευξη', tr:'i sinéndefxi', na:{ de:'das (Vorstellungs-)Gespräch', es:'la entrevista', en:'the interview' } },
        { z:'η εμπειρία', tr:'i embiría', na:{ de:'die Erfahrung', es:'la experiencia', en:'experience' } },
        { z:'έχω δουλέψει', tr:'écho doulépsi', na:{ de:'ich habe gearbeitet', es:'he trabajado', en:'I have worked' } },
        { z:'εδώ και …', tr:'edó ke …', na:{ de:'seit …', es:'desde hace …', en:'for … (up to now)' } },
        { z:'το μυθιστόρημα', tr:'to mithistórima', na:{ de:'der Roman', es:'la novela', en:'the novel' } },
        { z:'το ωράριο', tr:'to orário', na:{ de:'die Arbeitszeiten', es:'el horario', en:'the working hours' } },
        { z:'η βάρδια', tr:'i várdia', na:{ de:'die Schicht', es:'el turno', en:'the shift' } },
        { z:'η ταράτσα', tr:'i tarátsa', na:{ de:'die Dachterrasse', es:'la azotea, la terraza', en:'the roof terrace' } },
        { z:'το ηλιοβασίλεμα', tr:'to iliovasílema', na:{ de:'der Sonnenuntergang', es:'la puesta de sol', en:'the sunset' } },
        { z:'η καλντέρα', tr:'i kaldéra', na:{ de:'die Caldera (Vulkankessel)', es:'la caldera (volcánica)', en:'the caldera' } },
        { z:'κερνάει το σπίτι', tr:'kernái to spíti', na:{ de:'das geht aufs Haus', es:'invita la casa', en:'it’s on the house' } }
      ],
      dialog: {
        rolle: { de:'Despina, die Wirtin der Taverne', es:'Déspina, la dueña de la taberna', en:'Despina, the taverna owner' },
        zeilen: [
          { wer:'spikiu', z:'Καλώς ήρθες! Δέσποινα — και μιλάμε στον ενικό, ε; Λοιπόν, πόσο καιρό είσαι στην Ελλάδα;', tr:'Kalós írthes! Déspina — ke miláme ston enikó, e? Lipón, póso keró íse stin Eláda?', na:{ de:'Willkommen! Despina — und wir duzen uns, ja? Also, wie lange bist du schon in Griechenland?', es:'¡Bienvenida! Déspina, y nos tuteamos, ¿eh? Bueno, ¿cuánto tiempo llevas en Grecia?', en:'Welcome! I’m Despina — and let’s keep it informal, OK? So, how long have you been in Greece?' } },
          { wer:'lerner', z:'Είμαι στην Ελλάδα εδώ και εφτά μήνες. Γράφω ένα μυθιστόρημα για το φως.', tr:'Íme stin Eláda edó ke eftá mínes. Gráfo éna mithistórima ya to fos.', na:{ de:'Ich bin seit sieben Monaten in Griechenland. Ich schreibe einen Roman über das Licht.', es:'Llevo siete meses en Grecia. Estoy escribiendo una novela sobre la luz.', en:'I’ve been in Greece for seven months. I’m writing a novel about light.' } },
          { wer:'spikiu', z:'Μυθιστόρημα! Ωραία. Κι έχεις δουλέψει ποτέ σε ταβέρνα ή σε κουζίνα;', tr:'Mithistórima! Oréa. Ki échis doulépsi poté se tavérna i se kouzína?', na:{ de:'Ein Roman! Schön. Und hast du schon mal in einer Taverne oder in einer Küche gearbeitet?', es:'¡Una novela! Qué bien. ¿Y has trabajado alguna vez en una taberna o en una cocina?', en:'A novel! Lovely. And have you ever worked in a taverna or a kitchen?' } },
          { wer:'lerner', z:'Δεν έχω δουλέψει σε ταβέρνα, αλλά έχω γράψει πολλά κείμενα στα αγγλικά.', tr:'Den écho doulépsi se tavérna, alá écho grápsi polá kímena sta angliká.', na:{ de:'Ich habe noch nie in einer Taverne gearbeitet, aber ich habe viele Texte auf Englisch geschrieben.', es:'No he trabajado en una taberna, pero he escrito muchos textos en inglés.', en:'I haven’t worked in a taverna, but I’ve written lots of texts in English.' } },
          { wer:'spikiu', z:'Αυτό ακριβώς θέλω! Ο κατάλογός μας γράφει «fried sea» αντί για «fried fish». Θα τον ξαναγράψεις; Πέντε ώρες τη μέρα, για μια εβδομάδα — με φαγητό.', tr:'Aftó akrivós thélo! O katálogós mas gráfi «fried sea» andí ya «fried fish». Tha ton xanagrápsis? Pénde óres ti méra, ya mia evdomáda — me fayitó.', na:{ de:'Genau das will ich! Auf unserer Karte steht „fried sea" statt „fried fish". Schreibst du sie neu? Fünf Stunden am Tag, eine Woche lang — mit Essen.', es:'¡Justo eso quiero! Nuestra carta pone «fried sea» en vez de «fried fish». ¿La vuelves a escribir? Cinco horas al día, durante una semana, con comida incluida.', en:'That’s exactly what I want! Our menu says “fried sea” instead of “fried fish”. Will you rewrite it? Five hours a day, for a week — meals included.' } },
          { wer:'lerner', z:'Με μεγάλη χαρά! Μπορώ να ξεκινήσω αύριο το πρωί, αν σου είναι εντάξει.', tr:'Me megáli chará! Boró na xekiníso ávrio to proí, an sou íne endáxi.', na:{ de:'Sehr gern! Ich kann morgen früh anfangen, wenn es dir recht ist.', es:'¡Con mucho gusto! Puedo empezar mañana por la mañana, si te va bien.', en:'With great pleasure! I can start tomorrow morning, if that’s OK with you.' } }
        ]
      },
      lesetext: {
        z:'Εδώ και μια εβδομάδα βοηθάω στην ταβέρνα της Δέσποινας στην Οία. Γράφω τον κατάλογο στα αγγλικά. Την πρώτη μέρα έγραψα «ιχθύς» και ο Νίκος, ο γιος της, γέλασε: «Ιχθύς στα αρχαία! Εδώ λέμε ψάρι.» Κάθε βράδυ ο ήλιος πέφτει στη θάλασσα και όλοι στην ταράτσα τον χειροκροτούν.',
        tr:'Edó ke mia evdomáda voitháo stin tavérna tis Déspinas stin Ía. Gráfo ton katálogo sta angliká. Tin próti méra égrapsa «ichthís» ke o Níkos, o yos tis, yélase: «Ichthís sta archéa! Edó léme psári.» Káthe vrádi o ílios péfti sti thálasa ke óli stin tarátsa ton chirokrotoún.',
        na:{ de:'Seit einer Woche helfe ich in Despinas Taverne in Oia. Ich schreibe die Speisekarte auf Englisch. Am ersten Tag schrieb ich „ichthys“, und Nikos, ihr Sohn, lachte: „Ichthys ist Altgriechisch! Hier sagen wir psari.“ Jeden Abend fällt die Sonne ins Meer, und alle auf der Terrasse klatschen ihr Beifall.',
             es:'Desde hace una semana ayudo en la taberna de Déspina en Oia. Escribo la carta en inglés. El primer día escribí «ichthýs» y Nikos, su hijo, se rio: «¡Ichthýs es griego antiguo! Aquí decimos psári». Cada tarde el sol cae en el mar y todos en la terraza le aplauden.',
             en:'For a week now I have been helping at Despina’s taverna in Oia. I am writing the menu in English. On the first day I wrote “ichthys” and Nikos, her son, laughed: “Ichthys is Ancient Greek! Here we say psari.” Every evening the sun drops into the sea and everyone on the terrace applauds it.' },
        frage:{ de:'Was macht Elli in der Taverne?', es:'¿Qué hace Elli en la taberna?', en:'What does Elli do at the taverna?' },
        optionen:[
          { na:{ de:'Sie schreibt die Speisekarte auf Englisch', es:'Escribe la carta en inglés', en:'She writes the menu in English' }, richtig:true  },
          { na:{ de:'Sie brät Fisch in der Küche', es:'Fríe pescado en la cocina', en:'She fries fish in the kitchen' }, richtig:false },
          { na:{ de:'Sie bedient auf der Terrasse', es:'Sirve las mesas en la terraza', en:'She waits tables on the terrace' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib, seit wann du etwas machst (mit „εδώ και") und was du schon einmal gemacht hast (mit „έχω …"). Zwei Sätze.', es:'Escribe desde cuándo haces algo (con «εδώ και») y qué has hecho alguna vez (con «έχω…»). Dos frases.', en:'Write how long you have been doing something (with “εδώ και”) and something you have done before (with “έχω …”). Two sentences.' },
        muster:'Μαθαίνω ελληνικά εδώ και ένα χρόνο. Έχω πάει δύο φορές στην Κρήτη.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ de:'Das Perfekt bildet man mit έχω + einer festen Form auf -ει: έχω δουλέψει, έχω γράψει, δεν έχω δουλέψει ποτέ. Es erzählt Erfahrungen, ohne Datum. „Seit" heißt εδώ και — mit Präsens, weil es ja noch andauert: είμαι στην Ελλάδα εδώ και εφτά μήνες (ich bin seit sieben Monaten in Griechenland). Ganz wie im Deutschen.',
               es:'El perfecto se forma con έχω + una forma fija en -ει: έχω δουλέψει, έχω γράψει, δεν έχω δουλέψει ποτέ. Sirve para contar experiencias, sin fecha. «Desde hace» es εδώ και, con presente, porque todavía dura: είμαι στην Ελλάδα εδώ και εφτά μήνες (llevo siete meses en Grecia).',
               en:'The perfect is έχω + a fixed form ending in -ει: έχω δουλέψει, έχω γράψει, δεν έχω δουλέψει ποτέ. It tells about experiences, with no date. “For (up to now)” is εδώ και — with the present tense, because it is still going on: είμαι στην Ελλάδα εδώ και εφτά μήνες (I have been in Greece for seven months). Greek says “I am”, not “I have been”.' },
        beispiele:[
          { z:'Έχω δουλέψει σε ένα καφέ.', tr:'Écho doulépsi se éna kafé.', na:{ de:'Ich habe in einem Café gearbeitet.', es:'He trabajado en una cafetería.', en:'I have worked in a café.' } },
          { z:'Γράφω το βιβλίο εδώ και δύο χρόνια.', tr:'Gráfo to vivlío edó ke dío chrónia.', na:{ de:'Ich schreibe seit zwei Jahren an dem Buch.', es:'Llevo dos años escribiendo el libro.', en:'I have been writing the book for two years.' } }
        ]
      },
      kultur:{ de:'Oia liegt an der Nordspitze Santorinis, hoch über der Caldera, die ein Vulkanausbruch vor rund 3.600 Jahren geformt hat. Im Mai ist es noch ruhig. Typisch für die Insel: Fava (ein gelbes Hülsenfrüchte-Püree), ντοματοκεφτέδες (Tomatenbällchen) und der Weißwein Assyrtiko.',
               es:'Oia está en la punta norte de Santorini, en lo alto de la caldera que formó una erupción volcánica hace unos 3600 años. En mayo todavía está tranquila. Típicos de la isla: la fava (un puré de legumbre amarilla), los ντοματοκεφτέδες (buñuelos de tomate) y el vino blanco Assyrtiko.',
               en:'Oia sits at the northern tip of Santorini, high above the caldera formed by a volcanic eruption about 3,600 years ago. In May it is still quiet. Typical of the island: fava (a yellow split-pea purée), ντοματοκεφτέδες (tomato fritters) and the white wine Assyrtiko.' }
    },

    // ── B1 · Am Bahnhof · Athen → Thessaloniki (Jun) — Sommerlicht über der thessalischen Ebene ──
    'b1.bahnhof': {
      deineRolle: { de:'Du bist Elli. In der Metro hast du beim Schreiben deine Haltestelle verpasst; als du am Bahnhof ankamst, war dein Zug nach Thessaloniki schon weg. Du möchtest einen Fensterplatz links, um den Olymp zu sehen. In Thessaloniki willst du um fünf den Bus nach Chalkidiki nehmen.', es:'Eres Elli. En el metro te pasaste de parada por ir escribiendo; cuando llegaste a la estación, tu tren a Salónica ya se había ido. Quieres un asiento de ventanilla a la izquierda para ver el Olimpo. En Salónica quieres coger el autobús de las cinco a Calcídica.', en:'You are Elli. Writing on the metro, you missed your stop; when you got to the station, your train to Thessaloniki had already gone. You want a window seat on the left to see Mount Olympus. In Thessaloniki you want to catch the five o’clock bus to Halkidiki.', el:'Είσαι η Έλλη. Στο μετρό έγραφες και έχασες τη στάση· όταν έφτασες στον σταθμό, το τρένο σου για τη Θεσσαλονίκη είχε ήδη φύγει. Θέλεις μια θέση στο παράθυρο, αριστερά, για να δεις τον Όλυμπο. Στη Θεσσαλονίκη θέλεις να πάρεις το λεωφορείο των πέντε για τη Χαλκιδική.' },
      eroeffnung: { z:'Καλημέρα. Ο επόμενος, παρακαλώ!', tr:'Kaliméra. O epómenos, parakaló!', na:{ de:'Guten Morgen. Der Nächste, bitte!', es:'Buenos días. ¡El siguiente, por favor!', en:'Good morning. Next, please!' } },
      abrundung: { z:'Προλαβαίνετε άνετα. Καλό ταξίδι — και καθίστε αριστερά: ο Όλυμπος σάς περιμένει!', tr:'Prolavénete áneta. Kaló taxídi — ke kathíste aristerá: o Ólimbos sas periméni!', na:{ de:'Das schaffen Sie bequem. Gute Reise — und setzen Sie sich links: Der Olymp wartet auf Sie!', es:'Le da tiempo de sobra. Buen viaje, y siéntese a la izquierda: ¡el Olimpo le espera!', en:'You’ll make it easily. Have a good trip — and sit on the left: Olympus is waiting for you!' } },
      rollen: {
        spikiu: { de:'Stelios, der Mann am Fahrkartenschalter', es:'Stelios, el empleado de la taquilla', en:'Stelios, the ticket clerk', el:'ο Στέλιος, ο υπάλληλος στο εκδοτήριο' },
        lerner: { de:'Elli, die Schriftstellerin', es:'Elli, la escritora', en:'Elli, the novelist', el:'η Έλλη, η συγγραφέας' },
        ort:    { de:'am Larissa-Bahnhof in Athen', es:'en la estación de Larisa, en Atenas', en:'at Larissa Station in Athens', el:'στον Σταθμό Λαρίσης στην Αθήνα' }
      },
      wortschatz: [
        { z:'είχε ήδη φύγει', tr:'íche ídi fíyi', na:{ de:'er war schon abgefahren', es:'ya había salido', en:'it had already left' } },
        { z:'μόλις έφυγε', tr:'mólis éfiye', na:{ de:'er ist gerade abgefahren', es:'acaba de salir', en:'it has just left' } },
        { z:'αλλάζω το εισιτήριο', tr:'alázo to isitírio', na:{ de:'die Fahrkarte umbuchen', es:'cambiar el billete', en:'to change the ticket' } },
        { z:'η θέση', tr:'i thési', na:{ de:'der Sitzplatz', es:'el asiento, la plaza', en:'the seat' } },
        { z:'το βαγόνι', tr:'to vagóni', na:{ de:'der Wagen', es:'el vagón', en:'the carriage' } },
        { z:'στο παράθυρο', tr:'sto paráthiro', na:{ de:'am Fenster', es:'de ventanilla', en:'by the window' } },
        { z:'η κράτηση θέσης', tr:'i krátisi thésis', na:{ de:'die Sitzplatzreservierung', es:'la reserva de asiento', en:'the seat reservation' } },
        { z:'προλαβαίνω', tr:'prolavéno', na:{ de:'es rechtzeitig schaffen', es:'llegar a tiempo', en:'to make it in time' } },
        { z:'θα προλάβω', tr:'tha prolávo', na:{ de:'ich werde es schaffen', es:'llegaré a tiempo', en:'I’ll make it' } },
        { z:'η αμαξοστοιχία', tr:'i amaxostichía', na:{ de:'der Zug (Amtssprache)', es:'el tren (lenguaje oficial)', en:'the train (official word)' } },
        { z:'ο κάμπος', tr:'o kámbos', na:{ de:'die Ebene', es:'la llanura', en:'the plain' } },
        { z:'το ΚΤΕΛ', tr:'to ktel', na:{ de:'der Überlandbus', es:'el autobús interurbano', en:'the intercity bus' } }
      ],
      dialog: {
        rolle: { de:'Stelios, der Mann am Fahrkartenschalter', es:'Stelios, el empleado de la taquilla', en:'Stelios, the ticket clerk' },
        zeilen: [
          { wer:'lerner', z:'Καλημέρα. Έχασα τη στάση στο μετρό, και όταν έφτασα, το τρένο μου είχε ήδη φύγει.', tr:'Kaliméra. Échasa ti stási sto metró, ke ótan éftasa, to tréno mou íche ídi fíyi.', na:{ de:'Guten Morgen. Ich habe in der Metro meine Haltestelle verpasst, und als ich ankam, war mein Zug schon abgefahren.', es:'Buenos días. Me pasé de parada en el metro y, cuando llegué, mi tren ya había salido.', en:'Good morning. I missed my stop on the metro, and when I arrived, my train had already left.' } },
          { wer:'spikiu', z:'Ναι, το τρένο των εννιά μόλις έφυγε. Μπορώ να σας αλλάξω το εισιτήριο για το επόμενο, στις έντεκα.', tr:'Ne, to tréno ton eniá mólis éfiye. Boró na sas aláxo to isitírio ya to epómeno, stis éndeka.', na:{ de:'Ja, der Zug um neun ist gerade abgefahren. Ich kann Ihnen die Fahrkarte auf den nächsten umbuchen, um elf.', es:'Sí, el tren de las nueve acaba de salir. Puedo cambiarle el billete para el siguiente, a las once.', en:'Yes, the nine o’clock train has just left. I can change your ticket to the next one, at eleven.' } },
          { wer:'lerner', z:'Ναι, παρακαλώ. Έχετε θέση στο παράθυρο, αριστερά; Θέλω να δω τον Όλυμπο.', tr:'Ne, parakaló. Échete thési sto paráthiro, aristerá? Thélo na do ton Ólimbo.', na:{ de:'Ja, bitte. Haben Sie einen Fensterplatz, links? Ich möchte den Olymp sehen.', es:'Sí, por favor. ¿Tiene un asiento de ventanilla, a la izquierda? Quiero ver el Olimpo.', en:'Yes, please. Do you have a window seat, on the left? I want to see Mount Olympus.' } },
          { wer:'spikiu', z:'Βεβαίως: βαγόνι τέσσερα, θέση δεκαοχτώ. Μόνο που το επόμενο έχει ήδη είκοσι λεπτά καθυστέρηση.', tr:'Vevéos: vagóni tésera, thési dekaochtó. Móno pou to epómeno échi ídi íkosi leptá kathistérisi.', na:{ de:'Selbstverständlich: Wagen vier, Platz achtzehn. Nur hat der nächste schon zwanzig Minuten Verspätung.', es:'Por supuesto: vagón cuatro, asiento dieciocho. Lo que pasa es que el siguiente ya lleva veinte minutos de retraso.', en:'Certainly: carriage four, seat eighteen. Only the next one is already twenty minutes late.' } },
          { wer:'lerner', z:'Θα προλάβω τότε το λεωφορείο για τη Χαλκιδική, που φεύγει στις πέντε;', tr:'Tha prolávo tóte to leoforío ya ti Chalkidikí, pou févyi stis pénde?', na:{ de:'Schaffe ich dann noch den Bus nach Chalkidiki, der um fünf fährt?', es:'¿Llegaré entonces a tiempo al autobús de Calcídica, que sale a las cinco?', en:'Will I still make the bus to Halkidiki then, the one that leaves at five?' } },
          { wer:'spikiu', z:'Ναι, θα φτάσετε γύρω στις τέσσερις. Το ΚΤΕΛ Χαλκιδικής είναι δέκα λεπτά με ταξί από τον σταθμό.', tr:'Ne, tha ftásete yíro stis téseris. To ktel Chalkidikís íne déka leptá me taxí apó ton stathmó.', na:{ de:'Ja, Sie kommen gegen vier an. Der Busbahnhof für Chalkidiki ist zehn Minuten mit dem Taxi vom Bahnhof entfernt.', es:'Sí, llegará hacia las cuatro. La estación de autobuses de Calcídica está a diez minutos en taxi de la estación de tren.', en:'Yes, you’ll arrive around four. The Halkidiki bus station is ten minutes by taxi from the train station.' } }
        ]
      },
      lesetext: {
        z:'Όταν έφτασα στον Σταθμό Λαρίσης, το τρένο μου είχε ήδη φύγει. Στο εκδοτήριο είπα: «Η αμαξοστοιχία μου έχει ήδη αναχωρήσει.» Ο υπάλληλος χαμογέλασε: «Θέλετε να πείτε ότι χάσατε το τρένο!» Μετά όμως άκουσα στο μεγάφωνο: «Η αμαξοστοιχία προς Χαλκίδα…» Επιτέλους, μια λέξη μου ήταν σωστή! Από το παράθυρο ο θεσσαλικός κάμπος έλαμπε σαν χρυσάφι.',
        tr:'Ótan éftasa ston Stathmó Larísis, to tréno mou íche ídi fíyi. Sto ekdotírio ípa: «I amaxostichía mou échi ídi anachorísi.» O ipálilos chamoyélase: «Thélete na píte óti chásate to tréno!» Metá ómos ákousa sto megáfono: «I amaxostichía pros Chalkída…» Epitélous, mia léxi mou ítan sostí! Apó to paráthiro o thesalikós kámbos élambe san chrisáfi.',
        na:{ de:'Als ich am Larissa-Bahnhof ankam, war mein Zug schon abgefahren. Am Schalter sagte ich: „Meine Amaxostichia ist bereits abgefahren.“ Der Mann am Schalter lächelte: „Sie meinen, Sie haben den Zug verpasst!“ Doch dann hörte ich im Lautsprecher: „Die Amaxostichia nach Chalkida …“ Endlich war eins meiner Wörter richtig! Vor dem Fenster leuchtete die thessalische Ebene wie Gold.',
             es:'Cuando llegué a la estación de Larisa, mi tren ya había salido. En la taquilla dije: «Mi amaxostichía ya ha partido». El empleado sonrió: «¡Querrá decir que ha perdido el tren!». Pero luego oí por megafonía: «La amaxostichía con destino a Calcis…». ¡Por fin una palabra mía era correcta! Por la ventanilla, la llanura de Tesalia brillaba como el oro.',
             en:'When I got to Larissa Station, my train had already left. At the ticket office I said, “My amaxostichia has already departed.” The clerk smiled: “You mean you missed the train!” But then I heard over the loudspeaker: “The amaxostichia to Chalkida …” At last one of my words was right! Outside the window, the Thessalian plain shone like gold.' },
        frage:{ de:'Wo hört Elli ihr Wort „αμαξοστοιχία" doch noch?', es:'¿Dónde oye Elli por fin su palabra «αμαξοστοιχία»?', en:'Where does Elli hear her word “αμαξοστοιχία” after all?' },
        optionen:[
          { na:{ de:'In der Lautsprecherdurchsage', es:'Por megafonía', en:'In the loudspeaker announcement' }, richtig:true  },
          { na:{ de:'Vom Mann am Schalter', es:'Del empleado de la taquilla', en:'From the ticket clerk' }, richtig:false },
          { na:{ de:'In der Metro', es:'En el metro', en:'On the metro' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähl, dass etwas schon passiert war, als du ankamst, und was du dann gemacht hast. Zwei Sätze.', es:'Cuenta que algo ya había pasado cuando llegaste y qué hiciste después. Dos frases.', en:'Say that something had already happened when you arrived, and what you did then. Two sentences.' },
        muster:'Όταν έφτασα στο λιμάνι, το πλοίο είχε ήδη φύγει. Πήρα εισιτήριο για το επόμενο και ήπια έναν καφέ.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ de:'Die Vorvergangenheit: είχα + dieselbe feste Form wie im Perfekt — είχε ήδη φύγει (er war schon abgefahren). Etwas geschah vor etwas anderem in der Vergangenheit. Und μόλις + Aorist heißt „gerade eben": μόλις έφυγε (er ist gerade abgefahren). Achtung: μόλις mit der Form nach θα/να heißt „sobald": μόλις φτάσω, θα σου γράψω (sobald ich ankomme, schreibe ich dir).',
               es:'El pluscuamperfecto: είχα + la misma forma fija que en el perfecto — είχε ήδη φύγει (ya había salido). Algo pasó antes que otra cosa en el pasado. Y μόλις + aoristo significa «acabar de»: μόλις έφυγε (acaba de salir). Ojo: μόλις con la forma que va después de θα/να significa «en cuanto»: μόλις φτάσω, θα σου γράψω (en cuanto llegue, te escribo).',
               en:'The past perfect: είχα + the same fixed form as in the perfect — είχε ήδη φύγει (it had already left). Something happened before something else in the past. And μόλις + simple past means “just”: μόλις έφυγε (it has just left). Careful: μόλις with the form used after θα/να means “as soon as”: μόλις φτάσω, θα σου γράψω (as soon as I arrive, I’ll write to you).' },
        beispiele:[
          { z:'Όταν έφτασα, το τρένο είχε ήδη φύγει.', tr:'Ótan éftasa, to tréno íche ídi fíyi.', na:{ de:'Als ich ankam, war der Zug schon abgefahren.', es:'Cuando llegué, el tren ya había salido.', en:'When I arrived, the train had already left.' } },
          { z:'Το τρένο μόλις έφυγε.', tr:'To tréno mólis éfiye.', na:{ de:'Der Zug ist gerade abgefahren.', es:'El tren acaba de salir.', en:'The train has just left.' } }
        ]
      },
      kultur:{ de:'Der Athener Hauptbahnhof heißt Σταθμός Λαρίσης — nach der Stadt Larisa, zu der die Strecke einst führte. Unterwegs durchquert der Zug die thessalische Ebene; auf der linken Seite zeigt sich bei klarem Wetter der Olymp (2.918 m), der höchste Berg Griechenlands. Im Lautsprecher heißt der Zug bis heute αμαξοστοιχία.',
               es:'La estación central de Atenas se llama Σταθμός Λαρίσης, por la ciudad de Larisa, adonde iba antiguamente la línea. Por el camino el tren cruza la llanura de Tesalia; a la izquierda, si el día está claro, aparece el Olimpo (2918 m), la montaña más alta de Grecia. Por megafonía, el tren sigue llamándose αμαξοστοιχία.',
               en:'Athens’ main station is called Σταθμός Λαρίσης, after the city of Larissa, where the line once led. On the way the train crosses the Thessalian plain; on the left, on a clear day, you can see Mount Olympus (2,918 m), the highest mountain in Greece. Over the loudspeaker, the train is still called an αμαξοστοιχία.' }
    },

    // ── B1 · Im Taxi · Zypern, Paphos → Troodos (Jul) — Licht auf dem Meer bei Petra tou Romiou ──
    'b1.taxi': {
      duzen: true,
      deineRolle: { de:'Du bist Elli. Es ist Juli auf Zypern, fast vierzig Grad; in Hamburg sind es zwanzig und es regnet. Halloumi hast du bisher nur in Deutschland gegessen. Einen Sommer lang würdest du gern hier in den Bergen leben und schreiben.', es:'Eres Elli. Es julio en Chipre y hace casi cuarenta grados; en Hamburgo hace veinte y llueve. Solo has comido halloumi en Alemania. Te quedarías encantada un verano aquí, viviendo en las montañas y escribiendo.', en:'You are Elli. It is July in Cyprus, almost forty degrees; in Hamburg it is twenty and raining. You have only ever eaten halloumi in Germany. You would love to spend a summer here, living in the mountains and writing.', el:'Είσαι η Έλλη. Είναι Ιούλιος στην Κύπρο, σχεδόν σαράντα βαθμοί· στο Αμβούργο έχει είκοσι και βρέχει. Χαλλούμι έχεις φάει μόνο στη Γερμανία. Θα ήθελες να ζήσεις ένα καλοκαίρι εδώ στα βουνά και να γράφεις.' },
      abrundung: { z:'Τότε σε περιμένουμε! Αλλά στο Τρόοδος, το βράδυ, θα χρειαστείς ζακέτα — εκεί πάνω κάνει δροσιά!', tr:'Tóte se periménoume! Alá sto Tróodos, to vrádi, tha chriastís zakéta — ekí páno káni drosiá!', na:{ de:'Dann erwarten wir dich! Aber im Troodos brauchst du abends eine Strickjacke — da oben ist es frisch!', es:'¡Pues te esperamos! Pero en el Troodos, por la noche, te hará falta una chaqueta: ¡allí arriba refresca!', en:'Then we’ll be expecting you! But up in Troodos you’ll need a cardigan in the evening — it’s cool up there!' } },
      rollen: {
        spikiu: { de:'Kyriakos, der Taxifahrer', es:'Kyriakos, el taxista', en:'Kyriakos, the taxi driver', el:'ο Κυριάκος, ο ταξιτζής' },
        lerner: { de:'Elli, die Schriftstellerin', es:'Elli, la escritora', en:'Elli, the novelist', el:'η Έλλη, η συγγραφέας' },
        ort:    { de:'auf der Küstenstraße von Paphos hinauf ins Troodos-Gebirge', es:'en la carretera de la costa, de Pafos hacia los montes Troodos', en:'on the coast road from Paphos up to the Troodos mountains', el:'στον παραλιακό δρόμο από την Πάφο προς το Τρόοδος' }
      },
      wortschatz: [
        { z:'η ζέστη', tr:'i zésti', na:{ de:'die Hitze', es:'el calor', en:'the heat' } },
        { z:'οι βαθμοί', tr:'i vathmí', na:{ de:'die Grad', es:'los grados', en:'the degrees' } },
        { z:'το χαλλούμι', tr:'to chaloúmi', na:{ de:'der Halloumi (zyprischer Käse)', es:'el halloumi (queso chipriota)', en:'halloumi (Cypriot cheese)' } },
        { z:'στη σχάρα', tr:'sti schára', na:{ de:'vom Grill', es:'a la parrilla', en:'grilled' } },
        { z:'νόστιμος', tr:'nóstimos', na:{ de:'lecker', es:'rico, sabroso', en:'tasty' } },
        { z:'θα έμενα', tr:'tha émena', na:{ de:'ich würde bleiben', es:'me quedaría', en:'I would stay' } },
        { z:'θα ζούσα', tr:'tha zoúsa', na:{ de:'ich würde leben', es:'viviría', en:'I would live' } },
        { z:'θα έγραφα', tr:'tha égrafa', na:{ de:'ich würde schreiben', es:'escribiría', en:'I would write' } },
        { z:'η δροσιά', tr:'i drosiá', na:{ de:'die Frische, die Kühle', es:'el fresco', en:'the coolness' } },
        { z:'η ζακέτα', tr:'i zakéta', na:{ de:'die Strickjacke', es:'la chaqueta de punto', en:'the cardigan' } },
        { z:'τζαι', tr:'tze', na:{ de:'und (zypriotisch für και)', es:'y (chipriota, por και)', en:'and (Cypriot for και)' } },
        { z:'μιλούμεν', tr:'miloúmen', na:{ de:'wir sprechen (zypriotisch für μιλάμε)', es:'hablamos (chipriota, por μιλάμε)', en:'we speak (Cypriot for μιλάμε)' } }
      ],
      dialog: {
        rolle: { de:'Kyriakos, der Taxifahrer', es:'Kyriakos, el taxista', en:'Kyriakos, the taxi driver' },
        zeilen: [
          { wer:'spikiu', z:'Λοιπόν, πάμε από την παραλία, να δεις την Πέτρα του Ρωμιού. Ζέστη, ε; Σαράντα βαθμοί σήμερα!', tr:'Lipón, páme apó tin paralía, na dis tin Pétra tou Romioú. Zésti, e? Saránda vathmí símera!', na:{ de:'Also, wir fahren an der Küste entlang, damit du den Felsen Petra tou Romiou siehst. Heiß, was? Vierzig Grad heute!', es:'Bueno, vamos por la costa para que veas la Petra tou Romiou. Hace calor, ¿eh? ¡Cuarenta grados hoy!', en:'Right, we’ll go along the coast so you can see Petra tou Romiou. Hot, eh? Forty degrees today!' } },
          { wer:'lerner', z:'Πολλή ζέστη! Στο Αμβούργο τώρα έχει είκοσι βαθμούς και βρέχει, φυσικά.', tr:'Polí zésti! Sto Amvoúrgo tóra échi íkosi vathmoús ke vréchi, fisiká.', na:{ de:'Sehr heiß! In Hamburg sind es jetzt zwanzig Grad, und es regnet natürlich.', es:'¡Mucho calor! En Hamburgo ahora hace veinte grados y llueve, claro.', en:'Very hot! In Hamburg it’s twenty degrees right now, and raining, of course.' } },
          { wer:'spikiu', z:'Χαχά! Εδώ λέμε «τζαι» αντί για «και» — έτσι μιλούμεν! Πες μου, έχεις φάει χαλλούμι στη σχάρα;', tr:'Chachá! Edó léme «tze» andí ya «ke» — étsi miloúmen! Pes mou, échis fái chaloúmi sti schára?', na:{ de:'Haha! Hier sagen wir „tze" statt „ke" — so reden wir! Sag mal, hast du schon gegrillten Halloumi gegessen?', es:'¡Jaja! Aquí decimos «tze» en vez de «ke»: ¡así hablamos! Dime, ¿has comido halloumi a la parrilla?', en:'Ha ha! Here we say “tze” instead of “ke” — that’s how we talk! Tell me, have you had grilled halloumi?' } },
          { wer:'lerner', z:'Το έχω φάει μόνο στη Γερμανία. Εδώ σίγουρα είναι πιο νόστιμο!', tr:'To écho fái móno sti Yermanía. Edó sígoura íne pio nóstimo!', na:{ de:'Ich habe ihn nur in Deutschland gegessen. Hier schmeckt er bestimmt besser!', es:'Solo lo he comido en Alemania. ¡Aquí seguro que está más rico!', en:'I’ve only had it in Germany. It’s surely tastier here!' } },
          { wer:'spikiu', z:'Σίγουρα! Και πες μου: εσύ θα έμενες εδώ; Θάλασσα, βουνά, ήλιος…', tr:'Sígoura! Ke pes mou: esí tha émenes edó? Thálasa, vouná, ílios…', na:{ de:'Ganz bestimmt! Und sag mal: Würdest du hier bleiben? Meer, Berge, Sonne …', es:'¡Seguro! Y dime: ¿tú te quedarías aquí? Mar, montañas, sol…', en:'Sure! And tell me: would you stay here? Sea, mountains, sun …' } },
          { wer:'lerner', z:'Ναι, θα έμενα ένα καλοκαίρι. Θα ζούσα στα βουνά και θα έγραφα κάθε πρωί.', tr:'Ne, tha émena éna kalokéri. Tha zoúsa sta vouná ke tha égrafa káthe proí.', na:{ de:'Ja, ich würde einen Sommer bleiben. Ich würde in den Bergen leben und jeden Morgen schreiben.', es:'Sí, me quedaría un verano. Viviría en las montañas y escribiría cada mañana.', en:'Yes, I’d stay for a summer. I’d live in the mountains and write every morning.' } }
        ]
      },
      lesetext: {
        z:'Ο Κυριάκος μιλούσε όλη την ώρα, κι εγώ έγραφα στο σημειωματάριο. «Τζαι» σημαίνει «και» — έτσι μιλούν στην Κύπρο. Στην Πέτρα του Ρωμιού το φως πάνω στη θάλασσα ήταν τόσο δυνατό που έκλεισα τα μάτια. Στο Τρόοδος, στα χίλια επτακόσια μέτρα, φόρεσα ζακέτα — τον Ιούλιο! Η λέξη του τόπου: «τζαι».',
        tr:'O Kiriákos miloúse óli tin óra, ki egó égrafa sto simiomatário. «Tze» siméni «ke» — étsi miloún stin Kípro. Stin Pétra tou Romioú to fos páno sti thálasa ítan tóso dinató pou éklisa ta mátia. Sto Tróodos, sta chília eptakósia métra, fóresa zakéta — ton Ioúlio! I léxi tou tópou: «tze».',
        na:{ de:'Kyriakos redete die ganze Zeit, und ich schrieb in mein Notizbuch. „Tze" heißt „und" — so spricht man auf Zypern. Bei Petra tou Romiou war das Licht auf dem Meer so stark, dass ich die Augen schloss. Im Troodos, auf siebzehnhundert Metern, zog ich eine Strickjacke an — im Juli! Das Wort des Ortes: „tze".',
             es:'Kyriakos hablaba todo el rato y yo escribía en mi cuaderno. «Tze» significa «y»: así se habla en Chipre. En la Petra tou Romiou la luz sobre el mar era tan fuerte que cerré los ojos. En el Troodos, a mil setecientos metros, me puse una chaqueta… ¡en julio! La palabra del lugar: «tze».',
             en:'Kyriakos talked the whole time, and I wrote in my notebook. “Tze” means “and” — that’s how people speak in Cyprus. At Petra tou Romiou the light on the sea was so strong that I closed my eyes. In Troodos, at seventeen hundred metres, I put on a cardigan — in July! The word of the place: “tze”.' },
        frage:{ de:'Was zieht Elli im Troodos-Gebirge an?', es:'¿Qué se pone Elli en los montes Troodos?', en:'What does Elli put on in the Troodos mountains?' },
        optionen:[
          { na:{ de:'Eine Strickjacke', es:'Una chaqueta de punto', en:'A cardigan' }, richtig:true  },
          { na:{ de:'Einen Badeanzug', es:'Un bañador', en:'A swimsuit' }, richtig:false },
          { na:{ de:'Einen Regenmantel', es:'Un impermeable', en:'A raincoat' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib, wo du gern ein Jahr leben würdest und was du dort machen würdest. Zwei Sätze.', es:'Escribe dónde te gustaría vivir un año y qué harías allí. Dos frases.', en:'Write where you would like to live for a year and what you would do there. Two sentences.' },
        muster:'Θα ζούσα ένα χρόνο στην Κρήτη. Θα έμενα κοντά στη θάλασσα και θα μάθαινα να μαγειρεύω.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ de:'„Was wäre, wenn …" heißt auf Griechisch θα + Imperfekt (die Dauerform der Vergangenheit): θα έμενα (ich würde bleiben), θα ζούσα (ich würde leben), θα έγραφα (ich würde schreiben). Ohne θα erzählt dieselbe Form „früher": έμενα = ich wohnte. Das θα macht daraus einen Wunsch. Mit αν: αν είχα χρόνο, θα έμενα (wenn ich Zeit hätte, würde ich bleiben).',
               es:'«Qué pasaría si…» en griego es θα + imperfecto (la forma continua del pasado): θα έμενα (me quedaría), θα ζούσα (viviría), θα έγραφα (escribiría). Sin θα, la misma forma cuenta el pasado: έμενα = vivía. El θα lo convierte en un deseo. Con αν: αν είχα χρόνο, θα έμενα (si tuviera tiempo, me quedaría).',
               en:'“What if …” in Greek is θα + imperfect (the continuous past form): θα έμενα (I would stay), θα ζούσα (I would live), θα έγραφα (I would write). Without θα, the same form talks about the past: έμενα = I used to live. The θα turns it into a wish. With αν: αν είχα χρόνο, θα έμενα (if I had time, I would stay).' },
        beispiele:[
          { z:'Θα έμενα εδώ ένα καλοκαίρι.', tr:'Tha émena edó éna kalokéri.', na:{ de:'Ich würde einen Sommer hierbleiben.', es:'Me quedaría aquí un verano.', en:'I would stay here for a summer.' } },
          { z:'Αν είχα χρόνο, θα ζούσα στα βουνά.', tr:'An ícha chróno, tha zoúsa sta vouná.', na:{ de:'Wenn ich Zeit hätte, würde ich in den Bergen leben.', es:'Si tuviera tiempo, viviría en las montañas.', en:'If I had time, I would live in the mountains.' } }
        ]
      },
      kultur:{ de:'An der Petra tou Romiou, zwischen Paphos und Limassol, soll der Sage nach Aphrodite aus dem Meer gestiegen sein. Halloumi ist Zyperns berühmter Käse — gegrillt quietscht er leicht zwischen den Zähnen. Im Troodos-Gebirge ist es auch im Sommer angenehm kühl. Auf Zypern hörst du „τζαι" statt „και" und „μιλούμεν" statt „μιλάμε".',
               es:'En la Petra tou Romiou, entre Pafos y Limasol, según la leyenda Afrodita salió del mar. El halloumi es el famoso queso de Chipre: a la parrilla, chirría un poco entre los dientes. En los montes Troodos hace fresco incluso en verano. En Chipre oirás «τζαι» en vez de «και» y «μιλούμεν» en vez de «μιλάμε».',
               en:'At Petra tou Romiou, between Paphos and Limassol, legend says Aphrodite rose from the sea. Halloumi is Cyprus’s famous cheese — grilled, it squeaks a little between your teeth. The Troodos mountains stay pleasantly cool even in summer. In Cyprus you will hear “τζαι” instead of “και” and “μιλούμεν” instead of “μιλάμε”.' }
    }
  }
};

  [K_LP_A, K_LP_B].forEach(function (F) {
    Object.keys(F.schritt).forEach(function (t) { if (SCHRITT[t]) SCHRITT[t].b1 = F.schritt[t]; });
    Object.keys(F.aufgaben).forEach(function (k) { AUFGABEN[k] = F.aufgaben[k]; });
    Object.keys(F.stationen).forEach(function (k) { STATIONEN[k] = F.stationen[k]; });
  });

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
    /* Seit B1 (15.10.2026) darf eine Station eigene Rollen tragen (die
       Vermieterin in Mexiko statt der Empfangsdame). Ohne stufe gilt die
       Stufe des Weges, wenn lernpfad.js geladen ist. */
    rolle: function (thema, stufe) {
      var st = stufe;
      try { if (!st && raum.SpikiuPfad && raum.SpikiuPfad.stufe) st = raum.SpikiuPfad.stufe(); } catch (e) {}
      var S = st ? STATIONEN[st + '.' + thema] : null;
      return (S && S.rollen) || ROLLEN[thema] || null;
    },

    /* Ein Satz zum Ort der Station (nur B1), in der Muttersprache. */
    kulturVon: function (stufe, thema, muttersprache) {
      var S = STATIONEN[stufe + '.' + thema];
      if (!S || !S.kultur) return '';
      var mu = muttersprache || 'de';
      return S.kultur[mu] || S.kultur.en || S.kultur.de || '';
    },
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
