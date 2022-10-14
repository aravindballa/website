import Parser from 'rss-parser';
import slugifyOriginal from 'slugify';

const HACKLETTER_RSS = 'https://buttondown.email/aravindballa/rss';

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
