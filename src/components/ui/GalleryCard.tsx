import Image from 'next/image'

import {urlFor} from '@/sanity/lib/image'
import type {GalleryPreview} from '@/sanity/lib/types'

const fallbackImages = [
  'linear-gradient(135deg,#15321f,#7d9a58 48%,#d9e4d0)',
  'linear-gradient(135deg,#391b12,#b45a26 48%,#f4b366)',
  'linear-gradient(135deg,#112816,#718c32 44%,#f1e8b4)',
]

export function GalleryCard({image, index}: {image: GalleryPreview; index: number}) {
  const imageUrl = image.image ? urlFor(image.image).width(520).height(420).fit('crop').url() : null

  return (
    <figure className="bg-white p-2 shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image.caption || 'Image galerie MH CinePro'}
            fill
            sizes="(min-width: 1024px) 28vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full" style={{background: fallbackImages[index % fallbackImages.length]}} />
        )}
      </div>
      <figcaption className="pt-2 text-center font-mono text-xl text-black">
        {image.caption || (index === 0 ? 'Djardjra, 2024' : 'Hogar, 2022')}
      </figcaption>
    </figure>
  )
}
