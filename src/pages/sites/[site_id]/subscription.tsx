import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from 'components/sites/header';
import { Tabs } from 'components/sites/tabs';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesSubscription: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page subscription'>
    <Head>
      <title>Squeaky / Site Settings</title>
    </Head>

    <Header />

    <Page user={user} scope={[OWNER]}>
      {({ site, member }) => (
        <>
          <Tabs site={site} member={member} page='subscription' />

          <Main>
            <h3 className='title'>
              Subscription
              <Access roles={[OWNER]} />
            </h3>
          </Main>
        </>
      )}
    </Page>
  </div>
);

export default SitesSubscription;
export { getServerSideProps };
