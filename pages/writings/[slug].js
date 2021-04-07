import path from "path";
import fs from "fs";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import Image from "next/image";

import Layout from "../../components/Layout";
import { POSTS_PATH, postFilePaths } from "../../lib/utils";

const components = (slug) => ({
  img: ({ src, alt }) => {
    return (
      <img
        alt={alt}
        src={require("../../content/writings" + "/" + slug + "/" + src).default}
        width={400}
        height={400}
      />
    );
  },
});

export default function WritingsPage({ source, slug }) {
  const content = hydrate(source, { components: components(slug) });
  return (
    <Layout>
      <div className="prose">{content}</div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}/index.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components: components(params.slug),
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      frontMatter: data,
      source: mdxSource,
      slug: params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths()
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, "").replace(/\/index/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
