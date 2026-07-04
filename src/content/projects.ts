import type { Project } from "./types";

// NOTE: `tradeoffs` entries are honest engineering notes shown publicly on /work.
// Drafted from project context — review and edit so every line is true.
export const projects: Project[] = [
  {
    slug: "yanck",
    name: "Yanck",
    oneLiner: "No-code AI assistant builder for resource-constrained SMBs.",
    description:
      "YANCK (Yet Another No-Code Killer) lets small businesses create AI assistants on their own data through a simple guided workflow: model selection, data upload, and prompt configuration. Built to lower the barrier for teams with no ML engineers on staff.",
    stack: ["Agentic AI", "LangChain", "RAG", "LLMs"],
    links: { github: "https://github.com/vedanthirekar/Yanck" },
    tradeoffs: [
      "Chose a guided linear workflow over a flexible node editor — less powerful, but SMB users finished setup instead of abandoning it.",
      "Retrieval quality depends heavily on how users chunk their uploads; automatic chunking heuristics are good enough, not great.",
    ],
    featured: true,
  },
  {
    slug: "sofi-2035",
    name: "SOFI 2035",
    oneLiner:
      "Interactive global-futures dashboard built for The Millennium Project.",
    description:
      "An interactive dashboard enabling users to explore global development trends across economic, social, environmental, governance, and technology indicators through dynamic visualizations and scenario analysis. Built for a real client, The Millennium Project.",
    stack: ["Data Visualization", "Plotly", "Python", "Data Pre-processing"],
    links: {
      github: "https://github.com/vedanthirekar/SOFI-2035-Info-Viz-Project",
      live: "https://sofi2035.pythonanywhere.com/",
    },
    tradeoffs: [
      "Server-rendered Plotly charts kept development fast but make first load heavier than a hand-rolled D3 build would be.",
      "Scenario analysis is precomputed rather than live — simpler and more reliable on free-tier hosting, at the cost of interactivity.",
    ],
    featured: true,
  },
  {
    slug: "healthcare-data-pipeline",
    name: "Healthcare Data Pipeline",
    oneLiner:
      "Automated ETL pipeline turning FHIR patient bundles into analytics-ready data.",
    description:
      "An end-to-end orchestrated ETL pipeline that detects incoming FHIR (HL7) patient bundles, extracts and transforms the clinical information, and outputs structured CSVs ready for downstream analytics tools like Tableau or Power BI.",
    stack: ["Airflow", "PySpark", "FHIR / HL7", "Data Engineering"],
    links: {
      github: "https://github.com/vedanthirekar/healthcare-data-pipeline",
    },
    tradeoffs: [
      "CSV output was chosen over a warehouse target so the pipeline stays portable for demos — a real deployment would land in a proper analytical store.",
      "PySpark is overkill for the demo data volume; it was used deliberately to exercise the same tooling that production-scale volumes need.",
    ],
    featured: true,
  },
  {
    slug: "yafa",
    name: "Yafa",
    oneLiner: "AI-powered personal finance manager with voice expense logging.",
    description:
      "An intelligent finance application featuring AI-enabled voice recognition and NLP for seamless expense tracking. Provides expense analysis, spending patterns, and personalized investment recommendations. Won the GeeksforGeeks Hackathon.",
    stack: ["NLP", "AI/ML", "Power BI", "SQL", "Python"],
    links: {
      github: "https://github.com/vedanthirekar/Yafa-Personal-Finance-Manager",
    },
    tradeoffs: [
      "Voice-to-text accuracy drops with background noise and accents; a confirmation step was added rather than chasing model accuracy under hackathon time pressure.",
    ],
    featured: false,
  },
  {
    slug: "optical-music-recognition",
    name: "Optical Music Recognition",
    oneLiner: "Computer vision system that digitizes sheet music from images.",
    description:
      "A computer vision system that detects and digitizes music notes from images of sheet music, using image processing and pattern recognition to convert physical sheets into editable digital formats.",
    stack: ["Computer Vision", "OpenCV", "Python", "Image Processing"],
    links: {},
    tradeoffs: [
      "Classical template matching over a learned model — explainable and trainable-data-free, but it degrades on handwritten or low-quality scans.",
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
