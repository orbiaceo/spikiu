/* ═══════════════════════════════════════════════════════════════════
   szenen-dialog.js — FESTE Skript-Rollenspiele fürs GEFÜHRTE Gespräch (B).
   0 Token. Wie haeppchen-db.js ein Root-Helfer (kein vercel.json-Eintrag).

   window.spikiuSzenenDialog(themaId, zielsprache) → {
     rolle: '<wen Spikiu spielt, Muttersprache>',
     schritte: [ { spikiu:{ziel, trans}, tip?, opts:[{text, ok:true|false}] }, ... ]
   } | null   (null → Thema × Zielsprache nicht im Skript → B überspringen)

   themaId ∈ 'cafe'|'restaurant'|'hotel'|'taxi'   ·   zielsprache ∈ 'es' (Start)
   español NEUTRO (nie voseo). A1-Niveau. Genau EINE richtige Option je Schritt.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  if (window.spikiuSzenenDialog) return;

  function step(ziel, trans, opts, tip) { return { spikiu: { ziel: ziel, trans: trans }, opts: opts, tip: tip || null }; }
  function ok(t)  { return { text: t, ok: true }; }
  function no(t)  { return { text: t, ok: false }; }

  var ES = {
    cafe: {
      rolle: 'Kellner',
      schritte: [
        step('¡Hola! ¿Qué desea tomar?', 'Hallo! Was möchten Sie trinken?',
             [ ok('Un café, por favor.'), no('Me llamo Ana.'), no('Hasta luego.') ],
             'Bestelle etwas zu trinken.'),
        step('¿Con leche o solo?', 'Mit Milch oder schwarz?',
             [ ok('Con leche, por favor.'), no('Muchas gracias.'), no('¿Dónde está?') ]),
        step('¿Algo más?', 'Sonst noch etwas?',
             [ ok('No, gracias.'), no('Buenos días.') ]),
        step('Son dos euros con cincuenta.', 'Das macht zwei Euro fünfzig.',
             [ ok('Aquí tiene.'), no('¿Qué hora es?') ])
      ]
    },
    restaurant: {
      rolle: 'Kellner',
      schritte: [
        step('Buenas noches. ¿Tienen reserva?', 'Guten Abend. Haben Sie reserviert?',
             [ ok('Sí, a nombre de Ana.'), no('Un café, por favor.'), no('Adiós.') ],
             'Sag, dass du reserviert hast.'),
        step('¿Qué desean comer?', 'Was möchten Sie essen?',
             [ ok('La sopa, por favor.'), no('Me llamo Ana.') ]),
        step('¿Y para beber?', 'Und zu trinken?',
             [ ok('Agua, por favor.'), no('La cuenta, por favor.') ]),
        step('¿Todo bien?', 'Alles gut?',
             [ ok('Sí, muy rico.'), no('¿Dónde está el taxi?') ])
      ]
    },
    hotel: {
      rolle: 'Rezeption',
      schritte: [
        step('Buenos días. ¿En qué puedo ayudarle?', 'Guten Tag. Wie kann ich Ihnen helfen?',
             [ ok('Quiero una habitación.'), no('Un café, por favor.'), no('Hasta luego.') ],
             'Frage nach einem Zimmer.'),
        step('¿Para cuántas noches?', 'Für wie viele Nächte?',
             [ ok('Para dos noches.'), no('Con leche, por favor.') ]),
        step('¿A nombre de quién?', 'Auf welchen Namen?',
             [ ok('A nombre de Schmidt.'), no('La cuenta, por favor.') ]),
        step('Aquí tiene la llave. Habitación doce.', 'Hier ist der Schlüssel. Zimmer zwölf.',
             [ ok('Muchas gracias.'), no('¿Qué hora es?') ])
      ]
    },
    taxi: {
      rolle: 'Fahrer',
      schritte: [
        step('¡Hola! ¿Adónde va?', 'Hallo! Wohin möchten Sie?',
             [ ok('A la estación, por favor.'), no('Un café, por favor.'), no('Buenas noches.') ],
             'Nenne dein Ziel.'),
        step('¿Con equipaje?', 'Mit Gepäck?',
             [ ok('Sí, una maleta.'), no('Para dos noches.') ]),
        step('Ya llegamos. Son ocho euros.', 'Wir sind da. Das macht acht Euro.',
             [ ok('Aquí tiene, gracias.'), no('¿A nombre de quién?') ])
      ]
    }
  };

  var DB = { es: ES };

  window.spikiuSzenenDialog = function (themaId, zielsprache) {
    var byLang = DB[zielsprache];
    if (!byLang) return null;
    return byLang[themaId] || null;
  };
})();
