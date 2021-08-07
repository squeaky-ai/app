import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER } from 'data/teams/constants';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesSubscription: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky / Site Settings</title>
    </Head>

    <Page user={user} scope={[OWNER]}>
      {({ site }) => (
        <Main>
          <BreadCrumbs site={site} items={[{ name: 'Subscription' }]} />

          <h3 className='title'>
            Subscription
            <Access roles={[OWNER]} />
          </h3>
        </Main>
      )}
    </Page>
  </>
);

export default SitesSubscription;
export { getServerSideProps };
