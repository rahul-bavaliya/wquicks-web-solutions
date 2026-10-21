import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

const titles: Record<string, string> = {
  '/': 'WQuicks | Web, media and marketing in Regina, SK',
  '/services': 'Services | WQuicks, Regina SK',
  '/work': 'Work | WQuicks, Regina SK',
  '/about': 'About | WQuicks, Regina SK',
  '/contact': 'Contact | WQuicks, Regina SK',
}

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] ?? 'WQuicks'
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
