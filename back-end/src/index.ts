import { Hono } from 'hono'
import { cors } from 'hono/cors'

import contact from './contact'

const app = new Hono<{ Bindings: { ALLOWED_ORIGIN: string; DB: D1Database } }>()

app.use('/*', async (c, next) => {
    const corsMiddleware = cors({
        origin: c.env.ALLOWED_ORIGIN,
        allowMethods: ['POST', 'GET', 'OPTIONS'],
        allowHeaders: ['Content-Type'],
        maxAge: 600,
    })
    return corsMiddleware(c, next)
})

app.route('/api/contact', contact)

app.get('/', (c) => {
    return c.text('WQuicks Backend is Running!')
})

export default app
