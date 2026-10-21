// Runs after `vite build`. Writes dist/<page>/index.html for every public page,
// each with its own title, description, canonical link and full content.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = 'https://wquicks.com'

const { render, seo, faqs } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"[^>]*?content=")[^"]*(")`, 's')
  return re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html
}

function page(url, { title, description }, body, extraHead = '') {
  const canonical = SITE + url
  let html = shell
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'title', title)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', canonical)
  html = setMeta(html, 'property', 'twitter:title', title)
  html = setMeta(html, 'property', 'twitter:description', description)
  html = setMeta(html, 'property', 'twitter:url', canonical)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
  if (extraHead) html = html.replace('</head>', `${extraHead}\n</head>`)
  return html.replace('<div id="root"></div>', `<div id="root" data-ssr-path="${url}">${body}</div>`)
}

function write(file, html) {
  const out = path.join(dist, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
}

// Keep an empty copy of the app shell for client-only routes such as /admin.
write('admin/index.html', shell)

// FAQ answers as structured data, which Google and AI tools quote directly.
const faqLd = `  <script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})}</script>`

for (const [url, meta] of Object.entries(seo)) {
  const body = render(url)
  const file = url === '/' ? 'index.html' : `${url.slice(1)}/index.html`
  write(file, page(url, meta, body, url === '/' ? faqLd : ''))
  console.log(`prerendered ${url}`)
}

// Real 404 page for unknown addresses (Cloudflare Pages serves 404.html with a 404 status).
const nf = render('/this-page-does-not-exist')
write('404.html', page('/404', { title: 'Page not found | WQuicks', description: 'This page could not be found.' }, nf)
  .replace(/<link rel="canonical"[^>]*>\s*/, '')
  .replace('data-ssr-path="/404"', 'data-ssr-path="404"'))
console.log('prerendered 404.html')

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
