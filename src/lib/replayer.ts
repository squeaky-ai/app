import React from 'react';
import { Replayer } from 'rrweb';
import type { Event } from 'types/event';
import type { Action } from 'types/player';

interface InitArgs {
  events: Event[];
  element: Element;
  dispatch: React.Dispatch<Action>;
}

export const initReplayer = ({ events, element, dispatch }: InitArgs): Replayer => {
  const replayer = new Replayer(events, {
    root: element,
    skipInactive: true,
    mouseTail: {
      lineWidth: 3,
      strokeStyle: '#F0438C'
    } 
  });

  // TODO: The typing for this is a mess
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

  return replayer;
};
