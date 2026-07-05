import Image from 'next/image'

import {urlFor} from '@/sanity/lib/image'
import type {GalleryImagePreview} from '@/sanity/lib/types'

type GalleryImageCardProps = {
  image: GalleryImagePreview
  priority?: boolean
  onClick: () => void
}

const categoryLabels: Record<string, string> = {
  mariage: 'Mariage',
  nature: 'Nature',
  evenement: 'Événement',
  autre: 'Autre',
}

export function GalleryImageCard({image, priority = false, onClick}: GalleryImageCardProps) {
  const imageUrl = urlFor(image.image).width(720).height(720).fit('crop').quality(82).format('webp').url()

  return (
    <button
      type="button"
      className="group relative aspect-square overflow-hidden bg-zinc-900 text-left shadow-card"
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={image.caption}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 23vw, (min-width: 768px) 45vw, 92vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute left-3 top-3 bg-black/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-yellow backdrop-blur">
        {categoryLabels[image.category] ?? image.category}
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
        <span className="block text-sm font-bold text-white">{image.caption}</span>
      </span>
    </button>
  )
}
