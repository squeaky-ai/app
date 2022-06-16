import React from 'react';
import type { FC } from 'react';
import { EventHistoryTags } from 'components/sites/events/event-tags';
import { EventCounts } from 'components/sites/events/event-counts';
import { EventStatsTable } from 'components/sites/events/event-stats-table';
import { EventFeedTable } from 'components/sites/events/event-feed-table';
import { EventTabs, TabsType } from 'components/sites/events/event-tabs';
import { EventStatsSort } from 'types/events';
import type { EventStats } from 'hooks/use-event-stats';
import type { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  groupIds: string[];
  captureIds: string[];
  period: TimePeriod;
  eventStats: EventStats;
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

export const EventHistory: FC<Props> =  ({ 
  site,
  groupIds, 
  captureIds, 
  period,
  eventStats, 
  setGroupIds, 
  setCaptureIds 
}) => {
  const [activeTab, setActiveTab] = React.useState<TabsType>('stats');
  const [sort, setSort] = React.useState<EventStatsSort>(EventStatsSort.CountDesc);

  return (
    <div className='event-history'>
      <EventHistoryTags 
        groupIds={groupIds}
        captureIds={captureIds}
        eventStats={eventStats.eventStats} 
        setGroupIds={setGroupIds}
        setCaptureIds={setCaptureIds}
      />

      <EventCounts 
        sort={sort}
        eventStats={eventStats} 
        period={period}
      />
      <EventTabs active={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'stats'
        ? <EventStatsTable sort={sort} eventStats={eventStats.eventStats} setSort={setSort} />
        : <EventFeedTable site={site} groupIds={groupIds} captureIds={captureIds} period={period} />
      }
    </div>
  );
};
