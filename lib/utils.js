import { glob } from 'glob';
import path from 'path';
import slugifyOriginal from 'slugify';

export const POSTS_PATH = path.join(process.cwd(), 'content/writings');
export const HACKLETTER_PATH = path.join(process.cwd(), 'content/hackletter');
export const TALKS_PATH = path.join(process.cwd(), 'content/talks');
export const BOOKSHELF_PATH = path.join(process.cwd(), 'content/bookshelf');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = () => glob.sync('**/*.{md,mdx}', { cwd: POSTS_PATH });

export const hlFilePaths = () => glob.sync('*.{md,mdx}', { cwd: HACKLETTER_PATH });

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
