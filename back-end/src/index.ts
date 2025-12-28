import { Hono } from 'hono'
import { cors } from 'hono/cors'

import contact from './contact'
import admin from './admin'

const app = new Hono<{ Bindings: { ALLOWED_ORIGIN: string; DB: D1Database } }>()

app.use('/*', async (c, next) => {
    const originHeader = c.req.header('Origin');
    const allowedOrigins = [c.env.ALLOWED_ORIGIN, 'http://127.0.0.1:3000'];
    const corsMiddleware = cors({
        origin: (originHeader && allowedOrigins.includes(originHeader)) ? originHeader : c.env.ALLOWED_ORIGIN,
        allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'X-Admin-Password'],
        maxAge: 600,
    })
    return corsMiddleware(c, next)
})

app.route('/api/contact', contact)
app.route('/api/admin', admin)

app.get('/', (c) => {
    return c.text('WQuicks Backend is Running!')
})

export default app
