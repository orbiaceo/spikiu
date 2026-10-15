/* ===================================================================
   sprichwort.js — Sprichwort des Tages (Spikiu)
   -------------------------------------------------------------------
   Liefert EIN Sprichwort pro Tag in der ZIELSPRACHE des Nutzers,
   IMMER mit Übersetzung in seine MUTTERSPRACHE. Quelle ohne Link.
   Rein lokal (kein Server, keine API) — rotiert nach Kalendertag.

   Einbindung (klassisch, wie nav.js):
     <script src="sprichwort.js" defer></script>
   Dann im Dashboard:
     var s = window.spikiuSprichwort(profile.zielsprache, profile.muttersprache);
     // s = { text, translation, src }   text = Zielsprache, translation = Muttersprache

   KURATION: Diese Listen sind ein Start-Satz. Leonardo (Linguist) pflegt
   und erweitert sie — die kanonische Wahrheit lebt in dieser Datei.
   Regeln: text = echte Wendung in der Zielsprache; t.de/t.es/t.en =
   treue Übersetzung; src = Gattung ohne Link (z. B. „Refrán español").
   Seit 15.10.2026 auch Griechisch als Muttersprache: t.el/w.el.
=================================================================== */
(function (w) {
  'use strict';

  /* icon: Emoji als Schlüssel → self-hosted OpenMoji-SVG in bilder/om-*.svg
     (Dateiname = Codepunkte ohne FE0F). Nur wo ein Bild trägt; sonst weglassen,
     dann zeigt die Karte KEIN Icon (Leo 17.08./27.09.: keine Einheits-Schriftrolle). */
  /* w: WÖRTLICHE Übersetzung je Muttersprache (Leo, 28.09.): erscheint, wenn der
     Lerner auf den Satz tippt. Fehlt w, sagt t schon wörtlich dasselbe → kein Tipp nötig. */
  var SPRICHWOERTER = {
    es: [
      { text: 'Quien mucho abarca, poco aprieta.', icon: 'sp-abarcar', src: 'Refrán español',
        w: { de: 'Wer viel umfasst, drückt wenig zusammen.', en: 'Who embraces much, squeezes little.', el: 'Όποιος αγκαλιάζει πολλά, σφίγγει λίγα.' },
        t: { de: 'Wer zu viel auf einmal will, schafft am Ende wenig.', en: 'Grasp all, lose all.', el: 'Όποιος κυνηγάει δύο λαγούς, δεν πιάνει κανέναν.' } },
      { text: 'A buen entendedor, pocas palabras bastan.', icon: '👂', src: 'Refrán español',
        w: { de: 'Einem guten Versteher genügen wenige Worte.', en: 'For a good understander, few words are enough.', el: 'Σε αυτόν που καταλαβαίνει καλά, λίγα λόγια αρκούν.' },
        t: { de: 'Dem Klugen genügen wenige Worte.', en: 'A word to the wise is enough.', el: 'Τοις συνετοίς ολίγα.' } },
      { text: 'No por mucho madrugar amanece más temprano.', icon: '🌅', src: 'Refrán español',
        w: { de: 'Nicht weil man sehr früh aufsteht, wird es früher Tag.', en: 'Not by getting up very early does day break sooner.', el: 'Όχι επειδή σηκώνεσαι πολύ νωρίς, ξημερώνει νωρίτερα.' },
        t: { de: 'Früher aufstehen lässt die Sonne nicht früher aufgehen.', en: 'Rising early won\u2019t make the sun come up sooner.', el: 'Όσο νωρίς κι αν ξυπνήσεις, ο ήλιος δεν θα βγει νωρίτερα.' } },
      { text: 'Más vale tarde que nunca.', icon: '⏰', src: 'Refrán español',
        w: { de: 'Mehr wert spät als nie.', en: 'Worth more late than never.', el: 'Αξίζει περισσότερο αργά παρά ποτέ.' },
        t: { de: 'Besser spät als nie.', en: 'Better late than never.', el: 'Κάλλιο αργά παρά ποτέ.' } },
      { text: 'Más vale pájaro en mano que ciento volando.', icon: '🐦', src: 'Refrán español',
        w: { de: 'Mehr wert ist ein Vogel in der Hand als hundert, die fliegen.', en: 'A bird in the hand is worth more than a hundred flying.', el: 'Αξίζει περισσότερο ένα πουλί στο χέρι παρά εκατό που πετούν.' },
        t: { de: 'Besser ein Spatz in der Hand als eine Taube auf dem Dach.', en: 'A bird in the hand is worth two in the bush.', el: 'Κάλλιο πέντε και στο χέρι παρά δέκα και καρτέρει.' } },
      { text: 'El que no arriesga, no gana.', icon: '🎲', src: 'Refrán español',
        w: { de: 'Wer nicht riskiert, gewinnt nicht.', en: 'He who doesn’t risk doesn’t win.', el: 'Όποιος δεν ρισκάρει, δεν κερδίζει.' },
        t: { de: 'Wer nicht wagt, der nicht gewinnt.', en: 'Nothing ventured, nothing gained.', el: 'Ο τολμών νικά.' } },
      { text: 'No dejes para mañana lo que puedas hacer hoy.', icon: '📅', src: 'Refrán español',
        w: { de: 'Lass nicht für morgen, was du heute tun kannst.', en: 'Don’t leave for tomorrow what you can do today.', el: 'Μην αφήνεις για αύριο ό,τι μπορείς να κάνεις σήμερα.' },
        t: { de: 'Verschiebe nicht auf morgen, was du heute tun kannst.', en: 'Don\u2019t put off until tomorrow what you can do today.', el: 'Μην αφήνεις για αύριο ό,τι μπορείς να κάνεις σήμερα.' } },
      { text: 'Poco a poco se anda lejos.', icon: '🐢', src: 'Refrán español',
        w: { de: 'Wenig um wenig geht man weit.', en: 'Little by little one walks far.', el: 'Λίγο λίγο περπατάς μακριά.' },
        t: { de: 'Schritt für Schritt kommt man weit.', en: 'Little by little, one goes far.', el: 'Σιγά σιγά γίνεται η αγουρίδα μέλι.' } },
      {"text":"A quien madruga, Dios le ayuda.","icon":"🌄","src":"Refrán español","w":{"de":"Wer früh aufsteht, dem hilft Gott.","en":"Whoever gets up early, God helps him.","el":"Όποιον ξυπνάει νωρίς, τον βοηθάει ο Θεός."},"t":{"de":"Morgenstund hat Gold im Mund.","en":"The early bird catches the worm.","el":"Όποιος ξυπνά νωρίς, κερδίζει τη μέρα."}},
      {"text":"En casa del herrero, cuchillo de palo.","icon":"🔪","src":"Refrán español","w":{"de":"Im Haus des Schmieds ein Messer aus Holz.","en":"In the blacksmith’s house, a wooden knife.","el":"Στο σπίτι του σιδερά, μαχαίρι από ξύλο."},"t":{"de":"Der Schuster trägt die schlechtesten Schuhe.","en":"The shoemaker’s children go barefoot.","el":"Του τσαγκάρη τα παιδιά είναι ξυπόλητα."}}
    ],
    de: [
      { text: 'Übung macht den Meister.', icon: '🛠️', src: 'Deutsches Sprichwort',
        w: { es: 'La práctica hace al maestro.', en: 'Practice makes the master.', el: 'Η εξάσκηση κάνει τον μάστορα.' },
        t: { es: 'La práctica hace al maestro.', en: 'Practice makes perfect.', el: 'Η εξάσκηση κάνει τον μάστορα.' } },
      { text: 'Morgenstund hat Gold im Mund.', icon: '🌄', src: 'Deutsches Sprichwort',
        w: { es: 'La hora de la mañana tiene oro en la boca.', en: 'The morning hour has gold in its mouth.', el: 'Η πρωινή ώρα έχει χρυσάφι στο στόμα.' },
        t: { es: 'A quien madruga, Dios le ayuda.', en: 'The early bird catches the worm.', el: 'Όποιος ξυπνά νωρίς, κερδίζει τη μέρα.' } },
      { text: 'Aller Anfang ist schwer.', icon: '🌱', src: 'Deutsches Sprichwort',
        w: { es: 'Todo comienzo es difícil.', en: 'All beginning is hard.', el: 'Κάθε αρχή είναι δύσκολη.' },
        t: { es: 'Todo comienzo es difícil.', en: 'Every beginning is hard.', el: 'Κάθε αρχή και δύσκολη.' } },
      { text: 'Wer A sagt, muss auch B sagen.', icon: '🔤', src: 'Deutsches Sprichwort',
        w: { es: 'Quien dice A también tiene que decir B.', en: 'Who says A must also say B.', el: 'Όποιος λέει Α πρέπει να πει και Β.' },
        t: { es: 'Quien dice A, debe decir B.', en: 'In for a penny, in for a pound.', el: 'Όποιος μπει στον χορό, πρέπει να χορέψει.' } },
      {"text":"Der Apfel fällt nicht weit vom Stamm.","icon":"🍎","src":"Deutsches Sprichwort","w":{"es":"La manzana no cae lejos del tronco.","en":"The apple doesn’t fall far from the trunk.","el":"Το μήλο δεν πέφτει μακριά από τον κορμό."},"t":{"es":"De tal palo, tal astilla.","en":"The apple doesn’t fall far from the tree.","el":"Το μήλο κάτω από τη μηλιά θα πέσει."}},
      {"text":"Viele Köche verderben den Brei.","icon":"🍲","src":"Deutsches Sprichwort","w":{"es":"Muchos cocineros estropean la papilla.","en":"Many cooks spoil the porridge.","el":"Πολλοί μάγειρες χαλάνε τον χυλό."},"t":{"es":"Muchas manos en un plato hacen mucho garabato.","en":"Too many cooks spoil the broth.","el":"Όπου λαλούν πολλά κοκόρια, αργεί να ξημερώσει."}},
      {"text":"Was du heute kannst besorgen, das verschiebe nicht auf morgen.","icon":"📅","src":"Deutsches Sprichwort","w":{"es":"Lo que hoy puedes hacer, eso no lo aplaces a mañana.","en":"What you can see to today, don’t postpone that to tomorrow.","el":"Ό,τι μπορείς σήμερα να φροντίσεις, μην το αναβάλλεις για αύριο."},"t":{"es":"No dejes para mañana lo que puedas hacer hoy.","en":"Don’t put off until tomorrow what you can do today.","el":"Μην αφήνεις για αύριο ό,τι μπορείς να κάνεις σήμερα."}},
      {"text":"Kommt Zeit, kommt Rat.","icon":"⏰","src":"Deutsches Sprichwort","w":{"es":"Viene el tiempo, viene el consejo.","en":"Comes time, comes counsel.","el":"Έρχεται ο καιρός, έρχεται η συμβουλή."},"t":{"es":"Con el tiempo, todo se arregla.","en":"Time will tell.","el":"Ο χρόνος θα δείξει."}},
      {"text":"Lügen haben kurze Beine.","icon":"👣","src":"Deutsches Sprichwort","w":{"es":"Las mentiras tienen piernas cortas.","en":"Lies have short legs.","el":"Τα ψέματα έχουν κοντά πόδια."},"t":{"es":"Antes se coge al mentiroso que al cojo.","en":"Lies don’t get you far; the truth will out.","el":"Τα ψέματα έχουν κοντά ποδάρια."}},
      {"text":"Ende gut, alles gut.","icon":"👍","src":"Deutsches Sprichwort","w":{"es":"Final bueno, todo bueno.","en":"End good, all good.","el":"Τέλος καλό, όλα καλά."},"t":{"es":"Bien está lo que bien acaba.","en":"All’s well that ends well.","el":"Τέλος καλό, όλα καλά."}}
    ],
    en: [
      { text: 'Practice makes perfect.', icon: '🛠️', src: 'English proverb',
        w: { de: 'Übung macht perfekt.', es: 'La práctica hace perfecto.', el: 'Η εξάσκηση κάνει τέλειο.' },
        t: { de: 'Übung macht den Meister.', es: 'La práctica hace al maestro.', el: 'Η εξάσκηση κάνει τον μάστορα.' } },
      { text: 'Where there\u2019s a will, there\u2019s a way.', icon: '🧭', src: 'English proverb',
        w: { de: 'Wo es einen Willen gibt, gibt es einen Weg.', es: 'Donde hay voluntad, hay un camino.', el: 'Όπου υπάρχει θέληση, υπάρχει δρόμος.' },
        t: { de: 'Wo ein Wille ist, ist auch ein Weg.', es: 'Querer es poder.', el: 'Όπου υπάρχει θέληση, υπάρχει και τρόπος.' } },
      { text: 'Better late than never.', icon: '⏰', src: 'English proverb',
        w: { de: 'Besser spät als nie.', es: 'Mejor tarde que nunca.', el: 'Καλύτερα αργά παρά ποτέ.' },
        t: { de: 'Besser spät als nie.', es: 'Más vale tarde que nunca.', el: 'Κάλλιο αργά παρά ποτέ.' } },
      {"text":"The early bird catches the worm.","icon":"🐦","src":"English proverb","w":{"de":"Der frühe Vogel fängt den Wurm.","es":"El pájaro temprano atrapa el gusano.","el":"Το πρωινό πουλί πιάνει το σκουλήκι."},"t":{"de":"Morgenstund hat Gold im Mund.","es":"A quien madruga, Dios le ayuda.","el":"Όποιος ξυπνά νωρίς, κερδίζει τη μέρα."}},
      {"text":"Don’t judge a book by its cover.","icon":"📖","src":"English proverb","w":{"de":"Beurteile ein Buch nicht nach seinem Umschlag.","es":"No juzgues un libro por su portada.","el":"Μην κρίνεις ένα βιβλίο από το εξώφυλλό του."},"t":{"de":"Der Schein trügt.","es":"Las apariencias engañan.","el":"Τα φαινόμενα απατούν."}},
      {"text":"An apple a day keeps the doctor away.","icon":"🍎","src":"English proverb","w":{"de":"Ein Apfel pro Tag hält den Arzt fern.","es":"Una manzana al día mantiene al médico lejos.","el":"Ένα μήλο την ημέρα κρατά τον γιατρό μακριά."},"t":{"de":"Ein Apfel am Tag hält den Doktor fern.","es":"Una manzana al día, del médico te ahorrarías.","el":"Ένα μήλο την ημέρα, τον γιατρό τον κάνει πέρα."}},
      {"text":"Actions speak louder than words.","icon":"💬","src":"English proverb","w":{"de":"Taten sprechen lauter als Worte.","es":"Las acciones hablan más alto que las palabras.","el":"Οι πράξεις μιλούν πιο δυνατά από τα λόγια."},"t":{"de":"Taten sagen mehr als Worte.","es":"Obras son amores, que no buenas razones.","el":"Τα έργα μετράνε, όχι τα λόγια."}},
      {"text":"Don’t put all your eggs in one basket.","icon":"🥚","src":"English proverb","w":{"de":"Leg nicht alle deine Eier in einen Korb.","es":"No pongas todos tus huevos en una cesta.","el":"Μη βάζεις όλα τα αυγά σου σε ένα καλάθι."},"t":{"de":"Setz nicht alles auf eine Karte.","es":"No te lo juegues todo a una carta.","el":"Μην τα παίζεις όλα σε ένα χαρτί."}},
      {"text":"Two heads are better than one.","icon":"🤝","src":"English proverb","w":{"de":"Zwei Köpfe sind besser als einer.","es":"Dos cabezas son mejores que una.","el":"Δύο κεφάλια είναι καλύτερα από ένα."},"t":{"de":"Vier Augen sehen mehr als zwei.","es":"Cuatro ojos ven más que dos.","el":"Δύο μυαλά είναι καλύτερα από ένα."}},
      {"text":"Time is money.","icon":"💰","src":"English proverb","w":{"de":"Zeit ist Geld.","es":"El tiempo es dinero.","el":"Ο χρόνος είναι χρήμα."},"t":{"de":"Zeit ist Geld.","es":"El tiempo es oro.","el":"Ο χρόνος είναι χρήμα."}}
    ],
    el: [
      { text: 'Η γλώσσα κόκαλα δεν έχει και κόκαλα τσακίζει.', icon: '👅', src: 'Ελληνική παροιμία',
        w: { de: 'Die Zunge hat keine Knochen und bricht doch Knochen.', en: 'The tongue has no bones, yet it breaks bones.', es: 'La lengua no tiene huesos, pero rompe huesos.' },
        t: { de: 'Worte können tiefer verletzen als Schläge.', en: 'Words can hurt more than blows.', es: 'Las palabras pueden herir más que los golpes.' } },
      { text: 'Όπου λαλούν πολλά κοκόρια, αργεί να ξημερώσει.', icon: '🐓', src: 'Ελληνική παροιμία',
        w: { de: 'Wo viele Hähne krähen, wird es spät Tag.', en: 'Where many roosters crow, the day breaks late.', es: 'Donde cantan muchos gallos, tarda en amanecer.' },
        t: { de: 'Viele Köche verderben den Brei.', en: 'Too many cooks spoil the broth.', es: 'Muchas manos en un plato hacen mucho garabato.' } },
      {"text":"Κάλλιο αργά παρά ποτέ.","icon":"⏰","src":"Ελληνική παροιμία","w":{"de":"Besser spät als niemals.","es":"Mejor tarde que nunca.","en":"Better late than never."},"t":{"de":"Besser spät als nie.","es":"Más vale tarde que nunca.","en":"Better late than never."}},
      {"text":"Σιγά σιγά γίνεται η αγουρίδα μέλι.","icon":"🍇","src":"Ελληνική παροιμία","w":{"de":"Langsam, langsam wird die unreife Traube zu Honig.","es":"Poco a poco la uva verde se vuelve miel.","en":"Slowly, slowly the unripe grape turns into honey."},"t":{"de":"Gut Ding will Weile haben.","es":"Poco a poco se anda lejos.","en":"Rome wasn’t built in a day."}},
      {"text":"Κάλλιο πέντε και στο χέρι παρά δέκα και καρτέρει.","icon":"✋","src":"Ελληνική παροιμία","w":{"de":"Besser fünf und in der Hand als zehn und warte.","es":"Mejor cinco y en la mano que diez y espera.","en":"Better five and in the hand than ten and wait."},"t":{"de":"Besser den Spatz in der Hand als die Taube auf dem Dach.","es":"Más vale pájaro en mano que ciento volando.","en":"A bird in the hand is worth two in the bush."}},
      {"text":"Ο καλός ο καπετάνιος στη φουρτούνα φαίνεται.","icon":"🌊","src":"Ελληνική παροιμία","w":{"de":"Der gute Kapitän zeigt sich im Sturm.","es":"El buen capitán se ve en la tormenta.","en":"The good captain shows himself in the storm."},"t":{"de":"Wahres Können zeigt sich erst in der Not.","es":"En los momentos difíciles se ve quién vale.","en":"A smooth sea never made a skilled sailor."}},
      {"text":"Τα πολλά λόγια είναι φτώχεια.","icon":"💬","src":"Ελληνική παροιμία","w":{"de":"Die vielen Worte sind Armut.","es":"Las muchas palabras son pobreza.","en":"Many words are poverty."},"t":{"de":"Reden ist Silber, Schweigen ist Gold.","es":"Lo bueno, si breve, dos veces bueno.","en":"Least said, soonest mended."}},
      {"text":"Πες μου ποιος είναι ο φίλος σου, να σου πω ποιος είσαι.","icon":"🤝","src":"Ελληνική παροιμία","w":{"de":"Sag mir, wer dein Freund ist, damit ich dir sage, wer du bist.","es":"Dime quién es tu amigo, para decirte quién eres.","en":"Tell me who your friend is, so I can tell you who you are."},"t":{"de":"Sag mir, mit wem du umgehst, und ich sage dir, wer du bist.","es":"Dime con quién andas y te diré quién eres.","en":"A man is known by the company he keeps."}},
      {"text":"Όποιος βιάζεται, σκοντάφτει.","icon":"👣","src":"Ελληνική παροιμία","w":{"de":"Wer sich beeilt, stolpert.","es":"Quien se da prisa, tropieza.","en":"Whoever hurries stumbles."},"t":{"de":"Eile mit Weile.","es":"Vísteme despacio, que tengo prisa.","en":"More haste, less speed."}},
      {"text":"Όποιος δεν θέλει να ζυμώσει, δέκα μέρες κοσκινίζει.","icon":"🍞","src":"Ελληνική παροιμία","w":{"de":"Wer nicht kneten will, siebt zehn Tage lang.","es":"Quien no quiere amasar, se pasa diez días tamizando.","en":"Whoever doesn’t want to knead sifts for ten days."},"t":{"de":"Wer nicht will, findet Gründe.","es":"Quien no quiere hacer algo, siempre encuentra excusas.","en":"He who doesn’t want to do something finds an excuse."}}
    ]
  };


  /* WENDUNGEN — feste Redewendungen (keine Sprichwörter im engen Sinn).
     Eigene Liste, damit das „Sprichwort des Tages" (spikiuSprichwort) unberührt bleibt;
     der Raum proverbios.html mischt beide (Leo 01.09./27.09.: der Titel verspricht beides). */
  var WENDUNGEN = {
    es: [
      { text: 'Por si acaso.', icon: '☂️', src: 'Giro español',
        w: { de: 'Für den Fall (dass).', en: 'For the case (that).', el: 'Για την περίπτωση (που).' },
        t: { de: 'Für alle Fälle.', en: 'Just in case.', el: 'Για καλό και για κακό.' } },
      { text: 'Estar en las nubes.', icon: '☁️', src: 'Giro español',
        w: { de: 'In den Wolken sein.', en: 'To be in the clouds.', el: 'Είμαι στα σύννεφα.' },
        t: { de: 'Mit den Gedanken ganz woanders sein.', en: 'To have one\u2019s head in the clouds.', el: 'Είμαι στον κόσμο μου, με το μυαλό αλλού.' } },
      { text: 'Ser pan comido.', icon: '🍞', src: 'Giro español',
        w: { de: 'Gegessenes Brot sein.', en: 'To be eaten bread.', el: 'Είναι φαγωμένο ψωμί.' },
        t: { de: 'Ein Kinderspiel sein.', en: 'To be a piece of cake.', el: 'Είναι παιχνιδάκι.' } },
      { text: 'Echar una mano.', icon: '🤝', src: 'Giro español',
        w: { de: 'Eine Hand werfen.', en: 'To throw a hand.', el: 'Ρίχνω ένα χέρι.' },
        t: { de: 'Mit anpacken, helfen.', en: 'To lend a hand.', el: 'Δίνω ένα χέρι βοήθειας.' } },
      { text: 'Ponerse las pilas.', icon: '🔋', src: 'Giro español',
        w: { de: 'Sich die Batterien einlegen.', en: 'To put one\u2019s batteries in.', el: 'Βάζω τις μπαταρίες μου.' },
        t: { de: 'Sich ins Zeug legen.', en: 'To get one\u2019s act together.', el: 'Βάζω τα δυνατά μου.' } },
      { text: 'Estar como pez en el agua.', icon: '🐟', src: 'Giro español',
        w: { de: 'Wie ein Fisch im Wasser sein.', en: 'To be like a fish in water.', el: 'Είμαι σαν ψάρι στο νερό.' },
        t: { de: 'Sich pudelwohl fühlen.', en: 'To be in one\u2019s element.', el: 'Νιώθω σαν το ψάρι στο νερό.' } },
      { text: 'Costar un ojo de la cara.', icon: '💰', src: 'Giro español',
        w: { de: 'Ein Auge aus dem Gesicht kosten.', en: 'To cost an eye out of one\u2019s face.', el: 'Κοστίζει ένα μάτι από το πρόσωπο.' },
        t: { de: 'Ein Vermögen kosten.', en: 'To cost an arm and a leg.', el: 'Κοστίζει ο κούκος αηδόνι.' } },
      { text: 'Tomar el pelo a alguien.', icon: 'sp-pelo', src: 'Giro español',
        w: { de: 'Jemandem das Haar nehmen.', en: 'To take someone\u2019s hair.', el: 'Παίρνω τα μαλλιά σε κάποιον.' },
        t: { de: 'Jemanden auf den Arm nehmen.', en: 'To pull someone\u2019s leg.', el: 'Δουλεύω κάποιον, τον κοροϊδεύω.' } },
      {"text":"Meter la pata.","icon":"👣","src":"Giro español","w":{"de":"Die Pfote hineinstecken.","en":"To put the paw in.","el":"Βάζω το πόδι (του ζώου) μέσα."},"t":{"de":"Ins Fettnäpfchen treten.","en":"To put one’s foot in it.","el":"Τα κάνω θάλασσα, κάνω γκάφα."}},
      {"text":"Hablar por los codos.","icon":"💬","src":"Giro español","w":{"de":"Durch die Ellbogen reden.","en":"To talk through the elbows.","el":"Μιλάω από τους αγκώνες."},"t":{"de":"Wie ein Wasserfall reden.","en":"To talk nineteen to the dozen.","el":"Μιλάω ακατάπαυστα, το στόμα μου δεν σταματά."}}
    ],
    de: [
      { text: 'Stimmt so.', icon: '🪙', src: 'Deutsche Wendung',
        w: { es: 'Así está correcto.', en: 'It\u2019s right like that.', el: 'Έτσι είναι σωστό.' },
        t: { es: 'Así está bien, quédese con la vuelta.', en: 'Keep the change.', el: 'Κράτα τα ρέστα.' } },
      { text: 'Ich verstehe nur Bahnhof.', icon: '🚉', src: 'Deutsche Wendung',
        w: { es: 'Solo entiendo «estación de tren».', en: 'I only understand \u201ctrain station\u201d.', el: 'Καταλαβαίνω μόνο «σιδηροδρομικός σταθμός».' },
        t: { es: 'No entiendo nada.', en: 'It\u2019s all Greek to me.', el: 'Κινέζικα μου φαίνονται.' } },
      { text: 'Tomaten auf den Augen haben.', icon: '🍅', src: 'Deutsche Wendung',
        w: { es: 'Tener tomates en los ojos.', en: 'To have tomatoes on one\u2019s eyes.', el: 'Έχω ντομάτες στα μάτια.' },
        t: { es: 'No ver lo que está delante de las narices.', en: 'To be blind to the obvious.', el: 'Δεν βλέπω αυτό που είναι μπροστά στα μάτια μου.' } },
      { text: 'Das ist nicht mein Bier.', icon: '🍺', src: 'Deutsche Wendung',
        w: { es: 'Esa no es mi cerveza.', en: 'That\u2019s not my beer.', el: 'Αυτή δεν είναι η μπίρα μου.' },
        t: { es: 'No es asunto mío.', en: 'That\u2019s not my problem.', el: 'Δεν είναι δική μου δουλειά.' } },
      { text: 'Die Daumen drücken.', icon: '👍', src: 'Deutsche Wendung',
        w: { es: 'Apretar los pulgares.', en: 'To press the thumbs.', el: 'Πιέζω τους αντίχειρες.' },
        t: { es: 'Cruzar los dedos.', en: 'To keep one\u2019s fingers crossed.', el: 'Σταυρώνω τα δάχτυλα.' } },
      {"text":"Das ist mir Wurst.","icon":"🌭","src":"Deutsche Wendung","w":{"es":"Eso me es salchicha.","en":"That is sausage to me.","el":"Αυτό μου είναι λουκάνικο."},"t":{"es":"Me da igual.","en":"I couldn’t care less.","el":"Μου είναι αδιάφορο."}},
      {"text":"Jemandem auf den Keks gehen.","icon":"🍪","src":"Deutsche Wendung","w":{"es":"Ir a alguien sobre la galleta.","en":"To go on someone’s biscuit.","el":"Πηγαίνω σε κάποιον πάνω στο μπισκότο."},"t":{"es":"Sacar de quicio a alguien, dar la lata.","en":"To get on someone’s nerves.","el":"Δίνω σε κάποιον στα νεύρα."}},
      {"text":"Alles in Butter.","icon":"🧈","src":"Deutsche Wendung","w":{"es":"Todo en mantequilla.","en":"Everything in butter.","el":"Όλα σε βούτυρο."},"t":{"es":"Todo va bien, todo en orden.","en":"Everything’s fine.","el":"Όλα μέλι γάλα."}},
      {"text":"Den Nagel auf den Kopf treffen.","icon":"🛠","src":"Deutsche Wendung","w":{"es":"Dar al clavo en la cabeza.","en":"To hit the nail on the head.","el":"Χτυπάω το καρφί στο κεφάλι."},"t":{"es":"Dar en el clavo.","en":"To hit the nail on the head.","el":"Το βρίσκω ακριβώς, πέφτω διάνα."}},
      {"text":"Schwein haben.","src":"Deutsche Wendung","w":{"es":"Tener cerdo.","en":"To have pig.","el":"Έχω γουρούνι."},"t":{"es":"Tener suerte, tener potra.","en":"To be lucky.","el":"Είμαι τυχερός, έχω γούρι."}}
    ],
    en: [
      { text: 'It\u2019s raining cats and dogs.', icon: '🌧️', src: 'English phrase',
        w: { de: 'Es regnet Katzen und Hunde.', es: 'Llueven gatos y perros.', el: 'Βρέχει γάτες και σκύλους.' },
        t: { de: 'Es regnet in Strömen.', es: 'Llueve a cántaros.', el: 'Βρέχει καρεκλοπόδαρα.' } },
      { text: 'It\u2019s a piece of cake.', icon: '🍰', src: 'English phrase',
        w: { de: 'Das ist ein Stück Kuchen.', es: 'Es un trozo de tarta.', el: 'Είναι ένα κομμάτι κέικ.' },
        t: { de: 'Das ist ein Kinderspiel.', es: 'Es pan comido.', el: 'Είναι παιχνιδάκι.' } },
      { text: 'Break a leg!', icon: '🎭', src: 'English phrase',
        w: { de: 'Brich dir ein Bein!', es: '¡Rómpete una pierna!', el: 'Σπάσε ένα πόδι!' },
        t: { de: 'Hals- und Beinbruch!', es: '¡Mucha suerte!', el: 'Καλή επιτυχία!' } },
      { text: 'To feel under the weather.', icon: '🤒', src: 'English phrase',
        w: { de: 'Sich unter dem Wetter fühlen.', es: 'Sentirse bajo el tiempo.', el: 'Νιώθω κάτω από τον καιρό.' },
        t: { de: 'Nicht ganz auf dem Damm sein.', es: 'Estar pachucho.', el: 'Δεν νιώθω και πολύ καλά.' } },
      {"text":"To break the ice.","icon":"🧊","src":"English phrase","w":{"de":"Das Eis brechen.","es":"Romper el hielo.","el":"Σπάω τον πάγο."},"t":{"de":"Das Eis brechen.","es":"Romper el hielo.","el":"Σπάω τον πάγο."}},
      {"text":"To spill the beans.","src":"English phrase","w":{"de":"Die Bohnen verschütten.","es":"Derramar las judías.","el":"Χύνω τα φασόλια."},"t":{"de":"Ein Geheimnis ausplaudern.","es":"Irse de la lengua.","el":"Τα λέω όλα, προδίδω το μυστικό."}},
      {"text":"To hit the sack.","icon":"🛏","src":"English phrase","w":{"de":"Den Sack schlagen.","es":"Golpear el saco.","el":"Χτυπάω το σακί."},"t":{"de":"Sich aufs Ohr hauen.","es":"Irse a la cama, irse al sobre.","el":"Πέφτω για ύπνο."}},
      {"text":"Once in a blue moon.","icon":"🌙","src":"English phrase","w":{"de":"Einmal bei einem blauen Mond.","es":"Una vez en una luna azul.","el":"Μια φορά σε ένα μπλε φεγγάρι."},"t":{"de":"Alle Jubeljahre.","es":"De Pascuas a Ramos.","el":"Μια στις χίλιες."}},
      {"text":"To call it a day.","src":"English phrase","w":{"de":"Es einen Tag nennen.","es":"Llamarlo un día.","el":"Το ονομάζω μέρα."},"t":{"de":"Feierabend machen.","es":"Dejarlo por hoy.","el":"Τα μαζεύουμε για σήμερα."}},
      {"text":"To be all ears.","icon":"👂","src":"English phrase","w":{"de":"Ganz Ohren sein.","es":"Ser todo orejas.","el":"Είμαι όλος αυτιά."},"t":{"de":"Ganz Ohr sein.","es":"Ser todo oídos.","el":"Είμαι όλος αυτιά."}}
    ],
    el: [
      { text: 'Τα έκανε θάλασσα.', icon: '🌊', src: 'Ελληνική έκφραση',
        w: { de: 'Er hat es zum Meer gemacht.', en: 'He made it into sea.', es: 'Lo hizo mar.' },
        t: { de: 'Er hat alles vermasselt.', en: 'He made a total mess of it.', es: 'Lo echó todo a perder.' } },
      { text: 'Κάνω την πάπια.', icon: '🦆', src: 'Ελληνική έκφραση',
        w: { de: 'Ich mache die Ente.', en: 'I do the duck.', es: 'Hago el pato.' },
        t: { de: 'Sich dumm stellen.', en: 'To play dumb.', es: 'Hacerse el sueco.' } },
      {"text":"Κινέζικα μου φαίνονται.","icon":"🔤","src":"Ελληνική έκφραση","w":{"de":"Chinesisch scheinen sie mir.","es":"Me parecen chino.","en":"They look like Chinese to me."},"t":{"de":"Ich verstehe nur Bahnhof.","es":"Me suena a chino.","en":"It’s all Greek to me."}},
      {"text":"Κοστίζει ο κούκος αηδόνι.","icon":"💰","src":"Ελληνική έκφραση","w":{"de":"Der Kuckuck kostet (so viel wie) eine Nachtigall.","es":"El cuco cuesta (lo que) un ruiseñor.","en":"The cuckoo costs (as much as) a nightingale."},"t":{"de":"Das kostet mehr, als es wert ist.","es":"Sale más caro el collar que el perro.","en":"It costs far more than it’s worth."}},
      {"text":"Βρέχει καρεκλοπόδαρα.","icon":"☂","src":"Ελληνική έκφραση","w":{"de":"Es regnet Stuhlbeine.","es":"Llueven patas de silla.","en":"It’s raining chair legs."},"t":{"de":"Es regnet in Strömen.","es":"Llueve a cántaros.","en":"It’s raining cats and dogs."}},
      {"text":"Σιγά τα αυγά!","icon":"🥚","src":"Ελληνική έκφραση","w":{"de":"Langsam die Eier!","es":"¡Despacio los huevos!","en":"Slowly the eggs!"},"t":{"de":"Na und? Keine große Sache!","es":"¡Vaya cosa!","en":"Big deal!"}},
      {"text":"Μου μπήκαν ψύλλοι στ’ αυτιά.","icon":"👂","src":"Ελληνική έκφραση","w":{"de":"Mir sind Flöhe in die Ohren gekommen.","es":"Se me metieron pulgas en las orejas.","en":"Fleas got into my ears."},"t":{"de":"Ich bin misstrauisch geworden.","es":"Me da mala espina.","en":"I smell a rat."}},
      {"text":"Κάνω τα στραβά μάτια.","src":"Ελληνική έκφραση","w":{"de":"Ich mache die schiefen Augen.","es":"Hago los ojos torcidos.","en":"I make the crooked eyes."},"t":{"de":"Ein Auge zudrücken.","es":"Hacer la vista gorda.","en":"To turn a blind eye."}},
      {"text":"Τα βρήκαμε.","icon":"🤝","src":"Ελληνική έκφραση","w":{"de":"Wir haben sie gefunden.","es":"Los encontramos.","en":"We found them."},"t":{"de":"Wir haben uns geeinigt.","es":"Nos hemos puesto de acuerdo.","en":"We’ve worked it out."}},
      {"text":"Τον έπιασα στα πράσα.","src":"Ελληνική έκφραση","w":{"de":"Ich habe ihn in den Lauchstangen erwischt.","es":"Lo pillé en los puerros.","en":"I caught him in the leeks."},"t":{"de":"Ich habe ihn auf frischer Tat ertappt.","es":"Lo pillé con las manos en la masa.","en":"I caught him red-handed."}}
    ]
  };

  // Kalendertag-Index (lokal, rotiert täglich, gleich für alle Geräte am selben Tag)
  function dayIndex() {
    return Math.floor(Date.now() / 86400000);
  }

  /**
   * spikiuSprichwort(zielsprache, muttersprache)
   * @returns {{text:string, translation:string, src:string}}
   *   text        = Sprichwort in der Zielsprache
   *   translation = Übersetzung in die Muttersprache (immer gesetzt)
   *   src         = Quelle/Gattung (ohne Link)
   */
  w.spikiuSprichwort = function (zielsprache, muttersprache) {
    var list = SPRICHWOERTER[zielsprache] || SPRICHWOERTER.es;
    var p = list[dayIndex() % list.length];
    var tr = (p.t && (p.t[muttersprache] || p.t.de || p.t.en || p.t.es)) || '';
    return { text: p.text, translation: tr, src: p.src };
  };

  // optionaler Direktzugriff auf die Daten (für Kuration/Tests)
  w.spikiuSprichwort.daten = SPRICHWOERTER;
  w.spikiuSprichwort.wendungen = WENDUNGEN;

})(window);
