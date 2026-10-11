import Link from 'next/link'

import {GalleryCard} from '@/components/ui/GalleryCard'
import type {GalleryPreview} from '@/sanity/lib/types'

const fallbackGallery: GalleryPreview[] = [
  {_id: 'fallback-gallery-1', caption: 'Djardjra, 2024'},
  {_id: 'fallback-gallery-2', caption: 'Hogar, 2022'},
  {_id: 'fallback-gallery-3', caption: 'Hogar, 2022'},
  {_id: 'fallback-gallery-4', caption: 'Djardjra, 2024'},
  {_id: 'fallback-gallery-5', caption: 'Hogar, 2022'},
  {_id: 'fallback-gallery-6', caption: 'Hogar, 2022'},
]

export function Gallery({images}: {images: GalleryPreview[]}) {
  const visibleImages = images.length ? images : fallbackGallery

  return (
    <section id="gallery" className="bg-brand-black py-14 md:py-20">
      <div className="section-shell">
        <div className="flex items-center justify-between gap-6">
          <h2 className="cinema-heading text-4xl text-white md:text-5xl">
            Galerie
          </h2>

          <Link
            href="/galerie"
            prefetch
            className="inline-flex items-center border border-brand-yellow px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-brand-yellow transition hover:bg-brand-yellow hover:text-black"
          >
            Voir toute la galerie
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleImages.slice(0, 6).map((image, index) => (
            <GalleryCard key={image._id} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
