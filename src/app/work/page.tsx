import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { formatRange } from "@/lib/format";
import { WorkTabs } from "@/components/work-tabs";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Where I've worked and what I shipped there - roles, scope, and the stack behind each one.",
};

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">Work</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        Experience <em className="text-muted">and my learnings</em>
      </h1>
      <p className="mt-6 max-w-xl leading-relaxed text-muted">
        Internships, research, and the role I&apos;m in now
      </p>

      <div className="mt-8">
        <WorkTabs active="/work" />
      </div>

      <div className="mt-12 divide-y divide-line border-y border-line">
        {experience.map((e) => (
          <article key={e.slug} className="grid gap-6 py-12 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <div>
              <h2 className="font-serif text-2xl tracking-tight">{e.company}</h2>
              <p className="mt-3 font-mono text-[11px] text-muted">
                {formatRange(e.start, e.end)}
              </p>
              <p className="mt-3 font-mono text-[11px] text-muted">{e.stack.join(" · ")}</p>
            </div>
            <div>
              <p className="font-medium">{e.role}</p>
              {e.summary && (
                <p className="mt-3 leading-relaxed text-muted">{e.summary}</p>
              )}
              <ul className="mt-6 space-y-2 text-sm leading-relaxed text-muted">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden className="select-none font-mono text-muted/60">·</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
