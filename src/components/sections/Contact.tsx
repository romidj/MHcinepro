import type {ReactNode} from 'react'
import {AtSign, Globe, Mail, MapPin, Phone, Send} from 'lucide-react'

import type {SiteSettings} from '@/sanity/lib/types'

const fallbackSettings = {
  studioEmail: 'hello@mhcinepro.com',
  studioPhone: '+213 00 00 00 00',
  studioAddress: 'Alger, Algérie',
}

export function Contact({settings}: {settings: SiteSettings}) {
  const contact = {
    ...fallbackSettings,
    ...settings,
  }

  return (
    <section id="contact" className="bg-brand-black px-0 py-20 md:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="cinema-heading text-6xl text-white md:text-7xl">
            Contactez-
            <br />
            nous
          </h2>

          <div className="mt-12 space-y-5">
            <ContactLine icon={<Mail className="h-4 w-4" />} label="Email" value={contact.studioEmail} />
            <ContactLine icon={<Phone className="h-4 w-4" />} label="Téléphone" value={contact.studioPhone} />
            <ContactLine icon={<MapPin className="h-4 w-4" />} label="Localisation" value={contact.studioAddress} />
          </div>

          <a
            href="https://maps.app.goo.gl/Q15PoF97UEnskQnv9"
            target="_blank"
            rel="noreferrer"
            className="mt-10 grid h-44 place-items-center border border-white/10 bg-[linear-gradient(135deg,#9ca3af,#e5e7eb_35%,#8b5cf6_36%,#d1d5db_37%,#f8fafc)] text-center text-xs font-bold uppercase tracking-[0.25em] text-black/60 transition hover:border-brand-yellow hover:shadow-card"
          >
            Google Map
            <span className="block text-[10px] font-normal normal-case tracking-normal">Ouvrir la localisation</span>
          </a>
        </div>

        <div className="bg-[linear-gradient(120deg,#111,#14110a)] p-8 shadow-[0_0_40px_rgba(255,214,10,0.08)] md:p-14">
          <form className="grid gap-7">
            <div className="grid gap-7 md:grid-cols-2">
              <Field label="Nom complet" placeholder="Jean Dupont" />
              <Field label="Numéro de téléphone" placeholder="+213 00 00 00 00" />
            </div>
            <Field label="Sujet du projet" placeholder="Production de Film" />
            <label className="grid gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/55">Votre message</span>
              <textarea
                rows={6}
                placeholder="Parlez-nous de votre vision..."
                className="resize-none border-b border-brand-line bg-transparent py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-brand-yellow"
              />
            </label>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center gap-3 bg-brand-red px-8 py-5 font-display text-xl uppercase text-white transition hover:bg-white hover:text-brand-red"
            >
              Envoyer le message
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-12">
            <p className="text-xs font-bold text-white/22">Nous trouver sur</p>
            <div className="mt-4 flex gap-5">
              <Social href={`mailto:${contact.studioEmail}`} label="Email">
                <Mail className="h-6 w-6 text-brand-yellow" />
              </Social>
              <Social href={contact.facebookUrl || '#contact'} label="Facebook">
                <Globe className="h-6 w-6 text-blue-500" />
              </Social>
              <Social href={contact.instagramUrl || '#contact'} label="Instagram">
                <AtSign className="h-6 w-6 text-pink-500" />
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
        <p className="font-display text-xl text-white">{value}</p>
      </div>
    </div>
  )
}

function Field({label, placeholder}: {label: string; placeholder: string}) {
  return (
    <label className="grid gap-3">
      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/55">{label}</span>
      <input
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
