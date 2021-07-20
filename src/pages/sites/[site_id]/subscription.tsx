import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Tabs } from 'components/sites/tabs';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesSubscription: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky / Site Settings</title>
    </Head>

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
  </>
);

export default SitesSubscription;
export { getServerSideProps };
