import type { Achievement } from "./types";

export const achievements: Achievement[] = [
  {
    slug: "ncaa-analytics-challenge",
    title: "NCAA Final Four Analytics Challenge - Winner",
    detail:
      "Won by predicting tournament seedings for 360+ teams at 78% accuracy with a 7-model gradient-boosting ensemble over 104 engineered features, presented to NCAA stakeholders through Tableau dashboards.",
    year: 2026,
  },
  {
    slug: "innoquest-2025",
    title: "InnoQuest 2025 - Honorable Mention",
    detail:
      "Recognized by the Shoemaker Innovation Center at Indiana University for building an AI assistant builder that lets SMBs put AI on their own data in 3–4 simple steps.",
    year: 2025,
  },
  {
    slug: "geeksforgeeks-hackathon",
    title: "GeeksforGeeks Hackathon - Winner",
    detail:
      "Won with a personal finance app featuring AI-based voice-to-text expense logging and expense forecasting.",
    year: 2023,
  },
  {
    slug: "tedx-curator",
    title: "TEDx Curator",
    detail:
      "Organized a TEDx event - coordinating speakers and logistics, delivering talks to an audience of 500+.",
    year: 2023,
  },
];
