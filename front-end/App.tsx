import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './site/components/Layout'
import Home from './site/pages/Home'
import Services from './site/pages/Services'
import Work from './site/pages/Work'
import About from './site/pages/About'
import Contact from './site/pages/Contact'
import NotFound from './site/pages/NotFound'
import Pricing from './site/pages/Pricing'
import Book from './site/pages/Book'
import WebsiteCheck from './site/pages/WebsiteCheck'
import Privacy from './site/pages/Privacy'
import './site/site.css'

// The admin dashboard (and its PDF tools) loads only when /admin is opened.
const AdminShell = lazy(() => import('./components/admin/AdminShell'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="book" element={<Book />} />
        <Route path="website-check" element={<WebsiteCheck />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="work" element={<Work />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path="admin"
        element={
          <Suspense fallback={null}>
            <AdminShell />
          </Suspense>
        }
      />
    </Routes>
  )
}
