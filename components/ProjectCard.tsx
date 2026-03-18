"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, i) => (
            <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3 mt-auto">
          {project.link && (
            <Button asChild size="sm" className="flex-1">
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.repo && (
            <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="h-4 w-4 mr-2" aria-hidden="true" />
                View Code
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
