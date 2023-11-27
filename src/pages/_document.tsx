import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  private get host() {
    try {
      return `${location.protocol}://${location.hostname}`;
    } catch {
      return 'https://app.squeaky.ai';
    }
  }

  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          <meta name='description' content='Capture screen recordings and insightful data that help you see exactly how visitors are using your website or app.' />
          <meta name='keywords' content='Web, Analytics, Recordings, Visitors' />
          <meta property='og:title' content='Squeaky | The privacy friendly analytics platform' />
          <meta property='og:description' content='Capture screen recordings and insightful data that help you see exactly how visitors are using your website or app.' />
          <meta property='og:url' content={this.host} />
          <meta property='og:image' content='/social-bg.png' />
          <meta name='twitter:site' content='@squeakyai' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content='/social-bg.png' />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:site_name' content='Squeaky.ai' />
          <meta name='theme-color' content='#001a39' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='icon' type='image/x-icon' href='/favicon.ico' />
          <link rel='manifest' href='/site.webmanifest' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='portal-root' />
        </body>
      </Html>
    );
  }
}

export default Document;
