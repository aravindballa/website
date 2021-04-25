import path from 'path';
import fs from 'fs';
import glob from 'glob';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { promisify } from 'util';
import Image from 'next/image';

import Layout from '../../components/Layout';
import { HACKLETTER_PATH, hlFilePaths } from '../../lib/utils';

const sizeOf = promisify(require('image-size'));

const components = (slug) => ({
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
});

export default function WritingsPage({ source, slug, frontmatter }) {
  const content = hydrate(source, { components: components(slug) });

  // TODO fix path.join in require
  // TODO fix error in console -> Module parse failed: Assigning to rvalue

  return (
    <Layout>
      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{frontmatter.title}</h1>
        <p className="text-md italic text-purple-500">
          Sent on {new Date(frontmatter.date).toLocaleDateString()}
        </p>
        {content}
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const possiblePostFile = glob.sync(`${params.slug}.{md,mdx}`, { cwd: HACKLETTER_PATH });
  if (!possiblePostFile || possiblePostFile.length === 0) {
    return {
      notFound: true,
    };
  }

  const source = fs.readFileSync(path.join(HACKLETTER_PATH, possiblePostFile[0]), {
    encoding: 'utf-8',
  });

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components: components(params.slug),
    scope: data,
  });

  return {
    props: {
      frontmatter: data,
      source: mdxSource,
      slug: params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = hlFilePaths()
    // Map the path into the static paths object required by Next.js
    .map((postPath) => ({
      params: {
        slug: postPath.replace(/\.mdx?$/, ''),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};
