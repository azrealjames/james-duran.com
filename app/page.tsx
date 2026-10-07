import Image from "next/image";
import CopyEmail from "@/components/CopyEmail";
import CountUp from "@/components/CountUp";
import { projects, shippedStack, site, ticker, trainedStack } from "@/lib/site";

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span className="tag" key={t}>
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const loop = [...ticker, ...ticker];

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="wrap">
        <header className="top">
          <a className="brand" href="#top">
            {site.name}
          </a>
          <nav aria-label="Sections">
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top">
          <div className="hero">
            <div>
              <p className="eyebrow">Web developer, Denver</p>
              <h1>
                I build web tools for people who <span className="hl">work with their hands.</span>
              </h1>
              <p className="lede">
                Estimates for contractors, trip math for rideshare drivers, and sites that bring in calls for
                local trades. I take a project from the first sketch to a live URL, and I&apos;m open to
                freelance work and full-time roles.
              </p>
              <div className="cta">
                <a className="btn primary" href="#projects">
                  See the work
                </a>
                <a className="btn" href="#contact">
                  Get in touch
                </a>
              </div>
            </div>
            <aside className="ticket" aria-label="At a glance">
              <h2>Job ticket</h2>
              <dl>
                <dt>Works in</dt>
                <dd>Next.js, React, TypeScript</dd>
                <dt>Builds</dt>
                <dd>Mobile-first PWAs, landing pages</dd>
                <dt>Shipped</dt>
                <dd>
                  <CountUp to={projects.length} /> live projects
                </dd>
                <dt>Status</dt>
                <dd>
                  <span className="ok" aria-hidden="true" />
                  Taking on work
                </dd>
              </dl>
            </aside>
          </div>

          <div className="marquee" aria-hidden="true">
            <div className="track">
              {loop.map((t, i) => (
                <span key={`w${i}`}>{t}</span>
              )).flatMap((el, i) => [el, <span key={`s${i}`}>/</span>])}
            </div>
          </div>

          <section id="projects">
            <p className="eyebrow">Selected work</p>
            <h2 className="title">Four things I&apos;ve built and put online</h2>
            <p className="intro">
              Each one solves a specific problem for a specific kind of user. Every link below goes to the live
              version.
            </p>

            {projects.map((p) => (
              <article className="project" key={p.name}>
                <div>
                  <h3>{p.name}</h3>
                  <p className="kind">{p.kind}</p>
                  {p.description.map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                  <div className="links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="side">
                  {p.image && (
                    <figure className="shot">
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        width={p.image.width}
                        height={p.image.height}
                        sizes="(max-width: 760px) 100vw, 420px"
                      />
                    </figure>
                  )}
                  <div className="spec">
                  <dl>
                    <dt>For</dt>
                    <dd>{p.forWho}</dd>
                    <dt>Does</dt>
                    <dd>{p.does}</dd>
                    <dt>Stack</dt>
                    <dd>
                      <Tags items={p.stack} />
                    </dd>
                    <dt>Status</dt>
                    <dd>{p.status}</dd>
                  </dl>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section id="about">
            <div className="about">
              <div>
                <p className="eyebrow">About</p>
                <h2 className="title">Self-taught, and used to real customers</h2>
                <p>
                  I taught myself to code and finished a full-stack certification at Nucamp in 2023. Before that
                  I held CompTIA A+ and Network+ certifications and worked in IT support.
                </p>
                <p>
                  For years I&apos;ve also run the day-to-day for a painting company and a set of rental
                  properties: leasing, rent records, estimates, and expense tracking. That&apos;s why I build
                  tools for the people who do that work. I know what a bad estimate form costs a contractor, and
                  I design for a phone in a truck, not a desk.
                </p>
              </div>
              <div className="stack">
                <div>
                  <h3>Used in shipped projects</h3>
                  <Tags items={shippedStack} />
                </div>
                <div>
                  <h3>Trained in</h3>
                  <Tags items={trainedStack} />
                  <p>Full-stack MERN certification, Nucamp, January 2023.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="contact">
            <div className="contact">
              <div>
                <h2>Have a project, or a role to fill?</h2>
                <p>Tell me what you&apos;re trying to build and who it&apos;s for. I usually reply within a day.</p>
              </div>
              <div>
                <CopyEmail email={site.email} />
                <div className="links">
                  <a href={site.github} target="_blank" rel="noopener">
                    GitHub
                  </a>
                  <a href={site.linkedin} target="_blank" rel="noopener">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <span>&copy; {site.year} James Duran</span>
          <span>{site.location}</span>
        </footer>
      </div>
    </>
  );
}
