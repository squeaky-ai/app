import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Period } from 'components/sites/period/period';
import { Error } from 'components/error';
import { EventHistory } from 'components/sites/events/event-history';
import { PageLoading } from 'components/sites/page-loading';
import { Unlock } from 'components/sites/unlock';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePeriod } from 'hooks/use-period';
import { getDateRange } from 'lib/dates';
import { useEventStats } from 'hooks/use-event-stats';
import { useEventIds } from 'hooks/use-event-ids';
import { EmptyState } from 'components/sites/empty-state';
import { EventAdd } from 'components/sites/events/event-add';
import { TabsType } from 'components/sites/events/event-tabs';

const SitesEventsHistory: NextPage<ServerSideProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('event-history');
  
  const { 
    groupIds, 
    captureIds,
    setGroupIds,
    setCaptureIds,
  } = useEventIds();

  const { query } = useRouter();

  const { eventStats, error, loading } = useEventStats({ 
    groupIds,
    captureIds,
    range: getDateRange(period),
  });

  if (error) {
    return <Error />;
  }

  const hasIds = [...groupIds, ...captureIds].length > 0;
  const hasEvents = eventStats.eventCounts.items.length > 0;

  const tab = ['stats', 'feed'].includes(query.history as TabsType)
    ? query.history as TabsType 
    : 'stats';

  return (
    <>
      <Head>
        <title>Squeaky | Site Events</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Events', href: `/sites/${site.id}/events/all` }, { name: 'Event History' }]} />

            <div className='events-header'>
              <h4 className='title'>
                Events History
                <EventAdd 
                  setGroupIds={setGroupIds}
                  setCaptureIds={setCaptureIds}
                  eventStats={eventStats.eventStats}
                />
              </h4>

              <menu>
                <Period period={period} onChange={setPeriod} />
              </menu>
            </div>

            <Unlock site={site} />

            {loading && <PageLoading />}
            
            {!loading && hasIds && hasEvents && (
              <EventHistory 
                site={site}
                member={member}
                eventStats={eventStats} 
                groupIds={groupIds}
                captureIds={captureIds}
                setGroupIds={setGroupIds}
                setCaptureIds={setCaptureIds} 
                period={period}
                tab={tab}
              />
            )}

            {!loading && !hasIds && (
              <EmptyState
                site={site}
                title='There are currently no events configured.'
                illustration='illustration-2'
              />
            )}

            {!loading && hasIds && !hasEvents && (
              <EmptyState
                site={site}
                title='There are no events for the time period you&apos;ve selected.'
                illustration='illustration-2'
              />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesEventsHistory;
export { getServerSideProps };
