import React from 'react';
import type { FC } from 'react';
import { first, last } from 'lodash';
import { usePlayerState } from 'hooks/player-state';
import type { Event } from 'types/event';

let count: number = 0;
let timer: NodeJS.Timer;

const getMaxTimestamp = (events: Event[]) => {
  const earliest = first(events)?.timestamp || 0;
  const latest = last(events)?.timestamp || 0;

  return Math.floor((latest - earliest) / 1000);
};

export const PlayerTimer: FC = React.memo(({ children }) => {
  const [state, dispatch] = usePlayerState();

  const interval = state.playbackSpeed * 1000;
  const max = getMaxTimestamp(state.recording.events);

  const tick = () => {
    count += 1;

    if (count <= max) {
      dispatch({ type: 'progress', value: count });
    } else {
      clearInterval(timer);
      dispatch({ type: 'playing', value: false });
    }
  };

  React.useEffect(() => {
    // Always clear when play/pause is handled 
    // externally
    clearInterval(timer);
    
    if (state.playing) {
      // Create a timer every Xms only if the state 
      // is now palying
      timer = setInterval(tick, interval);
    }
  }, [state.playing]);

  React.useEffect(() => {
    // Set the count if it's been updated 
    // externally. Otherwise, play/pause will resume
    // from the local count variable
    count = state.progress;
  }, [state.progress]);

  return (<>{children}</>);
});
