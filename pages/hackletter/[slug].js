import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import { hackletterPosts } from '../../lib/utils';
import Subscribe from '../../components/Subscribe';

export default function HackletterPost({ source, slug, frontmatter }) {
  return (
    <Layout>
      <NextSeo
        title={frontmatter.title}
        description={`Letter #${slug} from hackletter which is weekly newsletter for curious builders by Aravind Balla`}
        canonical={`${baseUrl}hackletter/${slug}/`}
        openGraph={{
          url: `${baseUrl}hackletter/${slug}/`,
          title: frontmatter.title,
          description: `Letter #${slug} from hackletter which is weekly newsletter for curious builders by Aravind Balla`,
          images: [
            {
              url: `${baseUrl}images/hl-header.jpg`,
              width: 728,
              height: 386,
              alt: 'Hackletter header',
            },
          ],
        }}
      />
      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{frontmatter.title}</h1>
        <p className="text-md italic text-purple-500">
          Sent on {format(new Date(frontmatter.date), 'MMMM do, yyy')}
        </p>
        <div dangerouslySetInnerHTML={{ __html: source }} />
        <Subscribe
          className="mt-4"
          renderContent={() => (
            <>
              <h2 className="m-0 no-margin text-headings font-head font-bold text-2xl">
                Hop right in 🏄‍♀️
              </h2>
              <p className="text-base mt-4">
                Get emails like these, every <i>Tuesday</i>, which talk about behind-the-scenes look
                on the stuff I build, podcast episodes and articles which make you a more effective
                developer.
              </p>
              <p className="text-sm">
                <Link href="/hackletter">Back to the archive 📬</Link>
              </p>
            </>
          )}
          tags="hackletter,website"
        />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const hlPosts = await hackletterPosts();
  if (parseInt(params.slug, 10) > hlPosts.length || parseInt(params.slug, 10) < 1) {
    return {
      notFound: true,
    };
  }

  const currentPost = hlPosts[hlPosts.length - parseInt(params.slug, 10)];
  if (!currentPost) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      frontmatter: {
        title: currentPost.title,
        date: currentPost.date,
      },
      source: currentPost.description,
      slug: params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  const hlPosts = await hackletterPosts();

  return {
    paths: hlPosts.map((post, index) => ({
      params: {
        slug: `${hlPosts.length - index}`,
      },
    })),
    fallback: 'blocking',
  };
};
