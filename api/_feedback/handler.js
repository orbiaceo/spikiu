// @ts-check
/**
 * Serverless side of the tester feedback window (client: src/web/feedback/).
 * App-agnostic: each app wires it up in its own `api/feedback.js` with its
 * repository, categories and labels. Interface: docs/FEEDBACK_WIDGET.md.
 *
 *   GET  (header x-feedback-key)  → 204 if the tester key is valid, 401 if not
 *   POST (same header, JSON body feedback.v1) → 201 { number, url, warnings }
 *
 * The GitHub token only ever lives here (environment variable), never in the
 * browser. Screenshots go to an orphan branch (default "feedback-media")
 * under feedback/<issue number>/, so they never touch `dev` or `main`.
 */
import { createHash, timingSafeEqual } from "node:crypto";
import { createGitHub } from "./github.js";

/**
 * @typedef {object} HandlerOptions
 * @property {string} repo                      "owner/name"
 * @property {string | undefined} token         GitHub token (env)
 * @property {string | undefined} [testerKey]   shared tester key (env); required unless keyless
 * @property {boolean} [keyless]                true: no tester key; only for deployments that are
 *                                              already private (e.g. Vercel Authentication)
 * @property {ReadonlyArray<{ id: string, label: string, laterOnly?: boolean }>} categories  laterOnly: always "später"
 * @property {string} [app]                     expected app name in the payload
 * @property {string} [mediaBranch]             default "feedback-media"
 * @property {string} [mediaDir]                default "feedback"
 * @property {{ base: string, fix: string, later: string }} [labels]
 * @property {{ sha?: string | undefined, ref?: string | undefined, env?: string | undefined, url?: string | undefined }} [deploy]
 * @property {typeof fetch} [fetch]
 */

/**
 * @typedef {object} Image
 * @property {string} name
 * @property {string} dataUrl
 * @property {number} [width]
 * @property {number} [height]
 */

/**
 * @typedef {object} Payload
 * @property {"feedback.v1"} schema
 * @property {string} app
 * @property {string} category
 * @property {"fix" | "later"} mode
 * @property {string} text
 * @property {Image[]} images
 * @property {Record<string, any>} context
 */

export const LIMITS = {
  text: 5000,
  images: 4,
  imageBytes: 1_500_000,
  contextChars: 60_000,
};

const DEFAULT_LABELS = { base: "feedback", fix: "sofort", later: "später" };
const DATA_URL = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/;

/** @param {string} a @param {string} b */
export function sameKey(a, b) {
  const x = createHash("sha256").update(a).digest();
  const y = createHash("sha256").update(b).digest();
  return timingSafeEqual(x, y);
}

/** @param {string} base64 */
function decodedBytes(base64) {
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}

/**
 * Checks a report. Returns the payload or a list of problems.
 * @param {unknown} body
 * @param {HandlerOptions["categories"]} categories
 * @param {string} [app]
 * @returns {{ ok: true, payload: Payload } | { ok: false, errors: string[] }}
 */
export function validatePayload(body, categories, app) {
  /** @type {string[]} */
  const errors = [];
  if (body === null || typeof body !== "object" || Array.isArray(body)) return { ok: false, errors: ["body must be a JSON object"] };
  const b = /** @type {Record<string, unknown>} */ (body);
  if (b.schema !== "feedback.v1") errors.push("schema must be feedback.v1");
  if (app !== undefined && b.app !== app) errors.push(`app must be ${app}`);
  if (typeof b.category !== "string" || !categories.some((c) => c.id === b.category)) errors.push("unknown category");
  if (b.mode !== "fix" && b.mode !== "later") errors.push("mode must be fix or later");
  if (typeof b.text !== "string" || b.text.length > LIMITS.text) errors.push(`text must be a string of at most ${LIMITS.text} characters`);
  const images = Array.isArray(b.images) ? b.images : [];
  if (!Array.isArray(b.images)) errors.push("images must be an array");
  if (images.length > LIMITS.images) errors.push(`at most ${LIMITS.images} images`);
  images.forEach((image, i) => {
    const dataUrl = image && typeof image === "object" ? /** @type {Record<string, unknown>} */ (image).dataUrl : undefined;
    const match = typeof dataUrl === "string" ? DATA_URL.exec(dataUrl) : null;
    if (!match) errors.push(`image ${i + 1}: not a base64 JPEG/PNG/WebP data URL`);
    else if (decodedBytes(/** @type {string} */ (match[2])) > LIMITS.imageBytes) errors.push(`image ${i + 1}: larger than ${LIMITS.imageBytes} bytes`);
  });
  if (b.context === null || typeof b.context !== "object" || Array.isArray(b.context)) errors.push("context must be an object");
  else if (JSON.stringify(b.context).length > LIMITS.contextChars) errors.push("context too large");
  if (typeof b.text === "string" && b.text.trim() === "" && images.length === 0) errors.push("text or an image is required");
  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, payload: /** @type {Payload} */ (b) };
}

