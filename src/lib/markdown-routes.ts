import {
  renderAboutMarkdown,
  renderApiDocsMarkdown,
  renderChangelogMarkdown,
  renderHomeMarkdown,
  renderHowThisWorksMarkdown,
  renderNowMarkdown,
  renderProjectsMarkdown,
  renderRoadmapMarkdown,
  renderWorkMarkdown,
} from "@/lib/markdown";

const renderers: Record<string, () => string> = {
  "/": renderHomeMarkdown,
  "/work": renderWorkMarkdown,
  "/work/projects": renderProjectsMarkdown,
  "/about": renderAboutMarkdown,
  "/now": renderNowMarkdown,
  "/changelog": renderChangelogMarkdown,
  "/how-this-works": renderHowThisWorksMarkdown,
  "/api-docs": renderApiDocsMarkdown,
  "/roadmap": renderRoadmapMarkdown,
};

/** Markdown rendition of a page route, or null if this path has none. */
export function getMarkdownForPath(pathname: string): string | null {
  const renderer = renderers[pathname];
  return renderer ? renderer() : null;
}
