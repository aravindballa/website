import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    published: z.boolean().optional().default(true),
    banner: z.string().optional(),
    bannercaption: z.string().optional(),
    tags: z.string().optional(),
  }),
});

const memoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    published: z.boolean().optional().default(true),
  }),
});

export const collections = {
  'blog': blogCollection,
  'memos': memoCollection,
};