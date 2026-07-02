'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'
import {Menu, X} from 'lucide-react'

const navItems = [
  {id: 'home', label: 'Accueil'},
  {id: 'services', label: 'Services'},
  {id: 'projects', label: 'Projets'},
  {id: 'gallery', label: 'Galerie'},
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        rootMargin: '-18% 0px -58% 0px',
        threshold: [0.18, 0.35, 0.6],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-black/55 backdrop-blur-md">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-6 py-3">
        <div className="flex items-center gap-4">
          <Image src="/images/logo_mh.png" alt="MH CinePro" width={96} height={60} className="h-auto w-auto" />
        </div>
        <div className="hidden flex-1 justify-center sm:flex">
          <div className="flex items-center gap-12 text-[13px] font-bold text-white/70">
            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative py-3 transition hover:text-brand-yellow ${
                    isActive ? 'text-brand-yellow' : ''
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  {isActive && <span className="absolute left-0 top-0 h-1 w-full bg-brand-yellow" />}
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden bg-brand-yellow px-5 py-3 text-[13px] font-black text-black transition hover:-translate-y-0.5 hover:bg-white hover:shadow-cta sm:inline-flex sm:px-7"
          >
            Contactez nous
          </a>
        </div>
        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center border border-white/20 text-white sm:hidden"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="section-shell pb-5 sm:hidden">
          <div className="grid gap-2 border border-white/10 bg-black/75 p-4 text-[13px] font-bold text-white/75 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3 py-3 transition hover:text-brand-yellow ${
                    isActive ? 'text-brand-yellow' : ''
                  }`}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMenuOpen(false)
                  }}
                >
                  {isActive && <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-1 bg-brand-yellow" />}
                  {item.label}
                </a>
              )
            })}
            <a
              href="#contact"
              className="mt-2 bg-brand-yellow px-5 py-3 text-center font-black text-black transition hover:bg-white hover:shadow-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              Contactez nous
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
