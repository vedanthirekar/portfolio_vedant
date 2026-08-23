import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { achievements } from "@/content/achievements";
import { nowUpdates } from "@/content/now";
import { roadmap } from "@/content/roadmap";
import { formatRange } from "@/lib/format";

const API_NOTE =
  `> Machine-readable data for this content is served as JSON at ${site.url}/api - ` +
  `see ${site.url}/api-docs or ${site.url}/llms.txt.`;

function heading(title: string, level = 2): string {
  return `${"#".repeat(level)} ${title}`;
}

function list(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

export function renderHomeMarkdown(): string {
  const featured = projects.filter((p) => p.featured);
  return [
    `# ${site.name} - ${site.role}`,
    "",
    site.tagline,
    "",
    heading("Selected work"),
    "",
    featured
      .map((p) => `### ${p.name}\n\n${p.oneLiner}\n\nStack: ${p.stack.join(", ")}`)
      .join("\n\n"),
    "",
    heading("Experience"),
    "",
    experience
      .map((e) => `- **${e.company}** - ${e.role} (${formatRange(e.start, e.end)})`)
      .join("\n"),
    "",
    API_NOTE,
  ].join("\n");
}

export function renderWorkMarkdown(): string {
  return [
    "# Work",
    "",
    "Internships, research, and the role I'm in now.",
    "",
    experience
      .map((e) =>
        [
          `## ${e.company}`,
          "",
          `${e.role} - ${formatRange(e.start, e.end)}`,
          "",
          `Stack: ${e.stack.join(", ")}`,
          "",
          e.summary ?? "",
          "",
          list(e.highlights),
        ]
          .filter(Boolean)
          .join("\n"),
      )
      .join("\n\n"),
    "",
    API_NOTE,
  ].join("\n");
}

export function renderProjectsMarkdown(): string {
  return [
    "# Projects",
    "",
    "Every project below lists the major decisions and tradeoffs, and the stack behind it.",
    "",
    projects
      .map((p) =>
        [
          `## ${p.name}`,
          "",
          p.oneLiner,
          "",
          p.description,
          "",
          `Stack: ${p.stack.join(", ")}`,
          "",
          p.links.live ? `Live: ${p.links.live}` : "",
          p.links.github ? `GitHub: ${p.links.github}` : "",
          "",
          "### Tradeoffs",
          "",
          list(p.tradeoffs),
        ]
          .filter((line) => line !== "")
          .join("\n"),
      )
      .join("\n\n"),
    "",
    API_NOTE,
  ].join("\n");
}

export function renderAboutMarkdown(): string {
  return [
    "# About",
    "",
    "Curious about how complex things break down into simple parts.",
    "",
    "I'm someone with an open mind, always learning and driven by curiosity about " +
      "how complex things break down into simple, manageable parts.",
    "",
    "My experience spans software fundamentals to ML, generative AI, computer vision, " +
      `analytics, data engineering, and visualization. Full work history: ${site.url}/work.`,
    "",
    heading("Education"),
    "",
    education
      .map(
        (e) =>
          `- **${e.institution}** - ${e.degree} (${e.start} - ${e.end}), GPA ${e.gpa}`,
      )
      .join("\n"),
    "",
    heading("Recognition"),
    "",
    achievements
      .map((a) => `- **${a.title}** (${a.year}) - ${a.detail}`)
      .join("\n"),
    "",
    API_NOTE,
  ].join("\n");
}

export function renderNowMarkdown(): string {
  const [latest] = nowUpdates;
  return [
    "# Now",
    "",
    "A dated log of what I'm building, learning, and looking forward to.",
    "",
    `## ${latest.date}`,
    "",
    latest.entries.map((e) => `- **${e.label}**: ${e.text}`).join("\n"),
    "",
    `> Live GitHub activity for this page is rendered client-side; see ${site.url}/now ` +
      "in a browser, or the public GitHub API for the raw feed.",
    "",
    API_NOTE,
  ].join("\n");
}

export function renderChangelogMarkdown(): string {
  return [
    "# Changelog",
    "",
    "This page reads directly from the site's git history - nothing is hand-picked or polished.",
    "",
    `> The commit log itself is fetched live from https://github.com/${site.repo} ` +
      "and is best read in a browser or via the GitHub API.",
    "",
    API_NOTE,
  ].join("\n");
}

export function renderHowThisWorksMarkdown(): string {
  return [
    "# How this works",
    "",
    "A portfolio that shows its work. Instead of just listing practices, technologies, " +
      "and skills, this site demonstrates them directly by implementing them.",
    "",
    heading("The pipeline"),
    "",
    "git push origin main -> lint (eslint) -> test (vitest) -> build (next.js) -> deploy (vercel)",
    "",
    "Every push to main runs this end to end. If any step fails, nothing deploys.",
    "",
    heading("Stack"),
    "",
    list([
      "Framework: Next.js (App Router, React Server Components, ISR)",
      "Language: TypeScript, strict",
      "Styling: Tailwind CSS v4 - design tokens in CSS, no UI kit",
      "Testing: Vitest - content integrity, formatting, API shapes",
      "CI/CD: GitHub Actions (lint + tests gate every deploy) -> Vercel",
      "Data: Typed TS content modules + GitHub REST API",
    ]),
    "",
    heading("Source"),
    "",
    `The source is public at https://github.com/${site.repo}.`,
    "",
    API_NOTE,
  ].join("\n");
}

export function renderApiDocsMarkdown(): string {
  const endpoints: Array<{ path: string; desc: string }> = [
    {
      path: "/api/resume",
      desc: "The whole resume as structured JSON - experience, education, projects, achievements, links.",
    },
    {
      path: "/api/projects",
      desc: "All projects, including the honest tradeoff notes shown on /work/projects.",
    },
    { path: "/api/experience", desc: "Work experience with highlights and stack per role." },
    {
      path: "/api/meta",
      desc: "Build metadata for the deployment you're talking to: commit, deploy number, test results.",
    },
  ];
  return [
    "# API",
    "",
    "This portfolio has a real, documented, read-only JSON API. Don't parse the HTML - use this.",
    "",
    `OpenAPI specification: ${site.url}/openapi.json`,
    "",
    endpoints.map((e) => `- \`GET ${e.path}\` - ${e.desc}`).join("\n"),
    "",
    "All endpoints are read-only, unauthenticated, and served statically.",
    "",
    API_NOTE,
  ].join("\n");
}

export function renderRoadmapMarkdown(): string {
  const byStatus = (status: string) => roadmap.filter((r) => r.status === status);
  return [
    "# Roadmap",
    "",
    "This site is a product, not a brochure. Everything below is a real commitment.",
    "",
    heading("In progress"),
    "",
    list(byStatus("in-progress").map((r) => `**${r.title}** - ${r.detail}`)),
    "",
    heading("Planned"),
    "",
    list(byStatus("planned").map((r) => `**${r.title}** - ${r.detail}`)),
    "",
    heading("Shipped"),
    "",
    list(byStatus("shipped").map((r) => `**${r.title}** - ${r.detail}`)),
    "",
    API_NOTE,
  ].join("\n");
}
