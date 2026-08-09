import Link from "next/link";

const views = [
  { href: "/work", label: "Experience" },
  { href: "/work/projects", label: "Projects" },
];

/** Segmented switch between the two halves of /work. Plain links - each view is
    its own static route, so it stays crawlable and works without JS. */
export function WorkTabs({ active }: { active: string }) {
  return (
    <div className="inline-flex gap-1 rounded-full border border-line bg-surface p-1 font-mono text-xs">
      {views.map((v) => {
        const isActive = v.href === active;
        return (
          <Link
            key={v.href}
            href={v.href}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-full bg-ink px-5 py-2 text-paper"
                : "rounded-full px-5 py-2 text-muted transition-colors hover:text-ink"
            }
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
