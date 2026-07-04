import { site } from "@/lib/site";
import { OpsPanel } from "./ops-panel";

export function Footer() {
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-[1360px] px-6 pb-24 sm:px-12">
        <OpsPanel />
        <p className="mt-8 text-center font-mono text-[11px] text-muted">
          Every engineering practice on my resume runs live on this site —{" "}
          <a
            href={`https://github.com/${site.repo}`}
            className="text-accent underline underline-offset-4 hover:text-ink"
            target="_blank"
            rel="noreferrer"
          >
            audit it yourself
          </a>
          .
        </p>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-[11px] text-muted">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
            {site.email}
          </a>
          <a href={site.social.github} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
            github
          </a>
          <a href={site.social.linkedin} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a href={site.resumeUrl} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
            resume
          </a>
        </p>
      </div>
    </footer>
  );
}
