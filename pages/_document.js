import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/WorkSans-VariableFont_wght.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <link rel="preload" href="/fonts/Poppins-Bold.ttf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" crossOrigin="anonymous" />

          <link href="/favicon.ico" rel="shortcut icon" />
          <link href="/site.webmanifest" rel="manifest" />

          <link href="/logo16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/logo32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/logo-apple-touch.png" rel="apple-touch-icon" sizes="180x180" />

          <script async defer data-domain="aravindballa.com" src="/js/script.js"></script>
          <script
            async
            defer
            data-website-id="095774e4-c3ec-46a2-8e72-7ad0c3674ef1"
            data-host-url="https://analytics.balla.dev/"
            src="/js/script-u.js"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
      (function () {
        window.counterscale = {
          q: [['set', 'siteId', 'aravindballa.com'], ['trackPageview']]
        };
      })();
    `,
            }}
          />
          <script
            id="counterscale-script"
            src="https://counterscale-ct6.pages.dev/tracker.js"
            defer
          ></script>
        </Head>
        <body>
          <script src="/noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
