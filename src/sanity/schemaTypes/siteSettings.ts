import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'studioEmail',
      title: 'Email du studio',
      type: 'string',
      description: 'Adresse qui reçoit les messages envoyés depuis le formulaire de contact.',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'studioPhone',
      title: 'Téléphone',
      type: 'string',
      description: 'Numéro affiché dans la section Contact.',
    }),
    defineField({
      name: 'studioAddress',
      title: 'Adresse',
      type: 'text',
      rows: 2,
      description: 'Adresse affichée dans la section Contact.',
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
      initialValue: '© 2026 MH CinePro. Tous droits réservés.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Paramètres du site'}),
  },
})
