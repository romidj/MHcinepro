import {PlayIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesBackground',
  title: 'Fond vidéo - Nos services',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'videos',
      title: 'Vidéos en arrière-plan',
      type: 'array',
      description:
        'Ajoutez 1 à 3 vidéos. Elles seront jouées dans l’ordre, avec une transition douce entre chaque vidéo.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'videoFile',
              title: 'Fichier vidéo',
              type: 'file',
              description: 'Format recommandé: MP4 ou WebM, idéalement compressé pour le web.',
              options: {
                accept: 'video/mp4,video/webm',
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            prepare: () => ({title: 'Vidéo de fond'}),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3).error('Ajoutez entre 1 et 3 vidéos.'),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Fond vidéo - Nos services'}),
  },
})
