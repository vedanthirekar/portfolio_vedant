import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { education } from "@/content/education";
import { achievements } from "@/content/achievements";
import { aboutPhoto, achievementImage } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, how I think, and the education and recognition behind the work.",
};

const forte = [
  {
    area: "Software Engineering",
    items:
      "Python, SQL, TypeScript/React, FastAPI, REST APIs, system fundamentals",
  },
  {
    area: "AI & Data Systems",
    items:
      "LLM pipelines, agentic AI & RAG, reinforcement learning, ML, computer vision",
  },
  {
    area: "Infrastructure",
    items: "Linux, Git, Docker, CI/CD, HPC/Slurm, Azure, AWS",
  },
];

export default function AboutPage() {
  const photo = aboutPhoto();
  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">About</p>
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div>
          <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
            Curious about how complex things{" "}
            <em className="text-muted">break down into simple parts.</em>
          </h1>

          <div className="mt-16 max-w-2xl space-y-5 leading-relaxed text-muted">
            <p>
              I&apos;m someone with an open mind, always learning and driven by
              curiosity about how complex things break down into simple,
              manageable parts. I have always tried to put myself in situations
              where I had to solve some kind of problem, like hackathons or
              improving upon some inefficiency.
            </p>
            <p>
              My experience spans software fundamentals to ML, generative AI,
              computer vision, analytics, data engineering, and visualization -
              learned through internships, coursework, and building things. This
              exposure to a wide range of areas has helped me develop a holistic
              understanding of how different components of a system interact and
              how to optimize them for better performance and efficiency. The
              full history of where I&apos;ve done that lives on the{" "}
              <Link href="/work" className="link">
                work
              </Link>{" "}
              page.
            </p>
            <p className="text-ink">
              Apart from my experiences and projects, the{" "}
              <Link href="/changelog" className="link">
                changelog
              </Link>{" "}
              shows how consistently I ship or try to work on learning/building
              something. The{" "}
              <Link href="/work/projects" className="link">
                honest notes on every project
              </Link>{" "}
              show how I think about tradeoffs. And{" "}
              <Link href="/how-this-works" className="link">
                how this site works
              </Link>{" "}
              is a concept I tried on this website to show the engineering
              standards I hold myself to. And if you want to know what&apos;s up
              with me right now, that&apos;s literally{" "}
              <Link href="/now" className="link">
                a page
              </Link>
              .
            </p>
          </div>
        </div>
        {photo && (
          <div className="relative aspect-[3/4] max-w-72 overflow-hidden rounded-lg border border-line">
            <Image
              src={photo}
              alt={site.name}
              fill
              sizes="288px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Technical forte */}
      <section className="mt-20">
        <p className="label">Technical forte</p>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {forte.map((f) => (
            <div
              key={f.area}
              className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-8"
            >
              <p className="font-medium">{f.area}</p>
              <p className="font-mono text-xs leading-relaxed text-muted">
                {f.items}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-20">
        <p className="label">Education</p>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {education.map((e) => (
            <article
              key={e.institution}
              className="grid gap-3 py-8 sm:grid-cols-[1fr_2fr] sm:gap-8"
            >
              <div>
                <h3 className="font-medium tracking-tight">{e.institution}</h3>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {e.start} - {e.end} · GPA {e.gpa}
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
          {achievements.map((a) => {
            const img = achievementImage(a.slug);
            return (
              <article key={a.slug} className="flex gap-5">
                {img && (
                  <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-md border border-line">
                    <Image
                      src={img}
                      alt={a.title}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-medium">
                    {a.title}{" "}
                    <span className="ml-2 font-mono text-[11px] font-normal text-muted">
                      {a.year}
                    </span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {a.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
