"use client"

import { Button } from "@/components/ui/button"
import { FileDown, ChevronDown, ChevronUp } from "lucide-react"
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

  return (
    <section id="resume" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">My Resume</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground mb-8">
            A quick overview of my skills and experience. Download the full PDF for complete details.
          </p>
          <Button className="group download-btn-container" size="lg" onClick={handleDownload} disabled={isPrinting}>
            <span className="flex items-center gap-2">
              <FileDown className={`h-5 w-5 ${isPrinting ? "animate-pulse" : "group-hover:animate-bounce"}`} />
              {isPrinting ? "Preparing PDF..." : "Download Full Resume (PDF)"}
            </span>
          </Button>
        </div>

        <div id="resume-content" className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">James Duran</h1>
            <p className="text-muted-foreground mt-2">Frontend Developer | Denver, CO</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="https://www.linkedin.com/in/james-duran-b1061830/" className="text-primary hover:underline">
                LinkedIn
              </a>{" "}
              |
              <a href="https://github.com/azrealjames" className="text-primary hover:underline">
                GitHub
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {/* Summary - Always visible */}
            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4">Summary</h2>
              <p className="text-muted-foreground">
                Frontend Developer skilled in HTML, CSS, JavaScript, TypeScript, and modern frameworks like React and
                Next.js. Known for building responsive web applications and streamlining user experiences. Passionate
                about learning, problem-solving, and contributing to team success.
              </p>
            </div>

            {/* Skills - Always visible but condensed */}
            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "MongoDB", "Tailwind CSS", "Git"].map((skill) => (
                  <span key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience - Collapsible */}
            <div>
              <button
                onClick={() => toggleSection("experience")}
                className="w-full flex items-center justify-between text-xl font-bold border-b pb-2 mb-4 hover:text-primary transition-colors"
                aria-expanded={expandedSections.experience}
              >
                <span>Professional Experience</span>
                {expandedSections.experience ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              {/* Summary view - always visible */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-medium">Freelance Administrative & Operations Coordinator</span>
                  <span className="text-muted-foreground text-sm">2016 – Present</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-medium">Uber Driver</span>
                  <span className="text-muted-foreground text-sm">2018 – Present</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-medium">Metrc Admin</span>
                  <span className="text-muted-foreground text-sm">2017 – 2018</span>
                </div>
              </div>

              {/* Expanded details */}
              {expandedSections.experience && (
                <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                  <div className="pl-4 border-l-2 border-primary/30">
                    <h3 className="font-bold">Freelance Administrative & Operations Coordinator</h3>
                    <p className="text-muted-foreground italic text-sm mb-2">Hovey Properties & Hovey Painting - Remote</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                      <li>Manage leasing operations, including drafting lease agreements and screening tenants.</li>
                      <li>Support Hovey Painting by scheduling client work and preparing estimates.</li>
                      <li>Organize business expenses to assist with yearly tax preparation.</li>
                    </ul>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/30">
                    <h3 className="font-bold">Uber Driver</h3>
                    <p className="text-muted-foreground italic text-sm mb-2">Denver, CO</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                      <li>Delivered consistent customer service in a dynamic, fast-paced environment.</li>
                      <li>Developed strong communication and multitasking skills under pressure.</li>
                    </ul>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/30">
                    <h3 className="font-bold">Metrc Admin</h3>
                    <p className="text-muted-foreground italic text-sm mb-2">House of Dankness - Denver, CO</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                      <li>Ensured compliance with Marijuana Enforcement Division regulations.</li>
                      <li>Created a database to track terpene profile results.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Education - Collapsible */}
            <div>
              <button
                onClick={() => toggleSection("education")}
                className="w-full flex items-center justify-between text-xl font-bold border-b pb-2 mb-4 hover:text-primary transition-colors"
                aria-expanded={expandedSections.education}
              >
                <span>Education & Certifications</span>
                {expandedSections.education ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              {/* Summary view */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-medium">Full Stack Development Certification</span>
                  <span className="text-muted-foreground text-sm">Nucamp, 2023</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-medium">CompTIA A+ & Network+</span>
                  <span className="text-muted-foreground text-sm">2010</span>
                </div>
              </div>

              {/* Expanded details */}
              {expandedSections.education && (
                <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="pl-4 border-l-2 border-primary/30">
                    <h3 className="font-bold">Full Stack Development Certification</h3>
                    <p className="text-muted-foreground text-sm">Nucamp - Denver, CO | January 2023</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Trained in the MERN Stack (MongoDB, Express.js, React, and Node.js) with strong knowledge of HTML,
                      CSS, JavaScript, Bootstrap, Next.js, and TypeScript.
                    </p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/30">
                    <h3 className="font-bold">CompTIA Certifications</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                      <li>CompTIA A+ Certification - June 2010</li>
                      <li>CompTIA Network+ Certification - August 2010</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-muted-foreground text-sm pt-4 border-t">
              Download the full PDF resume for complete details including all job responsibilities and achievements.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
