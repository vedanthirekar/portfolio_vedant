import type { Metadata } from "next";
import { roadmap } from "@/content/roadmap";
import type { RoadmapStatus } from "@/content/types";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What's shipped, in progress, and planned for this site.",
};

const sections: { status: RoadmapStatus; label: string; blurb: string }[] = [
  {
    status: "in-progress",
    label: "In progress",
    blurb: "Actively being built right now.",
  },
  {
    status: "planned",
    label: "Planned",
    blurb: "Committed to, in rough priority order.",
  },
  {
    status: "shipped",
    label: "Shipped",
    blurb: "Live - each one has entries in the changelog.",
  },
];

function StatusDot({ status }: { status: RoadmapStatus }) {
  const color =
    status === "shipped"
      ? "bg-ok"
      : status === "in-progress"
        ? "bg-rose"
        : "bg-line";
  return <span className={`mt-2 inline-block size-2 shrink-0 rounded-full ${color}`} />;
}

export default function RoadmapPage() {
  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">Roadmap</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        This site is a product. <em className="text-muted">Here&apos;s its roadmap.</em>
      </h1>
      <p className="mt-6 max-w-xl leading-relaxed text-muted">
        I treat this portfolio as an ongoing engineering project, not a
        brochure. Everything below is a real commitment - when an item ships,
        it moves down the page and shows up in the changelog.
      </p>

      <div className="mt-16 space-y-16">
        {sections.map((s) => {
          const items = roadmap.filter((r) => r.status === s.status);
          if (items.length === 0) return null;
          return (
            <section key={s.status} className="grid gap-4 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <div>
                <h2 className="font-medium">{s.label}</h2>
                <p className="mt-1 text-sm text-muted">{s.blurb}</p>
              </div>
              <ul className="space-y-6">
                {items.map((r) => (
                  <li key={r.title} className="flex gap-4">
                    <StatusDot status={r.status} />
                    <div>
                      <h3 className="font-medium">{r.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{r.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
