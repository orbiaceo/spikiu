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

function systemPrompt(ziel, szene) {
  const ZS = SPRACHE[ziel] || 'Spanisch';

  return [
    `Du berichtigst Sätze auf ${ZS}, die ein Lerner in einer Übungsszene geschrieben hat.`,
    szene ? `\nDie Szene: ${szene}\n` : '',
    'Zu jeder Zeile bekommst du zwei Angaben, die den Sinn festlegen:',
    '- was der Lerner in diesem Zug sagen sollte (seine Aufgabe)',
    `- was sein Gegenüber unmittelbar davor gesagt hat, auf ${ZS}`,
    '',
    'BERICHTIGE MIT BLICK AUF DIESEN ZUSAMMENHANG. Ein Satz, der für sich',
    'genommen richtig aussieht, kann in dieser Lage falsch sein:',
    '„Tengo desayuno?" heißt „Habe ich Frühstück?" — im Hotel gefragt wird',
    '„¿Tienen desayuno?".',
    '',
    'Gib JEDE Zeile berichtigt zurück, in derselben Reihenfolge und Anzahl.',
    'Ist eine Zeile schon richtig, gib sie unverändert zurück.',
    'Ergibt sie keinen Sinn, gib das zurück, was der Lerner sagen wollte.',
    '',
    'ÄNDERE SO WENIG WIE NÖTIG. Die Wörter des Lerners bleiben stehen, wo sie',
    'tragen. Keine Verschönerung, keine höflichere Fassung, kein Ausbau einer',
    'kurzen Antwort zu einem ganzen Satz.',
    '',
    'Nur die Zeilen. Keine Erklärung, kein Kommentar, keine Nummerierung im Text.',
    '',
    'ANTWORTE AUSSCHLIESSLICH MIT JSON, ohne Vorwort, ohne Codeblock:',
    '{"zeilen":["…","…","…"]}'
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
  // Die MUSTERZEILE geht weiterhin NICHT mit: sie machte jede Abweichung zum
  // Fehler und verwandelte das gültige „2" in „Para dos, por favor.".
  // Aufgabe und Vorzeile geben den Sinn, ohne eine Lösung vorzuschreiben.
  const zuege = (Array.isArray(body.zuege) ? body.zuege : [])
    .map(z => ({
      gesagt:  String((z && z.gesagt) || '').slice(0, 200),
      aufgabe: String((z && z.aufgabe) || '').slice(0, 120),
      vorher:  String((z && z.vorher) || '').slice(0, 200)
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
        system: systemPrompt(ziel, String(body.szene || '').slice(0, 160)),
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
