import React from 'react';
import type { FC } from 'react';
import { PlayerZoom } from 'components/sites/player-zoom';
import { PlayerTabs } from 'components/sites/player-tabs';
import { PlayerSidebar } from 'components/sites/player-sidebar';
import { PlayerSlider } from 'components/sites/player-slider';

export const PlayerControls: FC = () => (
  <>
    <footer className='controls'>
      <div className='control-group'>
        <PlayerZoom />
      </div>
      <div className='control-group'>
        <PlayerSlider />
      </div>
      <div className='control-group'>
        <PlayerTabs />
      </div>
    </footer>

    <PlayerSidebar />
  </>
);
