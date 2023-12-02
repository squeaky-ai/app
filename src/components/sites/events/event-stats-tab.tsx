import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { EventStatsTable } from 'components/sites/events/event-stats-table';
import { EventStatsBreakdown } from 'components/sites/events/event-stats-breakdown';
import { EventStatsSort } from 'types/events';
import type { EventsStat } from 'types/graphql';
import { EventStatTableColumns } from 'components/sites/events/event-stats-table-columns';
import { useColumns } from 'hooks/use-columns';

interface Props {
  sort: EventStatsSort;
  eventStats: EventsStat[];
  setSort: (sort: EventStatsSort) => void;
}

export const EventStatsTab: FC<Props> = ({ sort, eventStats, setSort }) => {

  const { columns, columnsReady, setColumns } = useColumns('event-stats');

  if (!columnsReady) return null;

  return (
    <>
      <div className='event-stats-table-header'>
        <EventStatTableColumns
          columns={columns}
          setColumns={setColumns}
        />
      </div>
      <Card className='event-stats-tab'>
        <EventStatsBreakdown 
          sort={sort}
          eventStats={eventStats}
        />
        <EventStatsTable 
          sort={sort}
          eventStats={eventStats}
          columns={columns}
          setSort={setSort}
        />
      </Card>
    </>
  );
};