import { describe, expect, it } from "vitest";
import { featuredProjects, projects } from "./projects";
import { experience } from "./experience";
import { education } from "./education";
import { achievements } from "./achievements";
import { roadmap } from "./roadmap";
import { nowUpdates } from "./now";

const YM = /^\d{4}-(0[1-9]|1[0-2])$/;

describe("projects", () => {
  it("have unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every project has at least one honest tradeoff note", () => {
    for (const p of projects) {
      expect(p.tradeoffs.length, `${p.slug} is missing tradeoffs`).toBeGreaterThan(0);
    }
  });

  it("exactly three projects are featured on the home page", () => {
    expect(featuredProjects).toHaveLength(3);
  });

  it("all links are https", () => {
    for (const p of projects) {
      for (const url of Object.values(p.links)) {
        expect(url).toMatch(/^https:\/\//);
      }
    }
  });
});

describe("experience", () => {
  it("uses valid YYYY-MM dates", () => {
    for (const e of experience) {
      expect(e.start).toMatch(YM);
      if (e.end !== null) expect(e.end).toMatch(YM);
    }
  });

  it("is ordered newest first", () => {
    const starts = experience.map((e) => e.start);
    expect(starts).toEqual([...starts].sort().reverse());
  });

  it("every role has highlights and a stack", () => {
    for (const e of experience) {
      expect(e.highlights.length).toBeGreaterThan(0);
      expect(e.stack.length).toBeGreaterThan(0);
    }
  });
});

describe("education and achievements", () => {
  it("education entries are complete", () => {
    expect(education.length).toBeGreaterThanOrEqual(2);
    for (const e of education) {
      expect(e.coursework.length).toBeGreaterThan(0);
      expect(e.gpa).toContain("4.0");
    }
  });

  it("achievements have years and details", () => {
    for (const a of achievements) {
      expect(a.year).toBeGreaterThan(2000);
      expect(a.detail.length).toBeGreaterThan(20);
    }
  });
});

describe("now updates", () => {
  it("use valid YYYY-MM-DD dates, sorted newest first", () => {
    for (const u of nowUpdates) {
      expect(u.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(u.date).getTime())).toBe(false);
    }
    const dates = nowUpdates.map((u) => u.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("every update has labeled, non-empty entries", () => {
    expect(nowUpdates.length).toBeGreaterThan(0);
    for (const u of nowUpdates) {
      expect(u.entries.length).toBeGreaterThan(0);
      for (const e of u.entries) {
        expect(e.label.length).toBeGreaterThan(0);
        expect(e.text.length).toBeGreaterThan(10);
      }
    }
  });
});

describe("roadmap", () => {
  it("has unique titles and valid statuses", () => {
    const titles = roadmap.map((r) => r.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const r of roadmap) {
      expect(["shipped", "in-progress", "planned"]).toContain(r.status);
    }
  });
});
