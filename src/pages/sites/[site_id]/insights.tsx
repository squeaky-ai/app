import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesInsights: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky / Site Insights</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site }) => (
        <Main>
          <BreadCrumbs site={site} items={[{ name: 'Insights' }]} />

          <h3 className='title'>
            Insights
          </h3>
        </Main>
      )}
    </Page>
  </>
);

export default SitesInsights;
export { getServerSideProps };
