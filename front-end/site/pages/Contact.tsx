import { Link, useSearchParams } from 'react-router-dom'
import { company } from '../content'
import { PageIntro } from '../components/PageIntro'
import { ContactForm } from '../components/ContactForm'

export default function Contact() {
  const [params] = useSearchParams()

  return (
    <>
      <PageIntro title="Contact us">
        <p>
          Send a message about your business and what you want to change. We reply within one
          business day. Want to talk instead? <Link to="/book">Book a free call</Link>.
        </p>
      </PageIntro>
      <section className="section">
        <div className="wrap contact">
          <ContactForm initialService={params.get('service') ?? undefined} />
          <aside className="contact-aside" aria-label="Other ways to reach us">
            <h2 className="contact-h">Rather talk now?</h2>
            <a className="contact-big" href={company.phoneHref}>{company.phone}</a>
            <a className="contact-email" href={`mailto:${company.email}`}>{company.email}</a>
            <dl className="contact-meta">
              <div><dt>Where</dt><dd>{company.area}</dd></div>
              <div><dt>Hours</dt><dd>{company.hours}</dd></div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  )
}
