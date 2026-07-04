import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/content/projects";
import { projectImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects — with the tradeoffs and honest notes included.",
};

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">Work</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        Projects, <em className="text-muted">tradeoffs included.</em>
      </h1>
      <p className="mt-6 max-w-xl leading-relaxed text-muted">
        Every project below lists what was traded away and what didn&apos;t work —
        because real engineering is choosing constraints, and pretending
        otherwise helps no one.
      </p>

      <div className="mt-16 divide-y divide-line border-y border-line">
        {projects.map((p) => {
          const img = projectImage(p.slug);
          return (
          <article key={p.slug} className="grid gap-6 py-12 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <div>
              <h2 className="font-serif text-3xl tracking-tight">{p.name}</h2>
              {img && (
                <div className="relative mt-4 aspect-video overflow-hidden rounded-md border border-line">
                  <Image
                    src={img}
                    alt={`${p.name} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <p className="mt-3 font-mono text-[11px] text-muted">
                {p.stack.join(" · ")}
              </p>
              <p className="mt-4 font-mono text-xs">
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
            <div>
              <p className="font-medium">{p.oneLiner}</p>
              <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
              <div className="mt-6 rounded-md border border-line bg-surface p-4">
                <p className="label mb-3">Honest notes — what was traded away</p>
                <ul className="space-y-2 text-sm leading-relaxed text-muted">
                  {p.tradeoffs.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="select-none font-mono text-muted/60">–</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </div>
  );
}
