import React from 'react';
import type { FC } from 'react';
import { EventHistoryTags } from 'components/sites/events/event-history-tags';
import { EventCounts } from 'components/sites/events/event-counts';
import { EventHistoryStats } from 'components/sites/events/event-history-stats';
import { EventTabs, TabsType } from 'components/sites/events/event-tabs';
import type { EventsHistoryStat, EventsHistoryType } from 'types/graphql';

interface Props {
  eventHistoryStats: EventsHistoryStat[];
  addEventId: (id: string, type: EventsHistoryType) => void;
  removeEventId: (id: string, type: EventsHistoryType) => void;
}

export const EventHistory: FC<Props> =  ({ eventHistoryStats, addEventId, removeEventId }) => {
  const [activeTab, setActiveTab] = React.useState<TabsType>('stats');

  return (
    <div className='event-history'>
      <EventHistoryTags 
        eventHistoryStats={eventHistoryStats} 
        addEventId={addEventId}
        removeEventId={removeEventId}
      />

      <EventCounts />
      <EventTabs active={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'stats'
        ? <EventHistoryStats eventHistoryStats={eventHistoryStats} />
        : null
      }
    </div>
  );
};
