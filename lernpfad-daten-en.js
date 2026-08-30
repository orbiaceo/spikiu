/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — LERNPFAD-DATEN (ENGLISCH als Zielsprache)
   Statische Datei. NULL Token. Wird von allen Räumen gelesen.

   Schwesterdatei von lernpfad-daten.js (Spanisch) und lernpfad-daten-de.js.
   Gleiche Struktur, gleiche API, andere Zielsprache.

     z  = Zielsprache (hier Englisch)
     na = Muttersprachen als Objekt { de, es }

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
    { id:'cafe',            em:'☕',  na:{ de:'Im Café',             es:'En la cafetería' } },
    { id:'restaurant',      em:'🍽️', na:{ de:'Im Restaurant',       es:'En el restaurante' } },
    { id:'einkaufen',       em:'🛒', na:{ de:'Einkaufen',           es:'De compras' } },
    { id:'wegbeschreibung', em:'🧭', na:{ de:'Nach dem Weg fragen', es:'Preguntar el camino' } },
    { id:'taxi',            em:'🚕', na:{ de:'Im Taxi',             es:'En el taxi' } },
    { id:'familie',         em:'👪', na:{ de:'Über die Familie',    es:'Sobre la familia' } },
    { id:'hotel',           em:'🏨', na:{ de:'Im Hotel',            es:'En el hotel' } },
    { id:'bahnhof',         em:'🚉', na:{ de:'Am Bahnhof',          es:'En la estación' } },
    { id:'arzt',            em:'🩺', na:{ de:'Beim Arzt',           es:'En el médico' } },
    { id:'wetter',          em:'🌤️', na:{ de:'Über das Wetter',     es:'Sobre el tiempo' } }
  ];

  var STUFEN = ['a1', 'a2'];

  var KATEGORIEN = [
    { id:'essen',     em:'🍽️', na:{ de:'Essen & Trinken', es:'Comer y beber' },
      themen:['cafe','restaurant'] },
    { id:'unterwegs', em:'🧳', na:{ de:'Unterwegs',       es:'De camino' },
      themen:['wegbeschreibung','taxi','bahnhof','hotel'] },
    { id:'alltag',    em:'🛒', na:{ de:'Alltag',          es:'Vida diaria' },
      themen:['einkaufen','wetter'] },
    { id:'menschen',  em:'👥', na:{ de:'Menschen',        es:'Personas' },
      themen:['familie','arzt'] }
  ];

  var SCHRITT = {
    cafe:            { a1:{ de:'bestellen, bezahlen', es:'pedir, pagar' },
                       a2:{ de:'reklamieren, nach Zutaten fragen', es:'reclamar, preguntar por ingredientes' } },
    restaurant:      { a1:{ de:'ein Tisch, die Karte', es:'una mesa, la carta' },
                       a2:{ de:'empfehlen lassen, teilen, Trinkgeld', es:'recomendaciones, compartir, propina' } },
    einkaufen:       { a1:{ de:'kaufen, bezahlen', es:'comprar, pagar' },
                       a2:{ de:'umtauschen, anprobieren', es:'cambiar, probarse' } },
    wegbeschreibung: { a1:{ de:'nach dem Weg fragen', es:'preguntar el camino' },
                       a2:{ de:'längeren Wegen folgen', es:'seguir indicaciones largas' } },
    taxi:            { a1:{ de:'Ziel, Gepäck', es:'destino, equipaje' },
                       a2:{ de:'Eile, Route, Quittung', es:'prisa, ruta, recibo' } },
    familie:         { a1:{ de:'Geschwister, Namen, Alter', es:'hermanos, nombres, edad' },
                       a2:{ de:'von früher erzählen', es:'contar el pasado' } },
    hotel:           { a1:{ de:'Reservierung, Frühstück, Stock', es:'reserva, desayuno, planta' },
                       a2:{ de:'reklamieren, Zimmer wechseln', es:'reclamar, cambiar de habitación' } },
    bahnhof:         { a1:{ de:'Fahrkarte, Zeit, Gleis', es:'billete, hora, andén' },
                       a2:{ de:'Verspätung, Anschluss', es:'retraso, enlace' } },
    arzt:            { a1:{ de:'Schmerzen, seit wann', es:'dolor, desde cuándo' },
                       a2:{ de:'was passiert ist, Allergien, Termin', es:'qué pasó, alergias, cita' } },
    wetter:          { a1:{ de:'heute und morgen', es:'hoy y mañana' },
                       a2:{ de:'Vorhersage, etwas vorschlagen', es:'pronóstico, proponer algo' } }
  };

  var ROLLEN = {
    cafe:            { spikiu:{ de:'der Barista', es:'el camarero' },
                       lerner:{ de:'der Gast', es:'el cliente' },
                       ort:   { de:'an der Theke', es:'en el mostrador' } },
    restaurant:      { spikiu:{ de:'der Kellner', es:'el camarero' },
                       lerner:{ de:'der Gast', es:'el cliente' },
                       ort:   { de:'in einem Lokal', es:'en un restaurante' } },
    einkaufen:       { spikiu:{ de:'die Kassiererin', es:'la cajera' },
                       lerner:{ de:'die Kundin', es:'la clienta' },
                       ort:   { de:'an der Supermarktkasse', es:'en la caja del supermercado' } },
    wegbeschreibung: { spikiu:{ de:'ein Passant', es:'un transeúnte' },
                       lerner:{ de:'jemand, der sucht', es:'alguien que busca' },
                       ort:   { de:'auf der Straße', es:'en la calle' } },
    taxi:            { spikiu:{ de:'der Taxifahrer', es:'el taxista' },
                       lerner:{ de:'mit einem Koffer', es:'con una maleta' },
                       ort:   { de:'am Straßenrand, abends', es:'en la acera, de noche' } },
    familie:         { spikiu:{ de:'eine Nachbarin', es:'una vecina' },
                       lerner:{ de:'du selbst', es:'tú mismo' },
                       ort:   { de:'im Hausflur', es:'en la escalera' } },
    hotel:           { spikiu:{ de:'der Rezeptionist', es:'el recepcionista' },
                       lerner:{ de:'der Gast', es:'el huésped' },
                       ort:   { de:'an der Rezeption', es:'en recepción' } },
    bahnhof:         { spikiu:{ de:'der Schalterbeamte', es:'el empleado de la ventanilla' },
                       lerner:{ de:'der Reisende', es:'el viajero' },
                       ort:   { de:'am Schalter', es:'en la ventanilla' } },
    arzt:            { spikiu:{ de:'die Ärztin', es:'la médica' },
                       lerner:{ de:'die Patientin', es:'la paciente' },
                       ort:   { de:'in der Praxis', es:'en la consulta' } },
    wetter:          { spikiu:{ de:'ein Kollege', es:'un compañero de trabajo' },
                       lerner:{ de:'du selbst', es:'tú mismo' },
                       ort:   { de:'vor dem Büro', es:'delante de la oficina' } }
  };

  var AUFGABEN = {
    'a1.arzt': [
      { de:'Sag, wo es weh tut', es:'Di dónde te duele', en:'Say where it hurts' },
      { de:'Sag, seit wann', es:'Di desde cuándo', en:'Say since when' },
      { de:'Bedanke dich', es:'Da las gracias', en:'Say thank you' }
    ],
    'a1.bahnhof': [
      { de:'Kaufe eine Fahrkarte', es:'Compra un billete', en:'Buy a ticket' },
      { de:'Frag nach der Abfahrtszeit', es:'Pregunta a qué hora sale', en:'Ask about the departure time' },
      { de:'Frag nach dem Gleis', es:'Pregunta de qué andén sale', en:'Ask which platform' }
    ],
    'a1.cafe': [
      { de:'Bestelle etwas zu trinken', es:'Pide algo de beber', en:'Order something to drink' },
      { de:'Sag, wie du es möchtest', es:'Di cómo lo quieres', en:'Say how you want it' },
      { de:'Bitte um die Rechnung', es:'Pide la cuenta', en:'Ask for the bill' }
    ],
    'a1.einkaufen': [
      { de:'Kaufe etwas ein', es:'Compra algo', en:'Buy something' },
      { de:'Frag nach dem Preis', es:'Pregunta el precio', en:'Ask about the price' },
      { de:'Bezahle', es:'Paga', en:'Pay' }
    ],
    'a1.familie': [
      { de:'Sag, ob du Geschwister hast', es:'Di si tienes hermanos', en:'Say whether you have siblings' },
      { de:'Nenne ihren Namen', es:'Di cómo se llama', en:'Give her name' },
      { de:'Sag, wie alt sie ist', es:'Di qué edad tiene', en:'Say how old she is' }
    ],
    'a1.hotel': [
      { de:'Sag, dass du reserviert hast', es:'Di que tienes una reserva', en:'Say that you have a booking' },
      { de:'Frag nach dem Frühstück', es:'Pregunta por el desayuno', en:'Ask about breakfast' },
      { de:'Frag nach der Etage', es:'Pregunta en qué piso está', en:'Ask which floor' }
    ],
    'a1.restaurant': [
      { de:'Sag, für wie viele der Tisch ist', es:'Di para cuántas personas es la mesa', en:'Say how many the table is for' },
      { de:'Frag nach einer Empfehlung', es:'Pide una recomendación', en:'Ask for a recommendation' },
      { de:'Bestelle dein Essen', es:'Pide tu comida', en:'Order your food' }
    ],
    'a1.taxi': [
      { de:'Frag, ob das Taxi frei ist', es:'Pregunta si el taxi está libre', en:'Ask if the taxi is free' },
      { de:'Nenne dein Ziel', es:'Di adónde vas', en:'Name your destination' },
      { de:'Sag, dass du Gepäck hast', es:'Di que llevas equipaje', en:'Say that you have luggage' }
    ],
    'a1.wegbeschreibung': [
      { de:'Frag, wo der Platz ist', es:'Pregunta dónde está la plaza', en:'Ask where the square is' },
      { de:'Frag, ob es weit ist', es:'Pregunta si está lejos', en:'Ask whether it is far' },
      { de:'Bedanke dich', es:'Da las gracias', en:'Say thank you' }
    ],
    'a1.wetter': [
      { de:'Sag, wie das Wetter heute ist', es:'Di qué tiempo hace hoy', en:'Say what the weather is like today' },
      { de:'Sag, wie es morgen wird', es:'Di qué tiempo hará mañana', en:'Say what it will be tomorrow' },
      { de:'Verabschiede dich', es:'Despídete', en:'Say goodbye' }
    ],
    'a2.arzt': [
      { de:'Erzähle, was passiert ist', es:'Cuenta qué pasó', en:'Say what happened' },
      { de:'Nenne deine Medikamente und Allergien', es:'Di qué medicinas tomas y a qué eres alérgico', en:'Name your medication and allergies' },
      { de:'Frag nach einem weiteren Termin', es:'Pregunta por otra cita', en:'Ask about another appointment' }
    ],
    'a2.bahnhof': [
      { de:'Sag, dass dein Zug Verspätung hat', es:'Di que tu tren lleva retraso', en:'Say that your train is delayed' },
      { de:'Nenne die Umsteigezeit', es:'Di la hora del transbordo', en:'Give the connection time' },
      { de:'Frag, was passiert, wenn du ihn verpasst', es:'Pregunta qué pasa si lo pierdes', en:'Ask what happens if you miss it' }
    ],
    'a2.cafe': [
      { de:'Sag höflich, dass etwas nicht stimmt', es:'Di con cortesía que algo no está bien', en:'Politely say something is wrong' },
      { de:'Frag, was darin ist', es:'Pregunta qué lleva', en:'Ask what is in it' },
      { de:'Wähle etwas anderes', es:'Elige otra cosa', en:'Choose something else' }
    ],
    'a2.einkaufen': [
      { de:'Sag, was mit dem Stück nicht stimmt', es:'Di qué problema tiene la prenda', en:'Say what is wrong with the item' },
      { de:'Frag, ob du umtauschen kannst', es:'Pregunta si puedes cambiarla', en:'Ask whether you can exchange it' },
      { de:'Frag, ob du es anprobieren darfst', es:'Pregunta si te la puedes probar', en:'Ask whether you may try it on' }
    ],
    'a2.familie': [
      { de:'Erzähle, wo ihr früher gewohnt habt', es:'Cuenta dónde vivíais antes', en:'Say where you used to live' },
      { de:'Erzähle, was ihr sonntags gemacht habt', es:'Cuenta qué hacíais los domingos', en:'Say what you used to do on Sundays' },
      { de:'Sag, wen du vermisst', es:'Di a quién echas de menos', en:'Say who you miss' }
    ],
    'a2.hotel': [
      { de:'Melde, was im Zimmer nicht funktioniert', es:'Informa qué no funciona en la habitación', en:'Report what is not working in the room' },
      { de:'Sag, seit wann', es:'Di desde cuándo', en:'Say since when' },
      { de:'Bitte um ein anderes Zimmer', es:'Pide otra habitación', en:'Ask for another room' }
    ],
    'a2.restaurant': [
      { de:'Frag nach der Spezialität', es:'Pregunta por la especialidad', en:'Ask about the speciality' },
      { de:'Sag, dass ihr teilen wollt', es:'Di que quieren compartir', en:'Say that you want to share' },
      { de:'Bitte um getrennte Rechnungen', es:'Pide cuentas separadas', en:'Ask for separate bills' }
    ],
    'a2.taxi': [
      { de:'Nenne dein Ziel und sag, dass du es eilig hast', es:'Di adónde vas y que tienes prisa', en:'Name your destination and say you are in a hurry' },
      { de:'Frag, ob der andere Weg schneller ist', es:'Pregunta si el otro camino es más rápido', en:'Ask whether the other way is faster' },
      { de:'Bitte um eine Quittung', es:'Pide un recibo', en:'Ask for a receipt' }
    ],
    'a2.wegbeschreibung': [
      { de:'Frag nach dem Weg zum Museum', es:'Pregunta cómo llegar al museo', en:'Ask the way to the museum' },
      { de:'Frag, wie es weitergeht', es:'Pregunta cómo sigue', en:'Ask what comes next' },
      { de:'Frag, ob man zu Fuß gehen kann', es:'Pregunta si se puede ir a pie', en:'Ask whether you can walk' }
    ],
    'a2.wetter': [
      { de:'Frag nach der Vorhersage', es:'Pregunta por el pronóstico', en:'Ask about the forecast' },
      { de:'Frag nach dem Nachmittag', es:'Pregunta por la tarde', en:'Ask about the afternoon' },
      { de:'Schlag etwas vor', es:'Propón algo', en:'Make a suggestion' }
    ]
  };

  var STATIONEN = {

    'a1.arzt': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Of course. I\'ll send the prescription to your pharmacy. Feel better!', na:{ de:'Gern. Ich schicke das Rezept an Ihre Apotheke. Gute Besserung!', es:'Con gusto. Mando la receta a su farmacia. ¡Que se mejore!' } },
      wortschatz: [
        { z:'a headache', na:{ de:'die Kopfschmerzen', es:'el dolor de cabeza' } },
        { z:'a stomachache', na:{ de:'die Bauchschmerzen', es:'el dolor de barriga' } },
        { z:'a fever', na:{ de:'das Fieber', es:'la fiebre' } },
        { z:'a pill', na:{ de:'die Tablette', es:'la pastilla' } },
        { z:'the prescription', na:{ de:'das Rezept', es:'la receta' } },
        { z:'the pharmacy', na:{ de:'die Apotheke', es:'la farmacia' } },
        { z:'to rest', na:{ de:'sich ausruhen', es:'descansar' } },
        { z:'to cough', na:{ de:'husten', es:'toser' } },
        { z:'tired', na:{ de:'müde', es:'cansado' } },
        { z:'insurance', na:{ de:'die Versicherung', es:'el seguro' } },
        { z:'the appointment', na:{ de:'der Termin', es:'la cita' } },
        { z:'feel better', na:{ de:'gute Besserung', es:'que se mejore' } }
      ],
      dialog: {
        rolle: { de:'die Ärztin', es:'la médica' },
        zeilen: [
          { wer:'spikiu', z:'Hello. What brings you in today?', na:{ de:'Guten Tag. Was führt Sie zu mir?', es:'Buenos días. ¿Qué le trae por aquí?' } },
          { wer:'lerner', z:'I have a headache.', na:{ de:'Ich habe Kopfschmerzen.', es:'Me duele la cabeza.' } },
          { wer:'spikiu', z:'How long has that been going on?', na:{ de:'Seit wann denn?', es:'¿Desde cuándo?' } },
          { wer:'lerner', z:'Since yesterday. And I have a fever.', na:{ de:'Seit gestern. Und ich habe Fieber.', es:'Desde ayer. Y tengo fiebre.' } },
          { wer:'spikiu', z:'Take one of these and rest up for a couple of days.', na:{ de:'Nehmen Sie davon eine und ruhen Sie sich ein paar Tage aus.', es:'Tome una de estas y descanse un par de días.' } },
          { wer:'lerner', z:'Thank you, doctor.', na:{ de:'Danke, Frau Doktor.', es:'Gracias, doctora.' } }
        ]
      },
      lesetext: {
        z:'A patient has had a headache since yesterday and also a fever. The doctor tells her to take a pill and rest for a couple of days, and sends the prescription to her pharmacy.',
        na:{ de:'Eine Patientin hat seit gestern Kopfschmerzen und außerdem Fieber. Die Ärztin sagt, sie soll eine Tablette nehmen und sich ein paar Tage ausruhen, und schickt das Rezept an ihre Apotheke.', es:'Una paciente tiene dolor de cabeza desde ayer y además fiebre. La médica le dice que tome una pastilla y descanse un par de días, y manda la receta a su farmacia.' },
        frage:{ de:'Wohin geht das Rezept?', es:'¿Adónde va la receta?' },
        optionen:[
          { na:{ de:'An ihre Apotheke', es:'A su farmacia' }, richtig:true },
          { na:{ de:'Zu ihr nach Hause', es:'A su casa' }, richtig:false },
          { na:{ de:'Sie bekommt es auf Papier', es:'Se la dan en papel' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du Bauchschmerzen hast, und seit wann. Zwei Sätze.', es:'Di que te duele la barriga y desde cuándo. Dos frases.' },
        muster:'I have a stomachache. It started yesterday.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Krankheiten bekommen im Englischen ein kleines **a**: I have **a** headache, **a** fever, **a** cold. Ohne das *a* klingt es falsch, obwohl man im Deutschen einfach „ich habe Kopfschmerzen" sagt.', es:'Las dolencias llevan en inglés un **a** delante: I have **a** headache, **a** fever, **a** cold. Sin ese *a* suena mal, aunque en español baste con „me duele la cabeza".' },
        beispiele:[
          { z:'I have a headache.', na:{ de:'Ich habe Kopfschmerzen.', es:'Me duele la cabeza.' } },
          { z:'I have a cold.', na:{ de:'Ich bin erkältet.', es:'Estoy resfriado.' } }
        ]
      }
    },

    'a1.bahnhof': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Next in line. What can I do for you?', na:{ de:'Der Nächste bitte. Was kann ich für Sie tun?', es:'El siguiente. ¿En qué le ayudo?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Track four. That\'s thirty-three dollars — safe travels!', na:{ de:'Gleis vier. Das macht dreiunddreißig Dollar — gute Fahrt!', es:'Andén cuatro. Son treinta y tres dólares. ¡Buen viaje!' } },
      wortschatz: [
        { z:'a ticket', na:{ de:'die Fahrkarte', es:'el billete' } },
        { z:'the ticket counter', na:{ de:'der Schalter', es:'la ventanilla' } },
        { z:'the track', na:{ de:'das Gleis', es:'el andén' } },
        { z:'one way', na:{ de:'einfach', es:'solo ida' } },
        { z:'round trip', na:{ de:'hin und zurück', es:'ida y vuelta' } },
        { z:'to leave', na:{ de:'abfahren', es:'salir' } },
        { z:'to arrive', na:{ de:'ankommen', es:'llegar' } },
        { z:'to transfer', na:{ de:'umsteigen', es:'hacer transbordo' } },
        { z:'the schedule', na:{ de:'der Fahrplan', es:'el horario' } },
        { z:'the conductor', na:{ de:'der Schaffner', es:'el revisor' } },
        { z:'to board', na:{ de:'einsteigen', es:'subir' } },
        { z:'safe travels', na:{ de:'gute Fahrt', es:'buen viaje' } }
      ],
      dialog: {
        rolle: { de:'der Schalterbeamte', es:'el empleado de la ventanilla' },
        zeilen: [
          { wer:'spikiu', z:'Next in line. What can I do for you?', na:{ de:'Der Nächste bitte. Was kann ich für Sie tun?', es:'El siguiente. ¿En qué le ayudo?' } },
          { wer:'lerner', z:'One ticket to Boston, please.', na:{ de:'Eine Fahrkarte nach Boston, bitte.', es:'Un billete para Boston, por favor.' } },
          { wer:'spikiu', z:'One way or round trip?', na:{ de:'Einfach oder hin und zurück?', es:'¿Solo ida o ida y vuelta?' } },
          { wer:'lerner', z:'Round trip. What time does it leave?', na:{ de:'Hin und zurück. Wann fährt er?', es:'Ida y vuelta. ¿A qué hora sale?' } },
          { wer:'spikiu', z:'The next one leaves at nine twelve.', na:{ de:'Der nächste um neun Uhr zwölf.', es:'El próximo a las nueve y doce.' } },
          { wer:'lerner', z:'And which track?', na:{ de:'Und von welchem Gleis?', es:'¿Y de qué andén?' } }
        ]
      },
      lesetext: {
        z:'At the counter a traveller buys a round-trip ticket to Boston for thirty-three dollars. The next train leaves at nine twelve from track four.',
        na:{ de:'Am Schalter kauft ein Reisender eine Fahrkarte nach Boston, hin und zurück, für dreiunddreißig Dollar. Der nächste Zug fährt um neun Uhr zwölf von Gleis vier.', es:'En la ventanilla un viajero compra un billete de ida y vuelta a Boston por treinta y tres dólares. El próximo tren sale a las nueve y doce del andén cuatro.' },
        frage:{ de:'Von welchem Gleis fährt der Zug?', es:'¿De qué andén sale el tren?' },
        optionen:[
          { na:{ de:'Gleis vier', es:'Andén cuatro' }, richtig:true },
          { na:{ de:'Gleis neun', es:'Andén nueve' }, richtig:false },
          { na:{ de:'Gleis zwölf', es:'Andén doce' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Kaufe eine einfache Fahrkarte und frag, wann sie fährt. Zwei Sätze.', es:'Compra un billete solo de ida y pregunta a qué hora sale. Dos frases.' },
        muster:'One ticket to Boston, one way. What time does it leave?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Bei der Frage nach der Zeit steht **does** vorn — und das Verb dahinter bleibt in der Grundform: „What time **does** it **leave**?", nicht *leaves*. Das ist die häufigste Falle bei englischen Fragen.', es:'Al preguntar la hora, delante va **does** — y el verbo detrás se queda en su forma básica: „What time **does** it **leave**?", no *leaves*. Es la trampa más frecuente en las preguntas inglesas.' },
        beispiele:[
          { z:'What time does it leave?', na:{ de:'Wann fährt er ab?', es:'¿A qué hora sale?' } },
          { z:'When does it arrive?', na:{ de:'Wann kommt er an?', es:'¿Cuándo llega?' } }
        ]
      }
    },

    'a1.cafe': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'That\'ll be three fifty. Have a great day!', na:{ de:'Das macht drei fünfzig. Schönen Tag noch!', es:'Son tres cincuenta. ¡Que tenga buen día!' } },
      wortschatz: [
        { z:'coffee', na:{ de:'der Kaffee', es:'el café' } },
        { z:'tea', na:{ de:'der Tee', es:'el té' } },
        { z:'water', na:{ de:'das Wasser', es:'el agua' } },
        { z:'milk', na:{ de:'die Milch', es:'la leche' } },
        { z:'sugar', na:{ de:'der Zucker', es:'el azúcar' } },
        { z:'a cup', na:{ de:'eine Tasse', es:'una taza' } },
        { z:'to go', na:{ de:'zum Mitnehmen', es:'para llevar' } },
        { z:'regular', na:{ de:'mittelgroß, mit Milch', es:'mediano, con leche' } },
        { z:'please', na:{ de:'bitte', es:'por favor' } },
        { z:'thanks', na:{ de:'danke', es:'gracias' } },
        { z:'the check', na:{ de:'die Rechnung', es:'la cuenta' } },
        { z:'keep the change', na:{ de:'stimmt so', es:'quédese con el cambio' } }
      ],
      dialog: {
        rolle: { de:'der Barista', es:'el camarero' },
        zeilen: [
          { wer:'spikiu', z:'Hi there! What can I get you?', na:{ de:'Hallo! Was darf ich Ihnen bringen?', es:'¡Hola! ¿Qué le pongo?' } },
          { wer:'lerner', z:'A coffee, please.', na:{ de:'Einen Kaffee, bitte.', es:'Un café, por favor.' } },
          { wer:'spikiu', z:'Sure. For here or to go?', na:{ de:'Gerne. Zum Hiertrinken oder zum Mitnehmen?', es:'Con gusto. ¿Para tomar aquí o para llevar?' } },
          { wer:'lerner', z:'For here, please.', na:{ de:'Zum Hiertrinken, bitte.', es:'Para tomar aquí, por favor.' } },
          { wer:'spikiu', z:'Coming right up. Anything else?', na:{ de:'Kommt sofort. Sonst noch etwas?', es:'Enseguida. ¿Algo más?' } },
          { wer:'lerner', z:'No thanks. How much do I owe you?', na:{ de:'Nein danke. Was macht das?', es:'No, gracias. ¿Cuánto le debo?' } }
        ]
      },
      lesetext: {
        z:'Marta goes into a café. She orders a coffee for here. It costs three fifty. She gives the barista five dollars and gets one fifty back.',
        na:{ de:'Marta geht in ein Café. Sie bestellt einen Kaffee zum Hiertrinken. Er kostet drei fünfzig. Sie gibt fünf Dollar und bekommt eineinhalb zurück.', es:'Marta entra en una cafetería. Pide un café para tomar allí. Cuesta tres cincuenta. Da cinco dólares y le devuelven uno cincuenta.' },
        frage:{ de:'Wie viel bekommt Marta zurück?', es:'¿Cuánto le devuelven a Marta?' },
        optionen:[
          { na:{ de:'Eineinhalb Dollar', es:'Uno cincuenta' }, richtig:true },
          { na:{ de:'Drei fünfzig', es:'Tres cincuenta' }, richtig:false },
          { na:{ de:'Fünf Dollar', es:'Cinco dólares' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Bestelle einen Tee mit Zucker und frag, was du schuldest. Zwei Sätze.', es:'Pide un té con azúcar y pregunta cuánto debes. Dos frases.' },
        muster:'A tea with sugar, please. How much do I owe you?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Im Englischen steht vor fast jedem Ding ein kleines **a** oder **an**: a coffee, a cup, **an** apple. Vor Vokalen wird aus *a* ein *an*. Anders als im Deutschen gibt es nur diese eine Form — kein der, die, das.', es:'En inglés casi toda cosa lleva delante un **a** o **an**: a coffee, a cup, **an** apple. Delante de vocal, *a* se convierte en *an*. A diferencia del español no hay masculino ni femenino: una sola forma para todo.' },
        beispiele:[
          { z:'a coffee', na:{ de:'ein Kaffee', es:'un café' } },
          { z:'an apple', na:{ de:'ein Apfel', es:'una manzana' } }
        ]
      }
    },

    'a1.einkaufen': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'All set. Have a good one!', na:{ de:'Fertig. Machen Sie es gut!', es:'Listo. ¡Que le vaya bien!' } },
      wortschatz: [
        { z:'the cashier', na:{ de:'die Kassiererin', es:'la cajera' } },
        { z:'a pound', na:{ de:'ein Pfund', es:'una libra' } },
        { z:'apples', na:{ de:'die Äpfel', es:'las manzanas' } },
        { z:'cheese', na:{ de:'der Käse', es:'el queso' } },
        { z:'bread', na:{ de:'das Brot', es:'el pan' } },
        { z:'to cost', na:{ de:'kosten', es:'costar' } },
        { z:'cash', na:{ de:'bar', es:'en efectivo' } },
        { z:'card', na:{ de:'die Karte', es:'la tarjeta' } },
        { z:'the receipt', na:{ de:'der Kassenbon', es:'el ticket' } },
        { z:'the bag', na:{ de:'die Tüte', es:'la bolsa' } },
        { z:'a quarter', na:{ de:'25 Cent', es:'25 centavos' } },
        { z:'have a good one', na:{ de:'machen Sie es gut', es:'que le vaya bien' } }
      ],
      dialog: {
        rolle: { de:'die Kassiererin', es:'la cajera' },
        zeilen: [
          { wer:'spikiu', z:'Hi, did you find everything okay?', na:{ de:'Hallo, haben Sie alles gefunden?', es:'Hola, ¿encontró todo bien?' } },
          { wer:'lerner', z:'Yes, thanks. Just these apples.', na:{ de:'Ja, danke. Nur diese Äpfel.', es:'Sí, gracias. Solo estas manzanas.' } },
          { wer:'spikiu', z:'And a pound of cheese, that\'s it?', na:{ de:'Und ein Pfund Käse, das ist alles?', es:'Y medio kilo de queso, ¿es todo?' } },
          { wer:'lerner', z:'Yes. How much is that?', na:{ de:'Ja. Was kostet das?', es:'Sí. ¿Cuánto es?' } },
          { wer:'spikiu', z:'Eight forty-nine. Cash or card?', na:{ de:'Acht Euro neunundvierzig. Bar oder Karte?', es:'Ocho con cuarenta y nueve. ¿Efectivo o tarjeta?' } },
          { wer:'lerner', z:'Card, please.', na:{ de:'Mit Karte, bitte.', es:'Con tarjeta, por favor.' } }
        ]
      },
      lesetext: {
        z:'At the supermarket a customer buys apples and half a pound of cheese. The total is eight forty-nine. She pays by card. The cashier wishes her a good one.',
        na:{ de:'Im Supermarkt kauft eine Kundin Äpfel und ein halbes Pfund Käse. Zusammen sind das acht Euro neunundvierzig. Sie zahlt mit Karte. Die Kassiererin wünscht ihr einen schönen Tag.', es:'En el supermercado una clienta compra manzanas y un cuarto de kilo de queso. En total son ocho con cuarenta y nueve. Paga con tarjeta. La cajera le desea un buen día.' },
        frage:{ de:'Wie bezahlt sie?', es:'¿Cómo paga?' },
        optionen:[
          { na:{ de:'Mit Karte', es:'Con tarjeta' }, richtig:true },
          { na:{ de:'Bar', es:'En efectivo' }, richtig:false },
          { na:{ de:'Sie bezahlt nicht', es:'No paga' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, was etwas kostet, und sag, dass du bar zahlst. Zwei Sätze.', es:'Pregunta cuánto cuesta algo y di que pagas en efectivo. Dos frases.' },
        muster:'How much is that? I\'ll pay cash, please.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Englisch trennt, was Deutsch zusammenwirft. **How much** fragt nach etwas, das man nicht zählt: how much cheese, how much water. **How many** fragt nach Zählbarem: how many apples, how many people. Beim Preis heißt es immer *how much*.', es:'El inglés separa lo que el español junta en „cuánto". **How much** para lo que no se cuenta: how much cheese, how much water. **How many** para lo contable: how many apples, how many people. Para el precio siempre *how much*.' },
        beispiele:[
          { z:'How much is that?', na:{ de:'Was kostet das?', es:'¿Cuánto es?' } },
          { z:'How many apples?', na:{ de:'Wie viele Äpfel?', es:'¿Cuántas manzanas?' } }
        ]
      }
    },

    'a1.familie': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Oh, that\'s a fun age. Say hi to her from me!', na:{ de:'Ach, das schöne Alter. Grüß sie von mir!', es:'Ay, qué edad tan bonita. ¡Salúdala de mi parte!' } },
      wortschatz: [
        { z:'a sister', na:{ de:'die Schwester', es:'la hermana' } },
        { z:'a brother', na:{ de:'der Bruder', es:'el hermano' } },
        { z:'siblings', na:{ de:'die Geschwister', es:'los hermanos' } },
        { z:'parents', na:{ de:'die Eltern', es:'los padres' } },
        { z:'mom', na:{ de:'die Mama', es:'la mamá' } },
        { z:'dad', na:{ de:'der Papa', es:'el papá' } },
        { z:'grandparents', na:{ de:'die Großeltern', es:'los abuelos' } },
        { z:'a son', na:{ de:'der Sohn', es:'el hijo' } },
        { z:'a daughter', na:{ de:'die Tochter', es:'la hija' } },
        { z:'an only child', na:{ de:'das Einzelkind', es:'hijo único' } },
        { z:'married', na:{ de:'verheiratet', es:'casado' } },
        { z:'the neighbor', na:{ de:'die Nachbarin', es:'la vecina' } }
      ],
      dialog: {
        rolle: { de:'eine Nachbarin', es:'una vecina' },
        zeilen: [
          { wer:'spikiu', z:'So tell me — do you have any brothers or sisters?', na:{ de:'Sag mal, hast du Geschwister?', es:'Cuéntame, ¿tienes hermanos?' } },
          { wer:'lerner', z:'Yes, I have a sister.', na:{ de:'Ja, ich habe eine Schwester.', es:'Sí, tengo una hermana.' } },
          { wer:'spikiu', z:'Nice! What\'s her name?', na:{ de:'Schön! Wie heißt sie?', es:'¡Qué bien! ¿Cómo se llama?' } },
          { wer:'lerner', z:'Her name is Clara.', na:{ de:'Sie heißt Clara.', es:'Se llama Clara.' } },
          { wer:'spikiu', z:'That\'s a pretty name. How old is she?', na:{ de:'Ein hübscher Name. Wie alt ist sie?', es:'Un nombre bonito. ¿Qué edad tiene?' } },
          { wer:'lerner', z:'She\'s twelve.', na:{ de:'Sie ist zwölf.', es:'Tiene doce años.' } }
        ]
      },
      lesetext: {
        z:'A neighbour asks about the family. Yes, there\'s a sister — her name is Clara and she\'s twelve. The neighbour says to say hello to her.',
        na:{ de:'Eine Nachbarin fragt nach der Familie. Ja, es gibt eine Schwester — sie heißt Clara und ist zwölf. Die Nachbarin lässt sie grüßen.', es:'Una vecina pregunta por la familia. Sí, hay una hermana: se llama Clara y tiene doce años. La vecina le manda saludos.' },
        frage:{ de:'Wie alt ist Clara?', es:'¿Qué edad tiene Clara?' },
        optionen:[
          { na:{ de:'Zwölf', es:'Doce' }, richtig:true },
          { na:{ de:'Zwei', es:'Dos' }, richtig:false },
          { na:{ de:'Zwanzig', es:'Veinte' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du einen Bruder hast, und nenne Namen und Alter. Zwei Sätze.', es:'Di que tienes un hermano y dinos su nombre y su edad. Dos frases.' },
        muster:'I have a brother. His name is Paul and he\'s eight.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Für den Namen sagt Englisch nicht „she calls herself", sondern **her name is** Clara oder **she\'s called** Clara. Und Achtung: *his* für einen Mann, *her* für eine Frau — es richtet sich nach der Person, nicht nach dem Wort danach.', es:'Para el nombre el inglés no dice „se llama" sino **her name is** Clara o **she\'s called** Clara. Y ojo: *his* para hombre, *her* para mujer — depende de la persona, no de la palabra que sigue, como sí ocurre en español.' },
        beispiele:[
          { z:'Her name is Clara.', na:{ de:'Sie heißt Clara.', es:'Se llama Clara.' } },
          { z:'His name is Paul.', na:{ de:'Er heißt Paul.', es:'Se llama Paul.' } }
        ]
      }
    },

    'a1.hotel': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Third floor — elevator\'s right around the corner. Enjoy your stay!', na:{ de:'Dritter Stock, der Aufzug ist gleich um die Ecke. Schönen Aufenthalt!', es:'Tercera planta, el ascensor está a la vuelta. ¡Que disfrute su estancia!' } },
      wortschatz: [
        { z:'the front desk', na:{ de:'die Rezeption', es:'la recepción' } },
        { z:'to check in', na:{ de:'einchecken', es:'registrarse' } },
        { z:'to check out', na:{ de:'auschecken', es:'dejar la habitación' } },
        { z:'the key', na:{ de:'der Schlüssel', es:'la llave' } },
        { z:'breakfast', na:{ de:'das Frühstück', es:'el desayuno' } },
        { z:'the floor', na:{ de:'der Stock', es:'la planta' } },
        { z:'the elevator', na:{ de:'der Aufzug', es:'el ascensor' } },
        { z:'a double room', na:{ de:'das Doppelzimmer', es:'la habitación doble' } },
        { z:'a single room', na:{ de:'das Einzelzimmer', es:'la habitación individual' } },
        { z:'an ID', na:{ de:'der Ausweis', es:'el documento de identidad' } },
        { z:'quiet', na:{ de:'ruhig', es:'tranquilo' } },
        { z:'the lobby', na:{ de:'die Lobby', es:'el vestíbulo' } }
      ],
      dialog: {
        rolle: { de:'der Rezeptionist', es:'el recepcionista' },
        zeilen: [
          { wer:'spikiu', z:'Good afternoon. Checking in?', na:{ de:'Guten Tag. Möchten Sie einchecken?', es:'Buenas tardes. ¿Va a registrarse?' } },
          { wer:'lerner', z:'Yes, under the name Weber.', na:{ de:'Ja, auf den Namen Weber.', es:'Sí, a nombre de Weber.' } },
          { wer:'spikiu', z:'Got it. Two nights, right? Here\'s your key.', na:{ de:'Alles klar. Zwei Nächte, richtig? Hier Ihr Schlüssel.', es:'Muy bien. Dos noches, ¿verdad? Aquí su llave.' } },
          { wer:'lerner', z:'Thanks. Is breakfast included?', na:{ de:'Danke. Ist das Frühstück dabei?', es:'Gracias. ¿El desayuno está incluido?' } },
          { wer:'spikiu', z:'It is — seven to ten, in the dining room.', na:{ de:'Ja, von sieben bis zehn, im Frühstücksraum.', es:'Sí, de siete a diez, en el comedor.' } },
          { wer:'lerner', z:'Great. What floor is the room on?', na:{ de:'Prima. In welchem Stock ist das Zimmer?', es:'Perfecto. ¿En qué planta está?' } }
        ]
      },
      lesetext: {
        z:'Mr Weber checks in for two nights. He gets his key at the front desk. Breakfast is from seven to ten in the dining room. His room is on the third floor, and the elevator is around the corner.',
        na:{ de:'Herr Weber checkt für zwei Nächte ein. An der Rezeption bekommt er den Schlüssel. Frühstück gibt es von sieben bis zehn im Frühstücksraum. Sein Zimmer liegt im dritten Stock, der Aufzug ist um die Ecke.', es:'El señor Weber se registra para dos noches. En recepción recibe la llave. El desayuno es de siete a diez en el comedor. Su habitación está en la tercera planta y el ascensor está a la vuelta.' },
        frage:{ de:'Wo liegt sein Zimmer?', es:'¿Dónde está su habitación?' },
        optionen:[
          { na:{ de:'Im dritten Stock', es:'En la tercera planta' }, richtig:true },
          { na:{ de:'Im Erdgeschoss', es:'En la planta baja' }, richtig:false },
          { na:{ de:'Neben der Lobby', es:'Al lado del vestíbulo' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du reserviert hast, und frag nach dem Frühstück. Zwei Sätze.', es:'Di que tienes una reserva y pregunta por el desayuno. Dos frases.' },
        muster:'I have a booking under the name Weber. Is breakfast included?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Vorsicht beim Zählen. In Amerika ist das Erdgeschoss bereits der **first floor** — der amerikanische *third floor* ist also der deutsche zweite Stock. In England zählt man wie in Deutschland: ground floor, first floor.', es:'Cuidado al contar. En Estados Unidos la planta baja ya es el **first floor** — o sea, el *third floor* americano es la segunda planta española. En Inglaterra se cuenta como en España: ground floor, first floor.' },
        beispiele:[
          { z:'on the third floor', na:{ de:'im zweiten Stock (USA)', es:'en la segunda planta (EE. UU.)' } },
          { z:'the ground floor', na:{ de:'das Erdgeschoss', es:'la planta baja' } }
        ]
      }
    },

    'a1.restaurant': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Excellent choice. I\'ll be right back with your water.', na:{ de:'Ausgezeichnete Wahl. Ich bringe Ihnen gleich Wasser.', es:'Excelente elección. Ahora les traigo agua.' } },
      wortschatz: [
        { z:'the menu', na:{ de:'die Speisekarte', es:'la carta' } },
        { z:'the server', na:{ de:'der Kellner', es:'el camarero' } },
        { z:'to recommend', na:{ de:'empfehlen', es:'recomendar' } },
        { z:'grilled', na:{ de:'gegrillt', es:'a la parrilla' } },
        { z:'a side', na:{ de:'die Beilage', es:'la guarnición' } },
        { z:'the appetizer', na:{ de:'die Vorspeise', es:'el entrante' } },
        { z:'dessert', na:{ de:'der Nachtisch', es:'el postre' } },
        { z:'to order', na:{ de:'bestellen', es:'pedir' } },
        { z:'delicious', na:{ de:'lecker', es:'rico' } },
        { z:'an entrée', na:{ de:'das Hauptgericht (USA)', es:'el plato principal (EE. UU.)' } },
        { z:'split the check', na:{ de:'getrennt zahlen', es:'pagar por separado' } },
        { z:'the tip', na:{ de:'das Trinkgeld', es:'la propina' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero' },
        zeilen: [
          { wer:'spikiu', z:'Good evening! How many in your party?', na:{ de:'Guten Abend! Für wie viele Personen?', es:'¡Buenas noches! ¿Cuántos son?' } },
          { wer:'lerner', z:'Two, please.', na:{ de:'Für zwei, bitte.', es:'Para dos, por favor.' } },
          { wer:'spikiu', z:'Right this way. Here are your menus — ready to order?', na:{ de:'Hier entlang. Hier sind die Karten — möchten Sie schon bestellen?', es:'Por aquí. Aquí tienen la carta. ¿Ya quieren pedir?' } },
          { wer:'lerner', z:'What do you recommend?', na:{ de:'Was können Sie empfehlen?', es:'¿Qué nos recomienda?' } },
          { wer:'spikiu', z:'The grilled salmon is really good tonight.', na:{ de:'Der gegrillte Lachs ist heute besonders gut.', es:'El salmón a la parrilla está muy bueno hoy.' } },
          { wer:'lerner', z:'I\'ll have the salmon, then.', na:{ de:'Dann nehme ich den Lachs.', es:'Entonces tomo el salmón.' } }
        ]
      },
      lesetext: {
        z:'Two friends go out for dinner. The server brings the menus and asks if they\'re ready to order. They ask what he recommends. Tonight the grilled salmon is very good, so they both take the salmon.',
        na:{ de:'Zwei Freunde gehen abends essen. Der Kellner bringt die Karten und fragt, ob sie bestellen möchten. Sie fragen, was er empfiehlt. Heute ist der gegrillte Lachs sehr gut, also nehmen beide den Lachs.', es:'Dos amigos salen a cenar. El camarero trae las cartas y pregunta si ya quieren pedir. Ellos preguntan qué recomienda. Esta noche el salmón a la parrilla está muy bueno, así que los dos toman el salmón.' },
        frage:{ de:'Was bestellen sie?', es:'¿Qué piden?' },
        optionen:[
          { na:{ de:'Den Lachs', es:'El salmón' }, richtig:true },
          { na:{ de:'Das Hähnchen', es:'El pollo' }, richtig:false },
          { na:{ de:'Nur Getränke', es:'Solo bebidas' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass ihr zu dritt seid, und frag nach einer Empfehlung. Zwei Sätze.', es:'Di que sois tres y pide una recomendación. Dos frases.' },
        muster:'Three, please. What do you recommend?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Zum Bestellen sagt man im Englischen nicht „I want" — das klingt fordernd. Die normale Formel ist **I\'ll have** the salmon oder **I\'d like** the salmon. Zwei Wörter Unterschied, ein anderer Mensch am Tisch.', es:'Para pedir en inglés no se dice „I want" — suena a exigencia. La fórmula normal es **I\'ll have** the salmon o **I\'d like** the salmon. Dos palabras de diferencia, otra persona en la mesa.' },
        beispiele:[
          { z:'I\'ll have the salmon.', na:{ de:'Ich nehme den Lachs.', es:'Tomo el salmón.' } },
          { z:'I\'d like a coffee.', na:{ de:'Ich möchte einen Kaffee.', es:'Quiero un café.' } }
        ]
      }
    },

    'a1.taxi': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Evening. Yeah?', na:{ de:'Guten Abend. Ja bitte?', es:'Buenas noches. ¿Sí?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Here we are. That\'s twenty-eight. Have a safe flight!', na:{ de:'Da wären wir. Achtundzwanzig. Guten Flug!', es:'Ya llegamos. Son veintiocho. ¡Buen vuelo!' } },
      wortschatz: [
        { z:'the cab', na:{ de:'das Taxi', es:'el taxi' } },
        { z:'the airport', na:{ de:'der Flughafen', es:'el aeropuerto' } },
        { z:'downtown', na:{ de:'die Innenstadt', es:'el centro' } },
        { z:'a suitcase', na:{ de:'der Koffer', es:'la maleta' } },
        { z:'the trunk', na:{ de:'der Kofferraum', es:'el maletero' } },
        { z:'to hop in', na:{ de:'einsteigen', es:'subir' } },
        { z:'the address', na:{ de:'die Adresse', es:'la dirección' } },
        { z:'to pull over', na:{ de:'anhalten', es:'parar' } },
        { z:'fast', na:{ de:'schnell', es:'rápido' } },
        { z:'slow', na:{ de:'langsam', es:'despacio' } },
        { z:'the fare', na:{ de:'der Fahrpreis', es:'la tarifa' } },
        { z:'keep the change', na:{ de:'stimmt so', es:'quédese con el cambio' } }
      ],
      dialog: {
        rolle: { de:'der Taxifahrer', es:'el taxista' },
        zeilen: [
          { wer:'spikiu', z:'Evening. Yeah?', na:{ de:'Guten Abend. Ja bitte?', es:'Buenas noches. ¿Sí?' } },
          { wer:'lerner', z:'Are you free?', na:{ de:'Sind Sie frei?', es:'¿Está libre?' } },
          { wer:'spikiu', z:'Sure, hop in. Where to?', na:{ de:'Klar, steigen Sie ein. Wohin?', es:'Claro, suba. ¿Adónde?' } },
          { wer:'lerner', z:'To the airport, please.', na:{ de:'Zum Flughafen, bitte.', es:'Al aeropuerto, por favor.' } },
          { wer:'spikiu', z:'Got it. Any bags?', na:{ de:'Alles klar. Haben Sie Gepäck?', es:'Muy bien. ¿Lleva equipaje?' } },
          { wer:'lerner', z:'Yes, one suitcase.', na:{ de:'Ja, einen Koffer.', es:'Sí, una maleta.' } }
        ]
      },
      lesetext: {
        z:'It\'s evening. A man waves down a cab. He\'s going to the airport and has one suitcase. The ride costs twenty-eight dollars. The driver wishes him a safe flight.',
        na:{ de:'Es ist Abend. Ein Mann winkt ein Taxi heran. Er will zum Flughafen und hat einen Koffer. Die Fahrt kostet achtundzwanzig Dollar. Der Fahrer wünscht ihm einen guten Flug.', es:'Es de noche. Un hombre para un taxi. Va al aeropuerto y lleva una maleta. El viaje cuesta veintiocho dólares. El taxista le desea un buen vuelo.' },
        frage:{ de:'Was hat der Mann dabei?', es:'¿Qué lleva el hombre?' },
        optionen:[
          { na:{ de:'Einen Koffer', es:'Una maleta' }, richtig:true },
          { na:{ de:'Zwei Taschen', es:'Dos bolsas' }, richtig:false },
          { na:{ de:'Nichts', es:'Nada' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, ob das Taxi frei ist, und nenne dein Ziel. Zwei Sätze.', es:'Pregunta si el taxi está libre y di adónde vas. Dos frases.' },
        muster:'Are you free? To the station, please.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Englische Fragen brauchen ein Hilfswort vorn. Bei *sein* ist es das Verb selbst: **Are you** free? Bei allen anderen kommt **do**: **Do you have** a suitcase? Wer „Have you a suitcase?" sagt, klingt wie ein Buch von 1900.', es:'Las preguntas inglesas necesitan una palabra delante. Con *ser/estar* es el verbo mismo: **Are you** free? Con los demás verbos entra **do**: **Do you have** a suitcase? Decir „Have you a suitcase?" suena a libro antiguo.' },
        beispiele:[
          { z:'Are you free?', na:{ de:'Sind Sie frei?', es:'¿Está libre?' } },
          { z:'Do you have a suitcase?', na:{ de:'Haben Sie einen Koffer?', es:'¿Lleva maleta?' } }
        ]
      }
    },

    'a1.wegbeschreibung': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Are you looking for something?', na:{ de:'Suchen Sie etwas?', es:'¿Busca algo?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'You\'re welcome. Enjoy your visit!', na:{ de:'Gern geschehen. Schönen Aufenthalt!', es:'De nada. ¡Que disfrute su visita!' } },
      wortschatz: [
        { z:'straight', na:{ de:'geradeaus', es:'todo recto' } },
        { z:'left', na:{ de:'links', es:'a la izquierda' } },
        { z:'right', na:{ de:'rechts', es:'a la derecha' } },
        { z:'a block', na:{ de:'ein Häuserblock', es:'una manzana' } },
        { z:'the corner', na:{ de:'die Ecke', es:'la esquina' } },
        { z:'the traffic light', na:{ de:'die Ampel', es:'el semáforo' } },
        { z:'the crosswalk', na:{ de:'der Zebrastreifen', es:'el paso de cebra' } },
        { z:'to walk', na:{ de:'zu Fuß gehen', es:'ir a pie' } },
        { z:'across from', na:{ de:'gegenüber', es:'enfrente de' } },
        { z:'next to', na:{ de:'neben', es:'al lado de' } },
        { z:'far', na:{ de:'weit', es:'lejos' } },
        { z:'nearby', na:{ de:'in der Nähe', es:'cerca' } }
      ],
      dialog: {
        rolle: { de:'ein Passant', es:'un transeúnte' },
        zeilen: [
          { wer:'spikiu', z:'Are you looking for something?', na:{ de:'Suchen Sie etwas?', es:'¿Busca algo?' } },
          { wer:'lerner', z:'Excuse me, where\'s Market Square?', na:{ de:'Entschuldigung, wo ist der Marktplatz?', es:'Perdone, ¿dónde está la plaza del mercado?' } },
          { wer:'spikiu', z:'Go straight for two blocks, then turn left.', na:{ de:'Gehen Sie zwei Straßen geradeaus, dann links.', es:'Siga dos calles y luego gire a la izquierda.' } },
          { wer:'lerner', z:'Is it far?', na:{ de:'Ist das weit?', es:'¿Está lejos?' } },
          { wer:'spikiu', z:'No, about a five-minute walk.', na:{ de:'Nein, etwa fünf Minuten zu Fuß.', es:'No, unos cinco minutos a pie.' } },
          { wer:'lerner', z:'Thank you so much!', na:{ de:'Vielen Dank!', es:'¡Muchas gracias!' } }
        ]
      },
      lesetext: {
        z:'A woman is looking for Market Square. A passer-by tells her to go straight for two blocks and then turn left. It is about a five-minute walk.',
        na:{ de:'Eine Frau sucht den Marktplatz. Ein Passant sagt ihr, sie soll zwei Straßen geradeaus gehen und dann links abbiegen. Es sind etwa fünf Minuten zu Fuß.', es:'Una mujer busca la plaza del mercado. Un transeúnte le dice que siga dos calles y luego gire a la izquierda. Son unos cinco minutos a pie.' },
        frage:{ de:'Wie weit ist es?', es:'¿A qué distancia está?' },
        optionen:[
          { na:{ de:'Etwa fünf Minuten', es:'Unos cinco minutos' }, richtig:true },
          { na:{ de:'Eine halbe Stunde', es:'Media hora' }, richtig:false },
          { na:{ de:'Zwei Stunden', es:'Dos horas' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag, wo der Bahnhof ist, und ob es weit ist. Zwei Sätze.', es:'Pregunta dónde está la estación y si está lejos. Dos frases.' },
        muster:'Excuse me, where\'s the station? Is it far?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'**A block** ist die amerikanische Entfernung: von einer Querstraße zur nächsten. „Two blocks" heißt also zwei Querstraßen weiter, nicht zwei Häuserblöcke. In England sagt man das nicht — dort heißt es „two streets".', es:'**A block** es la distancia americana: de una bocacalle a la siguiente. „Two blocks" son dos calles más allá — es la „cuadra" latinoamericana. En Inglaterra no se usa; allí dicen „two streets".' },
        beispiele:[
          { z:'Go two blocks.', na:{ de:'Gehen Sie zwei Straßen weiter.', es:'Siga dos calles.' } },
          { z:'It is three blocks from here.', na:{ de:'Es sind drei Straßen von hier.', es:'Está a tres calles de aquí.' } }
        ]
      }
    },

    'a1.wetter': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'See you! Stay dry out there.', na:{ de:'Bis dann! Bleib trocken.', es:'¡Hasta luego! Que no te mojes.' } },
      wortschatz: [
        { z:'the sun', na:{ de:'die Sonne', es:'el sol' } },
        { z:'the rain', na:{ de:'der Regen', es:'la lluvia' } },
        { z:'snow', na:{ de:'der Schnee', es:'la nieve' } },
        { z:'the wind', na:{ de:'der Wind', es:'el viento' } },
        { z:'warm', na:{ de:'warm', es:'cálido' } },
        { z:'cold', na:{ de:'kalt', es:'frío' } },
        { z:'sunny', na:{ de:'sonnig', es:'soleado' } },
        { z:'to rain', na:{ de:'regnen', es:'llover' } },
        { z:'an umbrella', na:{ de:'der Schirm', es:'el paraguas' } },
        { z:'a cloud', na:{ de:'die Wolke', es:'la nube' } },
        { z:'it\'s supposed to', na:{ de:'es soll', es:'dicen que va a' } },
        { z:'freezing', na:{ de:'eiskalt', es:'helado' } }
      ],
      dialog: {
        rolle: { de:'ein Kollege', es:'un compañero de trabajo' },
        zeilen: [
          { wer:'spikiu', z:'Beautiful day, huh?', na:{ de:'Schöner Tag heute, was?', es:'Qué buen día, ¿no?' } },
          { wer:'lerner', z:'Yes, it\'s sunny and warm.', na:{ de:'Ja, die Sonne scheint und es ist warm.', es:'Sí, hace sol y calor.' } },
          { wer:'spikiu', z:'What about tomorrow? Any idea?', na:{ de:'Und morgen? Weißt du das schon?', es:'¿Y mañana? ¿Ya lo sabes?' } },
          { wer:'lerner', z:'It\'s supposed to rain tomorrow.', na:{ de:'Morgen soll es regnen.', es:'Dicen que mañana llueve.' } },
          { wer:'spikiu', z:'Then I\'ll bring an umbrella.', na:{ de:'Dann nehme ich einen Schirm mit.', es:'Entonces me llevo el paraguas.' } },
          { wer:'lerner', z:'Good idea. See you tomorrow!', na:{ de:'Gute Idee. Bis morgen!', es:'Buena idea. ¡Hasta mañana!' } }
        ]
      },
      lesetext: {
        z:'Today the sun is shining and it\'s warm. Tomorrow it\'s supposed to rain, so a coworker is bringing an umbrella. They\'ll see each other again tomorrow.',
        na:{ de:'Heute scheint die Sonne und es ist warm. Morgen soll es regnen, deshalb nimmt ein Kollege einen Schirm mit. Morgen sehen sie sich wieder.', es:'Hoy hace sol y calor. Mañana dicen que va a llover, así que un compañero se lleva un paraguas. Mañana se vuelven a ver.' },
        frage:{ de:'Wie ist das Wetter heute?', es:'¿Qué tiempo hace hoy?' },
        optionen:[
          { na:{ de:'Sonnig und warm', es:'Soleado y cálido' }, richtig:true },
          { na:{ de:'Regnerisch', es:'Lluvioso' }, richtig:false },
          { na:{ de:'Kalt', es:'Frío' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, wie das Wetter heute ist und wie es morgen wird. Zwei Sätze.', es:'Di qué tiempo hace hoy y qué tiempo hará mañana. Dos frases.' },
        muster:'It\'s sunny and warm today. Tomorrow it\'s supposed to rain.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Englisch braucht beim Wetter immer ein **it**, das niemand ist: **it\'s** raining, **it\'s** cold, **it\'s** sunny. Genau wie das deutsche „es" in „es regnet" — hier sind sich die beiden Sprachen einmal einig.', es:'El inglés necesita siempre un **it** delante, que no es nadie: **it\'s** raining, **it\'s** cold, **it\'s** sunny. El español dice simplemente „llueve"; en inglés ese *it* no se puede quitar nunca.' },
        beispiele:[
          { z:'It\'s raining.', na:{ de:'Es regnet.', es:'Llueve.' } },
          { z:'It\'s cold today.', na:{ de:'Heute ist es kalt.', es:'Hoy hace frío.' } }
        ]
      }
    },

    'a2.arzt': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Yes — come back Thursday. I\'ll write you a referral to a specialist.', na:{ de:'Ja, kommen Sie Donnerstag wieder. Ich schreibe Ihnen eine Überweisung zum Facharzt.', es:'Sí, vuelva el jueves. Le hago un volante para el especialista.' } },
      wortschatz: [
        { z:'to fall', na:{ de:'stürzen', es:'caerse' } },
        { z:'to get worse', na:{ de:'schlimmer werden', es:'empeorar' } },
        { z:'the shoulder', na:{ de:'die Schulter', es:'el hombro' } },
        { z:'painkillers', na:{ de:'die Schmerztabletten', es:'los analgésicos' } },
        { z:'allergic', na:{ de:'allergisch', es:'alérgico' } },
        { z:'an X-ray', na:{ de:'das Röntgenbild', es:'la radiografía' } },
        { z:'the appointment', na:{ de:'der Termin', es:'la cita' } },
        { z:'a referral', na:{ de:'die Überweisung', es:'el volante' } },
        { z:'a specialist', na:{ de:'der Facharzt', es:'el especialista' } },
        { z:'the waiting room', na:{ de:'das Wartezimmer', es:'la sala de espera' } },
        { z:'to treat', na:{ de:'behandeln', es:'tratar' } },
        { z:'to go from there', na:{ de:'weitersehen', es:'ver después' } }
      ],
      dialog: {
        rolle: { de:'der Arzt', es:'el médico' },
        zeilen: [
          { wer:'spikiu', z:'Have a seat. So what happened?', na:{ de:'Setzen Sie sich. Was ist denn passiert?', es:'Siéntese. ¿Qué le pasó?' } },
          { wer:'lerner', z:'I fell last week, and my shoulder\'s gotten worse.', na:{ de:'Ich bin letzte Woche gestürzt, und die Schulter ist schlimmer geworden.', es:'Me caí la semana pasada y el hombro ha empeorado.' } },
          { wer:'spikiu', z:'Anything you\'re taking right now?', na:{ de:'Nehmen Sie zurzeit Medikamente?', es:'¿Toma alguna medicina ahora?' } },
          { wer:'lerner', z:'Just painkillers. I\'m allergic to penicillin.', na:{ de:'Nur Schmerztabletten. Gegen Penizillin bin ich allergisch.', es:'Solo analgésicos. Soy alérgico a la penicilina.' } },
          { wer:'spikiu', z:'Noted. Let\'s get an X-ray and go from there.', na:{ de:'Notiert. Machen wir ein Röntgenbild und sehen weiter.', es:'Anotado. Hagamos una radiografía y vemos.' } },
          { wer:'lerner', z:'Okay. Do I need another appointment?', na:{ de:'In Ordnung. Brauche ich noch einen Termin?', es:'De acuerdo. ¿Necesito otra cita?' } }
        ]
      },
      lesetext: {
        z:'A patient fell last week and her shoulder has gotten worse. She only takes painkillers and is allergic to penicillin. The doctor orders an X-ray and asks her to come back Thursday with a referral to a specialist.',
        na:{ de:'Eine Patientin ist letzte Woche gestürzt, und die Schulter ist schlimmer geworden. Sie nimmt nur Schmerztabletten und ist gegen Penizillin allergisch. Der Arzt ordnet ein Röntgenbild an und bittet sie, am Donnerstag mit einer Überweisung zum Facharzt wiederzukommen.', es:'Una paciente se cayó la semana pasada y el hombro ha empeorado. Solo toma analgésicos y es alérgica a la penicilina. El médico pide una radiografía y le dice que vuelva el jueves con un volante para el especialista.' },
        frage:{ de:'Wogegen ist sie allergisch?', es:'¿A qué es alérgica?' },
        optionen:[
          { na:{ de:'Gegen Penizillin', es:'A la penicilina' }, richtig:true },
          { na:{ de:'Gegen Schmerztabletten', es:'A los analgésicos' }, richtig:false },
          { na:{ de:'Gegen Nüsse', es:'A los frutos secos' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, was passiert ist, und nenne deine Allergie. Zwei Sätze.', es:'Cuenta qué te pasó y di a qué eres alérgico. Dos frases.' },
        muster:'I fell yesterday and my knee hurts. I\'m allergic to penicillin.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'**It got worse** heißt: es wurde schlimmer, Punkt, vorbei. **It has gotten worse** heißt: und es ist immer noch so — deshalb sitze ich hier. Beim Arzt braucht man fast immer die zweite Form, weil das Problem ja andauert.', es:'**It got worse** significa: empeoró, y punto. **It has gotten worse** significa: y sigue así — por eso estoy aquí. En la consulta casi siempre hace falta la segunda forma, porque el problema continúa.' },
        beispiele:[
          { z:'It has gotten worse.', na:{ de:'Es ist schlimmer geworden.', es:'Ha empeorado.' } },
          { z:'I\'ve had it since Monday.', na:{ de:'Ich habe es seit Montag.', es:'Lo tengo desde el lunes.' } }
        ]
      }
    },

    'a2.bahnhof': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Next. What can I do for you?', na:{ de:'Der Nächste bitte. Was kann ich für Sie tun?', es:'El siguiente. ¿En qué le ayudo?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Then your ticket\'s good on the next one — no rebooking fee. Safe travels!', na:{ de:'Dann gilt Ihre Fahrkarte im nächsten Zug, ohne Umbuchungsgebühr. Gute Fahrt!', es:'Entonces su billete vale para el siguiente, sin cargo por cambio. ¡Buen viaje!' } },
      wortschatz: [
        { z:'to run late', na:{ de:'Verspätung haben', es:'llevar retraso' } },
        { z:'to transfer', na:{ de:'umsteigen', es:'hacer transbordo' } },
        { z:'the connection', na:{ de:'der Anschluss', es:'el enlace' } },
        { z:'to miss', na:{ de:'verpassen', es:'perder' } },
        { z:'the ticket', na:{ de:'die Fahrkarte', es:'el billete' } },
        { z:'the track', na:{ de:'das Gleis', es:'el andén' } },
        { z:'the counter', na:{ de:'der Schalter', es:'la ventanilla' } },
        { z:'a rebooking fee', na:{ de:'die Umbuchungsgebühr', es:'el cargo por cambio' } },
        { z:'refunded', na:{ de:'erstattet', es:'reembolsado' } },
        { z:'tight', na:{ de:'knapp', es:'justo' } },
        { z:'roughly', na:{ de:'ungefähr', es:'aproximadamente' } },
        { z:'to hold', na:{ de:'warten', es:'esperar' } }
      ],
      dialog: {
        rolle: { de:'der Serviceberater', es:'el empleado de información' },
        zeilen: [
          { wer:'spikiu', z:'Next. What can I do for you?', na:{ de:'Der Nächste bitte. Was kann ich für Sie tun?', es:'El siguiente. ¿En qué le ayudo?' } },
          { wer:'lerner', z:'My train\'s running twenty minutes late.', na:{ de:'Mein Zug hat zwanzig Minuten Verspätung.', es:'Mi tren lleva veinte minutos de retraso.' } },
          { wer:'spikiu', z:'Sorry about that. When\'s your connection?', na:{ de:'Das tut mir leid. Wann müssen Sie umsteigen?', es:'Lo siento. ¿A qué hora tiene el transbordo?' } },
          { wer:'lerner', z:'In Albany, at quarter past three.', na:{ de:'In Albany, um Viertel nach drei.', es:'En Albany, a las tres y cuarto.' } },
          { wer:'spikiu', z:'That\'s tight. The connection won\'t hold for you.', na:{ de:'Das wird knapp. Der Anschluss wartet nicht.', es:'Va justo. El enlace no espera.' } },
          { wer:'lerner', z:'And if I miss it?', na:{ de:'Und wenn ich ihn verpasse?', es:'¿Y si lo pierdo?' } }
        ]
      },
      lesetext: {
        z:'A traveller\'s train is running twenty minutes late. His connection in Albany is at quarter past three, which will be tight — and the connection won\'t hold. If he misses it, his ticket is good on the next train, with no rebooking fee.',
        na:{ de:'Der Zug eines Reisenden hat zwanzig Minuten Verspätung. Sein Anschluss in Albany ist um Viertel nach drei, das wird knapp — und der Anschluss wartet nicht. Wenn er ihn verpasst, gilt seine Fahrkarte im nächsten Zug, ohne Umbuchungsgebühr.', es:'El tren de un viajero lleva veinte minutos de retraso. Su enlace en Albany es a las tres y cuarto, va justo, y el enlace no espera. Si lo pierde, su billete vale para el siguiente tren, sin cargo por cambio.' },
        frage:{ de:'Was passiert, wenn er den Anschluss verpasst?', es:'¿Qué pasa si pierde el enlace?' },
        optionen:[
          { na:{ de:'Die Fahrkarte gilt im nächsten Zug', es:'Su billete vale para el siguiente' }, richtig:true },
          { na:{ de:'Er zahlt eine Gebühr', es:'Paga un cargo' }, richtig:false },
          { na:{ de:'Er bekommt Geld zurück', es:'Le devuelven el dinero' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass dein Zug Verspätung hat, und frag, was passiert, wenn du den Anschluss verpasst. Zwei Sätze.', es:'Di que tu tren lleva retraso y pregunta qué pasa si pierdes el enlace. Dos frases.' },
        muster:'My train\'s running half an hour late. What happens if I miss my connection?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Für Verspätung sagt niemand „my train has delay". Die Formel ist **my train is running late** — *running* für alles, was gerade läuft und nicht nach Plan. Und **the connection won\'t hold**: *hold* heißt hier warten, nicht halten.', es:'Para el retraso nadie dice „my train has delay". La fórmula es **my train is running late** — *running* para todo lo que va en marcha y fuera de plan. Y **the connection won\'t hold**: aquí *hold* significa esperar, no sujetar.' },
        beispiele:[
          { z:'My train\'s running late.', na:{ de:'Mein Zug hat Verspätung.', es:'Mi tren lleva retraso.' } },
          { z:'The connection won\'t hold.', na:{ de:'Der Anschluss wartet nicht.', es:'El enlace no espera.' } }
        ]
      }
    },

    'a2.cafe': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'How\'s everything over here?', na:{ de:'Alles in Ordnung bei Ihnen?', es:'¿Qué tal todo por aquí?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Good call. I\'ll bring them out together.', na:{ de:'Gute Wahl. Ich bringe Ihnen beides zusammen.', es:'Buena elección. Le traigo las dos cosas juntas.' } },
      wortschatz: [
        { z:'cold', na:{ de:'kalt', es:'frío' } },
        { z:'lukewarm', na:{ de:'lauwarm', es:'tibio' } },
        { z:'sorry to bother you', na:{ de:'entschuldigen Sie die Störung', es:'disculpe la molestia' } },
        { z:'nuts', na:{ de:'die Nüsse', es:'los frutos secos' } },
        { z:'allergic', na:{ de:'allergisch', es:'alérgico' } },
        { z:'the ingredients', na:{ de:'die Zutaten', es:'los ingredientes' } },
        { z:'to swap', na:{ de:'umtauschen', es:'cambiar' } },
        { z:'though', na:{ de:'allerdings', es:'aunque' } },
        { z:'fresh', na:{ de:'frisch', es:'fresco' } },
        { z:'actually', na:{ de:'eigentlich', es:'en realidad' } },
        { z:'a refill', na:{ de:'die kostenlose Nachfüllung', es:'el rellenado gratis' } },
        { z:'to double-check', na:{ de:'nochmal nachsehen', es:'volver a comprobar' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero' },
        zeilen: [
          { wer:'spikiu', z:'How\'s everything over here?', na:{ de:'Alles in Ordnung bei Ihnen?', es:'¿Qué tal todo por aquí?' } },
          { wer:'lerner', z:'Sorry to bother you, but the coffee\'s cold.', na:{ de:'Entschuldigung, der Kaffee ist leider kalt.', es:'Disculpe la molestia, el café está frío.' } },
          { wer:'spikiu', z:'Oh, I\'m so sorry. I\'ll get you a fresh one right away.', na:{ de:'Das tut mir leid, ich bringe Ihnen sofort einen neuen.', es:'Lo siento mucho. Ahora mismo le traigo otro.' } },
          { wer:'lerner', z:'Thanks. Also — does the cake have nuts in it?', na:{ de:'Danke. Und noch etwas: sind in dem Kuchen Nüsse?', es:'Gracias. Y otra cosa: ¿la tarta lleva frutos secos?' } },
          { wer:'spikiu', z:'That one does. The lemon cake doesn\'t, though.', na:{ de:'In dem schon. Der Zitronenkuchen aber nicht.', es:'En esa sí. Pero la de limón no lleva.' } },
          { wer:'lerner', z:'I\'ll take the lemon one — I\'m allergic.', na:{ de:'Dann den Zitronenkuchen, ich bin nämlich allergisch.', es:'Entonces la de limón, es que soy alérgico.' } }
        ]
      },
      lesetext: {
        z:'A customer tells the server the coffee is cold. The server apologises and brings a fresh one. The customer also asks about nuts in the cake, because she\'s allergic. The lemon cake is nut-free, so she takes that one.',
        na:{ de:'Eine Kundin sagt dem Kellner, der Kaffee sei kalt. Er entschuldigt sich und bringt einen neuen. Sie fragt außerdem nach Nüssen im Kuchen, weil sie allergisch ist. Der Zitronenkuchen ist nussfrei, also nimmt sie den.', es:'Una clienta le dice al camarero que el café está frío. Él se disculpa y trae otro. Además pregunta si la tarta lleva frutos secos, porque es alérgica. La de limón no lleva, así que se lleva esa.' },
        frage:{ de:'Warum nimmt sie den Zitronenkuchen?', es:'¿Por qué elige la de limón?' },
        optionen:[
          { na:{ de:'Er ist ohne Nüsse', es:'No lleva frutos secos' }, richtig:true },
          { na:{ de:'Er ist billiger', es:'Es más barata' }, richtig:false },
          { na:{ de:'Es ist der letzte', es:'Es la última' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag höflich, dass deine Suppe kalt ist, und frag, was darin ist. Zwei Sätze.', es:'Di con cortesía que tu sopa está fría y pregunta qué lleva. Dos frases.' },
        muster:'Sorry to bother you, but the soup is cold. What is in it, actually?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Eine englische Beschwerde beginnt fast nie mit der Beschwerde. Vorn steht eine Formel: **Sorry to bother you, but…** oder **Excuse me, I think…** Das ist dieselbe Arbeit, die im Deutschen das Wörtchen *leider* macht — nur mit vier Wörtern statt einem.', es:'Una queja inglesa casi nunca empieza por la queja. Delante va una fórmula: **Sorry to bother you, but…** o **Excuse me, I think…** Es el mismo trabajo que hace „disculpe" en español, pero es obligatorio, no opcional.' },
        beispiele:[
          { z:'Sorry to bother you, but the coffee\'s cold.', na:{ de:'Entschuldigung, der Kaffee ist leider kalt.', es:'Disculpe, el café está frío.' } },
          { z:'Excuse me, I think there\'s a mistake.', na:{ de:'Entschuldigung, ich glaube, da ist ein Fehler.', es:'Perdone, creo que hay un error.' } }
        ]
      }
    },

    'a2.einkaufen': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Hi there — what can I help you with?', na:{ de:'Guten Tag, womit kann ich Ihnen helfen?', es:'Hola, ¿en qué le puedo ayudar?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Go right ahead — fitting rooms are in the back. I\'ll grab your size.', na:{ de:'Nur zu, die Kabinen sind hinten. Ich hole Ihnen die Größe.', es:'Adelante, los probadores están al fondo. Le traigo la talla.' } },
      wortschatz: [
        { z:'a shirt', na:{ de:'das Hemd', es:'la camisa' } },
        { z:'the size', na:{ de:'die Größe', es:'la talla' } },
        { z:'too big', na:{ de:'zu groß', es:'demasiado grande' } },
        { z:'too small', na:{ de:'zu klein', es:'demasiado pequeño' } },
        { z:'the receipt', na:{ de:'der Kassenbon', es:'el ticket' } },
        { z:'to exchange', na:{ de:'umtauschen', es:'cambiar' } },
        { z:'to return', na:{ de:'zurückgeben (Geld zurück)', es:'devolver (dinero de vuelta)' } },
        { z:'to try on', na:{ de:'anprobieren', es:'probarse' } },
        { z:'the fitting room', na:{ de:'die Umkleidekabine', es:'el probador' } },
        { z:'to fit', na:{ de:'passen', es:'quedar bien' } },
        { z:'one size down', na:{ de:'eine Nummer kleiner', es:'una talla menos' } },
        { z:'on sale', na:{ de:'im Angebot', es:'en oferta' } }
      ],
      dialog: {
        rolle: { de:'die Verkäuferin', es:'la vendedora' },
        zeilen: [
          { wer:'spikiu', z:'Hi there — what can I help you with?', na:{ de:'Guten Tag, womit kann ich Ihnen helfen?', es:'Hola, ¿en qué le puedo ayudar?' } },
          { wer:'lerner', z:'I bought this shirt yesterday, but it\'s too big on me.', na:{ de:'Ich habe dieses Hemd gestern gekauft, aber es ist mir zu groß.', es:'Compré esta camisa ayer, pero me queda grande.' } },
          { wer:'spikiu', z:'No problem. Do you have the receipt?', na:{ de:'Kein Problem. Haben Sie den Kassenbon dabei?', es:'Sin problema. ¿Trae el ticket?' } },
          { wer:'lerner', z:'Yes, right here. Can I exchange it?', na:{ de:'Ja, hier. Kann ich es umtauschen?', es:'Sí, aquí está. ¿Puedo cambiarla?' } },
          { wer:'spikiu', z:'Of course. What size do you need?', na:{ de:'Selbstverständlich. Welche Größe brauchen Sie?', es:'Por supuesto. ¿Qué talla necesita?' } },
          { wer:'lerner', z:'One size down. Can I try it on?', na:{ de:'Eine kleiner. Darf ich es anprobieren?', es:'Una menos. ¿Me la puedo probar?' } }
        ]
      },
      lesetext: {
        z:'A customer bought a shirt yesterday, but it\'s too big on her. She has the receipt, so she can exchange it. She needs one size down and asks to try it on. The fitting rooms are in the back.',
        na:{ de:'Eine Kundin hat gestern ein Hemd gekauft, aber es ist ihr zu groß. Sie hat den Kassenbon, also kann sie es umtauschen. Sie braucht eine Nummer kleiner und möchte es anprobieren. Die Umkleidekabinen sind hinten.', es:'Una clienta compró ayer una camisa, pero le queda grande. Tiene el ticket, así que puede cambiarla. Necesita una talla menos y pide probársela. Los probadores están al fondo.' },
        frage:{ de:'Was braucht sie?', es:'¿Qué necesita?' },
        optionen:[
          { na:{ de:'Eine Nummer kleiner', es:'Una talla menos' }, richtig:true },
          { na:{ de:'Eine andere Farbe', es:'Otro color' }, richtig:false },
          { na:{ de:'Ihr Geld zurück', es:'Que le devuelvan el dinero' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass die Hose zu klein ist, und frag, ob du sie umtauschen kannst. Zwei Sätze.', es:'Di que el pantalón te queda pequeño y pregunta si puedes cambiarlo. Dos frases.' },
        muster:'These pants are a little too small on me. Can I exchange them?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'„It\'s too big" heißt: es ist zu groß, für jeden. **It\'s too big on me** heißt: mir ist es zu groß, jemand anderem vielleicht nicht. Dieses kleine **on me** benutzen Muttersprachler ständig, wenn es um Kleidung geht.', es:'„It\'s too big" significa: es grande, para cualquiera. **It\'s too big on me** significa: a mí me queda grande. Ese pequeño **on me** es exactamente el „me queda" español, y los nativos lo usan siempre con ropa.' },
        beispiele:[
          { z:'It\'s too big on me.', na:{ de:'Es ist mir zu groß.', es:'Me queda grande.' } },
          { z:'These fit me well.', na:{ de:'Die passen mir gut.', es:'Estos me quedan bien.' } }
        ]
      }
    },

    'a2.familie': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'I get that. You\'ll see her soon enough, I bet.', na:{ de:'Das kann ich verstehen. Ihr seht euch bestimmt bald wieder.', es:'Lo entiendo. Seguro que la ves pronto.' } },
      wortschatz: [
        { z:'to grow up', na:{ de:'aufwachsen', es:'criarse' } },
        { z:'a small town', na:{ de:'der kleine Ort', es:'el pueblo pequeño' } },
        { z:'to move away', na:{ de:'wegziehen', es:'mudarse' } },
        { z:'to miss someone', na:{ de:'jemanden vermissen', es:'echar de menos a alguien' } },
        { z:'to get together', na:{ de:'sich treffen', es:'reunirse' } },
        { z:'an aunt', na:{ de:'die Tante', es:'la tía' } },
        { z:'an uncle', na:{ de:'der Onkel', es:'el tío' } },
        { z:'a cousin', na:{ de:'der Cousin', es:'el primo' } },
        { z:'back then', na:{ de:'damals', es:'en aquella época' } },
        { z:'we\'d', na:{ de:'wir haben immer', es:'nosotros solíamos' } },
        { z:'anyway', na:{ de:'übrigens', es:'por cierto' } },
        { z:'I bet', na:{ de:'ich wette', es:'seguro que' } }
      ],
      dialog: {
        rolle: { de:'ein alter Freund', es:'un viejo amigo' },
        zeilen: [
          { wer:'spikiu', z:'So where\'d you grow up, anyway?', na:{ de:'Wo hast du eigentlich als Kind gewohnt?', es:'¿Y dónde creciste tú, por cierto?' } },
          { wer:'lerner', z:'We lived in a small town.', na:{ de:'Wir haben in einem kleinen Ort gewohnt.', es:'Vivíamos en un pueblo pequeño.' } },
          { wer:'spikiu', z:'Was the whole family out there?', na:{ de:'Und war die ganze Familie dort?', es:'¿Y estaba toda la familia allí?' } },
          { wer:'lerner', z:'Yeah. On Sundays we\'d all meet at my aunt\'s place.', na:{ de:'Ja. Sonntags haben wir uns alle bei meiner Tante getroffen.', es:'Sí. Los domingos nos reuníamos en casa de mi tía.' } },
          { wer:'spikiu', z:'That\'s nice. Are they still around?', na:{ de:'Wie schön. Sind sie noch da?', es:'Qué bonito. ¿Siguen allí?' } },
          { wer:'lerner', z:'No, my sister moved away. I miss her.', na:{ de:'Nein, meine Schwester ist weggezogen. Ich vermisse sie.', es:'No, mi hermana se mudó. La echo de menos.' } }
        ]
      },
      lesetext: {
        z:'Two old friends talk about growing up. He lived in a small town. On Sundays the whole family would meet at his aunt\'s place. His sister has moved away now, and he misses her.',
        na:{ de:'Zwei alte Freunde reden über früher. Er hat in einem kleinen Ort gewohnt. Sonntags hat sich die ganze Familie bei seiner Tante getroffen. Seine Schwester ist inzwischen weggezogen, und er vermisst sie.', es:'Dos viejos amigos hablan de su infancia. Él vivía en un pueblo pequeño. Los domingos toda la familia se reunía en casa de su tía. Su hermana se ha mudado y la echa de menos.' },
        frage:{ de:'Was haben sie sonntags gemacht?', es:'¿Qué hacían los domingos?' },
        optionen:[
          { na:{ de:'Sich bei der Tante getroffen', es:'Se reunían en casa de la tía' }, richtig:true },
          { na:{ de:'Gearbeitet', es:'Trabajaban' }, richtig:false },
          { na:{ de:'Nichts Besonderes', es:'Nada especial' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, wo du aufgewachsen bist und was ihr sonntags gemacht habt. Zwei Sätze.', es:'Cuenta dónde creciste y qué hacíais los domingos. Dos frases.' },
        muster:'I grew up in a small town. On Sundays we\'d visit my grandparents.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Für etwas, das früher regelmäßig geschah, sagt Englisch **we\'d meet** oder **we used to meet** — nicht einfach *we met*. Das *we\'d* ist hier keine Höflichkeit, sondern heißt: immer wieder, damals. Deutsch braucht dafür ein Wörtchen wie „immer" oder „sonntags".', es:'Para algo que pasaba habitualmente, el inglés dice **we\'d meet** o **we used to meet**, no simplemente *we met*. Es exactamente el imperfecto español („nos reuníamos"), que el inglés no tiene y resuelve así.' },
        beispiele:[
          { z:'We\'d meet every Sunday.', na:{ de:'Wir haben uns jeden Sonntag getroffen.', es:'Nos reuníamos todos los domingos.' } },
          { z:'I used to live there.', na:{ de:'Früher habe ich dort gewohnt.', es:'Antes vivía allí.' } }
        ]
      }
    },

    'a2.hotel': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Good morning. How\'s the room treating you?', na:{ de:'Guten Morgen. Alles zu Ihrer Zufriedenheit?', es:'Buenos días. ¿Qué tal la habitación?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Absolutely. I\'ll put you in 305 — it\'s quieter anyway.', na:{ de:'Selbstverständlich. Ich gebe Ihnen die 305, die ist ohnehin ruhiger.', es:'Por supuesto. Le doy la 305, además es más tranquila.' } },
      wortschatz: [
        { z:'the heat', na:{ de:'die Heizung', es:'la calefacción' } },
        { z:'to be out', na:{ de:'kaputt sein', es:'estar estropeado' } },
        { z:'hot water', na:{ de:'warmes Wasser', es:'agua caliente' } },
        { z:'a towel', na:{ de:'das Handtuch', es:'la toalla' } },
        { z:'the AC', na:{ de:'die Klimaanlage', es:'el aire acondicionado' } },
        { z:'to move rooms', na:{ de:'das Zimmer wechseln', es:'cambiar de habitación' } },
        { z:'I\'d rather', na:{ de:'ich würde lieber', es:'preferiría' } },
        { z:'quiet', na:{ de:'ruhig', es:'tranquilo' } },
        { z:'noisy', na:{ de:'laut', es:'ruidoso' } },
        { z:'right away', na:{ de:'sofort', es:'ahora mismo' } },
        { z:'to let someone know', na:{ de:'Bescheid geben', es:'avisar' } },
        { z:'housekeeping', na:{ de:'der Zimmerservice', es:'el servicio de habitaciones' } }
      ],
      dialog: {
        rolle: { de:'die Rezeptionistin', es:'la recepcionista' },
        zeilen: [
          { wer:'spikiu', z:'Good morning. How\'s the room treating you?', na:{ de:'Guten Morgen. Alles zu Ihrer Zufriedenheit?', es:'Buenos días. ¿Qué tal la habitación?' } },
          { wer:'lerner', z:'Morning. Unfortunately the heat isn\'t working.', na:{ de:'Guten Morgen. Leider funktioniert die Heizung nicht.', es:'Buenos días. Lamentablemente la calefacción no funciona.' } },
          { wer:'spikiu', z:'Sorry to hear that. How long has it been out?', na:{ de:'Das tut mir leid. Seit wann denn?', es:'Lo siento mucho. ¿Desde cuándo?' } },
          { wer:'lerner', z:'Since last night. And there\'s no hot water either.', na:{ de:'Seit gestern Abend. Und warmes Wasser gibt es auch nicht.', es:'Desde anoche. Y tampoco hay agua caliente.' } },
          { wer:'spikiu', z:'I can send someone up, or I can move you.', na:{ de:'Ich kann jemanden hochschicken, oder ich verlege Sie.', es:'Puedo mandar a alguien, o puedo cambiarle de habitación.' } },
          { wer:'lerner', z:'I\'d rather move, if that\'s possible.', na:{ de:'Ich würde lieber wechseln, wenn das geht.', es:'Preferiría cambiar, si es posible.' } }
        ]
      },
      lesetext: {
        z:'A guest reports that the heat isn\'t working and there\'s no hot water either. It\'s been out since last night. The clerk offers to send someone up or move him. He\'d rather move, and gets room 305, which is quieter.',
        na:{ de:'Ein Gast meldet, dass die Heizung nicht funktioniert und es auch kein warmes Wasser gibt. Seit gestern Abend ist es so. Die Rezeption bietet an, jemanden zu schicken oder ihn umzuquartieren. Er wechselt lieber und bekommt Zimmer 305, das ruhiger liegt.', es:'Un huésped informa de que la calefacción no funciona y tampoco hay agua caliente. Lleva así desde anoche. La recepción ofrece mandar a alguien o cambiarle de habitación. Prefiere cambiar y le dan la 305, que es más tranquila.' },
        frage:{ de:'Wofür entscheidet sich der Gast?', es:'¿Qué elige el huésped?' },
        optionen:[
          { na:{ de:'Das Zimmer zu wechseln', es:'Cambiar de habitación' }, richtig:true },
          { na:{ de:'Auf jemanden zu warten', es:'Esperar a alguien' }, richtig:false },
          { na:{ de:'Auszuchecken', es:'Dejar el hotel' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Melde, dass das Licht nicht geht, und bitte um ein anderes Zimmer. Zwei Sätze.', es:'Informa de que la luz no funciona y pide otra habitación. Dos frases.' },
        muster:'The light in the bathroom isn\'t working. I\'d rather move to another room, if possible.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'**I want to move** klingt fordernd. **I\'d rather move** sagt dieselbe Sache als Vorliebe statt als Forderung — genau wie das deutsche „ich würde lieber". Nach *I\'d rather* steht das Verb in der Grundform, ohne *to*.', es:'**I want to move** suena a exigencia. **I\'d rather move** dice lo mismo como preferencia, no como demanda — es el „preferiría" español. Después de *I\'d rather* el verbo va desnudo, sin *to*.' },
        beispiele:[
          { z:'I\'d rather move.', na:{ de:'Ich würde lieber wechseln.', es:'Preferiría cambiar.' } },
          { z:'I\'d rather wait outside.', na:{ de:'Ich würde lieber draußen warten.', es:'Preferiría esperar fuera.' } }
        ]
      }
    },

    'a2.restaurant': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Have you two decided, or do you need another minute?', na:{ de:'Haben Sie schon gewählt, oder brauchen Sie noch einen Moment?', es:'¿Ya eligieron, o necesitan un momento más?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Not at all — happens all the time. Water for the table?', na:{ de:'Aber gerne, das machen wir ständig. Wasser für den Tisch?', es:'Claro que sí, lo hacemos a menudo. ¿Agua para la mesa?' } },
      wortschatz: [
        { z:'the specialty', na:{ de:'die Spezialität', es:'la especialidad' } },
        { z:'rich', na:{ de:'deftig', es:'contundente' } },
        { z:'light', na:{ de:'leicht', es:'ligero' } },
        { z:'to share', na:{ de:'teilen', es:'compartir' } },
        { z:'split the check', na:{ de:'getrennt zahlen', es:'pagar por separado' } },
        { z:'ribs', na:{ de:'die Rippchen', es:'las costillas' } },
        { z:'a plate', na:{ de:'der Teller', es:'el plato' } },
        { z:'plenty', na:{ de:'reichlich', es:'de sobra' } },
        { z:'would you mind', na:{ de:'wären Sie so nett', es:'le importaría' } },
        { z:'to be worth it', na:{ de:'sich lohnen', es:'valer la pena' } },
        { z:'the tip', na:{ de:'das Trinkgeld', es:'la propina' } },
        { z:'all set', na:{ de:'fertig', es:'listo' } }
      ],
      dialog: {
        rolle: { de:'der Kellner', es:'el camarero' },
        zeilen: [
          { wer:'spikiu', z:'Have you two decided, or do you need another minute?', na:{ de:'Haben Sie schon gewählt, oder brauchen Sie noch einen Moment?', es:'¿Ya eligieron, o necesitan un momento más?' } },
          { wer:'lerner', z:'What\'s the house specialty?', na:{ de:'Was ist Ihre Spezialität?', es:'¿Cuál es la especialidad de la casa?' } },
          { wer:'spikiu', z:'The ribs. They\'re rich, but worth it.', na:{ de:'Die Rippchen. Ziemlich deftig, aber es lohnt sich.', es:'Las costillas. Contundentes, pero valen la pena.' } },
          { wer:'lerner', z:'Is there something lighter? We\'d like to share.', na:{ de:'Gibt es etwas Leichteres? Wir möchten teilen.', es:'¿Hay algo más ligero? Queremos compartir.' } },
          { wer:'spikiu', z:'The fish plate, then. That\'s plenty for two.', na:{ de:'Dann der Fischteller. Der reicht gut für zwei.', es:'Entonces el plato de pescado. Alcanza para dos.' } },
          { wer:'lerner', z:'Perfect. Would you mind splitting the check later?', na:{ de:'Gut. Könnten wir hinterher getrennt zahlen?', es:'Perfecto. ¿Nos podría traer cuentas separadas?' } }
        ]
      },
      lesetext: {
        z:'Two guests ask about the house specialty. The ribs are rich, so they\'d rather share something lighter. The server suggests the fish plate — plenty for two. They also ask to split the check, which is no problem at all.',
        na:{ de:'Zwei Gäste fragen nach der Spezialität des Hauses. Die Rippchen sind deftig, deshalb teilen sie lieber etwas Leichteres. Der Kellner schlägt den Fischteller vor — reicht für zwei. Sie bitten außerdem um getrennte Rechnungen, was überhaupt kein Problem ist.', es:'Dos clientes preguntan por la especialidad de la casa. Las costillas son contundentes, así que prefieren compartir algo más ligero. El camarero sugiere el plato de pescado, que alcanza para dos. Piden además cuentas separadas, lo que no supone ningún problema.' },
        frage:{ de:'Was schlägt der Kellner vor?', es:'¿Qué sugiere el camarero?' },
        optionen:[
          { na:{ de:'Den Fischteller', es:'El plato de pescado' }, richtig:true },
          { na:{ de:'Die Rippchen', es:'Las costillas' }, richtig:false },
          { na:{ de:'Zwei Nachtische', es:'Dos postres' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag nach der Spezialität und bitte um getrennte Rechnungen. Zwei Sätze.', es:'Pregunta por la especialidad y pide cuentas separadas. Dos frases.' },
        muster:'What\'s the house specialty? Would you mind splitting the check?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'**Would you mind…?** heißt wörtlich „hätten Sie etwas dagegen?". Deshalb bedeutet die Antwort **not at all** ein *Ja, gerne* — obwohl da „überhaupt nicht" steht. Wer hier wörtlich übersetzt, versteht das Gegenteil.', es:'**Would you mind…?** significa literalmente „¿le importaría?". Por eso la respuesta **not at all** quiere decir *sí, claro* — aunque diga „en absoluto". Traducir palabra por palabra aquí da justo lo contrario.' },
        beispiele:[
          { z:'Would you mind splitting the check?', na:{ de:'Könnten wir getrennt zahlen?', es:'¿Nos podría traer cuentas separadas?' } },
          { z:'Not at all.', na:{ de:'Aber gerne.', es:'Claro que sí.' } }
        ]
      }
    },

    'a2.taxi': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Morning. Where can I take you?', na:{ de:'Guten Morgen. Wohin darf ich Sie bringen?', es:'Buenos días. ¿Adónde le llevo?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'You got it. We\'ll make it in plenty of time.', na:{ de:'Kein Problem. Wir schaffen es locker.', es:'Sin problema. Llegamos de sobra.' } },
      wortschatz: [
        { z:'a backup', na:{ de:'der Stau', es:'el atasco' } },
        { z:'the freeway', na:{ de:'die Autobahn', es:'la autopista' } },
        { z:'traffic', na:{ de:'der Verkehr', es:'el tráfico' } },
        { z:'in a rush', na:{ de:'in Eile', es:'con prisa' } },
        { z:'a receipt', na:{ de:'die Quittung', es:'el recibo' } },
        { z:'to take a turn', na:{ de:'abbiegen', es:'girar' } },
        { z:'a detour', na:{ de:'die Umleitung', es:'el desvío' } },
        { z:'on time', na:{ de:'pünktlich', es:'a tiempo' } },
        { z:'roadwork', na:{ de:'die Baustelle', es:'las obras' } },
        { z:'to take', na:{ de:'dauern', es:'durar' } },
        { z:'actually', na:{ de:'wirklich', es:'de verdad' } },
        { z:'you got it', na:{ de:'mach ich', es:'claro que sí' } }
      ],
      dialog: {
        rolle: { de:'der Taxifahrer', es:'el taxista' },
        zeilen: [
          { wer:'spikiu', z:'Morning. Where can I take you?', na:{ de:'Guten Morgen. Wohin darf ich Sie bringen?', es:'Buenos días. ¿Adónde le llevo?' } },
          { wer:'lerner', z:'The airport, please. I\'m in a bit of a rush.', na:{ de:'Zum Flughafen, bitte. Ich bin etwas in Eile.', es:'Al aeropuerto, por favor. Tengo algo de prisa.' } },
          { wer:'spikiu', z:'There\'s a backup on the freeway. Want me to take surface streets?', na:{ de:'Auf der Autobahn ist Stau. Soll ich durch die Stadt fahren?', es:'Hay atasco en la autopista. ¿Voy por el centro?' } },
          { wer:'lerner', z:'Is that actually faster?', na:{ de:'Ist das denn schneller?', es:'¿De verdad es más rápido?' } },
          { wer:'spikiu', z:'In this traffic, yeah. Ten minutes less, easy.', na:{ de:'Bei dem Verkehr ja. Locker zehn Minuten weniger.', es:'Con este tráfico, sí. Diez minutos menos, fácil.' } },
          { wer:'lerner', z:'Let\'s do that. Could I get a receipt at the end?', na:{ de:'Dann fahren Sie so. Bekomme ich am Ende eine Quittung?', es:'Entonces vaya por ahí. ¿Me da un recibo al final?' } }
        ]
      },
      lesetext: {
        z:'A passenger is in a rush to the airport. There\'s a backup on the freeway, so the driver suggests taking surface streets — about ten minutes faster in this traffic. The passenger asks for a receipt at the end.',
        na:{ de:'Ein Fahrgast will schnell zum Flughafen. Auf der Autobahn ist Stau, deshalb schlägt der Fahrer den Weg durch die Stadt vor — bei dem Verkehr etwa zehn Minuten schneller. Am Ende bittet der Fahrgast um eine Quittung.', es:'Un pasajero tiene prisa por llegar al aeropuerto. Hay atasco en la autopista, así que el taxista propone ir por el centro: unos diez minutos menos con este tráfico. Al final el pasajero pide un recibo.' },
        frage:{ de:'Warum fahren sie durch die Stadt?', es:'¿Por qué van por el centro?' },
        optionen:[
          { na:{ de:'Auf der Autobahn ist Stau', es:'Hay atasco en la autopista' }, richtig:true },
          { na:{ de:'Die Stadt ist schöner', es:'El centro es más bonito' }, richtig:false },
          { na:{ de:'Der Flughafen ist zu', es:'El aeropuerto está cerrado' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Nenne dein Ziel, sag dass du es eilig hast, und bitte um eine Quittung. Zwei Sätze.', es:'Di adónde vas, que tienes prisa, y pide un recibo. Dos frases.' },
        muster:'The station, please — I\'m in a bit of a rush. Could I get a receipt at the end?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'**Is that faster?** ist eine sachliche Frage. **Is that actually faster?** klingt zweifelnd — höflich zweifelnd. Genau die Arbeit, die im Deutschen das Wörtchen *denn* macht. Und Vorsicht: *actually* heißt nicht „aktuell", sondern „tatsächlich".', es:'**Is that faster?** es una pregunta neutra. **Is that actually faster?** suena escéptica, con cortesía. Y ojo con la trampa: *actually* no significa „actualmente" sino „en realidad".' },
        beispiele:[
          { z:'Is that actually faster?', na:{ de:'Ist das denn schneller?', es:'¿De verdad es más rápido?' } },
          { z:'Actually, I\'d prefer the other one.', na:{ de:'Eigentlich hätte ich lieber das andere.', es:'En realidad prefiero el otro.' } }
        ]
      }
    },

    'a2.wegbeschreibung': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'You look a little lost — need a hand?', na:{ de:'Sie sehen etwas ratlos aus — kann ich helfen?', es:'Parece un poco perdido, ¿le ayudo?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Sure, about fifteen minutes. You can\'t miss it — big stone building.', na:{ de:'Klar, ungefähr fünfzehn Minuten. Sie können es nicht verfehlen, großer Steinbau.', es:'Claro, unos quince minutos. No tiene pérdida, un edificio grande de piedra.' } },
      wortschatz: [
        { z:'to head down', na:{ de:'entlanggehen', es:'ir por' } },
        { z:'the traffic light', na:{ de:'die Ampel', es:'el semáforo' } },
        { z:'to cross over', na:{ de:'überqueren', es:'cruzar' } },
        { z:'the traffic circle', na:{ de:'der Kreisverkehr', es:'la rotonda' } },
        { z:'across from', na:{ de:'gegenüber', es:'enfrente de' } },
        { z:'you can\'t miss it', na:{ de:'nicht zu verfehlen', es:'no tiene pérdida' } },
        { z:'the block', na:{ de:'der Häuserblock', es:'la manzana' } },
        { z:'a landmark', na:{ de:'ein Wahrzeichen', es:'un punto de referencia' } },
        { z:'to keep going', na:{ de:'weitergehen', es:'seguir' } },
        { z:'a hand', na:{ de:'Hilfe', es:'una mano' } },
        { z:'about', na:{ de:'ungefähr', es:'más o menos' } },
        { z:'the sidewalk', na:{ de:'der Gehweg', es:'la acera' } }
      ],
      dialog: {
        rolle: { de:'eine Passantin', es:'una transeúnte' },
        zeilen: [
          { wer:'spikiu', z:'You look a little lost — need a hand?', na:{ de:'Sie sehen etwas ratlos aus — kann ich helfen?', es:'Parece un poco perdido, ¿le ayudo?' } },
          { wer:'lerner', z:'Excuse me, how do I get to the museum from here?', na:{ de:'Entschuldigung, wie komme ich von hier zum Museum?', es:'Perdone, ¿cómo llego al museo desde aquí?' } },
          { wer:'spikiu', z:'Head down to the light and cross over.', na:{ de:'Gehen Sie bis zur Ampel und überqueren Sie die Straße.', es:'Vaya hasta el semáforo y cruce.' } },
          { wer:'lerner', z:'And then what?', na:{ de:'Und wie geht es dann weiter?', es:'¿Y después?' } },
          { wer:'spikiu', z:'Right at the traffic circle. It\'s across from the park.', na:{ de:'Am Kreisverkehr rechts. Es liegt gegenüber vom Park.', es:'En la rotonda a la derecha. Está enfrente del parque.' } },
          { wer:'lerner', z:'Can I walk there?', na:{ de:'Kann man zu Fuß hingehen?', es:'¿Se puede ir a pie?' } }
        ]
      },
      lesetext: {
        z:'A visitor asks the way to the museum. He should head down to the light and cross over, then take a right at the traffic circle. The museum is across from the park, about fifteen minutes on foot.',
        na:{ de:'Ein Besucher fragt nach dem Weg zum Museum. Er soll bis zur Ampel gehen und die Straße überqueren, dann am Kreisverkehr rechts. Das Museum liegt gegenüber vom Park, etwa fünfzehn Minuten zu Fuß.', es:'Un visitante pregunta cómo llegar al museo. Tiene que ir hasta el semáforo y cruzar, y luego girar a la derecha en la rotonda. El museo está enfrente del parque, a unos quince minutos a pie.' },
        frage:{ de:'Wo liegt das Museum?', es:'¿Dónde está el museo?' },
        optionen:[
          { na:{ de:'Gegenüber vom Park', es:'Enfrente del parque' }, richtig:true },
          { na:{ de:'Neben der Ampel', es:'Al lado del semáforo' }, richtig:false },
          { na:{ de:'Am Bahnhof', es:'En la estación' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag nach dem Weg zum Bahnhof und ob man zu Fuß gehen kann. Zwei Sätze.', es:'Pregunta cómo llegar a la estación y si se puede ir a pie. Dos frases.' },
        muster:'How do I get to the station from here? Can I walk there?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Englische Wegbeschreibung läuft über kleine Anhängsel am Verb: **head down**, **cross over**, **keep going**, **turn around**. Das Verb allein sagt zu wenig; erst das Anhängsel gibt die Richtung. Man lernt sie als ganze Paare, nicht Wort für Wort.', es:'Las indicaciones inglesas funcionan con pequeñas partículas pegadas al verbo: **head down**, **cross over**, **keep going**, **turn around**. El verbo solo dice poco; la partícula da la dirección. Se aprenden en pareja, no palabra por palabra.' },
        beispiele:[
          { z:'Head down to the light.', na:{ de:'Gehen Sie bis zur Ampel.', es:'Vaya hasta el semáforo.' } },
          { z:'Keep going for two blocks.', na:{ de:'Gehen Sie zwei Straßen weiter.', es:'Siga dos calles más.' } }
        ]
      }
    },

    'a2.wetter': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Works for me. I\'ll swing by around two — see you Saturday!', na:{ de:'Passt mir. Ich hole dich gegen zwei ab — bis Samstag!', es:'Me parece bien. Paso por ti a eso de las dos. ¡Hasta el sábado!' } },
      wortschatz: [
        { z:'the forecast', na:{ de:'die Vorhersage', es:'el pronóstico' } },
        { z:'to clear up', na:{ de:'aufklaren', es:'despejar' } },
        { z:'sunny', na:{ de:'sonnig', es:'soleado' } },
        { z:'cloudy', na:{ de:'bewölkt', es:'nublado' } },
        { z:'a shower', na:{ de:'der Schauer', es:'el chubasco' } },
        { z:'a jacket', na:{ de:'die Jacke', es:'la chaqueta' } },
        { z:'just in case', na:{ de:'sicherheitshalber', es:'por si acaso' } },
        { z:'to swing by', na:{ de:'vorbeikommen', es:'pasar a recoger' } },
        { z:'the lake', na:{ de:'der See', es:'el lago' } },
        { z:'to hit', na:{ de:'hingehen', es:'ir a' } },
        { z:'or so', na:{ de:'oder so', es:'o así' } },
        { z:'to depend on', na:{ de:'abhängen von', es:'depender de' } }
      ],
      dialog: {
        rolle: { de:'eine Freundin', es:'una amiga' },
        zeilen: [
          { wer:'spikiu', z:'Want to hit the lake on Saturday?', na:{ de:'Wollen wir am Samstag an den See fahren?', es:'¿Vamos al lago el sábado?' } },
          { wer:'lerner', z:'Depends on the weather. Did you check the forecast?', na:{ de:'Kommt aufs Wetter an. Hast du die Vorhersage gesehen?', es:'Depende del tiempo. ¿Viste el pronóstico?' } },
          { wer:'spikiu', z:'It\'s supposed to rain in the morning.', na:{ de:'Vormittags soll es regnen.', es:'Dicen que llueve por la mañana.' } },
          { wer:'lerner', z:'What about the afternoon?', na:{ de:'Und am Nachmittag?', es:'¿Y por la tarde?' } },
          { wer:'spikiu', z:'Should clear up. Sunny by two or so.', na:{ de:'Da klart es wohl auf. Ab etwa zwei sonnig.', es:'Seguramente despeja. Soleado como a las dos.' } },
          { wer:'lerner', z:'Let\'s go in the afternoon, then. I\'ll bring a jacket just in case.', na:{ de:'Dann fahren wir nachmittags. Ich nehme sicherheitshalber eine Jacke mit.', es:'Entonces vamos por la tarde. Llevo una chaqueta por si acaso.' } }
        ]
      },
      lesetext: {
        z:'Two friends plan a Saturday at the lake. It\'s supposed to rain in the morning but should clear up by two. So they\'ll go in the afternoon, and one of them is bringing a jacket just in case.',
        na:{ de:'Zwei Freundinnen planen einen Samstag am See. Vormittags soll es regnen, gegen zwei klart es wohl auf. Also fahren sie nachmittags, und eine nimmt sicherheitshalber eine Jacke mit.', es:'Dos amigas planean un sábado en el lago. Por la mañana dicen que va a llover, pero hacia las dos seguramente despeja. Así que van por la tarde y una se lleva una chaqueta por si acaso.' },
        frage:{ de:'Wann fahren sie?', es:'¿Cuándo van?' },
        optionen:[
          { na:{ de:'Am Nachmittag', es:'Por la tarde' }, richtig:true },
          { na:{ de:'Am Vormittag', es:'Por la mañana' }, richtig:false },
          { na:{ de:'Am Sonntag', es:'El domingo' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frag nach der Vorhersage und schlag etwas für den Nachmittag vor. Zwei Sätze.', es:'Pregunta por el pronóstico y propón algo para la tarde. Dos frases.' },
        muster:'Did you check the forecast? Let\'s go in the afternoon, then.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', es:'Gramática, directo al grano' },
        text:{ de:'Beim Wetter sagt Englisch selten „it will rain". Man sagt **it\'s supposed to rain** (so heißt es) oder **it should clear up** (wahrscheinlich). Beides ist ein Achselzucken in Worten — genau wie das deutsche „es soll" und „wohl".', es:'Con el tiempo el inglés rara vez dice „it will rain". Se dice **it\'s supposed to rain** (eso dicen) o **it should clear up** (probablemente). Las dos formas son un encogimiento de hombros hecho palabra.' },
        beispiele:[
          { z:'It\'s supposed to rain.', na:{ de:'Es soll regnen.', es:'Dicen que va a llover.' } },
          { z:'It should clear up by two.', na:{ de:'Gegen zwei klart es wohl auf.', es:'Seguramente despeja hacia las dos.' } }
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
