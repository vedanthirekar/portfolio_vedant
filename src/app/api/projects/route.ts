import { projects } from "@/content/projects";

export const dynamic = "force-static";

export function GET() {
  return Response.json({ count: projects.length, projects });
}
