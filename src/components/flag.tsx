import React from 'react';
import type { FC } from 'react';

interface Props {
  code: string;
}

export const Flag: FC<Props> = ({ code }) => (
  <span className='flag'>
    <span className={`fi fi-${code.toLowerCase()}`} />
  </span>
);
