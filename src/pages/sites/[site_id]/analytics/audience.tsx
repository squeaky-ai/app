import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Unlock } from 'components/sites/unlock';
import { Period } from 'components/sites/period/period';
import { usePeriod } from 'hooks/use-period';
import { Tabs } from 'components/sites/analytics/tabs';
import { AnalyticsAudience } from 'components/sites/analytics/analytics-audience';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesAnalyticsAudience: NextPage<ServerSideProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('analytics');
  
  return (
    <>
      <Head>
        <title>Squeaky | Site Analytics | Audience</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Analytics' }]} />

            <div className='heading'>
              <h3 className='title'>Analytics</h3>
              <Period period={period} onChange={setPeriod} />
            </div>

            <Unlock site={site} page='analytics' />

            <Tabs site={site} tab='audience' />

            <EmptyState
              title='There are currently no analytics available'
              subtitle='Collecting Analytics Data'
              illustration='illustration-3'
              videoName='Analytics Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before analytics data becomes available.'
            />

            {site.recordingsCount > 0 && (
              <AnalyticsAudience period={period} site={site} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesAnalyticsAudience;
export { getServerSideProps };
