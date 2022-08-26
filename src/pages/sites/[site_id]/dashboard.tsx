import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Dashboard } from 'components/sites/dashboard';
import { Period } from 'components/sites/period/period';
import { usePeriod } from 'hooks/use-period';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesDashboard: NextPage<ServerSideProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('dashboard');

  return (
    <>
      <Head>
        <title>Squeaky | Site Dashboard</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Dashboard' }]} />

            <h4 className='title'>
              Dashboard
              <Period period={period} onChange={setPeriod} />
            </h4>

            <EmptyState
              title='There is currently no dashboard data'
              subtitle='Accessing The Dashboard'
              illustration='illustration-5'
              videoName='Dashboard Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before data for your dashboard becomes available.'
            />

            {site.recordingsCount > 0 && (
              <Dashboard site={site} member={member} period={period} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesDashboard;
export { getServerSideProps };
