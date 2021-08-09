import React from 'react';
import type { FC } from 'react';
import { PlayerTab } from 'data/sites/enums';
import type { Recording } from 'types/recording';

export interface PlayerState {
  recording: Recording;
  playing: boolean;
  playbackSpeed: number;
  activeTab: PlayerTab;
  skipInactivity: boolean;
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
    playbackSpeed: 1,
    activeTab: null,
    skipInactivity: true,
    zoom: 1,
  });

  React.useEffect(() => {
    dispatch({ type: 'recording', value: recording });
  }, [recording]);

  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {children}
    </PlayerContext.Provider>
  );
};
