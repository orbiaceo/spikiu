# Pasada 2 — una FICHA por lema (léxico Spikiu)

Spikiu es una app para aprender idiomas. Idiomas meta: español (es), alemán (de),
inglés (en), griego moderno (el). Lenguas maternas posibles: de, es, en, el (nunca la
misma que la meta). Cada ficha se muestra al alumno cuando toca una palabra que ha
guardado en su «cofre». Trabajas en UN lote de UN idioma meta. Lo revisa un lingüista
(ex-autor de Langenscheidt): precisión ante todo, cero relleno.

## Entrada
JSONL, una línea por lema:
`{"l":lema,"a":cajón,"g":artículo|null,"fo":[formas vistas],"ex":"frase real del corpus"}`
cajón: ding (sustantivo) · tun (verbo) · wie (adjetivo / adverbio de modo) · klein (resto).
Si ves que el cajón o el lema está mal, corrígelo en tu salida (mismo "id").

## Salida
JSONL (una línea JSON válida por lema de entrada, mismo orden, sin texto extra).
Campos — incluye SOLO los que aplican:

- `id`: copia exacta de `l` de entrada.
- `l`: lema corregido si hace falta (si no, igual).
- `a`: cajón (corregido si hace falta).
- `g`: (solo ding) artículo: es el/la · de der/die/das · el ο/η/το · en omitir.
- `pl`: (solo ding, si existe) plural CON artículo: «las estaciones», «die Bahnhöfe»,
  «οι σταθμοί», «stations». Omitir si no tiene plural o es incontable.
- `fo`: (solo wie, adjetivos con variación) formas: «tranquilo · tranquila · tranquilos ·
  tranquilas» · «γρήγορος · γρήγορη · γρήγορο». DE/EN: omitir (no varían en el diccionario).
- `tr`: traducción corta (1–4 palabras) a las TRES lenguas que NO son la meta, objeto
  {de,es,en,el} sin la clave de la meta. Para sustantivos con artículo en de/es/el
  («der Bahnhof», «la estación», «ο σταθμός»), en inglés sin artículo. Si hay dos
  sentidos muy distintos, «sentido1 · sentido2».
- `b`: frase de ejemplo en la lengua meta, corta (máx. 8 palabras), natural, de nivel
  sencillo, que muestre el uso más útil. Puedes adaptar la frase real `ex`.
- `bt`: traducción de `b` a las tres lenguas no-meta, objeto {de,es,en,el} sin la meta.
- `lt`: SOLO si la meta es griego: transcripción latina del lema con el sistema de la app:
  acento en la vocal tónica (monosílabos sin acento), χ=ch, θ=th, ξ=x, ψ=ps, β=v, δ=d,
  γ=g (ante e/i: y), γγ=ng, ου=ou, αι=e, ει/οι/υ/η/ι=i, αυ/ευ=av/ev o af/ef, μπ=b
  (interior mb/mp), ντ=d (interior nd), γκ=g. Ej.: σταθμός → stathmós, περιμένω → periméno.
- `v`: (solo tun) VALENCIA, SOLO si el verbo rige algo que el alumno tiene que aprender
  (preposición fija, caso, «a» personal, construcción tipo gustar/αρέσω, reflexivo,
  objeto obligatorio diferente de su lengua). No para verbos sin rasgo especial.
  `{"m": molde con huecos entre corchetes, "b": ejemplo, "bt": {traducciones}, "o": {…}}`
  - `m` ejemplos: «warten auf [den · die · das …]» · «helfen [dem · der · dem …]» ·
    «περιμένω [τον · την · το …]» · «[μου · σου · του] αρέσει [ο · η · το …]» ·
    «esperar [a] [alguien] · esperar [algo]» · «wait [for] [someone · something]» ·
    «depend [on] [something]». Usa artículos para mostrar el caso. NUNCA términos
    gramaticales (nada de Akkusativ, dativo, objeto, sujeto).
  - `o`: aviso de contraste SOLO donde hay una trampa real para hablantes de esa lengua
    materna; objeto con claves de lengua materna (sin la meta), cada texto ESCRITO EN esa
    lengua materna, máx. 15 palabras, sin jerga. Omite las lenguas sin trampa; omite `o`
    entero si no hay ninguna. Ej. meta de, o.es: «Siempre con «auf», nunca «für».»
- `adv`: (solo wie, adjetivos que tienen adverbio de modo usual)
  `{"f": forma adverbial, "b": ejemplo, "bt": {…}, "h": {…}}`
  - `h`: pista corta de cómo se forma, objeto {de,es,en,el} sin la meta, cada una escrita
    en esa lengua: «Para «cómo se hace» suele terminar en -α: γρήγορος → γρήγορα.»
    En alemán (meta de): «la misma palabra para los dos usos».
  - Omitir `adv` si el adjetivo no se usa como adverbio de modo.
- Para `name`: solo `id`, `l`, `a`. Para `x`: solo `id`, `a:"x"`.

## Reglas de lengua (obligatorias)
- Español: castellano de España (móvil, ordenador, coche, billete, zumo, patata, piso,
  camarero, vosotros para el plural informal, pretérito perfecto para lo de hoy). Nada de
  calcos del inglés; el gerundio solo para lo que está pasando ahora mismo («Mañana
  llueve», no «Mañana está lloviendo»). Nunca voseo.
- Alemán estándar. Inglés estadounidense neutro. Griego monotónico.
- Frases de ejemplo sin política, sin violencia, cotidianas.
- Traducciones fieles y naturales, no palabra por palabra.

## Formato
Cada línea JSON válida en UTF-8, comillas tipográficas permitidas dentro de los textos.
Comprueba al final que el archivo tiene tantas líneas como la entrada y que cada línea
se puede parsear como JSON (por ejemplo con `python3 -c` o `node -e`). Corrige si no.
