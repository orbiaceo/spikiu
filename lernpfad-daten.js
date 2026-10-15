/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — LERNPFAD-DATEN (Spanisch)
   Statische Datei. NULL Token. Wird von allen Räumen gelesen.

   Der BAUM ist fest und für alle Lerner gleich.
   Persönlich ist nur der WEG hindurch (spikiu_pfad in localStorage).

   Struktur:  STATIONEN['<stufe>.<thema>']  =  eine Station
   Themen-IDs sind die aus szenen.js — haeppchen-db.js und gefuehrt.html
   laufen unverändert weiter.

   SPRACHNEUTRALE SCHLÜSSEL (Gesetz aus dem Lernroman):
     z  = Zielsprache (hier Spanisch)
     na = Muttersprachen als Objekt { de, en, el }
   Ein spanischer Inhalt bedient den deutschen UND den englischen Lerner.
   Bei vier Zielsprachen ist das der Unterschied zwischen 20 und 60 Dateien.

   SPANISCH-REGEL (Leo, 29.08.2026): Wo Lateinamerika viele Varianten kennt,
   gilt die Form aus SPANIEN. Also echar de menos (nicht extrañar), el billete
   (nicht boleto), la patata (nicht papa), dos calles (nicht cuadras),
   el ticket im Laden, la tarta im Café. Voseo/rioplatense bleibt ausgeschlossen.

   AUFGABEN tragen jetzt drei Sprachen { de, es, en } — ein Mexikaner, der
   hier übt, braucht die Anweisung auf Spanisch.

   ERÖFFNUNG und ABRUNDUNG (neu, 29.08.2026): Der Skript-Dialog beginnt in
   10 von 20 Stationen mit dem LERNER. Die Szene ließ aber Spikiu zuerst
   sprechen — damit war Aufgabe 1 tot, bevor der Lerner tippte. Diese zehn
   Stationen haben nun eine eigene eroeffnung. Und weil die Szene nach der
   dritten Aufgabe abbrach, hat jede Station eine abrundung: Spikius letzte
   Reaktion, bevor der Ausgang erscheint (R6 aus szene-regeln.md).

   Stand: 29.08.2026 — A1 und A2 vollständig (Spanisch), mit Eröffnung,
   Abrundung und dreisprachigen Aufgaben.
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  /* ── Die Spalten des Baums ────────────────────────────────────────── */
  var THEMEN = [
    { id:'cafe',            em:'☕',  na:{ de:'Im Café',             en:'At the café', el:'Στο καφέ' } },
    { id:'restaurant',      em:'🍽️', na:{ de:'Im Restaurant',       en:'At the restaurant', el:'Στο εστιατόριο' } },
    { id:'einkaufen',       em:'🛒', na:{ de:'Einkaufen',           en:'Shopping', el:'Ψώνια' } },
    { id:'wegbeschreibung', em:'🧭', na:{ de:'Nach dem Weg fragen', en:'Asking directions', el:'Ρωτώντας τον δρόμο' } },
    { id:'taxi',            em:'🚕', na:{ de:'Im Taxi',             en:'In the taxi', el:'Στο ταξί' } },
    { id:'familie',         em:'👪', na:{ de:'Über die Familie',    en:'About family', el:'Για την οικογένεια' } },
    { id:'hotel',           em:'🏨', na:{ de:'Im Hotel',            en:'At the hotel', el:'Στο ξενοδοχείο' } },
    { id:'bahnhof',         em:'🚉', na:{ de:'Am Bahnhof',          en:'At the station', el:'Στον σταθμό' } },
    { id:'arzt',            em:'🩺', na:{ de:'Beim Arzt',           en:'At the doctor', el:'Στον γιατρό' } },
    { id:'wetter',          em:'🌤️', na:{ de:'Über das Wetter',     en:'About the weather', el:'Για τον καιρό' } }
  ];

  var STUFEN = ['a1', 'a2'];

  /* ── Die Gruppen ──────────────────────────────────────────────────────
     Zwei Ebenen statt einer langen Liste. Bei 10 Stationen kostet das
     einen Tipp; bei 20 (A1+A2) oder 40 (bis B2) hält es die Auswahl kurz.
     Jedes Thema liegt in genau einer Gruppe — geprüft, keine Dopplung. */
  var KATEGORIEN = [
    { id:'essen',     em:'🍽️', na:{ de:'Essen & Trinken', en:'Food & Drink', el:'Φαγητό & ποτό' },
      themen:['cafe','restaurant'] },
    { id:'unterwegs', em:'🧳', na:{ de:'Unterwegs',       en:'Getting around', el:'Στον δρόμο' },
      themen:['wegbeschreibung','taxi','bahnhof','hotel'] },
    { id:'alltag',    em:'🛒', na:{ de:'Alltag',          en:'Everyday life', el:'Καθημερινότητα' },
      themen:['einkaufen','wetter'] },
    { id:'menschen',  em:'👥', na:{ de:'Menschen',        en:'People', el:'Άνθρωποι' },
      themen:['familie','arzt'] }
  ];

  /* Dasselbe Thema, andere Handlung je Stufe. */
  var SCHRITT = {
    cafe:            { a1:{ de:'bestellen, bezahlen',        en:'ordering, paying', el:'παραγγελία, πληρωμή' },
                       a2:{ de:'reklamieren, nach Zutaten fragen', en:'complaining, asking about ingredients', el:'παράπονο, ερωτήσεις για τα υλικά' } },
    restaurant:      { a1:{ de:'ein Tisch, die Karte',       en:'a table, the menu', el:'ένα τραπέζι, ο κατάλογος' },
                       a2:{ de:'empfehlen lassen, teilen, Trinkgeld', en:'recommendations, sharing, tipping', el:'προτάσεις, μοίρασμα, φιλοδώρημα' } },
    einkaufen:       { a1:{ de:'Mengen, Preise',             en:'quantities, prices', el:'ποσότητες, τιμές' },
                       a2:{ de:'umtauschen, Größen, Rabatt', en:'exchanging, sizes, discounts', el:'αλλαγή, μεγέθη, εκπτώσεις' } },
    wegbeschreibung: { a1:{ de:'wo ist …?',                  en:'where is …?', el:'πού είναι …;' },
                       a2:{ de:'eine Route erklären',        en:'explaining a route', el:'εξηγώντας μια διαδρομή' } },
    taxi:            { a1:{ de:'Ziel nennen, zahlen',        en:'naming a destination, paying', el:'λες τον προορισμό, πληρώνεις' },
                       a2:{ de:'Umweg, Wartezeit, Quittung', en:'detours, waiting, receipts', el:'παράκαμψη, αναμονή, απόδειξη' } },
    familie:         { a1:{ de:'wer gehört dazu',            en:'who belongs to it', el:'ποιοι ανήκουν σε αυτή' },
                       a2:{ de:'erzählen, was früher war',   en:'telling what used to be', el:'διηγείσαι πώς ήταν παλιά' } },
    hotel:           { a1:{ de:'einchecken',                 en:'checking in', el:'κάνεις check-in' },
                       a2:{ de:'ein Zimmerproblem melden',   en:'reporting a room problem', el:'αναφέρεις ένα πρόβλημα στο δωμάτιο' } },
    bahnhof:         { a1:{ de:'Fahrkarte, Gleis',           en:'ticket, platform', el:'εισιτήριο, αποβάθρα' },
                       a2:{ de:'Verspätung, Umsteigen',      en:'delays, changing trains', el:'καθυστέρηση, αλλαγή τρένου' } },
    arzt:            { a1:{ de:'wo tut es weh',              en:'where it hurts', el:'πού πονάει' },
                       a2:{ de:'Vorgeschichte, Medikamente', en:'history, medication', el:'ιστορικό, φάρμακα' } },
    wetter:          { a1:{ de:'wie ist es heute',           en:'how it is today', el:'πώς είναι σήμερα' },
                       a2:{ de:'Pläne vom Wetter abhängig machen', en:'planning around the weather', el:'σχέδια ανάλογα με τον καιρό' } }
  };

  /* ── Rollen und Ort je Thema ──────────────────────────────────────────
     Kein Koenig ohne Untertan: jede Szene hat zwei Rollen. Sie stehen auf
     der Buehnenkarte („Ich bin X, du bist Y") und im Mini-Prompt, wenn der
     Lerner vom Skript abweicht. Gilt fuer A1 und A2 gleichermassen. */
  var ROLLEN = {
    cafe:            { spikiu:{ de:'der Kellner',          es:'el camarero',        en:'the waiter', el:'ο σερβιτόρος' },
                       lerner:{ de:'der Gast',             es:'el cliente',         en:'the customer', el:'ο πελάτης' },
                       ort:   { de:'auf einer Terrasse',   es:'en una terraza',     en:'on a terrace', el:'σε μια βεράντα' } },
    restaurant:      { spikiu:{ de:'die Kellnerin',        es:'la camarera',        en:'the waitress', el:'η σερβιτόρα' },
                       lerner:{ de:'der Gast',             es:'el cliente',         en:'the guest', el:'ο πελάτης' },
                       ort:   { de:'in einem Restaurant',  es:'en un restaurante',  en:'in a restaurant', el:'σε ένα εστιατόριο' } },
    einkaufen:       { spikiu:{ de:'die Verkäuferin',      es:'la vendedora',       en:'the shopkeeper', el:'η πωλήτρια' },
                       lerner:{ de:'die Kundin',           es:'la clienta',         en:'the customer', el:'η πελάτισσα' },
                       ort:   { de:'auf dem Markt',        es:'en el mercado',      en:'at the market', el:'στην αγορά' } },
    wegbeschreibung: { spikiu:{ de:'eine Passantin',       es:'una transeúnte',     en:'a passer-by', el:'μια περαστική' },
                       lerner:{ de:'ein Reisender',        es:'un viajero',         en:'a traveller', el:'ένας ταξιδιώτης' },
                       ort:   { de:'auf der Straße',       es:'en la calle',        en:'in the street', el:'στον δρόμο' } },
    taxi:            { spikiu:{ de:'der Taxifahrer',       es:'el taxista',         en:'the taxi driver', el:'ο ταξιτζής' },
                       lerner:{ de:'der Fahrgast',         es:'el pasajero',        en:'the passenger', el:'ο επιβάτης' },
                       ort:   { de:'im Taxi',              es:'en el taxi',         en:'in the taxi', el:'στο ταξί' } },
    familie:         { spikiu:{ de:'eine Nachbarin',       es:'una vecina',         en:'a neighbour', el:'μια γειτόνισσα' },
                       lerner:{ de:'du selbst',            es:'tú mismo',           en:'yourself', el:'εσύ ο ίδιος' },
                       ort:   { de:'beim Kaffee',          es:'tomando café',       en:'over coffee', el:'πίνοντας καφέ' } },
    hotel:           { spikiu:{ de:'die Empfangsdame',     es:'la recepcionista',   en:'the receptionist', el:'η ρεσεψιονίστ' },
                       lerner:{ de:'der Gast',             es:'el huésped',         en:'the guest', el:'ο ένοικος' },
                       ort:   { de:'an der Rezeption',     es:'en la recepción',    en:'at reception', el:'στη ρεσεψιόν' } },
    bahnhof:         { spikiu:{ de:'der Mann am Schalter', es:'el hombre de la taquilla', en:'the man at the counter', el:'ο υπάλληλος στο εκδοτήριο' },
                       lerner:{ de:'der Reisende',         es:'el viajero',         en:'the traveller', el:'ο ταξιδιώτης' },
                       ort:   { de:'am Bahnhof',           es:'en la estación',     en:'at the station', el:'στον σταθμό' } },
    arzt:            { spikiu:{ de:'die Ärztin',           es:'la médica',          en:'the doctor', el:'η γιατρός' },
                       lerner:{ de:'die Patientin',        es:'la paciente',        en:'the patient', el:'η ασθενής' },
                       ort:   { de:'in der Praxis',        es:'en la consulta',     en:'at the surgery', el:'στο ιατρείο' } },
    wetter:          { spikiu:{ de:'ein Nachbar',          es:'un vecino',          en:'a neighbour', el:'ένας γείτονας' },
                       lerner:{ de:'du selbst',            es:'tú mismo',           en:'yourself', el:'εσύ ο ίδιος' },
                       ort:   { de:'vor der Tür',          es:'en la puerta',       en:'outside the door', el:'στην πόρτα' } }
  };

  /* ── Die drei Aufgaben je Station ─────────────────────────────────────
     Nach dem Vorbild von Googles Uebungsmodus: eine Szene ist erledigt, wenn
     drei konkrete Aufgaben erfuellt sind. Sie sind KEINE Erfindung — sie
     beschreiben genau die drei Lernerzeilen des Stations-Dialogs.

     In der MUTTERSPRACHE, weil ein Anfaenger sie verstehen muss, ohne sie
     schon sagen zu koennen. Waeren sie in der Zielsprache, waeren sie schon
     die halbe Antwort.

     Sie sind der Anker: Spikiu bekommt je Zug nur die offene Aufgabe als
     Anweisung. Deshalb kann das Gespraech nicht entgleisen, egal was der
     Lerner einwirft. */
  var AUFGABEN = {
    'a1.arzt': [
      { de:'Sag, dass du Kopfschmerzen hast', es:'Di que te duele la cabeza', en:'Say you have a headache', el:'Πες ότι πονάει το κεφάλι σου' },
      { de:'Sag: seit gestern, und dass du Fieber hast', es:'Di que desde ayer y que tienes fiebre', en:'Say since yesterday, and that you have a fever', el:'Πες ότι από χθες και ότι έχεις πυρετό' },
      { de:'Bedanke dich bei der Ärztin', es:'Da las gracias a la doctora', en:'Thank the doctor', el:'Ευχαρίστησε τη γιατρό' }
    ],
    'a1.bahnhof': [
      { de:'Kaufe eine Fahrkarte nach Madrid', es:'Compra un billete para Madrid', en:'Buy a ticket to Madrid', el:'Αγόρασε ένα εισιτήριο για Μαδρίτη' },
      { de:'Sag: hin und zurück, und frag, wann der Zug fährt', es:'Di que ida y vuelta y pregunta a qué hora sale', en:'Say return, and ask what time it leaves', el:'Πες με επιστροφή και ρώτα τι ώρα φεύγει' },
      { de:'Frag, von welchem Gleis er fährt', es:'Pregunta de qué vía sale', en:'Ask which platform it leaves from', el:'Ρώτα από ποια αποβάθρα φεύγει' }
    ],
    'a1.cafe': [
      { de:'Bestelle einen Kaffee', es:'Pide un café', en:'Order a coffee', el:'Παράγγειλε έναν καφέ' },
      { de:'Sag, dass du ihn mit Milch möchtest', es:'Di que lo quieres con leche', en:'Say you want it with milk', el:'Πες ότι τον θέλεις με γάλα' },
      { de:'Verneine und bitte um die Rechnung', es:'Di que no y pide la cuenta', en:'Say no and ask for the bill', el:'Πες όχι και ζήτα τον λογαριασμό' }
    ],
    'a1.einkaufen': [
      { de:'Bestelle ein Kilo Äpfel', es:'Pide un kilo de manzanas', en:'Ask for a kilo of apples', el:'Ζήτα ένα κιλό μήλα' },
      { de:'Bestelle ein halbes Kilo Käse und frag, was er kostet', es:'Pide medio kilo de queso y pregunta cuánto vale', en:'Ask for half a kilo of cheese and what it costs', el:'Ζήτα μισό κιλό τυρί και ρώτα πόσο κάνει' },
      { de:'Gib ihr zehn Euro und bedanke dich', es:'Dale diez euros y da las gracias', en:'Hand over ten euros and say thanks', el:'Δώσ\' της δέκα ευρώ και ευχαρίστησε' }
    ],
    'a1.familie': [
      { de:'Bejahe und sag, dass du eine Schwester hast', es:'Di que sí, que tienes una hermana', en:'Say yes, you have a sister', el:'Πες ναι, ότι έχεις μια αδελφή' },
      { de:'Sag, dass sie Klara heißt', es:'Di que se llama Clara', en:'Say her name is Clara', el:'Πες ότι τη λένε Κλάρα' },
      { de:'Sag, dass sie zwölf ist', es:'Di que tiene doce años', en:'Say she is twelve', el:'Πες ότι είναι δώδεκα χρονών' }
    ],
    'a1.hotel': [
      { de:'Bejahe und nenne deinen Namen: Weber', es:'Di que sí, a nombre de Weber', en:'Say yes, under the name Weber', el:'Πες ναι, στο όνομα Weber' },
      { de:'Bestätige und frag, ob das Frühstück dabei ist', es:'Confirma y pregunta si el desayuno está incluido', en:'Confirm and ask whether breakfast is included', el:'Επιβεβαίωσε και ρώτα αν περιλαμβάνεται το πρωινό' },
      { de:'Bedanke dich und frag, in welchem Stock das Zimmer ist', es:'Da las gracias y pregunta en qué planta está la habitación', en:'Say thanks and ask which floor the room is on', el:'Ευχαρίστησε και ρώτα σε ποιον όροφο είναι το δωμάτιο' }
    ],
    'a1.restaurant': [
      { de:'Sag, dass ihr zu zweit seid', es:'Di que sois dos', en:'Say there are two of you', el:'Πες ότι είστε δύο' },
      { de:'Bedanke dich und frag, was er empfiehlt', es:'Da las gracias y pregunta qué recomienda', en:'Say thanks and ask what he recommends', el:'Ευχαρίστησε και ρώτα τι προτείνει' },
      { de:'Bestelle den Fisch und einen Salat', es:'Pide el pescado y una ensalada', en:'Order the fish and a salad', el:'Παράγγειλε το ψάρι και μια σαλάτα' }
    ],
    'a1.taxi': [
      { de:'Frag, ob das Taxi frei ist', es:'Pregunta si el taxi está libre', en:'Ask whether the taxi is free', el:'Ρώτα αν το ταξί είναι ελεύθερο' },
      { de:'Sag, dass du zum Flughafen willst', es:'Di que vas al aeropuerto', en:'Say you are going to the airport', el:'Πες ότι πηγαίνεις στο αεροδρόμιο' },
      { de:'Bejahe und sag, dass du einen Koffer hast', es:'Di que sí, que llevas una maleta', en:'Say yes, you have one suitcase', el:'Πες ναι, ότι έχεις μια βαλίτσα' }
    ],
    'a1.wegbeschreibung': [
      { de:'Frag, wo der Marktplatz ist', es:'Pregunta dónde está la plaza', en:'Ask where the market square is', el:'Ρώτα πού είναι η πλατεία' },
      { de:'Frag, ob es weit ist', es:'Pregunta si está lejos', en:'Ask whether it is far', el:'Ρώτα αν είναι μακριά' },
      { de:'Bedanke dich', es:'Da las gracias', en:'Say thank you', el:'Πες ευχαριστώ' }
    ],
    'a1.wetter': [
      { de:'Stimme zu und sag, dass die Sonne scheint und es warm ist', es:'Dale la razón y di que hace sol y calor', en:'Agree and say it is sunny and warm', el:'Συμφώνησε και πες ότι έχει ήλιο και ζέστη' },
      { de:'Sag, dass es morgen wohl regnet', es:'Di que mañana probablemente llueve', en:'Say it will probably rain tomorrow', el:'Πες ότι αύριο μάλλον θα βρέξει' },
      { de:'Sag, dass das eine gute Idee ist, und verabschiede dich bis morgen', es:'Di que es buena idea y despídete hasta mañana', en:'Say that is a good idea and say see you tomorrow', el:'Πες ότι είναι καλή ιδέα και αποχαιρέτησε λέγοντας «τα λέμε αύριο»' }
    ],
    'a2.arzt': [
      { de:'Erzähle, dass du letzte Woche gestürzt bist und die Schulter schlimmer geworden ist', es:'Cuenta que te caíste la semana pasada y que el hombro ha empeorado', en:'Say you fell last week and your shoulder has got worse', el:'Διηγήσου ότι έπεσες την περασμένη εβδομάδα και ότι ο ώμος σου χειροτέρεψε' },
      { de:'Sag, dass du nur Schmerztabletten nimmst und gegen Penizillin allergisch bist', es:'Di que solo tomas pastillas para el dolor y que eres alérgico a la penicilina', en:'Say you only take painkillers and that you are allergic to penicillin', el:'Πες ότι παίρνεις μόνο παυσίπονα και ότι είσαι αλλεργικός στην πενικιλίνη' },
      { de:'Stimme zu und frag, ob du noch einen Termin brauchst', es:'Di que de acuerdo y pregunta si necesitas otra cita', en:'Agree and ask whether you need another appointment', el:'Συμφώνησε και ρώτα αν χρειάζεσαι κι άλλο ραντεβού' }
    ],
    'a2.bahnhof': [
      { de:'Sag, dass dein Zug Verspätung hat, und frag, ob du den Anschluss verpasst', es:'Di que tu tren lleva retraso y pregunta si pierdes el enlace', en:'Say your train is late and ask whether you will miss your connection', el:'Πες ότι το τρένο σου έχει καθυστέρηση και ρώτα αν θα χάσεις την ανταπόκριση' },
      { de:'Sag: um drei, in Zaragoza', es:'Di que a las tres, en Zaragoza', en:'Say at three, in Zaragoza', el:'Πες στις τρεις, στη Σαραγόσα' },
      { de:'Frag, was passiert, wenn du ihn verpasst', es:'Pregunta qué pasa si lo pierdes', en:'Ask what happens if you miss it', el:'Ρώτα τι γίνεται αν τη χάσεις' }
    ],
    'a2.cafe': [
      { de:'Sag höflich, dass dein Kaffee kalt ist', es:'Di con cortesía que tu café está frío', en:'Politely say your coffee is cold', el:'Πες ευγενικά ότι ο καφές σου είναι κρύος' },
      { de:'Bedanke dich und frag, ob die Torte Nüsse enthält', es:'Da las gracias y pregunta si la tarta lleva frutos secos', en:'Say thanks and ask whether the cake has nuts in it', el:'Ευχαρίστησε και ρώτα αν η τούρτα έχει ξηρούς καρπούς' },
      { de:'Sag, dass du allergisch bist, und nimm die Zitronentorte', es:'Di que eres alérgico y pide la de limón', en:'Say you are allergic and take the lemon cake', el:'Πες ότι είσαι αλλεργικός και διάλεξε την τούρτα λεμονιού' }
    ],
    'a2.einkaufen': [
      { de:'Sag, dass du das Hemd gestern gekauft hast und es dir zu groß ist', es:'Di que compraste la camisa ayer y que te queda grande', en:'Say you bought the shirt yesterday and it is too big for you', el:'Πες ότι αγόρασες το πουκάμισο χθες και ότι σου είναι μεγάλο' },
      { de:'Bejahe und frag, ob du sie umtauschen kannst', es:'Di que sí y pregunta si puedes cambiarla', en:'Say yes and ask whether you can exchange it', el:'Πες ναι και ρώτα αν μπορείς να το αλλάξεις' },
      { de:'Sag: eine Nummer kleiner, und frag, ob du sie anprobieren darfst', es:'Di que una talla menos y pregunta si te la puedes probar', en:'Say one size down and ask whether you may try it on', el:'Πες ένα νούμερο μικρότερο και ρώτα αν μπορείς να το δοκιμάσεις' }
    ],
    'a2.familie': [
      { de:'Sag, dass ihr in einem kleinen Dorf gewohnt habt', es:'Di que vivíais en un pueblo pequeño', en:'Say you lived in a small village', el:'Πες ότι μένατε σε ένα μικρό χωριό' },
      { de:'Bejahe und erzähle, dass ihr euch sonntags bei der Tante getroffen habt', es:'Di que sí y cuenta que los domingos os reuníais en casa de tu tía', en:'Say yes, and that on Sundays you all met at your aunt\'s', el:'Πες ναι και διηγήσου ότι τις Κυριακές μαζευόσασταν στο σπίτι της θείας σου' },
      { de:'Sag, dass deine Schwester weggezogen ist und dass du sie vermisst', es:'Di que tu hermana se mudó y que la echas de menos', en:'Say your sister moved away and that you miss her', el:'Πες ότι η αδελφή σου μετακόμισε και ότι σου λείπει' }
    ],
    'a2.hotel': [
      { de:'Sag, dass die Heizung in deinem Zimmer nicht funktioniert', es:'Di que la calefacción de tu habitación no funciona', en:'Say the heating in your room is not working', el:'Πες ότι η θέρμανση στο δωμάτιό σου δεν λειτουργεί' },
      { de:'Sag: seit gestern Abend, und dass es kein warmes Wasser gibt', es:'Di que desde anoche y que tampoco hay agua caliente', en:'Say since last night, and that there is no hot water either', el:'Πες ότι από χθες το βράδυ και ότι δεν έχει ούτε ζεστό νερό' },
      { de:'Sag, dass du lieber das Zimmer wechseln möchtest', es:'Di que prefieres cambiar de habitación', en:'Say you would rather change rooms', el:'Πες ότι προτιμάς να αλλάξεις δωμάτιο' }
    ],
    'a2.restaurant': [
      { de:'Frag nach der Spezialität des Hauses', es:'Pregunta cuál es la especialidad de la casa', en:'Ask what the house speciality is', el:'Ρώτα ποια είναι η σπεσιαλιτέ του μαγαζιού' },
      { de:'Frag nach etwas Leichterem und sag, dass ihr teilen wollt', es:'Pregunta si hay algo más ligero y di que queréis compartir', en:'Ask for something lighter and say you want to share', el:'Ρώτα αν υπάρχει κάτι πιο ελαφρύ και πες ότι θέλετε να το μοιραστείτε' },
      { de:'Nimm den Fisch und bitte um getrennte Rechnungen', es:'Acepta el pescado y pide cuentas separadas', en:'Take the fish and ask for separate bills', el:'Δέξου το ψάρι και ζήτα χωριστούς λογαριασμούς' }
    ],
    'a2.taxi': [
      { de:'Sag, dass du zum Flughafen willst und es eilig hast', es:'Di que vas al aeropuerto y que tienes prisa', en:'Say you are going to the airport and you are in a hurry', el:'Πες ότι πηγαίνεις στο αεροδρόμιο και ότι βιάζεσαι' },
      { de:'Frag, ob der Weg durch die Stadt schneller ist', es:'Pregunta si por el centro es más rápido', en:'Ask whether going through town is faster', el:'Ρώτα αν είναι πιο γρήγορα από το κέντρο' },
      { de:'Sag: dann diesen Weg, und bitte um eine Quittung', es:'Di que vaya por ahí y pide un recibo', en:'Say take that route, and ask for a receipt', el:'Πες να πάει από εκεί και ζήτα απόδειξη' }
    ],
    'a2.wegbeschreibung': [
      { de:'Frag, wie du zum Museum kommst', es:'Pregunta cómo llegar al museo', en:'Ask how to get to the museum', el:'Ρώτα πώς θα πας στο μουσείο' },
      { de:'Frag, wie es danach weitergeht', es:'Pregunta por dónde se sigue después', en:'Ask what comes after that', el:'Ρώτα από πού συνεχίζεις μετά' },
      { de:'Frag, ob man zu Fuß hingehen kann', es:'Pregunta si se puede ir a pie', en:'Ask whether you can walk there', el:'Ρώτα αν μπορείς να πας με τα πόδια' }
    ],
    'a2.wetter': [
      { de:'Sag, es hängt vom Wetter ab, und frag nach der Vorhersage', es:'Di que depende del tiempo y pregunta por la previsión', en:'Say it depends on the weather and ask about the forecast', el:'Πες ότι εξαρτάται από τον καιρό και ρώτα για την πρόγνωση' },
      { de:'Frag, wie es am Nachmittag wird', es:'Pregunta qué tiempo hará por la tarde', en:'Ask what it will be like in the afternoon', el:'Ρώτα τι καιρό θα κάνει το απόγευμα' },
      { de:'Schlag vor, nachmittags zu fahren, und sag, dass du eine Jacke mitnimmst', es:'Propón ir por la tarde y di que llevas una chaqueta', en:'Suggest going in the afternoon and say you will bring a jacket', el:'Πρότεινε να πάτε το απόγευμα και πες ότι θα πάρεις ένα μπουφάν' }
    ]
  };

  /* ══════════════════════════════════════════════════════════════════
     STATIONEN — A1
     Bauplan, für jede Station identisch:
       wortschatz     12 Wörter
       dialog         6 Zeilen, abwechselnd
       lesetext       kurzer Text + 1 Frage mit 3 Optionen
       schreibaufgabe Auftrag + Musterlösung
       grammatik      eine Notiz in Alltagssprache + 2 Beispiele
     ══════════════════════════════════════════════════════════════════ */
  var STATIONEN = {

    /* ── A1 · Im Café ───────────────────────────────────────────────── */
    'a1.cafe': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du bist Gast im Café. Du möchtest einen Kaffee mit Milch und danach zahlen.', es:'Eres cliente en la cafetería. Quieres un café con leche y después pagar.', en:'You\'re a customer at the café. You want a coffee with milk and then to pay.', el:'Είσαι πελάτης στο καφέ. Θέλεις έναν καφέ με γάλα και μετά να πληρώσεις.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Gracias a usted. ¡Que tenga buen día!', na:{ de:'Ich danke Ihnen. Schönen Tag noch!', en:'Thank you. Have a nice day!', el:'Εγώ σας ευχαριστώ. Καλή σας μέρα!' } },
      wortschatz: [
        { z:'el café',     na:{ de:'der Kaffee',      en:'coffee', el:'ο καφές' } },
        { z:'el té',       na:{ de:'der Tee',         en:'tea', el:'το τσάι' } },
        { z:'el agua',     na:{ de:'das Wasser',      en:'water', el:'το νερό' } },
        { z:'la leche',    na:{ de:'die Milch',       en:'milk', el:'το γάλα' } },
        { z:'el azúcar',   na:{ de:'der Zucker',      en:'sugar', el:'η ζάχαρη' } },
        { z:'un vaso',     na:{ de:'ein Glas',        en:'a glass', el:'ένα ποτήρι' } },
        { z:'la taza',     na:{ de:'die Tasse',       en:'the cup', el:'το φλιτζάνι' } },
        { z:'la cuenta',   na:{ de:'die Rechnung',    en:'the bill', el:'ο λογαριασμός' } },
        { z:'por favor',   na:{ de:'bitte',           en:'please', el:'παρακαλώ' } },
        { z:'gracias',     na:{ de:'danke',           en:'thank you', el:'ευχαριστώ' } },
        { z:'quiero',      na:{ de:'ich möchte',      en:'I want', el:'θέλω' } },
        { z:'¿cuánto es?', na:{ de:'was kostet das?', en:'how much is it?', el:'πόσο κάνει;' } }
      ],
      dialog: {
        rolle: { de:'Der Kellner', en:'The waiter', el:'Ο σερβιτόρος' },
        zeilen: [
          { wer:'spikiu', z:'¡Buenos días! ¿Qué le pongo?', na:{ de:'Guten Tag! Was darf ich Ihnen bringen?', en:'Good morning! What can I get you?', el:'Καλημέρα! Τι να σας φέρω;' } },
          { wer:'lerner', z:'Un café, por favor.', na:{ de:'Einen Kaffee, bitte.', en:'A coffee, please.', el:'Έναν καφέ, παρακαλώ.' } },
          { wer:'spikiu', z:'¿Con leche o solo?', na:{ de:'Mit Milch oder schwarz?', en:'With milk or black?', el:'Με γάλα ή σκέτο;' } },
          { wer:'lerner', z:'Con leche, gracias.', na:{ de:'Mit Milch, danke.', en:'With milk, thank you.', el:'Με γάλα, ευχαριστώ.' } },
          { wer:'spikiu', z:'Enseguida. ¿Algo más?', na:{ de:'Sofort. Sonst noch etwas?', en:'Right away. Anything else?', el:'Αμέσως. Τίποτα άλλο;' } },
          { wer:'lerner', z:'No, gracias. La cuenta, por favor.', na:{ de:'Nein, danke. Die Rechnung, bitte.', en:'No, thanks. The bill, please.', el:'Όχι, ευχαριστώ. Τον λογαριασμό, παρακαλώ.' } }
        ]
      },
      lesetext: {
        z:'María entra en el café. Pide un café con leche y un vaso de agua. El café cuesta dos euros. María paga con cinco euros. El camarero le da tres euros.',
        na:{ de:'María betritt das Café. Sie bestellt einen Milchkaffee und ein Glas Wasser. Der Kaffee kostet zwei Euro. María zahlt mit fünf Euro. Der Kellner gibt ihr drei Euro zurück.',
             en:'María walks into the café. She orders a coffee with milk and a glass of water. The coffee costs two euros. María pays with five euros. The waiter gives her three euros back.', el:'Η Μαρία μπαίνει στο καφέ. Παραγγέλνει έναν καφέ με γάλα και ένα ποτήρι νερό. Ο καφές κοστίζει δύο ευρώ. Η Μαρία πληρώνει με πέντε ευρώ. Ο σερβιτόρος της δίνει τρία ευρώ.' },
        frage:{ de:'Wie viel bekommt María zurück?', en:'How much change does María get?', el:'Πόσα ρέστα παίρνει η Μαρία;' },
        optionen:[
          { na:{ de:'Zwei Euro', en:'Two euros', el:'Δύο ευρώ' },  richtig:false },
          { na:{ de:'Drei Euro', en:'Three euros', el:'Τρία ευρώ' },richtig:true  },
          { na:{ de:'Fünf Euro', en:'Five euros', el:'Πέντε ευρώ' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Bestelle einen Tee mit Zucker und frage nach der Rechnung. Zwei Sätze.',
                  en:'Order a tea with sugar and ask for the bill. Two sentences.', el:'Παράγγειλε ένα τσάι με ζάχαρη και ζήτα τον λογαριασμό. Δύο προτάσεις.' },
        muster:'Un té con azúcar, por favor. La cuenta, por favor.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Un" und „una" heißen beide „ein". Welches, hängt am Wort: un café, una taza. Man lernt es mit dem Wort zusammen, nicht als Regel.',
               en:'"Un" and "una" both mean "a". Which one depends on the word: un café, una taza. Learn it together with the word, not as a rule.', el:'Το «un» και το «una» σημαίνουν και τα δύο «ένας/μία». Ποιο από τα δύο, εξαρτάται από τη λέξη: un café, una taza. Μάθ\' το μαζί με τη λέξη, όχι ως κανόνα.' },
        beispiele:[
          { z:'un café',  na:{ de:'ein Kaffee', en:'a coffee', el:'ένας καφές' } },
          { z:'una taza', na:{ de:'eine Tasse', en:'a cup', el:'ένα φλιτζάνι' } }
        ]
      }
    },

    /* ── A1 · Im Restaurant ─────────────────────────────────────────── */
    'a1.restaurant': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Ihr seid zu zweit und habt nicht reserviert. Was ihr esst, wisst ihr noch nicht.', es:'Sois dos y no tenéis reserva. Todavía no sabéis qué vais a comer.', en:'There are two of you and no reservation. You haven\'t decided what to eat.', el:'Είστε δύο και δεν έχετε κράτηση. Δεν έχετε αποφασίσει ακόμα τι θα φάτε.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Excelente elección. Enseguida vuelvo.', na:{ de:'Ausgezeichnete Wahl. Ich komme gleich wieder.', en:'Excellent choice. I\'ll be right back.', el:'Εξαιρετική επιλογή. Επιστρέφω αμέσως.' } },
      wortschatz: [
        { z:'la mesa',        na:{ de:'der Tisch',        en:'the table', el:'το τραπέζι' } },
        { z:'la carta',       na:{ de:'die Speisekarte',  en:'the menu', el:'ο κατάλογος' } },
        { z:'el plato',       na:{ de:'der Teller',       en:'the plate', el:'το πιάτο' } },
        { z:'la sopa',        na:{ de:'die Suppe',        en:'the soup', el:'η σούπα' } },
        { z:'el pollo',       na:{ de:'das Hähnchen',     en:'chicken', el:'το κοτόπουλο' } },
        { z:'el pescado',     na:{ de:'der Fisch',        en:'fish', el:'το ψάρι' } },
        { z:'la ensalada',    na:{ de:'der Salat',        en:'the salad', el:'η σαλάτα' } },
        { z:'el pan',         na:{ de:'das Brot',         en:'bread', el:'το ψωμί' } },
        { z:'para dos',       na:{ de:'für zwei',         en:'for two', el:'για δύο' } },
        { z:'tengo hambre',   na:{ de:'ich habe Hunger',  en:'I am hungry', el:'πεινάω' } },
        { z:'está rico',      na:{ de:'es schmeckt gut',  en:'it tastes good', el:'είναι νόστιμο' } },
        { z:'¿qué recomienda?', na:{ de:'was empfehlen Sie?', en:'what do you recommend?', el:'τι προτείνετε;' } }
      ],
      dialog: {
        rolle: { de:'Die Kellnerin', en:'The waitress', el:'Η σερβιτόρα' },
        zeilen: [
          { wer:'spikiu', z:'Buenas noches. ¿Mesa para cuántos?', na:{ de:'Guten Abend. Ein Tisch für wie viele?', en:'Good evening. A table for how many?', el:'Καλησπέρα. Τραπέζι για πόσους;' } },
          { wer:'lerner', z:'Para dos, por favor.', na:{ de:'Für zwei, bitte.', en:'For two, please.', el:'Για δύο, παρακαλώ.' } },
          { wer:'spikiu', z:'Aquí tiene la carta.', na:{ de:'Hier ist die Speisekarte.', en:'Here is the menu.', el:'Ορίστε ο κατάλογος.' } },
          { wer:'lerner', z:'Gracias. ¿Qué recomienda?', na:{ de:'Danke. Was empfehlen Sie?', en:'Thank you. What do you recommend?', el:'Ευχαριστώ. Τι προτείνετε;' } },
          { wer:'spikiu', z:'El pescado está muy rico hoy.', na:{ de:'Der Fisch ist heute sehr gut.', en:'The fish is very good today.', el:'Το ψάρι είναι πολύ νόστιμο σήμερα.' } },
          { wer:'lerner', z:'Entonces pescado y una ensalada.', na:{ de:'Dann Fisch und einen Salat.', en:'Then fish and a salad.', el:'Τότε ψάρι και μια σαλάτα.' } }
        ]
      },
      lesetext: {
        z:'Pedro llega al restaurante a las ocho. Pide una sopa y pollo con ensalada. No quiere pescado. Con la comida bebe agua. Al final pide la cuenta.',
        na:{ de:'Pedro kommt um acht im Restaurant an. Er bestellt eine Suppe und Hähnchen mit Salat. Fisch möchte er nicht. Zum Essen trinkt er Wasser. Am Ende bittet er um die Rechnung.',
             en:'Pedro arrives at the restaurant at eight. He orders a soup and chicken with salad. He does not want fish. He drinks water with the meal. At the end he asks for the bill.', el:'Ο Πέδρο φτάνει στο εστιατόριο στις οκτώ. Παραγγέλνει μια σούπα και κοτόπουλο με σαλάτα. Δεν θέλει ψάρι. Με το φαγητό πίνει νερό. Στο τέλος ζητάει τον λογαριασμό.' },
        frage:{ de:'Was bestellt Pedro NICHT?', en:'What does Pedro NOT order?', el:'Τι ΔΕΝ παραγγέλνει ο Πέδρο;' },
        optionen:[
          { na:{ de:'Die Suppe', en:'The soup', el:'Τη σούπα' },   richtig:false },
          { na:{ de:'Den Fisch', en:'The fish', el:'Το ψάρι' },   richtig:true  },
          { na:{ de:'Den Salat', en:'The salad', el:'Τη σαλάτα' },  richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frage nach einem Tisch für drei Personen und bitte um die Karte. Zwei Sätze.',
                  en:'Ask for a table for three and request the menu. Two sentences.', el:'Ζήτα ένα τραπέζι για τρεις και ζήτα τον κατάλογο. Δύο προτάσεις.' },
        muster:'Una mesa para tres, por favor. ¿Me trae la carta?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Para" heißt „für", wenn es um den Empfänger geht: para dos, para mí. Es ist eines der ersten Wörter, die man wirklich braucht.',
               en:'"Para" means "for" when it points at a recipient: para dos, para mí. One of the first words you actually need.', el:'Το «para» σημαίνει «για» όταν δείχνει σε ποιον πηγαίνει κάτι: para dos, para mí. Μία από τις πρώτες λέξεις που πραγματικά χρειάζεσαι.' },
        beispiele:[
          { z:'una mesa para dos', na:{ de:'ein Tisch für zwei', en:'a table for two', el:'ένα τραπέζι για δύο' } },
          { z:'un café para mí',   na:{ de:'ein Kaffee für mich', en:'a coffee for me', el:'ένας καφές για μένα' } }
        ]
      }
    },

    /* ── A1 · Einkaufen ─────────────────────────────────────────────── */
    'a1.einkaufen': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du kaufst Äpfel und Käse. Du hast einen Zehn-Euro-Schein dabei.', es:'Compras manzanas y queso. Llevas un billete de diez euros.', en:'You\'re buying apples and cheese. You have a ten-euro note.', el:'Αγοράζεις μήλα και τυρί. Έχεις ένα χαρτονόμισμα των δέκα ευρώ.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Aquí tiene el cambio. ¡Hasta luego!', na:{ de:'Hier Ihr Wechselgeld. Auf Wiedersehen!', en:'Here\'s your change. See you!', el:'Ορίστε τα ρέστα σας. Γεια σας!' } },
      wortschatz: [
        { z:'la tienda',     na:{ de:'der Laden',        en:'the shop', el:'το μαγαζί' } },
        { z:'el mercado',    na:{ de:'der Markt',        en:'the market', el:'η αγορά' } },
        { z:'un kilo',       na:{ de:'ein Kilo',         en:'a kilo', el:'ένα κιλό' } },
        { z:'medio kilo',    na:{ de:'ein halbes Kilo',  en:'half a kilo', el:'μισό κιλό' } },
        { z:'la manzana',    na:{ de:'der Apfel',        en:'the apple', el:'το μήλο' } },
        { z:'el tomate',     na:{ de:'die Tomate',       en:'the tomato', el:'η ντομάτα' } },
        { z:'el queso',      na:{ de:'der Käse',         en:'cheese', el:'το τυρί' } },
        { z:'barato',        na:{ de:'billig',           en:'cheap', el:'φτηνό' } },
        { z:'caro',          na:{ de:'teuer',            en:'expensive', el:'ακριβό' } },
        { z:'¿cuánto vale?', na:{ de:'was kostet es?',   en:'how much is it?', el:'πόσο κάνει;' } },
        { z:'nada más',      na:{ de:'sonst nichts',     en:'nothing else', el:'τίποτα άλλο' } },
        { z:'el cambio',     na:{ de:'das Wechselgeld',  en:'the change', el:'τα ρέστα' } }
      ],
      dialog: {
        rolle: { de:'Die Verkäuferin', en:'The shopkeeper', el:'Η πωλήτρια' },
        zeilen: [
          { wer:'spikiu', z:'¡Buenos días! ¿Qué le doy?', na:{ de:'Guten Tag! Was darf es sein?', en:'Good morning! What can I get you?', el:'Καλημέρα! Τι να σας δώσω;' } },
          { wer:'lerner', z:'Un kilo de manzanas, por favor.', na:{ de:'Ein Kilo Äpfel, bitte.', en:'A kilo of apples, please.', el:'Ένα κιλό μήλα, παρακαλώ.' } },
          { wer:'spikiu', z:'Aquí tiene. ¿Algo más?', na:{ de:'Hier bitte. Sonst noch etwas?', en:'Here you are. Anything else?', el:'Ορίστε. Τίποτα άλλο;' } },
          { wer:'lerner', z:'Medio kilo de queso. ¿Cuánto vale?', na:{ de:'Ein halbes Kilo Käse. Was kostet das?', en:'Half a kilo of cheese. How much is it?', el:'Μισό κιλό τυρί. Πόσο κάνει;' } },
          { wer:'spikiu', z:'Son seis euros en total.', na:{ de:'Das macht sechs Euro zusammen.', en:'That is six euros in total.', el:'Είναι έξι ευρώ συνολικά.' } },
          { wer:'lerner', z:'Aquí tiene diez. Gracias.', na:{ de:'Hier sind zehn. Danke.', en:'Here is ten. Thank you.', el:'Ορίστε δέκα. Ευχαριστώ.' } }
        ]
      },
      lesetext: {
        z:'Ana va al mercado los sábados. Hoy compra tomates y queso. Los tomates están baratos. El queso es caro, pero Ana lo compra igual. Paga ocho euros.',
        na:{ de:'Ana geht samstags auf den Markt. Heute kauft sie Tomaten und Käse. Die Tomaten sind billig. Der Käse ist teuer, aber Ana kauft ihn trotzdem. Sie zahlt acht Euro.',
             en:'Ana goes to the market on Saturdays. Today she buys tomatoes and cheese. The tomatoes are cheap. The cheese is expensive, but Ana buys it anyway. She pays eight euros.', el:'Η Άνα πηγαίνει στην αγορά τα Σάββατα. Σήμερα αγοράζει ντομάτες και τυρί. Οι ντομάτες είναι φτηνές. Το τυρί είναι ακριβό, αλλά η Άνα το αγοράζει έτσι κι αλλιώς. Πληρώνει οκτώ ευρώ.' },
        frage:{ de:'Was ist teuer?', en:'What is expensive?', el:'Τι είναι ακριβό;' },
        optionen:[
          { na:{ de:'Die Tomaten', en:'The tomatoes', el:'Οι ντομάτες' }, richtig:false },
          { na:{ de:'Der Käse',    en:'The cheese', el:'Το τυρί' },   richtig:true  },
          { na:{ de:'Beides',      en:'Both', el:'Και τα δύο' },         richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Kaufe ein Kilo Tomaten und frage nach dem Preis. Zwei Sätze.',
                  en:'Buy a kilo of tomatoes and ask for the price. Two sentences.', el:'Αγόρασε ένα κιλό ντομάτες και ρώτα την τιμή. Δύο προτάσεις.' },
        muster:'Un kilo de tomates, por favor. ¿Cuánto vale?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Mengen brauchen „de": un kilo DE manzanas, un vaso DE agua. Im Deutschen steht da nichts — im Spanischen immer.',
               en:'Quantities need "de": un kilo DE manzanas, un vaso DE agua. English drops it; Spanish never does.', el:'Οι ποσότητες θέλουν «de»: un kilo DE manzanas, un vaso DE agua. Τα ελληνικά το παραλείπουν (ένα κιλό μήλα)· τα ισπανικά ποτέ.' },
        beispiele:[
          { z:'un kilo de queso',  na:{ de:'ein Kilo Käse',  en:'a kilo of cheese', el:'ένα κιλό τυρί' } },
          { z:'un vaso de agua',   na:{ de:'ein Glas Wasser', en:'a glass of water', el:'ένα ποτήρι νερό' } }
        ]
      }
    },

    /* ── A1 · Nach dem Weg fragen ───────────────────────────────────── */
    'a1.wegbeschreibung': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du suchst den Marktplatz und bist zu Fuß unterwegs.', es:'Buscas la plaza del mercado y vas a pie.', en:'You\'re looking for the market square and you\'re on foot.', el:'Ψάχνεις την πλατεία της αγοράς και είσαι με τα πόδια.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'¿Le ayudo?', na:{ de:'Kann ich helfen?', en:'Can I help?', el:'Να σας βοηθήσω;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'De nada. ¡Buen paseo!', na:{ de:'Gern geschehen. Schönen Spaziergang!', en:'You\'re welcome. Enjoy the walk!', el:'Τίποτα. Καλή βόλτα!' } },
      wortschatz: [
        { z:'la calle',        na:{ de:'die Straße',      en:'the street', el:'ο δρόμος' } },
        { z:'la plaza',        na:{ de:'der Platz',       en:'the square', el:'η πλατεία' } },
        { z:'la esquina',      na:{ de:'die Ecke',        en:'the corner', el:'η γωνία' } },
        { z:'a la derecha',    na:{ de:'nach rechts',     en:'to the right', el:'δεξιά' } },
        { z:'a la izquierda',  na:{ de:'nach links',      en:'to the left', el:'αριστερά' } },
        { z:'todo recto',      na:{ de:'geradeaus',       en:'straight ahead', el:'ευθεία' } },
        { z:'cerca',           na:{ de:'nah',             en:'near', el:'κοντά' } },
        { z:'lejos',           na:{ de:'weit',            en:'far', el:'μακριά' } },
        { z:'¿dónde está?',    na:{ de:'wo ist?',         en:'where is?', el:'πού είναι;' } },
        { z:'aquí',            na:{ de:'hier',            en:'here', el:'εδώ' } },
        { z:'allí',            na:{ de:'dort',            en:'there', el:'εκεί' } },
        { z:'perdone',         na:{ de:'entschuldigen Sie', en:'excuse me', el:'συγγνώμη' } }
      ],
      dialog: {
        rolle: { de:'Eine Passantin', en:'A passer-by', el:'Μια περαστική' },
        zeilen: [
          { wer:'lerner', z:'Perdone, ¿dónde está la plaza?', na:{ de:'Entschuldigen Sie, wo ist der Platz?', en:'Excuse me, where is the square?', el:'Συγγνώμη, πού είναι η πλατεία;' } },
          { wer:'spikiu', z:'Está cerca. Todo recto y a la derecha.', na:{ de:'Er ist nah. Geradeaus und dann rechts.', en:'It is close. Straight ahead and then right.', el:'Είναι κοντά. Ευθεία και δεξιά.' } },
          { wer:'lerner', z:'¿Está lejos?', na:{ de:'Ist es weit?', en:'Is it far?', el:'Είναι μακριά;' } },
          { wer:'spikiu', z:'No, cinco minutos.', na:{ de:'Nein, fünf Minuten.', en:'No, five minutes.', el:'Όχι, πέντε λεπτά.' } },
          { wer:'lerner', z:'Muchas gracias.', na:{ de:'Vielen Dank.', en:'Thank you very much.', el:'Ευχαριστώ πολύ.' } },
          { wer:'spikiu', z:'De nada. ¡Que tenga un buen día!', na:{ de:'Gern geschehen. Schönen Tag!', en:'You are welcome. Have a good day!', el:'Τίποτα. Καλή σας μέρα!' } }
        ]
      },
      lesetext: {
        z:'El hotel está en la calle Mayor. Desde la estación vas todo recto. En la esquina giras a la izquierda. El hotel está allí, muy cerca de la plaza.',
        na:{ de:'Das Hotel ist in der Calle Mayor. Vom Bahnhof gehst du geradeaus. An der Ecke biegst du links ab. Das Hotel ist dort, ganz nah am Platz.',
             en:'The hotel is on Calle Mayor. From the station you go straight ahead. At the corner you turn left. The hotel is there, very close to the square.', el:'Το ξενοδοχείο είναι στην οδό Μαγιόρ. Από τον σταθμό πας ευθεία. Στη γωνία στρίβεις αριστερά. Το ξενοδοχείο είναι εκεί, πολύ κοντά στην πλατεία.' },
        frage:{ de:'Wohin biegt man an der Ecke ab?', en:'Which way do you turn at the corner?', el:'Προς τα πού στρίβεις στη γωνία;' },
        optionen:[
          { na:{ de:'Nach rechts', en:'Right', el:'Δεξιά' },        richtig:false },
          { na:{ de:'Nach links',  en:'Left', el:'Αριστερά' },         richtig:true  },
          { na:{ de:'Geradeaus',   en:'Straight on', el:'Ευθεία' },  richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frage höflich, wo der Bahnhof ist, und ob er weit ist. Zwei Sätze.',
                  en:'Politely ask where the station is and whether it is far. Two sentences.', el:'Ρώτα ευγενικά πού είναι ο σταθμός και αν είναι μακριά. Δύο προτάσεις.' },
        muster:'Perdone, ¿dónde está la estación? ¿Está lejos?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Está" sagt, WO etwas ist oder WIE es gerade ist. Für einen Ort nimmt man immer está, nie es.',
               en:'"Está" tells you WHERE something is or HOW it is right now. For a location always use está, never es.', el:'Το «está» λέει ΠΟΥ βρίσκεται κάτι ή ΠΩΣ είναι αυτή τη στιγμή. Για τοποθεσία λες πάντα está, ποτέ es.' },
        beispiele:[
          { z:'¿Dónde está el hotel?', na:{ de:'Wo ist das Hotel?', en:'Where is the hotel?', el:'Πού είναι το ξενοδοχείο;' } },
          { z:'Está cerca.',           na:{ de:'Es ist nah.',       en:'It is close.', el:'Είναι κοντά.' } }
        ]
      }
    },

    /* ── A1 · Im Taxi ───────────────────────────────────────────────── */
    'a1.taxi': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast einen Koffer dabei und willst zum Flughafen.', es:'Llevas una maleta y quieres ir al aeropuerto.', en:'You have one suitcase and you want to go to the airport.', el:'Έχεις μια βαλίτσα και θέλεις να πας στο αεροδρόμιο.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'¿Sí? Buenas noches.', na:{ de:'Ja bitte? Guten Abend.', en:'Yes? Good evening.', el:'Ναι; Καλησπέρα.' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Aquí estamos. ¡Buen viaje!', na:{ de:'Da wären wir. Gute Reise!', en:'Here we are. Have a good trip!', el:'Φτάσαμε. Καλό ταξίδι!' } },
      wortschatz: [
        { z:'el taxi',          na:{ de:'das Taxi',        en:'the taxi', el:'το ταξί' } },
        { z:'el aeropuerto',    na:{ de:'der Flughafen',   en:'the airport', el:'το αεροδρόμιο' } },
        { z:'el centro',        na:{ de:'die Innenstadt',  en:'the city centre', el:'το κέντρο' } },
        { z:'la maleta',        na:{ de:'der Koffer',      en:'the suitcase', el:'η βαλίτσα' } },
        { z:'¿está libre?',     na:{ de:'sind Sie frei?',  en:'are you free?', el:'είστε ελεύθερος;' } },
        { z:'lléveme a',        na:{ de:'bringen Sie mich zu', en:'take me to', el:'πηγαίνετέ με στο/στη' } },
        { z:'aquí está bien',   na:{ de:'hier ist gut',    en:'here is fine', el:'εδώ είναι καλά' } },
        { z:'pare aquí',        na:{ de:'halten Sie hier', en:'stop here', el:'σταματήστε εδώ' } },
        { z:'la dirección',     na:{ de:'die Adresse',     en:'the address', el:'η διεύθυνση' } },
        { z:'rápido',           na:{ de:'schnell',         en:'fast', el:'γρήγορα' } },
        { z:'despacio',         na:{ de:'langsam',         en:'slow', el:'αργά' } },
        { z:'quédese el cambio',na:{ de:'behalten Sie das Wechselgeld', en:'keep the change', el:'κρατήστε τα ρέστα' } }
      ],
      dialog: {
        rolle: { de:'Der Taxifahrer', en:'The taxi driver', el:'Ο ταξιτζής' },
        zeilen: [
          { wer:'lerner', z:'¿Está libre?', na:{ de:'Sind Sie frei?', en:'Are you free?', el:'Είστε ελεύθερος;' } },
          { wer:'spikiu', z:'Sí, suba. ¿A dónde vamos?', na:{ de:'Ja, steigen Sie ein. Wohin geht es?', en:'Yes, get in. Where are we going?', el:'Ναι, ανεβείτε. Πού πάμε;' } },
          { wer:'lerner', z:'Al aeropuerto, por favor.', na:{ de:'Zum Flughafen, bitte.', en:'To the airport, please.', el:'Στο αεροδρόμιο, παρακαλώ.' } },
          { wer:'spikiu', z:'Muy bien. ¿Lleva maletas?', na:{ de:'Sehr gut. Haben Sie Koffer dabei?', en:'Very good. Do you have suitcases?', el:'Πολύ καλά. Έχετε βαλίτσες;' } },
          { wer:'lerner', z:'Sí, una maleta.', na:{ de:'Ja, einen Koffer.', en:'Yes, one suitcase.', el:'Ναι, μία βαλίτσα.' } },
          { wer:'spikiu', z:'Perfecto. Son veinte euros.', na:{ de:'Perfekt. Das macht zwanzig Euro.', en:'Perfect. That is twenty euros.', el:'Τέλεια. Κάνει είκοσι ευρώ.' } }
        ]
      },
      lesetext: {
        z:'Luis toma un taxi en el centro. Va al aeropuerto con dos maletas. El viaje dura media hora. Al final paga veinticinco euros y dice: quédese el cambio.',
        na:{ de:'Luis nimmt in der Innenstadt ein Taxi. Er fährt mit zwei Koffern zum Flughafen. Die Fahrt dauert eine halbe Stunde. Am Ende zahlt er fünfundzwanzig Euro und sagt: Behalten Sie das Wechselgeld.',
             en:'Luis takes a taxi in the city centre. He goes to the airport with two suitcases. The trip takes half an hour. At the end he pays twenty-five euros and says: keep the change.', el:'Ο Λουίς παίρνει ταξί στο κέντρο. Πηγαίνει στο αεροδρόμιο με δύο βαλίτσες. Η διαδρομή κρατάει μισή ώρα. Στο τέλος πληρώνει είκοσι πέντε ευρώ και λέει: κρατήστε τα ρέστα.' },
        frage:{ de:'Wie viele Koffer hat Luis?', en:'How many suitcases does Luis have?', el:'Πόσες βαλίτσες έχει ο Λουίς;' },
        optionen:[
          { na:{ de:'Einen',  en:'One', el:'Μία' },   richtig:false },
          { na:{ de:'Zwei',   en:'Two', el:'Δύο' },   richtig:true  },
          { na:{ de:'Keinen', en:'None', el:'Καμία' },  richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frage, ob das Taxi frei ist, und nenne die Innenstadt als Ziel. Zwei Sätze.',
                  en:'Ask if the taxi is free and name the city centre as your destination. Two sentences.', el:'Ρώτα αν το ταξί είναι ελεύθερο και πες ότι πας στο κέντρο. Δύο προτάσεις.' },
        muster:'¿Está libre? Al centro, por favor.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„A" plus „el" wird immer zu „al": al aeropuerto, al centro. Das ist keine Wahl, das passiert automatisch.',
               en:'"A" plus "el" always becomes "al": al aeropuerto, al centro. Not a choice — it just happens.', el:'Το «a» μαζί με το «el» γίνεται πάντα «al»: al aeropuerto, al centro. Δεν το διαλέγεις — απλώς γίνεται.' },
        beispiele:[
          { z:'al aeropuerto', na:{ de:'zum Flughafen',   en:'to the airport', el:'στο αεροδρόμιο' } },
          { z:'a la plaza',    na:{ de:'zum Platz',       en:'to the square', el:'στην πλατεία' } }
        ]
      }
    },

    /* ── A1 · Über die Familie ──────────────────────────────────────── */
    'a1.familie': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen
         — etwa das 'ich verstehe dich nicht' der Szene. Ohne dieses Feld
         siezte Spikiu mitten in einem Du-Gespraech (Leo, 31.08.). */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast eine Schwester. Sie heißt Klara und ist zwölf Jahre alt.', es:'Tienes una hermana. Se llama Clara y tiene doce años.', en:'You have a sister. Her name is Clara and she is twelve.', el:'Έχεις μια αδελφή. Τη λένε Κλάρα και είναι δώδεκα χρονών.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Qué bien. Salúdalos de mi parte.', na:{ de:'Wie schön. Grüß sie von mir.', en:'That\'s nice. Say hello from me.', el:'Τι ωραία. Χαιρετίσματα από μένα.' } },
      wortschatz: [
        { z:'la familia',   na:{ de:'die Familie',    en:'the family', el:'η οικογένεια' } },
        { z:'la madre',     na:{ de:'die Mutter',     en:'the mother', el:'η μητέρα' } },
        { z:'el padre',     na:{ de:'der Vater',      en:'the father', el:'ο πατέρας' } },
        { z:'el hermano',   na:{ de:'der Bruder',     en:'the brother', el:'ο αδελφός' } },
        { z:'la hermana',   na:{ de:'die Schwester',  en:'the sister', el:'η αδελφή' } },
        { z:'el hijo',      na:{ de:'der Sohn',       en:'the son', el:'ο γιος' } },
        { z:'la hija',      na:{ de:'die Tochter',    en:'the daughter', el:'η κόρη' } },
        { z:'el abuelo',    na:{ de:'der Großvater',  en:'the grandfather', el:'ο παππούς' } },
        { z:'mi',           na:{ de:'mein / meine',   en:'my', el:'μου (ο/η … μου)' } },
        { z:'tengo',        na:{ de:'ich habe',       en:'I have', el:'έχω' } },
        { z:'se llama',     na:{ de:'er/sie heißt',   en:'his/her name is', el:'τον/τη λένε' } },
        { z:'años',         na:{ de:'Jahre',          en:'years', el:'χρόνια' } }
      ],
      dialog: {
        rolle: { de:'Eine Nachbarin', en:'A neighbour', el:'Μια γειτόνισσα' },
        zeilen: [
          { wer:'spikiu', z:'¿Tienes hermanos?', na:{ de:'Hast du Geschwister?', en:'Do you have siblings?', el:'Έχεις αδέλφια;' } },
          { wer:'lerner', z:'Sí, tengo una hermana.', na:{ de:'Ja, ich habe eine Schwester.', en:'Yes, I have a sister.', el:'Ναι, έχω μια αδελφή.' } },
          { wer:'spikiu', z:'¿Cómo se llama?', na:{ de:'Wie heißt sie?', en:'What is her name?', el:'Πώς τη λένε;' } },
          { wer:'lerner', z:'Se llama Clara.', na:{ de:'Sie heißt Clara.', en:'Her name is Clara.', el:'Τη λένε Κλάρα.' } },
          { wer:'spikiu', z:'¿Y cuántos años tiene?', na:{ de:'Und wie alt ist sie?', en:'And how old is she?', el:'Και πόσων χρονών είναι;' } },
          { wer:'lerner', z:'Tiene doce años.', na:{ de:'Sie ist zwölf Jahre alt.', en:'She is twelve years old.', el:'Είναι δώδεκα χρονών.' } }
        ]
      },
      lesetext: {
        z:'La familia de Carmen es pequeña. Vive con su madre y su hermano. Su padre vive en otra ciudad. El abuelo viene los domingos y come con ellos.',
        na:{ de:'Carmens Familie ist klein. Sie lebt mit ihrer Mutter und ihrem Bruder. Ihr Vater lebt in einer anderen Stadt. Der Großvater kommt sonntags und isst mit ihnen.',
             en:'Carmen has a small family. She lives with her mother and her brother. Her father lives in another city. The grandfather comes on Sundays and eats with them.', el:'Η οικογένεια της Κάρμεν είναι μικρή. Μένει με τη μητέρα της και τον αδελφό της. Ο πατέρας της μένει σε άλλη πόλη. Ο παππούς έρχεται τις Κυριακές και τρώει μαζί τους.' },
        frage:{ de:'Wer kommt sonntags?', en:'Who comes on Sundays?', el:'Ποιος έρχεται τις Κυριακές;' },
        optionen:[
          { na:{ de:'Der Vater',      en:'The father', el:'Ο πατέρας' },      richtig:false },
          { na:{ de:'Der Großvater',  en:'The grandfather', el:'Ο παππούς' }, richtig:true  },
          { na:{ de:'Der Bruder',     en:'The brother', el:'Ο αδελφός' },     richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du einen Bruder hast, wie er heißt und wie alt er ist. Zwei Sätze.',
                  en:'Say that you have a brother, his name and his age. Two sentences.', el:'Πες ότι έχεις έναν αδελφό, πώς τον λένε και πόσων χρονών είναι. Δύο προτάσεις.' },
        muster:'Tengo un hermano. Se llama Pablo y tiene veinte años.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Alter hat man im Spanischen, man ist es nicht: tengo treinta años — ich HABE dreißig Jahre. Wer „soy treinta" sagt, wird nicht verstanden.',
               en:'In Spanish you HAVE your age, you are not it: tengo treinta años. Saying "soy treinta" will not be understood.', el:'Στα ισπανικά ΕΧΕΙΣ την ηλικία σου, δεν την «είσαι»: tengo treinta años. Αν πεις «soy treinta», δεν θα σε καταλάβουν.' },
        beispiele:[
          { z:'Tengo treinta años.',  na:{ de:'Ich bin dreißig.',  en:'I am thirty.', el:'Είμαι τριάντα χρονών.' } },
          { z:'¿Cuántos años tienes?',na:{ de:'Wie alt bist du?',  en:'How old are you?', el:'Πόσων χρονών είσαι;' } }
        ]
      }
    },

    /* ── A1 · Im Hotel ──────────────────────────────────────────────── */
    'a1.hotel': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du heißt Weber und hast zwei Nächte gebucht.', es:'Te apellidas Weber y has reservado dos noches.', en:'Your name is Weber and you have booked two nights.', el:'Το επώνυμό σου είναι Weber και έχεις κλείσει δύο νύχτες.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Aquí tiene la llave. ¡Que descanse!', na:{ de:'Hier Ihr Schlüssel. Gute Erholung!', en:'Here\'s your key. Have a good rest!', el:'Ορίστε το κλειδί σας. Καλή ξεκούραση!' } },
      wortschatz: [
        { z:'la habitación',  na:{ de:'das Zimmer',       en:'the room', el:'το δωμάτιο' } },
        { z:'la reserva',     na:{ de:'die Reservierung', en:'the booking', el:'η κράτηση' } },
        { z:'la llave',       na:{ de:'der Schlüssel',    en:'the key', el:'το κλειδί' } },
        { z:'una noche',      na:{ de:'eine Nacht',       en:'one night', el:'μία νύχτα' } },
        { z:'dos noches',     na:{ de:'zwei Nächte',      en:'two nights', el:'δύο νύχτες' } },
        { z:'el desayuno',    na:{ de:'das Frühstück',    en:'breakfast', el:'το πρωινό' } },
        { z:'el pasaporte',   na:{ de:'der Reisepass',    en:'the passport', el:'το διαβατήριο' } },
        { z:'la planta',      na:{ de:'die Etage',        en:'the floor', el:'ο όροφος' } },
        { z:'el ascensor',    na:{ de:'der Aufzug',       en:'the lift', el:'ο ανελκυστήρας' } },
        { z:'a nombre de',    na:{ de:'auf den Namen',    en:'under the name of', el:'στο όνομα' } },
        { z:'incluido',       na:{ de:'inbegriffen',      en:'included', el:'περιλαμβάνεται' } },
        { z:'firme aquí',     na:{ de:'unterschreiben Sie hier', en:'sign here', el:'υπογράψτε εδώ' } }
      ],
      dialog: {
        rolle: { de:'Die Empfangsdame', en:'The receptionist', el:'Η ρεσεψιονίστ' },
        zeilen: [
          { wer:'spikiu', z:'Buenas tardes. ¿Tiene reserva?', na:{ de:'Guten Tag. Haben Sie eine Reservierung?', en:'Good afternoon. Do you have a booking?', el:'Καλησπέρα. Έχετε κράτηση;' } },
          { wer:'lerner', z:'Sí, a nombre de Weber.', na:{ de:'Ja, auf den Namen Weber.', en:'Yes, under the name Weber.', el:'Ναι, στο όνομα Weber.' } },
          { wer:'spikiu', z:'Perfecto. Dos noches, ¿verdad?', na:{ de:'Perfekt. Zwei Nächte, richtig?', en:'Perfect. Two nights, correct?', el:'Τέλεια. Δύο νύχτες, σωστά;' } },
          { wer:'lerner', z:'Sí. ¿El desayuno está incluido?', na:{ de:'Ja. Ist das Frühstück inbegriffen?', en:'Yes. Is breakfast included?', el:'Ναι. Περιλαμβάνεται το πρωινό;' } },
          { wer:'spikiu', z:'Sí, de siete a diez. Su llave.', na:{ de:'Ja, von sieben bis zehn. Ihr Schlüssel.', en:'Yes, from seven to ten. Your key.', el:'Ναι, από τις επτά ως τις δέκα. Το κλειδί σας.' } },
          { wer:'lerner', z:'Gracias. ¿Qué planta?', na:{ de:'Danke. Welche Etage?', en:'Thank you. Which floor?', el:'Ευχαριστώ. Ποιος όροφος;' } }
        ]
      },
      lesetext: {
        z:'El señor Weber llega al hotel por la tarde. Tiene una reserva para dos noches. Su habitación está en la tercera planta. El desayuno está incluido y empieza a las siete.',
        na:{ de:'Herr Weber kommt am Nachmittag im Hotel an. Er hat eine Reservierung für zwei Nächte. Sein Zimmer ist in der dritten Etage. Das Frühstück ist inbegriffen und beginnt um sieben.',
             en:'Mr Weber arrives at the hotel in the afternoon. He has a booking for two nights. His room is on the third floor. Breakfast is included and starts at seven.', el:'Ο κύριος Weber φτάνει στο ξενοδοχείο το απόγευμα. Έχει κράτηση για δύο νύχτες. Το δωμάτιό του είναι στον τρίτο όροφο. Το πρωινό περιλαμβάνεται και αρχίζει στις επτά.' },
        frage:{ de:'Wann beginnt das Frühstück?', en:'When does breakfast start?', el:'Τι ώρα αρχίζει το πρωινό;' },
        optionen:[
          { na:{ de:'Um sieben', en:'At seven', el:'Στις επτά' }, richtig:true  },
          { na:{ de:'Um zehn',   en:'At ten', el:'Στις δέκα' },   richtig:false },
          { na:{ de:'Um drei',   en:'At three', el:'Στις τρεις' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du eine Reservierung für eine Nacht hast, und frage nach dem Frühstück. Zwei Sätze.',
                  en:'Say you have a booking for one night and ask about breakfast. Two sentences.', el:'Πες ότι έχεις κράτηση για μία νύχτα και ρώτα για το πρωινό. Δύο προτάσεις.' },
        muster:'Tengo una reserva para una noche. ¿El desayuno está incluido?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Uhrzeiten bekommen „a las": a las siete, a las diez. Bei eins heißt es a la una — als einzige Ausnahme.',
               en:'Times take "a las": a las siete, a las diez. One o\'clock is the only exception: a la una.', el:'Οι ώρες θέλουν «a las»: a las siete, a las diez. Η μία η ώρα είναι η μόνη εξαίρεση: a la una.' },
        beispiele:[
          { z:'a las siete', na:{ de:'um sieben', en:'at seven', el:'στις επτά' } },
          { z:'a la una',    na:{ de:'um eins',   en:'at one', el:'στη μία' } }
        ]
      }
    },

    /* ── A1 · Am Bahnhof ────────────────────────────────────────────── */
    'a1.bahnhof': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du willst nach Madrid und wieder zurück.', es:'Quieres ir a Madrid y volver.', en:'You want to go to Madrid and come back.', el:'Θέλεις να πας στη Μαδρίτη και να γυρίσεις.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'Buenos días. Dígame.', na:{ de:'Guten Tag. Bitte sehr.', en:'Good morning. Yes please?', el:'Καλημέρα. Ορίστε;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Aquí tiene. ¡Buen viaje!', na:{ de:'Bitte sehr. Gute Fahrt!', en:'Here you go. Safe travels!', el:'Ορίστε. Καλό ταξίδι!' } },
      wortschatz: [
        { z:'la estación',    na:{ de:'der Bahnhof',      en:'the station', el:'ο σταθμός' } },
        { z:'el tren',        na:{ de:'der Zug',          en:'the train', el:'το τρένο' } },
        { z:'el billete',     na:{ de:'die Fahrkarte',    en:'the ticket', el:'το εισιτήριο' } },
        { z:'la vía',         na:{ de:'das Gleis',        en:'the platform', el:'η γραμμή (αποβάθρα)' } },
        { z:'ida',            na:{ de:'Hinfahrt',         en:'one way', el:'απλή μετάβαση' } },
        { z:'ida y vuelta',   na:{ de:'hin und zurück',   en:'return', el:'με επιστροφή' } },
        { z:'sale',           na:{ de:'er fährt ab',      en:'it leaves', el:'φεύγει' } },
        { z:'llega',          na:{ de:'er kommt an',      en:'it arrives', el:'φτάνει' } },
        { z:'¿a qué hora?',   na:{ de:'um wie viel Uhr?', en:'at what time?', el:'τι ώρα;' } },
        { z:'el andén',       na:{ de:'der Bahnsteig',    en:'the platform', el:'η αποβάθρα' } },
        { z:'próximo',        na:{ de:'nächster',         en:'next', el:'επόμενος' } },
        { z:'el horario',     na:{ de:'der Fahrplan',     en:'the timetable', el:'τα δρομολόγια' } }
      ],
      dialog: {
        rolle: { de:'Der Mann am Schalter', en:'The man at the counter', el:'Ο υπάλληλος στο εκδοτήριο' },
        zeilen: [
          { wer:'lerner', z:'Un billete para Madrid, por favor.', na:{ de:'Eine Fahrkarte nach Madrid, bitte.', en:'A ticket to Madrid, please.', el:'Ένα εισιτήριο για Μαδρίτη, παρακαλώ.' } },
          { wer:'spikiu', z:'¿Ida o ida y vuelta?', na:{ de:'Einfach oder hin und zurück?', en:'One way or return?', el:'Απλό ή με επιστροφή;' } },
          { wer:'lerner', z:'Ida y vuelta. ¿A qué hora sale?', na:{ de:'Hin und zurück. Wann fährt er ab?', en:'Return. What time does it leave?', el:'Με επιστροφή. Τι ώρα φεύγει;' } },
          { wer:'spikiu', z:'El próximo sale a las nueve.', na:{ de:'Der nächste fährt um neun.', en:'The next one leaves at nine.', el:'Το επόμενο φεύγει στις εννιά.' } },
          { wer:'lerner', z:'¿De qué vía?', na:{ de:'Von welchem Gleis?', en:'From which platform?', el:'Από ποια αποβάθρα;' } },
          { wer:'spikiu', z:'Vía cuatro. Son treinta euros.', na:{ de:'Gleis vier. Das macht dreißig Euro.', en:'Platform four. That is thirty euros.', el:'Αποβάθρα τέσσερα. Κάνει τριάντα ευρώ.' } }
        ]
      },
      lesetext: {
        z:'Sofía compra un billete de ida y vuelta a Sevilla. El tren sale a las nueve de la vía cuatro. Llega a las doce. Sofía espera en el andén con un café.',
        na:{ de:'Sofía kauft eine Hin- und Rückfahrkarte nach Sevilla. Der Zug fährt um neun von Gleis vier. Er kommt um zwölf an. Sofía wartet mit einem Kaffee auf dem Bahnsteig.',
             en:'Sofía buys a return ticket to Seville. The train leaves at nine from platform four. It arrives at twelve. Sofía waits on the platform with a coffee.', el:'Η Σοφία αγοράζει ένα εισιτήριο με επιστροφή για Σεβίλλη. Το τρένο φεύγει στις εννιά από την αποβάθρα τέσσερα. Φτάνει στις δώδεκα. Η Σοφία περιμένει στην αποβάθρα με έναν καφέ.' },
        frage:{ de:'Von welchem Gleis fährt der Zug?', en:'Which platform does the train leave from?', el:'Από ποια αποβάθρα φεύγει το τρένο;' },
        optionen:[
          { na:{ de:'Gleis zwei',  en:'Platform two', el:'Αποβάθρα δύο' },  richtig:false },
          { na:{ de:'Gleis vier',  en:'Platform four', el:'Αποβάθρα τέσσερα' }, richtig:true  },
          { na:{ de:'Gleis neun',  en:'Platform nine', el:'Αποβάθρα εννιά' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Kaufe eine einfache Fahrkarte nach Valencia und frage nach der Abfahrtszeit. Zwei Sätze.',
                  en:'Buy a one-way ticket to Valencia and ask about the departure time. Two sentences.', el:'Αγόρασε ένα απλό εισιτήριο για Βαλένθια και ρώτα τι ώρα φεύγει. Δύο προτάσεις.' },
        muster:'Un billete de ida a Valencia, por favor. ¿A qué hora sale?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Fragewörter tragen immer einen Akzent: ¿qué?, ¿dónde?, ¿cuándo? Ohne Akzent bedeuten dieselben Wörter etwas ganz anderes.',
               en:'Question words always carry an accent: ¿qué?, ¿dónde?, ¿cuándo? Without it the same words mean something else entirely.', el:'Οι ερωτηματικές λέξεις παίρνουν πάντα τόνο: ¿qué?, ¿dónde?, ¿cuándo? Χωρίς αυτόν, οι ίδιες λέξεις σημαίνουν κάτι εντελώς άλλο.' },
        beispiele:[
          { z:'¿A qué hora sale?', na:{ de:'Wann fährt er ab?',  en:'What time does it leave?', el:'Τι ώρα φεύγει;' } },
          { z:'¿Dónde está la vía?', na:{ de:'Wo ist das Gleis?', en:'Where is the platform?', el:'Πού είναι η αποβάθρα;' } }
        ]
      }
    },

    /* ── A1 · Beim Arzt ─────────────────────────────────────────────── */
    'a1.arzt': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast seit gestern Kopfschmerzen und Fieber.', es:'Desde ayer te duele la cabeza y tienes fiebre.', en:'Since yesterday you\'ve had a headache and a fever.', el:'Από χθες πονάει το κεφάλι σου και έχεις πυρετό.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Cuídese mucho. ¡Que se mejore!', na:{ de:'Passen Sie gut auf sich auf. Gute Besserung!', en:'Take care. Feel better soon!', el:'Να προσέχετε. Περαστικά!' } },
      wortschatz: [
        { z:'el médico',      na:{ de:'der Arzt',          en:'the doctor', el:'ο γιατρός' } },
        { z:'me duele',       na:{ de:'mir tut weh',       en:'it hurts me', el:'με πονάει' } },
        { z:'la cabeza',      na:{ de:'der Kopf',          en:'the head', el:'το κεφάλι' } },
        { z:'el estómago',    na:{ de:'der Bauch',         en:'the stomach', el:'το στομάχι' } },
        { z:'la garganta',    na:{ de:'der Hals',          en:'the throat', el:'ο λαιμός' } },
        { z:'la espalda',     na:{ de:'der Rücken',        en:'the back', el:'η πλάτη' } },
        { z:'la fiebre',      na:{ de:'das Fieber',        en:'fever', el:'ο πυρετός' } },
        { z:'estoy enfermo',  na:{ de:'ich bin krank',     en:'I am ill', el:'είμαι άρρωστος' } },
        { z:'desde ayer',     na:{ de:'seit gestern',      en:'since yesterday', el:'από χθες' } },
        { z:'la pastilla',    na:{ de:'die Tablette',      en:'the pill', el:'το χάπι' } },
        { z:'descansar',      na:{ de:'sich ausruhen',     en:'to rest', el:'ξεκουράζομαι' } },
        { z:'mejor',          na:{ de:'besser',            en:'better', el:'καλύτερα' } }
      ],
      dialog: {
        rolle: { de:'Die Ärztin', en:'The doctor', el:'Η γιατρός' },
        zeilen: [
          { wer:'spikiu', z:'Buenos días. ¿Qué le pasa?', na:{ de:'Guten Tag. Was fehlt Ihnen?', en:'Good morning. What is the matter?', el:'Καλημέρα. Τι έχετε;' } },
          { wer:'lerner', z:'Me duele la cabeza.', na:{ de:'Mir tut der Kopf weh.', en:'My head hurts.', el:'Πονάει το κεφάλι μου.' } },
          { wer:'spikiu', z:'¿Desde cuándo?', na:{ de:'Seit wann?', en:'Since when?', el:'Από πότε;' } },
          { wer:'lerner', z:'Desde ayer. Y tengo fiebre.', na:{ de:'Seit gestern. Und ich habe Fieber.', en:'Since yesterday. And I have a fever.', el:'Από χθες. Και έχω πυρετό.' } },
          { wer:'spikiu', z:'Tome una pastilla y descanse.', na:{ de:'Nehmen Sie eine Tablette und ruhen Sie sich aus.', en:'Take a pill and rest.', el:'Πάρτε ένα χάπι και ξεκουραστείτε.' } },
          { wer:'lerner', z:'Gracias, doctora.', na:{ de:'Danke, Frau Doktor.', en:'Thank you, doctor.', el:'Ευχαριστώ, γιατρέ.' } }
        ]
      },
      lesetext: {
        z:'Tomás va al médico. Le duele la garganta desde el lunes. No tiene fiebre. La doctora dice que debe beber agua y descansar tres días.',
        na:{ de:'Tomás geht zum Arzt. Ihm tut seit Montag der Hals weh. Fieber hat er nicht. Die Ärztin sagt, er soll Wasser trinken und sich drei Tage ausruhen.',
             en:'Tomás goes to the doctor. His throat has hurt since Monday. He has no fever. The doctor says he should drink water and rest for three days.', el:'Ο Τομάς πηγαίνει στον γιατρό. Τον πονάει ο λαιμός από τη Δευτέρα. Δεν έχει πυρετό. Η γιατρός λέει ότι πρέπει να πίνει νερό και να ξεκουραστεί τρεις μέρες.' },
        frage:{ de:'Was hat Tomás NICHT?', en:'What does Tomás NOT have?', el:'Τι ΔΕΝ έχει ο Τομάς;' },
        optionen:[
          { na:{ de:'Halsschmerzen', en:'A sore throat', el:'Πονόλαιμο' }, richtig:false },
          { na:{ de:'Fieber',        en:'A fever', el:'Πυρετό' },       richtig:true  },
          { na:{ de:'Durst',         en:'Thirst', el:'Δίψα' },        richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass dir der Bauch weh tut und seit wann. Zwei Sätze.',
                  en:'Say that your stomach hurts and since when. Two sentences.', el:'Πες ότι πονάει το στομάχι σου και από πότε. Δύο προτάσεις.' },
        muster:'Me duele el estómago. Desde ayer por la noche.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Bei Schmerzen steht der Körperteil vorn, nicht die Person: me duele LA cabeza — nicht „mein Kopf". Man sagt der Kopf, nicht meiner.',
               en:'With pain, the body part leads and takes "the", not "my": me duele LA cabeza.', el:'Στον πόνο, το μέρος του σώματος μπαίνει μπροστά με άρθρο «το», όχι «μου»: me duele LA cabeza.' },
        beispiele:[
          { z:'Me duele la cabeza.',   na:{ de:'Mir tut der Kopf weh.',  en:'My head hurts.', el:'Πονάει το κεφάλι μου.' } },
          { z:'Me duele la espalda.',  na:{ de:'Mir tut der Rücken weh.', en:'My back hurts.', el:'Πονάει η πλάτη μου.' } }
        ]
      }
    },

    /* ── A1 · Über das Wetter ───────────────────────────────────────── */
    'a1.wetter': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen
         — etwa das 'ich verstehe dich nicht' der Szene. Ohne dieses Feld
         siezte Spikiu mitten in einem Du-Gespraech (Leo, 31.08.). */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Heute scheint die Sonne. Morgen soll es regnen.', es:'Hoy hace sol. Mañana dicen que va a llover.', en:'The sun is out today. Tomorrow it\'s supposed to rain.', el:'Σήμερα έχει ήλιο. Αύριο λένε ότι θα βρέξει.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Perfecto. ¡Hasta mañana!', na:{ de:'Perfekt. Bis morgen!', en:'Perfect. See you tomorrow!', el:'Τέλεια. Τα λέμε αύριο!' } },
      wortschatz: [
        { z:'el tiempo',      na:{ de:'das Wetter',      en:'the weather', el:'ο καιρός' } },
        { z:'hace sol',       na:{ de:'die Sonne scheint', en:'it is sunny', el:'έχει ήλιο' } },
        { z:'hace frío',      na:{ de:'es ist kalt',     en:'it is cold', el:'κάνει κρύο' } },
        { z:'hace calor',     na:{ de:'es ist warm',     en:'it is hot', el:'κάνει ζέστη' } },
        { z:'llueve',         na:{ de:'es regnet',       en:'it is raining', el:'βρέχει' } },
        { z:'la lluvia',      na:{ de:'der Regen',       en:'the rain', el:'η βροχή' } },
        { z:'el viento',      na:{ de:'der Wind',        en:'the wind', el:'ο αέρας' } },
        { z:'la nube',        na:{ de:'die Wolke',       en:'the cloud', el:'το σύννεφο' } },
        { z:'el paraguas',    na:{ de:'der Regenschirm', en:'the umbrella', el:'η ομπρέλα' } },
        { z:'hoy',            na:{ de:'heute',           en:'today', el:'σήμερα' } },
        { z:'mañana',         na:{ de:'morgen',          en:'tomorrow', el:'αύριο' } },
        { z:'el grado',       na:{ de:'das Grad',        en:'the degree', el:'ο βαθμός' } }
      ],
      dialog: {
        rolle: { de:'Ein Nachbar', en:'A neighbour', el:'Ένας γείτονας' },
        zeilen: [
          { wer:'spikiu', z:'¡Qué buen tiempo hace hoy!', na:{ de:'Was für ein schönes Wetter heute!', en:'What lovely weather today!', el:'Τι ωραίος καιρός σήμερα!' } },
          { wer:'lerner', z:'Sí, hace sol y calor.', na:{ de:'Ja, die Sonne scheint und es ist warm.', en:'Yes, it is sunny and hot.', el:'Ναι, έχει ήλιο και ζέστη.' } },
          { wer:'spikiu', z:'¿Y mañana? ¿Sabes algo?', na:{ de:'Und morgen? Weißt du schon was?', en:'And tomorrow? Do you know anything?', el:'Κι αύριο; Ξέρεις τίποτα;' } },
          { wer:'lerner', z:'Mañana llueve, creo.', na:{ de:'Morgen regnet es, glaube ich.', en:'Tomorrow it rains, I think.', el:'Αύριο βρέχει, νομίζω.' } },
          { wer:'spikiu', z:'Entonces llevo el paraguas.', na:{ de:'Dann nehme ich den Regenschirm mit.', en:'Then I will take the umbrella.', el:'Τότε θα πάρω την ομπρέλα.' } },
          { wer:'lerner', z:'Buena idea. Hasta mañana.', na:{ de:'Gute Idee. Bis morgen.', en:'Good idea. See you tomorrow.', el:'Καλή ιδέα. Τα λέμε αύριο.' } }
        ]
      },
      lesetext: {
        z:'Hoy hace sol en Valencia. Hay veinticinco grados. Mañana llega la lluvia y hace más frío. Julia lleva un paraguas en la mochila.',
        na:{ de:'Heute scheint in Valencia die Sonne. Es sind fünfundzwanzig Grad. Morgen kommt der Regen und es wird kälter. Julia hat einen Regenschirm im Rucksack.',
             en:'Today it is sunny in Valencia. It is twenty-five degrees. Tomorrow the rain arrives and it gets colder. Julia carries an umbrella in her backpack.', el:'Σήμερα έχει ήλιο στη Βαλένθια. Κάνει είκοσι πέντε βαθμούς. Αύριο έρχεται η βροχή και κάνει πιο κρύο. Η Χούλια έχει μια ομπρέλα στο σακίδιο.' },
        frage:{ de:'Wie wird das Wetter morgen?', en:'What is the weather tomorrow?', el:'Τι καιρό κάνει αύριο;' },
        optionen:[
          { na:{ de:'Sonnig',        en:'Sunny', el:'Ηλιοφάνεια' },   richtig:false },
          { na:{ de:'Regnerisch',    en:'Rainy', el:'Βροχή' },   richtig:true  },
          { na:{ de:'Sehr warm',     en:'Very hot', el:'Πολλή ζέστη' },richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, wie das Wetter heute ist und wie es morgen wird. Zwei Sätze.',
                  en:'Say what the weather is like today and what it will be tomorrow. Two sentences.', el:'Πες τι καιρό κάνει σήμερα και τι καιρό θα κάνει αύριο. Δύο προτάσεις.' },
        muster:'Hoy hace frío y viento. Mañana llueve.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Beim Wetter macht man es: hace sol, hace frío, hace calor. Nur beim Regen nicht — da heißt es einfach llueve.',
               en:'Weather uses "hace": hace sol, hace frío, hace calor. Rain is the exception: simply llueve.', el:'Για τον καιρό λες «hace»: hace sol, hace frío, hace calor. Η βροχή είναι η εξαίρεση: απλώς llueve.' },
        beispiele:[
          { z:'Hace frío.', na:{ de:'Es ist kalt.',  en:'It is cold.', el:'Κάνει κρύο.' } },
          { z:'Llueve.',    na:{ de:'Es regnet.',    en:'It is raining.', el:'Βρέχει.' } }
        ]
      }
    },

    /* ══════════════════════════════════════════════════════════════════
       STATIONEN — A2
       Gleicher Bauplan, gleiche Themen, andere Handlung: nicht mehr
       bestellen, sondern reklamieren; nicht mehr benennen, sondern
       erzählen. Die Vergangenheit kommt hier zum ersten Mal vor.
       ══════════════════════════════════════════════════════════════════ */

    /* ── A2 · Im Café ───────────────────────────────────────────────── */
    'a2.cafe': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Dein Kaffee ist kalt. Und du bist allergisch gegen Nüsse.', es:'Tu café está frío. Y eres alérgico a los frutos secos.', en:'Your coffee is cold. And you\'re allergic to nuts.', el:'Ο καφές σου είναι κρύος. Και είσαι αλλεργικός στους ξηρούς καρπούς.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'¿Qué tal todo por aquí?', na:{ de:'Alles in Ordnung bei Ihnen?', en:'How\'s everything over here?', el:'Πώς πάνε όλα εδώ;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Buena elección. Enseguida se lo traigo.', na:{ de:'Gute Wahl. Ich bringe es Ihnen sofort.', en:'Good choice. I\'ll bring it right away.', el:'Καλή επιλογή. Σας το φέρνω αμέσως.' } },
      wortschatz: [
        { z:'está frío',        na:{ de:'es ist kalt (Speise)', en:'it is cold (food)', el:'είναι κρύο (το φαγητό)' } },
        { z:'lo siento',        na:{ de:'es tut mir leid',      en:'I am sorry', el:'λυπάμαι' } },
        { z:'disculpe',         na:{ de:'entschuldigen Sie',    en:'excuse me', el:'με συγχωρείτε' } },
        { z:'lleva',            na:{ de:'es enthält',           en:'it contains', el:'έχει (περιέχει)' } },
        { z:'sin lactosa',      na:{ de:'ohne Laktose',         en:'lactose-free', el:'χωρίς λακτόζη' } },
        { z:'soy alérgico',     na:{ de:'ich bin allergisch',   en:'I am allergic', el:'είμαι αλλεργικός' } },
        { z:'los frutos secos', na:{ de:'die Nüsse',            en:'nuts', el:'οι ξηροί καρποί' } },
        { z:'cambiar',          na:{ de:'tauschen',             en:'to change', el:'αλλάζω' } },
        { z:'otra vez',         na:{ de:'noch einmal',          en:'again', el:'ξανά' } },
        { z:'me lo trae',       na:{ de:'bringen Sie es mir',   en:'bring it to me', el:'μου το φέρνετε' } },
        { z:'no pasa nada',     na:{ de:'kein Problem',         en:'no problem', el:'δεν πειράζει' } },
        { z:'pedí',             na:{ de:'ich habe bestellt',    en:'I ordered', el:'παρήγγειλα' } }
      ],
      dialog: {
        rolle: { de:'Der Kellner', en:'The waiter', el:'Ο σερβιτόρος' },
        zeilen: [
          { wer:'lerner', z:'Disculpe, el café está frío.', na:{ de:'Entschuldigen Sie, der Kaffee ist kalt.', en:'Excuse me, the coffee is cold.', el:'Με συγχωρείτε, ο καφές είναι κρύος.' } },
          { wer:'spikiu', z:'Lo siento mucho. Se lo cambio ahora mismo.', na:{ de:'Das tut mir sehr leid. Ich tausche ihn sofort.', en:'I am very sorry. I will change it right away.', el:'Λυπάμαι πολύ. Σας τον αλλάζω αμέσως.' } },
          { wer:'lerner', z:'Gracias. Una cosa más: ¿la tarta lleva frutos secos?', na:{ de:'Danke. Noch etwas: sind in dem Kuchen Nüsse?', en:'Thank you. One more thing: does the cake contain nuts?', el:'Ευχαριστώ. Κάτι ακόμα: η τούρτα έχει ξηρούς καρπούς;' } },
          { wer:'spikiu', z:'Esa sí. Pero la de limón no lleva nada.', na:{ de:'Der schon. Aber der Zitronenkuchen enthält nichts davon.', en:'That one does. But the lemon one has none.', el:'Αυτή ναι. Αλλά η λεμονιού δεν έχει τίποτα.' } },
          { wer:'lerner', z:'Perfecto, soy alérgico. Entonces la de limón.', na:{ de:'Perfekt, ich bin allergisch. Dann den Zitronenkuchen.', en:'Perfect, I am allergic. Then the lemon one.', el:'Τέλεια, είμαι αλλεργικός. Τότε τη λεμονιού.' } },
          { wer:'spikiu', z:'Muy bien. Enseguida se lo traigo.', na:{ de:'Sehr gut. Ich bringe ihn Ihnen sofort.', en:'Very good. I will bring it right away.', el:'Πολύ καλά. Σας τη φέρνω αμέσως.' } }
        ]
      },
      lesetext: {
        z:'Elena pidió un café con leche sin lactosa. El camarero le trajo uno normal. Elena se lo dijo con calma y él lo cambió enseguida. Al final no le cobró el café.',
        na:{ de:'Elena bestellte einen Milchkaffee ohne Laktose. Der Kellner brachte ihr einen normalen. Elena sagte es ihm ruhig, und er tauschte ihn sofort. Am Ende berechnete er ihr den Kaffee nicht.',
             en:'Elena ordered a coffee with lactose-free milk. The waiter brought her a normal one. Elena told him calmly and he changed it right away. In the end he did not charge her for the coffee.', el:'Η Έλενα παρήγγειλε έναν καφέ με γάλα χωρίς λακτόζη. Ο σερβιτόρος της έφερε έναν κανονικό. Η Έλενα του το είπε ήρεμα κι εκείνος τον άλλαξε αμέσως. Στο τέλος δεν της χρέωσε τον καφέ.' },
        frage:{ de:'Was tat der Kellner am Ende?', en:'What did the waiter do in the end?', el:'Τι έκανε στο τέλος ο σερβιτόρος;' },
        optionen:[
          { na:{ de:'Er berechnete den Kaffee nicht', en:'He did not charge for the coffee', el:'Δεν χρέωσε τον καφέ' }, richtig:true  },
          { na:{ de:'Er brachte einen Tee',           en:'He brought a tea', el:'Έφερε ένα τσάι' },                 richtig:false },
          { na:{ de:'Er sagte nichts',                en:'He said nothing', el:'Δεν είπε τίποτα' },                  richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag höflich, dass dein Tee kalt ist, und frage, ob der Kuchen Milch enthält. Zwei Sätze.',
                  en:'Politely say your tea is cold and ask whether the cake contains milk. Two sentences.', el:'Πες ευγενικά ότι το τσάι σου είναι κρύο και ρώτα αν η τούρτα έχει γάλα. Δύο προτάσεις.' },
        muster:'Disculpe, el té está frío. ¿La tarta lleva leche?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Ser" und „estar" heißen beide „sein". Estar sagt, wie etwas GERADE ist: el café está frío. Ser sagt, was etwas IMMER ist: el café es bueno.',
               en:'"Ser" and "estar" both mean "to be". Estar is how something is RIGHT NOW: el café está frío. Ser is what it always is: el café es bueno.', el:'Το «ser» και το «estar» σημαίνουν και τα δύο «είμαι». Το estar λέει πώς είναι κάτι ΑΥΤΗ ΤΗ ΣΤΙΓΜΗ: el café está frío. Το ser λέει τι είναι πάντα: el café es bueno.' },
        beispiele:[
          { z:'El café está frío.', na:{ de:'Der Kaffee ist kalt (jetzt).', en:'The coffee is cold (right now).', el:'Ο καφές είναι κρύος (τώρα).' } },
          { z:'El café es bueno.',  na:{ de:'Der Kaffee ist gut (immer).',  en:'The coffee is good (always).', el:'Ο καφές είναι καλός (πάντα).' } }
        ]
      }
    },

    /* ── A2 · Im Restaurant ─────────────────────────────────────────── */
    'a2.restaurant': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Ihr seid zu zweit, wollt euch ein Gericht teilen und getrennt zahlen.', es:'Sois dos, queréis compartir un plato y pagar por separado.', en:'There are two of you; you want to share a dish and pay separately.', el:'Είστε δύο, θέλετε να μοιραστείτε ένα πιάτο και να πληρώσετε χωριστά.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'Buenas tardes. ¿Ya saben qué van a tomar?', na:{ de:'Guten Abend. Wissen Sie schon, was Sie nehmen?', en:'Good evening. Have you decided?', el:'Καλησπέρα. Αποφασίσατε τι θα πάρετε;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Por supuesto. Ahora mismo se las traigo.', na:{ de:'Selbstverständlich. Ich bringe sie sofort.', en:'Of course. I\'ll bring them right away.', el:'Βεβαίως. Σας τους φέρνω αμέσως.' } },
      wortschatz: [
        { z:'la especialidad',  na:{ de:'die Spezialität',    en:'the speciality', el:'η σπεσιαλιτέ' } },
        { z:'el primero',       na:{ de:'die Vorspeise',      en:'the starter', el:'το ορεκτικό' } },
        { z:'el segundo',       na:{ de:'der Hauptgang',      en:'the main course', el:'το κυρίως πιάτο' } },
        { z:'el postre',        na:{ de:'die Nachspeise',     en:'the dessert', el:'το επιδόρπιο' } },
        { z:'compartir',        na:{ de:'teilen',             en:'to share', el:'μοιράζομαι' } },
        { z:'la propina',       na:{ de:'das Trinkgeld',      en:'the tip', el:'το φιλοδώρημα' } },
        { z:'picante',          na:{ de:'scharf',             en:'spicy', el:'καυτερό' } },
        { z:'ligero',           na:{ de:'leicht',             en:'light', el:'ελαφρύ' } },
        { z:'nos trae',         na:{ de:'bringen Sie uns',    en:'bring us', el:'μας φέρνετε' } },
        { z:'estaba buenísimo', na:{ de:'es war ausgezeichnet', en:'it was excellent', el:'ήταν πεντανόστιμο' } },
        { z:'por separado',     na:{ de:'getrennt',           en:'separately', el:'χωριστά' } },
        { z:'la tarjeta',       na:{ de:'die Karte (zum Zahlen)', en:'the card', el:'η κάρτα' } }
      ],
      dialog: {
        rolle: { de:'Die Kellnerin', en:'The waitress', el:'Η σερβιτόρα' },
        zeilen: [
          { wer:'lerner', z:'¿Cuál es la especialidad de la casa?', na:{ de:'Was ist die Spezialität des Hauses?', en:'What is the house speciality?', el:'Ποια είναι η σπεσιαλιτέ του μαγαζιού;' } },
          { wer:'spikiu', z:'El cochinillo asado. Es fuerte, pero está muy rico.', na:{ de:'Das Spanferkel aus dem Ofen. Kräftig, aber sehr gut.', en:'The roast suckling pig. Hearty, but very good.', el:'Το ψητό γουρουνόπουλο. Είναι βαρύ, αλλά πολύ νόστιμο.' } },
          { wer:'lerner', z:'¿Hay algo más ligero? Queremos compartir.', na:{ de:'Gibt es etwas Leichteres? Wir möchten teilen.', en:'Is there something lighter? We want to share.', el:'Υπάρχει κάτι πιο ελαφρύ; Θέλουμε να το μοιραστούμε.' } },
          { wer:'spikiu', z:'Entonces el pescado con verduras. Da para dos.', na:{ de:'Dann der Fisch mit Gemüse. Der reicht für zwei.', en:'Then the fish with vegetables. It is enough for two.', el:'Τότε το ψάρι με λαχανικά. Φτάνει για δύο.' } },
          { wer:'lerner', z:'Perfecto. Y después, ¿nos trae la cuenta por separado?', na:{ de:'Perfekt. Und danach: Bringen Sie uns die Rechnung getrennt?', en:'Perfect. And afterwards, could you bring us separate bills?', el:'Τέλεια. Και μετά, μας φέρνετε τον λογαριασμό χωριστά;' } },
          { wer:'spikiu', z:'Claro que sí. ¿Pagan con tarjeta?', na:{ de:'Selbstverständlich. Zahlen Sie mit Karte?', en:'Of course. Are you paying by card?', el:'Και βέβαια. Πληρώνετε με κάρτα;' } }
        ]
      },
      lesetext: {
        z:'Ayer cenamos en un restaurante pequeño del centro. Compartimos un pescado con verduras porque el plato de la casa era muy picante. De postre pedimos flan. Estaba buenísimo y dejamos propina.',
        na:{ de:'Gestern haben wir in einem kleinen Restaurant im Zentrum gegessen. Wir teilten einen Fisch mit Gemüse, weil das Hausgericht sehr scharf war. Als Nachspeise bestellten wir Flan. Er war ausgezeichnet, und wir gaben Trinkgeld.',
             en:'Yesterday we had dinner at a small restaurant in the centre. We shared a fish with vegetables because the house dish was very spicy. For dessert we ordered flan. It was excellent, and we left a tip.', el:'Χθες φάγαμε βραδινό σε ένα μικρό εστιατόριο στο κέντρο. Μοιραστήκαμε ένα ψάρι με λαχανικά, γιατί το πιάτο του μαγαζιού ήταν πολύ καυτερό. Για επιδόρπιο παραγγείλαμε φλαν. Ήταν πεντανόστιμο και αφήσαμε φιλοδώρημα.' },
        frage:{ de:'Warum teilten sie den Fisch?', en:'Why did they share the fish?', el:'Γιατί μοιράστηκαν το ψάρι;' },
        optionen:[
          { na:{ de:'Er war billiger',            en:'It was cheaper', el:'Ήταν πιο φτηνό' },           richtig:false },
          { na:{ de:'Das Hausgericht war scharf', en:'The house dish was spicy', el:'Το πιάτο του μαγαζιού ήταν καυτερό' }, richtig:true  },
          { na:{ de:'Es gab nichts anderes',      en:'There was nothing else', el:'Δεν υπήρχε τίποτα άλλο' },   richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frage nach der Spezialität und sag, dass ihr teilen möchtet. Zwei Sätze.',
                  en:'Ask about the speciality and say that you want to share. Two sentences.', el:'Ρώτα για τη σπεσιαλιτέ και πες ότι θέλετε να μοιραστείτε. Δύο προτάσεις.' },
        muster:'¿Cuál es la especialidad de la casa? Queremos compartir un plato.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Für Erlebtes gibt es eine eigene Form: cenamos, compartimos, pedimos. Sie endet oft auf -amos oder -imos und heißt: wir haben das gemacht, es ist vorbei.',
               en:'Finished experiences get their own form: cenamos, compartimos, pedimos. It usually ends in -amos or -imos and means: we did it, it is over.', el:'Οι ολοκληρωμένες εμπειρίες έχουν δικό τους τύπο: cenamos, compartimos, pedimos. Συνήθως τελειώνει σε -amos ή -imos και σημαίνει: το κάναμε, τελείωσε.' },
        beispiele:[
          { z:'Ayer cenamos aquí.',   na:{ de:'Gestern haben wir hier gegessen.', en:'Yesterday we ate here.', el:'Χθες φάγαμε εδώ.' } },
          { z:'Pedimos el pescado.',  na:{ de:'Wir bestellten den Fisch.',        en:'We ordered the fish.', el:'Παραγγείλαμε το ψάρι.' } }
        ]
      }
    },

    /* ── A2 · Einkaufen ─────────────────────────────────────────────── */
    'a2.einkaufen': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du hast gestern ein Hemd gekauft. Es ist dir zu groß, den Kassenbon hast du dabei.', es:'Ayer compraste una camisa. Te queda grande y llevas el ticket.', en:'You bought a shirt yesterday. It\'s too big and you have the receipt.', el:'Χθες αγόρασες ένα πουκάμισο. Σου είναι μεγάλο και έχεις την απόδειξη.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'Buenos días. ¿En qué puedo ayudarle?', na:{ de:'Guten Tag. Womit kann ich helfen?', en:'Hello. What can I help you with?', el:'Καλημέρα. Πώς μπορώ να σας βοηθήσω;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Claro. Le espero aquí.', na:{ de:'Gerne. Ich warte hier auf Sie.', en:'Sure. I\'ll wait here.', el:'Βεβαίως. Σας περιμένω εδώ.' } },
      wortschatz: [
        { z:'cambiar',        na:{ de:'umtauschen',        en:'to exchange', el:'αλλάζω' } },
        { z:'devolver',       na:{ de:'zurückgeben',       en:'to return', el:'επιστρέφω' } },
        { z:'el ticket',      na:{ de:'der Kassenbon',     en:'the receipt', el:'η απόδειξη' } },
        { z:'la talla',       na:{ de:'die Größe',         en:'the size', el:'το νούμερο' } },
        { z:'me queda grande',na:{ de:'es ist mir zu groß',en:'it is too big for me', el:'μου είναι μεγάλο' } },
        { z:'me queda bien',  na:{ de:'es passt mir',      en:'it fits me', el:'μου κάνει' } },
        { z:'probarme',       na:{ de:'anprobieren',       en:'to try on', el:'να το δοκιμάσω' } },
        { z:'el probador',    na:{ de:'die Umkleide',      en:'the fitting room', el:'το δοκιμαστήριο' } },
        { z:'la rebaja',      na:{ de:'der Rabatt',        en:'the discount', el:'η έκπτωση' } },
        { z:'está roto',      na:{ de:'es ist kaputt',     en:'it is broken', el:'είναι σπασμένο' } },
        { z:'otro color',     na:{ de:'eine andere Farbe', en:'another colour', el:'άλλο χρώμα' } },
        { z:'lo compré',      na:{ de:'ich habe es gekauft', en:'I bought it', el:'το αγόρασα' } }
      ],
      dialog: {
        rolle: { de:'Der Verkäufer', en:'The shop assistant', el:'Ο πωλητής' },
        zeilen: [
          { wer:'lerner', z:'Compré esta camisa ayer, pero me queda grande.', na:{ de:'Ich habe dieses Hemd gestern gekauft, aber es ist mir zu groß.', en:'I bought this shirt yesterday, but it is too big for me.', el:'Αγόρασα αυτό το πουκάμισο χθες, αλλά μου είναι μεγάλο.' } },
          { wer:'spikiu', z:'¿Trae el ticket?', na:{ de:'Haben Sie den Kassenbon dabei?', en:'Do you have the receipt?', el:'Έχετε την απόδειξη;' } },
          { wer:'lerner', z:'Sí, aquí está. ¿Puedo cambiarla?', na:{ de:'Ja, hier ist er. Kann ich es umtauschen?', en:'Yes, here it is. Can I exchange it?', el:'Ναι, ορίστε. Μπορώ να το αλλάξω;' } },
          { wer:'spikiu', z:'Claro. ¿Qué talla necesita?', na:{ de:'Klar. Welche Größe brauchen Sie?', en:'Of course. What size do you need?', el:'Βεβαίως. Τι νούμερο χρειάζεστε;' } },
          { wer:'lerner', z:'Una menos. ¿Me la puedo probar?', na:{ de:'Eine kleiner. Kann ich es anprobieren?', en:'One smaller. May I try it on?', el:'Ένα μικρότερο. Μπορώ να το δοκιμάσω;' } },
          { wer:'spikiu', z:'Por supuesto. El probador está al fondo.', na:{ de:'Selbstverständlich. Die Umkleide ist hinten.', en:'Of course. The fitting room is at the back.', el:'Φυσικά. Το δοκιμαστήριο είναι στο βάθος.' } }
        ]
      },
      lesetext: {
        z:'Marta compró unos zapatos la semana pasada. En casa vio que uno estaba roto. Volvió a la tienda con el ticket. No tenían otro par de esa talla, así que le devolvieron el dinero.',
        na:{ de:'Marta kaufte letzte Woche Schuhe. Zu Hause sah sie, dass einer kaputt war. Sie ging mit dem Kassenbon in den Laden zurück. Sie hatten kein zweites Paar in der Größe, also gaben sie ihr das Geld zurück.',
             en:'Marta bought some shoes last week. At home she saw that one was broken. She went back to the shop with the receipt. They had no other pair in that size, so they gave her the money back.', el:'Η Μάρτα αγόρασε ένα ζευγάρι παπούτσια την περασμένη εβδομάδα. Στο σπίτι είδε ότι το ένα ήταν χαλασμένο. Γύρισε στο μαγαζί με την απόδειξη. Δεν είχαν άλλο ζευγάρι σε εκείνο το νούμερο, οπότε της επέστρεψαν τα χρήματα.' },
        frage:{ de:'Warum bekam Marta ihr Geld zurück?', en:'Why did Marta get her money back?', el:'Γιατί πήρε πίσω τα χρήματά της η Μάρτα;' },
        optionen:[
          { na:{ de:'Sie wollte eine andere Farbe',   en:'She wanted another colour', el:'Ήθελε άλλο χρώμα' },       richtig:false },
          { na:{ de:'Die Größe war nicht mehr da',    en:'The size was not available', el:'Δεν υπήρχε το νούμερο' },      richtig:true  },
          { na:{ de:'Sie hatte keinen Kassenbon',     en:'She had no receipt', el:'Δεν είχε απόδειξη' },              richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du die Hose gestern gekauft hast und sie umtauschen möchtest. Zwei Sätze.',
                  en:'Say you bought the trousers yesterday and want to exchange them. Two sentences.', el:'Πες ότι αγόρασες το παντελόνι χθες και θέλεις να το αλλάξεις. Δύο προτάσεις.' },
        muster:'Compré este pantalón ayer. Me queda grande, ¿puedo cambiarlo?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Quedar" sagt, wie Kleidung sitzt: me queda grande, me queda bien. Wörtlich heißt es „es bleibt mir" — das muss man nicht verstehen, nur benutzen.',
               en:'"Quedar" describes how clothes fit: me queda grande, me queda bien. Literally "it remains to me" — no need to understand it, just use it.', el:'Το «quedar» περιγράφει πώς σου κάνουν τα ρούχα: me queda grande, me queda bien. Κατά λέξη «μου μένει» — δεν χρειάζεται να το καταλάβεις, απλώς χρησιμοποίησέ το.' },
        beispiele:[
          { z:'Me queda grande.', na:{ de:'Es ist mir zu groß.', en:'It is too big for me.', el:'Μου είναι μεγάλο.' } },
          { z:'Te queda bien.',   na:{ de:'Es passt dir gut.',   en:'It suits you.', el:'Σου πάει.' } }
        ]
      }
    },

    /* ── A2 · Nach dem Weg fragen ───────────────────────────────────── */
    'a2.wegbeschreibung': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du suchst das Museum und gehst gern zu Fuß.', es:'Buscas el museo y te gusta ir a pie.', en:'You\'re looking for the museum and you don\'t mind walking.', el:'Ψάχνεις το μουσείο και δεν σε πειράζει να περπατήσεις.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'¿Necesita ayuda?', na:{ de:'Brauchen Sie Hilfe?', en:'Do you need help?', el:'Χρειάζεστε βοήθεια;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Sí, se llega bien. ¡Que lo disfrute!', na:{ de:'Ja, das geht gut. Viel Freude dabei!', en:'Yes, it\'s an easy walk. Enjoy!', el:'Ναι, πάτε εύκολα με τα πόδια. Να το χαρείτε!' } },
      wortschatz: [
        { z:'siga',            na:{ de:'gehen Sie weiter',   en:'carry on', el:'συνεχίστε' } },
        { z:'gire',            na:{ de:'biegen Sie ab',      en:'turn', el:'στρίψτε' } },
        { z:'cruce',           na:{ de:'überqueren Sie',     en:'cross', el:'περάστε' } },
        { z:'el semáforo',     na:{ de:'die Ampel',          en:'the traffic light', el:'το φανάρι' } },
        { z:'la rotonda',      na:{ de:'der Kreisverkehr',   en:'the roundabout', el:'ο κυκλικός κόμβος' } },
        { z:'la parada',       na:{ de:'die Haltestelle',    en:'the stop', el:'η στάση' } },
        { z:'hasta',           na:{ de:'bis zu',             en:'as far as', el:'μέχρι' } },
        { z:'enfrente de',     na:{ de:'gegenüber von',      en:'opposite', el:'απέναντι από' } },
        { z:'al lado de',      na:{ de:'neben',              en:'next to', el:'δίπλα σε' } },
        { z:'detrás de',       na:{ de:'hinter',             en:'behind', el:'πίσω από' } },
        { z:'a pie',           na:{ de:'zu Fuß',             en:'on foot', el:'με τα πόδια' } },
        { z:'no tiene pérdida', na:{ de:'man kann es nicht verfehlen', en:'you can\'t miss it', el:'δεν μπορείτε να το χάσετε' } }
      ],
      dialog: {
        rolle: { de:'Ein älterer Herr', en:'An older gentleman', el:'Ένας ηλικιωμένος κύριος' },
        zeilen: [
          { wer:'lerner', z:'Perdone, ¿cómo llego al museo desde aquí?', na:{ de:'Entschuldigen Sie, wie komme ich von hier zum Museum?', en:'Excuse me, how do I get to the museum from here?', el:'Συγγνώμη, πώς πάω στο μουσείο από εδώ;' } },
          { wer:'spikiu', z:'Siga hasta el semáforo y cruce la calle.', na:{ de:'Gehen Sie bis zur Ampel und überqueren Sie die Straße.', en:'Carry on to the traffic light and cross the street.', el:'Συνεχίστε μέχρι το φανάρι και περάστε τον δρόμο.' } },
          { wer:'lerner', z:'¿Y después?', na:{ de:'Und dann?', en:'And then?', el:'Και μετά;' } },
          { wer:'spikiu', z:'En la rotonda gire a la derecha. Está enfrente del parque.', na:{ de:'Am Kreisverkehr biegen Sie rechts ab. Es liegt gegenüber vom Park.', en:'At the roundabout turn right. It is opposite the park.', el:'Στον κυκλικό κόμβο στρίψτε δεξιά. Είναι απέναντι από το πάρκο.' } },
          { wer:'lerner', z:'¿Se puede ir a pie?', na:{ de:'Kann man zu Fuß gehen?', en:'Can I walk there?', el:'Μπορώ να πάω με τα πόδια;' } },
          { wer:'spikiu', z:'Sí, quince minutos. No tiene pérdida, es un edificio grande.', na:{ de:'Ja, fünfzehn Minuten. Sie können es nicht verfehlen, es ist ein großes Gebäude.', en:'Yes, fifteen minutes. You cannot miss it, it is a big building.', el:'Ναι, δεκαπέντε λεπτά. Δεν μπορείτε να το χάσετε, είναι ένα μεγάλο κτίριο.' } }
        ]
      },
      lesetext: {
        z:'Para llegar a la biblioteca, sal de la estación y sigue hasta la rotonda. Allí gira a la izquierda. La biblioteca está al lado de una farmacia, enfrente de la parada del autobús.',
        na:{ de:'Um zur Bibliothek zu kommen, verlasse den Bahnhof und geh bis zum Kreisverkehr. Dort biege links ab. Die Bibliothek liegt neben einer Apotheke, gegenüber der Bushaltestelle.',
             en:'To get to the library, leave the station and carry on to the roundabout. Turn left there. The library is next to a pharmacy, opposite the bus stop.', el:'Για να φτάσεις στη βιβλιοθήκη, βγες από τον σταθμό και συνέχισε μέχρι τον κυκλικό κόμβο. Εκεί στρίψε αριστερά. Η βιβλιοθήκη είναι δίπλα σε ένα φαρμακείο, απέναντι από τη στάση του λεωφορείου.' },
        frage:{ de:'Was liegt neben der Bibliothek?', en:'What is next to the library?', el:'Τι είναι δίπλα στη βιβλιοθήκη;' },
        optionen:[
          { na:{ de:'Eine Apotheke',      en:'A pharmacy', el:'Ένα φαρμακείο' },  richtig:true  },
          { na:{ de:'Die Bushaltestelle', en:'The bus stop', el:'Η στάση του λεωφορείου' },richtig:false },
          { na:{ de:'Der Bahnhof',        en:'The station', el:'Ο σταθμός' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erkläre jemandem den Weg: geradeaus bis zur Ampel, dann links. Zwei Sätze.',
                  en:'Explain the way to someone: straight on to the traffic light, then left. Two sentences.', el:'Εξήγησε σε κάποιον τον δρόμο: ευθεία μέχρι το φανάρι και μετά αριστερά. Δύο προτάσεις.' },
        muster:'Siga todo recto hasta el semáforo. Allí gire a la izquierda.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Wegbeschreibungen benutzen die Sie-Befehlsform: siga, gire, cruce. Sie endet auf -e, wo das Verb sonst auf -a endet — deshalb klingt sie ungewohnt.',
               en:'Directions use the polite command form: siga, gire, cruce. It ends in -e where the verb normally ends in -a, which is why it sounds unfamiliar.', el:'Για οδηγίες χρησιμοποιείς την ευγενική προστακτική: siga, gire, cruce. Τελειώνει σε -e εκεί όπου το ρήμα κανονικά τελειώνει σε -a, γι\' αυτό ακούγεται άγνωστο.' },
        beispiele:[
          { z:'Siga todo recto.',   na:{ de:'Gehen Sie geradeaus.',  en:'Carry straight on.', el:'Συνεχίστε ευθεία.' } },
          { z:'Gire a la derecha.', na:{ de:'Biegen Sie rechts ab.', en:'Turn right.', el:'Στρίψτε δεξιά.' } }
        ]
      }
    },

    /* ── A2 · Im Taxi ───────────────────────────────────────────────── */
    'a2.taxi': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du willst zum Flughafen und hast es eilig. Am Ende brauchst du eine Quittung.', es:'Quieres ir al aeropuerto y tienes prisa. Al final necesitas un recibo.', en:'You\'re in a hurry to the airport. At the end you need a receipt.', el:'Βιάζεσαι να πας στο αεροδρόμιο. Στο τέλος χρειάζεσαι απόδειξη.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'Buenos días. ¿Adónde le llevo?', na:{ de:'Guten Tag. Wohin darf ich Sie bringen?', en:'Morning. Where can I take you?', el:'Καλημέρα. Πού να σας πάω;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Claro que sí. ¡Buen vuelo!', na:{ de:'Aber sicher. Guten Flug!', en:'Absolutely. Have a good flight!', el:'Και βέβαια. Καλή πτήση!' } },
      wortschatz: [
        { z:'el tráfico',      na:{ de:'der Verkehr',        en:'the traffic', el:'η κίνηση' } },
        { z:'el atasco',       na:{ de:'der Stau',           en:'the traffic jam', el:'το μποτιλιάρισμα' } },
        { z:'dar la vuelta',   na:{ de:'wenden',             en:'to turn around', el:'κάνω αναστροφή' } },
        { z:'el desvío',       na:{ de:'die Umleitung',      en:'the detour', el:'η παράκαμψη' } },
        { z:'esperar',         na:{ de:'warten',             en:'to wait', el:'περιμένω' } },
        { z:'un momento',      na:{ de:'einen Moment',       en:'a moment', el:'μια στιγμή' } },
        { z:'el recibo',       na:{ de:'die Quittung',       en:'the receipt', el:'η απόδειξη' } },
        { z:'tengo prisa',     na:{ de:'ich habe es eilig',  en:'I am in a hurry', el:'βιάζομαι' } },
        { z:'llego tarde',     na:{ de:'ich komme zu spät',  en:'I am running late', el:'αργώ' } },
        { z:'por aquí',        na:{ de:'hier entlang',       en:'this way', el:'από εδώ' } },
        { z:'es más rápido',   na:{ de:'es geht schneller',  en:'it is faster', el:'είναι πιο γρήγορα' } },
        { z:'me deja aquí',    na:{ de:'lassen Sie mich hier raus', en:'drop me here', el:'αφήστε με εδώ' } }
      ],
      dialog: {
        rolle: { de:'Der Taxifahrer', en:'The taxi driver', el:'Ο ταξιτζής' },
        zeilen: [
          { wer:'lerner', z:'Al aeropuerto, por favor. Tengo prisa.', na:{ de:'Zum Flughafen, bitte. Ich habe es eilig.', en:'To the airport, please. I am in a hurry.', el:'Στο αεροδρόμιο, παρακαλώ. Βιάζομαι.' } },
          { wer:'spikiu', z:'Hay un atasco en la autopista. ¿Voy por el centro?', na:{ de:'Auf der Autobahn ist ein Stau. Soll ich durchs Zentrum fahren?', en:'There is a jam on the motorway. Shall I go through the centre?', el:'Έχει μποτιλιάρισμα στον αυτοκινητόδρομο. Να πάω από το κέντρο;' } },
          { wer:'lerner', z:'¿Es más rápido por ahí?', na:{ de:'Geht es da schneller?', en:'Is it faster that way?', el:'Είναι πιο γρήγορα από εκεί;' } },
          { wer:'spikiu', z:'Con este tráfico, sí. Diez minutos menos.', na:{ de:'Bei diesem Verkehr ja. Zehn Minuten weniger.', en:'With this traffic, yes. Ten minutes less.', el:'Με τέτοια κίνηση, ναι. Δέκα λεπτά λιγότερο.' } },
          { wer:'lerner', z:'Entonces por ahí. ¿Me da un recibo al final?', na:{ de:'Dann da entlang. Geben Sie mir am Ende eine Quittung?', en:'Then that way. Could you give me a receipt at the end?', el:'Τότε από εκεί. Μου δίνετε απόδειξη στο τέλος;' } },
          { wer:'spikiu', z:'Sin problema. Llegamos a tiempo.', na:{ de:'Kein Problem. Wir kommen rechtzeitig an.', en:'No problem. We will arrive on time.', el:'Κανένα πρόβλημα. Θα φτάσουμε στην ώρα μας.' } }
        ]
      },
      lesetext: {
        z:'Andrés tomó un taxi porque llegaba tarde. Había mucho tráfico y el taxista dio la vuelta para evitar el atasco. Llegaron a tiempo. Andrés pidió un recibo para la empresa.',
        na:{ de:'Andrés nahm ein Taxi, weil er zu spät dran war. Es war viel Verkehr, und der Fahrer wendete, um den Stau zu umfahren. Sie kamen rechtzeitig an. Andrés bat für die Firma um eine Quittung.',
             en:'Andrés took a taxi because he was running late. There was heavy traffic and the driver turned around to avoid the jam. They arrived on time. Andrés asked for a receipt for his company.', el:'Ο Αντρές πήρε ταξί γιατί αργούσε. Είχε πολλή κίνηση και ο ταξιτζής έκανε αναστροφή για να αποφύγει το μποτιλιάρισμα. Έφτασαν στην ώρα τους. Ο Αντρές ζήτησε απόδειξη για την εταιρεία.' },
        frage:{ de:'Warum wendete der Fahrer?', en:'Why did the driver turn around?', el:'Γιατί έκανε αναστροφή ο ταξιτζής;' },
        optionen:[
          { na:{ de:'Wegen des Staus',        en:'Because of the jam', el:'Λόγω του μποτιλιαρίσματος' },      richtig:true  },
          { na:{ de:'Er kannte den Weg nicht',en:'He did not know the way', el:'Δεν ήξερε τον δρόμο' }, richtig:false },
          { na:{ de:'Andrés wollte es',       en:'Andrés asked him to', el:'Του το ζήτησε ο Αντρές' },     richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du es eilig hast, und frage nach einer Quittung. Zwei Sätze.',
                  en:'Say that you are in a hurry and ask for a receipt. Two sentences.', el:'Πες ότι βιάζεσαι και ζήτα απόδειξη. Δύο προτάσεις.' },
        muster:'Tengo prisa, llego tarde. ¿Me da un recibo, por favor?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Había" heißt „es gab" und ändert sich nie — egal ob eins oder hundert: había un atasco, había muchos coches. Eine Form für alles.',
               en:'"Había" means "there was/were" and never changes — one or a hundred: había un atasco, había muchos coches. One form for everything.', el:'Το «había» σημαίνει «υπήρχε/υπήρχαν» και δεν αλλάζει ποτέ — είτε ένα είτε εκατό: había un atasco, había muchos coches. Ένας τύπος για όλα.' },
        beispiele:[
          { z:'Había mucho tráfico.', na:{ de:'Es war viel Verkehr.', en:'There was a lot of traffic.', el:'Είχε πολλή κίνηση.' } },
          { z:'Había un atasco.',     na:{ de:'Es gab einen Stau.',   en:'There was a traffic jam.', el:'Είχε μποτιλιάρισμα.' } }
        ]
      }
    },

    /* ── A2 · Über die Familie ──────────────────────────────────────── */
    'a2.familie': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen
         — etwa das 'ich verstehe dich nicht' der Szene. Ohne dieses Feld
         siezte Spikiu mitten in einem Du-Gespraech (Leo, 31.08.). */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Als Kind hast du in einem kleinen Dorf gewohnt. Deine Schwester ist weggezogen.', es:'De niño vivías en un pueblo pequeño. Tu hermana se mudó.', en:'As a child you lived in a small village. Your sister has moved away.', el:'Όταν ήσουν παιδί, έμενες σε ένα μικρό χωριό. Η αδελφή σου μετακόμισε.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Se entiende. Seguro que la ves pronto.', na:{ de:'Das kann ich verstehen. Ihr seht euch bestimmt bald.', en:'I understand. You\'ll see her soon, I\'m sure.', el:'Σε καταλαβαίνω. Σίγουρα θα τη δεις σύντομα.' } },
      wortschatz: [
        { z:'cuando era niño', na:{ de:'als ich klein war',  en:'when I was a child', el:'όταν ήμουν παιδί' } },
        { z:'vivíamos',        na:{ de:'wir wohnten',        en:'we used to live', el:'μέναμε' } },
        { z:'el pueblo',       na:{ de:'das Dorf',           en:'the village', el:'το χωριό' } },
        { z:'los primos',      na:{ de:'die Cousins',        en:'the cousins', el:'τα ξαδέλφια' } },
        { z:'la tía',          na:{ de:'die Tante',          en:'the aunt', el:'η θεία' } },
        { z:'el tío',          na:{ de:'der Onkel',          en:'the uncle', el:'ο θείος' } },
        { z:'nos reuníamos',   na:{ de:'wir trafen uns',     en:'we used to gather', el:'μαζευόμασταν' } },
        { z:'la boda',         na:{ de:'die Hochzeit',       en:'the wedding', el:'ο γάμος' } },
        { z:'se mudó',         na:{ de:'er/sie zog um',      en:'he/she moved', el:'μετακόμισε' } },
        { z:'echar de menos',  na:{ de:'vermissen',          en:'to miss', el:'μου λείπει (κάποιος)' } },
        { z:'antes',           na:{ de:'früher',             en:'before', el:'πριν, παλιά' } },
        { z:'ahora',           na:{ de:'jetzt',              en:'now', el:'τώρα' } }
      ],
      dialog: {
        rolle: { de:'Eine Kollegin', en:'A colleague', el:'Μια συνάδελφος' },
        zeilen: [
          { wer:'spikiu', z:'¿Dónde vivías cuando eras niño?', na:{ de:'Wo hast du gewohnt, als du klein warst?', en:'Where did you live when you were a child?', el:'Πού έμενες όταν ήσουν παιδί;' } },
          { wer:'lerner', z:'Vivíamos en un pueblo pequeño.', na:{ de:'Wir wohnten in einem kleinen Dorf.', en:'We lived in a small village.', el:'Μέναμε σε ένα μικρό χωριό.' } },
          { wer:'spikiu', z:'¿Y toda la familia estaba allí?', na:{ de:'Und war die ganze Familie dort?', en:'And was the whole family there?', el:'Και ήταν όλη η οικογένεια εκεί;' } },
          { wer:'lerner', z:'Sí. Los domingos nos reuníamos en casa de mi tía.', na:{ de:'Ja. Sonntags trafen wir uns bei meiner Tante.', en:'Yes. On Sundays we gathered at my aunt\u2019s house.', el:'Ναι. Τις Κυριακές μαζευόμασταν στο σπίτι της θείας μου.' } },
          { wer:'spikiu', z:'Qué bonito. ¿Siguen allí?', na:{ de:'Wie schön. Sind sie noch dort?', en:'How lovely. Are they still there?', el:'Τι ωραία. Είναι ακόμα εκεί;' } },
          { wer:'lerner', z:'No, mi hermana se mudó. La echo de menos.', na:{ de:'Nein, meine Schwester ist umgezogen. Ich vermisse sie.', en:'No, my sister moved away. I miss her.', el:'Όχι, η αδελφή μου μετακόμισε. Μου λείπει.' } }
        ]
      },
      lesetext: {
        z:'Antes la familia de Rosa vivía toda en el mismo pueblo. Los domingos comían juntos en casa de la abuela. Ahora los primos trabajan en otras ciudades y solo se ven en las bodas.',
        na:{ de:'Früher wohnte Rosas Familie ganz im selben Dorf. Sonntags aßen sie zusammen bei der Großmutter. Jetzt arbeiten die Cousins in anderen Städten und sehen sich nur noch auf Hochzeiten.',
             en:'Rosa\u2019s family all used to live in the same village. On Sundays they ate together at their grandmother\u2019s. Now the cousins work in other cities and only see each other at weddings.', el:'Παλιά όλη η οικογένεια της Ρόσα ζούσε στο ίδιο χωριό. Τις Κυριακές έτρωγαν μαζί στο σπίτι της γιαγιάς. Τώρα τα ξαδέλφια δουλεύουν σε άλλες πόλεις και βλέπονται μόνο στους γάμους.' },
        frage:{ de:'Wann sehen sich die Cousins heute?', en:'When do the cousins see each other now?', el:'Πότε βλέπονται τώρα τα ξαδέλφια;' },
        optionen:[
          { na:{ de:'Jeden Sonntag',   en:'Every Sunday', el:'Κάθε Κυριακή' },   richtig:false },
          { na:{ de:'Auf Hochzeiten',  en:'At weddings', el:'Στους γάμους' },    richtig:true  },
          { na:{ de:'Im Dorf',         en:'In the village', el:'Στο χωριό' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, wo du als Kind gewohnt hast und wen ihr sonntags getroffen habt. Zwei Sätze.',
                  en:'Tell where you lived as a child and who you used to meet on Sundays. Two sentences.', el:'Διηγήσου πού έμενες όταν ήσουν παιδί και ποιους συναντούσατε τις Κυριακές. Δύο προτάσεις.' },
        muster:'Cuando era niño vivíamos en una ciudad pequeña. Los domingos comíamos con mis abuelos.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Für Gewohnheiten von früher gibt es eine eigene Form: vivíamos, comíamos, era. Sie heißt nicht „einmal passiert", sondern „immer wieder, damals".',
               en:'Past habits get their own form: vivíamos, comíamos, era. It does not mean "happened once" but "again and again, back then".', el:'Οι συνήθειες του παρελθόντος έχουν δικό τους τύπο: vivíamos, comíamos, era. Δεν σημαίνει «έγινε μία φορά» αλλά «ξανά και ξανά, τότε» — όπως ο ελληνικός παρατατικός.' },
        beispiele:[
          { z:'Vivíamos en el pueblo.', na:{ de:'Wir wohnten (damals) im Dorf.', en:'We used to live in the village.', el:'Μέναμε στο χωριό.' } },
          { z:'Cuando era niño …',      na:{ de:'Als ich klein war …',          en:'When I was a child …', el:'Όταν ήμουν παιδί …' } }
        ]
      }
    },

    /* ── A2 · Im Hotel ──────────────────────────────────────────────── */
    'a2.hotel': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Seit gestern Abend geht die Heizung nicht, warmes Wasser auch nicht.', es:'Desde anoche no funciona la calefacción, y tampoco hay agua caliente.', en:'Since last night the heating hasn\'t worked, and there\'s no hot water either.', el:'Από χθες το βράδυ δεν λειτουργεί η θέρμανση και δεν έχει ούτε ζεστό νερό.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'Buenos días. ¿Qué tal la habitación?', na:{ de:'Guten Morgen. Wie ist das Zimmer?', en:'Good morning. How\'s the room?', el:'Καλημέρα. Πώς είναι το δωμάτιο;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Le preparo la 305. ¡Que descanse!', na:{ de:'Ich mache Ihnen die 305 fertig. Gute Erholung!', en:'I\'ll get 305 ready for you. Have a good rest!', el:'Σας ετοιμάζω το 305. Καλή ξεκούραση!' } },
      wortschatz: [
        { z:'no funciona',     na:{ de:'es funktioniert nicht', en:'it does not work', el:'δεν λειτουργεί' } },
        { z:'la calefacción',  na:{ de:'die Heizung',           en:'the heating', el:'η θέρμανση' } },
        { z:'el aire',         na:{ de:'die Klimaanlage',       en:'the air conditioning', el:'ο κλιματισμός' } },
        { z:'la ducha',        na:{ de:'die Dusche',            en:'the shower', el:'το ντους' } },
        { z:'el agua caliente',na:{ de:'das warme Wasser',      en:'hot water', el:'το ζεστό νερό' } },
        { z:'la toalla',       na:{ de:'das Handtuch',          en:'the towel', el:'η πετσέτα' } },
        { z:'hace ruido',      na:{ de:'es macht Lärm',         en:'it is noisy', el:'κάνει θόρυβο' } },
        { z:'cambiar de habitación', na:{ de:'das Zimmer wechseln', en:'to change rooms', el:'αλλάζω δωμάτιο' } },
        { z:'la limpieza',     na:{ de:'die Reinigung',         en:'the cleaning', el:'η καθαριότητα' } },
        { z:'lo arreglamos',   na:{ de:'wir bringen es in Ordnung', en:'we will fix it', el:'θα το φτιάξουμε' } },
        { z:'la queja',        na:{ de:'die Beschwerde',        en:'the complaint', el:'το παράπονο' } },
        { z:'anoche',          na:{ de:'gestern Nacht',         en:'last night', el:'χθες το βράδυ' } }
      ],
      dialog: {
        rolle: { de:'Der Empfangschef', en:'The front desk manager', el:'Ο υπεύθυνος της ρεσεψιόν' },
        zeilen: [
          { wer:'lerner', z:'Buenos días. La calefacción de mi habitación no funciona.', na:{ de:'Guten Morgen. Die Heizung in meinem Zimmer funktioniert nicht.', en:'Good morning. The heating in my room does not work.', el:'Καλημέρα. Η θέρμανση στο δωμάτιό μου δεν λειτουργεί.' } },
          { wer:'spikiu', z:'Lo siento mucho. ¿Desde cuándo?', na:{ de:'Das tut mir sehr leid. Seit wann?', en:'I am very sorry. Since when?', el:'Λυπάμαι πολύ. Από πότε;' } },
          { wer:'lerner', z:'Desde anoche. Y no hay agua caliente.', na:{ de:'Seit gestern Nacht. Und es gibt kein warmes Wasser.', en:'Since last night. And there is no hot water.', el:'Από χθες το βράδυ. Και δεν έχει ζεστό νερό.' } },
          { wer:'spikiu', z:'Enviamos a alguien ahora mismo. ¿O prefiere cambiar de habitación?', na:{ de:'Wir schicken sofort jemanden. Oder möchten Sie lieber das Zimmer wechseln?', en:'We will send someone right away. Or would you rather change rooms?', el:'Στέλνουμε κάποιον αμέσως. Ή προτιμάτε να αλλάξετε δωμάτιο;' } },
          { wer:'lerner', z:'Prefiero cambiar, si es posible.', na:{ de:'Ich würde lieber wechseln, wenn es möglich ist.', en:'I would rather change, if possible.', el:'Προτιμώ να αλλάξω, αν γίνεται.' } },
          { wer:'spikiu', z:'Por supuesto. Le doy la 305, es más tranquila.', na:{ de:'Selbstverständlich. Ich gebe Ihnen die 305, sie ist ruhiger.', en:'Of course. I will give you 305, it is quieter.', el:'Φυσικά. Σας δίνω το 305, είναι πιο ήσυχο.' } }
        ]
      },
      lesetext: {
        z:'Cuando llegamos al hotel, la habitación estaba fría y la ducha no funcionaba. Hablamos con recepción y nos cambiaron enseguida. La nueva habitación era más tranquila y no daba a la calle.',
        na:{ de:'Als wir im Hotel ankamen, war das Zimmer kalt und die Dusche funktionierte nicht. Wir sprachen mit der Rezeption, und man wechselte uns sofort. Das neue Zimmer war ruhiger und ging nicht zur Straße hinaus.',
             en:'When we arrived at the hotel, the room was cold and the shower did not work. We spoke to reception and they moved us right away. The new room was quieter and did not face the street.', el:'Όταν φτάσαμε στο ξενοδοχείο, το δωμάτιο ήταν κρύο και το ντους δεν λειτουργούσε. Μιλήσαμε με τη ρεσεψιόν και μας άλλαξαν αμέσως. Το καινούργιο δωμάτιο ήταν πιο ήσυχο και δεν έβλεπε στον δρόμο.' },
        frage:{ de:'Was war am neuen Zimmer besser?', en:'What was better about the new room?', el:'Τι ήταν καλύτερο στο καινούργιο δωμάτιο;' },
        optionen:[
          { na:{ de:'Es war größer',            en:'It was bigger', el:'Ήταν πιο μεγάλο' },              richtig:false },
          { na:{ de:'Es war ruhiger',           en:'It was quieter', el:'Ήταν πιο ήσυχο' },             richtig:true  },
          { na:{ de:'Es hatte einen Balkon',    en:'It had a balcony', el:'Είχε μπαλκόνι' },           richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Melde, dass die Klimaanlage nicht funktioniert, und bitte um ein anderes Zimmer. Zwei Sätze.',
                  en:'Report that the air conditioning does not work and ask for another room. Two sentences.', el:'Ανέφερε ότι ο κλιματισμός δεν λειτουργεί και ζήτα άλλο δωμάτιο. Δύο προτάσεις.' },
        muster:'El aire no funciona desde anoche. ¿Puedo cambiar de habitación?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Desde" heißt „seit" und braucht immer einen Zeitpunkt: desde anoche, desde el lunes. Für eine Dauer nimmt man stattdessen desde hace: desde hace dos días.',
               en:'"Desde" means "since" and needs a point in time: desde anoche, desde el lunes. For a duration use desde hace: desde hace dos días.', el:'Το «desde» σημαίνει «από» και θέλει ένα χρονικό σημείο: desde anoche, desde el lunes. Για διάρκεια λες desde hace: desde hace dos días.' },
        beispiele:[
          { z:'Desde anoche.',        na:{ de:'Seit gestern Nacht.', en:'Since last night.', el:'Από χθες το βράδυ.' } },
          { z:'Desde hace dos días.', na:{ de:'Seit zwei Tagen.',    en:'For two days.', el:'Εδώ και δύο μέρες.' } }
        ]
      }
    },

    /* ── A2 · Am Bahnhof ────────────────────────────────────────────── */
    'a2.bahnhof': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Dein Zug hat zwanzig Minuten Verspätung. Umsteigen musst du um drei.', es:'Tu tren lleva veinte minutos de retraso. Tienes el transbordo a las tres.', en:'Your train is twenty minutes late. Your connection is at three.', el:'Το τρένο σου έχει είκοσι λεπτά καθυστέρηση. Η ανταπόκρισή σου είναι στις τρεις.' },
      /* Eröffnung: Spikiu grüßt, ohne Aufgabe 1 vorwegzunehmen.
         Nötig, weil der Skript-Dialog hier mit dem Lerner beginnt. */
      eroeffnung: { z:'Buenos días. ¿Le ayudo con algo?', na:{ de:'Guten Tag. Kann ich Ihnen helfen?', en:'Morning. Can I help you with something?', el:'Καλημέρα. Μπορώ να σας βοηθήσω σε κάτι;' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'No se preocupe. ¡Buen viaje!', na:{ de:'Machen Sie sich keine Sorgen. Gute Fahrt!', en:'Don\'t worry. Safe travels!', el:'Μην ανησυχείτε. Καλό ταξίδι!' } },
      wortschatz: [
        { z:'el retraso',      na:{ de:'die Verspätung',      en:'the delay', el:'η καθυστέρηση' } },
        { z:'lleva retraso',   na:{ de:'er hat Verspätung',   en:'it is delayed', el:'έχει καθυστέρηση' } },
        { z:'hacer transbordo',na:{ de:'umsteigen',           en:'to change trains', el:'αλλάζω τρένο' } },
        { z:'perder el tren',  na:{ de:'den Zug verpassen',   en:'to miss the train', el:'χάνω το τρένο' } },
        { z:'el enlace',       na:{ de:'der Anschluss',       en:'the connection', el:'η ανταπόκριση' } },
        { z:'el asiento',      na:{ de:'der Sitzplatz',       en:'the seat', el:'η θέση' } },
        { z:'reservado',       na:{ de:'reserviert',          en:'reserved', el:'κρατημένη' } },
        { z:'el vagón',        na:{ de:'der Waggon',          en:'the carriage', el:'το βαγόνι' } },
        { z:'anular',          na:{ de:'stornieren',          en:'to cancel', el:'ακυρώνω' } },
        { z:'el siguiente',    na:{ de:'der nächste',         en:'the next one', el:'το επόμενο' } },
        { z:'aproximadamente', na:{ de:'ungefähr',            en:'approximately', el:'περίπου' } },
        { z:'me han dicho',    na:{ de:'man hat mir gesagt',  en:'I have been told', el:'μου είπαν' } }
      ],
      dialog: {
        rolle: { de:'Die Frau am Info-Schalter', en:'The woman at the information desk', el:'Η υπάλληλος στο γραφείο πληροφοριών' },
        zeilen: [
          { wer:'lerner', z:'Perdone, mi tren lleva retraso. ¿Pierdo el enlace?', na:{ de:'Entschuldigung, mein Zug hat Verspätung. Verpasse ich den Anschluss?', en:'Excuse me, my train is delayed. Will I miss my connection?', el:'Συγγνώμη, το τρένο μου έχει καθυστέρηση. Θα χάσω την ανταπόκριση;' } },
          { wer:'spikiu', z:'¿A qué hora hace transbordo?', na:{ de:'Um wie viel Uhr steigen Sie um?', en:'What time do you change?', el:'Τι ώρα αλλάζετε τρένο;' } },
          { wer:'lerner', z:'A las tres en Zaragoza.', na:{ de:'Um drei in Zaragoza.', en:'At three in Zaragoza.', el:'Στις τρεις στη Σαραγόσα.' } },
          { wer:'spikiu', z:'El retraso es de veinte minutos aproximadamente. Llega justo.', na:{ de:'Die Verspätung beträgt ungefähr zwanzig Minuten. Sie kommen knapp hin.', en:'The delay is about twenty minutes. You will just make it.', el:'Η καθυστέρηση είναι περίπου είκοσι λεπτά. Θα το προλάβετε ίσα ίσα.' } },
          { wer:'lerner', z:'¿Y si lo pierdo?', na:{ de:'Und wenn ich ihn verpasse?', en:'And if I miss it?', el:'Κι αν το χάσω;' } },
          { wer:'spikiu', z:'El siguiente sale una hora después. Su billete sirve igual.', na:{ de:'Der nächste fährt eine Stunde später. Ihre Fahrkarte gilt trotzdem.', en:'The next one leaves an hour later. Your ticket is still valid.', el:'Το επόμενο φεύγει μία ώρα αργότερα. Το εισιτήριό σας ισχύει κανονικά.' } }
        ]
      },
      lesetext: {
        z:'El tren de Ignacio salió con media hora de retraso. En Zaragoza tenía que hacer transbordo, pero perdió el enlace. Esperó una hora en la estación y llegó a casa muy tarde.',
        na:{ de:'Ignacios Zug fuhr mit einer halben Stunde Verspätung ab. In Zaragoza musste er umsteigen, aber er verpasste den Anschluss. Er wartete eine Stunde im Bahnhof und kam sehr spät nach Hause.',
             en:'Ignacio\u2019s train left half an hour late. In Zaragoza he had to change, but he missed his connection. He waited an hour at the station and got home very late.', el:'Το τρένο του Ιγνάθιο έφυγε με μισή ώρα καθυστέρηση. Στη Σαραγόσα έπρεπε να αλλάξει τρένο, αλλά έχασε την ανταπόκριση. Περίμενε μία ώρα στον σταθμό και έφτασε σπίτι πολύ αργά.' },
        frage:{ de:'Wie lange wartete Ignacio?', en:'How long did Ignacio wait?', el:'Πόσο περίμενε ο Ιγνάθιο;' },
        optionen:[
          { na:{ de:'Eine halbe Stunde', en:'Half an hour', el:'Μισή ώρα' }, richtig:false },
          { na:{ de:'Eine Stunde',       en:'One hour', el:'Μία ώρα' },     richtig:true  },
          { na:{ de:'Zwei Stunden',      en:'Two hours', el:'Δύο ώρες' },    richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass dein Zug Verspätung hat, und frage, wann der nächste fährt. Zwei Sätze.',
                  en:'Say your train is delayed and ask when the next one leaves. Two sentences.', el:'Πες ότι το τρένο σου έχει καθυστέρηση και ρώτα πότε φεύγει το επόμενο. Δύο προτάσεις.' },
        muster:'Mi tren lleva retraso. ¿A qué hora sale el siguiente?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Si" heißt „wenn" und steht bei einer echten Möglichkeit im normalen Präsens: si lo pierdo, si llueve. Kein Sonderbau nötig.',
               en:'"Si" means "if" and takes plain present tense for a real possibility: si lo pierdo, si llueve. No special construction needed.', el:'Το «si» σημαίνει «αν» και, για μια πραγματική πιθανότητα, παίρνει απλό ενεστώτα: si lo pierdo, si llueve. Δεν χρειάζεται καμία ειδική σύνταξη.' },
        beispiele:[
          { z:'¿Y si lo pierdo?', na:{ de:'Und wenn ich ihn verpasse?', en:'And if I miss it?', el:'Κι αν το χάσω;' } },
          { z:'Si llueve, tomo un taxi.', na:{ de:'Wenn es regnet, nehme ich ein Taxi.', en:'If it rains, I take a taxi.', el:'Αν βρέξει, παίρνω ταξί.' } }
        ]
      }
    },

    /* ── A2 · Beim Arzt ─────────────────────────────────────────────── */
    'a2.arzt': {
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Du bist letzte Woche gestürzt. Du nimmst Schmerztabletten und bist gegen Penizillin allergisch.', es:'Te caíste la semana pasada. Tomas analgésicos y eres alérgico a la penicilina.', en:'You fell last week. You take painkillers and you\'re allergic to penicillin.', el:'Έπεσες την περασμένη εβδομάδα. Παίρνεις παυσίπονα και είσαι αλλεργικός στην πενικιλίνη.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Le apunto para el jueves. ¡Que se mejore!', na:{ de:'Ich trage Sie für Donnerstag ein. Gute Besserung!', en:'I\'ll put you down for Thursday. Feel better!', el:'Σας γράφω για την Πέμπτη. Περαστικά!' } },
      wortschatz: [
        { z:'los síntomas',    na:{ de:'die Symptome',        en:'the symptoms', el:'τα συμπτώματα' } },
        { z:'la receta',       na:{ de:'das Rezept',          en:'the prescription', el:'η συνταγή' } },
        { z:'el antibiótico',  na:{ de:'das Antibiotikum',    en:'the antibiotic', el:'το αντιβιοτικό' } },
        { z:'la alergia',      na:{ de:'die Allergie',        en:'the allergy', el:'η αλλεργία' } },
        { z:'tomar',           na:{ de:'einnehmen',           en:'to take', el:'παίρνω' } },
        { z:'tres veces al día', na:{ de:'dreimal täglich',   en:'three times a day', el:'τρεις φορές την ημέρα' } },
        { z:'la operación',    na:{ de:'die Operation',       en:'the operation', el:'η επέμβαση' } },
        { z:'me caí',          na:{ de:'ich bin gestürzt',    en:'I fell', el:'έπεσα' } },
        { z:'me rompí',        na:{ de:'ich habe mir gebrochen', en:'I broke', el:'έσπασα' } },
        { z:'la radiografía',  na:{ de:'das Röntgenbild',     en:'the X-ray', el:'η ακτινογραφία' } },
        { z:'ha empeorado',    na:{ de:'es ist schlimmer geworden', en:'it has got worse', el:'χειροτέρεψε' } },
        { z:'la cita',         na:{ de:'der Termin',          en:'the appointment', el:'το ραντεβού' } }
      ],
      dialog: {
        rolle: { de:'Der Arzt', en:'The doctor', el:'Ο γιατρός' },
        zeilen: [
          { wer:'spikiu', z:'Cuénteme, ¿qué le pasa?', na:{ de:'Erzählen Sie, was fehlt Ihnen?', en:'Tell me, what is wrong?', el:'Πείτε μου, τι έχετε;' } },
          { wer:'lerner', z:'Me caí la semana pasada y el hombro ha empeorado.', na:{ de:'Ich bin letzte Woche gestürzt, und die Schulter ist schlimmer geworden.', en:'I fell last week and my shoulder has got worse.', el:'Έπεσα την περασμένη εβδομάδα και ο ώμος μου χειροτέρεψε.' } },
          { wer:'spikiu', z:'¿Toma alguna medicina?', na:{ de:'Nehmen Sie Medikamente?', en:'Are you taking any medication?', el:'Παίρνετε κάποιο φάρμακο;' } },
          { wer:'lerner', z:'Solo pastillas para el dolor. Soy alérgico a la penicilina.', na:{ de:'Nur Schmerztabletten. Ich bin allergisch gegen Penicillin.', en:'Only painkillers. I am allergic to penicillin.', el:'Μόνο παυσίπονα. Είμαι αλλεργικός στην πενικιλίνη.' } },
          { wer:'spikiu', z:'Bien, lo apunto. Vamos a hacer una radiografía.', na:{ de:'Gut, ich notiere es. Wir machen ein Röntgenbild.', en:'Good, I will note that. We will take an X-ray.', el:'Καλά, το σημειώνω. Θα κάνουμε μια ακτινογραφία.' } },
          { wer:'lerner', z:'De acuerdo. ¿Necesito otra cita?', na:{ de:'Einverstanden. Brauche ich noch einen Termin?', en:'All right. Do I need another appointment?', el:'Εντάξει. Χρειάζομαι άλλο ραντεβού;' } }
        ]
      },
      lesetext: {
        z:'Beatriz fue al médico porque le dolía el estómago desde hacía una semana. El médico le preguntó qué comía y si tomaba alguna medicina. Le dio una receta y una cita para el martes.',
        na:{ de:'Beatriz ging zum Arzt, weil ihr seit einer Woche der Bauch weh tat. Der Arzt fragte sie, was sie aß und ob sie Medikamente nahm. Er gab ihr ein Rezept und einen Termin für Dienstag.',
             en:'Beatriz went to the doctor because her stomach had been hurting for a week. The doctor asked what she ate and whether she took any medication. He gave her a prescription and an appointment for Tuesday.', el:'Η Βεατρίθ πήγε στον γιατρό γιατί την πονούσε το στομάχι εδώ και μια εβδομάδα. Ο γιατρός τη ρώτησε τι έτρωγε και αν έπαιρνε κάποιο φάρμακο. Της έδωσε μια συνταγή και ένα ραντεβού για την Τρίτη.' },
        frage:{ de:'Was bekam Beatriz vom Arzt?', en:'What did Beatriz get from the doctor?', el:'Τι πήρε η Βεατρίθ από τον γιατρό;' },
        optionen:[
          { na:{ de:'Ein Röntgenbild',            en:'An X-ray', el:'Μια ακτινογραφία' },                      richtig:false },
          { na:{ de:'Ein Rezept und einen Termin',en:'A prescription and appointment', el:'Μια συνταγή και ένα ραντεβού' },richtig:true  },
          { na:{ de:'Nur einen Rat',              en:'Only advice', el:'Μόνο συμβουλές' },                   richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du gestürzt bist und allergisch gegen Penicillin bist. Zwei Sätze.',
                  en:'Say that you fell and that you are allergic to penicillin. Two sentences.', el:'Πες ότι έπεσες και ότι είσαι αλλεργικός στην πενικιλίνη. Δύο προτάσεις.' },
        muster:'Me caí el sábado y me duele mucho la rodilla. Soy alérgico a la penicilina.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Es gibt zwei Vergangenheiten nebeneinander: me caí ist der eine Moment, me dolía ist der Zustand ringsum. Erst der Punkt, dann die Landschaft.',
               en:'Two pasts work side by side: me caí is the single moment, me dolía is the state around it. First the dot, then the landscape.', el:'Δύο παρελθοντικοί χρόνοι δουλεύουν μαζί: το me caí είναι η μία στιγμή, το me dolía η κατάσταση γύρω της. Πρώτα η τελεία, μετά το τοπίο.' },
        beispiele:[
          { z:'Me caí el sábado.',       na:{ de:'Ich bin am Samstag gestürzt.', en:'I fell on Saturday.', el:'Έπεσα το Σάββατο.' } },
          { z:'Me dolía todo el brazo.', na:{ de:'Mir tat der ganze Arm weh.',   en:'My whole arm was hurting.', el:'Με πονούσε όλο το χέρι.' } }
        ]
      }
    },

    /* ── A2 · Über das Wetter ───────────────────────────────────────── */
    'a2.wetter': {
      /* Diese Figur DUZT. Steuert die Zeilen, die NICHT aus dem Skript kommen
         — etwa das 'ich verstehe dich nicht' der Szene. Ohne dieses Feld
         siezte Spikiu mitten in einem Du-Gespraech (Leo, 31.08.). */
      duzen: true,
      /* Deine Rolle: was in dieser Szene GILT. Steht auf der Bühne, bevor
         es losgeht. Ohne sie verlangten die Aufgaben Aussagen über das echte
         Leben des Lerners — wer keine Schwester hat, müsste lügen. */
      deineRolle: { de:'Ihr wollt am Samstag an den Strand. Du hast die Vorhersage noch nicht gesehen.', es:'Queréis ir a la playa el sábado. Todavía no has visto la previsión.', en:'You want to go to the beach on Saturday. You haven\'t checked the forecast yet.', el:'Θέλετε να πάτε στη θάλασσα το Σάββατο. Δεν έχεις δει ακόμα την πρόγνωση.' },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe.
         Ohne sie bricht die Szene mitten im Satz ab (R6). */
      abrundung: { z:'Buena idea. ¡Nos vemos el sábado!', na:{ de:'Gute Idee. Bis Samstag!', en:'Good idea. See you on Saturday!', el:'Καλή ιδέα. Τα λέμε το Σάββατο!' } },
      wortschatz: [
        { z:'la previsión',    na:{ de:'die Vorhersage',      en:'the forecast', el:'η πρόγνωση' } },
        { z:'va a llover',     na:{ de:'es wird regnen',      en:'it is going to rain', el:'θα βρέξει' } },
        { z:'la tormenta',     na:{ de:'das Gewitter',        en:'the storm', el:'η καταιγίδα' } },
        { z:'nevar',           na:{ de:'schneien',            en:'to snow', el:'χιονίζει' } },
        { z:'despejado',       na:{ de:'klar',                en:'clear', el:'αίθριος' } },
        { z:'nublado',         na:{ de:'bewölkt',             en:'cloudy', el:'συννεφιασμένος' } },
        { z:'por si acaso',    na:{ de:'für alle Fälle',      en:'just in case', el:'για καλό και για κακό' } },
        { z:'quedarse en casa',na:{ de:'zu Hause bleiben',    en:'to stay home', el:'μένω σπίτι' } },
        { z:'depende de',      na:{ de:'es hängt ab von',     en:'it depends on', el:'εξαρτάται από' } },
        { z:'mejorar',         na:{ de:'besser werden',       en:'to improve', el:'βελτιώνομαι' } },
        { z:'el fin de semana',na:{ de:'das Wochenende',      en:'the weekend', el:'το Σαββατοκύριακο' } },
        { z:'seguramente',     na:{ de:'wahrscheinlich',      en:'probably', el:'μάλλον' } }
      ],
      dialog: {
        rolle: { de:'Eine Freundin', en:'A friend', el:'Μια φίλη' },
        zeilen: [
          { wer:'spikiu', z:'¿Vamos a la playa el sábado?', na:{ de:'Fahren wir am Samstag an den Strand?', en:'Shall we go to the beach on Saturday?', el:'Πάμε στη θάλασσα το Σάββατο;' } },
          { wer:'lerner', z:'Depende del tiempo. ¿Has visto la previsión?', na:{ de:'Das hängt vom Wetter ab. Hast du die Vorhersage gesehen?', en:'It depends on the weather. Have you seen the forecast?', el:'Εξαρτάται από τον καιρό. Είδες την πρόγνωση;' } },
          { wer:'spikiu', z:'Dicen que va a llover por la mañana.', na:{ de:'Sie sagen, morgens wird es regnen.', en:'They say it is going to rain in the morning.', el:'Λένε ότι θα βρέξει το πρωί.' } },
          { wer:'lerner', z:'¿Y por la tarde?', na:{ de:'Und nachmittags?', en:'And in the afternoon?', el:'Και το απόγευμα;' } },
          { wer:'spikiu', z:'Seguramente mejora. Estará despejado.', na:{ de:'Wahrscheinlich wird es besser. Es soll klar werden.', en:'It will probably improve. It should be clear.', el:'Μάλλον θα φτιάξει. Θα είναι αίθριος.' } },
          { wer:'lerner', z:'Entonces vamos por la tarde. Llevo una chaqueta por si acaso.', na:{ de:'Dann fahren wir nachmittags. Ich nehme für alle Fälle eine Jacke mit.', en:'Then we will go in the afternoon. I will bring a jacket just in case.', el:'Τότε πάμε το απόγευμα. Θα πάρω ένα μπουφάν για καλό και για κακό.' } }
        ]
      },
      lesetext: {
        z:'El fin de semana pasado no fuimos al campo porque había tormenta. Nos quedamos en casa y vimos una película. Este sábado la previsión es mejor: nublado por la mañana y despejado por la tarde.',
        na:{ de:'Letztes Wochenende fuhren wir nicht aufs Land, weil es ein Gewitter gab. Wir blieben zu Hause und sahen einen Film. Diesen Samstag ist die Vorhersage besser: morgens bewölkt, nachmittags klar.',
             en:'Last weekend we did not go to the countryside because there was a storm. We stayed home and watched a film. This Saturday the forecast is better: cloudy in the morning, clear in the afternoon.', el:'Το περασμένο Σαββατοκύριακο δεν πήγαμε στην εξοχή γιατί είχε καταιγίδα. Μείναμε σπίτι και είδαμε μια ταινία. Αυτό το Σάββατο η πρόγνωση είναι καλύτερη: συννεφιά το πρωί και αίθριος καιρός το απόγευμα.' },
        frage:{ de:'Warum blieben sie zu Hause?', en:'Why did they stay home?', el:'Γιατί έμειναν σπίτι;' },
        optionen:[
          { na:{ de:'Es war ein Gewitter',   en:'There was a storm', el:'Είχε καταιγίδα' },     richtig:true  },
          { na:{ de:'Es war zu warm',        en:'It was too hot', el:'Έκανε πολλή ζέστη' },        richtig:false },
          { na:{ de:'Sie hatten kein Auto',  en:'They had no car', el:'Δεν είχαν αυτοκίνητο' },       richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass es morgen regnen wird und was du deshalb machst. Zwei Sätze.',
                  en:'Say that it will rain tomorrow and what you will do because of it. Two sentences.', el:'Πες ότι αύριο θα βρέξει και τι θα κάνεις γι\' αυτό. Δύο προτάσεις.' },
        muster:'Mañana va a llover todo el día. Me quedo en casa y veo una película.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Die einfachste Zukunft ist „ir a" plus Verb: va a llover, voy a salir. Man braucht keine eigene Zukunftsform, um über morgen zu reden.',
               en:'The simplest future is "ir a" plus verb: va a llover, voy a salir. You do not need a separate future tense to talk about tomorrow.', el:'Ο πιο απλός μέλλοντας είναι «ir a» + ρήμα: va a llover, voy a salir. Δεν χρειάζεσαι ξεχωριστό μέλλοντα για να μιλήσεις για το αύριο.' },
        beispiele:[
          { z:'Va a llover.',      na:{ de:'Es wird regnen.',      en:'It is going to rain.', el:'Θα βρέξει.' } },
          { z:'Voy a quedarme.',   na:{ de:'Ich werde bleiben.',   en:'I am going to stay.', el:'Θα μείνω.' } }
        ]
      }
    }
  };

  /* ── Öffentliche Fläche ───────────────────────────────────────────── */
  raum.SpikiuLernpfad = {
    /* Diese Datei traegt EINE Zielsprache. Jeder Raum muss dagegen pruefen,
       sonst bekommt ein Griechisch-Lerner spanische Woerter (18.08.2026). */
    zielsprache: 'es',
    themen: THEMEN,
    stufen: STUFEN,
    kategorien: KATEGORIEN,
    rollen: ROLLEN,
    aufgaben: AUFGABEN,
    schritt: SCHRITT,
    stationen: STATIONEN,

    /* Die drei Aufgaben einer Station. Leeres Array, wenn keine da sind —
       die Oberflaeche zeigt dann keine, statt welche zu erfinden. */
    aufgabenVon: function (stufe, thema) { return AUFGABEN[stufe + '.' + thema] || []; },

    /* Die ERÖFFNUNG: Spikius erste Zeile in der Szene.
       Existiert nur dort, wo der Skript-Dialog mit dem LERNER beginnt —
       sonst ist dialog.zeilen[0] bereits die Eröffnung. Sie grüßt und lädt
       ein, ohne Aufgabe 1 vorwegzunehmen. Wer sie ignoriert, baut wieder
       den Fehler vom 29.08.: der Taxifahrer fragt „wohin?", während die
       Aufgabe noch lautet „frag, ob er frei ist". */
    eroeffnungVon: function (stufe, thema) {
      var S = STATIONEN[stufe + '.' + thema];
      if (!S) return null;
      if (S.eroeffnung) return S.eroeffnung;
      var z = (S.dialog && S.dialog.zeilen) || [];
      return (z[0] && z[0].wer === 'spikiu') ? z[0] : null;
    },

    /* Die ABRUNDUNG: Spikius Reaktion NACH der dritten Aufgabe.
       Kein Abschied per Formel — je nach Szene Dank, Wunsch, Zusage,
       Gruß oder Trost. Ohne sie endet die Szene mitten im Satz (R6). */
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

    /* Die zwei Rollen und der Ort einer Szene. */
    rolle: function (thema) { return ROLLEN[thema] || null; },

    /* Ein Thema nach id. */
    thema: function (id) {
      for (var i = 0; i < THEMEN.length; i++) if (THEMEN[i].id === id) return THEMEN[i];
      return null;
    },

    /* Eine Station holen. Gibt null zurück, wenn noch kein Inhalt da ist —
       die Oberfläche zeigt sie dann als „noch leer", statt zu erfinden. */
    station: function (stufe, thema) {
      return STATIONEN[stufe + '.' + thema] || null;
    },

    /* Gefüllt oder leer? Der Baum färbt danach. */
    gefuellt: function (stufe, thema) {
      return !!STATIONEN[stufe + '.' + thema];
    },

    /* Die ERNTE einer Station: Woerter UND Wendungen, in einer Liste.
       Nur Wendungen sind im Alltag brauchbar — „la cuenta" allein bringt
       niemanden weiter, „La cuenta, por favor" schon. Beides steht laengst
       da, nur an drei Orten: wortschatz, dialog.zeilen und grammatik.
       Diese Funktion legt es zusammen. Null Token.

       art: 'wort' | 'wendung' — die Oberflaeche kann sie trennen.
       Doppelte fliegen raus; die Wendung schlaegt das Einzelwort. */
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
      /* Was eine Wendung ist, entscheidet die Form, nicht die Herkunft:
         mehr als zwei Woerter, oder ein Satzzeichen. „un café" aus der
         Grammatik-Notiz ist ein Wort, „¿Cuánto es?" aus dem Wortschatz
         ist eine Wendung. */
      function art(t) {
        var x = String(t).trim();
        if (/[¿?¡!.,;]/.test(x)) return 'wendung';
        return x.split(/\s+/).length > 2 ? 'wendung' : 'wort';
      }
      /* Wendungen zuerst: sie sind das, was man wirklich sagen kann. */
      (S.dialog.zeilen || []).forEach(function (z) {
        nimm(z.z, (z.na && (z.na[mu] || z.na.de)) || '', 'wendung');
      });
      (S.wortschatz || []).forEach(function (w) {
        nimm(w.z, (w.na && (w.na[mu] || w.na.de)) || '', art(w.z));
      });
      if (S.grammatik && S.grammatik.beispiele) {
        S.grammatik.beispiele.forEach(function (b) {
          nimm(b.z, (b.na && (b.na[mu] || b.na.de)) || '', art(b.z));
        });
      }
      /* Wendungen nach oben, Woerter darunter — in ihrer Reihenfolge. */
      out.sort(function (a, b) {
        return (a.art === b.art) ? 0 : (a.art === 'wendung' ? -1 : 1);
      });
      return out;
    },

    /* Alle Wörter einer Station, flach — für das Gym. */
    woerter: function (stufe, thema) {
      var s = STATIONEN[stufe + '.' + thema];
      return s ? s.wortschatz.slice() : [];
    }
  };

})(typeof window !== 'undefined' ? window : this);
