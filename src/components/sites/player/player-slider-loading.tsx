import React from 'react';
import type { FC } from 'react';
import { Slider } from 'components/sites/player/slider';
import { toTimeString } from 'lib/dates';

export const PlayerSliderLoading: FC = () => (
  <>
    <Slider 
      min={0} 
      max={100} 
      step={1} 
      value={0}
      recording={null}
      pressed={false}
      onChange={() => ''}
      onMouseDown={() => ''}
      onMouseUp={() => ''}
    />

    <span className='timestamps'>
      {toTimeString(0)} / {toTimeString(0)}
    </span>
  </>
);
