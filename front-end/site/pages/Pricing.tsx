import { Link } from 'react-router-dom'
import { websitePlans, carePlans, extras, foundingOffer, guarantees, type Plan } from '../content'
import { PageIntro } from '../components/PageIntro'
import { CallToAction } from '../components/CallToAction'

function PlanCard({ plan, from }: { plan: Plan; from?: boolean }) {
  return (
    <article className={`plan${plan.featured ? ' plan--featured' : ''}`}>
      {plan.featured && <p className="plan-flag">Most chosen</p>}
      <h3 className="plan-name">{plan.name}</h3>
      <p className="plan-price">
        {from && <span className="plan-from">from </span>}
        {plan.price}
        {plan.unit && <span className="plan-unit">{plan.unit}</span>}
      </p>
      <p className="plan-for">{plan.for}</p>
      <ul className="checklist">
        {plan.items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </article>
  )
}

export function FoundingOffer() {
  return (
    <section className="offer" aria-labelledby="offer-title">
      <div className="wrap offer-inner">
        <div>
          <h2 id="offer-title" className="offer-title">{foundingOffer.title}</h2>
          <p className="offer-body">{foundingOffer.body}</p>
          <p className="offer-note">{foundingOffer.spotsNote}</p>
        </div>
        <Link to="/book" className="btn btn--sky">Claim a founding spot</Link>
      </div>
    </section>
  )
}

export function Guarantees() {
  return (
    <dl className="guarantees">
      {guarantees.map((g) => (
        <div key={g.name} className="guarantee">
          <dt>{g.name}</dt>
          <dd>{g.body}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function Pricing() {
  return (
    <>
      <PageIntro title="Pricing">
        <p>
          Clear starting prices, then a fixed quote in writing after a free call. All prices in
          Canadian dollars, before tax.
        </p>
        <nav className="intro-jump" aria-label="Jump to">
          <a href="#websites">Websites</a>
          <a href="#care">Care plans</a>
          <a href="#extras">Media and marketing</a>
        </nav>
      </PageIntro>

      <section id="websites" className="section" aria-labelledby="websites-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="websites-title" className="h2">Websites</h2>
            <p className="prose">One-time price. You own the site, domain and content.</p>
          </div>
          <div className="plans">
            {websitePlans.map((p) => (
              <PlanCard key={p.name} plan={p} from />
            ))}
          </div>
        </div>
      </section>

      <FoundingOffer />

      <section id="care" className="section section--paper2" aria-labelledby="care-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="care-title" className="h2">Care plans</h2>
            <p className="prose">Optional, month to month. Cancel anytime.</p>
          </div>
          <div className="plans">
            {carePlans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="extras" className="section" aria-labelledby="extras-title">
        <div className="wrap split">
          <h2 id="extras-title" className="h2">Media and marketing</h2>
          <table className="price-table">
            <tbody>
              {extras.map((x) => (
                <tr key={x.name}>
                  <th scope="row">{x.name}</th>
                  <td>
                    {x.price}
                    {x.note && <span className="price-note"> {x.note}</span>}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">Website check</th>
                <td>
                  Free <Link to="/website-check" className="text-link">Get yours</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="promise-title">
        <div className="wrap split">
          <h2 id="promise-title" className="h2">Our promise</h2>
          <Guarantees />
        </div>
      </section>

      <CallToAction title="Not sure which fits? Ask us." />
    </>
  )
}
