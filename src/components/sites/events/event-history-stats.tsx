import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { EventHistoryTag } from 'components/sites/events/event-history-tag';
import { sortEventsHistory } from 'lib/events';
import { EventHistoryStatsSort } from 'types/events';
import type { EventsHistoryStat } from 'types/graphql';

interface Props {
  sort: EventHistoryStatsSort;
  eventHistoryStats: EventsHistoryStat[];
  setSort: (sort: EventHistoryStatsSort) => void;
}

export const EventHistoryStats: FC<Props> = ({ sort, eventHistoryStats, setSort }) => (
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
      {sortEventsHistory(eventHistoryStats, sort).map((stat, index) => (
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
