import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { Spinner } from 'components/spinner';
import { Sort } from 'components/sort';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { RecordingStarred } from 'components/sites/recordings/recordings-starred';
import { PageSize } from 'components/sites/page-size';
import { Pagination } from 'components/pagination';
import { useSort } from 'hooks/use-sort';
import { useEventFeed } from 'hooks/use-event-feed';
import { toNiceDate, getDateRange } from 'lib/dates';
import { EventsFeedSort } from 'types/graphql';
import type { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  groupIds: string[];
  captureIds: string[];
  period: TimePeriod;
}

export const EventHistoryFeed: FC<Props> = ({ site, groupIds, captureIds, period }) => {
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
    // TODO: Add empty state
    return <p>No results</p>;
  }

  return (
    <>
      <div className='event-history-table event-history-feed'>
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
            <Cell>Visitor ID</Cell>
            <Cell>Recording ID</Cell>
          </Row>
          {feed.items.map(feed => (
            <Row key={feed.id}>
              <Cell>
                {toNiceDate(feed.timestamp)}
              </Cell>
              <Cell>
                {feed.eventName}
              </Cell>
              <Cell>
                <VisitorsStarred site={site} visitor={feed.visitor} />
              </Cell>
              <Cell>
                <RecordingStarred site={site} recording={feed.recording} />
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
