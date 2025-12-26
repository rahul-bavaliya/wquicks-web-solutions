import { Hono } from 'hono'

const contact = new Hono<{ Bindings: { DB: D1Database } }>()

contact.post('/', async (c) => {
    try {
        const body = await c.req.json()
        const { name, email, phone, message } = body

        // Log the received data (Simulating database insertion)
        console.log('Received Contact Form Submission:')
        console.log('Name:', name)
        console.log('Email:', email)
        console.log('Phone:', phone)
        console.log('Message:', message)

        // Insert into D1 Database
        // Note: 'DB' matches the binding name in wrangler.toml
        const result = await c.env.DB.prepare(
            `INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)`
        ).bind(name, email, phone, message).run();

        if (result.success) {
            return c.json({
                success: true,
                message: 'Contact information saved successfully'
            })
        } else {
            throw new Error('Failed to save to database');
        }
    } catch (error) {
        console.error('Error processing request:', error)
        return c.json({
            success: false,
            message: 'Failed to process request'
        }, 500)
    }
})

export default contact
