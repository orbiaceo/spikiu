// ── TEST · LEKTOR-PARSER ───────────────────────────────────────────
// Prüft den toleranten [LEKTOR]-Parser aus api/lektor.js.
//
// Lauf:  node --test api/
//   (oder gezielt:  node --test api/lektor.parser.test.mjs)
//
// KEIN package.json, KEINE Abhängigkeiten — nur der eingebaute node:test-
// Runner. Wir lassen lektor.js UNANGETASTET: die Quelle wird gelesen, die
// fs/path-Imports (vom Parser nicht gebraucht) entfernt, die reinen Funktionen
// freigelegt und als data:-Modul importiert. Getestet wird damit exakt der
// Code, der in Produktion läuft.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
let src = readFileSync(join(here, 'lektor.js'), 'utf8');
src = src.replace(/^\s*import\s+\{[^}]*\}\s+from\s+'(fs|path)';\s*$/gm, '');
src += '\nexport { parseLektor, normalize };\n';
const { parseLektor, normalize } = await import(
  'data:text/javascript,' + encodeURIComponent(src)
);

// Das volle, normalisierte Gerüst — Bezugspunkt für die Erwartungen.
const leer = { sinn: '', zitat: '', sache: '', form: null, lautschrift: null, status: 'lesen' };

test('sauberes JSON im [LEKTOR]-Block wird vollständig gelesen', () => {
  const text = `[LEKTOR]
{"sinn":"Sinn zuerst","zitat":"der Satz","sache":"die eine Sache","form":null,"lautschrift":null,"status":"lesen"}
[/LEKTOR]`;
  assert.deepEqual(parseLektor(text), {
    ...leer,
    sinn: 'Sinn zuerst',
    zitat: 'der Satz',
    sache: 'die eine Sache'
  });
});

test('Geschwätz vor und nach dem Block wird ignoriert', () => {
  const text = `Hier ist meine Antwort, bitte:
[LEKTOR]
{"sinn":"ok","zitat":"","sache":"","form":null,"lautschrift":null,"status":"treffer"}
[/LEKTOR]
Soll ich noch etwas tun?`;
  assert.deepEqual(parseLektor(text), { ...leer, sinn: 'ok', status: 'treffer' });
});

test('blanke JSON ohne [LEKTOR]-Hülle wird trotzdem gelesen', () => {
  const text = `{"sinn":"nackt","zitat":"","sache":"","form":null,"lautschrift":null,"status":"beinah"}`;
  assert.deepEqual(parseLektor(text), { ...leer, sinn: 'nackt', status: 'beinah' });
});

// Der Klassiker aus dem Post-Mortem (Punkt 6): ein gerades " mitten im Wert
// zerbricht JSON.parse. Der tolerante Pfad muss die Felder dennoch bergen —
// und das innere " als Text überleben lassen.
test('gerade Anführungszeichen im Wert: toleranter Pfad rettet die Felder', () => {
  const text = `[LEKTOR]
{"sinn":"Sag mal "hallo" zu ihr","zitat":"hallo","sache":"Begrüßung","form":null,"lautschrift":null,"status":"lesen"}
[/LEKTOR]`;
  assert.throws(() => JSON.parse(text.match(/\{[\s\S]*\}/)[0]), 'Vorbedingung: striktes JSON.parse muss hier scheitern');
  assert.deepEqual(parseLektor(text), {
    ...leer,
    sinn: 'Sag mal "hallo" zu ihr',
    zitat: 'hallo',
    sache: 'Begrüßung'
  });
});

test('form als String bleibt erhalten, lautschrift als String ebenso', () => {
  const text = `[LEKTOR]
{"sinn":"so","zitat":"falsch","sache":"Endung","form":"richtig","lautschrift":"rí-tig","status":"stuck"}
[/LEKTOR]`;
  assert.deepEqual(parseLektor(text), {
    sinn: 'so', zitat: 'falsch', sache: 'Endung',
    form: 'richtig', lautschrift: 'rí-tig', status: 'stuck'
  });
});

test('unbekannter Status fällt auf "lesen" zurück', () => {
  const text = `[LEKTOR]{"sinn":"x","zitat":"","sache":"","form":null,"lautschrift":null,"status":"erfunden"}[/LEKTOR]`;
  assert.equal(parseLektor(text).status, 'lesen');
});

test('Text ohne geschweifte Klammern ergibt null', () => {
  assert.equal(parseLektor('nur prosa, kein json'), null);
  assert.equal(parseLektor('[LEKTOR]gar nichts brauchbares[/LEKTOR]'), null);
});

test('alle fünf gültigen Status-Werte überleben', () => {
  for (const s of ['lesen', 'beinah', 'treffer', 'stuck', 'ziellinie']) {
    const text = `[LEKTOR]{"sinn":"a","zitat":"","sache":"","form":null,"lautschrift":null,"status":"${s}"}[/LEKTOR]`;
    assert.equal(parseLektor(text).status, s, `Status ${s}`);
  }
});

test('normalize: fehlende Felder werden zu Defaults, falsche Typen geglättet', () => {
  assert.deepEqual(normalize({}), leer);
  assert.deepEqual(normalize(null), leer);
  // form/lautschrift als Nicht-String/Nicht-null → null; status unbekannt → lesen
  assert.deepEqual(
    normalize({ sinn: 'a', zitat: 7, sache: 'b', form: 42, lautschrift: {}, status: 'xx' }),
    { sinn: 'a', zitat: '', sache: 'b', form: null, lautschrift: null, status: 'lesen' }
  );
});
