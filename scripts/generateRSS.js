import RSS from 'rss';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import seoConfig, { baseUrl } from '../seo.config';
import { normalizeUrl, postFilePaths, POSTS_PATH } from '../lib/utils';

(async () => {
  const feed = new RSS({
    title: `Aravind Balla's RSS Feed'`,
    description: seoConfig.description,
    feed_url: `${baseUrl}rss.xml`,
    site_url: `${baseUrl}`,
    image_url: `${baseUrl}logo.png`,
    language: 'en',
    pubDate: new Date().toUTCString(),
  });

  const allPostPaths = postFilePaths();
  for (const postPath of allPostPaths) {
    const source = fs.readFileSync(path.join(POSTS_PATH, postPath), { encoding: 'utf-8' });
    const { content, data } = matter(source);

    if (data.published !== undefined && data.published === false) continue;

    const slug = postPath.replace(/\/index/, '').replace(/\.(md|mdx)$/, '');

    feed.item({
      title: data.title,
      description: data.description,
      url: normalizeUrl(`${baseUrl}/${slug}`),
      author: 'Aravind Balla',
      date: new Date(data.date).toUTCString(),
      // custom_elements: [
      //   {
      //     'content:encoded': renderedOutput,
      //   },
      // ],
    });
  }

  const xml = feed.xml({ indent: true });

  fs.writeFileSync('./public/rss.xml', xml, { encoding: 'utf-8' });
})();
