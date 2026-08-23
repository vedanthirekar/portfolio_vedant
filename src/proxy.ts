import { NextRequest, NextResponse } from "next/server";
import { prefersMarkdown } from "@/lib/negotiate";
import { getMarkdownForPath } from "@/lib/markdown-routes";

export const config = {
  // Every page route except API routes, Next internals, and static files
  // (anything with a file extension).
  matcher: ["/((?!api/|_next/|.*\\..*).*)"],
};

export function proxy(request: NextRequest) {
  if (prefersMarkdown(request.headers.get("accept"))) {
    const markdown = getMarkdownForPath(request.nextUrl.pathname);
    if (markdown) {
      return new NextResponse(markdown, {
        status: 200,
        headers: {
          "content-type": "text/markdown; charset=utf-8",
          vary: "Accept, Accept-Encoding",
        },
      });
    }
  }

  // Next.js's App Router owns the Vary header for normal page/route
  // responses (it always rewrites it to its own RSC-negotiation tokens), so
  // a value set here on the pass-through response doesn't survive. Only the
  // markdown short-circuit above can carry a custom Vary header.
  return NextResponse.next();
}
