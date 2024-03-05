import { NextSeo, ArticleJsonLd } from 'next-seo';
import { allNotes, Note } from 'contentlayer/generated';
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

function MemoPage({ note, backlinks }: { note: Note; backlinks: ReturnType<typeof getBacklinks> }) {
  const MDXContent = useMDXComponent(note.body.code);

  return (
    <Layout>
      <NextSeo
        title={note.title}
        description={note.description}
        canonical={normalizeUrl(`${baseUrl}${note.slug}/`)}
        openGraph={{
          url: normalizeUrl(`${baseUrl}${note.slug}/`),
          title: note.title,
          description: note.description,
          images: [
            {
              url: `${baseUrl}api/og?slug=${encodeURIComponent(note.slug)}`,
              width: 1200,
              height: 600,
              alt: `Card for ${note.title} page`,
            },
          ],
          type: 'article',
          article: {
            authors: ['Aravind Balla'],
            publishedTime: new Date(note.date).toISOString(),
            tags: !!note.tags ? note.tags.split(',').map((t) => t.trim()) : [],
          },
        }}
      />
      <ArticleJsonLd
        url={normalizeUrl(`${baseUrl}${note.slug}/`)}
        title={note.title || note._raw.sourceFileName}
        images={[]}
        // images={
        //   note.images
        //     ? [
        //         imageKitLoader({
        //           src: `${note.slug.replace('/memos/', '')}-${note.banner}`,
        //           width: '1000px',
        //           quality: '100',
        //         }),
        //       ]
        //     : []
        // }
        datePublished={new Date(note.date).toISOString()}
        authorName="Aravind Balla"
        description={note.description}
      />

      <div className="mx-auto prose lg:prose-lg dark:prose-light">
        <Link href="/writings">🗒️ All Notes</Link>
      </div>
      <div className="md:mt-12 mx-auto prose lg:prose-lg dark:prose-light">
        <h1>{note.title}</h1>
        <div className="flex gap-2 items-center mb-12 text-gray-600 dark:text-gray-400">
          <span>{format(new Date(note.date), 'do MMMM, yyyy')}</span>
          <span>&middot;</span>
          <Chip>Note</Chip>
          <span>&middot;</span>
          <span>{note.readingTime.text}</span>
        </div>
        {note.images.map((imageUrl) => (
          <div
            className="relative w-full h-auto rounded-md overflow-hidden"
            // style={{ aspectRatio: '9/16' }}
          >
            <ImagekitImage
              src={imageUrl}
              className="rounded-md object-cover shadow-md"
              alt={`Banner image for ${note.title}`}
              priority
            />
          </div>
        ))}
        <div className="sr-only">
          <MDXContent components={components(note.slug)} />
        </div>
        {backlinks.length > 0 && (
          <div className="bg-foreground bg-opacity-10 rounded-md p-4">
            <div className="font-bold text-headings text-2xl">Referred in</div>
            <div className="">
              {backlinks.map((link) => (
                <Link className="mt-4 flex flex-col no-underline" key={link.slug} href={link.slug}>
                  <div className="">
                    <span className="font-bold text-foreground hover:text-headings text-lg">
                      {link.title}
                    </span>
                  </div>
                  <div className="text-base mt-2 text-foreground">
                    <span dangerouslySetInnerHTML={{ __html: link.excerpt || '' }} />
                    ...
                  </div>
                </Link>
              ))}
            </div>
          </div>
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
  const note = allNotes.find((post) => post.slug === `/notes/${params.slug}`);

  if (!note) {
    return {
      notFound: true,
    };
  }

  const backlinks = getBacklinks(
    note.title || note.slug,
    note._raw.sourceFileName.replace(/\.(md|mdx)$/, '')
  );

  return {
    props: {
      note,
      backlinks,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = allNotes.map((post) => post.slug);

  return {
    paths,
    fallback: false,
  };
};

export default MemoPage;
