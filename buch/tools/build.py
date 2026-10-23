#!/usr/bin/env python3
"""
build.py — Gramática A + Cuaderno A aus einer Quelle.

  python3 tools/build.py                       # alles: print + digital + online
  python3 tools/build.py --only 11 --check     # nur Kapitel 11, Überlauf-Bericht
  python3 tools/build.py --only 11 --png       # zusätzlich PNG-Vorschau je Seite
  python3 tools/build.py --validate            # nur Datenprüfung

Quelle: content/kap-XX.json (Schema: tools/SCHEMA.md), content/verbos.json
Ausgabe: out/print/*.pdf, out/digital/*.pdf, out/online/*.html, out/audio-manifest.json
"""
import json, re, sys, os, glob, html, argparse, shutil, random

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS = os.path.join(ROOT, 'icons')
OPENMOJI = os.path.join(ROOT, '.openmoji', 'package', 'color', 'svg')   # tools/hol-openmoji.sh

def ensure_icons(chapters):
    """Fehlende Icons aus dem lokalen OpenMoji-Vollsatz nach buch/icons/ kopieren (nur, was benutzt wird)."""
    used = set()
    for ch in chapters:
        t = json.dumps(ch)
        used.update(re.findall(r'"icon": "([0-9A-Fa-f-]+)"', t))
        for m in re.findall(r'"icons": \[([^\]]*)\]', t):
            used.update(re.findall(r'"([0-9A-Fa-f-]+)"', m))
    for code in used:
        dst = os.path.join(ICONS, code.upper() + '.svg')
        src = os.path.join(OPENMOJI, code.upper() + '.svg')
        if not os.path.exists(dst) and os.path.exists(src):
            shutil.copy(src, dst)

def ensure_fonts():
    dst = os.path.join(ROOT, 'assets', 'fonts')
    if not os.path.lexists(dst):
        try: os.symlink(os.path.join('..', '..', 'fonts'), dst)
        except FileExistsError: pass
AUDIO_BASE = 'https://spikiu.com/audio/a/'

# ───────────────────────── Daten laden ─────────────────────────
def load_chapters(only=None):
    chs = []
    for f in sorted(glob.glob(os.path.join(ROOT, 'content', 'kap-*.json'))):
        with open(f, encoding='utf-8') as fh:
            try:
                d = json.load(fh)
            except Exception as e:
                sys.exit(f'JSON-Fehler in {f}: {e}')
        d['_file'] = os.path.basename(f)
        if only and d['chapter'] not in only:
            continue
        chs.append(d)
    chs.sort(key=lambda c: c['chapter'])
    return chs

# ───────────────────────── Markup ─────────────────────────
class Ctx:
    def __init__(self, edition, book):
        self.edition = edition   # print | digital | online
        self.book = book         # G | C
        self.tracks = {}         # id -> Liste {t, p} (Audio-Manifest, sprechbar + Pausen)
        self.say = {}            # Knopf-Schlüssel -> Liste {t, p} (online: jeder Knopf spielt NUR seinen Block)
        self.lastbtn = {}        # Track-ID -> zuletzt gesetzter Knopf
        self.pending = {}        # Inhalt, der vor seinem Knopf kam
        self.btn_n = 0
        self.shown = set()       # Track-IDs, die schon einen sichtbaren Knopf haben

def esc(s):
    return html.escape(s, quote=False)

def track_html(tid, ctx):
    ctx.shown.add(tid)
    lab = f'▶ {tid}'
    if ctx.edition == 'print':
        return f'<span class="track">{lab}</span>'
    if ctx.edition == 'online':
        ctx.btn_n += 1
        key = f'{tid}#{ctx.btn_n}'
        ctx.lastbtn[tid] = key
        ctx.say[key] = ctx.pending.pop(tid, [])
        return f'<button class="track" data-key="{key}" data-track="{tid}">{lab}</button>'
    return f'<a class="track" href="{AUDIO_BASE}{tid}.mp3">{lab}</a>'

def xref_html(book, sid, ctx, label=None):
    name = {'G': 'Gramática A', 'C': 'Cuaderno A', 'GB': 'Gramática B', 'CB': 'Cuaderno B'}[book]
    lab = label or f'{name} · {sid}'
    anchor = 's-' + sid.replace('.', '-')
    if ctx.edition == 'print' or book in ('GB', 'CB'):
        return f'<span class="xref">{lab}</span>'
    if (book == 'G' and ctx.book == 'G') or (book == 'C' and ctx.book == 'C'):
        href = '#' + anchor
    else:
        target = {'G': 'Gramatica-A', 'C': 'Cuaderno-A'}[book]
        href = f'{target}.{"html" if ctx.edition=="online" else "pdf"}#{anchor}'
    return f'<a class="xref" href="{href}">{lab}</a>'

TAG_MAP = {'es': 'es', 'de': 'de', 'c1': 'c1', 'c2': 'c2'}

def M(s, ctx=None):
    """Inline-Markup → HTML. Erlaubt: <es> <de> <c1> <c2> <em> <b> <br> <t>id</t> <g>11.5</g> <c>11.5</c> <gb>14.1</gb>"""
    if s is None:
        return ''
    s = str(s)
    for t, cls in TAG_MAP.items():
        s = s.replace(f'<{t}>', f'<span class="{cls}">').replace(f'</{t}>', '</span>')
    if ctx:
        s = re.sub(r'<t>([^<]+)</t>', lambda m: track_html(m.group(1), ctx), s)
        s = re.sub(r'<g>([^<]+)</g>', lambda m: xref_html('G', m.group(1), ctx), s)
        s = re.sub(r'<c>([^<]+)</c>', lambda m: xref_html('C', m.group(1), ctx), s)
        s = re.sub(r'<gb>([^<]+)</gb>', lambda m: xref_html('GB', m.group(1), ctx), s)
    return s

def strip_tags(s):
    return re.sub(r'<[^>]+>', '', re.sub(r'<br\s*/?>', ' ', s or ''))

def icon(code, cls='', alt=''):
    code = code.upper()
    return f'<img class="{cls}" src="icons/{code}.svg" alt="{esc(alt)}">'

SPIKIU_SVG = '''<svg viewBox="0 0 80 80" class="{cls}"><ellipse cx="40" cy="50" rx="28" ry="20" fill="#c9956a"/><ellipse cx="40" cy="28" rx="18" ry="15" fill="#c9956a"/><ellipse cx="40" cy="36" rx="10" ry="7" fill="#b8845a"/><ellipse cx="40" cy="33" rx="4" ry="2.5" fill="#8b5e3c"/><circle cx="38" cy="33" r="1" fill="#6b4226"/><circle cx="42" cy="33" r="1" fill="#6b4226"/><circle cx="33" cy="24" r="3.5" fill="#3d2b1f"/><circle cx="47" cy="24" r="3.5" fill="#3d2b1f"/><circle cx="34" cy="23" r="1.2" fill="white"/><circle cx="48" cy="23" r="1.2" fill="white"/><ellipse cx="26" cy="17" rx="6" ry="5" fill="#b8845a"/><ellipse cx="54" cy="17" rx="6" ry="5" fill="#b8845a"/><ellipse cx="22" cy="66" rx="7" ry="5" fill="#b8845a"/><ellipse cx="34" cy="68" rx="7" ry="5" fill="#b8845a"/><ellipse cx="46" cy="68" rx="7" ry="5" fill="#b8845a"/><ellipse cx="58" cy="66" rx="7" ry="5" fill="#b8845a"/><path d="M36 38 Q40 41 44 38" stroke="#8b5e3c" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>'''
def spikiu(cls=''):
    return SPIKIU_SVG.format(cls=cls)

