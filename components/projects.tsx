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
          <p className="text-muted-foreground">
            Here are some of the projects I have worked on. Each project showcases my skills in web development,
            particularly with the MERN stack. I'm always looking to improve and expand my skills, so check back often
            for updates!
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
