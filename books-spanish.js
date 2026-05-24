// ── SPIKIU READER · SPANISH · A2 ───────────────────────
// Lukas, ein junger Deutscher aus Hamburg, kommt nach Madrid
// für ein Architektur-Auslandssemester.
// Free tier: 3 chapters available (3, 4, 5)

export const SPANISH_A2 = {
  meta: {
    targetLang: 'Spanish',
    nativeLang: 'Deutsch',
    level: 'A2',
    protagonist: 'Lukas',
    setting: 'Madrid',
    totalChapters: 12,
    freeChapters: [3, 4, 5]
  },

  chapters: [

    // ════════════════════════════════════════════
    // CHAPTER 3 — LA TERTULIA
    // ════════════════════════════════════════════
    {
      number: 3,
      title: 'La tertulia',
      subtitle: 'In dem Lukas merkt, dass in Spanien alle gleichzeitig reden — und niemand sich aufregt.',
      grammarFocus: 'Pretérito perfecto vs. indefinido',
      semanticField: 'Tertulia & Café',

      reader: `<p>Es ist Dienstagabend. Lukas steht vor dem Spiegel in seiner neuen WG in Madrid und probt einen Satz: <span class="es">"Encantado, soy Lukas."</span> Er hat ihn schon hundertmal geübt, aber heute Abend muss er ihn vor echten Menschen sagen.</p>

<p>María, seine spanische Mitbewohnerin, hat ihn zu einer <span class="es">tertulia</span> eingeladen. <span class="es-help">— so etwas wie ein Stammtisch.</span> "Ven con nosotros al Café Comercial," hatte sie morgens gesagt. <span class="es-help">Komm mit uns.</span> Lukas hatte ja gesagt, bevor er Zeit hatte, nervös zu werden.</p>

<p>Um neun Uhr stehen sie vor dem Café. Drinnen: gelbes Licht, Lärm, Lachen, und ein Geruch nach Bier und Olivenöl, der Lukas sofort hungrig macht.</p>

<p>"¡Hola, chicos!" ruft María. Vier Köpfe drehen sich zu ihnen. Lukas tritt einen Schritt zurück.</p>

<p>"¡Lukas, siéntate aquí!" <span class="es-help">Setz dich hierhin.</span> María zeigt auf einen Stuhl zwischen zwei Fremden. Lukas setzt sich.</p>

<p>"Este es Pablo, esta es Carmen, y aquí Diego." Drei Gesichter lächeln ihn an.</p>

<p><span class="es">"Encantado,"</span> sagt Lukas. Das Wort kommt ihm gut über die Lippen. Endlich ein Sieg.</p>

<p>Carmen lehnt sich vor. <span class="es">"¿De dónde eres?"</span> <span class="es-help">Woher kommst du?</span></p>

<p><span class="es">"De Hamburgo. He llegado hace tres semanas."</span> <span class="es-help">Aus Hamburg. Ich bin vor drei Wochen angekommen.</span></p>

<p>Diego nickt interessiert und stellt die Frage, die Lukas am meisten fürchtet: <span class="es">"¿Y qué has hecho aquí este tiempo?"</span> <span class="es-help">Und was hast du hier in dieser Zeit gemacht?</span></p>

<p>Lukas denkt schnell. Im Kopf hat er zwei Sätze gleichzeitig: <em>"Ich war im Retiro-Park"</em> und <em>"Ich habe noch nicht den Prado gesehen"</em>. Auf Spanisch — wie sagt man das jetzt?</p>

<p><span class="es">"Eh... visité el Retiro el sábado. Y ayer... he comido en Lavapiés. Estuvo muy bueno."</span></p>

<p>Stille. Dann lacht Pablo freundlich und hebt sein Bier. <span class="es">"¡Bienvenido al lío de los pretéritos!"</span> <span class="es-help">Willkommen im Chaos der Vergangenheitsformen!</span></p>

<p><em>Lío</em>, denkt Lukas. Klingt wie Chaos. <em>Vermutlich Chaos.</em></p>

<p>Carmen hat eine ruhige Stimme. Sie spricht langsam, nur für ihn: <span class="es">"No te preocupes. Para nosotros también es un lío."</span> <span class="es-help">Keine Sorge. Für uns ist es auch ein Chaos.</span></p>

<p><span class="es">"Mira: lo que pasó ayer, ya se acabó."</span> <span class="es-help">Schau: was gestern passiert ist, ist vorbei.</span> <span class="es">"Entonces decimos 'ayer comí'. Pero esta semana todavía no se ha acabado, ¿verdad? Entonces: 'esta semana he comido en Lavapiés'."</span></p>

<p>Lukas versteht es halb. Aber er will es probieren.</p>

<p><span class="es">"Hoy... he caminado mucho,"</span> sagt er langsam. <span class="es">"Y ayer... fui al supermercado."</span></p>

<p><span class="es">"¡Eso es!"</span> ruft Diego. <span class="es-help">Genau!</span> <span class="es">"Hoy: he caminado. Ayer: fui. No es tan difícil cuando lo sientes."</span></p>

<p>Die Tertulia geht weiter. Pablo erzählt von seinem Hund, der einen Schuh gefressen hat. Carmen erzählt von ihrer Arbeit in einer Buchhandlung. Lukas versteht nicht alles — vielleicht die Hälfte. Aber das reicht.</p>

<p>Nach einer Stunde sieht María ihn an. <span class="es">"¿Cómo te encuentras?"</span> <span class="es-help">Wie fühlst du dich?</span></p>

<p><span class="es">"Cansado,"</span> sagt Lukas. <span class="es-help">Müde.</span> <span class="es">"Pero feliz. He aprendido mucho esta noche."</span> <span class="es-help">Aber glücklich. Ich habe heute Abend viel gelernt.</span></p>

<p>María lächelt. <span class="es">"Has dicho 'he aprendido'. Bien."</span></p>

<p>Lukas lacht. <em>Ich habe gelernt.</em> Ja. Er lernt. Und zum ersten Mal in drei Wochen <em>spürt</em> er es.</p>`,

      grammar: {
        title: 'Die <em>verwirrten Zwillinge</em>',
        subtitle: 'Pretérito perfecto vs. indefinido — warum sogar Spanier manchmal zögern.',
        intro: `<p>Das Spanische hat zwei Formen, um über die Vergangenheit zu sprechen, die sich sehr ähnlich sehen. Wie <em>Zwillinge</em>: gleiches Gesicht, sehr unterschiedliche Persönlichkeit.</p><br><p>Der eine heißt <strong>pretérito perfecto</strong> (<span class="es">he comido</span> — ich habe gegessen). Der andere heißt <strong>pretérito indefinido</strong> (<span class="es">comí</span> — ich aß). Und Deutsche verwechseln sie ständig, weil wir im Deutschen meistens <em>"ich habe gegessen"</em> für alles verwenden. Aber im Spanischen ist das anders.</p>`,
        twins: [
          { name: 'He comido', tagline: 'Der "noch offen"-Zwilling', example: '"Hoy <strong>he comido</strong> paella."' },
          { name: 'Comí', tagline: 'Der "schon vorbei"-Zwilling', example: '"Ayer <strong>comí</strong> paella."' }
        ],
        rule: 'Wenn die Zeit, über die du sprichst, <strong>noch nicht zu Ende ist</strong> (heute, diese Woche, dieses Jahr...) → <em>he comido</em>.<br>Wenn die Zeit, über die du sprichst, <strong>schon vorbei ist</strong> (gestern, letzten Montag, 2024...) → <em>comí</em>.',
        markers: {
          perfecto: ['hoy <span class="m">— heute</span>', 'esta semana <span class="m">— diese Woche</span>', 'este mes / este año', 'siempre / nunca', 'todavía no / ya', 'alguna vez <span class="m">— jemals</span>'],
          indefinido: ['ayer / anoche', 'el lunes pasado', 'la semana pasada', 'en 2024', 'hace dos años', 'de niño <span class="m">— als Kind</span>']
        },
        tip: '<strong>🐾 Spikius mentaler Trick:</strong> Stell dir eine Tür vor. Wenn die Tür der Zeit noch <em>offen</em> ist (heute, diese Woche, mein Leben), nimmst du <strong>he comido</strong>. Wenn die Tür schon zugefallen ist (gestern, letzten Montag), nimmst du <strong>comí</strong>. Wenn du zweifelst, frag dich: <em>"Ist die Tür noch offen?"</em><br><br><strong>Achtung, Deutsche:</strong> Im Spanischen sagt man <em>nicht</em> "ayer he comido" — das klingt komisch. Man sagt "ayer comí". Auch wenn dein deutsches Hirn dir sagt <em>"Ich habe gestern gegessen"</em> — im Spanischen ist <em>gestern</em> eine geschlossene Tür.',
        exercises: [
          { prompt: '<span class="es">_____ a Madrid hace tres semanas.</span> <span class="help">— Ich bin vor drei Wochen nach Madrid gekommen.</span>', options: ['Llegué', 'He llegado'], correct: 0, feedback: { right: "Genau! <em>'hace tres semanas'</em> ist eine geschlossene Zeit — die Tür ist zu.", wrong: "Nicht ganz. <em>'hace tres semanas'</em> heißt 'vor drei Wochen' — eine abgeschlossene Zeit. → <strong>llegué</strong>." } },
          { prompt: '<span class="es">Hoy _____ a la Plaza Mayor.</span> <span class="help">— Heute bin ich zur Plaza Mayor gegangen.</span>', options: ['fui', 'he ido'], correct: 1, feedback: { right: "Perfekt! <em>'hoy'</em> ist noch nicht vorbei — die Tür ist offen.", wrong: "Nicht ganz. <em>'hoy'</em> heißt 'heute' — der Tag ist noch nicht zu Ende. → <strong>he ido</strong>." } },
          { prompt: '<span class="es">El lunes pasado _____ con María.</span> <span class="help">— Letzten Montag habe ich mit María gesprochen.</span>', options: ['hablé', 'he hablado'], correct: 0, feedback: { right: "Stimmt! <em>'el lunes pasado'</em> ist vorbei — geschlossen.", wrong: "Nicht ganz. <em>'el lunes pasado'</em> heißt 'letzten Montag' — schon vorbei. → <strong>hablé</strong>." } },
          { prompt: '<span class="es">Esta semana _____ mucho café.</span> <span class="help">— Diese Woche habe ich viel Kaffee getrunken.</span>', options: ['bebí', 'he bebido'], correct: 1, feedback: { right: "Sehr gut! <em>'esta semana'</em> ist noch im Gang.", wrong: "Nicht ganz. <em>'esta semana'</em> heißt 'diese Woche' — sie ist noch nicht zu Ende. → <strong>he bebido</strong>." } }
        ]
      },

      glossary: [
        { word: 'la tertulia', trans: 'die Gesprächsrunde, der Stammtisch', prompt: 'Was beschreibt eine <em>tertulia</em> am besten?', options: ['Ein formeller Unterricht im Café', 'Ein lockeres Gespräch im Freundeskreis', 'Eine Beerdigung'], correct: 1, feedback: { right: 'Genau — eine tertulia ist ein lockeres Gespräch unter Freunden, oft im Café.', wrong: 'Nein. Eine tertulia ist KEIN Unterricht — sie ist ein <em>lockeres Gespräch unter Freunden</em>.' } },
        { word: 'encantado / encantada', trans: 'angenehm (zur Begrüßung)', prompt: 'María (Frau) und Lukas (Mann) lernen sich kennen. Wer sagt was?', options: ['Lukas: <em>"encantado"</em> · María: <em>"encantada"</em>', 'Lukas: <em>"encantada"</em> · María: <em>"encantado"</em>', 'Beide sagen <em>"encantado"</em>'], correct: 0, feedback: { right: 'Genau! Im Spanischen ändert sich das Adjektiv mit dem Geschlecht des Sprechers, nicht des Hörers.', wrong: 'Nicht ganz. Lukas (Mann) sagt <em>encantado</em>, María (Frau) sagt <em>encantada</em>.' } },
        { word: 'las tapas', trans: 'die Tapas (kleine Snacks)', prompt: 'Was ist KEINE typische tapa?', options: ['aceitunas <span class="help">(Oliven)</span>', 'jamón <span class="help">(Schinken)</span>', 'Sauerkraut'], correct: 2, feedback: { right: 'Richtig — Sauerkraut ist deutsch, nicht spanisch! 😄', wrong: 'Nicht ganz. <em>Aceitunas</em> und <em>jamón</em> sind klassische tapas. Sauerkraut ist deutsch!' } },
        { word: 'el lío', trans: 'das Durcheinander, das Chaos', prompt: '<em>"Estoy hecho un lío"</em> bedeutet:', options: ['Ich bin glücklich.', 'Ich bin völlig durcheinander.', 'Ich bin pünktlich.'], correct: 1, feedback: { right: 'Ja! <em>"estar hecho un lío"</em> ist eine sehr spanische Art, Verwirrung auszudrücken.', wrong: 'Nein. <em>"lío"</em> bedeutet Durcheinander/Chaos.' } },
        { word: 'sentarse', trans: 'sich setzen', prompt: 'María sagt zu Lukas: <em>"¡_____ aquí!"</em> <span class="help">— Setz dich hierhin!</span>', options: ['Siéntate', 'Siento', 'Sentar'], correct: 0, feedback: { right: 'Richtig! <em>sentarse</em> ist ein reflexives Verb — der Imperativ ist <em>siéntate</em>.', wrong: 'Nicht ganz. Es heißt <strong>siéntate</strong> — Imperativ von <em>sentarse</em>.' } },
        { word: 'a medias', trans: 'zur Hälfte, teilweise', prompt: '<em>"Lukas entiende la explicación a medias."</em> — Wie viel versteht Lukas?', options: ['Alles, ohne Probleme.', 'Ungefähr die Hälfte.', 'Überhaupt nichts.'], correct: 1, feedback: { right: 'Ja! <em>a medias</em> = zur Hälfte.', wrong: 'Nicht ganz. <em>a medias</em> bedeutet "zur Hälfte" — also nicht alles.' } },
        { word: 'acabarse', trans: 'zu Ende gehen', prompt: 'Carmen erklärt: <em>"Lo que pasó ayer, ya se _____."</em>', options: ['acabó', 'acabará', 'acaba'], correct: 0, feedback: { right: 'Stimmt! <em>acabó</em> ist der indefinido — gestern ist eine geschlossene Tür.', wrong: 'Nicht ganz. Gestern ist schon vorbei — also indefinido: <strong>acabó</strong>.' } },
        { word: 'encontrarse (bien/mal)', trans: 'sich fühlen', prompt: 'María fragt: <em>"¿Cómo te encuentras?"</em> — Lukas ist müde aber glücklich. Wie antwortet er?', options: ['Estoy cansado, pero soy feliz.', 'Me encuentro cansada, pero feliz.', 'Me encuentro cansado, pero feliz.'], correct: 2, feedback: { right: 'Genau! <em>Me encuentro cansado</em> (Mann) — Lukas ist männlich, also -o.', wrong: 'Nicht ganz. Lukas ist ein Mann, also <em>cansado</em> mit -o. Und für "sich fühlen" nimmt man <em>encontrarse</em>.' } }
      ]
    },

    // ════════════════════════════════════════════
    // CHAPTER 4 — UN CAFÉ EN EL BARRIO
    // ════════════════════════════════════════════
    {
      number: 4,
      title: 'Un café en el barrio',
      subtitle: 'In dem Lukas entdeckt, dass ein "cortado" nicht heißt, dass der Kaffee in der Mitte abgeschnitten wurde.',
      grammarFocus: 'Pedir y querer — el verbo en el café',
      semanticField: 'Bar & Café',

      reader: `<p>Es ist Samstagvormittag. Lukas hat schlecht geschlafen — gestern war wieder Tertulia, diesmal bis zwei Uhr morgens. Aber er steht früh auf, weil er eine Mission hat: einen Kaffee in einer richtigen spanischen Bar bestellen. Allein.</p>

<p>Drei Straßen weiter liegt das <span class="es">Bar Lola</span>. Klein, alt, mit einem Tresen aus Holz und einem Fernseher in der Ecke. Drinnen sitzen drei alte Männer mit Zeitungen. Sie heben kurz den Kopf, als Lukas reinkommt, und schauen wieder runter.</p>

<p>Hinter dem Tresen steht eine Frau mit grauen Haaren. Sie trocknet Gläser. Sie schaut ihn an, ohne zu lächeln. <span class="es">"¿Qué te pongo?"</span> <span class="es-help">Was kann ich dir geben?</span></p>

<p>Lukas hat den Satz vorbereitet. <span class="es">"Quería un café, por favor."</span> <span class="es-help">Ich hätte gerne einen Kaffee, bitte.</span></p>

<p>Die Frau wartet. Lukas wartet auch. Stille.</p>

<p><span class="es">"¿Qué café?"</span> <span class="es-help">Was für einen Kaffee?</span></p>

<p>Lukas wusste nicht, dass es verschiedene gibt. <span class="es">"Eh... un café normal."</span></p>

<p>Die Frau lächelt zum ersten Mal. Es ist ein müdes, aber freundliches Lächeln. <span class="es">"¿Solo, con leche, cortado o americano?"</span></p>

<p>Lukas spürt, wie sein Spanisch wegfließt. <span class="de">Solo</span> — allein? Allein mit Milch? Was bedeutet <em>cortado</em>? <em>Geschnitten</em>? Wer schneidet einen Kaffee?</p>

<p>Er denkt schnell und entscheidet sich für die einfachste Option. <span class="es">"Con leche, por favor."</span></p>

<p>Die Frau nickt und dreht sich zur Espressomaschine. Lukas atmet aus. Sieg.</p>

<p>Während sie den Kaffee macht, schaut Lukas sich um. Auf der Tafel steht eine lange Liste:</p>

<ul style="font-family:'Lora',serif;font-style:italic;color:#2d6a4f;padding-left:1.5rem;margin:1rem 0;line-height:2;">
<li>café solo — 1,20 €</li>
<li>café con leche — 1,50 €</li>
<li>cortado — 1,30 €</li>
<li>americano — 1,40 €</li>
<li>tostada con tomate — 2,50 €</li>
</ul>

<p>Eine Tostada mit Tomate? <span class="de">Toast mit Tomate?</span> Klingt seltsam. Aber alle Spanier, die er kennt, essen das morgens.</p>

<p>Die Frau stellt einen kleinen weißen Tasse vor ihn hin. Schwarz, mit ein bisschen Milch. <span class="es">"¿Algo más?"</span> <span class="es-help">Sonst noch etwas?</span></p>

<p>Lukas atmet tief ein. <span class="es">"Sí. Una tostada con tomate, por favor. Y... ¿qué es un 'cortado'?"</span></p>

<p>Die Frau lacht jetzt richtig. <span class="es">"Un cortado es un café solo con un poquito de leche. Pequeño. Como este, pero más fuerte."</span> <span class="es-help">Ein cortado ist ein schwarzer Kaffee mit ein bisschen Milch. Klein. Wie dieser, aber stärker.</span></p>

<p><span class="es">"Ah. Entonces la próxima vez quiero un cortado."</span> <span class="es-help">Dann will ich nächstes Mal einen cortado.</span></p>

<p><span class="es">"Muy bien, alemán."</span> Sie zwinkert. <span class="es">"¿Cómo te llamas?"</span></p>

<p><span class="es">"Lukas."</span></p>

<p><span class="es">"Yo soy Lola. Bienvenido al barrio."</span></p>

<p>Eine Minute später steht eine warme Brotscheibe vor ihm. Darauf: zerdrückte Tomate mit Olivenöl und Salz. Lukas beißt rein. Es ist <em>köstlich</em>. <span class="es-help">Eine völlig neue Frühstücks-Welt.</span></p>

<p>Während er isst, hört er, wie Lola sich mit einem der alten Männer unterhält. Sie reden schnell, machen Witze, lachen. Lukas versteht zwei oder drei Wörter. Aber das ist OK. Er ist hier. Er gehört dazu, ein bisschen.</p>

<p>Als er bezahlt, sagt Lola: <span class="es">"Hasta mañana, Lukas."</span> <span class="es-help">Bis morgen.</span></p>

<p>Lukas lächelt. <span class="es">"Hasta mañana, Lola."</span></p>

<p>Es ist sein neues Lieblings-Café.</p>`,

      grammar: {
        title: 'Wie man höflich <em>bestellt</em>',
        subtitle: 'Querer, poder, dar — die drei magischen Verben im Café.',
        intro: `<p>Im Spanischen gibt es eine kleine Kunst, höflich zu bestellen. Du kannst nicht einfach sagen <em>"Ich will einen Kaffee"</em> — das klingt grob, wie im Deutschen <em>"Gib mir einen Kaffee"</em>.</p><br><p>Die Spanier benutzen drei magische Tricks: das Imperfekt (<em>quería</em>), die Höflichkeitsfrage (<em>¿me pones?</em>), und immer ein <em>por favor</em> am Ende.</p>`,
        twins: [
          { name: 'Quería', tagline: 'Das höfliche "ich hätte gerne"', example: '<strong>"Quería</strong> un café, por favor."' },
          { name: 'Quiero', tagline: 'Das direkte "ich will" — vermeiden!', example: '<strong>"Quiero</strong> un café." <span style="color:#c0392b;">← klingt zu direkt</span>' }
        ],
        rule: 'Im Café sagst du fast immer <strong>"quería"</strong> (Imperfekt) statt <strong>"quiero"</strong> (Präsens).<br>Das ist die spanische Art, Höflichkeit zu zeigen. Genau wie wir im Deutschen <em>"ich hätte gerne"</em> statt <em>"ich will"</em> sagen.',
        markers: {
          perfecto: ['<strong>Quería</strong> un café <span class="m">— ich hätte gerne einen Kaffee</span>', '<strong>¿Me pones</strong> un café? <span class="m">— Bringst du mir einen Kaffee?</span>', '<strong>¿Me das</strong> un café? <span class="m">— Gibst du mir einen Kaffee?</span>', '<strong>Para mí,</strong> un café <span class="m">— Für mich einen Kaffee</span>', 'Y siempre: <strong>por favor</strong>'],
          indefinido: ['<strong>Quiero</strong> un café <span class="m">— zu direkt</span>', '<strong>Dame</strong> un café <span class="m">— sehr fordernd</span>', '<strong>Café.</strong> <span class="m">— unhöflich</span>', '<strong>Necesito</strong> un café <span class="m">— klingt dramatisch</span>', 'Ohne <em>por favor</em> <span class="m">— wirkt kalt</span>']
        },
        tip: '<strong>🐾 Spikius mentaler Trick:</strong> Stell dir vor, du bist in einem alten spanischen Café und die Frau hinter dem Tresen ist deine Großmutter. Du würdest doch nicht sagen <em>"Oma, gib mir einen Kaffee!"</em> — sondern <em>"Oma, ich hätte gerne einen Kaffee, bitte."</em><br><br>Genau diese Wärme legst du in <strong>quería</strong>. Es ist kein Imperfekt der Zeit — es ist ein Imperfekt der Höflichkeit. Spanier verstehen das sofort.',
        exercises: [
          { prompt: 'Wie bestellst du höflich einen Cortado?', options: ['Quiero un cortado.', 'Quería un cortado, por favor.', 'Dame un cortado.'], correct: 1, feedback: { right: 'Perfekt! <em>Quería</em> + <em>por favor</em> — wie ein echter Spanier.', wrong: 'Nicht ganz. <em>Quiero</em> klingt zu direkt. Höflich: <strong>"Quería un cortado, por favor."</strong>' } },
          { prompt: 'Die Kellnerin fragt: <em>"¿Qué te pongo?"</em> Was bedeutet das?', options: ['Wie heißt du?', 'Was kann ich dir bringen?', 'Wo wohnst du?'], correct: 1, feedback: { right: 'Genau! <em>"poner"</em> wird im Café für "bringen / servieren" benutzt.', wrong: 'Nein. <em>"¿Qué te pongo?"</em> ist die typische Café-Frage: "Was kann ich dir bringen?"' } },
          { prompt: 'Du willst ein Stück Brot mit Tomate. Wie sagst du das?', options: ['Tostada con tomate.', 'Necesito una tostada con tomate.', 'Una tostada con tomate, por favor.'], correct: 2, feedback: { right: 'Sehr gut! Höflich, klar und mit dem magischen <em>por favor</em>.', wrong: 'Höflicher: <strong>"Una tostada con tomate, por favor."</strong> Das Hauptwort + por favor reicht oft.' } },
          { prompt: 'Was bedeutet <em>"¿Algo más?"</em>?', options: ['Wie viel kostet das?', 'Sonst noch etwas?', 'Kann ich zahlen?'], correct: 1, feedback: { right: 'Stimmt! Diese Frage kommt fast immer, bevor du zahlst.', wrong: 'Nein. <em>"¿Algo más?"</em> = "Sonst noch etwas?" — die Standard-Frage in jedem Café.' } }
        ]
      },

      glossary: [
        { word: 'el café solo', trans: 'der schwarze Espresso', prompt: 'Was ist ein <em>café solo</em>?', options: ['Kaffee mit viel Milch', 'Espresso ohne Milch', 'Großer amerikanischer Kaffee'], correct: 1, feedback: { right: 'Ja! "Solo" heißt hier "allein" — also nur Kaffee, ohne Milch.', wrong: 'Nein. <em>café solo</em> = Espresso pur, ohne Milch.' } },
        { word: 'el cortado', trans: 'Espresso mit einem Schuss Milch', prompt: 'Wie groß ist ein <em>cortado</em>?', options: ['Sehr groß wie ein Café con leche', 'Klein wie ein Espresso', 'Mittelgroß'], correct: 1, feedback: { right: 'Richtig! Klein und stark — ein Espresso, leicht mit Milch "geschnitten".', wrong: 'Nicht ganz. Ein cortado ist klein wie ein Espresso, aber mit einem Schuss Milch.' } },
        { word: 'la tostada con tomate', trans: 'Brotscheibe mit zerdrückter Tomate', prompt: 'Was ist drauf auf einer typischen <em>tostada con tomate</em>?', options: ['Tomatenscheiben', 'Zerdrückte Tomate mit Olivenöl', 'Tomatensoße wie auf Pizza'], correct: 1, feedback: { right: 'Genau! Klassisches spanisches Frühstück — Olivenöl, Salz, Tomate.', wrong: 'Nein. Es ist <em>zerdrückte</em> Tomate mit Olivenöl und Salz — nicht in Scheiben.' } },
        { word: '¿Qué te pongo?', trans: 'Was kann ich dir bringen?', prompt: 'Diese Frage hörst du in jeder Bar. Sie ist:', options: ['Formell und höflich', 'Locker und freundlich', 'Unhöflich'], correct: 1, feedback: { right: 'Stimmt! Das ist die alltägliche, lockere Café-Frage.', wrong: 'Nicht ganz. Es ist locker und freundlich — die normale Frage in jeder Bar.' } },
        { word: 'quería', trans: 'ich hätte gerne (höflich)', prompt: 'Warum sagt man <em>quería</em> und nicht <em>quiero</em>?', options: ['Weil es eine Vergangenheit ist', 'Weil es höflicher klingt', 'Weil es leichter zu sagen ist'], correct: 1, feedback: { right: 'Genau! Das Imperfekt wirkt höflicher — eine sehr spanische Eigenheit.', wrong: 'Es ist Höflichkeit, nicht Vergangenheit. <em>Quería</em> = "ich hätte gerne".' } },
        { word: '¿Algo más?', trans: 'Sonst noch etwas?', prompt: 'Wann hörst du diese Frage?', options: ['Wenn du das Café betrittst', 'Wenn du etwas bestellt hast', 'Wenn du zahlst'], correct: 1, feedback: { right: 'Ja! Nach deiner Bestellung fragt der Kellner immer: "Sonst noch etwas?"', wrong: 'Sie kommt nach deiner Bestellung — der Kellner möchte wissen, ob du mehr willst.' } },
        { word: 'el barrio', trans: 'das Viertel, die Nachbarschaft', prompt: 'Wenn Lola sagt <em>"Bienvenido al barrio"</em>, meint sie:', options: ['Willkommen in Spanien', 'Willkommen in unserem Viertel', 'Willkommen in der Bar'], correct: 1, feedback: { right: 'Genau! <em>barrio</em> = Viertel/Nachbarschaft — sehr wichtiges Wort in Madrid.', wrong: 'Nicht ganz. <em>barrio</em> = Viertel. Sie heißt ihn in der Nachbarschaft willkommen.' } },
        { word: 'hasta mañana', trans: 'bis morgen', prompt: 'Wenn jemand <em>"hasta mañana"</em> sagt:', options: ['Sie sehen sich morgen wieder', 'Sie verabschieden sich für immer', 'Sie wünschen guten Morgen'], correct: 0, feedback: { right: 'Stimmt! <em>hasta</em> = bis, <em>mañana</em> = morgen.', wrong: 'Nein. <em>hasta mañana</em> = "bis morgen" — sie sehen sich am nächsten Tag.' } }
      ]
    },

    // ════════════════════════════════════════════
    // CHAPTER 5 — EN EL SUPERMERCADO
    // ════════════════════════════════════════════
    {
      number: 5,
      title: 'En el supermercado',
      subtitle: 'In dem Lukas entdeckt, dass Eier in Spanien nicht im Kühlschrank stehen.',
      grammarFocus: 'Singular y plural — los productos y los precios',
      semanticField: 'Supermercado & Comida',

      reader: `<p>Sonntagmorgen. Lukas hat einen leeren Kühlschrank und einen vollen Magen voller Hunger. Er muss einkaufen. <span class="es-help">Erstes Mal allein im Supermarkt.</span></p>

<p>Auf der Straße sucht er den nächsten <span class="es">Mercadona</span>. <span class="es-help">Die größte Supermarkt-Kette in Spanien.</span> María hat gesagt, dass es einen drei Straßen weiter gibt.</p>

<p>Drinnen ist es laut, hell, voll. Familien mit Wagen. Kinder, die schreien. Aus den Lautsprechern kommt die berühmte <em>"Hola, soy Edu, feliz Navidad"</em>-Melodie, obwohl es August ist.</p>

<p>Lukas nimmt einen Wagen und beginnt seinen Rundgang. Erste Aufgabe: <span class="es">huevos</span>. <span class="es-help">Eier.</span></p>

<p>Er sucht im Kühlregal. Milch, Joghurt, Käse — aber keine Eier. <em>Das ist seltsam</em>, denkt er. <span class="de">Wo sind die Eier?</span></p>

<p>Er fragt eine Frau, die gerade Tomaten in den Wagen legt: <span class="es">"Perdón, ¿dónde están los huevos?"</span> <span class="es-help">Entschuldigung, wo sind die Eier?</span></p>

<p>Die Frau zeigt auf ein Regal in der Mitte des Ganges. <span class="es">"Allí, al lado de la harina."</span> <span class="es-help">Dort, neben dem Mehl.</span></p>

<p>Lukas geht hin. Tatsächlich: die Eier stehen einfach im Regal. Bei Raumtemperatur. <em>Nicht im Kühlschrank.</em> Sein deutsches Gehirn protestiert. <span class="de">"Aber das ist doch unhygienisch!"</span> Aber alle Spanier machen es so. Vielleicht ist Deutschland einfach kalt.</p>

<p>Er legt eine Packung mit zwölf Eiern in den Wagen. Weiter geht's.</p>

<p>Beim Brot steht eine Schlange. Lukas hört zu, wie die Leute bestellen:</p>

<p class="dialogue"><span class="es">"Una barra, por favor."</span></p>
<p class="dialogue"><span class="es">"Dos chapatas y un pan integral."</span></p>
<p class="dialogue"><span class="es">"Media barra y dos croissants."</span></p>

<p>Als Lukas dran ist, sagt er mutig: <span class="es">"Una barra, por favor."</span></p>

<p>Die Verkäuferin nickt und reicht ihm einen langen knusprigen Brotleib. <span class="es">"¿Algo más?"</span></p>

<p><span class="es">"No, gracias."</span></p>

<p>Im nächsten Gang findet er Olivenöl. <em>Tausend verschiedene Flaschen.</em> <span class="de">In Hamburg gab es vielleicht drei.</span> Hier: extra virgen, virgen, ecológico, Picual, Arbequina, Hojiblanca... Lukas wird schwindelig.</p>

<p>Er greift einfach die Flasche, die in der Mitte vom Preis ist. <em>Aceite de oliva virgen extra — Picual.</em> Er hat keine Ahnung, was das bedeutet, aber es klingt seriös.</p>

<p>An der Kasse legt er alles auf das Band: Eier, Brot, Olivenöl, Tomaten, Käse, Schinken, ein paar Bananen, und — als spontaner Luxus — eine kleine Flasche Wein.</p>

<p>Die Kassiererin scannt schnell. <span class="es">"Diecisiete con cuarenta."</span> <span class="es-help">Siebzehn vierzig.</span></p>

<p>Lukas versteht die Zahl nicht. Er schaut auf das Display: <strong>17,40 €</strong>. <em>Diecisiete con cuarenta.</em> <span class="de">Siebzehn mit vierzig.</span> Die Spanier sagen "mit" statt "Komma" beim Preis.</p>

<p>Er zahlt mit Karte. Die Kassiererin gibt ihm den Beleg. <span class="es">"Gracias, que tenga buen día."</span></p>

<p><span class="es">"Igualmente,"</span> antwortet Lukas. <span class="es-help">Gleichfalls.</span></p>

<p>Auf dem Rückweg, mit zwei vollen Tüten in den Händen, denkt er: <em>Ich bin allein einkaufen gegangen. Auf Spanisch. Und niemand ist gestorben.</em></p>

<p>Es ist ein kleiner Sieg. Aber an seinem zweiten Sonntag in Madrid fühlt er sich zum ersten Mal — ein bisschen — wie zu Hause.</p>`,

      grammar: {
        title: 'Eins, zwei, viele — <em>singular y plural</em>',
        subtitle: 'Wie spanische Wörter ihre Mehrzahl bilden — fast immer logisch.',
        intro: `<p>Im Spanischen ist die Mehrzahl bemerkenswert einfach. Im Vergleich zum Deutschen, wo wir <em>"Apfel → Äpfel"</em>, <em>"Buch → Bücher"</em>, <em>"Kind → Kinder"</em> haben — eine Katastrophe — gibt es im Spanischen zwei einfache Regeln.</p><br><p>Regel 1: Endet das Wort auf einem Vokal → einfach <strong>-s</strong> dranhängen.<br>Regel 2: Endet das Wort auf einem Konsonanten → <strong>-es</strong> dranhängen.</p><br><p>Das war's. Wirklich.</p>`,
        twins: [
          { name: 'huevo → huevos', tagline: 'Vokal am Ende → +s', example: 'un huevo · dos <strong>huevos</strong>' },
          { name: 'pan → panes', tagline: 'Konsonant am Ende → +es', example: 'un pan · dos <strong>panes</strong>' }
        ],
        rule: '<strong>Vokal am Ende</strong> (a, e, i, o, u) → einfach +<strong>s</strong>. Beispiele: <em>tomate → tomates, manzana → manzanas, libro → libros.</em><br><br><strong>Konsonant am Ende</strong> → +<strong>es</strong>. Beispiele: <em>pan → panes, profesor → profesores, ciudad → ciudades.</em>',
        markers: {
          perfecto: ['huevo → <strong>huevos</strong>', 'tomate → <strong>tomates</strong>', 'naranja → <strong>naranjas</strong>', 'café → <strong>cafés</strong>', 'libro → <strong>libros</strong>', 'casa → <strong>casas</strong>'],
          indefinido: ['pan → <strong>panes</strong>', 'flor → <strong>flores</strong>', 'mes → <strong>meses</strong>', 'ciudad → <strong>ciudades</strong>', 'mujer → <strong>mujeres</strong>', 'hotel → <strong>hoteles</strong>']
        },
        tip: '<strong>🐾 Spikius mentaler Trick:</strong> Sag das Wort einmal laut. Wenn die Zunge nach einem Vokal landet, brauchst du nur ein leichtes "s" — wie ein <em>Atemzug</em>. Wenn die Zunge an einem Konsonanten klebt, brauchst du Hilfe — ein "<em>e</em>" als Stütze, dann das "s". <em>"pan-e-s"</em> ist leichter zu sagen als <em>"pans"</em>.<br><br>Bonus-Trick: Die Preise. Spanier sagen <strong>"diecisiete <em>con</em> cuarenta"</strong> (17,40 €) — <em>"siebzehn MIT vierzig"</em>. Auch <strong>"diecisiete <em>cuarenta</em>"</strong> ohne "con" geht. Aber nie <em>"siebzehn Komma vierzig"</em> wie im Deutschen.',
        exercises: [
          { prompt: 'Wie heißt der Plural von <em>tomate</em>?', options: ['tomatos', 'tomates', 'tomatas'], correct: 1, feedback: { right: 'Genau! <em>tomate</em> endet auf einem Vokal (e) → einfach +s.', wrong: 'Nicht ganz. <em>tomate</em> endet auf "e" — also nur +s → <strong>tomates</strong>.' } },
          { prompt: 'Wie heißt der Plural von <em>pan</em>?', options: ['pans', 'panes', 'panos'], correct: 1, feedback: { right: 'Richtig! <em>pan</em> endet auf einem Konsonanten (n) → +es.', wrong: 'Nicht ganz. <em>pan</em> endet auf "n" — Konsonant. Also +es → <strong>panes</strong>.' } },
          { prompt: 'Wie sagt der Spanier "17,40 €"?', options: ['diecisiete coma cuarenta', 'diecisiete con cuarenta', 'diecisiete punto cuarenta'], correct: 1, feedback: { right: 'Stimmt! Spanier sagen <em>con</em> ("mit") oder lassen es weg, aber nie "Komma".', wrong: 'Nein. Spanier sagen <strong>"diecisiete con cuarenta"</strong> oder einfach <em>"diecisiete cuarenta"</em>. Niemals "coma".' } },
          { prompt: 'Welche Bestellung ist grammatikalisch richtig?', options: ['Una huevos, por favor.', 'Dos huevo, por favor.', 'Dos huevos, por favor.'], correct: 2, feedback: { right: 'Perfekt! <em>dos</em> + Plural (huevos) — Zahl und Substantiv stimmen überein.', wrong: 'Nicht ganz. Mit <em>dos</em> brauchst du den Plural: <strong>"Dos huevos, por favor."</strong>' } }
        ]
      },

      glossary: [
        { word: 'el supermercado', trans: 'der Supermarkt', prompt: 'Mercadona, Carrefour, Lidl sind alle Beispiele von:', options: ['restaurantes', 'supermercados', 'tiendas de ropa'], correct: 1, feedback: { right: 'Genau! Das sind die bekanntesten Supermarkt-Ketten in Spanien.', wrong: 'Nein. Das sind <em>supermercados</em> — Supermärkte.' } },
        { word: 'los huevos', trans: 'die Eier', prompt: 'In Spanien stehen die Eier...', options: ['im Kühlschrank wie in Deutschland', 'im Regal bei Raumtemperatur', 'in einer separaten Abteilung'], correct: 1, feedback: { right: 'Stimmt! Spanische Eier brauchen keine Kühlung, weil sie nicht gewaschen werden.', wrong: 'Im Regal bei Raumtemperatur! Das ist anders als in Deutschland.' } },
        { word: 'una barra (de pan)', trans: 'ein Laib Baguette', prompt: 'Eine <em>barra</em> ist:', options: ['Ein süßes Brötchen', 'Ein langes knuspriges Brot', 'Ein Brotpudding'], correct: 1, feedback: { right: 'Richtig! Ein langes Baguette-ähnliches Brot — das tägliche Brot in Spanien.', wrong: 'Nein. Eine <em>barra</em> ist ein langer, knuspriger Brotleib — wie ein Baguette.' } },
        { word: 'el aceite de oliva', trans: 'das Olivenöl', prompt: 'In Spanien gibt es ___ verschiedene Sorten Olivenöl im Supermarkt.', options: ['nur 2-3', 'mindestens 10-20', 'eine einzige Sorte'], correct: 1, feedback: { right: 'Ja! Spanien ist der größte Olivenöl-Produzent der Welt. Die Auswahl ist riesig.', wrong: 'Mindestens 10-20! Spanien hat eine riesige Auswahl: virgen extra, ecológico, Picual, Arbequina...' } },
        { word: '¿Dónde está / están?', trans: 'Wo ist / wo sind?', prompt: 'Wie fragst du im Supermarkt nach Eiern?', options: ['¿Dónde está los huevos?', '¿Dónde están los huevos?', '¿Dónde es los huevos?'], correct: 1, feedback: { right: 'Perfekt! <em>huevos</em> ist Plural → <em>están</em>.', wrong: 'Nicht ganz. Bei Plural (los huevos) brauchst du <strong>están</strong>, nicht <em>está</em>.' } },
        { word: '¿Algo más?', trans: 'Sonst noch etwas?', prompt: 'Die Kassiererin fragt: <em>"¿Algo más?"</em> Du willst nichts mehr. Was sagst du?', options: ['Sí, gracias.', 'No, nada.', 'No, gracias.'], correct: 2, feedback: { right: 'Genau! <em>No, gracias</em> — höflich abgelehnt.', wrong: 'Höflicher ist <strong>"No, gracias."</strong> — "Nein, danke."' } },
        { word: 'igualmente', trans: 'gleichfalls / ebenso', prompt: 'Wann sagt man <em>igualmente</em>?', options: ['Wenn jemand dir einen schönen Tag wünscht', 'Wenn du etwas bezahlst', 'Wenn du etwas fragen willst'], correct: 0, feedback: { right: 'Genau! "Buen día" → "Igualmente." — eine sehr typische Antwort.', wrong: 'Wenn jemand "buen día" oder "buen fin de semana" sagt → antwortest du <em>"Igualmente."</em>' } },
        { word: 'el precio', trans: 'der Preis', prompt: 'Wie sagt der Spanier "5,99 €"?', options: ['cinco coma noventa y nueve', 'cinco con noventa y nueve', 'cinco punto noventa y nueve'], correct: 1, feedback: { right: 'Richtig! <em>"con"</em> oder ohne Wort dazwischen. Niemals "coma".', wrong: 'Spanier sagen <strong>"cinco con noventa y nueve"</strong> oder einfach <em>"cinco noventa y nueve"</em>. Niemals "coma".' } }
      ]
    }

  ]
};
