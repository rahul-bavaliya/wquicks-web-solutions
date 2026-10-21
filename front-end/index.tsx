import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'

// VITE_HASH_ROUTER=1 builds a version with #/ URLs, used for static previews.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Could not find root element to mount to')

const app = (
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)

// Pages are pre-rendered at build time. If this HTML was rendered for the
// current address, attach to it; otherwise (e.g. /admin) render fresh.
const ssrPath = rootElement.dataset.ssrPath
const here = window.location.pathname.replace(/\/+$/, '') || '/'
if (ssrPath && ssrPath === here && !import.meta.env.VITE_HASH_ROUTER) {
  ReactDOM.hydrateRoot(rootElement, app)
} else {
  rootElement.innerHTML = ''
  ReactDOM.createRoot(rootElement).render(app)
}
