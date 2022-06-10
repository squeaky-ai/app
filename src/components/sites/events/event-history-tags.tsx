import React from 'react';
import type { FC } from 'react';
import { Tag } from 'components/tag';
import { EventHistoryAdd } from 'components/sites/events/event-history-add';
import { EventsHistoryStat, EventsHistoryType } from 'types/graphql';

interface Props {
  groupIds: string[];
  captureIds: string[];
  eventHistoryStats: EventsHistoryStat[];
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

export const EventHistoryTags: FC<Props> = ({ 
  groupIds, 
  captureIds, 
  eventHistoryStats, 
  setGroupIds, 
  setCaptureIds 
}) => {
  const handleRemove = (id: string, type: EventsHistoryType) => {
    const list = type === EventsHistoryType.Capture
      ? captureIds
      : groupIds;

    const update = list.filter(l => l !== id);

    type === EventsHistoryType.Capture
      ? setCaptureIds(update)
      : setGroupIds(update);
  };

  return (
    <div className='event-history-tags'>
      <p><b>Events or Groups:</b></p>
      {eventHistoryStats.map(stat => (
        <Tag key={stat.id} className='secondary' handleDelete={(() => handleRemove(stat.id, stat.type))}>
          {stat.name}
        </Tag>
      ))}
      <EventHistoryAdd 
        setGroupIds={setGroupIds}
        setCaptureIds={setCaptureIds}
        eventHistoryStats={eventHistoryStats}
      />
    </div>
  );
};
