/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — LERNPFAD-DATEN (DEUTSCH als Zielsprache)
   Statische Datei. NULL Token. Wird von allen Räumen gelesen.

   Schwesterdatei von lernpfad-daten.js (Spanisch). Gleiche Struktur,
   gleiche API, andere Zielsprache. Ein Raum lädt genau eine davon,
   je nach Profil-Feld zielsprache.

   SPRACHNEUTRALE SCHLÜSSEL (Gesetz aus dem Lernroman):
     z  = Zielsprache (hier Deutsch)
     na = Muttersprachen als Objekt { es, en }
   Kein de in na — wer Deutsch lernt, spricht es nicht als Muttersprache.

   LOKALISIERT, NICHT ÜBERSETZT (Leo, 29.08.2026): Das deutsche Café fragt
   „hier oder zum Mitnehmen", nicht „mit Milch oder schwarz". Enthalten sind
   Dinge, die die spanische Fassung nicht kennt: getrennt zahlen, das Pfund,
   stimmt so, die Kurtaxe, der Stock, die Bahncard, das Gleis, krankschreiben,
   die Versichertenkarte, der Feierabend.

   ERÖFFNUNG und ABRUNDUNG: Wo der Dialog mit dem LERNER beginnt, trägt die
   Station eine eigene eroeffnung — sie grüßt, ohne Aufgabe 1 vorwegzunehmen.
   Die abrundung ist Spikius Reaktion NACH der dritten Aufgabe (R6).

   Stand: 30.08.2026 — A1 und A2 vollständig (20 Stationen).
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  var THEMEN = [
    { id:'cafe',            em:'☕',  na:{ es:'En la cafetería',      en:'At the café', el:'Στο καφέ' } },
    { id:'restaurant',      em:'🍽️', na:{ es:'En el restaurante',    en:'At the restaurant', el:'Στο εστιατόριο' } },
    { id:'einkaufen',       em:'🛒', na:{ es:'De compras',           en:'Shopping', el:'Ψώνια' } },
    { id:'wegbeschreibung', em:'🧭', na:{ es:'Preguntar el camino',  en:'Asking directions', el:'Ρωτώντας τον δρόμο' } },
    { id:'taxi',            em:'🚕', na:{ es:'En el taxi',           en:'In the taxi', el:'Στο ταξί' } },
    { id:'familie',         em:'👪', na:{ es:'Sobre la familia',     en:'About family', el:'Για την οικογένεια' } },
    { id:'hotel',           em:'🏨', na:{ es:'En el hotel',          en:'At the hotel', el:'Στο ξενοδοχείο' } },
    { id:'bahnhof',         em:'🚉', na:{ es:'En la estación',       en:'At the station', el:'Στον σταθμό' } },
    { id:'arzt',            em:'🩺', na:{ es:'En el médico',         en:'At the doctor', el:'Στον γιατρό' } },
    { id:'wetter',          em:'🌤️', na:{ es:'Sobre el tiempo',      en:'About the weather', el:'Για τον καιρό' } }
  ];

  var STUFEN = ['a1', 'a2'];

  var KATEGORIEN = [
    { id:'essen',     em:'🍽️', na:{ es:'Comer y beber',    en:'Food & Drink', el:'Φαγητό και ποτό' },
      themen:['cafe','restaurant'] },
    { id:'unterwegs', em:'🧳', na:{ es:'De camino',        en:'Getting around', el:'Στον δρόμο' },
      themen:['wegbeschreibung','taxi','bahnhof','hotel'] },
    { id:'alltag',    em:'🛒', na:{ es:'Vida diaria',      en:'Everyday life', el:'Καθημερινή ζωή' },
      themen:['einkaufen','wetter'] },
    { id:'menschen',  em:'👥', na:{ es:'Personas',         en:'People', el:'Άνθρωποι' },
      themen:['familie','arzt'] }
  ];

  var SCHRITT = {
    cafe:            { a1:{ es:'pedir, pagar', en:'ordering, paying', el:'παραγγελία, πληρωμή' },
                       a2:{ es:'reclamar, preguntar por ingredientes', en:'complaining, asking about ingredients', el:'παράπονα, ερωτήσεις για τα υλικά' } },
    restaurant:      { a1:{ es:'una mesa, la carta', en:'a table, the menu', el:'ένα τραπέζι, ο κατάλογος' },
                       a2:{ es:'recomendaciones, compartir, propina', en:'recommendations, sharing, tipping', el:'συστάσεις, μοίρασμα, φιλοδώρημα' } },
    einkaufen:       { a1:{ es:'comprar, pagar', en:'buying, paying', el:'αγορά, πληρωμή' },
                       a2:{ es:'cambiar, probarse', en:'exchanging, trying on', el:'αλλαγή, δοκιμή' } },
    wegbeschreibung: { a1:{ es:'preguntar el camino', en:'asking the way', el:'ρωτώντας τον δρόμο' },
                       a2:{ es:'seguir indicaciones largas', en:'following longer directions', el:'ακολουθώντας μεγαλύτερες οδηγίες' } },
    taxi:            { a1:{ es:'destino, equipaje', en:'destination, luggage', el:'προορισμός, αποσκευές' },
                       a2:{ es:'prisa, ruta, recibo', en:'hurry, route, receipt', el:'βιασύνη, διαδρομή, απόδειξη' } },
    familie:         { a1:{ es:'hermanos, nombres, edad', en:'siblings, names, age', el:'αδέρφια, ονόματα, ηλικία' },
                       a2:{ es:'contar el pasado', en:'talking about the past', el:'μιλώντας για το παρελθόν' } },
    hotel:           { a1:{ es:'reserva, desayuno, planta', en:'booking, breakfast, floor', el:'κράτηση, πρωινό, όροφος' },
                       a2:{ es:'reclamar, cambiar de habitación', en:'complaining, changing rooms', el:'παράπονα, αλλαγή δωματίου' } },
    bahnhof:         { a1:{ es:'billete, hora, andén', en:'ticket, time, platform', el:'εισιτήριο, ώρα, αποβάθρα' },
                       a2:{ es:'retraso, transbordo', en:'delay, connection', el:'καθυστέρηση, ανταπόκριση' } },
    arzt:            { a1:{ es:'dolor, desde cuándo', en:'pain, since when', el:'πόνος, από πότε' },
                       a2:{ es:'qué pasó, alergias, cita', en:'what happened, allergies, appointment', el:'τι συνέβη, αλλεργίες, ραντεβού' } },
    wetter:          { a1:{ es:'hoy y mañana', en:'today and tomorrow', el:'σήμερα και αύριο' },
                       a2:{ es:'previsión, proponer algo', en:'forecast, making a suggestion', el:'πρόγνωση, μια πρόταση' } }
  };

  var ROLLEN = {
    cafe:            { spikiu:{ es:'el camarero', en:'the barista', el:'ο σερβιτόρος' },
                       lerner:{ es:'el cliente', en:'the customer', el:'ο πελάτης' },
                       ort:   { es:'en el mostrador', en:'at the counter', el:'στον πάγκο' } },
    restaurant:      { spikiu:{ es:'el camarero', en:'the waiter', el:'ο σερβιτόρος' },
                       lerner:{ es:'el cliente', en:'the guest', el:'ο πελάτης' },
                       ort:   { es:'en un restaurante', en:'in a restaurant', el:'σε ένα εστιατόριο' } },
    einkaufen:       { spikiu:{ es:'la vendedora', en:'the vendor', el:'η πωλήτρια' },
                       lerner:{ es:'la clienta', en:'the customer', el:'η πελάτισσα' },
                       ort:   { es:'en el mercado semanal', en:'at the weekly market', el:'στη λαϊκή αγορά' } },
    wegbeschreibung: { spikiu:{ es:'un transeúnte', en:'a passer-by', el:'ένας περαστικός' },
                       lerner:{ es:'alguien que busca', en:'someone looking for a place', el:'κάποιος που ψάχνει ένα μέρος' },
                       ort:   { es:'en la calle', en:'in the street', el:'στον δρόμο' } },
    taxi:            { spikiu:{ es:'el taxista', en:'the driver', el:'ο ταξιτζής' },
                       lerner:{ es:'con una maleta', en:'with a suitcase', el:'με μια βαλίτσα' },
                       ort:   { es:'en la acera, de noche', en:'at the kerb, in the evening', el:'στο πεζοδρόμιο, το βράδυ' } },
    familie:         { spikiu:{ es:'una vecina', en:'a neighbour', el:'μια γειτόνισσα' },
                       lerner:{ es:'tú mismo', en:'yourself', el:'εσύ ο ίδιος' },
                       ort:   { es:'en la escalera', en:'on the stairs', el:'στη σκάλα' } },
    hotel:           { spikiu:{ es:'el recepcionista', en:'the front desk clerk', el:'ο ρεσεψιονίστ' },
                       lerner:{ es:'el huésped', en:'the guest', el:'ο πελάτης του ξενοδοχείου' },
                       ort:   { es:'en recepción', en:'at reception', el:'στη ρεσεψιόν' } },
    bahnhof:         { spikiu:{ es:'la empleada de la ventanilla', en:'the ticket agent', el:'η υπάλληλος στο γκισέ' },
                       lerner:{ es:'el viajero', en:'the traveller', el:'ο ταξιδιώτης' },
                       ort:   { es:'en la ventanilla', en:'at the counter', el:'στο γκισέ' } },
    arzt:            { spikiu:{ es:'la médica', en:'the doctor', el:'η γιατρός' },
                       lerner:{ es:'el paciente', en:'the patient', el:'ο ασθενής' },
                       ort:   { es:'en la consulta', en:'in the surgery', el:'στο ιατρείο' } },
    wetter:          { spikiu:{ es:'un compañero de trabajo', en:'a coworker', el:'ένας συνάδελφος' },
                       lerner:{ es:'tú mismo', en:'yourself', el:'εσύ ο ίδιος' },
                       ort:   { es:'delante de la oficina', en:'outside the office', el:'έξω από το γραφείο' } }
  };

  var AUFGABEN = {
    'a1.arzt': [
      { de:'Sag, dass du Kopfschmerzen hast', es:'Di que te duele la cabeza', en:'Say you have a headache', el:'Πες ότι σε πονάει το κεφάλι' },
      { de:'Sag: seit gestern, und dass du Fieber hast', es:'Di que desde ayer y que tienes fiebre', en:'Say since yesterday, and that you have a fever', el:'Πες ότι είναι από χθες και ότι έχεις πυρετό' },
      { de:'Bedanke dich bei der Ärztin', es:'Da las gracias a la doctora', en:'Thank the doctor', el:'Ευχαρίστησε τη γιατρό' }
    ],
    'a1.bahnhof': [
      { de:'Kaufe eine Fahrkarte nach München', es:'Compra un billete para Múnich', en:'Buy a ticket to Munich', el:'Αγόρασε ένα εισιτήριο για Μόναχο' },
      { de:'Sag: hin und zurück, und frag, wann der Zug fährt', es:'Di que ida y vuelta y pregunta a qué hora sale el tren', en:'Say return, and ask when the train leaves', el:'Πες «με επιστροφή» και ρώτα πότε φεύγει το τρένο' },
      { de:'Frag, von welchem Gleis er fährt', es:'Pregunta de qué andén sale', en:'Ask which platform it leaves from', el:'Ρώτα από ποια αποβάθρα φεύγει' }
    ],
    'a1.cafe': [
      { de:'Bestelle einen Kaffee', es:'Pide un café', en:'Order a coffee', el:'Παράγγειλε έναν καφέ' },
      { de:'Sag, dass du ihn hier trinken möchtest', es:'Di que lo quieres para tomar allí', en:'Say you want it for here', el:'Πες ότι τον θέλεις για εδώ' },
      { de:'Verneine und frag, was es kostet', es:'Di que no y pregunta cuánto es', en:'Say no and ask what it costs', el:'Πες όχι και ρώτα πόσο κάνει' }
    ],
    'a1.einkaufen': [
      { de:'Melde dich und bestelle ein Kilo Äpfel', es:'Di que eres tú y pide un kilo de manzanas', en:'Say it is you and ask for a kilo of apples', el:'Πες ότι είσαι εσύ και ζήτα ένα κιλό μήλα' },
      { de:'Bestelle ein halbes Pfund Käse und frag, was es kostet', es:'Pide un cuarto de kilo de queso y pregunta cuánto cuesta', en:'Ask for half a pound of cheese and what it costs', el:'Ζήτα μισό πάουντ τυρί και ρώτα πόσο κάνει' },
      { de:'Gib ihr zehn Euro', es:'Dale diez euros', en:'Hand over ten euros', el:'Δώσε δέκα ευρώ' }
    ],
    'a1.familie': [
      { de:'Bejahe und sag, dass du eine Schwester hast', es:'Di que sí, que tienes una hermana', en:'Say yes, you have a sister', el:'Πες ναι, έχεις μια αδερφή' },
      { de:'Sag, dass sie Klara heißt', es:'Di que se llama Klara', en:'Say her name is Klara', el:'Πες ότι τη λένε Κλάρα' },
      { de:'Sag, dass sie zwölf ist', es:'Di que tiene doce años', en:'Say she is twelve', el:'Πες ότι είναι δώδεκα' }
    ],
    'a1.hotel': [
      { de:'Bejahe und nenne deinen Namen: Weber', es:'Di que sí, a nombre de Weber', en:'Say yes, under the name Weber', el:'Πες ναι, στο όνομα Βέμπερ' },
      { de:'Bestätige und frag, ob das Frühstück dabei ist', es:'Confirma y pregunta si el desayuno está incluido', en:'Confirm and ask whether breakfast is included', el:'Επιβεβαίωσε και ρώτα αν περιλαμβάνεται πρωινό' },
      { de:'Bedanke dich und frag, in welchem Stock das Zimmer ist', es:'Da las gracias y pregunta en qué planta está la habitación', en:'Say thanks and ask which floor the room is on', el:'Ευχαρίστησε και ρώτα σε ποιον όροφο είναι το δωμάτιο' }
    ],
    'a1.restaurant': [
      { de:'Verneine und sag, dass ihr zu zweit seid', es:'Di que no y que son dos personas', en:'Say no, and that there are two of you', el:'Πες όχι, και ότι είστε δύο' },
      { de:'Frag, was er empfiehlt', es:'Pregunta qué recomienda', en:'Ask what he recommends', el:'Ρώτα τι προτείνει' },
      { de:'Bestelle den Schweinebraten', es:'Pide el asado de cerdo', en:'Order the roast pork', el:'Παράγγειλε το χοιρινό ψητό' }
    ],
    'a1.taxi': [
      { de:'Frag, ob das Taxi frei ist', es:'Pregunta si el taxi está libre', en:'Ask whether the taxi is free', el:'Ρώτα αν το ταξί είναι ελεύθερο' },
      { de:'Sag, dass du zum Flughafen willst', es:'Di que vas al aeropuerto', en:'Say you are going to the airport', el:'Πες ότι πηγαίνεις στο αεροδρόμιο' },
      { de:'Bejahe und sag, dass du einen Koffer hast', es:'Di que sí, que llevas una maleta', en:'Say yes, you have one suitcase', el:'Πες ναι, έχεις μια βαλίτσα' }
    ],
    'a1.wegbeschreibung': [
      { de:'Frag, wo der Marktplatz ist', es:'Pregunta dónde está la plaza del mercado', en:'Ask where the market square is', el:'Ρώτα πού είναι η πλατεία της αγοράς' },
      { de:'Frag, ob es weit ist', es:'Pregunta si está lejos', en:'Ask whether it is far', el:'Ρώτα αν είναι μακριά' },
      { de:'Bedanke dich', es:'Da las gracias', en:'Say thank you', el:'Πες ευχαριστώ' }
    ],
    'a1.wetter': [
      { de:'Stimme zu und sag, dass die Sonne scheint und es warm ist', es:'Dale la razón y di que hace sol y calor', en:'Agree and say the sun is out and it is warm', el:'Συμφώνησε και πες ότι έχει ήλιο και κάνει ζέστη' },
      { de:'Sag, dass es morgen wohl regnet', es:'Di que mañana probablemente llueve', en:'Say it will probably rain tomorrow', el:'Πες ότι αύριο μάλλον θα βρέξει' },
      { de:'Sag, dass das eine gute Idee ist, und verabschiede dich bis morgen', es:'Di que es buena idea y despídete hasta mañana', en:'Say that is a good idea and say see you tomorrow', el:'Πες ότι είναι καλή ιδέα και πες «τα λέμε αύριο»' }
    ],
    'a2.arzt': [
      { de:'Erzähle, dass du letzte Woche gestürzt bist und die Schulter schlimmer geworden ist', es:'Cuenta que te caíste la semana pasada y que el hombro ha empeorado', en:'Say you fell last week and your shoulder has got worse', el:'Πες ότι έπεσες την περασμένη εβδομάδα και ότι ο ώμος σου χειροτέρεψε' },
      { de:'Sag, dass du nur Schmerztabletten nimmst und gegen Penizillin allergisch bist', es:'Di que solo tomas analgésicos y que eres alérgico a la penicilina', en:'Say you only take painkillers and that you are allergic to penicillin', el:'Πες ότι παίρνεις μόνο παυσίπονα και ότι είσαι αλλεργικός στην πενικιλίνη' },
      { de:'Stimme zu und frag, ob du noch einen Termin brauchst', es:'Di que de acuerdo y pregunta si necesitas otra cita', en:'Agree and ask whether you need another appointment', el:'Συμφώνησε και ρώτα αν χρειάζεσαι κι άλλο ραντεβού' }
    ],
    'a2.bahnhof': [
      { de:'Sag, dass dein Zug zwanzig Minuten Verspätung hat', es:'Di que tu tren lleva veinte minutos de retraso', en:'Say your train is twenty minutes late', el:'Πες ότι το τρένο σου έχει είκοσι λεπτά καθυστέρηση' },
      { de:'Sag: in Hannover, um Viertel nach drei', es:'Di que en Hannover, a las tres y cuarto', en:'Say in Hanover, at quarter past three', el:'Πες: στο Ανόβερο, στις τρεις και τέταρτο' },
      { de:'Frag, was passiert, wenn du ihn verpasst', es:'Pregunta qué pasa si lo pierdes', en:'Ask what happens if you miss it', el:'Ρώτα τι γίνεται αν τη χάσεις' }
    ],
    'a2.cafe': [
      { de:'Sag höflich, dass dein Kaffee kalt ist', es:'Di con cortesía que tu café está frío', en:'Politely say your coffee is cold', el:'Πες ευγενικά ότι ο καφές σου είναι κρύος' },
      { de:'Bedanke dich und frag, ob in dem Kuchen Nüsse sind', es:'Da las gracias y pregunta si la tarta lleva frutos secos', en:'Say thanks and ask whether the cake has nuts in it', el:'Ευχαρίστησε και ρώτα αν το κέικ έχει ξηρούς καρπούς' },
      { de:'Sag, dass du allergisch bist, und nimm den Zitronenkuchen', es:'Di que eres alérgico y pide el de limón', en:'Say you are allergic and take the lemon cake', el:'Πες ότι είσαι αλλεργικός και πάρε το κέικ λεμονιού' }
    ],
    'a2.einkaufen': [
      { de:'Sag, dass du das Hemd gestern gekauft hast und es dir zu groß ist', es:'Di que compraste esta camisa ayer y que te queda grande', en:'Say you bought this shirt yesterday and it is too big for you', el:'Πες ότι αγόρασες αυτό το πουκάμισο χθες και ότι σου είναι μεγάλο' },
      { de:'Bejahe und frag, ob du es umtauschen kannst', es:'Di que sí y pregunta si puedes cambiarla', en:'Say yes and ask whether you can exchange it', el:'Πες ναι και ρώτα αν μπορείς να το αλλάξεις' },
      { de:'Sag: eine Nummer kleiner, und frag, ob du es anprobieren darfst', es:'Di que una talla menos y pregunta si te la puedes probar', en:'Say one size down and ask whether you may try it on', el:'Πες ένα νούμερο μικρότερο και ρώτα αν μπορείς να το δοκιμάσεις' }
    ],
    'a2.familie': [
      { de:'Sag, dass ihr in einem kleinen Dorf gewohnt habt', es:'Di que vivíais en un pueblo pequeño', en:'Say you lived in a small village', el:'Πες ότι έμενες σε ένα μικρό χωριό' },
      { de:'Bejahe und erzähle, dass ihr euch sonntags bei der Tante getroffen habt', es:'Di que sí y cuenta que los domingos se reunían en casa de tu tía', en:'Say yes, and that on Sundays you met at your aunt\'s', el:'Πες ναι, και ότι τις Κυριακές βρισκόσασταν στης θείας σου' },
      { de:'Sag, dass deine Schwester weggezogen ist und dass du sie vermisst', es:'Di que tu hermana se mudó y que la echas de menos', en:'Say your sister moved away and that you miss her', el:'Πες ότι η αδερφή σου μετακόμισε και ότι σου λείπει' }
    ],
    'a2.hotel': [
      { de:'Sag, dass die Heizung nicht funktioniert', es:'Di que la calefacción no funciona', en:'Say the heating is not working', el:'Πες ότι η θέρμανση δεν λειτουργεί' },
      { de:'Sag: seit gestern Abend, und dass es kein warmes Wasser gibt', es:'Di que desde anoche y que tampoco hay agua caliente', en:'Say since last night, and that there is no hot water either', el:'Πες ότι είναι από χθες το βράδυ και ότι δεν έχει ούτε ζεστό νερό' },
      { de:'Sag, dass du lieber das Zimmer wechseln möchtest', es:'Di que prefieres cambiar de habitación', en:'Say you would rather change rooms', el:'Πες ότι θα προτιμούσες να αλλάξεις δωμάτιο' }
    ],
    'a2.restaurant': [
      { de:'Sag, dass ihr noch nicht gewählt habt, und frag nach der Spezialität', es:'Di que todavía no han elegido y pregunta por la especialidad', en:'Say you have not decided yet and ask about the speciality', el:'Πες ότι δεν έχεις αποφασίσει ακόμα και ρώτα για τη σπεσιαλιτέ' },
      { de:'Frag nach etwas Leichterem und sag, dass ihr teilen wollt', es:'Pregunta si hay algo más ligero y di que quieren compartir', en:'Ask for something lighter and say you want to share', el:'Ζήτα κάτι πιο ελαφρύ και πες ότι θέλετε να το μοιραστείτε' },
      { de:'Nimm den Fisch und frag, ob ihr getrennt zahlen könnt', es:'Acepta el pescado y pregunta si pueden pagar por separado', en:'Take the fish and ask whether you can pay separately', el:'Πάρε το ψάρι και ρώτα αν μπορείτε να πληρώσετε χωριστά' }
    ],
    'a2.taxi': [
      { de:'Sag, dass du zum Flughafen willst und es eilig hast', es:'Di que vas al aeropuerto y que tienes prisa', en:'Say you are going to the airport and you are in a hurry', el:'Πες ότι πηγαίνεις στο αεροδρόμιο και ότι βιάζεσαι' },
      { de:'Frag, ob der Weg durch die Stadt schneller ist', es:'Pregunta si por el centro es más rápido', en:'Ask whether going through town is faster', el:'Ρώτα αν είναι πιο γρήγορα από το κέντρο' },
      { de:'Sag: dann diesen Weg, und frag nach einer Quittung', es:'Di que vaya por ahí y pregunta por un recibo', en:'Say take that route, and ask for a receipt', el:'Πες να πάει από εκεί και ζήτα απόδειξη' }
    ],
    'a2.wegbeschreibung': [
      { de:'Frag, wie du zum Museum kommst', es:'Pregunta cómo llegar al museo', en:'Ask how to get to the museum', el:'Ρώτα πώς θα πας στο μουσείο' },
      { de:'Frag, wie es danach weitergeht', es:'Pregunta cómo sigues después', en:'Ask what comes after that', el:'Ρώτα τι ακολουθεί μετά' },
      { de:'Frag, ob man zu Fuß hingehen kann', es:'Pregunta si se puede ir a pie', en:'Ask whether you can walk there', el:'Ρώτα αν μπορείς να πας με τα πόδια' }
    ],
    'a2.wetter': [
      { de:'Sag, es kommt aufs Wetter an, und frag nach der Vorhersage', es:'Di que depende del tiempo y pregunta por la previsión', en:'Say it depends on the weather and ask about the forecast', el:'Πες ότι εξαρτάται από τον καιρό και ρώτα για την πρόγνωση' },
      { de:'Frag, wie es am Nachmittag wird', es:'Pregunta qué tiempo hará por la tarde', en:'Ask what it will be like in the afternoon', el:'Ρώτα πώς θα είναι το απόγευμα' },
      { de:'Schlag vor, nachmittags zu fahren, und sag, dass du eine Jacke mitnimmst', es:'Propón ir por la tarde y di que llevas una chaqueta', en:'Suggest going in the afternoon and say you will bring a jacket', el:'Πρότεινε να πάτε το απόγευμα και πες ότι θα πάρεις ένα μπουφάν' }
    ]
  };

  var STATIONEN = {

    'a1.arzt': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast seit gestern Kopfschmerzen und Fieber.', es:'Desde ayer te duele la cabeza y tienes fiebre.', en:'Since yesterday you\'ve had a headache and a fever.', el:'Από χθες σε πονάει το κεφάλι και έχεις πυρετό.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ich schreibe Sie für drei Tage krank. Gute Besserung!', na:{ es:'Le doy la baja por tres días. ¡Que se mejore!', en:'I\'ll sign you off for three days. Get well soon!', el:'Σου δίνω άδεια ασθενείας για τρεις μέρες. Περαστικά!' } },
      wortschatz: [
        { z:'die Schmerzen', na:{ es:'el dolor', en:'the pain', el:'ο πόνος' } },
        { z:'der Kopf', na:{ es:'la cabeza', en:'the head', el:'το κεφάλι' } },
        { z:'der Bauch', na:{ es:'la barriga', en:'the stomach', el:'η κοιλιά' } },
        { z:'das Fieber', na:{ es:'la fiebre', en:'the fever', el:'ο πυρετός' } },
        { z:'die Tablette', na:{ es:'la pastilla', en:'the tablet', el:'το χάπι' } },
        { z:'das Rezept', na:{ es:'la receta', en:'the prescription', el:'η συνταγή' } },
        { z:'die Sprechstunde', na:{ es:'la consulta', en:'the surgery hours', el:'οι ώρες του ιατρείου' } },
        { z:'die Versichertenkarte', na:{ es:'la tarjeta sanitaria', en:'the health insurance card', el:'η κάρτα ασφάλισης υγείας' } },
        { z:'krankschreiben', na:{ es:'dar la baja', en:'to sign off sick', el:'δίνω άδεια ασθενείας' } },
        { z:'husten', na:{ es:'toser', en:'to cough', el:'βήχω' } },
        { z:'müde', na:{ es:'cansado', en:'tired', el:'κουρασμένος' } },
        { z:'die Apotheke', na:{ es:'la farmacia', en:'the pharmacy', el:'το φαρμακείο' } }
      ],
      dialog: {
        rolle: { es:'la médica', en:'the doctor', el:'η γιατρός' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag. Was führt Sie zu mir?', na:{ es:'Buenos días. ¿Qué le trae por aquí?', en:'Hello. What brings you in?', el:'Καλημέρα. Τι σας φέρνει σε μένα;' } },
          { wer:'lerner', z:'Ich habe Kopfschmerzen.', na:{ es:'Me duele la cabeza.', en:'I have a headache.', el:'Με πονάει το κεφάλι.' } },
          { wer:'spikiu', z:'Seit wann denn?', na:{ es:'¿Desde cuándo?', en:'Since when?', el:'Από πότε;' } },
          { wer:'lerner', z:'Seit gestern. Und ich habe Fieber.', na:{ es:'Desde ayer. Y tengo fiebre.', en:'Since yesterday. And I have a fever.', el:'Από χθες. Και έχω πυρετό.' } },
          { wer:'spikiu', z:'Nehmen Sie eine Tablette und bleiben Sie im Bett.', na:{ es:'Tome una pastilla y quédese en cama.', en:'Take a tablet and stay in bed.', el:'Πάρτε ένα χάπι και μείνετε στο κρεβάτι.' } },
          { wer:'lerner', z:'Danke, Frau Doktor.', na:{ es:'Gracias, doctora.', en:'Thank you, doctor.', el:'Ευχαριστώ, γιατρέ.' } }
        ]
      },
      lesetext: {
        z:'Eine Frau geht zur Ärztin. Sie hat seit gestern Kopfschmerzen und Fieber. Die Ärztin sagt, sie soll eine Tablette nehmen und im Bett bleiben. Sie schreibt sie für drei Tage krank.',
        na:{ es:'Una mujer va a la médica. Desde ayer tiene dolor de cabeza y fiebre. La médica le dice que tome una pastilla y se quede en cama. Le da la baja por tres días.', en:'A woman goes to the doctor. Since yesterday she has had a headache and a fever. The doctor tells her to take a tablet and stay in bed. She signs her off for three days.', el:'Μια γυναίκα πηγαίνει στη γιατρό. Από χθες την πονάει το κεφάλι και έχει πυρετό. Η γιατρός της λέει να πάρει ένα χάπι και να μείνει στο κρεβάτι. Της δίνει άδεια ασθενείας για τρεις μέρες.' },
        frage:{ es:'¿Desde cuándo le duele la cabeza?', en:'Since when has she had the headache?', el:'Από πότε την πονάει το κεφάλι;' },
        optionen:[
          { na:{ es:'Desde ayer', en:'Since yesterday', el:'Από χθες' }, richtig:true },
          { na:{ es:'Desde hace una semana', en:'For a week', el:'Εδώ και μια εβδομάδα' }, richtig:false },
          { na:{ es:'Desde esta mañana', en:'Since this morning', el:'Από σήμερα το πρωί' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que te duele la barriga y desde cuándo. Dos frases.', en:'Say you have a stomachache and say since when. Two sentences.', el:'Πες ότι σε πονάει η κοιλιά και από πότε. Δύο προτάσεις.' },
        muster:'Ich habe Bauchschmerzen. Seit gestern Abend.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Aquí el alemán y el español no se parecen. El español dice **me duele** la cabeza — la cabeza es la que actúa. El alemán dice **ich habe** Kopfschmerzen: yo tengo el dolor. Cambia quién manda en la frase.', en:'English says "my head hurts" or "I have a headache" — German only has the second option: **ich habe** Kopfschmerzen. Never "mein Kopf tut weh" in the doctor\'s office; that sounds like a child.', el:'Τα ελληνικά λένε «με πονάει το κεφάλι» ή «έχω πονοκέφαλο» — τα γερμανικά έχουν μόνο τη δεύτερη επιλογή: **ich habe** Kopfschmerzen, δηλαδή «έχω πόνους στο κεφάλι». Ποτέ «mein Kopf tut weh» στο ιατρείο· ακούγεται σαν παιδί.' },
        beispiele:[
          { z:'Ich habe Kopfschmerzen.', na:{ es:'Me duele la cabeza.', en:'I have a headache.', el:'Με πονάει το κεφάλι.' } },
          { z:'Ich habe Fieber.', na:{ es:'Tengo fiebre.', en:'I have a fever.', el:'Έχω πυρετό.' } }
        ]
      }
    },

    'a1.bahnhof': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du willst nach München und wieder zurück.', es:'Quieres ir a Múnich y volver.', en:'You want to go to Munich and come back.', el:'Θέλεις να πας στο Μόναχο και να γυρίσεις.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Tag. Bitte sehr?', na:{ es:'Buenos días. ¿Dígame?', en:'Good morning. Yes please?', el:'Καλημέρα. Ορίστε;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gleis vier. Das macht dreiunddreißig Euro — gute Fahrt!', na:{ es:'Andén cuatro. Son treinta y tres euros. ¡Buen viaje!', en:'Platform four. That\'s thirty-three euros — have a good trip!', el:'Αποβάθρα τέσσερα. Κάνει τριάντα τρία ευρώ — καλό ταξίδι!' } },
      wortschatz: [
        { z:'die Fahrkarte', na:{ es:'el billete', en:'the ticket', el:'το εισιτήριο' } },
        { z:'der Schalter', na:{ es:'la ventanilla', en:'the counter', el:'το γκισέ' } },
        { z:'das Gleis', na:{ es:'el andén', en:'the platform', el:'η γραμμή (αποβάθρα)' } },
        { z:'einfach', na:{ es:'solo ida', en:'one way', el:'απλή μετάβαση' } },
        { z:'hin und zurück', na:{ es:'ida y vuelta', en:'return', el:'με επιστροφή' } },
        { z:'abfahren', na:{ es:'salir', en:'to depart', el:'αναχωρώ' } },
        { z:'ankommen', na:{ es:'llegar', en:'to arrive', el:'φτάνω' } },
        { z:'umsteigen', na:{ es:'hacer transbordo', en:'to change trains', el:'αλλάζω τρένο' } },
        { z:'der Fahrplan', na:{ es:'el horario', en:'the timetable', el:'ο πίνακας δρομολογίων' } },
        { z:'der Bahnsteig', na:{ es:'el andén', en:'the platform', el:'η αποβάθρα' } },
        { z:'der Automat', na:{ es:'la máquina', en:'the machine', el:'το μηχάνημα' } },
        { z:'die Bahncard', na:{ es:'la tarjeta de descuento', en:'the rail discount card', el:'η κάρτα έκπτωσης του τρένου' } }
      ],
      dialog: {
        rolle: { es:'la empleada de la ventanilla', en:'the ticket agent', el:'η υπάλληλος στο γκισέ' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag. Bitte sehr?', na:{ es:'Buenos días. ¿Dígame?', en:'Good morning. Yes please?', el:'Καλημέρα. Ορίστε;' } },
          { wer:'lerner', z:'Eine Fahrkarte nach München, bitte.', na:{ es:'Un billete para Múnich, por favor.', en:'A ticket to Munich, please.', el:'Ένα εισιτήριο για Μόναχο, παρακαλώ.' } },
          { wer:'spikiu', z:'Einfach oder hin und zurück?', na:{ es:'¿Solo ida o ida y vuelta?', en:'One way or return?', el:'Απλή μετάβαση ή με επιστροφή;' } },
          { wer:'lerner', z:'Hin und zurück. Wann fährt der Zug?', na:{ es:'Ida y vuelta. ¿A qué hora sale?', en:'Return. When does the train leave?', el:'Με επιστροφή. Πότε φεύγει το τρένο;' } },
          { wer:'spikiu', z:'Der nächste um neun Uhr zwölf.', na:{ es:'El próximo a las nueve y doce.', en:'The next one at nine twelve.', el:'Το επόμενο στις εννιά και δώδεκα.' } },
          { wer:'lerner', z:'Und von welchem Gleis?', na:{ es:'¿Y de qué andén?', en:'And from which platform?', el:'Και από ποια αποβάθρα;' } }
        ]
      },
      lesetext: {
        z:'Am Schalter kauft eine Frau eine Fahrkarte nach München, hin und zurück. Sie kostet dreiunddreißig Euro. Der nächste Zug fährt um neun Uhr zwölf von Gleis vier.',
        na:{ es:'En la ventanilla una mujer compra un billete a Múnich, ida y vuelta. Cuesta treinta y tres euros. El próximo tren sale a las nueve y doce del andén cuatro.', en:'At the counter a woman buys a ticket to Munich, return. It costs thirty-three euros. The next train leaves at nine twelve from platform four.', el:'Στο γκισέ μια γυναίκα αγοράζει ένα εισιτήριο για Μόναχο, με επιστροφή. Κοστίζει τριάντα τρία ευρώ. Το επόμενο τρένο φεύγει στις εννιά και δώδεκα από την αποβάθρα τέσσερα.' },
        frage:{ es:'¿De qué andén sale el tren?', en:'Which platform does the train leave from?', el:'Από ποια αποβάθρα φεύγει το τρένο;' },
        optionen:[
          { na:{ es:'Andén cuatro', en:'Platform four', el:'Αποβάθρα τέσσερα' }, richtig:true },
          { na:{ es:'Andén nueve', en:'Platform nine', el:'Αποβάθρα εννιά' }, richtig:false },
          { na:{ es:'Andén doce', en:'Platform twelve', el:'Αποβάθρα δώδεκα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Compra un billete a Berlín y pregunta por el andén. Dos frases.', en:'Buy a ticket to Berlin and ask which platform. Two sentences.', el:'Αγόρασε ένα εισιτήριο για Βερολίνο και ρώτα από ποια αποβάθρα. Δύο προτάσεις.' },
        muster:'Eine Fahrkarte nach Berlin, bitte. Von welchem Gleis fährt der Zug?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Las preguntas alemanas empiezan casi todas con **W**: **wann** (cuándo), **wo** (dónde), **was** (qué), **wie** (cómo), **wer** (quién). Después va el verbo: „Wann fährt der Zug?"', en:'German question words nearly all start with **W**: **wann** (when), **wo** (where), **was** (what), **wie** (how), **wer** (who). The verb follows straight after: "Wann fährt der Zug?"', el:'Σχεδόν όλες οι γερμανικές ερωτηματικές λέξεις αρχίζουν από **W**: **wann** (πότε), **wo** (πού), **was** (τι), **wie** (πώς), **wer** (ποιος). Αμέσως μετά έρχεται το ρήμα: «Wann fährt der Zug?»' },
        beispiele:[
          { z:'Wann fährt der Zug?', na:{ es:'¿A qué hora sale el tren?', en:'When does the train leave?', el:'Πότε φεύγει το τρένο;' } },
          { z:'Wo ist das Gleis?', na:{ es:'¿Dónde está el andén?', en:'Where is the platform?', el:'Πού είναι η αποβάθρα;' } }
        ]
      }
    },

    'a1.cafe': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du bist Gast im Café. Du möchtest einen Kaffee zum Hiertrinken und danach zahlen.', es:'Eres cliente en la cafetería. Quieres un café para tomar allí y después pagar.', en:'You\'re a customer at the café. You want a coffee for here and then to pay.', el:'Είσαι πελάτης στο καφέ. Θέλεις έναν καφέ για εδώ και μετά να πληρώσεις.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Das macht drei Euro zwanzig. Schönen Tag noch!', na:{ es:'Son tres euros veinte. ¡Que tenga un buen día!', en:'That\'s three twenty. Have a nice day!', el:'Κάνει τρία είκοσι. Καλή σου μέρα!' } },
      wortschatz: [
        { z:'der Kaffee', na:{ es:'el café', en:'coffee', el:'ο καφές' } },
        { z:'der Tee', na:{ es:'el té', en:'tea', el:'το τσάι' } },
        { z:'das Wasser', na:{ es:'el agua', en:'water', el:'το νερό' } },
        { z:'die Milch', na:{ es:'la leche', en:'milk', el:'το γάλα' } },
        { z:'der Zucker', na:{ es:'el azúcar', en:'sugar', el:'η ζάχαρη' } },
        { z:'das Glas', na:{ es:'el vaso', en:'a glass', el:'ένα ποτήρι' } },
        { z:'die Tasse', na:{ es:'la taza', en:'the cup', el:'το φλιτζάνι' } },
        { z:'zum Mitnehmen', na:{ es:'para llevar', en:'to go', el:'πακέτο (για έξω)' } },
        { z:'zahlen', na:{ es:'pagar', en:'to pay', el:'πληρώνω' } },
        { z:'bitte', na:{ es:'por favor', en:'please', el:'παρακαλώ' } },
        { z:'danke', na:{ es:'gracias', en:'thank you', el:'ευχαριστώ' } },
        { z:'stimmt so', na:{ es:'quédese con la vuelta', en:'keep the change', el:'κράτα τα ρέστα' } }
      ],
      dialog: {
        rolle: { es:'el camarero', en:'the barista', el:'ο σερβιτόρος' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag! Was darf\'s sein?', na:{ es:'¡Buenos días! ¿Qué le pongo?', en:'Hello! What can I get you?', el:'Καλημέρα! Τι θα πάρετε;' } },
          { wer:'lerner', z:'Einen Kaffee, bitte.', na:{ es:'Un café, por favor.', en:'A coffee, please.', el:'Έναν καφέ, παρακαλώ.' } },
          { wer:'spikiu', z:'Gerne. Zum Hiertrinken oder zum Mitnehmen?', na:{ es:'Claro. ¿Para tomar aquí o para llevar?', en:'Sure. For here or to go?', el:'Ευχαρίστως. Για εδώ ή πακέτο;' } },
          { wer:'lerner', z:'Zum Hiertrinken, bitte.', na:{ es:'Para tomar aquí, por favor.', en:'For here, please.', el:'Για εδώ, παρακαλώ.' } },
          { wer:'spikiu', z:'Kommt sofort. Sonst noch etwas?', na:{ es:'Enseguida. ¿Algo más?', en:'Coming right up. Anything else?', el:'Έρχεται αμέσως. Κάτι άλλο;' } },
          { wer:'lerner', z:'Nein danke. Was macht das?', na:{ es:'No, gracias. ¿Cuánto le debo?', en:'No thanks. How much do I owe you?', el:'Όχι, ευχαριστώ. Πόσο κάνει;' } }
        ]
      },
      lesetext: {
        z:'Marta geht ins Café. Sie bestellt einen Kaffee zum Hiertrinken. Der Kaffee kostet drei Euro zwanzig. Marta gibt fünf Euro. Der Kellner gibt ihr eine Euro achtzig zurück.',
        na:{ es:'Marta va a la cafetería. Pide un café para tomar allí. El café cuesta tres euros veinte. Marta da cinco euros. El camarero le devuelve un euro ochenta.', en:'Marta goes into the café. She orders a coffee for here. The coffee costs three twenty. Marta gives five euros. The waiter gives her one eighty back.', el:'Η Μάρτα μπαίνει στο καφέ. Παραγγέλνει έναν καφέ για εδώ. Ο καφές κοστίζει τρία είκοσι. Η Μάρτα δίνει πέντε ευρώ. Ο σερβιτόρος της δίνει ρέστα ένα ογδόντα.' },
        frage:{ es:'¿Cuánto le devuelven a Marta?', en:'How much does Marta get back?', el:'Πόσα ρέστα παίρνει η Μάρτα;' },
        optionen:[
          { na:{ es:'Un euro ochenta', en:'One eighty', el:'Ένα ογδόντα' }, richtig:true },
          { na:{ es:'Tres euros veinte', en:'Three twenty', el:'Τρία είκοσι' }, richtig:false },
          { na:{ es:'Cinco euros', en:'Five euros', el:'Πέντε ευρώ' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pide un té con azúcar y di que quieres pagar. Dos frases.', en:'Order a tea with sugar and say you want to pay. Two sentences.', el:'Παράγγειλε ένα τσάι με ζάχαρη και πες ότι θέλεις να πληρώσεις. Δύο προτάσεις.' },
        muster:'Einen Tee mit Zucker, bitte. Ich möchte zahlen.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'En alemán cada cosa lleva una palabrita delante: **der** Kaffee, **die** Milch, **das** Wasser. No hay regla que funcione siempre — se aprende junto con la palabra, como el género en español, solo que son tres en vez de dos.', en:'In German every thing carries a little word in front: **der** coffee, **die** milk, **das** water. There is no rule that always works — you learn it together with the word. Three of them, not two.', el:'Στα γερμανικά κάθε πράγμα έχει μπροστά του μια μικρή λεξούλα: **der** Kaffee, **die** Milch, **das** Wasser. Όπως και στα ελληνικά, τρία γένη — αλλά δεν συμπίπτουν πάντα με τα δικά μας: το γάλα είναι ουδέτερο, die Milch όμως θηλυκό. Δεν υπάρχει κανόνας που να ισχύει πάντα — το μαθαίνεις μαζί με τη λέξη.' },
        beispiele:[
          { z:'der Kaffee', na:{ es:'el café', en:'the coffee', el:'ο καφές' } },
          { z:'die Milch', na:{ es:'la leche', en:'the milk', el:'το γάλα' } }
        ]
      }
    },

    'a1.einkaufen': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Auf dem Wochenmarkt kaufst du Äpfel und Käse. Du hast einen Zehn-Euro-Schein.', es:'En el mercado compras manzanas y queso. Llevas un billete de diez euros.', en:'At the market you buy apples and cheese. You have a ten-euro note.', el:'Στη λαϊκή αγοράζεις μήλα και τυρί. Έχεις ένα χαρτονόμισμα των δέκα ευρώ.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Und eineinhalb zurück. Schönen Tag noch!', na:{ es:'Y uno cincuenta de cambio. ¡Que tenga un buen día!', en:'And one fifty back. Have a nice day!', el:'Και ενάμισι ρέστα. Καλή σας μέρα!' } },
      wortschatz: [
        { z:'das Kilo', na:{ es:'el kilo', en:'the kilo', el:'το κιλό' } },
        { z:'das Pfund', na:{ es:'la libra (medio kilo)', en:'the pound (half a kilo)', el:'το πάουντ (μισό κιλό)' } },
        { z:'die Äpfel', na:{ es:'las manzanas', en:'the apples', el:'τα μήλα' } },
        { z:'der Käse', na:{ es:'el queso', en:'the cheese', el:'το τυρί' } },
        { z:'das Brot', na:{ es:'el pan', en:'the bread', el:'το ψωμί' } },
        { z:'kosten', na:{ es:'costar', en:'to cost', el:'κοστίζω' } },
        { z:'bezahlen', na:{ es:'pagar', en:'to pay', el:'πληρώνω' } },
        { z:'das Wechselgeld', na:{ es:'el cambio', en:'the change', el:'τα ρέστα' } },
        { z:'die Tüte', na:{ es:'la bolsa', en:'the bag', el:'η σακούλα' } },
        { z:'frisch', na:{ es:'fresco', en:'fresh', el:'φρέσκος' } },
        { z:'billig', na:{ es:'barato', en:'cheap', el:'φτηνός' } },
        { z:'teuer', na:{ es:'caro', en:'expensive', el:'ακριβός' } }
      ],
      dialog: {
        rolle: { es:'la vendedora', en:'the vendor', el:'η πωλήτρια' },
        zeilen: [
          { wer:'spikiu', z:'Guten Morgen! Wer ist der Nächste?', na:{ es:'¡Buenos días! ¿A quién le toca?', en:'Good morning! Who is next?', el:'Καλημέρα! Ποιος είναι ο επόμενος;' } },
          { wer:'lerner', z:'Ich. Ein Kilo Äpfel, bitte.', na:{ es:'Yo. Un kilo de manzanas, por favor.', en:'Me. A kilo of apples, please.', el:'Εγώ. Ένα κιλό μήλα, παρακαλώ.' } },
          { wer:'spikiu', z:'Gerne. Sonst noch einen Wunsch?', na:{ es:'Muy bien. ¿Algo más?', en:'Of course. Anything else?', el:'Ευχαρίστως. Θέλετε τίποτα άλλο;' } },
          { wer:'lerner', z:'Ein halbes Pfund Käse. Was kostet das?', na:{ es:'Un cuarto de kilo de queso. ¿Cuánto cuesta?', en:'Half a pound of cheese. How much is that?', el:'Μισό πάουντ τυρί. Πόσο κάνει;' } },
          { wer:'spikiu', z:'Zusammen acht Euro fünfzig.', na:{ es:'En total, ocho euros con cincuenta.', en:'Eight fifty altogether.', el:'Όλα μαζί οκτώ πενήντα.' } },
          { wer:'lerner', z:'Hier sind zehn Euro.', na:{ es:'Aquí tiene diez euros.', en:'Here\'s ten euros.', el:'Ορίστε δέκα ευρώ.' } }
        ]
      },
      lesetext: {
        z:'Auf dem Wochenmarkt kauft Herr Klein ein Kilo Äpfel und ein halbes Pfund Käse. Zusammen kostet das acht Euro fünfzig. Er gibt zehn Euro. Die Verkäuferin gibt ihm eineinhalb Euro zurück.',
        na:{ es:'En el mercado semanal el señor Klein compra un kilo de manzanas y un cuarto de kilo de queso. En total son ocho euros cincuenta. Da diez euros. La vendedora le devuelve un euro cincuenta.', en:'At the weekly market Mr Klein buys a kilo of apples and half a pound of cheese. Altogether that\'s eight fifty. He gives ten euros. The vendor gives him one fifty back.', el:'Στη λαϊκή αγορά ο κύριος Κλάιν αγοράζει ένα κιλό μήλα και μισό πάουντ τυρί. Όλα μαζί κάνουν οκτώ πενήντα. Δίνει δέκα ευρώ. Η πωλήτρια του δίνει ρέστα ένα πενήντα.' },
        frage:{ es:'¿Qué compra el señor Klein?', en:'What does Mr Klein buy?', el:'Τι αγοράζει ο κύριος Κλάιν;' },
        optionen:[
          { na:{ es:'Manzanas y queso', en:'Apples and cheese', el:'Μήλα και τυρί' }, richtig:true },
          { na:{ es:'Pan y leche', en:'Bread and milk', el:'Ψωμί και γάλα' }, richtig:false },
          { na:{ es:'Solo manzanas', en:'Only apples', el:'Μόνο μήλα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Compra un kilo de manzanas y pregunta cuánto cuesta. Dos frases.', en:'Buy a kilo of apples and ask what it costs. Two sentences.', el:'Αγόρασε ένα κιλό μήλα και ρώτα πόσο κάνει. Δύο προτάσεις.' },
        muster:'Ein Kilo Äpfel, bitte. Was kostet das?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'En Alemania se pide muchas veces por **Pfund** — medio kilo. „Ein Pfund Käse" son 500 gramos. No es una medida oficial, pero en el mercado la oirás todos los días.', en:'In Germany people often buy by the **Pfund** — half a kilo. "Ein Pfund Käse" is 500 grams. Not an official measure, but you will hear it at every market stall.', el:'Στη Γερμανία συχνά ψωνίζουν με το **Pfund** — μισό κιλό. «Ein Pfund Käse» είναι 500 γραμμάρια. Δεν είναι επίσημη μονάδα, αλλά θα την ακούσεις σε κάθε πάγκο της λαϊκής.' },
        beispiele:[
          { z:'ein Pfund Käse', na:{ es:'medio kilo de queso', en:'half a kilo of cheese', el:'μισό κιλό τυρί' } },
          { z:'ein halbes Kilo', na:{ es:'medio kilo', en:'half a kilo', el:'μισό κιλό' } }
        ]
      }
    },

    'a1.familie': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast eine Schwester. Sie heißt Klara und ist zwölf Jahre alt.', es:'Tienes una hermana. Se llama Clara y tiene doce años.', en:'You have a sister. Her name is Clara and she is twelve.', el:'Έχεις μια αδερφή. Τη λένε Κλάρα και είναι δώδεκα.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ach, das schöne Alter. Grüßen Sie sie von mir!', na:{ es:'Ay, qué edad tan bonita. ¡Salúdela de mi parte!', en:'Oh, what a lovely age. Say hello from me!', el:'Α, τι ωραία ηλικία. Χαιρετίσματα από μένα!' } },
      wortschatz: [
        { z:'die Schwester', na:{ es:'la hermana', en:'the sister', el:'η αδερφή' } },
        { z:'der Bruder', na:{ es:'el hermano', en:'the brother', el:'ο αδερφός' } },
        { z:'die Geschwister', na:{ es:'los hermanos', en:'the siblings', el:'τα αδέρφια' } },
        { z:'die Eltern', na:{ es:'los padres', en:'the parents', el:'οι γονείς' } },
        { z:'die Mutter', na:{ es:'la madre', en:'the mother', el:'η μητέρα' } },
        { z:'der Vater', na:{ es:'el padre', en:'the father', el:'ο πατέρας' } },
        { z:'die Großeltern', na:{ es:'los abuelos', en:'the grandparents', el:'ο παππούς και η γιαγιά' } },
        { z:'der Sohn', na:{ es:'el hijo', en:'the son', el:'ο γιος' } },
        { z:'die Tochter', na:{ es:'la hija', en:'the daughter', el:'η κόρη' } },
        { z:'heißen', na:{ es:'llamarse', en:'to be called', el:'λέγομαι' } },
        { z:'verheiratet', na:{ es:'casado', en:'married', el:'παντρεμένος' } },
        { z:'die Nachbarin', na:{ es:'la vecina', en:'the neighbour', el:'η γειτόνισσα' } }
      ],
      dialog: {
        rolle: { es:'una vecina', en:'a neighbour', el:'μια γειτόνισσα' },
        zeilen: [
          { wer:'spikiu', z:'Erzählen Sie mal — haben Sie Geschwister?', na:{ es:'Cuénteme, ¿tiene hermanos?', en:'Tell me — do you have any siblings?', el:'Πείτε μου — έχετε αδέρφια;' } },
          { wer:'lerner', z:'Ja, ich habe eine Schwester.', na:{ es:'Sí, tengo una hermana.', en:'Yes, I have a sister.', el:'Ναι, έχω μια αδερφή.' } },
          { wer:'spikiu', z:'Schön! Und wie heißt sie?', na:{ es:'¡Qué bien! ¿Y cómo se llama?', en:'Lovely! And what is her name?', el:'Ωραία! Και πώς τη λένε;' } },
          { wer:'lerner', z:'Sie heißt Klara.', na:{ es:'Se llama Clara.', en:'Her name is Klara.', el:'Τη λένε Κλάρα.' } },
          { wer:'spikiu', z:'Ein hübscher Name. Wie alt ist sie denn?', na:{ es:'Un nombre bonito. ¿Y qué edad tiene?', en:'A pretty name. How old is she?', el:'Ωραίο όνομα. Και πόσο χρονών είναι;' } },
          { wer:'lerner', z:'Sie ist zwölf.', na:{ es:'Tiene doce años.', en:'She\'s twelve.', el:'Είναι δώδεκα.' } }
        ]
      },
      lesetext: {
        z:'Frau Berger trifft ihren Nachbarn im Treppenhaus. Er erzählt von seiner Schwester. Sie heißt Klara und ist zwölf Jahre alt. Frau Berger soll sie grüßen.',
        na:{ es:'La señora Berger se encuentra con su vecino en la escalera. Él le habla de su hermana. Se llama Clara y tiene doce años. La señora Berger tiene que saludarla de su parte.', en:'Mrs Berger meets her neighbour on the stairs. He tells her about his sister. Her name is Klara and she is twelve. Mrs Berger is to say hello to her.', el:'Η κυρία Μπέργκερ συναντά τον γείτονά της στη σκάλα. Της μιλάει για την αδερφή του. Τη λένε Κλάρα και είναι δώδεκα. Η κυρία Μπέργκερ τού λέει να της δώσει χαιρετίσματα.' },
        frage:{ es:'¿Qué edad tiene Clara?', en:'How old is Klara?', el:'Πόσο χρονών είναι η Κλάρα;' },
        optionen:[
          { na:{ es:'Doce', en:'Twelve', el:'Δώδεκα' }, richtig:true },
          { na:{ es:'Dos', en:'Two', el:'Δύο' }, richtig:false },
          { na:{ es:'Veinte', en:'Twenty', el:'Είκοσι' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que tienes un hermano y dinos su nombre y su edad. Dos frases.', en:'Say you have a brother and give his name and age. Two sentences.', el:'Πες ότι έχεις έναν αδερφό και πες το όνομα και την ηλικία του. Δύο προτάσεις.' },
        muster:'Ich habe einen Bruder. Er heißt Paul und ist acht Jahre alt.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Para el nombre el alemán no usa „ser" ni „llamarse" con pronombre: dice simplemente **heißen**. „Ich heiße Marta", „sie heißt Klara". Una sola palabra donde el español usa dos.', en:'For names German does not say "is called" — it has one verb, **heißen**. "Ich heiße Marta", "sie heißt Klara". One word where English needs three.', el:'Για τα ονόματα τα γερμανικά δεν λένε «με λένε» — έχουν ένα ρήμα, το **heißen** (λέγομαι). «Ich heiße Marta», «sie heißt Klara». Όπως το ελληνικό «λέγομαι Μάρτα», μόνο που στα γερμανικά είναι ο κανονικός, καθημερινός τρόπος.' },
        beispiele:[
          { z:'Ich heiße Marta.', na:{ es:'Me llamo Marta.', en:'My name is Marta.', el:'Με λένε Μάρτα.' } },
          { z:'Sie heißt Klara.', na:{ es:'Se llama Clara.', en:'Her name is Klara.', el:'Τη λένε Κλάρα.' } }
        ]
      }
    },

    'a1.hotel': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du heißt Weber und hast zwei Nächte gebucht.', es:'Te apellidas Weber y has reservado dos noches.', en:'Your name is Weber and you have booked two nights.', el:'Λέγεσαι Βέμπερ και έχεις κάνει κράτηση για δύο νύχτες.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Im zweiten Stock, der Aufzug ist gleich rechts. Schönen Aufenthalt!', na:{ es:'En la segunda planta, el ascensor está a la derecha. ¡Que disfrute su estancia!', en:'Second floor, the lift is just on the right. Enjoy your stay!', el:'Στον δεύτερο όροφο, το ασανσέρ είναι αμέσως δεξιά. Καλή διαμονή!' } },
      wortschatz: [
        { z:'die Rezeption', na:{ es:'la recepción', en:'the front desk', el:'η ρεσεψιόν' } },
        { z:'buchen', na:{ es:'reservar', en:'to book', el:'κάνω κράτηση' } },
        { z:'der Schlüssel', na:{ es:'la llave', en:'the key', el:'το κλειδί' } },
        { z:'das Frühstück', na:{ es:'el desayuno', en:'breakfast', el:'το πρωινό' } },
        { z:'der Stock', na:{ es:'la planta', en:'the floor', el:'ο όροφος' } },
        { z:'der Aufzug', na:{ es:'el ascensor', en:'the lift', el:'το ασανσέρ' } },
        { z:'das Doppelzimmer', na:{ es:'la habitación doble', en:'the double room', el:'το δίκλινο δωμάτιο' } },
        { z:'das Einzelzimmer', na:{ es:'la habitación individual', en:'the single room', el:'το μονόκλινο δωμάτιο' } },
        { z:'die Übernachtung', na:{ es:'la noche', en:'the overnight stay', el:'η διανυκτέρευση' } },
        { z:'der Ausweis', na:{ es:'el documento de identidad', en:'the ID', el:'η ταυτότητα' } },
        { z:'ruhig', na:{ es:'tranquilo', en:'quiet', el:'ήσυχος' } },
        { z:'die Kurtaxe', na:{ es:'la tasa turística', en:'the tourist tax', el:'ο τουριστικός φόρος' } }
      ],
      dialog: {
        rolle: { es:'el recepcionista', en:'the front desk clerk', el:'ο ρεσεψιονίστ' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag. Haben Sie bei uns gebucht?', na:{ es:'Buenas tardes. ¿Tiene reserva con nosotros?', en:'Good afternoon. Do you have a booking with us?', el:'Καλησπέρα. Έχετε κάνει κράτηση σε εμάς;' } },
          { wer:'lerner', z:'Ja, auf den Namen Weber.', na:{ es:'Sí, a nombre de Weber.', en:'Yes, under the name Weber.', el:'Ναι, στο όνομα Βέμπερ.' } },
          { wer:'spikiu', z:'Ich sehe nach. Zwei Nächte, richtig?', na:{ es:'Déjeme ver. Dos noches, ¿verdad?', en:'Let me check. Two nights, right?', el:'Να κοιτάξω. Δύο νύχτες, σωστά;' } },
          { wer:'lerner', z:'Genau. Ist das Frühstück dabei?', na:{ es:'Exacto. ¿El desayuno está incluido?', en:'Exactly. Is breakfast included?', el:'Ακριβώς. Περιλαμβάνεται το πρωινό;' } },
          { wer:'spikiu', z:'Ja, von sieben bis zehn. Hier Ihr Schlüssel.', na:{ es:'Sí, de siete a diez. Aquí tiene su llave.', en:'Yes, seven to ten. Here\'s your key.', el:'Ναι, από τις επτά ως τις δέκα. Ορίστε το κλειδί σας.' } },
          { wer:'lerner', z:'Danke. In welchem Stock ist das Zimmer?', na:{ es:'Gracias. ¿En qué planta está?', en:'Thanks. Which floor is the room on?', el:'Ευχαριστώ. Σε ποιον όροφο είναι το δωμάτιο;' } }
        ]
      },
      lesetext: {
        z:'Herr Weber hat zwei Nächte gebucht. An der Rezeption bekommt er den Schlüssel. Das Frühstück gibt es von sieben bis zehn. Sein Zimmer liegt im zweiten Stock, der Aufzug ist gleich rechts.',
        na:{ es:'El señor Weber ha reservado dos noches. En recepción recibe la llave. El desayuno es de siete a diez. Su habitación está en la segunda planta, el ascensor está a la derecha.', en:'Mr Weber has booked two nights. At reception he gets his key. Breakfast is from seven to ten. His room is on the second floor, the lift is just on the right.', el:'Ο κύριος Βέμπερ έχει κλείσει δύο νύχτες. Στη ρεσεψιόν παίρνει το κλειδί του. Το πρωινό είναι από τις επτά ως τις δέκα. Το δωμάτιό του είναι στον δεύτερο όροφο, το ασανσέρ είναι αμέσως δεξιά.' },
        frage:{ es:'¿A qué hora es el desayuno?', en:'When is breakfast?', el:'Πότε σερβίρεται το πρωινό;' },
        optionen:[
          { na:{ es:'De siete a diez', en:'From seven to ten', el:'Από τις επτά ως τις δέκα' }, richtig:true },
          { na:{ es:'De ocho a once', en:'From eight to eleven', el:'Από τις οκτώ ως τις έντεκα' }, richtig:false },
          { na:{ es:'Solo el fin de semana', en:'Only at weekends', el:'Μόνο τα Σαββατοκύριακα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que tienes una reserva y pregunta por el desayuno. Dos frases.', en:'Say you have a booking and ask about breakfast. Two sentences.', el:'Πες ότι έχεις κάνει κράτηση και ρώτα για το πρωινό. Δύο προτάσεις.' },
        muster:'Ich habe auf den Namen Weber reserviert. Ist das Frühstück dabei?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Los alemanes cuentan las plantas como los españoles: la planta baja (Erdgeschoss) no cuenta, luego viene **der erste Stock**. Cuidado en los Estados Unidos, allí la planta baja ya es „first floor".', en:'Germans count floors the British way: the ground floor does not count, then comes **der erste Stock**. Careful in the US, where the ground floor is already the "first floor".', el:'Οι Γερμανοί μετράνε τους ορόφους όπως κι εμείς: το ισόγειο δεν μετράει, μετά έρχεται **der erste Stock**, ο πρώτος όροφος. Προσοχή μόνο στις ΗΠΑ, όπου το ισόγειο είναι ήδη το «first floor».' },
        beispiele:[
          { z:'im ersten Stock', na:{ es:'en la primera planta', en:'on the first floor', el:'στον πρώτο όροφο' } },
          { z:'im zweiten Stock', na:{ es:'en la segunda planta', en:'on the second floor', el:'στον δεύτερο όροφο' } }
        ]
      }
    },

    'a1.restaurant': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Ihr seid zu zweit und habt nicht reserviert.', es:'Son dos y no tienen reserva.', en:'There are two of you and no reservation.', el:'Είστε δύο και δεν έχετε κράτηση.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Sehr gerne. Ich bringe Ihnen erst mal die Getränkekarte.', na:{ es:'Muy bien. Primero les traigo la carta de bebidas.', en:'Certainly. I\'ll bring you the drinks menu first.', el:'Με μεγάλη χαρά. Σας φέρνω πρώτα τον κατάλογο με τα ποτά.' } },
      wortschatz: [
        { z:'die Speisekarte', na:{ es:'la carta', en:'the menu', el:'ο κατάλογος' } },
        { z:'reservieren', na:{ es:'reservar', en:'to book', el:'κάνω κράτηση' } },
        { z:'empfehlen', na:{ es:'recomendar', en:'to recommend', el:'προτείνω' } },
        { z:'der Braten', na:{ es:'el asado', en:'the roast', el:'το ψητό' } },
        { z:'die Beilage', na:{ es:'la guarnición', en:'the side dish', el:'η γαρνιτούρα' } },
        { z:'das Getränk', na:{ es:'la bebida', en:'the drink', el:'το ποτό' } },
        { z:'bestellen', na:{ es:'pedir', en:'to order', el:'παραγγέλνω' } },
        { z:'lecker', na:{ es:'rico', en:'delicious', el:'νόστιμος' } },
        { z:'satt', na:{ es:'lleno', en:'full', el:'χορτάτος' } },
        { z:'die Vorspeise', na:{ es:'el entrante', en:'the starter', el:'το ορεκτικό' } },
        { z:'der Nachtisch', na:{ es:'el postre', en:'dessert', el:'το επιδόρπιο' } },
        { z:'getrennt zahlen', na:{ es:'pagar por separado', en:'to split the bill', el:'πληρώνω χωριστά' } }
      ],
      dialog: {
        rolle: { es:'el camarero', en:'the waiter', el:'ο σερβιτόρος' },
        zeilen: [
          { wer:'spikiu', z:'Guten Abend! Haben Sie reserviert?', na:{ es:'¡Buenas noches! ¿Tienen reserva?', en:'Good evening! Do you have a reservation?', el:'Καλησπέρα! Έχετε κάνει κράτηση;' } },
          { wer:'lerner', z:'Nein, für zwei Personen bitte.', na:{ es:'No, para dos personas, por favor.', en:'No, for two people please.', el:'Όχι, για δύο άτομα, παρακαλώ.' } },
          { wer:'spikiu', z:'Gerne, der Tisch am Fenster. Möchten Sie schon bestellen?', na:{ es:'Claro, la mesa junto a la ventana. ¿Quieren pedir ya?', en:'Of course, the table by the window. Ready to order?', el:'Ευχαρίστως, το τραπέζι δίπλα στο παράθυρο. Θέλετε να παραγγείλετε κιόλας;' } },
          { wer:'lerner', z:'Was können Sie empfehlen?', na:{ es:'¿Qué nos recomienda?', en:'What do you recommend?', el:'Τι μας προτείνετε;' } },
          { wer:'spikiu', z:'Heute ist der Schweinebraten sehr gut.', na:{ es:'Hoy el asado de cerdo está muy bueno.', en:'The roast pork is very good today.', el:'Σήμερα το χοιρινό ψητό είναι πολύ καλό.' } },
          { wer:'lerner', z:'Dann nehme ich den Schweinebraten.', na:{ es:'Entonces yo tomo el asado de cerdo.', en:'Then I\'ll have the roast pork.', el:'Τότε θα πάρω το χοιρινό ψητό.' } }
        ]
      },
      lesetext: {
        z:'Am Abend gehen Tom und Lena essen. Sie haben nicht reserviert. Der Kellner hat aber noch einen Tisch am Fenster frei. Tom fragt, was der Kellner empfiehlt. Heute ist der Schweinebraten besonders gut.',
        na:{ es:'Por la noche Tom y Lena salen a cenar. No tienen reserva. Pero al camarero le queda una mesa libre junto a la ventana. Tom pregunta qué recomienda. Hoy el asado de cerdo está especialmente bueno.', en:'In the evening Tom and Lena go out to eat. They don\'t have a reservation. But the waiter still has a table free by the window. Tom asks what he recommends. Today the roast pork is especially good.', el:'Το βράδυ ο Τομ και η Λένα βγαίνουν για φαγητό. Δεν έχουν κράτηση. Όμως ο σερβιτόρος έχει ακόμα ένα ελεύθερο τραπέζι δίπλα στο παράθυρο. Ο Τομ ρωτάει τι προτείνει. Σήμερα το χοιρινό ψητό είναι ιδιαίτερα καλό.' },
        frage:{ es:'¿Dónde se sientan Tom y Lena?', en:'Where do Tom and Lena sit?', el:'Πού κάθονται ο Τομ και η Λένα;' },
        optionen:[
          { na:{ es:'Junto a la ventana', en:'By the window', el:'Δίπλα στο παράθυρο' }, richtig:true },
          { na:{ es:'Junto a la puerta', en:'By the door', el:'Δίπλα στην πόρτα' }, richtig:false },
          { na:{ es:'Fuera', en:'Outside', el:'Έξω' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que sois dos y pide una recomendación. Dos frases.', en:'Say there are two of you and ask for a recommendation. Two sentences.', el:'Πες ότι είστε δύο και ζήτα μια πρόταση. Δύο προτάσεις.' },
        muster:'Ein Tisch für zwei, bitte. Was können Sie empfehlen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'**Ich will** significa „quiero", pero suena brusco en alemán — casi como exigir. En un café, en una tienda, en cualquier sitio se dice **ich möchte**. Es la misma idea, dicha con buenos modos.', en:'**Ich will** means "I want", but it sounds blunt in German — almost like demanding. In a café or a shop you say **ich möchte** instead. Same idea, better manners.', el:'Το **Ich will** σημαίνει «θέλω», αλλά στα γερμανικά ακούγεται απότομο — σχεδόν σαν απαίτηση. Σε καφέ ή μαγαζί λες καλύτερα **ich möchte**, «θα ήθελα». Ίδια ιδέα, καλύτεροι τρόποι.' },
        beispiele:[
          { z:'Ich möchte einen Kaffee.', na:{ es:'Quiero un café.', en:'I\'d like a coffee.', el:'Θα ήθελα έναν καφέ.' } },
          { z:'Ich möchte zahlen.', na:{ es:'Quiero pagar.', en:'I\'d like to pay.', el:'Θα ήθελα να πληρώσω.' } }
        ]
      }
    },

    'a1.taxi': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast einen Koffer dabei und willst zum Flughafen.', es:'Llevas una maleta y quieres ir al aeropuerto.', en:'You have one suitcase and you want to go to the airport.', el:'Έχεις μια βαλίτσα και θέλεις να πας στο αεροδρόμιο.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Abend. Ja bitte?', na:{ es:'Buenas noches. ¿Sí?', en:'Good evening. Yes?', el:'Καλησπέρα. Ναι;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'So, da wären wir. Das macht achtundzwanzig Euro. Guten Flug!', na:{ es:'Ya hemos llegado. Son veintiocho euros. ¡Buen vuelo!', en:'Here we are. That\'s twenty-eight euros. Have a good flight!', el:'Λοιπόν, φτάσαμε. Κάνει είκοσι οκτώ ευρώ. Καλή πτήση!' } },
      wortschatz: [
        { z:'das Taxi', na:{ es:'el taxi', en:'the cab', el:'το ταξί' } },
        { z:'der Flughafen', na:{ es:'el aeropuerto', en:'the airport', el:'το αεροδρόμιο' } },
        { z:'die Innenstadt', na:{ es:'el centro', en:'downtown', el:'το κέντρο της πόλης' } },
        { z:'der Koffer', na:{ es:'la maleta', en:'the suitcase', el:'η βαλίτσα' } },
        { z:'der Kofferraum', na:{ es:'el maletero', en:'the trunk', el:'το πορτμπαγκάζ' } },
        { z:'einsteigen', na:{ es:'subir', en:'to get in', el:'μπαίνω (στο όχημα)' } },
        { z:'aussteigen', na:{ es:'bajar', en:'to get out', el:'βγαίνω (από το όχημα)' } },
        { z:'die Adresse', na:{ es:'la dirección', en:'the address', el:'η διεύθυνση' } },
        { z:'halten', na:{ es:'parar', en:'to stop', el:'σταματώ' } },
        { z:'schnell', na:{ es:'rápido', en:'fast', el:'γρήγορος' } },
        { z:'langsam', na:{ es:'despacio', en:'slow', el:'αργός' } },
        { z:'stimmt so', na:{ es:'quédese con la vuelta', en:'keep the change', el:'κρατήστε τα ρέστα' } }
      ],
      dialog: {
        rolle: { es:'el taxista', en:'the driver', el:'ο ταξιτζής' },
        zeilen: [
          { wer:'spikiu', z:'Guten Abend. Ja bitte?', na:{ es:'Buenas noches. ¿Sí?', en:'Good evening. Yes?', el:'Καλησπέρα. Ναι;' } },
          { wer:'lerner', z:'Sind Sie frei?', na:{ es:'¿Está libre?', en:'Are you free?', el:'Είστε ελεύθερος;' } },
          { wer:'spikiu', z:'Ja, steigen Sie ein. Wohin soll es gehen?', na:{ es:'Sí, suba. ¿Adónde vamos?', en:'Yes, get in. Where to?', el:'Ναι, περάστε. Πού πηγαίνουμε;' } },
          { wer:'lerner', z:'Zum Flughafen, bitte.', na:{ es:'Al aeropuerto, por favor.', en:'To the airport, please.', el:'Στο αεροδρόμιο, παρακαλώ.' } },
          { wer:'spikiu', z:'Alles klar. Haben Sie Gepäck dabei?', na:{ es:'Muy bien. ¿Lleva equipaje?', en:'All right. Do you have luggage?', el:'Εντάξει. Έχετε αποσκευές;' } },
          { wer:'lerner', z:'Ja, einen Koffer.', na:{ es:'Sí, una maleta.', en:'Yes, one suitcase.', el:'Ναι, μια βαλίτσα.' } }
        ]
      },
      lesetext: {
        z:'Es ist Abend. Ein Mann winkt einem Taxi. Er will zum Flughafen und hat einen Koffer dabei. Die Fahrt kostet achtundzwanzig Euro. Der Fahrer wünscht ihm einen guten Flug.',
        na:{ es:'Es de noche. Un hombre para un taxi. Quiere ir al aeropuerto y lleva una maleta. El viaje cuesta veintiocho euros. El taxista le desea un buen vuelo.', en:'It\'s evening. A man waves down a taxi. He wants to go to the airport and has one suitcase with him. The ride costs twenty-eight euros. The driver wishes him a good flight.', el:'Είναι βράδυ. Ένας άντρας σταματάει ένα ταξί. Θέλει να πάει στο αεροδρόμιο και έχει μαζί του μια βαλίτσα. Η διαδρομή κοστίζει είκοσι οκτώ ευρώ. Ο ταξιτζής του εύχεται καλή πτήση.' },
        frage:{ es:'¿Adónde va el hombre?', en:'Where is the man going?', el:'Πού πηγαίνει ο άντρας;' },
        optionen:[
          { na:{ es:'Al aeropuerto', en:'To the airport', el:'Στο αεροδρόμιο' }, richtig:true },
          { na:{ es:'A la estación', en:'To the station', el:'Στον σταθμό' }, richtig:false },
          { na:{ es:'Al centro', en:'Downtown', el:'Στο κέντρο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta si el taxi está libre y di adónde vas. Dos frases.', en:'Ask if the taxi is free and give your destination. Two sentences.', el:'Ρώτα αν το ταξί είναι ελεύθερο και πες τον προορισμό σου. Δύο προτάσεις.' },
        muster:'Sind Sie frei? Zum Bahnhof, bitte.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'A un desconocido se le dice **Sie**: „Sind Sie frei?" A un amigo o a un niño se le dice **du**: „Bist du fertig?" Elegir mal no es un error de gramática, es un error de trato — por eso importa más que la gramática.', en:'To a stranger you say **Sie**: "Sind Sie frei?" To a friend or a child you say **du**: "Bist du fertig?" Choosing wrong is not a grammar mistake, it is a manners mistake — which is why it matters more than grammar.', el:'Σε έναν άγνωστο λες **Sie**: «Sind Sie frei?» Σε φίλο ή παιδί λες **du**: «Bist du fertig?» Όπως το ελληνικό «εσείς» και «εσύ». Αν διαλέξεις λάθος, δεν είναι λάθος γραμματικής, είναι λάθος τρόπων — γι\' αυτό μετράει περισσότερο από τη γραμματική.' },
        beispiele:[
          { z:'Sind Sie frei?', na:{ es:'¿Está libre?', en:'Are you free?', el:'Είστε ελεύθερος;' } },
          { z:'Bist du fertig?', na:{ es:'¿Estás listo?', en:'Are you ready?', el:'Είσαι έτοιμος;' } }
        ]
      }
    },

    'a1.wegbeschreibung': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du suchst den Marktplatz und bist zu Fuß unterwegs.', es:'Buscas la plaza del mercado y vas a pie.', en:'You\'re looking for the market square and you\'re on foot.', el:'Ψάχνεις την πλατεία της αγοράς και είσαι με τα πόδια.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Kann ich Ihnen helfen?', na:{ es:'¿Le puedo ayudar?', en:'Can I help you?', el:'Μπορώ να σας βοηθήσω;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gern geschehen. Schönen Aufenthalt!', na:{ es:'De nada. ¡Que disfrute su estancia!', en:'You\'re welcome. Enjoy your stay!', el:'Παρακαλώ. Καλή διαμονή!' } },
      wortschatz: [
        { z:'geradeaus', na:{ es:'todo recto', en:'straight ahead', el:'ευθεία' } },
        { z:'links', na:{ es:'a la izquierda', en:'left', el:'αριστερά' } },
        { z:'rechts', na:{ es:'a la derecha', en:'right', el:'δεξιά' } },
        { z:'die Ecke', na:{ es:'la esquina', en:'the corner', el:'η γωνία' } },
        { z:'die Ampel', na:{ es:'el semáforo', en:'the traffic light', el:'το φανάρι' } },
        { z:'die Kreuzung', na:{ es:'el cruce', en:'the junction', el:'η διασταύρωση' } },
        { z:'zu Fuß', na:{ es:'a pie', en:'on foot', el:'με τα πόδια' } },
        { z:'die Haltestelle', na:{ es:'la parada', en:'the stop', el:'η στάση' } },
        { z:'gegenüber', na:{ es:'enfrente', en:'opposite', el:'απέναντι' } },
        { z:'neben', na:{ es:'al lado de', en:'next to', el:'δίπλα σε' } },
        { z:'weit', na:{ es:'lejos', en:'far', el:'μακριά' } },
        { z:'in der Nähe', na:{ es:'cerca', en:'nearby', el:'κοντά' } }
      ],
      dialog: {
        rolle: { es:'un transeúnte', en:'a passer-by', el:'ένας περαστικός' },
        zeilen: [
          { wer:'spikiu', z:'Kann ich Ihnen helfen?', na:{ es:'¿Le puedo ayudar?', en:'Can I help you?', el:'Μπορώ να σας βοηθήσω;' } },
          { wer:'lerner', z:'Entschuldigung, wo ist der Marktplatz?', na:{ es:'Perdone, ¿dónde está la plaza del mercado?', en:'Excuse me, where is the market square?', el:'Συγγνώμη, πού είναι η πλατεία της αγοράς;' } },
          { wer:'spikiu', z:'Immer geradeaus, dann die zweite links.', na:{ es:'Todo recto y luego la segunda a la izquierda.', en:'Straight ahead, then second on the left.', el:'Συνέχεια ευθεία, μετά ο δεύτερος αριστερά.' } },
          { wer:'lerner', z:'Ist das weit?', na:{ es:'¿Está lejos?', en:'Is it far?', el:'Είναι μακριά;' } },
          { wer:'spikiu', z:'Nein, fünf Minuten zu Fuß.', na:{ es:'No, cinco minutos a pie.', en:'No, five minutes on foot.', el:'Όχι, πέντε λεπτά με τα πόδια.' } },
          { wer:'lerner', z:'Vielen Dank!', na:{ es:'¡Muchas gracias!', en:'Thank you very much!', el:'Ευχαριστώ πολύ!' } }
        ]
      },
      lesetext: {
        z:'Eine Frau sucht den Marktplatz. Ein Mann hilft ihr. Sie muss immer geradeaus gehen und dann die zweite Straße links nehmen. Zu Fuß dauert es nur fünf Minuten.',
        na:{ es:'Una mujer busca la plaza del mercado. Un hombre la ayuda. Tiene que seguir todo recto y luego tomar la segunda calle a la izquierda. A pie son solo cinco minutos.', en:'A woman is looking for the market square. A man helps her. She has to go straight ahead and then take the second street on the left. On foot it is only five minutes.', el:'Μια γυναίκα ψάχνει την πλατεία της αγοράς. Ένας άντρας τη βοηθάει. Πρέπει να πάει ευθεία και μετά να στρίψει στον δεύτερο δρόμο αριστερά. Με τα πόδια είναι μόνο πέντε λεπτά.' },
        frage:{ es:'¿Cuánto se tarda?', en:'How long does it take?', el:'Πόση ώρα θέλει;' },
        optionen:[
          { na:{ es:'Cinco minutos', en:'Five minutes', el:'Πέντε λεπτά' }, richtig:true },
          { na:{ es:'Dos minutos', en:'Two minutes', el:'Δύο λεπτά' }, richtig:false },
          { na:{ es:'Media hora', en:'Half an hour', el:'Μισή ώρα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta dónde está la estación y si está lejos. Dos frases.', en:'Ask where the station is and whether it is far. Two sentences.', el:'Ρώτα πού είναι ο σταθμός και αν είναι μακριά. Δύο προτάσεις.' },
        muster:'Entschuldigung, wo ist der Bahnhof? Ist das weit?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Para dar indicaciones a un desconocido, el verbo va **primero** y luego **Sie**: Gehen Sie geradeaus. Nehmen Sie die zweite Straße. Es la forma educada, la que oirás en la calle.', en:'To give directions to a stranger, the verb comes **first** and then **Sie**: Gehen Sie geradeaus. Nehmen Sie die zweite Straße. That is the polite form — the one you will hear on the street.', el:'Για να δώσεις οδηγίες σε άγνωστο, το ρήμα μπαίνει **πρώτο** και μετά το **Sie**: Gehen Sie geradeaus. Nehmen Sie die zweite Straße. Αυτός είναι ο ευγενικός τύπος — αυτόν θα ακούσεις στον δρόμο.' },
        beispiele:[
          { z:'Gehen Sie geradeaus.', na:{ es:'Siga todo recto.', en:'Go straight ahead.', el:'Πηγαίνετε ευθεία.' } },
          { z:'Nehmen Sie die zweite Straße.', na:{ es:'Tome la segunda calle.', en:'Take the second street.', el:'Πάρτε τον δεύτερο δρόμο.' } }
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
      abrundung: { z:'Bis morgen — und komm trocken heim!', na:{ es:'Hasta mañana. ¡Y que llegues seco a casa!', en:'See you tomorrow — and get home dry!', el:'Τα λέμε αύριο — και να γυρίσεις στεγνός σπίτι!' } },
      wortschatz: [
        { z:'die Sonne', na:{ es:'el sol', en:'the sun', el:'ο ήλιος' } },
        { z:'der Regen', na:{ es:'la lluvia', en:'the rain', el:'η βροχή' } },
        { z:'der Schnee', na:{ es:'la nieve', en:'the snow', el:'το χιόνι' } },
        { z:'der Wind', na:{ es:'el viento', en:'the wind', el:'ο αέρας' } },
        { z:'warm', na:{ es:'cálido', en:'warm', el:'ζεστός' } },
        { z:'kalt', na:{ es:'frío', en:'cold', el:'κρύος' } },
        { z:'scheinen', na:{ es:'brillar', en:'to shine', el:'λάμπω' } },
        { z:'regnen', na:{ es:'llover', en:'to rain', el:'βρέχει' } },
        { z:'der Schirm', na:{ es:'el paraguas', en:'the umbrella', el:'η ομπρέλα' } },
        { z:'die Wolke', na:{ es:'la nube', en:'the cloud', el:'το σύννεφο' } },
        { z:'das Wetter', na:{ es:'el tiempo', en:'the weather', el:'ο καιρός' } },
        { z:'der Feierabend', na:{ es:'el fin de la jornada', en:'the end of the working day', el:'το τέλος της μέρας στη δουλειά' } }
      ],
      dialog: {
        rolle: { es:'un compañero de trabajo', en:'a coworker', el:'ένας συνάδελφος' },
        zeilen: [
          { wer:'spikiu', z:'Was für ein schöner Tag heute!', na:{ es:'¡Qué buen día hace hoy!', en:'What a lovely day today!', el:'Τι ωραία μέρα σήμερα!' } },
          { wer:'lerner', z:'Ja, die Sonne scheint und es ist warm.', na:{ es:'Sí, hace sol y calor.', en:'Yes, the sun is out and it\'s warm.', el:'Ναι, έχει ήλιο και κάνει ζέστη.' } },
          { wer:'spikiu', z:'Und morgen? Weißt du das schon?', na:{ es:'¿Y mañana? ¿Ya lo sabes?', en:'And tomorrow? Do you know yet?', el:'Κι αύριο; Ξέρεις ήδη;' } },
          { wer:'lerner', z:'Morgen regnet es, glaube ich.', na:{ es:'Mañana llueve, creo.', en:'It\'ll rain tomorrow, I think.', el:'Αύριο θα βρέξει, νομίζω.' } },
          { wer:'spikiu', z:'Dann nehme ich den Schirm mit.', na:{ es:'Entonces me llevo el paraguas.', en:'Then I\'ll take the umbrella.', el:'Τότε θα πάρω την ομπρέλα μαζί μου.' } },
          { wer:'lerner', z:'Gute Idee. Bis morgen!', na:{ es:'Buena idea. ¡Hasta mañana!', en:'Good idea. See you tomorrow!', el:'Καλή ιδέα. Τα λέμε αύριο!' } }
        ]
      },
      lesetext: {
        z:'Heute scheint die Sonne und es ist warm. Morgen soll es aber regnen. Ein Kollege nimmt deshalb einen Schirm mit. Am Abend fahren beide zusammen nach Hause.',
        na:{ es:'Hoy hace sol y calor. Pero mañana dicen que va a llover. Por eso un compañero se lleva un paraguas. Por la tarde vuelven los dos juntos a casa.', en:'Today the sun is shining and it\'s warm. Tomorrow it\'s supposed to rain, though. So a colleague takes an umbrella. In the evening they both go home together.', el:'Σήμερα έχει ήλιο και κάνει ζέστη. Αύριο όμως λένε ότι θα βρέξει. Γι\' αυτό ένας συνάδελφος παίρνει ομπρέλα. Το βράδυ γυρίζουν και οι δύο μαζί σπίτι.' },
        frage:{ es:'¿Qué tiempo hará mañana?', en:'What will the weather be like tomorrow?', el:'Πώς θα είναι ο καιρός αύριο;' },
        optionen:[
          { na:{ es:'Va a llover', en:'It will rain', el:'Θα βρέξει' }, richtig:true },
          { na:{ es:'Va a nevar', en:'It will snow', el:'Θα χιονίσει' }, richtig:false },
          { na:{ es:'Seguirá soleado', en:'It stays sunny', el:'Θα μείνει ηλιόλουστος' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di qué tiempo hace hoy y qué tiempo hará mañana. Dos frases.', en:'Say what the weather is like today and what it will be tomorrow. Two sentences.', el:'Πες πώς είναι ο καιρός σήμερα και πώς θα είναι αύριο. Δύο προτάσεις.' },
        muster:'Heute scheint die Sonne. Morgen soll es regnen.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Para el tiempo el alemán pone siempre un **es** delante, aunque no signifique nada: es regnet, es schneit, es ist kalt. En español basta con „llueve" — en alemán ese **es** no se puede quitar.', en:'For weather German always puts an **es** in front, even though it means nothing: es regnet, es schneit, es ist kalt. Just like the English "it", which also is not anybody.', el:'Για τον καιρό τα γερμανικά βάζουν πάντα ένα **es** μπροστά, παρόλο που δεν σημαίνει τίποτα: es regnet, es schneit, es ist kalt. Στα ελληνικά λέμε απλώς «βρέχει», «χιονίζει», «κάνει κρύο» — στα γερμανικά όμως το **es** δεν λείπει ποτέ.' },
        beispiele:[
          { z:'Es regnet.', na:{ es:'Llueve.', en:'It\'s raining.', el:'Βρέχει.' } },
          { z:'Es ist kalt.', na:{ es:'Hace frío.', en:'It\'s cold.', el:'Κάνει κρύο.' } }
        ]
      }
    },

    'a2.arzt': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du bist letzte Woche gestürzt. Du nimmst Schmerztabletten und bist gegen Penizillin allergisch.', es:'Te caíste la semana pasada. Tomas analgésicos y eres alérgico a la penicilina.', en:'You fell last week. You take painkillers and you\'re allergic to penicillin.', el:'Έπεσες την περασμένη εβδομάδα. Παίρνεις παυσίπονα και είσαι αλλεργικός στην πενικιλίνη.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ja, kommen Sie am Donnerstag wieder. Die Überweisung gebe ich Ihnen mit.', na:{ es:'Sí, vuelva el jueves. Le doy el volante para el especialista.', en:'Yes, come back on Thursday. I\'ll give you the referral.', el:'Ναι, ελάτε ξανά την Πέμπτη. Σας δίνω και το παραπεμπτικό.' } },
      wortschatz: [
        { z:'stürzen', na:{ es:'caerse', en:'to fall', el:'πέφτω' } },
        { z:'die Schulter', na:{ es:'el hombro', en:'the shoulder', el:'ο ώμος' } },
        { z:'schlimmer werden', na:{ es:'empeorar', en:'to get worse', el:'χειροτερεύω' } },
        { z:'die Schmerztablette', na:{ es:'el analgésico', en:'the painkiller', el:'το παυσίπονο' } },
        { z:'allergisch', na:{ es:'alérgico', en:'allergic', el:'αλλεργικός' } },
        { z:'das Röntgenbild', na:{ es:'la radiografía', en:'the X-ray', el:'η ακτινογραφία' } },
        { z:'der Termin', na:{ es:'la cita', en:'the appointment', el:'το ραντεβού' } },
        { z:'die Überweisung', na:{ es:'el volante', en:'the referral', el:'το παραπεμπτικό' } },
        { z:'die Praxis', na:{ es:'la consulta', en:'the practice', el:'το ιατρείο' } },
        { z:'das Wartezimmer', na:{ es:'la sala de espera', en:'the waiting room', el:'η αίθουσα αναμονής' } },
        { z:'behandeln', na:{ es:'tratar', en:'to treat', el:'θεραπεύω' } },
        { z:'untersuchen', na:{ es:'examinar', en:'to examine', el:'εξετάζω' } }
      ],
      dialog: {
        rolle: { es:'el médico', en:'the doctor', el:'ο γιατρός' },
        zeilen: [
          { wer:'spikiu', z:'Erzählen Sie mal, was ist denn passiert?', na:{ es:'Cuénteme, ¿qué le ha pasado?', en:'Tell me, what happened?', el:'Πείτε μου, τι συνέβη;' } },
          { wer:'lerner', z:'Ich bin letzte Woche gestürzt, und die Schulter ist schlimmer geworden.', na:{ es:'Me caí la semana pasada y el hombro ha empeorado.', en:'I fell last week, and the shoulder has got worse.', el:'Έπεσα την περασμένη εβδομάδα και ο ώμος χειροτέρεψε.' } },
          { wer:'spikiu', z:'Nehmen Sie zurzeit Medikamente?', na:{ es:'¿Toma alguna medicina actualmente?', en:'Are you taking any medication at the moment?', el:'Παίρνετε κάποια φάρμακα αυτή την περίοδο;' } },
          { wer:'lerner', z:'Nur Schmerztabletten. Gegen Penizillin bin ich allergisch.', na:{ es:'Solo analgésicos. Soy alérgica a la penicilina.', en:'Only painkillers. I\'m allergic to penicillin.', el:'Μόνο παυσίπονα. Είμαι αλλεργικός στην πενικιλίνη.' } },
          { wer:'spikiu', z:'Gut, das notiere ich. Wir machen erst mal ein Röntgenbild.', na:{ es:'Bien, lo apunto. Primero hacemos una radiografía.', en:'Good, I\'ll note that. Let\'s do an X-ray first.', el:'Καλά, το σημειώνω. Ας κάνουμε πρώτα μια ακτινογραφία.' } },
          { wer:'lerner', z:'Einverstanden. Brauche ich noch einen Termin?', na:{ es:'De acuerdo. ¿Necesito otra cita?', en:'All right. Do I need another appointment?', el:'Σύμφωνοι. Χρειάζομαι κι άλλο ραντεβού;' } }
        ]
      },
      lesetext: {
        z:'Eine Patientin ist letzte Woche gestürzt, und die Schulter ist schlimmer geworden. Sie nimmt nur Schmerztabletten und ist gegen Penizillin allergisch. Der Arzt macht erst ein Röntgenbild. Am Donnerstag soll sie wiederkommen und bekommt eine Überweisung mit.',
        na:{ es:'Una paciente se cayó la semana pasada y el hombro ha empeorado. Solo toma analgésicos y es alérgica a la penicilina. El médico hace primero una radiografía. El jueves tiene que volver y le da un volante para el especialista.', en:'A patient fell last week and her shoulder has got worse. She only takes painkillers and is allergic to penicillin. The doctor does an X-ray first. She is to come back on Thursday and gets a referral.', el:'Μια ασθενής έπεσε την περασμένη εβδομάδα και ο ώμος της χειροτέρεψε. Παίρνει μόνο παυσίπονα και είναι αλλεργική στην πενικιλίνη. Ο γιατρός κάνει πρώτα μια ακτινογραφία. Πρέπει να ξαναέρθει την Πέμπτη και παίρνει ένα παραπεμπτικό.' },
        frage:{ es:'¿A qué es alérgica la paciente?', en:'What is the patient allergic to?', el:'Σε τι είναι αλλεργική η ασθενής;' },
        optionen:[
          { na:{ es:'A la penicilina', en:'To penicillin', el:'Στην πενικιλίνη' }, richtig:true },
          { na:{ es:'A los analgésicos', en:'To painkillers', el:'Στα παυσίπονα' }, richtig:false },
          { na:{ es:'A los frutos secos', en:'To nuts', el:'Στους ξηρούς καρπούς' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Cuenta qué te pasó y di a qué eres alérgico. Dos frases.', en:'Say what happened and name your allergy. Two sentences.', el:'Πες τι συνέβη και ανέφερε την αλλεργία σου. Δύο προτάσεις.' },
        muster:'Ich bin gestern gestürzt und mein Knie tut weh. Gegen Penizillin bin ich allergisch.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Casi todo el pasado alemán se hace con **haben**. Pero los verbos de movimiento llevan **sein**: ich **bin** gestürzt, ich **bin** gefahren, ich **bin** gegangen. „Ich habe gestürzt" es el fallo que hace todo hispanohablante — y se oye enseguida.', en:'Most German past forms use **haben**. But verbs of movement take **sein**: ich **bin** gestürzt, ich **bin** gefahren, ich **bin** gegangen. "Ich habe gestürzt" is the mistake nearly every learner makes — and it is heard instantly.', el:'Οι περισσότεροι γερμανικοί παρελθοντικοί χρόνοι σχηματίζονται με **haben**. Τα ρήματα κίνησης όμως παίρνουν **sein**: ich **bin** gestürzt, ich **bin** gefahren, ich **bin** gegangen. Το «Ich habe gestürzt» είναι το λάθος που κάνουν σχεδόν όλοι — και ακούγεται αμέσως.' },
        beispiele:[
          { z:'Ich bin gestürzt.', na:{ es:'Me caí.', en:'I fell.', el:'Έπεσα.' } },
          { z:'Ich bin nach Hause gegangen.', na:{ es:'Me fui a casa.', en:'I went home.', el:'Πήγα σπίτι.' } }
        ]
      }
    },

    'a2.bahnhof': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Dein Zug hat zwanzig Minuten Verspätung. In Hannover musst du um Viertel nach drei umsteigen.', es:'Tu tren lleva veinte minutos de retraso. En Hannover tienes el transbordo a las tres y cuarto.', en:'Your train is twenty minutes late. You change in Hanover at quarter past three.', el:'Το τρένο σου έχει είκοσι λεπτά καθυστέρηση. Αλλάζεις τρένο στο Ανόβερο στις τρεις και τέταρτο.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Der Nächste bitte. Was kann ich für Sie tun?', na:{ es:'El siguiente, por favor. ¿En qué le ayudo?', en:'Next please. How can I help you?', el:'Ο επόμενος, παρακαλώ. Τι μπορώ να κάνω για εσάς;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Dann gilt Ihre Fahrkarte im nächsten ICE — die Zugbindung ist aufgehoben. Gute Fahrt!', na:{ es:'Entonces su billete vale para el siguiente tren: ya no está atado a ese horario. ¡Buen viaje!', en:'Then your ticket is valid on the next train — the restriction is lifted. Have a good trip!', el:'Τότε το εισιτήριό σας ισχύει στο επόμενο ICE — η δέσμευση δρομολογίου αίρεται. Καλό ταξίδι!' } },
      wortschatz: [
        { z:'die Verspätung', na:{ es:'el retraso', en:'the delay', el:'η καθυστέρηση' } },
        { z:'umsteigen', na:{ es:'hacer transbordo', en:'to change trains', el:'αλλάζω τρένο' } },
        { z:'der Anschluss', na:{ es:'el enlace', en:'the connection', el:'η ανταπόκριση' } },
        { z:'verpassen', na:{ es:'perder', en:'to miss', el:'χάνω (το τρένο)' } },
        { z:'die Fahrkarte', na:{ es:'el billete', en:'the ticket', el:'το εισιτήριο' } },
        { z:'das Gleis', na:{ es:'el andén', en:'the platform', el:'η αποβάθρα' } },
        { z:'der Schalter', na:{ es:'la ventanilla', en:'the counter', el:'το γκισέ' } },
        { z:'die Zugbindung', na:{ es:'la validez para un tren concreto', en:'the train restriction', el:'η δέσμευση δρομολογίου' } },
        { z:'erstattet', na:{ es:'reembolsado', en:'refunded', el:'επιστρέφεται (το ποσό)' } },
        { z:'knapp', na:{ es:'justo', en:'tight', el:'οριακά, στο τσακ' } },
        { z:'ungefähr', na:{ es:'aproximadamente', en:'roughly', el:'περίπου' } },
        { z:'der nächste', na:{ es:'el siguiente', en:'the next one', el:'το επόμενο' } }
      ],
      dialog: {
        rolle: { es:'el empleado de información', en:'the service agent', el:'ο υπάλληλος εξυπηρέτησης' },
        zeilen: [
          { wer:'spikiu', z:'Der Nächste bitte. Was kann ich für Sie tun?', na:{ es:'El siguiente, por favor. ¿En qué le ayudo?', en:'Next please. How can I help you?', el:'Ο επόμενος, παρακαλώ. Τι μπορώ να κάνω για εσάς;' } },
          { wer:'lerner', z:'Mein Zug hat zwanzig Minuten Verspätung.', na:{ es:'Mi tren lleva veinte minutos de retraso.', en:'My train is twenty minutes late.', el:'Το τρένο μου έχει είκοσι λεπτά καθυστέρηση.' } },
          { wer:'spikiu', z:'Das tut mir leid. Wann müssen Sie umsteigen?', na:{ es:'Lo siento. ¿A qué hora tiene el transbordo?', en:'I\'m sorry. When do you have to change?', el:'Λυπάμαι. Πότε πρέπει να αλλάξετε τρένο;' } },
          { wer:'lerner', z:'In Hannover, um Viertel nach drei.', na:{ es:'En Hannover, a las tres y cuarto.', en:'In Hanover, at quarter past three.', el:'Στο Ανόβερο, στις τρεις και τέταρτο.' } },
          { wer:'spikiu', z:'Das wird knapp. Der Anschluss wartet nicht.', na:{ es:'Va justo. El enlace no espera.', en:'That\'ll be tight. The connection won\'t wait.', el:'Θα είναι στο τσακ. Η ανταπόκριση δεν περιμένει.' } },
          { wer:'lerner', z:'Und wenn ich ihn verpasse?', na:{ es:'¿Y si lo pierdo?', en:'And if I miss it?', el:'Κι αν τη χάσω;' } }
        ]
      },
      lesetext: {
        z:'Ein Reisender meldet an der Information, dass sein Zug zwanzig Minuten Verspätung hat. In Hannover muss er um Viertel nach drei umsteigen — das wird knapp, und der Anschluss wartet nicht. Wenn er ihn verpasst, gilt seine Fahrkarte im nächsten ICE.',
        na:{ es:'Un viajero informa en el mostrador de que su tren lleva veinte minutos de retraso. En Hannover tiene el transbordo a las tres y cuarto, va justo, y el enlace no espera. Si lo pierde, su billete vale para el siguiente tren.', en:'A traveller reports at the information desk that his train is twenty minutes late. He has to change in Hanover at quarter past three — it\'ll be tight, and the connection won\'t wait. If he misses it, his ticket is valid on the next train.', el:'Ένας ταξιδιώτης λέει στο γκισέ πληροφοριών ότι το τρένο του έχει είκοσι λεπτά καθυστέρηση. Πρέπει να αλλάξει τρένο στο Ανόβερο στις τρεις και τέταρτο — θα είναι στο τσακ, και η ανταπόκριση δεν περιμένει. Αν τη χάσει, το εισιτήριό του ισχύει στο επόμενο τρένο.' },
        frage:{ es:'¿Qué pasa si pierde el enlace?', en:'What happens if he misses the connection?', el:'Τι γίνεται αν χάσει την ανταπόκριση;' },
        optionen:[
          { na:{ es:'Su billete vale para el siguiente tren', en:'His ticket works on the next train', el:'Το εισιτήριό του ισχύει στο επόμενο τρένο' }, richtig:true },
          { na:{ es:'Tiene que comprar otro', en:'He has to buy a new one', el:'Πρέπει να αγοράσει καινούργιο' }, richtig:false },
          { na:{ es:'Le devuelven el dinero', en:'He gets a refund', el:'Του επιστρέφουν τα χρήματα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que tu tren lleva retraso y pregunta qué pasa si pierdes el enlace. Dos frases.', en:'Say your train is late and ask what happens if you miss your connection. Two sentences.', el:'Πες ότι το τρένο σου έχει καθυστέρηση και ρώτα τι γίνεται αν χάσεις την ανταπόκριση. Δύο προτάσεις.' },
        muster:'Mein Zug hat eine halbe Stunde Verspätung. Was passiert, wenn ich den Anschluss verpasse?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'En una frase con **wenn**, el verbo se va **al final**: „**Wenn** ich ihn **verpasse**, ..." Después de la coma la frase vuelve a empezar normal. Suena raro al principio y se pega rápido, porque se usa todo el día.', en:'In a **wenn** clause the verb goes **to the end**: "**Wenn** ich ihn **verpasse**, ..." After the comma the sentence starts normally again. It feels odd at first and sticks fast, because you need it every day.', el:'Σε μια πρόταση με **wenn** το ρήμα πηγαίνει **στο τέλος**: «**Wenn** ich ihn **verpasse**, ...» Μετά το κόμμα η πρόταση ξεκινάει πάλι κανονικά. Στην αρχή φαίνεται παράξενο, αλλά κολλάει γρήγορα, γιατί το χρειάζεσαι κάθε μέρα.' },
        beispiele:[
          { z:'Wenn ich ihn verpasse, nehme ich den nächsten.', na:{ es:'Si lo pierdo, cojo el siguiente.', en:'If I miss it, I\'ll take the next one.', el:'Αν τη χάσω, θα πάρω το επόμενο.' } },
          { z:'Wenn es regnet, bleibe ich hier.', na:{ es:'Si llueve, me quedo aquí.', en:'If it rains, I\'ll stay here.', el:'Αν βρέχει, θα μείνω εδώ.' } }
        ]
      }
    },

    'a2.cafe': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Dein Kaffee ist kalt. Und du bist allergisch gegen Nüsse.', es:'Tu café está frío. Y eres alérgico a los frutos secos.', en:'Your coffee is cold. And you\'re allergic to nuts.', el:'Ο καφές σου είναι κρύος. Και είσαι αλλεργικός στους ξηρούς καρπούς.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Alles in Ordnung bei Ihnen?', na:{ es:'¿Qué tal todo por aquí?', en:'How\'s everything over here?', el:'Όλα καλά εδώ;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gute Wahl. Ich bringe Ihnen beides zusammen.', na:{ es:'Buena elección. Le traigo las dos cosas juntas.', en:'Good choice. I\'ll bring you both together.', el:'Καλή επιλογή. Θα σας τα φέρω και τα δύο μαζί.' } },
      wortschatz: [
        { z:'kalt', na:{ es:'frío', en:'cold', el:'κρύος' } },
        { z:'lauwarm', na:{ es:'tibio', en:'lukewarm', el:'χλιαρός' } },
        { z:'reklamieren', na:{ es:'reclamar', en:'to complain', el:'κάνω παράπονα' } },
        { z:'die Nüsse', na:{ es:'los frutos secos', en:'the nuts', el:'οι ξηροί καρποί' } },
        { z:'allergisch', na:{ es:'alérgico', en:'allergic', el:'αλλεργικός' } },
        { z:'die Zutaten', na:{ es:'los ingredientes', en:'the ingredients', el:'τα υλικά' } },
        { z:'der Kuchen', na:{ es:'la tarta', en:'the cake', el:'το κέικ' } },
        { z:'umtauschen', na:{ es:'cambiar', en:'to swap', el:'αλλάζω' } },
        { z:'leider', na:{ es:'por desgracia', en:'unfortunately', el:'δυστυχώς' } },
        { z:'nämlich', na:{ es:'es que', en:'you see', el:'βλέπετε, γιατί' } },
        { z:'frisch', na:{ es:'fresco', en:'fresh', el:'φρέσκος' } },
        { z:'noch einmal', na:{ es:'otra vez', en:'once more', el:'άλλη μια φορά' } }
      ],
      dialog: {
        rolle: { es:'el camarero', en:'the server', el:'ο σερβιτόρος' },
        zeilen: [
          { wer:'spikiu', z:'Alles in Ordnung bei Ihnen?', na:{ es:'¿Qué tal todo por aquí?', en:'How\'s everything over here?', el:'Όλα καλά εδώ;' } },
          { wer:'lerner', z:'Entschuldigung, der Kaffee ist leider kalt.', na:{ es:'Disculpe, el café está frío.', en:'Excuse me, the coffee is cold, unfortunately.', el:'Συγγνώμη, ο καφές δυστυχώς είναι κρύος.' } },
          { wer:'spikiu', z:'Das tut mir leid, ich bringe Ihnen sofort einen neuen.', na:{ es:'Lo siento mucho, ahora mismo le traigo otro.', en:'I\'m sorry, I\'ll bring you a fresh one right away.', el:'Λυπάμαι, σας φέρνω αμέσως έναν καινούργιο.' } },
          { wer:'lerner', z:'Danke. Und noch etwas: sind in dem Kuchen Nüsse?', na:{ es:'Gracias. Y otra cosa: ¿la tarta lleva frutos secos?', en:'Thanks. And one more thing: are there nuts in the cake?', el:'Ευχαριστώ. Και κάτι ακόμα: έχει ξηρούς καρπούς αυτό το κέικ;' } },
          { wer:'spikiu', z:'In dem schon. Der Zitronenkuchen ist aber nussfrei.', na:{ es:'En esa sí. Pero la de limón no lleva.', en:'In that one, yes. But the lemon cake is nut-free.', el:'Αυτό ναι. Το κέικ λεμονιού όμως δεν έχει.' } },
          { wer:'lerner', z:'Gut, ich bin nämlich allergisch. Dann den Zitronenkuchen.', na:{ es:'Bien, es que soy alérgico. Entonces la de limón.', en:'Good, because I\'m allergic. The lemon cake then.', el:'Ωραία, γιατί είμαι αλλεργικός. Τότε το κέικ λεμονιού.' } }
        ]
      },
      lesetext: {
        z:'Ein Gast reklamiert im Café: sein Kaffee ist kalt. Der Kellner entschuldigt sich und bringt sofort einen neuen. Der Gast fragt noch, ob in dem Kuchen Nüsse sind, denn er ist allergisch. Der Zitronenkuchen ist nussfrei, also nimmt er den.',
        na:{ es:'Un cliente reclama en la cafetería: su café está frío. El camarero se disculpa y trae otro enseguida. El cliente pregunta además si la tarta lleva frutos secos, porque es alérgico. La de limón no lleva, así que se la lleva.', en:'A guest complains in the café: his coffee is cold. The waiter apologises and brings a fresh one right away. The guest also asks whether the cake has nuts in it, because he\'s allergic. The lemon cake is nut-free, so he takes that one.', el:'Ένας πελάτης κάνει παράπονα στο καφέ: ο καφές του είναι κρύος. Ο σερβιτόρος ζητάει συγγνώμη και φέρνει αμέσως καινούργιο. Ο πελάτης ρωτάει επίσης αν το κέικ έχει ξηρούς καρπούς, γιατί είναι αλλεργικός. Το κέικ λεμονιού δεν έχει, οπότε παίρνει αυτό.' },
        frage:{ es:'¿Por qué pregunta por los frutos secos?', en:'Why does he ask about the nuts?', el:'Γιατί ρωτάει για τους ξηρούς καρπούς;' },
        optionen:[
          { na:{ es:'Es alérgico', en:'He is allergic', el:'Είναι αλλεργικός' }, richtig:true },
          { na:{ es:'No le gustan', en:'He doesn\'t like them', el:'Δεν του αρέσουν' }, richtig:false },
          { na:{ es:'No tiene hambre', en:'He isn\'t hungry', el:'Δεν πεινάει' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di con cortesía que tu sopa está fría y pregunta qué lleva. Dos frases.', en:'Politely say your soup is cold and ask what is in it. Two sentences.', el:'Πες ευγενικά ότι η σούπα σου είναι κρύα και ρώτα τι έχει μέσα. Δύο προτάσεις.' },
        muster:'Entschuldigung, die Suppe ist leider kalt. Was ist da eigentlich drin?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Dos palabritas hacen educada una queja alemana. **Leider** („por desgracia") suaviza la crítica: „Der Kaffee ist kalt" suena seco, „Der Kaffee ist **leider** kalt" no. Y **nämlich** explica sin sonar a excusa: „Ich bin **nämlich** allergisch". Ninguna de las dos se traduce bien — se aprenden por el efecto que hacen.', en:'Two little words make a German complaint polite. **Leider** ("unfortunately") softens it: "Der Kaffee ist kalt" is blunt, "Der Kaffee ist **leider** kalt" is not. And **nämlich** explains without sounding like an excuse: "Ich bin **nämlich** allergisch". Neither translates well — you learn them by the effect they have.', el:'Δύο μικρές λέξεις κάνουν ένα γερμανικό παράπονο ευγενικό. Το **leider** («δυστυχώς») το μαλακώνει: «Der Kaffee ist kalt» είναι απότομο, «Der Kaffee ist **leider** kalt» όχι. Και το **nämlich** εξηγεί χωρίς να ακούγεται σαν δικαιολογία: «Ich bin **nämlich** allergisch». Καμία από τις δύο δεν μεταφράζεται καλά — τις μαθαίνεις από το αποτέλεσμα που έχουν.' },
        beispiele:[
          { z:'Der Kaffee ist leider kalt.', na:{ es:'El café está frío, por desgracia.', en:'The coffee is cold, unfortunately.', el:'Ο καφές δυστυχώς είναι κρύος.' } },
          { z:'Ich bin nämlich allergisch.', na:{ es:'Es que soy alérgico.', en:'You see, I\'m allergic.', el:'Βλέπετε, είμαι αλλεργικός.' } }
        ]
      }
    },

    'a2.einkaufen': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast gestern ein Hemd gekauft. Es ist dir zu groß, den Kassenbon hast du dabei.', es:'Ayer compraste una camisa. Te queda grande y llevas el ticket.', en:'You bought a shirt yesterday. It\'s too big and you have the receipt.', el:'Αγόρασες ένα πουκάμισο χθες. Είναι πολύ μεγάλο και έχεις την απόδειξη.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Tag, kann ich Ihnen behilflich sein?', na:{ es:'Buenos días, ¿le puedo ayudar en algo?', en:'Hello, can I help you with anything?', el:'Καλημέρα, μπορώ να σας βοηθήσω σε κάτι;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gerne, die Kabine ist hinten links. Ich bringe Ihnen die Größe.', na:{ es:'Claro, el probador está al fondo a la izquierda. Le traigo la talla.', en:'Of course, the fitting room is at the back on the left. I\'ll bring you the size.', el:'Βεβαίως, το δοκιμαστήριο είναι πίσω αριστερά. Σας φέρνω το νούμερο.' } },
      wortschatz: [
        { z:'das Hemd', na:{ es:'la camisa', en:'the shirt', el:'το πουκάμισο' } },
        { z:'die Größe', na:{ es:'la talla', en:'the size', el:'το νούμερο' } },
        { z:'zu groß', na:{ es:'demasiado grande', en:'too big', el:'πολύ μεγάλος' } },
        { z:'zu klein', na:{ es:'demasiado pequeño', en:'too small', el:'πολύ μικρός' } },
        { z:'der Kassenbon', na:{ es:'el ticket de compra', en:'the receipt', el:'η απόδειξη ταμειακής' } },
        { z:'umtauschen', na:{ es:'cambiar', en:'to exchange', el:'αλλάζω (ένα προϊόν)' } },
        { z:'anprobieren', na:{ es:'probarse', en:'to try on', el:'δοκιμάζω (ρούχο)' } },
        { z:'die Umkleidekabine', na:{ es:'el probador', en:'the fitting room', el:'το δοκιμαστήριο' } },
        { z:'passen', na:{ es:'quedar bien', en:'to fit', el:'ταιριάζω, κάνω (για ρούχο)' } },
        { z:'das Angebot', na:{ es:'la oferta', en:'the special offer', el:'η προσφορά' } },
        { z:'zurückgeben', na:{ es:'devolver', en:'to return', el:'επιστρέφω' } },
        { z:'die Quittung', na:{ es:'el recibo', en:'the receipt', el:'η απόδειξη' } }
      ],
      dialog: {
        rolle: { es:'la vendedora', en:'the sales assistant', el:'η πωλήτρια' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag, kann ich Ihnen behilflich sein?', na:{ es:'Buenos días, ¿le puedo ayudar en algo?', en:'Hello, can I help you with anything?', el:'Καλημέρα, μπορώ να σας βοηθήσω σε κάτι;' } },
          { wer:'lerner', z:'Ja, ich habe dieses Hemd gestern gekauft, aber es ist mir zu groß.', na:{ es:'Sí, compré esta camisa ayer, pero me queda grande.', en:'Yes, I bought this shirt yesterday, but it\'s too big for me.', el:'Ναι, αγόρασα αυτό το πουκάμισο χθες, αλλά μου είναι μεγάλο.' } },
          { wer:'spikiu', z:'Haben Sie den Kassenbon dabei?', na:{ es:'¿Trae el ticket de compra?', en:'Do you have the receipt with you?', el:'Έχετε μαζί σας την απόδειξη;' } },
          { wer:'lerner', z:'Ja, hier. Kann ich es umtauschen?', na:{ es:'Sí, aquí está. ¿Puedo cambiarla?', en:'Yes, here. Can I exchange it?', el:'Ναι, ορίστε. Μπορώ να το αλλάξω;' } },
          { wer:'spikiu', z:'Selbstverständlich. Welche Größe brauchen Sie?', na:{ es:'Por supuesto. ¿Qué talla necesita?', en:'Of course. What size do you need?', el:'Φυσικά. Τι νούμερο χρειάζεστε;' } },
          { wer:'lerner', z:'Eine kleiner. Darf ich es anprobieren?', na:{ es:'Una menos. ¿Me la puedo probar?', en:'One smaller. May I try it on?', el:'Ένα μικρότερο. Μπορώ να το δοκιμάσω;' } }
        ]
      },
      lesetext: {
        z:'Eine Kundin hat gestern ein Hemd gekauft, aber es ist ihr zu groß. Sie hat den Kassenbon dabei und darf es umtauschen. Sie braucht eine Größe kleiner und möchte es anprobieren. Die Kabine ist hinten links.',
        na:{ es:'Una clienta compró ayer una camisa, pero le queda grande. Trae el ticket y puede cambiarla. Necesita una talla menos y quiere probársela. El probador está al fondo a la izquierda.', en:'A customer bought a shirt yesterday, but it\'s too big for her. She has the receipt with her and may exchange it. She needs one size smaller and wants to try it on. The fitting room is at the back on the left.', el:'Μια πελάτισσα αγόρασε χθες ένα πουκάμισο, αλλά της είναι μεγάλο. Έχει την απόδειξη μαζί της και μπορεί να το αλλάξει. Χρειάζεται ένα νούμερο μικρότερο και θέλει να το δοκιμάσει. Το δοκιμαστήριο είναι πίσω αριστερά.' },
        frage:{ es:'¿Qué necesita para cambiarla?', en:'What does she need in order to exchange it?', el:'Τι χρειάζεται για να το αλλάξει;' },
        optionen:[
          { na:{ es:'El ticket de compra', en:'The receipt', el:'Την απόδειξη' }, richtig:true },
          { na:{ es:'Una cita', en:'An appointment', el:'Ένα ραντεβού' }, richtig:false },
          { na:{ es:'Otro color', en:'Another colour', el:'Άλλο χρώμα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que el pantalón te queda pequeño y pregunta si puedes cambiarlo. Dos frases.', en:'Say the trousers are too small and ask if you can exchange them. Two sentences.', el:'Πες ότι το παντελόνι είναι μικρό και ρώτα αν μπορείς να το αλλάξεις. Δύο προτάσεις.' },
        muster:'Die Hose ist mir leider zu klein. Kann ich sie umtauschen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'El español dice **poder** para todo. El alemán separa dos cosas: **kann ich** = ¿soy capaz, es posible? · **darf ich** = ¿me dejan? Al probarse ropa se pide permiso, no capacidad: **Darf ich es anprobieren?** Con „kann" suena como si dudaras de tus brazos.', en:'English uses "can" for everything. German splits it: **kann ich** = am I able to · **darf ich** = am I allowed to. Trying on clothes is about permission: **Darf ich es anprobieren?** Using "kann" sounds like you doubt your own arms.', el:'Τα ελληνικά λένε «μπορώ» για όλα. Τα γερμανικά το χωρίζουν: **kann ich** = είμαι ικανός να · **darf ich** = μου επιτρέπεται να. Η δοκιμή ρούχων είναι θέμα άδειας: **Darf ich es anprobieren?** Με «kann» ακούγεται σαν να αμφιβάλλεις για τα χέρια σου.' },
        beispiele:[
          { z:'Darf ich es anprobieren?', na:{ es:'¿Me lo puedo probar?', en:'May I try it on?', el:'Μπορώ να το δοκιμάσω;' } },
          { z:'Kann ich mit Karte zahlen?', na:{ es:'¿Puedo pagar con tarjeta?', en:'Can I pay by card?', el:'Μπορώ να πληρώσω με κάρτα;' } }
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
      deineRolle: { de:'Als Kind hast du in einem kleinen Dorf gewohnt. Deine Schwester ist weggezogen.', es:'De niño vivías en un pueblo pequeño. Tu hermana se mudó.', en:'As a child you lived in a small village. Your sister has moved away.', el:'Όταν ήσουν παιδί έμενες σε ένα μικρό χωριό. Η αδερφή σου έχει μετακομίσει.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Das kann ich gut verstehen. Aber ihr seht euch bestimmt bald wieder.', na:{ es:'Lo entiendo muy bien. Pero seguro que os veis pronto.', en:'I understand that well. But I\'m sure you\'ll see each other soon.', el:'Σε καταλαβαίνω πολύ καλά. Αλλά σίγουρα θα ξαναβρεθείτε σύντομα.' } },
      wortschatz: [
        { z:'das Dorf', na:{ es:'el pueblo', en:'the village', el:'το χωριό' } },
        { z:'früher', na:{ es:'antes', en:'back then', el:'παλιότερα' } },
        { z:'umziehen', na:{ es:'mudarse', en:'to move house', el:'μετακομίζω' } },
        { z:'weggezogen', na:{ es:'se mudó', en:'moved away', el:'έφυγε, μετακόμισε' } },
        { z:'vermissen', na:{ es:'echar de menos', en:'to miss', el:'μου λείπει' } },
        { z:'sich treffen', na:{ es:'reunirse', en:'to meet up', el:'συναντιέμαι' } },
        { z:'die Tante', na:{ es:'la tía', en:'the aunt', el:'η θεία' } },
        { z:'der Onkel', na:{ es:'el tío', en:'the uncle', el:'ο θείος' } },
        { z:'der Cousin', na:{ es:'el primo', en:'the cousin', el:'ο ξάδερφος' } },
        { z:'damals', na:{ es:'en aquella época', en:'in those days', el:'τότε' } },
        { z:'als Kind', na:{ es:'de niño', en:'as a child', el:'ως παιδί' } },
        { z:'eigentlich', na:{ es:'en realidad', en:'actually', el:'στην πραγματικότητα, τελικά' } }
      ],
      dialog: {
        rolle: { es:'una vieja conocida', en:'an old acquaintance', el:'μια παλιά γνωστή' },
        zeilen: [
          { wer:'spikiu', z:'Wo hast du eigentlich als Kind gewohnt?', na:{ es:'¿Dónde vivías cuando eras niño?', en:'Where did you actually live as a child?', el:'Πού έμενες τελικά όταν ήσουν παιδί;' } },
          { wer:'lerner', z:'Wir haben in einem kleinen Dorf gewohnt.', na:{ es:'Vivíamos en un pueblo pequeño.', en:'We lived in a small village.', el:'Μέναμε σε ένα μικρό χωριό.' } },
          { wer:'spikiu', z:'Und war die ganze Familie dort?', na:{ es:'¿Y estaba toda la familia allí?', en:'And was the whole family there?', el:'Και ήταν όλη η οικογένεια εκεί;' } },
          { wer:'lerner', z:'Ja. Sonntags haben wir uns bei meiner Tante getroffen.', na:{ es:'Sí. Los domingos nos reuníamos en casa de mi tía.', en:'Yes. On Sundays we used to meet at my aunt\'s.', el:'Ναι. Τις Κυριακές βρισκόμασταν στης θείας μου.' } },
          { wer:'spikiu', z:'Wie schön. Sind sie noch da?', na:{ es:'Qué bonito. ¿Siguen allí?', en:'How lovely. Are they still there?', el:'Τι ωραία. Είναι ακόμα εκεί;' } },
          { wer:'lerner', z:'Nein, meine Schwester ist weggezogen. Ich vermisse sie.', na:{ es:'No, mi hermana se mudó. La echo de menos.', en:'No, my sister moved away. I miss her.', el:'Όχι, η αδερφή μου έφυγε. Μου λείπει.' } }
        ]
      },
      lesetext: {
        z:'Zwei alte Bekannte reden über früher. Als Kind hat er in einem kleinen Dorf gewohnt. Sonntags haben sich alle bei der Tante getroffen. Heute ist seine Schwester weggezogen, und er vermisst sie.',
        na:{ es:'Dos viejos conocidos hablan del pasado. De niño vivía en un pueblo pequeño. Los domingos se reunían todos en casa de la tía. Hoy su hermana se ha mudado y la echa de menos.', en:'Two old acquaintances talk about the past. As a child he lived in a small village. On Sundays everyone met at his aunt\'s. Today his sister has moved away, and he misses her.', el:'Δύο παλιοί γνωστοί μιλάνε για το παρελθόν. Ως παιδί εκείνος έμενε σε ένα μικρό χωριό. Τις Κυριακές βρίσκονταν όλοι στης θείας του. Σήμερα η αδερφή του έχει μετακομίσει, και του λείπει.' },
        frage:{ es:'¿Qué hacían los domingos?', en:'What did they do on Sundays?', el:'Τι έκαναν τις Κυριακές;' },
        optionen:[
          { na:{ es:'Se reunían en casa de la tía', en:'They met at his aunt\'s', el:'Βρίσκονταν στης θείας του' }, richtig:true },
          { na:{ es:'Trabajaban en el pueblo', en:'They worked in the village', el:'Δούλευαν στο χωριό' }, richtig:false },
          { na:{ es:'Nada', en:'Nothing', el:'Τίποτα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Cuenta dónde vivías de niño y qué hacíais los domingos. Dos frases.', en:'Say where you lived as a child and what you used to do on Sundays. Two sentences.', el:'Πες πού έμενες ως παιδί και τι έκανες τις Κυριακές. Δύο προτάσεις.' },
        muster:'Als Kind habe ich in einer kleinen Stadt gewohnt. Sonntags haben wir meine Großeltern besucht.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Para contar el pasado hablando, el alemán casi siempre usa dos piezas: **haben** + el verbo al final. „Wir **haben** in einem Dorf **gewohnt**." El imperfecto español („vivíamos") existe en alemán, pero se reserva para libros. En la mesa se dice así.', en:'To talk about the past, German nearly always uses two pieces: **haben** + the verb at the end. "Wir **haben** in einem Dorf **gewohnt**." The simple past exists but belongs in books. At the kitchen table, it is this.', el:'Για να μιλήσουν για το παρελθόν, τα γερμανικά χρησιμοποιούν σχεδόν πάντα δύο κομμάτια: **haben** + το ρήμα στο τέλος. «Wir **haben** in einem Dorf **gewohnt**.» Ο απλός παρελθοντικός υπάρχει, αλλά ανήκει στα βιβλία. Στο τραπέζι της κουζίνας λένε αυτό.' },
        beispiele:[
          { z:'Wir haben in einem Dorf gewohnt.', na:{ es:'Vivíamos en un pueblo.', en:'We lived in a village.', el:'Μέναμε σε ένα χωριό.' } },
          { z:'Wir haben uns getroffen.', na:{ es:'Nos reuníamos.', en:'We used to meet.', el:'Βρισκόμασταν.' } }
        ]
      }
    },

    'a2.hotel': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Seit gestern Abend geht die Heizung nicht, warmes Wasser auch nicht.', es:'Desde anoche no funciona la calefacción, y tampoco hay agua caliente.', en:'Since last night the heating hasn\'t worked, and there\'s no hot water either.', el:'Από χθες το βράδυ η θέρμανση δεν λειτουργεί, και δεν έχει ούτε ζεστό νερό.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Morgen. Alles zu Ihrer Zufriedenheit?', na:{ es:'Buenos días. ¿Todo bien con la habitación?', en:'Good morning. Is everything to your satisfaction?', el:'Καλημέρα. Είναι όλα όπως τα θέλετε;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Selbstverständlich. Ich gebe Ihnen die 305, die liegt ruhiger.', na:{ es:'Por supuesto. Le doy la 305, es más tranquila.', en:'Of course. I\'ll give you 305, it\'s quieter.', el:'Φυσικά. Σας δίνω το 305, είναι πιο ήσυχο.' } },
      wortschatz: [
        { z:'die Heizung', na:{ es:'la calefacción', en:'the heating', el:'η θέρμανση' } },
        { z:'funktionieren', na:{ es:'funcionar', en:'to work', el:'λειτουργώ' } },
        { z:'kaputt', na:{ es:'estropeado', en:'broken', el:'χαλασμένος' } },
        { z:'warmes Wasser', na:{ es:'agua caliente', en:'hot water', el:'ζεστό νερό' } },
        { z:'das Handtuch', na:{ es:'la toalla', en:'the towel', el:'η πετσέτα' } },
        { z:'die Klimaanlage', na:{ es:'el aire acondicionado', en:'the air conditioning', el:'το κλιματιστικό' } },
        { z:'wechseln', na:{ es:'cambiar', en:'to change', el:'αλλάζω' } },
        { z:'ich würde lieber', na:{ es:'preferiría', en:'I\'d rather', el:'θα προτιμούσα' } },
        { z:'ruhig', na:{ es:'tranquilo', en:'quiet', el:'ήσυχος' } },
        { z:'laut', na:{ es:'ruidoso', en:'noisy', el:'θορυβώδης' } },
        { z:'sofort', na:{ es:'ahora mismo', en:'right away', el:'αμέσως' } },
        { z:'Bescheid geben', na:{ es:'avisar', en:'to let someone know', el:'ενημερώνω κάποιον' } }
      ],
      dialog: {
        rolle: { es:'la recepcionista', en:'the front desk clerk', el:'η ρεσεψιονίστ' },
        zeilen: [
          { wer:'spikiu', z:'Guten Morgen. Alles zu Ihrer Zufriedenheit?', na:{ es:'Buenos días. ¿Todo bien con la habitación?', en:'Good morning. Is everything to your satisfaction?', el:'Καλημέρα. Είναι όλα όπως τα θέλετε;' } },
          { wer:'lerner', z:'Guten Morgen. Leider funktioniert die Heizung nicht.', na:{ es:'Buenos días. Lamentablemente la calefacción no funciona.', en:'Good morning. Unfortunately the heating isn\'t working.', el:'Καλημέρα. Δυστυχώς η θέρμανση δεν λειτουργεί.' } },
          { wer:'spikiu', z:'Das tut mir leid. Seit wann denn?', na:{ es:'Lo siento mucho. ¿Desde cuándo?', en:'I\'m sorry. Since when?', el:'Λυπάμαι. Από πότε;' } },
          { wer:'lerner', z:'Seit gestern Abend. Und warmes Wasser gibt es auch nicht.', na:{ es:'Desde anoche. Y tampoco hay agua caliente.', en:'Since last night. And there\'s no hot water either.', el:'Από χθες το βράδυ. Και δεν έχει ούτε ζεστό νερό.' } },
          { wer:'spikiu', z:'Ich schicke sofort jemanden hoch. Oder möchten Sie lieber wechseln?', na:{ es:'Enviamos a alguien ahora mismo. ¿O prefiere cambiar?', en:'I\'ll send someone up right away. Or would you rather change?', el:'Στέλνω αμέσως κάποιον επάνω. Ή θα προτιμούσατε να αλλάξετε;' } },
          { wer:'lerner', z:'Ich würde lieber wechseln, wenn das geht.', na:{ es:'Preferiría cambiar, si es posible.', en:'I\'d rather change, if that\'s possible.', el:'Θα προτιμούσα να αλλάξω, αν γίνεται.' } }
        ]
      },
      lesetext: {
        z:'Ein Gast meldet an der Rezeption, dass die Heizung seit gestern Abend nicht funktioniert. Warmes Wasser gibt es auch keins. Die Rezeptionistin bietet an, jemanden zu schicken — der Gast würde aber lieber das Zimmer wechseln. Er bekommt die 305, die liegt ruhiger.',
        na:{ es:'Un huésped informa en recepción de que la calefacción no funciona desde anoche. Tampoco hay agua caliente. La recepcionista ofrece mandar a alguien, pero el huésped preferiría cambiar de habitación. Le dan la 305, que es más tranquila.', en:'A guest reports at reception that the heating hasn\'t worked since last night. There\'s no hot water either. The receptionist offers to send someone up, but the guest would rather change rooms. He gets 305, which is quieter.', el:'Ένας πελάτης λέει στη ρεσεψιόν ότι η θέρμανση δεν λειτουργεί από χθες το βράδυ. Δεν έχει ούτε ζεστό νερό. Η ρεσεψιονίστ προτείνει να στείλει κάποιον επάνω, αλλά ο πελάτης προτιμά να αλλάξει δωμάτιο. Παίρνει το 305, που είναι πιο ήσυχο.' },
        frage:{ es:'¿Qué prefiere el huésped?', en:'What does the guest prefer?', el:'Τι προτιμά ο πελάτης;' },
        optionen:[
          { na:{ es:'Otra habitación', en:'Another room', el:'Άλλο δωμάτιο' }, richtig:true },
          { na:{ es:'Que le devuelvan el dinero', en:'His money back', el:'Τα χρήματά του πίσω' }, richtig:false },
          { na:{ es:'Una segunda llave', en:'A second key', el:'Ένα δεύτερο κλειδί' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Informa de que la luz del baño no funciona y pide otra habitación. Dos frases.', en:'Report that the bathroom light does not work and ask for another room. Two sentences.', el:'Πες ότι το φως στο μπάνιο δεν λειτουργεί και ζήτα άλλο δωμάτιο. Δύο προτάσεις.' },
        muster:'Das Licht im Bad funktioniert leider nicht. Ich würde lieber das Zimmer wechseln.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'**Ich will wechseln** suena a exigencia. **Ich möchte wechseln** ya está bien. **Ich würde lieber wechseln** es lo más suave: dice tu preferencia sin presionar a nadie. Tres escalones para la misma frase — en Alemania importa cuál eliges.', en:'**Ich will wechseln** sounds demanding. **Ich möchte wechseln** is fine. **Ich würde lieber wechseln** is the softest: it states your preference without putting anyone under pressure. Three steps for the same sentence — in Germany the step you pick matters.', el:'Το **Ich will wechseln** ακούγεται απαιτητικό. Το **Ich möchte wechseln** είναι εντάξει. Το **Ich würde lieber wechseln** είναι το πιο ήπιο: λες την προτίμησή σου χωρίς να πιέζεις κανέναν. Τρία σκαλοπάτια για την ίδια πρόταση — στη Γερμανία μετράει ποιο θα διαλέξεις.' },
        beispiele:[
          { z:'Ich würde lieber wechseln.', na:{ es:'Preferiría cambiar.', en:'I\'d rather change.', el:'Θα προτιμούσα να αλλάξω.' } },
          { z:'Ich würde lieber morgen kommen.', na:{ es:'Preferiría venir mañana.', en:'I\'d rather come tomorrow.', el:'Θα προτιμούσα να έρθω αύριο.' } }
        ]
      }
    },

    'a2.restaurant': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Ihr seid zu zweit, wollt etwas Leichteres teilen und getrennt zahlen.', es:'Son dos, quieren compartir algo más ligero y pagar por separado.', en:'There are two of you; you want to share something lighter and pay separately.', el:'Είστε δύο· θέλετε να μοιραστείτε κάτι πιο ελαφρύ και να πληρώσετε χωριστά.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Haben Sie schon gewählt?', na:{ es:'¿Ya han elegido?', en:'Have you decided yet?', el:'Διαλέξατε;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Selbstverständlich, das machen wir hier oft. Ich bringe erst mal Wasser.', na:{ es:'Por supuesto, aquí lo hacemos a menudo. Primero les traigo agua.', en:'Of course, we do that often here. I\'ll bring some water first.', el:'Φυσικά, το κάνουμε συχνά εδώ. Σας φέρνω πρώτα νερό.' } },
      wortschatz: [
        { z:'die Spezialität', na:{ es:'la especialidad', en:'the speciality', el:'η σπεσιαλιτέ' } },
        { z:'deftig', na:{ es:'contundente', en:'hearty', el:'βαρύς, χορταστικός' } },
        { z:'leicht', na:{ es:'ligero', en:'light', el:'ελαφρύς' } },
        { z:'teilen', na:{ es:'compartir', en:'to share', el:'μοιράζομαι' } },
        { z:'getrennt zahlen', na:{ es:'pagar por separado', en:'to split the bill', el:'πληρώνω χωριστά' } },
        { z:'der Knödel', na:{ es:'la bola de patata', en:'the dumpling', el:'το κνέντελ (μπαλίτσα ζύμης)' } },
        { z:'das Gemüse', na:{ es:'la verdura', en:'the vegetables', el:'τα λαχανικά' } },
        { z:'die Portion', na:{ es:'la ración', en:'the portion', el:'η μερίδα' } },
        { z:'reichen', na:{ es:'dar para, llegar', en:'to be enough', el:'φτάνω, αρκώ' } },
        { z:'empfehlen', na:{ es:'recomendar', en:'to recommend', el:'προτείνω' } },
        { z:'könnten wir', na:{ es:'¿podríamos?', en:'could we', el:'θα μπορούσαμε' } },
        { z:'hinterher', na:{ es:'después', en:'afterwards', el:'μετά' } }
      ],
      dialog: {
        rolle: { es:'la camarera', en:'the server', el:'η σερβιτόρα' },
        zeilen: [
          { wer:'spikiu', z:'Haben Sie schon gewählt?', na:{ es:'¿Ya han elegido?', en:'Have you decided yet?', el:'Διαλέξατε;' } },
          { wer:'lerner', z:'Noch nicht. Was ist denn Ihre Spezialität?', na:{ es:'Todavía no. ¿Cuál es su especialidad?', en:'Not yet. What is your speciality?', el:'Ακόμα όχι. Ποια είναι η σπεσιαλιτέ σας;' } },
          { wer:'spikiu', z:'Der Schweinebraten mit Knödeln. Sehr deftig, aber gut.', na:{ es:'El asado de cerdo con bolas de patata. Contundente, pero bueno.', en:'The roast pork with dumplings. Very hearty, but good.', el:'Το χοιρινό ψητό με κνέντελ. Πολύ χορταστικό, αλλά καλό.' } },
          { wer:'lerner', z:'Gibt es etwas Leichteres? Wir möchten teilen.', na:{ es:'¿Hay algo más ligero? Queremos compartir.', en:'Is there something lighter? We\'d like to share.', el:'Υπάρχει κάτι πιο ελαφρύ; Θέλουμε να το μοιραστούμε.' } },
          { wer:'spikiu', z:'Dann den Fisch mit Gemüse. Der reicht für zwei.', na:{ es:'Entonces el pescado con verduras. Da para dos.', en:'The fish with vegetables then. That\'s enough for two.', el:'Τότε το ψάρι με λαχανικά. Φτάνει για δύο.' } },
          { wer:'lerner', z:'Gut. Und könnten wir hinterher getrennt zahlen?', na:{ es:'Bien. ¿Y podríamos pagar por separado después?', en:'Good. And could we pay separately afterwards?', el:'Ωραία. Και θα μπορούσαμε μετά να πληρώσουμε χωριστά;' } }
        ]
      },
      lesetext: {
        z:'Zwei Gäste fragen nach der Spezialität des Hauses. Der Schweinebraten mit Knödeln ist sehr deftig, deshalb möchten sie lieber etwas Leichteres teilen. Die Kellnerin empfiehlt den Fisch mit Gemüse — der reicht für zwei. Am Ende zahlen sie getrennt.',
        na:{ es:'Dos clientes preguntan por la especialidad de la casa. El asado de cerdo con bolas de patata es muy contundente, así que prefieren compartir algo más ligero. La camarera les recomienda el pescado con verduras, que da para dos. Al final pagan por separado.', en:'Two guests ask about the house speciality. The roast pork with dumplings is very hearty, so they\'d rather share something lighter. The waitress recommends the fish with vegetables — enough for two. In the end they pay separately.', el:'Δύο πελάτες ρωτούν για τη σπεσιαλιτέ του μαγαζιού. Το χοιρινό ψητό με κνέντελ είναι πολύ χορταστικό, οπότε προτιμούν να μοιραστούν κάτι πιο ελαφρύ. Η σερβιτόρα προτείνει το ψάρι με λαχανικά — φτάνει για δύο. Στο τέλος πληρώνουν χωριστά.' },
        frage:{ es:'¿Qué piden los dos?', en:'What do the two order?', el:'Τι παραγγέλνουν οι δύο;' },
        optionen:[
          { na:{ es:'Pescado con verduras', en:'Fish with vegetables', el:'Ψάρι με λαχανικά' }, richtig:true },
          { na:{ es:'Asado con bolas de patata', en:'Roast pork with dumplings', el:'Χοιρινό ψητό με κνέντελ' }, richtig:false },
          { na:{ es:'Solo un entrante', en:'Only a starter', el:'Μόνο ένα ορεκτικό' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta por la especialidad y pide cuentas separadas. Dos frases.', en:'Ask about the speciality and ask to split the bill. Two sentences.', el:'Ρώτα για τη σπεσιαλιτέ και ζήτα να πληρώσετε χωριστά. Δύο προτάσεις.' },
        muster:'Was ist Ihre Spezialität? Könnten wir hinterher getrennt zahlen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'**Können wir zahlen?** está bien dicho, pero suena a exigencia. **Könnten wir zahlen?** es la misma pregunta, un paso más atrás — como el condicional español „¿podríamos?". En restaurantes, tiendas y hoteles los alemanes usan casi siempre esta forma.', en:'**Können wir zahlen?** is correct but comes across as demanding. **Könnten wir zahlen?** is the same question, one step back — like English "could we" instead of "can we". In restaurants and shops Germans almost always use this form.', el:'Το **Können wir zahlen?** είναι σωστό, αλλά ακούγεται απαιτητικό. Το **Könnten wir zahlen?** είναι η ίδια ερώτηση, ένα βήμα πιο πίσω — όπως το ελληνικό «θα μπορούσαμε» αντί για «μπορούμε». Σε εστιατόρια και μαγαζιά οι Γερμανοί χρησιμοποιούν σχεδόν πάντα αυτόν τον τύπο.' },
        beispiele:[
          { z:'Könnten wir bestellen?', na:{ es:'¿Podríamos pedir?', en:'Could we order?', el:'Θα μπορούσαμε να παραγγείλουμε;' } },
          { z:'Könnten wir getrennt zahlen?', na:{ es:'¿Podríamos pagar por separado?', en:'Could we split the bill?', el:'Θα μπορούσαμε να πληρώσουμε χωριστά;' } }
        ]
      }
    },

    'a2.taxi': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du willst zum Flughafen und hast es eilig. Am Ende brauchst du eine Quittung.', es:'Quieres ir al aeropuerto y tienes prisa. Al final necesitas un recibo.', en:'You\'re in a hurry to the airport. At the end you need a receipt.', el:'Βιάζεσαι να πας στο αεροδρόμιο. Στο τέλος χρειάζεσαι απόδειξη.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Morgen. Wohin darf ich Sie bringen?', na:{ es:'Buenos días. ¿Adónde le llevo?', en:'Good morning. Where can I take you?', el:'Καλημέρα. Πού να σας πάω;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Klar, die schreibe ich Ihnen. Wir sind pünktlich da.', na:{ es:'Claro, se lo hago. Llegamos a tiempo.', en:'Sure, I\'ll write you one. We\'ll be there on time.', el:'Βεβαίως, θα σας τη γράψω. Θα είμαστε εκεί στην ώρα μας.' } },
      wortschatz: [
        { z:'der Stau', na:{ es:'el atasco', en:'the traffic jam', el:'το μποτιλιάρισμα' } },
        { z:'die Autobahn', na:{ es:'la autopista', en:'the motorway', el:'ο αυτοκινητόδρομος' } },
        { z:'der Verkehr', na:{ es:'el tráfico', en:'the traffic', el:'η κίνηση' } },
        { z:'in Eile sein', na:{ es:'tener prisa', en:'to be in a hurry', el:'βιάζομαι' } },
        { z:'die Quittung', na:{ es:'el recibo', en:'the receipt', el:'η απόδειξη' } },
        { z:'abbiegen', na:{ es:'girar', en:'to turn off', el:'στρίβω' } },
        { z:'die Umleitung', na:{ es:'el desvío', en:'the diversion', el:'η παράκαμψη' } },
        { z:'pünktlich', na:{ es:'puntual', en:'on time', el:'στην ώρα του' } },
        { z:'die Baustelle', na:{ es:'las obras', en:'the roadworks', el:'τα έργα στον δρόμο' } },
        { z:'dauern', na:{ es:'durar', en:'to take time', el:'διαρκώ, κρατάω' } },
        { z:'denn', na:{ es:'¿de verdad?', en:'actually', el:'άραγε, δηλαδή' } },
        { z:'lang', na:{ es:'por ahí', en:'that way', el:'από εκεί' } }
      ],
      dialog: {
        rolle: { es:'la taxista', en:'the driver', el:'η ταξιτζής' },
        zeilen: [
          { wer:'spikiu', z:'Guten Morgen. Wohin darf ich Sie bringen?', na:{ es:'Buenos días. ¿Adónde le llevo?', en:'Good morning. Where can I take you?', el:'Καλημέρα. Πού να σας πάω;' } },
          { wer:'lerner', z:'Zum Flughafen, bitte. Ich bin in Eile.', na:{ es:'Al aeropuerto, por favor. Tengo prisa.', en:'To the airport, please. I\'m in a hurry.', el:'Στο αεροδρόμιο, παρακαλώ. Βιάζομαι.' } },
          { wer:'spikiu', z:'Auf der Autobahn ist Stau. Soll ich durch die Stadt fahren?', na:{ es:'Hay atasco en la autopista. ¿Voy por el centro?', en:'There\'s a jam on the motorway. Shall I go through town?', el:'Στον αυτοκινητόδρομο έχει μποτιλιάρισμα. Να πάω από το κέντρο;' } },
          { wer:'lerner', z:'Ist das denn schneller?', na:{ es:'¿Es más rápido por ahí?', en:'Is that actually faster?', el:'Είναι άραγε πιο γρήγορα;' } },
          { wer:'spikiu', z:'Bei dem Verkehr ja. Zehn Minuten weniger.', na:{ es:'Con este tráfico, sí. Diez minutos menos.', en:'With this traffic, yes. Ten minutes less.', el:'Με αυτή την κίνηση, ναι. Δέκα λεπτά λιγότερο.' } },
          { wer:'lerner', z:'Dann fahren Sie da lang. Bekomme ich am Ende eine Quittung?', na:{ es:'Entonces vaya por ahí. ¿Me da un recibo al final?', en:'Then go that way. Will I get a receipt at the end?', el:'Τότε πηγαίνετε από εκεί. Θα πάρω απόδειξη στο τέλος;' } }
        ]
      },
      lesetext: {
        z:'Morgens im Berufsverkehr will ein Fahrgast schnell zum Flughafen. Auf der Autobahn ist Stau, deshalb schlägt die Fahrerin den Weg durch die Stadt vor — zehn Minuten weniger. Am Ende bekommt der Fahrgast eine Quittung.',
        na:{ es:'Por la mañana, en hora punta, un pasajero quiere llegar rápido al aeropuerto. Hay atasco en la autopista, así que la taxista propone ir por el centro: diez minutos menos. Al final la taxista le da un recibo.', en:'In the morning rush a passenger wants to get to the airport fast. There\'s a jam on the motorway, so the driver suggests going through town — ten minutes less. At the end the passenger gets a receipt.', el:'Στην πρωινή αιχμή ένας επιβάτης θέλει να φτάσει γρήγορα στο αεροδρόμιο. Στον αυτοκινητόδρομο έχει μποτιλιάρισμα, οπότε η ταξιτζής προτείνει να πάνε από το κέντρο — δέκα λεπτά λιγότερο. Στο τέλος ο επιβάτης παίρνει απόδειξη.' },
        frage:{ es:'¿Por qué van por el centro?', en:'Why do they go through town?', el:'Γιατί πηγαίνουν από το κέντρο;' },
        optionen:[
          { na:{ es:'Hay atasco en la autopista', en:'There\'s a jam on the motorway', el:'Έχει μποτιλιάρισμα στον αυτοκινητόδρομο' }, richtig:true },
          { na:{ es:'El centro es más bonito', en:'Town is prettier', el:'Το κέντρο είναι πιο όμορφο' }, richtig:false },
          { na:{ es:'El aeropuerto está cerrado', en:'The airport is closed', el:'Το αεροδρόμιο είναι κλειστό' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di adónde vas, que tienes prisa, y pide un recibo. Dos frases.', en:'Give your destination, say you are in a hurry, and ask for a receipt. Two sentences.', el:'Πες τον προορισμό σου, ότι βιάζεσαι και ζήτα απόδειξη. Δύο προτάσεις.' },
        muster:'Zum Bahnhof, bitte — ich bin in Eile. Bekomme ich am Ende eine Quittung?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'**Ist das schneller?** es una pregunta neutra. **Ist das denn schneller?** añade una duda cortés: „¿de verdad?". No cambia nada de la gramática y lo cambia todo del tono. Ningún diccionario lo explica; todo alemán lo oye.', en:'**Ist das schneller?** is a neutral question. **Ist das denn schneller?** adds polite scepticism — like English "is that actually faster?". It changes nothing grammatically and everything about the tone.', el:'Το **Ist das schneller?** είναι μια ουδέτερη ερώτηση. Το **Ist das denn schneller?** προσθέτει ευγενικό σκεπτικισμό — όπως το ελληνικό «είναι άραγε πιο γρήγορα;». Γραμματικά δεν αλλάζει τίποτα, στον τόνο αλλάζει τα πάντα.' },
        beispiele:[
          { z:'Ist das denn schneller?', na:{ es:'¿De verdad es más rápido?', en:'Is that actually faster?', el:'Είναι άραγε πιο γρήγορα;' } },
          { z:'Was machst du denn hier?', na:{ es:'¿Y tú qué haces aquí?', en:'What are you doing here, then?', el:'Και τι κάνεις εσύ εδώ;' } }
        ]
      }
    },

    'a2.wegbeschreibung': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du suchst das Museum und gehst gern zu Fuß.', es:'Buscas el museo y te gusta ir a pie.', en:'You\'re looking for the museum and you don\'t mind walking.', el:'Ψάχνεις το μουσείο και δεν σε πειράζει να περπατήσεις.' },
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Suchen Sie etwas?', na:{ es:'¿Busca algo?', en:'Are you looking for something?', el:'Ψάχνετε κάτι;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ja, eine Viertelstunde. Sie können es nicht verfehlen, es ist ein großer Bau.', na:{ es:'Sí, un cuarto de hora. No tiene pérdida, es un edificio grande.', en:'Yes, a quarter of an hour. You can\'t miss it, it\'s a big building.', el:'Ναι, ένα τέταρτο. Δεν μπορείτε να το χάσετε, είναι ένα μεγάλο κτίριο.' } },
      wortschatz: [
        { z:'die Ampel', na:{ es:'el semáforo', en:'the traffic light', el:'το φανάρι' } },
        { z:'überqueren', na:{ es:'cruzar', en:'to cross', el:'διασχίζω' } },
        { z:'der Kreisverkehr', na:{ es:'la rotonda', en:'the roundabout', el:'ο κυκλικός κόμβος' } },
        { z:'gegenüber', na:{ es:'enfrente', en:'opposite', el:'απέναντι' } },
        { z:'eine Viertelstunde', na:{ es:'un cuarto de hora', en:'a quarter of an hour', el:'ένα τέταρτο της ώρας' } },
        { z:'verfehlen', na:{ es:'no encontrar', en:'to miss', el:'χάνω, δεν βρίσκω' } },
        { z:'das Gebäude', na:{ es:'el edificio', en:'the building', el:'το κτίριο' } },
        { z:'der Fußgängerweg', na:{ es:'la acera', en:'the footpath', el:'το πεζοδρόμιο' } },
        { z:'geradeaus', na:{ es:'todo recto', en:'straight ahead', el:'ευθεία' } },
        { z:'abbiegen', na:{ es:'girar', en:'to turn off', el:'στρίβω' } },
        { z:'entlang', na:{ es:'a lo largo de', en:'along', el:'κατά μήκος' } },
        { z:'bis zur', na:{ es:'hasta', en:'as far as', el:'μέχρι το/τη' } }
      ],
      dialog: {
        rolle: { es:'una transeúnte', en:'a passer-by', el:'μια περαστική' },
        zeilen: [
          { wer:'spikiu', z:'Suchen Sie etwas?', na:{ es:'¿Busca algo?', en:'Are you looking for something?', el:'Ψάχνετε κάτι;' } },
          { wer:'lerner', z:'Entschuldigung, wie komme ich von hier zum Museum?', na:{ es:'Perdone, ¿cómo llego al museo desde aquí?', en:'Excuse me, how do I get to the museum from here?', el:'Συγγνώμη, πώς πάω από εδώ στο μουσείο;' } },
          { wer:'spikiu', z:'Gehen Sie bis zur Ampel und überqueren Sie die Straße.', na:{ es:'Siga hasta el semáforo y cruce la calle.', en:'Walk to the traffic light and cross the street.', el:'Πηγαίνετε μέχρι το φανάρι και διασχίστε τον δρόμο.' } },
          { wer:'lerner', z:'Und wie geht es dann weiter?', na:{ es:'¿Y después cómo sigo?', en:'And how do I go on from there?', el:'Και μετά πώς συνεχίζω;' } },
          { wer:'spikiu', z:'Am Kreisverkehr rechts. Es liegt gegenüber vom Park.', na:{ es:'En la rotonda a la derecha. Está enfrente del parque.', en:'Right at the roundabout. It\'s opposite the park.', el:'Στον κυκλικό κόμβο δεξιά. Είναι απέναντι από το πάρκο.' } },
          { wer:'lerner', z:'Kann man zu Fuß hingehen?', na:{ es:'¿Se puede ir a pie?', en:'Can you walk there?', el:'Μπορεί κανείς να πάει με τα πόδια;' } }
        ]
      },
      lesetext: {
        z:'Ein Besucher sucht das Museum. Er soll bis zur Ampel gehen und die Straße überqueren. Danach geht es am Kreisverkehr rechts. Das Museum liegt gegenüber vom Park, eine Viertelstunde zu Fuß.',
        na:{ es:'Un visitante busca el museo. Tiene que ir hasta el semáforo y cruzar la calle. Después, a la derecha en la rotonda. El museo está enfrente del parque, a un cuarto de hora a pie.', en:'A visitor is looking for the museum. He should walk to the traffic light and cross the street. Then right at the roundabout. The museum is opposite the park, a quarter of an hour on foot.', el:'Ένας επισκέπτης ψάχνει το μουσείο. Πρέπει να πάει μέχρι το φανάρι και να διασχίσει τον δρόμο. Μετά δεξιά στον κυκλικό κόμβο. Το μουσείο είναι απέναντι από το πάρκο, ένα τέταρτο με τα πόδια.' },
        frage:{ es:'¿Dónde está el museo?', en:'Where is the museum?', el:'Πού είναι το μουσείο;' },
        optionen:[
          { na:{ es:'Enfrente del parque', en:'Opposite the park', el:'Απέναντι από το πάρκο' }, richtig:true },
          { na:{ es:'Al lado del semáforo', en:'Next to the traffic light', el:'Δίπλα στο φανάρι' }, richtig:false },
          { na:{ es:'En la estación', en:'At the station', el:'Στον σταθμό' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta cómo llegar a la estación y si se puede ir a pie. Dos frases.', en:'Ask the way to the station and whether you can walk there. Two sentences.', el:'Ρώτα τον δρόμο για τον σταθμό και αν μπορείς να πας με τα πόδια. Δύο προτάσεις.' },
        muster:'Wie komme ich von hier zum Bahnhof? Kann man zu Fuß hingehen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'En las indicaciones el alemán encadena palabritas fijas: **bis zur** Ampel, **am** Kreisverkehr, **gegenüber vom** Park. Cada una se aprende entera, como un bloque — buscar la regla detrás cuesta meses y no ayuda a llegar al museo.', en:'German directions run on fixed little chunks: **bis zur** Ampel, **am** Kreisverkehr, **gegenüber vom** Park. Learn each one whole, as a block — hunting for the rule behind them takes months and will not get you to the museum.', el:'Οι γερμανικές οδηγίες δουλεύουν με σταθερά μικρά κομμάτια: **bis zur** Ampel, **am** Kreisverkehr, **gegenüber vom** Park. Μάθε το καθένα ολόκληρο, σαν μπλοκ — αν ψάξεις τον κανόνα πίσω τους, θα σου πάρει μήνες και δεν θα φτάσεις ποτέ στο μουσείο.' },
        beispiele:[
          { z:'bis zur Ampel', na:{ es:'hasta el semáforo', en:'as far as the traffic light', el:'μέχρι το φανάρι' } },
          { z:'gegenüber vom Park', na:{ es:'enfrente del parque', en:'opposite the park', el:'απέναντι από το πάρκο' } }
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
      deineRolle: { de:'Ihr wollt am Samstag an den See. Du hast die Vorhersage noch nicht gesehen.', es:'Queréis ir al lago el sábado. Todavía no has visto la previsión del tiempo.', en:'You want to go to the lake on Saturday. You haven\'t checked the forecast yet.', el:'Θέλεις να πας στη λίμνη το Σάββατο. Δεν έχεις δει ακόμα την πρόγνωση.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gute Idee. Ich hole dich um zwei ab — bis Samstag!', na:{ es:'Buena idea. Te recojo a las dos. ¡Hasta el sábado!', en:'Good idea. I\'ll pick you up at two — see you Saturday!', el:'Καλή ιδέα. Θα σε πάρω στις δύο — τα λέμε το Σάββατο!' } },
      wortschatz: [
        { z:'die Vorhersage', na:{ es:'la previsión del tiempo', en:'the forecast', el:'η πρόγνωση' } },
        { z:'aufklaren', na:{ es:'despejar', en:'to clear up', el:'καθαρίζει (ο καιρός)' } },
        { z:'sonnig', na:{ es:'soleado', en:'sunny', el:'ηλιόλουστος' } },
        { z:'bewölkt', na:{ es:'nublado', en:'cloudy', el:'συννεφιασμένος' } },
        { z:'der Schauer', na:{ es:'el chubasco', en:'the shower', el:'η μπόρα' } },
        { z:'die Jacke', na:{ es:'la chaqueta', en:'the jacket', el:'το μπουφάν' } },
        { z:'sicherheitshalber', na:{ es:'por si acaso', en:'just in case', el:'για σιγουριά' } },
        { z:'abholen', na:{ es:'recoger', en:'to pick up', el:'παίρνω (κάποιον από κάπου)' } },
        { z:'der See', na:{ es:'el lago', en:'the lake', el:'η λίμνη' } },
        { z:'vormittags', na:{ es:'por la mañana', en:'in the morning', el:'το πρωί' } },
        { z:'nachmittags', na:{ es:'por la tarde', en:'in the afternoon', el:'το απόγευμα' } },
        { z:'wohl', na:{ es:'seguramente', en:'probably', el:'μάλλον' } }
      ],
      dialog: {
        rolle: { es:'una amiga', en:'a friend', el:'μια φίλη' },
        zeilen: [
          { wer:'spikiu', z:'Wollen wir am Samstag an den See fahren?', na:{ es:'¿Vamos al lago el sábado?', en:'Shall we go to the lake on Saturday?', el:'Πάμε στη λίμνη το Σάββατο;' } },
          { wer:'lerner', z:'Kommt aufs Wetter an. Hast du die Vorhersage gesehen?', na:{ es:'Depende del tiempo. ¿Has visto la previsión?', en:'Depends on the weather. Have you seen the forecast?', el:'Εξαρτάται από τον καιρό. Είδες την πρόγνωση;' } },
          { wer:'spikiu', z:'Vormittags soll es regnen.', na:{ es:'Dicen que va a llover por la mañana.', en:'They say it\'ll rain in the morning.', el:'Το πρωί λένε ότι θα βρέξει.' } },
          { wer:'lerner', z:'Und am Nachmittag?', na:{ es:'¿Y por la tarde?', en:'And in the afternoon?', el:'Και το απόγευμα;' } },
          { wer:'spikiu', z:'Da klart es wohl auf. Soll sonnig werden.', na:{ es:'Seguramente mejora. Estará despejado.', en:'It should clear up then. Supposed to be sunny.', el:'Τότε μάλλον θα καθαρίσει. Λένε ότι θα έχει ήλιο.' } },
          { wer:'lerner', z:'Dann fahren wir nachmittags. Ich nehme sicherheitshalber eine Jacke mit.', na:{ es:'Entonces vamos por la tarde. Llevo una chaqueta por si acaso.', en:'Then let\'s go in the afternoon. I\'ll bring a jacket just in case.', el:'Τότε πάμε το απόγευμα. Θα πάρω κι ένα μπουφάν για σιγουριά.' } }
        ]
      },
      lesetext: {
        z:'Zwei Freundinnen wollen am Samstag an den See fahren. Vormittags soll es regnen, am Nachmittag klart es wohl auf. Deshalb fahren sie erst nachmittags und nehmen sicherheitshalber eine Jacke mit. Abgeholt wird um zwei.',
        na:{ es:'Dos amigas quieren ir al lago el sábado. Por la mañana dicen que va a llover; por la tarde seguramente despeja. Por eso van por la tarde y se llevan una chaqueta por si acaso. Una pasa a recoger a la otra a las dos.', en:'Two friends want to go to the lake on Saturday. It\'s supposed to rain in the morning; in the afternoon it\'ll probably clear up. So they\'re going in the afternoon and taking a jacket just in case. Pick-up is at two.', el:'Δύο φίλες θέλουν να πάνε στη λίμνη το Σάββατο. Το πρωί λένε ότι θα βρέξει· το απόγευμα μάλλον θα καθαρίσει. Γι\' αυτό θα πάνε το απόγευμα και θα πάρουν ένα μπουφάν για σιγουριά. Η μία θα περάσει να πάρει την άλλη στις δύο.' },
        frage:{ es:'¿Cuándo van?', en:'When are they going?', el:'Πότε θα πάνε;' },
        optionen:[
          { na:{ es:'Por la tarde', en:'In the afternoon', el:'Το απόγευμα' }, richtig:true },
          { na:{ es:'Por la mañana', en:'In the morning', el:'Το πρωί' }, richtig:false },
          { na:{ es:'El domingo', en:'On Sunday', el:'Την Κυριακή' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta por la previsión y propón algo para la tarde. Dos frases.', en:'Ask about the forecast and suggest something for the afternoon. Two sentences.', el:'Ρώτα για την πρόγνωση και πρότεινε κάτι για το απόγευμα. Δύο προτάσεις.' },
        muster:'Hast du die Vorhersage gesehen? Dann fahren wir doch nachmittags.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Para el tiempo el alemán no dice „va a llover" sino **es soll regnen** — literalmente „debe llover", es decir: eso dicen. Y **wohl** marca lo probable: „Da klart es **wohl** auf." Dos palabritas para decir „no lo sé seguro", que es justo lo que pasa con el tiempo.', en:'For weather German does not say "it will rain" but **es soll regnen** — "it is supposed to rain", i.e. that is what they say. And **wohl** marks a guess: "Da klart es **wohl** auf." Two little words for "I am not certain", which is exactly the truth about weather.', el:'Για τον καιρό τα γερμανικά δεν λένε «θα βρέξει» αλλά **es soll regnen** — «λέγεται ότι θα βρέξει», δηλαδή: έτσι λένε. Και το **wohl** δείχνει εικασία: «Da klart es **wohl** auf.» Δύο λεξούλες για το «δεν είμαι σίγουρος», που είναι ακριβώς η αλήθεια για τον καιρό.' },
        beispiele:[
          { z:'Es soll regnen.', na:{ es:'Dicen que va a llover.', en:'It\'s supposed to rain.', el:'Λένε ότι θα βρέξει.' } },
          { z:'Da klart es wohl auf.', na:{ es:'Seguramente despeja.', en:'It should clear up then.', el:'Τότε μάλλον θα καθαρίσει.' } }
        ]
      }
    }

  };

  raum.SpikiuLernpfadDE = {
    zielsprache: 'de',
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
      var mu = muttersprache || 'es';
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
      var mu = muttersprache || 'es';
      return (S.wortschatz || []).map(function (w) {
        return { z: w.z, na: (w.na && (w.na[mu] || w.na.en)) || '' };
      });
    }
  };

})(typeof window !== 'undefined' ? window : globalThis);
