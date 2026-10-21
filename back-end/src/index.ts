import { Hono } from 'hono'
import { cors } from 'hono/cors'

import contact from './contact'
import admin from './admin'

const app = new Hono<{ Bindings: { ALLOWED_ORIGIN: string; DB: D1Database } }>()

// Sites allowed to call this API from a browser.
const FIXED_ORIGINS = [
    'https://wquicks.com',
    'https://www.wquicks.com',
    'https://uat.wquicks.com',
    'https://dev.wquicks.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
// Cloudflare Pages preview links, e.g. https://abc123.prod-wquicks-frontend.pages.dev
const PREVIEW_ORIGIN = /^https:\/\/([a-z0-9-]+\.)?(prod-wquicks-frontend|uat-frontend-wquicks-web-solutions|dev-frontend-wquicks-web-solutions)\.pages\.dev$/

app.use('*', async (c, next) => {
    const origin = c.req.header('Origin') ?? ''
    const allowed = origin === c.env.ALLOWED_ORIGIN || FIXED_ORIGINS.includes(origin) || PREVIEW_ORIGIN.test(origin)

    return cors({
        origin: allowed ? origin : c.env.ALLOWED_ORIGIN,
        allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'X-Admin-Password'],
        maxAge: 600,
        credentials: true,
    })(c, next)
})

app.route('/api/contact', contact)
app.route('/api/admin', admin)

app.get('/', (c) => {
    return c.text('WQuicks Backend is Running!')
})

export default app
