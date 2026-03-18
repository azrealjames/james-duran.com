"use client"

import { Target, Zap, Code2, Users } from "lucide-react"

export function About() {
  const stats = [
    { icon: Code2, label: "Projects Completed", value: "15+" },
    { icon: Users, label: "Happy Clients", value: "10+" },
    { icon: Zap, label: "Years Experience", value: "2+" },
  ]

  return (
    <section id="about" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(220_30%_5%)]" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-header">Mission Brief</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              <span className="neon-text">About</span> Me
            </h2>
            <div className="w-20 h-0.5 bg-[hsl(185_100%_50%)] mx-auto mb-6 shadow-[0_0_10px_hsl(185_100%_50%)]" />
          </div>

          {/* Main Content Panel */}
          <div className="glass-panel corner-accent rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-[hsl(185_100%_50%/0.1)] border border-[hsl(185_100%_50%/0.3)]">
                <Target className="h-6 w-6 text-[hsl(185_100%_50%)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Mission Statement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building digital experiences that transform ideas into reality.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                I'm a <span className="text-[hsl(185_100%_60%)]">MERN stack developer</span> with 2 years of experience building web applications. 
                I specialize in creating responsive, user-friendly websites and applications using MongoDB, Express.js, React, and Node.js.
              </p>
              <p className="leading-relaxed">
                My journey in web development began with a passion for creating solutions that help businesses and 
                individuals achieve their goals online. I'm constantly learning and expanding my skills to stay current 
                with the latest technologies and best practices.
              </p>
              <p className="leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or 
                expanding my knowledge through online courses and tutorials.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-xl p-6 text-center hover:border-[hsl(185_100%_50%/0.5)] transition-all"
              >
                <stat.icon className="h-8 w-8 text-[hsl(185_100%_50%)] mx-auto mb-3" />
                <div className="text-3xl font-bold neon-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Availability Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-panel">
              <span className="status-dot" />
              <span className="text-sm uppercase tracking-wider text-[hsl(150_100%_60%)]">
                Currently Available for Freelance Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
