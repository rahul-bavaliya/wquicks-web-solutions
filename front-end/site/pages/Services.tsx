import { Link } from 'react-router-dom'
import { services } from '../content'
import { PageIntro } from '../components/PageIntro'
import { CallToAction } from '../components/CallToAction'

export default function Services() {
  return (
    <>
      <PageIntro title="Services">
        <p>
          Web, media and marketing for Saskatchewan businesses. Hire us for one, or let one team
          run all three.
        </p>
        <nav className="intro-jump" aria-label="Jump to service">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.name}</a>
          ))}
        </nav>
      </PageIntro>

      {services.map((s) => (
        <section key={s.id} id={s.id} className="section service" aria-labelledby={`${s.id}-title`}>
          <div className="wrap split">
            <div>
              <h2 id={`${s.id}-title`} className="service-name">{s.name}</h2>
              <p className="service-lead">{s.lead}</p>
            </div>
            <div>
              <p className="prose">{s.body}</p>
              <ul className="checklist">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={`/contact?service=${s.id}`} className="btn btn--line">
                Ask about {s.name.toLowerCase()}
              </Link>
            </div>
          </div>
        </section>
      ))}

      <CallToAction title="Not sure where to start?" />
    </>
  )
}
