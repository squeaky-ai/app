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
import { PageLoading } from 'components/sites/page-loading';
import { GettingStarted } from 'components/sites/events/getting-started';
import { EventCapturesBulkActions } from 'components/sites/events/event-captures-bulk-actions';
import { EventCreate } from 'components/sites/events/event-create';
import { EventList } from 'components/sites/events/event-list';
import { Unlock } from 'components/sites/unlock';
import { PageProps } from 'types/page';
import { useSort } from 'hooks/use-sort';
import { useEventCaptures } from 'hooks/use-event-captures';
import { EventSelected } from 'types/events';
import { EventsCaptureSort } from 'types/graphql';

const SitesEvents: NextPage<PageProps> = ({ user }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(20);
  const [selected, setSelected] = React.useState<EventSelected[]>([]);

  const { sort, setSort } = useSort<EventsCaptureSort>('events');

  const { events, error, loading } = useEventCaptures({
    page,
    size,
    sort,
    filters: {},
  });

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
            <BreadCrumbs site={site} member={member} items={[{ name: 'Events' }]} />

            <div className='events-header'>
              <h4 className='title'>
                Events

                {hasEvents && (
                  <EventCreate site={site} member={member} buttonClassName='link' />
                )}
              </h4>

              {(hasEvents) && (
                <menu>
                  <EventCapturesBulkActions
                    site={site}
                    member={member}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <ButtonGroup>
                    <Link href={`/sites/${site.id}/events/all`} className={classnames('button', 'blank')}>
                      All
                    </Link>
                    <Link  href={`/sites/${site.id}/events/groups`} className={classnames('button', 'primary')}>
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
                {!hasEvents && (
                  <GettingStarted site={site} member={member} />
                )}

                {(hasEvents) && (
                  <>
                    <EventList 
                      tab='groups'
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

export default SitesEvents;
