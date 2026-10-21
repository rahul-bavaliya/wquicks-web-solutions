import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Wordmark } from './Mark'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/website-check', label: 'Free website check' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`header${open ? ' is-open' : ''}`}>
      <div className="wrap header-inner">
        <Link to="/" className="header-home" aria-label="WQuicks home">
          <Wordmark />
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className="nav" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav-link">
              {l.label}
            </NavLink>
          ))}
          <Link to="/book" className="btn btn--sun btn--small">
            Book a free call
          </Link>
        </nav>
      </div>
    </header>
  )
}
