/* ──────────────────────────────────────────────────────────────────────────
   learnroman-daten.js — DER LERNROMAN (fester Inhalt, kein API-Call).
   Root-Helfer wie haeppchen-db.js / wortschatz.js / sprichwort.js.
   KEIN vercel.json-Eintrag (statische Datei, keine Function).

     window.spikiuLearnroman(zielsprache, muttersprache) → Buch | null

   Ein Buch (so, wie der Raum es bekommt — schon in SEINER Muttersprache):
     { buch, zielsprache, muttersprache, titel, untertitel, einheit,
       teile:{fundament,aufbau,anwendung},        // Teil-Titel (Zielsprache)
       etappen:[{id,nm}, …],                       // Anzeigenamen in der MUTTERSPRACHE
       kapitel:[{level, n, thema, title, teaser, body:[…]}] }

   Block-Typen im body (Schlüssel SPRACHNEUTRAL — nie de:/es:, weil Deutsch mal
   Ziel- und mal Muttersprache ist):
     {na:'…'}          Erzählung in der MUTTERSPRACHE (Regie, Innensicht) · kein Audio
     {z:'…', tr:'…'}   ZIELSPRACHE, eine Zeile/ein Zug · tr optional (Brücke) · 🔊
     {p:'…'}           fließende ZIELSPRACH-Prosa (nur Etappe Anwendung) · kein tr · 🔊

   EIN BUCH, MEHRERE MUTTERSPRACHEN (neu 15.10.2026): In einem Buch dürfen na,
   tr und teaser Objekte {de, en, …} sein — wie in lernpfad-daten.js. Ein
   spanischer Roman bedient so den deutschen UND den englischen Lerner. Beim
   Nachschlagen wird die Muttersprache ausgewählt; der Raum sieht nur Strings.

   thema (neu): die Themen-ID des Geführten Gesprächs, zu der eine Station
   gehört ('taxi', 'cafe', …) — der Raum verlinkt am Ende dorthin. null = keine.

   Buch 1 „El año de Lukas" steht in learnroman-lukas.js (Leo, 15.10.2026:
   jede Station = eine Szene des Geführten Gesprächs). Er ersetzt den alten
   „Lukas in Madrid" (4 Kapitel, 05.08.) — der alte Text liegt in der Git-Historie.
   Buch 2 „Marta en Berlín" ist unverändert.
   ────────────────────────────────────────────────────────────────────────── */
