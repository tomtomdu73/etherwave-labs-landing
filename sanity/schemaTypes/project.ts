import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'projectUrl',
      type: 'url',
      title: 'Project url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'project screenshot',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'project logo',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stacks',
      title: 'Stacks',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'stack' } }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
