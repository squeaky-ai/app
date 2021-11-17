import React from 'react';
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from 'lib/api/graphql';
import { ToastProvider } from 'components/toast';
import { DarkModeProvider } from 'components/dark-mode';
import { Page } from 'components/page';

import '../styles/main.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <ToastProvider>
      <DarkModeProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </DarkModeProvider>
    </ToastProvider>
  </ApolloProvider>
);

export default App;
