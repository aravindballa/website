import Head from "next/head";
import Link from "next/link";
import useDarkMode from "use-dark-mode";

export default function Layout({ children }) {
  const darkMode = useDarkMode(true, {
    classNameDark: "dark",
    classNameLight: "light",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Aravind Balla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full py-8">
        <div className="flex justify-between max-w-3xl mx-auto">
          <Link href="/">Aravind Balla</Link>
          <div className="flex">
            <span className="ml-8">
              <Link href="/writings">Writings</Link>
            </span>
            <span className="ml-8">
              <Link href="/hackletter">Hackletter</Link>
            </span>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center flex-1 px-20">
        {children}
      </main>

      <footer className="flex items-center justify-around w-full h-24 border-t dark:border-gray-700">
        <div className="text-center text-gray-500 dark:text-gray-500 text-xs">
          <p>
            Copyright whenever. This site is{" "}
            <Link href="/opensource">opensource</Link>
            .
            <br />
            <a
              className="text-gray-500 dark:text-gray-500"
              href="mailto:hey+website@balla.dev"
              rel="me"
            >
              mail
            </a>{" "}
            |{" "}
            <a
              className="text-gray-500 dark:text-gray-500"
              href="https://twitter.com/aravindballa"
              rel="me"
            >
              twitter
            </a>{" "}
            |{" "}
            <a
              className="text-gray-500 dark:text-gray-500"
              href="https://aravindballa.com/rss.xml"
            >
              rss
            </a>
          </p>
        </div>
        <div>
          <input
            type="checkbox"
            value={darkMode.value}
            onClick={darkMode.toggle}
          />
        </div>
      </footer>
    </div>
  );
}
