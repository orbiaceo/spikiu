"""Vorspann und Werbeseiten für Gramática A / Cuaderno A."""
from build import page, M, esc, spikiu, icon

def _name(book):
    return 'Gramática A' if book == 'G' else 'Cuaderno A'

def title_page(book, ctx):
    if book == 'G':
        h = 'Gramática<br><em>A</em>'
        sub = 'Spanische Grammatik, die man sich merkt'
        kick = 'Spanisch · Grammatik zum Lesen und Nachschlagen'
    else:
        h = 'Cuaderno<br><em>A</em>'
        sub = 'Das Übungsheft zur Gramática A'
        kick = 'Spanisch · Übungen mit Lösungen'
    body = (f'<div class="kick">{kick}</div><h1>{h}</h1><div class="sub">{sub}</div>'
            f'<div class="lvl">A1 – A2 · Anfänger und Wiedereinsteiger</div>'
            f'<div class="pub">spikiu.com</div>{spikiu("capy")}')
    return f'<section class="page title-page" data-fixed="1"><div class="pbody" style="justify-content:center">{body}</div></section>'

def imprint_page(book, ctx):
    other = 'Cuaderno A' if book == 'G' else 'Gramática A'
    body = f'''<div class="imprint">
<p><b>{_name(book)}</b> · Spanisch A1–A2<br>Zum Buch gehört <b>{other}</b>. Beide Bände haben dieselbe Nummerierung: Abschnitt 11.5 in der Gramática ist Abschnitt 11.5 im Cuaderno.</p>
<p>Hördateien: kostenloser Download auf spikiu.com/buch</p>
<p>Konzept, Text und Redaktion: Leonardo Paredes Pernia · Gestaltung: Spikiu<br>Illustrationen: [folgt] · Icons: OpenMoji – the open-source emoji and icon project, Lizenz CC BY-SA 4.0 (openmoji.org)</p>
<p>© 2027 Leonardo Paredes Pernia · Alle Rechte vorbehalten.<br>Herstellung und Verlag: [Angaben von myBoD folgen] · ISBN [folgt]</p>
<p>1. Auflage 2027</p>
</div>'''
    return f'<section class="page nofolio" data-fixed="1"><div class="runhead"><span></span><span></span></div><div class="pbody">{body}</div><div class="folio"><span class="pn"></span><span></span></div></section>'

def promo_page(book, ctx):
    url_a = 'spikiu.com/buch'
    if book == 'G':
        h1 = 'Dieses Buch<br><em>spricht.</em>'
        lead = 'Jedes Beispiel, jede Geschichte, jeder Satz mit ▶: Du hörst alles in klarem, natürlich klingendem Spanisch – im Bus, beim Kochen, beim Joggen. Gratis zu diesem Buch.'
    else:
        h1 = 'Dieses Heft<br><em>spricht.</em>'
        lead = 'Hörübungen, Diktate, Zungenbrecher: Alle Aufnahmen zum Cuaderno kannst du gratis laden – und so oft hören, wie du willst.'
    if ctx.edition == 'digital':
        step3 = 'Oder einfach auf <span class="track">▶ 11.5-2</span> tippen – die Aufnahme startet sofort'
    else:
        step3 = 'Wo im Buch <span class="track">▶ 11.5-2</span> steht, gibt es etwas zu hören'
    body = f'''<div class="kicker">{_name(book)} · Spanisch A1–A2</div>
<h1>{h1}</h1>
<p class="lead">{lead}</p>
<div class="audio"><img src="assets/qr-audio.svg" alt="QR-Code zu den Hördateien"><div>
<div class="t">Alle Hördateien – gratis</div>
<ol><li>Code mit dem Handy scannen</li><li>Kapitel wählen oder alles auf einmal laden</li><li>{step3}</li></ol>
<div class="url">oder: {url_a}</div></div></div>
<div class="offer">{spikiu("capy")}
<div class="k">Nur für Leserinnen und Leser dieses Buches</div>
<h2>Lesen kannst du's.<br><span>Jetzt sprich es.</span></h2>
<p>Dieses Buch zeigt dir, wie Spanisch funktioniert. Spikiu bringt dich dazu, es zu benutzen – mit Gesprächen, die sich nach echtem Leben anfühlen, mit Lernromanen in deinem Tempo und mit Übungen, die genau bei deinen Fehlern ansetzen.</p>
<ul><li>Sprich mit Spikiu: im Café, beim Arzt, am Bahnhof</li><li>Lies Romane, die mit dir wachsen</li><li>Jeder Abschnitt aus diesem Buch, auch in der App</li></ul>
<div class="code"><div class="box2">XXXX–XXXX</div><small><b style="color:#fff">4 Wochen Spikiu gratis.</b><br>Code einlösen auf spikiu.com/gratis.<br>Endet automatisch – keine Kündigung nötig.</small></div>
<img class="qr2" src="assets/qr-test.svg" alt="QR-Code zum Gratis-Test"></div>
<p class="fine">Der Code gilt einmalig für ein Konto und ist bis 31.12.2028 einlösbar. Hördateien: kostenloser Download ohne Anmeldung, MP3.</p>'''
    return f'<section class="page promo nofolio" data-fixed="1"><div class="pbody">{body}</div></section>'

