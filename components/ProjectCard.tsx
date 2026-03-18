"use client"

import { Github, ExternalLink, Terminal } from "lucide-react"
import type { Project } from "@/data/projects"
import Link from "next/link"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="cyber-card h-full flex flex-col group">
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_30%_8%)] via-transparent to-transparent" />
        
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[hsl(185_100%_50%/0.5)]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[hsl(185_100%_50%/0.5)]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[hsl(185_100%_50%/0.5)]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[hsl(185_100%_50%/0.5)]" />
        
        {/* Status indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 rounded-full bg-[hsl(220_30%_8%/0.8)] border border-[hsl(150_100%_50%/0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(150_100%_50%)] animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider text-[hsl(150_100%_60%)]">Live</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start gap-2 mb-3">
          <Terminal className="h-5 w-5 text-[hsl(185_100%_50%)] mt-0.5 flex-shrink-0" />
          <h3 className="text-lg font-bold text-foreground group-hover:text-[hsl(185_100%_60%)] transition-colors">
            {project.title}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded bg-[hsl(185_100%_50%/0.1)] border border-[hsl(185_100%_50%/0.2)] text-[hsl(185_100%_60%)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-medium bg-[hsl(185_100%_40%)] hover:bg-[hsl(185_100%_45%)] text-[hsl(220_25%_6%)] rounded transition-all hover:shadow-[0_0_20px_hsl(185_100%_50%/0.4)]"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live Demo
            </Link>
          )}
          {project.repo && (
            <Link
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-medium border border-[hsl(185_100%_50%/0.4)] text-[hsl(185_100%_60%)] hover:bg-[hsl(185_100%_50%/0.1)] hover:border-[hsl(185_100%_50%/0.6)] rounded transition-all"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              View Code
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