# ── Hörbausteine: was die Stimme wirklich sagt ─────────────────────────────
# Leo, 23.10., 13:48: „empieza a leer caóticamente y rápidamente muchas palabras … suena como si estuviera
# tartamudeando“. Ursache: Wortlisten gingen als EIN Brocken an Piper („casa, mamá, Ana, leche, …“),
# Notationen („ce · ci“, „bue-no“, «…») wurden mitgelesen, und Knöpfe mit derselben Track-ID spielten
# fremde Blöcke mit. Jetzt: jedes Wort / jeder Satz einzeln, mit Satzzeichen am Ende und echter Pause.
PAUSE = {'wort': 900, 'satz': 700, 'hoer': 2500}
_KURZ_UNBENUTZT = {'sí', 'si', 'no', 'tú', 'tu', 'yo', 'ya', 'mi', 'el', 'él', 'la', 'lo', 'le', 'te', 'me', 'se', 'sé', 'de', 'en',
            'un', 'y', 'o', 'a', 'e', 'u', 'al', 'es', 'ha', 'he', 'va', 've', 'da', 'di', 'dé', 'ti', 'su', 'mí', 'ni', 'ay', 'oh', 'eh'}

def _sauber(t):
    t = strip_tags(t)
    t = re.sub(r'\([^)]*\)', ' ', t)                       # Klammern = Erklärung, nicht sprechen
    t = re.sub(r'[«»„“”"]', '', t)
    t = re.sub(r"(\w)-(\w)", r"\1\2", t)                  # Silbentrennung bue-no → bueno
    t = re.sub(r'\s*[·|/→=]\s*', ' | ', t)                  # Notation trennt Bausteine
    t = re.sub(r'^\s*(…|\.\.\.)\s*', '', t)
    return re.sub(r'\s+', ' ', t).strip()

def bausteine(text, art=None):
    """Text → Liste {t, p}. art: 'hoer' (Hörübung: lange Pause), sonst automatisch Wort oder Satz."""
    out = []
    for teil in _sauber(text).split(' | '):
        teil = teil.strip(' ,;:–-')
        if not teil:
            continue
        if re.search(r'[.!?…]', teil):
            for satz in re.findall(r'[^.!?…]+[.!?…]+|[^.!?…]+$', teil):
                satz = satz.strip(' ,;:–-')
                if len(re.sub(r'[^\wáéíóúñü]', '', satz)) >= 2:
                    out.append({'t': satz.replace('…', '.'), 'p': PAUSE[art or 'satz']})
        elif teil.count(',') >= 1 and len(teil.split()) <= 3 * (teil.count(',') + 1):
            for w in teil.split(','):
                w = w.strip()
                if w:
                    out.append({'t': w + '.', 'p': PAUSE[art or 'wort']})
        else:
            out.append({'t': teil + '.', 'p': PAUSE[art or ('wort' if len(teil.split()) <= 3 else 'satz')]})
    return out

def add_track(ctx, tid, texts, art=None):
    if not tid:
        return
    items = []
    for t in texts:
        items += bausteine(t, art)
    ctx.tracks.setdefault(tid, []).extend(items)
    if ctx.edition == 'online':
        key = ctx.lastbtn.get(tid)
        if key:
            ctx.say[key].extend(items)
        else:
            ctx.pending.setdefault(tid, []).extend(items)

# ───────────────────────── Gramática-Blöcke ─────────────────────────
def B(b, ctx):
    """Block → HTML. Hat ein hörbarer Block einen Track, aber noch keinen sichtbaren Knopf, bekommt er einen eigenen."""
    vor = ''
    if b['type'] in ('table', 'examples', 'conj') and b.get('track') and b['track'] not in ctx.shown:
        vor = f'<div class="trackline">{track_html(b["track"], ctx)}</div>'
    return vor + _B(b, ctx)

