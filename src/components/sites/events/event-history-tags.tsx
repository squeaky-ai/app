import React from 'react';
import type { FC } from 'react';
import { Tag } from 'components/tag';
import type { EventsHistoryStat, EventsHistoryType } from 'types/graphql';

interface Props {
  eventHistoryStats: EventsHistoryStat[];
  addEventId: (id: string, type: EventsHistoryType) => void;
  removeEventId: (id: string, type: EventsHistoryType) => void;
}

export const EventHistoryTags: FC<Props> = ({ eventHistoryStats, removeEventId }) => {
  return (
    <div className='event-history-tags'>
      <p><b>Events or Groups:</b></p>
      {eventHistoryStats.map(stat => (
        <Tag key={stat.id} className='secondary' handleDelete={(() => removeEventId(stat.id, stat.type))}>
          {stat.name}
        </Tag>
      ))}
    </div>
  );
};
