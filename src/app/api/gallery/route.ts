import {NextResponse} from 'next/server'

import {client} from '@/sanity/lib/client'
import {GALLERY_IMAGES_COUNT_QUERY, GALLERY_IMAGES_PAGE_QUERY} from '@/sanity/lib/queries'
import type {GalleryCategory, GalleryImagePreview} from '@/sanity/lib/types'

const CATEGORIES: GalleryCategory[] = ['all', 'mariage', 'nature', 'evenement', 'autre']
const MAX_PAGE_SIZE = 20

function isGalleryCategory(value: string): value is GalleryCategory {
  return CATEGORIES.includes(value as GalleryCategory)
}

function parseIndex(value: string | null, fallback: number) {
  if (value === null) return fallback

  const parsed = Number(value)
  return Number.isInteger(parsed) ? parsed : Number.NaN
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const categoryParam = searchParams.get('category') ?? 'all'
  const start = parseIndex(searchParams.get('start'), 0)
  const end = parseIndex(searchParams.get('end'), MAX_PAGE_SIZE)

  if (!isGalleryCategory(categoryParam)) {
    return NextResponse.json({message: 'Categorie invalide'}, {status: 400})
  }

  if (start < 0 || end <= start || end - start > MAX_PAGE_SIZE) {
    return NextResponse.json({message: 'Pagination invalide'}, {status: 400})
  }

  const params = {
    category: categoryParam,
    start,
    end,
  }

  const [images, total] = await Promise.all([
    client.fetch<GalleryImagePreview[]>(GALLERY_IMAGES_PAGE_QUERY, params),
    client.fetch<number>(GALLERY_IMAGES_COUNT_QUERY, params),
  ])

  return NextResponse.json({images, total})
}