def _B(b, ctx):
    t = b['type']
    if t == 'h':
        tr = track_html(b['track'], ctx) if b.get('track') else ''
        return f'<h2>{M(b["text"], ctx)}{tr}</h2>'
    if t == 'h3':
        return f'<h3>{M(b["text"], ctx)}</h3>'
    if t == 'p':
        return f'<p>{M(b["text"], ctx)}</p>'
    if t == 'oneline':
        return f'<div class="oneline"><b class="k">{esc(b.get("label","In einem Satz"))}</b>{M(b["text"], ctx)}</div>'
    if t == 'columns':
        out = []
        for c in b['cols']:
            ic = icon(c['icon']) if c.get('icon') else ''
            sub = M(c.get('sub', ''), ctx)
            if c.get('track'):
                sub += track_html(c['track'], ctx)
                add_track(ctx, c['track'], [f for u in c.get('uses', []) for f in re.findall(r'<es>(.*?)</es>', u.get('x', ''))])
            uses = ''.join(f'<div class="use"><div class="t">{M(u.get("t",""), ctx)}</div><div class="x">{M(u.get("x",""), ctx)}</div></div>' for u in c.get('uses', []))
            out.append(f'<div class="col t{c.get("tone",0)}"><div class="col-h">{ic}<div><strong>{M(c["title"], ctx)}</strong><small>{sub}</small></div></div>{uses}</div>')
        return f'<div class="cols n{len(out)}">{"".join(out)}</div>'
    if t == 'table':
        escs = set(b.get('es_cols', [0]))
        hl = set(b.get('hl', []))
        head = ''.join(f'<th>{M(h, ctx)}</th>' for h in b.get('head', []))
        rows = ''
        for i, r in enumerate(b['rows']):
            tds = ''.join(f'<td class="{"esc" if j in escs else ""}">{M(c, ctx)}</td>' for j, c in enumerate(r))
            rows += f'<tr class="{"hl" if i in hl else ""}">{tds}</tr>'
        tr = ''
        if b.get('track'):
            parts_ = []
            for r in b['rows']:
                bits = [r[j] for j in sorted(escs) if j < len(r)]
                bits += re.findall(r'<es>(.*?)</es>', ' '.join(r[j] for j in range(len(r)) if j not in escs))
                parts_.append(', '.join(strip_tags(x).replace(' · ', ', ') for x in bits if strip_tags(x).strip()))
            add_track(ctx, b['track'], parts_)
        return f'<div class="tbwrap"><table class="tb">{"<tr>"+head+"</tr>" if head else ""}{rows}</table></div>'
    if t == 'examples':
        add_track(ctx, b.get('track'), [i[0] for i in b['items']])
        items = ''.join(f'<span class="es">{M(es_, ctx)}</span><span class="de">{M(de_, ctx)}</span>' for es_, de_ in b['items'])
        return f'<div class="examples">{items}</div>'
    if t == 'question':
        cells = ''.join(f'<div class="t{q.get("tone",0)}"><div class="q">{M(q["q"], ctx)}</div><small>{M(q.get("small",""), ctx)}</small>{"<div class=tag>"+M(q["tag"],ctx)+"</div>" if q.get("tag") else ""}</div>' for q in b['items'])
        return f'<div class="question n{len(b["items"])}">{cells}</div>'
    if t == 'story':
        tr = track_html(b['track'], ctx) if b.get('track') else ''
        add_track(ctx, b.get('track'), [b['es']])
        title = f'<h2>{M(b["title"], ctx)}{tr}</h2>' if b.get('title') else ''
        note = f'<p class="story-note">{M(b["note"], ctx)}</p>' if b.get('note') else ''
        return f'{title}<div class="story"><div class="es-t">{M(b["es"], ctx)}</div><div class="de">{M(b.get("de",""), ctx)}</div></div>{note}'
    if t == 'signal':
        rows = ''.join(f'<tr><td class="t{r[2] if len(r)>2 else 0}">{M(r[0], ctx)}</td><td><span class="es">{M(r[1], ctx)}</span></td></tr>' for r in b['rows'])
        return f'<table class="signal">{rows}</table>'
    if t == 'ojo':
        return f'<div class="box ojo"><span class="tag">{esc(b.get("tag","Ojo · Achtung"))}</span>{M(b["text"], ctx)}</div>'
    if t == 'variantes':
        return f'<div class="variantes">{icon("1F30E")}<div><b>{esc(b.get("tag","Así suena también"))}</b> {M(b["text"], ctx)}</div></div>'
    if t == 'region':
        return f'<div class="box region"><span class="tag">{esc(b.get("tag","Así se dice en … · So klingt es woanders"))}</span>{M(b["text"], ctx)}</div>'
    if t == 'novela':
        return f'<div class="box novela"><span class="tag">En la novela · „{esc(b["source"])}“</span><blockquote>«{M(b["quote"], ctx)}»</blockquote>{M(b.get("note",""), ctx)}</div>'
    if t == 'spikiu':
        return f'<div class="spk">{spikiu()}<div><span class="tag">Spikius Kniff · {esc(b["title"])}</span>{M(b["text"], ctx)}</div></div>'
    if t == 'trick':
        return f'<div class="trick">{icon(b["icon"])}<p>{M(b["text"], ctx)}</p></div>'
    if t == 'conj':
        pron = b.get('pron', ['yo', 'tú', 'él, ella, usted', 'nosotros, -as', 'vosotros, -as', 'ellos, ellas, ustedes'])
        vs = b['verbs']
        if b.get('track'):
            add_track(ctx, b['track'], [strip_tags(f) for v in vs for f in v['forms']])
        head = '<th></th>' + ''.join(f'<th>{M(v["inf"], ctx)}<small>{M(v.get("de",""), ctx)}</small></th>' for v in vs)
        rows = ''
        for i, p in enumerate(pron):
            rows += f'<tr><td class="p">{p}</td>' + ''.join(f'<td class="f">{M(v["forms"][i], ctx)}</td>' for v in vs) + '</tr>'
        return f'<div class="tbwrap"><table class="conj"><tr>{head}</tr>{rows}</table></div>'
    raise ValueError(f'Unbekannter Blocktyp: {t}')

# ───────────────────────── Cuaderno-Übungen ─────────────────────────
OPT_RE = re.compile(r'\[\[(.+?)\]\]')
GAP_RE = re.compile(r'\{\{(.+?)\}\}')

def gap_parts(m):
    parts = m.split('|')
    ans = parts[0]
    hint = parts[1] if len(parts) > 1 else ''
    return ans, hint

def gap_html(ans, hint, size=None):
    if size is None:
        n = len(strip_tags(ans))
        size = 's' if n <= 2 else ('m' if n <= 6 else ('' if n <= 12 else 'l'))
    h = f'<span class="hint">({esc(hint)})</span>' if hint else ''
    return f'<span class="gap {size}"></span>{h}'

def render_gaps(text, ctx, size=None):
    answers = []
    def rep(m):
        a, h = gap_parts(m.group(1))
        answers.append(a)
        return gap_html(a, h, size)
    return M(GAP_RE.sub(rep, text), ctx), answers

def fill_gaps(text):
    return GAP_RE.sub(lambda m: '<b>' + gap_parts(m.group(1))[0] + '</b>', text)

def render_opts(text, ctx):
    answers = []
    def rep(m):
        opts = m.group(1).split('|')
        correct = [o[1:] for o in opts if o.startswith('!')]
        answers.append(correct[0] if correct else '?')
        shown = ' / '.join(o.lstrip('!') for o in opts)
        return f'<span class="opt">({shown})</span>'
    return M(OPT_RE.sub(rep, text), ctx), answers

def ex_head(n, e, ctx):
    kind = e.get('kind', '')
    tr = ''
    if e.get('track'):
        tr = f'{track_html(e["track"], ctx)} · '
    instr = f'<div class="ex-i">{M(e["instr"], ctx)}</div>' if e.get('instr') else ''
    return f'<div class="ex-h"><span class="ex-n">{n}</span><span class="ex-t">{M(e["title"], ctx)}</span><span class="ex-k">{tr}{esc(kind)}</span></div>{instr}'

