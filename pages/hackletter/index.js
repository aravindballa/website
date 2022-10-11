import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import Subscribe from '../../components/Subscribe';
import ImagekitImage from '../../components/ImagekitImage';

export default function HackletterPage() {
  return (
    <Layout>
      <NextSeo
        title="Hackletter - A weekly newsletter for curious builders"
        description="Get a behind-the-scenes look on the stuff I build, articles I write and podcast episodes which make you a more effective builder."
        canonical={`${baseUrl}hackletter/`}
        openGraph={{
          url: `${baseUrl}hackletter/`,
          title: 'Hackletter - A weekly newsletter for curious builders',
          description:
            'Get a behind-the-scenes look on the stuff I build, articles I write and podcast episodes which make you a more effective builder.',
          images: [
            { url: `${baseUrl}hl-header.jpg`, width: 728, height: 386, alt: 'Hackletter header' },
          ],
        }}
      />
      <div className="mt-12 max-w-3xl mx-auto">
        <ImagekitImage
          className="mx-auto rounded-md"
          src="hl-header.jpg"
          width={728}
          height={386}
          priority
        />
        <p className="text-lg mt-4">
          Hi 👋. I'm{' '}
          <Link href="/">
            <a className="underline">Aravind Balla</a>
          </Link>
          , a Web Developer working remotely from Hyderabad, India. I love JS and CSS 💛 and build
          stuff to solve my problems.
        </p>
        <p className="text-lg mt-4">
          Get a behind-the-scenes look on the stuff I build, articles I write and podcast episodes
          which make you a more effective builder.
        </p>
        <Subscribe
          className="mt-4"
          renderContent={() => (
            <h2 className="m-0 text-headings font-head font-bold text-2xl">Hop right in 🏄‍♀️</h2>
          )}
          tags="hackletter,website"
        />
        <h2 className="text-4xl text-headings font-bold mt-8">Archive</h2>
        <div className="text-lg mt-4">
          <p>
            Vist{' '}
            <a className="underline" href="https://hackletter.email/">
              hackletter.email
            </a>{' '}
            for all the posts
          </p>
        </div>
      </div>
    </Layout>
  );
}
