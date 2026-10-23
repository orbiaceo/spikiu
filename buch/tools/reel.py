"""reel.py — Gramática A als Kartenstapel fürs Handy (Leo, 24.10.2026, 00:27: „Ausgezeichnet! Ins Repo damit!“).

Aus derselben Quelle wie Buch und PDF: content/kap-XX.json → buch/Gramatica-Karten.html.
Pro Abschnitt: Theorie-Karten → „Willst du das üben?“ → Übungskarten (Cuaderno) mit sofortiger Rückmeldung → nächster Abschnitt.
Wird von build.py (Ausgabe online) mit erzeugt.
"""
import json, os, re
import build
from build import M, strip_tags, ROOT

def _ctx():
    return build.Ctx('print', 'G')

def _html_ohne_knopf(h):
    return re.sub(r'<span class="track">[^<]*</span>', '', h)

def _stapel_tabelle(h):
    """Tabellen fürs Handy: jede Zeile wird ein eigener Kasten, jede Zelle trägt ihre Spaltenüberschrift (data-label)."""
    def tab(m):
        t = m.group(0)
        kopf = re.search(r'<tr>((?:<th>.*?</th>)+)</tr>', t)
        labels = [strip_tags(x) for x in re.findall(r'<th>(.*?)</th>', kopf.group(1))] if kopf else []
        def zeile(r):
            n = [-1]
            def zelle(c):
                n[0] += 1
                lab = labels[n[0]] if n[0] < len(labels) else ''
                return f'<td data-label="{build.esc(lab)}"' + c.group(1)
            return re.sub(r'<td(\s|>)', zelle, r.group(0))
        zellen = [strip_tags(x) for x in re.findall(r'<td[^>]*>(.*?)</td>', t, flags=re.S)]
        if not kopf and max((len(z) for z in zellen), default=0) <= 12:
            return t.replace('<table class="tb">', '<table class="tb raster">', 1)   # kurze Raster (Alphabet): fließen als Kästchen
        t = re.sub(r'<tr class="[^"]*">.*?</tr>', zeile, t, flags=re.S)
        return t.replace('<table class="tb">', '<table class="tb stapel">', 1)
    return re.sub(r'<table class="tb">.*?</table>', tab, h, flags=re.S)

def _block(b):
    """→ (html, say) für einen Gramática-Block; say = Hörbausteine nur dieses Blocks."""
    ctx = _ctx()
    h = build._B(b, ctx)
    say = [x for v in ctx.tracks.values() for x in v]
    return _stapel_tabelle(_html_ohne_knopf(h)), say

def _say_text(*texts):
    out = []
    for t in texts:
        out += build.bausteine(t)
    return out

def karten(sec):
    cards = []
    c = sec.get('cartoon') or {}
    cards.append({'k': 'hook', 'es': M(re.sub(r'<br\s*/?>', ' ', sec['headline_es'])), 'de': M(sec['headline_de']),
                  'icons': c.get('icons', []), 'bubbles': [M(x['text']) for x in c.get('bubbles', [])],
                  'gloss': M(c.get('gloss', '')), 'say': _say_text(strip_tags(sec['headline_es']))})
    titel = None
    for p in sec['gramatica']:
        for b in p:
            t = b['type']
            if t == 'h':
                titel = M(b['text']); continue
            if t == 'variantes' and cards:
                h, _ = _block(b); cards[-1]['html'] = cards[-1].get('html', '') + h; continue
            if t == 'p' and cards and cards[-1]['k'] == 'block':
                cards[-1]['html'] += f'<p>{M(b["text"])}</p>'; continue
            if t == 'columns':
                for col in b['cols']:
                    h, say = _block({'type': 'columns', 'cols': [col]})
                    cards.append({'k': 'block', 'cls': f't{col.get("tone", 0)}', 'title': '', 'html': h, 'say': say})
                titel = None; continue
            if t == 'oneline':
                cards.append({'k': 'dark', 'html': M(b['text'])}); continue
            h, say = _block(b)
            cls = {'ojo': 'kojo', 'spikiu': 'kspk', 'region': 'kreg'}.get(t, '')
            cards.append({'k': 'block', 'cls': cls, 'title': titel or '', 'html': h, 'say': say})
            titel = None
    return cards

def _parts_opts(text):
    parts = []
    for part in re.split(r'(\[\[.+?\]\])', text):
        m = re.match(r'\[\[(.+)\]\]', part)
        if m:
            opts = m.group(1).split('|')
            parts.append({'o': [M(o.lstrip('!')) for o in opts], 'r': [i for i, o in enumerate(opts) if o.startswith('!')][0]})
        elif part:
            parts.append({'s': M(part)})
    return parts

def _parts_gaps(text):
    parts = []
    for part in re.split(r'(\{\{.+?\}\})', text):
        m = re.match(r'\{\{(.+?)\}\}', part)
        if m:
            a, *h = m.group(1).split('|')
            parts.append({'a': strip_tags(a), 'h': h[0] if h else ''})
        elif part:
            parts.append({'s': M(part)})
    return parts

