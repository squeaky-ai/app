import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { PlayerZoom } from 'components/sites/player-zoom';
import { PlayerTabs } from 'components/sites/player-tabs';
import { PlayerSidebar } from 'components/sites/player-sidebar';
import { PlayerControls } from 'components/sites/player-controls';
import { usePlayerState } from 'hooks/player-state';

export const PlayerFooter: FC = () => {
  const [state] = usePlayerState();

  return (
    <>
      <footer className={classnames('controls', { active: state.activeTab !== null })}>
        <div className='control-group'>
          <PlayerZoom />
        </div>
        <div className='control-group'>
          <PlayerControls />
        </div>
        <div className='control-group'>
          <PlayerTabs />
        </div>
      </footer>

      <PlayerSidebar />
    </>
  );
};
