export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  stack: string[];
  links: { github?: string; live?: string; linkedIn?: string };
  /** Honest engineering notes: what didn't work, what was traded away, and why. */
  tradeoffs: string[];
  featured: boolean;
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  start: string; // "YYYY-MM"
  end: string | null; // null = present
  summary: string;
  /** Short role descriptor for compact rows, e.g. "RAG pipelines on Azure OpenAI" */
  tagline?: string;
  highlights: string[];
  stack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  start: string;
  end: string;
  gpa: string;
  coursework: string[];
  recordUrl?: string;
}

export interface Achievement {
  slug: string;
  title: string;
  detail: string;
  year: number;
}

export interface NowUpdate {
  date: string; // "YYYY-MM-DD"
  /** One short line for the footer console, e.g. "building this site · learning multi-agent RL" */
  summary: string;
  entries: { label: string; text: string; href?: string }[];
}

export type RoadmapStatus = "shipped" | "in-progress" | "planned";

export interface RoadmapItem {
  title: string;
  detail: string;
  status: RoadmapStatus;
}
