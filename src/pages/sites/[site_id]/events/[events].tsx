import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { ButtonGroup } from 'components/button-group';
import { EmptyState } from 'components/sites/empty-state';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Error } from 'components/error';
import { Search } from 'components/search';
import { PageLoading } from 'components/sites/page-loading';
import { GettingStarted } from 'components/sites/events/getting-started';
import { EventCapturesBulkActions } from 'components/sites/events/event-captures-bulk-actions';
import { EventCreate } from 'components/sites/events/event-create';
import { EventList } from 'components/sites/events/event-list';
import { Unlock } from 'components/sites/unlock';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useSort } from 'hooks/use-sort';
import { useFilters } from 'hooks/use-filters';
import { EventsFilters } from 'components/sites/filters/events/filters';
import { useEventCaptures } from 'hooks/use-event-captures';
import { EventsGroupType, EventSelected } from 'types/events';
import { EventsCaptureFilters, EventsCaptureSort } from 'types/graphql';
import type { ValueOf } from 'types/common';

const SitesEvents: NextPage<ServerSideProps> = ({ user }) => {
  const { query } = useRouter();

  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(20);
  const [selected, setSelected] = React.useState<EventSelected[]>([]);
  const [search, setSearch] = React.useState<string>('');

  const { sort, setSort } = useSort<EventsCaptureSort>('events');
  const { filters, setFilters } = useFilters<EventsCaptureFilters>('events');

  const { events, error, loading } = useEventCaptures({
    page,
    size,
    sort,
    search,
    filters,
  });

  const updateFilters = (key: keyof EventsCaptureFilters, value: ValueOf<EventsCaptureFilters>) => {
    setPage(1);
    setFilters({ ...filters, [key]: value });
  };
  
  const tab = ['all', 'groups'].includes(query.events as EventsGroupType)
    ? query.events as EventsGroupType 
    : 'all';

  const hasEvents = events.items.length > 0;

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Events</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Events' }]} />

            <div className='events-header'>
              <h4 className='title'>
                Events

                {hasEvents && (
                  <EventCreate site={site} member={member} buttonClassName='link' />
                )}
              </h4>

              {hasEvents && (
                <menu>
                  {tab === 'all' && (
                    <Search
                      search={search}
                      onSearch={setSearch}
                      placeholder='Search event name or group...'
                    />
                  )}
                  <EventCapturesBulkActions
                    site={site}
                    member={member}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {tab === 'all' && (
                    <EventsFilters 
                      filters={filters}
                      updateFilters={updateFilters}
                    />
                  )}
                  <ButtonGroup>
                    <Link href={`/sites/${site.id}/events/all`} className={classnames('button', tab === 'all' ? 'primary' : 'blank')}>
                      All
                    </Link>
                    <Link  href={`/sites/${site.id}/events/groups`} className={classnames('button', tab === 'groups' ? 'primary' : 'blank')}>
                      Groups
                    </Link>
                  </ButtonGroup>
                </menu>
              )}
            </div>

            <Unlock site={site} />

            <EmptyState
              site={site}
              title='There is currently no events data'
              illustration='illustration-17'
            />

            {loading && (
              <PageLoading />
            )}

            {!loading && site.recordingsCount > 0 && (
              events.items.length > 0
                ? (
                  <EventList 
                    tab={tab}
                    site={site}
                    events={events}
                    member={member}
                    page={page}
                    selected={selected}
                    sort={sort}
                    setPage={setPage}
                    setSelected={setSelected}
                    setSize={setSize}
                    setSort={setSort}
                  />
                )
                : <GettingStarted site={site} member={member} />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesEvents;
export { getServerSideProps };
