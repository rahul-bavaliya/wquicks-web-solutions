import type { ReactNode } from 'react'

// Shared top-of-page block for inner pages: a short sky band with a canola horizon.
export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="intro">
      <div className="wrap">
        <h1 className="intro-title">{title}</h1>
        {children && <div className="intro-body">{children}</div>}
      </div>
    </section>
  )
}
