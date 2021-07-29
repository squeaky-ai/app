import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&amp;display=swap' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='icon' type='image/x-icon' href='/favicon.ico' />
          <link rel='manifest' href='/site.webmanifest' />
          <script dangerouslySetInnerHTML={{ __html: `
            <!-- Squeaky Tracking Code for https://squeaky.ai -->
            (function(s,q,e,a,u,k,y){
              s._sqSettings={site_id:'18f15775-e673-43e4-afd6-21d6236ea6fc'};
              u=q.getElementsByTagName('head')[0];
              k=q.createElement('script');
              k.src=e+s._sqSettings.site_id;
              u.appendChild(k);
            })(window,document,'https://cdn.squeaky.ai/g/0.4.0/script.js?');
          `}} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='modal-root' />
        </body>
      </Html>
    );
  }
}

export default Document;
