"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isMenuOpen && event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isMenuOpen])

  const navItems = [
    { href: "#about", label: "Mission" },
    { href: "#projects", label: "Portfolio Node" },
    { href: "#skills", label: "Tech Nebula" },
    { href: "#services", label: "Services" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Connect" },
  ]

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? "glass-panel border-b" : "bg-transparent"
    }`}>
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1400px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md group"
        >
          <Cpu className="h-5 w-5 text-[hsl(185_100%_50%)] group-hover:animate-pulse" />
          <span className="uppercase tracking-wider">
            <span className="neon-text">James</span>{" "}
            <span className="text-foreground">Duran</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-[hsl(185_100%_60%)] transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 bg-[hsl(185_100%_50%/0.1)] rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden border border-[hsl(185_100%_50%/0.3)] hover:border-[hsl(185_100%_50%/0.6)] hover:bg-[hsl(185_100%_50%/0.1)]"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          ref={buttonRef}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-[hsl(185_100%_60%)]" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5 text-[hsl(185_100%_60%)]" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="glass-panel md:hidden py-4 px-4 border-t"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:text-[hsl(185_100%_60%)] hover:bg-[hsl(185_100%_50%/0.1)] transition-colors rounded-md"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
