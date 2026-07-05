import type { Metadata } from "next";
import { nowUpdates } from "@/content/now";
import { fetchUserActivity } from "@/lib/github";
import { formatDay, timeAgo } from "@/lib/format";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm building, learning, and looking forward to - right now.",
};

export const revalidate = 900;

export default async function NowPage() {
  const activity = await fetchUserActivity();
  const [latest, ...archive] = nowUpdates;

  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">Now</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        What&apos;s up with me, <em className="text-muted">right now.</em>
      </h1>
      <p className="mt-6 max-w-xl leading-relaxed text-muted">
        A dated log of what I&apos;m building, learning, and looking forward to -
        written by me, in my own words. Below it, my live GitHub activity,
        which keeps this page honest whether or not I remember to write.
      </p>

      {/* Latest update */}
      <section className="mt-16">
        <p className="font-mono text-xs text-muted">{formatDay(latest.date)}</p>
        <div className="mt-6 space-y-8">
          {latest.entries.map((e) => (
            <div key={e.label} className="grid gap-2 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <p className="label pt-1">{e.label}</p>
              <p className="max-w-xl leading-relaxed">
                {e.text}
                {e.href && (
                  <>
                    {" "}
                    <a href={e.href} className="link" target="_blank" rel="noreferrer">
                      view ↗
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Live activity */}
      <section className="mt-20">
        <div className="rounded-lg bg-panel p-5">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-panel-muted">
              Recent activity - live from GitHub
            </p>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
          </div>
          {activity && activity.length > 0 ? (
            <ul className="mt-5 space-y-4 font-mono text-xs text-panel-ink">
              {activity.slice(0, 10).map((a, i) => (
                <li key={`${a.date}-${i}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="w-16 shrink-0 text-panel-muted">{timeAgo(a.date)}</span>
                  <span>
                    {a.verb}{" "}
                    <a
                      href={a.url}
                      className="underline underline-offset-4 hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {a.repo}
                    </a>
                  </span>
                  {a.detail && (
                    <span className="max-w-full truncate text-panel-muted">“{a.detail}”</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 font-mono text-xs text-panel-muted">
              activity feed unavailable - this pulls live from the GitHub API
              and recovers on its own.
            </p>
          )}
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          This feed is my actual public GitHub activity across all repos - DSA
          practice, coursework, this site. It updates itself, so &quot;consistency&quot;
          here isn&apos;t a claim, it&apos;s a timestamp.
        </p>
      </section>

      {/* Archive */}
      {archive.length > 0 && (
        <section className="mt-20">
          <p className="label">Earlier</p>
          <div className="mt-6 space-y-12">
            {archive.map((u) => (
              <article key={u.date}>
                <p className="font-mono text-xs text-muted">{formatDay(u.date)}</p>
                <div className="mt-4 space-y-4">
                  {u.entries.map((e) => (
                    <div key={e.label} className="grid gap-1 sm:grid-cols-[1fr_2fr] sm:gap-8">
                      <p className="label">{e.label}</p>
                      <p className="max-w-xl text-sm leading-relaxed text-muted">
                        {e.text}
                        {e.href && (
                          <>
                            {" "}
                            <a href={e.href} className="link" target="_blank" rel="noreferrer">
                              view ↗
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
