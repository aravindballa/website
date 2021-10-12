import { glob } from 'glob';
import Parser from 'rss-parser';
import path from 'path';
import slugifyOriginal from 'slugify';

export const POSTS_PATH = path.join(process.cwd(), 'content/writings');
export const TALKS_PATH = path.join(process.cwd(), 'content/talks');
export const BOOKSHELF_PATH = path.join(process.cwd(), 'content/bookshelf');

const HACKLETTER_RSS = 'https://buttondown.email/aravindballa/rss';

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = () => glob.sync('**/*.{md,mdx}', { cwd: POSTS_PATH });

export const talksFilePaths = () => glob.sync('*.{md,mdx}', { cwd: TALKS_PATH });

export const normalizeUrl = (url) => {
  // Remove duplicate slashes
  url = url.replace(/\/{2,}/g, '/');

  if (!url.match(/^https?:\/\//)) {
    url = url.replace(/^(https?:\/)(.+)/, '$1/$2');
  }
  return url;
};

export const slugify = (string) =>
  slugifyOriginal(string, { lower: true, remove: /[*+~.()'"!:@]/g });

export const hackletterPosts = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(HACKLETTER_RSS);

  return feed.items.map((item) => ({
    url: item.link || '#',
    title: item.title || '',
    description: item.description || item.content || item.contentSnippet,
    date: item.pubDate ? new Date(item.pubDate).toDateString() : undefined,
  }));
};
