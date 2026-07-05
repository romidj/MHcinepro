import Link from 'next/link'

import {Footer} from '@/components/layout/footer'
import {Navbar} from '@/components/layout/navbar'
import {PortfolioPageClient} from '@/components/projects/PortfolioPageClient'
import {client} from '@/sanity/lib/client'
import {PROJECTS_COUNT_QUERY, PROJECTS_PAGE_QUERY, SITE_SETTINGS_QUERY} from '@/sanity/lib/queries'
import type {ProjectArchiveItem, ProjectCategory, SiteSettings} from '@/sanity/lib/types'

const PAGE_SIZE = 20
const INITIAL_CATEGORY: ProjectCategory = 'all'

export const revalidate = 60

export default async function PortfolioPage() {
  const params = {
    category: INITIAL_CATEGORY,
    start: 0,
    end: PAGE_SIZE,
  }

  const [projects, total, siteSettings] = await Promise.all([
    client.fetch<ProjectArchiveItem[]>(PROJECTS_PAGE_QUERY, params),
    client.fetch<number>(PROJECTS_COUNT_QUERY, params),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ])

  return (
    <div className="min-h-screen bg-brand-black text-foreground">
      <Navbar />
      <main>
        <section className="section-shell py-10 md:py-14">
          <Link
            href="/#projects"
            className="inline-flex text-sm font-bold uppercase tracking-[0.2em] text-white/60 transition hover:text-brand-yellow"
          >
            Retour
          </Link>
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-yellow">MH CinePro</p>
              <h1 className="cinema-heading mt-3 text-6xl text-white md:text-7xl">Portfolio</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/65 md:text-right">
              Tous les projets video du studio, classes du plus recent au plus ancien.
            </p>
          </div>
        </section>

        <PortfolioPageClient
          initialCategory={INITIAL_CATEGORY}
          initialProjects={projects}
          initialTotal={total}
          pageSize={PAGE_SIZE}
        />
      </main>
      <Footer settings={siteSettings} />
    </div>
  )
}
