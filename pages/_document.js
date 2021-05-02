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

          <link href="/logo-apple-touch.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/logo32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/logo16x16.png" rel="icon" sizes="16x16" type="image/png" />

          <script
            async
            defer
            data-domain="aravindballa.com"
            src="https://plausible.io/js/plausible.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
