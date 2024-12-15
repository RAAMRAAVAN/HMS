// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Link to the new favicon */}
          <link rel="icon" href="favicon.gif" />
          {/* Optionally, link to other types of favicons (e.g., PNG, SVG) */}
          <link rel="icon" href="favicon.gif" type="image/svg+xml" />
          <link rel="icon" href="favicon.gif" sizes="32x32" />
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
