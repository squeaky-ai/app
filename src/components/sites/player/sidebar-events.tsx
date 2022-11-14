import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { EventIcon } from 'components/sites/events/event-icon';
import { EventTimestamp } from 'components/sites/player/event-timestamp';
import { SidebarErrorModal } from 'components/sites/player/sidebar-error-modal';
import { SidebarEventsVisibility } from 'components/sites/player/sidebar-events-visibility';
import { getInteractionEvents } from 'lib/events';
import { CustomEvents } from 'types/event';
import type { Events, InteractionEventItem, ErrorEvent } from 'types/event';
import type { PlayerState, Action } from 'types/player';
import type { Recording } from 'types/graphql';


interface Props {
  events: Events;
  state: PlayerState;
  replayer: Replayer;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const SidebarEvents: FC<Props> = ({ events, recording, state, replayer, dispatch }) => {
  const { interactionEvents, startedAt } = getInteractionEvents(
    events,
    state, 
    recording.inactivity
  );

  const getEventFromInteractionEvent = (item: InteractionEventItem): ErrorEvent | null => {
    const event = events.find(e => e.id === item.id);
    if (event?.type === CustomEvents.ERROR) return event;

    return null;
  };

  return (
    <>
      <h5 className='events-header'>
        Events
        <SidebarEventsVisibility state={state} dispatch={dispatch} />
      </h5>

      <ul className={classnames('datarow', { compact: state.eventOptions.includes('compact') })}>
        {interactionEvents.map((item, index) => (
          <li 
            className={classnames('icon', item.eventName, { hidden: !item.show })} 
            key={`${item.timestampStart}_${index}`}
          >
              <div className={item.eventName}>
                <EventIcon type={item.eventName} />
                <p className='title'>
                  {item.label} 
                  <span>
                    <EventTimestamp timestamp={item.timestampStart} offset={startedAt} replayer={replayer} />
                    {item.timestampEnd && (
                      <> - <EventTimestamp timestamp={item.timestampEnd} offset={startedAt} replayer={replayer} /></>
                    )}
                  </span>
                </p>
                {item.info && <p className='info'>{item.info}</p>}
                {item.eventName === 'error' && <SidebarErrorModal event={getEventFromInteractionEvent(item)} />}
              </div>
          </li>
        ))}
      </ul>
    </>
  );
};
