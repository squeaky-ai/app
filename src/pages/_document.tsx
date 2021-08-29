import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { BASE_PATH } from 'data/common/constants';

class Document extends NextDocument {
  private get host() {
    try {
      return this.props.__NEXT_DATA__.runtimeConfig.webHost;
    } catch {
      return 'https://squeaky.ai'
    }
  }

  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          <meta name='description' content='Capture screen recordings and insightful data that help you see exactly how visitors are using your website or app.' />
          <meta name='keywords' content='Web, Analytics, Recordings, Visitors' />
          <meta property='og:title' content='Squeaky.ai | Better Web Analytics' />
          <meta property='og:description' content='Capture screen recordings and insightful data that help you see exactly how visitors are using your website or app.' />
          <meta property='og:url' content={this.host} />
          <meta property='og:image' content={`${this.host}${BASE_PATH}/social-bg.png`} />
          <meta name='twitter:site' content='@squeakyai' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content={`${this.host}${BASE_PATH}/social-bg.png`} />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:site_name' content='Squeaky.ai' />
          <meta name='theme-color' content='#0074E0' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&amp;display=swap' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css' />
          <link rel='apple-touch-icon' sizes='180x180' href={`${BASE_PATH}/apple-touch-icon.png`} />
          <link rel='icon' type='image/png' sizes='32x32' href={`${BASE_PATH}/favicon-32x32.png`} />
          <link rel='icon' type='image/png' sizes='16x16' href={`${BASE_PATH}/favicon-16x16.png`} />
          <link rel='icon' type='image/x-icon' href={`${BASE_PATH}/favicon.ico`} />
          <link rel='manifest' href={`${BASE_PATH}/site.webmanifest`} />
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
