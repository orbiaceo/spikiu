// ── SPIKIU · RÜCKMELDUNG NACH EINER SZENE ──────────────────────────
// EIN Endpoint für ALLE Zielsprachen. Sprache ist ein FELD (`zielsprache`),
// kein Datei-Schnitt. Stil wie api/gespraech.js: `export default`, KEIN
// import.meta, keine Laufzeit-Dateien.
//
// WARUM ES DIESEN ENDPOINT GIBT
// Die Szene selbst kostet nichts: Spikiu antwortet aus der Datenbank, und
// während des Gesprächs wird gar nicht geprüft — prüfen ohne Verstehen ist
// Raten, und Raten lag daneben. Verstanden wird EINMAL, hier, am Ende.
//
// ══════════════════════════════════════════════════════════════════
// WAS AM 31.08. SCHIEFGING — und warum dieser Prompt so knapp ist
//
// Die erste Fassung bat um eine ERKLÄRUNG zu jedem Fehler. Ergebnis bei
// „Uno pescado y uno ensalda":
//   „Vor pescado brauchst du una, nicht uno, und ensalada hat kein d am Ende."
// Beides falsch erfunden. Leo: „ein besoffener Lehrer, der nicht weiß, was
// er sagt."
//
// Der Grund ist keine Modellschwäche, sondern eine falsche Frage. Eine Form
// zu KORRIGIEREN ist leicht („uno pescado" → „un pescado"). Zu ERKLÄREN,
// warum, verlangt grammatisches Nachdenken — und genau dort erfindet ein
// kleines Modell. Also fragen wir nicht mehr danach.
//
// Zweiter Fehler derselben Fassung: die Musterzeile ging mit. Das Modell
// verglich damit und „korrigierte" die völlig gültige Antwort „2" zu
// „Para dos, por favor." Die Musterzeile bleibt jetzt hier.
//
// ES GIBT NUR NOCH ZWEI ZEILEN JE ANMERKUNG:
//   was der Lerner schrieb  ·  dieselbe Zeile, minimal berichtigt
// Keine Erklärung, kein Schlusswort, kein Stilrat.
// ══════════════════════════════════════════════════════════════════
//
// KOSTEN: rund ein Zehntel Cent je Szene auf Haiku.

const SPRACHE = { de: 'Deutsch', es: 'Spanisch', en: 'Englisch', el: 'Griechisch' };

// Überschrift und der Satz für den fehlerfreien Fall stehen HIER, nicht im
// Modell. Feste Worte sollen fest sein — ein Modell formuliert sie jedes Mal
// anders und irgendwann daneben.
// „sauber" erscheint NICHT als eigene Karte, sondern als kurzer Gruß ÜBER
// der Wortliste (Leo, 31.08.: eine Karte, auf der nur „Alles saß" steht, ist
// keine Rückmeldung).
const WORTE = {
  de: { titel: 'Deine Sätze, berichtigt', sauber: 'Sehr gut!' },
  es: { titel: 'Tus frases, corregidas',  sauber: '¡Muy bien!' },
  en: { titel: 'Your sentences, corrected', sauber: 'Well done!' }
};

