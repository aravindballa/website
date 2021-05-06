import Head from 'next/head';
import Link from 'next/link';
import useDarkMode from 'use-dark-mode';
import Footer from './Footer';
import Logo from './Logo';

export default function Layout({ children }) {
  const darkMode = useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Aravind Balla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full py-8 text-lg">
        <div className="flex justify-between items-center max-w-3xl mx-auto">
          <Link href="/">
            <a>
              <Logo width={50} height={37} />
            </a>
          </Link>
          <div className="flex">
            <span className="ml-8">
              <Link href="/writings" prefetch>
                Writings
              </Link>
            </span>
            <span className="ml-8">
              <Link href="/hackletter">Hackletter</Link>
            </span>
            <span className="ml-8">
              <Link href="https://learningcurve.dev/?utm_source=aravindballa.com">Podcast</Link>
            </span>
          </div>
        </div>
      </header>

      <main className="px-8 flex-1">{children}</main>

      <Footer />
    </div>
  );
}
