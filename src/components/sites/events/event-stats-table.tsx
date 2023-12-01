import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Table, Row, Cell } from 'components/table';
import { Sort } from 'components/sort';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { EventStatsTag } from 'components/sites/events/event-stats-tag';
import { sortEventsStats } from 'lib/events';
import { EventStatsSort } from 'types/events';
import type { EventsStat } from 'types/graphql';
import { STATS_COLUMNS } from 'data/events/constants';
import { getColumnStyles } from 'lib/tables';
import { Column } from 'types/common';

interface Props {
  sort: EventStatsSort;
  eventStats: EventsStat[];
  columns: Column[];
  setSort: (sort: EventStatsSort) => void;
}

export const EventStatsTable: FC<Props> = ({ sort, eventStats, columns, setSort }) => {
  const { rowStyle, tableClassNames } = getColumnStyles(STATS_COLUMNS, columns);

  return (
    <div className='event-table event-stats'>
      <Table className={classnames(tableClassNames)}>
        <Row head style={rowStyle}>
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
          <Cell>
            Avg. session duration of triggered visitors
            <Sort 
              name='average_session_duration' 
              order={sort} 
              onAsc={() => setSort(EventStatsSort.AverageSessionDurationAsc)} 
              onDesc={() => setSort(EventStatsSort.AverageSessionDurationDesc)} 
            />
          </Cell>
          <Cell>
            Top 5 browsers
          </Cell>
          <Cell>
            Top 10 traffic sources
          </Cell>
        </Row>
        {sortEventsStats(eventStats, sort).map((stat, index) => (
          <Row key={stat.eventOrGroupId} style={rowStyle}>
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
              {stat.uniqueTriggers || '-'}
            </Cell>
            <Cell>
              {stat.averageEventsPerVisitor?.toFixed(2) || '-'}
            </Cell>
            <Cell>
              -
            </Cell>
            <Cell>
              -
            </Cell>
            <Cell>
              -
            </Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
};
