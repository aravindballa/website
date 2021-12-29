import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import Subscribe from '../../components/Subscribe';
import { ReadwiseBook } from '../../types';
import { getOGImageWithDimensions } from '../../lib/getOGImageUrl';
import { BOOKSHELF_PATH } from '../../lib/utils';
import getReadwiseBooks from '../../lib/readwiseData';

export default function Book({ highlights, bookData, slug, source, pageTitle }) {
  const pageHeading = pageTitle || `Highlights from "${bookData.title}"`;
  return (
    <Layout>
      <NextSeo
        title={`${bookData.title} - Book highlights`}
        description={`Highlights from the book ${bookData.title} by Aravind Balla`}
        canonical={`${baseUrl}bookshelf/${slug}/`}
        openGraph={{
          url: `${baseUrl}bookshelf/${slug}/`,
          title: bookData.title,
          description: `Highlights from the book ${bookData.title} by Aravind Balla`,
          images: [getOGImageWithDimensions({ title: `${bookData.title} - Book highlights` })],
        }}
      />
      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{pageHeading}</h1>
        <div className="flex justify-between flex-col md:flex-row">
          <p className="italic text-lg">By {bookData.author}</p>
          <Image
            className="rounded border-2 border-gray-500"
            src={bookData.cover}
            width={132}
            height={200}
            layout="fixed"
            quality={100}
          />
        </div>

        {source && (
          <div className="mt-12">
            <MDXRemote {...source} />
          </div>
        )}

        <div className="my-12">
          {highlights.results
            .sort((a, b) => a.location - b.location)
            .map((result) => (
              <p className="" key={result.id}>
                <span className="bg-yellow-500 bg-opacity-20">{result.text}</span>
              </p>
            ))}
        </div>
        <div className="text-base bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-600 dark:text-gray-300">
          These highlights are sourced from my Kindle using Readwise. Readwise automatically syncs
          all your highlights from various sources. It's cool.{' '}
          <a href="https://readwise.io/i/aravind1">Referral link</a> if you'd like to try.
        </div>
        <Subscribe className="mt-4" tags="hackletter,website" />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const slugParts = params.slug.split('-');
  const bookId = slugParts[slugParts.length - 1];

  const highlightsResponse = await fetch(
    `https://readwise.io/api/v2/highlights/?book_id=${bookId}`,
    {
      headers: {
        Authorization: `TOKEN ${process.env.READWISE_TOKEN}`,
      },
    }
  );
  const highlights = await highlightsResponse.json();

  const books = await getReadwiseBooks();
  const book = books.results.find((book: ReadwiseBook) => `${book.id}` === bookId);

  const possibleFile = glob.sync(`${params.slug.replace(/-[0-9]+$/, '')}.*`, {
    cwd: BOOKSHELF_PATH,
  });

  let source = null;
  let summaryFrontmatter = null;
  if (possibleFile?.length) {
    const bookSummary = fs.readFileSync(path.join(BOOKSHELF_PATH, possibleFile[0]), {
      encoding: 'utf-8',
    });
    const { content, data } = matter(bookSummary);
    summaryFrontmatter = data;
    source = await serialize(content);
  }

  return {
    props: {
      highlights,
      bookData: {
        title: book.title,
        author: book.author,
        cover: book.cover_image_url,
      },
      source,
      pageTitle: summaryFrontmatter?.title || '',
      slug: params.slug,
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export const getStaticPaths = async () => {
  // Generate the pages on the fly. If we generate all pages
  // at build time, we hit the Readwise API rate limits
  return {
    paths: [],
    fallback: 'blocking',
  };
};
