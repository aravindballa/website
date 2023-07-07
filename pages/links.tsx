import Image from 'next/image';

import Layout from '../components/Layout';

const links = {
  Stackblocks: 'https://stackblocks.app',
  Website: 'https://aravindballa.com',
  Twitter: 'https://twitter.com/aravindballa',
  Linkedin: 'https://www.linkedin.com/in/aravindballa/',
  Newsletter: 'https://hackletter.com',
  Email: 'mailto:hey@balla.dev',
  Telegram: 'https://t.me/aravindballa',
};

export default function LinksPage() {
  return (
    <Layout>
      <h1 className="text-headings text-5xl font-bold text-center">Aravind Balla</h1>
      <div className="my-16 mx-auto rounded-full border-2 border-purple-500 h-32 w-32">
        <Image
          className="rounded-full"
          src="/avatar.jpg"
          alt={`Aravind Balla`}
          height={128}
          width={128}
        />
      </div>
      <div className="mx-auto flex flex-col gap-8">
        {Object.keys(links).map((name) => (
          <a
            className="block bg-background border border-gray-200 dark:border-gray-700 rounded-md text-xl text-center py-2"
            href={links[name]}
            rel="noopener noreferrer"
            target="_blank"
          >
            {name}
          </a>
        ))}
      </div>
    </Layout>
  );
}
