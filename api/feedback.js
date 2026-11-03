// ── SPIKIU · TESTER-FEEDBACK → GITHUB-ISSUES (orbiaceo/spikiu) ──────
// Nur Verdrahtung. Die Logik ist app-neutral in ./_feedback/ und stammt
// 1:1 aus orbiaceo/iuspik (docs/FEEDBACK_WIDGET.md). Stil wie die anderen
// Endpoints: `export default`, KEIN import.meta.
//
// Umgebungsvariablen (Vercel → Settings → Environment Variables,
// Production + Preview):
//   GITHUB_FEEDBACK_TOKEN  fein granulierter Token, NUR dieses Repo:
//                          Issues + Contents (Lesen/Schreiben)
//   FEEDBACK_TESTER_KEY    geheimer Tester-Schlüssel. spikiu.com ist
//                          öffentlich → ohne Schlüssel kein Fenster, 401.
// Fehlt eine Variable, antwortet die Funktion 503 (nichts kaputt).
import { createFeedbackHandler } from './_feedback/handler.js';

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

export default createFeedbackHandler({
  app: 'spikiu',
  repo: process.env.FEEDBACK_REPO || 'orbiaceo/spikiu',
  token: process.env.GITHUB_FEEDBACK_TOKEN,
  testerKey: process.env.FEEDBACK_TESTER_KEY,
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
