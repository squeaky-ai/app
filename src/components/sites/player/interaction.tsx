import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { EventIcon } from 'components/sites/events/event-icon';
import type { InteractionEventItem } from 'types/event';

interface Props {
  interactionEvent: InteractionEventItem;
  offset: number;
  duration: number;
}

export const Interaction: FC<Props> = ({ interactionEvent, offset, duration }) => {
  const left = `${Math.round(((interactionEvent.timestampStart - offset) / duration) * 100)}%`;

  return (
    <div
      className={classnames('event', { hidden: !interactionEvent.show, error: interactionEvent.eventName === 'error' })}
      style={{ left }}
    >
      <EventIcon type={interactionEvent.eventName} />
    </div>
  );
};