def E(n, e, ctx):
    """→ (html, solution_html)"""
    t = e['type']
    head = ex_head(n, e, ctx)
    sol = ''
    body = ''
    if t == 'hear':
        add_track(ctx, e.get('track'), [p['opts'][p['said']] for p in e['pairs']], art='hoer')
        cells = ''
        sols = []
        for i, p in enumerate(e['pairs']):
            l = 'abcdefghij'[i]
            opts = ''.join(f'<div class="o"><i></i><span class="es">{M(o, ctx)}</span></div>' for o in p['opts'])
            gl = f'<small>{M(p.get("gloss",""), ctx)}</small>' if p.get('gloss') else ''
            cells += f'<div class="pair"><div class="n">{l}</div>{opts}{gl}</div>'
            sols.append(f'{l} <span class="es">{M(p["opts"][p["said"]], ctx)}</span>')
        n_ = len(e['pairs'])
        body = f'<div class="pairs n{n_ if n_ in (4,6) else 5}">{cells}</div>'
        sol = 'Gesprochen wird: ' + ' · '.join(sols)
    elif t == 'mark':
        add_track(ctx, e.get('track'), [re.sub(r'\[\[(.+?)\|.+?\]\]', r'\1', e['text'])])
        sols = []
        def rep(m):
            w, lab = m.group(1).rsplit('|', 1)
            sols.append(f'<span class="es">{w}</span> {lab}')
            return f'<u>{w}</u><span class="kbox"></span>'
        txt = OPT_RE.sub(rep, e['text'])
        body = f'<div class="panel serif mark">{M(txt, ctx)}</div>'
        sol = ' · '.join(sols)
    elif t == 'choice':
        lis = ''
        sols = []
        for i, it in enumerate(e['items']):
            h_, ans = render_opts(it, ctx)
            lis += f'<li>{h_}</li>'
            sols.append(f'{"abcdefghijklmnop"[i]} <span class="es">{", ".join(ans)}</span>')
        body = f'<ol class="choice serif" type="a">{lis}</ol>'
        sol = ' · '.join(sols)
    elif t == 'cloze':
        add_track(ctx, e.get('track'), [fill_gaps(e['text'])])
        h_, ans = render_gaps(e['text'], ctx)
        body = f'<div class="panel serif cloze">{h_}</div>'
        sol = '<span class="es">' + ' · '.join(ans) + '</span>'
    elif t == 'dialog':
        rows = ''
        allans = []
        for who, line in e['lines']:
            h_, ans = render_gaps(line, ctx)
            allans += ans
            rows += f'<div class="who">{esc(who)}</div><div>{h_}</div>'
        add_track(ctx, e.get('track'), [fill_gaps(l) for _, l in e['lines']])
        body = f'<div class="panel serif dialog">{rows}</div>'
        sol = '<span class="es">' + ' · '.join(allans) + '</span>'
    elif t == 'fill':
        cells = ''
        sols = []
        for it in e['items']:
            h_, ans = render_gaps(it, ctx, size=e.get('gap'))
            cells += f'<div>{h_}</div>'
            sols.append(strip_tags(fill_gaps(it)).replace('<b>', '').replace('</b>', ''))
        add_track(ctx, e.get('track'), [re.sub(r'<[^>]+>', '', fill_gaps(it)) for it in e['items']])
        body = f'<div class="fillgrid serif fc{e.get("cols",3)}">{cells}</div>'
        sol = '<span class="es">' + ', '.join(re.sub(r'<[^>]+>', '', fill_gaps(it)) for it in e['items']) + '</span>'
    elif t == 'sort':
        words = list(e['words'])
        bks = ''
        sols = []
        for bk in e['baskets']:
            lines = '<div class="ln"></div>' * max(2, min(len(bk['answers']), 6))
            bks += f'<div class="basket"><div class="hd">{M(bk["label"], ctx)}</div>{lines}</div>'
            sols.append(f'<b>{M(bk["label"], ctx)}:</b> <span class="es">{", ".join(bk["answers"])}</span>')
        wb = ''.join(f'<span>{M(w, ctx)}</span>' for w in words)
        body = f'<div class="wordbank serif">{wb}</div><div class="baskets n{len(e["baskets"])}">{bks}</div>'
        sol = '<br>'.join(sols)
    elif t == 'match':
        L = e['left']; R = e['right']
        rows = ''
        for i in range(max(len(L), len(R))):
            l = f'<div class="r"><b>{"abcdefghij"[i]}</b><span><span class="slot"></span>{M(L[i], ctx)}</span></div>' if i < len(L) else '<div></div>'
            r = f'<div class="r"><b>{i+1}</b><span>{M(R[i], ctx)}</span></div>' if i < len(R) else '<div></div>'
            rows += l + r
        body = f'<div class="match serif">{rows}</div>'
        sol = ' · '.join(f'{"abcdefghij"[i]} {k+1}' for i, k in enumerate(e['answer']))
    elif t == 'transform':
        ex_ = ''
        if e.get('example'):
            ex_ = f'<div class="tf-ex">Beispiel: <span class="es">{M(e["example"]["q"], ctx)}</span> → <span class="es">{M(e["example"]["a"], ctx)}</span></div>'
        lis = ''.join(f'<li><span class="q">{M(it["q"], ctx)}</span><span class="a"></span></li>' for it in e['items'])
        body = f'{ex_}<ol class="tf" type="a">{lis}</ol>'
        sol = ' · '.join(f'{"abcdefghijkl"[i]} <span class="es">{M(it["a"], ctx)}</span>' for i, it in enumerate(e['items']))
    elif t == 'translate':
        lis = ''.join(f'<li>{M(it["de"], ctx)}<div class="w"></div></li>' for it in e['items'])
        body = f'<ol class="trans" type="a">{lis}</ol>'
        sol = '<br>'.join(f'{"abcdefghijkl"[i]} <span class="es">{M(it["es"], ctx)}</span>' for i, it in enumerate(e['items']))
    elif t == 'cards':
        st = f'<div class="start serif">{M(e["start"], ctx)}</div>' if e.get('start') else ''
        cs = ''.join(f'<div class="card">{icon(c["icon"])}<div class="cap">{M(c.get("cap",""), ctx)}</div><div class="ln"></div><div class="ln"></div></div>' for c in e['items'])
        n_ = len(e['items'])
        body = f'{st}<div class="cards n{n_}">{cs}</div>'
        sol = ('Vorschläge: ' if not e.get('exact') else '') + ' · '.join(f'<span class="es">{M(c["solution"], ctx)}</span>' for c in e['items'])
    elif t == 'free':
        p = f'<div class="ex-i" style="margin-left:0">{M(e["text"], ctx)}</div>' if e.get('text') else ''
        body = p + '<div class="write"></div>' * e.get('lines', 4)
        sol = M(e.get('solution', 'Keine feste Lösung.'), ctx)
    elif t == 'tongue':
        add_track(ctx, e.get('track'), [e['es']])
        body = f'<div class="tongue">{M(e["es"], ctx)}<small>{M(e.get("de",""), ctx)}</small></div>'
        sol = M(e.get('solution', 'Keine feste Lösung.'), ctx)
    else:
        raise ValueError(f'Unbekannter Übungstyp: {t}')
    if e.get('solution') and t not in ('free', 'tongue'):
        sol = M(e['solution'], ctx)
    if e.get('why'):
        sol += f'<span class="why">{M(e["why"], ctx)}</span>'
    return f'<div class="ex">{head}{body}</div>', sol

# ───────────────────────── Seitenbau ─────────────────────────
def page(body, left='', right='', folio_side='', cls='', bodycls='', anchor='', nofolio=False):
    a = f' id="{anchor}"' if anchor else ''
    return (f'<section class="page {cls}{" nofolio" if nofolio else ""}"{a} data-fixed="1">'
            f'<div class="runhead"><span>{left}</span><span>{right}</span></div>'
            f'<div class="pbody {bodycls}">{body}</div>'
            f'<div class="folio"><span class="pn"></span><span class="fs">{folio_side}</span></div></section>')

