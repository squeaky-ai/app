import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { EventHistoryTag } from 'components/sites/events/event-history-tag';
import { EventHistoryStatsSort } from 'types/events';
import type { EventsHistoryStat } from 'types/graphql';

interface Props {
  eventHistoryStats: EventsHistoryStat[];
}

const sortResults = (
  eventHistoryStats: EventsHistoryStat[], 
  sort: EventHistoryStatsSort
) => [...eventHistoryStats].sort((a, b) => {
  switch(sort) {
    case EventHistoryStatsSort.NameAsc:
      return a.name.localeCompare(b.name);
    case EventHistoryStatsSort.NameDesc:
      return b.name.localeCompare(a.name);
    case EventHistoryStatsSort.CountAsc:
      return a.count - b.count;
    case EventHistoryStatsSort.CountDesc:
      return b.count - a.count;
    case EventHistoryStatsSort.TypeAsc:
      return a.type.localeCompare(b.type);
    case EventHistoryStatsSort.TypeDesc:
      return b.type.localeCompare(a.type);
    case EventHistoryStatsSort.AverageEventsPerVisitorAsc:
      return a.averageEventsPerVisitor - b.averageEventsPerVisitor;
    case EventHistoryStatsSort.AverageEventsPerVisitorDesc:
      return b.averageEventsPerVisitor - a.averageEventsPerVisitor;
  }
});

export const EventHistoryStats: FC<Props> = ({ eventHistoryStats }) => {
  const [sort, setSort] = React.useState<EventHistoryStatsSort>(EventHistoryStatsSort.CountDesc);

  return (
    <div className='event-history-stats'>
      <Table>
        <Row head>
          <Cell>
            Name
            <Sort 
              name='name' 
              order={sort} 
              onAsc={() => setSort(EventHistoryStatsSort.NameAsc)} 
              onDesc={() => setSort(EventHistoryStatsSort.NameDesc)} 
            />
          </Cell>
          <Cell>
            Type
            <Sort 
              name='type' 
              order={sort} 
              onAsc={() => setSort(EventHistoryStatsSort.TypeAsc)} 
              onDesc={() => setSort(EventHistoryStatsSort.TypeDesc)} 
            />
          </Cell>
          <Cell>
            Events triggered
            <Sort 
              name='count' 
              order={sort} 
              onAsc={() => setSort(EventHistoryStatsSort.CountAsc)} 
              onDesc={() => setSort(EventHistoryStatsSort.CountDesc)} 
            />
          </Cell>
          <Cell>
            Avg. events per visitor 
            <Sort 
              name='average_events_per_visitor' 
              order={sort} 
              onAsc={() => setSort(EventHistoryStatsSort.AverageEventsPerVisitorAsc)} 
              onDesc={() => setSort(EventHistoryStatsSort.AverageEventsPerVisitorDesc)} 
            />
          </Cell>
        </Row>
        {sortResults(eventHistoryStats, sort).map((stat, index) => (
          <Row key={stat.id}>
            <Cell>
              <EventSwatch index={index} />
              {stat.name}
            </Cell>
            <Cell>
              <EventHistoryTag type={stat.type} />
            </Cell>
            <Cell>
              {stat.count}
            </Cell>
            <Cell>
              {stat.averageEventsPerVisitor}
            </Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
};
