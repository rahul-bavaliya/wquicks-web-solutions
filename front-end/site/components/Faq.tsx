import { faqs } from '../content'

// Native <details> keeps the accordion keyboard- and screen-reader-friendly.
export function Faq() {
  return (
    <div className="faq">
      {faqs.map((f) => (
        <details key={f.q} className="faq-item">
          <summary>
            <span>{f.q}</span>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
