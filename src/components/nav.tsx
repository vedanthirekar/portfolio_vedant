import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/work", label: "work" },
  { href: "/now", label: "now" },
  { href: "/about", label: "about" },
  { href: "/changelog", label: "changelog" },
  { href: "/roadmap", label: "roadmap" },
  { href: "/how-this-works", label: "how this works" },
  { href: "/api-docs", label: "api" },
];

export function Nav() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-6 py-5">
        <Link href="/" className="font-medium tracking-tight">
          {site.name}
        </Link>
        <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-xs text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
