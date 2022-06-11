import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Period } from 'components/sites/period/period';
import { Error } from 'components/error';
import { EventHistory } from 'components/sites/events/event-history';
import { PageLoading } from 'components/sites/page-loading';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePeriod } from 'hooks/use-period';
import { useEventHistoryStats } from 'hooks/use-event-history-stats';
import { useEventHistoryIds } from 'hooks/use-event-history-ids';

const SitesEventsHistory: NextPage<ServerSideProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('event-history');
  
  const { 
    groupIds, 
    captureIds,
    setGroupIds,
    setCaptureIds,
  } = useEventHistoryIds();

  const { eventHistoryStats, error, loading } = useEventHistoryStats({ groupIds, captureIds });

  if (error) {
    return <Error />;
  }

  const hasIds = [...groupIds, ...captureIds].length > 0;

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
            
            {!loading && hasIds && (
              <EventHistory 
                site={site}
                eventHistoryStats={eventHistoryStats} 
                groupIds={groupIds}
                captureIds={captureIds}
                setGroupIds={setGroupIds}
                setCaptureIds={setCaptureIds} 
                period={period}
              />
            )}

            {/** TODO: Add empty state */}
            {!loading && !hasIds && (
              <p>Nothing selected</p>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesEventsHistory;
export { getServerSideProps };
