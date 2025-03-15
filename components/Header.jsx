import Link from 'next/link';
import useDarkMode from 'use-dark-mode';
import { MoonIcon, SunIcon, MenuIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';

import Logo from './Logo';
import { useEffect } from 'react';

const headerLinksClasses = 'hover:opacity-80 focus:opacity-80 transistion-opacity duration-50';

export default function Header() {
  const darkMode = useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });

  useEffect(() => {
    const faviconELs = document.querySelectorAll('link[rel="icon"]');
    faviconELs.forEach((faviconEl) => {
      faviconEl.href = darkMode.value ? '/logo-dark.png' : '/logo32x32.png';
    });
  }, [darkMode.value]);

  const navLinks = [
    <Link className={headerLinksClasses} href="/writings">
      Writings
    </Link>,
    <Link className={headerLinksClasses} href="/bookshelf">
      Bookshelf
    </Link>,
    <Link className={headerLinksClasses} href="https://letter.coffee/?utm_source=aravindballa.com">
      caffeineletter ↗
    </Link>,
    <Link className={headerLinksClasses} href="https://hackletter.email/">
      Newsletter ↗
    </Link>,
    <Link
      className={headerLinksClasses}
      href="https://learningcurve.pages.dev/?utm_source=aravindballa.com"
    >
      Podcast ↗
    </Link>,
  ];

  return (
    <>
      <header className="w-full py-4 px-8 text-lg text-headings fixed top-0 bg-background bg-opacity-70 backdrop-filter backdrop-blur z-10 border-b dark:border-gray-700 border-gray-200">
        <nav className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="flex items-center flex-1">
            <Link className="block mr-8" href="/">
              <Logo width={28} height={20.56} />
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
