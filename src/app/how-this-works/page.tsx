import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How this works",
  description:
    "The architecture of this site, written like the design doc it deserves.",
};

const decisions = [
  {
    decision: "GitHub Actions owns the whole pipeline",
    why: "Vercel could deploy this site automatically on push, but then the pipeline shown in the ops panel would be someone else's. Actions runs lint, tests, and the build, then pushes the prebuilt output to Vercel — so every claim on this page maps to a workflow file you can read in the repo.",
  },
  {
    decision: "Content is typed TypeScript, not a CMS",
    why: "Projects and experience change a few times a year. A CMS adds a database, an admin UI, and an attack surface to solve a problem git already solves. Typed modules mean the content is validated at compile time and every edit is a commit — which feeds the changelog.",
  },
  {
    decision: "Build metadata is baked, live status is fetched",
    why: "The commit hash and test count in the ops panel are written into the build artifact by CI — they describe exactly the deployment you're looking at and can't drift. Only the pipeline status is fetched live from the GitHub API, cached for five minutes.",
  },
  {
    decision: "Everything degrades gracefully",
    why: "If the GitHub API is rate-limited or unreachable, the changelog and ops panel say so honestly and the rest of the site is unaffected. No feature here is allowed to break the recruiter path: home, resume, contact.",
  },
  {
    decision: "No AI chatbot (yet)",
    why: "Portfolio chatbots are usually black-box gimmicks. One is on the roadmap, but only as a glass box — showing its retrieved chunks, prompt, and latency. Until it can demonstrate something real about retrieval engineering, it stays unshipped.",
  },
];

export default function HowThisWorksPage() {
  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">How this works</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        A portfolio that <em className="text-muted">shows its work.</em>
      </h1>
      <p className="mt-6 max-w-xl leading-relaxed text-muted">
        In plain terms: this site publishes its own build pipeline, changelog,
        and architecture — the same practices I use in professional work,
        demonstrated live instead of listed on a resume. This page is its
        design doc.
      </p>

      {/* Pipeline */}
      <section className="mt-20">
        <p className="label">The pipeline</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Every push to <span className="font-mono text-xs">main</span> runs
          this end to end. If any step fails, nothing deploys. The page you are
          reading was produced by it.
        </p>
        <div className="mt-6 overflow-x-auto rounded-md bg-panel p-5 font-mono text-xs leading-relaxed text-panel-ink">
          <pre>{`git push origin main
   │
   ▼
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│   lint   │──▶│   test   │──▶│  build   │──▶│  deploy  │
│  eslint  │   │  vitest  │   │ next.js  │   │  vercel  │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
                    │              │
                    ▼              ▼
             test counts and commit metadata are baked
             into the artifact → shown in the ops panel`}</pre>
        </div>
      </section>

      {/* Stack */}
      <section className="mt-20">
        <p className="label">Stack</p>
        <div className="mt-6 divide-y divide-line border-y border-line text-sm">
          {[
            ["Framework", "Next.js (App Router, React Server Components, ISR)"],
            ["Language", "TypeScript, strict"],
            ["Styling", "Tailwind CSS v4 — design tokens in CSS, no UI kit"],
            ["Testing", "Vitest — content integrity, formatting, API shapes"],
            ["CI/CD", "GitHub Actions → Vercel (prebuilt deploys)"],
            ["Data", "Typed TS content modules + GitHub REST API"],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 py-3 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <span className="font-medium">{k}</span>
              <span className="font-mono text-xs leading-relaxed text-muted">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Decisions */}
      <section className="mt-20">
        <p className="label">Decisions &amp; tradeoffs</p>
        <div className="mt-6 space-y-10">
          {decisions.map((d) => (
            <article key={d.decision} className="grid gap-2 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <h3 className="font-medium leading-snug">{d.decision}</h3>
              <p className="text-sm leading-relaxed text-muted">{d.why}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Source */}
      <section className="mt-20 rounded-md border border-line p-6">
        <p className="text-sm leading-relaxed text-muted">
          Don&apos;t take this page&apos;s word for any of it — the source is public at{" "}
          <a
            href={`https://github.com/${site.repo}`}
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            github.com/{site.repo}
          </a>
          , the pipeline is in{" "}
          <span className="font-mono text-xs">.github/workflows/deploy.yml</span>, and
          the data behind this site is served by{" "}
          <Link href="/api-docs" className="link">
            a real public API
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
