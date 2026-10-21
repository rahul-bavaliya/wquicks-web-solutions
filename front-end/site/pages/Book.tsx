import { Link } from 'react-router-dom'
import { company } from '../content'
import { PageIntro } from '../components/PageIntro'
import { LeadForm } from '../components/LeadForm'

export default function Book() {
  return (
    <>
      <PageIntro title="Book a free 30-minute call">
        <p>
          Tell us when suits you and what is on your mind. We confirm a time within one business
          day. No cost, no obligation, and you leave with ideas you can use either way.
        </p>
      </PageIntro>
      <section className="section">
        <div className="wrap contact">
          <LeadForm
            heading="Free call request"
            submitLabel="Request my free call"
            sendingLabel="Sending…"
            fields={[
              { kind: 'text', name: 'name', label: 'Your name', required: true, autoComplete: 'name' },
              { kind: 'email', name: 'email', label: 'Email', required: true, autoComplete: 'email' },
              { kind: 'tel', name: 'phone', label: 'Phone', autoComplete: 'tel' },
              { kind: 'text', name: 'business', label: 'Business name', autoComplete: 'organization' },
              { kind: 'url', name: 'website', label: 'Current website', placeholder: 'mybusiness.ca', wide: true },
              {
                kind: 'choices',
                name: 'times',
                label: 'Best times for you',
                options: ['Weekday morning', 'Weekday afternoon', 'Weekday evening', 'Saturday'],
                multiple: true,
                required: true,
                wide: true,
              },
              {
                kind: 'choices',
                name: 'how',
                label: 'How should we meet?',
                options: ['Phone call', 'Video call', 'In person in Regina'],
                required: true,
                wide: true,
              },
              {
                kind: 'textarea',
                name: 'topic',
                label: 'What would you like to talk about?',
                placeholder: 'A new website, more calls from Google, photos, ads…',
                wide: true,
              },
            ]}
            done={(first) => (
              <>
                <h2>Thanks{first ? `, ${first}` : ''}. Your call request is in.</h2>
                <p>
                  We will email you within one business day to confirm a time. If it is urgent,
                  call {company.phone}.
                </p>
                <p>
                  While you wait, get a <Link to="/website-check">free website check</Link> so we
                  can bring findings to the call.
                </p>
              </>
            )}
          />
          <aside className="contact-aside" aria-label="What happens on the call">
            <h2 className="contact-h">On the call we will</h2>
            <ul className="checklist checklist--light">
              <li>Learn how customers find you today</li>
              <li>Look at your site and Google listing together</li>
              <li>Suggest the 2 or 3 changes that would help most</li>
              <li>Give you a ballpark price if you want one</li>
            </ul>
            <p className="contact-note">Prefer to call now?</p>
            <a className="contact-big" href={company.phoneHref}>{company.phone}</a>
          </aside>
        </div>
      </section>
    </>
  )
}
