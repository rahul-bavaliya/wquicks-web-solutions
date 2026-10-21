import { Hono } from 'hono'
import { cors } from 'hono/cors'

import contact from './contact'
import admin from './admin'

const app = new Hono<{ Bindings: { ALLOWED_ORIGIN: string; DB: D1Database } }>()

app.use('*', async (c, next) => {
    const origin = c.req.header('Origin');
    const allowedOrigins = [
        c.env.ALLOWED_ORIGIN,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://uat.wquicks.com',
        'https://wquicks.com'
    ].filter(Boolean);

    const originToAllow = (origin && allowedOrigins.includes(origin))
        ? origin
        : c.env.ALLOWED_ORIGIN;

    console.log(`[CORS] Prod Request Origin: ${origin} | Allowed: ${originToAllow}`);

    const corsMiddleware = cors({
        origin: originToAllow,
        allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'X-Admin-Password'],
        maxAge: 600,
        credentials: true,
    });
    return corsMiddleware(c, next);
});

app.route('/api/contact', contact)
app.route('/api/admin', admin)

app.get('/', (c) => {
    return c.text('WQuicks Backend is Running!')
})

export default app
