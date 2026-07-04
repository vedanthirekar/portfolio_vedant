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

/** Latest CI run for this site's repo, or null if unavailable (no repo yet, rate limit, …). */
export async function fetchLatestRun(): Promise<WorkflowRun | null> {
  try {
    const res = await fetch(
      `${API}/repos/${site.repo}/actions/runs?per_page=1&branch=main`,
      { headers: headers(), next: { revalidate: 300 } },
    );
    if (!res.ok) return null;
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

/** Recent commits on main, or null if unavailable. */
export async function fetchCommits(): Promise<Commit[] | null> {
  try {
    const res = await fetch(`${API}/repos/${site.repo}/commits?per_page=100`, {
      headers: headers(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
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
