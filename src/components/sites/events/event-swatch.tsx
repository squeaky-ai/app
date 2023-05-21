import React from 'react';
import type { FC } from 'react';
import { colorsPrimary } from 'lib/colors';

interface Props {
  index: number;
}

export const EventSwatch: FC<Props> = ({ index }) => (
  <div className='event-swatch'>
    <svg width='16' height='16' x='0' y='0'>
      <rect
        x='0'
        y='0'
        width='100'
        height='100'
        fill={colorsPrimary[index]?.fill}
        stroke={colorsPrimary[index]?.stroke}
      />
    </svg>
  </div>
);
