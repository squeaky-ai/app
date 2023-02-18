import React from 'react';
import type { FC } from 'react';
import { EventHistoryTags } from 'components/sites/events/event-tags';
import { EventCounts } from 'components/sites/events/event-counts';
import { EventStatsTab } from 'components/sites/events/event-stats-tab';
import { EventFeedTable } from 'components/sites/events/event-feed-table';
import { EventTabs, TabsType } from 'components/sites/events/event-tabs';
import { EventStatsSort } from 'types/events';
import type { EventStats } from 'hooks/use-event-stats';
import type { Site, Team } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  member?: Team;
  groupIds: string[];
  captureIds: string[];
  period: TimePeriod;
  eventStats: EventStats;
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

export const EventHistory: FC<Props> =  ({ 
  site,
  member,
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
        ? <EventStatsTab sort={sort} eventStats={eventStats.eventStats} setSort={setSort} />
        : <EventFeedTable site={site} member={member} groupIds={groupIds} captureIds={captureIds} period={period} />
      }
    </div>
  );
};