def howto_page(book, ctx):
    if book == 'G':
        body = f'''<div class="front"><h1>So funktioniert dieses Buch</h1>
<p class="lead">Jeder Abschnitt beginnt mit einem Satz, den du wirklich sagen würdest, und einem Bild, über das du hoffentlich schmunzelst. Dann kommt die Regel – kurz, in Alltagsdeutsch, mit Beispielen zum Anhören. Üben kannst du im <b>Cuaderno A</b>: dort hat jeder Abschnitt dieselbe Nummer.</p>
<p>Du kannst das Buch von vorn nach hinten lesen wie einen Roman. Oder du schlägst nach, was du gerade brauchst, liest eine Seite und springst ins Cuaderno. Beides ist richtig.</p>
<h2>Die Zeichen</h2>
<div class="legend">
<div class="sym"><span class="track">▶ 11.5-1</span></div><div>Hier gibt es etwas zu hören. Alle Aufnahmen: spikiu.com/buch</div>
<div class="sym"><b style="font-family:var(--f-head);font-weight:700">→ Üben</b></div><div>Am Ende jedes Abschnitts: Wo du im Cuaderno weiterübst.</div>
<div class="sym"><span class="box ojo"><span class="tag" style="margin:0">Ojo</span></span></div><div>Achtung, hier stolpern fast alle Deutschsprachigen.</div>
<div class="sym"><span class="box region"><span class="tag" style="margin:0">Así se dice en …</span></span></div><div>So sagt man es in Lateinamerika oder in anderen Regionen Spaniens.</div>
<div class="sym"><span class="box novela"><span class="tag" style="margin:0">En la novela</span></span></div><div>Ein Satz aus den Spikiu-Lernromanen, an dem man die Regel in freier Wildbahn sieht.</div>
<div class="sym">{spikiu("") .replace("<svg", "<svg style=width:9mm;height:9mm")}</div><div><b>Spikius Kniff</b> – selten, aber wenn, dann lohnt es sich: ein Trick, der eine schwierige Stelle plötzlich einfach macht.</div>
<div class="sym"><span class="c1">grün</span> · <span class="c2">rot</span></div><div>Zwei Farben für zwei Dinge, die man auseinanderhalten muss, zum Beispiel Bühne und Handlung, <span class="es">ser</span> und <span class="es">estar</span>.</div>
</div>
<h2>Welches Spanisch?</h2>
<p>Texte und Aufnahmen folgen bis A2 dem Spanisch aus Spanien (<span class="es">móvil, vosotros, coger</span>, das <span class="es">z</span> wie englisches „th“). Wo Lateinamerika anders spricht oder schreibt, steht es im Kasten <em>Así se dice en …</em>.</p></div>'''
    else:
        body = f'''<div class="front"><h1>So arbeitest du mit dem Cuaderno</h1>
<p class="lead">Jeder Abschnitt der <b>Gramática A</b> hat hier seine Übungen – mit derselben Nummer. Die Übungen werden von oben nach unten schwerer: erst hören und erkennen, dann entscheiden und bilden, am Ende übersetzen und frei schreiben.</p>
<h2>Die Zeichen</h2>
<div class="legend">
<div class="sym"><span class="track">▶ 11.5-3</span></div><div>Hörübung. Alle Aufnahmen: spikiu.com/buch</div>
<div class="sym"><b style="font-family:var(--f-mono);font-size:8pt">← Erklärung</b></div><div>Hier steht die Regel in der Gramática A.</div>
<div class="sym"><span class="ex-n" style="top:0">1</span></div><div>Nummer der Übung. Die Lösungen stehen hinten im Heft, mit kurzer Begründung, wo es knifflig ist.</div>
<div class="sym"><b style="font-family:var(--f-head);font-weight:700">Test</b></div><div>Nach jedem großen Block ein Test. Die Tabelle darunter zeigt, welcher Abschnitt zu welcher Aufgabe gehört.</div>
</div>
<h2>Ein Tipp</h2>
<p>Schreib die Lösungen nicht ins Heft, wenn du eine Übung später wiederholen willst – nimm ein Blatt daneben. Und sprich die Sätze laut. Spanisch, das nur im Kopf stattfindet, bleibt dort.</p></div>'''
    return page(body, _name(book), '', _name(book))

