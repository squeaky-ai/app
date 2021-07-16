import React from 'react';
import type { FC } from 'react';
import { first } from 'lodash';
import { Replayer } from 'rrweb';
import { PlayerTab } from 'data/sites/enums';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

declare global {
  interface Window {
    replayer: Replayer;
  }
}

export interface PlayerState {
  recording: Recording;
  playing: boolean;
  progress: number;
  playbackSpeed: number;
  activeTab: PlayerTab;
  zoom: number;
}

interface PlayerProps {
  recording: Recording;
}

type ValueOf<T> = T[keyof T];

type Action = {
  type: keyof PlayerState;
  value: ValueOf<PlayerState>;
}

type PlayerContextParams = [PlayerState, React.Dispatch<Action>];

export const PlayerContext = React.createContext<PlayerContextParams>(null);

const reducer = (state: PlayerState, action: Action) => {
  return { ...state, [action.type]: action.value };
};

export const PlayerProvider: FC<PlayerProps> = ({ children, recording }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    recording,
    playing: false,
    progress: 0,
    playbackSpeed: 1,
    activeTab: null,
    zoom: 1,
  });

  React.useEffect(() => {
    // The source of truth for the recording is from the props,
    // so always update when it changes
    dispatch({ type: 'recording', value: recording });

    if (!window.replayer && recording) {
      const root = document.querySelector('.player-container');
      const events: Event[] = JSON.parse(recording.events);
  
      window.replayer = new Replayer(events, {
        root,
        mouseTail: {
          lineWidth: 2,
          strokeStyle: '#F0438C'
        } 
      });

      const offset = first<Event>(events).timestamp;

      (window.replayer.on as any)('*', (type: string, x: Event) => {
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
    }
  }, [recording]);

  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {children}
    </PlayerContext.Provider>
  );
};
