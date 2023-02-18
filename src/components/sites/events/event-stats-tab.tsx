import React from 'react';
import type { FC } from 'react';
import { EventStatsTable } from 'components/sites/events/event-stats-table';
import { EventStatsBreakdown } from 'components/sites/events/event-stats-breakdown';
import { EventStatsSort } from 'types/events';
import type { EventsStat } from 'types/graphql';

interface Props {
  sort: EventStatsSort;
  eventStats: EventsStat[];
  setSort: (sort: EventStatsSort) => void;
}

export const EventStatsTab: FC<Props> = ({ sort, eventStats, setSort }) => (
  <div className='event-stats-tab'>
    <EventStatsTable 
      sort={sort}
      eventStats={eventStats}
      setSort={setSort}
    />
    <EventStatsBreakdown 
      sort={sort}
      eventStats={eventStats}
    />
  </div>
);
