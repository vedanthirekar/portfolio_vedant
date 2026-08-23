import { site } from "@/lib/site";
import { buildInfo } from "@/lib/build-info";
import { methodNotAllowed } from "@/lib/api";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    site: site.url,
    repo: `https://github.com/${site.repo}`,
    build: buildInfo,
    docs: `${site.url}/api-docs`,
  });
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
