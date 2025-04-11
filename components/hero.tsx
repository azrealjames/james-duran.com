"use client"

import { useEffect, useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [typedText, setTypedText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const phrases = ["MERN Stack Developer", "Frontend Specialist", "React Developer", "Freelancer"]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    let currentIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    const typingInterval = setInterval(() => {
      // Typing
      if (!isDeleting && currentIndex <= currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, currentIndex))
        currentIndex++
        typingSpeed = 100
      }
      // Deleting
      else if (isDeleting && currentIndex >= 0) {
        setTypedText(currentPhrase.slice(0, currentIndex))
        currentIndex--
        typingSpeed = 50
      }

      // Switch to deleting mode when typed full phrase
      if (!isDeleting && currentIndex > currentPhrase.length) {
        isDeleting = true
        typingSpeed = 1000 // Pause before deleting
      }

      // Switch to next phrase when deleted
      if (isDeleting && currentIndex === 0) {
        isDeleting = false
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [currentPhraseIndex])

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `hsla(217, 91%, 60%, ${Math.random() * 0.3})`
      }

      update() {
        // Move particles
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // React to mouse (subtle attraction)
        const dx = mousePosition.current.x - this.x
        const dy = mousePosition.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          this.speedX += Math.cos(angle) * 0.01
          this.speedY += Math.sin(angle) * 0.01
        }

        // Limit speed
        const maxSpeed = 1
        const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
        if (currentSpeed > maxSpeed) {
          this.speedX = (this.speedX / currentSpeed) * maxSpeed
          this.speedY = (this.speedY / currentSpeed) * maxSpeed
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Draw connections
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    const connectParticles = () => {
      if (!ctx) return
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `hsla(217, 91%, 60%, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col" aria-labelledby="hero-heading">
      <Navbar />

      {/* Canvas for particle animation - decorative only */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />

      {/* Hero background effects - decorative only */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
        aria-hidden="true"
      />

      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-6 z-10">
        <div className="max-w-3xl mx-auto">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Hi, I'm{" "}
            <span className="text-primary relative inline-block">
              James
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary opacity-70" aria-hidden="true"></span>
            </span>
          </h1>

          <div className="h-12 mb-4" aria-live="polite">
            <p className="text-xl md:text-2xl text-muted-foreground">
              <span className="text-primary">{typedText}</span>
              <span className="animate-blink" aria-hidden="true">
                |
              </span>
            </p>
          </div>

          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Passionate about building <span className="text-primary font-medium">modern web applications</span> with the
            MERN stack. Available for <span className="text-primary font-medium">freelance projects</span>.
          </p>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-8">
            <Link
              href="https://github.com/azrealjames"
              className="bg-background/80 p-3 rounded-full hover:bg-primary/10 transition-colors border border-border hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/james-duran-b1061830/"
              className="bg-background/80 p-3 rounded-full hover:bg-primary/10 transition-colors border border-border hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="mailto:azrealjames@gmail.com"
              className="bg-background/80 p-3 rounded-full hover:bg-primary/10 transition-colors border border-border hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Email Me"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 relative overflow-hidden group"
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:animate-shimmer"
                aria-hidden="true"
              ></span>
              <span className="relative z-10">Hire Me</span>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 border-primary/20 hover:border-primary/50 transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
