"use client"

import { useEffect, useRef } from "react"
import { Code, Layout, Database, Globe, Server, Smartphone } from "lucide-react"

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const titleElement = sectionRef.current?.querySelector(".section-title")
          titleElement?.classList.add("animate-in")

          cardsRef.current.forEach((card, index) => {
            if (card) {
              setTimeout(() => {
                card.classList.add("animate-in")
              }, 150 * index)
            }
          })

          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: Layout,
      title: "Frontend Development",
      description: "Custom, responsive frontend development with React, focusing on user experience and modern design principles.",
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Robust backend solutions using Node.js and Express to power your web applications with reliable server-side logic.",
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Efficient MongoDB database design and implementation to ensure your data is structured optimally.",
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "End-to-end development using the MERN stack to deliver complete web applications from concept to deployment.",
    },
    {
      icon: Globe,
      title: "API Development",
      description: "Creation of RESTful APIs that enable seamless communication between your frontend and backend systems.",
    },
    {
      icon: Smartphone,
      title: "Responsive Web Design",
      description: "Mobile-first approach ensuring your website looks and functions perfectly on all devices and screen sizes.",
    },
  ]

  return (
    <section id="services" className="py-20 relative" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(220_30%_5%)]" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 translate-y-8 section-title transition-all duration-700 ease-out">
          <p className="section-header">Service Modules</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            <span className="neon-text">Services</span> I Offer
          </h2>
          <div className="w-20 h-0.5 bg-[hsl(185_100%_50%)] mx-auto mb-6 shadow-[0_0_10px_hsl(185_100%_50%)]" />
          <p className="text-muted-foreground">
            Comprehensive web development services to bring your digital vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="cyber-card p-6 opacity-0 translate-y-8 transition-all duration-500"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              {/* Icon */}
              <div className="mb-4 p-3 w-fit rounded-lg bg-[hsl(185_100%_50%/0.1)] border border-[hsl(185_100%_50%/0.3)]">
                <service.icon className="h-8 w-8 text-[hsl(185_100%_50%)]" />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold mb-3 text-foreground">{service.title}</h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              
              {/* Bottom accent line */}
              <div className="mt-4 pt-4 border-t border-[hsl(185_100%_50%/0.1)]">
                <span className="text-xs uppercase tracking-wider text-[hsl(185_100%_50%/0.6)]">
                  Module Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
