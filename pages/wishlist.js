import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { baseUrl } from '../seo.config';
import Layout from '../components/Layout';

const unallowedPeople = ['gautami', 'krushi'];

const gifts = {
  'Coffee Stuff': {
    subheading: 'Yes, he owns a lot of coffee stuff. But there is always room for more.',
    items: [
      {
        title: 'Huskee Cup Single Piece',
        link: 'https://www.benkibrewingtools.com/collections/benki-brewing-tools/products/huskee-cup-single-piece',
        description:
          'The Award Winning Reusable Huskee Cup is a sustainable, BPA-free coffee cup made from coffee husk. It keeps coffee hot longer, is cool to touch, dishwasher safe, and aesthetically pleasing.',
        price: '300',
        active: true,
      },
      {
        title: 'AEROPRESS Metal Filter',
        link: 'https://www.benkibrewingtools.com/collections/filters/products/benki-aeropress-metal-filter',
        description:
          'The Benki Aeropress Metal Filter is a durable, reusable filter for AeroPress Coffee Makers, offering a fuller-bodied coffee and eliminating the need for paper filters. Perfect for travel and heavy use.',
        price: '610',
        active: false,
      },
      {
        title: 'Coffee Beans from Devans',
        link: 'https://www.devans.in/collections/our-blends',
        description:
          'The Benki Aeropress Metal Filter is a durable, reusable filter for AeroPress Coffee Makers, offering a fuller-bodied coffee and eliminating the need for paper filters. Perfect for travel and heavy use.',
        price: '360 - ₹810',
        active: true,
      },
    ],
  },
  Books: {
    subheading:
      'These never go waste. In general, just pick any book that you think Aravind might enjoy. Or, here a few from his wishlist. You can also gift him the Kindle version of the book as they tend to be priced less.',
    items: [
      {
        title: 'Crypto Confidential: Winning and Losing Millions in the New Frontier of Finance',
        link: 'https://amzn.to/3Y1HbkP',
        description:
          "Lets Aravind dive into the highs and lows of the cryptocurrency world with Nat Eliason's gripping narrative. Perfect for both newcomers and veterans seeking a deeper understanding of crypto's allure and pitfalls.",
        price: '521',
        active: true,
      },
      {
        title: 'The Creative Act: A Way of Being',
        link: 'https://amzn.to/467f7OM',
        description: "",
        price: '975',
        active: true,
      },
      {
        title: 'Mind Magic: The Neuroscience of Manifestation and How It Changes Everything',
        link: 'https://amzn.to/3Y39H5s',
        description:
          "Discover the power of manifestation with Dr. James Doty's neuroscience-based techniques. This book combines brain science, wisdom traditions, and practical psychology to help you achieve your dreams.",
        price: '280',
        active: true,
      },
      {
        title: 'Awareness',
        link: 'https://amzn.to/3zGC0wu',
        description:
          "Explore the profound insights of Anthony De Mello, a Jesuit priest who masterfully blends western and eastern spirituality. 'Awareness' is a timeless guide to understanding and embracing the joy of simply being present.",
        price: '488',
        active: true,
      },
      {
        title: 'Psychonauts: Drugs and the Making of the Modern Mind',
        link: 'https://amzn.to/3VV5pdK',
        description:
          "Dive into the fascinating history of psychoactive exploration with Mike Jay's 'Psychonauts'. This richly detailed book explores how drugs have shaped modern minds, featuring captivating stories of self-experimentation by scientists, artists, and philosophers.",
        price: '1496',
        active: true,
      },
      {
        title: 'Red Rising: An explosive dystopian sci-fi novel',
        link: 'https://amzn.to/3S4Xppk',
        description:
          "Dive into Pierce Brown's gripping dystopian world where class struggles and epic battles shape the fate of society. A must-read for sci-fi fans!",
        price: '276',
        active: true,
      },
    ],
  },
  Stationery: {
    description: 'Aravind loves to write and doodle. Here are a few things he would love to have.',
    items: [
      {
        title: 'uni-ball Kuru Toga M7-450T 0.7Mm Mechanical Pencil',
        link: 'https://amzn.to/4cWeSZ6',
        description:
          'Experience smooth writing with the uni-ball Kuru Toga M7-450T 0.7mm Mechanical Pencil. Its unique rotating lead mechanism ensures a consistent, sharp point. Perfect for students and professionals alike!',
        price: '150',
        active: true,
      },
      {
        title: 'Pentel Refillable Pocket Brush Pen',
        link: 'https://amzn.to/3S97WA2',
        description:
          'The Pentel Refillable Pocket Brush Pen is perfect for artists seeking thin to thick lines with fade-resistant, waterproof ink. Ideal for creating beautiful strokes of pure black lines, it comes with 4 FP10 ink cartridge refills.',
        price: '630',
        active: false,
      },
      {
        title: 'LAMY vista Fountain pen',
        link: 'https://www.lamyshop.in/in_en/fountain-pen-lamy-vista.html',
        description:
          'The LAMY vista Fountain Pen offers a clear view of its inner workings with its transparent design. It features a polished steel nib, ergonomic grip, and includes an ink cartridge and converter. Perfect for young enthusiasts!',
        price: '3,105',
        active: false,
      },
    ],
  },
  Other: {
    description: 'If none of the above interest you, here are a few other things you can gift.',
    items: [
      {
        title: 'Send any amount as a contribution to his monthly EMI',
        link: '',
        description:
          'Experience smooth writing with the uni-ball Kuru Toga M7-450T 0.7mm Mechanical Pencil. Its unique rotating lead mechanism ensures a consistent, sharp point. Perfect for students and professionals alike!',
        price: '-',
        active: true,
      },
    ],
  },
};

