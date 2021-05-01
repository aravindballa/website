import path from 'path';
import fs from 'fs';
import glob from 'glob';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { promisify } from 'util';
import Image from 'next/image';

import Layout from '../../components/Layout';
import { POSTS_PATH, postFilePaths } from '../../lib/utils';
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
      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{frontmatter.title}</h1>
        {frontmatter.banner && (
          <Image
            className="rounded-md"
            src={require('../../content/writings' + '/' + slug + '/' + frontmatter.banner).default}
            alt={`Banner image for ${frontmatter.title}`}
            width={frontmatter.bannerWidth}
            height={frontmatter.bannerHeight}
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

  if (data.banner) {
    const { width, height } = await sizeOf(
      path.join(POSTS_PATH, possiblePostFile[0], '..', data.banner)
    );
    if (width && height) {
      data.bannerWidth = width;
      data.bannerHeight = height;
    }
  }

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
