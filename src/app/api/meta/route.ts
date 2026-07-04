import { site } from "@/lib/site";
import { buildInfo } from "@/lib/build-info";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    site: site.url,
    repo: `https://github.com/${site.repo}`,
    build: buildInfo,
    docs: `${site.url}/api-docs`,
  });
}
