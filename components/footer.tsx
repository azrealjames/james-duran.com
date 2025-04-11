import Link from "next/link"
import { Github, Linkedin, FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12" aria-labelledby="footer-heading">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="font-bold text-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md"
            >
              James Duran
            </Link>
            <p className="text-muted-foreground mt-2 text-sm">MERN Stack Developer | Freelancer</p>
          </div>

          <div className="flex flex-col items-center gap-4 md:gap-8">
            {/* Mobile-optimized navigation */}
            <nav className="flex flex-wrap justify-center gap-3 md:gap-6" aria-label="Footer navigation">
              <Link
                href="#about"
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm"
              >
                About
              </Link>
              <Link
                href="#skills"
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm"
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm"
              >
                Projects
              </Link>
              <Link
                href="#services"
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm"
              >
                Services
              </Link>
              <Link
                href="#resume"
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm"
              >
                Resume
              </Link>
              <Link
                href="#contact"
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/azrealjames"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-full p-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/james-duran-b1061830/"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-full p-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/resume.pdf"
                download="James_Duran_Resume.pdf"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-full p-1"
                aria-label="Download Resume"
              >
                <FileText className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} James Duran. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
