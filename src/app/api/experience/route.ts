import { experience } from "@/content/experience";
import { methodNotAllowed } from "@/lib/api";

export const dynamic = "force-static";

export function GET() {
  return Response.json({ count: experience.length, experience });
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
