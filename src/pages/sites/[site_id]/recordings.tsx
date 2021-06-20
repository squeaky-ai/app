import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from 'components/sites/header';
import { Message } from 'components/message';
import { Container } from 'components/container';
import { Tabs } from 'components/sites/tabs';
import { Recordings } from 'components/sites/recordings';
import { Page } from 'components/sites/page';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesRecordings: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page recordings'>
    <Head>
      <title>Squeaky / Site Recordings</title>
    </Head>

    <Header />

    <Page user={user} scope={[]}>
      {({ site, member }) => (
        <>
          <Tabs site={site} member={member} page='recordings' />

          {!site.recordings.items.length && (
            <Container className='xl centered empty-state'>
              <h3 className='title empty'>Recordings</h3>
              <div className='empty-state-contents'>
                <Image src='/empty-state-2.svg' height={240} width={320} />
                <h4>There are currently no recordings available.</h4>
                <Message
                  type='info'
                  message='If you have only recently installed or updated your tracking code it may take a little time before results appear.'
                />
              </div>
            </Container>
          )}

          {!!site.recordings.items.length && (
            <Recordings />
          )}
        </>
      )}
    </Page>
  </div>
);

export default SitesRecordings;
export { getServerSideProps };
