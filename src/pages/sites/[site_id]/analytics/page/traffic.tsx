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
import { PageSearch } from 'components/sites/page-search';
import { Label } from 'components/label';
import { usePeriod } from 'hooks/use-period';
import { Tabs } from 'components/sites/analytics/tabs';
import { AnalyticsPagesTraffic } from 'components/sites/analytics/analytics-pages-traffic';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePages } from 'hooks/use-pages';

const SitesAnalyticsPageTraffic: NextPage<ServerSideProps> = ({ user }) => {
  const { pages } = usePages();
  const { period, setPeriod } = usePeriod('analytics');

  const [page, setPage] = React.useState<string>('');

  React.useEffect(() => {
    if (!page) setPage(pages[0]);
  }, [pages]);
  
  return (
    <>
      <Head>
        <title>Squeaky | Page Analytics | Traffic</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Analytics' }]} />

            <div className='heading'>
              <h3 className='title'>Page Analytics</h3>
              <menu>
                <Label>Page</Label>
                <PageSearch page={page} setPage={setPage} pages={pages} />
                <Period period={period} onChange={setPeriod} />
              </menu>
            </div>

            <Unlock site={site} page='analytics' />

            <Tabs site={site} tab='traffic' type='page' />

            <EmptyState
              title='There are currently no analytics available'
              subtitle='Collecting Analytics Data'
              illustration='illustration-3'
              videoName='Analytics Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before analytics data becomes available.'
            />

            {site.recordingsCount > 0 && page && (
              <AnalyticsPagesTraffic period={period} page={page} site={site} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesAnalyticsPageTraffic;
export { getServerSideProps };
