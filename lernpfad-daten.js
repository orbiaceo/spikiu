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
   Stand: 18.08.2026 — A1 und A2 vollständig (Spanisch).
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

  /* ── Die Gruppen ──────────────────────────────────────────────────────
     Zwei Ebenen statt einer langen Liste. Bei 10 Stationen kostet das
     einen Tipp; bei 20 (A1+A2) oder 40 (bis B2) hält es die Auswahl kurz.
     Jedes Thema liegt in genau einer Gruppe — geprüft, keine Dopplung. */
  var KATEGORIEN = [
    { id:'essen',     em:'🍽️', na:{ de:'Essen & Trinken', en:'Food & Drink' },
      themen:['cafe','restaurant'] },
    { id:'unterwegs', em:'🧳', na:{ de:'Unterwegs',       en:'Getting around' },
      themen:['wegbeschreibung','taxi','bahnhof','hotel'] },
    { id:'alltag',    em:'🛒', na:{ de:'Alltag',          en:'Everyday life' },
      themen:['einkaufen','wetter'] },
    { id:'menschen',  em:'👥', na:{ de:'Menschen',        en:'People' },
      themen:['familie','arzt'] }
  ];

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
    },

    /* ══════════════════════════════════════════════════════════════════
       STATIONEN — A2
       Gleicher Bauplan, gleiche Themen, andere Handlung: nicht mehr
       bestellen, sondern reklamieren; nicht mehr benennen, sondern
       erzählen. Die Vergangenheit kommt hier zum ersten Mal vor.
       ══════════════════════════════════════════════════════════════════ */

    /* ── A2 · Im Café ───────────────────────────────────────────────── */
    'a2.cafe': {
      wortschatz: [
        { z:'está frío',        na:{ de:'es ist kalt (Speise)', en:'it is cold (food)' } },
        { z:'lo siento',        na:{ de:'es tut mir leid',      en:'I am sorry' } },
        { z:'disculpe',         na:{ de:'entschuldigen Sie',    en:'excuse me' } },
        { z:'lleva',            na:{ de:'es enthält',           en:'it contains' } },
        { z:'sin lactosa',      na:{ de:'ohne Laktose',         en:'lactose-free' } },
        { z:'soy alérgico',     na:{ de:'ich bin allergisch',   en:'I am allergic' } },
        { z:'el frutos secos',  na:{ de:'die Nüsse',            en:'nuts' } },
        { z:'cambiar',          na:{ de:'tauschen',             en:'to change' } },
        { z:'otra vez',         na:{ de:'noch einmal',          en:'again' } },
        { z:'me lo trae',       na:{ de:'bringen Sie es mir',   en:'bring it to me' } },
        { z:'no pasa nada',     na:{ de:'kein Problem',         en:'no problem' } },
        { z:'pedí',             na:{ de:'ich habe bestellt',    en:'I ordered' } }
      ],
      dialog: {
        rolle: { de:'Der Kellner', en:'The waiter' },
        zeilen: [
          { wer:'lerner', z:'Disculpe, el café está frío.', na:{ de:'Entschuldigen Sie, der Kaffee ist kalt.', en:'Excuse me, the coffee is cold.' } },
          { wer:'spikiu', z:'Lo siento mucho. Se lo cambio ahora mismo.', na:{ de:'Das tut mir sehr leid. Ich tausche ihn sofort.', en:'I am very sorry. I will change it right away.' } },
          { wer:'lerner', z:'Gracias. Una cosa más: ¿el pastel lleva frutos secos?', na:{ de:'Danke. Noch etwas: sind in dem Kuchen Nüsse?', en:'Thank you. One more thing: does the cake contain nuts?' } },
          { wer:'spikiu', z:'Ese sí. Pero el de limón no lleva nada.', na:{ de:'Der schon. Aber der Zitronenkuchen enthält nichts davon.', en:'That one does. But the lemon one has none.' } },
          { wer:'lerner', z:'Perfecto, soy alérgico. Entonces el de limón.', na:{ de:'Perfekt, ich bin allergisch. Dann den Zitronenkuchen.', en:'Perfect, I am allergic. Then the lemon one.' } },
          { wer:'spikiu', z:'Muy bien. Enseguida se lo traigo.', na:{ de:'Sehr gut. Ich bringe ihn Ihnen sofort.', en:'Very good. I will bring it right away.' } }
        ]
      },
      lesetext: {
        z:'Elena pidió un café con leche sin lactosa. El camarero le trajo uno normal. Elena se lo dijo con calma y él lo cambió enseguida. Al final no le cobró el café.',
        na:{ de:'Elena bestellte einen Milchkaffee ohne Laktose. Der Kellner brachte ihr einen normalen. Elena sagte es ihm ruhig, und er tauschte ihn sofort. Am Ende berechnete er ihr den Kaffee nicht.',
             en:'Elena ordered a coffee with lactose-free milk. The waiter brought her a normal one. Elena told him calmly and he changed it right away. In the end he did not charge her for the coffee.' },
        frage:{ de:'Was tat der Kellner am Ende?', en:'What did the waiter do in the end?' },
        optionen:[
          { na:{ de:'Er berechnete den Kaffee nicht', en:'He did not charge for the coffee' }, richtig:true  },
          { na:{ de:'Er brachte einen Tee',           en:'He brought a tea' },                 richtig:false },
          { na:{ de:'Er sagte nichts',                en:'He said nothing' },                  richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag höflich, dass dein Tee kalt ist, und frage, ob der Kuchen Milch enthält. Zwei Sätze.',
                  en:'Politely say your tea is cold and ask whether the cake contains milk. Two sentences.' },
        muster:'Disculpe, el té está frío. ¿El pastel lleva leche?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„Ser" und „estar" heißen beide „sein". Estar sagt, wie etwas GERADE ist: el café está frío. Ser sagt, was etwas IMMER ist: el café es bueno.',
               en:'"Ser" and "estar" both mean "to be". Estar is how something is RIGHT NOW: el café está frío. Ser is what it always is: el café es bueno.' },
        beispiele:[
          { z:'El café está frío.', na:{ de:'Der Kaffee ist kalt (jetzt).', en:'The coffee is cold (right now).' } },
          { z:'El café es bueno.',  na:{ de:'Der Kaffee ist gut (immer).',  en:'The coffee is good (always).' } }
        ]
      }
    },

    /* ── A2 · Im Restaurant ─────────────────────────────────────────── */
    'a2.restaurant': {
      wortschatz: [
        { z:'la especialidad',  na:{ de:'die Spezialität',    en:'the speciality' } },
        { z:'el primero',       na:{ de:'die Vorspeise',      en:'the starter' } },
        { z:'el segundo',       na:{ de:'der Hauptgang',      en:'the main course' } },
        { z:'el postre',        na:{ de:'die Nachspeise',     en:'the dessert' } },
        { z:'compartir',        na:{ de:'teilen',             en:'to share' } },
        { z:'la propina',       na:{ de:'das Trinkgeld',      en:'the tip' } },
        { z:'picante',          na:{ de:'scharf',             en:'spicy' } },
        { z:'ligero',           na:{ de:'leicht',             en:'light' } },
        { z:'nos trae',         na:{ de:'bringen Sie uns',    en:'bring us' } },
        { z:'estaba buenísimo', na:{ de:'es war ausgezeichnet', en:'it was excellent' } },
        { z:'por separado',     na:{ de:'getrennt',           en:'separately' } },
        { z:'la tarjeta',       na:{ de:'die Karte (zum Zahlen)', en:'the card' } }
      ],
      dialog: {
        rolle: { de:'Die Kellnerin', en:'The waitress' },
        zeilen: [
          { wer:'lerner', z:'¿Cuál es la especialidad de la casa?', na:{ de:'Was ist die Spezialität des Hauses?', en:'What is the house speciality?' } },
          { wer:'spikiu', z:'El cochinito. Es picante, pero muy rico.', na:{ de:'Das Spanferkel. Es ist scharf, aber sehr gut.', en:'The suckling pig. It is spicy, but very good.' } },
          { wer:'lerner', z:'¿Hay algo más ligero? Queremos compartir.', na:{ de:'Gibt es etwas Leichteres? Wir möchten teilen.', en:'Is there something lighter? We want to share.' } },
          { wer:'spikiu', z:'Entonces el pescado con verduras. Alcanza para dos.', na:{ de:'Dann der Fisch mit Gemüse. Der reicht für zwei.', en:'Then the fish with vegetables. It is enough for two.' } },
          { wer:'lerner', z:'Perfecto. Y después, ¿nos trae la cuenta por separado?', na:{ de:'Perfekt. Und danach: Bringen Sie uns die Rechnung getrennt?', en:'Perfect. And afterwards, could you bring us separate bills?' } },
          { wer:'spikiu', z:'Claro que sí. ¿Pagan con tarjeta?', na:{ de:'Selbstverständlich. Zahlen Sie mit Karte?', en:'Of course. Are you paying by card?' } }
        ]
      },
      lesetext: {
        z:'Ayer cenamos en un restaurante pequeño del centro. Compartimos un pescado con verduras porque el plato de la casa era muy picante. De postre pedimos flan. Estaba buenísimo y dejamos propina.',
        na:{ de:'Gestern haben wir in einem kleinen Restaurant im Zentrum gegessen. Wir teilten einen Fisch mit Gemüse, weil das Hausgericht sehr scharf war. Als Nachspeise bestellten wir Flan. Er war ausgezeichnet, und wir gaben Trinkgeld.',
             en:'Yesterday we had dinner at a small restaurant in the centre. We shared a fish with vegetables because the house dish was very spicy. For dessert we ordered flan. It was excellent, and we left a tip.' },
        frage:{ de:'Warum teilten sie den Fisch?', en:'Why did they share the fish?' },
        optionen:[
          { na:{ de:'Er war billiger',            en:'It was cheaper' },           richtig:false },
          { na:{ de:'Das Hausgericht war scharf', en:'The house dish was spicy' }, richtig:true  },
          { na:{ de:'Es gab nichts anderes',      en:'There was nothing else' },   richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Frage nach der Spezialität und sag, dass ihr teilen möchtet. Zwei Sätze.',
                  en:'Ask about the speciality and say that you want to share. Two sentences.' },
        muster:'¿Cuál es la especialidad de la casa? Queremos compartir un plato.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Für Erlebtes gibt es eine eigene Form: cenamos, compartimos, pedimos. Sie endet oft auf -amos oder -imos und heißt: wir haben das gemacht, es ist vorbei.',
               en:'Finished experiences get their own form: cenamos, compartimos, pedimos. It usually ends in -amos or -imos and means: we did it, it is over.' },
        beispiele:[
          { z:'Ayer cenamos aquí.',   na:{ de:'Gestern haben wir hier gegessen.', en:'Yesterday we ate here.' } },
          { z:'Pedimos el pescado.',  na:{ de:'Wir bestellten den Fisch.',        en:'We ordered the fish.' } }
        ]
      }
    },

    /* ── A2 · Einkaufen ─────────────────────────────────────────────── */
    'a2.einkaufen': {
      wortschatz: [
        { z:'cambiar',        na:{ de:'umtauschen',        en:'to exchange' } },
        { z:'devolver',       na:{ de:'zurückgeben',       en:'to return' } },
        { z:'el recibo',      na:{ de:'der Kassenbon',     en:'the receipt' } },
        { z:'la talla',       na:{ de:'die Größe',         en:'the size' } },
        { z:'me queda grande',na:{ de:'es ist mir zu groß',en:'it is too big for me' } },
        { z:'me queda bien',  na:{ de:'es passt mir',      en:'it fits me' } },
        { z:'probarme',       na:{ de:'anprobieren',       en:'to try on' } },
        { z:'el probador',    na:{ de:'die Umkleide',      en:'the fitting room' } },
        { z:'la rebaja',      na:{ de:'der Rabatt',        en:'the discount' } },
        { z:'está roto',      na:{ de:'es ist kaputt',     en:'it is broken' } },
        { z:'otro color',     na:{ de:'eine andere Farbe', en:'another colour' } },
        { z:'lo compré',      na:{ de:'ich habe es gekauft', en:'I bought it' } }
      ],
      dialog: {
        rolle: { de:'Der Verkäufer', en:'The shop assistant' },
        zeilen: [
          { wer:'lerner', z:'Compré esta camisa ayer, pero me queda grande.', na:{ de:'Ich habe dieses Hemd gestern gekauft, aber es ist mir zu groß.', en:'I bought this shirt yesterday, but it is too big for me.' } },
          { wer:'spikiu', z:'¿Trae el recibo?', na:{ de:'Haben Sie den Kassenbon dabei?', en:'Do you have the receipt?' } },
          { wer:'lerner', z:'Sí, aquí está. ¿Puedo cambiarla?', na:{ de:'Ja, hier ist er. Kann ich es umtauschen?', en:'Yes, here it is. Can I exchange it?' } },
          { wer:'spikiu', z:'Claro. ¿Qué talla necesita?', na:{ de:'Klar. Welche Größe brauchen Sie?', en:'Of course. What size do you need?' } },
          { wer:'lerner', z:'Una menos. ¿Me la puedo probar?', na:{ de:'Eine kleiner. Kann ich es anprobieren?', en:'One smaller. May I try it on?' } },
          { wer:'spikiu', z:'Por supuesto. El probador está al fondo.', na:{ de:'Selbstverständlich. Die Umkleide ist hinten.', en:'Of course. The fitting room is at the back.' } }
        ]
      },
      lesetext: {
        z:'Marta compró unos zapatos la semana pasada. En casa vio que uno estaba roto. Volvió a la tienda con el recibo. No tenían otro par de esa talla, así que le devolvieron el dinero.',
        na:{ de:'Marta kaufte letzte Woche Schuhe. Zu Hause sah sie, dass einer kaputt war. Sie ging mit dem Kassenbon in den Laden zurück. Sie hatten kein zweites Paar in der Größe, also gaben sie ihr das Geld zurück.',
             en:'Marta bought some shoes last week. At home she saw that one was broken. She went back to the shop with the receipt. They had no other pair in that size, so they gave her the money back.' },
        frage:{ de:'Warum bekam Marta ihr Geld zurück?', en:'Why did Marta get her money back?' },
        optionen:[
          { na:{ de:'Sie wollte eine andere Farbe',   en:'She wanted another colour' },       richtig:false },
          { na:{ de:'Die Größe war nicht mehr da',    en:'The size was not available' },      richtig:true  },
          { na:{ de:'Sie hatte keinen Kassenbon',     en:'She had no receipt' },              richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du die Hose gestern gekauft hast und sie umtauschen möchtest. Zwei Sätze.',
                  en:'Say you bought the trousers yesterday and want to exchange them. Two sentences.' },
        muster:'Compré este pantalón ayer. Me queda grande, ¿puedo cambiarlo?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„Quedar" sagt, wie Kleidung sitzt: me queda grande, me queda bien. Wörtlich heißt es „es bleibt mir" — das muss man nicht verstehen, nur benutzen.',
               en:'"Quedar" describes how clothes fit: me queda grande, me queda bien. Literally "it remains to me" — no need to understand it, just use it.' },
        beispiele:[
          { z:'Me queda grande.', na:{ de:'Es ist mir zu groß.', en:'It is too big for me.' } },
          { z:'Te queda bien.',   na:{ de:'Es passt dir gut.',   en:'It suits you.' } }
        ]
      }
    },

    /* ── A2 · Nach dem Weg fragen ───────────────────────────────────── */
    'a2.wegbeschreibung': {
      wortschatz: [
        { z:'siga',            na:{ de:'gehen Sie weiter',   en:'carry on' } },
        { z:'gire',            na:{ de:'biegen Sie ab',      en:'turn' } },
        { z:'cruce',           na:{ de:'überqueren Sie',     en:'cross' } },
        { z:'el semáforo',     na:{ de:'die Ampel',          en:'the traffic light' } },
        { z:'la rotonda',      na:{ de:'der Kreisverkehr',   en:'the roundabout' } },
        { z:'la parada',       na:{ de:'die Haltestelle',    en:'the stop' } },
        { z:'hasta',           na:{ de:'bis zu',             en:'as far as' } },
        { z:'enfrente de',     na:{ de:'gegenüber von',      en:'opposite' } },
        { z:'al lado de',      na:{ de:'neben',              en:'next to' } },
        { z:'detrás de',       na:{ de:'hinter',             en:'behind' } },
        { z:'a pie',           na:{ de:'zu Fuß',             en:'on foot' } },
        { z:'se pasa',         na:{ de:'man verpasst',       en:'you miss' } }
      ],
      dialog: {
        rolle: { de:'Ein älterer Herr', en:'An older gentleman' },
        zeilen: [
          { wer:'lerner', z:'Perdone, ¿cómo llego al museo desde aquí?', na:{ de:'Entschuldigen Sie, wie komme ich von hier zum Museum?', en:'Excuse me, how do I get to the museum from here?' } },
          { wer:'spikiu', z:'Siga hasta el semáforo y cruce la calle.', na:{ de:'Gehen Sie bis zur Ampel und überqueren Sie die Straße.', en:'Carry on to the traffic light and cross the street.' } },
          { wer:'lerner', z:'¿Y después?', na:{ de:'Und dann?', en:'And then?' } },
          { wer:'spikiu', z:'En la rotonda gire a la derecha. Está enfrente del parque.', na:{ de:'Am Kreisverkehr biegen Sie rechts ab. Es liegt gegenüber vom Park.', en:'At the roundabout turn right. It is opposite the park.' } },
          { wer:'lerner', z:'¿Se puede ir a pie?', na:{ de:'Kann man zu Fuß gehen?', en:'Can I walk there?' } },
          { wer:'spikiu', z:'Sí, quince minutos. No se pasa, es un edificio grande.', na:{ de:'Ja, fünfzehn Minuten. Sie verpassen es nicht, es ist ein großes Gebäude.', en:'Yes, fifteen minutes. You cannot miss it, it is a big building.' } }
        ]
      },
      lesetext: {
        z:'Para llegar a la biblioteca, sal de la estación y sigue hasta la rotonda. Allí gira a la izquierda. La biblioteca está al lado de una farmacia, enfrente de la parada del autobús.',
        na:{ de:'Um zur Bibliothek zu kommen, verlasse den Bahnhof und geh bis zum Kreisverkehr. Dort biege links ab. Die Bibliothek liegt neben einer Apotheke, gegenüber der Bushaltestelle.',
             en:'To get to the library, leave the station and carry on to the roundabout. Turn left there. The library is next to a pharmacy, opposite the bus stop.' },
        frage:{ de:'Was liegt neben der Bibliothek?', en:'What is next to the library?' },
        optionen:[
          { na:{ de:'Eine Apotheke',      en:'A pharmacy' },  richtig:true  },
          { na:{ de:'Die Bushaltestelle', en:'The bus stop' },richtig:false },
          { na:{ de:'Der Bahnhof',        en:'The station' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erkläre jemandem den Weg: geradeaus bis zur Ampel, dann links. Zwei Sätze.',
                  en:'Explain the way to someone: straight on to the traffic light, then left. Two sentences.' },
        muster:'Siga todo recto hasta el semáforo. Allí gire a la izquierda.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Wegbeschreibungen benutzen die Sie-Befehlsform: siga, gire, cruce. Sie endet auf -e, wo das Verb sonst auf -a endet — deshalb klingt sie ungewohnt.',
               en:'Directions use the polite command form: siga, gire, cruce. It ends in -e where the verb normally ends in -a, which is why it sounds unfamiliar.' },
        beispiele:[
          { z:'Siga todo recto.',   na:{ de:'Gehen Sie geradeaus.',  en:'Carry straight on.' } },
          { z:'Gire a la derecha.', na:{ de:'Biegen Sie rechts ab.', en:'Turn right.' } }
        ]
      }
    },

    /* ── A2 · Im Taxi ───────────────────────────────────────────────── */
    'a2.taxi': {
      wortschatz: [
        { z:'el tráfico',      na:{ de:'der Verkehr',        en:'the traffic' } },
        { z:'el atasco',       na:{ de:'der Stau',           en:'the traffic jam' } },
        { z:'dar la vuelta',   na:{ de:'wenden',             en:'to turn around' } },
        { z:'el desvío',       na:{ de:'die Umleitung',      en:'the detour' } },
        { z:'esperar',         na:{ de:'warten',             en:'to wait' } },
        { z:'un momento',      na:{ de:'einen Moment',       en:'a moment' } },
        { z:'el recibo',       na:{ de:'die Quittung',       en:'the receipt' } },
        { z:'tengo prisa',     na:{ de:'ich habe es eilig',  en:'I am in a hurry' } },
        { z:'llego tarde',     na:{ de:'ich komme zu spät',  en:'I am running late' } },
        { z:'por aquí',        na:{ de:'hier entlang',       en:'this way' } },
        { z:'es más rápido',   na:{ de:'es geht schneller',  en:'it is faster' } },
        { z:'me deja aquí',    na:{ de:'lassen Sie mich hier raus', en:'drop me here' } }
      ],
      dialog: {
        rolle: { de:'Der Taxifahrer', en:'The taxi driver' },
        zeilen: [
          { wer:'lerner', z:'Al aeropuerto, por favor. Tengo prisa.', na:{ de:'Zum Flughafen, bitte. Ich habe es eilig.', en:'To the airport, please. I am in a hurry.' } },
          { wer:'spikiu', z:'Hay un atasco en la autopista. ¿Voy por el centro?', na:{ de:'Auf der Autobahn ist ein Stau. Soll ich durchs Zentrum fahren?', en:'There is a jam on the motorway. Shall I go through the centre?' } },
          { wer:'lerner', z:'¿Es más rápido por ahí?', na:{ de:'Geht es da schneller?', en:'Is it faster that way?' } },
          { wer:'spikiu', z:'Con este tráfico, sí. Diez minutos menos.', na:{ de:'Bei diesem Verkehr ja. Zehn Minuten weniger.', en:'With this traffic, yes. Ten minutes less.' } },
          { wer:'lerner', z:'Entonces por ahí. ¿Me da un recibo al final?', na:{ de:'Dann da entlang. Geben Sie mir am Ende eine Quittung?', en:'Then that way. Could you give me a receipt at the end?' } },
          { wer:'spikiu', z:'Sin problema. Llegamos a tiempo.', na:{ de:'Kein Problem. Wir kommen rechtzeitig an.', en:'No problem. We will arrive on time.' } }
        ]
      },
      lesetext: {
        z:'Andrés tomó un taxi porque llegaba tarde. Había mucho tráfico y el taxista dio la vuelta para evitar el atasco. Llegaron a tiempo. Andrés pidió un recibo para la empresa.',
        na:{ de:'Andrés nahm ein Taxi, weil er zu spät dran war. Es war viel Verkehr, und der Fahrer wendete, um den Stau zu umfahren. Sie kamen rechtzeitig an. Andrés bat für die Firma um eine Quittung.',
             en:'Andrés took a taxi because he was running late. There was heavy traffic and the driver turned around to avoid the jam. They arrived on time. Andrés asked for a receipt for his company.' },
        frage:{ de:'Warum wendete der Fahrer?', en:'Why did the driver turn around?' },
        optionen:[
          { na:{ de:'Wegen des Staus',        en:'Because of the jam' },      richtig:true  },
          { na:{ de:'Er kannte den Weg nicht',en:'He did not know the way' }, richtig:false },
          { na:{ de:'Andrés wollte es',       en:'Andrés asked him to' },     richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du es eilig hast, und frage nach einer Quittung. Zwei Sätze.',
                  en:'Say that you are in a hurry and ask for a receipt. Two sentences.' },
        muster:'Tengo prisa, llego tarde. ¿Me da un recibo, por favor?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„Había" heißt „es gab" und ändert sich nie — egal ob eins oder hundert: había un atasco, había muchos coches. Eine Form für alles.',
               en:'"Había" means "there was/were" and never changes — one or a hundred: había un atasco, había muchos coches. One form for everything.' },
        beispiele:[
          { z:'Había mucho tráfico.', na:{ de:'Es war viel Verkehr.', en:'There was a lot of traffic.' } },
          { z:'Había un atasco.',     na:{ de:'Es gab einen Stau.',   en:'There was a traffic jam.' } }
        ]
      }
    },

    /* ── A2 · Über die Familie ──────────────────────────────────────── */
    'a2.familie': {
      wortschatz: [
        { z:'cuando era niño', na:{ de:'als ich klein war',  en:'when I was a child' } },
        { z:'vivíamos',        na:{ de:'wir wohnten',        en:'we used to live' } },
        { z:'el pueblo',       na:{ de:'das Dorf',           en:'the village' } },
        { z:'los primos',      na:{ de:'die Cousins',        en:'the cousins' } },
        { z:'la tía',          na:{ de:'die Tante',          en:'the aunt' } },
        { z:'el tío',          na:{ de:'der Onkel',          en:'the uncle' } },
        { z:'nos reuníamos',   na:{ de:'wir trafen uns',     en:'we used to gather' } },
        { z:'la boda',         na:{ de:'die Hochzeit',       en:'the wedding' } },
        { z:'se mudó',         na:{ de:'er/sie zog um',      en:'he/she moved' } },
        { z:'echar de menos',  na:{ de:'vermissen',          en:'to miss' } },
        { z:'antes',           na:{ de:'früher',             en:'before' } },
        { z:'ahora',           na:{ de:'jetzt',              en:'now' } }
      ],
      dialog: {
        rolle: { de:'Eine Kollegin', en:'A colleague' },
        zeilen: [
          { wer:'spikiu', z:'¿Dónde vivías cuando eras niño?', na:{ de:'Wo hast du gewohnt, als du klein warst?', en:'Where did you live when you were a child?' } },
          { wer:'lerner', z:'Vivíamos en un pueblo pequeño.', na:{ de:'Wir wohnten in einem kleinen Dorf.', en:'We lived in a small village.' } },
          { wer:'spikiu', z:'¿Y toda la familia estaba allí?', na:{ de:'Und war die ganze Familie dort?', en:'And was the whole family there?' } },
          { wer:'lerner', z:'Sí. Los domingos nos reuníamos en casa de mi tía.', na:{ de:'Ja. Sonntags trafen wir uns bei meiner Tante.', en:'Yes. On Sundays we gathered at my aunt\u2019s house.' } },
          { wer:'spikiu', z:'Qué bonito. ¿Siguen allí?', na:{ de:'Wie schön. Sind sie noch dort?', en:'How lovely. Are they still there?' } },
          { wer:'lerner', z:'No, mi hermana se mudó. La echo de menos.', na:{ de:'Nein, meine Schwester ist umgezogen. Ich vermisse sie.', en:'No, my sister moved away. I miss her.' } }
        ]
      },
      lesetext: {
        z:'Antes la familia de Rosa vivía toda en el mismo pueblo. Los domingos comían juntos en casa de la abuela. Ahora los primos trabajan en otras ciudades y solo se ven en las bodas.',
        na:{ de:'Früher wohnte Rosas Familie ganz im selben Dorf. Sonntags aßen sie zusammen bei der Großmutter. Jetzt arbeiten die Cousins in anderen Städten und sehen sich nur noch auf Hochzeiten.',
             en:'Rosa\u2019s family all used to live in the same village. On Sundays they ate together at their grandmother\u2019s. Now the cousins work in other cities and only see each other at weddings.' },
        frage:{ de:'Wann sehen sich die Cousins heute?', en:'When do the cousins see each other now?' },
        optionen:[
          { na:{ de:'Jeden Sonntag',   en:'Every Sunday' },   richtig:false },
          { na:{ de:'Auf Hochzeiten',  en:'At weddings' },    richtig:true  },
          { na:{ de:'Im Dorf',         en:'In the village' }, richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Erzähle, wo du als Kind gewohnt hast und wen ihr sonntags getroffen habt. Zwei Sätze.',
                  en:'Tell where you lived as a child and who you used to meet on Sundays. Two sentences.' },
        muster:'Cuando era niño vivíamos en una ciudad pequeña. Los domingos comíamos con mis abuelos.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Für Gewohnheiten von früher gibt es eine eigene Form: vivíamos, comíamos, era. Sie heißt nicht „einmal passiert", sondern „immer wieder, damals".',
               en:'Past habits get their own form: vivíamos, comíamos, era. It does not mean "happened once" but "again and again, back then".' },
        beispiele:[
          { z:'Vivíamos en el pueblo.', na:{ de:'Wir wohnten (damals) im Dorf.', en:'We used to live in the village.' } },
          { z:'Cuando era niño …',      na:{ de:'Als ich klein war …',          en:'When I was a child …' } }
        ]
      }
    },

    /* ── A2 · Im Hotel ──────────────────────────────────────────────── */
    'a2.hotel': {
      wortschatz: [
        { z:'no funciona',     na:{ de:'es funktioniert nicht', en:'it does not work' } },
        { z:'la calefacción',  na:{ de:'die Heizung',           en:'the heating' } },
        { z:'el aire',         na:{ de:'die Klimaanlage',       en:'the air conditioning' } },
        { z:'la ducha',        na:{ de:'die Dusche',            en:'the shower' } },
        { z:'el agua caliente',na:{ de:'das warme Wasser',      en:'hot water' } },
        { z:'la toalla',       na:{ de:'das Handtuch',          en:'the towel' } },
        { z:'hace ruido',      na:{ de:'es macht Lärm',         en:'it is noisy' } },
        { z:'cambiar de habitación', na:{ de:'das Zimmer wechseln', en:'to change rooms' } },
        { z:'la limpieza',     na:{ de:'die Reinigung',         en:'the cleaning' } },
        { z:'lo arreglamos',   na:{ de:'wir bringen es in Ordnung', en:'we will fix it' } },
        { z:'la queja',        na:{ de:'die Beschwerde',        en:'the complaint' } },
        { z:'anoche',          na:{ de:'gestern Nacht',         en:'last night' } }
      ],
      dialog: {
        rolle: { de:'Der Empfangschef', en:'The front desk manager' },
        zeilen: [
          { wer:'lerner', z:'Buenos días. La calefacción de mi habitación no funciona.', na:{ de:'Guten Morgen. Die Heizung in meinem Zimmer funktioniert nicht.', en:'Good morning. The heating in my room does not work.' } },
          { wer:'spikiu', z:'Lo siento mucho. ¿Desde cuándo?', na:{ de:'Das tut mir sehr leid. Seit wann?', en:'I am very sorry. Since when?' } },
          { wer:'lerner', z:'Desde anoche. Y no hay agua caliente.', na:{ de:'Seit gestern Nacht. Und es gibt kein warmes Wasser.', en:'Since last night. And there is no hot water.' } },
          { wer:'spikiu', z:'Enviamos a alguien ahora mismo. ¿O prefiere cambiar de habitación?', na:{ de:'Wir schicken sofort jemanden. Oder möchten Sie lieber das Zimmer wechseln?', en:'We will send someone right away. Or would you rather change rooms?' } },
          { wer:'lerner', z:'Prefiero cambiar, si es posible.', na:{ de:'Ich würde lieber wechseln, wenn es möglich ist.', en:'I would rather change, if possible.' } },
          { wer:'spikiu', z:'Por supuesto. Le doy la 305, es más tranquila.', na:{ de:'Selbstverständlich. Ich gebe Ihnen die 305, sie ist ruhiger.', en:'Of course. I will give you 305, it is quieter.' } }
        ]
      },
      lesetext: {
        z:'Cuando llegamos al hotel, la habitación estaba fría y la ducha no funcionaba. Hablamos con recepción y nos cambiaron enseguida. La nueva habitación era más tranquila y no daba a la calle.',
        na:{ de:'Als wir im Hotel ankamen, war das Zimmer kalt und die Dusche funktionierte nicht. Wir sprachen mit der Rezeption, und man wechselte uns sofort. Das neue Zimmer war ruhiger und ging nicht zur Straße hinaus.',
             en:'When we arrived at the hotel, the room was cold and the shower did not work. We spoke to reception and they moved us right away. The new room was quieter and did not face the street.' },
        frage:{ de:'Was war am neuen Zimmer besser?', en:'What was better about the new room?' },
        optionen:[
          { na:{ de:'Es war größer',            en:'It was bigger' },              richtig:false },
          { na:{ de:'Es war ruhiger',           en:'It was quieter' },             richtig:true  },
          { na:{ de:'Es hatte einen Balkon',    en:'It had a balcony' },           richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Melde, dass die Klimaanlage nicht funktioniert, und bitte um ein anderes Zimmer. Zwei Sätze.',
                  en:'Report that the air conditioning does not work and ask for another room. Two sentences.' },
        muster:'El aire no funciona desde anoche. ¿Puedo cambiar de habitación?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„Desde" heißt „seit" und braucht immer einen Zeitpunkt: desde anoche, desde el lunes. Für eine Dauer nimmt man stattdessen desde hace: desde hace dos días.',
               en:'"Desde" means "since" and needs a point in time: desde anoche, desde el lunes. For a duration use desde hace: desde hace dos días.' },
        beispiele:[
          { z:'Desde anoche.',        na:{ de:'Seit gestern Nacht.', en:'Since last night.' } },
          { z:'Desde hace dos días.', na:{ de:'Seit zwei Tagen.',    en:'For two days.' } }
        ]
      }
    },

    /* ── A2 · Am Bahnhof ────────────────────────────────────────────── */
    'a2.bahnhof': {
      wortschatz: [
        { z:'el retraso',      na:{ de:'die Verspätung',      en:'the delay' } },
        { z:'lleva retraso',   na:{ de:'er hat Verspätung',   en:'it is delayed' } },
        { z:'hacer transbordo',na:{ de:'umsteigen',           en:'to change trains' } },
        { z:'perder el tren',  na:{ de:'den Zug verpassen',   en:'to miss the train' } },
        { z:'el enlace',       na:{ de:'der Anschluss',       en:'the connection' } },
        { z:'el asiento',      na:{ de:'der Sitzplatz',       en:'the seat' } },
        { z:'reservado',       na:{ de:'reserviert',          en:'reserved' } },
        { z:'el vagón',        na:{ de:'der Waggon',          en:'the carriage' } },
        { z:'anular',          na:{ de:'stornieren',          en:'to cancel' } },
        { z:'el siguiente',    na:{ de:'der nächste',         en:'the next one' } },
        { z:'aproximadamente', na:{ de:'ungefähr',            en:'approximately' } },
        { z:'me han dicho',    na:{ de:'man hat mir gesagt',  en:'I have been told' } }
      ],
      dialog: {
        rolle: { de:'Die Frau am Info-Schalter', en:'The woman at the information desk' },
        zeilen: [
          { wer:'lerner', z:'Perdone, mi tren lleva retraso. ¿Pierdo el enlace?', na:{ de:'Entschuldigung, mein Zug hat Verspätung. Verpasse ich den Anschluss?', en:'Excuse me, my train is delayed. Will I miss my connection?' } },
          { wer:'spikiu', z:'¿A qué hora hace transbordo?', na:{ de:'Um wie viel Uhr steigen Sie um?', en:'What time do you change?' } },
          { wer:'lerner', z:'A las tres en Zaragoza.', na:{ de:'Um drei in Zaragoza.', en:'At three in Zaragoza.' } },
          { wer:'spikiu', z:'El retraso es de veinte minutos aproximadamente. Llega justo.', na:{ de:'Die Verspätung beträgt ungefähr zwanzig Minuten. Sie kommen knapp hin.', en:'The delay is about twenty minutes. You will just make it.' } },
          { wer:'lerner', z:'¿Y si lo pierdo?', na:{ de:'Und wenn ich ihn verpasse?', en:'And if I miss it?' } },
          { wer:'spikiu', z:'El siguiente sale una hora después. Su billete sirve igual.', na:{ de:'Der nächste fährt eine Stunde später. Ihre Fahrkarte gilt trotzdem.', en:'The next one leaves an hour later. Your ticket is still valid.' } }
        ]
      },
      lesetext: {
        z:'El tren de Ignacio salió con media hora de retraso. En Zaragoza tenía que hacer transbordo, pero perdió el enlace. Esperó una hora en la estación y llegó a casa muy tarde.',
        na:{ de:'Ignacios Zug fuhr mit einer halben Stunde Verspätung ab. In Zaragoza musste er umsteigen, aber er verpasste den Anschluss. Er wartete eine Stunde im Bahnhof und kam sehr spät nach Hause.',
             en:'Ignacio\u2019s train left half an hour late. In Zaragoza he had to change, but he missed his connection. He waited an hour at the station and got home very late.' },
        frage:{ de:'Wie lange wartete Ignacio?', en:'How long did Ignacio wait?' },
        optionen:[
          { na:{ de:'Eine halbe Stunde', en:'Half an hour' }, richtig:false },
          { na:{ de:'Eine Stunde',       en:'One hour' },     richtig:true  },
          { na:{ de:'Zwei Stunden',      en:'Two hours' },    richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass dein Zug Verspätung hat, und frage, wann der nächste fährt. Zwei Sätze.',
                  en:'Say your train is delayed and ask when the next one leaves. Two sentences.' },
        muster:'Mi tren lleva retraso. ¿A qué hora sale el siguiente?'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'„Si" heißt „wenn" und steht bei einer echten Möglichkeit im normalen Präsens: si lo pierdo, si llueve. Kein Sonderbau nötig.',
               en:'"Si" means "if" and takes plain present tense for a real possibility: si lo pierdo, si llueve. No special construction needed.' },
        beispiele:[
          { z:'¿Y si lo pierdo?', na:{ de:'Und wenn ich ihn verpasse?', en:'And if I miss it?' } },
          { z:'Si llueve, tomo un taxi.', na:{ de:'Wenn es regnet, nehme ich ein Taxi.', en:'If it rains, I take a taxi.' } }
        ]
      }
    },

    /* ── A2 · Beim Arzt ─────────────────────────────────────────────── */
    'a2.arzt': {
      wortschatz: [
        { z:'los síntomas',    na:{ de:'die Symptome',        en:'the symptoms' } },
        { z:'la receta',       na:{ de:'das Rezept',          en:'the prescription' } },
        { z:'el antibiótico',  na:{ de:'das Antibiotikum',    en:'the antibiotic' } },
        { z:'la alergia',      na:{ de:'die Allergie',        en:'the allergy' } },
        { z:'tomar',           na:{ de:'einnehmen',           en:'to take' } },
        { z:'tres veces al día', na:{ de:'dreimal täglich',   en:'three times a day' } },
        { z:'la operación',    na:{ de:'die Operation',       en:'the operation' } },
        { z:'me caí',          na:{ de:'ich bin gestürzt',    en:'I fell' } },
        { z:'me rompí',        na:{ de:'ich habe mir gebrochen', en:'I broke' } },
        { z:'la radiografía',  na:{ de:'das Röntgenbild',     en:'the X-ray' } },
        { z:'ha empeorado',    na:{ de:'es ist schlimmer geworden', en:'it has got worse' } },
        { z:'la cita',         na:{ de:'der Termin',          en:'the appointment' } }
      ],
      dialog: {
        rolle: { de:'Der Arzt', en:'The doctor' },
        zeilen: [
          { wer:'spikiu', z:'Cuénteme, ¿qué le pasa?', na:{ de:'Erzählen Sie, was fehlt Ihnen?', en:'Tell me, what is wrong?' } },
          { wer:'lerner', z:'Me caí la semana pasada y el hombro ha empeorado.', na:{ de:'Ich bin letzte Woche gestürzt, und die Schulter ist schlimmer geworden.', en:'I fell last week and my shoulder has got worse.' } },
          { wer:'spikiu', z:'¿Toma alguna medicina?', na:{ de:'Nehmen Sie Medikamente?', en:'Are you taking any medication?' } },
          { wer:'lerner', z:'Solo pastillas para el dolor. Soy alérgico a la penicilina.', na:{ de:'Nur Schmerztabletten. Ich bin allergisch gegen Penicillin.', en:'Only painkillers. I am allergic to penicillin.' } },
          { wer:'spikiu', z:'Bien, lo apunto. Vamos a hacer una radiografía.', na:{ de:'Gut, ich notiere es. Wir machen ein Röntgenbild.', en:'Good, I will note that. We will take an X-ray.' } },
          { wer:'lerner', z:'De acuerdo. ¿Necesito otra cita?', na:{ de:'Einverstanden. Brauche ich noch einen Termin?', en:'All right. Do I need another appointment?' } }
        ]
      },
      lesetext: {
        z:'Beatriz fue al médico porque le dolía el estómago desde hacía una semana. El médico le preguntó qué comía y si tomaba alguna medicina. Le dio una receta y una cita para el martes.',
        na:{ de:'Beatriz ging zum Arzt, weil ihr seit einer Woche der Bauch weh tat. Der Arzt fragte sie, was sie aß und ob sie Medikamente nahm. Er gab ihr ein Rezept und einen Termin für Dienstag.',
             en:'Beatriz went to the doctor because her stomach had been hurting for a week. The doctor asked what she ate and whether she took any medication. He gave her a prescription and an appointment for Tuesday.' },
        frage:{ de:'Was bekam Beatriz vom Arzt?', en:'What did Beatriz get from the doctor?' },
        optionen:[
          { na:{ de:'Ein Röntgenbild',            en:'An X-ray' },                      richtig:false },
          { na:{ de:'Ein Rezept und einen Termin',en:'A prescription and appointment' },richtig:true  },
          { na:{ de:'Nur einen Rat',              en:'Only advice' },                   richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass du gestürzt bist und allergisch gegen Penicillin bist. Zwei Sätze.',
                  en:'Say that you fell and that you are allergic to penicillin. Two sentences.' },
        muster:'Me caí el sábado y me duele mucho la rodilla. Soy alérgico a la penicilina.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Es gibt zwei Vergangenheiten nebeneinander: me caí ist der eine Moment, me dolía ist der Zustand ringsum. Erst der Punkt, dann die Landschaft.',
               en:'Two pasts work side by side: me caí is the single moment, me dolía is the state around it. First the dot, then the landscape.' },
        beispiele:[
          { z:'Me caí el sábado.',       na:{ de:'Ich bin am Samstag gestürzt.', en:'I fell on Saturday.' } },
          { z:'Me dolía todo el brazo.', na:{ de:'Mir tat der ganze Arm weh.',   en:'My whole arm was hurting.' } }
        ]
      }
    },

    /* ── A2 · Über das Wetter ───────────────────────────────────────── */
    'a2.wetter': {
      wortschatz: [
        { z:'la previsión',    na:{ de:'die Vorhersage',      en:'the forecast' } },
        { z:'va a llover',     na:{ de:'es wird regnen',      en:'it is going to rain' } },
        { z:'la tormenta',     na:{ de:'das Gewitter',        en:'the storm' } },
        { z:'nevar',           na:{ de:'schneien',            en:'to snow' } },
        { z:'despejado',       na:{ de:'klar',                en:'clear' } },
        { z:'nublado',         na:{ de:'bewölkt',             en:'cloudy' } },
        { z:'por si acaso',    na:{ de:'für alle Fälle',      en:'just in case' } },
        { z:'quedarse en casa',na:{ de:'zu Hause bleiben',    en:'to stay home' } },
        { z:'depende de',      na:{ de:'es hängt ab von',     en:'it depends on' } },
        { z:'mejorar',         na:{ de:'besser werden',       en:'to improve' } },
        { z:'el fin de semana',na:{ de:'das Wochenende',      en:'the weekend' } },
        { z:'seguramente',     na:{ de:'wahrscheinlich',      en:'probably' } }
      ],
      dialog: {
        rolle: { de:'Eine Freundin', en:'A friend' },
        zeilen: [
          { wer:'spikiu', z:'¿Vamos a la playa el sábado?', na:{ de:'Fahren wir am Samstag an den Strand?', en:'Shall we go to the beach on Saturday?' } },
          { wer:'lerner', z:'Depende del tiempo. ¿Has visto la previsión?', na:{ de:'Das hängt vom Wetter ab. Hast du die Vorhersage gesehen?', en:'It depends on the weather. Have you seen the forecast?' } },
          { wer:'spikiu', z:'Dicen que va a llover por la mañana.', na:{ de:'Sie sagen, morgens wird es regnen.', en:'They say it is going to rain in the morning.' } },
          { wer:'lerner', z:'¿Y por la tarde?', na:{ de:'Und nachmittags?', en:'And in the afternoon?' } },
          { wer:'spikiu', z:'Seguramente mejora. Estará despejado.', na:{ de:'Wahrscheinlich wird es besser. Es soll klar werden.', en:'It will probably improve. It should be clear.' } },
          { wer:'lerner', z:'Entonces vamos por la tarde. Llevo una chaqueta por si acaso.', na:{ de:'Dann fahren wir nachmittags. Ich nehme für alle Fälle eine Jacke mit.', en:'Then we will go in the afternoon. I will bring a jacket just in case.' } }
        ]
      },
      lesetext: {
        z:'El fin de semana pasado no fuimos al campo porque había tormenta. Nos quedamos en casa y vimos una película. Este sábado la previsión es mejor: nublado por la mañana y despejado por la tarde.',
        na:{ de:'Letztes Wochenende fuhren wir nicht aufs Land, weil es ein Gewitter gab. Wir blieben zu Hause und sahen einen Film. Diesen Samstag ist die Vorhersage besser: morgens bewölkt, nachmittags klar.',
             en:'Last weekend we did not go to the countryside because there was a storm. We stayed home and watched a film. This Saturday the forecast is better: cloudy in the morning, clear in the afternoon.' },
        frage:{ de:'Warum blieben sie zu Hause?', en:'Why did they stay home?' },
        optionen:[
          { na:{ de:'Es war ein Gewitter',   en:'There was a storm' },     richtig:true  },
          { na:{ de:'Es war zu warm',        en:'It was too hot' },        richtig:false },
          { na:{ de:'Sie hatten kein Auto',  en:'They had no car' },       richtig:false }
        ]
      },
      schreibaufgabe: {
        auftrag:{ de:'Sag, dass es morgen regnen wird und was du deshalb machst. Zwei Sätze.',
                  en:'Say that it will rain tomorrow and what you will do because of it. Two sentences.' },
        muster:'Mañana va a llover todo el día. Me quedo en casa y veo una película.'
      },
      grammatik: {
        titel:{ de:'Grammatik ohne Schnickschnack', en:'Simple Grammar for you' },
        text:{ de:'Die einfachste Zukunft ist „ir a" plus Verb: va a llover, voy a salir. Man braucht keine eigene Zukunftsform, um über morgen zu reden.',
               en:'The simplest future is "ir a" plus verb: va a llover, voy a salir. You do not need a separate future tense to talk about tomorrow.' },
        beispiele:[
          { z:'Va a llover.',      na:{ de:'Es wird regnen.',      en:'It is going to rain.' } },
          { z:'Voy a quedarme.',   na:{ de:'Ich werde bleiben.',   en:'I am going to stay.' } }
        ]
      }
    }
  };

  /* ── Öffentliche Fläche ───────────────────────────────────────────── */
  raum.SpikiuLernpfad = {
    themen: THEMEN,
    stufen: STUFEN,
    kategorien: KATEGORIEN,
    schritt: SCHRITT,
    stationen: STATIONEN,

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

    /* Alle Wörter einer Station, flach — für das Gym. */
    woerter: function (stufe, thema) {
      var s = STATIONEN[stufe + '.' + thema];
      return s ? s.wortschatz.slice() : [];
    }
  };

})(typeof window !== 'undefined' ? window : this);
