import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional()
})

const blogSchema = pageSchema.extend({
  date: z.date(),
  excerpt: z.string().optional(),
  cover: z.string().optional(),
  competitionRef: z.string().optional()
})

const clubSchema = z.object({
  name: z.string(),
  region: z.string(),
  city: z.string().optional(),
  contact: z.string()
})

const competitionSchema = z.object({
  title: z.object({
    fr: z.string(),
    en: z.string(),
    ru: z.string()
  }),
  dateStart: z.date(),
  dateEnd: z.date().optional(),
  location: z.string(),
  status: z.enum(['upcoming', 'past']),
  blogRef: z.string().optional()
})

export default defineContentConfig({
  collections: {
    pages_fr: defineCollection({
      type: 'page',
      source: { include: 'pages/fr/**', prefix: '' },
      schema: pageSchema
    }),
    pages_en: defineCollection({
      type: 'page',
      source: { include: 'pages/en/**', prefix: '' },
      schema: pageSchema
    }),
    pages_ru: defineCollection({
      type: 'page',
      source: { include: 'pages/ru/**', prefix: '' },
      schema: pageSchema
    }),

    blog_fr: defineCollection({
      type: 'page',
      source: { include: 'blog/fr/**', prefix: '' },
      schema: blogSchema
    }),
    blog_en: defineCollection({
      type: 'page',
      source: { include: 'blog/en/**', prefix: '' },
      schema: blogSchema
    }),
    blog_ru: defineCollection({
      type: 'page',
      source: { include: 'blog/ru/**', prefix: '' },
      schema: blogSchema
    }),

    clubs: defineCollection({
      type: 'data',
      source: 'clubs/*.yml',
      schema: clubSchema
    }),

    competitions: defineCollection({
      type: 'data',
      source: 'competitions/*.yml',
      schema: competitionSchema
    })
  }
})
