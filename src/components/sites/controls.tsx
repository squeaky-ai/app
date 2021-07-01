import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { PlayerTabs } from 'components/sites/player-tabs';
import { PlayerSidebar } from 'components/sites/player-sidebar';
import { PlayerTab } from 'data/sites/enums';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const Controls: FC<Props> = ({ recording }) => {
  const [active, setActive] = React.useState<PlayerTab>(null);

  return (
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
          
        </div>
        <div className='control-group'>
          <PlayerTabs active={active} setActive={setActive} />
        </div>
      </footer>

      <PlayerSidebar recording={recording} active={active} setActive={setActive} />
    </>
  );
};
