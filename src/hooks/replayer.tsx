import React from 'react';
import { first } from 'lodash';
import { Replayer } from 'rrweb';
import { usePlayerState } from 'hooks/player-state';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

type InitFunction = (element: HTMLElement, recording: Recording) => void;

let replayer: Replayer = null;

export const useReplayer = (): [Replayer | null, InitFunction] => {
  const [_state, dispatch] = usePlayerState();

  const init = (element: HTMLElement, recording: Recording) => {
    if (replayer) { 
      // We don't want to be creating more than 1!
      return;
    }

    const events: Event[] = JSON.parse(recording.events);

    if (events.length === 0) {
      console.error('Events list is empty');
      return;
    }

    if (element.childNodes.length > 1) {
      // TODO: Next doesn't like this on reload, I suspect
      // it's because of the replayer in the global state
      console.error('Something other than the spinner exists in the container');
      return;
    }

    replayer = new Replayer(events, {
      root: element,
      skipInactive: true,
      mouseTail: {
        lineWidth: 3,
        strokeStyle: '#F0438C'
      } 
    });

    const offset = first<Event>(events).timestamp;

    // TODO: The typing for this is a mess
    (replayer.on as any)('*', (type: string, x: any) => {
      switch(type) {
        case 'event-cast':
          const progress = Math.floor((x.timestamp - offset) / 1000);
          dispatch({ type: 'progress', value: progress });
          break;
        case 'start':
          dispatch({ type: 'playing', value: true });
          break;
        case 'pause':
          dispatch({ type: 'playing', value: false });
          break;
        case 'state-change':
          if (x.speed) {
            dispatch({ type: 'playbackSpeed', value: x.speed.context.timer.speed });
          }
          break;
        case 'finish':
          dispatch({ type: 'playing', value: false });
          break;
      }
    });

    replayer.play();
  };

  React.useEffect(() => {
    // Clean up between page views as the replayer lives in 
    // the global state
    return () => { replayer = null };
  }, []);

  return [replayer, init];
};
