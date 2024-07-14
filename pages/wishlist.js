import { NextSeo } from 'next-seo';

import { baseUrl } from '../seo.config';
import Layout from '../components/Layout';

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
        active: true,
      },
    ],
  },
};

export default function WishlistPage() {
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
        <p>
          <i>A surprise gift is best, but it should not go unused.</i>
        </p>

        {Object.entries(gifts).map(([category, { subheading, items }]) => (
          <div key={category}>
            <h2>{category}</h2>
            {subheading && <p>{subheading}</p>}
            <ul>
              {items.map((item) => (
                <li key={item.title}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
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
      </div>
    </Layout>
  );
}
