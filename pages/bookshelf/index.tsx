import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';
import Image from 'next/image';
import { BookOpenIcon, BookmarkIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import { ReadwiseBook } from '../../types';
import { getOGImageWithDimensions } from '../../lib/getOGImageUrl';
import { slugify } from '../../lib/utils';
import getReadwiseBooks from '../../lib/readwiseData';
import BooksBunny from 'components/BooksBunny';

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
        title="Digital Bookshelf"
        description="A digital bookshelf with books that Aravind Balla reads. Click on the book to see highlights he took."
        canonical={`${baseUrl}bookshelf/`}
        openGraph={{
          url: `${baseUrl}bookshelf/`,
          title: 'Digital Bookshelf',
          description:
            'A digital bookshelf with books that Aravind Balla reads. Click on the book to see highlights he took.',
          images: [getOGImageWithDimensions({ title: 'Bookshelf' })],
        }}
      />
      <h1 className="text-headings text-5xl font-bold">Book shelf 📚</h1>
      <BooksBunny />
      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {books.results
          .filter((book) => book.author !== null && book.num_highlights > 0)
          .sort(
            (a, b) =>
              new Date(b.last_highlight_at).getTime() - new Date(a.last_highlight_at).getTime()
          )
          .map((book: ReadwiseBook, i: number) => (
            <Link key={book.id} href={`/bookshelf/${slugify(book.title)}-${book.id}`}>
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
                <div className="flex">
                  <motion.div
                    className="md:-mt-8 flex rounded border-2 border-gray-500 relative w-[67px] h-[100px] mt-0 md:w-auto md:h-auto"
                    variants={bookCoverVariants}
                  >
                    <motion.div
                      className="hidden md:block bg-gray-500 rounded absolute w-[134px] h-[200px] top-2 left-[1px]"
                      variants={bookBorderVariants}
                    ></motion.div>
                    <Image
                      className=""
                      quality={100}
                      src={book.cover_image_url}
                      width={132}
                      height={200}
                    />
                  </motion.div>
                  <div className="flex-1 ml-4">
                    <h2 className="font-2xl font-bold">{book.title}</h2>
                    <p className="font-lg">{book.author}</p>
                    <div className="mt-2 text-gray-400 flex items-center">
                      <BookOpenIcon className="w-5 h-5 mr-2 inline" />
                      <p className="flex-1">
                        Last read in {format(new Date(book.last_highlight_at), 'MMMM, yyyy')}
                      </p>
                    </div>
                    <div className="text-gray-400 flex items-center">
                      <BookmarkIcon className="w-5 h-5 mr-2 inline" />
                      <p className="flex-1">{book.num_highlights} highlights</p>
                    </div>
                  </div>
                </div>
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
  const books = await getReadwiseBooks();

  return {
    props: {
      books,
    },
    revalidate: 60 * 60,
  };
};
