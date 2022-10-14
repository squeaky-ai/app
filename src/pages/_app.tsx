import React from 'react';
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from 'lib/api/graphql';
import { ToastProvider } from 'components/toast';
import { HistoryProvider } from 'components/history';
import { SidebarProvider } from 'components/sidebar';
import { Page } from 'components/page';

import '../styles/main.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <ToastProvider>
      <HistoryProvider>
        <SidebarProvider>
          <Page user={pageProps.user}>
            <Component {...pageProps} />
          </Page>
        </SidebarProvider>
      </HistoryProvider>
    </ToastProvider>
  </ApolloProvider>
);

export default App;
