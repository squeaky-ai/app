import React from 'react';
import type { FC } from 'react';
import { toTimeString } from 'lib/dates';

export const PlayerSliderLoading: FC = () => (
  <>
    <div className='slider' />

    <span className='timestamps'>
      {toTimeString(0)} / {toTimeString(0)}
    </span>
  </>
);
