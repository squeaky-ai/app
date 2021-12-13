import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';

interface Props {
  direction: 'up' | 'down'
  value: string;
}

export const Trend: FC<Props> = ({ direction, value }) => (
  <span className={classnames('trend', direction)}>
    {direction === 'up'
      ? <Icon name='arrow-right-up-line' />
      : <Icon name='arrow-right-down-line' />
    }
    <span>{value}</span>
  </span>
);
