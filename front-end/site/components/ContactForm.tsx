import { useState, type ChangeEvent, type FormEvent } from 'react'
import { API_ENDPOINTS } from '../../utils/api'
import { company, services } from '../content'

type Status = 'idle' | 'sending' | 'sent'
type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message' | 'form', string>>

// Formats as +1 (306) 555-0123 while typing.
function formatPhone(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('1')) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  if (!digits) return ''
  let out = `+1 (${digits.slice(0, 3)}`
  if (digits.length >= 4) out += `) ${digits.slice(3, 6)}`
  if (digits.length >= 7) out += `-${digits.slice(6)}`
  return out
}

export function ContactForm({ initialService }: { initialService?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [phone, setPhone] = useState('')
  const [picked, setPicked] = useState<string[]>(initialService ? [initialService] : [])
  const [sentTo, setSentTo] = useState('')

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const data = new FormData(formEl)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const next: Errors = {}
    if (name.length < 2) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter an email address like name@business.ca.'
    if (phone && phone.replace(/\D/g, '').length < 11) next.phone = 'Enter a 10-digit phone number, or leave it blank.'
    if (message.length < 10) next.message = 'Tell us a little about the project (at least 10 characters).'
    setErrors(next)
    if (Object.keys(next).length) {
      formEl.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    // The backend stores name, email, phone and message, so the chosen
    // services go at the top of the message.
    const wanted = services.filter((s) => picked.includes(s.id)).map((s) => s.name)
    const fullMessage = wanted.length ? `Interested in: ${wanted.join(', ')}\n\n${message}` : message

    setStatus('sending')
    try {
      const res = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message: fullMessage }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setSentTo(name.split(' ')[0])
      setStatus('sent')
      formEl.reset()
      setPhone('')
      setPicked([])
    } catch {
      setStatus('idle')
      setErrors({
        form: `Your message didn't send. Check your connection and try again, or email ${company.email}.`,
      })
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <h2>Thanks, {sentTo}. Your message is in.</h2>
        <p>We reply within one business day, usually sooner. If it is urgent, call {company.phone}.</p>
        <button type="button" className="btn btn--line" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    )
  }

  const field = (key: keyof Errors) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <fieldset className="form-row">
        <legend>What do you need?</legend>
        <div className="chips">
          {services.map((s) => (
            <label key={s.id} className="chip">
              <input type="checkbox" checked={picked.includes(s.id)} onChange={() => toggle(s.id)} />
              <span>{s.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" {...field('name')} />
          {errors.name && <p id="name-error" className="form-error">{errors.name}</p>}
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" {...field('email')} />
          {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="phone">
          Phone <span className="form-optional">optional</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(formatPhone(e.target.value))}
          {...field('phone')}
        />
        {errors.phone && <p id="phone-error" className="form-error">{errors.phone}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="message">About your project</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What does your business do, and what would you like to change?"
          {...field('message')}
        />
        {errors.message && <p id="message-error" className="form-error">{errors.message}</p>}
      </div>

      {errors.form && <p className="form-error form-error--block" role="alert">{errors.form}</p>}

      <button type="submit" className="btn btn--sky" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
