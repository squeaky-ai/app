import React from 'react';
import type { FC } from 'react';
import { Tag } from 'components/tag';
import type { EventsHistoryStat } from 'types/graphql';

interface Props {
  eventHistoryStats: EventsHistoryStat[];
}

export const EventHistoryTags: FC<Props> = ({ eventHistoryStats }) => {
  return (
    <div className='event-history-tags'>
      <p><b>Events or Groups:</b></p>
      {eventHistoryStats.map(stat => (
        <Tag key={stat.id} className='secondary' handleDelete={console.log}>
          {stat.name}
        </Tag>
      ))}
    </div>
  );
};