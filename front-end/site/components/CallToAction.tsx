import { Link } from 'react-router-dom'
import { company } from '../content'

export function CallToAction({ title = 'Tell us what you want more of.' }: { title?: string }) {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-body">
          More calls, more bookings, a site you are proud to send people to. Start with a free
          30-minute call and a written plan.
        </p>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn--sun">Book a free call</Link>
          <a href={company.phoneHref} className="btn btn--ghost-dark">Call {company.phone}</a>
        </div>
      </div>
    </section>
  )
}
