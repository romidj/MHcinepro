import {defineQuery} from 'next-sanity'

export const SERVICES_BACKGROUND_QUERY = defineQuery(/* groq */ `
  *[_id == "services-background"][0]{
    videos[]{
      _key,
      videoFile{
        asset->{
          url,
          mimeType,
          originalFilename
        }
      }
    }
  }
`)

export const LATEST_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(publishedAt)]
    | order(publishedAt desc)[0...6]{
      _id,
      title,
      description,
      videoUrl,
      platform,
      category,
      thumbnail,
      publishedAt
    }
`)

export const PROJECTS_PAGE_QUERY = defineQuery(/* groq */ `
  *[
    _type == "project" &&
    defined(publishedAt) &&
    ($category == "all" || category == $category)
  ] | order(publishedAt desc, _id desc)[$start...$end]{
    _id,
    title,
    description,
    videoUrl,
    platform,
    category,
    thumbnail,
    publishedAt
  }
`)

export const PROJECTS_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[
    _type == "project" &&
    defined(publishedAt) &&
    ($category == "all" || category == $category)
  ])
`)

export const LATEST_GALLERY_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_type == "galleryImage" && defined(createdAt)]
    | order(createdAt desc)[0...3]{
      _id,
      caption,
      category,
      image,
      createdAt
    }
`)

export const GALLERY_IMAGES_PAGE_QUERY = defineQuery(/* groq */ `
  *[
    _type == "galleryImage" &&
    defined(createdAt) &&
    ($category == "all" || category == $category)
  ] | order(createdAt desc, _id desc)[$start...$end]{
    _id,
    caption,
    category,
    image,
    createdAt
  }
`)

export const GALLERY_IMAGES_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[
    _type == "galleryImage" &&
    defined(createdAt) &&
    ($category == "all" || category == $category)
  ])
`)

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "site-settings"][0]{
    studioEmail,
    studioPhone,
    studioAddress,
    instagramUrl,
    facebookUrl,
    youtubeChannelUrl,
    footerText
  }
`)
