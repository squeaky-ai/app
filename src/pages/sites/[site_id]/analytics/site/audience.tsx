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
import { AnalyticsSitesAudience } from 'components/sites/analytics/analytics-sites-audience';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesAnalyticsSiteAudience: NextPage<ServerSideProps> = ({ user }) => {
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
              <h4 className='title'>Analytics</h4>
              <Period period={period} onChange={setPeriod} />
            </div>

            <Unlock site={site} />

            <Tabs site={site} tab='audience' type='site' />

            <EmptyState
              title='There are currently no analytics available'
              subtitle='Collecting Analytics Data'
              illustration='illustration-3'
              videoName='Analytics Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before analytics data becomes available.'
            />

            {site.recordingsCount > 0 && (
              <AnalyticsSitesAudience period={period} site={site} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesAnalyticsSiteAudience;
export { getServerSideProps };
