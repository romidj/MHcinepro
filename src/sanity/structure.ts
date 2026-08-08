import {CogIcon, ImageIcon, PlayIcon, ProjectsIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MH CinePro')
    .items([
      S.listItem()
        .title('Fond vidéo - Nos services')
        .icon(PlayIcon)
        .child(
          S.document()
            .schemaType('servicesBackground')
            .documentId('services-background')
            .title('Fond vidéo - Nos services')
        ),

      S.divider(),

      S.documentTypeListItem('project').title('Projets vidéo').icon(ProjectsIcon),

      S.documentTypeListItem('galleryImage').title('Galerie photos').icon(ImageIcon),

      S.divider(),

      S.listItem()
        .title('Paramètres du site')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('site-settings')
            .title('Paramètres du site')
        ),
    ])
