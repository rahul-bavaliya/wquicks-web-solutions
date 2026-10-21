import { Link } from 'react-router-dom'
import { services, process, projects, industries } from '../content'
import { ProjectCard } from '../components/ProjectCard'
import { Faq } from '../components/Faq'
import { CallToAction } from '../components/CallToAction'

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-sky">
          <h1 id="hero-title" className="hero-title">
            We make Saskatchewan businesses easy to find and hard to forget.
          </h1>
          <p className="hero-lead">
            WQuicks is a Regina studio for websites, photo and video, and local marketing. One
            team, one plan, built around getting you more customers.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn--sun">Book a free call</Link>
            <Link to="/work" className="btn btn--ghost-dark">See our work</Link>
          </div>
        </div>
        <span className="hero-sun" aria-hidden="true" />
        <nav className="hero-field" aria-label="What we do">
          <div className="wrap hero-field-inner">
            {services.map((s) => (
              <Link key={s.id} to={`/services#${s.id}`} className="hero-word">
                {s.name}
              </Link>
            ))}
          </div>
        </nav>
      </section>

      <section className="section">
        <div className="wrap split">
          <h2 className="h2">Three crafts, one team that knows your goals.</h2>
          <div className="prose">
            <p>
              Most businesses hire a web designer, a photographer and a marketing agency, then
              spend their time keeping the three in sync. We do all three under one roof, so your
              site, your content and your ads tell the same story and point to the same result.
            </p>
            <p>
              We are based in Regina and work with owners across Saskatchewan: trades, clinics,
              restaurants, dealers, non-profits and growing local brands.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="services-title">
        <div className="wrap">
          <h2 id="services-title" className="h2 section-head">What we do</h2>
          <div className="service-rows">
            {services.map((s) => (
              <Link key={s.id} to={`/services#${s.id}`} className="service-row">
                <h3 className="service-row-name">{s.name}</h3>
                <p className="service-row-lead">{s.lead}</p>
                <span className="service-row-more">View {s.name.toLowerCase()} services</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head section-head--row">
            <h2 id="work-title" className="h2">Recent work</h2>
            <Link to="/work" className="text-link">All projects</Link>
          </div>
          <div className="projects">
            {projects.slice(0, 2).map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="wrap">
          <h2 id="process-title" className="h2 section-head">How a project runs</h2>
          <ol className="steps">
            {process.map((step, i) => (
              <li key={step.name} className="step">
                <span className="step-num" aria-hidden="true">{i + 1}</span>
                <h3 className="step-name">{step.name}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="industries-title">
        <div className="wrap split">
          <h2 id="industries-title" className="h2">Who we work with</h2>
          <ul className="industries">
            {industries.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="faq-title">
        <div className="wrap split">
          <h2 id="faq-title" className="h2">Questions owners ask us</h2>
          <Faq />
        </div>
      </section>

      <CallToAction />
    </>
  )
}
