import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'

// VITE_HASH_ROUTER=1 builds a version with #/ URLs, used for static previews.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Could not find root element to mount to')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
