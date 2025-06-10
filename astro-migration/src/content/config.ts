import { defineCollection, z } from 'astro:content';

const writingsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.literal('Post'),
    description: z.string().nullable().optional().default(''),
    published: z.boolean().optional().default(true),
    banner: z.string().nullable().optional(),
    bannercaption: z.string().nullable().optional(),
    tags: z.string().nullable().optional(),
  }),
});

const memosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.literal('Memo'),
    description: z.string().nullable().optional().default(''),
    published: z.boolean().optional().default(true),
    banner: z.string().nullable().optional(),
    bannercaption: z.string().nullable().optional(),
    tags: z.string().nullable().optional(),
  }),
});

const bookshelfCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.literal('BookNote'),
    published: z.boolean().optional().default(true),
    date: z.coerce.date().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    rating: z.number().optional(),
  }),
});

const hackletterCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.literal('Letter'),
    published: z.boolean().optional().default(true),
    description: z.string().optional(),
    issue: z.number().optional(),
  }),
});

const talksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.literal('Talk'),
    published: z.boolean().optional().default(true),
    description: z.string().optional(),
    venue: z.string().optional(),
    slides: z.string().optional(),
    video: z.string().optional(),
  }),
});

const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    type: z.literal('Note'),
    published: z.boolean().optional().default(true),
    description: z.string().optional(),
  }),
});

export const collections = {
  'writings': writingsCollection,
  'memos': memosCollection,
  'bookshelf': bookshelfCollection,
  'hackletter': hackletterCollection,
  'talks': talksCollection,
  'notes': notesCollection,
};