import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../../../components/sites/header';
import { Tabs } from '../../../components/sites/tabs';
import { Main } from '../../../components/main';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { useSite } from '../../../hooks/sites';

const SitesSubscription: NextPage<ServerSideProps> = () => {
  const [loading, site] = useSite();

  return (
    <div className='page subscription'>
      <Head>
        <title>Squeaky / Site Settings</title>
      </Head>

      <Header />

      {!loading && site && (
        <Main>
          <Tabs site={site} page='subscription' />
          <h3 className='title'>Subscription</h3>
        </Main>
      )}
    </div>
  );
};

export default SitesSubscription;
export { getServerSideProps };
