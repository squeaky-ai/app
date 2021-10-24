import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props {
  direction: 'up' | 'down'
  value: string;
}

export const Trend: FC<Props> = ({ direction, value }) => (
  <span className={classnames('trend', direction)}>
    {direction === 'up'
      ? <i className='ri-arrow-right-up-line' />
      : <i className='ri-arrow-right-down-line' />
    }
    <span>{value}</span>
  </span>
);
