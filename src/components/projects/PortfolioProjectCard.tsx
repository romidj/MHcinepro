import Image from 'next/image'
import Link from 'next/link'
import {ExternalLink, Play} from 'lucide-react'

import {urlFor} from '@/sanity/lib/image'
import type {ProjectArchiveItem} from '@/sanity/lib/types'

type PortfolioProjectCardProps = {
  project: ProjectArchiveItem
  priority?: boolean
}

const categoryLabels: Record<string, string> = {
  mariage: 'Mariage',
  nature: 'Nature',
  evenement: 'Événement',
  autre: 'Autre',
}

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  facebook: 'Facebook',
}

const fallbackStyles = [
  'from-zinc-950 via-red-950/60 to-zinc-900',
  'from-zinc-900 via-yellow-950/50 to-black',
  'from-sky-950 via-cyan-900/50 to-zinc-950',
  'from-stone-950 via-amber-950/60 to-black',
]

export function PortfolioProjectCard({project, priority = false}: PortfolioProjectCardProps) {
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail).width(760).height(428).fit('crop').quality(82).format('webp').url()
    : null

  return (
    <Link
      href={project.videoUrl}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden bg-brand-panel shadow-card"
      aria-label={`Voir le projet ${project.title}`}
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackStyles[project._id.length % fallbackStyles.length]}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,35,42,0.45),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(255,214,10,0.22),transparent_26%)]" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/45" />
        <span className="absolute left-3 top-3 bg-black/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-yellow backdrop-blur">
          {categoryLabels[project.category] ?? project.category}
        </span>
        <span className="absolute right-3 top-3 bg-black/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur">
          {platformLabels[project.platform] ?? project.platform}
        </span>
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-brand-red text-brand-red shadow-[0_0_18px_rgba(239,35,42,0.6)] transition group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white">
            <Play className="ml-1 h-5 w-5 fill-current" />
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-black leading-tight text-white">{project.title}</h2>
          <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-brand-yellow" />
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/65">{project.description}</p>
      </div>
    </Link>
  )
}
