import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { achievements } from "@/content/achievements";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    name: site.name,
    role: site.role,
    location: site.location,
    email: site.email,
    links: { ...site.social, resume: site.resumeUrl, site: site.url },
    experience,
    education,
    projects,
    achievements,
  });
}
