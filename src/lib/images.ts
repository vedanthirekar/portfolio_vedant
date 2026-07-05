import { existsSync } from "node:fs";
import { join } from "node:path";

// Image slots auto-activate: drop a file at the conventional path, commit,
// and the site picks it up at build time. No file → layouts render without it.

const PUBLIC = join(process.cwd(), "public");

function publicImage(relPath: string): string | null {
  return existsSync(join(PUBLIC, relPath)) ? `/${relPath.replace(/\\/g, "/")}` : null;
}

const EXTENSIONS = ["png", "jpg", "jpeg"];

function publicImageAnyExt(dir: string, basename: string): string | null {
  for (const ext of EXTENSIONS) {
    const found = publicImage(join(dir, `${basename}.${ext}`));
    if (found) return found;
  }
  return null;
}

/** Screenshot for a project card: public/images/projects/<slug>.(png|jpg|jpeg) */
export function projectImage(slug: string): string | null {
  return publicImageAnyExt(join("images", "projects"), slug);
}

/** Portrait for /about and the home photo card: public/images/vedant1.png */
export function aboutPhoto(): string | null {
  return publicImage(join("images", "vedant1.png"));
}

/** Photo for a recognition on /about: public/images/achievements/<slug>.(png|jpg|jpeg) */
export function achievementImage(slug: string): string | null {
  return publicImageAnyExt(join("images", "achievements"), slug);
}
