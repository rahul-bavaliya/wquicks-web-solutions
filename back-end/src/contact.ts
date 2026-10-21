import { Hono } from 'hono'

type Bindings = { DB: D1Database; RESEND_API_KEY: string; ADMIN_EMAIL: string }

const contact = new Hono<{ Bindings: Bindings }>()

const FROM = 'WQuicks <contact@wquicks.com>'
const LIMITS = { name: 100, email: 200, phone: 40, message: 5000 }

// Everything a visitor types is escaped before it goes into an email.
const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

// The first line of the message says which form was used, e.g. "FREE CALL REQUEST".
function requestType(message: string) {
    const first = message.split('\n')[0].trim()
    if (first === 'FREE CALL REQUEST') return { label: 'Free call request', reply: 'your free call request' }
    if (first === 'FREE WEBSITE CHECK REQUEST') return { label: 'Website check request', reply: 'your free website check request' }
    return { label: 'New inquiry', reply: 'your message' }
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
}

contact.post('/', async (c) => {
    let body: Record<string, unknown>
    try {
        body = await c.req.json()
    } catch {
        return c.json({ success: false, message: 'Send the form as JSON.' }, 400)
    }

    // Hidden "website_url" field: people never see it, spam bots fill it in.
    // Pretend it worked so bots don't retry.
    if (typeof body.website_url === 'string' && body.website_url.trim()) {
        return c.json({ success: true })
    }

    const name = String(body.name ?? '').trim().slice(0, LIMITS.name)
    const email = String(body.email ?? '').trim().slice(0, LIMITS.email)
    const phone = String(body.phone ?? '').trim().slice(0, LIMITS.phone)
    const message = String(body.message ?? '').trim().slice(0, LIMITS.message)

    if (name.length < 2 || !emailOk(email) || message.length < 5) {
        return c.json({ success: false, message: 'Enter your name, a valid email and a message.' }, 400)
    }

    try {
        // Basic flood protection: at most 3 submissions per email address per 10 minutes.
        const recent = await c.env.DB.prepare(
            `SELECT COUNT(*) AS n FROM contacts WHERE email = ? AND created_at > datetime('now', '-10 minutes')`
        ).bind(email).first<{ n: number }>()
        if ((recent?.n ?? 0) >= 3) {
            return c.json({ success: false, message: 'We already have your request. We will reply soon.' }, 429)
        }

        const result = await c.env.DB.prepare(
            `INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)`
        ).bind(name, email, phone, message).run()
        if (!result.success) throw new Error('Insert failed')
        const id = result.meta?.last_row_id

        const type = requestType(message)
        const firstName = esc(name.split(' ')[0])
        const messageHtml = esc(message).replace(/\n/g, '<br>')

        // Emails are best effort: the inquiry is already saved in the admin panel.
        const emails: Promise<void>[] = []

        // 1. Tell the owner straight away. Reply goes directly to the customer.
        if (c.env.ADMIN_EMAIL) {
            emails.push(sendEmail(c.env.RESEND_API_KEY, {
                from: FROM,
                to: [c.env.ADMIN_EMAIL],
                reply_to: email,
                subject: `${type.label} from ${name}`,
                html: `
<div style="font-family:Arial,sans-serif;max-width:600px;color:#15204a;line-height:1.5">
  <h2 style="margin:0 0 16px">${esc(type.label)}</h2>
  <table style="border-collapse:collapse;margin-bottom:16px">
    <tr><td style="padding:4px 16px 4px 0;color:#4c5468">Name</td><td>${esc(name)}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#4c5468">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#4c5468">Phone</td><td>${phone ? esc(phone) : 'Not given'}</td></tr>
  </table>
  <div style="background:#f6f7f3;border-left:4px solid #f4c430;padding:16px">${messageHtml}</div>
  <p style="color:#4c5468;font-size:14px">Reply to this email to answer ${firstName} directly. Saved in the admin panel${id ? ` as #${id}` : ''}.</p>
</div>`,
            }))
        }

        // 2. Confirm to the customer. It doesn't repeat their message, so the
        //    form can't be used to send arbitrary text to other people.
        emails.push(sendEmail(c.env.RESEND_API_KEY, {
            from: FROM,
            to: [email],
            subject: `We got ${type.reply}, ${name.split(' ')[0]}`,
            html: `
<div style="font-family:Arial,sans-serif;max-width:600px;color:#15204a;line-height:1.6">
  <div style="background:#15204a;border-bottom:8px solid #f4c430;padding:24px;border-radius:12px 12px 0 0">
    <p style="margin:0;color:#fff;font-size:22px;font-weight:bold">WQuicks</p>
  </div>
  <div style="padding:24px;border:1px solid #d6d9cf;border-top:0;border-radius:0 0 12px 12px">
    <p style="margin-top:0">Hi ${firstName},</p>
    <p>Thanks for reaching out. We have ${type.reply} and will reply within one business day, usually sooner.</p>
    <p>If it is urgent, call us at <a href="tel:+14374492404">(437) 449-2404</a>.</p>
    <p style="margin-bottom:0">WQuicks Web Solutions<br>Regina, Saskatchewan<br><a href="https://wquicks.com">wquicks.com</a></p>
  </div>
</div>`,
        }))

        const results = await Promise.allSettled(emails)
        results.forEach((r) => r.status === 'rejected' && console.error('Email failed:', r.reason))

        return c.json({ success: true })
    } catch (error) {
        console.error('Error saving inquiry:', error)
        return c.json({ success: false, message: 'Failed to process request' }, 500)
    }
})

export default contact
