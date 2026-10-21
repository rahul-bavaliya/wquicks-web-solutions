import { Link } from 'react-router-dom'
import { company, websiteCheckIncludes } from '../content'
import { PageIntro } from '../components/PageIntro'
import { LeadForm } from '../components/LeadForm'

export default function WebsiteCheck() {
  return (
    <>
      <PageIntro title="Free website check">
        <p>
          Send us your website and we will check it the way your customers, Google and AI tools
          see it. You get a short report with the top 5 fixes within two business days. Free, and
          no sales pressure.
        </p>
      </PageIntro>
      <section className="section">
        <div className="wrap contact">
          <LeadForm
            heading="Free website check request"
            submitLabel="Check my website"
            sendingLabel="Sending…"
            fields={[
              {
                kind: 'url',
                name: 'website',
                label: 'Website address',
                required: true,
                placeholder: 'mybusiness.ca',
                hint: 'No website yet? Write "none" in the notes below and we will check your Google listing instead.',
                wide: true,
              },
              { kind: 'text', name: 'name', label: 'Your name', required: true, autoComplete: 'name' },
              { kind: 'email', name: 'email', label: 'Email for the report', required: true, autoComplete: 'email' },
              { kind: 'text', name: 'business', label: 'What does your business do?', placeholder: 'Plumbing, Regina' },
              { kind: 'tel', name: 'phone', label: 'Phone', autoComplete: 'tel' },
              {
                kind: 'textarea',
                name: 'notes',
                label: 'Anything you are worried about?',
                placeholder: 'Not showing on Google, slow on phones, no calls from the site…',
                wide: true,
              },
            ]}
            done={(first) => (
              <>
                <h2>Thanks{first ? `, ${first}` : ''}. We are on it.</h2>
                <p>
                  Your website check will arrive by email within two business days. Want to go
                  through it together? <Link to="/book">Book a free call</Link>.
                </p>
              </>
            )}
          />
          <aside className="contact-aside" aria-label="What the check covers">
            <h2 className="contact-h">What we check</h2>
            <ul className="checklist checklist--light">
              {websiteCheckIncludes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="contact-note">Questions first? Call {company.phone}.</p>
          </aside>
        </div>
      </section>
    </>
  )
}
