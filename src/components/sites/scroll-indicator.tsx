import React from 'react';
import type { FC } from 'react';

export const ScrollIndicator: FC = () => (
  <div className='scroll-indicator'>
    <p>HOT</p>
    <div className='gradient' />
    <p>COLD</p>
  </div>
);
