import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="prose lg:prose-lg dark:prose-light">
        <p>
          Hi 👋 I am Software Developer working remotely from Hyderabad, India. I love JS and CSS
          💛. I like to <Link href="/projects">build stuff</Link>, document the process and share
          the knowledge I gain.
        </p>
        <p>
          I currently work 👨🏻‍💻 at{' '}
          <a href="https://paperpile.com/?welcome" target="_blank" rel="noreferrer noopener">
            Paperpile
          </a>{' '}
          where we are building tools – Paperpile and{' '}
          <a href="https://bibguru.com/" target="_blank" rel="noreferrer noopener">
            BibGuru
          </a>
          , which are used by thousands of scientists and students for research from all over the
          world.
        </p>
      </div>
    </Layout>
  );
}
