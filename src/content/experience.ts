import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    slug: "project-990",
    company: "Project 990",
    role: "AI Engineer",
    start: "2026-01",
    end: null,
    summary:
      "Designing and productionizing a multi-stage LLM pipeline on HPC that generates mission statements for 175,000+ nonprofits from IRS Form 990-EZ data, powering downstream analytics and grantor–grantee matching.",
    tagline: "LLM pipelines on HPC, at 175k+ scale",
    highlights: [
      "Designed and deployed a 3-stage LLM pipeline on HPC using Mistral-7B for generation and Gemma-7B for evaluation across 175,000+ nonprofits.",
      "Built a fallback architecture integrating organization descriptions and grant-purpose data, raising mission-statement coverage from 50% to 93.5% across 163,700+ organizations.",
      "Productionized the pipeline with Slurm job scheduling, fault-tolerant checkpointing, and a config/model-agnostic design for end-to-end automated execution.",
    ],
    stack: ["LLMs", "HPC", "Slurm", "Mistral-7B", "Python"],
  },
  {
    slug: "ai-cybersecurity-research",
    company: "Indiana University",
    role: "Research Assistant — AI in Cybersecurity",
    start: "2025-06",
    end: "2025-12",
    summary:
      "Researched multi-agent reinforcement learning for autonomous cyber defense in the CAGE Challenge 4 environment — training and evaluating agents that detect and respond to threats.",
    tagline: "Multi-agent RL for cyber defense",
    highlights: [
      "Applied, trained, and evaluated RL algorithms from Stable-Baselines3 and RLlib in a multi-agent reinforcement learning (MARL) environment, CAGE Challenge 4.",
      "Designed reward-shaping strategies with additional reward signals to improve agent behavior, stability, and threat-detection performance in simulated adversarial scenarios.",
    ],
    stack: ["Reinforcement Learning", "MARL", "Stable-Baselines3", "RLlib", "PyTorch"],
  },
  {
    slug: "methix",
    company: "Methix",
    role: "AI Developer Intern",
    start: "2025-06",
    end: "2025-12",
    summary:
      "Built an artist-management agentic AI system — a personal manager for music artists with retrieval, scheduling, and outreach capabilities on Azure.",
    tagline: "Agentic AI on Azure OpenAI",
    highlights: [
      "Developed an agentic AI system using Azure OpenAI and LangChain with tool-use capabilities: RAG across 100+ documents, scheduling, and outreach.",
      "Engineered the data retrieval layer for an AI search feature, writing SQL template queries to fetch and rank 200+ artist profiles against real-time user queries.",
      "Optimized AI pipelines and deployments in Azure AI Foundry by analyzing usage and storage tiers, reducing production cost by 20% while maintaining reliability.",
    ],
    stack: ["Azure OpenAI", "LangChain", "Agentic AI", "RAG", "SQL"],
  },
  {
    slug: "parallel-wireless",
    company: "Parallel Wireless",
    role: "Software Engineering Intern",
    start: "2024-02",
    end: "2024-07",
    summary:
      "Debugged and resolved production defects in React and TypeScript applications, and automated GUI validation with Jest — improving stability, coverage, and frontend performance.",
    tagline: "React/TypeScript debugging & Jest automation",
    highlights: [
      "Debugged and resolved production software defects in React and TypeScript applications, improving reliability and user experience in an Agile environment.",
      "Developed and maintained Jest unit-testing suites, improving application stability, test coverage, and frontend performance by 30%.",
    ],
    stack: ["React", "TypeScript", "Jest", "Agile"],
  },
  {
    slug: "krios",
    company: "Krios Info Solutions",
    role: "Data Science Intern",
    start: "2023-02",
    end: "2023-05",
    summary:
      "Built a retail demand-forecasting system over 5+ years of daily sales data for 300+ SKUs, with Power BI dashboards that turned forecasts into stakeholder decisions.",
    tagline: "Sales forecasting & Power BI dashboards",
    highlights: [
      "Cleaned and transformed 5+ years of daily sales data for 300+ SKUs using Python and Pandas into a model-ready dataset for demand forecasting.",
      "Improved forecasting accuracy by 10% through ensemble architectures and hyperparameter tuning via cross-validation and grid search.",
      "Designed and maintained 5+ interactive Power BI dashboards visualizing sales trends, seasonal patterns, and forecast accuracy for stakeholders.",
    ],
    stack: ["Python", "Pandas", "Power BI", "Time Series"],
  },
];
