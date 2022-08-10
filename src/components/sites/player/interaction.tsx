import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { EventIcon } from 'components/sites/events/event-icon';
import { isErrorEvent, getEventName } from 'lib/events';
import type { SessionEvent } from 'types/event';

interface Props {
  event: SessionEvent;
  offset: number;
  duration: number;
  hidden: boolean;
}

export const Interaction: FC<Props> = ({ event, hidden, offset, duration }) => {
  const left = `${Math.round(((event.timestamp - offset) / duration) * 100)}%`;

  return (
    <div className={classnames('event', { hidden, error: isErrorEvent(event) })} style={{ left }}>
      <EventIcon type={getEventName(event)} />
    </div>
  );
};
