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
  )
}
