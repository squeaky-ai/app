import React from 'react';
import type { FC } from 'react';
import { first, last, sortBy } from 'lodash';
import { usePlayerState } from 'hooks/player-state';
import type { EventWithTimestamp } from 'types/event';

let count: number = 0;
let timer: NodeJS.Timer;

const getMaxTimestamp = (events: EventWithTimestamp[]) => {
  const sorted = sortBy(events, (event) => Number(event.timestamp));

  const earliest = first(sorted)?.timestamp || 0;
  const latest = last(sorted)?.timestamp || 0;

  return Math.round((latest - earliest) / 1000000);
};

export const PlayerTimer: FC = ({ children }) => {
  const [state, setState] = usePlayerState();

  const max = getMaxTimestamp(state.recording.events);

  const tick = () => {
    count += 1;

    if (count <= max) {
      setState({ progress: count });
    } else {
      clearInterval(timer);
    }
  };

  React.useEffect(() => {
    // Always clear when play/pause is handled 
    // externally
    clearInterval(timer);

    // Create a timer every Xms only if the state 
    // is now palying
    if (state.playing) {
      timer = setInterval(tick, 1000);
    }
  }, [state.playing]);

  React.useEffect(() => {
    // Set the count if it's been updated 
    // externally. Otherwise, play/pause will resume
    // from the local count variable
    count = state.progress;
  }, [state.progress]);

  return (<>{children}</>);
};
