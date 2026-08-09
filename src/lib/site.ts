export const site = {
  name: "Vedant Hirekar",
  tagline:
    "I like understanding systems from the inside out - usually by building them. AI & Software Engineer, currently at Project 990.",
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
