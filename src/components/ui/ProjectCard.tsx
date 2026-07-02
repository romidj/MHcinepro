import Image from 'next/image'
import Link from 'next/link'
import {Play} from 'lucide-react'

import {urlFor} from '@/sanity/lib/image'
import type {ProjectPreview} from '@/sanity/lib/types'

const fallbackStyles = [
  'from-zinc-950 via-red-950/60 to-zinc-900',
  'from-zinc-900 via-yellow-950/50 to-black',
  'from-sky-950 via-cyan-900/50 to-zinc-950',
  'from-stone-950 via-amber-950/60 to-black',
  'from-neutral-900 via-red-900/50 to-zinc-950',
  'from-zinc-950 via-blue-950/50 to-black',
]

export function ProjectCard({project, index}: {project: ProjectPreview; index: number}) {
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail).width(640).height(360).fit('crop').url()
    : null
  const href = project.videoUrl || '#projects'

  return (
    <Link
      href={href}
      target={project.videoUrl ? '_blank' : undefined}
      rel={project.videoUrl ? 'noreferrer' : undefined}
      className="group relative block aspect-video overflow-hidden bg-brand-panel shadow-card"
      aria-label={project.title || 'Voir le projet'}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.title || 'Projet MH CinePro'}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackStyles[index % fallbackStyles.length]}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,35,42,0.45),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(255,214,10,0.22),transparent_26%)]" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-display text-2xl uppercase text-white">{project.title || 'MH CinePro'}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-brand-yellow">
              {project.category || project.platform || 'Projet'}
            </p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black/18 transition group-hover:bg-black/35" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-brand-red text-brand-red shadow-[0_0_18px_rgba(239,35,42,0.6)] transition group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white">
          <Play className="ml-1 h-5 w-5 fill-current" />
        </span>
      </div>
    </Link>
  )
}
