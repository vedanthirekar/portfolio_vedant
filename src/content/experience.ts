import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    slug: "methix",
    company: "Methix",
    role: "AI Developer Intern",
    start: "2025-06",
    end: "2025-12",
    summary:
      "Worked on a retrieval-augmented AI assistant for artists — integrating internal knowledge sources, structured artist data, and cloud-based LLM pipelines on Azure.",
    tagline: "RAG pipelines on Azure OpenAI",
    highlights: [
      "Built a RAG pipeline with Azure OpenAI and LangChain over 100+ internal documents stored in Azure Blob Storage.",
      "Implemented prompt-driven retrieval and NoSQL queries over 200+ JSON artist profiles in Azure Cosmos DB.",
      "Tuned Azure deployments and inference settings to optimize AI search pipelines and reduce cloud costs.",
    ],
    stack: ["Azure OpenAI", "LangChain", "RAG", "Azure", "CI/CD"],
  },
  {
    slug: "parallel-wireless",
    company: "Parallel Wireless",
    role: "SMO Intern",
    start: "2024-02",
    end: "2024-07",
    summary:
      "Enhanced front-end performance by debugging production UI issues and automating GUI validation with unit tests, reducing manual testing and speeding up feature iterations.",
    tagline: "Angular performance & Jest test automation",
    highlights: [
      "Diagnosed and fixed front-end performance and rendering issues in production Angular components.",
      "Added unit tests with Jest to automate GUI validation and reduce manual testing effort.",
    ],
    stack: ["Angular", "JavaScript", "HTML/CSS", "Jest"],
  },
  {
    slug: "krios",
    company: "Krios Info Solutions",
    role: "Data Science Intern",
    start: "2023-03",
    end: "2023-05",
    summary:
      "Developed a retail sales forecasting system using time-series analysis, and built interactive Power BI dashboards that turned complex data into actionable insights for stakeholders.",
    tagline: "Sales forecasting & Power BI dashboards",
    highlights: [
      "Prepared and transformed historical sales data for 300+ SKUs into a model-ready dataset.",
      "Assisted in evaluating forecasting models through validation, hyperparameter tuning, and error analysis.",
      "Built Power BI dashboards to compare SKU-level forecasts with historical sales and highlight seasonal trends.",
    ],
    stack: ["Python", "Power BI", "Time Series", "Data Preprocessing"],
  },
];
