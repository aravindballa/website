import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { allPosts, allMemos, Post, Memo } from 'contentlayer/generated';
import { isToday, formatDistanceToNow } from 'date-fns';
import { useSearchParams } from 'next/navigation';

import Layout from '../../components/Layout';
import ImagekitImage from '../../components/ImagekitImage';
import { getOGImageWithDimensions } from '../../lib/getOGImageUrl';
import { baseUrl } from '../../seo.config';
import Chip from 'components/Chip';

export default function WritingsPage({ allPosts }: { allPosts: (Post | Memo)[] }) {
  const params = useSearchParams();
  const filter = params?.get('filter') || 'blog';

  const postsToShow = allPosts.filter((post) => {
    if (filter === 'all') return true;
    if (filter === 'memo') return post.type === 'Memo';
    if (filter === 'blog') return post.type === 'Post';
  });

  return (
    <Layout>
      <NextSeo
        title="Writings"
        canonical={`${baseUrl}writings/`}
        openGraph={{
          url: `${baseUrl}writings/`,
          title: 'Writings',
          images: [getOGImageWithDimensions({ title: 'Writings' })],
        }}
      />
      <div className="md:mt-12">
        <div className="mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
          <h1 className="text-5xl font-bold text-headings">Writings</h1>
          <div className="flex gap-4">
            <Link
              className={filter === 'all' ? 'text-headings underline' : 'hover:text-headings'}
              href="/writings?filter=all"
            >
              All
            </Link>
            <Link
              className={filter === 'blog' ? 'text-headings underline' : 'hover:text-headings'}
              href="/writings"
            >
              Blog posts
            </Link>
            <Link
              className={filter === 'memo' ? 'text-headings underline' : 'hover:text-headings'}
              href="/writings?filter=memo"
            >
              Memos
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto">
          {postsToShow.map((post) => {
            return (
              <div
                className={`${
                  !!post.banner ? `row-span-2` : `row-span-1`
                } group border border-gray-200 dark:border-gray-700 p-4 rounded-md hover:shadow transition-all`}
                key={post.slug}
              >
                <Link href={post.slug}>
                  {!!post.banner && (
                    <div className="aspect-w-16 aspect-h-9 relative w-full h-64">
                      <ImagekitImage
                        src={`${post.slug.replace('/writings/', '')}-${post.banner}`}
                        className="rounded-md w-full h-64 object-cover"
                        alt={`Banner image for ${post.title}`}
                        fill
                      />
                    </div>
                  )}
                </Link>
                <h3 className="text-lg font-bold mt-4">
                  <Link
                    className="no-underline text-headings group-hover:underline"
                    href={post.slug}
                  >
                    {post.title}
                  </Link>
                </h3>
                {post.type === 'Memo' && (
                  <div className="flex gap-2 items-center mt-2">
                    <span>
                      {isToday(new Date(post.date))
                        ? 'Today'
                        : formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                    </span>
                    <span>&middot;</span>
                    <Chip>Memo</Chip>
                  </div>
                )}
                <p
                  className="text-lg mt-4 block max-w-full break-all group-hover:text-headings"
                  dangerouslySetInnerHTML={{ __html: post.body.raw.slice(0, 150) + '...' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allItems = [...allMemos, ...allPosts];
  return {
    props: {
      allPosts: allItems
        .filter((post) => ('published' in post ? post.published : true))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    },
  };
};
