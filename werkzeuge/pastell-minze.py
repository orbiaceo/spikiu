"""Pastell-Minze-Umbau (Leo, 22.11.2026): dicke Tinten-Ränder → zarte Minzlinie, harte Versatzschatten → weiche Schatten,
Archivo Black / DM Sans → Nunito, dunkel gefüllte Knöpfe → Minze mit Tinte. Lora (Zielsprache) und DM Mono (Augenbrauen) bleiben."""
import re,sys
INK=r"(?:var\(--ink(?:,\s*#15163a)?\)|#15163a|var\(--navy\)|var\(--jg-ink\)|var\(--ink2\)|#20271f|var\(--back\))"
W=r"(?:\d+(?:\.\d+)?px|var\(--ow\)|var\(--jg-ow\))"
LINIE="1.5px solid #dcebe1"
WEICH="0 6px 18px rgba(21,22,58,.07)"
def umbau(s):
    n={}
    def sub(name,pat,rep,flags=0):
        nonlocal s
        s,k=re.subn(pat,rep,s,flags=flags);n[name]=n.get(name,0)+k
    sub('rand',r"(border(?:-top|-bottom|-left|-right)?)\s*:\s*"+W+r"\s+solid\s+"+INK,r"\1:"+LINIE)
    sub('rand2',r"(border(?:-top|-bottom|-left|-right)?)\s*:\s*"+W+r"\s+solid\s+(?=['\"+])",r"\1:1.5px solid ")
    sub('schatten',r"box-shadow\s*:\s*-?\d+(?:\.\d+)?px\s+-?\d+(?:\.\d+)?px\s+0\s+"+INK,"box-shadow:"+WEICH)
    sub('schattenVar',r"box-shadow\s*:\s*var\(--sh[bs]\)\s+0\s+"+INK,"box-shadow:"+WEICH)
    sub('schattenAkz',r"box-shadow\s*:\s*-?\d+(?:\.\d+)?px\s+-?\d+(?:\.\d+)?px\s+0\s+(var\(--acc(?:,[^)]*)?\)|#1f93b0)","box-shadow:0 6px 18px rgba(31,147,176,.16)")
    sub('ow',r"(--(?:jg-)?ow)\s*:\s*[\d.]+px",r"\1:1.5px")
    sub('archivoFam',r"font-family\s*:\s*(['\"]?)Archivo Black\1",r"font-weight:800;font-family:\1Nunito\1")
    sub('archivoKurz',r"font\s*:\s*([\d.]+(?:rem|px|em)(?:/[\d.]+\w*)?\s*)(['\"]?)Archivo Black",r"font:800 \1\2Nunito")
    sub('archivo',r"(['\"]?)Archivo Black\1",r"\1Nunito\1")
    sub('dmsans',r"(['\"])DM Sans\1",r"\1Nunito\1")
    sub('dmsans2',r"(?<![\w+'\"])DM Sans(?=[,;'\"])","Nunito")
    # dunkel/kräftig gefüllte Flächen mit weißer Schrift → Minze mit Tinte (blockweise)
    DARK=r"background(?:-color)?\s*:\s*(?:"+INK+r"|var\(--acc(?:,[^)]*)?\)|#1f93b0|#ff6b5a|var\(--terra\)|var\(--coral\)|var\(--teal\)|var\(--[a-z0-9-]+(?:,[^)]*)?\)|#[0-9a-fA-F]{3,6}\b)"
    def block(m):
        b=m.group(0)
        if re.search(DARK,b) and re.search(r"(?<![-\w])color\s*:\s*(?:#fff(?:fff)?\b|white|var\(--bg\)|#eef7f1|var\(--acctx\))",b):
            n['knopf']=n.get('knopf',0)+1
            b=re.sub(DARK,"background:#c9ecd9",b)
            b=re.sub(r"(?<![-\w])color\s*:\s*(?:#fff(?:fff)?\b|white|var\(--bg\)|#eef7f1|var\(--acctx\))","color:#15163a",b)
        return b
    s=re.sub(r"\{[^{}]*\}",block,s)
    sub('senf',r"(background(?:-color)?\s*:\s*)#ffd24a",r"\1#ffe7a3")
    sub('senfVar',r"(--(?:jg-)?(?:mustard|you|gold|gelb|acc))\s*:\s*#ffd24a",r"\1:#ffe7a3")
    return s,n
if __name__=='__main__':
    dry='--dry' in sys.argv
    for f in [a for a in sys.argv[1:] if not a.startswith('--')]:
        t=open(f).read();u,n=umbau(t)
        if f.endswith('.html') and 'family=Nunito' not in u:
            u=u.replace('</head>','<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">\n</head>',1);n['nunitoLink']=1
        u=u.replace('family=Nunito:wght@600;700;800&','family=Nunito:wght@600;700;800;900&')
        print(f, {k:v for k,v in n.items() if v})
        if not dry and u!=t: open(f,'w').write(u)
