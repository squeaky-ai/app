import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/empty-state';
import { PageLoading } from 'components/sites/page-loading';
import { Unlock } from 'components/sites/unlock';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Heatmaps } from 'components/sites/heatmaps/heatmaps';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePages } from 'hooks/use-pages';
import { usePeriod } from 'hooks/use-period';
import { getDateRange } from 'lib/dates';
import { HeatmapsType } from 'types/graphql';

const SitesHeatmapsClickPositions: NextPage<ServerSideProps> = ({ user }) => {
  const [page, setPage] = React.useState<string>(null);

  const { period, setPeriod } = usePeriod('heatmaps');

  const { pages, loading } = usePages({ range: getDateRange(period) });

  React.useEffect(() => {
    if (!page) {
      // Default to the most popular page
      const page = [...pages].sort((a, b) => b.count - a.count)[0];
      setPage(page?.url);
    }
  }, [pages]);

  return (
    <>
      <Head>
        <title>Squeaky | Site Heatmaps</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Heatmaps' }, { name: 'Clicks' }]} />

            <div className='heatmaps-heading'>
              <h4 className='title'>Clicks</h4>
            </div>

            <EmptyState 
              site={site}
              title='There are currently no heatmaps available.'
              subtitle='Collecting Heatmap Data'
              illustration='illustration-8'
              videoName='Heatmap Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before heatmap data becomes available.'
            />

            {loading && pages.length === 0 && (
              <PageLoading />
            )}

            <Unlock site={site} />

            {site.recordingsCount > 0 && !loading && (
              <Heatmaps 
                type={HeatmapsType.ClickPosition}
                page={page} 
                pages={pages}
                setPage={setPage} 
                period={period}
                setPeriod={setPeriod}
              />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesHeatmapsClickPositions;
export { getServerSideProps };
