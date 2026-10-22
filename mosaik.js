/* ===================================================================
   mosaik.js — Mein Regal als Mosaik (Spikiu)
   -------------------------------------------------------------------
   Leo, 22.10.2026, 14:27: „Aprobado! Dale!" (Prototyp prototyp-mosaik.html,
   Ansicht „Themen"). Ersetzt die vier Regal-Kacheln + den Lernweg-Streifen
   (Baum) in haus.html und die Seite dashboard.html (Lernweg).

   EINE Ansicht, alles auf einen Blick: eine Kachel pro Lernstation, nur Titel
   (Leo, 16:26: kein Inhalt auflisten). Antippen → zurück zur Übung; hat die
   Station auch eine Lektion, fragt eine kleine Karte, welches. Keine Zahlen.
   Symbole + Farben 1:1 aus den Haus-Kacheln (Leo: „Einheit aufbewahren!").

   Statischer Root-Helfer wie baum.js / nav.js — kein vercel.json-Eintrag.
   Einbindung:  <script src="woerter.js"></script> <script src="mosaik.js"></script>
   Aufruf:      window.spikiuMosaik(containerEl, { sprache, kategorie, zurueck, say, buch });
     kategorie = gespr | lek | lesen  (die Kacheln davor baut haus.html mit kacheln())
     sprache = Muttersprache (de|es|en|el) · say(text, lang) = Vorlesen
     untertitel:false = kein eigener Untertitel (das Haus zeigt ihn schon oben)
     buch    = Funktion, die die Schatzkiste (Mein Buch) öffnet

   LIEST (nur lesen, schreibt nichts):
     spikiu_user.lessons[]   {id, thema, szene?, raum?, fromConversation, lesson.vocab[{word,translation}], createdAt, zielsprache}
     spikiu_user.szenen{id}  {done, last}
     spikiu_buch[]           {wort, roh, tr, quelle, t}
     spikiu_learnroman_zuletzt {buch, i}
     spikiu_acrosticos{z}[]  {wort, titel} · spikiu_huerto{z}{…}
     window.SpikiuWoerter.gesetzt(z, wort)   (woerter.js)
     window.spikiuSzenen     (szenen.js)
=================================================================== */
(function (w, d) {
  'use strict';
  if (w.spikiuMosaik) return;

  var INK = '#15163a';
  var SCHATZ_SVG = '<svg viewBox="0 0 48 42" aria-hidden="true"><path d="M5 19 Q5 5 24 5 Q43 5 43 19 Z" fill="#d79b5a" stroke="#15163a" stroke-width="2.6" stroke-linejoin="round"/><rect x="5" y="19" width="38" height="19" rx="2.5" fill="#b8763a" stroke="#15163a" stroke-width="2.6"/><path d="M11 8.6 V38 M37 8.6 V38" stroke="#ffd24a" stroke-width="4.2"/><rect x="19.5" y="15" width="9" height="10" rx="2" fill="#ffd24a" stroke="#15163a" stroke-width="2.2"/><circle cx="24" cy="19.3" r="1.4" fill="#15163a"/><path d="M24 20.5 V22.6" stroke="#15163a" stroke-width="1.6" stroke-linecap="round"/><path d="M41 2.5 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1z" fill="#ff4f9a"/></svg>';

  /* Räume → Symbol + Kachelfarbe wie in haus.html */
  var RAUM = {
    szene:     { em: '🎭', bg: '#ffd24a' },   // Geführtes Gespräch
    gespraech: { em: '💬', bg: '#c7e89a' },   // Freies Gespräch
    schreiben: { em: '✍️', bg: '#cdbdf2' },   // Schreiben
    lesen:     { em: '📖', bg: '#d3eef6' },   // Lernroman
    wendungen: { em: '🃏', bg: '#ffd0b0' },   // Wortschatz (Wendungen)
    sammlung:  { em: SCHATZ_SVG, bg: '#c7e89a' }, // Schatzkiste
    lektion:   { em: '📓', bg: '#ffd24a' },
    akro:      { em: '🔤', bg: '#cdbdf2' },
    garten:    { em: '🌿', bg: '#bfe6d5' }
  };

  var TX = {
    de: { zurueck: '‹ zurück zum Regal', leerGespr: 'Noch kein Gespräch geübt.', leerLek: 'Noch keine Lektion.', leerLesen: 'Noch nichts gelesen.', titel: 'Dein Regal', kr: 'Deine Lernstationen. Tipp an, was du wiedersehen willst.',
      alles: 'Alles', gespr: 'Gespräche', kiste: 'Schatzkiste', lek: 'Lektionen', lesen: 'Lesen', werke: 'Werke',
      szene: 'Geführtes Gespräch', gespraech: 'Freies Gespräch', schreiben: 'Schreiben', lernroman: 'Lernroman',
      wendungen: 'Wendungen', sammlung: 'Gesammelt', lektion: 'Lektion',
      alleSitzen: 'Alle Wörter sitzen', einige: 'Einige Wörter sitzen schon', warten: 'Die Wörter warten aufs Wiedersehen',
      deineWerke: 'Deine Werke', akro: 'Akrosticha', garten: 'Garten', naechstes: 'Als Nächstes', nochNicht: 'noch nicht geübt',
      leer: 'Hier sammelt sich alles, was du übst. Fang mit dem Geführten Gespräch an.',
      kamAus: 'Kam aus', gesammelt: 'Was du hier gesammelt hast', sitzt: 'sitzt', wartet: 'wartet aufs Wiedersehen',
      nochmal: 'Nochmal sprechen', nachlesen: 'Nochmal schreiben', weiterlesen: 'Weiterlesen', ansehen: 'Ansehen', beginnen: 'Szene beginnen',
      oeffnen: 'Lektion öffnen', anhoeren: '🔊 Anhören', ueben: '🃏 Im Wortschatz üben', alleWorte: 'Alle Wörter ansehen', kapitel: 'Kapitel', zu: 'Schließen' },
    es: { zurueck: '‹ volver al estante', leerGespr: 'Aún no has practicado ninguna conversación.', leerLek: 'Aún no hay lecciones.', leerLesen: 'Aún no has leído nada.', titel: 'Tu estante', kr: 'Tus estaciones. Toca lo que quieras volver a ver.',
      alles: 'Todo', gespr: 'Conversaciones', kiste: 'Cofre', lek: 'Lecciones', lesen: 'Leer', werke: 'Obras',
      szene: 'Conversación guiada', gespraech: 'Conversación libre', schreiben: 'Escribir', lernroman: 'Novela para aprender',
      wendungen: 'Expresiones', sammlung: 'Recogidas', lektion: 'Lección',
      alleSitzen: 'Todas las palabras ya están', einige: 'Algunas palabras ya están', warten: 'Las palabras esperan el reencuentro',
      deineWerke: 'Tus obras', akro: 'Acrósticos', garten: 'Huerto', naechstes: 'Lo siguiente', nochNicht: 'aún sin practicar',
      leer: 'Aquí se reúne todo lo que practicas. Empieza con la Conversación guiada.',
      kamAus: 'Viene de', gesammelt: 'Lo que recogiste aquí', sitzt: 'ya está', wartet: 'espera el reencuentro',
      nochmal: 'Hablar otra vez', nachlesen: 'Escribir otra vez', weiterlesen: 'Seguir leyendo', ansehen: 'Ver', beginnen: 'Empezar escena',
      oeffnen: 'Abrir lección', anhoeren: '🔊 Escuchar', ueben: '🃏 Practicar en Vocabulario', alleWorte: 'Ver todas las palabras', kapitel: 'Capítulo', zu: 'Cerrar' },
    en: { zurueck: '‹ back to the shelf', leerGespr: 'No conversation practised yet.', leerLek: 'No lessons yet.', leerLesen: 'Nothing read yet.', titel: 'Your shelf', kr: 'Your learning stops. Tap whatever you want to see again.',
      alles: 'All', gespr: 'Conversations', kiste: 'Treasure chest', lek: 'Lessons', lesen: 'Reading', werke: 'Works',
      szene: 'Guided conversation', gespraech: 'Free conversation', schreiben: 'Writing', lernroman: 'Learning Novel',
      wendungen: 'Expressions', sammlung: 'Collected', lektion: 'Lesson',
      alleSitzen: 'All words have stuck', einige: 'Some words have stuck', warten: 'The words are waiting to meet you again',
      deineWerke: 'Your works', akro: 'Acrostics', garten: 'Garden', naechstes: 'Up next', nochNicht: 'not practised yet',
      leer: 'Everything you practise gathers here. Start with the Guided conversation.',
      kamAus: 'Came from', gesammelt: 'What you collected here', sitzt: 'has stuck', wartet: 'waiting to meet you again',
      nochmal: 'Speak again', nachlesen: 'Write again', weiterlesen: 'Read on', ansehen: 'View', beginnen: 'Start scene',
      oeffnen: 'Open lesson', anhoeren: '🔊 Listen', ueben: '🃏 Practise in Vocabulary', alleWorte: 'See all words', kapitel: 'Chapter', zu: 'Close' },
    el: { zurueck: '‹ πίσω στο ράφι', leerGespr: 'Δεν έχεις εξασκηθεί ακόμα σε συζήτηση.', leerLek: 'Δεν υπάρχουν ακόμα μαθήματα.', leerLesen: 'Δεν έχεις διαβάσει ακόμα τίποτα.', titel: 'Το ράφι σου', kr: 'Οι σταθμοί σου. Πάτα ό,τι θέλεις να ξαναδείς.',
      alles: 'Όλα', gespr: 'Συζητήσεις', kiste: 'Θησαυρός', lek: 'Μαθήματα', lesen: 'Ανάγνωση', werke: 'Έργα',
      szene: 'Καθοδηγούμενη συζήτηση', gespraech: 'Ελεύθερη συζήτηση', schreiben: 'Γράψιμο', lernroman: 'Μυθιστόρημα',
      wendungen: 'Εκφράσεις', sammlung: 'Συλλογή', lektion: 'Μάθημα',
      alleSitzen: 'Όλες οι λέξεις έμειναν', einige: 'Κάποιες λέξεις έμειναν ήδη', warten: 'Οι λέξεις περιμένουν να σε ξαναδούν',
      deineWerke: 'Τα έργα σου', akro: 'Ακροστιχίδες', garten: 'Κήπος', naechstes: 'Στη συνέχεια', nochNicht: 'δεν έχει γίνει ακόμα',
      leer: 'Εδώ μαζεύονται όλα όσα εξασκείς. Ξεκίνα με την Καθοδηγούμενη συζήτηση.',
      kamAus: 'Ήρθε από', gesammelt: 'Ό,τι μάζεψες εδώ', sitzt: 'έμεινε', wartet: 'περιμένει να σε ξαναδεί',
      nochmal: 'Μίλα ξανά', nachlesen: 'Γράψε ξανά', weiterlesen: 'Συνέχισε το διάβασμα', ansehen: 'Δες', beginnen: 'Ξεκίνα τη σκηνή',
      oeffnen: 'Άνοιξε το μάθημα', anhoeren: '🔊 Άκου', ueben: '🃏 Εξάσκηση στο Λεξιλόγιο', alleWorte: 'Δες όλες τις λέξεις', kapitel: 'Κεφάλαιο', zu: 'Κλείσιμο' }
  };
  var LOC = { de: 'de-DE', es: 'es-ES', en: 'en-GB', el: 'el-GR' };

  function lies(k, def) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ── CSS einmalig (Tokens aus haus.html: --ink, --ow, Versatz-Schatten, DM Sans 800) ──
  function stil() {
    if (d.getElementById('spk-mosaik-style')) return;
    var s = d.createElement('style'); s.id = 'spk-mosaik-style';
    s.textContent = [
      '.mos{display:flex;flex-direction:column;gap:14px;width:100%;max-width:400px;margin:0 auto;padding:.3rem 0 1.4rem;color:#15163a;font-family:"DM Sans",system-ui,sans-serif}',
      '.mos h2{font:800 1.3rem/1.15 "DM Sans",sans-serif;margin:0;text-align:center}',
      '.mos .mos-kr{font:600 .9rem/1.35 "DM Sans",sans-serif;color:#5f7068;text-align:center;margin:-6px 0 0}',
      '.mos .mos-versp{font:600 .9rem/1.4 "DM Sans",sans-serif;font-style:italic;color:#15163a;text-align:center;margin:0}',
      '.mos-g{display:flex;align-items:center;justify-content:center;line-height:1;font-size:1.85rem}',
      '.mos-g svg{width:1.45em;height:1.27em;display:block}',
      '.mos-th{background:#fff;border:2.5px solid #15163a;border-radius:20px;box-shadow:4px 5px 0 #15163a;overflow:hidden}',
      '.mos-kopf{display:flex;align-items:center;gap:12px;padding:12px 14px;width:100%;border:0;border-bottom:2.5px solid #15163a;text-align:left;font-family:inherit;color:#15163a;cursor:pointer}',
      '.mos-kopf.allein{border-bottom:0}',
      '.mos-kopf.mos-th{border:2.5px solid #15163a}',
      '.mos-zurueck{align-self:center;background:none;border:none;color:#5f7068;font:700 .9rem "DM Sans",sans-serif;cursor:pointer;padding:.4rem .6rem}',
      '.mos-kopf .mos-g{flex:0 0 44px;height:44px;font-size:1.9rem}',
      '.mos-kopf .tx{flex:1;min-width:0}',
      '.mos-kopf b{display:block;font:800 1.08rem/1.2 "DM Sans",sans-serif}',
      '.mos-kopf small{display:block;font:600 .85rem/1.3 "DM Sans",sans-serif;color:rgba(21,22,58,.7)}',
      '.mos-chev{font:800 1.35rem/1 "DM Sans",sans-serif}',
      '.mos-zeile{display:flex;align-items:center;gap:10px;width:100%;background:#fff;border:2px solid #15163a;border-radius:14px;box-shadow:2px 3px 0 #15163a;padding:.55rem .7rem;text-align:left;font:800 .93rem/1.25 "DM Sans",sans-serif;color:#15163a;cursor:pointer}',
      '.mos-zeile .mos-g{flex:0 0 30px;font-size:1.35rem}',
      '.mos-zeile .at{flex:1;min-width:0}',
      '.mos-label{font:800 .72rem/1 "DM Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:#5f7068;margin:4px 0 -4px;text-align:center}',
      '.mos-leiste{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
      '.mos-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3rem;min-height:7.6rem;padding:.7rem .5rem;border:2.5px solid #15163a;border-radius:20px;box-shadow:4px 5px 0 #15163a;cursor:pointer;font-family:inherit;color:#15163a;text-align:center;min-width:0}',
      '.mos-tile b{font:800 .95rem/1.2 "DM Sans",sans-serif;overflow-wrap:anywhere}',
      '.mos-tile small{font:600 .8rem/1.25 "DM Sans",sans-serif;color:rgba(21,22,58,.7);overflow-wrap:anywhere}',
      '.mos-tile.dunkel{background:transparent;border-style:dashed;box-shadow:none}',
      '.mos-tile.dunkel .mos-g{opacity:.45}',
      '.mos-leer{font:600 .95rem/1.4 "DM Sans",sans-serif;color:#5f7068;text-align:center;background:#fff;border:2px dashed #15163a;border-radius:18px;padding:1rem}',
      '.mos-kopf:active,.mos-tile:active,.mos-zeile:active{transform:translate(2px,2px)}',
      '.mos button:focus-visible,.mos-sheet button:focus-visible{outline:3px solid #2bb3d4;outline-offset:2px}',
      '.mos-schleier{position:fixed;inset:0;background:rgba(21,22,58,.35);z-index:200}',
      '.mos-sheet{position:fixed;left:0;right:0;bottom:0;z-index:201;display:flex;justify-content:center;padding:0 12px calc(12px + env(safe-area-inset-bottom))}',
      '.mos-sheet .innen{width:100%;max-width:440px;background:#fff;color:#15163a;border:2.5px solid #15163a;border-radius:22px;box-shadow:5px 6px 0 #15163a;padding:16px;display:flex;flex-direction:column;gap:10px;font-family:"DM Sans",sans-serif;animation:mosHoch .2s ease-out;max-height:80vh;overflow-y:auto}',
      '@keyframes mosHoch{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}',
      '.mos-sheet .oben{display:flex;align-items:center;gap:12px}',
      '.mos-sheet .oben .mos-g{flex:0 0 52px;height:52px;font-size:2rem;border:2px solid #15163a;border-radius:14px}',
      '.mos-sheet .typ{font:800 .72rem/1.25 "DM Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#5f7068}',
      '.mos-sheet h3{margin:.15rem 0 0;font:800 1.35rem/1.15 "DM Sans",sans-serif}',
      '.mos-sheet .tr{font:600 1rem/1.35 "DM Sans",sans-serif;color:#5f7068;margin:0}',
      '.mos-sheet .bl{font:700 .85rem "DM Sans",sans-serif;color:#5f7068}',
      '.mos-btns{display:flex;flex-direction:column;gap:8px}',
      '.mos-btn{font:800 1rem/1 "DM Sans",sans-serif;color:#15163a;background:#fff;border:2.5px solid #15163a;border-radius:14px;box-shadow:3px 3px 0 #15163a;padding:.85rem;cursor:pointer}',
      '.mos-btn.haupt{background:#ffd24a}',
      '.mos-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #15163a}',
      '@media (prefers-reduced-motion:reduce){.mos-sheet .innen{animation:none}}'
    ].join('\n');
    (d.head || d.documentElement).appendChild(s);
  }

  // ── Daten sammeln ───────────────────────────────────────────────
  function sammle(L, ml) {
    var u = lies('spikiu_user', {}) || {};
    var P = u.profile || {};
    var ziel = P.zielsprache || 'es';
    var szenen = w.spikiuSzenen || [];
    function szeneLabel(id) { var s = szenen.filter(function (x) { return x.id === id; })[0]; return s ? (s[ml] || s.de) : ''; }
    function szeneAusThema(t) {
      if (!t) return '';
      var n = String(t).trim().toLowerCase();
      var s = szenen.filter(function (x) { return ['de', 'es', 'en', 'el'].some(function (k) { return x[k] && x[k].toLowerCase() === n; }); })[0];
      return s ? s.id : '';
    }
    var map = {}, liste = [], lektionen = [];
    function station(key, art, titel, t) {
      var s = map[key];
      if (!s) { s = map[key] = { key: key, art: art, titel: titel, t: t || 0, worte: [], wk: {}, lektion: null }; liste.push(s); }
      if ((t || 0) > s.t) s.t = t;
      return s;
    }
    function wort(s, z, tr) {
      z = String(z || '').trim(); if (!z) return;
      var k = z.toLowerCase(); if (s.wk[k]) return;
      s.wk[k] = 1; s.worte.push({ z: z, tr: tr || '' });
    }

    // 1) Lektionen (Geführtes Gespräch, Freies Gespräch, Schreiben) — tragen ihre Wörter
    (Array.isArray(u.lessons) ? u.lessons : []).forEach(function (l) {
      if (!l || (l.zielsprache && l.zielsprache !== ziel)) return;
      var t = Date.parse(l.createdAt || '') || 0;
      var szId = l.szene || (l.raum ? '' : szeneAusThema(l.thema));
      var art = l.raum || (szId ? 'szene' : (l.fromConversation ? 'gespraech' : 'szene'));
      var key = szId ? 's:' + szId : 'l:' + l.id;
      var s = station(key, art, l.thema || (szId && szeneLabel(szId)) || l.topic || L.lektion, t);
      if (szId) s.szene = szId;
      if (!s.lektion || t >= s.lektion.t) s.lektion = { id: l.id, titel: l.topic || l.thema || L.lektion, t: t };
      lektionen.push({ id: l.id, titel: l.topic || l.thema || L.lektion, t: t, art: art });
      var voc = (l.lesson && Array.isArray(l.lesson.vocab)) ? l.lesson.vocab : [];
      voc.forEach(function (v) { if (v) wort(s, v.word || v.z, v.translation || v.tr); });
    });

    // 2) geübte Szenen ohne (noch gespeicherte) Lektion
    var sz = u.szenen || {};
    Object.keys(sz).forEach(function (id) {
      var e = sz[id]; if (!e || !e.done) return;
      var s = station('s:' + id, 'szene', szeneLabel(id) || id, e.last || 0);
      s.szene = id;
    });

    // 3) Schatzkiste — nach Herkunft
    var QUELLE = { learnroman: 'lesen', ausdruck: 'wendungen', schreibwerkstatt: 'schreiben' };
    var TITEL = { lesen: L.lernroman, wendungen: L.wendungen, schreiben: L.schreiben, sammlung: L.sammlung };
    var buch = lies('spikiu_buch', []); if (!Array.isArray(buch)) buch = [];
    buch.forEach(function (e) {
      if (!e) return;
      var art = QUELLE[e.quelle] || 'sammlung';
      var s = station('b:' + art, art, TITEL[art], e.t || 0);
      wort(s, e.roh || e.wort, e.tr);
    });

    // 4) Lernroman: zuletzt gelesen
    var zl = lies('spikiu_learnroman_zuletzt', null);
    if (zl && zl.buch) {
      var s4 = station('b:lesen', 'lesen', L.lernroman, map['b:lesen'] ? map['b:lesen'].t : 0);
      s4.kapitel = (zl.i | 0) + 1;
    }

    liste.sort(function (a, b) { return b.t - a.t; });

    // Werke
    var werke = [];
    var acro = (lies('spikiu_acrosticos', {}) || {})[ziel];
    if (Array.isArray(acro) && acro.length) { var la = acro[acro.length - 1] || {}; werke.push({ art: 'akro', titel: L.akro, sub: la.wort || '', go: 'spiele.html?spiel=acrostico' }); }
    var hu = (lies('spikiu_huerto', {}) || {})[ziel];
    if (hu && Object.keys(hu).length) werke.push({ art: 'garten', titel: L.garten, sub: '', go: 'spiele.html?spiel=huerto' });

    // Als Nächstes: noch nicht geübte Szenen (Reihenfolge wie die Palette)
    var naechste = [];
    var pal = (typeof w.spikiuSzenenPalette === 'function') ? w.spikiuSzenenPalette() : szenen;
    pal.forEach(function (x) { if (naechste.length < 2 && !(sz[x.id] && sz[x.id].done)) naechste.push({ id: x.id, titel: x[ml] || x.de }); });

    var versp = '';
    try { var v = u.roadmap && u.roadmap.page1 && (u.roadmap.page1.versprechen || u.roadmap.page1.ziel); versp = typeof v === 'string' ? v : (v && (v.text || v.satz)) || ''; } catch (e) {}

    lektionen.sort(function (a, b) { return b.t - a.t; });
    return { ziel: ziel, lektionen: lektionen, stationen: liste, werke: werke, naechste: naechste, versprechen: versp };
  }

  function sitzt(ziel, z) { try { return !!(w.SpikiuWoerter && w.SpikiuWoerter.gesetzt(ziel, z)); } catch (e) { return false; } }

  // ── Rendern ─────────────────────────────────────────────────────
  w.spikiuMosaikText = function (ml) { return TX[ml] || TX.de; };
  w.spikiuMosaik = function (el, opt) {
    opt = opt || {};
    var ml = TX[opt.sprache] ? opt.sprache : 'de';
    var L = TX[ml];
    stil();
    var D = sammle(L, ml);
    var fmt = function (t) { try { return new Date(t).toLocaleDateString(LOC[ml], { day: 'numeric', month: 'short' }); } catch (e) { return ''; } };
    var fmtLang = function (t) { try { return new Date(t).toLocaleDateString(LOC[ml], { weekday: 'long', day: 'numeric', month: 'long' }); } catch (e) { return ''; } };
    function g(art) { var r = RAUM[art]; return '<span class="mos-g" aria-hidden="true">' + (r ? r.em : '') + '</span>'; }
    function artName(s) { return { szene: L.szene, gespraech: L.gespraech, schreiben: L.schreiben, lesen: L.lernroman, wendungen: L.wendungen, sammlung: L.kiste }[s.art] || ''; }
    function ziel(s) {
      if (s.szene) return { t: L.nochmal, go: 'gefuehrt.html?thema=' + encodeURIComponent(s.szene) };
      if (s.art === 'gespraech') return { t: L.nochmal, go: 'szene.html' };
      if (s.art === 'schreiben') return { t: L.nachlesen, go: 'schreibwerkstatt.html' };
      if (s.art === 'lesen') return { t: L.weiterlesen, go: 'learnroman.html' };
      if (s.art === 'wendungen') return { t: L.ansehen, go: 'wortschatz.html' };
      return null;
    }
    /* Leo, 22.10. 16:31: „die Themen als erste Karte in Form von Kacheln … der User klickt auf
       z. B. Gespräche, dann bekommt er die Liste." Die Kacheln baut haus.html mit kacheln();
       hier entsteht nur die Liste hinter einer Kachel. */
    var KAT = {
      gespr: { titel: L.gespr, art: 'szene', leer: L.leerGespr },
      lek:   { titel: L.lek,   art: 'lektion', leer: L.leerLek },
      lesen: { titel: L.lesen, art: 'lesen', leer: L.leerLesen }
    };
    function zeile(art, titel, sub, onclick) {
      var k = d.createElement('button'); k.type = 'button'; k.className = 'mos-kopf allein mos-th'; k.style.background = RAUM[art].bg;
      k.innerHTML = g(art) + '<span class="tx"><b>' + esc(titel) + '</b><small>' + esc(sub) + '</small></span><span class="mos-chev">›</span>';
      k.onclick = onclick; return k;
    }
    function zeichne() {
      var kat = KAT[opt.kategorie] || KAT.gespr, id = KAT[opt.kategorie] ? opt.kategorie : 'gespr';
      el.innerHTML = '';
      var m = d.createElement('div'); m.className = 'mos';
      m.innerHTML = '<h2>' + esc(kat.titel) + '</h2>';
      var n = 0;
      if (id === 'lek') {
        D.lektionen.forEach(function (lk) { n++;
          m.appendChild(zeile('lektion', lk.titel, [artName({ art: lk.art }), fmt(lk.t)].filter(Boolean).join(' · '), function () { location.href = 'lektionen.html#lektion-' + encodeURIComponent(lk.id); }));
        });
      } else {
        D.stationen.forEach(function (s) {
          var ok = id === 'gespr' ? (s.art === 'szene' || s.art === 'gespraech') : s.art === 'lesen';
          if (!ok) return; n++;
          var an = artName(s); if (an === s.titel) an = '';
          var sub = [an, s.t ? fmt(s.t) : '', s.kapitel ? L.kapitel + ' ' + s.kapitel : ''].filter(Boolean).join(' · ');
          m.appendChild(zeile(s.art, s.titel, sub, function () { oeffneStation(s); }));
        });
      }
      if (!n) { var le = d.createElement('div'); le.className = 'mos-leer'; le.textContent = kat.leer; m.appendChild(le); }
      if (id === 'gespr' && D.naechste.length) {
        var ln = d.createElement('div'); ln.className = 'mos-label'; ln.textContent = L.naechstes; m.appendChild(ln);
        var lz = d.createElement('div'); lz.className = 'mos-leiste';
        D.naechste.forEach(function (x) {
          var b = d.createElement('button'); b.type = 'button'; b.className = 'mos-tile dunkel';
          b.innerHTML = g('szene') + '<b>' + esc(x.titel) + '</b><small>' + esc(L.nochNicht) + '</small>';
          b.onclick = function () { location.href = 'gefuehrt.html?thema=' + encodeURIComponent(x.id); };
          lz.appendChild(b);
        });
        m.appendChild(lz);
      }
      if (typeof opt.zurueck === 'function') {
        var zb = d.createElement('button'); zb.type = 'button'; zb.className = 'mos-zurueck'; zb.textContent = L.zurueck; zb.onclick = opt.zurueck;
        m.appendChild(zb);
      }
      el.appendChild(m);
    }

    // ── Karte (eine für alles) ──
    function zu() { d.querySelectorAll('.mos-schleier,.mos-sheet').forEach(function (e) { e.remove(); }); }
    function karte(art, typ, titel, tr, inhalt, knoepfe, langZiel) {
      zu();
      var sl = d.createElement('div'); sl.className = 'mos-schleier'; sl.onclick = zu;
      var sh = d.createElement('div'); sh.className = 'mos-sheet'; sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-modal', 'true');
      var c = d.createElement('div'); c.className = 'innen';
      c.innerHTML = '<div class="oben">' + g(art) + '<div><div class="typ">' + esc(typ) + '</div><h3' + (langZiel ? ' lang="' + esc(D.ziel) + '"' : '') + '>' + esc(titel) + '</h3></div></div>' + (tr ? '<p class="tr">' + esc(tr) + '</p>' : '');
      c.querySelector('.oben .mos-g').style.background = RAUM[art].bg;
      if (inhalt) c.appendChild(inhalt);
      var bt = d.createElement('div'); bt.className = 'mos-btns';
      knoepfe.forEach(function (k) { var b = d.createElement('button'); b.type = 'button'; b.className = 'mos-btn' + (k.haupt ? ' haupt' : ''); b.textContent = k.t; b.onclick = k.f; bt.appendChild(b); });
      c.appendChild(bt); sh.appendChild(c);
      d.body.appendChild(sl); d.body.appendChild(sh);
      var f = sh.querySelector('.mos-btn'); if (f) f.focus();
    }
    function knoepfeStation(s) {
      var kn = [], z = ziel(s);
      if (z) kn.push({ t: z.t, haupt: true, f: function () { location.href = z.go; } });
      if (s.lektion) kn.push({ t: L.oeffnen, haupt: !z, f: function () { location.href = 'lektionen.html#lektion-' + encodeURIComponent(s.lektion.id); } });
      if (s.art === 'sammlung' && typeof opt.buch === 'function') kn.push({ t: L.alleWorte, haupt: true, f: function () { zu(); opt.buch(); } });
      return kn;
    }
    function oeffneStation(s) {
      var kn = knoepfeStation(s);
      if (kn.length === 1) { kn[0].f(); return; }   /* nur ein Weg → direkt hin */
      karteStation(s);
    }
    function karteStation(s) {
      var kn = knoepfeStation(s);
      kn.push({ t: L.zu, f: zu });
      karte(s.art, [artName(s), s.t ? fmtLang(s.t) : ''].filter(Boolean).join(' · '), s.titel, '', null, kn, false);
    }
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') zu(); });

    zeichne();
  };
})(window, document);
