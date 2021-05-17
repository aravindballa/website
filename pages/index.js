import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import Layout from '../components/Layout';
import { POSTS_PATH, postFilePaths } from '../lib/utils';
import getImageProps from '../lib/getImageProps';
import Image from '../components/Image';

export default function Home({ allPosts }) {
  return (
    <Layout>
      <div className="prose lg:prose-lg dark:prose-light">
        <p>
          Hi 👋 I am Software Developer working remotely from Hyderabad, India. I love JS and CSS
          💛. I like to <Link href="/projects">build stuff</Link>, document the process and share
          the knowledge I gain.
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
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-bold mt-12 mb-4">Few things I've wrote recently</h2>
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
                      <Image
                        {...post.frontmatter.bannerImageProps}
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
                className="text-lg mt-2 block max-w-full break-all"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = [];
  for (const postPath of postFilePaths()) {
    const postFilePath = path.join(POSTS_PATH, postPath);
    const source = fs.readFileSync(postFilePath, { encoding: 'utf-8' });

    const { content, data } = matter(source);

    if (data.published !== undefined && data.published === false) continue;

    const slug = postPath.replace(/\.mdx?$/, '').replace(/\/index/, '');

    /**
     * If there is no banner image, first image from the content is used
     */
    if (!data.banner) {
      const firstImageFromContent = content.match(/\!\[.*?\]\((.*?)\)/);
      if (firstImageFromContent) {
        data.banner = firstImageFromContent[1];
      }
    }
    data.bannerImageProps = await getImageProps(`/images/${slug}/${data.banner}`);

    allPosts.push({
      frontmatter: data,
      content: content.slice(0, 150) + '...',
      slug: '/writings/' + slug + '/',
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
