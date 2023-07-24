import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import slugify from 'slugify';
import readingTime from 'reading-time';
import rehypeSlug from 'rehype-slug';
import { remarkWikiLink } from '@portaljs/remark-wiki-link';

const slugifyMemo = (name: string) =>
  slugify(name.replace(/\.(md|mdx)$/, ''), {
    remove: new RegExp(`('|")`),
    lower: true,
  });

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

const Memo = defineDocumentType(() => ({
  name: 'Memo',
  filePathPattern: `**/*.(mdx|md)`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
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
  },
  computedFields: {
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
    slug: {
      type: 'string',
      resolve: (doc) => `/memos/${slugifyMemo(doc._raw.sourceFileName)}`,
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
  documentTypes: [Post, Letter, BookNote, Talk, Memo],
  mdx: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          // permalinks,
          wikiLinkResolver: (name) => {
            return [`/memos/${slugifyMemo(name)}`];
          },
        },
      ],
    ],
  },
});
