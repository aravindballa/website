import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';
import { allLetters, Letter } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import Subscribe from '../../components/Subscribe';

export default function HackletterPost({ letter }: { letter: Letter }) {
  const slug = letter.slug.replace('/hackletter/', '');
  const MDXContent = useMDXComponent(letter.body.code);
  return (
    <Layout>
      <NextSeo
        title={letter.title}
        description={`Letter #${slug} from hackletter which is weekly newsletter for curious builders by Aravind Balla`}
        canonical={`${baseUrl}hackletter/${slug}/`}
        openGraph={{
          url: `${baseUrl}hackletter/${slug}/`,
          title: letter.title,
          description: `Letter #${slug} from hackletter which is weekly newsletter for curious builders by Aravind Balla`,
          images: [
            {
              url: `${baseUrl}images/hl-header.jpg`,
              width: 728,
              height: 386,
              alt: 'Hackletter header',
            },
          ],
        }}
      />
      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{letter.title}</h1>
        <p className="text-md italic text-purple-500">
          Sent on {format(new Date(letter.date), 'MMMM do, yyy')}
        </p>
        <MDXContent />
        <Subscribe
          className="mt-4"
          renderContent={() => (
            <>
              <h2 className="m-0 no-margin text-headings font-head font-bold text-2xl">
                Hop right in 🏄‍♀️
              </h2>
              <p className="text-base mt-4">
                Get emails like these, every <i>Tuesday</i>, which talk about behind-the-scenes look
                on the stuff I build, podcast episodes and articles which make you a more effective
                developer.
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
  const letter: Letter = allLetters.find((post) => post.slug === `/hackletter/${params.slug}`);

  return {
    props: {
      letter,
    },
  };
};

export const getStaticPaths = async () => {
  const letters = allLetters.map((letter) => letter.slug);

  return {
    paths: letters,
    fallback: 'blocking',
  };
};
