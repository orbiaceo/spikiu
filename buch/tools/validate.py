"""Datenprüfung für content/kap-XX.json. FEHLER bricht den Build ab, WARNUNG nicht."""
import os, re

BLOCKS = {'h', 'h3', 'p', 'oneline', 'columns', 'table', 'examples', 'question', 'story', 'signal',
          'ojo', 'region', 'variantes', 'novela', 'spikiu', 'trick', 'conj'}
EXS = {'hear', 'mark', 'choice', 'cloze', 'dialog', 'fill', 'sort', 'match', 'transform', 'translate',
       'cards', 'free', 'tongue'}
TAGS = ['es', 'de', 'c1', 'c2', 'em', 'b', 't', 'g', 'c', 'gb']
FORBIDDEN = [(r'\bKI\b', '„KI“ (nach außen immer „Spikiu“)'), (r'\bKurs(e|es)?\b', '„Kurs“'),
             (r'\bLevel\b', '„Level“'), (r'\*[^*\s][^*]*\*', 'Sternchen als Betonung (nimm <em>)'),
             (r'\bvos (sos|tenés|querés|sabés|podés)\b', 'Voseo im Beispiel (nur im Regionalkasten erklären)')]

def _strings(o, path=''):
    if isinstance(o, str):
        yield path, o
    elif isinstance(o, dict):
        for k, v in o.items():
            if k in ('prompt',):
                continue
            yield from _strings(v, f'{path}.{k}')
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from _strings(v, f'{path}[{i}]')

