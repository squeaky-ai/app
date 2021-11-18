import React from 'react';
import type { FC } from 'react';

interface Props {
  short?: boolean;
}

export const NoData: FC<Props> = ({ short }) => (
  <div className='no-data'>
    <i className='ri-time-line' />
    <p>No data{short ? '' : ' available'}</p>
  </div>
);
