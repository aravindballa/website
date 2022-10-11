import { NextSeo } from 'next-seo';

import { baseUrl } from '../seo.config';
import Layout from '../components/Layout';
import ImagekitImage from '../components/ImagekitImage';

export default function NotionNextBlog() {
  return (
    <Layout>
      <NextSeo
        title="How to build a blog with Next JS and Notion"
        description="Learn how to build a modern, fast and static blog with all the features like RSS, comments and strong SEO using amazing open source technologies."
        canonical={`${baseUrl}nextjs-notion-blog/`}
        openGraph={{
          url: `${baseUrl}nextjs-notion-blog/`,
          title: 'How to build a blog with Next JS and Notion',
          description:
            'Learn how to build a modern, fast and static blog with all the features like RSS, comments and strong SEO using amazing open source technologies.',
          images: [
            {
              url: `${baseUrl}next-notion-header.jpg`,
              width: 728,
              height: 508,
              alt: 'Next notion header',
            },
          ],
        }}
      />
      <div className="mt-12 max-w-3xl mx-auto">
        <ImagekitImage
          className="mx-auto rounded-md"
          src="next-notion-header.jpg"
          width={728}
          height={508}
          priority
        />

        <div className="mt-12 prose lg:prose-lg dark:prose-light">
          <p>
            Learn how to build a modern, fast and static blog with all the features like RSS,
            comments and strong SEO using amazing open source technologies.
          </p>

          <h2 id="highlights">Highlights ✨</h2>
          <ul>
            <li>
              NextJS / React and <strong>Typescript</strong>
            </li>
            <li>
              Deployed to <strong>Vercel</strong>
            </li>
            <li>
              Content comes from <strong>Notion</strong>
            </li>
            <li>
              Styled using <strong>Tailwind CSS</strong>
            </li>
            <li>
              Comments using <a href="http://utteranc.es/">utteranc.es</a>
            </li>
          </ul>
          <blockquote>This is how I&#39;d be building a blog today! 🚀</blockquote>

          <h2 id="course-structure">Course structure ⚔️</h2>
          <p>
            All videos are <strong>100% free</strong>. However, you can support me by{' '}
            <strong>paying-what-you-want</strong> on{' '}
            <a href="https://gunm.co/next-notion">Gumroad</a>.
          </p>

          <script src="https://gumroad.com/js/gumroad.js"></script>
          <div className="text-center mb-4">
            <a className="gumroad-button" href="https://gum.co/next-notion">
              Know when it's ready
            </a>
          </div>

          <ol>
            <li>Setting up Notion for content</li>
            <li>Initialize NextJS project and styles</li>
            <li>Creating blog pages</li>
            <li>Creating an index page for all the articles</li>
            <li>Adding RSS, meta tags and OG images for SEO</li>
            <li>Comments functionality using Utterances</li>
            <li>Deploying it to Vercel</li>
            <li>Bonus: Re-building your site using Siri shortcuts</li>
          </ol>
          <p className="mt-8">
            <em>This would likely change as I record them.</em>
          </p>
          <h2 id="who-is-creating-this">Who is creating this? 🤔</h2>
          <p>
            Hi, I&#39;m Aravind Balla 👋 – JavaScript developer, writer and podcaster.{' '}
            <a href="https://aravindballa.com">More about me</a>.
          </p>
          <p>
            I&#39;ve build few websites that have a similar setup, mainly a{' '}
            <a href="https://satyaballa.com/">blog for my sister</a> and a site to{' '}
            <a href="https://work-from-places.vercel.app/">document cafes I work from</a>. This
            course is a distillation of all the things I&#39;ve learnt while building and
            maintaining them.
          </p>
        </div>
        <div className="text-center my-4">
          <a className="gumroad-button" href="https://gum.co/next-notion">
            Know when it's ready
          </a>
        </div>
      </div>
    </Layout>
  );
}
