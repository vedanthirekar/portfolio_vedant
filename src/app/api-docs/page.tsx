import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "API",
  description: "This portfolio has a real, documented JSON API.",
};

const endpoints = [
  {
    path: "/api/resume",
    desc: "The whole resume as structured JSON — experience, education, projects, achievements, links.",
  },
  {
    path: "/api/projects",
    desc: "All projects, including the honest tradeoff notes shown on /work.",
  },
  {
    path: "/api/experience",
    desc: "Work experience with highlights and stack per role.",
  },
  {
    path: "/api/meta",
    desc: "Build metadata for the deployment you're talking to: commit, deploy number, test results.",
  },
];

export default function ApiDocsPage() {
  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">API</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        This portfolio has <em className="text-muted">an API.</em>
      </h1>
      <div className="mt-6 max-w-xl space-y-4 leading-relaxed text-muted">
        <p>
          In plain terms: everything on this site is also available as machine-readable
          data, documented like a real product. If you&apos;re building a tool, scraping
          for a hiring pipeline, or just curious — don&apos;t parse my HTML, use this.
        </p>
        <p>
          Why does a portfolio need an API? Partly because treating your own
          data as a product is good engineering practice in miniature — typed
          content, one source of truth, documented contract. And partly because
          upcoming features on the{" "}
          <a href="/roadmap" className="link">
            roadmap
          </a>{" "}
          (like the <span className="font-mono text-xs">npx vedant</span> terminal
          resume card) will be real consumers of these endpoints.
        </p>
      </div>

      <div className="mt-16 space-y-10">
        {endpoints.map((e) => (
          <section key={e.path}>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="rounded bg-panel px-2 py-1 font-mono text-[11px] text-ok">
                GET
              </span>
              <a
                href={e.path}
                className="link font-mono text-sm"
                target="_blank"
                rel="noreferrer"
              >
                {e.path}
              </a>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{e.desc}</p>
          </section>
        ))}
      </div>

      <section className="mt-16">
        <p className="label mb-4">Try it</p>
        <div className="overflow-x-auto rounded-md bg-panel p-5 font-mono text-xs leading-relaxed text-panel-ink">
          <pre>{`curl ${site.url}/api/resume | jq '.experience[0].company'
"Methix"`}</pre>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          All endpoints are read-only, unauthenticated, and served statically —
          they&apos;re generated from the same typed content modules that render the
          pages, so the API can never disagree with the site.
        </p>
      </section>
    </div>
  );
}
