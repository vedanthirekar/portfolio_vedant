import { describe, expect, it } from "vitest";
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
} from "./markdown";
import { getMarkdownForPath } from "./markdown-routes";

const renderers = {
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

describe("markdown renderers", () => {
  for (const [path, render] of Object.entries(renderers)) {
    it(`${path} produces a real markdown document`, () => {
      const md = render();
      expect(md.startsWith("# ")).toBe(true);
      expect(md.length).toBeGreaterThan(200);
      expect(md).toContain("/api");
    });
  }

  it("home page mirrors featured projects and experience", () => {
    const md = renderHomeMarkdown();
    expect(md).toContain("## Selected work");
    expect(md).toContain("## Experience");
  });
});

describe("getMarkdownForPath", () => {
  it("resolves a known path", () => {
    expect(getMarkdownForPath("/")).toContain("# Vedant Hirekar");
  });

  it("returns null for a path with no markdown mirror", () => {
    expect(getMarkdownForPath("/does-not-exist")).toBeNull();
  });
});
