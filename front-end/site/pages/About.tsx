import { values, company } from '../content'
import { PageIntro } from '../components/PageIntro'
import { CallToAction } from '../components/CallToAction'

export default function About() {
  return (
    <>
      <PageIntro title="A Regina studio for owners who'd rather be running their business.">
        <p>
          WQuicks builds websites and apps for Saskatchewan businesses. We added photo, video and
          marketing because a great site only pays off when the right people see it.
        </p>
      </PageIntro>

      <section className="section">
        <div className="wrap split">
          <h2 className="h2">How we work</h2>
          <dl className="values">
            {values.map((v) => (
              <div key={v.name} className="value">
                <dt>{v.name}</dt>
                <dd>{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap split">
          <h2 className="h2">Built by an engineer, shaped by small business</h2>
          <div className="prose">
            {/* TODO: add the founder's name and photo here. */}
            <p>
              WQuicks is run by a Regina-based software engineer with more than six years of
              experience building enterprise software, web apps and AI tools. That experience now
              goes into projects sized for local businesses: fast, secure sites that keep working
              long after launch.
            </p>
            <p>
              We are a small studio on purpose. You deal with the person building your site, not
              an account manager, and you get the same care whether it is a five-page site or a
              custom app.
            </p>
            <p>
              We work from Regina and meet clients in person across the city. Call us at{' '}
              <a href={company.phoneHref}>{company.phone}</a> to talk about your business.
            </p>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
