# Werkzeug: Landkarten für „Regionalismen"

Erzeugt `regional-karten.js` im Root (die echten Karten im ersten Schritt von `regional.html`).

## Neu erzeugen

```bash
mkdir -p /tmp/ne && cd /tmp/ne
B=https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson
curl -sSfLO $B/ne_50m_admin_0_map_units.geojson && mv ne_50m_admin_0_map_units.geojson mu50.geojson
curl -sSfLO $B/ne_10m_admin_0_countries.geojson && mv ne_10m_admin_0_countries.geojson c10.geojson
curl -sSfLO $B/ne_10m_admin_1_states_provinces.geojson && mv ne_10m_admin_1_states_provinces.geojson a1.geojson
npm i d3-geo mapshaper
cp ~/projects/spikiu/werkzeuge/regional-karten/baue-karten.mjs .
NE_DIR=/tmp/ne AUSGABE=~/projects/spikiu/regional-karten.js node baue-karten.mjs
```

## Was wohin gehört

- **Spanisch:** Mexiko · Karibik (Kuba, Dominikanische Republik, Puerto Rico, Venezuela) · Anden (Kolumbien, Ecuador, Peru, Bolivien) · Río de la Plata (Argentinien, Uruguay) · Chile · Spanien als Ausschnitt (ohne Kanaren).
- **Deutsch:** Norden (Schleswig-Holstein, Hamburg, Bremen, Niedersachsen, Mecklenburg-Vorpommern) · Berlin & Brandenburg · Rheinland & Ruhr (NRW) · Bayern · Österreich · Schweiz.
- **Englisch:** Weltkarte mit USA, Indien, Australien. Darunter die Britischen Inseln als Ausschnitt mit England, Schottland und Irland (Republik). Wales und Nordirland sind grau.
- **Griechisch:** Thessaloniki (Zentral- + Ostmakedonien/Thrakien) · Athen (Attika) · Ionische Inseln · Kykladen (Südliche Ägäis westlich 26,2° O, ohne Dodekanes) · Kreta · Zypern als Ausschnitt, als ganze Insel ohne Grenzlinie.

Die Zuordnung und die Versätze der Namensschilder (`SCHILD`) stehen am Ende des Skripts.
