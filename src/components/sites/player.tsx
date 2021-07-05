import React from 'react';
import type { FC } from 'react';
import { first, sortBy, round } from 'lodash';
import { EventWithTimestamp, EventWithTime } from 'types/event';
import { PlayerIframe } from 'components/sites/player-iframe';
import { usePlayerState } from 'hooks/player-state';
import type { Site } from 'types/site';
import type { PlayerState } from 'components/sites/player-provider';

interface Props {
  site: Site;
  events: EventWithTimestamp[];
}

/**
 * In order to get relative time (i.e. x ms from 0), the
 * first events timestamp must be sutracted from all of 
 * the timestamps
 * @param {PlayerState} state 
 * @returns {number}
 */
const getTimestampOffset = (state: PlayerState): number => {
  const sorted = sortBy(state.recording.events, (event) => Number(event.timestamp));

  return first(sorted)?.timestamp || 0;
};

/**
 * Use the offset to calculate the relative time for the
 * event, and them round it to the neareset 100ms so we 
 * can play back with reasoable performance
 * @param {EventWithTimestamp} event 
 * @param {number} offset
 * @param {number} precision 
 * @returns {EventWithTimestamp}
 */
const roundToNearestTimestamp = (event: EventWithTimestamp, offset: number, precision: number = -2): EventWithTime => {
  const relative = event.timestamp - offset;
  const time = round(relative, precision);
  
  return { ...event, time };
};

/**
 *  We can't possibly play stuff back with millisecond
 * accuracy and it's unlikely that users will be able to tell
 * the difference between 50ms or so. Events are rounded up
 * to the nearest 100 milliseconds
 * @param {PlayerState} state 
 * @returns {EventWithTime[]}
 */
const getEventsWithRoundedTimestamps = (state: PlayerState): EventWithTime[] => {
  const offset = getTimestampOffset(state);
  const events = state.recording.events.map(event => roundToNearestTimestamp(event, offset));

  return sortBy(events, (event) => event.time);
};

const Player: FC<Props> = ({ site }) => {
  const [state] = usePlayerState();
  const [events, setEvents] = React.useState<EventWithTime[]>([]);


  // Don't caculate this on every render or you might set
  // someones phone on fire
  React.useEffect(() => {
    const eventsWithTimestamps = getEventsWithRoundedTimestamps(state);
    setEvents(eventsWithTimestamps);
  }, [state.recording.events]);

  return (
    <>
      <PlayerIframe
        site={site}
        events={events}
        progress={state.progress}
        height={state.recording.viewportY}
        width={state.recording.viewportX}
        zoom={state.zoom}
      />
    </>
  );
};

export default Player;
