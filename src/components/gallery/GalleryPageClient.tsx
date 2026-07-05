'use client'

import {useMemo, useState} from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

import {GalleryImageCard} from '@/components/gallery/GalleryImageCard'
import {urlFor} from '@/sanity/lib/image'
import type {GalleryCategory, GalleryImagePreview} from '@/sanity/lib/types'

type GalleryResponse = {
  images: GalleryImagePreview[]
  total: number
}

type GalleryPageClientProps = {
  initialCategory: GalleryCategory
  initialImages: GalleryImagePreview[]
  initialTotal: number
  pageSize: number
}

const categories: {label: string; value: GalleryCategory}[] = [
  {label: 'Tous', value: 'all'},
  {label: 'Mariage', value: 'mariage'},
  {label: 'Nature', value: 'nature'},
  {label: 'Événement', value: 'evenement'},
  {label: 'Autre', value: 'autre'},
]

export function GalleryPageClient({
  initialCategory,
  initialImages,
  initialTotal,
  pageSize,
}: GalleryPageClientProps) {
  const [category, setCategory] = useState<GalleryCategory>(initialCategory)
  const [images, setImages] = useState(initialImages)
  const [total, setTotal] = useState(initialTotal)
  const [isLoading, setIsLoading] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const slides = useMemo(
    () =>
      images.map((image) => ({
        src: urlFor(image.image).width(1600).quality(90).format('webp').url(),
        description: image.caption,
      })),
    [images]
  )

  const hasMore = images.length < total

  async function fetchGallery(nextCategory: GalleryCategory, start: number, append: boolean) {
    setIsLoading(true)

    try {
      const params = new URLSearchParams({
        category: nextCategory,
        start: String(start),
        end: String(start + pageSize),
      })

      const response = await fetch(`/api/gallery?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Impossible de charger la galerie')
      }

      const data = (await response.json()) as GalleryResponse

      setImages((currentImages) => (append ? [...currentImages, ...data.images] : data.images))
      setTotal(data.total)
      setCategory(nextCategory)
    } finally {
      setIsLoading(false)
    }
  }

  function handleCategoryChange(nextCategory: GalleryCategory) {
    if (nextCategory === category || isLoading) return

    void fetchGallery(nextCategory, 0, false)
  }

  function handleLoadMore() {
    if (!hasMore || isLoading) return

    void fetchGallery(category, images.length, true)
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

      {images.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <GalleryImageCard
              key={image._id}
              image={image}
              priority={index < 4}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 border border-white/10 py-16 text-center text-white/60">
          Aucune image dans cette categorie.
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

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Captions, Zoom]}
      />
    </section>
  )
}
