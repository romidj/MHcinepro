import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Photo de Galerie',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'string',
      description: 'Texte affiché sous la photo (ex: "Djardjra, 2024")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      description: 'Catégorie de la photo utilisée pour filtrer sur la page Galerie',
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
      name: 'createdAt',
      title: 'Date de création',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
    },
  },
})
