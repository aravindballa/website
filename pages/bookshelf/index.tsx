import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';
import fetch from 'node-fetch';
import Image from 'next/image';
import { BookOpenIcon, BookmarkIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import slugify from 'slugify';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import { ReadwiseBook } from './types';

const bookWrapVariants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
    x: 0,
  }),
  hidden: { x: -10, opacity: 0 },
};

const bookCoverVariants = {
  initial: {
    boxShadow: null,
  },
  hover: {
    scale: 1.05,
    y: -4,
    boxShadow: '6px 12px 12px 0px rgba(0,0,0,0.17)',
  },
};

const bookBorderVariants = {
  hover: {
    y: -2,
    x: -1,
  },
};

export default function Bookshelf({ books }) {
  return (
    <Layout>
      <NextSeo
        title="Book shelf"
        description="A digital bookshelf with books that Aravind Balla reads"
        openGraph={{
          url: `${baseUrl}bookshelf/`,
          title: 'Book shelf',
          description: 'A digital bookshelf with books that Aravind Balla reads',
        }}
      />
      <h1 className="text-headings text-5xl font-bold">Book shelf 📚</h1>
      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {books.results
          .filter((book) => book.author !== null && book.num_highlights > 0)
          .map((book: ReadwiseBook, i: number) => (
            <Link
              key={book.id}
              href={`/bookshelf/${slugify(book.title, { lower: true })}-${book.id}`}
            >
              <motion.a
                role="button"
                tabIndex={0}
                className={`p-4 rounded-md border-2 border-gray-300 dark:border-gray-700`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={bookWrapVariants}
                whileHover="hover"
              >
                <motion.div className="flex">
                  <motion.div
                    className="-mt-8 flex rounded border-2 border-gray-500 relative"
                    variants={bookCoverVariants}
                  >
                    <motion.div
                      className="bg-gray-500 rounded absolute w-[134px] h-[200px] top-2 left-[1px]"
                      variants={bookBorderVariants}
                    ></motion.div>
                    <Image className="" src={book.cover_image_url} width={132} height={200} />
                  </motion.div>
                  <motion.div className="flex-1 ml-4">
                    <motion.h2 className="font-2xl font-bold">{book.title}</motion.h2>
                    <motion.p className="font-lg">{book.author}</motion.p>
                    <div className="mt-2 text-gray-400 flex items-center">
                      <BookOpenIcon className="w-5 h-5 mr-2 inline" />
                      <p>Last read in {format(new Date(book.last_highlight_at), 'MMMM, yyyy')}</p>
                    </div>
                    <div className="text-gray-400 flex items-center">
                      <BookmarkIcon className="w-5 h-5 mr-2 inline" />
                      <p>{book.num_highlights} highlights</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.a>
            </Link>
          ))}
      </div>
      <div className=" max-w-5xl my-8 text-base bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-600 dark:text-gray-300">
        This data is sourced from my Kindle using Readwise. Readwise automatically syncs all your
        highlights from various sources. It's cool.{' '}
        <a className="underline" href="https://readwise.io/i/aravind1">
          Referral link
        </a>{' '}
        if you'd like to try.
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const booksResponse = await fetch('https://readwise.io/api/v2/books/?category=books', {
    headers: {
      Authorization: `TOKEN ${process.env.READWISE_TOKEN}`,
    },
  });
  const books = await booksResponse.json();

  return {
    props: {
      books,
    },
    revalidate: 60,
  };
};
