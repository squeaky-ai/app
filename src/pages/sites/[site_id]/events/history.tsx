import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Period } from 'components/sites/period/period';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePeriod } from 'hooks/use-period';
import { useEventHistory } from 'hooks/use-event-history';

const SitesEventsHistory: NextPage<ServerSideProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('event-history');

  const { error, loading } = useEventHistory();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Events</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Events', href: `/sites/${site.id}/events` }, { name: 'Event History' }]} />

            <div className='events-header'>
              <h3 className='title'>
                Events History
              </h3>

              <menu>
                <Period period={period} onChange={setPeriod} />
              </menu>
            </div>

            {loading && <PageLoading />}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesEventsHistory;
export { getServerSideProps };
