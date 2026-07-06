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
            I am always working towards becoming a more reliable person and a problem solver. Currently working as an AI Engineer at Project 990.
            Recently graduated with a Master of Science in Data Science at Indiana University
        
  
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
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sage transition-colors hover:bg-sage hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sage transition-colors hover:bg-sage hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-72 overflow-hidden rounded-[14px] border border-line lg:max-w-100"
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
                      className="object-contain p-6"
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
                    <a href={p.links.github} className="link mr-4" target="_blank" rel="noreferrer">
                      github ↗
                    </a>
                  )}
                  {p.links.linkedIn && (
                    <a href={p.links.linkedIn} className="link" target="_blank" rel="noreferrer">
                      linkedin ↗
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
                {e.role}
                {e.tagline && ` - ${e.tagline}`}
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
