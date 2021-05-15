import path from 'path';
import fs from 'fs';
import glob from 'glob';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import { HACKLETTER_PATH, hlFilePaths } from '../../lib/utils';
import Subscribe from '../../components/Subscribe';
import components from '../../components/mdxComponents';

export default function HackletterPost({ source, slug, frontmatter }) {
  return (
    <Layout>
      <NextSeo
        title={frontmatter.title}
        description={`Letter #${slug} from weekly newsletter by Aravind Balla`}
        openGraph={{
          url: `${baseUrl}hackletter/${slug}/`,
          title: frontmatter.title,
          description: `Letter #${slug} from weekly newsletter by Aravind Balla`,
          images: [
            {
              url: `${baseUrl}/images/hl-header.jpg`,
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
        <MDXRemote {...source} components={components(slug)} />
        <Subscribe
          className="mt-4"
          renderContent={() => (
            <>
              <h3 className="m-0 no-margin text-headings font-head font-bold text-2xl">
                Hop right in 🏄‍♀️
              </h3>
              <p className="text-base mt-4">
                I send these letters weekly to your email about things I'm currently learning,{' '}
                <strong>articles</strong> I write, <strong>books</strong> I read, the{' '}
                <strong>podcasts</strong> I record and places I <strong>travel</strong> to. I call
                it -{' '}
                <Link href="/hackletter">
                  <i>Hackletter</i>
                </Link>
                . I'd love to share and discuss them with you!
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
