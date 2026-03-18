"use client"

import { FileDown, ChevronDown, ChevronUp, Briefcase, GraduationCap, Download } from "lucide-react"
import { printToPDF } from "@/utils/print-to-pdf"
import { useState } from "react"

export function Resume() {
  const [isPrinting, setIsPrinting] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    experience: false,
    education: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleDownload = () => {
    setIsPrinting(true)
    try {
      printToPDF("resume-content", "James Duran - Resume")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Could not generate PDF. Please try again or contact support.")
    } finally {
      setTimeout(() => setIsPrinting(false), 1000)
    }
  }

  const skills = ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "MongoDB", "Tailwind CSS", "Git"]

  return (
    <section id="resume" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-header">Data Archive</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            <span className="neon-text">Resume</span> / Credentials
          </h2>
          <div className="w-20 h-0.5 bg-[hsl(185_100%_50%)] mx-auto mb-6 shadow-[0_0_10px_hsl(185_100%_50%)]" />
          <p className="text-muted-foreground mb-8">
            A quick overview of my skills and experience. Download the full PDF for complete details.
          </p>
          <button
            onClick={handleDownload}
            disabled={isPrinting}
            className="cyber-button inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Download className={`h-4 w-4 ${isPrinting ? "animate-pulse" : ""}`} />
            {isPrinting ? "Preparing PDF..." : "Download Full Resume"}
          </button>
        </div>

        <div id="resume-content" className="max-w-4xl mx-auto glass-panel corner-accent rounded-xl p-8">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-[hsl(185_100%_50%/0.2)]">
            <h1 className="text-2xl font-bold neon-text">James Duran</h1>
            <p className="text-muted-foreground mt-2">Frontend Developer | Denver, CO</p>
            <div className="flex justify-center gap-4 mt-3">
              <a href="https://www.linkedin.com/in/james-duran-b1061830/" className="text-[hsl(185_100%_60%)] hover:underline text-sm">
                LinkedIn
              </a>
              <span className="text-muted-foreground">|</span>
              <a href="https://github.com/azrealjames" className="text-[hsl(185_100%_60%)] hover:underline text-sm">
                GitHub
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {/* Summary */}
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(185_100%_50%)] shadow-[0_0_10px_hsl(185_100%_50%)]" />
                Summary
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Frontend Developer skilled in HTML, CSS, JavaScript, TypeScript, and modern frameworks like React and
                Next.js. Known for building responsive web applications and streamlining user experiences. Passionate
                about learning, problem-solving, and contributing to team success.
              </p>
            </div>

            {/* Skills */}
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(185_100%_50%)] shadow-[0_0_10px_hsl(185_100%_50%)]" />
                Core Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded bg-[hsl(185_100%_50%/0.1)] border border-[hsl(185_100%_50%/0.3)] text-[hsl(185_100%_60%)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience - Collapsible */}
            <div className="glass-panel rounded-lg p-6">
              <button
                onClick={() => toggleSection("experience")}
                className="w-full flex items-center justify-between text-lg font-bold hover:text-[hsl(185_100%_60%)] transition-colors"
                aria-expanded={expandedSections.experience}
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-[hsl(185_100%_50%)]" />
                  Professional Experience
                </span>
                {expandedSections.experience ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              <div className="mt-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-[hsl(185_100%_50%/0.1)]">
                  <span className="font-medium text-sm">Freelance Administrative & Operations Coordinator</span>
                  <span className="text-muted-foreground text-xs">2016 – Present</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-[hsl(185_100%_50%/0.1)]">
                  <span className="font-medium text-sm">Uber Driver</span>
                  <span className="text-muted-foreground text-xs">2018 – Present</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                  <span className="font-medium text-sm">Metrc Admin</span>
                  <span className="text-muted-foreground text-xs">2017 – 2018</span>
                </div>
              </div>

              {expandedSections.experience && (
                <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="pl-4 border-l-2 border-[hsl(185_100%_50%/0.3)]">
                    <h3 className="font-bold text-sm">Freelance Administrative & Operations Coordinator</h3>
                    <p className="text-muted-foreground italic text-xs mb-2">Hovey Properties & Hovey Painting - Remote</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-xs">
                      <li>Manage leasing operations, including drafting lease agreements and screening tenants.</li>
                      <li>Support Hovey Painting by scheduling client work and preparing estimates.</li>
                      <li>Organize business expenses to assist with yearly tax preparation.</li>
                    </ul>
                  </div>
                  <div className="pl-4 border-l-2 border-[hsl(185_100%_50%/0.3)]">
                    <h3 className="font-bold text-sm">Uber Driver</h3>
                    <p className="text-muted-foreground italic text-xs mb-2">Denver, CO</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-xs">
                      <li>Delivered consistent customer service in a dynamic, fast-paced environment.</li>
                      <li>Developed strong communication and multitasking skills under pressure.</li>
                    </ul>
                  </div>
                  <div className="pl-4 border-l-2 border-[hsl(185_100%_50%/0.3)]">
                    <h3 className="font-bold text-sm">Metrc Admin</h3>
                    <p className="text-muted-foreground italic text-xs mb-2">House of Dankness - Denver, CO</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-xs">
                      <li>Ensured compliance with Marijuana Enforcement Division regulations.</li>
                      <li>Created a database to track terpene profile results.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Education - Collapsible */}
            <div className="glass-panel rounded-lg p-6">
              <button
                onClick={() => toggleSection("education")}
                className="w-full flex items-center justify-between text-lg font-bold hover:text-[hsl(185_100%_60%)] transition-colors"
                aria-expanded={expandedSections.education}
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-[hsl(185_100%_50%)]" />
                  Education & Certifications
                </span>
                {expandedSections.education ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              <div className="mt-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-[hsl(185_100%_50%/0.1)]">
                  <span className="font-medium text-sm">Full Stack Development Certification</span>
                  <span className="text-muted-foreground text-xs">Nucamp, 2023</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                  <span className="font-medium text-sm">CompTIA A+ & Network+</span>
                  <span className="text-muted-foreground text-xs">2010</span>
                </div>
              </div>

              {expandedSections.education && (
                <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="pl-4 border-l-2 border-[hsl(185_100%_50%/0.3)]">
                    <h3 className="font-bold text-sm">Full Stack Development Certification</h3>
                    <p className="text-muted-foreground text-xs">Nucamp - Denver, CO | January 2023</p>
                    <p className="text-muted-foreground text-xs mt-2">
                      Trained in the MERN Stack (MongoDB, Express.js, React, and Node.js) with strong knowledge of HTML,
                      CSS, JavaScript, Bootstrap, Next.js, and TypeScript.
                    </p>
                  </div>
                  <div className="pl-4 border-l-2 border-[hsl(185_100%_50%/0.3)]">
                    <h3 className="font-bold text-sm">CompTIA Certifications</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-xs">
                      <li>CompTIA A+ Certification - June 2010</li>
                      <li>CompTIA Network+ Certification - August 2010</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-muted-foreground text-xs pt-4">
              Download the full PDF resume for complete details including all job responsibilities and achievements.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
