"use client"

import { useEffect, useRef } from "react"
import { projects } from "@/data/projects"
import ProjectCard from "@/components/ProjectCard"

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const titleElement = sectionRef.current?.querySelector(".section-title")
          titleElement?.classList.add("animate-in")

          projectsRef.current.forEach((project, index) => {
            if (project) {
              setTimeout(() => {
                project.classList.add("animate-in")
              }, 200 * index)
            }
          })

          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-20 relative" ref={sectionRef} aria-labelledby="projects-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(220_30%_5%)]" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 translate-y-8 section-title transition-all duration-700 ease-out">
          <p className="section-header">Portfolio Node</p>
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            <span className="neon-text">Projects</span> / Deployed Systems
          </h2>
          <div
            className="w-20 h-0.5 bg-[hsl(185_100%_50%)] mx-auto mb-6 shadow-[0_0_10px_hsl(185_100%_50%)]"
            aria-hidden="true"
          />
          <p className="text-muted-foreground">
            Production-ready applications showcasing full-stack development capabilities.
            Each project demonstrates modern web technologies and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-wrapper opacity-0 translate-y-8"
              ref={(el) => (projectsRef.current[index] = el)}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
