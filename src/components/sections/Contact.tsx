import type {ReactNode} from 'react'
import {Mail, MapPin, Phone, Send} from 'lucide-react'
import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'

import type {SiteSettings} from '@/sanity/lib/types'

const fallbackSettings = {
  studioEmail: 'hello@mhcinepro.com',
  studioPhone: '+213 00 00 00 00',
  studioAddress: 'Draa Ben khedda, tizi ouzou, Algérie',
}

export function Contact({settings}: {settings: SiteSettings}) {
  const contact = {
    ...fallbackSettings,
    ...settings,
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
