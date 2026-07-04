import Link from "next/link";
import { site } from "@/lib/site";
import { featuredProjects } from "@/content/projects";
import { experience } from "@/content/experience";
import { achievements } from "@/content/achievements";
import { formatRange } from "@/lib/format";
import { OpsPanel } from "@/components/ops-panel";

export default function Home() {
  return (
    <div className="py-16 sm:py-24">
      {/* Hero — parseable by anyone in 15 seconds */}
      <section>
        <p className="label mb-6">
          {site.role} · {site.location}
        </p>
        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          I learn how software and AI systems work{" "}
          <em className="text-muted">by building them.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Fundamentals, simplicity, and real-world use. Currently pursuing an
          M.S. in Data Science at Indiana University — previously at Methix,
          Parallel Wireless, and Krios Info Solutions.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            Resume
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-md border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
          >
            Get in touch
          </a>
          <span className="font-mono text-xs text-muted">
            <a href={site.social.github} className="hover:text-ink" target="_blank" rel="noreferrer">
              github
            </a>
            {" / "}
            <a href={site.social.linkedin} className="hover:text-ink" target="_blank" rel="noreferrer">
              linkedin
            </a>
          </span>
        </div>
      </section>

      {/* Live pipeline strip — engineering as visible polish */}
      <section className="mt-16">
        <OpsPanel />
      </section>

      {/* Selected work */}
      <section className="mt-24">
        <div className="flex items-baseline justify-between">
          <p className="label">01 — Selected work</p>
          <Link href="/work" className="link font-mono text-xs">
            all projects →
          </Link>
        </div>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {featuredProjects.map((p) => (
            <article key={p.slug} className="group grid gap-2 py-8 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <h3 className="font-serif text-2xl tracking-tight">{p.name}</h3>
              <div>
                <p className="leading-relaxed text-muted">{p.oneLiner}</p>
                <p className="mt-3 font-mono text-[11px] text-muted">
                  {p.stack.join(" · ")}
                </p>
                <p className="mt-3 font-mono text-xs">
                  {p.links.live && (
                    <a href={p.links.live} className="link mr-4" target="_blank" rel="noreferrer">
                      live ↗
                    </a>
                  )}
                  {p.links.github && (
                    <a href={p.links.github} className="link" target="_blank" rel="noreferrer">
                      github ↗
                    </a>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-24">
        <p className="label">02 — Experience</p>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {experience.map((e) => (
            <article key={e.slug} className="grid gap-2 py-8 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <div>
                <h3 className="text-lg font-medium tracking-tight">{e.company}</h3>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {formatRange(e.start, e.end)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">{e.role}</p>
                <p className="mt-2 leading-relaxed text-muted">{e.summary}</p>
                <p className="mt-3 font-mono text-[11px] text-muted">
                  {e.stack.join(" · ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recognition */}
      <section className="mt-24">
        <p className="label">03 — Recognition</p>
        <ul className="mt-8 space-y-4">
          {achievements.map((a) => (
            <li key={a.title} className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-medium">{a.title}</span>
              <span className="font-mono text-[11px] text-muted">{a.year}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Details on these — and the person behind them — on the{" "}
          <Link href="/about" className="link">
            about page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
