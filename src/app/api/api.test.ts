import { describe, expect, it } from "vitest";
import { GET as getProjects } from "./projects/route";
import { GET as getExperience } from "./experience/route";
import { GET as getResume } from "./resume/route";
import { GET as getMeta } from "./meta/route";

describe("public API", () => {
  it("/api/projects returns all projects with tradeoffs", async () => {
    const body = await getProjects().json();
    expect(body.count).toBe(body.projects.length);
    expect(body.projects[0]).toHaveProperty("tradeoffs");
  });

  it("/api/experience returns roles with highlights", async () => {
    const body = await getExperience().json();
    expect(body.count).toBeGreaterThan(0);
    expect(body.experience[0]).toHaveProperty("highlights");
  });

  it("/api/resume aggregates every content section", async () => {
    const body = await getResume().json();
    for (const key of [
      "name",
      "email",
      "links",
      "experience",
      "education",
      "projects",
      "achievements",
    ]) {
      expect(body, `missing ${key}`).toHaveProperty(key);
    }
  });

  it("/api/meta exposes build info for this deployment", async () => {
    const body = await getMeta().json();
    expect(body).toHaveProperty("build");
    expect(body.build).toHaveProperty("sha");
    expect(body.repo).toMatch(/^https:\/\/github\.com\//);
  });
});