def flow(blocks, left, right, folio_side, cls='', bodycls='', anchor=''):
    a = f' data-anchor="{anchor}"' if anchor else ''
    inner = ''.join(f'<div class="fb {b[1] if isinstance(b, tuple) else ""}">{b[0] if isinstance(b, tuple) else b}</div>' for b in blocks)
    return (f'<div class="flow" data-left="{esc(left)}" data-right="{esc(right)}" data-fs="{esc(folio_side)}" '
            f'data-cls="{cls}" data-bodycls="{bodycls}"{a}>{inner}</div>')

def cartoon_html(sec, ctx, big=False):
    c = sec.get('cartoon') or {}
    size = c.get('size', 'l' if big else 'm')
    cid = c.get('id', sec['id'] + '-A')
    final = os.path.join(ROOT, 'bilder', cid + '.png')
    if os.path.exists(final):
        inner = f'<img class="final" src="bilder/{cid}.png" alt="">'
    else:
        icons_ = ''.join(icon(i) for i in c.get('icons', []))
        inner = f'<div class="ph">{icons_}</div><div class="label">Platzhalter · Bild folgt (Prompt {cid})</div>'
    bubs = '<div class="bubs">' + ''.join(f'<div class="bub {bb.get("pos","tl")}">{M(bb["text"], ctx)}</div>' for bb in c.get('bubbles', [])) + '</div>'
    gloss = f'<div class="cgloss">{M(c["gloss"], ctx)}</div>' if c.get('gloss') else ''
    return f'<div class="cartoon {size}">{inner}{bubs}</div>{gloss}'

def G_pages(ch, sec, ctx):
    out = []
    pages = sec['gramatica']
    left = f'Gramática A · {ch["chapter"]} {ch["title"]}'
    for pi, blocks in enumerate(pages):
        body = ''
        if pi == 0:
            body += f'<div class="secnr"><b>{sec["id"]}</b>{esc(sec["topic"])}</div>'
            body += f'<h1 class="satz">{M(sec["headline_es"], ctx)}</h1><div class="satz-de">{M(sec["headline_de"], ctx)}</div>'
            body += cartoon_html(sec, ctx, big=len(pages) > 1)
        body += ''.join(B(b, ctx) for b in blocks)
        if pi == len(pages) - 1:
            deeper = f'<span class="deeper">{M(sec["deeper"], ctx)}</span>' if sec.get('deeper') else '<span></span>'
            body += f'<div class="arrow">{deeper}<div class="go"><span>→</span> Üben: {xref_html("C", sec["id"], ctx)}</div></div>'
        right = sec['level'] if pi == 0 else f'{sec["id"]} {sec["topic"]}'
        out.append(page(body, left, esc(right), 'Gramática A', anchor=('s-' + sec['id'].replace('.', '-')) if pi == 0 else ''))
    return out

def C_pages(ch, sec, ctx, solutions):
    out = []
    left = f'Cuaderno A · {ch["chapter"]} {ch["title"]}'
    n = 0
    sols = []
    for pi, exs in enumerate(sec['cuaderno']):
        body = ''
        if pi == 0:
            body += f'<div class="secnr"><b>{sec["id"]}</b>{esc(sec["topic"])}</div>'
            body += f'<div class="back">← Erklärung: {xref_html("G", sec["id"], ctx)}</div>'
        for e in exs:
            n += 1
            h_, s_ = E(n, e, ctx)
            body += h_
            sols.append((n, e['title'], s_))
        right = sec['level'] if pi == 0 else f'{sec["id"]} {sec["topic"]}'
        out.append(page(body, left, esc(right), 'Cuaderno A', cls='', anchor=('s-' + sec['id'].replace('.', '-')) if pi == 0 else ''))
    solutions.append((sec, sols))
    return out

def solutions_flow(solutions, tests_sol, ctx):
    blocks = [(f'<h1 class="satz" style="font-family:var(--f-head);font-weight:700;font-style:normal;font-size:18pt;color:var(--accent)">Lösungen</h1>', 'full')]
    for sec, sols in solutions:
        h_ = f'<div class="secnr"><b>{sec["id"]}</b>{esc(sec["topic"])}</div>'
        first = True
        for (n, title, s_) in sols:
            blk = (h_ if first else '') + f'<div class="sol-item"><b>{n}</b>{s_}</div>'
            first = False
            blocks.append(blk)
        for tsol in tests_sol.get(sec['id'], []):
            blocks.append(tsol)
    return blocks

def test_flow(test, idx, ctx):
    blocks = [(f'<div class="test-h"><h1>Test {idx}</h1><p>{esc(test["covers"])} · Kreuze an. Die Lösungen stehen hinten, die Tabelle zeigt dir, wo du nachlesen kannst.</p></div>', 'full')]
    for i, it in enumerate(test['items']):
        q = M(it['q'], ctx).replace('___', '<span class="gap m"></span>')
        opts = ''.join(f'<div class="o"><small>{"abc"[j]})</small><i></i><span>{M(o, ctx)}</span></div>' for j, o in enumerate(it['options']))
        blocks.append(f'<div class="titem"><div class="q"><b>{i+1}</b><span>{q}</span></div>{opts}</div>')
    # Tabelle Aufgabe → Abschnitt
    cells = [(i + 1, it['ref']) for i, it in enumerate(test['items'])]
    rows = ''
    per = 10
    for start in range(0, len(cells), per):
        chunk = cells[start:start + per]
        rows += '<tr><th>Aufgabe</th>' + ''.join(f'<td>{a}</td>' for a, _ in chunk) + '</tr>'
        rows += '<tr><th>Abschnitt</th>' + ''.join(f'<td>{r}</td>' for _, r in chunk) + '</tr>'
    blocks.append((f'<p class="tnote">Etwas falsch? Lies den Abschnitt in der Gramática noch einmal und mach die Übungen dazu im Cuaderno.</p><table class="tmap">{rows}</table>', 'full'))
    return blocks

def test_solution(test, idx):
    parts = ' · '.join(f'{i+1} {"abc"[it["answer"]]}' for i, it in enumerate(test['items']))
    return f'<div class="secnr" style="margin-top:2mm"><b>Test {idx}</b>{esc(test["covers"])}</div><div class="sol-item">{parts}</div>'

# ───────────────────────── Vorspann / Nachspann ─────────────────────────
def front_pages(book, ctx, chapters):
    from front import title_page, imprint_page, promo_page, howto_page, ensemble_page
    out = [title_page(book, ctx), imprint_page(book, ctx), promo_page(book, ctx), howto_page(book, ctx)]
    if book == 'G':
        out.append(ensemble_page(ctx))
    return out