ENSEMBLE = [
    ('1F469-200D-1F3A8', 'Lucía', '32, Grafikdesignerin in Madrid. Chaotisch, schlagfertig, meistens zu spät dran mit allem außer mit einer guten Antwort.', '¿Yo? Yo siempre llego a tiempo… casi.'),
    ('1F9D4', 'Dani', '34, Lucías Freund. Die Ruhe selbst. Kommt immer zu spät und findet das völlig normal.', 'Tranquila, que hay tiempo.'),
    ('1F475', 'Pilar', '63, Lucías Mutter. Ruft immer im falschen Moment an und hat zu allem eine Meinung.', 'Cariño, ¿has comido?'),
    ('1F466', 'Nico', '4, Lucías Neffe. Ein Wirbelwind mit Dinosaurier-T-Shirt. Hat die Hochzeitstorte gegessen.', '¡Yo no he sido!'),
]

def ensemble_page(ctx):
    cards = ''.join(f'<div class="ens">{icon(ic)}<div><b>{n}</b>{t}<br><span class="es">«{q}»</span></div></div>' for ic, n, t, q in ENSEMBLE)
    body = f'''<div class="front"><h1>Lucía und ihre Leute</h1>
<p class="lead">Durch dieses Buch begleiten dich vier Menschen aus Madrid. Du triffst sie in Bildern, Beispielen und Übungen – und nach ein paar Kapiteln weißt du, was von ihnen zu erwarten ist.</p>
<div class="ensemble">{cards}</div>
<p style="margin-top:4mm;font-size:8.6pt;color:var(--sage)">Dazu kommen Kellner, Nachbarn, Chefs, Ex-Freunde und ein Papagei. Alle frei erfunden – Ähnlichkeiten mit deiner Familie sind trotzdem möglich.</p></div>'''
    return page(body, 'Gramática A', '', 'Gramática A')

def back_promo(book, ctx):
    body = f'''<div class="kicker" style="font-family:var(--f-mono);font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:var(--red)">Wie geht es weiter?</div>
<h1 style="font-family:var(--f-head);font-weight:700;font-size:24pt;line-height:1.05;margin:2mm 0 4mm">Von A nach B –<br><span style="color:var(--sun)">und ins Gespräch.</span></h1>
<p style="font-size:9.8pt;max-width:120mm">Wenn du hier angekommen bist, kannst du über deinen Alltag sprechen, von gestern erzählen und Pläne machen. Die <b>Gramática B</b> und das <b>Cuaderno B</b> führen dich weiter: zum Subjuntivo, zu Bedingungen, zur indirekten Rede – bis zum Feinschliff auf C-Niveau.</p>
<div class="offer" style="margin-top:8mm">{spikiu("capy")}<div class="k">Für dich mit diesem Buch</div><h2>4 Wochen Spikiu<br><span>gratis.</span></h2>
<p>Den Code findest du vorne im Buch. Einlösen auf spikiu.com/gratis.</p></div>'''
    return f'<section class="page promo nofolio" data-fixed="1"><div class="pbody">{body}</div></section>'
