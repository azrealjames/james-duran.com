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
    image: "/images/hoveypainting.png",
    link: "https://www.hoveypainting.com",
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
    title: "Gig Analyzer App",
    description:
      "An Android overlay app that helps rideshare drivers make smarter ride decisions. Displays a floating button to classify incoming ride offers as Green ($1.20+/mi), Yellow ($1.00–$1.19/mi), or Red (<$1.00/mi) based on real-time trip data.",
    techStack: ["React Native", "Kotlin (Overlay Module)", "Android Accessibility API"],
    image: "/uber-overlay.png",
    repo: "https://github.com/yourusername/uber-overlay-app",
  },
]