function systemPrompt(ziel, szene, stand) {
  const ZS = SPRACHE[ziel] || 'Spanisch';
  const STAND = { anfang: 'Anfänger', mittel: 'mittleres Niveau',
                  fortgeschritten: 'fortgeschritten' }[stand] || 'Anfänger';

  return [
    `Ein Lerner (${STAND}) hat kurze Sätze auf ${ZS} geschrieben.`,
    szene ? `\nDie Szene: ${szene}\n` : '',
    'Zu jeder Zeile bekommst du drei Angaben, die den Sinn festlegen:',
    '- was der Lerner in diesem Zug sagen sollte (seine Aufgabe)',
    `- was sein Gegenüber unmittelbar davor gesagt hat, auf ${ZS}`,
    '- eine mögliche Formulierung, damit du die Lage verstehst',
    '',
    '════ DEINE REGEL, WICHTIGER ALS ALLES ANDERE ════',
    'Gib jede Zeile zurück. Ändere sie NUR, wenn sie einen FEHLER enthält.',
    'Ist sie richtig, gib sie Zeichen für Zeichen UNVERÄNDERT zurück.',
    '',
    'ES GIBT VIELE RICHTIGE FORMULIERUNGEN. Weicht der Lerner von der',
    'möglichen Formulierung ab und ist trotzdem korrekt, ist das KEIN Fehler.',
    'Beispiele für Sätze, die alle richtig sind und unverändert bleiben:',
    '- „Me duele la cabeza." und „Tengo dolor de cabeza." — beide richtig.',
    '- „Tengo gripe.", „Me he cogido una gripe.", „Ando con gripe." — alle drei.',
    '- „¿Está libre?" und „¿Está usted libre?" — beide richtig.',
    'Die mögliche Formulierung ist KEIN Ziel. Schreibe sie nicht ab und',
    'drücke die Zeile des Lerners nicht in ihre Form.',
    '',
    'Verlange auch keine gehobenere Fassung, als sein Niveau erwarten lässt.',
    'Einfach und richtig ist richtig.',
    '',
    '════ WAS EIN FEHLER IST ════',
    '- Rechtschreib- und Tippfehler, falsche Akzente',
    '- falsche Wortformen (Endung, Zeit, Artikel, falsche Person)',
    `- Wörter aus einer anderen Sprache statt ${ZS}`,
    '- fehlende kleine Wörter, ohne die der Satz nicht steht',
    '- Wortfolgen ohne Sinn — gib dann zurück, was er sagen wollte',
    '- ein Satz, der in DIESER Lage nicht passt, weil er die falsche Person',
    '  meint: „¿Teno manzanas?" will „¿Tiene manzanas?" sein — der Kunde',
    '  fragt die Verkäuferin, nicht sich selbst.',
    '',
    'Mischt der Lerner eine andere Sprache hinein, ersetze das Wort durch das',
    `richtige ${ZS}e. Übersetze dabei nicht wörtlich, sondern nimm die`,
    'Wendung, die man an DIESER Stelle wirklich sagt.',
    '',
    'NUR BERICHTIGEN, NICHT ERKLÄREN. Keine Begründung, kein Lob, kein Rat.',
    '',
    'ANTWORTE AUSSCHLIESSLICH MIT JSON, ohne Vorwort, ohne Codeblock:',
    '{"zeilen":["…","…","…"]}',
    'Dieselbe Reihenfolge, dieselbe Anzahl wie die Eingabe.'
  ].filter(Boolean).join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'missing_api_key' });
  }

  const body = req.body || {};
  const ziel = body.zielsprache || 'es';
  const mutter = body.muttersprache || 'de';
  const worte = WORTE[mutter] || WORTE.de;

  // Je Zug: was er schrieb, was seine Aufgabe war, was das Gegenüber davor
  // sagte. Ohne diesen Zusammenhang wurde „Tengo desayuno?" wörtlich zu
  // „Sí. ¿Tengo desayuno?" repariert statt zu „¿Tienen desayuno?" (31.08.).
  //
  // Die Musterzeile geht seit dem 31.08. wieder MIT — aber ausdrücklich als
  // „so sagt man es hier üblicherweise", nicht als Lösung. Ohne sie hielt
  // Haiku beim Bezahlen im Supermarkt „Por favor." für „La cuenta, por favor"
  // (die Café-Formel). Dass sie früher schadete, lag daran, dass DAS MODELL
  // den Vergleich machte; das tut jetzt der Code, und die kurzen gültigen
  // Antworten schützt das Sicherheitsnetz weiter unten.
  const zuege = (Array.isArray(body.zuege) ? body.zuege : [])
    .map(z => ({
      gesagt:  String((z && z.gesagt) || '').slice(0, 200),
      aufgabe: String((z && z.aufgabe) || '').slice(0, 120),
      vorher:  String((z && z.vorher) || '').slice(0, 200),
      ueblich: String((z && z.ueblich) || '').slice(0, 200)
    }))
    .filter(z => z.gesagt.trim());

  const zeilen = zuege.map(z => z.gesagt);

  if (!zeilen.length) {
    return res.status(200).json({ korrekturen: [], worte });
  }

  const eingabe = zuege.map((z, i) => {
    const teile = [`${i + 1}. Geschrieben: ${z.gesagt}`];
    if (z.aufgabe) teile.push(`   Aufgabe: ${z.aufgabe}`);
    if (z.vorher)  teile.push(`   Gegenüber sagte davor: ${z.vorher}`);
    if (z.ueblich) teile.push(`   Eine mögliche Formulierung: ${z.ueblich}`);
    return teile.join('\n');
  }).join('\n\n');

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        // Drei berichtigte Zeilen brauchen keine 300 Token. Der Client kann
        // das nicht anheben.
        max_tokens: 400,
        system: systemPrompt(ziel, String(body.szene || '').slice(0, 200),
                             String(body.koennen || 'anfang')),
        messages: [{ role: 'user', content: eingabe }]
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    let roh = (data.content && data.content[0] && data.content[0].text) || '';
    roh = roh.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();

    let out;
    try {
      out = JSON.parse(roh);
    } catch (e) {
      // Kaputtes JSON darf die Szene nicht sprengen: lieber leer als kaputt.
      // `roh` geht mit, damit im Browser sichtbar wird, WAS zurückkam.
      return res.status(200).json({ korrekturen: [], worte, roh });
    }

    // ══════════════════════════════════════════════════════════════
    // DER VERGLEICH LIEGT HIER, NICHT IM MODELL (Leo, 31.08.)
    //
    // Vorher entschied das Modell selbst, ob etwas ein Fehler ist. Mit einer
    // Liste „das sind keine Fehler" davor wurde es so vorsichtig, dass
    // „No hago tiempo", „Sabo nada." und „Eh no se" allesamt durchgingen und
    // der Lerner „Sehr gut!" bekam.
    //
    // Jetzt berichtigt das Modell nur noch JEDE Zeile. Ob sich etwas geändert
    // hat, stellt der Code fest — deterministisch, ohne Urteil.
    // Engine statt Prompt, wie beim Sieb.
    // ══════════════════════════════════════════════════════════════
    const zurueck = Array.isArray(out.zeilen) ? out.zeilen : [];

    // AKZENTE BLEIBEN STEHEN. Sie wegzunormalisieren war ein Fehler: bei
    // „Eh no se" → „Eh, no sé." IST der Akzent die Korrektur, und der
    // Vergleich hielt beide für gleich (gefunden beim Selbsttest 31.08.).
    // Ignoriert werden nur Groß-/Kleinschreibung, Leerraum und die
    // Satzzeichen am Rand — ein fehlendes ¿ oder ein Punkt am Ende ist
    // keine Meldung wert.
    const flach = t => String(t || '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/^[¿¡"'\s]+/, '')
      .replace(/[.,;:!?"'\s]+$/, '')
      .trim();

    const korrekturen = [];
    for (let i = 0; i < zeilen.length; i++) {
      const alt = zeilen[i];
      const neu = String(zurueck[i] || '').trim();
      if (!neu) continue;
      if (flach(alt) === flach(neu)) continue;      // nichts geändert → kein Fehler

      // Sicherheitsnetz, eng gefasst: geschützt sind NUR die kurzen, gültigen
      // Antworten, die das Modell gern zu ganzen Sätzen ausbaut — „2" wurde
      // zu „Para dos, por favor." (31.08.).
      const kern = alt.replace(/[.,!?¿¡]/g, '').trim();
      const kurzUndGueltig = /^\d+$/.test(kern)
        || (kern.split(/\s+/).length === 1 && kern.length <= 4);
      if (kurzUndGueltig && neu.replace(/[.,!?¿¡]/g, '').trim().split(/\s+/).length > 2) continue;

      korrekturen.push({ nr: i + 1, richtig: neu });
    }

    return res.status(200).json({ korrekturen, worte, roh });
  } catch (e) {
    return res.status(502).json({
      error: 'anthropic_unreachable',
      detail: String((e && e.message) || e)
    });
  }
}
