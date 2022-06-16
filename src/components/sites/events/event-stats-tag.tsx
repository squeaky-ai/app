import React from 'react';
import type { FC } from 'react';
import { EventsType } from 'types/graphql';
import { Icon } from 'components/icon';

interface Props {
  type: EventsType;
}

export const EventStatsTag: FC<Props> = ({ type }) => (
  <div className='event-stats-tag event-tag'>
    <Icon name={type === EventsType.Group ? 'folder-chart-2-line' : 'flashlight-line'} />
    <b>{type === EventsType.Group ? 'Event group' : 'Single event'}</b>
  </div>
);
