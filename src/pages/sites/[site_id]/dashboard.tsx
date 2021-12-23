import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Dashboard } from 'components/sites/dashboard';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesDashboard: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky | Site Dashboard</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site }) => (
        <Main className={classnames({ empty: site.recordingsCount === 0 })}>
          <BreadCrumbs site={site} items={[{ name: 'Dashboard' }]} />

          <h3 className='title'>Dashboard</h3>

          <EmptyState
            title='There is currently no dashboard data'
            subtitle='Accessing The Dashboard'
            illustration={5}
            videoName='Dashboard Intro'
          />

          {site.recordingsCount > 0 && (
            <Dashboard site={site} />
          )}
        </Main>
      )}
    </Page>
  </>
);

export default SitesDashboard;
export { getServerSideProps };
