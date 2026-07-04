import type { Metadata } from "next";
import { fetchCommits } from "@/lib/github";
import { groupCommitsByDay } from "@/lib/changelog";
import { formatDay } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every change to this site, straight from its git history.",
};

export const revalidate = 3600;

export default async function ChangelogPage() {
  const commits = await fetchCommits();
  const groups = commits ? groupCommitsByDay(commits) : null;

  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">Changelog</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        Every change, <em className="text-muted">on the record.</em>
      </h1>
      <p className="mt-6 max-w-xl leading-relaxed text-muted">
        This page reads directly from the site&apos;s git history — nothing is
        hand-picked or polished. It&apos;s the simplest proof of consistency I can
        offer: you can see exactly when and how often I ship.
      </p>

      {groups && groups.length > 0 ? (
        <div className="mt-16 space-y-12">
          {groups.map((g) => (
            <section key={g.day} className="grid gap-3 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <h2 className="font-mono text-xs text-muted">{formatDay(g.day)}</h2>
              <ul className="space-y-3">
                {g.commits.map((c) => (
                  <li key={c.sha} className="flex items-baseline gap-3">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 font-mono text-[11px] text-muted transition-colors hover:text-accent"
                    >
                      {c.sha}
                    </a>
                    <span className="text-sm leading-relaxed">{c.message}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-md bg-panel px-5 py-4 font-mono text-xs text-panel-ink">
          <p>
            changelog unavailable — this page pulls live from{" "}
            <a
              href={`https://github.com/${site.repo}`}
              className="underline underline-offset-4 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              github.com/{site.repo}
            </a>
            . Either the repo isn&apos;t public yet or the GitHub API rate limit was
            hit. It recovers on its own.
          </p>
        </div>
      )}
    </div>
  );
}
