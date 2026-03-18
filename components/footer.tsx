"use client"

import Link from "next/link"
import { Github, Linkedin, FileText, Cpu } from "lucide-react"
import { printToPDF } from "@/utils/print-to-pdf"
import { useState } from "react"

export function Footer() {
  const [isPrinting, setIsPrinting] = useState(false)

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

  const navItems = [
    { href: "#about", label: "Mission" },
    { href: "#skills", label: "Tech Nebula" },
    { href: "#projects", label: "Portfolio" },
    { href: "#services", label: "Services" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Connect" },
  ]

  return (
    <footer className="relative border-t border-[hsl(185_100%_50%/0.2)] py-12" aria-labelledby="footer-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(220_30%_4%)]" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-primary rounded-md group"
            >
              <Cpu className="h-5 w-5 text-[hsl(185_100%_50%)] group-hover:animate-pulse" />
              <span className="uppercase tracking-wider">
                <span className="neon-text">James</span>{" "}
                <span className="text-foreground">Duran</span>
              </span>
            </Link>
            <p className="text-muted-foreground mt-2 text-sm">
              Web Systems Architect | Available for Projects
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-wider text-muted-foreground hover:text-[hsl(185_100%_60%)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/azrealjames"
              className="tech-icon group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(185_100%_60%)] transition-colors" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/james-duran-b1061830/"
              className="tech-icon group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(185_100%_60%)] transition-colors" />
            </Link>
            <button
              onClick={handleDownload}
              disabled={isPrinting}
              className="tech-icon group"
              aria-label="Download Resume"
            >
              <FileText className={`h-4 w-4 text-muted-foreground group-hover:text-[hsl(185_100%_60%)] transition-colors ${isPrinting ? "animate-pulse" : ""}`} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[hsl(185_100%_50%/0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} James Duran. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(150_100%_50%)] animate-pulse" />
              System Status: Online
            </span>
            <span>|</span>
            <span>REV. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
