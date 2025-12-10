"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Github, ExternalLink } from "lucide-react"
import type { Project } from "@/data/projects"
import Link from "next/link"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <div className="flex gap-2">
            {project.repo && (
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label={`View ${project.title} GitHub repository`}
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </Link>
            )}
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
        <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech, i) => (
            <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
