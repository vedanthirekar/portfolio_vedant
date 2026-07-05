import type { Project } from "./types";

// NOTE: `tradeoffs` entries are honest engineering notes shown publicly on /work.
// Drafted from project context - review and edit so every line is true.
export const projects: Project[] = [
  {
    slug: "ncaa-analytics-1",
    name: "NCAA Analytics Challenge",
    oneLiner:
      "Won the NCAA Final Four Analytics Challenge - Predicting seeds for 2026 NCAA March Madness.",
    description:
      "Predicted NCAA Tournament seedings for over 360 college basketball teams using five seasons of historical data. The real challenge was reverse-engineering how the selection committee weighs NET rankings, quadrant records, and conference strength. We built a seven-model gradient-boosting ensemble over 104 engineered features that reached 78% accuracy, cutting prediction error by 43% versus the baseline. I then used Tableau dashboards to turn the findings into a clear narrative for NCAA stakeholders.",
    stack: ["Machine Learning", "Gradient Boosting", "Feature Engineering", "Tableau"],
    links: {
      linkedIn:
        "https://www.linkedin.com/posts/vedanthirekar_ncaafinalfour-analytics-challenge-activity-7101870919055691776-0g7A?utm_source=share&utm_medium=member_desktop",
      github: "https://github.com/vedanthirekar/NCAA-Final-Four-Analytics-Challenge",
    },
    tradeoffs: [
      "Minimizing RMSE on seeds sounds clean on paper, but committee logic is inconsistent - most of the work was iterative error analysis to find where the model was systematically wrong, then encoding those patterns as features.",
      "The Tableau narrative ended up mattering as much as the model when presenting to judges - a lesson in how far accuracy alone gets you.",
    ],
    featured: true,
  },
  {
    slug: "yanck",
    name: "Yanck",
    oneLiner: "No-code RAG chatbot platform for teams with zero ML engineers.",
    description:
      "Created a platform that lets non-technical users create and deploy AI assistants on their own data through a guided workflow: upload documents, generate embeddings, and serve responses through Google Gemini. The hardest part was making integration painless for whoever handled it on the client's side, so we shipped three deployment paths: an embeddable JS widget, an iframe, and a REST API with key-based auth.",
    stack: ["LangChain", "Google Gemini", "RAG", "Flask"],
    links: { github: "https://github.com/vedanthirekar/Yanck" },
    tradeoffs: [
      "Chose a guided linear workflow over a flexible node editor - less powerful, but non-technical users finished setup instead of abandoning it.",
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
      "Built an interactive dashboard that lets users explore global development trends across economic, social, environmental, governance, and technology indicators through dynamic visualizations and scenario analysis. We built it for a real client, The Millennium Project.",
    stack: ["Data Visualization", "Plotly", "Python", "Data Pre-processing"],
    links: {
      github: "https://github.com/vedanthirekar/SOFI-2035-Info-Viz-Project",
      live: "https://sofi2035.pythonanywhere.com/",
    },
    tradeoffs: [
      "Server-rendered Plotly charts kept development fast but make first load heavier than a hand-rolled D3 build would be.",
      "Scenario analysis is precomputed rather than live - simpler and more reliable on free-tier hosting, at the cost of interactivity.",
    ],
    featured: true,
  },
  {
    slug: "healthcare-data-pipeline",
    name: "Healthcare Data Pipeline",
    oneLiner:
      "ETL pipeline standardizing patient and device data, with live monitoring dashboards.",
    description:
      "I engineeredan end-to-end pipeline using Spark and Airflow to standardize FHIR patient and device data landing in AWS S3. I connected Tableau dashboards to live MySQL pipelines so the team could monitor throughput and utilization metrics in real time.",
    stack: ["Airflow", "PySpark", "AWS S3", "Tableau", "FHIR"],
    links: {
      github: "https://github.com/vedanthirekar/healthcare-data-pipeline",
    },
    tradeoffs: [
      "Spark is overkill for the demo data volume; it was used deliberately to exercise the same tooling that production-scale volumes need.",
      "Live MySQL-backed dashboards demo well but need connection pooling and caching before they'd survive real concurrent load.",
    ],
    featured: false,
  },
  {
    slug: "expense-tracker",
    name: "AI Expense Tracker",
    oneLiner:
      "Voice-driven expense tracking with semantic categorization at 92% accuracy.",
    description:
      "I built a FastAPI backend for an AI-powered expense tracker that supports voice-based transaction processing and real-time categorization. Categorized expenses semantically using BERT embeddings with Qdrant vector search, reaching 92% classification accuracy, and added Power BI dashboards for time-series spending forecasts. The project evolved from Yafa, my GeeksforGeeks Hackathon winner.",
    stack: ["FastAPI", "BERT", "Qdrant", "Time Series", "Power BI"],
    links: {
      github: "https://github.com/vedanthirekar/Yafa-Personal-Finance-Manager",
    },
    tradeoffs: [
      "Voice-to-text accuracy drops with background noise and accents; a confirmation step was added rather than chasing model accuracy.",
      "Embedding-based categorization beats rules at 92%, but the last 8% is ambiguous even to humans - a category-correction flow mattered more than model tuning.",
    ],
    featured: false,
  },
  {
    slug: "optical-music-recognition",
    name: "Optical Music Recognition",
    oneLiner: "Computer vision system that digitizes sheet music from images.",
    description:
      "Implemented a computer vision system that detects and digitizes music notes from images of sheet music. It uses image processing and pattern recognition to convert physical sheets into editable digital formats.",
    stack: ["Computer Vision", "OpenCV", "Python", "Image Processing"],
    links: {},
    tradeoffs: [
      "Classical template matching over a learned model - explainable and training-data-free, but it degrades on handwritten or low-quality scans.",
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