/** @param {unknown} v */
const str = (v) => (typeof v === "string" || typeof v === "number" ? String(v) : "");
/** Inline code that cannot break out of its backticks. @param {unknown} v */
const code = (v) => (str(v) === "" ? "–" : `\`${str(v).replaceAll("`", "ˋ")}\``);
/** Table cell text. @param {string} v */
const cell = (v) => v.replaceAll("|", "\\|").replaceAll("\n", " ");

/** Short "Browser on OS" from a user agent. @param {string} ua */
export function shortUserAgent(ua) {
  const os = /iPhone|iPad/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Mac OS X/.test(ua) ? "macOS" : /Windows/.test(ua) ? "Windows" : /Linux/.test(ua) ? "Linux" : "?";
  const browser = /EdgA?\//.test(ua)
    ? "Edge"
    : /SamsungBrowser/.test(ua)
      ? "Samsung Internet"
      : /Firefox|FxiOS/.test(ua)
        ? "Firefox"
        : /CriOS|Chrome\//.test(ua)
          ? "Chrome"
          : /Safari\//.test(ua)
            ? "Safari"
            : "?";
  const version = (/(?:OS |Android |Version\/|Chrome\/|CriOS\/|Firefox\/)(\d+(?:[._]\d+)?)/.exec(ua)?.[1] ?? "").replace("_", ".");
  return `${browser} · ${os}${version ? ` ${version}` : ""}`;
}

/**
 * Issue title and body. `imageLinks` are added once the screenshots are stored.
 * @param {Payload} p
 * @param {{ categoryLabel: string, labels: string[], deploy?: HandlerOptions["deploy"], imageLinks?: string[] }} extra
 */
export function formatIssue(p, extra) {
  const ctx = p.context ?? {};
  const app = ctx.app && typeof ctx.app === "object" ? ctx.app : {};
  const device = ctx.device && typeof ctx.device === "object" ? ctx.device : {};
  const page = ctx.page && typeof ctx.page === "object" ? ctx.page : {};
  const firstLine = p.text.trim().split("\n")[0] ?? "";
  const summary = firstLine.length > 70 ? `${firstLine.slice(0, 67)}…` : firstLine;
  const title = `[${extra.categoryLabel}] ${summary || "(nur Screenshot)"}`;

  const task =
    app.objectiveId || app.activityId
      ? `${code(app.objectiveId)} · ${code(app.activityId)}${app.activityVersion !== undefined ? ` v${str(app.activityVersion)}` : ""}`
      : "– (keine Aufgabe offen)";
  const deploy = extra.deploy ?? {};
  const screenSize = device.screen ? `${str(device.screen.width)}×${str(device.screen.height)} @${str(device.screen.pixelRatio)}x` : "?";
  const viewport = device.viewport ? `${str(device.viewport.width)}×${str(device.viewport.height)}` : "?";
  const rows = [
    ["Kategorie", extra.categoryLabel],
    ["Modus", p.mode === "fix" ? "Korrigieren (sofort)" : "Später besprechen"],
    ["Ort", `${code(page.path)}${app.view ? ` · Ansicht ${code(app.view)}` : ""}`],
    ["Aufgabe", task],
    ["Deploy", `${code(str(deploy.sha).slice(0, 7))}${deploy.ref ? ` · ${code(deploy.ref)}` : ""}${deploy.env ? ` · ${str(deploy.env)}` : ""}`],
    ["Gerät", `${shortUserAgent(str(device.userAgent))}${device.standalone ? " · als App" : ""}`],
    ["Bildschirm", `${screenSize} · Fenster ${viewport}`],
    ["Sprache", `${str(device.language) || "?"} · Seite ${str(device.documentLanguage) || "?"}`],
    ["Gemeldet", str(ctx.openedAt) || "?"],
  ];

  const quoted = p.text.trim() === "" ? "> (kein Text)" : p.text.trim().split("\n").map((line) => `> ${line}`).join("\n");
  const events = Array.isArray(app.recentEvents) ? app.recentEvents : [];
  const { recentEvents: _events, ...appRest } = app;
  const fullContext = { ...ctx, app: appRest };

  const parts = [
    quoted,
    "",
    "| | |",
    "|---|---|",
    ...rows.map(([k, v]) => `| ${cell(str(k))} | ${cell(str(v))} |`),
    "",
  ];
  if (extra.imageLinks && extra.imageLinks.length > 0) parts.push("### Screenshots", "", ...extra.imageLinks, "");
  else if (p.images.length > 0) parts.push("### Screenshots", "", `_${p.images.length} Bild(er) werden hochgeladen …_`, "");
  parts.push(
    `<details><summary>Letzte Ereignisse (${events.length})</summary>`,
    "",
    "```json",
    JSON.stringify(events, null, 1),
    "```",
    "</details>",
    "",
    "<details><summary>Kontext (vollständig)</summary>",
    "",
    "```json",
    JSON.stringify(fullContext, null, 1),
    "```",
    "</details>",
    "",
    `<!-- feedback.v1 app=${p.app} category=${p.category} mode=${p.mode} -->`,
  );
  return { title, body: parts.join("\n") };
}

/**
 * Minimal Node request/response shapes (Vercel's helpers parse JSON bodies).
 * @typedef {{ method?: string, headers: Record<string, string | string[] | undefined>, body?: unknown }} Req
 * @typedef {{ status(code: number): Res, json(value: unknown): void, end(): void, setHeader(name: string, value: string): void }} Res
 */

/** @param {HandlerOptions} options */
export function createFeedbackHandler(options) {
  const labels = options.labels ?? DEFAULT_LABELS;
  const mediaBranch = options.mediaBranch ?? "feedback-media";
  const mediaDir = options.mediaDir ?? "feedback";

  /** @param {Req} req @param {Res} res */
  return async function handler(req, res) {
    res.setHeader("cache-control", "no-store");
    if (!options.token || (!options.keyless && !options.testerKey)) {
      res.status(503).json({ error: "Feedback ist auf diesem Deployment nicht eingerichtet (Umgebungsvariablen fehlen)." });
      return;
    }
    const header = req.headers["x-feedback-key"];
    const key = Array.isArray(header) ? header[0] : header;
    if (!options.keyless && (typeof key !== "string" || key === "" || !sameKey(key, /** @type {string} */ (options.testerKey)))) {
      res.status(401).json({ error: "Tester-Schlüssel fehlt oder stimmt nicht." });
      return;
    }
    if (req.method === "GET" || req.method === "HEAD") {
      res.status(204).end();
      return;
    }
    if (req.method !== "POST") {
      res.setHeader("allow", "GET, POST");
      res.status(405).json({ error: "Nur GET und POST." });
      return;
    }

    /** @type {unknown} */
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch {
      res.status(400).json({ error: "Ungültiges JSON." });
      return;
    }
    const checked = validatePayload(body, options.categories, options.app);
    if (!checked.ok) {
      res.status(400).json({ error: checked.errors.join("; ") });
      return;
    }
    const p = checked.payload;
    const category = options.categories.find((c) => c.id === p.category);
    const categoryLabel = category?.label ?? p.category;
    if (category?.laterOnly) p.mode = "later";
    const issueLabels = [labels.base, categoryLabel, p.mode === "fix" ? labels.fix : labels.later];
    const gh = createGitHub({ token: options.token, repo: options.repo, ...(options.fetch ? { fetch: options.fetch } : {}) });

    let issue;
    try {
      issue = await gh.createIssue({ ...formatIssue(p, { categoryLabel, labels: issueLabels, ...(options.deploy ? { deploy: options.deploy } : {}) }), labels: issueLabels });
    } catch (error) {
      res.status(502).json({ error: `Issue konnte nicht angelegt werden: ${error instanceof Error ? error.message : String(error)}` });
      return;
    }

    /** @type {string[]} */
    const warnings = [];
    if (p.images.length > 0) {
      /** @type {string[]} */
      const links = [];
      try {
        if (!(await gh.branchExists(mediaBranch))) {
          await gh.createOrphanBranch(mediaBranch, {
            "README.md": `# ${mediaBranch}\n\nScreenshots from tester feedback (one folder per issue: ${mediaDir}/<issue number>/). Written by api/feedback.js. Never merged.\n`,
            "vercel.json": `${JSON.stringify({ git: { deploymentEnabled: false } }, null, 2)}\n`,
          });
        }
        for (const [index, image] of p.images.entries()) {
          const match = /** @type {RegExpExecArray} */ (DATA_URL.exec(image.dataUrl));
          const ext = match[1] === "jpeg" ? "jpg" : match[1];
          const base = str(image.name).replace(/\.[^.]*$/, "").replace(/[^A-Za-z0-9_-]+/g, "-").slice(0, 40) || "screenshot";
          const path = `${mediaDir}/${issue.number}/${index + 1}-${base}.${ext}`;
          await gh.putFile(mediaBranch, path, /** @type {string} */ (match[2]), `feedback #${issue.number}: screenshot ${index + 1}`);
          const url = `https://github.com/${options.repo}/blob/${mediaBranch}/${path}`;
          links.push(`[![Screenshot ${index + 1}](${url}?raw=true)](${url})`);
        }
      } catch (error) {
        warnings.push(`Nicht alle Screenshots gespeichert (${links.length} von ${p.images.length}).`);
        await gh.comment(issue.number, `⚠️ Screenshots: ${error instanceof Error ? error.message : String(error)}`).catch(() => undefined);
      }
      try {
        await gh.updateIssue(issue.number, {
          body: formatIssue(p, { categoryLabel, labels: issueLabels, ...(options.deploy ? { deploy: options.deploy } : {}), imageLinks: links }).body,
        });
      } catch {
        warnings.push("Die Screenshot-Links stehen nicht im Issue.");
      }
    }

    res.status(201).json({ number: issue.number, url: issue.html_url, ...(warnings.length > 0 ? { warnings } : {}) });
  };
}
