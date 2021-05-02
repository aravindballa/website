import path from 'path';
import fs from 'fs';
import glob from 'glob';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { promisify } from 'util';
import Image from 'next/image';
import { NextSeo, BlogJsonLd } from 'next-seo';
import { format } from 'date-fns';

import { POSTS_PATH, postFilePaths, normalizeUrl } from '../../lib/utils';
import { baseUrl } from '../../seo.config';
import { getOGImageWithDimensions } from '../../lib/getOGImageUrl';
import Layout from '../../components/Layout';
import GrayBlock from '../../components/GrayBlock';
import CodeBlock from '../../components/CodeBlock';
import Subscribe from '../../components/Subscribe';

const sizeOf = promisify(require('image-size'));

const components = (slug) => ({
  code: CodeBlock,
  img: ({ src, alt }) => {
    return (
      <img
        alt={alt}
        src={
          src.startsWith('http')
            ? src
            : require('../../content/writings/' + slug + '/' + src).default
        }
      />
    );
  },
  GrayBlock,
});

export default function WritingsPage({ source, slug, frontmatter }) {
  const content = hydrate(source, { components: components(slug) });

  // TODO fix path.join in require
  // TODO fix error in console -> Module parse failed: Assigning to rvalue

  return (
    <Layout>
      <NextSeo
        title={frontmatter.title}
        description={frontmatter.description}
        openGraph={{
          url: `${baseUrl}writings/${slug}/`,
          title: 'Writings',
          description: frontmatter.description,
          images: [
            getOGImageWithDimensions({
              title: frontmatter.title,
              dateString: format(new Date(frontmatter.date), 'MMMM dd yyy'),
            }),
          ],
          type: 'article',
          article: {
            authors: ['Aravind Balla'],
            publishedTime: new Date(frontmatter.date).toISOString(),
            tags: !!frontmatter.tags && frontmatter.tags.split(',').map((t) => t.trim()),
          },
        }}
      />
      <BlogJsonLd
        url={`${baseUrl}writings/${slug}/`}
        title={frontmatter.title}
        images={[
          normalizeUrl(
            baseUrl +
              require('../../content/writings' + '/' + slug + '/' + frontmatter.banner).default
          ),
        ]}
        datePublished={new Date(frontmatter.date).toISOString()}
        authorName="Aravind Balla"
        description={frontmatter.description}
      />

      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{frontmatter.title}</h1>
        {frontmatter.banner && (
          <Image
            className="rounded-md"
            src={require('../../content/writings' + '/' + slug + '/' + frontmatter.banner).default}
            alt={`Banner image for ${frontmatter.title}`}
            width={frontmatter.bannerWidth}
            height={frontmatter.bannerHeight}
            priority
          />
        )}
        {content}
        <Subscribe />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const possiblePostFile = glob.sync(`${params.slug}/*.{md,mdx}`, { cwd: POSTS_PATH });
  if (!possiblePostFile || possiblePostFile.length === 0) {
    return {
      notFound: true,
    };
  }

  const source = fs.readFileSync(path.join(POSTS_PATH, possiblePostFile[0]), { encoding: 'utf-8' });

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components: components(params.slug),
    scope: data,
  });

  if (data.published !== undefined && data.published === false) {
    return {
      notFound: true,
    };
  }

  if (data.banner) {
    const { width, height } = await sizeOf(
      path.join(POSTS_PATH, possiblePostFile[0], '..', data.banner)
    );
    if (width && height) {
      data.bannerWidth = width;
      data.bannerHeight = height;
    }
  }

  // TODO calculate dimensions for pics in post as well

  return {
    props: {
      frontmatter: data,
      source: mdxSource,
      slug: params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths()
    // Map the path into the static paths object required by Next.js
    .map((postPath) => ({
      params: {
        slug: postPath.replace(/\.mdx?$/, '').replace(/\/index/, ''),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};
