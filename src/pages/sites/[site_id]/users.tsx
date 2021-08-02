import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesUsers: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky / Site Users</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site }) => (
        <Main>
          <BreadCrumbs site={site} page='Users' />

          <h3 className='title'>
            Users
          </h3>
        </Main>
      )}
    </Page>
  </>
);

export default SitesUsers;
export { getServerSideProps };
