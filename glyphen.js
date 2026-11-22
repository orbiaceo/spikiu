/* glyphen.js — Spikius Linien-Zeichen (Pastell Minze, Leo 22.11.2026). Eigene Zeichnungen, 24er Raster.
   window.spikiuGlyph.linie(name, farbe) → <svg class="ic"> in Strichstärke 1.8.
   Genutzt von haus.html (Mein Kurs · Räume · Regal) und kursknopf.js. */
(function(){
var GLYPH={
 woerter:'<rect x="3" y="6" width="12" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/>',
 hoeren:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/>',
 gefuehrt:'<path d="M3 4h12v9H8l-4 3v-3H3z"/><path d="M15 8h6v9h-1v3l-4-3h-5v-4"/>',
 selbst:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 21c1-4 3.6-6 6.5-6s5.5 2 6.5 6"/><path d="M17 6c1.4 1.2 1.4 3.8 0 5M19.8 4c2.8 2.6 2.8 6.4 0 9"/>',
 aussprache:'<path d="M2 12h3l2-6 3 12 3-9 2 6 2-3h5"/>',
 grammatik:'<path d="M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3z"/><path d="M5 18a3 3 0 0 1 3-3h11M9 7h6M9 10h4"/>',
 lesen:'<path d="M2 5c3-1 6-1 10 1v14c-4-2-7-2-10-1z"/><path d="M22 5c-3-1-6-1-10 1v14c4-2 7-2 10-1z"/>',
 spiel:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5l-5.3 2.9 1.2-6-4.5-4.1 6-.7z"/>',
 blase:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',
 stift:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
 cafe:'<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3"/>',
 restaurant:'<path d="M5 3v5a2 2 0 0 0 4 0V3M7 10v11"/><path d="M17 3c-2.2 2-2.2 6 0 8v10"/>',
 einkaufen:'<path d="M3 9h18l-2 11H5z"/><path d="M8 9l4-6 4 6M9 13v4M15 13v4"/>',
 weg:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
 taxi:'<path d="M3 16v-4l2-5h14l2 5v4z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M10 4h4"/>',
 familie:'<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-4 3-6 6-6s6 2 6 6M14 20c0-3 1.5-5 3-5s4 2 4 5"/>',
 hotel:'<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-8v5"/><circle cx="6.5" cy="11" r="1.5"/>',
 bahnhof:'<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8 21l2-4M16 21l-2-4"/>',
 arzt:'<path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z"/>',
 wetter:'<circle cx="9" cy="9" r="3.5"/><path d="M9 2v1.5M2 9h1.5M4 4l1 1M14 4l-1 1"/><path d="M8 20h10a3 3 0 0 0 0-6 5 5 0 0 0-9 1 3 3 0 0 0-1 5z"/>'
 ,kurs:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>'
 ,tuer:'<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="14.5" cy="12" r=".9"/>'
 ,regal:'<path d="M3 20h18M3 4v16M21 4v16"/><rect x="6" y="9" width="3" height="11"/><rect x="10" y="7" width="3" height="13"/><path d="M15 20l2-12 3 .6-2 11.4"/>'
 ,mein:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'
 ,garten:'<path d="M12 21v-8"/><path d="M12 13c-4 0-6-3-6-6 3 0 6 2 6 6z"/><path d="M12 15c3 0 5-2 5-5-3 0-5 2-5 5z"/><path d="M6 21h12"/>'
 ,akro:'<path d="M4 5h3M4 12h3M4 19h3"/><path d="M10 5h10M10 12h7M10 19h9"/>'
};
function linie(n,farbe){return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="'+(farbe||'currentColor')+'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(GLYPH[n]||GLYPH.spiel)+'</svg>';}
window.spikiuGlyph={GLYPH:GLYPH,linie:linie};
})();