def toc_flow(book, chapters, tests):
    blocks = [('<h1 style="font-family:var(--f-head);font-weight:700;font-size:20pt;margin:0 0 2mm">Inhalt</h1>', '')]
    for ch in chapters:
        entries = f'<div class="toc-ch"><span>{ch["chapter"]}</span>{esc(ch["title"])}</div>'
        blocks.append(entries)
        for sec in ch['sections']:
            anchor = 's-' + sec['id'].replace('.', '-')
            blocks.append(f'<a class="toc-e" href="#{anchor}"><span class="n">{sec["id"]}</span><span>{esc(sec["topic"])} <span class="es">– {strip_tags(sec["headline_es"])}</span></span><span class="pg" data-toc="{anchor}"></span></a>')
        if book == 'C':
            for idx, t in tests:
                if t['after'] == ch['chapter']:
                    blocks.append(f'<a class="toc-x" href="#test-{idx}"><span>Test {idx}: {esc(t["covers"])}</span><span class="pg" data-toc="test-{idx}"></span></a>')
    extra = [('Verbtabellen', 'verbtabellen'), ('Register', 'register')] if book == 'G' else [('Lösungen', 'loesungen')]
    for lab, a in extra:
        blocks.append(f'<a class="toc-x" href="#{a}"><span>{lab}</span><span class="pg" data-toc="{a}"></span></a>')
    return blocks

def verb_flow(ctx):
    path = os.path.join(ROOT, 'content', 'verbos.json')
    if not os.path.exists(path):
        return []
    V = json.load(open(path, encoding='utf-8'))
    blocks = [('<h1 style="font-family:var(--f-head);font-weight:700;font-size:20pt;margin:0 0 1mm">Verbtabellen</h1><p style="font-size:8.4pt;color:var(--sage)">Bei <span class="es">hablar, comer, vivir</span> sind die Endungen rot: Sie sind das Muster für alle regelmäßigen Verben. Bei allen anderen Verben ist rot, was vom Muster abweicht. Imperativ: <span class="es">tú / usted</span>.</p>', 'full')]
    tenses = V['tenses']
    pron = ['yo', 'tú', 'él/ella/Ud.', 'nosotros', 'vosotros', 'ellos/Uds.']
    for v in V['verbs']:
        head = '<tr><th></th>' + ''.join(f'<th>{esc(t)}</th>' for t in tenses) + '</tr>'
        rows = ''
        for i, p in enumerate(pron):
            rows += f'<tr><td class="p">{p}</td>' + ''.join(f'<td>{v["forms"][t][i]}</td>' for t in tenses) + '</tr>'
        extra = f'<div class="extra">Partizip <span class="es">{v["part"]}</span> · Gerundium <span class="es">{v["ger"]}</span> · Imperativ <span class="es">{v["imp"]}</span>{(" · " + M(v["note"])) if v.get("note") else ""}</div>'
        blocks.append((f'<div class="vt"><h3>{v["inf"]}<small>{esc(v["de"])}{(" · " + esc(v["model"])) if v.get("model") else ""}</small></h3><table>{head}{rows}</table>{extra}</div>', 'full'))
    return blocks

def register_flow(chapters):
    idx = {}
    for ch in chapters:
        for sec in ch['sections']:
            for term in sec.get('index', []):
                idx.setdefault(term, []).append(sec['id'])
    blocks = [('<h1 style="font-family:var(--f-head);font-weight:700;font-size:20pt;margin:0 0 1mm">Register</h1><p style="font-size:8.4pt;color:var(--sage)">Die Zahl ist der Abschnitt. Du findest ihn mit derselben Nummer in der Gramática und im Cuaderno.</p>', 'full')]
    letter = None
    import unicodedata
    def key(s):
        s2 = unicodedata.normalize('NFD', s.lower())
        return ''.join(c for c in s2 if unicodedata.category(c) != 'Mn').lstrip('¿¡-')
    for term in sorted(idx, key=key):
        L = key(term)[:1].upper()
        if L != letter:
            letter = L
            blocks.append(f'<div class="reg-l">{L}</div>')
        refs = ', '.join(f'<a class="xref" href="#s-{r.replace(".", "-")}">{r}</a>' for r in sorted(set(idx[term]), key=lambda x: [int(p) for p in x.split(".")]))
        blocks.append(f'<div class="reg-e">{M(term)} <span class="xref">{refs}</span></div>')
    return blocks

# ───────────────────────── Dokument ─────────────────────────
PAGINATE_JS = r'''
document.fonts.ready.then(function(){
  function mkPage(fl){
    var s=document.createElement('section'); s.className='page '+(fl.dataset.cls||'');
    s.innerHTML='<div class="runhead"><span>'+fl.dataset.left+'</span><span>'+fl.dataset.right+'</span></div><div class="pbody '+(fl.dataset.bodycls||'')+'"></div><div class="folio"><span class="pn"></span><span class="fs">'+fl.dataset.fs+'</span></div>';
    return s;
  }
  function over(b){ return b.scrollHeight > b.clientHeight + 1 || b.scrollWidth > b.clientWidth + 1; }
  window.__report = {overflow:[], tooBig:[]};
  // 1. feste Seiten einpassen
  document.querySelectorAll('section.page[data-fixed] .pbody').forEach(function(b){
    var z=1;
    while(over(b) && z>0.86){ z-=0.02; b.style.zoom=z; }
    if(over(b)){ b.parentNode.classList.add('overflow');
      var sec=b.closest('section'); var sn2=b.querySelector('.secnr'); window.__report.overflow.push({anchor: (sec.id||''), head: sec.querySelector('.runhead').innerText.replace(/\n/g,' | ')+(sn2?' | '+sn2.innerText.replace(/\n/g,' '):''), excess: b.scrollHeight-b.clientHeight}); }
    else if(z<1){ var sn=b.querySelector('.secnr'); window.__report.overflow.push({anchor:'', head: b.closest('section').querySelector('.runhead').innerText.replace(/\n/g,' | ')+(sn?' | '+sn.innerText.replace(/\n/g,' '):''), zoom: +z.toFixed(2), note:'eingepasst'}); }
  });
  // 2. Fließtext umbrechen
  document.querySelectorAll('div.flow').forEach(function(fl){
    var frag=[]; var cur=mkPage(fl); var first=true;
    fl.parentNode.insertBefore(cur, fl);
    if(fl.dataset.anchor){ cur.id=fl.dataset.anchor; }
    var body=cur.querySelector('.pbody');
    var items=Array.prototype.slice.call(fl.children);
    items.forEach(function(it){
      body.appendChild(it);
      if(over(body)){
        if(body.children.length===1){ window.__report.tooBig.push(it.innerText.slice(0,80)); return; }
        body.removeChild(it);
        var np=mkPage(fl); cur.parentNode.insertBefore(np, cur.nextSibling); cur=np; body=cur.querySelector('.pbody');
        body.appendChild(it);
      }
    });
    fl.parentNode.removeChild(fl);
  });
  // 3. Seitenzahlen, Inhaltsverzeichnis
  var pages=document.querySelectorAll('section.page'); var map={};
  pages.forEach(function(p,i){
    var n=i+1; var pn=p.querySelector('.pn'); if(pn) pn.textContent=n;
    if(p.id) map[p.id]=n;
    p.querySelectorAll('[id]').forEach(function(x){ map[x.id]=n; });
    if(n%2===0){ var f=p.querySelector('.folio'); if(f){ f.style.flexDirection='row'; } }
    else { var f2=p.querySelector('.folio'); if(f2){ f2.style.flexDirection='row-reverse'; } }
  });
  document.querySelectorAll('[data-toc]').forEach(function(x){ x.textContent = map[x.dataset.toc]||'?'; });
  document.querySelectorAll('[data-pageof]').forEach(function(x){ x.textContent = map[x.dataset.pageof]||'?'; });
  window.__report.pages=pages.length;
  window.__done=true;
});
'''

