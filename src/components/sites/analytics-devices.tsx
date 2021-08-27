import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import type { AnalyticsDevice } from 'types/analytics';

interface Props {
  devices: AnalyticsDevice[];
}

export const AnalyticsDevices: FC<Props> = ({ devices }) => {
  const total = sum(devices.map(b => b.count));

  const [mobile, desktop] = devices;

  const percentage = (count: number) => Math.round((count / total) * 100);

  return (
    <div className='grid'>
      <div className='card'>
        <i className='ri-computer-line' />
        <div className='stats'>
          <p><b>Desktop / Laptop</b></p>
          <h3>{desktop.count} <span>{percentage(desktop.count) || 0}%</span></h3>
        </div>
      </div>
      <div className='card'>
        <i className='ri-tablet-line' />
        <div className='stats'>
          <p><b>Tablet / Mobile</b></p>
          <h3>{mobile.count} <span>{percentage(mobile.count) || 0}%</span></h3>
        </div>
      </div>
    </div>
  );
};
