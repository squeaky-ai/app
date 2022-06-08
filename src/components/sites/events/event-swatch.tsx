import React from 'react';
import type { FC } from 'react';

interface Props {
  index: number;
}

const colors: Record<number, string> = {
  0: 'var(--purple-500)',
  1: 'var(--blue-500)',
  2: 'var(--rose-500)',
  // TODO add the rest
};

export const EventSwatch: FC<Props> = ({ index }) => (
  <div className='event-swatch' style={{ backgroundColor: colors[index] }} />
);
