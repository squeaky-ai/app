import React from 'react';
import type { FC } from 'react';
import { PlayerTab } from 'data/sites/enums';
import type { Recording } from 'types/recording';

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
  }, [recording]);

  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {children}
    </PlayerContext.Provider>
  );
};
