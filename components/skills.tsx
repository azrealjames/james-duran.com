"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Database, Server, Code, Globe, Layout, Smartphone } from "lucide-react"

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Add animation class to the section title
          const titleElement = sectionRef.current?.querySelector(".section-title")
          titleElement?.classList.add("animate-in")

          // Animate cards with staggered delay
          cardsRef.current.forEach((card, index) => {
            if (card) {
              setTimeout(() => {
                card.classList.add("animate-in")
              }, 150 * index) // Staggered delay
            }
          })

          // Disconnect after animation
          observer.disconnect()
        }
      },
      { threshold: 0.2 }, // Trigger when 20% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const skills = [
    {
      icon: <Database className="h-10 w-10 mx-auto skill-icon" />,
      title: "MongoDB",
      description:
        "Experience with MongoDB database design, queries, aggregation, and integration with Node.js applications.",
    },
    {
      icon: <Server className="h-10 w-10 mx-auto skill-icon" />,
      title: "Express.js",
      description: "Building RESTful APIs, middleware implementation, and server-side routing with Express.js.",
    },
    {
      icon: <Layout className="h-10 w-10 mx-auto skill-icon" />,
      title: "React",
      description:
        "Creating interactive UIs with React, state management, hooks, and integration with backend services.",
    },
    {
      icon: <Code className="h-10 w-10 mx-auto skill-icon" />,
      title: "Node.js",
      description: "Server-side JavaScript, asynchronous programming, and building scalable backend applications.",
    },
    {
      icon: <Globe className="h-10 w-10 mx-auto skill-icon" />,
      title: "Web Development",
      description: "HTML5, CSS3, JavaScript (ES6+), responsive design, and modern web development practices.",
    },
    {
      icon: <Smartphone className="h-10 w-10 mx-auto skill-icon" />,
      title: "Responsive Design",
      description: "Creating websites that work seamlessly across all devices and screen sizes.",
    },
  ]

  return (
    <section id="skills" className="py-20" ref={sectionRef}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 translate-y-8 section-title transition-all duration-700 ease-out">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 transform origin-left scale-x-0 animate-scale-in"></div>
          <p className="text-muted-foreground">
            I specialize in the MERN stack and related technologies to build modern, scalable web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-all duration-300 opacity-0 translate-y-8 skill-card"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <CardContent className="pt-6 p-6">
                <div className="text-primary mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold text-center mb-2">{skill.title}</h3>
                <p className="text-muted-foreground text-center">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
