import { describe, expect, it } from "vitest";
import { prefersMarkdown } from "./negotiate";

describe("prefersMarkdown", () => {
  it("is false with no Accept header", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown(undefined)).toBe(false);
  });

  it("is true for an exclusive text/markdown request (acceptmarkdown.com case)", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
  });

  it("is false for a plain browser Accept header", () => {
    expect(
      prefersMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),
    ).toBe(false);
  });

  it("is false for a bare wildcard request", () => {
    expect(prefersMarkdown("*/*")).toBe(false);
  });

  it("prefers whichever type has the higher q-value", () => {
    expect(prefersMarkdown("text/markdown;q=0.5, text/html;q=0.9")).toBe(false);
    expect(prefersMarkdown("text/markdown;q=0.9, text/html;q=0.5")).toBe(true);
  });

  it("breaks equal-q ties by order in the header", () => {
    expect(prefersMarkdown("text/markdown, text/html")).toBe(true);
    expect(prefersMarkdown("text/html, text/markdown")).toBe(false);
  });

  it("treats a markdown-only Accept as preferred even with a trailing wildcard", () => {
    expect(prefersMarkdown("text/markdown, */*;q=0.1")).toBe(true);
  });
});
