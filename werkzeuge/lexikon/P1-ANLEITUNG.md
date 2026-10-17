# Pasada 1 — forma → lema + cajón (léxico Spikiu)

Spikiu es una app para aprender idiomas (meta: español, alemán, inglés, griego moderno).
Construimos un léxico fijo: cada forma de palabra que aparece en los textos de la app
apunta a su LEMA y a un CAJÓN. Trabajas en UN lote de UN idioma meta.

## Entrada
Un TSV, una línea por forma (siempre en minúsculas):
`forma<TAB>frecuencia<TAB>frase de ejemplo real donde aparece`
Usa la frase para resolver ambigüedades (ES «como» verbo vs. conjunción, DE «sie», EL «να»).

## Salida
Escribe un TSV con EXACTAMENTE una línea por forma de entrada, en el mismo orden:
`forma<TAB>lema<TAB>cajón<TAB>género`

- **forma**: igual que la entrada, sin cambios.
- **lema**: forma de diccionario, con mayúscula correcta (DE: sustantivos con mayúscula,
  «Bahnhof»; nombres propios con mayúscula; el resto en minúscula). Sin artículo.
  - Verbos: ES/DE/EN infinitivo (EN sin «to»); EL 1.ª persona singular del presente
    (μιλάω, έρχομαι, είμαι). Reflexivos ES con «-se» solo si el uso es reflexivo
    («me llamo» → llamarse). DE verbos separables con la partícula si la frase la
    muestra («fängt … an» → anfangen). Participios: lema = verbo, salvo que se usen como
    adjetivo lexicalizado (cansado, müde, tired → adjetivo).
  - Sustantivos: nominativo singular (EL: nominativo singular, sin artículo aquí).
  - Adjetivos: masculino singular (EL: masculino nominativo singular).
  - **Adverbios de modo** (cómo se hace algo) → lema = el ADJETIVO del que vienen:
    tranquilamente → tranquilo · quickly → quick · γρήγορα → γρήγορος · DE «schnell»
    adverbial → schnell. Si no hay adjetivo (ES «bien», EN «well», EL «καλά») → lema el
    propio adverbio y cajón «wie».
  - Contracciones y amalgamas (ES al, del · DE zum, im, am · EN it's, don't, I'm ·
    EL στο, στη, στον): lema = la propia forma, cajón «klein».
  - Pronombres, artículos: lema = forma base (ES la/los/las → el; DE den/dem/des → der;
    EL τον/της/του → ο; EN them → they).
- **cajón** (uno de):
  - `ding` — sustantivos (cosas, personas, lugares comunes, conceptos).
  - `tun` — verbos.
  - `wie` — adjetivos y adverbios de MODO (cómo es · cómo se hace).
  - `klein` — todo lo demás: artículos, pronombres, preposiciones, conjunciones,
    numerales, interjecciones, saludos, y adverbios de tiempo/lugar/cantidad
    (siempre, aquí, mañana, muy, πολύ, sehr, very).
  - `name` — nombres propios (personas, lugares concretos, marcas): Lotte, Madrid,
    Μαρία, Inês, Hofbauer.
  - `x` — no es una palabra de este idioma (basura, abreviatura rara, palabra de otro
    idioma que se coló, onomatopeya sin sentido). Lema = forma.
- **género**: solo para `ding`. ES el/la · DE der/die/das · EL ο/η/το · EN «-».
  Para sustantivos solo en plural o sin género claro, el artículo más normal.
  Para todo lo demás: «-».

## Reglas
- Ni comentarios ni encabezados en el TSV. Solo las líneas.
- No te saltes formas. No inventes formas nuevas.
- Griego monotónico. Español de España. Alemán estándar.
- Trabaja con cuidado de lingüista: esto lo revisa un ex-autor de Langenscheidt.
