import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'stack',
  title: 'Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
})
