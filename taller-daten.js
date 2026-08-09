/* ═══════════════════════════════════════════════════════════════════
   taller-daten.js — statische Lesewerkstatt-Texte (Phase 1 · 0 Tokens)
   EIN Speicher für ALLE Zielsprachen. Sprache = FELD.
   Getaggt nach  zielsprache → koennen → [Einträge].
   Fremde Schrift (el): "lautschrift" gesetzt. Sonst null.
   Aufgaben-Typen: "mc" (feste Lösung), "orden" (feste Reihung),
   "frei" (offen → NUR Premium/live bewertet, hier nur als Prompt).
   Inhalt wird separat autoriert; hier eine Saat für es.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var DB = {
    es: {
      anfang: [
        { id:'es-anf-cafe', thema:'cafe',
          rahmen:'Ein Schild an einer Café-Tür.',
          texto:'Cerrado por vacaciones. Volvemos el 3 de agosto.',
          bruecke:[{w:'cerrado',t:'geschlossen'},{w:'vacaciones',t:'Urlaub'},{w:'volvemos',t:'wir kommen zurück'}],
          lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:'Warum ist das Café zu?',optionen:['Por vacaciones','Por obras','Por la lluvia'],loesung:0,erklaerung:'Im Text: «Cerrado por vacaciones».'},
            {typ:'orden',frage:'Bring die Teile in die richtige Reihenfolge.',teile:['de agosto','Volvemos','el 3'],loesung:[1,2,0]},
            {typ:'frei',frage:'Wann warst du zuletzt im Urlaub? Schreib einen Satz auf Spanisch.'}
          ],
          glossar:{cerrado:'geschlossen',por:'wegen',vacaciones:'Urlaub',volvemos:'wir kommen zurück',el:'der',de:'von',agosto:'August'},
          schluss:'Ein Schild verstehen — schon eine kleine Eroberung.' }
      ],
      mittel: [
        { id:'es-mit-mensaje', thema:'mensaje',
          rahmen:'Eine kurze Nachricht von einer Freundin.',
          texto:'¡Hola! Esta tarde no puedo quedar, tengo médico. ¿Nos vemos mañana para un café?',
          bruecke:null, lautschrift:null,
          aufgaben:[
            {typ:'mc',frage:'¿Por qué no puede quedar esta tarde?',optionen:['Tiene médico','Está de viaje','Trabaja'],loesung:0,erklaerung:'«tengo médico».'},
            {typ:'orden',frage:'Ordne die Antwort.',teile:['para un café','mañana','Nos vemos'],loesung:[2,1,0]},
            {typ:'frei',frage:'Antworte ihr: Kannst du morgen? Schreib deine Antwort.'}
          ],
          glossar:{hola:'Hallo',esta:'diese',tarde:'Nachmittag',no:'nicht',puedo:'ich kann',quedar:'sich treffen',tengo:'ich habe',médico:'Arzt',nos:'uns',vemos:'wir sehen',mañana:'morgen',para:'für',un:'ein',café:'Kaffee'},
          schluss:'Du hast eine echte Nachricht verstanden — genau darum geht es.' }
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
          glossar:{el:'der',pequeño:'klein',mercado:'Markt',del:'vom',barrio:'Viertel',que:'der/die/das',llevaba:'war (seit)',más:'mehr',de:'von',cincuenta:'fünfzig',años:'Jahre',abierto:'geöffnet',cerrará:'wird schließen',sus:'seine',puertas:'Türen',a:'am',final:'Ende',mes:'Monat',los:'die',vecinos:'Nachbarn',sorprendidos:'überrascht',han:'haben',organizado:'organisiert',una:'eine',recogida:'Sammlung',firmas:'Unterschriften',para:'um zu',intentar:'versuchen',salvarlo:'es zu retten'},
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
