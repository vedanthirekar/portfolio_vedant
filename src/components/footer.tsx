import { site } from "@/lib/site";
import { OpsPanel } from "./ops-panel";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="label mb-3">Contact</p>
            <h2 className="font-serif text-3xl tracking-tight">
              Open to opportunities, collaborations,
              <br />
              or just a chat about technology.
            </h2>
            <a href={`mailto:${site.email}`} className="link mt-4 inline-block text-lg">
              {site.email}
            </a>
          </div>
          <ul className="flex flex-col gap-2 font-mono text-xs text-muted">
            <li>
              <a href={site.resumeUrl} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
                resume ↗
              </a>
            </li>
            <li>
              <a href={site.social.github} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
                github ↗
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
                linkedin ↗
              </a>
            </li>
            <li>
              <a
                href={`https://github.com/${site.repo}`}
                className="transition-colors hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                view source of this site ↗
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-12">
          <OpsPanel />
          <p className="mt-4 font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} {site.name} — designed and built from scratch,
            shipped through its own CI/CD pipeline.
          </p>
        </div>
      </div>
    </footer>
  );
}
