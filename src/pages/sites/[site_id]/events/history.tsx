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
import { Unlock } from 'components/sites/unlock';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePeriod } from 'hooks/use-period';
import { getDateRange } from 'lib/dates';
import { useEventStats } from 'hooks/use-event-stats';
import { useEventIds } from 'hooks/use-event-ids';
import { EmptyState } from 'components/sites/empty-state';
import { EventAdd } from 'components/sites/events/event-add';

const SitesEventsHistory: NextPage<ServerSideProps> = ({ user }) => {
  const { period, setPeriod } = usePeriod('event-history');
  
  const { 
    groupIds, 
    captureIds,
    setGroupIds,
    setCaptureIds,
  } = useEventIds();

  const { eventStats, error, loading } = useEventStats({ 
    groupIds,
    captureIds,
    range: getDateRange(period),
  });

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
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Events', href: `/sites/${site.id}/events` }, { name: 'Event History' }]} />

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
            
            {!loading && hasIds && (
              <EventHistory 
                site={site}
                member={member}
                eventStats={eventStats} 
                groupIds={groupIds}
                captureIds={captureIds}
                setGroupIds={setGroupIds}
                setCaptureIds={setCaptureIds} 
                period={period}
              />
            )}

            {!loading && !hasIds && (
              <EmptyState
                site={site}
                title='There are currently no events configured.'
                subtitle=''
                snippet=''
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
