import type { Project } from '../content'
import { services } from '../content'

const tagName = (id: Project['tags'][number]) => services.find((s) => s.id === id)?.name ?? id

// Each project gets an abstract prairie "landscape" as its cover until real
// screenshots replace it (drop an <img> into .project-cover).
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project">
      <div className={`project-cover project-cover--${project.tone}`} aria-hidden="true">
        <span className="project-sun" />
        <span className="project-field" />
        <span className="project-sample">{project.badge}</span>
      </div>
      <div className="project-text">
        <p className="project-kind">{project.kind}</p>
        <h3 className="project-title">{project.title}</h3>
        <p>{project.summary}</p>
        <ul className="tags" aria-label="Services used">
          {project.tags.map((t) => (
            <li key={t}>{tagName(t)}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
