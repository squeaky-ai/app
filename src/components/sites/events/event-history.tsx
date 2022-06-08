import React from 'react';
import type { FC } from 'react';
import { EventHistoryTags } from 'components/sites/events/event-history-tags';
import { EventCounts } from 'components/sites/events/event-counts';
import { EventHistoryStats } from 'components/sites/events/event-history-stats';
import { EventTabs, TabsType } from 'components/sites/events/event-tabs';
import type { EventsHistoryStat } from 'types/graphql';

interface Props {
  eventHistoryStats: EventsHistoryStat[];
}

export const EventHistory: FC<Props> =  ({ eventHistoryStats }) => {
  const [activeTab, setActiveTab] = React.useState<TabsType>('stats');

  return (
    <div className='event-history'>
      <EventHistoryTags eventHistoryStats={eventHistoryStats} />
      <EventCounts />
      <EventTabs active={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'stats'
        ? <EventHistoryStats eventHistoryStats={eventHistoryStats} />
        : null
      }
    </div>
  );
};
