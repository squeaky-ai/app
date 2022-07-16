import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { EventIcon } from 'components/sites/events/event-icon';
import { EventType, IncrementalSource } from 'rrweb';
import { EventTimestamp } from 'components/sites/player/event-timestamp';
import { SidebarEventsVisibility } from 'components/sites/player/sidebar-events-visibility';
import type { Event } from 'types/event';
import type { PlayerState, Action } from 'types/player';

import {
  getEventName, 
  getMouseInteractionLabel,
  isPageViewEvent,
  isScrollEvent,
  isErrorEvent,
  isCustomEvent,
  getInteractionEvents,
} from 'lib/events';

interface Props {
  events: Event[];
  state: PlayerState;
  replayer: Replayer;
  dispatch: React.Dispatch<Action>;
}

export const SidebarEvents: FC<Props> = ({ events, state, replayer, dispatch }) => {
  const items = getInteractionEvents(events);

  const startedAt = items[0]?.timestamp || 0;

  return (
    <>
      <SidebarEventsVisibility state={state} dispatch={dispatch} />

      <ul className='datarow'>
        {items.map((item, index) => (
          <li 
            className={classnames('icon', { hidden: !state.eventVisibility.includes(getEventName(item)), error: isErrorEvent(item) })} 
            key={`${item.timestamp}_${index}`}>
            {isPageViewEvent(item) && (
              <>
                <EventIcon type={getEventName(item)} />
                <p className='title'>
                  Page view <EventTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
                <p className='info'>{item.data.href}</p>
              </>
            )}

            {isScrollEvent(item) && (
              <>
                <EventIcon type={getEventName(item)} />
                <p className='title'>
                  Scrolled <EventTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
              </>
            )}

            {item.type === EventType.IncrementalSnapshot && item.data.source === IncrementalSource.MouseInteraction && (
              <>
                <EventIcon type={getEventName(item)} />
                <p className='title'>
                  {getMouseInteractionLabel(item.data.type)} <EventTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
                <p className='info'>{(item.data as any).selector || 'Unknown'}</p>
              </>
            )}

            {isErrorEvent(item) && (
              <div className='error'>
                <EventIcon type={getEventName(item)} />
                <p className='title'>
                  JavaScript Error <EventTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
                <p className='info'>{item.data.message}</p>
              </div>
            )}

            {isCustomEvent(item) && (
              <>
                <EventIcon type={getEventName(item)} />
                <p className='title'>
                  Custom Event <EventTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
