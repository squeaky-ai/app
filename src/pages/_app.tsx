import React from 'react';
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from 'lib/api/graphql';
import { ToastProvider } from 'components/toast';
import { Page } from 'components/page';

import '../styles/main.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ToastProvider>
    </ApolloProvider>
  );
};

export default App;
