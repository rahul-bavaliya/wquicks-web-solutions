import { Hono } from 'hono'
import { cors } from 'hono/cors'

import contact from './contact'

const app = new Hono()

app.use('/*', cors())

app.route('/api/contact', contact)

app.get('/', (c) => {
    return c.text('WQuicks Backend is Running!')
})

export default app
