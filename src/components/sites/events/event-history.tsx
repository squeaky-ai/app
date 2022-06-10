import React from 'react';
import type { FC } from 'react';
import { EventHistoryTags } from 'components/sites/events/event-history-tags';
import { EventCounts } from 'components/sites/events/event-counts';
import { EventHistoryStats } from 'components/sites/events/event-history-stats';
import { EventTabs, TabsType } from 'components/sites/events/event-tabs';
import { EventHistoryStatsSort } from 'types/events';
import type { EventsHistoryStat } from 'types/graphql';

interface Props {
  groupIds: string[];
  captureIds: string[];
  eventHistoryStats: EventsHistoryStat[];
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

export const EventHistory: FC<Props> =  ({ 
  groupIds, 
  captureIds, 
  eventHistoryStats, 
  setGroupIds, 
  setCaptureIds 
}) => {
  const [activeTab, setActiveTab] = React.useState<TabsType>('stats');
  const [sort, setSort] = React.useState<EventHistoryStatsSort>(EventHistoryStatsSort.CountDesc);

  return (
    <div className='event-history'>
      <EventHistoryTags 
        groupIds={groupIds}
        captureIds={captureIds}
        eventHistoryStats={eventHistoryStats} 
        setGroupIds={setGroupIds}
        setCaptureIds={setCaptureIds}
      />

      <EventCounts 
        sort={sort}
        eventHistoryStats={eventHistoryStats} 
      />
      <EventTabs active={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'stats'
        ? <EventHistoryStats sort={sort} eventHistoryStats={eventHistoryStats} setSort={setSort} />
        : null
      }
    </div>
  );
};