(function (w) {
  if (w.spikiuLearnroman) return;

  // ── Etappen: IDs sind kanonisch und fest, die ANZEIGENAMEN sind lokalisiert
  //    (Auftrag 05.08. §5 — für eine Madrilenin sind drei deutsche Wörter an der
  //    wichtigsten Stelle des Bildschirms eine Mauer, kein Wegweiser). ──
  var ETAPPEN_IDS = ['fundament', 'aufbau', 'anwendung'];
  var ETAPPEN_NAMEN = {
    de: { fundament: 'Fundament',   aufbau: 'Aufbau',      anwendung: 'Anwendung' },
    es: { fundament: 'Fundamentos', aufbau: 'Ampliación',  anwendung: 'En práctica' },
    // en: VORSCHLAG aus dem Auftrag, von Leo noch NICHT bestätigt.
    en: { fundament: 'Foundations', aufbau: 'Building up', anwendung: 'In practice' }
  };
  function etappenFuer(mutter) {
    var n = ETAPPEN_NAMEN[mutter] || ETAPPEN_NAMEN.de;
    return ETAPPEN_IDS.map(function (id) { return { id: id, nm: n[id] }; });
  }

  // ── Mehrsprachige Felder: String bleibt String, {de,en} → die Muttersprache. ──
  function lokal(v, mutter) {
    if (v == null || typeof v === 'string') return v;
    return v[mutter] || v.de || v.en || v.es || '';
  }
  function blockFuer(b, mutter) {
    var o = {};
    if (b.na != null) o.na = lokal(b.na, mutter);
    if (b.z  != null) o.z  = b.z;
    if (b.tr != null) o.tr = lokal(b.tr, mutter);
    if (b.p  != null) o.p  = b.p;
    return o;
  }

  // ══ BUCH 1 · „El año de Lukas" — Zielsprache es, Muttersprachen de + en ═════
  //    Inhalt in learnroman-lukas.js (muss VOR dieser Datei geladen sein).
  var LUKAS = (w.SPIKIU_LR_LUKAS && w.SPIKIU_LR_LUKAS.K) || [];

  // ══ BUCH 2 · „Marta en Berlín" — Zielsprache de, Muttersprache es ══════════
  // Ziel-Anteil je Kapitel: 27 / 39 / 41 / 100 % (gemessen, Auftrag §3).
  var MARTA = [
 {level:'fundament',n:1,title:'Der Flughafen',teaser:'Marta aterriza en Berlín y nadie aplaude.',body:[
   {na:'Martes, las tres y veinte. El avión toca tierra en el aeropuerto BER. Cielo gris, hierba muy verde, edificios cuadrados y bajos.'},
   {na:'Y algo no pasa: nadie aplaude. En España aplaude medio pasaje. Aquí, silencio.'},
   {na:'Vale. Bienvenida a Alemania.'},
   {na:'Por los altavoces, una voz dice algo. Marta entiende dos palabras:'},
   {z:'Gepäckausgabe. Ausgang.',tr:'Recogida de equipajes. Salida.'},
   {na:'Seis meses de apps, doscientas palabras. Pero el alemán a velocidad real es otra cosa.'},
   {na:'Cinta número 7. Una maleta. No es la suya. Otra. Tampoco. Por fin, la maleta amarilla con su pegatina.'},
   {na:'Fuera, una ráfaga de aire frío. Septiembre en Berlín ya es otoño.'},
   {na:'En la cola de taxis, un hombre le hace una seña. Su taxi es un Mercedes. Por supuesto.'},
   {z:'Guten Tag. Wohin?',tr:'Buenas tardes. ¿A dónde?'},
   {z:'Oranienstraße 47. Kreuzberg, bitte.'},
   {z:'Kreuzberg. Alles klar. Ist das Ihr erstes Mal in Berlin?',tr:'Todo claro. ¿Es su primera vez en Berlín?'},
   {z:'Ja. Mein erstes Mal.'},
   {z:'Dann willkommen. Berlin ist groß, aber freundlich.',tr:'Pues bienvenida. Berlín es grande, pero amable.'},
   {z:'Breite Straßen, Straßenbahnen, überall Fahrräder. Viele Leute in Schwarz. Viel roter Backstein.',tr:'Calles anchas, tranvías, bicis por todas partes. Mucha gente de negro. Mucho ladrillo rojo.'},
   {z:'Woher kommen Sie?',tr:'¿De dónde viene usted?'},
   {z:'Ich komme aus Spanien. Aus Madrid.'},
   {z:'Ah, Madrid! Real Madrid. Sehr gut.'},
   {na:'Por supuesto. El fútbol. Es lo mismo en todas partes. Marta no lo sigue, pero asiente.'},
   {z:'Ja, ja. Real Madrid.'},
   {z:'Berlin ist schön. Aber kalt. Im Winter sehr kalt.',tr:'Berlín es bonito. Pero frío. En invierno, muy frío.'},
   {na:'Marta capta tres palabras y sonríe. El truco universal del extranjero: asentir y sonreír.'},
   {z:'Vierzig Minuten später hält das Taxi in Kreuzberg. Bäume, Balkone mit Pflanzen, große bunte Graffiti.',tr:'Cuarenta minutos después, el taxi para en Kreuzberg. Árboles, balcones con plantas, grafitis grandes y de colores.'},
   {na:'No es el Berlín de las postales. Le gusta más así.'},
   {z:'Achtundvierzig Euro fünfzig.',tr:'Cuarenta y ocho con cincuenta.'},
   {na:'Marta no entiende el número rápido. Mira la pantalla: 48,50 €. Da un billete de cincuenta y unas monedas.'},
   {z:'Willkommen in Berlin.',tr:'Bienvenida a Berlín.'},
   {z:'Danke schön. Und schönen Abend noch.',tr:'Muchas gracias. Y que tenga buena tarde.'},
   {na:'El taxi se va. Marta se queda sola en la acera con la maleta amarilla.'},
   {z:'Ein dunkles Holzportal, Nummer 47. Daneben viele Klingeln. Sie sucht den Namen: Becker, 3. Stock.',tr:'Un portal de madera oscura, número 47. Al lado, muchos timbres. Busca el nombre: Becker, 3er piso.'},
   {na:'Aprieta el timbre. Ahora empieza todo.'},
   {z:'Ja?'},
   {z:'Hallo... ich bin Marta.'},
   {z:'Marta! Endlich! Komm rauf, dritter Stock!',tr:'¡Marta! ¡Por fin! ¡Sube, tercer piso!'},
   {z:'Die Tür links. Ich mache schon auf.',tr:'La puerta de la izquierda. Ya te abro.'},
   {na:'El portal zumba. Dentro: olor a madera vieja, luces amarillas, escaleras grandes y elegantes.'},
   {na:'Los edificios de Berlín huelen distinto a los de Madrid. Ni mejor ni peor. Otro.'},
   {na:'Tres pisos. Con maleta. Marta sube despacio.'}]},

 {level:'fundament',n:2,title:'Meine neue WG',teaser:'Pan negro, tres quesos y un bávaro que dice Servus.',body:[
   {z:'Drinnen riecht es nach starkem Kaffee. Hohe Decken, ein Holzboden, der knarrt, ein Fahrrad an der Wand.',tr:'Dentro huele a café fuerte. Techos altos, un suelo de madera que cruje, una bici en la pared.'},
   {z:'Das ist der Flur. Hier links die Küche. Geradeaus das Wohnzimmer. Und hinten die Zimmer.',tr:'Este es el pasillo. A la izquierda la cocina. Recto el salón. Y al fondo las habitaciones.'},
   {na:'Marta capta tres palabras: Küche, Wohnzimmer, Zimmer. Lo demás se escapa. Sonríe y asiente. El truco universal, otra vez.'},
   {z:'In der Küche ist jemand.',tr:'En la cocina hay alguien.'},
   {z:'Ein Mann um die dreißig, blondes Haar, alte Jeans. Er schneidet ein dunkles, schweres Brot.',tr:'Un hombre de unos treinta, pelo rubio, vaqueros viejos. Corta un pan oscuro y pesado.'},
   {na:'Como un ladrillo.'},
   {z:'Servusss! Du musst die Marta sein! I bin der Felix!',tr:'¡Holaaa! ¡Tú debes de ser Marta! ¡Yo soy Felix!'},
   {na:'Servus? I bin? Marta ha estudiado Hallo, no Servus. Y ich bin, no i bin. Aquí pasa algo raro.'},
   {z:'Er kommt aus Bayern. Aus München. Er spricht ein bisschen anders.',tr:'Viene de Baviera. De Múnich. Habla un poco diferente.'},
   {z:'Hallo, Felix. Ich bin Marta. Ich bin aus Madrid.'},
   {z:'Madrid! Olé! Ich liebe Madrid. Sangría, paella, Fiesta!'},
   {na:'El mismo cliché en todas partes. Pero lo dice con tanto entusiasmo que es difícil enfadarse.'},
   {z:'Jetzt kommt noch jemand ins Zimmer.',tr:'Ahora entra alguien más en la habitación.'},
   {z:'Eine Frau, Ende dreißig, kurzes braunes Haar, runde Brille. Sie geht sehr ruhig.',tr:'Una mujer de casi cuarenta, pelo castaño corto, gafas redondas. Camina muy tranquila.'},
   {z:'Hallo. Ich bin Anna. Willkommen.'},
   {na:'Tres palabras. Voz baja. Una sonrisa pequeña pero verdadera.'},
   {na:'Anna es lo opuesto a Felix. Y los dos son alemanes.'},
   {z:'Anna kommt aus Hamburg. Sie ist Ingenieurin. Felix ist Musiker.',tr:'Anna viene de Hamburgo. Es ingeniera. Felix es músico.'},
   {na:'Norte y sur. Silencio y ruido. Y aquí viven juntos, aparentemente sin matarse.'},
   {z:'Komm, wir essen jetzt was. Du hast bestimmt Hunger nach dem Flug.',tr:'Ven, vamos a comer algo. Seguro que tienes hambre después del vuelo.'},
   {z:'Auf dem Tisch stehen Brot, Käse, Butter, Wurst, Gurken und vier Flaschen Bier.',tr:'Sobre la mesa hay pan, queso, mantequilla, embutido, pepinillos y cuatro botellas de cerveza.'},
   {na:'¿Esto es la cena? ¿No hay nada caliente?'},
   {z:'In Deutschland heißt das Abendbrot. Kein warmes Essen. Nur Brot, Käse, ein bisschen Fleisch. Und Bier, natürlich.',tr:'En Alemania se llama Abendbrot. Sin comida caliente. Solo pan, queso, un poco de carne. Y cerveza, claro.'},
   {na:'Abendbrot. Pan-de-la-tarde. Cena fría. Vale. Mente abierta.'},
   {z:'Magst du Bier?',tr:'¿Te gusta la cerveza?'},
   {z:'Ja. Danke.'},
   {z:'Prost! Auf Marta!',tr:'¡Salud! ¡Por Marta!'},
   {z:'Marta schaut jedem in die Augen, während die Flaschen sich treffen.',tr:'Marta mira a los ojos de cada uno mientras chocan las botellas.'},
   {na:'Lo leyó en un blog: si no miras a los ojos al brindar, son siete años de mala suerte en la cama. Marta no se arriesga.'},
   {z:'Sehr gut! Du schaust in die Augen. Du bist keine Touristin.',tr:'¡Muy bien! Miras a los ojos. No eres una turista.'},
   {na:'Cinco minutos en Berlín y ya he hecho algo bien.'},
   {z:'Das Brot ist dunkel und schwer. Es schmeckt nach Körnern und Kruste.',tr:'El pan es oscuro y pesado. Sabe a semillas y a corteza.'},
   {na:'No es el pan blanco español. Es un alimento de verdad, no un acompañamiento.'},
   {z:'Ein Käse ist sehr stark, fast scharf. Der zweite ist weich. Der dritte hat kleine Löcher.',tr:'Un queso es muy fuerte, casi pica. El segundo es suave. El tercero tiene agujeros pequeños.'},
   {na:'Nosotros tenemos manchego. Ellos, veintisiete quesos en una sola cena.'},
   {z:'Wo wohnst du in Madrid?',tr:'¿Dónde vives en Madrid?'},
   {z:'Ich wohne in Madrid. In... eh... cerca del centro.'},
   {z:'In der Nähe vom Zentrum.',tr:'Cerca del centro.'},
   {z:'In der Nähe vom Zentrum. Danke.'},
   {na:'Anna asiente y no dice nada más. Felix le enseñará las palabras divertidas, Jonas las prácticas. Anna, la lengua exacta.'},
   {z:'Du bist müde. Komm, ich zeige dir dein Zimmer.',tr:'Estás cansada. Ven, te enseño tu habitación.'},
   {z:'Gute Nacht. Danke für alles.'},
   {z:'Das Zimmer ist klein: ein Bett, ein Schreibtisch unter dem Fenster, ein Schrank von IKEA.',tr:'La habitación es pequeña: una cama, un escritorio bajo la ventana, un armario de IKEA.'},
   {na:'En Alemania también hay IKEA, por lo visto. Pero la ventana da a un patio con árboles de verdad. En Madrid veía un muro.'},
   {z:'Marta legt sich auf die Decke, ohne sich auszuziehen. Nur fünf Minuten, denkt sie.',tr:'Marta se tumba sobre la colcha sin desvestirse. Solo cinco minutos, piensa.'},
   {na:'Se duerme en treinta segundos.'},
   {z:'In der Küche macht Felix noch eine Flasche auf.',tr:'En la cocina, Felix abre otra botella.'},
   {z:'Sie ist nett, oder?',tr:'Es maja, ¿verdad?'},
   {z:'Ja. Sehr.'},
   {z:'Sie wird Berlin mögen.',tr:'A Marta le va a gustar Berlín.'},
   {na:'Y por alguna razón, los tres saben que Anna tiene razón.'}]},

 {level:'aufbau',n:3,title:'Der Stammtisch',teaser:'Cincuenta segundos de silencio — y nadie se muere.',body:[
   {na:'Jueves. Una semana en Berlín.'},
   {z:'Marta kannte jetzt die Straßen von Kreuzberg: die Bäckerei an der Ecke, den Supermarkt, den Kiosk mit der spanischen Wochenzeitung, die außer ihr niemand las.',tr:'Marta conocía ya las calles de Kreuzberg: la panadería de la esquina, el supermercado, el quiosco con el semanario español que no leía nadie excepto ella.'},
   {na:'Pequeños anclajes en una ciudad que todavía no se ha vuelto suya.'},
   {z:'Marta, kommst du mit? Wir gehen zum Stammtisch.',tr:'Marta, ¿vienes? Vamos al Stammtisch.'},
   {z:'Stammtisch: Stamm ist der Stamm eines Baumes, auch eine Gruppe. Tisch ist der Tisch. Der Tisch der Gruppe.',tr:'Stammtisch: Stamm es el tronco de un árbol, también un grupo. Tisch es la mesa. La mesa del grupo.'},
   {z:'Es ist immer derselbe Tisch, immer derselbe Tag, immer dieselben Leute. Niemand sonst darf sich an diesen Tisch setzen.',tr:'Es siempre la misma mesa, siempre el mismo día, siempre la misma gente. Nadie más puede sentarse a esa mesa.'},
   {na:'Como la tertulia española. Pero al revés.'},
   {z:'Anna kommt nicht mit?',tr:'¿Anna no viene?'},
   {z:'Nein, heute nicht. Viel Spaß.',tr:'No, hoy no. Que os divirtáis.'},
   {na:'Anna no va a los Stammtische. Marta lo entiende sin explicación. Anna escoge.'},
   {z:'Sie gingen zehn Minuten zu Fuß. Es war schon fast dunkel, obwohl es erst sieben war.',tr:'Anduvieron diez minutos. Ya era casi de noche, aunque solo eran las siete.'},
   {z:'Die Kneipe hieß Zum Goldenen Anker. Dunkles Holz, gelbes Licht, der Geruch von Bier und altem Holz.',tr:'La taberna se llamaba Al Ancla Dorada. Madera oscura, luz amarilla, olor a cerveza y madera vieja.'},
   {z:'Jonas grüßte den Kellner mit einem Nicken. Der Kellner nickte zurück. Kein Wort.',tr:'Jonas saludó al camarero con un gesto de cabeza. El camarero se lo devolvió. Ni una palabra.'},
   {na:'En España serían diez segundos de besos y ¿qué tal, Pepe? Aquí, un cabeceo. Y ya.'},
   {z:'Auf dem runden Tisch war ein Metallschild festgeschraubt: Stammtisch Die Donnerstagsfreunde, seit 1987.',tr:'En la mesa redonda había una placa metálica atornillada: Stammtisch Los Amigos del Jueves, desde 1987.'},
   {na:'Treinta y nueve años. Yo todavía no había nacido.'},
   {z:'Marta, das ist Herr Weber, er ist Lehrer. Frau Schmidt ist Journalistin. Und das ist Tom, er studiert Geschichte.',tr:'Marta, este es el señor Weber, es profesor. La señora Schmidt es periodista. Y este es Tom, estudia historia.'},
   {z:'Hallo. Ich bin Marta. Ich komme aus Madrid.'},
   {z:'Drei Nicken. Drei kleine Lächeln. Und dann keine einzige Nachfrage.',tr:'Tres asentimientos. Tres sonrisas pequeñas. Y después ni una sola pregunta.'},
   {na:'Nadie dice ¡ah, Madrid, qué bien! Nadie pregunta ¿y por qué viniste? Solo silencio.'},
   {z:'Fünf Bier. Fünf leise Danke. Marta schaute jedem in die Augen und sagte Prost.',tr:'Cinco cervezas. Cinco gracias en voz baja. Marta miró a los ojos de cada uno y dijo Prost.'},
   {z:'Und dann passierte nichts. Dreißig Sekunden. Vierzig. Fünfzig Sekunden Stille.',tr:'Y entonces no pasó nada. Treinta segundos. Cuarenta. Cincuenta segundos de silencio.'},
   {z:'Herr Weber blätterte um. Frau Schmidt schrieb etwas. Tom drehte einen Bierdeckel. Felix schaute zufrieden an die Decke.',tr:'El señor Weber pasó una página. La señora Schmidt escribió algo. Tom daba vueltas a un posavasos. Felix miraba al techo, satisfecho.'},
   {na:'¿He hecho algo mal? ¿Los estoy aburriendo? En España alguien ya estaría preguntando por mi familia, por mi novio, por todo.'},
   {z:'Magst du Berlin bisher?',tr:'¿Te gusta Berlín hasta ahora?'},
   {z:'Ja. Es ist anders als Madrid. Aber ich mag es.'},
   {z:'Frau Schmidt nickte, lächelte kurz und schrieb weiter. Sie brauchte nicht mehr.',tr:'La señora Schmidt asintió, sonrió brevemente y siguió escribiendo. No necesitaba más.'},
   {na:'Su pregunta era real, no rellena-silencio. Aquí no se habla para llenar el aire. Se habla cuando se tiene algo que decir.'},
   {z:'Noch eine Stille. Aber diesmal schwitzte Marta nicht.',tr:'Otro silencio. Pero esta vez Marta no sudó.'},
   {z:'Tom fragte Jonas etwas über einen Film. Felix unterbrach mit einer sehr starken Meinung. Drei Minuten Gespräch. Dann wieder Stille. Bequeme Stille.',tr:'Tom preguntó a Jonas algo sobre una película. Felix interrumpió con una opinión muy fuerte. Tres minutos de conversación. Después, otra vez silencio. Silencio cómodo.'},
   {na:'Como una respiración. Inhalar, exhalar. Hablar, callar.'},
   {z:'Ich muss gehen. Meine Frau wartet.',tr:'Tengo que irme. Mi mujer está esperando.'},
   {z:'Um zehn stand auch Frau Schmidt auf und sagte Auf Wiedersehen.',tr:'A las diez, la señora Schmidt se levantó también y dijo Auf Wiedersehen.'},
   {z:'Ohne die Älteren am Tisch wurde das Gespräch schneller, lauter, lustiger.',tr:'Sin los mayores en la mesa, la conversación se volvió más rápida, más alta, más divertida.'},
   {z:'Stimmt es, dass in Spanien die Siesta Pflicht ist? Esst ihr jeden Tag Paella?',tr:'¿Es verdad que en España la siesta es obligatoria? ¿Coméis paella todos los días?'},
   {z:'Wenn Marta ein Wort suchte, wartete Tom. Er füllte die Lücke nicht. Und wenn sie es fand, nickte er.',tr:'Cuando Marta buscaba una palabra, Tom esperaba. No rellenaba el hueco. Y cuando la encontraba, asentía.'},
   {na:'Tom escucha como Anna. Pero más cálido. Más curioso.'},
   {z:'Ich kann nicht mehr. Ich muss schlafen.',tr:'No puedo más. Tengo que dormir.'},
   {z:'Jeder zahlte genau das Seine.',tr:'Cada uno pagó exactamente lo suyo.'},
   {na:'En España pagaríamos a turnos, nos invitaríamos. Aquí, cada uno lo suyo. Y nadie lo vive como falta de generosidad.'},
   {z:'An einer Ecke blieb Tom stehen und schaute Marta direkt an.',tr:'En una esquina, Tom se detuvo y miró a Marta directamente.'},
   {z:'Marta, möchtest du nächste Woche einen Kaffee trinken? Mit mir?',tr:'Marta, ¿quieres tomar un café la próxima semana? ¿Conmigo?'},
   {na:'Una invitación. Directa. Sin rodeos. Muy alemana. Pero muy clara.'},
   {z:'Ja. Gerne.'},
   {z:'Bis dann.'},
   {z:'Felix gab ihr einen kleinen Stoß an die Schulter. Jonas lächelte, ohne sie anzusehen.',tr:'Felix le dio un golpecito en el hombro. Jonas sonrió sin mirarla.'},
   {na:'Hoy he aprendido algo: el silencio alemán no está vacío. Es un espacio. Y dentro caben muchas cosas, incluso una invitación a un café.'},
   {z:'Tom hat sehr dunkle Augen. Sehr ernst. Aber wenn er lächelt, lächelt er ganz.'},
   {na:'Su primera observación afectiva en su nueva vida.'}]},

 {level:'anwendung',n:4,title:'In der Bäckerei',teaser:'Dreißig Sorten Brötchen — und eine Frau, die sich Gesichter merkt.',body:[
   {p:'Sonntagmorgen, halb neun. Die Wohnung war still. Felix schlief, Jonas war bei Freunden in Prenzlauer Berg, und Anna war laufen gegangen, wie jeden Morgen um halb acht, auch im Winter.'},
   {p:'Marta hatte Hunger und einen Plan: allein in die Bäckerei gehen. Ohne Jonas als Übersetzer, ohne Felix als Anfeuerer. Nur sie, ihre zehn angesammelten Tage Deutsch und ein Berliner Bäcker, der vermutlich keine Zeit für Gestotter hatte.'},
   {p:'Ich gehe in die Bäckerei. Ich bestelle etwas. Ich bezahle. Ich gehe wieder raus. Vier Handlungen. Das schaffe ich.'},
   {p:'Draußen war Berlin am Sonntag eine andere Stadt: leiser, fast ohne Autos, Paare mit Hunden, langsame Radfahrer. In Madrid wären die Terrassen um diese Zeit schon voll. Hier atmete die Stadt.'},
   {p:'Drei Straßen weiter, an der Ecke zur Skalitzer Straße, lag die Bäckerei, an der sie jeden Tag vorbeiging und die sie noch nie betreten hatte. Eine schmale, dunkelgrün gestrichene Fassade, ein handgemaltes Schild: BÄCKEREI SCHULTZ — seit 1962. Im Schaufenster Körbe voller Brot, ein angeschnittener Apfelkuchen, kleine Pappschilder mit handgeschriebenen Preisen.'},
   {p:'Marta drückte die Tür auf. Eine Glocke klingelte. Drinnen der sofortige, mächtige Geruch von frisch gebackenem Brot — der Geruch, der einen Hunger weckt, von dem man nichts gewusst hatte.'},
   {p:'Der Laden war klein: Glasvitrinen rechts, eine alte Registrierkasse links, Regale mit Kaffee und Marmelade im Hintergrund. Vor ihr standen schon drei Leute. Marta stellte sich hinten an und beobachtete. Erst schauen, dann sprechen — Regel Nummer eins für Ausländer.'},
   {p:'Hinter dem Tresen stand eine Frau von etwa fünfundsechzig Jahren. Kurzes Haar, weiß mit einem blonden Rest, eine kleine Brille auf der Nasenspitze, eine weiße Schürze mit grün gesticktem Logo. Schnelle Hände. Für jeden Kunden ein kurzes, aber echtes Lächeln.'},
   {p:'Die erste Kundin bestellte etwas sehr Schnelles. Marta verstand nur drei Brötchen und ein Vollkornbrot. Bezahlen, Wechselgeld, schönen Sonntag, weg. Der zweite Kunde war noch schneller. Die dritte, eine Frau in Martas Alter, nahm einen Kaffee zum Mitnehmen und ein Croissant. Croissant verstand sie — Croissant ist international, Gott sei Dank.'},
   {p:'Und plötzlich war sie dran. Die Frau hob den Blick über die kleine Brille hinweg.'},
   {p:'—Was darf es sein?'},
   {p:'Marta verstand den Satz nicht genau, aber sie verstand die Frage. Sie schaute in die Vitrine und erstarrte. So viele Brote. So viele Brötchen. Runde, längliche, mit Körnern, mit Mehl bestäubt, manche fast schwarz, manche fast weiß. Ich kenne die Namen nicht. Ich weiß nicht, was ich will.'},
   {p:'Sie zeigte mit dem Finger auf ein rundes Brötchen mit Sesam. —Äh... das, bitte. Und das. Und das.'},
   {p:'Frau Schultz nahm die drei mit der Zange und legte sie in eine braune Papiertüte. —Sonst noch was?'},
   {p:'Und hier tat Marta etwas, das sie nicht geplant hatte. Etwas Mutiges. Etwas, das sie in Madrid ohne Nachdenken täte, das aber auf Deutsch Kraft kostete. Sie stellte eine Frage.'},
   {p:'—Entschuldigung... was ist das?'},
   {p:'Frau Schultz schaute hin. Eine Pause. Und dann ihr erstes vollständiges Lächeln. —Das ist ein Sesambrötchen. Mit Sesam. Sehr lecker mit Käse.'},
   {p:'—Sesambrötchen, wiederholte Marta langsam. —Genau.'},
   {p:'Und dann, weil Berliner Bäckerinnen manchmal Zeit haben, wenn eine Kundin es verdient, zeigte Frau Schultz auf die anderen beiden. —Das ist ein Mohnbrötchen. Und das hier ist ein Roggenbrötchen. Aus Roggen. Etwas dunkler. Sehr deutsch.'},
   {p:'Marta wiederholte jedes Wort, und ihr Gehirn legte sie ab wie ein Kind, das zum ersten Mal die Namen der Dinge bekommt.'},
   {p:'—Bist du neu hier? —Ja. Ich komme aus Spanien. Aus Madrid. Ich bin hier neun Monate.'},
   {p:'—Madrid. Schön. Ich war einmal in Madrid, vor vielen Jahren. Sehr heiß.'},
   {p:'Eine Berlinerin, die vor Jahrzehnten in Madrid war und sich an die Hitze erinnert. Hinter Marta räusperte sich jemand leise — kleiner Berliner Druck. Frau Schultz kehrte zur normalen Geschwindigkeit zurück. —Drei Brötchen. Zwei Euro zehn.'},
   {p:'Marta zahlte mit einem Fünfer. Und dann nahm Frau Schultz ein viertes Brötchen aus der Vitrine und legte es dazu.'},
   {p:'—Das ist ein Käsebrötchen. Mit Käse oben. Probier mal. Geschenk.'},
   {p:'Geschenk. Marta wusste nicht, was sie sagen sollte. Frau Schultz hatte ihr, ohne es zu wissen, gerade einen Anker im Viertel gegeben.'},
   {p:'—Vielen Dank. Vielen, vielen Dank. Frau Schultz machte eine kleine Handbewegung, die nichts zu danken hieß. —Komm wieder.'},
   {p:'Draußen klingelte die Glocke noch einmal. Die Papiertüte war warm in ihren Händen, weil die Brötchen frisch aus dem Ofen kamen. Marta ging langsam nach Hause — langsam, weil gerade etwas Gutes passiert war und sie nicht wollte, dass es endete.'},
   {p:'Im Hausflur, bevor sie hochging, öffnete sie die Tüte, nahm das Käsebrötchen heraus und biss hinein, ohne auf die Wohnung zu warten. Es war gut. Wirklich gut. Kein Käse und Brot, sondern kräftiger Käse, außen knusprig, innen weich. Eine einfache Sache, sehr gut gemacht.'},
   {p:'In der Küche legte sie die Brötchen in einen Korb, machte Kaffee, holte Butter und Marmelade und frühstückte allein am Fenster.'},
   {p:'Anna kam vom Laufen zurück, als Marta beim zweiten Kaffee war. Sie sah den Korb und lächelte. —Du warst bei Frau Schultz. —Ja. Allein. Mein erstes Mal.'},
   {p:'Anna goss sich Kaffee ein, nahm ein Brötchen und strich Butter darauf. —Sie ist eine gute Frau. Sie merkt sich Gesichter.'},
   {p:'Und Marta verstand, dass dieser Satz ein Segen war. Eine Frau, die sich mein Gesicht merkt, in einer Stadt, die mich noch nicht kennt.'},
   {p:'An diesem Abend schrieb Marta vier Wörter in das Heft, in dem sie ihr neues Deutsch sammelte: Sesambrötchen, Mohnbrötchen, Roggenbrötchen, Käsebrötchen — Geschenk. Und darunter, auf Spanisch, eine persönliche Notiz: Frau Schultz se acuerda de mi cara.'}]}
  ];

  // ── Die Bücher. Ein neues Sprachpaar = ein weiterer Eintrag.
  //    muttersprachen: für welche Lerner das Buch geschrieben ist. ──
  var BUECHER = [
    { buch: 'el-ano-de-lukas', zielsprache: 'es', muttersprachen: ['de', 'en'],
      titel: 'El año de Lukas',
      untertitel: { de: 'Ein Papier, eine Stadt, neun Monate. Jede Station ist eine Szene aus dem Geführten Gespräch.',
                    en: 'One document, one city, nine months. Every stop is a scene from Guided Conversation.' },
      einheit: 'station',
      teile: { fundament: 'Vecino de Madrid', aufbau: 'La visita', anwendung: 'Hasta luego' },
      kapitel: LUKAS },
    { buch: 'marta-berlin', zielsprache: 'de', muttersprachen: ['es'],
      titel: 'Marta en Berlín', einheit: 'kapitel', kapitel: MARTA }
  ];

  // Ein Buch in EINER Muttersprache (zwischengespeichert, damit der Raum
  // immer dasselbe Objekt bekommt).
  var CACHE = {};
  function fuer(b, mutter) {
    var key = b.buch + ':' + mutter;
    if (CACHE[key]) return CACHE[key];
    CACHE[key] = {
      buch: b.buch, zielsprache: b.zielsprache, muttersprache: mutter,
      titel: b.titel, untertitel: lokal(b.untertitel, mutter) || '',
      einheit: b.einheit || 'kapitel', teile: b.teile || {},
      etappen: etappenFuer(mutter),
      kapitel: b.kapitel.map(function (c) {
        return { level: c.level, n: c.n, thema: c.thema || null, title: c.title,
                 teaser: lokal(c.teaser, mutter),
                 body: c.body.map(function (bl) { return blockFuer(bl, mutter); }) };
      })
    };
    return CACHE[key];
  }

  // ── Öffentlich: Buch zum Sprachpaar oder null (nie werfen, nie erfinden). ──
  w.spikiuLearnroman = function (zielsprache, muttersprache) {
    var ziel = zielsprache || '', mutter = muttersprache || '';
    for (var i = 0; i < BUECHER.length; i++) {
      var b = BUECHER[i];
      if (b.zielsprache === ziel && b.muttersprachen.indexOf(mutter) > -1 && b.kapitel.length) return fuer(b, mutter);
    }
    return null;
  };
  // Reihenfolge/IDs der Etappen für die Freischaltung im Raum.
  w.spikiuLearnroman.etappenIds = ETAPPEN_IDS.slice();
  // Welche Sprachpaare gibt es überhaupt? (für einen ehrlichen leeren Zustand)
  w.spikiuLearnroman.paare = [];
  BUECHER.forEach(function (b) {
    b.muttersprachen.forEach(function (m) {
      w.spikiuLearnroman.paare.push({ zielsprache: b.zielsprache, muttersprache: m, titel: b.titel });
    });
  });

})(window);
