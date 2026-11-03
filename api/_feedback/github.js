// @ts-check
/**
 * Minimal GitHub REST client for the feedback function (issues and files).
 * Plain JavaScript on purpose: Vercel compiles `api/*.ts` with the project's
 * TypeScript, and TypeScript 7 (used here) has no JavaScript compiler API.
 */

/**
 * @typedef {object} GitHubOptions
 * @property {string} token   Fine-grained token: Issues and Contents (read/write) on one repository.
 * @property {string} repo    "owner/name".
 * @property {typeof fetch} [fetch]
 */

/** @typedef {{ number: number, html_url: string, body?: string | null }} Issue */

export class GitHubError extends Error {
  /** @param {number} status @param {string} message */
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/** @param {GitHubOptions} options */
export function createGitHub(options) {
  const doFetch = options.fetch ?? fetch;
  const base = `https://api.github.com/repos/${options.repo}`;

  /**
   * @param {string} method
   * @param {string} path  Relative to the repository ("/issues") or absolute URL.
   * @param {unknown} [body]
   * @returns {Promise<any>}
   */
  async function call(method, path, body) {
    const response = await doFetch(path.startsWith("https://") ? path : base + path, {
      method,
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${options.token}`,
        "x-github-api-version": "2022-11-28",
        "user-agent": "feedback-widget",
        ...(body === undefined ? {} : { "content-type": "application/json" }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    const text = await response.text();
    /** @type {any} */
    let json = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { message: text.slice(0, 200) };
    }
    if (!response.ok) throw new GitHubError(response.status, `GitHub ${method} ${path}: ${response.status} ${json.message ?? ""}`.trim());
    return json;
  }

  return {
    /** @param {{ title: string, body: string, labels: string[] }} issue @returns {Promise<Issue>} */
    createIssue: (issue) => call("POST", "/issues", issue),
    /** @param {number} number @param {{ body?: string, labels?: string[] }} patch @returns {Promise<Issue>} */
    updateIssue: (number, patch) => call("PATCH", `/issues/${number}`, patch),
    /** @param {number} number @param {string} body */
    comment: (number, body) => call("POST", `/issues/${number}/comments`, { body }),

    /** @param {string} branch @returns {Promise<boolean>} */
    async branchExists(branch) {
      try {
        await call("GET", `/git/ref/heads/${encodeURIComponent(branch)}`);
        return true;
      } catch (error) {
        if (error instanceof GitHubError && error.status === 404) return false;
        throw error;
      }
    },

    /**
     * Creates `branch` as an orphan branch holding only the given text files
     * (used for the screenshot branch, which never merges anywhere).
     * @param {string} branch @param {Record<string, string>} files
     */
    async createOrphanBranch(branch, files) {
      const tree = await call("POST", "/git/trees", {
        tree: Object.entries(files).map(([path, content]) => ({ path, mode: "100644", type: "blob", content })),
      });
      const commit = await call("POST", "/git/commits", { message: `Start ${branch}`, tree: tree.sha, parents: [] });
      await call("POST", "/git/refs", { ref: `refs/heads/${branch}`, sha: commit.sha });
    },

    /**
     * Adds a new file on a branch (one commit).
     * @param {string} branch @param {string} path @param {string} base64 @param {string} message
     */
    putFile: (branch, path, base64, message) =>
      call("PUT", `/contents/${path.split("/").map(encodeURIComponent).join("/")}`, { message, content: base64, branch }),
  };
}

/** @typedef {ReturnType<typeof createGitHub>} GitHub */
