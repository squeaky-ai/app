import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Spinner } from 'components/spinner';
import { Error } from 'components/error';
import { Sort } from 'components/sort';
import { Pagination } from 'components/pagination';
import { Illustration } from 'components/illustration';
import { Table, Row, Cell } from 'components/table';
import { useVisitorEvents } from 'hooks/use-visitor-events';
import { EventData } from 'components/sites/events/event-data';
import { EventTag } from 'components/sites/events/event-tag';
import { RecordingStarred } from 'components/sites/recordings/recordings-starred';
import { EventsFeedSort } from 'types/graphql';
import { EventsCaptureType } from 'types/events';
import { toNiceDate } from 'lib/dates';
import type { Site, Team } from 'types/graphql';


interface Props {
  site: Site;
  member?: Team;
}

export const VisitorsEvents: FC<Props> = ({ site, member }) => {
  const [page, setPage] = React.useState<number>(1);
  const [sort, setSort] = React.useState<EventsFeedSort>(EventsFeedSort.TimestampDesc);

  const { error, loading, events } = useVisitorEvents({
    page,
    sort,
  });

  const { items, pagination } = events;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className='recordings-header'>
        <h4>Events</h4>
      </div>

      {items.length === 0 && (
        <div className='no-visitor-recordings'>
          <Illustration illustration='illustration-1' height={160} width={320} />
          <h5>There are currently no events for this visitor.</h5>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className='event-table event-feed'>
            <Table>
              <Row head>
                <Cell>Event Name</Cell>
                <Cell>Event Type</Cell>
                <Cell>Source</Cell>
                <Cell>Data</Cell>
                <Cell>Recording ID</Cell>
                <Cell>
                  Date &amp; Time
                  <Sort 
                    name='timestamp' 
                    order={sort} 
                    onAsc={() => setSort(EventsFeedSort.TimestampAsc)} 
                    onDesc={() => setSort(EventsFeedSort.TimestampDesc)} 
                  />
                </Cell>
              </Row>
              {items.map(feed => (
                <Row key={feed.id}>
                  <Cell>
                    {feed.eventName}
                  </Cell>
                  <Cell>
                    <EventTag type={EventsCaptureType.Custom} />
                  </Cell>
                  <Cell>{feed.source?.toUpperCase() || 'WEB'}</Cell>
                  <Cell className='event-data'><EventData data={feed.data} /></Cell>
                  <Cell>
                    {!feed.recording ? '-' : (
                      <Link href={`/sites/${site.id}/recordings/${feed.recording.id}`}>
                        <RecordingStarred 
                          site={site}
                          member={member}
                          recording={feed.recording} 
                        />
                      </Link>
                    )}
                  </Cell>
                  <Cell>
                    {toNiceDate(feed.timestamp)}
                  </Cell>
                </Row>
              ))}
            </Table>
          </div>

          <Pagination 
            currentPage={page} 
            pageSize={pagination.pageSize}
            total={pagination.total}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};
