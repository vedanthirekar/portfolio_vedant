export const site = {
  name: "Vedant Hirekar",
  tagline:
    "I learn how software and AI systems work by building them - focusing on fundamentals, simplicity and real-world use.",
  role: "AI & Software Engineer",
  location: "United States",
  email: "hirekarvedant@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1XkRM1RZVXhkPrnCbCCGE4r-8qs-4eTvN/view?usp=sharing",
  social: {
    github: "https://github.com/vedanthirekar",
    linkedin: "https://www.linkedin.com/in/vedanthirekar",
  },
  /** GitHub repo that builds and deploys this site, as "owner/name". */
  repo: process.env.NEXT_PUBLIC_SITE_REPO ?? "vedanthirekar/portfolio_vedant",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vedanthirekar.com",
} as const;
