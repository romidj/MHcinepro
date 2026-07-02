import {PlayIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesBackground',
  title: 'Fond Vidéo - Nos Services',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'videos',
      title: 'Vidéos en arrière-plan (1 à 3)',
      type: 'array',
      description:
        "Uploadez 1, 2 ou 3 vidéos. Chaque vidéo est jouée jusqu'à la fin avant de passer à la suivante, puis la séquence recommence.",
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'videoFile',
              title: 'Fichier vidéo',
              type: 'file',
              options: {
                accept: 'video/mp4,video/webm',
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            prepare: () => ({title: 'Vidéo'}),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3).error('Ajoutez entre 1 et 3 vidéos'),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Fond Vidéo - Nos Services'}),
  },
})
