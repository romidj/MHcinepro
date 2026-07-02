import { type SchemaTypeDefinition } from 'sanity'

import servicesBackground from './servicesBackground'
import project from './project'
import galleryImage from './galleryImage'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    servicesBackground,
    project,
    galleryImage,
    siteSettings,
  ],
}