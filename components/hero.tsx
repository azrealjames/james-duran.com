"use client"

import { useEffect, useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Github, Linkedin, Mail, ChevronRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [typedText, setTypedText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const phrases = ["Building Scalable Web Solutions", "For Small Businesses & Startups", "React & Next.js Expert", "System Status: Online"]
  const [isDeleting, setIsDeleting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Typing effect
  useEffect(() => {
    if (reducedMotion) {
      setTypedText(phrases[currentPhraseIndex])
      return
    }

    const currentPhrase = phrases[currentPhraseIndex]
    const typingSpeed = isDeleting ? 30 : 80
    const pauseTime = 2000

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, typedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentPhrase.substring(0, typedText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, currentPhraseIndex, reducedMotion, phrases])

  // Grid animation
  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const gridSize = 60
    let offset = 0
    let animationId: number

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.strokeStyle = "hsla(185, 100%, 50%, 0.06)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Data streams
      ctx.lineWidth = 2
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1)
        const streamOffset = (offset * 2 + i * 150) % (canvas.height + 200) - 100
        
        const gradient = ctx.createLinearGradient(x, streamOffset - 100, x, streamOffset)
        gradient.addColorStop(0, "hsla(185, 100%, 50%, 0)")
        gradient.addColorStop(1, "hsla(185, 100%, 50%, 0.4)")
        
        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(x, streamOffset - 100)
        ctx.lineTo(x, streamOffset)
        ctx.stroke()
      }

      offset += 1
      animationId = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [reducedMotion])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated Grid Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-[1]" aria-hidden="true" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(185_100%_50%/0.1)] rounded-full blur-[100px] z-[1]" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[hsl(210_100%_50%/0.1)] rounded-full blur-[80px] z-[1]" aria-hidden="true" />

      <Navbar />

      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* System Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8">
            <span className="status-dot" />
            <span className="text-xs uppercase tracking-wider text-[hsl(150_100%_60%)]">Global Node Access: Active</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="neon-text">JAMES</span>{" "}
            <span className="text-foreground">DURAN</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Ultra-Futuristic Web & Systems Architect | Est. 2023
          </p>

          {/* Typing Effect */}
          <div className="h-12 flex items-center justify-center mb-8">
            <span className="text-xl md:text-2xl text-[hsl(185_100%_60%)] font-mono">
              {typedText}
              <span className="typing-cursor" />
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg">
            I help <span className="text-[hsl(185_100%_60%)]">small businesses and startups</span> build fast, 
            responsive web applications that drive results. Let's bring your vision to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="#contact" className="cyber-button">
              <span className="flex items-center gap-2">
                Initialize Contact
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="#projects" className="cyber-button-outline">
              <span className="flex items-center gap-2">
                View Projects
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/azrealjames"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-icon group"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-[hsl(185_100%_60%)] transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/james-duran-b1061830/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-icon group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-[hsl(185_100%_60%)] transition-colors" />
            </a>
            <a
              href="mailto:azrealjames@gmail.com"
              className="tech-icon group"
              aria-label="Email Me"
            >
              <Mail className="h-5 w-5 text-muted-foreground group-hover:text-[hsl(185_100%_60%)] transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="glass-panel border-t border-x-0 border-b-0 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">System Status:</span>
              <span className="neon-text-green">Optimal</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-muted-foreground">james-duran.com</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">REV. 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Connection:</span>
              <span className="neon-text-green">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