def doc(book, parts, edition, title):
    cls = f'ed-{edition} book-{book.lower()}'
    return (f'<!doctype html><html lang="de" class="{cls}"><head><meta charset="utf-8"><title>{esc(title)}</title>'
            f'<link rel="stylesheet" href="assets/book.css"></head><body class="book-{book.lower()}">'
            + ''.join(parts) + f'<script>{PAGINATE_JS}</script></body></html>')

def build_book(book, chapters, tests, edition, ctx):
    parts = front_pages(book, ctx, chapters)
    parts.append(flow(toc_flow(book, chapters, tests), 'Inhalt', '', '', anchor='inhalt'))
    solutions = []
    tests_sol = {}
    for ch in chapters:
        for sec in ch['sections']:
            if book == 'G':
                parts += G_pages(ch, sec, ctx)
            else:
                parts += C_pages(ch, sec, ctx, solutions)
        if book == 'C':
            for idx, t in tests:
                if t['after'] == ch['chapter']:
                    parts.append(flow(test_flow(t, idx, ctx), f'Cuaderno A · Test {idx}', esc(t['covers']), 'Cuaderno A', bodycls='cols2', anchor=f'test-{idx}'))
                    last_sec = ch['sections'][-1]['id']
                    tests_sol.setdefault(last_sec, []).append(test_solution(t, idx))
    if book == 'G':
        vf = verb_flow(ctx)
        if vf:
            parts.append(flow(vf, 'Gramática A · Verbtabellen', '', 'Gramática A', bodycls='cols2', anchor='verbtabellen'))
        parts.append(flow(register_flow(chapters), 'Gramática A · Register', '', 'Gramática A', bodycls='cols2', anchor='register'))
    else:
        parts.append(flow(solutions_flow(solutions, tests_sol, ctx), 'Cuaderno A · Lösungen', '', 'Cuaderno A', bodycls='cols2', anchor='loesungen'))
    from front import back_promo
    parts.append(back_promo(book, ctx))
    title = 'Gramática A' if book == 'G' else 'Cuaderno A'
    return doc(book, parts, edition, title)

# ───────────────────────── Rendern ─────────────────────────
def render_pdf(html_path, pdf_path, png_prefix=None, png_pages=None):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--allow-file-access-from-files'])
        pg = b.new_page()
        pg.goto('file://' + html_path)
        pg.wait_for_function('window.__done === true', timeout=120000)
        pg.evaluate('document.fonts.ready')
        rep = pg.evaluate('window.__report')
        pg.pdf(path=pdf_path, prefer_css_page_size=True, print_background=True)
        b.close()
    if png_prefix:
        import pypdfium2 as pdfium
        d = pdfium.PdfDocument(pdf_path)
        rng = png_pages or range(len(d))
        for i in rng:
            if i < len(d):
                d[i].render(scale=1.4).to_pil().save(f'{png_prefix}{i+1:03d}.png')
    return rep

