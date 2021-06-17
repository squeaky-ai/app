import React from 'react';
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { ToastProvider } from '../components/toast';
import { Page } from '../components/page';

import '../styles/main.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ToastProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ToastProvider>
  );
};

export default App;
