import React from 'react';
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { ToastProvider } from '../components/toast';

import '../styles/main.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
};

export default App;
