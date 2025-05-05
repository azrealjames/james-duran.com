"use client"

import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Services } from "@/components/services"
import { Resume } from "@/components/resume"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none"
      >
        Skip to content
      </a>

      <main id="main-content" className="min-h-screen w-full overflow-x-hidden">
        <Hero />
        <Projects />
        <Services />
        <Skills />
        <About />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
