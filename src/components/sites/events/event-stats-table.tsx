import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { EventStatsTag } from 'components/sites/events/event-stats-tag';
import { sortEventsStats } from 'lib/events';
import { EventStatsSort } from 'types/events';
import type { EventsStat } from 'types/graphql';

interface Props {
  sort: EventStatsSort;
  eventStats: EventsStat[];
  setSort: (sort: EventStatsSort) => void;
}

export const EventStatsTable: FC<Props> = ({ sort, eventStats, setSort }) => (
  <div className='event-table event-stats'>
    <Table>
      <Row head>
        <Cell>
          Name
          <Sort 
            name='name' 
            order={sort} 
            onAsc={() => setSort(EventStatsSort.NameAsc)} 
            onDesc={() => setSort(EventStatsSort.NameDesc)} 
          />
        </Cell>
        <Cell>
          Type
          <Sort 
            name='type' 
            order={sort} 
            onAsc={() => setSort(EventStatsSort.TypeAsc)} 
            onDesc={() => setSort(EventStatsSort.TypeDesc)} 
          />
        </Cell>
        <Cell>
          Events triggered
          <Sort 
            name='count' 
            order={sort} 
            onAsc={() => setSort(EventStatsSort.CountAsc)} 
            onDesc={() => setSort(EventStatsSort.CountDesc)} 
          />
        </Cell>
        <Cell>
          Unique triggers
          <Sort 
            name='unique_triggers' 
            order={sort} 
            onAsc={() => setSort(EventStatsSort.UniqueTriggersAsc)} 
            onDesc={() => setSort(EventStatsSort.UniqueTriggersDesc)} 
          />
        </Cell>
        <Cell>
          Avg. events per visitor
          <Sort 
            name='average_events_per_visitor' 
            order={sort} 
            onAsc={() => setSort(EventStatsSort.AverageEventsPerVisitorAsc)} 
            onDesc={() => setSort(EventStatsSort.AverageEventsPerVisitorDesc)} 
          />
        </Cell>
      </Row>
      {sortEventsStats(eventStats, sort).map((stat, index) => (
        <Row key={stat.eventOrGroupId}>
          <Cell>
            <EventSwatch index={index} />
            {stat.name}
          </Cell>
          <Cell>
            <EventStatsTag type={stat.type} />
          </Cell>
          <Cell>
            {stat.count.toLocaleString()}
          </Cell>
          <Cell>
            {stat.uniqueTriggers}
          </Cell>
          <Cell>
            {stat.averageEventsPerVisitor.toFixed(2)}
          </Cell>
        </Row>
      ))}
    </Table>
  </div>
);