def uebungen(sec):
    ex = []
    for p in sec['cuaderno']:
        for e in p:
            t, title = e['type'], M(e['title'])
            why = M(e.get('why', ''))
            if t == 'hear':
                ex.append({'k': 'hear', 'title': title, 'pairs': [{'o': [M(o) for o in pr['opts']], 'r': pr['said'], 'g': M(pr.get('gloss', ''))} for pr in e['pairs']],
                           'say': build.bausteine(', '.join(pr['opts'][pr['said']] for pr in e['pairs']), 'hoer'), 'why': why})
            elif t == 'mark':
                toks, labs = [], []
                for part in re.split(r'(\[\[.+?\]\])', e['text']):
                    m = re.match(r'\[\[(.+)\|(.+)\]\]', part)
                    if m:
                        toks.append({'w': M(m.group(1)), 'a': m.group(2)})
                        if m.group(2) not in labs: labs.append(m.group(2))
                    elif part:
                        toks.append({'s': M(part)})
                ex.append({'k': 'mark', 'title': title, 'toks': toks, 'labs': labs, 'why': why,
                           'say': build.bausteine(re.sub(r'\[\[(.+?)\|.+?\]\]', r'\1', e['text'])) if e.get('track') else []})
            elif t == 'choice':
                for it in e['items']:
                    ex.append({'k': 'choice', 'title': title, 'parts': _parts_opts(it), 'why': ''})
                if why: ex[-1]['why'] = why
            elif t == 'cloze':
                ex.append({'k': 'cloze', 'title': title, 'parts': _parts_gaps(e['text']), 'why': why,
                           'say': build.bausteine(build.fill_gaps(e['text'])) if e.get('track') else []})
            elif t == 'dialog':
                ex.append({'k': 'dialog', 'title': title, 'lines': [{'who': w, 'parts': _parts_gaps(l)} for w, l in e['lines']], 'why': why,
                           'say': [x for _, l in e['lines'] for x in build.bausteine(build.fill_gaps(l))] if e.get('track') else []})
            elif t == 'fill':
                ex.append({'k': 'fill', 'title': title, 'items': [_parts_gaps(it) for it in e['items']], 'why': why})
            elif t == 'sort':
                ex.append({'k': 'sort', 'title': title, 'words': [M(w) for w in e['words']],
                           'baskets': [{'l': M(bk['label']), 'a': [M(x) for x in bk['answers']]} for bk in e['baskets']], 'why': why})
            elif t == 'match':
                ex.append({'k': 'match', 'title': title, 'left': [M(x) for x in e['left']], 'right': [M(x) for x in e['right']], 'ans': e['answer'], 'why': why})
            elif t == 'transform':
                ex.append({'k': 'transform', 'title': title, 'ex': ({'q': M(e['example']['q']), 'a': M(e['example']['a'])} if e.get('example') else None),
                           'items': [{'q': M(it['q']), 'a': strip_tags(it['a'])} for it in e['items']], 'why': why})
            elif t == 'translate':
                for it in e['items']:
                    ex.append({'k': 'translate', 'title': title, 'de': M(it['de']), 'es': M(it['es'])})
            elif t == 'cards':
                ex.append({'k': 'impulse', 'title': title, 'start': M(e.get('start', '')), 'items': [{'i': c['icon'], 's': M(c['solution'])} for c in e['items']]})
            elif t == 'free':
                ex.append({'k': 'free', 'title': title, 'html': M(e.get('text', '')), 'sol': M(e.get('solution', ''))})
            elif t == 'tongue':
                ex.append({'k': 'tongue', 'title': title, 'es': M(e['es']), 'de': M(e.get('de', '')), 'say': build.bausteine(e['es'])})
    return ex

def build_reel(chapters):
    secs, nav = [], []
    for ch in chapters:
        nav.append({'ch': ch['chapter'], 't': ch['title'], 's': [{'id': s['id'], 't': s['topic']} for s in ch['sections']]})
        for s in ch['sections']:
            secs.append({'id': s['id'], 'topic': s['topic'], 'chap': f'{ch["chapter"]} {ch["title"]}',
                         'baum': {'A1': '🌱 Samen', 'A2': '🌿 Stamm'}.get(s['level'], s['level']),
                         'cards': karten(s), 'ex': uebungen(s)})
    tpl = open(os.path.join(ROOT, 'tools', 'reel-template.html'), encoding='utf-8').read()
    data = json.dumps({'secs': secs, 'nav': nav}, ensure_ascii=False)
    out = os.path.join(ROOT, 'Gramatica-Karten.html')
    open(out, 'w', encoding='utf-8').write(tpl.replace('/*DATA*/', 'var DATA=' + data + ';'))
    return out, sum(len(s['cards']) for s in secs), sum(len(s['ex']) for s in secs)
