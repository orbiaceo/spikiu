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
     na = Muttersprachen als Objekt { de, en }
   Ein spanischer Inhalt bedient den deutschen UND den englischen Lerner.
   Bei vier Zielsprachen ist das der Unterschied zwischen 20 und 60 Dateien.

   Spanisch: español neutro (mexikanische Färbung). NIE voseo/rioplatense.
   Stand: 18.08.2026 — A1 vollständig, A2 folgt.
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  /* ── Die Spalten des Baums ────────────────────────────────────────── */
  var THEMEN = [
    { id:'cafe',            em:'☕',  na:{ de:'Im Café',             en:'At the café' } },
    { id:'restaurant',      em:'🍽️', na:{ de:'Im Restaurant',       en:'At the restaurant' } },
    { id:'einkaufen',       em:'🛒', na:{ de:'Einkaufen',           en:'Shopping' } },
    { id:'wegbeschreibung', em:'🧭', na:{ de:'Nach dem Weg fragen', en:'Asking directions' } },
    { id:'taxi',            em:'🚕', na:{ de:'Im Taxi',             en:'In the taxi' } },
    { id:'familie',         em:'👪', na:{ de:'Über die Familie',    en:'About family' } },
    { id:'hotel',           em:'🏨', na:{ de:'Im Hotel',            en:'At the hotel' } },
    { id:'bahnhof',         em:'🚉', na:{ de:'Am Bahnhof',          en:'At the station' } },
    { id:'arzt',            em:'🩺', na:{ de:'Beim Arzt',           en:'At the doctor' } },
    { id:'wetter',          em:'🌤️', na:{ de:'Über das Wetter',     en:'About the weather' } }
  ];

  var STUFEN = ['a1', 'a2'];

  /* Dasselbe Thema, andere Handlung je Stufe. */
  var SCHRITT = {
    cafe:            { a1:{ de:'bestellen, bezahlen',        en:'ordering, paying' },
                       a2:{ de:'reklamieren, nach Zutaten fragen', en:'complaining, asking about ingredients' } },
    restaurant:      { a1:{ de:'ein Tisch, die Karte',       en:'a table, the menu' },
                       a2:{ de:'empfehlen lassen, teilen, Trinkgeld', en:'recommendations, sharing, tipping' } },
    einkaufen:       { a1:{ de:'Mengen, Preise',             en:'quantities, prices' },
                       a2:{ de:'umtauschen, Größen, Rabatt', en:'exchanging, sizes, discounts' } },
    wegbeschreibung: { a1:{ de:'wo ist …?',                  en:'where is …?' },
                       a2:{ de:'eine Route erklären',        en:'explaining a route' } },
    taxi:            { a1:{ de:'Ziel nennen, zahlen',        en:'naming a destination, paying' },
                       a2:{ de:'Umweg, Wartezeit, Quittung', en:'detours, waiting, receipts' } },
    familie:         { a1:{ de:'wer gehört dazu',            en:'who belongs to it' },
                       a2:{ de:'erzählen, was früher war',   en:'telling what used to be' } },
    hotel:           { a1:{ de:'einchecken',                 en:'checking in' },
                       a2:{ de:'ein Zimmerproblem melden',   en:'reporting a room problem' } },
    bahnhof:         { a1:{ de:'Fahrkarte, Gleis',           en:'ticket, platform' },
                       a2:{ de:'Verspätung, Umsteigen',      en:'delays, changing trains' } },
    arzt:            { a1:{ de:'wo tut es weh',              en:'where it hurts' },
                       a2:{ de:'Vorgeschichte, Medikamente', en:'history, medication' } },
    wetter:          { a1:{ de:'wie ist es heute',           en:'how it is today' },
                       a2:{ de:'Pläne vom Wetter abhängig machen', en:'planning around the weather' } }
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
      wortschatz: [
        { z:'el café',     na:{ de:'der Kaffee',      en:'coffee' } },
        { z:'el té',       na:{ de:'der Tee',         en:'tea' } },
        { z:'el agua',     na:{ de:'das Wasser',      en:'water' } },
        { z:'la leche',    na:{ de:'die Milch',       en:'milk' } },
        { z:'el azúcar',   na:{ de:'der Zucker',      en:'sugar' } },
        { z:'un vaso',     na:{ de:'ein Glas',        en:'a glass' } },
        { z:'la taza',     na:{ de:'die Tasse',       en:'the cup' } },
        { z:'la cuenta',   na:{ de:'die Rechnung',    en:'the bill' } },
        { z:'por favor',   na:{ de:'bitte',           en:'please' } },
        { z:'gracias',     na:{ de:'danke',           en:'thank you' } },
        { z:'quiero',      na:{ de:'ich möchte',      en:'I want' } },
        { z:'¿cuánto es?', na:{ de:'was kostet das?', en:'how much is it?' } }
      ],
      dialog: {
        rolle: { de:'Der Kellner', en:'The waiter' },
        zeilen: [
          { wer:'spikiu', z:'¡Buenos días! ¿Qué le pongo?', na:{ de:'Guten Tag! Was darf ich Ihnen bringen?', en:'Good morning! What can I get you?' } },
          { wer:'lerner', z:'Un café, por favor.', na:{ de:'Einen Kaffee, bitte.', en:'A coffee, please.' } },
          { wer:'spikiu', z:'¿Con leche o solo?', na:{ de:'Mit Milch oder schwarz?', en:'With milk or black?' } },
          { wer:'lerner', z:'Con leche, gracias.', na:{ de:'Mit Milch, danke.', en:'With milk, thank you.' } },
          { wer:'spikiu', z:'Enseguida. ¿Algo más?', na:{ de:'Sofort. Sonst noch etwas?', en:'Right away. Anything else?' } },
          { wer:'lerner', z:'No, gracias. La cuenta, por favor.', na:{ de:'Nein, danke. Die Rechnung, bitte.', en:'No, thanks. The bill, please.' } }
        ]
      },
      lesetext: {
        z:'María entra en el café. Pide un café con leche y un vaso de agua. El café cuesta dos euros. María paga con cinco euros. El camarero le da tres euros.',
        na:{ de:'María betritt das Café. Sie bestellt einen Milchkaffee und ein Glas Wasser. Der Kaffee kostet zwei Euro. María zahlt mit fünf Euro. Der Kellner gibt ihr drei Euro zurück.',
             en:'María walks into the café. She orders a coffee with milk and a glass of water. The coffee costs two euros. María pays with five euros. The waiter gives her three euros back.' },
        frage:{ de:'Wie viel bekommt María zurück?', en:'How much change does María get?' },
        optionen:[
          { na:{ de:'Zwei Euro', en:'Two euros' },  richtig:false },
          { na:{ de:'Drei Euro', en:'Three euros' },richtig:true  },
          { na:{ de:'Fünf Euro', en:'Five euros' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Bestelle einen Tee mit Zucker und frage nach der Rechnung. Zwei Sätze.',
                  en:'Order a tea with sugar and ask for the bill. Two sentences.' },
        muster:'Un té con azúcar, por favor. La cuenta, por favor.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„Un" und „una" heißen beide „ein". Welches, hängt am Wort: un café, una taza. Man lernt es mit dem Wort zusammen, nicht als Regel.',
               en:'"Un" and "una" both mean "a". Which one depends on the word: un café, una taza. Learn it together with the word, not as a rule.' },
        beispiele:[
          { z:'un café',  na:{ de:'ein Kaffee', en:'a coffee' } },
          { z:'una taza', na:{ de:'eine Tasse', en:'a cup' } }
        ]
      }
    },

    /* ── A1 · Im Restaurant ─────────────────────────────────────────── */
    'a1.restaurant': {
      wortschatz: [
        { z:'la mesa',        na:{ de:'der Tisch',        en:'the table' } },
        { z:'la carta',       na:{ de:'die Speisekarte',  en:'the menu' } },
        { z:'el plato',       na:{ de:'der Teller',       en:'the plate' } },
        { z:'la sopa',        na:{ de:'die Suppe',        en:'the soup' } },
        { z:'el pollo',       na:{ de:'das Hähnchen',     en:'chicken' } },
        { z:'el pescado',     na:{ de:'der Fisch',        en:'fish' } },
        { z:'la ensalada',    na:{ de:'der Salat',        en:'the salad' } },
        { z:'el pan',         na:{ de:'das Brot',         en:'bread' } },
        { z:'para dos',       na:{ de:'für zwei',         en:'for two' } },
        { z:'tengo hambre',   na:{ de:'ich habe Hunger',  en:'I am hungry' } },
        { z:'está rico',      na:{ de:'es schmeckt gut',  en:'it tastes good' } },
        { z:'¿qué recomienda?', na:{ de:'was empfehlen Sie?', en:'what do you recommend?' } }
      ],
      dialog: {
        rolle: { de:'Die Kellnerin', en:'The waitress' },
        zeilen: [
          { wer:'spikiu', z:'Buenas noches. ¿Mesa para cuántos?', na:{ de:'Guten Abend. Ein Tisch für wie viele?', en:'Good evening. A table for how many?' } },
          { wer:'lerner', z:'Para dos, por favor.', na:{ de:'Für zwei, bitte.', en:'For two, please.' } },
          { wer:'spikiu', z:'Aquí tiene la carta.', na:{ de:'Hier ist die Speisekarte.', en:'Here is the menu.' } },
          { wer:'lerner', z:'Gracias. ¿Qué recomienda?', na:{ de:'Danke. Was empfehlen Sie?', en:'Thank you. What do you recommend?' } },
          { wer:'spikiu', z:'El pescado está muy rico hoy.', na:{ de:'Der Fisch ist heute sehr gut.', en:'The fish is very good today.' } },
          { wer:'lerner', z:'Entonces pescado y una ensalada.', na:{ de:'Dann Fisch und einen Salat.', en:'Then fish and a salad.' } }
        ]
      },
      lesetext: {
        z:'Pedro llega al restaurante a las ocho. Pide una sopa y pollo con ensalada. No quiere pescado. Con la comida bebe agua. Al final pide la cuenta.',
        na:{ de:'Pedro kommt um acht im Restaurant an. Er bestellt eine Suppe und Hähnchen mit Salat. Fisch möchte er nicht. Zum Essen trinkt er Wasser. Am Ende bittet er um die Rechnung.',
             en:'Pedro arrives at the restaurant at eight. He orders a soup and chicken with salad. He does not want fish. He drinks water with the meal. At the end he asks for the bill.' },
        frage:{ de:'Was bestellt Pedro NICHT?', en:'What does Pedro NOT order?' },
        optionen:[
          { na:{ de:'Die Suppe', en:'The soup' },   richtig:false },
          { na:{ de:'Den Fisch', en:'The fish' },   richtig:true  },
          { na:{ de:'Den Salat', en:'The salad' },  richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frage nach einem Tisch für drei Personen und bitte um die Karte. Zwei Sätze.',
                  en:'Ask for a table for three and request the menu. Two sentences.' },
        muster:'Una mesa para tres, por favor. ¿Me trae la carta?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„Para" heißt „für", wenn es um den Empfänger geht: para dos, para mí. Es ist eines der ersten Wörter, die man wirklich braucht.',
               en:'"Para" means "for" when it points at a recipient: para dos, para mí. One of the first words you actually need.' },
        beispiele:[
          { z:'una mesa para dos', na:{ de:'ein Tisch für zwei', en:'a table for two' } },
          { z:'un café para mí',   na:{ de:'ein Kaffee für mich', en:'a coffee for me' } }
        ]
      }
    },

    /* ── A1 · Einkaufen ─────────────────────────────────────────────── */
    'a1.einkaufen': {
      wortschatz: [
        { z:'la tienda',     na:{ de:'der Laden',        en:'the shop' } },
        { z:'el mercado',    na:{ de:'der Markt',        en:'the market' } },
        { z:'un kilo',       na:{ de:'ein Kilo',         en:'a kilo' } },
        { z:'medio kilo',    na:{ de:'ein halbes Kilo',  en:'half a kilo' } },
        { z:'la manzana',    na:{ de:'der Apfel',        en:'the apple' } },
        { z:'el tomate',     na:{ de:'die Tomate',       en:'the tomato' } },
        { z:'el queso',      na:{ de:'der Käse',         en:'cheese' } },
        { z:'barato',        na:{ de:'billig',           en:'cheap' } },
        { z:'caro',          na:{ de:'teuer',            en:'expensive' } },
        { z:'¿cuánto vale?', na:{ de:'was kostet es?',   en:'how much is it?' } },
        { z:'nada más',      na:{ de:'sonst nichts',     en:'nothing else' } },
        { z:'el cambio',     na:{ de:'das Wechselgeld',  en:'the change' } }
      ],
      dialog: {
        rolle: { de:'Die Verkäuferin', en:'The shopkeeper' },
        zeilen: [
          { wer:'spikiu', z:'¡Buenos días! ¿Qué le doy?', na:{ de:'Guten Tag! Was darf es sein?', en:'Good morning! What can I get you?' } },
          { wer:'lerner', z:'Un kilo de manzanas, por favor.', na:{ de:'Ein Kilo Äpfel, bitte.', en:'A kilo of apples, please.' } },
          { wer:'spikiu', z:'Aquí tiene. ¿Algo más?', na:{ de:'Hier bitte. Sonst noch etwas?', en:'Here you are. Anything else?' } },
          { wer:'lerner', z:'Medio kilo de queso. ¿Cuánto vale?', na:{ de:'Ein halbes Kilo Käse. Was kostet das?', en:'Half a kilo of cheese. How much is it?' } },
          { wer:'spikiu', z:'Son seis euros en total.', na:{ de:'Das macht sechs Euro zusammen.', en:'That is six euros in total.' } },
          { wer:'lerner', z:'Aquí tiene diez. Gracias.', na:{ de:'Hier sind zehn. Danke.', en:'Here is ten. Thank you.' } }
        ]
      },
      lesetext: {
        z:'Ana va al mercado los sábados. Hoy compra tomates y queso. Los tomates están baratos. El queso es caro, pero Ana lo compra igual. Paga ocho euros.',
        na:{ de:'Ana geht samstags auf den Markt. Heute kauft sie Tomaten und Käse. Die Tomaten sind billig. Der Käse ist teuer, aber Ana kauft ihn trotzdem. Sie zahlt acht Euro.',
             en:'Ana goes to the market on Saturdays. Today she buys tomatoes and cheese. The tomatoes are cheap. The cheese is expensive, but Ana buys it anyway. She pays eight euros.' },
        frage:{ de:'Was ist teuer?', en:'What is expensive?' },
        optionen:[
          { na:{ de:'Die Tomaten', en:'The tomatoes' }, richtig:false },
          { na:{ de:'Der Käse',    en:'The cheese' },   richtig:true  },
          { na:{ de:'Beides',      en:'Both' },         richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Kaufe ein Kilo Tomaten und frage nach dem Preis. Zwei Sätze.',
                  en:'Buy a kilo of tomatoes and ask for the price. Two sentences.' },
        muster:'Un kilo de tomates, por favor. ¿Cuánto vale?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Mengen brauchen „de": un kilo DE manzanas, un vaso DE agua. Im Deutschen steht da nichts — im Spanischen immer.',
               en:'Quantities need "de": un kilo DE manzanas, un vaso DE agua. English drops it; Spanish never does.' },
        beispiele:[
          { z:'un kilo de queso',  na:{ de:'ein Kilo Käse',  en:'a kilo of cheese' } },
          { z:'un vaso de agua',   na:{ de:'ein Glas Wasser', en:'a glass of water' } }
        ]
      }
    },

    /* ── A1 · Nach dem Weg fragen ───────────────────────────────────── */
    'a1.wegbeschreibung': {
      wortschatz: [
        { z:'la calle',        na:{ de:'die Straße',      en:'the street' } },
        { z:'la plaza',        na:{ de:'der Platz',       en:'the square' } },
        { z:'la esquina',      na:{ de:'die Ecke',        en:'the corner' } },
        { z:'a la derecha',    na:{ de:'nach rechts',     en:'to the right' } },
        { z:'a la izquierda',  na:{ de:'nach links',      en:'to the left' } },
        { z:'todo recto',      na:{ de:'geradeaus',       en:'straight ahead' } },
        { z:'cerca',           na:{ de:'nah',             en:'near' } },
        { z:'lejos',           na:{ de:'weit',            en:'far' } },
        { z:'¿dónde está?',    na:{ de:'wo ist?',         en:'where is?' } },
        { z:'aquí',            na:{ de:'hier',            en:'here' } },
        { z:'allí',            na:{ de:'dort',            en:'there' } },
        { z:'perdone',         na:{ de:'entschuldigen Sie', en:'excuse me' } }
      ],
      dialog: {
        rolle: { de:'Eine Passantin', en:'A passer-by' },
        zeilen: [
          { wer:'lerner', z:'Perdone, ¿dónde está la plaza?', na:{ de:'Entschuldigen Sie, wo ist der Platz?', en:'Excuse me, where is the square?' } },
          { wer:'spikiu', z:'Está cerca. Todo recto y a la derecha.', na:{ de:'Er ist nah. Geradeaus und dann rechts.', en:'It is close. Straight ahead and then right.' } },
          { wer:'lerner', z:'¿Está lejos?', na:{ de:'Ist es weit?', en:'Is it far?' } },
          { wer:'spikiu', z:'No, cinco minutos.', na:{ de:'Nein, fünf Minuten.', en:'No, five minutes.' } },
          { wer:'lerner', z:'Muchas gracias.', na:{ de:'Vielen Dank.', en:'Thank you very much.' } },
          { wer:'spikiu', z:'De nada. ¡Buen día!', na:{ de:'Gern geschehen. Schönen Tag!', en:'You are welcome. Have a good day!' } }
        ]
      },
      lesetext: {
        z:'El hotel está en la calle Mayor. Desde la estación vas todo recto. En la esquina giras a la izquierda. El hotel está allí, muy cerca de la plaza.',
        na:{ de:'Das Hotel ist in der Calle Mayor. Vom Bahnhof gehst du geradeaus. An der Ecke biegst du links ab. Das Hotel ist dort, ganz nah am Platz.',
             en:'The hotel is on Calle Mayor. From the station you go straight ahead. At the corner you turn left. The hotel is there, very close to the square.' },
        frage:{ de:'Wohin biegt man an der Ecke ab?', en:'Which way do you turn at the corner?' },
        optionen:[
          { na:{ de:'Nach rechts', en:'Right' },        richtig:false },
          { na:{ de:'Nach links',  en:'Left' },         richtig:true  },
          { na:{ de:'Geradeaus',   en:'Straight on' },  richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frage höflich, wo der Bahnhof ist, und ob er weit ist. Zwei Sätze.',
                  en:'Politely ask where the station is and whether it is far. Two sentences.' },
        muster:'Perdone, ¿dónde está la estación? ¿Está lejos?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„Está" sagt, WO etwas ist oder WIE es gerade ist. Für einen Ort nimmt man immer está, nie es.',
               en:'"Está" tells you WHERE something is or HOW it is right now. For a location always use está, never es.' },
        beispiele:[
          { z:'¿Dónde está el hotel?', na:{ de:'Wo ist das Hotel?', en:'Where is the hotel?' } },
          { z:'Está cerca.',           na:{ de:'Es ist nah.',       en:'It is close.' } }
        ]
      }
    },

    /* ── A1 · Im Taxi ───────────────────────────────────────────────── */
    'a1.taxi': {
      wortschatz: [
        { z:'el taxi',          na:{ de:'das Taxi',        en:'the taxi' } },
        { z:'el aeropuerto',    na:{ de:'der Flughafen',   en:'the airport' } },
        { z:'el centro',        na:{ de:'die Innenstadt',  en:'the city centre' } },
        { z:'la maleta',        na:{ de:'der Koffer',      en:'the suitcase' } },
        { z:'¿está libre?',     na:{ de:'sind Sie frei?',  en:'are you free?' } },
        { z:'lléveme a',        na:{ de:'bringen Sie mich zu', en:'take me to' } },
        { z:'aquí está bien',   na:{ de:'hier ist gut',    en:'here is fine' } },
        { z:'pare aquí',        na:{ de:'halten Sie hier', en:'stop here' } },
        { z:'la dirección',     na:{ de:'die Adresse',     en:'the address' } },
        { z:'rápido',           na:{ de:'schnell',         en:'fast' } },
        { z:'despacio',         na:{ de:'langsam',         en:'slow' } },
        { z:'quédese el cambio',na:{ de:'behalten Sie das Wechselgeld', en:'keep the change' } }
      ],
      dialog: {
        rolle: { de:'Der Taxifahrer', en:'The taxi driver' },
        zeilen: [
          { wer:'lerner', z:'¿Está libre?', na:{ de:'Sind Sie frei?', en:'Are you free?' } },
          { wer:'spikiu', z:'Sí, suba. ¿A dónde vamos?', na:{ de:'Ja, steigen Sie ein. Wohin geht es?', en:'Yes, get in. Where are we going?' } },
          { wer:'lerner', z:'Al aeropuerto, por favor.', na:{ de:'Zum Flughafen, bitte.', en:'To the airport, please.' } },
          { wer:'spikiu', z:'Muy bien. ¿Lleva maletas?', na:{ de:'Sehr gut. Haben Sie Koffer dabei?', en:'Very good. Do you have suitcases?' } },
          { wer:'lerner', z:'Sí, una maleta.', na:{ de:'Ja, einen Koffer.', en:'Yes, one suitcase.' } },
          { wer:'spikiu', z:'Perfecto. Son veinte euros.', na:{ de:'Perfekt. Das macht zwanzig Euro.', en:'Perfect. That is twenty euros.' } }
        ]
      },
      lesetext: {
        z:'Luis toma un taxi en el centro. Va al aeropuerto con dos maletas. El viaje dura media hora. Al final paga veinticinco euros y dice: quédese el cambio.',
        na:{ de:'Luis nimmt in der Innenstadt ein Taxi. Er fährt mit zwei Koffern zum Flughafen. Die Fahrt dauert eine halbe Stunde. Am Ende zahlt er fünfundzwanzig Euro und sagt: Behalten Sie das Wechselgeld.',
             en:'Luis takes a taxi in the city centre. He goes to the airport with two suitcases. The trip takes half an hour. At the end he pays twenty-five euros and says: keep the change.' },
        frage:{ de:'Wie viele Koffer hat Luis?', en:'How many suitcases does Luis have?' },
        optionen:[
          { na:{ de:'Einen',  en:'One' },   richtig:false },
          { na:{ de:'Zwei',   en:'Two' },   richtig:true  },
          { na:{ de:'Keinen', en:'None' },  richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frage, ob das Taxi frei ist, und nenne die Innenstadt als Ziel. Zwei Sätze.',
                  en:'Ask if the taxi is free and name the city centre as your destination. Two sentences.' },
        muster:'¿Está libre? Al centro, por favor.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„A" plus „el" wird immer zu „al": al aeropuerto, al centro. Das ist keine Wahl, das passiert automatisch.',
               en:'"A" plus "el" always becomes "al": al aeropuerto, al centro. Not a choice — it just happens.' },
        beispiele:[
          { z:'al aeropuerto', na:{ de:'zum Flughafen',   en:'to the airport' } },
          { z:'a la plaza',    na:{ de:'zum Platz',       en:'to the square' } }
        ]
      }
    },

    /* ── A1 · Über die Familie ──────────────────────────────────────── */
    'a1.familie': {
      wortschatz: [
        { z:'la familia',   na:{ de:'die Familie',    en:'the family' } },
        { z:'la madre',     na:{ de:'die Mutter',     en:'the mother' } },
        { z:'el padre',     na:{ de:'der Vater',      en:'the father' } },
        { z:'el hermano',   na:{ de:'der Bruder',     en:'the brother' } },
        { z:'la hermana',   na:{ de:'die Schwester',  en:'the sister' } },
        { z:'el hijo',      na:{ de:'der Sohn',       en:'the son' } },
        { z:'la hija',      na:{ de:'die Tochter',    en:'the daughter' } },
        { z:'el abuelo',    na:{ de:'der Großvater',  en:'the grandfather' } },
        { z:'mi',           na:{ de:'mein / meine',   en:'my' } },
        { z:'tengo',        na:{ de:'ich habe',       en:'I have' } },
        { z:'se llama',     na:{ de:'er/sie heißt',   en:'his/her name is' } },
        { z:'años',         na:{ de:'Jahre',          en:'years' } }
      ],
      dialog: {
        rolle: { de:'Eine Nachbarin', en:'A neighbour' },
        zeilen: [
          { wer:'spikiu', z:'¿Tienes hermanos?', na:{ de:'Hast du Geschwister?', en:'Do you have siblings?' } },
          { wer:'lerner', z:'Sí, tengo una hermana.', na:{ de:'Ja, ich habe eine Schwester.', en:'Yes, I have a sister.' } },
          { wer:'spikiu', z:'¿Cómo se llama?', na:{ de:'Wie heißt sie?', en:'What is her name?' } },
          { wer:'lerner', z:'Se llama Clara.', na:{ de:'Sie heißt Clara.', en:'Her name is Clara.' } },
          { wer:'spikiu', z:'¿Y cuántos años tiene?', na:{ de:'Und wie alt ist sie?', en:'And how old is she?' } },
          { wer:'lerner', z:'Tiene doce años.', na:{ de:'Sie ist zwölf Jahre alt.', en:'She is twelve years old.' } }
        ]
      },
      lesetext: {
        z:'La familia de Carmen es pequeña. Vive con su madre y su hermano. Su padre vive en otra ciudad. El abuelo viene los domingos y come con ellos.',
        na:{ de:'Carmens Familie ist klein. Sie lebt mit ihrer Mutter und ihrem Bruder. Ihr Vater lebt in einer anderen Stadt. Der Großvater kommt sonntags und isst mit ihnen.',
             en:'Carmen has a small family. She lives with her mother and her brother. Her father lives in another city. The grandfather comes on Sundays and eats with them.' },
        frage:{ de:'Wer kommt sonntags?', en:'Who comes on Sundays?' },
        optionen:[
          { na:{ de:'Der Vater',      en:'The father' },      richtig:false },
          { na:{ de:'Der Großvater',  en:'The grandfather' }, richtig:true  },
          { na:{ de:'Der Bruder',     en:'The brother' },     richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du einen Bruder hast, wie er heißt und wie alt er ist. Zwei Sätze.',
                  en:'Say that you have a brother, his name and his age. Two sentences.' },
        muster:'Tengo un hermano. Se llama Pablo y tiene veinte años.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Alter hat man im Spanischen, man ist es nicht: tengo treinta años — ich HABE dreißig Jahre. Wer „soy treinta" sagt, wird nicht verstanden.',
               en:'In Spanish you HAVE your age, you are not it: tengo treinta años. Saying "soy treinta" will not be understood.' },
        beispiele:[
          { z:'Tengo treinta años.',  na:{ de:'Ich bin dreißig.',  en:'I am thirty.' } },
          { z:'¿Cuántos años tienes?',na:{ de:'Wie alt bist du?',  en:'How old are you?' } }
        ]
      }
    },

    /* ── A1 · Im Hotel ──────────────────────────────────────────────── */
    'a1.hotel': {
      wortschatz: [
        { z:'la habitación',  na:{ de:'das Zimmer',       en:'the room' } },
        { z:'la reserva',     na:{ de:'die Reservierung', en:'the booking' } },
        { z:'la llave',       na:{ de:'der Schlüssel',    en:'the key' } },
        { z:'una noche',      na:{ de:'eine Nacht',       en:'one night' } },
        { z:'dos noches',     na:{ de:'zwei Nächte',      en:'two nights' } },
        { z:'el desayuno',    na:{ de:'das Frühstück',    en:'breakfast' } },
        { z:'el pasaporte',   na:{ de:'der Reisepass',    en:'the passport' } },
        { z:'la planta',      na:{ de:'die Etage',        en:'the floor' } },
        { z:'el ascensor',    na:{ de:'der Aufzug',       en:'the lift' } },
        { z:'a nombre de',    na:{ de:'auf den Namen',    en:'under the name of' } },
        { z:'incluido',       na:{ de:'inbegriffen',      en:'included' } },
        { z:'firme aquí',     na:{ de:'unterschreiben Sie hier', en:'sign here' } }
      ],
      dialog: {
        rolle: { de:'Die Empfangsdame', en:'The receptionist' },
        zeilen: [
          { wer:'spikiu', z:'Buenas tardes. ¿Tiene reserva?', na:{ de:'Guten Tag. Haben Sie eine Reservierung?', en:'Good afternoon. Do you have a booking?' } },
          { wer:'lerner', z:'Sí, a nombre de Weber.', na:{ de:'Ja, auf den Namen Weber.', en:'Yes, under the name Weber.' } },
          { wer:'spikiu', z:'Perfecto. Dos noches, ¿verdad?', na:{ de:'Perfekt. Zwei Nächte, richtig?', en:'Perfect. Two nights, correct?' } },
          { wer:'lerner', z:'Sí. ¿El desayuno está incluido?', na:{ de:'Ja. Ist das Frühstück inbegriffen?', en:'Yes. Is breakfast included?' } },
          { wer:'spikiu', z:'Sí, de siete a diez. Su llave.', na:{ de:'Ja, von sieben bis zehn. Ihr Schlüssel.', en:'Yes, from seven to ten. Your key.' } },
          { wer:'lerner', z:'Gracias. ¿Qué planta?', na:{ de:'Danke. Welche Etage?', en:'Thank you. Which floor?' } }
        ]
      },
      lesetext: {
        z:'El señor Weber llega al hotel por la tarde. Tiene una reserva para dos noches. Su habitación está en la tercera planta. El desayuno está incluido y empieza a las siete.',
        na:{ de:'Herr Weber kommt am Nachmittag im Hotel an. Er hat eine Reservierung für zwei Nächte. Sein Zimmer ist in der dritten Etage. Das Frühstück ist inbegriffen und beginnt um sieben.',
             en:'Mr Weber arrives at the hotel in the afternoon. He has a booking for two nights. His room is on the third floor. Breakfast is included and starts at seven.' },
        frage:{ de:'Wann beginnt das Frühstück?', en:'When does breakfast start?' },
        optionen:[
          { na:{ de:'Um sieben', en:'At seven' }, richtig:true  },
          { na:{ de:'Um zehn',   en:'At ten' },   richtig:false },
          { na:{ de:'Um drei',   en:'At three' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du eine Reservierung für eine Nacht hast, und frage nach dem Frühstück. Zwei Sätze.',
                  en:'Say you have a booking for one night and ask about breakfast. Two sentences.' },
        muster:'Tengo una reserva para una noche. ¿El desayuno está incluido?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Uhrzeiten bekommen „a las": a las siete, a las diez. Bei eins heißt es a la una — als einzige Ausnahme.',
               en:'Times take "a las": a las siete, a las diez. One o\'clock is the only exception: a la una.' },
        beispiele:[
          { z:'a las siete', na:{ de:'um sieben', en:'at seven' } },
          { z:'a la una',    na:{ de:'um eins',   en:'at one' } }
        ]
      }
    },

    /* ── A1 · Am Bahnhof ────────────────────────────────────────────── */
    'a1.bahnhof': {
      wortschatz: [
        { z:'la estación',    na:{ de:'der Bahnhof',      en:'the station' } },
        { z:'el tren',        na:{ de:'der Zug',          en:'the train' } },
        { z:'el billete',     na:{ de:'die Fahrkarte',    en:'the ticket' } },
        { z:'la vía',         na:{ de:'das Gleis',        en:'the platform' } },
        { z:'ida',            na:{ de:'Hinfahrt',         en:'one way' } },
        { z:'ida y vuelta',   na:{ de:'hin und zurück',   en:'return' } },
        { z:'sale',           na:{ de:'er fährt ab',      en:'it leaves' } },
        { z:'llega',          na:{ de:'er kommt an',      en:'it arrives' } },
        { z:'¿a qué hora?',   na:{ de:'um wie viel Uhr?', en:'at what time?' } },
        { z:'el andén',       na:{ de:'der Bahnsteig',    en:'the platform' } },
        { z:'próximo',        na:{ de:'nächster',         en:'next' } },
        { z:'el horario',     na:{ de:'der Fahrplan',     en:'the timetable' } }
      ],
      dialog: {
        rolle: { de:'Der Mann am Schalter', en:'The man at the counter' },
        zeilen: [
          { wer:'lerner', z:'Un billete para Madrid, por favor.', na:{ de:'Eine Fahrkarte nach Madrid, bitte.', en:'A ticket to Madrid, please.' } },
          { wer:'spikiu', z:'¿Ida o ida y vuelta?', na:{ de:'Einfach oder hin und zurück?', en:'One way or return?' } },
          { wer:'lerner', z:'Ida y vuelta. ¿A qué hora sale?', na:{ de:'Hin und zurück. Wann fährt er ab?', en:'Return. What time does it leave?' } },
          { wer:'spikiu', z:'El próximo sale a las nueve.', na:{ de:'Der nächste fährt um neun.', en:'The next one leaves at nine.' } },
          { wer:'lerner', z:'¿De qué vía?', na:{ de:'Von welchem Gleis?', en:'From which platform?' } },
          { wer:'spikiu', z:'Vía cuatro. Son treinta euros.', na:{ de:'Gleis vier. Das macht dreißig Euro.', en:'Platform four. That is thirty euros.' } }
        ]
      },
      lesetext: {
        z:'Sofía compra un billete de ida y vuelta a Sevilla. El tren sale a las nueve de la vía cuatro. Llega a las doce. Sofía espera en el andén con un café.',
        na:{ de:'Sofía kauft eine Hin- und Rückfahrkarte nach Sevilla. Der Zug fährt um neun von Gleis vier. Er kommt um zwölf an. Sofía wartet mit einem Kaffee auf dem Bahnsteig.',
             en:'Sofía buys a return ticket to Seville. The train leaves at nine from platform four. It arrives at twelve. Sofía waits on the platform with a coffee.' },
        frage:{ de:'Von welchem Gleis fährt der Zug?', en:'Which platform does the train leave from?' },
        optionen:[
          { na:{ de:'Gleis zwei',  en:'Platform two' },  richtig:false },
          { na:{ de:'Gleis vier',  en:'Platform four' }, richtig:true  },
          { na:{ de:'Gleis neun',  en:'Platform nine' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Kaufe eine einfache Fahrkarte nach Valencia und frage nach der Abfahrtszeit. Zwei Sätze.',
                  en:'Buy a one-way ticket to Valencia and ask about the departure time. Two sentences.' },
        muster:'Un billete de ida a Valencia, por favor. ¿A qué hora sale?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Fragewörter tragen immer einen Akzent: ¿qué?, ¿dónde?, ¿cuándo? Ohne Akzent bedeuten dieselben Wörter etwas ganz anderes.',
               en:'Question words always carry an accent: ¿qué?, ¿dónde?, ¿cuándo? Without it the same words mean something else entirely.' },
        beispiele:[
          { z:'¿A qué hora sale?', na:{ de:'Wann fährt er ab?',  en:'What time does it leave?' } },
          { z:'¿Dónde está la vía?', na:{ de:'Wo ist das Gleis?', en:'Where is the platform?' } }
        ]
      }
    },

    /* ── A1 · Beim Arzt ─────────────────────────────────────────────── */
    'a1.arzt': {
      wortschatz: [
        { z:'el médico',      na:{ de:'der Arzt',          en:'the doctor' } },
        { z:'me duele',       na:{ de:'mir tut weh',       en:'it hurts me' } },
        { z:'la cabeza',      na:{ de:'der Kopf',          en:'the head' } },
        { z:'el estómago',    na:{ de:'der Bauch',         en:'the stomach' } },
        { z:'la garganta',    na:{ de:'der Hals',          en:'the throat' } },
        { z:'la espalda',     na:{ de:'der Rücken',        en:'the back' } },
        { z:'la fiebre',      na:{ de:'das Fieber',        en:'fever' } },
        { z:'estoy enfermo',  na:{ de:'ich bin krank',     en:'I am ill' } },
        { z:'desde ayer',     na:{ de:'seit gestern',      en:'since yesterday' } },
        { z:'la pastilla',    na:{ de:'die Tablette',      en:'the pill' } },
        { z:'descansar',      na:{ de:'sich ausruhen',     en:'to rest' } },
        { z:'mejor',          na:{ de:'besser',            en:'better' } }
      ],
      dialog: {
        rolle: { de:'Die Ärztin', en:'The doctor' },
        zeilen: [
          { wer:'spikiu', z:'Buenos días. ¿Qué le pasa?', na:{ de:'Guten Tag. Was fehlt Ihnen?', en:'Good morning. What is the matter?' } },
          { wer:'lerner', z:'Me duele la cabeza.', na:{ de:'Mir tut der Kopf weh.', en:'My head hurts.' } },
          { wer:'spikiu', z:'¿Desde cuándo?', na:{ de:'Seit wann?', en:'Since when?' } },
          { wer:'lerner', z:'Desde ayer. Y tengo fiebre.', na:{ de:'Seit gestern. Und ich habe Fieber.', en:'Since yesterday. And I have a fever.' } },
          { wer:'spikiu', z:'Tome una pastilla y descanse.', na:{ de:'Nehmen Sie eine Tablette und ruhen Sie sich aus.', en:'Take a pill and rest.' } },
          { wer:'lerner', z:'Gracias, doctora.', na:{ de:'Danke, Frau Doktor.', en:'Thank you, doctor.' } }
        ]
      },
      lesetext: {
        z:'Tomás va al médico. Le duele la garganta desde el lunes. No tiene fiebre. La doctora dice que debe beber agua y descansar tres días.',
        na:{ de:'Tomás geht zum Arzt. Ihm tut seit Montag der Hals weh. Fieber hat er nicht. Die Ärztin sagt, er soll Wasser trinken und sich drei Tage ausruhen.',
             en:'Tomás goes to the doctor. His throat has hurt since Monday. He has no fever. The doctor says he should drink water and rest for three days.' },
        frage:{ de:'Was hat Tomás NICHT?', en:'What does Tomás NOT have?' },
        optionen:[
          { na:{ de:'Halsschmerzen', en:'A sore throat' }, richtig:false },
          { na:{ de:'Fieber',        en:'A fever' },       richtig:true  },
          { na:{ de:'Durst',         en:'Thirst' },        richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass dir der Bauch weh tut und seit wann. Zwei Sätze.',
                  en:'Say that your stomach hurts and since when. Two sentences.' },
        muster:'Me duele el estómago. Desde ayer por la noche.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Bei Schmerzen steht der Körperteil vorn, nicht die Person: me duele LA cabeza — nicht „mein Kopf". Man sagt der Kopf, nicht meiner.',
               en:'With pain, the body part leads and takes "the", not "my": me duele LA cabeza.' },
        beispiele:[
          { z:'Me duele la cabeza.',   na:{ de:'Mir tut der Kopf weh.',  en:'My head hurts.' } },
          { z:'Me duele la espalda.',  na:{ de:'Mir tut der Rücken weh.', en:'My back hurts.' } }
        ]
      }
    },

    /* ── A1 · Über das Wetter ───────────────────────────────────────── */
    'a1.wetter': {
      wortschatz: [
        { z:'el tiempo',      na:{ de:'das Wetter',      en:'the weather' } },
        { z:'hace sol',       na:{ de:'die Sonne scheint', en:'it is sunny' } },
        { z:'hace frío',      na:{ de:'es ist kalt',     en:'it is cold' } },
        { z:'hace calor',     na:{ de:'es ist warm',     en:'it is hot' } },
        { z:'llueve',         na:{ de:'es regnet',       en:'it is raining' } },
        { z:'la lluvia',      na:{ de:'der Regen',       en:'the rain' } },
        { z:'el viento',      na:{ de:'der Wind',        en:'the wind' } },
        { z:'la nube',        na:{ de:'die Wolke',       en:'the cloud' } },
        { z:'el paraguas',    na:{ de:'der Regenschirm', en:'the umbrella' } },
        { z:'hoy',            na:{ de:'heute',           en:'today' } },
        { z:'mañana',         na:{ de:'morgen',          en:'tomorrow' } },
        { z:'el grado',       na:{ de:'das Grad',        en:'the degree' } }
      ],
      dialog: {
        rolle: { de:'Ein Nachbar', en:'A neighbour' },
        zeilen: [
          { wer:'spikiu', z:'¡Qué buen tiempo hace hoy!', na:{ de:'Was für ein schönes Wetter heute!', en:'What lovely weather today!' } },
          { wer:'lerner', z:'Sí, hace sol y calor.', na:{ de:'Ja, die Sonne scheint und es ist warm.', en:'Yes, it is sunny and hot.' } },
          { wer:'spikiu', z:'¿Y mañana? ¿Sabes?', na:{ de:'Und morgen? Weißt du es?', en:'And tomorrow? Do you know?' } },
          { wer:'lerner', z:'Mañana llueve, creo.', na:{ de:'Morgen regnet es, glaube ich.', en:'Tomorrow it rains, I think.' } },
          { wer:'spikiu', z:'Entonces llevo el paraguas.', na:{ de:'Dann nehme ich den Regenschirm mit.', en:'Then I will take the umbrella.' } },
          { wer:'lerner', z:'Buena idea. Hasta mañana.', na:{ de:'Gute Idee. Bis morgen.', en:'Good idea. See you tomorrow.' } }
        ]
      },
      lesetext: {
        z:'Hoy hace sol en Valencia. Hay veinticinco grados. Mañana llega la lluvia y hace más frío. Julia lleva un paraguas en la mochila.',
        na:{ de:'Heute scheint in Valencia die Sonne. Es sind fünfundzwanzig Grad. Morgen kommt der Regen und es wird kälter. Julia hat einen Regenschirm im Rucksack.',
             en:'Today it is sunny in Valencia. It is twenty-five degrees. Tomorrow the rain arrives and it gets colder. Julia carries an umbrella in her backpack.' },
        frage:{ de:'Wie wird das Wetter morgen?', en:'What is the weather tomorrow?' },
        optionen:[
          { na:{ de:'Sonnig',        en:'Sunny' },   richtig:false },
          { na:{ de:'Regnerisch',    en:'Rainy' },   richtig:true  },
          { na:{ de:'Sehr warm',     en:'Very hot' },richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, wie das Wetter heute ist und wie es morgen wird. Zwei Sätze.',
                  en:'Say what the weather is like today and what it will be tomorrow. Two sentences.' },
        muster:'Hoy hace frío y viento. Mañana llueve.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Beim Wetter macht man es: hace sol, hace frío, hace calor. Nur beim Regen nicht — da heißt es einfach llueve.',
               en:'Weather uses "hace": hace sol, hace frío, hace calor. Rain is the exception: simply llueve.' },
        beispiele:[
          { z:'Hace frío.', na:{ de:'Es ist kalt.',  en:'It is cold.' } },
          { z:'Llueve.',    na:{ de:'Es regnet.',    en:'It is raining.' } }
        ]
      }
    }
  };

  /* ── Öffentliche Fläche ───────────────────────────────────────────── */
  raum.SpikiuLernpfad = {
    themen: THEMEN,
    stufen: STUFEN,
    schritt: SCHRITT,
    stationen: STATIONEN,

    /* Eine Station holen. Gibt null zurück, wenn noch kein Inhalt da ist —
       die Oberfläche zeigt sie dann als „noch leer", statt zu erfinden. */
    station: function (stufe, thema) {
      return STATIONEN[stufe + '.' + thema] || null;
    },

    /* Gefüllt oder leer? Der Baum färbt danach. */
    gefuellt: function (stufe, thema) {
      return !!STATIONEN[stufe + '.' + thema];
    },

    /* Alle Wörter einer Station, flach — für das Gym. */
    woerter: function (stufe, thema) {
      var s = STATIONEN[stufe + '.' + thema];
      return s ? s.wortschatz.slice() : [];
    }
  };

})(typeof window !== 'undefined' ? window : this);
