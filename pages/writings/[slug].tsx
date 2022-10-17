import { NextSeo, ArticleJsonLd } from 'next-seo';
import { allPosts, Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import Bio from '../../components/Bio';
import Subscribe from '../../components/Subscribe';
import components from '../../components/mdxComponents';
import ImagekitImage, { imageKitLoader } from '../../components/ImagekitImage';

function WritingPage({ post }: { post: Post }) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <Layout>
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={`${baseUrl}${post.slug}/`}
        openGraph={{
          url: `${baseUrl}${post.slug}/`,
          title: post.title,
          description: post.description,
          images: [
            {
              url: `${baseUrl}api/og?slug=${encodeURIComponent(post.slug)}`,
              width: 1200,
              height: 630,
              alt: `Card for ${post.title} page`,
            },
          ],
          type: 'article',
          article: {
            authors: ['Aravind Balla'],
            publishedTime: new Date(post.date).toISOString(),
            tags: !!post.tags && post.tags.split(',').map((t) => t.trim()),
          },
        }}
      />
      <ArticleJsonLd
        url={`${baseUrl}${post.slug}/`}
        title={post.title}
        images={
          post.banner && [
            imageKitLoader({
              src: `${post.slug.replace('/writings/', '')}-${post.banner}`,
              width: '1000px',
              quality: '100',
            }),
          ]
        }
        datePublished={new Date(post.date).toISOString()}
        authorName="Aravind Balla"
        description={post.description}
      />

      <div className="md:mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{post.title}</h1>
        {post.banner && (
          <div className="relative w-full h-auto" style={{ aspectRatio: '16/9' }}>
            <ImagekitImage
              src={`${post.slug.replace('/writings/', '')}-${post.banner}`}
              className="rounded-md"
              alt={`Banner image for ${post.title}`}
              layout="fill"
              priority
            />
          </div>
        )}
        {post.bannercaption && (
          <div className="mt-1 text-base italic opacity-60 text-center">{post.bannercaption}</div>
        )}
        <MDXContent components={components(post.slug)} />
        <Bio />
        <Subscribe />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const post: Post = allPosts.find((post) => post.slug === `/writings/${params.slug}`);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = allPosts.map((post) => post.slug);

  return {
    paths,
    fallback: false,
  };
};

export default WritingPage;
