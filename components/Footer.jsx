import Link from 'next/link';
import useDarkMode from 'use-dark-mode';
import Logo from './Logo';

export default function Footer() {
  const darkMode = useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });

  return (
    <footer className="w-full py-12">
      <hr className="border-gray-500 mb-16 mx-auto" style={{ maxWidth: 150 }} />
      <div className="block text-center mx-auto md:text-left md:flex justify-between text-gray-500 w-full max-w-5xl px-8">
        <div>
          <p className="mb-4">
            <Link href="/">
              <a className="hover:text-gray-600 dark:hover:text-gray-400">
                <Logo className="mx-auto md:m-0" width={25} height={18.5} />
              </a>
            </Link>
          </p>
          <p>Copyright &copy; {new Date().getFullYear()}</p>
        </div>
        <ul className="md:grid grid-cols-2 gap-x-16 md:text-right">
          <li>
            <a
              className="hover:text-gray-600 dark:hover:text-gray-400"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                darkMode.toggle();
              }}
            >
              Switch theme
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-600 dark:hover:text-gray-400"
              href="https://twitter.com/aravindballa"
              rel="me"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-600 dark:hover:text-gray-400"
              href="https://github.com/aravindballa/website"
            >
              Source
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-600 dark:hover:text-gray-400"
              href="https://github.com/aravindballa"
            >
              Github
            </a>
          </li>
          <li>
            <Link href="/rss.xml">
              <a className="hover:text-gray-600 dark:hover:text-gray-400">RSS</a>
            </Link>
          </li>
          <li>
            <a
              className="hover:text-gray-600 dark:hover:text-gray-400"
              href="https://www.youtube.com/channel/UC2y7GYWCZtXApu6iQmlmFnw"
            >
              YouTube
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="text-center text-gray-500">
        <p>
          Copyright whenever. This site is <Link href="/opensource">opensource</Link>
          .
          <br />
          <a className="text-gray-500" href="mailto:hey+website@balla.dev" rel="me">
            mail
          </a>{' '}
          |{' '}
          <a className="text-gray-500" href="https://twitter.com/aravindballa" rel="me">
            twitter
          </a>{' '}
          |{' '}
          <a className="text-gray-500" href="https://aravindballa.com/rss.xml">
            rss
          </a>
        </p>
      </div> */}
      {/* <div>
        <input type="checkbox" value={darkMode.value} onClick={darkMode.toggle} />
      </div> */}
    </footer>
  );
}
