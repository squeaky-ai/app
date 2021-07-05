import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { PlayerTabs } from 'components/sites/player-tabs';
import { PlayerSidebar } from 'components/sites/player-sidebar';
import { PlayerSlider } from 'components/sites/player-slider';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const Controls: FC<Props> = ({ recording }) => (
  <>
    <footer className='controls'>
      <div className='control-group'>
        <Button className='control'>
          <i className='ri-zoom-out-line' />
        </Button>
        <p className='zoom-level'>100%</p>
        <Button className='control'>
          <i className='ri-zoom-in-line' />
        </Button>
      </div>
      <div className='control-group'>
        <PlayerSlider recording={recording} />
      </div>
      <div className='control-group'>
        <PlayerTabs />
      </div>
    </footer>

    <PlayerSidebar recording={recording} />
  </>
);
