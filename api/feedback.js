// ── SPIKIU · TESTER-FEEDBACK → GITHUB-ISSUES (orbiaceo/spikiu) ──────
// Nur Verdrahtung. Die Logik ist app-neutral in ./_feedback/ und stammt
// 1:1 aus orbiaceo/iuspik (docs/FEEDBACK_WIDGET.md). Stil wie die anderen
// Endpoints: `export default`, KEIN import.meta.
//
// Umgebungsvariablen (Vercel → Settings → Environment Variables,
// Production + Preview):
//   GITHUB_FEEDBACK_TOKEN  fein granulierter Token, NUR dieses Repo:
//                          Issues + Contents (Lesen/Schreiben)
//   (nur diese EINE Variable; Leo, 07.11.2026: „so einfach wie iuspik“)
// Tester-Schlüssel: Der dev-Deploy ist die öffentliche Beta (Tester wie Rolf),
// darum NICHT schlüssellos wie iuspik. Im Code steht nur der SHA-256 des
// Schlüssels, nie der Schlüssel selbst. Optional überschreibt die Env
// FEEDBACK_TESTER_KEY ihn. Fehlt der Token, antwortet die Funktion 503.
import { createHash } from 'node:crypto';
import { createFeedbackHandler } from './_feedback/handler.js';

const TESTER_KEY_SHA256 = '1911550e4e615e7687c8f887d120f236c6a3d2a03569251645b968f5c42fa7ac';
const sha256 = (s) => createHash('sha256').update(String(s)).digest('hex');

// ids == feedback-spikiu.js
export const CATEGORIES = [
  { id: 'semantik', label: 'Semantik' },
  { id: 'didaktik', label: 'Didaktik' },
  { id: 'grammatik', label: 'Grammatik' },
  { id: 'rechtschreibung', label: 'Rechtschreibung' },
  { id: 'uebersetzung', label: 'Übersetzung' },
  { id: 'audio', label: 'Audio/Aussprache' },
  { id: 'ux', label: 'UX-Design' },
  { id: 'technik', label: 'Technik/Fehler' },
  { id: 'idee', label: 'Idee', laterOnly: true },
];

function handlerFor(testerKey) {
  return createFeedbackHandler({
  app: 'spikiu',
  repo: process.env.FEEDBACK_REPO || 'orbiaceo/spikiu',
  token: process.env.GITHUB_FEEDBACK_TOKEN,
  testerKey,
  categories: CATEGORIES,
  mediaBranch: 'feedback-media',
  labels: { base: 'feedback', fix: 'sofort', later: 'später' },
  deploy: {
    sha: process.env.VERCEL_GIT_COMMIT_SHA,
    ref: process.env.VERCEL_GIT_COMMIT_REF,
    env: process.env.VERCEL_ENV,
    url: process.env.VERCEL_URL,
  },
  });
}

const envHandler = process.env.FEEDBACK_TESTER_KEY ? handlerFor(process.env.FEEDBACK_TESTER_KEY) : null;
const NEIN = '\u0000kein-schluessel\u0000';

export default async function handler(req, res) {
  if (envHandler) return envHandler(req, res);
  // Schlüssel aus Header (GET-Prüfung) oder Body (Meldung) gegen den Hash prüfen
  const raw = req.headers['x-feedback-key'];
  let key = Array.isArray(raw) ? raw[0] : raw;
  if (!key && req.body && typeof req.body === 'object') key = req.body.key || req.body.testerKey;
  const ok = typeof key === 'string' && key !== '' && sha256(key) === TESTER_KEY_SHA256;
  return handlerFor(ok ? key : NEIN)(req, res);
}
