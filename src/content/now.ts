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
        text: "Project 990 — productionizing a multi-stage LLM pipeline on HPC that generates mission statements for 175,000+ nonprofits from IRS filings. Scale, checkpointing, Slurm, the whole thing.",
      },
      {
        label: "building",
        text: "This site — rebuilding my portfolio as a piece of software that shows its own engineering: live pipeline, public API, changelog and all.",
      },
      {
        label: "learning",
        text: "Multi-agent reinforcement learning, carried over from my cyber-defense research at Indiana University — how agents coordinate (and fail to) fascinates me.",
      },
      {
        label: "practicing",
        text: "Daily DSA problems — the commit feed below doesn't lie about whether I actually showed up.",
      },
      {
        label: "staying current",
        text: "AI Twitter (algorithm well-trained by now), plus The Batch and TLDR AI for the weekly signal-over-noise pass.",
      },
      {
        label: "looking forward to",
        text: "Finishing my M.S. in 2026 and finding a team where I can keep shipping AI systems that real people rely on.",
      },
    ],
  },
];

export const latestNow = nowUpdates[0];
