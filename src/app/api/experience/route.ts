import { experience } from "@/content/experience";

export const dynamic = "force-static";

export function GET() {
  return Response.json({ count: experience.length, experience });
}
