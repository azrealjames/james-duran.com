"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Layout, Database, Globe, Server, Smartphone } from "lucide-react"

export function Services() {
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

  const services = [
    {
      icon: <Layout className="h-10 w-10 service-icon" />,
      title: "Frontend Development",
      description:
        "Custom, responsive frontend development with React, focusing on user experience and modern design principles.",
    },
    {
      icon: <Server className="h-10 w-10 service-icon" />,
      title: "Backend Development",
      description:
        "Robust backend solutions using Node.js and Express to power your web applications with reliable server-side logic.",
    },
    {
      icon: <Database className="h-10 w-10 service-icon" />,
      title: "Database Design",
      description: "Efficient MongoDB database design and implementation to ensure your data is structured optimally.",
    },
    {
      icon: <Code className="h-10 w-10 service-icon" />,
      title: "Full-Stack Development",
      description:
        "End-to-end development using the MERN stack to deliver complete web applications from concept to deployment.",
    },
    {
      icon: <Globe className="h-10 w-10 service-icon" />,
      title: "API Development",
      description:
        "Creation of RESTful APIs that enable seamless communication between your frontend and backend systems.",
    },
    {
      icon: <Smartphone className="h-10 w-10 service-icon" />,
      title: "Responsive Web Design",
      description:
        "Mobile-first approach ensuring your website looks and functions perfectly on all devices and screen sizes.",
    },
  ]

  return (
    <section id="services" className="py-20" ref={sectionRef}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 translate-y-8 section-title transition-all duration-700 ease-out">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">My Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 transform origin-left scale-x-0 animate-scale-in"></div>
          <p className="text-muted-foreground">Here are the services I offer as a freelance MERN stack developer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-all duration-300 opacity-0 translate-y-8 service-card"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <CardContent className="p-6">
                <div className="text-primary mb-4 service-icon-wrapper">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
