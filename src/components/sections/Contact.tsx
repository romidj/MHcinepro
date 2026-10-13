'use client'

import type {FormEvent, ReactNode} from 'react'
import {useState} from 'react'
import {Mail, MapPin, Phone, Send} from 'lucide-react'
import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'

import type {SiteSettings} from '@/sanity/lib/types'

const fallbackSettings = {
  studioEmail: 'hello@mhcinepro.com',
  studioPhone: '+213 00 00 00 00',
  studioAddress: 'Draa Ben khedda, tizi ouzou, Algérie',
}

type ContactFormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export function Contact({settings}: {settings: SiteSettings}) {
  const contact = {...fallbackSettings, ...settings}
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function updateField(field: keyof ContactFormData, value: string) {
    setForm((current) => ({...current, [field]: value}))

    if (status !== 'idle') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      })

      const data = (await response.json()) as {error?: string}

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue.')
      }

      setForm(initialForm)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.'
      )
    }
  }

  return (
    <section id="contact" className="bg-brand-black px-0 py-20 md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-2 lg:items-stretch">
        <div className="flex h-full flex-col">
          <h2 className="cinema-heading text-3xl text-white md:text-5xl">
            Contactez-
            nous
          </h2>

          <div className="mt-12 space-y-5">
            <ContactLine icon={<Mail className="h-4 w-4" />} label="Email" value={contact.studioEmail} />
            <ContactLine icon={<Phone className="h-4 w-4" />} label="Téléphone" value={contact.studioPhone} />
            <ContactLine icon={<MapPin className="h-4 w-4" />} label="Localisation" value={contact.studioAddress} />
          </div>

          <div className="relative mt-10 min-h-44 flex-1 overflow-hidden border border-white/10 transition hover:border-brand-yellow hover:shadow-card">
            <iframe
              title="Localisation MH CinePro"
              src="https://www.google.com/maps?q=36.7327977,3.9656477&z=17&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.app.goo.gl/WVj7PLRDea1yf4zr7"
              target="_blank"
              rel="noreferrer"
              className="absolute inset-x-0 bottom-0 bg-black/75 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-brand-yellow hover:text-black"
            >
              Ouvrir la localisation
            </a>
          </div>
        </div>

        <div className="bg-[linear-gradient(120deg,#111,#14110a)] p-8 shadow-[0_0_40px_rgba(255,214,10,0.08)] md:p-14">
          <form className="grid gap-7" onSubmit={handleSubmit}>
            <div className="grid gap-7 md:grid-cols-2">
              <Field
                label="Nom complet"
                name="name"
                placeholder="Jean Dupont"
                value={form.name}
                onChange={(value) => updateField('name', value)}
                required
              />
              <Field
                label="Adresse email"
                name="email"
                type="email"
                placeholder="jean@email.com"
                value={form.email}
                onChange={(value) => updateField('email', value)}
                required
              />
            </div>

            <Field
              label="Numéro de téléphone"
              name="phone"
              type="tel"
              placeholder="+213 00 00 00 00"
              value={form.phone}
              onChange={(value) => updateField('phone', value)}
            />

            <Field
              label="Sujet du projet"
              name="subject"
              placeholder="Production de film"
              value={form.subject}
              onChange={(value) => updateField('subject', value)}
              required
            />

            <label className="grid gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/55">Votre message</span>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                rows={6}
                placeholder="Parlez-nous de votre vision..."
                className="resize-none border-b border-brand-line bg-transparent py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-brand-yellow"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-4 inline-flex items-center justify-center gap-3 bg-brand-red px-8 py-5 font-display text-xl uppercase text-white transition hover:bg-white hover:text-brand-red disabled:cursor-wait disabled:opacity-60"
            >
              {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
              <Send className="h-4 w-4" />
            </button>
          </form>

          {status === 'success' ? (
            <p className="mt-5 border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              Message envoyé ! Nous vous contacterons bientôt.
            </p>
          ) : null}

          {status === 'error' ? (
            <p className="mt-5 border border-brand-red/40 bg-brand-red/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </p>
          ) : null}

          <div className="mt-12">
            <p className="text-xs font-bold text-white/22">Nous trouver sur</p>
            <div className="mt-4 flex gap-5">
              <Social href={contact.instagramUrl || '#contact'} label="Instagram">
                <FaInstagram className="h-6 w-6 text-pink-500" />
              </Social>
              <Social href={contact.facebookUrl || '#contact'} label="Facebook">
                <FaFacebook className="h-6 w-6 text-blue-500" />
              </Social>
              <Social href={contact.youtubeChannelUrl || '#contact'} label="YouTube">
                <FaYoutube className="h-6 w-6 text-red-500" />
              </Social>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactLine({icon, label, value}: {icon: ReactNode; label: string; value?: string}) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-9 w-9 place-items-center border border-brand-line text-white">{icon}</span>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">{label}</p>
        <p className="font-mono text-base font-bold text-[#c2c2be]">{value}</p>
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="grid gap-3">
      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/55">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border-b border-brand-line bg-transparent py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-brand-yellow"
      />
    </label>
  )
}

function Social({href, label, children}: {href: string; label: string; children: ReactNode}) {
  return (
    <a href={href} aria-label={label} className="transition hover:scale-110">
      {children}
    </a>
  )
}
