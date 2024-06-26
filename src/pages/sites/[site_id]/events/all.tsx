import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import classnames from 'classnames';
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
import { PageProps } from 'types/page';
import { useSort } from 'hooks/use-sort';
import { Tags } from 'components/sites/filters/events/tags';
import { useFilters } from 'hooks/use-filters';
import { EventsFilters } from 'components/sites/filters/events/filters';
import { useEventCaptures } from 'hooks/use-event-captures';
import { EventSelected } from 'types/events';
import { FILTERS } from 'data/events/constants';
import { EventsCaptureFilters, EventsCaptureSort } from 'types/graphql';
import type { ValueOf } from 'types/common';

const SitesEventsAll: NextPage<PageProps> = ({ user }) => {
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

  const clearFilters = () => {
    setPage(1);
    setFilters(FILTERS);
  };

  const hasEvents = events.items.length > 0;
  const hasFilters = filters.source !== null || filters.eventType.length > 0 || !!search;

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
            <BreadCrumbs site={site} member={member} items={[{ name: 'Events' }]} />

            <div className='events-header'>
              <h4 className='title'>
                Events

                {hasEvents && (
                  <EventCreate site={site} member={member} buttonClassName='link' />
                )}
              </h4>

              {(hasEvents || hasFilters) && (
                <menu>
                  <Search
                    search={search}
                    onSearch={setSearch}
                    placeholder='Search event name or group...'
                  />
                  <EventCapturesBulkActions
                    site={site}
                    member={member}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <EventsFilters 
                    filters={filters}
                    updateFilters={updateFilters}
                  />
                  <ButtonGroup>
                    <Link href={`/sites/${site.id}/events/all`} className={classnames('button', 'primary')}>
                      All
                    </Link>
                    <Link  href={`/sites/${site.id}/events/groups`} className={classnames('button', 'blank')}>
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
              <>
                {!hasEvents && !hasFilters && (
                  <GettingStarted site={site} member={member} />
                )}

                {(hasEvents || hasFilters) && (
                  <>
                    <Tags 
                      filters={filters} 
                      updateFilters={updateFilters} 
                      clearFilters={clearFilters} 
                    />
                    <EventList 
                      tab='all'
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
                  </>
                )}
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesEventsAll;
