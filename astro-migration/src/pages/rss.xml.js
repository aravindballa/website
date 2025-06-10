import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // Get all published writings and memos
  const writings = await getCollection('writings');
  const memos = await getCollection('memos');
  
  // Filter published content and combine
  const publishedWritings = writings.filter(({ data }) => data.published !== false);
  const publishedMemos = memos.filter(({ data }) => data.published !== false);
  
  // Combine and sort by date
  const allPosts = [...publishedWritings, ...publishedMemos]
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Aravind Balla',
    description: 'Personal website of Aravind Balla - Full-stack developer, writer, and indie hacker',
    site: context.site,
    items: allPosts.map((post) => {
      const isMemo = post.collection === 'memos';
      const postUrl = isMemo ? `/memos/${post.slug}` : `/writings/${post.slug}`;
      
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description || 'Read the full post for more details.',
        link: postUrl,
        categories: post.data.tags ? post.data.tags.split(',').map(tag => tag.trim()) : [],
      };
    }),
  });
}