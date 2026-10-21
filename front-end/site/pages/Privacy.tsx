import { company } from '../content'
import { PageIntro } from '../components/PageIntro'

// Plain-language privacy policy for the contact, booking and website check forms.
// Review it against your own practices; it is not legal advice.
export default function Privacy() {
  return (
    <>
      <PageIntro title="Privacy policy">
        <p>Last updated October 21, 2026.</p>
      </PageIntro>
      <section className="section">
        <div className="wrap legal prose">
          <h2>What we collect</h2>
          <p>
            When you use a form on this site we collect what you type in: your name, email, phone
            number if you give it, your website address and your message. We do not collect payment
            details on this site.
          </p>
          <h2>Why we collect it</h2>
          <p>
            Only to reply to you: to book your call, send your website check, prepare a quote or
            answer your question. We may send you one follow-up about your request. We do not add
            you to a mailing list without asking.
          </p>
          <h2>Who we share it with</h2>
          <p>
            We never sell your information. It is stored with the service providers that run this
            site: Cloudflare (hosting and our database) and Resend (sending our reply emails). They
            may store data outside Canada.
          </p>
          <h2>How long we keep it</h2>
          <p>
            We keep enquiries for up to two years, or longer if you become a client and we need the
            records for the work and for tax purposes.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask to see, correct or delete the information we hold about you. Email{' '}
            <a href={`mailto:${company.email}`}>{company.email}</a> and we will respond within 30
            days.
          </p>
          <h2>Questions</h2>
          <p>
            Contact {company.legalName} at <a href={`mailto:${company.email}`}>{company.email}</a>{' '}
            or <a href={company.phoneHref}>{company.phone}</a>.
          </p>
        </div>
      </section>
    </>
  )
}
