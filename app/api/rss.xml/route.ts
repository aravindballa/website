import Rss from 'rss';
import { allPosts } from 'contentlayer/generated';

import seoConfig, { baseUrl } from '../../../seo.config.js';
import { normalizeUrl } from 'lib/utils.js';

export async function GET(request: Request) {
  const feed = new Rss({
    title: 'Aravind Balla',
    description: seoConfig.description,
    feed_url: `${baseUrl}/api/rss.xml`,
    site_url: baseUrl,
    image_url: `${baseUrl}logo.png`,
    language: 'en',
    pubDate: new Date().toUTCString(),
  });

  allPosts.forEach((post) => {
    if ('published' in post && post.published === false) return;

    feed.item({
      title: post.title,
      description: post.description,
      url: normalizeUrl(`${baseUrl}/${post.slug}/`),
      date: new Date(post.date).toUTCString(),
      custom_elements: [
        {
          'content:encoded': post.body.raw,
        },
      ],
    });
  });

  return new Response(feed.xml(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
