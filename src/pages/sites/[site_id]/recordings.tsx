import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Message } from '../../../components/message';
import { Tabs } from '../../../components/sites/tabs';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { useSite } from '../../../hooks/sites';

const SitesRecordings: NextPage<ServerSideProps> = () => {
  const [loading, site] = useSite();

  return (
    <div className='page recordings'>
      <Head>
        <title>Squeaky / Site Recordings</title>
      </Head>

      <Header />

      {!loading && site && (
        <Container className='lg centered'>
          <Tabs site={site} page='recordings' />
          <h3>Recordings</h3>

          {!site.recordings.items.length && (
            <div className='empty-state'>
              <Image src='/empty-state-2.svg' height={240} width={320} />
              <h4>There are currently no recordings available.</h4>
              <Message
                type='info'
                message='If you have only recently installed or updated your tracking code it may take a little time before results appear.'
              />
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default SitesRecordings;
export { getServerSideProps };
