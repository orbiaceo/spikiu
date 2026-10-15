/* ═══════════════════════════════════════════════════════════════════
   taller-daten.js — statische Lesewerkstatt-Texte (Phase 1 · 0 Tokens)
   EIN Speicher für ALLE Zielsprachen. Sprache = FELD.
   Getaggt nach  zielsprache → koennen → [Einträge].
   Fremde Schrift (el): "lautschrift" gesetzt. Sonst null.
   Aufgaben-Typen: "mc" (feste Lösung), "orden" (feste Reihung),
   "frei" (offen → NUR Premium/live bewertet, hier nur als Prompt).
   Inhalt wird separat autoriert; hier eine Saat für es.
   MUTTERSPRACHE-Felder (rahmen, bruecke.t, frage, erklaerung, schluss,
   glossar-Werte) dürfen ein String ODER ein Objekt {de, es, en, el} sein;
   taller.html wählt profile.muttersprache (Fallback de). Zielsprachige
   Felder bleiben Strings. (es-Texte brauchen keinen es-Schlüssel: wer
   Spanisch als Muttersprache hat, bekommt keine es-Texte.)
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var DB = {
    es: {
      anfang: [
        { id:'es-anf-cafe', thema:'cafe',
          rahmen:{de:'Ein Schild an einer Café-Tür.',en:'A sign on a café door.',el:'Μια πινακίδα στην πόρτα ενός καφέ.'},
          texto:'Cerrado por vacaciones. Volvemos el 3 de agosto.',
          bruecke:[{w:'cerrado',t:{de:'geschlossen',en:'closed',el:'κλειστό'}},{w:'vacaciones',t:{de:'Urlaub',en:'holidays',el:'διακοπές'}},{w:'volvemos',t:{de:'wir kommen zurück',en:'we\'ll be back',el:'επιστρέφουμε'}}],
          lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:{de:'Warum ist das Café zu?',en:'Why is the café closed?',el:'Γιατί είναι κλειστό το καφέ;'},optionen:['Por vacaciones','Por obras','Por la lluvia'],loesung:0,erklaerung:{de:'Im Text: «Cerrado por vacaciones».',en:'In the text: «Cerrado por vacaciones».',el:'Στο κείμενο: «Cerrado por vacaciones».'}},
            {typ:'orden',frage:{de:'Bring die Teile in die richtige Reihenfolge.',en:'Put the pieces in the right order.',el:'Βάλε τα κομμάτια στη σωστή σειρά.'},teile:['de agosto','Volvemos','el 3'],loesung:[1,2,0]},
            {typ:'frei',frage:{de:'Wann warst du zuletzt im Urlaub? Schreib einen Satz auf Spanisch.',en:'When were you last on holiday? Write a sentence in Spanish.',el:'Πότε πήγες τελευταία φορά διακοπές; Γράψε μια πρόταση στα ισπανικά.'}}
          ],
          glossar:{cerrado:{de:'geschlossen',en:'closed',el:'κλειστό'},por:{de:'wegen',en:'because of',el:'λόγω'},vacaciones:{de:'Urlaub',en:'holidays',el:'διακοπές'},volvemos:{de:'wir kommen zurück',en:'we\'ll be back',el:'επιστρέφουμε'},el:{de:'der',en:'the',el:'ο'},de:{de:'von',en:'of',el:'από, του'},agosto:{de:'August',en:'August',el:'Αύγουστος'}},
          schluss:{de:'Ein Schild verstehen — schon eine kleine Eroberung.',en:'Understanding a sign — already a small conquest.',el:'Να καταλαβαίνεις μια πινακίδα — ήδη μια μικρή κατάκτηση.'} }
      ],
      mittel: [
        { id:'es-mit-mensaje', thema:'mensaje',
          rahmen:{de:'Eine kurze Nachricht von einer Freundin.',en:'A short message from a friend.',el:'Ένα σύντομο μήνυμα από μια φίλη.'},
          texto:'¡Hola! Esta tarde no puedo quedar, tengo médico. ¿Nos vemos mañana para un café?',
          bruecke:null, lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:'¿Por qué no puede quedar esta tarde?',optionen:['Tiene médico','Está de viaje','Trabaja'],loesung:0,erklaerung:'«tengo médico».'},
            {typ:'orden',frage:{de:'Ordne die Antwort.',en:'Put the reply in order.',el:'Βάλε την απάντηση σε σειρά.'},teile:['para un café','mañana','Nos vemos'],loesung:[2,1,0]},
            {typ:'frei',frage:{de:'Antworte ihr: Kannst du morgen? Schreib deine Antwort.',en:'Reply to her: can you make it tomorrow? Write your answer.',el:'Απάντησέ της: μπορείς αύριο; Γράψε την απάντησή σου.'}}
          ],
          glossar:{hola:{de:'Hallo',en:'hello',el:'γεια'},esta:{de:'diese',en:'this',el:'αυτό το'},tarde:{de:'Nachmittag',en:'afternoon',el:'απόγευμα'},no:{de:'nicht',en:'not',el:'δεν'},puedo:{de:'ich kann',en:'I can',el:'μπορώ'},quedar:{de:'sich treffen',en:'to meet up',el:'να βρεθούμε'},tengo:{de:'ich habe',en:'I have',el:'έχω'},médico:{de:'Arzt',en:'doctor',el:'γιατρός'},nos:{de:'uns',en:'us',el:'μας'},vemos:{de:'wir sehen',en:'we see',el:'βλέπουμε'},mañana:{de:'morgen',en:'tomorrow',el:'αύριο'},para:{de:'für',en:'for',el:'για'},un:{de:'ein',en:'a',el:'ένας, ένα'},café:{de:'Kaffee',en:'coffee',el:'καφές'}},
          schluss:{de:'Du hast eine echte Nachricht verstanden — genau darum geht es.',en:'You understood a real message — that\'s exactly the point.',el:'Κατάλαβες ένα αληθινό μήνυμα — αυτό ακριβώς μετράει.'} }
      ],
      fortgeschritten: [
        { id:'es-for-mercado', thema:'articulo',
          rahmen:'Un breve artículo de un periódico local.',
          texto:'El pequeño mercado del barrio, que llevaba más de cincuenta años abierto, cerrará sus puertas a final de mes. Los vecinos, sorprendidos, han organizado una recogida de firmas para intentar salvarlo.',
          bruecke:null, lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:'¿Qué han hecho los vecinos?',optionen:['Una recogida de firmas','Una fiesta','Nada'],loesung:0,erklaerung:'«han organizado una recogida de firmas».'},
            {typ:'orden',frage:'Ordena la frase.',teile:['a final de mes','El mercado','cerrará'],loesung:[1,2,0]},
            {typ:'frei',frage:'¿Qué opinas de que cierren los comercios de barrio? Escribe un par de frases.'}
          ],
          glossar:{el:{de:'der',en:'the',el:'ο'},pequeño:{de:'klein',en:'small',el:'μικρός'},mercado:{de:'Markt',en:'market',el:'αγορά'},del:{de:'vom',en:'of the',el:'του, της'},barrio:{de:'Viertel',en:'neighbourhood',el:'γειτονιά'},que:{de:'der/die/das',en:'which, that',el:'που'},llevaba:{de:'war (seit)',en:'had been (for)',el:'ήταν (εδώ και)'},más:{de:'mehr',en:'more',el:'περισσότερα'},de:{de:'von',en:'of',el:'από'},cincuenta:{de:'fünfzig',en:'fifty',el:'πενήντα'},años:{de:'Jahre',en:'years',el:'χρόνια'},abierto:{de:'geöffnet',en:'open',el:'ανοιχτός'},cerrará:{de:'wird schließen',en:'will close',el:'θα κλείσει'},sus:{de:'seine',en:'its',el:'του, της'},puertas:{de:'Türen',en:'doors',el:'πόρτες'},a:{de:'am',en:'at',el:'στο'},final:{de:'Ende',en:'end',el:'τέλος'},mes:{de:'Monat',en:'month',el:'μήνας'},los:{de:'die',en:'the',el:'οι'},vecinos:{de:'Nachbarn',en:'neighbours',el:'γείτονες'},sorprendidos:{de:'überrascht',en:'surprised',el:'έκπληκτοι'},han:{de:'haben',en:'have',el:'έχουν'},organizado:{de:'organisiert',en:'organised',el:'οργανώσει'},una:{de:'eine',en:'a',el:'μια'},recogida:{de:'Sammlung',en:'collection',el:'συλλογή'},firmas:{de:'Unterschriften',en:'signatures',el:'υπογραφές'},para:{de:'um zu',en:'in order to',el:'για να'},intentar:{de:'versuchen',en:'to try',el:'να προσπαθήσουν'},salvarlo:{de:'es zu retten',en:'to save it',el:'να τη σώσουν'}},
          schluss:'Leer un artículo entero, sin puente. Eso ya es otro nivel.' }
      ]
    },
    de: { anfang:[], mittel:[], fortgeschritten:[] },
    en: { anfang:[], mittel:[], fortgeschritten:[] },
    el: { anfang:[], mittel:[], fortgeschritten:[] }
  };

  function pick(ziel, koennen, seenIds){
    var byLvl = (DB[ziel] || {})[koennen] || [];
    if(!byLvl.length) return null;
    seenIds = seenIds || [];
    var fresh = byLvl.filter(function(e){ return seenIds.indexOf(e.id) < 0; });
    var pool = fresh.length ? fresh : byLvl;   // alle gesehen → wieder von vorn
    return pool[Math.floor(Math.random() * pool.length)];
  }

  window.spikiuTaller = { db: DB, pick: pick, levels: ['anfang','mittel','fortgeschritten'] };
})();
