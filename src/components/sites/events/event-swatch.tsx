import React from 'react';
import type { FC } from 'react';
import { colorsPrimary } from 'lib/colors';

interface Props {
  index: number;
}

export const EventSwatch: FC<Props> = ({ index }) => (
  <div className='event-swatch' style={{ backgroundColor: colorsPrimary[index] }} />
);
