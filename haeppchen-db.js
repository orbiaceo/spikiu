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
   themaId ∈ 'hotel' | 'taxi' | 'restaurant' | 'cafe'  (Schlüssel, sprachneutral)
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
