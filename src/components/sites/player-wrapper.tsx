import React from 'react';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import { PlayerProvider } from 'components/sites/player-provider';
import { PlayerTimer } from 'components/sites/player-timer';
import { PlayerControls } from 'components/sites/player-controls';
import type { Site } from 'types/site';
import type { Recording } from 'types/recording';

const Player = dynamic(
  () => import('components/sites/player'),
  { ssr: false }
);

interface Props {
  site: Site;
  recording: Recording | null;
}

export const PlayerWrapper: FC<Props> = ({ site, recording }) => (
  <PlayerProvider recording={null}>
    <PlayerTimer>
      <Player site={site} />
      <PlayerControls />
    </PlayerTimer>
  </PlayerProvider>
);
