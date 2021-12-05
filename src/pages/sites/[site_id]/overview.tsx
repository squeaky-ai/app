import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Overview } from 'components/sites/overview';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesOverview: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky | Site Overview</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site }) => (
        <Main className={classnames({ empty: site.recordingsCount === 0 })}>
          <BreadCrumbs site={site} items={[{ name: 'Overview' }]} />

          <h3 className='title'>Overview</h3>

          <EmptyState
            title='There is currently no dashboard data'
            subtitle='Accessing The Dashboard'
            illustration={5}
            videoName='Overview Intro'
          />

          {site.recordingsCount > 0 && (
            <Overview site={site} />
          )}
        </Main>
      )}
    </Page>
  </>
);

export default SitesOverview;
export { getServerSideProps };
