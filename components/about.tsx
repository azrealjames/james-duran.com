export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground">
              I'm a MERN stack developer with 2 years of experience building web applications. I specialize in creating
              responsive, user-friendly websites and applications using MongoDB, Express.js, React, and Node.js.
            </p>
            <p className="text-muted-foreground">
              My journey in web development began with a passion for creating solutions that help businesses and
              individuals achieve their goals online. I'm constantly learning and expanding my skills to stay current
              with the latest technologies and best practices.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              expanding my knowledge through online courses and tutorials.
            </p>

            <div className="flex justify-center mt-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                Currently Available for Freelance Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
