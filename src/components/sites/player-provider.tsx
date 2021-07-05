import React from 'react';
import type { FC } from 'react';
import { PlayerTab } from 'data/sites/enums';

interface PlayerState {
  playing: boolean;
  progress: number;
  activeTab: PlayerTab;
}

type PlayerProps = [PlayerState, (state: Partial<PlayerState>) => void];

export const PlayerContext = React.createContext<PlayerProps>(null);

export const PlayerProvider: FC = ({ children }) => {
  const [state, setState] = React.useState<PlayerState>({
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

export const usePlayerState = () => React.useContext(PlayerContext);
