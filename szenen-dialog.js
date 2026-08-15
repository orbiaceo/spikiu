/* ═══════════════════════════════════════════════════════════════════
   szenen-dialog.js — FESTE Skript-Rollenspiele fürs GEFÜHRTE Gespräch (B).
   0 Token. Wie haeppchen-db.js ein Root-Helfer (kein vercel.json-Eintrag).

   window.spikiuSzenenDialog(themaId, zielsprache) → {
     rolle: '<wen Spikiu spielt, Muttersprache>',
     schritte: [ { spikiu:{ziel, trans}, tip?, opts:[{text, ok:true|false}] }, ... ]
   } | null   (null → Thema × Zielsprache nicht im Skript → B überspringen)

   themaId ∈ 'cafe'|'restaurant'|'hotel'|'taxi'|'einkaufen'|'wegbeschreibung'|'arzt'|'bahnhof'|'wetter'|'familie'   ·   zielsprache ∈ 'es' (Start)
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
    },
    einkaufen: {
      rolle: 'Verkäufer',
      schritte: [
        step('¡Hola! ¿Qué le pongo?', 'Hallo! Was darf es sein?',
             [ ok('Un kilo de pan, por favor.'), no('Me llamo Ana.'), no('Hasta luego.') ],
             'Sag, was du kaufen möchtest.'),
        step('¿Algo más?', 'Sonst noch etwas?',
             [ ok('No, gracias.'), no('Para dos noches.') ]),
        step('Son tres euros. ¿Quiere una bolsa?', 'Das macht drei Euro. Möchten Sie eine Tüte?',
             [ ok('Sí, una bolsa, por favor.'), no('A la estación, por favor.') ]),
        step('¿Paga en efectivo?', 'Zahlen Sie bar?',
             [ ok('Sí, en efectivo.'), no('Con leche, por favor.') ])
      ]
    },
    wegbeschreibung: {
      rolle: 'Passantin',
      schritte: [
        step('¿Sí? ¿Le puedo ayudar?', 'Ja? Kann ich Ihnen helfen?',
             [ ok('¿Dónde está la estación?'), no('Un café, por favor.'), no('Buenas noches.') ],
             'Frag nach dem Weg.'),
        step('Todo recto y después a la derecha.', 'Geradeaus und dann rechts.',
             [ ok('¿Está lejos?'), no('Para dos noches.') ]),
        step('No, cinco minutos. En la esquina.', 'Nein, fünf Minuten. An der Ecke.',
             [ ok('Muchas gracias.'), no('¿Tiene wifi?') ])
      ]
    },
    arzt: {
      rolle: 'Ärztin',
      schritte: [
        step('Buenos días. ¿Qué le pasa?', 'Guten Tag. Was fehlt Ihnen?',
             [ ok('Me duele la cabeza.'), no('Un café, por favor.'), no('Hasta luego.') ],
             'Sag, was dir weh tut.'),
        step('¿Desde cuándo?', 'Seit wann?',
             [ ok('Desde ayer.'), no('Para dos noches.') ]),
        step('¿Toma algún medicamento?', 'Nehmen Sie Medikamente?',
             [ ok('No, ninguno.'), no('Sí, una maleta.') ]),
        step('Le doy una receta. Descanse.', 'Ich gebe Ihnen ein Rezept. Ruhen Sie sich aus.',
             [ ok('Muchas gracias, doctora.'), no('La cuenta, por favor.') ])
      ]
    },
    bahnhof: {
      rolle: 'Schalterbeamter',
      schritte: [
        step('Buenos días. ¿Adónde viaja?', 'Guten Tag. Wohin fahren Sie?',
             [ ok('A Madrid, por favor.'), no('Un café con leche.'), no('Buenas noches.') ],
             'Nenne dein Reiseziel.'),
        step('¿Ida o ida y vuelta?', 'Einfach oder hin und zurück?',
             [ ok('Ida y vuelta, por favor.'), no('Con leche, por favor.') ]),
        step('Son veinte euros. Andén cuatro.', 'Das macht zwanzig Euro. Gleis vier.',
             [ ok('¿A qué hora sale?'), no('A nombre de Ana.') ]),
        step('A las diez. Lleva cinco minutos de retraso.', 'Um zehn. Er hat fünf Minuten Verspätung.',
             [ ok('Gracias, muy amable.'), no('Sí, una maleta.') ])
      ]
    },
    wetter: {
      rolle: 'Nachbarin',
      schritte: [
        step('¡Buenos días! Hoy hace calor, ¿verdad?', 'Guten Morgen! Heute ist es warm, oder?',
             [ ok('Sí, mucho calor.'), no('A la estación, por favor.'), no('Una habitación, por favor.') ],
             'Stimm ihr zu.'),
        step('¿Y mañana? ¿Sabe algo?', 'Und morgen? Wissen Sie was?',
             [ ok('Mañana está lloviendo.'), no('Para dos noches.') ]),
        step('Entonces llevo el paraguas.', 'Dann nehme ich den Regenschirm mit.',
             [ ok('Buena idea.'), no('La cuenta, por favor.') ])
      ]
    },
    familie: {
      rolle: 'Bekannter',
      schritte: [
        step('¿Vives aquí con tu familia?', 'Wohnst du hier mit deiner Familie?',
             [ ok('Sí, con mis padres.'), no('Un café, por favor.'), no('Hasta luego.') ],
             'Erzähl von deiner Familie.'),
        step('¿Y tienes hermanos?', 'Und hast du Geschwister?',
             [ ok('Sí, una hermana.'), no('Para dos noches.') ]),
        step('¿Dónde vive ella?', 'Wo wohnt sie?',
             [ ok('Vive en Madrid.'), no('Sí, una maleta.') ]),
        step('¡Qué bien! Saludos a tu familia.', 'Wie schön! Grüße an deine Familie.',
             [ ok('Gracias, igualmente.'), no('¿Qué hora es?') ])
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
