import type { NowUpdate } from "./types";

// Dated, personal-but-career-safe updates. Newest first. Each new entry is a
// commit, so the changelog doubles as proof these are written when dated.
export const nowUpdates: NowUpdate[] = [
  {
    date: "2026-07-04",
    summary: "shipping LLM pipelines at Project 990 · building this site",
    entries: [
      {
        label: "working on",
        text: "Project 990 - testing and verifying a multi-stage LLM pipeline on HPC that generates mission statements for 175,000+ nonprofits from IRS filings, and exploring GAT models for a grantor-grantee recommender system.",
      },
      {
        label: "building",
        text: "This site - rebuilding my portfolio as a piece of software that shows its own engineering: live pipeline, public API, changelog and all.",
      },
      {
        label: "learning",
        text: "System design - working through how real systems handle scale, failure, and tradeoffs beyond what a single script needs to.",
      },
      {
        label: "practicing",
        text: "Daily DSA problems - the commit feed below doesn't lie about whether I actually showed up.",
        href: "https://leetcode.com/u/vedanthirekar/",
      },
    ],
  },
];

export const latestNow = nowUpdates[0];
