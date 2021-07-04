import React from 'react';
import type { FC } from 'react';
import { first, last } from 'lodash';
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

  const getPlaybackTime = () => {
    const firstEventTime = first(recording.events)?.timestamp || 0;
    const lastEventTime = last(recording.events)?.timestamp || 0;

    return timeString((lastEventTime - firstEventTime) / 1000);
  };

  const timeString = (ms: number) => {
    const date = new Date(0);
    date.setSeconds(ms / 1000);
    return date.toISOString().substr(14, 5);
  };

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
          <Button className='control play-pause'>
            <i className='ri-play-fill' />
          </Button>
          <input type='range' className='slider'></input>
          <span className='timestamps'>
            00:00 / {getPlaybackTime()}
          </span>
          <Button className='speed'>1x</Button>
        </div>
        <div className='control-group'>
          <PlayerTabs active={active} setActive={setActive} />
        </div>
      </footer>

      <PlayerSidebar recording={recording} active={active} setActive={setActive} />
    </>
  );
};
