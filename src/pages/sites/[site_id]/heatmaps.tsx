import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { EmptyState } from 'components/sites/empty-state';
import { Spinner } from 'components/spinner';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Heatmaps } from 'components/sites/heatmaps/heatmaps';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePages } from 'hooks/use-pages';
import type { TimePeriod } from 'lib/dates';


const SitesHeatmaps: NextPage<ServerSideProps> = ({ user }) => {
  const [page, setPage] = React.useState<string>(null);
  const [period, setPeriod] = React.useState<TimePeriod>('past_seven_days');

  const { pages, loading } = usePages();

  React.useEffect(() => {
    if (!page) setPage(pages[0]);
  }, [pages]);

  return (
    <>
      <Head>
        <title>Squeaky | Site Heatmaps</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Heatmaps' }]} />

            <div className='heatmaps-heading'>
              <h3 className='title'>Heatmaps</h3>
            </div>

            <EmptyState 
              title='There are currently no heatmaps available.'
              subtitle='Collecting Heatmap Data'
              illustration={8}
              videoName='Heatmap Intro'
            />

            {loading && pages.length === 0 && (
              <Spinner />
            )}

            {site.recordingsCount > 0 && page && (
              <Heatmaps 
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

export default SitesHeatmaps;
export { getServerSideProps };
