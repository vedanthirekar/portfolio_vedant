export const site = {
  name: "Vedant Hirekar",
  tagline:
    "I learn how software and AI systems work by building them — focusing on fundamentals, simplicity and real-world use.",
  role: "AI & Software Engineer",
  location: "Bloomington, Indiana",
  email: "hirekarvedant@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1VwShsSPygAX95dKRd0_J2OuiTmkjpEGJ/view?usp=sharing",
  social: {
    github: "https://github.com/vedanthirekar",
    linkedin: "https://www.linkedin.com/in/vedanthirekar",
  },
  /** GitHub repo that builds and deploys this site, as "owner/name". */
  repo: process.env.NEXT_PUBLIC_SITE_REPO ?? "vedanthirekar/portfolio3.0",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vedanthirekar.netlify.app",
} as const;
