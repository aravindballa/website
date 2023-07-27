import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { allMemos, Memo } from 'contentlayer/generated';
import { isToday, formatDistanceStrict, subDays } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';

import Layout from '../../components/Layout';
import ImagekitImage from '../../components/ImagekitImage';
import { getOGImageWithDimensions } from '../../lib/getOGImageUrl';
import { baseUrl } from '../../seo.config';
import Chip from 'components/Chip';
import components from 'components/mdxComponents';

const MemoCard = ({ post }: { post: Memo }) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <div className={``} key={post.slug}>
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

      <div className="mt-4 text-gray-600 dark:text-gray-400">
        {isToday(new Date(post.date))
          ? 'Today'
          : formatDistanceStrict(new Date(post.date), subDays(new Date(), 1), {
              addSuffix: true,
              unit: 'day',
            })}
      </div>
      <h2 className="mt-2 text-3xl font-bold">
        <Link className="no-underline text-headings group-hover:underline" href={post.slug}>
          {post.title}
        </Link>
      </h2>

      <div className="md:mt-12 mx-auto prose dark:prose-light">
        <MDXContent components={components(post.slug)} />
      </div>
    </div>
  );
};

export default function MemosPage({ allMemos }: { allMemos: Memo[] }) {
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
          <h1 className="text-5xl font-bold text-headings">Memos 🗒️</h1>
        </div>

        <p className="text-lg">These memos are a collection of short almost-daily rambles</p>

        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-16 max-w-[65ch] mx-auto">
          {allMemos.map((post) => {
            return <MemoCard post={post} />;
          })}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      allMemos: allMemos
        .filter((post) => ('published' in post ? post.published : true))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    },
  };
};
