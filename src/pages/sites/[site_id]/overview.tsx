import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesOverview: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky / Site Overview</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site }) => (
        <Main>
          <BreadCrumbs site={site} page='Overview' />

          <h3 className='title'>
            Overview
          </h3>
        </Main>
      )}
    </Page>
  </>
);

export default SitesOverview;
export { getServerSideProps };