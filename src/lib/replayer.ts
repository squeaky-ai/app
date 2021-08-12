import React from 'react';
import { Replayer } from 'rrweb';
import type { Event } from 'types/event';
import type { Action } from 'types/player';
import type { Recording } from 'types/recording';

interface InitArgs {
  failed: boolean;
  replayer?: Replayer;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const initReplayer = ({ failed, replayer, recording, dispatch }: InitArgs): Replayer => {
  if (replayer || !recording || failed) { 
    // We don't want to be creating more than 1! But at the same
    // time there are multiple times when it could be ready to
    // init, so the responsibility falls here to make sure it
    // returns early
    return replayer;
  }

  const element = document.querySelector('.player-container');

  if (!element) {
    // The recording is ready, but the DOM is not. We should 
    // wait until the div exists before trying to init the replayer
    // or it will cry
    return replayer;
  }

  const events: Event[] = JSON.parse(recording.events.items);

  if (events.length === 0) {
    // Shouldn't be possible to create a recording without events
    // but someone could have deleted something
    dispatch({ type: 'failed', value: true });
    return replayer;
  }

  replayer = new Replayer(events, {
    root: element,
    skipInactive: true,
    mouseTail: {
      lineWidth: 3,
      strokeStyle: '#F0438C'
    } 
  });

  // TODO: The typing for this is a mess! Listen for some of
  // the events that are triggered by the replayer and use those
  // to update our own state. Not everything is broadcast.
  (replayer.on as any)('*', (type: string, x: any) => {
    switch(type) {
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

  return replayer;
};
