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
import { PageProps } from 'types/page';
import { getDateRange } from 'lib/dates';

const SitesJourneys: NextPage<PageProps> = ({ user }) => {
  const [page, setPage] = React.useState<string>(null);
  const { period, setPeriod } = usePeriod('journeys');

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
        <title>Squeaky | Site | Journey</title> 
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Journeys' }]} />

            <div className='heading'>
              <h4 className='title'>Journeys</h4>
            </div>

            <Unlock site={site} />

            <EmptyState
              site={site}
              title='There are currently no user journeys available.'
              illustration='illustration-16'
            />

            {loading && (
              <PageLoading />
            )}

            {site.recordingsCount > 0 && !loading && (
              <Journeys
                site={site}
                member={member}
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
