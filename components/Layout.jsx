import Head from 'next/head';

import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Aravind Balla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="px-8 flex-1 mt-24">{children}</main>

      <Footer />
    </div>
  );
}
