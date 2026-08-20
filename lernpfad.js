/* ══════════════════════════════════════════════════════════════════════
   SPIKIU — LERNPFAD-HELFER  (lernpfad.js)

   Der gemeinsame Helfer am Root, wie sitzung.js / audio.js / nav.js.
   JEDER Raum erbt ihn. Niemals pro Raum nachbauen.

   Zwei Dinge liegen getrennt, und das ist Absicht:
     lernpfad-daten.js  = der BAUM. Fest, für alle gleich, null Token.
     spikiu_pfad        = der WEG. Persönlich, in localStorage.

   DREI ZUSTÄNDE je Station (Entscheid 18.08.2026):
     offen          — noch nicht betreten
     durchschritten — einmal berührt; öffnet die nächste Station
     gesetzt        — die Wörter kamen im Gym wieder und wurden erkannt

   Kein Tor, ein Sog: blockiert wird nie. Der Baum zeigt nur, was offen
   ist, und der Lerner geht von selbst zurück. Kein Streak, keine Note,
   kein Scheitern — „Fortschritt wird gefühlt, nie gezählt."

   Phase 1: localStorage (pro Gerät, pro Browser).
   Phase 2: Supabase, geräteübergreifend.
   ══════════════════════════════════════════════════════════════════════ */

(function (raum) {

  var SCHLUESSEL = 'spikiu_pfad';

  function leer(zielsprache) {
    return { zielsprache: zielsprache || 'es', stufe: 'a1', stationen: {} };
  }

  function lade() {
    try {
      var r = JSON.parse(localStorage.getItem(SCHLUESSEL) || 'null');
      if (r && r.stationen) return r;
    } catch (e) {}
    return leer();
  }

  function speichere(p) {
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(p)); } catch (e) {}
  }

  function daten() { return raum.SpikiuLernpfad || null; }

  /* ── Lesen ────────────────────────────────────────────────────────── */

  function stufe() { return lade().stufe || 'a1'; }

  function status(thema, welcheStufe) {
    var p = lade();
    var e = p.stationen[(welcheStufe || p.stufe) + '.' + thema];
    return (e && e.status) || 'offen';
  }

  /* Was Spikiu beim Gruß anbietet: die Themen der AKTUELLEN Stufe.
     Nur die aktuelle — sonst wird die Liste zwanzig Zeilen lang.
     Eine Station trägt „naechste": die erste, die noch nicht gesetzt ist.
     Führung durch Vorschlag, nicht durch Schloss. */
  function palette(welcheStufe) {
    var D = daten(); if (!D) return [];
    var st = welcheStufe || stufe();
    var erste = null;
    return D.themen.filter(function (t) {
      return D.gefuellt(st, t.id);              // leere Stationen zeigt Spikiu nie
    }).map(function (t) {
      var s = status(t.id, st);
      if (!erste && s !== 'gesetzt') erste = t.id;
      return {
        id: t.id,
        em: t.em,
        na: t.na,
        schritt: D.schritt[t.id] ? D.schritt[t.id][st] : null,
        status: s,
        stufe: st
      };
    }).map(function (x) {
      x.naechste = (x.id === erste);
      return x;
    });
  }

  /* Die erste Ebene: Gruppen statt Themen. Jede trägt eine Perlenreihe —
     so viele Perlen wie gefüllte Stationen darin, gefüllt nach Stand.
     Kein Zähler, kein Prozent: man sieht den Stand, statt ihn zu lesen. */
  function kategorien(welcheStufe) {
    var D = daten(); if (!D || !D.kategorien) return [];
    var st = welcheStufe || stufe();
    var nx = naechste(st);
    return D.kategorien.map(function (K) {
      var drin = K.themen.filter(function (id) { return D.gefuellt(st, id); });
      return {
        id: K.id,
        em: K.em,
        na: K.na,
        themen: drin,
        perlen: drin.map(function (id) { return status(id, st); }),
        naechste: !!(nx && drin.indexOf(nx.id) !== -1),
        stufe: st
      };
    }).filter(function (K) { return K.themen.length > 0; });   // leere Gruppen nie zeigen
  }

  /* Die zweite Ebene: die Themen EINER Gruppe. */
  function themenIn(katId, welcheStufe) {
    var st = welcheStufe || stufe();
    return palette(st).filter(function (x) {
      var D = daten();
      for (var i = 0; i < D.kategorien.length; i++) {
        if (D.kategorien[i].id === katId) return D.kategorien[i].themen.indexOf(x.id) !== -1;
      }
      return false;
    });
  }

  /* Die eine Station, die Spikiu zuerst vorschlägt. */
  function naechste(welcheStufe) {
    var p = palette(welcheStufe);
    for (var i = 0; i < p.length; i++) if (p[i].naechste) return p[i];
    return p[0] || null;
  }

  /* Ist die Stufe rund? Erst dann bietet Spikiu die nächste an. */
  function stufeRund(welcheStufe) {
    var p = palette(welcheStufe);
    if (!p.length) return false;
    return p.every(function (x) { return x.status === 'gesetzt'; });
  }

  /* ── Schreiben ────────────────────────────────────────────────────── */

  /* Berühren: der Lerner war da. Mehr wird nicht behauptet.
     Eine bereits gesetzte Station fällt dadurch NICHT zurück. */
  function beruehre(thema, welcheStufe) {
    var p = lade();
    var st = welcheStufe || p.stufe;
    var k = st + '.' + thema;
    var e = p.stationen[k] || {};
    if (e.status !== 'gesetzt') e.status = 'durchschritten';
    e.beruehrt = new Date().toISOString().slice(0, 10);
    p.stationen[k] = e;
    speichere(p);
    return e;
  }

  /* Setzen: die Wörter kamen wieder und wurden erkannt. Das kommt aus
     dem Gym (FSRS), nicht aus dem Raum selbst — sonst wäre es wieder
     eine Prüfung statt eines Wiedersehens. */
  function setze(thema, welcheStufe, woerterGesetzt) {
    var p = lade();
    var st = welcheStufe || p.stufe;
    var k = st + '.' + thema;
    var e = p.stationen[k] || {};
    var D = daten();
    var gesamt = D ? D.woerter(st, thema).length : 0;
    e.woerterGesetzt = woerterGesetzt || 0;
    /* Gesetzt heißt: die Mehrheit der Wörter ist wiedergekommen.
       Nicht alle — ein einzelnes hartnäckiges Wort darf nichts blockieren. */
    if (gesamt && e.woerterGesetzt >= Math.ceil(gesamt * 0.7)) e.status = 'gesetzt';
    else if (e.status !== 'gesetzt') e.status = 'durchschritten';
    p.stationen[k] = e;
    speichere(p);
    return e;
  }

  /* Stufe wechseln. Nur wenn die aktuelle rund ist — oder ausdrücklich. */
  function setzeStufe(neu) {
    var p = lade(); p.stufe = neu; speichere(p); return p.stufe;
  }

  function setzeZielsprache(z) {
    var p = lade(); p.zielsprache = z; speichere(p); return p.zielsprache;
  }

  /* Existiert überhaupt ein Pfad? Danach richtet sich Spikius Gruß:
     mit Pfad → Themen anbieten. Ohne → erst ins Assessment. */
  function existiert() {
    var p = lade();
    return !!(p && p.zielsprache && daten());
  }

  function raeume() {
    try { localStorage.removeItem(SCHLUESSEL); } catch (e) {}
  }

  /* ══════════════════════════════════════════════════════════════════
     DIE KACHELWAHL — einmal gebaut, von allen Räumen geerbt.

     Sie lag zuerst nur in chat.html; gefuehrt.html zeigte weiter Pillen.
     Zwei Oberflächen für dieselbe Sache sind zwei Wahrheiten — deshalb
     wohnt sie ab 18.08.2026 hier, wie sitzung.js oder audio.js.

     Zwei Ebenen: erst Gruppen, dann die Themen darin. Ring = Stand der
     Station, Perlen = Stand der Gruppe, Punkt = die nächste Station.
     Kein Schloss, keine Zahl, kein Prozent.

       SpikiuPfad.waehler(ziel, { ui, onWahl })
     ══════════════════════════════════════════════════════════════════ */

  var CSS_ID = 'spikiu-pfad-css';
  var CSS = ''
    + '.pf-wahl{display:flex;flex-direction:column;align-items:center;gap:.6rem;width:100%;max-width:30rem;margin:0 auto}'
    + '.pf-raster{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;width:100%}'
    + '.pf-kachel{position:relative;box-sizing:border-box;background:#fff;'
    + 'border:2.5px solid var(--ink,#15163a);border-radius:16px;box-shadow:3px 3px 0 var(--ink,#15163a);'
    + 'padding:.7rem .6rem .6rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;'
    + 'justify-content:center;gap:.2rem;min-height:98px;font-family:"DM Sans",sans-serif;'
    + '-webkit-tap-highlight-color:transparent;transition:transform .1s,box-shadow .1s}'
    + '.pf-kachel:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink,#15163a)}'
    + '.pf-kachel .pf-em{font-size:1.6rem;line-height:1}'
    + '.pf-kachel .pf-tt{font-weight:800;font-size:.84rem;line-height:1.2;text-align:center;color:var(--ink,#15163a)}'
    + '.pf-kachel .pf-sub{font-weight:600;font-size:.68rem;line-height:1.25;text-align:center;color:var(--muted,#5f7068)}'
    + '.pf-kachel.pf-naechste{border-color:var(--accent,#1f93b0);box-shadow:3px 3px 0 var(--accent,#1f93b0)}'
    + '.pf-kachel .pf-punkt{position:absolute;top:.55rem;left:.55rem;width:7px;height:7px;'
    + 'border-radius:50%;background:var(--accent,#1f93b0)}'
    + '.pf-ring{position:absolute;top:.5rem;right:.5rem;width:12px;height:12px;border-radius:50%;'
    + 'border:2px solid var(--ink,#15163a);background:#fff}'
    + '.pf-ring.halb{background:linear-gradient(90deg,#1b4f72 50%,#fff 50%)}'
    + '.pf-ring.voll{background:#1b4f72}'
    + '.pf-perlen{display:flex;gap:3px;justify-content:center;margin-top:.1rem}'
    + '.pf-perle{width:6px;height:6px;border-radius:50%;background:var(--ink,#15163a);opacity:.2}'
    + '.pf-perle.halb{opacity:.55;background:#1b4f72}'
    + '.pf-perle.voll{opacity:1;background:#1b4f72}'
    + '.pf-kopf{font:800 1.02rem "DM Sans",sans-serif;display:flex;align-items:center;'
    + 'justify-content:center;gap:.45rem;color:var(--ink,#15163a)}'
    + '.pf-zurueck{align-self:flex-start;background:#fff;border:2px solid var(--ink,#15163a);'
    + 'border-radius:100px;padding:.35rem .9rem;font:800 .78rem "DM Sans",sans-serif;'
    + 'color:var(--ink,#15163a);cursor:pointer;-webkit-tap-highlight-color:transparent}'
    + '.pf-stufe{font:800 .66rem "DM Sans",sans-serif;letter-spacing:.06em;text-transform:uppercase;'
    + 'color:var(--muted,#5f7068);opacity:.75}';

  function css() {
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement('style');
    st.id = CSS_ID; st.textContent = CSS;
    document.head.appendChild(st);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function kachel(inhalt, extra) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pf-kachel' + (extra || '');
    b.innerHTML = inhalt;
    return b;
  }

  /* Baut die Wahl in ein Element. onWahl(themaId, stufe) beim Tippen.
     Der Raum entscheidet selbst, was dann passiert — der Helfer führt nur. */
  function waehler(ziel, opt) {
    opt = opt || {};
    var ui = opt.ui || 'de';
    css();
    ziel.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'pf-wahl';
    ziel.appendChild(wrap);

    function ebene1() {
      var kats = kategorien();
      wrap.innerHTML = '';
      if (!kats.length) return;
      var st = document.createElement('div');
      st.className = 'pf-stufe'; st.textContent = kats[0].stufe.toUpperCase();
      wrap.appendChild(st);
      var g = document.createElement('div'); g.className = 'pf-raster';
      kats.forEach(function (K) {
        var perlen = K.perlen.map(function (s) {
          return '<span class="pf-perle' + (s === 'gesetzt' ? ' voll' : s === 'durchschritten' ? ' halb' : '') + '"></span>';
        }).join('');
        var k = kachel(
          (K.naechste ? '<span class="pf-punkt"></span>' : '')
          + '<span class="pf-em">' + K.em + '</span>'
          + '<span class="pf-tt">' + esc(K.na[ui] || K.na.de) + '</span>'
          + '<span class="pf-perlen">' + perlen + '</span>',
          K.naechste ? ' pf-naechste' : '');
        k.onclick = function () { ebene2(K); };
        g.appendChild(k);
      });
      wrap.appendChild(g);
    }

    function ebene2(K) {
      var liste = themenIn(K.id);
      if (!liste.length) { ebene1(); return; }
      wrap.innerHTML = '';
      var zu = document.createElement('button');
      zu.type = 'button'; zu.className = 'pf-zurueck';
      zu.textContent = '← ' + (opt.zurueck || 'Themen');
      zu.onclick = ebene1;
      wrap.appendChild(zu);
      var kopf = document.createElement('div');
      kopf.className = 'pf-kopf';
      kopf.innerHTML = '<span>' + K.em + '</span><span>' + esc(K.na[ui] || K.na.de) + '</span>';
      wrap.appendChild(kopf);
      var g = document.createElement('div'); g.className = 'pf-raster';
      liste.forEach(function (x) {
        var ring = x.status === 'gesetzt' ? ' voll' : x.status === 'durchschritten' ? ' halb' : '';
        var k = kachel(
          (x.naechste ? '<span class="pf-punkt"></span>' : '')
          + '<span class="pf-ring' + ring + '"></span>'
          + '<span class="pf-em">' + x.em + '</span>'
          + '<span class="pf-tt">' + esc(x.na[ui] || x.na.de) + '</span>'
          + (x.schritt ? '<span class="pf-sub">' + esc(x.schritt[ui] || x.schritt.de) + '</span>' : ''),
          x.naechste ? ' pf-naechste' : '');
        k.onclick = function () {
          if (opt.onWahl) opt.onWahl(x.id, x.stufe, x);
        };
        g.appendChild(k);
      });
      wrap.appendChild(g);
    }

    ebene1();
    return { zurueckZuGruppen: ebene1 };
  }

  /* ── Öffentliche Fläche ───────────────────────────────────────────── */
  raum.SpikiuPfad = {
    lade: lade,
    stufe: stufe,
    status: status,
    palette: palette,
    kategorien: kategorien,
    themenIn: themenIn,
    waehler: waehler,
    naechste: naechste,
    stufeRund: stufeRund,
    beruehre: beruehre,
    setze: setze,
    setzeStufe: setzeStufe,
    setzeZielsprache: setzeZielsprache,
    existiert: existiert,
    raeume: raeume
  };

})(typeof window !== 'undefined' ? window : this);
