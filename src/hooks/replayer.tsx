import { first } from 'lodash';
import { Replayer } from 'rrweb';
import { usePlayerState } from 'hooks/player-state';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

type InitFunction = (element: HTMLElement, recording: Recording) => void;

let replayer: Replayer;

export const useReplayer = (): [Replayer | null, InitFunction] => {
  const [_state, dispatch] = usePlayerState();

  const init = (element: HTMLElement, recording: Recording) => {
    if (replayer) {
      console.warn('Replayer already exist');
      return;
    }

    const events: Event[] = JSON.parse(recording.events);

    replayer = new Replayer(events, {
      root: element,
      mouseTail: {
        lineWidth: 2,
        strokeStyle: '#F0438C'
      } 
    });

    const offset = first<Event>(events).timestamp;

    (replayer.on as any)('*', (type: string, x: Event) => {
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
      }
    });
  };

  return [replayer, init];
};
