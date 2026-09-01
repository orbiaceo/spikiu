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

function systemPrompt(ziel) {
  const ZS = SPRACHE[ziel] || 'Spanisch';

  return [
    `Ein Lerner hat kurze Sätze auf ${ZS} geschrieben. Berichtige sie.`,
    '',
    'GIB JEDE ZEILE ZURÜCK, DIE EINEN FEHLER ENTHÄLT. Dazu gehören:',
    '- Rechtschreibfehler und Tippfehler',
    '- falsche Wortformen (falsche Endung, falsche Zeit, falscher Artikel)',
    `- Wörter aus einer anderen Sprache statt ${ZS}`,
    '- fehlende kleine Wörter, ohne die der Satz nicht steht',
    '- Wortfolgen, die keinen Sinn ergeben — schreibe dann, was der Lerner',
    '  in dieser Lage vermutlich sagen wollte',
    '',
    'Sei nicht zurückhaltend: hat eine Zeile einen Fehler, gehört sie in die Liste.',
    '',
    'NUR BERICHTIGEN, NICHT ERKLÄREN. Keine Begründung, kein Lob, kein Rat,',
    'kein Kommentar. Nur die berichtigte Zeile.',
    '',
    'ÄNDERE SO WENIG WIE NÖTIG:',
    '- Wortwahl und Satzbau des Lerners bleiben, wenn sie verständlich sind.',
    '- Keine Verschönerung, keine höflichere oder idiomatischere Fassung.',
    '',
    'DAS SIND KEINE FEHLER — nicht anfassen und NICHT in die Liste:',
    '- Kurze Antworten. "2", "Sí.", "Ja.", "Mucho." sind in einem Gespräch',
    '  vollständige, richtige Antworten. Niemals zu ganzen Sätzen ausbauen.',
    '- Zahlen als Ziffern. "2" ist richtig geschrieben.',
    '- Fehlende Frage- oder Anführungszeichen, wenn der Satz klar ist.',
    '',
    'ANTWORTE AUSSCHLIESSLICH MIT JSON, ohne Vorwort, ohne Codeblock:',
    '{"korrekturen":[{"nr":1,"richtig":"…"}]}',
    'nr ist die Nummer der Zeile. "richtig" ist die berichtigte Zeile, sonst nichts.',
    'Ist keine Zeile zu berichtigen: {"korrekturen":[]}'
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
  const worte = WORTE[mutter] || WORTE.de;

  // Nur die Zeilen des Lerners. Die Musterzeile geht bewusst NICHT mit —
  // sonst wird jede Abweichung davon zum „Fehler" (Lehre vom 31.08.).
  const zeilen = (Array.isArray(body.zeilen) ? body.zeilen : [])
    .map(z => String(z || '').slice(0, 200))
    .filter(z => z.trim());

  if (!zeilen.length) {
    return res.status(200).json({ korrekturen: [], worte });
  }

  const eingabe = zeilen.map((z, i) => `${i + 1}. ${z}`).join('\n');

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
        max_tokens: 300,
        system: systemPrompt(ziel),
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
      return res.status(200).json({ korrekturen: [], worte, roh });
    }

    const korrekturen = (Array.isArray(out.korrekturen) ? out.korrekturen : [])
      .slice(0, 6)
      .map(k => ({ nr: parseInt(k.nr, 10) || 0, richtig: String(k.richtig || '').trim() }))
      .filter(k => k.nr > 0 && k.richtig)
      // Sicherheitsnetz, eng gefasst: geschützt sind NUR die kurzen, gültigen
      // Antworten, die das Modell gern zu ganzen Sätzen ausbaut — „2" wurde
      // zu „Para dos, por favor." (31.08.). Alles andere darf so lang werden
      // wie nötig; bei Unsinn ist die richtige Fassung nun mal länger.
      .filter(k => {
        const alt = (zeilen[k.nr - 1] || '').trim().toLowerCase();
        const neu = k.richtig.trim().toLowerCase();
        if (!alt || alt === neu) return false;

        const kern = alt.replace(/[.,!?¿¡]/g, '').trim();
        const kurzUndGueltig = /^\d+$/.test(kern) || (kern.split(/\s+/).length === 1 && kern.length <= 4);
        if (!kurzUndGueltig) return true;

        // Kurze gültige Antwort: nur durchlassen, wenn es eine echte
        // Berichtigung ist und kein Ausbau zum Satz.
        return neu.replace(/[.,!?¿¡]/g, '').trim().split(/\s+/).length <= 2;
      });

    return res.status(200).json({ korrekturen, worte });
  } catch (e) {
    return res.status(502).json({
      error: 'anthropic_unreachable',
      detail: String((e && e.message) || e)
    });
  }
}
