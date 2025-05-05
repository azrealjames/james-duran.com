import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export function Resume() {
  return (
    <section id="resume" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">My Resume</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground mb-8">
            Download my resume to learn more about my experience and qualifications.
          </p>
          <Button className="group" size="lg" asChild>
            <a href="/api/download-resume" className="flex items-center gap-2">
              <FileDown className="h-5 w-5 group-hover:animate-bounce" />
              Download Resume
            </a>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">James Duran</h1>
            <p className="text-muted-foreground mt-2">United States | 720-251-0866 | azrealjames@gmail.com</p>
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

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4">Summary</h2>
              <p className="text-muted-foreground">
                Frontend Developer skilled in HTML, CSS, JavaScript, TypeScript, and modern frameworks like React and
                Next.js. Known for building responsive web applications and streamlining user experiences. Passionate
                about learning, problem-solving, and contributing to team success. Seeking a role that combines creative
                and technical challenges.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4">Skills</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Languages:</span> HTML, CSS, JavaScript, Python,
                  TypeScript
                </li>
                <li>
                  <span className="font-medium text-foreground">Frameworks:</span> React, React Native, Node.js,
                  Express.js, Next.js
                </li>
                <li>
                  <span className="font-medium text-foreground">Databases:</span> MongoDB, AWS, Microsoft Access
                </li>
                <li>
                  <span className="font-medium text-foreground">Tools:</span> Git, Visual Studio Code, Postman, Excel
                </li>
                <li>
                  <span className="font-medium text-foreground">Certifications:</span> CompTIA A+ (2010), CompTIA
                  Network+ (2010)
                </li>
                <li>
                  <span className="font-medium text-foreground">General IT:</span> Hardware troubleshooting, system
                  support
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4">Professional Experience</h2>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h3 className="font-bold text-lg">Freelance Administrative & Operations Coordinator</h3>
                  <span className="text-muted-foreground text-sm sm:text-base">January 2016 – Present</span>
                </div>
                <p className="text-muted-foreground italic mb-2">Hovey Properties & Hovey Painting - Remote</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>
                    Manage leasing operations, including drafting and renewing lease agreements, screening tenants, and
                    coordinating property viewings.
                  </li>
                  <li>
                    Maintain rent records and update payment schedules, ensuring timely and accurate tracking for
                    multiple rental properties.
                  </li>
                  <li>
                    Organize and categorize all business-related expenses to assist accountants with yearly tax
                    preparation.
                  </li>
                  <li>
                    Support Hovey Painting by scheduling client work, preparing estimates, and managing communications
                    to ensure customer satisfaction.
                  </li>
                  <li>
                    Perform administrative tasks for both companies, contributing to smooth day-to-day operations and
                    improved workflow efficiency.
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h3 className="font-bold text-lg">Uber Driver</h3>
                  <span className="text-muted-foreground text-sm sm:text-base">March 2018 – Present</span>
                </div>
                <p className="text-muted-foreground italic mb-2">Denver, CO</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Delivered consistent customer service in a dynamic, fast-paced environment.</li>
                  <li>
                    Managed time-sensitive logistics for people, packages, and food across Denver using mobile-based
                    tools.
                  </li>
                  <li>Developed strong communication and multitasking skills under pressure.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h3 className="font-bold text-lg">Metrc Admin</h3>
                  <span className="text-muted-foreground text-sm sm:text-base">October 2017 – February 2018</span>
                </div>
                <p className="text-muted-foreground italic mb-2">House of Dankness - Denver, CO</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Ensured compliance with Marijuana Enforcement Division regulations for inventory tracking.</li>
                  <li>
                    Created a database to track terpene profile results, increasing test result visibility and accuracy.
                  </li>
                  <li>
                    Streamlined product flow between grow and retail locations through systemized inventory processes.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4">Education</h2>

              <div className="mb-4">
                <h3 className="font-bold text-lg">Full Stack Development Certification</h3>
                <p className="text-muted-foreground">Nucamp - Denver, CO</p>
                <p className="text-muted-foreground">January 2023</p>
                <p className="text-muted-foreground mt-2">
                  Trained in the MERN Stack (MongoDB, Express.js, React, and Node.js) with strong knowledge of HTML,
                  CSS, JavaScript, Bootstrap, Next.js, and TypeScript.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">CompTIA Certifications</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>CompTIA A+ Certification - June 2010</li>
                  <li>CompTIA Network+ Certification - August 2010</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4">Projects</h2>

              <div className="mb-4">
                <h3 className="font-bold text-lg">AI Chatbot Development</h3>
                <p className="text-muted-foreground mt-1">
                  Contributed to a chatbot project by improving conversational responses and refining JavaScript logic
                  for better user interaction.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">Portfolio Website</h3>
                <p className="text-muted-foreground mt-1">
                  Built a responsive portfolio using React, Next.js, and Tailwind CSS to showcase web projects and
                  skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
