import React from 'react';
import type { FC } from 'react';
import { Spinner } from 'components/spinner';

export const Buffering: FC = () => (
  <div className='buffering'>
    <Spinner hideShowExtra />
  </div>
);
