import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { Analytics } from 'components/sites/analytics/analytics';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Period } from 'components/sites/period/period';
import { usePeriod } from 'hooks/use-period';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesAnalytics: NextPage<ServerSideProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('analytics');
  
  return (
    <>
      <Head>
        <title>Squeaky | Site Analytics</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0})}>
            <BreadCrumbs site={site} items={[{ name: 'Analytics' }]} />

            <div className='heading'>
              <h3 className='title'>Analytics</h3>
              <Period period={period} onChange={setPeriod} />
            </div>

            <EmptyState
              title='There are currently no analytics available'
              subtitle='Collecting Analytics Data'
              illustration={3}
              videoName='Analytics Intro'
            />

            {site.recordingsCount > 0 && (
              <Analytics period={period} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesAnalytics;
export { getServerSideProps };
