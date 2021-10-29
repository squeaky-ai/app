import React from 'react';
import { Replayer } from 'rrweb';
import type { Event } from 'types/event';
import { Action, PlayerStatus } from 'types/player';
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

  const events: Event[] = recording.events.items.map(i => JSON.parse(i));

  if (events.length === 0) {
    // Shouldn't be possible to create a recording without events
    // but someone could have deleted something
    dispatch({ type: 'status', value: PlayerStatus.FAILED });
    return replayer;
  }

  replayer = new Replayer(events, {
    root: element,
    skipInactive: true,
    maxSpeed: 25,
    mouseTail: {
      lineWidth: 3,
      strokeStyle: '#F0438C'
    },
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
