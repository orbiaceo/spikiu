/* ═══════════════════════════════════════════════════════════════════
   szenen.js — Themen/Szenen fürs GEFÜHRTE Gespräch. 0 Token.
   Jede Szene ist ein FSRS-Item (Etappe 2 rechnet Stabilität/Fälligkeit).
   Reihenfolge/Palette: 3 neue + 2 fällige. Erweiterbar. Eigennamen-frei.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  window.spikiuSzenen = [
    { id:'cafe',            emoji:'☕',  cefr:'a1', de:'Im Café',             es:'En el café',          en:'At the café' },
    { id:'restaurant',      emoji:'🍽️', cefr:'a1', de:'Im Restaurant',       es:'En el restaurante',   en:'At the restaurant' },
    { id:'taxi',            emoji:'🚕', cefr:'a1', de:'Im Taxi',             es:'En el taxi',          en:'In the taxi' },
    { id:'hotel',           emoji:'🏨', cefr:'a2', de:'Im Hotel',            es:'En el hotel',         en:'At the hotel' },
    { id:'einkaufen',       emoji:'🛒', cefr:'a1', de:'Einkaufen',           es:'De compras',          en:'Shopping' },
    { id:'wegbeschreibung', emoji:'🧭', cefr:'a1', de:'Nach dem Weg fragen',  es:'Preguntar el camino', en:'Asking directions' },
    { id:'arzt',            emoji:'🩺', cefr:'a2', de:'Beim Arzt',           es:'En el médico',        en:'At the doctor' },
    { id:'bahnhof',         emoji:'🚉', cefr:'a2', de:'Am Bahnhof',          es:'En la estación',      en:'At the station' },
    { id:'wetter',          emoji:'🌤️', cefr:'a2', de:'Über das Wetter',     es:'Sobre el tiempo',     en:'About the weather' },
    { id:'familie',         emoji:'👪', cefr:'a1', de:'Über die Familie',    es:'Sobre la familia',    en:'About family' }
  ];
  /* Palette: 3 neue + 2 fällige. Platzhalter-Logik bis der FSRS-Scheduler
     (Etappe 2) kommt: erledigte = fällig (älteste zuerst), Rest = neu. */
  window.spikiuSzenenPalette = function(){
    var done = {};
    try{ done = (JSON.parse(localStorage.getItem('spikiu_user')||'{}').szenen) || {}; }catch(e){}
    var neu = [], faellig = [];
    (window.spikiuSzenen||[]).forEach(function(s){
      if (done[s.id] && done[s.id].done) faellig.push(s); else neu.push(s);
    });
    faellig.sort(function(a,b){ return ((done[a.id]&&done[a.id].last)||0) - ((done[b.id]&&done[b.id].last)||0); });
    return neu.slice(0,3).concat(faellig.slice(0,2));
  };
})();
