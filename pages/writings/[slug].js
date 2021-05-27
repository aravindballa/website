import path from 'path';
import fs from 'fs';
import glob from 'glob';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { promisify } from 'util';
import { NextSeo, BlogJsonLd } from 'next-seo';
import { format } from 'date-fns';

import { POSTS_PATH, postFilePaths, normalizeUrl } from '../../lib/utils';
import { baseUrl } from '../../seo.config';
import { getOGImageWithDimensions } from '../../lib/getOGImageUrl';
import Layout from '../../components/Layout';
import Bio from '../../components/Bio';
import Subscribe from '../../components/Subscribe';
import components from '../../components/mdxComponents';
import getImageProps from '../../lib/getImageProps';
import Image from '../../components/Image';

const sizeOf = promisify(require('image-size'));

export default function WritingsPage({ source, slug, frontmatter }) {
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
        images={
          frontmatter.banner && [normalizeUrl(`${baseUrl}images/${slug}/${frontmatter.banner}`)]
        }
        datePublished={new Date(frontmatter.date).toISOString()}
        authorName="Aravind Balla"
        description={frontmatter.description}
      />

      <div className="md:mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{frontmatter.title}</h1>
        {frontmatter.banner && (
          <Image
            {...frontmatter.bannerImageProps}
            className="rounded-md"
            alt={`Banner image for ${frontmatter.title}`}
            width={frontmatter.bannerWidth}
            height={frontmatter.bannerHeight}
            priority
          />
        )}
        <MDXRemote {...source} components={components(slug)} />
        <Bio />
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

  const mdxSource = await serialize(content);

  if (data.published !== undefined && data.published === false) {
    return {
      notFound: true,
    };
  }

  if (data.banner) {
    const imagePath = path.join('/images', possiblePostFile[0], '..', data.banner);
    const { width, height } = await sizeOf(path.join('public', imagePath));
    if (width && height) {
      data.bannerWidth = width;
      data.bannerHeight = height;
    }

    data.bannerImageProps = await getImageProps(imagePath);
  }

  // TODO calculate dimensions for pics in post as well
  // TODO construct an image map for all the images

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
