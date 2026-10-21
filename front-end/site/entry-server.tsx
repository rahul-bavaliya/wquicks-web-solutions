// Used only at build time: renders each public page to HTML so search engines
// and AI tools that don't run JavaScript still see the full content.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../App'
import { seo, faqs, company } from './content'

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}

export { seo, faqs, company }
