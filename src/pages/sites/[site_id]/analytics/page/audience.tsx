import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Unlock } from 'components/sites/unlock';
import { Period } from 'components/sites/period/period';
import { PageLoading } from 'components/sites/page-loading';
import { Label } from 'components/label';
import { Tabs } from 'components/sites/analytics/tabs';
import { Pages } from 'components/sites/analytics/pages';
import { AnalyticsPagesAudience } from 'components/sites/analytics/analytics-pages-audience';
import { PageProps } from 'types/page';
import { usePeriod } from 'hooks/use-period';
import { usePages } from 'hooks/use-pages';
import { getDateRange } from 'lib/dates';

const SitesAnalyticsPageAudience: NextPage<PageProps> = ({ user }) => {
  const { query } = useRouter();

  const { period, setPeriod } = usePeriod('analytics');
  const { pages, loading } = usePages({ range: getDateRange(period) });

  const [page, setPage] = React.useState<string>('');

  React.useEffect(() => {
    if (!page) {
      // Default to the most popular page
      const page = [...pages].sort((a, b) => b.count - a.count)[0];
      setPage(page?.url);
    }
  }, [pages]);

  React.useEffect(() => {
    if (query.url) setPage(`${query.url}`);
  }, []);

  return (
    <>
      <Head>
        <title>Squeaky | Page Analytics | Audience</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Page Analytics' }]} />

            <div className='heading'>
              <h4 className='title'>Page Analytics</h4>
              {!loading && (
                <menu>
                  <Label>Page</Label>
                  <Pages
                    page={page}
                    pages={pages}
                    setPage={setPage}
                  />
                  <Period period={period} onChange={setPeriod} />
                </menu>
              )}
            </div>

            <Unlock site={site} />

            <Tabs site={site} tab='audience' type='page' page={page} />

            <EmptyState
              site={site}
              title='There are currently no analytics available'
              illustration='illustration-3'
            />

            {loading && (
              <PageLoading />
            )}

            {site.recordingsCount > 0 && (
              <AnalyticsPagesAudience period={period} page={page} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesAnalyticsPageAudience;
