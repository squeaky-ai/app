import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Spinner } from '../../../components/spinner';
import { Tabs } from '../../../components/sites/tabs';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { useSite } from '../../../hooks/sites';

const SitesTeam: NextPage<ServerSideProps> = () => {
  const [loading, site] = useSite();

  return (
    <div className='page team'>
      <Head>
        <title>Squeaky / Site Team</title>
      </Head>

      <Header />

      {loading && (
        <Spinner />
      )}

      {!loading && site && (
        <Container className='lg centered'>
          <Tabs site={site} page='team' />
          <h3>Team</h3>
        </Container>
      )}
    </div>
  );
};

export default SitesTeam;
export { getServerSideProps };
