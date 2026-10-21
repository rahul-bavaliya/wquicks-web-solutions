import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { API_ENDPOINTS } from '../../utils/api'
import { company } from '../content'

// A form that sends a lead to the existing /api/contact endpoint.
// The backend stores name, email, phone and message, so every extra
// field is written into the message in a readable block.

export type Field =
  | { kind: 'text' | 'email' | 'tel' | 'url'; name: string; label: string; required?: boolean; hint?: string; autoComplete?: string; placeholder?: string; wide?: boolean }
  | { kind: 'textarea'; name: string; label: string; required?: boolean; hint?: string; placeholder?: string; wide?: boolean }
  | { kind: 'choices'; name: string; label: string; options: string[]; multiple?: boolean; required?: boolean; wide?: boolean }

type Values = Record<string, string | string[]>

// Formats as +1 (306) 555-0123 while typing.
export function formatPhone(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('1')) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  if (!digits) return ''
  let out = `+1 (${digits.slice(0, 3)}`
  if (digits.length >= 4) out += `) ${digits.slice(3, 6)}`
  if (digits.length >= 7) out += `-${digits.slice(6)}`
  return out
}

// Accepts "mybusiness.ca" as well as full URLs.
function normaliseUrl(value: string) {
  const v = value.trim()
  if (!v) return ''
  const withProtocol = /^https?:\/\//i.test(v) ? v : `https://${v}`
  try {
    const u = new URL(withProtocol)
    return u.hostname.includes('.') ? u.href : ''
  } catch {
    return ''
  }
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export function LeadForm({
  heading,
  fields,
  submitLabel,
  sendingLabel,
  done,
}: {
  heading: string // first line of the message, e.g. "Free call request"
  fields: Field[]
  submitLabel: string
  sendingLabel: string
  done: (firstName: string) => ReactNode
}) {
  const empty = () => Object.fromEntries(fields.map((f) => [f.name, f.kind === 'choices' && f.multiple ? [] : ''])) as Values
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [firstName, setFirstName] = useState('')

  const set = (name: string, v: string | string[]) => setValues((s) => ({ ...s, [name]: v }))
  const str = (name: string) => String(values[name] ?? '').trim()

  function validate() {
    const next: Record<string, string> = {}
    for (const f of fields) {
      const v = values[f.name]
      const empty = Array.isArray(v) ? v.length === 0 : !String(v).trim()
      if (f.required && empty) {
        next[f.name] = f.kind === 'choices' ? `Choose at least one option.` : `Enter your ${f.label.toLowerCase().replace(/^your /, '')}.`
        continue
      }
      if (empty) continue
      if (f.kind === 'email' && !emailOk(String(v).trim())) next[f.name] = 'Enter an email address like name@business.ca.'
      if (f.kind === 'tel' && String(v).replace(/\D/g, '').length < 11) next[f.name] = 'Enter a 10-digit phone number, or leave it blank.'
      if (f.kind === 'url' && !normaliseUrl(String(v))) next[f.name] = 'Enter a website address like mybusiness.ca.'
    }
    return next
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) {
      requestAnimationFrame(() => formEl.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }

    const name = str('name')
    const email = str('email')
    const phone = str('phone')
    const lines = fields
      .filter((f) => !['name', 'email', 'phone'].includes(f.name))
      .map((f) => {
        const v = values[f.name]
        const text = Array.isArray(v) ? v.join(', ') : f.kind === 'url' ? normaliseUrl(String(v)) : String(v).trim()
        return text ? `${f.label}: ${text}` : ''
      })
      .filter(Boolean)
    const message = `${heading.toUpperCase()}\n\n${lines.join('\n')}`

    setStatus('sending')
    try {
      const res = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, website_url: String(new FormData(formEl).get('website_url') ?? '') }),
      })
      if (res.status === 429) {
        setStatus('idle')
        setErrors({ form: `We already have your request and will reply soon. Need us sooner? Call ${company.phone}.` })
        return
      }
      if (!res.ok) throw new Error(String(res.status))
      setFirstName(name.split(' ')[0])
      setStatus('sent')
      setValues(empty())
    } catch {
      setStatus('idle')
      setErrors({ form: `Your request didn't send. Check your connection and try again, or call ${company.phone}.` })
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        {done(firstName)}
      </div>
    )
  }

  const aria = (name: string) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const error = (name: string) =>
    errors[name] ? <p id={`${name}-error`} className="form-error">{errors[name]}</p> : null
  const label = (f: Field) => (
    <>
      {f.label}
      {!f.required && <span className="form-optional"> optional</span>}
    </>
  )

  return (
    <form className="form lead-form" onSubmit={onSubmit} noValidate>
      {fields.map((f) => {
        const cls = `form-row${f.wide ? ' form-row--wide' : ''}`
        if (f.kind === 'choices') {
          const current = values[f.name]
          return (
            <fieldset key={f.name} className={cls} {...aria(f.name)}>
              <legend>{label(f)}</legend>
              <div className="chips">
                {f.options.map((o) => {
                  const checked = Array.isArray(current) ? current.includes(o) : current === o
                  return (
                    <label key={o} className="chip">
                      <input
                        type={f.multiple ? 'checkbox' : 'radio'}
                        name={f.name}
                        checked={checked}
                        onChange={() =>
                          f.multiple
                            ? set(f.name, checked ? (current as string[]).filter((x) => x !== o) : [...(current as string[]), o])
                            : set(f.name, o)
                        }
                      />
                      <span>{o}</span>
                    </label>
                  )
                })}
              </div>
              {error(f.name)}
            </fieldset>
          )
        }
        if (f.kind === 'textarea') {
          return (
            <div key={f.name} className={cls}>
              <label htmlFor={f.name}>{label(f)}</label>
              <textarea
                id={f.name}
                name={f.name}
                rows={4}
                placeholder={f.placeholder}
                value={String(values[f.name])}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set(f.name, e.target.value)}
                {...aria(f.name)}
              />
              {error(f.name)}
            </div>
          )
        }
        return (
          <div key={f.name} className={cls}>
            <label htmlFor={f.name}>{label(f)}</label>
            <input
              id={f.name}
              name={f.name}
              type={f.kind === 'url' ? 'text' : f.kind}
              inputMode={f.kind === 'url' ? 'url' : undefined}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={String(values[f.name])}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                set(f.name, f.kind === 'tel' ? formatPhone(e.target.value) : e.target.value)
              }
              {...aria(f.name)}
            />
            {f.hint && <p className="form-hint">{f.hint}</p>}
            {error(f.name)}
          </div>
        )
      })}

      {/* Hidden from people; spam bots fill it in and get ignored. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website_url">Leave this empty</label>
        <input id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      {errors.form && <p className="form-error form-error--block form-row--wide" role="alert">{errors.form}</p>}

      <div className="form-row--wide">
        <button type="submit" className="btn btn--sky" disabled={status === 'sending'}>
          {status === 'sending' ? sendingLabel : submitLabel}
        </button>
      </div>
    </form>
  )
}
