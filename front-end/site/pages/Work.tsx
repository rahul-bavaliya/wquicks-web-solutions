import { Link } from 'react-router-dom'
import { projects } from '../content'
import { PageIntro } from '../components/PageIntro'
import { ProjectCard } from '../components/ProjectCard'
import { CallToAction } from '../components/CallToAction'
import { FoundingOffer } from './Pricing'

export default function Work() {
  return (
    <>
      <PageIntro title="What we've built">
        <p>
          WQuicks is new to client work, so here is the software we have built ourselves: real,
          working products, not mock-ups. Client case studies are coming as our founding clients
          launch.
        </p>
      </PageIntro>
      <section className="section">
        <div className="wrap projects">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
          <article className="project project--next">
            <div className="project-next">
              <h3 className="project-title">Your business, next</h3>
              <p>
                Want to see what we would do with your site? Ask for a free homepage mockup on a
                call, or start with a free website check.
              </p>
              <div className="project-next-actions">
                <Link to="/book" className="btn btn--sky">Book a free call</Link>
                <Link to="/website-check" className="text-link">Free website check</Link>
              </div>
            </div>
          </article>
        </div>
      </section>
      <FoundingOffer />
      <CallToAction title="Your business could be the first case study here." />
    </>
  )
}