export default function WishlistPage() {
  const searchParams = useSearchParams();
  const show = searchParams.get('show');

  const router = useRouter();

  const [name, setName] = useState('');

  useEffect(() => {
    if (show === 'true') {
      const wishlistName = localStorage.getItem('wishlistName');
      if (!wishlistName) {
        router.push({
          pathname: '/wishlist',
          search: ``,
        });
      }
    }
  }, [show]);

  return (
    <Layout>
      <NextSeo
        title="Wishlist"
        description=""
        canonical={`${baseUrl}wishlist/`}
        openGraph={{
          url: `${baseUrl}wishlist/`,
          title: 'Wishlist',
          description: '',
        }}
      />

      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>Wishlist 2024</h1>

        {show === 'true' ? (
          <>
            <p>
              <i>A surprise gift is best, but it should not go unused.</i>
            </p>
            <p>If you pick something, let Aravind know so he can strike it off here.</p>
            {Object.entries(gifts).map(([category, { subheading, items }]) => (
              <div key={category}>
                <h2>{category}</h2>
                {subheading && <p>{subheading}</p>}
                <ul>
                  {items.map((item) => (
                    <li key={item.title} className={item.active ? '' : 'line-through'}>
                      <a href={item.link || '#'} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>{' '}
                      - ₹{item.price}
                      {/* <br /> */}
                      {/* {item.description} */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : (
          <form
            className="flex items-start flex-col mt-12 px-4 pb-4 border border-gray-200 dark:border-gray-700 rounded-md"
            onSubmit={(e) => {
              e.preventDefault();

              if (unallowedPeople.some((up) => name.toLowerCase().includes(up))) {
                alert(
                  'Sorry, you are not allowed to see the list. You might have already gifted something.'
                );
              } else {
                localStorage.setItem('wishlistName', name);
                router.push({
                  pathname: '/wishlist',
                  search: `show=true`,
                });
              }
            }}
          >
            <div className="flex gap-y-4 flex-col w-full">
              <p>
                There is no pressure to gift anything. Having you in his life is itself a gift for
                Aravind. If you still insist, please proceed.
              </p>
              <input
                type="text"
                className="px-3 py-1 dark:bg-purple-800 dark:bg-opacity-50 bg-purple-200 placeholder-purple-400 text-base rounded"
                placeholder="Your name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="agree"
                    name="agree"
                    required
                    type="checkbox"
                    aria-describedby="agree-description"
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="agree" className="">
                    I agree that I will share my wishlist with Aravind before my birthday this year.
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="dark:bg-purple-50 bg-purple-900 dark:text-purple-900 text-purple-50 text-base font-bold px-6 py-2 md:py-0 rounded"
                  data-umami-event={name ? `wishlist:show` : undefined}
                  data-umami-event-name={name}
                >
                  Show
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
