import Link from 'next/link';
import useDarkMode from 'use-dark-mode';

import Logo from './Logo';

export default function () {
  const darkMode = useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });

  return (
    <header className="w-full py-4 px-8 text-lg text-headings fixed top-0 backdrop-filter backdrop-blur-xl z-10">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link href="/">
          <a>
            <Logo width={28} height="auto" />
          </a>
        </Link>
        <div className="flex">
          <span className="ml-8">
            <Link href="/writings" prefetch>
              <a>Writings</a>
            </Link>
          </span>
          <span className="ml-8">
            <Link href="/hackletter">
              <a>Hackletter</a>
            </Link>
          </span>
          <span className="ml-8">
            <Link href="https://learningcurve.dev/?utm_source=aravindballa.com">Podcast</Link>
          </span>
        </div>
      </div>
    </header>
  );
}
