import Link from "next/link";
import { fetchLatestRun } from "@/lib/github";
import { buildInfo } from "@/lib/build-info";
import { formatDuration, timeAgo } from "@/lib/format";

function Dot({ tone }: { tone: "ok" | "pending" | "bad" }) {
  const color =
    tone === "ok" ? "bg-ok" : tone === "pending" ? "bg-amber-400" : "bg-red-400";
  return (
    <span className="relative flex size-2 shrink-0">
      {tone === "ok" && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-40" />
      )}
      <span className={`relative inline-flex size-2 rounded-full ${color}`} />
    </span>
  );
}

function Sep() {
  return <span className="text-panel-muted/50">·</span>;
}

/**
 * Live ops strip. Shows the real pipeline state of this deployment:
 * baked build metadata (commit, deploy number, tests) plus the latest
 * GitHub Actions run fetched at request time (ISR, 5 min).
 * Degrades honestly to "development build" when no pipeline exists yet.
 */
export async function OpsPanel() {
  const run = await fetchLatestRun();
  const tests = buildInfo.tests;

  const live = run !== null && buildInfo.env === "ci";
  const tone: "ok" | "pending" | "bad" = !live
    ? "pending"
    : run.status !== "completed"
      ? "pending"
      : run.conclusion === "success"
        ? "ok"
        : "bad";

  return (
    <div className="rounded-md bg-panel px-4 py-3 font-mono text-xs text-panel-ink">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <Dot tone={tone} />
        {live ? (
          <>
            <a href={run.url} className="hover:text-white" target="_blank" rel="noreferrer">
              deploy #{buildInfo.runNumber ?? run.runNumber}
            </a>
            <Sep />
            <span>{buildInfo.sha ?? run.sha}</span>
            <Sep />
            <span className="max-w-64 truncate text-panel-muted" title={run.message}>
              {run.message}
            </span>
            <Sep />
            <span>{formatDuration(run.durationSec)}</span>
            <Sep />
            <span>{timeAgo(run.finishedAt)}</span>
            {tests && (
              <>
                <Sep />
                <span className={tests.passed === tests.total ? "text-ok" : "text-red-400"}>
                  {tests.passed}/{tests.total} tests ✓
                </span>
              </>
            )}
          </>
        ) : (
          <>
            <span>build {buildInfo.sha ?? "local"}</span>
            <Sep />
            <span className="text-panel-muted">
              development build — the pipeline goes live with the public repo
            </span>
          </>
        )}
        <span className="ml-auto">
          <Link href="/how-this-works" className="text-panel-muted transition-colors hover:text-white">
            how this works →
          </Link>
        </span>
      </div>
    </div>
  );
}
