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
import { PageLoading } from 'components/sites/page-loading';
import { PageSearch } from 'components/sites/page-search';
import { Label } from 'components/label';
import { Tabs } from 'components/sites/analytics/tabs';
import { AnalyticsPagesAudience } from 'components/sites/analytics/analytics-pages-audience';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePeriod } from 'hooks/use-period';
import { usePages } from 'hooks/use-pages';

const SitesAnalyticsPageAudience: NextPage<ServerSideProps> = ({ user }) => {
  const { pages, loading } = usePages();
  const { period, setPeriod } = usePeriod('analytics');

  const [page, setPage] = React.useState<string>('');

  React.useEffect(() => {
    if (!page) setPage(pages[0]);
  }, [pages]);

  return (
    <>
      <Head>
        <title>Squeaky | Page Analytics | Audience</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Analytics' }]} />

            {loading && (
              <PageLoading />
            )}

            {!loading && (
              <>
                <div className='heading'>
                    <h3 className='title'>Page Analytics</h3>
                    <menu>
                      <Label>Page</Label>
                      <PageSearch page={page} setPage={setPage} pages={pages} />
                      <Period period={period} onChange={setPeriod} />
                    </menu>
                  </div>

                  <Unlock site={site} page='analytics' />

                  <Tabs site={site} tab='audience' type='page' />

                  <EmptyState
                    title='There are currently no analytics available'
                    subtitle='Collecting Analytics Data'
                    illustration='illustration-3'
                    videoName='Analytics Intro'
                    snippet='If you have only recently installed or updated your tracking code it may take up to an hour before analytics data becomes available.'
                  />

                  {site.recordingsCount > 0 && !!page && (
                    <AnalyticsPagesAudience period={period} page={page} site={site} />
                  )}
                </>
              )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesAnalyticsPageAudience;
export { getServerSideProps };
