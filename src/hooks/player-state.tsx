import React from 'react';
import { PlayerContext } from 'components/sites/player-provider';

export const usePlayerState = () => React.useContext(PlayerContext);
