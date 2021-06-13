import React from 'react';
import type { FC } from 'react';
import type { AppProps } from 'next/app';

import '../styles/main.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
