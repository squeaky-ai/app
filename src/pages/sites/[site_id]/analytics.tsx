import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Tabs } from 'components/sites/tabs';
import { Message } from 'components/message';
import { Container } from 'components/container';
import { Page } from 'components/sites/page';
import { Analytics } from 'components/sites/analytics';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesAnalytics: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky / Site Analytics</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site, member }) => (
        <>
          <Tabs site={site} member={member} page='analytics' />

          {!site.recordings.items.length && (
            <Container className='xl centered empty-state'>
              <h3 className='title empty'>Analytics</h3>
              <div className='empty-state-contents'>
                <Image src='/empty-state-3.svg' height={240} width={320} alt='Illustration to represent the empty analytics page' />
                <h4>There are currently no analytics available.</h4>
                {site.verifiedAt && (
                  <Message
                    type='info'
                    message='If you have only recently installed or updated your tracking code it may take a little time before results appear.'
                  />
                )}
              </div>
            </Container>
          )}

          {!!site.recordings.items.length && (
            <Analytics />
          )}
        </>
      )}
    </Page>
  </>
);

export default SitesAnalytics;
export { getServerSideProps };
