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
    { id:'cafe',            em:'☕',  na:{ es:'En la cafetería',      en:'At the café' } },
    { id:'restaurant',      em:'🍽️', na:{ es:'En el restaurante',    en:'At the restaurant' } },
    { id:'einkaufen',       em:'🛒', na:{ es:'De compras',           en:'Shopping' } },
    { id:'wegbeschreibung', em:'🧭', na:{ es:'Preguntar el camino',  en:'Asking directions' } },
    { id:'taxi',            em:'🚕', na:{ es:'En el taxi',           en:'In the taxi' } },
    { id:'familie',         em:'👪', na:{ es:'Sobre la familia',     en:'About family' } },
    { id:'hotel',           em:'🏨', na:{ es:'En el hotel',          en:'At the hotel' } },
    { id:'bahnhof',         em:'🚉', na:{ es:'En la estación',       en:'At the station' } },
    { id:'arzt',            em:'🩺', na:{ es:'En el médico',         en:'At the doctor' } },
    { id:'wetter',          em:'🌤️', na:{ es:'Sobre el tiempo',      en:'About the weather' } }
  ];

  var STUFEN = ['a1', 'a2'];

  var KATEGORIEN = [
    { id:'essen',     em:'🍽️', na:{ es:'Comer y beber',    en:'Food & Drink' },
      themen:['cafe','restaurant'] },
    { id:'unterwegs', em:'🧳', na:{ es:'De camino',        en:'Getting around' },
      themen:['wegbeschreibung','taxi','bahnhof','hotel'] },
    { id:'alltag',    em:'🛒', na:{ es:'Vida diaria',      en:'Everyday life' },
      themen:['einkaufen','wetter'] },
    { id:'menschen',  em:'👥', na:{ es:'Personas',         en:'People' },
      themen:['familie','arzt'] }
  ];

  var SCHRITT = {
    cafe:            { a1:{ es:'pedir, pagar', en:'ordering, paying' },
                       a2:{ es:'reclamar, preguntar por ingredientes', en:'complaining, asking about ingredients' } },
    restaurant:      { a1:{ es:'una mesa, la carta', en:'a table, the menu' },
                       a2:{ es:'recomendaciones, compartir, propina', en:'recommendations, sharing, tipping' } },
    einkaufen:       { a1:{ es:'comprar, pagar', en:'buying, paying' },
                       a2:{ es:'cambiar, probarse', en:'exchanging, trying on' } },
    wegbeschreibung: { a1:{ es:'preguntar el camino', en:'asking the way' },
                       a2:{ es:'seguir indicaciones largas', en:'following longer directions' } },
    taxi:            { a1:{ es:'destino, equipaje', en:'destination, luggage' },
                       a2:{ es:'prisa, ruta, recibo', en:'hurry, route, receipt' } },
    familie:         { a1:{ es:'hermanos, nombres, edad', en:'siblings, names, age' },
                       a2:{ es:'contar el pasado', en:'talking about the past' } },
    hotel:           { a1:{ es:'reserva, desayuno, planta', en:'booking, breakfast, floor' },
                       a2:{ es:'reclamar, cambiar de habitación', en:'complaining, changing rooms' } },
    bahnhof:         { a1:{ es:'billete, hora, andén', en:'ticket, time, platform' },
                       a2:{ es:'retraso, transbordo', en:'delay, connection' } },
    arzt:            { a1:{ es:'dolor, desde cuándo', en:'pain, since when' },
                       a2:{ es:'qué pasó, alergias, cita', en:'what happened, allergies, appointment' } },
    wetter:          { a1:{ es:'hoy y mañana', en:'today and tomorrow' },
                       a2:{ es:'pronóstico, proponer algo', en:'forecast, making a suggestion' } }
  };

  var ROLLEN = {
    cafe:            { spikiu:{ es:'el camarero', en:'the barista' },
                       lerner:{ es:'el cliente', en:'the customer' },
                       ort:   { es:'en el mostrador', en:'at the counter' } },
    restaurant:      { spikiu:{ es:'el camarero', en:'the waiter' },
                       lerner:{ es:'el cliente', en:'the guest' },
                       ort:   { es:'en un restaurante', en:'in a restaurant' } },
    einkaufen:       { spikiu:{ es:'la vendedora', en:'the vendor' },
                       lerner:{ es:'la clienta', en:'the customer' },
                       ort:   { es:'en el mercado semanal', en:'at the weekly market' } },
    wegbeschreibung: { spikiu:{ es:'un transeúnte', en:'a passer-by' },
                       lerner:{ es:'alguien que busca', en:'someone looking for a place' },
                       ort:   { es:'en la calle', en:'in the street' } },
    taxi:            { spikiu:{ es:'el taxista', en:'the driver' },
                       lerner:{ es:'con una maleta', en:'with a suitcase' },
                       ort:   { es:'en la acera, de noche', en:'at the kerb, in the evening' } },
    familie:         { spikiu:{ es:'una vecina', en:'a neighbour' },
                       lerner:{ es:'tú mismo', en:'yourself' },
                       ort:   { es:'en la escalera', en:'on the stairs' } },
    hotel:           { spikiu:{ es:'el recepcionista', en:'the front desk clerk' },
                       lerner:{ es:'el huésped', en:'the guest' },
                       ort:   { es:'en recepción', en:'at reception' } },
    bahnhof:         { spikiu:{ es:'la empleada de la ventanilla', en:'the ticket agent' },
                       lerner:{ es:'el viajero', en:'the traveller' },
                       ort:   { es:'en la ventanilla', en:'at the counter' } },
    arzt:            { spikiu:{ es:'la médica', en:'the doctor' },
                       lerner:{ es:'el paciente', en:'the patient' },
                       ort:   { es:'en la consulta', en:'in the surgery' } },
    wetter:          { spikiu:{ es:'un compañero de trabajo', en:'a coworker' },
                       lerner:{ es:'tú mismo', en:'yourself' },
                       ort:   { es:'delante de la oficina', en:'outside the office' } }
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
      { de:'Sag, dass du eine Schwester hast', es:'Di que tienes una hermana', en:'Say that you have a sister' },
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
      abrundung: { z:'Ich schreibe Sie für drei Tage krank. Gute Besserung!', na:{ es:'Le doy la baja por tres días. ¡Que se mejore!', en:'I\'ll sign you off for three days. Get well soon!' } },
      wortschatz: [
        { z:'die Schmerzen', na:{ es:'el dolor', en:'the pain' } },
        { z:'der Kopf', na:{ es:'la cabeza', en:'the head' } },
        { z:'der Bauch', na:{ es:'la barriga', en:'the stomach' } },
        { z:'das Fieber', na:{ es:'la fiebre', en:'the fever' } },
        { z:'die Tablette', na:{ es:'la pastilla', en:'the tablet' } },
        { z:'das Rezept', na:{ es:'la receta', en:'the prescription' } },
        { z:'die Sprechstunde', na:{ es:'la consulta', en:'the surgery hours' } },
        { z:'die Versichertenkarte', na:{ es:'la tarjeta sanitaria', en:'the health insurance card' } },
        { z:'krankschreiben', na:{ es:'dar la baja', en:'to sign off sick' } },
        { z:'husten', na:{ es:'toser', en:'to cough' } },
        { z:'müde', na:{ es:'cansado', en:'tired' } },
        { z:'die Apotheke', na:{ es:'la farmacia', en:'the pharmacy' } }
      ],
      dialog: {
        rolle: { es:'la médica', en:'the doctor' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag. Was führt Sie zu mir?', na:{ es:'Buenos días. ¿Qué le trae por aquí?', en:'Hello. What brings you in?' } },
          { wer:'lerner', z:'Ich habe Kopfschmerzen.', na:{ es:'Me duele la cabeza.', en:'I have a headache.' } },
          { wer:'spikiu', z:'Seit wann denn?', na:{ es:'¿Desde cuándo?', en:'Since when?' } },
          { wer:'lerner', z:'Seit gestern. Und ich habe Fieber.', na:{ es:'Desde ayer. Y tengo fiebre.', en:'Since yesterday. And I have a fever.' } },
          { wer:'spikiu', z:'Nehmen Sie eine Tablette und bleiben Sie im Bett.', na:{ es:'Tome una pastilla y quédese en cama.', en:'Take a tablet and stay in bed.' } },
          { wer:'lerner', z:'Danke, Frau Doktor.', na:{ es:'Gracias, doctora.', en:'Thank you, doctor.' } }
        ]
      },
      lesetext: {
        z:'Eine Frau geht zur Ärztin. Sie hat seit gestern Kopfschmerzen und Fieber. Die Ärztin sagt, sie soll eine Tablette nehmen und im Bett bleiben. Sie schreibt sie für drei Tage krank.',
        na:{ es:'Una mujer va a la médica. Desde ayer tiene dolor de cabeza y fiebre. La médica le dice que tome una pastilla y se quede en cama. Le da la baja por tres días.', en:'A woman goes to the doctor. Since yesterday she has had a headache and a fever. The doctor tells her to take a tablet and stay in bed. She signs her off for three days.' },
        frage:{ es:'¿Desde cuándo le duele la cabeza?', en:'Since when has she had the headache?' },
        optionen:[
          { na:{ es:'Desde ayer', en:'Since yesterday' }, richtig:true },
          { na:{ es:'Desde hace una semana', en:'For a week' }, richtig:false },
          { na:{ es:'Desde esta mañana', en:'Since this morning' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que te duele la barriga y desde cuándo. Dos frases.', en:'Say you have a stomachache and say since when. Two sentences.' },
        muster:'Ich habe Bauchschmerzen. Seit gestern Abend.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Aquí el alemán y el español no se parecen. El español dice **me duele** la cabeza — la cabeza es la que actúa. El alemán dice **ich habe** Kopfschmerzen: yo tengo el dolor. Cambia quién manda en la frase.', en:'English says "my head hurts" or "I have a headache" — German only has the second option: **ich habe** Kopfschmerzen. Never "mein Kopf tut weh" in the doctor\'s office; that sounds like a child.' },
        beispiele:[
          { z:'Ich habe Kopfschmerzen.', na:{ es:'Me duele la cabeza.', en:'I have a headache.' } },
          { z:'Ich habe Fieber.', na:{ es:'Tengo fiebre.', en:'I have a fever.' } }
        ]
      }
    },

    'a1.bahnhof': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Tag. Bitte sehr?', na:{ es:'Buenos días. ¿Dígame?', en:'Good morning. Yes please?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gleis vier. Das macht dreiunddreißig Euro — gute Fahrt!', na:{ es:'Andén cuatro. Son treinta y tres euros. ¡Buen viaje!', en:'Platform four. That\'s thirty-three euros — have a good trip!' } },
      wortschatz: [
        { z:'die Fahrkarte', na:{ es:'el billete', en:'the ticket' } },
        { z:'der Schalter', na:{ es:'la ventanilla', en:'the counter' } },
        { z:'das Gleis', na:{ es:'el andén', en:'the platform' } },
        { z:'einfach', na:{ es:'solo ida', en:'one way' } },
        { z:'hin und zurück', na:{ es:'ida y vuelta', en:'return' } },
        { z:'abfahren', na:{ es:'salir', en:'to depart' } },
        { z:'ankommen', na:{ es:'llegar', en:'to arrive' } },
        { z:'umsteigen', na:{ es:'hacer transbordo', en:'to change trains' } },
        { z:'der Fahrplan', na:{ es:'el horario', en:'the timetable' } },
        { z:'der Bahnsteig', na:{ es:'el andén', en:'the platform' } },
        { z:'der Automat', na:{ es:'la máquina', en:'the machine' } },
        { z:'die Bahncard', na:{ es:'la tarjeta de descuento', en:'the rail discount card' } }
      ],
      dialog: {
        rolle: { es:'la empleada de la ventanilla', en:'the ticket agent' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag. Bitte sehr?', na:{ es:'Buenos días. ¿Dígame?', en:'Good morning. Yes please?' } },
          { wer:'lerner', z:'Eine Fahrkarte nach München, bitte.', na:{ es:'Un billete para Múnich, por favor.', en:'A ticket to Munich, please.' } },
          { wer:'spikiu', z:'Einfach oder hin und zurück?', na:{ es:'¿Solo ida o ida y vuelta?', en:'One way or return?' } },
          { wer:'lerner', z:'Hin und zurück. Wann fährt der Zug?', na:{ es:'Ida y vuelta. ¿A qué hora sale?', en:'Return. When does the train leave?' } },
          { wer:'spikiu', z:'Der nächste um neun Uhr zwölf.', na:{ es:'El próximo a las nueve y doce.', en:'The next one at nine twelve.' } },
          { wer:'lerner', z:'Und von welchem Gleis?', na:{ es:'¿Y de qué andén?', en:'And from which platform?' } }
        ]
      },
      lesetext: {
        z:'Am Schalter kauft eine Frau eine Fahrkarte nach München, hin und zurück. Sie kostet dreiunddreißig Euro. Der nächste Zug fährt um neun Uhr zwölf von Gleis vier.',
        na:{ es:'En la ventanilla una mujer compra un billete a Múnich, ida y vuelta. Cuesta treinta y tres euros. El próximo tren sale a las nueve y doce del andén cuatro.', en:'At the counter a woman buys a ticket to Munich, return. It costs thirty-three euros. The next train leaves at nine twelve from platform four.' },
        frage:{ es:'¿De qué andén sale el tren?', en:'Which platform does the train leave from?' },
        optionen:[
          { na:{ es:'Andén cuatro', en:'Platform four' }, richtig:true },
          { na:{ es:'Andén nueve', en:'Platform nine' }, richtig:false },
          { na:{ es:'Andén doce', en:'Platform twelve' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Compra un billete a Berlín y pregunta por el andén. Dos frases.', en:'Buy a ticket to Berlin and ask which platform. Two sentences.' },
        muster:'Eine Fahrkarte nach Berlin, bitte. Von welchem Gleis fährt der Zug?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Las preguntas alemanas empiezan casi todas con **W**: **wann** (cuándo), **wo** (dónde), **was** (qué), **wie** (cómo), **wer** (quién). Después va el verbo: „Wann fährt der Zug?"', en:'German question words nearly all start with **W**: **wann** (when), **wo** (where), **was** (what), **wie** (how), **wer** (who). The verb follows straight after: "Wann fährt der Zug?"' },
        beispiele:[
          { z:'Wann fährt der Zug?', na:{ es:'¿A qué hora sale el tren?', en:'When does the train leave?' } },
          { z:'Wo ist das Gleis?', na:{ es:'¿Dónde está el andén?', en:'Where is the platform?' } }
        ]
      }
    },

    'a1.cafe': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Das macht drei Euro zwanzig. Schönen Tag noch!', na:{ es:'Son tres euros veinte. ¡Que tenga buen día!', en:'That\'s three twenty. Have a nice day!' } },
      wortschatz: [
        { z:'der Kaffee', na:{ es:'el café', en:'coffee' } },
        { z:'der Tee', na:{ es:'el té', en:'tea' } },
        { z:'das Wasser', na:{ es:'el agua', en:'water' } },
        { z:'die Milch', na:{ es:'la leche', en:'milk' } },
        { z:'der Zucker', na:{ es:'el azúcar', en:'sugar' } },
        { z:'das Glas', na:{ es:'el vaso', en:'a glass' } },
        { z:'die Tasse', na:{ es:'la taza', en:'the cup' } },
        { z:'zum Mitnehmen', na:{ es:'para llevar', en:'to go' } },
        { z:'zahlen', na:{ es:'pagar', en:'to pay' } },
        { z:'bitte', na:{ es:'por favor', en:'please' } },
        { z:'danke', na:{ es:'gracias', en:'thank you' } },
        { z:'stimmt so', na:{ es:'quédese con el cambio', en:'keep the change' } }
      ],
      dialog: {
        rolle: { es:'el camarero', en:'the barista' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag! Was darf\'s sein?', na:{ es:'¡Buenos días! ¿Qué le pongo?', en:'Hello! What can I get you?' } },
          { wer:'lerner', z:'Einen Kaffee, bitte.', na:{ es:'Un café, por favor.', en:'A coffee, please.' } },
          { wer:'spikiu', z:'Gerne. Zum Hiertrinken oder zum Mitnehmen?', na:{ es:'Con gusto. ¿Para tomar aquí o para llevar?', en:'Sure. For here or to go?' } },
          { wer:'lerner', z:'Zum Hiertrinken, bitte.', na:{ es:'Para tomar aquí, por favor.', en:'For here, please.' } },
          { wer:'spikiu', z:'Kommt sofort. Sonst noch etwas?', na:{ es:'Enseguida. ¿Algo más?', en:'Coming right up. Anything else?' } },
          { wer:'lerner', z:'Nein danke. Was macht das?', na:{ es:'No, gracias. ¿Cuánto le debo?', en:'No thanks. How much do I owe you?' } }
        ]
      },
      lesetext: {
        z:'Marta geht ins Café. Sie bestellt einen Kaffee zum Hiertrinken. Der Kaffee kostet drei Euro zwanzig. Marta gibt fünf Euro. Der Kellner gibt ihr eine Euro achtzig zurück.',
        na:{ es:'Marta va a la cafetería. Pide un café para tomar allí. El café cuesta tres euros veinte. Marta da cinco euros. El camarero le devuelve un euro ochenta.', en:'Marta goes into the café. She orders a coffee for here. The coffee costs three twenty. Marta gives five euros. The waiter gives her one eighty back.' },
        frage:{ es:'¿Cuánto le devuelven a Marta?', en:'How much does Marta get back?' },
        optionen:[
          { na:{ es:'Un euro ochenta', en:'One eighty' }, richtig:true },
          { na:{ es:'Tres euros veinte', en:'Three twenty' }, richtig:false },
          { na:{ es:'Cinco euros', en:'Five euros' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pide un té con azúcar y di que quieres pagar. Dos frases.', en:'Order a tea with sugar and say you want to pay. Two sentences.' },
        muster:'Einen Tee mit Zucker, bitte. Ich möchte zahlen.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'En alemán cada cosa lleva una palabrita delante: **der** Kaffee, **die** Milch, **das** Wasser. No hay regla que funcione siempre — se aprende junto con la palabra, como el género en español, solo que son tres en vez de dos.', en:'In German every thing carries a little word in front: **der** coffee, **die** milk, **das** water. There is no rule that always works — you learn it together with the word. Three of them, not two.' },
        beispiele:[
          { z:'der Kaffee', na:{ es:'el café', en:'the coffee' } },
          { z:'die Milch', na:{ es:'la leche', en:'the milk' } }
        ]
      }
    },

    'a1.einkaufen': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Und eineinhalb zurück. Schönen Tag noch!', na:{ es:'Y uno cincuenta de cambio. ¡Que tenga buen día!', en:'And one fifty back. Have a nice day!' } },
      wortschatz: [
        { z:'das Kilo', na:{ es:'el kilo', en:'the kilo' } },
        { z:'das Pfund', na:{ es:'la libra (medio kilo)', en:'the pound (half a kilo)' } },
        { z:'die Äpfel', na:{ es:'las manzanas', en:'the apples' } },
        { z:'der Käse', na:{ es:'el queso', en:'the cheese' } },
        { z:'das Brot', na:{ es:'el pan', en:'the bread' } },
        { z:'kosten', na:{ es:'costar', en:'to cost' } },
        { z:'bezahlen', na:{ es:'pagar', en:'to pay' } },
        { z:'das Wechselgeld', na:{ es:'el cambio', en:'the change' } },
        { z:'die Tüte', na:{ es:'la bolsa', en:'the bag' } },
        { z:'frisch', na:{ es:'fresco', en:'fresh' } },
        { z:'billig', na:{ es:'barato', en:'cheap' } },
        { z:'teuer', na:{ es:'caro', en:'expensive' } }
      ],
      dialog: {
        rolle: { es:'la vendedora', en:'the vendor' },
        zeilen: [
          { wer:'spikiu', z:'Guten Morgen! Wer ist der Nächste?', na:{ es:'¡Buenos días! ¿Quién sigue?', en:'Good morning! Who is next?' } },
          { wer:'lerner', z:'Ich. Ein Kilo Äpfel, bitte.', na:{ es:'Yo. Un kilo de manzanas, por favor.', en:'Me. A kilo of apples, please.' } },
          { wer:'spikiu', z:'Gerne. Sonst noch einen Wunsch?', na:{ es:'Con gusto. ¿Algo más?', en:'Of course. Anything else?' } },
          { wer:'lerner', z:'Ein halbes Pfund Käse. Was kostet das?', na:{ es:'Un cuarto de kilo de queso. ¿Cuánto cuesta?', en:'Half a pound of cheese. How much is that?' } },
          { wer:'spikiu', z:'Zusammen acht Euro fünfzig.', na:{ es:'En total, ocho euros con cincuenta.', en:'Eight fifty altogether.' } },
          { wer:'lerner', z:'Hier sind zehn Euro.', na:{ es:'Aquí tiene diez euros.', en:'Here\'s ten euros.' } }
        ]
      },
      lesetext: {
        z:'Auf dem Wochenmarkt kauft Herr Klein ein Kilo Äpfel und ein halbes Pfund Käse. Zusammen kostet das acht Euro fünfzig. Er gibt zehn Euro. Die Verkäuferin gibt ihm eineinhalb Euro zurück.',
        na:{ es:'En el mercado semanal el señor Klein compra un kilo de manzanas y un cuarto de kilo de queso. En total son ocho euros cincuenta. Da diez euros. La vendedora le devuelve un euro cincuenta.', en:'At the weekly market Mr Klein buys a kilo of apples and half a pound of cheese. Altogether that\'s eight fifty. He gives ten euros. The vendor gives him one fifty back.' },
        frage:{ es:'¿Qué compra el señor Klein?', en:'What does Mr Klein buy?' },
        optionen:[
          { na:{ es:'Manzanas y queso', en:'Apples and cheese' }, richtig:true },
          { na:{ es:'Pan y leche', en:'Bread and milk' }, richtig:false },
          { na:{ es:'Solo manzanas', en:'Only apples' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Compra un kilo de manzanas y pregunta cuánto cuesta. Dos frases.', en:'Buy a kilo of apples and ask what it costs. Two sentences.' },
        muster:'Ein Kilo Äpfel, bitte. Was kostet das?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'En Alemania se pide muchas veces por **Pfund** — medio kilo. „Ein Pfund Käse" son 500 gramos. No es una medida oficial, pero en el mercado la oirás todos los días.', en:'In Germany people often buy by the **Pfund** — half a kilo. "Ein Pfund Käse" is 500 grams. Not an official measure, but you will hear it at every market stall.' },
        beispiele:[
          { z:'ein Pfund Käse', na:{ es:'medio kilo de queso', en:'half a kilo of cheese' } },
          { z:'ein halbes Kilo', na:{ es:'medio kilo', en:'half a kilo' } }
        ]
      }
    },

    'a1.familie': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ach, das schöne Alter. Grüßen Sie sie von mir!', na:{ es:'Ay, qué edad tan bonita. ¡Salúdela de mi parte!', en:'Oh, what a lovely age. Say hello from me!' } },
      wortschatz: [
        { z:'die Schwester', na:{ es:'la hermana', en:'the sister' } },
        { z:'der Bruder', na:{ es:'el hermano', en:'the brother' } },
        { z:'die Geschwister', na:{ es:'los hermanos', en:'the siblings' } },
        { z:'die Eltern', na:{ es:'los padres', en:'the parents' } },
        { z:'die Mutter', na:{ es:'la madre', en:'the mother' } },
        { z:'der Vater', na:{ es:'el padre', en:'the father' } },
        { z:'die Großeltern', na:{ es:'los abuelos', en:'the grandparents' } },
        { z:'der Sohn', na:{ es:'el hijo', en:'the son' } },
        { z:'die Tochter', na:{ es:'la hija', en:'the daughter' } },
        { z:'heißen', na:{ es:'llamarse', en:'to be called' } },
        { z:'verheiratet', na:{ es:'casado', en:'married' } },
        { z:'die Nachbarin', na:{ es:'la vecina', en:'the neighbour' } }
      ],
      dialog: {
        rolle: { es:'una vecina', en:'a neighbour' },
        zeilen: [
          { wer:'spikiu', z:'Erzählen Sie mal — haben Sie Geschwister?', na:{ es:'Cuénteme, ¿tiene hermanos?', en:'Tell me — do you have any siblings?' } },
          { wer:'lerner', z:'Ja, ich habe eine Schwester.', na:{ es:'Sí, tengo una hermana.', en:'Yes, I have a sister.' } },
          { wer:'spikiu', z:'Schön! Und wie heißt sie?', na:{ es:'¡Qué bien! ¿Y cómo se llama?', en:'Lovely! And what is her name?' } },
          { wer:'lerner', z:'Sie heißt Klara.', na:{ es:'Se llama Clara.', en:'Her name is Klara.' } },
          { wer:'spikiu', z:'Ein hübscher Name. Wie alt ist sie denn?', na:{ es:'Un nombre bonito. ¿Y qué edad tiene?', en:'A pretty name. How old is she?' } },
          { wer:'lerner', z:'Sie ist zwölf.', na:{ es:'Tiene doce años.', en:'She\'s twelve.' } }
        ]
      },
      lesetext: {
        z:'Frau Berger trifft ihren Nachbarn im Treppenhaus. Er erzählt von seiner Schwester. Sie heißt Klara und ist zwölf Jahre alt. Frau Berger soll sie grüßen.',
        na:{ es:'La señora Berger se encuentra con su vecino en la escalera. Él le habla de su hermana. Se llama Clara y tiene doce años. La señora Berger tiene que saludarla de su parte.', en:'Mrs Berger meets her neighbour on the stairs. He tells her about his sister. Her name is Klara and she is twelve. Mrs Berger is to say hello to her.' },
        frage:{ es:'¿Qué edad tiene Clara?', en:'How old is Klara?' },
        optionen:[
          { na:{ es:'Doce', en:'Twelve' }, richtig:true },
          { na:{ es:'Dos', en:'Two' }, richtig:false },
          { na:{ es:'Veinte', en:'Twenty' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que tienes un hermano y dinos su nombre y su edad. Dos frases.', en:'Say you have a brother and give his name and age. Two sentences.' },
        muster:'Ich habe einen Bruder. Er heißt Paul und ist acht Jahre alt.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Para el nombre el alemán no usa „ser" ni „llamarse" con pronombre: dice simplemente **heißen**. „Ich heiße Marta", „sie heißt Klara". Una sola palabra donde el español usa dos.', en:'For names German does not say "is called" — it has one verb, **heißen**. "Ich heiße Marta", "sie heißt Klara". One word where English needs three.' },
        beispiele:[
          { z:'Ich heiße Marta.', na:{ es:'Me llamo Marta.', en:'My name is Marta.' } },
          { z:'Sie heißt Klara.', na:{ es:'Se llama Clara.', en:'Her name is Klara.' } }
        ]
      }
    },

    'a1.hotel': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Im zweiten Stock, der Aufzug ist gleich rechts. Schönen Aufenthalt!', na:{ es:'En la segunda planta, el ascensor está a la derecha. ¡Que disfrute su estancia!', en:'Second floor, the lift is just on the right. Enjoy your stay!' } },
      wortschatz: [
        { z:'die Rezeption', na:{ es:'la recepción', en:'the front desk' } },
        { z:'buchen', na:{ es:'reservar', en:'to book' } },
        { z:'der Schlüssel', na:{ es:'la llave', en:'the key' } },
        { z:'das Frühstück', na:{ es:'el desayuno', en:'breakfast' } },
        { z:'der Stock', na:{ es:'la planta', en:'the floor' } },
        { z:'der Aufzug', na:{ es:'el ascensor', en:'the lift' } },
        { z:'das Doppelzimmer', na:{ es:'la habitación doble', en:'the double room' } },
        { z:'das Einzelzimmer', na:{ es:'la habitación individual', en:'the single room' } },
        { z:'die Übernachtung', na:{ es:'la noche', en:'the overnight stay' } },
        { z:'der Ausweis', na:{ es:'el documento de identidad', en:'the ID' } },
        { z:'ruhig', na:{ es:'tranquilo', en:'quiet' } },
        { z:'die Kurtaxe', na:{ es:'la tasa turística', en:'the tourist tax' } }
      ],
      dialog: {
        rolle: { es:'el recepcionista', en:'the front desk clerk' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag. Haben Sie bei uns gebucht?', na:{ es:'Buenas tardes. ¿Tiene reserva con nosotros?', en:'Good afternoon. Do you have a booking with us?' } },
          { wer:'lerner', z:'Ja, auf den Namen Weber.', na:{ es:'Sí, a nombre de Weber.', en:'Yes, under the name Weber.' } },
          { wer:'spikiu', z:'Ich sehe nach. Zwei Nächte, richtig?', na:{ es:'Déjeme ver. Dos noches, ¿verdad?', en:'Let me check. Two nights, right?' } },
          { wer:'lerner', z:'Genau. Ist das Frühstück dabei?', na:{ es:'Exacto. ¿El desayuno está incluido?', en:'Exactly. Is breakfast included?' } },
          { wer:'spikiu', z:'Ja, von sieben bis zehn. Hier Ihr Schlüssel.', na:{ es:'Sí, de siete a diez. Aquí tiene su llave.', en:'Yes, seven to ten. Here\'s your key.' } },
          { wer:'lerner', z:'Danke. In welchem Stock ist das Zimmer?', na:{ es:'Gracias. ¿En qué planta está?', en:'Thanks. Which floor is the room on?' } }
        ]
      },
      lesetext: {
        z:'Herr Weber hat zwei Nächte gebucht. An der Rezeption bekommt er den Schlüssel. Das Frühstück gibt es von sieben bis zehn. Sein Zimmer liegt im zweiten Stock, der Aufzug ist gleich rechts.',
        na:{ es:'El señor Weber ha reservado dos noches. En recepción recibe la llave. El desayuno es de siete a diez. Su habitación está en la segunda planta, el ascensor está a la derecha.', en:'Mr Weber has booked two nights. At reception he gets his key. Breakfast is from seven to ten. His room is on the second floor, the lift is just on the right.' },
        frage:{ es:'¿A qué hora es el desayuno?', en:'When is breakfast?' },
        optionen:[
          { na:{ es:'De siete a diez', en:'From seven to ten' }, richtig:true },
          { na:{ es:'De ocho a once', en:'From eight to eleven' }, richtig:false },
          { na:{ es:'Solo el fin de semana', en:'Only at weekends' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que tienes una reserva y pregunta por el desayuno. Dos frases.', en:'Say you have a booking and ask about breakfast. Two sentences.' },
        muster:'Ich habe auf den Namen Weber reserviert. Ist das Frühstück dabei?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Los alemanes cuentan las plantas como los españoles: la planta baja (Erdgeschoss) no cuenta, luego viene **der erste Stock**. Cuidado en los Estados Unidos, allí la planta baja ya es „first floor".', en:'Germans count floors the British way: the ground floor does not count, then comes **der erste Stock**. Careful in the US, where the ground floor is already the "first floor".' },
        beispiele:[
          { z:'im ersten Stock', na:{ es:'en la primera planta', en:'on the first floor' } },
          { z:'im zweiten Stock', na:{ es:'en la segunda planta', en:'on the second floor' } }
        ]
      }
    },

    'a1.restaurant': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Sehr gerne. Ich bringe Ihnen erst mal die Getränkekarte.', na:{ es:'Con gusto. Primero les traigo la carta de bebidas.', en:'Certainly. I\'ll bring you the drinks menu first.' } },
      wortschatz: [
        { z:'die Speisekarte', na:{ es:'la carta', en:'the menu' } },
        { z:'reservieren', na:{ es:'reservar', en:'to book' } },
        { z:'empfehlen', na:{ es:'recomendar', en:'to recommend' } },
        { z:'der Braten', na:{ es:'el asado', en:'the roast' } },
        { z:'die Beilage', na:{ es:'la guarnición', en:'the side dish' } },
        { z:'das Getränk', na:{ es:'la bebida', en:'the drink' } },
        { z:'bestellen', na:{ es:'pedir', en:'to order' } },
        { z:'lecker', na:{ es:'rico', en:'delicious' } },
        { z:'satt', na:{ es:'lleno', en:'full' } },
        { z:'die Vorspeise', na:{ es:'el entrante', en:'the starter' } },
        { z:'der Nachtisch', na:{ es:'el postre', en:'dessert' } },
        { z:'getrennt zahlen', na:{ es:'pagar por separado', en:'to split the bill' } }
      ],
      dialog: {
        rolle: { es:'el camarero', en:'the waiter' },
        zeilen: [
          { wer:'spikiu', z:'Guten Abend! Haben Sie reserviert?', na:{ es:'¡Buenas noches! ¿Tienen reserva?', en:'Good evening! Do you have a reservation?' } },
          { wer:'lerner', z:'Nein, für zwei Personen bitte.', na:{ es:'No, para dos personas, por favor.', en:'No, for two people please.' } },
          { wer:'spikiu', z:'Gerne, der Tisch am Fenster. Möchten Sie schon bestellen?', na:{ es:'Con gusto, la mesa de la ventana. ¿Ya quieren pedir?', en:'Of course, the table by the window. Ready to order?' } },
          { wer:'lerner', z:'Was können Sie empfehlen?', na:{ es:'¿Qué nos recomienda?', en:'What do you recommend?' } },
          { wer:'spikiu', z:'Heute ist der Schweinebraten sehr gut.', na:{ es:'Hoy el asado de cerdo está muy bueno.', en:'The roast pork is very good today.' } },
          { wer:'lerner', z:'Dann nehme ich den Schweinebraten.', na:{ es:'Entonces yo tomo el asado de cerdo.', en:'Then I\'ll have the roast pork.' } }
        ]
      },
      lesetext: {
        z:'Am Abend gehen Tom und Lena essen. Sie haben nicht reserviert. Der Kellner hat aber noch einen Tisch am Fenster frei. Tom fragt, was der Kellner empfiehlt. Heute ist der Schweinebraten besonders gut.',
        na:{ es:'Por la noche Tom y Lena salen a cenar. No tienen reserva. Pero al camarero le queda una mesa libre junto a la ventana. Tom pregunta qué recomienda. Hoy el asado de cerdo está especialmente bueno.', en:'In the evening Tom and Lena go out to eat. They don\'t have a reservation. But the waiter still has a table free by the window. Tom asks what he recommends. Today the roast pork is especially good.' },
        frage:{ es:'¿Dónde se sientan Tom y Lena?', en:'Where do Tom and Lena sit?' },
        optionen:[
          { na:{ es:'Junto a la ventana', en:'By the window' }, richtig:true },
          { na:{ es:'Junto a la puerta', en:'By the door' }, richtig:false },
          { na:{ es:'Fuera', en:'Outside' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que sois dos y pide una recomendación. Dos frases.', en:'Say there are two of you and ask for a recommendation. Two sentences.' },
        muster:'Ein Tisch für zwei, bitte. Was können Sie empfehlen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'**Ich will** significa „quiero", pero suena brusco en alemán — casi como exigir. En un café, en una tienda, en cualquier sitio se dice **ich möchte**. Es la misma idea, dicha con buenos modos.', en:'**Ich will** means "I want", but it sounds blunt in German — almost like demanding. In a café or a shop you say **ich möchte** instead. Same idea, better manners.' },
        beispiele:[
          { z:'Ich möchte einen Kaffee.', na:{ es:'Quiero un café.', en:'I\'d like a coffee.' } },
          { z:'Ich möchte zahlen.', na:{ es:'Quiero pagar.', en:'I\'d like to pay.' } }
        ]
      }
    },

    'a1.taxi': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Abend. Ja bitte?', na:{ es:'Buenas noches. ¿Sí?', en:'Good evening. Yes?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'So, da wären wir. Das macht achtundzwanzig Euro. Guten Flug!', na:{ es:'Ya llegamos. Son veintiocho euros. ¡Buen vuelo!', en:'Here we are. That\'s twenty-eight euros. Have a good flight!' } },
      wortschatz: [
        { z:'das Taxi', na:{ es:'el taxi', en:'the cab' } },
        { z:'der Flughafen', na:{ es:'el aeropuerto', en:'the airport' } },
        { z:'die Innenstadt', na:{ es:'el centro', en:'downtown' } },
        { z:'der Koffer', na:{ es:'la maleta', en:'the suitcase' } },
        { z:'der Kofferraum', na:{ es:'el maletero', en:'the trunk' } },
        { z:'einsteigen', na:{ es:'subir', en:'to get in' } },
        { z:'aussteigen', na:{ es:'bajar', en:'to get out' } },
        { z:'die Adresse', na:{ es:'la dirección', en:'the address' } },
        { z:'halten', na:{ es:'parar', en:'to stop' } },
        { z:'schnell', na:{ es:'rápido', en:'fast' } },
        { z:'langsam', na:{ es:'despacio', en:'slow' } },
        { z:'stimmt so', na:{ es:'quédese con el cambio', en:'keep the change' } }
      ],
      dialog: {
        rolle: { es:'el taxista', en:'the driver' },
        zeilen: [
          { wer:'spikiu', z:'Guten Abend. Ja bitte?', na:{ es:'Buenas noches. ¿Sí?', en:'Good evening. Yes?' } },
          { wer:'lerner', z:'Sind Sie frei?', na:{ es:'¿Está libre?', en:'Are you free?' } },
          { wer:'spikiu', z:'Ja, steigen Sie ein. Wohin soll es gehen?', na:{ es:'Sí, suba. ¿Adónde vamos?', en:'Yes, get in. Where to?' } },
          { wer:'lerner', z:'Zum Flughafen, bitte.', na:{ es:'Al aeropuerto, por favor.', en:'To the airport, please.' } },
          { wer:'spikiu', z:'Alles klar. Haben Sie Gepäck dabei?', na:{ es:'Muy bien. ¿Lleva equipaje?', en:'All right. Do you have luggage?' } },
          { wer:'lerner', z:'Ja, einen Koffer.', na:{ es:'Sí, una maleta.', en:'Yes, one suitcase.' } }
        ]
      },
      lesetext: {
        z:'Es ist Abend. Ein Mann winkt einem Taxi. Er will zum Flughafen und hat einen Koffer dabei. Die Fahrt kostet achtundzwanzig Euro. Der Fahrer wünscht ihm einen guten Flug.',
        na:{ es:'Es de noche. Un hombre para un taxi. Quiere ir al aeropuerto y lleva una maleta. El viaje cuesta veintiocho euros. El taxista le desea un buen vuelo.', en:'It\'s evening. A man waves down a taxi. He wants to go to the airport and has one suitcase with him. The ride costs twenty-eight euros. The driver wishes him a good flight.' },
        frage:{ es:'¿Adónde va el hombre?', en:'Where is the man going?' },
        optionen:[
          { na:{ es:'Al aeropuerto', en:'To the airport' }, richtig:true },
          { na:{ es:'A la estación', en:'To the station' }, richtig:false },
          { na:{ es:'Al centro', en:'Downtown' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta si el taxi está libre y di adónde vas. Dos frases.', en:'Ask if the taxi is free and give your destination. Two sentences.' },
        muster:'Sind Sie frei? Zum Bahnhof, bitte.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'A un desconocido se le dice **Sie**: „Sind Sie frei?" A un amigo o a un niño se le dice **du**: „Bist du fertig?" Elegir mal no es un error de gramática, es un error de trato — por eso importa más que la gramática.', en:'To a stranger you say **Sie**: "Sind Sie frei?" To a friend or a child you say **du**: "Bist du fertig?" Choosing wrong is not a grammar mistake, it is a manners mistake — which is why it matters more than grammar.' },
        beispiele:[
          { z:'Sind Sie frei?', na:{ es:'¿Está libre?', en:'Are you free?' } },
          { z:'Bist du fertig?', na:{ es:'¿Estás listo?', en:'Are you ready?' } }
        ]
      }
    },

    'a1.wegbeschreibung': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Kann ich Ihnen helfen?', na:{ es:'¿Le puedo ayudar?', en:'Can I help you?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gern geschehen. Schönen Aufenthalt!', na:{ es:'De nada. ¡Que disfrute su estancia!', en:'You\'re welcome. Enjoy your stay!' } },
      wortschatz: [
        { z:'geradeaus', na:{ es:'todo recto', en:'straight ahead' } },
        { z:'links', na:{ es:'a la izquierda', en:'left' } },
        { z:'rechts', na:{ es:'a la derecha', en:'right' } },
        { z:'die Ecke', na:{ es:'la esquina', en:'the corner' } },
        { z:'die Ampel', na:{ es:'el semáforo', en:'the traffic light' } },
        { z:'die Kreuzung', na:{ es:'el cruce', en:'the junction' } },
        { z:'zu Fuß', na:{ es:'a pie', en:'on foot' } },
        { z:'die Haltestelle', na:{ es:'la parada', en:'the stop' } },
        { z:'gegenüber', na:{ es:'enfrente', en:'opposite' } },
        { z:'neben', na:{ es:'al lado de', en:'next to' } },
        { z:'weit', na:{ es:'lejos', en:'far' } },
        { z:'in der Nähe', na:{ es:'cerca', en:'nearby' } }
      ],
      dialog: {
        rolle: { es:'un transeúnte', en:'a passer-by' },
        zeilen: [
          { wer:'spikiu', z:'Kann ich Ihnen helfen?', na:{ es:'¿Le puedo ayudar?', en:'Can I help you?' } },
          { wer:'lerner', z:'Entschuldigung, wo ist der Marktplatz?', na:{ es:'Perdone, ¿dónde está la plaza del mercado?', en:'Excuse me, where is the market square?' } },
          { wer:'spikiu', z:'Immer geradeaus, dann die zweite links.', na:{ es:'Todo recto y luego la segunda a la izquierda.', en:'Straight ahead, then second on the left.' } },
          { wer:'lerner', z:'Ist das weit?', na:{ es:'¿Está lejos?', en:'Is it far?' } },
          { wer:'spikiu', z:'Nein, fünf Minuten zu Fuß.', na:{ es:'No, cinco minutos a pie.', en:'No, five minutes on foot.' } },
          { wer:'lerner', z:'Vielen Dank!', na:{ es:'¡Muchas gracias!', en:'Thank you very much!' } }
        ]
      },
      lesetext: {
        z:'Eine Frau sucht den Marktplatz. Ein Mann hilft ihr. Sie muss immer geradeaus gehen und dann die zweite Straße links nehmen. Zu Fuß dauert es nur fünf Minuten.',
        na:{ es:'Una mujer busca la plaza del mercado. Un hombre la ayuda. Tiene que seguir todo recto y luego tomar la segunda calle a la izquierda. A pie son solo cinco minutos.', en:'A woman is looking for the market square. A man helps her. She has to go straight ahead and then take the second street on the left. On foot it is only five minutes.' },
        frage:{ es:'¿Cuánto se tarda?', en:'How long does it take?' },
        optionen:[
          { na:{ es:'Cinco minutos', en:'Five minutes' }, richtig:true },
          { na:{ es:'Dos minutos', en:'Two minutes' }, richtig:false },
          { na:{ es:'Media hora', en:'Half an hour' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta dónde está la estación y si está lejos. Dos frases.', en:'Ask where the station is and whether it is far. Two sentences.' },
        muster:'Entschuldigung, wo ist der Bahnhof? Ist das weit?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Para dar indicaciones a un desconocido, el verbo va **primero** y luego **Sie**: Gehen Sie geradeaus. Nehmen Sie die zweite Straße. Es la forma educada, la que oirás en la calle.', en:'To give directions to a stranger, the verb comes **first** and then **Sie**: Gehen Sie geradeaus. Nehmen Sie die zweite Straße. That is the polite form — the one you will hear on the street.' },
        beispiele:[
          { z:'Gehen Sie geradeaus.', na:{ es:'Siga todo recto.', en:'Go straight ahead.' } },
          { z:'Nehmen Sie die zweite Straße.', na:{ es:'Tome la segunda calle.', en:'Take the second street.' } }
        ]
      }
    },

    'a1.wetter': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Bis morgen — und komm trocken heim!', na:{ es:'Hasta mañana. ¡Y que llegues seco a casa!', en:'See you tomorrow — and get home dry!' } },
      wortschatz: [
        { z:'die Sonne', na:{ es:'el sol', en:'the sun' } },
        { z:'der Regen', na:{ es:'la lluvia', en:'the rain' } },
        { z:'der Schnee', na:{ es:'la nieve', en:'the snow' } },
        { z:'der Wind', na:{ es:'el viento', en:'the wind' } },
        { z:'warm', na:{ es:'cálido', en:'warm' } },
        { z:'kalt', na:{ es:'frío', en:'cold' } },
        { z:'scheinen', na:{ es:'brillar', en:'to shine' } },
        { z:'regnen', na:{ es:'llover', en:'to rain' } },
        { z:'der Schirm', na:{ es:'el paraguas', en:'the umbrella' } },
        { z:'die Wolke', na:{ es:'la nube', en:'the cloud' } },
        { z:'das Wetter', na:{ es:'el tiempo', en:'the weather' } },
        { z:'der Feierabend', na:{ es:'el fin de la jornada', en:'the end of the working day' } }
      ],
      dialog: {
        rolle: { es:'un compañero de trabajo', en:'a coworker' },
        zeilen: [
          { wer:'spikiu', z:'Was für ein schöner Tag heute!', na:{ es:'¡Qué buen día hace hoy!', en:'What a lovely day today!' } },
          { wer:'lerner', z:'Ja, die Sonne scheint und es ist warm.', na:{ es:'Sí, hace sol y calor.', en:'Yes, the sun is out and it\'s warm.' } },
          { wer:'spikiu', z:'Und morgen? Weißt du das schon?', na:{ es:'¿Y mañana? ¿Ya lo sabes?', en:'And tomorrow? Do you know yet?' } },
          { wer:'lerner', z:'Morgen regnet es, glaube ich.', na:{ es:'Mañana llueve, creo.', en:'It\'ll rain tomorrow, I think.' } },
          { wer:'spikiu', z:'Dann nehme ich den Schirm mit.', na:{ es:'Entonces me llevo el paraguas.', en:'Then I\'ll take the umbrella.' } },
          { wer:'lerner', z:'Gute Idee. Bis morgen!', na:{ es:'Buena idea. ¡Hasta mañana!', en:'Good idea. See you tomorrow!' } }
        ]
      },
      lesetext: {
        z:'Heute scheint die Sonne und es ist warm. Morgen soll es aber regnen. Ein Kollege nimmt deshalb einen Schirm mit. Am Abend fahren beide zusammen nach Hause.',
        na:{ es:'Hoy hace sol y calor. Pero mañana dicen que va a llover. Por eso un compañero se lleva un paraguas. Por la tarde vuelven los dos juntos a casa.', en:'Today the sun is shining and it\'s warm. Tomorrow it\'s supposed to rain, though. So a colleague takes an umbrella. In the evening they both go home together.' },
        frage:{ es:'¿Qué tiempo hará mañana?', en:'What will the weather be like tomorrow?' },
        optionen:[
          { na:{ es:'Va a llover', en:'It will rain' }, richtig:true },
          { na:{ es:'Va a nevar', en:'It will snow' }, richtig:false },
          { na:{ es:'Seguirá soleado', en:'It stays sunny' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di qué tiempo hace hoy y qué tiempo hará mañana. Dos frases.', en:'Say what the weather is like today and what it will be tomorrow. Two sentences.' },
        muster:'Heute scheint die Sonne. Morgen soll es regnen.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Para el tiempo el alemán pone siempre un **es** delante, aunque no signifique nada: es regnet, es schneit, es ist kalt. En español basta con „llueve" — en alemán ese **es** no se puede quitar.', en:'For weather German always puts an **es** in front, even though it means nothing: es regnet, es schneit, es ist kalt. Just like the English "it", which also is not anybody.' },
        beispiele:[
          { z:'Es regnet.', na:{ es:'Llueve.', en:'It\'s raining.' } },
          { z:'Es ist kalt.', na:{ es:'Hace frío.', en:'It\'s cold.' } }
        ]
      }
    },

    'a2.arzt': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ja, kommen Sie am Donnerstag wieder. Die Überweisung gebe ich Ihnen mit.', na:{ es:'Sí, vuelva el jueves. Le doy el volante para el especialista.', en:'Yes, come back on Thursday. I\'ll give you the referral.' } },
      wortschatz: [
        { z:'stürzen', na:{ es:'caerse', en:'to fall' } },
        { z:'die Schulter', na:{ es:'el hombro', en:'the shoulder' } },
        { z:'schlimmer werden', na:{ es:'empeorar', en:'to get worse' } },
        { z:'die Schmerztablette', na:{ es:'el analgésico', en:'the painkiller' } },
        { z:'allergisch', na:{ es:'alérgico', en:'allergic' } },
        { z:'das Röntgenbild', na:{ es:'la radiografía', en:'the X-ray' } },
        { z:'der Termin', na:{ es:'la cita', en:'the appointment' } },
        { z:'die Überweisung', na:{ es:'el volante', en:'the referral' } },
        { z:'die Praxis', na:{ es:'la consulta', en:'the practice' } },
        { z:'das Wartezimmer', na:{ es:'la sala de espera', en:'the waiting room' } },
        { z:'behandeln', na:{ es:'tratar', en:'to treat' } },
        { z:'untersuchen', na:{ es:'examinar', en:'to examine' } }
      ],
      dialog: {
        rolle: { es:'el médico', en:'the doctor' },
        zeilen: [
          { wer:'spikiu', z:'Erzählen Sie mal, was ist denn passiert?', na:{ es:'Cuénteme, ¿qué le pasó?', en:'Tell me, what happened?' } },
          { wer:'lerner', z:'Ich bin letzte Woche gestürzt, und die Schulter ist schlimmer geworden.', na:{ es:'Me caí la semana pasada y el hombro ha empeorado.', en:'I fell last week, and the shoulder has got worse.' } },
          { wer:'spikiu', z:'Nehmen Sie zurzeit Medikamente?', na:{ es:'¿Toma alguna medicina actualmente?', en:'Are you taking any medication at the moment?' } },
          { wer:'lerner', z:'Nur Schmerztabletten. Gegen Penizillin bin ich allergisch.', na:{ es:'Solo analgésicos. Soy alérgica a la penicilina.', en:'Only painkillers. I\'m allergic to penicillin.' } },
          { wer:'spikiu', z:'Gut, das notiere ich. Wir machen erst mal ein Röntgenbild.', na:{ es:'Bien, lo apunto. Primero hacemos una radiografía.', en:'Good, I\'ll note that. Let\'s do an X-ray first.' } },
          { wer:'lerner', z:'Einverstanden. Brauche ich noch einen Termin?', na:{ es:'De acuerdo. ¿Necesito otra cita?', en:'All right. Do I need another appointment?' } }
        ]
      },
      lesetext: {
        z:'Eine Patientin ist letzte Woche gestürzt, und die Schulter ist schlimmer geworden. Sie nimmt nur Schmerztabletten und ist gegen Penizillin allergisch. Der Arzt macht erst ein Röntgenbild. Am Donnerstag soll sie wiederkommen und bekommt eine Überweisung mit.',
        na:{ es:'Una paciente se cayó la semana pasada y el hombro ha empeorado. Solo toma analgésicos y es alérgica a la penicilina. El médico hace primero una radiografía. El jueves tiene que volver y le da un volante para el especialista.', en:'A patient fell last week and her shoulder has got worse. She only takes painkillers and is allergic to penicillin. The doctor does an X-ray first. She is to come back on Thursday and gets a referral.' },
        frage:{ es:'¿A qué es alérgica la paciente?', en:'What is the patient allergic to?' },
        optionen:[
          { na:{ es:'A la penicilina', en:'To penicillin' }, richtig:true },
          { na:{ es:'A los analgésicos', en:'To painkillers' }, richtig:false },
          { na:{ es:'A los frutos secos', en:'To nuts' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Cuenta qué te pasó y di a qué eres alérgico. Dos frases.', en:'Say what happened and name your allergy. Two sentences.' },
        muster:'Ich bin gestern gestürzt und mein Knie tut weh. Gegen Penizillin bin ich allergisch.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Casi todo el pasado alemán se hace con **haben**. Pero los verbos de movimiento llevan **sein**: ich **bin** gestürzt, ich **bin** gefahren, ich **bin** gegangen. „Ich habe gestürzt" es el fallo que hace todo hispanohablante — y se oye enseguida.', en:'Most German past forms use **haben**. But verbs of movement take **sein**: ich **bin** gestürzt, ich **bin** gefahren, ich **bin** gegangen. "Ich habe gestürzt" is the mistake nearly every learner makes — and it is heard instantly.' },
        beispiele:[
          { z:'Ich bin gestürzt.', na:{ es:'Me caí.', en:'I fell.' } },
          { z:'Ich bin nach Hause gegangen.', na:{ es:'Me fui a casa.', en:'I went home.' } }
        ]
      }
    },

    'a2.bahnhof': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Der Nächste bitte. Was kann ich für Sie tun?', na:{ es:'El siguiente, por favor. ¿En qué le ayudo?', en:'Next please. How can I help you?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Dann gilt Ihre Fahrkarte im nächsten ICE — die Zugbindung ist aufgehoben. Gute Fahrt!', na:{ es:'Entonces su billete vale para el siguiente tren. Queda libre de horario. ¡Buen viaje!', en:'Then your ticket is valid on the next train — the restriction is lifted. Have a good trip!' } },
      wortschatz: [
        { z:'die Verspätung', na:{ es:'el retraso', en:'the delay' } },
        { z:'umsteigen', na:{ es:'hacer transbordo', en:'to change trains' } },
        { z:'der Anschluss', na:{ es:'el enlace', en:'the connection' } },
        { z:'verpassen', na:{ es:'perder', en:'to miss' } },
        { z:'die Fahrkarte', na:{ es:'el billete', en:'the ticket' } },
        { z:'das Gleis', na:{ es:'el andén', en:'the platform' } },
        { z:'der Schalter', na:{ es:'la ventanilla', en:'the counter' } },
        { z:'die Zugbindung', na:{ es:'la validez para un tren concreto', en:'the train restriction' } },
        { z:'erstattet', na:{ es:'reembolsado', en:'refunded' } },
        { z:'knapp', na:{ es:'justo', en:'tight' } },
        { z:'ungefähr', na:{ es:'aproximadamente', en:'roughly' } },
        { z:'der nächste', na:{ es:'el siguiente', en:'the next one' } }
      ],
      dialog: {
        rolle: { es:'el empleado de información', en:'the service agent' },
        zeilen: [
          { wer:'spikiu', z:'Der Nächste bitte. Was kann ich für Sie tun?', na:{ es:'El siguiente, por favor. ¿En qué le ayudo?', en:'Next please. How can I help you?' } },
          { wer:'lerner', z:'Mein Zug hat zwanzig Minuten Verspätung.', na:{ es:'Mi tren lleva veinte minutos de retraso.', en:'My train is twenty minutes late.' } },
          { wer:'spikiu', z:'Das tut mir leid. Wann müssen Sie umsteigen?', na:{ es:'Lo siento. ¿A qué hora tiene el transbordo?', en:'I\'m sorry. When do you have to change?' } },
          { wer:'lerner', z:'In Hannover, um Viertel nach drei.', na:{ es:'En Hannover, a las tres y cuarto.', en:'In Hanover, at quarter past three.' } },
          { wer:'spikiu', z:'Das wird knapp. Der Anschluss wartet nicht.', na:{ es:'Va justo. El enlace no espera.', en:'That\'ll be tight. The connection won\'t wait.' } },
          { wer:'lerner', z:'Und wenn ich ihn verpasse?', na:{ es:'¿Y si lo pierdo?', en:'And if I miss it?' } }
        ]
      },
      lesetext: {
        z:'Ein Reisender meldet an der Information, dass sein Zug zwanzig Minuten Verspätung hat. In Hannover muss er um Viertel nach drei umsteigen — das wird knapp, und der Anschluss wartet nicht. Wenn er ihn verpasst, gilt seine Fahrkarte im nächsten ICE.',
        na:{ es:'Un viajero informa en el mostrador de que su tren lleva veinte minutos de retraso. En Hannover tiene el transbordo a las tres y cuarto, va justo, y el enlace no espera. Si lo pierde, su billete vale para el siguiente tren.', en:'A traveller reports at the information desk that his train is twenty minutes late. He has to change in Hanover at quarter past three — it\'ll be tight, and the connection won\'t wait. If he misses it, his ticket is valid on the next train.' },
        frage:{ es:'¿Qué pasa si pierde el enlace?', en:'What happens if he misses the connection?' },
        optionen:[
          { na:{ es:'Su billete vale para el siguiente tren', en:'His ticket works on the next train' }, richtig:true },
          { na:{ es:'Tiene que comprar otro', en:'He has to buy a new one' }, richtig:false },
          { na:{ es:'Le devuelven el dinero', en:'He gets a refund' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que tu tren lleva retraso y pregunta qué pasa si pierdes el enlace. Dos frases.', en:'Say your train is late and ask what happens if you miss your connection. Two sentences.' },
        muster:'Mein Zug hat eine halbe Stunde Verspätung. Was passiert, wenn ich den Anschluss verpasse?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'En una frase con **wenn**, el verbo se va **al final**: „**Wenn** ich ihn **verpasse**, ..." Después de la coma la frase vuelve a empezar normal. Suena raro al principio y se pega rápido, porque se usa todo el día.', en:'In a **wenn** clause the verb goes **to the end**: "**Wenn** ich ihn **verpasse**, ..." After the comma the sentence starts normally again. It feels odd at first and sticks fast, because you need it every day.' },
        beispiele:[
          { z:'Wenn ich ihn verpasse, nehme ich den nächsten.', na:{ es:'Si lo pierdo, tomo el siguiente.', en:'If I miss it, I\'ll take the next one.' } },
          { z:'Wenn es regnet, bleibe ich hier.', na:{ es:'Si llueve, me quedo aquí.', en:'If it rains, I\'ll stay here.' } }
        ]
      }
    },

    'a2.cafe': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Alles in Ordnung bei Ihnen?', na:{ es:'¿Qué tal todo por aquí?', en:'How\'s everything over here?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gute Wahl. Ich bringe Ihnen beides zusammen.', na:{ es:'Buena elección. Le traigo las dos cosas juntas.', en:'Good choice. I\'ll bring you both together.' } },
      wortschatz: [
        { z:'kalt', na:{ es:'frío', en:'cold' } },
        { z:'lauwarm', na:{ es:'tibio', en:'lukewarm' } },
        { z:'reklamieren', na:{ es:'reclamar', en:'to complain' } },
        { z:'die Nüsse', na:{ es:'los frutos secos', en:'the nuts' } },
        { z:'allergisch', na:{ es:'alérgico', en:'allergic' } },
        { z:'die Zutaten', na:{ es:'los ingredientes', en:'the ingredients' } },
        { z:'der Kuchen', na:{ es:'la tarta', en:'the cake' } },
        { z:'umtauschen', na:{ es:'cambiar', en:'to swap' } },
        { z:'leider', na:{ es:'por desgracia', en:'unfortunately' } },
        { z:'nämlich', na:{ es:'es que', en:'you see' } },
        { z:'frisch', na:{ es:'fresco', en:'fresh' } },
        { z:'noch einmal', na:{ es:'otra vez', en:'once more' } }
      ],
      dialog: {
        rolle: { es:'el camarero', en:'the server' },
        zeilen: [
          { wer:'spikiu', z:'Alles in Ordnung bei Ihnen?', na:{ es:'¿Qué tal todo por aquí?', en:'How\'s everything over here?' } },
          { wer:'lerner', z:'Entschuldigung, der Kaffee ist leider kalt.', na:{ es:'Disculpe, el café está frío.', en:'Excuse me, the coffee is cold, unfortunately.' } },
          { wer:'spikiu', z:'Das tut mir leid, ich bringe Ihnen sofort einen neuen.', na:{ es:'Lo siento mucho, ahora mismo le traigo otro.', en:'I\'m sorry, I\'ll bring you a fresh one right away.' } },
          { wer:'lerner', z:'Danke. Und noch etwas: sind in dem Kuchen Nüsse?', na:{ es:'Gracias. Y otra cosa: ¿la tarta lleva frutos secos?', en:'Thanks. And one more thing: are there nuts in the cake?' } },
          { wer:'spikiu', z:'In dem schon. Der Zitronenkuchen ist aber nussfrei.', na:{ es:'En esa sí. Pero la de limón no lleva.', en:'In that one, yes. But the lemon cake is nut-free.' } },
          { wer:'lerner', z:'Gut, ich bin nämlich allergisch. Dann den Zitronenkuchen.', na:{ es:'Bien, es que soy alérgico. Entonces la de limón.', en:'Good, because I\'m allergic. The lemon cake then.' } }
        ]
      },
      lesetext: {
        z:'Ein Gast reklamiert im Café: sein Kaffee ist kalt. Der Kellner entschuldigt sich und bringt sofort einen neuen. Der Gast fragt noch, ob in dem Kuchen Nüsse sind, denn er ist allergisch. Der Zitronenkuchen ist nussfrei, also nimmt er den.',
        na:{ es:'Un cliente reclama en la cafetería: su café está frío. El camarero se disculpa y trae otro enseguida. El cliente pregunta además si la tarta lleva frutos secos, porque es alérgico. La de limón no lleva, así que se la lleva.', en:'A guest complains in the café: his coffee is cold. The waiter apologises and brings a fresh one right away. The guest also asks whether the cake has nuts in it, because he\'s allergic. The lemon cake is nut-free, so he takes that one.' },
        frage:{ es:'¿Por qué pregunta por los frutos secos?', en:'Why does he ask about the nuts?' },
        optionen:[
          { na:{ es:'Es alérgico', en:'He is allergic' }, richtig:true },
          { na:{ es:'No le gustan', en:'He doesn\'t like them' }, richtig:false },
          { na:{ es:'No tiene hambre', en:'He isn\'t hungry' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di con cortesía que tu sopa está fría y pregunta qué lleva. Dos frases.', en:'Politely say your soup is cold and ask what is in it. Two sentences.' },
        muster:'Entschuldigung, die Suppe ist leider kalt. Was ist da eigentlich drin?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Dos palabritas hacen educada una queja alemana. **Leider** („por desgracia") suaviza la crítica: „Der Kaffee ist kalt" suena seco, „Der Kaffee ist **leider** kalt" no. Y **nämlich** explica sin sonar a excusa: „Ich bin **nämlich** allergisch". Ninguna de las dos se traduce bien — se aprenden por el efecto que hacen.', en:'Two little words make a German complaint polite. **Leider** ("unfortunately") softens it: "Der Kaffee ist kalt" is blunt, "Der Kaffee ist **leider** kalt" is not. And **nämlich** explains without sounding like an excuse: "Ich bin **nämlich** allergisch". Neither translates well — you learn them by the effect they have.' },
        beispiele:[
          { z:'Der Kaffee ist leider kalt.', na:{ es:'El café está frío, por desgracia.', en:'The coffee is cold, unfortunately.' } },
          { z:'Ich bin nämlich allergisch.', na:{ es:'Es que soy alérgico.', en:'You see, I\'m allergic.' } }
        ]
      }
    },

    'a2.einkaufen': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Tag, kann ich Ihnen behilflich sein?', na:{ es:'Buenos días, ¿le puedo ayudar en algo?', en:'Hello, can I help you with anything?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gerne, die Kabine ist hinten links. Ich bringe Ihnen die Größe.', na:{ es:'Con gusto, el probador está al fondo a la izquierda. Le traigo la talla.', en:'Of course, the fitting room is at the back on the left. I\'ll bring you the size.' } },
      wortschatz: [
        { z:'das Hemd', na:{ es:'la camisa', en:'the shirt' } },
        { z:'die Größe', na:{ es:'la talla', en:'the size' } },
        { z:'zu groß', na:{ es:'demasiado grande', en:'too big' } },
        { z:'zu klein', na:{ es:'demasiado pequeño', en:'too small' } },
        { z:'der Kassenbon', na:{ es:'el ticket de compra', en:'the receipt' } },
        { z:'umtauschen', na:{ es:'cambiar', en:'to exchange' } },
        { z:'anprobieren', na:{ es:'probarse', en:'to try on' } },
        { z:'die Umkleidekabine', na:{ es:'el probador', en:'the fitting room' } },
        { z:'passen', na:{ es:'quedar bien', en:'to fit' } },
        { z:'das Angebot', na:{ es:'la oferta', en:'the special offer' } },
        { z:'zurückgeben', na:{ es:'devolver', en:'to return' } },
        { z:'die Quittung', na:{ es:'el recibo', en:'the receipt' } }
      ],
      dialog: {
        rolle: { es:'la vendedora', en:'the sales assistant' },
        zeilen: [
          { wer:'spikiu', z:'Guten Tag, kann ich Ihnen behilflich sein?', na:{ es:'Buenos días, ¿le puedo ayudar en algo?', en:'Hello, can I help you with anything?' } },
          { wer:'lerner', z:'Ja, ich habe dieses Hemd gestern gekauft, aber es ist mir zu groß.', na:{ es:'Sí, compré esta camisa ayer, pero me queda grande.', en:'Yes, I bought this shirt yesterday, but it\'s too big for me.' } },
          { wer:'spikiu', z:'Haben Sie den Kassenbon dabei?', na:{ es:'¿Trae el ticket de compra?', en:'Do you have the receipt with you?' } },
          { wer:'lerner', z:'Ja, hier. Kann ich es umtauschen?', na:{ es:'Sí, aquí está. ¿Puedo cambiarla?', en:'Yes, here. Can I exchange it?' } },
          { wer:'spikiu', z:'Selbstverständlich. Welche Größe brauchen Sie?', na:{ es:'Por supuesto. ¿Qué talla necesita?', en:'Of course. What size do you need?' } },
          { wer:'lerner', z:'Eine kleiner. Darf ich es anprobieren?', na:{ es:'Una menos. ¿Me la puedo probar?', en:'One smaller. May I try it on?' } }
        ]
      },
      lesetext: {
        z:'Eine Kundin hat gestern ein Hemd gekauft, aber es ist ihr zu groß. Sie hat den Kassenbon dabei und darf es umtauschen. Sie braucht eine Größe kleiner und möchte es anprobieren. Die Kabine ist hinten links.',
        na:{ es:'Una clienta compró ayer una camisa, pero le queda grande. Trae el ticket y puede cambiarla. Necesita una talla menos y quiere probársela. El probador está al fondo a la izquierda.', en:'A customer bought a shirt yesterday, but it\'s too big for her. She has the receipt with her and may exchange it. She needs one size smaller and wants to try it on. The fitting room is at the back on the left.' },
        frage:{ es:'¿Qué necesita para cambiarla?', en:'What does she need in order to exchange it?' },
        optionen:[
          { na:{ es:'El ticket de compra', en:'The receipt' }, richtig:true },
          { na:{ es:'Una cita', en:'An appointment' }, richtig:false },
          { na:{ es:'Otro color', en:'Another colour' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di que el pantalón te queda pequeño y pregunta si puedes cambiarlo. Dos frases.', en:'Say the trousers are too small and ask if you can exchange them. Two sentences.' },
        muster:'Die Hose ist mir leider zu klein. Kann ich sie umtauschen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'El español dice **poder** para todo. El alemán separa dos cosas: **kann ich** = ¿soy capaz, es posible? · **darf ich** = ¿me dejan? Al probarse ropa se pide permiso, no capacidad: **Darf ich es anprobieren?** Con „kann" suena como si dudaras de tus brazos.', en:'English uses "can" for everything. German splits it: **kann ich** = am I able to · **darf ich** = am I allowed to. Trying on clothes is about permission: **Darf ich es anprobieren?** Using "kann" sounds like you doubt your own arms.' },
        beispiele:[
          { z:'Darf ich es anprobieren?', na:{ es:'¿Me lo puedo probar?', en:'May I try it on?' } },
          { z:'Kann ich mit Karte zahlen?', na:{ es:'¿Puedo pagar con tarjeta?', en:'Can I pay by card?' } }
        ]
      }
    },

    'a2.familie': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Das kann ich gut verstehen. Aber ihr seht euch bestimmt bald wieder.', na:{ es:'Lo entiendo muy bien. Pero seguro que os veis pronto.', en:'I understand that well. But I\'m sure you\'ll see each other soon.' } },
      wortschatz: [
        { z:'das Dorf', na:{ es:'el pueblo', en:'the village' } },
        { z:'früher', na:{ es:'antes', en:'back then' } },
        { z:'umziehen', na:{ es:'mudarse', en:'to move house' } },
        { z:'weggezogen', na:{ es:'se mudó', en:'moved away' } },
        { z:'vermissen', na:{ es:'echar de menos', en:'to miss' } },
        { z:'sich treffen', na:{ es:'reunirse', en:'to meet up' } },
        { z:'die Tante', na:{ es:'la tía', en:'the aunt' } },
        { z:'der Onkel', na:{ es:'el tío', en:'the uncle' } },
        { z:'der Cousin', na:{ es:'el primo', en:'the cousin' } },
        { z:'damals', na:{ es:'en aquella época', en:'in those days' } },
        { z:'als Kind', na:{ es:'de niño', en:'as a child' } },
        { z:'eigentlich', na:{ es:'en realidad', en:'actually' } }
      ],
      dialog: {
        rolle: { es:'una vieja conocida', en:'an old acquaintance' },
        zeilen: [
          { wer:'spikiu', z:'Wo hast du eigentlich als Kind gewohnt?', na:{ es:'¿Dónde vivías cuando eras niño?', en:'Where did you actually live as a child?' } },
          { wer:'lerner', z:'Wir haben in einem kleinen Dorf gewohnt.', na:{ es:'Vivíamos en un pueblo pequeño.', en:'We lived in a small village.' } },
          { wer:'spikiu', z:'Und war die ganze Familie dort?', na:{ es:'¿Y estaba toda la familia allí?', en:'And was the whole family there?' } },
          { wer:'lerner', z:'Ja. Sonntags haben wir uns bei meiner Tante getroffen.', na:{ es:'Sí. Los domingos nos reuníamos en casa de mi tía.', en:'Yes. On Sundays we used to meet at my aunt\'s.' } },
          { wer:'spikiu', z:'Wie schön. Sind sie noch da?', na:{ es:'Qué bonito. ¿Siguen allí?', en:'How lovely. Are they still there?' } },
          { wer:'lerner', z:'Nein, meine Schwester ist weggezogen. Ich vermisse sie.', na:{ es:'No, mi hermana se mudó. La echo de menos.', en:'No, my sister moved away. I miss her.' } }
        ]
      },
      lesetext: {
        z:'Zwei alte Bekannte reden über früher. Als Kind hat er in einem kleinen Dorf gewohnt. Sonntags haben sich alle bei der Tante getroffen. Heute ist seine Schwester weggezogen, und er vermisst sie.',
        na:{ es:'Dos viejos conocidos hablan del pasado. De niño vivía en un pueblo pequeño. Los domingos se reunían todos en casa de la tía. Hoy su hermana se ha mudado y la echa de menos.', en:'Two old acquaintances talk about the past. As a child he lived in a small village. On Sundays everyone met at his aunt\'s. Today his sister has moved away, and he misses her.' },
        frage:{ es:'¿Qué hacían los domingos?', en:'What did they do on Sundays?' },
        optionen:[
          { na:{ es:'Se reunían en casa de la tía', en:'They met at his aunt\'s' }, richtig:true },
          { na:{ es:'Trabajaban en el pueblo', en:'They worked in the village' }, richtig:false },
          { na:{ es:'Nada', en:'Nothing' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Cuenta dónde vivías de niño y qué hacíais los domingos. Dos frases.', en:'Say where you lived as a child and what you used to do on Sundays. Two sentences.' },
        muster:'Als Kind habe ich in einer kleinen Stadt gewohnt. Sonntags haben wir meine Großeltern besucht.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Para contar el pasado hablando, el alemán casi siempre usa dos piezas: **haben** + el verbo al final. „Wir **haben** in einem Dorf **gewohnt**." El imperfecto español („vivíamos") existe en alemán, pero se reserva para libros. En la mesa se dice así.', en:'To talk about the past, German nearly always uses two pieces: **haben** + the verb at the end. "Wir **haben** in einem Dorf **gewohnt**." The simple past exists but belongs in books. At the kitchen table, it is this.' },
        beispiele:[
          { z:'Wir haben in einem Dorf gewohnt.', na:{ es:'Vivíamos en un pueblo.', en:'We lived in a village.' } },
          { z:'Wir haben uns getroffen.', na:{ es:'Nos reuníamos.', en:'We used to meet.' } }
        ]
      }
    },

    'a2.hotel': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Morgen. Alles zu Ihrer Zufriedenheit?', na:{ es:'Buenos días. ¿Todo bien con la habitación?', en:'Good morning. Is everything to your satisfaction?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Selbstverständlich. Ich gebe Ihnen die 305, die liegt ruhiger.', na:{ es:'Por supuesto. Le doy la 305, es más tranquila.', en:'Of course. I\'ll give you 305, it\'s quieter.' } },
      wortschatz: [
        { z:'die Heizung', na:{ es:'la calefacción', en:'the heating' } },
        { z:'funktionieren', na:{ es:'funcionar', en:'to work' } },
        { z:'kaputt', na:{ es:'estropeado', en:'broken' } },
        { z:'warmes Wasser', na:{ es:'agua caliente', en:'hot water' } },
        { z:'das Handtuch', na:{ es:'la toalla', en:'the towel' } },
        { z:'die Klimaanlage', na:{ es:'el aire acondicionado', en:'the air conditioning' } },
        { z:'wechseln', na:{ es:'cambiar', en:'to change' } },
        { z:'ich würde lieber', na:{ es:'preferiría', en:'I\'d rather' } },
        { z:'ruhig', na:{ es:'tranquilo', en:'quiet' } },
        { z:'laut', na:{ es:'ruidoso', en:'noisy' } },
        { z:'sofort', na:{ es:'ahora mismo', en:'right away' } },
        { z:'Bescheid geben', na:{ es:'avisar', en:'to let someone know' } }
      ],
      dialog: {
        rolle: { es:'la recepcionista', en:'the front desk clerk' },
        zeilen: [
          { wer:'spikiu', z:'Guten Morgen. Alles zu Ihrer Zufriedenheit?', na:{ es:'Buenos días. ¿Todo bien con la habitación?', en:'Good morning. Is everything to your satisfaction?' } },
          { wer:'lerner', z:'Guten Morgen. Leider funktioniert die Heizung nicht.', na:{ es:'Buenos días. Lamentablemente la calefacción no funciona.', en:'Good morning. Unfortunately the heating isn\'t working.' } },
          { wer:'spikiu', z:'Das tut mir leid. Seit wann denn?', na:{ es:'Lo siento mucho. ¿Desde cuándo?', en:'I\'m sorry. Since when?' } },
          { wer:'lerner', z:'Seit gestern Abend. Und warmes Wasser gibt es auch nicht.', na:{ es:'Desde anoche. Y tampoco hay agua caliente.', en:'Since last night. And there\'s no hot water either.' } },
          { wer:'spikiu', z:'Ich schicke sofort jemanden hoch. Oder möchten Sie lieber wechseln?', na:{ es:'Enviamos a alguien ahora mismo. ¿O prefiere cambiar?', en:'I\'ll send someone up right away. Or would you rather change?' } },
          { wer:'lerner', z:'Ich würde lieber wechseln, wenn das geht.', na:{ es:'Preferiría cambiar, si es posible.', en:'I\'d rather change, if that\'s possible.' } }
        ]
      },
      lesetext: {
        z:'Ein Gast meldet an der Rezeption, dass die Heizung seit gestern Abend nicht funktioniert. Warmes Wasser gibt es auch keins. Die Rezeptionistin bietet an, jemanden zu schicken — der Gast würde aber lieber das Zimmer wechseln. Er bekommt die 305, die liegt ruhiger.',
        na:{ es:'Un huésped informa en recepción de que la calefacción no funciona desde anoche. Tampoco hay agua caliente. La recepcionista ofrece mandar a alguien, pero el huésped preferiría cambiar de habitación. Le dan la 305, que es más tranquila.', en:'A guest reports at reception that the heating hasn\'t worked since last night. There\'s no hot water either. The receptionist offers to send someone up, but the guest would rather change rooms. He gets 305, which is quieter.' },
        frage:{ es:'¿Qué prefiere el huésped?', en:'What does the guest prefer?' },
        optionen:[
          { na:{ es:'Otra habitación', en:'Another room' }, richtig:true },
          { na:{ es:'Que le devuelvan el dinero', en:'His money back' }, richtig:false },
          { na:{ es:'Una segunda llave', en:'A second key' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Informa de que la luz del baño no funciona y pide otra habitación. Dos frases.', en:'Report that the bathroom light does not work and ask for another room. Two sentences.' },
        muster:'Das Licht im Bad funktioniert leider nicht. Ich würde lieber das Zimmer wechseln.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'**Ich will wechseln** suena a exigencia. **Ich möchte wechseln** ya está bien. **Ich würde lieber wechseln** es lo más suave: dice tu preferencia sin presionar a nadie. Tres escalones para la misma frase — en Alemania importa cuál eliges.', en:'**Ich will wechseln** sounds demanding. **Ich möchte wechseln** is fine. **Ich würde lieber wechseln** is the softest: it states your preference without putting anyone under pressure. Three steps for the same sentence — in Germany the step you pick matters.' },
        beispiele:[
          { z:'Ich würde lieber wechseln.', na:{ es:'Preferiría cambiar.', en:'I\'d rather change.' } },
          { z:'Ich würde lieber morgen kommen.', na:{ es:'Preferiría venir mañana.', en:'I\'d rather come tomorrow.' } }
        ]
      }
    },

    'a2.restaurant': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Haben Sie schon gewählt?', na:{ es:'¿Ya han elegido?', en:'Have you decided yet?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Selbstverständlich, das machen wir hier oft. Ich bringe erst mal Wasser.', na:{ es:'Por supuesto, aquí lo hacemos a menudo. Primero les traigo agua.', en:'Of course, we do that often here. I\'ll bring some water first.' } },
      wortschatz: [
        { z:'die Spezialität', na:{ es:'la especialidad', en:'the speciality' } },
        { z:'deftig', na:{ es:'contundente', en:'hearty' } },
        { z:'leicht', na:{ es:'ligero', en:'light' } },
        { z:'teilen', na:{ es:'compartir', en:'to share' } },
        { z:'getrennt zahlen', na:{ es:'pagar por separado', en:'to split the bill' } },
        { z:'der Knödel', na:{ es:'la bola de patata', en:'the dumpling' } },
        { z:'das Gemüse', na:{ es:'la verdura', en:'the vegetables' } },
        { z:'die Portion', na:{ es:'la ración', en:'the portion' } },
        { z:'reichen', na:{ es:'alcanzar', en:'to be enough' } },
        { z:'empfehlen', na:{ es:'recomendar', en:'to recommend' } },
        { z:'könnten wir', na:{ es:'¿podríamos?', en:'could we' } },
        { z:'hinterher', na:{ es:'después', en:'afterwards' } }
      ],
      dialog: {
        rolle: { es:'la camarera', en:'the server' },
        zeilen: [
          { wer:'spikiu', z:'Haben Sie schon gewählt?', na:{ es:'¿Ya han elegido?', en:'Have you decided yet?' } },
          { wer:'lerner', z:'Noch nicht. Was ist denn Ihre Spezialität?', na:{ es:'Todavía no. ¿Cuál es su especialidad?', en:'Not yet. What is your speciality?' } },
          { wer:'spikiu', z:'Der Schweinebraten mit Knödeln. Sehr deftig, aber gut.', na:{ es:'El asado de cerdo con bolas de patata. Contundente, pero bueno.', en:'The roast pork with dumplings. Very hearty, but good.' } },
          { wer:'lerner', z:'Gibt es etwas Leichteres? Wir möchten teilen.', na:{ es:'¿Hay algo más ligero? Queremos compartir.', en:'Is there something lighter? We\'d like to share.' } },
          { wer:'spikiu', z:'Dann den Fisch mit Gemüse. Der reicht für zwei.', na:{ es:'Entonces el pescado con verduras. Alcanza para dos.', en:'The fish with vegetables then. That\'s enough for two.' } },
          { wer:'lerner', z:'Gut. Und könnten wir hinterher getrennt zahlen?', na:{ es:'Bien. ¿Y podríamos pagar por separado después?', en:'Good. And could we pay separately afterwards?' } }
        ]
      },
      lesetext: {
        z:'Zwei Gäste fragen nach der Spezialität des Hauses. Der Schweinebraten mit Knödeln ist sehr deftig, deshalb möchten sie lieber etwas Leichteres teilen. Die Kellnerin empfiehlt den Fisch mit Gemüse — der reicht für zwei. Am Ende zahlen sie getrennt.',
        na:{ es:'Dos clientes preguntan por la especialidad de la casa. El asado de cerdo con bolas de patata es muy contundente, así que prefieren compartir algo más ligero. La camarera les recomienda el pescado con verduras, que alcanza para dos. Al final pagan por separado.', en:'Two guests ask about the house speciality. The roast pork with dumplings is very hearty, so they\'d rather share something lighter. The waitress recommends the fish with vegetables — enough for two. In the end they pay separately.' },
        frage:{ es:'¿Qué piden los dos?', en:'What do the two order?' },
        optionen:[
          { na:{ es:'Pescado con verduras', en:'Fish with vegetables' }, richtig:true },
          { na:{ es:'Asado con bolas de patata', en:'Roast pork with dumplings' }, richtig:false },
          { na:{ es:'Solo un entrante', en:'Only a starter' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta por la especialidad y pide cuentas separadas. Dos frases.', en:'Ask about the speciality and ask to split the bill. Two sentences.' },
        muster:'Was ist Ihre Spezialität? Könnten wir hinterher getrennt zahlen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'**Können wir zahlen?** está bien dicho, pero suena a exigencia. **Könnten wir zahlen?** es la misma pregunta, un paso más atrás — como el condicional español „¿podríamos?". En restaurantes, tiendas y hoteles los alemanes usan casi siempre esta forma.', en:'**Können wir zahlen?** is correct but comes across as demanding. **Könnten wir zahlen?** is the same question, one step back — like English "could we" instead of "can we". In restaurants and shops Germans almost always use this form.' },
        beispiele:[
          { z:'Könnten wir bestellen?', na:{ es:'¿Podríamos pedir?', en:'Could we order?' } },
          { z:'Könnten wir getrennt zahlen?', na:{ es:'¿Podríamos pagar por separado?', en:'Could we split the bill?' } }
        ]
      }
    },

    'a2.taxi': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Guten Morgen. Wohin darf ich Sie bringen?', na:{ es:'Buenos días. ¿Adónde le llevo?', en:'Good morning. Where can I take you?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Klar, die schreibe ich Ihnen. Wir sind pünktlich da.', na:{ es:'Claro, se lo hago. Llegamos a tiempo.', en:'Sure, I\'ll write you one. We\'ll be there on time.' } },
      wortschatz: [
        { z:'der Stau', na:{ es:'el atasco', en:'the traffic jam' } },
        { z:'die Autobahn', na:{ es:'la autopista', en:'the motorway' } },
        { z:'der Verkehr', na:{ es:'el tráfico', en:'the traffic' } },
        { z:'in Eile sein', na:{ es:'tener prisa', en:'to be in a hurry' } },
        { z:'die Quittung', na:{ es:'el recibo', en:'the receipt' } },
        { z:'abbiegen', na:{ es:'girar', en:'to turn off' } },
        { z:'die Umleitung', na:{ es:'el desvío', en:'the diversion' } },
        { z:'pünktlich', na:{ es:'puntual', en:'on time' } },
        { z:'die Baustelle', na:{ es:'las obras', en:'the roadworks' } },
        { z:'dauern', na:{ es:'durar', en:'to take time' } },
        { z:'denn', na:{ es:'¿de verdad?', en:'actually' } },
        { z:'lang', na:{ es:'por ahí', en:'that way' } }
      ],
      dialog: {
        rolle: { es:'la taxista', en:'the driver' },
        zeilen: [
          { wer:'spikiu', z:'Guten Morgen. Wohin darf ich Sie bringen?', na:{ es:'Buenos días. ¿Adónde le llevo?', en:'Good morning. Where can I take you?' } },
          { wer:'lerner', z:'Zum Flughafen, bitte. Ich bin in Eile.', na:{ es:'Al aeropuerto, por favor. Tengo prisa.', en:'To the airport, please. I\'m in a hurry.' } },
          { wer:'spikiu', z:'Auf der Autobahn ist Stau. Soll ich durch die Stadt fahren?', na:{ es:'Hay atasco en la autopista. ¿Voy por el centro?', en:'There\'s a jam on the motorway. Shall I go through town?' } },
          { wer:'lerner', z:'Ist das denn schneller?', na:{ es:'¿Es más rápido por ahí?', en:'Is that actually faster?' } },
          { wer:'spikiu', z:'Bei dem Verkehr ja. Zehn Minuten weniger.', na:{ es:'Con este tráfico, sí. Diez minutos menos.', en:'With this traffic, yes. Ten minutes less.' } },
          { wer:'lerner', z:'Dann fahren Sie da lang. Bekomme ich am Ende eine Quittung?', na:{ es:'Entonces vaya por ahí. ¿Me da un recibo al final?', en:'Then go that way. Will I get a receipt at the end?' } }
        ]
      },
      lesetext: {
        z:'Morgens im Berufsverkehr will ein Fahrgast schnell zum Flughafen. Auf der Autobahn ist Stau, deshalb schlägt die Fahrerin den Weg durch die Stadt vor — zehn Minuten weniger. Am Ende bekommt der Fahrgast eine Quittung.',
        na:{ es:'Por la mañana, en hora punta, un pasajero quiere llegar rápido al aeropuerto. Hay atasco en la autopista, así que la taxista propone ir por el centro: diez minutos menos. Al final el pasajero recibe un recibo.', en:'In the morning rush a passenger wants to get to the airport fast. There\'s a jam on the motorway, so the driver suggests going through town — ten minutes less. At the end the passenger gets a receipt.' },
        frage:{ es:'¿Por qué van por el centro?', en:'Why do they go through town?' },
        optionen:[
          { na:{ es:'Hay atasco en la autopista', en:'There\'s a jam on the motorway' }, richtig:true },
          { na:{ es:'El centro es más bonito', en:'Town is prettier' }, richtig:false },
          { na:{ es:'El aeropuerto está cerrado', en:'The airport is closed' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Di adónde vas, que tienes prisa, y pide un recibo. Dos frases.', en:'Give your destination, say you are in a hurry, and ask for a receipt. Two sentences.' },
        muster:'Zum Bahnhof, bitte — ich bin in Eile. Bekomme ich am Ende eine Quittung?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'**Ist das schneller?** es una pregunta neutra. **Ist das denn schneller?** añade una duda cortés: „¿de verdad?". No cambia nada de la gramática y lo cambia todo del tono. Ningún diccionario lo explica; todo alemán lo oye.', en:'**Ist das schneller?** is a neutral question. **Ist das denn schneller?** adds polite scepticism — like English "is that actually faster?". It changes nothing grammatically and everything about the tone.' },
        beispiele:[
          { z:'Ist das denn schneller?', na:{ es:'¿De verdad es más rápido?', en:'Is that actually faster?' } },
          { z:'Was machst du denn hier?', na:{ es:'¿Y tú qué haces aquí?', en:'What are you doing here, then?' } }
        ]
      }
    },

    'a2.wegbeschreibung': {
      /* Eröffnung: grüßt, ohne Aufgabe 1 vorwegzunehmen. */
      eroeffnung: { z:'Suchen Sie etwas?', na:{ es:'¿Busca algo?', en:'Are you looking for something?' } },
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Ja, eine Viertelstunde. Sie können es nicht verfehlen, es ist ein großer Bau.', na:{ es:'Sí, un cuarto de hora. No tiene pérdida, es un edificio grande.', en:'Yes, a quarter of an hour. You can\'t miss it, it\'s a big building.' } },
      wortschatz: [
        { z:'die Ampel', na:{ es:'el semáforo', en:'the traffic light' } },
        { z:'überqueren', na:{ es:'cruzar', en:'to cross' } },
        { z:'der Kreisverkehr', na:{ es:'la rotonda', en:'the roundabout' } },
        { z:'gegenüber', na:{ es:'enfrente', en:'opposite' } },
        { z:'eine Viertelstunde', na:{ es:'un cuarto de hora', en:'a quarter of an hour' } },
        { z:'verfehlen', na:{ es:'no encontrar', en:'to miss' } },
        { z:'das Gebäude', na:{ es:'el edificio', en:'the building' } },
        { z:'der Fußgängerweg', na:{ es:'la acera', en:'the footpath' } },
        { z:'geradeaus', na:{ es:'todo recto', en:'straight ahead' } },
        { z:'abbiegen', na:{ es:'girar', en:'to turn off' } },
        { z:'entlang', na:{ es:'a lo largo de', en:'along' } },
        { z:'bis zur', na:{ es:'hasta', en:'as far as' } }
      ],
      dialog: {
        rolle: { es:'una transeúnte', en:'a passer-by' },
        zeilen: [
          { wer:'spikiu', z:'Suchen Sie etwas?', na:{ es:'¿Busca algo?', en:'Are you looking for something?' } },
          { wer:'lerner', z:'Entschuldigung, wie komme ich von hier zum Museum?', na:{ es:'Perdone, ¿cómo llego al museo desde aquí?', en:'Excuse me, how do I get to the museum from here?' } },
          { wer:'spikiu', z:'Gehen Sie bis zur Ampel und überqueren Sie die Straße.', na:{ es:'Siga hasta el semáforo y cruce la calle.', en:'Walk to the traffic light and cross the street.' } },
          { wer:'lerner', z:'Und wie geht es dann weiter?', na:{ es:'¿Y después cómo sigo?', en:'And how do I go on from there?' } },
          { wer:'spikiu', z:'Am Kreisverkehr rechts. Es liegt gegenüber vom Park.', na:{ es:'En la rotonda a la derecha. Está enfrente del parque.', en:'Right at the roundabout. It\'s opposite the park.' } },
          { wer:'lerner', z:'Kann man zu Fuß hingehen?', na:{ es:'¿Se puede ir a pie?', en:'Can you walk there?' } }
        ]
      },
      lesetext: {
        z:'Ein Besucher sucht das Museum. Er soll bis zur Ampel gehen und die Straße überqueren. Danach geht es am Kreisverkehr rechts. Das Museum liegt gegenüber vom Park, eine Viertelstunde zu Fuß.',
        na:{ es:'Un visitante busca el museo. Tiene que ir hasta el semáforo y cruzar la calle. Después, a la derecha en la rotonda. El museo está enfrente del parque, a un cuarto de hora a pie.', en:'A visitor is looking for the museum. He should walk to the traffic light and cross the street. Then right at the roundabout. The museum is opposite the park, a quarter of an hour on foot.' },
        frage:{ es:'¿Dónde está el museo?', en:'Where is the museum?' },
        optionen:[
          { na:{ es:'Enfrente del parque', en:'Opposite the park' }, richtig:true },
          { na:{ es:'Al lado del semáforo', en:'Next to the traffic light' }, richtig:false },
          { na:{ es:'En la estación', en:'At the station' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta cómo llegar a la estación y si se puede ir a pie. Dos frases.', en:'Ask the way to the station and whether you can walk there. Two sentences.' },
        muster:'Wie komme ich von hier zum Bahnhof? Kann man zu Fuß hingehen?'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'En las indicaciones el alemán encadena palabritas fijas: **bis zur** Ampel, **am** Kreisverkehr, **gegenüber vom** Park. Cada una se aprende entera, como un bloque — buscar la regla detrás cuesta meses y no ayuda a llegar al museo.', en:'German directions run on fixed little chunks: **bis zur** Ampel, **am** Kreisverkehr, **gegenüber vom** Park. Learn each one whole, as a block — hunting for the rule behind them takes months and will not get you to the museum.' },
        beispiele:[
          { z:'bis zur Ampel', na:{ es:'hasta el semáforo', en:'as far as the traffic light' } },
          { z:'gegenüber vom Park', na:{ es:'enfrente del parque', en:'opposite the park' } }
        ]
      }
    },

    'a2.wetter': {
      /* Abrundung: Spikius Reaktion NACH der dritten Aufgabe (R6). */
      abrundung: { z:'Gute Idee. Ich hole dich um zwei ab — bis Samstag!', na:{ es:'Buena idea. Te recojo a las dos. ¡Hasta el sábado!', en:'Good idea. I\'ll pick you up at two — see you Saturday!' } },
      wortschatz: [
        { z:'die Vorhersage', na:{ es:'el pronóstico', en:'the forecast' } },
        { z:'aufklaren', na:{ es:'despejar', en:'to clear up' } },
        { z:'sonnig', na:{ es:'soleado', en:'sunny' } },
        { z:'bewölkt', na:{ es:'nublado', en:'cloudy' } },
        { z:'der Schauer', na:{ es:'el chubasco', en:'the shower' } },
        { z:'die Jacke', na:{ es:'la chaqueta', en:'the jacket' } },
        { z:'sicherheitshalber', na:{ es:'por si acaso', en:'just in case' } },
        { z:'abholen', na:{ es:'recoger', en:'to pick up' } },
        { z:'der See', na:{ es:'el lago', en:'the lake' } },
        { z:'vormittags', na:{ es:'por la mañana', en:'in the morning' } },
        { z:'nachmittags', na:{ es:'por la tarde', en:'in the afternoon' } },
        { z:'wohl', na:{ es:'seguramente', en:'probably' } }
      ],
      dialog: {
        rolle: { es:'una amiga', en:'a friend' },
        zeilen: [
          { wer:'spikiu', z:'Wollen wir am Samstag an den See fahren?', na:{ es:'¿Vamos al lago el sábado?', en:'Shall we go to the lake on Saturday?' } },
          { wer:'lerner', z:'Kommt aufs Wetter an. Hast du die Vorhersage gesehen?', na:{ es:'Depende del tiempo. ¿Has visto el pronóstico?', en:'Depends on the weather. Have you seen the forecast?' } },
          { wer:'spikiu', z:'Vormittags soll es regnen.', na:{ es:'Dicen que va a llover por la mañana.', en:'They say it\'ll rain in the morning.' } },
          { wer:'lerner', z:'Und am Nachmittag?', na:{ es:'¿Y por la tarde?', en:'And in the afternoon?' } },
          { wer:'spikiu', z:'Da klart es wohl auf. Soll sonnig werden.', na:{ es:'Seguramente mejora. Estará despejado.', en:'It should clear up then. Supposed to be sunny.' } },
          { wer:'lerner', z:'Dann fahren wir nachmittags. Ich nehme sicherheitshalber eine Jacke mit.', na:{ es:'Entonces vamos por la tarde. Llevo una chaqueta por si acaso.', en:'Then let\'s go in the afternoon. I\'ll bring a jacket just in case.' } }
        ]
      },
      lesetext: {
        z:'Zwei Freundinnen wollen am Samstag an den See fahren. Vormittags soll es regnen, am Nachmittag klart es wohl auf. Deshalb fahren sie erst nachmittags und nehmen sicherheitshalber eine Jacke mit. Abgeholt wird um zwei.',
        na:{ es:'Dos amigas quieren ir al lago el sábado. Por la mañana dicen que va a llover; por la tarde seguramente despeja. Por eso van por la tarde y se llevan una chaqueta por si acaso. La recogida es a las dos.', en:'Two friends want to go to the lake on Saturday. It\'s supposed to rain in the morning; in the afternoon it\'ll probably clear up. So they\'re going in the afternoon and taking a jacket just in case. Pick-up is at two.' },
        frage:{ es:'¿Cuándo van?', en:'When are they going?' },
        optionen:[
          { na:{ es:'Por la tarde', en:'In the afternoon' }, richtig:true },
          { na:{ es:'Por la mañana', en:'In the morning' }, richtig:false },
          { na:{ es:'El domingo', en:'On Sunday' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ es:'Pregunta por el pronóstico y propón algo para la tarde. Dos frases.', en:'Ask about the forecast and suggest something for the afternoon. Two sentences.' },
        muster:'Hast du die Vorhersage gesehen? Dann fahren wir doch nachmittags.'
      },
      grammatik: {
        titel:{ es:'Gramática, directo al grano', en:'Simple Grammar for you' },
        text:{ es:'Para el tiempo el alemán no dice „va a llover" sino **es soll regnen** — literalmente „debe llover", es decir: eso dicen. Y **wohl** marca lo probable: „Da klart es **wohl** auf." Dos palabritas para decir „no lo sé seguro", que es justo lo que pasa con el tiempo.', en:'For weather German does not say "it will rain" but **es soll regnen** — "it is supposed to rain", i.e. that is what they say. And **wohl** marks a guess: "Da klart es **wohl** auf." Two little words for "I am not certain", which is exactly the truth about weather.' },
        beispiele:[
          { z:'Es soll regnen.', na:{ es:'Dicen que va a llover.', en:'It\'s supposed to rain.' } },
          { z:'Da klart es wohl auf.', na:{ es:'Seguramente despeja.', en:'It should clear up then.' } }
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
