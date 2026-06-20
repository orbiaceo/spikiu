---
name: audio-browser-check
description: Audio im echten Browser prüfen (headless) — Spikiu audio.js / audio-test.html, gebraucht für Audio Phase A/B/C. Startet statischen Root-Server + headless Chrome (CDP), treibt eine Wegwerf-Probe-Seite, beweist Laden/Synthese/OPFS-Cache. NICHT für hörbare Qualität oder iOS-Safari-Fallback (geräteseitig, gehört Leo).
---

# Audio im Browser prüfen (headless)

`audio.speak(text, zielsprache)` lässt sich NICHT mit Tests oder einem Node-`import`
beweisen: es braucht einen echten Browser (WASM-Runtime, OPFS-Cache, AudioContext,
HF-Netz). „Audio läuft" heißt: headless Chrome gegen die Seite treiben und sehen,
dass die Pipeline ein WAV erzeugt.

**Verifiziert am 20.06.2026 (Phase A) — dieses Rezept lief grün.** Audio Phase B/C
brauchen genau dieselbe Prüfung.

## Wann benutzen
- Eine Änderung an `audio.js`, `audio/vendor/*`, oder einer Seite, die `audio.speak()`
  einbaut (Gym, Lektion, Häppchen).
- Beweisen, dass eine Stimme lädt + synthetisiert + aus OPFS gecacht wird.

## Was headless NICHT geht (Leo am Gerät, NIE faken/simulieren)
- **Hörbare Qualität** der vier Stimmen (de/es/en/el). Headless gibt es keinen Lautsprecher.
- **iOS-Safari-Fallback** auf `speechSynthesis`. Nur am echten iPhone prüfbar.
Diese zwei bleiben offen, bis Leo grünes Licht gibt.

## Schlüssel-Fakten dieses Projekts
- **Statische Assets liegen am REPO-ROOT, nicht in `public/`** (no-framework Vercel
  liefert vom Root). Der statische Server MUSS das Repo-Root ausliefern, sonst
  scheitern `/audio.js` und `/audio/vendor/...`.
- Node ≥ 21 hat eine eingebaute globale `WebSocket` → der CDP-Treiber braucht KEIN
  Playwright/Puppeteer. `cdp-drive.mjs` liegt neben dieser Datei.
- Single-threaded ist erwartet: ORT warnt „numThreads … crossOriginIsolated" und
  fällt auf non-threaded WASM zurück — KEIN Fehler (COOP/COEP bewusst aus).
- Modelle kommen zur Laufzeit von `huggingface.co/rhasspy/piper-voices`, gecacht in
  OPFS. Beim 2. Seitenaufruf (gleiches `--user-data-dir`) → 0 HF-Requests.

## Rezept

### 1. Statischen Server am Repo-Root starten
```bash
cd <repo-root>
python3 -m http.server 8137 --bind 127.0.0.1 >/tmp/httpd.log 2>&1 &
# warten bis erreichbar (nicht sleep raten):
until curl -sf -o /dev/null http://127.0.0.1:8137/audio.js; do sleep 0.3; done
```

### 2. Headless Chrome mit CDP starten (persistentes Profil = OPFS bleibt über Loads)
```bash
rm -rf /tmp/chromeprofile && mkdir -p /tmp/chromeprofile
nohup google-chrome --headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage \
  --remote-debugging-port=9222 --user-data-dir=/tmp/chromeprofile about:blank \
  >/tmp/chrome.log 2>&1 &
until curl -s http://127.0.0.1:9222/json/version >/dev/null; do sleep 0.3; done
```

### 3. Eine Wegwerf-Probe-Seite ins Repo-Root schreiben (NIE committen)
Vertrag: am Ende `window.__done=true` setzen und `window.__result={ok,...}` füllen.

**Lade-Probe** (`_probe_warm.html`) — beweist die ganze Lade-Kette ohne Audio:
```html
<!DOCTYPE html><meta charset="utf-8"><pre id="o">…</pre><script type="module">
const lang=new URLSearchParams(location.search).get('lang')||'el';
try{ const m=await import('/audio.js'); const ok=await m.warm(lang);
  window.__result={ok, lang}; }catch(e){ window.__result={ok:false, err:String(e&&e.stack||e)}; }
finally{ window.__done=true; document.title='warm:'+(window.__result.ok?'OK':'FAIL'); }
</script>
```

**Synthese-Probe** (`_probe_synth.html`) — beweist echtes `predict`→WAV durch
`audio.speak()`, Wiedergabe wird gestubbt, Fallback wird erkannt:
```html
<!DOCTYPE html><meta charset="utf-8"><pre id="o">…</pre><script type="module">
let bytes=0, fb=false;
const real=URL.createObjectURL.bind(URL);
URL.createObjectURL=(b)=>{ if(b&&b.size) bytes=Math.max(bytes,b.size); return real(b); };
const RA=window.Audio; window.Audio=function(s){const a=new RA();a.play=()=>{setTimeout(()=>a.onended&&a.onended(),0);return Promise.resolve();};if(s)a.src=s;return a;};
if(window.speechSynthesis){window.speechSynthesis.speak=(u)=>{fb=true;setTimeout(()=>u.onend&&u.onend(),0);};}
const lang=new URLSearchParams(location.search).get('lang')||'el';
try{ const m=await import('/audio.js'); await m.speak('Γεια σου, καλημέρα.', lang);
  window.__result={ok:(bytes>0&&!fb), bytes, fallbackUsed:fb}; }
catch(e){ window.__result={ok:false, err:String(e&&e.stack||e)}; }
finally{ window.__done=true; }
</script>
```
(Probe-Text/-Sprache je nach Test anpassen.)

### 4. Treiben + auslesen
```bash
node .claude/skills/audio-browser-check/cdp-drive.mjs \
  http://127.0.0.1:8137/_probe_warm.html?lang=el --shot /tmp/warm.png
# dann (2. Aufruf, gleiches Profil → OPFS, 0 HF-Requests erwartet):
node .claude/skills/audio-browser-check/cdp-drive.mjs \
  http://127.0.0.1:8137/_probe_synth.html?lang=el
# echte UI rendern + anschauen:
node .claude/skills/audio-browser-check/cdp-drive.mjs \
  http://127.0.0.1:8137/audio-test.html --shot /tmp/audiotest.png --timeout 8000
```
Dann den Screenshot mit dem Read-Tool ANSEHEN (leerer Frame = Start fehlgeschlagen).

### Was grün heißt
- Lade-Probe: `result.ok=true`, keine Exception, HF-Requests gehen an **rhasspy**.
- Synthese-Probe: `ok=true`, `bytes>0` (echtes WAV, ~50 KB für einen kurzen Satz),
  `fallbackUsed=false`. Beim 2. Load **HF/xet requests = 0** (OPFS greift).
- `audio-test.html`: 4 Knöpfe + kompletter Capy gerendert.

### 5. Aufräumen (Pflicht)
```bash
for p in $(pgrep -f "remote-debugging-port=9222"); do kill -9 "$p"; done
for p in $(pgrep -f "http.server 8137"); do kill -9 "$p"; done
rm -f _probe_*.html; rm -rf /tmp/chromeprofile
git status --short   # MUSS leer sein — keine Probe-Datei ins Repo
```
Achtung: `pkill`/`kill` in der GLEICHEN Shell, die den Server per `&` startete, kann
die Shell mit-killen (Exit 144). Lieber pro PID killen (Schleife oben) und in einem
eigenen Befehl verifizieren.
