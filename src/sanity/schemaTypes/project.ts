import {ProjectsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projet Vidéo',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
      type: 'string',
      description: 'Titre affiché au survol de la miniature',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
      description: 'Court texte affiché au survol de la miniature (1 à 3 phrases maximum)',
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Lien de la vidéo',
      type: 'url',
      description: 'Lien complet YouTube ou Facebook vers la vidéo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Plateforme',
      type: 'string',
      description: 'Plateforme sur laquelle la vidéo est publiée',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Facebook', value: 'facebook'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      description: 'Catégorie du projet utilisée pour filtrer sur la page Portfolio',
      options: {
        list: [
          {title: 'Mariage', value: 'mariage'},
          {title: 'Nature', value: 'nature'},
          {title: 'Événement', value: 'evenement'},
          {title: 'Autre', value: 'autre'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Miniature personnalisée (optionnel)',
      type: 'image',
      description: 'Laissez vide pour utiliser automatiquement la miniature de la vidéo lorsque possible.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      description: 'Date affichée au survol de la miniature',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Plus récents',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Plus anciens',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'platform',
      media: 'thumbnail',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle:
          subtitle === 'youtube'
            ? 'YouTube'
            : subtitle === 'facebook'
              ? 'Facebook'
              : 'Plateforme non définie',
        media,
      }
    },
  },
})
