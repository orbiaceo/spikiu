// ── SPIKIU · RÜCKMELDUNG NACH EINER SZENE ──────────────────────────
// EIN Endpoint für ALLE Zielsprachen. Sprache ist ein FELD (`zielsprache`),
// kein Datei-Schnitt. Stil wie api/gespraech.js: `export default`, KEIN
// import.meta, keine Laufzeit-Dateien.
//
// WARUM ES DIESEN ENDPOINT GIBT
// Die Szene selbst kostet nichts: Spikiu antwortet aus der Datenbank, und
// geprüft wird während des Gesprächs gar nicht. Der Grund steht in
// szene.html — prüfen ohne Verstehen ist Raten, und Raten lag daneben
// („12" statt „doce", „Sí." statt „Sí, tengo una hermana.").
//
// Verstanden wird EINMAL, hier, am Ende: drei kurze Paare aus dem, was der
// Lerner sagen sollte, und dem, was er wirklich geschrieben hat. Ein Aufruf
// je Szene statt sechs. Der Systemprompt ist absichtlich klein — er trägt
// weder die Seele noch einen Raum-Modus, denn hier wird nicht gesprochen,
// sondern nachgesehen.
//
// KOSTEN: rund ein Zehntel Cent je Szene auf Haiku.

const SPRACHE = { de: 'Deutsch', es: 'Spanisch', en: 'Englisch', el: 'Griechisch' };

// Die Überschriften der Karte kommen vom Server, damit alle Räume dieselben
// Worte benutzen. Muttersprache des Lerners.
const WORTE = {
  de: { titel: 'Ein Blick auf deine Sätze', gut: 'Das saß.', besser: 'Natürlicher wäre' },
  es: { titel: 'Una mirada a tus frases',   gut: 'Bien dicho.', besser: 'Más natural sería' },
  en: { titel: 'A look at your sentences',  gut: 'That worked.', besser: 'More natural would be' }
};

// SPIKIU DUZT IMMER (Leo, 31.08.).
// Die ROLLE in der Szene kann siezen — der Taxifahrer sagt „¿Lleva maletas?".
// Aber hier spricht nicht die Rolle, sondern Spikiu, und Spikiu spricht mit
// dem Lerner. Das gilt in allen Sprachen: du · tú · you.
const ANREDE = {
  de: 'Duze den Lerner („du", nie „Sie").',
  es: 'Tutea al alumno („tú", nunca „usted").',
  en: 'Address the learner informally as "you".'
};

function systemPrompt(ziel, mutter, koennen) {
  const ZS = SPRACHE[ziel] || 'Spanisch';
  const MU = SPRACHE[mutter] || 'Deutsch';
  const anrede = ANREDE[mutter] || ANREDE.de;

  return [
    `Du bist Spikiu. Ein Lerner hat gerade eine kurze Übungsszene auf ${ZS} gespielt.`,
    `Seine Muttersprache ist ${MU}. Sein Stand: ${koennen || 'anfang'}.`,
    '',
    'Du bekommst je Aufgabe zwei Zeilen: was er sagen sollte (Musterzeile aus dem',
    'Skript) und was er wirklich geschrieben hat. Sieh dir nur das Geschriebene an.',
    '',
    'DEINE AUFGABE:',
    '- Nenne NUR die Antworten, bei denen es wirklich natürlicher geht.',
    '- Was verständlich und idiomatisch war, lässt du weg. Kein Lob für',
    '  Selbstverständliches, keine Aufzählung des Gelungenen.',
    '- Die Musterzeile ist EINE Möglichkeit, nicht die einzig richtige. Eine andere,',
    '  gute Formulierung ist KEIN Fehler — auch nicht eine sehr kurze Antwort,',
    '  wenn sie in der Situation passt.',
    '- Zahlen als Ziffern („12") sind richtig geschrieben, kein Fehler.',
    '',
    'JEDE ANMERKUNG BESTEHT AUS ZWEI TEILEN:',
    `- "besser": eine natürlichere Fassung auf ${ZS}, nah an dem, was er wollte.`,
    `- "warum": ein kurzer Satz auf ${MU}, in Alltagssprache.`,
    '',
    'SPRACHE DER ERKLÄRUNG:',
    '- Keine Fachbegriffe. Kein Nominativ, kein Akkusativ, kein Subjekt, kein Objekt,',
    '  kein Konjunktiv, kein Perfekt. Sag stattdessen, was man hört: "das kleine Wort',
    '  davor fehlt", "so klingt es wie eine Frage", "das sagt man hier nicht".',
    `- ${anrede}`,
    '- Höchstens ein Satz je Anmerkung. Keine Einleitung, keine Ermutigungsfloskel.',
    '',
    '"schluss" ist EIN Satz. Wenn nichts anzumerken war, sag knapp und ohne',
    'Überschwang, dass es saß. Sonst nenne in einem Satz, worauf er beim nächsten',
    'Mal achten kann.',
    '',
    'ANTWORTE AUSSCHLIESSLICH MIT JSON, ohne Vorwort, ohne Codeblock:',
    '{"anmerkungen":[{"nr":1,"besser":"…","warum":"…"}],"schluss":"…"}',
    'nr ist die Nummer der Aufgabe. Ist nichts anzumerken: "anmerkungen":[].'
  ].join('\n');
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
  const koennen = body.koennen || 'anfang';
  const paare = Array.isArray(body.paare) ? body.paare.slice(0, 6) : [];

  // Ohne Paare gibt es nichts nachzusehen — und keinen Grund, Geld auszugeben.
  if (!paare.length) {
    return res.status(200).json({ anmerkungen: [], schluss: '', worte: WORTE[mutter] || WORTE.de });
  }

  // Harte Deckel gegen aufgeblähte Eingaben aus dem Client (Lehre vom 19.08.:
  // der Client darf keine Grenze nach oben schieben).
  const zeilen = paare.map((p, i) => {
    const soll = String(p.erwartet || '').slice(0, 200);
    const ist = String(p.gesagt || '').slice(0, 200);
    return `Aufgabe ${i + 1}\n  Musterzeile: ${soll}\n  Geschrieben: ${ist}`;
  }).join('\n\n');

  const szene = body.szene
    ? `Szene: ${String(body.szene).slice(0, 120)}\n\n`
    : '';

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
        // Drei Anmerkungen zu je zwei kurzen Zeilen plus ein Schlusssatz
        // passen bequem in 600 Token. Der Client kann das nicht anheben.
        max_tokens: 600,
        system: systemPrompt(ziel, mutter, koennen),
        messages: [{ role: 'user', content: szene + zeilen }]
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    let roh = (data.content && data.content[0] && data.content[0].text) || '';
    // Sicherheitsnetz, falls doch ein Codeblock kommt.
    roh = roh.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();

    let out;
    try {
      out = JSON.parse(roh);
    } catch (e) {
      // Kaputtes JSON darf die Szene nicht sprengen: lieber leer als kaputt.
      return res.status(200).json({
        anmerkungen: [], schluss: '', worte: WORTE[mutter] || WORTE.de, roh
      });
    }

    const anmerkungen = Array.isArray(out.anmerkungen) ? out.anmerkungen.slice(0, 6) : [];
    return res.status(200).json({
      anmerkungen,
      schluss: String(out.schluss || ''),
      worte: WORTE[mutter] || WORTE.de
    });
  } catch (e) {
    return res.status(502).json({
      error: 'anthropic_unreachable',
      detail: String((e && e.message) || e)
    });
  }
}
