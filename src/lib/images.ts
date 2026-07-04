import { existsSync } from "node:fs";
import { join } from "node:path";

// Image slots auto-activate: drop a file at the conventional path, commit,
// and the site picks it up at build time. No file → layouts render without it.

const PUBLIC = join(process.cwd(), "public");

function publicImage(relPath: string): string | null {
  return existsSync(join(PUBLIC, relPath)) ? `/${relPath.replace(/\\/g, "/")}` : null;
}

/** Screenshot for a project card: public/images/projects/<slug>.png */
export function projectImage(slug: string): string | null {
  return publicImage(join("images", "projects", `${slug}.png`));
}

/** Portrait for /about and the home photo card: public/images/vedant.jpg */
export function aboutPhoto(): string | null {
  return publicImage(join("images", "vedant.jpg"));
}
