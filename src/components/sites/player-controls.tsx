import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { PlayerZoom } from 'components/sites/player-zoom';
import { PlayerTabs } from 'components/sites/player-tabs';
import { PlayerSidebar } from 'components/sites/player-sidebar';
import { PlayerSlider } from 'components/sites/player-slider';
import { usePlayerState } from 'hooks/player-state';

export const PlayerControls: FC = () => {
  const [state] = usePlayerState();

  return (
    <>
      <footer className={classnames('controls', { active: state.activeTab !== null })}>
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
};
