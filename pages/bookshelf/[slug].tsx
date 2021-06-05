import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import Subscribe from '../../components/Subscribe';
import { ReadwiseBook } from '../../types';

export default function Book({ highlights, bookData, slug }) {
  return (
    <Layout>
      <NextSeo
        title={`${bookData.title} - Book highlights`}
        description={`Highlights from the book ${bookData.title} by Aravind Balla`}
        openGraph={{
          url: `${baseUrl}bookshelf/${slug}/`,
          title: bookData.title,
          description: `Highlights from the book ${bookData.title} by Aravind Balla`,
        }}
      />
      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>Highlights from "{bookData.title}"</h1>
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
        <div className="my-12">
          {highlights.results.map((result) => (
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
        <Subscribe
          className="mt-4"
          renderContent={() => (
            <>
              <h3 className="m-0 no-margin text-headings font-head font-bold text-2xl">
                Hop right in 🏄‍♀️
              </h3>
              <p className="text-base mt-4">
                I send letters weekly to your email about my <strong>learnings from books</strong>{' '}
                I'm currently reading, <strong>articles</strong> I write, the{' '}
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

  const booksResponse = await fetch(`https://readwise.io/api/v2/books/?category=books`, {
    headers: {
      Authorization: `TOKEN ${process.env.READWISE_TOKEN}`,
    },
  });
  const books = await booksResponse.json();
  const book = books.results.find((book: ReadwiseBook) => `${book.id}` === bookId);
  console.log(book);

  return {
    props: {
      highlights,
      bookData: {
        title: book.title,
        author: book.author,
        cover: book.cover_image_url,
      },
      slug: params.slug,
    },
    revalidate: 60,
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
