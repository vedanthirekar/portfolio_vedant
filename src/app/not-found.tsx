import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/work/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/api-docs", label: "API docs" },
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/llms.txt", label: "llms.txt" },
];

export default function NotFound() {
  return (
    <div className="py-16 sm:py-24">
      <p className="label mb-6">404</p>
      <h1 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
        This page <em className="text-muted">doesn&apos;t exist.</em>
      </h1>
      <p className="mt-6 max-w-xl leading-relaxed text-muted">
        Nothing lives at this path. It was never published, or it moved. Here&apos;s
        where to look next:
      </p>
      <ul className="mt-8 max-w-xl space-y-2 font-mono text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link">
              {site.url}
              {l.href === "/" ? "" : l.href}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
        Looking for data instead of a page? The full site content is also
        served as JSON at{" "}
        <Link href="/api-docs" className="link">
          /api
        </Link>
        , documented at{" "}
        <Link href="/openapi.json" className="link">
          /openapi.json
        </Link>
        .
      </p>
    </div>
  );
}
