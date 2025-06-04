import { defineCollection, z } from 'astro:content';

const commonSchema = z.object({
  title: z.string().optional(),
  date: z.date().optional(),
  updatedAt: z.date().optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  // Add any other common frontmatter properties here, marking them as optional
  // to accommodate variations in existing frontmatter.
}).passthrough(); // .passthrough() allows undefined properties

const bookshelfCollection = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const hackletterCollection = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const memosCollection = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const notesCollection = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const talksCollection = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const writingsCollection = defineCollection({
  type: 'content',
  schema: commonSchema,
});

export const collections = {
  'bookshelf': bookshelfCollection,
  'hackletter': hackletterCollection,
  'memos': memosCollection,
  'notes': notesCollection,
  'talks': talksCollection,
  'writings': writingsCollection,
};
