import Link from 'next/link'

import {ProjectCard} from '@/components/ui/ProjectCard'
import type {ProjectPreview} from '@/sanity/lib/types'

const fallbackProjects: ProjectPreview[] = Array.from({length: 6}, (_, index) => ({
  _id: `fallback-project-${index}`,
  title: ['Reportage', 'Clip musical', 'Portrait', 'Tournage', 'Montage', 'Interview'][index],
  category: ['evenement', 'autre', 'nature', 'mariage', 'autre', 'evenement'][index],
}))

export function Projects({projects}: {projects: ProjectPreview[]}) {
  const visibleProjects = projects.length ? projects : fallbackProjects

  return (
    <section id="projects" className="bg-brand-black py-16 md:py-20">
      <div className="section-shell">
        <div className="flex items-end justify-between gap-6">
          <h2 className="cinema-heading text-5xl text-white md:text-6xl">Nos projets</h2>
          <Link
            href="/portfolio"
            prefetch
            className="border-b-2 border-brand-yellow pb-1 text-sm font-black text-brand-yellow"
          >
            Voir tous les projets
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.slice(0, 6).map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
