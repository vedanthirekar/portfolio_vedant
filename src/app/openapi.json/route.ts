import { site } from "@/lib/site";

export const dynamic = "force-static";

const errorSchema = {
  type: "object",
  properties: {
    error: {
      type: "object",
      properties: {
        code: { type: "string" },
        message: { type: "string" },
        hint: { type: "string" },
        docs: { type: "string", format: "uri" },
      },
      required: ["code", "message", "docs"],
    },
  },
  required: ["error"],
};

const errorResponses = {
  "404": {
    description: "No endpoint at this path.",
    content: { "application/json": { schema: errorSchema } },
  },
  "405": {
    description: "This endpoint only supports GET.",
    content: { "application/json": { schema: errorSchema } },
  },
};

function jsonEndpoint(summary: string, schemaRef: string) {
  return {
    get: {
      summary,
      operationId: summary.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
      responses: {
        "200": {
          description: summary,
          content: {
            "application/json": { schema: { $ref: schemaRef } },
          },
        },
        ...errorResponses,
      },
    },
  };
}

export function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: `${site.name} - Portfolio API`,
      description:
        "Read-only, unauthenticated JSON API backing this portfolio. Every " +
        "endpoint here is generated from the same typed content that renders " +
        "the site, so the API can never disagree with the pages.",
      version: "1.0.0",
      contact: { name: site.name, email: site.email, url: site.url },
    },
    servers: [{ url: site.url }],
    paths: {
      "/api/resume": jsonEndpoint("Full resume as JSON", "#/components/schemas/Resume"),
      "/api/projects": jsonEndpoint(
        "Projects with tradeoffs",
        "#/components/schemas/ProjectsResponse",
      ),
      "/api/experience": jsonEndpoint(
        "Work experience",
        "#/components/schemas/ExperienceResponse",
      ),
      "/api/meta": jsonEndpoint(
        "Build metadata for the current deployment",
        "#/components/schemas/Meta",
      ),
    },
    components: {
      schemas: {
        Project: {
          type: "object",
          properties: {
            slug: { type: "string" },
            name: { type: "string" },
            oneLiner: { type: "string" },
            description: { type: "string" },
            stack: { type: "array", items: { type: "string" } },
            links: {
              type: "object",
              properties: {
                github: { type: "string", format: "uri" },
                live: { type: "string", format: "uri" },
                linkedIn: { type: "string", format: "uri" },
              },
            },
            tradeoffs: { type: "array", items: { type: "string" } },
            featured: { type: "boolean" },
          },
          required: ["slug", "name", "oneLiner", "description", "stack", "tradeoffs", "featured"],
        },
        Experience: {
          type: "object",
          properties: {
            slug: { type: "string" },
            company: { type: "string" },
            role: { type: "string" },
            start: { type: "string", example: "2026-01" },
            end: { type: "string", nullable: true, example: null },
            summary: { type: "string" },
            tagline: { type: "string" },
            highlights: { type: "array", items: { type: "string" } },
            stack: { type: "array", items: { type: "string" } },
          },
          required: ["slug", "company", "role", "start", "end", "highlights", "stack"],
        },
        Education: {
          type: "object",
          properties: {
            institution: { type: "string" },
            degree: { type: "string" },
            start: { type: "string" },
            end: { type: "string" },
            gpa: { type: "string" },
            coursework: { type: "array", items: { type: "string" } },
            recordUrl: { type: "string", format: "uri" },
          },
          required: ["institution", "degree", "start", "end", "gpa", "coursework"],
        },
        Achievement: {
          type: "object",
          properties: {
            slug: { type: "string" },
            title: { type: "string" },
            detail: { type: "string" },
            year: { type: "integer" },
          },
          required: ["slug", "title", "detail", "year"],
        },
        Resume: {
          type: "object",
          properties: {
            name: { type: "string" },
            role: { type: "string" },
            location: { type: "string" },
            email: { type: "string", format: "email" },
            links: { type: "object" },
            experience: { type: "array", items: { $ref: "#/components/schemas/Experience" } },
            education: { type: "array", items: { $ref: "#/components/schemas/Education" } },
            projects: { type: "array", items: { $ref: "#/components/schemas/Project" } },
            achievements: { type: "array", items: { $ref: "#/components/schemas/Achievement" } },
          },
        },
        ProjectsResponse: {
          type: "object",
          properties: {
            count: { type: "integer" },
            projects: { type: "array", items: { $ref: "#/components/schemas/Project" } },
          },
        },
        ExperienceResponse: {
          type: "object",
          properties: {
            count: { type: "integer" },
            experience: { type: "array", items: { $ref: "#/components/schemas/Experience" } },
          },
        },
        Meta: {
          type: "object",
          properties: {
            site: { type: "string", format: "uri" },
            repo: { type: "string", format: "uri" },
            build: { type: "object" },
            docs: { type: "string", format: "uri" },
          },
        },
        Error: errorSchema,
      },
    },
  };

  return Response.json(spec);
}
