import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Button } from 'components/button';
import { ButtonGroup } from 'components/button-group';
import { EmptyState } from 'components/sites/empty-state';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { GettingStarted } from 'components/sites/events/getting-started';
import { EventCapturesBulkActions } from 'components/sites/events/event-captures-bulk-actions';
import { EventCreate } from 'components/sites/events/event-create';
import { EventList } from 'components/sites/events/event-list';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useSort } from 'hooks/use-sort';
import { useEventCaptures } from 'hooks/use-event-captures';
import { EventsGroupType, EventSelected } from 'types/events';
import { EventsCaptureSort } from 'types/graphql';

const SitesEvents: NextPage<ServerSideProps> = ({ user }) => {
  const [type, setType] = React.useState<EventsGroupType>(EventsGroupType.All);
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(20);
  const [selected, setSelected] = React.useState<EventSelected[]>([]);

  const { sort, setSort } = useSort<EventsCaptureSort>('events');

  const { events, error, loading } = useEventCaptures({ page, size, sort });

  if (error) {
    return <Error />;
  }

  const hasEvents = events.items.length > 0;

  return (
    <>
      <Head>
        <title>Squeaky | Site Events</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Events' }]} />

            <div className='events-header'>
              <h4 className='title'>
                Events

                {hasEvents && (
                  <EventCreate site={site} buttonClassName='link' />
                )}
              </h4>

              {hasEvents && (
                <menu>
                  <EventCapturesBulkActions
                    site={site}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <ButtonGroup>
                    <Button className={classnames(type === EventsGroupType.All ? 'primary' : 'blank')} onClick={() => setType(EventsGroupType.All)}>
                      All
                    </Button>
                    <Button className={classnames(type === EventsGroupType.Groups ? 'primary' : 'blank')} onClick={() => setType(EventsGroupType.Groups)}>
                      Groups
                    </Button>
                  </ButtonGroup>
                </menu>
              )}
            </div>

            <EmptyState
              title='There is currently no events data'
              subtitle='Accessing Events Data'
              illustration='illustration-17'
              videoName='Events Intro'
              snippet='If you have only recently installed or updated your tracking code it may take up to an hour before any event data becomes available for you to manage.'
            />

            {loading && (
              <PageLoading />
            )}

            {!loading && site.recordingsCount > 0 && (
              events.items.length > 0
                ? (
                  <EventList 
                    type={type}
                    site={site}
                    events={events}
                    page={page}
                    selected={selected}
                    sort={sort}
                    setPage={setPage}
                    setSelected={setSelected}
                    setSize={setSize}
                    setSort={setSort}
                  />
                )
                : <GettingStarted site={site} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesEvents;
export { getServerSideProps };
