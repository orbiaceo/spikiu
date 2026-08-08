/* ═══════════════════════════════════════════════════════════════════
   szenen-daten.js — gebackene geführte Szenen (0 Tokens · Premium-frei)
   Struktur:  zielsprache → thema → { titel, rahmen, start, nodes }
   Sprache = FELD.  z = Zielsprache (was gesprochen/gelernt wird).
                    tr/rahmen/titel = pro Muttersprache (Brücke).
   Knoten:  { z, tr, opt:[{z, to, keep?, blunt?}] }
   Endknoten: { z, tr, ende:true }
   Regler kommt aus profile.koennen (anfang zeigt Brücke, mittel Tipp, fortg. keine).
   Inhalt wird separat autoriert; hier eine Saat für es.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  var DB = {
    es: {
      cafe: {
        titel:{de:'Im Café', es:'En el café', en:'At the café'},
        rahmen:{de:'Üben wir im Café. Ich bin der Kellner, du bist der Gast.',
                es:'Practiquemos en un café. Yo soy el camarero, tú el cliente.',
                en:'Let us practice at a café. I am the waiter, you are the guest.'},
        start:'n1',
        nodes:{
          n1:{z:'Buenos días, ¿qué le pongo?', tr:{de:'Guten Tag, was darf ich Ihnen bringen?', en:'Good morning, what can I get you?'},
              opt:[{z:'Un café con leche, por favor.', to:'ok', keep:'café con leche'},
                   {z:'Quiero café.', to:'blunt', korr:['Quiero café.','Un café, por favor.']},
                   {z:'¿Qué tienen?', to:'menu'}]},
          blunt:{z:'Claro. ¿Con leche o solo?', tr:{de:'Klar. Mit Milch oder schwarz?', en:'Sure. With milk or black?'},
              opt:[{z:'Con leche, por favor.', to:'ok', keep:'café con leche'},
                   {z:'Solo, por favor.', to:'ok2', keep:'café solo'}]},
          menu:{z:'Tenemos café, tostadas y zumo de naranja.', tr:{de:'Wir haben Kaffee, Toasts und Orangensaft.', en:'We have coffee, toast and orange juice.'},
              opt:[{z:'Un café con leche, por favor.', to:'ok', keep:'café con leche'},
                   {z:'Un zumo de naranja.', to:'juice', keep:'zumo de naranja'}]},
          ok:{z:'Marchando. ¿Algo para comer?', tr:{de:'Kommt sofort. Etwas zu essen?', en:'Coming right up. Anything to eat?'},
              opt:[{z:'Una tostada, gracias.', to:'food'},{z:'No, nada más.', to:'drink'}]},
          ok2:{z:'Un café solo. ¿Algo más?', tr:{de:'Einen schwarzen Kaffee. Sonst noch was?', en:'A black coffee. Anything else?'},
              opt:[{z:'Una tostada, por favor.', to:'food'},{z:'Nada más, gracias.', to:'drink'}]},
          juice:{z:'Un zumo recién hecho. ¿Algo más?', tr:{de:'Ein frisch gepresster Saft. Sonst noch was?', en:'A freshly made juice. Anything else?'},
              opt:[{z:'Una tostada también.', to:'food'},{z:'No, gracias.', to:'drink'}]},
          food:{z:'Perfecto. Enseguida se lo traigo. ¡Que aproveche!', tr:{de:'Perfekt. Ich bring es sofort. Guten Appetit!', en:'Perfect. Right away. Enjoy your meal!'}, ende:true},
          drink:{z:'Muy bien. Enseguida. ¡Que tenga un buen día!', tr:{de:'Sehr gut. Sofort. Einen schönen Tag noch!', en:'Very good. Right away. Have a good day!'}, ende:true}
        }
      }
    },
    de: {}, en: {}, el: {}
  };

  function get(ziel, thema){ return (DB[ziel] && DB[ziel][thema]) || null; }
  function themen(ziel){ return Object.keys(DB[ziel] || {}); }

  window.spikiuSzenen = { db: DB, get: get, themen: themen };
})();
