import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Unlock } from 'components/sites/unlock';
import { Journeys } from 'components/sites/journeys/journeys';
import { PageLoading } from 'components/sites/page-loading';
import { usePeriod } from 'hooks/use-period';
import { usePages } from 'hooks/use-pages';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesJourneys: NextPage<ServerSideProps> = ({ user }) => {
  const [page, setPage] = React.useState<string>(null);
  const { period, setPeriod } = usePeriod('journeys');

  const { pages, loading } = usePages();

  React.useEffect(() => {
    if (!page) setPage(pages[0]);
  }, [pages]);

  return (
    <>
      <Head>
        <title>Squeaky | Site | Journey</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Journeys' }]} />

            <div className='heading'>
              <h3 className='title'>Journeys</h3>
            </div>

            <Unlock site={site} page='analytics' />

            <EmptyState
              title='There are currently no user journeys available.'
              subtitle='Collecting Journey Data'
              illustration='illustration-16'
              videoName='Journey Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before journey data becomes available.'
            />

            {loading && (
              <PageLoading />
            )}

            {page && site.recordingsCount > 0 && (
              <Journeys
                page={page}
                pages={pages}
                period={period}
                setPage={setPage}
                setPeriod={setPeriod}
              />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesJourneys;
export { getServerSideProps };

