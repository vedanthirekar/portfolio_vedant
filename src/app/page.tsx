import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { featuredProjects } from "@/content/projects";
import { experience } from "@/content/experience";
import { formatRange } from "@/lib/format";
import { projectImage, aboutPhoto } from "@/lib/images";

const thumbTints = [
  "linear-gradient(150deg, #b8c3bd, #8aa2a0)",
  "linear-gradient(150deg, #e3cdc4, #d6a495)",
  "linear-gradient(150deg, #dfe0dc, #c3c9c3)",
];

export default function Home() {
  const photo = aboutPhoto();

  return (
    <div>
      {/* Hero */}
      <section className="grid items-center gap-10 py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20 lg:py-24">
        <div>
          <p className="label mb-6">
            {site.role} · {site.location}
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            I learn how software and AI systems work{" "}
            <em className="text-accent">by building them.</em>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            Fundamentals, simplicity, and real-world use. M.S. in Data Science
            at Indiana University — previously at Methix, Parallel Wireless,
            and Krios Info Solutions.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink px-7 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85"
            >
              Resume
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-sage px-7 py-3 text-sm font-medium transition-colors hover:bg-sage hover:text-white"
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
        </div>
        <div className="relative aspect-[4/5] w-full max-w-80 overflow-hidden rounded-[14px] border border-line lg:max-w-none"
          style={{ background: "linear-gradient(160deg, #dfe5e2, #cfd8d4)" }}
        >
          {photo && (
            <Image
              src={photo}
              alt={site.name}
              fill
              sizes="(min-width: 1024px) 33vw, 320px"
              className="object-cover"
              priority
            />
          )}
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-line py-16 lg:py-20">
        <div className="flex items-baseline justify-between">
          <p className="label">Selected work</p>
          <Link href="/work" className="font-mono text-xs text-accent hover:text-ink">
            all projects →
          </Link>
        </div>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {featuredProjects.map((p, i) => {
            const img = projectImage(p.slug);
            return (
              <article
                key={p.slug}
                className="flex flex-col rounded-[14px] border border-line bg-surface p-6 transition-colors hover:border-sage"
              >
                <div
                  className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg"
                  style={{ background: thumbTints[i % thumbTints.length] }}
                >
                  {img && (
                    <Image
                      src={img}
                      alt={`${p.name} screenshot`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="font-serif text-2xl font-medium tracking-tight">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.oneLiner}</p>
                <p className="mt-5 font-mono text-[11px] text-accent">
                  {p.stack.slice(0, 3).join(" · ")}
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
              </article>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-line py-16 lg:py-20">
        <div className="flex items-baseline justify-between">
          <p className="label">Experience</p>
          <Link href="/about" className="font-mono text-xs text-accent hover:text-ink">
            full history →
          </Link>
        </div>
        <div className="mt-10 border-t border-line">
          {experience.map((e) => (
            <div
              key={e.slug}
              className="grid items-baseline gap-x-8 gap-y-1 border-b border-line py-6 sm:grid-cols-[240px_1fr_200px]"
            >
              <p className="text-[17px] font-semibold">{e.company}</p>
              <p className="text-sm text-muted">
                {e.role} — {e.tagline}
              </p>
              <p className="font-mono text-[11px] text-muted sm:text-right">
                {formatRange(e.start, e.end)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
