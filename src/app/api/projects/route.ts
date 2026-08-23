import { projects } from "@/content/projects";
import { methodNotAllowed } from "@/lib/api";

export const dynamic = "force-static";

export function GET() {
  return Response.json({ count: projects.length, projects });
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
