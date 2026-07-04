import type { Metadata } from "next";
import Link from "next/link";
import { education } from "@/content/education";
import { achievements } from "@/content/achievements";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, how I think, and the education and recognition behind the work.",
};

const forte = [
  {
    area: "Software Engineering",
    items: "Python, SQL, MongoDB, system fundamentals",
  },
  {
    area: "AI & Data Systems",
    items: "ML, generative AI, LLM pipelines, computer vision",
  },
  {
    area: "Infrastructure",
    items: "Linux, Git, Docker, CI/CD, cloud (Azure)",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">About</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        Curious about how complex things{" "}
        <em className="text-muted">break down into simple parts.</em>
      </h1>

      <div className="mt-10 max-w-2xl space-y-5 leading-relaxed text-muted">
        <p>
          I&apos;m someone with an open mind, always learning. Currently pursuing my
          Master&apos;s in Data Science at Indiana University, driven by curiosity
          about how complex things break down into simple, manageable parts.
        </p>
        <p>
          My experience spans software fundamentals to ML, generative AI,
          computer vision, analytics, data engineering, and visualization —
          learned through internships, coursework, and building things.
        </p>
        <p className="text-ink">
          I&apos;d rather show you who I am than tell you. The{" "}
          <Link href="/changelog" className="link">
            changelog
          </Link>{" "}
          shows how consistently I ship. The{" "}
          <Link href="/work" className="link">
            honest notes on every project
          </Link>{" "}
          show how I think about tradeoffs. And{" "}
          <Link href="/how-this-works" className="link">
            how this site works
          </Link>{" "}
          shows the engineering standards I hold myself to — on my own time,
          when nobody&apos;s checking.
        </p>
      </div>

      {/* Technical forte */}
      <section className="mt-20">
        <p className="label">Technical forte</p>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {forte.map((f) => (
            <div key={f.area} className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <p className="font-medium">{f.area}</p>
              <p className="font-mono text-xs leading-relaxed text-muted">{f.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-20">
        <p className="label">Education</p>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {education.map((e) => (
            <article key={e.institution} className="grid gap-3 py-8 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <div>
                <h3 className="font-medium tracking-tight">{e.institution}</h3>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {e.start} — {e.end} · GPA {e.gpa}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">{e.degree}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {e.coursework.join(" · ")}
                </p>
                {e.recordUrl && (
                  <a
                    href={e.recordUrl}
                    className="link mt-3 inline-block font-mono text-xs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    academic record ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recognition */}
      <section className="mt-20">
        <p className="label">Recognition</p>
        <div className="mt-6 space-y-8">
          {achievements.map((a) => (
            <article key={a.title}>
              <h3 className="font-medium">
                {a.title}{" "}
                <span className="ml-2 font-mono text-[11px] font-normal text-muted">
                  {a.year}
                </span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {a.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
