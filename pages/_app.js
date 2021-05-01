import { DefaultSeo } from 'next-seo';
import '../styles/globals.css';

import seoOptions from '../seo.config';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...seoOptions} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
