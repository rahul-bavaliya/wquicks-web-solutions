import { Hono } from 'hono'

const contact = new Hono<{ Bindings: { DB: D1Database; RESEND_API_KEY: string } }>()

contact.post('/', async (c) => {
    try {
        const body = await c.req.json()
        const { name, email, phone, message } = body

        // 1. Insert into D1 Database
        const result = await c.env.DB.prepare(
            `INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)`
        ).bind(name, email, phone, message).run();

        if (result.success) {
            // 2. Send Automated Thank You Email
            try {
                await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'WQuicks Web Solutions <contact@wquicks.com>',
                        to: [email],
                        subject: `Thank you for reaching out, ${name}!`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
                                <div style="background-color: #3b82f6; padding: 40px 20px; text-align: center; border-radius: 20px 20px 0 0;">
                                    <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: -0.025em;">WQuicks</h1>
                                    <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-weight: 500;">Web Solutions & Digital Excellence</p>
                                </div>
                                <div style="padding: 40px 30px; background: white; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 20px 20px;">
                                    <h2 style="font-size: 22px; margin-top: 0;">Hi ${name},</h2>
                                    <p>Thank you for reaching out to WQuicks Web Solutions! We've successfully received your project inquiry.</p>
                                    <p>Our engineering team in Regina is currently reviewing your message:</p>
                                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; font-style: italic; border-left: 4px solid #3b82f6;">
                                        "${message}"
                                    </div>
                                    <p style="margin-top: 25px;"><strong>What happens next?</strong></p>
                                    <p>One of our specialists will analyze your requirements and reach out within the next 24 business hours to discuss how we can bring your vision to life.</p>
                                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                                    <p style="font-size: 14px; color: #64748b; margin-bottom: 0;">
                                        Best Regards,<br />
                                        <strong>The WQuicks Engineering Team</strong><br />
                                        Regina, SK, Canada
                                    </p>
                                </div>
                            </div>
                        `
                    })
                });
            } catch (emailError) {
                console.error('Failed to send thank you email:', emailError);
                // We don't fail the whole request if email fails, as DB insert succeeded
            }

            return c.json({
                success: true,
                message: 'Contact information saved and confirmation sent'
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
