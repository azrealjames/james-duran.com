"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Add animation class to the section title
          const titleElement = sectionRef.current?.querySelector(".section-title")
          titleElement?.classList.add("animate-in")

          // Animate projects with staggered delay
          projectsRef.current.forEach((project, index) => {
            if (project) {
              setTimeout(() => {
                project.classList.add("animate-in")
              }, 200 * index) // Staggered delay
            }
          })

          // Disconnect after animation
          observer.disconnect()
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "A responsive portfolio website built with Next.js, React, and Tailwind CSS. Features include dark mode, interactive particle animations, and contact form functionality.",
      image: "/images/portfolio-screenshot.png",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/azrealjames/portfolio",
      demo: "#", // Will be updated once deployed
      completed: true,
    },
    {
      id: 2,
      title: "Project 2",
      description: "This project will showcase my MERN stack skills. Check back soon for details!",
      image: "/placeholder.svg?height=300&width=500&text=Project 2",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      github: "#",
      demo: "#",
      completed: false,
    },
    {
      id: 3,
      title: "Project 3",
      description: "This project will showcase my MERN stack skills. Check back soon for details!",
      image: "/placeholder.svg?height=300&width=500&text=Project 3",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      github: "#",
      demo: "#",
      completed: false,
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30" ref={sectionRef} aria-labelledby="projects-heading">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 translate-y-8 section-title transition-all duration-700 ease-out">
          <h2 id="projects-heading" className="text-3xl font-bold tracking-tighter mb-4">
            My Projects
          </h2>
          <div
            className="w-20 h-1 bg-primary mx-auto mb-6 transform origin-left scale-x-0 animate-scale-in"
            aria-hidden="true"
          ></div>
          <p className="text-muted-foreground">Here are some of my recent projects. More coming soon!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-wrapper opacity-0 translate-y-8"
              ref={(el) => (projectsRef.current[index] = el)}
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 project-card transform-gpu h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {project.completed ? (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} preview image`}
                      className="w-full h-full object-cover transition-transform duration-300 project-image"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <p className="text-muted-foreground">Coming Soon</p>
                      </div>
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.title} preview image`}
                        className="w-full h-full object-cover opacity-50 transition-transform duration-300 project-image"
                      />
                    </>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.completed ? (
                        <>
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-button p-2 rounded-full hover:bg-primary/10 transition-colors"
                            aria-label={`View ${project.title} GitHub repository`}
                          >
                            <Github className="h-5 w-5" aria-hidden="true" />
                          </Link>
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-button p-2 rounded-full hover:bg-primary/10 transition-colors"
                            aria-label={`View ${project.title} live demo`}
                          >
                            <ExternalLink className="h-5 w-5" aria-hidden="true" />
                          </Link>
                        </>
                      ) : (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="project-button"
                            aria-label={`GitHub repository (coming soon)`}
                            disabled
                          >
                            <Github className="h-5 w-5" aria-hidden="true" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="project-button"
                            aria-label={`Live demo (coming soon)`}
                            disabled
                          >
                            <ExternalLink className="h-5 w-5" aria-hidden="true" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto" aria-label="Technologies used">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
