import { NextSeo } from 'next-seo';
import { format } from 'date-fns';
import { allTalks, Talk } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import Layout from '../../components/Layout';
import components from '../../components/mdxComponents';
import { baseUrl } from '../../seo.config';

export default function TalkPage({ talk }: { talk: Talk }) {
  const MDXContent = useMDXComponent(talk.body.code);
  return (
    <Layout>
      <NextSeo
        title={talk.title}
        description={talk.description}
        canonical={`${baseUrl}talks/${talk.slug}/`}
      />

      <div className="mt-12 prose lg:prose-lg dark:prose-light">
        <h1>{talk.title}</h1>
        <p className="text-md italic text-purple-500">
          {format(new Date(talk.date), 'MMMM do, yyy')}
        </p>
        <MDXContent components={{}} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const post: Talk = allTalks.find((post) => post.slug === `/talks/${params.slug}`);

  return {
    props: {
      talk,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = allTalks.map((talk) => talk.slug);
  return {
    paths,
    fallback: false,
  };
};
