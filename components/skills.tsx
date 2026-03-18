"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function Skills() {
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
              }, 100 * index)
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

  const skills = [
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "hsl(120, 60%, 50%)",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      color: "hsl(0, 0%, 80%)",
      invert: true,
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "hsl(193, 95%, 68%)",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "hsl(120, 50%, 45%)",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "hsl(211, 60%, 48%)",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "hsl(0, 0%, 90%)",
      invert: true,
    },
    {
      name: "Tailwind",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      color: "hsl(198, 93%, 60%)",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "hsl(10, 80%, 55%)",
    },
  ]

  const certifications = [
    "MERN Stack Developer",
    "Full Stack Development",
    "CompTIA A+",
    "CompTIA Network+",
  ]

  return (
    <section id="skills" className="py-20 relative" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 cyber-grid opacity-30" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 translate-y-8 section-title transition-all duration-700 ease-out">
          <p className="section-header">Tech Nebula</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            <span className="neon-text">Skills</span> & Technologies
          </h2>
          <div className="w-20 h-0.5 bg-[hsl(185_100%_50%)] mx-auto mb-6 shadow-[0_0_10px_hsl(185_100%_50%)]" />
          <p className="text-muted-foreground">
            Specialized in the MERN stack and modern web technologies to build scalable applications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Skills Grid */}
          <div className="glass-panel corner-accent rounded-xl p-8 mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg bg-[hsl(220_30%_10%/0.5)] border border-[hsl(185_100%_50%/0.1)] hover:border-[hsl(185_100%_50%/0.4)] transition-all duration-300 hover:shadow-[0_0_20px_hsl(185_100%_50%/0.2)] opacity-0 translate-y-4"
                  ref={(el) => (cardsRef.current[index] = el)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className={`object-contain ${skill.invert ? "invert" : ""}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-panel corner-accent rounded-xl p-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[hsl(185_100%_50%)] shadow-[0_0_10px_hsl(185_100%_50%)]" />
              Certifications
            </h3>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 text-sm rounded-full bg-[hsl(185_100%_50%/0.1)] border border-[hsl(185_100%_50%/0.3)] text-[hsl(185_100%_60%)]"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