def validate(chapters, icons_dir):
    errs = []
    seen_tracks = {}
    seen_ids = set()
    def E(msg): errs.append('FEHLER ' + msg)
    def W(msg): errs.append('WARNUNG ' + msg)
    def chk_icon(code, where):
        if not os.path.exists(os.path.join(icons_dir, code.upper() + '.svg')):
            E(f'{where}: Icon {code} existiert nicht (siehe icon-liste.tsv)')
    for ch in chapters:
        f = ch.get('_file', '?')
        for k in ('chapter', 'title', 'sections'):
            if k not in ch:
                E(f'{f}: Feld {k} fehlt')
        spk = 0
        for sec in ch.get('sections', []):
            sid = sec.get('id', '?')
            w = f'{f} {sid}'
            if sid in seen_ids:
                E(f'{w}: doppelte Abschnitts-ID')
            seen_ids.add(sid)
            for k in ('id', 'topic', 'level', 'headline_es', 'headline_de', 'cartoon', 'gramatica', 'cuaderno', 'test', 'index'):
                if k not in sec:
                    E(f'{w}: Feld {k} fehlt')
            if not str(sid).startswith(f'{ch.get("chapter")}.'):
                E(f'{w}: ID passt nicht zu Kapitel {ch.get("chapter")}')
            c = sec.get('cartoon', {})
            for k in ('id', 'icons', 'bubbles', 'prompt'):
                if k not in c:
                    E(f'{w}: cartoon.{k} fehlt')
            for ic in c.get('icons', []):
                chk_icon(ic, w + ' cartoon')
            if 'capybara' in c.get('prompt', '').lower() and 'no capybara' not in c.get('prompt', '').lower():
                E(f'{w}: Cartoon-Prompt darf kein Capybara zeichnen lassen')
            g = sec.get('gramatica', [])
            if not isinstance(g, list) or not g or not all(isinstance(p, list) for p in g):
                E(f'{w}: gramatica muss Liste von Seiten (Listen) sein')
                g = []
            for p in g:
                for b in p:
                    if b.get('type') not in BLOCKS:
                        E(f'{w}: unbekannter Blocktyp {b.get("type")}')
                    if b.get('type') == 'spikiu':
                        spk += 1
                    if b.get('type') in ('columns',):
                        for col in b.get('cols', []):
                            if col.get('icon'):
                                chk_icon(col['icon'], w)
                    if b.get('type') == 'trick':
                        chk_icon(b.get('icon', ''), w)
                    if b.get('type') == 'conj':
                        for v in b.get('verbs', []):
                            if len(v.get('forms', [])) != len(b.get('pron', [1]*6)):
                                E(f'{w}: conj {v.get("inf")} braucht {len(b.get("pron",[1]*6))} Formen')
            cu = sec.get('cuaderno', [])
            if not isinstance(cu, list) or not cu or not all(isinstance(p, list) for p in cu):
                E(f'{w}: cuaderno muss Liste von Seiten (Listen) sein')
                cu = []
            nex = 0
            for p in cu:
                for e in p:
                    nex += 1
                    t = e.get('type')
                    if t not in EXS:
                        E(f'{w}: unbekannter Übungstyp {t}')
                        continue
                    if 'title' not in e:
                        E(f'{w}: Übung ohne title')
                    if t == 'choice':
                        for it in e.get('items', []):
                            for m in re.findall(r'\[\[(.+?)\]\]', it):
                                if m.count('!') != 1:
                                    E(f'{w}: choice „{it[:40]}…“ braucht genau eine richtige Option mit !')
                            if not re.search(r'\[\[', it):
                                E(f'{w}: choice ohne [[…]]: {it[:40]}')
                    if t in ('cloze',) and not re.search(r'\{\{', e.get('text', '')):
                        E(f'{w}: cloze ohne {{{{…}}}}')
                    if t == 'fill':
                        for it in e.get('items', []):
                            if '{{' not in it:
                                E(f'{w}: fill-Item ohne Lücke: {it}')
                    if t == 'mark' and '[[' not in e.get('text', ''):
                        E(f'{w}: mark ohne [[wort|LABEL]]')
                    if t == 'hear':
                        for pr in e.get('pairs', []):
                            if pr.get('said') not in range(len(pr.get('opts', []))):
                                E(f'{w}: hear said-Index ungültig')
                    if t == 'match':
                        if len(e.get('answer', [])) != len(e.get('left', [])):
                            E(f'{w}: match answer-Länge ≠ left')
                    if t == 'cards':
                        for cc in e.get('items', []):
                            chk_icon(cc.get('icon', ''), w + ' cards')
                            if 'solution' not in cc:
                                E(f'{w}: cards-Item ohne solution')
                    if t == 'sort':
                        allw = sorted(x for bk in e.get('baskets', []) for x in bk.get('answers', []))
                        if sorted(e.get('words', [])) != allw:
                            E(f'{w}: sort – words und answers stimmen nicht überein')
                    if t in ('translate',):
                        for it in e.get('items', []):
                            if 'de' not in it or 'es' not in it:
                                E(f'{w}: translate-Item braucht de + es')
                    if t == 'transform':
                        for it in e.get('items', []):
                            if 'q' not in it or 'a' not in it:
                                E(f'{w}: transform-Item braucht q + a')
            if nex < 4:
                W(f'{w}: nur {nex} Übungen (Ziel 4–6)')
            for it in sec.get('test', []):
                if not isinstance(it.get('answer'), int) or it['answer'] >= len(it.get('options', [])):
                    E(f'{w}: Testfrage mit ungültigem answer: {it.get("q","")[:40]}')
                if '___' not in it.get('q', ''):
                    W(f'{w}: Testfrage ohne ___: {it.get("q","")[:40]}')
            if len(sec.get('test', [])) < 2:
                W(f'{w}: weniger als 2 Testfragen')
            # Strings
            for path, s in _strings(sec):
                for tg in TAGS:
                    if s.count(f'<{tg}>') != s.count(f'</{tg}>'):
                        E(f'{w}{path}: <{tg}> nicht geschlossen: {s[:60]}')
                for rx, lab in FORBIDDEN:
                    if re.search(rx, s):
                        W(f'{w}{path}: {lab}: {s[:60]}')
                for tr in re.findall(r'<t>([^<]+)</t>', s):
                    if not re.match(r'^\d+\.\d+-\d+$', tr):
                        E(f'{w}: Track-ID {tr} hat falsches Format (z. B. 11.5-1)')
                    if not tr.startswith(sid + '-'):
                        E(f'{w}: Track {tr} gehört nicht zu {sid}')
            for path, s in _strings(sec):
                pass
            # track-Felder
            def walk(o):
                if isinstance(o, dict):
                    if 'track' in o and isinstance(o['track'], str):
                        yield o['track']
                    for v in o.values():
                        yield from walk(v)
                elif isinstance(o, list):
                    for v in o:
                        yield from walk(v)
            for tr in walk(sec):
                if not re.match(r'^\d+\.\d+-\d+$', tr) or not tr.startswith(sid + '-'):
                    E(f'{w}: Track-ID {tr} ungültig (Format {sid}-N)')
        if spk > 1:
            W(f'{f}: {spk} Spikiu-Kniffe in einem Kapitel – höchstens einer')
    return errs
