"""Browser-Durchlauf für das Audio aus Aufnahmen (Leo, 14.11.2026: Supertonic 3 statt Piper).

Headless Chrome gegen einen statischen Server am Repo-Root, in allen vier Zielsprachen,
mit eingetragenem Namen. Prüft:
  1. Schlüssel im Browser == Schlüssel in Node (sprechtext.js in beiden Welten), Stichprobe.
  2. Die Räume laden, jeder 🔊 wird angetippt: Anfragen an Piper/onnx/HuggingFace (Erwartung 0),
     MP3-Anfragen, MP3-Fehler (404), stumme Sätze (Konsole „keine Aufnahme“).
Aufruf: python3 scripts/audio/browser-test.py <port> <einheiten-alle.json> [chrome-pfad]
"""
import json, random, sys
from playwright.sync_api import sync_playwright

PORT = int(sys.argv[1]); EINHEITEN = json.load(open(sys.argv[2]))
CHROME = sys.argv[3] if len(sys.argv) > 3 else '/usr/bin/google-chrome'
BASIS = f'http://localhost:{PORT}'
MUTTER = {'es': 'de', 'de': 'es', 'en': 'de', 'el': 'de'}
RAEUME = ['haus.html', 'mein.html', 'gefuehrt.html', 'szene.html', 'learnroman.html', 'regional.html',
          'spiele.html', 'gym.html', 'proverbios.html', 'taller.html', 'chat.html']
KNOEPFE = '.spk, .ton, .lp-speak, button[aria-label*="hör" i], button[aria-label*="Vorlesen"], button.oh-big, .track'
VERBOTEN = ('piper', 'onnx', 'huggingface', '.wasm')

ergebnis = {'piper': 0, 'mp3': 0, 'mp3_fehler': 0, 'stumm': [], 'js_fehler': [], 'schluessel_abweichung': 0}
with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=CHROME, headless=True, args=['--autoplay-policy=no-user-gesture-required', '--no-sandbox'])
    for sprache in ['es', 'de', 'en', 'el']:
        ctx = browser.new_context(viewport={'width': 390, 'height': 844})
        profil = {'name': 'Leo', 'profile': {'zielsprache': sprache, 'muttersprache': MUTTER[sprache], 'stimme': 'F', 'name': 'Leo', 'modus': 'frei', 'stufe': 'a1'}}
        ctx.add_init_script(f"try{{localStorage.setItem('spikiu_user', {json.dumps(json.dumps(profil))}); localStorage.setItem('spikiu_lang','{MUTTER[sprache]}');}}catch(e){{}}")
        seite = ctx.new_page()
        def anfrage(r):
            u = r.url.lower()
            if any(v in u for v in VERBOTEN): ergebnis['piper'] += 1; print('  VERBOTEN:', r.url)
            if u.endswith('.mp3') and '/audio/' + sprache + '/' in u: ergebnis['mp3'] += 1
        def antwort(r):
            if r.url.endswith('.mp3') and r.status >= 400: ergebnis['mp3_fehler'] += 1; print('  MP3', r.status, r.url)
        seite.on('request', anfrage); seite.on('response', antwort)
        seite.on('console', lambda m: ergebnis['stumm'].append((sprache, m.text)) if 'keine Aufnahme' in m.text else None)
        seite.on('pageerror', lambda e: ergebnis['js_fehler'].append((sprache, seite.url, str(e)[:200])))
        # 1 · Schlüssel-Gleichheit (Stichprobe von 300)
        seite.goto(BASIS + '/mein.html'); seite.wait_for_timeout(800)
        probe = random.Random(7).sample(EINHEITEN[sprache], min(300, len(EINHEITEN[sprache])))
        keys = seite.evaluate("""async (p) => { await import('/audio.js'); const S = window.SpikiuSprechText;
            return p.map(u => S.schluessel(S.sprechText(u.text))); }""", probe)
        ab = sum(1 for u, k in zip(probe, keys) if u['key'] != k)
        ergebnis['schluessel_abweichung'] += ab
        print(f'{sprache}: Schlüssel-Stichprobe {len(probe)} · Abweichung {ab}')
        # 2 · Räume: jeder 🔊 antippen, dann einen Schritt vor — bis zu 14 Schritte je Raum
        for raum in RAEUME:
            try:
                seite.goto(BASIS + '/' + raum); seite.wait_for_timeout(1400)
                for schritt in range(14):
                    seite.evaluate("""() => { const L = [...document.querySelectorAll('button, [role=button]')].filter(b => b.offsetParent && !b.disabled);
                        const sprech = L.filter(b => /speak|spk|\\bsay\\b|\\bton\\b|track/.test(b.className) || /Vorlesen|hören|Hören|Listen|ακού/i.test(b.getAttribute('aria-label')||'') || /🔊|Anhören|Nochmal hören/.test(b.textContent));
                        window.__sprech = sprech.slice(0, 12); }""")
                    n = seite.evaluate("() => window.__sprech.length")
                    for i in range(n):
                        try: seite.evaluate(f"() => window.__sprech[{i}].click()"); seite.wait_for_timeout(220)
                        except Exception: pass
                    vor = seite.evaluate("""() => { const nein = /zurück|back|Haus|Genug|Hilfe|⏏|Mein|Regal/i;
                        const sel = '.st-los, .st-k, .oh-tile, .oh-opt, .opt, .part, .st, .door, .kachel, .pf-kachel, .deck-btn.fwd, .weiter, .link, .prim, .oh-btn, .bigcard, .tile, .an, button';
                        const L = [...document.querySelectorAll(sel)].filter(b => b.offsetParent && !b.disabled && !nein.test((b.className||'') + ' ' + (b.getAttribute('aria-label')||'') + ' ' + b.textContent));
                        const b = L[(window.__schritt = (window.__schritt||0) + 1) % Math.max(1, Math.min(L.length, 4))] || L[0];
                        if (b) { b.click(); return true; } return false; }""")
                    seite.wait_for_timeout(700)
                    if not vor: break
            except Exception as e:
                print('  Raum', raum, 'Fehler:', str(e)[:120])
        fehlt = seite.evaluate("() => (window.spikiuAudioFehlt ? window.spikiuAudioFehlt() : JSON.parse(localStorage.getItem('spikiu_audio_fehlt')||'[]'))")
        bekannt = {u['key'] for u in EINHEITEN[sprache]}
        luecken = seite.evaluate("""(f) => { const S = window.SpikiuSprechText; const out = [];
            for (const e of f) for (const t of String(e.t).split(' | ')) { const g = S.sprechText(t); out.push([e.seite, g, S.schluessel(g)]); } return out; }""", fehlt)
        nicht_in_liste = [(s_, t) for s_, t, k in luecken if k not in bekannt]
        ergebnis.setdefault('nicht_in_liste', []).extend((sprache, s_, t) for s_, t in nicht_in_liste)
        print(f'{sprache}: MP3 {ergebnis["mp3"]} · stumm notiert {len(fehlt)} · davon NICHT in der Satzliste {len(nicht_in_liste)}')
        for s_, t in nicht_in_liste[:40]: print('   LÜCKE:', s_, '·', t[:150])
        ctx.close()
    browser.close()
json.dump(ergebnis.get('nicht_in_liste', []), open('/tmp/luecken.json', 'w'), ensure_ascii=False)
print(json.dumps({k: (len(v) if isinstance(v, list) else v) for k, v in ergebnis.items()}))
for e in ergebnis['js_fehler'][:15]: print('JS:', e)
