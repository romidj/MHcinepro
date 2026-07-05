'use client'

import {useState} from 'react'

import {PortfolioProjectCard} from '@/components/projects/PortfolioProjectCard'
import type {ProjectArchiveItem, ProjectCategory} from '@/sanity/lib/types'

type ProjectsResponse = {
  projects: ProjectArchiveItem[]
  total: number
}

type PortfolioPageClientProps = {
  initialCategory: ProjectCategory
  initialProjects: ProjectArchiveItem[]
  initialTotal: number
  pageSize: number
}

const categories: {label: string; value: ProjectCategory}[] = [
  {label: 'Tous', value: 'all'},
  {label: 'Mariage', value: 'mariage'},
  {label: 'Nature', value: 'nature'},
  {label: 'Événement', value: 'evenement'},
  {label: 'Autre', value: 'autre'},
]

export function PortfolioPageClient({
  initialCategory,
  initialProjects,
  initialTotal,
  pageSize,
}: PortfolioPageClientProps) {
  const [category, setCategory] = useState<ProjectCategory>(initialCategory)
  const [projects, setProjects] = useState(initialProjects)
  const [total, setTotal] = useState(initialTotal)
  const [isLoading, setIsLoading] = useState(false)

  const hasMore = projects.length < total

  async function fetchProjects(nextCategory: ProjectCategory, start: number, append: boolean) {
    setIsLoading(true)

    try {
      const params = new URLSearchParams({
        category: nextCategory,
        start: String(start),
        end: String(start + pageSize),
      })

      const response = await fetch(`/api/projects?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Impossible de charger les projets')
      }

      const data = (await response.json()) as ProjectsResponse

      setProjects((currentProjects) => (append ? [...currentProjects, ...data.projects] : data.projects))
      setTotal(data.total)
      setCategory(nextCategory)
    } finally {
      setIsLoading(false)
    }
  }

  function handleCategoryChange(nextCategory: ProjectCategory) {
    if (nextCategory === category || isLoading) return

    void fetchProjects(nextCategory, 0, false)
  }

  function handleLoadMore() {
    if (!hasMore || isLoading) return

    void fetchProjects(category, projects.length, true)
  }

  return (
    <section className="section-shell pb-16 md:pb-24">
      <div className="flex flex-wrap gap-3">
        {categories.map((item) => {
          const isActive = item.value === category

          return (
            <button
              key={item.value}
              type="button"
              className={`border px-5 py-3 text-sm font-black uppercase tracking-[0.14em] transition ${
                isActive
                  ? 'border-brand-yellow bg-brand-yellow text-black'
                  : 'border-white/20 text-white/70 hover:border-brand-yellow hover:text-brand-yellow'
              }`}
              onClick={() => handleCategoryChange(item.value)}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {projects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <PortfolioProjectCard key={project._id} project={project} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-12 border border-white/10 py-16 text-center text-white/60">
          Aucun projet dans cette categorie.
        </div>
      )}

      {hasMore ? (
        <div className="mt-12 text-center">
          <button
            type="button"
            className="border border-white px-12 py-4 font-display text-2xl uppercase text-white transition hover:border-brand-yellow hover:text-brand-yellow disabled:cursor-wait disabled:opacity-50"
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            {isLoading ? 'Chargement...' : 'Charger plus'}
          </button>
        </div>
      ) : null}
    </section>
  )
}