def stage(edition):
    od = os.path.join(ROOT, 'out', edition)
    os.makedirs(od, exist_ok=True)
    for name in ('assets',):
        dst = os.path.join(od, name)
        if not os.path.lexists(dst):
            try: os.symlink(os.path.join(ROOT, name), dst)
            except FileExistsError: pass
    for name in ('icons', 'bilder'):
        dst = os.path.join(od, name)
        src = os.path.join(ROOT, name)
        if os.path.exists(src) and not os.path.lexists(dst):
            try: os.symlink(src, dst)
            except FileExistsError: pass
    return od

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--only', help='Kapitel, z. B. 11 oder 1,2,3')
    ap.add_argument('--edition', default='all', help='print | digital | online | all')
    ap.add_argument('--book', default='GC', help='G, C oder GC')
    ap.add_argument('--check', action='store_true')
    ap.add_argument('--png', action='store_true')
    ap.add_argument('--validate', action='store_true')
    a = ap.parse_args()
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    only = [int(x) for x in a.only.split(',')] if a.only else None
    chapters = load_chapters(only)
    ensure_icons(chapters)
    ensure_fonts()
    from validate import validate
    errs = validate(chapters, ICONS)
    if errs:
        print('VALIDIERUNG:')
        for e in errs:
            print('  -', e)
        if a.validate or any(e.startswith('FEHLER') for e in errs):
            sys.exit(1 if any(e.startswith('FEHLER') for e in errs) else 0)
    elif a.validate:
        print('Validierung ok.')
        return
    if a.validate:
        return
    tests = load_tests(chapters)
    editions = ['print', 'digital', 'online'] if a.edition == 'all' else [a.edition]
    if a.check or a.png:
        editions = ['digital']
    manifest = {}
    for ed in editions:
        od = stage(ed)
        for book in a.book:
            ctx = Ctx(ed, book)
            name = 'Gramatica-A' if book == 'G' else 'Cuaderno-A'
            if ed == 'online':
                from online import build_online
                htmlp = os.path.join(ROOT, name + '.html')   # online liegt direkt in buch/ (wird mit ausgeliefert)
                open(htmlp, 'w', encoding='utf-8').write(build_online(book, chapters, tests, ctx))
                print('online:', htmlp)
            else:
                h = build_book(book, chapters, tests, ed, ctx)
                suffix = '' if not only else '-kap' + '-'.join(map(str, only))
                htmlp = os.path.join(od, name + suffix + '.html')
                open(htmlp, 'w', encoding='utf-8').write(h)
                pdfp = os.path.join(od, name + suffix + '.pdf')
                prefix = os.path.join(ROOT, 'out', 'png', f'{book}{suffix}-') if a.png else None
                if prefix:
                    os.makedirs(os.path.dirname(prefix), exist_ok=True)
                rep = render_pdf(htmlp, pdfp, prefix)
                bad = [r for r in rep['overflow'] if 'excess' in r]
                fit = [r for r in rep['overflow'] if 'zoom' in r]
                print(f'{ed}/{name}{suffix}: {rep["pages"]} Seiten · Überlauf: {len(bad)} · eingepasst: {len(fit)} · zu groß: {len(rep["tooBig"])}')
                for r in bad:
                    print('   ÜBERLAUF', r['head'], f'+{r["excess"]}px')
                for r in fit:
                    print('   eingepasst', r['head'], r['zoom'])
                for t in rep['tooBig']:
                    print('   ZU GROSS', t)
            for k, v in ctx.tracks.items():
                manifest.setdefault(k, v)
    if not (a.check or a.png):
        write_prompts(chapters)
        write_sprechskript(chapters, manifest)
        json.dump(dict(sorted(manifest.items(), key=lambda kv: [int(x) if x.isdigit() else x for x in re.split(r'[.-]', kv[0])])), open(os.path.join(ROOT, 'out', 'audio-manifest.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

STYLE = ('STYLE: hand-drawn editorial cartoon for a modern language textbook. Confident dark navy ink outlines (#15163A) with slightly varied line weight, '
         'flat colour fills with a very subtle paper texture, no gradients, no 3D, no photorealism. Limited warm palette: cream background (#FFFDF8), warm orange (#F2A03D), '
         'terracotta (#C0533A), sage green (#5F7068), soft mint (#E4EFE9); natural, varied skin tones. Expressive faces and exaggerated body language, like a great newspaper cartoon. '
         'One clear joke, clean composition, generous empty space in the upper part of the image for speech bubbles that will be added later. Absolutely no text, no letters, '
         'no numbers, no speech bubbles, no logos, no watermark, no capybara or any mascot animal. Landscape 3:2, 1536x1024.')

def write_sprechskript(chapters, tracks):
    """Aufnahmeskript für das Lautkapitel (Leo spricht es selbst ein): pro Track eine Datei."""
    out = ['# Sprechskript Kapitel 1 – Laute und Buchstaben', '',
           'Pro Track EINE Aufnahme, Dateiname = Track-ID (z. B. `1.3-1.mp3`), abgelegt in `buch/audio/`. '
           'Sobald eine Datei da ist, spielt der ▶-Knopf online deine Aufnahme statt der künstlichen Stimme; '
           'dieselben Dateien dienen auch dem Download für Druck und PDF.', '',
           'Sprechweise: ruhig, deutlich, natürliches Tempo. Zwischen einzelnen Wörtern ca. 1 Sekunde Pause, '
           'zwischen Sätzen ca. ½ Sekunde. Bei Hörübungen (Minimalpaare) 2–3 Sekunden Pause, damit man ankreuzen kann.', '']
    for ch in chapters:
        if ch['chapter'] != 1:
            continue
        for sec in ch['sections']:
            ids = sorted({t for t in tracks if t.startswith(sec['id'] + '-')}, key=lambda x: int(x.split('-')[1]))
            if not ids:
                continue
            out.append(f'## {sec["id"]} {sec["topic"]}')
            out.append('')
            for tid in ids:
                out.append(f'**{tid}**')
                out.append('')
                for i, b in enumerate(tracks[tid], 1):
                    pause = {900: '1 s', 700: '½ s', 2500: '3 s'}.get(b['p'], '')
                    out.append(f'{i}. {b["t"]}' + (f'  _(Pause {pause})_' if pause else ''))
                out.append('')
    open(os.path.join(ROOT, 'out', 'Sprechskript-Kapitel-1.md'), 'w', encoding='utf-8').write('\n'.join(out))

def write_prompts(chapters):
    out = ['# Bildprompts – Gramática A', '',
           'So geht es: Pro Bild einen neuen ChatGPT-Chat öffnen, das Figurenblatt (Prompt 0) als Bild hochladen und den Prompt komplett einfügen. '
           'Fertiges PNG mit dem Namen der Prompt-ID speichern (z. B. `11.5-A.png`) und mir schicken – der Build setzt es automatisch an die richtige Stelle.', '',
           '## Prompt 0 – Figurenblatt', '', '```',
           'Create a character model sheet for four recurring characters of a Spanish grammar book. Show each character full body, once from the front and once in three-quarter view, neutral standing pose, side by side on a plain cream background, same scale.',
           "1) LUCÍA, 32, Spanish woman from Madrid, graphic designer: dark curly hair in a messy bun, round yellow glasses, small wooden earrings, navy-and-white striped top, jeans, white sneakers. Quick-witted, slightly chaotic expression.",
           "2) DANI, 34, Spanish man, Lucía's boyfriend: tall and lean, short full beard, olive-green jacket, headphones around his neck, calm relaxed smile.",
           "3) PILAR, 63, Lucía's mother: short silver-grey hair, pearl earrings, red reading glasses on a chain, beige cardigan, warm but slightly nosy smile.",
           "4) NICO, 4, Lucía's nephew: rosy cheeks, wild hair, t-shirt with a green dinosaur, one shoelace untied, mischievous grin.", '', STYLE, '```', '']
    for ch in chapters:
        out.append(f'## Kapitel {ch["chapter"]} · {ch["title"]}')
        out.append('')
        for sec in ch['sections']:
            c = sec.get('cartoon', {})
            bubs = ' / '.join(strip_tags(b['text'].replace('<br>', ' ')) for b in c.get('bubbles', []))
            out.append(f'### {c.get("id", sec["id"]+"-A")} · {sec["id"]} {sec["topic"]}')
            out.append(f'Sprechblasen (setze ich selbst): {bubs}')
            out.append('')
            out.append('```')
            out.append('Use the attached character sheet and keep the characters exactly as designed.')
            out.append(c.get('prompt', ''))
            out.append('')
            out.append(STYLE)
            out.append('```')
            out.append('')
    open(os.path.join(ROOT, 'out', 'Bildprompts-Gramatica-A.md'), 'w', encoding='utf-8').write('\n'.join(out))

def load_tests(chapters):
    """Tests aus den test-Feldern der Abschnitte zusammenstellen: Test 1 = Kap. 1–4, Test 2 = 5–8, Test 3 = 9–13."""
    blocks = [(1, 4, 'Kapitel 1–4'), (5, 8, 'Kapitel 5–8'), (9, 13, 'Kapitel 9–13')]
    tests = []
    present = {c['chapter'] for c in chapters}
    for i, (a, b, cov) in enumerate(blocks, 1):
        per_sec = []
        for ch in chapters:
            if a <= ch['chapter'] <= b:
                for sec in ch['sections']:
                    per_sec.append([dict(it, ref=sec['id']) for it in sec.get('test', [])])
        # höchstens 30 Aufgaben: reihum je eine Frage pro Abschnitt, bis 30 erreicht sind
        chosen = {k: [] for k in range(len(per_sec))}
        total, rnd = 0, 0
        while total < 30 and any(len(chosen[k]) < len(per_sec[k]) for k in chosen):
            for k, lst in enumerate(per_sec):
                if total >= 30:
                    break
                if rnd < len(lst):
                    chosen[k].append(lst[rnd]); total += 1
            rnd += 1
        items = [it for k in range(len(per_sec)) for it in chosen[k]]
        if items:
            after = max(c for c in present if a <= c <= b)
            tests.append((i, {'covers': cov, 'items': items, 'after': after}))
    return tests

if __name__ == '__main__':
    main()
