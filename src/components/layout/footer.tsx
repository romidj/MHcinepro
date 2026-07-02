import type {SiteSettings} from '@/sanity/lib/types'

export function Footer({settings}: {settings: SiteSettings}) {
  return (
    <footer className="bg-brand-black px-6 pb-12 pt-16 text-white/45">
      <div className="section-shell flex flex-col gap-8 text-xs md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-base text-white">MH CINEPRO</p>
          <p className="mt-2 text-brand-yellow">للإنتاج السمعي البصري</p>
        </div>
        <div className="flex flex-wrap gap-4 text-center">
          <span>Création audiovisuelle</span>
          <span>·</span>
          <span>Reportage</span>
          <span>·</span>
          <span>Drone</span>
          <span>·</span>
          <span>Montage</span>
        </div>
        <p>{settings?.footerText || '© 2026 MH CinePro — Tous droits réservés.'}</p>
      </div>
    </footer>
  )
}
