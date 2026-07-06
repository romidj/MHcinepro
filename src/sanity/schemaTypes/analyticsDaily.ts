import {BarChartIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'analyticsDaily',
  title: 'Analytiques quotidiennes',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Date au format YYYY-MM-DD.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageViews',
      title: 'Pages vues',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'path',
              title: 'Chemin',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'count',
              title: 'Nombre',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: 'path',
              count: 'count',
            },
            prepare({title, count}) {
              return {
                title,
                subtitle: `${count ?? 0} vues`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'events',
      title: 'Événements',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'count',
              title: 'Nombre',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              count: 'count',
            },
            prepare({title, count}) {
              return {
                title,
                subtitle: `${count ?? 0} fois`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'date',
      pageViews: 'pageViews',
    },
    prepare({title, pageViews}) {
      return {
        title,
        subtitle: `${pageViews ?? 0} pages vues`,
      }
    },
  },
})
