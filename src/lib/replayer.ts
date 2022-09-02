import React from 'react';
import { Replayer } from 'rrweb';
import { Action, PlayerStatus } from 'types/player';
import type { Event } from 'types/event';
import type { Recording } from 'types/graphql';

interface InitArgs {
  events: Event[];
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const initReplayer = ({ events, recording, dispatch }: InitArgs): Replayer => {
  const element = document.querySelector('.player-container');

  if (!element) {
    // The recording is ready, but the DOM is not. We should 
    // wait until the div exists before trying to init the replayer
    // or it will cry
    return null;
  }

  if (events.length === 0) {
    // Shouldn't be possible to create a recording without events
    // but someone could have deleted something
    dispatch({ type: 'status', value: PlayerStatus.FAILED });
    return null;
  }

  const replayer = new Replayer(events, {
    root: element,
    skipInactive: true,
    maxSpeed: 25,
    mouseTail: {
      lineWidth: 3,
      strokeStyle: '#F96155'
    },
    triggerFocus: false,
  });

  // TODO: The typing for this is a mess! Listen for some of
  // the events that are triggered by the replayer and use those
  // to update our own state. Not everything is broadcast.
  (replayer.on as any)('*', (type: string, x: any) => {
    switch(type) {
      case 'start':
        dispatch({ type: 'status', value: PlayerStatus.PLAYING });
        break;
      case 'pause':
        dispatch({ type: 'status', value: PlayerStatus.PAUSED });
        break;
      case 'state-change':
        if (x.speed) {
          dispatch({ type: 'playbackSpeed', value: x.speed.context.timer.speed });
        }
        break;
      case 'finish':
        const hasFinished = replayer.getCurrentTime() >= Number(recording.duration);

        // The replayer doesn't know internally whether the recording has
        // actually finished, or is awaiting the next batch of events. We
        // need to use the actual recording duration to see if it's got 
        // more to load
        dispatch({ 
          type: 'status', 
          value: hasFinished ? PlayerStatus.FINISHED : PlayerStatus.LOADING 
        });
        break;
    }
  });

  replayer.play();

  // Can't have users tabbing around in there!
  element.querySelector('iframe').setAttribute('tabindex', '-1');

  return replayer;
};
