import path from 'path';
import fs from 'fs';
import glob from 'glob';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { promisify } from 'util';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

import { talksFilePaths, TALKS_PATH } from '../../lib/utils';
import Layout from '../../components/Layout';
import components from '../../components/mdxComponents';

export default function WritingsPage({ source, slug, frontmatter }) {
  return (
    <Layout>
      <NextSeo title={frontmatter.title} description={frontmatter.description} />

      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{frontmatter.title}</h1>
        <p className="text-md italic text-purple-500">
          {format(new Date(frontmatter.date), 'MMMM do, yyy')}
        </p>
        <MDXRemote {...source} components={components(slug)} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const possiblePostFile = glob.sync(`${params.slug}.{md,mdx}`, { cwd: TALKS_PATH });
  if (!possiblePostFile || possiblePostFile.length === 0) {
    return {
      notFound: true,
    };
  }

  console.log(possiblePostFile);

  const source = fs.readFileSync(path.join(TALKS_PATH, possiblePostFile[0]), { encoding: 'utf-8' });

  const { content, data } = matter(source);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontmatter: data,
      source: mdxSource,
      slug: params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = talksFilePaths()
    // Map the path into the static paths object required by Next.js
    .map((postPath) => ({
      params: {
        slug: postPath.replace(/\.mdx?$/, '').replace(/\/index/, ''),
      },
    }));

  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};
