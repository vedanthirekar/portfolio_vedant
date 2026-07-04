import { site } from "./site";

const API = "https://api.github.com";

export interface WorkflowRun {
  runNumber: number;
  status: string; // queued | in_progress | completed
  conclusion: string | null; // success | failure | ...
  sha: string;
  message: string;
  durationSec: number;
  finishedAt: string;
  url: string;
}

export interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

/** Surfaces GitHub API failures in server/Vercel function logs instead of failing silently. */
function logApiFailure(what: string, res: Response) {
  const remaining = res.headers.get("x-ratelimit-remaining");
  console.warn(
    `[github] ${what} failed: ${res.status}${remaining === "0" ? " (rate limit exhausted — set GITHUB_TOKEN)" : ""}`,
  );
}

/** Latest CI run for this site's repo, or null if unavailable (no repo yet, rate limit, …). */
export async function fetchLatestRun(): Promise<WorkflowRun | null> {
  try {
    const res = await fetch(
      `${API}/repos/${site.repo}/actions/runs?per_page=1&branch=main`,
      { headers: headers(), next: { revalidate: 300 } },
    );
    if (!res.ok) {
      logApiFailure("latest run", res);
      return null;
    }
    const data = await res.json();
    const run = data.workflow_runs?.[0];
    if (!run) return null;
    const started = new Date(run.run_started_at).getTime();
    const updated = new Date(run.updated_at).getTime();
    return {
      runNumber: run.run_number,
      status: run.status,
      conclusion: run.conclusion,
      sha: String(run.head_sha).slice(0, 7),
      message: run.head_commit?.message?.split("\n")[0] ?? "",
      durationSec: Math.max(0, Math.round((updated - started) / 1000)),
      finishedAt: run.updated_at,
      url: run.html_url,
    };
  } catch {
    return null;
  }
}

export interface ActivityEvent {
  verb: string; // "pushed 3 commits to", "opened a PR in", "created"
  repo: string; // "vedanthirekar/dsa-solutions"
  detail: string; // latest commit message / PR title / ""
  date: string;
  url: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Pure mapper over GitHub public-events payloads — kept separate for testing. */
export function mapGithubEvents(raw: any[]): ActivityEvent[] {
  const events: ActivityEvent[] = [];
  for (const e of raw) {
    const repo = e?.repo?.name ?? "";
    const date = e?.created_at ?? "";
    if (!repo || !date) continue;
    const url = `https://github.com/${repo}`;
    if (e.type === "PushEvent") {
      const commits = e.payload?.commits ?? [];
      if (commits.length === 0) continue;
      events.push({
        verb: `pushed ${commits.length} commit${commits.length === 1 ? "" : "s"} to`,
        repo,
        detail: String(commits[commits.length - 1]?.message ?? "").split("\n")[0],
        date,
        url,
      });
    } else if (e.type === "PullRequestEvent" && e.payload?.action === "opened") {
      events.push({
        verb: "opened a pull request in",
        repo,
        detail: e.payload?.pull_request?.title ?? "",
        date,
        url: e.payload?.pull_request?.html_url ?? url,
      });
    } else if (e.type === "CreateEvent" && e.payload?.ref_type === "repository") {
      events.push({ verb: "created", repo, detail: "", date, url });
    }
  }
  return events;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Recent public activity across all of the user's repos, or null if unavailable. */
export async function fetchUserActivity(): Promise<ActivityEvent[] | null> {
  const username = site.social.github.split("/").pop();
  try {
    const res = await fetch(
      `${API}/users/${username}/events/public?per_page=30`,
      { headers: headers(), next: { revalidate: 900 } },
    );
    if (!res.ok) {
      logApiFailure("user activity", res);
      return null;
    }
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    return mapGithubEvents(data);
  } catch {
    return null;
  }
}

/** Recent commits on main, or null if unavailable. */
export async function fetchCommits(): Promise<Commit[] | null> {
  try {
    const res = await fetch(`${API}/repos/${site.repo}/commits?per_page=100`, {
      headers: headers(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      logApiFailure("commits", res);
      return null;
    }
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    return data.map((c) => ({
      sha: String(c.sha).slice(0, 7),
      message: String(c.commit?.message ?? "").split("\n")[0],
      date: c.commit?.author?.date ?? "",
      url: c.html_url,
    }));
  } catch {
    return null;
  }
}
