import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { getIconForEventType, isErrorEvent } from 'lib/events';
import type { Event, ErrorEvent } from 'types/event';

interface Props {
  event: Event | ErrorEvent;
  offset: number;
  duration: number;
  hidden: boolean;
}

export const Interaction: FC<Props> = ({ event, hidden, offset, duration }) => {
  const left = `${Math.round(((event.timestamp - offset) / duration) * 100)}%`;

  return (
    <div className={classnames('event', { hidden, error: isErrorEvent(event) })} style={{ left }}>
      <Icon name={getIconForEventType(event)} />
    </div>
  );
};
