import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Table, Row, Cell } from 'components/table';
import { Spinner } from 'components/spinner';
import { Sort } from 'components/sort';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { RecordingStarred } from 'components/sites/recordings/recordings-starred';
import { PageSize } from 'components/sites/page-size';
import { Pagination } from 'components/pagination';
import { EventData } from 'components/sites/events/event-data';
import { useSort } from 'hooks/use-sort';
import { Illustration } from 'components/illustration';
import { useEventFeed } from 'hooks/use-event-feed';
import { getDateRange } from 'lib/dates';
import { EventsFeedSort, Team } from 'types/graphql';
import type { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  member?: Team;
  groupIds: string[];
  captureIds: string[];
  period: TimePeriod;
}

export const EventFeedTable: FC<Props> = ({ site, member, groupIds, captureIds, period }) => {
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(10);

  const { sort, setSort } = useSort<EventsFeedSort>('events-feed');

  const { feed, loading } = useEventFeed({
    groupIds,
    captureIds,
    page,
    size,
    sort,
    range: getDateRange(period),
  });

  if (loading) {
    return <Spinner />;
  }

  if (!loading && feed.items.length === 0) {
    return (
      <div className='no-events'>
        <Illustration illustration='illustration-1' height={160} width={320} />
        <h5>There are currently no events to show.</h5>
      </div>
    );
  }

  return (
    <>
      <div className='event-table event-feed'>
        <Table>
          <Row head>
            <Cell>
              Date &amp; Time
              <Sort 
                name='timestamp' 
                order={sort} 
                onAsc={() => setSort(EventsFeedSort.TimestampAsc)} 
                onDesc={() => setSort(EventsFeedSort.TimestampDesc)} 
              />
            </Cell>
            <Cell>Event Name</Cell>
            <Cell>Source</Cell>
            <Cell>Data</Cell>
            <Cell>Visitor ID</Cell>
            <Cell>Recording ID</Cell>
          </Row>
          {feed.items.map(feed => (
            <Row key={feed.id}>
              <Cell>
                {feed.timestamp.niceDateTime}
              </Cell>
              <Cell>
                {feed.eventName}
              </Cell>
              <Cell>{feed.source?.toUpperCase() || 'WEB'}</Cell>
              <Cell className='event-data'><EventData data={feed.data} /></Cell>
              <Cell>
                {!feed.visitor ? '-' : (
                  <Link href={`/sites/${site.id}/visitors/${feed.visitor.id}`}>
                    <VisitorsStarred site={site} member={member} visitor={feed.visitor} />
                  </Link>
                )}
              </Cell>
              <Cell>
                {!feed.recording ? '-' : (
                  <RecordingStarred 
                    site={site}
                    member={member}
                    recording={feed.recording} 
                    link
                  />
                )}
              </Cell>
            </Row>
          ))}
        </Table>
      </div>

      <div className='event-feed-footer'>
        <Pagination 
          currentPage={page}
          pageSize={feed.pagination.pageSize}
          total={feed.pagination.total}
          setPage={setPage}
        />
        <PageSize
          value={feed.pagination.pageSize} 
          onChange={setSize}
          show={feed.pagination.total > size}
        />
      </div>
    </>
  );
};
