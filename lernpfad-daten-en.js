/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — LERNPFAD-DATEN (ENGLISCH als Zielsprache)
   Statische Datei. NULL Token. Wird von allen Räumen gelesen.

   Schwesterdatei von lernpfad-daten.js (Spanisch) und lernpfad-daten-de.js.
   Gleiche Struktur, gleiche API, andere Zielsprache.

     z  = Zielsprache (hier Englisch)
     na = Muttersprachen als Objekt { de, es, el }

   US-NEUTRAL, wie in der Charta: check statt bill, restroom statt toilet.
   Wo Britisch stark abweicht, steht es in der Brücke dabei — der Lerner
   reist nach beidem. Lokalisiert, nicht übersetzt: for here or to go ·
   how many in your party · did you find everything okay · a block ·
   hop in · have a good one · entrée = Hauptgericht · third floor.

   ERÖFFNUNG und ABRUNDUNG wie in den Schwesterdateien (R6).

   Stand: 30.08.2026 — A1 und A2 vollständig (20 Stationen).
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  var THEMEN = [
    { id:'cafe',            em:'☕',  na:{ de:'Im Café',             es:'En la cafetería', el:'Στο καφέ' } },
    { id:'restaurant',      em:'🍽️', na:{ de:'Im Restaurant',       es:'En el restaurante', el:'Στο εστιατόριο' } },
    { id:'einkaufen',       em:'🛒', na:{ de:'Einkaufen',           es:'De compras', el:'Ψώνια' } },
    { id:'wegbeschreibung', em:'🧭', na:{ de:'Nach dem Weg fragen', es:'Preguntar el camino', el:'Ρωτώντας τον δρόμο' } },
    { id:'taxi',            em:'🚕', na:{ de:'Im Taxi',             es:'En el taxi', el:'Στο ταξί' } },
    { id:'familie',         em:'👪', na:{ de:'Über die Familie',    es:'Sobre la familia', el:'Για την οικογένεια' } },
    { id:'hotel',           em:'🏨', na:{ de:'Im Hotel',            es:'En el hotel', el:'Στο ξενοδοχείο' } },
    { id:'bahnhof',         em:'🚉', na:{ de:'Am Bahnhof',          es:'En la estación', el:'Στον σταθμό' } },
    { id:'arzt',            em:'🩺', na:{ de:'Beim Arzt',           es:'En el médico', el:'Στον γιατρό' } },
    { id:'wetter',          em:'🌤️', na:{ de:'Über das Wetter',     es:'Sobre el tiempo', el:'Για τον καιρό' } }
  ];

  var STUFEN = ['a1', 'a2'];

  var KATEGORIEN = [
    { id:'essen',     em:'🍽️', na:{ de:'Essen & Trinken', es:'Comer y beber', el:'Φαγητό & ποτό' },
      themen:['cafe','restaurant'] },
    { id:'unterwegs', em:'🧳', na:{ de:'Unterwegs',       es:'De camino', el:'Στον δρόμο' },
      themen:['wegbeschreibung','taxi','bahnhof','hotel'] },
    { id:'alltag',    em:'🛒', na:{ de:'Alltag',          es:'Vida diaria', el:'Καθημερινότητα' },
      themen:['einkaufen','wetter'] },
    { id:'menschen',  em:'👥', na:{ de:'Menschen',        es:'Personas', el:'Άνθρωποι' },
      themen:['familie','arzt'] }
  ];

  var SCHRITT = {
    cafe:            { a1:{ de:'bestellen, bezahlen', es:'pedir, pagar', el:'παραγγελία, πληρωμή' },
                       a2:{ de:'reklamieren, nach Zutaten fragen', es:'reclamar, preguntar por ingredientes', el:'παράπονο, ερωτήσεις για τα υλικά' } },
    restaurant:      { a1:{ de:'ein Tisch, die Karte', es:'una mesa, la carta', el:'ένα τραπέζι, ο κατάλογος' },
                       a2:{ de:'empfehlen lassen, teilen, Trinkgeld', es:'recomendaciones, compartir, propina', el:'συστάσεις, μοίρασμα, φιλοδώρημα' } },
    einkaufen:       { a1:{ de:'kaufen, bezahlen', es:'comprar, pagar', el:'αγορά, πληρωμή' },
                       a2:{ de:'umtauschen, anprobieren', es:'cambiar, probarse', el:'αλλαγή, δοκιμή ρούχων' } },
    wegbeschreibung: { a1:{ de:'nach dem Weg fragen', es:'preguntar el camino', el:'ρωτώντας τον δρόμο' },
                       a2:{ de:'längeren Wegen folgen', es:'seguir indicaciones largas', el:'μεγαλύτερες οδηγίες' } },
    taxi:            { a1:{ de:'Ziel, Gepäck', es:'destino, equipaje', el:'προορισμός, αποσκευές' },
                       a2:{ de:'Eile, Route, Quittung', es:'prisa, ruta, recibo', el:'βιασύνη, διαδρομή, απόδειξη' } },
    familie:         { a1:{ de:'Geschwister, Namen, Alter', es:'hermanos, nombres, edad', el:'αδέρφια, ονόματα, ηλικία' },
                       a2:{ de:'von früher erzählen', es:'contar el pasado', el:'αφήγηση του παρελθόντος' } },
    hotel:           { a1:{ de:'Reservierung, Frühstück, Stock', es:'reserva, desayuno, planta', el:'κράτηση, πρωινό, όροφος' },
                       a2:{ de:'reklamieren, Zimmer wechseln', es:'reclamar, cambiar de habitación', el:'παράπονο, αλλαγή δωματίου' } },
    bahnhof:         { a1:{ de:'Fahrkarte, Zeit, Gleis', es:'billete, hora, andén', el:'εισιτήριο, ώρα, αποβάθρα' },
                       a2:{ de:'Verspätung, Anschluss', es:'retraso, enlace', el:'καθυστέρηση, ανταπόκριση' } },
    arzt:            { a1:{ de:'Schmerzen, seit wann', es:'dolor, desde cuándo', el:'πόνος, από πότε' },
                       a2:{ de:'was passiert ist, Allergien, Termin', es:'qué pasó, alergias, cita', el:'τι έγινε, αλλεργίες, ραντεβού' } },
    wetter:          { a1:{ de:'heute und morgen', es:'hoy y mañana', el:'σήμερα και αύριο' },
                       a2:{ de:'Vorhersage, etwas vorschlagen', es:'previsión, proponer algo', el:'πρόγνωση, προτείνω κάτι' } }
  };

  var ROLLEN = {
    cafe:            { spikiu:{ de:'der Barista', es:'el camarero', el:'ο μπαρίστας' },
                       lerner:{ de:'der Gast', es:'el cliente', el:'ο πελάτης' },
                       ort:   { de:'an der Theke', es:'en el mostrador', el:'στον πάγκο' } },
    restaurant:      { spikiu:{ de:'der Kellner', es:'el camarero', el:'ο σερβιτόρος' },
                       lerner:{ de:'der Gast', es:'el cliente', el:'ο πελάτης' },
                       ort:   { de:'in einem Lokal', es:'en un restaurante', el:'σε ένα εστιατόριο' } },
    einkaufen:       { spikiu:{ de:'die Kassiererin', es:'la cajera', el:'η ταμίας' },
                       lerner:{ de:'die Kundin', es:'la clienta', el:'η πελάτισσα' },
                       ort:   { de:'an der Supermarktkasse', es:'en la caja del supermercado', el:'στο ταμείο του σούπερ μάρκετ' } },
    wegbeschreibung: { spikiu:{ de:'ein Passant', es:'un transeúnte', el:'ένας περαστικός' },
                       lerner:{ de:'jemand, der sucht', es:'alguien que busca', el:'κάποιος που ψάχνει' },
                       ort:   { de:'auf der Straße', es:'en la calle', el:'στον δρόμο' } },
    taxi:            { spikiu:{ de:'der Taxifahrer', es:'el taxista', el:'ο ταξιτζής' },
                       lerner:{ de:'mit einem Koffer', es:'con una maleta', el:'με μια βαλίτσα' },
                       ort:   { de:'am Straßenrand, abends', es:'en la acera, de noche', el:'στην άκρη του δρόμου, βράδυ' } },
    familie:         { spikiu:{ de:'eine Nachbarin', es:'una vecina', el:'μια γειτόνισσα' },
                       lerner:{ de:'du selbst', es:'tú mismo', el:'εσύ ο ίδιος' },
                       ort:   { de:'im Hausflur', es:'en la escalera', el:'στη σκάλα της πολυκατοικίας' } },
    hotel:           { spikiu:{ de:'der Rezeptionist', es:'el recepcionista', el:'ο ρεσεψιονίστ' },
                       lerner:{ de:'der Gast', es:'el huésped', el:'ο πελάτης του ξενοδοχείου' },
                       ort:   { de:'an der Rezeption', es:'en recepción', el:'στη ρεσεψιόν' } },
    bahnhof:         { spikiu:{ de:'der Schalterbeamte', es:'el empleado de la ventanilla', el:'ο υπάλληλος στο γκισέ' },
                       lerner:{ de:'der Reisende', es:'el viajero', el:'ο ταξιδιώτης' },
                       ort:   { de:'am Schalter', es:'en la ventanilla', el:'στο γκισέ' } },
    arzt:            { spikiu:{ de:'die Ärztin', es:'la médica', el:'η γιατρός' },
                       lerner:{ de:'die Patientin', es:'la paciente', el:'η ασθενής' },
                       ort:   { de:'in der Praxis', es:'en la consulta', el:'στο ιατρείο' } },
    wetter:          { spikiu:{ de:'ein Kollege', es:'un compañero de trabajo', el:'ένας συνάδελφος' },
                       lerner:{ de:'du selbst', es:'tú mismo', el:'εσύ ο ίδιος' },
                       ort:   { de:'vor dem Büro', es:'delante de la oficina', el:'έξω από το γραφείο' } }
  };

  var AUFGABEN = {
    'a1.arzt': [
      { de:'Sag, dass du Kopfschmerzen hast', es:'Di que te duele la cabeza', en:'Say you have a headache', el:'Πες ότι έχεις πονοκέφαλο' },
      { de:'Sag: seit gestern, und dass du Fieber hast', es:'Di que desde ayer y que tienes fiebre', en:'Say since yesterday, and that you have a fever', el:'Πες: από χθες, και ότι έχεις πυρετό' },
      { de:'Bedanke dich bei der Ärztin', es:'Da las gracias a la doctora', en:'Thank the doctor', el:'Ευχαρίστησε τη γιατρό' }
    ],
    'a1.bahnhof': [
      { de:'Kaufe eine Fahrkarte nach Boston', es:'Compra un billete para Boston', en:'Buy a ticket to Boston', el:'Αγόρασε ένα εισιτήριο για τη Βοστόνη' },
      { de:'Sag: hin und zurück, und frag, wann der Zug fährt', es:'Di que ida y vuelta y pregunta a qué hora sale', en:'Say round trip, and ask what time it leaves', el:'Πες: με επιστροφή, και ρώτα τι ώρα φεύγει' },
      { de:'Frag, von welchem Gleis er fährt', es:'Pregunta de qué andén sale', en:'Ask which track it leaves from', el:'Ρώτα από ποια αποβάθρα φεύγει' }
    ],
    'a1.cafe': [
      { de:'Bestelle einen Kaffee', es:'Pide un café', en:'Order a coffee', el:'Παράγγειλε έναν καφέ' },
      { de:'Sag, dass du ihn hier trinken möchtest', es:'Di que lo quieres para tomar allí', en:'Say you want it for here', el:'Πες ότι θα τον πιεις εδώ' },
      { de:'Verneine und frag, was es kostet', es:'Di que no y pregunta cuánto le debes', en:'Say no and ask what you owe', el:'Πες όχι και ρώτα πόσο κάνει' }
    ],
    'a1.einkaufen': [
      { de:'Bejahe und sag, dass du nur diese Äpfel nimmst', es:'Di que sí y que solo llevas estas manzanas', en:'Say yes, and that you just have these apples', el:'Πες ναι, και ότι παίρνεις μόνο αυτά τα μήλα' },
      { de:'Bejahe und frag, was das kostet', es:'Di que sí y pregunta cuánto es', en:'Say yes and ask how much that is', el:'Πες ναι και ρώτα πόσο κάνει' },
      { de:'Sag, dass du mit Karte zahlst', es:'Di que pagas con tarjeta', en:'Say you will pay by card', el:'Πες ότι θα πληρώσεις με κάρτα' }
    ],
    'a1.familie': [
      { de:'Bejahe und sag, dass du eine Schwester hast', es:'Di que sí, que tienes una hermana', en:'Say yes, you have a sister', el:'Πες ναι, έχεις μια αδερφή' },
      { de:'Sag, dass sie Clara heißt', es:'Di que se llama Clara', en:'Say her name is Clara', el:'Πες ότι τη λένε Κλάρα' },
      { de:'Sag, dass sie zwölf ist', es:'Di que tiene doce años', en:'Say she is twelve', el:'Πες ότι είναι δώδεκα χρονών' }
    ],
    'a1.hotel': [
      { de:'Bejahe und nenne deinen Namen: Weber', es:'Di que sí, a nombre de Weber', en:'Say yes, under the name Weber', el:'Πες ναι, στο όνομα Βέμπερ' },
      { de:'Bedanke dich und frag, ob das Frühstück dabei ist', es:'Da las gracias y pregunta si el desayuno está incluido', en:'Say thanks and ask whether breakfast is included', el:'Πες ευχαριστώ και ρώτα αν περιλαμβάνεται το πρωινό' },
      { de:'Frag, in welchem Stock das Zimmer ist', es:'Pregunta en qué planta está la habitación', en:'Ask which floor the room is on', el:'Ρώτα σε ποιον όροφο είναι το δωμάτιο' }
    ],
    'a1.restaurant': [
      { de:'Sag, dass ihr zu zweit seid', es:'Di que son dos', en:'Say there are two of you', el:'Πες ότι είστε δύο' },
      { de:'Frag, was er empfiehlt', es:'Pregunta qué recomienda', en:'Ask what he recommends', el:'Ρώτα τι προτείνει' },
      { de:'Bestelle den Lachs', es:'Pide el salmón', en:'Order the salmon', el:'Παράγγειλε τον σολομό' }
    ],
    'a1.taxi': [
      { de:'Frag, ob das Taxi frei ist', es:'Pregunta si el taxi está libre', en:'Ask whether the taxi is free', el:'Ρώτα αν το ταξί είναι ελεύθερο' },
      { de:'Sag, dass du zum Flughafen willst', es:'Di que vas al aeropuerto', en:'Say you are going to the airport', el:'Πες ότι πας στο αεροδρόμιο' },
      { de:'Bejahe und sag, dass du einen Koffer hast', es:'Di que sí, que llevas una maleta', en:'Say yes, you have one suitcase', el:'Πες ναι, έχεις μία βαλίτσα' }
    ],
    'a1.wegbeschreibung': [
      { de:'Frag, wo der Marktplatz ist', es:'Pregunta dónde está la plaza del mercado', en:'Ask where the market square is', el:'Ρώτα πού είναι η κεντρική πλατεία' },
      { de:'Frag, ob es weit ist', es:'Pregunta si está lejos', en:'Ask whether it is far', el:'Ρώτα αν είναι μακριά' },
      { de:'Bedanke dich', es:'Da las gracias', en:'Say thank you', el:'Πες ευχαριστώ' }
    ],
    'a1.wetter': [
      { de:'Stimme zu und sag, dass die Sonne scheint und es warm ist', es:'Dale la razón y di que hace sol y calor', en:'Agree and say it is sunny and warm', el:'Συμφώνησε και πες ότι έχει ήλιο και κάνει ζέστη' },
      { de:'Sag, dass es morgen regnen soll', es:'Di que mañana dicen que va a llover', en:'Say it is supposed to rain tomorrow', el:'Πες ότι αύριο λένε πως θα βρέξει' },
      { de:'Sag, dass das eine gute Idee ist, und verabschiede dich bis morgen', es:'Di que es buena idea y despídete hasta mañana', en:'Say that is a good idea and say see you tomorrow', el:'Πες ότι είναι καλή ιδέα και αποχαιρέτησε με ένα «τα λέμε αύριο»' }
    ],
    'a2.arzt': [
      { de:'Erzähle, dass du letzte Woche gestürzt bist und die Schulter schlimmer geworden ist', es:'Cuenta que te caíste la semana pasada y que el hombro ha empeorado', en:'Say you fell last week and your shoulder has gotten worse', el:'Πες ότι έπεσες την περασμένη εβδομάδα και ότι ο ώμος σου χειροτέρεψε' },
      { de:'Sag, dass du nur Schmerztabletten nimmst und gegen Penizillin allergisch bist', es:'Di que solo tomas analgésicos y que eres alérgico a la penicilina', en:'Say you only take painkillers and that you are allergic to penicillin', el:'Πες ότι παίρνεις μόνο παυσίπονα και ότι είσαι αλλεργικός στην πενικιλίνη' },
      { de:'Stimme zu und frag, ob du noch einen Termin brauchst', es:'Di que de acuerdo y pregunta si necesitas otra cita', en:'Agree and ask whether you need another appointment', el:'Συμφώνησε και ρώτα αν χρειάζεσαι κι άλλο ραντεβού' }
    ],
    'a2.bahnhof': [
      { de:'Sag, dass dein Zug zwanzig Minuten Verspätung hat', es:'Di que tu tren lleva veinte minutos de retraso', en:'Say your train is running twenty minutes late', el:'Πες ότι το τρένο σου έχει είκοσι λεπτά καθυστέρηση' },
      { de:'Sag: in Albany, um Viertel nach drei', es:'Di que en Albany, a las tres y cuarto', en:'Say in Albany, at quarter past three', el:'Πες: στο Όλμπανι, στις τρεις και τέταρτο' },
      { de:'Frag, was passiert, wenn du ihn verpasst', es:'Pregunta qué pasa si lo pierdes', en:'Ask what happens if you miss it', el:'Ρώτα τι γίνεται αν το χάσεις' }
    ],
    'a2.cafe': [
      { de:'Sag höflich, dass dein Kaffee kalt ist', es:'Di con cortesía que tu café está frío', en:'Politely say your coffee is cold', el:'Πες ευγενικά ότι ο καφές σου είναι κρύος' },
      { de:'Bedanke dich und frag, ob in dem Kuchen Nüsse sind', es:'Da las gracias y pregunta si la tarta lleva frutos secos', en:'Say thanks and ask whether the cake has nuts in it', el:'Πες ευχαριστώ και ρώτα αν το κέικ έχει ξηρούς καρπούς' },
      { de:'Nimm den Zitronenkuchen und sag, dass du allergisch bist', es:'Pide el de limón y di que eres alérgico', en:'Take the lemon cake and say you are allergic', el:'Πάρε το κέικ λεμονιού και πες ότι είσαι αλλεργικός' }
    ],
    'a2.einkaufen': [
      { de:'Sag, dass du das Hemd gestern gekauft hast und es dir zu groß ist', es:'Di que compraste esta camisa ayer y que te queda grande', en:'Say you bought this shirt yesterday and it is too big on you', el:'Πες ότι αγόρασες αυτό το πουκάμισο χθες και ότι σου είναι μεγάλο' },
      { de:'Bejahe und frag, ob du es umtauschen kannst', es:'Di que sí y pregunta si puedes cambiarla', en:'Say yes and ask whether you can exchange it', el:'Πες ναι και ρώτα αν μπορείς να το αλλάξεις' },
      { de:'Sag: eine Nummer kleiner, und frag, ob du es anprobieren darfst', es:'Di que una talla menos y pregunta si te la puedes probar', en:'Say one size down and ask whether you can try it on', el:'Πες: ένα νούμερο μικρότερο, και ρώτα αν μπορείς να το δοκιμάσεις' }
    ],
    'a2.familie': [
      { de:'Sag, dass ihr in einem kleinen Ort gewohnt habt', es:'Di que vivíais en un pueblo pequeño', en:'Say you lived in a small town', el:'Πες ότι μένατε σε μια μικρή πόλη' },
      { de:'Bejahe und erzähle, dass ihr euch sonntags bei der Tante getroffen habt', es:'Di que sí y cuenta que los domingos se reunían en casa de tu tía', en:'Say yes, and that on Sundays you all met at your aunt\'s', el:'Πες ναι, και ότι τις Κυριακές μαζευόσασταν όλοι στης θείας σου' },
      { de:'Sag, dass deine Schwester weggezogen ist und dass du sie vermisst', es:'Di que tu hermana se mudó y que la echas de menos', en:'Say your sister moved away and that you miss her', el:'Πες ότι η αδερφή σου μετακόμισε μακριά και ότι σου λείπει' }
    ],
    'a2.hotel': [
      { de:'Sag, dass die Heizung nicht funktioniert', es:'Di que la calefacción no funciona', en:'Say the heat is not working', el:'Πες ότι η θέρμανση δεν λειτουργεί' },
      { de:'Sag: seit gestern Abend, und dass es kein warmes Wasser gibt', es:'Di que desde anoche y que tampoco hay agua caliente', en:'Say since last night, and that there is no hot water either', el:'Πες: από χθες βράδυ, και ότι δεν έχει ούτε ζεστό νερό' },
      { de:'Sag, dass du lieber das Zimmer wechseln möchtest', es:'Di que prefieres cambiar de habitación', en:'Say you would rather move rooms', el:'Πες ότι θα προτιμούσες να αλλάξεις δωμάτιο' }
    ],
    'a2.restaurant': [
      { de:'Frag nach der Spezialität des Hauses', es:'Pregunta cuál es la especialidad de la casa', en:'Ask what the house specialty is', el:'Ρώτα ποια είναι η σπεσιαλιτέ του μαγαζιού' },
      { de:'Frag nach etwas Leichterem und sag, dass ihr teilen wollt', es:'Pregunta si hay algo más ligero y di que quieren compartir', en:'Ask for something lighter and say you want to share', el:'Ζήτα κάτι πιο ελαφρύ και πες ότι θέλετε να το μοιραστείτε' },
      { de:'Nimm den Fisch und frag, ob ihr getrennt zahlen könnt', es:'Acepta el pescado y pregunta si pueden pagar por separado', en:'Take the fish and ask whether you can split the check', el:'Πάρε το ψάρι και ρώτα αν μπορείτε να πληρώσετε χωριστά' }
    ],
    'a2.taxi': [
      { de:'Sag, dass du zum Flughafen willst und es eilig hast', es:'Di que vas al aeropuerto y que tienes prisa', en:'Say you are going to the airport and you are in a bit of a rush', el:'Πες ότι πας στο αεροδρόμιο και ότι βιάζεσαι λίγο' },
      { de:'Frag, ob der Weg durch die Stadt wirklich schneller ist', es:'Pregunta si por el centro es de verdad más rápido', en:'Ask whether that is actually faster', el:'Ρώτα αν αυτός ο δρόμος είναι όντως πιο γρήγορος' },
      { de:'Sag: dann diesen Weg, und frag nach einer Quittung', es:'Di que vaya por ahí y pregunta por un recibo', en:'Say let us do that, and ask for a receipt', el:'Πες: ας πάμε από εκεί, και ζήτα απόδειξη' }
    ],
    'a2.wegbeschreibung': [
      { de:'Frag, wie du zum Museum kommst', es:'Pregunta cómo llegar al museo', en:'Ask how to get to the museum', el:'Ρώτα πώς πας στο μουσείο' },
      { de:'Frag, wie es danach weitergeht', es:'Pregunta cómo sigues después', en:'Ask what comes after that', el:'Ρώτα τι ακολουθεί μετά' },
      { de:'Frag, ob man zu Fuß hingehen kann', es:'Pregunta si se puede ir a pie', en:'Ask whether you can walk there', el:'Ρώτα αν μπορείς να πας με τα πόδια' }
    ],
    'a2.wetter': [
      { de:'Sag, es kommt aufs Wetter an, und frag nach der Vorhersage', es:'Di que depende del tiempo y pregunta por la previsión', en:'Say it depends on the weather and ask about the forecast', el:'Πες ότι εξαρτάται από τον καιρό και ρώτα για την πρόγνωση' },
      { de:'Frag, wie es am Nachmittag wird', es:'Pregunta qué tiempo hará por la tarde', en:'Ask about the afternoon', el:'Ρώτα πώς θα είναι το απόγευμα' },
      { de:'Schlag vor, nachmittags zu fahren, und sag, dass du eine Jacke mitnimmst', es:'Propón ir por la tarde y di que llevas una chaqueta', en:'Suggest going in the afternoon and say you will bring a jacket', el:'Πρότεινε να πάτε το απόγευμα και πες ότι θα πάρεις ένα μπουφάν' }
    ]
  };

  var STATIONEN = {

    'a1.arzt': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast seit gestern Kopfschmerzen und Fieber.', es:'Desde ayer te duele la cabeza y tienes fiebre.', en:'Since yesterday you\'ve had a headache and a fever.', el:'Από χθες έχεις πονοκέφαλο και πυρετό.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Of course. I\'ll send the prescription to your pharmacy. Feel better!', na:{ de:'Gern. Ich schicke das Rezept an Ihre Apotheke. Gute Besserung!', es:'Muy bien. Le mando la receta a su farmacia. ¡Que se mejore!', el:'Βεβαίως. Θα στείλω τη συνταγή στο φαρμακείο σας. Περαστικά!' } },
      wortschatz: [
        { z:'a headache', na:{ de:'die Kopfschmerzen', es:'el dolor de cabeza', el:'ο πονοκέφαλος' } },
        { z:'a stomachache', na:{ de:'die Bauchschmerzen', es:'el dolor de barriga', el:'ο πόνος στην κοιλιά' } },
        { z:'a fever', na:{ de:'das Fieber', es:'la fiebre', el:'ο πυρετός' } },
        { z:'a pill', na:{ de:'die Tablette', es:'la pastilla', el:'το χάπι' } },
        { z:'the prescription', na:{ de:'das Rezept', es:'la receta', el:'η συνταγή' } },
        { z:'the pharmacy', na:{ de:'die Apotheke', es:'la farmacia', el:'το φαρμακείο' } },
        { z:'to rest', na:{ de:'sich ausruhen', es:'descansar', el:'ξεκουράζομαι' } },
        { z:'to cough', na:{ de:'husten', es:'toser', el:'βήχω' } },
        { z:'tired', na:{ de:'müde', es:'cansado', el:'κουρασμένος' } },
        { z:'insurance', na:{ de:'die Versicherung', es:'el seguro', el:'η ασφάλεια' } },
        { z:'the appointment', na:{ de:'der Termin', es:'la cita', el:'το ραντεβού' } },
        { z:'feel better', na:{ de:'gute Besserung', es:'que se mejore', el:'περαστικά' } }
      ],
      dialog: {
        rolle: { de:'die Ärztin', es:'la médica', el:'η γιατρός' },
        zeilen: [
          { wer:'spikiu', z:'Hello. What brings you in today?', na:{ de:'Guten Tag. Was führt Sie zu mir?', es:'Buenos días. ¿Qué le trae por aquí?', el:'Καλημέρα. Τι σας φέρνει σήμερα;' } },
          { wer:'lerner', z:'I have a headache.', na:{ de:'Ich habe Kopfschmerzen.', es:'Me duele la cabeza.', el:'Έχω πονοκέφαλο.' } },
          { wer:'spikiu', z:'How long has that been going on?', na:{ de:'Seit wann denn?', es:'¿Desde cuándo?', el:'Από πότε το έχετε;' } },
          { wer:'lerner', z:'Since yesterday. And I have a fever.', na:{ de:'Seit gestern. Und ich habe Fieber.', es:'Desde ayer. Y tengo fiebre.', el:'Από χθες. Και έχω πυρετό.' } },
          { wer:'spikiu', z:'Take one of these and rest up for a couple of days.', na:{ de:'Nehmen Sie davon eine und ruhen Sie sich ein paar Tage aus.', es:'Tome una de estas y descanse un par de días.', el:'Πάρτε ένα από αυτά και ξεκουραστείτε δυο μέρες.' } },
          { wer:'lerner', z:'Thank you, doctor.', na:{ de:'Danke, Frau Doktor.', es:'Gracias, doctora.', el:'Ευχαριστώ, γιατρέ.' } }
        ]
      },
      lesetext: {
        z:'A patient has had a headache since yesterday and also a fever. The doctor tells her to take a pill and rest for a couple of days, and sends the prescription to her pharmacy.',
        na:{ de:'Eine Patientin hat seit gestern Kopfschmerzen und außerdem Fieber. Die Ärztin sagt, sie soll eine Tablette nehmen und sich ein paar Tage ausruhen, und schickt das Rezept an ihre Apotheke.', es:'Una paciente tiene dolor de cabeza desde ayer y además fiebre. La médica le dice que tome una pastilla y descanse un par de días, y manda la receta a su farmacia.', el:'Μια ασθενής έχει από χθες πονοκέφαλο και επιπλέον πυρετό. Η γιατρός της λέει να πάρει ένα χάπι και να ξεκουραστεί δυο μέρες, και στέλνει τη συνταγή στο φαρμακείο της.' },
        frage:{ de:'Wohin geht das Rezept?', es:'¿Adónde va la receta?', el:'Πού πηγαίνει η συνταγή;' },
        optionen:[
          { na:{ de:'An ihre Apotheke', es:'A su farmacia', el:'Στο φαρμακείο της' }, richtig:true },
          { na:{ de:'Zu ihr nach Hause', es:'A su casa', el:'Στο σπίτι της' }, richtig:false },
          { na:{ de:'Sie bekommt es auf Papier', es:'Se la dan en papel', el:'Της τη δίνουν σε χαρτί' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du Bauchschmerzen hast, und seit wann. Zwei Sätze.', es:'Di que te duele la barriga y desde cuándo. Dos frases.', el:'Πες ότι πονάει η κοιλιά σου και από πότε. Δύο προτάσεις.' },
        muster:'I have a stomachache. It started yesterday.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Krankheiten bekommen im Englischen ein kleines **a**: I have **a** headache, **a** fever, **a** cold. Ohne das *a* klingt es falsch, obwohl man im Deutschen einfach „ich habe Kopfschmerzen" sagt.', es:'Las dolencias llevan en inglés un **a** delante: I have **a** headache, **a** fever, **a** cold. Sin ese *a* suena mal, aunque en español baste con „me duele la cabeza".', el:'Στα αγγλικά οι ενοχλήσεις παίρνουν μπροστά ένα **a**: I have **a** headache, **a** fever, **a** cold. Χωρίς αυτό το *a* ακούγεται λάθος, ακόμη κι αν στα ελληνικά αρκεί ένα «έχω πονοκέφαλο».' },
        beispiele:[
          { z:'I have a headache.', na:{ de:'Ich habe Kopfschmerzen.', es:'Me duele la cabeza.', el:'Έχω πονοκέφαλο.' } },
          { z:'I have a cold.', na:{ de:'Ich bin erkältet.', es:'Estoy resfriado.', el:'Είμαι κρυωμένος.' } }
        ]
      }
    },

    'a1.bahnhof': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du willst nach Boston und wieder zurück.', es:'Quieres ir a Boston y volver.', en:'You want to go to Boston and come back.', el:'Θέλεις να πας στη Βοστόνη και να γυρίσεις.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Next in line. What can I do for you?', na:{ de:'Der Nächste bitte. Was kann ich für Sie tun?', es:'El siguiente. ¿En qué le ayudo?', el:'Ο επόμενος, παρακαλώ. Τι μπορώ να κάνω για εσάς;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Track four. That\'s thirty-three dollars — safe travels!', na:{ de:'Gleis vier. Das macht dreiunddreißig Dollar — gute Fahrt!', es:'Andén cuatro. Son treinta y tres dólares. ¡Buen viaje!', el:'Αποβάθρα τέσσερα. Κάνει τριάντα τρία δολάρια — καλό ταξίδι!' } },
      wortschatz: [
        { z:'a ticket', na:{ de:'die Fahrkarte', es:'el billete', el:'το εισιτήριο' } },
        { z:'the ticket counter', na:{ de:'der Schalter', es:'la ventanilla', el:'το γκισέ εισιτηρίων' } },
        { z:'the track', na:{ de:'das Gleis', es:'el andén', el:'η αποβάθρα' } },
        { z:'one way', na:{ de:'einfach', es:'solo ida', el:'απλή μετάβαση' } },
        { z:'round trip', na:{ de:'hin und zurück', es:'ida y vuelta', el:'μετ’ επιστροφής' } },
        { z:'to leave', na:{ de:'abfahren', es:'salir', el:'αναχωρώ' } },
        { z:'to arrive', na:{ de:'ankommen', es:'llegar', el:'φτάνω' } },
        { z:'to transfer', na:{ de:'umsteigen', es:'hacer transbordo', el:'αλλάζω τρένο' } },
        { z:'the schedule', na:{ de:'der Fahrplan', es:'el horario', el:'τα δρομολόγια' } },
        { z:'the conductor', na:{ de:'der Schaffner', es:'el revisor', el:'ο ελεγκτής' } },
        { z:'to board', na:{ de:'einsteigen', es:'subir', el:'επιβιβάζομαι' } },
        { z:'safe travels', na:{ de:'gute Fahrt', es:'buen viaje', el:'καλό ταξίδι' } }
      ],
      dialog: {
        rolle: { de:'der Schalterbeamte', es:'el empleado de la ventanilla', el:'ο υπάλληλος στο γκισέ' },
        zeilen: [
          { wer:'spikiu', z:'Next in line. What can I do for you?', na:{ de:'Der Nächste bitte. Was kann ich für Sie tun?', es:'El siguiente. ¿En qué le ayudo?', el:'Ο επόμενος, παρακαλώ. Τι μπορώ να κάνω για εσάς;' } },
          { wer:'lerner', z:'One ticket to Boston, please.', na:{ de:'Eine Fahrkarte nach Boston, bitte.', es:'Un billete para Boston, por favor.', el:'Ένα εισιτήριο για Βοστόνη, παρακαλώ.' } },
          { wer:'spikiu', z:'One way or round trip?', na:{ de:'Einfach oder hin und zurück?', es:'¿Solo ida o ida y vuelta?', el:'Απλό ή μετ’ επιστροφής;' } },
          { wer:'lerner', z:'Round trip. What time does it leave?', na:{ de:'Hin und zurück. Wann fährt er?', es:'Ida y vuelta. ¿A qué hora sale?', el:'Μετ’ επιστροφής. Τι ώρα φεύγει;' } },
          { wer:'spikiu', z:'The next one leaves at nine twelve.', na:{ de:'Der nächste um neun Uhr zwölf.', es:'El próximo a las nueve y doce.', el:'Το επόμενο φεύγει στις εννιά και δώδεκα.' } },
          { wer:'lerner', z:'And which track?', na:{ de:'Und von welchem Gleis?', es:'¿Y de qué andén?', el:'Και από ποια αποβάθρα;' } }
        ]
      },
      lesetext: {
        z:'At the counter a traveller buys a round-trip ticket to Boston for thirty-three dollars. The next train leaves at nine twelve from track four.',
        na:{ de:'Am Schalter kauft ein Reisender eine Fahrkarte nach Boston, hin und zurück, für dreiunddreißig Dollar. Der nächste Zug fährt um neun Uhr zwölf von Gleis vier.', es:'En la ventanilla un viajero compra un billete de ida y vuelta a Boston por treinta y tres dólares. El próximo tren sale a las nueve y doce del andén cuatro.', el:'Στο γκισέ ένας ταξιδιώτης αγοράζει ένα εισιτήριο μετ’ επιστροφής για τη Βοστόνη για τριάντα τρία δολάρια. Το επόμενο τρένο φεύγει στις εννιά και δώδεκα από την αποβάθρα τέσσερα.' },
        frage:{ de:'Von welchem Gleis fährt der Zug?', es:'¿De qué andén sale el tren?', el:'Από ποια αποβάθρα φεύγει το τρένο;' },
        optionen:[
          { na:{ de:'Gleis vier', es:'Andén cuatro', el:'Αποβάθρα τέσσερα' }, richtig:true },
          { na:{ de:'Gleis neun', es:'Andén nueve', el:'Αποβάθρα εννιά' }, richtig:false },
          { na:{ de:'Gleis zwölf', es:'Andén doce', el:'Αποβάθρα δώδεκα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Kaufe eine einfache Fahrkarte und frag, wann sie fährt. Zwei Sätze.', es:'Compra un billete solo de ida y pregunta a qué hora sale. Dos frases.', el:'Αγόρασε ένα απλό εισιτήριο και ρώτα τι ώρα φεύγει. Δύο προτάσεις.' },
        muster:'One ticket to Boston, one way. What time does it leave?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Bei der Frage nach der Zeit steht **does** vorn — und das Verb dahinter bleibt in der Grundform: „What time **does** it **leave**?", nicht *leaves*. Das ist die häufigste Falle bei englischen Fragen.', es:'Al preguntar la hora, delante va **does** — y el verbo detrás se queda en su forma básica: „What time **does** it **leave**?", no *leaves*. Es la trampa más frecuente en las preguntas inglesas.', el:'Όταν ρωτάς την ώρα, μπροστά μπαίνει το **does** — και το ρήμα που ακολουθεί μένει στη βασική του μορφή: «What time **does** it **leave**?», όχι *leaves*. Είναι η πιο συχνή παγίδα στις αγγλικές ερωτήσεις.' },
        beispiele:[
          { z:'What time does it leave?', na:{ de:'Wann fährt er ab?', es:'¿A qué hora sale?', el:'Τι ώρα φεύγει;' } },
          { z:'When does it arrive?', na:{ de:'Wann kommt er an?', es:'¿Cuándo llega?', el:'Πότε φτάνει;' } }
        ]
      }
    },

    'a1.cafe': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du bist Gast im Café. Du möchtest einen Kaffee mit Milch und danach zahlen.', es:'Eres cliente en la cafetería. Quieres un café con leche y después pagar.', en:'You\'re a customer at the café. You want a coffee with milk and then to pay.', el:'Είσαι πελάτης στο καφέ. Θέλεις έναν καφέ με γάλα και μετά να πληρώσεις.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'That\'ll be three fifty. Have a great day!', na:{ de:'Das macht drei fünfzig. Schönen Tag noch!', es:'Son tres cincuenta. ¡Que tenga un buen día!', el:'Τρία και πενήντα. Να έχετε μια υπέροχη μέρα!' } },
      wortschatz: [
        { z:'coffee', na:{ de:'der Kaffee', es:'el café', el:'ο καφές' } },
        { z:'tea', na:{ de:'der Tee', es:'el té', el:'το τσάι' } },
        { z:'water', na:{ de:'das Wasser', es:'el agua', el:'το νερό' } },
        { z:'milk', na:{ de:'die Milch', es:'la leche', el:'το γάλα' } },
        { z:'sugar', na:{ de:'der Zucker', es:'el azúcar', el:'η ζάχαρη' } },
        { z:'a cup', na:{ de:'eine Tasse', es:'una taza', el:'ένα φλιτζάνι' } },
        { z:'to go', na:{ de:'zum Mitnehmen', es:'para llevar', el:'για πακέτο' } },
        { z:'regular', na:{ de:'mittelgroß, mit Milch', es:'mediano, con leche', el:'κανονικός, με γάλα' } },
        { z:'please', na:{ de:'bitte', es:'por favor', el:'παρακαλώ' } },
        { z:'thanks', na:{ de:'danke', es:'gracias', el:'ευχαριστώ' } },
        { z:'the check', na:{ de:'die Rechnung', es:'la cuenta', el:'ο λογαριασμός' } },
        { z:'keep the change', na:{ de:'stimmt so', es:'quédese con la vuelta', el:'κρατήστε τα ρέστα' } }
      ],
      dialog: {
        rolle: { de:'der Barista', es:'el camarero', el:'ο μπαρίστας' },
        zeilen: [
          { wer:'spikiu', z:'Hi there! What can I get you?', na:{ de:'Hallo! Was darf ich Ihnen bringen?', es:'¡Hola! ¿Qué le pongo?', el:'Γεια σας! Τι να σας φέρω;' } },
          { wer:'lerner', z:'A coffee, please.', na:{ de:'Einen Kaffee, bitte.', es:'Un café, por favor.', el:'Έναν καφέ, παρακαλώ.' } },
          { wer:'spikiu', z:'Sure. For here or to go?', na:{ de:'Gerne. Zum Hiertrinken oder zum Mitnehmen?', es:'Claro. ¿Para tomar aquí o para llevar?', el:'Βεβαίως. Για εδώ ή για πακέτο;' } },
          { wer:'lerner', z:'For here, please.', na:{ de:'Zum Hiertrinken, bitte.', es:'Para tomar aquí, por favor.', el:'Για εδώ, παρακαλώ.' } },
          { wer:'spikiu', z:'Coming right up. Anything else?', na:{ de:'Kommt sofort. Sonst noch etwas?', es:'Enseguida. ¿Algo más?', el:'Έρχεται αμέσως. Κάτι άλλο;' } },
          { wer:'lerner', z:'No thanks. How much do I owe you?', na:{ de:'Nein danke. Was macht das?', es:'No, gracias. ¿Cuánto le debo?', el:'Όχι, ευχαριστώ. Πόσο σας χρωστάω;' } }
        ]
      },
      lesetext: {
        z:'Marta goes into a café. She orders a coffee for here. It costs three fifty. She gives the barista five dollars and gets one fifty back.',
        na:{ de:'Marta geht in ein Café. Sie bestellt einen Kaffee zum Hiertrinken. Er kostet drei fünfzig. Sie gibt fünf Dollar und bekommt eineinhalb zurück.', es:'Marta entra en una cafetería. Pide un café para tomar allí. Cuesta tres cincuenta. Da cinco dólares y le devuelven uno cincuenta.', el:'Η Μάρτα μπαίνει σε ένα καφέ. Παραγγέλνει έναν καφέ για να τον πιει εκεί. Κοστίζει τρία και πενήντα. Δίνει πέντε δολάρια και παίρνει ενάμισι πίσω.' },
        frage:{ de:'Wie viel bekommt Marta zurück?', es:'¿Cuánto le devuelven a Marta?', el:'Πόσα ρέστα παίρνει η Μάρτα;' },
        optionen:[
          { na:{ de:'Eineinhalb Dollar', es:'Uno cincuenta', el:'Ενάμισι δολάριο' }, richtig:true },
          { na:{ de:'Drei fünfzig', es:'Tres cincuenta', el:'Τρία και πενήντα' }, richtig:false },
          { na:{ de:'Fünf Dollar', es:'Cinco dólares', el:'Πέντε δολάρια' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Bestelle einen Tee mit Zucker und frag, was du schuldest. Zwei Sätze.', es:'Pide un té con azúcar y pregunta cuánto debes. Dos frases.', el:'Παράγγειλε ένα τσάι με ζάχαρη και ρώτα πόσα χρωστάς. Δύο προτάσεις.' },
        muster:'A tea with sugar, please. How much do I owe you?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Im Englischen steht vor fast jedem Ding ein kleines **a** oder **an**: a coffee, a cup, **an** apple. Vor Vokalen wird aus *a* ein *an*. Anders als im Deutschen gibt es nur diese eine Form — kein der, die, das.', es:'En inglés casi toda cosa lleva delante un **a** o **an**: a coffee, a cup, **an** apple. Delante de vocal, *a* se convierte en *an*. A diferencia del español no hay masculino ni femenino: una sola forma para todo.', el:'Στα αγγλικά σχεδόν κάθε πράγμα έχει μπροστά ένα **a** ή **an**: a coffee, a cup, **an** apple. Μπροστά από φωνήεν, το *a* γίνεται *an*. Αντίθετα με τα ελληνικά, υπάρχει μόνο αυτή η μία μορφή — ούτε αρσενικό, ούτε θηλυκό, ούτε ουδέτερο.' },
        beispiele:[
          { z:'a coffee', na:{ de:'ein Kaffee', es:'un café', el:'ένας καφές' } },
          { z:'an apple', na:{ de:'ein Apfel', es:'una manzana', el:'ένα μήλο' } }
        ]
      }
    },

    'a1.einkaufen': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Im Supermarkt kaufst du Äpfel und Käse. Du zahlst mit Karte.', es:'En el supermercado compras manzanas y queso. Pagas con tarjeta.', en:'At the supermarket you buy apples and cheese. You\'re paying by card.', el:'Στο σούπερ μάρκετ αγοράζεις μήλα και τυρί. Πληρώνεις με κάρτα.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'All set. Have a good one!', na:{ de:'Fertig. Machen Sie es gut!', es:'Ya está. ¡Que le vaya bien!', el:'Έτοιμα. Να είστε καλά!' } },
      wortschatz: [
        { z:'the cashier', na:{ de:'die Kassiererin', es:'la cajera', el:'η ταμίας' } },
        { z:'a pound', na:{ de:'ein Pfund', es:'una libra', el:'μια λίβρα' } },
        { z:'apples', na:{ de:'die Äpfel', es:'las manzanas', el:'τα μήλα' } },
        { z:'cheese', na:{ de:'der Käse', es:'el queso', el:'το τυρί' } },
        { z:'bread', na:{ de:'das Brot', es:'el pan', el:'το ψωμί' } },
        { z:'to cost', na:{ de:'kosten', es:'costar', el:'κοστίζω' } },
        { z:'cash', na:{ de:'bar', es:'en efectivo', el:'μετρητά' } },
        { z:'card', na:{ de:'die Karte', es:'la tarjeta', el:'η κάρτα' } },
        { z:'the receipt', na:{ de:'der Kassenbon', es:'el ticket', el:'η απόδειξη' } },
        { z:'the bag', na:{ de:'die Tüte', es:'la bolsa', el:'η σακούλα' } },
        { z:'a quarter', na:{ de:'25 Cent', es:'25 centavos', el:'25 σεντς' } },
        { z:'have a good one', na:{ de:'machen Sie es gut', es:'que le vaya bien', el:'να είστε καλά' } }
      ],
      dialog: {
        rolle: { de:'die Kassiererin', es:'la cajera', el:'η ταμίας' },
        zeilen: [
          { wer:'spikiu', z:'Hi, did you find everything okay?', na:{ de:'Hallo, haben Sie alles gefunden?', es:'Hola, ¿lo ha encontrado todo?', el:'Γεια σας, βρήκατε όλα όσα θέλατε;' } },
          { wer:'lerner', z:'Yes, thanks. Just these apples.', na:{ de:'Ja, danke. Nur diese Äpfel.', es:'Sí, gracias. Solo estas manzanas.', el:'Ναι, ευχαριστώ. Μόνο αυτά τα μήλα.' } },
          { wer:'spikiu', z:'And a pound of cheese, that\'s it?', na:{ de:'Und ein Pfund Käse, das ist alles?', es:'Y medio kilo de queso, ¿eso es todo?', el:'Και μια λίβρα τυρί, αυτά είναι όλα;' } },
          { wer:'lerner', z:'Yes. How much is that?', na:{ de:'Ja. Was kostet das?', es:'Sí. ¿Cuánto es?', el:'Ναι. Πόσο κάνει;' } },
          { wer:'spikiu', z:'Eight forty-nine. Cash or card?', na:{ de:'Acht Euro neunundvierzig. Bar oder Karte?', es:'Ocho con cuarenta y nueve. ¿Efectivo o tarjeta?', el:'Οκτώ και σαράντα εννιά. Μετρητά ή κάρτα;' } },
          { wer:'lerner', z:'Card, please.', na:{ de:'Mit Karte, bitte.', es:'Con tarjeta, por favor.', el:'Με κάρτα, παρακαλώ.' } }
        ]
      },
      lesetext: {
        z:'At the supermarket a customer buys apples and half a pound of cheese. The total is eight forty-nine. She pays by card. The cashier wishes her a good one.',
        na:{ de:'Im Supermarkt kauft eine Kundin Äpfel und ein halbes Pfund Käse. Zusammen sind das acht Euro neunundvierzig. Sie zahlt mit Karte. Die Kassiererin wünscht ihr einen schönen Tag.', es:'En el supermercado una clienta compra manzanas y un cuarto de kilo de queso. En total son ocho con cuarenta y nueve. Paga con tarjeta. La cajera le desea un buen día.', el:'Στο σούπερ μάρκετ μια πελάτισσα αγοράζει μήλα και μισή λίβρα τυρί. Όλα μαζί κάνουν οκτώ και σαράντα εννιά. Πληρώνει με κάρτα. Η ταμίας της εύχεται καλή μέρα.' },
        frage:{ de:'Wie bezahlt sie?', es:'¿Cómo paga?', el:'Πώς πληρώνει;' },
        optionen:[
          { na:{ de:'Mit Karte', es:'Con tarjeta', el:'Με κάρτα' }, richtig:true },
          { na:{ de:'Bar', es:'En efectivo', el:'Με μετρητά' }, richtig:false },
          { na:{ de:'Sie bezahlt nicht', es:'No paga', el:'Δεν πληρώνει' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, was etwas kostet, und sag, dass du bar zahlst. Zwei Sätze.', es:'Pregunta cuánto cuesta algo y di que pagas en efectivo. Dos frases.', el:'Ρώτα πόσο κοστίζει κάτι και πες ότι πληρώνεις με μετρητά. Δύο προτάσεις.' },
        muster:'How much is that? I\'ll pay cash, please.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Englisch trennt, was Deutsch zusammenwirft. **How much** fragt nach etwas, das man nicht zählt: how much cheese, how much water. **How many** fragt nach Zählbarem: how many apples, how many people. Beim Preis heißt es immer *how much*.', es:'El inglés separa lo que el español junta en „cuánto". **How much** para lo que no se cuenta: how much cheese, how much water. **How many** para lo contable: how many apples, how many people. Para el precio siempre *how much*.', el:'Τα αγγλικά χωρίζουν ό,τι τα ελληνικά λένε με ένα «πόσο». **How much** για ό,τι δεν μετριέται: how much cheese, how much water. **How many** για ό,τι μετριέται: how many apples, how many people. Για την τιμή πάντα *how much*.' },
        beispiele:[
          { z:'How much is that?', na:{ de:'Was kostet das?', es:'¿Cuánto es?', el:'Πόσο κάνει;' } },
          { z:'How many apples?', na:{ de:'Wie viele Äpfel?', es:'¿Cuántas manzanas?', el:'Πόσα μήλα;' } }
        ]
      }
    },

    'a1.familie': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen
         — etwa das 'ich verstehe dich nicht' der Szene. Ohne dieses Feld
         siezte Spikiu mitten in einem Du-Gespraech (Leo, 31.08.). */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast eine Schwester. Sie heißt Klara und ist zwölf Jahre alt.', es:'Tienes una hermana. Se llama Clara y tiene doce años.', en:'You have a sister. Her name is Clara and she is twelve.', el:'Έχεις μια αδερφή. Τη λένε Κλάρα και είναι δώδεκα χρονών.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Oh, that\'s a fun age. Say hi to her from me!', na:{ de:'Ach, das schöne Alter. Grüß sie von mir!', es:'Ay, qué edad tan bonita. ¡Salúdala de mi parte!', el:'Α, ωραία ηλικία. Χαιρετίσματα από μένα!' } },
      wortschatz: [
        { z:'a sister', na:{ de:'die Schwester', es:'la hermana', el:'η αδερφή' } },
        { z:'a brother', na:{ de:'der Bruder', es:'el hermano', el:'ο αδερφός' } },
        { z:'siblings', na:{ de:'die Geschwister', es:'los hermanos', el:'τα αδέρφια' } },
        { z:'parents', na:{ de:'die Eltern', es:'los padres', el:'οι γονείς' } },
        { z:'mom', na:{ de:'die Mama', es:'la mamá', el:'η μαμά' } },
        { z:'dad', na:{ de:'der Papa', es:'el papá', el:'ο μπαμπάς' } },
        { z:'grandparents', na:{ de:'die Großeltern', es:'los abuelos', el:'ο παππούς και η γιαγιά' } },
        { z:'a son', na:{ de:'der Sohn', es:'el hijo', el:'ο γιος' } },
        { z:'a daughter', na:{ de:'die Tochter', es:'la hija', el:'η κόρη' } },
        { z:'an only child', na:{ de:'das Einzelkind', es:'hijo único', el:'το μοναχοπαίδι' } },
        { z:'married', na:{ de:'verheiratet', es:'casado', el:'παντρεμένος' } },
        { z:'the neighbor', na:{ de:'die Nachbarin', es:'la vecina', el:'η γειτόνισσα' } }
      ],
      dialog: {
        rolle: { de:'eine Nachbarin', es:'una vecina', el:'μια γειτόνισσα' },
        zeilen: [
          { wer:'spikiu', z:'So tell me — do you have any brothers or sisters?', na:{ de:'Sag mal, hast du Geschwister?', es:'Cuéntame, ¿tienes hermanos?', el:'Για πες μου — έχεις αδέρφια;' } },
          { wer:'lerner', z:'Yes, I have a sister.', na:{ de:'Ja, ich habe eine Schwester.', es:'Sí, tengo una hermana.', el:'Ναι, έχω μια αδερφή.' } },
          { wer:'spikiu', z:'Nice! What\'s her name?', na:{ de:'Schön! Wie heißt sie?', es:'¡Qué bien! ¿Cómo se llama?', el:'Ωραία! Πώς τη λένε;' } },
          { wer:'lerner', z:'Her name is Clara.', na:{ de:'Sie heißt Clara.', es:'Se llama Clara.', el:'Τη λένε Κλάρα.' } },
          { wer:'spikiu', z:'That\'s a pretty name. How old is she?', na:{ de:'Ein hübscher Name. Wie alt ist sie?', es:'Un nombre bonito. ¿Qué edad tiene?', el:'Ωραίο όνομα. Πόσο χρονών είναι;' } },
          { wer:'lerner', z:'She\'s twelve.', na:{ de:'Sie ist zwölf.', es:'Tiene doce años.', el:'Είναι δώδεκα.' } }
        ]
      },
      lesetext: {
        z:'A neighbour asks about the family. Yes, there\'s a sister — her name is Clara and she\'s twelve. The neighbour says to say hello to her.',
        na:{ de:'Eine Nachbarin fragt nach der Familie. Ja, es gibt eine Schwester — sie heißt Clara und ist zwölf. Die Nachbarin lässt sie grüßen.', es:'Una vecina pregunta por la familia. Sí, hay una hermana: se llama Clara y tiene doce años. La vecina le manda saludos.', el:'Μια γειτόνισσα ρωτάει για την οικογένεια. Ναι, υπάρχει μια αδερφή — τη λένε Κλάρα και είναι δώδεκα χρονών. Η γειτόνισσα στέλνει χαιρετίσματα.' },
        frage:{ de:'Wie alt ist Clara?', es:'¿Qué edad tiene Clara?', el:'Πόσο χρονών είναι η Κλάρα;' },
        optionen:[
          { na:{ de:'Zwölf', es:'Doce', el:'Δώδεκα' }, richtig:true },
          { na:{ de:'Zwei', es:'Dos', el:'Δύο' }, richtig:false },
          { na:{ de:'Zwanzig', es:'Veinte', el:'Είκοσι' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du einen Bruder hast, und nenne Namen und Alter. Zwei Sätze.', es:'Di que tienes un hermano y dinos su nombre y su edad. Dos frases.', el:'Πες ότι έχεις έναν αδερφό και πες το όνομα και την ηλικία του. Δύο προτάσεις.' },
        muster:'I have a brother. His name is Paul and he\'s eight.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Für den Namen sagt Englisch nicht „she calls herself", sondern **her name is** Clara oder **she\'s called** Clara. Und Achtung: *his* für einen Mann, *her* für eine Frau — es richtet sich nach der Person, nicht nach dem Wort danach.', es:'Para el nombre el inglés no dice „se llama" sino **her name is** Clara o **she\'s called** Clara. Y ojo: *his* para hombre, *her* para mujer — depende de la persona, no de la palabra que sigue, como sí ocurre en español.', el:'Για το όνομα τα αγγλικά δεν λένε «τη λένε», αλλά **her name is** Clara ή **she\'s called** Clara. Και προσοχή: *his* για άντρα, *her* για γυναίκα — εξαρτάται από το πρόσωπο, όχι από τη λέξη που ακολουθεί.' },
        beispiele:[
          { z:'Her name is Clara.', na:{ de:'Sie heißt Clara.', es:'Se llama Clara.', el:'Τη λένε Κλάρα.' } },
          { z:'His name is Paul.', na:{ de:'Er heißt Paul.', es:'Se llama Paul.', el:'Τον λένε Πολ.' } }
        ]
      }
    },

    'a1.hotel': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du heißt Weber, hast zwei Nächte gebucht und checkst gerade ein.', es:'Te apellidas Weber, has reservado dos noches y estás registrándote.', en:'Your name is Weber, you\'ve booked two nights and you\'re checking in.', el:'Σε λένε Βέμπερ, έχεις κλείσει δύο νύχτες και κάνεις τώρα check-in.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Third floor — elevator\'s right around the corner. Enjoy your stay!', na:{ de:'Dritter Stock, der Aufzug ist gleich um die Ecke. Schönen Aufenthalt!', es:'Tercera planta, el ascensor está doblando la esquina. ¡Que disfrute su estancia!', el:'Τρίτος όροφος — το ασανσέρ είναι ακριβώς στη γωνία. Καλή διαμονή!' } },
      wortschatz: [
        { z:'the front desk', na:{ de:'die Rezeption', es:'la recepción', el:'η ρεσεψιόν' } },
        { z:'to check in', na:{ de:'einchecken', es:'registrarse', el:'κάνω check-in' } },
        { z:'to check out', na:{ de:'auschecken', es:'dejar la habitación', el:'κάνω check-out' } },
        { z:'the key', na:{ de:'der Schlüssel', es:'la llave', el:'το κλειδί' } },
        { z:'breakfast', na:{ de:'das Frühstück', es:'el desayuno', el:'το πρωινό' } },
        { z:'the floor', na:{ de:'der Stock', es:'la planta', el:'ο όροφος' } },
        { z:'the elevator', na:{ de:'der Aufzug', es:'el ascensor', el:'το ασανσέρ' } },
        { z:'a double room', na:{ de:'das Doppelzimmer', es:'la habitación doble', el:'το δίκλινο δωμάτιο' } },
        { z:'a single room', na:{ de:'das Einzelzimmer', es:'la habitación individual', el:'το μονόκλινο δωμάτιο' } },
        { z:'an ID', na:{ de:'der Ausweis', es:'el documento de identidad', el:'η ταυτότητα' } },
        { z:'quiet', na:{ de:'ruhig', es:'tranquilo', el:'ήσυχος' } },
        { z:'the lobby', na:{ de:'die Lobby', es:'el vestíbulo', el:'το λόμπι' } }
      ],
      dialog: {
        rolle: { de:'der Rezeptionist', es:'el recepcionista', el:'ο ρεσεψιονίστ' },
        zeilen: [
          { wer:'spikiu', z:'Good afternoon. Checking in?', na:{ de:'Guten Tag. Möchten Sie einchecken?', es:'Buenas tardes. ¿Va a registrarse?', el:'Καλησπέρα. Για check-in;' } },
          { wer:'lerner', z:'Yes, under the name Weber.', na:{ de:'Ja, auf den Namen Weber.', es:'Sí, a nombre de Weber.', el:'Ναι, στο όνομα Βέμπερ.' } },
          { wer:'spikiu', z:'Got it. Two nights, right? Here\'s your key.', na:{ de:'Alles klar. Zwei Nächte, richtig? Hier Ihr Schlüssel.', es:'Muy bien. Dos noches, ¿verdad? Aquí tiene su llave.', el:'Μάλιστα. Δύο νύχτες, σωστά; Ορίστε το κλειδί σας.' } },
          { wer:'lerner', z:'Thanks. Is breakfast included?', na:{ de:'Danke. Ist das Frühstück dabei?', es:'Gracias. ¿El desayuno está incluido?', el:'Ευχαριστώ. Περιλαμβάνεται το πρωινό;' } },
          { wer:'spikiu', z:'It is — seven to ten, in the dining room.', na:{ de:'Ja, von sieben bis zehn, im Frühstücksraum.', es:'Sí, de siete a diez, en el comedor.', el:'Ναι — από τις επτά ως τις δέκα, στην τραπεζαρία.' } },
          { wer:'lerner', z:'Great. What floor is the room on?', na:{ de:'Prima. In welchem Stock ist das Zimmer?', es:'Perfecto. ¿En qué planta está?', el:'Τέλεια. Σε ποιον όροφο είναι το δωμάτιο;' } }
        ]
      },
      lesetext: {
        z:'Mr Weber checks in for two nights. He gets his key at the front desk. Breakfast is from seven to ten in the dining room. His room is on the third floor, and the elevator is around the corner.',
        na:{ de:'Herr Weber checkt für zwei Nächte ein. An der Rezeption bekommt er den Schlüssel. Frühstück gibt es von sieben bis zehn im Frühstücksraum. Sein Zimmer liegt im dritten Stock, der Aufzug ist um die Ecke.', es:'El señor Weber se registra para dos noches. En recepción recibe la llave. El desayuno es de siete a diez en el comedor. Su habitación está en la tercera planta y el ascensor está doblando la esquina.', el:'Ο κύριος Βέμπερ κάνει check-in για δύο νύχτες. Στη ρεσεψιόν παίρνει το κλειδί. Πρωινό σερβίρεται από τις επτά ως τις δέκα στην τραπεζαρία. Το δωμάτιό του είναι στον τρίτο όροφο και το ασανσέρ είναι στη γωνία.' },
        frage:{ de:'Wo liegt sein Zimmer?', es:'¿Dónde está su habitación?', el:'Πού είναι το δωμάτιό του;' },
        optionen:[
          { na:{ de:'Im dritten Stock', es:'En la tercera planta', el:'Στον τρίτο όροφο' }, richtig:true },
          { na:{ de:'Im Erdgeschoss', es:'En la planta baja', el:'Στο ισόγειο' }, richtig:false },
          { na:{ de:'Neben der Lobby', es:'Al lado del vestíbulo', el:'Δίπλα στο λόμπι' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du reserviert hast, und frag nach dem Frühstück. Zwei Sätze.', es:'Di que tienes una reserva y pregunta por el desayuno. Dos frases.', el:'Πες ότι έχεις κάνει κράτηση και ρώτα για το πρωινό. Δύο προτάσεις.' },
        muster:'I have a booking under the name Weber. Is breakfast included?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Vorsicht beim Zählen. In Amerika ist das Erdgeschoss bereits der **first floor** — der amerikanische *third floor* ist also der deutsche zweite Stock. In England zählt man wie in Deutschland: ground floor, first floor.', es:'Cuidado al contar. En Estados Unidos la planta baja ya es el **first floor** — o sea, el *third floor* americano es la segunda planta española. En Inglaterra se cuenta como en España: ground floor, first floor.', el:'Προσοχή στο μέτρημα. Στις Ηνωμένες Πολιτείες το ισόγειο είναι ήδη ο **first floor** — άρα ο αμερικανικός *third floor* είναι ο δικός μας δεύτερος όροφος. Στην Αγγλία μετράνε όπως στην Ελλάδα: ground floor, first floor.' },
        beispiele:[
          { z:'on the third floor', na:{ de:'im zweiten Stock (USA)', es:'en la segunda planta (EE. UU.)', el:'στον δεύτερο όροφο (ΗΠΑ)' } },
          { z:'the ground floor', na:{ de:'das Erdgeschoss', es:'la planta baja', el:'το ισόγειο' } }
        ]
      }
    },

    'a1.restaurant': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Ihr seid zu zweit und habt nicht reserviert. Was ihr esst, wisst ihr noch nicht.', es:'Son dos y no tienen reserva. Todavía no saben qué van a comer.', en:'There are two of you and no reservation. You haven\'t decided what to eat.', el:'Είστε δύο και δεν έχετε κάνει κράτηση. Δεν έχετε αποφασίσει ακόμα τι θα φάτε.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Excellent choice. I\'ll be right back with your water.', na:{ de:'Ausgezeichnete Wahl. Ich bringe Ihnen gleich Wasser.', es:'Excelente elección. Ahora les traigo agua.', el:'Εξαιρετική επιλογή. Σας φέρνω αμέσως νερό.' } },
      wortschatz: [
        { z:'the menu', na:{ de:'die Speisekarte', es:'la carta', el:'ο κατάλογος' } },
        { z:'the server', na:{ de:'der Kellner', es:'el camarero', el:'ο σερβιτόρος' } },
        { z:'to recommend', na:{ de:'empfehlen', es:'recomendar', el:'προτείνω' } },
        { z:'grilled', na:{ de:'gegrillt', es:'a la parrilla', el:'ψητός στη σχάρα' } },
        { z:'a side', na:{ de:'die Beilage', es:'la guarnición', el:'η γαρνιτούρα' } },
        { z:'the appetizer', na:{ de:'die Vorspeise', es:'el entrante', el:'το ορεκτικό' } },
        { z:'dessert', na:{ de:'der Nachtisch', es:'el postre', el:'το επιδόρπιο' } },
        { z:'to order', na:{ de:'bestellen', es:'pedir', el:'παραγγέλνω' } },
        { z:'delicious', na:{ de:'lecker', es:'rico', el:'νόστιμος' } },
        { z:'an entrée', na:{ de:'das Hauptgericht (USA)', es:'el plato principal (EE. UU.)', el:'το κυρίως πιάτο (ΗΠΑ)' } },
        { z:'split the check', na:{ de:'getrennt zahlen', es:'pagar por separado', el:'πληρώνουμε χωριστά' } },
        { z:'the tip', na:{ de:'das Trinkgeld', es:'la propina', el:'το φιλοδώρημα' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero', el:'ο σερβιτόρος' },
        zeilen: [
          { wer:'spikiu', z:'Good evening! How many in your party?', na:{ de:'Guten Abend! Für wie viele Personen?', es:'¡Buenas noches! ¿Cuántos son?', el:'Καλησπέρα! Πόσα άτομα είστε;' } },
          { wer:'lerner', z:'Two, please.', na:{ de:'Für zwei, bitte.', es:'Para dos, por favor.', el:'Δύο, παρακαλώ.' } },
          { wer:'spikiu', z:'Right this way. Here are your menus — ready to order?', na:{ de:'Hier entlang. Hier sind die Karten — möchten Sie schon bestellen?', es:'Por aquí. Aquí tienen la carta. ¿Ya quieren pedir?', el:'Από εδώ, παρακαλώ. Ορίστε οι κατάλογοι — είστε έτοιμοι να παραγγείλετε;' } },
          { wer:'lerner', z:'What do you recommend?', na:{ de:'Was können Sie empfehlen?', es:'¿Qué nos recomienda?', el:'Τι μας προτείνετε;' } },
          { wer:'spikiu', z:'The grilled salmon is really good tonight.', na:{ de:'Der gegrillte Lachs ist heute besonders gut.', es:'El salmón a la parrilla está muy bueno hoy.', el:'Ο σολομός σχάρας είναι πολύ καλός απόψε.' } },
          { wer:'lerner', z:'I\'ll have the salmon, then.', na:{ de:'Dann nehme ich den Lachs.', es:'Entonces tomo el salmón.', el:'Τότε θα πάρω τον σολομό.' } }
        ]
      },
      lesetext: {
        z:'Two friends go out for dinner. The server brings the menus and asks if they\'re ready to order. They ask what he recommends. Tonight the grilled salmon is very good, so they both take the salmon.',
        na:{ de:'Zwei Freunde gehen abends essen. Der Kellner bringt die Karten und fragt, ob sie bestellen möchten. Sie fragen, was er empfiehlt. Heute ist der gegrillte Lachs sehr gut, also nehmen beide den Lachs.', es:'Dos amigos salen a cenar. El camarero trae las cartas y pregunta si ya quieren pedir. Ellos preguntan qué recomienda. Esta noche el salmón a la parrilla está muy bueno, así que los dos toman el salmón.', el:'Δύο φίλοι βγαίνουν το βράδυ για φαγητό. Ο σερβιτόρος φέρνει τους καταλόγους και ρωτάει αν θέλουν να παραγγείλουν. Εκείνοι ρωτούν τι προτείνει. Απόψε ο σολομός σχάρας είναι πολύ καλός, οπότε παίρνουν και οι δύο σολομό.' },
        frage:{ de:'Was bestellen sie?', es:'¿Qué piden?', el:'Τι παραγγέλνουν;' },
        optionen:[
          { na:{ de:'Den Lachs', es:'El salmón', el:'Τον σολομό' }, richtig:true },
          { na:{ de:'Das Hähnchen', es:'El pollo', el:'Το κοτόπουλο' }, richtig:false },
          { na:{ de:'Nur Getränke', es:'Solo bebidas', el:'Μόνο ποτά' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass ihr zu dritt seid, und frag nach einer Empfehlung. Zwei Sätze.', es:'Di que sois tres y pide una recomendación. Dos frases.', el:'Πες ότι είστε τρεις και ζήτα μια πρόταση. Δύο προτάσεις.' },
        muster:'Three, please. What do you recommend?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Zum Bestellen sagt man im Englischen nicht „I want" — das klingt fordernd. Die normale Formel ist **I\'ll have** the salmon oder **I\'d like** the salmon. Zwei Wörter Unterschied, ein anderer Mensch am Tisch.', es:'Para pedir en inglés no se dice „I want" — suena a exigencia. La fórmula normal es **I\'ll have** the salmon o **I\'d like** the salmon. Dos palabras de diferencia, otra persona en la mesa.', el:'Για να παραγγείλεις στα αγγλικά δεν λες «I want» — ακούγεται σαν απαίτηση. Η κανονική φράση είναι **I\'ll have** the salmon ή **I\'d like** the salmon. Δύο λέξεις διαφορά, άλλος άνθρωπος στο τραπέζι.' },
        beispiele:[
          { z:'I\'ll have the salmon.', na:{ de:'Ich nehme den Lachs.', es:'Tomo el salmón.', el:'Θα πάρω τον σολομό.' } },
          { z:'I\'d like a coffee.', na:{ de:'Ich möchte einen Kaffee.', es:'Quiero un café.', el:'Θα ήθελα έναν καφέ.' } }
        ]
      }
    },

    'a1.taxi': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast einen Koffer dabei und willst zum Flughafen.', es:'Llevas una maleta y quieres ir al aeropuerto.', en:'You have one suitcase and you want to go to the airport.', el:'Έχεις μαζί σου μια βαλίτσα και θέλεις να πας στο αεροδρόμιο.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Evening. Yeah?', na:{ de:'Guten Abend. Ja bitte?', es:'Buenas noches. ¿Sí?', el:'Καλησπέρα. Ναι;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Here we are. That\'s twenty-eight. Have a safe flight!', na:{ de:'Da wären wir. Achtundzwanzig. Guten Flug!', es:'Ya hemos llegado. Son veintiocho. ¡Buen vuelo!', el:'Φτάσαμε. Είκοσι οκτώ. Καλή πτήση!' } },
      wortschatz: [
        { z:'the cab', na:{ de:'das Taxi', es:'el taxi', el:'το ταξί' } },
        { z:'the airport', na:{ de:'der Flughafen', es:'el aeropuerto', el:'το αεροδρόμιο' } },
        { z:'downtown', na:{ de:'die Innenstadt', es:'el centro', el:'το κέντρο της πόλης' } },
        { z:'a suitcase', na:{ de:'der Koffer', es:'la maleta', el:'η βαλίτσα' } },
        { z:'the trunk', na:{ de:'der Kofferraum', es:'el maletero', el:'το πορτμπαγκάζ' } },
        { z:'to hop in', na:{ de:'einsteigen', es:'subir', el:'ανεβαίνω (στο αυτοκίνητο)' } },
        { z:'the address', na:{ de:'die Adresse', es:'la dirección', el:'η διεύθυνση' } },
        { z:'to pull over', na:{ de:'anhalten', es:'parar', el:'σταματάω στην άκρη' } },
        { z:'fast', na:{ de:'schnell', es:'rápido', el:'γρήγορος' } },
        { z:'slow', na:{ de:'langsam', es:'despacio', el:'αργός' } },
        { z:'the fare', na:{ de:'der Fahrpreis', es:'la tarifa', el:'η τιμή της διαδρομής' } },
        { z:'keep the change', na:{ de:'stimmt so', es:'quédese con la vuelta', el:'κρατήστε τα ρέστα' } }
      ],
      dialog: {
        rolle: { de:'der Taxifahrer', es:'el taxista', el:'ο ταξιτζής' },
        zeilen: [
          { wer:'spikiu', z:'Evening. Yeah?', na:{ de:'Guten Abend. Ja bitte?', es:'Buenas noches. ¿Sí?', el:'Καλησπέρα. Ναι;' } },
          { wer:'lerner', z:'Are you free?', na:{ de:'Sind Sie frei?', es:'¿Está libre?', el:'Είστε ελεύθερος;' } },
          { wer:'spikiu', z:'Sure, hop in. Where to?', na:{ de:'Klar, steigen Sie ein. Wohin?', es:'Claro, suba. ¿Adónde?', el:'Βεβαίως, μπείτε. Πού πάμε;' } },
          { wer:'lerner', z:'To the airport, please.', na:{ de:'Zum Flughafen, bitte.', es:'Al aeropuerto, por favor.', el:'Στο αεροδρόμιο, παρακαλώ.' } },
          { wer:'spikiu', z:'Got it. Any bags?', na:{ de:'Alles klar. Haben Sie Gepäck?', es:'Muy bien. ¿Lleva equipaje?', el:'Εντάξει. Έχετε αποσκευές;' } },
          { wer:'lerner', z:'Yes, one suitcase.', na:{ de:'Ja, einen Koffer.', es:'Sí, una maleta.', el:'Ναι, μία βαλίτσα.' } }
        ]
      },
      lesetext: {
        z:'It\'s evening. A man waves down a cab. He\'s going to the airport and has one suitcase. The ride costs twenty-eight dollars. The driver wishes him a safe flight.',
        na:{ de:'Es ist Abend. Ein Mann winkt ein Taxi heran. Er will zum Flughafen und hat einen Koffer. Die Fahrt kostet achtundzwanzig Dollar. Der Fahrer wünscht ihm einen guten Flug.', es:'Es de noche. Un hombre para un taxi. Va al aeropuerto y lleva una maleta. El viaje cuesta veintiocho dólares. El taxista le desea un buen vuelo.', el:'Είναι βράδυ. Ένας άντρας σταματάει ένα ταξί. Πάει στο αεροδρόμιο και έχει μια βαλίτσα. Η διαδρομή κοστίζει είκοσι οκτώ δολάρια. Ο ταξιτζής του εύχεται καλή πτήση.' },
        frage:{ de:'Was hat der Mann dabei?', es:'¿Qué lleva el hombre?', el:'Τι έχει μαζί του ο άντρας;' },
        optionen:[
          { na:{ de:'Einen Koffer', es:'Una maleta', el:'Μια βαλίτσα' }, richtig:true },
          { na:{ de:'Zwei Taschen', es:'Dos bolsas', el:'Δύο τσάντες' }, richtig:false },
          { na:{ de:'Nichts', es:'Nada', el:'Τίποτα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, ob das Taxi frei ist, und nenne dein Ziel. Zwei Sätze.', es:'Pregunta si el taxi está libre y di adónde vas. Dos frases.', el:'Ρώτα αν το ταξί είναι ελεύθερο και πες πού πας. Δύο προτάσεις.' },
        muster:'Are you free? To the station, please.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Englische Fragen brauchen ein Hilfswort vorn. Bei *sein* ist es das Verb selbst: **Are you** free? Bei allen anderen kommt **do**: **Do you have** a suitcase? Wer „Have you a suitcase?" sagt, klingt wie ein Buch von 1900.', es:'Las preguntas inglesas necesitan una palabra delante. Con *ser/estar* es el verbo mismo: **Are you** free? Con los demás verbos entra **do**: **Do you have** a suitcase? Decir „Have you a suitcase?" suena a libro antiguo.', el:'Οι αγγλικές ερωτήσεις χρειάζονται μια βοηθητική λέξη μπροστά. Με το *είμαι* είναι το ίδιο το ρήμα: **Are you** free? Με όλα τα άλλα ρήματα μπαίνει το **do**: **Do you have** a suitcase? Όποιος λέει «Have you a suitcase?» ακούγεται σαν παλιό βιβλίο.' },
        beispiele:[
          { z:'Are you free?', na:{ de:'Sind Sie frei?', es:'¿Está libre?', el:'Είστε ελεύθερος;' } },
          { z:'Do you have a suitcase?', na:{ de:'Haben Sie einen Koffer?', es:'¿Lleva maleta?', el:'Έχετε βαλίτσα;' } }
        ]
      }
    },

    'a1.wegbeschreibung': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du suchst den Marktplatz und bist zu Fuß unterwegs.', es:'Buscas la plaza del mercado y vas a pie.', en:'You\'re looking for the market square and you\'re on foot.', el:'Ψάχνεις την κεντρική πλατεία και είσαι με τα πόδια.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Are you looking for something?', na:{ de:'Suchen Sie etwas?', es:'¿Busca algo?', el:'Ψάχνετε κάτι;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'You\'re welcome. Enjoy your visit!', na:{ de:'Gern geschehen. Schönen Aufenthalt!', es:'De nada. ¡Que disfrute su visita!', el:'Παρακαλώ. Καλή περιήγηση!' } },
      wortschatz: [
        { z:'straight', na:{ de:'geradeaus', es:'todo recto', el:'ευθεία' } },
        { z:'left', na:{ de:'links', es:'a la izquierda', el:'αριστερά' } },
        { z:'right', na:{ de:'rechts', es:'a la derecha', el:'δεξιά' } },
        { z:'a block', na:{ de:'ein Häuserblock', es:'una manzana', el:'ένα τετράγωνο' } },
        { z:'the corner', na:{ de:'die Ecke', es:'la esquina', el:'η γωνία' } },
        { z:'the traffic light', na:{ de:'die Ampel', es:'el semáforo', el:'το φανάρι' } },
        { z:'the crosswalk', na:{ de:'der Zebrastreifen', es:'el paso de cebra', el:'η διάβαση πεζών' } },
        { z:'to walk', na:{ de:'zu Fuß gehen', es:'ir a pie', el:'περπατάω' } },
        { z:'across from', na:{ de:'gegenüber', es:'enfrente de', el:'απέναντι από' } },
        { z:'next to', na:{ de:'neben', es:'al lado de', el:'δίπλα σε' } },
        { z:'far', na:{ de:'weit', es:'lejos', el:'μακριά' } },
        { z:'nearby', na:{ de:'in der Nähe', es:'cerca', el:'κοντά' } }
      ],
      dialog: {
        rolle: { de:'ein Passant', es:'un transeúnte', el:'ένας περαστικός' },
        zeilen: [
          { wer:'spikiu', z:'Are you looking for something?', na:{ de:'Suchen Sie etwas?', es:'¿Busca algo?', el:'Ψάχνετε κάτι;' } },
          { wer:'lerner', z:'Excuse me, where\'s Market Square?', na:{ de:'Entschuldigung, wo ist der Marktplatz?', es:'Perdone, ¿dónde está la plaza del mercado?', el:'Συγγνώμη, πού είναι η κεντρική πλατεία;' } },
          { wer:'spikiu', z:'Go straight for two blocks, then turn left.', na:{ de:'Gehen Sie zwei Straßen geradeaus, dann links.', es:'Siga dos calles y luego gire a la izquierda.', el:'Πηγαίνετε ευθεία δύο τετράγωνα και μετά στρίψτε αριστερά.' } },
          { wer:'lerner', z:'Is it far?', na:{ de:'Ist das weit?', es:'¿Está lejos?', el:'Είναι μακριά;' } },
          { wer:'spikiu', z:'No, about a five-minute walk.', na:{ de:'Nein, etwa fünf Minuten zu Fuß.', es:'No, unos cinco minutos a pie.', el:'Όχι, περίπου πέντε λεπτά με τα πόδια.' } },
          { wer:'lerner', z:'Thank you so much!', na:{ de:'Vielen Dank!', es:'¡Muchas gracias!', el:'Ευχαριστώ πολύ!' } }
        ]
      },
      lesetext: {
        z:'A woman is looking for Market Square. A passer-by tells her to go straight for two blocks and then turn left. It is about a five-minute walk.',
        na:{ de:'Eine Frau sucht den Marktplatz. Ein Passant sagt ihr, sie soll zwei Straßen geradeaus gehen und dann links abbiegen. Es sind etwa fünf Minuten zu Fuß.', es:'Una mujer busca la plaza del mercado. Un transeúnte le dice que siga dos calles y luego gire a la izquierda. Son unos cinco minutos a pie.', el:'Μια γυναίκα ψάχνει την κεντρική πλατεία. Ένας περαστικός της λέει να πάει ευθεία δύο τετράγωνα και μετά να στρίψει αριστερά. Είναι περίπου πέντε λεπτά με τα πόδια.' },
        frage:{ de:'Wie weit ist es?', es:'¿A qué distancia está?', el:'Πόσο μακριά είναι;' },
        optionen:[
          { na:{ de:'Etwa fünf Minuten', es:'Unos cinco minutos', el:'Περίπου πέντε λεπτά' }, richtig:true },
          { na:{ de:'Eine halbe Stunde', es:'Media hora', el:'Μισή ώρα' }, richtig:false },
          { na:{ de:'Zwei Stunden', es:'Dos horas', el:'Δύο ώρες' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, wo der Bahnhof ist, und ob es weit ist. Zwei Sätze.', es:'Pregunta dónde está la estación y si está lejos. Dos frases.', el:'Ρώτα πού είναι ο σταθμός και αν είναι μακριά. Δύο προτάσεις.' },
        muster:'Excuse me, where\'s the station? Is it far?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'**A block** ist die amerikanische Entfernung: von einer Querstraße zur nächsten. „Two blocks" heißt also zwei Querstraßen weiter, nicht zwei Häuserblöcke. In England sagt man das nicht — dort heißt es „two streets".', es:'**A block** es la distancia americana: de una bocacalle a la siguiente. „Two blocks" son dos calles más allá: en España decimos „a dos calles" (lo que en Latinoamérica llaman „cuadra"). En Inglaterra no se usa; allí dicen „two streets".', el:'**A block** είναι η αμερικανική απόσταση: από μια κάθετη οδό ως την επόμενη. «Two blocks» σημαίνει λοιπόν δύο τετράγωνα πιο κάτω. Στην Αγγλία δεν το λένε έτσι — εκεί λένε «two streets».' },
        beispiele:[
          { z:'Go two blocks.', na:{ de:'Gehen Sie zwei Straßen weiter.', es:'Siga dos calles.', el:'Πηγαίνετε δύο τετράγωνα.' } },
          { z:'It is three blocks from here.', na:{ de:'Es sind drei Straßen von hier.', es:'Está a tres calles de aquí.', el:'Είναι τρία τετράγωνα από εδώ.' } }
        ]
      }
    },

    'a1.wetter': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen
         — etwa das 'ich verstehe dich nicht' der Szene. Ohne dieses Feld
         siezte Spikiu mitten in einem Du-Gespraech (Leo, 31.08.). */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Heute scheint die Sonne. Morgen soll es regnen.', es:'Hoy hace sol. Mañana dicen que va a llover.', en:'The sun is out today. Tomorrow it\'s supposed to rain.', el:'Σήμερα έχει ήλιο. Αύριο λένε ότι θα βρέξει.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'See you! Stay dry out there.', na:{ de:'Bis dann! Bleib trocken.', es:'¡Hasta luego! Que no te mojes.', el:'Τα λέμε! Μη βραχείς.' } },
      wortschatz: [
        { z:'the sun', na:{ de:'die Sonne', es:'el sol', el:'ο ήλιος' } },
        { z:'the rain', na:{ de:'der Regen', es:'la lluvia', el:'η βροχή' } },
        { z:'snow', na:{ de:'der Schnee', es:'la nieve', el:'το χιόνι' } },
        { z:'the wind', na:{ de:'der Wind', es:'el viento', el:'ο αέρας' } },
        { z:'warm', na:{ de:'warm', es:'cálido', el:'ζεστός' } },
        { z:'cold', na:{ de:'kalt', es:'frío', el:'κρύος' } },
        { z:'sunny', na:{ de:'sonnig', es:'soleado', el:'ηλιόλουστος' } },
        { z:'to rain', na:{ de:'regnen', es:'llover', el:'βρέχει' } },
        { z:'an umbrella', na:{ de:'der Schirm', es:'el paraguas', el:'η ομπρέλα' } },
        { z:'a cloud', na:{ de:'die Wolke', es:'la nube', el:'το σύννεφο' } },
        { z:'it\'s supposed to', na:{ de:'es soll', es:'dicen que va a', el:'λένε ότι θα…' } },
        { z:'freezing', na:{ de:'eiskalt', es:'helado', el:'παγωμένος' } }
      ],
      dialog: {
        rolle: { de:'ein Kollege', es:'un compañero de trabajo', el:'ένας συνάδελφος' },
        zeilen: [
          { wer:'spikiu', z:'Beautiful day, huh?', na:{ de:'Schöner Tag heute, was?', es:'Qué buen día, ¿no?', el:'Ωραία μέρα, ε;' } },
          { wer:'lerner', z:'Yes, it\'s sunny and warm.', na:{ de:'Ja, die Sonne scheint und es ist warm.', es:'Sí, hace sol y calor.', el:'Ναι, έχει ήλιο και κάνει ζέστη.' } },
          { wer:'spikiu', z:'What about tomorrow? Any idea?', na:{ de:'Und morgen? Weißt du das schon?', es:'¿Y mañana? ¿Ya lo sabes?', el:'Κι αύριο; Ξέρεις;' } },
          { wer:'lerner', z:'It\'s supposed to rain tomorrow.', na:{ de:'Morgen soll es regnen.', es:'Dicen que mañana llueve.', el:'Αύριο λένε ότι θα βρέξει.' } },
          { wer:'spikiu', z:'Then I\'ll bring an umbrella.', na:{ de:'Dann nehme ich einen Schirm mit.', es:'Entonces me llevo el paraguas.', el:'Τότε θα πάρω ομπρέλα.' } },
          { wer:'lerner', z:'Good idea. See you tomorrow!', na:{ de:'Gute Idee. Bis morgen!', es:'Buena idea. ¡Hasta mañana!', el:'Καλή ιδέα. Τα λέμε αύριο!' } }
        ]
      },
      lesetext: {
        z:'Today the sun is shining and it\'s warm. Tomorrow it\'s supposed to rain, so a coworker is bringing an umbrella. They\'ll see each other again tomorrow.',
        na:{ de:'Heute scheint die Sonne und es ist warm. Morgen soll es regnen, deshalb nimmt ein Kollege einen Schirm mit. Morgen sehen sie sich wieder.', es:'Hoy hace sol y calor. Mañana dicen que va a llover, así que un compañero se lleva un paraguas. Mañana se vuelven a ver.', el:'Σήμερα έχει ήλιο και κάνει ζέστη. Αύριο λένε ότι θα βρέξει, γι’ αυτό ένας συνάδελφος θα πάρει ομπρέλα. Αύριο θα ξαναβρεθούν.' },
        frage:{ de:'Wie ist das Wetter heute?', es:'¿Qué tiempo hace hoy?', el:'Τι καιρό κάνει σήμερα;' },
        optionen:[
          { na:{ de:'Sonnig und warm', es:'Soleado y cálido', el:'Ηλιόλουστο και ζεστό' }, richtig:true },
          { na:{ de:'Regnerisch', es:'Lluvioso', el:'Βροχερό' }, richtig:false },
          { na:{ de:'Kalt', es:'Frío', el:'Κρύο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, wie das Wetter heute ist und wie es morgen wird. Zwei Sätze.', es:'Di qué tiempo hace hoy y qué tiempo hará mañana. Dos frases.', el:'Πες τι καιρό κάνει σήμερα και τι καιρό θα κάνει αύριο. Δύο προτάσεις.' },
        muster:'It\'s sunny and warm today. Tomorrow it\'s supposed to rain.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Englisch braucht beim Wetter immer ein **it**, das niemand ist: **it\'s** raining, **it\'s** cold, **it\'s** sunny. Genau wie das deutsche „es" in „es regnet" — hier sind sich die beiden Sprachen einmal einig.', es:'El inglés necesita siempre un **it** delante, que no es nadie: **it\'s** raining, **it\'s** cold, **it\'s** sunny. El español dice simplemente „llueve"; en inglés ese *it* no se puede quitar nunca.', el:'Στα αγγλικά ο καιρός θέλει πάντα ένα **it** μπροστά, που δεν είναι κανείς: **it\'s** raining, **it\'s** cold, **it\'s** sunny. Τα ελληνικά λένε απλώς «βρέχει»· στα αγγλικά αυτό το *it* δεν φεύγει ποτέ.' },
        beispiele:[
          { z:'It\'s raining.', na:{ de:'Es regnet.', es:'Llueve.', el:'Βρέχει.' } },
          { z:'It\'s cold today.', na:{ de:'Heute ist es kalt.', es:'Hoy hace frío.', el:'Σήμερα κάνει κρύο.' } }
        ]
      }
    },

    'a2.arzt': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du bist letzte Woche gestürzt. Du nimmst Schmerztabletten und bist gegen Penizillin allergisch.', es:'Te caíste la semana pasada. Tomas analgésicos y eres alérgico a la penicilina.', en:'You fell last week. You take painkillers and you\'re allergic to penicillin.', el:'Έπεσες την περασμένη εβδομάδα. Παίρνεις παυσίπονα και είσαι αλλεργικός στην πενικιλίνη.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Yes — come back Thursday. I\'ll write you a referral to a specialist.', na:{ de:'Ja, kommen Sie Donnerstag wieder. Ich schreibe Ihnen eine Überweisung zum Facharzt.', es:'Sí, vuelva el jueves. Le hago un volante para el especialista.', el:'Ναι — ελάτε ξανά την Πέμπτη. Θα σας γράψω παραπεμπτικό για ειδικό.' } },
      wortschatz: [
        { z:'to fall', na:{ de:'stürzen', es:'caerse', el:'πέφτω' } },
        { z:'to get worse', na:{ de:'schlimmer werden', es:'empeorar', el:'χειροτερεύω' } },
        { z:'the shoulder', na:{ de:'die Schulter', es:'el hombro', el:'ο ώμος' } },
        { z:'painkillers', na:{ de:'die Schmerztabletten', es:'los analgésicos', el:'τα παυσίπονα' } },
        { z:'allergic', na:{ de:'allergisch', es:'alérgico', el:'αλλεργικός' } },
        { z:'an X-ray', na:{ de:'das Röntgenbild', es:'la radiografía', el:'η ακτινογραφία' } },
        { z:'the appointment', na:{ de:'der Termin', es:'la cita', el:'το ραντεβού' } },
        { z:'a referral', na:{ de:'die Überweisung', es:'el volante', el:'το παραπεμπτικό' } },
        { z:'a specialist', na:{ de:'der Facharzt', es:'el especialista', el:'ο ειδικός γιατρός' } },
        { z:'the waiting room', na:{ de:'das Wartezimmer', es:'la sala de espera', el:'η αίθουσα αναμονής' } },
        { z:'to treat', na:{ de:'behandeln', es:'tratar', el:'θεραπεύω' } },
        { z:'to go from there', na:{ de:'weitersehen', es:'a partir de ahí, ya veremos', el:'βλέπουμε στην πορεία' } }
      ],
      dialog: {
        rolle: { de:'der Arzt', es:'el médico', el:'ο γιατρός' },
        zeilen: [
          { wer:'spikiu', z:'Have a seat. So what happened?', na:{ de:'Setzen Sie sich. Was ist denn passiert?', es:'Siéntese. ¿Qué le ha pasado?', el:'Καθίστε. Λοιπόν, τι έγινε;' } },
          { wer:'lerner', z:'I fell last week, and my shoulder\'s gotten worse.', na:{ de:'Ich bin letzte Woche gestürzt, und die Schulter ist schlimmer geworden.', es:'Me caí la semana pasada y el hombro ha empeorado.', el:'Έπεσα την περασμένη εβδομάδα και ο ώμος μου χειροτέρεψε.' } },
          { wer:'spikiu', z:'Anything you\'re taking right now?', na:{ de:'Nehmen Sie zurzeit Medikamente?', es:'¿Toma alguna medicina ahora?', el:'Παίρνετε κάτι αυτή τη στιγμή;' } },
          { wer:'lerner', z:'Just painkillers. I\'m allergic to penicillin.', na:{ de:'Nur Schmerztabletten. Gegen Penizillin bin ich allergisch.', es:'Solo analgésicos. Soy alérgico a la penicilina.', el:'Μόνο παυσίπονα. Είμαι αλλεργική στην πενικιλίνη.' } },
          { wer:'spikiu', z:'Noted. Let\'s get an X-ray and go from there.', na:{ de:'Notiert. Machen wir ein Röntgenbild und sehen weiter.', es:'Lo apunto. Vamos a hacer una radiografía y ya veremos.', el:'Το σημείωσα. Ας κάνουμε μια ακτινογραφία και βλέπουμε.' } },
          { wer:'lerner', z:'Okay. Do I need another appointment?', na:{ de:'In Ordnung. Brauche ich noch einen Termin?', es:'De acuerdo. ¿Necesito otra cita?', el:'Εντάξει. Χρειάζομαι κι άλλο ραντεβού;' } }
        ]
      },
      lesetext: {
        z:'A patient fell last week and her shoulder has gotten worse. She only takes painkillers and is allergic to penicillin. The doctor orders an X-ray and asks her to come back Thursday with a referral to a specialist.',
        na:{ de:'Eine Patientin ist letzte Woche gestürzt, und die Schulter ist schlimmer geworden. Sie nimmt nur Schmerztabletten und ist gegen Penizillin allergisch. Der Arzt ordnet ein Röntgenbild an und bittet sie, am Donnerstag mit einer Überweisung zum Facharzt wiederzukommen.', es:'Una paciente se cayó la semana pasada y el hombro ha empeorado. Solo toma analgésicos y es alérgica a la penicilina. El médico pide una radiografía y le dice que vuelva el jueves con un volante para el especialista.', el:'Μια ασθενής έπεσε την περασμένη εβδομάδα και ο ώμος της χειροτέρεψε. Παίρνει μόνο παυσίπονα και είναι αλλεργική στην πενικιλίνη. Ο γιατρός ζητάει ακτινογραφία και της λέει να ξανάρθει την Πέμπτη με παραπεμπτικό για ειδικό.' },
        frage:{ de:'Wogegen ist sie allergisch?', es:'¿A qué es alérgica?', el:'Σε τι είναι αλλεργική;' },
        optionen:[
          { na:{ de:'Gegen Penizillin', es:'A la penicilina', el:'Στην πενικιλίνη' }, richtig:true },
          { na:{ de:'Gegen Schmerztabletten', es:'A los analgésicos', el:'Στα παυσίπονα' }, richtig:false },
          { na:{ de:'Gegen Nüsse', es:'A los frutos secos', el:'Στους ξηρούς καρπούς' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, was passiert ist, und nenne deine Allergie. Zwei Sätze.', es:'Cuenta qué te pasó y di a qué eres alérgico. Dos frases.', el:'Πες τι σου συνέβη και σε τι είσαι αλλεργικός. Δύο προτάσεις.' },
        muster:'I fell yesterday and my knee hurts. I\'m allergic to penicillin.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'**It got worse** heißt: es wurde schlimmer, Punkt, vorbei. **It has gotten worse** heißt: und es ist immer noch so — deshalb sitze ich hier. Beim Arzt braucht man fast immer die zweite Form, weil das Problem ja andauert.', es:'**It got worse** significa: empeoró, y punto. **It has gotten worse** significa: y sigue así — por eso estoy aquí. En la consulta casi siempre hace falta la segunda forma, porque el problema continúa.', el:'**It got worse** σημαίνει: χειροτέρεψε, και τελεία. **It has gotten worse** σημαίνει: και είναι ακόμα έτσι — γι’ αυτό είμαι εδώ. Στον γιατρό χρειάζεσαι σχεδόν πάντα τη δεύτερη μορφή, γιατί το πρόβλημα συνεχίζεται.' },
        beispiele:[
          { z:'It has gotten worse.', na:{ de:'Es ist schlimmer geworden.', es:'Ha empeorado.', el:'Έχει χειροτερέψει.' } },
          { z:'I\'ve had it since Monday.', na:{ de:'Ich habe es seit Montag.', es:'Lo tengo desde el lunes.', el:'Το έχω από τη Δευτέρα.' } }
        ]
      }
    },

    'a2.bahnhof': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Dein Zug hat zwanzig Minuten Verspätung. In Albany musst du um Viertel nach drei umsteigen.', es:'Tu tren lleva veinte minutos de retraso. En Albany tienes el transbordo a las tres y cuarto.', en:'Your train is twenty minutes late. You change in Albany at quarter past three.', el:'Το τρένο σου έχει είκοσι λεπτά καθυστέρηση. Στο Όλμπανι αλλάζεις τρένο στις τρεις και τέταρτο.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Next. What can I do for you?', na:{ de:'Der Nächste bitte. Was kann ich für Sie tun?', es:'El siguiente. ¿En qué le ayudo?', el:'Ο επόμενος. Τι μπορώ να κάνω για εσάς;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Then your ticket\'s good on the next one — no rebooking fee. Safe travels!', na:{ de:'Dann gilt Ihre Fahrkarte im nächsten Zug, ohne Umbuchungsgebühr. Gute Fahrt!', es:'Entonces su billete vale para el siguiente, sin cargo por cambio. ¡Buen viaje!', el:'Τότε το εισιτήριό σας ισχύει για το επόμενο — χωρίς χρέωση αλλαγής. Καλό ταξίδι!' } },
      wortschatz: [
        { z:'to run late', na:{ de:'Verspätung haben', es:'llevar retraso', el:'έχω καθυστέρηση' } },
        { z:'to transfer', na:{ de:'umsteigen', es:'hacer transbordo', el:'αλλάζω τρένο' } },
        { z:'the connection', na:{ de:'der Anschluss', es:'el enlace', el:'η ανταπόκριση' } },
        { z:'to miss', na:{ de:'verpassen', es:'perder', el:'χάνω' } },
        { z:'the ticket', na:{ de:'die Fahrkarte', es:'el billete', el:'το εισιτήριο' } },
        { z:'the track', na:{ de:'das Gleis', es:'el andén', el:'η αποβάθρα' } },
        { z:'the counter', na:{ de:'der Schalter', es:'la ventanilla', el:'το γκισέ' } },
        { z:'a rebooking fee', na:{ de:'die Umbuchungsgebühr', es:'el cargo por cambio', el:'η χρέωση αλλαγής εισιτηρίου' } },
        { z:'refunded', na:{ de:'erstattet', es:'reembolsado', el:'επιστρέφεται' } },
        { z:'tight', na:{ de:'knapp', es:'justo', el:'στο τσακ' } },
        { z:'roughly', na:{ de:'ungefähr', es:'aproximadamente', el:'περίπου' } },
        { z:'to hold', na:{ de:'warten', es:'esperar', el:'περιμένω' } }
      ],
      dialog: {
        rolle: { de:'der Serviceberater', es:'el empleado de información', el:'ο υπάλληλος εξυπηρέτησης' },
        zeilen: [
          { wer:'spikiu', z:'Next. What can I do for you?', na:{ de:'Der Nächste bitte. Was kann ich für Sie tun?', es:'El siguiente. ¿En qué le ayudo?', el:'Ο επόμενος. Τι μπορώ να κάνω για εσάς;' } },
          { wer:'lerner', z:'My train\'s running twenty minutes late.', na:{ de:'Mein Zug hat zwanzig Minuten Verspätung.', es:'Mi tren lleva veinte minutos de retraso.', el:'Το τρένο μου έχει είκοσι λεπτά καθυστέρηση.' } },
          { wer:'spikiu', z:'Sorry about that. When\'s your connection?', na:{ de:'Das tut mir leid. Wann müssen Sie umsteigen?', es:'Lo siento. ¿A qué hora tiene el transbordo?', el:'Λυπάμαι γι’ αυτό. Πότε είναι η ανταπόκρισή σας;' } },
          { wer:'lerner', z:'In Albany, at quarter past three.', na:{ de:'In Albany, um Viertel nach drei.', es:'En Albany, a las tres y cuarto.', el:'Στο Όλμπανι, στις τρεις και τέταρτο.' } },
          { wer:'spikiu', z:'That\'s tight. The connection won\'t hold for you.', na:{ de:'Das wird knapp. Der Anschluss wartet nicht.', es:'Va justo. El enlace no espera.', el:'Είναι στο τσακ. Η ανταπόκριση δεν θα σας περιμένει.' } },
          { wer:'lerner', z:'And if I miss it?', na:{ de:'Und wenn ich ihn verpasse?', es:'¿Y si lo pierdo?', el:'Κι αν τη χάσω;' } }
        ]
      },
      lesetext: {
        z:'A traveller\'s train is running twenty minutes late. His connection in Albany is at quarter past three, which will be tight — and the connection won\'t hold. If he misses it, his ticket is good on the next train, with no rebooking fee.',
        na:{ de:'Der Zug eines Reisenden hat zwanzig Minuten Verspätung. Sein Anschluss in Albany ist um Viertel nach drei, das wird knapp — und der Anschluss wartet nicht. Wenn er ihn verpasst, gilt seine Fahrkarte im nächsten Zug, ohne Umbuchungsgebühr.', es:'El tren de un viajero lleva veinte minutos de retraso. Su enlace en Albany es a las tres y cuarto, va justo, y el enlace no espera. Si lo pierde, su billete vale para el siguiente tren, sin cargo por cambio.', el:'Το τρένο ενός ταξιδιώτη έχει είκοσι λεπτά καθυστέρηση. Η ανταπόκρισή του στο Όλμπανι είναι στις τρεις και τέταρτο, είναι στο τσακ — και η ανταπόκριση δεν περιμένει. Αν τη χάσει, το εισιτήριό του ισχύει για το επόμενο τρένο, χωρίς χρέωση αλλαγής.' },
        frage:{ de:'Was passiert, wenn er den Anschluss verpasst?', es:'¿Qué pasa si pierde el enlace?', el:'Τι γίνεται αν χάσει την ανταπόκριση;' },
        optionen:[
          { na:{ de:'Die Fahrkarte gilt im nächsten Zug', es:'Su billete vale para el siguiente', el:'Το εισιτήριο ισχύει για το επόμενο τρένο' }, richtig:true },
          { na:{ de:'Er zahlt eine Gebühr', es:'Paga un cargo', el:'Πληρώνει μια χρέωση' }, richtig:false },
          { na:{ de:'Er bekommt Geld zurück', es:'Le devuelven el dinero', el:'Του επιστρέφουν τα χρήματα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass dein Zug Verspätung hat, und frag, was passiert, wenn du den Anschluss verpasst. Zwei Sätze.', es:'Di que tu tren lleva retraso y pregunta qué pasa si pierdes el enlace. Dos frases.', el:'Πες ότι το τρένο σου έχει καθυστέρηση και ρώτα τι γίνεται αν χάσεις την ανταπόκριση. Δύο προτάσεις.' },
        muster:'My train\'s running half an hour late. What happens if I miss my connection?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Für Verspätung sagt niemand „my train has delay". Die Formel ist **my train is running late** — *running* für alles, was gerade läuft und nicht nach Plan. Und **the connection won\'t hold**: *hold* heißt hier warten, nicht halten.', es:'Para el retraso nadie dice „my train has delay". La fórmula es **my train is running late** — *running* para todo lo que va en marcha y fuera de plan. Y **the connection won\'t hold**: aquí *hold* significa esperar, no sujetar.', el:'Για την καθυστέρηση κανείς δεν λέει «my train has delay». Η φράση είναι **my train is running late** — *running* για ό,τι βρίσκεται σε εξέλιξη και εκτός προγράμματος. Και **the connection won\'t hold**: εδώ *hold* σημαίνει περιμένω, όχι κρατάω.' },
        beispiele:[
          { z:'My train\'s running late.', na:{ de:'Mein Zug hat Verspätung.', es:'Mi tren lleva retraso.', el:'Το τρένο μου έχει καθυστέρηση.' } },
          { z:'The connection won\'t hold.', na:{ de:'Der Anschluss wartet nicht.', es:'El enlace no espera.', el:'Η ανταπόκριση δεν περιμένει.' } }
        ]
      }
    },

    'a2.cafe': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Dein Kaffee ist kalt. Und du bist allergisch gegen Nüsse.', es:'Tu café está frío. Y eres alérgico a los frutos secos.', en:'Your coffee is cold. And you\'re allergic to nuts.', el:'Ο καφές σου είναι κρύος. Και είσαι αλλεργικός στους ξηρούς καρπούς.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'How\'s everything over here?', na:{ de:'Alles in Ordnung bei Ihnen?', es:'¿Qué tal todo por aquí?', el:'Όλα καλά εδώ;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Good call. I\'ll bring them out together.', na:{ de:'Gute Wahl. Ich bringe Ihnen beides zusammen.', es:'Buena elección. Le traigo las dos cosas juntas.', el:'Καλή επιλογή. Θα σας τα φέρω μαζί.' } },
      wortschatz: [
        { z:'cold', na:{ de:'kalt', es:'frío', el:'κρύος' } },
        { z:'lukewarm', na:{ de:'lauwarm', es:'tibio', el:'χλιαρός' } },
        { z:'sorry to bother you', na:{ de:'entschuldigen Sie die Störung', es:'disculpe la molestia', el:'συγγνώμη για την ενόχληση' } },
        { z:'nuts', na:{ de:'die Nüsse', es:'los frutos secos', el:'οι ξηροί καρποί' } },
        { z:'allergic', na:{ de:'allergisch', es:'alérgico', el:'αλλεργικός' } },
        { z:'the ingredients', na:{ de:'die Zutaten', es:'los ingredientes', el:'τα υλικά' } },
        { z:'to swap', na:{ de:'umtauschen', es:'cambiar', el:'αλλάζω (κάτι με κάτι άλλο)' } },
        { z:'though', na:{ de:'allerdings', es:'aunque', el:'όμως' } },
        { z:'fresh', na:{ de:'frisch', es:'fresco', el:'φρέσκος' } },
        { z:'actually', na:{ de:'eigentlich', es:'en realidad', el:'στην πραγματικότητα' } },
        { z:'a refill', na:{ de:'die kostenlose Nachfüllung', es:'volver a llenar la taza gratis', el:'το δωρεάν ξαναγέμισμα' } },
        { z:'to double-check', na:{ de:'nochmal nachsehen', es:'volver a comprobar', el:'ξαναελέγχω' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero', el:'ο σερβιτόρος' },
        zeilen: [
          { wer:'spikiu', z:'How\'s everything over here?', na:{ de:'Alles in Ordnung bei Ihnen?', es:'¿Qué tal todo por aquí?', el:'Όλα καλά εδώ;' } },
          { wer:'lerner', z:'Sorry to bother you, but the coffee\'s cold.', na:{ de:'Entschuldigung, der Kaffee ist leider kalt.', es:'Disculpe la molestia, el café está frío.', el:'Συγγνώμη για την ενόχληση, αλλά ο καφές είναι κρύος.' } },
          { wer:'spikiu', z:'Oh, I\'m so sorry. I\'ll get you a fresh one right away.', na:{ de:'Das tut mir leid, ich bringe Ihnen sofort einen neuen.', es:'Lo siento mucho. Ahora mismo le traigo otro.', el:'Ω, λυπάμαι πολύ. Σας φέρνω αμέσως καινούριο.' } },
          { wer:'lerner', z:'Thanks. Also — does the cake have nuts in it?', na:{ de:'Danke. Und noch etwas: sind in dem Kuchen Nüsse?', es:'Gracias. Y otra cosa: ¿la tarta lleva frutos secos?', el:'Ευχαριστώ. Και κάτι ακόμα — το κέικ έχει ξηρούς καρπούς;' } },
          { wer:'spikiu', z:'That one does. The lemon cake doesn\'t, though.', na:{ de:'In dem schon. Der Zitronenkuchen aber nicht.', es:'En esa sí. Pero la de limón no lleva.', el:'Αυτό εδώ ναι. Το κέικ λεμονιού όμως όχι.' } },
          { wer:'lerner', z:'I\'ll take the lemon one — I\'m allergic.', na:{ de:'Dann den Zitronenkuchen, ich bin nämlich allergisch.', es:'Entonces la de limón, es que soy alérgico.', el:'Θα πάρω το λεμονιού — είμαι αλλεργική.' } }
        ]
      },
      lesetext: {
        z:'A customer tells the server the coffee is cold. The server apologises and brings a fresh one. The customer also asks about nuts in the cake, because she\'s allergic. The lemon cake is nut-free, so she takes that one.',
        na:{ de:'Eine Kundin sagt dem Kellner, der Kaffee sei kalt. Er entschuldigt sich und bringt einen neuen. Sie fragt außerdem nach Nüssen im Kuchen, weil sie allergisch ist. Der Zitronenkuchen ist nussfrei, also nimmt sie den.', es:'Una clienta le dice al camarero que el café está frío. Él se disculpa y trae otro. Además pregunta si la tarta lleva frutos secos, porque es alérgica. La de limón no lleva, así que se lleva esa.', el:'Μια πελάτισσα λέει στον σερβιτόρο ότι ο καφές είναι κρύος. Εκείνος ζητάει συγγνώμη και φέρνει καινούριο. Εκείνη ρωτάει επίσης αν το κέικ έχει ξηρούς καρπούς, γιατί είναι αλλεργική. Το κέικ λεμονιού δεν έχει, οπότε παίρνει αυτό.' },
        frage:{ de:'Warum nimmt sie den Zitronenkuchen?', es:'¿Por qué elige la de limón?', el:'Γιατί παίρνει το κέικ λεμονιού;' },
        optionen:[
          { na:{ de:'Er ist ohne Nüsse', es:'No lleva frutos secos', el:'Δεν έχει ξηρούς καρπούς' }, richtig:true },
          { na:{ de:'Er ist billiger', es:'Es más barata', el:'Είναι φθηνότερο' }, richtig:false },
          { na:{ de:'Es ist der letzte', es:'Es la última', el:'Είναι το τελευταίο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag höflich, dass deine Suppe kalt ist, und frag, was darin ist. Zwei Sätze.', es:'Di con cortesía que tu sopa está fría y pregunta qué lleva. Dos frases.', el:'Πες ευγενικά ότι η σούπα σου είναι κρύα και ρώτα τι έχει μέσα. Δύο προτάσεις.' },
        muster:'Sorry to bother you, but the soup is cold. What is in it, actually?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Eine englische Beschwerde beginnt fast nie mit der Beschwerde. Vorn steht eine Formel: **Sorry to bother you, but…** oder **Excuse me, I think…** Das ist dieselbe Arbeit, die im Deutschen das Wörtchen *leider* macht — nur mit vier Wörtern statt einem.', es:'Una queja inglesa casi nunca empieza por la queja. Delante va una fórmula: **Sorry to bother you, but…** o **Excuse me, I think…** Es el mismo trabajo que hace „disculpe" en español, pero es obligatorio, no opcional.', el:'Ένα αγγλικό παράπονο σχεδόν ποτέ δεν ξεκινά με το παράπονο. Μπροστά μπαίνει μια φράση: **Sorry to bother you, but…** ή **Excuse me, I think…** Κάνει την ίδια δουλειά με το ελληνικό «συγγνώμη», μόνο που εδώ είναι υποχρεωτική, όχι προαιρετική.' },
        beispiele:[
          { z:'Sorry to bother you, but the coffee\'s cold.', na:{ de:'Entschuldigung, der Kaffee ist leider kalt.', es:'Disculpe, el café está frío.', el:'Συγγνώμη για την ενόχληση, αλλά ο καφές είναι κρύος.' } },
          { z:'Excuse me, I think there\'s a mistake.', na:{ de:'Entschuldigung, ich glaube, da ist ein Fehler.', es:'Perdone, creo que hay un error.', el:'Συγγνώμη, νομίζω ότι υπάρχει κάποιο λάθος.' } }
        ]
      }
    },

    'a2.einkaufen': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast gestern ein Hemd gekauft. Es ist dir zu groß, den Kassenbon hast du dabei.', es:'Ayer compraste una camisa. Te queda grande y llevas el ticket.', en:'You bought a shirt yesterday. It\'s too big and you have the receipt.', el:'Χθες αγόρασες ένα πουκάμισο. Σου είναι μεγάλο και έχεις την απόδειξη.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Hi there — what can I help you with?', na:{ de:'Guten Tag, womit kann ich Ihnen helfen?', es:'Hola, ¿en qué le puedo ayudar?', el:'Γεια σας — πώς μπορώ να σας βοηθήσω;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Go right ahead — fitting rooms are in the back. I\'ll grab your size.', na:{ de:'Nur zu, die Kabinen sind hinten. Ich hole Ihnen die Größe.', es:'Adelante, los probadores están al fondo. Le traigo la talla.', el:'Ελάτε — τα δοκιμαστήρια είναι στο βάθος. Σας φέρνω το νούμερό σας.' } },
      wortschatz: [
        { z:'a shirt', na:{ de:'das Hemd', es:'la camisa', el:'το πουκάμισο' } },
        { z:'the size', na:{ de:'die Größe', es:'la talla', el:'το μέγεθος / το νούμερο' } },
        { z:'too big', na:{ de:'zu groß', es:'demasiado grande', el:'πολύ μεγάλο' } },
        { z:'too small', na:{ de:'zu klein', es:'demasiado pequeño', el:'πολύ μικρό' } },
        { z:'the receipt', na:{ de:'der Kassenbon', es:'el ticket', el:'η απόδειξη' } },
        { z:'to exchange', na:{ de:'umtauschen', es:'cambiar', el:'αλλάζω' } },
        { z:'to return', na:{ de:'zurückgeben (Geld zurück)', es:'devolver (y recuperar el dinero)', el:'επιστρέφω (για επιστροφή χρημάτων)' } },
        { z:'to try on', na:{ de:'anprobieren', es:'probarse', el:'δοκιμάζω (ρούχο)' } },
        { z:'the fitting room', na:{ de:'die Umkleidekabine', es:'el probador', el:'το δοκιμαστήριο' } },
        { z:'to fit', na:{ de:'passen', es:'quedar bien', el:'μου κάνει' } },
        { z:'one size down', na:{ de:'eine Nummer kleiner', es:'una talla menos', el:'ένα νούμερο μικρότερο' } },
        { z:'on sale', na:{ de:'im Angebot', es:'en oferta', el:'σε προσφορά' } }
      ],
      dialog: {
        rolle: { de:'die Verkäuferin', es:'la vendedora', el:'η πωλήτρια' },
        zeilen: [
          { wer:'spikiu', z:'Hi there — what can I help you with?', na:{ de:'Guten Tag, womit kann ich Ihnen helfen?', es:'Hola, ¿en qué le puedo ayudar?', el:'Γεια σας — πώς μπορώ να σας βοηθήσω;' } },
          { wer:'lerner', z:'I bought this shirt yesterday, but it\'s too big on me.', na:{ de:'Ich habe dieses Hemd gestern gekauft, aber es ist mir zu groß.', es:'Compré esta camisa ayer, pero me queda grande.', el:'Αγόρασα αυτό το πουκάμισο χθες, αλλά μου είναι μεγάλο.' } },
          { wer:'spikiu', z:'No problem. Do you have the receipt?', na:{ de:'Kein Problem. Haben Sie den Kassenbon dabei?', es:'Sin problema. ¿Trae el ticket?', el:'Κανένα πρόβλημα. Έχετε την απόδειξη;' } },
          { wer:'lerner', z:'Yes, right here. Can I exchange it?', na:{ de:'Ja, hier. Kann ich es umtauschen?', es:'Sí, aquí está. ¿Puedo cambiarla?', el:'Ναι, ορίστε. Μπορώ να το αλλάξω;' } },
          { wer:'spikiu', z:'Of course. What size do you need?', na:{ de:'Selbstverständlich. Welche Größe brauchen Sie?', es:'Por supuesto. ¿Qué talla necesita?', el:'Φυσικά. Τι νούμερο χρειάζεστε;' } },
          { wer:'lerner', z:'One size down. Can I try it on?', na:{ de:'Eine kleiner. Darf ich es anprobieren?', es:'Una menos. ¿Me la puedo probar?', el:'Ένα νούμερο μικρότερο. Μπορώ να το δοκιμάσω;' } }
        ]
      },
      lesetext: {
        z:'A customer bought a shirt yesterday, but it\'s too big on her. She has the receipt, so she can exchange it. She needs one size down and asks to try it on. The fitting rooms are in the back.',
        na:{ de:'Eine Kundin hat gestern ein Hemd gekauft, aber es ist ihr zu groß. Sie hat den Kassenbon, also kann sie es umtauschen. Sie braucht eine Nummer kleiner und möchte es anprobieren. Die Umkleidekabinen sind hinten.', es:'Una clienta compró ayer una camisa, pero le queda grande. Tiene el ticket, así que puede cambiarla. Necesita una talla menos y pide probársela. Los probadores están al fondo.', el:'Μια πελάτισσα αγόρασε χθες ένα πουκάμισο, αλλά της είναι μεγάλο. Έχει την απόδειξη, οπότε μπορεί να το αλλάξει. Χρειάζεται ένα νούμερο μικρότερο και θέλει να το δοκιμάσει. Τα δοκιμαστήρια είναι στο βάθος.' },
        frage:{ de:'Was braucht sie?', es:'¿Qué necesita?', el:'Τι χρειάζεται;' },
        optionen:[
          { na:{ de:'Eine Nummer kleiner', es:'Una talla menos', el:'Ένα νούμερο μικρότερο' }, richtig:true },
          { na:{ de:'Eine andere Farbe', es:'Otro color', el:'Άλλο χρώμα' }, richtig:false },
          { na:{ de:'Ihr Geld zurück', es:'Que le devuelvan el dinero', el:'Να της επιστρέψουν τα χρήματα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass die Hose zu klein ist, und frag, ob du sie umtauschen kannst. Zwei Sätze.', es:'Di que el pantalón te queda pequeño y pregunta si puedes cambiarlo. Dos frases.', el:'Πες ότι το παντελόνι σού είναι μικρό και ρώτα αν μπορείς να το αλλάξεις. Δύο προτάσεις.' },
        muster:'These pants are a little too small on me. Can I exchange them?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'„It\'s too big" heißt: es ist zu groß, für jeden. **It\'s too big on me** heißt: mir ist es zu groß, jemand anderem vielleicht nicht. Dieses kleine **on me** benutzen Muttersprachler ständig, wenn es um Kleidung geht.', es:'„It\'s too big" significa: es grande, para cualquiera. **It\'s too big on me** significa: a mí me queda grande. Ese pequeño **on me** es exactamente el „me queda" español, y los nativos lo usan siempre con ropa.', el:'«It\'s too big» σημαίνει: είναι μεγάλο, για όλους. **It\'s too big on me** σημαίνει: σε μένα είναι μεγάλο — σε κάποιον άλλον ίσως όχι. Αυτό το μικρό **on me** είναι ακριβώς το ελληνικό «μου είναι», και οι φυσικοί ομιλητές το χρησιμοποιούν συνέχεια για ρούχα.' },
        beispiele:[
          { z:'It\'s too big on me.', na:{ de:'Es ist mir zu groß.', es:'Me queda grande.', el:'Μου είναι μεγάλο.' } },
          { z:'These fit me well.', na:{ de:'Die passen mir gut.', es:'Estos me quedan bien.', el:'Αυτά μου κάνουν καλά.' } }
        ]
      }
    },

    'a2.familie': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen
         — etwa das 'ich verstehe dich nicht' der Szene. Ohne dieses Feld
         siezte Spikiu mitten in einem Du-Gespraech (Leo, 31.08.). */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Als Kind hast du in einem kleinen Dorf gewohnt. Deine Schwester ist weggezogen.', es:'De niño vivías en un pueblo pequeño. Tu hermana se mudó.', en:'As a child you lived in a small village. Your sister has moved away.', el:'Όταν ήσουν παιδί, έμενες σε ένα μικρό χωριό. Η αδερφή σου μετακόμισε μακριά.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'I get that. You\'ll see her soon enough, I bet.', na:{ de:'Das kann ich verstehen. Ihr seht euch bestimmt bald wieder.', es:'Lo entiendo. Seguro que la ves pronto.', el:'Σε καταλαβαίνω. Στοιχηματίζω ότι θα τη δεις σύντομα.' } },
      wortschatz: [
        { z:'to grow up', na:{ de:'aufwachsen', es:'criarse', el:'μεγαλώνω' } },
        { z:'a small town', na:{ de:'der kleine Ort', es:'el pueblo pequeño', el:'η μικρή πόλη' } },
        { z:'to move away', na:{ de:'wegziehen', es:'mudarse', el:'μετακομίζω μακριά' } },
        { z:'to miss someone', na:{ de:'jemanden vermissen', es:'echar de menos a alguien', el:'μου λείπει κάποιος' } },
        { z:'to get together', na:{ de:'sich treffen', es:'reunirse', el:'μαζευόμαστε' } },
        { z:'an aunt', na:{ de:'die Tante', es:'la tía', el:'η θεία' } },
        { z:'an uncle', na:{ de:'der Onkel', es:'el tío', el:'ο θείος' } },
        { z:'a cousin', na:{ de:'der Cousin', es:'el primo', el:'ο ξάδερφος' } },
        { z:'back then', na:{ de:'damals', es:'en aquella época', el:'τότε' } },
        { z:'we\'d', na:{ de:'wir haben immer', es:'nosotros solíamos', el:'συνηθίζαμε να…' } },
        { z:'anyway', na:{ de:'übrigens', es:'por cierto', el:'τέλος πάντων / παρεμπιπτόντως' } },
        { z:'I bet', na:{ de:'ich wette', es:'seguro que', el:'στοιχηματίζω' } }
      ],
      dialog: {
        rolle: { de:'ein alter Freund', es:'un viejo amigo', el:'ένας παλιός φίλος' },
        zeilen: [
          { wer:'spikiu', z:'So where\'d you grow up, anyway?', na:{ de:'Wo hast du eigentlich als Kind gewohnt?', es:'¿Y dónde creciste tú, por cierto?', el:'Και πού μεγάλωσες, τελικά;' } },
          { wer:'lerner', z:'We lived in a small town.', na:{ de:'Wir haben in einem kleinen Ort gewohnt.', es:'Vivíamos en un pueblo pequeño.', el:'Μέναμε σε μια μικρή πόλη.' } },
          { wer:'spikiu', z:'Was the whole family out there?', na:{ de:'Und war die ganze Familie dort?', es:'¿Y estaba toda la familia allí?', el:'Ήταν όλη η οικογένεια εκεί;' } },
          { wer:'lerner', z:'Yeah. On Sundays we\'d all meet at my aunt\'s place.', na:{ de:'Ja. Sonntags haben wir uns alle bei meiner Tante getroffen.', es:'Sí. Los domingos nos reuníamos en casa de mi tía.', el:'Ναι. Τις Κυριακές μαζευόμασταν όλοι στης θείας μου.' } },
          { wer:'spikiu', z:'That\'s nice. Are they still around?', na:{ de:'Wie schön. Sind sie noch da?', es:'Qué bonito. ¿Siguen allí?', el:'Τι ωραία. Είναι ακόμα εκεί;' } },
          { wer:'lerner', z:'No, my sister moved away. I miss her.', na:{ de:'Nein, meine Schwester ist weggezogen. Ich vermisse sie.', es:'No, mi hermana se mudó. La echo de menos.', el:'Όχι, η αδερφή μου μετακόμισε μακριά. Μου λείπει.' } }
        ]
      },
      lesetext: {
        z:'Two old friends talk about growing up. He lived in a small town. On Sundays the whole family would meet at his aunt\'s place. His sister has moved away now, and he misses her.',
        na:{ de:'Zwei alte Freunde reden über früher. Er hat in einem kleinen Ort gewohnt. Sonntags hat sich die ganze Familie bei seiner Tante getroffen. Seine Schwester ist inzwischen weggezogen, und er vermisst sie.', es:'Dos viejos amigos hablan de su infancia. Él vivía en un pueblo pequeño. Los domingos toda la familia se reunía en casa de su tía. Su hermana se ha mudado y la echa de menos.', el:'Δύο παλιοί φίλοι μιλάνε για τα παλιά. Εκείνος έμενε σε μια μικρή πόλη. Τις Κυριακές όλη η οικογένεια μαζευόταν στης θείας του. Η αδερφή του έχει πια μετακομίσει και του λείπει.' },
        frage:{ de:'Was haben sie sonntags gemacht?', es:'¿Qué hacían los domingos?', el:'Τι έκαναν τις Κυριακές;' },
        optionen:[
          { na:{ de:'Sich bei der Tante getroffen', es:'Se reunían en casa de la tía', el:'Μαζεύονταν στης θείας' }, richtig:true },
          { na:{ de:'Gearbeitet', es:'Trabajaban', el:'Δούλευαν' }, richtig:false },
          { na:{ de:'Nichts Besonderes', es:'Nada especial', el:'Τίποτα ιδιαίτερο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, wo du aufgewachsen bist und was ihr sonntags gemacht habt. Zwei Sätze.', es:'Cuenta dónde creciste y qué hacíais los domingos. Dos frases.', el:'Πες πού μεγάλωσες και τι κάνατε τις Κυριακές. Δύο προτάσεις.' },
        muster:'I grew up in a small town. On Sundays we\'d visit my grandparents.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Für etwas, das früher regelmäßig geschah, sagt Englisch **we\'d meet** oder **we used to meet** — nicht einfach *we met*. Das *we\'d* ist hier keine Höflichkeit, sondern heißt: immer wieder, damals. Deutsch braucht dafür ein Wörtchen wie „immer" oder „sonntags".', es:'Para algo que pasaba habitualmente, el inglés dice **we\'d meet** o **we used to meet**, no simplemente *we met*. Es exactamente el imperfecto español („nos reuníamos"), que el inglés no tiene y resuelve así.', el:'Για κάτι που γινόταν συχνά παλιά, τα αγγλικά λένε **we\'d meet** ή **we used to meet**, όχι απλώς *we met*. Είναι ακριβώς ο ελληνικός παρατατικός («μαζευόμασταν»), που τα αγγλικά δεν έχουν και τον λύνουν έτσι.' },
        beispiele:[
          { z:'We\'d meet every Sunday.', na:{ de:'Wir haben uns jeden Sonntag getroffen.', es:'Nos reuníamos todos los domingos.', el:'Βρισκόμασταν κάθε Κυριακή.' } },
          { z:'I used to live there.', na:{ de:'Früher habe ich dort gewohnt.', es:'Antes vivía allí.', el:'Παλιά έμενα εκεί.' } }
        ]
      }
    },

    'a2.hotel': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Seit gestern Abend geht die Heizung nicht, warmes Wasser auch nicht.', es:'Desde anoche no funciona la calefacción, y tampoco hay agua caliente.', en:'Since last night the heating hasn\'t worked, and there\'s no hot water either.', el:'Από χθες βράδυ η θέρμανση δεν λειτουργεί και δεν έχει ούτε ζεστό νερό.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Good morning. How\'s the room treating you?', na:{ de:'Guten Morgen. Alles zu Ihrer Zufriedenheit?', es:'Buenos días. ¿Qué tal la habitación?', el:'Καλημέρα. Πώς σας φαίνεται το δωμάτιο;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Absolutely. I\'ll put you in 305 — it\'s quieter anyway.', na:{ de:'Selbstverständlich. Ich gebe Ihnen die 305, die ist ohnehin ruhiger.', es:'Por supuesto. Le doy la 305, además es más tranquila.', el:'Βεβαίως. Θα σας δώσω το 305 — είναι έτσι κι αλλιώς πιο ήσυχο.' } },
      wortschatz: [
        { z:'the heat', na:{ de:'die Heizung', es:'la calefacción', el:'η θέρμανση' } },
        { z:'to be out', na:{ de:'kaputt sein', es:'estar estropeado', el:'δεν λειτουργώ / έχω χαλάσει' } },
        { z:'hot water', na:{ de:'warmes Wasser', es:'agua caliente', el:'το ζεστό νερό' } },
        { z:'a towel', na:{ de:'das Handtuch', es:'la toalla', el:'η πετσέτα' } },
        { z:'the AC', na:{ de:'die Klimaanlage', es:'el aire acondicionado', el:'το κλιματιστικό' } },
        { z:'to move rooms', na:{ de:'das Zimmer wechseln', es:'cambiar de habitación', el:'αλλάζω δωμάτιο' } },
        { z:'I\'d rather', na:{ de:'ich würde lieber', es:'preferiría', el:'θα προτιμούσα' } },
        { z:'quiet', na:{ de:'ruhig', es:'tranquilo', el:'ήσυχος' } },
        { z:'noisy', na:{ de:'laut', es:'ruidoso', el:'θορυβώδης' } },
        { z:'right away', na:{ de:'sofort', es:'ahora mismo', el:'αμέσως' } },
        { z:'to let someone know', na:{ de:'Bescheid geben', es:'avisar', el:'ενημερώνω κάποιον' } },
        { z:'housekeeping', na:{ de:'der Zimmerservice', es:'el servicio de habitaciones', el:'η υπηρεσία καθαριότητας' } }
      ],
      dialog: {
        rolle: { de:'die Rezeptionistin', es:'la recepcionista', el:'η ρεσεψιονίστ' },
        zeilen: [
          { wer:'spikiu', z:'Good morning. How\'s the room treating you?', na:{ de:'Guten Morgen. Alles zu Ihrer Zufriedenheit?', es:'Buenos días. ¿Qué tal la habitación?', el:'Καλημέρα. Πώς σας φαίνεται το δωμάτιο;' } },
          { wer:'lerner', z:'Morning. Unfortunately the heat isn\'t working.', na:{ de:'Guten Morgen. Leider funktioniert die Heizung nicht.', es:'Buenos días. Lamentablemente la calefacción no funciona.', el:'Καλημέρα. Δυστυχώς η θέρμανση δεν λειτουργεί.' } },
          { wer:'spikiu', z:'Sorry to hear that. How long has it been out?', na:{ de:'Das tut mir leid. Seit wann denn?', es:'Lo siento mucho. ¿Desde cuándo?', el:'Λυπάμαι. Από πότε δεν λειτουργεί;' } },
          { wer:'lerner', z:'Since last night. And there\'s no hot water either.', na:{ de:'Seit gestern Abend. Und warmes Wasser gibt es auch nicht.', es:'Desde anoche. Y tampoco hay agua caliente.', el:'Από χθες βράδυ. Και δεν έχει ούτε ζεστό νερό.' } },
          { wer:'spikiu', z:'I can send someone up, or I can move you.', na:{ de:'Ich kann jemanden hochschicken, oder ich verlege Sie.', es:'Puedo mandar a alguien, o puedo cambiarle de habitación.', el:'Μπορώ να στείλω κάποιον επάνω ή να σας αλλάξω δωμάτιο.' } },
          { wer:'lerner', z:'I\'d rather move, if that\'s possible.', na:{ de:'Ich würde lieber wechseln, wenn das geht.', es:'Preferiría cambiar, si es posible.', el:'Θα προτιμούσα να αλλάξω, αν γίνεται.' } }
        ]
      },
      lesetext: {
        z:'A guest reports that the heat isn\'t working and there\'s no hot water either. It\'s been out since last night. The clerk offers to send someone up or move him. He\'d rather move, and gets room 305, which is quieter.',
        na:{ de:'Ein Gast meldet, dass die Heizung nicht funktioniert und es auch kein warmes Wasser gibt. Seit gestern Abend ist es so. Die Rezeption bietet an, jemanden zu schicken oder ihn umzuquartieren. Er wechselt lieber und bekommt Zimmer 305, das ruhiger liegt.', es:'Un huésped informa de que la calefacción no funciona y tampoco hay agua caliente. Lleva así desde anoche. La recepción ofrece mandar a alguien o cambiarle de habitación. Prefiere cambiar y le dan la 305, que es más tranquila.', el:'Ένας πελάτης αναφέρει ότι η θέρμανση δεν λειτουργεί και ότι δεν έχει ούτε ζεστό νερό. Είναι έτσι από χθες βράδυ. Η ρεσεψιόν προτείνει να στείλει κάποιον ή να του αλλάξει δωμάτιο. Εκείνος προτιμά να αλλάξει και παίρνει το 305, που είναι πιο ήσυχο.' },
        frage:{ de:'Wofür entscheidet sich der Gast?', es:'¿Qué elige el huésped?', el:'Τι επιλέγει ο πελάτης;' },
        optionen:[
          { na:{ de:'Das Zimmer zu wechseln', es:'Cambiar de habitación', el:'Να αλλάξει δωμάτιο' }, richtig:true },
          { na:{ de:'Auf jemanden zu warten', es:'Esperar a alguien', el:'Να περιμένει κάποιον' }, richtig:false },
          { na:{ de:'Auszuchecken', es:'Dejar el hotel', el:'Να φύγει από το ξενοδοχείο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Melde, dass das Licht nicht geht, und bitte um ein anderes Zimmer. Zwei Sätze.', es:'Informa de que la luz no funciona y pide otra habitación. Dos frases.', el:'Πες ότι το φως δεν λειτουργεί και ζήτα άλλο δωμάτιο. Δύο προτάσεις.' },
        muster:'The light in the bathroom isn\'t working. I\'d rather move to another room, if possible.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'**I want to move** klingt fordernd. **I\'d rather move** sagt dieselbe Sache als Vorliebe statt als Forderung — genau wie das deutsche „ich würde lieber". Nach *I\'d rather* steht das Verb in der Grundform, ohne *to*.', es:'**I want to move** suena a exigencia. **I\'d rather move** dice lo mismo como preferencia, no como demanda — es el „preferiría" español. Después de *I\'d rather* el verbo va desnudo, sin *to*.', el:'Το **I want to move** ακούγεται σαν απαίτηση. Το **I\'d rather move** λέει το ίδιο πράγμα ως προτίμηση, όχι ως αξίωση — είναι το ελληνικό «θα προτιμούσα». Μετά το *I\'d rather* το ρήμα μπαίνει γυμνό, χωρίς *to*.' },
        beispiele:[
          { z:'I\'d rather move.', na:{ de:'Ich würde lieber wechseln.', es:'Preferiría cambiar.', el:'Θα προτιμούσα να αλλάξω.' } },
          { z:'I\'d rather wait outside.', na:{ de:'Ich würde lieber draußen warten.', es:'Preferiría esperar fuera.', el:'Θα προτιμούσα να περιμένω έξω.' } }
        ]
      }
    },

    'a2.restaurant': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Ihr seid zu zweit, wollt euch ein Gericht teilen und getrennt zahlen.', es:'Son dos, quieren compartir un plato y pagar por separado.', en:'There are two of you; you want to share a dish and pay separately.', el:'Είστε δύο, θέλετε να μοιραστείτε ένα πιάτο και να πληρώσετε χωριστά.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Have you two decided, or do you need another minute?', na:{ de:'Haben Sie schon gewählt, oder brauchen Sie noch einen Moment?', es:'¿Ya han elegido o les dejo un momento más?', el:'Έχετε αποφασίσει ή θέλετε ένα λεπτό ακόμα;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Not at all — happens all the time. Water for the table?', na:{ de:'Aber gerne, das machen wir ständig. Wasser für den Tisch?', es:'Claro que sí, lo hacemos a menudo. ¿Agua para la mesa?', el:'Κανένα πρόβλημα — συμβαίνει συνέχεια. Νερό για το τραπέζι;' } },
      wortschatz: [
        { z:'the specialty', na:{ de:'die Spezialität', es:'la especialidad', el:'η σπεσιαλιτέ' } },
        { z:'rich', na:{ de:'deftig', es:'contundente', el:'βαρύς (για φαγητό)' } },
        { z:'light', na:{ de:'leicht', es:'ligero', el:'ελαφρύς' } },
        { z:'to share', na:{ de:'teilen', es:'compartir', el:'μοιράζομαι' } },
        { z:'split the check', na:{ de:'getrennt zahlen', es:'pagar por separado', el:'πληρώνουμε χωριστά' } },
        { z:'ribs', na:{ de:'die Rippchen', es:'las costillas', el:'τα παϊδάκια' } },
        { z:'a plate', na:{ de:'der Teller', es:'el plato', el:'η πιατέλα' } },
        { z:'plenty', na:{ de:'reichlich', es:'de sobra', el:'άφθονο' } },
        { z:'would you mind', na:{ de:'wären Sie so nett', es:'le importaría', el:'θα σας πείραζε' } },
        { z:'to be worth it', na:{ de:'sich lohnen', es:'valer la pena', el:'αξίζει τον κόπο' } },
        { z:'the tip', na:{ de:'das Trinkgeld', es:'la propina', el:'το φιλοδώρημα' } },
        { z:'all set', na:{ de:'fertig', es:'todo listo', el:'έτοιμα' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero', el:'ο σερβιτόρος' },
        zeilen: [
          { wer:'spikiu', z:'Have you two decided, or do you need another minute?', na:{ de:'Haben Sie schon gewählt, oder brauchen Sie noch einen Moment?', es:'¿Ya han elegido o les dejo un momento más?', el:'Έχετε αποφασίσει ή θέλετε ένα λεπτό ακόμα;' } },
          { wer:'lerner', z:'What\'s the house specialty?', na:{ de:'Was ist Ihre Spezialität?', es:'¿Cuál es la especialidad de la casa?', el:'Ποια είναι η σπεσιαλιτέ του μαγαζιού;' } },
          { wer:'spikiu', z:'The ribs. They\'re rich, but worth it.', na:{ de:'Die Rippchen. Ziemlich deftig, aber es lohnt sich.', es:'Las costillas. Contundentes, pero valen la pena.', el:'Τα παϊδάκια. Είναι βαριά, αλλά αξίζουν.' } },
          { wer:'lerner', z:'Is there something lighter? We\'d like to share.', na:{ de:'Gibt es etwas Leichteres? Wir möchten teilen.', es:'¿Hay algo más ligero? Queremos compartir.', el:'Υπάρχει κάτι πιο ελαφρύ; Θα θέλαμε να το μοιραστούμε.' } },
          { wer:'spikiu', z:'The fish plate, then. That\'s plenty for two.', na:{ de:'Dann der Fischteller. Der reicht gut für zwei.', es:'Entonces el plato de pescado. Da para dos.', el:'Τότε την πιατέλα με ψάρι. Φτάνει άνετα για δύο.' } },
          { wer:'lerner', z:'Perfect. Would you mind splitting the check later?', na:{ de:'Gut. Könnten wir hinterher getrennt zahlen?', es:'Perfecto. ¿Nos podría traer cuentas separadas?', el:'Τέλεια. Θα σας πείραζε να πληρώσουμε χωριστά μετά;' } }
        ]
      },
      lesetext: {
        z:'Two guests ask about the house specialty. The ribs are rich, so they\'d rather share something lighter. The server suggests the fish plate — plenty for two. They also ask to split the check, which is no problem at all.',
        na:{ de:'Zwei Gäste fragen nach der Spezialität des Hauses. Die Rippchen sind deftig, deshalb teilen sie lieber etwas Leichteres. Der Kellner schlägt den Fischteller vor — reicht für zwei. Sie bitten außerdem um getrennte Rechnungen, was überhaupt kein Problem ist.', es:'Dos clientes preguntan por la especialidad de la casa. Las costillas son contundentes, así que prefieren compartir algo más ligero. El camarero sugiere el plato de pescado, que da para dos. Piden además cuentas separadas, lo que no supone ningún problema.', el:'Δύο πελάτες ρωτούν ποια είναι η σπεσιαλιτέ του μαγαζιού. Τα παϊδάκια είναι βαριά, γι’ αυτό προτιμούν να μοιραστούν κάτι πιο ελαφρύ. Ο σερβιτόρος προτείνει την πιατέλα με ψάρι — φτάνει για δύο. Ζητούν επίσης να πληρώσουν χωριστά, κάτι που δεν είναι καθόλου πρόβλημα.' },
        frage:{ de:'Was schlägt der Kellner vor?', es:'¿Qué sugiere el camarero?', el:'Τι προτείνει ο σερβιτόρος;' },
        optionen:[
          { na:{ de:'Den Fischteller', es:'El plato de pescado', el:'Την πιατέλα με ψάρι' }, richtig:true },
          { na:{ de:'Die Rippchen', es:'Las costillas', el:'Τα παϊδάκια' }, richtig:false },
          { na:{ de:'Zwei Nachtische', es:'Dos postres', el:'Δύο επιδόρπια' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag nach der Spezialität und bitte um getrennte Rechnungen. Zwei Sätze.', es:'Pregunta por la especialidad y pide cuentas separadas. Dos frases.', el:'Ρώτα για τη σπεσιαλιτέ και ζήτα να πληρώσετε χωριστά. Δύο προτάσεις.' },
        muster:'What\'s the house specialty? Would you mind splitting the check?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'**Would you mind…?** heißt wörtlich „hätten Sie etwas dagegen?". Deshalb bedeutet die Antwort **not at all** ein *Ja, gerne* — obwohl da „überhaupt nicht" steht. Wer hier wörtlich übersetzt, versteht das Gegenteil.', es:'**Would you mind…?** significa literalmente „¿le importaría?". Por eso la respuesta **not at all** quiere decir *sí, claro* — aunque diga „en absoluto". Traducir palabra por palabra aquí da justo lo contrario.', el:'Το **Would you mind…?** σημαίνει κατά λέξη «θα σας πείραζε;». Γι’ αυτό η απάντηση **not at all** σημαίνει *ναι, βεβαίως* — παρόλο που λέει «καθόλου». Αν το μεταφράσεις λέξη προς λέξη, καταλαβαίνεις το αντίθετο.' },
        beispiele:[
          { z:'Would you mind splitting the check?', na:{ de:'Könnten wir getrennt zahlen?', es:'¿Nos podría traer cuentas separadas?', el:'Θα μπορούσαμε να πληρώσουμε χωριστά;' } },
          { z:'Not at all.', na:{ de:'Aber gerne.', es:'Claro que sí.', el:'Καθόλου, ευχαρίστως.' } }
        ]
      }
    },

    'a2.taxi': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du willst zum Flughafen und hast es eilig. Am Ende brauchst du eine Quittung.', es:'Quieres ir al aeropuerto y tienes prisa. Al final necesitas un recibo.', en:'You\'re in a hurry to the airport. At the end you need a receipt.', el:'Βιάζεσαι να πας στο αεροδρόμιο. Στο τέλος χρειάζεσαι απόδειξη.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Morning. Where can I take you?', na:{ de:'Guten Morgen. Wohin darf ich Sie bringen?', es:'Buenos días. ¿Adónde le llevo?', el:'Καλημέρα. Πού να σας πάω;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'You got it. We\'ll make it in plenty of time.', na:{ de:'Kein Problem. Wir schaffen es locker.', es:'Sin problema. Llegamos de sobra.', el:'Έγινε. Θα φτάσουμε με την άνεσή μας.' } },
      wortschatz: [
        { z:'a backup', na:{ de:'der Stau', es:'el atasco', el:'η κίνηση / το μποτιλιάρισμα' } },
        { z:'the freeway', na:{ de:'die Autobahn', es:'la autopista', el:'ο αυτοκινητόδρομος' } },
        { z:'traffic', na:{ de:'der Verkehr', es:'el tráfico', el:'η κίνηση' } },
        { z:'in a rush', na:{ de:'in Eile', es:'con prisa', el:'βιαστικός' } },
        { z:'a receipt', na:{ de:'die Quittung', es:'el recibo', el:'η απόδειξη' } },
        { z:'to take a turn', na:{ de:'abbiegen', es:'girar', el:'στρίβω' } },
        { z:'a detour', na:{ de:'die Umleitung', es:'el desvío', el:'η παράκαμψη' } },
        { z:'on time', na:{ de:'pünktlich', es:'a tiempo', el:'στην ώρα μου' } },
        { z:'roadwork', na:{ de:'die Baustelle', es:'las obras', el:'τα έργα στον δρόμο' } },
        { z:'to take', na:{ de:'dauern', es:'durar', el:'παίρνει (χρόνο)' } },
        { z:'actually', na:{ de:'wirklich', es:'de verdad', el:'όντως' } },
        { z:'you got it', na:{ de:'mach ich', es:'claro que sí', el:'έγινε' } }
      ],
      dialog: {
        rolle: { de:'der Taxifahrer', es:'el taxista', el:'ο ταξιτζής' },
        zeilen: [
          { wer:'spikiu', z:'Morning. Where can I take you?', na:{ de:'Guten Morgen. Wohin darf ich Sie bringen?', es:'Buenos días. ¿Adónde le llevo?', el:'Καλημέρα. Πού να σας πάω;' } },
          { wer:'lerner', z:'The airport, please. I\'m in a bit of a rush.', na:{ de:'Zum Flughafen, bitte. Ich bin etwas in Eile.', es:'Al aeropuerto, por favor. Tengo algo de prisa.', el:'Στο αεροδρόμιο, παρακαλώ. Βιάζομαι λίγο.' } },
          { wer:'spikiu', z:'There\'s a backup on the freeway. Want me to take surface streets?', na:{ de:'Auf der Autobahn ist Stau. Soll ich durch die Stadt fahren?', es:'Hay atasco en la autopista. ¿Voy por el centro?', el:'Έχει μποτιλιάρισμα στον αυτοκινητόδρομο. Θέλετε να πάμε από μέσα;' } },
          { wer:'lerner', z:'Is that actually faster?', na:{ de:'Ist das denn schneller?', es:'¿De verdad es más rápido?', el:'Είναι όντως πιο γρήγορα;' } },
          { wer:'spikiu', z:'In this traffic, yeah. Ten minutes less, easy.', na:{ de:'Bei dem Verkehr ja. Locker zehn Minuten weniger.', es:'Con este tráfico, sí. Diez minutos menos, como poco.', el:'Με τέτοια κίνηση, ναι. Δέκα λεπτά λιγότερα, άνετα.' } },
          { wer:'lerner', z:'Let\'s do that. Could I get a receipt at the end?', na:{ de:'Dann fahren Sie so. Bekomme ich am Ende eine Quittung?', es:'Entonces vaya por ahí. ¿Me da un recibo al final?', el:'Ας πάμε έτσι. Μπορώ να έχω μια απόδειξη στο τέλος;' } }
        ]
      },
      lesetext: {
        z:'A passenger is in a rush to the airport. There\'s a backup on the freeway, so the driver suggests taking surface streets — about ten minutes faster in this traffic. The passenger asks for a receipt at the end.',
        na:{ de:'Ein Fahrgast will schnell zum Flughafen. Auf der Autobahn ist Stau, deshalb schlägt der Fahrer den Weg durch die Stadt vor — bei dem Verkehr etwa zehn Minuten schneller. Am Ende bittet der Fahrgast um eine Quittung.', es:'Un pasajero tiene prisa por llegar al aeropuerto. Hay atasco en la autopista, así que el taxista propone ir por el centro: unos diez minutos menos con este tráfico. Al final el pasajero pide un recibo.', el:'Ένας επιβάτης θέλει να πάει γρήγορα στο αεροδρόμιο. Έχει μποτιλιάρισμα στον αυτοκινητόδρομο, γι’ αυτό ο οδηγός προτείνει να πάνε μέσα από την πόλη — με τέτοια κίνηση, περίπου δέκα λεπτά πιο γρήγορα. Στο τέλος ο επιβάτης ζητάει απόδειξη.' },
        frage:{ de:'Warum fahren sie durch die Stadt?', es:'¿Por qué van por el centro?', el:'Γιατί πάνε μέσα από την πόλη;' },
        optionen:[
          { na:{ de:'Auf der Autobahn ist Stau', es:'Hay atasco en la autopista', el:'Έχει μποτιλιάρισμα στον αυτοκινητόδρομο' }, richtig:true },
          { na:{ de:'Die Stadt ist schöner', es:'El centro es más bonito', el:'Η πόλη είναι πιο όμορφη' }, richtig:false },
          { na:{ de:'Der Flughafen ist zu', es:'El aeropuerto está cerrado', el:'Το αεροδρόμιο είναι κλειστό' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Nenne dein Ziel, sag dass du es eilig hast, und bitte um eine Quittung. Zwei Sätze.', es:'Di adónde vas, que tienes prisa, y pide un recibo. Dos frases.', el:'Πες πού πας, ότι βιάζεσαι, και ζήτα απόδειξη. Δύο προτάσεις.' },
        muster:'The station, please — I\'m in a bit of a rush. Could I get a receipt at the end?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'**Is that faster?** ist eine sachliche Frage. **Is that actually faster?** klingt zweifelnd — höflich zweifelnd. Genau die Arbeit, die im Deutschen das Wörtchen *denn* macht. Und Vorsicht: *actually* heißt nicht „aktuell", sondern „tatsächlich".', es:'**Is that faster?** es una pregunta neutra. **Is that actually faster?** suena escéptica, con cortesía. Y ojo con la trampa: *actually* no significa „actualmente" sino „en realidad".', el:'Το **Is that faster?** είναι μια ουδέτερη ερώτηση. Το **Is that actually faster?** ακούγεται διστακτικό — ευγενικά διστακτικό. Και προσοχή στην παγίδα: το *actually* δεν σημαίνει «ακριβώς τώρα» ούτε «επίκαιρα», αλλά «στην πραγματικότητα».' },
        beispiele:[
          { z:'Is that actually faster?', na:{ de:'Ist das denn schneller?', es:'¿De verdad es más rápido?', el:'Είναι όντως πιο γρήγορα;' } },
          { z:'Actually, I\'d prefer the other one.', na:{ de:'Eigentlich hätte ich lieber das andere.', es:'En realidad prefiero el otro.', el:'Στην πραγματικότητα, θα προτιμούσα το άλλο.' } }
        ]
      }
    },

    'a2.wegbeschreibung': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du suchst das Museum und gehst gern zu Fuß.', es:'Buscas el museo y te gusta ir a pie.', en:'You\'re looking for the museum and you don\'t mind walking.', el:'Ψάχνεις το μουσείο και δεν σε πειράζει να περπατήσεις.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'You look a little lost — need a hand?', na:{ de:'Sie sehen etwas ratlos aus — kann ich helfen?', es:'Parece un poco perdido, ¿le ayudo?', el:'Μοιάζετε λίγο χαμένος — χρειάζεστε βοήθεια;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Sure, about fifteen minutes. You can\'t miss it — big stone building.', na:{ de:'Klar, ungefähr fünfzehn Minuten. Sie können es nicht verfehlen, großer Steinbau.', es:'Claro, unos quince minutos. No tiene pérdida, un edificio grande de piedra.', el:'Βεβαίως, περίπου δεκαπέντε λεπτά. Δεν μπορείτε να το χάσετε — μεγάλο πέτρινο κτίριο.' } },
      wortschatz: [
        { z:'to head down', na:{ de:'entlanggehen', es:'ir por', el:'κατεβαίνω (τον δρόμο)' } },
        { z:'the traffic light', na:{ de:'die Ampel', es:'el semáforo', el:'το φανάρι' } },
        { z:'to cross over', na:{ de:'überqueren', es:'cruzar', el:'περνάω απέναντι' } },
        { z:'the traffic circle', na:{ de:'der Kreisverkehr', es:'la rotonda', el:'ο κυκλικός κόμβος' } },
        { z:'across from', na:{ de:'gegenüber', es:'enfrente de', el:'απέναντι από' } },
        { z:'you can\'t miss it', na:{ de:'nicht zu verfehlen', es:'no tiene pérdida', el:'δεν μπορείς να το χάσεις' } },
        { z:'the block', na:{ de:'der Häuserblock', es:'la manzana', el:'το τετράγωνο' } },
        { z:'a landmark', na:{ de:'ein Wahrzeichen', es:'un punto de referencia', el:'ένα σημείο αναφοράς' } },
        { z:'to keep going', na:{ de:'weitergehen', es:'seguir', el:'συνεχίζω' } },
        { z:'a hand', na:{ de:'Hilfe', es:'una mano', el:'μια βοήθεια' } },
        { z:'about', na:{ de:'ungefähr', es:'más o menos', el:'περίπου' } },
        { z:'the sidewalk', na:{ de:'der Gehweg', es:'la acera', el:'το πεζοδρόμιο' } }
      ],
      dialog: {
        rolle: { de:'eine Passantin', es:'una transeúnte', el:'μια περαστική' },
        zeilen: [
          { wer:'spikiu', z:'You look a little lost — need a hand?', na:{ de:'Sie sehen etwas ratlos aus — kann ich helfen?', es:'Parece un poco perdido, ¿le ayudo?', el:'Μοιάζετε λίγο χαμένος — χρειάζεστε βοήθεια;' } },
          { wer:'lerner', z:'Excuse me, how do I get to the museum from here?', na:{ de:'Entschuldigung, wie komme ich von hier zum Museum?', es:'Perdone, ¿cómo llego al museo desde aquí?', el:'Συγγνώμη, πώς πάω στο μουσείο από εδώ;' } },
          { wer:'spikiu', z:'Head down to the light and cross over.', na:{ de:'Gehen Sie bis zur Ampel und überqueren Sie die Straße.', es:'Vaya hasta el semáforo y cruce.', el:'Πηγαίνετε ως το φανάρι και περάστε απέναντι.' } },
          { wer:'lerner', z:'And then what?', na:{ de:'Und wie geht es dann weiter?', es:'¿Y después?', el:'Και μετά;' } },
          { wer:'spikiu', z:'Right at the traffic circle. It\'s across from the park.', na:{ de:'Am Kreisverkehr rechts. Es liegt gegenüber vom Park.', es:'En la rotonda a la derecha. Está enfrente del parque.', el:'Δεξιά στον κυκλικό κόμβο. Είναι απέναντι από το πάρκο.' } },
          { wer:'lerner', z:'Can I walk there?', na:{ de:'Kann man zu Fuß hingehen?', es:'¿Se puede ir a pie?', el:'Μπορώ να πάω με τα πόδια;' } }
        ]
      },
      lesetext: {
        z:'A visitor asks the way to the museum. He should head down to the light and cross over, then take a right at the traffic circle. The museum is across from the park, about fifteen minutes on foot.',
        na:{ de:'Ein Besucher fragt nach dem Weg zum Museum. Er soll bis zur Ampel gehen und die Straße überqueren, dann am Kreisverkehr rechts. Das Museum liegt gegenüber vom Park, etwa fünfzehn Minuten zu Fuß.', es:'Un visitante pregunta cómo llegar al museo. Tiene que ir hasta el semáforo y cruzar, y luego girar a la derecha en la rotonda. El museo está enfrente del parque, a unos quince minutos a pie.', el:'Ένας επισκέπτης ρωτάει πώς θα πάει στο μουσείο. Πρέπει να πάει ως το φανάρι και να περάσει απέναντι, και μετά να στρίψει δεξιά στον κυκλικό κόμβο. Το μουσείο είναι απέναντι από το πάρκο, περίπου δεκαπέντε λεπτά με τα πόδια.' },
        frage:{ de:'Wo liegt das Museum?', es:'¿Dónde está el museo?', el:'Πού είναι το μουσείο;' },
        optionen:[
          { na:{ de:'Gegenüber vom Park', es:'Enfrente del parque', el:'Απέναντι από το πάρκο' }, richtig:true },
          { na:{ de:'Neben der Ampel', es:'Al lado del semáforo', el:'Δίπλα στο φανάρι' }, richtig:false },
          { na:{ de:'Am Bahnhof', es:'En la estación', el:'Στον σταθμό' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag nach dem Weg zum Bahnhof und ob man zu Fuß gehen kann. Zwei Sätze.', es:'Pregunta cómo llegar a la estación y si se puede ir a pie. Dos frases.', el:'Ρώτα πώς πας στον σταθμό και αν μπορείς να πας με τα πόδια. Δύο προτάσεις.' },
        muster:'How do I get to the station from here? Can I walk there?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Englische Wegbeschreibung läuft über kleine Anhängsel am Verb: **head down**, **cross over**, **keep going**, **turn around**. Das Verb allein sagt zu wenig; erst das Anhängsel gibt die Richtung. Man lernt sie als ganze Paare, nicht Wort für Wort.', es:'Las indicaciones inglesas funcionan con pequeñas partículas pegadas al verbo: **head down**, **cross over**, **keep going**, **turn around**. El verbo solo dice poco; la partícula da la dirección. Se aprenden en pareja, no palabra por palabra.', el:'Οι αγγλικές οδηγίες δουλεύουν με μικρά μόρια κολλημένα στο ρήμα: **head down**, **cross over**, **keep going**, **turn around**. Το ρήμα μόνο του λέει λίγα· το μόριο δίνει την κατεύθυνση. Τα μαθαίνεις ως ζευγάρια, όχι λέξη προς λέξη.' },
        beispiele:[
          { z:'Head down to the light.', na:{ de:'Gehen Sie bis zur Ampel.', es:'Vaya hasta el semáforo.', el:'Πηγαίνετε ως το φανάρι.' } },
          { z:'Keep going for two blocks.', na:{ de:'Gehen Sie zwei Straßen weiter.', es:'Siga dos calles más.', el:'Συνεχίστε δύο τετράγωνα.' } }
        ]
      }
    },

    'a2.wetter': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen
         — etwa das 'ich verstehe dich nicht' der Szene. Ohne dieses Feld
         siezte Spikiu mitten in einem Du-Gespraech (Leo, 31.08.). */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Ihr wollt am Samstag an den See. Du hast die Vorhersage noch nicht gesehen.', es:'Queréis ir al lago el sábado. Todavía no has visto la previsión del tiempo.', en:'You want to go to the lake on Saturday. You haven\'t checked the forecast yet.', el:'Θέλετε να πάτε στη λίμνη το Σάββατο. Δεν έχεις δει ακόμα την πρόγνωση.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Works for me. I\'ll swing by around two — see you Saturday!', na:{ de:'Passt mir. Ich hole dich gegen zwei ab — bis Samstag!', es:'Me parece bien. Paso a recogerte a eso de las dos. ¡Hasta el sábado!', el:'Μου κάνει. Θα περάσω γύρω στις δύο — τα λέμε το Σάββατο!' } },
      wortschatz: [
        { z:'the forecast', na:{ de:'die Vorhersage', es:'la previsión del tiempo', el:'η πρόγνωση' } },
        { z:'to clear up', na:{ de:'aufklaren', es:'despejar', el:'ανοίγει ο καιρός' } },
        { z:'sunny', na:{ de:'sonnig', es:'soleado', el:'ηλιόλουστος' } },
        { z:'cloudy', na:{ de:'bewölkt', es:'nublado', el:'συννεφιασμένος' } },
        { z:'a shower', na:{ de:'der Schauer', es:'el chubasco', el:'η μπόρα' } },
        { z:'a jacket', na:{ de:'die Jacke', es:'la chaqueta', el:'το μπουφάν' } },
        { z:'just in case', na:{ de:'sicherheitshalber', es:'por si acaso', el:'για καλό και για κακό' } },
        { z:'to swing by', na:{ de:'vorbeikommen', es:'pasar a recoger', el:'περνάω (από κάπου)' } },
        { z:'the lake', na:{ de:'der See', es:'el lago', el:'η λίμνη' } },
        { z:'to hit', na:{ de:'hingehen', es:'ir a', el:'πάω (κάπου)' } },
        { z:'or so', na:{ de:'oder so', es:'o así', el:'περίπου' } },
        { z:'to depend on', na:{ de:'abhängen von', es:'depender de', el:'εξαρτάται από' } }
      ],
      dialog: {
        rolle: { de:'eine Freundin', es:'una amiga', el:'μια φίλη' },
        zeilen: [
          { wer:'spikiu', z:'Want to hit the lake on Saturday?', na:{ de:'Wollen wir am Samstag an den See fahren?', es:'¿Vamos al lago el sábado?', el:'Πάμε στη λίμνη το Σάββατο;' } },
          { wer:'lerner', z:'Depends on the weather. Did you check the forecast?', na:{ de:'Kommt aufs Wetter an. Hast du die Vorhersage gesehen?', es:'Depende del tiempo. ¿Has visto la previsión?', el:'Εξαρτάται από τον καιρό. Είδες την πρόγνωση;' } },
          { wer:'spikiu', z:'It\'s supposed to rain in the morning.', na:{ de:'Vormittags soll es regnen.', es:'Dicen que llueve por la mañana.', el:'Το πρωί λένε ότι θα βρέξει.' } },
          { wer:'lerner', z:'What about the afternoon?', na:{ de:'Und am Nachmittag?', es:'¿Y por la tarde?', el:'Και το απόγευμα;' } },
          { wer:'spikiu', z:'Should clear up. Sunny by two or so.', na:{ de:'Da klart es wohl auf. Ab etwa zwei sonnig.', es:'Seguramente despeja. Hacia las dos, sol.', el:'Μάλλον θα ανοίξει. Ήλιος γύρω στις δύο.' } },
          { wer:'lerner', z:'Let\'s go in the afternoon, then. I\'ll bring a jacket just in case.', na:{ de:'Dann fahren wir nachmittags. Ich nehme sicherheitshalber eine Jacke mit.', es:'Entonces vamos por la tarde. Llevo una chaqueta por si acaso.', el:'Τότε πάμε το απόγευμα. Θα πάρω ένα μπουφάν για καλό και για κακό.' } }
        ]
      },
      lesetext: {
        z:'Two friends plan a Saturday at the lake. It\'s supposed to rain in the morning but should clear up by two. So they\'ll go in the afternoon, and one of them is bringing a jacket just in case.',
        na:{ de:'Zwei Freundinnen planen einen Samstag am See. Vormittags soll es regnen, gegen zwei klart es wohl auf. Also fahren sie nachmittags, und eine nimmt sicherheitshalber eine Jacke mit.', es:'Dos amigas planean un sábado en el lago. Por la mañana dicen que va a llover, pero hacia las dos seguramente despeja. Así que van por la tarde y una se lleva una chaqueta por si acaso.', el:'Δύο φίλες σχεδιάζουν ένα Σάββατο στη λίμνη. Το πρωί λένε ότι θα βρέξει, αλλά γύρω στις δύο μάλλον θα ανοίξει. Έτσι πηγαίνουν το απόγευμα, και η μία παίρνει ένα μπουφάν για καλό και για κακό.' },
        frage:{ de:'Wann fahren sie?', es:'¿Cuándo van?', el:'Πότε πηγαίνουν;' },
        optionen:[
          { na:{ de:'Am Nachmittag', es:'Por la tarde', el:'Το απόγευμα' }, richtig:true },
          { na:{ de:'Am Vormittag', es:'Por la mañana', el:'Το πρωί' }, richtig:false },
          { na:{ de:'Am Sonntag', es:'El domingo', el:'Την Κυριακή' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag nach der Vorhersage und schlag etwas für den Nachmittag vor. Zwei Sätze.', es:'Pregunta por la previsión y propón algo para la tarde. Dos frases.', el:'Ρώτα για την πρόγνωση και πρότεινε κάτι για το απόγευμα. Δύο προτάσεις.' },
        muster:'Did you check the forecast? Let\'s go in the afternoon, then.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Beim Wetter sagt Englisch selten „it will rain". Man sagt **it\'s supposed to rain** (so heißt es) oder **it should clear up** (wahrscheinlich). Beides ist ein Achselzucken in Worten — genau wie das deutsche „es soll" und „wohl".', es:'Con el tiempo el inglés rara vez dice „it will rain". Se dice **it\'s supposed to rain** (eso dicen) o **it should clear up** (probablemente). Las dos formas son un encogimiento de hombros hecho palabra.', el:'Για τον καιρό τα αγγλικά σπάνια λένε «it will rain». Λένε **it\'s supposed to rain** (έτσι λένε) ή **it should clear up** (μάλλον). Και οι δύο μορφές είναι ένα σήκωμα των ώμων σε λέξεις — όπως το ελληνικό «λένε ότι» και «μάλλον».' },
        beispiele:[
          { z:'It\'s supposed to rain.', na:{ de:'Es soll regnen.', es:'Dicen que va a llover.', el:'Λένε ότι θα βρέξει.' } },
          { z:'It should clear up by two.', na:{ de:'Gegen zwei klart es wohl auf.', es:'Seguramente despeja hacia las dos.', el:'Μάλλον θα ανοίξει γύρω στις δύο.' } }
        ]
      }
    }

  };

  raum.SpikiuLernpfadEN = {
    zielsprache: 'en',
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
        nimm(z.z, (z.na && (z.na[mu] || z.na.de)) || '', 'wendung');
      });
      (S.wortschatz || []).forEach(function (w) {
        nimm(w.z, (w.na && (w.na[mu] || w.na.de)) || '', art(w.z));
      });
      return out;
    },

    woerter: function (stufe, thema, muttersprache) {
      var S = STATIONEN[stufe + '.' + thema];
      if (!S) return [];
      var mu = muttersprache || 'de';
      return (S.wortschatz || []).map(function (w) {
        return { z: w.z, na: (w.na && (w.na[mu] || w.na.de)) || '' };
      });
    }
  };

})(typeof window !== 'undefined' ? window : globalThis);
