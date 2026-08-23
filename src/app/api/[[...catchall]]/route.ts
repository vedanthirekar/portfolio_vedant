import { NextRequest } from "next/server";
import { apiNotFound } from "@/lib/api";

/** Catches any /api/* path that doesn't match a real endpoint and returns a
 * structured JSON 404 instead of the site's HTML not-found page - agents
 * calling the API can't parse an HTML error. */
function notFound(request: NextRequest) {
  return apiNotFound(request.nextUrl.pathname);
}

export const GET = notFound;
export const POST = notFound;
export const PUT = notFound;
export const PATCH = notFound;
export const DELETE = notFound;
