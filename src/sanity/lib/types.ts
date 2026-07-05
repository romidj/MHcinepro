import type {SanityImageSource} from '@sanity/image-url'

export type ServicesBackground = {
  videos?: {
    _key: string
    videoFile?: {
      asset?: {
        url?: string
        mimeType?: string
        originalFilename?: string
      }
    }
  }[]
} | null

export type ProjectPreview = {
  _id: string
  title?: string
  description?: string
  videoUrl?: string
  platform?: string
  category?: string
  thumbnail?: SanityImageSource
  publishedAt?: string
}

export type ProjectCategory = 'all' | 'mariage' | 'nature' | 'evenement' | 'autre'

export type ProjectArchiveItem = ProjectPreview & {
  title: string
  description: string
  videoUrl: string
  platform: 'youtube' | 'facebook'
  category: Exclude<ProjectCategory, 'all'>
  publishedAt: string
}

export type GalleryPreview = {
  _id: string
  caption?: string
  category?: string
  image?: SanityImageSource
  createdAt?: string
}

export type GalleryCategory = 'all' | 'mariage' | 'nature' | 'evenement' | 'autre'

export type GalleryImagePreview = GalleryPreview & {
  caption: string
  category: Exclude<GalleryCategory, 'all'>
  image: SanityImageSource
  createdAt: string
}

export type SiteSettings = {
  studioEmail?: string
  studioPhone?: string
  studioAddress?: string
  instagramUrl?: string
  facebookUrl?: string
  youtubeChannelUrl?: string
  footerText?: string
} | null
