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

  /* b1 = KRONE (16.10.2026), siehe unten „B1 · KRONE“. */
  var STUFEN = ['a1', 'a2', 'b1'];

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

  /* ══════════════════════════════════════════════════════════════════
     B1 · KRONE · «KLANG» (Leo, 16.10.2026: „Aprobado … Dale con todos.“)
     Inês Carvalho, Cellistin aus Porto, nimmt für ihr Album «Klang» die Klänge des deutschsprachigen Raums auf: hotel Hamburg · cafe Berlin · familie Leipzig · einkaufen Dresden · restaurant Köln · wetter Schwarzwald · arzt Zürich · bahnhof München→Salzburg · taxi Salzburg · wegbeschreibung Wien. Hochdeutsch; Regionales (Moin, Grüezi, Servus …) nur als erklärte Farbe.
     Dieselben zehn Themen, neue Handlung, neuer Ort. Keine Politik.
     Neue Felder wie im spanischen B1: rollen (Rollenkarte der Station) und
     kultur (ein Satz zum Ort, „Gut zu wissen“). Roman dazu: learnroman-ines.js „Klang“.
     ══════════════════════════════════════════════════════════════════ */
var K_LP_A = {

  schritt: {
    hotel:      { es:'Hamburgo: una habitación en un piso compartido', en:'Hamburg: a room in a flatshare', el:'Αμβούργο: ένα δωμάτιο σε κοινόχρηστο διαμέρισμα' },
    cafe:       { es:'Berlín: dar tu opinión', en:'Berlin: giving your opinion', el:'Βερολίνο: λες τη γνώμη σου' },
    familie:    { es:'Leipzig: contar recuerdos', en:'Leipzig: telling memories', el:'Λειψία: διηγείσαι αναμνήσεις' },
    einkaufen:  { es:'Dresde: comparar y elegir un regalo', en:'Dresden: comparing and choosing a gift', el:'Δρέσδη: συγκρίνεις και διαλέγεις ένα δώρο' },
    restaurant: { es:'Colonia: en una cervecería tradicional', en:'Cologne: in a traditional brewhouse', el:'Κολωνία: σε μια παραδοσιακή μπιραρία' }
  },

  aufgaben: {
    'b1.hotel': [
      { de:'Bejahe und sag, dass du das Zimmer gern für einen Monat hättest, ab heute, wenn das geht', es:'Di que sí y que te gustaría tener la habitación un mes, a partir de hoy, si puede ser', en:'Say yes, and that you would like the room for a month, from today if possible', el:'Πες ναι, και ότι θα ήθελες το δωμάτιο για έναν μήνα, από σήμερα, αν γίνεται' },
      { de:'Sag, dass das passt, frag, ob du hier Cello üben könntest, und sag, dass du hoffst, dass es nicht stört', es:'Di que te va bien, pregunta si podrías practicar el violonchelo aquí y di que esperas que no moleste', en:'Say that works, ask whether you could practise the cello here, and say you hope it won’t disturb anyone', el:'Πες ότι σου κάνει, ρώτα αν θα μπορούσες να κάνεις πρόβα με το τσέλο εδώ και πες ότι ελπίζεις να μην ενοχλεί' },
      { de:'Bedanke dich und sag, dass du es toll findest, dass man hier die Schiffe im Hafen hört', es:'Da las gracias y di que te encanta que desde aquí se oigan los barcos del puerto', en:'Say thanks and that you love being able to hear the ships in the harbour from here', el:'Ευχαρίστησε και πες ότι σου αρέσει πολύ που ακούγονται από εδώ τα πλοία στο λιμάνι' }
    ],
    'b1.cafe': [
      { de:'Sag, dass du Berlin spannend findest, aber glaubst, dass die Leute hier sehr direkt sind', es:'Di que Berlín te parece emocionante, pero que crees que la gente aquí es muy directa', en:'Say you find Berlin exciting, but you think people here are very direct', el:'Πες ότι το Βερολίνο σού φαίνεται συναρπαστικό, αλλά πιστεύεις ότι οι άνθρωποι εδώ είναι πολύ ευθείς' },
      { de:'Sag, dass das deiner Meinung nach sogar gut ist: Man weiß immer, woran man ist', es:'Di que, en tu opinión, eso hasta es bueno: uno siempre sabe a qué atenerse', en:'Say that in your opinion that is actually good: you always know where you stand', el:'Πες ότι κατά τη γνώμη σου αυτό είναι μάλιστα καλό: ξέρεις πάντα πού βρίσκεσαι' },
      { de:'Sag, dass du Klänge für ein Album aufnimmst und findest, dass die U-Bahn hier wunderbar klingt', es:'Di que grabas sonidos para un álbum y que te parece que el metro aquí suena de maravilla', en:'Say you are recording sounds for an album and you think the underground here sounds wonderful', el:'Πες ότι ηχογραφείς ήχους για ένα άλμπουμ και ότι βρίσκεις πως το μετρό εδώ ακούγεται υπέροχα' }
    ],
    'b1.familie': [
      { de:'Bejahe und erzähle, dass du mit sieben dein erstes Cello bekamst und es fast größer war als du', es:'Di que sí y cuenta que a los siete años te regalaron tu primer violonchelo y que era casi más grande que tú', en:'Say yes and tell him you got your first cello at seven and it was almost bigger than you', el:'Πες ναι και διηγήσου ότι στα επτά πήρες το πρώτο σου τσέλο και ότι ήταν σχεδόν μεγαλύτερο από σένα' },
      { de:'Verneine: Es war Avó Lurdes, deine Oma — sie sang immer Fado, wenn sie kochte', es:'Di que no: fue Avó Lurdes, tu abuela, que siempre cantaba fado cuando cocinaba', en:'Say no: it was Avó Lurdes, your grandmother — she always sang fado when she cooked', el:'Πες όχι: ήταν η Αβό Λούρδες, η γιαγιά σου — τραγουδούσε πάντα φάντο όταν μαγείρευε' },
      { de:'Bejahe, sag, dass sie jetzt sechsundachtzig ist und du ihr gestern eine Postkarte geschickt hast', es:'Di que sí, que ahora tiene ochenta y seis años y que ayer le mandaste una postal', en:'Say yes, that she is eighty-six now and you sent her a postcard yesterday', el:'Πες ναι, ότι τώρα είναι ογδόντα έξι και ότι χθες της έστειλες μια κάρτα' }
    ],
    'b1.einkaufen': [
      { de:'Sag, dass du ein Geschenk für deine Oma suchst, und frag, wie man diese kleinen Holzfiguren macht', es:'Di que buscas un regalo para tu abuela y pregunta cómo se hacen estas figuritas de madera', en:'Say you are looking for a present for your grandmother and ask how these little wooden figures are made', el:'Πες ότι ψάχνεις ένα δώρο για τη γιαγιά σου και ρώτα πώς φτιάχνονται αυτά τα μικρά ξύλινα αγαλματάκια' },
      { de:'Sag, dass er wunderschön, aber leider zu teuer ist, und frag nach etwas Kleinerem und Günstigerem', es:'Di que es precioso pero demasiado caro, y pregunta si tiene algo más pequeño y más barato', en:'Say it is beautiful but too expensive, and ask for something smaller and cheaper', el:'Πες ότι είναι πανέμορφο αλλά δυστυχώς πολύ ακριβό, και ζήτα κάτι πιο μικρό και πιο φτηνό' },
      { de:'Nimm ihn, sag, dass er der schönste von allen ist, und frag, ob er ihn einpacken kann', es:'Di que te lo llevas, que es el más bonito de todos, y pregunta si te lo puede envolver', en:'Say you will take it, that it is the most beautiful of all, and ask whether he can wrap it', el:'Πες ότι τον παίρνεις, ότι είναι ο πιο όμορφος απ’ όλους, και ρώτα αν μπορεί να σ’ τον τυλίξει' }
    ],
    'b1.restaurant': [
      { de:'Verneine, sag, dass ihr fünf seid, und frag nach einem Tisch, der frei ist', es:'Di que no, que sois cinco, y pregunta si hay una mesa que esté libre', en:'Say no, that there are five of you, and ask for a table that is free', el:'Πες όχι, ότι είστε πέντε, και ρώτα αν υπάρχει ένα τραπέζι που είναι ελεύθερο' },
      { de:'Bejahe und frag, was ein Halve Hahn ist — ob das ein Hähnchen ist, das man halbiert', es:'Di que sí y pregunta qué es un «Halve Hahn»: si es un pollo que se parte por la mitad', en:'Say yes and ask what a “Halve Hahn” is — whether it is a chicken that is cut in half', el:'Πες ναι και ρώτα τι είναι το «Halve Hahn» — αν είναι ένα κοτόπουλο που το κόβουν στη μέση' },
      { de:'Bestelle fünf Halve Hahn und frag, wie du ihm sagst, dass du kein Kölsch mehr möchtest', es:'Pide cinco «Halve Hahn» y pregunta cómo le dices que ya no quieres más Kölsch', en:'Order five “Halve Hahn” and ask how you tell him you don’t want any more Kölsch', el:'Παράγγειλε πέντε «Halve Hahn» και ρώτα πώς του λες ότι δεν θέλεις άλλη Kölsch' }
    ]
  },

  stationen: {

    /* ── B1 · Hamburg-Ottensen — ein WG-Zimmer zur Untermiete ──────── */
    'b1.hotel': {
      duzen: true,
      deineRolle: { de:'Du bist Inês, Cellistin aus Porto, und nimmst Klänge für dein Album auf. In Hamburg-Ottensen möchtest du ab heute für einen Monat ein WG-Zimmer zur Untermiete. Du willst dort auch Cello üben.', es:'Eres Inês, violonchelista de Oporto, y grabas sonidos para tu álbum. En Hamburgo-Ottensen quieres subalquilar una habitación en un piso compartido durante un mes, a partir de hoy. También quieres practicar allí con el violonchelo.', en:'You are Inês, a cellist from Porto, recording sounds for your album. In Hamburg-Ottensen you want to sublet a room in a flatshare for one month, starting today. You also want to practise the cello there.', el:'Είσαι η Ινές, τσελίστρια από το Πόρτο, και ηχογραφείς ήχους για το άλμπουμ σου. Στο Αμβούργο-Ότενσεν θέλεις να νοικιάσεις για έναν μήνα ένα δωμάτιο σε κοινόχρηστο διαμέρισμα, από σήμερα. Θέλεις επίσης να κάνεις εκεί πρόβα με το τσέλο.' },
      abrundung: { z:'Na klar, das Tuten der Schiffe gehört zu Ottensen. Willkommen in der WG — Tee steht in der Küche.', na:{ es:'¡Claro! El sonido de los barcos es parte de Ottensen. Bienvenida al piso: hay té en la cocina.', en:'Of course — the ships’ horns are part of Ottensen. Welcome to the flatshare; there’s tea in the kitchen.', el:'Φυσικά, οι σφυρίχτρες των πλοίων ανήκουν στο Ότενσεν. Καλώς ήρθες στο σπίτι — έχει τσάι στην κουζίνα.' } },
      rollen: {
        spikiu: { de:'Jonte, der Hauptmieter der WG', es:'Jonte, el inquilino principal del piso compartido', en:'Jonte, the main tenant of the flatshare', el:'ο Γιόντε, ο κύριος ενοικιαστής του κοινόχρηστου διαμερίσματος' },
        lerner: { de:'die Cellistin auf Zimmersuche', es:'la violonchelista que busca habitación', en:'the cellist looking for a room', el:'η τσελίστρια που ψάχνει δωμάτιο' },
        ort:    { de:'in einer Altbau-WG in Ottensen, nah an der Elbe', es:'en un piso antiguo compartido en Ottensen, cerca del Elba', en:'in an old flatshare in Ottensen, near the Elbe', el:'σε ένα παλιό κοινόχρηστο διαμέρισμα στο Ότενσεν, κοντά στον Έλβα' }
      },
      wortschatz: [
        { z:'die Untermiete',     na:{ es:'el subalquiler', en:'the sublet', el:'η υπενοικίαση' } },
        { z:'die WG (Wohngemeinschaft)', na:{ es:'el piso compartido', en:'the flatshare', el:'το κοινόχρηστο διαμέρισμα' } },
        { z:'der Mitbewohner',    na:{ es:'el compañero de piso', en:'the flatmate', el:'ο συγκάτοικος' } },
        { z:'die Warmmiete',      na:{ es:'el alquiler con gastos incluidos', en:'the rent including bills', el:'το ενοίκιο μαζί με τα κοινόχρηστα' } },
        { z:'die Nebenkosten',    na:{ es:'los gastos (agua, luz, calefacción)', en:'the bills (water, power, heating)', el:'τα κοινόχρηστα και οι λογαριασμοί' } },
        { z:'die Kaution',        na:{ es:'la fianza', en:'the deposit', el:'η εγγύηση' } },
        { z:'der Schlüssel',      na:{ es:'la llave', en:'the key', el:'το κλειδί' } },
        { z:'einziehen',          na:{ es:'mudarse (a un piso)', en:'to move in', el:'μετακομίζω (σε σπίτι)' } },
        { z:'ich hätte gern …',   na:{ es:'me gustaría tener …', en:'I’d like to have …', el:'θα ήθελα …' } },
        { z:'könnte ich …?',      na:{ es:'¿podría …?', en:'could I …?', el:'θα μπορούσα να …;' } },
        { z:'stören',             na:{ es:'molestar', en:'to disturb', el:'ενοχλώ' } },
        { z:'Moin! (Hamburg)',    na:{ es:'¡Hola! (en el norte, a cualquier hora)', en:'Hi! (northern Germany, any time of day)', el:'Γεια! (στον Βορρά, όλη τη μέρα)' } }
      ],
      dialog: {
        rolle: { es:'Jonte, el inquilino principal', en:'Jonte, the main tenant', el:'Ο Γιόντε, ο κύριος ενοικιαστής' },
        zeilen: [
          { wer:'spikiu', z:'Moin! Du bist Inês, oder? Komm rein, das ist das Zimmer. Wie lange brauchst du es?', na:{ es:'¡Hola! Eres Inês, ¿verdad? Pasa, esta es la habitación. ¿Cuánto tiempo la necesitas?', en:'Hi! You’re Inês, right? Come in, this is the room. How long do you need it for?', el:'Γεια! Εσύ είσαι η Ινές, έτσι; Πέρνα, αυτό είναι το δωμάτιο. Για πόσο καιρό το χρειάζεσαι;' } },
          { wer:'lerner', z:'Ja, genau, moin! Ich hätte das Zimmer gern für einen Monat, ab heute, wenn das geht.', na:{ es:'Sí, exacto, ¡hola! Me gustaría tener la habitación un mes, a partir de hoy, si puede ser.', en:'Yes, that’s right — hi! I’d like the room for one month, starting today, if that’s possible.', el:'Ναι, ακριβώς, γεια! Θα ήθελα το δωμάτιο για έναν μήνα, από σήμερα, αν γίνεται.' } },
          { wer:'spikiu', z:'Kein Problem. Die Warmmiete ist 520 Euro, also mit Nebenkosten. Dazu kommen 300 Euro Kaution.', na:{ es:'Sin problema. El alquiler son 520 euros con gastos incluidos. Además, 300 euros de fianza.', en:'No problem. The rent is 520 euros including bills. On top of that there’s a 300-euro deposit.', el:'Κανένα πρόβλημα. Το ενοίκιο είναι 520 ευρώ μαζί με τους λογαριασμούς. Επιπλέον 300 ευρώ εγγύηση.' } },
          { wer:'lerner', z:'Das passt. Könnte ich hier auch Cello üben? Ich hoffe, dass es nicht stört.', na:{ es:'Me va bien. ¿Podría practicar aquí también con el violonchelo? Espero que no moleste.', en:'That works. Could I practise the cello here too? I hope it won’t disturb anyone.', el:'Μου κάνει. Θα μπορούσα να κάνω εδώ και πρόβα με το τσέλο; Ελπίζω να μην ενοχλεί.' } },
          { wer:'spikiu', z:'Unsere Nachbarin spielt Trompete, die freut sich bestimmt. Hier ist dein Schlüssel.', na:{ es:'Nuestra vecina toca la trompeta; seguro que se alegra. Aquí tienes tu llave.', en:'Our neighbour plays the trumpet — she’ll be delighted. Here’s your key.', el:'Η γειτόνισσά μας παίζει τρομπέτα — σίγουρα θα χαρεί. Ορίστε το κλειδί σου.' } },
          { wer:'lerner', z:'Danke! Ich finde es toll, dass man von hier die Schiffe im Hafen hört.', na:{ es:'¡Gracias! Me encanta que desde aquí se oigan los barcos del puerto.', en:'Thanks! I love that you can hear the ships in the harbour from here.', el:'Ευχαριστώ! Μου αρέσει πολύ που από εδώ ακούγονται τα πλοία στο λιμάνι.' } }
        ]
      },
      lesetext: {
        z:'Heute habe ich in Ottensen mein Zimmer bekommen. Jonte sagt zu allem „Moin“ — am Morgen, am Mittag und sogar um acht Uhr abends. Ich habe es in mein Heft geschrieben: Wort des Ortes. Mein erster Klang für das Album: die Schiffshörner im Hafen, ganz tief, fast wie Dona Amália.',
        na:{ es:'Hoy me han dado la habitación en Ottensen. Jonte dice «Moin» a todo: por la mañana, al mediodía y hasta a las ocho de la tarde. Lo he apuntado en mi cuaderno: la palabra del lugar. Mi primer sonido para el álbum: las sirenas de los barcos del puerto, muy graves, casi como Dona Amália.',
             en:'Today I got my room in Ottensen. Jonte says “Moin” to everything — in the morning, at midday and even at eight in the evening. I wrote it in my notebook: word of the place. My first sound for the album: the ships’ horns in the harbour, very deep, almost like Dona Amália.',
             el:'Σήμερα πήρα το δωμάτιό μου στο Ότενσεν. Ο Γιόντε λέει «Moin» σε όλα — το πρωί, το μεσημέρι, ακόμα και στις οχτώ το βράδυ. Το έγραψα στο τετράδιό μου: η λέξη του τόπου. Ο πρώτος μου ήχος για το άλμπουμ: οι σφυρίχτρες των πλοίων στο λιμάνι, πολύ βαθιές, σχεδόν σαν την Ντόνα Αμάλια.' },
        frage:{ es:'¿Cuándo dice Jonte «Moin»?', en:'When does Jonte say “Moin”?', el:'Πότε λέει ο Γιόντε «Moin»;' },
        optionen:[
          { na:{ es:'A cualquier hora del día', en:'At any time of day', el:'Όποια ώρα της μέρας' }, richtig:true  },
          { na:{ es:'Solo por la mañana', en:'Only in the morning', el:'Μόνο το πρωί' }, richtig:false },
          { na:{ es:'Solo por teléfono', en:'Only on the phone', el:'Μόνο στο τηλέφωνο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Escribe a un piso compartido: te gustaría la habitación a partir del 1 de noviembre y preguntas si podrías llevar tu bicicleta. Dos frases.', en:'Write to a flatshare: you would like the room from 1 November and ask whether you could bring your bike. Two sentences.', el:'Γράψε σε ένα κοινόχρηστο διαμέρισμα: θα ήθελες το δωμάτιο από την 1η Νοεμβρίου και ρωτάς αν θα μπορούσες να φέρεις το ποδήλατό σου. Δύο προτάσεις.' },
        muster:'Ich hätte das Zimmer gern ab dem 1. November. Könnte ich auch mein Fahrrad mitbringen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'„Ich hätte gern“ y „Könnte ich …?“ son las formas educadas: piden sin exigir, como „me gustaría“ y „¿podría?“. Y después de „dass“ el verbo se va al final: Ich hoffe, dass es nicht stört. Ich finde es toll, dass man die Schiffe hört.',
               en:'“Ich hätte gern” and “Könnte ich …?” are the polite forms: they ask without demanding, like “I’d like” and “could I”. And after “dass” the verb moves to the very end: Ich hoffe, dass es nicht stört. Ich finde es toll, dass man die Schiffe hört.',
               el:'Το «Ich hätte gern» και το «Könnte ich …?» είναι οι ευγενικοί τύποι: ζητάς χωρίς να απαιτείς, όπως το «θα ήθελα» και το «θα μπορούσα;». Και μετά το «dass» το ρήμα πάει στο τέλος: Ich hoffe, dass es nicht stört. Ich finde es toll, dass man die Schiffe hört.' },
        beispiele:[
          { z:'Ich hätte das Zimmer gern für einen Monat.', na:{ es:'Me gustaría tener la habitación un mes.', en:'I’d like the room for a month.', el:'Θα ήθελα το δωμάτιο για έναν μήνα.' } },
          { z:'Ich hoffe, dass es nicht stört.',            na:{ es:'Espero que no moleste.', en:'I hope it won’t disturb anyone.', el:'Ελπίζω να μην ενοχλεί.' } }
        ]
      },
      kultur:{ es:'En Hamburgo se dice «Moin» a cualquier hora, también por la noche. Un hamburgués de verdad dice un solo «Moin»: «Moin moin» ya se considera hablar demasiado. Desde las orillas del Elba se oyen todo el día las sirenas de los grandes barcos que entran en el puerto.',
               en:'In Hamburg people say “Moin” at any time of day, even at night. A true Hamburger says just one “Moin” — “Moin moin” already counts as chatty. All day long, from the banks of the Elbe, you can hear the horns of the big ships coming into the harbour.',
               el:'Στο Αμβούργο λένε «Moin» όποια ώρα κι αν είναι, ακόμα και τη νύχτα. Ένας γνήσιος Αμβουργιανός λέει ένα μόνο «Moin» — το «Moin moin» θεωρείται ήδη φλυαρία. Όλη τη μέρα, από τις όχθες του Έλβα, ακούς τις σφυρίχτρες των μεγάλων πλοίων που μπαίνουν στο λιμάνι.' }
    },

    /* ── B1 · Berlin-Kreuzberg — Meinungen im Café ─────────────────── */
    'b1.cafe': {
      deineRolle: { de:'Du sitzt in einem Café in Kreuzberg. Du findest Berlin spannend, aber die Leute sehr direkt — was du eigentlich gut findest. Du nimmst Klänge für dein Album auf und liebst den Klang der U-Bahn.', es:'Estás en una cafetería de Kreuzberg. Berlín te parece emocionante, pero la gente muy directa, cosa que en el fondo te gusta. Grabas sonidos para tu álbum y te encanta cómo suena el metro.', en:'You are sitting in a café in Kreuzberg. You find Berlin exciting but the people very direct — which you actually like. You are recording sounds for your album and love the sound of the underground.', el:'Κάθεσαι σε ένα καφέ στο Κρόιτσμπεργκ. Το Βερολίνο σού φαίνεται συναρπαστικό, αλλά οι άνθρωποι πολύ ευθείς — κάτι που στην ουσία σού αρέσει. Ηχογραφείς ήχους για το άλμπουμ σου και λατρεύεις τον ήχο του μετρό.' },
      abrundung: { z:'Die U-Bahn? Dann gehen Sie mal zum Görlitzer Bahnhof. Da spielt oft einer Trompete, zwischen den Zügen.', na:{ es:'¿El metro? Pues vaya a la estación de Görlitzer Bahnhof. Allí suele tocar alguien la trompeta, entre tren y tren.', en:'The underground? Then go to Görlitzer Bahnhof. Someone often plays the trumpet there, between the trains.', el:'Το μετρό; Τότε πηγαίνετε στον σταθμό Γκέρλιτσερ Μπάνχοφ. Εκεί παίζει συχνά κάποιος τρομπέτα, ανάμεσα στα τρένα.' } },
      rollen: {
        spikiu: { de:'Frau Kowalski, Stammgast und frühere Souffleuse an der Oper', es:'la señora Kowalski, clienta habitual y antigua apuntadora de la ópera', en:'Frau Kowalski, a regular and retired opera prompter', el:'η κυρία Κοβάλσκι, τακτική πελάτισσα και πρώην υποβολέας στην όπερα' },
        lerner: { de:'die Musikerin am Nebentisch', es:'la música de la mesa de al lado', en:'the musician at the next table', el:'η μουσικός στο διπλανό τραπέζι' },
        ort:    { de:'in einem kleinen Café in Kreuzberg', es:'en una pequeña cafetería de Kreuzberg', en:'in a small café in Kreuzberg', el:'σε ένα μικρό καφέ στο Κρόιτσμπεργκ' }
      },
      wortschatz: [
        { z:'ich finde, dass …',  na:{ es:'me parece que …', en:'I find that …', el:'βρίσκω ότι …' } },
        { z:'ich glaube, dass …', na:{ es:'creo que …', en:'I think that …', el:'πιστεύω ότι …' } },
        { z:'meiner Meinung nach', na:{ es:'en mi opinión', en:'in my opinion', el:'κατά τη γνώμη μου' } },
        { z:'spannend',           na:{ es:'emocionante, interesante', en:'exciting', el:'συναρπαστικός' } },
        { z:'direkt',             na:{ es:'directo', en:'direct, blunt', el:'ευθύς' } },
        { z:'die Berliner Schnauze', na:{ es:'el desparpajo berlinés', en:'Berlin bluntness', el:'η βερολινέζικη ευθύτητα' } },
        { z:'der Stammgast',      na:{ es:'el cliente habitual', en:'the regular', el:'ο τακτικός πελάτης' } },
        { z:'die Souffleuse',     na:{ es:'la apuntadora (teatro)', en:'the prompter (theatre)', el:'η υποβολέας (θέατρο)' } },
        { z:'aufnehmen',          na:{ es:'grabar', en:'to record', el:'ηχογραφώ' } },
        { z:'klingen',            na:{ es:'sonar', en:'to sound', el:'ακούγομαι, ηχώ' } },
        { z:'der Kiez',           na:{ es:'el barrio (Berlín)', en:'the neighbourhood (Berlin)', el:'η γειτονιά (Βερολίνο)' } },
        { z:'…, wa? (Berlin)',    na:{ es:'…, ¿verdad?', en:'…, right?', el:'…, έτσι;' } }
      ],
      dialog: {
        rolle: { es:'La señora Kowalski, clienta habitual', en:'Frau Kowalski, a regular', el:'Η κυρία Κοβάλσκι, τακτική πελάτισσα' },
        zeilen: [
          { wer:'spikiu', z:'Sie sind nicht von hier, wa? Na, wie gefällt Ihnen denn unser Berlin?', na:{ es:'Usted no es de aquí, ¿verdad? A ver, ¿qué le parece nuestro Berlín?', en:'You’re not from here, right? So, how do you like our Berlin?', el:'Δεν είστε από εδώ, έτσι; Λοιπόν, πώς σας φαίνεται το Βερολίνο μας;' } },
          { wer:'lerner', z:'Ich finde Berlin spannend, aber ich glaube, dass die Leute hier sehr direkt sind.', na:{ es:'Berlín me parece emocionante, pero creo que la gente aquí es muy directa.', en:'I find Berlin exciting, but I think the people here are very direct.', el:'Το Βερολίνο μού φαίνεται συναρπαστικό, αλλά πιστεύω ότι οι άνθρωποι εδώ είναι πολύ ευθείς.' } },
          { wer:'spikiu', z:'Direkt? Das ist die Berliner Schnauze, Kindchen. Wir meinen es nicht böse.', na:{ es:'¿Directa? Eso es el desparpajo berlinés, hija. No lo decimos con mala intención.', en:'Direct? That’s Berlin bluntness, dear. We don’t mean any harm.', el:'Ευθείς; Αυτή είναι η βερολινέζικη ευθύτητα, κορίτσι μου. Δεν το λέμε με κακία.' } },
          { wer:'lerner', z:'Meiner Meinung nach ist das sogar gut. Man weiß immer, woran man ist.', na:{ es:'En mi opinión, eso hasta es bueno. Uno siempre sabe a qué atenerse.', en:'In my opinion that’s actually good. You always know where you stand.', el:'Κατά τη γνώμη μου αυτό είναι μάλιστα καλό. Ξέρεις πάντα πού βρίσκεσαι.' } },
          { wer:'spikiu', z:'Sehr richtig! Ich war achtunddreißig Jahre Souffleuse an der Oper. Und was machen Sie hier?', na:{ es:'¡Muy bien dicho! Yo fui apuntadora en la ópera treinta y ocho años. ¿Y usted qué hace aquí?', en:'Quite right! I was a prompter at the opera for thirty-eight years. And what are you doing here?', el:'Πολύ σωστά! Ήμουν τριάντα οχτώ χρόνια υποβολέας στην όπερα. Κι εσείς τι κάνετε εδώ;' } },
          { wer:'lerner', z:'Ich nehme Klänge für ein Album auf. Ich finde, dass die U-Bahn hier wunderbar klingt.', na:{ es:'Grabo sonidos para un álbum. Me parece que el metro aquí suena de maravilla.', en:'I’m recording sounds for an album. I think the underground here sounds wonderful.', el:'Ηχογραφώ ήχους για ένα άλμπουμ. Βρίσκω ότι το μετρό εδώ ακούγεται υπέροχα.' } }
        ]
      },
      lesetext: {
        z:'Frau Kowalski sitzt jeden Morgen am selben Tisch und bestellt einen „Pott Kaffee“. Früher hat sie in der Oper den Sängern den Text zugeflüstert. „Ich war die Einzige, die im Theater flüstern durfte“, sagt sie und lacht. Heute habe ich am Görlitzer Bahnhof die U-Bahn und einen Trompeter aufgenommen. Wort des Ortes: „Schrippe“ — so heißt in Berlin ein Brötchen.',
        na:{ es:'La señora Kowalski se sienta cada mañana en la misma mesa y pide un «Pott Kaffee», un tazón de café. Antes, en la ópera, les susurraba el texto a los cantantes. «Era la única que podía susurrar en el teatro», dice, y se ríe. Hoy he grabado el metro y a un trompetista en Görlitzer Bahnhof. La palabra del lugar: «Schrippe», así se llama en Berlín un panecillo.',
             en:'Frau Kowalski sits at the same table every morning and orders a “Pott Kaffee”, a big mug of coffee. She used to whisper the words to the singers at the opera. “I was the only one allowed to whisper in the theatre,” she says, laughing. Today I recorded the U-Bahn and a trumpet player at Görlitzer Bahnhof. Word of the place: “Schrippe” — that’s what a bread roll is called in Berlin.',
             el:'Η κυρία Κοβάλσκι κάθεται κάθε πρωί στο ίδιο τραπέζι και παραγγέλνει ένα «Pott Kaffee», μια μεγάλη κούπα καφέ. Παλιά ψιθύριζε στην όπερα το κείμενο στους τραγουδιστές. «Ήμουν η μόνη που επιτρεπόταν να ψιθυρίζει στο θέατρο», λέει και γελάει. Σήμερα ηχογράφησα το μετρό κι έναν τρομπετίστα στο Γκέρλιτσερ Μπάνχοφ. Η λέξη του τόπου: «Schrippe» — έτσι λένε στο Βερολίνο το ψωμάκι.' },
        frage:{ es:'¿Qué hacía antes la señora Kowalski en la ópera?', en:'What did Frau Kowalski use to do at the opera?', el:'Τι έκανε παλιά η κυρία Κοβάλσκι στην όπερα;' },
        optionen:[
          { na:{ es:'Susurraba el texto a los cantantes', en:'She whispered the words to the singers', el:'Ψιθύριζε το κείμενο στους τραγουδιστές' }, richtig:true  },
          { na:{ es:'Cantaba en el coro', en:'She sang in the choir', el:'Τραγουδούσε στη χορωδία' }, richtig:false },
          { na:{ es:'Vendía las entradas', en:'She sold the tickets', el:'Πουλούσε τα εισιτήρια' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Da tu opinión sobre tu ciudad: algo que te gusta y algo que no. Usa «ich finde, dass …» y «meiner Meinung nach». Dos frases.', en:'Give your opinion about your town: one thing you like and one you don’t. Use “ich finde, dass …” and “meiner Meinung nach”. Two sentences.', el:'Πες τη γνώμη σου για την πόλη σου: κάτι που σου αρέσει και κάτι που δεν σου αρέσει. Χρησιμοποίησε το «ich finde, dass …» και το «meiner Meinung nach». Δύο προτάσεις.' },
        muster:'Ich finde, dass die Leute in meiner Stadt sehr freundlich sind. Meiner Meinung nach gibt es aber zu viele Autos.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Con „ich finde, dass …“ y „ich glaube, dass …“ el verbo va al final: …, dass die Leute direkt sind. Con „meiner Meinung nach“ pasa otra cosa: ocupa el primer lugar y el verbo viene justo después — Meiner Meinung nach ist das gut. Dos caminos para la misma opinión.',
               en:'With “ich finde, dass …” and “ich glaube, dass …” the verb goes to the end: …, dass die Leute direkt sind. “Meiner Meinung nach” works differently: it takes first place and the verb comes right after — Meiner Meinung nach ist das gut. Two roads to the same opinion.',
               el:'Με το «ich finde, dass …» και το «ich glaube, dass …» το ρήμα πάει στο τέλος: …, dass die Leute direkt sind. Το «meiner Meinung nach» δουλεύει αλλιώς: πιάνει την πρώτη θέση και το ρήμα έρχεται αμέσως μετά — Meiner Meinung nach ist das gut. Δύο δρόμοι για την ίδια γνώμη.' },
        beispiele:[
          { z:'Ich glaube, dass die Leute hier sehr direkt sind.', na:{ es:'Creo que la gente aquí es muy directa.', en:'I think the people here are very direct.', el:'Πιστεύω ότι οι άνθρωποι εδώ είναι πολύ ευθείς.' } },
          { z:'Meiner Meinung nach ist das sogar gut.',           na:{ es:'En mi opinión, eso hasta es bueno.', en:'In my opinion that’s actually good.', el:'Κατά τη γνώμη μου αυτό είναι μάλιστα καλό.' } }
        ]
      },
      kultur:{ es:'La «Berliner Schnauze» es la forma berlinesa de hablar: directa, seca y con mucho humor, sin mala intención. En Kreuzberg la línea U1 va por encima de la calle, sobre un viaducto de hierro, y en las estaciones casi siempre toca algún músico.',
               en:'The “Berliner Schnauze” is the Berlin way of talking: direct, dry and full of humour, with no harm meant. In Kreuzberg the U1 line runs above the street on an iron viaduct, and there is nearly always a musician playing at the stations.',
               el:'Η «Berliner Schnauze» είναι ο βερολινέζικος τρόπος να μιλάς: ευθύς, στεγνός και γεμάτος χιούμορ, χωρίς κακία. Στο Κρόιτσμπεργκ η γραμμή U1 περνάει πάνω από τον δρόμο, σε μια σιδερένια γέφυρα, και στους σταθμούς σχεδόν πάντα παίζει κάποιος μουσικός.' }
    },

    /* ── B1 · Leipzig — Advent bei Familie Schubert ────────────────── */
    'b1.familie': {
      duzen: true,
      deineRolle: { de:'Du wohnst im Advent bei Familie Schubert in Leipzig. Dein erstes Cello hast du mit sieben bekommen — es war fast größer als du. Zur Musik gebracht hat dich Avó Lurdes, deine Oma: Sie sang immer Fado beim Kochen. Sie ist jetzt sechsundachtzig; gestern hast du ihr eine Postkarte geschickt.', es:'En Adviento vives con la familia Schubert en Leipzig. Tu primer violonchelo te lo regalaron a los siete años: era casi más grande que tú. Quien te llevó a la música fue Avó Lurdes, tu abuela: siempre cantaba fado mientras cocinaba. Ahora tiene ochenta y seis años; ayer le mandaste una postal.', en:'During Advent you are staying with the Schubert family in Leipzig. You got your first cello at seven — it was almost bigger than you. Avó Lurdes, your grandmother, brought you to music: she always sang fado while cooking. She is eighty-six now; yesterday you sent her a postcard.', el:'Τις μέρες πριν από τα Χριστούγεννα μένεις με την οικογένεια Σούμπερτ στη Λειψία. Το πρώτο σου τσέλο το πήρες στα επτά — ήταν σχεδόν μεγαλύτερο από σένα. Στη μουσική σε έφερε η Αβό Λούρδες, η γιαγιά σου: τραγουδούσε πάντα φάντο όταν μαγείρευε. Τώρα είναι ογδόντα έξι· χθες της έστειλες μια κάρτα.' },
      abrundung: { z:'Dann schreib ihr, dass ein alter Thomaner sie grüßt. Und jetzt gibt es Leipziger Lerchen!', na:{ es:'Pues escríbele que un viejo cantor de Santo Tomás la saluda. ¡Y ahora, «Leipziger Lerchen»!', en:'Then write and tell her an old Thomaner sends his greetings. And now it’s time for Leipziger Lerchen!', el:'Τότε γράψε της ότι τη χαιρετάει ένας παλιός χορωδός του Αγίου Θωμά. Και τώρα έχει «Leipziger Lerchen»!' } },
      rollen: {
        spikiu: { de:'Opa Heinz, der Großvater der Gastfamilie', es:'el abuelo Heinz, de la familia de acogida', en:'Grandpa Heinz of the host family', el:'ο παππούς Χάιντς, από την οικογένεια που σε φιλοξενεί' },
        lerner: { de:'der Gast aus Porto', es:'la invitada de Oporto', en:'the guest from Porto', el:'η καλεσμένη από το Πόρτο' },
        ort:    { de:'am Adventskranz im Wohnzimmer der Schuberts', es:'junto a la corona de Adviento, en el salón de los Schubert', en:'by the Advent wreath in the Schuberts’ living room', el:'δίπλα στο χριστουγεννιάτικο στεφάνι, στο σαλόνι των Σούμπερτ' }
      },
      wortschatz: [
        { z:'die Gastfamilie',    na:{ es:'la familia de acogida', en:'the host family', el:'η οικογένεια που σε φιλοξενεί' } },
        { z:'der Thomanerchor',   na:{ es:'el coro de niños de Santo Tomás', en:'the St Thomas Boys Choir', el:'η παιδική χορωδία του Αγίου Θωμά' } },
        { z:'als ich … war',      na:{ es:'cuando yo tenía / era …', en:'when I was …', el:'όταν ήμουν …' } },
        { z:'ich war / ich hatte', na:{ es:'yo era / yo tenía', en:'I was / I had', el:'ήμουν / είχα' } },
        { z:'ich sang (singen)',  na:{ es:'yo cantaba / canté', en:'I sang', el:'τραγουδούσα / τραγούδησα' } },
        { z:'ich bekam (bekommen)', na:{ es:'yo recibí', en:'I got, I received', el:'πήρα, έλαβα' } },
        { z:'ich ging (gehen)',   na:{ es:'yo iba / fui', en:'I went', el:'πήγαινα / πήγα' } },
        { z:'sich erinnern an',   na:{ es:'acordarse de', en:'to remember', el:'θυμάμαι' } },
        { z:'erzählen',           na:{ es:'contar', en:'to tell', el:'διηγούμαι' } },
        { z:'der Advent',         na:{ es:'el Adviento', en:'Advent', el:'οι εβδομάδες πριν από τα Χριστούγεννα' } },
        { z:'die Postkarte',      na:{ es:'la postal', en:'the postcard', el:'η καρτ ποστάλ' } },
        { z:'die Leipziger Lerche', na:{ es:'pastelito de Leipzig con mazapán', en:'Leipzig marzipan pastry', el:'γλυκό της Λειψίας με αμυγδαλόπαστα' } }
      ],
      dialog: {
        rolle: { es:'El abuelo Heinz', en:'Grandpa Heinz', el:'Ο παππούς Χάιντς' },
        zeilen: [
          { wer:'spikiu', z:'Als Junge sang ich im Thomanerchor, weißt du. Hast du als Kind auch Musik gemacht?', na:{ es:'De niño yo cantaba en el coro de Santo Tomás, ¿sabes? ¿Tú también hacías música de pequeña?', en:'As a boy I sang in the St Thomas choir, you know. Did you make music as a child too?', el:'Όταν ήμουν αγόρι, τραγουδούσα στη χορωδία του Αγίου Θωμά, ξέρεις. Εσύ έκανες κι εσύ μουσική όταν ήσουν παιδί;' } },
          { wer:'lerner', z:'Ja! Als ich sieben war, bekam ich mein erstes Cello. Es war fast größer als ich.', na:{ es:'¡Sí! Cuando tenía siete años me regalaron mi primer violonchelo. Era casi más grande que yo.', en:'Yes! When I was seven, I got my first cello. It was almost bigger than me.', el:'Ναι! Όταν ήμουν επτά, πήρα το πρώτο μου τσέλο. Ήταν σχεδόν μεγαλύτερο από μένα.' } },
          { wer:'spikiu', z:'Herrlich! Und wer hat dich zur Musik gebracht? Deine Eltern?', na:{ es:'¡Qué maravilla! ¿Y quién te llevó a la música? ¿Tus padres?', en:'Wonderful! And who brought you to music? Your parents?', el:'Υπέροχα! Και ποιος σε έφερε στη μουσική; Οι γονείς σου;' } },
          { wer:'lerner', z:'Nein, Avó Lurdes, meine Oma. Sie sang immer Fado, wenn sie kochte.', na:{ es:'No, Avó Lurdes, mi abuela. Siempre cantaba fado cuando cocinaba.', en:'No, Avó Lurdes, my grandmother. She always sang fado when she was cooking.', el:'Όχι, η Αβό Λούρδες, η γιαγιά μου. Τραγουδούσε πάντα φάντο όταν μαγείρευε.' } },
          { wer:'spikiu', z:'Fado! Den kenne ich nur aus dem Radio. Lebt deine Oma noch in Porto?', na:{ es:'¡Fado! Solo lo conozco de la radio. ¿Tu abuela sigue viviendo en Oporto?', en:'Fado! I only know it from the radio. Does your grandmother still live in Porto?', el:'Φάντο! Το ξέρω μόνο από το ραδιόφωνο. Η γιαγιά σου ζει ακόμα στο Πόρτο;' } },
          { wer:'lerner', z:'Ja, sie ist jetzt sechsundachtzig. Gestern habe ich ihr eine Postkarte geschickt.', na:{ es:'Sí, ahora tiene ochenta y seis años. Ayer le mandé una postal.', en:'Yes, she’s eighty-six now. I sent her a postcard yesterday.', el:'Ναι, τώρα είναι ογδόντα έξι. Χθες της έστειλα μια κάρτα.' } }
        ]
      },
      lesetext: {
        z:'Opa Heinz hat mir erzählt: Als Junge sang er im Thomanerchor. Die Jungen wohnten zusammen im Internat und probten jeden Tag. Am Samstag gingen wir in die Thomaskirche. Den Chor durfte ich nicht aufnehmen, aber draußen im Schnee summte Opa Heinz die Melodie weiter — und die habe ich aufgenommen. Wort des Ortes: „Nu“ — so sagt man in Sachsen „ja“.',
        na:{ es:'El abuelo Heinz me ha contado que de niño cantaba en el coro de Santo Tomás. Los chicos vivían juntos en un internado y ensayaban todos los días. El sábado fuimos a la iglesia de Santo Tomás. No me dejaron grabar el coro, pero fuera, en la nieve, el abuelo Heinz siguió tarareando la melodía, y eso sí lo grabé. La palabra del lugar: «Nu», así se dice «sí» en Sajonia.',
             en:'Grandpa Heinz told me that as a boy he sang in the St Thomas choir. The boys lived together in a boarding school and rehearsed every day. On Saturday we went to St Thomas Church. I wasn’t allowed to record the choir, but outside in the snow Grandpa Heinz went on humming the melody — and that I did record. Word of the place: “Nu” — that’s how they say “yes” in Saxony.',
             el:'Ο παππούς Χάιντς μού διηγήθηκε ότι όταν ήταν αγόρι τραγουδούσε στη χορωδία του Αγίου Θωμά. Τα αγόρια έμεναν μαζί σε οικοτροφείο και έκαναν πρόβα κάθε μέρα. Το Σάββατο πήγαμε στην εκκλησία του Αγίου Θωμά. Τη χορωδία δεν μου επέτρεψαν να την ηχογραφήσω, αλλά έξω στο χιόνι ο παππούς Χάιντς συνέχισε να σιγοτραγουδά τη μελωδία — κι αυτή την ηχογράφησα. Η λέξη του τόπου: «Nu» — έτσι λένε το «ναι» στη Σαξονία.' },
        frage:{ es:'¿Dónde vivían los chicos del coro?', en:'Where did the choir boys live?', el:'Πού έμεναν τα αγόρια της χορωδίας;' },
        optionen:[
          { na:{ es:'En un internado', en:'In a boarding school', el:'Σε ένα οικοτροφείο' }, richtig:true  },
          { na:{ es:'En casa del abuelo Heinz', en:'At Grandpa Heinz’s house', el:'Στο σπίτι του παππού Χάιντς' }, richtig:false },
          { na:{ es:'En la iglesia', en:'In the church', el:'Στην εκκλησία' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Cuenta algo de tu infancia: qué te gustaba y qué hacías siempre. Usa el Präteritum (war, hatte, ging …). Dos frases.', en:'Tell something about your childhood: what you liked and what you always did. Use the Präteritum (war, hatte, ging …). Two sentences.', el:'Διηγήσου κάτι από τα παιδικά σου χρόνια: τι σου άρεσε και τι έκανες πάντα. Χρησιμοποίησε το Präteritum (war, hatte, ging …). Δύο προτάσεις.' },
        muster:'Als ich klein war, hatte ich einen Hund. Jeden Sonntag ging ich mit ihm in den Park.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Para contar recuerdos, el alemán usa el Präteritum: war, hatte, sang, ging, bekam. Suena a cuento, a «érase una vez». En la conversación diaria se prefiere el Perfekt (habe geschickt), pero war y hatte se usan casi siempre en Präteritum. Y „als“ + verbo al final abre el recuerdo: Als ich sieben war, …',
               en:'To tell memories, German uses the Präteritum: war, hatte, sang, ging, bekam. It sounds like a story, like “once upon a time”. In everyday talk the Perfekt is preferred (habe geschickt), but war and hatte are almost always Präteritum. And “als” + verb at the end opens the memory: Als ich sieben war, …',
               el:'Για να διηγηθείς αναμνήσεις, τα γερμανικά χρησιμοποιούν το Präteritum: war, hatte, sang, ging, bekam. Ακούγεται σαν ιστορία, σαν «μια φορά κι έναν καιρό». Στην καθημερινή κουβέντα προτιμάται το Perfekt (habe geschickt), αλλά τα war και hatte μπαίνουν σχεδόν πάντα σε Präteritum. Και το «als» + ρήμα στο τέλος ανοίγει την ανάμνηση: Als ich sieben war, …' },
        beispiele:[
          { z:'Als ich sieben war, bekam ich mein erstes Cello.', na:{ es:'Cuando tenía siete años, me regalaron mi primer violonchelo.', en:'When I was seven, I got my first cello.', el:'Όταν ήμουν επτά, πήρα το πρώτο μου τσέλο.' } },
          { z:'Sie sang immer Fado, wenn sie kochte.',            na:{ es:'Siempre cantaba fado cuando cocinaba.', en:'She always sang fado when she cooked.', el:'Τραγουδούσε πάντα φάντο όταν μαγείρευε.' } }
        ]
      },
      kultur:{ es:'El coro de Santo Tomás de Leipzig existe desde 1212 y es uno de los coros de niños más antiguos del mundo. Johann Sebastian Bach fue su director durante 27 años. En Adviento, el coro canta su Oratorio de Navidad, y la iglesia se llena hasta el último banco.',
               en:'Leipzig’s St Thomas Boys Choir has existed since 1212 and is one of the oldest boys’ choirs in the world. Johann Sebastian Bach was its director for 27 years. In Advent the choir sings his Christmas Oratorio, and the church is full to the last pew.',
               el:'Η παιδική χορωδία του Αγίου Θωμά στη Λειψία υπάρχει από το 1212 και είναι από τις παλαιότερες χορωδίες αγοριών στον κόσμο. Ο Γιόχαν Σεμπάστιαν Μπαχ ήταν διευθυντής της για 27 χρόνια. Τις εβδομάδες πριν από τα Χριστούγεννα η χορωδία τραγουδά το Χριστουγεννιάτικο Ορατόριό του, και η εκκλησία γεμίζει ως τον τελευταίο πάγκο.' }
    },

    /* ── B1 · Dresden, Striezelmarkt — ein Geschenk für Oma ─────────── */
    'b1.einkaufen': {
      deineRolle: { de:'Du bist auf dem Striezelmarkt in Dresden und suchst ein Geschenk für deine Oma in Porto. Der große Schwibbogen ist dir zu teuer; du nimmst etwas Kleineres, das trotzdem wunderschön ist — und es muss gut eingepackt sein, weil es nach Porto fliegt.', es:'Estás en el mercado navideño Striezelmarkt de Dresde y buscas un regalo para tu abuela de Oporto. El gran arco de velas te resulta demasiado caro; te llevas algo más pequeño que, aun así, es precioso, y tiene que ir bien envuelto porque viaja en avión a Oporto.', en:'You are at the Striezelmarkt in Dresden looking for a present for your grandmother in Porto. The big candle arch is too expensive for you; you take something smaller that is still beautiful — and it needs to be wrapped well, because it is flying to Porto.', el:'Είσαι στη χριστουγεννιάτικη αγορά Στρίτσελμαρκτ της Δρέσδης και ψάχνεις ένα δώρο για τη γιαγιά σου στο Πόρτο. Η μεγάλη καμάρα με τα κεριά σού είναι πολύ ακριβή· παίρνεις κάτι μικρότερο που είναι όμως πανέμορφο — και πρέπει να τυλιχτεί καλά, γιατί θα πετάξει στο Πόρτο.' },
      abrundung: { z:'Mache ich. Eine Räucherkerze schenke ich Ihnen dazu — dann riecht es in Porto nach Weihnachten.', na:{ es:'Hecho. Le regalo además un cono de incienso: así en Oporto olerá a Navidad.', en:'Will do. I’ll throw in an incense cone — then Porto will smell of Christmas.', el:'Αμέσως. Σας χαρίζω κι ένα θυμιατό κεράκι — έτσι στο Πόρτο θα μυρίζει Χριστούγεννα.' } },
      rollen: {
        spikiu: { de:'Herr Lange, Holzkünstler aus dem Erzgebirge', es:'el señor Lange, artesano de la madera de los Montes Metálicos', en:'Herr Lange, a woodcraftsman from the Ore Mountains', el:'ο κύριος Λάνγκε, τεχνίτης του ξύλου από τα Μεταλλοφόρα Όρη' },
        lerner: { de:'die Kundin auf Geschenksuche', es:'la clienta que busca un regalo', en:'the customer looking for a present', el:'η πελάτισσα που ψάχνει δώρο' },
        ort:    { de:'an einem Holzstand auf dem Striezelmarkt', es:'en un puesto de madera del Striezelmarkt', en:'at a wooden stall at the Striezelmarkt', el:'σε έναν ξύλινο πάγκο στο Στρίτσελμαρκτ' }
      },
      wortschatz: [
        { z:'das Geschenk',       na:{ es:'el regalo', en:'the present', el:'το δώρο' } },
        { z:'die Handarbeit',     na:{ es:'la artesanía, hecho a mano', en:'handmade work', el:'η χειροτεχνία' } },
        { z:'die Holzfigur',      na:{ es:'la figura de madera', en:'the wooden figure', el:'το ξύλινο αγαλματάκι' } },
        { z:'der Schwibbogen',    na:{ es:'el arco de velas navideño', en:'the Christmas candle arch', el:'η χριστουγεννιάτικη καμάρα με κεριά' } },
        { z:'der Räuchermann',    na:{ es:'el muñeco de madera que echa humo de incienso', en:'the wooden incense smoker figure', el:'το ξύλινο ανθρωπάκι που βγάζει καπνό από θυμίαμα' } },
        { z:'drechseln',          na:{ es:'tornear (madera)', en:'to turn (wood on a lathe)', el:'τορνεύω (ξύλο)' } },
        { z:'bemalen',            na:{ es:'pintar (a mano)', en:'to paint (by hand)', el:'ζωγραφίζω (με το χέρι)' } },
        { z:'kleiner / günstiger', na:{ es:'más pequeño / más barato', en:'smaller / cheaper', el:'πιο μικρός / πιο φτηνός' } },
        { z:'teurer (teuer)',     na:{ es:'más caro', en:'more expensive', el:'πιο ακριβός' } },
        { z:'der schönste',       na:{ es:'el más bonito', en:'the most beautiful', el:'ο πιο όμορφος' } },
        { z:'einpacken',          na:{ es:'envolver', en:'to wrap', el:'τυλίγω (δώρο)' } },
        { z:'der Stollen',        na:{ es:'el bizcocho navideño de Dresde', en:'Dresden Christmas fruit loaf', el:'το χριστουγεννιάτικο κέικ της Δρέσδης' } }
      ],
      dialog: {
        rolle: { es:'El señor Lange, artesano', en:'Herr Lange, the craftsman', el:'Ο κύριος Λάνγκε, ο τεχνίτης' },
        zeilen: [
          { wer:'spikiu', z:'Glück auf! Alles echte Handarbeit aus dem Erzgebirge. Suchen Sie etwas Bestimmtes?', na:{ es:'¡Buenas tardes! Todo es artesanía auténtica de los Montes Metálicos. ¿Busca algo en concreto?', en:'Hello! Everything is genuine handmade work from the Ore Mountains. Are you looking for anything in particular?', el:'Καλημέρα σας! Όλα είναι γνήσια χειροτεχνία από τα Μεταλλοφόρα Όρη. Ψάχνετε κάτι συγκεκριμένο;' } },
          { wer:'lerner', z:'Ja, ein Geschenk für meine Oma. Wie macht man diese kleinen Holzfiguren eigentlich?', na:{ es:'Sí, un regalo para mi abuela. ¿Y cómo se hacen estas figuritas de madera?', en:'Yes, a present for my grandmother. How are these little wooden figures actually made?', el:'Ναι, ένα δώρο για τη γιαγιά μου. Πώς φτιάχνονται, αλήθεια, αυτά τα μικρά ξύλινα αγαλματάκια;' } },
          { wer:'spikiu', z:'Alles von Hand gedrechselt und bemalt. Der große Schwibbogen hier kostet 249 Euro.', na:{ es:'Todo torneado y pintado a mano. Este arco de velas grande cuesta 249 euros.', en:'All turned and painted by hand. This big candle arch costs 249 euros.', el:'Όλα τορνεμένα και ζωγραφισμένα στο χέρι. Αυτή η μεγάλη καμάρα κοστίζει 249 ευρώ.' } },
          { wer:'lerner', z:'Der ist wunderschön, aber leider zu teuer. Haben Sie etwas Kleineres und Günstigeres?', na:{ es:'Es precioso, pero, por desgracia, demasiado caro. ¿Tiene algo más pequeño y más barato?', en:'It’s beautiful, but sadly too expensive. Do you have something smaller and cheaper?', el:'Είναι πανέμορφη, αλλά δυστυχώς πολύ ακριβή. Έχετε κάτι πιο μικρό και πιο φτηνό;' } },
          { wer:'spikiu', z:'Dann vielleicht dieser kleine Engel mit dem Cello. Er ist kleiner, aber genauso schön. 39 Euro.', na:{ es:'Entonces quizá este angelito con violonchelo. Es más pequeño, pero igual de bonito. 39 euros.', en:'Then maybe this little angel with the cello. He’s smaller, but just as beautiful. 39 euros.', el:'Τότε ίσως αυτός ο μικρός άγγελος με το τσέλο. Είναι πιο μικρός, αλλά εξίσου όμορφος. 39 ευρώ.' } },
          { wer:'lerner', z:'Perfekt, den nehme ich. Er ist der schönste von allen. Können Sie ihn einpacken?', na:{ es:'Perfecto, me lo llevo. Es el más bonito de todos. ¿Me lo puede envolver?', en:'Perfect, I’ll take him. He’s the most beautiful of them all. Could you wrap him?', el:'Τέλεια, τον παίρνω. Είναι ο πιο όμορφος απ’ όλους. Μπορείτε να μου τον τυλίξετε;' } }
        ]
      },
      lesetext: {
        z:'Auf dem Striezelmarkt riecht es nach Glühwein und Stollen. Um sechs Uhr läuteten die Glocken der Kreuzkirche, und ich habe sie aufgenommen. Die Verkäuferin am Stollenstand hat mir erklärt, dass „Striezel“ ein altes Wort für Stollen ist. Wort des Ortes: „Glück auf“ — der alte Gruß der Bergleute aus dem Erzgebirge.',
        na:{ es:'En el Striezelmarkt huele a vino caliente y a bizcocho navideño. A las seis sonaron las campanas de la Kreuzkirche y las he grabado. La vendedora del puesto de Stollen me ha explicado que «Striezel» es una palabra antigua para el Stollen. La palabra del lugar: «Glück auf», el antiguo saludo de los mineros de los Montes Metálicos.',
             en:'The Striezelmarkt smells of mulled wine and Stollen. At six o’clock the bells of the Kreuzkirche rang, and I recorded them. The woman at the Stollen stall explained to me that “Striezel” is an old word for Stollen. Word of the place: “Glück auf” — the old miners’ greeting from the Ore Mountains.',
             el:'Στο Στρίτσελμαρκτ μυρίζει ζεστό κρασί και Stollen. Στις έξι χτύπησαν οι καμπάνες της Κρόιτσκιρχε, και τις ηχογράφησα. Η πωλήτρια στον πάγκο με το Stollen μού εξήγησε ότι «Striezel» είναι μια παλιά λέξη για το Stollen. Η λέξη του τόπου: «Glück auf» — ο παλιός χαιρετισμός των μεταλλωρύχων από τα Μεταλλοφόρα Όρη.' },
        frage:{ es:'¿Qué es un «Striezel»?', en:'What is a “Striezel”?', el:'Τι είναι το «Striezel»;' },
        optionen:[
          { na:{ es:'Una palabra antigua para el Stollen', en:'An old word for Stollen', el:'Μια παλιά λέξη για το Stollen' }, richtig:true  },
          { na:{ es:'Una figura de madera', en:'A wooden figure', el:'Ένα ξύλινο αγαλματάκι' }, richtig:false },
          { na:{ es:'Una campana de la iglesia', en:'A church bell', el:'Μια καμπάνα της εκκλησίας' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Compara dos regalos para alguien de tu familia y di cuál te llevas. Usa un comparativo y un superlativo. Dos frases.', en:'Compare two presents for someone in your family and say which one you take. Use a comparative and a superlative. Two sentences.', el:'Σύγκρινε δύο δώρα για κάποιον από την οικογένειά σου και πες ποιο παίρνεις. Χρησιμοποίησε συγκριτικό και υπερθετικό. Δύο προτάσεις.' },
        muster:'Der Schal ist günstiger als die Tasche. Aber die rote Tasche ist das schönste Geschenk, deshalb nehme ich sie.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Para comparar, el alemán añade -er: klein → kleiner, günstig → günstiger (ojo: teuer → teurer). Para el máximo, der/die/das + -ste: der schönste Engel, das schönste Geschenk. Y tras dieser o der, el adjetivo en plural termina en -en: diese kleinen Figuren.',
               en:'To compare, German adds -er: klein → kleiner, günstig → günstiger (careful: teuer → teurer). For the top, der/die/das + -ste: der schönste Engel, das schönste Geschenk. And after dieser or der, a plural adjective ends in -en: diese kleinen Figuren.',
               el:'Για σύγκριση, τα γερμανικά προσθέτουν -er: klein → kleiner, günstig → günstiger (προσοχή: teuer → teurer). Για το ανώτατο, der/die/das + -ste: der schönste Engel, das schönste Geschenk. Και μετά το dieser ή το der, το επίθετο στον πληθυντικό τελειώνει σε -en: diese kleinen Figuren.' },
        beispiele:[
          { z:'Haben Sie etwas Kleineres und Günstigeres?', na:{ es:'¿Tiene algo más pequeño y más barato?', en:'Do you have something smaller and cheaper?', el:'Έχετε κάτι πιο μικρό και πιο φτηνό;' } },
          { z:'Er ist der schönste von allen.',              na:{ es:'Es el más bonito de todos.', en:'He’s the most beautiful of them all.', el:'Είναι ο πιο όμορφος απ’ όλους.' } }
        ]
      },
      kultur:{ es:'El Striezelmarkt de Dresde existe desde 1434 y es uno de los mercados navideños más antiguos de Alemania; su nombre viene de «Striezel», la palabra antigua para el Stollen. Los arcos de velas y los muñecos de incienso vienen de los Montes Metálicos, donde los mineros tallaban madera en las largas noches de invierno.',
               en:'Dresden’s Striezelmarkt has existed since 1434 and is one of the oldest Christmas markets in Germany; its name comes from “Striezel”, the old word for Stollen. The candle arches and incense smokers come from the Ore Mountains, where miners carved wood during the long winter evenings.',
               el:'Το Στρίτσελμαρκτ της Δρέσδης υπάρχει από το 1434 και είναι από τις παλαιότερες χριστουγεννιάτικες αγορές της Γερμανίας· το όνομά του βγαίνει από το «Striezel», την παλιά λέξη για το Stollen. Οι καμάρες με τα κεριά και τα ανθρωπάκια με το θυμίαμα έρχονται από τα Μεταλλοφόρα Όρη, όπου οι ανθρακωρύχοι σκάλιζαν ξύλο τα μεγάλα χειμωνιάτικα βράδια.' }
    },

    /* ── B1 · Köln, Brauhaus im Karneval ───────────────────────────── */
    'b1.restaurant': {
      duzen: true,
      deineRolle: { de:'Es ist Karneval in Köln. Du kommst mit vier Freunden ohne Reservierung in ein Brauhaus — ihr seid also fünf. Ihr wollt einen freien Tisch und probiert den „Halve Hahn“. Du weißt noch nicht, wie man sagt, dass man kein Kölsch mehr möchte.', es:'Es Carnaval en Colonia. Llegas con cuatro amigos a una cervecería tradicional sin reserva: sois cinco. Queréis una mesa libre y vais a probar el «Halve Hahn». Todavía no sabes cómo se dice que ya no quieres más Kölsch.', en:'It is carnival in Cologne. You arrive at a brewhouse with four friends and no reservation — so there are five of you. You want a free table and you are going to try the “Halve Hahn”. You don’t know yet how to say you don’t want any more Kölsch.', el:'Είναι καρναβάλι στην Κολωνία. Φτάνεις με τέσσερις φίλους σε μια παραδοσιακή μπιραρία χωρίς κράτηση — είστε λοιπόν πέντε. Θέλετε ένα ελεύθερο τραπέζι και θα δοκιμάσετε το «Halve Hahn». Δεν ξέρεις ακόμα πώς λες ότι δεν θέλεις άλλη Kölsch.' },
      abrundung: { z:'Ganz einfach: Du legst den Bierdeckel auf das Glas. Sonst bringe ich immer ein neues!', na:{ es:'Muy fácil: pones el posavasos encima del vaso. Si no, ¡te sigo trayendo otro!', en:'Easy: you put the beer mat on top of the glass. Otherwise I’ll keep bringing you a new one!', el:'Πολύ απλό: βάζεις το σουβέρ πάνω στο ποτήρι. Αλλιώς θα σου φέρνω συνέχεια καινούργιο!' } },
      rollen: {
        spikiu: { de:'der Köbes, der Kellner im Brauhaus', es:'el Köbes, el camarero de la cervecería', en:'the Köbes, the brewhouse waiter', el:'ο Κέμπες, ο σερβιτόρος της μπιραρίας' },
        lerner: { de:'die Sprecherin einer Gruppe ohne Reservierung', es:'la que habla por un grupo sin reserva', en:'the spokesperson of a group with no reservation', el:'αυτή που μιλάει για μια παρέα χωρίς κράτηση' },
        ort:    { de:'in einem vollen Brauhaus in der Kölner Altstadt', es:'en una cervecería llena del casco antiguo de Colonia', en:'in a packed brewhouse in Cologne’s old town', el:'σε μια γεμάτη μπιραρία στην παλιά πόλη της Κολωνίας' }
      },
      wortschatz: [
        { z:'das Brauhaus',       na:{ es:'la cervecería tradicional', en:'the brewhouse', el:'η παραδοσιακή μπιραρία' } },
        { z:'der Köbes',          na:{ es:'el camarero de cervecería (Colonia)', en:'the brewhouse waiter (Cologne)', el:'ο σερβιτόρος της μπιραρίας (Κολωνία)' } },
        { z:'das Kölsch',         na:{ es:'la cerveza de Colonia', en:'Cologne’s local beer', el:'η μπίρα της Κολωνίας' } },
        { z:'die Stange',         na:{ es:'el vaso alto y estrecho de Kölsch', en:'the tall thin Kölsch glass', el:'το ψηλό στενό ποτήρι της Kölsch' } },
        { z:'der Bierdeckel',     na:{ es:'el posavasos', en:'the beer mat', el:'το σουβέρ' } },
        { z:'reservieren',        na:{ es:'reservar', en:'to book', el:'κάνω κράτηση' } },
        { z:'ein Tisch, der frei ist', na:{ es:'una mesa que esté libre', en:'a table that is free', el:'ένα τραπέζι που είναι ελεύθερο' } },
        { z:'der Halve Hahn',     na:{ es:'panecillo de centeno con queso (Colonia)', en:'rye roll with cheese (Cologne)', el:'ψωμάκι σίκαλης με τυρί (Κολωνία)' } },
        { z:'das Roggenbrötchen', na:{ es:'el panecillo de centeno', en:'the rye roll', el:'το ψωμάκι σίκαλης' } },
        { z:'der Senf',           na:{ es:'la mostaza', en:'the mustard', el:'η μουστάρδα' } },
        { z:'Alaaf! (Köln)',      na:{ es:'¡Viva! (grito del Carnaval de Colonia)', en:'Hurrah! (Cologne carnival cheer)', el:'Ζήτω! (κραυγή του καρναβαλιού της Κολωνίας)' } },
        { z:'der Jeck',           na:{ es:'el que celebra el Carnaval', en:'a carnival reveller', el:'αυτός που γιορτάζει το καρναβάλι' } }
      ],
      dialog: {
        rolle: { es:'El Köbes, el camarero', en:'The Köbes, the waiter', el:'Ο Κέμπες, ο σερβιτόρος' },
        zeilen: [
          { wer:'spikiu', z:'Alaaf! Na, ihr seid aber viele. Habt ihr reserviert?', na:{ es:'¡Alaaf! Vaya, sí que sois muchos. ¿Tenéis reserva?', en:'Alaaf! Well, there are a lot of you. Have you booked?', el:'Αλάαφ! Βρε, πολλοί είστε. Έχετε κάνει κράτηση;' } },
          { wer:'lerner', z:'Nein, leider nicht. Wir sind fünf. Gibt es noch einen Tisch, der frei ist?', na:{ es:'No, por desgracia no. Somos cinco. ¿Queda alguna mesa que esté libre?', en:'No, unfortunately not. There are five of us. Is there still a table that’s free?', el:'Όχι, δυστυχώς. Είμαστε πέντε. Υπάρχει ακόμα κάποιο τραπέζι που είναι ελεύθερο;' } },
          { wer:'spikiu', z:'Hinten am Fenster ist noch einer. Kölsch für alle? Und was zu essen?', na:{ es:'Al fondo, junto a la ventana, queda una. ¿Kölsch para todos? ¿Y algo de comer?', en:'There’s one at the back by the window. Kölsch for everyone? And something to eat?', el:'Πίσω, δίπλα στο παράθυρο, υπάρχει ένα. Kölsch για όλους; Και κάτι να φάτε;' } },
          { wer:'lerner', z:'Ja, bitte. Was ist ein Halve Hahn? Ist das ein Hähnchen, das man halbiert?', na:{ es:'Sí, por favor. ¿Qué es un «Halve Hahn»? ¿Es un pollo que se parte por la mitad?', en:'Yes, please. What’s a “Halve Hahn”? Is it a chicken that you cut in half?', el:'Ναι, παρακαλώ. Τι είναι το «Halve Hahn»; Είναι ένα κοτόπουλο που το κόβουν στη μέση;' } },
          { wer:'spikiu', z:'Nein, das ist ein Roggenbrötchen mit Käse, Senf und Zwiebeln. Ganz ohne Huhn!', na:{ es:'No, es un panecillo de centeno con queso, mostaza y cebolla. ¡Sin nada de pollo!', en:'No, it’s a rye roll with cheese, mustard and onions. No chicken at all!', el:'Όχι, είναι ένα ψωμάκι σίκαλης με τυρί, μουστάρδα και κρεμμύδι. Καθόλου κοτόπουλο!' } },
          { wer:'lerner', z:'Dann fünf Halve Hahn, bitte. Und wie sage ich dir, dass ich kein Kölsch mehr möchte?', na:{ es:'Entonces cinco «Halve Hahn», por favor. ¿Y cómo te digo que ya no quiero más Kölsch?', en:'Then five “Halve Hahn”, please. And how do I tell you I don’t want any more Kölsch?', el:'Τότε πέντε «Halve Hahn», παρακαλώ. Και πώς σου λέω ότι δεν θέλω άλλη Kölsch;' } }
        ]
      },
      lesetext: {
        z:'Köln im Karneval: Alle sind verkleidet, und auf der Straße spielt eine Blaskapelle. Ich habe „Alaaf!“ aufgenommen — tausend Stimmen auf einmal. Im Brauhaus stellt der Köbes immer ein neues Kölsch hin, bis man den Bierdeckel auf das Glas legt. Wort des Ortes: „Jeck“ — ein Mensch, der Karneval feiert.',
        na:{ es:'Colonia en Carnaval: todo el mundo va disfrazado y en la calle toca una banda de música. He grabado «¡Alaaf!»: mil voces a la vez. En la cervecería, el Köbes te sigue poniendo un Kölsch nuevo hasta que pones el posavasos encima del vaso. La palabra del lugar: «Jeck», una persona que celebra el Carnaval.',
             en:'Cologne at carnival: everyone is in fancy dress, and a brass band is playing in the street. I recorded “Alaaf!” — a thousand voices at once. In the brewhouse the Köbes keeps putting down a new Kölsch until you put the beer mat on the glass. Word of the place: “Jeck” — a person who celebrates carnival.',
             el:'Η Κολωνία στο καρναβάλι: όλοι είναι μεταμφιεσμένοι, και στον δρόμο παίζει μια μπάντα πνευστών. Ηχογράφησα το «Alaaf!» — χίλιες φωνές μαζί. Στη μπιραρία ο Κέμπες σού φέρνει συνέχεια καινούργια Kölsch, ώσπου να βάλεις το σουβέρ πάνω στο ποτήρι. Η λέξη του τόπου: «Jeck» — ένας άνθρωπος που γιορτάζει το καρναβάλι.' },
        frage:{ es:'¿Qué haces si ya no quieres más Kölsch?', en:'What do you do if you don’t want any more Kölsch?', el:'Τι κάνεις αν δεν θέλεις άλλη Kölsch;' },
        optionen:[
          { na:{ es:'Pones el posavasos encima del vaso', en:'Put the beer mat on the glass', el:'Βάζεις το σουβέρ πάνω στο ποτήρι' }, richtig:true  },
          { na:{ es:'Le das la vuelta al vaso', en:'Turn the glass upside down', el:'Γυρίζεις το ποτήρι ανάποδα' }, richtig:false },
          { na:{ es:'Gritas «¡Alaaf!»', en:'Shout “Alaaf!”', el:'Φωνάζεις «Alaaf!»' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Describe tu bar o restaurante favorito con dos oraciones de relativo (der/die/das …). Dos frases.', en:'Describe your favourite bar or restaurant with two relative clauses (der/die/das …). Two sentences.', el:'Περιέγραψε το αγαπημένο σου μπαρ ή εστιατόριο με δύο αναφορικές προτάσεις (der/die/das …). Δύο προτάσεις.' },
        muster:'Ich mag ein kleines Café, das direkt am Fluss liegt. Dort arbeitet eine Kellnerin, die immer lacht.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'La oración de relativo explica una palabra: ein Tisch, der frei ist. El pronombre sigue el género de esa palabra — der Tisch → der, das Hähnchen → das, die Kneipe → die — y el verbo se va al final, igual que tras „dass“.',
               en:'A relative clause explains a word: ein Tisch, der frei ist. The pronoun follows that word’s gender — der Tisch → der, das Hähnchen → das, die Kneipe → die — and the verb goes to the end, just as after “dass”.',
               el:'Η αναφορική πρόταση εξηγεί μια λέξη: ein Tisch, der frei ist. Η αντωνυμία ακολουθεί το γένος αυτής της λέξης — der Tisch → der, das Hähnchen → das, die Kneipe → die — και το ρήμα πάει στο τέλος, όπως μετά το «dass».' },
        beispiele:[
          { z:'Gibt es noch einen Tisch, der frei ist?',   na:{ es:'¿Queda alguna mesa que esté libre?', en:'Is there still a table that’s free?', el:'Υπάρχει ακόμα κάποιο τραπέζι που είναι ελεύθερο;' } },
          { z:'Ist das ein Hähnchen, das man halbiert?',    na:{ es:'¿Es un pollo que se parte por la mitad?', en:'Is it a chicken that you cut in half?', el:'Είναι ένα κοτόπουλο που το κόβουν στη μέση;' } }
        ]
      },
      kultur:{ es:'En las cervecerías de Colonia sirve el Köbes, con delantal azul, que tutea a todo el mundo y tiene fama de humor seco. El Kölsch se sirve en «Stangen», vasos de 0,2 litros, y llega uno nuevo en cuanto el tuyo se vacía. En Carnaval, Colonia entera grita «¡Alaaf!».',
               en:'In Cologne’s brewhouses you are served by the Köbes, in a blue apron, who says “du” to everyone and is famous for his dry humour. Kölsch comes in “Stangen”, 0.2-litre glasses, and a new one arrives as soon as yours is empty. At carnival the whole city shouts “Alaaf!”.',
               el:'Στις μπιραρίες της Κολωνίας σε σερβίρει ο Κέμπες, με μπλε ποδιά, που μιλάει σε όλους στον ενικό και είναι γνωστός για το στεγνό του χιούμορ. Η Kölsch σερβίρεται σε «Stangen», ποτήρια των 0,2 λίτρων, και μόλις αδειάσει το δικό σου έρχεται καινούργιο. Στο καρναβάλι όλη η πόλη φωνάζει «Alaaf!».' }
    }

  }
};

var K_LP_B = {

  schritt: {
    wetter:          { es:'Selva Negra: planes si viene tormenta', en:'Black Forest: planning around a thunderstorm', el:'Μέλας Δρυμός: σχέδια αν έρθει καταιγίδα' },
    arzt:            { es:'Zúrich: una muñeca torcida', en:'Zurich: a sprained wrist', el:'Ζυρίχη: ένα στραμπουληγμένο χέρι' },
    bahnhof:         { es:'Múnich → Salzburgo: el tren ya había salido', en:'Munich → Salzburg: the train had already left', el:'Μόναχο → Σάλτσμπουργκ: το τρένο είχε ήδη φύγει' },
    taxi:            { es:'Salzburgo: ¿y si vivieras aquí?', en:'Salzburg: what if you lived here?', el:'Σάλτσμπουργκ: κι αν ζούσες εδώ;' },
    wegbeschreibung: { es:'Viena: entender un camino y contarlo', en:'Vienna: understanding a route and passing it on', el:'Βιέννη: καταλαβαίνεις μια διαδρομή και τη μεταφέρεις' }
  },

  aufgaben: {
    'b1.wetter': [
      { de:'Grüß Hannes, frag, wie das Wetter heute wird, und sag, dass du oben den Wind aufnehmen möchtest', es:'Saluda a Hannes, pregunta qué tiempo hará hoy y di que quieres grabar el viento arriba', en:'Greet Hannes, ask what the weather will be like today and say you want to record the wind at the top', el:'Χαιρέτησε τον Χάνες, ρώτα τι καιρό θα κάνει σήμερα και πες ότι θέλεις να ηχογραφήσεις τον αέρα στην κορυφή' },
      { de:'Sag mit „wenn … dann“, dass ihr bei einem Gewitter oben nass werdet, und schlag vor, gleich loszugehen', es:'Di con «wenn … dann» que si hay tormenta os mojaréis arriba, y propón salir ya', en:'Say with "wenn … dann" that if a storm comes you will get wet at the top, and suggest setting off right away', el:'Πες με «wenn … dann» ότι, αν έρθει καταιγίδα, θα βραχείτε στην κορυφή, και πρότεινε να ξεκινήσετε αμέσως' },
      { de:'Stimme zu und sag mit „werden“, dass du die Regenjacke mitnimmst und das Aufnahmegerät gut einpackst', es:'Di que de acuerdo y, con «werden», que te llevarás el chubasquero y envolverás bien la grabadora', en:'Agree and say with "werden" that you will take your rain jacket and pack the recorder up well', el:'Συμφώνησε και πες με «werden» ότι θα πάρεις το αδιάβροχο και θα τυλίξεις καλά τη συσκευή εγγραφής' }
    ],
    'b1.arzt': [
      { de:'Erzähle, dass du vorhin mit dem Velo gestürzt bist und dir jetzt das rechte Handgelenk wehtut', es:'Cuenta que hace un rato te has caído de la bici (la «Velo») y que ahora te duele la muñeca derecha', en:'Say you came off your bike (your "Velo") a little while ago and your right wrist hurts now', el:'Πες ότι πριν από λίγο έπεσες από το ποδήλατο (το «Velo») και ότι τώρα σε πονάει ο δεξιός καρπός' },
      { de:'Frag, ob die Hand geröntgt wird, und sag, dass du Cellistin bist und bald wieder spielen musst', es:'Pregunta si te van a hacer una radiografía de la mano y di que eres violonchelista y tienes que volver a tocar pronto', en:'Ask whether your hand will be X-rayed, and say you are a cellist and need to play again soon', el:'Ρώτα αν θα βγάλουν ακτινογραφία στο χέρι και πες ότι είσαι τσελίστρια και πρέπει να ξαναπαίξεις σύντομα' },
      { de:'Frag, ob du in dieser Zeit ein bisschen üben darfst oder ganz pausieren sollst', es:'Pregunta si durante ese tiempo puedes ensayar un poco o si debes parar del todo', en:'Ask whether you may practise a little during that time or should stop completely', el:'Ρώτα αν σε αυτό το διάστημα επιτρέπεται να κάνεις λίγη εξάσκηση ή αν πρέπει να σταματήσεις εντελώς' }
    ],
    'b1.bahnhof': [
      { de:'Erzähle mit „als“, dass dein Zug nach Salzburg schon abgefahren war, als du am Gleis ankamst', es:'Cuenta con «als» que tu tren a Salzburgo ya había salido cuando llegaste al andén', en:'Say with "als" that your train to Salzburg had already left when you got to the platform', el:'Πες με «als» ότι το τρένο σου για το Σάλτσμπουργκ είχε ήδη φύγει όταν έφτασες στην αποβάθρα' },
      { de:'Frag nach dem Ersatzbus und ob dein großes Cello hineinpasst', es:'Pregunta por el autobús de sustitución y si cabe tu violonchelo grande', en:'Ask about the replacement bus and whether your big cello will fit in', el:'Ρώτα για το λεωφορείο αντικατάστασης και αν χωράει το μεγάλο σου τσέλο' },
      { de:'Sag, dass du deinen Platz schon reserviert hattest, und frag, ob du das Geld dafür zurückbekommst', es:'Di que ya habías reservado tu asiento y pregunta si te devuelven el dinero de la reserva', en:'Say you had already reserved your seat and ask whether you will get the money back for it', el:'Πες ότι είχες ήδη κλείσει θέση και ρώτα αν θα πάρεις πίσω τα χρήματα της κράτησης' }
    ],
    'b1.taxi': [
      { de:'Sag mit „Schön wär\'s!", dass du nicht bei den Festspielen spielst, sondern Klänge für ein Album aufnimmst', es:'Di con «Schön wär\'s!» que no tocas en el festival, sino que grabas sonidos para un álbum', en:'Say with "Schön wär\'s!" that you are not playing at the festival, but recording sounds for an album', el:'Πες με «Schön wär\'s!» ότι δεν παίζεις στο φεστιβάλ, αλλά ηχογραφείς ήχους για ένα άλμπουμ' },
      { de:'Sag mit „würde“, dass du jeden Sommer zu den Festspielen gehen würdest, wenn du hier leben würdest', es:'Di con «würde» que, si vivieras aquí, irías al festival todos los veranos', en:'Say with "würde" that if you lived here, you would go to the festival every summer', el:'Πες με «würde» ότι, αν ζούσες εδώ, θα πήγαινες στο φεστιβάλ κάθε καλοκαίρι' },
      { de:'Sag, dass die Kälte kein Problem wäre, weil du dein Cello und viel Zeit zum Üben hättest', es:'Di que el frío no sería un problema, porque tendrías tu violonchelo y mucho tiempo para ensayar', en:'Say the cold would not be a problem, because you would have your cello and lots of time to practise', el:'Πες ότι το κρύο δεν θα ήταν πρόβλημα, γιατί θα είχες το τσέλο σου και πολύ χρόνο για εξάσκηση' }
    ],
    'b1.wegbeschreibung': [
      { de:'Grüß, sag, dass du morgen Beethovens Grab besuchen möchtest, und frag, wie du zum Zentralfriedhof kommst', es:'Saluda, di que mañana quieres visitar la tumba de Beethoven y pregunta cómo llegar al Cementerio Central', en:'Say good evening, say you would like to visit Beethoven\'s grave tomorrow, and ask how to get to the Central Cemetery', el:'Χαιρέτησε, πες ότι αύριο θέλεις να επισκεφθείς τον τάφο του Μπετόβεν και ρώτα πώς θα πας στο Κεντρικό Νεκροταφείο' },
      { de:'Fasse mit „Sie sagen also, ich solle …“ zusammen: die 71 nehmen und beim zweiten Tor aussteigen', es:'Resume con «Sie sagen also, ich solle …»: coger el 71 y bajarte en la segunda puerta', en:'Sum up with "Sie sagen also, ich solle …": take the 71 and get off at the second gate', el:'Συνόψισε με «Sie sagen also, ich solle …»: να πάρεις το 71 και να κατέβεις στη δεύτερη πύλη' },
      { de:'Sag, dass du Rui gleich schreibst, dass der Herr Doktor sagt, du sollest am Vormittag hingehen', es:'Di que ahora mismo le escribes a Rui que el señor doctor dice que vayas por la mañana', en:'Say you will text Rui right away that the Herr Doktor says you should go in the morning', el:'Πες ότι θα γράψεις αμέσως στον Ρούι ότι ο κύριος δόκτωρ λέει να πας το πρωί' }
    ]
  },

  stationen: {

    /* ── B1 · Wetter · Schwarzwald, Feldberg · Hannes (Apr) ──────────── */
    'b1.wetter': {
      /* Wanderführer und Gast am Berg: man duzt sich. */
      duzen: true,
      deineRolle: { de:'Du bist Inês. Heute wanderst du mit Hannes auf den Feldberg. Oben möchtest du den Wind aufnehmen. Du hast eine Regenjacke und dein kleines Aufnahmegerät dabei.', es:'Eres Inês. Hoy subes al Feldberg con Hannes. Arriba quieres grabar el viento. Llevas un chubasquero y tu pequeña grabadora.', en:'You are Inês. Today you are hiking up the Feldberg with Hannes. At the top you want to record the wind. You have a rain jacket and your little recorder with you.', el:'Είσαι η Ινές. Σήμερα ανεβαίνεις στο Φέλντμπεργκ με τον Χάνες. Στην κορυφή θέλεις να ηχογραφήσεις τον αέρα. Έχεις μαζί σου ένα αδιάβροχο και τη μικρή σου συσκευή εγγραφής.' },
      abrundung: { z:'Prima. Und wenn es doch regnet, nimmst du eben den Regen auf — der klingt hier oben wunderbar.', na:{ es:'Genial. Y si al final llueve, pues grabas la lluvia: aquí arriba suena de maravilla.', en:'Great. And if it does rain, you just record the rain — it sounds wonderful up here.', el:'Τέλεια. Κι αν τελικά βρέξει, ηχογραφείς τη βροχή — εδώ πάνω ακούγεται υπέροχα.' } },
      rollen: {
        spikiu: { de:'Hannes, der Wanderführer', es:'Hannes, el guía de montaña', en:'Hannes, the hiking guide', el:'ο Χάνες, ο οδηγός πεζοπορίας' },
        lerner: { de:'Inês, die Cellistin', es:'Inês, la violonchelista', en:'Inês, the cellist', el:'η Ινές, η τσελίστρια' },
        ort:    { de:'in der Gaststube einer Pension in Hinterzarten, Schwarzwald', es:'en el comedor de una pensión de Hinterzarten, Selva Negra', en:'in the parlour of a guesthouse in Hinterzarten, Black Forest', el:'στην τραπεζαρία μιας πανσιόν στο Χίντερτσαρτεν, στον Μέλανα Δρυμό' }
      },
      wortschatz: [
        { z:'der Wetterbericht',  na:{ es:'el parte meteorológico', en:'the weather report', el:'το δελτίο καιρού' } },
        { z:'das Gewitter',       na:{ es:'la tormenta', en:'the thunderstorm', el:'η καταιγίδα' } },
        { z:'es donnert',         na:{ es:'truena', en:'it is thundering', el:'βροντάει' } },
        { z:'trocken',            na:{ es:'seco', en:'dry', el:'στεγνός' } },
        { z:'der Gipfel',         na:{ es:'la cumbre', en:'the summit', el:'η κορυφή' } },
        { z:'die Hütte',          na:{ es:'el refugio', en:'the mountain hut', el:'το καταφύγιο' } },
        { z:'absteigen',          na:{ es:'bajar (de la montaña)', en:'to climb down', el:'κατεβαίνω (από το βουνό)' } },
        { z:'der Nebel',          na:{ es:'la niebla', en:'the fog', el:'η ομίχλη' } },
        { z:'die Regenjacke',     na:{ es:'el chubasquero', en:'the rain jacket', el:'το αδιάβροχο' } },
        { z:'einpacken',          na:{ es:'envolver, guardar', en:'to pack up', el:'τυλίγω, βάζω στην τσάντα' } },
        { z:'die Kuckucksuhr',    na:{ es:'el reloj de cuco', en:'the cuckoo clock', el:'το ρολόι με τον κούκο' } },
        { z:'Ade!',               na:{ es:'¡adiós! (en el sur de Alemania)', en:'bye! (in southern Germany)', el:'αντίο! (στη νότια Γερμανία)' } }
      ],
      dialog: {
        rolle: { es:'Hannes, el guía de montaña', en:'Hannes, the hiking guide', el:'Ο Χάνες, ο οδηγός πεζοπορίας' },
        zeilen: [
          { wer:'spikiu', z:'Morgen, Inês! Hörst du die Kuckucksuhr in der Gaststube? Heute geht es auf den Feldberg.', na:{ es:'¡Buenos días, Inês! ¿Oyes el reloj de cuco en el comedor? Hoy subimos al Feldberg.', en:'Morning, Inês! Can you hear the cuckoo clock in the dining room? Today we are going up the Feldberg.', el:'Καλημέρα, Ινές! Ακούς το ρολόι με τον κούκο στην τραπεζαρία; Σήμερα ανεβαίνουμε στο Φέλντμπεργκ.' } },
          { wer:'lerner', z:'Guten Morgen, Hannes! Wie wird das Wetter heute? Ich möchte oben den Wind aufnehmen.', na:{ es:'¡Buenos días, Hannes! ¿Qué tiempo hará hoy? Quiero grabar el viento allí arriba.', en:'Good morning, Hannes! What will the weather be like today? I want to record the wind at the top.', el:'Καλημέρα, Χάνες! Τι καιρό θα κάνει σήμερα; Θέλω να ηχογραφήσω τον αέρα εκεί πάνω.' } },
          { wer:'spikiu', z:'Am Vormittag bleibt es trocken. Aber ab zwei wird es Gewitter geben, sagt der Wetterbericht.', na:{ es:'Por la mañana no lloverá. Pero a partir de las dos habrá tormentas, dice el parte.', en:'It will stay dry in the morning. But from two o\'clock there will be thunderstorms, says the weather report.', el:'Το πρωί θα μείνει στεγνός ο καιρός. Αλλά από τις δύο θα έχει καταιγίδες, λέει το δελτίο καιρού.' } },
          { wer:'lerner', z:'Wenn ein Gewitter kommt, dann werden wir oben nass. Gehen wir lieber gleich los?', na:{ es:'Si viene una tormenta, nos mojaremos arriba. ¿Mejor salimos ya?', en:'If a storm comes, we will get wet at the top. Shall we set off right away?', el:'Αν έρθει καταιγίδα, θα βραχούμε εκεί πάνω. Να ξεκινήσουμε καλύτερα αμέσως;' } },
          { wer:'spikiu', z:'Gute Idee. Und Plan B: Wenn es früher donnert, steigen wir zur Hütte ab.', na:{ es:'Buena idea. Y plan B: si truena antes, bajamos al refugio.', en:'Good idea. And plan B: if it thunders earlier, we climb down to the hut.', el:'Καλή ιδέα. Και σχέδιο Β: αν βροντήξει νωρίτερα, κατεβαίνουμε στο καταφύγιο.' } },
          { wer:'lerner', z:'Einverstanden. Ich werde die Regenjacke mitnehmen und das Aufnahmegerät gut einpacken.', na:{ es:'De acuerdo. Me llevaré el chubasquero y envolveré bien la grabadora.', en:'Agreed. I will take my rain jacket and pack the recorder up well.', el:'Σύμφωνοι. Θα πάρω το αδιάβροχο και θα τυλίξω καλά τη συσκευή εγγραφής.' } }
        ]
      },
      lesetext: {
        z:'Hannes sagte, ab zwei werde es Gewitter geben. Also gingen wir schon früh los. Oben auf dem Feldberg war es neblig und windig, und ich nahm den Wind auf. Aber schon um zwölf fing es an zu donnern. Plan B: Wir liefen hinunter zu einer Hütte, nass bis auf die Socken. Dort nahm ich den Regen auf dem Holzdach auf. Wort des Ortes: Vesper — so heißt hier das Essen zwischendurch.',
        na:{ es:'Hannes dijo que a partir de las dos habría tormentas. Así que salimos temprano. Arriba, en el Feldberg, había niebla y viento, y grabé el viento. Pero ya a las doce empezó a tronar. Plan B: bajamos corriendo a un refugio, calados hasta los calcetines. Allí grabé la lluvia sobre el tejado de madera. Palabra del lugar: Vesper, así llaman aquí a la comida entre horas.',
             en:'Hannes said there would be thunderstorms from two o\'clock. So we set off early. At the top of the Feldberg it was foggy and windy, and I recorded the wind. But at twelve it already started to thunder. Plan B: we ran down to a hut, soaked to our socks. There I recorded the rain on the wooden roof. Word of the place: Vesper — that is what they call a snack between meals here.',
             el:'Ο Χάνες είπε ότι από τις δύο θα έχει καταιγίδες. Έτσι ξεκινήσαμε νωρίς. Πάνω στο Φέλντμπεργκ είχε ομίχλη και αέρα, και ηχογράφησα τον αέρα. Αλλά ήδη στις δώδεκα άρχισε να βροντάει. Σχέδιο Β: τρέξαμε κάτω σε ένα καταφύγιο, μούσκεμα ως τις κάλτσες. Εκεί ηχογράφησα τη βροχή πάνω στην ξύλινη στέγη. Η λέξη του τόπου: Vesper — έτσι λένε εδώ το κολατσιό.' },
        frage:{ es:'¿Dónde se refugiaron de la lluvia?', en:'Where did they shelter from the rain?', el:'Πού βρήκαν καταφύγιο από τη βροχή;' },
        optionen:[
          { na:{ es:'En el refugio', en:'In the hut', el:'Στο καταφύγιο' }, richtig:true },
          { na:{ es:'En la cumbre', en:'At the summit', el:'Στην κορυφή' }, richtig:false },
          { na:{ es:'En el hotel', en:'At the hotel', el:'Στο ξενοδοχείο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Escribe qué harás el fin de semana según el tiempo: una frase con «wenn … dann» y una con «werden». Dos frases.', en:'Write what you will do at the weekend depending on the weather: one sentence with "wenn … dann" and one with "werden". Two sentences.', el:'Γράψε τι θα κάνεις το Σαββατοκύριακο ανάλογα με τον καιρό: μία πρόταση με «wenn … dann» και μία με «werden». Δύο προτάσεις.' },
        muster:'Wenn die Sonne scheint, dann gehe ich wandern. Am Sonntag wird es regnen, also werde ich zu Hause bleiben.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'En la frase con «wenn» el verbo se va al final: «Wenn ein Gewitter kommt». Después, la frase principal empieza directamente con el verbo: «… (dann) werden wir nass». El futuro se forma con «werden» + infinitivo al final: «Es wird regnen». Ojo: en la conversación el alemán usa mucho el presente para el futuro — «Morgen regnet es» también vale.', en:'In the "wenn" clause the verb goes to the end: "Wenn ein Gewitter kommt". The main clause then starts straight with the verb: "… (dann) werden wir nass". The future is "werden" + infinitive at the end: "Es wird regnen". Note: in conversation German often uses the present for the future — "Morgen regnet es" works too.', el:'Στην πρόταση με «wenn» το ρήμα πηγαίνει στο τέλος: «Wenn ein Gewitter kommt». Μετά η κύρια πρόταση ξεκινά κατευθείαν με το ρήμα: «… (dann) werden wir nass». Ο μέλλοντας είναι «werden» + απαρέμφατο στο τέλος: «Es wird regnen». Προσοχή: στην κουβέντα τα γερμανικά βάζουν συχνά ενεστώτα για το μέλλον — και το «Morgen regnet es» είναι σωστό.' },
        beispiele:[
          { z:'Wenn es früher donnert, steigen wir zur Hütte ab.', na:{ es:'Si truena antes, bajamos al refugio.', en:'If it thunders earlier, we climb down to the hut.', el:'Αν βροντήξει νωρίτερα, κατεβαίνουμε στο καταφύγιο.' } },
          { z:'Ab zwei wird es Gewitter geben.', na:{ es:'A partir de las dos habrá tormentas.', en:'From two o\'clock there will be thunderstorms.', el:'Από τις δύο θα έχει καταιγίδες.' } }
        ]
      },
      kultur: { es:'El Feldberg, con 1.493 metros, es la montaña más alta de la Selva Negra; en invierno es una estación de esquí. El reloj de cuco nació en esta región en el siglo XVIII y aún hoy se fabrica aquí. Para despedirse, en el sur de Alemania se oye mucho «Ade».',
                en:'At 1,493 metres the Feldberg is the highest mountain in the Black Forest; in winter it is a ski area. The cuckoo clock was born in this region in the 18th century and is still made here today. In southern Germany people often say "Ade" for goodbye.',
                el:'Το Φέλντμπεργκ, με 1.493 μέτρα, είναι το ψηλότερο βουνό του Μέλανα Δρυμού· τον χειμώνα είναι χιονοδρομικό κέντρο. Το ρολόι με τον κούκο γεννήθηκε σε αυτή την περιοχή τον 18ο αιώνα και φτιάχνεται εδώ μέχρι σήμερα. Στη νότια Γερμανία για «αντίο» λένε συχνά «Ade».' }
    },

    /* ── B1 · Arzt · Zürich · Frau Dr. Meili (Mai) ───────────────────── */
    'b1.arzt': {
      deineRolle: { de:'Du bist Inês. Vorhin bist du in Zürich mit dem Velo (so sagt man hier zum Fahrrad) in eine Tramschiene geraten und gestürzt. Jetzt tut dir das rechte Handgelenk weh — die Hand, die den Bogen hält. Du bist Cellistin und willst so bald wie möglich wieder spielen.', es:'Eres Inês. Hace un rato, en Zúrich, la rueda de tu bici —la «Velo», como dicen aquí— se ha metido en un raíl del tranvía y te has caído. Ahora te duele la muñeca derecha, la de la mano que sujeta el arco. Eres violonchelista y quieres volver a tocar cuanto antes.', en:'You are Inês. A little while ago in Zurich your bike — your "Velo", as they say here — got caught in a tram rail and you fell. Now your right wrist hurts: the hand that holds the bow. You are a cellist and want to play again as soon as possible.', el:'Είσαι η Ινές. Πριν από λίγο στη Ζυρίχη η ρόδα του ποδηλάτου σου — του «Velo», όπως λένε εδώ — σφήνωσε σε μια ράγα του τραμ κι έπεσες. Τώρα σε πονάει ο δεξιός καρπός, το χέρι που κρατάει το δοξάρι. Είσαι τσελίστρια και θέλεις να ξαναπαίξεις όσο πιο γρήγορα γίνεται.' },
      abrundung: { z:'Bitte ganz pausieren. Aber Musik hören dürfen Sie, so viel Sie wollen. Gute Besserung!', na:{ es:'Pare del todo, por favor. Pero escuchar música puede, toda la que quiera. ¡Que se mejore!', en:'Please stop completely. But you may listen to as much music as you like. Get well soon!', el:'Παρακαλώ σταματήστε εντελώς. Μουσική όμως μπορείτε να ακούτε όση θέλετε. Περαστικά!' } },
      rollen: {
        spikiu: { de:'Frau Dr. Meili, die Ärztin', es:'la doctora Meili', en:'Dr Meili, the doctor', el:'η γιατρός Μάιλι' },
        lerner: { de:'Inês, die Patientin', es:'Inês, la paciente', en:'Inês, the patient', el:'η Ινές, η ασθενής' },
        ort:    { de:'in einer Arztpraxis in Zürich', es:'en una consulta médica de Zúrich', en:'in a doctor\'s practice in Zurich', el:'σε ένα ιατρείο στη Ζυρίχη' }
      },
      wortschatz: [
        { z:'das Handgelenk',     na:{ es:'la muñeca', en:'the wrist', el:'ο καρπός (του χεριού)' } },
        { z:'stürzen',            na:{ es:'caerse', en:'to fall', el:'πέφτω' } },
        { z:'geschwollen',        na:{ es:'hinchado', en:'swollen', el:'πρησμένος' } },
        { z:'verstaucht',         na:{ es:'torcido (un esguince)', en:'sprained', el:'στραμπουληγμένος' } },
        { z:'gebrochen',          na:{ es:'roto', en:'broken', el:'σπασμένος' } },
        { z:'röntgen',            na:{ es:'hacer una radiografía', en:'to X-ray', el:'βγάζω ακτινογραφία' } },
        { z:'der Verband',        na:{ es:'el vendaje', en:'the bandage', el:'ο επίδεσμος' } },
        { z:'schonen',            na:{ es:'no forzar, cuidar', en:'to rest, to go easy on', el:'προσέχω, δεν κουράζω' } },
        { z:'die Krankenkasse',   na:{ es:'el seguro médico', en:'the health insurance', el:'το ταμείο υγείας' } },
        { z:'das Velo (Schweiz)', na:{ es:'la bici (en Suiza)', en:'the bike (in Switzerland)', el:'το ποδήλατο (στην Ελβετία)' } },
        { z:'Grüezi (Schweiz)',   na:{ es:'hola, buenos días (en Suiza)', en:'hello (in Switzerland)', el:'γεια σας (στην Ελβετία)' } },
        { z:'merci vielmal (Schweiz)', na:{ es:'muchas gracias (en Suiza)', en:'thank you very much (in Switzerland)', el:'ευχαριστώ πολύ (στην Ελβετία)' } }
      ],
      dialog: {
        rolle: { es:'la doctora Meili', en:'Dr Meili, the doctor', el:'Η γιατρός Μάιλι' },
        zeilen: [
          { wer:'spikiu', z:'Grüezi, Frau Carvalho. Ich bin Doktor Meili. Was ist denn passiert?', na:{ es:'Buenos días, señora Carvalho. Soy la doctora Meili. ¿Qué le ha pasado?', en:'Hello, Ms Carvalho. I am Dr Meili. So what happened?', el:'Γεια σας, κυρία Καρβάλιο. Είμαι η γιατρός Μάιλι. Τι συνέβη;' } },
          { wer:'lerner', z:'Ich bin vorhin mit dem Velo gestürzt, und jetzt tut mir das rechte Handgelenk weh.', na:{ es:'Hace un rato me he caído de la bici, de la «Velo», y ahora me duele la muñeca derecha.', en:'I came off my bike — my "Velo" — a little while ago, and now my right wrist hurts.', el:'Πριν από λίγο έπεσα από το ποδήλατο, το «Velo», και τώρα με πονάει ο δεξιός καρπός.' } },
          { wer:'spikiu', z:'Ein Velounfall also — und Sie sagen schon Velo wie wir. Hm, das Handgelenk ist ziemlich geschwollen.', na:{ es:'Un accidente de «Velo», entonces, y ya dice usted «Velo» como nosotros. Mmm, la muñeca está bastante hinchada.', en:'A "Velo" accident, then — and you already say "Velo" like us. Hm, the wrist is quite swollen.', el:'Ατύχημα με «Velo» λοιπόν — και λέτε ήδη «Velo» όπως εμείς. Χμ, ο καρπός είναι αρκετά πρησμένος.' } },
          { wer:'lerner', z:'Wird die Hand geröntgt? Ich bin Cellistin und muss bald wieder spielen.', na:{ es:'¿Me van a hacer una radiografía de la mano? Soy violonchelista y tengo que volver a tocar pronto.', en:'Will my hand be X-rayed? I am a cellist and I need to play again soon.', el:'Θα βγάλουμε ακτινογραφία στο χέρι; Είμαι τσελίστρια και πρέπει να ξαναπαίξω σύντομα.' } },
          { wer:'spikiu', z:'Ja, sie wird gleich geröntgt. Ich glaube aber, es ist nur verstaucht. Sie sollen die Hand zwei Wochen schonen.', na:{ es:'Sí, ahora mismo le hacemos la radiografía. Pero creo que es solo un esguince. Tiene que reposar la mano dos semanas.', en:'Yes, it will be X-rayed right away. But I think it is only sprained. You should rest the hand for two weeks.', el:'Ναι, θα βγει ακτινογραφία αμέσως. Νομίζω όμως ότι είναι απλώς στραμπούληγμα. Πρέπει να ξεκουράσετε το χέρι δύο εβδομάδες.' } },
          { wer:'lerner', z:'Darf ich in dieser Zeit ein bisschen üben, oder soll ich ganz pausieren?', na:{ es:'¿Puedo ensayar un poco durante ese tiempo o debo parar del todo?', en:'May I practise a little during that time, or should I stop completely?', el:'Επιτρέπεται να κάνω λίγη εξάσκηση σε αυτό το διάστημα ή πρέπει να σταματήσω εντελώς;' } }
        ]
      },
      lesetext: {
        z:'In Zürich bin ich mit dem Velo gestürzt — so sagt man hier zum Fahrrad. Die Hand wurde geröntgt: nichts gebrochen, nur verstaucht. Frau Dr. Meili sagte, ich solle zwei Wochen nicht spielen. Also habe ich die Trams am See aufgenommen. Zum Abschied sagte ich: „Merci vielmal!“ Wort des Ortes: Velo.',
        na:{ es:'En Zúrich me caí de la «Velo»: así llaman aquí a la bici. Me hicieron una radiografía de la mano: nada roto, solo un esguince. La doctora Meili me dijo que no tocara durante dos semanas. Así que grabé los tranvías junto al lago. Al despedirme dije: «¡Merci vielmal!». Palabra del lugar: Velo.',
             en:'In Zurich I fell off my "Velo" — that is what they call a bike here. My hand was X-rayed: nothing broken, only sprained. Dr Meili said I should not play for two weeks. So I recorded the trams by the lake. When I left I said: "Merci vielmal!" Word of the place: Velo.',
             el:'Στη Ζυρίχη έπεσα από το «Velo» — έτσι λένε εδώ το ποδήλατο. Μου έβγαλαν ακτινογραφία στο χέρι: τίποτα σπασμένο, μόνο στραμπούληγμα. Η γιατρός Μάιλι είπε να μην παίξω για δύο εβδομάδες. Έτσι ηχογράφησα τα τραμ δίπλα στη λίμνη. Φεύγοντας είπα: «Merci vielmal!». Η λέξη του τόπου: Velo.' },
        frage:{ es:'¿Qué hizo Inês en lugar de tocar?', en:'What did Inês do instead of playing?', el:'Τι έκανε η Ινές αντί να παίξει;' },
        optionen:[
          { na:{ es:'Grabó los tranvías junto al lago', en:'She recorded the trams by the lake', el:'Ηχογράφησε τα τραμ δίπλα στη λίμνη' }, richtig:true },
          { na:{ es:'Se compró una bici nueva', en:'She bought a new bike', el:'Αγόρασε καινούργιο ποδήλατο' }, richtig:false },
          { na:{ es:'Dio un concierto en Zúrich', en:'She gave a concert in Zurich', el:'Έδωσε μια συναυλία στη Ζυρίχη' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Escribe lo que te dijo un médico: qué te hacen (pasiva con «wird») y qué debes o no puedes hacer. Dos frases.', en:'Write what a doctor told you: what is being done (passive with "wird") and what you should or may not do. Two sentences.', el:'Γράψε τι σου είπε ένας γιατρός: τι σου κάνουν (παθητική με «wird») και τι πρέπει ή δεν επιτρέπεται να κάνεις. Δύο προτάσεις.' },
        muster:'Mein Fuß wird morgen geröntgt. Ich soll viel liegen und darf keinen Sport machen.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'En la consulta importa lo que se hace, no quién lo hace — por eso la pasiva: «werden» + participio al final. «Die Hand wird geröntgt» (a la mano le hacen una radiografía). Y dos verbos pequeños: «sollen» es un consejo o una orden de otra persona (Sie sollen die Hand schonen); «dürfen» es un permiso (Darf ich üben?).', en:'At the doctor\'s what matters is what is done, not who does it — so German uses the passive: "werden" + participle at the end. "Die Hand wird geröntgt" (the hand is being X-rayed). And two little verbs: "sollen" is advice or an instruction from someone else (Sie sollen die Hand schonen); "dürfen" is permission (Darf ich üben?).', el:'Στον γιατρό μετράει τι γίνεται, όχι ποιος το κάνει — γι\' αυτό η παθητική φωνή: «werden» + μετοχή στο τέλος. «Die Hand wird geröntgt» (το χέρι ακτινογραφείται). Και δύο μικρά ρήματα: το «sollen» είναι συμβουλή ή εντολή από κάποιον άλλον (Sie sollen die Hand schonen)· το «dürfen» είναι άδεια (Darf ich üben?).' },
        beispiele:[
          { z:'Die Hand wird gleich geröntgt.', na:{ es:'Ahora mismo le hacen una radiografía de la mano.', en:'The hand is about to be X-rayed.', el:'Το χέρι θα ακτινογραφηθεί αμέσως.' } },
          { z:'Darf ich ein bisschen üben?', na:{ es:'¿Puedo ensayar un poco?', en:'May I practise a little?', el:'Επιτρέπεται να κάνω λίγη εξάσκηση;' } }
        ]
      },
      kultur: { es:'En Suiza se saluda con «Grüezi» y se da las gracias con «merci vielmal». En la calle se habla suizo alemán, pero se escribe alemán estándar, y sin «ß»: los suizos escriben «Strasse». Los tranvías azules y blancos de Zúrich circulan hasta la orilla del lago.',
                en:'In Switzerland people say "Grüezi" for hello and "merci vielmal" for thank you. On the street they speak Swiss German, but they write Standard German — and without "ß": the Swiss write "Strasse". Zurich\'s blue-and-white trams run right down to the lake.',
                el:'Στην Ελβετία χαιρετούν με «Grüezi» και ευχαριστούν με «merci vielmal». Στον δρόμο μιλούν ελβετογερμανικά, αλλά γράφουν πρότυπα γερμανικά — και χωρίς «ß»: οι Ελβετοί γράφουν «Strasse». Τα γαλανόλευκα τραμ της Ζυρίχης φτάνουν μέχρι την όχθη της λίμνης.' }
    },

    /* ── B1 · Bahnhof · München Hbf → Salzburg (Jun) ─────────────────── */
    'b1.bahnhof': {
      deineRolle: { de:'Du bist Inês. Deine S-Bahn hatte Verspätung, und als du am Gleis ankamst, war dein Zug nach Salzburg schon abgefahren. Du hattest einen Platz reserviert. Dona Amália, dein Cello, ist dabei.', es:'Eres Inês. Tu tren de cercanías llegó con retraso y, cuando llegaste al andén, tu tren a Salzburgo ya había salido. Habías reservado asiento. Llevas contigo a Dona Amália, tu violonchelo.', en:'You are Inês. Your S-Bahn was late, and when you reached the platform your train to Salzburg had already left. You had reserved a seat. Dona Amália, your cello, is with you.', el:'Είσαι η Ινές. Ο προαστιακός σου είχε καθυστέρηση και, όταν έφτασες στην αποβάθρα, το τρένο σου για το Σάλτσμπουργκ είχε ήδη φύγει. Είχες κλείσει θέση. Η Ντόνα Αμάλια, το τσέλο σου, είναι μαζί σου.' },
      abrundung: { z:'Ja, dafür gibt es ein Formular — das füllen wir gleich zusammen aus. Gute Fahrt nach Salzburg!', na:{ es:'Sí, para eso hay un formulario: lo rellenamos ahora juntas. ¡Buen viaje a Salzburgo!', en:'Yes, there is a form for that — we will fill it in together right now. Have a good trip to Salzburg!', el:'Ναι, γι\' αυτό υπάρχει ένα έντυπο — θα το συμπληρώσουμε μαζί αμέσως. Καλό ταξίδι στο Σάλτσμπουργκ!' } },
      rollen: {
        spikiu: { de:'die Mitarbeiterin im Reisezentrum', es:'la empleada del centro de viajes', en:'the agent at the travel centre', el:'η υπάλληλος στο γραφείο εξυπηρέτησης' },
        lerner: { de:'Inês, mit Cello', es:'Inês, con su violonchelo', en:'Inês, with her cello', el:'η Ινές, με το τσέλο της' },
        ort:    { de:'im Reisezentrum am Münchner Hauptbahnhof', es:'en el centro de viajes de la estación central de Múnich', en:'at the travel centre in Munich main station', el:'στο γραφείο εξυπηρέτησης του κεντρικού σταθμού του Μονάχου' }
      },
      wortschatz: [
        { z:'das Reisezentrum',   na:{ es:'el centro de viajes (venta y atención)', en:'the travel centre (ticket office)', el:'το γραφείο εισιτηρίων και εξυπηρέτησης' } },
        { z:'die Durchsage',      na:{ es:'el aviso por megafonía', en:'the announcement', el:'η ανακοίνωση από τα μεγάφωνα' } },
        { z:'war schon abgefahren', na:{ es:'ya había salido', en:'had already left', el:'είχε ήδη φύγει' } },
        { z:'ausfallen',          na:{ es:'cancelarse (un tren)', en:'to be cancelled', el:'ακυρώνεται (δρομολόγιο)' } },
        { z:'die Bauarbeiten',    na:{ es:'las obras', en:'the engineering works', el:'τα έργα' } },
        { z:'der Schienenersatzverkehr', na:{ es:'el servicio de autobuses que sustituye al tren', en:'the rail replacement service', el:'η αντικατάσταση τρένου με λεωφορεία' } },
        { z:'der Ersatzbus',      na:{ es:'el autobús de sustitución', en:'the replacement bus', el:'το λεωφορείο αντικατάστασης' } },
        { z:'der Anschluss',      na:{ es:'el enlace, la conexión', en:'the connection', el:'η ανταπόκριση' } },
        { z:'verpassen',          na:{ es:'perder (un tren)', en:'to miss', el:'χάνω (το τρένο)' } },
        { z:'die Reservierung',   na:{ es:'la reserva de asiento', en:'the seat reservation', el:'η κράτηση θέσης' } },
        { z:'gelten',             na:{ es:'ser válido', en:'to be valid', el:'ισχύει' } },
        { z:'Grüß Gott (Süddeutschland, Österreich)', na:{ es:'buenos días (en el sur de Alemania y en Austria)', en:'hello (in southern Germany and Austria)', el:'καλημέρα σας (στη νότια Γερμανία και στην Αυστρία)' } }
      ],
      dialog: {
        rolle: { es:'la empleada del centro de viajes', en:'the travel centre agent', el:'Η υπάλληλος στο γραφείο εξυπηρέτησης' },
        zeilen: [
          { wer:'spikiu', z:'Grüß Gott, die Nächste bitte. Was kann ich für Sie tun?', na:{ es:'Buenos días, la siguiente, por favor. ¿En qué puedo ayudarla?', en:'Hello, next please. What can I do for you?', el:'Καλημέρα σας, η επόμενη παρακαλώ. Τι μπορώ να κάνω για εσάς;' } },
          { wer:'lerner', z:'Als ich am Gleis ankam, war mein Zug nach Salzburg schon abgefahren.', na:{ es:'Cuando llegué al andén, mi tren a Salzburgo ya había salido.', en:'When I got to the platform, my train to Salzburg had already left.', el:'Όταν έφτασα στην αποβάθρα, το τρένο μου για το Σάλτσμπουργκ είχε ήδη φύγει.' } },
          { wer:'spikiu', z:'Das tut mir leid. Der nächste Zug fällt wegen Bauarbeiten aus. Ab Rosenheim fährt ein Ersatzbus.', na:{ es:'Lo siento. El próximo tren está cancelado por obras. Desde Rosenheim sale un autobús de sustitución.', en:'I am sorry. The next train is cancelled because of engineering works. From Rosenheim there is a replacement bus.', el:'Λυπάμαι. Το επόμενο τρένο ακυρώνεται λόγω έργων. Από το Ρόζενχαϊμ υπάρχει λεωφορείο αντικατάστασης.' } },
          { wer:'lerner', z:'Ein Ersatzbus? Ich habe ein großes Cello dabei. Passt das überhaupt in den Bus?', na:{ es:'¿Un autobús de sustitución? Llevo un violonchelo grande. ¿Cabe en el autobús?', en:'A replacement bus? I have a big cello with me. Will it even fit in the bus?', el:'Λεωφορείο αντικατάστασης; Έχω μαζί μου ένα μεγάλο τσέλο. Χωράει καν στο λεωφορείο;' } },
          { wer:'spikiu', z:'Das Cello kommt in den Gepäckraum oder auf einen freien Sitz. Ihre Fahrkarte gilt natürlich weiter.', na:{ es:'El violonchelo va en el maletero o en un asiento libre. Su billete, por supuesto, sigue siendo válido.', en:'The cello goes in the luggage hold or on a free seat. Your ticket is of course still valid.', el:'Το τσέλο μπαίνει στον χώρο αποσκευών ή σε μια ελεύθερη θέση. Το εισιτήριό σας φυσικά ισχύει.' } },
          { wer:'lerner', z:'Ich hatte meinen Platz schon reserviert. Bekomme ich das Geld dafür zurück?', na:{ es:'Ya había reservado mi asiento. ¿Me devuelven el dinero de la reserva?', en:'I had already reserved my seat. Will I get the money back for it?', el:'Είχα ήδη κλείσει θέση. Θα πάρω πίσω τα χρήματα γι\' αυτήν;' } }
        ]
      },
      lesetext: {
        z:'Am Münchner Hauptbahnhof klingen die Durchsagen fast wie Musik. Mein Zug war schon abgefahren, und der nächste fiel aus. Also fuhr ich ab Rosenheim mit dem Ersatzbus — Dona Amália hatte einen eigenen Sitz. Vorher spielte ich mit Vroni, einem Mädchen mit Tuba, zehn Minuten Musik. Wort des Ortes: Schienenersatzverkehr — das längste Wort meiner Reise.',
        na:{ es:'En la estación central de Múnich los avisos por megafonía suenan casi a música. Mi tren ya había salido y el siguiente se canceló. Así que desde Rosenheim fui en el autobús de sustitución: Dona Amália tenía su propio asiento. Antes toqué diez minutos de música con Vroni, una chica con una tuba. Palabra del lugar: Schienenersatzverkehr, la palabra más larga de mi viaje.',
             en:'At Munich main station the announcements sound almost like music. My train had already left, and the next one was cancelled. So from Rosenheim I took the replacement bus — Dona Amália had her own seat. Before that I played music for ten minutes with Vroni, a girl with a tuba. Word of the place: Schienenersatzverkehr — the longest word of my journey.',
             el:'Στον κεντρικό σταθμό του Μονάχου οι ανακοινώσεις ακούγονται σχεδόν σαν μουσική. Το τρένο μου είχε ήδη φύγει και το επόμενο ακυρώθηκε. Έτσι από το Ρόζενχαϊμ πήρα το λεωφορείο αντικατάστασης — η Ντόνα Αμάλια είχε δική της θέση. Πριν από αυτό έπαιξα δέκα λεπτά μουσική με τη Βρόνι, ένα κορίτσι με μια τούμπα. Η λέξη του τόπου: Schienenersatzverkehr — η πιο μεγάλη λέξη του ταξιδιού μου.' },
        frage:{ es:'¿Cómo siguió Inês el viaje desde Rosenheim?', en:'How did Inês continue from Rosenheim?', el:'Πώς συνέχισε η Ινές το ταξίδι από το Ρόζενχαϊμ;' },
        optionen:[
          { na:{ es:'En el autobús de sustitución', en:'By replacement bus', el:'Με το λεωφορείο αντικατάστασης' }, richtig:true },
          { na:{ es:'En taxi', en:'By taxi', el:'Με ταξί' }, richtig:false },
          { na:{ es:'En el siguiente tren', en:'On the next train', el:'Με το επόμενο τρένο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Cuenta un viaje en el que algo salió mal: qué ya había pasado cuando llegaste. Dos frases con «als» y el pluscuamperfecto.', en:'Tell about a journey where something went wrong: what had already happened when you arrived. Two sentences with "als" and the past perfect.', el:'Διηγήσου ένα ταξίδι όπου κάτι πήγε στραβά: τι είχε ήδη γίνει όταν έφτασες. Δύο προτάσεις με «als» και υπερσυντέλικο.' },
        muster:'Als ich zum Bahnhof kam, war der Bus schon abgefahren. Ich hatte meine Fahrkarte schon gekauft und musste eine Stunde warten.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'El pluscuamperfecto cuenta lo que pasó antes de otra cosa pasada: «war schon abgefahren», «hatte reserviert». Se forma igual que el perfecto, pero con «war» o «hatte»: los verbos de movimiento con «war», casi todos los demás con «hatte». Con «als» (cuando, una sola vez en el pasado) el verbo va al final.', en:'The past perfect tells what happened before something else in the past: "war schon abgefahren", "hatte reserviert". It is built like the perfect, but with "war" or "hatte": verbs of movement take "war", almost all others "hatte". With "als" (when, one time in the past) the verb goes to the end.', el:'Ο υπερσυντέλικος λέει τι είχε γίνει πριν από κάτι άλλο στο παρελθόν: «war schon abgefahren», «hatte reserviert». Φτιάχνεται όπως ο παρακείμενος, αλλά με «war» ή «hatte»: τα ρήματα κίνησης με «war», σχεδόν όλα τα άλλα με «hatte». Με το «als» (όταν, μία φορά στο παρελθόν) το ρήμα πηγαίνει στο τέλος.' },
        beispiele:[
          { z:'Als ich ankam, war der Zug schon abgefahren.', na:{ es:'Cuando llegué, el tren ya había salido.', en:'When I arrived, the train had already left.', el:'Όταν έφτασα, το τρένο είχε ήδη φύγει.' } },
          { z:'Ich hatte meinen Platz reserviert.', na:{ es:'Había reservado mi asiento.', en:'I had reserved my seat.', el:'Είχα κλείσει τη θέση μου.' } }
        ]
      },
      kultur: { es:'De Múnich a Salzburgo se tarda en tren alrededor de hora y media, pasando junto al lago Chiemsee. «Schienenersatzverkehr» (SEV) significa que, cuando hay obras en la vía, van autobuses en lugar de trenes: una palabra larguísima que todo viajero en Alemania acaba aprendiendo. En Baviera se saluda con «Grüß Gott».',
                en:'The train from Munich to Salzburg takes about an hour and a half and passes Lake Chiemsee. "Schienenersatzverkehr" (SEV) means that when there are works on the line, buses run instead of trains — a very long word every traveller in Germany learns sooner or later. In Bavaria people greet you with "Grüß Gott".',
                el:'Από το Μόναχο στο Σάλτσμπουργκ το τρένο κάνει περίπου μιάμιση ώρα και περνά δίπλα από τη λίμνη Κίμζε. «Schienenersatzverkehr» (SEV) σημαίνει ότι, όταν γίνονται έργα στη γραμμή, κυκλοφορούν λεωφορεία αντί για τρένα — μια πολύ μεγάλη λέξη που κάθε ταξιδιώτης στη Γερμανία μαθαίνει κάποια στιγμή. Στη Βαυαρία χαιρετούν με «Grüß Gott».' }
    },

    /* ── B1 · Taxi · Salzburg, Festspiele · Herr Pichler (Jul) ───────── */
    'b1.taxi': {
      deineRolle: { de:'Du bist Inês und fährst mit Dona Amália, deinem Cello, im Taxi zum Residenzplatz. Du spielst nicht bei den Festspielen — morgen früh um sieben nimmst du das Glockenspiel für dein Album auf. Salzburg gefällt dir sehr.', es:'Eres Inês y vas en taxi con Dona Amália, tu violonchelo, a la Residenzplatz. No tocas en el festival: mañana a las siete grabarás el carillón para tu álbum. Salzburgo te gusta muchísimo.', en:'You are Inês, taking a taxi with Dona Amália, your cello, to the Residenzplatz. You are not playing at the festival — tomorrow at seven you are recording the carillon for your album. You love Salzburg.', el:'Είσαι η Ινές και πηγαίνεις με ταξί, μαζί με την Ντόνα Αμάλια, το τσέλο σου, στη Residenzplatz. Δεν παίζεις στο φεστιβάλ — αύριο στις εφτά θα ηχογραφήσεις το καριγιόν για το άλμπουμ σου. Το Σάλτσμπουργκ σού αρέσει πολύ.' },
      abrundung: { z:'Recht haben Sie! So, Residenzplatz. Und morgen um sieben: Glockenspiel ohne Touristen. Servus!', na:{ es:'¡Tiene razón! Bueno, la Residenzplatz. Y mañana a las siete: carillón sin turistas. ¡Adiós!', en:'Quite right! Here we are, Residenzplatz. And tomorrow at seven: the carillon without tourists. Bye!', el:'Έχετε δίκιο! Λοιπόν, Residenzplatz. Κι αύριο στις εφτά: καριγιόν χωρίς τουρίστες. Γεια σας!' } },
      rollen: {
        spikiu: { de:'Herr Pichler, der Taxifahrer', es:'el señor Pichler, el taxista', en:'Mr Pichler, the taxi driver', el:'ο κύριος Πίχλερ, ο ταξιτζής' },
        lerner: { de:'Inês, der Fahrgast', es:'Inês, la pasajera', en:'Inês, the passenger', el:'η Ινές, η επιβάτισσα' },
        ort:    { de:'in einem Taxi in Salzburg', es:'en un taxi en Salzburgo', en:'in a taxi in Salzburg', el:'σε ένα ταξί στο Σάλτσμπουργκ' }
      },
      wortschatz: [
        { z:'Servus! (Österreich, Bayern)', na:{ es:'¡hola! / ¡adiós! (en Austria y Baviera)', en:'hi! / bye! (in Austria and Bavaria)', el:'γεια! (στην Αυστρία και στη Βαυαρία)' } },
        { z:'der Jänner (Österreich)', na:{ es:'enero (en Austria)', en:'January (in Austria)', el:'ο Ιανουάριος (στην Αυστρία)' } },
        { z:'der Paradeiser (Österreich)', na:{ es:'el tomate (en Austria)', en:'the tomato (in Austria)', el:'η ντομάτα (στην Αυστρία)' } },
        { z:'die Festspiele',     na:{ es:'el festival (de música y teatro)', en:'the festival', el:'το φεστιβάλ' } },
        { z:'das Glockenspiel',   na:{ es:'el carillón', en:'the carillon', el:'το καριγιόν (καμπαναριό με μελωδίες)' } },
        { z:'die Altstadt',       na:{ es:'el casco antiguo', en:'the old town', el:'η παλιά πόλη' } },
        { z:'Schön wär\'s!',      na:{ es:'¡ojalá!', en:'I wish!', el:'μακάρι!' } },
        { z:'ich würde …',        na:{ es:'yo + condicional (iría, viviría …)', en:'I would …', el:'θα … (υποθετικά)' } },
        { z:'ich wäre',           na:{ es:'yo sería, yo estaría', en:'I would be', el:'θα ήμουν' } },
        { z:'ich hätte',          na:{ es:'yo tendría', en:'I would have', el:'θα είχα' } },
        { z:'sich vorstellen',    na:{ es:'imaginarse', en:'to imagine', el:'φαντάζομαι' } },
        { z:'rechtzeitig',        na:{ es:'a tiempo', en:'in time', el:'εγκαίρως' } }
      ],
      dialog: {
        rolle: { es:'el señor Pichler, el taxista', en:'Mr Pichler, the taxi driver', el:'Ο κύριος Πίχλερ, ο ταξιτζής' },
        zeilen: [
          { wer:'spikiu', z:'Servus! Zum Residenzplatz? Und mit Cello — Sie spielen sicher bei den Festspielen!', na:{ es:'¡Hola! ¿A la Residenzplatz? Y con violonchelo: ¡seguro que toca en el festival!', en:'Hi! To the Residenzplatz? And with a cello — you must be playing at the festival!', el:'Γεια σας! Στη Residenzplatz; Και με τσέλο — σίγουρα παίζετε στο φεστιβάλ!' } },
          { wer:'lerner', z:'Schön wär\'s! Ich nehme nur Klänge für ein Album auf — morgen früh das Glockenspiel.', na:{ es:'¡Ojalá! Solo grabo sonidos para un álbum: mañana temprano, el carillón.', en:'I wish! I am just recording sounds for an album — tomorrow morning, the carillon.', el:'Μακάρι! Απλώς ηχογραφώ ήχους για ένα άλμπουμ — αύριο πρωί πρωί το καριγιόν.' } },
          { wer:'spikiu', z:'Um sieben in der Früh ist es am schönsten. Sagen Sie, was würden Sie machen, wenn Sie hier leben würden?', na:{ es:'A las siete de la mañana es cuando más bonito suena. Dígame, ¿qué haría usted si viviera aquí?', en:'At seven in the morning it is at its loveliest. Tell me, what would you do if you lived here?', el:'Στις εφτά το πρωί είναι το πιο όμορφο. Πείτε μου, τι θα κάνατε αν ζούσατε εδώ;' } },
          { wer:'lerner', z:'Wenn ich hier leben würde, würde ich jeden Sommer zu den Festspielen gehen.', na:{ es:'Si viviera aquí, iría al festival todos los veranos.', en:'If I lived here, I would go to the festival every summer.', el:'Αν ζούσα εδώ, θα πήγαινα στο φεστιβάλ κάθε καλοκαίρι.' } },
          { wer:'spikiu', z:'Im Sommer schon. Aber im Jänner — so sagen wir zum Januar — wäre es Ihnen hier sicher zu kalt.', na:{ es:'En verano, sí. Pero en «Jänner» —así decimos aquí a enero— seguro que aquí le haría demasiado frío.', en:'In summer, sure. But in "Jänner" — that is what we call January — it would surely be too cold for you here.', el:'Το καλοκαίρι, ναι. Αλλά τον «Jänner» — έτσι λέμε εδώ τον Ιανουάριο — σίγουρα θα σας έκανε πολύ κρύο.' } },
          { wer:'lerner', z:'Das wäre kein Problem. Ich hätte ja mein Cello und viel Zeit zum Üben.', na:{ es:'Eso no sería un problema. Tendría mi violonchelo y mucho tiempo para ensayar.', en:'That would not be a problem. I would have my cello and lots of time to practise.', el:'Αυτό δεν θα ήταν πρόβλημα. Θα είχα το τσέλο μου και πολύ χρόνο για εξάσκηση.' } }
        ]
      },
      lesetext: {
        z:'Der Taxifahrer, Herr Pichler, sagte zuerst „Servus“ und erzählte dann vom Markt: Dort kauft seine Frau die besten Paradeiser — so heißen hier die Tomaten. Am nächsten Morgen um sieben nahm ich das Glockenspiel auf. Ich glaube, ich würde gern einen ganzen Sommer hier leben. Wort des Ortes: Paradeiser.',
        na:{ es:'El taxista, el señor Pichler, primero dijo «Servus» y luego me habló del mercado: allí su mujer compra los mejores «Paradeiser», que es como llaman aquí a los tomates. A la mañana siguiente, a las siete, grabé el carillón. Creo que me gustaría vivir aquí un verano entero. Palabra del lugar: Paradeiser.',
             en:'The taxi driver, Mr Pichler, first said "Servus" and then told me about the market: that is where his wife buys the best "Paradeiser" — that is what tomatoes are called here. The next morning at seven I recorded the carillon. I think I would like to live here for a whole summer. Word of the place: Paradeiser.',
             el:'Ο ταξιτζής, ο κύριος Πίχλερ, είπε πρώτα «Servus» και μετά μου μίλησε για την αγορά: εκεί η γυναίκα του αγοράζει τις καλύτερες «Paradeiser» — έτσι λένε εδώ τις ντομάτες. Το επόμενο πρωί στις εφτά ηχογράφησα το καριγιόν. Νομίζω ότι θα ήθελα να ζήσω εδώ ένα ολόκληρο καλοκαίρι. Η λέξη του τόπου: Paradeiser.' },
        frage:{ es:'¿Qué son los «Paradeiser»?', en:'What are "Paradeiser"?', el:'Τι είναι οι «Paradeiser»;' },
        optionen:[
          { na:{ es:'Tomates', en:'Tomatoes', el:'Ντομάτες' }, richtig:true },
          { na:{ es:'Campanas', en:'Bells', el:'Καμπάνες' }, richtig:false },
          { na:{ es:'Taxis', en:'Taxis', el:'Ταξί' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Imagina que vives un año en una ciudad que te encanta. ¿Qué harías? Dos frases con «würde», «wäre» o «hätte».', en:'Imagine you live for a year in a city you love. What would you do? Two sentences with "würde", "wäre" or "hätte".', el:'Φαντάσου ότι ζεις έναν χρόνο σε μια πόλη που αγαπάς. Τι θα έκανες; Δύο προτάσεις με «würde», «wäre» ή «hätte».' },
        muster:'Wenn ich in Salzburg leben würde, würde ich jeden Tag in die Altstadt gehen. Ich hätte ein kleines Zimmer mit Blick auf die Berge.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Para soñar e imaginar, el alemán usa el Konjunktiv II. Casi siempre basta con «würde» + infinitivo al final: «Ich würde jeden Sommer hingehen». Solo «sein» y «haben» tienen forma propia muy usada: «wäre» y «hätte». En la frase con «wenn» el verbo va al final: «Wenn ich hier leben würde, …».', en:'To dream and imagine, German uses Konjunktiv II. Almost always "würde" + infinitive at the end is enough: "Ich würde jeden Sommer hingehen". Only "sein" and "haben" have their own very common forms: "wäre" and "hätte". In the "wenn" clause the verb goes to the end: "Wenn ich hier leben würde, …".', el:'Για να ονειρευτούν και να φανταστούν, τα γερμανικά χρησιμοποιούν τον Konjunktiv II. Σχεδόν πάντα αρκεί «würde» + απαρέμφατο στο τέλος: «Ich würde jeden Sommer hingehen». Μόνο το «sein» και το «haben» έχουν δικές τους πολύ συχνές μορφές: «wäre» και «hätte». Στην πρόταση με «wenn» το ρήμα πηγαίνει στο τέλος: «Wenn ich hier leben würde, …».' },
        beispiele:[
          { z:'Wenn ich hier leben würde, würde ich jeden Sommer zu den Festspielen gehen.', na:{ es:'Si viviera aquí, iría al festival todos los veranos.', en:'If I lived here, I would go to the festival every summer.', el:'Αν ζούσα εδώ, θα πήγαινα στο φεστιβάλ κάθε καλοκαίρι.' } },
          { z:'Das wäre kein Problem.', na:{ es:'Eso no sería un problema.', en:'That would not be a problem.', el:'Αυτό δεν θα ήταν πρόβλημα.' } }
        ]
      },
      kultur: { es:'Salzburgo es la ciudad natal de Mozart, y desde 1920 celebra cada verano su gran festival de música y teatro. El carillón de la Residenzplatz suena varias veces al día, a menudo con melodías de Mozart. El alemán de Austria tiene palabras propias: «Jänner» (enero), «Paradeiser» (tomate), «Erdäpfel» (patatas).',
                en:'Salzburg is Mozart\'s birthplace, and since 1920 it has held its great music and theatre festival every summer. The carillon on the Residenzplatz plays several times a day, often tunes by Mozart. Austrian German has its own words: "Jänner" (January), "Paradeiser" (tomato), "Erdäpfel" (potatoes).',
                el:'Το Σάλτσμπουργκ είναι η γενέτειρα του Μότσαρτ, και από το 1920 κάθε καλοκαίρι γιορτάζει το μεγάλο του φεστιβάλ μουσικής και θεάτρου. Το καριγιόν στη Residenzplatz παίζει αρκετές φορές τη μέρα, συχνά μελωδίες του Μότσαρτ. Τα αυστριακά γερμανικά έχουν δικές τους λέξεις: «Jänner» (Ιανουάριος), «Paradeiser» (ντομάτα), «Erdäpfel» (πατάτες).' }
    },

    /* ── B1 · Wegbeschreibung · Wien · Herr Doktor Hofbauer (Jul) ────── */
    'b1.wegbeschreibung': {
      deineRolle: { de:'Du bist Inês. Nach einem Konzert im Musikverein fragst du einen älteren Herrn nach dem Weg: Morgen möchtest du Beethovens Grab auf dem Zentralfriedhof besuchen. Rui, dein Produzent in Lissabon, wartet auf eine Nachricht.', es:'Eres Inês. Después de un concierto en el Musikverein le preguntas el camino a un señor mayor: mañana quieres visitar la tumba de Beethoven en el Cementerio Central. Rui, tu productor en Lisboa, espera un mensaje tuyo.', en:'You are Inês. After a concert at the Musikverein you ask an elderly gentleman the way: tomorrow you want to visit Beethoven\'s grave at the Central Cemetery. Rui, your producer in Lisbon, is waiting for a message.', el:'Είσαι η Ινές. Μετά από μια συναυλία στο Musikverein ρωτάς έναν ηλικιωμένο κύριο τον δρόμο: αύριο θέλεις να επισκεφθείς τον τάφο του Μπετόβεν στο Κεντρικό Νεκροταφείο. Ο Ρούι, ο παραγωγός σου στη Λισαβόνα, περιμένει ένα μήνυμά σου.' },
      abrundung: { z:'Grüßen Sie ihn von mir. Und sagen Sie ihm, in Wien ist sogar die Stille musikalisch. Habe die Ehre!', na:{ es:'Salúdelo de mi parte. Y dígale que en Viena hasta el silencio es musical. ¡Mis respetos!', en:'Give him my regards. And tell him that in Vienna even the silence is musical. My respects!', el:'Χαιρετίσματα από μένα. Και πείτε του ότι στη Βιέννη ακόμα και η σιωπή είναι μουσική. Τα σέβη μου!' } },
      rollen: {
        spikiu: { de:'Herr Doktor Hofbauer, ein alter Wiener Herr', es:'el señor doctor Hofbauer, un caballero vienés mayor', en:'Herr Doktor Hofbauer, an elderly Viennese gentleman', el:'ο κύριος δόκτωρ Χόφμπαουερ, ένας ηλικιωμένος Βιεννέζος κύριος' },
        lerner: { de:'Inês, nach dem Konzert', es:'Inês, después del concierto', en:'Inês, after the concert', el:'η Ινές, μετά τη συναυλία' },
        ort:    { de:'vor dem Musikverein in Wien', es:'delante del Musikverein, en Viena', en:'outside the Musikverein in Vienna', el:'έξω από το Musikverein, στη Βιέννη' }
      },
      wortschatz: [
        { z:'die Straßenbahn',    na:{ es:'el tranvía', en:'the tram', el:'το τραμ' } },
        { z:'die Bim (Wien)',     na:{ es:'el tranvía (en Viena)', en:'the tram (in Vienna)', el:'το τραμ (στη Βιέννη)' } },
        { z:'aussteigen',         na:{ es:'bajarse', en:'to get off', el:'κατεβαίνω (από όχημα)' } },
        { z:'das Tor',            na:{ es:'la puerta (grande), la entrada', en:'the gate', el:'η πύλη' } },
        { z:'geradeaus',          na:{ es:'todo recto', en:'straight on', el:'ευθεία' } },
        { z:'das Grab',           na:{ es:'la tumba', en:'the grave', el:'ο τάφος' } },
        { z:'das Ehrengrab',      na:{ es:'la tumba de honor', en:'the grave of honour', el:'ο τιμητικός τάφος' } },
        { z:'der Vormittag',      na:{ es:'la mañana (hasta mediodía)', en:'the morning', el:'το πρωί (ως το μεσημέρι)' } },
        { z:'die Stille',         na:{ es:'el silencio', en:'the silence', el:'η σιωπή' } },
        { z:'ausrichten',         na:{ es:'dar un recado', en:'to pass on (a message)', el:'μεταφέρω (ένα μήνυμα)' } },
        { z:'er sagt, ich solle …', na:{ es:'dice que (yo) … (estilo indirecto)', en:'he says I should …', el:'λέει να … (πλάγιος λόγος)' } },
        { z:'Habe die Ehre! (Wien)', na:{ es:'¡mis respetos! (saludo vienés)', en:'my respects! (Viennese greeting)', el:'τα σέβη μου! (βιεννέζικος χαιρετισμός)' } }
      ],
      dialog: {
        rolle: { es:'el señor doctor Hofbauer', en:'Herr Doktor Hofbauer', el:'Ο κύριος δόκτωρ Χόφμπαουερ' },
        zeilen: [
          { wer:'spikiu', z:'Habe die Ehre, gnädige Frau. Ein schönes Konzert, nicht wahr? Kann ich Ihnen helfen?', na:{ es:'Mis respetos, señora. Un concierto precioso, ¿verdad? ¿Puedo ayudarla?', en:'My respects, madam. A lovely concert, wasn\'t it? Can I help you?', el:'Τα σέβη μου, κυρία μου. Ωραία συναυλία, έτσι δεν είναι; Μπορώ να σας βοηθήσω;' } },
          { wer:'lerner', z:'Guten Abend! Morgen möchte ich Beethovens Grab besuchen. Wie komme ich zum Zentralfriedhof?', na:{ es:'¡Buenas noches! Mañana quiero visitar la tumba de Beethoven. ¿Cómo llego al Cementerio Central?', en:'Good evening! Tomorrow I would like to visit Beethoven\'s grave. How do I get to the Central Cemetery?', el:'Καλησπέρα! Αύριο θέλω να επισκεφθώ τον τάφο του Μπετόβεν. Πώς πάω στο Κεντρικό Νεκροταφείο;' } },
          { wer:'spikiu', z:'Nehmen Sie am Schwarzenbergplatz die Bim, also die Straßenbahn, Linie 71. Steigen Sie beim zweiten Tor aus.', na:{ es:'Coja en la Schwarzenbergplatz la «Bim», es decir, el tranvía, línea 71. Bájese en la segunda puerta.', en:'At Schwarzenbergplatz take the "Bim", that is the tram, line 71. Get off at the second gate.', el:'Στη Schwarzenbergplatz πάρτε το «Bim», δηλαδή το τραμ, γραμμή 71. Κατεβείτε στη δεύτερη πύλη.' } },
          { wer:'lerner', z:'Sie sagen also, ich solle die 71 nehmen und beim zweiten Tor aussteigen?', na:{ es:'¿O sea, que me dice que coja el 71 y me baje en la segunda puerta?', en:'So you are saying I should take the 71 and get off at the second gate?', el:'Δηλαδή λέτε να πάρω το 71 και να κατέβω στη δεύτερη πύλη;' } },
          { wer:'spikiu', z:'Ganz genau. Dann geradeaus bis zu den Ehrengräbern. Gehen Sie am Vormittag, da ist es still.', na:{ es:'Exacto. Luego todo recto hasta las tumbas de honor. Vaya por la mañana: entonces hay silencio.', en:'Exactly. Then straight on to the graves of honour. Go in the morning, it is quiet then.', el:'Ακριβώς. Μετά ευθεία μέχρι τους τιμητικούς τάφους. Πηγαίνετε το πρωί, τότε έχει ησυχία.' } },
          { wer:'lerner', z:'Danke! Ich schreibe Rui gleich: Der Herr Doktor sagt, ich solle am Vormittag hingehen.', na:{ es:'¡Gracias! Ahora mismo le escribo a Rui: el señor doctor dice que vaya por la mañana.', en:'Thank you! I will text Rui right away: the Herr Doktor says I should go in the morning.', el:'Ευχαριστώ! Θα γράψω αμέσως στον Ρούι: ο κύριος δόκτωρ λέει να πάω το πρωί.' } }
        ]
      },
      lesetext: {
        z:'Herr Doktor Hofbauer sagte, ich solle die Bim nehmen — so nennen die Wiener die Straßenbahn. Am Vormittag stand ich vor Beethovens Grab. Es war so still, dass ich nur die Vögel hörte. Neben dem Grab saß ein Hase, genau wie der Herr Doktor gesagt hatte. Zum Abschied hatte er „Baba“ gesagt. Wort des Ortes: Baba — so sagen die Wiener „Tschüss“.',
        na:{ es:'El señor doctor Hofbauer me dijo que cogiera la «Bim»: así llaman los vieneses al tranvía. Por la mañana estaba delante de la tumba de Beethoven. Había tanto silencio que solo oía a los pájaros. Junto a la tumba había una liebre, tal como había dicho el señor doctor. Al despedirse, él me había dicho «Baba». Palabra del lugar: Baba, así dicen «adiós» los vieneses.',
             en:'Herr Doktor Hofbauer said I should take the "Bim" — that is what the Viennese call the tram. In the morning I stood in front of Beethoven\'s grave. It was so quiet that I could only hear the birds. Next to the grave sat a hare, just as the Herr Doktor had said. When we said goodbye, he had said "Baba". Word of the place: Baba — that is how the Viennese say "bye".',
             el:'Ο κύριος δόκτωρ Χόφμπαουερ μου είπε να πάρω το «Bim» — έτσι λένε οι Βιεννέζοι το τραμ. Το πρωί στεκόμουν μπροστά στον τάφο του Μπετόβεν. Είχε τόση ησυχία που άκουγα μόνο τα πουλιά. Δίπλα στον τάφο καθόταν ένας λαγός, όπως ακριβώς είχε πει ο κύριος δόκτωρ. Στον αποχαιρετισμό μού είχε πει «Baba». Η λέξη του τόπου: Baba — έτσι λένε οι Βιεννέζοι το «γεια».' },
        frage:{ es:'¿Qué vio Inês junto a la tumba de Beethoven?', en:'What did Inês see next to Beethoven\'s grave?', el:'Τι είδε η Ινές δίπλα στον τάφο του Μπετόβεν;' },
        optionen:[
          { na:{ es:'Una liebre', en:'A hare', el:'Έναν λαγό' }, richtig:true },
          { na:{ es:'Un concierto', en:'A concert', el:'Μια συναυλία' }, richtig:false },
          { na:{ es:'El tranvía', en:'The tram', el:'Το τραμ' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Cuéntale a un amigo el camino que te explicó alguien, con «er/sie sagt, ich solle …». Dos frases.', en:'Tell a friend the way someone explained to you, with "er/sie sagt, ich solle …". Two sentences.', el:'Πες σε έναν φίλο τον δρόμο που σου εξήγησε κάποιος, με «er/sie sagt, ich solle …». Δύο προτάσεις.' },
        muster:'Die Frau sagt, ich solle mit der U-Bahn fahren. Sie sagt, ich solle am Stephansplatz aussteigen.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you', el:'Γραμματική, κατευθείαν στο ψητό' },
        text:{ es:'Indicaciones en imperativo con «Sie»: el verbo va delante y «Sie» detrás: «Nehmen Sie die 71», «Steigen Sie aus». Para contarlas a otra persona, el alemán usa el estilo indirecto: «Er sagt, ich solle die 71 nehmen». «Solle» es el Konjunktiv I de «sollen»: suena un poco culto. En la conversación también se oye «Er sagt, ich soll …».', en:'Directions in the "Sie" imperative: verb first, "Sie" after it: "Nehmen Sie die 71", "Steigen Sie aus". To pass them on, German uses reported speech: "Er sagt, ich solle die 71 nehmen". "Solle" is the Konjunktiv I of "sollen" and sounds a little educated. In conversation you also hear "Er sagt, ich soll …".', el:'Οδηγίες σε προστακτική με «Sie»: πρώτα το ρήμα, μετά το «Sie»: «Nehmen Sie die 71», «Steigen Sie aus». Για να τις μεταφέρεις σε άλλον, τα γερμανικά χρησιμοποιούν πλάγιο λόγο: «Er sagt, ich solle die 71 nehmen». Το «solle» είναι ο Konjunktiv I του «sollen» και ακούγεται λίγο καλλιεργημένο. Στην κουβέντα ακούς και «Er sagt, ich soll …».' },
        beispiele:[
          { z:'Steigen Sie beim zweiten Tor aus.', na:{ es:'Bájese en la segunda puerta.', en:'Get off at the second gate.', el:'Κατεβείτε στη δεύτερη πύλη.' } },
          { z:'Er sagt, ich solle am Vormittag hingehen.', na:{ es:'Dice que vaya por la mañana.', en:'He says I should go in the morning.', el:'Λέει να πάω το πρωί.' } }
        ]
      },
      kultur: { es:'El Cementerio Central de Viena es uno de los más grandes de Europa. En las tumbas de honor descansan Beethoven, Schubert, Brahms y Johann Strauss; Mozart tiene allí un monumento. Los vieneses llaman al tranvía «Bim», por el sonido de su campanilla. Desde la Sala Dorada del Musikverein se transmite cada 1 de enero el Concierto de Año Nuevo.',
                en:'Vienna\'s Central Cemetery is one of the largest in Europe. Beethoven, Schubert, Brahms and Johann Strauss rest in its graves of honour; Mozart has a memorial there. The Viennese call the tram the "Bim", after the sound of its bell. Every 1 January the New Year\'s Concert is broadcast from the Golden Hall of the Musikverein.',
                el:'Το Κεντρικό Νεκροταφείο της Βιέννης είναι από τα μεγαλύτερα της Ευρώπης. Στους τιμητικούς τάφους του αναπαύονται ο Μπετόβεν, ο Σούμπερτ, ο Μπραμς και ο Γιόχαν Στράους· ο Μότσαρτ έχει εκεί ένα μνημείο. Οι Βιεννέζοι λένε το τραμ «Bim», από τον ήχο του κουδουνιού του. Κάθε 1η Ιανουαρίου μεταδίδεται από τη Χρυσή Αίθουσα του Musikverein η Πρωτοχρονιάτικη Συναυλία.' }
    }
  }
};

  [K_LP_A, K_LP_B].forEach(function (F) {
    Object.keys(F.schritt).forEach(function (t) { if (SCHRITT[t]) SCHRITT[t].b1 = F.schritt[t]; });
    Object.keys(F.aufgaben).forEach(function (k) { AUFGABEN[k] = F.aufgaben[k]; });
    Object.keys(F.stationen).forEach(function (k) { STATIONEN[k] = F.stationen[k]; });
  });

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
