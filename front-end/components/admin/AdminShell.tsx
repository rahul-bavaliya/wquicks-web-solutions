import { useEffect, useState } from 'react'
import { AdminDashboard } from './AdminDashboard'
import { AdminLogin } from './AdminLogin'
import { brandTheme } from '../../utils/theme'
import type { Theme } from '../../types'
import '../../index.css'

// The admin screens are styled with Tailwind's CDN build. The public site
// doesn't use Tailwind, so it is only loaded when someone opens /admin.
const TAILWIND_SRC = 'https://cdn.tailwindcss.com?plugins=forms'

function loadTailwind(): Promise<void> {
  if ((window as any).tailwind) return Promise.resolve()
  return new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = TAILWIND_SRC
    s.onload = () => {
      ;(window as any).tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            colors: { brand: { primary: 'var(--brand-primary)', secondary: 'var(--brand-secondary)' } },
          },
        },
      }
      resolve()
    }
    s.onerror = () => resolve()
    document.head.appendChild(s)
  })
}

export default function AdminShell() {
  const [ready, setReady] = useState(false)
  const [password, setPassword] = useState<string | null>(() => localStorage.getItem('admin_password'))
  const [theme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light')

  useEffect(() => {
    document.title = 'WQuicks admin'
    document.documentElement.style.setProperty('--brand-primary', brandTheme.primary)
    document.documentElement.style.setProperty('--brand-secondary', brandTheme.secondary)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    loadTailwind().then(() => setReady(true))
  }, [theme])

  if (!ready) return null

  const login = (pw: string) => {
    localStorage.setItem('admin_password', pw)
    setPassword(pw)
  }
  const logout = () => {
    localStorage.removeItem('admin_password')
    setPassword(null)
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'}`}>
      {password ? (
        <AdminDashboard theme={theme} token={password} onLogout={logout} />
      ) : (
        <AdminLogin theme={theme} onLogin={login} />
      )}
    </div>
  )
}
