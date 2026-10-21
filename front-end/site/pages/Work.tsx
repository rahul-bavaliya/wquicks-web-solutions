import { projects } from '../content'
import { PageIntro } from '../components/PageIntro'
import { ProjectCard } from '../components/ProjectCard'
import { CallToAction } from '../components/CallToAction'

export default function Work() {
  return (
    <>
      <PageIntro title="Work">
        <p>Websites, shoots and campaigns for businesses around Regina and southern Saskatchewan.</p>
      </PageIntro>
      <section className="section">
        <div className="wrap projects">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
      <CallToAction title="Your business could be next on this page." />
    </>
  )
}
