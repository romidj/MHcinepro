import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Photo de galerie',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Image affichée dans la galerie du site.',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'string',
      description: 'Texte affiché sous la photo, par exemple: "Djurdjura, 2024".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      description: 'Catégorie utilisée pour filtrer les photos sur la page Galerie.',
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
      description: 'Les photos les plus récentes apparaissent en premier.',
      initialValue: () => new Date().toISOString(),
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'category',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `Catégorie: ${subtitle}` : undefined,
        media,
      }
    },
  },
})
