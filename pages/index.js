import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import Layout from '../components/Layout';
import { POSTS_PATH, postFilePaths } from '../lib/utils';
import ImagekitImage from '../components/ImagekitImage';
import { NextSeo } from 'next-seo';
import { baseUrl } from '../seo.config';

export default function Home({ allPosts }) {
  return (
    <Layout>
      <NextSeo canonical={`${baseUrl}`} />
      <div className="prose lg:prose-lg dark:prose-light">
        <h1>Aravind Balla</h1>
        <p>
          Hi 👋 I am Software Developer working remotely from Hyderabad, India. I love JS and CSS
          💛. I like to build stuff, document the process and share the knowledge I gain.
        </p>
        <p>
          I currently work 👨🏻‍💻 at{' '}
          <a href="https://paperpile.com/?welcome" target="_blank" rel="noreferrer noopener">
            Paperpile
          </a>{' '}
          where we are building tools – Paperpile and{' '}
          <a href="https://bibguru.com/" target="_blank" rel="noreferrer noopener">
            BibGuru
          </a>
          , which are used by thousands of scientists and students for research from all over the
          world.
        </p>
      </div>
      <div className="max-w-[75ch]">
        <div className="flex flex-col md:flex-row justify-between md:items-end">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-headings">
            Few things I've wrote recently
          </h2>
          <Link href="/writings">
            <a className="mb-4">See all</a>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 max-w-5xl mx-auto">
          {allPosts.map((post) => (
            <div className="mt-4" key={post.slug}>
              <Link href={post.slug}>
                <a>
                  {!!post.frontmatter.banner && (
                    <div className="aspect-w-16 aspect-h-9 relative w-full h-32">
                      <ImagekitImage
                        src={`${post.slug}-${post.frontmatter.banner}`}
                        className="rounded-md w-full h-32"
                        alt={`Banner image for ${post.frontmatter.title}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                </a>
              </Link>
              <h3 className="text-xl font-bold mt-2">
                <Link href={post.slug}>
                  <a className="no-underline text-headings">{post.frontmatter.title}</a>
                </Link>
              </h3>
              <p
                className="mt-2 block max-w-full break-all"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h2>You know about the podcast, right? 🎙</h2>
        <div className="flex flex-col-reverse md:flex-row gap-2">
          <p className="flex-1">
            Brittik and I host a podcast where we talk about technology, startups and all the things
            we love about. It's called{' '}
            <a href="https://learningcurve.dev">Learning Curve Podcast</a>
          </p>
          <ImagekitImage className="rounded-md" src="lc-logo.png" height={250} width={250} />
        </div>

        <h2>Speaking</h2>
        <p>I speak at meetups and conferences on topics that I'm excited about.</p>
        <ul>
          <li>
            <a href="https://www.youtube.com/watch?v=8XP0pxofYbQ">
              Jun 2020: Building a Second brain (Remote)
            </a>
          </li>
          <li>
            <a href="https://www.meetup.com/vue-hyderabad/events/268288016/">
              Feb 2020: Taking power back to CSS
            </a>
          </li>
          <li>
            <Link href="/talks/devfest-19/">
              <a>Oct 2019: Build Blazing Fast Portfolios</a>
            </Link>
          </li>
          <li>
            <a href="https://www.meetup.com/coderplex/events/263195332/">
              Jul 2019: Build Websites with Gatsby JS
            </a>
          </li>
          <li>
            <a href="https://www.meetup.com/vue-hyderabad/events/268288016/">
              Apr 2018: React vs Vue
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = [];
  for (const postPath of postFilePaths()) {
    const postFilePath = path.join(POSTS_PATH, postPath);
    const source = fs.readFileSync(postFilePath, { encoding: 'utf-8' });
    if (!source) continue;

    const { content, data } = matter(source);

    if (data.published !== undefined && data.published === false) continue;

    const slug = postPath.replace(/\.mdx?$/, '').replace(/\/index/, '');

    allPosts.push({
      frontmatter: data,
      content: content.slice(0, 150) + '...',
      slug: slug,
    });
  }

  return {
    props: {
      allPosts: allPosts
        .filter(Boolean)
        .sort(
          (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        )
        .slice(0, 3),
    },
  };
};
