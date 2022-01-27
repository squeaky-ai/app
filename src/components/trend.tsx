import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tooltip } from 'components/tooltip';

interface Props {
  direction: 'up' | 'down'
  value: string;
}

export const Trend: FC<Props> = ({ direction, value }) => (
  <Tooltip button={
    <span className={classnames('trend', direction)}>
      {direction === 'up'
        ? <Icon name='arrow-right-up-line' />
        : <Icon name='arrow-right-down-line' />
      }
      <span>{value}</span>
    </span>
  }>
    Trend since previous period
  </Tooltip>
);
