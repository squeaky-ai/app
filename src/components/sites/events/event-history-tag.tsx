import React from 'react';
import type { FC } from 'react';
import { EventsHistoryType } from 'types/graphql';
import { Icon } from 'components/icon';

interface Props {
  type: EventsHistoryType;
}

export const EventHistoryTag: FC<Props> = ({ type }) => (
  <div className='event-history-tag'>
    <Icon name={type === EventsHistoryType.Group ? 'folder-chart-2-line' : 'flashlight-line'} />
    <b>{type === EventsHistoryType.Group ? 'Event group' : 'Single event'}</b>
  </div>
);
