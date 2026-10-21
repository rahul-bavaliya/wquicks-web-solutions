import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { seo } from '../content'

const SITE = 'https://wquicks.com'

// Keeps the title, description and canonical link right when moving between
// pages in the browser. The pre-rendered HTML already has them for crawlers.
function applySeo(pathname: string) {
  const page = seo[pathname]
  document.title = page?.title ?? "Page not found | WQuicks"
  const set = (selector: string, attr: string, value: string) =>
    document.querySelector(selector)?.setAttribute(attr, value)
  if (page) {
    set('meta[name="description"]', 'content', page.description)
    set('meta[property="og:title"]', 'content', page.title)
    set('meta[property="og:description"]', 'content', page.description)
  }
  const url = SITE + (pathname === '/' ? '/' : pathname)
  set('link[rel="canonical"]', 'href', url)
  set('meta[property="og:url"]', 'content', url)
}

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    applySeo(pathname)
    if (hash) {
      // Wait a frame so the target section exists, then scroll to it.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <div className="site">
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
