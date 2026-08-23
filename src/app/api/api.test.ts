import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { GET as getProjects, POST as postProjects } from "./projects/route";
import { GET as getExperience, DELETE as deleteExperience } from "./experience/route";
import { GET as getResume, PUT as putResume } from "./resume/route";
import { GET as getMeta, PATCH as patchMeta } from "./meta/route";
import { GET as catchAll } from "./[[...catchall]]/route";
import { GET as getOpenApi } from "../openapi.json/route";

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

describe("API errors are structured JSON", () => {
  it("rejects unsupported methods with a 405 and an error body", async () => {
    for (const res of [
      postProjects(),
      deleteExperience(),
      putResume(),
      patchMeta(),
    ]) {
      const response = res;
      expect(response.status).toBe(405);
      expect(response.headers.get("content-type")).toContain("application/json");
      const body = await response.json();
      expect(body.error.code).toBe("method_not_allowed");
      expect(body.error).toHaveProperty("message");
      expect(body.error).toHaveProperty("docs");
    }
  });

  it("returns a JSON 404 for unknown API paths instead of the HTML not-found page", async () => {
    const request = new NextRequest("https://vedanthirekar.com/api/does-not-exist");
    const response = catchAll(request);
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    const body = await response.json();
    expect(body.error.code).toBe("not_found");
    expect(body.error.message).toContain("/api/does-not-exist");
    expect(body.error).toHaveProperty("hint");
  });
});

describe("/openapi.json", () => {
  it("publishes a valid OpenAPI 3.1 document covering every endpoint", async () => {
    const spec = await getOpenApi().json();
    expect(spec.openapi).toMatch(/^3\.1/);
    for (const path of ["/api/resume", "/api/projects", "/api/experience", "/api/meta"]) {
      expect(spec.paths, `missing ${path}`).toHaveProperty(path);
      expect(spec.paths[path].get.responses).toHaveProperty("200");
    }
  });
});
