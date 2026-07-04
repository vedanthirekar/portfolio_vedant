import Link from "next/link";
import { fetchLatestRun, fetchUserActivity } from "@/lib/github";
import { buildInfo } from "@/lib/build-info";
import { latestNow } from "@/content/now";
import { site } from "@/lib/site";
import { formatDuration, timeAgo } from "@/lib/format";

function Dot({ color, ping = false }: { color: string; ping?: boolean }) {
  return (
    <span className="relative mr-1 inline-flex size-[7px] shrink-0 self-center">
      {ping && (
        <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-40 ${color}`} />
      )}
      <span className={`relative inline-flex size-[7px] rounded-full ${color}`} />
    </span>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-1.5">
      <span className="w-full shrink-0 text-[10px] uppercase tracking-[0.12em] text-sage sm:w-20">
        {label}
      </span>
      {children}
    </div>
  );
}

/** Drop the owner prefix for the user's own repos to keep console lines short. */
function shortRepo(repo: string): string {
  const username = site.social.github.split("/").pop() ?? "";
  return repo.startsWith(`${username}/`) ? repo.slice(username.length + 1) : repo;
}

/**
 * The footer console — the site's system tray. Three rows of live truth:
 * STATUS (this deployment's pipeline), NOW (what I'm up to, hand-written),
 * ACTIVITY (my public GitHub events). Degrades honestly when data is missing.
 */
export async function OpsPanel() {
  const [run, activity] = await Promise.all([fetchLatestRun(), fetchUserActivity()]);
  const tests = buildInfo.tests;
  const live = run !== null && buildInfo.env === "ci";
  const statusColor = !live
    ? "bg-rose"
    : run.status !== "completed"
      ? "bg-rose"
      : run.conclusion === "success"
        ? "bg-ok"
        : "bg-red-400";

  return (
    <div className="rounded-[14px] bg-panel px-5 py-4 font-mono text-xs text-panel-ink sm:px-6">
      <Row label="status">
        <Dot color={statusColor} ping={live} />
        {live ? (
          <span>
            <a href={run.url} className="hover:text-white" target="_blank" rel="noreferrer">
              deploy #{buildInfo.runNumber ?? run.runNumber}
            </a>
            {" · "}
            {buildInfo.sha ?? run.sha}
            {" · "}
            {formatDuration(run.durationSec)}
            {" · "}
            {timeAgo(run.finishedAt)}
            {tests && (
              <>
                {" · "}
                <span className={tests.passed === tests.total ? "text-ok" : "text-red-400"}>
                  {tests.passed}/{tests.total} tests ✓
                </span>
              </>
            )}
          </span>
        ) : (
          <span className="text-panel-muted">
            build {buildInfo.sha ?? "local"} · development build — the pipeline goes
            live with the public repo
          </span>
        )}
        <Link
          href="/how-this-works"
          className="ml-auto text-panel-muted transition-colors hover:text-white"
        >
          how this works →
        </Link>
      </Row>

      <Row label="now">
        <Dot color="bg-rose" />
        <Link href="/now" className="transition-colors hover:text-white">
          {latestNow.summary}
        </Link>
      </Row>

      <Row label="activity">
        {activity && activity.length > 0 ? (
          <span className="text-panel-muted">
            {activity.slice(0, 2).map((a, i) => (
              <span key={`${a.date}-${i}`}>
                {i > 0 && " · "}
                {timeAgo(a.date)}{" "}
                <a
                  href={a.url}
                  className="transition-colors hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.verb} {shortRepo(a.repo)}
                </a>
              </span>
            ))}
            <Link href="/now" className="transition-colors hover:text-white">
              {" "}
              · more →
            </Link>
          </span>
        ) : (
          <span className="text-panel-muted">
            feed unavailable — pulls live from GitHub and recovers on its own
          </span>
        )}
      </Row>
    </div>
  );
}
