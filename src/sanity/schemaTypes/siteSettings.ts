import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// Singleton document for global site settings
export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'studioEmail',
      title: 'Email du studio (reçoit les messages du formulaire)',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'studioPhone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'studioAddress',
      title: 'Adresse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Lien Instagram',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Lien Facebook',
      type: 'url',
    }),
    defineField({
      name: 'youtubeChannelUrl',
      title: 'Lien chaîne YouTube',
      type: 'url',
    }),
    defineField({
      name: 'footerText',
      title: 'Texte du pied de page',
      type: 'string',
      initialValue: '© 2025 MH CinePro. Tous droits réservés.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Paramètres du site'}),
  },
})
