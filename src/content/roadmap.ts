import type { RoadmapItem } from "./types";

// The public roadmap for this site itself. Items move down this file as they ship.
// GitHub-issues-driven roadmap is itself on the roadmap.
export const roadmap: RoadmapItem[] = [
  {
    title: "v1 - The observable portfolio",
    detail:
      "Control-room home with a real CI/CD pipeline, live ops panel, changelog, architecture docs, and a public JSON API.",
    status: "in-progress",
  },
  {
    title: "Now page + live GitHub activity",
    detail:
      "A dated personal log of what I'm building and learning, backed by my real-time public GitHub activity feed.",
    status: "in-progress",
  },
  {
    title: "Status & uptime page",
    detail: "Real external monitoring with a public SaaS-style status page.",
    status: "planned",
  },
  {
    title: "Lighthouse scores over time",
    detail:
      "Performance and accessibility tracked in CI on every deploy, graphed publicly.",
    status: "planned",
  },
  {
    title: "Semantic search",
    detail:
      "Embedding-based search over projects and notes - a lightweight, inspectable retrieval demo.",
    status: "planned",
  },
  {
    title: "Glass-box AI chatbot",
    detail:
      "A chatbot about my work that shows its retrieval chunks, prompt, and latency instead of hiding them.",
    status: "planned",
  },
  {
    title: "npx vedant",
    detail: "An npm package that prints my resume card in your terminal.",
    status: "planned",
  },
  {
    title: "Notes / TIL section",
    detail: "Short engineering notes from things I'm learning and building.",
    status: "planned",
  },
  {
    title: "Roadmap driven by GitHub issues",
    detail:
      "Replace this hand-written list with live GitHub issues, labels, and states.",
    status: "planned",
  },
  {
    title: "Public analytics",
    detail:
      "Privacy-friendly analytics with the dashboard exposed to every visitor.",
    status: "planned",
  },
];
