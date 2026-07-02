export type ProjectPreview = {
  _id: string
  title?: string
  description?: string
  videoUrl?: string
  platform?: string
  category?: string
  thumbnail?: unknown
}

export type GalleryPreview = {
  _id: string
  caption?: string
  category?: string
  image?: unknown
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
