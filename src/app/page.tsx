import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { featuredProjects } from "@/content/projects";
import { experience } from "@/content/experience";
import { achievements } from "@/content/achievements";
import { latestNow } from "@/content/now";
import { formatRange, formatDay, timeAgo } from "@/lib/format";
import { fetchUserActivity } from "@/lib/github";
import { projectImage, aboutPhoto } from "@/lib/images";
import { OpsPanel } from "@/components/ops-panel";
import { Card } from "@/components/card";

export default async function Home() {
  const activity = await fetchUserActivity();
  const photo = aboutPhoto();

  return (
    <div className="py-10 sm:py-14">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* Identity — the 15-second recruiter card */}
        <Card className="flex flex-col justify-between md:col-span-4">
          <div>
            <p className="label mb-4">
              {site.role} · {site.location}
            </p>
            <h1 className="max-w-xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              I learn how software and AI systems work{" "}
              <em className="text-muted">by building them.</em>
            </h1>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">
              Fundamentals, simplicity, and real-world use. M.S. in Data
              Science at Indiana University — previously at Methix, Parallel
              Wireless, and Krios Info Solutions.
            </p>
          </div>
          <div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
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
            <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-muted">
              Every engineering practice on my resume runs live on this site —{" "}
              <Link href="/how-this-works" className="underline underline-offset-4 hover:text-ink">
                audit it yourself
              </Link>
              .
            </p>
          </div>
        </Card>

        {/* Photo — auto-activates when public/images/vedant.jpg exists */}
        <Card className="relative min-h-56 overflow-hidden p-0 md:col-span-2">
          {photo ? (
            <Image
              src={photo}
              alt={site.name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full min-h-56 flex-col items-center justify-center gap-2">
              <span className="font-serif text-5xl italic text-line">VH</span>
              <span className="font-mono text-[11px] text-muted">
                photo loading soon
              </span>
            </div>
          )}
        </Card>

        {/* Now — the human, current layer */}
        <Card className="md:col-span-2">
          <div className="flex items-baseline justify-between">
            <p className="label">Now</p>
            <span className="font-mono text-[11px] text-muted">
              {formatDay(latestNow.date)}
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {latestNow.entries.slice(0, 2).map((e) => (
              <li key={e.label}>
                <p className="font-mono text-[11px] text-muted">{e.label}</p>
                <p className="mt-1 text-sm leading-relaxed">{e.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/now" className="link mt-4 inline-block font-mono text-xs">
            what&apos;s up with me →
          </Link>
        </Card>

        {/* Live GitHub activity — proof of consistency, updates itself */}
        <Card variant="dark" className="md:col-span-4">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-panel-muted">
              Recent activity — live from GitHub
            </p>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
          </div>
          {activity && activity.length > 0 ? (
            <ul className="mt-4 space-y-3 font-mono text-xs">
              {activity.slice(0, 3).map((a, i) => (
                <li key={`${a.date}-${i}`} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-panel-muted">{timeAgo(a.date)}</span>
                  <span>
                    {a.verb}{" "}
                    <a href={a.url} className="underline underline-offset-4 hover:text-white" target="_blank" rel="noreferrer">
                      {a.repo}
                    </a>
                  </span>
                  {a.detail && (
                    <span className="max-w-full truncate text-panel-muted">
                      “{a.detail}”
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 font-mono text-xs text-panel-muted">
              activity feed unavailable — pulls live from the GitHub API and
              recovers on its own.
            </p>
          )}
        </Card>

        {/* Selected work */}
        {featuredProjects.map((p, i) => {
          const img = projectImage(p.slug);
          return (
            <Card key={p.slug} className="flex flex-col md:col-span-2">
              <p className="label">work — 0{i + 1}</p>
              {img && (
                <div className="relative mt-3 aspect-video overflow-hidden rounded-md border border-line">
                  <Image
                    src={img}
                    alt={`${p.name} screenshot`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="mt-3 font-serif text-2xl tracking-tight">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {p.oneLiner}
              </p>
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
            </Card>
          );
        })}

        {/* Experience */}
        <Card className="md:col-span-4">
          <div className="flex items-baseline justify-between">
            <p className="label">Experience</p>
            <Link href="/work" className="link font-mono text-xs">
              all projects →
            </Link>
          </div>
          <div className="mt-4 divide-y divide-line">
            {experience.map((e) => (
              <div key={e.slug} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <div>
                  <span className="font-medium">{e.company}</span>
                  <span className="ml-3 text-sm text-muted">{e.role}</span>
                </div>
                <span className="font-mono text-[11px] text-muted">
                  {formatRange(e.start, e.end)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recognition */}
        <Card className="md:col-span-2">
          <p className="label">Recognition</p>
          <ul className="mt-4 space-y-3">
            {achievements.map((a) => (
              <li key={a.title}>
                <p className="text-sm font-medium leading-snug">{a.title}</p>
                <p className="mt-0.5 font-mono text-[11px] text-muted">{a.year}</p>
              </li>
            ))}
          </ul>
          <Link href="/about" className="link mt-4 inline-block font-mono text-xs">
            about me →
          </Link>
        </Card>

        {/* Ops panel — full-width bottom row of the control room */}
        <div className="md:col-span-6">
          <OpsPanel />
        </div>
      </div>
    </div>
  );
}
