/* ──────────────────────────────────────────────────────────────────────────
   haeppchen-db.js — FESTE Häppchen-Datenbank (kein API-Call).
   Wie sprichwort.js / wortschatz.js ein Root-Helfer. KEIN vercel.json-Eintrag.

   window.spikiuHaeppchen(themaId, zielsprache, muttersprache)
     → { wortschatz:[{ziel, lautschrift, uebersetzung}],
         hoerverstehen:[ {typ:'minimalpaar', audio, frage, optionen:[{text,richtig}]},
                         {typ:'woerter',     audio, frage, woerter:[{text,gehoert}]} ] }
     → null, wenn (Thema × Zielsprache) nicht in der DB ist (chat.html fällt dann auf
       /api/haeppchen zurück).

   Form = exakt die Antwort von /api/haeppchen, damit loadHaeppchen nur die Quelle tauscht.
   themaId ∈ 'hotel' | 'taxi' | 'restaurant' | 'cafe' | 'einkaufen' |
                'wegbeschreibung' | 'arzt' | 'bahnhof' | 'wetter' | 'familie'
   zielsprache ∈ 'es' | 'de' | 'en' | 'el'             (el = Griechisch, nur Zielsprache)
   muttersprache ∈ 'de' | 'es' | 'en'                  (UI-Sprachen)

   Lautschrift: bei lateinischer Schrift (es/de/en) null; bei Griechisch (el) PFLICHT
   = konsistente lateinische Umschrift. Übersetzungen je Wort als {de,es,en}.
   español NEUTRO (nie voseo). Hochdeutsch. US-neutrales Englisch.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  if (window.spikiuHaeppchen) return;

  // Geteilte Fragen je Hörverständnis-Typ (nur diese 2 × 3 Sprachen).
  var Q_MP = { de: 'Welchen Satz hörst du?', es: '¿Qué frase oyes?', en: 'Which sentence do you hear?' };
  var Q_W  = { de: 'Welche Wörter hörst du?', es: '¿Qué palabras oyes?', en: 'Which words do you hear?' };

  // Kurzformen: v(ziel, laut, de, es, en) Vokabel · mp/wo Höritems.
  function v(ziel, laut, de, es, en) { return { ziel: ziel, lautschrift: laut, u: { de: de, es: es, en: en } }; }
  function mp(audio, ok, falsch) { return { typ: 'minimalpaar', audio: audio, optionen: [{ text: ok, richtig: true }, { text: falsch, richtig: false }] }; }
  function wo(audio, woerter) { return { typ: 'woerter', audio: audio, woerter: woerter }; }
  function w(text, gehoert) { return { text: text, gehoert: gehoert }; }

  var DB = {

    /* ───────────── HOTEL ───────────── */
    hotel: {
      es: {
        wortschatz: [
          v('una reserva', null, 'eine Reservierung', 'una reserva', 'a reservation'),
          v('la llave', null, 'der Schlüssel', 'la llave', 'the key'),
          v('una habitación', null, 'ein Zimmer', 'una habitación', 'a room'),
          v('dos noches', null, 'zwei Nächte', 'dos noches', 'two nights'),
          v('el desayuno', null, 'das Frühstück', 'el desayuno', 'breakfast')
        ],
        hoer: [
          mp('Tengo una reserva.', 'Tengo una reserva.', 'Tengo una reseña.'),
          wo('Una habitación con desayuno para dos noches.', [w('habitación', true), w('desayuno', true), w('noches', true), w('llave', false), w('playa', false)])
        ]
      },
      de: {
        wortschatz: [
          v('eine Reservierung', null, 'eine Reservierung', 'una reserva', 'a reservation'),
          v('der Schlüssel', null, 'der Schlüssel', 'la llave', 'the key'),
          v('ein Zimmer', null, 'ein Zimmer', 'una habitación', 'a room'),
          v('zwei Nächte', null, 'zwei Nächte', 'dos noches', 'two nights'),
          v('das Frühstück', null, 'das Frühstück', 'el desayuno', 'breakfast')
        ],
        hoer: [
          mp('Ich habe eine Reservierung.', 'Ich habe eine Reservierung.', 'Ich habe eine Verspätung.'),
          wo('Ein Zimmer mit Frühstück für zwei Nächte.', [w('Zimmer', true), w('Frühstück', true), w('Nächte', true), w('Schlüssel', false), w('Strand', false)])
        ]
      },
      en: {
        wortschatz: [
          v('a reservation', null, 'eine Reservierung', 'una reserva', 'a reservation'),
          v('the key', null, 'der Schlüssel', 'la llave', 'the key'),
          v('a room', null, 'ein Zimmer', 'una habitación', 'a room'),
          v('two nights', null, 'zwei Nächte', 'dos noches', 'two nights'),
          v('breakfast', null, 'das Frühstück', 'el desayuno', 'breakfast')
        ],
        hoer: [
          mp('I have a reservation.', 'I have a reservation.', 'I have a recommendation.'),
          wo('A room with breakfast for two nights.', [w('room', true), w('breakfast', true), w('nights', true), w('key', false), w('beach', false)])
        ]
      },
      el: {
        wortschatz: [
          v('μια κράτηση', 'mia krátisi', 'eine Reservierung', 'una reserva', 'a reservation'),
          v('το κλειδί', 'to klidí', 'der Schlüssel', 'la llave', 'the key'),
          v('ένα δωμάτιο', 'éna domátio', 'ein Zimmer', 'una habitación', 'a room'),
          v('δύο νύχτες', 'dío níchtes', 'zwei Nächte', 'dos noches', 'two nights'),
          v('το πρωινό', 'to proinó', 'das Frühstück', 'el desayuno', 'breakfast')
        ],
        hoer: [
          mp('Έχω μια κράτηση.', 'Έχω μια κράτηση.', 'Έχω μια ερώτηση.'),
          wo('Ένα δωμάτιο με πρωινό για δύο νύχτες.', [w('δωμάτιο', true), w('πρωινό', true), w('νύχτες', true), w('κλειδί', false), w('παραλία', false)])
        ]
      }
    },

    /* ───────────── TAXI ───────────── */
    taxi: {
      es: {
        wortschatz: [
          v('al aeropuerto', null, 'zum Flughafen', 'al aeropuerto', 'to the airport'),
          v('al centro', null, 'ins Zentrum', 'al centro', 'to the center'),
          v('¿cuánto es?', null, 'wie viel kostet das?', '¿cuánto es?', 'how much is it?'),
          v('pare aquí', null, 'halten Sie hier', 'pare aquí', 'stop here'),
          v('el equipaje', null, 'das Gepäck', 'el equipaje', 'the luggage')
        ],
        hoer: [
          mp('Al aeropuerto, por favor.', 'Al aeropuerto, por favor.', 'Al puerto, por favor.'),
          wo('¿Cuánto es al centro con equipaje?', [w('cuánto', true), w('centro', true), w('equipaje', true), w('aeropuerto', false), w('mañana', false)])
        ]
      },
      de: {
        wortschatz: [
          v('zum Flughafen', null, 'zum Flughafen', 'al aeropuerto', 'to the airport'),
          v('ins Zentrum', null, 'ins Zentrum', 'al centro', 'to the center'),
          v('was kostet das?', null, 'was kostet das?', '¿cuánto es?', 'how much is it?'),
          v('halten Sie hier', null, 'halten Sie hier', 'pare aquí', 'stop here'),
          v('das Gepäck', null, 'das Gepäck', 'el equipaje', 'the luggage')
        ],
        hoer: [
          mp('Zum Flughafen, bitte.', 'Zum Flughafen, bitte.', 'Zum Hafen, bitte.'),
          wo('Was kostet das ins Zentrum mit Gepäck?', [w('kostet', true), w('Zentrum', true), w('Gepäck', true), w('Flughafen', false), w('morgen', false)])
        ]
      },
      en: {
        wortschatz: [
          v('to the airport', null, 'zum Flughafen', 'al aeropuerto', 'to the airport'),
          v('to the center', null, 'ins Zentrum', 'al centro', 'to the center'),
          v('how much is it?', null, 'wie viel kostet das?', '¿cuánto es?', 'how much is it?'),
          v('stop here', null, 'halten Sie hier', 'pare aquí', 'stop here'),
          v('the luggage', null, 'das Gepäck', 'el equipaje', 'the luggage')
        ],
        hoer: [
          mp('To the airport, please.', 'To the airport, please.', 'To the airline, please.'),
          wo('How much to the center with luggage?', [w('much', true), w('center', true), w('luggage', true), w('airport', false), w('tomorrow', false)])
        ]
      },
      el: {
        wortschatz: [
          v('στο αεροδρόμιο', 'sto aerodrómio', 'zum Flughafen', 'al aeropuerto', 'to the airport'),
          v('στο κέντρο', 'sto kéntro', 'ins Zentrum', 'al centro', 'to the center'),
          v('πόσο κάνει;', 'póso káni?', 'wie viel kostet das?', '¿cuánto es?', 'how much is it?'),
          v('σταματήστε εδώ', 'stamatíste edó', 'halten Sie hier', 'pare aquí', 'stop here'),
          v('οι αποσκευές', 'i aposkevés', 'das Gepäck', 'el equipaje', 'the luggage')
        ],
        hoer: [
          mp('Στο αεροδρόμιο, παρακαλώ.', 'Στο αεροδρόμιο, παρακαλώ.', 'Στο λιμάνι, παρακαλώ.'),
          wo('Πόσο κάνει στο κέντρο με αποσκευές;', [w('πόσο', true), w('κέντρο', true), w('αποσκευές', true), w('αεροδρόμιο', false), w('αύριο', false)])
        ]
      }
    },

    /* ───────────── RESTAURANT ───────────── */
    restaurant: {
      es: {
        wortschatz: [
          v('una mesa para dos', null, 'ein Tisch für zwei', 'una mesa para dos', 'a table for two'),
          v('la carta', null, 'die Speisekarte', 'la carta', 'the menu'),
          v('la cuenta', null, 'die Rechnung', 'la cuenta', 'the bill'),
          v('¿qué me recomienda?', null, 'was empfehlen Sie mir?', '¿qué me recomienda?', 'what do you recommend?'),
          v('agua, por favor', null, 'Wasser, bitte', 'agua, por favor', 'water, please')
        ],
        hoer: [
          mp('La carta, por favor.', 'La carta, por favor.', 'La cuenta, por favor.'),
          wo('Una mesa para dos y la carta, por favor.', [w('mesa', true), w('dos', true), w('carta', true), w('cuenta', false), w('cena', false)])
        ]
      },
      de: {
        wortschatz: [
          v('ein Tisch für zwei', null, 'ein Tisch für zwei', 'una mesa para dos', 'a table for two'),
          v('die Speisekarte', null, 'die Speisekarte', 'la carta', 'the menu'),
          v('die Rechnung', null, 'die Rechnung', 'la cuenta', 'the bill'),
          v('was empfehlen Sie?', null, 'was empfehlen Sie?', '¿qué me recomienda?', 'what do you recommend?'),
          v('Wasser, bitte', null, 'Wasser, bitte', 'agua, por favor', 'water, please')
        ],
        hoer: [
          mp('Die Speisekarte, bitte.', 'Die Speisekarte, bitte.', 'Die Rechnung, bitte.'),
          wo('Ein Tisch für zwei und die Speisekarte, bitte.', [w('Tisch', true), w('zwei', true), w('Speisekarte', true), w('Rechnung', false), w('Frühstück', false)])
        ]
      },
      en: {
        wortschatz: [
          v('a table for two', null, 'ein Tisch für zwei', 'una mesa para dos', 'a table for two'),
          v('the menu', null, 'die Speisekarte', 'la carta', 'the menu'),
          v('the bill', null, 'die Rechnung', 'la cuenta', 'the bill'),
          v('what do you recommend?', null, 'was empfehlen Sie mir?', '¿qué me recomienda?', 'what do you recommend?'),
          v('water, please', null, 'Wasser, bitte', 'agua, por favor', 'water, please')
        ],
        hoer: [
          mp('The menu, please.', 'The menu, please.', 'The bill, please.'),
          wo('A table for two and the menu, please.', [w('table', true), w('two', true), w('menu', true), w('bill', false), w('breakfast', false)])
        ]
      },
      el: {
        wortschatz: [
          v('ένα τραπέζι για δύο', 'éna trapézi gia dío', 'ein Tisch für zwei', 'una mesa para dos', 'a table for two'),
          v('το μενού', 'to menú', 'die Speisekarte', 'la carta', 'the menu'),
          v('τον λογαριασμό', 'ton logariasmó', 'die Rechnung', 'la cuenta', 'the bill'),
          v('τι προτείνετε;', 'ti protínete?', 'was empfehlen Sie?', '¿qué me recomienda?', 'what do you recommend?'),
          v('νερό, παρακαλώ', 'neró, parakaló', 'Wasser, bitte', 'agua, por favor', 'water, please')
        ],
        hoer: [
          mp('Το μενού, παρακαλώ.', 'Το μενού, παρακαλώ.', 'Τον λογαριασμό, παρακαλώ.'),
          wo('Ένα τραπέζι για δύο και το μενού, παρακαλώ.', [w('τραπέζι', true), w('δύο', true), w('μενού', true), w('λογαριασμό', false), w('πρωινό', false)])
        ]
      }
    },

    /* ───────────── CAFÉ ───────────── */
    cafe: {
      es: {
        wortschatz: [
          v('un café', null, 'ein Kaffee', 'un café', 'a coffee'),
          v('con leche', null, 'mit Milch', 'con leche', 'with milk'),
          v('un té', null, 'ein Tee', 'un té', 'a tea'),
          v('el azúcar', null, 'der Zucker', 'el azúcar', 'the sugar'),
          v('para llevar', null, 'zum Mitnehmen', 'para llevar', 'to go')
        ],
        hoer: [
          mp('Un café con leche.', 'Un café con leche.', 'Un café sin leche.'),
          wo('Un té con azúcar para llevar.', [w('té', true), w('azúcar', true), w('llevar', true), w('leche', false), w('agua', false)])
        ]
      },
      de: {
        wortschatz: [
          v('ein Kaffee', null, 'ein Kaffee', 'un café', 'a coffee'),
          v('mit Milch', null, 'mit Milch', 'con leche', 'with milk'),
          v('ein Tee', null, 'ein Tee', 'un té', 'a tea'),
          v('der Zucker', null, 'der Zucker', 'el azúcar', 'the sugar'),
          v('zum Mitnehmen', null, 'zum Mitnehmen', 'para llevar', 'to go')
        ],
        hoer: [
          mp('Ein Kaffee mit Milch.', 'Ein Kaffee mit Milch.', 'Ein Kaffee ohne Milch.'),
          wo('Ein Tee mit Zucker zum Mitnehmen.', [w('Tee', true), w('Zucker', true), w('Mitnehmen', true), w('Milch', false), w('Wasser', false)])
        ]
      },
      en: {
        wortschatz: [
          v('a coffee', null, 'ein Kaffee', 'un café', 'a coffee'),
          v('with milk', null, 'mit Milch', 'con leche', 'with milk'),
          v('a tea', null, 'ein Tee', 'un té', 'a tea'),
          v('the sugar', null, 'der Zucker', 'el azúcar', 'the sugar'),
          v('to go', null, 'zum Mitnehmen', 'para llevar', 'to go')
        ],
        hoer: [
          mp('A coffee with milk.', 'A coffee with milk.', 'A coffee without milk.'),
          wo('A tea with sugar to go.', [w('tea', true), w('sugar', true), w('go', true), w('milk', false), w('water', false)])
        ]
      },
      el: {
        wortschatz: [
          v('έναν καφέ', 'énan kafé', 'ein Kaffee', 'un café', 'a coffee'),
          v('με γάλα', 'me gála', 'mit Milch', 'con leche', 'with milk'),
          v('ένα τσάι', 'éna tsái', 'ein Tee', 'un té', 'a tea'),
          v('τη ζάχαρη', 'ti záchari', 'der Zucker', 'el azúcar', 'the sugar'),
          v('για έξω', 'gia éxo', 'zum Mitnehmen', 'para llevar', 'to go')
        ],
        hoer: [
          mp('Έναν καφέ με γάλα.', 'Έναν καφέ με γάλα.', 'Έναν καφέ χωρίς γάλα.'),
          wo('Ένα τσάι με ζάχαρη για έξω.', [w('τσάι', true), w('ζάχαρη', true), w('έξω', true), w('γάλα', false), w('νερό', false)])
        ]
      }
    },

    /* ───────────── EINKAUFEN ───────────── */
    einkaufen: {
      es: {
        wortschatz: [
          v('el pan', null, 'das Brot', 'el pan', 'the bread'),
          v('un kilo', null, 'ein Kilo', 'un kilo', 'a kilo'),
          v('¿cuánto cuesta?', null, 'wie viel kostet das?', '¿cuánto cuesta?', 'how much is it?'),
          v('la bolsa', null, 'die Tüte', 'la bolsa', 'the bag'),
          v('en efectivo', null, 'in bar', 'en efectivo', 'in cash')
        ],
        hoer: [
          mp('¿Cuánto cuesta el pan?', '¿Cuánto cuesta el pan?', '¿Cuándo cuesta el pan?'),
          wo('Un kilo de pan y una bolsa, por favor.', [w('kilo', true), w('pan', true), w('bolsa', true), w('efectivo', false), w('leche', false)])
        ]
      },
      de: {
        wortschatz: [
          v('das Brot', null, 'das Brot', 'el pan', 'the bread'),
          v('ein Kilo', null, 'ein Kilo', 'un kilo', 'a kilo'),
          v('was kostet das?', null, 'was kostet das?', '¿cuánto cuesta?', 'how much is it?'),
          v('die Tüte', null, 'die Tüte', 'la bolsa', 'the bag'),
          v('in bar', null, 'in bar', 'en efectivo', 'in cash')
        ],
        hoer: [
          mp('Was kostet das Brot?', 'Was kostet das Brot?', 'Was kostet das Boot?'),
          wo('Ein Kilo Brot und eine Tüte, bitte.', [w('Kilo', true), w('Brot', true), w('Tüte', true), w('bar', false), w('Milch', false)])
        ]
      },
      en: {
        wortschatz: [
          v('the bread', null, 'das Brot', 'el pan', 'the bread'),
          v('a kilo', null, 'ein Kilo', 'un kilo', 'a kilo'),
          v('how much is it?', null, 'wie viel kostet das?', '¿cuánto cuesta?', 'how much is it?'),
          v('the bag', null, 'die Tüte', 'la bolsa', 'the bag'),
          v('in cash', null, 'in bar', 'en efectivo', 'in cash')
        ],
        hoer: [
          mp('How much is the bread?', 'How much is the bread?', 'How much is the bed?'),
          wo('A kilo of bread and a bag, please.', [w('kilo', true), w('bread', true), w('bag', true), w('cash', false), w('milk', false)])
        ]
      },
      el: {
        wortschatz: [
          v('το ψωμί', 'to psomí', 'das Brot', 'el pan', 'the bread'),
          v('ένα κιλό', 'éna kiló', 'ein Kilo', 'un kilo', 'a kilo'),
          v('πόσο κάνει;', 'póso káni?', 'wie viel kostet das?', '¿cuánto cuesta?', 'how much is it?'),
          v('η σακούλα', 'i sakoúla', 'die Tüte', 'la bolsa', 'the bag'),
          v('με μετρητά', 'me metritá', 'in bar', 'en efectivo', 'in cash')
        ],
        hoer: [
          mp('Πόσο κάνει το ψωμί;', 'Πόσο κάνει το ψωμί;', 'Πόσο κάνει το κρασί;'),
          wo('Ένα κιλό ψωμί και μία σακούλα.', [w('κιλό', true), w('ψωμί', true), w('σακούλα', true), w('μετρητά', false), w('γάλα', false)])
        ]
      }
    },

    /* ───────────── WEGBESCHREIBUNG ───────────── */
    wegbeschreibung: {
      es: {
        wortschatz: [
          v('¿dónde está?', null, 'wo ist?', '¿dónde está?', 'where is?'),
          v('a la derecha', null, 'rechts', 'a la derecha', 'to the right'),
          v('a la izquierda', null, 'links', 'a la izquierda', 'to the left'),
          v('todo recto', null, 'geradeaus', 'todo recto', 'straight ahead'),
          v('la esquina', null, 'die Ecke', 'la esquina', 'the corner')
        ],
        hoer: [
          mp('Está a la derecha.', 'Está a la derecha.', 'Está a la izquierda.'),
          wo('Todo recto y después en la esquina.', [w('recto', true), w('esquina', true), w('después', true), w('derecha', false), w('plaza', false)])
        ]
      },
      de: {
        wortschatz: [
          v('wo ist?', null, 'wo ist?', '¿dónde está?', 'where is?'),
          v('rechts', null, 'rechts', 'a la derecha', 'to the right'),
          v('links', null, 'links', 'a la izquierda', 'to the left'),
          v('geradeaus', null, 'geradeaus', 'todo recto', 'straight ahead'),
          v('die Ecke', null, 'die Ecke', 'la esquina', 'the corner')
        ],
        hoer: [
          mp('Es ist rechts.', 'Es ist rechts.', 'Es ist links.'),
          wo('Geradeaus und dann an der Ecke.', [w('Geradeaus', true), w('Ecke', true), w('dann', true), w('rechts', false), w('Platz', false)])
        ]
      },
      en: {
        wortschatz: [
          v('where is?', null, 'wo ist?', '¿dónde está?', 'where is?'),
          v('to the right', null, 'rechts', 'a la derecha', 'to the right'),
          v('to the left', null, 'links', 'a la izquierda', 'to the left'),
          v('straight ahead', null, 'geradeaus', 'todo recto', 'straight ahead'),
          v('the corner', null, 'die Ecke', 'la esquina', 'the corner')
        ],
        hoer: [
          mp('It is on the right.', 'It is on the right.', 'It is on the left.'),
          wo('Straight ahead and then at the corner.', [w('Straight', true), w('corner', true), w('then', true), w('right', false), w('square', false)])
        ]
      },
      el: {
        wortschatz: [
          v('πού είναι;', 'poú íne?', 'wo ist?', '¿dónde está?', 'where is?'),
          v('δεξιά', 'dexiá', 'rechts', 'a la derecha', 'to the right'),
          v('αριστερά', 'aristerá', 'links', 'a la izquierda', 'to the left'),
          v('ευθεία', 'efthía', 'geradeaus', 'todo recto', 'straight ahead'),
          v('η γωνία', 'i gonía', 'die Ecke', 'la esquina', 'the corner')
        ],
        hoer: [
          mp('Είναι δεξιά.', 'Είναι δεξιά.', 'Είναι αριστερά.'),
          wo('Ευθεία και μετά στη γωνία.', [w('Ευθεία', true), w('γωνία', true), w('μετά', true), w('δεξιά', false), w('πλατεία', false)])
        ]
      }
    },

    /* ───────────── ARZT ───────────── */
    arzt: {
      es: {
        wortschatz: [
          v('me duele', null, 'mir tut weh', 'me duele', 'it hurts'),
          v('la cabeza', null, 'der Kopf', 'la cabeza', 'the head'),
          v('desde ayer', null, 'seit gestern', 'desde ayer', 'since yesterday'),
          v('una cita', null, 'ein Termin', 'una cita', 'an appointment'),
          v('la receta', null, 'das Rezept', 'la receta', 'the prescription')
        ],
        hoer: [
          mp('Me duele la cabeza.', 'Me duele la cabeza.', 'Me duele la cadera.'),
          wo('Tengo una cita y necesito la receta.', [w('cita', true), w('receta', true), w('necesito', true), w('cabeza', false), w('ayer', false)])
        ]
      },
      de: {
        wortschatz: [
          v('mir tut weh', null, 'mir tut weh', 'me duele', 'it hurts'),
          v('der Kopf', null, 'der Kopf', 'la cabeza', 'the head'),
          v('seit gestern', null, 'seit gestern', 'desde ayer', 'since yesterday'),
          v('ein Termin', null, 'ein Termin', 'una cita', 'an appointment'),
          v('das Rezept', null, 'das Rezept', 'la receta', 'the prescription')
        ],
        hoer: [
          mp('Mir tut der Kopf weh.', 'Mir tut der Kopf weh.', 'Mir tut der Zopf weh.'),
          wo('Ich habe einen Termin und brauche das Rezept.', [w('Termin', true), w('Rezept', true), w('brauche', true), w('Kopf', false), w('gestern', false)])
        ]
      },
      en: {
        wortschatz: [
          v('it hurts', null, 'mir tut weh', 'me duele', 'it hurts'),
          v('the head', null, 'der Kopf', 'la cabeza', 'the head'),
          v('since yesterday', null, 'seit gestern', 'desde ayer', 'since yesterday'),
          v('an appointment', null, 'ein Termin', 'una cita', 'an appointment'),
          v('the prescription', null, 'das Rezept', 'la receta', 'the prescription')
        ],
        hoer: [
          mp('My head hurts.', 'My head hurts.', 'My hand hurts.'),
          wo('I have an appointment and I need the prescription.', [w('appointment', true), w('prescription', true), w('need', true), w('head', false), w('yesterday', false)])
        ]
      },
      el: {
        wortschatz: [
          v('πονάω', 'ponáo', 'mir tut weh', 'me duele', 'it hurts'),
          v('το κεφάλι', 'to kefáli', 'der Kopf', 'la cabeza', 'the head'),
          v('από χθες', 'apó chthes', 'seit gestern', 'desde ayer', 'since yesterday'),
          v('ένα ραντεβού', 'éna randevoú', 'ein Termin', 'una cita', 'an appointment'),
          v('η συνταγή', 'i syntagí', 'das Rezept', 'la receta', 'the prescription')
        ],
        hoer: [
          mp('Πονάει το κεφάλι μου.', 'Πονάει το κεφάλι μου.', 'Πονάει το πόδι μου.'),
          wo('Έχω ένα ραντεβού και θέλω τη συνταγή.', [w('ραντεβού', true), w('συνταγή', true), w('θέλω', true), w('κεφάλι', false), w('χθες', false)])
        ]
      }
    },

    /* ───────────── BAHNHOF ───────────── */
    bahnhof: {
      es: {
        wortschatz: [
          v('un billete', null, 'eine Fahrkarte', 'un billete', 'a ticket'),
          v('el andén', null, 'das Gleis', 'el andén', 'the platform'),
          v('el próximo tren', null, 'der nächste Zug', 'el próximo tren', 'the next train'),
          v('ida y vuelta', null, 'hin und zurück', 'ida y vuelta', 'round trip'),
          v('lleva retraso', null, 'hat Verspätung', 'lleva retraso', 'is delayed')
        ],
        hoer: [
          mp('Un billete de ida y vuelta.', 'Un billete de ida y vuelta.', 'Un billete de ida y vuelto.'),
          wo('El próximo tren sale del andén cuatro.', [w('tren', true), w('andén', true), w('cuatro', true), w('billete', false), w('retraso', false)])
        ]
      },
      de: {
        wortschatz: [
          v('eine Fahrkarte', null, 'eine Fahrkarte', 'un billete', 'a ticket'),
          v('das Gleis', null, 'das Gleis', 'el andén', 'the platform'),
          v('der nächste Zug', null, 'der nächste Zug', 'el próximo tren', 'the next train'),
          v('hin und zurück', null, 'hin und zurück', 'ida y vuelta', 'round trip'),
          v('hat Verspätung', null, 'hat Verspätung', 'lleva retraso', 'is delayed')
        ],
        hoer: [
          mp('Eine Fahrkarte hin und zurück.', 'Eine Fahrkarte hin und zurück.', 'Eine Fahrkarte hin und zur Brücke.'),
          wo('Der nächste Zug fährt von Gleis vier.', [w('Zug', true), w('Gleis', true), w('vier', true), w('Fahrkarte', false), w('Verspätung', false)])
        ]
      },
      en: {
        wortschatz: [
          v('a ticket', null, 'eine Fahrkarte', 'un billete', 'a ticket'),
          v('the platform', null, 'das Gleis', 'el andén', 'the platform'),
          v('the next train', null, 'der nächste Zug', 'el próximo tren', 'the next train'),
          v('round trip', null, 'hin und zurück', 'ida y vuelta', 'round trip'),
          v('is delayed', null, 'hat Verspätung', 'lleva retraso', 'is delayed')
        ],
        hoer: [
          mp('A round trip ticket, please.', 'A round trip ticket, please.', 'A one way ticket, please.'),
          wo('The next train leaves from platform four.', [w('train', true), w('platform', true), w('four', true), w('ticket', false), w('delayed', false)])
        ]
      },
      el: {
        wortschatz: [
          v('ένα εισιτήριο', 'éna isitírio', 'eine Fahrkarte', 'un billete', 'a ticket'),
          v('η αποβάθρα', 'i apováthra', 'das Gleis', 'el andén', 'the platform'),
          v('το επόμενο τρένο', 'to epómeno tréno', 'der nächste Zug', 'el próximo tren', 'the next train'),
          v('με επιστροφή', 'me epistrofí', 'hin und zurück', 'ida y vuelta', 'round trip'),
          v('έχει καθυστέρηση', 'échi kathystérisi', 'hat Verspätung', 'lleva retraso', 'is delayed')
        ],
        hoer: [
          mp('Ένα εισιτήριο με επιστροφή.', 'Ένα εισιτήριο με επιστροφή.', 'Ένα εισιτήριο χωρίς επιστροφή.'),
          wo('Το επόμενο τρένο φεύγει από την αποβάθρα τέσσερα.', [w('τρένο', true), w('αποβάθρα', true), w('τέσσερα', true), w('εισιτήριο', false), w('καθυστέρηση', false)])
        ]
      }
    },

    /* ───────────── WETTER ───────────── */
    wetter: {
      es: {
        wortschatz: [
          v('hace calor', null, 'es ist warm', 'hace calor', 'it is hot'),
          v('hace frío', null, 'es ist kalt', 'hace frío', 'it is cold'),
          v('está lloviendo', null, 'es regnet', 'está lloviendo', 'it is raining'),
          v('el paraguas', null, 'der Regenschirm', 'el paraguas', 'the umbrella'),
          v('mañana', null, 'morgen', 'mañana', 'tomorrow')
        ],
        hoer: [
          mp('Hoy hace calor.', 'Hoy hace calor.', 'Hoy hace color.'),
          wo('Mañana está lloviendo, lleva el paraguas.', [w('Mañana', true), w('lloviendo', true), w('paraguas', true), w('calor', false), w('frío', false)])
        ]
      },
      de: {
        wortschatz: [
          v('es ist warm', null, 'es ist warm', 'hace calor', 'it is hot'),
          v('es ist kalt', null, 'es ist kalt', 'hace frío', 'it is cold'),
          v('es regnet', null, 'es regnet', 'está lloviendo', 'it is raining'),
          v('der Regenschirm', null, 'der Regenschirm', 'el paraguas', 'the umbrella'),
          v('morgen', null, 'morgen', 'mañana', 'tomorrow')
        ],
        hoer: [
          mp('Heute ist es warm.', 'Heute ist es warm.', 'Heute ist es wahr.'),
          wo('Morgen regnet es, nimm den Regenschirm.', [w('Morgen', true), w('regnet', true), w('Regenschirm', true), w('warm', false), w('kalt', false)])
        ]
      },
      en: {
        wortschatz: [
          v('it is hot', null, 'es ist warm', 'hace calor', 'it is hot'),
          v('it is cold', null, 'es ist kalt', 'hace frío', 'it is cold'),
          v('it is raining', null, 'es regnet', 'está lloviendo', 'it is raining'),
          v('the umbrella', null, 'der Regenschirm', 'el paraguas', 'the umbrella'),
          v('tomorrow', null, 'morgen', 'mañana', 'tomorrow')
        ],
        hoer: [
          mp('Today it is hot.', 'Today it is hot.', 'Today it is not.'),
          wo('Tomorrow it is raining, take the umbrella.', [w('Tomorrow', true), w('raining', true), w('umbrella', true), w('hot', false), w('cold', false)])
        ]
      },
      el: {
        wortschatz: [
          v('κάνει ζέστη', 'káni zésti', 'es ist warm', 'hace calor', 'it is hot'),
          v('κάνει κρύο', 'káni krío', 'es ist kalt', 'hace frío', 'it is cold'),
          v('βρέχει', 'vréchi', 'es regnet', 'está lloviendo', 'it is raining'),
          v('η ομπρέλα', 'i ombréla', 'der Regenschirm', 'el paraguas', 'the umbrella'),
          v('αύριο', 'ávrio', 'morgen', 'mañana', 'tomorrow')
        ],
        hoer: [
          mp('Σήμερα κάνει ζέστη.', 'Σήμερα κάνει ζέστη.', 'Σήμερα κάνει κρύο.'),
          wo('Αύριο βρέχει, πάρε την ομπρέλα.', [w('Αύριο', true), w('βρέχει', true), w('ομπρέλα', true), w('ζέστη', false), w('κρύο', false)])
        ]
      }
    },

    /* ───────────── FAMILIE ───────────── */
    familie: {
      es: {
        wortschatz: [
          v('mi hermana', null, 'meine Schwester', 'mi hermana', 'my sister'),
          v('mi hijo', null, 'mein Sohn', 'mi hijo', 'my son'),
          v('los padres', null, 'die Eltern', 'los padres', 'the parents'),
          v('está casado', null, 'ist verheiratet', 'está casado', 'is married'),
          v('vive en', null, 'wohnt in', 'vive en', 'lives in')
        ],
        hoer: [
          mp('Mi hermana vive en Madrid.', 'Mi hermana vive en Madrid.', 'Mi hermano vive en Madrid.'),
          wo('Mis padres viven aquí y mi hijo también.', [w('padres', true), w('viven', true), w('hijo', true), w('hermana', false), w('casado', false)])
        ]
      },
      de: {
        wortschatz: [
          v('meine Schwester', null, 'meine Schwester', 'mi hermana', 'my sister'),
          v('mein Sohn', null, 'mein Sohn', 'mi hijo', 'my son'),
          v('die Eltern', null, 'die Eltern', 'los padres', 'the parents'),
          v('ist verheiratet', null, 'ist verheiratet', 'está casado', 'is married'),
          v('wohnt in', null, 'wohnt in', 'vive en', 'lives in')
        ],
        hoer: [
          mp('Meine Schwester wohnt in Berlin.', 'Meine Schwester wohnt in Berlin.', 'Mein Schwager wohnt in Berlin.'),
          wo('Meine Eltern wohnen hier und mein Sohn auch.', [w('Eltern', true), w('wohnen', true), w('Sohn', true), w('Schwester', false), w('verheiratet', false)])
        ]
      },
      en: {
        wortschatz: [
          v('my sister', null, 'meine Schwester', 'mi hermana', 'my sister'),
          v('my son', null, 'mein Sohn', 'mi hijo', 'my son'),
          v('the parents', null, 'die Eltern', 'los padres', 'the parents'),
          v('is married', null, 'ist verheiratet', 'está casado', 'is married'),
          v('lives in', null, 'wohnt in', 'vive en', 'lives in')
        ],
        hoer: [
          mp('My sister lives in London.', 'My sister lives in London.', 'My sitter lives in London.'),
          wo('My parents live here and my son too.', [w('parents', true), w('live', true), w('son', true), w('sister', false), w('married', false)])
        ]
      },
      el: {
        wortschatz: [
          v('η αδελφή μου', 'i adelfí mou', 'meine Schwester', 'mi hermana', 'my sister'),
          v('ο γιος μου', 'o gios mou', 'mein Sohn', 'mi hijo', 'my son'),
          v('οι γονείς', 'i gonís', 'die Eltern', 'los padres', 'the parents'),
          v('είναι παντρεμένος', 'íne pandreménos', 'ist verheiratet', 'está casado', 'is married'),
          v('μένει στη', 'méni sti', 'wohnt in', 'vive en', 'lives in')
        ],
        hoer: [
          mp('Η αδελφή μου μένει στη Θεσσαλονίκη.', 'Η αδελφή μου μένει στη Θεσσαλονίκη.', 'Ο αδελφός μου μένει στη Θεσσαλονίκη.'),
          wo('Οι γονείς μου μένουν εδώ και ο γιος μου.', [w('γονείς', true), w('μένουν', true), w('γιος', true), w('αδελφή', false), w('παντρεμένος', false)])
        ]
      }
    }
  };

  function pick(map, mutter) {
    if (!map) return '';
    return map[mutter] || map.de || map.en || map.es || '';
  }

  window.spikiuHaeppchen = function (themaId, ziel, mutter) {
    try {
      mutter = (['de', 'es', 'en'].indexOf(mutter) > -1) ? mutter : 'de';
      var t = DB[themaId];
      if (!t) return null;
      var set = t[ziel];
      if (!set || !Array.isArray(set.wortschatz) || !set.wortschatz.length) return null;

      var wortschatz = set.wortschatz.map(function (it) {
        return { ziel: it.ziel, lautschrift: it.lautschrift || null, uebersetzung: pick(it.u, mutter) };
      });

      var hoerverstehen = (set.hoer || []).map(function (it) {
        if (it.typ === 'woerter') {
          return { typ: 'woerter', audio: it.audio, frage: Q_W[mutter], woerter: it.woerter.map(function (x) { return { text: x.text, gehoert: !!x.gehoert }; }) };
        }
        return { typ: 'minimalpaar', audio: it.audio, frage: Q_MP[mutter], optionen: it.optionen.map(function (x) { return { text: x.text, richtig: !!x.richtig }; }) };
      });

      return { wortschatz: wortschatz, hoerverstehen: hoerverstehen };
    } catch (e) { return null; }
  };

  // Liste der DB-Themen (für loadHaeppchen, um zu entscheiden ob lokal vorhanden).
  window.spikiuHaeppchen.themen = Object.keys(DB);
})();
