// ── SPIKIU READER · GERMAN · A2 ────────────────────────
// Marta, una joven española de Madrid, llega a Berlín
// para hacer un Erasmus de Arquitectura.
// Free tier: 3 chapters available (3, 4, 5)

export const GERMAN_A2 = {
  meta: {
    targetLang: 'German',
    nativeLang: 'Español',
    level: 'A2',
    protagonist: 'Marta',
    setting: 'Berlin',
    totalChapters: 12,
    freeChapters: [3, 4, 5]
  },

  chapters: [

    // ════════════════════════════════════════════
    // CHAPTER 3 — DER STAMMTISCH
    // ════════════════════════════════════════════
    {
      number: 3,
      title: 'Der Stammtisch',
      subtitle: 'En el que Marta descubre que los alemanes pueden estar callados — y eso no significa que están enfadados.',
      grammarFocus: 'Trennbare Verben — los verbos separables',
      semanticField: 'Kneipe & Stammtisch',

      reader: `<p>Es martes por la noche. Marta está sentada en la cama de su pequeña habitación en Kreuzberg. Tiene un poco de frío — el sistema de calefacción alemán le sigue resultando un misterio. <span class="de">¿Cómo es posible que tengas que <strong>aufdrehen</strong> el radiador con una llave especial?</span></p>

<p>Su compañero de piso, Jonas, llamó a su puerta hace cinco minutos. <span class="de">"Marta, kommst du mit zum Stammtisch?"</span> <span class="de-help">Marta, ¿vienes con nosotros al Stammtisch?</span></p>

<p>Marta sabía lo que era un Stammtisch porque lo había buscado en internet: <em>un grupo de gente que se reúne regularmente en el mismo bar, en la misma mesa, el mismo día.</em> Muy alemán. Muy estructurado.</p>

<p>Dijo que sí sin pensarlo.</p>

<p>Ahora, mientras se pone el abrigo, se arrepiente un poco. <span class="de">¿Y si nadie habla? ¿Y si todos hablan demasiado rápido?</span></p>

<p>La <span class="de">Eckkneipe</span> está a cinco minutos a pie. <span class="de-help">Una taberna de barrio en una esquina.</span> Cuando entran, Marta ve una mesa al fondo con cuatro personas. Una mesa redonda, con cervezas y nada más. Sin tapas. Sin aceitunas. Solo cervezas.</p>

<p><span class="de">"Hallo, Marta!"</span> dice una mujer rubia. <span class="de">"Ich bin Anna. Setz dich!"</span> <span class="de-help">Hola, soy Anna. Siéntate.</span></p>

<p>Marta se sienta. Jonas la presenta: <span class="de">"Das ist Marta. Sie kommt aus Spanien."</span></p>

<p>Cuatro pares de ojos la miran. Silencio. Marta espera que alguien diga algo. Nadie habla.</p>

<p><em>¿Es que nadie pregunta nada?</em> piensa. <em>En Madrid ya me habrían preguntado de dónde, qué hago aquí, si me gusta Berlín, si tengo novio, si...</em></p>

<p>Finalmente, un hombre con barba — Tom — dice: <span class="de">"Was trinkst du?"</span> <span class="de-help">¿Qué bebes?</span></p>

<p><span class="de">"Ein Bier, bitte."</span> <span class="de-help">Una cerveza, por favor.</span></p>

<p>Tom asiente. Pide la cerveza. Más silencio. Marta empieza a sudar un poquito.</p>

<p>Después de un minuto largo, Anna se vuelve hacia ella: <span class="de">"Und... wie gefällt dir Berlin?"</span> <span class="de-help">¿Y cómo te gusta Berlín?</span></p>

<p>Marta respira. <span class="de">"Es ist... anders. Aber gut."</span> <span class="de-help">Es diferente. Pero bien.</span></p>

<p>Tom sonríe por primera vez. <span class="de">"Was findest du anders?"</span></p>

<p>Marta piensa. <span class="de">"In Spanien... wir reden viel. Hier... ist es ruhiger."</span></p>

<p>Anna se ríe. <span class="de">"Ja, das ist wahr. Wir Deutsche reden nur, wenn wir etwas zu sagen haben."</span> <span class="de-help">Sí, es verdad. Los alemanes solo hablamos cuando tenemos algo que decir.</span></p>

<p>Marta entiende algo importante en ese momento: el silencio aquí no es incómodo. <em>El silencio es respeto.</em> Cada uno espera su turno. Cada uno escucha de verdad.</p>

<p>Pasan las horas. Marta habla con Anna sobre su universidad. Tom le explica algo complicado sobre la política de Berlín que ella entiende a medias. Y luego — milagro — empiezan a contar chistes. Jonas le traduce uno: trata sobre un alemán, un austriaco y un suizo. Marta no entiende del todo, pero se ríe.</p>

<p>A las once, Anna dice: <span class="de">"Ich muss morgen früh aufstehen. Ich gehe nach Hause."</span> <span class="de-help">Tengo que levantarme temprano mañana. Me voy a casa.</span></p>

<p>Marta nota la palabra: <em>aufstehen</em>. <em>Levantarse.</em> Es un verbo separable, ya lo sabe. Pero notar el "auf" al final de la frase todavía le sorprende.</p>

<p>Cuando se despiden, Anna le da dos besos. Marta se sorprende — <em>¿los alemanes no dan besos?</em> Pero Anna sonríe: <span class="de">"Das habe ich von dir gelernt."</span> <span class="de-help">Esto lo he aprendido de ti.</span></p>

<p>Marta camina a casa con Jonas en silencio. Pero ahora el silencio no le pesa. Es solo el final de una buena noche.</p>

<p><span class="de">"Schlaf gut, Marta."</span> dice Jonas en la puerta. <span class="de-help">Que duermas bien.</span></p>

<p><span class="de">"Du auch. Bis morgen."</span></p>

<p>Marta se acuesta. Su cabeza está llena de palabras nuevas. <em>Aufstehen. Mitkommen. Anrufen. Wegfahren.</em> Verbos que se rompen y se pegan al final de la frase, como piezas de Lego. <em>Mañana le pregunto a Spikiu por qué.</em></p>`,

      grammar: {
        title: 'Las palabras <em>partidas</em>',
        subtitle: 'Trennbare Verben — el extraño caso de los verbos que se separan al final de la frase.',
        intro: `<p>El alemán tiene una particularidad rara y maravillosa: <strong>los verbos separables</strong>. Son verbos que tienen un prefijo (auf-, ab-, mit-, an-, weg-, ein-...) que en la frase se separa y se va al final.</p><br><p>En infinitivo están juntos: <em>aufstehen</em> (levantarse). Pero cuando los usas en una frase, <strong>el prefijo se va a dormir al fondo</strong>:<br>→ "Ich <strong>stehe</strong> jeden Morgen um 7 Uhr <strong>auf</strong>."</p><br><p>Para un hispanohablante esto es muy raro. Pero hay una lógica: el prefijo es la <em>parte importante</em> que cambia el significado. Y los alemanes lo guardan para el final, como una sorpresa.</p>`,
        twins: [
          { name: 'aufstehen', tagline: 'separable: <em>auf</em> + <em>stehen</em>', example: 'Ich <strong>stehe</strong> um 7 Uhr <strong>auf</strong>.' },
          { name: 'verstehen', tagline: 'NO separable: <em>ver-</em> queda pegado', example: 'Ich <strong>verstehe</strong> dich nicht.' }
        ],
        rule: '<strong>Si el prefijo lleva acento</strong> (<em>auf-, ab-, mit-, an-, weg-, ein-, aus-, vor-, zu-</em>) → <strong>se separa</strong>.<br>Si el prefijo NO lleva acento (<em>ver-, be-, ent-, er-, ge-, zer-</em>) → <strong>queda pegado</strong> al verbo.<br><br>Truco rápido: si puedes decir el prefijo solo (<em>"auf!"</em>, <em>"mit!"</em>), es separable.',
        markers: {
          perfecto: ['<strong>auf</strong>stehen — levantarse', '<strong>mit</strong>kommen — venir con', '<strong>an</strong>rufen — llamar (por tel.)', '<strong>ein</strong>kaufen — hacer la compra', '<strong>weg</strong>fahren — irse en coche', '<strong>auf</strong>räumen — ordenar'],
          indefinido: ['<strong>ver</strong>stehen — entender', '<strong>be</strong>kommen — recibir', '<strong>er</strong>klären — explicar', '<strong>ge</strong>fallen — gustar', '<strong>ent</strong>scheiden — decidir', '<strong>zer</strong>brechen — romper']
        },
        tip: '<strong>🐾 Spikius mentaler Trick:</strong> Imagina que el prefijo de un verbo separable es un <em>imán</em> que el alemán lanza al final de la frase. La frase es como un puente, y al final está la sorpresa: <em>"auf!"</em>, <em>"an!"</em>, <em>"mit!"</em>.<br><br>Ejemplo: <em>"Ich rufe dich morgen Abend nach dem Essen <strong>an</strong>."</em> Hasta el final no sabes si Marta te llama, te ve, te invita o te despide. La preposición es la clave. Por eso los alemanes <em>escuchan hasta el final</em>.<br><br>Y por eso a veces parecen serios — no, están esperando el verbo completo.',
        exercises: [
          { prompt: 'Completa: <em>Ich _____ jeden Morgen um 7 Uhr _____.</em> (aufstehen)', options: ['stehe ... auf', 'aufstehe ... ø', 'auf ... stehe'], correct: 0, feedback: { right: '¡Perfecto! El verbo va en su sitio normal y el prefijo se va al final.', wrong: 'No del todo. Es <strong>"Ich <em>stehe</em> jeden Morgen um 7 Uhr <em>auf</em>"</strong> — el prefijo al final.' } },
          { prompt: '¿Cuál de estos verbos NO es separable?', options: ['aufmachen', 'mitkommen', 'verstehen'], correct: 2, feedback: { right: '¡Sí! <em>ver-</em> nunca se separa porque no lleva acento.', wrong: 'No es <em>aufmachen</em> ni <em>mitkommen</em> — esos sí se separan. <strong>Verstehen</strong> no se separa porque <em>ver-</em> es átono.' } },
          { prompt: 'Anna dice: <em>"Ich muss morgen früh _____."</em> ¿Qué falta?', options: ['aufstehen', 'stehe auf', 'aufgestanden'], correct: 0, feedback: { right: '¡Genial! Después de un verbo modal (muss, kann, will), el infinitivo va junto al final.', wrong: 'Después de <em>muss</em>, el verbo separable va junto en infinitivo: <strong>aufstehen</strong>.' } },
          { prompt: 'Traduce: "Mañana te llamo por teléfono."', options: ['Morgen ich anrufe dich.', 'Morgen rufe ich dich an.', 'Morgen ich rufe an dich.'], correct: 1, feedback: { right: '¡Perfecto! Verbo conjugado en segundo lugar, prefijo al final.', wrong: 'En alemán: verbo conjugado en posición 2, prefijo al final. <strong>"Morgen rufe ich dich an."</strong>' } }
        ]
      },

      glossary: [
        { word: 'der Stammtisch', trans: 'la mesa fija de un grupo de amigos en una taberna', prompt: '¿Qué hace especial un <em>Stammtisch</em>?', options: ['Es una mesa muy grande', 'Es el mismo grupo, mismo bar, mismo día, regularmente', 'Es solo para hombres'], correct: 1, feedback: { right: '¡Sí! Es la tradición alemana de tener "tu mesa" — siempre la misma, siempre la misma gente.', wrong: 'No. Lo especial es la <em>regularidad</em>: mismo grupo, mismo bar, mismo día — algo muy alemán.' } },
        { word: 'die Eckkneipe', trans: 'la taberna de barrio en una esquina', prompt: 'Una <em>Eckkneipe</em> es:', options: ['Un bar moderno y elegante', 'Una taberna tradicional en una esquina', 'Una cafetería de marca'], correct: 1, feedback: { right: '¡Exacto! <em>Ecke</em> = esquina, <em>Kneipe</em> = taberna. Lugares clásicos del barrio.', wrong: 'No. <em>Ecke</em> = esquina + <em>Kneipe</em> = taberna. Son los bares tradicionales de barrio.' } },
        { word: 'aufstehen', trans: 'levantarse (de la cama)', prompt: 'Anna dice: <em>"Ich muss morgen früh aufstehen."</em> ¿Qué significa?', options: ['Tengo que despertarme tarde', 'Tengo que levantarme temprano', 'Tengo que estar de pie'], correct: 1, feedback: { right: '¡Sí! <em>früh aufstehen</em> = levantarse temprano.', wrong: 'No. <em>früh</em> = temprano, <em>aufstehen</em> = levantarse. → "Tengo que levantarme temprano."' } },
        { word: 'mitkommen', trans: 'venir con (alguien)', prompt: 'Jonas pregunta: <em>"Kommst du mit?"</em> ¿Qué quiere saber?', options: ['¿Por dónde vienes?', '¿Vienes conmigo?', '¿Por qué vienes?'], correct: 1, feedback: { right: '¡Exacto! Verbo separable: el "mit" se va al final.', wrong: 'No. <em>mitkommen</em> = venir con. Al separarse: "Kommst du <em>mit</em>?" = "¿Vienes conmigo?"' } },
        { word: 'Setz dich!', trans: '¡Siéntate!', prompt: '¿Cómo le dirías a un grupo (vosotros) "sentaos"?', options: ['Setz dich!', 'Setzt euch!', 'Sitzen Sie!'], correct: 1, feedback: { right: '¡Bien! El plural de <em>du → ihr</em> requiere <em>setzt euch</em>.', wrong: 'No. Para vosotros (ihr) es <strong>"Setzt euch!"</strong> — el reflexivo cambia a "euch".' } },
        { word: 'gefallen', trans: 'gustar', prompt: '¿Cómo se traduce <em>"Wie gefällt dir Berlin?"</em>?', options: ['¿Por qué te gusta Berlín?', '¿Cómo te gusta Berlín?', '¿Quién es Berlín para ti?'], correct: 1, feedback: { right: '¡Sí! Literalmente: "¿Cómo te gusta Berlín?" — "Wie" = cómo.', wrong: 'No. <em>Wie</em> = cómo, <em>gefällt dir</em> = te gusta. → "¿Cómo te gusta Berlín?"' } },
        { word: 'anders', trans: 'diferente, distinto', prompt: 'Marta dice <em>"Es ist anders."</em> ¿Qué expresa?', options: ['Es malo', 'Es nuevo', 'Es distinto a lo que conoce'], correct: 2, feedback: { right: '¡Bien! <em>anders</em> = diferente — sin juicio positivo ni negativo.', wrong: 'No. <em>anders</em> = diferente, distinto — sin decir si es bueno o malo.' } },
        { word: 'Schlaf gut!', trans: '¡Que duermas bien!', prompt: '¿Cuándo dices <em>"Schlaf gut"</em>?', options: ['Por la mañana al despertar', 'Por la noche al despedirte', 'En cualquier momento del día'], correct: 1, feedback: { right: '¡Exacto! Es la despedida nocturna típica.', wrong: 'Solo de noche. <em>"Schlaf gut"</em> = "Que duermas bien" — se dice al despedirse por la noche.' } }
      ]
    },

    // ════════════════════════════════════════════
    // CHAPTER 4 — IN DER BÄCKEREI
    // ════════════════════════════════════════════
    {
      number: 4,
      title: 'In der Bäckerei',
      subtitle: 'En el que Marta descubre que en Alemania hay treinta tipos de pan — y todos tienen nombres impronunciables.',
      grammarFocus: 'Bestellen mit "ich hätte gerne"',
      semanticField: 'Bäckerei & Frühstück',

      reader: `<p>Sábado por la mañana. Marta tiene un hambre tremendo. Quiere desayunar como una alemana de verdad. Eso significa: ir a la <span class="de">Bäckerei</span> de la esquina.</p>

<p>En Madrid el desayuno era simple: café con leche, tostada con tomate, y a veces churros. Aquí en Berlín, las panaderías son <em>otra dimensión</em>. Marta ya ha pasado por delante varias veces y siempre se queda mirando el escaparate, abrumada.</p>

<p>Empuja la puerta. Una campanita suena. <span class="de">"Guten Morgen!"</span> dice una voz alegre desde detrás del mostrador.</p>

<p><span class="de">"Guten Morgen,"</span> responde Marta.</p>

<p>Detrás del cristal hay un mundo. <em>Treinta panes diferentes</em>. <span class="de">Roggenbrot, Vollkornbrot, Mehrkornbrot, Sonnenblumenbrot, Weizenmischbrot...</span> A Marta le da vueltas la cabeza. Cada pan parece más serio que el anterior.</p>

<p>La vendedora — una mujer mayor con un delantal blanco — espera con paciencia. <span class="de">"Was darf's sein?"</span> <span class="de-help">¿Qué puede ser? = ¿Qué desea?</span></p>

<p>Marta tiene preparada una frase: <span class="de">"Ich hätte gerne ein Brötchen, bitte."</span> <span class="de-help">Querría un panecillo, por favor.</span></p>

<p>La vendedora sonríe. <span class="de">"Ein Brötchen. Welches denn?"</span> <span class="de-help">Un panecillo. ¿Cuál?</span></p>

<p>Marta no había pensado en eso. Los panecillos también tienen veinte variedades. Mira el cristal con desesperación.</p>

<p><span class="de">"Eh... das da?"</span> <span class="de-help">¿Eso de ahí?</span> Marta señala uno con semillas de sésamo.</p>

<p><span class="de">"Ein Sesambrötchen. Sehr gut. Sonst noch was?"</span> <span class="de-help">Un panecillo de sésamo. Muy bien. ¿Algo más?</span></p>

<p>Marta respira. Esta parte la sabe. <span class="de">"Ja, ich hätte gerne auch zwei Croissants, bitte."</span></p>

<p><span class="de">"Zwei Croissants."</span> La vendedora los pone en una bolsa de papel. <span class="de">"Sonst noch was?"</span></p>

<p>Marta mira los pasteles. Hay uno enorme con manzana. <em>Demasiado grande para mí sola</em>, piensa. Pero también hay algo pequeño y rojo que parece interesante.</p>

<p><span class="de">"Was ist das?"</span> <span class="de-help">¿Qué es eso?</span> Señala el pastelito rojo.</p>

<p><span class="de">"Das ist ein Mohnschnecke. Sehr lecker."</span> <span class="de-help">Es un "caracol de amapola". Muy rico.</span></p>

<p>Marta no entiende qué es la amapola — <em>¿flor? ¿planta?</em> — pero la palabra <em>"lecker"</em> la convence.</p>

<p><span class="de">"Ein Mohnschnecke, bitte."</span></p>

<p>La vendedora lo añade a la bolsa. <span class="de">"Das macht vier Euro fünfzig."</span> <span class="de-help">Son cuatro euros con cincuenta.</span></p>

<p>Marta paga en efectivo. <em>Aquí casi todo es en efectivo. Otra cosa rara de Alemania.</em></p>

<p>Cuando sale, ya con su bolsa cálida en las manos, una niña pequeña entra con su padre. La niña dice con voz fuerte y clara: <span class="de">"Ich möchte ein Berliner, bitte!"</span></p>

<p>Marta se ríe sola por la calle. <em>Eso es lo que diré la próxima vez.</em> "Ich möchte..." es más fácil que "Ich hätte gerne..." Pero también funciona.</p>

<p>En casa, abre la bolsa. El panecillo todavía está caliente. Lo corta por la mitad, le pone mantequilla, un poco de mermelada. Mastica despacio.</p>

<p>El Mohnschnecke es una espiral de masa con algo negro y dulce dentro. Probablemente las semillas de amapola. <em>Está muy bueno. Diferente. Pero bueno.</em></p>

<p>Marta saca su teléfono y le manda un mensaje a su madre en Madrid:</p>

<p style="background:#f3ead7;padding:1rem 1.4rem;border-radius:10px;font-style:italic;color:#2d6a4f;margin:1.5rem 0;">"Mamá, hoy he desayunado como una alemana. Pan, mantequilla, mermelada, y una cosa rara con amapola. Aquí en serio hay treinta tipos de pan. ¡TREINTA!"</p>

<p>Su madre responde rápido: <em>"¿Y café? ¿O ahora bebes té como los ingleses?"</em></p>

<p>Marta sonríe. Pone agua para café. <em>Algunas cosas no cambian.</em></p>`,

      grammar: {
        title: 'Como pedir <em>educadamente</em>',
        subtitle: 'Ich hätte gerne, ich möchte, ich nehme — tres formas, una sola buena educación.',
        intro: `<p>En alemán, como en español, hay formas educadas y formas directas de pedir. <em>"Geben Sie mir ein Brot!"</em> ("¡Deme un pan!") es técnicamente correcto, pero suena como una orden militar.</p><br><p>Lo educado, lo normal, lo alemán-civilizado, son tres expresiones que <strong>siempre</strong> funcionan en una panadería, un café o un restaurante:</p>`,
        twins: [
          { name: 'Ich hätte gerne', tagline: 'la fórmula más educada', example: '<strong>"Ich hätte gerne</strong> ein Brötchen, bitte."' },
          { name: 'Ich möchte', tagline: 'educado y más corto', example: '<strong>"Ich möchte</strong> einen Kaffee, bitte."' }
        ],
        rule: 'Para pedir algo en Alemania, usa una de estas tres fórmulas:<br><br>• <strong>Ich hätte gerne...</strong> (lo más educado — literalmente "tendría con gusto")<br>• <strong>Ich möchte...</strong> (educado y natural — "me gustaría")<br>• <strong>Ich nehme...</strong> (cuando ya has decidido — "tomo")<br><br>Y siempre, siempre, siempre: <strong>bitte</strong> al final.',
        markers: {
          perfecto: ['<strong>Ich hätte gerne</strong> ein Brot.', '<strong>Ich möchte</strong> einen Kaffee.', '<strong>Ich nehme</strong> das Sesambrötchen.', '<strong>Können Sie mir</strong> bitte... geben?', '<strong>Was darf\'s sein?</strong> <span class="m">— pregunta del vendedor</span>', 'Y siempre: <strong>bitte</strong>'],
          indefinido: ['<strong>Geben Sie mir</strong>... <span class="m">— demasiado directo</span>', '<strong>Ich will</strong>... <span class="m">— quiero, suena infantil</span>', '<strong>Ich brauche</strong>... <span class="m">— necesito, dramático</span>', 'Pedir sin <em>bitte</em>', 'Pedir solo el sustantivo: <em>"Brot."</em>', 'Hablar demasiado fuerte']
        },
        tip: '<strong>🐾 Spikius mentaler Trick:</strong> Hay una jerarquía cultural alemana muy clara:<br><br>1. <strong>Ich hätte gerne</strong> = como un caballero (siempre funciona)<br>2. <strong>Ich möchte</strong> = como una persona civilizada (perfecto)<br>3. <strong>Ich nehme</strong> = como un cliente decidido (también bien)<br>4. <em>Ich will</em> = como un niño caprichoso (¡evítalo!)<br><br>Y el truco mágico: el <strong>"bitte"</strong> al final puede salvar cualquier frase rara. Es como el aceite de oliva en España — lo arregla todo.',
        exercises: [
          { prompt: '¿Cuál es la forma más educada para pedir un pan?', options: ['Geben Sie mir ein Brot.', 'Ich will ein Brot.', 'Ich hätte gerne ein Brot, bitte.'], correct: 2, feedback: { right: '¡Perfecto! <em>Ich hätte gerne + bitte</em> es la combinación de oro.', wrong: 'La más educada es <strong>"Ich hätte gerne ein Brot, bitte."</strong> — siempre con <em>bitte</em>.' } },
          { prompt: 'La vendedora pregunta: <em>"Was darf\'s sein?"</em>. ¿Qué significa?', options: ['¿Cuánto cuesta?', '¿Qué desea?', '¿Tiene cambio?'], correct: 1, feedback: { right: '¡Sí! Es la pregunta clásica en cualquier panadería o tienda.', wrong: 'No. Literalmente: "¿Qué puede ser?" = <strong>"¿Qué desea?"</strong> — la pregunta más común en una tienda alemana.' } },
          { prompt: 'Has decidido qué quieres. ¿Qué dices?', options: ['Ich nehme den Mohnschnecke, bitte.', 'Ich nehme der Mohnschnecke, bitte.', 'Ich nehme das Mohnschnecke, bitte.'], correct: 0, feedback: { right: '¡Bien! <em>der Mohnschnecke</em> es masculino → en acusativo: <em>den</em>.', wrong: 'No del todo. <em>Mohnschnecke</em> es masculino y va en acusativo aquí → <strong>den Mohnschnecke</strong>.' } },
          { prompt: 'Falta una palabra mágica en: <em>"Ich möchte einen Kaffee."</em>', options: ['danke', 'bitte', 'tschüss'], correct: 1, feedback: { right: '¡Exacto! <em>"Ich möchte einen Kaffee, bitte."</em> — el "bitte" es obligatorio.', wrong: 'Es <strong>"bitte"</strong> al final. Sin él, suena más como una orden que como una petición.' } }
        ]
      },

      glossary: [
        { word: 'die Bäckerei', trans: 'la panadería', prompt: 'En una Bäckerei alemana puedes encontrar:', options: ['Solo pan', 'Pan, panecillos, pasteles y café', 'Solo dulces'], correct: 1, feedback: { right: '¡Sí! Las Bäckereien alemanas son mucho más completas que una panadería española.', wrong: 'Mucho más que pan. Hay panes, panecillos, pasteles, croissants y a veces hasta café.' } },
        { word: 'das Brötchen', trans: 'el panecillo', prompt: 'En el norte de Alemania a un <em>Brötchen</em> también se le llama:', options: ['Brot', 'Semmel (sur) o Schrippe (Berlín)', 'Croissant'], correct: 1, feedback: { right: '¡Sí! En cada región tiene un nombre diferente. En Berlín: <em>Schrippe</em>.', wrong: 'En cada región tiene un nombre. En Berlín se llama <em>Schrippe</em>, en Baviera <em>Semmel</em>.' } },
        { word: 'lecker', trans: 'rico, sabroso', prompt: 'Si algo está <em>lecker</em>...', options: ['... no se puede comer', '... sabe muy bien', '... es caro'], correct: 1, feedback: { right: '¡Sí! <em>lecker</em> = rico, sabroso — palabra clave en cualquier panadería.', wrong: 'No. <em>lecker</em> = rico, sabroso. Cuando algo está bueno: "Das ist lecker!"' } },
        { word: 'Was darf\'s sein?', trans: '¿Qué desea?', prompt: 'Esta frase la oyes:', options: ['En una panadería o tienda', 'En una conversación con amigos', 'En el aeropuerto'], correct: 0, feedback: { right: '¡Exacto! Es la fórmula clásica de cualquier vendedor en una tienda o panadería.', wrong: 'En una tienda. Es la pregunta estándar del vendedor: <em>"¿Qué desea?"</em>' } },
        { word: 'Sonst noch was?', trans: '¿Algo más?', prompt: 'No quieres nada más. ¿Cómo respondes?', options: ['Ja, bitte!', 'Nein, danke.', 'Bitte schön.'], correct: 1, feedback: { right: '¡Perfecto! <em>Nein, danke</em> — siempre con <em>danke</em>.', wrong: 'La respuesta educada es <strong>"Nein, danke."</strong> — siempre con "danke".' } },
        { word: 'Das macht...', trans: 'Son... (precio)', prompt: '<em>"Das macht vier Euro fünfzig."</em> significa:', options: ['Esto cuesta cuatro con cincuenta', 'Hace cuatro grados con cincuenta minutos', 'Tienes que esperar cuatro horas y media'], correct: 0, feedback: { right: '¡Sí! <em>Das macht...</em> es la fórmula alemana para "Son... euros".', wrong: 'No. <em>Das macht...</em> = "Son..." (precio). → "Son cuatro euros con cincuenta."' } },
        { word: 'in bar (zahlen)', trans: 'pagar en efectivo', prompt: 'En Alemania, <em>"in bar"</em> es:', options: ['Una expresión rara, casi nadie paga así', 'La forma más común de pagar', 'Pagar con tarjeta'], correct: 1, feedback: { right: '¡Exacto! Alemania es famosa por su preferencia por el efectivo, especialmente en panaderías.', wrong: 'Al revés — Alemania es famosa por preferir el efectivo. Especialmente en panaderías y pequeños comercios.' } },
        { word: 'Guten Morgen / Tag', trans: 'Buenos días / Buenas tardes', prompt: '¿Cuándo se cambia de <em>Guten Morgen</em> a <em>Guten Tag</em>?', options: ['A las 9 de la mañana', 'A mediodía aproximadamente', 'A las 5 de la tarde'], correct: 1, feedback: { right: '¡Sí! Hasta las 10-12h: Guten Morgen. Después: Guten Tag.', wrong: 'A mediodía aproximadamente. Por la mañana: <em>Guten Morgen</em>. Desde el mediodía: <em>Guten Tag</em>.' } }
      ]
    },

    // ════════════════════════════════════════════
    // CHAPTER 5 — IN DER U-BAHN
    // ════════════════════════════════════════════
    {
      number: 5,
      title: 'In der U-Bahn',
      subtitle: 'En el que Marta se sube al U-Bahn equivocado — y descubre Kreuzberg al revés.',
      grammarFocus: 'Wo, wohin, woher — las tres preguntas del movimiento',
      semanticField: 'U-Bahn & Stadt',

      reader: `<p>Es viernes por la tarde. Marta ha quedado con Anna en un café en <span class="de">Prenzlauer Berg</span>, un barrio que está al norte. Marta vive en Kreuzberg, al sur. <span class="de-help">Sin problema: Berlín tiene un U-Bahn maravilloso.</span></p>

<p>Eso piensa, al menos.</p>

<p>Llega a la estación de <span class="de">Kottbusser Tor</span>, su parada de toda la vida. Mira el plano gigante en la pared. <em>Líneas de muchos colores. Nombres impronunciables.</em></p>

<p><span class="de">U1, U3, U8...</span> Marta debe coger la U8 hacia el norte.</p>

<p>Baja al andén. En las pantallas: <span class="de">"U8 nach Wittenau — 3 Min."</span> Perfecto. Esperará.</p>

<p>Un señor mayor está a su lado. Marta no sabe por qué, pero quiere intentar conversar. <span class="de">"Entschuldigung, wohin fährt die U8?"</span> <span class="de-help">Disculpe, ¿a dónde va el U8?</span></p>

<p>El señor la mira con cara de buena persona. <span class="de">"Nach Wittenau. Aber wohin willst du?"</span> <span class="de-help">A Wittenau. Pero ¿a dónde quieres tú?</span></p>

<p><span class="de">"Nach Prenzlauer Berg."</span></p>

<p>El señor frunce el ceño. <span class="de">"Dann musst du in die andere Richtung. Nicht U8 — sondern U2."</span> <span class="de-help">Entonces tienes que ir en la otra dirección. No U8, sino U2.</span></p>

<p>Marta lo mira sin entender. Saca el plano del móvil. El señor le señala. <span class="de">"Du musst zur Linie U2 wechseln. An der Senefelderplatz aussteigen."</span> <span class="de-help">Tienes que cambiar a la línea U2. Bajarte en Senefelderplatz.</span></p>

<p>Marta entiende ahora. Hay que cambiar de línea. <span class="de">"Vielen Dank!"</span> <span class="de-help">¡Muchas gracias!</span></p>

<p>El señor sonríe. <span class="de">"Bitte. Viel Glück!"</span> <span class="de-help">De nada. ¡Buena suerte!</span></p>

<p>Marta sube por las escaleras, busca la línea U2. Encuentra el andén. La pantalla dice: <span class="de">"U2 nach Pankow — 5 Min."</span></p>

<p>¿Pankow? <em>Eso suena al norte.</em> Es una palabra que ha oído antes. Pankow está más allá de Prenzlauer Berg. <em>Sí, esta es la dirección correcta.</em></p>

<p>El U-Bahn llega. Marta sube. Encuentra un asiento libre. Mira por la ventana.</p>

<p>A diferencia del metro de Madrid, el U2 de Berlín en esta zona va por arriba — <em>la línea elevada</em>. Marta ve calles, edificios bajos, ladrillo rojo, grafitis enormes, una iglesia, un parque pequeño.</p>

<p>Una mujer joven se sienta a su lado y comienza a hablar al teléfono. Rápido, fuerte. Marta no entiende casi nada. Solo capta algunas palabras: <em>"morgen", "Termin", "absagen"</em>. <span class="de-help">Mañana, cita, cancelar.</span> Vidas que pasan, fragmentos.</p>

<p>El U-Bahn para en varias estaciones: <span class="de">Märkisches Museum, Klosterstraße, Alexanderplatz...</span> Marta ha oído hablar de Alexanderplatz. <em>Antes era el centro de Berlín Este.</em></p>

<p>Después: <span class="de">Rosa-Luxemburg-Platz, Senefelderplatz, Eberswalder Straße...</span></p>

<p>Marta tiene que bajarse en <span class="de">Eberswalder Straße</span>. <em>Una palabra terrible. Cinco sílabas. Pero ya las cuenta cuando habla.</em></p>

<p>Se baja. Sube por las escaleras. Sale al aire libre.</p>

<p>Prenzlauer Berg es <em>diferente</em>. Más tranquilo que Kreuzberg. Árboles grandes en las aceras. Cafés con muchas familias jóvenes. Niños rubios en bicicletas pequeñas.</p>

<p>Anna está esperando en una mesa fuera de un café. La saluda con la mano.</p>

<p>Marta se acerca. <span class="de">"Entschuldigung, ich bin zu spät. Ich habe die falsche U-Bahn genommen."</span> <span class="de-help">Perdón, llego tarde. He cogido el U-Bahn equivocado.</span></p>

<p>Anna se ríe. <span class="de">"Willkommen in Berlin! Das ist uns allen mal passiert."</span> <span class="de-help">¡Bienvenida a Berlín! A todos nos ha pasado alguna vez.</span></p>

<p>Marta se sienta. Pide un café — <span class="de">"Einen Kaffee, bitte"</span> — y suspira. <em>Lo conseguí. Sola.</em></p>

<p>En el camino, ha aprendido tres palabras nuevas: <em>wohin, woher, wo</em>. Y la diferencia entre <em>"a dónde vas"</em> y <em>"de dónde vienes"</em>. Eso, en Berlín, es lo más útil del mundo.</p>`,

      grammar: {
        title: 'Las tres <em>preguntas</em> del movimiento',
        subtitle: 'Wo, wohin, woher — y por qué los alemanes son obsesivos con la dirección.',
        intro: `<p>El alemán es una lengua exacta. En español decimos <em>"¿Dónde está?"</em> y <em>"¿Dónde vas?"</em> con la misma palabra ("dónde"). El alemán <strong>no perdona</strong> esta confusión. Tiene tres preguntas distintas según lo que pasa:</p><br><p>• <strong>Wo?</strong> = ¿Dónde? (sin movimiento — estás en un lugar)<br>• <strong>Wohin?</strong> = ¿A dónde? (movimiento hacia un lugar)<br>• <strong>Woher?</strong> = ¿De dónde? (movimiento desde un lugar)</p>`,
        twins: [
          { name: 'Wo bist du?', tagline: 'estás en un lugar', example: '"<strong>Wo</strong> bist du?" → "Ich bin in Berlin."' },
          { name: 'Wohin gehst du?', tagline: 'vas hacia un lugar', example: '"<strong>Wohin</strong> gehst du?" → "Nach Berlin."' }
        ],
        rule: '<strong>Wo</strong> + <em>verbo estático</em> (sein, wohnen, arbeiten) → ¿dónde?<br><strong>Wohin</strong> + <em>verbo de movimiento</em> (gehen, fahren, fliegen) → ¿a dónde?<br><strong>Woher</strong> + <em>verbo de origen</em> (kommen, sein) → ¿de dónde?<br><br>Y la respuesta también cambia: <em>"in Berlin"</em> (Wo?) vs. <em>"nach Berlin"</em> (Wohin?) vs. <em>"aus Berlin"</em> (Woher?).',
        markers: {
          perfecto: ['<strong>Wo</strong> wohnst du? → in Kreuzberg', '<strong>Wo</strong> arbeitest du? → in Berlin', '<strong>Wohin</strong> gehst du? → nach Hause', '<strong>Wohin</strong> fährt der Zug? → nach Wittenau', '<strong>Woher</strong> kommst du? → aus Spanien', '<strong>Woher</strong> ist diese Tasche? → aus dem Laden'],
          indefinido: ['<em>Wo gehst du?</em> ❌ <span class="m">→ Wohin gehst du?</span>', '<em>Wohin bist du?</em> ❌ <span class="m">→ Wo bist du?</span>', '<em>Wo kommst du?</em> ❌ <span class="m">→ Woher kommst du?</span>', '<em>in Berlin</em> con verbo de movimiento ❌', '<em>nach Berlin</em> sin movimiento ❌', 'mezclar las tres preguntas']
        },
        tip: '<strong>🐾 Spikius mentaler Trick:</strong> Piensa en una flecha de dirección:<br><br>→ <strong>Wohin</strong> tiene una flecha que apunta hacia algo (movimiento <em>hacia</em>)<br>← <strong>Woher</strong> tiene una flecha que viene de algo (movimiento <em>desde</em>)<br>● <strong>Wo</strong> es un punto fijo, sin flechas (estás <em>ahí</em>)<br><br>Y memoriza los pares: <strong>Wohin → nach</strong> (ciudad/país) o <strong>zu</strong> (lugar concreto). <strong>Woher → aus</strong>. <strong>Wo → in</strong> (lugar) o <strong>bei</strong> (persona).<br><br>Marta hizo el clásico error: preguntó <em>"wohin"</em> cuando ya estaba esperando el tren. Pero el señor entendió que en realidad quería saber <em>la dirección del tren</em>. La gente perdona — pero tú entiéndelo bien para el examen.',
        exercises: [
          { prompt: 'Completa: <em>"_____ wohnst du?"</em> — "Ich wohne in Berlin."', options: ['Wohin', 'Woher', 'Wo'], correct: 2, feedback: { right: '¡Perfecto! <em>"wohnen"</em> es estático — no hay movimiento.', wrong: 'No. <em>"wohnen"</em> = vivir/estar viviendo. Es estático → <strong>Wo</strong>.' } },
          { prompt: 'Completa: <em>"_____ kommst du?"</em> — "Aus Spanien."', options: ['Wohin', 'Woher', 'Wo'], correct: 1, feedback: { right: '¡Sí! "aus Spanien" = "de España" → origen → <em>Woher</em>.', wrong: 'No. La respuesta es "aus Spanien" (de España) → origen → <strong>Woher</strong>.' } },
          { prompt: 'Marta pregunta: <em>"_____ fährt der Zug?"</em>', options: ['Wohin', 'Woher', 'Wo'], correct: 0, feedback: { right: '¡Exacto! El tren se mueve hacia un destino → <em>Wohin</em>.', wrong: 'El tren tiene movimiento hacia un destino → <strong>Wohin</strong>.' } },
          { prompt: '¿Qué falta? <em>"Ich fahre _____ Hause."</em>', options: ['nach', 'aus', 'in'], correct: 0, feedback: { right: '¡Bien! <em>"nach Hause"</em> = "a casa" — fija expresión.', wrong: 'Es <strong>"nach Hause"</strong> — expresión fija para "a casa".' } }
        ]
      },

      glossary: [
        { word: 'die U-Bahn', trans: 'el metro (subterráneo)', prompt: 'En Berlín, la <em>U-Bahn</em>:', options: ['Va solo bajo tierra', 'A veces va elevada también', 'Solo va en superficie'], correct: 1, feedback: { right: '¡Sí! Especialmente la U2 — pasa elevada por Prenzlauer Berg.', wrong: 'A veces va elevada (sobre todo la U2 en Prenzlauer Berg). U-Bahn = U(ntergrundbahn).' } },
        { word: 'die S-Bahn', trans: 'el tren urbano (suburban)', prompt: '¿Cuál es la diferencia entre U-Bahn y S-Bahn?', options: ['Son lo mismo', 'U-Bahn es más rápido', 'S-Bahn cubre distancias más largas y conecta con suburbios'], correct: 2, feedback: { right: '¡Exacto! S = Stadt/Schnell. La S-Bahn cubre más territorio que la U-Bahn.', wrong: 'La S-Bahn es el tren urbano que conecta con los suburbios — distancias mayores que la U-Bahn.' } },
        { word: 'wohin', trans: '¿a dónde?', prompt: 'Marta pregunta: <em>"Wohin fährt die U8?"</em> Quiere saber:', options: ['Cuándo sale el U8', 'Hacia dónde va el U8', 'De dónde viene el U8'], correct: 1, feedback: { right: '¡Sí! <em>Wohin</em> = ¿hacia dónde? — dirección del movimiento.', wrong: 'No. <em>Wohin</em> = ¿hacia dónde? La pregunta es por la dirección del tren.' } },
        { word: 'aussteigen', trans: 'bajarse (del transporte)', prompt: '<em>Aussteigen</em> es un verbo:', options: ['No separable', 'Separable: aus- se va al final', 'Reflexivo'], correct: 1, feedback: { right: '¡Perfecto! <em>aus-</em> se separa: "Ich steige am Alexanderplatz aus."', wrong: 'Es separable. <em>aus-</em> se va al final: "Ich steige am Alexanderplatz <em>aus</em>."' } },
        { word: 'wechseln', trans: 'cambiar (de línea, dinero...)', prompt: '<em>"Du musst zur Linie U2 wechseln."</em> significa:', options: ['Tienes que comprar un billete para la U2', 'Tienes que cambiar a la línea U2', 'Tienes que esperar la línea U2'], correct: 1, feedback: { right: '¡Sí! <em>wechseln</em> = cambiar de una línea a otra.', wrong: 'No. <em>wechseln</em> = cambiar (de línea, en este caso).' } },
        { word: 'zu spät / zu früh', trans: 'demasiado tarde / temprano', prompt: 'Marta llega tarde. ¿Qué dice?', options: ['Ich bin zu früh.', 'Ich bin zu spät.', 'Ich bin pünktlich.'], correct: 1, feedback: { right: '¡Bien! <em>zu spät</em> = demasiado tarde.', wrong: '<em>zu spät</em> = demasiado tarde. <em>zu früh</em> = demasiado temprano. <em>pünktlich</em> = puntual.' } },
        { word: 'die falsche / die richtige', trans: 'la equivocada / la correcta', prompt: 'Marta cogió el U-Bahn equivocado. ¿Cómo lo dice?', options: ['die richtige U-Bahn', 'die falsche U-Bahn', 'die schlechte U-Bahn'], correct: 1, feedback: { right: '¡Sí! <em>falsch</em> = equivocado/falso.', wrong: '<em>falsch</em> = equivocado, <em>richtig</em> = correcto. → <strong>die falsche U-Bahn</strong>.' } },
        { word: 'Viel Glück!', trans: '¡Buena suerte!', prompt: '¿Cuándo dices <em>"Viel Glück!"</em>?', options: ['Al despedirte de noche', 'Cuando alguien va a hacer algo difícil', 'Cuando alguien estornuda'], correct: 1, feedback: { right: '¡Exacto! Para desearle suerte a alguien antes de algo importante.', wrong: 'Cuando alguien va a hacer algo difícil. <em>Schlaf gut</em> = de noche; <em>Gesundheit</em> = al estornudar.' } }
      ]
    }

  ]
};
