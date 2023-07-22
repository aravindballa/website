import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.(mdx|md)`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    published: {
      type: 'boolean',
      description: 'Whether the post is published',
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
    tags: {
      type: 'string',
      description: 'The tags of the post',
    },
    banner: {
      type: 'string',
      description: 'The banner of the post',
    },
    bannercaption: {
      type: 'string',
      description: 'The caption of the post banner',
    },
    bannerFullWidth: {
      type: 'boolean',
      description: 'Whether the banner should be full width',
    },
    featured: {
      type: 'boolean',
      description: 'Whether the post is featured',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}));

const Talk = defineDocumentType(() => ({
  name: 'Talk',
  filePathPattern: `**/*.(mdx|md)`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}));

const Letter = defineDocumentType(() => ({
  name: 'Letter',
  filePathPattern: `**/*.(mdx|md)`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}));

const BookNote = defineDocumentType(() => ({
  name: 'BookNote',
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    published: {
      type: 'boolean',
      description: 'Whether the note is published',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  contentDirExclude: ['.obsidian/**'],
  documentTypes: [Post, Letter, BookNote, Talk],
});
