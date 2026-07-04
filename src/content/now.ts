import type { NowUpdate } from "./types";

// Dated, personal-but-career-safe updates. Newest first. Each new entry is a
// commit, so the changelog doubles as proof these are written when dated.
// NOTE: first update drafted for launch — edit so it sounds like you.
export const nowUpdates: NowUpdate[] = [
  {
    date: "2026-07-04",
    summary: "building this site · learning multi-agent RL",
    entries: [
      {
        label: "building",
        text: "This site — rebuilding my portfolio as a piece of software that shows its own engineering: live pipeline, public API, changelog and all.",
      },
      {
        label: "learning",
        text: "Multi-agent systems and reinforcement learning through my research work at Indiana University — how agents coordinate (and fail to) fascinates me.",
      },
      {
        label: "practicing",
        text: "Daily DSA problems — the commit feed below doesn't lie about whether I actually showed up.",
      },
      {
        label: "looking forward to",
        text: "Finishing my M.S. in 2026 and finding a team where I can build AI systems that real people rely on.",
      },
    ],
  },
];

export const latestNow = nowUpdates[0];
