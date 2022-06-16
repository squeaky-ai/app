import React from 'react';
import type { FC } from 'react';
import { EventHistoryTags } from 'components/sites/events/event-tags';
import { EventCounts } from 'components/sites/events/event-counts';
import { EventStatsTable } from 'components/sites/events/event-stats-table';
import { EventFeedTable } from 'components/sites/events/event-feed-table';
import { EventTabs, TabsType } from 'components/sites/events/event-tabs';
import { EventStatsSort } from 'types/events';
import type { EventsStat, Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  groupIds: string[];
  captureIds: string[];
  period: TimePeriod;
  eventStats: EventsStat[];
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
        eventStats={eventStats} 
        setGroupIds={setGroupIds}
        setCaptureIds={setCaptureIds}
      />

      <EventCounts 
        sort={sort}
        eventStats={eventStats} 
      />
      <EventTabs active={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'stats'
        ? <EventStatsTable sort={sort} eventStats={eventStats} setSort={setSort} />
        : <EventFeedTable site={site} groupIds={groupIds} captureIds={captureIds} period={period} />
      }
    </div>
  );
};
