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

  /* b1 = KRONE (15.10.2026): „La vuelta“, Lateinamerika, nur Zielsprache Spanisch. */
  /* b2 = BLÜTE (20.10.2026): „Sal“, Spanien, die Unterstufe der Krone. */
  var STUFEN = ['a1', 'a2', 'b1', 'b2'];

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

  /* ══════════════════════════════════════════════════════════════════
     B1 · KRONE · „LA VUELTA“ (Leo, 15.10.2026: „Für LA wähle einige dieser
     Orte … Puede ser un trotamundos que hace una vuelta por LA.“ · „Otro
     personaje, el resto decídelo tú, pero nada de política.“)
     Lotte de Vries, Fotografin aus Utrecht, reist für ihren Bildband «Agua»
     durch Lateinamerika. Dieselben zehn Themen, neue Handlung, neuer Ort:
     hotel CDMX · familie Oaxaca · wetter Monteverde · arzt Quito ·
     einkaufen Otavalo · bahnhof Quitumbe→Tena · taxi Asunción ·
     cafe Buenos Aires · restaurant El Calafate · wegbeschreibung Canaima.
     SPRACHE: neutrales lateinamerikanisches Spanisch (ustedes, celular,
     boleto), NIE voseo, keine Politik. Neue Felder: rollen (Rollenkarte der
     Station, schlägt ROLLEN[thema]) und kultur (ein Satz zum Ort).
     Der Roman dazu: learnroman-lotte.js „La vuelta de Lotte“.
     ══════════════════════════════════════════════════════════════════ */
