import React from 'react';
import type { FC } from 'react';
import { Tag } from 'components/tag';
import { EventsStat, EventsType } from 'types/graphql';

interface Props {
  groupIds: string[];
  captureIds: string[];
  eventStats: EventsStat[];
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

export const EventHistoryTags: FC<Props> = ({ 
  groupIds, 
  captureIds, 
  eventStats, 
  setGroupIds, 
  setCaptureIds 
}) => {
  const handleRemove = (id: string, type: EventsType) => {
    const list = type === EventsType.Capture
      ? captureIds
      : groupIds;

    const update = list.filter(l => l !== id);

    type === EventsType.Capture
      ? setCaptureIds(update)
      : setGroupIds(update);
  };

  return (
    <div className='event-tags'>
      <p><b>Events or Groups:</b></p>
      {eventStats.map(stat => (
        <Tag key={stat.eventOrGroupId} className='secondary' handleDelete={(() => handleRemove(stat.eventOrGroupId, stat.type))}>
          {stat.name}
        </Tag>
      ))}
    </div>
  );
};
