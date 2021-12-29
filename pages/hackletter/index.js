import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import { hackletterPosts } from '../../lib/utils';
import Subscribe from '../../components/Subscribe';
import Image from '../../components/Image';
import getImageProps from '../../lib/getImageProps';

export default function HackletterPage({ allPosts, bannerImageProps }) {
  return (
    <Layout>
      <NextSeo
        title="Hackletter - A weekly newsletter for curious builders"
        description="Get a behind-the-scenes look on the stuff I build, articles I write and podcast episodes which make you a more effective builder."
        canonical={`${baseUrl}hackletter/`}
        openGraph={{
          url: `${baseUrl}hackletter/`,
          title: 'Hackletter - A weekly newsletter for curious builders',
          description:
            'Get a behind-the-scenes look on the stuff I build, articles I write and podcast episodes which make you a more effective builder.',
          images: [
            { url: `${baseUrl}hl-header.jpg`, width: 728, height: 386, alt: 'Hackletter header' },
          ],
        }}
      />
      <div className="mt-12 max-w-3xl mx-auto">
        <Image
          className="mx-auto rounded-md"
          {...bannerImageProps}
          width={728}
          height={386}
          priority
        />
        <p className="text-lg mt-4">
          Hi 👋. I'm{' '}
          <Link href="/">
            <a className="underline">Aravind Balla</a>
          </Link>
          , a Web Developer working remotely from Hyderabad, India. I love JS and CSS 💛 and build
          stuff to solve my problems.
        </p>
        <p className="text-lg mt-4">
          Get a behind-the-scenes look on the stuff I build, articles I write and podcast episodes
          which make you a more effective builder.
        </p>
        <Subscribe
          className="mt-4"
          renderContent={() => (
            <h2 className="m-0 text-headings font-head font-bold text-2xl">Hop right in 🏄‍♀️</h2>
          )}
          tags="hackletter,website"
        />
        <h2 className="text-4xl text-headings font-bold mt-8">Archive</h2>
        <div className="text-lg mt-4">
          {allPosts.map((post) => (
            <p key={post.slug} className="mb-4">
              <Link className="hover:no-underline flex items-baseline" href={post.slug}>
                <a>
                  <div className="text-sm text-gray-500 inline mr-4">
                    #{post.slug.replace(/\/hackletter\/(.*?)\/$/, '$1')}
                  </div>
                  <div className="inline">
                    <h3 className="inline">{post.title.replace(/\| Hackletter.*?$/, '')}</h3>{' '}
                    <span className="opacity-50">|</span>{' '}
                    <span className="text-sm">{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                  </div>
                </a>
              </Link>
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const hlPosts = await hackletterPosts();
  const allPosts = hlPosts.map((hl, index) => ({
    ...hl,
    slug: `/hackletter/${hlPosts.length - index}/`,
  }));

  const bannerImageProps = await getImageProps('/images/hl-header.jpg');

  return {
    props: {
      allPosts: allPosts
        .filter(Boolean)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      bannerImageProps,
    },
    revalidate: 60,
  };
};
