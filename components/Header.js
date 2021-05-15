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
    <Link href="/writings">
      <a className={headerLinksClasses}>Writings</a>
    </Link>,
    <Link href="/hackletter">
      <a className={headerLinksClasses}>Hackletter</a>
    </Link>,
    <Link href="https://learningcurve.dev/?utm_source=aravindballa.com">
      <a className={headerLinksClasses}>Podcast</a>
    </Link>,
  ];

  return (
    <>
      <header className="w-full py-4 px-8 text-lg text-headings fixed top-0 bg-background bg-opacity-70 backdrop-filter backdrop-blur z-10 border-b dark:border-gray-700 border-gray-200">
        <nav className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className="block mr-8">
                <Logo width={28} height={20.56} />
              </a>
            </Link>
            <div className="hidden md:flex">
              {navLinks.map((navLink, i) => (
                <span className="mr-8" key={i}>
                  {navLink}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button
              className={`focus:outline-none ${headerLinksClasses}`}
              onClick={darkMode.toggle}
            >
              {darkMode.value ? <SunIcon width={18} /> : <MoonIcon width={18} />}
            </button>
          </div>
        </nav>
      </header>

      <div className="z-10 md:hidden">
        <Menu>
          <Menu.Button className={`fixed top-1 right-6 focus:outline-none p-3`}>
            <MenuIcon width={20} />
          </Menu.Button>
          <Menu.Items
            as="ul"
            className="fixed text-center py-3 text-2xl top-14 mt-4 right-6 bg-gray-100 dark:bg-gray-700 text-foreground rounded-md shadow-md bg-opacity-80 dark:bg-opacity-90 backdrop-filter backdrop-blur"
          >
            {navLinks.map((navLink, i) => (
              <Menu.Item as="li" key={`sm-nav-${i}`} className="py-1 px-16 mt-6">
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
      </div>
    </>
  );
}
