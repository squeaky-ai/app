import React from 'react';
import type { FC } from 'react';
import { Player } from 'components/sites/player';
import { PlayerProvider } from 'components/sites/player-provider';
import { PlayerControls } from 'components/sites/player-controls';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording | null;
}

export const PlayerWrapper: FC<Props> = ({ recording }) => (
  <PlayerProvider recording={recording}>
    <Player />
    <PlayerControls />
  </PlayerProvider>
);
