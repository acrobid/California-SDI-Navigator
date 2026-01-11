import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    guide: defineCollection({
      type: 'page',
      source: 'guide/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        lastUpdated: z.string().optional(),
        order: z.number().optional(),
      }),
    }),
  },
})
