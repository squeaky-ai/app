import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';

interface Props {
  short?: boolean;
}

export const NoData: FC<Props> = ({ short }) => (
  <div className='no-data'>
    <Icon name='time-line' />
    <p>No data{short ? '' : ' available'}</p>
  </div>
);
