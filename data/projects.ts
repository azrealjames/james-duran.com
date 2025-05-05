// data/projects.ts

export interface Project {
  title: string
  description: string
  techStack: string[]
  image?: string
  link?: string
  repo?: string
}

export const projects: Project[] = [
  {
    title: "SEO Meta Tag Analyzer",
    description:
      "A web app that lets users enter any URL and see how its meta tags appear on Google and social platforms, with feedback on SEO optimization. Great for marketers and developers.",
    techStack: ["Next.js", "TypeScript", "OpenGraph"],
    image: "/images/seo-analyzer.png",
    repo: "https://v0-seo-tag-analyzer-app.vercel.app/",
  },
  {
    title: "Hovey Painting Landing Page",
    description:
      "A clean, mobile-first landing page designed to help Hovey Painting collect leads, showcase their services, and convert visitors with clear CTAs.",
    techStack: ["Next.js", "Tailwind CSS"],
    image: "/images/hoveypainting.jpg",
    link: "https://vercel.com/james-projects-d3932d6d/v0-hovey-painting-landing-page",
  },
  {
    title: "Contractor Estimate Tool",
    description:
      "A fast and intuitive app for contractors to create accurate project estimates, calculate labor and materials, and generate downloadable quotes for clients.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "/images/contractorestimatetool.png",
    link: "https://v0-contractor-estimate-tool.vercel.app/",
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website built with Next.js, React, and Tailwind CSS. Features include dark mode, interactive particle animations, and contact form functionality.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    image: "/images/portfolio-screenshot.png",
    repo: "https://github.com/azrealjames/portfolio",
  },
]
