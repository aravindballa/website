import { NextSeo, ArticleJsonLd } from 'next-seo';
import { allMemos, Memo } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { format } from 'date-fns';

import { baseUrl } from '../../seo.config';
import Layout from '../../components/Layout';
import Bio from '../../components/Bio';
import Subscribe from '../../components/Subscribe';
import components from '../../components/mdxComponents';
import ImagekitImage, { imageKitLoader } from '../../components/ImagekitImage';
import { normalizeUrl } from 'lib/utils';
import Chip from 'components/Chip';
import Link from 'next/link';
import { getBacklinks } from 'lib/backlinks';

function MemoPage({ memo, backlinks }: { memo: Memo; backlinks: ReturnType<typeof getBacklinks> }) {
  const MDXContent = useMDXComponent(memo.body.code);

  return (
    <Layout>
      <NextSeo
        title={memo.title}
        description={memo.description}
        canonical={normalizeUrl(`${baseUrl}${memo.slug}/`)}
        openGraph={{
          url: normalizeUrl(`${baseUrl}${memo.slug}/`),
          title: memo.title,
          description: memo.description,
          images: [
            {
              url: `${baseUrl}api/og?slug=${encodeURIComponent(memo.slug)}`,
              width: 1200,
              height: 600,
              alt: `Card for ${memo.title} page`,
            },
          ],
          type: 'article',
          article: {
            authors: ['Aravind Balla'],
            publishedTime: new Date(memo.date).toISOString(),
            tags: !!memo.tags ? memo.tags.split(',').map((t) => t.trim()) : [],
          },
        }}
      />
      <ArticleJsonLd
        url={normalizeUrl(`${baseUrl}${memo.slug}/`)}
        title={memo.title || memo._raw.sourceFileName}
        images={
          memo.banner
            ? [
                imageKitLoader({
                  src: `${memo.slug.replace('/memos/', '')}-${memo.banner}`,
                  width: '1000px',
                  quality: '100',
                }),
              ]
            : []
        }
        datePublished={new Date(memo.date).toISOString()}
        authorName="Aravind Balla"
        description={memo.description}
      />

      <div className="mx-auto prose lg:prose-lg dark:prose-light">
        <Link href="/writings?filter=memo">🗒️ All Memos</Link>
      </div>
      <div className="md:mt-12 mx-auto prose lg:prose-lg dark:prose-light">
        <h1>{memo.title}</h1>
        <div className="flex gap-2 items-center mb-12 text-gray-600 dark:text-gray-400">
          <span>{format(new Date(memo.date), 'do MMMM, yyyy')}</span>
          <span>&middot;</span>
          <Chip>Memo</Chip>
          <span>&middot;</span>
          <span>{memo.readingTime.text}</span>
        </div>
        {/* {post.banner && (
          <div className="relative w-full h-auto rounded-md overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <ImagekitImage
              src={`${post.slug.replace('/memos/', '')}-${post.banner}`}
              className="rounded-md object-cover"
              alt={`Banner image for ${post.title}`}
              fill
              priority
            />
          </div>
        )}
        {post.bannercaption && (
          <div className="mt-1 text-base italic opacity-60 text-center">{post.bannercaption}</div>
        )} */}
        <MDXContent components={components(memo.slug)} />
        {backlinks.length > 0 && (
          <>
            <hr />
            <h3>Referred in</h3>
            <div>
              {backlinks.map((link) => (
                <Link
                  className="flex flex-col no-underline bg-foreground bg-opacity-10 rounded-md p-4 hover:bg-opacity-20"
                  key={link.slug}
                  href={link.slug}
                >
                  <div className="">
                    <span className="font-bold text-headings text-xl">{link.title}</span>
                  </div>
                  <div className="mt-2">
                    <span dangerouslySetInnerHTML={{ __html: link.excerpt || '' }} />
                    ...
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <Bio />
      <div className="md:mt-12 mx-auto prose lg:prose-lg dark:prose-light">
        <Subscribe />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const memo = allMemos.find((post) => post.slug === `/memos/${params.slug}`);

  if (!memo) {
    return {
      notFound: true,
    };
  }

  const backlinks = getBacklinks(memo.title || memo.slug);

  return {
    props: {
      memo,
      backlinks,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = allMemos.map((post) => post.slug);

  return {
    paths,
    fallback: false,
  };
};

export default MemoPage;
