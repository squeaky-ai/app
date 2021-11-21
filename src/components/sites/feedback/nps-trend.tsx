import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';

interface Props {
  value: number;
}

export const NpsTrend: FC<Props> = ({ value }) => {
  const direction = value >= 0 ? 'up' : 'down';

  return (
    <Trend 
      value={`${direction === 'up' ? '+' : '-'}${value}`} 
      direction={direction}
    />
  );
};
