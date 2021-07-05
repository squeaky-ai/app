import React from 'react';
import type { FC } from 'react';
import { PlayerTab } from 'data/sites/enums';
import type { Recording } from 'types/recording';

interface PlayerState {
  recording: Recording;
  playing: boolean;
  progress: number;
  activeTab: PlayerTab;
}

interface PlayerProps {
  recording: Recording;
}

type PlayerContextParams = [PlayerState, (state: Partial<PlayerState>) => void];

export const PlayerContext = React.createContext<PlayerContextParams>(null);

export const PlayerProvider: FC<PlayerProps> = ({ children, recording }) => {
  const [state, setState] = React.useState<PlayerState>({
    recording,
    playing: false,
    progress: 0,
    activeTab: null,
  });

  const handleSetState = (update: Partial<PlayerState>) => {
    setState({ ...state, ...update });
  };

  return (
    <PlayerContext.Provider value={[state, handleSetState]}>
      {children}
    </PlayerContext.Provider>
  );
};
