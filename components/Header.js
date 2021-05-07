import Link from 'next/link';
import useDarkMode from 'use-dark-mode';
import { MoonIcon, SunIcon, MenuIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';

import Logo from './Logo';

const headerLinksClasses = 'hover:opacity-80 focus:opacity-80 transistion-opacity duration-50';

export default function Header() {
  const darkMode = useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });

  const navLinks = [
    <Link href="/writings" prefetch>
      <a className={headerLinksClasses}>Writings</a>
    </Link>,
    <Link href="/hackletter">
      <a className={headerLinksClasses}>Hackletter</a>
    </Link>,
    <Link href="https://learningcurve.dev/?utm_source=aravindballa.com">
      <a className={headerLinksClasses}>Podcast</a>
    </Link>,
  ];

  const renderRightButtons = () => <></>;

  // TODO fix the background opacity for dark - it doesn't work when we have dark and light colors
  // Should work for w-full py-4 px-8 text-lg text-headings fixed top-0 dark:bg-gray-900 bg-white bg-opacity-80 backdrop-filter backdrop-blur
  return (
    <>
      <header className="hidden md:block w-full py-4 px-8 text-lg text-headings fixed top-0 bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur z-10 border-b dark:border-gray-700 border-gray-200">
        <nav className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className="block mr-24">
                <Logo width={28} height="auto" />
              </a>
            </Link>
            <div className="flex">
              {navLinks.map((navLink, i) => (
                <span className="mr-8" key={i}>
                  {navLink}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <button
              className={`focus:outline-none ${headerLinksClasses}`}
              onClick={darkMode.toggle}
            >
              {darkMode.value ? <SunIcon width={18} /> : <MoonIcon width={18} />}
            </button>
          </div>
        </nav>
      </header>

      <header class="z-10 md:hidden">
        <Menu>
          <Menu.Button
            className={`fixed top-6 right-6 focus:outline-none bg-background p-3 rounded bg-opacity-80`}
          >
            <MenuIcon width={20} />
          </Menu.Button>
          <Menu.Items
            as="ul"
            className="fixed text-center py-3 text-2xl top-14 mt-4 right-6 bg-gray-700 rounded-md"
          >
            <Menu.Item as="li" className="py-2 mb-6">
              <Link href="/">
                <a className="block">
                  <Logo className="mx-auto" width={28} height="auto" />
                </a>
              </Link>
            </Menu.Item>
            {navLinks.map((navLink, i) => (
              <Menu.Item as="li" key={`sm-nav-{i}`} className="py-1 px-16">
                {navLink}
              </Menu.Item>
            ))}
            <Menu.Item as="li" className="py-1 px-16 mt-6">
              <button
                className={`focus:outline-none ${headerLinksClasses}`}
                onClick={darkMode.toggle}
              >
                {darkMode.value ? <SunIcon width={24} /> : <MoonIcon width={24} />}
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </header>
    </>
  );
}
