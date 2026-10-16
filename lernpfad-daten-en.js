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

  /* b1 = KRONE (16.10.2026), siehe unten „B1 · KRONE“. */
  var STUFEN = ['a1', 'a2', 'b1'];

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

  /* ══════════════════════════════════════════════════════════════════
     B1 · KRONE · «BRIDGES» (Leo, 16.10.2026: „Aprobado … Dale con todos.“)
     Giulia Ferri, Brückeningenieurin aus Turin, zeichnet für ihr Buch «Bridges» zehn Brücken: hotel New York · familie Pittsburgh (Thanksgiving) · cafe Chicago · restaurant New Orleans · wetter Austin · einkaufen Santa Fe · wegbeschreibung Grand Canyon · taxi San Francisco · arzt Seattle · bahnhof Seattle→Vancouver. Amerikanisch wie der ganze Pfad; britische Wörter nur, wo Giulia korrigiert wird.
     Dieselben zehn Themen, neue Handlung, neuer Ort. Keine Politik.
     Neue Felder wie im spanischen B1: rollen (Rollenkarte der Station) und
     kultur (ein Satz zum Ort, „Gut zu wissen“). Roman dazu: learnroman-giulia.js „Bridges“.
     ══════════════════════════════════════════════════════════════════ */
var K_LP_A = {

  schritt: {
    hotel:      { de:'New York: ein Studio für einen Monat', es:'Nueva York: un estudio para un mes', el:'Νέα Υόρκη: ένα στούντιο για έναν μήνα' },
    familie:    { de:'Pittsburgh: an Thanksgiving von früher erzählen', es:'Pittsburgh: contar el pasado en Acción de Gracias', el:'Πίτσμπουργκ: ιστορίες από τα παλιά την Ημέρα των Ευχαριστιών' },
    cafe:       { de:'Chicago: Meinungen austauschen', es:'Chicago: dar tu opinión', el:'Σικάγο: λες τη γνώμη σου' },
    restaurant: { de:'New Orleans: höflich reklamieren, Neues probieren', es:'Nueva Orleans: reclamar con educación, probar algo nuevo', el:'Νέα Ορλεάνη: ευγενικό παράπονο, κάτι καινούργιο' },
    wetter:     { de:'Austin: Tornado-Warnung, Pläne ändern', es:'Austin: alerta de tornado, cambiar de planes', el:'Ώστιν: προειδοποίηση για ανεμοστρόβιλο, αλλαγή σχεδίων' }
  },

  aufgaben: {
    'b1.hotel': [
      { de:'Bejahe, sag, dass du es gern sehen möchtest und etwas nah an der U-Bahn suchst', es:'Di que sí, que te gustaría verlo y que buscas algo que esté cerca del metro', en:'Say yes, that you would like to see it and are looking for something close to the subway', el:'Πες ναι, ότι θα ήθελες να το δεις και ότι ψάχνεις κάτι κοντά στο μετρό' },
      { de:'Frag höflich, ob die Nebenkosten in der Miete enthalten sind', es:'Pregunta con educación si los gastos están incluidos en el alquiler', en:'Ask politely whether utilities are included in the rent', el:'Ρώτα ευγενικά αν οι λογαριασμοί περιλαμβάνονται στο ενοίκιο' },
      { de:'Sag, dass das fair klingt, und frag, ob du am Samstag einziehen könntest', es:'Di que te parece justo y pregunta si podrías entrar a vivir el sábado', en:'Say that sounds fair and ask whether you could move in on Saturday', el:'Πες ότι σου φαίνεται λογικό και ρώτα αν θα μπορούσες να μετακομίσεις το Σάββατο' }
    ],
    'b1.familie': [
      { de:'Sag: deine Nonna Pina in Turin — und dass du früher jeden Sommer bei ihr verbracht hast', es:'Di que tu Nonna Pina, en Turín, y que antes pasabas todos los veranos en su casa', en:'Say: your Nonna Pina in Turin, and that you used to spend every summer at her house', el:'Πες: η Νόνα Πίνα σου στο Τορίνο, και ότι παλιά περνούσες κάθε καλοκαίρι στο σπίτι της' },
      { de:'Erzähle, dass du ihr gerade in der Küche geholfen hast, als du deine erste Brücke gezeichnet hast', es:'Cuenta que estabas ayudándola en la cocina cuando dibujaste tu primer puente', en:'Tell that you were helping her in the kitchen when you drew your first bridge', el:'Διηγήσου ότι τη βοηθούσες στην κουζίνα όταν ζωγράφισες την πρώτη σου γέφυρα' },
      { de:'Sag: nicht mehr, aber früher hat sie sonntags Pasta für zwanzig Leute gemacht', es:'Di que ya no, pero que antes hacía pasta para veinte personas los domingos', en:'Say not anymore, but she used to make pasta for twenty people on Sundays', el:'Πες όχι πια, αλλά ότι παλιά έφτιαχνε μακαρόνια για είκοσι άτομα τις Κυριακές' }
    ],
    'b1.cafe': [
      { de:'Sag, dass du die Stadt schön findest und die Brücken über den Fluss deiner Meinung nach toll sind', es:'Di que te parece preciosa y que, en tu opinión, los puentes sobre el río son increíbles', en:'Say you think it is beautiful and that, in your opinion, the bridges over the river are amazing', el:'Πες ότι τη βρίσκεις όμορφη και ότι, κατά τη γνώμη σου, οι γέφυρες πάνω από το ποτάμι είναι καταπληκτικές' },
      { de:'Stimme zu und sag, dass dieser Wind deiner Meinung nach kälter ist als der Winter in Turin', es:'Dale la razón y di que crees que este viento es más frío que el invierno de Turín', en:'Agree and say you believe this wind is colder than the winter in Turin', el:'Συμφώνησε και πες ότι πιστεύεις πως αυτός ο αέρας είναι πιο κρύος από τον χειμώνα στο Τορίνο' },
      { de:'Widersprich höflich: Deep-Dish ist lecker, aber eher ein Kuchen', es:'Lleva la contraria con educación: la deep-dish está riquísima, pero es más bien una tarta', en:'Politely disagree: deep-dish is delicious, but it is more like a pie', el:'Διαφώνησε ευγενικά: η deep-dish είναι νοστιμότατη, αλλά μοιάζει περισσότερο με πίτα' }
    ],
    'b1.restaurant': [
      { de:'Sag höflich, dass da ein Fehler passiert ist: Du hast das Gumbo bestellt', es:'Di con educación que ha habido un error: pediste el gumbo', en:'Politely say there has been a mistake: you ordered the gumbo', el:'Πες ευγενικά ότι έγινε λάθος: παρήγγειλες το γκάμπο' },
      { de:'Sag: kein Problem — und dass du noch nie Beignets probiert hast; frag, was das genau ist', es:'Di que no pasa nada, que nunca has probado los beignets, y pregunta qué son exactamente', en:'Say no problem, and that you have never tried beignets; ask what they are exactly', el:'Πες κανένα πρόβλημα, ότι δεν έχεις δοκιμάσει ποτέ beignets, και ρώτα τι ακριβώς είναι' },
      { de:'Bestelle zwei und frag, ob ihr getrennt zahlen könnt', es:'Pide dos y pregunta si podéis pagar por separado', en:'Order two and ask whether you can split the check', el:'Παράγγειλε δύο και ρώτα αν μπορείτε να πληρώσετε χωριστά' }
    ],
    'b1.wetter': [
      { de:'Sag, dass du heute Abend die Fledermäuse anschauen willst, und frag, was eine Tornado-Vorwarnung genau bedeutet', es:'Di que esta noche vas a ver los murciélagos y pregunta qué significa exactamente un aviso de tornado', en:'Say you are going to watch the bats tonight and ask what a tornado watch means exactly', el:'Πες ότι απόψε θα δεις τις νυχτερίδες και ρώτα τι ακριβώς σημαίνει «tornado watch»' },
      { de:'Sag: wenn daraus eine Warnung wird, gehst du sofort zurück ins Hotel', es:'Di que, si se convierte en alerta, volverás al hotel enseguida', en:'Say that if it turns into a warning, you will go back to your hotel right away', el:'Πες ότι, αν γίνει προειδοποίηση, θα γυρίσεις αμέσως στο ξενοδοχείο' },
      { de:'Sag, dass du dann morgen Abend wiederkommst — du wirst sie nicht verpassen', es:'Di que entonces volverás mañana por la noche, que no te los vas a perder', en:'Say you will come back tomorrow night, then; you are not going to miss them', el:'Πες ότι τότε θα ξανάρθεις αύριο βράδυ — δεν πρόκειται να τις χάσεις' }
    ]
  },

  stationen: {

    /* ── B1 · New York (Brooklyn) — ein Studio für einen Monat ─────── */
    'b1.hotel': {
      deineRolle: { de:'Du bist in Brooklyn und suchst für einen Monat ein möbliertes Studio, nah an der U-Bahn. Einziehen möchtest du am Samstag.', es:'Estás en Brooklyn y buscas un estudio amueblado para un mes, cerca del metro. Quieres entrar a vivir el sábado.', en:'You are in Brooklyn looking for a furnished studio for one month, close to the subway. You would like to move in on Saturday.', el:'Είσαι στο Μπρούκλιν και ψάχνεις ένα επιπλωμένο στούντιο για έναν μήνα, κοντά στο μετρό. Θέλεις να μετακομίσεις το Σάββατο.' },
      abrundung: { z:'Saturday works. I\'ll have the lease and the keys ready. Welcome to Brooklyn!', na:{ de:'Samstag passt. Ich lege den Mietvertrag und die Schlüssel bereit. Willkommen in Brooklyn!', es:'El sábado va bien. Le tendré preparados el contrato y las llaves. ¡Bienvenida a Brooklyn!', el:'Το Σάββατο είναι μια χαρά. Θα έχω έτοιμο το συμβόλαιο και τα κλειδιά. Καλώς ήρθατε στο Μπρούκλιν!' } },
      rollen: {
        spikiu: { de:'der Hausmeister und Vermieter, Mr. Delgado', es:'el encargado y casero, el señor Delgado', en:'the super and landlord, Mr. Delgado', el:'ο επιστάτης και ιδιοκτήτης, ο κύριος Ντελγκάδο' },
        lerner: { de:'die Reisende auf Wohnungssuche', es:'la viajera que busca piso', en:'the traveler looking for an apartment', el:'η ταξιδιώτισσα που ψάχνει διαμέρισμα' },
        ort:    { de:'in einem alten Backsteinhaus in Brooklyn', es:'en un viejo edificio de ladrillo en Brooklyn', en:'in an old brick walk-up in Brooklyn', el:'σε μια παλιά πολυκατοικία από τούβλα στο Μπρούκλιν' }
      },
      wortschatz: [
        { z:'an apartment',                na:{ de:'die Wohnung', es:'el piso', el:'το διαμέρισμα' } },
        { z:'a furnished studio',          na:{ de:'das möblierte Einzimmerapartment', es:'el estudio amueblado', el:'το επιπλωμένο στούντιο' } },
        { z:'the rent',                    na:{ de:'die Miete', es:'el alquiler', el:'το ενοίκιο' } },
        { z:'the security deposit',        na:{ de:'die Kaution', es:'la fianza', el:'η εγγύηση' } },
        { z:'the lease',                   na:{ de:'der Mietvertrag', es:'el contrato de alquiler', el:'το συμβόλαιο ενοικίασης' } },
        { z:'utilities',                   na:{ de:'die Nebenkosten (Strom, Wasser, Heizung)', es:'los gastos (luz, agua, calefacción)', el:'οι λογαριασμοί (ρεύμα, νερό, θέρμανση)' } },
        { z:'the super',                   na:{ de:'der Hausmeister', es:'el encargado del edificio', el:'ο επιστάτης της πολυκατοικίας' } },
        { z:'the elevator',                na:{ de:'der Aufzug', es:'el ascensor', el:'το ασανσέρ' } },
        { z:'to move in',                  na:{ de:'einziehen', es:'entrar a vivir', el:'μετακομίζω (σε ένα σπίτι)' } },
        { z:'I\'d like to …',              na:{ de:'ich würde gern …', es:'me gustaría …', el:'θα ήθελα να …' } },
        { z:'I\'m looking for something that\'s …', na:{ de:'ich suche etwas, das … ist', es:'busco algo que esté …', el:'ψάχνω κάτι που να είναι …' } },
        { z:'Could you tell me if …?',     na:{ de:'Könnten Sie mir sagen, ob …?', es:'¿Podría decirme si …?', el:'Θα μπορούσατε να μου πείτε αν …;' } }
      ],
      dialog: {
        rolle: { de:'Der Hausmeister, Mr. Delgado', es:'El encargado del edificio, el señor Delgado', el:'Ο επιστάτης, ο κύριος Ντελγκάδο' },
        zeilen: [
          { wer:'spikiu', z:'Hi, come on in. You must be the one who called about the studio?', na:{ de:'Hallo, kommen Sie rein. Sie sind sicher diejenige, die wegen des Studios angerufen hat?', es:'Hola, pase. ¿Usted es la que llamó por el estudio?', el:'Γεια σας, περάστε. Εσείς πρέπει να είστε αυτή που τηλεφώνησε για το στούντιο;' } },
          { wer:'lerner', z:'Yes, that\'s me. I\'d like to see it. I\'m looking for something close to the subway.', na:{ de:'Ja, das bin ich. Ich würde es gern sehen. Ich suche etwas nah an der U-Bahn.', es:'Sí, soy yo. Me gustaría verlo. Busco algo que esté cerca del metro.', el:'Ναι, εγώ είμαι. Θα ήθελα να το δω. Ψάχνω κάτι κοντά στο μετρό.' } },
          { wer:'spikiu', z:'You\'re in luck. The F train is two blocks away. It\'s twenty-eight hundred a month.', na:{ de:'Da haben Sie Glück. Die Linie F ist zwei Straßen weiter. Es kostet achtundzwanzighundert im Monat.', es:'Está de suerte. La línea F está a dos manzanas. Son dos mil ochocientos al mes.', el:'Είστε τυχερή. Η γραμμή F είναι δύο τετράγωνα πιο κάτω. Κάνει δύο χιλιάδες οκτακόσια τον μήνα.' } },
          { wer:'lerner', z:'Could you tell me if utilities are included in the rent?', na:{ de:'Könnten Sie mir sagen, ob die Nebenkosten in der Miete enthalten sind?', es:'¿Podría decirme si los gastos están incluidos en el alquiler?', el:'Θα μπορούσατε να μου πείτε αν οι λογαριασμοί περιλαμβάνονται στο ενοίκιο;' } },
          { wer:'spikiu', z:'Heat and hot water, yes. Electricity is on you. And there\'s a one-month security deposit.', na:{ de:'Heizung und Warmwasser ja. Strom zahlen Sie selbst. Und es gibt eine Kaution von einer Monatsmiete.', es:'La calefacción y el agua caliente, sí. La luz corre de su cuenta. Y hay un mes de fianza.', el:'Θέρμανση και ζεστό νερό, ναι. Το ρεύμα το πληρώνετε εσείς. Και υπάρχει εγγύηση ενός μηνός.' } },
          { wer:'lerner', z:'That sounds fair. Would it be possible to move in on Saturday?', na:{ de:'Das klingt fair. Wäre es möglich, am Samstag einzuziehen?', es:'Me parece justo. ¿Sería posible entrar a vivir el sábado?', el:'Μου φαίνεται λογικό. Θα ήταν δυνατόν να μετακομίσω το Σάββατο;' } }
        ]
      },
      lesetext: {
        z:'Today I found a small studio in Brooklyn, ten minutes from the bridge. When I asked Mr. Delgado where the lift was, he laughed: “Here we say elevator — and we don\'t have one!” Tomorrow morning I\'m going to walk across the Brooklyn Bridge and draw its cables.',
        na:{ de:'Heute habe ich ein kleines Studio in Brooklyn gefunden, zehn Minuten von der Brücke. Als ich Mr. Delgado fragte, wo der „lift" sei, lachte er: „Hier sagen wir elevator — und wir haben gar keinen!" Morgen früh gehe ich zu Fuß über die Brooklyn Bridge und zeichne ihre Kabel.', es:'Hoy he encontrado un pequeño estudio en Brooklyn, a diez minutos del puente. Cuando le pregunté al señor Delgado dónde estaba el «lift», se rio: «Aquí decimos elevator… ¡y no tenemos!». Mañana por la mañana voy a cruzar a pie el puente de Brooklyn y a dibujar sus cables.', el:'Σήμερα βρήκα ένα μικρό στούντιο στο Μπρούκλιν, δέκα λεπτά από τη γέφυρα. Όταν ρώτησα τον κύριο Ντελγκάδο πού είναι το «lift», γέλασε: «Εδώ λέμε elevator — και δεν έχουμε καν!» Αύριο το πρωί θα περάσω με τα πόδια τη Γέφυρα του Μπρούκλιν και θα ζωγραφίσω τα καλώδιά της.' },
        frage:{ de:'Warum lachte Mr. Delgado?', es:'¿Por qué se rio el señor Delgado?', el:'Γιατί γέλασε ο κύριος Ντελγκάδο;' },
        optionen:[
          { na:{ de:'Sie sagte „lift", und das Haus hat gar keinen Aufzug', es:'Ella dijo «lift», y el edificio ni siquiera tiene ascensor', el:'Είπε «lift», και το κτίριο δεν έχει καν ασανσέρ' }, richtig:true },
          { na:{ de:'Sie wollte zu viel Miete zahlen', es:'Ella quería pagar demasiado alquiler', el:'Ήθελε να πληρώσει πολύ ενοίκιο' }, richtig:false },
          { na:{ de:'Sie kannte die Brooklyn Bridge nicht', es:'Ella no conocía el puente de Brooklyn', el:'Δεν ήξερε τη Γέφυρα του Μπρούκλιν' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib einem Vermieter: Du suchst eine ruhige Wohnung und möchtest wissen, ob die Nebenkosten enthalten sind. Zwei Sätze.', es:'Escribe a un casero: buscas un piso tranquilo y quieres saber si los gastos están incluidos. Dos frases.', el:'Γράψε σε έναν ιδιοκτήτη: ψάχνεις ένα ήσυχο διαμέρισμα και θέλεις να μάθεις αν περιλαμβάνονται οι λογαριασμοί. Δύο προτάσεις.' },
        muster:'Hi, I\'m looking for an apartment that\'s quiet. Could you tell me if utilities are included?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'„I\'d like to" ist die höfliche Bitte — wie „ich würde gern". Noch höflicher wird eine Frage, wenn man sie einpackt: statt „Are utilities included?" sagt man „Could you tell me if utilities are included?" — und danach steht die normale Satzstellung, ohne Umstellung. Wer etwas sucht, sagt: „I\'m looking for something that\'s close to the subway."', es:'«I\'d like to» es la petición educada, como «me gustaría». Una pregunta suena aún más educada si la envuelves: en vez de «Are utilities included?», se dice «Could you tell me if utilities are included?», y después va el orden normal de la frase, sin invertir. Para buscar algo: «I\'m looking for something that\'s close to the subway». Fíjate: el inglés no necesita subjuntivo aquí (busco algo que esté).', el:'Το «I\'d like to» είναι το ευγενικό αίτημα, σαν το «θα ήθελα». Μια ερώτηση γίνεται ακόμα πιο ευγενική όταν την «τυλίγεις»: αντί για «Are utilities included?» λες «Could you tell me if utilities are included?» — και μετά ακολουθεί η κανονική σειρά της πρότασης, χωρίς αντιστροφή. Όταν ψάχνεις κάτι: «I\'m looking for something that\'s close to the subway».' },
        beispiele:[
          { z:'I\'d like to see the apartment.', na:{ de:'Ich würde gern die Wohnung sehen.', es:'Me gustaría ver el piso.', el:'Θα ήθελα να δω το διαμέρισμα.' } },
          { z:'Could you tell me if the rent includes heat?', na:{ de:'Könnten Sie mir sagen, ob die Heizung in der Miete enthalten ist?', es:'¿Podría decirme si el alquiler incluye la calefacción?', el:'Θα μπορούσατε να μου πείτε αν το ενοίκιο περιλαμβάνει τη θέρμανση;' } }
        ]
      },
      kultur:{ de:'Die Brooklyn Bridge wurde 1883 eröffnet und war damals die längste Hängebrücke der Welt. Emily Warren Roebling, die Frau des Chefingenieurs, hatte großen Anteil an ihrer Fertigstellung. Über den Autos verläuft ein hölzerner Fußweg — der schönste Spaziergang nach Manhattan.', es:'El puente de Brooklyn se inauguró en 1883 y entonces era el puente colgante más largo del mundo. Emily Warren Roebling, la mujer del ingeniero jefe, tuvo un papel clave en su construcción. Por encima de los coches pasa una pasarela de madera: el paseo más bonito hacia Manhattan.', el:'Η Γέφυρα του Μπρούκλιν εγκαινιάστηκε το 1883 και ήταν τότε η μεγαλύτερη κρεμαστή γέφυρα του κόσμου. Η Έμιλι Γουόρεν Ρέμπλινγκ, σύζυγος του επικεφαλής μηχανικού, έπαιξε καθοριστικό ρόλο στην ολοκλήρωσή της. Πάνω από τα αυτοκίνητα περνάει ένας ξύλινος πεζόδρομος — η ωραιότερη βόλτα προς το Μανχάταν.' }
    },

    /* ── B1 · Pittsburgh — Thanksgiving bei den Zielinskis ─────────── */
    'b1.familie': {
      duzen: true,
      deineRolle: { de:'Du bist bei den Zielinskis zum Thanksgiving-Essen. Deine Nonna Pina lebt in Turin; als Kind hast du jeden Sommer bei ihr verbracht. Du hast ihr gerade in der Küche geholfen, als du deine erste Brücke gezeichnet hast. Heute kocht sie nicht mehr, aber früher machte sie sonntags Pasta für zwanzig Leute.', es:'Estás cenando con los Zielinski en Acción de Gracias. Tu Nonna Pina vive en Turín; de pequeña pasabas todos los veranos en su casa. Estabas ayudándola en la cocina cuando dibujaste tu primer puente. Ya no cocina, pero antes hacía pasta para veinte personas los domingos.', en:'You are at Thanksgiving dinner with the Zielinskis. Your Nonna Pina lives in Turin; as a child you used to spend every summer with her. You were helping her in the kitchen when you drew your first bridge. She doesn\'t cook anymore, but she used to make pasta for twenty people on Sundays.', el:'Είσαι στο τραπέζι της Ημέρας των Ευχαριστιών με τους Ζιελίνσκι. Η Νόνα Πίνα σου ζει στο Τορίνο· όταν ήσουν παιδί, περνούσες κάθε καλοκαίρι μαζί της. Τη βοηθούσες στην κουζίνα όταν ζωγράφισες την πρώτη σου γέφυρα. Δεν μαγειρεύει πια, αλλά παλιά έφτιαχνε μακαρόνια για είκοσι άτομα τις Κυριακές.' },
      abrundung: { z:'Twenty! Just like my Helen. Now pass the stuffing, and tell her Pittsburgh says hi.', na:{ de:'Zwanzig! Genau wie meine Helen. Jetzt reich mir mal die Füllung — und grüß sie schön aus Pittsburgh.', es:'¡Veinte! Igual que mi Helen. Ahora pásame el relleno, y dale recuerdos de parte de Pittsburgh.', el:'Είκοσι! Όπως η Έλεν μου. Δώσε μου τώρα τη γέμιση — και πες της χαιρετίσματα από το Πίτσμπουργκ.' } },
      rollen: {
        spikiu: { de:'Opa Stan Zielinski', es:'el abuelo Stan Zielinski', en:'Grandpa Stan Zielinski', el:'ο παππούς Σταν Ζιελίνσκι' },
        lerner: { de:'die Kollegin, zu Gast bei der Familie', es:'la compañera invitada a casa de la familia', en:'the colleague invited for dinner', el:'η συνάδελφος, καλεσμένη της οικογένειας' },
        ort:    { de:'am Thanksgiving-Tisch in Pittsburgh', es:'en la mesa de Acción de Gracias, en Pittsburgh', en:'at the Thanksgiving table in Pittsburgh', el:'στο τραπέζι της Ημέρας των Ευχαριστιών στο Πίτσμπουργκ' }
      },
      wortschatz: [
        { z:'Thanksgiving',         na:{ de:'Thanksgiving (Erntedankfest in den USA)', es:'el Día de Acción de Gracias', el:'η Ημέρα των Ευχαριστιών' } },
        { z:'the turkey',           na:{ de:'der Truthahn', es:'el pavo', el:'η γαλοπούλα' } },
        { z:'the stuffing',         na:{ de:'die Füllung', es:'el relleno', el:'η γέμιση' } },
        { z:'mashed potatoes',      na:{ de:'der Kartoffelbrei', es:'el puré de patatas', el:'ο πουρές πατάτας' } },
        { z:'pumpkin pie',          na:{ de:'der Kürbiskuchen', es:'la tarta de calabaza', el:'η γλυκιά κολοκυθόπιτα' } },
        { z:'the steel mill',       na:{ de:'das Stahlwerk', es:'la acería', el:'το χαλυβουργείο' } },
        { z:'used to …',            na:{ de:'früher (immer) …', es:'solía …', el:'συνήθιζα να … (παλιά)' } },
        { z:'when I was a kid',     na:{ de:'als ich klein war', es:'cuando era pequeña', el:'όταν ήμουν παιδί' } },
        { z:'to pass (the salt)',   na:{ de:'(das Salz) reichen', es:'pasar (la sal)', el:'δίνω (το αλάτι)' } },
        { z:'grateful',             na:{ de:'dankbar', es:'agradecido', el:'ευγνώμων' } },
        { z:'leftovers',            na:{ de:'die Reste', es:'las sobras', el:'τα περισσεύματα' } },
        { z:'not anymore',          na:{ de:'nicht mehr', es:'ya no', el:'όχι πια' } }
      ],
      dialog: {
        rolle: { de:'Opa Stan Zielinski', es:'El abuelo Stan Zielinski', el:'Ο παππούς Σταν Ζιελίνσκι' },
        zeilen: [
          { wer:'spikiu', z:'Forty years I worked at the steel mill. So, who\'s waiting for you back home?', na:{ de:'Vierzig Jahre habe ich im Stahlwerk gearbeitet. Und wer wartet zu Hause auf dich?', es:'Cuarenta años trabajé en la acería. Y a ti, ¿quién te espera en casa?', el:'Σαράντα χρόνια δούλεψα στο χαλυβουργείο. Εσένα ποιος σε περιμένει στο σπίτι;' } },
          { wer:'lerner', z:'My Nonna Pina in Turin. I used to spend every summer at her house.', na:{ de:'Meine Nonna Pina in Turin. Früher habe ich jeden Sommer bei ihr verbracht.', es:'Mi Nonna Pina, en Turín. Antes pasaba todos los veranos en su casa.', el:'Η Νόνα Πίνα μου στο Τορίνο. Παλιά περνούσα κάθε καλοκαίρι στο σπίτι της.' } },
          { wer:'spikiu', z:'Every summer! And what were you doing there all day, as a little girl?', na:{ de:'Jeden Sommer! Und was hast du dort als kleines Mädchen den ganzen Tag gemacht?', es:'¡Todos los veranos! ¿Y qué hacías allí todo el día, de pequeña?', el:'Κάθε καλοκαίρι! Και τι έκανες εκεί όλη μέρα, μικρό κορίτσι;' } },
          { wer:'lerner', z:'I was helping her in the kitchen when I drew my first bridge.', na:{ de:'Ich habe ihr gerade in der Küche geholfen, als ich meine erste Brücke gezeichnet habe.', es:'Estaba ayudándola en la cocina cuando dibujé mi primer puente.', el:'Τη βοηθούσα στην κουζίνα όταν ζωγράφισα την πρώτη μου γέφυρα.' } },
          { wer:'spikiu', z:'Ha! A born engineer. And does she still cook for the whole family?', na:{ de:'Ha! Eine geborene Ingenieurin. Und kocht sie immer noch für die ganze Familie?', es:'¡Ja! Ingeniera de nacimiento. ¿Y todavía cocina para toda la familia?', el:'Χα! Γεννημένη μηχανικός. Και μαγειρεύει ακόμα για όλη την οικογένεια;' } },
          { wer:'lerner', z:'Not anymore, but she used to make pasta for twenty people on Sundays.', na:{ de:'Nicht mehr, aber früher hat sie sonntags Pasta für zwanzig Leute gemacht.', es:'Ya no, pero antes hacía pasta para veinte personas los domingos.', el:'Όχι πια, αλλά παλιά έφτιαχνε μακαρόνια για είκοσι άτομα τις Κυριακές.' } }
        ]
      },
      lesetext: {
        z:'Pittsburgh has more than four hundred bridges, and three famous “sisters” over the river are painted bright yellow. At dinner, Grandpa Stan told me he used to make steel for bridges like these. When I asked what was for pudding, everyone looked confused. Here dessert is dessert, and pudding is something soft in a cup!',
        na:{ de:'Pittsburgh hat mehr als vierhundert Brücken, und drei berühmte „Schwestern" über dem Fluss sind leuchtend gelb gestrichen. Beim Essen hat mir Opa Stan erzählt, dass er früher Stahl für solche Brücken gemacht hat. Als ich fragte, was es als „pudding" gibt, schauten alle verwirrt. Hier heißt Nachtisch dessert, und pudding ist etwas Weiches im Becher!', es:'Pittsburgh tiene más de cuatrocientos puentes, y tres famosas «hermanas» sobre el río están pintadas de amarillo intenso. En la cena, el abuelo Stan me contó que antes fabricaba acero para puentes como estos. Cuando pregunté qué había de «pudding», todos pusieron cara de no entender. Aquí el postre es dessert, ¡y el pudding es algo blandito en un vasito!', el:'Το Πίτσμπουργκ έχει πάνω από τετρακόσιες γέφυρες, και τρεις διάσημες «αδερφές» πάνω από το ποτάμι είναι βαμμένες έντονο κίτρινο. Στο τραπέζι ο παππούς Σταν μού είπε ότι παλιά έφτιαχνε ατσάλι για τέτοιες γέφυρες. Όταν ρώτησα τι έχει για «pudding», όλοι με κοίταξαν μπερδεμένοι. Εδώ το επιδόρπιο λέγεται dessert, και pudding είναι κάτι μαλακό σε κυπελάκι!' },
        frage:{ de:'Was hat Opa Stan früher gemacht?', es:'¿A qué se dedicaba antes el abuelo Stan?', el:'Τι έκανε παλιά ο παππούς Σταν;' },
        optionen:[
          { na:{ de:'Er hat Stahl für Brücken gemacht', es:'Fabricaba acero para puentes', el:'Έφτιαχνε ατσάλι για γέφυρες' }, richtig:true },
          { na:{ de:'Er hat Brücken gelb gestrichen', es:'Pintaba puentes de amarillo', el:'Έβαφε γέφυρες κίτρινες' }, richtig:false },
          { na:{ de:'Er hat Nachtisch gebacken', es:'Hacía postres', el:'Έφτιαχνε επιδόρπια' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, was du als Kind oft gemacht hast und was du gerade getan hast, als etwas Besonderes passiert ist. Zwei Sätze.', es:'Cuenta qué solías hacer de pequeño y qué estabas haciendo cuando pasó algo especial. Dos frases.', el:'Πες τι συνήθιζες να κάνεις όταν ήσουν παιδί και τι έκανες τη στιγμή που συνέβη κάτι ξεχωριστό. Δύο προτάσεις.' },
        muster:'When I was a kid, I used to visit my grandparents every summer. I was reading in the garden when I saw my first shooting star.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Beim Erzählen arbeiten zwei Vergangenheiten zusammen: „I was helping" ist der laufende Hintergrund, „I drew" das Ereignis, das hineinplatzt — Deutsch braucht dafür ein „gerade". Und „used to" heißt: früher immer, heute nicht mehr. „She used to make pasta" — so war es damals.', es:'Al contar, trabajan juntos dos pasados: «I was helping» es el fondo que dura (estaba ayudando), «I drew» es lo que pasa de golpe (dibujé), igual que en español. Y «used to» es el imperfecto de costumbre: «She used to make pasta» = hacía pasta, solía hacer pasta, y ya no.', el:'Όταν διηγείσαι, δουλεύουν μαζί δύο παρελθοντικοί χρόνοι: το «I was helping» είναι το φόντο που διαρκεί (βοηθούσα), το «I drew» αυτό που γίνεται ξαφνικά (ζωγράφισα). Και το «used to» είναι ο παρατατικός της συνήθειας: «She used to make pasta» = έφτιαχνε μακαρόνια παλιά, όχι πια.' },
        beispiele:[
          { z:'I was helping her when I drew my first bridge.', na:{ de:'Ich habe ihr gerade geholfen, als ich meine erste Brücke gezeichnet habe.', es:'La estaba ayudando cuando dibujé mi primer puente.', el:'Τη βοηθούσα όταν ζωγράφισα την πρώτη μου γέφυρα.' } },
          { z:'She used to cook for twenty people.', na:{ de:'Früher hat sie für zwanzig Leute gekocht.', es:'Antes cocinaba para veinte personas.', el:'Παλιά μαγείρευε για είκοσι άτομα.' } }
        ]
      },
      kultur:{ de:'Thanksgiving ist am vierten Donnerstag im November: Familien kommen zusammen, es gibt Truthahn, Füllung und Kürbiskuchen, und viele sagen, wofür sie dankbar sind. Pittsburgh nennt sich „City of Bridges" — mit über 400 Brücken hat es mehr als fast jede andere Stadt der Welt.', es:'Acción de Gracias se celebra el cuarto jueves de noviembre: las familias se reúnen, hay pavo, relleno y tarta de calabaza, y muchos dicen en voz alta por qué están agradecidos. Pittsburgh se llama a sí misma «City of Bridges»: con más de 400 puentes, tiene más que casi cualquier otra ciudad del mundo.', el:'Η Ημέρα των Ευχαριστιών γιορτάζεται την τέταρτη Πέμπτη του Νοεμβρίου: οι οικογένειες μαζεύονται, τρώνε γαλοπούλα, γέμιση και κολοκυθόπιτα, και πολλοί λένε για τι είναι ευγνώμονες. Το Πίτσμπουργκ λέγεται «City of Bridges» — με πάνω από 400 γέφυρες έχει περισσότερες από σχεδόν κάθε άλλη πόλη του κόσμου.' }
    },

    /* ── B1 · Chicago — Meinungen im Coffee Shop ──────────────────── */
    'b1.cafe': {
      duzen: true,
      deineRolle: { de:'Du sitzt im Dezember in einem Coffee Shop in Chicago. Du findest die Stadt schön und die Klappbrücken über den Fluss großartig. Der Wind ist für dich kälter als der Winter in Turin — und Deep-Dish ist für dich eher ein Kuchen als eine Pizza.', es:'Estás en una cafetería de Chicago en diciembre. La ciudad te parece preciosa y los puentes levadizos sobre el río, increíbles. Para ti el viento es más frío que el invierno de Turín, y la deep-dish es más una tarta que una pizza.', en:'You are in a coffee shop in Chicago in December. You find the city beautiful and the drawbridges over the river amazing. To you the wind is colder than the winter in Turin, and deep-dish is more like a pie than a pizza.', el:'Κάθεσαι σε ένα καφέ στο Σικάγο τον Δεκέμβριο. Βρίσκεις την πόλη όμορφη και τις κινητές γέφυρες πάνω από το ποτάμι καταπληκτικές. Για σένα ο αέρας είναι πιο κρύος από τον χειμώνα στο Τορίνο — και η deep-dish μοιάζει περισσότερο με πίτα παρά με πίτσα.' },
      abrundung: { z:'A pie! Spoken like a true Italian. Okay, okay, the next coffee\'s on me.', na:{ de:'Ein Kuchen! Gesprochen wie eine echte Italienerin. Na gut, der nächste Kaffee geht auf mich.', es:'¡Una tarta! Hablas como una italiana de verdad. Vale, vale, el próximo café lo pago yo.', el:'Πίτα! Μίλησες σαν αληθινή Ιταλίδα. Καλά, καλά, τον επόμενο καφέ τον κερνάω εγώ.' } },
      rollen: {
        spikiu: { de:'Denise, Stammgast und Busfahrerin im Ruhestand', es:'Denise, clienta habitual y conductora de autobús jubilada', en:'Denise, a regular and retired bus driver', el:'η Ντενίζ, τακτική πελάτισσα και συνταξιούχος οδηγός λεωφορείου' },
        lerner: { de:'die Reisende mit dem Skizzenbuch', es:'la viajera del cuaderno de dibujo', en:'the traveler with the sketchbook', el:'η ταξιδιώτισσα με το μπλοκ ζωγραφικής' },
        ort:    { de:'in einem Coffee Shop am Chicago River', es:'en una cafetería junto al río Chicago', en:'in a coffee shop by the Chicago River', el:'σε ένα καφέ δίπλα στον ποταμό του Σικάγο' }
      },
      wortschatz: [
        { z:'a coffee shop',        na:{ de:'das Café', es:'la cafetería', el:'το καφέ' } },
        { z:'a regular',            na:{ de:'der Stammgast', es:'el cliente habitual', el:'ο τακτικός πελάτης' } },
        { z:'a refill',             na:{ de:'das Nachschenken (oft gratis)', es:'otra taza (a menudo gratis)', el:'το ξαναγέμισμα του φλιτζανιού' } },
        { z:'deep-dish pizza',      na:{ de:'die Pizza mit hohem Rand (Chicago)', es:'la pizza de masa alta (Chicago)', el:'η πίτσα σε βαθύ ταψί (Σικάγο)' } },
        { z:'the wind chill',       na:{ de:'die gefühlte Temperatur', es:'la sensación térmica', el:'η αισθητή θερμοκρασία' } },
        { z:'freezing',             na:{ de:'eiskalt', es:'helador', el:'παγωμένος' } },
        { z:'a drawbridge',         na:{ de:'die Klappbrücke', es:'el puente levadizo', el:'η κινητή γέφυρα' } },
        { z:'downtown',             na:{ de:'die Innenstadt', es:'el centro', el:'το κέντρο της πόλης' } },
        { z:'in my opinion',        na:{ de:'meiner Meinung nach', es:'en mi opinión', el:'κατά τη γνώμη μου' } },
        { z:'I believe that …',     na:{ de:'ich glaube, dass …', es:'creo que …', el:'πιστεύω ότι …' } },
        { z:'I don\'t agree.',      na:{ de:'Da bin ich anderer Meinung.', es:'No estoy de acuerdo.', el:'Δεν συμφωνώ.' } },
        { z:'It\'s on me.',         na:{ de:'Das geht auf mich.', es:'Invito yo.', el:'Κερνάω εγώ.' } }
      ],
      dialog: {
        rolle: { de:'Denise, ein Stammgast', es:'Denise, una clienta habitual', el:'Η Ντενίζ, τακτική πελάτισσα' },
        zeilen: [
          { wer:'spikiu', z:'First winter in Chicago, huh? So what do you think of our city so far?', na:{ de:'Dein erster Winter in Chicago, was? Und, wie findest du unsere Stadt bis jetzt?', es:'Tu primer invierno en Chicago, ¿eh? ¿Y qué te parece nuestra ciudad hasta ahora?', el:'Πρώτος χειμώνας στο Σικάγο, ε; Λοιπόν, πώς σου φαίνεται η πόλη μας μέχρι τώρα;' } },
          { wer:'lerner', z:'I think it\'s beautiful. In my opinion, the bridges over the river are amazing.', na:{ de:'Ich finde sie schön. Meiner Meinung nach sind die Brücken über den Fluss großartig.', es:'Me parece preciosa. En mi opinión, los puentes sobre el río son increíbles.', el:'Τη βρίσκω όμορφη. Κατά τη γνώμη μου, οι γέφυρες πάνω από το ποτάμι είναι καταπληκτικές.' } },
          { wer:'spikiu', z:'They are! But that wind off the lake, doesn\'t it drive you crazy?', na:{ de:'Stimmt! Aber dieser Wind vom See — macht der dich nicht verrückt?', es:'¡Lo son! Pero ese viento del lago, ¿no te vuelve loca?', el:'Πράγματι! Αλλά αυτός ο αέρας από τη λίμνη, δεν σε τρελαίνει;' } },
          { wer:'lerner', z:'Yes! Honestly, I believe this wind is colder than the winter in Turin.', na:{ de:'Ja! Ehrlich gesagt glaube ich, dass dieser Wind kälter ist als der Winter in Turin.', es:'¡Sí! La verdad, creo que este viento es más frío que el invierno de Turín.', el:'Ναι! Ειλικρινά, πιστεύω ότι αυτός ο αέρας είναι πιο κρύος από τον χειμώνα στο Τορίνο.' } },
          { wer:'spikiu', z:'Ha! Well, deep-dish pizza fixes everything. Best pizza in the world, right?', na:{ de:'Ha! Na ja, Deep-Dish-Pizza macht alles wieder gut. Die beste Pizza der Welt, oder?', es:'¡Ja! Bueno, la pizza deep-dish lo arregla todo. La mejor pizza del mundo, ¿verdad?', el:'Χα! Ε, η πίτσα deep-dish τα φτιάχνει όλα. Η καλύτερη πίτσα του κόσμου, σωστά;' } },
          { wer:'lerner', z:'Sorry, I don\'t agree. I think it\'s delicious, but it\'s more like a pie.', na:{ de:'Tut mir leid, da bin ich anderer Meinung. Ich finde sie lecker, aber sie ist eher ein Kuchen.', es:'Lo siento, no estoy de acuerdo. Me parece riquísima, pero es más bien una tarta.', el:'Συγγνώμη, δεν συμφωνώ. Τη βρίσκω νοστιμότατη, αλλά μοιάζει περισσότερο με πίτα.' } }
        ]
      },
      lesetext: {
        z:'Chicago has dozens of bridges that lift in the middle, like two hands opening. In spring and fall they go up so that sailboats can pass, and people stop to watch. When I asked for a “takeaway” coffee, the barista smiled: “You mean to go?”',
        na:{ de:'Chicago hat Dutzende Brücken, die sich in der Mitte heben, wie zwei Hände, die sich öffnen. Im Frühling und im Herbst gehen sie hoch, damit Segelboote durchfahren können, und die Leute bleiben stehen und schauen zu. Als ich einen Kaffee „takeaway" bestellte, lächelte der Barista: „Du meinst to go?"', es:'Chicago tiene decenas de puentes que se levantan por el centro, como dos manos que se abren. En primavera y en otoño suben para que pasen los veleros, y la gente se para a mirar. Cuando pedí un café «takeaway», el barista sonrió: «¿Quieres decir to go?».', el:'Το Σικάγο έχει δεκάδες γέφυρες που σηκώνονται στη μέση, σαν δύο χέρια που ανοίγουν. Την άνοιξη και το φθινόπωρο ανεβαίνουν για να περάσουν τα ιστιοφόρα, και ο κόσμος σταματάει να κοιτάξει. Όταν ζήτησα έναν καφέ «takeaway», ο μπαρίστας χαμογέλασε: «Εννοείς to go;»' },
        frage:{ de:'Warum gehen die Brücken hoch?', es:'¿Por qué se levantan los puentes?', el:'Γιατί σηκώνονται οι γέφυρες;' },
        optionen:[
          { na:{ de:'Damit Segelboote durchfahren können', es:'Para que pasen los veleros', el:'Για να περάσουν τα ιστιοφόρα' }, richtig:true },
          { na:{ de:'Wegen des starken Windes', es:'Por el viento fuerte', el:'Εξαιτίας του δυνατού αέρα' }, richtig:false },
          { na:{ de:'Für ein Fest in der Innenstadt', es:'Para una fiesta en el centro', el:'Για μια γιορτή στο κέντρο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag deine Meinung über eine Stadt, die du kennst: etwas, das du liebst, und etwas, bei dem du anderer Meinung bist. Zwei Sätze.', es:'Da tu opinión sobre una ciudad que conoces: algo que te encanta y algo en lo que no estás de acuerdo. Dos frases.', el:'Πες τη γνώμη σου για μια πόλη που ξέρεις: κάτι που λατρεύεις και κάτι με το οποίο δεν συμφωνείς. Δύο προτάσεις.' },
        muster:'In my opinion, Chicago is the most beautiful city on a lake. But I don\'t agree that deep-dish is the best pizza in the world.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'„I think", „I believe", „in my opinion" — und das „that" darfst du weglassen: „I think it\'s beautiful", ohne „dass". Beim Verneinen wandert das „not" nach vorn: „I don\'t think it\'s pizza" klingt natürlicher als „I think it isn\'t pizza" — wie „ich glaube nicht, dass". Höflich widersprechen: „Sorry, I don\'t agree."', es:'«I think», «I believe», «in my opinion»… y el «that» se puede omitir: «I think it\'s beautiful», sin «que». Al negar, el «not» se va delante: «I don\'t think it\'s pizza» suena más natural que «I think it isn\'t pizza», como «no creo que sea pizza», pero sin subjuntivo. Para llevar la contraria con educación: «Sorry, I don\'t agree».', el:'«I think», «I believe», «in my opinion» — και το «that» μπορεί να φύγει: «I think it\'s beautiful», χωρίς «ότι». Στην άρνηση το «not» πάει μπροστά: το «I don\'t think it\'s pizza» ακούγεται πιο φυσικό από το «I think it isn\'t pizza» — όπως το «δεν νομίζω ότι». Για να διαφωνήσεις ευγενικά: «Sorry, I don\'t agree».' },
        beispiele:[
          { z:'In my opinion, the bridges are amazing.', na:{ de:'Meiner Meinung nach sind die Brücken großartig.', es:'En mi opinión, los puentes son increíbles.', el:'Κατά τη γνώμη μου, οι γέφυρες είναι καταπληκτικές.' } },
          { z:'I don\'t think it\'s really pizza.', na:{ de:'Ich glaube nicht, dass das wirklich Pizza ist.', es:'No creo que sea pizza de verdad.', el:'Δεν νομίζω ότι είναι πραγματικά πίτσα.' } }
        ]
      },
      kultur:{ de:'Chicago hat mehr bewegliche Brücken als fast jede andere Stadt der Welt; im Frühling und Herbst werden sie für die Segelboote auf dem Weg zum Michigansee hochgeklappt. Die Deep-Dish-Pizza wird in einer tiefen Form gebacken — der Käse liegt unter der Tomatensoße.', es:'Chicago tiene más puentes móviles que casi cualquier otra ciudad del mundo; en primavera y en otoño se levantan para los veleros que van y vienen del lago Míchigan. La pizza deep-dish se hornea en un molde hondo, con el queso debajo de la salsa de tomate.', el:'Το Σικάγο έχει περισσότερες κινητές γέφυρες από σχεδόν κάθε άλλη πόλη του κόσμου· την άνοιξη και το φθινόπωρο σηκώνονται για τα ιστιοφόρα που πηγαινοέρχονται στη λίμνη Μίσιγκαν. Η πίτσα deep-dish ψήνεται σε βαθύ ταψί — το τυρί μπαίνει κάτω από τη σάλτσα ντομάτας.' }
    },

    /* ── B1 · New Orleans — Mardi Gras im kreolischen Restaurant ──── */
    'b1.restaurant': {
      deineRolle: { de:'Du isst während Mardi Gras mit einer Freundin in einem kreolischen Restaurant in New Orleans. Du hast das Gumbo bestellt, aber der Kellner bringt dir Jambalaya. Beignets hast du noch nie probiert. Am Ende wollt ihr getrennt zahlen.', es:'Estás comiendo con una amiga en un restaurante criollo de Nueva Orleans durante el Mardi Gras. Pediste el gumbo, pero el camarero te trae jambalaya. Nunca has probado los beignets. Al final queréis pagar por separado.', en:'You are eating with a friend at a Creole restaurant in New Orleans during Mardi Gras. You ordered the gumbo, but the server brings you jambalaya. You have never tried beignets. At the end you want to split the check.', el:'Τρως με μια φίλη σε ένα κρεολικό εστιατόριο στη Νέα Ορλεάνη την περίοδο του Mardi Gras. Παρήγγειλες γκάμπο, αλλά ο σερβιτόρος σού φέρνει τζαμπαλάγια. Δεν έχεις δοκιμάσει ποτέ beignets. Στο τέλος θέλετε να πληρώσετε χωριστά.' },
      abrundung: { z:'Absolutely, two checks coming up. And watch out, that sugar gets everywhere!', na:{ de:'Selbstverständlich, zwei Rechnungen kommen sofort. Und Vorsicht, der Zucker landet überall!', es:'Por supuesto, dos cuentas enseguida. Y cuidado, ¡ese azúcar acaba por todas partes!', el:'Βεβαίως, δύο λογαριασμοί έρχονται. Και προσοχή, αυτή η ζάχαρη πάει παντού!' } },
      rollen: {
        spikiu: { de:'der Kellner Marcus', es:'el camarero, Marcus', en:'Marcus, the server', el:'ο σερβιτόρος, ο Μάρκους' },
        lerner: { de:'der Gast mit dem falschen Teller', es:'la clienta a la que le traen otro plato', en:'the guest who got the wrong dish', el:'η πελάτισσα που πήρε λάθος πιάτο' },
        ort:    { de:'in einem kreolischen Restaurant im French Quarter', es:'en un restaurante criollo del Barrio Francés', en:'in a Creole restaurant in the French Quarter', el:'σε ένα κρεολικό εστιατόριο στη Γαλλική Συνοικία' }
      },
      wortschatz: [
        { z:'the server',           na:{ de:'der Kellner, die Bedienung', es:'el camarero', el:'ο σερβιτόρος' } },
        { z:'gumbo',                na:{ de:'Gumbo (dicker Eintopf aus Louisiana)', es:'el gumbo (guiso espeso de Luisiana)', el:'το γκάμπο (πηχτό φαγητό της Λουιζιάνας)' } },
        { z:'beignets',             na:{ de:'Beignets (Krapfen mit Puderzucker)', es:'los beignets (buñuelos con azúcar glas)', el:'τα beignets (τηγανητά ζυμαράκια με άχνη)' } },
        { z:'powdered sugar',       na:{ de:'der Puderzucker', es:'el azúcar glas', el:'η ζάχαρη άχνη' } },
        { z:'spicy',                na:{ de:'scharf', es:'picante', el:'πικάντικος' } },
        { z:'a mistake',            na:{ de:'der Fehler, das Versehen', es:'el error, la equivocación', el:'το λάθος' } },
        { z:'I ordered …',          na:{ de:'ich habe … bestellt', es:'pedí …', el:'παρήγγειλα …' } },
        { z:'I\'ve never tried …',  na:{ de:'ich habe noch nie … probiert', es:'nunca he probado …', el:'δεν έχω δοκιμάσει ποτέ …' } },
        { z:'to split the check',   na:{ de:'getrennt zahlen', es:'pagar por separado', el:'πληρώνουμε χωριστά' } },
        { z:'the tip',              na:{ de:'das Trinkgeld', es:'la propina', el:'το φιλοδώρημα' } },
        { z:'to fix',               na:{ de:'in Ordnung bringen', es:'arreglar', el:'διορθώνω' } },
        { z:'my bad',               na:{ de:'mein Fehler (locker)', es:'culpa mía', el:'δικό μου λάθος' } }
      ],
      dialog: {
        rolle: { de:'Der Kellner Marcus', es:'El camarero, Marcus', el:'Ο σερβιτόρος, ο Μάρκους' },
        zeilen: [
          { wer:'spikiu', z:'Here you go, one jambalaya, nice and hot. Can I get you anything else?', na:{ de:'Bitte schön, einmal Jambalaya, schön heiß. Darf ich Ihnen noch etwas bringen?', es:'Aquí tiene, una jambalaya bien calentita. ¿Le traigo algo más?', el:'Ορίστε, μία τζαμπαλάγια, ζεστή ζεστή. Να σας φέρω κάτι άλλο;' } },
          { wer:'lerner', z:'I\'m sorry, but I think there\'s been a mistake. I ordered the gumbo.', na:{ de:'Entschuldigung, aber ich glaube, da ist ein Fehler passiert. Ich habe das Gumbo bestellt.', es:'Perdone, pero creo que ha habido un error. Pedí el gumbo.', el:'Συγγνώμη, αλλά νομίζω ότι έγινε λάθος. Παρήγγειλα το γκάμπο.' } },
          { wer:'spikiu', z:'Oh, my bad! I\'ll fix that right away. Your gumbo will be out in five minutes.', na:{ de:'Oh, mein Fehler! Ich bringe das sofort in Ordnung. Ihr Gumbo kommt in fünf Minuten.', es:'¡Uy, culpa mía! Lo arreglo ahora mismo. Su gumbo sale en cinco minutos.', el:'Ωχ, δικό μου λάθος! Το διορθώνω αμέσως. Το γκάμπο σας έρχεται σε πέντε λεπτά.' } },
          { wer:'lerner', z:'No problem. Oh, and I\'ve never tried beignets. What are they exactly?', na:{ de:'Kein Problem. Ach, und ich habe noch nie Beignets probiert. Was ist das genau?', es:'No pasa nada. Ah, y nunca he probado los beignets. ¿Qué son exactamente?', el:'Κανένα πρόβλημα. Α, και δεν έχω δοκιμάσει ποτέ beignets. Τι ακριβώς είναι;' } },
          { wer:'spikiu', z:'Fried dough under a mountain of powdered sugar. Best with a café au lait.', na:{ de:'Frittierter Teig unter einem Berg Puderzucker. Am besten mit einem Milchkaffee.', es:'Masa frita bajo una montaña de azúcar glas. Lo mejor, con un café con leche.', el:'Τηγανητή ζύμη κάτω από ένα βουνό ζάχαρη άχνη. Ταιριάζει τέλεια με έναν καφέ με γάλα.' } },
          { wer:'lerner', z:'Sounds perfect. We\'ll have two, and could we split the check, please?', na:{ de:'Klingt perfekt. Wir nehmen zwei, und könnten wir bitte getrennt zahlen?', es:'Suena perfecto. Tomaremos dos, y ¿podríamos pagar por separado, por favor?', el:'Τέλεια. Θα πάρουμε δύο, και θα μπορούσαμε να πληρώσουμε χωριστά, παρακαλώ;' } }
        ]
      },
      lesetext: {
        z:'New Orleans in February is pure music: brass bands, parades, and people catching colorful beads from the floats. Marcus explained that here you tip about twenty percent, because servers earn most of their money from tips. When I asked for “the bill”, he winked: “The check, you mean? Coming right up!”',
        na:{ de:'New Orleans im Februar ist reine Musik: Blaskapellen, Umzüge und Menschen, die bunte Perlenketten von den Wagen fangen. Marcus hat mir erklärt, dass man hier etwa zwanzig Prozent Trinkgeld gibt, weil Kellner das meiste Geld durch Trinkgeld verdienen. Als ich nach „the bill" fragte, zwinkerte er: „Sie meinen the check? Kommt sofort!"', es:'Nueva Orleans en febrero es pura música: bandas de metales, desfiles y gente que atrapa collares de colores lanzados desde las carrozas. Marcus me explicó que aquí se deja un veinte por ciento de propina, porque los camareros ganan casi todo su dinero con las propinas. Cuando pedí «the bill», me guiñó un ojo: «¿Quiere decir the check? ¡Enseguida!».', el:'Η Νέα Ορλεάνη τον Φεβρουάριο είναι σκέτη μουσική: χάλκινες μπάντες, παρελάσεις και κόσμος που πιάνει πολύχρωμα κολιέ από τα άρματα. Ο Μάρκους μού εξήγησε ότι εδώ αφήνεις περίπου είκοσι τοις εκατό φιλοδώρημα, γιατί οι σερβιτόροι βγάζουν τα περισσότερα χρήματά τους από τα φιλοδωρήματα. Όταν ζήτησα «the bill», μου έκλεισε το μάτι: «Το check εννοείτε; Έρχεται αμέσως!»' },
        frage:{ de:'Wie viel Trinkgeld gibt man hier ungefähr?', es:'¿Cuánta propina se suele dejar aquí?', el:'Πόσο φιλοδώρημα αφήνει κανείς εδώ περίπου;' },
        optionen:[
          { na:{ de:'Etwa zwanzig Prozent', es:'Alrededor del veinte por ciento', el:'Περίπου είκοσι τοις εκατό' }, richtig:true },
          { na:{ de:'Gar keins, es ist schon im Preis', es:'Nada, ya está incluida en el precio', el:'Καθόλου, περιλαμβάνεται ήδη στην τιμή' }, richtig:false },
          { na:{ de:'Immer genau fünf Dollar', es:'Siempre cinco dólares exactos', el:'Πάντα ακριβώς πέντε δολάρια' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Reklamiere höflich ein falsches Gericht und sag, was du noch nie probiert hast. Zwei Sätze.', es:'Reclama con educación un plato equivocado y di qué no has probado nunca. Dos frases.', el:'Κάνε ένα ευγενικό παράπονο για λάθος πιάτο και πες τι δεν έχεις δοκιμάσει ποτέ. Δύο προτάσεις.' },
        muster:'Excuse me, I think there\'s been a mistake. I ordered the fish. I\'ve never tried gumbo, so I\'d love to taste it next time.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Für Lebenserfahrung ohne Zeitpunkt nimmt Englisch das Present Perfect: „I\'ve never tried beignets", „Have you ever been to New Orleans?". Sobald ein Zeitpunkt da ist oder ein abgeschlossener Moment, kommt das Simple Past: „I ordered the gumbo" (vorhin). Deutsch sagt beides mit „habe … bestellt". Höflich reklamieren: „I\'m sorry, but I think there\'s been a mistake" — das „I think" polstert.', es:'Para la experiencia vital sin momento concreto, el inglés usa el present perfect: «I\'ve never tried beignets», «Have you ever been to New Orleans?», igual que el «nunca he probado» de España. En cuanto hay un momento cerrado, va el pasado simple: «I ordered the gumbo» (hace un rato). Para reclamar con educación: «I\'m sorry, but I think there\'s been a mistake»; el «I think» suaviza.', el:'Για εμπειρίες ζωής χωρίς συγκεκριμένο χρόνο, τα αγγλικά βάζουν present perfect: «I\'ve never tried beignets», «Have you ever been to New Orleans?» — όπως το «δεν έχω δοκιμάσει ποτέ». Μόλις υπάρχει μια κλειστή στιγμή, μπαίνει ο απλός παρελθοντικός: «I ordered the gumbo» (πριν από λίγο). Για ευγενικό παράπονο: «I\'m sorry, but I think there\'s been a mistake» — το «I think» μαλακώνει.' },
        beispiele:[
          { z:'I\'ve never tried beignets.', na:{ de:'Ich habe noch nie Beignets probiert.', es:'Nunca he probado los beignets.', el:'Δεν έχω δοκιμάσει ποτέ beignets.' } },
          { z:'I\'m sorry, but I think there\'s been a mistake.', na:{ de:'Entschuldigung, aber ich glaube, da ist ein Fehler passiert.', es:'Perdone, pero creo que ha habido un error.', el:'Συγγνώμη, αλλά νομίζω ότι έγινε λάθος.' } }
        ]
      },
      kultur:{ de:'In den USA ist das Trinkgeld nicht im Preis enthalten: Im Restaurant gibt man meist 18 bis 20 Prozent, weil Kellner davon leben. Die Brücke Crescent City Connection überquert den Mississippi genau dort, wo der Fluss sich wie eine Mondsichel biegt — daher der Spitzname von New Orleans: „Crescent City".', es:'En Estados Unidos la propina no está incluida: en un restaurante se suele dejar entre el 18 y el 20 por ciento, porque los camareros viven de ella. El puente Crescent City Connection cruza el Misisipi justo donde el río se curva como una luna creciente; de ahí el apodo de Nueva Orleans: «Crescent City».', el:'Στις ΗΠΑ το φιλοδώρημα δεν περιλαμβάνεται στην τιμή: στο εστιατόριο αφήνεις συνήθως 18 με 20 τοις εκατό, γιατί οι σερβιτόροι ζουν από αυτό. Η γέφυρα Crescent City Connection διασχίζει τον Μισισιπή ακριβώς εκεί όπου το ποτάμι λυγίζει σαν μισοφέγγαρο — από εκεί και το παρατσούκλι της Νέας Ορλεάνης: «Crescent City».' }
    },

    /* ── B1 · Austin, Texas — Fledermäuse und Tornado-Vorwarnung ──── */
    'b1.wetter': {
      deineRolle: { de:'Du bist in Austin und willst heute Abend sehen, wie die Fledermäuse unter der Congress Avenue Bridge ausfliegen. Es gibt eine Tornado-Vorwarnung. Wenn daraus eine echte Warnung wird, gehst du sofort ins Hotel zurück — und kommst morgen Abend wieder.', es:'Estás en Austin y esta noche quieres ver cómo salen los murciélagos de debajo del puente de Congress Avenue. Hay un aviso de posibles tornados. Si se convierte en alerta, volverás enseguida al hotel, y vendrás de nuevo mañana por la noche.', en:'You are in Austin and want to watch the bats fly out from under the Congress Avenue Bridge tonight. There is a tornado watch. If it turns into a warning, you will go straight back to your hotel and come back tomorrow night.', el:'Είσαι στο Ώστιν και θέλεις απόψε να δεις τις νυχτερίδες να βγαίνουν κάτω από τη γέφυρα Congress Avenue. Υπάρχει προειδοποίηση πιθανότητας ανεμοστρόβιλου. Αν γίνει κανονική προειδοποίηση, θα γυρίσεις αμέσως στο ξενοδοχείο — και θα ξανάρθεις αύριο βράδυ.' },
      abrundung: { z:'That\'s the spirit. Tomorrow at sunset, right here. Bring your sketchbook, and stay safe tonight!', na:{ de:'So gefällt mir das. Morgen bei Sonnenuntergang, genau hier. Bringen Sie Ihr Skizzenbuch mit — und passen Sie heute Nacht auf sich auf!', es:'¡Así me gusta! Mañana al atardecer, aquí mismo. Traiga su cuaderno de dibujo, ¡y cuídese esta noche!', el:'Έτσι μπράβο. Αύριο στο ηλιοβασίλεμα, ακριβώς εδώ. Φέρτε το μπλοκ σας — και να προσέχετε απόψε!' } },
      rollen: {
        spikiu: { de:'die Rangerin Becky', es:'Becky, la guarda del parque', en:'Becky, the park ranger', el:'η Μπέκι, η φύλακας του πάρκου' },
        lerner: { de:'die Reisende, die die Fledermäuse sehen will', es:'la viajera que quiere ver los murciélagos', en:'the traveler who wants to see the bats', el:'η ταξιδιώτισσα που θέλει να δει τις νυχτερίδες' },
        ort:    { de:'am Ufer des Lady Bird Lake, unter der Congress Avenue Bridge', es:'en la orilla del lago Lady Bird, bajo el puente de Congress Avenue', en:'on the shore of Lady Bird Lake, by the Congress Avenue Bridge', el:'στην όχθη της λίμνης Lady Bird, κάτω από τη γέφυρα Congress Avenue' }
      },
      wortschatz: [
        { z:'a tornado watch',      na:{ de:'die Tornado-Vorwarnung (Tornados möglich)', es:'el aviso de posibles tornados', el:'η προειδοποίηση πιθανότητας ανεμοστρόβιλου' } },
        { z:'a tornado warning',    na:{ de:'die Tornado-Warnung (akute Gefahr)', es:'la alerta de tornado (peligro inmediato)', el:'η προειδοποίηση για ανεμοστρόβιλο (άμεσος κίνδυνος)' } },
        { z:'to take cover',        na:{ de:'Schutz suchen', es:'ponerse a cubierto', el:'βρίσκω καταφύγιο' } },
        { z:'a thunderstorm',       na:{ de:'das Gewitter', es:'la tormenta', el:'η καταιγίδα' } },
        { z:'hail',                 na:{ de:'der Hagel', es:'el granizo', el:'το χαλάζι' } },
        { z:'the weather service',  na:{ de:'der Wetterdienst', es:'el servicio meteorológico', el:'η μετεωρολογική υπηρεσία' } },
        { z:'a bat',                na:{ de:'die Fledermaus', es:'el murciélago', el:'η νυχτερίδα' } },
        { z:'at sunset',            na:{ de:'bei Sonnenuntergang', es:'al atardecer', el:'στο ηλιοβασίλεμα' } },
        { z:'if it turns into …',   na:{ de:'wenn daraus … wird', es:'si se convierte en …', el:'αν γίνει …' } },
        { z:'I\'m going to …',      na:{ de:'ich habe vor, … / ich werde …', es:'voy a …', el:'σκοπεύω να … / θα …' } },
        { z:'Stay safe!',           na:{ de:'Pass auf dich auf!', es:'¡Cuídate!', el:'Να προσέχεις!' } },
        { z:'Heads up!',            na:{ de:'Achtung! / Nur zur Info!', es:'¡Ojo!', el:'Για να ξέρεις!' } }
      ],
      dialog: {
        rolle: { de:'Die Rangerin Becky', es:'Becky, la guarda del parque', el:'Η Μπέκι, η φύλακας του πάρκου' },
        zeilen: [
          { wer:'spikiu', z:'Evening! Heads up: the weather service just issued a tornado watch for tonight.', na:{ de:'Guten Abend! Nur zur Info: Der Wetterdienst hat gerade eine Tornado-Vorwarnung für heute Abend herausgegeben.', es:'¡Buenas tardes! Ojo: el servicio meteorológico acaba de emitir un aviso de posibles tornados para esta noche.', el:'Καλησπέρα! Για να ξέρετε: η μετεωρολογική υπηρεσία μόλις έβγαλε προειδοποίηση πιθανότητας ανεμοστρόβιλου για απόψε.' } },
          { wer:'lerner', z:'I\'m going to watch the bats tonight. What exactly does a tornado watch mean?', na:{ de:'Ich will heute Abend die Fledermäuse anschauen. Was bedeutet eine Tornado-Vorwarnung genau?', es:'Esta noche voy a ver los murciélagos. ¿Qué significa exactamente un aviso de tornado?', el:'Απόψε θα δω τις νυχτερίδες. Τι ακριβώς σημαίνει «tornado watch»;' } },
          { wer:'spikiu', z:'A watch means a tornado could form. A warning means one has been seen. Take cover!', na:{ de:'Eine Vorwarnung heißt: Ein Tornado könnte entstehen. Eine Warnung heißt: Einer wurde gesichtet. Dann Schutz suchen!', es:'Un aviso significa que se podría formar un tornado. Una alerta significa que ya se ha visto uno. ¡A cubierto!', el:'«Watch» σημαίνει ότι μπορεί να σχηματιστεί ανεμοστρόβιλος. «Warning» σημαίνει ότι έχει ήδη εμφανιστεί. Τότε βρείτε καταφύγιο!' } },
          { wer:'lerner', z:'Okay. If it turns into a warning, I\'ll go back to my hotel right away.', na:{ de:'Okay. Wenn daraus eine Warnung wird, gehe ich sofort zurück ins Hotel.', es:'Vale. Si se convierte en alerta, volveré al hotel enseguida.', el:'Εντάξει. Αν γίνει «warning», θα γυρίσω αμέσως στο ξενοδοχείο μου.' } },
          { wer:'spikiu', z:'Smart. And the bats will come out tomorrow too, all one and a half million of them.', na:{ de:'Klug. Und die Fledermäuse fliegen morgen auch aus — alle anderthalb Millionen.', es:'Muy bien pensado. Y los murciélagos saldrán también mañana, el millón y medio entero.', el:'Σωστά. Και οι νυχτερίδες θα βγουν και αύριο — και τα ενάμισι εκατομμύριο.' } },
          { wer:'lerner', z:'Then I\'ll come back tomorrow night. I\'m not going to miss them!', na:{ de:'Dann komme ich morgen Abend wieder. Die lasse ich mir nicht entgehen!', es:'Entonces volveré mañana por la noche. ¡No me los voy a perder!', el:'Τότε θα ξανάρθω αύριο βράδυ. Δεν πρόκειται να τις χάσω!' } }
        ]
      },
      lesetext: {
        z:'From spring to fall, about one and a half million bats fly out from under the Congress Avenue Bridge every evening, like a river of smoke over the water. Becky says they eat tons of insects every night. When I said I would wait in the “car park”, she laughed: “The parking lot, hon! And not tonight, the weather\'s just nasty!”',
        na:{ de:'Vom Frühling bis zum Herbst fliegen jeden Abend etwa anderthalb Millionen Fledermäuse unter der Congress Avenue Bridge hervor, wie ein Fluss aus Rauch über dem Wasser. Becky sagt, sie fressen jede Nacht tonnenweise Insekten. Als ich sagte, ich würde auf dem „car park" warten, lachte sie: „Auf dem parking lot, Schätzchen! Und nicht heute Abend — das Wetter ist einfach nasty!"', es:'De primavera a otoño, cada tarde alrededor de un millón y medio de murciélagos salen de debajo del puente de Congress Avenue, como un río de humo sobre el agua. Becky dice que cada noche se comen toneladas de insectos. Cuando dije que esperaría en el «car park», se rio: «¡En el parking lot, cariño! Y esta noche no: ¡el tiempo es simplemente nasty!».', el:'Από την άνοιξη ως το φθινόπωρο, κάθε βράδυ περίπου ενάμισι εκατομμύριο νυχτερίδες βγαίνουν κάτω από τη γέφυρα Congress Avenue, σαν ποτάμι από καπνό πάνω από το νερό. Η Μπέκι λέει ότι τρώνε τόνους έντομα κάθε νύχτα. Όταν είπα ότι θα περιμένω στο «car park», γέλασε: «Στο parking lot, χρυσό μου! Κι όχι απόψε — ο καιρός είναι απλώς nasty!»' },
        frage:{ de:'Wie sehen die Fledermäuse aus, wenn sie ausfliegen?', es:'¿Cómo se ven los murciélagos cuando salen?', el:'Με τι μοιάζουν οι νυχτερίδες όταν βγαίνουν;' },
        optionen:[
          { na:{ de:'Wie ein Fluss aus Rauch', es:'Como un río de humo', el:'Σαν ποτάμι από καπνό' }, richtig:true },
          { na:{ de:'Wie fallende Blätter', es:'Como hojas que caen', el:'Σαν φύλλα που πέφτουν' }, richtig:false },
          { na:{ de:'Wie Vögel bei Sonnenaufgang', es:'Como pájaros al amanecer', el:'Σαν πουλιά την ανατολή' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib einer Freundin, was du morgen vorhast und was du machst, wenn es regnet. Zwei Sätze.', es:'Escribe a una amiga qué vas a hacer mañana y qué harás si llueve. Dos frases.', el:'Γράψε σε μια φίλη τι σκοπεύεις να κάνεις αύριο και τι θα κάνεις αν βρέξει. Δύο προτάσεις.' },
        muster:'Tomorrow I\'m going to visit the bridge. If it rains, I\'ll go to a museum instead.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'„I\'m going to watch the bats" ist ein Plan, der schon steht. „I\'ll come back tomorrow" ist eine Entscheidung im Moment oder ein Versprechen. Im Wenn-Satz steht Präsens, nie „will": „If it turns into a warning, I\'ll go back" — genau wie im Deutschen: „Wenn es … wird, gehe ich".', es:'«I\'m going to watch the bats» es un plan ya decidido, como «voy a ver». «I\'ll come back tomorrow» es una decisión del momento o una promesa: «volveré». Después de «if» va presente, nunca «will»: «If it turns into a warning, I\'ll go back», igual que en español: «Si se convierte…, volveré».', el:'Το «I\'m going to watch the bats» είναι σχέδιο που έχει ήδη αποφασιστεί. Το «I\'ll come back tomorrow» είναι απόφαση της στιγμής ή υπόσχεση. Μετά το «if» μπαίνει ενεστώτας, ποτέ «will»: «If it turns into a warning, I\'ll go back» — όπως στα ελληνικά δεν λέμε «αν θα γίνει», αλλά «αν γίνει, θα γυρίσω».' },
        beispiele:[
          { z:'I\'m going to watch the bats tonight.', na:{ de:'Heute Abend schaue ich mir die Fledermäuse an.', es:'Esta noche voy a ver los murciélagos.', el:'Απόψε θα δω τις νυχτερίδες.' } },
          { z:'If it rains, I\'ll stay at the hotel.', na:{ de:'Wenn es regnet, bleibe ich im Hotel.', es:'Si llueve, me quedaré en el hotel.', el:'Αν βρέξει, θα μείνω στο ξενοδοχείο.' } }
        ]
      },
      kultur:{ de:'Unter der Congress Avenue Bridge in Austin lebt die größte Fledermauskolonie mitten in einer Stadt in Nordamerika: etwa anderthalb Millionen Mexikanische Bulldoggfledermäuse, von März bis Oktober. Im Frühling ändert sich das Wetter in Texas schnell: „watch" heißt „sei bereit", „warning" heißt „sofort Schutz suchen".', es:'Bajo el puente de Congress Avenue, en Austin, vive la mayor colonia urbana de murciélagos de Norteamérica: alrededor de un millón y medio de murciélagos de cola libre mexicanos, de marzo a octubre. En primavera el tiempo en Texas cambia muy rápido: «watch» significa «estate preparado», «warning» significa «ponte a cubierto ya».', el:'Κάτω από τη γέφυρα Congress Avenue στο Ώστιν ζει η μεγαλύτερη αστική αποικία νυχτερίδων στη Βόρεια Αμερική: περίπου ενάμισι εκατομμύριο μεξικανικές νυχτερίδες, από τον Μάρτιο ως τον Οκτώβριο. Την άνοιξη ο καιρός στο Τέξας αλλάζει γρήγορα: «watch» σημαίνει «να είσαι έτοιμος», «warning» σημαίνει «βρες αμέσως καταφύγιο».' }
    }
  }
};

var K_LP_B = {

  schritt: {
    einkaufen:       { de:'Santa Fe: vergleichen und nach dem Preis fragen', es:'Santa Fe: comparar y preguntar por el precio', el:'Σάντα Φε: συγκρίνεις και ρωτάς για την τιμή' },
    wegbeschreibung: { de:'Grand Canyon: einen Rat verstehen und weitergeben', es:'Gran Cañón: entender un consejo y transmitirlo', el:'Γκραντ Κάνιον: καταλαβαίνεις μια συμβουλή και τη μεταφέρεις' },
    taxi:            { de:'San Francisco: plaudern, was wäre, wenn …', es:'San Francisco: charlar sobre «¿y si…?»', el:'Σαν Φρανσίσκο: κουβέντα για το «τι θα γινόταν αν …»' },
    arzt:            { de:'Seattle: seit wann, und was du tun sollst', es:'Seattle: desde cuándo y qué debes hacer', el:'Σιάτλ: από πότε, και τι πρέπει να κάνεις' },
    bahnhof:         { de:'Seattle → Vancouver: der Zug ist schon weg', es:'Seattle → Vancouver: el tren ya se ha ido', el:'Σιάτλ → Βανκούβερ: το τρένο έχει ήδη φύγει' }
  },

  aufgaben: {
    'b1.einkaufen': [
      { de:'Sag, dass sie wunderschön sind, und frag, ob der Stein in diesem Armband echter Türkis ist', es:'Di que son preciosas y pregunta si la piedra de esta pulsera es turquesa auténtica', en:'Say they are beautiful and ask whether the stone in this bracelet is real turquoise', el:'Πες ότι είναι πανέμορφα και ρώτα αν η πέτρα σε αυτό το βραχιόλι είναι αληθινό τιρκουάζ' },
      { de:'Sag, dass das Armband schöner ist als der Ring, dir aber ein bisschen zu teuer', es:'Di que la pulsera es más bonita que el anillo, pero un poco cara para ti', en:'Say the bracelet is nicer than the ring, but a little too expensive for you', el:'Πες ότι το βραχιόλι είναι πιο ωραίο από το δαχτυλίδι, αλλά λίγο ακριβό για σένα' },
      { de:'Frag höflich, ob beim Preis Spielraum ist, und sag, dass du nur hundert Dollar in bar hast', es:'Pregunta con cortesía si hay margen en el precio y di que solo llevas cien dólares en efectivo', en:'Politely ask whether there is any flexibility on the price and say you only have a hundred in cash', el:'Ρώτα ευγενικά αν υπάρχει ευελιξία στην τιμή και πες ότι έχεις μόνο εκατό δολάρια μετρητά' }
    ],
    'b1.wegbeschreibung': [
      { de:'Bejahe — der Bright Angel Trail — und frag, wie weit du an einem Tag hinuntergehen kannst', es:'Di que sí, el sendero Bright Angel, y pregunta hasta dónde puedes bajar en un día', en:'Say yes, the Bright Angel Trail, and ask how far down you can go in one day', el:'Πες ναι, το μονοπάτι Bright Angel, και ρώτα πόσο χαμηλά μπορείς να κατέβεις σε μία μέρα' },
      { de:'Fasse mit „you said" zusammen: vor sieben losgehen und am Three-Mile umkehren', es:'Resume con «you said»: salir antes de las siete y darte la vuelta en el Three-Mile', en:'Sum up with "you said": start before seven and turn around at Three-Mile', el:'Συνόψισε με «you said»: ξεκίνημα πριν από τις εφτά και επιστροφή στο Three-Mile' },
      { de:'Sag, dass du verstanden hast und deinem Lektor in Mailand erzählst, dass dir ein Ranger geraten hat, früh loszugehen', es:'Di que lo has entendido y que le contarás a tu editor de Milán que un guarda del parque te dijo que salieras temprano', en:'Say you understand and that you will tell your editor in Milan a ranger told you to start early', el:'Πες ότι κατάλαβες και ότι θα πεις στον εκδότη σου στο Μιλάνο ότι ένας δασοφύλακας σού είπε να ξεκινήσεις νωρίς' }
    ],
    'b1.taxi': [
      { de:'Frag, wer Karl ist, und sag, dass du in diesem Nebel nichts siehst, nicht mal die Brücke', es:'Pregunta quién es Karl y di que no ves nada con esta niebla, ni siquiera el puente', en:'Ask who Karl is and say you can\'t see anything in this fog, not even the bridge', el:'Ρώτα ποιος είναι ο Καρλ και πες ότι δεν βλέπεις τίποτα μέσα σε αυτή την ομίχλη, ούτε καν τη γέφυρα' },
      { de:'Sag: Wenn du mehr Zeit hättest, würdest du auf die Sonne warten und die Brücke zeichnen', es:'Di que, si tuvieras más tiempo, esperarías al sol y dibujarías el puente', en:'Say that if you had more time, you would wait for the sun and draw the bridge', el:'Πες ότι, αν είχες περισσότερο χρόνο, θα περίμενες τον ήλιο και θα σχεδίαζες τη γέφυρα' },
      { de:'Sag: vielleicht — wenn du hier arbeiten würdest, würdest du am Wasser wohnen, mit oder ohne Nebel', es:'Di que quizá: si trabajaras aquí, vivirías cerca del agua, con niebla o sin ella', en:'Say maybe: if you worked here, you would live near the water, fog or no fog', el:'Πες ίσως: αν δούλευες εδώ, θα έμενες κοντά στο νερό, με ομίχλη ή χωρίς' }
    ],
    'b1.arzt': [
      { de:'Sag, dass du auf einem Weg am Mount Rainier umgeknickt bist und der Knöchel seit Sonntag geschwollen ist', es:'Di que te lo torciste en un sendero del monte Rainier y que está hinchado desde el domingo', en:'Say you twisted it on a trail at Mount Rainier and it has been swollen since Sunday', el:'Πες ότι τον στραμπούληξες σε ένα μονοπάτι στο όρος Ρενιέ και ότι είναι πρησμένος από την Κυριακή' },
      { de:'Sag, dass du ein bisschen gehen kannst, es aber wehtut, und dass du seit zwei Tagen Ibuprofen nimmst', es:'Di que puedes caminar un poco pero te duele, y que llevas dos días tomando ibuprofeno', en:'Say you can walk a little but it hurts, and that you have been taking ibuprofen for two days', el:'Πες ότι μπορείς να περπατήσεις λίγο αλλά πονάει, και ότι παίρνεις ιβουπροφαίνη εδώ και δύο μέρες' },
      { de:'Frag, ob du den Fuß ganz schonen musst, und sag, dass du am Freitag einen Zug nach Vancouver hast', es:'Pregunta si tienes que dejar de apoyarlo del todo y di que el viernes tienes un tren a Vancouver', en:'Ask whether you have to stay off it completely and say you have a train to Vancouver on Friday', el:'Ρώτα αν πρέπει να μην πατάς καθόλου και πες ότι την Παρασκευή έχεις τρένο για το Βανκούβερ' }
    ],
    'b1.bahnhof': [
      { de:'Sag, dass du mit deinem verletzten Knöchel zu langsam warst und der Zug schon abgefahren war', es:'Di que con el tobillo mal has ido demasiado lenta y que el tren ya había salido', en:'Say that with your bad ankle you were too slow, and the train had already left', el:'Πες ότι με τον χτυπημένο αστράγαλο ήσουν πολύ αργή και ότι το τρένο είχε ήδη φύγει' },
      { de:'Sag, dass das in Ordnung ist, und frag, ob du den Pass im Zug brauchst oder nur an der Grenze', es:'Di que no pasa nada y pregunta si necesitas el pasaporte en el tren o solo en la frontera', en:'Say that is fine and ask whether you need your passport on the train or only at the border', el:'Πες ότι δεν πειράζει και ρώτα αν χρειάζεσαι το διαβατήριο στο τρένο ή μόνο στα σύνορα' },
      { de:'Sag: nur einen Koffer — deine Skizzenbücher behältst du bei dir, sie sind dein ganzes Jahr', es:'Di que solo una maleta y que los cuadernos de dibujo van contigo, porque son todo tu año', en:'Say just one suitcase, and that your sketchbooks stay with you because they are your whole year', el:'Πες μόνο μία βαλίτσα, και ότι τα μπλοκ σχεδίου σου μένουν μαζί σου, γιατί είναι όλη σου η χρονιά' }
    ]
  },

  stationen: {

    /* ── B1 · Santa Fe, New Mexico — Türkis unter dem Portal (Apr) ───── */
    'b1.einkaufen': {
      deineRolle: { de:'Du bist Giulia. An der Plaza von Santa Fe verkauft ein Künstler aus einem Pueblo Silberschmuck mit Türkis. Das Armband gefällt dir besser als der Ring, ist dir aber etwas zu teuer. Du hast nur hundert Dollar in bar.', es:'Eres Giulia. En la plaza de Santa Fe, un artista de un pueblo indígena vende joyas de plata con turquesa. La pulsera te gusta más que el anillo, pero es un poco cara para ti. Solo llevas cien dólares en efectivo.', en:'You are Giulia. On the plaza in Santa Fe, a Pueblo artist sells silver jewelry with turquoise. You like the bracelet more than the ring, but it\'s a little too expensive. You only have a hundred dollars in cash.', el:'Είσαι η Τζούλια. Στην πλατεία της Σάντα Φε ένας καλλιτέχνης από ένα πουέμπλο πουλάει ασημένια κοσμήματα με τιρκουάζ. Το βραχιόλι σού αρέσει περισσότερο από το δαχτυλίδι, αλλά είναι λίγο ακριβό για σένα. Έχεις μόνο εκατό δολάρια μετρητά.' },
      abrundung: { z:'For cash? Okay, a hundred. Let me put it in a little box for you.', na:{ de:'In bar? Na gut, hundert. Ich lege es Ihnen in ein kleines Kästchen.', es:'¿En efectivo? Vale, cien. Se la pongo en una cajita.', el:'Μετρητά; Εντάξει, εκατό. Να σας το βάλω σε ένα κουτάκι.' } },
      rollen: {
        spikiu: { de:'Mr. Naranjo, Silberschmied aus einem Pueblo', es:'el señor Naranjo, platero de un pueblo indígena', en:'Mr. Naranjo, a silversmith from a pueblo', el:'ο κύριος Ναράνχο, ασημουργός από ένα πουέμπλο' },
        lerner: { de:'Giulia, die Ingenieurin', es:'Giulia, la ingeniera', en:'Giulia, the engineer', el:'η Τζούλια, η μηχανικός' },
        ort:    { de:'unter dem Portal an der Plaza von Santa Fe', es:'bajo los soportales de la plaza de Santa Fe', en:'under the portal on the Santa Fe Plaza', el:'κάτω από τη στοά στην πλατεία της Σάντα Φε' }
      },
      wortschatz: [
        { z:'turquoise', na:{ de:'der Türkis', es:'la turquesa', el:'το τιρκουάζ' } },
        { z:'handmade', na:{ de:'handgemacht', es:'hecho a mano', el:'χειροποίητος' } },
        { z:'silver', na:{ de:'das Silber', es:'la plata', el:'το ασήμι' } },
        { z:'a bracelet', na:{ de:'das Armband', es:'la pulsera', el:'το βραχιόλι' } },
        { z:'a ring', na:{ de:'der Ring', es:'el anillo', el:'το δαχτυλίδι' } },
        { z:'nicer than', na:{ de:'schöner als', es:'más bonito que', el:'πιο ωραίος από' } },
        { z:'too expensive', na:{ de:'zu teuer', es:'demasiado caro', el:'υπερβολικά ακριβός' } },
        { z:'enough money', na:{ de:'genug Geld', es:'suficiente dinero', el:'αρκετά χρήματα' } },
        { z:'this one — that one', na:{ de:'dieses hier — das dort', es:'este — aquel', el:'αυτό εδώ — εκείνο εκεί' } },
        { z:'in cash', na:{ de:'in bar', es:'en efectivo', el:'σε μετρητά' } },
        { z:'pricey', na:{ de:'ganz schön teuer (ugs.)', es:'carillo (coloquial)', el:'τσιμπημένος (για τιμή)' } },
        { z:'Is there any flexibility on the price?', na:{ de:'Ist beim Preis noch Spielraum?', es:'¿Hay margen en el precio?', el:'Υπάρχει ευελιξία στην τιμή;' } }
      ],
      dialog: {
        rolle: { de:'Mr. Naranjo, der Silberschmied', es:'el señor Naranjo, el platero', el:'ο κύριος Ναράνχο, ο ασημουργός' },
        zeilen: [
          { wer:'spikiu', z:'Good morning! Take your time — I made every piece on this blanket myself.', na:{ de:'Guten Morgen! Lassen Sie sich Zeit — jedes Stück auf dieser Decke habe ich selbst gemacht.', es:'¡Buenos días! Tómese su tiempo: todas las piezas de esta manta las he hecho yo.', el:'Καλημέρα! Με την ησυχία σας — κάθε κομμάτι πάνω σε αυτή την κουβέρτα το έφτιαξα μόνος μου.' } },
          { wer:'lerner', z:'They\'re beautiful. Is the stone in this bracelet real turquoise?', na:{ de:'Sie sind wunderschön. Ist der Stein in diesem Armband echter Türkis?', es:'Son preciosas. ¿La piedra de esta pulsera es turquesa auténtica?', el:'Είναι πανέμορφα. Η πέτρα σε αυτό το βραχιόλι είναι αληθινό τιρκουάζ;' } },
          { wer:'spikiu', z:'It is, from a mine in Nevada. This bracelet is one-twenty, and that ring is forty-five.', na:{ de:'Ja, aus einer Mine in Nevada. Dieses Armband kostet hundertzwanzig, der Ring dort fünfundvierzig.', es:'Sí, de una mina de Nevada. Esta pulsera cuesta ciento veinte, y aquel anillo, cuarenta y cinco.', el:'Ναι, από ένα ορυχείο στη Νεβάδα. Αυτό το βραχιόλι κάνει εκατόν είκοσι, κι εκείνο το δαχτυλίδι σαράντα πέντε.' } },
          { wer:'lerner', z:'The bracelet is nicer than the ring, but it\'s a little too expensive for me.', na:{ de:'Das Armband ist schöner als der Ring, aber es ist mir ein bisschen zu teuer.', es:'La pulsera es más bonita que el anillo, pero es un poco cara para mí.', el:'Το βραχιόλι είναι πιο ωραίο από το δαχτυλίδι, αλλά είναι λίγο ακριβό για μένα.' } },
          { wer:'spikiu', z:'I understand. But that\'s handmade silver — this bracelet took me three whole days.', na:{ de:'Verstehe. Aber das ist handgearbeitetes Silber — an diesem Armband habe ich drei ganze Tage gearbeitet.', es:'Lo entiendo. Pero es plata hecha a mano: esta pulsera me llevó tres días enteros.', el:'Καταλαβαίνω. Αλλά είναι χειροποίητο ασήμι — αυτό το βραχιόλι μού πήρε τρεις ολόκληρες μέρες.' } },
          { wer:'lerner', z:'Is there any flexibility on the price? I only have a hundred in cash.', na:{ de:'Ist beim Preis noch etwas Spielraum? Ich habe nur hundert in bar.', es:'¿Hay algo de margen en el precio? Solo llevo cien en efectivo.', el:'Υπάρχει κάποια ευελιξία στην τιμή; Έχω μόνο εκατό μετρητά.' } }
        ]
      },
      lesetext: {
        z:'Under the old portal on the plaza, Pueblo artists sell jewelry they make themselves. I said the bracelet was "a bit dear", and Mr. Naranjo laughed: "Here we say pricey." In the end I paid a hundred dollars. Yesterday I drew the Rio Grande Gorge Bridge near Taos. Word of the place: Christmas, red and green chile on one plate.',
        na:{ de:'Unter dem alten Portal an der Plaza verkaufen Künstler aus den Pueblos Schmuck, den sie selbst machen. Ich sagte, das Armband sei „a bit dear", und Mr. Naranjo lachte: „Hier sagen wir pricey." Am Ende habe ich hundert Dollar bezahlt. Gestern habe ich bei Taos die Rio Grande Gorge Bridge gezeichnet. Wort des Ortes: Christmas, rotes und grünes Chili auf einem Teller.',
             es:'Bajo los viejos soportales de la plaza, artistas de los pueblos indígenas venden joyas hechas por ellos mismos. Dije que la pulsera era «a bit dear», y el señor Naranjo se rio: «Aquí decimos pricey». Al final pagué cien dólares. Ayer dibujé el puente Rio Grande Gorge, cerca de Taos. Palabra del lugar: Christmas, chile rojo y verde en el mismo plato.',
             el:'Κάτω από την παλιά στοά της πλατείας, καλλιτέχνες από τα πουέμπλο πουλάνε κοσμήματα που φτιάχνουν μόνοι τους. Είπα ότι το βραχιόλι ήταν «a bit dear», κι ο κύριος Ναράνχο γέλασε: «Εδώ λέμε pricey». Στο τέλος πλήρωσα εκατό δολάρια. Χθες σχεδίασα τη γέφυρα Rio Grande Gorge κοντά στο Τάος. Λέξη του τόπου: Christmas, κόκκινο και πράσινο τσίλι στο ίδιο πιάτο.' },
        frage:{ de:'Wie viel hat Giulia am Ende bezahlt?', es:'¿Cuánto pagó Giulia al final?', el:'Πόσα πλήρωσε τελικά η Τζούλια;' },
        optionen:[
          { na:{ de:'Hundert Dollar', es:'Cien dólares', el:'Εκατό δολάρια' }, richtig:true },
          { na:{ de:'Hundertzwanzig Dollar', es:'Ciento veinte dólares', el:'Εκατόν είκοσι δολάρια' }, richtig:false },
          { na:{ de:'Fünfundvierzig Dollar', es:'Cuarenta y cinco dólares', el:'Σαράντα πέντε δολάρια' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Vergleiche zwei Dinge, die du kaufen möchtest, und frag nach einem besseren Preis. Zwei Sätze.', es:'Compara dos cosas que quieres comprar y pregunta por un precio mejor. Dos frases.', el:'Σύγκρινε δύο πράγματα που θέλεις να αγοράσεις και ρώτα για μια καλύτερη τιμή. Δύο προτάσεις.' },
        muster:'This scarf is softer than that one, but it\'s too expensive for me. Is there any flexibility on the price?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Vergleichen: Kurze Adjektive bekommen -er + than (nicer than, cheaper than), lange bekommen more (more expensive than). „Too" heißt „zu": too expensive. „Enough" steht hinter dem Adjektiv (cheap enough), aber vor dem Nomen (enough money). Und: this/these = hier bei mir, that/those = dort drüben.',
               es:'Comparar: los adjetivos cortos llevan -er + than (nicer than, cheaper than); los largos, more (more expensive than). «Too» es «demasiado»: too expensive. «Enough» va detrás del adjetivo (cheap enough), pero delante del sustantivo (enough money). Y: this/these = aquí, cerca de mí; that/those = allí, como «aquel».',
               el:'Σύγκριση: τα σύντομα επίθετα παίρνουν -er + than (nicer than, cheaper than), τα μεγάλα παίρνουν more (more expensive than). Το «too» σημαίνει «υπερβολικά»: too expensive. Το «enough» μπαίνει μετά το επίθετο (cheap enough), αλλά πριν από το ουσιαστικό (enough money). Και: this/these = εδώ κοντά μου, that/those = εκεί πέρα.' },
        beispiele:[
          { z:'The bracelet is nicer than the ring.', na:{ de:'Das Armband ist schöner als der Ring.', es:'La pulsera es más bonita que el anillo.', el:'Το βραχιόλι είναι πιο ωραίο από το δαχτυλίδι.' } },
          { z:'I don\'t have enough cash for that one.', na:{ de:'Für das dort habe ich nicht genug Bargeld.', es:'No llevo suficiente efectivo para aquel.', el:'Δεν έχω αρκετά μετρητά για εκείνο.' } }
        ]
      },
      kultur: { de:'Unter dem Portal des Palace of the Governors in Santa Fe verkaufen Künstlerinnen und Künstler aus den Pueblos Schmuck und Keramik — jedes Stück haben sie selbst gemacht. Nördlich, bei Taos, spannt sich die Rio Grande Gorge Bridge hoch über die Schlucht des Rio Grande.',
                es:'Bajo los soportales del Palace of the Governors de Santa Fe, artistas de los pueblos indígenas venden joyas y cerámica, y cada pieza la han hecho ellos mismos. Más al norte, cerca de Taos, el puente Rio Grande Gorge cruza muy alto sobre el cañón del río Grande.',
                el:'Κάτω από τη στοά του Palace of the Governors στη Σάντα Φε, καλλιτέχνες από τα πουέμπλο πουλάνε κοσμήματα και κεραμικά — κάθε κομμάτι το έχουν φτιάξει οι ίδιοι. Πιο βόρεια, κοντά στο Τάος, η γέφυρα Rio Grande Gorge περνάει ψηλά πάνω από το φαράγγι του Ρίο Γκράντε.' }
    },

    /* ── B1 · Grand Canyon — Ranger Ortiz und der Bright Angel Trail (Mai) ─ */
    'b1.wegbeschreibung': {
      duzen: true,
      deineRolle: { de:'Du bist Giulia. Am Grand Canyon willst du heute den Bright Angel Trail hinuntergehen. Was der Ranger sagt, gibst du an deinen Lektor Marco in Mailand weiter.', es:'Eres Giulia. En el Gran Cañón quieres bajar hoy por el sendero Bright Angel. Lo que te diga el guarda del parque se lo contarás a tu editor, Marco, en Milán.', en:'You are Giulia. At the Grand Canyon you want to hike down the Bright Angel Trail today. You pass on what the ranger says to your editor Marco in Milan.', el:'Είσαι η Τζούλια. Στο Γκραντ Κάνιον θέλεις σήμερα να κατέβεις το μονοπάτι Bright Angel. Ό,τι σου πει ο δασοφύλακας, θα το μεταφέρεις στον εκδότη σου, τον Μάρκο, στο Μιλάνο.' },
      abrundung: { z:'Smart. And eat something salty on the way — in this heat, water alone isn\'t enough.', na:{ de:'Klug. Und iss unterwegs etwas Salziges — bei dieser Hitze reicht Wasser allein nicht.', es:'Bien pensado. Y come algo salado por el camino: con este calor, solo agua no basta.', el:'Έξυπνο. Και φάε κάτι αλμυρό στον δρόμο — με τέτοια ζέστη, μόνο νερό δεν φτάνει.' } },
      rollen: {
        spikiu: { de:'Ranger Ortiz, der Parkranger', es:'el guarda Ortiz, del parque nacional', en:'Ranger Ortiz, the park ranger', el:'ο Ορτίζ, δασοφύλακας του εθνικού πάρκου' },
        lerner: { de:'Giulia, die Ingenieurin', es:'Giulia, la ingeniera', en:'Giulia, the engineer', el:'η Τζούλια, η μηχανικός' },
        ort:    { de:'am Einstieg des Bright Angel Trail, am Südrand', es:'en el inicio del sendero Bright Angel, en el borde sur', en:'at the Bright Angel trailhead on the South Rim', el:'στην αφετηρία του μονοπατιού Bright Angel, στο νότιο χείλος' }
      },
      wortschatz: [
        { z:'the trailhead', na:{ de:'der Einstieg (eines Wanderwegs)', es:'el inicio del sendero', el:'η αφετηρία του μονοπατιού' } },
        { z:'the rim', na:{ de:'der Rand (des Canyons)', es:'el borde (del cañón)', el:'το χείλος (του φαραγγιού)' } },
        { z:'to turn around', na:{ de:'umkehren', es:'darse la vuelta', el:'γυρίζω πίσω' } },
        { z:'a resthouse', na:{ de:'die Schutzhütte', es:'el refugio', el:'το καταφύγιο' } },
        { z:'at least', na:{ de:'mindestens', es:'por lo menos', el:'τουλάχιστον' } },
        { z:'the heat', na:{ de:'die Hitze', es:'el calor', el:'η ζέστη' } },
        { z:'something salty', na:{ de:'etwas Salziges', es:'algo salado', el:'κάτι αλμυρό' } },
        { z:'optional', na:{ de:'freiwillig', es:'opcional', el:'προαιρετικός' } },
        { z:'mandatory', na:{ de:'Pflicht', es:'obligatorio', el:'υποχρεωτικός' } },
        { z:'twice as long', na:{ de:'doppelt so lange', es:'el doble de tiempo', el:'τον διπλάσιο χρόνο' } },
        { z:'she said (that) …', na:{ de:'sie hat gesagt, dass …', es:'dijo que …', el:'είπε ότι …' } },
        { z:'she told me to …', na:{ de:'sie hat mir gesagt, ich soll …', es:'me dijo que + subjuntivo', el:'μου είπε να …' } }
      ],
      dialog: {
        rolle: { de:'Ranger Ortiz, der Parkranger', es:'el guarda Ortiz', el:'ο Ορτίζ, ο δασοφύλακας' },
        zeilen: [
          { wer:'spikiu', z:'Morning! Planning a hike today? It\'s going to be hot down there.', na:{ de:'Morgen! Hast du heute eine Wanderung vor? Da unten wird es heiß.', es:'¡Buenos días! ¿Vas a hacer una ruta hoy? Ahí abajo va a hacer calor.', el:'Καλημέρα! Σκοπεύεις να κάνεις πεζοπορία σήμερα; Εκεί κάτω θα κάνει ζέστη.' } },
          { wer:'lerner', z:'Yes, the Bright Angel Trail. How far down can I go in one day?', na:{ de:'Ja, den Bright Angel Trail. Wie weit kann ich an einem Tag hinuntergehen?', es:'Sí, el sendero Bright Angel. ¿Hasta dónde puedo bajar en un día?', el:'Ναι, το μονοπάτι Bright Angel. Πόσο χαμηλά μπορώ να κατέβω σε μία μέρα;' } },
          { wer:'spikiu', z:'Turn around at Three-Mile Resthouse. Start before seven and carry at least three liters of water.', na:{ de:'Kehr am Three-Mile Resthouse um. Geh vor sieben los und nimm mindestens drei Liter Wasser mit.', es:'Date la vuelta en el refugio Three-Mile. Sal antes de las siete y lleva por lo menos tres litros de agua.', el:'Γύρνα πίσω στο καταφύγιο Three-Mile. Ξεκίνα πριν από τις εφτά και πάρε τουλάχιστον τρία λίτρα νερό.' } },
          { wer:'lerner', z:'So you said I should start before seven and turn around at Three-Mile.', na:{ de:'Du hast also gesagt, ich soll vor sieben losgehen und am Three-Mile umkehren.', es:'O sea, has dicho que salga antes de las siete y que me dé la vuelta en el Three-Mile.', el:'Δηλαδή είπες ότι πρέπει να ξεκινήσω πριν από τις εφτά και να γυρίσω πίσω στο Three-Mile.' } },
          { wer:'spikiu', z:'Exactly. Remember: going down is optional, coming back up is mandatory. Up takes twice as long.', na:{ de:'Genau. Denk dran: Runtergehen ist freiwillig, Wiederhochkommen ist Pflicht. Hoch dauert doppelt so lange.', es:'Exacto. Recuerda: bajar es opcional, volver a subir es obligatorio. La subida lleva el doble de tiempo.', el:'Ακριβώς. Θυμήσου: το κατέβασμα είναι προαιρετικό, το ανέβασμα υποχρεωτικό. Η ανάβαση παίρνει τον διπλάσιο χρόνο.' } },
          { wer:'lerner', z:'Got it. I\'ll tell my editor in Milan that a ranger told me to start early.', na:{ de:'Verstanden. Ich erzähle meinem Lektor in Mailand, dass mir ein Ranger geraten hat, früh loszugehen.', es:'Entendido. Le contaré a mi editor de Milán que un guarda del parque me dijo que saliera temprano.', el:'Κατάλαβα. Θα πω στον εκδότη μου στο Μιλάνο ότι ένας δασοφύλακας μού είπε να ξεκινήσω νωρίς.' } }
        ]
      },
      lesetext: {
        z:'Ranger Ortiz told me to start before seven, and he was right: by ten it was already hot. At Three-Mile Resthouse I turned around. When I said I would bring a torch, he laughed: "A flashlight, I hope!" The day before, I had stopped at the Navajo Bridge and seen a condor on the railing. Word of the place: switchbacks.',
        na:{ de:'Ranger Ortiz hat mir gesagt, ich solle vor sieben losgehen, und er hatte recht: Um zehn war es schon heiß. Am Three-Mile Resthouse bin ich umgekehrt. Als ich sagte, ich würde eine „torch" mitnehmen, lachte er: „Eine Taschenlampe, hoffe ich!" Am Tag davor hatte ich an der Navajo Bridge gehalten und einen Kondor auf dem Geländer gesehen. Wort des Ortes: switchbacks.',
             es:'El guarda Ortiz me dijo que saliera antes de las siete, y tenía razón: a las diez ya hacía calor. En el refugio Three-Mile me di la vuelta. Cuando dije que llevaría una «torch», se rio: «¡Una linterna, espero!». El día anterior había parado en el puente Navajo y había visto un cóndor en la barandilla. Palabra del lugar: switchbacks.',
             el:'Ο δασοφύλακας Ορτίζ μού είπε να ξεκινήσω πριν από τις εφτά, και είχε δίκιο: στις δέκα έκανε ήδη ζέστη. Στο καταφύγιο Three-Mile γύρισα πίσω. Όταν είπα ότι θα πάρω μια «torch», γέλασε: «Φακό, ελπίζω!» Την προηγούμενη μέρα είχα σταματήσει στη γέφυρα Navajo και είχα δει έναν κόνδορα στο κάγκελο. Λέξη του τόπου: switchbacks.' },
        frage:{ de:'Wo ist Giulia umgekehrt?', es:'¿Dónde se dio la vuelta Giulia?', el:'Πού γύρισε πίσω η Τζούλια;' },
        optionen:[
          { na:{ de:'Am Three-Mile Resthouse', es:'En el refugio Three-Mile', el:'Στο καταφύγιο Three-Mile' }, richtig:true },
          { na:{ de:'Unten am Fluss', es:'Abajo, en el río', el:'Κάτω στο ποτάμι' }, richtig:false },
          { na:{ de:'An der Navajo Bridge', es:'En el puente Navajo', el:'Στη γέφυρα Navajo' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähl jemandem, was dir eine Person geraten hat — mit „she said that" und „she told me to". Zwei Sätze.', es:'Cuéntale a alguien lo que te aconsejó una persona, con «she said that» y «she told me to». Dos frases.', el:'Πες σε κάποιον τι σου συμβούλεψε ένα πρόσωπο — με «she said that» και «she told me to». Δύο προτάσεις.' },
        muster:'The ranger said that the trail was very hot in the afternoon. He told me to carry three liters of water.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Weitergeben, was jemand gesagt hat: „she said (that)" + Aussage — oft rückt die Zeit eine Stufe zurück: "It is hot" → she said it was hot. Für Rat und Bitten: „she told me to" + Grundform: she told me to start early. Und die Befehlsform ist einfach die Grundform: Start before seven! Turn around!',
               es:'Transmitir lo que alguien dijo: «she said (that)» + frase, y a menudo el tiempo retrocede un paso: "It is hot" → she said it was hot. Para consejos y peticiones: «she told me to» + infinitivo, donde el español usa subjuntivo: she told me to start early = me dijo que saliera temprano. Y el imperativo es simplemente el infinitivo sin to: Start before seven! Turn around!',
               el:'Μεταφέρεις τι είπε κάποιος: «she said (that)» + πρόταση — συχνά ο χρόνος πάει ένα βήμα πίσω: "It is hot" → she said it was hot. Για συμβουλές και παρακλήσεις: «she told me to» + απαρέμφατο, όπως το ελληνικό «μου είπε να…»: she told me to start early. Και η προστακτική είναι απλώς ο βασικός τύπος: Start before seven! Turn around!' },
        beispiele:[
          { z:'He said that the way up takes twice as long.', na:{ de:'Er hat gesagt, dass der Weg nach oben doppelt so lange dauert.', es:'Dijo que la subida lleva el doble de tiempo.', el:'Είπε ότι ο δρόμος προς τα πάνω παίρνει τον διπλάσιο χρόνο.' } },
          { z:'He told me to start before seven.', na:{ de:'Er hat mir gesagt, ich soll vor sieben losgehen.', es:'Me dijo que saliera antes de las siete.', el:'Μου είπε να ξεκινήσω πριν από τις εφτά.' } }
        ]
      },
      kultur: { de:'Der Grand Canyon ist an vielen Stellen über anderthalb Kilometer tief; ganz unten fließt der Colorado. Weiter östlich überquert die Navajo Bridge den Marble Canyon: Die alte Brücke von 1929 gehört heute den Fußgängern — und oft sitzen Kalifornische Kondore auf dem Geländer.',
                es:'En muchos puntos, el Gran Cañón tiene más de kilómetro y medio de profundidad; abajo del todo corre el río Colorado. Más al este, el puente Navajo cruza el Marble Canyon: el puente viejo, de 1929, es hoy solo para peatones, y a menudo hay cóndores de California posados en la barandilla.',
                el:'Σε πολλά σημεία το Γκραντ Κάνιον έχει βάθος πάνω από ενάμισι χιλιόμετρο· στον πάτο κυλάει ο ποταμός Κολοράντο. Πιο ανατολικά, η γέφυρα Navajo περνάει πάνω από το Marble Canyon: η παλιά γέφυρα του 1929 είναι σήμερα για πεζούς — και συχνά κάθονται στο κάγκελο κόνδορες της Καλιφόρνιας.' }
    },

    /* ── B1 · San Francisco — Leo Tran und Karl the Fog (Jun) ────────── */
    'b1.taxi': {
      deineRolle: { de:'Du bist Giulia. In San Francisco ist der Nebel so dicht, dass du die Golden Gate Bridge nicht siehst. Hättest du mehr Zeit, würdest du auf die Sonne warten und sie zeichnen. Würdest du hier arbeiten, würdest du am Wasser wohnen.', es:'Eres Giulia. En San Francisco la niebla es tan espesa que no ves el Golden Gate. Si tuvieras más tiempo, esperarías al sol para dibujarlo. Si trabajaras aquí, vivirías cerca del agua.', en:'You are Giulia. In San Francisco the fog is so thick that you can\'t see the Golden Gate Bridge. If you had more time, you would wait for the sun and draw it. If you worked here, you would live near the water.', el:'Είσαι η Τζούλια. Στο Σαν Φρανσίσκο η ομίχλη είναι τόσο πυκνή που δεν βλέπεις τη γέφυρα Γκόλντεν Γκέιτ. Αν είχες περισσότερο χρόνο, θα περίμενες τον ήλιο για να τη σχεδιάσεις. Αν δούλευες εδώ, θα έμενες κοντά στο νερό.' },
      abrundung: { z:'Fog or no fog — now you sound like a real San Franciscan! Look, there\'s the bridge.', na:{ de:'Mit oder ohne Nebel — jetzt klingen Sie wie eine echte San Franciscanerin! Schauen Sie, da ist die Brücke.', es:'Con niebla o sin ella: ¡ya habla como una auténtica vecina de San Francisco! Mire, ahí está el puente.', el:'Με ομίχλη ή χωρίς — τώρα μιλάτε σαν αληθινή κάτοικος του Σαν Φρανσίσκο! Κοιτάξτε, να η γέφυρα.' } },
      rollen: {
        spikiu: { de:'Leo Tran, der Taxifahrer', es:'Leo Tran, el taxista', en:'Leo Tran, the cab driver', el:'ο Λίο Τραν, ο ταξιτζής' },
        lerner: { de:'Giulia, die Ingenieurin', es:'Giulia, la ingeniera', en:'Giulia, the engineer', el:'η Τζούλια, η μηχανικός' },
        ort:    { de:'im Taxi auf dem Weg zur Golden Gate Bridge', es:'en el taxi, camino del Golden Gate', en:'in a cab on the way to the Golden Gate Bridge', el:'σε ένα ταξί προς τη γέφυρα Γκόλντεν Γκέιτ' }
      },
      wortschatz: [
        { z:'a cab', na:{ de:'das Taxi', es:'el taxi', el:'το ταξί' } },
        { z:'hop in', na:{ de:'steig ein', es:'sube', el:'ανέβα' } },
        { z:'the trunk', na:{ de:'der Kofferraum', es:'el maletero', el:'το πορτμπαγκάζ' } },
        { z:'the fog', na:{ de:'der Nebel', es:'la niebla', el:'η ομίχλη' } },
        { z:'thick', na:{ de:'dicht', es:'espeso', el:'πυκνός' } },
        { z:'to clear up', na:{ de:'aufklaren', es:'despejarse', el:'καθαρίζει (ο καιρός)' } },
        { z:'a viewpoint', na:{ de:'der Aussichtspunkt', es:'el mirador', el:'το σημείο θέας' } },
        { z:'the rent', na:{ de:'die Miete', es:'el alquiler', el:'το ενοίκιο' } },
        { z:'a local', na:{ de:'ein Einheimischer', es:'un vecino de aquí', el:'ένας ντόπιος' } },
        { z:'if I were you', na:{ de:'an deiner Stelle', es:'yo que tú', el:'αν ήμουν στη θέση σου' } },
        { z:'I would …', na:{ de:'ich würde …', es:'yo + condicional (iría, viviría)', el:'θα + παρατατικός (θα πήγαινα)' } },
        { z:'fog or no fog', na:{ de:'mit oder ohne Nebel', es:'con niebla o sin ella', el:'με ομίχλη ή χωρίς' } }
      ],
      dialog: {
        rolle: { de:'Leo Tran, der Taxifahrer', es:'Leo Tran, el taxista', el:'ο Λίο Τραν, ο ταξιτζής' },
        zeilen: [
          { wer:'spikiu', z:'Hop in! Golden Gate viewpoint, right? I hope Karl lets you see something today.', na:{ de:'Steigen Sie ein! Zum Aussichtspunkt an der Golden Gate, richtig? Hoffentlich lässt Karl Sie heute etwas sehen.', es:'¡Suba! Al mirador del Golden Gate, ¿verdad? Espero que Karl le deje ver algo hoy.', el:'Ανεβείτε! Στο σημείο θέας της Γκόλντεν Γκέιτ, σωστά; Ελπίζω ο Καρλ να σας αφήσει να δείτε κάτι σήμερα.' } },
          { wer:'lerner', z:'Who\'s Karl? I can\'t see anything in this fog — not even the bridge.', na:{ de:'Wer ist Karl? Ich sehe in diesem Nebel gar nichts — nicht mal die Brücke.', es:'¿Quién es Karl? No veo nada con esta niebla, ni siquiera el puente.', el:'Ποιος είναι ο Καρλ; Δεν βλέπω τίποτα μέσα σε αυτή την ομίχλη — ούτε καν τη γέφυρα.' } },
          { wer:'spikiu', z:'Karl is the fog! Everybody here calls him that. If you lived here, you\'d know him well.', na:{ de:'Karl ist der Nebel! Alle hier nennen ihn so. Wenn Sie hier wohnen würden, würden Sie ihn gut kennen.', es:'¡Karl es la niebla! Aquí todo el mundo la llama así. Si viviera aquí, lo conocería bien.', el:'Ο Καρλ είναι η ομίχλη! Όλοι εδώ έτσι τον λένε. Αν μένατε εδώ, θα τον ξέρατε καλά.' } },
          { wer:'lerner', z:'If I had more time, I would wait for the sun and draw the bridge.', na:{ de:'Wenn ich mehr Zeit hätte, würde ich auf die Sonne warten und die Brücke zeichnen.', es:'Si tuviera más tiempo, esperaría al sol y dibujaría el puente.', el:'Αν είχα περισσότερο χρόνο, θα περίμενα τον ήλιο και θα σχεδίαζα τη γέφυρα.' } },
          { wer:'spikiu', z:'Good plan — Karl usually leaves around noon. So tell me: would you ever live here?', na:{ de:'Guter Plan — Karl verschwindet meistens gegen Mittag. Also sagen Sie mal: Würden Sie jemals hier leben?', es:'Buen plan: Karl suele irse hacia el mediodía. Y dígame, ¿viviría aquí alguna vez?', el:'Καλό σχέδιο — ο Καρλ συνήθως φεύγει κατά το μεσημέρι. Πείτε μου λοιπόν: θα ζούσατε ποτέ εδώ;' } },
          { wer:'lerner', z:'Maybe. If I worked here, I would live near the water — fog or no fog.', na:{ de:'Vielleicht. Wenn ich hier arbeiten würde, würde ich am Wasser wohnen — mit oder ohne Nebel.', es:'Quizá. Si trabajara aquí, viviría cerca del agua, con niebla o sin ella.', el:'Ίσως. Αν δούλευα εδώ, θα έμενα κοντά στο νερό — με ομίχλη ή χωρίς.' } }
        ]
      },
      lesetext: {
        z:'In the cab I asked the driver to put my bag in the boot. Leo laughed: "The trunk, you mean!" Then he told me that the fog has a name: Karl. At the viewpoint Karl opened for one minute, and the top of the bridge appeared, bright orange above the white. If I lived here, I would draw it every day. Word of the place: hella.',
        na:{ de:'Im Taxi bat ich den Fahrer, meine Tasche in den „boot" zu legen. Leo lachte: „Den trunk, meinst du!" Dann erzählte er mir, dass der Nebel einen Namen hat: Karl. Am Aussichtspunkt öffnete sich Karl für eine Minute, und die Spitze der Brücke erschien, leuchtend orange über dem Weiß. Wenn ich hier leben würde, würde ich sie jeden Tag zeichnen. Wort des Ortes: hella.',
             es:'En el taxi le pedí al conductor que pusiera mi bolsa en el «boot». Leo se rio: «¡El trunk, querrás decir!». Luego me contó que la niebla tiene nombre: Karl. En el mirador, Karl se abrió durante un minuto y apareció la parte de arriba del puente, de un naranja brillante sobre el blanco. Si viviera aquí, lo dibujaría todos los días. Palabra del lugar: hella.',
             el:'Στο ταξί ζήτησα από τον οδηγό να βάλει την τσάντα μου στο «boot». Ο Λίο γέλασε: «Στο trunk, εννοείς!» Μετά μου είπε ότι η ομίχλη έχει όνομα: Καρλ. Στο σημείο θέας ο Καρλ άνοιξε για ένα λεπτό και φάνηκε η κορυφή της γέφυρας, έντονα πορτοκαλί πάνω από το άσπρο. Αν ζούσα εδώ, θα τη σχεδίαζα κάθε μέρα. Λέξη του τόπου: hella.' },
        frage:{ de:'Was passierte am Aussichtspunkt?', es:'¿Qué pasó en el mirador?', el:'Τι έγινε στο σημείο θέας;' },
        optionen:[
          { na:{ de:'Der Nebel öffnete sich kurz', es:'La niebla se abrió un momento', el:'Η ομίχλη άνοιξε για λίγο' }, richtig:true },
          { na:{ de:'Es fing an zu regnen', es:'Empezó a llover', el:'Άρχισε να βρέχει' }, richtig:false },
          { na:{ de:'Leo fuhr nach Hause', es:'Leo se fue a casa', el:'Ο Λίο πήγε σπίτι του' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib, was du tun würdest, wenn du in einer anderen Stadt leben würdest. Zwei Sätze mit „if" und „would".', es:'Escribe qué harías si vivieras en otra ciudad. Dos frases con «if» y «would».', el:'Γράψε τι θα έκανες αν ζούσες σε μια άλλη πόλη. Δύο προτάσεις με «if» και «would».' },
        muster:'If I lived in San Francisco, I would buy a warm jacket. I would walk across the bridge every Sunday.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Träumen und Vorstellen: if + Vergangenheitsform, dann would + Grundform: If I had more time, I would wait. Das „would" steht nie im if-Teil! Bei „to be" sagt man gern „if I were": If I were you, I would wait for noon. Gesprochen wird aus „I would" fast immer „I\'d".',
               es:'Soñar e imaginar: if + pasado, y luego would + infinitivo: If I had more time, I would wait = si tuviera más tiempo, esperaría. ¡El «would» nunca va en la parte del if! Con «to be» se dice «if I were»: If I were you, I would wait for noon = yo que tú, esperaría al mediodía. Al hablar, «I would» casi siempre suena «I\'d».',
               el:'Όνειρα και υποθέσεις: if + αόριστος, και μετά would + βασικός τύπος: If I had more time, I would wait = αν είχα περισσότερο χρόνο, θα περίμενα. Το «would» δεν μπαίνει ποτέ στο κομμάτι με το if! Με το «to be» λέμε «if I were»: If I were you, I would wait for noon = στη θέση σου, θα περίμενα ως το μεσημέρι. Στον προφορικό λόγο, το «I would» γίνεται σχεδόν πάντα «I\'d».' },
        beispiele:[
          { z:'If I had more time, I would wait for the sun.', na:{ de:'Wenn ich mehr Zeit hätte, würde ich auf die Sonne warten.', es:'Si tuviera más tiempo, esperaría al sol.', el:'Αν είχα περισσότερο χρόνο, θα περίμενα τον ήλιο.' } },
          { z:'If I were you, I\'d bring a jacket.', na:{ de:'An deiner Stelle würde ich eine Jacke mitnehmen.', es:'Yo que tú, me llevaría una chaqueta.', el:'Στη θέση σου, θα έπαιρνα ένα μπουφάν.' } }
        ]
      },
      kultur: { de:'Im Sommer zieht vom Pazifik oft kühler Nebel durch das Golden Gate — die Einheimischen nennen ihn liebevoll „Karl". Die Brücke ist übrigens nicht rot, sondern „International Orange": eine Farbe, die man auch im Nebel gut sieht.',
                es:'En verano, una niebla fresca entra a menudo desde el Pacífico por el Golden Gate; los vecinos la llaman con cariño «Karl». Por cierto, el puente no es rojo, sino «International Orange», un color que se ve bien incluso con niebla.',
                el:'Το καλοκαίρι, δροσερή ομίχλη από τον Ειρηνικό περνάει συχνά μέσα από το Golden Gate — οι ντόπιοι τη λένε χαϊδευτικά «Καρλ». Η γέφυρα, παρεμπιπτόντως, δεν είναι κόκκινη αλλά «International Orange»: ένα χρώμα που φαίνεται καλά ακόμα και μέσα στην ομίχλη.' }
    },

    /* ── B1 · Seattle — Urgent Care bei Dr. Nakamura (Jun) ───────────── */
    'b1.arzt': {
      deineRolle: { de:'Du bist Giulia. Am Sonntag bist du auf einem Weg am Mount Rainier umgeknickt; seitdem ist der Knöchel geschwollen. Du kannst ein bisschen gehen und nimmst seit zwei Tagen Ibuprofen. Am Freitag hast du einen Zug nach Vancouver.', es:'Eres Giulia. El domingo te torciste el tobillo en un sendero del monte Rainier y desde entonces está hinchado. Puedes caminar un poco y llevas dos días tomando ibuprofeno. El viernes tienes un tren a Vancouver.', en:'You are Giulia. On Sunday you twisted your ankle on a trail at Mount Rainier, and it has been swollen since then. You can walk a little and have been taking ibuprofen for two days. On Friday you have a train to Vancouver.', el:'Είσαι η Τζούλια. Την Κυριακή στραμπούληξες τον αστράγαλο σε ένα μονοπάτι στο όρος Ρενιέ, κι από τότε είναι πρησμένος. Μπορείς να περπατήσεις λίγο και παίρνεις ιβουπροφαίνη εδώ και δύο μέρες. Την Παρασκευή έχεις τρένο για το Βανκούβερ.' },
      abrundung: { z:'Not completely. Wear the brace and walk short distances — you should be fine by Friday.', na:{ de:'Nicht komplett. Tragen Sie die Schiene und gehen Sie kurze Strecken — bis Freitag sollte es wieder gehen.', es:'Del todo no. Lleve la tobillera y camine distancias cortas: para el viernes debería estar bien.', el:'Όχι εντελώς. Φοράτε τον νάρθηκα και περπατάτε μικρές αποστάσεις — ως την Παρασκευή θα είστε εντάξει.' } },
      rollen: {
        spikiu: { de:'Dr. Nakamura, die Ärztin', es:'la doctora Nakamura', en:'Dr. Nakamura, the doctor', el:'η γιατρός Νακαμούρα' },
        lerner: { de:'Giulia, die Ingenieurin', es:'Giulia, la ingeniera', en:'Giulia, the engineer', el:'η Τζούλια, η μηχανικός' },
        ort:    { de:'in einer Urgent-Care-Klinik in Seattle', es:'en una clínica de urgencias de Seattle', en:'at an urgent care clinic in Seattle', el:'σε μια κλινική επειγόντων στο Σιάτλ' }
      },
      wortschatz: [
        { z:'urgent care', na:{ de:'die Notfallpraxis (ohne Termin)', es:'la clínica de urgencias (sin cita)', el:'η κλινική επειγόντων (χωρίς ραντεβού)' } },
        { z:'the insurance card', na:{ de:'die Versichertenkarte', es:'la tarjeta del seguro', el:'η κάρτα ασφάλισης' } },
        { z:'the ankle', na:{ de:'der Knöchel', es:'el tobillo', el:'ο αστράγαλος' } },
        { z:'to twist', na:{ de:'umknicken, verdrehen', es:'torcerse', el:'στραμπουλάω' } },
        { z:'swollen', na:{ de:'geschwollen', es:'hinchado', el:'πρησμένος' } },
        { z:'a sprain', na:{ de:'die Verstauchung', es:'el esguince', el:'το διάστρεμμα' } },
        { z:'an X-ray', na:{ de:'das Röntgenbild', es:'la radiografía', el:'η ακτινογραφία' } },
        { z:'a brace', na:{ de:'die Schiene, die Bandage', es:'la tobillera, la férula', el:'ο νάρθηκας' } },
        { z:'to keep it up', na:{ de:'hochlegen', es:'tenerlo en alto', el:'το κρατάω ψηλά' } },
        { z:'to stay off it', na:{ de:'den Fuß nicht belasten', es:'no apoyar el pie', el:'δεν πατάω πάνω του' } },
        { z:'since Sunday', na:{ de:'seit Sonntag', es:'desde el domingo', el:'από την Κυριακή' } },
        { z:'for two days', na:{ de:'seit zwei Tagen', es:'desde hace dos días', el:'εδώ και δύο μέρες' } }
      ],
      dialog: {
        rolle: { de:'Dr. Nakamura, die Ärztin', es:'la doctora Nakamura', el:'η γιατρός Νακαμούρα' },
        zeilen: [
          { wer:'spikiu', z:'Hi, I\'m Dr. Nakamura. I see you\'ve hurt your ankle — what happened?', na:{ de:'Hallo, ich bin Dr. Nakamura. Wie ich sehe, haben Sie sich am Knöchel verletzt — was ist passiert?', es:'Hola, soy la doctora Nakamura. Veo que se ha hecho daño en el tobillo. ¿Qué ha pasado?', el:'Γεια σας, είμαι η γιατρός Νακαμούρα. Βλέπω ότι χτυπήσατε τον αστράγαλο — τι έγινε;' } },
          { wer:'lerner', z:'I twisted it on a trail at Mount Rainier. It\'s been swollen since Sunday.', na:{ de:'Ich bin auf einem Weg am Mount Rainier umgeknickt. Seit Sonntag ist er geschwollen.', es:'Me lo torcí en un sendero del monte Rainier. Está hinchado desde el domingo.', el:'Τον στραμπούληξα σε ένα μονοπάτι στο όρος Ρενιέ. Είναι πρησμένος από την Κυριακή.' } },
          { wer:'spikiu', z:'Okay, let\'s have a look. Can you walk on it? Have you taken anything for the pain?', na:{ de:'Gut, schauen wir mal. Können Sie damit gehen? Haben Sie etwas gegen die Schmerzen genommen?', es:'Bien, vamos a verlo. ¿Puede caminar? ¿Ha tomado algo para el dolor?', el:'Εντάξει, ας ρίξουμε μια ματιά. Μπορείτε να περπατήσετε; Πήρατε κάτι για τον πόνο;' } },
          { wer:'lerner', z:'I can walk a little, but it hurts. I\'ve been taking ibuprofen for two days.', na:{ de:'Ich kann ein bisschen gehen, aber es tut weh. Ich nehme seit zwei Tagen Ibuprofen.', es:'Puedo caminar un poco, pero me duele. Llevo dos días tomando ibuprofeno.', el:'Μπορώ να περπατήσω λίγο, αλλά πονάει. Παίρνω ιβουπροφαίνη εδώ και δύο μέρες.' } },
          { wer:'spikiu', z:'The X-ray looks fine — it\'s just a sprain. You should rest it and keep it up.', na:{ de:'Das Röntgenbild sieht gut aus — es ist nur eine Verstauchung. Sie sollten den Fuß schonen und hochlegen.', es:'La radiografía está bien: es solo un esguince. Debería guardar reposo y tener el pie en alto.', el:'Η ακτινογραφία είναι εντάξει — είναι απλώς διάστρεμμα. Πρέπει να τον ξεκουράσετε και να τον έχετε ψηλά.' } },
          { wer:'lerner', z:'Do I have to stay off it completely? I have a train to Vancouver on Friday.', na:{ de:'Muss ich den Fuß komplett schonen? Ich habe am Freitag einen Zug nach Vancouver.', es:'¿Tengo que dejar de apoyarlo del todo? El viernes tengo un tren a Vancouver.', el:'Πρέπει να μην πατάω καθόλου; Την Παρασκευή έχω τρένο για το Βανκούβερ.' } }
        ]
      },
      lesetext: {
        z:'At the front desk they asked for my insurance card. I said I wanted to go to "casualty", and the nurse smiled: "Here we say the ER — but urgent care is quicker." Dr. Nakamura says it\'s just a sprain. Afterwards I limped to Fremont to draw the bridge and the big troll under the Aurora Bridge. Word of the place: urgent care.',
        na:{ de:'Am Empfang wollten sie meine Versichertenkarte sehen. Ich sagte, ich wolle zur „casualty", und die Krankenschwester lächelte: „Hier sagen wir ER — aber Urgent Care geht schneller." Dr. Nakamura sagt, es ist nur eine Verstauchung. Danach humpelte ich nach Fremont, um die Brücke zu zeichnen und den großen Troll unter der Aurora Bridge. Wort des Ortes: urgent care.',
             es:'En recepción me pidieron la tarjeta del seguro. Dije que quería ir a «casualty», y la enfermera sonrió: «Aquí decimos the ER, pero urgent care es más rápido». La doctora Nakamura dice que es solo un esguince. Después fui cojeando a Fremont para dibujar el puente y el gran trol que hay bajo el Aurora Bridge. Palabra del lugar: urgent care.',
             el:'Στη ρεσεψιόν μού ζήτησαν την κάρτα ασφάλισης. Είπα ότι ήθελα να πάω στο «casualty», κι η νοσηλεύτρια χαμογέλασε: «Εδώ λέμε the ER — αλλά το urgent care είναι πιο γρήγορο». Η γιατρός Νακαμούρα λέει ότι είναι απλώς διάστρεμμα. Μετά πήγα κουτσαίνοντας στο Φρίμοντ να σχεδιάσω τη γέφυρα και το μεγάλο τρολ κάτω από τη γέφυρα Aurora. Λέξη του τόπου: urgent care.' },
        frage:{ de:'Was wollte man am Empfang sehen?', es:'¿Qué le pidieron en recepción?', el:'Τι της ζήτησαν στη ρεσεψιόν;' },
        optionen:[
          { na:{ de:'Ihre Versichertenkarte', es:'La tarjeta del seguro', el:'Την κάρτα ασφάλισης' }, richtig:true },
          { na:{ de:'Ihren Reisepass', es:'El pasaporte', el:'Το διαβατήριο' }, richtig:false },
          { na:{ de:'Ein Röntgenbild', es:'Una radiografía', el:'Μια ακτινογραφία' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Beschreib einer Ärztin ein Problem: seit wann und wie lange schon. Zwei Sätze mit „since" und „for".', es:'Descríbele un problema a una médica: desde cuándo y cuánto tiempo. Dos frases con «since» y «for».', el:'Περίγραψε σε μια γιατρό ένα πρόβλημα: από πότε και πόσο καιρό. Δύο προτάσεις με «since» και «for».' },
        muster:'My knee has hurt since Monday. I\'ve been taking painkillers for three days.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Seit wann? Englisch nimmt dafür das Present Perfect, nicht die Gegenwart: It has been swollen since Sunday — nicht „it is swollen since". „Since" + Zeitpunkt (since Sunday), „for" + Zeitraum (for two days). Und Rat oder Pflicht: „should" ist ein Rat (you should rest it), „have to" ist ein Muss (do I have to stay off it?).',
               es:'¿Desde cuándo? El inglés usa el present perfect, no el presente: It has been swollen since Sunday, aunque en español digamos «está hinchado desde el domingo». «Since» + momento (since Sunday), «for» + duración (for two days). Y consejo u obligación: «should» es un consejo (you should rest it), «have to» una obligación (do I have to stay off it?).',
               el:'Από πότε; Τα αγγλικά βάζουν εδώ present perfect, όχι ενεστώτα: It has been swollen since Sunday — ενώ στα ελληνικά λέμε «είναι πρησμένος από την Κυριακή». «Since» + χρονικό σημείο (since Sunday), «for» + διάρκεια (for two days). Και συμβουλή ή υποχρέωση: το «should» είναι συμβουλή (you should rest it), το «have to» υποχρέωση (do I have to stay off it?).' },
        beispiele:[
          { z:'It\'s been swollen since Sunday.', na:{ de:'Er ist seit Sonntag geschwollen.', es:'Está hinchado desde el domingo.', el:'Είναι πρησμένος από την Κυριακή.' } },
          { z:'You should rest it for a few days.', na:{ de:'Sie sollten ihn ein paar Tage schonen.', es:'Debería guardar reposo unos días.', el:'Πρέπει να τον ξεκουράσετε για λίγες μέρες.' } }
        ]
      },
      kultur: { de:'Mit kleineren Verletzungen geht man in den USA ohne Termin in eine Urgent-Care-Klinik — schneller und günstiger als die Notaufnahme. Die Versichertenkarte (oder die Reiseversicherung) zeigt man gleich am Empfang. In Seattle wohnt im Viertel Fremont ein riesiger Troll aus Beton unter der Aurora Bridge; in der Hand hält er einen echten VW Käfer.',
                es:'En Estados Unidos, con una lesión leve se va sin cita a una clínica de urgent care: es más rápido y más barato que urgencias del hospital. La tarjeta del seguro (o el seguro de viaje) se enseña nada más llegar, en recepción. En Seattle, en el barrio de Fremont, vive bajo el Aurora Bridge un enorme trol de hormigón que sujeta un Volkswagen Escarabajo de verdad.',
                el:'Στις ΗΠΑ, για έναν μικρό τραυματισμό πας χωρίς ραντεβού σε μια κλινική urgent care — πιο γρήγορα και πιο φθηνά από τα επείγοντα του νοσοκομείου. Την κάρτα ασφάλισης (ή την ταξιδιωτική ασφάλιση) τη δείχνεις αμέσως στη ρεσεψιόν. Στο Σιάτλ, στη γειτονιά Φρίμοντ, κάτω από τη γέφυρα Aurora, ζει ένα τεράστιο τσιμεντένιο τρολ που κρατάει στο χέρι έναν αληθινό Σκαραβαίο της Volkswagen.' }
    },

    /* ── B1 · Seattle → Vancouver mit dem Amtrak Cascades (Jul) ──────── */
    'b1.bahnhof': {
      deineRolle: { de:'Du bist Giulia. Mit deinem verletzten Knöchel warst du zu langsam, und der Morgenzug nach Vancouver war schon abgefahren. Du hast einen Koffer und deine Skizzenbücher.', es:'Eres Giulia. Con el tobillo mal has ido demasiado lenta y el tren de la mañana a Vancouver ya había salido. Llevas una maleta y tus cuadernos de dibujo.', en:'You are Giulia. With your bad ankle you were too slow, and the morning train to Vancouver had already left. You have one suitcase and your sketchbooks.', el:'Είσαι η Τζούλια. Με τον χτυπημένο αστράγαλο ήσουν πολύ αργή, και το πρωινό τρένο για το Βανκούβερ είχε ήδη φύγει. Έχεις μία βαλίτσα και τα μπλοκ σχεδίου σου.' },
      eroeffnung: { z:'Good morning. Next in line, please!', na:{ de:'Guten Morgen. Der Nächste, bitte!', es:'Buenos días. ¡El siguiente de la fila, por favor!', el:'Καλημέρα. Ο επόμενος στη σειρά, παρακαλώ!' } },
      abrundung: { z:'Got it. Your suitcase is checked through to Vancouver. Sit on the left — the train runs along the water.', na:{ de:'Alles klar. Ihr Koffer ist bis Vancouver aufgegeben. Setzen Sie sich links — der Zug fährt am Wasser entlang.', es:'Perfecto. Su maleta va facturada hasta Vancouver. Siéntese a la izquierda: el tren va junto al agua.', el:'Έγινε. Η βαλίτσα σας είναι παραδομένη μέχρι το Βανκούβερ. Καθίστε αριστερά — το τρένο περνάει δίπλα στο νερό.' } },
      rollen: {
        spikiu: { de:'der Mitarbeiter am Amtrak-Schalter', es:'el empleado de la taquilla de Amtrak', en:'the agent at the Amtrak counter', el:'ο υπάλληλος στο γκισέ της Amtrak' },
        lerner: { de:'Giulia, die Ingenieurin', es:'Giulia, la ingeniera', en:'Giulia, the engineer', el:'η Τζούλια, η μηχανικός' },
        ort:    { de:'in der King Street Station, Seattle', es:'en la estación King Street de Seattle', en:'at King Street Station, Seattle', el:'στον σταθμό King Street στο Σιάτλ' }
      },
      wortschatz: [
        { z:'the line', na:{ de:'die Schlange', es:'la fila, la cola', el:'η ουρά' } },
        { z:'to rebook', na:{ de:'umbuchen', es:'cambiar la reserva', el:'αλλάζω την κράτηση' } },
        { z:'had already left', na:{ de:'war schon abgefahren', es:'ya había salido', el:'είχε ήδη φύγει' } },
        { z:'has been delayed', na:{ de:'hat Verspätung', es:'lleva retraso', el:'έχει καθυστέρηση' } },
        { z:'the passport', na:{ de:'der Reisepass', es:'el pasaporte', el:'το διαβατήριο' } },
        { z:'the border', na:{ de:'die Grenze', es:'la frontera', el:'τα σύνορα' } },
        { z:'to check a bag', na:{ de:'Gepäck aufgeben', es:'facturar una maleta', el:'παραδίδω αποσκευή' } },
        { z:'checked through to …', na:{ de:'durchgehend aufgegeben bis …', es:'facturado hasta …', el:'παραδομένη μέχρι …' } },
        { z:'a carry-on', na:{ de:'das Handgepäck', es:'el equipaje de mano', el:'η χειραποσκευή' } },
        { z:'the track', na:{ de:'das Gleis', es:'la vía, el andén', el:'η γραμμή, η αποβάθρα' } },
        { z:'a sketchbook', na:{ de:'das Skizzenbuch', es:'el cuaderno de dibujo', el:'το μπλοκ σχεδίου' } },
        { z:'All aboard!', na:{ de:'Alles einsteigen!', es:'¡Pasajeros al tren!', el:'Επιβιβαστείτε!' } }
      ],
      dialog: {
        rolle: { de:'der Mitarbeiter am Amtrak-Schalter', es:'el empleado de la taquilla', el:'ο υπάλληλος στο γκισέ' },
        zeilen: [
          { wer:'lerner', z:'Good morning. With my bad ankle I was too slow, and the train had already left.', na:{ de:'Guten Morgen. Mit meinem verletzten Knöchel war ich zu langsam, und der Zug war schon abgefahren.', es:'Buenos días. Con el tobillo mal he ido demasiado lenta y el tren ya había salido.', el:'Καλημέρα. Με τον χτυπημένο μου αστράγαλο ήμουν πολύ αργή, και το τρένο είχε ήδη φύγει.' } },
          { wer:'spikiu', z:'Sorry about that. I can move you to the afternoon train, but it has been delayed thirty minutes.', na:{ de:'Das tut mir leid. Ich kann Sie auf den Nachmittagszug umbuchen, aber der hat dreißig Minuten Verspätung.', es:'Lo siento. Puedo cambiarla al tren de la tarde, pero lleva treinta minutos de retraso.', el:'Λυπάμαι. Μπορώ να σας μεταφέρω στο απογευματινό τρένο, αλλά έχει καθυστέρηση τριάντα λεπτά.' } },
          { wer:'lerner', z:'That\'s fine. Do I need my passport on the train, or only at the border?', na:{ de:'Kein Problem. Brauche ich meinen Pass im Zug oder nur an der Grenze?', es:'No pasa nada. ¿Necesito el pasaporte en el tren o solo en la frontera?', el:'Δεν πειράζει. Χρειάζομαι το διαβατήριο στο τρένο ή μόνο στα σύνορα;' } },
          { wer:'spikiu', z:'Keep it with you. Passports are checked when you arrive in Vancouver. Any bags to check?', na:{ de:'Behalten Sie ihn bei sich. Die Pässe werden bei der Ankunft in Vancouver kontrolliert. Möchten Sie Gepäck aufgeben?', es:'Llévelo encima. Los pasaportes se revisan al llegar a Vancouver. ¿Va a facturar equipaje?', el:'Κρατήστε το μαζί σας. Τα διαβατήρια ελέγχονται όταν φτάνετε στο Βανκούβερ. Έχετε αποσκευές να παραδώσετε;' } },
          { wer:'lerner', z:'Just one suitcase. My sketchbooks stay with me — they\'re my whole year.', na:{ de:'Nur einen Koffer. Meine Skizzenbücher bleiben bei mir — sie sind mein ganzes Jahr.', es:'Solo una maleta. Los cuadernos de dibujo van conmigo: son todo mi año.', el:'Μόνο μία βαλίτσα. Τα μπλοκ σχεδίου μου μένουν μαζί μου — είναι όλη μου η χρονιά.' } },
          { wer:'spikiu', z:'Understood. Your suitcase goes underneath, and the train leaves from track four.', na:{ de:'Verstanden. Ihr Koffer kommt in den Gepäckwagen, und der Zug fährt von Gleis vier.', es:'Entendido. Su maleta va en el vagón de equipajes, y el tren sale de la vía cuatro.', el:'Κατανοητό. Η βαλίτσα σας πάει στο βαγόνι αποσκευών, και το τρένο φεύγει από τη γραμμή τέσσερα.' } }
        ]
      },
      lesetext: {
        z:'I asked the man at the counter for a timetable. He smiled: "You mean a schedule? It\'s on the board!" The afternoon train had been delayed, but nobody minded: the tracks ran right along the water. In Vancouver my passport was checked, and in the evening I drew the Lions Gate Bridge, all lit up. Word of the place: washroom (Canada).',
        na:{ de:'Ich fragte den Mann am Schalter nach einem „timetable". Er lächelte: „Du meinst einen schedule? Der steht auf der Tafel!" Der Nachmittagszug hatte Verspätung, aber das störte niemanden: Die Gleise führten direkt am Wasser entlang. In Vancouver wurde mein Pass kontrolliert, und am Abend zeichnete ich die beleuchtete Lions Gate Bridge. Wort des Ortes: washroom (Kanada).',
             es:'Le pedí al hombre de la taquilla un «timetable». Sonrió: «¿Quieres decir un schedule? ¡Está en el panel!». El tren de la tarde llevaba retraso, pero a nadie le importó: las vías iban junto al agua. En Vancouver me revisaron el pasaporte, y por la noche dibujé el Lions Gate Bridge, todo iluminado. Palabra del lugar: washroom (Canadá).',
             el:'Ζήτησα από τον άντρα στο γκισέ ένα «timetable». Χαμογέλασε: «Εννοείς schedule; Είναι στον πίνακα!» Το απογευματινό τρένο είχε καθυστέρηση, αλλά κανείς δεν νοιάστηκε: οι γραμμές περνούσαν ακριβώς δίπλα στο νερό. Στο Βανκούβερ μού έλεγξαν το διαβατήριο, και το βράδυ σχεδίασα τη γέφυρα Lions Gate, φωταγωγημένη. Λέξη του τόπου: washroom (Καναδάς).' },
        frage:{ de:'Was hat Giulia am Abend gezeichnet?', es:'¿Qué dibujó Giulia por la noche?', el:'Τι σχεδίασε η Τζούλια το βράδυ;' },
        optionen:[
          { na:{ de:'Die Lions Gate Bridge', es:'El Lions Gate Bridge', el:'Τη γέφυρα Lions Gate' }, richtig:true },
          { na:{ de:'Den Bahnhof in Seattle', es:'La estación de Seattle', el:'Τον σταθμό του Σιάτλ' }, richtig:false },
          { na:{ de:'Den Zug am Wasser', es:'El tren junto al agua', el:'Το τρένο δίπλα στο νερό' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähl, was schon passiert war, als du ankamst — und was dann mit deiner Fahrkarte gemacht wurde. Zwei Sätze.', es:'Cuenta qué había pasado ya cuando llegaste y qué se hizo luego con tu billete. Dos frases.', el:'Διηγήσου τι είχε ήδη γίνει όταν έφτασες — και τι έγινε μετά με το εισιτήριό σου. Δύο προτάσεις.' },
        muster:'When I got to the station, my train had already left. My ticket was changed to the next train.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano', el:'Γραμματική χωρίς περιστροφές' },
        text:{ de:'Vorvergangenheit: had + Partizip — etwas war schon passiert, bevor etwas anderes kam: When I arrived, the train had already left. Und das Passiv, wenn nicht wichtig ist, wer etwas tut: Passports are checked in Vancouver. The train has been delayed. Am Bahnhof hörst du beides ständig.',
               es:'Pluscuamperfecto: had + participio, algo ya había pasado antes de otra cosa: When I arrived, the train had already left = cuando llegué, el tren ya había salido. Y la pasiva, cuando no importa quién lo hace: Passports are checked in Vancouver = los pasaportes se revisan en Vancouver. The train has been delayed. En la estación oirás las dos cosas todo el rato.',
               el:'Υπερσυντέλικος: had + μετοχή — κάτι είχε ήδη γίνει πριν από κάτι άλλο: When I arrived, the train had already left = όταν έφτασα, το τρένο είχε ήδη φύγει. Και η παθητική φωνή, όταν δεν έχει σημασία ποιος κάνει κάτι: Passports are checked in Vancouver = τα διαβατήρια ελέγχονται στο Βανκούβερ. The train has been delayed. Στον σταθμό θα τα ακούς και τα δύο συνέχεια.' },
        beispiele:[
          { z:'The train had already left.', na:{ de:'Der Zug war schon abgefahren.', es:'El tren ya había salido.', el:'Το τρένο είχε ήδη φύγει.' } },
          { z:'Passports are checked in Vancouver.', na:{ de:'Die Pässe werden in Vancouver kontrolliert.', es:'Los pasaportes se revisan en Vancouver.', el:'Τα διαβατήρια ελέγχονται στο Βανκούβερ.' } }
        ]
      },
      kultur: { de:'Der Amtrak Cascades fährt von Seattle nach Vancouver lange Strecken direkt an der Küste entlang. Die Passkontrolle ist erst bei der Ankunft im Bahnhof Pacific Central. In Vancouver verbindet die Lions Gate Bridge (1938) den Stanley Park mit dem Nordufer; nachts leuchtet sie über dem Wasser.',
                es:'El Amtrak Cascades va de Seattle a Vancouver y durante largos tramos circula pegado a la costa. El control de pasaportes es al llegar a la estación Pacific Central. En Vancouver, el Lions Gate Bridge (1938) une el parque Stanley con la orilla norte; de noche brilla sobre el agua.',
                el:'Το Amtrak Cascades πηγαίνει από το Σιάτλ στο Βανκούβερ και για μεγάλα κομμάτια κινείται ακριβώς δίπλα στην ακτή. Ο έλεγχος διαβατηρίων γίνεται μόλις φτάσεις στον σταθμό Pacific Central. Στο Βανκούβερ, η γέφυρα Lions Gate (1938) ενώνει το πάρκο Στάνλεϊ με τη βόρεια όχθη· τη νύχτα λάμπει πάνω από το νερό.' }
    }
  }
};

  [K_LP_A, K_LP_B].forEach(function (F) {
    Object.keys(F.schritt).forEach(function (t) { if (SCHRITT[t]) SCHRITT[t].b1 = F.schritt[t]; });
    Object.keys(F.aufgaben).forEach(function (k) { AUFGABEN[k] = F.aufgaben[k]; });
    Object.keys(F.stationen).forEach(function (k) { STATIONEN[k] = F.stationen[k]; });
  });

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