var B1_LP_A = {

  schritt: {
    hotel:     { de:'Mexiko-Stadt: ein Zimmer für einen Monat', en:'Mexico City: a room for a month', el:'Πόλη του Μεξικού: ένα δωμάτιο για έναν μήνα' },
    familie:   { de:'Oaxaca: von den Großeltern erzählen',      en:'Oaxaca: talking about grandparents', el:'Οαχάκα: μιλάς για τους παππούδες' },
    wetter:    { de:'Monteverde: planen, wenn der Nebel kommt',  en:'Monteverde: planning around the mist', el:'Μοντεβέρδε: σχέδια όταν έρχεται η ομίχλη' },
    arzt:      { de:'Quito: Rat in der Apotheke',                en:'Quito: advice at the pharmacy', el:'Κίτο: συμβουλές στο φαρμακείο' },
    einkaufen: { de:'Otavalo: vergleichen und feilschen',        en:'Otavalo: comparing and bargaining', el:'Οταβάλο: συγκρίνεις και παζαρεύεις' }
  },

  aufgaben: {
    'b1.hotel': [
      { de:'Bejahe, sag, dass du das Zimmer sehen möchtest und etwas nahe der Metro suchst', es:'Di que sí, que querías ver el cuarto y que buscas algo que esté cerca del metro', en:'Say yes, that you would like to see the room and are looking for something near the metro', el:'Πες ναι, ότι θα ήθελες να δεις το δωμάτιο και ότι ψάχνεις κάτι κοντά στο μετρό' },
      { de:'Frag, ob im Preis Strom und Internet enthalten sind', es:'Pregunta si el precio incluye la luz y el internet', en:'Ask whether the price includes electricity and internet', el:'Ρώτα αν η τιμή περιλαμβάνει ρεύμα και ίντερνετ' },
      { de:'Sag, dass du ab Montag bleiben möchtest, wenn es ihr recht ist', es:'Di que querías quedarte desde el lunes, si le parece bien', en:'Say you would like to stay from Monday, if that suits her', el:'Πες ότι θα ήθελες να μείνεις από τη Δευτέρα, αν της είναι εντάξει' }
    ],
    'b1.familie': [
      { de:'Bejahe, sag: ein Foto deines Großvaters, und dass er vor fünf Jahren gestorben ist', es:'Di que sí, una foto de tu abuelo, y que murió hace cinco años', en:'Say yes, a photo of your grandfather, and that he died five years ago', el:'Πες ναι, μια φωτογραφία του παππού σου, και ότι πέθανε πριν από πέντε χρόνια' },
      { de:'Erzähle, dass er sehr ruhig war, ein Boot hatte und jeden Sonntag angeln ging', es:'Cuenta que era muy tranquilo, que tenía un barco y que pescaba todos los domingos', en:'Tell that he was very calm, had a boat and went fishing every Sunday', el:'Διηγήσου ότι ήταν πολύ ήρεμος, ότι είχε μια βάρκα και ψάρευε κάθε Κυριακή' },
      { de:'Sag, dass deine Oma Fenna in Utrecht lebt und du ihr gestern eine Postkarte geschickt hast', es:'Di que tu abuela Fenna vive en Utrecht y que ayer le mandaste una postal', en:'Say your grandmother Fenna lives in Utrecht and you sent her a postcard yesterday', el:'Πες ότι η γιαγιά σου η Φένα ζει στην Ουτρέχτη και ότι χθες της έστειλες μια κάρτα' }
    ],
    'b1.wetter': [
      { de:'Frag, wie das Wetter am Nachmittag wird, und sag, dass du den Wasserfall fotografieren willst', es:'Pregunta qué tiempo hará por la tarde y di que quieres sacar fotos de la catarata', en:'Ask what the weather will be like in the afternoon and say you want to photograph the waterfall', el:'Ρώτα τι καιρό θα κάνει το απόγευμα και πες ότι θέλεις να φωτογραφίσεις τον καταρράκτη' },
      { de:'Sag: wenn es regnet, packst du die Kamera in den Rucksack — und schlag vor, lieber jetzt zu gehen', es:'Di que si llueve guardarás la cámara en la mochila y propón ir mejor ahora', en:'Say that if it rains you will put the camera in your backpack, and suggest going now instead', el:'Πες ότι, αν βρέξει, θα βάλεις τη φωτογραφική μηχανή στο σακίδιο, και πρότεινε να πάτε καλύτερα τώρα' },
      { de:'Stimme zu und sag, dass du für alle Fälle die Regenjacke anziehst', es:'Di que de acuerdo y que te pondrás el impermeable por si acaso', en:'Agree and say you will put on your rain jacket just in case', el:'Συμφώνησε και πες ότι θα φορέσεις το αδιάβροχο για καλό και για κακό' }
    ],
    'b1.arzt': [
      { de:'Sag, dass du gestern in Quito angekommen bist und starke Kopfschmerzen hast', es:'Di que llegaste ayer a Quito y que te duele mucho la cabeza', en:'Say you arrived in Quito yesterday and have a bad headache', el:'Πες ότι έφτασες χθες στο Κίτο και ότι σε πονάει πολύ το κεφάλι' },
      { de:'Sag, dass dir etwas schwindelig ist und du schlecht geschlafen hast, und frag, was sie empfiehlt', es:'Di que tienes un poco de mareo y que dormiste mal, y pregunta qué te recomienda', en:'Say you feel a bit dizzy and slept badly, and ask what she recommends', el:'Πες ότι ζαλίζεσαι λίγο και ότι κοιμήθηκες άσχημα, και ρώτα τι σου συνιστά' },
      { de:'Frag nach: alle acht Stunden, mit Essen? Und ob du Kaffee trinken darfst', es:'Pregunta si es cada ocho horas con comida y si puedes tomar café', en:'Check: every eight hours, with food? And ask whether you may drink coffee', el:'Ρώτα αν είναι κάθε οκτώ ώρες με φαγητό και αν μπορείς να πιεις καφέ' }
    ],
    'b1.einkaufen': [
      { de:'Sag, dass sie wunderschön sind, und frag, was die Muster auf dem blauen Poncho dort drüben bedeuten', es:'Di que son preciosos y pregunta qué significan los dibujos de aquel poncho azul', en:'Say they are beautiful and ask what the patterns on that blue poncho over there mean', el:'Πες ότι είναι πανέμορφα και ρώτα τι σημαίνουν τα σχέδια σε εκείνο το μπλε πόντσο εκεί πέρα' },
      { de:'Sag, dass er teurer ist als der rote, und frag, ob sie ihn dir für sechzig lässt', es:'Di que es más caro que el rojo y pregunta si te lo deja en sesenta', en:'Say it is more expensive than the red one and ask whether she will let you have it for sixty', el:'Πες ότι είναι πιο ακριβό από το κόκκινο και ρώτα αν σου το αφήνει στα εξήντα' },
      { de:'Nimm ihn und frag, ob du mit einem Hundertdollarschein zahlen kannst', es:'Di que te lo llevas y pregunta si puedes pagar con un billete de cien', en:'Say you will take it and ask whether you can pay with a hundred-dollar note', el:'Πες ότι το παίρνεις και ρώτα αν μπορείς να πληρώσεις με χαρτονόμισμα των εκατό' }
    ]
  },

  stationen: {

    /* ── B1 · Ciudad de México — ein Zimmer für einen Monat ─────────── */
    'b1.hotel': {
      deineRolle: { de:'Du bist in Mexiko-Stadt und suchst für einen Monat ein möbliertes Zimmer, nah an der Metro. Einziehen möchtest du am Montag.', es:'Estás en la Ciudad de México y buscas un cuarto amueblado por un mes, cerca del metro. Quieres entrar el lunes.', en:'You are in Mexico City looking for a furnished room for one month, close to the metro. You would like to move in on Monday.', el:'Είσαι στην Πόλη του Μεξικού και ψάχνεις ένα επιπλωμένο δωμάτιο για έναν μήνα, κοντά στο μετρό. Θέλεις να μετακομίσεις τη Δευτέρα.' },
      abrundung: { z:'¡Qué padre! Ahorita le hago una copia de la llave.', na:{ de:'Wie toll! Ich mache Ihnen gleich einen Zweitschlüssel.', en:'Great! I’ll get a copy of the key made for you right now.', el:'Τέλεια! Σας φτιάχνω αμέσως ένα αντίγραφο του κλειδιού.' } },
      rollen: {
        spikiu: { de:'die Vermieterin, Doña Lupita', es:'la casera, doña Lupita', en:'the landlady, Doña Lupita', el:'η σπιτονοικοκυρά, η ντόνια Λουπίτα' },
        lerner: { de:'die Reisende auf Zimmersuche', es:'la viajera que busca cuarto', en:'the traveller looking for a room', el:'η ταξιδιώτισσα που ψάχνει δωμάτιο' },
        ort:    { de:'in einem alten Haus in Coyoacán', es:'en una casa antigua de Coyoacán', en:'in an old house in Coyoacán', el:'σε ένα παλιό σπίτι στο Κογιοακάν' }
      },
      wortschatz: [
        { z:'el departamento',      na:{ de:'die Wohnung',              en:'the flat', el:'το διαμέρισμα' } },
        { z:'el cuarto amueblado',  na:{ de:'das möblierte Zimmer',     en:'the furnished room', el:'το επιπλωμένο δωμάτιο' } },
        { z:'la renta',             na:{ de:'die Miete',                en:'the rent', el:'το ενοίκιο' } },
        { z:'el depósito',          na:{ de:'die Kaution',              en:'the deposit', el:'η εγγύηση' } },
        { z:'el contrato',          na:{ de:'der Vertrag',              en:'the contract', el:'το συμβόλαιο' } },
        { z:'firmar',               na:{ de:'unterschreiben',           en:'to sign', el:'υπογράφω' } },
        { z:'todo incluido',        na:{ de:'alles inklusive',          en:'everything included', el:'όλα μέσα' } },
        { z:'la luz',               na:{ de:'der Strom',                en:'the electricity', el:'το ρεύμα' } },
        { z:'la colonia',           na:{ de:'das Stadtviertel (Mexiko)',en:'the neighbourhood (Mexico)', el:'η γειτονιά (Μεξικό)' } },
        { z:'quería ver …',         na:{ de:'ich würde gern … sehen',   en:'I’d like to see …', el:'θα ήθελα να δω …' } },
        { z:'busco algo que esté …',na:{ de:'ich suche etwas, das … liegt', en:'I’m looking for something that is …', el:'ψάχνω κάτι που να είναι …' } },
        { z:'ahorita',              na:{ de:'gleich, sofort (Mexiko)',  en:'right now, in a moment (Mexico)', el:'αμέσως, σε λίγο (Μεξικό)' } }
      ],
      dialog: {
        rolle: { de:'Die Vermieterin, Doña Lupita', en:'The landlady, Doña Lupita', el:'Η σπιτονοικοκυρά, η ντόνια Λουπίτα' },
        zeilen: [
          { wer:'spikiu', z:'Buenas tardes, pásele. ¿Usted es quien llamó por el cuarto?', na:{ de:'Guten Tag, kommen Sie rein. Sind Sie diejenige, die wegen des Zimmers angerufen hat?', en:'Good afternoon, come in. Are you the one who called about the room?', el:'Καλησπέρα, περάστε. Εσείς τηλεφωνήσατε για το δωμάτιο;' } },
          { wer:'lerner', z:'Sí, soy yo. Quería ver el cuarto; busco algo que esté cerca del metro.', na:{ de:'Ja, das bin ich. Ich würde gern das Zimmer sehen; ich suche etwas, das nah an der Metro liegt.', en:'Yes, that’s me. I’d like to see the room; I’m looking for something close to the metro.', el:'Ναι, εγώ είμαι. Θα ήθελα να δω το δωμάτιο· ψάχνω κάτι που να είναι κοντά στο μετρό.' } },
          { wer:'spikiu', z:'Está a cinco minutos de la estación. La renta son seis mil pesos al mes.', na:{ de:'Es ist fünf Minuten von der Station entfernt. Die Miete beträgt sechstausend Pesos im Monat.', en:'It’s five minutes from the station. The rent is six thousand pesos a month.', el:'Είναι πέντε λεπτά από τον σταθμό. Το ενοίκιο είναι έξι χιλιάδες πέσος τον μήνα.' } },
          { wer:'lerner', z:'¿El precio incluye la luz y el internet?', na:{ de:'Sind Strom und Internet im Preis enthalten?', en:'Does the price include electricity and internet?', el:'Η τιμή περιλαμβάνει ρεύμα και ίντερνετ;' } },
          { wer:'spikiu', z:'Sí, todo incluido. Solo le pido un mes de depósito y firmamos un contrato sencillo.', na:{ de:'Ja, alles inklusive. Ich bitte Sie nur um eine Monatsmiete Kaution, und wir unterschreiben einen einfachen Vertrag.', en:'Yes, everything included. I just ask for one month’s deposit and we sign a simple contract.', el:'Ναι, όλα μέσα. Σας ζητάω μόνο έναν μήνα εγγύηση και υπογράφουμε ένα απλό συμβόλαιο.' } },
          { wer:'lerner', z:'Perfecto. Quería quedarme desde el lunes, si le parece bien.', na:{ de:'Perfekt. Ich würde gern ab Montag bleiben, wenn es Ihnen recht ist.', en:'Perfect. I’d like to stay from Monday, if that suits you.', el:'Τέλεια. Θα ήθελα να μείνω από τη Δευτέρα, αν σας είναι εντάξει.' } }
        ]
      },
      lesetext: {
        z:'Hoy llegué a Coyoacán y doña Lupita me rentó un cuarto con ventana al jardín. Cuando dije «vale», se rio y me explicó: «Aquí decimos “está bien”». Mañana voy a Xochimilco: la ciudad antes era un lago, y los canales son el agua que quedó.',
        na:{ de:'Heute bin ich in Coyoacán angekommen, und Doña Lupita hat mir ein Zimmer mit Fenster zum Garten vermietet. Als ich „vale" sagte, lachte sie und erklärte mir: „Hier sagen wir ‚está bien‘." Morgen fahre ich nach Xochimilco: Die Stadt war früher ein See, und die Kanäle sind das Wasser, das geblieben ist.',
             en:'Today I arrived in Coyoacán and Doña Lupita rented me a room with a window onto the garden. When I said “vale”, she laughed and explained: “Here we say ‘está bien’.” Tomorrow I’m going to Xochimilco: the city used to be a lake, and the canals are the water that remained.',
             el:'Σήμερα έφτασα στο Κογιοακάν και η ντόνια Λουπίτα μού νοίκιασε ένα δωμάτιο με παράθυρο στον κήπο. Όταν είπα «vale», γέλασε και μου εξήγησε: «Εδώ λέμε “está bien”». Αύριο πάω στο Σοτσιμίλκο: η πόλη παλιά ήταν λίμνη, και τα κανάλια είναι το νερό που έμεινε.' },
        frage:{ de:'Was sind die Kanäle von Xochimilco?', en:'What are the canals of Xochimilco?', el:'Τι είναι τα κανάλια του Σοτσιμίλκο;' },
        optionen:[
          { na:{ de:'Ein Rest des alten Sees',  en:'What is left of the old lake', el:'Ό,τι έμεινε από την παλιά λίμνη' }, richtig:true  },
          { na:{ de:'Ein neuer Park am Fluss',  en:'A new park by the river', el:'Ένα καινούργιο πάρκο δίπλα στο ποτάμι' }, richtig:false },
          { na:{ de:'Der Garten von Doña Lupita', en:'Doña Lupita’s garden', el:'Ο κήπος της ντόνια Λουπίτα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib einer Vermieterin: Du suchst ein ruhiges Zimmer und möchtest wissen, ob WLAN im Preis enthalten ist. Zwei Sätze.',
                  en:'Write to a landlady: you are looking for a quiet room and want to know whether wifi is included in the price. Two sentences.',
                  el:'Γράψε σε μια σπιτονοικοκυρά: ψάχνεις ένα ήσυχο δωμάτιο και θέλεις να μάθεις αν το wifi περιλαμβάνεται στην τιμή. Δύο προτάσεις.' },
        muster:'Buenas tardes, busco un cuarto que sea tranquilo. ¿El precio incluye el internet?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Quería" plus Infinitiv ist die höfliche Bitte: quería ver, quería quedarme — wie „ich hätte gern". Und wer etwas sucht, das er noch nicht kennt, nimmt den Subjuntivo: busco algo que esté cerca, que tenga ventana. In Spanien hieß die Wohnung piso, hier heißt sie departamento.',
               en:'"Quería" plus infinitive is the polite request: quería ver, quería quedarme — like "I’d like to". And when you look for something you don’t know yet, use the subjunctive: busco algo que esté cerca, que tenga ventana. In Spain a flat was a piso; here it is a departamento.',
               el:'Το «quería» + απαρέμφατο είναι το ευγενικό αίτημα: quería ver, quería quedarme — σαν το «θα ήθελα». Κι όταν ψάχνεις κάτι που δεν ξέρεις ακόμα, βάζεις υποτακτική: busco algo que esté cerca, que tenga ventana. Στην Ισπανία το διαμέρισμα ήταν piso· εδώ λέγεται departamento.' },
        beispiele:[
          { z:'Quería ver el cuarto.',            na:{ de:'Ich würde gern das Zimmer sehen.', en:'I’d like to see the room.', el:'Θα ήθελα να δω το δωμάτιο.' } },
          { z:'Busco algo que esté cerca del metro.', na:{ de:'Ich suche etwas, das nah an der Metro liegt.', en:'I’m looking for something close to the metro.', el:'Ψάχνω κάτι που να είναι κοντά στο μετρό.' } }
        ]
      },
      kultur:{ de:'Mexiko-Stadt steht auf dem Grund eines alten Sees — in Xochimilco fährt man noch heute auf bunten Booten durch die Kanäle. Wer etwas nicht verstanden hat, sagt hier höflich „¿Mande?".',
               en:'Mexico City stands on the bed of an old lake — in Xochimilco people still glide through the canals on colourful boats. If you didn’t catch something, the polite Mexican way to ask is “¿Mande?”.',
               el:'Η Πόλη του Μεξικού είναι χτισμένη στον βυθό μιας παλιάς λίμνης — στο Σοτσιμίλκο ακόμα και σήμερα διασχίζεις τα κανάλια με πολύχρωμες βάρκες. Αν δεν κατάλαβες κάτι, εδώ ρωτάς ευγενικά «¿Mande?».' }
    },

    /* ── B1 · Oaxaca — Día de Muertos ─────────────────────────────── */
    'b1.familie': {
      duzen: true,
      deineRolle: { de:'Dein Großvater ist vor fünf Jahren gestorben. Er war sehr ruhig, hatte ein Boot und ging sonntags angeln. Deine Oma Fenna lebt in Utrecht; gestern hast du ihr eine Postkarte geschickt.', es:'Tu abuelo murió hace cinco años. Era muy tranquilo, tenía un barco y pescaba los domingos. Tu abuela Fenna vive en Utrecht; ayer le mandaste una postal.', en:'Your grandfather died five years ago. He was very calm, had a boat and went fishing on Sundays. Your grandmother Fenna lives in Utrecht; yesterday you sent her a postcard.', el:'Ο παππούς σου πέθανε πριν από πέντε χρόνια. Ήταν πολύ ήρεμος, είχε μια βάρκα και ψάρευε τις Κυριακές. Η γιαγιά σου η Φένα ζει στην Ουτρέχτη· χθες της έστειλες μια κάρτα.' },
      abrundung: { z:'¡Qué bonito! Ven, vamos a poner las flores de cempasúchil.', na:{ de:'Wie schön! Komm, wir stellen die Cempasúchil-Blumen auf.', en:'How lovely! Come on, let’s put out the marigolds.', el:'Τι ωραία! Έλα, πάμε να βάλουμε τα λουλούδια σεμπασούτσιλ.' } },
      rollen: {
        spikiu: { de:'Toño, der Sohn von Doña Lupita', es:'Toño, el hijo de doña Lupita', en:'Toño, Doña Lupita’s son', el:'ο Τόνιο, ο γιος της ντόνια Λουπίτα' },
        lerner: { de:'der Gast der Familie', es:'la invitada de la familia', en:'the family’s guest', el:'η καλεσμένη της οικογένειας' },
        ort:    { de:'vor dem Totenaltar in Oaxaca', es:'frente a la ofrenda, en Oaxaca', en:'in front of the ofrenda in Oaxaca', el:'μπροστά στον βωμό των νεκρών στην Οαχάκα' }
      },
      wortschatz: [
        { z:'el Día de Muertos',    na:{ de:'der Tag der Toten',        en:'the Day of the Dead', el:'η Ημέρα των Νεκρών' } },
        { z:'la ofrenda',           na:{ de:'der Totenaltar',           en:'the altar for the dead', el:'ο βωμός για τους νεκρούς' } },
        { z:'el cempasúchil',       na:{ de:'die Studentenblume (orange)', en:'the (orange) marigold', el:'ο κατιφές (πορτοκαλί)' } },
        { z:'el pan de muerto',     na:{ de:'das Totenbrot',            en:'the bread of the dead', el:'το ψωμί των νεκρών' } },
        { z:'la veladora',          na:{ de:'die Kerze',                en:'the candle', el:'το κερί' } },
        { z:'el panteón',           na:{ de:'der Friedhof (Mexiko)',    en:'the cemetery (Mexico)', el:'το νεκροταφείο (Μεξικό)' } },
        { z:'murió hace …',         na:{ de:'er/sie ist vor … gestorben', en:'he/she died … ago', el:'πέθανε πριν από …' } },
        { z:'era muy tranquilo',    na:{ de:'er war sehr ruhig',        en:'he was very calm', el:'ήταν πολύ ήρεμος' } },
        { z:'le encantaba',         na:{ de:'er/sie liebte (etwas)',    en:'he/she loved (something)', el:'του/της άρεσε πολύ' } },
        { z:'pescar',               na:{ de:'angeln',                   en:'to fish', el:'ψαρεύω' } },
        { z:'recordar',             na:{ de:'sich erinnern',            en:'to remember', el:'θυμάμαι' } },
        { z:'mandar una postal',    na:{ de:'eine Postkarte schicken',  en:'to send a postcard', el:'στέλνω μια κάρτα' } }
      ],
      dialog: {
        rolle: { de:'Toño, der Sohn der Vermieterin', en:'Toño, the landlady’s son', el:'Ο Τόνιο, ο γιος της σπιτονοικοκυράς' },
        zeilen: [
          { wer:'spikiu', z:'Este es mi abuelo Chucho; le encantaba el mezcal. ¿Quieres poner una foto de alguien tuyo?', na:{ de:'Das ist mein Opa Chucho; er liebte Mezcal. Möchtest du ein Foto von jemandem aus deiner Familie aufstellen?', en:'This is my grandad Chucho; he loved mezcal. Would you like to put up a photo of someone of yours?', el:'Αυτός είναι ο παππούς μου ο Τσούτσο· λάτρευε το μεσκάλ. Θέλεις να βάλεις μια φωτογραφία από κάποιον δικό σου;' } },
          { wer:'lerner', z:'Sí, una foto de mi abuelo. Murió hace cinco años.', na:{ de:'Ja, ein Foto von meinem Großvater. Er ist vor fünf Jahren gestorben.', en:'Yes, a photo of my grandfather. He died five years ago.', el:'Ναι, μια φωτογραφία του παππού μου. Πέθανε πριν από πέντε χρόνια.' } },
          { wer:'spikiu', z:'¿Y cómo era? ¿Qué le gustaba hacer?', na:{ de:'Und wie war er? Was hat er gern gemacht?', en:'And what was he like? What did he like doing?', el:'Και πώς ήταν; Τι του άρεσε να κάνει;' } },
          { wer:'lerner', z:'Era muy tranquilo. Tenía un barco y pescaba todos los domingos.', na:{ de:'Er war sehr ruhig. Er hatte ein Boot und ging jeden Sonntag angeln.', en:'He was very calm. He had a boat and went fishing every Sunday.', el:'Ήταν πολύ ήρεμος. Είχε μια βάρκα και ψάρευε κάθε Κυριακή.' } },
          { wer:'spikiu', z:'Entonces le ponemos un vaso de agua fresca. ¿Y tu abuela vive todavía?', na:{ de:'Dann stellen wir ihm ein Glas frisches Wasser hin. Und lebt deine Oma noch?', en:'Then we’ll put out a glass of fresh water for him. And is your grandmother still alive?', el:'Τότε θα του βάλουμε ένα ποτήρι δροσερό νερό. Και η γιαγιά σου ζει ακόμα;' } },
          { wer:'lerner', z:'Sí, mi abuela Fenna vive en Utrecht. Ayer le mandé una postal.', na:{ de:'Ja, meine Oma Fenna lebt in Utrecht. Gestern habe ich ihr eine Postkarte geschickt.', en:'Yes, my grandmother Fenna lives in Utrecht. I sent her a postcard yesterday.', el:'Ναι, η γιαγιά μου η Φένα ζει στην Ουτρέχτη. Χθες της έστειλα μια κάρτα.' } }
        ]
      },
      lesetext: {
        z:'En el verano llovió mucho en Oaxaca, por eso los campos de cempasúchil están llenos de flores naranjas. Esta mañana fuimos al panteón y la familia lavó las tumbas con agua. Toño me contó que su abuelo siempre cantaba mientras trabajaba. Por la noche nadie estaba triste: comimos, cantamos y recordamos.',
        na:{ de:'Im Sommer hat es in Oaxaca viel geregnet, deshalb sind die Cempasúchil-Felder voller orangefarbener Blumen. Heute Morgen sind wir zum Friedhof gegangen, und die Familie hat die Gräber mit Wasser gewaschen. Toño hat mir erzählt, dass sein Großvater beim Arbeiten immer sang. Am Abend war niemand traurig: Wir haben gegessen, gesungen und uns erinnert.',
             en:'In summer it rained a lot in Oaxaca, so the marigold fields are full of orange flowers. This morning we went to the cemetery and the family washed the graves with water. Toño told me his grandfather always sang while he worked. In the evening nobody was sad: we ate, sang and remembered.',
             el:'Το καλοκαίρι έβρεξε πολύ στην Οαχάκα, γι’ αυτό τα χωράφια με σεμπασούτσιλ είναι γεμάτα πορτοκαλί λουλούδια. Σήμερα το πρωί πήγαμε στο νεκροταφείο και η οικογένεια έπλυνε τους τάφους με νερό. Ο Τόνιο μού είπε ότι ο παππούς του τραγουδούσε πάντα όσο δούλευε. Το βράδυ κανείς δεν ήταν λυπημένος: φάγαμε, τραγουδήσαμε και θυμηθήκαμε.' },
        frage:{ de:'Was machte die Familie am Morgen auf dem Friedhof?', en:'What did the family do at the cemetery in the morning?', el:'Τι έκανε η οικογένεια το πρωί στο νεκροταφείο;' },
        optionen:[
          { na:{ de:'Sie wusch die Gräber',      en:'They washed the graves', el:'Έπλυνε τους τάφους' }, richtig:true  },
          { na:{ de:'Sie pflanzte Blumen',        en:'They planted flowers', el:'Φύτεψε λουλούδια' }, richtig:false },
          { na:{ de:'Sie backte Totenbrot',       en:'They baked bread of the dead', el:'Έψησε ψωμί των νεκρών' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle von einem Menschen, an den du dich gern erinnerst: wie er war und was ihr einmal zusammen gemacht habt. Zwei Sätze.',
                  en:'Tell about someone you like to remember: what they were like and something you once did together. Two sentences.',
                  el:'Μίλησε για έναν άνθρωπο που θυμάσαι με αγάπη: πώς ήταν και τι κάνατε κάποτε μαζί. Δύο προτάσεις.' },
        muster:'Mi abuela era muy alegre y siempre cantaba en la cocina. Un día me enseñó a hacer pan.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Beim Erzählen arbeiten zwei Vergangenheiten zusammen: era, tenía, pescaba malen das Bild (wie jemand war, was er immer tat). Murió, mandé erzählen, was einmal passiert ist. In Lateinamerika nimmt man diese zweite Form auch für heute: hoy llegué — in Spanien hättest du hoy he llegado gesagt.',
               en:'When telling a story, two pasts work together: era, tenía, pescaba paint the picture (what someone was like, what they always did). Murió, mandé tell what happened once. In Latin America this second form is used even for today: hoy llegué — in Spain you would have said hoy he llegado.',
               el:'Όταν διηγείσαι, δουλεύουν μαζί δύο παρελθοντικοί χρόνοι: τα era, tenía, pescaba ζωγραφίζουν την εικόνα (πώς ήταν κάποιος, τι έκανε πάντα). Τα murió, mandé λένε τι έγινε μία φορά. Στη Λατινική Αμερική αυτός ο δεύτερος τύπος μπαίνει και για το σήμερα: hoy llegué — στην Ισπανία θα έλεγες hoy he llegado.' },
        beispiele:[
          { z:'Pescaba todos los domingos.', na:{ de:'Er ging jeden Sonntag angeln.', en:'He went fishing every Sunday.', el:'Ψάρευε κάθε Κυριακή.' } },
          { z:'Murió hace cinco años.',      na:{ de:'Er ist vor fünf Jahren gestorben.', en:'He died five years ago.', el:'Πέθανε πριν από πέντε χρόνια.' } }
        ]
      },
      kultur:{ de:'Am 1. und 2. November bauen Familien in Mexiko eine Ofrenda für ihre Verstorbenen — mit Fotos, ihrem Lieblingsessen und orangefarbenen Cempasúchil-Blumen, deren Farbe und Duft den Seelen den Weg nach Hause zeigen. Es ist ein Fest des Erinnerns, nicht der Trauer.',
               en:'On 1 and 2 November, families in Mexico build an ofrenda for their dead — with photos, their favourite food and orange marigolds whose colour and scent show the souls the way home. It is a celebration of remembering, not of grief.',
               el:'Την 1η και τη 2α Νοεμβρίου οι οικογένειες στο Μεξικό στήνουν μια ofrenda για τους νεκρούς τους — με φωτογραφίες, το αγαπημένο τους φαγητό και πορτοκαλί λουλούδια σεμπασούτσιλ, που με το χρώμα και το άρωμά τους δείχνουν στις ψυχές τον δρόμο για το σπίτι. Είναι γιορτή της μνήμης, όχι του πένθους.' }
    },

    /* ── B1 · Monteverde — Nebelwald ──────────────────────────────── */
    'b1.wetter': {
      duzen: true,
      deineRolle: { de:'Du wanderst mit dem Guide Mauricio durch den Nebelwald. Du willst den Wasserfall fotografieren — deine Kamera darf nicht nass werden.', es:'Caminas con el guía Mauricio por el bosque nuboso. Quieres fotografiar la catarata, y tu cámara no se puede mojar.', en:'You are hiking through the cloud forest with the guide Mauricio. You want to photograph the waterfall — your camera must not get wet.', el:'Περπατάς με τον ξεναγό Μαουρίσιο στο δάσος των νεφών. Θέλεις να φωτογραφίσεις τον καταρράκτη — η μηχανή σου δεν πρέπει να βραχεί.' },
      abrundung: { z:'¡Así me gusta! Vas a ver cómo el bosque se bebe las nubes. ¡Vamos!', na:{ de:'So gefällt mir das! Du wirst sehen, wie der Wald die Wolken trinkt. Los geht’s!', en:'That’s the spirit! You’ll see how the forest drinks the clouds. Let’s go!', el:'Έτσι μπράβο! Θα δεις πώς το δάσος πίνει τα σύννεφα. Πάμε!' } },
      rollen: {
        spikiu: { de:'der Guide Mauricio', es:'el guía Mauricio', en:'Mauricio, the guide', el:'ο ξεναγός Μαουρίσιο' },
        lerner: { de:'die Fotografin', es:'la fotógrafa', en:'the photographer', el:'η φωτογράφος' },
        ort:    { de:'im Nebelwald von Monteverde', es:'en el bosque nuboso de Monteverde', en:'in the Monteverde cloud forest', el:'στο δάσος των νεφών του Μοντεβέρδε' }
      },
      wortschatz: [
        { z:'el bosque nuboso',     na:{ de:'der Nebelwald',            en:'the cloud forest', el:'το δάσος των νεφών' } },
        { z:'la neblina',           na:{ de:'der Nebel',                en:'the mist', el:'η ομίχλη' } },
        { z:'la llovizna',          na:{ de:'der Nieselregen',          en:'the drizzle', el:'το ψιχάλισμα' } },
        { z:'el viento',            na:{ de:'der Wind',                 en:'the wind', el:'ο αέρας' } },
        { z:'húmedo',               na:{ de:'feucht',                   en:'damp, humid', el:'υγρός' } },
        { z:'¿qué tiempo hará?',    na:{ de:'wie wird das Wetter?',     en:'what will the weather be like?', el:'τι καιρό θα κάνει;' } },
        { z:'la catarata',          na:{ de:'der Wasserfall',           en:'the waterfall', el:'ο καταρράκτης' } },
        { z:'el sendero',           na:{ de:'der Wanderweg',            en:'the trail', el:'το μονοπάτι' } },
        { z:'el puente colgante',   na:{ de:'die Hängebrücke',          en:'the suspension bridge', el:'η κρεμαστή γέφυρα' } },
        { z:'el impermeable',       na:{ de:'die Regenjacke',           en:'the raincoat', el:'το αδιάβροχο' } },
        { z:'¡pura vida!',          na:{ de:'hallo / alles gut! (Costa Rica)', en:'hi / all good! (Costa Rica)', el:'γεια / όλα καλά! (Κόστα Ρίκα)' } },
        { z:'tuanis',               na:{ de:'super, cool (Costa Rica)', en:'great, cool (Costa Rica)', el:'τέλεια, κουλ (Κόστα Ρίκα)' } }
      ],
      dialog: {
        rolle: { de:'Der Guide Mauricio', en:'Mauricio, the guide', el:'Ο ξεναγός Μαουρίσιο' },
        zeilen: [
          { wer:'spikiu', z:'¡Pura vida! La mañana está despejada, pero aquí el tiempo cambia muy rápido.', na:{ de:'Pura vida! Der Morgen ist klar, aber hier ändert sich das Wetter sehr schnell.', en:'Pura vida! The morning is clear, but the weather changes very fast here.', el:'Πούρα βίδα! Το πρωί είναι καθαρό, αλλά εδώ ο καιρός αλλάζει πολύ γρήγορα.' } },
          { wer:'lerner', z:'¿Qué tiempo hará por la tarde? Quiero sacar fotos de la catarata.', na:{ de:'Wie wird das Wetter am Nachmittag? Ich will den Wasserfall fotografieren.', en:'What will the weather be like this afternoon? I want to take photos of the waterfall.', el:'Τι καιρό θα κάνει το απόγευμα; Θέλω να φωτογραφίσω τον καταρράκτη.' } },
          { wer:'spikiu', z:'Después de las dos llegará la neblina, y casi siempre llueve un rato.', na:{ de:'Nach zwei Uhr kommt der Nebel, und fast immer regnet es eine Weile.', en:'After two the mist will come in, and it almost always rains for a while.', el:'Μετά τις δύο θα έρθει η ομίχλη, και σχεδόν πάντα βρέχει για λίγο.' } },
          { wer:'lerner', z:'Si llueve, guardaré la cámara en la mochila. ¿Mejor vamos ahora?', na:{ de:'Wenn es regnet, packe ich die Kamera in den Rucksack. Gehen wir lieber jetzt?', en:'If it rains, I’ll put the camera in my backpack. Shall we go now instead?', el:'Αν βρέξει, θα βάλω τη μηχανή στο σακίδιο. Καλύτερα να πάμε τώρα;' } },
          { wer:'spikiu', z:'Tuanis, buena idea. Si salimos ya, llegaremos antes de la lluvia.', na:{ de:'Super, gute Idee. Wenn wir jetzt losgehen, kommen wir vor dem Regen an.', en:'Cool, good idea. If we leave now, we’ll get there before the rain.', el:'Τέλεια, καλή ιδέα. Αν ξεκινήσουμε τώρα, θα φτάσουμε πριν από τη βροχή.' } },
          { wer:'lerner', z:'De acuerdo. Me pondré el impermeable por si acaso.', na:{ de:'Einverstanden. Ich ziehe für alle Fälle die Regenjacke an.', en:'All right. I’ll put on my raincoat just in case.', el:'Εντάξει. Θα φορέσω το αδιάβροχο για καλό και για κακό.' } }
        ]
      },
      lesetext: {
        z:'Bienvenidos al bosque nuboso de Monteverde. Aquí los árboles toman el agua directamente de las nubes. En diciembre hay mucho viento por la mañana y neblina por la tarde. Si llueve, no salga del sendero y no se quede en los puentes colgantes.',
        na:{ de:'Willkommen im Nebelwald von Monteverde. Hier nehmen die Bäume das Wasser direkt aus den Wolken. Im Dezember gibt es morgens viel Wind und nachmittags Nebel. Wenn es regnet, verlassen Sie den Weg nicht und bleiben Sie nicht auf den Hängebrücken stehen.',
             en:'Welcome to the Monteverde cloud forest. Here the trees take their water straight from the clouds. In December there is a lot of wind in the morning and mist in the afternoon. If it rains, do not leave the trail and do not stay on the suspension bridges.',
             el:'Καλώς ήρθατε στο δάσος των νεφών του Μοντεβέρδε. Εδώ τα δέντρα παίρνουν το νερό κατευθείαν από τα σύννεφα. Τον Δεκέμβριο έχει πολύ αέρα το πρωί και ομίχλη το απόγευμα. Αν βρέχει, μη βγαίνετε από το μονοπάτι και μη μένετε πάνω στις κρεμαστές γέφυρες.' },
        frage:{ de:'Woher nehmen die Bäume hier ihr Wasser?', en:'Where do the trees here get their water from?', el:'Από πού παίρνουν το νερό τους τα δέντρα εδώ;' },
        optionen:[
          { na:{ de:'Direkt aus den Wolken',   en:'Straight from the clouds', el:'Κατευθείαν από τα σύννεφα' }, richtig:true  },
          { na:{ de:'Aus einem großen See',    en:'From a big lake', el:'Από μια μεγάλη λίμνη' }, richtig:false },
          { na:{ de:'Nur aus dem Wasserfall',  en:'Only from the waterfall', el:'Μόνο από τον καταρράκτη' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib, was du morgen machst — je nach Wetter. Zwei Sätze mit „si".',
                  en:'Write what you will do tomorrow, depending on the weather. Two sentences with “si”.',
                  el:'Γράψε τι θα κάνεις αύριο, ανάλογα με τον καιρό. Δύο προτάσεις με «si».' },
        muster:'Si hace sol, iré al volcán. Si llueve, visitaré el museo.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Das Futur ist einfach: Infinitiv plus Endung — llegaré, lloverá, guardaremos. Ein paar Verben kürzen sich: hará, saldré, pondré. Nach „si" steht aber nie das Futur, sondern das Präsens: Si llueve, guardaré la cámara.',
               en:'The future is easy: infinitive plus ending — llegaré, lloverá, guardaremos. A few verbs shorten: hará, saldré, pondré. But after “si” never use the future, use the present: Si llueve, guardaré la cámara.',
               el:'Ο μέλλοντας είναι εύκολος: απαρέμφατο + κατάληξη — llegaré, lloverá, guardaremos. Μερικά ρήματα κονταίνουν: hará, saldré, pondré. Μετά το «si» όμως δεν μπαίνει ποτέ μέλλοντας αλλά ενεστώτας: Si llueve, guardaré la cámara.' },
        beispiele:[
          { z:'Si llueve, guardaré la cámara.', na:{ de:'Wenn es regnet, packe ich die Kamera weg.', en:'If it rains, I’ll put the camera away.', el:'Αν βρέξει, θα μαζέψω τη μηχανή.' } },
          { z:'¿Qué tiempo hará mañana?',       na:{ de:'Wie wird das Wetter morgen?', en:'What will the weather be like tomorrow?', el:'Τι καιρό θα κάνει αύριο;' } }
        ]
      },
      kultur:{ de:'In Costa Rica ist „¡pura vida!" Gruß, Dank und Lebensgefühl zugleich. Im Nebelwald von Monteverde kämmen Moose und Blätter das Wasser direkt aus den Wolken.',
               en:'In Costa Rica, “¡pura vida!” is a greeting, a thank-you and a way of life all at once. In the Monteverde cloud forest, mosses and leaves comb the water straight out of the clouds.',
               el:'Στην Κόστα Ρίκα το «¡pura vida!» είναι χαιρετισμός, ευχαριστώ και τρόπος ζωής μαζί. Στο δάσος των νεφών του Μοντεβέρδε τα βρύα και τα φύλλα «χτενίζουν» το νερό κατευθείαν από τα σύννεφα.' }
    },

    /* ── B1 · Quito — Soroche, Apotheke ───────────────────────────── */
    'b1.arzt': {
      deineRolle: { de:'Du bist gestern in Quito angekommen, auf 2.850 Metern. Du hast starke Kopfschmerzen, dir ist etwas schwindelig, und du hast schlecht geschlafen.', es:'Llegaste ayer a Quito, a 2.850 metros. Te duele mucho la cabeza, tienes un poco de mareo y dormiste mal.', en:'You arrived in Quito yesterday, at 2,850 metres. You have a bad headache, feel a bit dizzy and slept badly.', el:'Έφτασες χθες στο Κίτο, στα 2.850 μέτρα. Σε πονάει πολύ το κεφάλι, ζαλίζεσαι λίγο και κοιμήθηκες άσχημα.' },
      eroeffnung: { z:'Buenos días. ¿En qué le puedo ayudar?', na:{ de:'Guten Morgen. Wie kann ich Ihnen helfen?', en:'Good morning. How can I help you?', el:'Καλημέρα. Πώς μπορώ να σας βοηθήσω;' } },
      abrundung: { z:'Con eso mañana estará mejor. Y abríguese en la noche: ¡achachay, qué frío!', na:{ de:'Damit geht es Ihnen morgen besser. Und ziehen Sie sich abends warm an: brr, ist das kalt!', en:'With that you’ll feel better tomorrow. And wrap up warm at night: brr, it’s cold!', el:'Μ’ αυτό αύριο θα είστε καλύτερα. Και ντυθείτε ζεστά το βράδυ: μπρρ, τι κρύο!' } },
      rollen: {
        spikiu: { de:'die Apothekerin, Doña Carmen', es:'la farmacéutica, doña Carmen', en:'the pharmacist, Doña Carmen', el:'η φαρμακοποιός, η ντόνια Κάρμεν' },
        lerner: { de:'die Reisende mit Höhenkrankheit', es:'la viajera con soroche', en:'the traveller with altitude sickness', el:'η ταξιδιώτισσα με νόσο του υψομέτρου' },
        ort:    { de:'in einer Apotheke in Quito', es:'en una farmacia de Quito', en:'in a pharmacy in Quito', el:'σε ένα φαρμακείο στο Κίτο' }
      },
      wortschatz: [
        { z:'el soroche',           na:{ de:'die Höhenkrankheit',       en:'altitude sickness', el:'η νόσος του υψομέτρου' } },
        { z:'la altura',            na:{ de:'die Höhe',                 en:'the altitude', el:'το υψόμετρο' } },
        { z:'el mareo',             na:{ de:'der Schwindel',            en:'dizziness', el:'η ζάλη' } },
        { z:'el dolor de cabeza',   na:{ de:'die Kopfschmerzen',        en:'the headache', el:'ο πονοκέφαλος' } },
        { z:'descansar',            na:{ de:'sich ausruhen',            en:'to rest', el:'ξεκουράζομαι' } },
        { z:'la pastilla',          na:{ de:'die Tablette',             en:'the tablet', el:'το χάπι' } },
        { z:'cada ocho horas',      na:{ de:'alle acht Stunden',        en:'every eight hours', el:'κάθε οκτώ ώρες' } },
        { z:'en ayunas',            na:{ de:'auf nüchternen Magen',     en:'on an empty stomach', el:'με άδειο στομάχι' } },
        { z:'le recomiendo que tome …', na:{ de:'ich empfehle Ihnen, … zu nehmen', en:'I recommend that you take …', el:'σας συνιστώ να πάρετε …' } },
        { z:'abríguese',            na:{ de:'ziehen Sie sich warm an',  en:'wrap up warm', el:'ντυθείτε ζεστά' } },
        { z:'la horchata lojana',   na:{ de:'der Kräutertee aus Loja',  en:'the herbal drink from Loja', el:'το ρόφημα από βότανα της Λόχα' } },
        { z:'¡achachay!',           na:{ de:'brr, ist das kalt! (Ecuador)', en:'brr, it’s cold! (Ecuador)', el:'μπρρ, τι κρύο! (Ισημερινός)' } }
      ],
      dialog: {
        rolle: { de:'Die Apothekerin, Doña Carmen', en:'The pharmacist, Doña Carmen', el:'Η φαρμακοποιός, η ντόνια Κάρμεν' },
        zeilen: [
          { wer:'lerner', z:'Buenos días. Llegué ayer a Quito y me duele mucho la cabeza.', na:{ de:'Guten Morgen. Ich bin gestern in Quito angekommen und habe starke Kopfschmerzen.', en:'Good morning. I arrived in Quito yesterday and I have a bad headache.', el:'Καλημέρα. Έφτασα χθες στο Κίτο και με πονάει πολύ το κεφάλι.' } },
          { wer:'spikiu', z:'Seguro es el soroche, por la altura. ¿Tiene mareos? ¿Duerme bien?', na:{ de:'Das ist bestimmt die Höhenkrankheit. Ist Ihnen schwindelig? Schlafen Sie gut?', en:'It’s surely altitude sickness. Do you feel dizzy? Are you sleeping well?', el:'Σίγουρα είναι η νόσος του υψομέτρου. Ζαλίζεστε; Κοιμάστε καλά;' } },
          { wer:'lerner', z:'Sí, un poco de mareo, y anoche dormí muy mal. ¿Qué me recomienda?', na:{ de:'Ja, mir ist etwas schwindelig, und letzte Nacht habe ich sehr schlecht geschlafen. Was empfehlen Sie mir?', en:'Yes, a little dizzy, and I slept very badly last night. What do you recommend?', el:'Ναι, ζαλίζομαι λίγο, και χθες το βράδυ κοιμήθηκα πολύ άσχημα. Τι μου συνιστάτε;' } },
          { wer:'spikiu', z:'Le recomiendo que tome mucha agua y que descanse hoy. Tome esta pastilla cada ocho horas.', na:{ de:'Ich empfehle Ihnen, viel Wasser zu trinken und sich heute auszuruhen. Nehmen Sie diese Tablette alle acht Stunden.', en:'I recommend that you drink plenty of water and rest today. Take this tablet every eight hours.', el:'Σας συνιστώ να πίνετε πολύ νερό και να ξεκουραστείτε σήμερα. Παίρνετε αυτό το χάπι κάθε οκτώ ώρες.' } },
          { wer:'lerner', z:'¿Cada ocho horas, con comida? ¿Y puedo tomar café?', na:{ de:'Alle acht Stunden, mit Essen? Und darf ich Kaffee trinken?', en:'Every eight hours, with food? And can I drink coffee?', el:'Κάθε οκτώ ώρες, με φαγητό; Και μπορώ να πιω καφέ;' } },
          { wer:'spikiu', z:'Sí, con comida. Mejor no tome café; pruebe una horchata lojana, es de hierbas.', na:{ de:'Ja, mit Essen. Trinken Sie lieber keinen Kaffee; probieren Sie eine Horchata aus Loja, das ist ein Kräutergetränk.', en:'Yes, with food. Better not drink coffee; try a horchata lojana, it’s made from herbs.', el:'Ναι, με φαγητό. Καλύτερα μην πιείτε καφέ· δοκιμάστε μια horchata lojana, είναι από βότανα.' } }
        ]
      },
      lesetext: {
        z:'Quito está a 2.850 metros, y el primer día no podía subir ni una escalera. Doña Carmen, la farmacéutica, me dijo: «Tome mucha agua y descanse». Hoy ya estoy mejor, y desde la terraza vi el Cotopaxi con su glaciar blanco. Dicen que de ese hielo viene parte del agua de la ciudad.',
        na:{ de:'Quito liegt auf 2.850 Metern, und am ersten Tag konnte ich nicht einmal eine Treppe hinaufsteigen. Doña Carmen, die Apothekerin, sagte zu mir: „Trinken Sie viel Wasser und ruhen Sie sich aus." Heute geht es mir schon besser, und von der Terrasse aus habe ich den Cotopaxi mit seinem weißen Gletscher gesehen. Man sagt, ein Teil des Wassers der Stadt kommt aus diesem Eis.',
             en:'Quito is at 2,850 metres, and on the first day I couldn’t even climb a flight of stairs. Doña Carmen, the pharmacist, told me: “Drink plenty of water and rest.” Today I’m already better, and from the terrace I saw Cotopaxi with its white glacier. They say part of the city’s water comes from that ice.',
             el:'Το Κίτο βρίσκεται στα 2.850 μέτρα, και την πρώτη μέρα δεν μπορούσα να ανέβω ούτε μια σκάλα. Η ντόνια Κάρμεν, η φαρμακοποιός, μου είπε: «Πίνετε πολύ νερό και ξεκουραστείτε». Σήμερα είμαι ήδη καλύτερα, κι από τη βεράντα είδα το Κοτοπάξι με τον λευκό του παγετώνα. Λένε ότι από αυτόν τον πάγο έρχεται ένα μέρος από το νερό της πόλης.' },
        frage:{ de:'Was hat Lotte heute von der Terrasse aus gesehen?', en:'What did Lotte see from the terrace today?', el:'Τι είδε σήμερα η Λότε από τη βεράντα;' },
        optionen:[
          { na:{ de:'Den Cotopaxi mit seinem Gletscher', en:'Cotopaxi with its glacier', el:'Το Κοτοπάξι με τον παγετώνα του' }, richtig:true  },
          { na:{ de:'Das Meer',                          en:'The sea', el:'Τη θάλασσα' }, richtig:false },
          { na:{ de:'Einen Wasserfall',                  en:'A waterfall', el:'Έναν καταρράκτη' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Gib einem Gast in deinem Hostel zwei Ratschläge gegen die Höhenkrankheit. Zwei Sätze, mit „usted".',
                  en:'Give a guest at your hostel two pieces of advice against altitude sickness. Two sentences, using “usted”.',
                  el:'Δώσε σε έναν επισκέπτη του ξενώνα σου δύο συμβουλές για τη νόσο του υψομέτρου. Δύο προτάσεις, με «usted».' },
        muster:'Le recomiendo que tome mucha agua. No camine mucho el primer día.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Nach „le recomiendo que" kommt der Subjuntivo: Die Verben auf -ar bekommen ein -e (tome, descanse), die auf -er/-ir ein -a (beba, duerma). Praktisch: Genau dieselbe Form ist auch die Bitte mit usted — Tome esta pastilla. No tome café.',
               en:'After “le recomiendo que” comes the subjunctive: -ar verbs take an -e (tome, descanse), -er/-ir verbs an -a (beba, duerma). Handy: exactly the same form is also the request with usted — Tome esta pastilla. No tome café.',
               el:'Μετά το «le recomiendo que» μπαίνει υποτακτική: τα ρήματα σε -ar παίρνουν -e (tome, descanse), αυτά σε -er/-ir παίρνουν -a (beba, duerma). Πρακτικό: ακριβώς ο ίδιος τύπος είναι και η προστακτική με usted — Tome esta pastilla. No tome café.' },
        beispiele:[
          { z:'Le recomiendo que descanse.',    na:{ de:'Ich empfehle Ihnen, sich auszuruhen.', en:'I recommend that you rest.', el:'Σας συνιστώ να ξεκουραστείτε.' } },
          { z:'Tome esta pastilla cada ocho horas.', na:{ de:'Nehmen Sie diese Tablette alle acht Stunden.', en:'Take this tablet every eight hours.', el:'Παίρνετε αυτό το χάπι κάθε οκτώ ώρες.' } }
        ]
      },
      kultur:{ de:'Quito ist eine der höchstgelegenen Hauptstädte der Welt; gegen das Soroche helfen langsames Gehen, viel Wasser und Ruhe. Wenn es kalt wird, rufen die Leute „¡achachay!" — ein Wort aus dem Kichwa.',
               en:'Quito is one of the highest capitals in the world; against soroche, walking slowly, drinking lots of water and resting help. When it gets cold, people say “¡achachay!” — a word from Kichwa.',
               el:'Το Κίτο είναι μία από τις πιο ψηλές πρωτεύουσες του κόσμου· για το soroche βοηθούν το αργό περπάτημα, πολύ νερό και ξεκούραση. Όταν κάνει κρύο, ο κόσμος λέει «¡achachay!» — μια λέξη από τα κίτσουα.' }
    },

    /* ── B1 · Otavalo — Markt, feilschen ──────────────────────────── */
    'b1.einkaufen': {
      deineRolle: { de:'Du bist auf dem Markt von Otavalo. Dir gefällt ein blauer Poncho weiter hinten. Mehr als sechzig Dollar möchtest du eigentlich nicht zahlen; du hast einen Hundertdollarschein.', es:'Estás en el mercado de Otavalo. Te gusta un poncho azul que está más atrás. No quieres pagar más de sesenta dólares; tienes un billete de cien.', en:'You are at the Otavalo market. You like a blue poncho further back. You don’t really want to pay more than sixty dollars; you have a hundred-dollar note.', el:'Είσαι στην αγορά του Οταβάλο. Σου αρέσει ένα μπλε πόντσο πιο πίσω. Δεν θέλεις να πληρώσεις πάνω από εξήντα δολάρια· έχεις ένα χαρτονόμισμα των εκατό.' },
      abrundung: { z:'Claro, aquí tiene treinta de vuelto. ¡Qué chévere que le guste! Que le vaya bien.', na:{ de:'Klar, hier sind dreißig zurück. Toll, dass er Ihnen gefällt! Alles Gute.', en:'Of course, here’s thirty in change. Great that you like it! All the best.', el:'Βεβαίως, ορίστε τριάντα ρέστα. Τέλεια που σας αρέσει! Να ’στε καλά.' } },
      rollen: {
        spikiu: { de:'die Weberin Doña Tránsito', es:'la tejedora doña Tránsito', en:'Doña Tránsito, the weaver', el:'η υφάντρα κυρία Τράνσιτο' },
        lerner: { de:'die Kundin', es:'la clienta', en:'the customer', el:'η πελάτισσα' },
        ort:    { de:'auf dem Markt von Otavalo', es:'en el mercado de Otavalo', en:'at the Otavalo market', el:'στην αγορά του Οταβάλο' }
      },
      wortschatz: [
        { z:'el poncho',            na:{ de:'der Poncho',               en:'the poncho', el:'το πόντσο' } },
        { z:'tejido a mano',        na:{ de:'handgewebt',               en:'hand-woven', el:'υφασμένο στο χέρι' } },
        { z:'la lana de oveja',     na:{ de:'die Schafwolle',           en:'sheep’s wool', el:'το πρόβειο μαλλί' } },
        { z:'el diseño',            na:{ de:'das Muster',               en:'the pattern', el:'το σχέδιο' } },
        { z:'regatear',             na:{ de:'feilschen',                en:'to bargain', el:'παζαρεύω' } },
        { z:'¿cuánto vale?',        na:{ de:'was kostet das?',          en:'how much is it?', el:'πόσο κάνει;' } },
        { z:'¿me lo deja en …?',    na:{ de:'lassen Sie ihn mir für …?', en:'will you let me have it for …?', el:'μου το αφήνετε στα …;' } },
        { z:'más barato que',       na:{ de:'billiger als',             en:'cheaper than', el:'πιο φτηνό από' } },
        { z:'aquel',                na:{ de:'der dort drüben',          en:'that one over there', el:'εκείνο εκεί πέρα' } },
        { z:'me lo llevo',          na:{ de:'ich nehme ihn',            en:'I’ll take it', el:'το παίρνω' } },
        { z:'el vuelto',            na:{ de:'das Wechselgeld',          en:'the change', el:'τα ρέστα' } },
        { z:'¡a la orden!',         na:{ de:'bitte schön, zu Diensten!', en:'at your service!', el:'στη διάθεσή σας!' } }
      ],
      dialog: {
        rolle: { de:'Die Weberin Doña Tránsito', en:'Doña Tránsito, the weaver', el:'Η υφάντρα κυρία Τράνσιτο' },
        zeilen: [
          { wer:'spikiu', z:'¡A la orden! Estos ponchos los tejemos en mi familia, con lana de oveja.', na:{ de:'Bitte schön! Diese Ponchos weben wir in meiner Familie, aus Schafwolle.', en:'At your service! We weave these ponchos in my family, from sheep’s wool.', el:'Στη διάθεσή σας! Αυτά τα πόντσο τα υφαίνουμε στην οικογένειά μου, με πρόβειο μαλλί.' } },
          { wer:'lerner', z:'Son preciosos. ¿Qué significan los dibujos de aquel poncho azul?', na:{ de:'Sie sind wunderschön. Was bedeuten die Muster auf dem blauen Poncho dort drüben?', en:'They’re beautiful. What do the patterns on that blue poncho over there mean?', el:'Είναι πανέμορφα. Τι σημαίνουν τα σχέδια σε εκείνο το μπλε πόντσο;' } },
          { wer:'spikiu', z:'Son el lago San Pablo y las montañas. Ese cuesta ochenta dólares.', na:{ de:'Das sind der San-Pablo-See und die Berge. Der kostet achtzig Dollar.', en:'They’re Lake San Pablo and the mountains. That one costs eighty dollars.', el:'Είναι η λίμνη Σαν Πάμπλο και τα βουνά. Αυτό κοστίζει ογδόντα δολάρια.' } },
          { wer:'lerner', z:'Es más caro que el rojo, ¿no? ¿Me lo deja en sesenta?', na:{ de:'Er ist teurer als der rote, oder? Lassen Sie ihn mir für sechzig?', en:'It’s more expensive than the red one, isn’t it? Will you let me have it for sixty?', el:'Είναι πιο ακριβό από το κόκκινο, έτσι; Μου το αφήνετε στα εξήντα;' } },
          { wer:'spikiu', z:'Sesenta es muy poco. Se lo dejo en setenta, es el mejor que tengo.', na:{ de:'Sechzig ist zu wenig. Ich lasse ihn Ihnen für siebzig, er ist der beste, den ich habe.', en:'Sixty is too little. I’ll let you have it for seventy, it’s the best one I have.', el:'Τα εξήντα είναι πολύ λίγα. Σας το αφήνω στα εβδομήντα, είναι το καλύτερο που έχω.' } },
          { wer:'lerner', z:'Está bien, me lo llevo. ¿Puedo pagar con un billete de cien?', na:{ de:'In Ordnung, ich nehme ihn. Kann ich mit einem Hunderter zahlen?', en:'All right, I’ll take it. Can I pay with a hundred-dollar note?', el:'Εντάξει, το παίρνω. Μπορώ να πληρώσω με ένα κατοστάρικο;' } }
        ]
      },
      lesetext: {
        z:'El sábado el mercado de Otavalo es un mar de colores. Aprendí a regatear: siempre con una sonrisa y nunca demasiado. Aquí se paga en dólares, y en vez de «¿cuánto cuesta?» la gente dice «¿cuánto vale?». Por la tarde caminé hasta el lago San Pablo y saqué la foto del día: el volcán Imbabura dentro del agua.',
        na:{ de:'Am Samstag ist der Markt von Otavalo ein Meer aus Farben. Ich habe feilschen gelernt: immer mit einem Lächeln und nie zu viel. Hier zahlt man in Dollar, und statt „¿cuánto cuesta?" sagen die Leute „¿cuánto vale?". Am Nachmittag bin ich bis zum San-Pablo-See gelaufen und habe das Foto des Tages gemacht: der Vulkan Imbabura im Wasser.',
             en:'On Saturdays the Otavalo market is a sea of colours. I learnt to bargain: always with a smile and never too much. Here you pay in dollars, and instead of “¿cuánto cuesta?” people say “¿cuánto vale?”. In the afternoon I walked to Lake San Pablo and took the photo of the day: the Imbabura volcano reflected in the water.',
             el:'Το Σάββατο η αγορά του Οταβάλο είναι μια θάλασσα από χρώματα. Έμαθα να παζαρεύω: πάντα με χαμόγελο και ποτέ υπερβολικά. Εδώ πληρώνεις σε δολάρια, και αντί για «¿cuánto cuesta?» ο κόσμος λέει «¿cuánto vale?». Το απόγευμα περπάτησα ως τη λίμνη Σαν Πάμπλο κι έβγαλα τη φωτογραφία της ημέρας: το ηφαίστειο Ιμπαμπούρα μέσα στο νερό.' },
        frage:{ de:'Was ist Lottes Regel beim Feilschen?', en:'What is Lotte’s rule for bargaining?', el:'Ποιος είναι ο κανόνας της Λότε στο παζάρι;' },
        optionen:[
          { na:{ de:'Immer lächeln und nie zu viel', en:'Always smile and never too much', el:'Πάντα με χαμόγελο και ποτέ υπερβολικά' }, richtig:true  },
          { na:{ de:'Zuerst den halben Preis nennen', en:'Offer half the price first', el:'Πρώτα λες τη μισή τιμή' }, richtig:false },
          { na:{ de:'Nur mit großen Scheinen zahlen', en:'Only pay with big notes', el:'Πληρώνεις μόνο με μεγάλα χαρτονομίσματα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Vergleiche zwei Dinge auf einem Markt und mach ein Angebot. Zwei Sätze.',
                  en:'Compare two things at a market and make an offer. Two sentences.',
                  el:'Σύγκρινε δύο πράγματα σε μια αγορά και κάνε μια προσφορά. Δύο προτάσεις.' },
        muster:'Esta bufanda es más bonita que aquella. ¿Me la deja en quince dólares?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Vergleichen geht mit más/menos + Adjektiv + que: más caro que el rojo. Das Beste ist el mejor, das Teuerste el más caro. Und zeigen: este (bei mir), ese (bei dir), aquel (dort drüben, weit von uns beiden).',
               en:'To compare, use más/menos + adjective + que: más caro que el rojo. The best is el mejor, the most expensive el más caro. And for pointing: este (near me), ese (near you), aquel (over there, far from us both).',
               el:'Για σύγκριση: más/menos + επίθετο + que: más caro que el rojo. Το καλύτερο είναι el mejor, το ακριβότερο el más caro. Και για να δείξεις: este (κοντά σε μένα), ese (κοντά σε σένα), aquel (εκεί πέρα, μακριά κι από τους δυο μας).' },
        beispiele:[
          { z:'Este es más caro que aquel.', na:{ de:'Dieser ist teurer als der dort drüben.', en:'This one is more expensive than that one over there.', el:'Αυτό είναι πιο ακριβό από εκείνο εκεί πέρα.' } },
          { z:'¿Me lo deja en sesenta?',     na:{ de:'Lassen Sie ihn mir für sechzig?', en:'Will you let me have it for sixty?', el:'Μου το αφήνετε στα εξήντα;' } }
        ]
      },
      kultur:{ de:'Der Samstagsmarkt von Otavalo gehört zu den größten Märkten Südamerikas; die Kichwa-Weber verkaufen dort seit Jahrhunderten ihre Stoffe. In Ecuador zahlt man mit US-Dollar.',
               en:'The Saturday market in Otavalo is one of the largest in South America; Kichwa weavers have sold their textiles there for centuries. In Ecuador people pay in US dollars.',
               el:'Η αγορά του Σαββάτου στο Οταβάλο είναι από τις μεγαλύτερες της Νότιας Αμερικής· οι υφαντές κίτσουα πουλούν εκεί τα υφάσματά τους εδώ και αιώνες. Στον Ισημερινό πληρώνεις με δολάρια ΗΠΑ.' }
    }
  }
};

var B1_LP_B = {

  schritt: {
    bahnhof:         { de:'Quito → Tena: der Bus ist schon weg', en:'Quito → Tena: the bus has already gone', el:'Κίτο → Τένα: το λεωφορείο έχει ήδη φύγει' },
    taxi:            { de:'Asunción: plaudern, was wäre, wenn …', en:'Asunción: chatting about what if …', el:'Ασουνσιόν: κουβέντα για το «τι θα γινόταν αν …»' },
    cafe:            { de:'Buenos Aires: Meinungen austauschen', en:'Buenos Aires: sharing opinions', el:'Μπουένος Άιρες: ανταλλάσσεις απόψεις' },
    restaurant:      { de:'El Calafate: ein Vorstellungsgespräch', en:'El Calafate: a job interview', el:'Ελ Καλαφάτε: μια συνέντευξη για δουλειά' },
    wegbeschreibung: { de:'Canaima: eine Route verstehen und weitergeben', en:'Canaima: understanding a route and passing it on', el:'Καναΐμα: καταλαβαίνεις μια διαδρομή και τη μεταφέρεις' }
  },

  aufgaben: {
    'b1.bahnhof': [
      { de:'Bitte höflich um ein Ticket nach Tena für den Bus um zehn', es:'Pide con cortesía un pasaje para Tena en el bus de las diez', en:'Politely ask for a ticket to Tena on the ten o\'clock bus', el:'Ζήτα ευγενικά ένα εισιτήριο για την Τένα με το λεωφορείο των δέκα' },
      { de:'Sag, dass dein Taxi zu spät kam und der Bus schon weg war, und frag nach dem nächsten', es:'Di que tu taxi llegó tarde y que el bus ya había salido, y pregunta cuándo sale el siguiente', en:'Say your taxi was late and the bus had already left, and ask when the next one goes', el:'Πες ότι το ταξί σου άργησε και ότι το λεωφορείο είχε ήδη φύγει, και ρώτα πότε φεύγει το επόμενο' },
      { de:'Sag, dass du einen großen Rucksack hast, die Kamera aber bei dir behältst', es:'Di que llevas una mochila grande, pero que la cámara la llevas contigo', en:'Say you have a big rucksack, but you will keep the camera with you', el:'Πες ότι έχεις ένα μεγάλο σακίδιο, αλλά ότι τη φωτογραφική μηχανή την κρατάς μαζί σου' }
    ],
    'b1.taxi': [
      { de:'Sag, dass es sehr heiß ist und dass es in Holland jetzt kalt ist und ständig regnet', es:'Di que hace muchísimo calor y que en Holanda ahora hace frío y llueve todo el tiempo', en:'Say it is very hot, and that in Holland it is cold now and rains all the time', el:'Πες ότι κάνει πάρα πολλή ζέστη και ότι στην Ολλανδία τώρα κάνει κρύο και βρέχει συνέχεια' },
      { de:'Sag, dass du ihn noch nicht probiert hast, es aber sehr gern würdest', es:'Di que todavía no lo probaste, pero que te encantaría probarlo', en:'Say you have not tried it yet, but you would love to', el:'Πες ότι δεν το έχεις δοκιμάσει ακόμα, αλλά ότι θα ήθελες πολύ' },
      { de:'Sag, dass du eine Zeit lang bleiben würdest — am Fluss wohnen und fotografieren', es:'Di que te quedarías un tiempo: vivirías cerca del río y sacarías fotos', en:'Say you would stay for a while — live near the river and take photos', el:'Πες ότι θα έμενες για λίγο καιρό — θα ζούσες κοντά στο ποτάμι και θα έβγαζες φωτογραφίες' }
    ],
    'b1.cafe': [
      { de:'Sag, dass du die Stadt liebst und sie elegant und etwas nostalgisch findest (mit „creo que")', es:'Di que te encanta la ciudad y que crees que es elegante y un poco nostálgica', en:'Say you love the city and think it is elegant and a little nostalgic (with "creo que")', el:'Πες ότι σου αρέσει πολύ η πόλη και ότι νομίζεις πως είναι κομψή και λίγο νοσταλγική (με «creo que»)' },
      { de:'Sag, dass du Tango schön findest, aber nicht glaubst, dass du ihn tanzen kannst', es:'Di que el tango te parece bonito, pero que no crees que puedas bailarlo', en:'Say you find tango lovely, but you do not think you can dance it', el:'Πες ότι το τάνγκο σού φαίνεται όμορφο, αλλά δεν νομίζεις ότι μπορείς να το χορέψεις' },
      { de:'Nimm die Einladung an und sag, dass du wohl mehr zuschauen als tanzen wirst', es:'Acepta la invitación y di que crees que vas a mirar más que bailar', en:'Accept the invitation and say you think you will watch more than dance', el:'Δέξου την πρόσκληση και πες ότι μάλλον θα κοιτάζεις περισσότερο απ\' ό,τι θα χορεύεις' }
    ],
    'b1.restaurant': [
      { de:'Sag, dass du seit sechs Monaten durch Lateinamerika reist und Fotos für ein Buch machst', es:'Di que llevas seis meses viajando por Latinoamérica y que sacas fotos para un libro', en:'Say you have been travelling around Latin America for six months, taking photos for a book', el:'Πες ότι ταξιδεύεις εδώ και έξι μήνες στη Λατινική Αμερική και βγάζεις φωτογραφίες για ένα βιβλίο' },
      { de:'Sag, dass du zwei Sommer lang als Kellnerin in einem Café in Utrecht gearbeitet hast', es:'Di que has trabajado dos veranos de mesera en un café de Utrecht', en:'Say you have worked two summers as a waitress in a café in Utrecht', el:'Πες ότι έχεις δουλέψει δύο καλοκαίρια σερβιτόρα σε ένα καφέ στην Ουτρέχτη' },
      { de:'Sag gern zu und biete an, morgen anzufangen', es:'Acepta con gusto y ofrece empezar mañana', en:'Gladly accept and offer to start tomorrow', el:'Δέξου με χαρά και πρότεινε να ξεκινήσεις αύριο' }
    ],
    'b1.wegbeschreibung': [
      { de:'Zeig deine Freude und frag, wie man zum Aussichtspunkt kommt', es:'Muestra tu emoción y pregunta cómo se llega al mirador', en:'Show your excitement and ask how to get to the viewpoint', el:'Δείξε τον ενθουσιασμό σου και ρώτα πώς πάει κανείς στο σημείο θέας' },
      { de:'Fasse mit „dices que" zusammen: zuerst im Einbaum, dann eine Stunde zu Fuß', es:'Resume con «dices que»: primero en curiara y luego una hora a pie', en:'Sum up with "dices que": first by canoe, then an hour on foot', el:'Συνόψισε με «dices que»: πρώτα με κουριάρα και μετά μία ώρα με τα πόδια' },
      { de:'Sag, dass du verstanden hast und den anderen ausrichtest, dass es um fünf losgeht', es:'Di que entendiste y que les dices a los demás que salen a las cinco', en:'Say you understand and that you will tell the others you leave at five', el:'Πες ότι κατάλαβες και ότι θα πεις στους άλλους πως φεύγετε στις πέντε' }
    ]
  },

  stationen: {

    /* ── B1 · Am Bahnhof · Terminal Quitumbe → Tena (Feb) ─────────────── */
    'b1.bahnhof': {
      deineRolle: { de:'Du bist Lotte. Du wolltest den Bus um zehn nach Tena nehmen, aber dein Taxi kam zu spät. Du hast einen großen Rucksack und deine Kamera.', es:'Eres Lotte. Querías tomar el bus de las diez a Tena, pero tu taxi llegó tarde. Llevas una mochila grande y tu cámara.', en:'You are Lotte. You wanted the ten o\'clock bus to Tena, but your taxi arrived late. You have a big rucksack and your camera.', el:'Είσαι η Λότε. Ήθελες να πάρεις το λεωφορείο των δέκα για την Τένα, αλλά το ταξί σου άργησε. Έχεις ένα μεγάλο σακίδιο και τη φωτογραφική σου μηχανή.' },
      eroeffnung: { z:'Buenos días, señorita. Siguiente, por favor.', na:{ de:'Guten Morgen. Die Nächste, bitte.', en:'Good morning, miss. Next, please.', el:'Καλημέρα, δεσποινίς. Ο επόμενος, παρακαλώ.' } },
      abrundung: { z:'Tranquila, igual llega a Tena antes de la noche. ¡Buen viaje!', na:{ de:'Keine Sorge, Sie kommen trotzdem vor der Nacht in Tena an. Gute Reise!', en:'Don\'t worry, you will still reach Tena before nightfall. Have a good trip!', el:'Μην ανησυχείτε, θα φτάσετε στην Τένα πριν νυχτώσει. Καλό ταξίδι!' } },
      rollen: {
        spikiu: { de:'die Frau an der Boletería', es:'la señora de la boletería', en:'the woman at the ticket office', el:'η υπάλληλος στο εκδοτήριο' },
        lerner: { de:'Lotte, die Fotografin', es:'Lotte, la fotógrafa', en:'Lotte, the photographer', el:'η Λότε, η φωτογράφος' },
        ort:    { de:'im Busterminal Quitumbe, Quito', es:'en la Terminal Quitumbe, Quito', en:'at Quitumbe bus terminal, Quito', el:'στον σταθμό λεωφορείων Κιτούμπε, στο Κίτο' }
      },
      wortschatz: [
        { z:'el pasaje',        na:{ de:'die Fahrkarte',          en:'the ticket', el:'το εισιτήριο' } },
        { z:'la boletería',     na:{ de:'der Ticketschalter',     en:'the ticket office', el:'το εκδοτήριο εισιτηρίων' } },
        { z:'el andén',         na:{ de:'der Bussteig',           en:'the bay (platform)', el:'η αποβάθρα' } },
        { z:'acaba de salir',   na:{ de:'er ist gerade abgefahren', en:'it has just left', el:'μόλις έφυγε' } },
        { z:'ya había salido',  na:{ de:'er war schon abgefahren', en:'it had already left', el:'είχε ήδη φύγει' } },
        { z:'el siguiente',     na:{ de:'der nächste',            en:'the next one', el:'το επόμενο' } },
        { z:'el derrumbe',      na:{ de:'der Erdrutsch',          en:'the landslide', el:'η κατολίσθηση' } },
        { z:'la carretera',     na:{ de:'die Landstraße',         en:'the road', el:'ο δρόμος' } },
        { z:'demorarse',        na:{ de:'lange dauern, sich verspäten', en:'to take long, to be delayed', el:'αργώ, καθυστερώ' } },
        { z:'el equipaje',      na:{ de:'das Gepäck',             en:'the luggage', el:'οι αποσκευές' } },
        { z:'la bodega',        na:{ de:'der Gepäckraum (im Bus)', en:'the luggage hold', el:'ο χώρος αποσκευών' } },
        { z:'el asiento de ventanilla', na:{ de:'der Fensterplatz', en:'the window seat', el:'η θέση στο παράθυρο' } }
      ],
      dialog: {
        rolle: { de:'Die Frau an der Boletería', en:'The woman at the ticket office', el:'Η υπάλληλος στο εκδοτήριο' },
        zeilen: [
          { wer:'lerner', z:'Buenos días. Quería un pasaje para Tena en el bus de las diez.', na:{ de:'Guten Morgen. Ich hätte gern eine Fahrkarte nach Tena für den Bus um zehn.', en:'Good morning. I would like a ticket to Tena on the ten o\'clock bus.', el:'Καλημέρα. Θα ήθελα ένα εισιτήριο για την Τένα με το λεωφορείο των δέκα.' } },
          { wer:'spikiu', z:'Ay, lo siento. El bus de las diez acaba de salir, hace cinco minutos.', na:{ de:'Oh, das tut mir leid. Der Bus um zehn ist gerade abgefahren, vor fünf Minuten.', en:'Oh, I am sorry. The ten o\'clock bus has just left, five minutes ago.', el:'Α, λυπάμαι. Το λεωφορείο των δέκα μόλις έφυγε, πριν από πέντε λεπτά.' } },
          { wer:'lerner', z:'¡Qué pena! Mi taxi llegó tarde y el bus ya había salido. ¿Cuándo sale el siguiente?', na:{ de:'Wie schade! Mein Taxi kam zu spät, und der Bus war schon abgefahren. Wann fährt der nächste?', en:'What a shame! My taxi was late and the bus had already left. When does the next one leave?', el:'Τι κρίμα! Το ταξί μου άργησε και το λεωφορείο είχε ήδη φύγει. Πότε φεύγει το επόμενο;' } },
          { wer:'spikiu', z:'A las once y media. Pero ojo: hubo un derrumbe en la carretera y puede demorarse. ¿Lleva equipaje?', na:{ de:'Um halb zwölf. Aber Achtung: Auf der Straße gab es einen Erdrutsch, es kann länger dauern. Haben Sie Gepäck?', en:'At half past eleven. But watch out: there was a landslide on the road and it may take longer. Do you have any luggage?', el:'Στις έντεκα και μισή. Αλλά προσοχή: έγινε κατολίσθηση στον δρόμο και μπορεί να αργήσει. Έχετε αποσκευές;' } },
          { wer:'lerner', z:'Sí, una mochila grande. Pero la cámara la llevo conmigo.', na:{ de:'Ja, einen großen Rucksack. Aber die Kamera behalte ich bei mir.', en:'Yes, a big rucksack. But I will keep the camera with me.', el:'Ναι, ένα μεγάλο σακίδιο. Αλλά τη φωτογραφική μηχανή την κρατάω μαζί μου.' } },
          { wer:'spikiu', z:'Muy bien. La mochila va abajo, en la bodega. Andén siete, asiento doce.', na:{ de:'Sehr gut. Der Rucksack kommt nach unten in den Gepäckraum. Bussteig sieben, Platz zwölf.', en:'Very good. The rucksack goes underneath, in the hold. Bay seven, seat twelve.', el:'Πολύ καλά. Το σακίδιο μπαίνει κάτω, στον χώρο αποσκευών. Αποβάθρα επτά, θέση δώδεκα.' } }
        ]
      },
      lesetext: {
        z:'Cuando llegué a Quitumbe, el bus de las diez ya había salido. Tomé el de las once y media. En el camino hubo un derrumbe y esperamos casi una hora. Pero después la carretera bajó de los Andes a la selva, y en Tena vi por fin el río Napo.',
        na:{ de:'Als ich in Quitumbe ankam, war der Bus um zehn schon abgefahren. Ich nahm den um halb zwölf. Unterwegs gab es einen Erdrutsch, und wir warteten fast eine Stunde. Aber dann führte die Straße von den Anden hinunter in den Regenwald, und in Tena sah ich endlich den Fluss Napo.',
             en:'When I got to Quitumbe, the ten o\'clock bus had already left. I took the half past eleven. On the way there was a landslide and we waited almost an hour. But then the road went down from the Andes into the rainforest, and in Tena I finally saw the Napo river.',
             el:'Όταν έφτασα στο Κιτούμπε, το λεωφορείο των δέκα είχε ήδη φύγει. Πήρα αυτό των έντεκα και μισή. Στον δρόμο έγινε μια κατολίσθηση και περιμέναμε σχεδόν μία ώρα. Μετά όμως ο δρόμος κατέβηκε από τις Άνδεις στη ζούγκλα, και στην Τένα είδα επιτέλους τον ποταμό Νάπο.' },
        frage:{ de:'Warum warteten sie fast eine Stunde?', en:'Why did they wait almost an hour?', el:'Γιατί περίμεναν σχεδόν μία ώρα;' },
        optionen:[
          { na:{ de:'Wegen eines Erdrutsches',    en:'Because of a landslide', el:'Λόγω μιας κατολίσθησης' }, richtig:true  },
          { na:{ de:'Weil der Bus kaputt war',    en:'Because the bus broke down', el:'Επειδή χάλασε το λεωφορείο' }, richtig:false },
          { na:{ de:'Weil Lotte zu spät kam',     en:'Because Lotte was late', el:'Επειδή άργησε η Λότε' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, dass der Bus schon abgefahren war, als du ankamst, und was du dann gemacht hast. Zwei Sätze.',
                  en:'Say the bus had already left when you arrived, and what you did then. Two sentences.', el:'Διηγήσου ότι το λεωφορείο είχε ήδη φύγει όταν έφτασες και τι έκανες μετά. Δύο προτάσεις.' },
        muster:'Cuando llegué a la terminal, el bus ya había salido. Compré un pasaje para el siguiente y tomé un café.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Había salido" ist die Vorvergangenheit: Etwas war schon passiert, bevor etwas anderes passierte. Bau: había + Partizip. „Acaba de salir" heißt „ist gerade eben abgefahren" — acabar de + Infinitiv. In Spanien hörst du oft „se ha ido"; in Lateinamerika sagt man meist „ya se fue".',
               en:'"Había salido" is the past perfect: something had already happened before something else. Pattern: había + participle. "Acaba de salir" means "has just left" — acabar de + infinitive. In Spain you often hear "se ha ido"; in Latin America people usually say "ya se fue".',
               el:'Το «había salido» είναι ο υπερσυντέλικος: κάτι είχε ήδη γίνει πριν από κάτι άλλο. Σχήμα: había + μετοχή — όπως το ελληνικό «είχε φύγει». Το «acaba de salir» σημαίνει «μόλις έφυγε»: acabar de + απαρέμφατο. Στην Ισπανία ακούς συχνά «se ha ido»· στη Λατινική Αμερική λένε συνήθως «ya se fue».' },
        beispiele:[
          { z:'El bus ya había salido.', na:{ de:'Der Bus war schon abgefahren.', en:'The bus had already left.', el:'Το λεωφορείο είχε ήδη φύγει.' } },
          { z:'Acabo de llegar.',        na:{ de:'Ich bin gerade angekommen.',   en:'I have just arrived.', el:'Μόλις έφτασα.' } }
        ]
      },
      kultur: { de:'Vom Terminal Quitumbe im Süden Quitos fahren die Busse hinunter ins Amazonas-Tiefland — von 2.850 auf rund 500 Meter. In Tena fließt der Napo, der weiter östlich in den Amazonas mündet.',
                en:'From Quitumbe terminal in the south of Quito, buses head down to the Amazon lowlands — from 2,850 to about 500 metres. Tena lies on the Napo, which flows further east into the Amazon.',
                el:'Από τον σταθμό Κιτούμπε, στο νότιο Κίτο, τα λεωφορεία κατεβαίνουν στις πεδιάδες του Αμαζονίου — από τα 2.850 στα περίπου 500 μέτρα. Η Τένα βρίσκεται στον ποταμό Νάπο, που πιο ανατολικά χύνεται στον Αμαζόνιο.' }
    },

    /* ── B1 · Im Taxi · Asunción, Don Rolando (Feb–Mär) ─────────────────── */
    'b1.taxi': {
      deineRolle: { de:'Du bist Lotte. In Asunción ist es sehr heiß; in Holland ist es jetzt kalt. Tereré hast du noch nie probiert. Du könntest dir vorstellen, eine Zeit lang am Fluss zu wohnen.', es:'Eres Lotte. En Asunción hace muchísimo calor; en Holanda ahora hace frío. Todavía no probaste el tereré. Te imaginas viviendo un tiempo cerca del río.', en:'You are Lotte. It is very hot in Asunción; in Holland it is cold right now. You have never tried tereré. You could imagine living by the river for a while.', el:'Είσαι η Λότε. Στην Ασουνσιόν κάνει πολλή ζέστη· στην Ολλανδία τώρα κάνει κρύο. Δεν έχεις δοκιμάσει ποτέ τερερέ. Θα μπορούσες να φανταστείς να ζεις για λίγο καιρό κοντά στο ποτάμι.' },
      abrundung: { z:'¡Iporã! Eso en guaraní quiere decir «qué bien». Ya llegamos.', na:{ de:'Iporã! Das heißt auf Guaraní „wie schön". Wir sind da.', en:'Iporã! That is Guaraní for "how nice". Here we are.', el:'Iporã! Στα γκουαρανί σημαίνει «τι ωραία». Φτάσαμε.' } },
      rollen: {
        spikiu: { de:'Don Rolando, der Taxifahrer', es:'Don Rolando, el taxista', en:'Don Rolando, the taxi driver', el:'ο δον Ρολάντο, ο ταξιτζής' },
        lerner: { de:'Lotte, der Fahrgast', es:'Lotte, la pasajera', en:'Lotte, the passenger', el:'η Λότε, η επιβάτισσα' },
        ort:    { de:'in einem Taxi in Asunción', es:'en un taxi en Asunción', en:'in a taxi in Asunción', el:'σε ένα ταξί στην Ασουνσιόν' }
      },
      wortschatz: [
        { z:'¡qué calor!',      na:{ de:'was für eine Hitze!',     en:'it is so hot!', el:'τι ζέστη!' } },
        { z:'el tereré',        na:{ de:'kalter Mate-Tee',         en:'cold yerba mate', el:'το τερερέ (κρύο ματέ)' } },
        { z:'la yerba mate',    na:{ de:'der Mate-Tee',            en:'yerba mate', el:'η γέρμπα ματέ' } },
        { z:'la guampa',        na:{ de:'der Trinkbecher für Tereré', en:'the tereré cup', el:'το κύπελλο του τερερέ' } },
        { z:'el guaraní',       na:{ de:'Guaraní (die zweite Landessprache)', en:'Guaraní (the second national language)', el:'τα γκουαρανί (η δεύτερη επίσημη γλώσσα)' } },
        { z:'Mba\'éichapa',     na:{ de:'Wie geht\'s? (Guaraní)',  en:'How are you? (Guaraní)', el:'Τι κάνεις; (στα γκουαρανί)' } },
        { z:'la costanera',     na:{ de:'die Uferpromenade',       en:'the riverside promenade', el:'ο παραποτάμιος περίπατος' } },
        { z:'la tranquilidad',  na:{ de:'die Ruhe',                en:'the calm', el:'η ηρεμία' } },
        { z:'me encantaría',    na:{ de:'ich würde sehr gern',     en:'I would love to', el:'θα ήθελα πολύ' } },
        { z:'me quedaría',      na:{ de:'ich würde bleiben',       en:'I would stay', el:'θα έμενα' } },
        { z:'viviría',          na:{ de:'ich würde wohnen',        en:'I would live', el:'θα ζούσα' } },
        { z:'la siesta',        na:{ de:'die Mittagsruhe',         en:'the afternoon rest', el:'ο μεσημεριανός ύπνος' } }
      ],
      dialog: {
        rolle: { de:'Don Rolando, der Taxifahrer', en:'Don Rolando, the taxi driver', el:'Ο δον Ρολάντο, ο ταξιτζής' },
        zeilen: [
          { wer:'spikiu', z:'Buenas tardes. ¡Mba\'éichapa! Así saludamos en guaraní. ¿Mucho calor, señorita?', na:{ de:'Guten Tag. Mba\'éichapa! So grüßen wir auf Guaraní. Sehr heiß, junge Frau?', en:'Good afternoon. Mba\'éichapa! That is how we say hello in Guaraní. Very hot, miss?', el:'Καλησπέρα. Mba\'éichapa! Έτσι χαιρετάμε στα γκουαρανί. Πολλή ζέστη, δεσποινίς;' } },
          { wer:'lerner', z:'Sí, muchísimo. En Holanda ahora hace frío y llueve todo el tiempo.', na:{ de:'Ja, sehr. In Holland ist es jetzt kalt, und es regnet ständig.', en:'Yes, very. In Holland it is cold now and it rains all the time.', el:'Ναι, πάρα πολλή. Στην Ολλανδία τώρα κάνει κρύο και βρέχει συνέχεια.' } },
          { wer:'spikiu', z:'Por eso aquí tomamos tereré: yerba mate con agua bien fría. ¿Ya lo probó?', na:{ de:'Deshalb trinken wir hier Tereré: Mate mit eiskaltem Wasser. Haben Sie ihn schon probiert?', en:'That is why we drink tereré here: yerba mate with ice-cold water. Have you tried it yet?', el:'Γι\' αυτό εδώ πίνουμε τερερέ: γέρμπα ματέ με παγωμένο νερό. Το έχετε δοκιμάσει;' } },
          { wer:'lerner', z:'Todavía no, pero me encantaría probarlo.', na:{ de:'Noch nicht, aber ich würde ihn sehr gern probieren.', en:'Not yet, but I would love to try it.', el:'Όχι ακόμα, αλλά θα ήθελα πολύ να το δοκιμάσω.' } },
          { wer:'spikiu', z:'Muchos europeos vienen a vivir aquí por la calma y el espacio. ¿Usted se quedaría?', na:{ de:'Viele Europäer ziehen hierher, wegen der Ruhe und des Platzes. Würden Sie bleiben?', en:'Lots of Europeans come to live here for the calm and the space. Would you stay?', el:'Πολλοί Ευρωπαίοι έρχονται να ζήσουν εδώ για την ηρεμία και τον χώρο. Εσείς θα μένατε;' } },
          { wer:'lerner', z:'Me quedaría un tiempo, sí. Viviría cerca del río y sacaría fotos.', na:{ de:'Ich würde eine Zeit lang bleiben, ja. Ich würde am Fluss wohnen und fotografieren.', en:'I would stay for a while, yes. I would live near the river and take photos.', el:'Θα έμενα για λίγο καιρό, ναι. Θα ζούσα κοντά στο ποτάμι και θα έβγαζα φωτογραφίες.' } }
        ]
      },
      lesetext: {
        z:'El taxista se llamaba Don Rolando. Hablaba español y guaraní, a veces en la misma frase. Me contó que en verano todos toman tereré, hasta en la oficina. Palabra del lugar: tereré. Creo que me quedaría un mes más.',
        na:{ de:'Der Taxifahrer hieß Don Rolando. Er sprach Spanisch und Guaraní, manchmal im selben Satz. Er erzählte mir, dass im Sommer alle Tereré trinken, sogar im Büro. Wort des Ortes: tereré. Ich glaube, ich würde noch einen Monat bleiben.',
             en:'The taxi driver was called Don Rolando. He spoke Spanish and Guaraní, sometimes in the same sentence. He told me that in summer everyone drinks tereré, even at the office. Word of the place: tereré. I think I would stay one more month.',
             el:'Ο ταξιτζής λεγόταν δον Ρολάντο. Μιλούσε ισπανικά και γκουαρανί, μερικές φορές στην ίδια πρόταση. Μου είπε ότι το καλοκαίρι όλοι πίνουν τερερέ, ακόμα και στο γραφείο. Λέξη του τόπου: tereré. Νομίζω ότι θα έμενα έναν μήνα ακόμα.' },
        frage:{ de:'Was erzählte Don Rolando über den Tereré?', en:'What did Don Rolando say about tereré?', el:'Τι είπε ο δον Ρολάντο για το τερερέ;' },
        optionen:[
          { na:{ de:'Im Sommer trinken ihn alle, sogar im Büro', en:'In summer everyone drinks it, even at the office', el:'Το καλοκαίρι το πίνουν όλοι, ακόμα και στο γραφείο' }, richtig:true  },
          { na:{ de:'Man trinkt ihn nur abends',                 en:'People only drink it in the evening', el:'Το πίνουν μόνο το βράδυ' }, richtig:false },
          { na:{ de:'Nur Touristen trinken ihn',                 en:'Only tourists drink it', el:'Το πίνουν μόνο οι τουρίστες' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Stell dir vor, du lebst ein Jahr in einem anderen Land. Was würdest du tun? Zwei Sätze mit Konditional.',
                  en:'Imagine you live in another country for a year. What would you do? Two sentences with the conditional.', el:'Φαντάσου ότι ζεις έναν χρόνο σε άλλη χώρα. Τι θα έκανες; Δύο προτάσεις με υποθετική έγκλιση.' },
        muster:'Viviría cerca del mar. Aprendería a cocinar y tomaría tereré todas las tardes.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Das Konditional sagt „würde": me quedaría, viviría, sacaría. Bau: der ganze Infinitiv + -ía, -ías, -ía … — für alle drei Verbgruppen gleich. „Me encantaría" ist die freundlichste Art, Ja zu sagen. In Spanien und Lateinamerika ist das genau gleich.',
               en:'The conditional says "would": me quedaría, viviría, sacaría. Pattern: the whole infinitive + -ía, -ías, -ía … — the same for all three verb groups. "Me encantaría" is the friendliest way to say yes. It works exactly the same in Spain and Latin America.',
               el:'Η υποθετική λέει «θα …»: me quedaría (θα έμενα), viviría, sacaría. Σχήμα: ολόκληρο το απαρέμφατο + -ía, -ías, -ía … — ίδιο για όλες τις συζυγίες. Το «me encantaría» είναι ο πιο φιλικός τρόπος να πεις ναι. Στην Ισπανία και στη Λατινική Αμερική είναι ακριβώς το ίδιο.' },
        beispiele:[
          { z:'Me quedaría un tiempo.',   na:{ de:'Ich würde eine Zeit lang bleiben.', en:'I would stay for a while.', el:'Θα έμενα για λίγο καιρό.' } },
          { z:'Me encantaría probarlo.',  na:{ de:'Ich würde es sehr gern probieren.', en:'I would love to try it.', el:'Θα ήθελα πολύ να το δοκιμάσω.' } }
        ]
      },
      kultur: { de:'Paraguay ist zweisprachig: Fast alle sprechen Spanisch und Guaraní, oft gemischt im selben Satz. Tereré ist kalter Mate mit frischen Kräutern — bei 40 Grad trinkt man ihn den ganzen Tag, am liebsten im Schatten und in Gesellschaft.',
                en:'Paraguay is bilingual: almost everyone speaks Spanish and Guaraní, often mixed in the same sentence. Tereré is cold mate with fresh herbs — at 40 degrees people drink it all day, ideally in the shade and in company.',
                el:'Η Παραγουάη είναι δίγλωσση: σχεδόν όλοι μιλούν ισπανικά και γκουαρανί, συχνά ανακατεμένα στην ίδια πρόταση. Το τερερέ είναι κρύο ματέ με φρέσκα βότανα — στους 40 βαθμούς το πίνουν όλη μέρα, κατά προτίμηση στη σκιά και με παρέα.' }
    },

    /* ── B1 · Im Café · Buenos Aires, Don Aníbal (Mär) ──────────────────── */
    'b1.cafe': {
      deineRolle: { de:'Du bist Lotte und sitzt in einem alten Café in Buenos Aires. Du findest die Stadt elegant und etwas nostalgisch. Tango gefällt dir — tanzen traust du dir aber nicht zu.', es:'Eres Lotte y estás en un café antiguo de Buenos Aires. La ciudad te parece elegante y un poco nostálgica. Te gusta el tango, pero no te atreves a bailarlo.', en:'You are Lotte, sitting in an old café in Buenos Aires. You find the city elegant and a little nostalgic. You like tango — but you do not trust yourself to dance it.', el:'Είσαι η Λότε και κάθεσαι σε ένα παλιό καφέ στο Μπουένος Άιρες. Η πόλη σού φαίνεται κομψή και λίγο νοσταλγική. Σου αρέσει το τάνγκο, αλλά δεν τολμάς να το χορέψεις.' },
      abrundung: { z:'Ya veremos. A las diez, en la esquina. ¡Y traiga zapatos cómodos!', na:{ de:'Das werden wir sehen. Um zehn, an der Ecke. Und bringen Sie bequeme Schuhe mit!', en:'We shall see. At ten, on the corner. And bring comfortable shoes!', el:'Θα δούμε. Στις δέκα, στη γωνία. Και φέρτε άνετα παπούτσια!' } },
      rollen: {
        spikiu: { de:'Don Aníbal, Tangolehrer im Ruhestand', es:'Don Aníbal, profesor de tango jubilado', en:'Don Aníbal, a retired tango teacher', el:'ο δον Ανίμπαλ, συνταξιούχος δάσκαλος τάνγκο' },
        lerner: { de:'Lotte, am Nachbartisch', es:'Lotte, en la mesa de al lado', en:'Lotte, at the next table', el:'η Λότε, στο διπλανό τραπέζι' },
        ort:    { de:'im Café La Esquina de Boedo, Buenos Aires', es:'en el Café La Esquina de Boedo, Buenos Aires', en:'at Café La Esquina de Boedo, Buenos Aires', el:'στο καφέ La Esquina de Boedo, στο Μπουένος Άιρες' }
      },
      wortschatz: [
        { z:'el cortado',       na:{ de:'Espresso mit einem Schuss Milch', en:'espresso with a dash of milk', el:'εσπρέσο με λίγο γάλα' } },
        { z:'las medialunas',   na:{ de:'kleine süße Croissants',  en:'small sweet croissants', el:'μικρά γλυκά κρουασάν' } },
        { z:'el mozo',          na:{ de:'der Kellner (Argentinien)', en:'the waiter (Argentina)', el:'ο σερβιτόρος (Αργεντινή)' } },
        { z:'la milonga',       na:{ de:'der Tango-Tanzabend',     en:'the tango dance night', el:'η βραδιά τάνγκο (μιλόνγκα)' } },
        { z:'el bandoneón',     na:{ de:'das Bandoneon',           en:'the bandoneon', el:'το μπαντονεόν' } },
        { z:'creo que …',       na:{ de:'ich glaube, dass …',      en:'I think that …', el:'νομίζω ότι …' } },
        { z:'no creo que …',    na:{ de:'ich glaube nicht, dass …', en:'I do not think that …', el:'δεν νομίζω ότι …' } },
        { z:'me parece que …',  na:{ de:'mir scheint, dass …',     en:'it seems to me that …', el:'μου φαίνεται ότι …' } },
        { z:'en mi opinión',    na:{ de:'meiner Meinung nach',     en:'in my opinion', el:'κατά τη γνώμη μου' } },
        { z:'nostálgico',       na:{ de:'nostalgisch',             en:'nostalgic', el:'νοσταλγικός' } },
        { z:'a la vuelta',      na:{ de:'um die Ecke',             en:'round the corner', el:'στη γωνία' } },
        { z:'porteño',          na:{ de:'aus Buenos Aires',        en:'from Buenos Aires', el:'από το Μπουένος Άιρες' } }
      ],
      dialog: {
        rolle: { de:'Don Aníbal, ein Tangolehrer im Ruhestand', en:'Don Aníbal, a retired tango teacher', el:'Ο δον Ανίμπαλ, συνταξιούχος δάσκαλος τάνγκο' },
        zeilen: [
          { wer:'spikiu', z:'Perdone que la moleste. Veo que saca fotos del café. ¿Le gusta Buenos Aires?', na:{ de:'Verzeihen Sie die Störung. Ich sehe, Sie fotografieren das Café. Gefällt Ihnen Buenos Aires?', en:'Forgive me for disturbing you. I see you are taking photos of the café. Do you like Buenos Aires?', el:'Συγγνώμη που σας ενοχλώ. Βλέπω ότι φωτογραφίζετε το καφέ. Σας αρέσει το Μπουένος Άιρες;' } },
          { wer:'lerner', z:'Me encanta. Creo que es una ciudad elegante y un poco nostálgica.', na:{ de:'Ich liebe sie. Ich finde, sie ist eine elegante und etwas nostalgische Stadt.', en:'I love it. I think it is an elegant city, and a little nostalgic.', el:'Μου αρέσει πολύ. Νομίζω ότι είναι μια κομψή και λίγο νοσταλγική πόλη.' } },
          { wer:'spikiu', z:'Es el tango, señorita. Lo enseñé cuarenta años. ¿Y a usted le gusta?', na:{ de:'Das ist der Tango, junge Frau. Ich habe ihn vierzig Jahre lang unterrichtet. Und gefällt er Ihnen?', en:'That is the tango, miss. I taught it for forty years. And do you like it?', el:'Είναι το τάνγκο, δεσποινίς. Το δίδαξα σαράντα χρόνια. Κι εσάς σας αρέσει;' } },
          { wer:'lerner', z:'Me parece muy bonito, pero no creo que yo pueda bailarlo.', na:{ de:'Ich finde ihn sehr schön, aber ich glaube nicht, dass ich ihn tanzen kann.', en:'I think it is lovely, but I do not think I could dance it.', el:'Μου φαίνεται πολύ όμορφο, αλλά δεν νομίζω ότι μπορώ να το χορέψω.' } },
          { wer:'spikiu', z:'Todo el mundo puede. Esta noche hay una milonga aquí a la vuelta. ¿Por qué no viene?', na:{ de:'Jeder kann das. Heute Abend gibt es eine Milonga gleich um die Ecke. Warum kommen Sie nicht?', en:'Everyone can. Tonight there is a milonga just round the corner. Why don\'t you come?', el:'Όλοι μπορούν. Απόψε έχει μιλόνγκα εδώ στη γωνία. Γιατί δεν έρχεστε;' } },
          { wer:'lerner', z:'Bueno, ¿por qué no? Pero creo que voy a mirar más que bailar.', na:{ de:'Na gut, warum nicht? Aber ich glaube, ich werde mehr zuschauen als tanzen.', en:'Well, why not? But I think I will watch more than dance.', el:'Εντάξει, γιατί όχι; Αλλά νομίζω ότι θα κοιτάζω περισσότερο απ\' ό,τι θα χορεύω.' } }
        ]
      },
      lesetext: {
        z:'Pedí un cortado con dos medialunas, como todos aquí. El mozo me trató de usted y me llamó «señorita». Don Aníbal me explicó que los porteños dicen «vos» entre amigos, pero usan «usted» con desconocidos. Palabra del lugar: medialuna.',
        na:{ de:'Ich bestellte einen Cortado mit zwei Medialunas, wie alle hier. Der Kellner siezte mich und nannte mich „señorita". Don Aníbal erklärte mir, dass die Leute aus Buenos Aires unter Freunden „vos" sagen, mit Fremden aber „usted". Wort des Ortes: medialuna.',
             en:'I ordered a cortado with two medialunas, like everyone here. The waiter called me "usted" and "señorita". Don Aníbal explained that people in Buenos Aires say "vos" among friends, but use "usted" with strangers. Word of the place: medialuna.',
             el:'Παρήγγειλα έναν κορτάδο με δύο μεδιαλούνας, όπως όλοι εδώ. Ο σερβιτόρος μού μίλησε στον πληθυντικό και με είπε «señorita». Ο δον Ανίμπαλ μού εξήγησε ότι οι κάτοικοι του Μπουένος Άιρες λένε «vos» μεταξύ φίλων, αλλά «usted» στους αγνώστους. Λέξη του τόπου: medialuna.' },
        frage:{ de:'Wann sagen die Leute in Buenos Aires „usted"?', en:'When do people in Buenos Aires say "usted"?', el:'Πότε λένε «usted» στο Μπουένος Άιρες;' },
        optionen:[
          { na:{ de:'Unter Freunden',   en:'Among friends', el:'Μεταξύ φίλων' }, richtig:false },
          { na:{ de:'Mit Fremden',      en:'With strangers', el:'Στους αγνώστους' }, richtig:true  },
          { na:{ de:'Nur im Café',      en:'Only in cafés', el:'Μόνο στο καφέ' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag deine Meinung über eine Stadt, die du kennst: einmal mit „creo que", einmal mit „no creo que". Zwei Sätze.',
                  en:'Give your opinion of a city you know: once with "creo que", once with "no creo que". Two sentences.', el:'Πες τη γνώμη σου για μια πόλη που ξέρεις: μία φορά με «creo que» και μία με «no creo que». Δύο προτάσεις.' },
        muster:'Creo que Lisboa es una ciudad muy alegre. No creo que sea muy tranquila.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Meinung sagen: „creo que" und „me parece que" + normale Form: creo que es bonito. Verneinst du, kippt das Verb in den Subjuntivo: no creo que pueda, no creo que sea. Zweifel bekommt eine eigene Form — in Spanien wie in Lateinamerika.',
               en:'Giving an opinion: "creo que" and "me parece que" + the normal form: creo que es bonito. When you negate it, the verb switches to the subjunctive: no creo que pueda, no creo que sea. Doubt gets its own form — in Spain and Latin America alike.',
               el:'Λες τη γνώμη σου: «creo que» και «me parece que» + κανονικός τύπος: creo que es bonito. Όταν το αρνείσαι, το ρήμα περνά σε υποτακτική: no creo que pueda, no creo que sea. Η αμφιβολία έχει δικό της τύπο — στην Ισπανία όπως και στη Λατινική Αμερική.' },
        beispiele:[
          { z:'Creo que es elegante.',        na:{ de:'Ich finde, sie ist elegant.', en:'I think it is elegant.', el:'Νομίζω ότι είναι κομψή.' } },
          { z:'No creo que pueda bailarlo.',  na:{ de:'Ich glaube nicht, dass ich ihn tanzen kann.', en:'I do not think I can dance it.', el:'Δεν νομίζω ότι μπορώ να το χορέψω.' } }
        ]
      },
      kultur: { de:'Buenos Aires schützt seine alten Kaffeehäuser als „bares notables" — viele sind über hundert Jahre alt. Der Río de la Plata ist hier so breit, dass man vom Ufer aus das andere Ufer nicht sieht.',
                en:'Buenos Aires protects its old coffee houses as "bares notables" — many are over a hundred years old. The Río de la Plata is so wide here that you cannot see the other bank from the shore.',
                el:'Το Μπουένος Άιρες προστατεύει τα παλιά του καφενεία ως «bares notables» — πολλά είναι πάνω από εκατό χρονών. Ο Ρίο ντε λα Πλάτα είναι τόσο πλατύς εδώ που από την όχθη δεν βλέπεις την απέναντι.' }
    },

    /* ── B1 · Im Restaurant · El Calafate, Doña Inés (Apr) ──────────────── */
    'b1.restaurant': {
      deineRolle: { de:'Du bist Lotte. Du reist seit sechs Monaten durch Lateinamerika und fotografierst für ein Buch. Du hast zwei Sommer lang als Kellnerin in einem Café in Utrecht gearbeitet und kannst morgen anfangen.', es:'Eres Lotte. Llevas seis meses viajando por Latinoamérica y sacas fotos para un libro. Trabajaste dos veranos de mesera en un café de Utrecht y puedes empezar mañana.', en:'You are Lotte. You have been travelling around Latin America for six months, taking photos for a book. You worked two summers as a waitress in a café in Utrecht and can start tomorrow.', el:'Είσαι η Λότε. Ταξιδεύεις εδώ και έξι μήνες στη Λατινική Αμερική και βγάζεις φωτογραφίες για ένα βιβλίο. Δούλεψες δύο καλοκαίρια σερβιτόρα σε ένα καφέ στην Ουτρέχτη και μπορείς να ξεκινήσεις αύριο.' },
      abrundung: { z:'¡Trato hecho! Mañana a las once. Bienvenida al equipo.', na:{ de:'Abgemacht! Morgen um elf. Willkommen im Team.', en:'It is a deal! Tomorrow at eleven. Welcome to the team.', el:'Συμφωνήσαμε! Αύριο στις έντεκα. Καλώς ήρθατε στην ομάδα.' } },
      rollen: {
        spikiu: { de:'Doña Inés, die Chefin des Restaurants', es:'Doña Inés, la dueña del restaurante', en:'Doña Inés, the restaurant owner', el:'η δόνια Ινές, η ιδιοκτήτρια του εστιατορίου' },
        lerner: { de:'Lotte, die Bewerberin', es:'Lotte, la candidata', en:'Lotte, the applicant', el:'η Λότε, η υποψήφια' },
        ort:    { de:'in einem Restaurant in El Calafate, Patagonien', es:'en un restaurante de El Calafate, en la Patagonia', en:'in a restaurant in El Calafate, Patagonia', el:'σε ένα εστιατόριο στο Ελ Καλαφάτε, στην Παταγονία' }
      },
      wortschatz: [
        { z:'la entrevista',    na:{ de:'das Vorstellungsgespräch', en:'the job interview', el:'η συνέντευξη' } },
        { z:'la temporada',     na:{ de:'die Saison',              en:'the season', el:'η σεζόν' } },
        { z:'el currículum',    na:{ de:'der Lebenslauf',          en:'the CV', el:'το βιογραφικό' } },
        { z:'la experiencia',   na:{ de:'die Erfahrung',           en:'experience', el:'η εμπειρία' } },
        { z:'la mesera',        na:{ de:'die Kellnerin (Lateinamerika)', en:'the waitress (Latin America)', el:'η σερβιτόρα (Λατινική Αμερική)' } },
        { z:'la carta',         na:{ de:'die Speisekarte',         en:'the menu', el:'ο κατάλογος' } },
        { z:'el cordero patagónico', na:{ de:'das patagonische Lamm', en:'Patagonian lamb', el:'το αρνί της Παταγονίας' } },
        { z:'el turno',         na:{ de:'die Schicht',             en:'the shift', el:'η βάρδια' } },
        { z:'el sueldo',        na:{ de:'der Lohn',                en:'the wage', el:'ο μισθός' } },
        { z:'la propina',       na:{ de:'das Trinkgeld',           en:'the tip', el:'το φιλοδώρημα' } },
        { z:'llevo seis meses viajando', na:{ de:'ich reise seit sechs Monaten', en:'I have been travelling for six months', el:'ταξιδεύω εδώ και έξι μήνες' } },
        { z:'¿ha trabajado alguna vez …?', na:{ de:'haben Sie schon einmal … gearbeitet?', en:'have you ever worked …?', el:'έχετε δουλέψει ποτέ …;' } }
      ],
      dialog: {
        rolle: { de:'Doña Inés, die Restaurantbesitzerin', en:'Doña Inés, the restaurant owner', el:'Η δόνια Ινές, η ιδιοκτήτρια του εστιατορίου' },
        zeilen: [
          { wer:'spikiu', z:'Buenas tardes, Lotte. Siéntese, por favor. Cuénteme, ¿qué la trae a El Calafate?', na:{ de:'Guten Tag, Lotte. Setzen Sie sich bitte. Erzählen Sie, was führt Sie nach El Calafate?', en:'Good afternoon, Lotte. Please sit down. Tell me, what brings you to El Calafate?', el:'Καλησπέρα, Λότε. Καθίστε, παρακαλώ. Πείτε μου, τι σας φέρνει στο Ελ Καλαφάτε;' } },
          { wer:'lerner', z:'Llevo seis meses viajando por Latinoamérica y saco fotos para un libro.', na:{ de:'Ich reise seit sechs Monaten durch Lateinamerika und mache Fotos für ein Buch.', en:'I have been travelling around Latin America for six months, taking photos for a book.', el:'Ταξιδεύω εδώ και έξι μήνες στη Λατινική Αμερική και βγάζω φωτογραφίες για ένα βιβλίο.' } },
          { wer:'spikiu', z:'Qué interesante. ¿Y ha trabajado alguna vez en un restaurante?', na:{ de:'Wie interessant. Und haben Sie schon einmal in einem Restaurant gearbeitet?', en:'How interesting. And have you ever worked in a restaurant?', el:'Τι ενδιαφέρον. Και έχετε δουλέψει ποτέ σε εστιατόριο;' } },
          { wer:'lerner', z:'Sí, he trabajado dos veranos de mesera en un café de Utrecht.', na:{ de:'Ja, ich habe zwei Sommer lang als Kellnerin in einem Café in Utrecht gearbeitet.', en:'Yes, I have worked two summers as a waitress in a café in Utrecht.', el:'Ναι, έχω δουλέψει δύο καλοκαίρια σερβιτόρα σε ένα καφέ στην Ουτρέχτη.' } },
          { wer:'spikiu', z:'Perfecto. Necesito a alguien hasta el fin de la temporada. ¿Podría además fotografiar los platos para la carta?', na:{ de:'Perfekt. Ich brauche jemanden bis zum Ende der Saison. Könnten Sie außerdem die Gerichte für die Speisekarte fotografieren?', en:'Perfect. I need someone until the end of the season. Could you also photograph the dishes for the menu?', el:'Τέλεια. Χρειάζομαι κάποιον ως το τέλος της σεζόν. Θα μπορούσατε επίσης να φωτογραφίσετε τα πιάτα για τον κατάλογο;' } },
          { wer:'lerner', z:'Con gusto. Puedo empezar mañana, si le parece bien.', na:{ de:'Sehr gern. Ich kann morgen anfangen, wenn es Ihnen recht ist.', en:'With pleasure. I can start tomorrow, if that suits you.', el:'Με χαρά. Μπορώ να ξεκινήσω αύριο, αν σας βολεύει.' } }
        ]
      },
      lesetext: {
        z:'SE BUSCA mesero o mesera hasta el fin de temporada. Pedimos experiencia en atención al público y buen humor. Turno de noche, de seis a doce, con comida incluida. Preguntar por Doña Inés.',
        na:{ de:'GESUCHT: Kellner oder Kellnerin bis zum Saisonende. Wir erwarten Erfahrung im Kundenkontakt und gute Laune. Abendschicht, von sechs bis zwölf, Essen inklusive. Fragen Sie nach Doña Inés.',
             en:'WANTED: waiter or waitress until the end of the season. We ask for experience with customers and a good sense of humour. Evening shift, six to twelve, meals included. Ask for Doña Inés.',
             el:'ΖΗΤΕΙΤΑΙ σερβιτόρος ή σερβιτόρα ως το τέλος της σεζόν. Ζητάμε εμπειρία στην εξυπηρέτηση πελατών και καλή διάθεση. Βραδινή βάρδια, από τις έξι ως τις δώδεκα, με φαγητό. Ρωτήστε για τη δόνια Ινές.' },
        frage:{ de:'Wann ist die Schicht?', en:'When is the shift?', el:'Πότε είναι η βάρδια;' },
        optionen:[
          { na:{ de:'Morgens, von sechs bis zwölf', en:'In the morning, six to twelve', el:'Το πρωί, από τις έξι ως τις δώδεκα' }, richtig:false },
          { na:{ de:'Abends, von sechs bis zwölf',  en:'In the evening, six to twelve', el:'Το βράδυ, από τις έξι ως τις δώδεκα' }, richtig:true  },
          { na:{ de:'Den ganzen Tag',               en:'All day', el:'Όλη μέρα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Stell dich kurz vor: Seit wann machst du etwas, und wo hast du schon gearbeitet? Zwei Sätze.',
                  en:'Introduce yourself briefly: how long have you been doing something, and where have you worked? Two sentences.', el:'Σύστησε τον εαυτό σου σύντομα: από πότε κάνεις κάτι και πού έχεις δουλέψει; Δύο προτάσεις.' },
        muster:'Llevo dos años estudiando español. He trabajado en una librería y en un hotel.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Llevo seis meses viajando" heißt „ich reise seit sechs Monaten": llevar + Zeitraum + Gerundium, für etwas, das noch andauert. Für Lebenserfahrung nimmt man das Perfekt: ¿Ha trabajado alguna vez …? — He trabajado … Für „heute" sagt man in Lateinamerika aber lieber „hoy llegué" statt „hoy he llegado".',
               en:'"Llevo seis meses viajando" means "I have been travelling for six months": llevar + time span + gerund, for something still going on. For life experience use the perfect: ¿Ha trabajado alguna vez …? — He trabajado … But for "today", Latin Americans prefer "hoy llegué" to "hoy he llegado".',
               el:'Το «llevo seis meses viajando» σημαίνει «ταξιδεύω εδώ και έξι μήνες»: llevar + χρονικό διάστημα + γερούνδιο, για κάτι που συνεχίζεται. Για εμπειρίες ζωής χρησιμοποιείς τον παρακείμενο: ¿Ha trabajado alguna vez …? — He trabajado … Για το «σήμερα» όμως στη Λατινική Αμερική προτιμούν το «hoy llegué» από το «hoy he llegado».' },
        beispiele:[
          { z:'Llevo seis meses viajando.', na:{ de:'Ich reise seit sechs Monaten.', en:'I have been travelling for six months.', el:'Ταξιδεύω εδώ και έξι μήνες.' } },
          { z:'He trabajado en un café.',   na:{ de:'Ich habe in einem Café gearbeitet.', en:'I have worked in a café.', el:'Έχω δουλέψει σε ένα καφέ.' } }
        ]
      },
      kultur: { de:'El Calafate trägt den Namen eines Dornbuschs mit blauen Beeren. Die Legende sagt: Wer Calafate-Beeren isst, kommt nach Patagonien zurück. Ganz in der Nähe stürzen vom Perito-Moreno-Gletscher Eisblöcke donnernd in den Lago Argentino.',
                en:'El Calafate is named after a thorny bush with blue berries. Legend says whoever eats calafate berries will come back to Patagonia. Nearby, blocks of ice crash thundering from the Perito Moreno glacier into Lago Argentino.',
                el:'Το Ελ Καλαφάτε πήρε το όνομά του από έναν αγκαθωτό θάμνο με μπλε μούρα. Ο θρύλος λέει ότι όποιος φάει μούρα καλαφάτε θα ξαναγυρίσει στην Παταγονία. Κοντά, κομμάτια πάγου από τον παγετώνα Περίτο Μορένο πέφτουν με βρόντο στη λίμνη Αρχεντίνο.' }
    },

    /* ── B1 · Nach dem Weg fragen · Canaima, Ramón (Jun–Jul) ────────────── */
    'b1.wegbeschreibung': {
      duzen: true,
      deineRolle: { de:'Du bist Lotte und reist in einer kleinen Gruppe. Morgen geht es zum Salto Ángel. Du gibst weiter, was der Guide sagt.', es:'Eres Lotte y viajas en un grupo pequeño. Mañana van al Salto Ángel. Les cuentas a los demás lo que dice el guía.', en:'You are Lotte, travelling in a small group. Tomorrow you are going to Angel Falls. You pass on what the guide says.', el:'Είσαι η Λότε και ταξιδεύεις με μια μικρή ομάδα. Αύριο πηγαίνετε στον καταρράκτη Σάλτο Άνχελ. Μεταφέρεις στους άλλους ό,τι λέει ο οδηγός.' },
      abrundung: { z:'¡Chévere! Y diles que guarden las cámaras en bolsas secas: ¡el salto moja de lejos!', na:{ de:'Klasse! Und sag ihnen, sie sollen die Kameras in trockene Beutel packen: Der Wasserfall macht schon von Weitem nass!', en:'Great! And tell them to keep their cameras in dry bags: the falls soak you from far away!', el:'Τέλεια! Και πες τους να βάλουν τις μηχανές σε στεγανές σακούλες: ο καταρράκτης σε βρέχει από μακριά!' } },
      rollen: {
        spikiu: { de:'Ramón, der Pemón-Guide', es:'Ramón, el guía pemón', en:'Ramón, the Pemón guide', el:'ο Ραμόν, ο οδηγός Πεμόν' },
        lerner: { de:'Lotte, aus der Reisegruppe', es:'Lotte, del grupo de viaje', en:'Lotte, from the travel group', el:'η Λότε, από την ομάδα' },
        ort:    { de:'am Ufer der Lagune von Canaima', es:'a orillas de la laguna de Canaima', en:'on the shore of Canaima lagoon', el:'στην όχθη της λίμνης της Καναΐμα' }
      },
      wortschatz: [
        { z:'la curiara',       na:{ de:'der Einbaum',             en:'the dugout canoe', el:'η κουριάρα (μονόξυλο)' } },
        { z:'el tepuy',         na:{ de:'der Tafelberg',           en:'the table mountain', el:'το τεπούι (επίπεδο βουνό)' } },
        { z:'el salto',         na:{ de:'der Wasserfall',          en:'the waterfall', el:'ο καταρράκτης' } },
        { z:'el mirador',       na:{ de:'der Aussichtspunkt',      en:'the viewpoint', el:'το σημείο θέας' } },
        { z:'la selva',         na:{ de:'der Regenwald',           en:'the rainforest', el:'η ζούγκλα' } },
        { z:'río arriba',       na:{ de:'flussaufwärts',           en:'upriver', el:'αντίθετα στο ρεύμα' } },
        { z:'el chaleco salvavidas', na:{ de:'die Schwimmweste',   en:'the life jacket', el:'το σωσίβιο' } },
        { z:'la temporada de lluvias', na:{ de:'die Regenzeit',    en:'the rainy season', el:'η εποχή των βροχών' } },
        { z:'el impermeable',   na:{ de:'die Regenjacke',          en:'the raincoat', el:'το αδιάβροχο' } },
        { z:'¡chévere!',        na:{ de:'klasse!',                 en:'great!', el:'τέλεια!' } },
        { z:'dice que …',       na:{ de:'er/sie sagt, dass …',     en:'he/she says that …', el:'λέει ότι …' } },
        { z:'me dijo que …',    na:{ de:'er/sie hat mir gesagt, dass …', en:'he/she told me that …', el:'μου είπε ότι …' } }
      ],
      dialog: {
        rolle: { de:'Ramón, der Pemón-Guide', en:'Ramón, the Pemón guide', el:'Ο Ραμόν, ο οδηγός από τον λαό Πεμόν' },
        zeilen: [
          { wer:'spikiu', z:'¡Bienvenida a Canaima! Soy Ramón. Mañana vamos al Kerepakupai Merú, el Salto Ángel.', na:{ de:'Willkommen in Canaima! Ich bin Ramón. Morgen fahren wir zum Kerepakupai Merú, dem Salto Ángel.', en:'Welcome to Canaima! I am Ramón. Tomorrow we are going to Kerepakupai Merú, Angel Falls.', el:'Καλώς ήρθες στην Καναΐμα! Είμαι ο Ραμόν. Αύριο πάμε στο Κερεπακουπάι Μερού, τον καταρράκτη Άνχελ.' } },
          { wer:'lerner', z:'¡Qué emoción! ¿Y cómo se llega al mirador?', na:{ de:'Wie aufregend! Und wie kommt man zum Aussichtspunkt?', en:'How exciting! And how do you get to the viewpoint?', el:'Τι ωραία, ανυπομονώ! Και πώς πάει κανείς στο σημείο θέας;' } },
          { wer:'spikiu', z:'Primero subimos el río en curiara, unas cuatro horas. Después caminamos una hora por la selva.', na:{ de:'Zuerst fahren wir im Einbaum den Fluss hinauf, etwa vier Stunden. Dann laufen wir eine Stunde durch den Regenwald.', en:'First we go up the river by dugout canoe, about four hours. Then we walk for an hour through the forest.', el:'Πρώτα ανεβαίνουμε το ποτάμι με κουριάρα, κάπου τέσσερις ώρες. Μετά περπατάμε μία ώρα μέσα στη ζούγκλα.' } },
          { wer:'lerner', z:'O sea, dices que primero vamos en curiara y luego caminamos una hora.', na:{ de:'Du sagst also, dass wir zuerst mit dem Einbaum fahren und dann eine Stunde laufen.', en:'So you are saying we go by canoe first and then walk for an hour.', el:'Δηλαδή λες ότι πρώτα πάμε με την κουριάρα και μετά περπατάμε μία ώρα.' } },
          { wer:'spikiu', z:'Exacto. Pero el río viene muy fuerte y tardamos más: salimos a las cinco, no a las ocho.', na:{ de:'Genau. Aber der Fluss ist sehr stark, wir brauchen länger: Wir fahren um fünf los, nicht um acht.', en:'Exactly. But the river is running very strong and it takes longer: we leave at five, not at eight.', el:'Ακριβώς. Αλλά το ποτάμι κατεβαίνει πολύ δυνατό και θα αργήσουμε περισσότερο: φεύγουμε στις πέντε, όχι στις οχτώ.' } },
          { wer:'lerner', z:'Entendido. Les digo a los demás que salimos a las cinco.', na:{ de:'Verstanden. Ich sage den anderen, dass wir um fünf losfahren.', en:'Got it. I will tell the others we leave at five.', el:'Κατάλαβα. Θα πω στους άλλους ότι φεύγουμε στις πέντε.' } }
        ]
      },
      lesetext: {
        z:'Ramón nos dijo que el salto se llama Kerepakupai Merú en lengua pemón. Salimos a las cinco y subimos el río cuatro horas en curiara. En el mirador nadie hablaba: el agua caía desde casi mil metros. Palabra del lugar: tepuy.',
        na:{ de:'Ramón sagte uns, dass der Wasserfall in der Sprache der Pemón Kerepakupai Merú heißt. Wir fuhren um fünf los und fuhren vier Stunden im Einbaum den Fluss hinauf. Am Aussichtspunkt sprach niemand: Das Wasser fiel aus fast tausend Metern herab. Wort des Ortes: tepuy.',
             en:'Ramón told us that the falls are called Kerepakupai Merú in the Pemón language. We left at five and went up the river for four hours by canoe. At the viewpoint nobody spoke: the water fell from almost a thousand metres. Word of the place: tepuy.',
             el:'Ο Ραμόν μάς είπε ότι ο καταρράκτης λέγεται Κερεπακουπάι Μερού στη γλώσσα των Πεμόν. Φύγαμε στις πέντε και ανεβήκαμε το ποτάμι τέσσερις ώρες με κουριάρα. Στο σημείο θέας κανείς δεν μιλούσε: το νερό έπεφτε από σχεδόν χίλια μέτρα. Λέξη του τόπου: tepuy.' },
        frage:{ de:'Wie lange fuhren sie mit dem Einbaum?', en:'How long were they in the canoe?', el:'Πόση ώρα ταξίδεψαν με την κουριάρα;' },
        optionen:[
          { na:{ de:'Eine Stunde',     en:'One hour', el:'Μία ώρα' }, richtig:false },
          { na:{ de:'Vier Stunden',    en:'Four hours', el:'Τέσσερις ώρες' }, richtig:true  },
          { na:{ de:'Den ganzen Tag',  en:'All day', el:'Όλη μέρα' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle jemandem, was dir ein Guide oder eine Freundin gesagt hat — mit „me dijo que" und „dice que". Zwei Sätze.',
                  en:'Tell someone what a guide or a friend told you — with "me dijo que" and "dice que". Two sentences.', el:'Πες σε κάποιον τι σου είπε ένας οδηγός ή μια φίλη — με «me dijo que» και «dice que». Δύο προτάσεις.' },
        muster:'Ramón me dijo que el río está muy fuerte. Dice que salimos a las cinco.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Weitergeben, was jemand sagt: „dice que" + dieselbe Zeit: Ramón dice que salimos a las cinco. Bitten an mehrere Leute gehen an ustedes: guarden, pónganse. In Spanien hast du vosotros gelernt (guardad); in Lateinamerika sagt man ustedes — zu Fremden wie zu Freunden.',
               en:'Passing on what someone says: "dice que" + the same tense: Ramón dice que salimos a las cinco. Requests to several people go to ustedes: guarden, pónganse. In Spain you learnt vosotros (guardad); in Latin America people say ustedes — to strangers and friends alike.',
               el:'Μεταφέρεις τι λέει κάποιος: «dice que» + ίδιος χρόνος: Ramón dice que salimos a las cinco. Τα αιτήματα σε πολλούς πάνε στο ustedes: guarden, pónganse. Στην Ισπανία έμαθες το vosotros (guardad)· στη Λατινική Αμερική λένε ustedes — σε αγνώστους και σε φίλους.' },
        beispiele:[
          { z:'Ramón dice que salimos a las cinco.', na:{ de:'Ramón sagt, dass wir um fünf losfahren.', en:'Ramón says we leave at five.', el:'Ο Ραμόν λέει ότι φεύγουμε στις πέντε.' } },
          { z:'Pónganse el chaleco, por favor.',     na:{ de:'Zieht bitte die Schwimmweste an.', en:'Put on your life jackets, please.', el:'Φορέστε το σωσίβιο, παρακαλώ.' } }
        ]
      },
      kultur: { de:'Der Salto Ángel ist mit fast 1.000 Metern der höchste Wasserfall der Welt; er stürzt vom Auyán-Tepui. Die Pemón nennen ihn Kerepakupai Merú. Erst in der Regenzeit führt der Fluss genug Wasser für die Fahrt im Einbaum.',
                en:'At almost 1,000 metres, Angel Falls is the highest waterfall in the world; it drops from Auyán-tepui. The Pemón call it Kerepakupai Merú. Only in the rainy season does the river carry enough water for the canoe trip.',
                el:'Με σχεδόν 1.000 μέτρα, ο Σάλτο Άνχελ είναι ο ψηλότερος καταρράκτης του κόσμου· πέφτει από το Αουγιάν-τεπούι. Οι Πεμόν τον λένε Κερεπακουπάι Μερού. Μόνο την εποχή των βροχών το ποτάμι έχει αρκετό νερό για το ταξίδι με την κουριάρα.' }
    }
  }
};


  /* ══════════════════════════════════════════════════════════════════
     B2 · BLÜTE · „SAL" (Leo, 20.10.2026: „Andere Figur als Lotte und andere
     Stationen. Dale!") — die Unterstufe der Krone: die Krone blüht.
     Aleksi Virtanen, 37, Koch aus Helsinki, arbeitet ein Jahr in spanischen
     Küchen für sein Restaurant und sein Kochbuch «Sal». Spanien, Formen aus
     Spanien (vosotros, piso, móvil), Lanzarote mit kanarischer Farbe, keine
     Politik. Dieselben zehn Themen, B2-Handlungen, je 16 Wörter (Wendungen
     und Satzrahmen zählen mit). Gags: „¿cuánta sal, exactamente?" → „a ojo";
     „En Finlandia diríamos simplemente que no"; Lesetext endet mit
     „Para mi cuaderno: …".
     ══════════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════════
     B2 · BLÜTE · A-Gruppe (Leo, 20.10.2026)
     Aleksi Virtanen, 37, Koch aus Helsinki, ein Jahr in spanischen Küchen
     für sein Kochbuch «Sal». Spanien-Spanisch (vosotros, piso, móvil).
     restaurant San Sebastián · hotel Gros · familie Cambados ·
     cafe Salamanca · bahnhof Madrid-Atocha
     ══════════════════════════════════════════════════════════════════ */
var B2_LP_A = {

  schritt: {
    restaurant: { de:'San Sebastián: Kritik annehmen und verteidigen', en:'San Sebastián: taking criticism and defending your idea', el:'Σαν Σεμπαστιάν: δέχεσαι την κριτική και υπερασπίζεσαι την ιδέα σου' },
    hotel:      { de:'San Sebastián: die Kaution zurückfordern',      en:'San Sebastián: getting your deposit back', el:'Σαν Σεμπαστιάν: ζητάς πίσω την εγγύηση' },
    familie:    { de:'Galicien: was die Oma getan hätte',              en:'Galicia: what grandma would have done', el:'Γαλικία: τι θα είχε κάνει η γιαγιά' },
    cafe:       { de:'Salamanca: fein abgestuft widersprechen',        en:'Salamanca: disagreeing with nuance', el:'Σαλαμάνκα: διαφωνείς με λεπτές αποχρώσεις' },
    bahnhof:    { de:'Madrid: Zug fällt aus, Rechte einfordern',       en:'Madrid: train cancelled, claiming your rights', el:'Μαδρίτη: το τρένο ακυρώνεται, διεκδικείς τα δικαιώματά σου' }
  },

  aufgaben: {
    'b2.restaurant': [
      { de:'Gib ihm recht, dass Salz fehlt, aber erkläre, dass du den Geschmack des Kabeljaus hervorheben wolltest', es:'Dale la razón en que le falta sal, pero explica que lo que querías era que se notara el sabor del bacalao', en:'Agree that it needs salt, but explain that you wanted the flavour of the cod to come through', el:'Δώσ’ του δίκιο ότι λείπει αλάτι, αλλά εξήγησε ότι ήθελες να φαίνεται η γεύση του μπακαλιάρου' },
      { de:'Biete an, es noch einmal zu versuchen, und frag, wie viel Salz er genau nehmen würde', es:'Ofrécete a intentarlo otra vez y pregunta cuánta sal le pondría él exactamente', en:'Offer to try again and ask exactly how much salt he would use', el:'Προσφέρσου να το ξαναδοκιμάσεις και ρώτα πόσο αλάτι ακριβώς θα έβαζε εκείνος' },
      { de:'Sag, dass du sofort nachwürzt und, auch wenn es dir schwerfällt, bei jedem Schritt abschmeckst', es:'Di que lo rectificas ahora mismo y que, aunque te cueste, lo probarás en cada paso', en:'Say you will adjust the seasoning right away and, even if it is hard for you, taste at every step', el:'Πες ότι το διορθώνεις αμέσως και ότι, όσο κι αν σου κοστίζει, θα το δοκιμάζεις σε κάθε βήμα' }
    ],
    'b2.hotel': [
      { de:'Widersprich höflich: Die Flecken waren schon beim Einzug da, laut Inventarliste von Anfang an', es:'Contesta con educación que las manchas ya estaban cuando entraste y que, según el inventario, estaban desde el primer día', en:'Politely object: the stains were already there when you moved in, according to the inventory from day one', el:'Αντίκρουσε ευγενικά: οι λεκέδες υπήρχαν ήδη όταν μπήκες, σύμφωνα με την απογραφή από την πρώτη μέρα' },
      { de:'Sag, dass sie soweit du weißt nicht gewachsen sind, und zeig die datierten Fotos von der Schlüsselübergabe', es:'Di que, que tú sepas, no han crecido y enseña las fotos con fecha de la entrega de llaves', en:'Say that as far as you know they have not grown, and show the dated photos from the key handover', el:'Πες ότι, απ’ όσο ξέρεις, δεν έχουν μεγαλώσει, και δείξε τις φωτογραφίες με ημερομηνία από την παράδοση των κλειδιών' },
      { de:'Sag, dass du froh bist, dass ihr euch einig seid, und bitte sie, dir die ganze Kaution zu überweisen', es:'Di que te alegras de que lo veáis igual y pide que te devuelva la fianza entera por transferencia', en:'Say you are glad you see it the same way and ask her to return the full deposit by bank transfer', el:'Πες ότι χαίρεσαι που το βλέπετε το ίδιο και ζήτα να σου επιστρέψει ολόκληρη την εγγύηση με έμβασμα' }
    ],
    'b2.familie': [
      { de:'Bejahe und sag: Hätte deine Oma diese Empanada probiert, hätte sie sofort nach dem Rezept gefragt', es:'Di que sí y que, si tu abuela hubiera probado esta empanada, habría pedido la receta en el acto', en:'Say yes, and that if your grandmother had tasted this empanada, she would have asked for the recipe on the spot', el:'Πες ναι και ότι, αν η γιαγιά σου είχε δοκιμάσει αυτή την εμπανάδα, θα είχε ζητήσει τη συνταγή επιτόπου' },
      { de:'Erzähl, dass deine Oma genauso war: Sie hat dir erzählt, dass sie im Winter Roggenbrot backte und niemanden in die Küche ließ', es:'Cuenta que tu abuela era igual: te contó que en invierno hacía pan de centeno y no dejaba entrar a nadie en la cocina', en:'Say your grandmother was just the same: she told you she baked rye bread in winter and let nobody into the kitchen', el:'Διηγήσου ότι η γιαγιά σου ήταν ίδια: σου είπε ότι τον χειμώνα έψηνε ψωμί σίκαλης και δεν άφηνε κανέναν να μπει στην κουζίνα' },
      { de:'Nimm die Einladung an und sag, du wünschtest, deine Oma hätte hier sein können — sie hätte sich gut mit Pilar verstanden', es:'Acepta y di que ojalá tu abuela hubiera podido estar aquí, que se habría llevado muy bien con Pilar', en:'Accept and say you wish your grandmother could have been here; she would have got on very well with Pilar', el:'Δέξου και πες ότι μακάρι η γιαγιά σου να μπορούσε να είναι εδώ· θα τα πήγαινε πολύ καλά με την Πιλάρ' }
    ],
    'b2.cafe': [
      { de:'Widersprich fein: Nicht dass du Tradition nicht magst, aber man muss sie auch erneuern — sonst landet ein Rezept im Museum', es:'Matiza: no es que no te guste la tradición, sino que hay que renovarla; si no, una receta acaba en un museo', en:'Disagree gently: it is not that you dislike tradition, but it also needs renewing, or a recipe ends up in a museum', el:'Διαφώνησε διακριτικά: δεν είναι ότι δεν σου αρέσει η παράδοση, αλλά ότι πρέπει να ανανεώνεται· αλλιώς μια συνταγή καταλήγει σε μουσείο' },
      { de:'Sag: So viel du in der Küche auch experimentierst, einen Cocido würdest du nie in Schaum verwandeln', es:'Di que, por mucho que experimentes en la cocina, nunca convertirías un cocido en espuma', en:'Say that however much you experiment in the kitchen, you would never turn a cocido into foam', el:'Πες ότι, όσο κι αν πειραματίζεσαι στην κουζίνα, ποτέ δεν θα έκανες ένα κοσίδο αφρό' },
      { de:'Stimm nur bis zu einem gewissen Punkt zu und sag mit finnischer Direktheit: Es kommt aufs Gericht an', es:'Di que solo hasta cierto punto y, con franqueza finlandesa, que depende del plato', en:'Agree only up to a point and say, with Finnish directness, that it depends on the dish', el:'Συμφώνησε μόνο ως έναν βαθμό και πες, με φινλανδική ειλικρίνεια, ότι εξαρτάται από το πιάτο' }
    ],
    'b2.bahnhof': [
      { de:'Grüß und sag, dass du ein Ticket für den AVE um zehn nach Granada hattest, die Anzeige aber sagt, er sei gestrichen', es:'Saluda y di que tenías billete para el AVE de las diez a Granada, pero que en el panel pone que ha sido cancelado', en:'Say hello and explain you had a ticket for the ten o’clock AVE to Granada, but the board says it has been cancelled', el:'Χαιρέτησε και πες ότι είχες εισιτήριο για το AVE των δέκα για Γρανάδα, αλλά ο πίνακας λέει ότι ακυρώθηκε' },
      { de:'Nimm den späteren Zug an und frag, ob du ein Recht auf Entschädigung hättest', es:'Acepta el tren más tarde y pregunta si tendrías derecho a alguna indemnización', en:'Accept the later train and ask whether you would be entitled to any compensation', el:'Δέξου το επόμενο τρένο και ρώτα αν θα δικαιούσουν κάποια αποζημίωση' },
      { de:'Bedank dich und sag, dass du trotzdem eine Beschwerde einreichen möchtest, in der steht, dass man euch nicht vorher informiert hat', es:'Da las gracias y di que aun así quisieras poner una reclamación y que constara que no os avisaron con antelación', en:'Thank her and say you would still like to file a complaint stating that you were not told in advance', el:'Ευχαρίστησε και πες ότι παρ’ όλα αυτά θα ήθελες να κάνεις παράπονο και να καταγραφεί ότι δεν σας ειδοποίησαν εκ των προτέρων' }
    ]
  },

  stationen: {

    /* ── B2 · San Sebastián — Probetag in der Küche (Sep) ───────────── */
    'b2.restaurant': {
      duzen: true,
      deineRolle: { de:'Du bist Aleksi, Koch aus Helsinki, und hast deinen Probetag in einem Restaurant der Parte Vieja. Dein Kabeljau ist absichtlich mild gesalzen: Du wolltest, dass man den Fisch schmeckt.', es:'Eres Aleksi, cocinero de Helsinki, y tienes tu día de prueba en un restaurante de la Parte Vieja. Tu bacalao lleva poca sal a propósito: querías que se notara el pescado.', en:'You are Aleksi, a chef from Helsinki, on your trial day in a restaurant in the Old Town. Your cod is lightly salted on purpose: you wanted the fish to come through.', el:'Είσαι ο Αλέξι, μάγειρας από το Ελσίνκι, και έχεις τη δοκιμαστική σου μέρα σε ένα εστιατόριο της Παλιάς Πόλης. Ο μπακαλιάρος σου έχει λίγο αλάτι επίτηδες: ήθελες να φαίνεται η γεύση του ψαριού.' },
      abrundung: { z:'Así me gusta. Si sale bien, mañana empiezas en la partida de pescado.', na:{ de:'So gefällt mir das. Wenn es gut wird, fängst du morgen am Fischposten an.', en:'That’s what I like to hear. If it turns out well, you start on the fish station tomorrow.', el:'Έτσι μπράβο. Αν βγει καλό, αύριο ξεκινάς στο πόστο των ψαριών.' } },
      rollen: {
        spikiu: { de:'der Küchenchef, Iñaki Arregi', es:'el jefe de cocina, Iñaki Arregi', en:'the head chef, Iñaki Arregi', el:'ο σεφ, ο Ινιάκι Αρέγκι' },
        lerner: { de:'Aleksi, der Koch auf Probe', es:'Aleksi, el cocinero a prueba', en:'Aleksi, the chef on trial', el:'ο Αλέξι, ο μάγειρας σε δοκιμή' },
        ort:    { de:'in einer Restaurantküche der Parte Vieja, San Sebastián', es:'en la cocina de un restaurante de la Parte Vieja, San Sebastián', en:'in a restaurant kitchen in the Old Town, San Sebastián', el:'στην κουζίνα ενός εστιατορίου στην Παλιά Πόλη του Σαν Σεμπαστιάν' }
      },
      wortschatz: [
        { z:'el día de prueba',         na:{ de:'der Probetag',                 en:'the trial day', el:'η δοκιμαστική μέρα' } },
        { z:'la brigada',               na:{ de:'die Küchenmannschaft',         en:'the kitchen brigade', el:'η ομάδα της κουζίνας' } },
        { z:'la partida',               na:{ de:'der Posten (in der Küche)',    en:'the station (in a kitchen)', el:'το πόστο (στην κουζίνα)' } },
        { z:'el emplatado',             na:{ de:'das Anrichten auf dem Teller', en:'the plating', el:'το σερβίρισμα στο πιάτο' } },
        { z:'el punto de sal',          na:{ de:'die richtige Salzmenge',       en:'the right amount of salt', el:'το σωστό αλάτι' } },
        { z:'el bacalao',               na:{ de:'der Kabeljau',                 en:'the cod', el:'ο μπακαλιάρος' } },
        { z:'el comensal',              na:{ de:'der Gast am Tisch',            en:'the diner', el:'ο θαμώνας, ο πελάτης στο τραπέζι' } },
        { z:'sazonar',                  na:{ de:'würzen',                       en:'to season', el:'καρυκεύω' } },
        { z:'rectificar (de sal)',      na:{ de:'(mit Salz) nachwürzen',        en:'to adjust (the salt)', el:'διορθώνω (το αλάτι)' } },
        { z:'volver a intentarlo',      na:{ de:'es noch einmal versuchen',     en:'to try again', el:'το ξαναδοκιμάζω' } },
        { z:'estar soso',               na:{ de:'fade sein',                    en:'to be bland', el:'είναι άνοστο' } },
        { z:'a ojo',                    na:{ de:'nach Gefühl, über den Daumen', en:'by eye, roughly', el:'με το μάτι' } },
        { z:'aunque me cueste',         na:{ de:'auch wenn es mir schwerfällt', en:'even if it’s hard for me', el:'όσο κι αν μου κοστίζει' } },
        { z:'tienes razón en que …',    na:{ de:'du hast recht damit, dass …',  en:'you’re right that …', el:'έχεις δίκιο ότι …' } },
        { z:'lo que pretendía era …',   na:{ de:'was ich wollte, war …',        en:'what I was aiming for was …', el:'αυτό που ήθελα ήταν …' } },
        { z:'si me dejas, …',           na:{ de:'wenn du mich lässt, …',        en:'if you let me, …', el:'αν μου επιτρέψεις, …' } }
      ],
      dialog: {
        rolle: { de:'Der Küchenchef, Iñaki Arregi', en:'The head chef, Iñaki Arregi', el:'Ο σεφ, ο Ινιάκι Αρέγκι' },
        zeilen: [
          { wer:'spikiu', z:'A ver… el emplatado es precioso, Aleksi, pero esto está soso. ¿Precisamente tú, el de la sal?', na:{ de:'Mal sehen … das Anrichten ist wunderschön, Aleksi, aber das ist fade. Ausgerechnet du, der Salz-Mann?', en:'Let’s see… the plating is beautiful, Aleksi, but this is bland. You of all people, the salt man?', el:'Για να δούμε… το σερβίρισμα είναι υπέροχο, Αλέξι, αλλά αυτό είναι άνοστο. Εσύ, ο άνθρωπος του αλατιού;' } },
          { wer:'lerner', z:'Tienes razón en que le falta sal, pero lo que pretendía era que se notara el sabor del bacalao.', na:{ de:'Du hast recht damit, dass Salz fehlt, aber was ich wollte, war, dass man den Geschmack des Kabeljaus merkt.', en:'You’re right that it needs salt, but what I was aiming for was for the flavour of the cod to come through.', el:'Έχεις δίκιο ότι του λείπει αλάτι, αλλά αυτό που ήθελα ήταν να φαίνεται η γεύση του μπακαλιάρου.' } },
          { wer:'spikiu', z:'Te entiendo, pero aquí el comensal espera un plato con carácter. Y el bacalao aguanta mucho más de lo que crees.', na:{ de:'Ich verstehe dich, aber hier erwartet der Gast ein Gericht mit Charakter. Und der Kabeljau verträgt viel mehr, als du denkst.', en:'I understand, but here the diner expects a dish with character. And cod can take a lot more than you think.', el:'Σε καταλαβαίνω, αλλά εδώ ο πελάτης περιμένει ένα πιάτο με χαρακτήρα. Και ο μπακαλιάρος αντέχει πολύ περισσότερο απ’ όσο νομίζεις.' } },
          { wer:'lerner', z:'Si me dejas, lo vuelvo a intentar. Pero dime: ¿cuánta sal le pondrías tú, exactamente?', na:{ de:'Wenn du mich lässt, versuche ich es noch einmal. Aber sag mal: Wie viel Salz würdest du genau nehmen?', en:'If you let me, I’ll try again. But tell me: how much salt would you put in, exactly?', el:'Αν μου επιτρέψεις, θα το ξαναδοκιμάσω. Πες μου όμως: πόσο αλάτι θα έβαζες εσύ, ακριβώς;' } },
          { wer:'spikiu', z:'¿Exactamente? A ojo, Aleksi, a ojo. Hay que sazonar y probar mientras cocinas, no solo al final.', na:{ de:'Genau? Nach Gefühl, Aleksi, nach Gefühl. Man muss beim Kochen würzen und probieren, nicht erst am Ende.', en:'Exactly? By eye, Aleksi, by eye. You have to season and taste as you cook, not just at the end.', el:'Ακριβώς; Με το μάτι, Αλέξι, με το μάτι. Πρέπει να καρυκεύεις και να δοκιμάζεις όσο μαγειρεύεις, όχι μόνο στο τέλος.' } },
          { wer:'lerner', z:'Vale, lo rectifico ahora mismo. Aunque me cueste, buscaré el punto de sal probando en cada paso.', na:{ de:'Gut, ich würze sofort nach. Auch wenn es mir schwerfällt, suche ich die richtige Salzmenge und probiere bei jedem Schritt.', en:'OK, I’ll adjust it right now. Even if it’s hard for me, I’ll find the right amount of salt by tasting at every step.', el:'Εντάξει, το διορθώνω αμέσως. Όσο κι αν μου κοστίζει, θα βρω το σωστό αλάτι δοκιμάζοντας σε κάθε βήμα.' } }
        ]
      },
      lesetext: {
        z:'Primer día de prueba en la Parte Vieja. Toda la brigada probó mi bacalao y el veredicto fue claro: soso. Yo, que escribo un libro llamado «Sal». Iñaki no se rio; me explicó que aquí se sazona durante todo el proceso, no al final. Lo repetí y esta vez asintió. Para mi cuaderno: rectificar de sal.',
        na:{ de:'Erster Probetag in der Parte Vieja. Die ganze Küchenmannschaft hat meinen Kabeljau probiert, und das Urteil war klar: fade. Ich, der ein Buch namens «Sal» schreibt. Iñaki hat nicht gelacht; er hat mir erklärt, dass man hier während des ganzen Kochens würzt, nicht am Ende. Ich habe es wiederholt, und diesmal hat er genickt. Für mein Notizheft: rectificar de sal.',
             en:'First trial day in the Old Town. The whole brigade tasted my cod and the verdict was clear: bland. Me, writing a book called «Sal». Iñaki didn’t laugh; he explained that here you season throughout the whole process, not at the end. I made it again and this time he nodded. For my notebook: rectificar de sal.',
             el:'Πρώτη δοκιμαστική μέρα στην Παλιά Πόλη. Όλη η ομάδα της κουζίνας δοκίμασε τον μπακαλιάρο μου και η ετυμηγορία ήταν σαφής: άνοστος. Εγώ, που γράφω ένα βιβλίο με τίτλο «Sal». Ο Ινιάκι δεν γέλασε· μου εξήγησε ότι εδώ καρυκεύεις σε όλη τη διαδικασία, όχι στο τέλος. Το ξανάφτιαξα και αυτή τη φορά έγνεψε. Για το τετράδιό μου: rectificar de sal.' },
        frage:{ de:'Was hat Iñaki Aleksi erklärt?', en:'What did Iñaki explain to Aleksi?', el:'Τι εξήγησε ο Ινιάκι στον Αλέξι;' },
        optionen:[
          { na:{ de:'Dass man während des ganzen Kochens würzt', en:'That you season throughout the cooking', el:'Ότι καρυκεύεις σε όλη τη διάρκεια του μαγειρέματος' }, richtig:true  },
          { na:{ de:'Dass man nur am Ende salzt',               en:'That you only add salt at the end', el:'Ότι αλατίζεις μόνο στο τέλος' }, richtig:false },
          { na:{ de:'Dass Kabeljau kein Salz braucht',           en:'That cod needs no salt', el:'Ότι ο μπακαλιάρος δεν χρειάζεται αλάτι' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib einem Küchenchef: Gib ihm in einem Punkt recht, erklär, was du eigentlich wolltest, und bitte um einen zweiten Versuch. Zwei Sätze.',
                  en:'Write to a head chef: agree with him on one point, explain what you were really aiming for, and ask for a second attempt. Two sentences.',
                  el:'Γράψε σε έναν σεφ: δώσ’ του δίκιο σε ένα σημείο, εξήγησε τι ήθελες στην πραγματικότητα και ζήτα μια δεύτερη ευκαιρία. Δύο προτάσεις.' },
        muster:'Tienes razón en que está un poco soso, pero lo que pretendía era respetar el sabor del pescado. Si me dejas, lo vuelvo a intentar.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Mit „tienes razón en que …" gibst du einen Punkt zu, ohne alles aufzugeben. Danach kommt „pero lo que pretendía era …": So erklärst du, was du eigentlich wolltest. Und „si me dejas, lo vuelvo a intentar" klingt wie ein Versprechen — nach „si" steht hier ganz einfach die normale Form von heute.',
               en:'With "tienes razón en que …" you concede a point without giving everything up. Then comes "pero lo que pretendía era …": that is how you explain what you were really after. And "si me dejas, lo vuelvo a intentar" sounds like a promise — after "si" you simply use the ordinary present form.',
               el:'Με το «tienes razón en que …» παραδέχεσαι ένα σημείο χωρίς να τα παρατάς όλα. Μετά έρχεται το «pero lo que pretendía era …»: έτσι εξηγείς τι ήθελες στην πραγματικότητα. Και το «si me dejas, lo vuelvo a intentar» ακούγεται σαν υπόσχεση — μετά το «si» βάζεις απλώς τον συνηθισμένο τύπο του τώρα.' },
        beispiele:[
          { z:'Tienes razón en que le falta sal.',      na:{ de:'Du hast recht damit, dass Salz fehlt.', en:'You’re right that it needs salt.', el:'Έχεις δίκιο ότι του λείπει αλάτι.' } },
          { z:'Si me dejas, lo vuelvo a intentar.',     na:{ de:'Wenn du mich lässt, versuche ich es noch einmal.', en:'If you let me, I’ll try again.', el:'Αν μου επιτρέψεις, θα το ξαναδοκιμάσω.' } }
        ]
      },
      kultur:{ de:'San Sebastián (baskisch Donostia) hat, gemessen an der Einwohnerzahl, eine der höchsten Dichten an Michelin-Sternen der Welt. In den Bars der Parte Vieja isst man Pintxos — kleine Happen, die auf der Theke stehen oder frisch zubereitet werden.',
               en:'San Sebastián (Donostia in Basque) has, for its population, one of the highest concentrations of Michelin stars in the world. In the bars of the Old Town people eat pintxos — small bites laid out on the counter or made to order.',
               el:'Το Σαν Σεμπαστιάν (στα βασκικά Ντονόστια) έχει, σε σχέση με τον πληθυσμό του, μία από τις μεγαλύτερες συγκεντρώσεις αστεριών Michelin στον κόσμο. Στα μπαρ της Παλιάς Πόλης τρως πίντσος — μικρές μπουκιές πάνω στον πάγκο ή φρεσκοφτιαγμένες.' }
    },

    /* ── B2 · San Sebastián, Gros — die Kaution zurückfordern (Okt) ─── */
    'b2.hotel': {
      deineRolle: { de:'Du ziehst aus deiner Mietwohnung in Gros aus. Die Feuchtigkeitsflecken im Bad waren schon beim Einzug da: Sie stehen in der Inventarliste, und du hast datierte Fotos von der Schlüsselübergabe.', es:'Dejas tu piso de alquiler en Gros. Las manchas de humedad del baño ya estaban cuando entraste: aparecen en el inventario y tienes fotos con fecha de la entrega de llaves.', en:'You are moving out of your rented flat in Gros. The damp stains in the bathroom were already there when you moved in: they are in the inventory, and you have dated photos from the key handover.', el:'Φεύγεις από το νοικιασμένο διαμέρισμά σου στο Γκρος. Οι λεκέδες υγρασίας στο μπάνιο υπήρχαν ήδη όταν μπήκες: είναι γραμμένοι στην απογραφή και έχεις φωτογραφίες με ημερομηνία από την παράδοση των κλειδιών.' },
      abrundung: { z:'Claro que sí. Le hago la transferencia esta semana, y perdone el malentendido.', na:{ de:'Selbstverständlich. Ich überweise es Ihnen diese Woche, und entschuldigen Sie das Missverständnis.', en:'Of course. I’ll make the transfer this week, and I’m sorry for the misunderstanding.', el:'Βεβαίως. Σας κάνω το έμβασμα αυτή την εβδομάδα, και συγγνώμη για την παρεξήγηση.' } },
      rollen: {
        spikiu: { de:'die Hausverwalterin, Begoña Etxeberria', es:'la administradora, Begoña Etxeberria', en:'the property manager, Begoña Etxeberria', el:'η διαχειρίστρια, η Μπεγκόνια Ετσεβέρια' },
        lerner: { de:'Aleksi, der ausziehende Mieter', es:'Aleksi, el inquilino que se marcha', en:'Aleksi, the tenant moving out', el:'ο Αλέξι, ο ενοικιαστής που φεύγει' },
        ort:    { de:'in der leeren Wohnung in Gros, San Sebastián', es:'en el piso vacío de Gros, San Sebastián', en:'in the empty flat in Gros, San Sebastián', el:'στο άδειο διαμέρισμα στο Γκρος, στο Σαν Σεμπαστιάν' }
      },
      wortschatz: [
        { z:'la fianza',                na:{ de:'die Mietkaution',              en:'the (rental) deposit', el:'η εγγύηση ενοικίου' } },
        { z:'el inventario',            na:{ de:'die Inventarliste',            en:'the inventory', el:'η απογραφή' } },
        { z:'la mancha de humedad',     na:{ de:'der Feuchtigkeitsfleck',       en:'the damp stain', el:'ο λεκές υγρασίας' } },
        { z:'el desperfecto',           na:{ de:'der Schaden, der Mangel',      en:'the damage, the defect', el:'η ζημιά' } },
        { z:'la entrega de llaves',     na:{ de:'die Schlüsselübergabe',        en:'the key handover', el:'η παράδοση των κλειδιών' } },
        { z:'la transferencia',         na:{ de:'die Überweisung',              en:'the bank transfer', el:'το έμβασμα' } },
        { z:'el malentendido',          na:{ de:'das Missverständnis',          en:'the misunderstanding', el:'η παρεξήγηση' } },
        { z:'descontar',                na:{ de:'abziehen, einbehalten',        en:'to deduct', el:'αφαιρώ, κρατάω' } },
        { z:'hacerse cargo de',         na:{ de:'übernehmen, aufkommen für',    en:'to take care of, to cover', el:'αναλαμβάνω' } },
        { z:'reclamar',                 na:{ de:'einfordern, reklamieren',      en:'to claim, to complain', el:'διεκδικώ, κάνω παράπονο' } },
        { z:'salvo …',                  na:{ de:'außer …',                      en:'except …', el:'εκτός από …' } },
        { z:'dar por hecho',            na:{ de:'als selbstverständlich annehmen', en:'to take for granted', el:'το θεωρώ δεδομένο' } },
        { z:'puede que + subj.',        na:{ de:'es kann sein, dass …',         en:'it may be that …', el:'μπορεί να …' } },
        { z:'según el inventario',      na:{ de:'laut Inventarliste',           en:'according to the inventory', el:'σύμφωνα με την απογραφή' } },
        { z:'que yo sepa',              na:{ de:'soweit ich weiß',              en:'as far as I know', el:'απ’ όσο ξέρω' } },
        { z:'me gustaría que me devolviera …', na:{ de:'ich hätte gern, dass Sie mir … zurückgeben', en:'I’d like you to give me back …', el:'θα ήθελα να μου επιστρέψετε …' } }
      ],
      dialog: {
        rolle: { de:'Die Hausverwalterin, Begoña Etxeberria', en:'The property manager, Begoña Etxeberria', el:'Η διαχειρίστρια, η Μπεγκόνια Ετσεβέρια' },
        zeilen: [
          { wer:'spikiu', z:'Buenos días, Aleksi. He revisado el piso y está todo bien, salvo las manchas de humedad del baño. Ese desperfecto tendré que descontarlo de la fianza.', na:{ de:'Guten Morgen, Aleksi. Ich habe die Wohnung durchgesehen, und alles ist in Ordnung, außer den Feuchtigkeitsflecken im Bad. Diesen Schaden muss ich von der Kaution abziehen.', en:'Good morning, Aleksi. I’ve checked the flat and everything is fine, except the damp stains in the bathroom. I’ll have to deduct that damage from the deposit.', el:'Καλημέρα, Αλέξι. Έλεγξα το διαμέρισμα και όλα είναι εντάξει, εκτός από τους λεκέδες υγρασίας στο μπάνιο. Αυτή τη ζημιά θα πρέπει να την αφαιρέσω από την εγγύηση.' } },
          { wer:'lerner', z:'Perdone, pero esas manchas ya estaban cuando entré. Según el inventario, el baño tenía humedad desde el primer día.', na:{ de:'Entschuldigen Sie, aber diese Flecken waren schon da, als ich eingezogen bin. Laut Inventarliste hatte das Bad vom ersten Tag an Feuchtigkeit.', en:'Excuse me, but those stains were already there when I moved in. According to the inventory, the bathroom was damp from day one.', el:'Με συγχωρείτε, αλλά αυτοί οι λεκέδες υπήρχαν ήδη όταν μπήκα. Σύμφωνα με την απογραφή, το μπάνιο είχε υγρασία από την πρώτη μέρα.' } },
          { wer:'spikiu', z:'Pues yo había dado por hecho que eran nuevas. Puede que hayan crecido este otoño, con tanta lluvia.', na:{ de:'Also, ich war davon ausgegangen, dass sie neu sind. Vielleicht sind sie diesen Herbst gewachsen, bei so viel Regen.', en:'Well, I had taken it for granted that they were new. They may have grown this autumn, with all this rain.', el:'Εγώ είχα θεωρήσει δεδομένο ότι ήταν καινούργιοι. Μπορεί να μεγάλωσαν αυτό το φθινόπωρο, με τόση βροχή.' } },
          { wer:'lerner', z:'Que yo sepa, no han crecido nada. Aquí tiene las fotos de la entrega de llaves, con fecha.', na:{ de:'Soweit ich weiß, sind sie überhaupt nicht gewachsen. Hier sind die Fotos von der Schlüsselübergabe, mit Datum.', en:'As far as I know, they haven’t grown at all. Here are the photos from the key handover, with the date.', el:'Απ’ όσο ξέρω, δεν έχουν μεγαλώσει καθόλου. Ορίστε οι φωτογραφίες από την παράδοση των κλειδιών, με ημερομηνία.' } },
          { wer:'spikiu', z:'Vaya, es verdad, se ven igual. Entonces es un problema del edificio y se hace cargo la comunidad.', na:{ de:'Oh, das stimmt, sie sehen gleich aus. Dann ist es ein Problem des Gebäudes, und die Eigentümergemeinschaft kommt dafür auf.', en:'Well, that’s true, they look the same. Then it’s a problem with the building, and the residents’ association will cover it.', el:'Α, αλήθεια, φαίνονται ίδιοι. Τότε είναι πρόβλημα της πολυκατοικίας και το αναλαμβάνει η κοινότητα των ιδιοκτητών.' } },
          { wer:'lerner', z:'Me alegro de que lo veamos igual. Me gustaría que me devolviera la fianza entera, a ser posible por transferencia.', na:{ de:'Ich freue mich, dass wir es gleich sehen. Ich hätte gern, dass Sie mir die ganze Kaution zurückgeben, wenn möglich per Überweisung.', en:'I’m glad we see it the same way. I’d like you to return the full deposit, by bank transfer if possible.', el:'Χαίρομαι που το βλέπουμε το ίδιο. Θα ήθελα να μου επιστρέψετε ολόκληρη την εγγύηση, αν γίνεται με έμβασμα.' } }
        ]
      },
      lesetext: {
        z:'Hoy he entregado las llaves del piso de Gros. Begoña quería quedarse con parte de la fianza por unas manchas de humedad que ya estaban en septiembre. Menos mal que hice fotos el primer día. No tuve que reclamar mucho: las miró y me dio la razón. Para mi cuaderno: que yo sepa.',
        na:{ de:'Heute habe ich die Schlüssel der Wohnung in Gros abgegeben. Begoña wollte einen Teil der Kaution behalten, wegen ein paar Feuchtigkeitsflecken, die schon im September da waren. Zum Glück habe ich am ersten Tag Fotos gemacht. Ich musste nicht lange reklamieren: Sie hat sie angesehen und mir recht gegeben. Für mein Notizheft: que yo sepa.',
             en:'Today I handed back the keys to the flat in Gros. Begoña wanted to keep part of the deposit for some damp stains that were already there in September. Luckily I took photos on the first day. I didn’t have to argue much: she looked at them and agreed with me. For my notebook: que yo sepa.',
             el:'Σήμερα παρέδωσα τα κλειδιά του διαμερίσματος στο Γκρος. Η Μπεγκόνια ήθελε να κρατήσει μέρος της εγγύησης για κάποιους λεκέδες υγρασίας που υπήρχαν ήδη τον Σεπτέμβριο. Ευτυχώς έβγαλα φωτογραφίες την πρώτη μέρα. Δεν χρειάστηκε να διαμαρτυρηθώ πολύ: τις κοίταξε και μου έδωσε δίκιο. Για το τετράδιό μου: que yo sepa.' },
        frage:{ de:'Warum bekam Aleksi recht?', en:'Why was Aleksi proved right?', el:'Γιατί δικαιώθηκε ο Αλέξι;' },
        optionen:[
          { na:{ de:'Wegen seiner Fotos vom ersten Tag',       en:'Because of his photos from the first day', el:'Χάρη στις φωτογραφίες του από την πρώτη μέρα' }, richtig:true  },
          { na:{ de:'Weil Begoña sich an die Flecken erinnerte', en:'Because Begoña remembered the stains', el:'Επειδή η Μπεγκόνια θυμόταν τους λεκέδες' }, richtig:false },
          { na:{ de:'Weil es im Herbst nicht geregnet hat',     en:'Because it didn’t rain in the autumn', el:'Επειδή δεν έβρεξε το φθινόπωρο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib der Verwalterin: Die Flecken waren laut Inventarliste schon da, du hast Fotos, und du möchtest die ganze Kaution zurück. Zwei Sätze.',
                  en:'Write to the property manager: according to the inventory the stains were already there, you have photos, and you would like the full deposit back. Two sentences.',
                  el:'Γράψε στη διαχειρίστρια: σύμφωνα με την απογραφή οι λεκέδες υπήρχαν ήδη, έχεις φωτογραφίες και θέλεις πίσω ολόκληρη την εγγύηση. Δύο προτάσεις.' },
        muster:'Según el inventario, las manchas ya estaban cuando entré, y tengo fotos con fecha. Me gustaría que me devolviera la fianza entera.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Wenn du möchtest, dass jemand anderes etwas tut, sagst du „me gustaría que …" — und danach kommt eine besondere Vergangenheitsform: devolviera, hiciera, viniera. Das klingt höflich, aber bestimmt. „Que yo sepa" ist eine feste Wendung: „soweit ich weiß". Sie schützt dich, ohne unsicher zu wirken.',
               en:'When you want someone else to do something, say "me gustaría que …" — followed by a special past form: devolviera, hiciera, viniera. It sounds polite but firm. "Que yo sepa" is a fixed phrase: "as far as I know". It covers you without sounding unsure.',
               el:'Όταν θέλεις να κάνει κάτι κάποιος άλλος, λες «me gustaría que …» — και μετά ακολουθεί ένας ειδικός τύπος του παρελθόντος: devolviera, hiciera, viniera. Ακούγεται ευγενικό αλλά σταθερό. Το «que yo sepa» είναι σταθερή φράση: «απ’ όσο ξέρω». Σε καλύπτει χωρίς να δείχνεις αβέβαιος.' },
        beispiele:[
          { z:'Me gustaría que me devolviera la fianza.', na:{ de:'Ich hätte gern, dass Sie mir die Kaution zurückgeben.', en:'I’d like you to give me back the deposit.', el:'Θα ήθελα να μου επιστρέψετε την εγγύηση.' } },
          { z:'Que yo sepa, no han crecido.',             na:{ de:'Soweit ich weiß, sind sie nicht gewachsen.', en:'As far as I know, they haven’t grown.', el:'Απ’ όσο ξέρω, δεν έχουν μεγαλώσει.' } }
        ]
      },
      kultur:{ de:'In Spanien beträgt die gesetzliche Kaution (fianza) für eine Mietwohnung eine Monatsmiete. Gros ist das Viertel am Zurriola-Strand, beliebt bei Surfern.',
               en:'In Spain the legal deposit (fianza) for a rented home is one month’s rent. Gros is the neighbourhood by Zurriola beach, popular with surfers.',
               el:'Στην Ισπανία η νόμιμη εγγύηση (fianza) για ένα νοικιασμένο σπίτι είναι ένα ενοίκιο. Το Γκρος είναι η γειτονιά δίπλα στην παραλία Θουριόλα, αγαπημένη των σέρφερ.' }
    },

    /* ── B2 · Cambados, Galicien — Magosto bei Uxías Familie (Nov) ──── */
    'b2.familie': {
      duzen: true,
      deineRolle: { de:'Deine Kollegin Uxía hat dich zum Familienessen nach Cambados mitgenommen. Deine Oma in Finnland kochte leidenschaftlich gern, backte im Winter Roggenbrot und ließ niemanden in ihre Küche.', es:'Tu compañera Uxía te ha llevado a comer con su familia en Cambados. Tu abuela en Finlandia cocinaba con pasión, hacía pan de centeno en invierno y no dejaba entrar a nadie en su cocina.', en:'Your colleague Uxía has brought you to a family lunch in Cambados. Your grandmother in Finland loved cooking, baked rye bread in winter and let nobody into her kitchen.', el:'Η συνάδελφός σου η Ουσία σε πήρε μαζί της σε οικογενειακό τραπέζι στο Καμπάδος. Η γιαγιά σου στη Φινλανδία μαγείρευε με πάθος, έψηνε ψωμί σίκαλης τον χειμώνα και δεν άφηνε κανέναν να μπει στην κουζίνα της.' },
      abrundung: { z:'Ay, qué bonito. Toma, una castaña recién asada: quema, pero así es el magosto.', na:{ de:'Ach, wie schön. Hier, eine frisch geröstete Kastanie: Sie ist heiß, aber so ist der Magosto.', en:'Oh, how lovely. Here, a freshly roasted chestnut: it’s hot, but that’s the magosto for you.', el:'Αχ, τι ωραία. Πάρε ένα κάστανο μόλις ψημένο: καίει, αλλά έτσι είναι το μαγόστο.' } },
      rollen: {
        spikiu: { de:'Pilar, Uxías Großmutter', es:'Pilar, la abuela de Uxía', en:'Pilar, Uxía’s grandmother', el:'η Πιλάρ, η γιαγιά της Ουσία' },
        lerner: { de:'Aleksi, der Gast am Familientisch', es:'Aleksi, el invitado a la mesa', en:'Aleksi, the guest at the family table', el:'ο Αλέξι, ο καλεσμένος στο οικογενειακό τραπέζι' },
        ort:    { de:'bei Uxías Familie in Cambados, Galicien', es:'en casa de la familia de Uxía, en Cambados, Galicia', en:'at Uxía’s family home in Cambados, Galicia', el:'στο σπίτι της οικογένειας της Ουσία στο Καμπάδος της Γαλικίας' }
      },
      wortschatz: [
        { z:'la empanada',              na:{ de:'die gefüllte Teigpastete',     en:'the savoury pie', el:'η πίτα (εμπανάδα)' } },
        { z:'las zamburiñas',           na:{ de:'die kleinen Kammmuscheln',     en:'the small scallops', el:'τα μικρά χτένια' } },
        { z:'la masa',                  na:{ de:'der Teig',                     en:'the dough', el:'η ζύμη' } },
        { z:'el sofrito',               na:{ de:'die angeschmorte Gemüsebasis', en:'the slow-fried onion base', el:'το σοφρίτο (σοταρισμένη βάση)' } },
        { z:'el magosto',               na:{ de:'das galicische Kastanienfest', en:'the Galician chestnut festival', el:'η γιορτή του κάστανου στη Γαλικία' } },
        { z:'las castañas asadas',      na:{ de:'die gerösteten Kastanien',     en:'the roasted chestnuts', el:'τα ψητά κάστανα' } },
        { z:'el pan de centeno',        na:{ de:'das Roggenbrot',               en:'the rye bread', el:'το ψωμί σίκαλης' } },
        { z:'emigrar',                  na:{ de:'auswandern',                   en:'to emigrate', el:'μεταναστεύω' } },
        { z:'asar',                     na:{ de:'rösten, braten',               en:'to roast', el:'ψήνω' } },
        { z:'llevarse bien con',        na:{ de:'sich gut verstehen mit',       en:'to get on well with', el:'τα πάω καλά με' } },
        { z:'en el acto',               na:{ de:'auf der Stelle',               en:'on the spot', el:'επιτόπου' } },
        { z:'guardar el secreto',       na:{ de:'das Geheimnis hüten',          en:'to keep the secret', el:'κρατάω το μυστικό' } },
        { z:'recién asado',             na:{ de:'frisch geröstet',              en:'freshly roasted', el:'μόλις ψημένο' } },
        { z:'si hubiera …, habría …',   na:{ de:'hätte sie …, hätte sie …',     en:'if she had …, she would have …', el:'αν είχε …, θα είχε …' } },
        { z:'me contó que …',           na:{ de:'sie hat mir erzählt, dass …',  en:'she told me that …', el:'μου διηγήθηκε ότι …' } },
        { z:'ojalá hubiera podido …',   na:{ de:'hätte sie doch … können',      en:'if only she could have …', el:'μακάρι να μπορούσε να …' } }
      ],
      dialog: {
        rolle: { de:'Pilar, Uxías Großmutter', en:'Pilar, Uxía’s grandmother', el:'Η Πιλάρ, η γιαγιά της Ουσία' },
        zeilen: [
          { wer:'spikiu', z:'Esta empanada de zamburiñas es la receta de mi madre. Emigró a Buenos Aires con dieciocho años y volvió a Cambados ya casada. ¿Tu abuela también cocinaba?', na:{ de:'Diese Empanada mit Kammmuscheln ist das Rezept meiner Mutter. Sie ist mit achtzehn nach Buenos Aires ausgewandert und verheiratet nach Cambados zurückgekommen. Hat deine Oma auch gekocht?', en:'This scallop empanada is my mother’s recipe. She emigrated to Buenos Aires at eighteen and came back to Cambados already married. Did your grandmother cook too?', el:'Αυτή η εμπανάδα με χτένια είναι η συνταγή της μητέρας μου. Μετανάστευσε στο Μπουένος Άιρες στα δεκαοχτώ και γύρισε στο Καμπάδος ήδη παντρεμένη. Η γιαγιά σου μαγείρευε κι αυτή;' } },
          { wer:'lerner', z:'Sí, muchísimo. Si mi abuela hubiera probado esta empanada, habría pedido la receta en el acto.', na:{ de:'Ja, sehr viel. Hätte meine Oma diese Empanada probiert, hätte sie auf der Stelle nach dem Rezept gefragt.', en:'Yes, a great deal. If my grandmother had tasted this empanada, she would have asked for the recipe on the spot.', el:'Ναι, πάρα πολύ. Αν η γιαγιά μου είχε δοκιμάσει αυτή την εμπανάδα, θα είχε ζητήσει τη συνταγή επιτόπου.' } },
          { wer:'spikiu', z:'Pues mi madre nunca la dio entera; guardaba el secreto del sofrito. Decía que una receta se aprende mirando.', na:{ de:'Na ja, meine Mutter hat es nie vollständig verraten; sie hütete das Geheimnis der Gemüsebasis. Sie sagte, ein Rezept lernt man durch Zuschauen.', en:'Well, my mother never gave it away in full; she kept the secret of the sofrito. She used to say a recipe is learnt by watching.', el:'Η μητέρα μου όμως δεν την έδωσε ποτέ ολόκληρη· κρατούσε το μυστικό του σοφρίτο. Έλεγε ότι μια συνταγή τη μαθαίνεις κοιτάζοντας.' } },
          { wer:'lerner', z:'Mi abuela era igual. Me contó que en invierno hacía pan de centeno y que no dejaba entrar a nadie en la cocina.', na:{ de:'Meine Oma war genauso. Sie hat mir erzählt, dass sie im Winter Roggenbrot backte und niemanden in die Küche ließ.', en:'My grandmother was just the same. She told me she baked rye bread in winter and let nobody into the kitchen.', el:'Η γιαγιά μου ήταν ίδια. Μου διηγήθηκε ότι τον χειμώνα έψηνε ψωμί σίκαλης και δεν άφηνε κανέναν να μπει στην κουζίνα.' } },
          { wer:'spikiu', z:'Las abuelas somos así. Venga, ahora vamos al magosto: hay castañas asadas y vino nuevo.', na:{ de:'So sind wir Omas eben. Komm, jetzt gehen wir zum Magosto: Es gibt geröstete Kastanien und jungen Wein.', en:'That’s what we grandmothers are like. Come on, now let’s go to the magosto: there are roasted chestnuts and new wine.', el:'Έτσι είμαστε οι γιαγιάδες. Έλα, τώρα πάμε στο μαγόστο: έχει ψητά κάστανα και καινούργιο κρασί.' } },
          { wer:'lerner', z:'Encantado. Ojalá mi abuela hubiera podido estar aquí; se habría llevado muy bien contigo.', na:{ de:'Sehr gern. Hätte meine Oma doch hier sein können; sie hätte sich sehr gut mit dir verstanden.', en:'I’d love to. If only my grandmother could have been here; she would have got on very well with you.', el:'Με μεγάλη χαρά. Μακάρι να μπορούσε να είναι εδώ η γιαγιά μου· θα τα πήγαινε πολύ καλά μαζί σου.' } }
        ]
      },
      lesetext: {
        z:'Uxía me llevó a comer con su familia en Cambados. Su abuela Pilar me habló de su madre, que emigró a Buenos Aires y volvió con una receta de empanada mejorada. Después fuimos al magosto: castañas asadas, vino nuevo y mucho humo. Pensé en mi abuela de Tampere. Para mi cuaderno: guardar el secreto.',
        na:{ de:'Uxía hat mich zum Essen mit ihrer Familie in Cambados mitgenommen. Ihre Großmutter Pilar hat mir von ihrer Mutter erzählt, die nach Buenos Aires ausgewandert und mit einem verbesserten Empanada-Rezept zurückgekommen ist. Danach sind wir zum Magosto gegangen: geröstete Kastanien, junger Wein und viel Rauch. Ich habe an meine Oma aus Tampere gedacht. Für mein Notizheft: guardar el secreto.',
             en:'Uxía took me to eat with her family in Cambados. Her grandmother Pilar told me about her mother, who emigrated to Buenos Aires and came back with an improved empanada recipe. Afterwards we went to the magosto: roasted chestnuts, new wine and lots of smoke. I thought of my grandmother from Tampere. For my notebook: guardar el secreto.',
             el:'Η Ουσία με πήρε να φάμε με την οικογένειά της στο Καμπάδος. Η γιαγιά της η Πιλάρ μού μίλησε για τη μητέρα της, που μετανάστευσε στο Μπουένος Άιρες και γύρισε με μια βελτιωμένη συνταγή για εμπανάδα. Μετά πήγαμε στο μαγόστο: ψητά κάστανα, καινούργιο κρασί και πολύς καπνός. Σκέφτηκα τη γιαγιά μου από το Τάμπερε. Για το τετράδιό μου: guardar el secreto.' },
        frage:{ de:'Wohin war Pilars Mutter ausgewandert?', en:'Where had Pilar’s mother emigrated to?', el:'Πού είχε μεταναστεύσει η μητέρα της Πιλάρ;' },
        optionen:[
          { na:{ de:'Nach Buenos Aires', en:'To Buenos Aires', el:'Στο Μπουένος Άιρες' }, richtig:true  },
          { na:{ de:'Nach Tampere',      en:'To Tampere',      el:'Στο Τάμπερε' }, richtig:false },
          { na:{ de:'Nach Madrid',       en:'To Madrid',       el:'Στη Μαδρίτη' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib, was deine Oma getan hätte, wenn sie dieses Gericht probiert hätte, und was sie dir einmal erzählt hat. Zwei Sätze.',
                  en:'Write what your grandmother would have done if she had tasted this dish, and something she once told you. Two sentences.',
                  el:'Γράψε τι θα είχε κάνει η γιαγιά σου αν είχε δοκιμάσει αυτό το φαγητό και κάτι που σου είχε διηγηθεί κάποτε. Δύο προτάσεις.' },
        muster:'Si mi abuela hubiera probado esta empanada, habría pedido la receta en el acto. Me contó una vez que la cocina era su lugar favorito.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Für etwas, das nicht passiert ist, und was dann gewesen wäre: „si" + hubiera + -ado, danach habría + -ado. Si mi abuela hubiera probado esto, habría pedido la receta. Und „ojalá hubiera podido …" ist ein Wunsch, für den es schon zu spät ist: „hätte sie doch … können".',
               en:'For something that did not happen, and what would have followed: "si" + hubiera + -ado, then habría + -ado. Si mi abuela hubiera probado esto, habría pedido la receta. And "ojalá hubiera podido …" is a wish that comes too late: "if only she could have …".',
               el:'Για κάτι που δεν έγινε, και τι θα ακολουθούσε: «si» + hubiera + -ado, μετά habría + -ado. Si mi abuela hubiera probado esto, habría pedido la receta. Και το «ojalá hubiera podido …» είναι μια ευχή που έρχεται πια αργά: «μακάρι να μπορούσε …».' },
        beispiele:[
          { z:'Si mi abuela hubiera probado esto, habría pedido la receta.', na:{ de:'Hätte meine Oma das probiert, hätte sie nach dem Rezept gefragt.', en:'If my grandmother had tasted this, she would have asked for the recipe.', el:'Αν η γιαγιά μου είχε δοκιμάσει αυτό, θα είχε ζητήσει τη συνταγή.' } },
          { z:'Ojalá hubiera podido estar aquí.', na:{ de:'Hätte sie doch hier sein können.', en:'If only she could have been here.', el:'Μακάρι να μπορούσε να είναι εδώ.' } }
        ]
      },
      kultur:{ de:'Der Magosto ist das galicische Kastanienfest im Herbst, oft rund um den Martinstag (11. November): geröstete Kastanien und junger Wein. Im 20. Jahrhundert wanderten so viele Galicier nach Buenos Aires aus, dass man dort Spanier oft einfach „gallegos" nennt.',
               en:'The magosto is Galicia’s autumn chestnut festival, often held around St Martin’s Day (11 November): roasted chestnuts and new wine. In the 20th century so many Galicians emigrated to Buenos Aires that Spaniards there are often simply called “gallegos”.',
               el:'Το μαγόστο είναι η φθινοπωρινή γιορτή του κάστανου στη Γαλικία, συχνά γύρω από τη γιορτή του Αγίου Μαρτίνου (11 Νοεμβρίου): ψητά κάστανα και καινούργιο κρασί. Τον 20ό αιώνα τόσοι Γαλικιανοί μετανάστευσαν στο Μπουένος Άιρες, ώστε εκεί τους Ισπανούς συχνά τους λένε απλώς «gallegos».' }
    },

    /* ── B2 · Salamanca — Streitgespräch im Café (Dez) ─────────────── */
    'b2.cafe': {
      deineRolle: { de:'Du sitzt in einem Café an der Plaza Mayor mit Don Julián, einem Literaturprofessor im Ruhestand. Er liebt die traditionelle Küche; du findest, Tradition muss man auch erneuern — aber nicht um jeden Preis.', es:'Estás en un café de la Plaza Mayor con don Julián, catedrático de literatura jubilado. A él le encanta la cocina tradicional; tú crees que la tradición también hay que renovarla, pero no a cualquier precio.', en:'You are in a café on the Plaza Mayor with Don Julián, a retired literature professor. He loves traditional cooking; you think tradition also needs renewing — but not at any cost.', el:'Κάθεσαι σε ένα καφέ στην Πλάθα Μαγιόρ με τον δον Χουλιάν, συνταξιούχο καθηγητή λογοτεχνίας. Εκείνος λατρεύει την παραδοσιακή κουζίνα· εσύ πιστεύεις ότι και η παράδοση πρέπει να ανανεώνεται — αλλά όχι με κάθε κόστος.' },
      abrundung: { z:'Me encanta su franqueza, Aleksi. Otro café, que esta tertulia no ha terminado.', na:{ de:'Ich liebe Ihre Offenheit, Aleksi. Noch einen Kaffee, diese Runde ist noch nicht vorbei.', en:'I love your frankness, Aleksi. Another coffee — this conversation isn’t over yet.', el:'Λατρεύω την ειλικρίνειά σας, Αλέξι. Άλλον έναν καφέ, γιατί αυτή η κουβέντα δεν τελείωσε.' } },
      rollen: {
        spikiu: { de:'Don Julián, Literaturprofessor im Ruhestand', es:'don Julián, catedrático de literatura jubilado', en:'Don Julián, a retired literature professor', el:'ο δον Χουλιάν, συνταξιούχος καθηγητής λογοτεχνίας' },
        lerner: { de:'Aleksi, der Koch aus Finnland', es:'Aleksi, el cocinero finlandés', en:'Aleksi, the chef from Finland', el:'ο Αλέξι, ο μάγειρας από τη Φινλανδία' },
        ort:    { de:'in einem Café an der Plaza Mayor, Salamanca', es:'en un café de la Plaza Mayor, Salamanca', en:'in a café on the Plaza Mayor, Salamanca', el:'σε ένα καφέ στην Πλάθα Μαγιόρ της Σαλαμάνκα' }
      },
      wortschatz: [
        { z:'la cocina de vanguardia',  na:{ de:'die Avantgarde-Küche',         en:'avant-garde cooking', el:'η πρωτοποριακή κουζίνα' } },
        { z:'el cocido',                na:{ de:'der Kichererbsen-Eintopf',     en:'the chickpea stew', el:'το κοσίδο (βραστό με ρεβίθια)' } },
        { z:'la espuma',                na:{ de:'der Schaum',                   en:'the foam', el:'ο αφρός' } },
        { z:'los garbanzos',            na:{ de:'die Kichererbsen',             en:'the chickpeas', el:'τα ρεβίθια' } },
        { z:'la tertulia',              na:{ de:'die Gesprächsrunde',           en:'the (regular) discussion group', el:'η παρέα για κουβέντα' } },
        { z:'la franqueza',             na:{ de:'die Offenheit',                en:'the frankness', el:'η ειλικρίνεια' } },
        { z:'los soportales',           na:{ de:'die Arkaden',                  en:'the arcades', el:'οι στοές' } },
        { z:'renovar',                  na:{ de:'erneuern',                     en:'to renew', el:'ανανεώνω' } },
        { z:'experimentar',             na:{ de:'experimentieren',              en:'to experiment', el:'πειραματίζομαι' } },
        { z:'matizar',                  na:{ de:'differenzieren, abstufen',     en:'to add nuance', el:'αποχρωματίζω, βάζω αποχρώσεις' } },
        { z:'de toda la vida',          na:{ de:'altbewährt, wie eh und je',    en:'traditional, the way it’s always been', el:'όπως πάντα, του παλιού καιρού' } },
        { z:'eso es mucho decir',       na:{ de:'das ist ziemlich übertrieben', en:'that’s going a bit far', el:'αυτό είναι πολύ βαρύ' } },
        { z:'lo de siempre',            na:{ de:'das Altbekannte',              en:'the usual', el:'τα γνωστά, τα συνηθισμένα' } },
        { z:'no es que …, sino que …',  na:{ de:'nicht dass …, sondern …',      en:'it’s not that …, it’s that …', el:'δεν είναι ότι …, αλλά ότι …' } },
        { z:'por mucho que + subj.',    na:{ de:'so sehr … auch',               en:'however much …', el:'όσο κι αν …' } },
        { z:'hasta cierto punto',       na:{ de:'bis zu einem gewissen Punkt',  en:'up to a point', el:'ως έναν βαθμό' } }
      ],
      dialog: {
        rolle: { de:'Don Julián, Literaturprofessor im Ruhestand', en:'Don Julián, a retired literature professor', el:'Ο δον Χουλιάν, συνταξιούχος καθηγητής λογοτεχνίας' },
        zeilen: [
          { wer:'spikiu', z:'Mire, la cocina de vanguardia está muy bien, pero yo prefiero el cocido de toda la vida. ¿No le parece que la tradición se está perdiendo?', na:{ de:'Sehen Sie, die Avantgarde-Küche ist schön und gut, aber ich bevorzuge den Cocido wie eh und je. Finden Sie nicht, dass die Tradition verloren geht?', en:'Look, avant-garde cooking is all very well, but I prefer a good old-fashioned cocido. Don’t you think tradition is being lost?', el:'Κοιτάξτε, η πρωτοποριακή κουζίνα είναι πολύ ωραία, αλλά εγώ προτιμώ το κοσίδο όπως πάντα. Δεν σας φαίνεται ότι η παράδοση χάνεται;' } },
          { wer:'lerner', z:'No es que no me guste la tradición, sino que creo que hay que renovarla. Una receta que nunca cambia acaba en un museo.', na:{ de:'Nicht dass ich die Tradition nicht mag, sondern ich finde, man muss sie erneuern. Ein Rezept, das sich nie ändert, landet im Museum.', en:'It’s not that I don’t like tradition, it’s that I think it needs renewing. A recipe that never changes ends up in a museum.', el:'Δεν είναι ότι δεν μου αρέσει η παράδοση, αλλά ότι πιστεύω πως πρέπει να ανανεώνεται. Μια συνταγή που δεν αλλάζει ποτέ καταλήγει σε μουσείο.' } },
          { wer:'spikiu', z:'Hombre, eso es mucho decir. ¿Usted serviría una espuma de garbanzos en lugar de un cocido?', na:{ de:'Na hören Sie, das ist ziemlich übertrieben. Würden Sie einen Kichererbsenschaum statt eines Cocido servieren?', en:'Come now, that’s going a bit far. Would you serve a chickpea foam instead of a cocido?', el:'Έλα τώρα, αυτό είναι πολύ βαρύ. Εσείς θα σερβίρατε αφρό από ρεβίθια αντί για κοσίδο;' } },
          { wer:'lerner', z:'Por mucho que experimente en la cocina, nunca convertiría un cocido en espuma. En eso tiene usted razón.', na:{ de:'So sehr ich in der Küche auch experimentiere, einen Cocido würde ich nie in Schaum verwandeln. Da haben Sie recht.', en:'However much I experiment in the kitchen, I would never turn a cocido into foam. You’re right about that.', el:'Όσο κι αν πειραματίζομαι στην κουζίνα, ποτέ δεν θα έκανα ένα κοσίδο αφρό. Σε αυτό έχετε δίκιο.' } },
          { wer:'spikiu', z:'¿Lo ve? Entonces estamos de acuerdo: lo de siempre es lo mejor.', na:{ de:'Sehen Sie? Dann sind wir uns einig: Das Altbekannte ist das Beste.', en:'You see? Then we agree: the usual is best.', el:'Βλέπετε; Τότε συμφωνούμε: τα γνωστά είναι τα καλύτερα.' } },
          { wer:'lerner', z:'Hasta cierto punto. En Finlandia diríamos simplemente que no, pero aquí prefiero decir que depende del plato.', na:{ de:'Bis zu einem gewissen Punkt. In Finnland würden wir einfach Nein sagen, aber hier sage ich lieber: Es kommt auf das Gericht an.', en:'Up to a point. In Finland we’d simply say no, but here I’d rather say it depends on the dish.', el:'Ως έναν βαθμό. Στη Φινλανδία θα λέγαμε απλώς όχι, αλλά εδώ προτιμώ να πω ότι εξαρτάται από το πιάτο.' } }
        ]
      },
      lesetext: {
        z:'Esta tarde, bajo los soportales de la Plaza Mayor, don Julián y yo discutimos dos horas sobre el cocido. Él defiende la tradición; yo, la renovación. Al final aprendí a matizar en vez de decir que no. Él dice que soy el finlandés más diplomático que conoce. Para mi cuaderno: hasta cierto punto.',
        na:{ de:'Heute Nachmittag haben Don Julián und ich unter den Arkaden der Plaza Mayor zwei Stunden lang über den Cocido gestritten. Er verteidigt die Tradition, ich die Erneuerung. Am Ende habe ich gelernt, zu differenzieren, statt Nein zu sagen. Er sagt, ich sei der diplomatischste Finne, den er kennt. Für mein Notizheft: hasta cierto punto.',
             en:'This afternoon, under the arcades of the Plaza Mayor, Don Julián and I argued for two hours about cocido. He defends tradition; I defend renewal. In the end I learnt to add nuance instead of saying no. He says I’m the most diplomatic Finn he knows. For my notebook: hasta cierto punto.',
             el:'Σήμερα το απόγευμα, κάτω από τις στοές της Πλάθα Μαγιόρ, ο δον Χουλιάν κι εγώ συζητούσαμε δύο ώρες για το κοσίδο. Εκείνος υπερασπίζεται την παράδοση· εγώ, την ανανέωση. Στο τέλος έμαθα να βάζω αποχρώσεις αντί να λέω όχι. Λέει ότι είμαι ο πιο διπλωματικός Φινλανδός που ξέρει. Για το τετράδιό μου: hasta cierto punto.' },
        frage:{ de:'Was hat Aleksi am Ende gelernt?', en:'What did Aleksi learn in the end?', el:'Τι έμαθε ο Αλέξι στο τέλος;' },
        optionen:[
          { na:{ de:'Zu differenzieren, statt Nein zu sagen', en:'To add nuance instead of saying no', el:'Να βάζει αποχρώσεις αντί να λέει όχι' }, richtig:true  },
          { na:{ de:'Einen Cocido zu kochen',                  en:'To cook a cocido', el:'Να μαγειρεύει κοσίδο' }, richtig:false },
          { na:{ de:'Immer Ja zu sagen',                       en:'To always say yes', el:'Να λέει πάντα ναι' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib jemandem, der nur die traditionelle Küche gelten lässt: Widersprich fein abgestuft und gib ihm in einem Punkt recht. Zwei Sätze.',
                  en:'Write to someone who only accepts traditional cooking: disagree with nuance and agree with him on one point. Two sentences.',
                  el:'Γράψε σε κάποιον που δέχεται μόνο την παραδοσιακή κουζίνα: διαφώνησε με αποχρώσεις και δώσ’ του δίκιο σε ένα σημείο. Δύο προτάσεις.' },
        muster:'No es que no me guste la cocina moderna, sino que prefiero lo de toda la vida. Por mucho que lo intenten, una espuma no es un cocido.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„No es que …, sino que …": Zuerst sagst du, was es NICHT ist, dann, was es wirklich ist. Nach „no es que" steht der Subjuntivo (no me guste), nach „sino que" die normale Form (creo). „Por mucho que" + Subjuntivo heißt „so sehr … auch": por mucho que experimente.',
               en:'"No es que …, sino que …": first you say what it is NOT, then what it really is. After "no es que" comes the subjunctive (no me guste); after "sino que" the ordinary form (creo). "Por mucho que" + subjunctive means "however much …": por mucho que experimente.',
               el:'«No es que …, sino que …»: πρώτα λες τι ΔΕΝ είναι και μετά τι είναι στην πραγματικότητα. Μετά το «no es que» μπαίνει υποτακτική (no me guste), μετά το «sino que» ο συνηθισμένος τύπος (creo). Το «por mucho que» + υποτακτική σημαίνει «όσο κι αν …»: por mucho que experimente.' },
        beispiele:[
          { z:'No es que no me guste, sino que prefiero otra cosa.', na:{ de:'Nicht dass es mir nicht gefällt, sondern ich mag etwas anderes lieber.', en:'It’s not that I don’t like it, it’s that I prefer something else.', el:'Δεν είναι ότι δεν μου αρέσει, αλλά ότι προτιμώ κάτι άλλο.' } },
          { z:'Por mucho que experimente, respeto el cocido.',      na:{ de:'So sehr ich auch experimentiere, ich respektiere den Cocido.', en:'However much I experiment, I respect the cocido.', el:'Όσο κι αν πειραματίζομαι, σέβομαι το κοσίδο.' } }
        ]
      },
      kultur:{ de:'Die Universität Salamanca, gegründet 1218, ist die älteste noch bestehende Universität Spaniens. Die barocke Plaza Mayor aus dem 18. Jahrhundert ist ringsum von Arkaden umgeben und gilt als einer der schönsten Plätze des Landes.',
               en:'The University of Salamanca, founded in 1218, is the oldest university in Spain still in operation. The baroque Plaza Mayor, from the 18th century, is lined with arcades on all sides and is considered one of the finest squares in the country.',
               el:'Το Πανεπιστήμιο της Σαλαμάνκα, που ιδρύθηκε το 1218, είναι το αρχαιότερο πανεπιστήμιο της Ισπανίας που λειτουργεί ακόμα. Η μπαρόκ Πλάθα Μαγιόρ του 18ου αιώνα περιβάλλεται από στοές και θεωρείται μία από τις ωραιότερες πλατείες της χώρας.' }
    },

    /* ── B2 · Madrid, Atocha — der AVE fällt aus (Jan) ─────────────── */
    'b2.bahnhof': {
      deineRolle: { de:'Du hattest ein Ticket für den AVE um zehn von Madrid-Atocha nach Granada. Auf der Anzeigetafel steht: gestrichen. Niemand hat euch vorher informiert, und du möchtest wissen, welche Rechte du hast.', es:'Tenías billete para el AVE de las diez de Madrid-Atocha a Granada. En el panel pone: cancelado. Nadie os avisó antes y quieres saber qué derechos tienes.', en:'You had a ticket for the ten o’clock AVE from Madrid-Atocha to Granada. The departure board says: cancelled. Nobody told you in advance, and you want to know your rights.', el:'Είχες εισιτήριο για το AVE των δέκα από τη Μαδρίτη-Ατότσα για τη Γρανάδα. Ο πίνακας γράφει: ακυρώθηκε. Κανείς δεν σας ειδοποίησε από πριν και θέλεις να μάθεις τα δικαιώματά σου.' },
      eroeffnung: { z:'Buenos días. Atención al cliente, ¿en qué puedo ayudarle?', na:{ de:'Guten Morgen. Kundenservice, womit kann ich Ihnen helfen?', en:'Good morning. Customer service, how can I help you?', el:'Καλημέρα. Εξυπηρέτηση πελατών, πώς μπορώ να σας βοηθήσω;' } },
      abrundung: { z:'Su tren sale de la vía cinco. Disculpe las molestias y buen viaje a Granada.', na:{ de:'Ihr Zug fährt von Gleis fünf ab. Entschuldigen Sie die Unannehmlichkeiten, und gute Reise nach Granada.', en:'Your train leaves from platform five. Sorry for the inconvenience, and have a good trip to Granada.', el:'Το τρένο σας φεύγει από τη γραμμή πέντε. Συγγνώμη για την ταλαιπωρία και καλό ταξίδι στη Γρανάδα.' } },
      rollen: {
        spikiu: { de:'Marisa vom Kundenservice', es:'Marisa, de atención al cliente', en:'Marisa from customer service', el:'η Μαρίσα από την εξυπηρέτηση πελατών' },
        lerner: { de:'Aleksi, der Reisende ohne Zug', es:'Aleksi, el viajero sin tren', en:'Aleksi, the passenger without a train', el:'ο Αλέξι, ο ταξιδιώτης χωρίς τρένο' },
        ort:    { de:'am Kundenschalter im Bahnhof Madrid-Atocha', es:'en el mostrador de atención al cliente de Madrid-Atocha', en:'at the customer service desk at Madrid-Atocha station', el:'στο γκισέ εξυπηρέτησης πελατών στον σταθμό Μαδρίτη-Ατότσα' }
      },
      wortschatz: [
        { z:'la avería',                na:{ de:'die (technische) Störung',     en:'the breakdown, the fault', el:'η βλάβη' } },
        { z:'la indemnización',         na:{ de:'die Entschädigung',            en:'the compensation', el:'η αποζημίωση' } },
        { z:'el importe',               na:{ de:'der Betrag',                   en:'the amount', el:'το ποσό' } },
        { z:'la hoja de reclamaciones', na:{ de:'das offizielle Beschwerdeformular', en:'the official complaint form', el:'το έντυπο παραπόνων' } },
        { z:'el panel de salidas',      na:{ de:'die Abfahrtstafel',            en:'the departures board', el:'ο πίνακας αναχωρήσεων' } },
        { z:'la atención al cliente',   na:{ de:'der Kundenservice',            en:'customer service', el:'η εξυπηρέτηση πελατών' } },
        { z:'las molestias',            na:{ de:'die Unannehmlichkeiten',       en:'the inconvenience', el:'η ταλαιπωρία' } },
        { z:'solicitar',                na:{ de:'beantragen',                   en:'to apply for, to request', el:'αιτούμαι, ζητώ' } },
        { z:'rellenar',                 na:{ de:'ausfüllen',                    en:'to fill in', el:'συμπληρώνω' } },
        { z:'sellar',                   na:{ de:'abstempeln',                   en:'to stamp', el:'σφραγίζω' } },
        { z:'sin coste',                na:{ de:'kostenlos, ohne Aufpreis',     en:'free of charge', el:'χωρίς χρέωση' } },
        { z:'con antelación',           na:{ de:'im Voraus, rechtzeitig',       en:'in advance', el:'εκ των προτέρων' } },
        { z:'estar en su derecho',      na:{ de:'im Recht sein, das Recht haben', en:'to be within one’s rights', el:'είναι δικαίωμά του/σας' } },
        { z:'¿tendría derecho a …?',    na:{ de:'hätte ich ein Recht auf …?',   en:'would I be entitled to …?', el:'θα δικαιούμουν …;' } },
        { z:'ha sido cancelado',        na:{ de:'er wurde gestrichen',          en:'it has been cancelled', el:'ακυρώθηκε' } },
        { z:'quisiera que constara …',  na:{ de:'ich möchte, dass festgehalten wird …', en:'I’d like it to be noted …', el:'θα ήθελα να καταγραφεί …' } }
      ],
      dialog: {
        rolle: { de:'Marisa vom Kundenservice', en:'Marisa from customer service', el:'Η Μαρίσα από την εξυπηρέτηση πελατών' },
        zeilen: [
          { wer:'lerner', z:'Buenos días. Tenía billete para el AVE de las diez a Granada, pero en el panel pone que ha sido cancelado.', na:{ de:'Guten Morgen. Ich hatte ein Ticket für den AVE um zehn nach Granada, aber auf der Tafel steht, dass er gestrichen wurde.', en:'Good morning. I had a ticket for the ten o’clock AVE to Granada, but the board says it has been cancelled.', el:'Καλημέρα. Είχα εισιτήριο για το AVE των δέκα για Γρανάδα, αλλά ο πίνακας λέει ότι ακυρώθηκε.' } },
          { wer:'spikiu', z:'Así es, lo siento mucho. Ha habido una avería técnica. Puedo cambiarle sin coste al tren de las doce y cuarto.', na:{ de:'Das stimmt, es tut mir sehr leid. Es gab eine technische Störung. Ich kann Sie kostenlos auf den Zug um Viertel nach zwölf umbuchen.', en:'That’s right, I’m very sorry. There has been a technical fault. I can move you free of charge to the quarter past twelve train.', el:'Έτσι είναι, λυπάμαι πολύ. Υπήρξε τεχνική βλάβη. Μπορώ να σας αλλάξω χωρίς χρέωση στο τρένο των δώδεκα και τέταρτο.' } },
          { wer:'lerner', z:'De acuerdo, me viene bien. ¿Tendría derecho a alguna indemnización por llegar tan tarde?', na:{ de:'Einverstanden, das passt mir. Hätte ich ein Recht auf eine Entschädigung, weil ich so spät ankomme?', en:'All right, that suits me. Would I be entitled to any compensation for arriving so late?', el:'Εντάξει, με βολεύει. Θα δικαιούμουν κάποια αποζημίωση επειδή θα φτάσω τόσο αργά;' } },
          { wer:'spikiu', z:'Sí. Si llega con más de una hora de retraso, puede solicitar que le devuelvan parte del importe, en la web o aquí mismo.', na:{ de:'Ja. Wenn Sie mit mehr als einer Stunde Verspätung ankommen, können Sie beantragen, dass man Ihnen einen Teil des Betrags erstattet, online oder direkt hier.', en:'Yes. If you arrive more than an hour late, you can apply to have part of the fare refunded, online or right here.', el:'Ναι. Αν φτάσετε με πάνω από μία ώρα καθυστέρηση, μπορείτε να ζητήσετε να σας επιστραφεί μέρος του ποσού, στο διαδίκτυο ή εδώ.' } },
          { wer:'lerner', z:'Gracias. Aun así, quisiera poner una reclamación y que constara que no nos avisaron con antelación.', na:{ de:'Danke. Trotzdem möchte ich eine Beschwerde einreichen, und es soll festgehalten werden, dass man uns nicht vorher informiert hat.', en:'Thank you. Even so, I’d like to make a complaint and have it noted that we weren’t told in advance.', el:'Ευχαριστώ. Παρ’ όλα αυτά, θα ήθελα να κάνω παράπονο και να καταγραφεί ότι δεν μας ειδοποίησαν εκ των προτέρων.' } },
          { wer:'spikiu', z:'Está en su derecho. Aquí tiene la hoja de reclamaciones; en cuanto la rellene, se la sello.', na:{ de:'Das ist Ihr gutes Recht. Hier ist das Beschwerdeformular; sobald Sie es ausgefüllt haben, stemple ich es Ihnen ab.', en:'You’re within your rights. Here’s the complaint form; as soon as you’ve filled it in, I’ll stamp it for you.', el:'Είναι δικαίωμά σας. Ορίστε το έντυπο παραπόνων· μόλις το συμπληρώσετε, σας το σφραγίζω.' } }
        ]
      },
      lesetext: {
        z:'Hoy mi AVE a Granada ha sido cancelado por una avería. Marisa, en atención al cliente, me cambió al tren siguiente sin coste y me explicó qué podía pedir. Aun así, rellené la hoja de reclamaciones: soy finlandés, me gustan los papeles en orden. Llegué a Granada de noche, cansado pero tranquilo. Para mi cuaderno: con antelación.',
        na:{ de:'Heute ist mein AVE nach Granada wegen einer Störung gestrichen worden. Marisa vom Kundenservice hat mich kostenlos auf den nächsten Zug umgebucht und mir erklärt, was ich verlangen kann. Trotzdem habe ich das Beschwerdeformular ausgefüllt: Ich bin Finne, ich mag Papiere in Ordnung. Ich bin nachts in Granada angekommen, müde, aber ruhig. Für mein Notizheft: con antelación.',
             en:'Today my AVE to Granada was cancelled because of a fault. Marisa at customer service moved me to the next train free of charge and explained what I could claim. Even so, I filled in the complaint form: I’m Finnish, I like my paperwork in order. I reached Granada at night, tired but calm. For my notebook: con antelación.',
             el:'Σήμερα το AVE μου για τη Γρανάδα ακυρώθηκε λόγω βλάβης. Η Μαρίσα από την εξυπηρέτηση πελατών με έβαλε στο επόμενο τρένο χωρίς χρέωση και μου εξήγησε τι μπορούσα να ζητήσω. Παρ’ όλα αυτά, συμπλήρωσα το έντυπο παραπόνων: είμαι Φινλανδός, μου αρέσουν τα χαρτιά σε τάξη. Έφτασα στη Γρανάδα νύχτα, κουρασμένος αλλά ήρεμος. Για το τετράδιό μου: con antelación.' },
        frage:{ de:'Was hat Aleksi trotzdem gemacht?', en:'What did Aleksi do anyway?', el:'Τι έκανε ο Αλέξι παρ’ όλα αυτά;' },
        optionen:[
          { na:{ de:'Er hat das Beschwerdeformular ausgefüllt', en:'He filled in the complaint form', el:'Συμπλήρωσε το έντυπο παραπόνων' }, richtig:true  },
          { na:{ de:'Er hat einen Bus nach Granada genommen',    en:'He took a bus to Granada', el:'Πήρε λεωφορείο για τη Γρανάδα' }, richtig:false },
          { na:{ de:'Er ist eine Nacht in Madrid geblieben',     en:'He stayed one night in Madrid', el:'Έμεινε ένα βράδυ στη Μαδρίτη' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib eine kurze Beschwerde: Dein Zug wurde ohne Vorwarnung gestrichen; frag, ob du ein Recht auf Entschädigung hättest. Zwei Sätze.',
                  en:'Write a short complaint: your train was cancelled without warning; ask whether you would be entitled to compensation. Two sentences.',
                  el:'Γράψε ένα σύντομο παράπονο: το τρένο σου ακυρώθηκε χωρίς προειδοποίηση· ρώτα αν θα δικαιούσουν αποζημίωση. Δύο προτάσεις.' },
        muster:'Mi tren ha sido cancelado sin previo aviso y quisiera que constara en la reclamación. ¿Tendría derecho a una indemnización?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Ha sido cancelado" sagt, was mit dem Zug passiert ist, ohne zu sagen, wer es getan hat. Die Endung passt sich an: el tren ha sido cancelado, la conexión ha sido cancelada. „Quisiera que constara …" ist eine sehr höfliche Bitte; nach „quisiera que" kommt dieselbe Vergangenheitsform wie nach „me gustaría que": constara, hiciera.',
               en:'"Ha sido cancelado" says what happened to the train without saying who did it. The ending adapts: el tren ha sido cancelado, la conexión ha sido cancelada. "Quisiera que constara …" is a very polite request; after "quisiera que" comes the same past form as after "me gustaría que": constara, hiciera.',
               el:'Το «ha sido cancelado» λέει τι έπαθε το τρένο χωρίς να λέει ποιος το έκανε. Η κατάληξη προσαρμόζεται: el tren ha sido cancelado, la conexión ha sido cancelada. Το «quisiera que constara …» είναι πολύ ευγενικό αίτημα· μετά το «quisiera que» μπαίνει ο ίδιος τύπος του παρελθόντος όπως μετά το «me gustaría que»: constara, hiciera.' },
        beispiele:[
          { z:'El AVE de las diez ha sido cancelado.',      na:{ de:'Der AVE um zehn wurde gestrichen.', en:'The ten o’clock AVE has been cancelled.', el:'Το AVE των δέκα ακυρώθηκε.' } },
          { z:'Quisiera que constara en la reclamación.',   na:{ de:'Ich möchte, dass es in der Beschwerde festgehalten wird.', en:'I’d like it to be noted in the complaint.', el:'Θα ήθελα να καταγραφεί στο παράπονο.' } }
        ]
      },
      kultur:{ de:'Spanien hat das längste Hochgeschwindigkeitsnetz Europas; die erste AVE-Linie fuhr 1992 von Madrid nach Sevilla. Jedes Unternehmen mit Kundenverkehr muss in Spanien offizielle Beschwerdeformulare, die hojas de reclamaciones, bereithalten.',
               en:'Spain has the longest high-speed rail network in Europe; the first AVE line ran from Madrid to Seville in 1992. In Spain every business that serves the public must keep official complaint forms, the hojas de reclamaciones.',
               el:'Η Ισπανία έχει το μεγαλύτερο δίκτυο τρένων υψηλής ταχύτητας στην Ευρώπη· η πρώτη γραμμή AVE λειτούργησε το 1992 από τη Μαδρίτη στη Σεβίλλη. Στην Ισπανία κάθε επιχείρηση που εξυπηρετεί κοινό πρέπει να έχει επίσημα έντυπα παραπόνων, τις hojas de reclamaciones.' }
    }
  }
};

/* ══════════════════════════════════════════════════════════════════
   B2 · BLÜTE · B-Gruppe (Stationen 6–10)
   Aleksi Virtanen, Koch aus Helsinki, ein Jahr in spanischen Küchen.
   arzt Granada · einkaufen Valencia · taxi Sevilla ·
   wegbeschreibung Picos de Europa · wetter Lanzarote.
   Spanien-Spanisch, nie voseo, keine Politik.
   ══════════════════════════════════════════════════════════════════ */
var B2_LP_B = {

  schritt: {
    arzt:            { de:'Granada: ein Missgeschick erklären', en:'Granada: explaining a mishap', el:'Γρανάδα: εξηγείς μια αναποδιά' },
    einkaufen:       { de:'Valencia: höflich, aber fest reklamieren', en:'Valencia: complaining politely but firmly', el:'Βαλένθια: παραπονιέσαι ευγενικά αλλά σταθερά' },
    taxi:            { de:'Sevilla: Verlorenes genau beschreiben', en:'Seville: describing a lost item precisely', el:'Σεβίλλη: περιγράφεις με ακρίβεια κάτι που έχασες' },
    wegbeschreibung: { de:'Asturien: einen langen Weg verstehen', en:'Asturias: understanding a long route', el:'Αστούριας: καταλαβαίνεις μια μεγάλη διαδρομή' },
    wetter:          { de:'Lanzarote: planen, wenn der Wind dreht', en:'Lanzarote: planning when the wind turns', el:'Λανθαρότε: σχεδιάζεις όταν γυρίζει ο αέρας' }
  },

  aufgaben: {
    'b2.arzt': [
      { de:'Erkläre, was passiert ist: Beim Frittieren ist dir die Pfanne weggerutscht und heißes Öl auf die Hand gefallen', es:'Explica qué pasó: mientras freías, se te resbaló la sartén y te cayó aceite hirviendo en la mano', en:'Explain what happened: while you were frying, the pan slipped and boiling oil fell on your hand', el:'Εξήγησε τι έγινε: ενώ τηγάνιζες, σου γλίστρησε το τηγάνι και σου έπεσε καυτό λάδι στο χέρι' },
      { de:'Frag, wie viel Salbe genau, und was du tun sollst, falls es sich entzündet', es:'Pregunta cuánta pomada exactamente y qué hacer en caso de que se infecte', en:'Ask exactly how much ointment to use, and what to do in case it gets infected', el:'Ρώτα πόση αλοιφή ακριβώς και τι να κάνεις σε περίπτωση που μολυνθεί' },
      { de:'Bitte um eine Krankschreibung und erkläre, warum du als Koch so nicht arbeiten kannst', es:'Pide la baja y explica por qué, como cocinero, así no puedes trabajar', en:'Ask for a sick note and explain why, as a cook, you can’t work like this', el:'Ζήτα άδεια ασθενείας και εξήγησε γιατί, ως μάγειρας, δεν μπορείς να δουλέψεις έτσι' }
    ],
    'b2.einkaufen': [
      { de:'Sag, dass du die Paellapfanne vor einer Woche hier gekauft hast und dass sie am Griff gerissen ist und tropft', es:'Di que compraste la paellera aquí hace una semana y que se ha agrietado junto al asa y gotea', en:'Say you bought the paella pan here a week ago and that it has cracked by the handle and leaks', el:'Πες ότι αγόρασες το τηγάνι για παέγια εδώ πριν από μία εβδομάδα και ότι ράγισε δίπλα στο χερούλι και στάζει' },
      { de:'Sag, was man dir versprochen hat und was trotzdem passiert ist — und mach klar, dass du niemandem die Schuld geben willst', es:'Di lo que te dijeron y lo que pasó sin embargo, y deja claro que no pretendes culpar a nadie', en:'Say what you were told and what happened anyway — and make clear you’re not trying to blame anyone', el:'Πες τι σου είπαν και τι έγινε παρ’ όλα αυτά — και ξεκαθάρισε ότι δεν θέλεις να κατηγορήσεις κανέναν' },
      { de:'Frag, welche Lösung er vorschlägt: Umtausch oder Geld zurück', es:'Pregunta qué solución te propone: un cambio o un reembolso', en:'Ask what solution he suggests: an exchange or a refund', el:'Ρώτα τι λύση σού προτείνει: αλλαγή ή επιστροφή χρημάτων' }
    ],
    'b2.taxi': [
      { de:'Sag, dass du etwas Wichtiges in dem Taxi vergessen hast, das du heute Morgen am Bahnhof Santa Justa genommen hast', es:'Di que te dejaste algo importante en el taxi que cogiste esta mañana en la estación de Santa Justa', en:'Say you left something important in the taxi you took this morning at Santa Justa station', el:'Πες ότι ξέχασες κάτι σημαντικό στο ταξί που πήρες σήμερα το πρωί από τον σταθμό Σάντα Χούστα' },
      { de:'Beschreib die Messertasche genau: Material, was darin ist und wozu du die Messer brauchst', es:'Describe el estuche con detalle: de qué es, qué hay dentro y para qué usas los cuchillos', en:'Describe the knife case in detail: what it’s made of, what’s inside and what you use the knives for', el:'Περιέγραψε τη θήκη λεπτομερώς: από τι είναι, τι έχει μέσα και σε τι χρησιμοποιείς τα μαχαίρια' },
      { de:'Beschreib den Fahrer und sag, wann und wo du ausgestiegen bist', es:'Describe al taxista y di cuándo y dónde te bajaste', en:'Describe the driver and say when and where you got out', el:'Περιέγραψε τον ταξιτζή και πες πότε και πού κατέβηκες' }
    ],
    'b2.wegbeschreibung': [
      { de:'Sag, dass du morgen allein zur Käsehöhle hinaufwillst, und bitte Benito, dir den Weg in Ruhe zu erklären', es:'Di que mañana quieres subir solo a la cueva de los quesos y pídele a Benito que te explique el camino con calma', en:'Say you want to go up to the cheese cave on your own tomorrow, and ask Benito to explain the way slowly', el:'Πες ότι αύριο θέλεις να ανέβεις μόνος στη σπηλιά με τα τυριά και ζήτα από τον Μπενίτο να σου εξηγήσει τον δρόμο με την ησυχία του' },
      { de:'Wiederhole den ersten Teil zur Sicherheit („cuando llegue…“) und frag, wie es weitergeht', es:'Repite la primera parte para asegurarte («cuando llegue…») y pregunta cómo sigue', en:'Repeat the first part to be sure (“cuando llegue…”) and ask how it continues', el:'Επανάλαβε το πρώτο κομμάτι για σιγουριά («cuando llegue…») και ρώτα πώς συνεχίζει' },
      { de:'Frag, wie lange man genau braucht, und sag, dass du vor Einbruch der Dunkelheit zurück sein willst', es:'Pregunta cuánto se tarda exactamente y di que quieres estar de vuelta antes de que anochezca', en:'Ask exactly how long it takes and say you want to be back before dark', el:'Ρώτα πόση ώρα θέλει ακριβώς και πες ότι θέλεις να έχεις γυρίσει πριν νυχτώσει' }
    ],
    'b2.wetter': [
      { de:'Sag, dass ihr morgen nicht lesen könnt, falls der Wind nicht nachlässt, und was dir Sorgen macht', es:'Di que, como no amaine el viento, mañana no se podrá vendimiar, y qué te preocupa', en:'Say that if the wind doesn’t drop you won’t be able to pick tomorrow, and what worries you', el:'Πες ότι, αν δεν κοπάσει ο αέρας, αύριο δεν θα μπορέσετε να τρυγήσετε, και τι σε ανησυχεί' },
      { de:'Schlag vor, besser im Morgengrauen anzufangen, und sag, wann du da sein kannst — Hauptsache, es ist hell', es:'Propón que más vale empezar al amanecer y di a qué hora puedes estar, con tal de que haya luz', en:'Suggest you’d better start at dawn and say when you can be there, as long as it’s light', el:'Πρότεινε ότι καλύτερα να ξεκινήσετε με το χάραμα και πες τι ώρα μπορείς να είσαι εκεί, αρκεί να έχει φως' },
      { de:'Sag zu, die Kisten mitzubringen, und füg mit „mientras no“ eine Bedingung hinzu', es:'Acepta traer las cajas y añade una condición con «mientras no»', en:'Agree to bring the crates and add a condition with “mientras no”', el:'Δέξου να φέρετε τα τελάρα και πρόσθεσε έναν όρο με «mientras no»' }
    ]
  },

  stationen: {

    /* ── B2 · Granada — Verbrennung in der Küche (Feb) ──────────────── */
    'b2.arzt': {
      deineRolle: { de:'Du bist Aleksi. Beim Frittieren von Auberginen ist dir die Pfanne weggerutscht, und siedend heißes Öl ist auf deinen Handrücken gefallen. Du willst wissen, wie du die Wunde pflegst, und du brauchst eine Krankschreibung.', es:'Eres Aleksi. Estabas friendo berenjenas, se te resbaló la sartén y te cayó aceite hirviendo en el dorso de la mano. Quieres saber cómo curarte la quemadura y necesitas la baja.', en:'You are Aleksi. You were frying aubergines when the pan slipped and boiling oil landed on the back of your hand. You want to know how to look after the burn, and you need a sick note.', el:'Είσαι ο Αλέξι. Τηγάνιζες μελιτζάνες, σου γλίστρησε το τηγάνι και καυτό λάδι έπεσε στη ράχη του χεριού σου. Θέλεις να μάθεις πώς να φροντίσεις το έγκαυμα και χρειάζεσαι άδεια ασθενείας.' },
      abrundung: { z:'Le doy una semana de baja. Vuelva dentro de siete días y, si todo va bien, le doy el alta.', na:{ de:'Ich schreibe Sie eine Woche krank. Kommen Sie in sieben Tagen wieder, und wenn alles gut aussieht, schreibe ich Sie gesund.', en:'I’ll sign you off for a week. Come back in seven days and, if all is well, I’ll sign you fit for work.', el:'Σας δίνω μία εβδομάδα άδεια ασθενείας. Ελάτε σε επτά μέρες και, αν όλα πάνε καλά, θα σας γράψω ικανό για δουλειά.' } },
      rollen: {
        spikiu: { de:'Dr. Nieves Ortega, die Ärztin', es:'la doctora Nieves Ortega', en:'Dr Nieves Ortega, the GP', el:'η γιατρός Νιέβες Ορτέγα' },
        lerner: { de:'Aleksi, der Koch mit der verbrannten Hand', es:'Aleksi, el cocinero de la mano quemada', en:'Aleksi, the cook with the burnt hand', el:'ο Αλέξι, ο μάγειρας με το καμένο χέρι' },
        ort:    { de:'im Gesundheitszentrum in Granada', es:'en el centro de salud, en Granada', en:'at the health centre in Granada', el:'στο κέντρο υγείας στη Γρανάδα' }
      },
      wortschatz: [
        { z:'la quemadura',        na:{ de:'die Verbrennung',          en:'the burn', el:'το έγκαυμα' } },
        { z:'la ampolla',          na:{ de:'die Brandblase',           en:'the blister', el:'η φουσκάλα' } },
        { z:'la pomada',           na:{ de:'die Salbe',                en:'the ointment', el:'η αλοιφή' } },
        { z:'el apósito',          na:{ de:'der Wundverband',          en:'the dressing', el:'το επίθεμα' } },
        { z:'el dorso de la mano', na:{ de:'der Handrücken',           en:'the back of the hand', el:'η ράχη του χεριού' } },
        { z:'el centro de salud',  na:{ de:'das Gesundheitszentrum (Hausarzt)', en:'the health centre (GP surgery)', el:'το κέντρο υγείας' } },
        { z:'la baja',             na:{ de:'die Krankschreibung',      en:'the sick note, sick leave', el:'η άδεια ασθενείας' } },
        { z:'reventar',            na:{ de:'aufstechen, platzen lassen', en:'to burst', el:'σπάω (μια φουσκάλα)' } },
        { z:'cicatrizar',          na:{ de:'verheilen (Wunde)',        en:'to heal (a wound)', el:'επουλώνομαι' } },
        { z:'se me resbaló …',     na:{ de:'… ist mir weggerutscht',   en:'… slipped out of my hand', el:'μου γλίστρησε …' } },
        { z:'se me cayó …',        na:{ de:'… ist mir heruntergefallen', en:'I dropped … (by accident)', el:'μου έπεσε …' } },
        { z:'dar el alta',         na:{ de:'gesundschreiben',          en:'to sign someone fit for work', el:'γράφω κάποιον ικανό για δουλειά' } },
        { z:'el aceite hirviendo', na:{ de:'das siedend heiße Öl',     en:'boiling-hot oil', el:'το καυτό λάδι' } },
        { z:'en caso de que …',    na:{ de:'falls …',                  en:'in case …', el:'σε περίπτωση που …' } },
        { z:'siempre que …',       na:{ de:'sofern …, vorausgesetzt …', en:'as long as …', el:'αρκεί να …' } },
        { z:'aunque le moleste',   na:{ de:'auch wenn es Sie stört',   en:'even if it bothers you', el:'ακόμα κι αν σας ενοχλεί' } }
      ],
      dialog: {
        rolle: { de:'Dr. Nieves Ortega, die Ärztin', en:'Dr Nieves Ortega, the GP', el:'Η γιατρός Νιέβες Ορτέγα' },
        zeilen: [
          { wer:'spikiu', z:'Buenos días, siéntese. Veo que trae la mano vendada: ¿qué le ha pasado?', na:{ de:'Guten Morgen, setzen Sie sich. Ich sehe, Ihre Hand ist verbunden: Was ist passiert?', en:'Good morning, have a seat. I see your hand is bandaged — what happened?', el:'Καλημέρα, καθίστε. Βλέπω ότι έχετε το χέρι δεμένο: τι σας συνέβη;' } },
          { wer:'lerner', z:'Estaba friendo berenjenas y se me resbaló la sartén. Se me cayó aceite hirviendo en el dorso de la mano.', na:{ de:'Ich habe Auberginen frittiert, und die Pfanne ist mir weggerutscht. Siedend heißes Öl ist mir auf den Handrücken gefallen.', en:'I was frying aubergines and the pan slipped. Boiling oil landed on the back of my hand.', el:'Τηγάνιζα μελιτζάνες και μου γλίστρησε το τηγάνι. Μου έπεσε καυτό λάδι στη ράχη του χεριού.' } },
          { wer:'spikiu', z:'Vaya. Es una quemadura de segundo grado, pero superficial. No reviente la ampolla, aunque le moleste.', na:{ de:'Oje. Das ist eine Verbrennung zweiten Grades, aber oberflächlich. Stechen Sie die Blase nicht auf, auch wenn sie stört.', en:'Oh dear. It’s a second-degree burn, but a superficial one. Don’t burst the blister, even if it bothers you.', el:'Ωχ. Είναι έγκαυμα δευτέρου βαθμού, αλλά επιφανειακό. Μη σπάσετε τη φουσκάλα, ακόμα κι αν σας ενοχλεί.' } },
          { wer:'lerner', z:'¿Cuánta pomada me pongo, exactamente? Y en caso de que se infecte, ¿qué hago?', na:{ de:'Wie viel Salbe soll ich nehmen, ganz genau? Und falls es sich entzündet, was mache ich dann?', en:'How much ointment should I put on, exactly? And in case it gets infected, what do I do?', el:'Πόση αλοιφή να βάλω, ακριβώς; Και σε περίπτωση που μολυνθεί, τι κάνω;' } },
          { wer:'spikiu', z:'Una capa fina, a ojo. Cambie el apósito cada día y, si tiene fiebre, vuelva enseguida. Siempre que la mantenga limpia, cicatrizará en unos diez días.', na:{ de:'Eine dünne Schicht, nach Augenmaß. Wechseln Sie den Verband jeden Tag, und wenn Sie Fieber bekommen, kommen Sie sofort wieder. Sofern Sie die Wunde sauber halten, heilt sie in etwa zehn Tagen.', en:'A thin layer — just judge it by eye. Change the dressing every day and, if you get a temperature, come back straight away. As long as you keep it clean, it will heal in about ten days.', el:'Ένα λεπτό στρώμα, με το μάτι. Να αλλάζετε το επίθεμα κάθε μέρα και, αν έχετε πυρετό, να έρθετε αμέσως. Αρκεί να το κρατάτε καθαρό, θα επουλωθεί σε περίπου δέκα μέρες.' } },
          { wer:'lerner', z:'¿Me podría dar la baja? Soy cocinero y, con la mano así, no puedo trabajar.', na:{ de:'Könnten Sie mich krankschreiben? Ich bin Koch, und mit der Hand so kann ich nicht arbeiten.', en:'Could you give me a sick note? I’m a cook, and with my hand like this I can’t work.', el:'Θα μπορούσατε να μου δώσετε άδεια ασθενείας; Είμαι μάγειρας και, με το χέρι έτσι, δεν μπορώ να δουλέψω.' } }
        ]
      },
      lesetext: {
        z:'Hoy se me resbaló la sartén y me quemé el dorso de la mano. La doctora Ortega me ha dado una semana de baja. Por la tarde, aunque me dolía, subí al mirador de San Nicolás: la Alhambra y, detrás, la nieve de Sierra Nevada. Para mi cuaderno: se me resbaló.',
        na:{ de:'Heute ist mir die Pfanne weggerutscht, und ich habe mir den Handrücken verbrannt. Dr. Ortega hat mich eine Woche krankgeschrieben. Am Nachmittag bin ich, obwohl es wehtat, zum Aussichtspunkt San Nicolás hinaufgestiegen: die Alhambra und dahinter der Schnee der Sierra Nevada. Für mein Heft: se me resbaló.',
             en:'Today the pan slipped out of my hand and I burnt the back of my hand. Dr Ortega has signed me off for a week. In the afternoon, although it hurt, I walked up to the San Nicolás viewpoint: the Alhambra and, behind it, the snow on the Sierra Nevada. For my notebook: se me resbaló.',
             el:'Σήμερα μου γλίστρησε το τηγάνι και έκαψα τη ράχη του χεριού μου. Η γιατρός Ορτέγα μού έδωσε μία εβδομάδα άδεια ασθενείας. Το απόγευμα, αν και πονούσε, ανέβηκα στο σημείο θέας του Σαν Νικολάς: η Αλάμπρα και, πίσω της, το χιόνι της Σιέρα Νεβάδα. Για το τετράδιό μου: se me resbaló.' },
        frage:{ de:'Wie lange ist Aleksi krankgeschrieben?', en:'How long has Aleksi been signed off for?', el:'Για πόσο καιρό πήρε ο Αλέξι άδεια ασθενείας;' },
        optionen:[
          { na:{ de:'Eine Woche',                      en:'One week', el:'Μία εβδομάδα' }, richtig:true  },
          { na:{ de:'Zehn Tage',                       en:'Ten days', el:'Δέκα μέρες' }, richtig:false },
          { na:{ de:'Gar nicht — er arbeitet weiter',  en:'Not at all — he keeps working', el:'Καθόλου — συνεχίζει να δουλεύει' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähl ein kleines Missgeschick mit „se me…“ und sag, was du tust, falls es nicht gut ausgeht. Zwei Sätze.',
                  en:'Tell a small mishap with “se me…” and say what you’ll do in case it doesn’t turn out well. Two sentences.', el:'Διηγήσου μια μικρή αναποδιά με «se me…» και πες τι θα κάνεις σε περίπτωση που δεν πάει καλά. Δύο προτάσεις.' },
        muster:'Ayer se me cayó el móvil y se me rompió la pantalla. En caso de que no se pueda arreglar, me compraré otro.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Se me cayó la sartén“ heißt: Die Pfanne ist mir heruntergefallen — aus Versehen, nicht mit Absicht. So baust du es: se + me/te/le + was passiert ist. Genauso: se me olvidó, se me rompió. Nach „en caso de que“ (falls) und „siempre que“ (sofern) kommt der Subjuntivo: en caso de que se infecte.',
               en:'“Se me cayó la sartén” means: the pan fell — by accident, not on purpose. The pattern: se + me/te/le + what happened. Likewise: se me olvidó (it slipped my mind), se me rompió (it broke on me). After “en caso de que” (in case) and “siempre que” (as long as) comes the subjuntivo: en caso de que se infecte.',
               el:'Το «se me cayó la sartén» σημαίνει: μου έπεσε το τηγάνι — κατά λάθος, όχι επίτηδες. Το σχήμα: se + me/te/le + αυτό που έγινε. Το ίδιο: se me olvidó (μου ξέφυγε), se me rompió (μου έσπασε). Μετά το «en caso de que» (σε περίπτωση που) και το «siempre que» (αρκεί να) έρχεται subjuntivo: en caso de que se infecte.' },
        beispiele:[
          { z:'Se me cayó la sartén.',                na:{ de:'Mir ist die Pfanne heruntergefallen.', en:'I dropped the pan.', el:'Μου έπεσε το τηγάνι.' } },
          { z:'En caso de que tenga fiebre, vuelva.', na:{ de:'Falls Sie Fieber bekommen, kommen Sie wieder.', en:'In case you get a temperature, come back.', el:'Σε περίπτωση που έχετε πυρετό, ελάτε ξανά.' } }
        ]
      },
      kultur: { de:'In Granada bekommt man in vielen Bars zu jedem Getränk eine Tapa gratis — oft frittierte Auberginen mit Zuckerrohrhonig. Die Krankschreibung („la baja“) stellt in Spanien meist der Hausarzt im Centro de Salud aus.',
                en:'In Granada many bars give you a free tapa with every drink — often fried aubergines with cane honey. In Spain the sick note (“la baja”) is usually issued by your GP at the local health centre.',
                el:'Στη Γρανάδα πολλά μπαρ σού δίνουν δωρεάν τάπα με κάθε ποτό — συχνά τηγανητές μελιτζάνες με μέλι από ζαχαροκάλαμο. Στην Ισπανία την άδεια ασθενείας («la baja») τη βγάζει συνήθως ο οικογενειακός γιατρός στο κέντρο υγείας.' }
    },

    /* ── B2 · Valencia — die undichte Paellera (März, Fallas) ────────── */
    'b2.einkaufen': {
      deineRolle: { de:'Du bist Aleksi. Vor einer Woche hast du in einem Laden beim Mercado Central eine Paellapfanne gekauft. Gleich beim ersten Mal ist sie am Griff gerissen und tropft. Du willst keinen Streit, aber eine Lösung.', es:'Eres Aleksi. Hace una semana compraste una paellera en una tienda junto al Mercado Central. La primera vez que la usaste se agrietó junto al asa y ahora gotea. No quieres discutir, pero sí una solución.', en:'You are Aleksi. A week ago you bought a paella pan in a shop by the Mercado Central. The very first time you used it, it cracked by the handle and now it leaks. You don’t want an argument, but you do want a solution.', el:'Είσαι ο Αλέξι. Πριν από μία εβδομάδα αγόρασες ένα τηγάνι για παέγια σε ένα μαγαζί δίπλα στην Κεντρική Αγορά. Την πρώτη φορά που το χρησιμοποίησες ράγισε δίπλα στο χερούλι και τώρα στάζει. Δεν θέλεις καβγά, αλλά θέλεις λύση.' },
      eroeffnung: { z:'¡Bon dia! Pase, pase. ¿Qué se le ofrece?', na:{ de:'Bon dia! (Valencianisch für „Guten Morgen“.) Kommen Sie herein. Was darf es sein?', en:'Bon dia! (Valencian for “good morning”.) Come in, come in. What can I do for you?', el:'Bon dia! («Καλημέρα» στα βαλενθιανά.) Περάστε, περάστε. Τι θα θέλατε;' } },
      abrundung: { z:'¡Bones Falles! Y en la paella, nada de chorizo, ¿eh?', na:{ de:'Schöne Fallas! Und in die Paella kommt keine Chorizo, ja?', en:'Happy Fallas! And no chorizo in the paella, all right?', el:'Καλές Φάγιες! Και στην παέγια, καθόλου τσορίθο, εντάξει;' } },
      rollen: {
        spikiu: { de:'Vicent, der Ladenbesitzer', es:'Vicent, el dueño de la tienda', en:'Vicent, the shop owner', el:'ο Βισέντ, ο ιδιοκτήτης του μαγαζιού' },
        lerner: { de:'Aleksi, der unzufriedene Kunde', es:'Aleksi, el cliente descontento', en:'Aleksi, the unhappy customer', el:'ο Αλέξι, ο δυσαρεστημένος πελάτης' },
        ort:    { de:'in einem Haushaltswarenladen beim Mercado Central, Valencia', es:'en una tienda de menaje junto al Mercado Central de Valencia', en:'in a kitchenware shop by the Mercado Central, Valencia', el:'σε ένα κατάστημα με είδη κουζίνας δίπλα στην Κεντρική Αγορά της Βαλένθιας' }
      },
      wortschatz: [
        { z:'la paellera',          na:{ de:'die Paellapfanne',         en:'the paella pan', el:'το τηγάνι για παέγια' } },
        { z:'la grieta',            na:{ de:'der Riss',                 en:'the crack', el:'η ρωγμή' } },
        { z:'el asa',               na:{ de:'der Griff, der Henkel',    en:'the handle', el:'το χερούλι' } },
        { z:'el defecto de fábrica',na:{ de:'der Herstellungsfehler',   en:'the manufacturing defect', el:'το εργοστασιακό ελάττωμα' } },
        { z:'la garantía',          na:{ de:'die Garantie',             en:'the guarantee', el:'η εγγύηση' } },
        { z:'el reembolso',         na:{ de:'die Rückerstattung',       en:'the refund', el:'η επιστροφή χρημάτων' } },
        { z:'el menaje',            na:{ de:'die Haushaltswaren (Küche)', en:'kitchenware', el:'τα είδη κουζίνας' } },
        { z:'agrietarse',           na:{ de:'Risse bekommen',           en:'to crack', el:'ραγίζω' } },
        { z:'gotear',               na:{ de:'tropfen, undicht sein',    en:'to leak, to drip', el:'στάζω' } },
        { z:'aguantar',             na:{ de:'aushalten',                en:'to withstand, to take', el:'αντέχω' } },
        { z:'el acero pulido',      na:{ de:'der polierte Stahl', en:'polished steel', el:'το γυαλισμένο ατσάλι' } },
        { z:'de regalo',            na:{ de:'als Geschenk, gratis dazu', en:'as a gift, thrown in', el:'δώρο' } },
        { z:'¡que no se diga!',     na:{ de:'es soll keiner sagen …!',  en:'nobody will say …!', el:'να μη λέγεται!' } },
        { z:'me dijeron que …; sin embargo …', na:{ de:'man sagte mir …; trotzdem …', en:'I was told …; however …', el:'μου είπαν ότι …· κι όμως …' } },
        { z:'no pretendo …, solo …',na:{ de:'ich will nicht …, nur …',   en:'I’m not trying to …, I just …', el:'δεν θέλω να …, απλώς …' } },
        { z:'¿qué solución me propone?', na:{ de:'welche Lösung schlagen Sie vor?', en:'what solution do you suggest?', el:'τι λύση μού προτείνετε;' } }
      ],
      dialog: {
        rolle: { de:'Vicent, der Ladenbesitzer', en:'Vicent, the shop owner', el:'Ο Βισέντ, ο ιδιοκτήτης του μαγαζιού' },
        zeilen: [
          { wer:'lerner', z:'Buenos días. Hace una semana le compré esta paellera y ya gotea: se ha agrietado junto al asa.', na:{ de:'Guten Morgen. Vor einer Woche habe ich bei Ihnen diese Paellapfanne gekauft, und sie tropft schon: Am Griff ist ein Riss entstanden.', en:'Good morning. I bought this paella pan from you a week ago and it already leaks: it has cracked by the handle.', el:'Καλημέρα. Πριν από μία εβδομάδα σας αγόρασα αυτό το τηγάνι για παέγια και ήδη στάζει: έχει ραγίσει δίπλα στο χερούλι.' } },
          { wer:'spikiu', z:'¿Agrietada? Imposible: son paelleras de acero pulido, de toda la vida. ¿No la habrá puesto al fuego vacía?', na:{ de:'Gerissen? Unmöglich: Das sind Paellapfannen aus poliertem Stahl, wie eh und je. Sie haben sie doch nicht etwa leer aufs Feuer gestellt?', en:'Cracked? Impossible — these are polished steel paella pans, the traditional kind. You didn’t put it on the heat empty, did you?', el:'Ραγισμένο; Αδύνατον: είναι τηγάνια από γυαλισμένο ατσάλι, από τα παραδοσιακά. Μήπως το βάλατε άδειο στη φωτιά;' } },
          { wer:'lerner', z:'Me dijeron que aguantaba cualquier fuego; sin embargo, se agrietó el primer día. No pretendo culpar a nadie, solo quiero una que no gotee.', na:{ de:'Man hat mir gesagt, sie halte jedes Feuer aus; trotzdem ist sie am ersten Tag gerissen. Ich will niemandem die Schuld geben, ich möchte nur eine, die nicht tropft.', en:'I was told it could take any heat; however, it cracked on the first day. I’m not trying to blame anyone — I just want one that doesn’t leak.', el:'Μου είπαν ότι αντέχει σε κάθε φωτιά· κι όμως, ράγισε την πρώτη μέρα. Δεν θέλω να κατηγορήσω κανέναν, απλώς θέλω ένα που να μη στάζει.' } },
          { wer:'spikiu', z:'A ver, déjeme mirar… Pues tiene razón, es un defecto de fábrica. Y está en garantía.', na:{ de:'Mal sehen, lassen Sie mich schauen … Sie haben recht, das ist ein Herstellungsfehler. Und sie hat noch Garantie.', en:'Let me have a look … Well, you’re right, it’s a manufacturing defect. And it’s under guarantee.', el:'Για να δω… Έχετε δίκιο, είναι εργοστασιακό ελάττωμα. Και είναι στην εγγύηση.' } },
          { wer:'lerner', z:'Entonces, ¿qué solución me propone? ¿Me la cambia o me hace un reembolso?', na:{ de:'Welche Lösung schlagen Sie mir dann vor? Tauschen Sie sie um, oder erstatten Sie mir das Geld?', en:'So what solution do you suggest? Will you exchange it or give me a refund?', el:'Τότε, τι λύση μού προτείνετε; Θα μου το αλλάξετε ή θα μου επιστρέψετε τα χρήματα;' } },
          { wer:'spikiu', z:'Se la cambio ahora mismo y le doy de regalo un paquete de arroz. ¡Que no se diga que en Valencia tratamos mal a un cocinero!', na:{ de:'Ich tausche sie sofort um und schenke Ihnen eine Packung Reis dazu. Es soll keiner sagen, dass wir in Valencia einen Koch schlecht behandeln!', en:'I’ll swap it right now and throw in a packet of rice as a gift. Nobody will say we treat a cook badly in Valencia!', el:'Σας το αλλάζω αμέσως και σας δίνω δώρο ένα πακέτο ρύζι. Να μη λέγεται ότι στη Βαλένθια φερόμαστε άσχημα σε έναν μάγειρα!' } }
        ]
      },
      lesetext: {
        z:'En Valencia, en Fallas, los petardos empiezan a las ocho de la mañana. Hoy devolví la paellera rota. Vicent primero dijo que era imposible; sin embargo, al final me la cambió y me regaló arroz. Esta noche queman las fallas, figuras enormes de cartón y madera. Para mi cuaderno: de toda la vida.',
        na:{ de:'In Valencia beginnen während der Fallas die Böller um acht Uhr morgens. Heute habe ich die kaputte Paellapfanne zurückgebracht. Vicent sagte zuerst, das sei unmöglich; am Ende hat er sie aber umgetauscht und mir Reis geschenkt. Heute Nacht verbrennen sie die Fallas, riesige Figuren aus Pappe und Holz. Für mein Heft: de toda la vida.',
             en:'In Valencia, during the Fallas, the firecrackers start at eight in the morning. Today I took the broken paella pan back. Vicent first said it was impossible; however, in the end he exchanged it and gave me some rice. Tonight they burn the fallas, huge figures made of cardboard and wood. For my notebook: de toda la vida.',
             el:'Στη Βαλένθια, τις μέρες των Φάγιες, τα βεγγαλικά αρχίζουν στις οχτώ το πρωί. Σήμερα επέστρεψα το χαλασμένο τηγάνι. Ο Βισέντ στην αρχή είπε ότι είναι αδύνατον· στο τέλος όμως μου το άλλαξε και μου χάρισε ρύζι. Απόψε καίνε τις φάγιες, τεράστιες φιγούρες από χαρτόνι και ξύλο. Για το τετράδιό μου: de toda la vida.' },
        frage:{ de:'Was hat Vicent am Ende getan?', en:'What did Vicent do in the end?', el:'Τι έκανε τελικά ο Βισέντ;' },
        optionen:[
          { na:{ de:'Er hat die Pfanne umgetauscht und Reis dazugegeben', en:'He exchanged the pan and added some rice', el:'Άλλαξε το τηγάνι και πρόσθεσε ρύζι' }, richtig:true  },
          { na:{ de:'Er hat das Geld zurückgegeben',                     en:'He gave the money back', el:'Επέστρεψε τα χρήματα' }, richtig:false },
          { na:{ de:'Er hat den Umtausch abgelehnt',                     en:'He refused to exchange it', el:'Αρνήθηκε να το αλλάξει' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Schreib eine kurze, höfliche Reklamation: was man dir versprochen hat, was trotzdem passiert ist („sin embargo“) und was du willst („no pretendo…, solo…“). Zwei Sätze.',
                  en:'Write a short, polite complaint: what you were promised, what happened anyway (“sin embargo”) and what you want (“no pretendo…, solo…”). Two sentences.', el:'Γράψε ένα σύντομο, ευγενικό παράπονο: τι σου υποσχέθηκαν, τι έγινε παρ’ όλα αυτά («sin embargo») και τι θέλεις («no pretendo…, solo…»). Δύο προτάσεις.' },
        muster:'Me dijeron que el ordenador aguantaba golpes; sin embargo, se rompió la primera semana. No pretendo discutir, solo quiero que me lo cambien.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Höflich, aber fest: Sag zuerst, was man dir versprochen hat — „me dijeron que aguantaba…“ —, dann mit „sin embargo“ (trotzdem), was passiert ist. „No pretendo…, solo…“ nimmt die Schärfe heraus: Du willst niemandem etwas vorwerfen, nur eine Lösung. Vorsicht: „pretender“ heißt „vorhaben“, nicht „vortäuschen“.',
               en:'Polite but firm: first say what you were promised — “me dijeron que aguantaba…” — then, with “sin embargo” (however), what actually happened. “No pretendo…, solo…” takes the edge off: you’re not blaming anyone, you just want a solution. Careful: “pretender” means “to intend”, not “to pretend”.',
               el:'Ευγενικά αλλά σταθερά: πες πρώτα τι σου υποσχέθηκαν — «me dijeron que aguantaba…» — και μετά, με το «sin embargo» (κι όμως), τι έγινε. Το «no pretendo…, solo…» μαλακώνει τον τόνο: δεν κατηγορείς κανέναν, θέλεις μόνο μια λύση. Προσοχή: το «pretender» σημαίνει «σκοπεύω», όχι «προσποιούμαι».' },
        beispiele:[
          { z:'Me dijeron que aguantaba el fuego; sin embargo, se agrietó.', na:{ de:'Man sagte mir, sie halte das Feuer aus; trotzdem ist sie gerissen.', en:'I was told it could take the heat; however, it cracked.', el:'Μου είπαν ότι αντέχει τη φωτιά· κι όμως, ράγισε.' } },
          { z:'No pretendo discutir, solo quiero una solución.',            na:{ de:'Ich will nicht streiten, ich möchte nur eine Lösung.', en:'I’m not trying to argue, I just want a solution.', el:'Δεν θέλω να μαλώσω, θέλω μόνο μια λύση.' } }
        ]
      },
      kultur: { de:'Im Valencianischen heißt eigentlich die Pfanne selbst „paella“; die klassische Paella valenciana kommt mit Huhn, Kaninchen und grünen Bohnen — ohne Meeresfrüchte und ohne Chorizo. Die Fallas enden in der Nacht des 19. März mit der „Cremà“, wenn die großen Figuren verbrannt werden.',
                en:'In Valencian, “paella” is actually the name of the pan itself; the classic paella valenciana has chicken, rabbit and green beans — no seafood and no chorizo. The Fallas end on the night of 19 March with the “Cremà”, when the huge figures are burnt.',
                el:'Στα βαλενθιανά «paella» λέγεται στην πραγματικότητα το ίδιο το τηγάνι· η κλασική paella valenciana έχει κοτόπουλο, κουνέλι και φασολάκια — χωρίς θαλασσινά και χωρίς τσορίθο. Οι Φάγιες τελειώνουν τη νύχτα της 19ης Μαρτίου με την «Cremà», όταν καίγονται οι τεράστιες φιγούρες.' }
    },

    /* ── B2 · Sevilla — die vergessene Messertasche (April, Feria) ───── */
    'b2.taxi': {
      deineRolle: { de:'Du bist Aleksi. Heute früh hast du am Bahnhof Santa Justa ein Taxi genommen und deine Messertasche darin vergessen: braunes Leder, sieben Messer. Der Fahrer war ein älterer Herr mit Schnurrbart, der Sevillanas sang. Ausgestiegen bist du gegen zehn in der Calle Betis in Triana.', es:'Eres Aleksi. Esta mañana cogiste un taxi en la estación de Santa Justa y te dejaste dentro tu estuche de cuchillos: cuero marrón, siete cuchillos. El taxista era un señor mayor con bigote que cantaba sevillanas. Te bajaste sobre las diez en la calle Betis, en Triana.', en:'You are Aleksi. This morning you took a taxi at Santa Justa station and left your knife roll in it: brown leather, seven knives. The driver was an older man with a moustache who was singing sevillanas. You got out at around ten on Calle Betis, in Triana.', el:'Είσαι ο Αλέξι. Σήμερα το πρωί πήρες ταξί από τον σταθμό Σάντα Χούστα και ξέχασες μέσα τη θήκη με τα μαχαίρια σου: καφέ δέρμα, εφτά μαχαίρια. Ο ταξιτζής ήταν ένας ηλικιωμένος κύριος με μουστάκι που τραγουδούσε σεβιγιάνας. Κατέβηκες γύρω στις δέκα στην οδό Μπέτις, στην Τριάνα.' },
      abrundung: { z:'¡Ese es Manolo! Lo localizo ahora mismo y le devolvemos la llamada en cinco minutos.', na:{ de:'Das ist Manolo! Ich mache ihn sofort ausfindig, und wir rufen Sie in fünf Minuten zurück.', en:'That’s Manolo! I’ll track him down right away and we’ll call you back in five minutes.', el:'Αυτός είναι ο Μανόλο! Τον εντοπίζω αμέσως και σας ξανακαλούμε σε πέντε λεπτά.' } },
      rollen: {
        spikiu: { de:'Rocío von der Taxizentrale', es:'Rocío, de la centralita de Radiotaxi', en:'Rocío at the taxi switchboard', el:'η Ροθίο από το κέντρο ραδιοταξί' },
        lerner: { de:'Aleksi, der Fahrgast, der seine Messer vergessen hat', es:'Aleksi, el pasajero que se dejó los cuchillos', en:'Aleksi, the passenger who left his knives behind', el:'ο Αλέξι, ο επιβάτης που ξέχασε τα μαχαίρια του' },
        ort:    { de:'am Telefon, in Sevilla mitten in der Feria', es:'al teléfono, en Sevilla, en plena Feria', en:'on the phone in Seville, in the middle of the Feria', el:'στο τηλέφωνο, στη Σεβίλλη, εν μέσω Φέριας' }
      },
      wortschatz: [
        { z:'el estuche',           na:{ de:'das Etui, die Tasche',     en:'the case', el:'η θήκη' } },
        { z:'el cuero',             na:{ de:'das Leder',                en:'leather', el:'το δέρμα' } },
        { z:'la carrera',           na:{ de:'die Taxifahrt',            en:'the fare, the ride', el:'η κούρσα' } },
        { z:'la centralita',        na:{ de:'die (Telefon-)Zentrale',   en:'the switchboard', el:'το τηλεφωνικό κέντρο' } },
        { z:'la oficina de objetos perdidos', na:{ de:'das Fundbüro',   en:'lost property', el:'το γραφείο απολεσθέντων' } },
        { z:'el bigote',            na:{ de:'der Schnurrbart',          en:'the moustache', el:'το μουστάκι' } },
        { z:'la matrícula',         na:{ de:'das Nummernschild',        en:'the number plate', el:'η πινακίδα κυκλοφορίας' } },
        { z:'dejarse algo',         na:{ de:'etwas liegen lassen',      en:'to leave something behind', el:'ξεχνάω κάτι κάπου' } },
        { z:'localizar',            na:{ de:'ausfindig machen',         en:'to track down', el:'εντοπίζω' } },
        { z:'bajarse de',           na:{ de:'aussteigen aus',           en:'to get out of', el:'κατεβαίνω από' } },
        { z:'con detalle',          na:{ de:'genau, ausführlich',       en:'in detail', el:'λεπτομερώς' } },
        { z:'le atiende …',         na:{ de:'hier spricht … (am Telefon)', en:'… speaking (on the phone)', el:'σας εξυπηρετεί …' } },
        { z:'devolver la llamada',  na:{ de:'zurückrufen',              en:'to call back', el:'ξανακαλώ (κάποιον)' } },
        { z:'el taxi que cogí',     na:{ de:'das Taxi, das ich genommen habe', en:'the taxi I took', el:'το ταξί που πήρα' } },
        { z:'… en el que hay …',    na:{ de:'… in dem … ist',           en:'… with … in it', el:'… μέσα στο οποίο υπάρχει …' } },
        { z:'… con los que trabajo',na:{ de:'… mit denen ich arbeite',  en:'… that I work with', el:'… με τα οποία δουλεύω' } }
      ],
      dialog: {
        rolle: { de:'Rocío von der Taxizentrale', en:'Rocío at the taxi switchboard', el:'Η Ροθίο από το κέντρο ραδιοταξί' },
        zeilen: [
          { wer:'spikiu', z:'Radiotaxi, buenas tardes, le atiende Rocío. ¿En qué puedo ayudarle?', na:{ de:'Funktaxi, guten Tag, hier spricht Rocío. Wie kann ich Ihnen helfen?', en:'Radio taxis, good afternoon, Rocío speaking. How can I help you?', el:'Ραδιοταξί, καλησπέρα, σας εξυπηρετεί η Ροθίο. Πώς μπορώ να σας βοηθήσω;' } },
          { wer:'lerner', z:'Buenas tardes. Me dejé algo muy importante en el taxi que cogí esta mañana en la estación de Santa Justa.', na:{ de:'Guten Tag. Ich habe etwas sehr Wichtiges in dem Taxi liegen lassen, das ich heute Morgen am Bahnhof Santa Justa genommen habe.', en:'Good afternoon. I left something very important in the taxi I took this morning at Santa Justa station.', el:'Καλησπέρα. Ξέχασα κάτι πολύ σημαντικό στο ταξί που πήρα σήμερα το πρωί από τον σταθμό Σάντα Χούστα.' } },
          { wer:'spikiu', z:'Vaya. Si nadie lo ha llevado a la oficina de objetos perdidos, lo buscamos nosotros. ¿Me lo describe con detalle?', na:{ de:'Oje. Wenn es niemand ins Fundbüro gebracht hat, suchen wir selbst. Beschreiben Sie es mir genau?', en:'Oh dear. If nobody has taken it to lost property, we’ll look for it ourselves. Could you describe it in detail?', el:'Ωχ. Αν δεν το έχει πάει κανείς στο γραφείο απολεσθέντων, θα το ψάξουμε εμείς. Μου το περιγράφετε λεπτομερώς;' } },
          { wer:'lerner', z:'Es un estuche de cuero marrón, enrollado, en el que hay siete cuchillos. Son los cuchillos con los que trabajo desde hace quince años.', na:{ de:'Es ist eine aufgerollte Tasche aus braunem Leder, in der sieben Messer stecken. Es sind die Messer, mit denen ich seit fünfzehn Jahren arbeite.', en:'It’s a rolled-up brown leather case with seven knives in it. They’re the knives I’ve been working with for fifteen years.', el:'Είναι μια τυλιχτή θήκη από καφέ δέρμα, μέσα στην οποία υπάρχουν εφτά μαχαίρια. Είναι τα μαχαίρια με τα οποία δουλεύω εδώ και δεκαπέντε χρόνια.' } },
          { wer:'spikiu', z:'Con la Feria tenemos cientos de carreras al día. ¿Recuerda algo del taxista o de dónde se bajó?', na:{ de:'Wegen der Feria haben wir Hunderte Fahrten am Tag. Erinnern Sie sich an etwas beim Fahrer oder daran, wo Sie ausgestiegen sind?', en:'With the Feria on, we have hundreds of fares a day. Do you remember anything about the driver, or where you got out?', el:'Με τη Φέρια έχουμε εκατοντάδες κούρσες τη μέρα. Θυμάστε κάτι για τον ταξιτζή ή πού κατεβήκατε;' } },
          { wer:'lerner', z:'El taxista que me llevó era un señor mayor con bigote, que cantaba sevillanas. Me bajé sobre las diez en la calle Betis, en Triana.', na:{ de:'Der Fahrer, der mich gefahren hat, war ein älterer Herr mit Schnurrbart, der Sevillanas sang. Ich bin gegen zehn in der Calle Betis in Triana ausgestiegen.', en:'The driver who took me was an older man with a moustache who was singing sevillanas. I got out at around ten on Calle Betis, in Triana.', el:'Ο ταξιτζής που με πήγε ήταν ένας ηλικιωμένος κύριος με μουστάκι, που τραγουδούσε σεβιγιάνας. Κατέβηκα γύρω στις δέκα στην οδό Μπέτις, στην Τριάνα.' } }
        ]
      },
      lesetext: {
        z:'Por la mañana me dejé los cuchillos en un taxi. Llamé a la centralita y describí el estuche como si fuera un plato: cuero, siete cuchillos, olor a cebolla. No me fijé en la matrícula, pero sí en el bigote del taxista. A las dos me los trajo a la pensión. Para mi cuaderno: dejarse algo.',
        na:{ de:'Am Morgen habe ich meine Messer in einem Taxi liegen lassen. Ich rief die Zentrale an und beschrieb die Tasche wie ein Gericht: Leder, sieben Messer, Zwiebelgeruch. Auf das Nummernschild habe ich nicht geachtet, aber auf den Schnurrbart des Fahrers. Um zwei brachte er sie mir in die Pension. Für mein Heft: dejarse algo.',
             en:'This morning I left my knives in a taxi. I rang the switchboard and described the case as if it were a dish: leather, seven knives, a smell of onion. I didn’t notice the number plate, but I did notice the driver’s moustache. At two he brought them to my guesthouse. For my notebook: dejarse algo.',
             el:'Το πρωί ξέχασα τα μαχαίρια μου σε ένα ταξί. Τηλεφώνησα στο κέντρο και περιέγραψα τη θήκη σαν να ήταν πιάτο: δέρμα, εφτά μαχαίρια, μυρωδιά κρεμμυδιού. Δεν πρόσεξα την πινακίδα, πρόσεξα όμως το μουστάκι του ταξιτζή. Στις δύο μού τα έφερε στην πανσιόν. Για το τετράδιό μου: dejarse algo.' },
        frage:{ de:'Was hatte sich Aleksi vom Taxi gemerkt?', en:'What had Aleksi remembered about the taxi?', el:'Τι είχε συγκρατήσει ο Αλέξι από το ταξί;' },
        optionen:[
          { na:{ de:'Den Schnurrbart des Fahrers', en:'The driver’s moustache', el:'Το μουστάκι του ταξιτζή' }, richtig:true  },
          { na:{ de:'Das Nummernschild',           en:'The number plate', el:'Την πινακίδα' }, richtig:false },
          { na:{ de:'Den Namen des Fahrers',       en:'The driver’s name', el:'Το όνομα του ταξιτζή' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Beschreib einen Gegenstand, den du verloren hast, ganz genau — mit „en el que“ oder „con el que“. Zwei Sätze.',
                  en:'Describe something you have lost very precisely — with “en el que” or “con el que”. Two sentences.', el:'Περιέγραψε με ακρίβεια κάτι που έχασες — με «en el que» ή «con el que». Δύο προτάσεις.' },
        muster:'Es una mochila azul en la que llevo el ordenador. Es la mochila con la que viajo siempre.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Mit „que“ hängst du eine Beschreibung direkt an: el taxi que cogí. Steht davor ein kleines Wort wie en, con oder de, sagst du „el que / la que / los que“: un estuche en el que hay siete cuchillos, los cuchillos con los que trabajo. Übrigens: In Spanien „coge“ man ein Taxi ganz normal.',
               en:'With “que” you attach a description straight on: el taxi que cogí. If a little word like en, con or de comes first, say “el que / la que / los que”: un estuche en el que hay siete cuchillos, los cuchillos con los que trabajo. By the way: in Spain you simply “coger” a taxi.',
               el:'Με το «que» κολλάς αμέσως μια περιγραφή: el taxi que cogí. Αν μπροστά υπάρχει ένα μικρό λεξάκι όπως en, con ή de, λες «el que / la que / los que»: un estuche en el que hay siete cuchillos, los cuchillos con los que trabajo. Παρεμπιπτόντως: στην Ισπανία «coger» ένα ταξί είναι απολύτως φυσικό.' },
        beispiele:[
          { z:'Es el taxi que cogí esta mañana.',          na:{ de:'Das ist das Taxi, das ich heute Morgen genommen habe.', en:'It’s the taxi I took this morning.', el:'Είναι το ταξί που πήρα σήμερα το πρωί.' } },
          { z:'Es un estuche en el que hay siete cuchillos.', na:{ de:'Es ist eine Tasche, in der sieben Messer stecken.', en:'It’s a case with seven knives in it.', el:'Είναι μια θήκη μέσα στην οποία υπάρχουν εφτά μαχαίρια.' } }
        ]
      },
      kultur: { de:'Die Feria de Abril in Sevilla beginnt meist zwei Wochen nach Ostern; auf dem Festgelände im Viertel Los Remedios stehen Hunderte Festzelte, die „casetas“. Triana, am anderen Ufer des Guadalquivir, ist berühmt für Flamenco und Keramik.',
                en:'Seville’s Feria de Abril usually starts two weeks after Easter; the fairground in the Los Remedios district fills with hundreds of marquees, the “casetas”. Triana, across the Guadalquivir, is famous for flamenco and ceramics.',
                el:'Η Φέρια ντε Αμπρίλ της Σεβίλλης ξεκινά συνήθως δύο εβδομάδες μετά το Πάσχα· στον χώρο της γιορτής, στη συνοικία Λος Ρεμέδιος, στήνονται εκατοντάδες σκηνές, οι «casetas». Η Τριάνα, στην άλλη όχθη του Γουαδαλκιβίρ, φημίζεται για το φλαμένκο και τα κεραμικά της.' }
    },

    /* ── B2 · Picos de Europa — der Weg zur Cabrales-Höhle (Mai) ────── */
    'b2.wegbeschreibung': {
      duzen: true,
      deineRolle: { de:'Du bist Aleksi. Morgen willst du allein zur Höhle hinauf, in der Benitos Cabrales reift. Lass dir den Weg erklären, wiederhole ihn zur Sicherheit und frag, wie lange du brauchst — du willst vor Einbruch der Dunkelheit zurück sein.', es:'Eres Aleksi. Mañana quieres subir solo a la cueva donde madura el cabrales de Benito. Pide que te explique el camino, repítelo para asegurarte y pregunta cuánto se tarda: quieres estar de vuelta antes de que anochezca.', en:'You are Aleksi. Tomorrow you want to go up alone to the cave where Benito’s Cabrales matures. Get him to explain the way, repeat it to be sure and ask how long it takes — you want to be back before dark.', el:'Είσαι ο Αλέξι. Αύριο θέλεις να ανέβεις μόνος στη σπηλιά όπου ωριμάζει το καμπράλες του Μπενίτο. Ζήτα να σου εξηγήσει τον δρόμο, επανάλαβέ τον για σιγουριά και ρώτα πόση ώρα θέλει — θέλεις να έχεις γυρίσει πριν νυχτώσει.' },
      eroeffnung: { z:'¡Hombre, el finlandés! ¿Qué, otra vez por aquí arriba?', na:{ de:'Na so was, der Finne! Was, schon wieder hier oben?', en:'Well, if it isn’t the Finn! What, up here again?', el:'Για δες, ο Φινλανδός! Τι, πάλι εδώ πάνω;' } },
      abrundung: { z:'Toma, llévate pan y un trozo de queso. Si te pierdes, por lo menos comes bien.', na:{ de:'Hier, nimm Brot und ein Stück Käse mit. Wenn du dich verläufst, isst du wenigstens gut.', en:'Here, take some bread and a piece of cheese. If you get lost, at least you’ll eat well.', el:'Πάρε, κράτα ψωμί κι ένα κομμάτι τυρί. Αν χαθείς, τουλάχιστον θα φας καλά.' } },
      rollen: {
        spikiu: { de:'Benito, Käser und Hirte', es:'Benito, quesero y pastor', en:'Benito, cheesemaker and shepherd', el:'ο Μπενίτο, τυροκόμος και βοσκός' },
        lerner: { de:'Aleksi, der Koch auf Käsesuche', es:'Aleksi, el cocinero que busca quesos', en:'Aleksi, the cook on a cheese hunt', el:'ο Αλέξι, ο μάγειρας που ψάχνει τυριά' },
        ort:    { de:'in Sotres, Picos de Europa (Asturien)', es:'en Sotres, en los Picos de Europa (Asturias)', en:'in Sotres, in the Picos de Europa (Asturias)', el:'στο Σότρες, στα Πίκος ντε Ευρόπα (Αστούριας)' }
      },
      wortschatz: [
        { z:'la majada',            na:{ de:'die Alm (Weide mit Hirtenhütten)', en:'the mountain pasture (with shepherds’ huts)', el:'η στάνη' } },
        { z:'el abrevadero',        na:{ de:'die Viehtränke',           en:'the water trough', el:'η ποτίστρα' } },
        { z:'la pista',             na:{ de:'der Fahrweg, Schotterweg', en:'the dirt track', el:'ο χωματόδρομος' } },
        { z:'el haya',              na:{ de:'die Buche',                en:'the beech tree', el:'η οξιά' } },
        { z:'el arroyo',            na:{ de:'der Bach',                 en:'the stream', el:'το ρέμα' } },
        { z:'la cueva',             na:{ de:'die Höhle',                en:'the cave', el:'η σπηλιά' } },
        { z:'la niebla',            na:{ de:'der Nebel',                en:'the fog', el:'η ομίχλη' } },
        { z:'madurar',              na:{ de:'reifen',                   en:'to mature, to ripen', el:'ωριμάζω' } },
        { z:'estar de vuelta',      na:{ de:'zurück sein',              en:'to be back', el:'έχω γυρίσει' } },
        { z:'tener su miga',        na:{ de:'es in sich haben',         en:'to be trickier than it looks', el:'έχει τα κόλπα του' } },
        { z:'a ver si lo he entendido', na:{ de:'mal sehen, ob ich es verstanden habe', en:'let me check I’ve got it', el:'για να δω αν κατάλαβα' } },
        { z:'esperar a que levante',na:{ de:'warten, bis er sich hebt (Nebel)', en:'to wait for it to lift (fog)', el:'περιμένω να σηκωθεί (η ομίχλη)' } },
        { z:'cuando llegues a …',   na:{ de:'wenn du zu … kommst',      en:'when you get to …', el:'όταν φτάσεις σε …' } },
        { z:'en cuanto veas …',     na:{ de:'sobald du … siehst',       en:'as soon as you see …', el:'μόλις δεις …' } },
        { z:'hasta que …',          na:{ de:'bis …',                    en:'until …', el:'μέχρι να …' } },
        { z:'antes de que anochezca', na:{ de:'bevor es dunkel wird',   en:'before it gets dark', el:'πριν νυχτώσει' } }
      ],
      dialog: {
        rolle: { de:'Benito, Käser und Hirte', en:'Benito, cheesemaker and shepherd', el:'Ο Μπενίτο, τυροκόμος και βοσκός' },
        zeilen: [
          { wer:'lerner', z:'Sí, y mañana quiero subir solo a la cueva donde maduran tus quesos. ¿Me explicas el camino con calma?', na:{ de:'Ja, und morgen will ich allein zur Höhle hinauf, in der deine Käse reifen. Erklärst du mir den Weg in Ruhe?', en:'Yes, and tomorrow I want to go up on my own to the cave where your cheeses mature. Can you explain the way slowly?', el:'Ναι, και αύριο θέλω να ανέβω μόνος στη σπηλιά όπου ωριμάζουν τα τυριά σου. Μου εξηγείς τον δρόμο με την ησυχία σου;' } },
          { wer:'spikiu', z:'Tiene su miga, así que apunta. Sales de Sotres por la pista y, cuando llegues a una majada con un abrevadero, coges el sendero de la izquierda hasta que veas un haya enorme.', na:{ de:'Der hat es in sich, also schreib mit. Du gehst auf dem Fahrweg aus Sotres hinaus, und wenn du zu einer Alm mit einer Viehtränke kommst, nimmst du den Pfad links, bis du eine riesige Buche siehst.', en:'It’s trickier than it looks, so write this down. You leave Sotres on the track and, when you reach a mountain pasture with a water trough, you take the path on the left until you see a huge beech tree.', el:'Έχει τα κόλπα του, οπότε σημείωσε. Βγαίνεις από το Σότρες από τον χωματόδρομο και, όταν φτάσεις σε μια στάνη με μια ποτίστρα, παίρνεις το μονοπάτι αριστερά μέχρι να δεις μια τεράστια οξιά.' } },
          { wer:'lerner', z:'A ver si lo he entendido: cuando llegue a la majada, giro a la izquierda y sigo hasta el haya. ¿Y luego?', na:{ de:'Mal sehen, ob ich es verstanden habe: Wenn ich zur Alm komme, biege ich links ab und gehe bis zur Buche. Und dann?', en:'Let me check I’ve got it: when I reach the pasture, I turn left and carry on to the beech. And then?', el:'Για να δω αν κατάλαβα: όταν φτάσω στη στάνη, στρίβω αριστερά και συνεχίζω μέχρι την οξιά. Και μετά;' } },
          { wer:'spikiu', z:'En cuanto veas el haya, bajas hacia el arroyo. La cueva está detrás de unas rocas: la reconocerás por el aire frío que sale.', na:{ de:'Sobald du die Buche siehst, gehst du zum Bach hinunter. Die Höhle liegt hinter ein paar Felsen: Du erkennst sie an der kalten Luft, die herauskommt.', en:'As soon as you see the beech, head down towards the stream. The cave is behind some rocks — you’ll know it by the cold air coming out.', el:'Μόλις δεις την οξιά, κατεβαίνεις προς το ρέμα. Η σπηλιά είναι πίσω από κάτι βράχια: θα την αναγνωρίσεις από τον κρύο αέρα που βγαίνει.' } },
          { wer:'lerner', z:'¿Y cuánto se tarda, exactamente? Quiero estar de vuelta antes de que anochezca.', na:{ de:'Und wie lange braucht man, ganz genau? Ich will zurück sein, bevor es dunkel wird.', en:'And how long does it take, exactly? I want to be back before it gets dark.', el:'Και πόση ώρα θέλει, ακριβώς; Θέλω να έχω γυρίσει πριν νυχτώσει.' } },
          { wer:'spikiu', z:'Hora y media, a ojo; depende de tus piernas. Y si baja la niebla, no sigas: espera a que levante.', na:{ de:'Anderthalb Stunden, über den Daumen; kommt auf deine Beine an. Und wenn der Nebel herunterkommt, geh nicht weiter: Warte, bis er sich hebt.', en:'An hour and a half, roughly — depends on your legs. And if the fog comes down, don’t carry on: wait for it to lift.', el:'Μιάμιση ώρα, με το μάτι· εξαρτάται από τα πόδια σου. Κι αν πέσει ομίχλη, μη συνεχίσεις: περίμενε να σηκωθεί.' } }
        ]
      },
      lesetext: {
        z:'Hoy subí solo a la cueva de Benito. Cuando llegué a la majada, empezó a bajar la niebla y esperé media hora debajo del haya. Dentro de la cueva, cientos de quesos maduraban en silencio, con un olor fortísimo. Volví antes de que anocheciera. Para mi cuaderno: tener su miga.',
        na:{ de:'Heute bin ich allein zu Benitos Höhle hinaufgestiegen. Als ich zur Alm kam, zog Nebel auf, und ich wartete eine halbe Stunde unter der Buche. In der Höhle reiften Hunderte Käse in aller Stille, mit einem sehr starken Geruch. Ich war zurück, bevor es dunkel wurde. Für mein Heft: tener su miga.',
             en:'Today I went up alone to Benito’s cave. When I reached the pasture, the fog started to come down and I waited half an hour under the beech. Inside the cave, hundreds of cheeses were maturing in silence, with a very strong smell. I got back before it got dark. For my notebook: tener su miga.',
             el:'Σήμερα ανέβηκα μόνος στη σπηλιά του Μπενίτο. Όταν έφτασα στη στάνη, άρχισε να πέφτει ομίχλη και περίμενα μισή ώρα κάτω από την οξιά. Μέσα στη σπηλιά, εκατοντάδες τυριά ωρίμαζαν σιωπηλά, με μια πολύ έντονη μυρωδιά. Γύρισα πριν νυχτώσει. Για το τετράδιό μου: tener su miga.' },
        frage:{ de:'Was tat Aleksi, als der Nebel kam?', en:'What did Aleksi do when the fog came?', el:'Τι έκανε ο Αλέξι όταν ήρθε η ομίχλη;' },
        optionen:[
          { na:{ de:'Er wartete unter der Buche', en:'He waited under the beech', el:'Περίμενε κάτω από την οξιά' }, richtig:true  },
          { na:{ de:'Er kehrte sofort um',        en:'He turned back at once', el:'Γύρισε πίσω αμέσως' }, richtig:false },
          { na:{ de:'Er rief Benito an',          en:'He phoned Benito', el:'Τηλεφώνησε στον Μπενίτο' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erkläre jemandem den Weg zu dir nach Hause — mit „cuando“ und „en cuanto“. Zwei Sätze.',
                  en:'Explain to someone how to get to your home — with “cuando” and “en cuanto”. Two sentences.', el:'Εξήγησε σε κάποιον πώς θα έρθει στο σπίτι σου — με «cuando» και «en cuanto». Δύο προτάσεις.' },
        muster:'Cuando salgas del metro, gira a la derecha. En cuanto veas una farmacia, mi portal es el siguiente.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'Geht es um etwas, das erst noch kommt, folgt nach cuando (wenn), en cuanto (sobald) und hasta que (bis) der Subjuntivo: cuando llegues, en cuanto veas. Erzählst du, was schon war, bleibt alles wie gewohnt: cuando llegué, esperé. Und „antes de que“ (bevor) will den Subjuntivo immer: antes de que anochezca.',
               en:'When it’s about something still to come, cuando (when), en cuanto (as soon as) and hasta que (until) take the subjuntivo: cuando llegues, en cuanto veas. When you tell what already happened, everything stays as usual: cuando llegué, esperé. And “antes de que” (before) always wants the subjuntivo: antes de que anochezca.',
               el:'Όταν μιλάς για κάτι που δεν έχει γίνει ακόμα, μετά το cuando (όταν), το en cuanto (μόλις) και το hasta que (μέχρι να) μπαίνει subjuntivo: cuando llegues, en cuanto veas. Όταν διηγείσαι κάτι που έγινε, όλα μένουν ως συνήθως: cuando llegué, esperé. Και το «antes de que» (πριν) θέλει πάντα subjuntivo: antes de que anochezca.' },
        beispiele:[
          { z:'Cuando llegues a la majada, gira a la izquierda.', na:{ de:'Wenn du zur Alm kommst, bieg links ab.', en:'When you get to the pasture, turn left.', el:'Όταν φτάσεις στη στάνη, στρίψε αριστερά.' } },
          { z:'Quiero volver antes de que anochezca.',            na:{ de:'Ich will zurück, bevor es dunkel wird.', en:'I want to get back before it gets dark.', el:'Θέλω να γυρίσω πριν νυχτώσει.' } }
        ]
      },
      kultur: { de:'Der Cabrales ist ein Blauschimmelkäse aus Asturien, der in natürlichen Kalksteinhöhlen der Picos de Europa reift. Er wird aus Kuhmilch gemacht, traditionell oft gemischt mit Schaf- und Ziegenmilch.',
                en:'Cabrales is a blue cheese from Asturias that matures in natural limestone caves in the Picos de Europa. It is made from cow’s milk, traditionally often mixed with sheep’s and goat’s milk.',
                el:'Το καμπράλες είναι μπλε τυρί από την Αστούριας, που ωριμάζει σε φυσικές ασβεστολιθικές σπηλιές στα Πίκος ντε Ευρόπα. Φτιάχνεται από αγελαδινό γάλα, παραδοσιακά συχνά ανακατεμένο με πρόβειο και κατσικίσιο.' }
    },

    /* ── B2 · Lanzarote, La Geria — Weinlese bei Calima (Aug) ─────────── */
    'b2.wetter': {
      duzen: true,
      deineRolle: { de:'Du bist Aleksi. Morgen soll in La Geria die Weinlese beginnen, aber heute kommt Calima, und es soll Wind aufkommen. Du willst früh anfangen, bevor es heiß wird, und mit den Helfern aus Haría die Kisten mitbringen.', es:'Eres Aleksi. Mañana empieza la vendimia en La Geria, pero hoy hay calima y dicen que se levantará el viento. Quieres empezar temprano, antes del calor, y traer las cajas con los chicos de Haría.', en:'You are Aleksi. The grape harvest in La Geria is due to start tomorrow, but today there is calima and the wind is expected to pick up. You want to start early, before the heat, and bring the crates with the helpers from Haría.', el:'Είσαι ο Αλέξι. Αύριο αρχίζει ο τρύγος στη Λα Χέρια, αλλά σήμερα έχει καλίμα και λένε ότι θα σηκωθεί αέρας. Θέλεις να ξεκινήσετε νωρίς, πριν από τη ζέστη, και να φέρεις τα τελάρα με τα παιδιά από τη Χαρία.' },
      abrundung: { z:'¿Llover? ¡Aquí en agosto, mi niño, ni en sueños! Mañana a las siete, y trae un pañuelo para la calima.', na:{ de:'Regnen? Hier im August, mein Junge — nicht mal im Traum! Morgen um sieben, und bring ein Tuch gegen die Calima mit.', en:'Rain? Here in August, my dear? Not a chance! Tomorrow at seven, and bring a scarf for the calima.', el:'Βροχή; Εδώ τον Αύγουστο, παιδί μου, ούτε στον ύπνο σου! Αύριο στις εφτά, και φέρε ένα μαντίλι για την καλίμα.' } },
      rollen: {
        spikiu: { de:'Candelaria, die Winzerin', es:'Candelaria, la viticultora', en:'Candelaria, the winegrower', el:'η Καντελάρια, η αμπελουργός' },
        lerner: { de:'Aleksi, Erntehelfer für ein paar Tage', es:'Aleksi, vendimiador por unos días', en:'Aleksi, grape-picker for a few days', el:'ο Αλέξι, τρυγητής για λίγες μέρες' },
        ort:    { de:'in den Weinbergen von La Geria, Lanzarote', es:'en los viñedos de La Geria, en Lanzarote', en:'in the vineyards of La Geria, Lanzarote', el:'στους αμπελώνες της Λα Χέρια, στο Λανθαρότε' }
      },
      wortschatz: [
        { z:'la calima',            na:{ de:'der Saharastaub-Dunst',    en:'the Saharan dust haze', el:'η καλίμα (σκόνη από τη Σαχάρα)' } },
        { z:'la vendimia',          na:{ de:'die Weinlese',             en:'the grape harvest', el:'ο τρύγος' } },
        { z:'la parra',             na:{ de:'der Rebstock',             en:'the vine', el:'το κλήμα' } },
        { z:'el hoyo',              na:{ de:'die Mulde, die Grube',     en:'the hollow, the pit', el:'ο λάκκος' } },
        { z:'el picón',             na:{ de:'der schwarze Vulkankies',  en:'black volcanic gravel', el:'το μαύρο ηφαιστειακό χαλίκι' } },
        { z:'la ola de calor',      na:{ de:'die Hitzewelle',           en:'the heatwave', el:'ο καύσωνας' } },
        { z:'amainar',              na:{ de:'nachlassen (Wind)',        en:'to drop, to die down (wind)', el:'κοπάζω' } },
        { z:'vendimiar',            na:{ de:'Wein lesen',               en:'to pick grapes', el:'τρυγάω' } },
        { z:'levantarse el viento', na:{ de:'aufkommen (Wind)',         en:'to pick up (wind)', el:'σηκώνεται αέρας' } },
        { z:'al amanecer',          na:{ de:'im Morgengrauen',          en:'at dawn', el:'με το χάραμα' } },
        { z:'mi niño',              na:{ de:'mein Junge, mein Lieber (Kanaren, liebevoll)', en:'my dear (Canarian, affectionate)', el:'παιδί μου (στα Κανάρια, χαϊδευτικά)' } },
        { z:'ustedes (en Canarias)',na:{ de:'ihr (auf den Kanaren statt vosotros)', en:'you all (Canarian, instead of vosotros)', el:'εσείς (στα Κανάρια, αντί για vosotros)' } },
        { z:'como no …',            na:{ de:'wenn nicht … (als Warnung)', en:'if … not (as a warning)', el:'αν δεν … (ως προειδοποίηση)' } },
        { z:'con tal de que …',     na:{ de:'Hauptsache, …; vorausgesetzt, …', en:'as long as …, provided …', el:'αρκεί να …' } },
        { z:'mientras no …',        na:{ de:'solange nicht …',          en:'as long as … not', el:'όσο δεν …' } },
        { z:'más vale que …',       na:{ de:'besser, wir …',            en:'we’d better …', el:'καλύτερα να …' } }
      ],
      dialog: {
        rolle: { de:'Candelaria, die Winzerin', en:'Candelaria, the winegrower', el:'Η Καντελάρια, η αμπελουργός' },
        zeilen: [
          { wer:'spikiu', z:'¡Buenos días, mi niño! Mira el cielo, todo amarillo: es calima. Y dicen que esta tarde se levanta el viento.', na:{ de:'Guten Morgen, mein Junge! Schau dir den Himmel an, ganz gelb: Das ist Calima. Und es heißt, heute Nachmittag kommt Wind auf.', en:'Good morning, my dear! Look at the sky, all yellow — that’s calima. And they say the wind will pick up this afternoon.', el:'Καλημέρα, παιδί μου! Κοίτα τον ουρανό, κατακίτρινος: είναι καλίμα. Και λένε ότι το απόγευμα θα σηκωθεί αέρας.' } },
          { wer:'lerner', z:'Como no amaine el viento, mañana no podremos vendimiar, ¿no? Me preocupa que la uva se llene de arena.', na:{ de:'Wenn der Wind nicht nachlässt, können wir morgen nicht lesen, oder? Ich habe Sorge, dass die Trauben voller Sand werden.', en:'If the wind doesn’t drop, we won’t be able to pick tomorrow, will we? I’m worried the grapes will get full of sand.', el:'Αν δεν κοπάσει ο αέρας, αύριο δεν θα μπορέσουμε να τρυγήσουμε, έτσι; Ανησυχώ μήπως γεμίσουν άμμο τα σταφύλια.' } },
          { wer:'spikiu', z:'Tranquilo: cada parra vive en su hoyo, protegida por un muro de piedra. Lo malo no es el viento, sino el calor que trae la calima.', na:{ de:'Keine Sorge: Jeder Rebstock lebt in seiner Mulde, geschützt von einer Steinmauer. Das Schlimme ist nicht der Wind, sondern die Hitze, die die Calima mitbringt.', en:'Don’t worry: each vine lives in its own hollow, sheltered by a stone wall. The problem isn’t the wind, it’s the heat the calima brings.', el:'Ησύχασε: κάθε κλήμα ζει στον λάκκο του, προστατευμένο από έναν πέτρινο τοίχο. Το κακό δεν είναι ο αέρας, αλλά η ζέστη που φέρνει η καλίμα.' } },
          { wer:'lerner', z:'Entonces más vale que empecemos al amanecer. Con tal de que haya luz, yo puedo estar aquí a las siete.', na:{ de:'Dann fangen wir besser im Morgengrauen an. Hauptsache, es ist hell — ich kann um sieben hier sein.', en:'Then we’d better start at dawn. As long as there’s light, I can be here at seven.', el:'Τότε καλύτερα να ξεκινήσουμε με το χάραμα. Αρκεί να υπάρχει φως, εγώ μπορώ να είμαι εδώ στις εφτά.' } },
          { wer:'spikiu', z:'Me gusta. ¿Y ustedes, tú y los chicos de Haría, pueden traer las cajas?', na:{ de:'Gefällt mir. Und könnt ihr — du und die Jungs aus Haría — die Kisten mitbringen?', en:'I like it. And can you lot — you and the lads from Haría — bring the crates?', el:'Μου αρέσει. Κι εσείς, εσύ και τα παιδιά από τη Χαρία, μπορείτε να φέρετε τα τελάρα;' } },
          { wer:'lerner', z:'Claro, nosotros las traemos. Mientras no llueva, por mí perfecto: en Finlandia esto ya sería una ola de calor.', na:{ de:'Klar, wir bringen sie mit. Solange es nicht regnet, passt mir alles: In Finnland wäre das hier schon eine Hitzewelle.', en:'Of course, we’ll bring them. As long as it doesn’t rain, it’s fine by me — in Finland this would already be a heatwave.', el:'Βεβαίως, τα φέρνουμε εμείς. Όσο δεν βρέχει, για μένα όλα τέλεια: στη Φινλανδία αυτό θα ήταν ήδη καύσωνας.' } }
        ]
      },
      lesetext: {
        z:'Último día de vendimia en La Geria. La calima lo volvió todo amarillo, pero el viento amainó a mediodía. Las parras viven en hoyos de picón negro, cada una con su muro. Candelaria me llama «mi niño», aunque tengo treinta y siete años. En una semana vuelvo a Helsinki. Para mi cuaderno: amainar.',
        na:{ de:'Letzter Tag der Weinlese in La Geria. Die Calima hat alles gelb gefärbt, aber mittags hat der Wind nachgelassen. Die Rebstöcke leben in Mulden aus schwarzem Vulkankies, jeder mit seiner Mauer. Candelaria nennt mich „mi niño“, obwohl ich siebenunddreißig bin. In einer Woche fliege ich zurück nach Helsinki. Für mein Heft: amainar.',
             en:'Last day of the harvest in La Geria. The calima turned everything yellow, but the wind dropped at midday. The vines live in hollows of black volcanic gravel, each with its own wall. Candelaria calls me “mi niño”, even though I’m thirty-seven. In a week I go back to Helsinki. For my notebook: amainar.',
             el:'Τελευταία μέρα του τρύγου στη Λα Χέρια. Η καλίμα τα έβαψε όλα κίτρινα, αλλά ο αέρας κόπασε το μεσημέρι. Τα κλήματα ζουν σε λάκκους από μαύρο ηφαιστειακό χαλίκι, το καθένα με τον τοίχο του. Η Καντελάρια με λέει «mi niño», αν και είμαι τριάντα εφτά χρονών. Σε μία εβδομάδα γυρίζω στο Ελσίνκι. Για το τετράδιό μου: amainar.' },
        frage:{ de:'Wo wachsen die Reben in La Geria?', en:'Where do the vines grow in La Geria?', el:'Πού μεγαλώνουν τα κλήματα στη Λα Χέρια;' },
        optionen:[
          { na:{ de:'In Mulden aus schwarzem Vulkankies', en:'In hollows of black volcanic gravel', el:'Σε λάκκους από μαύρο ηφαιστειακό χαλίκι' }, richtig:true  },
          { na:{ de:'In Gewächshäusern',                  en:'In greenhouses', el:'Σε θερμοκήπια' }, richtig:false },
          { na:{ de:'Direkt am Strand',                   en:'Right on the beach', el:'Ακριβώς πάνω στην παραλία' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Plane einen Ausflug, der vom Wetter abhängt — mit „como no“, „con tal de que“ oder „mientras no“. Zwei Sätze.',
                  en:'Plan a trip that depends on the weather — with “como no”, “con tal de que” or “mientras no”. Two sentences.', el:'Σχεδίασε μια εκδρομή που εξαρτάται από τον καιρό — με «como no», «con tal de que» ή «mientras no». Δύο προτάσεις.' },
        muster:'Como no deje de llover, nos quedamos en casa. Mientras no haga mucho viento, mañana vamos a la playa.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you', el:'Γραμματική χωρίς περιττά' },
        text:{ de:'„Como no amaine el viento…“ klingt wie eine kleine Warnung: Wenn der Wind nicht nachlässt, dann … „Con tal de que“ heißt „Hauptsache“, „mientras no“ heißt „solange nicht“. Danach kommt immer der Subjuntivo. Auf den Kanaren sagt man zu mehreren Leuten „ustedes“, auch unter Freunden — vosotros hörst du dort kaum.',
               en:'“Como no amaine el viento…” sounds like a small warning: if the wind doesn’t drop, then … “Con tal de que” means “as long as”, “mientras no” means “as long as … not”. All three are followed by the subjuntivo. In the Canary Islands people say “ustedes” to a group, even among friends — you’ll hardly hear vosotros there.',
               el:'Το «como no amaine el viento…» ακούγεται σαν μικρή προειδοποίηση: αν δεν κοπάσει ο αέρας, τότε… Το «con tal de que» σημαίνει «αρκεί να», το «mientras no» σημαίνει «όσο δεν». Μετά απ’ αυτά μπαίνει πάντα subjuntivo. Στα Κανάρια λένε «ustedes» σε πολλούς, ακόμα και ανάμεσα σε φίλους — το vosotros σχεδόν δεν το ακούς εκεί.' },
        beispiele:[
          { z:'Como no amaine el viento, no vendimiamos.', na:{ de:'Wenn der Wind nicht nachlässt, lesen wir nicht.', en:'If the wind doesn’t drop, we won’t pick.', el:'Αν δεν κοπάσει ο αέρας, δεν τρυγάμε.' } },
          { z:'Mientras no llueva, empezamos a las siete.', na:{ de:'Solange es nicht regnet, fangen wir um sieben an.', en:'As long as it doesn’t rain, we start at seven.', el:'Όσο δεν βρέχει, ξεκινάμε στις εφτά.' } }
        ]
      },
      kultur: { de:'In La Geria wächst der Wein in Mulden im schwarzen Vulkankies, geschützt von halbrunden Steinmauern, den „zocos“; die Lava stammt von den Ausbrüchen der Jahre 1730 bis 1736. Die Calima ist Wüstenstaub aus der Sahara, den der Ostwind herüberträgt.',
                en:'In La Geria the vines grow in hollows dug into black volcanic gravel, sheltered by semicircular stone walls called “zocos”; the lava comes from the eruptions of 1730 to 1736. Calima is desert dust from the Sahara, carried over by the east wind.',
                el:'Στη Λα Χέρια τα αμπέλια μεγαλώνουν σε λάκκους μέσα στο μαύρο ηφαιστειακό χαλίκι, προστατευμένα από ημικυκλικούς πέτρινους τοίχους, τους «zocos»· η λάβα προέρχεται από τις εκρήξεις του 1730 έως το 1736. Η καλίμα είναι σκόνη της ερήμου από τη Σαχάρα, που τη φέρνει ο ανατολικός άνεμος.' }
    }
  }
};

  [B1_LP_A, B1_LP_B].forEach(function (F) {
    Object.keys(F.schritt).forEach(function (t) { if (SCHRITT[t]) SCHRITT[t].b1 = F.schritt[t]; });
    Object.keys(F.aufgaben).forEach(function (k) { AUFGABEN[k] = F.aufgaben[k]; });
    Object.keys(F.stationen).forEach(function (k) { STATIONEN[k] = F.stationen[k]; });
  });

  [B2_LP_A, B2_LP_B].forEach(function (F) {
    Object.keys(F.schritt).forEach(function (t) { if (SCHRITT[t]) SCHRITT[t].b2 = F.schritt[t]; });
    Object.keys(F.aufgaben).forEach(function (k) { AUFGABEN[k] = F.aufgaben[k]; });
    Object.keys(F.stationen).forEach(function (k) { STATIONEN[k] = F.stationen[k]; });
  });

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
