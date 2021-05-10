import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import { HACKLETTER_PATH, hlFilePaths } from '../../lib/utils';
import Subscribe from '../../components/Subscribe';
import Image from '../../components/Image';
import getImageProps from '../../lib/getImageProps';

export default function HackletterPage({ allPosts, hlImageProps }) {
  return (
    <Layout>
      <NextSeo
        title="Hackletter"
        description="Weekly newsletter by Aravind Balla"
        openGraph={{
          url: `${baseUrl}hackletter/`,
          title: 'Hackletter',
          description: 'Weekly newsletter by Aravind Balla',
          images: [
            { url: `${baseUrl}hl-header.jpg`, width: 728, height: 386, alt: 'Hackletter header' },
          ],
        }}
      />
      <div className="mt-12 max-w-3xl mx-auto">
        <Image className="rounded-md" {...hlImageProps} width={728} height={386} priority />

        <p className="text-lg mt-4">
          I send out a weekly letter, <i>on every Tuesday</i>, which gives you a behind-the-scenes
          look into what I'm working on, solutions and hacks that I'm building, podcast episodes I
          record and interesting reads I find.
        </p>
        <Subscribe
          className="mt-4"
          renderContent={() => (
            <h3 className="m-0 text-headings font-head font-bold text-2xl">Hop right in 🏄‍♀️</h3>
          )}
          tags="hackletter,website"
        />
        <h2 className="text-4xl text-headings font-bold mt-8">Archive</h2>
        <div className="text-lg mt-4">
          {allPosts.map((post) => (
            <p key={post.slug}>
              <Link className="hover:no-underline flex items-baseline" href={post.slug}>
                <a>
                  <span className="text-sm text-gray-500 mr-4">
                    #{post.slug.replace(/\/hackletter\/(.*?)\/$/, '$1')}
                  </span>
                  <span>
                    <span>{post.frontmatter.title}</span> <span className="opacity-50">|</span>{' '}
                    <span className="text-sm">
                      {format(new Date(post.frontmatter.date), 'MMMM dd, yyyy')}
                    </span>
                  </span>
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
  const allPosts = [];
  for (const postPath of hlFilePaths()) {
    const postFilePath = path.join(HACKLETTER_PATH, postPath);
    const source = fs.readFileSync(postFilePath, { encoding: 'utf-8' });

    const { data } = matter(source);

    if (data.published !== undefined && data.published === false) continue;

    allPosts.push({
      frontmatter: data,
      slug: '/hackletter/' + postPath.replace(/\.mdx?$/, '') + '/',
    });
  }

  const hlImageProps = await getImageProps('/hl-header.jpg');

  return {
    props: {
      allPosts: allPosts
        .filter(Boolean)
        .sort(
          (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        ),
      hlImageProps,
    },
  };
};
