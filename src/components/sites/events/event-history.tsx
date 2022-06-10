import React from 'react';
import type { FC } from 'react';
import { EventHistoryTags } from 'components/sites/events/event-history-tags';
import { EventCounts } from 'components/sites/events/event-counts';
import { EventHistoryStats } from 'components/sites/events/event-history-stats';
import { EventHistoryFeed } from 'components/sites/events/event-history-feed';
import { EventTabs, TabsType } from 'components/sites/events/event-tabs';
import { EventHistoryStatsSort } from 'types/events';
import type { EventsHistoryStat, Site } from 'types/graphql';

interface Props {
  site: Site;
  groupIds: string[];
  captureIds: string[];
  eventHistoryStats: EventsHistoryStat[];
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

export const EventHistory: FC<Props> =  ({ 
  site,
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
        : <EventHistoryFeed site={site} groupIds={groupIds} captureIds={captureIds} />
      }
    </div>
  );
};
