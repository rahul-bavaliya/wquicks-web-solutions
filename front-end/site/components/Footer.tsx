import { Link } from 'react-router-dom'
import { Wordmark } from './Mark'
import { company, services } from '../content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Wordmark />
          <p>Web, media and marketing for businesses in Regina and across Saskatchewan.</p>
        </div>
        <nav aria-label="Services">
          <h2 className="footer-h">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Studio">
          <h2 className="footer-h">Studio</h2>
          <ul>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/work">What we've built</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/book">Book a free call</Link></li>
            <li><Link to="/website-check">Free website check</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="footer-h">Get in touch</h2>
          <ul>
            <li><a href={company.phoneHref}>{company.phone}</a></li>
            <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
            <li>{company.area}</li>
            {company.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {company.legalName}</span>
        <span><Link to="/privacy">Privacy policy</Link></span>
        <span>Made in Regina, on Treaty 4 territory</span>
      </div>
    </footer>
  )
}
