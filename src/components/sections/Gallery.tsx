import Link from 'next/link'

import {GalleryCard} from '@/components/ui/GalleryCard'
import type {GalleryPreview} from '@/sanity/lib/types'

const fallbackGallery: GalleryPreview[] = [
  {_id: 'fallback-gallery-1', caption: 'Djardjra, 2024'},
  {_id: 'fallback-gallery-2', caption: 'Hogar, 2022'},
  {_id: 'fallback-gallery-3', caption: 'Hogar, 2022'},
]

export function Gallery({images}: {images: GalleryPreview[]}) {
  const visibleImages = images.length ? images : fallbackGallery

  return (
    <section id="gallery" className="bg-brand-black py-14 md:py-20">
      <div className="section-shell text-center">
        <h2 className="cinema-heading text-5xl text-white md:text-6xl">Notre galerie</h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-10 md:grid-cols-3">
          {visibleImages.slice(0, 3).map((image, index) => (
            <GalleryCard key={image._id} image={image} index={index} />
          ))}
        </div>
        <Link
          href="/galerie"
          prefetch
          className="mt-14 inline-flex border border-white px-14 py-5 font-display text-2xl uppercase text-white transition hover:border-brand-yellow hover:text-brand-yellow"
        >
          Voir toute la galerie
        </Link>
      </div>
    </section>
  )
}
