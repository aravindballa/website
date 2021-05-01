import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import { HACKLETTER_PATH, hlFilePaths } from '../../lib/utils';
import Subscribe from '../../components/Subscribe';

export default function HackletterPage({ allPosts }) {
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
        <Image className="rounded-md" src="/hl-header.jpg" width={728} height={386} priority />
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 max-w-5xl mx-auto">
          {allPosts.map((post) => (
            <div className="mt-4" key={post.slug}>
              <Link href={post.slug}>
                <a>
                  {!!post.frontmatter.banner && (
                    <div className="aspect-w-16 aspect-h-9 relative w-full h-64">
                      <Image
                        className="rounded-md"
                        src={require('../../content' + post.slug + post.frontmatter.banner).default}
                        alt={`Banner image for ${post.frontmatter.title}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                </a>
              </Link>
              <h3 className="text-lg font-bold mt-4">
                <Link href={post.slug}>
                  <a className="no-underline text-headings">{post.frontmatter.title}</a>
                </Link>
              </h3>
              <p
                className="text-lg mt-4 block max-w-full break-all"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          ))}
        </div> */}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = [];
  for (const postPath of hlFilePaths()) {
    const postFilePath = path.join(HACKLETTER_PATH, postPath);
    const source = fs.readFileSync(postFilePath, { encoding: 'utf-8' });

    const { content, data } = matter(source);

    if (data.published !== undefined && data.published === false) continue;

    allPosts.push({
      frontmatter: data,
      slug: '/hackletter/' + postPath.replace(/\.mdx?$/, '') + '/',
    });
  }

  return {
    props: {
      allPosts: allPosts
        .filter(Boolean)
        .sort(
          (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        ),
    },
  };
};
